/* ================================================================
   DEVOPS SHOWCASE — js/projects.js
   Page logic for pages/projects.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('projects'); // inject navbar + footer, highlight this page
  Listing.init({ category: 'projects', render: Render.renderProjects }); // search + filters + Load more
});
