/* ============================================
   ANIMATIONS.JS — Scroll-triggered reveal
   ============================================ */

'use strict';

(function initAnimations() {
  /* ---------- Intersection Observer for .reveal elements ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach(el => observer.observe(el));

  /* ---------- Parallax hero background text ---------- */
  if (!Utils.prefersReducedMotion()) {
    const heroBgs = document.querySelectorAll('.hero-orb');
    if (heroBgs.length) {
      const handleParallax = Utils.throttle(() => {
        const scrollY = window.scrollY;
        heroBgs[0] && (heroBgs[0].style.transform = `translateY(${scrollY * 0.15}px)`);
        heroBgs[1] && (heroBgs[1].style.transform = `translateY(${scrollY * 0.1}px)`);
      }, 16);

      window.addEventListener('scroll', handleParallax, { passive: true });
    }
  }

  /* ---------- Hover tilt on project cards ---------- */
  if (!Utils.isTouchDevice() && !Utils.prefersReducedMotion()) {
    const cards = document.querySelectorAll('.project-card:not(.project-card--featured)');

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Animate bars in the mockup ---------- */
  const mockBars = document.querySelectorAll('.mock-bar-item');
  if (mockBars.length) {
    const mockObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mockBars.forEach((bar, i) => {
            const heights = [40, 65, 80, 55, 90, 70];
            setTimeout(() => {
              bar.style.height = heights[i % heights.length] + '%';
            }, i * 80);
          });
          mockObs.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const featured = document.querySelector('.project-card--featured');
    if (featured) mockObs.observe(featured);
  }
})();
