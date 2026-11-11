# Day 43 — Deployment Strategies: Rolling, Blue-Green, Canary & Rollbacks

[← Day 42](../day-42/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 44 →](../day-44/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Compare deployment strategies and trade-offs
- [ ] Implement blue-green with nginx/Compose
- [ ] Design rollback and database migration safety

## 2. Prerequisites

- Days 33, 36-42, nginx (Day 12).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Strategies

Recreate (downtime), Rolling (gradual), Blue-Green (instant switch, double capacity), Canary (small % first, observe), Feature flags (decouple deploy from release), Shadow traffic.

### 3.2 Rollbacks

Keep the previous version deployable; automated health-check gates; roll forward vs back; practice rollback regularly.

### 3.3 Databases

Use expand/contract migrations so old and new code both work during rollout.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `app-blue` and `app-green` containers behind nginx upstream.
2. [ ] Switch traffic with a config reload; measure downtime with a curl loop.
3. [ ] Simulate a bad release; roll back in < 1 min.
4. [ ] Implement a 90/10 weighted canary in nginx.
5. [ ] Add a smoke-test script that gates the switch.

## 5. Real-World Scenario

> A release at 5 PM broke checkout. Design a deployment process that detects and reverts failures automatically within 2 minutes.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
upstream app { server blue:8000 weight=9; server green:8000 weight=1; }
docker compose up -d blue green
while true; do curl -s -o /dev/null -w "%{http_code}\n" localhost; sleep 0.2; done
nginx -t && nginx -s reload
./smoke.sh http://green:8000/health || echo "abort release"
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw sequence diagrams for blue-green and canary. | You can demonstrate, without notes: *compare deployment strategies and trade-offs* — with evidence committed to `day-43/`. |
| 2 | Write rollback runbook. | You can demonstrate, without notes: *implement blue-green with nginx/Compose* — with evidence committed to `day-43/`. |
| 3 | Describe expand/contract DB migration for renaming a column. | You can demonstrate, without notes: *design rollback and database migration safety* — with evidence committed to `day-43/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Sessions lost on switch | Use shared session store or sticky sessions. |
| Rollback fails after migration | Make migrations backward compatible. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Verify artefact signatures before deploy; restrict who can deploy to prod; audit deploys.
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

1. Blue-green vs canary?
2. How do you make DB changes safe?
3. What is a feature flag?
4. How do you automate rollback?
5. **Scenario:** A release at 5 PM broke checkout. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I switch traffic with no downtime? | ☐ | ☐ | ☐ | ☐ |
| Can I run a canary? | ☐ | ☐ | ☐ | ☐ |
| Do I have a tested rollback? | ☐ | ☐ | ☐ | ☐ |
| Compare deployment strategies and trade-offs | ☐ | ☐ | ☐ | ☐ |
| Implement blue-green with nginx/Compose | ☐ | ☐ | ☐ | ☐ |
| Design rollback and database migration safety | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-43/` in your own repository:

```text
day-43/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-43
git add day-43/
git commit -m "day-43: deployment strategies"
git push -u origin day-43
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

[← Day 42](../day-42/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 44 →](../day-44/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-43/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
