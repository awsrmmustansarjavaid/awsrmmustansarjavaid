# Day 17 — Bash Project: Log Analyzer & Report Generator

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 18 →](../day-18/README.md)

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

- [ ] Build a real log-analysis tool
- [ ] Combine awk, sort, uniq, date, mail/Slack webhook
- [ ] Write tests and README for a script

## 2. Prerequisites

- Days 3, 15, 16.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Requirements-driven scripting

Start from the report you need: top errors, top IPs, error rate per hour, slowest endpoints. Design inputs, outputs and failure behaviour first.

### 3.2 Reports

Generate Markdown/CSV; optionally post to Slack via webhook using `curl`.

### 3.3 Testing scripts

Use sample fixtures and `bats-core` or simple assertion functions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a fixture log with 1,000 lines containing 200/404/500 codes.
2. [ ] Write `analyze.sh <logfile>` producing a Markdown report with counts, top IPs, 5xx rate and hourly histogram.
3. [ ] Add `--since` and `--output` flags.
4. [ ] Add 3 bats tests (or assert functions).
5. [ ] Write README with usage and examples.

## 5. Real-World Scenario

> The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Deliver this script and schedule it with cron/systemd timer.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
awk '{print $9}' access.log | sort | uniq -c | sort -nr
awk '$9>=500{c++} END{printf "5xx rate: %.2f%%\n", c*100/NR}' access.log
awk '{split($4,t,":"); h[t[2]]++} END{for(k in h) print k, h[k]}' access.log | sort
curl -s -X POST -H 'Content-type: application/json' --data "{\"text\":\"$(cat report.md)\"}" "$SLACK_WEBHOOK_URL"
sudo apt install -y bats && bats tests/
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 17 – Shell Scripting: Loops, Arguments & Error Handling — Challenge Brief

#### Task
Level up your scripting — use loops, handle arguments, and deal with errors.

You will:
- Write **for** and **while** loops
- Use **command-line arguments** (`$1`, `$2`, `$#`, `$@`)
- Install packages via script
- Add basic **error handling**

---

#### Expected Output
- A markdown file: `day-17-scripting.md`
- All scripts you write during the tasks

---

#### Challenge Tasks

##### Task 1: For Loop
1. Create `for_loop.sh` that:
   - Loops through a list of 5 fruits and prints each one
2. Create `count.sh` that:
   - Prints numbers 1 to 10 using a for loop

---

##### Task 2: While Loop
1. Create `countdown.sh` that:
   - Takes a number from the user
   - Counts down to 0 using a while loop
   - Prints "Done!" at the end

---

##### Task 3: Command-Line Arguments
1. Create `greet.sh` that:
   - Accepts a name as `$1`
   - Prints `Hello, <name>!`
   - If no argument is passed, prints "Usage: ./greet.sh <name>"

2. Create `args_demo.sh` that:
   - Prints total number of arguments (`$#`)
   - Prints all arguments (`$@`)
   - Prints the script name (`$0`)

---

##### Task 4: Install Packages via Script
1. Create `install_packages.sh` that:
   - Defines a list of packages: `nginx`, `curl`, `wget`
   - Loops through the list
   - Checks if each package is installed (use `dpkg -s` or `rpm -q`)
   - Installs it if missing, skips if already present
   - Prints status for each package

> Run as root: `sudo -i` or `sudo su`

---

##### Task 5: Error Handling
1. Create `safe_script.sh` that:
   - Uses `set -e` at the top (exit on error)
   - Tries to create a directory `/tmp/devops-test`
   - Tries to navigate into it
   - Creates a file inside
   - Uses `||` operator to print an error if any step fails

Example:
```bash
mkdir /tmp/devops-test || echo "Directory already exists"
```

2. Modify your `install_packages.sh` to check if the script is being run as root — exit with a message if not.

---

#### Hints
- For loop: `for item in list; do ... done`
- While loop: `while [ condition ]; do ... done`
- Arguments: `$1` first arg, `$#` count, `$@` all args
- Check root: `if [ "$EUID" -ne 0 ]; then echo "Run as root"; exit 1; fi`
- Check package: `dpkg -s <pkg> &> /dev/null && echo "installed"`

---

#### Documentation

