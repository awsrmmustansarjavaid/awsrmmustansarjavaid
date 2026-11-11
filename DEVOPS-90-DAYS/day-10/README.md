# Day 10 — Ports, Firewalls & Network Debugging (ufw, nftables, tcpdump)

[← Day 09](../day-09/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 11 →](../day-11/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] List listening services and map them to processes
- [ ] Configure host firewalls
- [ ] Capture and read traffic

## 2. Prerequisites

- Day 9.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Sockets and ports

A service listens on IP:port. `0.0.0.0` listens on all interfaces; `127.0.0.1` only locally. `ss -tulpn` shows listeners with PIDs.

### 3.2 Firewalls

Default-deny inbound, allow only required ports. `ufw` is a friendly front-end for nftables/iptables. Cloud equivalents: Security Groups (stateful) and NACLs (stateless).

### 3.3 Packet capture

`tcpdump -i any port 80 -nn` shows traffic; use filters and `-w file.pcap` for Wireshark.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Start `python3 -m http.server 8080` and find it with `ss -tulpn`.
2. [ ] Enable `ufw` with default deny, allow 22 and 80 only.
3. [ ] Test from another host/VM or `nc` from localhost vs external IP.
4. [ ] Capture traffic to port 8080 while using curl; save a pcap.
5. [ ] Explain why a bind to 127.0.0.1 isn't reachable externally.

## 5. Real-World Scenario

> A new service is 'up' but unreachable. Walk through: listener -> bind address -> host firewall -> cloud SG -> route -> DNS and document your checklist.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ss -tulpn
python3 -m http.server 8080 &
sudo ufw default deny incoming && sudo ufw default allow outgoing
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp
sudo ufw enable && sudo ufw status verbose
sudo tcpdump -i any port 8080 -nn -c 20
nc -vz localhost 8080
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 10 – File Permissions & File Operations Challenge

#### Task
Master file permissions and basic file operations in Linux.

- Create and read files using `touch`, `cat`, `vim`
- Understand and modify permissions using `chmod`

---

#### Expected Output
- A markdown file: `day-10-file-permissions.md`
- Screenshots showing permission changes

---

#### Challenge Tasks

##### Task 1: Create Files (10 minutes)

1. Create empty file `devops.txt` using `touch`
2. Create `notes.txt` with some content using `cat` or `echo`
3. Create `script.sh` using `vim` with content: `echo "Hello DevOps"`

**Verify:** `ls -l` to see permissions

---

##### Task 2: Read Files (10 minutes)

1. Read `notes.txt` using `cat`
2. View `script.sh` in vim read-only mode
3. Display first 5 lines of `/etc/passwd` using `head`
4. Display last 5 lines of `/etc/passwd` using `tail`

---

##### Task 3: Understand Permissions (10 minutes)

Format: `rwxrwxrwx` (owner-group-others)
- `r` = read (4), `w` = write (2), `x` = execute (1)

Check your files: `ls -l devops.txt notes.txt script.sh`

Answer: What are current permissions? Who can read/write/execute?

---

##### Task 4: Modify Permissions (20 minutes)

1. Make `script.sh` executable → run it with `./script.sh`
2. Set `devops.txt` to read-only (remove write for all)
3. Set `notes.txt` to `640` (owner: rw, group: r, others: none)
4. Create directory `project/` with permissions `755`

**Verify:** `ls -l` after each change

---

##### Task 5: Test Permissions (10 minutes)

1. Try writing to a read-only file - what happens?
2. Try executing a file without execute permission
3. Document the error messages

---

#### Hints

- Create: `touch`, `cat > file`, `vim file`
- Read: `cat`, `head -n`, `tail -n`
- Permissions: `chmod +x`, `chmod -w`, `chmod 755`

---

#### Documentation

Create `day-10-file-permissions.md`:

```markdown
# Day 10 Challenge

## Files Created
[list files]

## Permission Changes
[before/after for each file]

## Commands Used
[your commands]

## What I Learned
[3 key points]
```

---

#### Submission
1. Navigate to `2026/day-10/` folder
2. Add `day-10-file-permissions.md` with screenshots
3. Commit and push

---

#### Learn in Public

Share on LinkedIn about mastering file permissions.

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

### 7.2 🚀 Day-10: File Permissions & File Operations.

