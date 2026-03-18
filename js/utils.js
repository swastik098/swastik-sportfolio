/* ============================================
   UTILS.JS — Shared helpers
   ============================================ */

'use strict';

/**
 * Select a single DOM element
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element|null}
 */
function $(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * Select all matching DOM elements
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {NodeList}
 */
function $$(selector, context) {
  return (context || document).querySelectorAll(selector);
}

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Throttle a function
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Clamp a number between min and max
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Linear interpolation
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @returns {number}
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Check if the user prefers reduced motion
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is touch-only
 * @returns {boolean}
 */
function isTouchDevice() {
  return window.matchMedia('(hover: none)').matches;
}

/**
 * Run a callback when DOM is ready
 * @param {Function} fn
 */
function onDOMReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  }
}

window.Utils = { $, $$, debounce, throttle, clamp, lerp, prefersReducedMotion, isTouchDevice, onDOMReady };
