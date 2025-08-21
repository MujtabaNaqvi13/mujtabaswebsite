// navbar-enhance.js
// Enhanced sticky header, active link, and smooth scroll with offset

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header') || document.querySelector('header');
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const headerOffset = header ? header.getBoundingClientRect().height : 72;

  // set CSS variable for scroll-margin-top fallback
  document.documentElement.style.setProperty('--header-offset', Math.floor(headerOffset) + 'px');

  // shrink header when page scrolled
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) { header.classList.toggle('shrink', y > 12); }

    // Active section detection
    const sections = navLinks
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    let active = null;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const rect = s.getBoundingClientRect();
      if (rect.top <= headerOffset + 8 && rect.bottom > headerOffset + 8) {
        active = navLinks.find(a => a.getAttribute('href') === '#' + s.id);
        break;
      }
    }
    navLinks.forEach(a => {
      if (a === active) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'true');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  };

  // throttle scroll for perf
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  // Smooth scrolling that respects header offset
  navLinks.forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      ev.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
      window.scrollTo({ top, behavior: 'smooth' });
      // set focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      // update active state immediately
      navLinks.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      a.setAttribute('aria-current', 'true');
    });
  });

  // init one time
  onScroll();
});
