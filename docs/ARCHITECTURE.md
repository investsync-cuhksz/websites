# How the InvestSync website works

This page explains how the code is put together. For **what** we're building and **why** (scope, site map, data, phases and open decisions), see the proposal: [`InvestSync Website.pdf`](InvestSync%20Website.pdf).

> **Status:** phase 1 (setup) and the demo admin login are built. Everything marked *(planned)* comes from the proposal and isn't written yet. Update this file whenever a new part lands.

---

## 1. Overview

One Next.js app serves everyone. **Viewers** (no login) and **admins** (logged in) use the **same pages at the same URLs**. When an admin is logged in, those pages also show Edit and + Add buttons. There's no separate admin site.

```
                 ┌───────────────────────────────┐
  Viewers ──────▶│                               │  read only
                 │   Next.js app (one project)   │
  Admins  ──────▶│   same pages, same URLs        │  read + write
                 └──────────────┬────────────────┘
                                │  pages never touch storage directly
                 ┌──────────────▼────────────────┐
                 │  src/lib/  (auth.js, storage)  │  ← the only place that knows
                 └──────────────┬────────────────┘     where data lives
                                │
            Demo (now): browser localStorage
            Later:      database + file storage (phase 4)
```

The key idea: pages only call functions in `src/lib/`. In the demo those functions use localStorage. Later we rewrite only those files to talk to a real database, and no page has to change.

**Stack:** Next.js (App Router), React, Tailwind CSS, JavaScript.

---

## 2. Folder structure

```
web/
  docs/                    proposal PDF + this file
  public/                  static files (images, logo)
  src/
    app/                   ROUTES: every folder with a page.js is a URL
      layout.js            wraps every page: AuthProvider + Navbar
      page.js              /         Home (placeholder)
      globals.css          Tailwind import; club colours/fonts go here later
      login/page.js        /login    admin login form
    components/            reusable pieces (not pages)
      AuthProvider.jsx     shares "who is logged in" with the whole app
      Navbar.jsx           top bar, shows login state
    lib/                   logic and data access, no UI
      auth.js              demo login: checks the account, reads/writes localStorage
```

Rules of thumb:
- **`app/`** holds only routes. `app/team/page.js` becomes `/team`, and `app/research/[slug]/page.js` becomes `/research/anything`.
- **`components/`** holds UI used in more than one place.
- **`lib/`** holds logic with no UI. This is the only code allowed to touch localStorage (later, the database).

---

## 3. How login works (built)

### The four pieces

| File | Job | Knows about |
|---|---|---|
| `src/lib/auth.js` | Checks email + password against the hardcoded demo admin. Saves, reads and removes the logged-in user in localStorage. | localStorage. No React. |
| `src/components/AuthProvider.jsx` | Holds the current `user` in React state and shares it, plus `login`/`logout`, with every component through Context. | React state |
| `src/app/login/page.js` | The form. Calls `login()` from `useAuth()`. Shows an error, or redirects to Home. | The form only |
| `src/components/Navbar.jsx` | Reads `user` from `useAuth()`. Shows "Admin Login" or the admin's name + Logout. | Display only |

`layout.js` wraps every page like this, so every page and the Navbar can call `useAuth()`:

```jsx
<AuthProvider>
  <Navbar />
  {children}      {/* the current page */}
</AuthProvider>
```

### What happens when an admin logs in

```
login/page.js          AuthProvider               lib/auth.js            localStorage
─────────────          ────────────               ───────────            ────────────
submit form ──login()──▶ handleLogin ──login()────▶ check email/password
                                                    match? ──setItem────▶ investsync_user = {name, email, role}
                         ◀───────────── user ──────
                         setUser(user)
                           │
                           └─▶ every component using useAuth() re-renders
                               → Navbar now shows "Demo Admin  Logout"
◀──────── user ──────────
router.push("/")
```

Logout is the same in reverse: `auth.js` removes the key, then `setUser(null)`, and the Navbar switches back to "Admin Login".

### Staying logged in after a refresh

On page load, `AuthProvider` starts with `user = null`, then a `useEffect` (runs once, browser only) calls `getCurrentUser()` and restores the user from localStorage.

**Why `useEffect` and not `useState(getCurrentUser())`:** Next.js renders each page on the server first, and the server has no localStorage. Code inside `useEffect` only runs in the browser, after the page appears, so it's the safe place to read it. Reading it during render would crash on the server or cause a "hydration mismatch" error.

### What's stored

One key per browser, only while logged in. The password is never stored.

| Key | Value |
|---|---|
| `investsync_user` | `{"name":"Demo Admin","email":"admin@investsync.test","role":"admin"}` |

You can see it in DevTools (F12) → Application → Local Storage → `http://localhost:3000`.

---

## 4. Admin vs viewer on the same page *(planned)*

Pages show admin-only controls with the same `useAuth()` check the Navbar uses:

```jsx
const { user } = useAuth()
...
{user && <button>+ Add</button>}   // viewers never see it
```

- **Most content** (slides, events, team, companies, Join page) is edited in a **popup** on the normal page, so there are no extra URLs.
- **Articles** need a full-page editor, so they get admin-only routes: `/research/new` and `/research/[slug]/edit`. In the demo those pages check `useAuth()` and send non-admins to `/login`. In the real version a `proxy.js` file (Next.js's newer name for middleware) checks the login cookie before the page loads.

Hiding a button is not security. In the real version every save is also checked on the server.

---

## 5. How content data will work *(planned)*

`src/lib/storage.js` will hold small functions such as `getArticles()`, `saveArticle()` and `deleteArticle()`, one set per content type (articles, members, events, slides, companies, Join info).

- **Demo:** each content type lives under its own localStorage key (`investsync_articles`, `investsync_members`, ...). On first visit it's filled with dummy data from a JSON file.
- **Real version (phase 4):** the same functions call the database instead. Pages don't change.

Logout must only remove `investsync_user`, never `localStorage.clear()`, which would wipe all demo content.

---

## 6. Demo limitations (by design)

| Limitation | Why | Fixed in |
|---|---|---|
| Login isn't secure: the account is hardcoded and anyone can edit localStorage | Only there to build and show the flows | Phase 4: real auth with sessions and cookies |
| Edits only exist in the browser that made them; others never see them | localStorage is per browser | Phase 4: shared database |
| About 5 MB of storage total | localStorage limit | Phase 4: file storage for images and slides |
| A viewer sees new content only after refreshing | Normal for most sites | Not planned (live updates aren't needed) |
| Two admins editing the same item: last save wins | Simple and fine for a small club | Revisit if it becomes a problem |

---

## 7. Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

From mainland China, if `npm install` can't connect:

```bash
npm config set registry https://registry.npmmirror.com
```

**Demo admin login** (demo only, never reuse a real password here): `admin@investsync.test` / `77778888` at `/login`.
