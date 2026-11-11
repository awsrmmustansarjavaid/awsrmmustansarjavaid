# Day 05 — Processes, systemd Services & Scheduling

[← Day 04](../day-04/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 06 →](../day-06/README.md)

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 05 – Linux Troubleshooting Drill: CPU, Memory, and Logs

#### Task
Today’s goal is to **run a focused troubleshooting drill**.

You will pick a running process/service on your system and:
- Capture a quick health snapshot (CPU, memory, disk, network)
- Trace logs for that service
- Write a **mini runbook** describing what you did and what you’d do next if things were worse

This turns yesterday’s practice into a repeatable troubleshooting routine.

##### What’s a runbook?
A **runbook** is a short, repeatable checklist you follow during an incident: the exact commands you run, what you observed, and the next actions if the issue persists. Keep it concise so you can reuse it under pressure.

---

#### Expected Output
By the end of today, you should have:

- A markdown file named:  
  `linux-troubleshooting-runbook.md`

or

- A hand written runbook (Recommended)

Your runbook should include both the commands you ran and brief interpretations.

---

#### Guidelines
Follow these rules while creating your runbook:

- Run and record output for **at least 8 commands** (save snippets in your runbook)  
  - **Environment basics (2):** `uname -a`, `lsb_release -a` (or `cat /etc/os-release`)  
  - **Filesystem sanity (2):** create a throwaway folder and file, e.g., `mkdir /tmp/runbook-demo`, `cp /etc/hosts /tmp/runbook-demo/hosts-copy && ls -l /tmp/runbook-demo`  
  - **CPU / Memory (2):** `top`/`htop`/`ps -o pid,pcpu,pmem,comm -p <pid>`, `free -h`, `vm_stat` (mac)  
  - **Disk / IO (2):** `df -h`, `du -sh /var/log`, `iostat`/`vmstat`/`dstat`  
  - **Network (2):** `ss -tulpn`/`netstat -tulpn`, `curl -I <service-endpoint>`/`ping`  
  - **Logs (2):** `journalctl -u <service> -n 50`, `tail -n 50 /var/log/<file>.log`
- Choose **one target service/process** (e.g., `ssh`, `cron`, `docker`, your web app) and stick to it for the drill.
- For each command, add a 1–2 line note on what you observed (e.g., “CPU spikes to 80% when restarting”, “No recent errors in last 50 lines”).
- End with a **“If this worsens”** section listing 3 next steps you would take (ex: restart strategy, increase log verbosity, collect `strace`).
- Keep it concise and actionable (aim for ~1 page).

Suggested structure for `linux-troubleshooting-runbook.md`:
- Target service / process
- Snapshot: CPU & Memory
- Snapshot: Disk & IO
- Snapshot: Network
- Logs reviewed
- Quick findings
- If this worsens (next steps)

---

#### Resources
You may refer to:

- Notes from Day 02–04
- Linux `man` pages (`top`, `ps`, `df`, `journalctl`, `ss/netstat`)
- Your class notes

Avoid generic copy/paste. Use outputs from **your** machine.

---

#### Why This Matters for DevOps
Incidents rarely come with perfect clues. A fast, repeatable checklist saves minutes when services misbehave.

This drill builds:
- Habit of capturing evidence before acting
- Confidence reading resource signals (CPU, memory, disk, network)
- Log-first mindset before restarts or escalations

