
/**
 * ==========================================================
 * CHARLIE MJ — DEVOPS ARTICLES AGGREGATOR
 * File: articles.js
 * ==========================================================
 *
 * Features:
 * 1. Fetch Medium RSS feeds.
 * 2. Display manually registered LinkedIn articles.
 * 3. Merge and remove duplicate articles.
 * 4. Sort by publication date.
 * 5. Search and filter articles.
 * 6. Cache results in localStorage.
 * 7. Safely render external content.
 *
 * Hosting: GitHub Pages
 * Backend: Not required
 */

(() => {
    "use strict";

    /* ======================================================
       1. CONFIGURATION
       ====================================================== */

    const CONFIG = {

        // Replace with your actual Medium username.
        mediumFeeds: [
            {
                name: "Medium",
                url: "https://medium.com/feed/@YOUR_MEDIUM_USERNAME"
            }
        ],

        // LinkedIn articles are manually registered.
        // This does not scrape LinkedIn.
        linkedInArticles: [

            /*
            {
                title: "My DevOps Article",
                url: "https://www.linkedin.com/pulse/your-article/",
                date: "2026-11-01",
                summary: "An introduction to DevOps."
            }
            */

        ],

        // Public CORS proxy for Medium RSS.
        // You can replace it with another trusted proxy.
        corsProxy: "https://proxy.cors.dev/",

        maxArticles: 30,
        cacheDuration: 15 * 60 * 1000,
        cacheKey: "charlie_devops_articles_v1"
    };


    /* ======================================================
       2. HTML ELEMENTS
       ====================================================== */

    const grid = document.getElementById("articles-grid");
    const status = document.getElementById("articles-status");
    const search = document.getElementById("article-search");
    const filter = document.getElementById("article-source-filter");
    const refresh = document.getElementById("articles-refresh");

    if (!grid) {
        console.error("Articles grid not found.");
        return;
    }

    let allArticles = [];


    /* ======================================================
       3. GENERAL HELPERS
       ====================================================== */

    function safeUrl(value) {
        try {
            const url = new URL(value);

            return ["https:", "http:"].includes(url.protocol)
                ? url.href
                : "";

        } catch {
            return "";
        }
    }

    function cleanText(value = "") {
        return String(value).replace(/\s+/g, " ").trim();
    }

    function stripHtml(value = "") {
        const doc = new DOMParser().parseFromString(
            value,
            "text/html"
        );

        return cleanText(doc.body.textContent || "");
    }

    function formatDate(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "";

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;

        return node;
    }


    /* ======================================================
       4. MEDIUM RSS FETCHER
       ====================================================== */

    async function fetchMediumFeed(feed) {

        const feedUrl = safeUrl(feed.url);

        if (!feedUrl) {
            throw new Error("Invalid Medium feed URL");
        }

        const requestUrl = CONFIG.corsProxy
            ? CONFIG.corsProxy + feedUrl
            : feedUrl;

        const response = await fetch(requestUrl, {
            method: "GET",
            mode: "cors",
            credentials: "omit",
            signal: AbortSignal.timeout(12000)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xmlText = await response.text();

        const xml = new DOMParser().parseFromString(
            xmlText,
            "application/xml"
        );

        if (xml.querySelector("parsererror")) {
            throw new Error("Invalid RSS XML");
        }

        return [...xml.querySelectorAll("item, entry")]
            .map(item => {

                const getText = selector =>
                    item.querySelector(selector)?.textContent?.trim() || "";

                const linkElement =
                    item.querySelector('link[rel="alternate"]') ||
                    item.querySelector("link");

                const link = safeUrl(
                    linkElement?.getAttribute("href") ||
                    linkElement?.textContent?.trim() ||
                    ""
                );

                if (!link) return null;

                const summary =
                    getText("description") ||
                    getText("summary");

                const encoded = item.getElementsByTagNameNS(
                    "*",
                    "encoded"
                )[0]?.textContent || "";

                return {
                    title: cleanText(getText("title")) || "Untitled",
                    url: link,
                    date:
                        getText("pubDate") ||
                        getText("published") ||
                        getText("updated"),
                    summary: stripHtml(encoded || summary).slice(0, 280),
                    source: "Medium",
                    author:
                        getText("creator") ||
                        getText("author")
                };
            })
            .filter(Boolean);
    }


    /* ======================================================
       5. LINKEDIN ARTICLE COLLECTION
       ====================================================== */

    function getLinkedInArticles() {

        return CONFIG.linkedInArticles
            .map(article => {

                const url = safeUrl(article.url);

                if (!url) return null;

                return {
                    title: cleanText(article.title),
                    url,
                    date: article.date || "",
                    summary: cleanText(article.summary || ""),
                    author: article.author || "",
                    source: "LinkedIn"
                };

            })
            .filter(article => article && article.title);
    }


    /* ======================================================
       6. LOAD ALL SOURCES
       ====================================================== */

    async function loadArticles() {

        setStatus("Loading articles...");

        const feeds = CONFIG.mediumFeeds.filter(feed =>
            feed.url &&
            !feed.url.includes("YOUR_MEDIUM_USERNAME")
        );

        const results = await Promise.allSettled(
            feeds.map(fetchMediumFeed)
        );

        const mediumArticles = [];
        const errors = [];

        results.forEach((result, index) => {

            if (result.status === "fulfilled") {
                mediumArticles.push(...result.value);
            } else {
                errors.push({
                    feed: feeds[index].name,
                    error: result.reason
                });
            }

        });

        const linkedInArticles = getLinkedInArticles();

        const combined = [
            ...mediumArticles,
            ...linkedInArticles
        ];

        // Remove duplicate URLs.
        const unique = new Map();

        combined.forEach(article => {
            const key = article.url.replace(/\/$/, "");

            if (!unique.has(key)) {
                unique.set(key, article);
            }
        });

        allArticles = [...unique.values()]
            .sort((a, b) => {
                return (
                    new Date(b.date || 0).getTime() -
                    new Date(a.date || 0).getTime()
                );
            })
            .slice(0, CONFIG.maxArticles);

        saveCache(allArticles);

        renderArticles();

        if (errors.length) {
            console.warn("Some article feeds failed:", errors);
        }

        if (errors.length && !allArticles.length) {
            setStatus("Unable to fetch articles. Check your feed settings.");
        } else {
            setStatus(`Loaded ${allArticles.length} articles.`);
        }
    }


    /* ======================================================
       7. ARTICLE CARD CREATION
       ====================================================== */

    function createCard(article) {

        const card = element(
            "article",
            "dn-card article-card"
        );

        const source = element(
            "span",
            "article-source-badge",
            article.source
        );

        const title = element("h2", "dn-card-title");

        const titleLink = element("a", "", article.title);

        titleLink.href = article.url;
        titleLink.target = "_blank";
        titleLink.rel = "noopener noreferrer";

        title.append(titleLink);

        const description = element(
            "p",
            "dn-card-text",
            article.summary || "Read the original article."
        );

        const dateText = [
            article.author,
            formatDate(article.date)
        ].filter(Boolean).join(" · ");

        const meta = element(
            "p",
            "dn-card-meta",
            dateText
        );

        const actions = element("div", "dn-card-actions");

        const readButton = element(
            "a",
            "dn-btn dn-btn-primary",
            "Read article ↗"
        );

        readButton.href = article.url;
        readButton.target = "_blank";
        readButton.rel = "noopener noreferrer";

        actions.append(readButton);

        card.append(
            source,
            title,
            description,
            meta,
            actions
        );

        return card;
    }


    /* ======================================================
       8. SEARCH AND FILTER
       ====================================================== */

    function renderArticles() {

        const query = cleanText(search?.value || "").toLowerCase();

        const selectedSource = filter?.value || "all";

        const filtered = allArticles.filter(article => {

            const matchesSource =
                selectedSource === "all" ||
                article.source.toLowerCase() === selectedSource;

            const searchable = [
                article.title,
                article.summary,
                article.author,
                article.source
            ].join(" ").toLowerCase();

            return matchesSource && searchable.includes(query);
        });

        if (!filtered.length) {

            grid.replaceChildren(
                element(
                    "p",
                    "dn-state",
                    "No articles found."
                )
            );

            return;
        }

        const fragment = document.createDocumentFragment();

        filtered.forEach(article => {
            fragment.append(createCard(article));
        });

        grid.replaceChildren(fragment);

        setStatus(
            `Showing ${filtered.length} of ${allArticles.length} articles.`
        );
    }


    /* ======================================================
       9. LOCAL STORAGE CACHE
       ====================================================== */

    function saveCache(articles) {

        try {
            localStorage.setItem(
                CONFIG.cacheKey,
                JSON.stringify({
                    time: Date.now(),
                    articles
                })
            );
        } catch (error) {
            console.warn("Article cache unavailable:", error);
        }
    }

    function getCache() {

        try {

            const raw = localStorage.getItem(CONFIG.cacheKey);

            if (!raw) return null;

            const cache = JSON.parse(raw);

            if (
                !Array.isArray(cache.articles) ||
                Date.now() - cache.time > CONFIG.cacheDuration
            ) {
                return null;
            }

            return cache.articles;

        } catch {
            return null;
        }
    }


    /* ======================================================
       10. EVENT LISTENERS
       ====================================================== */

    search?.addEventListener("input", renderArticles);

    filter?.addEventListener("change", renderArticles);

    refresh?.addEventListener("click", loadArticles);


    /* ======================================================
       11. INITIALIZATION
       ====================================================== */

    async function initialize() {

        const cached = getCache();

        if (cached) {

            allArticles = cached;

            renderArticles();

            setStatus("Showing cached articles. Refresh for updates.");

            return;
        }

        try {
            await loadArticles();
        } catch (error) {

            console.error("Articles initialization failed:", error);

            setStatus("Could not load articles.");

            grid.replaceChildren(
                element(
                    "p",
                    "dn-state",
                    "Please try refreshing the articles."
                )
            );
        }
    }

    initialize();

})();
