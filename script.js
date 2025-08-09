// Theme toggle logic (dark/light)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark');
    themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark');
    themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Initial theme (system preference)
setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  setTheme(isDark);
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
let users = JSON.parse(localStorage.getItem('users') || '{}');
let currentUser = null;

function showContactForm(mode) {
  userMode = mode;
  contactForm.classList.remove('hidden');
  contactSuccess.classList.add('hidden');
  if (mode === 'guest') {
    contactForm.querySelector('#contact-name').value = 'Guest';
    contactForm.querySelector('#contact-email').value = '';
    contactForm.querySelector('#contact-name').readOnly = true;
    contactForm.querySelector('#contact-email').readOnly = true;
  } else {
    contactForm.querySelector('#contact-name').value = '';
    contactForm.querySelector('#contact-email').value = '';
    contactForm.querySelector('#contact-name').readOnly = false;
    contactForm.querySelector('#contact-email').readOnly = false;
  }
}

if (signupBtn) signupBtn.addEventListener('click', () => {
  const name = prompt('Choose a username:');
  if (!name) return;
  const email = prompt('Enter your email:');
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    alert('Please enter a valid email.');
    return;
  }
  if (users[email]) {
    alert('User already exists. Please login.');
    return;
  }
  const password = prompt('Set a password:');
  if (!password || password.length < 4) {
    alert('Password must be at least 4 characters.');
    return;
  }
  users[email] = { name, password };
  localStorage.setItem('users', JSON.stringify(users));
  currentUser = { name, email };
  contactForm.querySelector('#contact-name').value = name;
  contactForm.querySelector('#contact-email').value = email;
  contactForm.querySelector('#contact-name').readOnly = true;
  contactForm.querySelector('#contact-email').readOnly = true;
  contactForm.classList.remove('hidden');
  contactSuccess.classList.add('hidden');
});

if (loginBtn) loginBtn.addEventListener('click', () => {
  const email = prompt('Enter your email:');
  if (!email || !users[email]) {
    alert('No user found. Please sign up.');
    return;
  }
  const password = prompt('Enter your password:');
  if (users[email].password !== password) {
    alert('Incorrect password.');
    return;
  }
  currentUser = { name: users[email].name, email };
  contactForm.querySelector('#contact-name').value = users[email].name;
  contactForm.querySelector('#contact-email').value = email;
  contactForm.querySelector('#contact-name').readOnly = true;
  contactForm.querySelector('#contact-email').readOnly = true;
  contactForm.classList.remove('hidden');
  contactSuccess.classList.add('hidden');
});

if (guestBtn) guestBtn.addEventListener('click', () => showContactForm('guest'));

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.classList.add('hidden');
    contactSuccess.classList.remove('hidden');
    setTimeout(() => {
      contactSuccess.classList.add('hidden');
    }, 4000);
    // Optionally, send to s.mujtaba.naqvi@outlook.com via backend
  });
}
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