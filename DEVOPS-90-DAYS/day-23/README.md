# Day 23 — Git Branching, Merging & GitHub Pull Requests

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 24 →](../day-24/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-23` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Create, switch and merge branches
- [ ] Resolve merge conflicts
- [ ] Use GitHub fork/clone/PR workflow

## 2. Prerequisites

- Day 22; GitHub SSH key (Day 11).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Branches

A branch is a movable pointer to a commit. Cheap branches enable isolated work. Fast-forward vs three-way merge.

### 3.2 Conflicts

Occur when the same lines change on both sides. Resolve markers `<<<<<<<`, test, `git add`, `git commit`.

### 3.3 GitHub flow

Branch -> commit -> push -> PR -> review -> checks -> merge -> delete branch.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `feature/login`; make commits; merge into main.
2. [ ] Create a deliberate conflict in two branches and resolve it.
3. [ ] Push to GitHub and open a PR with description and checklist.
4. [ ] Review a PR (yours or a friend's) with inline comments.
5. [ ] Configure a PR template `.github/pull_request_template.md`.

## 5. Real-World Scenario

> Two engineers edited `config.yaml`. Resolve the conflict without losing either change and add a test/check that would have caught it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git switch -c feature/login
git commit -am "feat: add login form"
git switch main && git merge --no-ff feature/login
git merge other  # conflict -> edit -> git add -> git commit
git remote add origin git@github.com:USER/devops-90-days.git
git push -u origin feature/login
git branch -d feature/login; git push origin --delete feature/login
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a PR template and an issue template. | You can demonstrate, without notes: *create, switch and merge branches* — with evidence committed to `day-23/`. |
| 2 | Practise 3 conflicts of increasing difficulty. | You can demonstrate, without notes: *resolve merge conflicts* — with evidence committed to `day-23/`. |
| 3 | Write a short PR description guideline. | You can demonstrate, without notes: *use GitHub fork/clone/PR workflow* — with evidence committed to `day-23/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `failed to push some refs` | Remote has new commits; `git pull --rebase` then push. |
| Conflict markers committed | Search for `<<<<<<<` before commit; use pre-commit hook. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use SSH or fine-grained tokens, enable 2FA, never force-push shared branches.
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

1. Fast-forward vs merge commit?
2. How do you resolve conflicts?
3. What belongs in a PR description?
4. Why delete merged branches?
5. **Scenario:** Two engineers edited `config. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I resolve a conflict? | ☐ | ☐ | ☐ | ☐ |
| Can I open and review a PR? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the GitHub flow? | ☐ | ☐ | ☐ | ☐ |
| Create, switch and merge branches | ☐ | ☐ | ☐ | ☐ |
| Resolve merge conflicts | ☐ | ☐ | ☐ | ☐ |
| Use GitHub fork/clone/PR workflow | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-23/` in your own repository:

```text
day-23/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-23
git add day-23/
git commit -m "day-23: git branching, merging & github pull requests"
git push -u origin day-23
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

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 24 →](../day-24/README.md)
