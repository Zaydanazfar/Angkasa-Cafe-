/* Cafe Angkasa: menu, tema, navbar, animasi */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Data menu: [nama, deskripsi, harga, ikon cadangan] ---------- */
const WA = '6281200000000'; // ganti dengan nomor WhatsApp asli (format 62...)
const data = {
  kopi: [["Espresso","Shot tunggal, pekat dan bersih","18.000","☕"],["Americano","Espresso dengan air, disajikan dingin dengan es","22.000","☕"],["Cafe Latte","Espresso dan susu lembut","28.000","🥛"],["Cappuccino","Busa susu tebal, aroma kuat","28.000","☕"],["Kopi Susu Angkasa","Kopi, susu, gula aren","26.000","🧋"],["V60 Single Origin","Seduh manual, biji pilihan barista","32.000","🫖"]],
  non: [["Chocolate","Cokelat dan susu, disajikan dingin","26.000","🍫"],["Matcha Latte","Matcha dan susu, disajikan dingin","30.000","🍵"],["Teh Melati","Teh melati panas atau es","18.000","🫖"],["Lemon Tea","Teh segar dengan perasan lemon","20.000","🍋"],["Jus Jeruk","Jeruk peras dengan es dan daun mint","24.000","🍊"]],
  makan: [["Croissant Butter","Renyah, dengan saus cokelat dan almond","24.000","🥐"],["Roti Bakar Cokelat Keju","Roti tebal, pisang, meses cokelat, keju","22.000","🍞"],["Nasi Goreng Angkasa","Telur, ayam suwir, kerupuk","35.000","🍛"],["Mie Goreng Spesial","Ayam, telur, tomat, dan timun","32.000","🍜"],["Kentang Goreng","Renyah, taburan rosemary, dengan saus","20.000","🍟"]]
};
const SIGNATURE = ["Kopi Susu Angkasa", "Matcha Latte", "V60 Single Origin"];

const EXT = ['jpg', 'jpeg', 'png', 'webp'];
const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const waLink = n => `https://wa.me/${WA}?text=${encodeURIComponent('Halo Cafe Angkasa, saya mau pesan ' + n)}`;

// Jika foto .jpg tidak ada, coba ekstensi lain, lalu tampilkan ikon
function gantiFoto(img) {
  const n = (+img.dataset.n || 0) + 1;
  if (n < EXT.length) { img.dataset.n = n; img.src = `gambar/menu/${img.dataset.s}.${EXT[n]}`; }
  else img.parentNode.textContent = img.dataset.e;
}

function card([n, d, p, e], label) {
  return `<article class="card">
    <div class="ph"><img src="gambar/menu/${slug(n)}.jpg" data-s="${slug(n)}" data-e="${e}" alt="Foto ${n}" loading="lazy" onerror="gantiFoto(this)"></div>
    <div class="cb"><div class="row"><h3>${n}</h3><span class="price">Rp ${p}</span></div><p>${d}</p>
    <a class="order" href="${waLink(n)}" target="_blank" rel="noopener">${label}</a></div>
  </article>`;
}

const all = Object.values(data).flat();
$('#sig').innerHTML = SIGNATURE.map(n => card(all.find(i => i[0] === n), 'Pesan')).join('');

const list = $('#list');
const show = c => { list.innerHTML = data[c].map(i => card(i, '+ Pesan')).join(''); };
$$('.tab').forEach(t => t.addEventListener('click', () => {
  $$('.tab').forEach(x => x.setAttribute('aria-selected', x === t));
  show(t.dataset.c);
}));
show('kopi');

/* ---------- Dark mode (tersimpan di localStorage) ---------- */
const root = document.documentElement, tbtn = $('#theme');
function setTheme(t) {
  root.dataset.theme = t;
  tbtn.textContent = t === 'dark' ? '☀️' : '🌙';
  tbtn.setAttribute('aria-label', t === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  try { localStorage.setItem('theme', t); } catch (e) {}
}
setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
tbtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ---------- Navbar: berubah saat scroll + hamburger ---------- */
const nav = $('#nav'), burger = $('#burger');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const closeNav = () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', nav.classList.toggle('open')));
$$('#links a').forEach(a => a.addEventListener('click', closeNav));
addEventListener('keydown', e => e.key === 'Escape' && closeNav());

/* ---------- Bintang halus di section Angkasa ---------- */
const stars = $('#stars');
stars.innerHTML = Array.from({ length: 46 }, () => {
  const s = (Math.random() * 2 + 1).toFixed(1);
  return `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 100).toFixed(1)}%;width:${s}px;height:${s}px;--t:${(3 + Math.random() * 4).toFixed(1)}s;--d:-${(Math.random() * 6).toFixed(1)}s"></i>`;
}).join('');

/* ---------- Fade-in saat masuk layar ---------- */
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 })
  : null;
$$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
