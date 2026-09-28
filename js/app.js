/* ================================================================
   DEVOPS SHOWCASE — js/app.js
   ================================================================
   Entry point. Runs once the page has loaded, and is responsible
   for exactly three things:

     1. Kick off ContentLoader.loadAll() to fetch + parse every
        Markdown category from GitHub.
     2. Hand the results to Render.* to draw them on the page.
     3. Small page-level UI behavior that isn't content-related
        (active nav-link highlighting on scroll, mobile nav toggle).

   Load order matters — this file must be the LAST <script> tag in
   index.html, after config.js, github-api.js, markdown-parser.js,
   content-loader.js, and render.js, since it uses all of them.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProfileContent();
  initActivityContent();
  initScrollSpyNav();
  initMobileNavToggle();
});

/**
 * Loads activity/about.md and activity/experience.md and renders
 * them into the Hero/About/Experience sections. Runs independently
 * of initActivityContent() (projects/labs/learning/journal) so a
 * problem in one never blocks the other from displaying.
 */
async function initProfileContent() {
  try {
    const [about, experience] = await Promise.all([
      ContentLoader.loadAbout(),
      ContentLoader.loadExperience(),
    ]);
    Render.renderAbout(about);
    // Home shows only the newest N jobs; pages/experience.html shows all.
    Render.renderExperience(experience && { ...experience, jobs: experience.jobs.slice(0, CONFIG.homePreviewCount) });
  } catch (err) {
    // Missing about.md/experience.md, or a network hiccup — not
    // fatal. index.html's built-in placeholder text stays visible.
    console.warn('Could not load about.md / experience.md, showing placeholders:', err);
  }
}

/**
 * Loads all Markdown-driven content from GitHub and renders it into
 * the page's Projects / Labs / Currently Learning / Latest Activity
 * sections. Runs independently of the rest of the (static) page, so
 * a slow or failed GitHub API call never blocks the hero/about/
 * experience sections from displaying instantly.
 */
async function initActivityContent() {
  try {
    const data = await ContentLoader.loadAll();

    // Home is a SHORT preview: newest N items per section. Full lists
    // live on pages/*.html (the "View all →" buttons).
    const n = CONFIG.homePreviewCount;
    Render.renderProjects(data.projects.slice(0, n));
    Render.renderLabs(data.labs.slice(0, n));
    Render.renderLearning(data.learning.slice(0, n));
    Render.renderJournal(data.journal.slice(0, n));

    // Challenges load separately (they are not part of loadAll()).
    const ch = ContentLoader.sortByDateDesc(await ContentLoader.loadCategory(CONFIG.categories.challenges));
    Render.renderChallenges(ch.slice(0, n));

  } catch (err) {
    // Network hiccup, GitHub API rate limit, etc. — fail gracefully
    // rather than leaving the visitor looking at a broken page.
    console.error('Failed to load activity content from GitHub:', err);

    ['projects-grid', 'labs-grid', 'learning-grid', 'journal-feed', 'challenges-grid'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = `<p class="empty-state">
          Couldn't load live content right now (GitHub API may be rate-limited).
          Please refresh in a few minutes.
        </p>`;
      }
    });
  }
}

/**
 * Highlights the nav link matching whichever section is currently
 * scrolled into view, using an IntersectionObserver (efficient —
 * only reacts to actual visibility changes, not every scroll pixel).
 */
function initScrollSpyNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Toggles the mobile navigation menu open/closed when the hamburger
 * button is tapped. No-ops safely if those elements aren't present.
 */
function initMobileNavToggle() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu automatically after a link is tapped.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