#### 📁 Files Created
- Create empty file

    `touch devops.txt`

- Create file with content

    `echo "These are my DevOps notes" > notes.txt`

- Create script using vim

    `vim script.sh`
    
- Inside vim, add:

    `echo "Hello DevOps"`
    
    Save and exit (:wq)

- Verify files

    `ls -l`

    <img width="1910" height="273" alt="Screenshot 2026-08-01 150316" src="https://github.com/user-attachments/assets/d0fccef5-1f14-459d-884c-d086b0502f78" />


- Read notes.txt

    `cat notes.txt`

   <img width="583" height="103" alt="Screenshot 2026-08-01 150341" src="https://github.com/user-attachments/assets/f58d3f8b-d24e-40cc-b2d6-35c1854ab766" />


- Open script.sh in read-only mode

    `vim -R script.sh`
  
  <img width="1919" height="740" alt="Screenshot 2026-08-01 150434" src="https://github.com/user-attachments/assets/1285df9a-55b0-44e5-8d8c-a87db461d8b2" />

- Display first 5 lines of /etc/passwd

    `head -n 5 /etc/passwd`

  <img width="699" height="133" alt="Screenshot 2026-08-01 150545" src="https://github.com/user-attachments/assets/3ce940bf-0a3d-4490-aedb-41ba14f997f1" />

- Display last 5 lines of /etc/passwd

    `tail -n 5 /etc/passwd`
  <img width="726" height="157" alt="Screenshot 2026-08-01 150551" src="https://github.com/user-attachments/assets/7b0aa599-4433-4305-bd51-7a0fb59ac21e" />


#### 🔐 Permission Changes
- Format: rwxrwxrwx → owner, group, others

- Values: r=4, w=2, x=1

- Example output:

    `ls -l devops.txt notes.txt script.sh`

  <img width="813" height="121" alt="Screenshot 2026-08-01 150634" src="https://github.com/user-attachments/assets/2c3507c3-7139-458d-8251-e298464f497b" />

    Answer:

    - devops.txt → -rw-rw-r-- → owner can read/write, group can read/write, others can read.

    - notes.txt → -rw-rw-r-- → same as above.

    - script.sh → -rw-rw-r-- → same as above.

- Make script executable

    `chmod +x script.sh`

    `./script.sh   # Runs "Hello DevOps"`

- Set devops.txt to read-only

    `chmod a-w devops.txt`

- Set notes.txt to 640 (rw for owner, r for group, none for others)

    `chmod 640 notes.txt`

- Create directory with 755 permissions

    `mkdir project`

    `chmod 755 project`

- Verify after each change

    `ls -l`

<img width="1919" height="320" alt="Screenshot 2026-08-01 151043" src="https://github.com/user-attachments/assets/93319589-82ab-4767-831b-7bb07220581e" />

- Try writing to read-only file

    `echo "new text" >> devops.txt`

     Error: "Permission denied"

    <img width="698" height="68" alt="Screenshot 2026-08-01 151121" src="https://github.com/user-attachments/assets/bc2d89cd-1221-41c5-bfac-0abca7f487b0" />

- Remove execute permission and try running script

    `chmod -x script.sh`

    `./script.sh`
    
    Error: "Permission denied"
  
    <img width="613" height="114" alt="Screenshot 2026-08-01 151227" src="https://github.com/user-attachments/assets/bb1bab6b-f7b1-471f-b5db-a29e3eef9f2d" />

#### 💡 What I Learned

1. *File Operations* : I practiced creating, editing, and reading files using *touch*, *echo*, *cat*, and *vim*, and explored system files with *head* and *tail*.

2. *Permissions Fundamentals* : I understood the *rwxrwxrwx* format, numeric values (r=4, w=2, x=1), and how ownership affects read/write/execute access.