Create `day-17-scripting.md` with:
- Each script's code and output
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-17-scripting.md` to `2026/day-17/`
2. Commit and push to your fork

---

#### Learn in Public

Share your scripting progress on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 17 – Shell Scripting: Loops, Arguments & Error Handling — Notes & Solution

#### 🎯 Objective

Today I practiced Bash scripting concepts that are commonly used in DevOps automation.

##### Topics Covered

- `for` loops
- `while` loops
- Command-line arguments
- User input
- Package installation
- Root user validation
- Error handling
- Bash arrays

---

##### Task 1: For Loop
1. Create `for_loop.sh` that:
   - Loops through a list of 5 fruits and prints each one
2. Create `count.sh` that:
   - Prints numbers 1 to 10 using a for loop

#### Loops through a list of 5 fruits and prints each one

<img width="967" height="287" alt="Screenshot 2026-08-09 184214" src="https://github.com/user-attachments/assets/7d780be2-0921-4454-bb8f-3d76d961d68c" />
<img width="1919" height="349" alt="Screenshot 2026-08-09 184006" src="https://github.com/user-attachments/assets/b4c54323-ec89-425b-8b7d-57900e6d6bee" />


#### Prints numbers 1 to 10 using a for loop

<img width="945" height="428" alt="Screenshot 2026-08-09 190053" src="https://github.com/user-attachments/assets/df57063a-b9d3-4415-9077-8a66160fe0fe" />
<img width="492" height="271" alt="Screenshot 2026-08-09 185815" src="https://github.com/user-attachments/assets/ee54f2e0-7e3e-4ed9-b8e9-038bab7b61f8" />


---

##### Task 2: While Loop
1. Create `countdown.sh` that:
   - Takes a number from the user
   - Counts down to 0 using a while loop
   - Prints "Done!" at the end
     
<img width="787" height="556" alt="Screenshot 2026-08-09 190702" src="https://github.com/user-attachments/assets/09b0c6bc-f34c-4d20-9e15-753ddd4de0f3" />
<img width="649" height="359" alt="Screenshot 2026-08-09 190445" src="https://github.com/user-attachments/assets/01019700-5adc-4b22-bf31-7de208e0de22" />


---

##### Task 3: Command-Line Arguments
1. Create `greet.sh` that:
   - Accepts a name as `$1`
   - Prints `Hello, <name>!`
   - If no argument is passed, prints "Usage: ./greet.sh <name>"

<img width="763" height="167" alt="Screenshot 2026-08-09 191300" src="https://github.com/user-attachments/assets/0a426349-30dc-40fc-882d-6a15cf0ae3e3" />
<img width="667" height="245" alt="Screenshot 2026-08-09 191211" src="https://github.com/user-attachments/assets/6f1063e6-651b-4a4b-bd38-af4271b218c9" />


2. Create `args_demo.sh` that:
   - Prints total number of arguments (`$#`)
   - Prints all arguments (`$@`)
   - Prints the script name (`$0`)
     
<img width="833" height="226" alt="Screenshot 2026-08-09 191559" src="https://github.com/user-attachments/assets/a5564676-1c77-43ba-a671-c95b4eea4377" />
<img width="539" height="168" alt="Screenshot 2026-08-09 191517" src="https://github.com/user-attachments/assets/3c5d8b90-5a54-482a-861d-1f42b9242154" />


---

##### Task 4: Install Packages via Script
1. Create `install_packages.sh` that:
   - Defines a list of packages: `nginx`, `curl`, `wget`
   - Loops through the list
   - Checks if each package is installed (use `dpkg -s` or `rpm -q`)
   - Installs it if missing, skips if already present
   - Prints status for each package

> Run as root: `sudo -i` or `sudo su`

<img width="932" height="246" alt="Screenshot 2026-08-09 192424" src="https://github.com/user-attachments/assets/58e6dbeb-9609-4a8b-8e6a-c612529e84a2" />
<img width="762" height="368" alt="Screenshot 2026-08-09 192324" src="https://github.com/user-attachments/assets/47e238ad-2a7a-46d9-949c-33b8fbe129b8" />

---
##### Task 5: Error Handling
1. Create `safe_script.sh` that:
   - Uses `set -e` at the top (exit on error)
   - Tries to create a directory `/tmp/devops-test`
   - Tries to navigate into it
   - Creates a file inside
   - Uses `||` operator to print an error if any step fails

