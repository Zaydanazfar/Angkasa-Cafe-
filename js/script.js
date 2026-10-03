/* Cafe Angkasa — tema, menu mobile, bintang, animasi muncul */
(()=>{'use strict';
const $=s=>document.querySelector(s),root=document.documentElement;
const IC={sun:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,moon:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`};const paint=()=>{$('#theme').innerHTML=root.dataset.theme==='dark'?IC.sun:IC.moon};paint();
$('#theme').onclick=()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme3',n)}catch(e){}paint()};
const nav=$('#nav');addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>30),{passive:true});
const st=$('#stars');for(let i=0;i<80;i++){const s=document.createElement('i');s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation-delay:'+Math.random()*4+'s';st.appendChild(s)}
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
})();