3. *Permission Management* : I modified permissions with *chmod* (symbolic and numeric), tested restrictions, and observed how Linux enforces security through error messages like “Permission denied.”

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 'Cannot connect' troubleshooting checklist. | You can demonstrate, without notes: *list listening services and map them to processes* — with evidence committed to `day-10/`. |
| 2 | Explain stateful vs stateless firewalls. | You can demonstrate, without notes: *configure host firewalls* — with evidence committed to `day-10/`. |
| 3 | Block an IP and verify. | You can demonstrate, without notes: *capture and read traffic* — with evidence committed to `day-10/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Locked out of SSH after enabling ufw | Always allow 22 BEFORE enabling; use console/serial to recover. |
| tcpdump shows nothing | Wrong interface/filter or no traffic; use `-i any`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Default deny, allow minimum ports, restrict SSH by source IP, never expose DB ports (3306/5432/6379/27017) publicly.
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

1. Why bind to 127.0.0.1?
2. Security Group vs NACL?
3. How to see which process owns a port?
4. What does tcpdump do?
5. **Scenario:** A new service is 'up' but unreachable. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I list listeners and PIDs? | ☐ | ☐ | ☐ | ☐ |
| Can I write a default-deny policy? | ☐ | ☐ | ☐ | ☐ |
| Can I run a basic capture? | ☐ | ☐ | ☐ | ☐ |
| List listening services and map them to processes | ☐ | ☐ | ☐ | ☐ |
| Configure host firewalls | ☐ | ☐ | ☐ | ☐ |
| Capture and read traffic | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-10/` in your own repository:

```text
day-10/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-10
git add day-10/
git commit -m "day-10: ports, firewalls & network debugging (ufw, nftables, tcpdump"
git push -u origin day-10
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

## 18. Personal Learning Journal — ☁️ Day 10 - Git Advanced, AWS Cloud Fundamentals & Python OOP

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

24 July 2026

---

### 🚀 Introduction

Day 10 was focused on advancing my knowledge of **Git**, understanding **Cloud Computing and AWS fundamentals**, and learning the basics of **Object-Oriented Programming (OOP)** in Python.

I explored different Git merge strategies, branching, rebasing, cloud deployment models, AWS infrastructure, pricing, IAM, and built a simple **Log Analyzer** project using Python classes.

---

### 📚 Topics Covered

#### 🔄 Git & GitHub
- Git Merge
- Merge Commit
- Fast-Forward Merge
- Git Rebase
- Commit Hashes
- Git Fetch
- Git Fetch --all
- Git Log (`--oneline`)
- Branching

#### ☁️ AWS Cloud
- What is Cloud Computing?
- Public, Private & Hybrid Cloud
- Data Centers
- AWS Regions
- Availability Zones
- AWS Pricing Calculator
- AWS Access Methods
- AWS CLI
- AWS SDK
- AWS Console
- Root User
- IAM
- IAM Policies
- IaaS, PaaS & SaaS
- CapEx vs OpEx

#### 🐍 Python
- Classes
- Objects
- Log Analyzer Project

---

### 🔄 Git Merge

Git Merge combines changes from one branch into another.

Example:

```bash
git checkout main
git merge feature-login
```

---

### Merge Types

#### 1️⃣ Merge Commit

A new merge commit is created to preserve branch history.

```text
A---B---C (main)
     \
      D---E (feature)

After Merge

A---B---C---------M
     \           /
      D---------E
```

Command

```bash
git merge feature
```

---

#### 2️⃣ Fast-Forward Merge

Occurs when the target branch has no new commits.

Git simply moves the branch pointer forward.

```text
A---B---C (main)
         \
          D---E (feature)

↓

A---B---C---D---E
```

Command

```bash
git merge feature
```

---

### Git Rebase

Rebase moves commits from one branch on top of another, creating a cleaner history.

Command

```bash
git checkout feature
git rebase main
```

##### Merge vs Rebase

| Merge | Rebase |
|--------|--------|
| Preserves history | Creates a cleaner history |
| Adds merge commits | No merge commits |
| Better for team collaboration | Better for keeping history linear |

---

### Commit Hash

Every commit in Git has a unique SHA hash.

Example

```text
f2c1d89
```

View commits

```bash
git log
```

Compact view

```bash
git log --oneline
```

---

### Git Fetch

Downloads changes from the remote repository without merging them.

```bash
git fetch
```

---

### Git Fetch All

Fetches updates from all configured remotes.

```bash
git fetch --all
```

---

### ☁️ What is Cloud Computing?

Cloud Computing is the delivery of computing services such as servers, storage, databases, networking, and software over the internet.

##### Benefits

- Scalability
- Cost Efficiency
- High Availability
- Security
- Global Access

---

### Cloud Deployment Models

#### Public Cloud

Resources are owned and managed by cloud providers.

Examples:

- AWS
- Azure
- Google Cloud

---

#### Private Cloud

Infrastructure dedicated to a single organization.

Examples:

- VMware
- OpenStack

---

#### Hybrid Cloud

A combination of Public and Private Cloud environments.

---

### How Cloud Works

```text
Users
   │
