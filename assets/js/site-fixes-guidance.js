/* site-fixes-guidance.js
  - theme toggle (sun / moon)
  - smooth scroll (header offset)
  - skills progress bars (intersection observer)
  - fun facts & jokes floating card
  - reaction game trigger & fallback
  - small debugging helpers
*/

document.addEventListener('DOMContentLoaded', () => {
  (function themeInit() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle-btn');
    body.classList.add('no-transitions');
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'light') body.classList.add('light-mode');
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('no-transitions')));
    function applyTheme(isLight) {
      if (isLight) body.classList.add('light-mode'); else body.classList.remove('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }
    if (btn) {
      btn.setAttribute('aria-pressed', String(body.classList.contains('light-mode')));
      if (!btn.querySelector('.thumb')) {
        const thumb = document.createElement('span');
        thumb.className = 'thumb';
        thumb.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
        btn.appendChild(thumb);
      }
      btn.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        // Always set sun for light, moon for dark
        applyTheme(!isLight);
        btn.setAttribute('aria-pressed', String(!isLight));
        const thumb = btn.querySelector('.thumb');
        if (thumb) thumb.textContent = !isLight ? '☀️' : '🌙';
      });
      // Also allow explicit sun/moon click
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 's' || e.key === 'S') {
          applyTheme(true);
          btn.setAttribute('aria-pressed', 'true');
          const thumb = btn.querySelector('.thumb');
          if (thumb) thumb.textContent = '☀️';
        } else if (e.key === 'ArrowLeft' || e.key === 'm' || e.key === 'M') {
          applyTheme(false);
          btn.setAttribute('aria-pressed', 'false');
          const thumb = btn.querySelector('.thumb');
          if (thumb) thumb.textContent = '🌙';
        }
      });
    }
  })();
  (function smoothScroll() {
    const links = document.querySelectorAll('a[data-scroll]');
    const header = document.querySelector('.header-bg') || document.querySelector('header');
    function offset() {
      if (!header) return 0;
      return header.getBoundingClientRect().height + 8;
    }
    links.forEach(a => a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = window.scrollY + target.getBoundingClientRect().top - offset();
      window.scrollTo({ top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
      history.replaceState(null, '', href);
    }));
  })();
  (function progressBars() {
    const fills = document.querySelectorAll('.bar-fill[data-target]');
    if (!fills.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const fill = en.target;
        const target = parseInt(fill.dataset.target, 10) || 0;
        fill.style.background = 'linear-gradient(90deg,#60a5fa,#7c3aed)';
        fill.style.width = target + '%';
        const bar = fill.closest('.bar');
        if (bar) bar.setAttribute('aria-valuenow', String(target));
        obs.unobserve(fill);
      });
    }, { threshold: 0.35 });
    fills.forEach(f => { f.style.width = '0%'; observer.observe(f); });
  })();
  (function funCard() {
    const facts = [
      "creativity is intelligence having fun.",
      "code is like humor. when you have to explain it, it’s bad.",
      "the best way to get started is to quit talking and begin doing.",
      "stay curious, keep learning.",
      "every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
      "dream big, work hard, stay humble.",
      "success is not the key to happiness. happiness is the key to success."
    ];
    const jokes = [
      "why did the computer show up at work late? it had a hard drive.",
      "why was the developer always calm? because they handled exceptions.",
      "why did the coder quit his job? he didn't get arrays.",
      "why did the keyboard break up with the mouse? it found someone more clicky.",
      "how do programmers enjoy nature? they log off.",
      "why was the math book sad? it had too many problems.",
      "what do you call a sketchy neighborhood in the cloud? the ip district.",
      "why do programmers prefer dark mode? because light attracts bugs."
    ];
    function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
    let card = document.getElementById('fun-card');
    if (!card) {
      card = document.createElement('div');
      card.id = 'fun-card';
      card.className = 'card';
      card.innerHTML = `
        <div class="fun-text" aria-live="polite"></div>
        <div class="fun-actions" style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
          <button class="fun-prev" aria-label="previous">◀</button>
          <button class="fun-next" aria-label="next">next</button>
          <button class="fun-close" aria-label="close">close</button>
        </div>`;
      document.body.appendChild(card);
    }
    const textEl = card.querySelector('.fun-text');
    const nextBtn = card.querySelector('.fun-next');
    const prevBtn = card.querySelector('.fun-prev');
    const closeBtn = card.querySelector('.fun-close');
    let pool = 'facts';
    function show(text, p) {
      pool = p || pool;
      textEl.style.opacity = 0;
      card.classList.add('show');
      setTimeout(() => {
        textEl.textContent = text;
        textEl.style.transition = 'opacity 220ms, transform 220ms';
        textEl.style.opacity = 1;
      }, 60);
    }
    function hide(){ card.classList.remove('show'); }
    document.addEventListener('click', e => {
      const btn = e.target.closest('.dropdown-action');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'fun-facts') show(rand(facts), 'facts');
      if (action === 'jokes') show(rand(jokes), 'jokes');
    });
    nextBtn.addEventListener('click', () => show(pool === 'facts' ? rand(facts) : rand(jokes)));
    prevBtn.addEventListener('click', () => show(pool === 'facts' ? rand(facts) : rand(jokes)));
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', (e) => {
      if (!card.classList.contains('show')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowRight') show(pool === 'facts' ? rand(facts) : rand(jokes));
      if (e.key === 'ArrowLeft') show(pool === 'facts' ? rand(facts) : rand(jokes));
    });
  })();
  (function reactionFix() {
    let trigger = document.getElementById('reaction-game-trigger');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.id = 'reaction-game-trigger';
      trigger.className = 'reaction-trigger';
      trigger.textContent = '⚡';
      trigger.setAttribute('aria-label', 'Open reaction time game');
      document.body.appendChild(trigger);
    }
    trigger.style.display = 'flex';
    function openGame(){
      if (typeof showGame === 'function') {
        try { showGame(); return; } catch(err) { console.warn('existing showGame failed, using fallback', err); }
      }
      const modal = document.createElement('div');
      modal.style.position = 'fixed'; modal.style.inset = '0'; modal.style.background = 'rgba(0,0,0,0.85)';
      modal.style.display = 'flex'; modal.style.alignItems = 'center'; modal.style.justifyContent = 'center'; modal.style.zIndex = 1600;
      modal.innerHTML = `<div style="background:#fff;color:#111;padding:20px;border-radius:12px;min-width:300px;text-align:center">
        <div id="rt-instructions">click when the screen changes color</div>
        <button id="rt-start" style="margin-top:12px">start</button>
        <div id="rt-result" style="margin-top:10px"></div>
        <button id="rt-close" style="margin-top:12px">close</button>
      </div>`;
      document.body.appendChild(modal);
      const area = modal.querySelector('div');
      const startBtn = modal.querySelector('#rt-start');
      const result = modal.querySelector('#rt-result');
      const closeBtn = modal.querySelector('#rt-close');
      let waiting=false, startTime=0, timeoutId=null;
      startBtn.onclick = () => {
        startBtn.disabled = true; result.textContent=''; modal.querySelector('#rt-instructions').textContent='wait...';
        area.style.background='#fff'; waiting=true;
        timeoutId = setTimeout(()=> {
          area.style.background='#22c55e'; modal.querySelector('#rt-instructions').textContent='CLICK!'; startTime=Date.now();
        }, 800 + Math.random()*1600);
      };
      area.onclick = () => {
        if (!waiting) return;
        if (area.style.background === 'rgb(34, 197, 94)' || area.style.background === '#22c55e') {
          const reaction = Date.now() - startTime;
          result.innerHTML = `Your reaction time: <strong>${reaction} ms</strong>`;
          waiting=false; startBtn.disabled=false;
          const best = Number(localStorage.getItem('bestReaction') || '1e9');
          if (reaction < best) { localStorage.setItem('bestReaction', String(reaction)); result.innerHTML += '<div style="color:green">New best!</div>'; }
        } else {
          result.textContent='Too soon!';
          waiting=false; startBtn.disabled=false; clearTimeout(timeoutId); area.style.background='#fff';
        }
      };
      closeBtn.onclick = () => modal.remove();
    }
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'r') openGame();
    });
    trigger.addEventListener('click', openGame);
    trigger.addEventListener('touchstart', (e) => { e.preventDefault(); openGame(); });
  })();
  setTimeout(() => {
    ['#theme-toggle-btn', '.dropdown-action', '.bar-fill[data-target]', '#reaction-game-trigger'].forEach(sel => {
      if (!document.querySelector(sel)) console.info('MISSING SELECTOR (check html):', sel);
    });
  }, 900);
});
