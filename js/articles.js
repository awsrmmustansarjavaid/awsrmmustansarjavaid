/**
 * ==========================================================
 * CHARLIE MJ — DEVOPS ARTICLES AGGREGATOR
 * File: articles.js
 * Version: 2.1.0
 * Hosting: GitHub Pages / static hosting
 *
 * Sources:
 *   1. LinkedIn articles from ./data/articles.md
 *   2. Medium RSS using three fallback methods:
 *        A. Direct browser RSS fetch
 *        B. RSS2JSON
 *        C. AllOrigins CORS proxy
 *
 * No backend, database, build process, or GitHub Actions required.
 *
 * IMPORTANT:
 * Public RSS conversion/CORS services are third-party dependencies.
 * Their availability, limits, and terms can change. Configure or
 * replace providers in CONFIG.medium.providers when necessary.
 *
 * Changes in 2.1.0:
 *   - Works with a single search bar (#article-search).
 *   - HTML entities (e.g. &amp;) are decoded in titles and summaries.
 *   - Block-level HTML in summaries is separated by spaces, so words
 *     no longer run together.
 *   - Sets the Medium (and optional LinkedIn) profile buttons.
 * ==========================================================
 */

(() => {
    "use strict";

    /* ======================================================
       1. CONFIGURATION
       ====================================================== */

    const CONFIG = {
        profiles: {
            medium: "https://medium.com/@itcharlie.mj2",
            // Add your LinkedIn profile URL here, e.g.
            // "https://www.linkedin.com/in/your-name/"
            linkedin: ""
        },

        medium: {
            feedUrl: "https://medium.com/feed/@itcharlie.mj2",

            // The providers are attempted in this exact order.
            providers: [
                {
                    id: "direct",
                    name: "Direct Medium RSS",
                    enabled: true
                },
                {
                    id: "rss2json",
                    name: "RSS2JSON",
                    enabled: true,
                    endpoint: "https://api.rss2json.com/v1/api.json"
                },
                {
                    id: "allorigins",
                    name: "AllOrigins CORS Proxy",
                    enabled: true,
                    endpoint: "https://api.allorigins.win/raw?url="
                }
            ]
        },

        linkedin: {
            markdownUrl: "./data/articles.md"
        },

        requestTimeoutMs: 15000,
        maxArticles: 100,
        cacheDurationMs: 15 * 60 * 1000,
        cacheKey: "charlie_mj_devops_articles_v2",
        fetchLinkedInMarkdown: true
    };


    /* ======================================================
       2. DOM ELEMENTS
       ====================================================== */

    const grid = document.getElementById("articles-grid");
    const status = document.getElementById("articles-status");
    const searchInput = document.getElementById("article-search");
    const sourceFilter = document.getElementById("article-source-filter");
    const refreshButton = document.getElementById("articles-refresh");
    const mediumProfile = document.getElementById("p-medium");
    const linkedinProfile = document.getElementById("p-linkedin");

    if (!grid) {
        console.error(
            "[Charlie MJ Articles] Missing required element: #articles-grid"
        );
        return;
    }

    let allArticles = [];
    let isLoading = false;


    /* ======================================================
       3. GENERAL HELPERS
       ====================================================== */

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function cleanText(value = "") {
        return String(value)
            .replace(/[\u00a0]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function safeUrl(value) {
        try {
            const url = new URL(String(value).trim());

            if (!["https:", "http:"].includes(url.protocol)) {
                return "";
            }

            return url.href;
        } catch {
            return "";
        }
    }

    function normalizeArticleUrl(value) {
        const safe = safeUrl(value);
        if (!safe) return "";

        try {
            const url = new URL(safe);
            url.hash = "";

            [
                "source",
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_content",
                "utm_term",
                "ref"
            ].forEach(parameter => url.searchParams.delete(parameter));

            return url.href.replace(/\/+$/, "");
        } catch {
            return safe.replace(/\/+$/, "");
        }
    }

    // Converts HTML (or text containing HTML entities) to clean plain text.
    // Block-level tags become spaces so words do not run together, and
    // entities such as &amp; are decoded.
    function stripHtml(value = "") {
        const spaced = String(value).replace(
            /<\/?(p|div|br|li|ul|ol|h[1-6]|blockquote|figure|figcaption|pre|tr|td)\b[^>]*>/gi,
            " "
        );

        const documentNode = new DOMParser().parseFromString(
            spaced,
            "text/html"
        );

        documentNode
            .querySelectorAll("script, style, noscript")
            .forEach(node => node.remove());

        let text = cleanText(documentNode.body.textContent || "");

        // Some feeds double-encode entities (e.g. "&amp;amp;"). Decode once more.
        if (/&(?:amp|lt|gt|quot|#\d+|#x[0-9a-f]+);/i.test(text)) {
            const second = new DOMParser().parseFromString(
                text,
                "text/html"
            );
            text = cleanText(second.documentElement.textContent || text);
        }

        return text;
    }

    function parseDate(value) {
        if (!value) return "";

        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "" : date.toISOString();
    }

    function formatDate(value) {
        const date = new Date(value);
        if (!value || Number.isNaN(date.getTime())) return "";

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function createElement(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (text !== undefined && text !== null) {
            node.textContent = String(text);
        }

        return node;
    }

    function withTimeout(url, options = {}) {
        const controller = new AbortController();
        const timeout = setTimeout(
            () => controller.abort(),
            CONFIG.requestTimeoutMs
        );

        return fetch(url, {
            ...options,
            signal: controller.signal
        }).finally(() => clearTimeout(timeout));
    }

    function setupProfileLinks() {
        const medium = safeUrl(CONFIG.profiles.medium);
        const linkedin = safeUrl(CONFIG.profiles.linkedin);

        if (mediumProfile && medium) {
            mediumProfile.href = medium;
            mediumProfile.target = "_blank";
            mediumProfile.rel = "noopener noreferrer";
        }

        if (linkedinProfile && linkedin) {
            linkedinProfile.href = linkedin;
            linkedinProfile.target = "_blank";
            linkedinProfile.rel = "noopener noreferrer";
        }
    }


    /* ======================================================
       4. LINKEDIN MARKDOWN FETCHER
       ====================================================== */

    async function fetchLinkedInArticles() {
        if (!CONFIG.fetchLinkedInMarkdown) return [];

        const markdownUrl = safeUrl(
            new URL(CONFIG.linkedin.markdownUrl, document.baseURI).href
        );

        if (!markdownUrl) {
            throw new Error("Invalid LinkedIn Markdown URL.");
        }

        const response = await withTimeout(markdownUrl, {
            method: "GET",
            cache: "no-store",
            credentials: "same-origin"
        });

        if (!response.ok) {
            throw new Error(
                `LinkedIn Markdown request failed: HTTP ${response.status}`
            );
        }

        const markdown = await response.text();
        return parseLinkedInMarkdown(markdown);
    }

    /**
     * Supported Markdown record format:
     *
     * ## Articles
     *
     * ### Article title
     * - url: https://...
     * - date: 2026-11-13
     * - category: Kubernetes
     * - tags: Kubernetes, Helm, DevOps
     * - summary: Short article description.
     * - featured: true
     *
     * A record starts with a level-three heading (###).
     */
    function parseLinkedInMarkdown(markdown) {
        const lines = String(markdown || "").split(/\r?\n/);
        const records = [];
        let current = null;

        function finishRecord() {
            if (!current) return;

            const title = cleanText(current.title);
            const url = safeUrl(current.url);

            if (title && url) {
                records.push(normalizeArticle({
                    title,
                    url,
                    date: current.date || "",
                    summary: current.summary || "",
                    author: current.author || "",
                    source: "LinkedIn",
                    category: current.category || "General",
                    tags: current.tags || [],
                    featured: current.featured === true ||
                        String(current.featured).toLowerCase() === "true"
                }));
            }

            current = null;
        }

        for (const rawLine of lines) {
            const line = rawLine.trim();

            const heading = line.match(/^###\s+(.+)$/);
            if (heading) {
                finishRecord();
                current = {
                    title: heading[1].replace(/^["']|["']$/g, ""),
                    tags: []
                };
                continue;
            }

            if (!current) continue;

            const field = line.match(
                /^[-*]\s*(title|url|date|summary|author|category|tags|featured)\s*:\s*(.*)$/i
            );

            if (!field) continue;

            const key = field[1].toLowerCase();
            const value = field[2].trim();

            if (key === "tags") {
                current.tags = value
                    .split(",")
                    .map(tag => cleanText(tag))
                    .filter(Boolean);
            } else if (key === "featured") {
                current.featured = value;
            } else {
                current[key] = value;
            }
        }

        finishRecord();
        return records;
    }


    /* ======================================================
       5. MEDIUM RSS — THREE FALLBACK PROVIDERS
       ====================================================== */

    async function fetchMediumArticles() {
        const feedUrl = safeUrl(CONFIG.medium.feedUrl);

        if (!feedUrl) {
            throw new Error("Invalid Medium RSS feed URL.");
        }

        const enabledProviders = CONFIG.medium.providers.filter(
            provider => provider.enabled
        );

        const failures = [];

        for (const provider of enabledProviders) {
            try {
                console.info(
                    `[Charlie MJ Articles] Trying Medium provider: ${provider.name}`
                );

                const articles = await fetchWithProvider(provider, feedUrl);

                if (!articles.length) {
                    throw new Error("The provider returned no articles.");
                }

                console.info(
                    `[Charlie MJ Articles] Medium loaded using ${provider.name}: ${articles.length} articles`
                );

                return {
                    articles,
                    provider: provider.name,
                    failures
                };
            } catch (error) {
                console.warn(
                    `[Charlie MJ Articles] ${provider.name} failed:`,
                    error.message || error
                );

                failures.push({
                    provider: provider.name,
                    message: error.message || "Unknown error"
                });
            }
        }

        throw new Error(
            failures.map(item => `${item.provider}: ${item.message}`).join(" | ") ||
            "No Medium RSS providers are enabled."
        );
    }

    async function fetchWithProvider(provider, feedUrl) {
        switch (provider.id) {
            case "direct":
                return fetchXmlFeed(feedUrl);

            case "rss2json":
                return fetchRss2Json(provider, feedUrl);

            case "allorigins":
                return fetchAllOrigins(provider, feedUrl);

            default:
                throw new Error(`Unknown provider: ${provider.id}`);
        }
    }

    // Method A: Fetch the Medium RSS XML directly.
    // This may fail because Medium does not guarantee browser CORS access.
    async function fetchXmlFeed(feedUrl) {
        const response = await withTimeout(feedUrl, {
            method: "GET",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Accept": "application/rss+xml, application/xml, text/xml"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xmlText = await response.text();
        return parseRssXml(xmlText);
    }

    // Method B: Convert Medium RSS to JSON using RSS2JSON.
    async function fetchRss2Json(provider, feedUrl) {
        const endpoint = new URL(provider.endpoint);
        endpoint.searchParams.set("rss_url", feedUrl);

        const response = await withTimeout(endpoint.href, {
            method: "GET",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.status && data.status.toLowerCase() !== "ok") {
            throw new Error(data.message || "RSS2JSON reported an error.");
        }

        if (!Array.isArray(data.items)) {
            throw new Error("RSS2JSON response did not contain an items array.");
        }

        return data.items.map(item => normalizeArticle({
            title: item.title,
            url: item.link,
            date: item.pubDate || item.isoDate,
            summary: item.content || item.description || "",
            author: item.author || item.creator || "",
            source: "Medium",
            category: "General",
            tags: Array.isArray(item.categories) ? item.categories : []
        })).filter(article => article.title && article.url);
    }

    // Method C: Retrieve the original XML through AllOrigins.
    async function fetchAllOrigins(provider, feedUrl) {
        const requestUrl = provider.endpoint + encodeURIComponent(feedUrl);

        const response = await withTimeout(requestUrl, {
            method: "GET",
            mode: "cors",
            credentials: "omit"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xmlText = await response.text();
        return parseRssXml(xmlText);
    }


    /* ======================================================
       6. RSS / ATOM XML PARSER
       ====================================================== */

    function parseRssXml(xmlText) {
        const xml = new DOMParser().parseFromString(
            String(xmlText || ""),
            "application/xml"
        );

        if (
            xml.querySelector("parsererror") ||
            xml.documentElement?.localName === "parsererror"
        ) {
            throw new Error("The RSS provider returned invalid XML.");
        }

        const items = [
            ...xml.getElementsByTagName("item"),
            ...xml.getElementsByTagName("entry")
        ];

        if (!items.length) {
            throw new Error("No RSS or Atom entries were found.");
        }

        return items.map(item => {
            const getText = names => {
                for (const name of names) {
                    const element = item.getElementsByTagNameNS("*", name)[0] ||
                        item.getElementsByTagName(name)[0];

                    if (element?.textContent) {
                        return element.textContent.trim();
                    }
                }
                return "";
            };

            const linkNode =
                item.querySelector('link[rel="alternate"]') ||
                item.querySelector("link");

            const link = safeUrl(
                linkNode?.getAttribute("href") ||
                linkNode?.textContent ||
                getText(["guid"])
            );

            const content = getText(["encoded", "content"]);
            const description = getText(["description", "summary"]);

            // Medium puts topics in <category> elements.
            const categories = [...item.getElementsByTagName("category")]
                .map(node => cleanText(node.textContent || ""))
                .filter(Boolean);

            return normalizeArticle({
                title: getText(["title"]) || "Untitled",
                url: link,
                date: getText([
                    "pubDate",
                    "published",
                    "updated",
                    "date"
                ]),
                summary: content || description,
                author: getText(["creator", "author"]),
                source: "Medium",
                category: "General",
                tags: categories
            });
        }).filter(article => article.title && article.url);
    }


    /* ======================================================
       7. ARTICLE NORMALIZATION AND DEDUPLICATION
       ====================================================== */

    function normalizeArticle(article) {
        const url = safeUrl(article.url);

        return {
            title: stripHtml(article.title || "Untitled") || "Untitled",
            url,
            normalizedUrl: normalizeArticleUrl(url),
            date: parseDate(article.date),
            summary: stripHtml(article.summary || "").slice(0, 320),
            author: cleanText(article.author || ""),
            source: article.source === "LinkedIn" ? "LinkedIn" : "Medium",
            category: cleanText(article.category || "General"),
            tags: Array.isArray(article.tags)
                ? article.tags.map(tag => stripHtml(tag)).filter(Boolean)
                : [],
            featured: Boolean(article.featured)
        };
    }

    function deduplicateArticles(articles) {
        const unique = new Map();

        for (const article of articles) {
            if (!article.url || !article.normalizedUrl) continue;

            const key = article.normalizedUrl;

            if (!unique.has(key)) {
                unique.set(key, article);
            } else {
                // Prefer the record with the most useful metadata.
                const existing = unique.get(key);
                const existingScore =
                    (existing.summary ? 1 : 0) +
                    (existing.date ? 1 : 0) +
                    (existing.tags.length ? 1 : 0);

                const newScore =
                    (article.summary ? 1 : 0) +
                    (article.date ? 1 : 0) +
                    (article.tags.length ? 1 : 0);

                if (newScore > existingScore) {
                    unique.set(key, article);
                }
            }
        }

        return [...unique.values()].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
    }


    /* ======================================================
       8. LOCAL STORAGE CACHE
       ====================================================== */

    function saveCache(articles) {
        try {
            localStorage.setItem(
                CONFIG.cacheKey,
                JSON.stringify({
                    savedAt: Date.now(),
                    articles
                })
            );
        } catch (error) {
            console.warn(
                "[Charlie MJ Articles] Could not save cache:",
                error
            );
        }
    }

    function readCache() {
        try {
            const raw = localStorage.getItem(CONFIG.cacheKey);
            if (!raw) return null;

            const cache = JSON.parse(raw);

            if (!Array.isArray(cache.articles)) return null;

            const age = Date.now() - Number(cache.savedAt || 0);

            return {
                articles: cache.articles,
                fresh: age >= 0 && age < CONFIG.cacheDurationMs,
                savedAt: cache.savedAt
            };
        } catch {
            return null;
        }
    }


    /* ======================================================
       9. LOAD AND MERGE ARTICLE SOURCES
       ====================================================== */

    async function loadArticles(options = {}) {
        if (isLoading) return;

        isLoading = true;
        if (refreshButton) refreshButton.disabled = true;

        const forceRefresh = Boolean(options.forceRefresh);

        setStatus(
            forceRefresh
                ? "Refreshing articles..."
                : "Checking for new articles..."
        );

        const sourceResults = await Promise.allSettled([
            fetchLinkedInArticles(),
            fetchMediumArticles()
        ]);

        const linkedInResult = sourceResults[0];
        const mediumResult = sourceResults[1];

        const merged = [];
        const errors = [];
        let mediumProvider = "";

        if (linkedInResult.status === "fulfilled") {
            merged.push(...linkedInResult.value);
        } else {
            // A missing LinkedIn Markdown file is not a problem when
            // Medium works, so this is only reported if nothing loads.
            errors.push(
                `LinkedIn: ${linkedInResult.reason?.message || "Could not load Markdown."}`
            );
        }

        if (mediumResult.status === "fulfilled") {
            merged.push(...mediumResult.value.articles);
            mediumProvider = mediumResult.value.provider;
        } else {
            errors.push(
                `Medium: ${mediumResult.reason?.message || "All RSS methods failed."}`
            );
        }

        const freshArticles = deduplicateArticles(merged)
            .slice(0, CONFIG.maxArticles);

        if (freshArticles.length) {
            allArticles = freshArticles;
            saveCache(allArticles);
            renderArticles();

            if (errors.length) {
                console.warn("[Charlie MJ Articles] Source errors:", errors);
            }

            // renderArticles() sets the "Showing X of Y" status line.
            // Append where the Medium data came from for transparency.
            if (mediumProvider && status) {
                status.textContent += ` Medium via ${mediumProvider}.`;
            }
            if (errors.length && status) {
                status.textContent += " Some sources could not be loaded.";
            }
        } else if (!allArticles.length) {
            const cache = readCache();

            if (cache?.articles?.length) {
                allArticles = cache.articles;
                renderArticles();
                setStatus(
                    `Showing ${allArticles.length} cached articles. Live sources are unavailable.`
                );
            } else {
                renderArticles();
                setStatus(
                    errors.length
                        ? errors.join(" ")
                        : "No articles were found."
                );
            }
        } else {
            // Keep previously visible content if a refresh returns no data.
            setStatus(
                `Could not refresh sources. Keeping ${allArticles.length} previously loaded articles. ${errors.join(" ")}`
            );
        }

        isLoading = false;
        if (refreshButton) refreshButton.disabled = false;
    }


    /* ======================================================
       10. ARTICLE CARD RENDERING
       ====================================================== */

    function createArticleCard(article) {
        const card = createElement("article", "dn-card article-card");

        if (article.featured) {
            card.classList.add("article-card-featured");
        }

        const topLine = createElement("div", "article-card-top");

        topLine.append(
            createElement(
                "span",
                `article-source-badge article-source-${article.source.toLowerCase()}`,
                article.source
            )
        );

        if (article.featured) {
            topLine.append(
                createElement("span", "article-featured-label", "Featured")
            );
        }

        const title = createElement("h2", "dn-card-title");
        const titleLink = createElement("a", "", article.title);

        titleLink.href = article.url;
        titleLink.target = "_blank";
        titleLink.rel = "noopener noreferrer";
        title.append(titleLink);

        const description = createElement(
            "p",
            "dn-card-text",
            article.summary || "Read the original article for the full content."
        );

        const metadataParts = [];

        if (article.author) metadataParts.push(article.author);
        if (article.date) metadataParts.push(formatDate(article.date));
        if (article.category) metadataParts.push(article.category);

        const metadata = createElement(
            "p",
            "dn-card-meta",
            metadataParts.join(" · ")
        );

        const tags = createElement("div", "article-tags");

        article.tags.slice(0, 5).forEach(tag => {
            tags.append(createElement("span", "article-tag", tag));
        });

        const actions = createElement("div", "dn-card-actions");

        const readLink = createElement(
            "a",
            "dn-btn dn-btn-primary",
            "Read original article ↗"
        );

        readLink.href = article.url;
        readLink.target = "_blank";
        readLink.rel = "noopener noreferrer";

        actions.append(readLink);

        card.append(topLine, title, description);

        if (tags.childElementCount) card.append(tags);
        if (metadataParts.length) card.append(metadata);

        card.append(actions);

        return card;
    }


    /* ======================================================
       11. SEARCH AND SOURCE FILTER
       ====================================================== */

    function renderArticles() {
        const query = cleanText(searchInput?.value || "").toLowerCase();
        const selectedSource = sourceFilter?.value || "all";

        const filtered = allArticles.filter(article => {
            const sourceMatches =
                selectedSource === "all" ||
                article.source.toLowerCase() === selectedSource.toLowerCase();

            const searchableText = [
                article.title,
                article.summary,
                article.author,
                article.source,
                article.category,
                ...(article.tags || [])
            ].join(" ").toLowerCase();

            return sourceMatches && searchableText.includes(query);
        });

        if (!filtered.length) {
            grid.replaceChildren(
                createElement(
                    "p",
                    "dn-state",
                    allArticles.length
                        ? "No articles match your search or selected filter."
                        : "No articles are available yet."
                )
            );

            if (allArticles.length) {
                setStatus(`Showing 0 of ${allArticles.length} articles.`);
            }

            return;
        }

        const fragment = document.createDocumentFragment();

        filtered.forEach(article => {
            fragment.append(createArticleCard(article));
        });

        grid.replaceChildren(fragment);

        setStatus(`Showing ${filtered.length} of ${allArticles.length} articles.`);
    }


    /* ======================================================
       12. EVENT LISTENERS AND INITIALIZATION
       ====================================================== */

    searchInput?.addEventListener("input", renderArticles);
    sourceFilter?.addEventListener("change", renderArticles);

    refreshButton?.addEventListener("click", () => {
        loadArticles({ forceRefresh: true });
    });

    async function initialize() {
        setupProfileLinks();

        // Render cached data immediately, even if it is stale.
        const cache = readCache();

        if (cache?.articles?.length) {
            allArticles = cache.articles;
            renderArticles();

            setStatus(
                cache.fresh
                    ? "Showing recently cached articles. Checking for updates..."
                    : "Showing saved articles. Checking for fresh updates..."
            );
        } else {
            setStatus("Loading articles...");
        }

        // Always refresh in the background so visitors can see new posts.
        await loadArticles();
    }

    initialize().catch(error => {
        console.error("[Charlie MJ Articles] Initialization failed:", error);
        setStatus("Unable to initialize articles. Please refresh the page.");
    });

})();
