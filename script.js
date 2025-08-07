// Theme Toggle Logic


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


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }
});

// Quotes Rotation Logic
const quotes = [
    { text: "Every expert was once a beginner. I'm just getting started.", author: "Mujtaba Naqvi" },
    { text: "Learning isn’t hard when you’re doing something you love.", author: "Mujtaba Naqvi" },
    { text: "Why wait to grow up to build the future? I’m coding it now.", author: "Mujtaba Naqvi" },
    { text: "Mistakes are just milestones you leave behind while chasing mastery.", author: "Mujtaba Naqvi" },
    { text: "I’m not just learning to code — I’m learning to think, build, and lead.", author: "Mujtaba Naqvi" }
];

let currentQuoteIndex = 0;
const quoteTextElement = document.getElementById('current-quote-text');
const quoteAuthorElement = document.getElementById('current-quote-author');
const quoteCard = document.getElementById('quote-card');

function displayQuote(index) {
    quoteTextElement.style.opacity = 0; // Fade out
    quoteAuthorElement.style.opacity = 0; // Fade out

    setTimeout(() => {
        quoteTextElement.textContent = quotes[index].text;
        quoteAuthorElement.textContent = `— ${quotes[index].author}`;
        quoteTextElement.style.opacity = 1; // Fade in
        quoteAuthorElement.style.opacity = 1; // Fade in
    }, 300); // Wait for fade out to complete before changing content
}

// Initial display
displayQuote(currentQuoteIndex);

// Event listener for hover
quoteCard.addEventListener('mouseenter', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote(currentQuoteIndex);
});