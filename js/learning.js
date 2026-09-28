/* ================================================================
   DEVOPS SHOWCASE — js/learning.js
   Page logic for pages/learning.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('learning'); // inject navbar + footer, highlight this page
  Listing.init({ category: 'learning', render: Render.renderLearning }); // search + filters + Load more
});
