# Day 05 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 05 – Linux Troubleshooting Drill: CPU, Memory, and Logs

## Task
Today’s goal is to **run a focused troubleshooting drill**.

You will pick a running process/service on your system and:
- Capture a quick health snapshot (CPU, memory, disk, network)
- Trace logs for that service
- Write a **mini runbook** describing what you did and what you’d do next if things were worse

This turns yesterday’s practice into a repeatable troubleshooting routine.

### What’s a runbook?
A **runbook** is a short, repeatable checklist you follow during an incident: the exact commands you run, what you observed, and the next actions if the issue persists. Keep it concise so you can reuse it under pressure.

---

## Expected Output
By the end of today, you should have:

- A markdown file named:  
  `linux-troubleshooting-runbook.md`

or

- A hand written runbook (Recommended)

Your runbook should include both the commands you ran and brief interpretations.

---

## Guidelines
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

## Resources
You may refer to:

- Notes from Day 02–04
- Linux `man` pages (`top`, `ps`, `df`, `journalctl`, `ss/netstat`)
- Your class notes

Avoid generic copy/paste. Use outputs from **your** machine.

---

## Why This Matters for DevOps
Incidents rarely come with perfect clues. A fast, repeatable checklist saves minutes when services misbehave.

This drill builds:
- Habit of capturing evidence before acting
- Confidence reading resource signals (CPU, memory, disk, network)
- Log-first mindset before restarts or escalations

These habits reduce downtime and prevent guesswork in production.

---

## Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-05/` folder  
3. Add your `linux-troubleshooting-runbook.md` file  
4. Commit and push your changes to your fork  

---

## Learn in Public
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

## Source file: `linux-troubleshooting-runbook.md`

# Day 05 – Linux Troubleshooting Runbook (Docker Service)

## 🎯 Objective

- Install Docker on Amazon Linux.
- Start and enable the Docker service.
- Deploy an Nginx container.
- Verify Docker functionality.
- Monitor system resources.
- Troubleshoot Docker using logs and Linux commands.

# Target Service

**Service Name:** Docker

**Purpose:** Docker is a container platform used to build, package, and run applications inside containers.

---

# Environment Information

## 1. Check Linux Kernel

```bash
uname -a
```

**Observation**

- Verified the Linux kernel version.
- Confirmed system architecture.

---

## 2. Check Operating System

```bash
cat /etc/os-release
```

**Observation**

- Verified the operating system version.
- Confirmed the EC2 instance is running Amazon Linux.

---

# Filesystem Sanity Check

## 3. Create Temporary Directory

```bash
mkdir /tmp/docker-demo
```

**Observation**

- Temporary directory created successfully.

---

## 4. Copy Sample File

```bash
cp /etc/hosts /tmp/docker-demo/
ls -l /tmp/docker-demo
```
<img width="1632" height="109" alt="Screenshot 2026-07-28 224409" src="https://github.com/user-attachments/assets/c0fc00a5-c0ec-4110-a975-23e8a6131573" />

**Observation**

- File copied successfully.
- Verified file permissions and ownership.

---

# Docker Service Health

## 5. Check Docker Status

```bash
sudo systemctl status docker
```
<img width="1919" height="857" alt="Screenshot 2026-07-28 220652" src="https://github.com/user-attachments/assets/c8443d63-400b-44da-923d-aa8a6d38f877" />

**Observation**

- Docker service is active and running.
- No service failures observed.

---

## 6. Check Docker Version

```bash
docker --version
```

**Observation**

- Docker CLI is installed and working properly.

---

# Docker Images & Containers

## 7. List Docker Images

```bash
docker images
```
<img width="1235" height="96" alt="Screenshot 2026-07-28 231814" src="https://github.com/user-attachments/assets/e725c79e-d8e6-446a-bd37-b2e1b0e00151" />

**Observation**

- Verified downloaded Docker images.
- Nginx image is available.

---

## 8. Check Running Containers

```bash
docker ps
```
<img width="1516" height="97" alt="Screenshot 2026-07-28 221419" src="https://github.com/user-attachments/assets/59d36775-edaa-4bc0-b0b7-ca7b741353ee" />

**Observation**

- Nginx container is running successfully.
- Container status is healthy.

---

# CPU & Memory Snapshot

## 9. Monitor CPU Usage

