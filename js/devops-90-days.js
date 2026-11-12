/**
 * 90 Days of DevOps — local application controller
 * ---------------------------------------------------------------------------
 * Vanilla JavaScript only. No GitHub API, raw GitHub URLs, Jekyll, Liquid,
 * server-side runtime, build step, or remote Markdown requests.
 *
 * Curriculum metadata: js/devops-90-days-data.js
 * Learner data: browser localStorage (key prefix: d90:)
 *
 * Features:
 * - 90-day curriculum and four learning phases
 * - Local lesson pages with objectives, practice tasks and checklists
 * - Search and filters on the roadmap
 * - Completion tracking, bookmarks, notes and resume-where-you-left-off
 * - Local progress dashboard, theme preference and JSON export/import
 * - Local article catalogue from data/devops-articles.json
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var D = window.D90;
  if (!D || !Array.isArray(D.DAYS)) {
    console.error('D90 curriculum data is missing. Check script order.');
    return;
  }

  var C = D.CONFIG || {};
  var ROOT = D.SITE_ROOT || '../';
  var PORTAL = ROOT + 'pages/90-days-devops.html';
  var SUB = ROOT + 'pages/devops-90-days/';
  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ------------------------------------------------------------------------
     Local browser storage
     ------------------------------------------------------------------------ */
  var Store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem('d90:' + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem('d90:' + key, JSON.stringify(value));
        return true;
      } catch (error) {
        toast('Browser storage is unavailable. Your change may not persist.');
        return false;
      }
    },
    remove: function (key) {
      try { localStorage.removeItem('d90:' + key); } catch (error) { /* Storage is optional. */ }
    }
  };

  var Progress = {
    done: function () {
      var value = Store.get('done', []);
      return Array.isArray(value) ? value : [];
    },
    isDone: function (day) { return this.done().indexOf(day) !== -1; },
    setDone: function (day, completed) {
      var list = this.done().filter(function (item) { return item !== day; });
      if (completed) list.push(day);
      list.sort(function (a, b) { return a - b; });
      Store.set('done', list);
      Store.set('lastDay', day);
    },
    bookmarks: function () {
      var value = Store.get('bookmarks', []);
      return Array.isArray(value) ? value : [];
    },
    isBookmarked: function (day) { return this.bookmarks().indexOf(day) !== -1; },
    toggleBookmark: function (day) {
      var list = this.bookmarks();
      var index = list.indexOf(day);
      if (index === -1) list.push(day); else list.splice(index, 1);
      Store.set('bookmarks', list);
      return index === -1;
    },
    checks: function (day) {
      var value = Store.get('checks:' + day, []);
      return Array.isArray(value) ? value : [];
    },
    setChecks: function (day, checks) { Store.set('checks:' + day, checks); },
    notes: function (day) { return Store.get('notes:' + day, ''); },
    setNotes: function (day, notes) { Store.set('notes:' + day, notes); },
    percent: function (from, to) {
      var total = to - from + 1;
      var count = this.done().filter(function (day) { return day >= from && day <= to; }).length;
      return { done: count, total: total, pct: Math.round(count * 100 / total) };
    }
  };

  /* ------------------------------------------------------------------------
     General UI helpers
     ------------------------------------------------------------------------ */
  function toast(message) {
    var node = $('#toast');
    if (!node) {
      node = document.createElement('div');
      node.id = 'toast';
      node.className = 'toast';
      node.setAttribute('role', 'status');
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { node.classList.remove('show'); }, 2400);
  }

  function downloadFile(filename, content, type) {
    var blob = new Blob([content], { type: type || 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Store.set('theme', theme);
  }

  function dayUrl(day) { return SUB + 'day.html?day=' + day; }
  function docUrl(doc) { return SUB + doc.page; }
  function phaseFor(day) {
    return D.PHASES.find(function (phase) { return day >= phase.from && day <= phase.to; }) || D.PHASES[0];
  }
  function weekFor(day) {
    return D.WEEKS.find(function (week) { return day >= week.from && day <= week.to; }) || D.WEEKS[0];
  }
  function docFor(key) {
    return (D.DOCS || []).find(function (doc) { return doc.key === key; });
  }

  /* ------------------------------------------------------------------------
     Shared header and footer — all links are local pages or external profiles.
     The navbar is injected into <header id="site-header"></header>; to add or
     remove a tab, edit the `links` array in buildChrome() below.
     ------------------------------------------------------------------------ */
  function buildChrome() {
    // The active tab is chosen by <body data-nav="...">. Each page sets one of the
    // keys below (home, portal, roadmap, tracker, articles, challenge, notes).
    var current = document.body.dataset.nav || '';

    // Navigation tabs. Each entry is [key, label, url, icon].
    //  - key   : matched against <body data-nav="..."> to mark the active tab
    //  - label : text shown in the navbar
    //  - url   : built from ROOT / PORTAL / SUB so it works from any page folder
    //  - icon  : emoji shown before the label (use '' for no icon)
    var links = [
      // Main portfolio homepage (NEW)
      ['home', 'Home', ROOT + (C.homePage || 'index.html'), '⌂'],

      // DevOps learning index / portal page, 90-days-devops.html (NEW label: was "Overview")
      ['portal', 'Index', PORTAL, '📚'],

      // Existing tabs, unchanged apart from the added icons
      ['roadmap', 'Roadmap', docUrl(docFor('roadmap')), '🗺️'],
      ['tracker', 'Progress tracker', docUrl(docFor('tracker')), '✅'],
      ['articles', 'Articles', SUB + 'articles.html', '✍️'],

      // DevOps challenge page (NEW) - reuses the same config value as the footer link
      ['challenge', 'Challenge', ROOT + (C.challengesPage || 'pages/challenges.html'), '🚀'],

      // DevOps notes page (NEW) - set C.notesPage in the data file to change the path
      ['notes', 'Notes', ROOT + (C.notesPage || 'pages/devops-notes.html'), '📝']
    ];

    var header = $('#site-header');
    if (header) {
      header.className = 'site-header';
      header.innerHTML =
        '<div class="container header-inner">' +
          '<a class="brand" href="' + PORTAL + '">' +
            '<span class="brand-badge">☁️</span><span>' + esc(C.siteName || 'DevOps Learning') + '</span>' +
          '</a>' +
          '<nav class="nav" id="nav" aria-label="Main navigation">' +
            links.map(function (link) {
              // Optional icon (link[3]) + label; the active tab gets aria-current="page"
              var icon = link[3] ? '<span class="nav-icon" aria-hidden="true">' + link[3] + '</span> ' : '';
              return '<a href="' + link[2] + '"' + (link[0] === current ? ' aria-current="page"' : '') + '>' + icon + link[1] + '</a>';
            }).join('') +
          '</nav>' +
          '<button class="icon-btn" id="theme-btn" type="button" aria-label="Toggle colour theme" title="Toggle theme">◐</button>' +
          '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button>' +
        '</div>';

      $('#theme-btn').addEventListener('click', function () {
        setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
      $('#menu-btn').addEventListener('click', function (event) {
        var opened = $('#nav').classList.toggle('open');
        event.currentTarget.setAttribute('aria-expanded', String(opened));
      });
    }

    var footer = $('#site-footer');
    if (footer) {
      footer.className = 'site-footer';
      footer.innerHTML =
        '<div class="container footer-inner">' +
          '<span>© ' + new Date().getFullYear() + ' ' + esc(C.siteName || 'Mustansar Javaid') + ' · 90 Days of DevOps</span>' +
          '<nav aria-label="Footer navigation">' +
            '<a href="' + ROOT + (C.homePage || 'index.html') + '">Main website</a>' +
            '<a href="' + ROOT + (C.challengesPage || 'pages/challenges.html') + '">Challenges</a>' +
            '<a href="' + PORTAL + '">90 Days of DevOps</a>' +
          '</nav>' +
        '</div>';
    }

    var top = document.createElement('button');
    top.className = 'btn small to-top';
    top.type = 'button';
    top.textContent = '↑ Top';
    top.setAttribute('aria-label', 'Back to top');
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(top);
    window.addEventListener('scroll', function () {
      top.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Reusable card renderers
     ------------------------------------------------------------------------ */
  function phaseCard(phase) {
    var p = Progress.percent(phase.from, phase.to);
    return '<a class="card phase-card phase-' + phase.id + '" href="' + docUrl(docFor('roadmap')) + '">' +
      '<span class="range">PHASE ' + pad(phase.id) + ' · DAYS ' + pad(phase.from) + '–' + pad(phase.to) + '</span>' +
      '<h3>' + esc(phase.name) + '</h3><p>' + esc(phase.blurb) + '</p>' +
      progressBar(p.pct, p.done + ' of ' + p.total + ' days complete') +
      '<span class="muted small">' + p.pct + '% complete</span></a>';
  }

  function progressBar(percent, label) {
    return '<div class="progress" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + esc(label || 'Progress') + '">' +
      '<i style="width:' + percent + '%"></i></div>';
  }

  function docCard(doc) {
    return '<a class="card" href="' + docUrl(doc) + '">' +
      '<span class="card-icon">' + esc(doc.icon) + '</span><h3>' + esc(doc.title) + '</h3>' +
      '<p>' + esc(doc.blurb) + '</p><span class="card-link">Open resource →</span></a>';
  }

  function dayCard(day) {
    var completed = Progress.isDone(day.n);
    var bookmarked = Progress.isBookmarked(day.n);
    var phase = D.PHASES.find(function (item) { return item.id === day.phase; }) || phaseFor(day.n);
    return '<article class="card day-card' + (completed ? ' is-done' : '') + '">' +
      '<div class="day-card-top"><span class="range">DAY ' + pad(day.n) + ' · WEEK ' + pad(day.week) + '</span>' +
      '<span class="status">' + (completed ? '✓ Completed' : (day.capstone ? '★ Capstone' : esc(day.diff || 'Lesson'))) + '</span></div>' +
      '<h3><a href="' + dayUrl(day.n) + '">' + esc(day.title) + '</a></h3>' +
      '<p>' + esc(day.summary || 'Open the lesson to view the full learning guide.') + '</p>' +
      '<div class="tags"><span class="chip">Phase ' + phase.id + ': ' + esc(day.phaseName || phase.name) + '</span>' +
      '<span class="chip">' + esc(day.diff || 'Difficulty not specified') + '</span></div>' +
      '<div class="day-card-bottom"><span>~' + (day.mins || 0) + ' min · ' + esc(day.weekName || ('Week ' + day.week)) + '</span>' +
      '<span>' + (bookmarked ? '🔖 Saved' : '') + '</span></div></article>';
  }

  /* ------------------------------------------------------------------------
     Portal landing page
     ------------------------------------------------------------------------ */
  function pagePortal() {
    var done = Progress.done().length;
    var pct = Math.round(done / D.DAYS.length * 100);
    var last = Store.get('lastDay', null);
    var next = D.DAYS.find(function (day) { return !Progress.isDone(day.n); }) || D.DAYS[89];

    $('#live-stats').innerHTML =
      '<div class="stat"><strong>' + D.DAYS.length + '</strong><span>Learning days</span></div>' +
      '<div class="stat"><strong>' + done + '</strong><span>Completed</span></div>' +
      '<div class="stat"><strong>' + pct + '%</strong><span>Overall progress</span></div>' +
      '<div class="stat"><strong>' + D.PHASES.length + '</strong><span>Learning phases</span></div>';

    $('#phases').innerHTML = D.PHASES.map(phaseCard).join('');
    $('#resources').innerHTML = D.DOCS.map(docCard).join('');

    var capstones = D.DAYS.filter(function (day) { return day.capstone; });
    $('#capstones').innerHTML = capstones.map(dayCard).join('');

    // Refresh featured day cards from the authoritative README.md files.
    if (window.D90MD) {
      D90MD.loadDayIndex(D.DAYS).then(function () {
        var latestCapstones = D.DAYS.filter(function (day) { return day.capstone; });
        if ($('#capstones')) $('#capstones').innerHTML = latestCapstones.map(dayCard).join('');
      }).catch(function (error) { console.warn('Could not refresh DevOps day metadata:', error); });
    }

    var continueBox = $('#continue');
    if (continueBox) {
      var resumeDay = last && D.DAYS[last - 1] ? D.DAYS[last - 1] : next;
      continueBox.innerHTML =
        '<div class="card continue-card"><div><span class="eyebrow">YOUR NEXT STEP</span>' +
        '<h3>' + (Progress.isDone(resumeDay.n) ? 'Continue your learning journey' : 'Pick up where you left off') + '</h3>' +
        '<p>Day ' + pad(resumeDay.n) + ': ' + esc(resumeDay.title) + '</p></div>' +
        '<a class="btn primary" href="' + dayUrl(resumeDay.n) + '">Open lesson →</a></div>';
    }

    loadArticles().then(function (articles) {
      var target = $('#latest-articles');
      if (!target) return;
      var real = articles.filter(function (article) { return !article.sample; }).slice(0, 3);
      target.innerHTML = real.length ? real.map(articleCard).join('') :
        '<div class="card"><h3>Articles coming soon</h3><p>Add your published articles to <code>data/devops-articles.json</code>.</p></div>';
    });
  }

  /* ------------------------------------------------------------------------
     Roadmap document — searchable, filterable 90-day catalogue
     ------------------------------------------------------------------------ */
  function pageRoadmap() {
    var el = $('#md');
    if (!el) return;
    el.innerHTML =
      '<div class="toolbar roadmap-toolbar">' +
        '<div class="toolbar-row"><input class="field search" id="day-search" type="search" placeholder="Search day, topic or technology" aria-label="Search lessons">' +
        '<select class="field" id="phase-filter" aria-label="Filter by phase"><option value="">All phases</option>' +
        D.PHASES.map(function (phase) { return '<option value="' + phase.id + '">Phase ' + phase.id + ' — ' + esc(phase.name) + '</option>'; }).join('') +
        '</select><select class="field" id="status-filter" aria-label="Filter by completion"><option value="">All progress</option><option value="done">Completed</option><option value="todo">Not completed</option><option value="saved">Bookmarked</option></select></div>' +
        '<p id="roadmap-count" class="muted" role="status">Loading the 90 lesson README files…</p></div>' +
      '<div id="roadmap-list"></div>';

    function render() {
      var q = ($('#day-search').value || '').toLowerCase().trim();
      var phase = $('#phase-filter').value;
      var status = $('#status-filter').value;
      var matches = D.DAYS.filter(function (day) {
        var haystack = [day.title, day.summary, day.phaseName, day.weekName, day.diff, day.searchText].join(' ').toLowerCase();
        if (q && haystack.indexOf(q) === -1) return false;
        if (phase && String(day.phase) !== phase) return false;
        if (status === 'done' && !Progress.isDone(day.n)) return false;
        if (status === 'todo' && Progress.isDone(day.n)) return false;
        if (status === 'saved' && !Progress.isBookmarked(day.n)) return false;
        return true;
      });
      $('#roadmap-count').textContent = 'Showing ' + matches.length + ' of ' + D.DAYS.length + ' learning days · titles and lesson summaries synced from README.md';
      $('#roadmap-list').innerHTML = matches.length ? matches.map(dayCard).join('') :
        '<div class="empty"><h3>No lessons match</h3><p>Try changing your search or filters.</p></div>';
    }

    ['day-search', 'phase-filter', 'status-filter'].forEach(function (id) {
      $('#' + id).addEventListener(id === 'day-search' ? 'input' : 'change', render);
    });

    // Load all 90 individual lesson files; failed files retain their JS fallback metadata.
    if (window.D90MD) {
      D90MD.loadDayIndex(D.DAYS, function (completed, total, failed) {
        $('#roadmap-count').textContent = 'Reading lesson files: ' + completed + '/' + total +
          (failed.length ? ' · ' + failed.length + ' unavailable' : '');
      }).then(function (result) {
        render();
        if (result.failed.length) {
          $('#roadmap-count').textContent += ' · Missing files: ' + result.failed.map(pad).join(', ');
        }
      }).catch(function (error) {
        console.error(error);
        $('#roadmap-count').textContent = 'Could not load repository lesson files. Showing the saved fallback index.';
        render();
      });
    } else {
      $('#roadmap-count').textContent = 'Markdown loader is missing. Showing saved fallback index.';
      render();
    }
  }

  /* ------------------------------------------------------------------------
     Locally generated lesson content
     The uploaded project contained the day index, not the original 90 README
     lesson files. These pages use the original day metadata and provide a
     consistent editable lesson framework without pretending to reproduce
     missing repository Markdown.
     ------------------------------------------------------------------------ */
  function lessonTasks(day) {
    var tech = day.tech.toLowerCase();
    if (tech.indexOf('linux') !== -1) return [
      'Create a dedicated practice directory and record the commands you use.',
      'Perform the task using the terminal; capture the command and its output.',
      'Introduce one controlled failure and document how you diagnosed it.',
      'Write a short runbook with verification and rollback steps.'
    ];
    if (tech.indexOf('network') !== -1) return [
      'Draw the request path and identify the relevant protocols, ports and components.',
      'Run at least two diagnostic commands and save their outputs.',
      'Test a successful path and a deliberately failing path.',
      'Document the likely root cause and the next diagnostic step.'
    ];
    if (tech.indexOf('script') !== -1) return [
      'Create a small script in a dedicated project folder.',
      'Add input validation, useful messages and meaningful exit codes.',
      'Test normal input, invalid input and a failure scenario.',
      'Add a README with usage examples and expected output.'
    ];
    if (tech.indexOf('docker') !== -1 || tech.indexOf('container') !== -1) return [
      'Build or run a containerised example and inspect its configuration.',
      'Check logs, health, networking, storage and resource usage.',
      'Test a failure or restart scenario and explain the observed behaviour.',
      'Record image, container and security best practices demonstrated.'
    ];
    if (tech.indexOf('ci/cd') !== -1 || tech.indexOf('delivery') !== -1) return [
      'Design the pipeline stages from source change to deployment.',
      'Implement or diagram build, test, security and release gates.',
      'Demonstrate a failed stage and confirm that promotion is blocked.',
      'Document secrets handling, artifacts and rollback strategy.'
    ];
    if (tech.indexOf('cloud') !== -1 || tech.indexOf('aws') !== -1 || tech.indexOf('azure') !== -1) return [
      'Draw the target architecture and identify trust boundaries.',
      'Deploy or model the smallest safe version of the required resources.',
      'Apply least privilege, tagging, logging and cost controls.',
      'Document cleanup steps so practice resources do not incur unwanted cost.'
    ];
    if (tech.indexOf('terraform') !== -1 || tech.indexOf('infrastructure') !== -1) return [
      'Create a small declarative configuration and validate its syntax.',
      'Review the plan before applying any infrastructure changes.',
      'Test variable, output and state handling in a safe environment.',
      'Document drift detection, state protection and destroy/cleanup steps.'
    ];
    if (tech.indexOf('ansible') !== -1 || tech.indexOf('configuration') !== -1) return [
      'Create an inventory and a small repeatable playbook.',
      'Run syntax checks and execute against a disposable target.',
      'Run the playbook a second time and inspect idempotency.',
      'Document variables, secrets handling and rollback considerations.'
    ];
    if (tech.indexOf('kubernetes') !== -1 || tech.indexOf('platform') !== -1) return [
      'Create or inspect the relevant Kubernetes resources in a safe cluster.',
      'Use kubectl to inspect status, events, logs and resource configuration.',
      'Test scheduling, rollout, recovery or access behaviour as appropriate.',
      'Document health checks, resource limits and operational considerations.'
    ];
    if (tech.indexOf('observability') !== -1 || tech.indexOf('sre') !== -1 || tech.indexOf('monitor') !== -1) return [
      'Identify the service signals and define what healthy behaviour looks like.',
      'Create a dashboard, query or operational measurement.',
      'Trigger a controlled failure and observe the signal change.',
      'Write an alert or incident response note with an actionable threshold.'
    ];
    return [
      'Summarise the key concepts in your own words.',
      'Build a small practical example related to the topic.',
      'Validate the result and record evidence such as commands, screenshots or output.',
      'Write down one failure mode, one mitigation and one improvement.'
    ];
  }

  function pageDay() {
    var query = new URLSearchParams(location.search).get('day');
    var dayNumber = /^\d{1,2}$/.test(query || '') ? Number(query) : NaN;
    var day = D.DAYS[dayNumber - 1];
    var target = $('#md');
    if (!day || !target || dayNumber < 1 || dayNumber > 90) {
      if (target) target.innerHTML = '<div class="empty"><h2>Lesson not found</h2><a href="' + docUrl(docFor('roadmap')) + '">Return to roadmap</a></div>';
      return;
    }

    target.innerHTML = '<p class="loading">Loading Day ' + pad(day.n) + ' from DEVOPS-90-DAYS/' + 'day-' + pad(day.n) + '/README.md…</p>';

    var markdownPromise = window.D90MD ? D90MD.loadDay(day.n) : Promise.reject(new Error('Markdown loader is missing.'));
    markdownPromise.then(function (lesson) {
      day = D90MD.parseDayMetadata(lesson.text, day);
      var phase = D.PHASES.find(function (item) { return item.id === day.phase; }) || phaseFor(day.n);
      var week = D.WEEKS.find(function (item) { return item.id === day.week; }) || weekFor(day.n);
      var savedChecks = Progress.checks(day.n);
      var done = Progress.isDone(day.n);
      var bookmarked = Progress.isBookmarked(day.n);

      $('#day-title').textContent = 'Day ' + pad(day.n) + ' — ' + day.title;
      $('#day-subtitle').textContent = day.summary || 'Daily DevOps learning lesson.';
      $('#day-meta').innerHTML = '<span class="chip">Phase ' + phase.id + ': ' + esc(day.phaseName || phase.name) + '</span>' +
        '<span class="chip">Week ' + week.id + ': ' + esc(day.weekName || week.name) + '</span>' +
        '<span class="chip">' + esc(day.tech || 'DevOps') + '</span><span class="chip">' + esc(day.diff || 'Not specified') + '</span>' +
        '<span class="chip">~' + (day.mins || 0) + ' minutes</span>';

      // Avoid repeating the README's H1 because the page hero already displays it.
      var markdownBody = lesson.text.replace(/^#\s+Day\s+0?\d{1,2}[^\n]*\n+/, '');
      D90MD.renderInto(target, markdownBody, { directory: lesson.directory });

      var controls = document.createElement('section');
      controls.className = 'lesson-section learner-tools';
      controls.innerHTML =
        '<h2>Your learning progress</h2>' +
        '<p class="muted">Your completion status, personal checklist and notes are saved in this browser only.</p>' +
        '<div class="checklist">' + [
          'I completed the practical labs in the README.',
          'I tested the commands or configuration myself.',
          'I recorded evidence and troubleshooting notes.',
          'I can explain the key concepts without copying.'
        ].map(function (label, index) {
          return '<label class="check-row"><input type="checkbox" data-check="' + index + '"' + (savedChecks[index] ? ' checked' : '') + '> <span>' + label + '</span></label>';
        }).join('') + '</div>' +
        '<h3>My private learning notes</h3>' +
        '<textarea id="day-notes" class="field notes-field" rows="7" placeholder="Record your commands, observations, mistakes, solutions and questions…">' + esc(Progress.notes(day.n)) + '</textarea>' +
        '<p class="muted">Notes are not uploaded to GitHub or any server.</p>' +
        '<div class="lesson-actions">' +
          '<button class="btn primary" id="complete-btn" type="button">' + (done ? '✓ Completed — mark incomplete' : 'Mark day complete') + '</button>' +
          '<button class="btn" id="bookmark-btn" type="button">' + (bookmarked ? '🔖 Remove bookmark' : '☆ Bookmark day') + '</button>' +
          '<button class="btn" id="print-btn" type="button">Print / Save PDF</button>' +
          '<a class="btn" href="' + docUrl(docFor('roadmap')) + '">Back to roadmap</a>' +
        '</div>' +
        '<nav class="lesson-pager" aria-label="Lesson navigation">' +
          (day.n > 1 ? '<a class="btn small" href="' + dayUrl(day.n - 1) + '">← Previous day</a>' : '<span></span>') +
          (day.n < 90 ? '<a class="btn small" href="' + dayUrl(day.n + 1) + '">Next day →</a>' : '<a class="btn small" href="' + PORTAL + '">Finish journey →</a>') +
        '</nav>';
      target.appendChild(controls);

      $$('[data-check]', controls).forEach(function (box) {
        box.addEventListener('change', function () {
          var checks = [0, 1, 2, 3].map(function (index) {
            var input = $('[data-check="' + index + '"]', controls);
            return !!(input && input.checked);
          });
          Progress.setChecks(day.n, checks);
        });
      });
      $('#day-notes', controls).addEventListener('input', function (event) { Progress.setNotes(day.n, event.target.value); });
      $('#complete-btn', controls).addEventListener('click', function () {
        Progress.setDone(day.n, !Progress.isDone(day.n));
        toast(Progress.isDone(day.n) ? 'Day marked complete.' : 'Completion status updated.');
        pageDay();
      });
      $('#bookmark-btn', controls).addEventListener('click', function () {
        Progress.toggleBookmark(day.n);
        toast(Progress.isBookmarked(day.n) ? 'Day bookmarked.' : 'Bookmark removed.');
        pageDay();
      });
      $('#print-btn', controls).addEventListener('click', function () { window.print(); });
    }).catch(function (error) {
      console.error('Unable to load Day ' + dayNumber + ' README:', error);
      target.innerHTML = '<div class="empty"><h2>Lesson content unavailable</h2>' +
        '<p>The README.md file could not be loaded. Check that the file exists and the repository has published the latest commit.</p>' +
        '<p><a href="' + D90MD.rawUrl(D90MD.dayPath(dayNumber)) + '" target="_blank" rel="noopener noreferrer">Open the source README on GitHub</a></p>' +
        '<a class="btn" href="' + docUrl(docFor('roadmap')) + '">Return to roadmap</a></div>';
    });
  }

  /* ------------------------------------------------------------------------
     Local resource pages — generated from the bundled curriculum metadata.
     ------------------------------------------------------------------------ */
  function pageDoc() {
    var key = document.body.dataset.doc || 'overview';
    var doc = docFor(key) || docFor('overview');
    var title = $('#doc-title');
    var blurb = $('#doc-blurb');
    var crumbs = $('#doc-crumbs');
    var actions = $('#doc-actions');
    var content = $('#md');
    if (title) title.textContent = doc.title;
    if (blurb) blurb.textContent = doc.blurb;
    if (crumbs) crumbs.innerHTML = '<a href="' + PORTAL + '">90 Days</a> › ' + esc(doc.title);
    if (actions) actions.innerHTML = '<button class="btn small" id="print-btn" type="button">Print / Save PDF</button>';
    if ($('#print-btn')) $('#print-btn').addEventListener('click', function () { window.print(); });

    if (key === 'tracker') renderDashboard($('#dashboard'));
    if (!content) return;

    if (key === 'roadmap') { pageRoadmap(); return; }
    var html = '';
    if (key === 'overview') {
      html = '<h2>How to use this learning journey</h2><p>Work through the 90 days in order. Each day contains a learning objective, a practical exercise, a completion checklist and a personal notes area. Adapt the time estimate to your experience and available lab resources.</p>' +
        '<h2>Four learning phases</h2>' + D.PHASES.map(function (phase) { return '<h3>Phase ' + phase.id + ': ' + esc(phase.name) + ' (Days ' + phase.from + '–' + phase.to + ')</h3><p>' + esc(phase.blurb) + '</p>'; }).join('') +
        '<h2>Study rhythm</h2><ul><li>Learn the core concepts.</li><li>Practice in a disposable lab.</li><li>Verify behaviour and test a failure case.</li><li>Write notes and capture evidence.</li><li>Review progress at the end of each week.</li></ul>';
    } else if (key === 'tracker') {
      html = '<h2>Your progress is private to this browser</h2><p>The dashboard above uses localStorage. It is not sent to a server and will not automatically sync between browsers or devices.</p><p>Use Export progress to back up your learning record. Use Import progress to restore it on another browser.</p>';
    } else if (key === 'technologies') {
      var techs = {};
      D.DAYS.forEach(function (day) { (day.tags || []).concat([day.tech]).forEach(function (tag) { techs[tag] = techs[tag] || []; techs[tag].push(day.n); }); });
      html = '<h2>Technology index</h2><p>Topics below are taken from the bundled 90-day curriculum index.</p><div class="table-wrap"><table><thead><tr><th>Technology / topic</th><th>Days</th></tr></thead><tbody>' +
        Object.keys(techs).sort().map(function (name) { return '<tr><td>' + esc(name) + '</td><td>' + techs[name].map(pad).join(', ') + '</td></tr>'; }).join('') + '</tbody></table></div>';
    } else if (key === 'lab') {
      html = '<h2>Recommended lab approach</h2><ul><li>Use a dedicated Linux VM or disposable cloud environment.</li><li>Keep source code and notes in a local working directory.</li><li>Use non-production accounts and least-privilege credentials.</li><li>Set budgets and alerts before creating cloud resources.</li><li>Never commit credentials, private keys or tokens.</li><li>Destroy temporary infrastructure after each exercise.</li></ul><h2>Suggested workstation</h2><p>A modern Windows, macOS or Linux computer with 8–16 GB RAM, a terminal, Git, a code editor, Docker where supported, and access to a Linux environment is a practical starting point. Some Kubernetes and cloud exercises may need additional resources.</p>';
    } else if (key === 'assessments') {
      html = '<h2>Assessment method</h2><p>Do not measure progress only by watching tutorials. For each topic, produce evidence that you can explain, implement, troubleshoot and document the work.</p><ol><li>Concept explanation in your own words.</li><li>Working practical demonstration.</li><li>Verification and troubleshooting evidence.</li><li>Security, cost and operational considerations.</li><li>Clear documentation and repeatable steps.</li></ol><h2>Capstone review</h2><p>Review the three capstone groups in the roadmap and keep architecture diagrams, source code, deployment evidence, test results and runbooks together in a portfolio.</p>';
    } else if (key === 'mapping') {
      html = '<h2>Curriculum structure</h2><p>The DEVOPS-90-DAYS directory is the authoritative source for daily lesson content. The portal reads each day README.md directly as a public static file; it does not use the GitHub API or a custom workflow.</p><h2>Application files</h2><ul><li><code>DEVOPS-90-DAYS/day-NN/README.md</code> — daily lesson source and card metadata.</li><li><code>js/devops-90-days-data.js</code> — phase/week grouping and fallback metadata.</li><li><code>js/devops-90-days-markdown.js</code> — repository loader and Markdown renderer.</li><li><code>js/devops-90-days.js</code> — interface and application logic.</li><li><code>css/devops-90-days.css</code> — shared responsive theme.</li><li><code>localStorage</code> — learner progress, bookmarks and notes.</li></ul>';
    } else if (key === 'glossary') {
      var glossary = [
        ['CI/CD','Continuous Integration and Continuous Delivery/Deployment.'],
        ['IaC','Infrastructure as Code: provisioning and managing infrastructure through declarative or programmable definitions.'],
        ['SLO','Service Level Objective: a target for a measured service-level indicator.'],
        ['SLI','Service Level Indicator: a quantitative measure of service behaviour.'],
        ['DORA','A research programme and set of software delivery performance measures.'],
        ['GitOps','An operating model that uses version-controlled desired state to drive system changes.'],
        ['SBOM','Software Bill of Materials: an inventory of software components.'],
        ['SRE','Site Reliability Engineering: applying software engineering practices to operations and reliability.'],
        ['MTTR','Mean Time to Restore/Recover: a measure of incident recovery time.'],
        ['RTO','Recovery Time Objective: target time to restore a service after disruption.'],
        ['RPO','Recovery Point Objective: acceptable data-loss window measured in time.'],
        ['RBAC','Role-Based Access Control: permissions assigned through roles.'],
        ['TLS','Transport Layer Security: protocol used to protect data in transit.'],
        ['HPA','Kubernetes Horizontal Pod Autoscaler.'],
        ['FinOps','A collaborative practice for managing and optimising technology spend.']
      ];
      html = '<h2>DevOps glossary</h2><div class="table-wrap"><table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody>' +
        glossary.map(function (item) { return '<tr><th>' + esc(item[0]) + '</th><td>' + esc(item[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    }
    content.innerHTML = '<div class="local-doc-content">' + html + '</div>';
  }

  function renderDashboard(target) {
    if (!target) return;
    var done = Progress.done().length;
    var pct = Math.round(done / D.DAYS.length * 100);
    var bookmarks = Progress.bookmarks();
    target.innerHTML =
      '<section class="dashboard card"><div class="section-head"><div><h2>Your learning progress</h2><p>Saved only in this browser.</p></div>' +
      '<div class="actions"><button class="btn small" id="export-progress" type="button">Export progress</button><label class="btn small import-label">Import progress<input id="import-progress" type="file" accept="application/json" hidden></label></div></div>' +
      '<div class="stats"><div class="stat"><strong>' + done + '/90</strong><span>Days completed</span></div><div class="stat"><strong>' + pct + '%</strong><span>Overall progress</span></div><div class="stat"><strong>' + bookmarks.length + '</strong><span>Bookmarks</span></div></div>' +
      progressBar(pct, 'Overall learning progress') + '<p class="muted">' + pct + '% of the 90-day journey completed.</p>' +
      '<div class="phase-progress">' + D.PHASES.map(function (phase) {
        var p = Progress.percent(phase.from, phase.to);
        return '<div><div class="phase-progress-label"><strong>' + esc(phase.name) + '</strong><span>' + p.done + '/' + p.total + '</span></div>' + progressBar(p.pct, phase.name) + '</div>';
      }).join('') + '</div>' +
      '<h3>Bookmarked lessons</h3><div class="tags">' + (bookmarks.length ? bookmarks.sort(function (a,b) { return a-b; }).map(function (n) {
        var day = D.DAYS[n - 1]; return '<a class="chip" href="' + dayUrl(n) + '">Day ' + pad(n) + ': ' + esc(day.title) + '</a>';
      }).join('') : '<span class="muted">No bookmarked lessons yet.</span>') + '</div></section>';

    $('#export-progress').addEventListener('click', function () {
      var backup = {};
      Object.keys(localStorage).forEach(function (key) {
        if (key.indexOf('d90:') === 0) backup[key] = localStorage.getItem(key);
      });
      downloadFile('devops-90-days-progress.json', JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data: backup }, null, 2), 'application/json');
    });
    $('#import-progress').addEventListener('change', function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var payload = JSON.parse(reader.result);
          if (!payload.data || typeof payload.data !== 'object') throw new Error('Invalid backup');
          Object.keys(payload.data).forEach(function (key) {
            if (key.indexOf('d90:') === 0) localStorage.setItem(key, payload.data[key]);
          });
          toast('Progress imported. Reloading dashboard…');
          setTimeout(function () { location.reload(); }, 700);
        } catch (error) {
          toast('Could not import this progress file.');
        }
      };
      reader.readAsText(file);
    });
  }

  /* ------------------------------------------------------------------------
     Local article list
     ------------------------------------------------------------------------ */
  var articleCache = null;
  function loadArticles() {
    if (articleCache) return Promise.resolve(articleCache);
    return fetch(ROOT + 'data/devops-articles.json').then(function (response) {
      if (!response.ok) throw new Error('Article catalogue unavailable');
      return response.json();
    }).then(function (items) {
      articleCache = Array.isArray(items) ? items : [];
      return articleCache;
    }).catch(function () {
      articleCache = [];
      return articleCache;
    });
  }

  function articleCard(article) {
    var validUrl = /^https?:\/\//i.test(article.url || '');
    return '<article class="card"><span class="range">' + esc(article.platform || 'Article') + ' · ' + esc(article.date || '') + '</span>' +
      '<h3>' + esc(article.title) + '</h3><p>' + esc(article.summary || '') + '</p>' +
      '<div class="tags">' + (article.tags || []).map(function (tag) { return '<span class="chip">' + esc(tag) + '</span>'; }).join('') + '</div>' +
      (validUrl ? '<a class="card-link" href="' + esc(article.url) + '" target="_blank" rel="noopener noreferrer">Read article ↗</a>' : '<span class="muted">Link not added yet</span>') +
      '</article>';
  }

  function pageArticles() {
    var linkedin = $('#p-linkedin');
    var medium = $('#p-medium');
    // Read profile links from the central about.md file.
    loadAboutProfile()
      .then(function (profile) {
        var linkedinUrl = profile.linkedin;
        var mediumUrl = profile.medium;

        // Preserve existing configuration as a fallback.
        if (!linkedinUrl && C.profiles) {
          linkedinUrl = C.profiles.linkedin;
        }

        if (!mediumUrl && C.profiles) {
          mediumUrl = C.profiles.medium;
        }

        if (linkedin && linkedinUrl) {
          linkedin.href = linkedinUrl;
          linkedin.target = '_blank';
          linkedin.rel = 'noopener noreferrer';
          linkedin.hidden = false;
        }

        if (medium && mediumUrl) {
          medium.href = mediumUrl;
          medium.target = '_blank';
          medium.rel = 'noopener noreferrer';
          medium.hidden = false;
        }
      })
      .catch(function (error) {
        console.error('Profile loading failed:', error);

        // Keep the existing configuration as a fallback.
        if (linkedin && C.profiles && C.profiles.linkedin) {
          linkedin.href = C.profiles.linkedin;
          linkedin.target = '_blank';
          linkedin.rel = 'noopener noreferrer';
        }

        if (medium && C.profiles && C.profiles.medium) {
          medium.href = C.profiles.medium;
          medium.target = '_blank';
          medium.rel = 'noopener noreferrer';
        }
      });

    var search = $('#a-q');
    var platform = '';
    var tag = '';
    var articlesEl = $('#articles');
    loadArticles().then(function (articles) {
      var published = articles.filter(function (item) { return !item.sample; });
      var platforms = ['All platforms'].concat(Array.from(new Set(published.map(function (item) { return item.platform; }).filter(Boolean))));
      var tags = Array.from(new Set([].concat.apply([], published.map(function (item) { return item.tags || []; })))).sort();
      $('#plat-chips').innerHTML = platforms.map(function (item, index) {
        return '<button class="chip filter-chip' + (index === 0 ? ' active' : '') + '" data-platform="' + (index ? esc(item) : '') + '">' + esc(item) + '</button>';
      }).join('');
      $('#tag-chips').innerHTML = '<button class="chip filter-chip active" data-tag="">All topics</button>' + tags.map(function (item) {
        return '<button class="chip filter-chip" data-tag="' + esc(item) + '">' + esc(item) + '</button>';
      }).join('');
      function render() {
        var q = (search.value || '').toLowerCase();
        var list = published.filter(function (item) {
          var haystack = [item.title, item.summary, item.platform, (item.tags || []).join(' ')].join(' ').toLowerCase();
          return (!q || haystack.indexOf(q) !== -1) && (!platform || item.platform === platform) && (!tag || (item.tags || []).indexOf(tag) !== -1);
        });
        articlesEl.innerHTML = list.length ? list.map(articleCard).join('') : '<div class="empty"><h3>No published articles yet</h3><p>Add real article details to data/devops-articles.json.</p></div>';
      }
      search.addEventListener('input', render);
      $('#plat-chips').addEventListener('click', function (event) {
        var button = event.target.closest('[data-platform]');
        if (!button) return;
        platform = button.dataset.platform;
        $$('#plat-chips .chip').forEach(function (chip) { chip.classList.toggle('active', chip === button); });
        render();
      });
      $('#tag-chips').addEventListener('click', function (event) {
        var button = event.target.closest('[data-tag]');
        if (!button) return;
        tag = button.dataset.tag;
        $$('#tag-chips .chip').forEach(function (chip) { chip.classList.toggle('active', chip === button); });
        render();
      });
      render();
    });
  }


  /**
   * Load public profile information from activity/profile/about.md.
   * Supports simple YAML front matter without requiring a Markdown library.
   */
  function loadAboutProfile() {
    var profileUrl = new URL(
      '../../activity/profile/about.md',
      window.location.href
    );

    return fetch(profileUrl.href, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            'Unable to load about.md: HTTP ' + response.status
          );
        }

        return response.text();
      })
      .then(function (markdown) {
        var match = markdown.match(
          /^---\s*\r?\n([\s\S]*?)\r?\n---/
        );

        if (!match) {
          throw new Error('YAML front matter not found in about.md');
        }

        var profile = {};

        match[1].split(/\r?\n/).forEach(function (line) {
          var field = line.match(/^([a-zA-Z0-9_-]+):\s*(.*?)\s*$/);

          if (!field) return;

          var value = field[2].trim();

          // Remove optional surrounding quotes.
          value = value.replace(/^(['"])(.*)\1$/, '$2');

          profile[field[1]] = value;
        });

        return profile;
      });
  }


  /* ------------------------------------------------------------------------
     Application bootstrap
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    var savedTheme = Store.get('theme', 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    buildChrome();

    var page = document.body.dataset.page;
    if (page === 'portal') pagePortal();
    else if (page === 'day') pageDay();
    else if (page === 'doc') pageDoc();
    else if (page === 'articles') pageArticles();
  });
})();
