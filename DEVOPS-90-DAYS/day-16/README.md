# Day 16 — Bash: Loops, Arguments, Functions & Error Handling

[← Day 15](../day-15/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 17 →](../day-17/README.md)

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

- [ ] Use loops, case, getopts and functions
- [ ] Add logging and trap cleanup
- [ ] Write reusable script libraries

## 2. Prerequisites

- Day 15.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Control flow

`for`, `while read`, `case`, arrays and associative arrays. Process files line by line with `while IFS= read -r`.

### 3.2 Functions and options

Functions return exit codes and print values; `getopts` parses flags; `local` limits scope.

### 3.3 Error handling

`trap 'cleanup' EXIT ERR`, retry loops with backoff, structured log function with timestamps and levels.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `backup.sh -s src -d dest -r days` with getopts.
2. [ ] Add `log()` function with INFO/WARN/ERROR levels.
3. [ ] Add retry function (3 attempts with sleep backoff).
4. [ ] Add `trap` to remove temp files on exit.
5. [ ] Run it with bad inputs and verify clear errors.

## 5. Real-World Scenario

> Nightly backup fails silently 3 days a week. Build a script that logs, retries, validates the archive, and returns non-zero for monitoring to catch.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
log(){ printf '%s [%s] %s\n' "$(date -Is)" "$1" "${*:2}"; }
retry(){ local n=0; until "$@"; do ((++n>=3)) && return 1; sleep $((2**n)); done; }
cleanup(){ rm -f "$tmp"; }
tmp=$(mktemp); trap cleanup EXIT
while getopts "s:d:r:" o; do case $o in s) src=$OPTARG;; d) dst=$OPTARG;; r) days=$OPTARG;; *) exit 2;; esac; done
retry tar -czf "$dst/backup-$(date +%F).tgz" "$src"
tar -tzf "$dst"/backup-*.tgz >/dev/null && log INFO "verified"
find "$dst" -name 'backup-*.tgz' -mtime +"${days:-7}" -delete
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 16 – Shell Scripting Basics — Challenge Brief

#### Task
Start your shell scripting journey — learn the fundamentals every script needs.

You will:
- Understand **shebang** (`#!/bin/bash`) and why it matters
- Work with **variables**, **echo**, and **read**
- Write basic **if-else** conditions

---

#### Expected Output
- A markdown file: `day-16-shell-scripting.md`
- All scripts you write during the tasks

---

#### Challenge Tasks

##### Task 1: Your First Script
1. Create a file `hello.sh`
2. Add the shebang line `#!/bin/bash` at the top
3. Print `Hello, DevOps!` using `echo`
4. Make it executable and run it

```bash
chmod +x hello.sh
./hello.sh
```

**Document:** What happens if you remove the shebang line?

---

##### Task 2: Variables
1. Create `variables.sh` with:
   - A variable for your `NAME`
   - A variable for your `ROLE` (e.g., "DevOps Engineer")
   - Print: `Hello, I am <NAME> and I am a <ROLE>`
2. Try using single quotes vs double quotes — what's the difference?

---

##### Task 3: User Input with read
1. Create `greet.sh` that:
   - Asks the user for their name using `read`
   - Asks for their favourite tool
   - Prints: `Hello <name>, your favourite tool is <tool>`

---

##### Task 4: If-Else Conditions
1. Create `check_number.sh` that:
   - Takes a number using `read`
   - Prints whether it is **positive**, **negative**, or **zero**

2. Create `file_check.sh` that:
   - Asks for a filename
   - Checks if the file **exists** using `-f`
   - Prints appropriate message

---

##### Task 5: Combine It All
Create `server_check.sh` that:
1. Stores a service name in a variable (e.g., `nginx`, `sshd`)
2. Asks the user: "Do you want to check the status? (y/n)"
3. If `y` — runs `systemctl status <service>` and prints whether it's **active** or **not**
4. If `n` — prints "Skipped."

---

#### Hints
- Shebang: `#!/bin/bash` tells the system which interpreter to use
- Variables: `NAME="Shubham"` (no spaces around `=`)
- Read: `read -p "Enter name: " NAME`
- If syntax: `if [ condition ]; then ... elif ... else ... fi`
- File check: `if [ -f filename ]; then`

---

#### Documentation

