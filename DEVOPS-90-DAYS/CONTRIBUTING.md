# Contributing

This is a personal learning curriculum; improvements are welcome.

## Principles

- Keep the daily template (all 16 sections) intact.
- Real explanations and runnable labs — no placeholder text.
- Security, reliability and cost notes on every day where relevant.
- Never include secrets, tokens, real account IDs or personal data.

## Workflow

1. Fork and branch: `git switch -c docs/day-XX-improve-lab`
2. Use Conventional Commits: `docs(day-42): add GitLab runner troubleshooting`
3. Run `markdownlint` and check links.
4. Open a PR describing what changed and why; keep PRs small.

## Style

- Imperative voice, short paragraphs, tables for comparisons.
- Commands in fenced blocks, with comments explaining the step.
- Pin or mention versions when behaviour differs; tell readers to verify current docs.
