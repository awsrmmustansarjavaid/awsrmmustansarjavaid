# Day 26 — GitHub CLI, Branch Protection, CODEOWNERS & Pre-commit Hooks

[← Day 25](../day-25/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 27 →](../day-27/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-26` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Automate GitHub with `gh`
- [ ] Protect main with rules and required checks
- [ ] Prevent bad commits locally with pre-commit

## 2. Prerequisites

- Days 22-25; `gh` installed and authenticated.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 gh CLI

`gh repo create`, `gh pr create/review/merge`, `gh issue`, `gh run watch`, `gh api` - scriptable GitHub from terminal.

### 3.2 Repository governance

Branch protection/rulesets: required reviews, status checks, signed commits, linear history, CODEOWNERS, Dependabot, secret scanning, push protection.

### 3.3 pre-commit

Framework running hooks (gitleaks, shellcheck, yamllint, ruff, end-of-file-fixer) before commit.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `gh auth login`; create repo and PR from CLI.
2. [ ] Enable branch protection/ruleset requiring 1 review and status checks.
3. [ ] Add `CODEOWNERS`.
4. [ ] Install pre-commit and add `.pre-commit-config.yaml` with gitleaks, shellcheck, yamllint, ruff.
5. [ ] Try to commit a fake AWS key and watch it get blocked.

## 5. Real-World Scenario

> A contractor pushed an API key to a public repo. Enable controls so it can't happen again and describe the response plan for the leaked key.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gh auth login
gh repo create devops-90-days --private --source=. --push
gh pr create --fill && gh pr checks && gh pr merge --squash --delete-branch
gh api repos/:owner/:repo/branches/main/protection
pip install pre-commit && pre-commit install && pre-commit run --all-files
echo 'AWS_KEY=AKIAIOSFODNN7EXAMPLE' > t.txt && git add t.txt && git commit -m test  # should be blocked
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add Dependabot config (`.github/dependabot.yml`). | You can demonstrate, without notes: *automate GitHub with `gh`* — with evidence committed to `day-26/`. |
| 2 | Add SECURITY.md. | You can demonstrate, without notes: *protect main with rules and required checks* — with evidence committed to `day-26/`. |
| 3 | Document your secret-leak response runbook. | You can demonstrate, without notes: *prevent bad commits locally with pre-commit* — with evidence committed to `day-26/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cannot push to main | Branch protection working - open a PR. |
| Hook too slow | Limit to changed files; use `stages`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Enable secret scanning + push protection, require signed commits/2FA, least-privilege tokens, immediate rotation for leaked secrets.
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

1. What is branch protection?
2. What is CODEOWNERS?
3. How do pre-commit hooks help?
4. What to do when a secret leaks?
5. **Scenario:** A contractor pushed an API key to a public repo. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I automate a PR via CLI? | ☐ | ☐ | ☐ | ☐ |
| Can I block secrets locally? | ☐ | ☐ | ☐ | ☐ |
| Can I protect main? | ☐ | ☐ | ☐ | ☐ |
| Automate GitHub with `gh` | ☐ | ☐ | ☐ | ☐ |
| Protect main with rules and required checks | ☐ | ☐ | ☐ | ☐ |
| Prevent bad commits locally with pre-commit | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-26/` in your own repository:

```text
day-26/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-26
git add day-26/
git commit -m "day-26: github cli, branch protection, codeowners & pre-commit hooks"
git push -u origin day-26
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

[← Day 25](../day-25/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 27 →](../day-27/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-26/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