Create `day-16-shell-scripting.md` with:
- Each script's code and output
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-16-shell-scripting.md` to `2026/day-16/`
2. Commit and push to your fork

---

#### Learn in Public

Share your first shell scripts on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐚 Day 16 – Shell Scripting Basics — Notes & Solution

#### 90 Days of DevOps – Day 16

##### 🎯 Objective

Today I started my journey with Shell Scripting and learned the basic building blocks required to automate tasks in Linux.

##### I practiced:

- Understanding the Shebang (#!/bin/bash)
- Creating and executing Bash scripts
- Using variables
- Printing output using echo
- Taking user input using read
- Using if, elif, and else
- Performing numeric comparisons
- Checking whether a file exists
- Checking Linux service status using systemctl
- Redirecting command output

Shell scripting is an important DevOps skill because it helps automate repetitive Linux administration and operational tasks.

##### 📚 What is Shell Scripting?

A shell script is a text file containing a sequence of commands that are executed by a shell.

Instead of manually running multiple commands:

```bash
mkdir backup
cp file.txt backup/
ls -l backup/
```

We can put them into a script:
```bash
#!/bin/bash

mkdir backup
cp file.txt backup/
ls -l backup/
```

Then execute the script:

```bash
chmod 755 backup.sh
./backup.sh
```

##### Why Shell Scripting is useful in DevOps

* Shell scripts are commonly used for:

- Server administration
- Application deployment
- Log management
- Backup automation
- Service monitoring
- File operations
- System health checks
- CI/CD automation
- Infrastructure troubleshooting

---

#### Challenge Tasks

##### 🧩 Task 1: Your First Script
1. Create a file `hello.sh`
2. Add the shebang line `#!/bin/bash` at the top
3. Print `Hello, DevOps!` using `echo`
4. Make it executable and run it

```bash
chmod 755 hello.sh
./hello.sh
```

<img width="749" height="233" alt="Screenshot 2026-08-08 112913" src="https://github.com/user-attachments/assets/55b51426-b3c5-4abe-9228-18f50036cd1e" />


**Document:** What happens if you remove the shebang line?

