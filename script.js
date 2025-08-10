// === 1. Animated Skills Progress Bars ===
// Animates progress bars in About Me section when scrolled into view
document.addEventListener('DOMContentLoaded', function() {
  const skillBars = [
    { sel: '[data-skill="maths"]', pct: 70 },
    { sel: '[data-skill="gaming"]', pct: 80 },
    { sel: '[data-skill="computer"]', pct: 65 },
    { sel: '[data-skill="coding"]', pct: 90 }
  ];
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const el = document.querySelector(bar.sel);
          if (el && el.style.width !== bar.pct + '%') {
            el.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
            setTimeout(() => { el.style.width = bar.pct + '%'; }, 200);
          }
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const trigger = document.getElementById('skills-progress-bars');
  if (trigger) observer.observe(trigger);
});

// === 2. Fun Dropdown: Fun Facts & Jokes ===
// Dropdown menu logic
document.addEventListener('DOMContentLoaded', function() {
  const funDropdown = document.getElementById('fun-dropdown');
  const funNav = document.querySelector('li.group');
  if (funDropdown && funNav) {
    funNav.addEventListener('mouseenter', () => { funDropdown.style.display = 'block'; });
    funNav.addEventListener('mouseleave', () => { funDropdown.style.display = 'none'; });
    funNav.addEventListener('focusin', () => { funDropdown.style.display = 'block'; });
    funNav.addEventListener('focusout', () => { funDropdown.style.display = 'none'; });
  }
  // Fun Facts & Jokes logic
  const funFacts = [
    'Honey never spoils — archaeologists have eaten 3000-year-old honey!',
    'Bananas are berries, but strawberries are not.',
    'Octopuses have three hearts and blue blood.',
    'A group of flamingos is called a "flamboyance".',
    'The Eiffel Tower can be 15 cm taller in summer.',
    'Wombat poop is cube-shaped.',
    'The unicorn is the national animal of Scotland.'
  ];
  const jokes = [
    'Why do programmers prefer dark mode? Because light attracts bugs!',
    'Why did the math book look sad? Because it had too many problems.',
    'Why was the computer cold? It left its Windows open.',
    'Why did the scarecrow win an award? He was outstanding in his field.',
    'Parallel lines have so much in common. It’s a shame they’ll never meet.',
    'Why do JavaScript developers wear glasses? Because they don’t C#.'
  ];
  function showFunModal(text) {
    let modal = document.getElementById('fun-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'fun-modal';
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.background = 'var(--section-bg, #fff)';
      modal.style.color = 'var(--section-fg, #222)';
      modal.style.padding = '2rem 2.5rem';
      modal.style.borderRadius = '1rem';
      modal.style.boxShadow = '0 8px 32px 0 rgba(30,32,60,0.18)';
      modal.style.zIndex = 9999;
      modal.style.fontSize = '1.2rem';
      modal.style.textAlign = 'center';
      modal.style.opacity = 0;
      modal.style.transition = 'opacity 0.4s';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `<span style="display:inline-block;min-width:220px;">${text}</span><br><button id='close-fun-modal' style='margin-top:1.5rem;padding:0.5rem 1.2rem;border-radius:0.5rem;background:#3b82f6;color:#fff;border:none;cursor:pointer;'>Close</button>`;
    modal.style.display = 'block';
    setTimeout(() => { modal.style.opacity = 1; }, 10);
    document.getElementById('close-fun-modal').onclick = () => {
      modal.style.opacity = 0;
      setTimeout(() => { modal.style.display = 'none'; }, 400);
    };
  }
  const factBtn = document.getElementById('fun-fact-btn');
  const jokeBtn = document.getElementById('joke-btn');
  if (factBtn) factBtn.onclick = () => {
    const idx = Math.floor(Math.random() * funFacts.length);
    showFunModal(funFacts[idx]);
  };
  if (jokeBtn) jokeBtn.onclick = () => {
    const idx = Math.floor(Math.random() * jokes.length);
    showFunModal(jokes[idx]);
  };
});

// === 3. Photo Gallery with Lightbox ===
document.addEventListener('DOMContentLoaded', function() {
  // Use Unsplash images (free, high-quality, relevant)
  const images = [
    { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', alt: 'Coding at night' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', alt: 'Teamwork on laptops' },
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', alt: 'Mountain adventure' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', alt: 'Gaming setup' },
    { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', alt: 'Books and learning' },
    { src: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80', alt: 'Coffee and code' },
    { src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', alt: 'Creative workspace' },
    { src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', alt: 'Fun with friends' }
  ];
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    images.forEach((img, i) => {
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = img.alt;
      el.className = 'rounded shadow cursor-pointer transition-transform duration-200 hover:scale-105';
      el.style.maxHeight = '180px';
      el.style.objectFit = 'cover';
      el.tabIndex = 0;
      el.setAttribute('data-idx', i);
      grid.appendChild(el);
    });
  }
  // Lightbox logic
  let currentIdx = 0;
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  function openModal(idx) {
    if (!modal || !modalImg) return;
    currentIdx = idx;
    modalImg.src = images[idx].src;
    modalImg.alt = images[idx].alt;
    modal.classList.remove('hidden');
  }
  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }
  function showPrev() {
    currentIdx = (currentIdx - 1 + images.length) % images.length;
    openModal(currentIdx);
  }
  function showNext() {
    currentIdx = (currentIdx + 1) % images.length;
    openModal(currentIdx);
  }
  if (grid) {
    grid.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', e => openModal(Number(img.getAttribute('data-idx'))));
      img.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(Number(img.getAttribute('data-idx'))); });
    });
  }
  if (closeBtn) closeBtn.onclick = closeModal;
  if (prevBtn) prevBtn.onclick = showPrev;
  if (nextBtn) nextBtn.onclick = showNext;
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});

