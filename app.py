import os, io, re, json, base64, secrets, requests
from flask import Flask, request, session, redirect, jsonify, send_from_directory
from pypdf import PdfReader

app = Flask(__name__, static_folder="static", static_url_path="")
app.secret_key = os.environ.get("SECRET_KEY", "dev-change-me")
app.config.update(MAX_CONTENT_LENGTH=25 * 1024 * 1024, SESSION_COOKIE_SAMESITE="Lax",
                  SESSION_COOKIE_SECURE=bool(os.environ.get("RENDER")))
CID, CSEC = os.environ.get("GITHUB_CLIENT_ID", ""), os.environ.get("GITHUB_CLIENT_SECRET", "")
GROQ_KEY = os.environ.get("GROQ_API_KEY", "")
BASE = os.environ.get("BASE_URL", "http://localhost:5000").rstrip("/")
MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-20b")
GH = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}

PROMPT = """You are a resume parser and a strict but kind resume reviewer.
Return ONLY a JSON object with this exact shape:
{"data":{"name":"","title":"","email":"","phone":"","location":"","summary":"",
"links":[{"label":"","url":""}],
"skills":[{"group":"","items":[""]}],
"experience":[{"role":"","org":"","period":"","points":[""]}],
"projects":[{"name":"","desc":"","tech":[""],"link":""}],
"education":[{"degree":"","school":"","period":"","score":""}],
"achievements":[{"text":""}]},
"review":{"score":0,"summary":"","strengths":[""],
"issues":[{"severity":"high|medium|low","area":"","problem":"","fix":""}]}}
Rules: use ONLY facts present in the resume, never invent anything; use "" or [] when missing.
"summary" = a 2-3 sentence first-person-free professional summary written from the resume.
Group skills sensibly. Review: score 0-100 for ATS/readability/impact; give 5-9 specific, actionable issues
(missing metrics, weak verbs, vague bullets, missing links/summary, formatting, gaps, length) with a concrete fix each."""


def gh(method, path, tok, **kw):
    return requests.request(method, "https://api.github.com" + path, headers={**GH, "Authorization": f"Bearer {tok}"}, timeout=30, **kw)


@app.get("/")
def home():
    return send_from_directory("static", "index.html")


@app.get("/auth/login")
def login():
    session["st"] = secrets.token_urlsafe(16)
    q = f"client_id={CID}&scope=public_repo&state={session['st']}&redirect_uri={BASE}/auth/callback"
    return redirect("https://github.com/login/oauth/authorize?" + q)


@app.get("/auth/callback")
def callback():
    if not request.args.get("code") or request.args.get("state") != session.pop("st", None):
        return redirect("/?e=auth")
    r = requests.post("https://github.com/login/oauth/access_token", headers={"Accept": "application/json"},
                      json={"client_id": CID, "client_secret": CSEC, "code": request.args["code"]}, timeout=20)
    tok = r.json().get("access_token")
    if not tok:
        return redirect("/?e=auth")
    u = gh("GET", "/user", tok).json()
    session["tok"] = tok
    session["user"] = {"login": u.get("login"), "name": u.get("name") or u.get("login"), "avatar": u.get("avatar_url")}
    return redirect("/")


@app.get("/auth/logout")
def logout():
    session.clear()
    return redirect("/")


@app.get("/api/me")
def me():
    return jsonify(user=session.get("user"))


@app.post("/api/parse")
def parse():
    if not session.get("tok"):
        return jsonify(error="Please log in with GitHub first."), 401
    f = request.files.get("file")
    if not f or not f.filename.lower().endswith(".pdf"):
        return jsonify(error="Upload your resume as a PDF."), 400
    try:
        text = "\n".join((p.extract_text() or "") for p in PdfReader(io.BytesIO(f.read())).pages).strip()
    except Exception:
        return jsonify(error="Could not read this PDF."), 400
    if len(text) < 80:
        return jsonify(error="No text found. Scanned/image PDFs are not supported yet."), 400
    try:
        r = requests.post("https://api.groq.com/openai/v1/chat/completions",
                          headers={"Authorization": f"Bearer {GROQ_KEY}"}, timeout=90,
                          json={"model": MODEL, "temperature": 0.2, "reasoning_effort": "low",
                                "max_completion_tokens": 7000, "response_format": {"type": "json_object"},
                                "messages": [{"role": "system", "content": PROMPT},
                                             {"role": "user", "content": text[:14000]}]})
        r.raise_for_status()
        raw = r.json()["choices"][0]["message"]["content"]
        out = json.loads(re.sub(r"^```(?:json)?|```$", "", raw.strip()).strip())
        return jsonify(data=out["data"], review=out.get("review", {}))
    except Exception as e:
        return jsonify(error=f"AI step failed, try again. ({type(e).__name__})"), 502


@app.post("/api/publish")
def publish():
    tok, user = session.get("tok"), session.get("user")
    if not tok:
        return jsonify(error="Please log in with GitHub first."), 401
    j = request.get_json(force=True)
    repo = (j.get("repo") or "").strip()
    if not re.fullmatch(r"[A-Za-z0-9._-]{1,80}", repo):
        return jsonify(error="Repo name: letters, numbers, . _ - only."), 400
    r = gh("POST", "/user/repos", tok, json={"name": repo, "description": (j.get("description") or "My portfolio")[:300],
                                              "private": False, "auto_init": False})
    if r.status_code == 422:
        return jsonify(error="A repo with this name already exists. Pick another name."), 409
    if r.status_code >= 300:
        return jsonify(error="GitHub refused to create the repo. Log in again and retry."), 502
    info = r.json()
    files = [("index.html", base64.b64encode(j["html"].encode()).decode()),
             ("script.js", base64.b64encode(j["script"].encode()).decode()),
             ("resume.pdf", j["pdf_b64"])]
    for name, b64 in files:
        p = gh("PUT", f"/repos/{user['login']}/{repo}/contents/{name}", tok,
               json={"message": f"Add {name}", "content": b64})
        if p.status_code >= 300:
            return jsonify(error=f"Repo created but pushing {name} failed."), 502
    pages, perr = None, None
    pr = gh("POST", f"/repos/{user['login']}/{repo}/pages", tok,
            json={"build_type": "legacy", "source": {"branch": "main", "path": "/"}})
    if pr.status_code in (201, 409): 
        gh("POST", f"/repos/{user['login']}/{repo}/pages/builds", tok)  # build trigger
        pages = f"https://{user['login']}.github.io/{repo}/"
    else:
        perr = f"Pages enable nahi hua ({pr.status_code}). Repo Settings → Pages se on karo."
    return jsonify(repo_url=info["html_url"], pages=pages, pages_error=perr, files=[n for n, _ in files])


if __name__ == "__main__":
    app.run(debug=True)
