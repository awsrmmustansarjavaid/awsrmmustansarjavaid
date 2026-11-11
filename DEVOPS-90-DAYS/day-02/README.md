# Day 02 — Linux File System Hierarchy & Navigation

[← Day 01](../day-01/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 03 →](../day-03/README.md)

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

- [ ] Navigate the Linux directory tree without a GUI
- [ ] Explain the purpose of /etc, /var, /usr, /opt, /home, /tmp, /proc
- [ ] Use absolute/relative paths, links and wildcards

## 2. Prerequisites

- Day 1 completed.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Filesystem Hierarchy Standard

Everything is a file under a single root `/`. `/etc` holds configuration, `/var/log` logs, `/usr/bin` user programs, `/opt` third-party software, `/home` user data, `/tmp` temporary files, `/proc` and `/sys` expose kernel state as files.

### 3.2 Paths and links

Absolute paths start with `/`; relative paths start from `pwd`. A hard link is another name for the same inode; a symlink is a pointer to a path. Symlinks are widely used for config switching (e.g. nginx sites-enabled).

### 3.3 Globbing

`*`, `?`, `[a-z]` and `{a,b}` are expanded by the shell before the command runs.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Walk through `/` with `ls` and write one sentence about each top-level directory.
2. [ ] Create `~/lab/{app,logs,backup}` with one command using brace expansion.
3. [ ] Create a file, a hard link and a symlink; delete the original and observe the difference.
4. [ ] Use `ls -li` to show inode numbers.
5. [ ] Use `du -sh /var/* 2>/dev/null | sort -h` to find big directories.

## 5. Real-World Scenario

