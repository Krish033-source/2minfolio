const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MONO = "'JetBrains Mono',monospace", SG = "'Space Grotesk',sans-serif", FR = "'Fraunces',serif";
const mk = (n, tag, o, v, x = '') => ({ n, tag, ...o, x, v: { f: "'Inter',sans-serif", h: "'Inter',sans-serif", m: MONO, r: '16px', br: '12px', pr: '24px', sh: 'none', ab: '#fff', gl: '#ffffff14', nb: 'color-mix(in srgb,var(--bg) 82%,transparent)', ...v } });
const NEU = 'inset 3px 3px 6px #0f1114,inset -3px -3px 6px #272c33', NEO = '6px 6px 14px #0f1114,-6px -6px 14px #272c33';

const THEMES = {
  terminal: mk('Terminal', 'Terminal window · matrix rain', { L: 'term', fx: 'rain' }, { bg: '#020a04', fg: '#b8f5c8', mu: '#4fae6c', cd: '#04130a', bd: '#10482a', ac: '#33ff66', ab: '#00140a', r: '6px', br: '4px', pr: '6px', f: MONO, h: MONO, nb: '#020a04e6' }),
  neurohack: mk('Neuro-Hack', 'Soft-3D console · sidebar', { L: 'side' }, { bg: '#1b1e23', fg: '#d7dde5', mu: '#7f8a99', cd: '#1b1e23', bd: 'transparent', ac: '#39ff88', ab: '#04150b', r: '22px', br: '14px', pr: '50%', sh: '9px 9px 20px #0f1114,-9px -9px 20px #272c33', f: MONO, h: MONO, gl: '#39ff8814' },
    `.c{border:0}.t span{border:0;border-radius:10px;color:var(--ac);box-shadow:${NEU}}.btn{border:0;background:var(--cd);color:var(--ac);box-shadow:${NEO}}.btn:hover{box-shadow:${NEU};transform:none}
.sb aside{box-shadow:9px 0 22px #0f1114;border:0}.sb aside a.on,.sb aside a:hover{box-shadow:${NEU};color:var(--ac);background:none}.ph{border:6px solid var(--bg);box-shadow:var(--sh)}
.on0{display:flex;gap:8px;align-items:center;color:var(--ac);font:12px var(--m)}.led{width:9px;height:9px;border-radius:50%;background:var(--ac);box-shadow:0 0 12px var(--ac);animation:bl 2s infinite}h1,h2{text-shadow:0 0 22px #39ff8844}h2 small:before{content:'> '}`),
  bento: mk('Bento', 'Bento grid · count-up tiles', { L: 'bento', tilt: 1 }, { bg: '#eeede8', fg: '#141414', mu: '#6a6a66', cd: '#fff', bd: '#e3e2dc', ac: '#ff5a1f', r: '28px', pr: '30px', sh: '0 10px 30px #00000009', gl: '#ff5a1f18' },
    `.pf{background:linear-gradient(160deg,#fff,#ffe6d8)}.st{background:var(--ac);color:#fff}.st b{color:#fff!important}.st span{color:#ffffffcc}.c:hover{box-shadow:0 18px 40px #0000001a}`),
  bentodark: mk('Bento Dark', 'Dark bento · glow tiles', { L: 'bento', tilt: 1 }, { bg: '#07070a', fg: '#f4f4f6', mu: '#8d8d99', cd: '#111116', bd: '#ffffff12', ac: '#8b6cff', r: '26px', pr: '30px', gl: '#8b6cff26', nb: '#07070acc' },
    `.pf:after{content:'';position:absolute;width:320px;height:320px;border-radius:50%;background:var(--ac);filter:blur(100px);opacity:.28;top:-90px;right:-90px;animation:fl 9s ease-in-out infinite}.c:hover{border-color:#8b6cff88}.st b{color:#c4b5fd!important}h1{background:linear-gradient(120deg,#fff,#a89bff);-webkit-background-clip:text;background-clip:text;color:transparent}`),
  neubrutalism: mk('Neubrutalism', 'Chunky borders · marquee', { L: 'stack', hero: 'split', mq: 1 }, { bg: '#fff4d6', fg: '#000', mu: '#222', cd: '#fff', bd: '#000', ac: '#ff5fa2', ab: '#000', r: '0', br: '0', pr: '0', sh: '6px 6px 0 #000', f: SG, h: SG, nb: '#fff4d6', gl: '#0000' },
    `.c,.btn,.ph{border:3px solid #000!important}.btn{box-shadow:4px 4px 0 #000;font-weight:700}.btn:hover{box-shadow:7px 7px 0 #000;transform:translate(-2px,-2px)}.c:hover{transform:translate(-4px,-4px);box-shadow:10px 10px 0 #000}
nav.top{border-bottom:3px solid #000}h1,h2{font-weight:700;text-transform:uppercase}.g .c:nth-child(3n+1){background:#ffd23f}.g .c:nth-child(3n+2){background:#8ee3ef}.g .c:nth-child(3n){background:#ff9ec7}.t span{border:2px solid #000;border-radius:0;color:#000;background:#fff}.mq{background:#000;color:#ffd23f;border:0}.ph{box-shadow:8px 8px 0 #000;animation:none;transform:rotate(3deg)}`),
  glass: mk('Glassmorphism', 'Floating glass · aurora orbs', { L: 'stack', hero: 'split', tilt: 1 }, { bg: '#161044', fg: '#fff', mu: '#ffffffb8', cd: '#ffffff1c', bd: '#ffffff40', ac: '#ffd1f0', ab: '#2a0f4a', nb: '#ffffff16', sh: '0 8px 32px #0003', f: SG, h: SG, gl: '#ffffff30' },
    `body{background:linear-gradient(135deg,#161044,#3a1c71 55%,#6d2a6d) fixed}body:before,body:after{content:'';position:fixed;width:46vw;height:46vw;border-radius:50%;filter:blur(90px);z-index:-1;animation:fl 14s ease-in-out infinite}body:before{background:#ff6ec7aa;top:-12vw;left:-10vw}body:after{background:#4cc9f0aa;bottom:-14vw;right:-8vw;animation-delay:-6s}
.c,nav.top{backdrop-filter:blur(20px)}nav.top{margin:14px auto 0;max-width:780px;border:1px solid #ffffff44;border-radius:99px;top:12px}.btn{background:#ffffff30;color:#fff;border-color:#ffffff66;backdrop-filter:blur(10px)}.ph{border-radius:50%}`),
  aurora: mk('Aurora', 'Centered hero · particle network', { L: 'stack', hero: 'center', fx: 'net', tl: 1, tilt: 1 }, { bg: '#05060f', fg: '#f4f4ff', mu: '#9a9ab8', cd: '#ffffff0a', bd: '#ffffff1a', ac: '#8b7bff', ab: '#fff', r: '20px', pr: '50%', gl: '#8b7bff2a', f: SG, h: SG },
    `body:before{content:'';position:fixed;inset:-25%;background:conic-gradient(#6d28d9,#06b6d4,#ec4899,#6d28d9);filter:blur(130px);opacity:.2;z-index:-2;animation:sp 26s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.btn{background:linear-gradient(90deg,#8b5cf6,#06b6d4);color:#fff}h1{background:linear-gradient(90deg,#c4b5fd,#67e8f9,#f0abfc,#c4b5fd);background-size:250%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sh 7s linear infinite}@keyframes sh{to{background-position:250% 0}}.ph{box-shadow:0 0 0 6px #ffffff0d,0 0 60px #8b7bff66}`),
  cyberpunk: mk('Cyberpunk', 'Neon grid floor · glitch', { L: 'stack', hero: 'center', fx: 'net', tilt: 1 }, { bg: '#0a0014', fg: '#f5f5ff', mu: '#b19cd9', cd: '#13002a', bd: '#ff2bd655', ac: '#00f0ff', ab: '#00131a', r: '0', br: '0', pr: '0', f: SG, h: SG, nb: '#0a0014d9', gl: '#00f0ff26' },
    `body:before{content:'';position:fixed;left:-50%;right:-50%;bottom:0;height:55vh;background:linear-gradient(#0000,#ff2bd633),repeating-linear-gradient(90deg,#ff2bd655 0 1px,#0000 1px 60px),repeating-linear-gradient(#ff2bd655 0 1px,#0000 1px 60px);transform:perspective(320px) rotateX(62deg);transform-origin:bottom;z-index:-2;animation:gm 3s linear infinite}@keyframes gm{to{background-position:0 0,0 0,0 60px}}
.c{border:0;background:linear-gradient(135deg,#1c0638,#0b1236);clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))}.c:hover{background:linear-gradient(135deg,#2a0a52,#0e1a4a)}
h1{position:relative;text-transform:uppercase}h1:before,h1:after{content:attr(data-t);position:absolute;inset:0;animation:gl 3.2s infinite steps(1)}h1:before{color:#ff2bd6;clip-path:inset(0 0 55% 0)}h1:after{color:#00f0ff;clip-path:inset(55% 0 0 0);animation-delay:-1.6s}@keyframes gl{0%,88%,100%{opacity:0;transform:none}90%{opacity:1;transform:translateX(5px)}94%{opacity:1;transform:translateX(-5px)}}
.btn{box-shadow:0 0 18px #00f0ff88;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));font-weight:700}h2{text-transform:uppercase;text-shadow:0 0 16px #00f0ff66}.t span{border-radius:0;border-color:#ff2bd6}`),
  black: mk('Black', 'Cinematic rows · giant type', { L: 'stack', hero: 'split', rows: 1, mq: 1 }, { bg: '#000', fg: '#fafafa', mu: '#8a8a8a', cd: '#0b0b0b', bd: '#262626', ac: '#fff', ab: '#000', r: '14px', nb: '#000c', gl: '#ffffff12', f: SG, h: SG },
    `h1{font-size:clamp(52px,10vw,130px);line-height:.92;background:linear-gradient(#fff 30%,#555);-webkit-background-clip:text;background-clip:text;color:transparent}.mq{border-color:#262626}.mq div{font-size:34px;color:#444}.mq span:after{color:#fff}.ph{filter:grayscale(1) contrast(1.1)}.hero p{font-size:20px}`),
  greyscale: mk('Greyscale', 'Swiss minimal · timeline', { L: 'stack', hero: 'split', tl: 1 }, { bg: '#ececec', fg: '#1c1c1c', mu: '#7a7a7a', cd: '#f7f7f7', bd: '#cfcfcf', ac: '#1c1c1c', r: '4px', br: '4px', pr: '4px', gl: '#0000000a' },
    `.ph{filter:grayscale(1) contrast(1.05)}h1{font-weight:300;letter-spacing:-.05em}h2{font-weight:300}.btn{border-radius:0}.tl .c:after{background:#1c1c1c}`),
  editorial: mk('Editorial', 'Sidebar profile · serif', { L: 'side' }, { bg: '#f4efe6', fg: '#1d1a16', mu: '#6b645a', cd: '#fbf8f2', bd: '#ddd5c6', ac: '#e8590c', h: FR, r: '14px', pr: '50%', gl: '#e8590c14' }, `h1,h2{font-weight:600}.sb aside{background:#efe8da}`),
};