These habits reduce downtime and prevent guesswork in production.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-05/` folder  
3. Add your `linux-troubleshooting-runbook.md` file  
4. Commit and push your changes to your fork  

---

#### Learn in Public
Share your Day 05 progress on LinkedIn:

- Post 2–3 lines on the checks you ran and one insight
- Share the service you inspected and one “next step” from your runbook
- Optional: screenshot of your runbook

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

### 7.2 Day 05 – Linux Troubleshooting Runbook (Docker Service)

#### 🎯 Objective

- Install Docker on Amazon Linux.
- Start and enable the Docker service.
- Deploy an Nginx container.
- Verify Docker functionality.
- Monitor system resources.
- Troubleshoot Docker using logs and Linux commands.

#### Target Service

**Service Name:** Docker

**Purpose:** Docker is a container platform used to build, package, and run applications inside containers.

---

#### Environment Information

#### 1. Check Linux Kernel

```bash
uname -a
```

**Observation**

- Verified the Linux kernel version.
- Confirmed system architecture.

---

#### 2. Check Operating System

```bash
cat /etc/os-release
```

**Observation**

- Verified the operating system version.
- Confirmed the EC2 instance is running Amazon Linux.

---

#### Filesystem Sanity Check

#### 3. Create Temporary Directory

```bash
mkdir /tmp/docker-demo
```

**Observation**

- Temporary directory created successfully.

---

#### 4. Copy Sample File

```bash
cp /etc/hosts /tmp/docker-demo/
ls -l /tmp/docker-demo
```
<img width="1632" height="109" alt="Screenshot 2026-07-28 224409" src="https://github.com/user-attachments/assets/c0fc00a5-c0ec-4110-a975-23e8a6131573" />

**Observation**

- File copied successfully.
- Verified file permissions and ownership.

---

#### Docker Service Health

#### 5. Check Docker Status

```bash
sudo systemctl status docker
```
<img width="1919" height="857" alt="Screenshot 2026-07-28 220652" src="https://github.com/user-attachments/assets/c8443d63-400b-44da-923d-aa8a6d38f877" />

**Observation**

- Docker service is active and running.
- No service failures observed.

---

#### 6. Check Docker Version

```bash
docker --version
```

**Observation**

- Docker CLI is installed and working properly.

---

#### Docker Images & Containers

#### 7. List Docker Images

```bash
docker images
```
<img width="1235" height="96" alt="Screenshot 2026-07-28 231814" src="https://github.com/user-attachments/assets/e725c79e-d8e6-446a-bd37-b2e1b0e00151" />

**Observation**

- Verified downloaded Docker images.
- Nginx image is available.

---

#### 8. Check Running Containers

```bash
docker ps
```
<img width="1516" height="97" alt="Screenshot 2026-07-28 221419" src="https://github.com/user-attachments/assets/59d36775-edaa-4bc0-b0b7-ca7b741353ee" />

**Observation**

- Nginx container is running successfully.
- Container status is healthy.

---

#### CPU & Memory Snapshot

#### 9. Monitor CPU Usage

```bash
top
```
<img width="1680" height="749" alt="Screenshot 2026-07-28 221922" src="https://github.com/user-attachments/assets/c506e773-2e3f-47a7-a8a9-9def5b6be5f9" />

**Observation**

- CPU usage remained low.
- No abnormal processes consuming excessive CPU.

---

#### 10. Check Memory

```bash
free -h
```
<img width="1229" height="119" alt="Screenshot 2026-07-28 224601" src="https://github.com/user-attachments/assets/c84ae095-0b35-4fee-acb3-123b67b8033f" />

**Observation**

- Memory usage is within normal limits.
- Swap usage is minimal.

---

#### Disk Usage

#### 11. Check Filesystem Usage

```bash
df -h
```
<img width="1603" height="257" alt="Screenshot 2026-07-28 222023" src="https://github.com/user-attachments/assets/52c1a122-a97c-46ce-8e1c-74f75ae9afdd" />

**Observation**

- Sufficient free disk space available.
- No partition is close to full.

---

#### 12. Check Docker Storage

```bash
docker system df
```
<img width="1916" height="487" alt="Screenshot 2026-07-28 222247" src="https://github.com/user-attachments/assets/fa8ac6c4-2570-4903-8726-3ab4283ef0c0" />

**Observation**

- Docker images and containers are using expected storage.
- No unnecessary storage consumption observed.

---

#### Network Verification

#### 13. Check Listening Ports

```bash
ss -tulpn
```
<img width="1915" height="248" alt="Screenshot 2026-07-28 224838" src="https://github.com/user-attachments/assets/f0ee506d-8c76-4ff2-963f-882bba2343fc" />

**Observation**

- Docker container is listening on port 80.
- Network connectivity appears healthy.

---

#### 14. Test Local Web Service

```bash
curl http://localhost
```
<img width="1363" height="642" alt="Screenshot 2026-07-28 225020" src="https://github.com/user-attachments/assets/7deead6b-7758-4ab1-8237-d18110195dd0" />

**Observation**

- Successfully received the Nginx welcome page.
- Verified that the container is accessible.

---

#### Log Review

#### 15. Review Docker Service Logs

```bash
sudo journalctl -u docker -n 30
```
<img width="1903" height="475" alt="Screenshot 2026-07-28 221622" src="https://github.com/user-attachments/assets/1d8987b7-fa5d-41d9-9179-02955b4dfc4d" />

**Observation**

- Docker daemon logs show normal startup.
- No critical errors found.

---

#### 16. Review Container Logs

```bash
docker logs my-nginx
```
<img width="1919" height="663" alt="Screenshot 2026-07-28 232536" src="https://github.com/user-attachments/assets/41f79f0f-4da4-4055-974f-b5cfe1e7f09e" />

**Observation**

- Container started successfully.
- No application-level errors observed.

---
#### 17. Test the Application

##### Command

```bash
curl http://localhost
```
<img width="1363" height="642" alt="Screenshot 2026-07-28 225020" src="https://github.com/user-attachments/assets/becdb7fe-2614-43d7-b600-3ced0e0daf82" />

<img width="1910" height="655" alt="Screenshot 2026-07-28 233020" src="https://github.com/user-attachments/assets/abbc535e-d1dd-4daa-9617-b96d78167610" />

##### Observation

The Nginx welcome page was returned successfully.

#### Quick Findings

- Docker service is active and healthy.
- Nginx container is running without issues.
- CPU and memory utilisation are normal.
- Disk space is sufficient.
- Docker storage usage is within expected limits.
- Network connectivity is functioning correctly.
- No critical errors found in Docker logs.

---

#### If This Worsens

If the Docker service becomes slow or stops responding:

##### Step 1 – Check Docker Status

```bash
sudo systemctl status docker
```

---

##### Step 2 – Restart Docker

```bash
sudo systemctl restart docker
```

---

##### Step 3 – Review Recent Logs

```bash
sudo journalctl -xeu docker
```

---

##### Step 4 – Check Container Health

```bash
docker ps -a
docker inspect my-nginx
```

---

##### Step 5 – Clean Unused Docker Resources

```bash
docker system prune
```

---

#### Commands Used

```bash
uname -a
cat /etc/os-release
mkdir /tmp/docker-demo
cp /etc/hosts /tmp/docker-demo/
ls -l /tmp/docker-demo
systemctl status docker
docker --version
docker images
docker ps
top
free -h
df -h
docker system df
ss -tulpn
curl http://localhost
journalctl -u docker -n 30
docker logs my-nginx
```

---


#### Conclusion

This troubleshooting exercise helped me understand a structured approach to diagnosing Docker-related issues on a Linux server. Instead of immediately restarting services, I learned to first collect system health information, inspect logs, verify resource usage, and confirm network connectivity. Following a repeatable runbook like this improves troubleshooting efficiency and helps reduce downtime during real-world incidents.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a unit with `After=network-online.target`, `Restart=always`, `RestartSec=5`. | You can demonstrate, without notes: *inspect and control processes and signals* — with evidence committed to `day-05/`. |
| 2 | Document the difference between `restart`, `reload`, `stop`, `disable`, `mask`. | You can demonstrate, without notes: *write and manage a systemd service unit* — with evidence committed to `day-05/`. |
| 3 | Add resource limits `MemoryMax=200M` to a unit. | You can demonstrate, without notes: *schedule jobs with cron and systemd timers* — with evidence committed to `day-05/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Service fails: `status=203/EXEC` | Script not executable or wrong ExecStart path; `chmod +x` and use absolute paths. |
| Cron not running | Cron has a minimal PATH; use absolute paths and redirect output; check `grep CRON /var/log/syslog`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use `NoNewPrivileges=true`, `ProtectSystem=strict`, `PrivateTmp=true` in units to sandbox services. Never run services as root unless required.
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

