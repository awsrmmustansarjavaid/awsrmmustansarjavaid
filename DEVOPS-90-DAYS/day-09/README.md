# Day 09 — DNS, HTTP/HTTPS & TLS with curl

[← Day 08](../day-08/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 10 →](../day-10/README.md)

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

- [ ] Trace DNS resolution and record types
- [ ] Debug HTTP with curl
- [ ] Explain TLS certificates and chains

## 2. Prerequisites

- Day 8.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 DNS

Resolver -> root -> TLD -> authoritative. Records: A, AAAA, CNAME, MX, TXT, NS. TTL controls caching. `/etc/hosts` overrides local resolution; `/etc/resolv.conf` or systemd-resolved sets resolvers.

### 3.2 HTTP

Methods, status codes (2xx/3xx/4xx/5xx), headers, cookies, keep-alive, HTTP/2. Idempotency matters for retries.

### 3.3 TLS

Certificate = public key + identity signed by a CA. Handshake negotiates cipher, verifies chain, then encrypts. Let's Encrypt issues free automated certs.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `dig example.com A +short`, `dig +trace example.com`.
2. [ ] Add a fake host in `/etc/hosts` and curl it.
3. [ ] `curl -v https://example.com` and read each section.
4. [ ] Use `curl -I`, `-L`, `-H`, `-X POST -d`, `--resolve`.
5. [ ] Inspect a cert: `openssl s_client -connect example.com:443 -servername example.com </dev/null | openssl x509 -noout -dates -issuer -subject`.

## 5. Real-World Scenario

> Users in one country see 'certificate expired' while others don't. Investigate chain, expiry date, SNI and CDN and document the cause.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
dig example.com A +short
dig +trace example.com | tail -20
curl -sv https://example.com -o /dev/null
curl -I -L http://example.com
curl -s -X POST https://httpbin.org/post -H 'Content-Type: application/json' -d '{"a":1}' | jq .
curl --resolve app.local:443:127.0.0.1 https://app.local -k
openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 09 – Linux User & Group Management Challenge

#### Task
Today's goal is to **practice user and group management** by completing hands-on challenges.

Figure out how to:
- Create users and set passwords
- Create groups and assign users
- Set up shared directories with group permissions

Use what you learned from Days 1-7 to find the right commands!

---

#### Expected Output
- A markdown file: `day-09-user-management.md`
- Screenshots of command outputs
- List of commands used

---

#### Challenge Tasks

##### Task 1: Create Users (20 minutes)

Create three users with home directories and passwords:
- `tokyo`
- `berlin`
- `professor`

**Verify:** Check `/etc/passwd` and `/home/` directory

---

##### Task 2: Create Groups (10 minutes)

Create two groups:
- `developers`
- `admins`

**Verify:** Check `/etc/group`

---

##### Task 3: Assign to Groups (15 minutes)

Assign users:
- `tokyo` → `developers`
- `berlin` → `developers` + `admins` (both groups)
- `professor` → `admins`

**Verify:** Use appropriate command to check group membership

---

##### Task 4: Shared Directory (20 minutes)

1. Create directory: `/opt/dev-project`
2. Set group owner to `developers`
3. Set permissions to `775` (rwxrwxr-x)
4. Test by creating files as `tokyo` and `berlin`

**Verify:** Check permissions and test file creation

---

##### Task 5: Team Workspace (20 minutes)

1. Create user `nairobi` with home directory
2. Create group `project-team`
3. Add `nairobi` and `tokyo` to `project-team`
4. Create `/opt/team-workspace` directory
5. Set group to `project-team`, permissions to `775`
6. Test by creating file as `nairobi`

---

#### Hints

**Stuck? Try these commands:**
- User: `useradd`, `passwd`, `usermod`
- Group: `groupadd`, `groups`
- Permissions: `chgrp`, `chmod`
- Test: `sudo -u username command`

**Tip:** Use `-m` flag with useradd for home directory, `-aG` for adding to groups

---

#### Documentation

Create `day-09-user-management.md`:

```markdown
# Day 09 Challenge

## Users & Groups Created
- Users: tokyo, berlin, professor, nairobi
- Groups: developers, admins, project-team

## Group Assignments
[List who is in which groups]

## Directories Created
[List directories with permissions]

## Commands Used
[Your commands here]

## What I Learned
[3 key points]
```

---


#### Troubleshooting

**Permission denied?** Use `sudo`

