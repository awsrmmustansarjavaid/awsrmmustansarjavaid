/* ================================================================
   DEVOPS SHOWCASE — js/challenges.js
   Page logic for pages/challenges.html. Data comes from the markdown
   files under activity/ (see doc/README-showcase.md).
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Layout.mount('challenges'); // inject navbar + footer, highlight this page
  Listing.init({ category: 'challenges', render: Render.renderChallenges }); // search + filters + Load more
});
