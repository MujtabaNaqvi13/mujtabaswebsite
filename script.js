// TIMELINE ANIMATION (IntersectionObserver)
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('timeline-visible');
      }
    });
  }, { threshold: 0.3 });
  items.forEach(item => observer.observe(item));
});

// TESTIMONIALS CAROUSEL
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('testimonials-carousel');
  const prev = document.getElementById('testimonials-prev');
  const next = document.getElementById('testimonials-next');
  if (!container || !prev || !next) return;
  const items = container.querySelectorAll('.testimonial');
  let idx = 0;
  function show(i) {
    items.forEach((el, j) => el.classList.toggle('hidden', j !== i));
  }
  prev.addEventListener('click', () => {
    idx = (idx - 1 + items.length) % items.length;
    show(idx);
  });
  next.addEventListener('click', () => {
    idx = (idx + 1) % items.length;
    show(idx);
  });
  show(idx);
});

// THEME CUSTOMIZER (color presets)
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.theme-color-btn');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const color = btn.getAttribute('data-color');
      document.documentElement.style.setProperty('--accent', color);
      localStorage.setItem('accent', color);
    });
  });
  // On load
  const saved = localStorage.getItem('accent');
  if (saved) document.documentElement.style.setProperty('--accent', saved);
});

// SEARCH (filter cards by text)
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('search-input');
  const cards = document.querySelectorAll('.search-card');
  if (!input || !cards.length) return;
  input.addEventListener('input', function() {
    const val = input.value.toLowerCase();
    cards.forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
  });
});

// BLOG CARDS (expand/collapse)
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.blog-card');
  if (!cards.length) return;
  cards.forEach(card => {
    const btn = card.querySelector('.blog-card-toggle');
    const content = card.querySelector('.blog-card-content');
    if (!btn || !content) return;
    btn.addEventListener('click', function() {
      content.classList.toggle('hidden');
    });
  });
});

// BADGES (tooltip on hover)
document.addEventListener('DOMContentLoaded', function() {
  const badges = document.querySelectorAll('.badge');
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      const tip = badge.getAttribute('data-tooltip');
      if (!tip) return;
      let el = document.createElement('div');
      el.className = 'badge-tooltip';
      el.textContent = tip;
      badge.appendChild(el);
    });
    badge.addEventListener('mouseleave', function() {
      const el = badge.querySelector('.badge-tooltip');
      if (el) badge.removeChild(el);
    });
  });
});

