/* ================================================================
   DEVOPS SHOWCASE — js/effects.js  (index.html + every pages/*.html)
   Self-starting UI polish, no dependencies. Adds:
     1. a scroll-progress bar at the very top of the window
     2. a floating "back to top" button (appears after scrolling down)
     3. a soft shadow on the sticky header once the page is scrolled
     4. fade/slide "reveal" of each <section> as it enters the screen
   Styles for all of these live in css/effects.css.
   ================================================================ */
(function () {
  // --- 1. Scroll progress bar ---
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  // --- 2. Back-to-top button: smooth-scrolls to the very top ---
  const topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.type = 'button';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.textContent = '↑';
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(topBtn);

  // --- 3. One scroll handler drives the bar, the button and the header ---
  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;             // total scrollable distance
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    topBtn.classList.toggle('show', window.scrollY > 400);       // show after 400px
    const header = document.querySelector('header');             // header may be injected later (pages)
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- 4. Reveal sections on scroll (skipped if reduced motion / no support) ---
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } // animate once
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('main section').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }
})();
