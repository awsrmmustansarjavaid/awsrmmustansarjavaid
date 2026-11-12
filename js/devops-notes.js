/**
 * DevOps Notes controller
 * Shared by both pages:
 *  - pages/devops-notes.html (data-page="index")  -> one card per Markdown note
 *  - pages/devops-note.html  (data-page="reader") -> one note with a section sidebar
 *
 * The list of notes is read from the GitHub folder, so a new .md file
 * appears as a new card automatically. No code change is needed.
 */

// Strict mode helps catch common coding mistakes and unsafe actions
'use strict';

// ==========================================
// 1. Configuration
// ==========================================
const CONFIG = {
  owner: 'awsrmmustansarjavaid',
  repo: 'awsrmmustansarjavaid',
  branch: 'main',
  notesPath: 'DEVOPS-90-DAYS/devops-notes',
  localBase: '../DEVOPS-90-DAYS/devops-notes/', // relative to pages/ (tried first)
  readerPage: 'devops-note.html',
  cacheMinutes: 10,                             // keeps the GitHub API under its rate limit
  ignoreFiles: ['readme.md']                    // folder files that are not notes
};

const REPO_ROOT = `${CONFIG.owner}/${CONFIG.repo}`;
const API_URL = `https://api.github.com/repos/${REPO_ROOT}/contents/${CONFIG.notesPath}?ref=${CONFIG.branch}`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_ROOT}/${CONFIG.branch}/${CONFIG.notesPath}/`;
const BLOB_BASE = `https://github.com/${REPO_ROOT}/blob/${CONFIG.branch}/${CONFIG.notesPath}/`;
const CACHE_KEY = 'devops-notes:list';

// Keyword -> icon. A note that matches nothing gets the default icon.
const TOPIC_ICONS = [
  [/linux|ubuntu/i, '🐧'], [/ci[-/ ]?cd|jenkins/i, '🔄'], [/docker/i, '🐳'],
  [/kubern/i, '☸️'], [/yaml|json|serializ/i, '📄'], [/terraform|iac|cloudformation|aws/i, '☁️'],
  [/shell|bash|script/i, '⌨️'], [/prometheus|grafana/i, '📊'], [/sonar/i, '🔍'],
  [/roadmap|charlie/i, '🗺️']
];

// ==========================================
// 2. Small helpers
// ==========================================
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

/** Escapes text before it is placed inside an HTML template. */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** Removes Markdown syntax from a short piece of text. */
function plainText(text) {
  return text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_~\\]/g, '').trim();
}

/** "02-DevOps-Linux.md" -> "02" */
const numberOf = (file) => (file.match(/^(\d+)[-_ ]/) || [])[1] || '';

/** "02-DevOps-Linux.md" -> "DevOps Linux" (used until the real title is loaded) */
const titleOf = (file) => file.replace(/\.md$/i, '').replace(/^\d+[-_ ]/, '').replace(/[-_]+/g, ' ');

const iconOf = (text) => (TOPIC_ICONS.find(([pattern]) => pattern.test(text)) || [null, '📘'])[1];
const readerUrl = (file) => `${CONFIG.readerPage}?note=${encodeURIComponent(file)}`;

// ==========================================
// 3. Data loading
// ==========================================

/**
 * Returns the sorted list of .md file names in the notes folder.
 * Uses a short-lived cache and falls back to stale data if GitHub is unreachable.
 */
async function listNotes() {
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (_) { /* storage is optional */ }

  if (cached && Date.now() - cached.time < CONFIG.cacheMinutes * 60000) return cached.files;

  try {
    const response = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

    const files = (await response.json())
      .filter((item) => item.type === 'file' && /\.md$/i.test(item.name))
      .filter((item) => !CONFIG.ignoreFiles.includes(item.name.toLowerCase()))
      .map((item) => item.name)
      .sort(collator.compare);

    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), files })); } catch (_) { /* ignore */ }
    return files;
  } catch (error) {
    if (cached) return cached.files;
    throw error;
  }
}

