# Day 07 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 07 – Linux File System Hierarchy & Scenario-Based Practice

## Task
Today's goal is to **understand where things live in Linux** and **practice troubleshooting like a DevOps engineer**.

You will create notes covering:
- Linux File System Hierarchy (the most important directories)
- Practice solving real-world scenarios step by step

This consolidates your Linux fundamentals and prepares you for real-world troubleshooting.

---

## Expected Output
By the end of today, you should have:

- A markdown file named:
  `day-07-linux-fs-and-scenarios.md`

or

- A hand written set of notes (Recommended)

Your notes should have two sections: File System Hierarchy and Scenario Practice.

---

## Guidelines

### Part 1: Linux File System Hierarchy (30 minutes)

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

### Part 2: Scenario-Based Practice (40 minutes)

**Important:** Focus on understanding the **troubleshooting flow**, not memorizing commands. Use the hints!

---

#### SOLVED EXAMPLE: Understanding How to Approach Scenarios

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

## Why This Matters for DevOps
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

## Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to the `2026/day-07/` folder
3. Add your `day-07-linux-fs-and-scenarios.md` file
4. Commit and push your changes to your fork

---

## Learn in Public
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

## Source file: `linux-fs-and-scenarios.md`

# Day 07 – Linux File System Hierarchy & Scenario-Based Practice

# Part 1: Linux File System Hierarchy

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

# Hands-on Practice

- Use the command `du -sh /var/log/* 2>/dev/null | sort -h | tail -5` to find 5 largest log file
-  checkthe configuration file `/etc/hostname ` to get the hostname
-  lsited all the file and directory in the home directory ` ls -la `
  
  <img width="1912" height="824" alt="Screenshot 2026-07-30 232715" src="https://github.com/user-attachments/assets/6da903e9-daa2-467f-ba42-d1a65aa1c055" />


# Part 2: Scenario-Based Practice

## Scenario 1 – Service Not Starting

### Step 1

```bash
systemctl status myapp
```

**Why:** Check whether the service is running, stopped, or failed.

### Step 2

```bash
journalctl -u myapp -n 50
```

**Why:** View the last 50 log messages.

### Step 3

```bash
systemctl is-enabled myapp
```

**Why:** Check if the service starts automatically after reboot.

### Step 4

```bash
systemctl restart myapp
```

**Why:** Restart the service after fixing the issue.

**What I learned**
- Always check service status first.
- Then check logs.
- Finally verify if the service is enabled.

---

## Scenario 2 – High CPU Usage

### Step 1

```bash
top
```

**Why:** Shows live CPU usage.

### Step 2

```bash
ps aux --sort=-%cpu | head -10
```

**Why:** Displays the processes using the most CPU.

### Step 3

```bash
pgrep <process_name>
```

**Why:** Finds the Process ID (PID).

### Step 4

```bash
kill -15 PID
```

**Why:** Stops the process if required.

**What I learned**
- Find the process with high CPU usage before taking action.

---

## Scenario 3 – Finding Service Logs

### Step 1

```bash
systemctl status docker
```

**Why:** Check Docker service status.

### Step 2

```bash
journalctl -u docker -n 50
```

**Why:** View the last 50 log entries.

### Step 3

```bash
journalctl -u docker -f
```

**Why:** Watch logs in real time.

**What I learned**
- `journalctl` is used to view logs of systemd services.

---

## Scenario 4 – File Permission Issue

### Step 1

```bash
ls -l /home/user/backup.sh
```

**Why:** Check current file permissions.

### Step 2

```bash
chmod +x /home/user/backup.sh
```

**Why:** Give execute permission.

### Step 3

```bash
ls -l /home/user/backup.sh
```

**Why:** Verify execute permission is added.

### Step 4

```bash
./backup.sh
```

**Why:** Run the script.

**What I learned**
- Always check file permissions before running a script.

---

# Summary

- Learned the Linux File System Hierarchy.
- Learned where logs, configuration files, binaries, and user files are stored.
- Practiced troubleshooting service issues, CPU usage, logs, and file permissions.
- Improved Linux skills for DevOps and real-world troubleshooting.

**✅ Day 07 Completed**