Example:
```bash
mkdir /tmp/devops-test || echo "Directory already exists"
```

2. Modify your `install_packages.sh` to check if the script is being run as root — exit with a message if not.
   
<img width="1304" height="424" alt="Screenshot 2026-08-09 201111" src="https://github.com/user-attachments/assets/48a7a7e1-ea0c-41a8-a2de-eeb84e40c75d" />
<img width="876" height="378" alt="Screenshot 2026-08-09 201121" src="https://github.com/user-attachments/assets/aefe30fa-f6a7-4e6c-8c83-87692150ae19" />


---
#### What I Learned

* Used for loops to iterate over lists and number ranges
* Used while loops for countdown logic with user input
* Handled command-line arguments using $1, $#, $@, $0
* Added usage messages for missing arguments
* Took user input using read
* Automated package installation (nginx, curl, wget)
* Checked package status using dpkg -s
* Added root user validation using $EUID
* Implemented error handling with set -e and || (Or)
* Created safe scripts to avoid failures and overwrites
* Issue Faced & Lesson Learned: Used commas in a Bash array, causing the loop to fail, Learned that Bash arrays must be space-separated, not comma-separated

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `--format csv|md` option. | You can demonstrate, without notes: *build a real log-analysis tool* — with evidence committed to `day-17/`. |
| 2 | Create a systemd timer that runs the report daily at 07:00. | You can demonstrate, without notes: *combine awk, sort, uniq, date, mail/Slack webhook* — with evidence committed to `day-17/`. |
| 3 | Document limitations and next steps. | You can demonstrate, without notes: *write tests and README for a script* — with evidence committed to `day-17/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| awk field numbers wrong | Log format differs; print `$0` and count fields; use `-F` to set delimiter. |
| Webhook fails | Check env var, JSON escaping, and network egress. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never hard-code webhook URLs or tokens. Read from environment or secret files with 600 permissions.
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

1. How do you compute error rate with awk?
2. Why avoid hard-coded secrets?
3. How would you test a Bash script?
4. How would you scale this to millions of lines?
5. **Scenario:** The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a report from raw logs? | ☐ | ☐ | ☐ | ☐ |
| Can I schedule the script? | ☐ | ☐ | ☐ | ☐ |
| Do I have tests and README? | ☐ | ☐ | ☐ | ☐ |
| Build a real log-analysis tool | ☐ | ☐ | ☐ | ☐ |
| Combine awk, sort, uniq, date, mail/Slack webhook | ☐ | ☐ | ☐ | ☐ |
| Write tests and README for a script | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-17/` in your own repository:

```text
day-17/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-17
git add day-17/
git commit -m "day-17: bash project"
git push -u origin day-17
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

## 18. Personal Learning Journal — 🐳 Day 17 - Docker Fundamentals & AWS NoSQL Database

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

31 July 2026

---

### 🚀 Introduction

Today, I started learning **Docker**, one of the most important tools in the DevOps ecosystem. I learned why Docker was created, how it works internally, the difference between virtualization and containerization, Docker architecture, Docker images, containers, Dockerfile, Docker Hub, and essential Docker commands.

On the AWS side, I explored **NoSQL databases** and learned how to create a managed non-relational database.

---

### 📚 Topics Covered

#### 🐳 Docker Fundamentals
- What is Docker?
- Why Docker?
- How Docker Works
- Virtualization
- Containerization
- Virtualization vs Containerization
- Docker Architecture
- Docker Client
- Docker Daemon
- containerd
- Docker Registry
- Docker Hub
- Dockerfile
- Docker Image
- Docker Container
- Installing Docker Desktop
- Installing Docker on AWS EC2
- Essential Docker Commands

#### ☁️ AWS
- Non-Relational Database
- Amazon DynamoDB Basics

---

### 🐳 What is Docker?

Docker is an **open-source containerization platform** that allows developers to package an application along with all its dependencies into lightweight, portable containers.

This ensures the application runs consistently across different environments.

---

### ❓ Why Docker?

Before Docker:

- "It works on my machine" problems
- Dependency conflicts
- Difficult deployments
- Environment inconsistencies

Docker solves these issues by packaging everything required for an application into a single container.

##### Benefits

- Lightweight
- Fast deployment
- Portability
- Consistent environments
- Easy scaling
- Better resource utilization

---

### ⚙️ How Docker Works

Docker uses the host operating system's kernel to run isolated containers.

Unlike virtual machines, Docker does not require a separate operating system for every application.

```text
Application
      │
