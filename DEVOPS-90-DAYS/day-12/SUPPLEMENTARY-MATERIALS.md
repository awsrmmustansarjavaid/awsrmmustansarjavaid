# Day 12 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 12 – Breather & Revision (Days 01–11)

## Goal
Take a **one-day pause** to consolidate everything from Days 01–11 so you don’t forget the fundamentals you just built.

## Expected Output
- A markdown file: `day-12-revision.md`  
  (bullet notes + checkpoints)  
- Optional: screenshots of any re-runs you do

## What to Review (pick at least one per section)
- **Mindset & plan:** revisit your Day 01 learning plan—are your goals still right? any tweaks?  
- **Processes & services:** rerun 2 commands from Day 04/05 (e.g., `ps`, `systemctl status`, `journalctl -u <service>`); jot what you observed today.  
- **File skills:** practice 3 quick ops from Days 06–11 (e.g., `echo >>`, `chmod`, `chown`, `ls -l`, `cp`, `mkdir`).  
- **Cheat sheet refresh:** skim your Day 03 commands—highlight 5 you’d reach for first in an incident.  
- **User/group sanity:** recreate one small scenario from Day 09 or Day 11 (create a user or change ownership) and verify with `id`/`ls -l`.

## Mini Self-Check (write short answers in `day-12-revision.md`)
1) Which 3 commands save you the most time right now, and why?  
2) How do you check if a service is healthy? List the exact 2–3 commands you’d run first.  
3) How do you safely change ownership and permissions without breaking access? Give one example command.  
4) What will you focus on improving in the next 3 days?

## Suggested Flow (30–45 minutes)
- 10 min: skim notes from each day, update Day 01 plan if needed.  
- 15–20 min: rerun a tiny hands-on set (process check, service check, file permission change).  
- 5–10 min: write the self-check answers and key takeaways.

## Tips
- Keep it light—this is about retention, not new concepts.  
- If something felt shaky this week (e.g., `chmod` numbers, `journalctl` flags), practice that specifically.  
- Small wins: one screenshot of a command rerun + 5 bullet notes is enough.

## Submission
1. Navigate to `2026/day-12/`  
2. Add `day-12-revision.md` with your bullets and answers  
3. Commit and push to your fork

## Learn in Public
Post 2–3 lines on what you reinforced today and one command you now remember confidently.

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

## Source file: `day-12-revision.md`

# 🚀 Day 12 – Breather & Revision (Days 01–11)

## 🎯 Goal

Take a short break from learning new concepts and reinforce the Linux fundamentals covered in **Days 01–11**. The focus today is on revision, retention, and building confidence through quick hands-on practice.

---

# 📚 Revision Checklist

## 🧠 Mindset & Learning Plan

* ✅ Reviewed my Day 01 learning roadmap.
* ✅ My goal of becoming a DevOps Engineer remains the same.
* ✅ Will continue focusing on Linux, AWS, Docker, Kubernetes, CI/CD, and Infrastructure Automation.

---

## ⚙️ Processes & Services

### Commands Practiced

```bash
ps -ef
systemctl status sshd
journalctl -u sshd --no-pager
```

### Observations

* Verified currently running processes.
* Checked that the SSH service is active.
* Reviewed recent SSH service logs.

---

## 📂 File Operations Practice

### Commands Practiced

```bash
echo "Revision Day" >> notes.txt
chmod 755 script.sh
mkdir revision-folder
cp notes.txt revision-folder/
ls -l
```

### What I Verified

* Appended text successfully.
* Changed file permissions.
* Created a new directory.
* Copied files successfully.
* Verified permissions and ownership.

---

## 📋 Linux Cheat Sheet Refresh

### Top 5 Commands I Would Use During an Incident

| Command                      | Purpose                              |
| ---------------------------- | ------------------------------------ |
| `ls -l`                      | Check file permissions and ownership |
| `ps -ef`                     | View running processes               |
| `systemctl status <service>` | Check service health                 |
| `journalctl -u <service>`    | Review service logs                  |
| `chmod`                      | Modify file permissions              |

---

## 👥 User & Group Practice

### Scenario

Created a test user and verified the account.

```bash
sudo useradd revisionuser
id revisionuser
```

Verified ownership:

```bash
touch testfile.txt
ls -l testfile.txt
```

---

# ✅ Mini Self-Check

### ❓ Which 3 commands save you the most time right now, and why?

* **ls -l** → Quickly checks permissions and ownership.
* **systemctl status** → Instantly verifies service health.
* **journalctl -u** → Helps troubleshoot service-related issues.

---

### ❓ How do you check if a service is healthy?

Commands I use first:

```bash
systemctl status sshd
ps -ef | grep sshd
journalctl -u sshd --no-pager
```

---

### ❓ How do you safely change ownership and permissions?

Example:

```bash
sudo chown suraj:developers project.txt
chmod 640 project.txt
```

This changes the owner and group while ensuring only the owner has write access.

---

### ❓ What will you focus on improving in the next 3 days?

* Strengthen Linux administration skills.
* Practice more troubleshooting scenarios.
* Continue learning networking and shell scripting fundamentals.

---

# 💡 Key Takeaways

* Linux commands become easier with regular practice.
* Understanding permissions and ownership is essential for system security.
* Process and service troubleshooting are core DevOps skills.
* Consistent revision improves long-term retention.
* Hands-on practice is the fastest way to build confidence.

---

# 🚀 Progress Summary

✅ Revised Linux fundamentals (Days 01–11)

✅ Practiced process and service management

✅ Reviewed file operations and permissions

✅ Reinforced user and group management

✅ Ready to continue the #90DaysOfDevOps journey!

---
