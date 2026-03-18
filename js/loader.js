/* ============================================
   LOADER.JS — Page loading screen
   ============================================ */

'use strict';

(function initLoader() {
  const loader    = document.getElementById('loader');
  const fill      = document.getElementById('loaderFill');
  const loaderTxt = document.getElementById('loaderText');

  if (!loader) return;

  const messages = ['Initializing...', 'Loading assets...', 'Almost ready...', 'Welcome!'];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    // Advance progress
    const step = progress < 70 ? Math.random() * 12 + 4
               : progress < 90 ? Math.random() * 6 + 2
               : Math.random() * 2 + 1;

    progress = Math.min(progress + step, 98);
    fill.style.width = progress + '%';

    // Cycle messages
    const newIdx = Math.floor((progress / 100) * messages.length);
    if (newIdx !== msgIdx && newIdx < messages.length) {
      msgIdx = newIdx;
      loaderTxt.textContent = messages[msgIdx];
    }
  }, 80);

  function finishLoader() {
    clearInterval(interval);
    fill.style.width = '100%';
    loaderTxt.textContent = 'Welcome!';

    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = '';
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, 350);
  }

  // Lock scroll during load
  document.body.style.overflow = 'hidden';

  // Finish on window load or after max 2.5s (whichever first)
  const maxTimer = setTimeout(finishLoader, 2500);

  window.addEventListener('load', () => {
    clearTimeout(maxTimer);
    setTimeout(finishLoader, 200);
  }, { once: true });
})();
