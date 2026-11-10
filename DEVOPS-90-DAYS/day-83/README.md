# Day 83 — SRE Fundamentals: SLIs, SLOs, Error Budgets & Toil

[← Day 82](../day-82/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 84 →](../day-84/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Define SLIs/SLOs for a service
- [ ] Implement error-budget policy and burn-rate alerts
- [ ] Identify and reduce toil

## 2. Prerequisites

- Days 81-82.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 SRE concepts

SLI = measurement (e.g. % successful requests under 300 ms); SLO = target (99.9% over 30 days); SLA = contractual. Error budget = 100% - SLO; it balances reliability against feature velocity.

### 3.2 Burn rate

Alert when budget is consumed too quickly (e.g. 14.4x over 1h and 6x over 6h). Better than static thresholds.

### 3.3 Toil

Manual, repetitive, automatable work that scales with service growth; target < 50% of time. Automate, eliminate or delegate.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Pick 2 user journeys; define SLIs and SLOs with PromQL.
2. [ ] Compute monthly error budget in minutes for 99.9%/99.95%.
3. [ ] Create Grafana SLO dashboard and burn-rate alerts.
4. [ ] Write error-budget policy (what happens when exhausted).
5. [ ] List 10 toil items in your capstones and automation plan.

## 5. Real-World Scenario

> Product wants to ship daily; reliability is slipping. Use an error-budget policy to decide objectively when to freeze releases.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# 99.9% -> minutes per 30 days
python3 -c "print(30*24*60*0.001)"
# availability SLI
sum(rate(http_requests_total{status!~"5.."}[30d])) / sum(rate(http_requests_total[30d]))
# fast burn
(sum(rate(http_requests_total{status=~"5.."}[1h])) / sum(rate(http_requests_total[1h]))) > (14.4 * 0.001)
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write SLO document for Capstone 1 or 3. | You can demonstrate, without notes: *define SLIs/SLOs for a service* — with evidence committed to `day-83/`. |
| 2 | Compare 99.9 vs 99.99 cost/complexity. | You can demonstrate, without notes: *implement error-budget policy and burn-rate alerts* — with evidence committed to `day-83/`. |
| 3 | Create a toil register. | You can demonstrate, without notes: *identify and reduce toil* — with evidence committed to `day-83/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| SLO too strict | Base on user needs and current capability, iterate. |
| Metrics don't reflect user pain | Measure at the edge/load balancer; add synthetic checks. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Security incidents also consume reliability; include availability and integrity in SLO thinking.
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

1. SLI vs SLO vs SLA?
2. What is an error budget?
3. What is burn rate?
4. What is toil?
5. **Scenario:** Product wants to ship daily; reliability is slipping. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I define an SLO? | ☐ | ☐ | ☐ | ☐ |
| Can I compute error budget? | ☐ | ☐ | ☐ | ☐ |
| Can I write a burn-rate alert? | ☐ | ☐ | ☐ | ☐ |
| Define SLIs/SLOs for a service | ☐ | ☐ | ☐ | ☐ |
| Implement error-budget policy and burn-rate alerts | ☐ | ☐ | ☐ | ☐ |
| Identify and reduce toil | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-83/` in your own repository:

```text
day-83/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-83
git add day-83/
git commit -m "day-83: sre fundamentals"
git push -u origin day-83
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

[← Day 82](../day-82/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 84 →](../day-84/README.md)
