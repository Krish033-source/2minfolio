const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const SAMPLE = {
  name: 'Krishna Lal', title: 'Machine Learning & MLOps Engineer', email: 'you@example.com', phone: '', location: 'West Bengal, India',
  summary: 'ML and MLOps student building scalable pipelines and AI-powered backends. Leads a 2000+ member tech community and ships open-source projects.',
  links: [{ label: 'GitHub', url: 'https://github.com/Krish033-source' }],
  skills: [{ group: 'Languages', items: ['Python', 'Bash', 'SQL', 'JavaScript'] }, { group: 'ML & MLOps', items: ['Scikit-Learn', 'MLflow', 'Docker', 'FastAPI'] }],
  experience: [{ role: 'Vice President', org: 'GRID Community', period: '2025 - Present', points: ['Lead a community of 2000+ members', 'Organised 7+ speaker events'] }],
  projects: [{ name: 'Resume Copilot', desc: 'ML-powered resume analysis and JD matching.', tech: ['Python', 'NLP'], link: 'https://github.com/Krish033-source/resume-copilot' }],
  education: [{ degree: 'B.Tech Data Science & Engineering', school: 'Haldia Institute of Technology', period: '2024 - 2028', score: 'CGPA 8.70' }],
  achievements: [{ text: '1st Position, InnovateX Hackathon 2025' }]
};
const SCHEMA = [
  { k: 'links', t: 'Links', cols: [['label', 'Label'], ['url', 'URL']] },
  { k: 'skills', t: 'Skills', cols: [['group', 'Group'], ['items', 'Skills, comma separated', 'list']] },
  { k: 'experience', t: 'Experience', cols: [['role', 'Role'], ['org', 'Company'], ['period', 'Period'], ['points', 'Highlights, one per line', 'lines']] },
  { k: 'projects', t: 'Projects', cols: [['name', 'Name'], ['desc', 'Description'], ['tech', 'Tech, comma separated', 'list'], ['link', 'Link']] },
  { k: 'education', t: 'Education', cols: [['degree', 'Degree'], ['school', 'School'], ['period', 'Period'], ['score', 'Score']] },
  { k: 'achievements', t: 'Achievements', cols: [['text', 'Achievement']] }
];
const BASIC = [['name', 'Name'], ['title', 'Headline'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['summary', 'Summary', 1]];
const S = { user: null, file: null, pdf: '', photo: '', theme: 'editorial', data: structuredClone(SAMPLE), review: null, sample: true, repoUrl: '' };
const STEPS = ['Upload', 'Details', 'Theme', 'Review', 'Publish'];
const H = esc, fmt = (v, t) => t === 'list' ? (v || []).join(', ') : t === 'lines' ? (v || []).join('\n') : (v ?? '');
const toast = m => { const e = document.createElement('div'); e.className = 'toast'; e.textContent = m; document.body.append(e); setTimeout(() => e.remove(), 3200); };
let timer; const refresh = () => { clearTimeout(timer); timer = setTimeout(() => paint(true), 220); };

function norm(d) {
  d = d || {}; ['name', 'title', 'email', 'phone', 'location', 'summary'].forEach(k => d[k] = d[k] || '');
  SCHEMA.forEach(s => d[s.k] = (Array.isArray(d[s.k]) ? d[s.k] : []).map(r => typeof r === 'string' ? { text: r } : r));
  d.skills.forEach(r => r.items = Array.isArray(r.items) ? r.items : []); d.experience.forEach(r => r.points = Array.isArray(r.points) ? r.points : []);
  d.projects.forEach(r => r.tech = Array.isArray(r.tech) ? r.tech : []); return d;
}
function paint(still) {
  const pv = $('#pv'), y = pv.contentWindow?.scrollY || 0;
  pv.onload = () => pv.contentWindow.scrollTo(0, y);
  pv.srcdoc = buildHTML(S.data, S.theme, S.photo, true, still);
  $('#pvl').textContent = S.sample ? 'Sample preview' : 'Live preview · ' + THEMES[S.theme].n;
}
function setStep(i) {
  $$('.panel').forEach((p, j) => p.classList.toggle('on', i === j)); $$('#tabs button').forEach((b, j) => b.classList.toggle('on', i === j));
}
function tables() {
  let h = `<div class="blk"><h3>Basics</h3><div class="form">${BASIC.map(([k, l, a]) => `<label>${l}${a ? `<textarea data-b="${k}" rows="4">${H(S.data[k])}</textarea>` : `<input data-b="${k}" value="${H(S.data[k])}">`}</label>`).join('')}</div></div>`;
  SCHEMA.forEach(s => {
    const rows = S.data[s.k];
    h += `<div class="blk"><h3>${s.t}<span class="mono">${rows.length}</span></h3><div class="tw"><table><thead><tr>${s.cols.map(c => `<th>${c[1].split(',')[0]}</th>`).join('')}<th></th></tr></thead><tbody>
${rows.map((r, i) => `<tr>${s.cols.map(([k, , t]) => `<td><textarea rows="1" data-s="${s.k}" data-i="${i}" data-c="${k}" data-t="${t || ''}">${H(fmt(r[k], t))}</textarea></td>`).join('')}<td><button class="x" data-del="${s.k}:${i}" title="Remove">✕</button></td></tr>`).join('')}</tbody></table></div>
<button class="add" data-add="${s.k}">+ Add row</button></div>`;
  });
  $('#tables').innerHTML = h;
}
function themes() {
  $('#themes').innerHTML = Object.entries(THEMES).map(([id, t]) => `<button class="th ${id === S.theme ? 'on' : ''}" data-t="${id}"><div class="sw" style="background:${t.v.bg.startsWith('#') ? t.v.bg : '#222'};color:${t.v.fg}"><b style="font-family:${t.v.h}">Aa</b><i style="background:${t.v.ac}"></i></div><span>${t.n}<small>${t.tag}</small></span></button>`).join('');
}
function review() {
  const r = S.review; if (!r || !r.issues) return;
  const sc = Math.max(0, Math.min(100, +r.score || 0));
  $('#review').innerHTML = `<div class="score"><div class="ring" style="--p:${sc}"><span>${sc}</span></div><div><h3>Resume score</h3><p class="sub" style="margin:4px 0 0">${H(r.summary)}</p></div></div>
${(r.strengths || []).length ? `<h3 style="font-size:17px;margin-bottom:6px">What works</h3><ul class="good">${r.strengths.map(x => `<li>${H(x)}</li>`).join('')}</ul>` : ''}
<h3 style="font-size:17px;margin-bottom:8px">What to improve</h3><div class="tw"><table class="rt"><thead><tr><th>Priority</th><th>Area</th><th>Problem</th><th>Fix</th></tr></thead><tbody>
${r.issues.map(i => `<tr><td><span class="sev ${H(i.severity)}">${H(i.severity)}</span></td><td>${H(i.area)}</td><td>${H(i.problem)}</td><td>${H(i.fix)}</td></tr>`).join('')}</tbody></table></div>`;
}
function busy(on, msg) {
  $('.busy')?.remove(); if (!on) return;
  const b = document.createElement('div'); b.className = 'busy'; b.innerHTML = `<div><div class="spin"></div><b id="bm">${msg}</b></div>`; document.body.append(b);
}
function resizeImg(file) {
  return new Promise(res => {
    const im = new Image(); im.onload = () => {
      const s = Math.min(im.width, im.height), c = document.createElement('canvas'); c.width = c.height = 480;
      c.getContext('2d').drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 480, 480); res(c.toDataURL('image/jpeg', .86));
    }; im.src = URL.createObjectURL(file);
  });
}
function pickPdf(f) {
  if (!f || !/\.pdf$/i.test(f.name)) return toast('Please choose a PDF file');
  S.file = f; $('#cvn').textContent = '✓ ' + f.name; const r = new FileReader(); r.onload = () => S.pdf = r.result.split(',')[1]; r.readAsDataURL(f);
}
async function analyze() {
  if (!S.file) return toast('Upload your resume PDF first');
  const msgs = ['Reading your resume…', 'Extracting your details…', 'Reviewing like a recruiter…']; let n = 0;
  busy(true, msgs[0]); const iv = setInterval(() => { const e = $('#bm'); if (e) e.textContent = msgs[++n % 3]; }, 3500);
  try {
    const fd = new FormData(); fd.append('file', S.file);
    const r = await fetch('/api/parse', { method: 'POST', body: fd }), j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Failed');
    S.data = norm(j.data); S.review = j.review; S.sample = false; $('#sampleNote').hidden = true;
    $('#repo').value = (S.data.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-portfolio';
    tables(); review(); paint(); setStep(1); toast('Done! Check your details.');
  } catch (e) { toast(e.message); } finally { clearInterval(iv); busy(false); }
}
async function publish() {
  if (S.sample || !S.pdf) return toast('Analyze your resume first');
  busy(true, 'Creating repo and pushing files…');
  try {
    const r = await fetch('/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ repo: $('#repo').value.trim(), description: $('#desc').value, html: buildHTML(S.data, S.theme, S.photo, false), script: SCRIPT, pdf_b64: S.pdf }) });
    const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Failed');
    const u = encodeURIComponent(j.repo_url);
    $('#res').innerHTML = `<div class="done">✓ Pushed ${j.files.join(', ')} to <a href="${H(j.repo_url)}" target="_blank">${H(j.repo_url.replace('https://github.com/', ''))}</a></div>`;
    $('#dep').classList.remove('off');
    $('#dep').innerHTML = `<a href="https://vercel.com/new/clone?repository-url=${u}" target="_blank"><span><b>Deploy to Vercel</b><br><small>Import repo, click Deploy. No build settings needed.</small></span>→</a>
<a href="https://app.netlify.com/start/deploy?repository=${u}" target="_blank"><span><b>Deploy to Netlify</b><br><small>Connect GitHub and deploy.</small></span>→</a>
${j.pages ? `<a href="${H(j.pages)}" target="_blank"><span><b>GitHub Pages</b><br><small>${H(j.pages)} (live in about a minute)</small></span>→</a>` : ''}`;
    $('#dep').scrollIntoView({ behavior: 'smooth' }); toast('Repo created 🎉');
  } catch (e) { toast(e.message); } finally { busy(false); }
}
function start() {
  $('#who').innerHTML = S.user ? `<div class="user"><img src="${H(S.user.avatar)}" alt=""><span>${H(S.user.login)}</span><a class="btn o sm" href="/auth/logout">Log out</a></div>` : `<a class="btn sm" href="/auth/login">Log in with GitHub</a>`;
  $('#land').hidden = !!S.user; $('#app').hidden = !S.user; if (!S.user) return;
  $('#tabs').innerHTML = STEPS.map((s, i) => `<button class="${i ? '' : 'on'}" data-s="${i}"><b>0${i + 1}</b>${s}</button>`).join('');
  S.data = norm(S.data); tables(); themes(); paint();
  $('#tabs').onclick = e => { const b = e.target.closest('button'); b && setStep(+b.dataset.s); };
  $('#cv').onchange = e => pickPdf(e.target.files[0]);
  const d = $('#drop'); ['dragover', 'dragenter'].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.add('ov'); }));
  ['dragleave', 'drop'].forEach(ev => d.addEventListener(ev, e => { e.preventDefault(); d.classList.remove('ov'); }));
  d.addEventListener('drop', e => pickPdf(e.dataTransfer.files[0]));
  $('#img').onchange = async e => { if (!e.target.files[0]) return; S.photo = await resizeImg(e.target.files[0]); $('#thumb').style.backgroundImage = `url(${S.photo})`; paint(true); };
  $('#go').onclick = analyze; $('#pub').onclick = publish;
  $('#themes').onclick = e => { const b = e.target.closest('.th'); if (!b) return; S.theme = b.dataset.t; themes(); paint(); };
  $('#seg').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('#seg button').forEach(x => x.classList.toggle('on', x === b)); $('#frame').style.width = b.dataset.w; };
  $('#nt').onclick = () => window.open(URL.createObjectURL(new Blob([buildHTML(S.data, S.theme, S.photo, true, false)], { type: 'text/html' })));
  $('#tables').addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.b) S.data[t.dataset.b] = t.value;
    else if (t.dataset.s) { const ty = t.dataset.t, v = t.value; S.data[t.dataset.s][+t.dataset.i][t.dataset.c] = ty === 'list' ? v.split(',').map(x => x.trim()).filter(Boolean) : ty === 'lines' ? v.split('\n').map(x => x.trim()).filter(Boolean) : v; }
    refresh();
  });
  $('#tables').addEventListener('click', e => {
    const a = e.target.closest('[data-add]'), x = e.target.closest('[data-del]');
    if (a) { S.data[a.dataset.add].push({}); S.data = norm(S.data); tables(); }
    if (x) { const [k, i] = x.dataset.del.split(':'); S.data[k].splice(+i, 1); tables(); refresh(); }
  });
}
fetch('/api/me').then(r => r.json()).then(j => { S.user = j.user; start(); }).catch(start);