const BASE = `*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth}body{background:var(--bg);color:var(--fg);font:16px/1.6 var(--f);-webkit-font-smoothing:antialiased;overflow-x:hidden}a{color:inherit}
.w{max-width:1040px;margin:auto;padding:0 22px}nav.top{position:sticky;top:0;z-index:9;background:var(--nb);backdrop-filter:blur(12px);border-bottom:1px solid var(--bd)}
nav.top .w{display:flex;justify-content:space-between;align-items:center;height:58px}nav.top b{font-family:var(--h)}nav.top div a{margin-left:18px;font-size:14px;text-decoration:none;color:var(--mu);transition:.2s}nav.top div a:hover{color:var(--ac)}
section{padding:64px 0}h1,h2,h3{font-family:var(--h);line-height:1.1}h1{font-size:clamp(40px,7vw,74px);letter-spacing:-.03em}h2{font-size:32px;margin-bottom:28px}
h2 small{display:block;color:var(--ac);font:500 12px var(--m);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}.hero p{color:var(--mu);max-width:580px;margin:18px 0 26px;font-size:18px}.hero .m{display:block;margin-bottom:14px}
.ph{width:230px;height:230px;object-fit:cover;border-radius:var(--pr);border:1px solid var(--bd);animation:fl 6s ease-in-out infinite}.lead{font-size:20px;color:var(--mu);max-width:760px}
.btn{display:inline-block;padding:12px 22px;border-radius:var(--br);background:var(--ac);color:var(--ab);text-decoration:none;font-weight:600;margin:0 10px 10px 0;border:1px solid transparent;transition:.25s}.btn.o{background:transparent;color:var(--fg);border-color:var(--bd)}.btn:hover{transform:translateY(-2px)}
.g{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(290px,1fr))}
.c{position:relative;overflow:hidden;background:var(--cd);border:1px solid var(--bd);border-radius:var(--r);padding:22px;box-shadow:var(--sh);transition:transform .3s,box-shadow .3s,border-color .3s,background .3s}
.c:before{content:'';position:absolute;inset:0;background:radial-gradient(240px circle at var(--mx,50%) var(--my,-60%),var(--gl),transparent 70%);opacity:0;transition:opacity .3s;pointer-events:none}.c:hover:before{opacity:1}
.c h3{font-size:19px;margin-bottom:6px}.c p,.c li{color:var(--mu);font-size:15px}.c ul,.row ul{padding-left:18px;margin-top:8px}.row li{color:var(--mu);font-size:14px}.lk{color:var(--ac);font-size:14px;text-decoration:none;display:inline-block;margin-top:10px}.cv{font-size:16px;word-break:break-all}.cv a{color:inherit;text-decoration:none}
.m{font:500 12px var(--m);color:var(--ac)}.t span{display:inline-block;font:12px var(--m);padding:3px 10px;margin:8px 6px 0 0;border:1px solid var(--bd);border-radius:99px;color:var(--mu)}
.rv{opacity:0;transform:translateY(26px) scale(.985);transition:opacity .8s cubic-bezier(.2,.7,.2,1) calc(var(--i,0)*80ms),transform .8s cubic-bezier(.2,.7,.2,1) calc(var(--i,0)*80ms)}.rv.in{opacity:1;transform:none}.c:hover{transform:translateY(-3px)}
.led,.on0{display:none}footer{padding:36px 0;text-align:center;color:var(--mu);font-size:14px}#bg{position:fixed;inset:0;z-index:-1;pointer-events:none}
@keyframes fl{50%{transform:translateY(-10px)}}@keyframes bl{50%{opacity:.25}}@keyframes mq{to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}`;

