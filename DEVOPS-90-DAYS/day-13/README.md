# Day 13 — Linux Hardening & Security Baseline

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 14 →](../day-14/README.md)

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

- [ ] Apply a practical hardening baseline
- [ ] Use fail2ban, auditd, unattended-upgrades
- [ ] Audit with Lynis

## 2. Prerequisites

- Days 4-12.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Hardening layers

Patch, minimise software, restrict access (SSH, sudo), firewall, log/audit, file integrity and backups. Align with CIS Benchmarks.

### 3.2 Tools

`fail2ban` bans brute-force IPs, `auditd` records security events, `unattended-upgrades` automates patches, `lynis` scans and scores.

### 3.3 Secrets on hosts

Don't store secrets in shell history or world-readable files; use environment injection from a secrets manager.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `sudo lynis audit system` and note the hardening index.
2. [ ] Install and configure fail2ban for sshd (maxretry 3, bantime 1h).
3. [ ] Enable unattended-upgrades for security updates.
4. [ ] Add an auditd rule to watch `/etc/passwd`.
5. [ ] Re-run lynis and compare scores.

## 5. Real-World Scenario

> A pen-test report says: 'Password auth enabled, no patching, no brute-force protection.' Fix all three and provide evidence.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt install -y lynis fail2ban auditd unattended-upgrades
sudo lynis audit system | tail -30
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
sudo ausearch -k passwd_changes
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 13 – Linux Volume Management (LVM) — Challenge Brief

#### Task
Learn LVM to manage storage flexibly – create, extend, and mount volumes.

