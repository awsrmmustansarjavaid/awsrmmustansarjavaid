# Day 06 — Linux Troubleshooting: CPU, Memory, Disk & Logs

[← Day 05](../day-05/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 07 →](../day-07/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-05` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Follow a repeatable troubleshooting method (USE method)
- [ ] Diagnose CPU, memory, disk and I/O issues
- [ ] Read journald and /var/log effectively

## 2. Prerequisites

- Day 5.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 USE method

For each resource check Utilisation, Saturation, Errors. Start broad (`uptime`, `top`) then narrow.

### 3.2 Key tools

`top/htop`, `vmstat 1`, `free -h`, `df -h`, `df -i`, `iostat`, `lsof`, `dmesg`, `journalctl -p err -b`.

### 3.3 Common failure patterns

Runaway process, memory leak + OOM killer, disk full from logs, inode exhaustion, deleted-but-open files.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create CPU load with `yes > /dev/null &` and find it; kill it.
2. [ ] Create memory pressure with `stress-ng --vm 1 --vm-bytes 80%` (install it).
3. [ ] Fill a temp directory with `fallocate -l 1G` and observe `df -h`.
4. [ ] Check inode usage `df -i`.
5. [ ] Read the last 50 error entries from `journalctl -p err -b`.

## 5. Real-World Scenario

> Alert: 'Disk 98% on web-01'. Find the cause (large log, orphaned docker data, deleted-open file), fix it safely and write a short RCA.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
uptime; vmstat 1 5
free -h; df -h; df -i
top -o %CPU   # or htop
sudo lsof +L1                    # deleted but still open
sudo du -xh / --max-depth=2 | sort -h | tail
journalctl -p err -b --no-pager | tail -50
dmesg -T | grep -i -E "oom|error"
ss -tulpn
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write `troubleshooting-runbook.md` with 8 symptoms and the commands you use. | You can demonstrate, without notes: *follow a repeatable troubleshooting method (USE method)* — with evidence committed to `day-06/`. |
| 2 | Create a Bash script `health.sh` that prints load, memory, disk and top 3 processes. | You can demonstrate, without notes: *diagnose CPU, memory, disk and I/O issues* — with evidence committed to `day-06/`. |
| 3 | Rotate a log with logrotate config. | You can demonstrate, without notes: *read journald and /var/log effectively* — with evidence committed to `day-06/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| System looks fine but disk is full | Inodes exhausted or deleted-open files: `df -i`, `lsof +L1`, restart owning process. |
| Process killed unexpectedly | OOM killer: check `dmesg`/journal, set memory limits, tune app. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never wipe logs blindly (`> file` is OK for rotation, but keep audit logs). Set up log rotation and limits to avoid disk-fill DoS.
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

1. Explain the USE method.
2. How do you investigate high load average?
3. How can disk be full while `du` shows less?
4. What does the OOM killer do?
5. **Scenario:** Alert: 'Disk 98% on web-01'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I find the top memory consumer? | ☐ | ☐ | ☐ | ☐ |
| Can I explain load average? | ☐ | ☐ | ☐ | ☐ |
| Can I find deleted-but-open files? | ☐ | ☐ | ☐ | ☐ |
| Follow a repeatable troubleshooting method (USE method) | ☐ | ☐ | ☐ | ☐ |
| Diagnose CPU, memory, disk and I/O issues | ☐ | ☐ | ☐ | ☐ |
| Read journald and /var/log effectively | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-06/` in your own repository:

```text
day-06/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-06
git add day-06/
git commit -m "day-06: linux troubleshooting"
git push -u origin day-06
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

[← Day 05](../day-05/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 07 →](../day-07/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-06/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
