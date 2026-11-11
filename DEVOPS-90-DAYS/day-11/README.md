# Day 11 — SSH Deep Dive: Keys, Config, Tunnels & Bastion Hosts

[← Day 10](../day-10/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 12 →](../day-12/README.md)

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

- [ ] Use key-based SSH and ssh-agent
- [ ] Write an `~/.ssh/config`
- [ ] Use port forwarding and jump hosts

## 2. Prerequisites

- Day 10; two VMs or one VM plus localhost.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Key auth

Generate Ed25519 keys; the public key goes to `~/.ssh/authorized_keys`; the private key never leaves your machine and gets a passphrase.

### 3.2 Config and agent

`~/.ssh/config` defines aliases, users, identity files, ProxyJump. `ssh-agent` caches decrypted keys.

### 3.3 Tunnels

Local forward `-L`, remote `-R`, dynamic `-D`. Bastion pattern: only the bastion is public; private hosts are reached with `-J`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `ssh-keygen -t ed25519 -C "you@devops"`.
2. [ ] Copy key with `ssh-copy-id` and test.
3. [ ] Harden `/etc/ssh/sshd_config`: `PasswordAuthentication no`, `PermitRootLogin no`; validate with `sshd -t`; reload.
4. [ ] Create `~/.ssh/config` with a Host alias.
5. [ ] Create a local tunnel to an internal service and a ProxyJump example.

## 5. Real-World Scenario

> Your DB lives in a private subnet. Give a developer secure temporary access via the bastion with a tunnel and without sharing credentials.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ssh-keygen -t ed25519 -C "me@devops"
ssh-copy-id user@host
cat >> ~/.ssh/config <<'EOC'
Host web01
  HostName 10.0.1.10
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  ProxyJump bastion
EOC
sudo sshd -t && sudo systemctl reload ssh
ssh -L 5433:db.internal:5432 bastion
ssh -J bastion deploy@10.0.1.10
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 11 – File Ownership Challenge (chown & chgrp)

#### Task
Master file and directory ownership in Linux.

- Understand file ownership (user and group)
- Change file owner using `chown`
- Change file group using `chgrp`
- Apply ownership changes recursively

---

#### Expected Output
- A markdown file: `day-11-file-ownership.md`
- Screenshots showing ownership changes

---

#### Challenge Tasks

##### Task 1: Understanding Ownership (10 minutes)

1. Run `ls -l` in your home directory
2. Identify the **owner** and **group** columns
3. Check who owns your files

**Format:** `-rw-r--r-- 1 owner group size date filename`

Document: What's the difference between owner and group?

---

##### Task 2: Basic chown Operations (20 minutes)

1. Create file `devops-file.txt`
2. Check current owner: `ls -l devops-file.txt`
3. Change owner to `tokyo` (create user if needed)
4. Change owner to `berlin`
5. Verify the changes

**Try:**
```bash
sudo chown tokyo devops-file.txt
```

---

##### Task 3: Basic chgrp Operations (15 minutes)

1. Create file `team-notes.txt`
2. Check current group: `ls -l team-notes.txt`
3. Create group: `sudo groupadd heist-team`
4. Change file group to `heist-team`
5. Verify the change

---

##### Task 4: Combined Owner & Group Change (15 minutes)

Using `chown` you can change both owner and group together:

1. Create file `project-config.yaml`
2. Change owner to `professor` AND group to `heist-team` (one command)
3. Create directory `app-logs/`
4. Change its owner to `berlin` and group to `heist-team`

**Syntax:** `sudo chown owner:group filename`

---

##### Task 5: Recursive Ownership (20 minutes)

1. Create directory structure:
   ```
   mkdir -p heist-project/vault
   mkdir -p heist-project/plans
   touch heist-project/vault/gold.txt
   touch heist-project/plans/strategy.conf
   ```

2. Create group `planners`: `sudo groupadd planners`

3. Change ownership of entire `heist-project/` directory:
   - Owner: `professor`
   - Group: `planners`
   - Use recursive flag (`-R`)

