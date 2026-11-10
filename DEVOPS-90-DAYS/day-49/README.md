# Day 49 — Capstone 1 (Part 3/3): Deploy, Smoke-Test, Roll Back & Document

[← Day 48](../day-48/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 50 →](../day-50/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 1 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Automate deployment to staging and production
- [ ] Add smoke tests, approvals and rollback
- [ ] Finish portfolio-grade documentation

## 2. Prerequisites

- Days 43, 47, 48.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Deploy target

Use a cloud VM or local VM with Docker Compose over SSH/SSM, or a small cluster. The pipeline pulls by digest and runs `docker compose pull && up -d`.

### 3.2 Controls

Staging auto-deploy on main; prod requires environment approval; smoke test gate; automatic rollback to previous digest on failure.

### 3.3 Evidence

Record DORA-style numbers: lead time, deploy frequency, MTTR from your drills.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Provision a VM (manually for now; Terraform in Capstone 2).
2. [ ] Create deploy job via SSH key stored as environment secret (or SSM).
3. [ ] Implement smoke-test script and rollback.
4. [ ] Run failure drill: deploy a broken image; confirm auto rollback.
5. [ ] Finalise README, diagrams, runbook, screenshots; tag `v1.0.0`.

## 5. Real-World Scenario

> Present the capstone to a hiring panel: 'Show me how a code change reaches production safely and how you recover from a bad release.'

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ssh deploy@staging 'cd /srv/app && docker compose pull && docker compose up -d'
./scripts/smoke.sh https://staging.example.com || ./scripts/rollback.sh
gh workflow run deploy.yml -f environment=production
git tag -a v1.0.0 -m "Capstone 1 complete" && git push --tags
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Record a 3-minute demo video/GIF. | You can demonstrate, without notes: *automate deployment to staging and production* — with evidence committed to `day-49/`. |
| 2 | Write the incident drill report. | You can demonstrate, without notes: *add smoke tests, approvals and rollback* — with evidence committed to `day-49/`. |
| 3 | Add a 'Lessons learned' section. | You can demonstrate, without notes: *finish portfolio-grade documentation* — with evidence committed to `day-49/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Deploy succeeds but app unhealthy | Smoke test gate + auto rollback. |
| SSH deploy key exposure risk | Use restricted key, forced command or SSM Session Manager. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use deploy keys limited to one host/command, audit logs, immutable digests, no direct prod access from laptops.
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

1. How does your pipeline deploy?
2. How do you roll back?
3. How do you secure deploy credentials?
4. What metrics show delivery health?
5. **Scenario:** Present the capstone to a hiring panel: 'Show me how a code change reaches production safely and how you recover from a bad release. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I demo end-to-end? | ☐ | ☐ | ☐ | ☐ |
| Does rollback work? | ☐ | ☐ | ☐ | ☐ |
| Is the README interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Automate deployment to staging and production | ☐ | ☐ | ☐ | ☐ |
| Add smoke tests, approvals and rollback | ☐ | ☐ | ☐ | ☐ |
| Finish portfolio-grade documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-49/` in your own repository:

```text
day-49/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-49
git add day-49/
git commit -m "day-49: capstone 1 (part 3/3)"
git push -u origin day-49
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 1 v1.0.0: pipeline, deploy, rollback, docs.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 48](../day-48/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 50 →](../day-50/README.md)
