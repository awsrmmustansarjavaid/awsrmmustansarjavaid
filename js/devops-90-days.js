/* devops-90-days.js - portal behaviour (vanilla JS, no build step).
   Pages set <body data-page="portal|daily|day|doc|articles" data-nav="..."> */
(function () {
  'use strict';
  var D = window.D90, C = D.CONFIG, MD = window.D90MD, ROOT = D.SITE_ROOT;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var PORTAL = ROOT + 'pages/90-days-devops.html';
  var SUB = ROOT + 'pages/devops-90-days/';
  var dayUrl = function (n) { return SUB + 'day.html?day=' + n; };
  var docBy = function (k) { return D.DOCS.find(function (d) { return d.key === k; }); };
  var docUrl = function (k) { return SUB + docBy(k).page; };
  var dayBy = function (n) { return D.DAYS[n - 1]; };
  var phaseOf = function (n) { return D.PHASES.find(function (p) { return n >= p.from && n <= p.to; }); };
  var safeUrl = function (u) { return /^https?:\/\//i.test(u || '') && u.indexOf('YOUR-') === -1; };

  /* ---------- storage (localStorage, always guarded) ---------- */
  var Store = {
    ok: true,
    get: function (k, def) { try { var v = localStorage.getItem('d90:' + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } },
    set: function (k, v) { try { localStorage.setItem('d90:' + k, JSON.stringify(v)); return true; } catch (e) { Store.ok = false; return false; } },
    del: function (k) { try { localStorage.removeItem('d90:' + k); } catch (e) {} }
  };
  var Progress = {
    done: function () { var a = Store.get('done', []); return Array.isArray(a) ? a : []; },
    isDone: function (n) { return Progress.done().indexOf(n) !== -1; },
    setDone: function (n, v) { var a = Progress.done().filter(function (x) { return x !== n; }); if (v) a.push(n); a.sort(function (x, y) { return x - y; }); Store.set('done', a); },
    bookmarks: function () { var a = Store.get('bookmarks', []); return Array.isArray(a) ? a : []; },
    isBm: function (n) { return Progress.bookmarks().indexOf(n) !== -1; },
    toggleBm: function (n) { var a = Progress.bookmarks(), i = a.indexOf(n); if (i === -1) a.push(n); else a.splice(i, 1); Store.set('bookmarks', a); return i === -1; },
    checks: function (n) { var a = Store.get('checks:' + pad(n), []); return Array.isArray(a) ? a : []; },
    status: function (n) { if (Progress.isDone(n)) return 'done'; return Progress.checks(n).some(Boolean) ? 'progress' : 'todo'; },
    phasePct: function (p) { var d = Progress.done(), t = p.to - p.from + 1, c = d.filter(function (n) { return n >= p.from && n <= p.to; }).length; return { done: c, total: t, pct: Math.round(c * 100 / t) }; }
  };
  var STATUS_LABEL = { done: 'Completed', progress: 'In progress', todo: 'Not started' };

  /* ---------- small UI helpers ---------- */
  function toast(msg) {
    var t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function download(name, text, type) {
    var b = new Blob([text], { type: type || 'text/plain' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function setTheme(t) { document.documentElement.setAttribute('data-theme', t); Store.set('theme', t); }
  (function initTheme() { var t = Store.get('theme', null); document.documentElement.setAttribute('data-theme', t || 'dark'); })();

  /* ---------- shared header / footer ---------- */
  function buildChrome() {
    var nav = document.body.dataset.nav || '';
    var links = [
      ['home', 'Home', ROOT + C.homePage], ['portal', '90 Days', PORTAL], ['roadmap', 'Roadmap', docUrl('roadmap')],
      ['daily', 'Daily Challenges', SUB + 'daily-challenges.html'], ['projects', 'Projects', docUrl('projects')],
      ['tracker', 'Tracker', docUrl('tracker')], ['articles', 'Articles', SUB + 'articles.html'], ['career', 'Career', docUrl('career')]
    ];
    var h = $('#site-header');
    if (h) {
      h.className = 'site-header';
      h.innerHTML = '<div class="container header-inner"><a class="brand" href="' + ROOT + C.homePage + '"><span class="brand-badge">MJ</span><span>' + esc(C.siteName) + '</span></a>' +
        '<nav class="nav" id="nav" aria-label="Main navigation">' + links.map(function (l) { return '<a href="' + l[2] + '"' + (l[0] === nav ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') +
        '<a href="' + 'https://github.com/' + C.owner + '/' + C.repo + '/tree/' + C.branch + '/' + C.contentDir + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav>' +
        '<button class="icon-btn" id="theme-btn" type="button" aria-label="Toggle dark or light theme" title="Toggle theme">◐</button>' +
        '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button></div>';
      $('#theme-btn').addEventListener('click', function () { setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
      $('#menu-btn').addEventListener('click', function (e) { var o = $('#nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
    }
    var f = $('#site-footer');
    if (f) {
      f.className = 'site-footer';
      var p = C.profiles, ext = function (u, t) { return safeUrl(u) ? '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>' : ''; };
      f.innerHTML = '<div class="container footer-inner"><span>© ' + new Date().getFullYear() + ' ' + esc(C.siteName) + ' · 90 Days of DevOps</span><nav aria-label="Footer">' +
        '<a href="' + ROOT + C.homePage + '">← Back to Home</a><a href="' + ROOT + C.challengesPage + '">Challenges</a>' +
        ext(p.github, 'GitHub') + ext(p.linkedin, 'LinkedIn') + ext(p.medium, 'Medium') + '</nav></div>';
    }
    var top = document.createElement('button');
    top.className = 'btn small to-top'; top.type = 'button'; top.textContent = '↑ Top'; top.setAttribute('aria-label', 'Back to top');
    top.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
    document.body.appendChild(top);
    window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  }

  /* ---------- card builders ---------- */
  function dayCard(d) {
    var st = Progress.status(d.n), bm = Progress.isBm(d.n);
    return '<article class="card day-card phase-' + d.phase + '" data-day="' + d.n + '">' +
      '<div class="day-top"><span class="day-no">DAY ' + pad(d.n) + '</span><span><span class="status ' + st + '">' + STATUS_LABEL[st] + '</span> ' +
      '<button class="bm" type="button" data-bm="' + d.n + '" aria-pressed="' + bm + '" aria-label="Bookmark day ' + d.n + '" title="Bookmark">' + (bm ? '★' : '☆') + '</button></span></div>' +
      '<h3><a href="' + dayUrl(d.n) + '">' + esc(d.title) + '</a></h3><p>' + esc(d.summary) + '</p>' +
      '<div class="meta-row"><span class="chip accent">' + esc(d.tech) + '</span><span class="chip">' + esc(d.diff) + '</span><span class="chip">⏱ ' + (d.mins / 60).toFixed(1) + ' h</span></div>' +
      '<a class="more" href="' + dayUrl(d.n) + '">Open daily lesson →</a></article>';
  }
  function bindBookmarks(root, after) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-bm]'); if (!b) return;
      var on = Progress.toggleBm(parseInt(b.dataset.bm, 10));
      b.setAttribute('aria-pressed', on); b.textContent = on ? '★' : '☆'; toast(on ? 'Bookmarked' : 'Bookmark removed');
      if (after) after();
    });
  }
  function phaseCard(p) {
    var pr = Progress.phasePct(p);
    return '<a class="card phase-card phase-' + p.id + '" href="' + SUB + 'daily-challenges.html?phase=' + p.id + '" style="color:inherit">' +
      '<span class="range">PHASE ' + pad(p.id) + ' · DAYS ' + pad(p.from) + '–' + pad(p.to) + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.blurb) + '</p>' +
      '<div class="progress" role="progressbar" aria-valuenow="' + pr.pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Phase ' + p.id + ' progress"><i style="width:' + pr.pct + '%"></i></div>' +
      '<span class="muted" style="font-size:.82rem">' + pr.done + ' / ' + pr.total + ' days completed</span></a>';
  }

  /* ---------- articles ---------- */
  var _articles = null;
  async function loadArticles() {
    if (_articles) return _articles;
    try {
      var r = await fetch(ROOT + 'assets/data/devops-articles.json', { cache: 'no-cache' });
      if (!r.ok) throw new Error(r.status);
      var j = await r.json(); _articles = Array.isArray(j) ? j : [];
    } catch (e) { _articles = []; }
    return _articles;
  }
  function articleCard(a) {
    var ok = safeUrl(a.url), related = a.relatedDay ? '<a class="chip" href="' + dayUrl(a.relatedDay) + '">Day ' + pad(a.relatedDay) + '</a>' : '';
    var title = ok ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.title) + '</a>' : esc(a.title);
    return '<article class="card"><div class="meta-row"><span class="chip accent">' + esc(a.platform) + '</span>' + (a.sample || !ok ? '<span class="chip badge-sample">Sample</span>' : '') +
      '<span class="chip">' + esc(a.date || '') + '</span>' + related + '</div><h3>' + title + '</h3><p>' + esc(a.summary || '') + '</p>' +
      '<div class="meta-row">' + (a.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
      (ok ? '<a class="more" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">Read article ↗</a>' : '<span class="more muted">Add the real URL in devops-articles.json</span>') + '</article>';
  }

  /* ================= PAGES ================= */
  function pagePortal() {
    var done = Progress.done().length, last = Store.get('last', null);
    $('#live-stats').innerHTML =
      '<div class="stat"><b>90</b><span>Daily lessons</span></div><div class="stat"><b>3</b><span>Capstone projects</span></div>' +
      '<div class="stat"><b>15+</b><span>Skill areas</span></div><div class="stat"><b>' + done + ' / 90</b><span>Days you completed*</span></div>';
    var c = $('#continue');
    if (last && last >= 1 && last <= 90) {
      var d = dayBy(last);
      c.innerHTML = '<article class="card continue"><div><span class="day-no">CONTINUE · DAY ' + pad(d.n) + '</span><h3 style="margin-top:4px">' + esc(d.title) + '</h3></div><a class="btn primary" href="' + dayUrl(d.n) + '">Resume lesson →</a></article>';
    }
    $('#phases').innerHTML = D.PHASES.map(phaseCard).join('');
    $('#resources').innerHTML = D.DOCS.filter(function (x) { return x.key !== 'overview' && x.key !== 'mapping'; }).concat(D.DOCS.filter(function (x) { return x.key === 'overview'; })).map(function (x) {
      return '<a class="card" href="' + SUB + x.page + '" style="color:inherit"><span class="card-icon" aria-hidden="true">' + x.icon + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.blurb) + '</p><span class="more">Open →</span></a>';
    }).join('');
    var caps = [
      ['Capstone 1', 'Secure CI/CD Platform', 'Days 47–49', 'Lint → test → SAST/SCA → build → image scan → SBOM → sign → deploy → smoke test → approval → automatic rollback.', 47],
      ['Capstone 2', 'Cloud Infrastructure Automation', 'Days 63, 69–70', 'Terraform modules, remote state, Ansible roles, multi-AZ AWS, DR drill, cost report and security review.', 63],
      ['Capstone 3', 'Production Kubernetes & GitOps Platform', 'Days 87–89', 'Argo CD app-of-apps, canary rollouts, Kyverno policies, observability, SLOs, game day and Velero backups.', 87]];
    $('#capstones').innerHTML = caps.map(function (x) {
      return '<a class="card" href="' + dayUrl(x[4]) + '" style="color:inherit"><span class="chip accent">' + x[0] + '</span><h3>' + x[1] + '</h3><p>' + x[3] + '</p><div class="meta-row"><span class="chip">' + x[2] + '</span></div><span class="more">Start capstone →</span></a>';
    }).join('');
    loadArticles().then(function (a) {
      var el = $('#latest-articles'); if (!el) return;
      var list = a.slice().sort(function (x, y) { return String(y.date).localeCompare(String(x.date)); }).slice(0, 3);
      el.innerHTML = list.length ? list.map(articleCard).join('') : '<div class="empty">Articles will appear here. Add them to <code>assets/data/devops-articles.json</code>.</div>';
    });
  }

  function pageDaily() {
    var grid = $('#days'), qs = new URLSearchParams(location.search);
    var f = { q: '', phase: qs.get('phase') || '', tech: '', diff: '', status: '', bm: false };
    var techs = Array.from(new Set(D.DAYS.map(function (d) { return d.tech; }))).sort();
    var diffs = Array.from(new Set(D.DAYS.map(function (d) { return d.diff; })));
    var opt = function (arr, label) { return '<option value="">' + label + '</option>' + arr.map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; }).join(''); };
    $('#f-phase').innerHTML = '<option value="">All phases</option>' + D.PHASES.map(function (p) { return '<option value="' + p.id + '">Phase ' + p.id + ' · ' + esc(p.name) + '</option>'; }).join('');
    $('#f-tech').innerHTML = opt(techs, 'All technologies'); $('#f-diff').innerHTML = opt(diffs, 'All difficulties');
    $('#f-phase').value = f.phase;
    function match(d) {
      if (f.phase && String(d.phase) !== String(f.phase)) return false;
      if (f.tech && d.tech !== f.tech) return false;
      if (f.diff && d.diff !== f.diff) return false;
      if (f.status && Progress.status(d.n) !== f.status) return false;
      if (f.bm && !Progress.isBm(d.n)) return false;
      if (f.q) {
        var hay = ('day ' + d.n + ' ' + pad(d.n) + ' ' + d.title + ' ' + d.tech + ' ' + d.tags.join(' ') + ' ' + d.summary).toLowerCase();
        return f.q.toLowerCase().split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
      }
      return true;
    }
    function render() {
      var list = D.DAYS.filter(match), html = '';
      D.PHASES.forEach(function (p) {
        var items = list.filter(function (d) { return d.phase === p.id; }); if (!items.length) return;
        html += '<section class="phase-' + p.id + '" aria-labelledby="ph' + p.id + '"><div class="phase-heading"><h2 id="ph' + p.id + '">Phase ' + pad(p.id) + ' — ' + esc(p.name) + '</h2><span class="range">DAYS ' + pad(p.from) + '–' + pad(p.to) + '</span></div><div class="grid cols-3">' + items.map(dayCard).join('') + '</div></section>';
      });
      grid.innerHTML = html || '<div class="empty">No days match your filters. <button class="btn small" id="clear-f" type="button">Clear filters</button></div>';
      $('#count').textContent = list.length + ' of 90 days';
      var cl = $('#clear-f'); if (cl) cl.addEventListener('click', reset);
    }
    function reset() { f = { q: '', phase: '', tech: '', diff: '', status: '', bm: false }; $('#f-q').value = ''; ['phase', 'tech', 'diff', 'status'].forEach(function (k) { $('#f-' + k).value = ''; }); $('#f-bm').setAttribute('aria-pressed', 'false'); render(); }
    var t; $('#f-q').addEventListener('input', function (e) { clearTimeout(t); t = setTimeout(function () { f.q = e.target.value.trim(); render(); }, 120); });
    ['phase', 'tech', 'diff', 'status'].forEach(function (k) { $('#f-' + k).addEventListener('change', function (e) { f[k] = e.target.value; render(); }); });
    $('#f-bm').addEventListener('click', function (e) { f.bm = !f.bm; e.currentTarget.setAttribute('aria-pressed', f.bm); render(); });
    $('#f-reset').addEventListener('click', reset);
    bindBookmarks(grid, function () { if (f.bm) render(); });
    document.addEventListener('keydown', function (e) { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); $('#f-q').focus(); } });
    render();
  }

  function errorBox(el, what, err) {
    el.innerHTML = '<div class="error-box"><strong>Could not load ' + esc(what) + '.</strong><br>' + esc(err && err.message || err) +
      '<br><span class="muted">Check that the file exists in <code>' + esc(C.contentDir) + '/</code> on branch <code>' + esc(C.branch) + '</code>, then reload. ' +
      '<a href="https://github.com/' + C.owner + '/' + C.repo + '/tree/' + C.branch + '/' + C.contentDir + '" target="_blank" rel="noopener noreferrer">Open the folder on GitHub ↗</a></span></div>';
  }

  async function pageDay() {
    var q = new URLSearchParams(location.search).get('day'), el = $('#md');
    var n = /^\d{1,2}$/.test(q || '') ? parseInt(q, 10) : NaN;
    if (!(n >= 1 && n <= 90)) { $('#day-title').textContent = 'Day not found'; el.innerHTML = '<div class="empty">Choose a day from <a href="' + SUB + 'daily-challenges.html">Daily Challenges</a>. Valid days are 1–90.</div>'; return; }
    var d = dayBy(n), p = phaseOf(n), wk = D.WEEKS.find(function (w) { return n >= w.from && n <= w.to; }), rel = 'day-' + pad(n) + '/README.md';
    document.title = 'Day ' + pad(n) + ' — ' + d.title + ' | 90 Days of DevOps';
    Store.set('last', n);
    $('#day-hero').className = 'page-hero phase-' + d.phase;
    $('#day-crumbs').innerHTML = '<a href="' + PORTAL + '">90 Days</a> › <a href="' + SUB + 'daily-challenges.html?phase=' + p.id + '">Phase ' + p.id + ' · ' + esc(p.name) + '</a> › Day ' + pad(n);
    $('#day-no').textContent = 'DAY ' + pad(n) + ' OF 90'; $('#day-title').textContent = d.title; $('#day-summary').textContent = d.summary;
    $('#day-meta').innerHTML = [['Phase', 'Phase ' + p.id], ['Week', 'Week ' + wk.id], ['Difficulty', d.diff], ['Study time', (d.mins / 60).toFixed(1) + ' h'], ['Focus', d.tech]].map(function (x) { return '<div><small>' + x[0] + '</small><b>' + esc(x[1]) + '</b></div>'; }).join('');
    var ghUrl = MD.githubUrl(rel, 'blob');
    $('#day-actions').innerHTML = '<button class="btn primary small" id="complete-btn" type="button"></button><button class="btn small" id="bm-btn" type="button"></button>' +
      '<a class="btn small" href="' + ghUrl + '" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a><button class="btn small" id="dl-btn" type="button">Download .md</button><button class="btn small" id="print-btn" type="button">Print / PDF</button>';
    function paintButtons() { var dn = Progress.isDone(n); $('#complete-btn').textContent = dn ? '✓ Completed (undo)' : 'Mark day complete'; var b = Progress.isBm(n); $('#bm-btn').textContent = b ? '★ Bookmarked' : '☆ Bookmark'; }
    paintButtons();
    $('#complete-btn').addEventListener('click', function () { var v = !Progress.isDone(n); Progress.setDone(n, v); paintButtons(); toast(v ? 'Day ' + pad(n) + ' marked complete 🎉' : 'Marked as not complete'); });
    $('#bm-btn').addEventListener('click', function () { Progress.toggleBm(n); paintButtons(); });
    $('#print-btn').addEventListener('click', function () { window.print(); });
    // pager
    var prev = n > 1 ? dayBy(n - 1) : null, next = n < 90 ? dayBy(n + 1) : null;
    $('#pager').innerHTML = (prev ? '<a class="btn" href="' + dayUrl(prev.n) + '">← Day ' + pad(prev.n) + ': ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a class="btn primary" href="' + dayUrl(next.n) + '">Day ' + pad(next.n) + ': ' + esc(next.title) + ' →</a>' : '<a class="btn primary" href="' + docUrl('assessments') + '">Final assessment →</a>');
    document.addEventListener('keydown', function (e) {
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowLeft' && prev) location.href = dayUrl(prev.n);
      if (e.key === 'ArrowRight' && next) location.href = dayUrl(next.n);
    });
    // notes
    var notes = $('#notes'); notes.value = Store.get('notes:' + pad(n), '');
    var nt; notes.addEventListener('input', function () { clearTimeout(nt); nt = setTimeout(function () { Store.set('notes:' + pad(n), notes.value.slice(0, 20000)); $('#notes-state').textContent = 'Saved in this browser'; }, 400); });
    // content
    el.innerHTML = '<p class="loading">Loading lesson from GitHub…</p>';
    var res;
    try { res = await MD.load(rel); } catch (err) { errorBox(el, rel, err); return; }
    MD.renderInto(el, res.text, { dir: 'day-' + pad(n) });
    var h1 = $('h1', el); if (h1) h1.remove();                      // title is already in the page hero
    $('#dl-btn').addEventListener('click', function () { download('day-' + pad(n) + '.md', res.text, 'text/markdown'); });
    $('#reading').textContent = '≈ ' + MD.readingMinutes(res.text) + ' min read';
    // interactive checklist, persisted per day
    var boxes = $$('input[type=checkbox]', el), saved = Progress.checks(n);
    function paint() {
      var c = boxes.filter(function (b) { return b.checked; }).length, pct = boxes.length ? Math.round(c * 100 / boxes.length) : 0;
      $('#check-bar').style.width = pct + '%'; $('#check-text').textContent = c + ' / ' + boxes.length + ' tasks ticked (' + pct + '%)';
      boxes.forEach(function (b) { b.parentNode.classList.toggle('done-item', b.checked); });
    }
    boxes.forEach(function (b, i) {
      b.disabled = false; b.checked = !!saved[i]; b.setAttribute('aria-label', (b.parentNode.textContent || 'task').trim().slice(0, 90));
      b.addEventListener('change', function () { Store.set('checks:' + pad(n), boxes.map(function (x) { return x.checked ? 1 : 0; })); paint(); });
    });
    paint();
    // table of contents + scroll-spy
    var hs = $$('h2', el), toc = $('#toc');
    toc.innerHTML = hs.map(function (h) { return '<li><a href="#' + h.id + '">' + esc(h.textContent.replace(/^\d+\.\s*/, '')) + '</a></li>'; }).join('');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { $$('a', toc).forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); }); } }); }, { rootMargin: '-80px 0px -70% 0px' });
      hs.forEach(function (h) { io.observe(h); });
    }
    // related articles
    loadArticles().then(function (arts) {
      var rel2 = arts.filter(function (a) { return a.relatedDay === n || (a.relatedDays || []).indexOf(n) !== -1; });
      if (!rel2.length) return;
      $('#related-wrap').classList.remove('hidden');
      $('#related').innerHTML = rel2.map(function (a) { return safeUrl(a.url) ? '<li><a href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.title) + '</a> <span class="muted">· ' + esc(a.platform) + '</span></li>' : ''; }).join('');
    });
    if (location.hash) { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); }
  }

  function dashboard(host) {
    var done = Progress.done(), bms = Progress.bookmarks();
    var labsTicked = 0; D.DAYS.forEach(function (d) { labsTicked += Progress.checks(d.n).filter(Boolean).length; });
    host.innerHTML = '<div class="dash-wrap"><h2 style="margin-top:0">My DevOps Learning Progress</h2>' +
      '<div class="dash-grid"><div class="stat"><b>' + done.length + ' / 90</b><span>Days completed</span></div><div class="stat"><b>' + Math.round(done.length * 100 / 90) + '%</b><span>Overall progress</span></div>' +
      '<div class="stat"><b>' + labsTicked + '</b><span>Tasks ticked across lessons</span></div><div class="stat"><b>' + bms.length + '</b><span>Bookmarked days</span></div></div>' +
      '<div class="panel"><h4>Progress by phase</h4><div class="phase-bars">' + D.PHASES.map(function (p) { var r = Progress.phasePct(p); return '<div class="phase-bar-row phase-' + p.id + '"><span>Phase ' + p.id + ' · ' + esc(p.name) + '</span><div class="progress"><i style="width:' + r.pct + '%"></i></div><span>' + r.done + '/' + r.total + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="panel" style="margin-top:14px"><h4>Bookmarks</h4>' + (bms.length ? bms.slice().sort(function (a, b) { return a - b; }).map(function (n) { return '<a class="chip accent" href="' + dayUrl(n) + '">Day ' + pad(n) + ' · ' + esc(dayBy(n).title) + '</a> '; }).join('') : '<span class="muted">No bookmarks yet — use ☆ on any day.</span>') + '</div>' +
      '<p class="note">Progress is stored only in <strong>this browser</strong> (localStorage). Clearing site data deletes it, and it does not sync between devices — use Export to back it up.' + (Store.ok ? '' : ' <strong>Storage is blocked in this browser, so progress cannot be saved.</strong>') + '</p>' +
      '<div class="dash-actions"><button class="btn small" id="exp" type="button">Export progress (JSON)</button><label class="btn small" for="imp" style="cursor:pointer">Import progress</label><input id="imp" type="file" accept="application/json" class="hidden"><button class="btn small" id="rst" type="button">Reset all progress</button></div></div>';
    $('#exp').addEventListener('click', function () {
      var data = { version: 1, exported: new Date().toISOString(), items: {} };
      try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf('d90:') === 0 && k.indexOf('d90:md:') !== 0) data.items[k] = localStorage.getItem(k); } } catch (e) {}
      download('devops-90-progress.json', JSON.stringify(data, null, 2), 'application/json');
    });
    $('#imp').addEventListener('change', function (e) {
      var file = e.target.files[0]; if (!file) return;
      if (file.size > 2000000) { toast('File too large'); return; }
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var j = JSON.parse(fr.result); if (!j || j.version !== 1 || typeof j.items !== 'object') throw 0;
          var n = 0; Object.keys(j.items).forEach(function (k) { if (/^d90:(done|bookmarks|last|theme|checks:\d\d|notes:\d\d)$/.test(k) && typeof j.items[k] === 'string' && j.items[k].length < 200000) { try { JSON.parse(j.items[k]); localStorage.setItem(k, j.items[k]); n++; } catch (x) {} } });
          toast('Imported ' + n + ' items'); dashboard(host);
        } catch (x) { toast('Not a valid progress file'); }
      };
      fr.readAsText(file);
    });
    $('#rst').addEventListener('click', function () {
      if (!confirm('Delete ALL saved progress, bookmarks and notes in this browser?')) return;
      try { Object.keys(localStorage).filter(function (k) { return k.indexOf('d90:') === 0 && k !== 'd90:theme'; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
      dashboard(host); toast('Progress reset');
    });
  }

  async function pageDoc() {
    var key = document.body.dataset.doc, doc = docBy(key), el = $('#md');
    if (!doc) { el.innerHTML = '<div class="empty">Unknown document.</div>'; return; }
    document.title = doc.title + ' | 90 Days of DevOps';
    $('#doc-title').textContent = doc.title; $('#doc-blurb').textContent = doc.blurb;
    $('#doc-crumbs').innerHTML = '<a href="' + PORTAL + '">90 Days</a> › ' + esc(doc.title);
    $('#doc-actions').innerHTML = '<a class="btn small" href="' + MD.githubUrl(doc.file, 'blob') + '" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a><button class="btn small" id="print-btn" type="button">Print / PDF</button>';
    $('#print-btn').addEventListener('click', function () { window.print(); });
    if (key === 'tracker') dashboard($('#dashboard'));
    el.innerHTML = '<p class="loading">Loading from GitHub…</p>';
    try { var res = await MD.load(doc.file); MD.renderInto(el, res.text, { dir: '' }); var h1 = $('h1', el); if (h1) h1.remove(); if (location.hash) { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); } }
    catch (err) { errorBox(el, doc.file, err); }
  }

  async function pageArticles() {
    var grid = $('#articles'), arts = await loadArticles(), f = { q: '', platform: '', tag: '' };
    var plats = Array.from(new Set(arts.map(function (a) { return a.platform; }))).sort();
    var tags = Array.from(new Set([].concat.apply([], arts.map(function (a) { return a.tags || []; })))).sort();
    function chips() {
      $('#plat-chips').innerHTML = ['All'].concat(plats).map(function (p) { var v = p === 'All' ? '' : p; return '<button class="chip button" type="button" data-plat="' + esc(v) + '" aria-pressed="' + (f.platform === v) + '">' + esc(p) + '</button>'; }).join('');
      $('#tag-chips').innerHTML = tags.map(function (t) { return '<button class="chip button" type="button" data-tag="' + esc(t) + '" aria-pressed="' + (f.tag === t) + '">' + esc(t) + '</button>'; }).join('');
    }
    function render() {
      var list = arts.filter(function (a) {
        if (f.platform && a.platform !== f.platform) return false; if (f.tag && (a.tags || []).indexOf(f.tag) === -1) return false;
        return !f.q || (a.title + ' ' + a.summary + ' ' + (a.tags || []).join(' ')).toLowerCase().indexOf(f.q.toLowerCase()) !== -1;
      }).sort(function (x, y) { return String(y.date).localeCompare(String(x.date)); });
      grid.innerHTML = list.length ? list.map(articleCard).join('') : '<div class="empty">' + (arts.length ? 'No articles match.' : 'No articles yet. Add records to <code>assets/data/devops-articles.json</code>.') + '</div>';
      chips();
    }
    $('#a-q').addEventListener('input', function (e) { f.q = e.target.value.trim(); render(); });
    document.addEventListener('click', function (e) {
      var p = e.target.closest('[data-plat]'), t = e.target.closest('[data-tag]');
      if (p) { f.platform = p.dataset.plat; render(); } if (t) { f.tag = f.tag === t.dataset.tag ? '' : t.dataset.tag; render(); }
    });
    var pr = C.profiles; var ext = function (u, t, id) { var a = $(id); if (!a) return; if (safeUrl(u)) { a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer'; } else { a.classList.add('hidden'); } };
    ext(pr.linkedin, 'LinkedIn', '#p-linkedin'); ext(pr.medium, 'Medium', '#p-medium');
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildChrome();
    var page = document.body.dataset.page;
    ({ portal: pagePortal, daily: pageDaily, day: pageDay, doc: pageDoc, articles: pageArticles }[page] || function () {})();
    if (page === 'portal') bindBookmarks(document.body);
  });
})();
