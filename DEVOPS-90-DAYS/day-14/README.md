# Day 14 — Week 2 Review & Incident Drill: 'The Site Is Down'

[← Day 13](../day-13/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 15 →](../day-15/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Combine Linux + networking skills under pressure
- [ ] Write a short post-incident review
- [ ] Build your first reusable troubleshooting playbook

## 2. Prerequisites

- Days 1-13.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Incident approach

Stabilise -> triage -> diagnose -> fix -> verify -> document. Change one thing at a time and record every action with timestamps.

### 3.2 Layered diagnosis

DNS -> network -> TLS -> proxy -> app -> OS resources -> dependencies. Work from the user's request inward.

### 3.3 Blameless culture

Focus on systems and process, not individuals.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Have a friend (or script) break your lab: stop the app, change nginx upstream, fill the disk, block a port.
2. [ ] Diagnose each failure only with CLI tools.
3. [ ] Time each fix and log the commands in `incident-log.md`.
4. [ ] Write a 1-page blameless post-incident review.
5. [ ] Convert findings into a troubleshooting flow in `playbook.md`.

## 5. Real-World Scenario

> It's 03:00 and the pager fires: 'HTTP 503 on www'. You have no GUI and a 15-minute SLA to restore service.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Fast triage sequence
curl -I https://localhost -k
systemctl --failed
ss -tulpn | grep -E ':80|:443|:5000'
sudo nginx -t; sudo tail -n 50 /var/log/nginx/error.log
df -h; free -h; uptime
journalctl -u hello.service -n 50 --no-pager
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the Week 2 revision summary. | You can demonstrate, without notes: *combine Linux + networking skills under pressure* — with evidence committed to `day-14/`. |
| 2 | Create a script `triage.sh` that automates the first-minute checks. | You can demonstrate, without notes: *write a short post-incident review* — with evidence committed to `day-14/`. |
| 3 | Write the post-incident review using the template. | You can demonstrate, without notes: *build your first reusable troubleshooting playbook* — with evidence committed to `day-14/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| You don't know where to start | Use the layered checklist; check the simplest and most recent change first. |
| Fix works but problem returns | Find root cause; add monitoring and automation. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** During incidents never disable security controls permanently; record exceptions and revert them.
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

1. How do you troubleshoot 'site down'?
2. What is a blameless postmortem?
3. What do you check first?
4. How do you prevent recurrence?
5. **Scenario:** It's 03:00 and the pager fires: 'HTTP 503 on www'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I diagnose in layers? | ☐ | ☐ | ☐ | ☐ |
| Can I write a postmortem? | ☐ | ☐ | ☐ | ☐ |
| Can I automate first-minute checks? | ☐ | ☐ | ☐ | ☐ |
| Combine Linux + networking skills under pressure | ☐ | ☐ | ☐ | ☐ |
| Write a short post-incident review | ☐ | ☐ | ☐ | ☐ |
| Build your first reusable troubleshooting playbook | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-14/` in your own repository:

```text
day-14/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-14
git add day-14/
git commit -m "day-14: week 2 review & incident drill"
git push -u origin day-14
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** incident-log.md, playbook.md, triage.sh, week-2 review.

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

[← Day 13](../day-13/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 15 →](../day-15/README.md)
