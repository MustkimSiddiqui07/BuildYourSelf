/* Welcome pop-up: first visit, after creating an account, and once per browser session */
const WKEY='nutri-welcomed';
let wDone=null;
const wSeen=()=>{try{return sessionStorage.getItem(WKEY)}catch(e){return null}};
const wMark=()=>{try{sessionStorage.setItem(WKEY,'1')}catch(e){}};
function greeting(){const h=new Date().getHours();return h<5?'Hello':h<12?'Good morning':h<17?'Good afternoon':h<21?'Good evening':'Hello'}
/* mode: 'new' (no account yet), 'created' (account just saved), 'back' (returning visitor) */
function showWelcome(mode,done){
 const a=state.account,name=a?a.name:'';
 wDone=done||null;
 $('#wav').innerHTML=mode==='new'?'<span class="wemoji">🥗</span>':avatarHTML(a).replace('class="dp"','class="dp xl"');
 if(mode==='new'){
  $('#wtitle').textContent='Welcome to Daily nutrition tracker! 👋';
  $('#wmsg').textContent='Track your calories, protein, carbs, fat and fiber, and reach your goals one day at a time. First, create your free account. It takes a few seconds.';
  $('#wok').textContent='Create my account';
 }else if(mode==='created'){
  $('#wtitle').textContent='Welcome, '+name+'! 🎉';
  $('#wmsg').textContent='Your account is ready. Next, tell us a little about yourself so we can build your daily calorie and protein target.';
  $('#wok').textContent='Let’s get started';
  wMark();
 }else{
  $('#wtitle').textContent='Welcome back, '+name+'! 👋';
  $('#wmsg').textContent=greeting()+'! Ready to log today’s meals and stay on target?';
  $('#wok').textContent='Continue';
  wMark();
 }
 $('#welcome').hidden=false;$('#wok').focus();
}
function closeWelcome(){
 if($('#welcome').hidden)return;
 $('#welcome').hidden=true;
 const f=wDone;wDone=null;if(f)f();
}
$('#wok').onclick=closeWelcome;
$('#welcome').addEventListener('click',e=>{if(e.target.id==='welcome')closeWelcome()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeWelcome()});
