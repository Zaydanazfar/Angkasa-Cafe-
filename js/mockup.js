/* Cafe Angkasa — popup menu (hamburger), tombol cari, penanda menu aktif */
(()=>{'use strict';
const b=document.body,$=s=>document.querySelector(s);
const set=o=>{b.classList.toggle('dr-open',o);$('#menuBtn').setAttribute('aria-expanded',o)};
$('#menuBtn').onclick=()=>set(true);
document.addEventListener('click',e=>{if(e.target.closest('[data-dr-close]')||e.target.closest('#drawer nav a'))set(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
$('#sBtn').onclick=()=>{$('#menu').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#q').focus({preventScroll:true}),500)};
const ids=['home','signature','menu','promo','about','contact'];
const spy=()=>{let c='home';ids.forEach(i=>{const e=document.getElementById(i);if(e&&e.getBoundingClientRect().top<innerHeight*.4)c=i});
 document.querySelectorAll('.links a,.bnav a,#drawer nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+c))};
addEventListener('scroll',spy,{passive:true});spy();
})();
