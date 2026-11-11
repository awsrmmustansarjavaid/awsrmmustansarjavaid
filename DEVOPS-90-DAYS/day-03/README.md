# Day 03 — Files, Text Processing & Pipes (grep, sed, awk, find)

[← Day 02](../day-02/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 04 →](../day-04/README.md)

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

- [ ] Read, search and transform text from the CLI
- [ ] Compose commands with pipes and redirection
- [ ] Use find, grep, sed, awk, cut, sort, uniq, xargs

## 2. Prerequisites

- Day 2 completed.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Streams and redirection

stdin (0), stdout (1), stderr (2). `>` overwrites, `>>` appends, `2>` redirects errors, `2>&1` merges, `|` connects stdout to stdin of the next command.

### 3.2 The text toolbox

`grep` searches patterns, `sed` edits streams, `awk` processes columns, `cut/sort/uniq/wc` summarise. This is how engineers analyse logs under pressure.

### 3.3 find and xargs

`find` locates files by name, size, time, type; `-exec` or `xargs` runs actions on the results.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Generate a sample log: `for i in $(seq 1 200); do echo "$(date +%F) host$((i%5)) $((RANDOM%3+200)) /page$((i%9))"; done > access.log`
2. [ ] Count requests per host with `awk '{print $2}' access.log | sort | uniq -c | sort -nr`.
3. [ ] Use `grep -E` with a regex and `-c`, `-v`, `-i`.
4. [ ] Use `sed -i.bak 's/host/server/g' access.log` and compare with `diff`.
5. [ ] Find all files over 1 MB modified in the last 7 days in `/var`.

## 5. Real-World Scenario

> Production is slow. You have a 2 GB nginx log: find top 10 client IPs, top 5 URLs and the number of 5xx responses without opening an editor.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Top talkers
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head
# Filter, count
grep -c " 500 " access.log
# Replace in place with backup
sed -i.bak 's/old/new/g' file.txt
# Columns
cut -d' ' -f2,3 access.log | head
# Find and act
find /var/log -type f -name "*.log" -size +1M -mtime -7
find . -name "*.tmp" -print0 | xargs -0 rm -v
# Follow a live log
tail -f /var/log/syslog | grep -i error
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Linux Commands Cheat Sheet

#### #90DaysOfDevOps – Day 03
---

#### 📁 File System Commands

| Command | Usage |
|---------|-------|
| `pwd` | Show the current working directory. |
| `ls` | List files and directories. |
| `ls -la` | Display detailed information including hidden files. |
| `cd <directory>` | Change the current directory. |
| `mkdir <name>` | Create a new directory. |
| `rmdir <name>` | Remove an empty directory. |
| `touch <file>` | Create a new empty file. |
| `cp source destination` | Copy files or directories. |
| `mv source destination` | Move or rename files/directories. |
| `rm <file>` | Delete a file. |
| `rm -r <directory>` | Delete a directory and its contents. |
| `cat <file>` | Display file contents. |
| `less <file>` | View large files page by page. |
| `head <file>` | Show the first 10 lines of a file. |
| `tail <file>` | Show the last 10 lines of a file. |
| `find . -name "<file>"` | Search for a file by name. |

---

#### ⚙️ Process Management Commands

| Command | Usage |
|---------|-------|
| `ps` | Show running processes. |
| `ps -ef` | Display all running processes. |
| `top` | Monitor system processes in real time. |
| `kill <PID>` | Terminate a process using its Process ID. |
| `kill -9 <PID>` | Forcefully stop a process. |
| `jobs` | List background jobs. |
| `bg` | Resume a stopped job in the background. |
| `fg` | Bring a background job to the foreground. |

---

#### 🌐 Networking Troubleshooting Commands

| Command | Usage |
|---------|-------|
| `ping google.com` | Check network connectivity. |
| `ip addr` | Display IP address information. |
| `curl https://example.com` | Test website or API response. |
| `dig google.com` | Perform DNS lookup. |

---

