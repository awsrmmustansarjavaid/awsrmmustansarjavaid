/**
 * devops-90-days-markdown-renderer.js
 * ---------------------------------------------------------------------------
 * Loads Markdown from the GitHub repository and renders it safely into the page.
 *
 * Requires (loaded before this file):
 *   - marked        : Markdown -> HTML
 *   - DOMPurify     : HTML sanitiser
 *   - highlight.js  : syntax highlighting (optional)
 *   - devops-90-days-data.js : provides window.D90
 *
 * Exposes: window.D90MD
 * ---------------------------------------------------------------------------
 */
window.D90MD = (function () {
  'use strict';

  var D = window.D90;
  var C = D.CONFIG;

  /** How long a downloaded Markdown file stays cached in sessionStorage (10 minutes). */
  var CACHE_TTL_MS = 10 * 60 * 1000;

  /* ------------------------------------------------------------------------
     URL helpers
     ------------------------------------------------------------------------ */

  /** Build a raw.githubusercontent.com URL for a file inside the content directory. */
  function rawUrl(rel) {
    return 'https://raw.githubusercontent.com/' + C.owner + '/' + C.repo + '/' + C.branch + '/' + C.contentDir + '/' + rel;
  }

  /**
   * Build a github.com URL for a file ("blob") or folder ("tree") inside the content directory.
   * @param {string} rel   Path relative to the content directory (may be empty for the folder itself).
   * @param {string} [kind] "blob" (default) or "tree".
   */
  function githubUrl(rel, kind) {
    return 'https://github.com/' + C.owner + '/' + C.repo + '/' + (kind || 'blob') + '/' + C.branch + '/' +
      C.contentDir + (rel ? '/' + rel : '');
  }

  /** Zero-pad a number to two digits (7 -> "07"). */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /* ------------------------------------------------------------------------
     Loading
     ------------------------------------------------------------------------ */

  /** Fetch a URL and return its body as text; throws on a non-2xx response. */
  async function fetchText(url) {
    var response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error('HTTP ' + response.status + ' for ' + url);
    return response.text();
  }

  /**
   * Load a Markdown file by path relative to the content directory.
   *
   * Lookup order:
   *   1. sessionStorage cache (valid for CACHE_TTL_MS)
   *   2. same-origin copy (GitHub Pages serves the repository)
   *   3. raw.githubusercontent.com
   *
   * @param {string} rel Path such as "day-01/README.md".
   * @returns {Promise<{text: string, source: string}>}
   */
  async function load(rel) {
    var cacheKey = 'd90:md:' + rel;

    // 1. Try the cache first.
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.t < CACHE_TTL_MS) return cached.v;
    } catch (e) { /* storage unavailable or corrupt: fall through to the network */ }

    // 2 and 3. Try each network source in order until one succeeds.
    var sources = [D.SITE_ROOT + C.contentDir + '/' + rel, rawUrl(rel)];
    var lastError;

    for (var i = 0; i < sources.length; i++) {
      try {
        var text = await fetchText(sources[i]);
        var result = { text: text, source: sources[i] };
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), v: result }));
        } catch (e) { /* cache is optional */ }
        return result;
      } catch (e) {
        lastError = e;
      }
    }

    throw lastError || new Error('Could not load ' + rel);
  }

  /* ------------------------------------------------------------------------
     Link rewriting: repository-relative Markdown links -> portal pages
     ------------------------------------------------------------------------ */

  /** URL of a lesson page in the portal. */
  function dayUrl(n) {
    return D.SITE_ROOT + 'pages/devops-90-days/day.html?day=' + n;
  }

  /** URL of a document page in the portal. */
  function docUrl(doc) {
    return D.SITE_ROOT + 'pages/devops-90-days/' + doc.page;
  }

  /** Create a GitHub-style heading id so in-page anchors from the repository keep working. */
  function slug(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s/g, '-');
  }

  /**
   * Decide where a Markdown link should point inside the portal.
   *
   * - "#anchor" and mailto: links are kept as they are
   * - absolute http(s) links open in a new tab
   * - day folders (day-NN/) map to the portal lesson page
   * - known documents map to their portal page
   * - everything else falls back to the matching GitHub file or folder
   *   (this also covers documents that no longer have a portal page)
   *
   * @param {string} href Original href from the Markdown.
   * @param {string} dir  Folder of the Markdown file, used to resolve relative links.
   * @returns {{href: string, external?: boolean}|null} null means "drop this link".
   */
  function rewriteHref(href, dir) {
    if (!href) return null;
    if (href.charAt(0) === '#' || /^mailto:/i.test(href)) return { href: href };
    if (/^https?:\/\//i.test(href)) return { href: href, external: true };

    // Block javascript:, data: and protocol-relative URLs.
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.indexOf('//') === 0) return null;

    // Split "path#hash" and resolve the path relative to the Markdown file's folder.
    var hashIndex = href.indexOf('#');
    var path = hashIndex === -1 ? href : href.slice(0, hashIndex);
    var hash = hashIndex === -1 ? '' : href.slice(hashIndex);
    var base = new URL('https://x.invalid/' + (dir ? dir + '/' : ''));
    var rel;
    try {
      rel = decodeURIComponent(new URL(path || '.', base).pathname.replace(/^\//, ''));
    } catch (e) {
      return null;
    }

    // Link to a lesson folder, e.g. day-07/ or day-07/README.md
    var dayMatch = rel.match(/^day-(\d{2})\/(?:README\.md)?$/);
    if (dayMatch) {
      var n = parseInt(dayMatch[1], 10);
      if (n >= 1 && n <= 90) return { href: dayUrl(n) + hash };
    }

    // Link to a document that has its own portal page
    var doc = D.DOCS.find(function (d) { return d.file === rel; });
    if (doc) return { href: docUrl(doc) + hash };

    // Anything else: open the file or folder on GitHub
    var isDirectory = rel === '' || rel.slice(-1) === '/' || !/\.[A-Za-z0-9]+$/.test(rel);
    return {
      href: githubUrl(rel.replace(/\/$/, ''), isDirectory ? 'tree' : 'blob'),
      external: true
    };
  }

  /* ------------------------------------------------------------------------
     Rendering
     ------------------------------------------------------------------------ */

  /** Convert Markdown to sanitised HTML, or return null when the libraries failed to load. */
  function toHtml(markdown) {
    if (!window.marked || !window.DOMPurify) return null;
    var rawHtml = window.marked.parse(markdown, { gfm: true, breaks: false });
    return window.DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['input'],                          // allow task-list checkboxes
      ADD_ATTR: ['checked', 'disabled', 'type']
    });
  }

  /** Attach a "Copy" button to a code block. */
  function addCopyButton(wrapper, code) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Fallback for browsers without the async Clipboard API.
    function legacyCopy() {
      var area = document.createElement('textarea');
      area.value = code.textContent;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        showCopied();
      } catch (e) {
        button.textContent = 'Press Ctrl+C';
      }
      area.remove();
    }

    function showCopied() {
      button.textContent = 'Copied';
      setTimeout(function () { button.textContent = 'Copy'; }, 1400);
    }

    button.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.textContent).then(showCopied, legacyCopy);
      } else {
        legacyCopy();
      }
    });

    wrapper.appendChild(button);
  }

  /**
   * Post-process freshly rendered HTML: heading ids, safe links, safe images,
   * scrollable tables, task lists and code blocks.
   */
  function post(el, ctx) {
    var dir = (ctx && ctx.dir) || '';
    var usedIds = {};

    // Headings: unique GitHub-style ids.
    el.querySelectorAll('h1,h2,h3,h4').forEach(function (heading) {
      var id = slug(heading.textContent);
      var base = id;
      var counter = 1;
      while (usedIds[id]) id = base + '-' + (counter++);
      usedIds[id] = 1;
      heading.id = id;
    });

    // Links: rewrite to portal pages, open external links safely in a new tab.
    el.querySelectorAll('a[href]').forEach(function (link) {
      var target = rewriteHref(link.getAttribute('href'), dir);
      if (!target) { link.removeAttribute('href'); return; }
      link.setAttribute('href', target.href);
      if (target.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });

    // Images: allow https, map repository-relative paths to raw GitHub URLs, drop everything else.
    el.querySelectorAll('img').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (/^https:\/\//i.test(src)) {
        // already a safe absolute URL
      } else if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src.indexOf('//') === 0) {
        img.remove();
        return;
      } else {
        try {
          var base = new URL('https://x.invalid/' + (dir ? dir + '/' : ''));
          img.src = rawUrl(decodeURIComponent(new URL(src, base).pathname.replace(/^\//, '')));
        } catch (e) {
          img.remove();
          return;
        }
      }
      img.loading = 'lazy';
    });

    // Tables: scroll inside their own wrapper so wide tables never break the layout.
    el.querySelectorAll('table').forEach(function (table) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-wrap';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Task-list items: mark list items that contain a checkbox.
    el.querySelectorAll('li > input[type=checkbox]').forEach(function (checkbox) {
      checkbox.parentNode.classList.add('task');
    });

    // Code blocks: syntax highlighting plus a copy button.
    el.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      if (window.hljs) {
        try { window.hljs.highlightElement(code); } catch (e) { /* highlighting is optional */ }
      }
      var wrapper = document.createElement('div');
      wrapper.className = 'codeblock';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      addCopyButton(wrapper, code);
    });
  }

  /**
   * Render Markdown into an element. Never inserts unsanitised HTML.
   * @param {HTMLElement} el Target element.
   * @param {string} md      Markdown source.
   * @param {{dir?: string}} [ctx] Folder of the Markdown file (for relative links and images).
   * @returns {boolean} true when rendered as HTML, false when it fell back to plain text.
   */
  function renderInto(el, md, ctx) {
    var html = toHtml(md);

    // CDN libraries missing: degrade to plain text, never to raw HTML.
    if (html === null) {
      el.textContent = '';

      var note = document.createElement('p');
      note.className = 'muted';
      note.textContent = 'Markdown renderer could not load (check your connection). Showing plain text.';

      var pre = document.createElement('pre');
      pre.textContent = md;
      pre.style.whiteSpace = 'pre-wrap';

      el.appendChild(note);
      el.appendChild(pre);
      return false;
    }

    el.innerHTML = html; // safe: html was sanitised by DOMPurify in toHtml()
    post(el, ctx);
    return true;
  }

  /** Estimated reading time in minutes at roughly 200 words per minute. */
  function readingMinutes(text) {
    return Math.max(1, Math.round(text.split(/\s+/).length / 200));
  }

  /* ------------------------------------------------------------------------
     Public API
     ------------------------------------------------------------------------ */
  return {
    load: load,
    renderInto: renderInto,
    rewriteHref: rewriteHref,
    slug: slug,
    readingMinutes: readingMinutes,
    rawUrl: rawUrl,
    githubUrl: githubUrl,
    pad: pad
  };
})();
