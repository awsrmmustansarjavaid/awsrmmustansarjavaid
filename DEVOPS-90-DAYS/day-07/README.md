# Day 07 — Packages, Storage (LVM) & Week 1 Mini-Project

[← Day 06](../day-06/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 08 →](../day-08/README.md)

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

- [ ] Manage packages with apt/dnf
- [ ] Understand disks, partitions, filesystems and LVM
- [ ] Combine Week 1 skills in a server-setup project

## 2. Prerequisites

- Days 1-6.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Package management

apt (Debian/Ubuntu): `update`, `install`, `remove`, `purge`, `list --installed`, `apt-cache policy`. dnf (RHEL): `dnf install`, `dnf history`. Always pin/verify repos and GPG keys.

### 3.2 Storage

Block devices (`lsblk`) -> partitions -> filesystems (ext4/xfs) -> mount (`/etc/fstab`). LVM adds PV, VG, LV so volumes can grow online.

### 3.3 Mini-project

Provision a 'web-01' server end to end using only CLI and document it as a reproducible runbook.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add a virtual disk or use a loop device: `dd if=/dev/zero of=disk.img bs=1M count=500; sudo losetup -fP disk.img`.
2. [ ] Create PV/VG/LV, format ext4, mount to `/data`, add fstab entry (with `nofail`).
3. [ ] Extend the LV by 100 MB and `resize2fs` online.
4. [ ] Install nginx, create user `deploy`, create /srv/site, configure service.
5. [ ] Write `runbook-web-01.md` listing every step.

## 5. Real-World Scenario

> The /data volume of the app server is full at 2 AM. Extend it without downtime and prove it with before/after `df -h` output.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt update && sudo apt install -y lvm2 nginx
lsblk -f
sudo pvcreate /dev/loop0 && sudo vgcreate vg_data /dev/loop0
sudo lvcreate -L 300M -n lv_app vg_data
sudo mkfs.ext4 /dev/vg_data/lv_app
sudo mkdir /data && sudo mount /dev/vg_data/lv_app /data
sudo lvextend -L +100M -r /dev/vg_data/lv_app
df -h /data
apt-cache policy nginx; dpkg -L nginx | head
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 07 – Linux File System Hierarchy & Scenario-Based Practice — Challenge Brief

#### Task
Today's goal is to **understand where things live in Linux** and **practice troubleshooting like a DevOps engineer**.

You will create notes covering:
- Linux File System Hierarchy (the most important directories)
- Practice solving real-world scenarios step by step

This consolidates your Linux fundamentals and prepares you for real-world troubleshooting.

---

#### Expected Output
By the end of today, you should have:

- A markdown file named:
  `day-07-linux-fs-and-scenarios.md`

or

- A hand written set of notes (Recommended)

Your notes should have two sections: File System Hierarchy and Scenario Practice.

---

#### Guidelines

##### Part 1: Linux File System Hierarchy (30 minutes)

Document the purpose of these **essential** directories:

**Core Directories (Must Know):**
- `/` (root) - The starting point of everything
- `/home` - User home directories
- `/root` - Root user's home directory
- `/etc` - Configuration files
- `/var/log` - Log files (very important for DevOps!)
- `/tmp` - Temporary files

**Additional Directories (Good to Know):**
- `/bin` - Essential command binaries
- `/usr/bin` - User command binaries
- `/opt` - Optional/third-party applications

For each directory:
- Write 1-2 lines explaining what it contains
- Run `ls -l <directory>` and note 1-2 files/folders you see
- Write one sentence: "I would use this when..."

**Hands-on task:**
```bash
# Find the largest log file in /var/log
du -sh /var/log/* 2>/dev/null | sort -h | tail -5

# Look at a config file in /etc
cat /etc/hostname

# Check your home directory
ls -la ~
```

---

##### Part 2: Scenario-Based Practice (40 minutes)

**Important:** Focus on understanding the **troubleshooting flow**, not memorizing commands. Use the hints!

---

