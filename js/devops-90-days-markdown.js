/**
 * 90 Days of DevOps — repository Markdown loader and safe renderer
 * ---------------------------------------------------------------------------
 * Reads the published README.md files in DEVOPS-90-DAYS directly.
 * - No GitHub API, token, custom workflow, Jekyll, or server-side code.
 * - Same-origin GitHub Pages files are preferred; raw GitHub is a fallback.
 * - Markdown is parsed with Marked and sanitised with DOMPurify.
 * - Day-card metadata is extracted from each day's README.md.
 * ---------------------------------------------------------------------------
 */
window.D90MD = (function () {
  'use strict';

  var D = window.D90;
  var C = D.CONFIG.repository;
  var TTL = Math.max(1, Number(C.cacheMinutes) || 2) * 60 * 1000;
  var memory = Object.create(null);

  function pad(number) { return String(number).padStart(2, '0'); }
  function dayPath(number) { return 'day-' + pad(number) + '/README.md'; }

  function rawUrl(relativePath) {
    var encoded = relativePath.split('/').map(encodeURIComponent).join('/');
    return 'https://raw.githubusercontent.com/' +
      encodeURIComponent(C.owner) + '/' + encodeURIComponent(C.repo) + '/' +
      encodeURIComponent(C.branch) + '/' +
      C.contentDir.split('/').map(encodeURIComponent).join('/') + '/' + encoded;
  }

  function sameOriginUrl(relativePath) {
    return D.SITE_ROOT + C.contentDir.replace(/^\/+|\/+$/g, '') + '/' + relativePath;
  }

  async function fetchText(url) {
    // Minute-based query parameter avoids stale browser/CDN responses after a commit.
    var version = Math.floor(Date.now() / 60000);
    var separator = url.indexOf('?') === -1 ? '?' : '&';
    var response = await fetch(url + separator + 'v=' + version, { cache: 'no-store' });
    if (!response.ok) throw new Error('HTTP ' + response.status + ' while loading ' + url);
    return response.text();
  }

  async function load(relativePath) {
    var key = 'd90:repository-md:' + relativePath;
    var now = Date.now();
    if (memory[key] && now - memory[key].time < TTL) return memory[key].text;

    try {
      var stored = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (stored && now - stored.time < TTL && typeof stored.text === 'string') {
        memory[key] = stored;
        return stored.text;
      }
    } catch (error) { /* Browser storage is optional. */ }

    var sources = [sameOriginUrl(relativePath), rawUrl(relativePath)];
    var lastError;
    for (var index = 0; index < sources.length; index++) {
      try {
        var text = await fetchText(sources[index]);
        var result = { time: Date.now(), text: text };
        memory[key] = result;
        try { sessionStorage.setItem(key, JSON.stringify(result)); } catch (error) { /* Cache is optional. */ }
        return text;
      } catch (error) { lastError = error; }
    }
    throw lastError || new Error('Unable to load ' + relativePath);
  }

  function cleanText(value) {
    return String(value || '').replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/`/g, '').trim();
  }

  function parseDayMetadata(markdown, existing) {
    var day = Object.assign({}, existing);
    var heading = markdown.match(/^#\s+Day\s+0?(\d{1,2})\s*[—–-]\s*(.+)$/mi);
    if (heading) {
      day.n = Number(heading[1]);
      day.title = cleanText(heading[2]);
    }

    var phase = markdown.match(/^\|\s*\*\*Phase\*\*\s*\|\s*Phase\s+(\d+)\s*[-–—]\s*([^|]+)\|/mi);
    if (phase) {
      day.phase = Number(phase[1]);
      day.phaseName = cleanText(phase[2]);
    }

    var week = markdown.match(/^\|\s*\*\*Week\*\*\s*\|\s*Week\s+(\d+)\s*[—–-]\s*([^|]+)\|/mi);
    if (week) {
      day.week = Number(week[1]);
      day.weekName = cleanText(week[2]);
    }

    var difficulty = markdown.match(/^\|\s*\*\*Difficulty\*\*\s*\|\s*([^|]+)\|/mi);
    if (difficulty) day.diff = cleanText(difficulty[1]);

    var time = markdown.match(/^\|\s*\*\*Estimated time\*\*\s*\|\s*([\d.]+)\s*hours?\s*\|/mi);
    if (time) day.mins = Math.round(Number(time[1]) * 60);

    var rule = markdown.match(/^>\s*\*\*Rule for today:\*\*\s*(.+)$/mi);
    if (rule) {
      day.summary = cleanText(rule[1]).replace(/\s+/g, ' ');
    } else {
      var objectiveSection = markdown.match(/^##\s+\d+\.\s+Daily Objectives\s*\n([\s\S]*?)(?=^##\s|\s*$)/mi);
      if (objectiveSection) {
        var objective = objectiveSection[1].match(/^-\s*\[.\]\s*(.+)$/mi) || objectiveSection[1].match(/^-\s*(.+)$/m);
        if (objective) day.summary = cleanText(objective[1]);
      }
    }

    day.capstone = /capstone/i.test(day.title || '');
    day.searchText = markdown.toLowerCase();
    day.markdownLoaded = true;
    return day;
  }

  async function loadDay(number) {
    var relativePath = dayPath(number);
    var text = await load(relativePath);
    return { text: text, path: relativePath, directory: 'day-' + pad(number) };
  }

  async function loadDayIndex(days, onProgress) {
    var cursor = 0;
    var completed = 0;
    var failed = [];
    var workers = Array.from({ length: 8 }, async function () {
      while (cursor < days.length) {
        var index = cursor++;
        var day = days[index];
        try {
          var markdown = await load(dayPath(day.n));
          days[index] = parseDayMetadata(markdown, day);
        } catch (error) {
          failed.push(day.n);
        }
        completed++;
        if (typeof onProgress === 'function') onProgress(completed, days.length, failed.slice());
      }
    });
    await Promise.all(workers);
    return { loaded: days.length - failed.length, failed: failed };
  }

  function githubFileUrl(relativePath) {
    return 'https://github.com/' + C.owner + '/' + C.repo + '/blob/' + C.branch + '/' +
      C.contentDir + '/' + relativePath;
  }

  function dayPageUrl(number) {
    return D.SITE_ROOT + 'pages/devops-90-days/day.html?day=' + number;
  }

  function docPageUrl(doc) {
    return D.SITE_ROOT + 'pages/devops-90-days/' + doc.page;
  }

  function slug(value) {
    return value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }

  function rewriteLink(href, directory) {
    if (!href) return null;
    if (href.charAt(0) === '#' || /^mailto:/i.test(href)) return { href: href };
    if (/^https?:\/\//i.test(href)) return { href: href, external: true };
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.indexOf('//') === 0) return null;

    var hashAt = href.indexOf('#');
    var path = hashAt < 0 ? href : href.slice(0, hashAt);
    var hash = hashAt < 0 ? '' : href.slice(hashAt);
    var resolved;
    try {
      resolved = decodeURIComponent(new URL(path || '.', 'https://d90.invalid/' + (directory ? directory + '/' : '')).pathname.replace(/^\//, ''));
    } catch (error) { return null; }

    var match = resolved.match(/^day-(\d{2})\/(?:README\.md)?$/i);
    if (match) return { href: dayPageUrl(Number(match[1])) + hash };

    var doc = (D.DOCS || []).find(function (item) { return item.file.toLowerCase() === resolved.toLowerCase(); });
    if (doc) return { href: docPageUrl(doc) + hash };

    var isDirectory = !/\.[a-z0-9]+$/i.test(resolved) || /\/$/.test(resolved);
    return { href: githubFileUrl(resolved.replace(/\/$/, '')), external: true, directory: isDirectory };
  }

  function postProcess(element, context) {
    var directory = context && context.directory || '';
    var ids = Object.create(null);
    element.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (heading) {
      var base = slug(heading.textContent) || 'section';
      var id = base;
      var suffix = 2;
      while (ids[id]) id = base + '-' + suffix++;
      ids[id] = true;
      heading.id = id;
    });

    element.querySelectorAll('a[href]').forEach(function (link) {
      var target = rewriteLink(link.getAttribute('href'), directory);
      if (!target) { link.removeAttribute('href'); return; }
      link.href = target.href;
      if (target.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    });

    element.querySelectorAll('img').forEach(function (img) {
      var source = img.getAttribute('src') || '';
      if (/^https:\/\//i.test(source)) {
        // Safe HTTPS image URL already supplied by the Markdown.
      } else if (/^[a-z][a-z0-9+.-]*:/i.test(source) || source.indexOf('//') === 0) {
        img.remove(); return;
      } else {
        try {
          var relative = decodeURIComponent(new URL(source, 'https://d90.invalid/' + (directory ? directory + '/' : '')).pathname.replace(/^\//, ''));
          img.src = rawUrl(relative);
        } catch (error) { img.remove(); return; }
      }
      img.loading = 'lazy';
      img.alt = img.alt || 'Lesson image';
    });

    element.querySelectorAll('table').forEach(function (table) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-wrap';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    element.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      var wrapper = document.createElement('div');
      wrapper.className = 'codeblock';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-btn';
      button.textContent = 'Copy code';
      button.addEventListener('click', function () {
        var copy = navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard.writeText(code.textContent)
          : Promise.reject(new Error('Clipboard unavailable'));
        copy.then(function () { button.textContent = 'Copied'; }, function () { button.textContent = 'Select code and press Ctrl+C'; });
        window.setTimeout(function () { button.textContent = 'Copy code'; }, 1800);
      });
      wrapper.appendChild(button);
    });
  }

  function renderInto(element, markdown, context) {
    if (!window.marked || !window.DOMPurify) {
      element.textContent = 'The Markdown renderer could not load. Check your internet connection and reload this page.';
      return false;
    }
    var html = window.marked.parse(markdown, { gfm: true, breaks: false });
    html = window.DOMPurify.sanitize(html, {
      ADD_TAGS: ['input'],
      ADD_ATTR: ['checked', 'disabled', 'type', 'start', 'open']
    });
    element.innerHTML = html;
    postProcess(element, context || {});
    return true;
  }

  return {
    load: load,
    loadDay: loadDay,
    loadDayIndex: loadDayIndex,
    parseDayMetadata: parseDayMetadata,
    renderInto: renderInto,
    rawUrl: rawUrl,
    dayPath: dayPath
  };
})();
