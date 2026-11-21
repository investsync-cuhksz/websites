// Demo-only login. NOT secure: the account is hardcoded and the logged-in
// user lives in localStorage. Later this whole file gets replaced by real auth,
// and nothing else in the app should touch localStorage for login.

const STORAGE_KEY = "investsync_user";

const admin = {
  name: "Demo Admin",
  email: "admin@investsync.test",
  password: "77778888",
  role: "admin",
};

// Returns the logged-in user, or null if the email/password are wrong.
export function login(email, password) {
  const emailMatches = email.trim() === admin.email;
  const passwordMatches = password === admin.password;

  if (!emailMatches || !passwordMatches) {
    return null;
  }

  // Save everything except the password.
  const user = { name: admin.name, email: admin.email, role: admin.role };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

// Returns the saved user, or null if nobody is logged in.
export function getCurrentUser() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    // Saved value is broken (e.g. edited by hand in DevTools): treat as logged out.
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
