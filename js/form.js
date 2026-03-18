/* ============================================
   FORM.JS — Contact form validation & submission
   ============================================ */

'use strict';

(function initForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  /* ---------- Validation rules ---------- */
  const rules = {
    name: {
      el:  () => document.getElementById('name'),
      err: () => document.getElementById('nameError'),
      validate(val) {
        if (!val.trim())           return 'Please enter your name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return null;
      },
    },
    email: {
      el:  () => document.getElementById('email'),
      err: () => document.getElementById('emailError'),
      validate(val) {
        if (!val.trim()) return 'Please enter your email address.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val)) return 'Please enter a valid email address.';
        return null;
      },
    },
    message: {
      el:  () => document.getElementById('message'),
      err: () => document.getElementById('messageError'),
      validate(val) {
        if (!val.trim())           return 'Please enter a message.';
        if (val.trim().length < 10) return 'Message must be at least 10 characters.';
        return null;
      },
    },
  };

  /* ---------- Show / clear field error ---------- */
  function setError(fieldKey, message) {
    const el  = rules[fieldKey].el();
    const err = rules[fieldKey].err();
    if (!el || !err) return;

    if (message) {
      el.classList.add('error');
      err.textContent = message;
      err.style.display = 'block';
    } else {
      el.classList.remove('error');
      err.textContent = '';
      err.style.display = 'none';
    }
  }

  /* ---------- Real-time validation on blur ---------- */
  Object.keys(rules).forEach(key => {
    const el = rules[key].el();
    if (!el) return;

    el.addEventListener('blur', () => {
      const error = rules[key].validate(el.value);
      setError(key, error);
    });

    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const error = rules[key].validate(el.value);
        setError(key, error);
      }
    });
  });

  /* ---------- Validate all ---------- */
  function validateAll() {
    let valid = true;
    Object.keys(rules).forEach(key => {
      const el    = rules[key].el();
      if (!el) return;
      const error = rules[key].validate(el.value);
      setError(key, error);
      if (error) valid = false;
    });
    return valid;
  }

  /* ---------- Simulate sending (replace with real endpoint) ---------- */
  function sendForm(data) {
    return new Promise(resolve => {
      // TODO: Replace with actual fetch() to your backend / Formspree / EmailJS
      // Example with Formspree:
      // return fetch('https://formspree.io/f/YOUR_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      setTimeout(resolve, 1400);
    });
  }

  /* ---------- Form submit ---------- */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateAll()) return;

    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const data = {
      name:    document.getElementById('name').value,
      email:   document.getElementById('email').value,
      subject: document.getElementById('subject')?.value || '',
      message: document.getElementById('message').value,
    };

    try {
      await sendForm(data);

      // Success state
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.querySelector('.btn-text').textContent = '✓ Sent!';

      if (formSuccess) {
        formSuccess.classList.add('visible');
        formSuccess.removeAttribute('aria-hidden');
      }

      form.reset();

      // Reset button after delay
      setTimeout(() => {
        submitBtn.classList.remove('success');
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.classList.remove('visible');
          formSuccess.setAttribute('aria-hidden', 'true');
        }
      }, 4000);

    } catch (err) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email directly.');
      console.error('Form error:', err);
    }
  });
})();
