# Day 19 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 19 – Shell Scripting Project: Log Rotation, Backup & Crontab

## Task
Apply everything from Days 16–18 in real-world mini projects.

You will:
- Write a **log rotation** script
- Write a **server backup** script
- Schedule them with **crontab**

---

## Expected Output
- A markdown file: `day-19-project.md`
- All scripts you write during the tasks

---

## Challenge Tasks

### Task 1: Log Rotation Script
Create `log_rotate.sh` that:
1. Takes a log directory as an argument (e.g., `/var/log/myapp`)
2. Compresses `.log` files older than 7 days using `gzip`
3. Deletes `.gz` files older than 30 days
4. Prints how many files were compressed and deleted
5. Exits with an error if the directory doesn't exist

---

### Task 2: Server Backup Script
Create `backup.sh` that:
1. Takes a source directory and backup destination as arguments
2. Creates a timestamped `.tar.gz` archive (e.g., `backup-2026-02-08.tar.gz`)
3. Verifies the archive was created successfully
4. Prints archive name and size
5. Deletes backups older than 14 days from the destination
6. Handles errors — exit if source doesn't exist

---

### Task 3: Crontab
1. Read: `crontab -l` — what's currently scheduled?
2. Understand cron syntax:
   ```
   * * * * *  command
   │ │ │ │ │
   │ │ │ │ └── Day of week (0-7)
   │ │ │ └──── Month (1-12)
   │ │ └────── Day of month (1-31)
   │ └──────── Hour (0-23)
   └────────── Minute (0-59)
   ```
