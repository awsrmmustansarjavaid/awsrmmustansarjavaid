# Day 19 — Python: JSON, YAML & REST API Automation

[← Day 18](../day-18/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 20 →](../day-20/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Parse and generate JSON/YAML
- [ ] Call REST APIs with auth, pagination, retries and timeouts
- [ ] Build a GitHub API automation script

## 2. Prerequisites

- Day 18; a GitHub fine-grained token with read-only repo scope.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Data formats

JSON is the API lingua franca; YAML is the config language of DevOps. Use `yaml.safe_load` (never `load`) and `json.dumps(indent=2)`.

### 3.2 API consumption

Use `requests.Session`, always set `timeout`, check `raise_for_status()`, handle 429/5xx with exponential backoff, follow pagination links.

### 3.3 Authentication

Bearer tokens from environment variables; least-privilege fine-grained tokens.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `repos.py` listing your repos, stars, last push using GitHub REST API.
2. [ ] Add pagination and a `--json` output option.
3. [ ] Load a YAML file of 'required repo settings' and compare against actual settings.
4. [ ] Add retry/backoff and timeouts.
5. [ ] Write 3 tests using mocked responses (`responses` or `unittest.mock`).

## 5. Real-World Scenario

> Security asks for a report of all repos without branch protection or SECURITY.md. Automate the audit and output CSV.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
export GITHUB_TOKEN=...   # never commit
python - <<'EOP'
import os, requests
s = requests.Session(); s.headers.update({"Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}", "Accept": "application/vnd.github+json"})
r = s.get("https://api.github.com/user/repos?per_page=100", timeout=10); r.raise_for_status()
for repo in r.json(): print(repo["full_name"], repo["pushed_at"])
EOP
curl -s https://api.github.com/rate_limit | jq .rate
yq '.services[].name' compose.yml
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 19 – Shell Scripting Project: Log Rotation, Backup & Crontab — Challenge Brief

#### Task
Apply everything from Days 16–18 in real-world mini projects.

You will:
- Write a **log rotation** script
- Write a **server backup** script
- Schedule them with **crontab**

---

#### Expected Output
- A markdown file: `day-19-project.md`
- All scripts you write during the tasks

---

#### Challenge Tasks

##### Task 1: Log Rotation Script
Create `log_rotate.sh` that:
1. Takes a log directory as an argument (e.g., `/var/log/myapp`)
2. Compresses `.log` files older than 7 days using `gzip`
3. Deletes `.gz` files older than 30 days
4. Prints how many files were compressed and deleted
5. Exits with an error if the directory doesn't exist

---

##### Task 2: Server Backup Script
Create `backup.sh` that:
1. Takes a source directory and backup destination as arguments
2. Creates a timestamped `.tar.gz` archive (e.g., `backup-2026-02-08.tar.gz`)
3. Verifies the archive was created successfully
4. Prints archive name and size
5. Deletes backups older than 14 days from the destination
6. Handles errors — exit if source doesn't exist

---

##### Task 3: Crontab
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

##### Task 4: Combine — Scheduled Maintenance Script
Create `maintenance.sh` that:
1. Calls your log rotation function
2. Calls your backup function
3. Logs all output to `/var/log/maintenance.log` with timestamps
4. Write the cron entry to run it daily at 1 AM

---

#### Hints
- Compress old files: `find /path -name "*.log" -mtime +7 -exec gzip {} \;`
- Timestamp: `date +%Y-%m-%d`
- Tar: `tar -czf backup.tar.gz /source/dir`
- Cron edit: `crontab -e`
- Log with timestamp: `echo "$(date): message" >> logfile`

---

#### Documentation

Create `day-19-project.md` with:
- Each script's code
- Sample outputs
- Cron entries you wrote
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-19-project.md` to `2026/day-19/`
2. Commit and push to your fork

---

#### Reference Video

[![Watch the video](https://img.youtube.com/vi/PZYJ33bMXAw/0.jpg)](https://youtu.be/PZYJ33bMXAw?si=RzEzOSom7-FqnopA)

---

#### Learn in Public

Share your shell scripting projects on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 19 – Shell Scripting Project: Log Rotation, Backup & Crontab — Notes & Solution

> 🛠️ **90 Days of DevOps Challenge**
> 📅 **Day 19 | Shell Scripting – Automation & Maintenance**

Today I worked on practical **Shell Scripting automation** for log management, server backups, and scheduled maintenance using **Crontab**.

---

#### 📋 Task 1: Log Rotation Script

##### 🎯 Objective

Create `log_rotate.sh` that:

* 📂 Takes a log directory as an argument
  Example: `/var/log/myapp`
* 🗜️ Compresses `.log` files older than **7 days** using `gzip`
* 🗑️ Deletes `.gz` files older than **30 days**
* 📊 Prints the number of files **compressed and deleted**
* ❌ Exits with an error if the directory doesn't exist
  
<img width="1919" height="628" alt="Screenshot 2026-08-11 121703" src="https://github.com/user-attachments/assets/a449cb54-507e-4fd9-9434-5e95b91e4a31" />


---

#### 💾 Task 2: Server Backup Script

##### 🎯 Objective

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

#### ⏰ Task 3: Crontab

##### 🔍 Check Existing Cron Jobs

```bash
crontab -l
```

This command displays the cron jobs currently scheduled for the user.

##### 🧩 Cron Syntax

```text
* * * * * command
│ │ │ │ │
│ │ │ │ └── 📅 Day of week (0-7)
│ │ │ └──── 📆 Month (1-12)
│ │ └────── 📅 Day of month (1-31)
│ └──────── ⏰ Hour (0-23)
└────────── ⏱️ Minute (0-59)
```

##### 📌 Cron Examples

| ⏰ Schedule    | 📝 Purpose                                   |
| ------------- | -------------------------------------------- |
| `0 2 * * *`   | 🔄 Run `log_rotate.sh` every day at 2 AM     |
| `0 3 * * 7`   | 💾 Run `backup.sh` every Sunday at 3 AM      |
| `*/5 * * * *` | ❤️ Run health check every 5 minutes          |
| `0 1 * * *`   | 🛠️ Run maintenance script every day at 1 AM |


<img width="1885" height="586" alt="Screenshot 2026-08-11 125604" src="https://github.com/user-attachments/assets/51e7ec27-3369-4b96-bf54-3d08555bcd66" />

<img width="1045" height="471" alt="Screenshot 2026-08-11 130154" src="https://github.com/user-attachments/assets/770cb229-1831-4887-8cc4-372e2714f983" />

---

#### 🔧 Task 4: Combine – Scheduled Maintenance Script

Create `maintenance.sh` that:

* 🔄 Calls the **log rotation** function
* 💾 Calls the **backup** function
* 📝 Logs all output to `/var/log/maintenance.log`
* 🕐 Adds timestamps to maintenance logs
* ⏰ Runs automatically every day at **1 AM**

##### 📅 Cron Entry

```bash
0 1 * * * /path/to/maintenance.sh
```

<img width="1597" height="498" alt="Screenshot 2026-08-11 130701" src="https://github.com/user-attachments/assets/c36539d1-b423-4bc7-ac0c-8177dbb2e2ad" />


---

#### 📚 What I Learned

##### 🐧 Shell Scripting

* 🔎 Using `find` with `-mtime` to filter files based on age
* 🗜️ Compressing files using `gzip`
* 📦 Creating `.tar.gz` backups using `tar`
* 🕐 Creating timestamped backup archives

##### ⏰ Cron Automation

* 🧩 Understanding Cron syntax
* 📅 Scheduling recurring tasks
* ⚙️ Automating server maintenance

##### 📝 Logging & Monitoring

* 📄 Writing script output to log files
* 🕐 Adding timestamps to logs
* 🚨 Handling script errors and exit conditions

---

#### 💡 Key Takeaway

> 🚀 **Automation reduces manual work and makes server maintenance more reliable, repeatable, and scalable.**

##### 🔥 Skills Practiced

`Shell Scripting` • `Linux` • `find` • `gzip` • `tar` • `Crontab` • `Automation` • `Backup` • `Log Management`

---

---

### 7.3 Crontab Entries (Log Rotation and Backup)

```
# Log Rotation - Every day at 2 AM
0 2 * * * /bin/bash /home/ec2-user/log_rotate.sh /var/log/myapp >> /home/ec2-user/devops.log 2>&1

# Server Backup - Every Sunday at 3 AM
0 3 * * 0 /bin/bash /home/ec2-user/lab/scripts/backup.sh /home/ec2-user/lab/source /home/ec2-user/lab/backup >> /home/ec2-user/lab/backup.log 2>&1

# Health Check - Every 2 minutes
*/2 * * * * /bin/bash /home/ec2-user/health_check.sh >> /home/ec2-user/health.log 2>&1
```

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a YAML->JSON converter CLI. | You can demonstrate, without notes: *parse and generate JSON/YAML* — with evidence committed to `day-19/`. |
| 2 | Write a retry decorator. | You can demonstrate, without notes: *call REST APIs with auth, pagination, retries and timeouts* — with evidence committed to `day-19/`. |
| 3 | Document API rate limits and how you handle them. | You can demonstrate, without notes: *build a GitHub API automation script* — with evidence committed to `day-19/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| 401/403 from API | Token missing scope/expired; check header format. |
| Script hangs | Missing timeout; always set `timeout=(connect, read)`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Store tokens in env/secret manager, use read-only tokens, rotate regularly, never log Authorization headers.
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

1. json vs yaml?
2. Why `safe_load`?
3. How to handle rate limits?
4. How would you paginate?
5. **Scenario:** Security asks for a report of all repos without branch protection or SECURITY. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I call an API with auth? | ☐ | ☐ | ☐ | ☐ |
| Can I handle errors and retries? | ☐ | ☐ | ☐ | ☐ |
| Can I parse YAML safely? | ☐ | ☐ | ☐ | ☐ |
| Parse and generate JSON/YAML | ☐ | ☐ | ☐ | ☐ |
| Call REST APIs with auth, pagination, retries and timeouts | ☐ | ☐ | ☐ | ☐ |
| Build a GitHub API automation script | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-19/` in your own repository:

```text
day-19/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-19
git add day-19/
git commit -m "day-19: python"
git push -u origin day-19
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

## 18. Personal Learning Journal — 🐳 Day 19 - Advanced Docker: Multi-Stage Builds, Volumes & Networking

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

02 August 2026

---

### 🚀 Introduction

Today, I explored advanced Docker concepts that are widely used in production environments. I learned how to optimize Docker images using **Multi-Stage Builds**, persist application data using **Docker Volumes**, understand **Volume Mounting** for databases, and configure different **Docker Network Drivers** for container communication. I also got introduced to **Docker Swarm**, Docker's native container orchestration platform.

---

### 📚 Topics Covered

#### 🐳 Docker Advanced
- Multi-Stage Dockerfile
- Builder Stage
- Runner Stage
- Docker Volumes
- Volume Mounting
- Persistent Storage
- Docker Networks
- Bridge Network
- User-defined Bridge
- Host Network
- None Network
- Overlay Network
- Macvlan Network
- IPvlan Network
- Docker Swarm

---

### 🏗️ What is a Multi-Stage Docker Build?

A **Multi-Stage Build** allows you to use multiple `FROM` statements in a single Dockerfile.

It helps create **smaller, cleaner, and production-ready Docker images** by separating the build environment from the runtime environment.

##### Benefits

- Smaller image size
- Faster deployments
- Better security
- Removes unnecessary build tools
- Optimized production images

---

### 🔨 Builder Stage

The **Builder Stage** contains everything required to build the application.

Example:

- Source Code
- Dependencies
- Build Tools
- Compilers

Example Dockerfile:

```dockerfile
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
```

---

### 🚀 Runner Stage

The **Runner Stage** contains only the files required to run the application.

```dockerfile
FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html
```

This significantly reduces the final image size.

---

### 📦 Complete Multi-Stage Dockerfile Example

```dockerfile
# Builder Stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Runner Stage
FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

---

### 💾 Docker Volumes

Docker Volumes provide **persistent storage** for containers.

Without volumes:

```
Container Deleted

↓

All Data Lost
```

With volumes:

```
Container Deleted

↓

Volume Remains

↓

Data Preserved
```

---

### Why Use Docker Volumes?

- Persistent Data
- Database Storage
- Data Backup
- Share Data Between Containers
- Better Performance

---

### Create a Volume

```bash
docker volume create my-volume
```

View Volumes

```bash
docker volume ls
```

Inspect Volume

```bash
docker volume inspect my-volume
```

Remove Volume

```bash
docker volume rm my-volume
```

---

### Mount a Volume

```bash
docker run -d \
-v my-volume:/app/data \
nginx
```

---

### Using Volumes with Databases

#### PostgreSQL

```bash
docker run -d \
--name postgres-db \
-v postgres-data:/var/lib/postgresql/data \
postgres
```

---

#### MySQL

```bash
docker run -d \
--name mysql-db \
-v mysql-data:/var/lib/mysql \
mysql
```

---

#### MongoDB

```bash
docker run -d \
--name mongo-db \
-v mongo-data:/data/db \
mongo
```

Volumes ensure database data is retained even if the container is removed.

---

### 🌐 Docker Networking

Docker Networks allow containers to communicate securely with each other and external systems.

---

### Types of Docker Networks

#### 1️⃣ Bridge Network (Default)

Default network for standalone containers.

```bash
docker network ls
```

---

#### 2️⃣ User-defined Bridge

A custom bridge network that provides automatic DNS resolution between containers.

Create:

```bash
docker network create my-network
```

Run container:

```bash
docker run --network my-network nginx
```

---

#### 3️⃣ Host Network

The container shares the host machine's network stack.

```bash
docker run --network host nginx
```

Best for high-performance networking.

---

#### 4️⃣ None Network

The container has no network connectivity.

```bash
docker run --network none nginx
```

Useful for isolated workloads.

---

#### 5️⃣ Overlay Network

Used in **Docker Swarm** to connect containers running on different Docker hosts.

Supports multi-host communication.

---

#### 6️⃣ Macvlan Network

Assigns a unique MAC address to each container.

Containers appear as physical devices on the network.

Best for:

- Legacy Applications
- Network Appliances

---

#### 7️⃣ IPvlan Network

Similar to Macvlan but shares the parent MAC address while assigning unique IP addresses.

Benefits:

- Better scalability
- Lower network overhead

---

### 🐝 Docker Swarm

Docker Swarm is Docker's native container orchestration platform.

It allows multiple Docker hosts to work together as a cluster.

##### Features

- High Availability
- Load Balancing
- Service Scaling
- Rolling Updates
- Fault Tolerance

Initialize Swarm:

```bash
docker swarm init
```

View Nodes:

```bash
docker node ls
```

Create a Service:

```bash
docker service create --name web nginx
```

List Services:

```bash
docker service ls
```

Scale Service:

```bash
docker service scale web=3
```

---

### 🎯 Key Takeaways

- Learned how Multi-Stage Dockerfiles create optimized production images.
- Understood the roles of Builder Stage and Runner Stage.
- Learned how Docker Volumes provide persistent storage.
- Practiced mounting volumes for PostgreSQL, MySQL, and MongoDB containers.
- Explored the seven Docker network drivers and their use cases.
- Got introduced to Docker Swarm for container orchestration and clustering.

---

### 📈 Progress

- ✅ Day 19 – Advanced Docker: Multi-Stage Builds, Volumes & Networking

**Completed:** 19 / 90 Days 🚀

---

> **"Containers make applications portable, but mastering storage, networking, and orchestration makes them production-ready."** 🐳🚀


---

[← Day 18](../day-18/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 20 →](../day-20/README.md)
