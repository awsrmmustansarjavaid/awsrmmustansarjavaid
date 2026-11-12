# Day 20 — Python: Cloud SDK Basics, CLI Tools & Testing

[← Day 19](../day-19/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 21 →](../day-21/README.md)

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

- [ ] Use boto3 safely against AWS (or LocalStack)
- [ ] Package a CLI tool with entry point
- [ ] Practice test-driven automation

## 2. Prerequisites

- Days 18-19; AWS account (Day 50 covers setup in depth) or LocalStack.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 SDK basics

boto3 clients vs resources, credentials chain (env -> profile -> role), regions, paginators, waiters. Use LocalStack or free-tier read-only calls for practice.

### 3.2 CLI packaging

`pyproject.toml` with `[project.scripts]`; use `typer` or `argparse`; semantic versioning.

### 3.3 Testing

pytest fixtures, `moto` to mock AWS, coverage reports.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install LocalStack (`pipx install localstack`) or use `moto`.
2. [ ] Write `s3tool.py` to list buckets and tag untagged ones.
3. [ ] Add unit tests with `moto`.
4. [ ] Package as `devops-toolkit` with `pyproject.toml` and install via `pip install -e .`.
5. [ ] Add `--dry-run` default for any mutating command.

## 5. Real-World Scenario

> FinOps asks you to find all resources with no `owner` or `env` tag. Build a safe, dry-run-first tool and test it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
pip install boto3 moto pytest typer
aws sts get-caller-identity       # who am I?
python - <<'EOP'
import boto3
s3 = boto3.client("s3")
for b in s3.list_buckets()["Buckets"]: print(b["Name"])
EOP
pytest --cov=devops_toolkit -q
pip install -e .
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 20 – Bash Scripting Challenge: Log Analyzer and Report Generator — Challenge Brief

#### Task

You are a system administrator responsible for managing a network of servers. Every day, a log file is generated on each server containing important system events and error messages. Your job is to analyze these log files, identify specific events, and generate a summary report.

Write a Bash script (`log_analyzer.sh`) that automates the process of analyzing log files and generating a daily summary report.

---

#### Expected Output
- A Bash script: `log_analyzer.sh`
- A generated summary report: `log_report_<date>.txt`
- A markdown file: `day-20-solution.md` documenting your approach

---

#### Challenge Tasks

##### Task 1: Input and Validation
Your script should:
1. Accept the path to a log file as a command-line argument
2. Exit with a clear error message if no argument is provided
3. Exit with a clear error message if the file doesn't exist

---

##### Task 2: Error Count
1. Count the total number of lines containing the keyword `ERROR` or `Failed`
2. Print the total error count to the console

---

##### Task 3: Critical Events
1. Search for lines containing the keyword `CRITICAL`
2. Print those lines along with their line number

Example output:
```
--- Critical Events ---
Line 84: 2025-07-29 10:15:23 CRITICAL Disk space below threshold
Line 217: 2025-07-29 14:32:01 CRITICAL Database connection lost
```

---

##### Task 4: Top Error Messages
1. Extract all lines containing `ERROR`
2. Identify the **top 5 most common** error messages
3. Display them with their occurrence count, sorted in descending order

Example output:
```
--- Top 5 Error Messages ---
45 Connection timed out
32 File not found
28 Permission denied
15 Disk I/O error
9  Out of memory
```

---

##### Task 5: Summary Report
Generate a summary report to a text file named `log_report_<date>.txt` (e.g., `log_report_2026-02-11.txt`). The report should include:
1. Date of analysis
2. Log file name
3. Total lines processed
4. Total error count
5. Top 5 error messages with their occurrence count
6. List of critical events with line numbers

---

##### Task 6 (Optional): Archive Processed Logs
Add a feature to:
1. Create an `archive/` directory if it doesn't exist
2. Move the processed log file into `archive/` after analysis
3. Print a confirmation message

---

#### Sample Log File

A sample log file is available in this directory: `sample_log.log`

