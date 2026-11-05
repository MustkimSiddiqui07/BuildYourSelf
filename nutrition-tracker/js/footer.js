/* Footer: owner name and social media buttons (edit OWNER in js/data.js) */
const SOCIAL_SVG={
 github:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
 linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-7M12 13c0-2 1.5-3 3-3s3 1 3 3v4"/>',
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
 x:'<path d="M4 4l16 16M20 4L4 20"/>',
 facebook:'<circle cx="12" cy="12" r="9"/><path d="M13.5 20v-7.5H16l.4-3h-2.9V7.7c0-.9.3-1.5 1.6-1.5h1.4"/><path d="M10.5 12.5H13"/>',
 youtube:'<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>',
 whatsapp:'<path d="M4 20l1.2-4A8.5 8.5 0 1 1 8 18.8z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2z"/>',
 email:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>'
};
(function(){
 $('#fname').textContent=OWNER.name;
 $('#fcopy').textContent='© '+new Date().getFullYear()+' '+OWNER.name+'. All rights reserved.';
 $('#socials').innerHTML=OWNER.socials.filter(s=>s.url&&SOCIAL_SVG[s.k]).map(s=>{
  const ext=/^https?:/.test(s.url)?' target="_blank" rel="noopener noreferrer"':'';
  return '<a class="soc" href="'+esc(s.url)+'"'+ext+' aria-label="'+esc(s.label)+' – '+esc(OWNER.name)+'" title="'+esc(s.label)+'"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+SOCIAL_SVG[s.k]+'</svg><span>'+esc(s.label)+'</span></a>';
 }).join('');
})();
