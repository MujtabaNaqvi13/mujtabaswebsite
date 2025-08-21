// main.js
// Highlight active nav link and handle theme toggle

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const links = document.querySelectorAll('.nav-list a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  // Initialize from localStorage
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    root.classList.add('dark');
    toggle.textContent = '☀️';
    toggle.setAttribute('aria-pressed', 'true');
  } else {
    toggle.textContent = '🌙';
    toggle.setAttribute('aria-pressed', 'false');
  }
  toggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-pressed', isDark);
  });
});