**Watch First:** [Linux LVM Tutorial](https://youtu.be/Evnf2AAt7FQ?si=ncnfQYySYtK_2K3c)

---

#### Expected Output
- A markdown file: `day-13-lvm.md`
- Screenshots of command outputs

---

#### Before You Start

Switch to root user:
```bash
sudo -i
```
or
```bash
sudo su
```
No spare disk? Create a virtual one (watch the tutorial):
```bash
dd if=/dev/zero of=/tmp/disk1.img bs=1M count=1024
losetup -fP /tmp/disk1.img
losetup -a   # Note the device name (e.g., /dev/loop0)
```

---

#### Challenge Tasks

##### Task 1: Check Current Storage
Run: `lsblk`, `pvs`, `vgs`, `lvs`, `df -h`

##### Task 2: Create Physical Volume
```bash
pvcreate /dev/sdb   # or your loop device
pvs
```

##### Task 3: Create Volume Group
```bash
vgcreate devops-vg /dev/sdb
vgs
```

##### Task 4: Create Logical Volume
```bash
lvcreate -L 500M -n app-data devops-vg
lvs
```

##### Task 5: Format and Mount
```bash
mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data
```

##### Task 6: Extend the Volume
```bash
lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data
```

---

#### Documentation

Create `day-13-lvm.md` with:
- Commands used
- Screenshots of outputs
- What you learned (3 points)

---

#### Submission
1. Add your `day-13-lvm.md` to `2026/day-13/`
2. Commit and push

---

#### Learn in Public

Share your LVM progress on LinkedIn.

```
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
```

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 13 – Linux Volume Management (LVM) — Notes & Solution

#### Task
Learn LVM to manage storage flexibly – create, extend, and mount volumes.

---

📌 ### Task 1: Check Current Storage
Run: `lsblk`, `pvs`, `vgs`, `lvs`, `df -h`
<img width="1914" height="833" alt="Screenshot 2026-08-04 215521" src="https://github.com/user-attachments/assets/3443e10a-f5f9-42e6-a51e-bba2996c1441" />

📌 ### Task 2: Create Physical Volume
```bash
pvcreate /dev/sdb   # or your loop device
pvs
```
<img width="1906" height="451" alt="Screenshot 2026-08-04 222421" src="https://github.com/user-attachments/assets/7c55695d-9c89-47ee-a041-98982e3b5613" />

📌 ### Task 3: Create Volume Group
```bash
vgcreate devops-vg /dev/sdb
vgs
```
<img width="885" height="193" alt="Screenshot 2026-08-04 222530" src="https://github.com/user-attachments/assets/80e79c9f-3c7f-48d4-810f-944991a87d9c" />

📌 ### Task 4: Create Logical Volume
```bash
lvcreate -L 500M -n app-data devops-vg
lvs
```
<img width="1341" height="167" alt="Screenshot 2026-08-04 222611" src="https://github.com/user-attachments/assets/cefe70bf-aef6-4d93-8dbc-f2af5e1ed37b" />

📌 ### Task 5: Format and Mount
```bash
mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data
```
<img width="1919" height="575" alt="Screenshot 2026-08-04 222840" src="https://github.com/user-attachments/assets/a9d6c9c1-c1cc-4c7a-8c1e-128771beb898" />

📌 ### Task 6: Extend the Volume
```bash
lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data
```
<img width="1633" height="371" alt="Screenshot 2026-08-04 223102" src="https://github.com/user-attachments/assets/bb3f998a-9086-420e-a87a-ef7045a7a140" />

---

🛠️ ## Commands used
```bash
lsblk
pvcreate /dev/loop21
pvs

vgcreate devops-vg /dev/loop21
vgs

lvcreate -L 500M -n app-data devops-vg
lvs

mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data

lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data

lvdisplay
vgdisplay
pvdisplay

```
---
#### What I Learned
- Learned the LVM storage hierarchy: Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV).
- Learned how to convert raw disks into Physical Volumes using `pvcreate`.
- Learned how to combine multiple Physical Volumes into a single Volume Group using `vgcreate`.
- Learned how to create and manage Logical Volumes using `lvcreate`.
- Learned how to format and mount Logical Volumes using the ext4 filesystem.
- Learned the difference between mounting a Logical Volume and mounting a disk directly.
- Learned how to verify storage configuration using `pvs`, `vgs`, `lvs`, and `lsblk`.
- Learned how to inspect detailed LVM information using `pvdisplay`, `vgdisplay`, and `lvdisplay`.
- Learned how to safely unmount storage using `umount`.
- Learned how to extend a Logical Volume dynamically using `lvextend` and resize the filesystem using `resize2fs`.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 15-item hardening checklist and mark which you've applied. | You can demonstrate, without notes: *apply a practical hardening baseline* — with evidence committed to `day-13/`. |
| 2 | Disable unused services with `systemctl disable`. | You can demonstrate, without notes: *use fail2ban, auditd, unattended-upgrades* — with evidence committed to `day-13/`. |
| 3 | Compare lynis score before/after. | You can demonstrate, without notes: *audit with Lynis* — with evidence committed to `day-13/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| fail2ban bans yourself | Whitelist your IP in `ignoreip`; unban with `fail2ban-client unban`. |
| Auditd log huge | Tune rules and rotate logs. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Defence in depth: patch, least privilege, minimal attack surface, logging. Record changes in version control.
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

1. What is CIS Benchmark?
2. How does fail2ban work?
3. Why unattended-upgrades?
4. What is auditd for?
5. **Scenario:** A pen-test report says: 'Password auth enabled, no patching, no brute-force protection. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I produce before/after hardening evidence? | ☐ | ☐ | ☐ | ☐ |
| Can I explain defence in depth? | ☐ | ☐ | ☐ | ☐ |
| Can I unban an IP? | ☐ | ☐ | ☐ | ☐ |
| Apply a practical hardening baseline | ☐ | ☐ | ☐ | ☐ |
| Use fail2ban, auditd, unattended-upgrades | ☐ | ☐ | ☐ | ☐ |
| Audit with Lynis | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-13/` in your own repository:

