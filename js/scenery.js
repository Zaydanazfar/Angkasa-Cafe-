/* Pemandangan mode terang: gunung asli, air terjun (sprite 8 frame), burung terbang (siluet dengan kepakan sayap SMIL) */
(()=>{'use strict';
const el=document.createElement('div');el.className='scenery';el.setAttribute('aria-hidden','true');
/* satu burung: dua sayap berubah bentuk (naik-tengah-turun), badan, kepala, ekor */
const W={u:'M32 17C27 11 20 5 9 3C15 9 22 15 32 19Z',m:'M32 17C26 14 18 13 5 13C14 16 23 18 32 19Z',d:'M32 17C27 20 21 25 11 29C19 25 26 22 32 19Z'};
const mir=p=>p.replace(/([MCZ])([^MCZ]*)/g,(m,c,r)=>c+r.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g,(q,x,y)=>(64-x)+' '+y));
const wing=(d,o,begin)=>`<path d="${W.m}"><animate attributeName="d" dur="${d}s" begin="${begin}s" repeatCount="indefinite" values="${W.u};${W.m};${W.d};${W.m};${W.u}"/></path>`+
  `<path d="${mir(W.m)}"><animate attributeName="d" dur="${d}s" begin="${begin}s" repeatCount="indefinite" values="${mir(W.u)};${mir(W.m)};${mir(W.d)};${mir(W.m)};${mir(W.u)}"/></path>`;
const bird=(cls,style,dur,begin,op)=>`<svg class="b ${cls}" viewBox="0 0 64 32" style="${style};opacity:${op}">${wing(dur,0,begin)}<ellipse cx="32" cy="18.2" rx="4.2" ry="1.7"/><circle cx="36.6" cy="17.4" r="1.5"/><path d="M28 18L22 16.6L22 19.6Z"/></svg>`;
/* kawanan formasi V */
const V=[[0,0],[-9,5],[-9,-5],[-18,10],[-18,-10]];
const flock=`<div class="flock" style="--y:24%;--t:52s;--d:-8s">`+V.map(([x,y],i)=>`<div class="b" style="--x:${(30+x)}px;--yy:${y*2+40}px;--s:26px;--bb:${3+i*.4}s;--bd:${-i*.6}s">${bird('','position:static',.78+i*.04,-i*.13,.9)}</div>`).join('').replace(/class="b"/g,'class="b"')+`</div>`;
const solo=[ // y, ukuran, durasi lintas, delay, kepak, opacity, arah balik
 ['14%',34,64,-30,.9,.88,0],['33%',22,78,-55,.8,.7,1],['9%',16,92,-12,.7,.55,0],['41%',28,70,-5,1.0,.8,1]
].map(([y,s,t,d,fl,o,r])=>`<div class="bd" style="--y:${y};--t:${t}s;--d:${d}s;--s:${s}px;--bb:${2.6+s/40}s">${bird(r?'rev':'','',fl,0,o)}</div>`).join('');
el.innerHTML='<img class="sc-sun" src="gambar/scene/sun.webp" alt="" decoding="async">'+solo+flock+
 '<div class="mtn"><div class="mtn-in"><img src="gambar/scene/mountains.webp" alt="" decoding="async"><div class="fall"><img src="gambar/scene/fall.webp" alt="" decoding="async"></div></div></div>';
document.body.prepend(el);
})();