#### 💾 System Information

| Command | Description |
|---------|-------------|
| `hostname` | Display the system hostname. |
| `uname -a` | Show kernel and OS details. |
| `uptime` | Display system uptime and load. |
| `free -h` | Show memory usage. |
| `lscpu` | Display CPU information. |
| `lsblk` | List block devices. |
| `whoami` | Display the current user. |
| `id` | Show user and group IDs. |

---

#### 📌 Quick Tips

- Use `man <command>` to read the manual page.
- Use `command --help` for quick help.
- Press **Ctrl + C** to stop a running command.
- Press **Ctrl + R** to search command history.
- Use `history` to view previously executed commands.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write 10 one-liners that answer different questions about your log file. | You can demonstrate, without notes: *read, search and transform text from the CLI* — with evidence committed to `day-03/`. |
| 2 | Create `text-toolbox.md` with each command, an example and the output. | You can demonstrate, without notes: *compose commands with pipes and redirection* — with evidence committed to `day-03/`. |
| 3 | Extract unique status codes and their counts. | You can demonstrate, without notes: *use find, grep, sed, awk, cut, sort, uniq, xargs* — with evidence committed to `day-03/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| grep returns nothing | Check quoting, use `-i`, use `-E` for extended regex, make sure the file is the right one. |
| `sed -i` on macOS fails | Use `sed -i '' ...` on BSD sed or install gnu-sed. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Logs may contain tokens and personal data. Never paste raw production logs into public tools; mask with `sed 's/[0-9]\{16\}/****/g'`.
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

1. Explain `2>&1`.
2. grep vs awk - when to use which?
3. How would you find the 10 largest files under /var?
4. What does `xargs` do?
5. **Scenario:** Production is slow. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I count unique IPs in a log? | ☐ | ☐ | ☐ | ☐ |
| Can I redirect stderr to a file? | ☐ | ☐ | ☐ | ☐ |
| Can I safely do a bulk replace with a backup? | ☐ | ☐ | ☐ | ☐ |
| Read, search and transform text from the CLI | ☐ | ☐ | ☐ | ☐ |
| Compose commands with pipes and redirection | ☐ | ☐ | ☐ | ☐ |
| Use find, grep, sed, awk, cut, sort, uniq, xargs | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-03/` in your own repository:

```text
day-03/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-03
git add day-03/
git commit -m "day-03: files, text processing & pipes (grep, sed, awk, find)"
git push -u origin day-03
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

## 18. Personal Learning Journal — 🐧 Day 03 - Advanced Linux, SSH, Volume Management & AWS EBS

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date
16 July 2026

---

### 🚀 Introduction

Today, I explored some advanced Linux concepts that are essential for DevOps engineers. I learned about SSH authentication, user and group management, process management, Linux links, and how storage volumes are attached and mounted on AWS EC2 instances.

---

### 📚 Topics Covered

- Advanced Linux Commands
- SSH Key Authentication
- User & Group Management
- Process Management
- File Ownership & Permissions
- Hard Link vs Soft Link
- Linux Volume Management
- AWS EBS Volume Attachment & Mounting
- Temporary vs Permanent Mounting
- Linux Password Storage

---

### 🔑 SSH Key-Based Authentication

Instead of using passwords, Linux servers can authenticate using SSH keys.

##### Workflow

```text
Server A (Client)
│
├── Generate Public Key
├── Generate Private Key
│
└── Copy Public Key
            │
            ▼
Server B (Remote Server)
│
└── Public Key stored in ~/.ssh/authorized_keys
            ▲
            │
