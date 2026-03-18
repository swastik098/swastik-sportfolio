/* ============================================
   MAIN.JS — App entry point & miscellaneous
   ============================================ */

'use strict';

Utils.onDOMReady(() => {

  /* ---- Set current year in footer ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Active nav link on init ---- */
  // Handled in nav.js on scroll

  /* ---- Lazy-load any images with data-src ---- */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length && 'IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(img => imgObs.observe(img));
  }

  /* ---- Keyboard accessibility: trap focus in open mobile menu ---- */
  document.addEventListener('keydown', e => {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || !navLinks.classList.contains('open')) return;

    if (e.key === 'Tab') {
      const focusable = navLinks.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  /* ---- Prefers-color-scheme awareness (future dark mode hook) ---- */
  // const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
  // darkMode.addEventListener('change', e => { /* toggle theme */ });

  /* ---- Console Easter egg ---- */
  console.log(
    '%c SG. %c Swastik Giri — Senior Software Developer',
    'background:#e85d2f;color:#fff;font-size:16px;font-weight:bold;padding:4px 10px;border-radius:4px',
    'color:#e85d2f;font-size:14px;font-weight:500;padding:4px'
  );
  console.log(
    '%c Built with HTML, CSS & Vanilla JS | swastikgiri.vercel.app',
    'color:#7a7570;font-size:12px'
  );

});
