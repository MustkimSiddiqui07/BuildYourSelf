/* Theme options: light / dark / auto mode plus colour themes */
const TKEY='nutri-theme-v1';
let theme={mode:'auto',color:'green'};
try{const t=JSON.parse(localStorage.getItem(TKEY));if(t){if(MODES.some(m=>m[0]===t.mode))theme.mode=t.mode;if(THEMES.some(c=>c[0]===t.color))theme.color=t.color}}catch(e){}
function applyTheme(){
 const r=document.documentElement;
 if(theme.mode==='auto')r.removeAttribute('data-theme');else r.dataset.theme=theme.mode;
 if(theme.color==='green')r.removeAttribute('data-accent');else r.dataset.accent=theme.color;
 try{localStorage.setItem(TKEY,JSON.stringify(theme))}catch(e){}
 const m=document.querySelector('meta[name="theme-color"]');
 if(m)m.content=getComputedStyle(r).getPropertyValue('--accent').trim()||'#1F7A4D';
}
function renderThemeDialog(){
 $('#tmode').innerHTML=MODES.map(([k,e,l])=>'<button type="button" class="seg-b'+(theme.mode===k?' on':'')+'" data-mode="'+k+'" aria-pressed="'+(theme.mode===k)+'">'+ic(e)+l+'</button>').join('');
 $('#tcolors').innerHTML=THEMES.map(([k,l,c])=>'<button type="button" class="sw'+(theme.color===k?' on':'')+'" data-color="'+k+'" aria-pressed="'+(theme.color===k)+'"><span class="sw-dot" style="background:'+c+'"></span>'+l+'</button>').join('');
}
$('#themeBtn').onclick=()=>{renderThemeDialog();$('#tm').hidden=false;$('#tdone').focus()};
$('#tmode').onclick=e=>{const b=e.target.closest('[data-mode]');if(b){theme.mode=b.dataset.mode;applyTheme();renderThemeDialog()}};
$('#tcolors').onclick=e=>{const b=e.target.closest('[data-color]');if(b){theme.color=b.dataset.color;applyTheme();renderThemeDialog()}};
const closeTheme=()=>{$('#tm').hidden=true};
$('#tdone').onclick=closeTheme;
$('#tm').addEventListener('click',e=>{if(e.target.id==='tm')closeTheme()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTheme()});
window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').addEventListener&&window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(theme.mode==='auto')applyTheme()});
applyTheme();
