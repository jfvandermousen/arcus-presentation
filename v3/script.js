// Arcus Partners - Piste 3 · Immersive
// Header au scroll, menu mobile, onglets accessibles, compteurs, apparition, année.

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header : fond au scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  /* Onglets (pattern WAI-ARIA : flèches gauche/droite, Début/Fin) */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (e.key in map) {
        e.preventDefault();
        select(tabs[(map[e.key] + tabs.length) % tabs.length]);
      }
    });
  });

  /* Compteurs */
  const counters = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const end = Number(el.dataset.count);
    if (reduced) { el.textContent = end; return; }
    const start = performance.now();
    const dur = 1400;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* Apparition + déclenchement des compteurs */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        if (en.target.dataset.count) run(en.target);
        else en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    counters.forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