**User can't access directory?**
- Check group: `groups username`
- Check permissions: `ls -ld /path`

---

#### Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to `2026/day-09/` folder
3. Add your `day-09-user-management.md` with screenshots
4. Commit and push

---

#### Learn in Public
Share your Day 09 progress on LinkedIn:

- Post about completing the user management challenge
- Share one thing you figured out
- Mention real-world DevOps use

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

### 7.2 Day 09 – Linux User & Group Management

#### 📌 Objective

Learn how to create and manage Linux users and groups, assign permissions, and configure shared directories for team collaboration.

#### 🛠️ Users Created

- Created the following users with home directories:

    `sudo useradd -m tokyo` 

    `sudo useradd -m berlin` 

    `sudo useradd -m professor`

##### Set passwords:

    `sudo passwd tokyo`
    
    `sudo passwd berlin`
    
    `sudo passwd professor`

<img width="1919" height="463" alt="Screenshot 2026-08-01 140148" src="https://github.com/user-attachments/assets/e84f24c5-50a9-492f-8082-af47ac686c5e" />

##### Verify users:

 `cat /etc/passwd | grep -E "tokyo|berlin|professor"` 

##### List home directories:
 `ls /home/`

<img width="1919" height="250" alt="Screenshot 2026-08-01 140421" src="https://github.com/user-attachments/assets/d3f22328-4ff1-4317-a601-a2d1559535da" />

#### 👥 Groups Created

##### Created the following groups:

    `sudo groupadd developers` 

    `sudo groupadd admins`

##### Verify groups:

 `cat /etc/group | grep -E "developers|admins"`

<img width="1919" height="164" alt="Screenshot 2026-08-01 140549" src="https://github.com/user-attachments/assets/9b159fa9-6d29-41e8-b88f-07be6f27dc36" />
---

#### 🔐 Group Assignments

##### Assign users to groups:
- tokyo → developers
   `sudo usermod -aG developers tokyo`
  
- berlin → developers + admins
   `sudo usermod -aG developers,admins berlin`
  
- professor → admins
    `sudo usermod -aG admins professor`
  
##### Verify memberships:

    `groups tokyo`

    `groups berlin`

    `groups professor`

<img width="1783" height="347" alt="Screenshot 2026-08-01 141018" src="https://github.com/user-attachments/assets/c5389c90-fcee-473c-a0e3-4b0b14927fe1" />

---

#### 📂 Shared Development Directory

##### Create project directory:

 `sudo mkdir /opt/dev-project`

##### Assign group ownership:
 `sudo chgrp developers /opt/dev-project`

##### Set permissions:

 `sudo chmod 775 /opt/dev-project`

##### Verify:

   `ls -ld /opt/dev-project`

##### Test access:

 `sudo -u tokyo touch /opt/dev-project/tokyo.txt`

 `sudo -u berlin touch /opt/dev-project/berlin.txt`

Verify files:

  `ls -ld /opt/dev-project/`

<img width="931" height="138" alt="Screenshot 2026-08-01 141354" src="https://github.com/user-attachments/assets/4fd0a083-dad5-4bc4-99e7-007e81d6b516" />

---

#### 🤝 Team Workspace

##### Create user:

 `sudo useradd -m nairobi`

 `sudo passwd nairobi`

##### Create group:

 `sudo groupadd project-team`

##### Add users:

 `sudo usermod -aG project-team nairobi`

 `sudo usermod -aG project-team tokyo`

##### Create shared directory:

`sudo mkdir /opt/team-workspace`

##### Assign group ownership:

 `sudo chgrp project-team /opt/team-workspace`

##### Set permissions:

 `sudo chmod 775 /opt/team-workspace`

##### Verify:

 `ls -ld /opt/team-workspace`

<img width="1244" height="421" alt="Screenshot 2026-08-01 142356" src="https://github.com/user-attachments/assets/9db5c40e-0923-4562-99a3-ae8c560f321f" />

##### Test file creation:

 `sudo -u nairobi touch /opt/team-workspace/nairobi.txt`

 `ls -ld /opt/team-workspace/`

<img width="1376" height="296" alt="Screenshot 2026-08-01 142647" src="https://github.com/user-attachments/assets/29a85d9a-b727-4342-b240-d4e5bf36aa10" />

---

#### ✅ Key Commands Used
useradd
passwd
groupadd
usermod
groups
mkdir
chgrp
chmod
touch
ls

