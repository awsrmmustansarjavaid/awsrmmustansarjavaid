# Day 05 — Processes, systemd Services & Scheduling

[← Day 04](../day-04/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 06 →](../day-06/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-04` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Inspect and control processes and signals
- [ ] Write and manage a systemd service unit
- [ ] Schedule jobs with cron and systemd timers

## 2. Prerequisites

- Day 4.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Process model

Every process has a PID, parent PID, state and resource usage. Signals: SIGTERM (15, graceful), SIGKILL (9, forced), SIGHUP (1, reload). Tools: `ps`, `top`/`htop`, `pgrep`, `kill`, `nice`.

### 3.2 systemd

systemd is PID 1. Units (`.service`, `.timer`, `.socket`) define how to start, restart and order services. `systemctl` manages, `journalctl` shows logs.

### 3.3 Scheduling

Cron expression: `min hour dom mon dow`. systemd timers offer logging, dependencies and catch-up (`Persistent=true`).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Start `sleep 600 &`, find it with `pgrep`, stop it using SIGTERM.
2. [ ] Write a tiny Python/Bash HTTP server at `/opt/hello/server.sh`.
3. [ ] Create `/etc/systemd/system/hello.service` with `Restart=on-failure` and a non-root `User=appsvc`.
4. [ ] `daemon-reload`, enable, start; kill the process and confirm automatic restart.
5. [ ] Add a cron job every 5 min that writes a timestamp to a file; then convert to a systemd timer.

## 5. Real-World Scenario

> The payments worker crashes at random hours and nobody notices until customers complain. Make it self-heal and leave a trail in logs to investigate.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Inspect
ps aux --sort=-%mem | head
pgrep -a sleep
# Signals
kill -15 <PID>; kill -9 <PID>
# systemd service
sudo systemctl daemon-reload
sudo systemctl enable --now hello.service
systemctl status hello.service
journalctl -u hello.service -f
# Cron
crontab -e   # */5 * * * * date >> /tmp/cron.log
# Timers
systemctl list-timers
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a unit with `After=network-online.target`, `Restart=always`, `RestartSec=5`. | You can demonstrate, without notes: *inspect and control processes and signals* — with evidence committed to `day-05/`. |
| 2 | Document the difference between `restart`, `reload`, `stop`, `disable`, `mask`. | You can demonstrate, without notes: *write and manage a systemd service unit* — with evidence committed to `day-05/`. |
| 3 | Add resource limits `MemoryMax=200M` to a unit. | You can demonstrate, without notes: *schedule jobs with cron and systemd timers* — with evidence committed to `day-05/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Service fails: `status=203/EXEC` | Script not executable or wrong ExecStart path; `chmod +x` and use absolute paths. |
| Cron not running | Cron has a minimal PATH; use absolute paths and redirect output; check `grep CRON /var/log/syslog`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use `NoNewPrivileges=true`, `ProtectSystem=strict`, `PrivateTmp=true` in units to sandbox services. Never run services as root unless required.
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

1. SIGTERM vs SIGKILL?
2. What is PID 1?
3. How do you view logs for one service?
4. Cron vs systemd timers?
5. **Scenario:** The payments worker crashes at random hours and nobody notices until customers complain. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a unit file from memory? | ☐ | ☐ | ☐ | ☐ |
| Can I explain Restart= options? | ☐ | ☐ | ☐ | ☐ |
| Can I read a cron expression? | ☐ | ☐ | ☐ | ☐ |
| Inspect and control processes and signals | ☐ | ☐ | ☐ | ☐ |
| Write and manage a systemd service unit | ☐ | ☐ | ☐ | ☐ |
| Schedule jobs with cron and systemd timers | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-05/` in your own repository:

```text
day-05/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-05
git add day-05/
git commit -m "day-05: processes, systemd services & scheduling"
git push -u origin day-05
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

[← Day 04](../day-04/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 06 →](../day-06/README.md)