4. Verify all files and subdirectories changed: `ls -lR heist-project/`

---

##### Task 6: Practice Challenge (20 minutes)

1. Create users: `tokyo`, `berlin`, `nairobi` (if not already created)
2. Create groups: `vault-team`, `tech-team`
3. Create directory: `bank-heist/`
4. Create 3 files inside:
   ```
   touch bank-heist/access-codes.txt
   touch bank-heist/blueprints.pdf
   touch bank-heist/escape-plan.txt
   ```

5. Set different ownership:
   - `access-codes.txt` → owner: `tokyo`, group: `vault-team`
   - `blueprints.pdf` → owner: `berlin`, group: `tech-team`
   - `escape-plan.txt` → owner: `nairobi`, group: `vault-team`

**Verify:** `ls -l bank-heist/`

---

#### Key Commands Reference

```bash
# View ownership
ls -l filename

# Change owner only
sudo chown newowner filename

# Change group only
sudo chgrp newgroup filename

# Change both owner and group
sudo chown owner:group filename

# Recursive change (directories)
sudo chown -R owner:group directory/

# Change only group with chown
sudo chown :groupname filename
```

---

#### Hints

- Most `chown`/`chgrp` operations need `sudo`
- Use `-R` flag for recursive directory changes
- Always verify with `ls -l` after changes
- User must exist before using in `chown`
- Group must exist before using in `chgrp`/`chown`

---

#### Documentation

Create `day-11-file-ownership.md`:

```markdown
# Day 11 Challenge

## Files & Directories Created
[list all files/directories]

## Ownership Changes
[before/after for each file]

Example:
- devops-file.txt: user:user → tokyo:heist-team

## Commands Used
[your commands here]

## What I Learned
[3 key points about file ownership]
```

---

#### Troubleshooting

**Permission denied?**
- Use `sudo` for chown/chgrp operations

**Group doesn't exist?**
- Create it first: `sudo groupadd groupname`

**User doesn't exist?**
- Create it first: `sudo useradd username`

---

#### Why This Matters for DevOps

In real DevOps scenarios, you need proper file ownership for:

- Application deployments
- Shared team directories
- Container file permissions
- CI/CD pipeline artifacts
- Log file management

---

#### Submission
1. Navigate to `2026/day-11/` folder
2. Add `day-11-file-ownership.md` with screenshots
3. Commit and push to your fork

---

#### Learn in Public

Share on LinkedIn about mastering file ownership.

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

### 7.2 🚀Day-11: File Ownership (chown & chgrp)

#### 👤 Understanding Ownership
- Run `ls -l` in your home directory

  <img width="701" height="187" alt="Screenshot 2026-08-01 152658" src="https://github.com/user-attachments/assets/04303cc8-c49c-4e13-9d4c-5e7762953769" />


    `-rw-r--r-- 1 owner group size date filename`

    -   Owner → Individual user with direct control.

    -   Group → Multiple users who may share access.

#### 📁 Files & Directories Created
- Basic `chown` Operations

    `touch devops-file.txt`

    `ls -l devops-file.txt`

 <img width="730" height="101" alt="Screenshot 2026-08-01 152643" src="https://github.com/user-attachments/assets/9fa9171d-b69b-41bb-a370-2a0a10b4b9bd" />

    `sudo chown tokyo devops-file.txt`

    `ls -l devops-file.txt`

<img width="724" height="114" alt="Screenshot 2026-08-01 152740" src="https://github.com/user-attachments/assets/bf859510-8709-4235-a030-ad2d569fd4d6" />


    `sudo chown berlin devops-file.txt`

    `ls -l devops-file.txt`

  <img width="717" height="117" alt="Screenshot 2026-08-01 152816" src="https://github.com/user-attachments/assets/019cfabe-71f0-4044-b817-7703630274f8" />