const LCSS = {
  stack: `.hero{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;padding:96px 22px 40px}.hero.ct{grid-template-columns:1fr;text-align:center;justify-items:center;padding:110px 22px 50px}.hero.ct p{margin-inline:auto}.hero.ct .ph{order:-1;border-radius:50%;width:180px;height:180px}
.mq{overflow:hidden;border-block:1px solid var(--bd);padding:16px 0;margin:24px 0}.mq div{display:flex;gap:40px;width:max-content;animation:mq 30s linear infinite;font:700 24px var(--h);white-space:nowrap}.mq span:after{content:'✦';margin-left:40px;color:var(--ac)}
.tl{display:block;border-left:2px solid var(--bd);margin-left:8px}.tl .c{margin:0 0 16px 28px}.tl .c:after{content:'';position:absolute;left:-37px;top:28px;width:12px;height:12px;border-radius:50%;background:var(--ac);box-shadow:0 0 0 5px var(--bg),0 0 16px var(--ac)}.tl .c{overflow:visible}
.row{display:grid;grid-template-columns:64px 1fr auto;gap:18px;padding:28px 0;border-bottom:1px solid var(--bd);transition:padding .35s,color .3s}.row:hover{padding-left:18px;color:var(--ac)}.row h3{font-size:clamp(24px,3.4vw,38px)}.row p{color:var(--mu);margin-top:6px}
@media(max-width:720px){.hero{grid-template-columns:1fr;padding:50px 22px 20px}.ph{width:140px;height:140px;order:-1}nav.top div a:not(:last-child){display:none}.row{grid-template-columns:1fr}}`,
  side: `.sb{display:grid;grid-template-columns:290px 1fr}.sb aside{position:sticky;top:0;height:100vh;padding:34px 26px;display:flex;flex-direction:column;gap:12px;border-right:1px solid var(--bd);overflow:auto}.sb aside .ph{width:130px;height:130px}.sb aside h1{font-size:30px}.sb aside nav{display:grid;gap:2px;margin:14px 0}
.sb aside nav a{padding:8px 12px;border-radius:var(--br);color:var(--mu);text-decoration:none;transition:.25s}.sb aside nav a.on,.sb aside nav a:hover{color:var(--ac);background:var(--cd);transform:translateX(5px)}.sb aside .btn{margin-top:auto;text-align:center}.sb>main{padding:30px 52px;max-width:920px}.sb section{padding:44px 0}
@media(max-width:860px){.sb{grid-template-columns:1fr}.sb aside{position:static;height:auto}.sb>main{padding:10px 22px}}`,
  bento: `.bn{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:dense;gap:14px;padding:60px 22px}.bt{padding:24px;display:flex;flex-direction:column;gap:8px}.bt h1{font-size:clamp(34px,5vw,56px)}
.pf{grid-column:span 2;grid-row:span 2;justify-content:flex-end;min-height:440px}.pf .ph{width:110px;height:110px;margin-bottom:auto}.ab,.sk,.pj,.ed,.ac,.co{grid-column:span 2}.ex{grid-column:span 2;grid-row:span 2}.st{justify-content:center}.st b{font:600 56px var(--h);color:var(--ac);line-height:1}.st span{color:var(--mu);font-size:14px}
.it{padding:12px 0;border-top:1px solid var(--bd)}.it:first-of-type{border:0}.it b{font-family:var(--h);font-size:17px}.bt h3{font-size:17px;margin-top:6px}.bb{margin-top:12px}
@media(max-width:860px){.bn{grid-template-columns:repeat(2,1fr);padding:30px 16px}.bt:not(.st){grid-column:span 2}.pf,.ex{grid-row:auto;min-height:0}}`,
  term: `.tw{max-width:980px;margin:36px auto;border:1px solid var(--bd);border-radius:10px;background:#020a04ee;box-shadow:0 0 70px #33ff6620;overflow:hidden}
.tbar{display:flex;gap:8px;align-items:center;padding:11px 14px;border-bottom:1px solid var(--bd);font-size:12px;color:var(--mu)}.tbar i{width:11px;height:11px;border-radius:50%;background:#ff5f56}.tbar i:nth-child(2){background:#ffbd2e}.tbar i:nth-child(3){background:#27c93f}.tbar span{margin-left:10px}
.tb{padding:26px 28px 44px;font-size:14px}.tb section{padding:0;margin:0 0 36px}.pr{color:var(--ac)}.pr b{color:#fff;font-weight:500}.tb h1{font-size:clamp(34px,6vw,66px);margin:14px 0 6px;text-transform:uppercase;text-shadow:0 0 20px #33ff6688}.tb .sub{color:var(--mu);margin-bottom:18px;max-width:640px}
.o{color:var(--fg);padding-left:18px;border-left:1px solid var(--bd);margin:10px 0 0}.kv{display:grid;grid-template-columns:130px 1fr;gap:4px;padding:3px 0 3px 18px}.kv span:first-child{color:var(--ac)}.kv a{color:var(--fg)}
.git{display:grid;grid-template-columns:72px 1fr;gap:6px 14px;padding:8px 0 8px 18px}.git b{color:#ffb86c;font-weight:500}.git small{color:var(--mu)}.git ul{margin:4px 0 0 16px;color:var(--mu)}.ok{color:var(--ac)}
.pjt{padding:8px 0 8px 18px;border-left:2px solid var(--bd);margin:10px 0 0 0;transition:.25s}.pjt:hover{border-color:var(--ac);padding-left:24px}.pjt b{color:#fff}.pjt p{color:var(--mu)}
.cur{display:inline-block;width:9px;height:1.1em;background:var(--ac);vertical-align:-3px;animation:bl 1s steps(1) infinite}.tb .btn{margin:6px 10px 0 0}
body:after{content:'';position:fixed;inset:0;background:repeating-linear-gradient(#0000 0 2px,#0003 2px 3px);pointer-events:none;z-index:50}
.boot{position:fixed;inset:0;background:#000;z-index:100;display:grid;place-items:center;color:var(--ac);font:14px var(--m);animation:bo .5s 1.6s forwards}.boot i{display:block;height:3px;background:var(--ac);width:0;margin-top:14px;box-shadow:0 0 12px var(--ac);animation:ld 1.5s forwards}@keyframes ld{to{width:100%}}@keyframes bo{to{opacity:0;visibility:hidden}}
.tn{margin-left:auto;display:flex;gap:14px}.tn a{color:var(--mu);text-decoration:none}.tn a:hover{color:var(--ac)}@media(max-width:720px){.tn{display:none}.kv{grid-template-columns:96px 1fr}}`
};

