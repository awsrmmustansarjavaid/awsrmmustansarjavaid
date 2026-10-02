/* ================================================================
   CHARLIE DEVOPS LIBRARY — js/devops-library.js
   ================================================================

   PURPOSE
   -------

   Controls the Charlie DevOps Resource Library.

   Markdown files inside:

       /activity/Charlie-DevOps-Library/

   remain the SOURCE OF TRUTH.

   No separate JSON database is required.

   ================================================================
   TWO-LEVEL LIBRARY ARCHITECTURE
   ================================================================

   LEVEL 1 — CATEGORY VIEW
   -----------------------

       Charlie DevOps Resource Library

       ┌───────────────────────────────┐
       │ 01                            │
       │ Charlie DEVOPS Course         │
       │ 17 resources                  │
       │                               │
       │ View Resources →              │
       │ GitHub ↗                      │
       └───────────────────────────────┘


   LEVEL 2 — RESOURCE VIEW
   ------------------------

       Charlie DEVOPS Course

       ┌───────────────┐
       │   THUMBNAIL   │
       ├───────────────┤
       │ #01   YOUTUBE │
       │               │
       │ Resource Name │
       │ Description   │
       │               │
       │ Open Resource │
       │ Source        │
       └───────────────┘

       ← Back to Categories


   ================================================================
   DATA FLOW
   ================================================================

       GitHub Repository
              │
              ▼
       Markdown Directory
              │
              ▼
       GitHubAPI.listDirectory()
              │
              ▼
       *.md category files
              │
              ▼
       GitHubAPI.fetchRawFile()
              │
              ▼
       MarkdownParser.parse()
              │
              ▼
       Category Objects
              │
              ├── Category Cards
              │
              └── Resource Objects
                       │
                       ├── YouTube Thumbnail
                       ├── Website Screenshot
                       └── Generated Fallback Thumbnail


   ================================================================
   IMPORTANT
   ================================================================

   This file expects the following HTML IDs:

       #library-search
       #library-category
       #library-sort
       #library-result-count
       #clear-library-filters

       #library-category-view
       #library-grid
       #library-empty

       #library-resource-view
       #library-resource-grid
       #library-resource-empty

       #library-resource-category-number
       #library-resource-category-title
       #library-resource-category-description
       #library-resource-category-count

       #library-back-to-categories
       #library-load-more

       #library-modal
       #library-modal-close
       #library-modal-category
       #library-modal-title
       #library-modal-meta
       #library-modal-content

   ================================================================ */


/* =================================================================
   MAIN MODULE
   ================================================================= */

