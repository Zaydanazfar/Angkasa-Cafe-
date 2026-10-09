/* Transisi scroll dua arah untuk Cafe Angkasa */
(function () {
  var sections = [].slice.call(document.querySelectorAll('.reveal'));
  var hero = document.querySelector('.hero');
  var heroIn = document.querySelector('.hero-in');
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    sections.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  // Section: tambah 'in-view' saat masuk, HAPUS saat keluar -> animasi berulang
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var el = en.target;
      if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
    });
  }, { rootMargin: '-8% 0px -8% 0px', threshold: 0 });

  sections.forEach(function (el) { io.observe(el); });

  // Hero: teks memudar saat hero hampir keluar layar
  if (hero && heroIn) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        heroIn.classList.toggle('is-out', en.intersectionRatio < 0.35);
      });
    }, { threshold: [0, 0.35, 1] }).observe(hero);
  }
})();
