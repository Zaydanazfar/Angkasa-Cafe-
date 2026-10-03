/* Hiasan galaksi: bintang berkelip + bintang jatuh (canvas), aurora, planet paralaks */
(()=>{'use strict';
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* aurora */
const au=document.createElement('div');au.className='aurora';au.setAttribute('aria-hidden','true');au.innerHTML='<i></i><i></i><i></i>';document.body.prepend(au);
/* planet */
const P=[['#signature','sat',250,'top:6%;right:-95px',.10],['#promo','mars',120,'bottom:5%;left:-46px',.07],['#promo','blue',150,'bottom:9%;right:2%',.12],
['#about','moon',92,'top:9%;right:6%',.09],['#testi','moon',150,'top:12%;left:-52px',.08],['#contact','blue',210,'top:5%;right:-76px',.10],
['#space','mars',130,'top:14%;left:7%',.12],['#space','moon',84,'bottom:16%;right:9%',.14]];
const pl=[];
P.forEach(([sel,k,s,pos,sp])=>{const host=document.querySelector(sel);if(!host)return;const d=document.createElement('div');d.className='planet '+k;d.style.cssText='--s:'+s+'px;'+pos;d.setAttribute('aria-hidden','true');d.innerHTML='<i class="ball"></i>';host.prepend(d);pl.push({d,host,sp})});
let tick=false;const par=()=>{tick=false;const h=innerHeight/2;pl.forEach(p=>{const r=p.host.getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+200)return;p.d.style.transform='translate3d(0,'+((r.top+r.height/2-h)*p.sp).toFixed(1)+'px,0)'})};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(par)}},{passive:true});par();
/* bintang */
const cv=document.createElement('canvas');cv.id='sky';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const cx=cv.getContext('2d');let W,H,D,stars=[],shoot=[],nextShoot=1200;
const glow=document.createElement('canvas');glow.width=glow.height=32;{const g=glow.getContext('2d'),r=g.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.25,'rgba(255,255,255,.45)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,32,32)}
const TINT=['255,255,255','205,225,255','255,236,205','190,205,255'];
function size(){D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0);
  const n=Math.min(230,Math.round(W*H/8500));stars=Array.from({length:n},()=>{const z=Math.random();return{x:Math.random()*W,y:Math.random()*H,z,r:.3+z*1.3+(Math.random()<.06?.9:0),a:.35+Math.random()*.65,sp:.6+Math.random()*2.2,ph:Math.random()*6.28,c:TINT[Math.random()*TINT.length|0]}})}
size();addEventListener('resize',size);
function frame(t){const dark=root.dataset.theme==='dark',k=1;cx.clearRect(0,0,W,H);if(!dark){if(!reduce)requestAnimationFrame(frame);return}const sy=scrollY;
  for(const s of stars){if(!dark&&s.z<.35)continue;const y=((s.y-sy*s.z*.18)%H+H)%H,tw=reduce?1:.55+.45*Math.sin(t/1000*s.sp+s.ph),a=s.a*tw*k;
    if(s.r>1.5){cx.globalAlpha=a*.9;const g=s.r*7;cx.drawImage(glow,s.x-g/2,y-g/2,g,g)}
    cx.globalAlpha=a;cx.fillStyle='rgb('+s.c+')';cx.beginPath();cx.arc(s.x,y,s.r,0,6.283);cx.fill()}
  if(!reduce&&dark){if(t>nextShoot){nextShoot=t+1800+Math.random()*2700;const a=.55+Math.random()*.25;shoot.push({x:Math.random()*W*.9+W*.1,y:Math.random()*H*.45,vx:-Math.cos(a)*(9+Math.random()*5),vy:Math.sin(a)*(9+Math.random()*5),l:0})}
    for(let i=shoot.length-1;i>=0;i--){const s=shoot[i];s.x+=s.vx;s.y+=s.vy;s.l++;const al=Math.max(0,1-s.l/55),tx=s.x-s.vx*7,ty=s.y-s.vy*7,g=cx.createLinearGradient(s.x,s.y,tx,ty);g.addColorStop(0,'rgba(255,255,255,'+al+')');g.addColorStop(1,'rgba(150,180,255,0)');cx.globalAlpha=1;cx.strokeStyle=g;cx.lineWidth=1.6;cx.beginPath();cx.moveTo(s.x,s.y);cx.lineTo(tx,ty);cx.stroke();if(s.l>55)shoot.splice(i,1)}}
  cx.globalAlpha=1;if(!reduce)requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();