* What happens if you remove the shebang line?
 - The script runs after removing shebang line :
    - `./hello.sh` - The kernel checks for a shebang to identify the interpreter ("Shebang" tells the comuter to use Bash to read the script and "Echo" command tells it to print the text. If no shebang is found, the script is executed using the current shell.
    - `bash hello.sh` - The script is explicitly executed by the Bash shell,independent of the presence of a shebang.
    - `sh hello.sh` - The script is executed using the `sh shell`,which may differ in behavior from bash
---

##### 🧩 Task 2: Variables
1. Create `variables.sh` with:
   - A variable for your `NAME`
   - A variable for your `ROLE` (e.g., "DevOps Engineer")
   - Print: `Hello, I am <NAME> and I am a <ROLE>`
2. Try using single quotes vs double quotes — what's the difference?
* Using double quote `" "` - Allow **variable expansion**
* Using single quote `' '` - Treat every character exactly as written
  
<img width="873" height="186" alt="Screenshot 2026-08-08 114611" src="https://github.com/user-attachments/assets/a69caa03-ce22-4550-a054-9bd6c80f1ba1" />
<img width="647" height="276" alt="Screenshot 2026-08-08 114519" src="https://github.com/user-attachments/assets/3603a7a0-ab55-462f-a24b-569bc770d6f5" />

---

##### 🧩 Task 3: User Input with read
1. Create `greet.sh` that:
   - Asks the user for their name using `read`
   - Asks for their favourite tool
   - Prints: `Hello <name>, your Fav DevOps tool name is <tool>`
   - 
<img width="1036" height="268" alt="Screenshot 2026-08-08 120101" src="https://github.com/user-attachments/assets/af28a9c7-3efb-43c8-bff2-381285cdf373" />
<img width="1919" height="541" alt="Screenshot 2026-08-08 115919" src="https://github.com/user-attachments/assets/a47353d1-4592-4bda-b219-8ff934e36cf7" />

---

##### 🧩 Task 4: If-Else Conditions
1. Create `check_number.sh` that:
   - Takes a number using `read`
   - Prints whether it is **positive**, **negative**, or **zero**
     
<img width="829" height="124" alt="Screenshot 2026-08-08 123011" src="https://github.com/user-attachments/assets/5a17923a-ee1d-4919-b3a8-13b5fd7181d5" />
<img width="1919" height="589" alt="Screenshot 2026-08-08 122837" src="https://github.com/user-attachments/assets/26c40f16-ce59-4419-9fc9-704597bed353" />

---

2. Create `file_check.sh` that:
   - Asks for a filename
   - Checks if the file **exists** using `-f`
   - Prints appropriate message
   - 
<img width="952" height="304" alt="Screenshot 2026-08-08 123654" src="https://github.com/user-attachments/assets/a9883278-dd41-4677-b6cd-b6e1a1ed712b" />
<img width="849" height="514" alt="Screenshot 2026-08-08 123528" src="https://github.com/user-attachments/assets/30520038-1ec2-455e-9571-92473fcd1749" />

---

##### 🧩 Task 5: Combine It All
Create `server_check.sh` that:
1. Stores a service name in a variable (e.g., `nginx`, `sshd`)
2. Asks the user: "Do you want to check the status? (y/n)"
3. If `y` — runs `systemctl status <service>` and prints whether it's **active** or **not**
4. If `n` — prints "Skipped."

<img width="951" height="342" alt="Screenshot 2026-08-08 124943" src="https://github.com/user-attachments/assets/5e139e5a-6592-4c50-a63e-030e362afc7b" />
<img width="1329" height="515" alt="Screenshot 2026-08-08 124632" src="https://github.com/user-attachments/assets/a152da93-1029-4ef6-97ef-0f1b478dd801" />

---

#### 🧠 Hints
- Shebang: `#!/bin/bash` tells the system which interpreter to use
- Variables: `NAME="Shubham"` (no spaces around `=`)
- Read: `read -p "Enter name: " NAME`
- If syntax: `if [ condition ]; then ... elif ... else ... fi`
- File check: `if [ -f filename ]; then`

---

#### 📌 What I Have learned:
* How to write and execute Bash shell scripts using the shebang (#!/bin/bash),variables,and user input with read.
* How variable assignment works in Bash,including accessing variables with $ and understanding single vs double quotes.
* How to control script flow using conditional statements (if, elif, else) and test operators (-f, -gt, -lt).
* How to check file existence and numeric conditions inside shell scripts.
* How to suppress command output using redirection (> /dev/null ).
* How to use systemctl is-active to programmatically check whether a service is running instead of relying on verbose status output.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `--dry-run` flag. | You can demonstrate, without notes: *use loops, case, getopts and functions* — with evidence committed to `day-16/`. |
| 2 | Create a reusable `lib.sh` and source it. | You can demonstrate, without notes: *add logging and trap cleanup* — with evidence committed to `day-16/`. |
| 3 | Document 5 common Bash gotchas. | You can demonstrate, without notes: *write reusable script libraries* — with evidence committed to `day-16/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Loop splits filenames with spaces | Quote variables and use `find -print0 | xargs -0` or `while read -r`. |
| trap not firing | Use `trap ... EXIT`; ensure not killed by SIGKILL. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Backups: encrypt (`gpg`/`age`), restrict permissions (umask 077), store off-host, test restores.
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

1. What is `trap` used for?
2. How do you parse options?
3. How do you retry safely?
4. How do you iterate files with spaces?
5. **Scenario:** Nightly backup fails silently 3 days a week. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write getopts? | ☐ | ☐ | ☐ | ☐ |
| Can I add logging and retries? | ☐ | ☐ | ☐ | ☐ |
| Can I verify a backup? | ☐ | ☐ | ☐ | ☐ |
| Use loops, case, getopts and functions | ☐ | ☐ | ☐ | ☐ |
| Add logging and trap cleanup | ☐ | ☐ | ☐ | ☐ |
| Write reusable script libraries | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-16/` in your own repository:

```text
day-16/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-16
git add day-16/
git commit -m "day-16: bash"
git push -u origin day-16
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

## 18. Personal Learning Journal — 🚀 Day 16 - GitOps with Jira, AWS Auto Scaling & Amazon RDS

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

30 July 2026

---

### 🚀 Introduction

Today, I learned how **GitOps** can be implemented using **GitHub and Jira**, making Jira the **single source of truth** for tracking development work. I also performed hands-on AWS labs where I created **Auto Scaling Groups**, worked with **Launch Templates**, and connected an **Amazon RDS database with an EC2 instance** inside a VPC.

This session helped me understand how development workflows integrate with cloud infrastructure in real-world DevOps environments.

---

### 📚 Topics Covered

#### 🔄 GitOps
- What is GitOps?
- Jira & GitHub Integration
- Source of Truth
- Smart Commits
- Pull Requests
- Merge Requests
- Issue Tracking

#### ☁️ AWS
- Launch Templates
- Auto Scaling Groups (ASG)
- Creating Templates from Scratch
- Creating Templates from Existing Templates
- Amazon RDS
- Connecting EC2 with RDS
- VPC Configuration
- Security Groups
- Database Connectivity
- Troubleshooting & Debugging

---

### 🔄 What is GitOps?

GitOps is an operational framework where **Git becomes the single source of truth** for both application code and infrastructure.

Every infrastructure or application change is managed through Git.

##### Benefits

- Version Control
- Audit Trail
- Easy Rollbacks
- Team Collaboration
- Automated Deployments
- Better Change Tracking

---

### 🎫 Jira + GitHub Integration

Jira can be connected with GitHub so that development activities are automatically linked to project tasks.

Once integrated:

- Commits appear in Jira issues
- Pull Requests are linked automatically
- Merge events are displayed
- Deployment history can be tracked
- Developers and managers have complete visibility

Example

```
JIRA-101 Add Login API
```

Commit message:

```bash
git commit -m "JIRA-101 Added login validation"
```

The commit automatically appears inside the **JIRA-101** ticket after pushing to GitHub.

---

### 📌 Why Use Jira as the Source of Truth?

Jira provides one central location for:

- Task Management
- Sprint Planning
- Bug Tracking
- Development Progress
- Pull Requests
- Code Reviews
- Deployment Tracking

Instead of checking multiple tools separately, the complete development lifecycle can be viewed from a Jira ticket.

---

### ☁️ AWS Launch Templates

A Launch Template stores reusable EC2 configuration.

It includes:

- AMI
- Instance Type
- Security Groups
- Storage
- IAM Role
- User Data
- Key Pair

---

### Creating a Launch Template from Scratch

Steps:

1. Open EC2 Console
2. Navigate to **Launch Templates**
3. Click **Create Launch Template**
4. Enter Template Name
5. Select AMI
6. Select Instance Type
7. Configure Security Groups
8. Configure Storage
9. Add User Data (Optional)
10. Save Template

---

### Creating a Template from an Existing Template

Instead of configuring everything again:

```
Launch Templates

↓

Select Existing Template

↓

Actions

↓

Create New Template from Existing
```

Advantages:

- Saves time
- Ensures consistency
- Reduces manual errors
- Ideal for production environments

---

### 📈 Auto Scaling Group (ASG)

Auto Scaling Groups automatically adjust the number of EC2 instances based on demand.

##### Components

- Launch Template
- Minimum Capacity
- Desired Capacity
- Maximum Capacity
- Scaling Policies

Example

```
Minimum = 2

Desired = 3

Maximum = 6
```

Benefits:

- High Availability
- Automatic Scaling
- Fault Tolerance
- Cost Optimization

---

### 🗄️ Amazon RDS

Amazon RDS (Relational Database Service) is a managed database service provided by AWS.

Supported databases include:

- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server

---

### Connecting EC2 to RDS

To allow an EC2 instance to communicate with an RDS database:

##### Step 1

Create an RDS database.

---

##### Step 2

Ensure the EC2 instance and RDS are inside the same VPC (or have appropriate network connectivity).

---

##### Step 3

Configure Security Groups.

Example:

```
EC2 Security Group

↓

Allow Outbound MySQL (3306)

↓

RDS Security Group

↓

Allow Inbound MySQL (3306)
```

---

##### Step 4

Connect from the EC2 instance.

For MySQL:

```bash
mysql -h <RDS-ENDPOINT> -u admin -p
```

---

### 🛠️ Database Configuration

After connecting:

- Create Databases
- Create Tables
- Insert Data
- Verify Connectivity
- Test Application Access

---

### 🐞 Debugging Connectivity Issues

During the hands-on lab, common troubleshooting steps included:

##### Check Security Groups

Ensure port **3306** (MySQL) is allowed.

---

##### Verify VPC

Both resources should be in the correct VPC or connected through routing.

---

##### Check Subnets

Verify subnet configuration and routing.

---

##### Verify Database Endpoint

Use the correct RDS endpoint.

---

##### Check Credentials

Ensure username and password are correct.

---

##### Test Network Connectivity

Example:

```bash
telnet <RDS-ENDPOINT> 3306
```

or

```bash
nc -zv <RDS-ENDPOINT> 3306
```

---

##### Verify Database Service

Ensure the RDS instance is in the **Available** state.

---

### 🎯 Key Takeaways

- Learned how GitOps uses Git as the source of truth.
- Integrated Jira with GitHub for automatic commit and pull request tracking.
- Created Launch Templates from scratch and from existing templates.
- Performed hands-on practice with Auto Scaling Groups.
- Connected an EC2 instance to an Amazon RDS database.
- Understood VPC networking and Security Group configuration.
- Practiced debugging common database connectivity issues.

---

### 📈 Progress

- ✅ Day 16 – GitOps with Jira, AWS Auto Scaling & Amazon RDS

**Completed:** 16 / 90 Days 🚀

---

> **"In DevOps, automation builds speed, but visibility builds confidence. GitOps brings both together by making Git the single source of truth."** 🚀


---

[← Day 15](../day-15/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 17 →](../day-17/README.md)
