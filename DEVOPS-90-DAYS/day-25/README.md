# Day 25 — Branching Strategies, Conventional Commits, SemVer & Code Review

[← Day 24](../day-24/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 26 →](../day-26/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-25` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Compare Git Flow, GitHub Flow and trunk-based development
- [ ] Adopt Conventional Commits and Semantic Versioning
- [ ] Perform effective code reviews

## 2. Prerequisites

- Day 24.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Strategies

Trunk-based development with short-lived branches and feature flags is common in high-performing teams. Git Flow suits scheduled releases. Choose by release cadence and risk.

### 3.2 Conventional Commits and SemVer

`feat:`, `fix:`, `docs:`, `chore:`, `BREAKING CHANGE:` -> automated changelog and version bumps (MAJOR.MINOR.PATCH).

### 3.3 Code review

Review for correctness, security, readability, tests and operational impact. Keep PRs small; be kind and specific.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `docs/branching-strategy.md` choosing a strategy for a 5-person team and justifying it.
2. [ ] Add commitlint or a simple commit-msg hook.
3. [ ] Tag releases `v0.1.0`, `v0.2.0` according to commits.
4. [ ] Create a code review checklist file.
5. [ ] Review a sample PR containing a hard-coded password and propose fixes.

## 5. Real-World Scenario

> Your team ships weekly but hotfixes are chaotic. Propose a branching and release scheme that supports fast fixes with traceability.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git switch -c feat/health-endpoint
git commit -m "feat(api): add /health endpoint"
git commit -m "fix(api): handle timeout" -m "BREAKING CHANGE: timeout now 5s"
git tag -a v1.0.0 -m "release 1.0.0"
npx --yes commitlint --from HEAD~3
git log --pretty=format:'%h %s' v0.1.0..HEAD
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a CONTRIBUTING.md. | You can demonstrate, without notes: *compare Git Flow, GitHub Flow and trunk-based development* — with evidence committed to `day-25/`. |
| 2 | Define when to bump MAJOR/MINOR/PATCH. | You can demonstrate, without notes: *adopt Conventional Commits and Semantic Versioning* — with evidence committed to `day-25/`. |
| 3 | Create a code review template. | You can demonstrate, without notes: *perform effective code reviews* — with evidence committed to `day-25/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Messages don't match convention | Add commit-msg hook / CI check. |
| Release branches diverge | Backport via cherry-pick with a documented process. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Review for secrets, injection and unsafe defaults; require reviews on protected branches.
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

1. Trunk-based vs Git Flow?
2. What is SemVer?
3. What do you check in a code review?
4. What is a feature flag?
5. **Scenario:** Your team ships weekly but hotfixes are chaotic. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I justify a branching model? | ☐ | ☐ | ☐ | ☐ |
| Can I tag semantic versions? | ☐ | ☐ | ☐ | ☐ |
| Can I give constructive review feedback? | ☐ | ☐ | ☐ | ☐ |
| Compare Git Flow, GitHub Flow and trunk-based development | ☐ | ☐ | ☐ | ☐ |
| Adopt Conventional Commits and Semantic Versioning | ☐ | ☐ | ☐ | ☐ |
| Perform effective code reviews | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-25/` in your own repository:

```text
day-25/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-25
git add day-25/
git commit -m "day-25: branching strategies, conventional commits, semver & code re"
git push -u origin day-25
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 24](../day-24/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 26 →](../day-26/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-25/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
