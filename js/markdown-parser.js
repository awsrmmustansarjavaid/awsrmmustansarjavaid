/* ================================================================
   DEVOPS SHOWCASE — js/markdown-parser.js
   ================================================================
   Turns one raw .md file's text into two useful pieces:

     1. `meta`  — the YAML front matter block at the top of the file
                  (title, type, status, date, technologies, etc.)
     2. `html`  — the Markdown body below the front matter, already
                  converted to HTML for display

   Front matter looks like this at the top of every activity file:

     ---
     title: AWS Docker Lab
     type: lab
     status: completed
     date: 2026-09-01
     featured: false
     repository: https://github.com/awsrmmustansarjavaid/aws-docker-lab
     description: Short one-line summary shown on the card.
     technologies:
       - AWS
       - Docker
       - EC2
     ---

     # AWS Docker Lab
     ## Overview
     ...

   This parser intentionally supports only a SMALL, predictable
   subset of YAML (strings, numbers, booleans, and simple
   "- item" lists) — enough for front matter, without pulling in a
   full YAML library. This keeps the site dependency-light and easy
   to reason about.

   Markdown-to-HTML conversion is delegated to the "marked" library,
   loaded via <script> tag in index.html (see that file's <head>).
   ================================================================ */

const MarkdownParser = (() => {

  /**
   * Splits a raw file into its front matter block and the
   * remaining Markdown body.
   * @param {string} raw
   * @returns {{ frontMatterText: string, body: string }}
   */
  function splitFrontMatter(raw) {
    // Front matter must start on the very first line with "---"
    // and end at the next line that is exactly "---".
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

    if (!match) {
      // No front matter found — treat the whole file as the body
      // and return empty metadata rather than failing.
      return { frontMatterText: '', body: raw };
    }

    return { frontMatterText: match[1], body: match[2] };
  }

  /**
   * A minimal YAML-subset parser for front matter. Supports:
   *   key: value
   *   key: "quoted value"
   *   key: true / false
   *   key:
   *     - list item one
   *     - list item two
   * Anything more complex than this is out of scope on purpose.
   *
   * @param {string} yamlText
   * @returns {Object} plain JS object of the parsed fields
   */
  function parseFrontMatterYaml(yamlText) {
    const data = {};
    const lines = yamlText.split('\n');

    let currentListKey = null;

    for (let rawLine of lines) {
      // Skip blank lines
      if (!rawLine.trim()) continue;

      // A line like "  - Docker" continues the current list key
      const listItemMatch = rawLine.match(/^\s*-\s*(.+)$/);
      if (listItemMatch && currentListKey) {
        data[currentListKey].push(stripQuotes(listItemMatch[1].trim()));
        continue;
      }

      // A line like "technologies:" (no value) starts a new list
      const listStartMatch = rawLine.match(/^([A-Za-z0-9_]+):\s*$/);
      if (listStartMatch) {
        currentListKey = listStartMatch[1];
        data[currentListKey] = [];
        continue;
      }

      // A normal "key: value" line
      const kvMatch = rawLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (kvMatch) {
        currentListKey = null; // a plain key/value line ends any list block
        const key = kvMatch[1];
        const rawValue = stripQuotes(kvMatch[2].trim());
        data[key] = coerceType(rawValue);
      }
    }

    return data;
  }

  /** Removes wrapping single or double quotes from a string, if present. */
  function stripQuotes(value) {
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      return value.slice(1, -1);
    }
    return value;
  }

  /** Converts "true"/"false" to booleans; leaves everything else as a string. */
  function coerceType(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }

  /**
   * Public entry point: parses a raw .md file into { meta, html, rawBody }.
   * @param {string} raw - full raw text of the .md file
   */
  function parse(raw) {
    const { frontMatterText, body } = splitFrontMatter(raw);
    const meta = parseFrontMatterYaml(frontMatterText);

    // `marked` is loaded globally via a <script> tag in index.html.
    // If, for some reason, it failed to load, fall back to showing
    // the raw text wrapped in a <pre> so the page doesn't break.
    const html = (typeof marked !== 'undefined')
      ? marked.parse(body)
      : `<pre>${body}</pre>`;

    return { meta, html, rawBody: body };
  }

  /**
   * Parses experience.md's specific format: front matter for the
   * LinkedIn URL, then one "## Role — Company" heading per job, a
   * "**dates**" line, and a bullet list of achievements.
   *
   * Kept separate from the generic parse() above because a list of
   * job objects is awkward to express in the small YAML subset
   * parseFrontMatterYaml() supports — plain Markdown headings are a
   * much more natural way to edit a list of jobs by hand.
   *
   * Expected format per job:
   *
   *   ## DevOps Engineer — Company Name
   *   **Jan 2022 — Present**
   *
   *   - Achievement one
   *   - Achievement two
   *
   * @param {string} raw
   * @returns {{ linkedin: string, jobs: Array<{role, company, dates, bullets}> }}
   */
  function parseExperience(raw) {
    const { frontMatterText, body } = splitFrontMatter(raw);
    const meta = parseFrontMatterYaml(frontMatterText);

    // Split the body into chunks, one per "## " heading.
    const chunks = body.split(/\n(?=##\s)/).map((c) => c.trim()).filter(Boolean);

    const jobs = chunks.map((chunk) => {
      const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);

      // First line: "## Role — Company" (em dash, en dash, or hyphen all accepted)
      const headingLine = (lines[0] || '').replace(/^##\s*/, '');
      const [rolePart, companyPart] = headingLine.split(/\s[—–-]\s/);

      // Second line, if wrapped in **bold**: the date range
      const datesLine = lines[1] || '';
      const datesMatch = datesLine.match(/^\*\*(.+)\*\*$/);
      const dates = datesMatch ? datesMatch[1] : datesLine;

      // Remaining "- bullet" lines: achievements
      const bullets = lines
        .slice(datesMatch ? 2 : 1)
        .filter((l) => l.startsWith('-'))
        .map((l) => l.replace(/^-+\s*/, ''));

      return {
        role: (rolePart || headingLine).trim(),
        company: (companyPart || '').trim(),
        dates: dates.trim(),
        bullets,
      };
    });

    return { linkedin: meta.linkedin || '', jobs };
  }

  return { parse, parseExperience };

})();