Internet
   │
AWS Data Center
   │
Region
   │
Availability Zone
   │
Virtual Server (EC2)
```

---

### Data Center

A physical building that houses servers, networking devices, and storage systems.

---

### AWS Region

A geographical location containing multiple Availability Zones.

Examples:

- us-east-1
- ap-south-1
- eu-west-1

---

### Availability Zone (AZ)

An isolated data center within a region.

Benefits:
- Fault Tolerance
- High Availability
- Disaster Recovery

---

### AWS Pricing Calculator

The AWS Pricing Calculator helps estimate the monthly cost of AWS services before deployment.

Common uses:
- Budget planning
- Cost comparison
- Architecture estimation

---

### Ways to Access AWS

#### AWS Management Console

A web-based graphical interface for managing AWS services.

---

#### AWS CLI

Command-line interface to interact with AWS services.

Example

```bash
aws s3 ls
```

Configure CLI

```bash
aws configure
```

---

#### AWS SDK

Software libraries for interacting with AWS using programming languages.

Example (Python - Boto3)

```python
import boto3

s3 = boto3.client("s3")
```

---

### Root User

The Root User has unrestricted access to all AWS services.

Best Practice:
- Use only for account setup.
- Enable MFA.
- Avoid daily use.

---

### IAM (Identity and Access Management)

IAM manages authentication and authorization in AWS.

It allows you to create:

- Users
- Groups
- Roles
- Policies

---

### IAM Policy

Policies define permissions for AWS resources.

Example:

- Allow EC2 access
- Deny S3 deletion
- Read-only access

---

### Cloud Service Models

| Model | Description | Example |
|--------|-------------|---------|
| IaaS | Infrastructure as a Service | Amazon EC2 |
| PaaS | Platform as a Service | AWS Elastic Beanstalk |
| SaaS | Software as a Service | Gmail, Microsoft 365 |

---

### CapEx vs OpEx

| CapEx | OpEx |
|--------|------|
| Capital Expenditure | Operational Expenditure |
| Buy servers | Pay-as-you-go cloud |
| High upfront cost | Low upfront cost |
| Maintenance required | Managed by cloud provider |

---

### 🐍 Python OOP

#### Class

A blueprint for creating objects.

```python
class Server:
    pass
```

---

#### Object

An instance of a class.

```python
server1 = Server()
```

---

### Project - Log Analyzer

##### Objective

Analyze log files and count different log levels.

Example Log

```text
INFO Server Started
ERROR Database Failed
WARNING Low Memory
ERROR Connection Lost
```

##### Python Example

```python
class LogAnalyzer:

    def __init__(self, logs):
        self.logs = logs

    def count_errors(self):
        count = 0

        for log in self.logs:
            if "ERROR" in log:
                count += 1

        return count


logs = [
    "INFO Server Started",
    "ERROR Database Failed",
    "WARNING Low Memory",
    "ERROR Connection Lost"
]

analyzer = LogAnalyzer(logs)

print("Total Errors:", analyzer.count_errors())
```

##### Output

```text
Total Errors: 2
```

---

### 🎯 Key Takeaways

- Learned advanced Git concepts including Merge, Fast-Forward, Rebase, Fetch, and Commit Hashes.
- Understood cloud deployment models and AWS global infrastructure.
- Learned about Regions, Availability Zones, IAM, Root User, and AWS CLI.
- Explored IaaS, PaaS, SaaS, and CapEx vs OpEx.
- Practiced Object-Oriented Programming in Python.
- Built a simple Log Analyzer using Python classes.

---

### 📈 Progress

- ✅ Day 10 – Git Advanced, AWS Cloud Fundamentals & Python OOP

**Completed:** 10 / 90 Days 🚀

---

> "Every commit, every command, and every concept learned today is another step toward becoming a DevOps Engineer."


---

[← Day 09](../day-09/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 11 →](../day-11/README.md)
