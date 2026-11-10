# Day 37 — GitHub Actions: Triggers, Matrix, Caching & Conditionals

[← Day 36](../day-36/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 38 →](../day-38/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-41`, `90DaysOfDevOps-master/2026/day-43` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use events, filters, schedules and manual dispatch
- [ ] Run matrix builds
- [ ] Speed up with caching and concurrency controls

## 2. Prerequisites

- Day 36.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Triggers

push, pull_request, workflow_dispatch, schedule (cron), release, workflow_run, path/branch filters. `pull_request_target` is dangerous with untrusted code.

### 3.2 Matrix and conditionals

Test across Python versions/OS; `if:` with contexts (`github.event_name`, `success()`, `failure()`), `needs:` for DAGs, `continue-on-error`.

### 3.3 Efficiency

`actions/cache`, setup-* built-in cache, `concurrency` to cancel superseded runs, path filters for monorepos.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add a matrix for Python 3.11/3.12/3.13 on ubuntu and macOS.
2. [ ] Add `workflow_dispatch` with an input.
3. [ ] Add a nightly schedule job.
4. [ ] Add `concurrency` with cancel-in-progress.
5. [ ] Add path filters so docs-only changes skip tests.

## 5. Real-World Scenario

> CI takes 22 minutes and runs for docs-only changes. Reduce by 60% with caching, filters and parallel jobs.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
strategy:
  fail-fast: false
  matrix:
    python: ['3.11','3.12','3.13']
    os: [ubuntu-latest]
concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }
on:
  pull_request: { paths-ignore: ['docs/**','**.md'] }
  schedule: [{ cron: '0 2 * * *' }]
  workflow_dispatch: { inputs: { debug: { type: boolean, default: false } } }
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document timing before/after optimisation. | You can demonstrate, without notes: *use events, filters, schedules and manual dispatch* — with evidence committed to `day-37/`. |
| 2 | Create a job dependency graph with `needs`. | You can demonstrate, without notes: *run matrix builds* — with evidence committed to `day-37/`. |
| 3 | Explain cron expression `0 2 * * *`. | You can demonstrate, without notes: *speed up with caching and concurrency controls* — with evidence committed to `day-37/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cache never hits | Key changes each run; use hash of lockfile. |
| Matrix explodes | Use `include/exclude` and limit combos. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never run untrusted PR code with secrets (`pull_request_target` pitfalls). Restrict workflow permissions.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 10. Daily Completion Checklist

- [ ] Read and understand the learning material.
- [ ] Complete all practical exercises.
- [ ] Execute commands independently.
- [ ] Complete the real-world scenario.
- [ ] Troubleshoot at least one issue.
- [ ] Complete the daily assignment.
- [ ] Answer the interview questions.
- [ ] Document important findings.
- [ ] Push work to GitHub.
- [ ] Complete the self-assessment.

## 11. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 12. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. What is a matrix build?
2. How to avoid duplicate runs?
3. What is pull_request_target risk?
4. How do you cache dependencies?
5. **Scenario:** CI takes 22 minutes and runs for docs-only changes. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run a matrix? | ☐ | ☐ | ☐ | ☐ |
| Can I trigger manually? | ☐ | ☐ | ☐ | ☐ |
| Can I reduce runtime? | ☐ | ☐ | ☐ | ☐ |
| Use events, filters, schedules and manual dispatch | ☐ | ☐ | ☐ | ☐ |
| Run matrix builds | ☐ | ☐ | ☐ | ☐ |
| Speed up with caching and concurrency controls | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-37/` in your own repository:

```text
day-37/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-37
git add day-37/
git commit -m "day-37: github actions"
git push -u origin day-37
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 36](../day-36/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 38 →](../day-38/README.md)
