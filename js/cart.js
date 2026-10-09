/* Cafe Angkasa — keranjang, checkout, konfirmasi. Dimuat SETELAH script.js */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rp=n=>'Rp'+n.toLocaleString('id-ID');
const KEY='angkasa_cart',CK='angkasa_coupon',TAX=.1,SHIP=8000;
const M=[
['k1','kopi','Espresso Nova',15,'Shot tunggal pekat dengan crema tebal.',0,'espresso'],
['k2','kopi','Americano Orbit',18,'Espresso dengan air, bersih dan segar.',0,'americano'],
['k3','kopi','Kopi Susu Orbit',24,'Signature kami: espresso, susu segar, dan gula aren.',1,'kopi-susu-angkasa'],
['k4','kopi','Cappuccino Nebula',24,'Foam susu tebal dengan taburan cokelat.',0,'cappuccino'],
['k5','kopi','Latte Aurora',20,'Lembut, creamy, dengan latte art.',0,'cafe-latte'],
['k6','kopi','V60 Pulsar',28,'Seduh manual biji pilihan Nusantara.',0,'v60-single-origin'],
['n1','non','Matcha Galaxy',26,'Matcha premium dengan susu dingin.',1,'matcha-latte'],
['n2','non','Cokelat Eclipse',22,'Cokelat pekat, dingin dan menyegarkan.',0,'chocolate'],
['n3','non','Lemon Tea Solar',18,'Teh dingin dengan perasan lemon.',0,'lemon-tea'],
['n4','non','Teh Melati Luna',16,'Teh melati harum, segar dengan es.',0,'teh-melati'],
['n5','non','Jus Jeruk Mars',20,'Jeruk segar dengan es dan daun mint.',0,'jus-jeruk'],
['m1','makan','Croissant Comet',22,'Renyah di luar, lembut di dalam.',1,'croissant-butter'],
['m2','makan','Nasi Goreng Galaksi',35,'Nasi goreng rempah dengan telur mata sapi.',0,'nasi-goreng-angkasa'],
['m3','makan','Mie Goreng Saturnus',30,'Mie goreng ayam, sayur, dan telur.',0,'mie-goreng-spesial'],
['m4','makan','Roti Bakar Kosmos',18,'Roti bakar dengan cokelat, keju, dan pisang.',0,'roti-bakar-cokelat-keju'],
['m5','makan','Kentang Goreng Asteroid',20,'Kentang goreng renyah dengan rosemary.',0,'kentang-goreng']
].map(([id,c,n,p,d,s,f])=>({id,c,n,p:p*1000,d,s,f}));
const P=[['p1','Morning Orbit',25,'kopi-susu-angkasa'],['p2','Double Galaxy',45,'cafe-latte'],['p3','Lunch in Space',45,'nasi-goreng-angkasa']].map(([id,n,p,f])=>({id,c:'promo',n,p:p*1000,f}));
const by={};M.concat(P).forEach(x=>by[x.id]=x);window.angkasaMenuData=M;
const TYPE={dine:'Makan di tempat',pickup:'Ambil sendiri',delivery:'Delivery'};
const PAY={qris:['QRIS','Kode QR dikirim admin lewat WhatsApp atau scan di kasir.'],transfer:['Transfer Bank','Transfer ke BCA 000-000-0000 a.n. Cafe Angkasa, cantumkan kode pesanan.'],ewallet:['E-Wallet','Kirim ke GoPay/OVO/DANA 0812-0000-0000 a.n. Cafe Angkasa.'],cash:['Bayar di Tempat','Bayar tunai di kasir atau saat pesanan tiba.']};
let cart=[],coupon='';
try{cart=(JSON.parse(localStorage.getItem(KEY))||[]).filter(i=>by[i.id]&&i.q>0);coupon=localStorage.getItem(CK)||''}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart));localStorage.setItem(CK,coupon)}catch(e){}};
const calc=type=>{const sub=cart.reduce((s,i)=>s+by[i.id].p*i.q,0),disc=coupon==='BARU15'?Math.round(sub*.15):0,tax=Math.round((sub-disc)*TAX),ship=type==='delivery'&&sub?SHIP:0;return{sub,disc,tax,ship,total:sub-disc+tax+ship}};
const rows=(items)=>items.map(i=>{const p=by[i.id];return`<tr><th scope="row"><div class="ln">${p.f?`<img class="thumb" src="gambar/menu/${p.f}.jpg" alt="" width="44" height="44">`:''}<span>${p.n}<small>${rp(p.p)}</small></span></div></th><td>${i.q}</td><td class="num">${rp(p.p*i.q)}</td></tr>`}).join('');
const foot=c=>[['Subtotal',c.sub],c.disc&&['Diskon BARU15 (15%)',-c.disc],['Pajak 10%',c.tax],c.ship&&['Ongkos kirim',c.ship]].filter(Boolean).map(([l,v])=>`<tr><th scope="row" colspan="2">${l}</th><td class="num">${v<0?'−':''}${rp(Math.abs(v))}</td></tr>`).join('')+`<tr class="tot"><th scope="row" colspan="2">Total</th><td class="num">${rp(c.total)}</td></tr>`;
const card=x=>`<article class="cx-card"><img class="ph" src="gambar/menu/${x.f}.jpg" alt="${x.n}" width="600" height="600" loading="lazy" decoding="async"><div><h3>${x.n}</h3>${x.s?'<span class="tag">Best Seller</span>':''}<p>${x.d}</p></div><div class="cx-row"><b>${rp(x.p)}</b><button class="cx-b" data-add="${x.id}">Pesan</button></div></article>`;

