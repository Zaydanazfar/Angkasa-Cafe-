const data={
kopi:[["Espresso","Shot tunggal, pekat dan bersih","18.000","☕"],["Americano","Espresso dengan air, disajikan dingin dengan es","22.000","☕"],["Cafe Latte","Espresso dan susu lembut","28.000","🥛"],["Cappuccino","Busa susu tebal, aroma kuat","28.000","☕"],["Kopi Susu Angkasa","Kopi, susu, gula aren","26.000","🧋"],["V60 Single Origin","Seduh manual, biji pilihan barista","32.000","🫖"]],
non:[["Chocolate","Cokelat dan susu, disajikan dingin","26.000","🍫"],["Matcha Latte","Matcha dan susu, disajikan dingin","30.000","🍵"],["Teh Melati","Teh melati panas atau es","18.000","🫖"],["Lemon Tea","Teh segar dengan perasan lemon","20.000","🍋"],["Jus Jeruk","Jeruk peras dengan es dan daun mint","24.000","🍊"]],
makan:[["Croissant Butter","Renyah, dengan saus cokelat dan almond","24.000","🥐"],["Roti Bakar Cokelat Keju","Roti tebal, pisang, meses cokelat, keju","22.000","🍞"],["Nasi Goreng Angkasa","Telur, ayam suwir, kerupuk","35.000","🍛"],["Mie Goreng Spesial","Ayam, telur, tomat, dan timun","32.000","🍜"],["Kentang Goreng","Renyah, taburan rosemary, dengan saus","20.000","🍟"]]};
const list=document.getElementById('list');
const EXT=['jpg','jpeg','png','webp'];
function gantiFoto(img){
  const n=(+img.dataset.n||0)+1;
  if(n<EXT.length){img.dataset.n=n;img.src='gambar/menu/'+img.dataset.s+'.'+EXT[n];}
  else{img.parentNode.textContent=img.dataset.e;}
}
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function show(c){list.innerHTML=data[c].map(i=>`<li><div class="thumb"><img src="gambar/menu/${slug(i[0])}.jpg" data-e="${i[3]}" data-s="${slug(i[0])}" alt="Foto ${i[0]}" loading="lazy" onerror="gantiFoto(this)"></div><div><div class="row"><h3>${i[0]}</h3><span class="price">Rp ${i[2]}</span></div><p>${i[1]}</p></div></li>`).join('')}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));show(t.dataset.c)});
show('kopi');
