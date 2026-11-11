# Day 04 — Users, Groups, Permissions & sudo

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 05 →](../day-05/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 04 – Linux Practice: Processes and Services — Challenge Brief

#### Task
Today’s goal is to **practice Linux fundamentals with real commands**.

You will create a short practice note by actually running basic commands and capturing what you see:
- Check running processes
- Inspect one systemd service
- Capture a small troubleshooting flow

This is hands-on. Keep it simple and focused on fundamentals.

---

#### Expected Output
By the end of today, you should have:

- A markdown file named:  
  `linux-practice.md`

or

- A hand written practice log (Recommended)

Your note should show what you actually ran on your system.

---

#### Guidelines
Follow these rules while creating your practice note:

- Run and record output for **at least 6 commands**
- Include **2 process commands** (`ps`, `top`, `pgrep`, etc.)
- Include **2 service commands** (`systemctl status`, `systemctl list-units`, etc.)
- Include **2 log commands** (`journalctl -u <service>`, `tail -n 50`, etc.)
- Pick **one service on your system** (example: `ssh`, `cron`, `docker`) and inspect it
- Keep it **simple and actionable**

Suggested structure for `linux-practice.md`:
- Process checks
- Service checks
- Log checks
- Mini troubleshooting steps

---

#### Resources
You may refer to:

- Your notes from Day 02 and Day 03
- Linux `man` pages
- Your class notes

---

#### Why This Matters for DevOps
Hands‑on practice builds speed and confidence.

When issues happen in production, you won’t have time to search for basic commands.  
This day helps you build muscle memory with Linux fundamentals.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-04/` folder  
3. Add your `linux-practice.md` file  
4. Commit and push your changes to your fork  

---

#### Learn in Public
Share your Day 04 progress on LinkedIn:

- Post 2–3 lines on the Linux commands you practiced
- Share one service you inspected and what you learned
- Optional: screenshot of your practice note

Use hashtags:
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham

Happy Learning
**TrainWithShubham**

---

### 7.2 Day 04 – Linux Practice: Processes and Services — Notes & Solution

#### Process Checks

Command 1:
ps -ef  
- Shows all running processes with CPU and memory usage.
  <img width="1900" height="960" alt="Screenshot 2026-07-27 215806" src="https://github.com/user-attachments/assets/852f0d77-7d7b-4315-b1bf-f0837aa2a337" />


Command 2:
top  
- Live monitoring of system performance.
  <img width="1909" height="955" alt="Screenshot 2026-07-27 220113" src="https://github.com/user-attachments/assets/3288b5f1-c08f-49bb-acae-fc837bc6cdb8" />


Command 3:
pgrep ssh  
- Shows PID of ssh process.
  <img width="1238" height="118" alt="Screenshot 2026-07-27 220221" src="https://github.com/user-attachments/assets/8698434f-a45e-450c-b7bf-950164dfb061" />

---

#### Service Checks (ssh service)

Command 4:
systemctl status sshd
- Checked whether ssh service is active or failed.
  <img width="1813" height="650" alt="Screenshot 2026-07-27 220528" src="https://github.com/user-attachments/assets/7fe4a088-415a-4dd0-9112-afa4714c9968" />

Command 5:
systemctl list-units 
- Listed all running services.
  <img width="1913" height="818" alt="Screenshot 2026-07-27 221037" src="https://github.com/user-attachments/assets/2e20bbae-17e2-443d-a84e-9758fa1e6199" />

---

#### Log Checks

Command 6:
journalctl -u sshd
- Viewed logs related to ssh service.
  <img width="1908" height="290" alt="Screenshot 2026-07-27 221224" src="https://github.com/user-attachments/assets/fe802362-9608-49be-919b-6a5502528fce" />

Command 7:
tail -n 50 filename
- Display the last 50 lines of the file.
  <img width="1914" height="520" alt="Screenshot 2026-07-27 222244" src="https://github.com/user-attachments/assets/a66dfbd6-ace9-4aa2-b877-f72cb759628f" />

---

#### Mini Troubleshooting Flow

Step 1: Check if service is running  
→ systemctl status ssh  

Step 2: If failed, check logs  
→ journalctl -u ssh  

Step 3: If needed, restart service  
→ systemctl restart ssh  

---

#### What I Learned

- How to check running processes
- How to inspect service health
- How logs help in debugging
- Linux troubleshooting is mostly about checking processes, services, and logs

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Build a table mapping octal modes (600, 640, 644, 750, 755, 2770) to typical use cases. | You can demonstrate, without notes: *create and manage users and groups* — with evidence committed to `day-04/`. |
| 2 | Write a script that creates a user, a home dir and adds SSH key. | You can demonstrate, without notes: *read and set permissions with chmod/chown/umask* — with evidence committed to `day-04/`. |
| 3 | Explain why `chmod 777` is a smell. | You can demonstrate, without notes: *configure least-privilege sudo* — with evidence committed to `day-04/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `user is not in the sudoers file` | Add via `visudo` as an admin; groups changes need re-login or `newgrp`. |
| Group change not effective | Log out/in or run `newgrp devs`; check with `id`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Principle of least privilege: avoid `NOPASSWD: ALL`; disable direct root SSH; lock unused accounts with `usermod -L`.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

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

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. What does mode 640 mean?
2. What is setgid on a directory used for?
3. Where are password hashes stored?
4. How do you give a user a single privileged command?
5. **Scenario:** A new developer joins and needs access to deploy to `/srv/project` and restart one service, but must not have full root. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 05 →](../day-05/README.md)
