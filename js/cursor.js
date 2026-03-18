/* ============================================
   CURSOR.JS — Custom magnetic cursor
   ============================================ */

'use strict';

(function initCursor() {
  if (Utils.isTouchDevice()) return;

  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  const RING_LERP = 0.1;
  let mouseX = -100, mouseY = -100;
  let ringX   = -100, ringY   = -100;
  let rafId;

  // Move dot instantly
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Animate ring with lerp
  function animateRing() {
    if (!Utils.prefersReducedMotion()) {
      ringX = Utils.lerp(ringX, mouseX, RING_LERP);
      ringY = Utils.lerp(ringY, mouseY, RING_LERP);
    } else {
      ringX = mouseX;
      ringY = mouseY;
    }
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hide / show when leaving / entering viewport
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursorRing.classList.add('hidden');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    cursorRing.classList.remove('hidden');
  });

  // Expand cursor on interactive elements
  const interactiveSelector = 'a, button, .pill, .stat-card, .edu-card, .project-card, .contact-link, .skill-pill, label, input, textarea, select';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('expand');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('expand');
    }
  });

  // Click pulse
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = '';
  });
})();
