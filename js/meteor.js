/* Mode gelap: bintang berkilau + meteor jatuh acak (ringan, hanya animasi CSS) */
(()=>{'use strict';
const root=document.documentElement;if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const R=(a,b)=>a+Math.random()*(b-a);
/* bintang berkilau */
const box=document.createDocumentFragment();
for(let i=0;i<18;i++){const s=document.createElement('i');s.className='spark';s.setAttribute('aria-hidden','true');
  s.style.cssText='left:'+R(3,97).toFixed(1)+'vw;top:'+R(4,92).toFixed(1)+'vh;--t:'+R(2.2,5.5).toFixed(2)+'s;--d:'+(-R(0,6)).toFixed(2)+'s;width:'+R(9,16).toFixed(0)+'px;height:'+R(9,16).toFixed(0)+'px';box.appendChild(s)}
document.body.prepend(box);
/* meteor */
let live=0;
function meteor(big){
  if(root.dataset.theme!=='dark'||document.hidden||live>=3)return;
  const W=innerWidth,H=innerHeight,a=R(22,48),len=big?R(260,380):R(110,210),dist=big?R(.55,.8)*W:R(.22,.42)*W;
  const m=document.createElement('i');m.className='meteor'+(big?' big':'');m.setAttribute('aria-hidden','true');
  const rad=a*Math.PI/180;
  m.style.cssText='--len:'+len.toFixed(0)+'px;--hd:'+(big?8:5)+'px;--a:'+a.toFixed(1)+'deg;--x:'+R(-.05*W,.75*W).toFixed(0)+'px;--y:'+R(.02*H,.45*H).toFixed(0)+'px;--dx:'+(Math.cos(rad)*dist).toFixed(0)+'px;--dy:'+(Math.sin(rad)*dist).toFixed(0)+'px;--dur:'+(big?R(1.6,2.2):R(.8,1.4)).toFixed(2)+'s';
  live++;m.addEventListener('animationend',()=>{m.remove();live--});document.body.prepend(m);
}
function loop(){meteor(Math.random()<.14);setTimeout(loop,R(2200,6500))}
setTimeout(()=>meteor(false),1200);setTimeout(loop,3500);
})();
