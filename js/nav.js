/* ============================================
   NAV.JS — Navigation: scroll, active link, mobile menu
   ============================================ */

'use strict';

(function initNav() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const backToTop = document.getElementById('backToTop');

  if (!navbar) return;

  /* ---------- Scroll-aware nav ---------- */
  const handleScroll = Utils.throttle(() => {
    const scrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', scrolled);

    // Back to top button
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    // Active nav link detection
    updateActiveLink();
  }, 80);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on init

  /* ---------- Active section tracking ---------- */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const links    = document.querySelectorAll('.nav-link');
    const offset   = navbar.offsetHeight + 40;

    let currentId = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + currentId);
    });
  }

  /* ---------- Mobile hamburger ---------- */
  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Smooth scroll for all anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
