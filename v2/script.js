// Arcus Partners — Piste 2 · Éditoriale
// Menu plein écran accessible, apparition au scroll, année.

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const label = btn.querySelector('.menu-btn-label');

  const setMenu = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Fermer' : 'Menu';
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a').focus();
  };

  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); }
  });

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
