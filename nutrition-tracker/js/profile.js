/* Account name and profile photo editor */
const ring=i=>'linear-gradient(135deg,'+FR[i][1]+','+FR[i][2]+')';
const ini=n=>((n||'').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2)||'?').toUpperCase();
function avatarHTML(a){return '<span class="dp" style="background:'+ring(a.frame||0)+'">'+(a.photo?'<img alt="" src="'+a.photo+'">':'<span class="ini">'+esc(ini(a.name))+'</span>')+'</span>'}
function renderMe(){const a=state.account;$('#meBtn').innerHTML=avatarHTML(a||{name:'?'});$('#hi').textContent=a?'👋 Hi, '+a.name:''}
let pimg=null,firstRun=false;
const cv=$('#cv'),cx=cv.getContext('2d');
function drawCv(){
 const S=240;cx.filter='none';cx.fillStyle='#E6EDE5';cx.fillRect(0,0,S,S);
 if(pimg){const z=+$('#pz').value,s=S/Math.min(pimg.width,pimg.height)*z,w=pimg.width*s,h=pimg.height*s;
  const ox=(+$('#px').value)/100*(w-S)/2,oy=(+$('#py').value)/100*(h-S)/2;
  if($('#pe').checked)cx.filter='contrast(1.08) saturate(1.15) brightness(1.04)';
  cx.drawImage(pimg,(S-w)/2-ox,(S-h)/2-oy,w,h);cx.filter='none'}
 else{cx.fillStyle='#1F7A4D';cx.font='800 96px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(ini($('#nm').value),S/2,S/2+4)}
 $('#pdp').style.background=ring(+$('#pf').value);
}
function openProfile(first){
 firstRun=first;const a=state.account||{name:'',frame:0,photo:null};
 $('#pt').textContent=first?'Create your account':'Edit profile';
 $('#nm').value=a.name;$('#pf').value=a.frame||0;$('#pz').value=1;$('#px').value=0;$('#py').value=0;$('#pe').checked=false;$('#nmErr').textContent='';
 $('#pcancel').hidden=first;$('#psave').textContent=first?'✨ Create account':'💾 Save changes';pimg=null;
 if(a.photo){const im=new Image();im.onload=()=>{pimg=im;drawCv()};im.src=a.photo}
 drawCv();$('#pm').hidden=false;$('#nm').focus();
}
$('#meBtn').onclick=()=>openProfile(false);
$('#pcancel').onclick=()=>{$('#pm').hidden=true};
$('#prem').onclick=()=>{pimg=null;$('#pfile').value='';drawCv()};
$('#pfile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{const im=new Image();im.onload=()=>{pimg=im;$('#pz').value=1;$('#px').value=0;$('#py').value=0;$('#pe').checked=true;drawCv()};im.src=r.result};r.readAsDataURL(f)};
['pz','px','py','pe','pf','nm'].forEach(i=>$('#'+i).addEventListener('input',drawCv));
$('#psave').onclick=()=>{const n=$('#nm').value.trim();
 if(!n){$('#nmErr').textContent='Enter your name to create your account.';return}
 state.account={name:n,frame:+$('#pf').value,photo:pimg?cv.toDataURL('image/jpeg',.85):null};
 const wasFirst=firstRun;firstRun=false;
 save();$('#pm').hidden=true;renderMe();
 if(wasFirst)showWelcome('created')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!firstRun)$('#pm').hidden=true});