```text
day-13/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-13
git add day-13/
git commit -m "day-13: linux hardening & security baseline"
git push -u origin day-13
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

## 18. Personal Learning Journal — 🔐 Day 13 - DevSecOps Pipeline, Security Automation & Python Projects

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

27 July 2026

---

### 🚀 Introduction

Today, I explored the **DevSecOps pipeline**, understanding how security is integrated into every stage of the Software Development Lifecycle (SDLC). I learned about security scanning tools used during Build, Test, Deploy, and Monitor phases, completed multiple Python projects, created a shell script for vulnerability scanning, and revised common DevOps interview questions.

---

### 📚 Topics Covered

#### 🔐 DevSecOps Architecture
- Secure Software Development Lifecycle (SSDLC)
- Build, Test, Deploy & Monitor Pipeline
- SAST
- SCA
- Secrets Scanning
- DAST
- Artifact Scanning
- Image Scanning
- Infrastructure as Code (IaC) Security
- Policy Checks
- Compliance Controls
- Auditing & Monitoring

#### 🐍 Python
- Built 2–3 practice projects
- Improved problem-solving using Python

#### 📜 Shell Scripting
- Automated vulnerability scanning
- GitLeaks integration

#### 💼 Interview Preparation
- Basic DevOps interview questions
- Linux, Git & AWS revision

---

### 🏗️ DevSecOps Pipeline

A DevSecOps pipeline integrates **security checks into every stage** of software development instead of testing only at the end.

```text
Developer
     │
     ▼
 Source Code
     │
     ▼
   BUILD
(SAST • SCA • Secret Scan)
     │
     ▼
    TEST
(DAST • Artifact Scan)
     │
     ▼
   DEPLOY
(IaC Security • Policy Checks • Compliance)
     │
     ▼
   MONITOR
(Auditing • Logging • Alerts)
```

---

### 🔍 Build Stage Security

During the Build stage, the source code is scanned before creating application artifacts.

##### SAST (Static Application Security Testing)

Analyzes source code without executing it.

Detects:
- SQL Injection
- Cross-Site Scripting (XSS)
- Hardcoded Credentials
- Buffer Overflow
- Coding Mistakes

##### SCA (Software Composition Analysis)

Scans third-party libraries and dependencies for known vulnerabilities.

Example:
- Outdated npm packages
- Vulnerable Python libraries
- Insecure Java dependencies

##### Secret Scanning

Detects accidentally committed secrets such as:
- AWS Access Keys
- GitHub Tokens
- API Keys
- Database Passwords

---

### 🧪 Test Stage Security

##### DAST (Dynamic Application Security Testing)

Tests a running application from an attacker's perspective.

Finds:
- Authentication Issues
- Broken Access Control
- XSS
- SQL Injection

##### Artifact Scanning

Scans generated application packages before deployment.

Examples:
- Docker Images
- JAR Files
- ZIP Packages

---

### 🚀 Deploy Stage Security

##### IaC Security

Scans Infrastructure as Code files (Terraform, CloudFormation, Kubernetes YAML) for misconfigurations.

##### Policy Checks

Ensures cloud resources comply with security policies.

Examples:
- No public S3 buckets
- Encrypted storage
- Restricted security groups

##### Compliance Controls

Verifies compliance with standards such as:
- ISO 27001
- SOC 2
- PCI DSS
- HIPAA

---

### 📊 Monitor Stage

After deployment, continuous monitoring helps detect suspicious activities.

Includes:
- Security Audits
- Log Monitoring
- Alerts
- Incident Detection
- Continuous Compliance

---

### 🐍 Python Practice Projects

Today, I completed multiple Python practice projects to strengthen my programming fundamentals.

Skills practiced:
- Functions
- Classes
- File Handling
- Automation
- Problem Solving

---

### 📜 Shell Script - Security Scanner

Created a shell script that automates repository security checks.

##### Features

- Scan repository using GitLeaks
- Scan filesystem using Trivy
- Display vulnerability summary
- Generate reports

Example:

```bash
#!/bin/bash

echo "Running GitLeaks Scan..."
gitleaks detect

echo "Running Trivy Scan..."
trivy fs .

