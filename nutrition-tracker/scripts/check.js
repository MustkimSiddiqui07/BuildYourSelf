// Syntax-checks every file in js/ and confirms index.html references them all.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const dir=path.join(__dirname,'..','js'),html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
let bad=0;
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.js'))){
  try{execFileSync(process.execPath,['--check',path.join(dir,f)],{stdio:'pipe'});console.log('ok     js/'+f)}
  catch(e){bad++;console.log('ERROR  js/'+f+'\n'+e.stderr)}
  if(!html.includes('js/'+f)){bad++;console.log('MISSING in index.html: js/'+f)}
}
process.exit(bad?1:0);