// === 4. Animated Stats Counter ===
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stat-counter');
  let started = false;
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = Math.ceil(target / (duration / 18));
    function update() {
      start += step;
      if (start >= target) {
        el.textContent = target >= 1000 ? target.toLocaleString() : target;
      } else {
        el.textContent = start >= 1000 ? start.toLocaleString() : start;
        setTimeout(update, 18);
      }
    }
    update();
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const numEl = counter.querySelector('div.text-2xl');
          if (numEl) animateCounter(numEl, target);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (counters.length) observer.observe(counters[0].parentElement);
});

// === 5. Hidden Reaction Time Game ===
// Trigger: small icon (shown on hover bottom right) or Shift+R
document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.getElementById('reaction-game-trigger');
  let gameModal = null;
  // Show icon on hover (mobile: always visible)
  function showTrigger() { trigger.style.display = 'block'; }
  function hideTrigger() { trigger.style.display = 'none'; }
  setTimeout(showTrigger, 1200);
  trigger.addEventListener('mouseenter', showTrigger);
  trigger.addEventListener('mouseleave', hideTrigger);
  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.shiftKey && e.key.toLowerCase() === 'r') && trigger) {
      showGame();
    }
  });
  trigger.addEventListener('click', showGame);
  function showGame() {
    if (gameModal) return;
    gameModal = document.createElement('div');
    gameModal.style.position = 'fixed';
    gameModal.style.top = 0;
    gameModal.style.left = 0;
    gameModal.style.width = '100vw';
    gameModal.style.height = '100vh';
    gameModal.style.background = 'rgba(0,0,0,0.85)';
    gameModal.style.display = 'flex';
    gameModal.style.flexDirection = 'column';
    gameModal.style.alignItems = 'center';
    gameModal.style.justifyContent = 'center';
    gameModal.style.zIndex = 9999;
    gameModal.innerHTML = `<div id='reaction-game-area' style='background:#fff;color:#222;padding:2.5rem 2.5rem 2rem 2.5rem;border-radius:1.2rem;box-shadow:0 8px 32px 0 rgba(30,32,60,0.18);min-width:320px;text-align:center;'><h2 style='font-size:1.5rem;margin-bottom:1.2rem;'>Reaction Time Test</h2><div id='reaction-instructions' style='margin-bottom:1.2rem;'>Click when the screen changes color!</div><button id='reaction-start' style='padding:0.7rem 2.2rem;font-size:1.1rem;border-radius:0.6rem;background:#3b82f6;color:#fff;border:none;cursor:pointer;'>Start</button><div id='reaction-result' style='margin-top:1.2rem;font-size:1.2rem;'></div><button id='reaction-close' style='margin-top:1.5rem;padding:0.5rem 1.2rem;border-radius:0.5rem;background:#aaa;color:#fff;border:none;cursor:pointer;'>Close</button></div>`;
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
      if (!waiting || startBtn.disabled === false) return;
      if (area.style.background === 'rgb(34, 197, 94)' || area.style.background === '#22c55e') {
        const reaction = Date.now() - startTime;
        resultDiv.textContent = `Your reaction time: <b>${reaction} ms</b>`;
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
  }
});
// Theme toggle logic (dark/light)
// Unified theme toggle logic using data-theme and CSS variables
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // Update icon
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.innerHTML = '<i class="fas fa-sun animate__animated animate__fadeIn" style="color:#fbbf24"></i>';
    } else {
      themeIcon.innerHTML = '<i class="fas fa-moon animate__animated animate__fadeIn" style="color:#facc15"></i>';
    }
  }
}

function toggleTheme() {
  const currentTheme = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  themeToggle.classList.add('animate__tada');
  setTimeout(() => themeToggle.classList.remove('animate__tada'), 700);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// On load, set theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}
// Typewriter effect for all .typewriter elements with data-typewriter, supporting line breaks
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
        setTimeout(type, speed + Math.random()*40);
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
    }, idx * 600); // stagger if multiple
  });
});

// Navbar typewriter underline animation
document.querySelectorAll('.typewriter-underline').forEach(link => {
  link.addEventListener('mousedown', () => link.classList.add('active'));
  link.addEventListener('mouseup', () => link.classList.remove('active'));
  link.addEventListener('mouseleave', () => link.classList.remove('active'));
});