echo "Security Scan Completed."
```

Run the script:

```bash
chmod +x security_scan.sh
./security_scan.sh
```

---

### 🔐 GitLeaks

Used to detect leaked secrets inside Git repositories.

```bash
gitleaks detect
```

---

### 🛡️ Trivy

Scans:
- File Systems
- Docker Images
- Kubernetes
- Git Repositories

```bash
trivy fs .
```

---

### 💼 Interview Preparation

Revised commonly asked DevOps interview topics including:

- Linux Basics
- Git Commands
- Git Branching
- AWS Fundamentals
- IAM
- EC2
- Networking Basics
- DevSecOps Concepts

---

### 🎯 Key Takeaways

- Understood the complete DevSecOps architecture.
- Learned where different security tools fit into the CI/CD pipeline.
- Practiced Python through mini-projects.
- Built a shell script to automate vulnerability and secret scanning.
- Revised core DevOps interview questions.

---

### 📈 Progress

- ✅ Day 13 – DevSecOps Pipeline, Security Automation & Python Practice

**Completed:** 13 / 90 Days 🚀

---

> **"Security is everyone's responsibility. Automating it makes software faster, safer, and more reliable."** 🔐🚀

## 19. Challenge Notes — Day 13: NAT Gateway, Internet Gateway, and Bastion Host

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

---

#### 1. Internet Gateway (IGW)

##### What is an Internet Gateway?
- A **horizontally scaled**, **redundant**, and **highly available** AWS service that enables communication between instances in your VPC and the **internet**.
- It supports both **IPv4** and **IPv6** traffic.




[![](https://img.youtube.com/vi/jgR16ACHw2M/0.jpg)](https://www.youtube.com/watch?v=jgR16ACHw2M)

[Watch the video](https://www.youtube.com/watch?v=jgR16ACHw2M)

##### Why do we need an Internet Gateway?
- To allow resources in a **public subnet** to:
  - Initiate **outbound** connections to the internet.
  - Receive **inbound** connections (for example, users accessing a web server).

##### How it works:
- Attach an Internet Gateway to your **VPC**.
- Modify the **route table** associated with your **public subnet** to include a route to the Internet Gateway for **0.0.0.0/0** (all IPv4 traffic) or **::/0** (all IPv6 traffic).
- Instances must have a **Public IP** or an **Elastic IP** assigned to be reachable from the internet.

---

#### 2. NAT Gateway

##### What is a NAT Gateway?
- A **Network Address Translation** (NAT) service that allows **instances in private subnets** to **connect to the internet**, while **preventing the internet from initiating connections back** to them.

##### Why do we need a NAT Gateway if we have an Internet Gateway?
| Scenario | Behavior |
|:---|:---|
| Instance in a **public subnet** with a public IP | Connects directly to the internet via Internet Gateway. |
| Instance in a **private subnet** without a public IP | Cannot connect to the internet directly even though the VPC has an IGW. Needs NAT Gateway for outbound traffic. |

**Summary:**  
- Private instances (no public IP) → NAT Gateway → Internet Gateway → Internet

##### Types of NAT Gateways
| Type | Description |
|:---|:---|
| Public NAT Gateway | Deployed in a public subnet. It uses an Elastic IP. |
| Private NAT Gateway | Deployed in a private subnet. Does not need an Elastic IP. Used for internal VPC-to-VPC communication without traversing the internet. |

---

##### Key Points about NAT Gateway:
- **Outbound connections only** from private instances.
- **Cannot receive inbound** internet traffic.
- **Requires** an **Elastic IP address** (for Public NAT Gateway).
- **Automatically scales** to accommodate your traffic.
- **More secure** than assigning public IPs to private instances.

---

##### NAT Gateway Related Quotas
| Quota | Default |
|:---|:---|
| Max number of EIPs (Elastic IPs) per account | Limited; must be available to create NAT Gateway |
| Private NAT Gateway: Max number of private IPv4 addresses | 8 |
| Public NAT Gateway: Max number of Elastic IPs attached | 2 (can request increase) |

---

#### 3. Bastion Host (Jump Box)

##### What is a Bastion Host?
- A **special-purpose instance** that acts as a **gateway** for accessing instances inside a **private subnet**.
- **Deployed in a public subnet** with a **public IP**.

##### Why do we need a Bastion Host?
- Private instances **cannot be accessed directly from the internet**.
- The Bastion Host acts as a **controlled entry point** to the private environment via **SSH (Linux)** or **RDP (Windows)**.

---

##### Security Best Practices for Bastion Hosts
| Practice | Description |
|:---|:---|
| Use restrictive security groups | Allow inbound SSH (TCP 22) or RDP (TCP 3389) only from **your known IPs**. |
| Disable password login | Enforce **key-based authentication** (SSH keys). |
| Enable logging | Enable session logging (e.g., using Systems Manager Session Manager). |
| Harden the server | Regularly patch and monitor the Bastion Host. |

---

##### What happens if you don't restrict Bastion Host Security Groups properly?
- **High Risk of Attack**:
  - Open SSH or RDP ports to `0.0.0.0/0` (anyone on the internet) makes it vulnerable to brute-force and hacking attempts.
  - Attackers could compromise the Bastion Host and then move laterally inside your private network (a technique called "pivoting").

---

#### 4. Internet Gateway vs NAT Gateway: Key Differences

| Feature                     | Internet Gateway (IGW)            | NAT Gateway                         |
|------------------------------|-----------------------------------|-------------------------------------|
| Purpose                      | Bidirectional internet access     | Outbound internet access only       |
| Type of instances it serves  | Instances with public IP          | Instances without public IP         |
| Direction of traffic         | Inbound and outbound              | Outbound only                       |
| Associated with              | Public subnet route table         | Private subnet route table          |
| Elastic IP needed            | No                                | Yes (for Public NAT Gateway)        |
| Supports private connectivity | No | Yes (Private NAT Gateway supports VPC-to-VPC without public internet) |

---

#### 5. Practical Lab Activities for Class

##### Setup
- Create a **VPC** with:
  - 1 Public Subnet
  - 1 Private Subnet

##### Internet Gateway Lab
- Attach an **Internet Gateway** to the VPC.
- Route the **public subnet's** traffic to the Internet Gateway.
- Launch an EC2 instance (public IP) in the public subnet and confirm internet access.

##### NAT Gateway Lab
- Create a **NAT Gateway** in the public subnet.
- Route the **private subnet's** traffic to the NAT Gateway.
- Launch an EC2 instance (without a public IP) in the private subnet.
- SSH into the instance through the Bastion Host or Systems Manager and verify outbound internet access (e.g., `yum update`).

##### Bastion Host Lab
- Deploy a **Bastion Host** EC2 instance in the public subnet.
- Open inbound SSH port **only from your IP address**.
- SSH into the Bastion Host.
- From Bastion Host, SSH into the private EC2 instance.

---

### Final Summary for Day 13 🚀

- **Internet Gateway** provides direct public access to instances with public IPs.
- **NAT Gateway** allows private instances to reach out to the internet **securely**.
- **Bastion Host** provides **secure remote access** to private instances without exposing them to the internet.
- **Security Groups and Routing are Critical** for proper and secure architecture.
- Always **restrict traffic tightly** to enhance security posture.

---

### 📢 Note:
✅ You can also replace the Bastion Host with **AWS Systems Manager Session Manager** (for even better security — no open SSH ports at all).

### Attachments

- [Day 13 - NAT Gateway, Internet Gateway, and Bastion Host.pdf](Day%2013%20-%20NAT%20Gateway%2C%20Internet%20Gateway%2C%20and%20Bastion%20Host.pdf)

## 20. Cohort Practice — Day 13: Linux Volume Management (LVM)

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Learn LVM to manage storage flexibly – create, extend, and mount volumes.

**Watch First:** [Linux LVM Tutorial](https://youtu.be/Evnf2AAt7FQ?si=ncnfQYySYtK_2K3c)

---

#### Expected Output
- A markdown file: `day-13-lvm.md`
- Screenshots of command outputs

---

#### Before You Start

Switch to root user:
```bash
sudo -i
```
or
```bash
sudo su
```
No spare disk? Create a virtual one (watch the tutorial):
```bash
dd if=/dev/zero of=/tmp/disk1.img bs=1M count=1024
losetup -fP /tmp/disk1.img
losetup -a   # Note the device name (e.g., /dev/loop0)
```

---

#### Challenge Tasks

##### Task 1: Check Current Storage
Run: `lsblk`, `pvs`, `vgs`, `lvs`, `df -h`

##### Task 2: Create Physical Volume
```bash
pvcreate /dev/sdb   # or your loop device
pvs
```

##### Task 3: Create Volume Group
```bash
vgcreate devops-vg /dev/sdb
vgs
```

##### Task 4: Create Logical Volume
```bash
lvcreate -L 500M -n app-data devops-vg
lvs
```

##### Task 5: Format and Mount
```bash
mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data
```

##### Task 6: Extend the Volume
```bash
lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data
```

---

#### Documentation

Create `day-13-lvm.md` with:
- Commands used
- Screenshots of outputs
- What you learned (3 points)

---

#### Submission
1. Add your `day-13-lvm.md` to `2026/day-13/`
2. Commit and push

---

#### Learn in Public

Share your LVM progress on LinkedIn.

```
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
```

Happy Learning!
**TrainWithShubham**

## 21. Hands-on Project — Day 13: S3 Bucket + Versioning & Lifecycle

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Amazon S3 with Versioning & Lifecycle** using Terraform.  
You’ll provision an S3 bucket with **server-side encryption**, **public access block**, **versioning**, and **lifecycle rules** (transition/expiration/noncurrent/abort-incomplete).

---

#### 🎯 Learning Goals
- Enable **bucket versioning** and understand object/version behavior.  
- Configure **lifecycle rules** for cost optimization and hygiene: transitions to IA/Glacier, expiration, noncurrent cleanup, and abort incomplete uploads.  
- Use **prefix/tag filters** to scope lifecycle behavior (e.g., `data/` vs `logs/`).  
- Apply **security** best practices: encryption + block public access.  

---

#### 🛠️ Lab Setup & Tasks

```text
1) Initialize & plan
   terraform -chdir=terraform init
   terraform -chdir=terraform plan -var="bucket_name_prefix=devopsday13-demo"

