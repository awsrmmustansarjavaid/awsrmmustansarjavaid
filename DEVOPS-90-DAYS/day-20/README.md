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

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

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


---

[← Day 19](../day-19/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 21 →](../day-21/README.md)