###### SOLVED EXAMPLE: Understanding How to Approach Scenarios

**Example Scenario: Check if a service is running**
```
Question: How do you check if the 'nginx' service is running?
```

**My Solution (Step by step):**

**Step 1:** Check service status
```bash
systemctl status nginx
```
**Why this command?** It shows if the service is active, failed, or stopped

**Step 2:** If service is not found, list all services
```bash
systemctl list-units --type=service
```
**Why this command?** To see what services exist on the system

**Step 3:** Check if service is enabled on boot
```bash
systemctl is-enabled nginx
```
**Why this command?** To know if it will start automatically after reboot

**What I learned:** Always check status first, then investigate based on what you see.

---

Now try these scenarios yourself:

---

**Scenario 1: Service Not Starting** 
```
A web application service called 'myapp' failed to start after a server reboot.
What commands would you run to diagnose the issue?
Write at least 4 commands in order.
```

**Hint:**
- First check: Is the service running or failed?
- Then check: What do the logs say?
- Finally check: Is it enabled to start on boot?

**Commands to explore:** `systemctl status myapp`, `systemctl is-enabled myapp`, `journalctl -u myapp -n 50`

**Resource:** Review Day 04 (Process and Services practice)

**Template for your answer:**
```
Step 1: [command]
Why: [one line explanation]

Step 2: [command]
Why: [one line explanation]

...
```

---

**Scenario 2: High CPU Usage** 
```
Your manager reports that the application server is slow.
You SSH into the server. What commands would you run to identify
which process is using high CPU?
```

**Hint:**
- Use a command that shows **live** CPU usage
- Look for processes sorted by CPU percentage
- Note the PID (Process ID) of the top process

**Commands to explore:** `top` (press 'q' to quit), `htop`, `ps aux --sort=-%cpu | head -10`

**Resource:** Review Day 05 (Troubleshooting Drill - CPU & Memory section)

---

**Scenario 3: Finding Service Logs** 
```
A developer asks: "Where are the logs for the 'docker' service?"
The service is managed by systemd.
What commands would you use?
```

**Hint:**
- systemd services → logs are in journald
- Command pattern: `journalctl -u <service-name>`
- Use -n flag to limit number of lines
- Use -f flag to follow logs in real-time (like tail -f)

**Commands to explore:**
```bash
# Check service status first
systemctl status ssh

# View last 50 lines of logs
journalctl -u ssh -n 50

# Follow logs in real-time
journalctl -u ssh -f
```

**Resource:** Review Day 04 (Process and Services - Log checks section)

---

**Scenario 4: File Permissions Issue** 
```
A script at /home/user/backup.sh is not executing.
When you run it: ./backup.sh
You get: "Permission denied"

What commands would you use to fix this?
```

**Hint:**
- First: Check what permissions the file has
- Understand: Files need 'x' (execute) permission to run
- Fix: Add execute permission with chmod

**Step-by-step solution structure:**
```
Step 1: Check current permissions
Command: ls -l /home/user/backup.sh
Look for: -rw-r--r-- (notice no 'x' = not executable)

Step 2: Add execute permission
Command: chmod +x /home/user/backup.sh

Step 3: Verify it worked
Command: ls -l /home/user/backup.sh
Look for: -rwxr-xr-x (notice 'x' = executable)

Step 4: Try running it
Command: ./backup.sh
```

**Resource:** Review Day 02 (File Permissions and Users Management)

---

#### Why This Matters for DevOps
Understanding the file system is critical for:
- Knowing where to find logs, configs, and binaries
- Troubleshooting deployment issues
- Writing automation scripts that work across systems

Scenario-based practice prepares you for:
- Real production incidents
- DevOps interviews
- On-call troubleshooting under pressure

These are questions you **will** face in interviews and during real incidents.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to the `2026/day-07/` folder
3. Add your `day-07-linux-fs-and-scenarios.md` file
4. Commit and push your changes to your fork

---

#### Learn in Public
Share your Day 07 progress on LinkedIn:

