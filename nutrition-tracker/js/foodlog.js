/* Adding foods, custom foods and the live preview */
function fillList(){$('#foods').innerHTML=all().map(x=>'<option value="'+esc(x.n)+'">').join('')}

function updateUnit(){
  const f=find($('#food').value),u=$('#unit'),cur=u.value;
  u.innerHTML='<option value="g">grams</option>'+(f&&f.pc?'<option value="piece">piece (~'+f.pc+' g)</option>':'');
  if(cur==='piece'&&f&&f.pc)u.value='piece';
  preview();
}
function preview(){
  const f=find($('#food').value),q=+$('#qty').value,p=$('#preview');
  if(!$('#food').value.trim()){p.textContent='Choose a food to see its nutrients.';return}
  if(!f){const nm=$('#food').value.trim();p.innerHTML='Not in the list. <a target="_blank" rel="noopener" href="https://www.google.com/search?q='+encodeURIComponent(nm+' calories protein carbs fat per 100g')+'">Look it up on Google</a>, then <button class="link" data-open>add it with your own values</button>.';return}
  if(!(q>0)){p.textContent='Enter a quantity above zero.';return}
  const c=calc(f,q,$('#unit').value);
  p.textContent=c.g+' g: '+c.k+' kcal, '+c.p+' g protein, '+c.c+' g carbs, '+c.f+' g fat, '+c.fi+' g fiber';
}

function addEntry(){
  const f=find($('#food').value),q=+$('#qty').value;
  if(!f||!(q>0)){preview();return}
  const unit=$('#unit').value,c=calc(f,q,unit);
  (state.log[day]=state.log[day]||[]).push({id:Date.now()+Math.random(),meal:$('#meal').value,name:f.n,qty:q,unit,...c});
  save();$('#food').value='';$('#qty').value=100;updateUnit();render();$('#food').focus();check('add');
}
function removeEntry(id){
  state.log[day]=(state.log[day]||[]).filter(e=>e.id!==id);
  if(!state.log[day].length)delete state.log[day];
  save();render();
}
function saveCustom(){
  const n=$('#cn').value.trim(),k=+$('#ck').value;
  if(!n||!(k>=0)||$('#ck').value===''){alert('Enter a name and calories per 100 g.');return}
  const item={n,k,p:+$('#cp').value||0,c:+$('#cc').value||0,f:+$('#cf').value||0,fi:+$('#cfi').value||0,pc:0};
  state.custom=state.custom.filter(x=>x.n.toLowerCase()!==n.toLowerCase());
  state.custom.push(item);save();fillList();
  ['cn','ck','cp','cc','cf','cfi'].forEach(i=>$('#'+i).value='');
  $('#food').value=n;updateUnit();
}

$('#preview').addEventListener('click',e=>{if(e.target.closest('[data-open]')){const d=$('#cn').closest('details');d.open=true;$('#cn').value=$('#food').value.trim();$('#gl').href='https://www.google.com/search?q='+encodeURIComponent($('#cn').value+' calories protein carbs fat per 100g');$('#ck').focus()}});
$('#cn').addEventListener('input',e=>{$('#gl').href='https://www.google.com/search?q='+encodeURIComponent(e.target.value+' calories protein carbs fat per 100g')});