- Basic `chgrp` Operations

    `touch team-notes.txt`

    `ls -l team-notes.txt`

  <img width="709" height="101" alt="Screenshot 2026-08-01 152846" src="https://github.com/user-attachments/assets/153d10a9-f588-4e14-8434-200525943ed7" />

    `sudo groupadd heist-team`

    `sudo chgrp heist-team team-notes.txt`

    `ls -l team-notes.txt`

  <img width="786" height="128" alt="Screenshot 2026-08-01 153349" src="https://github.com/user-attachments/assets/7f8e6c70-c399-4d74-ac50-2df962b0c805" />


#### 👥Ownership Changes
- Combined Owner & Group Change

    `touch project-config.yaml`

    `sudo chown professor:heist-team project-config.yaml`

    `mkdir app-logs`

    `sudo chown berlin:heist-team app-logs`

    `ls -l`
<img width="1919" height="407" alt="Screenshot 2026-08-01 153512" src="https://github.com/user-attachments/assets/394fe6e7-743c-48dc-b461-b3c2fe8b977f" />


- 📂 Recursive Ownership
    
    `mkdir -p heist-project/vault`
    
    `mkdir -p heist-project/plans`

    `touch heist-project/vault/gold.txt`

    `touch heist-project/plans/strategy.conf`

    `sudo groupadd planners`

    `sudo chown -R professor:planners heist-project/`

    `ls -lR heist-project/`

<img width="1919" height="518" alt="Screenshot 2026-08-01 153644" src="https://github.com/user-attachments/assets/6b4207cf-86a0-4343-a3f1-0008bb0e1864" />


- 🎯 Practice Challenge

    -  👤 Create users
        
        `sudo useradd tokyo`

        `sudo useradd berlin`

        `sudo useradd nairobi`

    -   👥 Create groups
    
        `sudo groupadd vault-team`

        `sudo groupadd tech-team`

    -  📂 Create directory

        `mkdir bank-heist`
    
    - 📄 Create 3 files inside

    `touch bank-heist/access-codes.txt`

    `touch bank-heist/blueprints.pdf`

    `touch bank-heist/escape-plan.txt`

    - 🔐 Set different ownership

    `sudo chown tokyo:vault-team bank-heist/access-codes.txt`

    `sudo chown berlin:tech-team bank-heist/blueprints.pdf`

    `sudo chown nairobi:vault-team bank-heist/escape-plan.txt`

    - ✅ Verify

    `ls -l bank-heist/`
  
<img width="1919" height="435" alt="Screenshot 2026-08-01 153938" src="https://github.com/user-attachments/assets/d8898cfd-9b40-4f3a-9921-95dac86653f4" />


#### 💻 Commands Used
1. View ownership

    `ls -l filename`

2. Change owner only

    `sudo chown newowner filename`

3. Change group only

    `sudo chgrp newgroup filename`

4. Change both owner and group

    `sudo chown owner:group filename`

5. Recursive change (directories)

    `sudo chown -R owner:group directory/`

6. Change only group with chown

    `sudo chown :groupname filename`


#### 💡What I Learned
👤 1. Dual Ownership Model  
    Every file in Linux has two ownership attributes:
    - Owner (user): The individual account that created or owns the file.
    - Group: A collection of users who may share access to the file. This ensures collaborative work without giving full control to everyone. 

🔒 2. Ownership Controls Access & Security  
    File ownership, combined with permissions, determines who can read, write, or execute a file. This is a cornerstone of Linux’s multi-user security model, preventing unauthorized access or modification. 

⚙️ 3. Ownership Can Be Changed with Commands  
    Administrators can reassign ownership using:
    - chown → change file owner (and optionally group).
    - chgrp → change group ownership.
    - Recursive flags (-R) allow applying changes across entire directories. These commands are essential for managing shared projects and system security.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write an SSH hardening checklist. | You can demonstrate, without notes: *use key-based SSH and ssh-agent* — with evidence committed to `day-11/`. |
