# Day 70 — Capstone 2 (Part 3/3): Hardening, DR, Cost Review & Documentation

[← Day 69](../day-69/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 71 →](../day-71/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 2 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Harden and test resilience of the capstone environment
- [ ] Perform a disaster-recovery exercise and cost review
- [ ] Produce portfolio-quality documentation

## 2. Prerequisites

- Days 63-69.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Security review

Run Prowler/ScoutSuite or AWS Security Hub; fix top findings; verify least-privilege IAM and no public exposure.

### 3.2 Resilience test

Terminate an instance, fail an AZ (simulate), restore DB from snapshot, rebuild from code; record RTO/RPO achieved.

### 3.3 Documentation

README, architecture diagram, runbooks, ADRs, cost report, teardown instructions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `prowler aws` (or Security Hub) and remediate 5 findings.
2. [ ] Perform DR drill: restore RDS snapshot and rebuild compute.
3. [ ] Create cost report with infracost + Cost Explorer.
4. [ ] Write runbooks: deploy, rollback, restore, rotate secrets.
5. [ ] Tag `v1.0.0`, record demo and destroy environment.

## 5. Real-World Scenario

> The CFO wants to know the monthly cost of prod, how fast we recover from region failure, and what protects customer data.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
prowler aws --severity high critical -M csv
aws rds restore-db-instance-from-db-snapshot --db-instance-identifier restored --db-snapshot-identifier snap1
terraform -chdir=infra/envs/dev destroy
git tag -a v1.0.0 -m "Capstone 2 complete" && git push --tags
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the DR report with measured RTO/RPO. | You can demonstrate, without notes: *harden and test resilience of the capstone environment* — with evidence committed to `day-70/`. |
| 2 | List 10 cost optimisations applied. | You can demonstrate, without notes: *perform a disaster-recovery exercise and cost review* — with evidence committed to `day-70/`. |
| 3 | Self-review against Well-Architected pillars. | You can demonstrate, without notes: *produce portfolio-quality documentation* — with evidence committed to `day-70/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Restore takes too long | Automate and rehearse; consider replicas/PITR. |
| Findings overwhelming | Prioritise public exposure, IAM wildcards, unencrypted data. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Evidence matters: keep screenshots/logs of remediation; delete lab resources afterwards.
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

1. What are RTO/RPO?
2. How do you verify DR?
3. How do you review cloud security?
4. How do you present cost?
5. **Scenario:** The CFO wants to know the monthly cost of prod, how fast we recover from region failure, and what protects customer data. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I prove recovery? | ☐ | ☐ | ☐ | ☐ |
| Are docs interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Is the lab destroyed? | ☐ | ☐ | ☐ | ☐ |
| Harden and test resilience of the capstone environment | ☐ | ☐ | ☐ | ☐ |
| Perform a disaster-recovery exercise and cost review | ☐ | ☐ | ☐ | ☐ |
| Produce portfolio-quality documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-70/` in your own repository:

```text
day-70/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-70
git add day-70/
git commit -m "day-70: capstone 2 (part 3/3)"
git push -u origin day-70
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 2 v1.0.0 with DR report, cost report, runbooks.

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

[← Day 69](../day-69/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 71 →](../day-71/README.md)
