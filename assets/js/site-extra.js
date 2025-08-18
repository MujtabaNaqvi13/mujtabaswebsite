// site-extra.js
// See full spec for detailed comments and feature breakdown
// All code is organized and commented by feature

// ========================= THEME: init & toggle =========================
document.addEventListener('DOMContentLoaded', function () {
	(function themeInit() {
		const body = document.body;
		const btn = document.getElementById('theme-toggle-btn');
		body.classList.add('no-transitions');
		const saved = localStorage.getItem('theme') || 'dark';
		if (saved === 'light') body.classList.add('light-mode');
		requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('no-transitions')));
		function setTheme(theme) {
			if (theme === 'light') body.classList.add('light-mode'); else body.classList.remove('light-mode');
			localStorage.setItem('theme', theme);
		}
		if (!btn) return;
		btn.setAttribute('aria-pressed', String(body.classList.contains('light-mode')));
		if (!btn.querySelector('.thumb')) {
			const thumb = document.createElement('span'); thumb.className = 'thumb';
			const icon = document.createElement('span'); icon.className = 'icon';
			icon.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
			thumb.appendChild(icon); btn.appendChild(thumb);
		}
		btn.addEventListener('click', () => {
			const isLight = body.classList.contains('light-mode');
			setTheme(isLight ? 'dark' : 'light');
			btn.setAttribute('aria-pressed', String(!isLight));
			const icon = btn.querySelector('.thumb .icon'); if (icon) icon.textContent = isLight ? '🌙' : '☀️';
		});
	})();

// ========================= SMOOTH SCROLL (header offset) =========================
	(function smoothScroll() {
		const links = document.querySelectorAll('a[data-scroll], .nav-link[data-scroll]');
		const header = document.querySelector('.header-bg') || document.querySelector('header');
		function getOffset() {
			if (!header) return 0;
			return header.getBoundingClientRect().height + 8;
		}
		links.forEach(link => {
			link.addEventListener('click', (e) => {
				const href = link.getAttribute('href');
				if (!href || !href.startsWith('#')) return;
				const target = document.querySelector(href);
				if (!target) return;
				e.preventDefault();
				const top = window.scrollY + target.getBoundingClientRect().top - getOffset();
				window.scrollTo({ top, behavior: 'smooth' });
				target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
				history.replaceState(null, '', href);
			});
		});
	})();

// ========================= SKILLS: progress bars =========================
	(function skills() {
		const fills = document.querySelectorAll('.bar-fill[data-target]');
		if (!fills.length) return;
		const obs = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				const fill = entry.target;
				const target = Number(fill.dataset.target) || 0;
				fill.style.width = target + '%';
				const bar = fill.closest('.bar');
				if (bar) bar.setAttribute('aria-valuenow', String(target));
				observer.unobserve(fill);
			});
		}, { threshold: 0.45 });
		fills.forEach(f => { f.style.width = '0%'; obs.observe(f); });
	})();

// ========================= FUN FACTS & JOKES =========================
	(function funFactsJokes() {
		const facts = [
			"creativity is intelligence having fun.",
			"code is like humor. when you have to explain it, it’s bad.",
			"the best way to get started is to quit talking and begin doing.",
			"stay curious, keep learning.",
			"every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
			"dream big, work hard, stay humble.",
			"success is not the key to happiness. happiness is the key to success.",
			"learning is a treasure that will follow its owner everywhere.",
			"small steps every day lead to big results."
		];
		const jokes = [
			"why did the computer show up at work late? it had a hard drive.",
			"why was the developer always calm? because they handled exceptions.",
			"why did the coder quit his job? he didn't get arrays.",
			"why did the keyboard break up with the mouse? it found someone more clicky.",
			"how do programmers enjoy nature? they log off.",
			"why was the math book sad? it had too many problems.",
			"what do you call a sketchy neighborhood in the cloud? the ip district.",
			"why do programmers prefer dark mode? because light attracts bugs.",
			"what's a programmer’s favorite hangout? the Foo Bar."
		];
		const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
		let card = document.getElementById('fun-card');
		if (!card) {
			card = document.createElement('div');
			card.id = 'fun-card';
			card.className = 'card';
			card.innerHTML = `<div class="fun-text" aria-live="polite"></div>
				<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
					<small class="fun-mode" style="opacity:.7;font-size:.86rem"></small>
					<div class="fun-actions">
						<button class="fun-prev" aria-label="prev">◀</button>
						<button class="fun-next" aria-label="next">next</button>
						<button class="fun-close" aria-label="close">✕</button>
					</div>
				</div>`;
			document.body.appendChild(card);
		}
		const textEl = card.querySelector('.fun-text');
		const modeEl = card.querySelector('.fun-mode');
		const nextBtn = card.querySelector('.fun-next');
		const prevBtn = card.querySelector('.fun-prev');
		const closeBtn = card.querySelector('.fun-close');
		let pool = 'facts';
		function show(txt, p) {
			pool = p || pool;
			modeEl.textContent = pool === 'facts' ? 'fun facts' : 'jokes';
			card.classList.add('show');
			textEl.style.opacity = 0;
			setTimeout(() => {
				textEl.textContent = txt;
				textEl.style.transition = 'opacity 220ms, transform 220ms';
				textEl.style.opacity = 1;
			}, 60);
		}
		function hide() { card.classList.remove('show'); }
		document.addEventListener('click', (e) => {
			const btn = e.target.closest('.dropdown-action');
			if (!btn) return;
			const action = btn.dataset.action;
			if (action === 'fun-facts') show(rand(facts), 'facts');
			if (action === 'jokes') show(rand(jokes), 'jokes');
		});
		nextBtn.addEventListener('click', () => { show(pool === 'facts' ? rand(facts) : rand(jokes), pool); });
		prevBtn.addEventListener('click', () => { show(pool === 'facts' ? rand(facts) : rand(jokes), pool); });
		closeBtn.addEventListener('click', hide);
		document.addEventListener('keydown', (e) => {
			if (!card.classList.contains('show')) return;
			if (e.key === 'Escape') hide();
			if (e.key === 'ArrowRight') show(pool === 'facts' ? rand(facts) : rand(jokes), pool);
			if (e.key === 'ArrowLeft') show(pool === 'facts' ? rand(facts) : rand(jokes), pool);
		});
	})();

