# Day 28 — Phase 1 Review & GitHub Portfolio Setup

[← Day 27](../day-27/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 29 →](../day-29/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-28` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Consolidate Days 1-27
- [ ] Create a professional GitHub profile and repo conventions
- [ ] Prepare a Phase-1 knowledge check

## 2. Prerequisites

- Days 1-27.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Revision method

Active recall + practical rebuilds beat re-reading. Rebuild the lab from your own notes without looking at the course.

### 3.2 Portfolio basics

Profile README, pinned repos with clear READMEs, architecture diagrams, badges, consistent commits, releases.

### 3.3 README anatomy

What/why, architecture diagram, quick start, usage, testing, security, roadmap, license.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Take a 25-question self-test (write answers before checking notes).
2. [ ] Rebuild web-01 from your runbook in 30 min.
3. [ ] Create profile README `USER/USER`.
4. [ ] Pin repos: healthcheck, bash scripts, devops-90-days.
5. [ ] Review all repos for secrets and missing README/license.

## 5. Real-World Scenario

> A recruiter opens your GitHub for 90 seconds. What do they see? Redesign to maximise clarity and credibility.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git log --oneline --since="4 weeks ago" | wc -l
gh repo list --limit 20
gitleaks detect --source . -v
tree -L 2
gh repo edit --description "..." --add-topic devops
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 1-page Phase-1 summary. | You can demonstrate, without notes: *consolidate Days 1-27* — with evidence committed to `day-28/`. |
| 2 | List 5 weakest topics and a plan to revise them. | You can demonstrate, without notes: *create a professional GitHub profile and repo conventions* — with evidence committed to `day-28/`. |
| 3 | Add architecture diagram (Mermaid) to one repo. | You can demonstrate, without notes: *prepare a Phase-1 knowledge check* — with evidence committed to `day-28/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Not sure what to revise | Use the self-assessment questions; weak answers = revision list. |
| Messy repo history | Don't rewrite published history; improve going forward. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Audit your public footprint: no secrets, no personal data, no internal company info.
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

1. What would you show in a portfolio?
2. How do you structure a README?
3. How do you study effectively?
4. What are your 3 strongest skills so far?
5. **Scenario:** A recruiter opens your GitHub for 90 seconds. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I rebuild the lab from notes? | ☐ | ☐ | ☐ | ☐ |
| Is my profile professional? | ☐ | ☐ | ☐ | ☐ |
| Are my repos clean and secret-free? | ☐ | ☐ | ☐ | ☐ |
| Consolidate Days 1-27 | ☐ | ☐ | ☐ | ☐ |
| Create a professional GitHub profile and repo conventions | ☐ | ☐ | ☐ | ☐ |
| Prepare a Phase-1 knowledge check | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-28/` in your own repository:

```text
day-28/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-28
git add day-28/
git commit -m "day-28: phase 1 review & github portfolio setup"
git push -u origin day-28
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Phase 1 review, profile README, portfolio cleanup.

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

[← Day 27](../day-27/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 29 →](../day-29/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-28/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