Docker Container
      │
Docker Engine
      │
Host Operating System
      │
Hardware
```

---

### 🖥️ Virtualization

Virtualization creates **multiple virtual machines (VMs)** on a single physical server.

Each VM contains:

- Guest OS
- Libraries
- Dependencies
- Application

Example:

```text
Hardware
     │
Hypervisor
     │
 ├── VM 1
 ├── VM 2
 └── VM 3
```

##### Advantages

- Strong isolation
- Multiple operating systems

##### Disadvantages

- Heavy
- Slow startup
- High resource usage

---

### 📦 Containerization

Containerization packages applications with their dependencies while sharing the host operating system kernel.

Example:

```text
Hardware
     │
Host OS
     │
Docker Engine
     │
 ├── Container 1
 ├── Container 2
 └── Container 3
```

##### Advantages

- Lightweight
- Fast startup
- Efficient resource usage
- Portable

---

### ⚖️ Virtualization vs Containerization

| Virtualization | Containerization |
|---------------|------------------|
| Uses Hypervisor | Uses Docker Engine |
| Each VM has its own OS | Containers share Host OS |
| Heavyweight | Lightweight |
| Slower | Faster |
| More resource consumption | Less resource consumption |

---

### 🏗️ Docker Architecture

Docker consists of several components:

##### Docker Client

The command-line interface where users execute Docker commands.

Example:

```bash
docker run nginx
```

---

##### Docker Daemon (`dockerd`)

The background service responsible for:

- Building Images
- Running Containers
- Managing Networks
- Managing Volumes

---

##### containerd

A container runtime responsible for managing the lifecycle of containers.

Responsibilities:

- Pull Images
- Start Containers
- Stop Containers
- Delete Containers

---

##### Docker Registry

A storage service for Docker images.

Examples:

- Docker Hub
- Amazon ECR
- GitHub Container Registry

---

### 🐙 Docker Hub

Docker Hub is the default public registry used to store and share Docker images.

Examples:

```bash
docker pull nginx
```

```bash
docker pull ubuntu
```

---

### 📄 Dockerfile

A Dockerfile is a text file containing instructions for building a Docker image.

Example:

```dockerfile
FROM ubuntu:22.04

RUN apt update

RUN apt install nginx -y

CMD ["nginx","-g","daemon off;"]
```

---

### 🖼️ Docker Image

A Docker Image is a read-only blueprint used to create Docker containers.

Build an image:

```bash
docker build -t myapp .
```

---

### 📦 Docker Container

A container is a running instance of a Docker image.

```text
Dockerfile
      │
docker build
      ▼
Docker Image
      │
docker run
      ▼
