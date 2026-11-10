# Day 24 — Advanced Git: Rebase, Stash, Cherry-pick, Reset vs Revert & Reflog

[← Day 23](../day-23/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 25 →](../day-25/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-24` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Choose between merge and rebase
- [ ] Recover lost work with reflog
- [ ] Use reset, revert, stash, cherry-pick, bisect

## 2. Prerequisites

- Day 23.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Rebase vs merge

Rebase rewrites commits onto a new base for linear history - only on unshared branches. Merge preserves history. Interactive rebase (`-i`) squashes/fixup/reorders.

### 3.2 Undo toolbox

`reset --soft/--mixed/--hard` moves HEAD (local); `revert` creates a new commit that undoes a change (safe for shared branches); `reflog` finds lost commits.

### 3.3 Other tools

`stash` parks work, `cherry-pick` copies commits (hotfix backports), `bisect` finds the commit that introduced a bug.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Make 5 messy commits and squash into 2 with `git rebase -i`.
2. [ ] Hard reset by mistake, then recover with `git reflog`.
3. [ ] Revert a bad commit on main.
4. [ ] Cherry-pick a fix from `main` to `release/1.0`.
5. [ ] Use `git bisect` with a small test script to locate a bug commit.

## 5. Real-World Scenario

> A faulty change reached `main` and is already pulled by 10 people. Fix safely without rewriting history, and backport the fix to the release branch.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git rebase -i HEAD~5
git reset --hard HEAD~1; git reflog; git reset --hard HEAD@{1}
git revert <sha>
git cherry-pick <sha>
git stash push -m "wip"; git stash list; git stash pop
git bisect start; git bisect bad; git bisect good v1.0; git bisect run ./test.sh
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a decision table: reset vs revert vs restore. | You can demonstrate, without notes: *choose between merge and rebase* — with evidence committed to `day-24/`. |
| 2 | Document your team's rebase rules. | You can demonstrate, without notes: *recover lost work with reflog* — with evidence committed to `day-24/`. |
| 3 | Remove an accidentally committed secret with `git filter-repo` in a sandbox (and explain why rotation is mandatory). | You can demonstrate, without notes: *use reset, revert, stash, cherry-pick, bisect* — with evidence committed to `day-24/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Lost commits after reset | `git reflog` then `git branch rescue <sha>`. |
| Rebase conflict loop | `git rebase --abort`, resolve carefully, or use merge. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Removing a secret from history does NOT make it safe; assume compromised and rotate. Never rebase published branches.
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

1. reset vs revert?
2. When to rebase?
3. What is reflog?
4. How does bisect work?
5. **Scenario:** A faulty change reached `main` and is already pulled by 10 people. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I recover a deleted commit? | ☐ | ☐ | ☐ | ☐ |
| Can I squash commits? | ☐ | ☐ | ☐ | ☐ |
| Can I explain reset modes? | ☐ | ☐ | ☐ | ☐ |
| Choose between merge and rebase | ☐ | ☐ | ☐ | ☐ |
| Recover lost work with reflog | ☐ | ☐ | ☐ | ☐ |
| Use reset, revert, stash, cherry-pick, bisect | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-24/` in your own repository:

```text
day-24/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-24
git add day-24/
git commit -m "day-24: advanced git"
git push -u origin day-24
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

[← Day 23](../day-23/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 25 →](../day-25/README.md)
