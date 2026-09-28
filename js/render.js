/* ================================================================
   DEVOPS SHOWCASE — js/render.js
   ================================================================
   Pure presentation layer: takes the content objects produced by
   content-loader.js and turns them into DOM elements.

   Nothing in this file talks to the network — it only reads
   `item.meta` / `item.html` and builds HTML strings. This keeps
   "fetching data" and "displaying data" cleanly separated, so you
   can change the visual design here without touching how content
   is loaded, and vice versa.
   ================================================================ */

const Render = (() => {

  /** Escapes text that gets interpolated into innerHTML, to avoid
   *  accidentally breaking markup if a title contains special
   *  characters like < or &. */
  function escapeHtml(str = '') {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /** Turns a status string ("completed", "in-progress", ...) into a
   *  small colored badge's HTML. */
  function statusBadge(status) {
    const normalized = (status || 'planned').toLowerCase();

    const labels = {
      completed: '✓ Completed',
      'in-progress': '● In Progress',
      learning: '● Learning',
      planned: '○ Planned',
      paused: '❙❙ Paused',
      archived: '◆ Archived',
    };

    const label = labels[normalized] || `● ${status}`;
    return `<span class="badge badge-${normalized}">${label}</span>`;
  }

  /** Renders the small row of technology "chips" under a card. */
  function techChips(technologies = []) {
    if (!Array.isArray(technologies) || technologies.length === 0) return '';
    return `<div class="chip-row">${technologies
      .map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`)
      .join('')}</div>`;
  }

  /**
   * Builds one project or lab card. Both content types share the
   * same visual shape (title, description, tech chips, repo link),
   * so a single function handles both.
   */
  function buildProjectOrLabCard(item) {
    const { meta, slug } = item;
    const title = escapeHtml(meta.title || slug);
    const description = escapeHtml(meta.description || '');
    const repoUrl = meta.repository || '#';

    return `
      <article class="card project-card">
        <div class="card-top">
          <h3>${title}</h3>
          ${statusBadge(meta.status)}
        </div>
        <p class="card-desc">${description}</p>
        ${techChips(meta.technologies)}
        <a class="card-link" href="${repoUrl}" target="_blank" rel="noopener">
          View Repository →
        </a>
      </article>
    `;
  }

  /**
   * Builds one "Currently Learning" card with a progress bar.
   * The progress percentage comes from meta.progress (0–100); if
   * it's missing, the bar is simply omitted rather than guessed.
   */
  function buildLearningCard(item) {
    const { meta, slug } = item;
    const title = escapeHtml(meta.title || slug);
    const note = escapeHtml(meta.description || '');
    const progress = Number(meta.progress);
    const hasProgress = !Number.isNaN(progress) && progress >= 0 && progress <= 100;

    return `
      <div class="card learning-card">
        <div class="card-top">
          <h4>${title}</h4>
          ${statusBadge(meta.status)}
        </div>
        ${hasProgress ? `
          <div class="progress-track">
            <div class="progress-fill" style="width:${progress}%"></div>
          </div>
          <p class="progress-note">${progress}% — ${note}</p>
        ` : `<p class="progress-note">${note}</p>`}
      </div>
    `;
  }

  /** Builds one row in the "Latest Activity" journal feed. */
  function buildJournalItem(item) {
    const { meta } = item;
    const title = escapeHtml(meta.title || 'Untitled entry');
    const summary = escapeHtml(meta.description || '');
    const date = meta.date
      ? new Date(meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
      : '';

    return `
      <div class="journal-item">
        <span class="journal-dot"></span>
        <div>
          <h4>${title}</h4>
          <p class="card-desc">${summary}</p>
          <span class="journal-date">${date}</span>
        </div>
      </div>
    `;
  }

  /**
   * Fills a container element with cards built from a list of items,
   * using the given card-builder function. Shows a friendly empty
   * state instead of a blank section if there's no content yet.
   */
  function renderInto(containerId, items, buildFn, emptyMessage) {
    const container = document.getElementById(containerId);
    if (!container) return; // section not present on this page — skip safely

    if (!items || items.length === 0) {
      container.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
      return;
    }

    container.innerHTML = items.map(buildFn).join('');
  }

  /**
   * Fills in the Hero and About Me sections from activity/about.md's
   * front matter. Every field is optional — if about.md is missing
   * a field (or the whole file), the existing placeholder text
   * already written in index.html is left untouched, so the page
   * never ends up with blank gaps.
   * @param {{meta: Object, html: string}|null} about
   */
  function renderAbout(about) {
    if (!about) return; // no about.md yet — keep index.html's placeholders
    const { meta, html } = about;

    const setText = (id, value) => {
      if (value === undefined) return;
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    const setHtml = (id, value) => {
      if (value === undefined) return;
      const el = document.getElementById(id);
      if (el) el.innerHTML = value;
    };
    const setHref = (id, value) => {
      if (!value) return;
      const el = document.getElementById(id);
      if (el) el.href = value;
    };
    const setSrc = (id, value) => {
      if (!value) return;
      const el = document.getElementById(id);
      if (el) el.src = value;
    };

    setText('brand-name', meta.name);
    setText('brand-tagline', meta.title);
    setHtml('hero-name', meta.name ? `Hello, I'm <span class="text-gradient">${escapeHtml(meta.name)}</span>` : undefined);
    setText('hero-tagline', meta.title);
    setHtml('about-bio', html); // full Markdown body — richer than a single meta field
    setSrc('about-avatar-img', meta.avatar);
    setText('about-location', meta.location);
    setText('about-email', meta.email);
    setText('about-focus', meta.focus);
    setText('about-quote', meta.quote);
    setHref('footer-email-link', meta.email ? `mailto:${meta.email}` : undefined);
    setHref('footer-github-link', meta.github);
    setHref('footer-linkedin-link', meta.linkedin);
    setHref('linkedin-hero-link', meta.linkedin);
    setHref('linkedin-contact-link', meta.linkedin);
    setHref('linkedin-bar-link', meta.linkedin);
    setHref('github-bar-link', meta.github);

    if (Array.isArray(meta.technologies)) {
      const row = document.getElementById('about-chip-row');
      if (row) row.innerHTML = techChips(meta.technologies);
    }
  }

  /**
   * Renders the Professional Experience cards plus the "View Full
   * LinkedIn Profile" button from activity/experience.md.
   * @param {{linkedin: string, jobs: Array}|null} experience
   */
  function renderExperience(experience) {
    const container = document.getElementById('experience-grid');
    if (!container || !experience) return; // keep index.html's placeholder cards if missing

    const jobCards = experience.jobs.map((job) => `
      <div class="card experience-card">
        <h3>${escapeHtml(job.company)}</h3>
        <div class="experience-role">${escapeHtml(job.role)}</div>
        <div class="experience-dates">${escapeHtml(job.dates)}</div>
        <ul>
          ${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    const linkedinCard = `
      <div class="card linkedin-cta-card">
        <span style="font-size:1.6rem;">in</span>
        <strong>View My Full LinkedIn Profile</strong>
        <a class="btn btn-primary" href="${experience.linkedin || '#'}" target="_blank" rel="noopener">Visit LinkedIn →</a>
      </div>
    `;

    container.innerHTML = jobCards + linkedinCard;

    // Also point the hero's "View LinkedIn Profile" button and footer
    // icon at the same URL, so it only has to be entered once.
    const heroLink = document.getElementById('linkedin-hero-link');
    if (heroLink && experience.linkedin) heroLink.href = experience.linkedin;
    const footerLink = document.getElementById('footer-linkedin-link');
    if (footerLink && experience.linkedin) footerLink.href = experience.linkedin;
  }

  return {
    renderAbout,
    renderExperience,
    renderProjects: (items) => renderInto(
      'projects-grid', items, buildProjectOrLabCard,
      'No projects published yet — add a .md file to activity/projects/.'
    ),
    renderLabs: (items) => renderInto(
      'labs-grid', items, buildProjectOrLabCard,
      'No labs published yet — add a .md file to activity/labs/.'
    ),
    renderLearning: (items) => renderInto(
      'learning-grid', items, buildLearningCard,
      'Nothing marked as "currently learning" yet.'
    ),
    renderChallenges: (items) => renderInto(
      'challenges-grid', items, buildProjectOrLabCard,
      'No challenges yet — add a .md file to activity/challenges/.'
    ),
    renderJournal: (items) => renderInto(
      'journal-feed', items, buildJournalItem,
      'No activity logged yet — add a .md file to activity/journal/.'
    ),
  };

})();