const SCRIPT = `(function(){var q=function(s){return[].slice.call(document.querySelectorAll(s))},rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function count(el){var t=+el.dataset.n,s=null;(function f(ts){s=s||ts;var p=Math.min((ts-s)/1300,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');io.unobserve(el);el.querySelectorAll('[data-n]').forEach(count);setTimeout(function(){el.style.setProperty('--i',0)},1500)})},{threshold:.08});
q('.rv').forEach(function(e){io.observe(e)});
q('[data-type]').forEach(function(el){var t=el.dataset.type,i=0;(function k(){el.textContent=t.slice(0,i++);if(i<=t.length)setTimeout(k,85)})()});
var tilt=document.body.hasAttribute('data-tilt');
q('.c').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');if(tilt&&!rm)c.style.transform='perspective(900px) rotateX('+((y/r.height-.5)*-7)+'deg) rotateY('+((x/r.width-.5)*7)+'deg) translateY(-4px)'});c.addEventListener('pointerleave',function(){c.style.transform=''})});
var L=q('aside nav a'),S=q('section[id]');if(L.length)addEventListener('scroll',function(){var y=scrollY+220,c='';S.forEach(function(s){if(s.offsetTop<=y)c=s.id});L.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+c)})},{passive:true});
var cv=document.getElementById('bg');if(cv&&!rm){var x=cv.getContext('2d'),W,H,m=document.body.dataset.fx,P=[],col=(getComputedStyle(document.body).getPropertyValue('--ac')||'#fff').trim();
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=m=='rain'?Array(Math.floor(W/16)).fill(0).map(function(){return Math.random()*H/16}):Array(Math.min(80,Math.floor(W/16))).fill(0).map(function(){return{x:Math.random()*W,y:Math.random()*H,a:Math.random()*6.28,s:.25+Math.random()*.45}})}
rs();addEventListener('resize',rs);
(function d(){if(m=='rain'){x.fillStyle='rgba(2,10,4,.09)';x.fillRect(0,0,W,H);x.fillStyle=col;x.font='14px monospace';P.forEach(function(y,i){x.globalAlpha=.8;x.fillText(String.fromCharCode(12448+Math.random()*90),i*16,y*16);P[i]=y*16>H&&Math.random()>.975?0:y+1})}
else{x.clearRect(0,0,W,H);x.fillStyle=col;x.strokeStyle=col;P.forEach(function(p,i){p.x+=Math.cos(p.a)*p.s;p.y+=Math.sin(p.a)*p.s;if(p.x<0||p.x>W)p.a=Math.PI-p.a;if(p.y<0||p.y>H)p.a=-p.a;x.globalAlpha=.7;x.fillRect(p.x,p.y,2,2);for(var j=i+1;j<P.length;j++){var o=P[j],dx=p.x-o.x,dy=p.y-o.y,dd=dx*dx+dy*dy;if(dd<16000){x.globalAlpha=.22*(1-dd/16000);x.beginPath();x.moveTo(p.x,p.y);x.lineTo(o.x,o.y);x.stroke()}}})}
requestAnimationFrame(d)})()}
if(location.href==='about:srcdoc')document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();var id=a.getAttribute('href').slice(1),t=id&&document.getElementById(id);if(t)t.scrollIntoView({behavior:'smooth'})});
var y=document.getElementById('y');if(y)y.textContent=new Date().getFullYear()})();`;

