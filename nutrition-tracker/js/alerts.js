/* Over and under target pop-ups */
function evaluate(under){
 const t=totals(state.log[day]||[]),g=state.goals,c=state.profile.cat,o=[];
 const pk=g.kcal?t.k/g.kcal:0,pp=g.protein?t.p/g.protein:0;
 const lim={cut:1.05,lean:1.10,bulk:1.20,keep:1.10}[c];
 if(pk>lim)o.push({id:'over',tone:'bad',title:'Calories over target',msg:'You are '+fmt(t.k-g.kcal)+' kcal above your '+fmt(g.kcal)+' kcal target. '+(c==='cut'?'This slows fat loss, so keep the rest of the day light.':c==='keep'?'Go lighter at your next meal.':'A surplus that is too big adds more fat than muscle.')});
 if(pp>=1)o.push({id:'prot',tone:'good',title:'Protein target reached',msg:'You have eaten '+r1(t.p)+' g protein, which meets your '+g.protein+' g goal.'});
 if(under){
  if(c==='cut'?pk<.75:pk<.9)o.push({id:'low',tone:'warn',title:'Calories under target',msg:'You have eaten '+fmt(t.k)+' of '+fmt(g.kcal)+' kcal. You still need about '+fmt(g.kcal-t.k)+' kcal. '+(c==='cut'?'Eating far too little can cost you muscle.':c==='keep'?'Add a meal or snack to stay on plan.':'Without enough food you will not gain on a '+CATS[c].name.toLowerCase()+'.')});
  if(pp<.8)o.push({id:'plow',tone:'warn',title:'Protein is low',msg:'You still need about '+r1(g.protein-t.p)+' g protein. Try paneer, eggs, dal, curd, soya chunks or whey.'});
 }
 return o;
}
function check(mode){
 if(!state.profile)return;
 const today=new Date().toLocaleDateString('en-CA');
 const under=mode==='manual'||(mode==='auto'&&day===today&&new Date().getHours()>=20);
 let items=evaluate(under);
 if(mode!=='manual')items=items.filter(i=>!state.alerts[day+':'+i.id]);
 if(!items.length){if(mode==='manual')openModal('You are on track',[{tone:'good',title:'No problems found',msg:'Your totals so far fit your '+CATS[state.profile.cat].name+' plan.'}]);return}
 items.forEach(i=>state.alerts[day+':'+i.id]=1);save();openModal('Daily check',items);
}
function openModal(title,items){
 $('#mt').textContent=title;
 $('#mb').innerHTML=items.map(i=>'<p><span class="tag t-'+i.tone+'">'+{bad:'⚠️ Over target',good:'✅ On target',warn:'🔔 Under target'}[i.tone]+'</span><br><b>'+esc(i.title)+'</b><br>'+esc(i.msg)+'</p>').join('');
 $('#modal').hidden=false;$('#mok').focus();
}
const closeModal=()=>{$('#modal').hidden=true};
$('#mok').onclick=closeModal;
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
