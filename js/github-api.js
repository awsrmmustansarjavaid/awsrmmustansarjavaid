/* ================================================================
   DEVOPS SHOWCASE — js/github-api.js
   ================================================================
   Thin wrapper around the public, unauthenticated GitHub REST API.

   This is the "discovery" layer described in README-showcase.md:
   it answers two questions for the rest of the app —

     1. "What .md files currently exist in activity/<category>/?"
     2. "What is the raw text content of a given .md file?"

   Every response is cached in localStorage for CONFIG.cacheDurationMinutes
   so that repeat visits (and repeat sections on the same page) don't
   re-hit the GitHub API and burn through its rate limit.
   ================================================================ */

const GitHubAPI = (() => {

  /**
   * Reads a cached value from localStorage if it exists and hasn't
   * expired yet. Returns null on a cache miss/expiry so the caller
   * knows to fetch fresh data.
   * @param {string} key - unique cache key (usually the API URL)
   * @returns {any|null}
   */
  function readCache(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const { timestamp, data } = JSON.parse(raw);
      const ageMinutes = (Date.now() - timestamp) / 1000 / 60;

      if (ageMinutes > CONFIG.cacheDurationMinutes) {
        // Expired — treat as a miss.
        return null;
      }
      return data;
    } catch (err) {
      // Corrupted cache entry or localStorage unavailable
      // (e.g. private browsing mode) — just fall back to fetching.
      return null;
    }
  }

  /**
   * Writes a value into localStorage alongside the current time,
   * so readCache() can later tell whether it has expired.
   */
  function writeCache(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    } catch (err) {
      // Storage full or disabled — not fatal, the site just won't cache.
      console.warn('GitHubAPI: could not write cache for', key, err);
    }
  }

  /**
   * Lists the contents of a folder in the configured repo using the
   * GitHub "contents" API:
   *   GET /repos/{owner}/{repo}/contents/{path}?ref={branch}
   *
   * @param {string} path - folder path relative to the repo root,
   *                         e.g. "activity/projects"
   * @returns {Promise<Array>} array of {name, path, type, download_url}
   *          Returns an empty array (never throws) if the folder is
   *          missing or the API call fails, so a missing category
   *          doesn't crash the whole page.
   */
  async function listDirectory(path) {
    const cacheKey = `gh-dir:${CONFIG.githubUsername}/${CONFIG.githubRepo}/${path}`;
    const cached = readCache(cacheKey);
    if (cached) return cached;

    const url = `https://api.github.com/repos/${CONFIG.githubUsername}/${CONFIG.githubRepo}/contents/${path}?ref=${CONFIG.branch}`;

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) {
        // 404 = folder doesn't exist yet (e.g. you haven't created
        // activity/journal/ yet) — treat as "no files", not an error.
        console.warn(`GitHubAPI: ${path} returned ${response.status}`);
        return [];
      }

      const items = await response.json();

      // Only keep actual files ending in .md — ignore sub-folders,
      // images, or anything else someone drops in that directory.
      const markdownFiles = items.filter(
        (item) => item.type === 'file' && item.name.toLowerCase().endsWith('.md')
      );

      writeCache(cacheKey, markdownFiles);
      return markdownFiles;

    } catch (err) {
      console.error(`GitHubAPI: failed to list ${path}`, err);
      return [];
    }
  }

  /**
   * Fetches the raw text of a single, known file path directly from
   * raw.githubusercontent.com — no "list directory" call needed
   * first, since we already know the exact path (used for singleton
   * files like activity/about.md and activity/experience.md, as
   * opposed to a whole folder of unknown filenames like
   * activity/projects/).
   *
   * @param {string} path - repo-relative path, e.g. "activity/about.md"
   * @returns {Promise<string>} raw file text, or '' on failure
   */
  async function fetchRawByPath(path) {
    const url = `https://raw.githubusercontent.com/${CONFIG.githubUsername}/${CONFIG.githubRepo}/${CONFIG.branch}/${path}`;
    return fetchRawFile(url);
  }

  /**
   * Fetches the raw text content of a single file from its
   * download_url (the raw.githubusercontent.com link GitHub's API
   * gives us — no auth needed for public repos).
   *
   * @param {string} downloadUrl
   * @returns {Promise<string>} the raw file text, or '' on failure
   */
  async function fetchRawFile(downloadUrl) {
    const cacheKey = `gh-file:${downloadUrl}`;
    const cached = readCache(cacheKey);
    if (cached !== null) return cached;

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        console.warn(`GitHubAPI: failed to fetch ${downloadUrl} (${response.status})`);
        return '';
      }
      const text = await response.text();
      writeCache(cacheKey, text);
      return text;
    } catch (err) {
      console.error(`GitHubAPI: error fetching ${downloadUrl}`, err);
      return '';
    }
  }

  // Public API of this module
  return { listDirectory, fetchRawFile, fetchRawByPath };

})();