> A teammate says 'the config is somewhere in /etc but I can't find which file sets the SSH port.' Find it using `grep -r` and document the path.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Move around
cd /etc && pwd && cd - && cd ~
# Brace expansion creates many dirs at once
mkdir -p ~/lab/{app,logs,backup}
# Hard link vs symlink
echo hi > a.txt; ln a.txt hard.txt; ln -s a.txt soft.txt; ls -li
# Directory tree view
tree -L 2 ~/lab
# Disk usage of directories
du -sh /var/* 2>/dev/null | sort -h
# Find a config key
sudo grep -rn "Port" /etc/ssh/ 2>/dev/null
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Linux Architecture Notes

#### Core Components of Linux

* **Hardware**: Physical components such as CPU, RAM, storage, and input/output devices.
* **Kernel**: Heart of linux or Core of Linux that manages hardware resources, memory, processes and system resources.
* **User Space**: Area where users and applications run.
* **Shell**: Command-line interface used to communicate with the kernel.
* **systemd**: The first process started during boot (PID 1).

---

#### Processes in Linux

- A process is a program that is currently running.
- Every process has a unique PID (Process ID) to identify it.
- A parent process can start another process called a child process.
- The kernel decides which process gets to use the CPU and when.
- A process can run: Foreground – runs on your screen and you interact with it. Background – runs behind the scenes without interrupting your work.

---

#### Process States

| State | Meaning |
|--------|---------|
| R | Running (using CPU) |
| S | Sleeping (waiting for an event) |
| D |  waiting for disk I/O |
| T | Stopped |
| Z | Zombie (finished but waiting for parent process) |

---

#### Understanding systemd

systemd is the init system used in most modern Linux distributions.

Functions:
- Starts services during boot
- Manages services
- Handles service failures
- Controls boot order
- Maintains system state

Useful Commands:

```bash
systemctl status sshd
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl enable nginx
systemctl disable nginx

```
---

#### 5 Commands Used Daily

* **top** : Monitor system resources in real time.
* **ps -ef** : Show all running process.
* **systemctl** : Manage services.
* **df -h** : Check disk usage.
* **free -h** : Check memory usage.

---

#### Easy Interview Points

✔ Hardware = Physical devices

✔ Kernel = Brain of Linux

✔ Shell = Command interface

✔ User Space = Runs applications

✔ systemd = Starts and manages services

✔ Process = Running program

✔ Every process has a unique PID

✔ systemd always runs with PID 1

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a one-page FHS cheat sheet in markdown. | You can demonstrate, without notes: *navigate the Linux directory tree without a GUI* — with evidence committed to `day-02/`. |
| 2 | Recreate a typical web app layout under `/opt/myapp` with releases/current symlink pattern. | You can demonstrate, without notes: *explain the purpose of /etc, /var, /usr, /opt, /home, /tmp, /proc* — with evidence committed to `day-02/`. |
| 3 | Explain what `/proc/cpuinfo` and `/proc/meminfo` show. | You can demonstrate, without notes: *use absolute/relative paths, links and wildcards* — with evidence committed to `day-02/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Permission denied` listing a folder | Use `sudo`, or check permissions with `ls -ld <dir>`. |
| Broken symlink (red in ls) | Target missing or path relative to the wrong directory; recreate with absolute path. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Do not run `rm -rf` with variables or wildcards unless you echo the command first. Understand `/` vs `./` before deleting.
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

1. What is stored in /etc and /var?
2. Hard link vs symbolic link?
3. What is an inode?
4. What does `/proc` represent?
5. **Scenario:** A teammate says 'the config is somewhere in /etc but I can't find which file sets the SSH port. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain at least 8 top-level directories? | ☐ | ☐ | ☐ | ☐ |
| Can I create a releases/current deployment layout? | ☐ | ☐ | ☐ | ☐ |
| Do I know why hard links cannot cross filesystems? | ☐ | ☐ | ☐ | ☐ |
| Navigate the Linux directory tree without a GUI | ☐ | ☐ | ☐ | ☐ |
| Explain the purpose of /etc, /var, /usr, /opt, /home, /tmp, /proc | ☐ | ☐ | ☐ | ☐ |
| Use absolute/relative paths, links and wildcards | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-02/` in your own repository:

```text
day-02/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-02
git add day-02/
git commit -m "day-02: linux file system hierarchy & navigation"
git push -u origin day-02
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

## 18. Personal Learning Journal — 🐧 Day 02 - Linux Architecture & Basic Linux Commands

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

15 July 2026

---

### 🚀 Introduction

Welcome to **Day 02** of my **#90DaysOfDevOps** challenge.

Today, I learned the fundamentals of Linux, including how the Linux operating system is structured and some of the most commonly used Linux commands that every DevOps Engineer uses daily.

Linux is the backbone of modern cloud infrastructure, servers, and DevOps tools, making it one of the most important skills to master.

---

### 🏗️ Linux Architecture

Linux follows a layered architecture where every layer has a specific responsibility.

```text
+-----------------------+
|     Applications      |
+-----------------------+
           │
           ▼
+-----------------------+
|        Shell          |
+-----------------------+
           │
           ▼
+-----------------------+
|       Kernel          |
+-----------------------+
           │
           ▼
+-----------------------+
|      Hardware         |
+-----------------------+
```

---

#### 1️⃣ Applications

Applications are the programs used by users.

Examples:

- Google Chrome
- VS Code
- Docker
- Jenkins
- Git
- Python

Applications cannot directly communicate with hardware.

Instead, they send requests to the Shell.

---

#### 2️⃣ Shell

The Shell acts as an interpreter between the user and the Linux Kernel.

It accepts commands from users and translates them into instructions that the kernel understands.

Examples of Shells:

- Bash
- Zsh
- Fish
- Sh

Example:

```bash
ls
```

The shell interprets this command and asks the kernel to list files.

---

#### 3️⃣ Kernel

The Kernel is the heart of the Linux Operating System.

It directly communicates with the hardware and manages system resources.

##### Responsibilities

- Memory Management
- Process Management
- Device Management
- File System Management
- Security
- CPU Scheduling

Without the kernel, Linux cannot function.

---

#### 4️⃣ Hardware

Hardware includes physical components such as:

- CPU
- RAM
- Hard Disk
- Keyboard
- Mouse
- Network Card

The kernel manages all hardware communication.

---

### 📌 Flow of Execution

```
User
   │
   ▼
Application
   │
   ▼
Shell
   │
   ▼
Kernel
   │
   ▼
Hardware
```

The response follows the reverse path back to the user.

---

### 💻 Linux Commands Learned Today

---

#### 📂 pwd

Displays the current working directory.

```bash
pwd
```

Example Output

```
/home/shubham
```

---

#### 📂 ls

Lists files and directories.

```bash
ls
```

Useful options

```bash
ls -l
```

(Long listing)

```bash
ls -a
```

(Show hidden files)

```bash
ls -lh
```

(Human-readable file sizes)

---

#### 📂 cd

Changes the current directory.

```bash
cd Documents
```

Go back

```bash
cd ..
```

Go to home directory

```bash
cd ~
```

Go to previous directory

```bash
cd -
```

---

#### 📄 cat

Displays file contents.

```bash
cat file.txt
```

Create a file

```bash
cat > file.txt
```

Append data

```bash
cat >> file.txt
```

---

#### 🧠 free -h

Displays memory usage.

```bash
free -h
```

Example

```
              total   used   free
Mem:          15Gi   4Gi    9Gi
Swap:         2Gi    0Gi    2Gi
```

The **-h** option displays output in a human-readable format.

---

#### 🐚 which

Shows the location of an executable command.

```bash
which bash
```

Output

```
/usr/bin/bash
```

Another example

```bash
which python3
```

---

#### 🐚 bash

Starts a new Bash shell.

```bash
bash
```

Exit Bash

```bash
exit
```

---

### 📚 Commands Summary

| Command | Purpose |
|----------|---------|
| `pwd` | Show current directory |
| `ls` | List files and folders |
| `cd` | Change directory |
| `cat` | View or create files |
| `free -h` | Display RAM usage |
| `which` | Locate executable |
| `bash` | Start Bash shell |

---

### 🎯 Key Takeaways

- Linux architecture consists of **Applications → Shell → Kernel → Hardware**.
- The Shell acts as a bridge between the user and the kernel.
- The Kernel manages CPU, memory, devices, and filesystems.
- Understanding Linux commands is the first step toward becoming a DevOps Engineer.
- Practicing Linux daily is essential for working with cloud platforms and servers.

---

### 📈 Progress

- ✅ Day 01 - DevOps Roadmap
- ✅ Day 02 - Linux Architecture & Basic Commands

**Completed:** 2 / 90 Days

---

### 🔥 What's Next?

Tomorrow, I plan to learn:

- Linux File System
- Directory Structure
- Absolute vs Relative Paths
- More File Management Commands

---

### 💬 Connect With Me

I'm documenting my **#90DaysOfDevOps** journey publicly to stay consistent, build in public, and help others who are starting their DevOps journey.

⭐ If you found this repository helpful, don't forget to star it!

#90DaysOfDevOps #Linux #DevOps #OpenSource #Cloud #LearningInPublic #GitHub


---

[← Day 01](../day-01/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 03 →](../day-03/README.md)