2) Apply
   terraform -chdir=terraform apply -auto-approve -var="bucket_name_prefix=devopsday13-demo"

3) (Optional) Put and version objects
   aws s3 cp ./sample.txt s3://<bucket-name>/data/sample.txt
   aws s3 cp ./sample.txt s3://<bucket-name>/logs/app.log

4) Inspect lifecycle & versions
   aws s3api list-object-versions --bucket <bucket-name>

5) Destroy when done
   terraform -chdir=terraform destroy -auto-approve
```

---

#### 💡 Challenge
- Add a **tag-based** lifecycle rule (e.g., `{"class":"archive"}` → transition to Glacier Deep Archive at 30 days).  
- Wire an **access log bucket** and enable **server access logging** for the main bucket.  
- Switch encryption to **SSE-KMS** with a customer-managed key.  

---

#### ✅ Checklist
- [ ] Bucket created with encryption & public access blocked  
- [ ] Versioning enabled and verified with multiple object versions  
- [ ] Lifecycle transitions & expirations configured and planned  
- [ ] Optional: tag-based rule / access logging / SSE-KMS implemented  

---

#### 📌 Commit
```bash
git add day13-s3-versioning-lifecycle
git commit -m "day13: S3 bucket with versioning + lifecycle (transition, expiration, noncurrent, abort)"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/providers.tf](files/hands-on-projects/terraform/providers.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 14 →](../day-14/README.md)
