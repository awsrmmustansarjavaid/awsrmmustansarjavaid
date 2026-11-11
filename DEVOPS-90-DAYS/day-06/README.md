# Day 06 — Linux Troubleshooting: CPU, Memory, Disk & Logs

[← Day 05](../day-05/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 07 →](../day-07/README.md)

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 06 – Linux Fundamentals: Read and Write Text Files

#### Task
This is a **continuation of Day 05**, but much simpler.

Today’s goal is to **practice basic file read/write** using only fundamental commands.

You will create a small text file and practice:
- Creating a file
- Writing text to a file
- Appending new lines
- Reading the file back

Keep it basic and repeatable.

---

#### Expected Output
By the end of today, you should have:

- the new created files
- A markdown file named:  
  `file-io-practice.md`

or

- A hand written practice note (Recommended)

Your note should include the commands you ran and what they did.

---

#### Guidelines
Follow these rules while creating your practice note:

- Create a file named `notes.txt`
- Write 3 lines into the file using **redirection** (`>` and `>>`)
- Use **`cat`** to read the full file
- Use **`head`** and **`tail`** to read parts of the file
- Use **`tee`** once to write and display at the same time
- Keep it short (8–12 lines total in the file)

Suggested command flow:
1. `touch notes.txt`
2. `echo "Line 1" > notes.txt`
3. `echo "Line 2" >> notes.txt`
4. `echo "Line 3" | tee -a notes.txt`
5. `cat notes.txt`
6. `head -n 2 notes.txt`
7. `tail -n 2 notes.txt`

---

#### Resources
Use these docs to understand the commands:

- `touch` (create an empty file) 
- `cat` (read full file) 
- `head` and `tail` (read parts of a file) 
- `tee` (write and display at the same time)

---

#### Why This Matters for DevOps
Reading and writing files is a daily task in DevOps.

Logs, configs, and scripts are all text files.  
If you can handle files quickly, you can debug and automate faster.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-06/` folder  
3. Add your `file-io-practice.md` file  
4. Commit and push your changes to your fork  

---

#### Learn in Public
Share your Day 06 progress on LinkedIn:

- Post 2–3 lines on what you learned about file read/write
- Share one command you will use often
- Optional: screenshot of your notes

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

### 7.2 📘 Day 06 – Linux File Operations Practice

#### 🎯 Objective

Practice basic Linux file operations using `touch`, `echo`, `cat`, `head`, `tail`, and `tee`.

---

<img width="1919" height="875" alt="Screenshot 2026-07-28 235747" src="https://github.com/user-attachments/assets/b3994329-7d35-4aaa-b416-b044ffa9787b" />

---

#### Key Learnings

- Created a file using `touch`.
- Used `>` and `>>` for writing and appending.
- Used `tee` to write and display output.
- Read file contents with `cat`, `head`, and `tail`.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write `troubleshooting-runbook.md` with 8 symptoms and the commands you use. | You can demonstrate, without notes: *follow a repeatable troubleshooting method (USE method)* — with evidence committed to `day-06/`. |
| 2 | Create a Bash script `health.sh` that prints load, memory, disk and top 3 processes. | You can demonstrate, without notes: *diagnose CPU, memory, disk and I/O issues* — with evidence committed to `day-06/`. |
| 3 | Rotate a log with logrotate config. | You can demonstrate, without notes: *read journald and /var/log effectively* — with evidence committed to `day-06/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| System looks fine but disk is full | Inodes exhausted or deleted-open files: `df -i`, `lsof +L1`, restart owning process. |
| Process killed unexpectedly | OOM killer: check `dmesg`/journal, set memory limits, tune app. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never wipe logs blindly (`> file` is OK for rotation, but keep audit logs). Set up log rotation and limits to avoid disk-fill DoS.
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

1. Explain the USE method.
2. How do you investigate high load average?
3. How can disk be full while `du` shows less?
4. What does the OOM killer do?
5. **Scenario:** Alert: 'Disk 98% on web-01'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

[← Day 05](../day-05/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 07 →](../day-07/README.md)