// EASTER EGG (Konami code)
document.addEventListener('DOMContentLoaded', function() {
  const code = [38,38,40,40,37,39,37,39,66,65];
  let pos = 0;
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        alert('🎉 You found the easter egg! 🎉');
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });
});
// TO-DO LIST
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  if (!form || !input || !list) return;
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  function render() {
    list.innerHTML = '';
    if (todos.length === 0) {
      list.innerHTML = '<li class="text-gray-400">No tasks yet. Add one!</li>';
      return;
    }
    todos.forEach((todo, idx) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-white dark:bg-[#232336] rounded px-3 py-2 shadow';
      li.innerHTML = `<span class="flex-1 ${todo.done ? 'line-through text-gray-400' : ''}" style="word-break:break-word;">${todo.text}</span>
        <div class="flex gap-2 ml-2">
          <button class="text-green-600 hover:text-green-800" title="Mark as done" aria-label="Done"><i class="fas fa-check"></i></button>
          <button class="text-red-600 hover:text-red-800" title="Delete" aria-label="Delete"><i class="fas fa-trash"></i></button>
        </div>`;
      // Mark as done
      li.querySelector('.text-green-600').onclick = () => {
        todos[idx].done = !todos[idx].done;
        save();
      };
      // Delete
      li.querySelector('.text-red-600').onclick = () => {
        todos.splice(idx, 1);
        save();
      };
      list.appendChild(li);
    });
  }
  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
  }
  form.onsubmit = function(e) {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    todos.push({ text: val, done: false });
    input.value = '';
    save();
  };
  render();
});
// DYNAMIC GREETING & QUOTE OF THE DAY
document.addEventListener('DOMContentLoaded', function() {
  const greet = document.getElementById('dynamic-greeting');
  const quote = document.getElementById('quote-of-the-day');
  if (!greet && !quote) return;
  // Greeting
  if (greet) {
    const h = new Date().getHours();
    let msg = 'Hello';
    if (h < 5) msg = 'Good night';
    else if (h < 12) msg = 'Good morning';
    else if (h < 18) msg = 'Good afternoon';
    else msg = 'Good evening';
    greet.textContent = msg + '!';
  }
  // Quote
  if (quote) {
    const quotes = [
      "Every expert was once a beginner.",
      "Learning isn’t hard when you’re doing something you love.",
      "Why wait to grow up to build the future? I’m coding it now.",
      "Mistakes are just milestones you leave behind while chasing mastery.",
      "I’m not just learning to code — I’m learning to think, build, and lead."
    ];
    const day = new Date().getDate();
    quote.textContent = quotes[day % quotes.length];
  }
});
// REACTION GAME
document.addEventListener('DOMContentLoaded', function() {
  const openBtn = document.getElementById('reaction-game-btn');
  const modal = document.getElementById('reaction-game-modal');
  const closeBtn = document.getElementById('reaction-game-close');
  const startBtn = document.getElementById('reaction-game-start');
  const box = document.getElementById('reaction-game-box');
  const result = document.getElementById('reaction-game-result');
  const best = document.getElementById('reaction-game-best');
  if (!openBtn || !modal || !closeBtn || !startBtn || !box || !result || !best) return;
  let startTime, timeoutId;
  function openModal() {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-modal', 'true');
    closeBtn.focus();
    resetGame();
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.removeAttribute('aria-modal');
    openBtn.focus();
    resetGame();
  }
  function resetGame() {
    box.classList.add('hidden');
    result.textContent = '';
    startBtn.disabled = false;
    clearTimeout(timeoutId);
  }
  function startGame() {
    startBtn.disabled = true;
    result.textContent = 'Wait for green...';
    box.classList.add('hidden');
    timeoutId = setTimeout(() => {
      box.classList.remove('hidden');
      box.focus();
      startTime = Date.now();
    }, 1000 + Math.random() * 2000);
  }
  box.addEventListener('click', endGame);
  box.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') endGame();
  });
  function endGame() {
    if (box.classList.contains('hidden')) return;
    const time = Date.now() - startTime;
    result.textContent = `Your time: ${time} ms`;
    let bestTime = localStorage.getItem('reactionBest');
    if (!bestTime || time < bestTime) {
      bestTime = time;
      localStorage.setItem('reactionBest', bestTime);
    }
    best.textContent = `Best: ${bestTime} ms`;
    box.classList.add('hidden');
    startBtn.disabled = false;
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  startBtn.addEventListener('click', startGame);
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('hidden') && e.key === 'Escape') closeModal();
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  // Show best time on open
  openBtn.addEventListener('click', function() {
    const bestTime = localStorage.getItem('reactionBest');
    best.textContent = bestTime ? `Best: ${bestTime} ms` : '';
  });
});
// STATS COUNTERS ANIMATION
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stats-counter');
  if (!counters.length) return;
  let started = false;
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const step = Math.ceil(target / 60);
    function update() {
      current += step;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    }
    update();
  }
  const section = document.getElementById('stats-section');
  if (!section) return;
  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting && !started) {
      counters.forEach(animateCounter);
      started = true;
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(section);
});
// GALLERY LIGHTBOX
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxClose = document.getElementById('gallery-lightbox-close');
  if (!gallery || !lightbox || !lightboxImg || !lightboxClose) return;
  gallery.addEventListener('click', function(e) {
    const target = e.target.closest('img[data-full]');
    if (!target) return;
    lightboxImg.src = target.getAttribute('data-full');
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-modal', 'true');
    lightboxClose.focus();
  });
  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.removeAttribute('aria-modal');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('hidden') && e.key === 'Escape') {
      closeLightbox();
    }
  });
});
// FUN FACTS/JOKES MODAL
document.addEventListener('DOMContentLoaded', function() {
  const facts = [
    "Honey never spoils. Archaeologists have eaten 3000-year-old honey!",
    "Bananas are berries, but strawberries aren't.",
    "Octopuses have three hearts.",
    "A group of flamingos is called a 'flamboyance'.",
    "Joke: Why did the computer go to the doctor? Because it had a virus!",
    "Joke: Why do programmers prefer dark mode? Because light attracts bugs!"
  ];
  const modal = document.getElementById('fun-modal');
  const openBtn = document.getElementById('fun-facts-btn');
  const closeBtn = document.getElementById('fun-modal-close');
  const content = document.getElementById('fun-modal-content');
  if (!modal || !openBtn || !closeBtn || !content) return;
  function showFact() {
    const idx = Math.floor(Math.random() * facts.length);
    content.textContent = facts[idx];
    modal.classList.remove('hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    closeBtn.focus();
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.removeAttribute('aria-modal');
    openBtn.focus();
  }
  openBtn.addEventListener('click', showFact);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('hidden') && e.key === 'Escape') {
      closeModal();
    }
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
});
// SKILLS PROGRESS BARS ANIMATION
document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-bar');
  if (!skillBars.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-skill') || '0';
        bar.style.width = percent + '%';
        bar.classList.add('animated');
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
});
// TYPEWRITER EFFECT (single line, no duplicates, spec-compliant)
document.addEventListener('DOMContentLoaded', function() {
  const typewriter = document.getElementById('typewriter');
  if (!typewriter) return;
  const phrases = [
    "Hi, I'm Mujtaba Naqvi.",
    "Web Developer.",
    "Science Enthusiast.",
    "Lifelong Learner.",
    "Welcome to my website!"
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    typewriter.textContent = current.substring(0, charIdx);
    let delay = isDeleting ? 60 : 120;
    if (!isDeleting && charIdx === current.length) {
      delay = 1200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500;
    }
    setTimeout(type, delay);
  }
  type();
});
// FUN DROPDOWN ACCESSIBILITY & INTERACTIVITY
document.addEventListener('DOMContentLoaded', function() {
  const funToggle = document.getElementById('fun-dropdown-toggle');
  const funMenu = document.getElementById('fun-dropdown-menu');
  if (!funToggle || !funMenu) return;
  let open = false;
  function openMenu() {
    funMenu.classList.add('opacity-100', 'visible', 'pointer-events-auto');
    funMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    funToggle.setAttribute('aria-expanded', 'true');
    // Focus first item
    const firstItem = funMenu.querySelector('a,button');
    if (firstItem) firstItem.focus();
    open = true;
  }
  function closeMenu() {
    funMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
    funMenu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    funToggle.setAttribute('aria-expanded', 'false');
    open = false;
  }
  funToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  funToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu();
    }
    if (e.key === 'Escape') {
      closeMenu();
      funToggle.focus();
    }
  });
  funMenu.addEventListener('keydown', function(e) {
    const items = Array.from(funMenu.querySelectorAll('a,button'));
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % items.length;
      items[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + items.length) % items.length;
      items[prev].focus();
    } else if (e.key === 'Escape') {
      closeMenu();
      funToggle.focus();
    }
  });
  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!funMenu.contains(e.target) && !funToggle.contains(e.target)) {
      closeMenu();
    }
  });
  // Mobile: close on blur
  funMenu.addEventListener('focusout', function(e) {
    setTimeout(() => {
      if (!funMenu.contains(document.activeElement)) {
        closeMenu();
      }
    }, 10);
  });
});
// === Inspirational Quote of the Day ===
// Uses zenquotes.io API, falls back to local array if offline
document.addEventListener('DOMContentLoaded', function() {
  const quoteEl = document.getElementById('quote-day-widget');
  if (!quoteEl) return;
  // THEME TOGGLE LOGIC (unified, accessible, persistent)
  document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    // On load, set theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
    // Toggle handler
    function toggleTheme() {
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      }
    }
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
      themeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
      themeBtn.setAttribute('tabindex', '0');
      themeBtn.setAttribute('aria-label', 'Toggle light and dark mode');
      themeBtn.style.cursor = 'pointer';
    }
  });

  trigger.addEventListener('click', showGame);

  function showGame() {
    if (gameModal) return;
    gameModal = document.createElement('div');
    Object.assign(gameModal.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    });
    gameModal.innerHTML = `
      <div id='reaction-game-area' style='background:#fff;color:#222;padding:2.5rem;border-radius:1.2rem;box-shadow:0 8px 32px 0 rgba(30,32,60,0.18);min-width:320px;text-align:center;'>
        <h2 style='font-size:1.5rem;margin-bottom:1.2rem;'>Reaction Time Test</h2>
        <div id='reaction-instructions' style='margin-bottom:1.2rem;'>Click when the screen changes color!</div>
        <button id='reaction-start' style='padding:0.7rem 2.2rem;font-size:1.1rem;border-radius:0.6rem;background:#3b82f6;color:#fff;border:none;cursor:pointer;'>Start</button>
        <div id='reaction-result' style='margin-top:1.2rem;font-size:1.2rem;'></div>
        <button id='reaction-close' style='margin-top:1.5rem;padding:0.5rem 1.2rem;border-radius:0.5rem;background:#aaa;color:#fff;border:none;cursor:pointer;'>Close</button>
      </div>`;

    document.body.appendChild(gameModal);

    const area = document.getElementById('reaction-game-area');
    const startBtn = document.getElementById('reaction-start');
    const resultDiv = document.getElementById('reaction-result');
    const closeBtn = document.getElementById('reaction-close');
    let waiting = false, startTime = 0, timeoutId = null;

    function resetGame() {
      area.style.background = '#fff';
      resultDiv.textContent = '';
      waiting = false;
      startBtn.disabled = false;
      document.getElementById('reaction-instructions').textContent = 'Click when the screen changes color!';
    }

    startBtn.onclick = function() {
      startBtn.disabled = true;
      resultDiv.textContent = '';
      document.getElementById('reaction-instructions').textContent = 'Wait for it...';
      area.style.background = '#fff';
      waiting = true;
      timeoutId = setTimeout(() => {
        area.style.background = '#22c55e';
        document.getElementById('reaction-instructions').textContent = 'CLICK!';
        startTime = Date.now();
      }, 800 + Math.random() * 1800);
    };

    area.onclick = function() {
      if (!waiting || !startBtn.disabled) return;
      if (area.style.background === 'rgb(34, 197, 94)' || area.style.background === '#22c55e') {
        const reaction = Date.now() - startTime;
        resultDiv.innerHTML = `Your reaction time: <b>${reaction} ms</b>`;
        waiting = false;
        startBtn.disabled = false;
        document.getElementById('reaction-instructions').textContent = 'Try again or close.';
      } else {
        resultDiv.textContent = 'Too soon! Wait for green.';
        waiting = false;
        startBtn.disabled = false;
        clearTimeout(timeoutId);
        area.style.background = '#fff';
        document.getElementById('reaction-instructions').textContent = 'Try again!';
      }
    };

    closeBtn.onclick = function() {
      document.body.removeChild(gameModal);
      gameModal = null;
    };

    resetGame();
  }
});