| 2 | Rotate a key pair and revoke the old key. | You can demonstrate, without notes: *write an `~/.ssh/config`* — with evidence committed to `day-11/`. |
| 3 | Explain agent forwarding risks. | You can demonstrate, without notes: *use port forwarding and jump hosts* — with evidence committed to `day-11/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Permission denied (publickey)` | Wrong user/key, bad file perms (`chmod 700 ~/.ssh; chmod 600 authorized_keys`), check `ssh -vvv`. |
| Host key changed warning | Verify the change is legitimate before removing via `ssh-keygen -R host`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Passwords off, root login off, use short-lived certs or SSM in cloud, restrict by security group, protect private keys, avoid agent forwarding to untrusted hosts.
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

1. Why Ed25519 keys?
2. What is ProxyJump?
3. Local vs remote forwarding?
4. How to harden sshd?
5. **Scenario:** Your DB lives in a private subnet. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I log in with a key only? | ☐ | ☐ | ☐ | ☐ |
| Can I write a config alias? | ☐ | ☐ | ☐ | ☐ |
| Can I reach a private host via bastion? | ☐ | ☐ | ☐ | ☐ |
| Use key-based SSH and ssh-agent | ☐ | ☐ | ☐ | ☐ |
| Write an `~/.ssh/config` | ☐ | ☐ | ☐ | ☐ |
| Use port forwarding and jump hosts | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-11/` in your own repository:

```text
day-11/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-11
git add day-11/
git commit -m "day-11: ssh deep dive"
git push -u origin day-11
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

## 18. Personal Learning Journal — 🔐 Day 11 - DevSecOps Fundamentals, OWASP Threat Dragon & GitHub Secrets

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

25 July 2026

---

### 🚀 Introduction

Today, I stepped into the world of **DevSecOps**, where security is integrated into every stage of the software development lifecycle instead of being treated as an afterthought.

I learned about **threat modeling**, **secret management**, **vulnerability scanning**, and best practices for securing Git repositories and applications.

---

### 📚 Topics Covered

- OWASP Threat Dragon
- AI for Threat Modeling & Risk Mitigation
- `.gitignore`
- `.env` Files
- GitLeaks
- Trivy
- Vulnerabilities & Security Issues
- GitHub Secrets
- GitHub Environment Variables

---

### 🛡️ What is DevSecOps?

**DevSecOps** stands for:

- **Dev** → Development
- **Sec** → Security
- **Ops** → Operations

The goal is to integrate **security into every phase** of software development instead of checking security only before deployment.

##### Benefits

- Early vulnerability detection
- Secure CI/CD pipelines
- Reduced security risks
- Faster and safer deployments

---

### 🐉 OWASP Threat Dragon

**OWASP Threat Dragon** is an open-source threat modeling tool that helps identify security risks during the application design phase.

Instead of finding vulnerabilities after deployment, Threat Dragon helps developers think about possible attacks while designing the system.

---

#### Why Use Threat Dragon?

- Identify security threats early
- Visualize application architecture
- Generate threat models
- Improve secure system design
- Reduce security vulnerabilities

---

#### Basic Workflow

```text
Application Architecture
          │
          ▼
Threat Modeling
          │
          ▼
Identify Risks
          │
          ▼
Suggest Mitigations
          │
          ▼
Secure Application Design
```

---

### 🤖 Using AI for Threat Modeling

AI can assist in security analysis by:

- Identifying possible attack vectors
- Suggesting security controls
- Prioritizing vulnerabilities
- Generating mitigation plans
- Creating security documentation

Example:

Instead of manually analyzing an API, AI can recommend:

- Authentication
- Authorization
- Input Validation
- Encryption
- Rate Limiting

---

### 📄 .gitignore

The `.gitignore` file tells Git which files and folders should **not** be tracked.

Example:

```gitignore
.env
node_modules/
*.log
__pycache__/
venv/
```

##### Why Use `.gitignore`?

- Prevent committing sensitive files
- Ignore temporary files
- Keep repositories clean
- Reduce repository size

---

### 🔐 .env File