// ========================= GALLERY LIGHTBOX =========================
	(function galleryLightbox() {
		const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
		if (!thumbs.length) return;
		const images = thumbs.map(t => {
			const img = t.querySelector('img');
			return { src: img ? img.getAttribute('src') : '', alt: img ? img.getAttribute('alt') : '' };
		});
		let overlay = document.getElementById('lightbox-overlay');
		if (!overlay) {
			overlay = document.createElement('div');
			overlay.id = 'lightbox-overlay';
			overlay.innerHTML = `<div class="lightbox-inner">
				<button class="lightbox-close" aria-label="close">✕</button>
				<button class="lightbox-prev" aria-label="previous">◀</button>
				<button class="lightbox-next" aria-label="next">▶</button>
				<img src="" alt="" />
				<div class="lightbox-caption"></div>
			</div>`;
			document.body.appendChild(overlay);
		}
		const imgEl = overlay.querySelector('img');
		const caption = overlay.querySelector('.lightbox-caption');
		const closeBtn = overlay.querySelector('.lightbox-close');
		const nextBtn = overlay.querySelector('.lightbox-next');
		const prevBtn = overlay.querySelector('.lightbox-prev');
		let current = 0;
		function open(i) {
			current = i;
			imgEl.src = images[i].src;
			imgEl.alt = images[i].alt || `image ${i+1}`;
			caption.textContent = images[i].alt || '';
			overlay.classList.add('show');
			overlay.style.display = 'flex';
		}
		function close() { overlay.classList.remove('show'); setTimeout(() => overlay.style.display = 'none', 250); }
		function next() { open((current + 1) % images.length); }
		function prev() { open((current - 1 + images.length) % images.length); }
		thumbs.forEach((t, i) => t.addEventListener('click', () => open(i)));
		closeBtn.addEventListener('click', close);
		nextBtn.addEventListener('click', next);
		prevBtn.addEventListener('click', prev);
		overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
		document.addEventListener('keydown', (e) => {
			if (!overlay.classList.contains('show')) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		});
		let startX = 0;
		imgEl.addEventListener('touchstart', (e) => startX = e.changedTouches[0].clientX);
		imgEl.addEventListener('touchend', (e) => {
			const dx = e.changedTouches[0].clientX - startX;
			if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
		});
	})();

// ========================= STATS COUNTERS =========================
	(function statsCounters() {
		const nums = document.querySelectorAll('.stat-num[data-target]');
		if (!nums.length) return;
		const obs = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				const el = entry.target;
				const target = Number(el.dataset.target);
				let start = 0;
				const duration = 1200;
				const step = (timestamp, startTime = performance.now()) => {
					const now = performance.now();
					const progress = Math.min((now - startTime) / duration, 1);
					const value = Math.floor(progress * target);
					el.textContent = target >= 1000 ? value.toLocaleString() : value;
					if (progress < 1) requestAnimationFrame(() => step(null, startTime));
				};
				requestAnimationFrame(step);
				observer.unobserve(el);
			});
		}, { threshold: 0.4 });
		nums.forEach(n => {
			n.dataset.target = n.getAttribute('data-target') || n.textContent || '0';
			obs.observe(n);
		});
	})();

