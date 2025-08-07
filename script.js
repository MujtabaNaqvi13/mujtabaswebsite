// Question Sender: Custom mailto with name/email/question, no visible destination
document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('question-form');
    const questionSuccess = document.getElementById('question-success');
    if (questionForm && questionSuccess) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const question = document.getElementById('question').value.trim();
            const mailto = `mailto:s.mujtaba.naqvi@outlook.com?subject=New%20Question%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AQuestion:%20${encodeURIComponent(question)}`;
            window.location.href = mailto;
            setTimeout(() => {
                questionSuccess.classList.remove('hidden');
                questionForm.reset();
            }, 500);
        });
    }
});
// Typing Test Logic
document.addEventListener('DOMContentLoaded', () => {
    const typingSentence = document.getElementById('typing-sentence');
    const typingInput = document.getElementById('typing-input');
    const typingResult = document.getElementById('typing-result');
    let startTime = null;

    if (typingInput && typingSentence && typingResult) {
        typingInput.addEventListener('focus', () => {
            typingInput.value = '';
            typingResult.textContent = '';
            startTime = Date.now();
        });
        typingInput.addEventListener('input', () => {
            if (typingInput.value === typingSentence.textContent) {
                const timeTaken = (Date.now() - startTime) / 1000;
                typingResult.textContent = `Great job! Time: ${timeTaken.toFixed(2)} seconds.`;
            }
        });
    }
});
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