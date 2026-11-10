# Day 22 — Git Fundamentals: Your First Repository

[← Day 21](../day-21/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 23 →](../day-23/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-22` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain the Git object model at a high level
- [ ] Use init, add, commit, status, diff, log
- [ ] Write professional commit messages

## 2. Prerequisites

- Day 1 (git installed).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 How Git works

Git stores snapshots as content-addressed objects (blob, tree, commit). The working tree, staging area (index) and repository are three separate states.

### 3.2 Core workflow

`git status` -> `git add -p` -> `git commit -m` -> `git log --oneline --graph`. Commit small, logical changes.

### 3.3 Commit hygiene

Imperative subject <= 50 chars, body explains why. Use `.gitignore` and never commit secrets or build artefacts.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `git config --global user.name/email` and `init.defaultBranch main`.
2. [ ] Create a repo, add README, commit.
3. [ ] Modify files; use `git diff`, `git diff --staged`.
4. [ ] Undo a change with `git restore` and unstage with `git restore --staged`.
5. [ ] Create `.gitignore`; practice `git log -p`, `git show`, `git blame`.

## 5. Real-World Scenario

> A teammate asks 'who changed this config line and why?' Use blame/log to find the commit, author and reasoning.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git init demo && cd demo
git add -p && git commit -m "Add initial README"
git log --oneline --graph --decorate
git diff --staged; git restore --staged file; git restore file
git blame -L 1,10 README.md
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a commit message guideline for your repo. | You can demonstrate, without notes: *explain the Git object model at a high level* — with evidence committed to `day-22/`. |
| 2 | Draw the 3 areas of Git (working/staging/repo). | You can demonstrate, without notes: *use init, add, commit, status, diff, log* — with evidence committed to `day-22/`. |
| 3 | Explain what a SHA is. | You can demonstrate, without notes: *write professional commit messages* — with evidence committed to `day-22/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Author identity unknown` | Set `user.name` and `user.email`. |
| Committed a secret | Revoke the secret first; then rewrite history only if needed - covered on Day 24/26. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never commit `.env`, keys or tokens. Use `.gitignore` templates and pre-commit scanning (Day 26).
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

1. Working tree vs index vs repo?
2. What is a commit?
3. How to undo unstaged changes?
4. Why small commits?
5. **Scenario:** A teammate asks 'who changed this config line and why?' Use blame/log to find the commit, author and reasoning. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain staging? | ☐ | ☐ | ☐ | ☐ |
| Can I read the log graph? | ☐ | ☐ | ☐ | ☐ |
| Can I find who changed a line? | ☐ | ☐ | ☐ | ☐ |
| Explain the Git object model at a high level | ☐ | ☐ | ☐ | ☐ |
| Use init, add, commit, status, diff, log | ☐ | ☐ | ☐ | ☐ |
| Write professional commit messages | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-22/` in your own repository:

```text
day-22/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-22
git add day-22/
git commit -m "day-22: git fundamentals"
git push -u origin day-22
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

[← Day 21](../day-21/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 23 →](../day-23/README.md)
