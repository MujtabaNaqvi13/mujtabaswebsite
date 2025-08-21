// Theme functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling
    const themeToggle = document.querySelector('.theme-toggle');
    const contrastToggle = document.querySelector('.contrast-toggle');
    const textSizeToggle = document.querySelector('.text-size-toggle');
    const root = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const savedContrast = localStorage.getItem('contrast');
    const savedTextSize = localStorage.getItem('textSize');
    
    if (savedTheme) {
        root.classList.toggle('dark', savedTheme === 'dark');
    } else {
        // Use system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
    }
    
    if (savedContrast === 'high') {
        root.classList.add('high-contrast');
    }
    
    if (savedTextSize === 'large') {
        root.classList.add('large-text');
    }
    
    // Theme toggle button
    themeToggle.addEventListener('click', () => {
        const isDark = root.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Contrast toggle button
    contrastToggle.addEventListener('click', () => {
        const isHighContrast = root.classList.toggle('high-contrast');
        localStorage.setItem('contrast', isHighContrast ? 'high' : 'normal');
    });
    
    // Text size toggle button
    textSizeToggle.addEventListener('click', () => {
        const isLargeText = root.classList.toggle('large-text');
        localStorage.setItem('textSize', isLargeText ? 'large' : 'normal');
    });
    
    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                counter.innerText = Math.min(count + increment, target);
                setTimeout(animateCounters, 1);
            }
        });
    }
    
    // Use IntersectionObserver to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the stats section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                skillsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Joke functionality
    const jokes = [
        {
            setup: "Why don't programmers like nature?",
            punchline: "Too many bugs."
        },
        {
            setup: "Why was the computer cold?",
            punchline: "It left its Windows open."
        },
        {
            setup: "Why was the JavaScript developer sad?",
            punchline: "He didn't know how to null his feelings."
        },
        {
            setup: "Why don't programmers like arrays?",
            punchline: "Because they start counting at 0."
        },
        {
            setup: "Why was the computer tired?",
            punchline: "Because it had a hard drive."
        },
        {
            setup: "How do you comfort a JavaScript bug?",
            punchline: "You console it."
        },
        {
            setup: "Why did the computer sneeze?",
            punchline: "It caught a bad cache."
        },
        {
            setup: "Why do programmers always mix up Christmas and Halloween?",
            punchline: "Because Oct 31 == Dec 25."
        },
        {
            setup: "Why can't computers play football?",
            punchline: "They don't like getting booted."
        },
        {
            setup: "Why don't keyboards sleep?",
            punchline: "They have two shifts."
        },
        {
            setup: "Why do Python programmers wear glasses?",
            punchline: "Because they don't C#."
        },
        {
            setup: "Why did the web developer go broke?",
            punchline: "Because he worked for exposure."
        },
        {
            setup: "Why was the computer so smart?",
            punchline: "It listened to its motherboard."
        },
        {
            setup: "Why did the AI cross the road?",
            punchline: "To optimize the chicken's route."
        },
        {
            setup: "Why did the PowerPoint presentation cross the road?",
            punchline: "To get to the other slide."
        },
        {
            setup: "Why was the IT teacher always calm?",
            punchline: "Because she had good control."
        },
        {
            setup: "Why did the computer keep freezing?",
            punchline: "Someone left the Windows open."
        },
        {
            setup: "Why was the coder always broke?",
            punchline: "Because he kept working for free 'cookies.'"
        },
        {
            setup: "Why did the hacker go broke?",
            punchline: "Because he lost his cache."
        },
        {
            setup: "Why don't computers argue?",
            punchline: "Because they always find common logic."
        }
    ];
    
    let currentJoke = 0;
    const jokeSetup = document.querySelector('.joke-setup');
    const jokePunchline = document.querySelector('.joke-punchline');
    const newJokeBtn = document.getElementById('new-joke');
    
    function showJoke() {
        jokeSetup.textContent = jokes[currentJoke].setup;
        jokePunchline.textContent = jokes[currentJoke].punchline;
        currentJoke = (currentJoke + 1) % jokes.length;
    }
    
    if (newJokeBtn) {
        newJokeBtn.addEventListener('click', showJoke);
    }
    
    // Fun facts functionality
    const facts = [
        "The first computer 'bug' was an actual moth trapped in a machine in 1947.",
        "The Apollo 11 mission computer had less power than your phone's calculator app.",
        "More than 90% of money today exists only in computers, not as coins or notes.",
        "'Captcha' is an acronym for Completely Automated Public Turing test to tell Computers and Humans Apart.",
        "The world's first website (info.cern.ch) is still online today.",
        "The first 1GB hard drive weighed as much as a fridge.",
        "A modern smartphone is millions of times more powerful than the computers used during World War II.",
        "Email existed before the World Wide Web.",
        "There are over 700 different programming languages.",
        "The first computer mouse was made of wood.",
        "The first emoji was created in Japan in 1999.",
        "The word 'robot' comes from a Czech word meaning 'forced labor.'",
        "Google's first storage system used LEGO bricks to hold 10 hard drives.",
        "In 1956, 5MB of storage cost as much as a house.",
        "The average person checks their phone 96 times a day.",
        "If the internet was weighed, it would be about the weight of a strawberry (because data is just electrons).",
        "The QWERTY keyboard was designed to slow typists down so typewriters wouldn't jam.",
        "The first YouTube video was uploaded in 2005 and was just 18 seconds long.",
        "More than 300 billion emails are sent every single day.",
        "'Spam' email got its name from a Monty Python comedy sketch about canned meat."
    ];
    
    let currentFact = 0;
    const factCards = document.querySelectorAll('.fact-card');
    const moreFactsBtn = document.getElementById('more-facts');
    
    function updateFacts() {
        factCards.forEach((card, index) => {
            const factIndex = (currentFact + index) % facts.length;
            card.querySelector('.fact-text').textContent = facts[factIndex];
        });
        currentFact = (currentFact + factCards.length) % facts.length;
    }
    
    if (moreFactsBtn) {
        moreFactsBtn.addEventListener('click', updateFacts);
    }
    
    // Initialize facts
    updateFacts();
    
    // Tab functionality for fun section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Typing test functionality
    const typingText = document.getElementById('typing-text');
    const typingInput = document.getElementById('typing-input');
    const typingTime = document.getElementById('typing-time');
    const typingWpm = document.getElementById('typing-wpm');
    const typingAccuracy = document.getElementById('typing-accuracy');
    const typingRestart = document.getElementById('typing-restart');
    
    let startTime, endTime, timerInterval;
    const sampleText = "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.";
    
    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    function updateTimer() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        typingTime.textContent = elapsedTime;
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
        endTime = new Date();
    }
    
    function calculateWpm(text, timeInSeconds) {
        const words = text.trim().split(/\s+/).length;
        const minutes = timeInSeconds / 60;
        return Math.round(words / minutes);
    }
    
    function calculateAccuracy(original, typed) {
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (i < original.length && typed[i] === original[i]) {
                correct++;
            }
        }
        return Math.round((correct / original.length) * 100);
    }
    
    function restartTest() {
        typingInput.value = '';
        typingTime.textContent = '0';
        typingWpm.textContent = '0';
        typingAccuracy.textContent = '0';
        typingInput.disabled = false;
        typingInput.focus();
        clearInterval(timerInterval);
    }
    
    if (typingInput && typingRestart) {
        typingInput.addEventListener('focus', startTimer);
        typingInput.addEventListener('input', function() {
            const typedText = this.value;
            const originalText = sampleText;
            
            // Check if typing is complete
            if (typedText.length === originalText.length) {
                stopTimer();
                this.disabled = true;
                
                const timeInSeconds = Math.floor((endTime - startTime) / 1000);
                const wpm = calculateWpm(typedText, timeInSeconds);
                const accuracy = calculateAccuracy(originalText, typedText);
                
                typingWpm.textContent = wpm;
                typingAccuracy.textContent = accuracy;
                
                // Save high score to localStorage
                const bestScore = localStorage.getItem('typingBestWpm');
                if (!bestScore || wpm > bestScore) {
                    localStorage.setItem('typingBestWpm', wpm);
                }
            }
        });
        
        typingRestart.addEventListener('click', restartTest);
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!name.value.trim()) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate message
            const message = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (!message.value.trim()) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            if (isValid) {
                // Simulate form submission (in a real app, this would be an API call)
                setTimeout(() => {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1000);
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add animations to elements when they come into view
    const animatedElements = document.querySelectorAll('.skill-progress, .stat-card, .project-card, .fact-card');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
});