// Quotes logic
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
function showQuote(idx, animate = true) {
  if (!quoteBox) return;
  quoteBox.textContent = '"' + quotes[idx] + '"';
  if (animate) {
    quoteBox.classList.remove('animate__fadeIn');
    void quoteBox.offsetWidth; // trigger reflow
    quoteBox.classList.add('animate__fadeIn');
  }
}
if (quoteBox) {
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
}
// Site title click for quote popup
const siteTitle = document.getElementById('site-title');
if (siteTitle) {
  siteTitle.addEventListener('click', () => {
    alert(quotes[quoteIdx]);
  });
}
showQuote(quoteIdx, false);

// Contact area logic (sign up/login/guest)
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const guestBtn = document.getElementById('guest-btn');
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');
let userMode = null;





// Typing Test, Theme Toggle, and Quotes Logic
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    }

    const quotes = [
        { text: "Every expert was once a beginner. I'm just getting started.", author: "Mujtaba Naqvi" },
        { text: "Learning isn’t hard when you’re doing something you love.", author: "Mujtaba Naqvi" },
        { text: "Why wait to grow up to build the future? I’m coding it now.", author: "Mujtaba Naqvi" },
        { text: "Mistakes are just milestones you leave behind while chasing mastery.", author: "Mujtaba Naqvi" },
        { text: "I’m not just learning to code — I’m learning to think, build, and lead.", author: "Mujtaba Naqvi" }
    ];

    let currentQuoteIndex = 0;

    function displayQuote(index) {
        const quoteTextElement = document.getElementById('current-quote-text');
        const quoteAuthorElement = document.getElementById('current-quote-author');
        if (!quoteTextElement || !quoteAuthorElement) return;
        quoteTextElement.style.opacity = 0; // Fade out
        quoteAuthorElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            quoteTextElement.textContent = quotes[index].text;
            quoteAuthorElement.textContent = `— ${quotes[index].author}`;
            quoteTextElement.style.opacity = 1; // Fade in
            quoteAuthorElement.style.opacity = 1; // Fade in
        }, 300); // Wait for fade out to complete before changing content
    }

    // Typing Test Logic (improved)
    const typingSentences = [
        "The quick brown fox jumps over the lazy dog.",
        "JavaScript makes websites interactive and fun.",
        "Science is the poetry of reality.",
        "Coding is like solving a puzzle every day.",
        "Never stop learning new things!",
        "Octopuses have three hearts and blue blood.",
        "Bananas are berries, but strawberries are not.",
        "Honey never spoils, even after thousands of years."
    ];
    const typingSentence = document.getElementById('typing-sentence');
    const typingInput = document.getElementById('typing-input');
    const typingResult = document.getElementById('typing-result');
    const typingReset = document.getElementById('typing-reset');
    let startTime = null;
    let currentSentence = '';

    function setRandomSentence() {
        currentSentence = typingSentences[Math.floor(Math.random() * typingSentences.length)];
        if (typingSentence) typingSentence.textContent = currentSentence;
        if (typingInput) typingInput.value = '';
        if (typingResult) typingResult.textContent = '';
        startTime = null;
    }

    if (typingInput && typingSentence && typingResult && typingReset) {
        setRandomSentence();
        typingInput.addEventListener('focus', () => {
            if (!startTime) startTime = Date.now();
        });
        typingInput.addEventListener('input', () => {
            if (!startTime) startTime = Date.now();
            if (typingInput.value === currentSentence) {
                const timeTaken = (Date.now() - startTime) / 1000;
                const wpm = Math.round((currentSentence.split(' ').length / timeTaken) * 60);
                typingResult.textContent = `Great job! Time: ${timeTaken.toFixed(2)} seconds. WPM: ${wpm}`;
            } else {
                typingResult.textContent = '';
            }
        });
        typingReset.addEventListener('click', (e) => {
            e.preventDefault();
            setRandomSentence();
            typingInput.focus();
        });
    }

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function updateThemeIcon() {
        if (!themeIcon) return;
        if (body.classList.contains('light-mode')) {
            themeIcon.innerHTML = '<i class="fas fa-sun animate__animated animate__fadeIn" style="color:#fbbf24"></i>';
        } else {
            themeIcon.innerHTML = '<i class="fas fa-moon animate__animated animate__fadeIn" style="color:#facc15"></i>';
        }
    }

    // Always update icon on load and after theme change
    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
            setTimeout(updateThemeIcon, 10);
            themeToggle.classList.add('animate__tada');
            setTimeout(() => themeToggle.classList.remove('animate__tada'), 700);
        });
    }

    // Quotes Rotation Logic
    displayQuote(currentQuoteIndex);
    const quoteCard = document.getElementById('quote-card');
    if (quoteCard) {
        quoteCard.addEventListener('mouseenter', () => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            displayQuote(currentQuoteIndex);
        });
    }
});