1. SIGTERM vs SIGKILL?
2. What is PID 1?
3. How do you view logs for one service?
4. Cron vs systemd timers?
5. **Scenario:** The payments worker crashes at random hours and nobody notices until customers complain. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 18. Personal Learning Journal — 🐧 Day 05 - Python for DevOps, Automation & Cron Jobs

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date
18 July 2026

---

### 🚀 Introduction

Today, I continued my journey into **Python for DevOps automation**. I learned how Python logic can be used to create automation scripts, manage repetitive tasks, and improve system administration workflows.

I explored advanced Python concepts including **conditional statements, loops, functions, package management using pip**, and started automating Linux tasks using **Cron Jobs**.

---

### 📚 Topics Covered

- Python Conditional Statements
- Nested if-else Conditions
- Python Functions
- For Loops
- While Loops
- Package Installation using pip
- Python Automation Scripts
- Shell Scripting Automation
- Package Installation Automation
- Cron Tab Scheduling
- Automating Repetitive Tasks

---

### 🐍 Python for DevOps

Python is widely used in DevOps because it helps automate:

- Server management
- Cloud operations
- Deployment tasks
- Monitoring systems
- File management
- API integrations

Python scripts reduce manual work and improve efficiency.

---

### 🔀 Conditional Statements in Python

Conditional statements allow programs to make decisions based on conditions.

---

#### if-else Statement

Example:

```python
age = 20

if age >= 18:
    print("User is allowed")
else:
    print("User is not allowed")
```

Output:

```
User is allowed
```

---

### 🌳 Nested if-else Conditions

Nested conditions are used when we need to check multiple conditions inside another condition.

Example:

```python
username = "admin"
password = "1234"

if username == "admin":

    if password == "1234":
        print("Login Successful")

    else:
        print("Wrong Password")

else:
    print("Invalid User")
```

Output:

```
Login Successful
```

