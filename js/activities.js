/* ================================================================
   DEVOPS SHOWCASE — js/activities.js
   Page logic for pages/activities.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('activities'); // inject navbar + footer, highlight this page
  Listing.init({ category: 'journal', render: Render.renderJournal }); // search + filters + Load more
});
