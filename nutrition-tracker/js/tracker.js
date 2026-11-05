/* Target tracker: reached, close and missed days */
function renderTracker(){
 const keys=Object.keys(state.log).sort(),now=new Date();
 const last=now.getHours()>=20?dstr(now):dstr(new Date(Date.now()-864e5));
 const res=[];
 if(keys.length&&keys[0]<=last){for(let d=new Date(keys[0]+'T12:00');dstr(d)<=last;d.setDate(d.getDate()+1)){const s=dstr(d);res.push({d:s,...(state.log[s]?dayScore(state.log[s]):{s:'miss',score:0})})}}
 const n=k=>res.filter(r=>r.s===k).length;
 let streak=0;for(let i=res.length-1;i>=0&&res[i].s==='hit';i--)streak++;
 $('#tiles').innerHTML=[['hit','✅','Target reached'],['close','🟠','Close'],['miss','❌','Missed']].map(([k,e,l])=>'<div class="tile"><b>'+n(k)+'</b>'+ic(e)+l+'</div>').join('');
 const avg=res.length?Math.round(res.reduce((a,r)=>a+r.score,0)/res.length):0;
 $('#trkNote').textContent=res.length?'Streak: '+streak+(streak===1?' day':' days')+'. On average you land '+avg+'% of the way to your daily target. Reached means calories and protein were on target, close means within reach, and missed days include days you did not log.':'Finished days are counted here. Today counts after 8 pm.';
 $('#dots').innerHTML=res.slice(-14).map(r=>'<span class="dot '+r.s+'" title="'+r.d+': '+r.s+', '+r.score+'%"></span>').join('');
}