Docker Container
```

---

### 💻 Install Docker Desktop

1. Download Docker Desktop
2. Install the application
3. Start Docker Desktop
4. Verify installation

```bash
docker --version
```

---

### ☁️ Install Docker on Ubuntu EC2

Update packages

```bash
sudo apt update
```

Install Docker

```bash
sudo apt install docker.io -y
```

Start Docker

```bash
sudo systemctl start docker
```

Enable Docker

```bash
sudo systemctl enable docker
```

Verify

```bash
docker --version
```

---

### 🐳 Essential Docker Commands

##### Check Docker Version

```bash
docker --version
```

---

##### Docker Service Status

```bash
sudo systemctl status docker
```

---

##### Search Image

```bash
docker search nginx
```

---

##### Download Image

```bash
docker pull nginx
```

---

##### List Images

```bash
docker images
```

---

##### Run Container

```bash
docker run nginx
```

Interactive Mode

```bash
docker run -it ubuntu
```

Detached Mode

```bash
docker run -d nginx
```

Port Mapping

```bash
docker run -p 8080:80 nginx
```

Environment Variable

```bash
docker run -e APP_ENV=production nginx
```

TTY Allocation

```bash
docker run -t ubuntu
```

---

##### Running Containers

```bash
docker ps
```

All Containers

```bash
docker ps -a
```

---

##### Execute Commands

```bash
docker exec -it container_id bash
```

---

##### Stop Container

```bash
docker stop container_id
```

---

##### Kill Container

```bash
docker kill container_id
```

---

##### Remove Container

```bash
docker rm container_id
```

---

##### Remove Image

```bash
docker rmi image_name
```

---

### ☁️ AWS NoSQL Database

Today I also explored **Amazon DynamoDB**, AWS's fully managed NoSQL database service.

##### What is DynamoDB?

Amazon DynamoDB is a serverless NoSQL database designed for high performance and scalability.

##### Features

- Fully Managed
- Serverless
- High Availability
- Automatic Scaling
- Low Latency

---

### Relational vs Non-Relational Database

| Relational Database | NoSQL Database |
|---------------------|----------------|
| Tables | Key-Value / Document |
| Fixed Schema | Flexible Schema |
| SQL | NoSQL |
| Example: MySQL | Example: DynamoDB |

---

### Steps to Create a DynamoDB Table

1. Login to AWS Console
2. Open **DynamoDB**
3. Click **Create Table**
4. Enter Table Name
5. Define Partition Key
6. Configure Capacity Mode
7. Create Table

---

### 🎯 Key Takeaways

- Learned Docker fundamentals and containerization.
- Understood the difference between virtualization and containers.
- Explored Docker architecture (Client, Daemon, containerd, Registry).
- Learned how Dockerfiles build images that run as containers.
- Practiced essential Docker commands.
- Installed Docker on an Ubuntu EC2 instance.
- Learned about Docker Hub and public image repositories.
- Explored Amazon DynamoDB as a managed NoSQL database service.

---

### 📈 Progress

- ✅ Day 17 – Docker Fundamentals & AWS NoSQL Database

**Completed:** 17 / 90 Days 🚀

---

> **"Containers package applications, but understanding how they work is what transforms a developer into a DevOps engineer."** 🐳🚀

## 19. Challenge Notes — Day 17: Setting Alarms, Dashboards, and Metrics

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

#### 🎯 Objective

Deep dive into CloudWatch Alarms, Dashboards, and Custom Metrics. Learn to:

* Set CloudWatch alarms to monitor AWS resources
* Create visual dashboards to observe trends
* Push custom business/application metrics


[![](https://img.youtube.com/vi/PMMAyPLXdGc/0.jpg)](https://www.youtube.com/watch?v=PMMAyPLXdGc)

[Watch the video](https://www.youtube.com/watch?v=PMMAyPLXdGc)

---

#### 🧠 Key Concepts

| Feature                               | Description                                                             |
| ------------------------------------- | ----------------------------------------------------------------------- |
| **Alarms**                            | Trigger actions (e.g., email, Lambda) based on metric thresholds        |
| **Dashboards**                        | Visual panels to monitor metrics across services                        |
| **Custom Metrics**                    | Push your own data points for business/app tracking (e.g., login count) |
| **SNS (Simple Notification Service)** | Used to notify users when alarms are triggered                          |

---

#### 💡 Use Cases

* **User logins per hour** – Track app usage
* **Queue length (SQS, Redis)** – Monitor message build-up
* **Order volume** – Business KPI visualization

---

#### 🧪 Labs Overview

You will perform multiple hands-on labs to solidify understanding.

---

#### ✅ Lab 1: Create a CloudWatch Alarm for EC2 CPU Usage

##### Steps:

1. Launch EC2 instance
2. Navigate: **CloudWatch > Alarms > Create Alarm**
3. Metric: `EC2 → Per-Instance Metrics → CPUUtilization`
4. Set condition: CPU > 70% for 5 minutes
5. Create SNS topic and confirm email subscription
6. Launch stress test on EC2:

```bash
sudo apt install stress -y
stress --cpu 1 --timeout 300
```

7. Watch alarm status in CloudWatch

---

#### ✅ Lab 2: Push a Custom Metric – Track User Logins

```bash
aws cloudwatch put-metric-data \
  --namespace "MyApp/Metrics" \
  --metric-name "UserLogins" \
  --value 1 \
  --unit Count
```

➡️ Run multiple times to simulate logins

---

#### ✅ Lab 3: Monitor Application Queue Length

```bash
aws cloudwatch put-metric-data \
  --namespace "MyApp/Queues" \
  --metric-name "JobQueueLength" \
  --value 50 \
  --unit Count
