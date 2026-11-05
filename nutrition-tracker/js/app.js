/* Event wiring and start-up */
$('#date').value=day;
$('#date').addEventListener('change',e=>{if(e.target.value){day=e.target.value;render()}});
$('#food').addEventListener('input',updateUnit);
$('#qty').addEventListener('input',preview);
$('#unit').addEventListener('change',preview);
$('#add').addEventListener('click',addEntry);
$('#qty').addEventListener('keydown',e=>{if(e.key==='Enter')addEntry()});
$('#saveCustom').addEventListener('click',saveCustom);
$('#log').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)removeEntry(+b.dataset.id)});
$('#days').addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b){day=b.dataset.d;$('#date').value=day;render()}});
$('#goals').addEventListener('change',e=>{const k=e.target.dataset.g;if(k){state.goals[k]=Math.max(0,+e.target.value||0);save();render()}});

const h=new Date().getHours();$('#meal').value=h<11?'Breakfast':h<16?'Lunch':h<19?'Snack':'Dinner';
fillList();buildGoals();save();renderMe();route();
if(!state.account)showWelcome('new',()=>openProfile(true));
else if(!wSeen())showWelcome('back',()=>check('auto'));
else check('auto');
