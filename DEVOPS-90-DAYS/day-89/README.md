# Day 89 — Capstone 3 (Part 3/3): Resilience Drills, Cost Review & Documentation

[← Day 88](../day-88/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 90 →](../day-90/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 3 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Prove resilience through failure drills
- [ ] Review cost and security posture
- [ ] Finish portfolio-grade documentation

## 2. Prerequisites

- Days 87-88.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Game day

Run drills: kill pods/node, break a deployment, expire a certificate, restore namespace from Velero, simulate secret leak rotation. Measure detection and recovery times against SLOs.

### 3.2 Reviews

Security (kube-bench/kubescape/Trivy), cost (OpenCost), reliability (SLO report), documentation completeness.

### 3.3 Documentation set

README, architecture, ADRs, runbooks, postmortem of the game day, SLO doc, cost report, demo recording, teardown guide.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run a 90-minute game day with 4 scenarios and a timeline log.
2. [ ] Run kubescape/kube-bench and remediate top findings.
3. [ ] Generate cost report and list 5 savings.
4. [ ] Write postmortem for the most interesting failure.
5. [ ] Tag `v1.0.0`; record demo; tear down expensive resources.

## 5. Real-World Scenario

> The VP of Engineering asks you to demonstrate that the platform can survive failures and give a cost estimate per environment.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl delete pod -n prod -l app=api
kubectl drain $(kubectl get nodes -o name | head -1 | cut -d/ -f2) --ignore-daemonsets --delete-emptydir-data
velero restore create --from-backup nightly
kubescape scan framework nsa --verbose
git tag -a v1.0.0 -m "Capstone 3 complete" && git push --tags
terraform -chdir=infra/envs/dev destroy
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Publish game-day report. | You can demonstrate, without notes: *prove resilience through failure drills* — with evidence committed to `day-89/`. |
| 2 | Create final architecture diagram. | You can demonstrate, without notes: *review cost and security posture* — with evidence committed to `day-89/`. |
| 3 | Prepare a 10-minute walkthrough script. | You can demonstrate, without notes: *finish portfolio-grade documentation* — with evidence committed to `day-89/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Drill is chaotic | Define roles, hypothesis, abort criteria; keep a scribe. |
| Cost surprise | Check load balancers, NAT, volumes, snapshots after teardown. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Document exceptions and residual risks honestly; verify teardown removes public exposure and billable resources.
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

1. How do you prove resilience?
2. How do you present risks?
3. What did the drill reveal?
4. How do you hand over a platform?
5. **Scenario:** The VP of Engineering asks you to demonstrate that the platform can survive failures and give a cost estimate per environment. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Did I measure recovery times? | ☐ | ☐ | ☐ | ☐ |
| Is documentation complete? | ☐ | ☐ | ☐ | ☐ |
| Is everything torn down? | ☐ | ☐ | ☐ | ☐ |
| Prove resilience through failure drills | ☐ | ☐ | ☐ | ☐ |
| Review cost and security posture | ☐ | ☐ | ☐ | ☐ |
| Finish portfolio-grade documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-89/` in your own repository:

```text
day-89/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-89
git add day-89/
git commit -m "day-89: capstone 3 (part 3/3)"
git push -u origin day-89
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 3 v1.0.0, game-day report, SLO/cost/security reviews.

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

[← Day 88](../day-88/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 90 →](../day-90/README.md)