const CARD = {
  skill: (x, s) => `<div class="c"><h3>${esc(s.group)}</h3>${x.chips(s.items)}</div>`,
  exp: (x, e) => `<div class="c"><span class="m">${esc(e.period)}</span><h3>${esc(e.role)}</h3><p>${esc(e.org)}</p><ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`,
  proj: (x, p) => `<div class="c"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${x.chips(p.tech)}${x.link(p.link, 'View project')}</div>`,
  edu: (x, e) => `<div class="c"><span class="m">${esc(e.period)}</span><h3>${esc(e.degree)}</h3><p>${esc(e.school)}</p>${e.score ? `<p class="m" style="margin-top:8px">${esc(e.score)}</p>` : ''}</div>`,
  ach: (x, a) => `<div class="c"><p>★ ${esc(a.text)}</p></div>`,
  con: (x, c) => `<div class="c"><span class="m">${esc(c[0])}</span><h3 class="cv">${c[2] ? `<a href="${esc(c[2])}" target="_blank" rel="noopener">${esc(c[1])}</a>` : esc(c[1])}</h3></div>`
};

function ctx(d, photo, preview) {
  const R = k => (d[k] || []).filter(r => Object.values(r).some(v => Array.isArray(v) ? v.length : String(v || '').trim()));
  return {
    R, photo, cv: preview ? '#' : 'resume.pdf',
    chips: a => `<div class="t">${(a || []).filter(Boolean).map(x => `<span>${esc(x)}</span>`).join('')}</div>`,
    link: (u, l) => u ? `<a class="lk" href="${esc(u)}" target="_blank" rel="noopener">${l} →</a>` : '',
    contacts: [d.email && ['Email', d.email, 'mailto:' + d.email], d.phone && ['Phone', d.phone, 'tel:' + d.phone], d.location && ['Location', d.location, ''],
    ...R('links').map(l => [l.label || 'Link', (l.url || '').replace(/^https?:\/\//, ''), l.url])].filter(Boolean)
  };
}
const first = d => (d.summary || '').split(/(?<=\.)\s/)[0];

function secs(d, x, t) {
  const { R } = x, ex = R('experience'), pr = R('projects'), sk = R('skills');
  const I = (a, f) => a.map((r, i) => f(r).replace('class="c"', `class="c rv" style="--i:${i}"`)).join('');
  const G = (a, f, c = '') => a.length ? `<div class="g ${c}">${I(a, f)}</div>` : '';
  const W = (a, f) => a.map((r, i) => `<div class="row rv" style="--i:${i}">${f(r, i)}</div>`).join('');
  const rh = (i, a, b, c, extra) => `<b class="m">0${i + 1}</b><div><h3>${esc(a)}</h3><p>${esc(b)}</p>${extra}</div><span class="m">${esc(c)}</span>`;
  return [
    ['about', 'About', d.summary ? `<p class="lead rv">${esc(d.summary)}</p>` : ''],
    ['skills', 'Skills', G(sk, s => CARD.skill(x, s))],
    ['experience', 'Experience', t.rows ? W(ex, (e, i) => rh(i, e.role, e.org, e.period, `<ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul>`)) : G(ex, e => CARD.exp(x, e), t.tl ? 'tl' : '')],
    ['projects', 'Projects', t.rows ? W(pr, (p, i) => rh(i, p.name, p.desc, '', x.chips(p.tech) + x.link(p.link, 'View'))) : G(pr, p => CARD.proj(x, p))],
    ['education', 'Education', G(R('education'), e => CARD.edu(x, e), t.tl ? 'tl' : '')],
    ['achievements', 'Achievements', G(R('achievements'), a => CARD.ach(x, a))],
    ['contact', 'Contact', G(x.contacts, c => CARD.con(x, c))]
  ].filter(s => s[2]);
}
const sectionsHTML = S => S.map(([id, title, body], i) => `<section id="${id}"><div class="w"><h2 class="rv"><small>0${i + 1}</small>${title}</h2>${body}</div></section>`).join('\n');

const LAY = {
  stack(d, x, t) {
    const S = secs(d, x, t), all = x.R('skills').flatMap(s => s.items), cta = S.some(s => s[0] === 'contact');
    return `<nav class="top"><div class="w"><b>${esc(d.name)}</b><div>${S.map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}<a href="${x.cv}" download>Resume</a></div></div></nav>
<header class="w hero ${t.hero === 'center' ? 'ct' : ''}"><div><span class="m">${esc(d.title)}</span><h1 data-t="${esc(d.name)}">${esc(d.name)}</h1><p>${esc(first(d))}</p><a class="btn" href="${x.cv}" download>↓ Download Resume</a>${cta ? '<a class="btn o" href="#contact">Get in touch</a>' : ''}</div>${x.photo ? `<img class="ph" src="${x.photo}" alt="${esc(d.name)}">` : ''}</header>
${t.mq && all.length ? `<div class="mq"><div>${[...all, ...all].map(s => `<span>${esc(s)}</span>`).join('')}</div></div>` : ''}${sectionsHTML(S)}`;
  },
  side(d, x, t) {
    const S = secs(d, x, t);
    return `<div class="sb"><aside><div class="on0"><span class="led"></span>SYSTEM ONLINE</div>${x.photo ? `<img class="ph" src="${x.photo}" alt="${esc(d.name)}">` : ''}<h1>${esc(d.name)}</h1><span class="m">${esc(d.title)}</span>
<nav>${S.map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}</nav><a class="btn" href="${x.cv}" download>↓ Resume</a></aside><main>${sectionsHTML(S)}</main></div>`;
  },
  bento(d, x) {
    const { R, chips, link } = x; let i = 0;
    const T = (c, h, id = '') => h ? `<div ${id ? `id="${id}" ` : ''}class="c bt ${c} rv" style="--i:${i++}">${h}</div>` : '';
    const sk = R('skills'), ex = R('experience'), pr = R('projects'), ed = R('education'), ac = R('achievements'), ct = x.contacts;
    const n = (v, l) => v ? T('st', `<b data-n="${v}">0</b><span>${l}</span>`) : '';
    return `<main class="bn">` +
      T('pf', `${x.photo ? `<img class="ph" src="${x.photo}" alt="">` : ''}<span class="m">${esc(d.title)}</span><h1>${esc(d.name)}</h1><div class="bb"><a class="btn" href="${x.cv}" download>↓ Resume</a>${ct.length ? '<a class="btn o" href="#ct">Contact</a>' : ''}</div>`) +
      T('ab', d.summary && `<span class="m">About</span><p class="lead">${esc(d.summary)}</p>`) +
      n(pr.length, 'Projects') + n(ex.length, 'Roles') + n(sk.reduce((a, s) => a + s.items.length, 0), 'Skills') +
      T('sk', sk.length && `<span class="m">Skills</span>${sk.map(s => `<h3>${esc(s.group)}</h3>${chips(s.items)}`).join('')}`) +
      T('ex', ex.length && `<span class="m">Experience</span>${ex.map(e => `<div class="it"><b>${esc(e.role)}</b><p>${esc(e.org)} · ${esc(e.period)}</p><ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}`) +
      pr.map(p => T('pj', `<span class="m">Project</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${chips(p.tech)}${link(p.link, 'View')}`)).join('') +
      T('ed', ed.length && `<span class="m">Education</span>${ed.map(e => `<div class="it"><b>${esc(e.degree)}</b><p>${esc(e.school)} · ${esc(e.period)} ${esc(e.score)}</p></div>`).join('')}`) +
      T('ac', ac.length && `<span class="m">Achievements</span>${ac.map(a => `<div class="it"><p>★ ${esc(a.text)}</p></div>`).join('')}`) +
      T('co', ct.length && `<span class="m">Contact</span>${ct.map(c => `<div class="it"><p>${esc(c[0])}</p><b class="cv">${c[2] ? `<a href="${esc(c[2])}" target="_blank" rel="noopener">${esc(c[1])}</a>` : esc(c[1])}</b></div>`).join('')}`, 'ct') + `</main>`;
  },
  term(d, x, t, still) {
    const { R } = x, sk = R('skills'), ex = R('experience'), pr = R('projects'), ed = R('education'), ac = R('achievements');
    const nm = (d.name || 'user').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
    const hx = s => { let n = 5381; for (const c of String(s)) n = (n * 33 + c.charCodeAt(0)) >>> 0; return n.toString(16).padStart(7, '0').slice(0, 7); };
    const P = (id, cmd, h) => h ? `<section id="${id}" class="rv"><p class="pr"><b>$</b> ${cmd}</p>${h}</section>` : '';
    const kv = (k, v) => v ? `<div class="kv"><span>${k}</span><span>${v}</span></div>` : '';
    const lnk = c => c[2] ? `<a href="${esc(c[2])}" target="_blank" rel="noopener">${esc(c[1])}</a>` : esc(c[1]);
    const nav = [['about', 'about'], ['skills', 'skills'], ['experience', 'log'], ['projects', 'repos'], ['contact', 'contact']];
    return `${still ? '' : `<div class="boot"><div>&gt; booting ${nm}@portfolio ...<i></i></div></div>`}
<div class="tw"><div class="tbar"><i></i><i></i><i></i><span>${nm}@portfolio: ~</span><nav class="tn">${nav.map(n => `<a href="#${n[0]}">${n[1]}</a>`).join('')}</nav></div><div class="tb">
<section><p class="pr"><b>$</b> <span data-type="whoami">whoami</span></p><h1 class="rv">${esc(d.name)}</h1><div class="sub">${esc(d.title)}</div><a class="btn" href="${x.cv}" download>↓ resume.pdf</a></section>
${P('about', 'cat about.txt', d.summary && `<div class="o">${esc(d.summary)}</div>`)}
${P('neofetch', 'neofetch', kv('Name', esc(d.name)) + kv('Role', esc(d.title)) + kv('Location', esc(d.location)) + kv('Email', esc(d.email)) + kv('Education', esc((ed[0] || {}).degree)) + kv('Projects', pr.length && `<b data-n="${pr.length}">0</b>`) + kv('Skills', sk.length && `<b data-n="${sk.reduce((a, s) => a + s.items.length, 0)}">0</b>`))}
${P('skills', 'ls skills/', sk.map(s => kv(esc(s.group), s.items.map(i => `[${esc(i)}]`).join(' '))).join(''))}
${P('experience', 'git log --oneline experience', ex.length && `<div>${ex.map(e => `<div class="git"><b>${hx(e.role + e.org)}</b><div>${esc(e.role)} @ ${esc(e.org)} <small>· ${esc(e.period)}</small><ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul></div></div>`).join('')}</div>`)}
${P('projects', 'ls -la ~/repos', pr.map(p => `<div class="pjt"><b>${esc(p.name)}</b> ${x.link(p.link, 'repo')}<p>${esc(p.desc)}</p>${x.chips(p.tech)}</div>`).join(''))}
${P('education', 'cat education.txt', ed.map(e => `<div class="git"><b>${hx(e.degree)}</b><div>${esc(e.degree)} — ${esc(e.school)} <small>· ${esc(e.period)} ${esc(e.score)}</small></div></div>`).join(''))}
${P('achievements', 'cat achievements.log', ac.map(a => `<div class="kv" style="grid-template-columns:50px 1fr"><span class="ok">[OK]</span><span>${esc(a.text)}</span></div>`).join(''))}
${P('contact', `./connect --with ${nm}`, x.contacts.map(c => kv(esc(c[0].toLowerCase()), lnk(c))).join(''))}
<p class="pr"><b>$</b> <span class="cur"></span></p></div></div>`;
  }
};

function buildHTML(d, tid, photo, preview, still) {
  const t = THEMES[tid] || THEMES.editorial, x = ctx(d, photo, preview);
  const vars = Object.entries(t.v).map(([k, v]) => `--${k}:${v}`).join(';');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(d.name)}${d.title ? ' — ' + esc(d.title) : ''}</title><meta name="description" content="${esc((d.summary || '').slice(0, 155))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<style>:root{${vars}}${BASE}${LCSS[t.L]}${t.x}</style><noscript><style>.rv{opacity:1;transform:none}</style></noscript></head>
<body data-fx="${t.fx || ''}"${t.tilt ? ' data-tilt="1"' : ''}>${t.fx ? '<canvas id="bg"></canvas>' : ''}
${LAY[t.L](d, x, t, still)}
<footer>© <span id="y"></span> ${esc(d.name)}</footer>
${preview ? `<script>${SCRIPT}<\/script>` : '<script src="script.js"><\/script>'}</body></html>`;
}