A `.env` file stores sensitive configuration values.

Example

```env
DATABASE_URL=mysql://localhost
AWS_ACCESS_KEY=xxxxxxxx
AWS_SECRET_KEY=xxxxxxxx
API_KEY=xxxxxxxx
```

##### Why use `.env`?

- Keeps secrets separate from source code
- Easy configuration across environments
- Prevents accidental exposure

⚠️ Never commit your `.env` file to GitHub.

---

### 🔍 GitLeaks

GitLeaks is an open-source security tool that scans Git repositories for leaked secrets.

It can detect:

- AWS Keys
- GitHub Tokens
- API Keys
- Passwords
- SSH Keys
- Database Credentials

##### Install

```bash
brew install gitleaks
```

##### Scan Repository

```bash
gitleaks detect
```

##### Benefits

- Prevents secret leaks
- Improves repository security
- Can be integrated into CI/CD

---

### 🛡️ Trivy

**Trivy** is an open-source vulnerability scanner.

It scans:

- Docker Images
- Git Repositories
- Kubernetes
- File Systems
- Infrastructure as Code (IaC)

---

#### Install

```bash
brew install trivy
```

---

#### Scan a Docker Image

```bash
trivy image nginx:latest
```

---

#### Scan Current Directory

```bash
trivy fs .
```

---

#### Why Trivy?

- Detect vulnerabilities
- Scan secrets
- Scan misconfigurations
- Generate security reports

---

### 🚨 What are Vulnerabilities?

A vulnerability is a weakness in software, systems, or infrastructure that attackers can exploit.

Examples include:

- Weak passwords
- Outdated software
- SQL Injection
- Cross-Site Scripting (XSS)
- Hardcoded secrets
- Misconfigured permissions
- Unpatched operating systems

---

### 🔐 GitHub Secrets

GitHub Secrets securely store sensitive information used in GitHub Actions workflows.

Examples:

- AWS Access Keys
- API Keys
- Docker Credentials
- Database Passwords

Example:

```yaml
${{ secrets.AWS_ACCESS_KEY_ID }}
```

##### Benefits

- Encrypted storage
- Hidden in workflow logs
- Secure CI/CD authentication

---

### 🌍 GitHub Environment Variables

Environment Variables store non-sensitive configuration values.

Example:

```yaml
env:
  APP_NAME: DevOpsApp
  ENVIRONMENT: Production
```

Access in GitHub Actions:

```yaml
echo $APP_NAME
```

##### Difference Between Secrets & Environment Variables

| GitHub Secrets | Environment Variables |
|----------------|-----------------------|
| Encrypted | Plain text |
| Used for sensitive data | Used for configuration |
| Hidden in logs | Visible if printed |
| API Keys, Tokens | App Name, Environment |

---

### 🔒 Security Best Practices

- Never commit `.env` files.
- Use `.gitignore` for sensitive files.
- Store credentials in GitHub Secrets.
- Regularly scan repositories with GitLeaks.
- Scan images and files with Trivy.
- Perform threat modeling before development.
- Rotate credentials periodically.
- Follow the Principle of Least Privilege (PoLP).

---

### 🎯 Key Takeaways

- Learned the basics of DevSecOps.
- Explored OWASP Threat Dragon for threat modeling.
- Understood how AI can assist in identifying risks and suggesting mitigations.
- Learned the purpose of `.gitignore` and `.env` files.
- Used GitLeaks to detect leaked secrets.
- Learned how Trivy scans for vulnerabilities and misconfigurations.
- Understood common software security vulnerabilities.
- Explored GitHub Secrets and Environment Variables for secure configuration management.

---

### 📈 Progress

- ✅ Day 11 – DevSecOps Fundamentals, OWASP Threat Dragon & GitHub Security

**Completed:** 11 / 90 Days 🚀

---

> **"Security is not a feature you add at the end—it's a mindset you build from the beginning."** 🔐


---

[← Day 10](../day-10/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 12 →](../day-12/README.md)
