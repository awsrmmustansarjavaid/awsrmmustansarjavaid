<!--
  This file is a COPY-PASTE TEMPLATE, not real content.
  It lives directly in activity/ (not inside projects/, labs/,
  learning/, or journal/) specifically so the site's content
  loader — which only reads .md files INSIDE those sub-folders —
  never picks it up and tries to render it as a real entry.

  To add new content:
    1. Copy this file into the right sub-folder:
         activity/projects/your-project-slug.md
         activity/labs/your-lab-slug.md
         activity/learning/your-topic-slug.md
         activity/journal/YYYY-MM-DD-short-title.md
    2. Fill in the front matter fields below.
    3. Write your Markdown body underneath.
    4. Commit and push. The live site picks it up automatically
       the next time a visitor loads the page (subject to the
       15-minute cache — see README-showcase.md).
-->
---
title: Your Title Here
type: project            # project | lab | learning | journal
status: in-progress       # completed | in-progress | learning | planned | paused | archived
date: 2026-01-01          # YYYY-MM-DD — controls sort order
featured: false           # true shows it in any "featured" UI you add later
repository: https://github.com/your-username/your-repo
description: One sentence shown on the card in the grid.
technologies:
  - Tech One
  - Tech Two
progress: 50               # ONLY used by activity/learning/*.md — 0 to 100
---

# Your Title Here

## Overview

A short paragraph describing what this is.

## What I Practiced

- Bullet point
- Bullet point

## What I Learned

A short paragraph on the takeaway.
