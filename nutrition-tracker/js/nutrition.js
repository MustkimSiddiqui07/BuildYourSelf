/* Nutrition math: food totals, calorie plan, daily score */
const all=()=>base.concat(state.custom);
const find=n=>all().find(x=>x.n.toLowerCase()===n.trim().toLowerCase());
function calc(food,qty,unit){
  const g=unit==='piece'?qty*food.pc:qty,m=g/100;
  return{g:r1(g),k:r1(food.k*m),p:r1(food.p*m),c:r1(food.c*m),f:r1(food.f*m),fi:r1(food.fi*m)};
}
function totals(list){return list.reduce((t,e)=>({k:t.k+e.k,p:t.p+e.p,c:t.c+e.c,f:t.f+e.f,fi:t.fi+e.fi}),{k:0,p:0,c:0,f:0,fi:0})}
const tdee=p=>Math.round((10*p.w+6.25*p.h-5*p.age+(p.sex==='m'?5:-161))*ACT[p.act][1]);
function plan(p,key){const c=CATS[key];let kcal=Math.round(tdee(p)*(1+c.adj)/10)*10;kcal=Math.max(kcal,p.sex==='m'?1500:1200);
 const protein=Math.round(p.w*c.prot),fat=Math.round(kcal*.25/9),carbs=Math.max(0,Math.round((kcal-protein*4-fat*9)/4));
 return{kcal,protein,carbs,fat,fiber:Math.round(kcal/1000*14)}}
function dayScore(list){
 const t=totals(list),g=state.goals,lim=LIM[state.profile.cat],pk=t.k/g.kcal,pp=t.p/g.protein;
 const hit=pk>=.9&&pk<=lim&&pp>=.9,close=!hit&&pk>=.75&&pk<=lim+.1&&pp>=.7;
 return{s:hit?'hit':close?'close':'miss',score:Math.round(((1-Math.min(1,Math.abs(pk-1)))+Math.min(1,pp))/2*100)};
}
const dstr=d=>d.toLocaleDateString('en-CA');
