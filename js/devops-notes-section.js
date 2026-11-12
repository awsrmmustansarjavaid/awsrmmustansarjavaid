/*
 * DevOps Notes Library — automatic GitHub Markdown discovery
 *
 * How it works:
 * 1. Requests the contents of the notes directory from GitHub's public API.
 * 2. Keeps Markdown files only (.md / .markdown).
 * 3. Builds a card for every discovered note.
 * 4. Loads the selected file's raw Markdown when the user opens a note.
 *
 * To add a note in the future, upload a new .md file to:
 * DEVOPS-90-DAYS/devops-notes/
 * No manual edits to this script or the HTML are required.
 */

(() => {
  "use strict";

  // Repository and folder configuration — update these only if the repo/folder changes.
  const GITHUB_OWNER = "awsrmmustansarjavaid";
  const GITHUB_REPO = "awsrmmustansarjavaid";
  const GITHUB_BRANCH = "main";
  const NOTES_DIRECTORY = "DEVOPS-90-DAYS/devops-notes";

  const API_URL =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${NOTES_DIRECTORY}?ref=${GITHUB_BRANCH}`;

  // Cache DOM elements once the page is ready.
  const grid = document.getElementById("devops-notes-grid");
  const searchInput = document.getElementById("devops-notes-search");
  const count = document.getElementById("devops-notes-count");
  const modal = document.getElementById("devops-note-modal");
  const modalTitle = document.getElementById("devops-note-title");
  const modalContent = document.getElementById("devops-note-content");
  const modalSource = document.getElementById("devops-note-source");

  // This section is optional on other pages; exit quietly if it is not present.
  if (!grid || !searchInput || !count || !modal) return;

  let allNotes = [];

  // Convert a filename into a readable title without changing the original filename.
  function makeTitle(filename) {
    return filename
      .replace(/\.(md|markdown)$/i, "")
      .replace(/^\d+[-_.\s]*/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b[a-z]/g, letter => letter.toUpperCase());
  }

  // Escape text before placing it in HTML attributes or text-bearing markup.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  // Extract a simple summary from the first useful Markdown paragraph.
  function makeSummary(markdown) {
    const paragraph = markdown
      .replace(/^---[\s\S]*?---/m, "")
      .split(/\r?\n/)
      .map(line => line.trim())
      .find(line => line && !line.startsWith("#") && !line.startsWith("```") &&
                    !line.startsWith("|") && !line.startsWith(">") &&
                    !line.startsWith("- ") && !line.startsWith("* "));
    if (!paragraph) return "Open this note to explore its topics, explanations and examples.";
    return paragraph
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .slice(0, 150);
  }

  // Render one card for each Markdown file found in the GitHub directory.
  function renderCards(notes) {
    grid.replaceChildren();

    if (!notes.length) {
      const empty = document.createElement("p");
      empty.className = "devops-notes-empty";
      empty.textContent = allNotes.length
        ? "No notes match your search. Try another keyword."
        : "No Markdown files were found in the configured notes directory.";
      grid.appendChild(empty);
      count.textContent = `0 of ${allNotes.length} notes`;
      return;
    }

    const fragment = document.createDocumentFragment();

    notes.forEach((note, index) => {
      const card = document.createElement("article");
      card.className = "devops-note-card";

      const top = document.createElement("div");
      top.className = "devops-note-card-top";

      const number = document.createElement("span");
      number.className = "devops-note-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const type = document.createElement("span");
      type.className = "devops-note-type";
      type.textContent = "Markdown note";

      top.append(number, type);

      const heading = document.createElement("h3");
      heading.textContent = note.title;

      const summary = document.createElement("p");
      summary.textContent = note.summary;

      const actions = document.createElement("div");
      actions.className = "devops-note-card-actions";

      const readButton = document.createElement("button");
      readButton.type = "button";
      readButton.className = "devops-note-read";
      readButton.textContent = "Read note";
      readButton.addEventListener("click", () => openNote(note));

      const sourceLink = document.createElement("a");
      sourceLink.className = "devops-note-source-link";
      sourceLink.href = note.html_url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "GitHub ↗";

      actions.append(readButton, sourceLink);
      card.append(top, heading, summary, actions);
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
    count.textContent = `${notes.length} of ${allNotes.length} notes`;
  }

  // Load the complete list of Markdown files from the GitHub Contents API.
  async function loadNotes() {
    try {
      const response = await fetch(API_URL, {
        headers: { "Accept": "application/vnd.github+json" }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("GitHub could not find the repository or notes folder. Check the owner, repository, branch and folder path in this script.");
        }
        if (response.status === 403) {
          throw new Error("GitHub API rate limit reached. Please try again later.");
        }
        throw new Error(`GitHub API request failed (${response.status}).`);
      }

      const entries = await response.json();

      if (!Array.isArray(entries)) {
        throw new Error("The configured GitHub path did not return a directory listing.");
      }

      const markdownFiles = entries
        .filter(item => item.type === "file" && /\.markdown?$/i.test(item.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: "base"
        }));

      // Fetch each note once to generate its short preview for the card.
      allNotes = await Promise.all(markdownFiles.map(async file => {
        const rawUrl = file.download_url ||
          `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${NOTES_DIRECTORY}/${encodeURIComponent(file.name)}`;

        try {
          const rawResponse = await fetch(rawUrl);
          if (!rawResponse.ok) throw new Error("Could not load note preview.");
          const markdown = await rawResponse.text();

          return {
            name: file.name,
            title: makeTitle(file.name),
            summary: makeSummary(markdown),
            download_url: rawUrl,
            html_url: file.html_url,
            markdown
          };
        } catch (error) {
          // Keep the card visible even if an individual preview cannot be fetched.
          return {
            name: file.name,
            title: makeTitle(file.name),
            summary: "Preview unavailable. Open the note to view its source on GitHub.",
            download_url: rawUrl,
            html_url: file.html_url,
            markdown: ""
          };
        }
      }));

      renderCards(allNotes);
    } catch (error) {
      console.error("[DevOps Notes]", error);
      grid.replaceChildren();
      const message = document.createElement("p");
      message.className = "devops-notes-error";
      message.textContent = `${error.message} Check that the GitHub repository is public and the notes folder path is correct.`;
      grid.appendChild(message);
      count.textContent = "Notes could not be loaded";
    }
  }

  // Display the selected note in the reader modal.
  async function openNote(note) {
    modalTitle.textContent = note.title;
    modalContent.textContent = "Loading note…";
    modalSource.href = note.html_url;
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    try {
      let markdown = note.markdown;

      // Fetch again if the preview request failed or the file was not cached.
      if (!markdown) {
        const response = await fetch(note.download_url);
        if (!response.ok) throw new Error("Unable to fetch this Markdown file.");
        markdown = await response.text();
      }

      // marked is included by challenges.html; DOMPurify sanitizes its HTML output.
      if (window.marked && typeof window.marked.parse === "function") {
        const rendered = window.marked.parse(markdown, { gfm: true, breaks: false });
        modalContent.innerHTML = window.DOMPurify
          ? window.DOMPurify.sanitize(rendered)
          : escapeHtml(markdown).replace(/\r?\n/g, "<br>");
      } else {
        // Safe readable fallback if the Markdown renderer CDN is unavailable.
        modalContent.textContent = markdown;
      }
    } catch (error) {
      modalContent.textContent = `${error.message} You can still open the original file using the GitHub link below.`;
    }
  }

  // Close the modal and restore normal page scrolling.
  function closeNote() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // Filter cards as the visitor types.
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allNotes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.name.toLowerCase().includes(query) ||
      note.summary.toLowerCase().includes(query) ||
      note.markdown.toLowerCase().includes(query)
    );
    renderCards(filtered);
  });

  // Support close button, backdrop click and Escape key.
  modal.querySelectorAll("[data-close-note]").forEach(element => {
    element.addEventListener("click", closeNote);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) closeNote();
  });

  // Start automatic discovery.
  loadNotes();
})();
