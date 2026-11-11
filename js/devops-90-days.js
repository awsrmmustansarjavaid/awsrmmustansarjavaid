/**
 * devops-90-days.js
 * ---------------------------------------------------------------------------
 * Portal behaviour (vanilla JavaScript, no build step).
 *
 * Every page declares what it is through its <body> attributes:
 *   <body data-page="portal|day|doc|articles" data-nav="..." data-doc="...">
 * and this file runs the matching page function on DOMContentLoaded.
 *
 * Sections in this file:
 *   1. Setup and URL helpers
 *   2. Browser storage and progress tracking
 *   3. Small UI helpers (toast, download, theme)
 *   4. Shared header and footer
 *   5. Card builders and article loading
 *   6. Pages: portal, day, document (with tracker dashboard), articles
 *   7. Bootstrap
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  /* ==========================================================================
     1. SETUP AND URL HELPERS
     ========================================================================== */

  var D = window.D90;          // data and configuration (devops-90-days-data.js)
  var C = D.CONFIG;            // editable configuration block
  var MD = window.D90MD;       // Markdown loader and renderer
  var ROOT = D.SITE_ROOT;      // absolute URL of the site root

  /** Shorthand for querySelector / querySelectorAll (the latter returns a real array). */
  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  /** Zero-pad a number to two digits (7 -> "07"). */
  var pad = function (n) { return String(n).padStart(2, '0'); };

  /** Escape text before inserting it into an HTML string. */
  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
  };

  /** Page locations inside the portal. */
  var PORTAL = ROOT + 'pages/90-days-devops.html';
  var SUB = ROOT + 'pages/devops-90-days/';

  /** URL builders and data lookups. */
  var dayUrl = function (n) { return SUB + 'day.html?day=' + n; };
  var docBy = function (key) { return D.DOCS.find(function (d) { return d.key === key; }); };
  var docUrl = function (key) { return SUB + docBy(key).page; };
  var dayBy = function (n) { return D.DAYS[n - 1]; };
  var phaseOf = function (n) {
    return D.PHASES.find(function (p) { return n >= p.from && n <= p.to; });
  };

  /** Only http(s) URLs that are not "YOUR-..." placeholders are treated as real links. */
  var safeUrl = function (url) {
    return /^https?:\/\//i.test(url || '') && url.indexOf('YOUR-') === -1;
  };

  /* ==========================================================================
     2. BROWSER STORAGE AND PROGRESS TRACKING
     ========================================================================== */

  /**
   * Thin wrapper around localStorage. Every call is guarded because storage can
   * be blocked (private mode, strict browser settings). All keys use the "d90:" prefix.
   */
  var Store = {
    ok: true, // flips to false the first time a write fails

    get: function (key, fallback) {
      try {
        var value = localStorage.getItem('d90:' + key);
        return value === null ? fallback : JSON.parse(value);
      } catch (e) {
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        localStorage.setItem('d90:' + key, JSON.stringify(value));
        return true;
      } catch (e) {
        Store.ok = false;
        return false;
      }
    },

    del: function (key) {
      try { localStorage.removeItem('d90:' + key); } catch (e) { /* ignore */ }
    }
  };

  /** Learner progress: completed days, bookmarks and per-day checklist state. */
  var Progress = {
    /** Sorted list of completed day numbers. */
    done: function () {
      var list = Store.get('done', []);
      return Array.isArray(list) ? list : [];
    },

    isDone: function (n) {
      return Progress.done().indexOf(n) !== -1;
    },

    /** Mark day n complete (value = true) or not complete (value = false). */
    setDone: function (n, value) {
      var list = Progress.done().filter(function (x) { return x !== n; });
      if (value) list.push(n);
      list.sort(function (a, b) { return a - b; });
      Store.set('done', list);
    },

    /** List of bookmarked day numbers. */
    bookmarks: function () {
      var list = Store.get('bookmarks', []);
      return Array.isArray(list) ? list : [];
    },

    isBm: function (n) {
      return Progress.bookmarks().indexOf(n) !== -1;
    },

    /** Add or remove a bookmark. Returns true when the day is now bookmarked. */
    toggleBm: function (n) {
      var list = Progress.bookmarks();
      var index = list.indexOf(n);
      if (index === -1) list.push(n); else list.splice(index, 1);
      Store.set('bookmarks', list);
      return index === -1;
    },

    /** Ticked state (array of 0/1) of the checklist on day n. */
    checks: function (n) {
      var list = Store.get('checks:' + pad(n), []);
      return Array.isArray(list) ? list : [];
    },

    /** Completion summary for one phase: { done, total, pct }. */
    phasePct: function (phase) {
      var done = Progress.done();
      var total = phase.to - phase.from + 1;
      var count = done.filter(function (n) { return n >= phase.from && n <= phase.to; }).length;
      return { done: count, total: total, pct: Math.round(count * 100 / total) };
    }
  };

  /* ==========================================================================
     3. SMALL UI HELPERS
     ========================================================================== */

  /** Show a short message at the bottom of the screen for about two seconds. */
  function toast(message) {
    var el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  /** Offer text as a file download in the browser. */
  function download(filename, text, mimeType) {
    var blob = new Blob([text], { type: mimeType || 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }

  /** Apply and remember the colour theme ("dark" or "light"). */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Store.set('theme', theme);
  }

  // Restore the saved theme immediately to avoid a flash of the wrong theme.
  (function initTheme() {
    var saved = Store.get('theme', null);
    document.documentElement.setAttribute('data-theme', saved || 'dark');
  })();

  /* ==========================================================================
     4. SHARED HEADER AND FOOTER
     ========================================================================== */

  /** Build the site header, footer and the "back to top" button. */
  function buildChrome() {
    var currentNav = document.body.dataset.nav || '';

    // Main navigation: [key, label, url]. The key matches <body data-nav="...">.
    var links = [
      ['home', 'Home', ROOT + C.homePage],
      ['portal', '90 Days', PORTAL],
      ['roadmap', 'Roadmap', docUrl('roadmap')],
      ['tracker', 'Tracker', docUrl('tracker')],
      ['articles', 'Articles', SUB + 'articles.html']
    ];

    // ----- Header -----
    var header = $('#site-header');
    if (header) {
      header.className = 'site-header';

      var navLinks = links.map(function (link) {
        var current = link[0] === currentNav ? ' aria-current="page"' : '';
        return '<a href="' + link[2] + '"' + current + '>' + link[1] + '</a>';
      }).join('');

      var githubHref = 'https://github.com/' + C.owner + '/' + C.repo + '/tree/' + C.branch + '/' + C.contentDir;

      header.innerHTML =
        '<div class="container header-inner">' +
          '<a class="brand" href="' + ROOT + C.homePage + '">' +
            '<span class="brand-badge">MJ</span><span>' + esc(C.siteName) + '</span>' +
          '</a>' +
          '<nav class="nav" id="nav" aria-label="Main navigation">' + navLinks +
            '<a href="' + githubHref + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>' +
          '</nav>' +
          '<button class="icon-btn" id="theme-btn" type="button" aria-label="Toggle dark or light theme" title="Toggle theme">◐</button>' +
          '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button>' +
        '</div>';

      // Theme toggle
      $('#theme-btn').addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
      });

      // Mobile menu toggle
      $('#menu-btn').addEventListener('click', function (event) {
        var isOpen = $('#nav').classList.toggle('open');
        event.currentTarget.setAttribute('aria-expanded', isOpen);
      });
    }

    // ----- Footer -----
    var footer = $('#site-footer');
    if (footer) {
      footer.className = 'site-footer';

      var profiles = C.profiles;
      // Profile links are only shown when they hold a real URL.
      var external = function (url, label) {
        return safeUrl(url)
          ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>'
          : '';
      };

      footer.innerHTML =
        '<div class="container footer-inner">' +
          '<span>© ' + new Date().getFullYear() + ' ' + esc(C.siteName) + ' · 90 Days of DevOps</span>' +
          '<nav aria-label="Footer">' +
            '<a href="' + ROOT + C.homePage + '">← Back to Home</a>' +
            external(profiles.github, 'GitHub') +
            external(profiles.linkedin, 'LinkedIn') +
            external(profiles.medium, 'Medium') +
          '</nav>' +
        '</div>';
    }

    // ----- "Back to top" button (appears after scrolling 600px) -----
    var topButton = document.createElement('button');
    topButton.className = 'btn small to-top';
    topButton.type = 'button';
    topButton.textContent = '↑ Top';
    topButton.setAttribute('aria-label', 'Back to top');
    topButton.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
    document.body.appendChild(topButton);
    window.addEventListener('scroll', function () {
      topButton.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
  }

  /* ==========================================================================
     5. CARD BUILDERS AND ARTICLE LOADING
     ========================================================================== */

  /** HTML for one phase card, linking to the roadmap and showing completion progress. */
  function phaseCard(phase) {
    var progress = Progress.phasePct(phase);

    return '<a class="card phase-card phase-' + phase.id + '" href="' + docUrl('roadmap') + '" style="color:inherit">' +
      '<span class="range">PHASE ' + pad(phase.id) + ' · DAYS ' + pad(phase.from) + '–' + pad(phase.to) + '</span>' +
      '<h3>' + esc(phase.name) + '</h3>' +
      '<p>' + esc(phase.blurb) + '</p>' +
      '<div class="progress" role="progressbar" aria-valuenow="' + progress.pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Phase ' + phase.id + ' progress">' +
        '<i style="width:' + progress.pct + '%"></i>' +
      '</div>' +
      '<span class="muted" style="font-size:.82rem">' + progress.done + ' / ' + progress.total + ' days completed</span>' +
    '</a>';
  }

  var articlesCache = null; // loaded once, then reused

  /** Load the article list from assets/data/devops-articles.json (empty list on any error). */
  async function loadArticles() {
    if (articlesCache) return articlesCache;
    try {
      var response = await fetch(ROOT + 'assets/data/devops-articles.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(response.status);
      var json = await response.json();
      articlesCache = Array.isArray(json) ? json : [];
    } catch (e) {
      articlesCache = [];
    }
    return articlesCache;
  }

  /** HTML for one article card. */
  function articleCard(article) {
    var hasUrl = safeUrl(article.url);

    var relatedChip = article.relatedDay
      ? '<a class="chip" href="' + dayUrl(article.relatedDay) + '">Day ' + pad(article.relatedDay) + '</a>'
      : '';

    var title = hasUrl
      ? '<a href="' + esc(article.url) + '" target="_blank" rel="noopener noreferrer">' + esc(article.title) + '</a>'
      : esc(article.title);

    var sampleBadge = (article.sample || !hasUrl) ? '<span class="chip badge-sample">Sample</span>' : '';

    var tags = (article.tags || []).map(function (tag) {
      return '<span class="chip">' + esc(tag) + '</span>';
    }).join('');

    var footerLink = hasUrl
      ? '<a class="more" href="' + esc(article.url) + '" target="_blank" rel="noopener noreferrer">Read article ↗</a>'
      : '<span class="more muted">Add the real URL in devops-articles.json</span>';

    return '<article class="card">' +
      '<div class="meta-row">' +
        '<span class="chip accent">' + esc(article.platform) + '</span>' + sampleBadge +
        '<span class="chip">' + esc(article.date || '') + '</span>' + relatedChip +
      '</div>' +
      '<h3>' + title + '</h3>' +
      '<p>' + esc(article.summary || '') + '</p>' +
      '<div class="meta-row">' + tags + '</div>' +
      footerLink +
    '</article>';
  }

  /** Show an error box when a Markdown file cannot be loaded. */
  function errorBox(el, what, err) {
    var folderUrl = 'https://github.com/' + C.owner + '/' + C.repo + '/tree/' + C.branch + '/' + C.contentDir;

    el.innerHTML = '<div class="error-box">' +
      '<strong>Could not load ' + esc(what) + '.</strong><br>' + esc((err && err.message) || err) +
      '<br><span class="muted">Check that the file exists in <code>' + esc(C.contentDir) + '/</code> on branch <code>' +
      esc(C.branch) + '</code>, then reload. ' +
      '<a href="' + folderUrl + '" target="_blank" rel="noopener noreferrer">Open the folder on GitHub ↗</a></span>' +
    '</div>';
  }

  /* ==========================================================================
     6. PAGES
     ========================================================================== */

  /* --------------------------------------------------------------------------
     6a. Portal landing page (data-page="portal")
     -------------------------------------------------------------------------- */
  function pagePortal() {
    var completed = Progress.done().length;
    var lastDay = Store.get('last', null);

    // Statistic tiles
    $('#live-stats').innerHTML =
      '<div class="stat"><b>90</b><span>Daily lessons</span></div>' +
      '<div class="stat"><b>3</b><span>Capstone projects</span></div>' +
      '<div class="stat"><b>15+</b><span>Skill areas</span></div>' +
      '<div class="stat"><b>' + completed + ' / 90</b><span>Days you completed*</span></div>';

    // "Resume lesson" card, only when a previously opened day is remembered
    if (lastDay && lastDay >= 1 && lastDay <= 90) {
      var day = dayBy(lastDay);
      $('#continue').innerHTML =
        '<article class="card continue">' +
          '<div><span class="day-no">CONTINUE · DAY ' + pad(day.n) + '</span>' +
          '<h3 style="margin-top:4px">' + esc(day.title) + '</h3></div>' +
          '<a class="btn primary" href="' + dayUrl(day.n) + '">Resume lesson →</a>' +
        '</article>';
    }

    // Four phase cards
    $('#phases').innerHTML = D.PHASES.map(phaseCard).join('');

    // Resource cards: every document except the overview and source mapping,
    // followed by the overview card.
    var resourceDocs = D.DOCS
      .filter(function (doc) { return doc.key !== 'overview' && doc.key !== 'mapping'; })
      .concat(D.DOCS.filter(function (doc) { return doc.key === 'overview'; }));

    $('#resources').innerHTML = resourceDocs.map(function (doc) {
      return '<a class="card" href="' + SUB + doc.page + '" style="color:inherit">' +
        '<span class="card-icon" aria-hidden="true">' + doc.icon + '</span>' +
        '<h3>' + esc(doc.title) + '</h3>' +
        '<p>' + esc(doc.blurb) + '</p>' +
        '<span class="more">Open →</span>' +
      '</a>';
    }).join('');

    // Capstone cards: [label, title, day range, description, first day of the capstone]
    var capstones = [
      ['Capstone 1', 'Secure CI/CD Platform', 'Days 47–49',
        'Lint → test → SAST/SCA → build → image scan → SBOM → sign → deploy → smoke test → approval → automatic rollback.', 47],
      ['Capstone 2', 'Cloud Infrastructure Automation', 'Days 63, 69–70',
        'Terraform modules, remote state, Ansible roles, multi-AZ AWS, DR drill, cost report and security review.', 63],
      ['Capstone 3', 'Production Kubernetes & GitOps Platform', 'Days 87–89',
        'Argo CD app-of-apps, canary rollouts, Kyverno policies, observability, SLOs, game day and Velero backups.', 87]
    ];

    $('#capstones').innerHTML = capstones.map(function (cap) {
      return '<a class="card" href="' + dayUrl(cap[4]) + '" style="color:inherit">' +
        '<span class="chip accent">' + cap[0] + '</span>' +
        '<h3>' + cap[1] + '</h3>' +
        '<p>' + cap[3] + '</p>' +
        '<div class="meta-row"><span class="chip">' + cap[2] + '</span></div>' +
        '<span class="more">Start capstone →</span>' +
      '</a>';
    }).join('');

    // Three most recent articles
    loadArticles().then(function (articles) {
      var container = $('#latest-articles');
      if (!container) return;

      var latest = articles.slice()
        .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); })
        .slice(0, 3);

      container.innerHTML = latest.length
        ? latest.map(articleCard).join('')
        : '<div class="empty">Articles will appear here. Add them to <code>assets/data/devops-articles.json</code>.</div>';
    });
  }

  /* --------------------------------------------------------------------------
     6b. Single lesson page (data-page="day", URL: day.html?day=N)
     -------------------------------------------------------------------------- */
  async function pageDay() {
    var query = new URLSearchParams(location.search).get('day');
    var el = $('#md');
    var n = /^\d{1,2}$/.test(query || '') ? parseInt(query, 10) : NaN;

    // Reject missing or out-of-range day numbers.
    if (!(n >= 1 && n <= 90)) {
      $('#day-title').textContent = 'Day not found';
      el.innerHTML = '<div class="empty">Choose a day from the <a href="' + docUrl('roadmap') + '">Roadmap</a>. Valid days are 1–90.</div>';
      return;
    }

    var day = dayBy(n);
    var phase = phaseOf(n);
    var week = D.WEEKS.find(function (w) { return n >= w.from && n <= w.to; });
    var rel = 'day-' + pad(n) + '/README.md'; // lesson file inside the repository

    document.title = 'Day ' + pad(n) + ' — ' + day.title + ' | 90 Days of DevOps';
    Store.set('last', n); // remembered for the "Resume lesson" card

    // ----- Lesson header -----
    $('#day-hero').className = 'page-hero phase-' + day.phase;
    $('#day-crumbs').innerHTML =
      '<a href="' + PORTAL + '">90 Days</a> › ' +
      '<a href="' + docUrl('roadmap') + '">Phase ' + phase.id + ' · ' + esc(phase.name) + '</a> › Day ' + pad(n);
    $('#day-no').textContent = 'DAY ' + pad(n) + ' OF 90';
    $('#day-title').textContent = day.title;
    $('#day-summary').textContent = day.summary;

    // Metadata tiles: [label, value]
    $('#day-meta').innerHTML = [
      ['Phase', 'Phase ' + phase.id],
      ['Week', 'Week ' + week.id],
      ['Difficulty', day.diff],
      ['Study time', (day.mins / 60).toFixed(1) + ' h'],
      ['Focus', day.tech]
    ].map(function (item) {
      return '<div><small>' + item[0] + '</small><b>' + esc(item[1]) + '</b></div>';
    }).join('');

    // ----- Action buttons -----
    $('#day-actions').innerHTML =
      '<button class="btn primary small" id="complete-btn" type="button"></button>' +
      '<button class="btn small" id="bm-btn" type="button"></button>' +
      '<a class="btn small" href="' + MD.githubUrl(rel, 'blob') + '" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>' +
      '<button class="btn small" id="dl-btn" type="button">Download .md</button>' +
      '<button class="btn small" id="print-btn" type="button">Print / PDF</button>';

    // Update the complete and bookmark button labels to match the saved state.
    function paintButtons() {
      $('#complete-btn').textContent = Progress.isDone(n) ? '✓ Completed (undo)' : 'Mark day complete';
      $('#bm-btn').textContent = Progress.isBm(n) ? '★ Bookmarked' : '☆ Bookmark';
    }
    paintButtons();

    $('#complete-btn').addEventListener('click', function () {
      var nowDone = !Progress.isDone(n);
      Progress.setDone(n, nowDone);
      paintButtons();
      toast(nowDone ? 'Day ' + pad(n) + ' marked complete 🎉' : 'Marked as not complete');
    });
    $('#bm-btn').addEventListener('click', function () {
      Progress.toggleBm(n);
      paintButtons();
    });
    $('#print-btn').addEventListener('click', function () { window.print(); });

    // ----- Previous / next navigation (buttons and arrow keys) -----
    var prev = n > 1 ? dayBy(n - 1) : null;
    var next = n < 90 ? dayBy(n + 1) : null;

    var prevHtml = prev
      ? '<a class="btn" href="' + dayUrl(prev.n) + '">← Day ' + pad(prev.n) + ': ' + esc(prev.title) + '</a>'
      : '<span></span>';
    var nextHtml = next
      ? '<a class="btn primary" href="' + dayUrl(next.n) + '">Day ' + pad(next.n) + ': ' + esc(next.title) + ' →</a>'
      : '<a class="btn primary" href="' + docUrl('assessments') + '">Final assessment →</a>';
    $('#pager').innerHTML = prevHtml + nextHtml;

    document.addEventListener('keydown', function (event) {
      var typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if (typing || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === 'ArrowLeft' && prev) location.href = dayUrl(prev.n);
      if (event.key === 'ArrowRight' && next) location.href = dayUrl(next.n);
    });

    // ----- Private notes (auto-saved to this browser, 400 ms after typing stops) -----
    var notes = $('#notes');
    var noteTimer;
    notes.value = Store.get('notes:' + pad(n), '');
    notes.addEventListener('input', function () {
      clearTimeout(noteTimer);
      noteTimer = setTimeout(function () {
        Store.set('notes:' + pad(n), notes.value.slice(0, 20000));
        $('#notes-state').textContent = 'Saved in this browser';
      }, 400);
    });

    // ----- Lesson content -----
    el.innerHTML = '<p class="loading">Loading lesson from GitHub…</p>';

    var result;
    try {
      result = await MD.load(rel);
    } catch (err) {
      errorBox(el, rel, err);
      return;
    }

    MD.renderInto(el, result.text, { dir: 'day-' + pad(n) });

    // The page header already shows the title, so drop the Markdown's own H1.
    var heading = $('h1', el);
    if (heading) heading.remove();

    $('#dl-btn').addEventListener('click', function () {
      download('day-' + pad(n) + '.md', result.text, 'text/markdown');
    });
    $('#reading').textContent = '≈ ' + MD.readingMinutes(result.text) + ' min read';

    // ----- Interactive checklist, persisted per day -----
    var boxes = $$('input[type=checkbox]', el);
    var saved = Progress.checks(n);

    // Refresh the progress bar and strike through finished items.
    function paintChecklist() {
      var ticked = boxes.filter(function (b) { return b.checked; }).length;
      var pct = boxes.length ? Math.round(ticked * 100 / boxes.length) : 0;
      $('#check-bar').style.width = pct + '%';
      $('#check-text').textContent = ticked + ' / ' + boxes.length + ' tasks ticked (' + pct + '%)';
      boxes.forEach(function (b) { b.parentNode.classList.toggle('done-item', b.checked); });
    }

    boxes.forEach(function (box, index) {
      box.disabled = false;
      box.checked = !!saved[index];
      box.setAttribute('aria-label', (box.parentNode.textContent || 'task').trim().slice(0, 90));
      box.addEventListener('change', function () {
        Store.set('checks:' + pad(n), boxes.map(function (b) { return b.checked ? 1 : 0; }));
        paintChecklist();
      });
    });
    paintChecklist();

    // ----- Table of contents with scroll-spy highlighting -----
    var headings = $$('h2', el);
    var toc = $('#toc');

    toc.innerHTML = headings.map(function (h) {
      return '<li><a href="#' + h.id + '">' + esc(h.textContent.replace(/^\d+\.\s*/, '')) + '</a></li>';
    }).join('');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          $$('a', toc).forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      headings.forEach(function (h) { observer.observe(h); });
    }

    // ----- Related articles (matched by relatedDay / relatedDays) -----
    loadArticles().then(function (articles) {
      var related = articles.filter(function (a) {
        return a.relatedDay === n || (a.relatedDays || []).indexOf(n) !== -1;
      });
      if (!related.length) return;

      $('#related-wrap').classList.remove('hidden');
      $('#related').innerHTML = related.map(function (a) {
        return safeUrl(a.url)
          ? '<li><a href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.title) + '</a> ' +
            '<span class="muted">· ' + esc(a.platform) + '</span></li>'
          : '';
      }).join('');
    });

    // Jump to the section named in the URL hash, if any.
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  /* --------------------------------------------------------------------------
     6c. Document pages (data-page="doc"), including the tracker dashboard
     -------------------------------------------------------------------------- */

  /**
   * Render the personal progress dashboard (used on the Tracker page):
   * statistics, per-phase bars, bookmarks, and export / import / reset tools.
   */
  function dashboard(host) {
    var done = Progress.done();
    var bookmarks = Progress.bookmarks();

    // Total number of ticked checklist items across all lessons.
    var tasksTicked = 0;
    D.DAYS.forEach(function (d) {
      tasksTicked += Progress.checks(d.n).filter(Boolean).length;
    });

    // One progress bar per phase.
    var phaseBars = D.PHASES.map(function (phase) {
      var r = Progress.phasePct(phase);
      return '<div class="phase-bar-row phase-' + phase.id + '">' +
        '<span>Phase ' + phase.id + ' · ' + esc(phase.name) + '</span>' +
        '<div class="progress"><i style="width:' + r.pct + '%"></i></div>' +
        '<span>' + r.done + '/' + r.total + '</span>' +
      '</div>';
    }).join('');

    // Bookmark chips, sorted by day.
    var bookmarkChips = bookmarks.length
      ? bookmarks.slice().sort(function (a, b) { return a - b; }).map(function (n) {
          return '<a class="chip accent" href="' + dayUrl(n) + '">Day ' + pad(n) + ' · ' + esc(dayBy(n).title) + '</a> ';
        }).join('')
      : '<span class="muted">No bookmarks yet — use ☆ on any day.</span>';

    host.innerHTML =
      '<div class="dash-wrap">' +
        '<h2 style="margin-top:0">My DevOps Learning Progress</h2>' +
        '<div class="dash-grid">' +
          '<div class="stat"><b>' + done.length + ' / 90</b><span>Days completed</span></div>' +
          '<div class="stat"><b>' + Math.round(done.length * 100 / 90) + '%</b><span>Overall progress</span></div>' +
          '<div class="stat"><b>' + tasksTicked + '</b><span>Tasks ticked across lessons</span></div>' +
          '<div class="stat"><b>' + bookmarks.length + '</b><span>Bookmarked days</span></div>' +
        '</div>' +
        '<div class="panel"><h4>Progress by phase</h4><div class="phase-bars">' + phaseBars + '</div></div>' +
        '<div class="panel" style="margin-top:14px"><h4>Bookmarks</h4>' + bookmarkChips + '</div>' +
        '<p class="note">Progress is stored only in <strong>this browser</strong> (localStorage). ' +
          'Clearing site data deletes it, and it does not sync between devices — use Export to back it up.' +
          (Store.ok ? '' : ' <strong>Storage is blocked in this browser, so progress cannot be saved.</strong>') + '</p>' +
        '<div class="dash-actions">' +
          '<button class="btn small" id="exp" type="button">Export progress (JSON)</button>' +
          '<label class="btn small" for="imp" style="cursor:pointer">Import progress</label>' +
          '<input id="imp" type="file" accept="application/json" class="hidden">' +
          '<button class="btn small" id="rst" type="button">Reset all progress</button>' +
        '</div>' +
      '</div>';

    // ----- Export: save every "d90:" key (except the Markdown cache) to a JSON file -----
    $('#exp').addEventListener('click', function () {
      var data = { version: 1, exported: new Date().toISOString(), items: {} };
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key.indexOf('d90:') === 0 && key.indexOf('d90:md:') !== 0) {
            data.items[key] = localStorage.getItem(key);
          }
        }
      } catch (e) { /* storage blocked: export an empty file */ }
      download('devops-90-progress.json', JSON.stringify(data, null, 2), 'application/json');
    });

    // ----- Import: validate the file, then restore only whitelisted keys -----
    $('#imp').addEventListener('change', function (event) {
      var file = event.target.files[0];
      if (!file) return;
      if (file.size > 2000000) { toast('File too large'); return; }

      var reader = new FileReader();
      reader.onload = function () {
        try {
          var json = JSON.parse(reader.result);
          if (!json || json.version !== 1 || typeof json.items !== 'object') throw new Error('bad format');

          var allowedKey = /^d90:(done|bookmarks|last|theme|checks:\d\d|notes:\d\d)$/;
          var imported = 0;

          Object.keys(json.items).forEach(function (key) {
            var value = json.items[key];
            if (allowedKey.test(key) && typeof value === 'string' && value.length < 200000) {
              try {
                JSON.parse(value); // each stored value must itself be valid JSON
                localStorage.setItem(key, value);
                imported++;
              } catch (e) { /* skip invalid entries */ }
            }
          });

          toast('Imported ' + imported + ' items');
          dashboard(host);
        } catch (e) {
          toast('Not a valid progress file');
        }
      };
      reader.readAsText(file);
    });

    // ----- Reset: delete all saved progress (the theme is kept) -----
    $('#rst').addEventListener('click', function () {
      if (!confirm('Delete ALL saved progress, bookmarks and notes in this browser?')) return;
      try {
        Object.keys(localStorage)
          .filter(function (key) { return key.indexOf('d90:') === 0 && key !== 'd90:theme'; })
          .forEach(function (key) { localStorage.removeItem(key); });
      } catch (e) { /* ignore */ }
      dashboard(host);
      toast('Progress reset');
    });
  }

  /** Load and render one repository document (data-doc selects which one). */
  async function pageDoc() {
    var key = document.body.dataset.doc;
    var doc = docBy(key);
    var el = $('#md');

    if (!doc) {
      el.innerHTML = '<div class="empty">Unknown document.</div>';
      return;
    }

    // Page header
    document.title = doc.title + ' | 90 Days of DevOps';
    $('#doc-title').textContent = doc.title;
    $('#doc-blurb').textContent = doc.blurb;
    $('#doc-crumbs').innerHTML = '<a href="' + PORTAL + '">90 Days</a> › ' + esc(doc.title);
    $('#doc-actions').innerHTML =
      '<a class="btn small" href="' + MD.githubUrl(doc.file, 'blob') + '" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>' +
      '<button class="btn small" id="print-btn" type="button">Print / PDF</button>';
    $('#print-btn').addEventListener('click', function () { window.print(); });

    // The tracker page also shows the personal progress dashboard.
    if (key === 'tracker') dashboard($('#dashboard'));

    // Document body
    el.innerHTML = '<p class="loading">Loading from GitHub…</p>';
    try {
      var result = await MD.load(doc.file);
      MD.renderInto(el, result.text, { dir: '' });

      var heading = $('h1', el); // title is already in the page header
      if (heading) heading.remove();

      if (location.hash) {
        var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) target.scrollIntoView();
      }
    } catch (err) {
      errorBox(el, doc.file, err);
    }
  }

  /* --------------------------------------------------------------------------
     6d. Articles page (data-page="articles")
     -------------------------------------------------------------------------- */
  async function pageArticles() {
    var grid = $('#articles');
    var articles = await loadArticles();
    var filter = { q: '', platform: '', tag: '' }; // current search text, platform and topic

    // Distinct, sorted platform and topic names for the filter chips.
    var platforms = Array.from(new Set(articles.map(function (a) { return a.platform; }))).sort();
    var tags = Array.from(new Set([].concat.apply([], articles.map(function (a) { return a.tags || []; })))).sort();

    /** Draw the platform and topic chips, highlighting the active ones. */
    function renderChips() {
      $('#plat-chips').innerHTML = ['All'].concat(platforms).map(function (name) {
        var value = name === 'All' ? '' : name;
        return '<button class="chip button" type="button" data-plat="' + esc(value) + '" aria-pressed="' + (filter.platform === value) + '">' + esc(name) + '</button>';
      }).join('');

      $('#tag-chips').innerHTML = tags.map(function (tag) {
        return '<button class="chip button" type="button" data-tag="' + esc(tag) + '" aria-pressed="' + (filter.tag === tag) + '">' + esc(tag) + '</button>';
      }).join('');
    }

    /** Apply the filters and redraw the article grid (newest first). */
    function render() {
      var list = articles.filter(function (a) {
        if (filter.platform && a.platform !== filter.platform) return false;
        if (filter.tag && (a.tags || []).indexOf(filter.tag) === -1) return false;
        if (!filter.q) return true;
        var haystack = (a.title + ' ' + a.summary + ' ' + (a.tags || []).join(' ')).toLowerCase();
        return haystack.indexOf(filter.q.toLowerCase()) !== -1;
      }).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

      var emptyText = articles.length
        ? 'No articles match.'
        : 'No articles yet. Add records to <code>assets/data/devops-articles.json</code>.';
      grid.innerHTML = list.length ? list.map(articleCard).join('') : '<div class="empty">' + emptyText + '</div>';

      renderChips();
    }

    // Search box
    $('#a-q').addEventListener('input', function (event) {
      filter.q = event.target.value.trim();
      render();
    });

    // Chip clicks (delegated, because the chips are re-created on every render)
    document.addEventListener('click', function (event) {
      var platformChip = event.target.closest('[data-plat]');
      var tagChip = event.target.closest('[data-tag]');
      if (platformChip) {
        filter.platform = platformChip.dataset.plat;
        render();
      }
      if (tagChip) {
        filter.tag = filter.tag === tagChip.dataset.tag ? '' : tagChip.dataset.tag; // click again to clear
        render();
      }
    });

    // Profile buttons: show a link only when the configured URL is real, otherwise hide the button.
    function setupProfileLink(url, selector) {
      var link = $(selector);
      if (!link) return;
      if (safeUrl(url)) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.classList.add('hidden');
      }
    }
    setupProfileLink(C.profiles.linkedin, '#p-linkedin');
    setupProfileLink(C.profiles.medium, '#p-medium');

    render();
  }

  /* ==========================================================================
     7. BOOTSTRAP
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', function () {
    buildChrome();

    // Map each data-page value to the function that builds that page.
    var pages = {
      portal: pagePortal,
      day: pageDay,
      doc: pageDoc,
      articles: pageArticles
    };

    var run = pages[document.body.dataset.page];
    if (run) run();
  });
})();
