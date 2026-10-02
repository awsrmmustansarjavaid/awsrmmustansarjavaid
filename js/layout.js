/* ================================================================
   DEVOPS SHOWCASE — js/layout.js
   ================================================================

   PURPOSE
   -------
   Injects the shared navigation bar and footer into every
   pages/*.html file.

   This keeps the website layout centralized in ONE JavaScript file.

   Instead of repeating the navbar and footer HTML inside:

       pages/experience.html
       pages/learning.html
       pages/projects.html
       pages/labs.html
       pages/activities.html
       pages/challenges.html
       pages/devops-library.html

   we maintain them here.

   HOW TO ADD A NEW PAGE
   ---------------------
   Add one entry to the PAGES array:

       ['filename-without-extension', 'Navigation Label']

   Example:

       ['devops-library', 'DevOps Library']

   The corresponding file must exist inside:

       /pages/devops-library.html

   ================================================================ */


const Layout = (() => {


  /* ==============================================================
     NAVIGATION PAGES

     Format:

       [page-file-name, navigation-label]

     The order here controls the order displayed in the navbar.
     ============================================================== */

  const PAGES = [

    ['experience', 'Experience'],

    ['learning', 'Learning'],

    ['projects', 'Projects'],

    ['labs', 'Labs'],

    ['activities', 'Activities'],

    ['challenges', 'Challenges'],

    ['devops-library', 'DevOps Library']

  ];


  /* ==============================================================
     MOUNT SHARED LAYOUT

     @param {string} active
       The page key currently being displayed.

     Example:

       Layout.mount('devops-library');

     This automatically adds:

       - Shared navbar
       - Home link
       - Page navigation
       - LinkedIn contact button
       - Mobile navigation button
       - Shared footer
       - GitHub link
       - LinkedIn links
     ============================================================== */

  function mount(active) {


    /* ============================================================
       BUILD NAVIGATION LINKS

       Each page receives:

       <a href="page.html">Label</a>

       The current page receives:

       class="active"

       so the existing CSS can highlight it.
       ============================================================ */

    const links = PAGES
      .map(([key, label]) => {

        const activeClass =
          key === active
            ? ' class="active"'
            : '';

        return `
          <a
            href="${key}.html"
            ${activeClass}
          >
            ${label}
          </a>
        `;

      })
      .join('');


    /* ============================================================
       INJECT HEADER / NAVBAR

       All pages inside /pages/ are one directory below index.html.

       Therefore:

           ../index.html

       correctly points back to the homepage.

       CONFIG is loaded before layout.js, so these values are
       available:

           CONFIG.links.linkedin
           CONFIG.links.github
           CONFIG.links.linkedinJourney
       ============================================================ */

    document.body.insertAdjacentHTML(
      'afterbegin',

      `
      <header>

        <div class="nav-bar">

          <!-- ==================================================
               BRAND
               ================================================== -->

          <a
            class="brand"
            href="../index.html"
          >

            <span class="brand-icon">
              ☁️
            </span>

            <div>

              <div class="brand-name">
                Mustansar Javaid
              </div>

              <div class="brand-tagline">
                DevOps Showcase
              </div>

            </div>

          </a>


          <!-- ==================================================
               NAVIGATION
               ================================================== -->

          <nav class="nav-links">

            <!-- Homepage -->
            <a href="../index.html">
              Home
            </a>

            ${links}

          </nav>


          <!-- ==================================================
               NAVIGATION ACTIONS
               ================================================== -->

          <div
            style="
              display:flex;
              align-items:center;
              gap:.8rem;
            "
          >

            <!-- LinkedIn contact -->
            <a
              class="btn btn-outline"
              href="${CONFIG.links.linkedin}"
              target="_blank"
              rel="noopener"
            >
              in Contact
            </a>


            <!-- Mobile navigation toggle -->
            <button
              id="nav-toggle"
              class="nav-toggle"
              aria-label="Toggle navigation"
              type="button"
            >
              ☰
            </button>

          </div>

        </div>

      </header>
      `
    );


    /* ============================================================
       INJECT FOOTER
       ============================================================ */

    document.body.insertAdjacentHTML(
      'beforeend',

      `
      <footer>

        <div class="footer-inner">

          <!-- Copyright -->
          <span>
            © 2026 Mustansar Javaid.
            Built with ❤️ using GitHub Pages.
          </span>


          <!-- Footer links -->
          <div class="footer-icons">

            <!-- GitHub -->
            <a
              href="${CONFIG.links.github}"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              🐙
            </a>


            <!-- LinkedIn Professional -->
            <a
              class="li-badge"
              href="${CONFIG.links.linkedin}"
              target="_blank"
              rel="noopener"
            >
              <span>
                LinkedIn
              </span>

              <span>
                Professional
              </span>
            </a>


            <!-- LinkedIn DevOps Journey -->
            <a
              class="li-badge"
              href="${CONFIG.links.linkedinJourney}"
              target="_blank"
              rel="noopener"
            >
              <span>
                LinkedIn
              </span>

              <span>
                DevOps Journey
              </span>
            </a>

          </div>

        </div>

      </footer>
      `
    );


    /* ============================================================
       MOBILE NAVIGATION

       The same behavior used by the existing website:

           click ☰
               ↓
           toggle .open
               ↓
           CSS displays mobile navigation

       ============================================================ */

    const nav =
      document.querySelector('.nav-links');

    const navToggle =
      document.getElementById('nav-toggle');


    if (nav && navToggle) {

      navToggle.addEventListener(
        'click',
        () => {

          nav.classList.toggle('open');

        }
      );

    }

  }


  /* ==============================================================
     PUBLIC API

     Other pages use:

         Layout.mount('page-name');

     ============================================================== */

  return {

    mount

  };


})();