// === Typewriter Effect ===
document.addEventListener('DOMContentLoaded', function() {
  function typewriterEffect(el, text, speed = 28, cb) {
    let i = 0;
    el.innerHTML = '';
    el.classList.add('typewriter');
    function type() {
      if (i < text.length) {
        if (text.charAt(i) === '\n') {
          el.innerHTML += '<br>';
        } else {
          el.innerHTML += text.charAt(i);
        }
        i++;
        setTimeout(type, speed + Math.random() * 40);
      } else if (cb) {
        cb();
      }
    }
    type();
  }

  document.querySelectorAll('.typewriter[data-typewriter]').forEach((el, idx) => {
    el.innerHTML = '';
    setTimeout(() => {
      typewriterEffect(el, el.getAttribute('data-typewriter'));
    }, idx * 600); // stagger start for multiple
  });
});

// === Quote Cycling Logic ===
document.addEventListener('DOMContentLoaded', function() {
  const quotes = [
    "Creativity is intelligence having fun.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "The best way to get started is to quit talking and begin doing.",
    "Stay curious, keep learning.",
    "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    "Dream big, work hard, stay humble.",
    "Success is not the key to happiness. Happiness is the key to success."
  ];
  let quoteIdx = 0;
  const quoteBox = document.getElementById('quote-box');
  if (!quoteBox) return;

  function showQuote(idx, animate = true) {
    quoteBox.textContent = `"${quotes[idx]}"`;
    if (animate) {
      quoteBox.classList.remove('animate__fadeIn');
      void quoteBox.offsetWidth; // trigger reflow
      quoteBox.classList.add('animate__fadeIn');
    }
  }

  quoteBox.addEventListener('mouseenter', () => {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    showQuote(quoteIdx);
  });

  quoteBox.addEventListener('click', () => {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    showQuote(quoteIdx);
  });

  quoteBox.addEventListener('animationend', () => {
    quoteBox.classList.remove('animate__fadeIn');
  });

  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    siteTitle.addEventListener('click', () => {
      alert(quotes[quoteIdx]);
    });
  }

  showQuote(quoteIdx, false);
});

// === Theme Toggle ===
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle-btn'); // your toggle button

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }

  // load saved theme or default dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }
});
