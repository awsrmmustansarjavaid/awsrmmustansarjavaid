# Day 13 — Linux Hardening & Security Baseline

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 14 →](../day-14/README.md)

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

- [ ] Apply a practical hardening baseline
- [ ] Use fail2ban, auditd, unattended-upgrades
- [ ] Audit with Lynis

## 2. Prerequisites

- Days 4-12.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Hardening layers

Patch, minimise software, restrict access (SSH, sudo), firewall, log/audit, file integrity and backups. Align with CIS Benchmarks.

### 3.2 Tools

`fail2ban` bans brute-force IPs, `auditd` records security events, `unattended-upgrades` automates patches, `lynis` scans and scores.

### 3.3 Secrets on hosts

Don't store secrets in shell history or world-readable files; use environment injection from a secrets manager.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `sudo lynis audit system` and note the hardening index.
2. [ ] Install and configure fail2ban for sshd (maxretry 3, bantime 1h).
3. [ ] Enable unattended-upgrades for security updates.
4. [ ] Add an auditd rule to watch `/etc/passwd`.
5. [ ] Re-run lynis and compare scores.

## 5. Real-World Scenario

> A pen-test report says: 'Password auth enabled, no patching, no brute-force protection.' Fix all three and provide evidence.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt install -y lynis fail2ban auditd unattended-upgrades
sudo lynis audit system | tail -30
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
sudo ausearch -k passwd_changes
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 15-item hardening checklist and mark which you've applied. | You can demonstrate, without notes: *apply a practical hardening baseline* — with evidence committed to `day-13/`. |
| 2 | Disable unused services with `systemctl disable`. | You can demonstrate, without notes: *use fail2ban, auditd, unattended-upgrades* — with evidence committed to `day-13/`. |
| 3 | Compare lynis score before/after. | You can demonstrate, without notes: *audit with Lynis* — with evidence committed to `day-13/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| fail2ban bans yourself | Whitelist your IP in `ignoreip`; unban with `fail2ban-client unban`. |
| Auditd log huge | Tune rules and rotate logs. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Defence in depth: patch, least privilege, minimal attack surface, logging. Record changes in version control.
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

1. What is CIS Benchmark?
2. How does fail2ban work?
3. Why unattended-upgrades?
4. What is auditd for?
5. **Scenario:** A pen-test report says: 'Password auth enabled, no patching, no brute-force protection. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I produce before/after hardening evidence? | ☐ | ☐ | ☐ | ☐ |
| Can I explain defence in depth? | ☐ | ☐ | ☐ | ☐ |
| Can I unban an IP? | ☐ | ☐ | ☐ | ☐ |
| Apply a practical hardening baseline | ☐ | ☐ | ☐ | ☐ |
| Use fail2ban, auditd, unattended-upgrades | ☐ | ☐ | ☐ | ☐ |
| Audit with Lynis | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-13/` in your own repository:

```text
day-13/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-13
git add day-13/
git commit -m "day-13: linux hardening & security baseline"
git push -u origin day-13
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

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 14 →](../day-14/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-13/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