/* ambil alih render menu (node dikloning agar handler lama script.js tidak bentrok) */
const swap=n=>{const c=n.cloneNode(n.classList.contains('tab'));n.replaceWith(c);return c};
const list=swap($('#list')),sig=swap($('#sig'));
sig.innerHTML=M.filter(x=>x.s).map(card).join('');
const ICN=p=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const HEART=ICN('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),PLUS=ICN('<path d="M12 5v14M5 12h14"/>');
const FAV='angkasa_fav',CAT={kopi:'Coffee',non:'Non-Coffee',makan:'Food'},LIM=10;
let fav=[];try{fav=JSON.parse(localStorage.getItem(FAV))||[]}catch(e){}
const mrp=n=>'Rp '+n.toLocaleString('id-ID');
const mcard=x=>`<article class="mc"><div class="mc-img"><img src="gambar/menu/${x.f}.jpg" alt="${x.n}" width="400" height="300" loading="lazy" decoding="async"><button class="mc-fav" type="button" data-fav="${x.id}" aria-pressed="${fav.includes(x.id)}" aria-label="Favorit ${x.n}">${HEART}</button></div><div class="mc-b"><h3>${x.n}</h3><span class="mc-cat">${CAT[x.c]}</span><div class="mc-row"><b>${mrp(x.p)}</b><button class="mc-add" type="button" data-add="${x.id}" aria-label="Pesan ${x.n}">${PLUS}</button></div></div></article>`;
const chips=$$('#chips .chip'),more=$('#more'),qIn=$('#q');let st={c:'all',q:'',all:false};
function showMenu(){const q=st.q.trim().toLowerCase();
  const it=M.filter(x=>(st.c==='all'||(st.c==='fav'?fav.includes(x.id):x.c===st.c))&&(!q||x.n.toLowerCase().includes(q)||CAT[x.c].toLowerCase().includes(q)));
  const lim=st.c==='all'&&!q&&!st.all,shown=lim?it.slice(0,LIM):it;
  list.innerHTML=shown.length?shown.map(mcard).join(''):`<p class="mempty">${st.c==='fav'&&!q?'Belum ada menu favorit. Ketuk ikon hati pada menu untuk menyimpannya.':'Menu tidak ditemukan.'}</p>`;
  chips.forEach(c=>{const on=c.dataset.c===st.c;c.classList.toggle('on',on);c.setAttribute('aria-selected',on)});
  more.hidden=!(st.c==='all'&&!q&&M.length>LIM);more.textContent=st.all?'Lihat Lebih Sedikit':'Lihat Semua →'}
const setFilter=c=>{st.c=c;st.all=false;showMenu();dispatchEvent(new CustomEvent('angkasa:filter',{detail:{c}}))};
window.angkasaMenu={setFilter};
chips.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.c)));
qIn.addEventListener('input',()=>{st.q=qIn.value;showMenu()});
more.addEventListener('click',()=>{st.all=!st.all;showMenu()});
document.addEventListener('click',e=>{const h=e.target.closest('[data-fav]');if(!h)return;const id=h.dataset.fav,on=!fav.includes(id);fav=on?fav.concat(id):fav.filter(x=>x!==id);try{localStorage.setItem(FAV,JSON.stringify(fav))}catch(x){}h.setAttribute('aria-pressed',on);toast(on?'Ditambahkan ke favorit':'Dihapus dari favorit');if(st.c==='fav')showMenu()});
showMenu();