#### 📖 What I Learned
- Created Linux users with home directories.
- Set passwords and verified user accounts.
- Created groups and assigned users to one or more groups.
- Managed user memberships using usermod.
- Configured shared directories with group ownership.
- Applied Linux permissions using chmod 775.
- Tested collaborative access by creating files as different users.
- Understood how Linux user, group, and permission management supports secure team collaboration.
  
#### 🚀 Skills Practiced
- Linux User Management
- Linux Group Management
- File Permissions
- Directory Ownership
- Access Control
- System Administration
- Linux Command Line
  
#### ⭐ If you found this project helpful, feel free to star the repository!

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a DNS troubleshooting flow chart (text). | You can demonstrate, without notes: *trace DNS resolution and record types* — with evidence committed to `day-09/`. |
| 2 | Check 5 websites' cert expiry dates with a loop. | You can demonstrate, without notes: *debug HTTP with curl* — with evidence committed to `day-09/`. |
| 3 | Create a status code cheat sheet with causes for 502, 503, 504. | You can demonstrate, without notes: *explain TLS certificates and chains* — with evidence committed to `day-09/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `NXDOMAIN` | Record missing/typo or wrong zone; check authoritative NS. |
| `SSL certificate problem` | Missing intermediate or untrusted CA; check chain and system CA bundle. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Always use HTTPS, TLS 1.2+, HSTS; never use `curl -k` outside throwaway tests; automate certificate renewal and expiry alerts.
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

1. What happens during DNS resolution?
2. 502 vs 504?
3. What is SNI?
4. How does a TLS handshake work?
5. **Scenario:** Users in one country see 'certificate expired' while others don't. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I query specific DNS records? | ☐ | ☐ | ☐ | ☐ |
| Can I read a curl -v output? | ☐ | ☐ | ☐ | ☐ |
| Can I check cert expiry from CLI? | ☐ | ☐ | ☐ | ☐ |
| Trace DNS resolution and record types | ☐ | ☐ | ☐ | ☐ |
| Debug HTTP with curl | ☐ | ☐ | ☐ | ☐ |
| Explain TLS certificates and chains | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-09/` in your own repository:

```text
day-09/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-09
git add day-09/
git commit -m "day-09: dns, http/https & tls with curl"
git push -u origin day-09
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

## 18. Personal Learning Journal — 🔧 Day 09 - Git, GitHub & AWS Python Automation

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

23 July 2026

---

### 🚀 Introduction

Today, I started learning one of the most essential tools for every DevOps Engineer: **Git & GitHub**.

Version control is the backbone of modern software development and DevOps. I learned how Git tracks changes, how GitHub enables collaboration, and how to use Git commands to manage repositories and branches.

I also explored **AWS Python Automation**, including **AWS Lambda** and **Boto3**, and how Python is used to automate cloud operations.

---

### 📚 Topics Covered

- What is Git?
- What is GitHub?
- Git vs GitHub
- Benefits of Git & GitHub
- Repository
- Default Branch
- Git Installation
- Git Configuration
- Authentication using SSH & PAT
- Git Workflow
- Git Commands
- Git Restore
- Branches
- Creating & Switching Branches
- Merging
- AWS Python Automation
- AWS Lambda
- Boto3
- API Requests

---

### 📖 What is Git?

Git is a **Distributed Version Control System (DVCS)** used to track changes in source code.

It allows developers to:

- Track file changes
- Collaborate with teams
- Maintain project history
- Roll back to previous versions
- Work on multiple features simultaneously

Git stores the complete history locally.

---

### 🌍 What is GitHub?

GitHub is a cloud platform that hosts Git repositories.

It provides:

- Cloud Backup
- Collaboration
- Pull Requests
- Code Reviews
- CI/CD Integrations
- Issue Tracking
- Project Management

Think of Git as the engine and GitHub as the online platform where repositories are stored.

---

### Git vs GitHub

| Git | GitHub |
|------|---------|
| Version Control System | Cloud Hosting Platform |
| Works locally | Works online |
| Tracks code changes | Stores Git repositories |
| Open Source | Provides collaboration features |

---

### 🎯 Benefits of Git & GitHub

- Version Control
- Easy Collaboration
- Backup of Code
- Branch Management
- Rollback Support
- Open Source Contribution
- CI/CD Integration
- Project Documentation

---

### 📂 What is a Repository?

A repository (repo) is a project folder managed by Git.

It contains:

- Source Code
- Documentation
- Images
- Commit History
- Branches

---

### 🌿 Default Branch

Most modern repositories use:

```
main
```

Older repositories may use:

```
master
```

Rename branch

```bash
git branch -M main
```

---

### ⚙️ Configure Git

Check version

```bash
git --version
```

Configure username

```bash
git config --global user.name "Your Name"
```

Configure email

```bash
git config --global user.email "your@email.com"
```

View configuration

```bash
git config --list
```

---

### 🔐 GitHub Authentication

#### Method 1 — SSH (Recommended)

Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

Start SSH Agent

```bash
eval "$(ssh-agent -s)"
```

Add SSH Key

```bash
ssh-add ~/.ssh/id_ed25519
```

Copy Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Paste it into:

GitHub → Settings → SSH and GPG Keys

Test Connection

```bash
ssh -T git@github.com
```

---

#### Method 2 — Personal Access Token (PAT)

GitHub no longer supports passwords for Git operations.

Instead:

- Create a Personal Access Token
- Use the token instead of your password

---

### 🔄 Git Workflow

```
Working Directory
        │
