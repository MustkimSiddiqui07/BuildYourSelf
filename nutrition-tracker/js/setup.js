/* Body details form and goal selection */
let editing=false,draft=null;
$('#act').innerHTML=ACT.map((a,i)=>'<option value="'+i+'">'+a[0]+'</option>').join('');
function route(){
 const s=!state.profile||editing;
 $('#setup').hidden=!s;$('.grid').hidden=s;$('#planBar').hidden=s;
 if(s){$('#step1').hidden=false;$('#step2').hidden=true;$('#cancelSetup').hidden=!state.profile;
  const p=state.profile;if(p){$('#age').value=p.age;$('#sex').value=p.sex;$('#ht').value=p.h;$('#wt').value=p.w;$('#act').value=p.act}}
 else render();
}
$('#calcBtn').onclick=()=>{
 const p={age:+$('#age').value,sex:$('#sex').value,h:+$('#ht').value,w:+$('#wt').value,act:+$('#act').value};
 if(!(p.age>=15&&p.age<=80&&p.h>=120&&p.h<=230&&p.w>=30&&p.w<=250)){$('#formErr').textContent='Check your numbers: age 15–80, height 120–230 cm, weight 30–250 kg.';return}
 $('#formErr').textContent='';draft=p;
 $('#tdeeText').innerHTML='To stay at your current weight you need about <b>'+fmt(tdee(p))+' kcal</b> a day. Now choose your goal:';
 $('#cats').innerHTML=Object.keys(CATS).map(k=>{const c=CATS[k],g=plan(p,k);
  return '<div class="cat"><h3>'+c.name+'</h3><div class="mute">'+c.desc+'</div><div class="nums"><b>'+fmt(g.kcal)+' kcal</b><br>'+g.protein+' g protein, '+g.carbs+' g carbs<br>'+g.fat+' g fat, '+g.fiber+' g fiber</div><button class="btn" data-cat="'+k+'">Choose '+c.name+'</button></div>'}).join('');
 $('#step1').hidden=true;$('#step2').hidden=false;
};
$('#backBtn').onclick=()=>{$('#step1').hidden=false;$('#step2').hidden=true};
$('#cancelSetup').onclick=()=>{editing=false;route()};
$('#cats').onclick=e=>{const b=e.target.closest('[data-cat]');if(!b||!draft)return;
 state.profile={...draft,cat:b.dataset.cat,tdee:tdee(draft)};state.goals=plan(draft,b.dataset.cat);
 save();editing=false;buildGoals();route()};
$('#chg').onclick=()=>{editing=true;route()};
$('#chk').onclick=()=>check('manual');
