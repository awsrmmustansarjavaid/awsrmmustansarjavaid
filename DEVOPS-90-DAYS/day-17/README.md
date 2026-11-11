# Day 17 — Bash Project: Log Analyzer & Report Generator

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 18 →](../day-18/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-20` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Build a real log-analysis tool
- [ ] Combine awk, sort, uniq, date, mail/Slack webhook
- [ ] Write tests and README for a script

## 2. Prerequisites

- Days 3, 15, 16.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Requirements-driven scripting

Start from the report you need: top errors, top IPs, error rate per hour, slowest endpoints. Design inputs, outputs and failure behaviour first.

### 3.2 Reports

Generate Markdown/CSV; optionally post to Slack via webhook using `curl`.

### 3.3 Testing scripts

Use sample fixtures and `bats-core` or simple assertion functions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a fixture log with 1,000 lines containing 200/404/500 codes.
2. [ ] Write `analyze.sh <logfile>` producing a Markdown report with counts, top IPs, 5xx rate and hourly histogram.
3. [ ] Add `--since` and `--output` flags.
4. [ ] Add 3 bats tests (or assert functions).
5. [ ] Write README with usage and examples.

## 5. Real-World Scenario

> The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Deliver this script and schedule it with cron/systemd timer.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
awk '{print $9}' access.log | sort | uniq -c | sort -nr
awk '$9>=500{c++} END{printf "5xx rate: %.2f%%\n", c*100/NR}' access.log
awk '{split($4,t,":"); h[t[2]]++} END{for(k in h) print k, h[k]}' access.log | sort
curl -s -X POST -H 'Content-type: application/json' --data "{\"text\":\"$(cat report.md)\"}" "$SLACK_WEBHOOK_URL"
sudo apt install -y bats && bats tests/
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `--format csv|md` option. | You can demonstrate, without notes: *build a real log-analysis tool* — with evidence committed to `day-17/`. |
| 2 | Create a systemd timer that runs the report daily at 07:00. | You can demonstrate, without notes: *combine awk, sort, uniq, date, mail/Slack webhook* — with evidence committed to `day-17/`. |
| 3 | Document limitations and next steps. | You can demonstrate, without notes: *write tests and README for a script* — with evidence committed to `day-17/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| awk field numbers wrong | Log format differs; print `$0` and count fields; use `-F` to set delimiter. |
| Webhook fails | Check env var, JSON escaping, and network egress. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never hard-code webhook URLs or tokens. Read from environment or secret files with 600 permissions.
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

1. How do you compute error rate with awk?
2. Why avoid hard-coded secrets?
3. How would you test a Bash script?
4. How would you scale this to millions of lines?
5. **Scenario:** The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a report from raw logs? | ☐ | ☐ | ☐ | ☐ |
| Can I schedule the script? | ☐ | ☐ | ☐ | ☐ |
| Do I have tests and README? | ☐ | ☐ | ☐ | ☐ |
| Build a real log-analysis tool | ☐ | ☐ | ☐ | ☐ |
| Combine awk, sort, uniq, date, mail/Slack webhook | ☐ | ☐ | ☐ | ☐ |
| Write tests and README for a script | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-17/` in your own repository:

```text
day-17/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-17
git add day-17/
git commit -m "day-17: bash project"
git push -u origin day-17
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

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 18 →](../day-18/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-17/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