```

➡️ Simulate varying queue values using a loop

---

#### ✅ Lab 4: Create a CloudWatch Dashboard

1. Go to **CloudWatch > Dashboards**
2. Name dashboard: `MyApp-Monitoring`
3. Add widgets:

   * Line graph: `UserLogins`
   * Gauge: `JobQueueLength`
   * Number: `OrdersPlaced`

---

#### ✅ Lab 5: Push Business Metric – Orders Placed

```bash
aws cloudwatch put-metric-data \
  --namespace "MyApp/Business" \
  --metric-name "OrdersPlaced" \
  --value 12 \
  --unit Count
```

➡️ Add more data points later to simulate activity

---

#### ✅ Lab 6: Create Alarm for Custom Metric – Queue Length

1. Go to **CloudWatch > Alarms > Create**
2. Choose `MyApp/Queues` → `JobQueueLength`
3. Condition: > 50
4. Action: SNS topic
5. Test:

```bash
aws cloudwatch put-metric-data \
  --namespace "MyApp/Queues" \
  --metric-name "JobQueueLength" \
  --value 60 \
  --unit Count
```

---

#### ✅ Lab 7: Clean Up Resources

```bash
aws cloudwatch delete-dashboards --dashboard-names MyApp-Monitoring
```

Delete any unnecessary alarms or SNS topics from console

#### 📘 Homework

1. Create a dashboard for your own project idea.
2. Push three different custom metrics with meaningful names.
3. Create an alarm that notifies on a specific threshold for one of them.

### Attachments

- [Day 17 - Setting Alarms, Dashboards, and Metrics.pdf](Day%2017%20-%20Setting%20Alarms%2C%20Dashboards%2C%20and%20Metrics.pdf)

## 20. Cohort Practice — Day 17: Shell Scripting: Loops, Arguments & Error Handling

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Level up your scripting — use loops, handle arguments, and deal with errors.

You will:
- Write **for** and **while** loops
- Use **command-line arguments** (`$1`, `$2`, `$#`, `$@`)
- Install packages via script
- Add basic **error handling**

---

#### Expected Output
- A markdown file: `day-17-scripting.md`
- All scripts you write during the tasks

---



#### Challenge Tasks

##### Task 1: For Loop
1. Create `for_loop.sh` that:
   - Loops through a list of 5 fruits and prints each one
2. Create `count.sh` that:
   - Prints numbers 1 to 10 using a for loop

---

##### Task 2: While Loop
1. Create `countdown.sh` that:
   - Takes a number from the user
   - Counts down to 0 using a while loop
   - Prints "Done!" at the end

---

##### Task 3: Command-Line Arguments
1. Create `greet.sh` that:
   - Accepts a name as `$1`
   - Prints `Hello, <name>!`
   - If no argument is passed, prints "Usage: ./greet.sh <name>"

2. Create `args_demo.sh` that:
   - Prints total number of arguments (`$#`)
   - Prints all arguments (`$@`)
   - Prints the script name (`$0`)

---

##### Task 4: Install Packages via Script
1. Create `install_packages.sh` that:
   - Defines a list of packages: `nginx`, `curl`, `wget`
   - Loops through the list
   - Checks if each package is installed (use `dpkg -s` or `rpm -q`)
   - Installs it if missing, skips if already present
   - Prints status for each package

> Run as root: `sudo -i` or `sudo su`

---

##### Task 5: Error Handling
1. Create `safe_script.sh` that:
   - Uses `set -e` at the top (exit on error)
   - Tries to create a directory `/tmp/devops-test`
   - Tries to navigate into it
   - Creates a file inside
   - Uses `||` operator to print an error if any step fails

Example:
```bash
mkdir /tmp/devops-test || echo "Directory already exists"
```

2. Modify your `install_packages.sh` to check if the script is being run as root — exit with a message if not.

---

#### Hints
- For loop: `for item in list; do ... done`
- While loop: `while [ condition ]; do ... done`
- Arguments: `$1` first arg, `$#` count, `$@` all args
- Check root: `if [ "$EUID" -ne 0 ]; then echo "Run as root"; exit 1; fi`
- Check package: `dpkg -s <pkg> &> /dev/null && echo "installed"`

---

#### Documentation