Server A connects using its Private Key
```

Example:

Generate keys

```bash
ssh-keygen
```

Copy public key

```bash
ssh-copy-id user@serverB
```

Connect

```bash
ssh -i ~/.ssh/id_rsa user@serverB
```

##### Why SSH Keys?

- More secure than passwords
- Prevents brute-force attacks
- Widely used in cloud environments
- Enables automated deployments

---

### 👥 User & Group Management

Check current user's sudo permissions

```bash
sudo -l
```

Check group membership

```bash
groups username
```

Display user information

```bash
id username
```

Check another user's sudo access

```bash
sudo -l -U username
```

---

### ⚙️ Process & Service Management

Linux uses **systemd** to manage services.

Common commands:

Start a service

```bash
sudo systemctl start nginx
```

Stop a service

```bash
sudo systemctl stop nginx
```

Restart

```bash
sudo systemctl restart nginx
```

Enable on boot

```bash
sudo systemctl enable nginx
```

Check status

```bash
systemctl status nginx
```

---

### 📁 File Ownership & Groups

View owner and group

```bash
ls -l file.txt
```

Change group

```bash
sudo chgrp developers file.txt
```

Change only group

```bash
sudo chown :developers file.txt
```

Change owner and group

```bash
sudo chown john:developers file.txt
```

Recursive group change

```bash
sudo chgrp -R developers folder/
```

---

### 🔗 Hard Link vs Soft Link

| Hard Link | Soft Link |
|-----------|-----------|
| Points directly to the file's inode | Points to the file path |
| Survives if original filename is deleted | Breaks if original file is deleted |
| Cannot span different file systems | Can span different file systems |
| Cannot link directories (normally) | Can link directories |

Create Hard Link

```bash
ln file.txt hardlink.txt
```

Create Soft Link

```bash
ln -s file.txt softlink.txt
```

---

### 💾 Linux Volume Management

A volume is a storage device attached to a Linux system.

Examples:

- Hard Disk
- SSD
- AWS EBS Volume

Useful command

```bash
lsblk
```

Shows all attached storage devices.

---

### ☁️ AWS EBS: Attach vs Mount

These are two different operations.

#### Attach

- AWS operation
- Connects an EBS volume to an EC2 instance
- The operating system can detect the disk
- The disk is **not yet usable**

Example:

```
EC2
      +
EBS Volume
```

---

#### Mount

- Linux operation
- Makes the attached disk accessible through a directory

Example:

```bash
sudo mkdir /data
sudo mount /dev/xvdf /data
```

Now everything inside `/data` is stored on the EBS volume.

##### Difference

| Attach | Mount |
|---------|-------|
| AWS Operation | Linux Operation |
| Connects storage to EC2 | Makes storage usable |
| Done from AWS Console/CLI | Done using Linux `mount` command |
| Device appears in `lsblk` | Files become accessible |

---

### 📌 Temporary vs Permanent Mount

##### Temporary Mount

```bash
sudo mount /dev/xvdf /data
```

Works until the server reboots.

---

##### Permanent Mount

Add the volume to:

```text
/etc/fstab
```

Example:

```text
/dev/xvdf   /data   ext4   defaults   0   2
```

Now the volume mounts automatically after every reboot.

---

### 🔐 Linux Password Storage

Encrypted user passwords are stored in

```bash
cat /etc/shadow
```

The file contains password hashes, not plain-text passwords.

Only the root user can access this file.

---

### 🎯 Key Takeaways

- Learned password-less SSH authentication using public/private keys.
- Explored Linux user, group, and permission management.
- Understood how `systemctl` manages Linux services.
- Learned the difference between hard links and soft links.
- Understood the difference between attaching and mounting EBS volumes.
- Learned the difference between temporary (`mount`) and permanent (`/etc/fstab`) mounts.
- Explored how Linux securely stores user passwords in `/etc/shadow`.

---

### 📈 Progress

- ✅ Day 01 - DevOps Roadmap
- ✅ Day 02 - Linux Fundamentals
- ✅ Day 03 - Advanced Linux, SSH & AWS Volume Management

**Completed:** 3 / 90 Days 🚀

---

### 💡 What's Next?

Next, I plan to dive deeper into Linux networking, file permissions, and shell scripting.

---

⭐ Thank you for following my #90DaysOfDevOps journey!


---

[← Day 02](../day-02/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 04 →](../day-04/README.md)