git add
        │
        ▼
Staging Area
        │
git commit
        │
        ▼
Local Repository
        │
git push
        │
        ▼
GitHub Repository
```

---

### 💻 Common Git Commands

Initialize Git

```bash
git init
```

Clone Repository

```bash
git clone <repository-url>
```

Check Status

```bash
git status
```

Add All Files

```bash
git add .
```

Add Specific File

```bash
git add README.md
```

Commit Changes

```bash
git commit -m "Initial Commit"
```

View Commit History

```bash
git log
```

Compact Log

```bash
git log --oneline
```

Push Changes

```bash
git push origin main
```

Pull Latest Changes

```bash
git pull origin main
```

Fetch Changes

```bash
git fetch
```

---

### ↩️ Git Restore

Discard changes in a file

```bash
git restore file.txt
```

Restore staged file

```bash
git restore --staged file.txt
```

---

### 🌿 Git Branches

Branches allow developers to work on different features independently.

Main branch

```
main
```

Create Branch

```bash
git branch feature-login
```

View Branches

```bash
git branch
```

Switch Branch

```bash
git switch feature-login
```

or

```bash
git checkout feature-login
```

Create & Switch

```bash
git switch -c feature-login
```

Delete Branch

```bash
git branch -d feature-login
```

Merge Branch

```bash
git merge feature-login
```

---

### 🐍 Python API Requests

Python can communicate with APIs using the `requests` library.

Example

```python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/users")

print(response.status_code)
print(response.json())
```

---

### ☁️ AWS Python Automation

Python is widely used to automate AWS resources.

Examples

- Start EC2
- Stop EC2
- Create S3 Bucket
- Upload Files
- Delete Resources
- Create IAM Users

Automation saves time and reduces manual errors.

---

### ⚡ AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without managing servers.

##### Why Lambda?

- No server management
- Pay only when code runs
- Auto scaling
- Event-driven execution

Common Triggers

- S3 Upload
- API Gateway
- CloudWatch Events
- SNS
- DynamoDB Streams

---

### 📦 Boto3

Boto3 is the official AWS SDK for Python.

It allows Python programs to interact with AWS services.

Install

```bash
pip install boto3
```

Example

```python
import boto3

ec2 = boto3.client("ec2")

response = ec2.describe_instances()

print(response)
```

---

### 🔥 Where is Boto3 Used?

- EC2 Automation
- S3 File Management
- Lambda Functions
- IAM Management
- CloudWatch Monitoring
- DynamoDB
- SNS
- SQS

---

### 🎯 Key Takeaways

- Learned the fundamentals of Git and GitHub.
- Understood the complete Git workflow.
- Practiced essential Git commands.
- Learned repository and branch management.
- Configured Git authentication using SSH and PAT.
- Explored Git restore and branching strategies.
- Learned how Python interacts with APIs.
- Explored AWS Lambda and serverless computing.
- Learned how Boto3 automates AWS resources.

---

### 📈 Progress

- ✅ Day 09 – Git, GitHub & AWS Python Automation

**Completed:** 9 / 90 Days 🚀

---

⭐ "Version control is not just about saving code—it's about collaborating, tracking progress, and building software with confidence."


---

[← Day 08](../day-08/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 10 →](../day-10/README.md)
