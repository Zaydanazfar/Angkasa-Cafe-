/* Cafe Angkasa — tema, menu mobile, bintang, animasi muncul */
(()=>{'use strict';
const $=s=>document.querySelector(s),root=document.documentElement;
const paint=()=>{$('#theme').textContent=root.dataset.theme==='dark'?'☀️':'🌙'};paint();
$('#theme').onclick=()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}paint()};
const links=$('#links'),bur=$('#burger');
bur.onclick=()=>{const o=links.classList.toggle('open');bur.setAttribute('aria-expanded',o);bur.classList.toggle('on',o)};
links.querySelectorAll('a').forEach(a=>a.onclick=()=>{links.classList.remove('open');bur.setAttribute('aria-expanded','false');bur.classList.remove('on')});
const nav=$('#nav');addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>30),{passive:true});
const st=$('#stars');for(let i=0;i<80;i++){const s=document.createElement('i');s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation-delay:'+Math.random()*4+'s';st.appendChild(s)}
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
})();
