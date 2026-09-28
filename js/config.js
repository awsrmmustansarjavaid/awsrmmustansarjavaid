/* ================================================================
   DEVOPS SHOWCASE — js/config.js
   ================================================================
   This is the ONLY file you should need to edit to point the
   showcase at your own GitHub account/repository.

   Everything else (github-api.js, content-loader.js, render.js,
   app.js) reads its settings from the CONFIG object below instead
   of hard-coding your username anywhere else in the codebase.
   ================================================================ */

const CONFIG = {

  // Your GitHub username. Used to build API and profile URLs.
  githubUsername: 'awsrmmustansarjavaid',

  // The repository that contains this showcase AND the activity/
  // markdown files. For a GitHub "profile repo" this is usually
  // the same as your username (e.g. github.com/<user>/<user>).
  githubRepo: 'awsrmmustansarjavaid',

  // The branch GitHub Pages is building from (usually "main").
  branch: 'main',

  // Folder (relative to the repo root) that holds your Markdown
  // content. Must match the folder structure described in
  // README-showcase.md.
  activityPath: 'activity',
  profilePath: 'activity/profile',

  // Sub-folders inside activityPath, one per content type.
  categories: {
    projects: 'projects',
    labs: 'labs',
    learning: 'learning',
    journal: 'journal',
    challenges: 'challenges', // DevOps Challenge page + home preview
  },

  // How many items each home-page section previews before the
  // "View all →" button sends the visitor to the full page.
  homePreviewCount: 3,

  // How long (in minutes) a fetched GitHub API response is kept in
  // localStorage before the site fetches fresh data again. This
  // keeps the site fast and avoids hitting GitHub's unauthenticated
  // API rate limit (60 requests/hour per visitor IP) on every
  // single page load.
  cacheDurationMinutes: 15,

  // Your public profile links, used in the hero/footer buttons.
  links: {
    github: 'https://github.com/awsrmmustansarjavaid',
    linkedin: 'https://www.linkedin.com/in/your-linkedin-handle/',
    email: 'mailto:youremail@example.com',
  },
};
