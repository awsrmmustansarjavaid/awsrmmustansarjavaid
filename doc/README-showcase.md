# DevOps Showcase — How This Site Works

This document explains the site you just added to your repository. It does
**not** touch or replace your existing `README.md` — that stays exactly as
it is on your GitHub profile. This showcase is a separate, self-contained
static site living alongside it in the same repository.

## 1. The core idea

> Your Markdown files are the content. The HTML/CSS/JS is just the display.

You never edit `index.html`, `css/style.css`, or the `js/` files to add a
new project, lab, learning topic, or journal entry. You add a `.md` file
under `activity/`, push it, and the live site picks it up automatically —
no build step, no GitHub Actions, no backend, no database.

```
activity/*.md  →  GitHub REST API  →  JavaScript (in the visitor's browser)
                                            │
                                            ▼
                                    Parsed + rendered
                                            │
                                            ▼
                                   Cards on your page
```

## 2. Folder structure

```
your-repo/
├── README.md                 ← your existing profile README — untouched
├── README-showcase.md        ← this file
├── index.html                ← the showcase page
├── css/
│   └── style.css
├── js/
│   ├── config.js             ← EDIT THIS: your username, links, cache time
│   ├── github-api.js         ← talks to the GitHub API, with caching
│   ├── markdown-parser.js    ← splits front matter from Markdown body
│   ├── content-loader.js     ← loads + sorts each content category
│   ├── render.js             ← builds the HTML cards you see on the page
│   └── app.js                ← wires everything together on page load
├── assets/
│   └── images/
│       └── avatar.jpg        ← your photo, shown in the About section
└── activity/
    ├── TEMPLATE.md           ← copy this when adding new content
    ├── about.md               ← your name, bio, location, LinkedIn/GitHub/email links
    ├── experience.md          ← your LinkedIn URL + job history
    ├── projects/              ← full end-to-end projects
    │   └── *.md
    ├── labs/                  ← smaller, focused hands-on exercises
    │   └── *.md
    ├── learning/              ← what you're currently studying (has a progress bar)
    │   └── *.md
    └── journal/                ← a dated, chronological activity log
        └── *.md
```

## 3. One-time setup

1. Copy the contents of this folder into your `awsrmmustansarjavaid/awsrmmustansarjavaid`
   repository, at the root level (alongside your existing `README.md`).
2. Open `js/config.js` and confirm/update:
   - `githubUsername` and `githubRepo`
   - `branch` (usually `main`)
   - `links.linkedin` and `links.email`
