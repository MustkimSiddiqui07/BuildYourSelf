/* Small helpers and the built-in food table */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ic=e=>'<span class="ico" aria-hidden="true">'+e+'</span> ';
const r1=n=>Math.round(n*10)/10;
const fmt=n=>Math.round(n).toLocaleString('en-IN');
const base=FOODS.split('\n').map(l=>{const a=l.split('|');return{n:a[0],k:+a[1],p:+a[2],c:+a[3],f:+a[4],fi:+a[5],pc:+a[6]||0}});
