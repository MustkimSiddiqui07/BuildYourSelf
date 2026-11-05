/* Meal suggestions by goal */
let sTab=(h=>h<11?'Breakfast':h<16?'Lunch':h<19?'Snack':'Dinner')(new Date().getHours()),curCombos=[];
function combo(str,sc){
 const [name,its]=str.split('|');
 const items=its.split(',').map(x=>{const [fn,q]=x.split('*'),pc=q.endsWith('p'),v=parseFloat(q);
  return{f:base.find(b=>b.n===fn),qty:pc?Math.max(1,Math.round(v*sc)):Math.round(v*sc/5)*5,unit:pc?'piece':'g'}});
 const t=items.reduce((a,i)=>{const c=calc(i.f,i.qty,i.unit);return{k:a.k+c.k,p:a.p+c.p}},{k:0,p:0});
 return{name,items,k:Math.round(t.k),p:r1(t.p)};
}
function renderSugg(){
 const c=state.profile.cat,grp=c==='cut'?'cut':c==='keep'?'keep':'gain',g=state.goals;
 $('#stabs').innerHTML=MEALS.map(m=>'<button class="tab'+(m===sTab?' on':'')+'" data-t="'+m+'">'+ic(MEAL_ICON[m])+(m==='Snack'?'Snacks':m)+'</button>').join('');
 $('#sgoal').textContent='For '+CATS[c].name.toLowerCase()+', aim for about '+fmt(g.kcal*SHARE[sTab])+' kcal and '+Math.round(g.protein*SHARE[sTab])+' g protein at this meal.';
 curCombos=SUG[grp][sTab].map(s=>combo(s,c==='bulk'?1.25:1));
 $('#sopts').innerHTML=curCombos.map((x,i)=>'<div class="opt"><div><b>'+esc(x.name)+'</b><small>'+x.items.map(it=>esc(it.f.n)+' '+it.qty+(it.unit==='piece'?' pc':' g')).join(', ')+'</small><small>'+x.k+' kcal, '+x.p+' g protein</small></div><button class="btn ghost" data-i="'+i+'">Add</button></div>').join('');
}
$('#stabs').onclick=e=>{const b=e.target.closest('[data-t]');if(b){sTab=b.dataset.t;renderSugg()}};
$('#sopts').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;const x=curCombos[+b.dataset.i],arr=(state.log[day]=state.log[day]||[]);
 x.items.forEach(it=>arr.push({id:Date.now()+Math.random(),meal:sTab,name:it.f.n,qty:it.qty,unit:it.unit,...calc(it.f,it.qty,it.unit)}));
 save();render();check('add')};
