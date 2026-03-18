# Swastik Giri — Portfolio Website

A production-grade personal portfolio website built with pure HTML, CSS, and vanilla JavaScript.
No frameworks, no build tools, no dependencies — just fast, clean, deployable code.

---

## 📁 File Structure

```
swastik-portfolio/
├── index.html              ← Main HTML (semantic, accessible)
├── css/
│   ├── reset.css           ← Box-sizing, element resets
│   ├── variables.css       ← Design tokens (colors, spacing, fonts)
│   ├── base.css            ← Body, container, typography, utilities
│   ├── components.css      ← Cursor, loader, nav, buttons, forms, pills
│   ├── sections.css        ← Hero, about, experience, skills, projects, contact, footer
│   ├── animations.css      ← Fade-up, scroll-reveal, reduced-motion
│   └── responsive.css      ← Tablet, mobile, print breakpoints
└── js/
    ├── utils.js            ← Shared helpers ($, debounce, lerp, etc.)
    ├── loader.js           ← Page loading screen with progress bar
    ├── cursor.js           ← Custom magnetic cursor
    ├── nav.js              ← Scroll-aware nav, mobile menu, smooth scroll
    ├── animations.js       ← Intersection Observer scroll reveals, parallax
    ├── counter.js          ← Animated number counters
    ├── form.js             ← Contact form validation & async submission
    └── main.js             ← Entry point, year, lazy images, console Easter egg
```

---

## 🚀 Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up / log in
2. Click **Add New → Project**
3. Drag & drop the `swastik-portfolio` folder **or** upload via GitHub
4. Click **Deploy** — that's it! ✅

Vercel serves static HTML/CSS/JS with zero configuration.

---

## 🌐 Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up / log in
2. Drag & drop the `swastik-portfolio` folder onto the Netlify dashboard
3. Your site is live instantly with a `.netlify.app` URL ✅

---

## 🐙 Deploy via GitHub Pages

1. Push the folder contents to a GitHub repository
2. Go to **Settings → Pages**
3. Set **Source** to `main` branch, `/root` folder
4. Save — your site will be at `https://yourusername.github.io/repo-name` ✅

---

## ✉️ Connecting the Contact Form

The form currently simulates sending (for demo purposes). To make it real:

### Option A — Formspree (Free, no backend needed)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint ID
3. In `js/form.js`, replace the `sendForm` function with:

```javascript
function sendForm(data) {
  return fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
}
```

### Option B — EmailJS (Client-side email)
Follow the [EmailJS docs](https://www.emailjs.com/docs/) to send emails directly from JS.

---

## ✏️ Customisation

| What to change         | Where                               |
|------------------------|-------------------------------------|
| Name, title, bio       | `index.html` — hero & about sections |
| Colors & fonts         | `css/variables.css`                 |
| Experience entries     | `index.html` — `#experience`        |
| Projects               | `index.html` — `#projects`          |
| Social links           | `index.html` — contact & footer     |
| Form endpoint          | `js/form.js` → `sendForm()`         |
| Meta / SEO tags        | `index.html` — `<head>`             |

---

## ⚡ Performance

- **Zero external JS dependencies**
- **Google Fonts** loaded with `display=swap` (no layout shift)
- Intersection Observer for lazy animations (no scroll jank)
- Throttled scroll handlers
- CSS animations use `transform` & `opacity` only (GPU accelerated)
- Reduced-motion media query respected throughout
- Print stylesheet included

---

## ♿ Accessibility

- Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<footer>`, `<dl>`)
- ARIA labels on icon-only buttons and links
- `role="list"` where `list-style: none` is applied
- Live regions (`aria-live`) for form errors and success
- Focus trap in mobile nav
- `:focus-visible` outlines retained
- Color contrast meets WCAG AA

---

## 📄 License

MIT — Free to use and adapt for your own portfolio.
