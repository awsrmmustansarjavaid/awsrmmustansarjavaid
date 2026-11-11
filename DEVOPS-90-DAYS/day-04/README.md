# Day 04 — Users, Groups, Permissions & sudo

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 05 →](../day-05/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-09`, `90DaysOfDevOps-master/2026/day-10`, `90DaysOfDevOps-master/2026/day-11` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Create and manage users and groups
- [ ] Read and set permissions with chmod/chown/umask
- [ ] Configure least-privilege sudo

## 2. Prerequisites

- Days 1-3.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Identity model

Users are listed in `/etc/passwd`, hashed passwords in `/etc/shadow`, groups in `/etc/group`. UID 0 is root. Service accounts should have no login shell.

### 3.2 Permission bits

rwx for owner/group/others. Octal: r=4,w=2,x=1 so 640 = rw-r-----. Special bits: setuid, setgid, sticky (e.g. /tmp). `umask` defines default permissions.

### 3.3 sudo

Delegates specific privileges. Edit with `visudo`; prefer drop-ins in `/etc/sudoers.d/`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create users `alice`, `bob` and group `devs`; add both to `devs`.
2. [ ] Create `/srv/project` owned by `root:devs` with mode 2770 (setgid).
3. [ ] Verify alice can create a file and bob can edit it.
4. [ ] Create a system user `appsvc` with `--shell /usr/sbin/nologin`.
5. [ ] Give `alice` sudo only for `systemctl restart nginx` using a sudoers.d file.

## 5. Real-World Scenario

> A new developer joins and needs access to deploy to `/srv/project` and restart one service, but must not have full root. Implement it and document how to revoke access.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Users and groups
sudo useradd -m -s /bin/bash alice
sudo groupadd devs && sudo usermod -aG devs alice
# System account, no login
sudo useradd -r -s /usr/sbin/nologin appsvc
# Shared directory with setgid
sudo mkdir /srv/project && sudo chown root:devs /srv/project && sudo chmod 2770 /srv/project
# Read permissions
ls -ld /srv/project; stat /srv/project
# Least-privilege sudo
echo 'alice ALL=(root) NOPASSWD: /bin/systemctl restart nginx' | sudo tee /etc/sudoers.d/alice
sudo visudo -cf /etc/sudoers.d/alice
# Who am I / groups
id alice
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Build a table mapping octal modes (600, 640, 644, 750, 755, 2770) to typical use cases. | You can demonstrate, without notes: *create and manage users and groups* — with evidence committed to `day-04/`. |
| 2 | Write a script that creates a user, a home dir and adds SSH key. | You can demonstrate, without notes: *read and set permissions with chmod/chown/umask* — with evidence committed to `day-04/`. |
| 3 | Explain why `chmod 777` is a smell. | You can demonstrate, without notes: *configure least-privilege sudo* — with evidence committed to `day-04/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `user is not in the sudoers file` | Add via `visudo` as an admin; groups changes need re-login or `newgrp`. |
| Group change not effective | Log out/in or run `newgrp devs`; check with `id`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Principle of least privilege: avoid `NOPASSWD: ALL`; disable direct root SSH; lock unused accounts with `usermod -L`.
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

1. What does mode 640 mean?
2. What is setgid on a directory used for?
3. Where are password hashes stored?
4. How do you give a user a single privileged command?
5. **Scenario:** A new developer joins and needs access to deploy to `/srv/project` and restart one service, but must not have full root. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I convert rwxr-x--- to octal? | ☐ | ☐ | ☐ | ☐ |
| Can I explain umask 022? | ☐ | ☐ | ☐ | ☐ |
| Can I create a service account without a login shell? | ☐ | ☐ | ☐ | ☐ |
| Create and manage users and groups | ☐ | ☐ | ☐ | ☐ |
| Read and set permissions with chmod/chown/umask | ☐ | ☐ | ☐ | ☐ |
| Configure least-privilege sudo | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-04/` in your own repository:

```text
day-04/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-04
git add day-04/
git commit -m "day-04: users, groups, permissions & sudo"
git push -u origin day-04
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

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 05 →](../day-05/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-04/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
