// Zero-dependency static file server for local development.
// Usage: node server.js [--port 3000] [--host 0.0.0.0]
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const arg=(n,d)=>{const i=process.argv.indexOf('--'+n);return i>-1?process.argv[i+1]:d};
const PORT=+(arg('port',process.env.PORT||3000)),HOST=arg('host',process.env.HOST||'0.0.0.0');
const ROOT=__dirname;
const TYPES={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
const PUBLIC=new Set(['index.html']);
const server=http.createServer((req,res)=>{
  let p;try{p=decodeURIComponent(new URL(req.url,'http://x').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
  if(p.endsWith('/'))p+='index.html';
  const file=path.join(ROOT,p);
  const rel=path.relative(ROOT,file);
  const allowed=PUBLIC.has(rel)||/^(css|js|assets)[\\/]/.test(rel);
  if(!allowed||rel.startsWith('..')){res.writeHead(404);return res.end('Not found')}
  fs.readFile(file,(err,buf)=>{
    if(err){res.writeHead(404);return res.end('Not found')}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(buf);
  });
});
server.listen(PORT,HOST,()=>{
  console.log('\nNutrition tracker is running\n  Local:    http://localhost:'+PORT);
  for(const l of Object.values(os.networkInterfaces()))for(const i of l||[])if(i.family==='IPv4'&&!i.internal)console.log('  Network:  http://'+i.address+':'+PORT+'  (open on your phone, same Wi-Fi)');
  console.log('\nPress Ctrl+C to stop.\n');
});