3. Write cron entries (in your markdown, don't apply if unsure) for:
   - Run `log_rotate.sh` every day at 2 AM
   - Run `backup.sh` every Sunday at 3 AM
   - Run a health check script every 5 minutes

---

### Task 4: Combine — Scheduled Maintenance Script
Create `maintenance.sh` that:
1. Calls your log rotation function
2. Calls your backup function
3. Logs all output to `/var/log/maintenance.log` with timestamps
4. Write the cron entry to run it daily at 1 AM

---

## Hints
- Compress old files: `find /path -name "*.log" -mtime +7 -exec gzip {} \;`
- Timestamp: `date +%Y-%m-%d`
- Tar: `tar -czf backup.tar.gz /source/dir`
- Cron edit: `crontab -e`
- Log with timestamp: `echo "$(date): message" >> logfile`

---

## Documentation

Create `day-19-project.md` with:
- Each script's code
- Sample outputs
- Cron entries you wrote
- What you learned (3 key points)

---

## Submission
1. Add your scripts and `day-19-project.md` to `2026/day-19/`
2. Commit and push to your fork

---

## Reference Video

[![Watch the video](https://img.youtube.com/vi/PZYJ33bMXAw/0.jpg)](https://youtu.be/PZYJ33bMXAw?si=RzEzOSom7-FqnopA)

---

## Learn in Public

Share your shell scripting projects on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## Source file: `day-19-project.md`

# 🚀 Day 19 – Shell Scripting Project: Log Rotation, Backup & Crontab

> 🛠️ **90 Days of DevOps Challenge**
> 📅 **Day 19 | Shell Scripting – Automation & Maintenance**

Today I worked on practical **Shell Scripting automation** for log management, server backups, and scheduled maintenance using **Crontab**.

---

## 📋 Task 1: Log Rotation Script

### 🎯 Objective

Create `log_rotate.sh` that:

* 📂 Takes a log directory as an argument
  Example: `/var/log/myapp`
* 🗜️ Compresses `.log` files older than **7 days** using `gzip`
* 🗑️ Deletes `.gz` files older than **30 days**
* 📊 Prints the number of files **compressed and deleted**
* ❌ Exits with an error if the directory doesn't exist
  
<img width="1919" height="628" alt="Screenshot 2026-08-11 121703" src="https://github.com/user-attachments/assets/a449cb54-507e-4fd9-9434-5e95b91e4a31" />


---

## 💾 Task 2: Server Backup Script

### 🎯 Objective

Create `backup.sh` that:

* 📁 Takes a **source directory** and **backup destination** as arguments
* 🕐 Creates a timestamped `.tar.gz` archive
* 📦 Example: `backup-2026-02-08.tar.gz`
* ✅ Verifies that the archive was created successfully
* 📏 Prints the archive name and size
* 🧹 Deletes backups older than **14 days**
* ❌ Exits if the source directory doesn't exist

<img width="1297" height="392" alt="Screenshot 2026-08-11 122159" src="https://github.com/user-attachments/assets/9ed6e701-c7dd-42f5-870e-f89713f25191" />


---

## ⏰ Task 3: Crontab

### 🔍 Check Existing Cron Jobs

```bash
crontab -l
```

This command displays the cron jobs currently scheduled for the user.

### 🧩 Cron Syntax

```text
* * * * * command
│ │ │ │ │
│ │ │ │ └── 📅 Day of week (0-7)
│ │ │ └──── 📆 Month (1-12)
│ │ └────── 📅 Day of month (1-31)
│ └──────── ⏰ Hour (0-23)
└────────── ⏱️ Minute (0-59)
```

### 📌 Cron Examples

| ⏰ Schedule    | 📝 Purpose                                   |
| ------------- | -------------------------------------------- |
| `0 2 * * *`   | 🔄 Run `log_rotate.sh` every day at 2 AM     |
| `0 3 * * 7`   | 💾 Run `backup.sh` every Sunday at 3 AM      |
| `*/5 * * * *` | ❤️ Run health check every 5 minutes          |
| `0 1 * * *`   | 🛠️ Run maintenance script every day at 1 AM |


<img width="1885" height="586" alt="Screenshot 2026-08-11 125604" src="https://github.com/user-attachments/assets/51e7ec27-3369-4b96-bf54-3d08555bcd66" />

<img width="1045" height="471" alt="Screenshot 2026-08-11 130154" src="https://github.com/user-attachments/assets/770cb229-1831-4887-8cc4-372e2714f983" />

---

## 🔧 Task 4: Combine – Scheduled Maintenance Script

Create `maintenance.sh` that:

* 🔄 Calls the **log rotation** function
* 💾 Calls the **backup** function
* 📝 Logs all output to `/var/log/maintenance.log`
* 🕐 Adds timestamps to maintenance logs
* ⏰ Runs automatically every day at **1 AM**

### 📅 Cron Entry

```bash
0 1 * * * /path/to/maintenance.sh
```

<img width="1597" height="498" alt="Screenshot 2026-08-11 130701" src="https://github.com/user-attachments/assets/c36539d1-b423-4bc7-ac0c-8177dbb2e2ad" />


---

## 📚 What I Learned

### 🐧 Shell Scripting

* 🔎 Using `find` with `-mtime` to filter files based on age
* 🗜️ Compressing files using `gzip`
* 📦 Creating `.tar.gz` backups using `tar`
* 🕐 Creating timestamped backup archives

### ⏰ Cron Automation

* 🧩 Understanding Cron syntax
* 📅 Scheduling recurring tasks
* ⚙️ Automating server maintenance

### 📝 Logging & Monitoring

* 📄 Writing script output to log files
* 🕐 Adding timestamps to logs
* 🚨 Handling script errors and exit conditions

---

## 💡 Key Takeaway

> 🚀 **Automation reduces manual work and makes server maintenance more reliable, repeatable, and scalable.**

### 🔥 Skills Practiced

`Shell Scripting` • `Linux` • `find` • `gzip` • `tar` • `Crontab` • `Automation` • `Backup` • `Log Management`

---

---

## Source file: `scripts/crontab.txt`

# Log Rotation - Every day at 2 AM
0 2 * * * /bin/bash /home/ec2-user/log_rotate.sh /var/log/myapp >> /home/ec2-user/devops.log 2>&1

# Server Backup - Every Sunday at 3 AM
0 3 * * 0 /bin/bash /home/ec2-user/lab/scripts/backup.sh /home/ec2-user/lab/source /home/ec2-user/lab/backup >> /home/ec2-user/lab/backup.log 2>&1

# Health Check - Every 2 minutes
*/2 * * * * /bin/bash /home/ec2-user/health_check.sh >> /home/ec2-user/health.log 2>&1
