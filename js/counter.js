/* ============================================
   COUNTER.JS — Animated number counters
   ============================================ */

'use strict';

(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  function animateCounter(el, target, duration) {
    if (Utils.prefersReducedMotion()) {
      el.textContent = target;
      return;
    }

    let startTime = null;
    const startVal = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        animateCounter(el, target, 1500);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();
