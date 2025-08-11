// === Inspirational Quote of the Day ===
// Uses zenquotes.io API, falls back to local array if offline
document.addEventListener('DOMContentLoaded', function() {
  const quoteEl = document.getElementById('quote-day-widget');
  if (!quoteEl) return;
  function showQuote(text, author) {
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteEl.innerHTML = `<div class='italic text-lg mb-2'>"${text}"</div><div class='text-sm text-gray-500'>— ${author}</div>`;
      quoteEl.style.opacity = 1;
    }, 350);
  }
  fetch('https://zenquotes.io/api/today')
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data) && data[0]) showQuote(data[0].q, data[0].a);
      else throw new Error('No quote');
    })
    .catch(() => {
      // fallback quotes
      const localQuotes = [
        { q: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', a: 'Winston Churchill' },
        { q: 'The only way to do great work is to love what you do.', a: 'Steve Jobs' },
        { q: 'Believe you can and you’re halfway there.', a: 'Theodore Roosevelt' },
        { q: 'You are never too old to set another goal or to dream a new dream.', a: 'C.S. Lewis' },
        { q: 'Act as if what you do makes a difference. It does.', a: 'William James' }
      ];
      const idx = Math.floor(Math.random() * localQuotes.length);
      showQuote(localQuotes[idx].q, localQuotes[idx].a);
    });
});

// === To-Do List App ===
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
      li.querySelector('.text-green-600').onclick = () => {
        todos[idx].done = !todos[idx].done;
        save();
      };
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

// === Hidden Reaction Time Game ===
document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.getElementById('reaction-game-trigger');
  if (!trigger) return;

  let gameModal = null;

  function showTrigger() { trigger.style.display = 'block'; }
  function hideTrigger() { trigger.style.display = 'none'; }

  setTimeout(showTrigger, 1200);
  trigger.addEventListener('mouseenter', showTrigger);
  trigger.addEventListener('mouseleave', hideTrigger);

  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.key.toLowerCase() === 'r' && trigger) {
      showGame();
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
