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
            themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
            updateThemeIcon();
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