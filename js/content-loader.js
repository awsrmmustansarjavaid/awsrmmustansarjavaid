/* ================================================================
   DEVOPS SHOWCASE — js/content-loader.js
   ================================================================
   Sits between the raw data layer (github-api.js + markdown-parser.js)
   and the rendering layer (render.js).

   Its job: given a category name ("projects", "labs", "learning",
   "journal"), return a clean, ready-to-render array of content
   objects — already fetched, parsed, and sorted.

   This is the layer you'd extend if you later add a new category
   (e.g. "experiments") or change how items are sorted/filtered.
   ================================================================ */

const ContentLoader = (() => {

  /**
   * Loads every Markdown file inside activity/<categoryFolder>/,
   * parses each one, and returns an array of content items shaped
   * like:
   *   {
   *     slug: "aws-docker-lab",       // filename without .md
   *     meta: { title, type, status, date, technologies, ... },
   *     html: "<h1>...</h1>...",      // rendered Markdown body
   *   }
   *
   * Files that fail to fetch or parse are skipped (with a console
   * warning) rather than breaking the whole category.
   *
   * @param {string} categoryFolder - e.g. CONFIG.categories.projects
   * @returns {Promise<Array>}
   */
  async function loadCategory(categoryFolder) {
    const path = `${CONFIG.activityPath}/${categoryFolder}`;
    const files = await GitHubAPI.listDirectory(path);

    // Fetch + parse every file in parallel for speed.
    const items = await Promise.all(
      files.map(async (file) => {
        try {
          const raw = await GitHubAPI.fetchRawFile(file.download_url);
          if (!raw) return null;

          const { meta, html } = MarkdownParser.parse(raw);
          const slug = file.name.replace(/\.md$/i, '');

          return { slug, meta, html };
        } catch (err) {
          console.warn(`ContentLoader: skipping ${file.name} —`, err);
          return null;
        }
      })
    );

    // Drop any files that failed to load/parse.
    return items.filter(Boolean);
  }

  /** Sorts content items newest-first by their front matter "date" field. */
  function sortByDateDesc(items) {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.meta.date || 0);
      const dateB = new Date(b.meta.date || 0);
      return dateB - dateA;
    });
  }

  /**
   * Loads activity/about.md — your name, tagline, bio, location,
   * contact links, and quote. Returns null (never throws) if the
   * file is missing, so the page can fall back to whatever is
   * already written in index.html.
   * @returns {Promise<{meta: Object, html: string}|null>}
   */
  async function loadAbout() {
    const raw = await GitHubAPI.fetchRawByPath(`${CONFIG.profilePath}/about.md`);
    if (!raw) return null;
    return MarkdownParser.parse(raw);
  }

  /**
   * Loads activity/experience.md — your LinkedIn URL plus the list
   * of jobs shown in the Professional Experience section. Returns
   * null if the file is missing.
   * @returns {Promise<{linkedin: string, jobs: Array}|null>}
   */
  async function loadExperience() {
    const raw = await GitHubAPI.fetchRawByPath(`${CONFIG.profilePath}/experience.md`);
    if (!raw) return null;
    return MarkdownParser.parseExperience(raw);
  }

  /**
   * Loads every category defined in CONFIG.categories, in parallel,
   * and returns them all together as one object:
   *   { projects: [...], labs: [...], learning: [...], journal: [...] }
   */
  async function loadAll() {
    const [projects, labs, learning, journal] = await Promise.all([
      loadCategory(CONFIG.categories.projects),
      loadCategory(CONFIG.categories.labs),
      loadCategory(CONFIG.categories.learning),
      loadCategory(CONFIG.categories.journal),
    ]);

    return {
      projects: sortByDateDesc(projects),
      labs: sortByDateDesc(labs),
      learning: sortByDateDesc(learning),
      journal: sortByDateDesc(journal),
    };
  }

  return { loadCategory, loadAll, sortByDateDesc, loadAbout, loadExperience };

})();
