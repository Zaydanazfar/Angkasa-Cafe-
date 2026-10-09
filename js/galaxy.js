/* Hiasan antariksa (ringan): nebula statis, bintang CSS, Bimasakti statis, 3 ornamen planet */
(()=>{'use strict';
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const add=h=>{const d=document.createElement('div');d.innerHTML=h;while(d.firstChild)document.body.prepend(d.firstChild)};
add('<div class="nebula" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="stars-css" aria-hidden="true"><i class="s1"></i><i class="s2"></i><i class="s3"></i><i class="s4"></i></div><i class="comet" aria-hidden="true" style="--x:12vw;--y:6vh;--c:11s;--d:2s"></i><i class="comet" aria-hidden="true" style="--x:40vw;--y:2vh;--c:17s;--d:9s"></i>');
/* ornamen: hanya 3 (Saturnus, Bumi besar, Bulan) */
const P=[['#signature','sat',230,'top:8%;right:-90px',''],['#space','earth big',0,'',''],['#contact','moon',110,'top:10%;right:6%','']],pl=[];
P.forEach(([sel,k,s,pos])=>{const host=document.querySelector(sel);if(!host)return;const d=document.createElement('div');d.className='planet '+k;if(s)d.style.cssText='--s:'+s+'px;'+pos;d.setAttribute('aria-hidden','true');const gt={sat:1,earth:0,moon:2}[k.split(' ')[0]];d.innerHTML=gt===undefined?'<i class="ball"></i>':'<canvas class="ball gl" data-t="'+gt+'"></canvas>';host.prepend(d);pl.push(d)});
if('IntersectionObserver'in window)new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('paused',!e.isIntersecting)),{rootMargin:'100px'}).observe&&(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('paused',!e.isIntersecting)),{rootMargin:'100px'});pl.forEach(d=>io.observe(d))})();
/* Bimasakti: digambar sekali ke kanvas statis */
const cd=document.createElement('canvas');cd.id='dust';cd.setAttribute('aria-hidden','true');document.body.prepend(cd);const dx=cd.getContext('2d');
function dust(){const D=Math.min(devicePixelRatio||1,1.5),W=innerWidth,H=innerHeight;cd.width=W*D;cd.height=H*D;dx.setTransform(D,0,0,D,0,0);dx.clearRect(0,0,W,H);
  const x0=-.15*W,y0=.82*H,x1=1.15*W,y1=.06*H,L=Math.hypot(x1-x0,y1-y0),ang=Math.atan2(y1-y0,x1-x0),sg=.11*Math.min(W,H);
  dx.save();dx.translate((x0+x1)/2,(y0+y1)/2);dx.rotate(ang);const gr=dx.createLinearGradient(0,-sg*2.2,0,sg*2.2);gr.addColorStop(0,'rgba(150,140,255,0)');gr.addColorStop(.5,'rgba(170,160,255,.13)');gr.addColorStop(1,'rgba(150,140,255,0)');dx.fillStyle=gr;dx.fillRect(-L/2,-sg*2.2,L,sg*4.4);dx.restore();
  const N=Math.min(1800,Math.round(W*H/600)),rn=()=>(Math.random()+Math.random()+Math.random()-1.5)/1.5;
  for(let i=0;i<N;i++){const t=Math.random()-.5,off=rn()*sg*1.6,x=(x0+x1)/2+Math.cos(ang)*t*L-Math.sin(ang)*off,y=(y0+y1)/2+Math.sin(ang)*t*L+Math.cos(ang)*off;dx.globalAlpha=.15+Math.random()*.55*(1-Math.min(1,Math.abs(off)/(sg*1.6)));dx.fillStyle=Math.random()<.2?'#cdd6ff':'#fff';dx.fillRect(x,y,Math.random()<.12?1.6:.8,Math.random()<.12?1.6:.8)}dx.globalAlpha=1}
dust();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(dust,250)});
})();
