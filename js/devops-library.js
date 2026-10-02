/* ================================================================
   CHARLIE DEVOPS LIBRARY — js/devops-library.js
   ================================================================

   PURPOSE
   -------
   Controls the Charlie DevOps Library page.

   The Markdown files inside:

       /activity/Charlie-DevOps-Library/

   are the SOURCE OF TRUTH.

   There is intentionally NO separate JSON database.

   DATA FLOW
   ---------

       GitHub Repository
              │
              ▼
       activity/Charlie-DevOps-Library/
              │
              ▼
       GitHubAPI.listDirectory()
              │
              ▼
       *.md files
              │
              ▼
       GitHubAPI.fetchRawFile()
              │
              ▼
       MarkdownParser.parse()
              │
              ▼
       Charlie DevOps Library
              │
              ├── Search
              ├── Category Filter
              ├── Sort
              ├── Grid
              ├── Statistics
              ├── Load More
              └── Markdown Viewer


   IMPORTANT
   ---------
   This file uses the existing website modules:

       CONFIG
       GitHubAPI
       MarkdownParser

   No second GitHub API implementation is required.

   ================================================================ */


const DevOpsLibrary = (() => {


  /* ==============================================================
     CONFIGURATION
     ============================================================== */


  /*
     Location of the Markdown database inside the repository.

     GitHubAPI automatically combines this path with:

         CONFIG.githubUsername
         CONFIG.githubRepo
         CONFIG.branch
  */

  const LIBRARY_PATH =
    'activity/Charlie-DevOps-Library';


  /*
     Number of category cards displayed initially.

     Example:

         12 categories initially

     Additional categories are displayed through
     the "Load More" button.
  */

  const PAGE_SIZE = 12;


  /*
     Internal application state.

     categories
     ----------
     Contains every successfully loaded Markdown category.

     filteredCategories
     ------------------
     Contains the current search/filter/sort result.

     visibleCount
     ------------
     Controls how many cards are currently displayed.
  */

  let categories = [];

  let filteredCategories = [];

  let visibleCount = PAGE_SIZE;



  /* ==============================================================
     DOM HELPER
     ============================================================== */


  /*
     Small helper for selecting a single DOM element.
  */

  function $(selector) {

    return document.querySelector(selector);

  }



  /* ==============================================================
     HTML ESCAPE
     ============================================================== */


  /*
     Escapes text before inserting it into HTML.

     This is especially important for Markdown-derived titles,
     descriptions and resource names.
  */

  function escapeHtml(value = '') {

    return String(value)

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;')

      .replace(/"/g, '&quot;')

      .replace(/'/g, '&#039;');

  }



  /* ==============================================================
     EXTRACT SECTION TITLE
     ============================================================== */


  /*
     Most Markdown files contain an H1 such as:

         # Charlie DEVOPS Course

     The H1 becomes the category title.

     If no H1 exists, the filename is converted into
     a readable title.

     Example:

         11-docker-study-research.md

     becomes:

         Docker Study Research
  */

  function extractTitle(markdown, filename) {

    const heading =
      markdown.match(/^#\s+(.+)$/m);


    if (heading) {

      return heading[1].trim();

    }


    return filename

      .replace(/\.md$/i, '')

      .replace(/^\d+-/, '')

      .replace(/-/g, ' ')

      .replace(/\b\w/g, char =>
        char.toUpperCase()
      );

  }



  /* ==============================================================
     EXTRACT RESOURCE COUNT
     ============================================================== */


  /*
     Looks for a Markdown line such as:

         **Resources:** 17 unique URLs in this section.

     If found, that number becomes the resource count.

     If the line does not exist, the JavaScript falls back
     to counting:

         [Open resource]

     links.
  */

  function extractResourceCount(markdown) {

    const match =
      markdown.match(
        /\*\*Resources:\*\*\s*(\d+)\s+unique\s+URLs?/i
      );


    if (match) {

      return Number(match[1]);

    }


    /*
       Fallback method.
    */

    const links =
      markdown.match(
        /\[Open resource\]/gi
      );


    return links
      ? links.length
      : 0;

  }



  /* ==============================================================
     EXTRACT RESOURCE TITLES
     ============================================================== */


  /*
     Looks for Markdown headings such as:

         ## 1. YAML Fundamentals
         ## 2. Linux Fundamentals
         ## 3. Docker Study

     These titles are used by:

         Search
         Card previews
         Filtering
  */

  function extractResourceTitles(markdown) {

    const matches = [
      ...markdown.matchAll(
        /^##\s+\d+\.\s+(.+)$/gm
      )
    ];


    return matches.map(match =>
      match[1].trim()
    );

  }



  /* ==============================================================
     EXTRACT RESOURCE URLS
     ============================================================== */


  /*
     Finds Markdown links in this format:

         [Open resource](<https://example.com>)

     The extracted URLs are used for:

         Statistics
         Resource counting
         Future functionality
  */

  function extractUrls(markdown) {

    const urls = [];


    const matches = [
      ...markdown.matchAll(
        /\[Open resource\]\(<([^>]+)>\)/g
      )
    ];


    matches.forEach(match => {

      if (match[1]) {

        urls.push(match[1]);

      }

    });


    return urls;

  }



  /* ==============================================================
     EXTRACT DESCRIPTION
     ============================================================== */


  /*
     Creates a short description for each category card.

     Example:

         **Resources:** 17 unique URLs in this section.

     becomes:

         17 curated resources in the Docker Study Research section.
  */

  function extractDescription(
    markdown,
    title
  ) {

    const summary =
      markdown.match(
        /\*\*Resources:\*\*\s*(\d+)\s+unique\s+URLs?\s+in\s+this\s+section\./i
      );


    if (summary) {

      return `${summary[1]} curated resources in the ${title} section.`;

    }


    return 'DevOps learning and reference resources.';

  }



  /* ==============================================================
     LOAD ONE MARKDOWN FILE
     ============================================================== */


  /*
     Downloads and processes one Markdown file.

     The GitHub API provides:

         name
         path
         download_url

     The existing MarkdownParser handles Markdown rendering.
  */

  async function loadFile(file) {

    try {


      /* ----------------------------------------------------------
         Download raw Markdown
         ---------------------------------------------------------- */

      const raw =
        await GitHubAPI.fetchRawFile(
          file.download_url
        );


      if (!raw) {

        return null;

      }


      /* ----------------------------------------------------------
         Parse Markdown using the existing website parser.
         ---------------------------------------------------------- */

      const parsed =
        MarkdownParser.parse(raw);


      /* ----------------------------------------------------------
         Extract category information.
         ---------------------------------------------------------- */

      const title =
        extractTitle(
          raw,
          file.name
        );


      const resourceCount =
        extractResourceCount(raw);


      const resourceTitles =
        extractResourceTitles(raw);


      const urls =
        extractUrls(raw);


      const description =
        extractDescription(
          raw,
          title
        );


      /* ----------------------------------------------------------
         Return normalized category object.
         ---------------------------------------------------------- */

      return {

        filename:
          file.name,

        path:
          file.path,

        downloadUrl:
          file.download_url,

        title,

        resourceCount,

        resourceTitles,

        urls,

        description,

        markdown:
          raw,

        html:
          parsed.html

      };


    } catch (error) {


      console.warn(
        'Charlie DevOps Library: failed to load',
        file.name,
        error
      );


      return null;

    }

  }



  /* ==============================================================
     LOAD COMPLETE LIBRARY
     ============================================================== */


  /*
     Complete library loading process:

         1. Read directory from GitHub.
         2. Keep Markdown files.
         3. Ignore 99-URL-MANIFEST.md.
         4. Download Markdown files.
         5. Parse Markdown.
         6. Build category objects.
         7. Sort categories.
         8. Update statistics.
         9. Build category filter.
        10. Render the grid.
  */

  async function loadLibrary() {

    const grid =
      $('#library-grid');


    try {


      /* ----------------------------------------------------------
         Get all Markdown files from GitHub.
         ---------------------------------------------------------- */

      const files =
        await GitHubAPI.listDirectory(
          LIBRARY_PATH
        );


      /* ----------------------------------------------------------
         Keep only Markdown files.
         ---------------------------------------------------------- */

      const markdownFiles =
        files

          .filter(file =>
            file.name
              .toLowerCase()
              .endsWith('.md')
          )

          /*
             Keep 99-URL-MANIFEST.md in GitHub as a technical
             reference file, but do not show it as a category card.
          */

          .filter(file =>
            file.name !== '99-URL-MANIFEST.md'
          );


      /* ----------------------------------------------------------
         Load every Markdown file.
         ---------------------------------------------------------- */

      const loaded =
        await Promise.all(
          markdownFiles.map(loadFile)
        );


      /* ----------------------------------------------------------
         Remove files that failed to load.
         ---------------------------------------------------------- */

      categories =
        loaded.filter(Boolean);


      /* ----------------------------------------------------------
         Preserve the numeric Markdown order.

         Example:

             01
             03
             04
             05
             06
             ...
             25
  */

      categories.sort(
        compareOriginalOrder
      );


      /* ----------------------------------------------------------
         Initial filter state.
         ---------------------------------------------------------- */

      filteredCategories =
        [...categories];


      /* ----------------------------------------------------------
         Update library statistics.
         ---------------------------------------------------------- */

      updateStats();


      /* ----------------------------------------------------------
         Build category dropdown.
         ---------------------------------------------------------- */

      buildCategoryFilter();


      /* ----------------------------------------------------------
         Render category grid.
         ---------------------------------------------------------- */

      render();


    } catch (error) {


      console.error(
        'Charlie DevOps Library: failed to load library',
        error
      );


      if (grid) {

        grid.innerHTML = `

          <div class="library-loading">

            <h3>
              Unable to load the library
            </h3>

            <p>
              GitHub resources could not be loaded.
              Please refresh the page.
            </p>

          </div>

        `;

      }

    }

  }



  /* ==============================================================
     SORT BY ORIGINAL FILE NUMBER
     ============================================================== */


  /*
     Keeps the Markdown library in its original numbered order.

     Example:

         01
         03
         04
         05
         ...
         25
  */

  function compareOriginalOrder(a, b) {

    const numberA =
      Number(
        a.filename.match(/^\d+/)?.[0] || 999
      );


    const numberB =
      Number(
        b.filename.match(/^\d+/)?.[0] || 999
      );


    return numberA - numberB;

  }



  /* ==============================================================
     BUILD CATEGORY FILTER DROPDOWN
     ============================================================== */


  function buildCategoryFilter() {

    const select =
      $('#library-category');


    if (!select) {

      return;

    }


    /*
       Start with the default "All Categories" option.
    */

    select.innerHTML = `
      <option value="">
        All Categories
      </option>
    `;


    /*
       Add every Markdown category.
    */

    categories.forEach(
      (category, index) => {


        const option =
          document.createElement('option');


        option.value =
          String(index);


        option.textContent =
          category.title;


        select.appendChild(option);

      }
    );

  }



  /* ==============================================================
     UPDATE STATISTICS
     ============================================================== */


  /*
     Updates:

         Category count
         Resource count
         URL count
  */

  function updateStats() {

    const categoryCount =
      $('#category-count');


    const resourceCount =
      $('#resource-count');


    const urlCount =
      $('#url-count');


    /*
       Total resources from every Markdown category.
    */

    const totalResources =
      categories.reduce(
        (total, category) =>
          total + category.resourceCount,
        0
      );


    /*
       Total extracted resource URLs.
    */

    const totalUrls =
      categories.reduce(
        (total, category) =>
          total + category.urls.length,
        0
      );


    if (categoryCount) {

      categoryCount.textContent =
        categories.length;

    }


    if (resourceCount) {

      resourceCount.textContent =
        totalResources.toLocaleString();

    }


    if (urlCount) {

      urlCount.textContent =
        totalUrls.toLocaleString();

    }

  }



  /* ==============================================================
     RENDER GRID
     ============================================================== */


  /*
     Renders the currently filtered/sorted category collection.

     IMPORTANT
     ---------
     updateLoadMoreButton() is intentionally called here.

     This means the Load More button automatically reacts to:

         Search
         Category filter
         Sorting
         Clearing filters
         Loading more items

     Therefore the button cannot remain visible when there
     are no additional categories to display.
  */

  function render() {

    const grid =
      $('#library-grid');


    const empty =
      $('#library-empty');


    if (!grid) {

      return;

    }


    /*
       Only display the current visible amount.
    */

    const visible =
      filteredCategories.slice(
        0,
        visibleCount
      );


    /* ------------------------------------------------------------
       No search/filter results
       ------------------------------------------------------------ */

    if (visible.length === 0) {

      grid.innerHTML = '';


      if (empty) {

        empty.hidden = false;

      }


      updateResultCount();

      /*
         IMPORTANT:
         Also update Load More when there are zero results.
      */

      updateLoadMoreButton();

      return;

    }


    /* ------------------------------------------------------------
       Hide empty-state message.
       ------------------------------------------------------------ */

    if (empty) {

      empty.hidden = true;

    }


    /* ------------------------------------------------------------
       Build category cards.
       ------------------------------------------------------------ */

    grid.innerHTML =
      visible
        .map(buildCard)
        .join('');


    /* ------------------------------------------------------------
       Update result information.
       ------------------------------------------------------------ */

    updateResultCount();


    /*
       IMPORTANT:
       Update Load More every time render() runs.

       This fixes the situation where:

           Search
           Filter
           Sort

       changes the number of available results.
    */

    updateLoadMoreButton();

  }



  /* ==============================================================
     BUILD CATEGORY CARD
     ============================================================== */


  /*
     Creates one visual card for one Markdown category.
  */

  function buildCard(category) {


    const index =
      categories.indexOf(category);


    /*
       Extract numeric section number.

       Example:

           11-docker-study-research.md

       becomes:

           11
    */

    const number =
      category.filename
        .match(/^\d+/)?.[0] || '—';


    /*
       Display up to three resource titles
       as small preview chips.
    */

    const previewTitles =
      category.resourceTitles

        .slice(0, 3)

        .map(title => `

          <span class="library-chip">
            ${escapeHtml(title)}
          </span>

        `)

        .join('');


    return `

      <article
        class="library-card"
        data-category-index="${index}"
      >


        <!-- =====================================================
             CARD HEADER
             ===================================================== -->

        <div class="library-card-top">


          <div>

            <h3>
              ${escapeHtml(category.title)}
            </h3>

          </div>


          <span
            class="library-card-number"
            title="Section number"
          >
            ${escapeHtml(number)}
          </span>


        </div>


        <!-- =====================================================
             DESCRIPTION
             ===================================================== -->

        <p class="library-card-description">

          ${escapeHtml(category.description)}

        </p>


        <!-- =====================================================
             RESOURCE INFORMATION
             ===================================================== -->

        <div class="library-card-meta">


          <span class="library-chip">

            ${category.resourceCount}
            resources

          </span>


          <span class="library-chip">

            Markdown

          </span>


          ${previewTitles}


        </div>


        <!-- =====================================================
             CARD ACTIONS
             ===================================================== -->

        <div class="library-card-actions">


          <button
            class="library-card-btn primary"
            type="button"
            data-action="open"
            data-index="${index}"
          >

            View Resources →

          </button>


          <a
            class="library-card-btn"
            href="${buildGitHubUrl(category.path)}"
            target="_blank"
            rel="noopener noreferrer"
          >

            GitHub ↗

          </a>


        </div>


      </article>

    `;

  }



  /* ==============================================================
     BUILD GITHUB FILE URL
     ============================================================== */


  /*
     Creates a direct GitHub URL to the Markdown file.
  */

  function buildGitHubUrl(path) {

    return `https://github.com/${CONFIG.githubUsername}/${CONFIG.githubRepo}/blob/${CONFIG.branch}/${path}`;

  }



  /* ==============================================================
     SEARCH / FILTER
     ============================================================== */


  /*
     Applies:

         Search
         Category filter
         Sort

     Then resets pagination and renders the results.
  */

  function applyFilters() {


    const search =
      ($('#library-search')?.value || '')
        .trim()
        .toLowerCase();


    const category =
      $('#library-category')?.value || '';


    const sort =
      $('#library-sort')?.value || 'number';


    /*
       Search through:

           Category title
           Description
           Filename
           Resource titles
    */

    filteredCategories =
      categories.filter(
        (item, index) => {


          const searchableText = [

            item.title,

            item.description,

            item.filename,

            ...item.resourceTitles

          ]

            .join(' ')

            .toLowerCase();


          const matchesSearch =
            !search ||
            searchableText.includes(search);


          const matchesCategory =
            !category ||
            Number(category) === index;


          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );


    /* ------------------------------------------------------------
       Apply selected sorting.
       ------------------------------------------------------------ */

    sortCategories(sort);


    /*
       Every new search/filter starts from the first page.
    */

    visibleCount =
      PAGE_SIZE;


    /*
       render() will also update the Load More button.
    */

    render();

  }



  /* ==============================================================
     SORT FILTERED RESULTS
     ============================================================== */


  function sortCategories(sort) {


    switch (sort) {


      /* ----------------------------------------------------------
         Alphabetical A → Z
         ---------------------------------------------------------- */

      case 'az':

        filteredCategories.sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        );

        break;


      /* ----------------------------------------------------------
         Alphabetical Z → A
         ---------------------------------------------------------- */

      case 'za':

        filteredCategories.sort(
          (a, b) =>
            b.title.localeCompare(
              a.title
            )
        );

        break;


      /* ----------------------------------------------------------
         Most resources first
         ---------------------------------------------------------- */

      case 'resources-high':

        filteredCategories.sort(
          (a, b) =>
            b.resourceCount -
            a.resourceCount
        );

        break;


      /* ----------------------------------------------------------
         Fewest resources first
         ---------------------------------------------------------- */

      case 'resources-low':

        filteredCategories.sort(
          (a, b) =>
            a.resourceCount -
            b.resourceCount
        );

        break;


      /* ----------------------------------------------------------
         Original Markdown numbering
         ---------------------------------------------------------- */

      case 'number':

      default:

        filteredCategories.sort(
          compareOriginalOrder
        );

        break;

    }

  }



  /* ==============================================================
     RESULT COUNT
     ============================================================== */


  /*
     Displays information such as:

         Showing 12 of 25 categories • 340 resources
  */

  function updateResultCount() {

    const element =
      $('#library-result-count');


    if (!element) {

      return;

    }


    const totalResources =
      filteredCategories.reduce(
        (total, item) =>
          total + item.resourceCount,
        0
      );


    element.textContent =
      `Showing ${
        Math.min(
          visibleCount,
          filteredCategories.length
        )
      } of ${
        filteredCategories.length
      } categories • ${
        totalResources.toLocaleString()
      } resources`;

  }



  /* ==============================================================
     OPEN RESOURCE MODAL
     ============================================================== */


  /*
     Opens the Markdown content inside the Library modal.
  */

  function openModal(index) {


    const category =
      categories[index];


    if (!category) {

      return;

    }


    const modal =
      $('#library-modal');


    const title =
      $('#library-modal-title');


    const categoryName =
      $('#library-modal-category');


    const meta =
      $('#library-modal-meta');


    const content =
      $('#library-modal-content');


    /*
       Populate modal header.
    */

    if (categoryName) {

      categoryName.textContent =
        category.title;

    }


    if (title) {

      title.textContent =
        category.title;

    }


    if (meta) {

      meta.textContent =
        `${category.resourceCount} resources • ${category.filename}`;

    }


    /*
       Insert the HTML generated by MarkdownParser.
    */

    if (content) {

      content.innerHTML =
        category.html;


      /*
         Make Markdown links open safely in new tabs.
      */

      content
        .querySelectorAll('a')
        .forEach(link => {

          link.target =
            '_blank';

          link.rel =
            'noopener noreferrer';

        });

    }


    /*
       Show modal.
    */

    if (modal) {

      modal.hidden =
        false;


      modal.setAttribute(
        'aria-hidden',
        'false'
      );

    }


    /*
       Prevent page scrolling while modal is open.
    */

    document.body.style.overflow =
      'hidden';

  }



  /* ==============================================================
     CLOSE RESOURCE MODAL
     ============================================================== */


  function closeModal() {


    const modal =
      $('#library-modal');


    if (!modal) {

      return;

    }


    modal.hidden =
      true;


    modal.setAttribute(
      'aria-hidden',
      'true'
    );


    /*
       Restore normal page scrolling.
    */

    document.body.style.overflow =
      '';

  }



  /* ==============================================================
     CREATE LOAD MORE BUTTON
     ============================================================== */


  /*
     Creates the Load More button once.

     The button is automatically updated by:

         updateLoadMoreButton()

     after every render.
  */

  function createLoadMoreButton() {


    const section =
      document.querySelector(
        '.library-section .section-inner'
      );


    if (!section) {

      return;

    }


    /*
       Prevent duplicate button creation.
    */

    if ($('#library-load-more')) {

      return;

    }


    /*
       Create button.
    */

    const button =
      document.createElement('button');


    button.id =
      'library-load-more';


    button.className =
      'btn btn-outline load-more';


    button.type =
      'button';


    button.textContent =
      'Load more categories →';


    section.appendChild(button);


    /*
       Load another group of categories.
    */

    button.addEventListener(
      'click',
      () => {


        visibleCount +=
          PAGE_SIZE;


        /*
           render() automatically updates:

               Grid
               Result count
               Load More visibility
        */

        render();

      }
    );

  }



  /* ==============================================================
     UPDATE LOAD MORE BUTTON
     ============================================================== */


  /*
     Determines whether the Load More button should be visible.

     Example:

         25 total categories
         12 visible

         → SHOW button

         25 total categories
         25 visible

         → HIDE button

     This function is called after every render().
  */

  function updateLoadMoreButton() {


    const button =
      $('#library-load-more');


    if (!button) {

      return;

    }


    /*
       Hide button when all filtered categories are already visible.

       Also handles:

           0 results
           Search results
           Category filters
           Load More
           Reset filters
    */

    button.hidden =
      visibleCount >=
      filteredCategories.length;

  }



  /* ==============================================================
     EVENT LISTENERS
     ============================================================== */


  function bindEvents() {


    const search =
      $('#library-search');


    const category =
      $('#library-category');


    const sort =
      $('#library-sort');


    const clear =
      $('#clear-library-filters');


    const grid =
      $('#library-grid');


    const close =
      $('#library-modal-close');


    const backdrop =
      document.querySelector(
        '.library-modal-backdrop'
      );


    /* ------------------------------------------------------------
       Search
       ------------------------------------------------------------ */

    if (search) {

      search.addEventListener(
        'input',
        applyFilters
      );

    }


    /* ------------------------------------------------------------
       Category filter
       ------------------------------------------------------------ */

    if (category) {

      category.addEventListener(
        'change',
        applyFilters
      );

    }


    /* ------------------------------------------------------------
       Sorting
       ------------------------------------------------------------ */

    if (sort) {

      sort.addEventListener(
        'change',
        applyFilters
      );

    }


    /* ------------------------------------------------------------
       Clear filters
       ------------------------------------------------------------ */

    if (clear) {

      clear.addEventListener(
        'click',
        () => {


          if (search) {

            search.value = '';

          }


          if (category) {

            category.value = '';

          }


          if (sort) {

            sort.value = 'number';

          }


          /*
             applyFilters() resets visibleCount and
             calls render().
          */

          applyFilters();

        }
      );

    }


    /* ------------------------------------------------------------
       Grid Event Delegation

       One listener handles all current and future cards.

       This is more efficient than creating an individual
       click listener for every card button.
       ------------------------------------------------------------ */

    if (grid) {

      grid.addEventListener(
        'click',
        event => {


          const button =
            event.target.closest(
              '[data-action="open"]'
            );


          if (!button) {

            return;

          }


          const index =
            Number(
              button.dataset.index
            );


          openModal(index);

        }
      );

    }


    /* ------------------------------------------------------------
       Close modal button
       ------------------------------------------------------------ */

    if (close) {

      close.addEventListener(
        'click',
        closeModal
      );

    }


    /* ------------------------------------------------------------
       Click modal backdrop to close.
       ------------------------------------------------------------ */

    if (backdrop) {

      backdrop.addEventListener(
        'click',
        closeModal
      );

    }


    /* ------------------------------------------------------------
       ESC key closes modal.
       ------------------------------------------------------------ */

    document.addEventListener(
      'keydown',
      event => {


        if (
          event.key === 'Escape'
        ) {

          closeModal();

        }

      }
    );

  }



  /* ==============================================================
     INITIALIZE LIBRARY
     ============================================================== */


  async function init() {


    /*
       Register UI events first.
    */

    bindEvents();


    /*
       Create Load More button.

       It starts hidden until library data is loaded and
       updateLoadMoreButton() determines whether more results exist.
    */

    createLoadMoreButton();


    /*
       Load Markdown data from GitHub.
    */

    await loadLibrary();


    /*
       Final Load More state after GitHub data has loaded.
    */

    updateLoadMoreButton();

  }



  /* ==============================================================
     PUBLIC API
     ============================================================== */


  return {

    init

  };


})();



/* ================================================================
   START CHARLIE DEVOPS LIBRARY

   Wait until the HTML document is ready.

   This guarantees that the required HTML elements exist before
   the Library starts accessing them.
   ================================================================ */


document.addEventListener(
  'DOMContentLoaded',
  () => {

    DevOpsLibrary.init();

  }
);