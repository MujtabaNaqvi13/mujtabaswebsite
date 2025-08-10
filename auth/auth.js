// Local-only username/password authentication (frontend demo only)
// WARNING: This is NOT secure for real users. All data is stored in the browser and can be accessed or tampered with. Use a backend for production.
async function signup() {
  console.warn('WARNING: Frontend-only authentication is not secure. Do not use for real users.');
  let users = JSON.parse(localStorage.getItem("users")) || {};
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const uname = username.toLowerCase();
  if (users[uname]) {
    alert("Username already exists");
    return;
  }
  const hash = await hashPassword(password);
  users[uname] = {
    hash,
    profile: {
      displayName: username,
      bio: "",
      profilePic: "",
      themeColor: "#000000"
    }
  };
  localStorage.setItem("users", JSON.stringify(users));
  setSession(uname);
  alert("Account created successfully!");
  window.location.href = "profile.html";



// --- Login ---
// Verifies username and password
async function login() {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const uname = username.toLowerCase();
  const user = users[uname];
  if (!user) {
    alert("User not found");
    return;
  }
  const hash = await hashPassword(password);
  if (hash !== user.hash) {
    alert("Incorrect password");
    return;
  }
  setSession(uname);
  alert("Login successful!");
  window.location.href = "profile.html";
}

// --- Logout ---
function logout() {
  sessionStorage.removeItem('currentUser');
}

// --- Get Current User ---
function getCurrentUser() {
  const uname = sessionStorage.getItem("currentUser");
  if (!uname) return null;
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[uname] && users[uname].profile && users[uname].profile.displayName) {
      return users[uname].profile.displayName;
  }
  return uname;
}

// --- Show Username in Navbar ---
function showUsernameInNavbar() {
  const user = getCurrentUser();
  const spot = document.getElementById('username-spot');
  if (spot) {
    if (user) {
      spot.textContent = user;
      spot.style.display = '';
    } else {
      spot.textContent = '';
      spot.style.display = 'none';
    }
  }
}

// --- Security Note ---
}