const dCart=$('#dCart'),dCo=$('#dCo'),dOk=$('#dOk'),f=$('#fCo'),toastEl=$('#toast');
let tt;const toast=m=>{toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toastEl.classList.remove('on'),2200)};
function render(){
  const n=cart.reduce((s,i)=>s+i.q,0),b=$('#badge');b.textContent=n;b.hidden=!n;
  $('#cEmpty').hidden=!!n;$('#cFull').hidden=!n;$('#cGo').disabled=!n;
  $('#cBody').innerHTML=rows(cart).replace(/<td>(\d+)<\/td>/g,(m,q,o)=>m);
  $$('#cBody tr').forEach((tr,k)=>{const i=cart[k];tr.children[1].innerHTML=`<div class="qty"><button data-act="dec" data-id="${i.id}" aria-label="Kurangi">−</button><span>${i.q}</span><button data-act="inc" data-id="${i.id}" aria-label="Tambah">+</button></div><button class="del" data-act="del" data-id="${i.id}">Hapus</button>`});
  $('#cFoot').innerHTML=foot(calc());$('#code').value=coupon;
  if(dCo.open)sumCo();
}
const sumCo=()=>{const c=calc(f.type.value);$('#coBody').innerHTML=rows(cart);$('#coFoot').innerHTML=foot(c);$('#coPay').textContent=rp(c.total)};
const add=id=>{const i=cart.find(x=>x.id===id);i?i.q++:cart.push({id,q:1});save();render();toast(by[id].n+' masuk keranjang ✓');const b=$('#cartBtn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')};
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a)return add(a.dataset.add);
  const q=e.target.closest('[data-act]');
  if(q){const i=cart.find(x=>x.id===q.dataset.id);if(!i)return;const k=q.dataset.act;k==='inc'?i.q++:k==='dec'?i.q--:i.q=0;cart=cart.filter(x=>x.q>0);save();return render()}
  const c=e.target.closest('[data-code]');if(c){coupon=c.dataset.code;save();render();toast('Kode '+coupon+' dipakai');return}
  if(e.target.closest('[data-close]'))e.target.closest('dialog').close();
  if(e.target.matches('dialog'))e.target.close();
});
$('#cartBtn').onclick=()=>dCart.showModal();
$('#cGo').onclick=()=>{dCart.close();f.reset();phErr.textContent='';ph.classList.remove('bad');chkPhone();addr();dCo.showModal();sumCo()};
$('#cClear').onclick=()=>{cart=[];coupon='';save();render()};
$('#codeBtn').onclick=()=>{const v=$('#code').value.trim().toUpperCase();if(!v){coupon='';save();return render()}if(v!=='BARU15')return toast('Kode tidak valid');coupon=v;save();render();toast('Kode BARU15 dipakai ✓')};
const addr=()=>{const d=f.type.value==='delivery';$('#addrBox').hidden=!d;f.addr.required=d;sumCo()};
f.type.addEventListener('change',addr);
/* Nomor HP: boleh diketik dengan spasi/strip/+62, otomatis dirapikan jadi 08xxxxxxxxxx */
const ph=f.phone,phErr=$('#phoneErr');
const phoneNorm=v=>{let d=String(v).replace(/\D/g,'');if(d.startsWith('62'))d='0'+d.slice(2);else if(d.startsWith('8'))d='0'+d;return d};
const chkPhone=show=>{const n=phoneNorm(ph.value),empty=!ph.value.trim(),ok=/^08\d{8,12}$/.test(n);
  const msg=empty?'Nomor HP wajib diisi.':ok?'':'Nomor HP tidak valid. Contoh: 0812 3456 7890';
  ph.setCustomValidity(msg);if(show){phErr.textContent=msg;ph.classList.toggle('bad',!!msg)}return ok};
ph.addEventListener('input',()=>{ph.value=ph.value.replace(/[^\d+\s-]/g,'');chkPhone(ph.classList.contains('bad'))});
ph.addEventListener('blur',()=>{if(ph.value.trim())chkPhone(true)});
f.addEventListener('submit',e=>{e.preventDefault();if(!cart.length)return;chkPhone(true);if(!f.reportValidity())return;
  const d=Object.fromEntries(new FormData(f)),c=calc(d.type);
  const o={id:'ANG-'+Date.now().toString(36).toUpperCase().slice(-6),name:d.name.trim(),phone:phoneNorm(d.phone),type:d.type,addr:d.addr||'',pay:d.pay,items:cart.map(i=>({...i})),c,at:new Date().toLocaleString('id-ID')};
  try{localStorage.setItem('angkasa_last',JSON.stringify(o))}catch(x){}
  $('#okId').textContent=o.id;$('#okName').textContent=o.name;$('#okBody').innerHTML=rows(o.items);$('#okFoot').innerHTML=foot(c);
  $('#okType').textContent=TYPE[o.type]+(o.addr?' — '+o.addr:'');$('#okPay').textContent=PAY[o.pay][0]+': '+PAY[o.pay][1];
  const t=`Halo Cafe Angkasa, saya ingin konfirmasi pesanan ${o.id}\nNama: ${o.name}\nHP: ${o.phone}\nTipe: ${TYPE[o.type]}${o.addr?'\nAlamat: '+o.addr:''}\n`+o.items.map(i=>`- ${by[i.id].n} x${i.q}`).join('\n')+`\nTotal: ${rp(c.total)}\nPembayaran: ${PAY[o.pay][0]}`;
  $('#okEta').textContent={dine:'10–15 menit',pickup:'10–15 menit',delivery:'25–40 menit'}[o.type];
  $('#okLast').textContent={dine:'Diantar ke meja',pickup:'Siap diambil',delivery:'Dalam perjalanan'}[o.type];
  $('#okPayNote').textContent=o.pay==='cash'?' dan siapkan pembayaran tunai':', lalu kirim bukti pembayaran di chat yang sama';
  $('#okWa').href='https://wa.me/6281200000000?text='+encodeURIComponent(t);
  cart=[];coupon='';save();dCo.close();render();dOk.showModal()});
render();
})();
