// Auth utility functions and UI logic for all auth pages
// See security note at end of file

const THEME_KEY = 'theme';
const USER_KEY = 'users';
const SESSION_KEY = 'currentUser';
const GUEST_KEY = 'guestProfile';

// --- Theme Loader ---
(function loadTheme() {
  const theme = localStorage.getItem(THEME_KEY);
  if (theme) document.documentElement.setAttribute('data-theme', theme);
})();

// --- Utility: ReturnTo redirect ---
function getReturnTo() {
  const url = new URL(window.location.href);
  const ret = url.searchParams.get('returnTo');
  if (!ret) return null;
  try {
    const retUrl = new URL(ret, window.location.origin);
    if (retUrl.origin === window.location.origin) return retUrl.href;
  } catch {}
  return null;
}
function redirectToReturnTo() {
  const ret = getReturnTo();
  window.location.href = ret || '/';
}

// --- Auth Logic ---
const auth = {
  // JSON schema for stored objects
  // users: { [email]: { email, passwordHash, salt, favorites, progress, created, ... } }
  // guestProfile: { id, created, expires, favorites, progress }
  // currentUser: { email, guest, expires, ... }

  async hashPassword(password, salt) {
    // PBKDF2 with SHA-256, 100k iterations
    const enc = new TextEncoder();
    salt = salt || crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey('raw', enc.encode(password), {name:'PBKDF2'}, false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({name:'PBKDF2', salt, iterations:100000, hash:'SHA-256'}, key, 256);
    return { hash: Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,'0')).join(''), salt: Array.from(salt).map(b=>b.toString(16).padStart(2,'0')).join('') };
  },
  async loginLocal(email, password) {
    const users = JSON.parse(localStorage.getItem(USER_KEY)||'{}');
    const user = users[email];
    if (!user) throw new Error('No user found');
    const salt = new Uint8Array(user.salt.match(/.{1,2}/g).map(x=>parseInt(x,16)));
    const { hash } = await this.hashPassword(password, salt);
    if (hash !== user.passwordHash) throw new Error('Incorrect password');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, guest: false, expires: Date.now()+1000*60*60*24 }));
    return true;
  },
  async signup(email, password) {
    const users = JSON.parse(localStorage.getItem(USER_KEY)||'{}');
    if (users[email]) throw new Error('User already exists');
    const { hash, salt } = await this.hashPassword(password);
    users[email] = { email, passwordHash: hash, salt, favorites: [], progress: {}, created: Date.now() };
    localStorage.setItem(USER_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, guest: false, expires: Date.now()+1000*60*60*24 }));
    return true;
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
  },
  createGuest() {
    const id = 'guest-' + Math.random().toString(36).slice(2) + Date.now();
    const expires = Date.now() + 1000*60*60*6; // 6 hours
    const guest = { id, created: Date.now(), expires, favorites: [], progress: {} };
    localStorage.setItem(GUEST_KEY, JSON.stringify(guest));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, guest: true, expires }));
    return guest;
  },
  convertGuest(email, password) {
    const guest = JSON.parse(localStorage.getItem(GUEST_KEY)||'null');
    if (!guest) throw new Error('No guest session');
    const users = JSON.parse(localStorage.getItem(USER_KEY)||'{}');
    if (users[email]) throw new Error('User already exists');
    return this.hashPassword(password).then(({hash,salt}) => {
      users[email] = { email, passwordHash: hash, salt, favorites: guest.favorites||[], progress: guest.progress||{}, created: Date.now() };
      localStorage.setItem(USER_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, guest: false, expires: Date.now()+1000*60*60*24 }));
      localStorage.removeItem(GUEST_KEY);
      return true;
    });
  },
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
    } catch { return null; }
  },
  signout() {
    localStorage.removeItem(SESSION_KEY);
  }
};

// --- Page-specific logic ---
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle (if present)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Login page
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const errorDiv = document.getElementById('login-error');
      errorDiv.textContent = '';
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorDiv.textContent = 'Please enter a valid email.';
        return;
      }
      if (!password) {
        errorDiv.textContent = 'Password required.';
        return;
      }
      try {
        await auth.loginLocal(email, password);
        redirectToReturnTo();
      } catch (err) {
        errorDiv.textContent = err.message;
      }
    });
  }

  // Signup page
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const password2 = document.getElementById('signup-password2').value;
      const errorDiv = document.getElementById('signup-error');
      errorDiv.textContent = '';
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorDiv.textContent = 'Please enter a valid email.';
        return;
      }
      if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters.';
        return;
      }
      if (password !== password2) {
        errorDiv.textContent = 'Passwords do not match.';
        return;
      }
      try {
        await auth.signup(email, password);
        redirectToReturnTo();
      } catch (err) {
        errorDiv.textContent = err.message;
      }
    });
  }

  // Guest page
  const guestForm = document.getElementById('guest-form');
  if (guestForm) {
    guestForm.addEventListener('submit', e => {
      e.preventDefault();
      auth.createGuest();
      redirectToReturnTo();
    });
    // Show guest info
    const guestInfo = document.getElementById('guest-info');
    const guest = JSON.parse(localStorage.getItem(GUEST_KEY)||'null');
    if (guest) {
      guestInfo.textContent = `Guest session active. Expires: ${new Date(guest.expires).toLocaleString()}`;
    } else {
      guestInfo.textContent = 'No guest session yet.';
    }
  }

  // Reset page (demo only)
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('reset-email').value.trim();
      const errorDiv = document.getElementById('reset-error');
      errorDiv.textContent = 'Password reset is not available in demo.';
    });
  }

  // Convert guest to account (on signup page, if coming from guest)
  // (Could be implemented as a modal or extra UI)
});

// --- Security Note ---
// A pure HTML/CSS/JS implementation stores data client-side and cannot provide true secure authentication, server-side password hashing, email verification, secure session cookies, CSRF protection, rate limiting, or spam prevention — do not use client-only auth for sensitive production accounts; plan minimal backend endpoints later (POST /api/auth/signup, POST /api/auth/login, POST /api/auth/convert-guest) to harden security.
