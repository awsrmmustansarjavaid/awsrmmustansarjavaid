/* ================================================================
   DEVOPS SHOWCASE — js/layout.js
   Injects the shared navbar + footer into every pages/*.html so that
   markup lives in ONE place (edit the PAGES list to add a page).
   Reuses index.html's header/footer classes from css/style.css.
   ================================================================ */
const Layout = (() => {
  // [file name without .html, label] — order = navbar order
  const PAGES = [['experience', 'Experience'], ['learning', 'Learning'], ['projects', 'Projects'],
                 ['labs', 'Labs'], ['activities', 'Activities'], ['challenges', 'Challenges']];

  /** @param {string} active - key of the current page (highlighted in the nav) */
  function mount(active) {
    const links = PAGES.map(([k, l]) =>
      `<a href="${k}.html"${k === active ? ' class="active"' : ''}>${l}</a>`).join('');

    document.body.insertAdjacentHTML('afterbegin', `
      <header><div class="nav-bar">
        <a class="brand" href="../index.html"><span class="brand-icon">☁️</span>
          <div><div class="brand-name">Mustansar Javaid</div><div class="brand-tagline">DevOps Showcase</div></div></a>
        <nav class="nav-links"><a href="../index.html">Home</a>${links}</nav>
        <div style="display:flex;align-items:center;gap:.8rem;">
          <a class="btn btn-outline" href="${CONFIG.links.linkedin}" target="_blank" rel="noopener">in Contact</a>
          <button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation">☰</button>
        </div></div></header>`);

    document.body.insertAdjacentHTML('beforeend', `
      <footer><div class="footer-inner">
        <span>© 2026 Mustansar Javaid. Built with ❤️ using GitHub Pages.</span>
        <div class="footer-icons">
          <a href="${CONFIG.links.github}" target="_blank" rel="noopener" aria-label="GitHub">🐙</a>
          <a class="li-badge" href="${CONFIG.links.linkedin}" target="_blank" rel="noopener"><span>LinkedIn</span><span>Professional</span></a>
          <a class="li-badge" href="${CONFIG.links.linkedinJourney}" target="_blank" rel="noopener"><span>LinkedIn</span><span>DevOps Journey</span></a>
        </div></div></footer>`);

    // Mobile hamburger (same behavior as index.html's app.js)
    const nav = document.querySelector('.nav-links');
    document.getElementById('nav-toggle').addEventListener('click', () => nav.classList.toggle('open'));
  }
  return { mount };
})();
