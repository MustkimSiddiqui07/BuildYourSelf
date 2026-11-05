/* App state and localStorage load/save */
let state,canSave=true;
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.goals)return{goals:{...DEF.goals,...s.goals},log:s.log||{},custom:s.custom||[],profile:s.profile||null,alerts:s.alerts||{},account:s.account||null}}catch(e){}return JSON.parse(JSON.stringify(DEF))}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));canSave=true}catch(e){canSave=false}$('#warn').hidden=canSave}
state=load();
let day=new Date().toLocaleDateString('en-CA');
