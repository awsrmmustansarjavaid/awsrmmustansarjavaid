/* ================================================================
   DEVOPS SHOWCASE — js/labs.js
   Page logic for pages/labs.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('labs'); // inject navbar + footer, highlight this page
  Listing.init({ category: 'labs', render: Render.renderLabs }); // search + filters + Load more
});
