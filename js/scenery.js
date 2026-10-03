/* Pemandangan langit untuk tema terang */
(()=>{'use strict';
const el=document.createElement('div');el.className='scenery';el.setAttribute('aria-hidden','true');
const clouds=[[190,8,.95,95,0],[260,19,.8,140,-60],[140,31,.7,115,-30],[220,44,.6,170,-110],[110,13,.55,80,-20]]
 .map(([w,t,o,s,d],i)=>`<i class="cloud" style="--w:${w}px;top:${t}%;--o:${o};--t:${s}s;--d:${d}s;--x:${i*18+6}vw"></i>`).join('');
const bird='<svg viewBox="0 0 30 12"><path d="M1 9Q8 0 15 7Q22 0 29 9" fill="none" stroke="#1d4f80" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const birds=[[26,22,75,0],[20,26,75,-2],[16,29,75,-4],[22,16,110,-40],[15,20,110,-43]].map(([w,t,s,d])=>`<b class="bird" style="--w:${w}px;top:${t}%;--t:${s}s;--d:${d}s">${bird}</b>`).join('');
const snow=(x,y,w)=>`<polygon points="${x},${y} ${x-w},${y+38} ${x-w*.45},${y+30} ${x},${y+46} ${x+w*.5},${y+29} ${x+w},${y+40}" fill="#fff" opacity=".92"/>`;
const mtn=`<div class="mtn"><svg viewBox="0 0 1440 400" preserveAspectRatio="none">
<path fill="#b2d9f4" d="M0 250L120 180 210 225 330 140 450 228 560 172 700 245 820 150 940 225 1060 168 1180 238 1300 182 1440 232V400H0Z"/>
<path fill="#82bbe8" d="M0 300L150 210 260 270 400 168 540 280 690 200 820 290 980 188 1120 285 1260 214 1440 290V400H0Z"/>
${snow(400,168,30)}${snow(980,188,30)}${snow(150,210,24)}${snow(1260,214,24)}${snow(690,200,22)}
<path fill="#5c9bd4" d="M0 352L100 302 220 342 360 282 500 342 650 296 800 346 960 292 1100 346 1250 306 1440 352V400H0Z"/>
</svg></div>`;
el.innerHTML='<i class="sun"></i>'+clouds+birds+mtn;
document.body.prepend(el);
})();