// ========================= REACTION TIME GAME =========================
	(function reactionGame() {
		const trigger = document.getElementById('reaction-game-trigger');
		if (trigger) trigger.style.display = 'flex';
		document.addEventListener('keydown', (e) => {
			if (e.shiftKey && e.key.toLowerCase() === 'r') open();
		});
		if (trigger) { trigger.addEventListener('click', open); trigger.addEventListener('touchstart', (e) => { e.preventDefault(); open(); }); }
		function open() {
			if (typeof showGame === 'function') { try { showGame(); return; } catch(_) {} }
			const modal = document.createElement('div');
			modal.style.position = 'fixed'; modal.style.inset = '0'; modal.style.background = 'rgba(0,0,0,0.85)';
			modal.style.display = 'flex'; modal.style.alignItems = 'center'; modal.style.justifyContent = 'center'; modal.style.zIndex = 1600;
			modal.innerHTML = `<div style="background:#fff;padding:20px;border-radius:12px;text-align:center;min-width:300px;">
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
			let waiting = false, startTime = 0, timeoutId = null;
			startBtn.onclick = () => {
				startBtn.disabled = true; result.textContent = ''; modal.querySelector('#rt-instructions').textContent = 'wait...';
				area.style.background = '#fff'; waiting = true;
				timeoutId = setTimeout(() => {
					area.style.background = '#22c55e'; modal.querySelector('#rt-instructions').textContent = 'CLICK!'; startTime = Date.now();
				}, 800 + Math.random() * 1600);
			};
			area.onclick = () => {
				if (!waiting) return;
				if (area.style.background === 'rgb(34, 197, 94)' || area.style.background === '#22c55e') {
					const reaction = Date.now() - startTime;
					result.innerHTML = `your reaction time: <strong>${reaction} ms</strong>`;
					waiting = false; startBtn.disabled = false;
					const best = Number(localStorage.getItem('bestReaction') || '1e9');
					if (reaction < best) { localStorage.setItem('bestReaction', String(reaction)); result.innerHTML += '<div style="color:green">new best!</div>'; }
				} else {
					result.textContent = 'too soon!';
					waiting = false; startBtn.disabled = false; clearTimeout(timeoutId); area.style.background = '#fff';
				}
			};
			closeBtn.onclick = () => { document.body.removeChild(modal); };
		}
	})();

// ========================= CONTACT FORM (client validation) =========================
	(function contactForm() {
		const form = document.getElementById('contact-form');
		const success = document.getElementById('contact-success');
		if (!form) return;
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = form.querySelector('#c-name').value.trim();
			const email = form.querySelector('#c-email').value.trim();
			const message = form.querySelector('#c-message').value.trim();
			const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			if (!name || !emailOk || !message) {
				alert('please complete the form with valid email.');
				return;
			}
			if (success) { success.classList.remove('hidden'); setTimeout(()=> success.classList.add('hidden'), 3500); }
			form.reset();
		});
	})();

// ========================= TIMELINE, TESTIMONIALS, BADGES (small behaviors) =========================
	(function smallExtras() {
		const items = document.querySelectorAll('.timeline-list li');
		if (items.length) {
			const obs = new IntersectionObserver((entries, ob) => {
				entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('reveal'); ob.unobserve(en.target); } });
			}, { threshold: 0.25 });
			items.forEach(i => obs.observe(i));
		}
		const slider = document.querySelector('.testimonials-slider');
		if (slider) {
			let idx = 0;
			const blocks = Array.from(slider.children);
			blocks.forEach((b,i) => b.style.display = i === 0 ? 'block' : 'none');
			setInterval(() => {
				blocks[idx].style.display = 'none';
				idx = (idx + 1) % blocks.length;
				blocks[idx].style.display = 'block';
			}, 5000);
		}
		document.querySelectorAll('.badge').forEach(b => {
			b.addEventListener('mouseover', () => b.style.transform = 'translateY(-4px)');
			b.addEventListener('mouseout', () => b.style.transform = '');
		});
		const search = document.getElementById('site-search');
		if (search) {
			search.addEventListener('input', (e) => {
				const q = e.target.value.trim().toLowerCase();
				document.querySelectorAll('section').forEach(s => {
					const text = s.textContent.toLowerCase();
					s.style.display = q && !text.includes(q) ? 'none' : '';
				});
			});
		}
	})();

// ========================= EASTER EGG (simple key combo) =========================
	(function easterEgg() {
		const combo = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
		let buffer = [];
		document.addEventListener('keydown', (e) => {
			buffer.push(e.key);
			if (buffer.join(',').includes(combo.join(','))) {
				alert('easter egg unlocked — nice!'); buffer = [];
			}
			if (buffer.length > combo.length) buffer.shift();
		});
	})();
});