You can also pick real-world log datasets from the [LogHub repository](https://github.com/logpai/loghub) to test your script against production-like logs (e.g., ZooKeeper, HDFS, Apache, Linux syslogs).

---

#### Hints
- Count errors: `grep -c "ERROR" logfile.log`
- Print with line numbers: `grep -n "CRITICAL" logfile.log`
- Top occurrences: `grep "ERROR" logfile.log | awk '{$1=$2=$3=""; print}' | sort | uniq -c | sort -rn | head -5`
- Associative arrays: `declare -A error_map`
- Date for filename: `date +%Y-%m-%d`
- Move files: `mv logfile.log archive/`

---

#### Documentation

Create `day-20-solution.md` with:
- Your script's code
- Sample output from running against the sample log
- What commands/tools you used (`grep`, `awk`, `sort`, `uniq`, etc.)
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-20-solution.md` to `2026/day-20/`
2. Commit and push to your fork

---

#### Learn in Public

Share your log analyzer project on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 20 – Bash Scripting Challenge: Log Analyzer and Report Generator — Notes & Solution

#### 🎯 Task

You are a system administrator responsible for managing a network of servers. Every day, a log file is generated on each server containing important system events and error messages. Your job is to analyze these log files, identify specific events, and generate a summary report.

Write a Bash script (`log_analyzer.sh`) that automates the process of analyzing log files and generating a daily summary report.

---

#### 📦 Expected Output

* 🐚 A Bash script: `log_analyzer.sh`
* 📄 A generated summary report: `log_report_<date>.txt`
* 📝 A markdown file: `day-20-solution.md` documenting your approach

---

#### 🧩 Challenge Tasks

##### 🔹 Task 1: Input and Validation

Your script should:

1. 📥 Accept the path to a log file as a command-line argument
2. ❌ Exit with a clear error message if no argument is provided
3. ⚠️ Exit with a clear error message if the file doesn't exist

##### 📤 Output

To accomplish Task 1, you'll need to use special variables like `$1` (the first argument) and "test" operators like `-f` (to check if a file exists).

##### 🧠 Key Concepts

| Component              | Logic                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `$#`                   | 🔢 A built-in variable that counts the number of arguments. If it's 0, the user forgot the input.                                              |
| `$0`                   | 📌 This refers to the name of the script itself, useful for showing the "Usage" message.                                                       |
| `[ ! -f "$LOG_FILE" ]` | 🔍 The `-f` flag specifically checks if the path points to a file (rather than a directory). The `!` means "if NOT a file."                    |
| `exit 1`               | 🚫 In Linux, an exit code of 0 means success, while any non-zero number indicates an error. This helps other programs know your script failed. |

<img width="670" height="196" alt="Screenshot 2026-08-11 134014" src="https://github.com/user-attachments/assets/d94291de-7d76-4ded-968a-97c681aaf3ed" />

---

##### 🔹 Task 2: Error Count

1. 🔎 Count the total number of lines containing the keyword `ERROR` or `Failed`
2. 🖥️ Print the total error count to the console

##### 📄 Create a New File

```bash
vim error_count.sh
```

##### 🧪 Create a Sample Log

Run this command in your terminal to create a dummy log file with some errors in it:

```bash
echo -e "INFO: System started\nERROR: Database connection failed\nDEBUG: Loading assets\nFailed: Authentication timeout\nINFO: User logged in" > sample.log
```

##### 📂 Real Log File

If your real log file is somewhere else (like `/var/log/syslog`), you need to provide the full path:

```bash
./error_count.sh /var/log/syslog
```

##### 🔍 Verify the File Exists

Before running your script again, you can double-check the file is there by typing:

```bash
ls -l sample.log
```

##### ✅ Final Test

Once you've created the file using the echo command above, run your script again:

```bash
./error_count.sh sample.log
```

<img width="1919" height="376" alt="Screenshot 2026-08-11 134313" src="https://github.com/user-attachments/assets/14206b88-6962-4b34-b8fb-68c22080817f" />

---

##### 🔹 Task 3: Critical Events

1. 🔎 Search for lines containing the keyword `CRITICAL`
2. 📌 Print those lines along with their line number

##### 📤 Example Output

```text
--- Critical Events ---
Line 84: 2025-07-29 10:15:23 CRITICAL Disk space below threshold
Line 217: 2025-07-29 14:32:01 CRITICAL Database connection lost
```

##### 📄 Create `critical.sh`

Add a critical event:

```bash
echo "CRITICAL: Power supply failure on line 4" >> sample.log
```

##### ▶️ Run the Script

```bash
./critical.sh sample.log
```

<img width="1329" height="274" alt="Screenshot 2026-08-11 134518" src="https://github.com/user-attachments/assets/adeb1bc5-090d-4694-b779-19e1fa5ecf6c" />

---

##### 🔹 Task 4: Top Error Messages

1. 🔎 Extract all lines containing `ERROR`
2. 📊 Identify the **top 5 most common** error messages
3. 📈 Display them with their occurrence count, sorted in descending order

<img width="746" height="183" alt="Screenshot 2026-08-11 134658" src="https://github.com/user-attachments/assets/9cc17294-db19-4af4-8c9b-19d8674bd1b9" />

---

##### 🔹 Task 5: Summary Report

Generate a summary report to a text file named `log_report_<date>.txt` (e.g., `log_report_2026-02-11.txt`).

The report should include:

1. 📅 Date of analysis
2. 📄 Log file name
3. 📊 Total lines processed
4. ❌ Total error count
5. 🔝 Top 5 error messages with their occurrence count
6. 🚨 List of critical events with line numbers
   
<img width="1333" height="511" alt="Screenshot 2026-08-11 134843" src="https://github.com/user-attachments/assets/27b536eb-a86c-4c43-8c25-64537bfde6a9" />

---

##### 🔹 Task 6 (Optional): Archive Processed Logs

Add a feature to:

1. 📁 Create an `archive/` directory if it doesn't exist
2. 📦 Move the processed log file into `archive/` after analysis
3. ✅ Print a confirmation message

---

<img width="1333" height="511" alt="Screenshot 2026-08-11 134843" src="https://github.com/user-attachments/assets/da0d8972-adfb-434b-a2cd-45c378fbf9f9" />

---

#### 📚 What I Learned

* 🧩 How to break a larger automation problem into smaller focused scripts (input validation, error counting, top errors, critical events) and then combine them into one complete solution.
* 🛠️ How to use core Linux tools (`grep`, `awk`, `sort`, `uniq`, `sed`, `wc`) together to extract meaningful insights from raw log data.
* 🛡️ The importance of defensive scripting — validating inputs and handling missing files before processing.
* 📄 How to generate structured summary reports with dynamic filenames using `date`.
* 📦 How to automate post-processing tasks like archiving analyzed logs to keep directories clean and organized.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `--region` and `--profile` options. | You can demonstrate, without notes: *use boto3 safely against AWS (or LocalStack)* — with evidence committed to `day-20/`. |
| 2 | Write a README with examples and screenshots. | You can demonstrate, without notes: *package a CLI tool with entry point* — with evidence committed to `day-20/`. |
| 3 | Add GitHub Actions workflow to run tests (preview of Day 36). | You can demonstrate, without notes: *practice test-driven automation* — with evidence committed to `day-20/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `NoCredentialsError` | Set `AWS_PROFILE` or environment variables; use SSO. |
| Tests hit real AWS | Use `moto` decorators/fixtures and fake env credentials. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never hard-code AWS keys. Prefer roles/SSO and temporary credentials. Default tools to read-only/dry-run.
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

1. What is the boto3 credentials chain?
2. Why dry-run default?
3. How do you test cloud code?
4. Why avoid long-lived access keys?
5. **Scenario:** FinOps asks you to find all resources with no `owner` or `env` tag. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I list AWS resources via Python? | ☐ | ☐ | ☐ | ☐ |
| Can I mock AWS? | ☐ | ☐ | ☐ | ☐ |
| Is my tool installable? | ☐ | ☐ | ☐ | ☐ |
| Use boto3 safely against AWS (or LocalStack) | ☐ | ☐ | ☐ | ☐ |
| Package a CLI tool with entry point | ☐ | ☐ | ☐ | ☐ |
| Practice test-driven automation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-20/` in your own repository:

```text
day-20/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-20
git add day-20/
git commit -m "day-20: python"
git push -u origin day-20
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

## 18. Personal Learning Journal — 🐳 Day 20 - 3-Tier Microservices with Docker

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

03 August 2026

---

### 🚀 Introduction

"Hands-on practice is where real learning happens. 🐳🚀"

Today, I worked on a 3-tier microservices application using Docker and focused on both deployment and security. A 3-tier architecture is a well-established software application architecture that organizes applications into three logical and physical computing tiers: the presentation tier (frontend), the application tier (backend), and the data tier (database).

Today's hands-on session gave me practical experience in containerizing applications and understanding how security fits into the container lifecycle.

---

### 📚 Topics Covered

#### 🐳 1. Dockerizing Frontend, Backend & Database Services

Containerizing a 3-tier application means taking each tier and packaging it into its own isolated environment (container). 
- **Frontend**: A React or Vanilla JS application served via a web server like Nginx.
- **Backend**: An API built in Node.js, Python, or Golang.
- **Database**: A database engine like PostgreSQL, MySQL, or MongoDB.

By splitting these services into separate containers, we ensure they can scale independently and are easier to manage and deploy.

#### 📄 2. Creating Dockerfiles for Each Service

To run our services in Docker, we need instructions. This is done via `Dockerfile`.

**Example: Backend Node.js Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**Example: Database (using official image)**
Instead of a Dockerfile, databases are often instantiated directly from the official images (e.g., `postgres:15-alpine`) using Docker network commands or Docker Compose.

#### 🖼️ 3. Building Docker Images & Running Containers

Once the `Dockerfile` is ready, the next step is building the image and running the container.

```bash
# Build the backend image
docker build -t my-backend:v1 .

# Run the container
docker run -d --name backend-server -p 3000:3000 my-backend:v1
```

#### 🌐 4. Connecting Containers Through a Docker Network

For the backend to talk to the database, and the frontend to talk to the backend, they need to be on the same network.

```bash
# Create a custom bridge network
docker network create my-app-network

# Run the database on the network
docker run -d --name db-server --network my-app-network -e POSTGRES_PASSWORD=secret postgres:15-alpine

# Run the backend on the network
docker run -d --name backend-server --network my-app-network -e DB_HOST=db-server my-backend:v1
```

#### 🔄 5. Container-to-Container Communication

Thanks to Docker's internal DNS resolution on custom bridge networks, containers can communicate with each other using their container names as hostnames. For example, the backend can reach the database at `postgres://user:secret@db-server:5432/db`.

#### 🔍 6. Scanning Images with Docker Scout

Security should not be an afterthought. Docker Scout analyzes image contents and generates a detailed report of packages and vulnerabilities.

```bash
# Analyze image for vulnerabilities
docker scout cves my-backend:v1
```

#### 🛡️ 7. Identifying and Reducing Image Vulnerabilities

Best practices for reducing vulnerabilities include:
1. **Use Minimal Base Images**: Prefer `alpine` or `distroless` images. They have fewer OS packages, resulting in a smaller attack surface.
2. **Keep Base Images Updated**: Frequently pull the latest base images to patch known vulnerabilities.
3. **Run as Non-Root**: Avoid running applications as the root user within the container.

---

### 🔗 LinkedIn Post

Hands-on practice is where real learning happens. 🐳🚀

Day 20 of #90DaysOfDevOps ✅

Today, I worked on a 3-tier microservices application using Docker and focused on both deployment and security.

📚 Topics Covered:

🐳 Dockerizing Frontend, Backend & Database services 
📄 Creating Dockerfiles for each service 
🖼️ Building Docker Images & Running Containers 
🌐 Connecting containers through a Docker Network 
🔄 Container-to-container communication 
🔍 Scanning images with Docker Scout 
🛡️ Identifying and reducing image vulnerabilities using Docker best practices 

Today's hands-on session gave me practical experience in containerizing applications and understanding how security fits into the container lifecycle.

#90DaysOfDevOps #Docker #DevOps #DockerScout #ContainerSecurity #Microservices #CloudComputing #LearningInPublic #TrainWithShubham

## 19. Challenge Notes — Day 20: Building and Running Docker Containers

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

#### Objective:
Understand how to create your own Docker images using Dockerfiles, build them, run containers, and manage images effectively.

[![](https://img.youtube.com/vi/97Hdg4V4EPA/0.jpg)](https://www.youtube.com/watch?v=97Hdg4V4EPA)

[Watch the video](https://www.youtube.com/watch?v=97Hdg4V4EPA)
---

#### What is a Dockerfile?

A `Dockerfile` is a script that contains a set of instructions to assemble a Docker image. It's the blueprint for your Docker image and defines what goes inside your container.

##### Common Dockerfile Instructions:

- `FROM`: Specifies the base image.
- `RUN`: Executes commands in the container during build.
- `COPY` or `ADD`: Copies files into the image.
- `WORKDIR`: Sets the working directory inside the container.
- `CMD`: Specifies the command to run when the container starts.
- `EXPOSE`: Documents the port the container listens on.

---

#### Docker Image & Container Commands

| Command | Description |
|--------|-------------|
| `docker build` | Builds a Docker image from a Dockerfile |
| `docker run` | Runs a Docker container from an image |
| `docker images` | Lists all local Docker images |
| `docker ps` | Lists running containers |
| `docker ps -a` | Lists all containers (including stopped) |
| `docker stop <container>` | Stops a running container |
| `docker rm <container>` | Removes a container |
| `docker rmi <image>` | Removes a Docker image |
| `docker tag` | Tags a Docker image |
| `docker push` | Pushes an image to Docker Hub |
| `docker pull` | Pulls an image from Docker Hub |
| `docker commit` | Creates an image from container changes |

---

#### Lab: Build and Run Your First Docker Container

##### Step 1: Create a Simple Python Flask App

```bash
mkdir docker-python-app
cd docker-python-app
````

**app.py**

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Docker!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

**requirements.txt**

```
flask
```

---

##### Step 2: Create a Dockerfile

```Dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
```

---

##### Step 3: Build Docker Image

```bash
docker build -t flask-docker-app .
```

---

##### Step 4: Run Docker Container

```bash
docker run -d -p 5000:5000 flask-docker-app
```

Visit: `http://localhost:5000` (or your EC2 public IP if deployed remotely)

---

#### Docker Hub Operations

##### Tag Your Image

```bash
docker tag flask-docker-app your_dockerhub_username/flask-docker-app:v1
```

##### Login to Docker Hub

```bash
docker login
```

##### Push Image to Docker Hub

```bash
docker push your_dockerhub_username/flask-docker-app:v1
```

##### Pull Image from Docker Hub

```bash
docker pull nginx
```

##### Commit Container to Image

```bash
docker ps
docker commit <container_id> custom-nginx:v1
```

---

##### Cleanup Commands

```bash
docker ps
docker stop <container_id>
docker rm <container_id>
docker rmi flask-docker-app
```

---

#### Summary

* You learned how to write a Dockerfile
* Built and ran a custom Docker container
* Tagged, pushed, pulled images with Docker Hub
* Used `docker commit` to save container changes

---

### Attachments

- [Day 20 Building and Running Docker Containers.pdf](Day%2020%20Building%20and%20Running%20Docker%20Containers.pdf)

## 20. Cohort Practice — Day 20: Bash Scripting Challenge: Log Analyzer and Report Generator

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

You are a system administrator responsible for managing a network of servers. Every day, a log file is generated on each server containing important system events and error messages. Your job is to analyze these log files, identify specific events, and generate a summary report.

Write a Bash script (`log_analyzer.sh`) that automates the process of analyzing log files and generating a daily summary report.

---

#### Expected Output
- A Bash script: `log_analyzer.sh`
- A generated summary report: `log_report_<date>.txt`
- A markdown file: `day-20-solution.md` documenting your approach

---

#### Challenge Tasks

##### Task 1: Input and Validation
Your script should:
1. Accept the path to a log file as a command-line argument
2. Exit with a clear error message if no argument is provided
3. Exit with a clear error message if the file doesn't exist

---

##### Task 2: Error Count
1. Count the total number of lines containing the keyword `ERROR` or `Failed`
2. Print the total error count to the console

---

##### Task 3: Critical Events
1. Search for lines containing the keyword `CRITICAL`
2. Print those lines along with their line number

Example output:
```
--- Critical Events ---
Line 84: 2025-07-29 10:15:23 CRITICAL Disk space below threshold
Line 217: 2025-07-29 14:32:01 CRITICAL Database connection lost
```

---

##### Task 4: Top Error Messages
1. Extract all lines containing `ERROR`
2. Identify the **top 5 most common** error messages
3. Display them with their occurrence count, sorted in descending order

Example output:
```
--- Top 5 Error Messages ---
45 Connection timed out
32 File not found
28 Permission denied
15 Disk I/O error
9  Out of memory
```

---

##### Task 5: Summary Report
Generate a summary report to a text file named `log_report_<date>.txt` (e.g., `log_report_2026-02-11.txt`). The report should include:
1. Date of analysis
2. Log file name
3. Total lines processed
4. Total error count
5. Top 5 error messages with their occurrence count
6. List of critical events with line numbers

---

##### Task 6 (Optional): Archive Processed Logs
Add a feature to:
1. Create an `archive/` directory if it doesn't exist
2. Move the processed log file into `archive/` after analysis
3. Print a confirmation message

---

#### Sample Log File

A sample log file is available in this directory: `sample_log.log`

You can also pick real-world log datasets from the [LogHub repository](https://github.com/logpai/loghub) to test your script against production-like logs (e.g., ZooKeeper, HDFS, Apache, Linux syslogs).

---

#### Hints
- Count errors: `grep -c "ERROR" logfile.log`
- Print with line numbers: `grep -n "CRITICAL" logfile.log`
- Top occurrences: `grep "ERROR" logfile.log | awk '{$1=$2=$3=""; print}' | sort | uniq -c | sort -rn | head -5`
- Associative arrays: `declare -A error_map`
- Date for filename: `date +%Y-%m-%d`
- Move files: `mv logfile.log archive/`

---

#### Documentation

Create `day-20-solution.md` with:
- Your script's code
- Sample output from running against the sample log
- What commands/tools you used (`grep`, `awk`, `sort`, `uniq`, etc.)
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-20-solution.md` to `2026/day-20/`
2. Commit and push to your fork

---

#### Learn in Public

Share your log analyzer project on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

### Files

- [sample_logs_generator.sh](files/cohort-2026/sample_logs_generator.sh)

## 21. Hands-on Project — Day 20: CloudWatch Alarms (ALB + Target Group + ASG) with SNS Notifications

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **CloudWatch alarms** for your **ALB**, **Target Group**, and **ASG**, wired to **SNS notifications** (email optional).  
We’ll alert on:
- **ALB 5xx errors** (ELB-generated 5xx)
- **ALB target response time** (latency)
- **Target Group unhealthy hosts**
- **ASG InService instances below threshold**

This module plugs into **Day 18 (ALB)** and **Day 19 (ASG)**.

---

#### 🎯 Learning Goals
- Use **AWS/ApplicationELB** & **AWS/AutoScaling** metrics with dimensions.  
- Configure **alarm thresholds**, **evaluation periods**, and **treat missing data** policy.  
- Send notifications via **SNS** (email) and/or forward to other **alarm actions** (e.g., Ops tools).

---

#### 🛠️ Lab Setup & Tasks

```text
1) Collect inputs from previous days
   - lb_arn_suffix           (Day 18 ALB → ARN suffix, looks like: app/<alb-name>/<id>)
   - tg_arn_suffix           (Day 18 TG  → ARN suffix, looks like: targetgroup/<tg-name>/<id>)
   - asg_name                (Day 19 ASG name)
   - (optional) alarm_email  (to subscribe an email to SNS)

2) Initialize & Plan
   terraform -chdir=terraform init
   terraform -chdir=terraform plan      -var='lb_arn_suffix=app/day18-alb/1234567890abcdef'      -var='tg_arn_suffix=targetgroup/day18-tg/abcdef1234567890'      -var='asg_name=day19-asg'      -var='alarm_email=you@example.com'

3) Apply (you'll receive an SNS confirmation email if provided)
   terraform -chdir=terraform apply -auto-approve ...

4) Test ideas
   - Stop one instance in the ASG → **Unhealthy/low InService** alarms may trigger.
   - Serve slow responses on targets → **Latency** alarm may trigger.
   - Force 5xx from app → **ALB 5xx** alarm may trigger.
```

---

#### 💡 Challenge
- Add alarms for **HTTPCode_Target_5XX_Count** and **RejectedConnectionCount**.  
- Enable **OK actions** to post recovery messages.  
- Wire alarms to a **chat webhook** via Lambda subscription.

---

#### ✅ Checklist
- [ ] SNS topic created and (optionally) **email subscription confirmed**  
- [ ] ALB 5xx + latency alarms **in ALARM when thresholds crossed**  
- [ ] Target Group unhealthy hosts alarm **fires appropriately**  
- [ ] ASG **InService count** alarm protects capacity

---

#### 📌 Commit
```bash
git add day20-cloudwatch-alarms
git commit -m "day20: CloudWatch alarms for ALB/TG/ASG + SNS notifications"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 19](../day-19/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 21 →](../day-21/README.md)