const DevOpsLibrary = (() => {


  /* ================================================================
     CONFIGURATION
     ================================================================ */

  /*
     Location of the Markdown library inside the repository.

     GitHubAPI uses this path together with the project
     configuration from config.js.
  */

  const LIBRARY_PATH =
    'activity/Charlie-DevOps-Library';


  /*
     Number of items displayed initially.

     LEVEL 1:
         6 categories

     LEVEL 2:
         6 resources
  */

  const PAGE_SIZE = 6;


  /* ================================================================
     APPLICATION STATE
     ================================================================ */

  /*
     Complete list of loaded categories.

     Each category contains:

         filename
         path
         title
         description
         resourceCount
         resourceTitles
         urls
         resources
         markdown
         html
  */

  let categories = [];


  /*
     Categories after search/filter/sort.
  */

  let filteredCategories = [];


  /*
     Number of category cards currently visible.
  */

  let visibleCategoryCount =
    PAGE_SIZE;


  /*
     Current library view.

     Possible values:

         "categories"
         "resources"
  */

  let currentView =
    'categories';


  /*
     Index of the currently opened category.

     null means no category is open.
  */

  let activeCategoryIndex =
    null;


  /*
     Resources belonging to the active category after
     resource-level filtering.
  */

  let filteredResources = [];


  /*
     Number of resource cards currently visible.
  */

  let visibleResourceCount =
    PAGE_SIZE;


  /* ================================================================
     DOM HELPER
     ================================================================ */

  /*
     Short helper for selecting one element.
  */

  function $(selector) {

    return document.querySelector(selector);

  }


  /* ================================================================
     HTML ESCAPE
     ================================================================ */

  /*
     Escapes dynamic text before inserting it into HTML.

     This is especially important because category/resource
     information comes from Markdown files stored in GitHub.
  */

  function escapeHtml(value = '') {

    return String(value)

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;')

      .replace(/"/g, '&quot;')

      .replace(/'/g, '&#039;');

  }


  /* ================================================================
     EXTRACT CATEGORY TITLE
     ================================================================ */

  /*
     Preferred Markdown format:

         # Charlie DEVOPS Course

     If the Markdown does not contain an H1, the filename is
     converted into a readable title.

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


  /* ================================================================
     EXTRACT RESOURCE COUNT
     ================================================================ */

  /*
     Looks for:

         **Resources:** 17 unique URLs in this section.

     If that information exists, use it.

     Otherwise count:

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


    const links =
      markdown.match(
        /\[Open resource\]/gi
      );


    return links
      ? links.length
      : 0;

  }


  /* ================================================================
     EXTRACT RESOURCE TITLES
     ================================================================ */

  /*
     Finds headings such as:

         ## 1. YAML Fundamentals
         ## 2. Docker Course
         ## 3. Kubernetes Documentation
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


  /* ================================================================
     EXTRACT RESOURCE URLS
     ================================================================ */

  /*
     Supports:

         [Open resource](<https://example.com>)

     Returns an array of URLs.
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

        urls.push(
          match[1].trim()
        );

      }

    });


    return urls;

  }


  /* ================================================================
     EXTRACT INDIVIDUAL RESOURCES
     ================================================================ */

  /*
     Converts Markdown resource sections into structured objects.

     Example:

         ## 1. YAML Fundamentals

         **Short detail:** Learn YAML for DevOps.

         [Open resource](<https://example.com>)

     becomes:

         {
             number: "1",
             title: "YAML Fundamentals",
             url: "https://example.com",
             description: "Learn YAML for DevOps."
         }
  */

  function extractResources(markdown) {

    const resources = [];


    /*
       Find numbered H2 sections.
    */

    const sectionRegex =
      /^##\s+(\d+)\.\s+(.+?)(?=\n)/gm;


    const sections = [
      ...markdown.matchAll(sectionRegex)
    ];


    sections.forEach(
      (section, index) => {


        /* ----------------------------------------------------------
           Resource number
           ---------------------------------------------------------- */

        const number =
          section[1];


        /* ----------------------------------------------------------
           Resource title
           ---------------------------------------------------------- */

        const title =
          section[2].trim();


        /* ----------------------------------------------------------
           Start of resource content
           ---------------------------------------------------------- */

        const start =
          section.index +
          section[0].length;


        /* ----------------------------------------------------------
           End of resource content
           ---------------------------------------------------------- */

        const end =
          index + 1 < sections.length
            ? sections[index + 1].index
            : markdown.length;


        const content =
          markdown.slice(
            start,
            end
          );


        /* ----------------------------------------------------------
           Find resource URL
           ---------------------------------------------------------- */

        const urlMatch =
          content.match(
            /\[Open resource\]\(<([^>]+)>\)/
          );


        /*
           If there is no resource URL, ignore this section.
        */

        if (!urlMatch) {

          return;

        }


        /* ----------------------------------------------------------
           Find short description
           ---------------------------------------------------------- */

        const detailMatch =
          content.match(
            /\*\*Short detail:\*\*\s*(.+)/i
          );


        /* ----------------------------------------------------------
           Store resource object
           ---------------------------------------------------------- */

        resources.push({

          number,

          title,

          url:
            urlMatch[1].trim(),

          description:
            detailMatch
              ? detailMatch[1].trim()
              : `DevOps learning resource covering ${title}.`

        });

      }
    );


    return resources;

  }


  /* ================================================================
     DETECT TECHNOLOGY
     ================================================================ */

  /*
     Attempts to determine which technology a resource belongs to.

     Example:

         Kubernetes Official Documentation

     becomes:

         KUBERNETES
  */

  function detectTechnology(
    title,
    url = ''
  ) {

    const text =
      `${title} ${url}`.toLowerCase();


    const technologies = [

      ['kubernetes', 'KUBERNETES'],
      ['docker', 'DOCKER'],
      ['terraform', 'TERRAFORM'],
      ['ansible', 'ANSIBLE'],
      ['jenkins', 'JENKINS'],
      ['github', 'GITHUB'],
      ['gitlab', 'GITLAB'],
      ['aws', 'AWS'],
      ['amazon web services', 'AWS'],
      ['azure', 'AZURE'],
      ['google cloud', 'GCP'],
      ['gcp', 'GCP'],
      ['python', 'PYTHON'],
      ['bash', 'BASH'],
      ['linux', 'LINUX'],
      ['yaml', 'YAML'],
      ['json', 'JSON'],
      ['cloudformation', 'CLOUDFORMATION'],
      ['devops', 'DEVOPS'],
      ['ci/cd', 'CI/CD'],
      ['cicd', 'CI/CD'],
      ['container', 'CONTAINERS'],
      ['git', 'GIT']

    ];


    for (
      const [keyword, label]
      of technologies
    ) {

      if (
        text.includes(keyword)
      ) {

        return label;

      }

    }


    return 'DEVOPS';

  }


  /* ================================================================
     GET IMPORTANT THUMBNAIL WORDS
     ================================================================ */

  /*
     Removes common words so generated thumbnails contain
     meaningful technical words.
  */

  function getThumbnailWords(
    title,
    technology
  ) {

    const stopWords = new Set([

      'the',
      'and',
      'for',
      'with',
      'from',
      'into',
      'your',
      'you',
      'of',
      'to',
      'a',
      'an',
      'in',
      'on',
      'course',
      'tutorial',
      'tutorials',
      'complete',
      'introduction',
      'learn',
      'learning'

    ]);


    const words =
      title

        .replace(
          /[^\w\s/-]/g,
          ' '
        )

        .split(/\s+/)

        .filter(Boolean)

        .filter(word =>
          !stopWords.has(
            word.toLowerCase()
          )
        );


    const important =
      words

        .slice(0, 3)

        .map(word =>
          word.toUpperCase()
        );


    if (!important.length) {

      important.push(
        technology
      );

    }


    return important;

  }


  /* ================================================================
     CREATE FALLBACK THUMBNAIL
     ================================================================ */

  /*
     Creates a visual thumbnail completely with HTML/CSS.

     This is used if:

         YouTube thumbnail fails

     OR

         Website screenshot fails
  */

  function createFallbackThumbnail(
    title,
    url
  ) {

    const technology =
      detectTechnology(
        title,
        url
      );


    const words =
      getThumbnailWords(
        title,
        technology
      );


    const mainWord =
      technology;


    const secondary =
      words

        .filter(word =>
          word !== mainWord
        )

        .slice(0, 2)

        .join(' ');


    return `

      <div
        class="resource-thumbnail resource-thumbnail-generated"
        data-tech="${escapeHtml(technology)}"
      >

        <div class="thumbnail-grid"></div>

        <div class="thumbnail-orbit orbit-one"></div>

        <div class="thumbnail-orbit orbit-two"></div>

        <div class="thumbnail-content">

          <span class="thumbnail-label">
            CHARLIE DEVOPS
          </span>

          <strong class="thumbnail-main">
            ${escapeHtml(mainWord)}
          </strong>

          <span class="thumbnail-secondary">
            ${escapeHtml(
              secondary || 'LEARNING'
            )}
          </span>

          <span class="thumbnail-code">
            &lt;/&gt; BUILD • AUTOMATE • DEPLOY
          </span>

        </div>

      </div>

    `;

  }


  /* ================================================================
     GET YOUTUBE VIDEO ID
     ================================================================ */

  /*
     Supports:

         https://www.youtube.com/watch?v=VIDEO_ID

         https://youtu.be/VIDEO_ID

         https://www.youtube.com/shorts/VIDEO_ID

         https://www.youtube.com/embed/VIDEO_ID
  */

  function getYouTubeVideoId(url) {

    try {

      const parsed =
        new URL(url);


      const hostname =
        parsed.hostname
          .toLowerCase();


      /*
         Standard YouTube watch URL.
      */

      if (
        hostname.includes('youtube.com')
      ) {

        const videoId =
          parsed.searchParams.get('v');


        if (videoId) {

          return videoId;

        }


        const pathParts =
          parsed.pathname
            .split('/')
            .filter(Boolean);


        if (
          pathParts.length >= 2 &&
          (
            pathParts[0] === 'shorts' ||
            pathParts[0] === 'embed'
          )
        ) {

          return pathParts[1];

        }

      }


      /*
         Short youtu.be URL.
      */

      if (
        hostname === 'youtu.be'
      ) {

        return parsed.pathname
          .replace(/^\/+/, '')
          .split('/')[0];

      }

    } catch (error) {

      /*
         Invalid URLs simply fall back to generated
         thumbnails.
      */

      return '';

    }


    return '';

  }


  /* ================================================================
     GET RESOURCE THUMBNAIL
     ================================================================ */

  /*
     Thumbnail priority:

         1. YouTube thumbnail
         2. Website screenshot
         3. Generated fallback after image error
  */

  function getResourceThumbnail(
    title,
    url
  ) {

    const youtubeId =
      getYouTubeVideoId(url);


    /* ------------------------------------------------------------
       YOUTUBE
       ------------------------------------------------------------ */

    if (youtubeId) {

      return `

        <div
          class="resource-thumbnail"
          data-title="${escapeHtml(title)}"
          data-url="${escapeHtml(url)}"
        >

          <img
            src="https://img.youtube.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg"
            alt="${escapeHtml(title)}"
            loading="lazy"
            data-thumbnail-fallback="true"
          >

          <div class="thumbnail-overlay">

            <span>
              YOUTUBE
            </span>

          </div>

        </div>

      `;

    }


    /* ------------------------------------------------------------
       GENERAL WEBSITE
       ------------------------------------------------------------ */

    const previewUrl =
      `https://image.thum.io/get/width/900/crop/520/noanimate/${url}`;


    return `

      <div
        class="resource-thumbnail"
        data-title="${escapeHtml(title)}"
        data-url="${escapeHtml(url)}"
      >

        <img
          src="${escapeHtml(previewUrl)}"
          alt="${escapeHtml(title)}"
          loading="lazy"
          data-thumbnail-fallback="true"
        >

        <div class="thumbnail-overlay">

          <span>
            WEB RESOURCE
          </span>

        </div>

      </div>

    `;

  }


  /* ================================================================
     THUMBNAIL ERROR HANDLERS
     ================================================================ */

  /*
     Replaces failed external thumbnails with the generated
     Charlie DevOps thumbnail.
  */

  function bindThumbnailFallbacks() {

    document
      .querySelectorAll(
        'img[data-thumbnail-fallback="true"]'
      )
      .forEach(img => {

        /*
           Avoid attaching the same listener more than once.
        */

        if (
          img.dataset.fallbackBound === 'true'
        ) {

          return;

        }


        img.dataset.fallbackBound =
          'true';


        img.addEventListener(
          'error',
          () => {

            const container =
              img.closest(
                '.resource-thumbnail'
              );


            if (!container) {

              return;

            }


            const title =
              container.dataset.title ||
              'DevOps Resource';


            const url =
              container.dataset.url ||
              '';


            container.outerHTML =
              createFallbackThumbnail(
                title,
                url
              );

          },
          {
            once: true
          }
        );

      });

  }


  /* ================================================================
     EXTRACT CATEGORY DESCRIPTION
     ================================================================ */

  function extractDescription(
    markdown,
    title
  ) {

    const summary =
      markdown.match(
        /\*\*Resources:\*\*\s*(\d+)\s+unique\s+URLs?\s+in\s+this\s+section\./i
      );


    if (summary) {

      return (
        `${summary[1]} curated resources in the ` +
        `${title} section.`
      );

    }


    return (
      'DevOps learning and reference resources.'
    );

  }


  /* ================================================================
     LOAD ONE MARKDOWN FILE
     ================================================================ */

  async function loadFile(file) {

    try {

      /*
         Download Markdown from GitHub.
      */

      const raw =
        await GitHubAPI.fetchRawFile(
          file.download_url
        );


      if (!raw) {

        return null;

      }


      /*
         Convert Markdown to HTML for the Source modal.
      */

      const parsed =
        MarkdownParser.parse(raw);


      /*
         Extract all category information.
      */

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


      const resources =
        extractResources(raw);


      const description =
        extractDescription(
          raw,
          title
        );


      /*
         Return one normalized category object.
      */

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

        resources,

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


  /* ================================================================
     LOAD COMPLETE LIBRARY
     ================================================================ */

  async function loadLibrary() {

    const grid =
      $('#library-grid');


    try {

      /*
         Read directory from GitHub.
      */

      const files =
        await GitHubAPI.listDirectory(
          LIBRARY_PATH
        );


      /*
         Keep Markdown files only.
      */

      const markdownFiles =
        files

          .filter(file =>
            file.name
              .toLowerCase()
              .endsWith('.md')
          )

          /*
             The manifest remains in GitHub but is not
             displayed as a category.
          */

          .filter(file =>
            file.name !==
            '99-URL-MANIFEST.md'
          );


      /*
         Load all Markdown files.
      */

      const loaded =
        await Promise.all(
          markdownFiles.map(loadFile)
        );


      /*
         Remove failed files.
      */

      categories =
        loaded.filter(Boolean);


      /*
         Preserve original numbered order.
      */

      categories.sort(
        compareOriginalOrder
      );


      /*
         Initialize filtered category collection.
      */

      filteredCategories =
        [...categories];


      /*
         Update top-level statistics.
      */

      updateStats();


      /*
         Build category dropdown.
      */

      buildCategoryFilter();


      /*
         Render initial category view.
      */

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


  /* ================================================================
     COMPARE ORIGINAL CATEGORY ORDER
     ================================================================ */

  function compareOriginalOrder(
    a,
    b
  ) {

    const numberA =
      Number(
        a.filename.match(/^\d+/)?.[0] ||
        999
      );


    const numberB =
      Number(
        b.filename.match(/^\d+/)?.[0] ||
        999
      );


    return numberA - numberB;

  }


  /* ================================================================
     BUILD CATEGORY FILTER
     ================================================================ */

  function buildCategoryFilter() {

    const select =
      $('#library-category');


    if (!select) {

      return;

    }


    select.innerHTML = `

      <option value="">
        All Categories
      </option>

    `;


    categories.forEach(
      (category, index) => {

        const option =
          document.createElement(
            'option'
          );


        option.value =
          String(index);


        option.textContent =
          category.title;


        select.appendChild(
          option
        );

      }
    );

  }


  /* ================================================================
     UPDATE GLOBAL STATISTICS
     ================================================================ */

  function updateStats() {

    const categoryCount =
      $('#category-count');


    const resourceCount =
      $('#resource-count');


    const urlCount =
      $('#url-count');


    const totalResources =
      categories.reduce(
        (total, category) =>
          total +
          category.resourceCount,
        0
      );


    const totalUrls =
      categories.reduce(
        (total, category) =>
          total +
          category.urls.length,
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


  /* ================================================================
     RENDER MAIN VIEW
     ================================================================ */

  /*
     Central rendering function.

     The application has two views:

         categories
         resources

     The correct renderer is selected automatically.
  */

  function render() {

    if (
      currentView === 'resources'
    ) {

      renderResourceView();

      return;

    }


    renderCategoryView();

  }


  /* ================================================================
     RENDER CATEGORY VIEW
     ================================================================ */

  function renderCategoryView() {

    const grid =
      $('#library-grid');


    const empty =
      $('#library-empty');


    if (!grid) {

      return;

    }


    const visible =
      filteredCategories.slice(
        0,
        visibleCategoryCount
      );


    /*
       No categories found.
    */

    if (!visible.length) {

      grid.innerHTML = '';


      if (empty) {

        empty.hidden =
          false;

      }


      updateResultCount();

      updateLoadMoreButton();

      return;

    }


    /*
       Categories exist.
    */

    if (empty) {

      empty.hidden =
        true;

    }


    /*
       Render category cards only.
    */

    grid.innerHTML =
      visible
        .map(buildCategoryCard)
        .join('');


    updateResultCount();

    updateLoadMoreButton();

  }


  /* ================================================================
     BUILD CATEGORY CARD
     ================================================================ */

  /*
     IMPORTANT:

     This function creates ONLY the Level 1 category card.

     Resource thumbnails are NOT rendered here.
  */

  function buildCategoryCard(
    category
  ) {

    const categoryIndex =
      categories.indexOf(
        category
      );


    const number =
      category.filename
        .match(/^\d+/)?.[0] ||
        '—';


    return `

      <!-- ========================================================
           LEVEL 1 — CATEGORY CARD
           ======================================================== -->

      <article
        class="library-card category-card"
      >

        <div class="library-card-header">

          <span class="library-card-number">

            ${escapeHtml(number)}

          </span>

          <span class="library-card-type">

            DEVOPS

          </span>

        </div>


        <div class="library-card-body">

          <h3>

            ${escapeHtml(
              category.title
            )}

          </h3>


          <p>

            ${escapeHtml(
              category.description
            )}

          </p>


          <div class="library-card-meta">

            <span>

              ${category.resourceCount}
              resources

            </span>

            <span>

              Markdown

            </span>

          </div>


          <!-- ====================================================
               RESOURCE PREVIEW

               Only resource titles are shown here.

               NO thumbnails are shown at Level 1.
               ==================================================== -->

          ${
            category.resourceTitles &&
            category.resourceTitles.length
              ? `

                <div
                  class="library-category-preview"
                >

                  ${category.resourceTitles
                    .slice(0, 3)
                    .map(title => `

                      <span>
                        ${escapeHtml(title)}
                      </span>

                    `)
                    .join('')}

                </div>

              `
              : ''
          }


          <div
            class="library-card-actions"
          >

            <!-- ==================================================
                 ENTER LEVEL 2
                 ================================================== -->

            <button
              class="library-card-btn primary"
              type="button"
              data-action="view-resources"
              data-index="${categoryIndex}"
            >

              View Resources →

            </button>


            <!-- ==================================================
                 GITHUB SOURCE
                 ================================================== -->

            <a
              class="library-card-btn"
              href="${escapeHtml(
                buildGitHubUrl(
                  category.path
                )
              )}"
              target="_blank"
              rel="noopener noreferrer"
            >

              GitHub ↗

            </a>

          </div>

        </div>

      </article>

    `;

  }


  /* ================================================================
     OPEN RESOURCE VIEW
     ================================================================ */

  /*
     Opens Level 2 for the selected category.
  */

  function openResourceView(
    categoryIndex
  ) {

    const category =
      categories[categoryIndex];


    if (!category) {

      return;

    }


    /*
       Save active category.
    */

    activeCategoryIndex =
      categoryIndex;


    currentView =
      'resources';


    /*
       Reset resource pagination.
    */

    visibleResourceCount =
      PAGE_SIZE;


    /*
       Start with every resource.
    */

    filteredResources =
      [...(
        category.resources || []
      )];


    /*
       Update selected category header.
    */

    updateResourceHeader(
      category
    );


    /*
       Hide Level 1.
    */

    const categoryView =
      $('#library-category-view');


    if (categoryView) {

      categoryView.hidden =
        true;

    }


    /*
       Show Level 2.
    */

    const resourceView =
      $('#library-resource-view');


    if (resourceView) {

      resourceView.hidden =
        false;

    }


    /*
       Change section label.
    */

    const viewLabel =
      $('#library-view-label');


    if (viewLabel) {

      viewLabel.textContent =
        'CATEGORY RESOURCES';

    }


    /*
       Render resources.
    */

    renderResourceView();


    /*
       Scroll to the library.
    */

    scrollToLibrary();

  }


  /* ================================================================
     UPDATE RESOURCE HEADER
     ================================================================ */

  function updateResourceHeader(
    category
  ) {

    const numberElement =
      $('#library-resource-category-number');


    const titleElement =
      $('#library-resource-category-title');


    const descriptionElement =
      $('#library-resource-category-description');


    const countElement =
      $('#library-resource-category-count');


    const number =
      category.filename
        .match(/^\d+/)?.[0] ||
        '—';


    if (numberElement) {

      numberElement.textContent =
        number;

    }


    if (titleElement) {

      titleElement.textContent =
        category.title;

    }


    if (descriptionElement) {

      descriptionElement.textContent =
        category.description;

    }


    if (countElement) {

      countElement.textContent =
        `${category.resources.length} Resources`;

    }

  }


  /* ================================================================
     RENDER RESOURCE VIEW
     ================================================================ */

  /*
     Displays individual resource cards.

     This is the ONLY place where resource thumbnails are rendered.
  */

  function renderResourceView() {

    const grid =
      $('#library-resource-grid');


    const empty =
      $('#library-resource-empty');


    if (!grid) {

      return;

    }


    const visible =
      filteredResources.slice(
        0,
        visibleResourceCount
      );


    /*
       No resources.
    */

    if (!visible.length) {

      grid.innerHTML = '';


      if (empty) {

        empty.hidden =
          false;

      }


      updateResultCount();

      updateLoadMoreButton();

      return;

    }


    /*
       Resources exist.
    */

    if (empty) {

      empty.hidden =
        true;

    }


    const category =
      categories[
        activeCategoryIndex
      ];


    if (!category) {

      return;

    }


    /*
       Render individual resource cards.
    */

    grid.innerHTML =
      visible
        .map(resource =>
          buildResourceCard(
            resource,
            category
          )
        )
        .join('');


    /*
       Attach thumbnail error handlers.
    */

    bindThumbnailFallbacks();


    updateResultCount();

    updateLoadMoreButton();

  }


  /* ================================================================
     BUILD RESOURCE CARD
     ================================================================ */

  /*
     Creates one Level 2 resource card.

     Resource cards contain:

         Thumbnail
         Number
         Technology
         Title
         Description
         Category
         Open Resource
         Source
  */

  function buildResourceCard(
    resource,
    category
  ) {

    const technology =
      detectTechnology(
        resource.title,
        resource.url
      );


    const thumbnail =
      getResourceThumbnail(
        resource.title,
        resource.url
      );


    const categoryIndex =
      categories.indexOf(
        category
      );


    return `

      <!-- ========================================================
           LEVEL 2 — RESOURCE CARD
           ======================================================== -->

      <article
        class="library-card resource-card"
        data-resource-url="${escapeHtml(
          resource.url
        )}"
      >

        <!-- ======================================================
             RESOURCE THUMBNAIL
             ====================================================== -->

        ${thumbnail}


        <div class="resource-card-body">

          <!-- ====================================================
               RESOURCE META
               ==================================================== -->

          <div class="resource-card-top">

            <span class="resource-number">

              #${escapeHtml(
                resource.number
              )}

            </span>

            <span class="resource-tech">

              ${escapeHtml(
                technology
              )}

            </span>

          </div>


          <!-- ====================================================
               RESOURCE TITLE
               ==================================================== -->

          <h3 class="resource-title">

            ${escapeHtml(
              resource.title
            )}

          </h3>


          <!-- ====================================================
               RESOURCE DESCRIPTION
               ==================================================== -->

          <p class="resource-description">

            ${escapeHtml(
              resource.description
            )}

          </p>


          <!-- ====================================================
               RESOURCE META INFORMATION
               ==================================================== -->

          <div class="resource-card-meta">

            <span>

              ${escapeHtml(
                category.title
              )}

            </span>

            <span>
              •
            </span>

            <span>
              DEVOPS
            </span>

          </div>


          <!-- ====================================================
               RESOURCE ACTIONS
               ==================================================== -->

          <div
            class="resource-card-actions"
          >

            <!-- Open actual website/resource. -->

            <a
              class="library-card-btn primary resource-open-btn"
              href="${escapeHtml(
                resource.url
              )}"
              target="_blank"
              rel="noopener noreferrer"
            >

              Open Resource ↗

            </a>


            <!-- Open complete Markdown source. -->

            <button
              class="library-card-btn resource-source-btn"
              type="button"
              data-action="open"
              data-index="${categoryIndex}"
            >

              Source

            </button>

          </div>

        </div>

      </article>

    `;

  }


  /* ================================================================
     CLOSE RESOURCE VIEW
     ================================================================ */

  /*
     Returns from Level 2 to Level 1.
  */

  function closeResourceView() {

    currentView =
      'categories';


    activeCategoryIndex =
      null;


    filteredResources =
      [];


    visibleResourceCount =
      PAGE_SIZE;


    const categoryView =
      $('#library-category-view');


    const resourceView =
      $('#library-resource-view');


    /*
       Show categories.
    */

    if (categoryView) {

      categoryView.hidden =
        false;

    }


    /*
       Hide resources.
    */

    if (resourceView) {

      resourceView.hidden =
        true;

    }


    /*
       Restore main section label.
    */

    const viewLabel =
      $('#library-view-label');


    if (viewLabel) {

      viewLabel.textContent =
        'DEVOPS RESOURCE LIBRARY';

    }


    /*
       Render category state again.
    */

    render();


    /*
       Scroll back to library.
    */

    scrollToLibrary();

  }


  /* ================================================================
     SCROLL TO LIBRARY
     ================================================================ */

  function scrollToLibrary() {

    const librarySection =
      document.querySelector(
        '.library-section'
      );


    if (!librarySection) {

      return;

    }


    librarySection.scrollIntoView({

      behavior: 'smooth',

      block: 'start'

    });

  }


  /* ================================================================
     BUILD GITHUB FILE URL
     ================================================================ */

  function buildGitHubUrl(
    path
  ) {

    return (
      `https://github.com/` +
      `${CONFIG.githubUsername}/` +
      `${CONFIG.githubRepo}/blob/` +
      `${CONFIG.branch}/` +
      `${path}`
    );

  }


  /* ================================================================
     APPLY FILTERS
     ================================================================ */

  /*
     Search behaves differently depending on the current view.

     LEVEL 1:

         Search categories.

     LEVEL 2:

         Search resources inside the active category.
  */

  function applyFilters() {

    if (
      currentView === 'resources'
    ) {

      applyResourceFilters();

      return;

    }


    applyCategoryFilters();

  }


  /* ================================================================
     CATEGORY FILTERS
     ================================================================ */

  function applyCategoryFilters() {

    const search =
      (
        $('#library-search')?.value ||
        ''
      )
        .trim()
        .toLowerCase();


    const categoryValue =
      $('#library-category')?.value ||
      '';


    const sort =
      $('#library-sort')?.value ||
      'number';


    filteredCategories =
      categories.filter(
        (item, index) => {


          const searchableText = [

            item.title,

            item.description,

            item.filename,

            ...item.resourceTitles,

            ...(item.resources || [])
              .map(resource =>
                resource.title
              )

          ]
            .join(' ')
            .toLowerCase();


          const matchesSearch =
            !search ||
            searchableText.includes(
              search
            );


          const matchesCategory =
            !categoryValue ||
            Number(categoryValue) === index;


          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );


    /*
       Sort the category results.
    */

    sortCategories(
      sort
    );


    /*
       Reset category pagination.
    */

    visibleCategoryCount =
      PAGE_SIZE;


    /*
       Render category view.
    */

    renderCategoryView();

  }


  /* ================================================================
     RESOURCE FILTERS
     ================================================================ */

  function applyResourceFilters() {

    const category =
      categories[
        activeCategoryIndex
      ];


    if (!category) {

      return;

    }


    const search =
      (
        $('#library-search')?.value ||
        ''
      )
        .trim()
        .toLowerCase();


    const sort =
      $('#library-sort')?.value ||
      'number';


    /*
       Filter resources.
    */

    filteredResources =
      (category.resources || [])
        .filter(resource => {

          const technology =
            detectTechnology(
              resource.title,
              resource.url
            );


          const searchableText = [

            resource.number,

            resource.title,

            resource.description,

            resource.url,

            technology,

            category.title

          ]
            .join(' ')
            .toLowerCase();


          return (
            !search ||
            searchableText.includes(
              search
            )
          );

        });


    /*
       Sort resources.
    */

    sortResources(
      sort
    );


    /*
       Reset resource pagination.
    */

    visibleResourceCount =
      PAGE_SIZE;


    /*
       Render Level 2.
    */

    renderResourceView();

  }


  /* ================================================================
     SORT CATEGORIES
     ================================================================ */

  function sortCategories(
    sort
  ) {

    switch (sort) {


      case 'az':

        filteredCategories.sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        );

        break;


      case 'za':

        filteredCategories.sort(
          (a, b) =>
            b.title.localeCompare(
              a.title
            )
        );

        break;


      case 'resources-high':

        filteredCategories.sort(
          (a, b) =>
            b.resourceCount -
            a.resourceCount
        );

        break;


      case 'resources-low':

        filteredCategories.sort(
          (a, b) =>
            a.resourceCount -
            b.resourceCount
        );

        break;


      case 'number':

      default:

        filteredCategories.sort(
          compareOriginalOrder
        );

        break;

    }

  }


  /* ================================================================
     SORT RESOURCES
     ================================================================ */

  /*
     Resource sorting uses:

         Original number
         A → Z
         Z → A

     The resource page does not have a meaningful
     "Most Resources" / "Least Resources" operation because
     each card represents one resource.
  */

  function sortResources(
    sort
  ) {

    switch (sort) {


      case 'az':

        filteredResources.sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        );

        break;


      case 'za':

        filteredResources.sort(
          (a, b) =>
            b.title.localeCompare(
              a.title
            )
        );

        break;


      case 'resources-high':

      case 'resources-low':

      case 'number':

      default:

        filteredResources.sort(
          (a, b) =>
            Number(a.number) -
            Number(b.number)
        );

        break;

    }

  }


  /* ================================================================
     RESULT COUNT
     ================================================================ */

  /*
     LEVEL 1 example:

         Showing 6 of 12 categories • 143 resources

     LEVEL 2 example:

         Showing 6 of 17 resources in Charlie DEVOPS Course
  */

  function updateResultCount() {

    const element =
      $('#library-result-count');


    if (!element) {

      return;

    }


    if (
      currentView === 'resources'
    ) {

      const category =
        categories[
          activeCategoryIndex
        ];


      if (!category) {

        element.textContent =
          'No category selected';

        return;

      }


      element.textContent =
        `Showing ${
          Math.min(
            visibleResourceCount,
            filteredResources.length
          )
        } of ${
          filteredResources.length
        } resources in ${
          category.title
        }`;


      return;

    }


    /*
       CATEGORY VIEW
    */

    const totalResources =
      filteredCategories.reduce(
        (total, item) =>
          total +
          item.resourceCount,
        0
      );


    element.textContent =
      `Showing ${
        Math.min(
          visibleCategoryCount,
          filteredCategories.length
        )
      } of ${
        filteredCategories.length
      } categories • ${
        totalResources.toLocaleString()
      } resources`;

  }


  /* ================================================================
     OPEN MARKDOWN SOURCE MODAL
     ================================================================ */

  /*
     Opens the complete Markdown category.

     This is intentionally separate from:

         Open Resource ↗

     Open Resource:
         opens the actual external resource.

     Source:
         opens the Markdown source modal.
  */

  function openModal(
    index
  ) {

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
       Render parsed Markdown HTML.
    */

    if (content) {

      content.innerHTML =
        category.html;


      /*
         Make Markdown links open safely.
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
       Prevent background page scrolling.
    */

    document.body.style.overflow =
      'hidden';

  }


  /* ================================================================
     CLOSE MODAL
     ================================================================ */

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


    document.body.style.overflow =
      '';

  }


  /* ================================================================
     LOAD MORE BUTTON
     ================================================================ */

  /*
     The HTML already contains:

         #library-load-more

     Therefore this function does NOT create another button.

     It simply updates its state.
  */

  function updateLoadMoreButton() {

    const button =
      $('#library-load-more');


    if (!button) {

      return;

    }


    if (
      currentView === 'resources'
    ) {

      const hasMoreResources =
        visibleResourceCount <
        filteredResources.length;


      button.hidden =
        !hasMoreResources;


      button.textContent =
        'Load More Resources →';


      return;

    }


    /*
       CATEGORY VIEW
    */

    const hasMoreCategories =
      visibleCategoryCount <
      filteredCategories.length;


    button.hidden =
      !hasMoreCategories;


    button.textContent =
      'Load More Categories →';

  }


  /* ================================================================
     HANDLE LOAD MORE
     ================================================================ */

  function handleLoadMore() {

    if (
      currentView === 'resources'
    ) {

      visibleResourceCount +=
        PAGE_SIZE;


      renderResourceView();

      return;

    }


    visibleCategoryCount +=
      PAGE_SIZE;


    renderCategoryView();

  }


  /* ================================================================
     CLEAR FILTERS
     ================================================================ */

  function clearFilters() {

    const search =
      $('#library-search');


    const category =
      $('#library-category');


    const sort =
      $('#library-sort');


    if (search) {

      search.value =
        '';

    }


    if (category) {

      category.value =
        '';

    }


    if (sort) {

      sort.value =
        'number';

    }


    /*
       If the user is inside a category,
       return to the main category view.
    */

    if (
      currentView === 'resources'
    ) {

      closeResourceView();

    }


    /*
       Reset category filtering.
    */

    filteredCategories =
      [...categories];


    visibleCategoryCount =
      PAGE_SIZE;


    /*
       Render clean category state.
    */

    renderCategoryView();

  }


  /* ================================================================
     EVENT LISTENERS
     ================================================================ */

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


    const resourceGrid =
      $('#library-resource-grid');


    const backButton =
      $('#library-back-to-categories');


    const loadMore =
      $('#library-load-more');


    const close =
      $('#library-modal-close');


    const backdrop =
      document.querySelector(
        '.library-modal-backdrop'
      );


    /* ============================================================
       SEARCH
       ============================================================ */

    if (search) {

      search.addEventListener(
        'input',
        applyFilters
      );

    }


    /* ============================================================
       CATEGORY DROPDOWN
       ============================================================ */

    if (category) {

      category.addEventListener(
        'change',
        () => {

          /*
             Category dropdown is a Level 1 filter.

             If the visitor selects a category,
             only that category is shown.

             The visitor can then click:

                 View Resources →
          */

          if (
            currentView === 'resources'
          ) {

            closeResourceView();

          }


          applyCategoryFilters();

        }
      );

    }


    /* ============================================================
       SORTING
       ============================================================ */

    if (sort) {

      sort.addEventListener(
        'change',
        applyFilters
      );

    }


    /* ============================================================
       CLEAR FILTERS
       ============================================================ */

    if (clear) {

      clear.addEventListener(
        'click',
        clearFilters
      );

    }


    /* ============================================================
       CATEGORY GRID
       ============================================================

       Handles:

           View Resources
           Source
    */

    if (grid) {

      grid.addEventListener(
        'click',
        event => {


          /*
             View Resources button.
          */

          const resourceButton =
            event.target.closest(
              '[data-action="view-resources"]'
            );


          if (resourceButton) {

            const index =
              Number(
                resourceButton.dataset.index
              );


            openResourceView(
              index
            );


            return;

          }


          /*
             Source button.
          */

          const sourceButton =
            event.target.closest(
              '[data-action="open"]'
            );


          if (sourceButton) {

            const index =
              Number(
                sourceButton.dataset.index
              );


            openModal(
              index
            );

          }

        }
      );

    }


    /* ============================================================
       RESOURCE GRID
       ============================================================

       Handles:

           Source
    */

    if (resourceGrid) {

      resourceGrid.addEventListener(
        'click',
        event => {

          const sourceButton =
            event.target.closest(
              '[data-action="open"]'
            );


          if (!sourceButton) {

            return;

          }


          const index =
            Number(
              sourceButton.dataset.index
            );


          openModal(
            index
          );

        }
      );

    }


    /* ============================================================
       BACK TO CATEGORIES
       ============================================================ */

    if (backButton) {

      backButton.addEventListener(
        'click',
        closeResourceView
      );

    }


    /* ============================================================
       LOAD MORE
       ============================================================ */

    if (loadMore) {

      loadMore.addEventListener(
        'click',
        handleLoadMore
      );

    }


    /* ============================================================
       CLOSE MODAL BUTTON
       ============================================================ */

    if (close) {

      close.addEventListener(
        'click',
        closeModal
      );

    }


    /* ============================================================
       MODAL BACKDROP
       ============================================================ */

    if (backdrop) {

      backdrop.addEventListener(
        'click',
        closeModal
      );

    }


    /* ============================================================
       ESCAPE KEY
       ============================================================ */

    document.addEventListener(
      'keydown',
      event => {

        if (
          event.key ===
          'Escape'
        ) {

          closeModal();

        }

      }
    );

  }


  /* ================================================================
     INITIALIZE
     ================================================================ */

  async function init() {

    /*
       Start with Level 1.
    */

    currentView =
      'categories';


    activeCategoryIndex =
      null;


    /*
       Bind all UI events.
    */

    bindEvents();


    /*
       Load Markdown library from GitHub.
    */

    await loadLibrary();


    /*
       Make sure Load More button has the correct state.
    */

    updateLoadMoreButton();

  }


  /* ================================================================
     PUBLIC API
     ================================================================ */

  return {

    init

  };


})();


/* ================================================================
   START CHARLIE DEVOPS LIBRARY
   ================================================================ */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    DevOpsLibrary.init();

  }
);