/** Loads one note: from the site's own folder first, then from raw.githubusercontent.com. */
async function fetchMarkdown(file) {
  for (const base of [CONFIG.localBase, RAW_BASE]) {
    try {
      const response = await fetch(base + encodeURIComponent(file));
      if (response.ok) return { text: await response.text(), base: new URL(base, location.href).href };
    } catch (_) { /* try the next source */ }
  }
  throw new Error(`Unable to load ${file}`);
}

/** Reads title, summary, section count and reading time from raw Markdown. */
function analyze(markdown) {
  const levels = [];
  let title = '';
  let excerpt = '';
  let fenced = false;

  markdown.split(/\r?\n/).forEach((raw) => {
    const line = raw.trim();
    if (/^(```|~~~)/.test(line)) { fenced = !fenced; return; }
    if (fenced) return;

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      levels.push(heading[1].length);
      if (heading[1].length === 1 && !title) title = plainText(heading[2]);
    } else if (!excerpt && line && !/^(>|\||[*+-]\s|\d+\.\s|!|<)/.test(line)) {
      excerpt = plainText(line).slice(0, 160);
    }
  });

  // One H1 = the note title, so sections are H2. Several H1s = sections are H1.
  const sectionLevel = levels.filter((l) => l === 1).length > 1 ? 1 : 2;
  return {
    title,
    excerpt,
    sections: levels.filter((l) => l === sectionLevel).length,
    minutes: Math.max(1, Math.round(markdown.split(/\s+/).length / 200))
  };
}

/** Runs worker(item) for every item with at most `limit` requests at once. */
async function runPool(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await worker(queue.shift());
  });
  await Promise.all(runners);
}

// ==========================================
// 4. Notes index page (one card per note)
// ==========================================
function cardTemplate(file) {
  const number = numberOf(file);
  return `
    <article class="dn-card" data-file="${escapeHtml(file)}">
      <div class="dn-card-top">
        <span class="dn-icon" aria-hidden="true">${iconOf(file)}</span>
        <span class="dn-number">${number ? `NOTE #${escapeHtml(number)}` : 'NOTE'}</span>
      </div>
      <h2 class="dn-card-title">${escapeHtml(titleOf(file))}</h2>
      <p class="dn-card-text">Loading summary…</p>
      <p class="dn-card-meta"></p>
      <div class="dn-card-actions">
        <a class="dn-btn dn-btn-primary" href="${readerUrl(file)}">Read note →</a>
        <a class="dn-btn" href="${BLOB_BASE}${encodeURIComponent(file)}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </article>`;
}

/** Fills one card with the details found inside its Markdown file. */
function fillCard(card, info) {
  if (info.title) card.querySelector('.dn-card-title').textContent = info.title;
  card.querySelector('.dn-icon').textContent = iconOf(`${info.title} ${card.dataset.file}`);
  card.querySelector('.dn-card-text').textContent = info.excerpt || 'Open the note to read it.';
  card.querySelector('.dn-card-meta').textContent = `${info.sections} sections · ${info.minutes} min read`;
}

async function initIndex() {
  const grid = document.getElementById('notes-grid');

  try {
    const files = await listNotes();
    if (!files.length) { grid.innerHTML = '<p class="dn-state">No notes found in the folder yet.</p>'; return; }

    // Cards appear immediately; details are added as each file loads.
    grid.innerHTML = files.map(cardTemplate).join('');

    await runPool(files, 4, async (file) => {
      const card = grid.querySelector(`[data-file="${CSS.escape(file)}"]`);
      try {
        fillCard(card, analyze((await fetchMarkdown(file)).text));
      } catch (_) {
        card.querySelector('.dn-card-text').textContent = 'Summary unavailable.';
      }
    });
  } catch (error) {
    console.error('Unable to list notes:', error);
    grid.innerHTML = `<p class="dn-state">Could not load the notes list (${escapeHtml(error.message)}).
      <a href="https://github.com/${REPO_ROOT}/tree/${CONFIG.branch}/${CONFIG.notesPath}" target="_blank" rel="noopener noreferrer">Open the folder on GitHub</a></p>`;
  }
}

// ==========================================
// 5. Note reader page (content + section sidebar)
// ==========================================

/** Makes a unique, URL-safe id from heading text. */
function slugify(text, used) {
  const base = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';
  let slug = base;
  for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
  used.add(slug);
  return slug;
}

/** Points relative links and images to the right place. */
function fixLinks(root, base) {
  root.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) return;

    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {          // external link
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else if (/\.md(#.*)?$/i.test(href)) {           // link to another note
      link.href = readerUrl(decodeURIComponent(href.split('#')[0].split('/').pop()));
    } else {
      link.href = new URL(href, RAW_BASE).href;
    }
  });
  root.querySelectorAll('img[src]').forEach((img) => {
    if (!/^(https?:|data:)/i.test(img.getAttribute('src'))) img.src = new URL(img.getAttribute('src'), base).href;
  });
}

/** Adds heading ids, builds the sidebar and highlights the section being read. */
function buildSidebar(content) {
  const headings = [...content.querySelectorAll('h1, h2, h3, h4')];
  const used = new Set();
  headings.forEach((heading) => { heading.id = slugify(heading.textContent, used); });

  const sectionLevel = headings.filter((h) => h.tagName === 'H1').length > 1 ? 1 : 2;
  const entries = headings.filter((h) => {
    const level = Number(h.tagName[1]);
    return level === sectionLevel || level === sectionLevel + 1;
  });

  const list = document.getElementById('toc-list');
  list.innerHTML = entries.map((h) => `
    <a class="dn-toc-link${Number(h.tagName[1]) > sectionLevel ? ' is-sub' : ''}" href="#${h.id}">${escapeHtml(h.textContent)}</a>`
  ).join('') || '<p class="dn-state">No sections in this note.</p>';

  // Highlight the sidebar link of the heading that is currently near the top
  const observer = new IntersectionObserver((items) => {
    items.filter((item) => item.isIntersecting).forEach((item) => {
      list.querySelectorAll('.dn-toc-link').forEach((link) => {
        const active = link.getAttribute('href') === `#${item.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.scrollIntoView({ block: 'nearest' });
      });
    });
  }, { rootMargin: '0px 0px -75% 0px' });
  entries.forEach((heading) => observer.observe(heading));

  // Small screens: the sidebar is a drawer that closes after a section is chosen
  const toggle = document.getElementById('toc-toggle');
  const setOpen = (open) => {
    document.body.classList.toggle('toc-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('toc-open')));
  list.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
}

async function initReader() {
  const content = document.getElementById('note-content');
  const file = new URLSearchParams(location.search).get('note') || '';

  // Only plain .md file names are accepted (no folders, no other URLs)
  if (!/^[^/\\]+\.md$/i.test(file)) {
    content.innerHTML = '<p class="dn-state">Note not found. <a href="devops-notes.html">Back to all notes</a></p>';
    return;
  }

  document.getElementById('source-link').href = BLOB_BASE + encodeURIComponent(file);

  try {
    if (!window.marked || !window.DOMPurify) throw new Error('Markdown libraries failed to load');

    const { text, base } = await fetchMarkdown(file);
    content.innerHTML = window.DOMPurify.sanitize(window.marked.parse(text));
    document.title = `${analyze(text).title || titleOf(file)} | DevOps Notes`;

    fixLinks(content, base);
    buildSidebar(content);

    // Jump to the section named in the URL (e.g. ...?note=x.md#docker-basics)
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  } catch (error) {
    console.error('Unable to load note:', error);
    content.innerHTML = `<p class="dn-state">Could not load this note (${escapeHtml(error.message)}).
      <a href="${BLOB_BASE}${encodeURIComponent(file)}" target="_blank" rel="noopener noreferrer">Open it on GitHub</a></p>`;
  }
}

// ==========================================
// 6. Start the page that is open
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'index') initIndex();
  else if (page === 'reader') initReader();
});