- Post 2–3 lines on what you learned about Linux file system
- Share one scenario you found challenging and how you solved it
- Optional: screenshot of your notes

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

### 7.2 Day 07 – Linux File System Hierarchy & Scenario-Based Practice — Notes & Solution

#### Part 1: Linux File System Hierarchy

| Directory | Purpose | Example | 
|-----------|---------|---------|
| `/` | Starting point of the Linux file system. Everything begins here. | `home`, `etc`, `var` |
| `/home` | Stores home directories of normal users. | `suraj`, `user1` | 
| `/root` | Home directory of the root (administrator) user. | `.bashrc`, `.ssh` | 
| `/etc` | Stores system configuration files. | `hostname`, `passwd`, `hosts` |
| `/var/log` | Stores system and application log files. | `messages`, `secure`, `auth.log` | 
| `/tmp` | Stores temporary files. Files are usually removed after reboot. | Temporary files | 
| `/bin` | Contains essential Linux commands. | `ls`, `cp`, `mv`, `cat` | 
| `/usr/bin` | Contains most user commands and installed applications. | `vim`, `python3`, `mkdir` | 
| `/opt` | Stores optional or third-party software. | Google Chrome, Custom Apps |

---

#### Hands-on Practice

- Use the command `du -sh /var/log/* 2>/dev/null | sort -h | tail -5` to find 5 largest log file
-  checkthe configuration file `/etc/hostname ` to get the hostname
-  lsited all the file and directory in the home directory ` ls -la `
  
  <img width="1912" height="824" alt="Screenshot 2026-07-30 232715" src="https://github.com/user-attachments/assets/6da903e9-daa2-467f-ba42-d1a65aa1c055" />


#### Part 2: Scenario-Based Practice

#### Scenario 1 – Service Not Starting

##### Step 1

```bash
systemctl status myapp
```

**Why:** Check whether the service is running, stopped, or failed.

##### Step 2

```bash
journalctl -u myapp -n 50
```

**Why:** View the last 50 log messages.

##### Step 3

```bash
systemctl is-enabled myapp
```

**Why:** Check if the service starts automatically after reboot.

##### Step 4

```bash
systemctl restart myapp
```

**Why:** Restart the service after fixing the issue.

**What I learned**
- Always check service status first.
- Then check logs.
- Finally verify if the service is enabled.

---

#### Scenario 2 – High CPU Usage

##### Step 1

```bash
top
```

**Why:** Shows live CPU usage.

##### Step 2

```bash
ps aux --sort=-%cpu | head -10
```

**Why:** Displays the processes using the most CPU.

##### Step 3

```bash
pgrep <process_name>
```

**Why:** Finds the Process ID (PID).

##### Step 4

```bash
kill -15 PID
```

**Why:** Stops the process if required.

**What I learned**
- Find the process with high CPU usage before taking action.

---

#### Scenario 3 – Finding Service Logs

##### Step 1

```bash
systemctl status docker
```

**Why:** Check Docker service status.

##### Step 2

```bash
journalctl -u docker -n 50
```

**Why:** View the last 50 log entries.

##### Step 3

```bash
journalctl -u docker -f
```

**Why:** Watch logs in real time.

**What I learned**
- `journalctl` is used to view logs of systemd services.

---

#### Scenario 4 – File Permission Issue

##### Step 1

```bash
ls -l /home/user/backup.sh
```

**Why:** Check current file permissions.

##### Step 2

```bash
chmod +x /home/user/backup.sh
```

**Why:** Give execute permission.

##### Step 3

```bash
ls -l /home/user/backup.sh
```

**Why:** Verify execute permission is added.

##### Step 4

```bash
./backup.sh
```

**Why:** Run the script.

**What I learned**
- Always check file permissions before running a script.

---

#### Summary

- Learned the Linux File System Hierarchy.
- Learned where logs, configuration files, binaries, and user files are stored.
- Practiced troubleshooting service issues, CPU usage, logs, and file permissions.
- Improved Linux skills for DevOps and real-world troubleshooting.