3. Replace `assets/images/avatar.jpg` with your own photo (same filename,
   or update the `src` in `index.html`'s About section).
4. In `index.html`, replace the placeholder name ("Mustansar Javaid"),
   the About Me bio text, and the three placeholder Experience cards
   with your real roles (there's no automated LinkedIn import — see §7).
5. Make sure the repository is **public** — the GitHub API calls this
   site makes are unauthenticated and only work on public repos.
6. In your repo's Settings → Pages, set the source to your default branch,
   root folder. Your site will be live at:
   `https://awsrmmustansarjavaid.github.io/awsrmmustansarjavaid/`

## 4. Adding new content (your day-to-day workflow)

Say you finish a new lab tomorrow:

1. Copy `activity/TEMPLATE.md` to `activity/labs/my-new-lab.md`.
2. Fill in the front matter (title, status, date, repository link,
   technologies, one-line description).
3. Write a short Markdown body underneath (Overview / What I Practiced /
   What I Learned — or whatever sections you like).
4. Commit and push.
5. Reload your live site. The new lab appears in the Hands-on Labs
   section automatically — no HTML or JS edits required.

The same pattern applies to `projects/`, `learning/`, and `journal/`.

## 5. The front matter schema

Every content file starts with a `---`-delimited block:

```yaml
---
title: Your Title Here
type: project            # project | lab | learning | journal
status: in-progress       # completed | in-progress | learning | planned | paused | archived
date: 2026-01-01          # YYYY-MM-DD — controls sort order (newest first)
featured: false
repository: https://github.com/your-username/your-repo
description: One sentence shown on the card.
technologies:
  - Tech One
  - Tech Two
progress: 50               # learning/*.md only — 0 to 100, shows a progress bar
---
```

The parser in `js/markdown-parser.js` only supports this simple subset of
YAML (strings, booleans, and `- item` lists) — enough for this schema,
without needing a full YAML library.

## 6. Why "Latest Activity" is separate from "Learning"

- **`learning/`** — one file per *technology or topic* (e.g. `kubernetes.md`),
  updated in place as your progress on that topic changes. Shows a
  progress bar.
- **`journal/`** — one file per *dated entry* (e.g. `2026-09-27-kubernetes.md`),
  never edited after the fact. This is your chronological log of what you
  actually did on a given day, and powers the "Latest Activity" feed.

Think of `learning/` as "state" and `journal/` as "history."

## 7. Your LinkedIn info: about.md and experience.md

LinkedIn doesn't offer a public, key-free way for a static site to pull
your profile automatically, and reliably scraping LinkedIn isn't something
this site attempts (see LinkedIn's Terms of Service). Instead, your
LinkedIn info lives in two Markdown files you fill in **once** and keep
up to date by hand — everywhere on the page that shows your name, bio,
or LinkedIn link reads from these files:

**`activity/about.md`** — front matter only, no YAML lists of objects:

```yaml
---
name: Your Name
title: Your Tagline (shown under your name)
location: Your City, Country
email: you@example.com
linkedin: https://www.linkedin.com/in/your-handle/
github: https://github.com/your-username
focus: Cloud | DevOps | Automation
avatar: assets/images/avatar.jpg
quote: A short line shown as a pull-quote
technologies:
  - DevOps
  - AWS
---
Your bio paragraph goes here as the Markdown body — this becomes the
text shown in the About Me card.
```

**`activity/experience.md`** — your LinkedIn URL plus one `## Role — Company`
heading per job, a bold date line, and bullet points:

```markdown
---
linkedin: https://www.linkedin.com/in/your-handle/
---

## DevOps Engineer — Your Company
**Jan 2022 — Present**

- Achievement one
- Achievement two
```

This format (plain headings instead of nested YAML) is what
`js/markdown-parser.js`'s `parseExperience()` function expects — see that
file's comments for exactly how each line is interpreted. Add as many
`## Role — Company` blocks as you have jobs; the "View Full LinkedIn
Profile" button is added automatically after your listed jobs, using the
`linkedin:` URL from the front matter.

If either file is missing or fails to load, the page quietly falls back
to the placeholder text already written in `index.html` — it never shows
a blank section.

## 8. GitHub API rate limits & caching

Unauthenticated requests to the GitHub API are limited to 60 requests per
hour, per visitor IP. To stay well under that:

- `js/github-api.js` caches every directory listing and file fetch in the
  visitor's browser (`localStorage`) for `CONFIG.cacheDurationMinutes`
  (15 minutes by default).
- This means a new file you push can take up to 15 minutes to appear for
  a given visitor, or instantly if they clear their cache / it's their
  first visit. You can lower `cacheDurationMinutes` in `config.js` if you
  want fresher content at the cost of more API calls.

## 9. Extending this later

The architecture is intentionally modular so you can add, without
restructuring anything:

- **Search** — a text input that filters the already-loaded content
  objects in `content-loader.js`'s return value.
- **Filters** — buttons that show/hide cards by `technologies` or `status`.
- **A timeline view** — group `journal/` entries by month/year.
- **An "experiments" category** — copy the pattern used for `labs/`:
  add a folder, a `CONFIG.categories.experiments` entry, a
  `loadCategory()` call, a render function, and a grid container in
  `index.html`.

Each of these fits into the existing `config → github-api → content-loader
→ render → app` pipeline without changing how any of the other pieces work.


## 10. Detail pages ("View all →")

Each home-page section previews the newest `CONFIG.homePreviewCount` (3) items and links to a full page in `pages/`:
`experience`, `learning`, `projects`, `labs`, `activities`, `challenges`.

- Every page = `pages/<name>.html` + `css/<name>.css` + `js/<name>.js`. Shared parts: `css/pages.css`, `css/background.css`, `js/layout.js` (navbar/footer) and `js/listing.js` (search, status/technology filters, sort, "Load more").
- Data: the same `activity/<folder>/*.md` files — add a file and it appears on both the home preview and the full page. The new `activity/challenges/` folder powers the DevOps Challenges page.
- To add another page: copy one `pages/*.html` plus its css/js pair, then add it to `PAGES` in `js/layout.js`.