```bash
top
```
<img width="1680" height="749" alt="Screenshot 2026-07-28 221922" src="https://github.com/user-attachments/assets/c506e773-2e3f-47a7-a8a9-9def5b6be5f9" />

**Observation**

- CPU usage remained low.
- No abnormal processes consuming excessive CPU.

---

## 10. Check Memory

```bash
free -h
```
<img width="1229" height="119" alt="Screenshot 2026-07-28 224601" src="https://github.com/user-attachments/assets/c84ae095-0b35-4fee-acb3-123b67b8033f" />

**Observation**

- Memory usage is within normal limits.
- Swap usage is minimal.

---

# Disk Usage

## 11. Check Filesystem Usage

```bash
df -h
```
<img width="1603" height="257" alt="Screenshot 2026-07-28 222023" src="https://github.com/user-attachments/assets/52c1a122-a97c-46ce-8e1c-74f75ae9afdd" />

**Observation**

- Sufficient free disk space available.
- No partition is close to full.

---

## 12. Check Docker Storage

```bash
docker system df
```
<img width="1916" height="487" alt="Screenshot 2026-07-28 222247" src="https://github.com/user-attachments/assets/fa8ac6c4-2570-4903-8726-3ab4283ef0c0" />

**Observation**

- Docker images and containers are using expected storage.
- No unnecessary storage consumption observed.

---

# Network Verification

## 13. Check Listening Ports

```bash
ss -tulpn
```
<img width="1915" height="248" alt="Screenshot 2026-07-28 224838" src="https://github.com/user-attachments/assets/f0ee506d-8c76-4ff2-963f-882bba2343fc" />

**Observation**

- Docker container is listening on port 80.
- Network connectivity appears healthy.

---

## 14. Test Local Web Service

```bash
curl http://localhost
```
<img width="1363" height="642" alt="Screenshot 2026-07-28 225020" src="https://github.com/user-attachments/assets/7deead6b-7758-4ab1-8237-d18110195dd0" />

**Observation**

- Successfully received the Nginx welcome page.
- Verified that the container is accessible.

---

# Log Review

## 15. Review Docker Service Logs

```bash
sudo journalctl -u docker -n 30
```
<img width="1903" height="475" alt="Screenshot 2026-07-28 221622" src="https://github.com/user-attachments/assets/1d8987b7-fa5d-41d9-9179-02955b4dfc4d" />

**Observation**

- Docker daemon logs show normal startup.
- No critical errors found.

---

## 16. Review Container Logs

```bash
docker logs my-nginx
```
<img width="1919" height="663" alt="Screenshot 2026-07-28 232536" src="https://github.com/user-attachments/assets/41f79f0f-4da4-4055-974f-b5cfe1e7f09e" />

**Observation**

- Container started successfully.
- No application-level errors observed.

---
## 17. Test the Application

### Command

```bash
curl http://localhost
```
<img width="1363" height="642" alt="Screenshot 2026-07-28 225020" src="https://github.com/user-attachments/assets/becdb7fe-2614-43d7-b600-3ced0e0daf82" />

<img width="1910" height="655" alt="Screenshot 2026-07-28 233020" src="https://github.com/user-attachments/assets/abbc535e-d1dd-4daa-9617-b96d78167610" />

### Observation

The Nginx welcome page was returned successfully.

# Quick Findings

- Docker service is active and healthy.
- Nginx container is running without issues.
- CPU and memory utilisation are normal.
- Disk space is sufficient.
- Docker storage usage is within expected limits.
- Network connectivity is functioning correctly.
- No critical errors found in Docker logs.

---

# If This Worsens

If the Docker service becomes slow or stops responding:

### Step 1 – Check Docker Status

```bash
sudo systemctl status docker
```

---

### Step 2 – Restart Docker

```bash
sudo systemctl restart docker
```

---

### Step 3 – Review Recent Logs

```bash
sudo journalctl -xeu docker
```

---

### Step 4 – Check Container Health

```bash
docker ps -a
docker inspect my-nginx
```

---

### Step 5 – Clean Unused Docker Resources

```bash
docker system prune
```

---

# Commands Used

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


# Conclusion

This troubleshooting exercise helped me understand a structured approach to diagnosing Docker-related issues on a Linux server. Instead of immediately restarting services, I learned to first collect system health information, inspect logs, verify resource usage, and confirm network connectivity. Following a repeatable runbook like this improves troubleshooting efficiency and helps reduce downtime during real-world incidents.

---