**✅ Day 07 Completed**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Turn the runbook into a Bash script `setup-web01.sh` (idempotent where possible). | You can demonstrate, without notes: *manage packages with apt/dnf* — with evidence committed to `day-07/`. |
| 2 | Compare `ext4` and `xfs` in 5 bullets. | You can demonstrate, without notes: *understand disks, partitions, filesystems and LVM* — with evidence committed to `day-07/`. |
| 3 | Create a Week-1 cheat sheet. | You can demonstrate, without notes: *combine Week 1 skills in a server-setup project* — with evidence committed to `day-07/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `mount: wrong fs type` | Format the device first with mkfs; verify with `blkid`. |
| Boot fails after fstab edit | Use `nofail`, test with `sudo mount -a` before reboot. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Verify package signatures, only add trusted repos, enable unattended-upgrades for security patches.
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

1. PV vs VG vs LV?
2. How to grow a filesystem online?
3. apt update vs apt upgrade?
4. Why use `nofail` in fstab?
5. **Scenario:** The /data volume of the app server is full at 2 AM. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I extend an LV? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the storage stack? | ☐ | ☐ | ☐ | ☐ |
| Can I reproduce my server from the runbook? | ☐ | ☐ | ☐ | ☐ |
| Manage packages with apt/dnf | ☐ | ☐ | ☐ | ☐ |
| Understand disks, partitions, filesystems and LVM | ☐ | ☐ | ☐ | ☐ |
| Combine Week 1 skills in a server-setup project | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-07/` in your own repository:

```text
day-07/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-07
git add day-07/
git commit -m "day-07: packages, storage (lvm) & week 1 mini-project"
git push -u origin day-07
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Week 1 mini-project: runbook + setup script + cheat sheet.

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

## 18. Personal Learning Journal — 🌐 Day 07 - Networking Fundamentals, OSI Model & Python Basics

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

21 July 2026

---

### 🚀 Introduction

Day 07 was focused on understanding the core networking concepts that power the internet and cloud infrastructure. I learned how devices communicate, how data travels across networks, and the protocols involved in secure communication.

In Python, I explored **Tuples**, **Dictionaries**, and learned how to create and manage **Virtual Environments** for isolated project dependencies.

---

### 📚 Topics Covered

#### 🌐 Networking Fundamentals

- Physical Network Components
- Router
- Switch
- Hub
- Server Rack
- IP Addressing
- Public & Private IP
- Subnetting
- CIDR Notation
- CDN (Content Delivery Network)
- DNS (Domain Name System)
- OSI Model (7 Layers)
- TCP/IP Model
- TCP 3-Way Handshake

---

### 🖥️ Physical Network Components

#### 🗄️ Server Rack

A server rack is a metal frame used to organize and mount servers, switches, routers, and networking equipment in data centers.

##### Benefits
- Better cable management
- Efficient cooling
- Easy maintenance
- Space optimization

---

#### 📡 Hub

A Hub is a basic networking device that broadcasts incoming data to **every connected device**.

##### Characteristics
- Works on Layer 1 (Physical Layer)
- No intelligence
- High network traffic
- Less secure

---

#### 🔀 Switch

A Switch forwards data only to the intended device using **MAC addresses**.

##### Characteristics
- Works on Layer 2 (Data Link Layer)
- Faster than Hub
- Reduces network congestion
- More secure

---

#### 🌍 Router

A Router connects different networks together and routes packets using **IP addresses**.

##### Example

```
Home Network
      │
   Router
      │
   Internet
```

Responsibilities:
- Connect different networks
- Route packets
- Assign local IP addresses (DHCP)
- Internet connectivity

---

### 🌐 IP Address

An IP Address uniquely identifies a device on a network.

Example

```
192.168.1.10
```

---

### 🌍 Public vs Private IP

#### Public IP

- Accessible over the Internet
- Assigned by ISP or Cloud Provider
- Globally unique

Example

```
54.213.10.15
```

---

#### Private IP

- Used inside local networks
- Not accessible directly from the Internet

Examples

```
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

