/* Navigasi: popup menu (hamburger), bottom nav, scroll-spy, pencarian cepat */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const html=document.documentElement,dr=$('#drawer'),bur=$('#burger');
let isOpen=false;
function openDr(o){isOpen=o;html.classList.toggle('dr-open',o);dr.setAttribute('aria-hidden',!o);dr.inert=!o;bur.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)setTimeout(()=>$('#drClose').focus(),60);else bur.focus({preventScroll:true})}
dr.inert=true;
bur.addEventListener('click',()=>openDr(true));
$('#drClose').addEventListener('click',()=>openDr(false));
$('#drBack').addEventListener('click',()=>openDr(false));
addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)openDr(false)});
addEventListener('resize',()=>{if(isOpen&&innerWidth>1400)openDr(false)});
/* klik link: tutup popup, atur filter menu */
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-spy]');if(!a)return;
  const spy=a.dataset.spy;
  if(spy==='fav'){e.preventDefault();window.angkasaMenu&&angkasaMenu.setFilter('fav');$('#menu').scrollIntoView({behavior:'smooth'})}
  else if(spy==='menu'&&window.angkasaMenu)angkasaMenu.setFilter('all');
  if(a.closest('#drawer'))openDr(false);
});
$('#searchBtn').addEventListener('click',()=>{$('#menu').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#q').focus({preventScroll:true}),500)});
/* scroll-spy */
let cur='home',favOn=false;
const paint=()=>{const key=(cur==='menu'&&favOn)?'fav':cur;$$('[data-spy]').forEach(a=>{const on=a.dataset.spy===key;a.classList.toggle('active',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})};
addEventListener('angkasa:filter',e=>{favOn=e.detail.c==='fav';paint()});
const ids=['home','menu','promo','about','gallery','contact'],vis=new Map();
if('IntersectionObserver'in window){
  const io=new IntersectionObserver(es=>{es.forEach(e=>vis.set(e.target.id,e.isIntersecting));const f=ids.find(i=>vis.get(i));if(f){cur=f;paint()}},{rootMargin:'-40% 0px -55% 0px'});
  ids.forEach(i=>{const el=document.getElementById(i);el&&io.observe(el)});
}
paint();
const hv=$('.hero video');if(hv&&'IntersectionObserver'in window)new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?hv.play().catch(()=>{}):hv.pause()),{threshold:.05}).observe(hv);
})();
