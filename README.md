<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/investsync-cuhksz/.github/main/assets/investsync-logo-dark.png">
    <img src="https://raw.githubusercontent.com/investsync-cuhksz/.github/main/assets/investsync-logo.png" alt="InvestSync" height="56">
  </picture>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/investsync-cuhksz/.github/main/assets/cuhksz-logo-dark.png">
    <img src="https://raw.githubusercontent.com/investsync-cuhksz/.github/main/assets/cuhksz-logo.png" alt="The Chinese University of Hong Kong, Shenzhen" height="56">
  </picture>
</p>

# Websites

**Project #2 · InvestSync Technology**

A new club website: a public side for visitors and a members-only side for running the club. It replaces the current Flutter site with one app, so the club can update its content without needing a developer.

## Team

- Jason Sukiman
- Celine Clarissa ([@celineclarissa](https://github.com/celineclarissa))
- Karel Hutajulu ([@karelhutajulu](https://github.com/karelhutajulu)), CTO

## Core features

**Public side**
- Home page: introduction, latest articles, next event, join and social links
- Team page: members by department with photo, role and LinkedIn
- Join page: recruitment info, open roles and deadline
- Research: article list with category filter and search, plus a page per article
- Slides archive: past lecture and meeting slides, public or members-only
- Company pages: every article about a company in one place
- Events (optional)

**Members-only side**
- Login with three roles: member, committee, admin
- Content management for articles, team, events, slides and the join page
- Pitch submission with deck and model uploads, and a committee status (submitted, buy, pass)
- Attendance check-in by QR code or link, exportable to CSV

**Requirements:** keeps the current site's fonts and colours, works on phones from 360 px wide, all content comes from the database, and it loads reliably from mainland China.

## Deliverable

The new site is live and loads from campus, all public pages work with real content, admins can update every page from the members-only side, and the old Flutter site points to the new one.

## Getting started

Next.js (App Router) + Tailwind CSS, JavaScript. Full plan and open decisions: [`docs/InvestSync Website.pdf`](docs/InvestSync%20Website.pdf).

```bash
npm install
npm run dev   # http://localhost:3000
```

From mainland China, if `npm install` fails to connect, use the mirror:

```bash
npm config set registry https://registry.npmmirror.com
```

_Hosting setup: to be decided after the China test (phase 4)._

## Working together

- Never push to `main`. Make a branch (e.g. `feature/navbar`), push it, and open a Pull Request.
- Pull `main` before starting new work.

## References

- [Current InvestSync site](https://super-madeleine-ee052e.netlify.app/) and [old code](https://github.com/karelhutajulu/investsync-web-flutter-24)
- [NUS Investment Society research](https://nusinvest.com/research-publications/)
- [Bocconi Students Investment Club](https://bsic.it/)
- [Next.js docs](https://nextjs.org/docs) · [Tailwind CSS docs](https://tailwindcss.com/docs)