---

### 📌 CIDR (Classless Inter-Domain Routing)

CIDR defines the size of a network.

Example

```
192.168.1.0/24
```

| CIDR | Hosts |
|------|------:|
| /24 | 256 |
| /16 | 65,536 |
| /8 | 16+ Million |

---

### 🌍 CDN (Content Delivery Network)

A CDN stores cached copies of website content across multiple global servers to deliver content faster to users.

##### Benefits

- Faster website loading
- Reduced latency
- Lower server load
- Better availability

Popular CDNs:
- CloudFront
- Cloudflare
- Akamai

---

### 🌍 DNS (Domain Name System)

DNS translates domain names into IP addresses.

Example

```
google.com
        │
        ▼
142.250.xxx.xxx
```

Without DNS, users would need to remember IP addresses instead of domain names.

---

### 🌐 OSI Model (7 Layers)

| Layer | Name | Function |
|--------|------|----------|
| 7 | Application | User interaction (HTTP, FTP, SMTP) |
| 6 | Presentation | Encryption & Data Formatting |
| 5 | Session | Session Management |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP Routing |
| 2 | Data Link | MAC Addressing |
| 1 | Physical | Cables & Signals |

---

### 🌐 TCP/IP Model

| Layer | Protocols |
|--------|-----------|
| Application | HTTP, HTTPS, FTP, DNS, SMTP |
| Transport | TCP, UDP |
| Internet | IP, ICMP |
| Network Access | Ethernet, Wi-Fi |

---

### 🤝 TCP 3-Way Handshake

TCP establishes a reliable connection using three steps:

```
Client                    Server

SYN  -------------------->

      <------------------- SYN-ACK

ACK  -------------------->

Connection Established ✅
```

##### Steps

1. Client sends **SYN**
2. Server replies with **SYN-ACK**
3. Client sends **ACK**

Now data transmission begins.

---

### 🐍 Python Basics

#### Tuples

A Tuple is an ordered and immutable collection.

```python
fruits = ("Apple", "Banana", "Orange")

print(fruits[0])
```

Output

```
Apple
```

---

#### Dictionaries

A Dictionary stores data as key-value pairs.

```python
student = {
    "Name": "John",
    "Age": 22,
    "City": "New York"
}

print(student["Name"])
```

Output

```
John
```

---

### 🐍 Python Virtual Environment

A Virtual Environment creates an isolated Python environment for each project.

##### Create Environment

```bash
python3 -m venv myenv
```

##### Activate

Linux / macOS

```bash
source myenv/bin/activate
```

Windows

```bash
myenv\Scripts\activate
```

##### Deactivate

```bash
deactivate
```

##### Benefits

- Isolated dependencies
- Avoid version conflicts
- Better project management
- Industry best practice

---

### 🎯 Key Takeaways

- Learned how routers, switches, hubs, and racks form the backbone of physical networks.
- Understood IP addressing, subnetting, and CIDR notation.
- Explored the roles of DNS and CDN in web communication.
- Learned the OSI Model and TCP/IP Model for network communication.
- Understood how the TCP 3-Way Handshake establishes reliable connections.
- Practiced Python Tuples and Dictionaries.
- Created and managed Python Virtual Environments.

---

### 📈 Progress

- ✅ Day 01 – DevOps Roadmap
- ✅ Day 02 – Linux Fundamentals
- ✅ Day 03 – Advanced Linux
- ✅ Day 04 – Linux Permissions & Shell Basics
- ✅ Day 05 – Shell Scripting
- ✅ Day 06 – AWS Networking & Shell Projects
- ✅ Day 07 – Networking Fundamentals & Python Basics

**Completed:** 7 / 90 Days 🚀

---

### 💡 What's Next?

Next, I'll continue exploring AWS services, Python scripting, and core DevOps tools.

---

⭐ Thanks for following my #90DaysOfDevOps journey!


---

[← Day 06](../day-06/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 08 →](../day-08/README.md)