---

### 🔁 Python Loops

Loops help automate repetitive tasks by executing a block of code multiple times.

---

### 🔄 For Loop

A `for` loop is used when we know the number of iterations.

Example:

```python
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

##### DevOps Example:

Checking multiple servers:

```python
servers = ["server1", "server2", "server3"]

for server in servers:
    print("Checking", server)
```

---

### 🔁 While Loop

A `while` loop runs as long as a condition remains true.

Example:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

Output:

```
1
2
3
4
5
```

---

### 🧩 Python Functions

Functions are reusable blocks of code that help organize automation scripts.

Example:

```python
def welcome():
    print("Welcome to DevOps")

welcome()
```

Output:

```
Welcome to DevOps
```

---

#### Function with Parameters

Example:

```python
def install_package(package):

    print("Installing", package)


install_package("nginx")
```

Output:

```
Installing nginx
```

---

### 📦 Installing Python Packages Using pip

`pip` is Python's package manager used to install external libraries.

Check pip version:

```bash
pip --version
```

Install a package:

```bash
pip install requests
```

Install specific package version:

```bash
pip install requests==2.31.0
```

List installed packages:

```bash
pip list
```

Remove package:

```bash
pip uninstall requests
```

---

### ⚙️ Automation Using Python Scripts

Python can automate DevOps tasks like:

- Installing packages
- Checking system status
- Managing files
- Running commands
- Automating deployments

Example:

```python
import os

os.system("sudo apt update")

os.system("sudo apt install nginx -y")
```

This script automatically updates packages and installs Nginx.

---

### 🖥️ Shell Scripting Automation

Shell scripts can automate Linux administration tasks.

Examples:

- Installing software packages
- Running system updates
- Creating backups
- Monitoring services

Example:

```bash
#!/bin/bash

echo "Installing nginx..."

sudo apt update

sudo apt install nginx -y

echo "Installation completed"
```

---

### 🔁 Automation Using Loops in Scripts

Loops help execute repetitive commands automatically.

Example:

```bash
#!/bin/bash

for server in server1 server2 server3
do
    echo "Checking $server"
done
```

Output:

```
Checking server1
Checking server2
Checking server3
```

---

### ⏰ Cron Jobs Automation

Cron is a Linux scheduling tool used to automatically run commands or scripts at specific times.

Common uses:

- Automatic backups
- Log cleanup
- Server monitoring
- Database backups
- Scheduled deployments

---

### 📝 Cron Tab Commands

View current cron jobs:

```bash
crontab -l
```

Edit cron jobs:

```bash
crontab -e
```

Remove cron jobs:

```bash
crontab -r
```

---

### ⏱️ Cron Job Format

```
* * * * * command
```

Meaning:

```
| | | | |
| | | | └── Day of Week
| | | └──── Month
| | └────── Day of Month
| └──────── Hour
└────────── Minute
```

---

### Example Cron Job

Run backup script every day at midnight:

```bash
0 0 * * * /home/user/backup.sh
```

Run Python automation script every hour:

```bash
0 * * * * python3 /home/user/script.py
```

---

### 💻 Practice

Today I practiced:

##### Python

- Writing if-else conditions
- Creating nested conditions
- Using for loops
- Using while loops
- Creating reusable functions
- Installing and managing Python packages using pip

##### Automation Scripts

- Creating scripts for package installation
- Automating repetitive tasks using loops
- Writing reusable functions
- Automating Linux tasks

##### Cron Jobs

- Creating scheduled tasks
- Running scripts automatically
- Understanding cron job syntax

---

### 🎯 Key Takeaways

- Python is a powerful language for DevOps automation.
- Conditional statements help scripts make intelligent decisions.
- Loops reduce repetitive manual work.
- Functions improve code reusability and maintainability.
- pip helps install and manage Python libraries.
- Shell scripts automate Linux administration tasks.
- Cron jobs allow automatic scheduling of DevOps tasks.

---

### 📈 Progress

- ✅ Day 01 - DevOps Roadmap
- ✅ Day 02 - Linux Fundamentals
- ✅ Day 03 - Advanced Linux, SSH & AWS Volume Management
- ✅ Day 04 - Basic Shell Scripting & Python Basics
- ✅ Day 05 - Python Automation, Scripting & Cron Jobs

**Completed:** 5 / 90 Days 🚀

---

### 💡 What's Next?

Next, I will continue learning Python for DevOps:

- Lists
- Tuples
- Dictionaries
- Sets
- File Handling
- Exception Handling
- Working with APIs
- Advanced Automation Scripts

---

⭐ Thank you for following my #90DaysOfDevOps journey!


---

[← Day 04](../day-04/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 06 →](../day-06/README.md)