Create `day-17-scripting.md` with:
- Each script's code and output
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-17-scripting.md` to `2026/day-17/`
2. Commit and push to your fork

---

#### Learn in Public

Share your scripting progress on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-17-scripting

#!/bin/bash


fruits=("apple" "banana" "orange" "mango" "litchi")


for fruit in ${fruits[@]}
do
        echo "$fruit"
done



for num in {1..10}
do
        echo $num
done



#!/bin/bash


if [ $# -eq 0 ];
then
        echo "./greet.sh <name>"
else
        echo "Hello , $1"
fi



#!/bin/bash

num=0
read -p "Enter number: " number
while [ $num -le $number ]
do
        echo " number -" $num
        ((num++))
done



#!/bin/bash

set -e

### Create directory
mkdir /tmp/devops-test || echo "Directory already exists"

### Move into directory
cd /tmp/devops-test || {
    echo "Failed to enter directory"
    exit 1
}

### Create file
touch devops.txt || {
    echo "Failed to create file"
    exit 1
}

echo "File created successfully."


#!/bin/bash

### List of packages
packages=("nginx" "curl" "wget")

### Loop through packages
for package in "${packages[@]}"
do

    echo "Checking package: $package"

    # Check package installed or not
    if dpkg -s "$package" &>/dev/null
    then
        echo "$package is already installed."
    
    else
        echo "$package is NOT installed."
        echo "Installing $package..."

        sudo apt update -y
        sudo apt install -y "$package"

        # Verify installation
        if dpkg -s "$package" &>/dev/null
        then
            echo "$package installed successfully."
        else
            echo "Failed to install $package."
        fi
    fi

    echo "--------------------------------"

done

### Files

- [image.png](files/cohort-2026/image.png)

## 21. Hands-on Project — Day 17: EC2 + User Data + SSM (No SSH Keys)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Provision EC2 with Terraform**, bootstrap with **cloud-init user data**, and manage the instance using **AWS Systems Manager (SSM) Session Manager** — no inbound SSH required.

This module plugs into **Day 14** (VPC/Subnets/IGW/NAT) and **Day 16** (SGs). You will:
- Launch an EC2 instance in a chosen subnet (public *or* private).
- Attach an **IAM role** with `AmazonSSMManagedInstanceCore` for SSM.
- Use **user data** to install and run NGINX and push a demo page.
- (Optional) Route SSM traffic via **Interface Endpoints** from Day 15 for private subnets.

---

#### 🎯 Learning Goals
- Data-source the latest **Amazon Linux** AMI.
- Use `user_data` to install packages and write files at boot.
- Attach an **instance profile** with least-privilege policy.
- Use **SSM Session Manager** to access the instance without SSH keys.

---

#### 🛠️ Lab Setup & Tasks

```text
1) Initialize
   terraform -chdir=terraform init

2) Plan (replace with your values from Day 14/16)
   terraform -chdir=terraform plan      -var='vpc_id=vpc-012345'      -var='subnet_id=subnet-abc'      -var='security_group_ids=["sg-xyz"]'

3) Apply
   terraform -chdir=terraform apply -auto-approve      -var='vpc_id=vpc-012345'      -var='subnet_id=subnet-abc'      -var='security_group_ids=["sg-xyz"]'

4) Connect (no SSH needed)
   - Open AWS Console → Systems Manager → Session Manager → Start session → choose instance
   - Or CLI: aws ssm start-session --target <instance-id>

5) Verify user data
   - From the session: curl -s localhost | head -n3
   - Check systemd service status: sudo systemctl status nginx
```

**Notes**
- If you place the instance in a **private** subnet, ensure **Day 15 SSM interface endpoints** exist, or the instance needs a NAT path for SSM.
- Amazon Linux 2023 & 2 come with SSM agent by default (the module still handles the IAM role).

---

#### 💡 Challenge
- Add a **CloudWatch agent** to ship NGINX access logs (via extra user data).  
- Switch to a **Launch Template + Auto Scaling Group** pattern.  
- Parameterize **user data** from a local file and pass variables (e.g., app name, env).

---

#### ✅ Checklist
- [ ] Instance reachable via **SSM Session Manager**  
- [ ] NGINX is **running** and serving a custom index page  
- [ ] No inbound SSH required  
- [ ] (Optional) Private subnet + VPC interface endpoints for SSM

---

#### 📌 Commit
```bash
git add day17-ec2-userdata-ssm
git commit -m "day17: EC2 with user data + SSM Session Manager (no SSH)"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 18 →](../day-18/README.md)
