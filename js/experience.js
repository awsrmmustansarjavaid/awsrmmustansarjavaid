/* ================================================================
   DEVOPS SHOWCASE — js/experience.js
   Page logic for pages/experience.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('experience'); // inject navbar + footer, highlight this page
  ContentLoader.loadExperience().then(Render.renderExperience); // full job list, no paging
});
