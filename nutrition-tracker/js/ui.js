/* Main screen rendering and goal inputs */

function render(){
  const list=state.log[day]||[],t=totals(list),g=state.goals;
  const pct=g.kcal>0?t.k/g.kcal:0,over=pct>1;
  $('#arc').style.strokeDashoffset=326.7*(1-Math.min(1,pct));
  $('#arc').style.stroke=over?'var(--over)':'var(--kcal)';
  $('#kcalBig').textContent=fmt(t.k);
  renderMe();renderTracker();renderSugg();
  if(state.profile){$('#planText').innerHTML='<b>'+CATS[state.profile.cat].name+'</b> plan: '+fmt(g.kcal)+' kcal and '+g.protein+' g protein a day'}
  const left=g.kcal-t.k;
  $('#kcalSub').textContent='of '+fmt(g.kcal)+' kcal, '+(left>=0?fmt(left)+' left':fmt(-left)+' over');
  $('#bars').innerHTML=NUT.map(([key,label,k,col])=>{
    const v=t[k],goal=g[key],w=goal>0?Math.min(100,v/goal*100):0;
    return '<div class="bar"><div class="top"><span>'+ic(NUT_ICON[key])+label+'</span><span>'+r1(v)+' / '+goal+' g</span></div><div class="track"><div class="fill" style="width:'+w+'%;background:var(--'+col+')"></div></div></div>';
  }).join('');
  $('#log').innerHTML=list.length?MEALS.map(m=>{
    const es=list.filter(e=>e.meal===m);if(!es.length)return'';
    const mk=es.reduce((s,e)=>s+e.k,0);
    return '<div class="meal"><h3><span>'+ic(MEAL_ICON[m])+m+'</span><span>'+fmt(mk)+' kcal</span></h3>'+es.map(e=>
      '<div class="item"><div class="nm">'+esc(e.name)+'<small>'+e.qty+(e.unit==='piece'?' pc':' g')+(e.unit==='piece'?' ('+e.g+' g)':'')+'</small></div><div class="num">'+e.k+' kcal<br>'+e.p+' g protein</div><button class="x" data-id="'+e.id+'" aria-label="Remove '+esc(e.name)+'">×</button></div>').join('')+'</div>';
  }).join(''):'<p class="empty">Nothing logged for this day yet. Add your first food above.</p>';
  const keys=Object.keys(state.log).sort().reverse().slice(0,7);
  $('#days').innerHTML=keys.map(d=>{const s=totals(state.log[d]);
    return '<button class="day'+(d===day?' on':'')+'" data-d="'+d+'"><b>'+new Date(d+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'})+'</b><span>'+fmt(s.k)+' kcal, '+r1(s.p)+' g protein</span></button>';}).join('');
  $('#daysEmpty').hidden=keys.length>0;
}

function buildGoals(){
  const L={kcal:'Calories',protein:'Protein (g)',carbs:'Carbs (g)',fat:'Fat (g)',fiber:'Fiber (g)'};
  $('#goals').innerHTML=Object.keys(L).map(k=>'<div><label for="g_'+k+'">'+L[k]+'</label><input id="g_'+k+'" data-g="'+k+'" type="number" min="0" step="any" value="'+state.goals[k]+'"></div>').join('');
}
