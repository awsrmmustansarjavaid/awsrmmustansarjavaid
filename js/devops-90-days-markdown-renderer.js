/* markdown-renderer.js - loads Markdown from your repo and renders it safely.
   Needs (loaded before this file): marked, DOMPurify, highlight.js (optional), devops-90-days-data.js */
window.D90MD = (function () {
  'use strict';
  var D = window.D90, C = D.CONFIG;
  var TTL = 10 * 60 * 1000;

  function rawUrl(rel) {
    return 'https://raw.githubusercontent.com/' + C.owner + '/' + C.repo + '/' + C.branch + '/' + C.contentDir + '/' + rel;
  }
  function githubUrl(rel, kind) {
    return 'https://github.com/' + C.owner + '/' + C.repo + '/' + (kind || 'blob') + '/' + C.branch + '/' + C.contentDir + (rel ? '/' + rel : '');
  }
  function pad(n) { return String(n).padStart(2, '0'); }

  async function fetchText(url) {
    var r = await fetch(url, { cache: 'no-cache' });
    if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
    return r.text();
  }

  /** Load a Markdown file by path relative to the content directory.
   *  Order: same-origin copy (GitHub Pages serves your repo) -> raw.githubusercontent.com. */
  async function load(rel) {
    var key = 'd90:md:' + rel;
    try {
      var c = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (c && Date.now() - c.t < TTL) return c.v;
    } catch (e) {}
    var sources = [D.SITE_ROOT + C.contentDir + '/' + rel, rawUrl(rel)];
    var err;
    for (var i = 0; i < sources.length; i++) {
      try {
        var text = await fetchText(sources[i]);
        var v = { text: text, source: sources[i] };
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: v })); } catch (e) {}
        return v;
      } catch (e) { err = e; }
    }
    throw err || new Error('Could not load ' + rel);
  }

  function slug(s) {
    return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s/g, '-');
  }

  /* ---- link rewriting: repo-relative Markdown links -> portal pages ---- */
  function dayUrl(n) { return D.SITE_ROOT + 'pages/devops-90-days/day.html?day=' + n; }
  function docUrl(d) { return D.SITE_ROOT + 'pages/devops-90-days/' + d.page; }

  function rewriteHref(href, dir) {
    if (!href) return null;
    if (href.charAt(0) === '#' || /^mailto:/i.test(href)) return { href: href };
    if (/^https?:\/\//i.test(href)) return { href: href, external: true };
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.indexOf('//') === 0) return null; // javascript:, data:, etc.
    var hi = href.indexOf('#');
    var path = hi === -1 ? href : href.slice(0, hi);
    var hash = hi === -1 ? '' : href.slice(hi);
    var base = new URL('https://x.invalid/' + (dir ? dir + '/' : ''));
    var rel;
    try { rel = decodeURIComponent(new URL(path || '.', base).pathname.replace(/^\//, '')); } catch (e) { return null; }
    var m = rel.match(/^day-(\d{2})\/(?:README\.md)?$/);
    if (m) { var n = parseInt(m[1], 10); if (n >= 1 && n <= 90) return { href: dayUrl(n) + hash }; }
    var doc = D.DOCS.find(function (d) { return d.file === rel; });
    if (doc) return { href: docUrl(doc) + hash };
    var isDir = rel === '' || rel.slice(-1) === '/' || !/\.[A-Za-z0-9]+$/.test(rel);
    return { href: githubUrl(rel.replace(/\/$/, ''), isDir ? 'tree' : 'blob'), external: true };
  }

  function toHtml(md) {
    if (!window.marked || !window.DOMPurify) return null;
    var raw = window.marked.parse(md, { gfm: true, breaks: false });
    return window.DOMPurify.sanitize(raw, { ADD_TAGS: ['input'], ADD_ATTR: ['checked', 'disabled', 'type'] });
  }

  function post(el, ctx) {
    var dir = (ctx && ctx.dir) || '';
    var used = {};
    // headings: GitHub-style ids so in-page anchors from the repo keep working
    el.querySelectorAll('h1,h2,h3,h4').forEach(function (h) {
      var id = slug(h.textContent), base = id, i = 1;
      while (used[id]) id = base + '-' + (i++);
      used[id] = 1; h.id = id;
    });
    // links
    el.querySelectorAll('a[href]').forEach(function (a) {
      var r = rewriteHref(a.getAttribute('href'), dir);
      if (!r) { a.removeAttribute('href'); return; }
      a.setAttribute('href', r.href);
      if (r.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    });
    // images
    el.querySelectorAll('img').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (/^https:\/\//i.test(src)) { /* ok */ }
      else if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src.indexOf('//') === 0) { img.remove(); return; }
      else {
        try { img.src = rawUrl(decodeURIComponent(new URL(src, new URL('https://x.invalid/' + (dir ? dir + '/' : ''))).pathname.replace(/^\//, ''))); }
        catch (e) { img.remove(); return; }
      }
      img.loading = 'lazy';
    });
    // tables scroll inside their own wrapper
    el.querySelectorAll('table').forEach(function (t) {
      var w = document.createElement('div'); w.className = 'table-wrap';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
    // task-list items
    el.querySelectorAll('li > input[type=checkbox]').forEach(function (cb) { cb.parentNode.classList.add('task'); });
    // code blocks: highlight + copy button
    el.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      if (window.hljs) { try { window.hljs.highlightElement(code); } catch (e) {} }
      var wrap = document.createElement('div'); wrap.className = 'codeblock';
      pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(pre);
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'copy-btn'; btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', function () {
        var text = code.textContent;
        var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
        else fallback();
        function fallback() {
          var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) { btn.textContent = 'Press Ctrl+C'; }
          ta.remove();
        }
      });
      wrap.appendChild(btn);
    });
  }

  /** Render Markdown into an element. Never inserts unsanitised HTML. */
  function renderInto(el, md, ctx) {
    var html = toHtml(md);
    if (html === null) {            // CDN libraries missing: degrade to plain text, never raw HTML
      el.textContent = '';
      var note = document.createElement('p'); note.className = 'muted';
      note.textContent = 'Markdown renderer could not load (check your connection). Showing plain text.';
      var pre = document.createElement('pre'); pre.textContent = md; pre.style.whiteSpace = 'pre-wrap';
      el.appendChild(note); el.appendChild(pre);
      return false;
    }
    el.innerHTML = html;            // html is DOMPurify-sanitised above
    post(el, ctx);
    return true;
  }

  function readingMinutes(text) { return Math.max(1, Math.round((text.split(/\s+/).length) / 200)); }

  return { load: load, renderInto: renderInto, rewriteHref: rewriteHref, slug: slug, readingMinutes: readingMinutes, rawUrl: rawUrl, githubUrl: githubUrl, pad: pad };
})();
