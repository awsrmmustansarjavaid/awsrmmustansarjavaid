# Day 15 — Bash Scripting: Variables, Conditionals & Exit Codes

[← Day 14](../day-14/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 16 →](../day-16/README.md)

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

- [ ] Write safe, readable Bash scripts
- [ ] Use variables, quoting, conditionals and exit codes
- [ ] Apply ShellCheck

## 2. Prerequisites

- Day 3.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Script basics

Shebang `#!/usr/bin/env bash`, `chmod +x`, variables `NAME=value`, always quote `"$var"`. `$?` is the last exit code; 0 = success.

### 3.2 Conditionals

`[[ ]]` tests for strings/numbers/files (`-f`, `-d`, `-z`, `-eq`). Short-circuit `&&`/`||`.

### 3.3 Safety

Use `set -euo pipefail`, `trap` for cleanup, and lint with `shellcheck`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `hello.sh` printing name and date.
2. [ ] Create `check_service.sh <name>` that reports active/inactive and exits 0/1.
3. [ ] Add input validation and usage message.
4. [ ] Run `shellcheck` and fix every warning.
5. [ ] Add `set -euo pipefail` and demonstrate what it prevents.

## 5. Real-World Scenario

> A deploy script ran `rm -rf $DIR/*` with an unset variable and deleted `/*`. Rewrite it safely and explain each protection.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
#!/usr/bin/env bash
set -euo pipefail
name="${1:?Usage: $0 <service>}"
if systemctl is-active --quiet "$name"; then
  echo "$name is running"; exit 0
else
  echo "$name is NOT running" >&2; exit 1
fi
# Lint
shellcheck check_service.sh
# Safe delete pattern
[[ -n "${DIR:-}" && -d "$DIR" ]] && rm -rf -- "${DIR:?}"/*
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 15 – Networking Concepts: DNS, IP, Subnets & Ports

#### Task
Build on Day 14 by understanding the building blocks of networking every DevOps engineer must know.

You will:
- Understand how **DNS** resolves names to IPs
- Learn **IP addressing** (IPv4, public vs private)
- Break down **CIDR notation** and **subnetting** basics
- Know common **ports** and why they matter

This is concept-focused — research, understand, and document in your own words.

---

#### Expected Output
- A markdown file: `day-15-networking-concepts.md`

---

#### Challenge Tasks

##### Task 1: DNS – How Names Become IPs
1. Explain in 3–4 lines: what happens when you type `google.com` in a browser?
2. What are these record types? Write one line each:
   - `A`, `AAAA`, `CNAME`, `MX`, `NS`
3. Run: `dig google.com` — identify the A record and TTL from the output

---

##### Task 2: IP Addressing
1. What is an IPv4 address? How is it structured? (e.g., `192.168.1.10`)
2. Difference between **public** and **private** IPs — give one example of each
3. What are the private IP ranges?
   - `10.x.x.x`, `172.16.x.x – 172.31.x.x`, `192.168.x.x`
4. Run: `ip addr show` — identify which of your IPs are private

---

##### Task 3: CIDR & Subnetting
1. What does `/24` mean in `192.168.1.0/24`?
2. How many usable hosts in a `/24`? A `/16`? A `/28`?
3. Explain in your own words: why do we subnet?
4. Quick exercise — fill in:

| CIDR | Subnet Mask | Total IPs | Usable Hosts |
|------|-------------|-----------|--------------|
| /24  | ?           | ?         | ?            |
| /16  | ?           | ?         | ?            |
| /28  | ?           | ?         | ?            |

---

##### Task 4: Ports – The Doors to Services
1. What is a port? Why do we need them?
2. Document these common ports:

| Port | Service |
|------|---------|
| 22   | ?       |
| 80   | ?       |
| 443  | ?       |
| 53   | ?       |
| 3306 | ?       |
| 6379 | ?       |
| 27017| ?       |

3. Run `ss -tulpn` — match at least 2 listening ports to their services

---

##### Task 5: Putting It Together
Answer in 2–3 lines each:
- You run `curl http://myapp.com:8080` — what networking concepts from today are involved?
- Your app can't reach a database at `10.0.1.50:3306` — what would you check first?

---

#### Documentation

Create `day-15-networking-concepts.md` with:
- Your answers to each task
- Command outputs from `dig` and `ss`
- The filled CIDR table
- What you learned (3 key points)

---

#### Submission
1. Add `day-15-networking-concepts.md` to `2026/day-15/`
2. Commit and push to your fork

---

#### Learn in Public

Share what you learned about DNS, subnets, or ports on LinkedIn.

```
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
```

Happy Learning!
**TrainWithShubham**

---

### 7.2 🌐 Day 15 – Networking Concepts: DNS, IP Addressing, Subnets & Ports

#### 🎯 Objective

Today, I learned some of the most important networking concepts that every DevOps Engineer should understand. Modern applications communicate over networks, so knowing how DNS, IP addresses, subnetting, and ports work is essential for deploying, troubleshooting, and maintaining applications.

In this hands-on session, I explored how a domain name is converted into an IP address, how devices communicate using IP addresses, why subnetting is important, and how ports allow multiple services to run on the same server.

---

#### 📌 Task 1 – DNS (Domain Name System)

#### What is DNS?

The **Domain Name System (DNS)** is often called the **phonebook of the Internet**.

Humans find it easier to remember names like:

```
google.com
github.com
amazon.com
```

But computers communicate using **IP addresses**, such as:

```
142.250.183.110
```

DNS translates a domain name into its corresponding IP address so that your browser knows where to connect.

---

#### 🌍 What Happens When You Type `google.com` in a Browser?

1. You enter **google.com** in your browser.
2. The browser asks a **DNS server** for Google's IP address.
3. The DNS server replies with Google's IP address.
4. The browser creates a **TCP connection** to that IP address.
5. The browser sends an **HTTP/HTTPS request**.
6. Google's web server processes the request.
7. The server returns the webpage to your browser.
8. The browser displays the webpage.

##### 📖 Real-Life Example

Think of DNS like your mobile phone contacts.

* You search for **"Tej"**
* Your phone finds **Tej's phone number**
* Then the call is made

Similarly,

* You type **google.com**
* DNS finds Google's IP address
* Your browser connects to that IP

---

#### 📚 Common DNS Record Types

##### A Record

Maps a domain name to an **IPv4 address**.

Example:

```
google.com → 142.250.183.110
```

---

##### AAAA Record

Maps a domain name to an **IPv6 address**.

Used when the website supports IPv6 networking.

---

##### CNAME Record

Creates an alias for another domain.

Example:

```
www.example.com
          ↓
example.com
```

Instead of maintaining two separate records, both names point to the same destination.

---

##### MX Record

Specifies which mail server receives emails for a domain.

Example:

```
gmail.com
```

Its MX record points to Google's mail servers.

---

##### NS Record

Specifies the authoritative DNS servers responsible for managing DNS records of a domain.

---

#### 🖥️ Commands Used

```bash
dig google.com
```

or

```bash
nslookup google.com
```

##### 🔍 Observation

From the output, I observed:

* The A Record (IPv4 Address)
* The TTL (Time To Live)

TTL tells DNS servers how long they can cache the DNS response before requesting it again.

---

#### 📌 Task 2 – IP Addressing

#### What is an IP Address?

An **IP Address (Internet Protocol Address)** is a unique address assigned to every device connected to a network.

It allows devices to identify and communicate with each other.

Example:

```
192.168.1.10
```

Just as every house has a postal address, every device on a network has an IP address.

---

#### IPv4

IPv4 uses **32 bits** and consists of four numbers separated by dots.

Example:

```
192.168.1.10
```

---

#### Public IP vs Private IP

##### 🌍 Public IP

A Public IP is accessible over the Internet.

It is assigned by your Internet Service Provider (ISP).

Example:

```
34.125.90.10
```

Anyone on the Internet can communicate with this IP (if allowed by firewall rules).

---

##### 🏠 Private IP

Private IP addresses are used only within internal networks.

They cannot be accessed directly from the Internet.

Example:

```
172.31.17.152
```

AWS EC2 instances usually receive private IP addresses inside a VPC.

---

#### Private IP Address Ranges

```
10.0.0.0/8

172.16.0.0 – 172.31.255.255

192.168.0.0/16
```

These ranges are reserved for private networks.

---

#### Command Used

```bash
ip addr show
```

or

```bash
hostname -I
```

##### 🔍 Observation

My EC2 instance is using a **private IP address**, which is used for communication within the AWS Virtual Private Cloud (VPC).

---

#### 📌 Task 3 – CIDR & Subnetting

#### What is CIDR?

CIDR stands for:

**Classless Inter-Domain Routing**

CIDR determines:

* Network size
* Number of available IP addresses
* Network and host portions of an IP address

---

#### What Does `/24` Mean?

Example:

```
192.168.1.0/24
```

This means:

* First **24 bits** represent the **network**
* Remaining **8 bits** represent **host addresses**

A `/24` network contains:

* Total IPs → **256**
* Usable Host IPs → **254**

(Two addresses are reserved: one for the network address and one for the broadcast address.)

---

#### Why Do We Use Subnetting?

Subnetting divides one large network into smaller, more manageable networks.

##### Benefits

* 🔒 Improves security by isolating different parts of the network.
* ⚡ Reduces unnecessary broadcast traffic, improving performance.
* 🛠️ Makes networks easier to manage and troubleshoot.
* 📈 Allows efficient use of available IP addresses.

In cloud platforms like AWS, subnetting helps separate public and private resources securely.

---

#### CIDR Reference Table

| CIDR | Subnet Mask     | Total IPs | Usable Hosts |
| ---- | --------------- | --------: | -----------: |
| /24  | 255.255.255.0   |       256 |          254 |
| /16  | 255.255.0.0     |    65,536 |       65,534 |
| /28  | 255.255.255.240 |        16 |           14 |

---

#### 📌 Task 4 – Ports

#### What is a Port?

A **Port** is a logical communication endpoint used by applications.

A server has one IP address but can run many applications simultaneously because each application listens on a different port.

Think of:

* IP Address = Apartment Building
* Port = Apartment Number

The IP identifies the building, while the port identifies the specific application inside it.

---

#### Commonly Used Ports

|  Port | Service | Purpose                 |
| ----: | ------- | ----------------------- |
|    22 | SSH     | Secure remote login     |
|    53 | DNS     | Domain name resolution  |
|    80 | HTTP    | Unencrypted web traffic |
|   443 | HTTPS   | Secure web traffic      |
|  3306 | MySQL   | MySQL Database          |
|  6379 | Redis   | Redis Cache             |
| 27017 | MongoDB | MongoDB Database        |

---

#### Command Used

```bash
ss -tulpn
```

##### 🔍 Observation

This command displays:

* Listening ports
* Running services
* Protocol (TCP/UDP)
* Process IDs
* Application names

I observed services listening on ports such as SSH (22) and other active system services.

---

#### 📌 Task 5 – Putting Everything Together

#### What Happens When We Run

```bash
curl http://myapp.com:8080
```

The request follows these steps:

1. DNS resolves **myapp.com** into an IP address.
2. A TCP connection is established with the server.
3. The request is sent to **port 8080**.
4. The application running on port 8080 receives the request.
5. The application processes the request.
6. The server sends the response back.
7. `curl` displays the response.

This demonstrates how DNS, IP addresses, TCP, ports, and applications work together.

---

#### 🛠️ Troubleshooting Scenario

#### Problem

My application cannot connect to the database at:

```
10.0.1.50:3306
```

#### Steps I Would Check

✅ Is the database server reachable?

```bash
ping 10.0.1.50
```

---

✅ Is MySQL listening on port **3306**?

```bash
ss -tulpn
```

---

✅ Is the MySQL service running?

```bash
systemctl status mysqld
```

or

```bash
systemctl status mysql
```

---

✅ Is port **3306** open?

```bash
nc -zv 10.0.1.50 3306
```

---

✅ Is the firewall or cloud Security Group blocking traffic?

Check firewall rules or AWS Security Groups to ensure port **3306** is allowed between the application and the database.

---

✅ If using a hostname instead of an IP address, is DNS resolving correctly?

```bash
nslookup database.example.com
```

or

```bash
dig database.example.com
```

---

#### 💻 Commands Practiced

```bash
hostname -I
ip addr show
dig google.com
nslookup google.com
ss -tulpn
curl -I https://google.com
```

---

#### 📚 What I Learned

* DNS translates human-readable domain names into IP addresses.
* Every device on a network uses an IP address for communication.
* Public IPs are accessible over the internet, while private IPs are used within internal networks.
* CIDR notation defines network size and available host addresses.
* Subnetting improves security, performance, and efficient IP management.
* Ports enable multiple applications to run simultaneously on the same server.
* Tools like `dig`, `nslookup`, `ip`, `ss`, and `curl` are essential for diagnosing networking issues.

---

#### 🚀 Why This Matters for DevOps

Almost every DevOps task involves networking. Whether deploying applications, configuring cloud infrastructure, setting up Kubernetes clusters, or troubleshooting production issues, a solid understanding of networking is essential.

These concepts help quickly identify and resolve issues such as:

* 🌐 Website not loading
* 🔍 DNS resolution failures
* 🔒 Firewall or Security Group blocking traffic
* 🛢️ Database connection failures
* 🚪 Services listening on incorrect ports
* ☁️ Cloud networking and VPC configuration issues

A strong networking foundation enables faster troubleshooting, smoother deployments, and more reliable production systems, making it one of the most valuable skills for any DevOps Engineer.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write 3 scripts: disk-check, port-check, backup-check. | You can demonstrate, without notes: *write safe, readable Bash scripts* — with evidence committed to `day-15/`. |
| 2 | Document `$@` vs `$*`. | You can demonstrate, without notes: *use variables, quoting, conditionals and exit codes* — with evidence committed to `day-15/`. |
| 3 | Explain `set -e` pitfalls. | You can demonstrate, without notes: *apply ShellCheck* — with evidence committed to `day-15/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `unbound variable` | Expected under `set -u`; use `${VAR:-default}` or pass it. |
| Script works in terminal not cron | PATH/env differences; use absolute paths. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Quote variables, validate input, never `eval` untrusted input, avoid secrets as arguments (visible in `ps`).
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

1. What does `set -euo pipefail` do?
2. Why quote variables?
3. What is an exit code?
4. [ ] vs [[ ]]?
5. **Scenario:** A deploy script ran `rm -rf $DIR/*` with an unset variable and deleted `/*`. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a script with usage + exit codes? | ☐ | ☐ | ☐ | ☐ |
| Can I use shellcheck? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the safe-delete pattern? | ☐ | ☐ | ☐ | ☐ |
| Write safe, readable Bash scripts | ☐ | ☐ | ☐ | ☐ |
| Use variables, quoting, conditionals and exit codes | ☐ | ☐ | ☐ | ☐ |
| Apply ShellCheck | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-15/` in your own repository:

```text
day-15/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-15
git add day-15/
git commit -m "day-15: bash scripting"
git push -u origin day-15
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

## 18. Personal Learning Journal — ☁️ Day 15 - AWS EC2, Auto Scaling, Load Balancer & S3 Static Website Hosting

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

29 July 2026

---

### 🚀 Introduction

Today was focused entirely on **Amazon Web Services (AWS)**. I learned how to launch and configure EC2 instances, the difference between Root User and IAM, Nginx installation on Ubuntu, Auto Scaling Groups, Load Balancers, Target Groups, AWS WAF, S3 Buckets, Static Website Hosting, and AWS CLI.

These services are the foundation of deploying scalable, secure, and highly available applications on AWS.

---

### 📚 Topics Covered

- AWS Fundamentals
- EC2 Instance Creation
- Root User vs IAM User
- Installing Nginx on Ubuntu EC2
- EC2 Pricing (On-Demand vs Spot Instances)
- Launch Templates
- User Data Scripts
- Auto Scaling Groups (ASG)
- Target Groups
- Application Load Balancer (ALB)
- Elastic Load Balancer (ELB)
- Internet-facing vs Internal Load Balancer
- AWS WAF
- Network ACL Basics
- Amazon S3
- Bucket Configuration
- Bucket Permissions
- Object Ownership
- Static Website Hosting
- Bucket Policies
- AWS CLI

---

### ☁️ What is AWS?

Amazon Web Services (AWS) is the world's leading cloud computing platform that provides on-demand cloud services such as virtual machines, storage, networking, databases, security, monitoring, and much more.

##### Benefits

- High Availability
- Scalability
- Pay-as-you-go Pricing
- Secure Infrastructure
- Global Presence

---

### 💻 Amazon EC2

Amazon EC2 (Elastic Compute Cloud) provides virtual servers in the cloud.

##### Steps to Launch an EC2 Instance

1. Login to AWS Console
2. Open EC2 Dashboard
3. Click **Launch Instance**
4. Enter Instance Name
5. Select an AMI (Ubuntu)
6. Choose Instance Type (e.g., t2.micro)
7. Create or Select a Key Pair
8. Configure Network & Security Group
9. Configure Storage
10. Launch the Instance

---

### 🔐 Root User vs IAM User

#### Root User

- Has full access to all AWS services
- Created automatically with the AWS account
- Should only be used for account setup and billing
- Enable Multi-Factor Authentication (MFA)

#### IAM User

- Created by the Root User
- Permissions are controlled using IAM Policies
- Used for daily administration and development
- Follows the Principle of Least Privilege

---

### 🌐 Install Nginx on Ubuntu EC2

Connect to the instance:

```bash
ssh -i key.pem ubuntu@<public-ip>
```

Update packages:

```bash
sudo apt update
```

Install Nginx:

```bash
sudo apt install nginx -y
```

Check status:

```bash
sudo systemctl status nginx
```

Enable Nginx:

```bash
sudo systemctl enable nginx
```

Visit:

```
http://<EC2-Public-IP>
```

You should see the Nginx welcome page.

---

### 💰 EC2 Pricing Models

#### On-Demand Instances

- Pay only when the instance is running
- No long-term commitment
- Best for testing and short-term workloads

##### Advantages

- Flexible
- Reliable
- No upfront payment

---

#### Spot Instances

AWS sells unused EC2 capacity at discounted prices.

##### Advantages

- Very low cost
- Ideal for batch jobs and testing

##### Disadvantages

- AWS can terminate the instance with short notice

---

### 📦 Launch Templates

Launch Templates store EC2 configuration so it can be reused.

They include:

- AMI
- Instance Type
- Security Group
- Storage
- User Data
- IAM Role

##### Create a Launch Template

```
EC2
↓

Actions

↓

Images & Templates

↓

Create Template
```

---

### 💾 EBS Volume Pricing

- **30 GB or less (depending on Free Tier eligibility)** → Typically covered under the AWS Free Tier.
- **More than 30 GB** → Additional storage charges apply.

Always check the current AWS Free Tier terms, as limits and eligibility can change.

---

### ✏️ Modify Launch Template

```
Launch Templates

↓

Select Template

↓

Actions

↓

Modify Template
```

---

### 📜 User Data

User Data automatically executes commands when an EC2 instance launches.

Example:

```bash
#!/bin/bash
apt update -y
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

##### Two Ways to Add User Data

1. While creating the EC2 instance
2. Through the Launch Template

---

### 📈 Auto Scaling Group (ASG)

Auto Scaling automatically increases or decreases EC2 instances based on demand.

##### Components

- Launch Template
- Minimum Size
- Desired Capacity
- Maximum Size

Example

```
Minimum = 2

Desired = 3

Maximum = 6
```

---

### 🛠️ Steps to Create an Auto Scaling Group

1. Create a Launch Template
2. Open Auto Scaling Groups
3. Create Auto Scaling Group
4. Select Launch Template
5. Configure Network (VPC & Subnets)
6. Attach Target Group / Load Balancer
7. Configure Scaling Policies and Review

---

### ⚖️ Elastic Load Balancer (ELB)

An ELB distributes incoming traffic across multiple EC2 instances.

Benefits:

- High Availability
- Fault Tolerance
- Better Performance

---

### 🌍 Application Load Balancer (ALB)

ALB works at Layer 7 (HTTP/HTTPS).

Features:

- Path-based routing
- Host-based routing
- HTTPS support
- Health checks

---

### 🌐 Internal vs Internet-facing Load Balancer

#### Internet-facing

- Accessible from the Internet
- Used for public applications

#### Internal

- Accessible only within the VPC
- Used for internal services

---

### 🎯 Target Group

A Target Group contains the EC2 instances that receive traffic from the Load Balancer.

Health checks ensure only healthy instances receive requests.

---

### 🤖 AWS WAF (Web Application Firewall)

AWS WAF protects web applications from common attacks.

It can block:

- SQL Injection
- Cross-Site Scripting (XSS)
- Bots
- Malicious IP addresses

---

### 🛡️ Network ACL (NACL)

Network ACLs provide stateless security at the subnet level.

They allow or deny inbound and outbound traffic using numbered rules.

---

### 🪣 Amazon S3

Amazon S3 is an object storage service for storing files such as images, videos, backups, and static websites.

---

### Bucket Configuration

While creating a bucket you can configure:

- Bucket Name
- AWS Region
- Versioning
- Encryption
- Object Ownership
- Public Access Settings

---

### 🔐 Bucket Permissions

Permissions control who can access bucket contents.

They can be managed using:

- Bucket Policies
- IAM Policies
- ACLs (if enabled)

---

### 👤 Object Ownership

Object Ownership determines who owns uploaded objects.

Recommended:

```
Bucket owner enforced
```

This disables ACLs and simplifies permission management.

---

### 🌍 Static Website Hosting

Amazon S3 can host static websites built with HTML, CSS, and JavaScript.

##### Steps

1. Create an S3 Bucket
2. Upload Website Files
3. Enable Static Website Hosting
4. Set `index.html`
5. Disable Block Public Access (if appropriate)
6. Add a Bucket Policy
7. Access the Website using the generated endpoint

Example Bucket Policy:

```json
{
  "Version":"2012-10-17",
  "Statement":[{
      "Effect":"Allow",
      "Principal":"*",
      "Action":"s3:GetObject",
      "Resource":"arn:aws:s3:::your-bucket-name/*"
  }]
}
```

---

### 💻 AWS CLI

Configure AWS CLI:

```bash
aws configure
```

List S3 Buckets:

```bash
aws s3 ls
```

Create Bucket:

```bash
aws s3 mb s3://my-demo-bucket
```

Upload File:

```bash
aws s3 cp index.html s3://my-demo-bucket
```

List Files:

```bash
aws s3 ls s3://my-demo-bucket
```

Delete File:

```bash
aws s3 rm s3://my-demo-bucket/index.html
```

---

### 🎯 Key Takeaways

- Learned how to create and configure EC2 instances.
- Understood the difference between Root User and IAM User.
- Installed and managed Nginx on Ubuntu EC2.
- Compared On-Demand and Spot Instances.
- Learned Launch Templates and User Data automation.
- Configured Auto Scaling Groups using Launch Templates.
- Understood ALB, ELB, Target Groups, and Load Balancers.
- Explored AWS WAF and Network ACLs.
- Created and configured Amazon S3 Buckets.
- Hosted a static website on Amazon S3.
- Managed AWS resources using AWS CLI.

---

### 📈 Progress

- ✅ Day 15 – AWS EC2, Auto Scaling, Load Balancers & S3

**Completed:** 15 / 90 Days 🚀

---

> **"Cloud isn't just about running servers—it's about building scalable, secure, and highly available systems that can grow with demand."** ☁️🚀

## 19. Challenge Notes — Day 15: Introduction to Shell Scripting

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

#### 🧠 What is Shell Scripting?

A shell script is a program written for the shell (command line interpreter) of an operating system. It helps automate tasks that would otherwise be executed one-by-one manually.



[![](https://img.youtube.com/vi/dD2BCyNhswU/0.jpg)](https://www.youtube.com/watch?v=dD2BCyNhswU)

[Watch the video](https://www.youtube.com/watch?v=dD2BCyNhswU)

---

#### 🔤 Variables in Shell Scripting

Variables store data that can be used later in the script.

##### Syntax:
```bash
variable_name=value
```

##### Example:
```bash
#!/bin/bash
name="DevOps Student"
echo "Hello, $name!"
```

##### Output:
```
Hello, DevOps Student!
```

> ❗ Note: No spaces around the equal sign when assigning variables.

---

#### 📥 User Input

Shell can read user input and store it in variables.

##### Example:
```bash
#!/bin/bash
echo "Enter your favorite language:"
read language
echo "You chose $language"
```

---

#### 🔁 Conditionals (if-else)

Use conditionals to execute code based on specific conditions.

##### Syntax:
```bash
if [ condition ]; then
  # code
elif [ another_condition ]; then
  # code
else
  # code
fi
```

##### Example:
```bash
#!/bin/bash
read -p "Enter a number: " num
if [ $num -gt 10 ]; then
  echo "Greater than 10"
else
  echo "10 or less"
fi
```
Comparison Operators:
| Operator | Meaning               |
| -------- | --------------------- |
| `-eq`    | equal to              |
| `-ne`    | not equal to          |
| `-gt`    | greater than          |
| `-lt`    | less than             |
| `-ge`    | greater than or equal |
| `-le`    | less than or equal    |

---

#### 🔄 For Loop

Executes a block of code for each item in a list.

##### Syntax:
```bash
for var in list
```

##### Example:
```bash
#!/bin/bash
for i in 1 2 3 4 5
do
  echo "Iteration $i"
done
```

##### Output:
```
Iteration 1
Iteration 2
Iteration 3
Iteration 4
Iteration 5
```

---

#### 🔄 While Loop

Repeats as long as a condition is true.

##### Example:
```bash
#!/bin/bash
count=1
while [ $count -le 5 ]
do
  echo $count
  ((count++))
done
```

##### Output:
```
1
2
3
4
5
```

---

#### 📚 Arrays

Used to store multiple values in a single variable.

##### Example:
```bash
#!/bin/bash
fruits=("Apple" "Banana" "Mango")
echo "First fruit: ${fruits[0]}"
```

##### Output:
```
First fruit: Apple
```

##### Looping through an array:
```bash
for fruit in "${fruits[@]}"
do
  echo $fruit
done
```

---

#### 🧩 Functions

Functions help reuse code and make scripts modular.

##### Syntax:
```bash
function_name() {
  # commands
}
```

##### Example:
```bash
#!/bin/bash
greet() {
  echo "Hello, $1!"
}
greet "DevOps"
```

##### Output:
```
Hello, DevOps!
```

---

#### 🐞 Debugging with `set -x`

Debug mode prints each command before executing it.

##### Example:
```bash
#!/bin/bash
set -x
fruits=("Apple" "Banana" "Mango")
for fruit in "${fruits[@]}"
do
  echo $fruit
done
set +x
```

##### Sample Output:
```
+ fruits=("Apple" "Banana" "Mango")
+ for fruit in "${fruits[@]}"
+ echo Apple
Apple
+ echo Banana
Banana
+ echo Mango
Mango
```

---

#### 📌 Summary

| Concept     | Use                                     |
|-------------|------------------------------------------|
| Variables   | Store and reuse values                   |
| Input       | Accept user input                        |
| If-Else     | Execute logic based on conditions        |
| Loops       | Automate repetitive tasks                |
| Arrays      | Store multiple values                    |
| Functions   | Modularize code                          |
| Debugging   | Trace command execution                  |

### Attachments

- [Day 15 Introduction to Shell Scripting.pdf](Day%2015%20Introduction%20to%20Shell%20Scripting.pdf)

## 20. Cohort Practice — Day 15: Networking Concepts: DNS, IP, Subnets & Ports

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Build on Day 14 by understanding the building blocks of networking every DevOps engineer must know.

You will:
- Understand how **DNS** resolves names to IPs
- Learn **IP addressing** (IPv4, public vs private)
- Break down **CIDR notation** and **subnetting** basics
- Know common **ports** and why they matter

This is concept-focused — research, understand, and document in your own words.

---



#### Expected Output

- A markdown file: `day-15-networking-concepts.md`


---

#### Challenge Tasks

##### Task 1: DNS – How Names Become IPs
1. Explain in 3–4 lines: what happens when you type `google.com` in a browser?
2. What are these record types? Write one line each:
   - `A`, `AAAA`, `CNAME`, `MX`, `NS`
3. Run: `dig google.com` — identify the A record and TTL from the output

---



##### Task 2: IP Addressing
1. What is an IPv4 address? How is it structured? (e.g., `192.168.1.10`)
2. Difference between **public** and **private** IPs — give one example of each
3. What are the private IP ranges?
   - `10.x.x.x`, `172.16.x.x – 172.31.x.x`, `192.168.x.x`
4. Run: `ip addr show` — identify which of your IPs are private

---

##### Task 3: CIDR & Subnetting
1. What does `/24` mean in `192.168.1.0/24`?
2. How many usable hosts in a `/24`? A `/16`? A `/28`?
3. Explain in your own words: why do we subnet?
4. Quick exercise — fill in:

| CIDR | Subnet Mask | Total IPs | Usable Hosts |
|------|-------------|-----------|--------------|
| /24  | ?           | ?         | ?            |
| /16  | ?           | ?         | ?            |
| /28  | ?           | ?         | ?            |

---

##### Task 4: Ports – The Doors to Services
1. What is a port? Why do we need them?
2. Document these common ports:

| Port | Service |
|------|---------|
| 22   | ?       |
| 80   | ?       |
| 443  | ?       |
| 53   | ?       |
| 3306 | ?       |
| 6379 | ?       |
| 27017| ?       |

3. Run `ss -tulpn` — match at least 2 listening ports to their services

---

##### Task 5: Putting It Together
Answer in 2–3 lines each:
- You run `curl http://myapp.com:8080` — what networking concepts from today are involved?
- Your app can't reach a database at `10.0.1.50:3306` — what would you check first?

---

#### Documentation

Create `day-15-networking-concepts.md` with:
- Your answers to each task
- Command outputs from `dig` and `ss`
- The filled CIDR table
- What you learned (3 key points)

---

#### Submission
1. Add `day-15-networking-concepts.md` to `2026/day-15/`
2. Commit and push to your fork

---

#### Learn in Public

Share what you learned about DNS, subnets, or ports on LinkedIn.

```
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
```

Happy Learning!
**TrainWithShubham**

##### Notes: day-15-networking-concepts

Understand how **DNS** resolves names to IPs
============================================

- > The Domain Name System (DNS) is the internet phonebook, translating human - readable web addresses (google.com) into machine readable ip addresses (192.0.1.1) 

- This allows your device to securely and acurately to seb servers across the globe.

when you type a domain into your browser , the resolution process goes through four main stages in a fraction of a second.

First local cache check
-----------------------
Before going to the internet , your device searches for the ip locally to save time

your browser checks if it recently visited the site.
the operating system checks its own recoreds.
The request then goes to your local dns server(typically your isp) which checks its recent cache




- Learn **IP addressing** (IPv4, public vs private)
===================================================
An ip address is a unique identifier for devices on a network . public ip addresses are globally unique and routable on the internet . private ip addresses are isolated to your local area network (lan) and are used for secure internal communication.



- Break down **CIDR notation** and **subnetting** basics
========================================================
cidr (classless inter-domain routing) is a compact . modern method used to write ip addresses and their associated subnet masks. instead of writing a cubbersome b=subnet mask like 255.255.255.0 , cidr uses a forward xlash(/) followed by a number . this number indicates how many bit are used for the network 


subnettig is the process of splitting one large, overarching network into smaller , more effiecient, and manageable subnets (subnets).


an ipv4 address cinsits of 32 bits , devided into four sections (octects) of 8 bits each. in cidr nonation (199.123.1.0/24), the number after the slash (/24) tells yoyu that the first 24 bits belongs to the network, leaving the remaining 8 bits (32-24 = 8) for indivisual devices

how subnetting works
====================

every network needs a way to separete the network id from the host id. when you subnet. you borrow bit from the host portion and add then to the network portion.



- Know common **ports** and why they matter
===========================================
network ports are virtual endpoints that direct data traffic to the correct  application on a device . Numbered 0 to 65535 , they act like specifix mailing addresses or radio channels. without ports a computer cannot distinguish between a web request a web request , a file transfer or an incoming email.

they allow computer network to run multiple servide simulataneously . when data packets arrive port umbers ensure the information goes to the right place

##### Task 1: DNS – How Names Become IPs
1. Explain in 3–4 lines: what happens when you type `google.com` in a browser?

- The browser checks its cache for the url , then uses a dns look up tpoo find the website correcsponding ip addresss. it establishes a secure conection using a tcp/ip and ssl/tls handshake . finally , it sends a http request to the server , receives the sites files and renders the page on your screen.

a deep dive into the domain name system (dns)

how tcp/ip handshake work to establish secure connections


the dom and cssom rending process fot page display




2. What are these record types? Write one line each:
   - `A`, `AAAA`, `CNAME`, `MX`, `NS`

- here is a one line explanation for each of these common domain name system (dns)

A:  maps a humamm -readable domain name directly to an ipv4 address so the internet knows where to locate your website


AAAA: Maps a domain name to an ipv6 address , actimg as the modern counterpart to standard A records

CNAME: Points a domain or dubdomain alias to another "canonical" domain name instead of a direct ip address

MX: Specifies the mail servers responsible for receibving and routing incoming emails for your domain


NS: identifies which authoritative jname servers hold the actual dns records for a specifies domain.



3. Run: `dig google.com` — identify the A record and TTL from the output

Because DNS results vary based on your location and exact you server runig dig google.com typing returns multiple ipv4 addresses (A records) and their Time to live (TTL)


TTL: Located between the domain name and IN, representing the time (in seconds) the record is cached. In this example, it is 234 seconds (about 4 minutes)


##### Task 2: IP Addressing
1. What is an IPv4 address? How is it structured? (e.g., `192.168.1.10`)

- An ipv4 address (internet protocol version 4) is a unique , 32 bit numeric identifier assigned to every device connected to a computer network.
it serve two main functions : identifying the specific device and locating it on the network so that data packets can be sent and received

- An ipv4 address is devided into 4 disticnt 8 bit segment clled octects
separated by periods


octets: each octect consist of 8 bits meaning its decimal value can rnge from 0 to 255


the two part : every ipv4 address is devided into two primary logical components


network id : identifies the specific netwrok the device belongs to 
host id : identifes the specific device within that network 

2. Difference between **public** and **private** IPs — give one example of each

- A public ip is your device primary address on the public internet , assigned by your isp (internet service provider) for external communication . a private ip is a secure , local address assigned by your router to identify specific devices within yourn home or office network

   PUBLIC IP                     PRIVATE IP
=========================================================================
- golbally visible and        - hidden from the outside internet: only accessbile across               visible within your local network
 the internet

- your network service        - your local network router
provider (airtel)

- must be globally unique     - Only needs to be unique within your 
across the entire internet       specific local netwrok

- Connecting your entire      - Connecting devices to each others and
local network to website         your router
and online services     



3. What are the private IP ranges?
   - `10.x.x.x`, `172.16.x.x – 172.31.x.x`, `192.168.x.x`

- private Ip addresses are reserved for internal networks and cannot be routes on the public internet. The official private ip range defined by the internet Engineering task force
in RFC 1918 are

class A range
=============
ip range : 10.0.0.0 to 10.255.255.255
subnet mask : 255.0.0.0 
total addresses : 16,777,216

commo usage - large enterprises networks and data centers

class b range 
=============
ip range : 172.16.0.0 to 172.31.255.255
subnet mask : 255.240.0.0
total addresses : 10,48,576
common use - medium sized corporate newtwork univeristies and cloud vpc

class c range
==============
ip range : 192.168.0.0 to 192.168.255.255
subneet mask : 255.255.0.0 
total addresses : 65,536
common use : home wifi  router and small office network 



4. Run: `ip addr show` — identify which of your IPs are private
===============================================================
when you run ip addr show in a linus terminal , your private local betwork ip addressed are listed next to the keyboard inet . yoiu can easily identify them by looking for specific reserved ip ranges used for local area networks 

Any ip address that falls within these standard ranges is a private ip




##### Task 3: CIDR & Subnetting
1. What does `/24` mean in `192.168.1.0/24`?

- in 192.168.1.0/24 knows as cidr notation indicates that the first that the first 24 bits of the 32 bit ip address define the network portion . This dictate that all devioces in this network share the ssame 192.168.1 prefix , while the remaining 8 bits are  reserved for indivisual devices


subnet mast : equivalent to 255.255.255.0

ip range : cotains 256 unique addresses spanning s from 192.168.1.0 to  192.168.1.255

unables hosts : holds 254 usable ip addresses for devices 

2. How many usable hosts in a `/24`? A `/16`? A `/28`?

- A /24 prefix size provides 254 usable hosts , a 
- a /16 provides 65,534 usable hosts and 
- a /28 provides 14 usable hosts



to find the number of usable hosts in any ipv4 cidr block , use the formula
Usable hosts = 2 ^ 32 -n -2
32 represents the total bits in an ipv4 address
n is the prefix length the cidr number

we subtract 2 because the first addresses is reserved for the network id and the last address is reserved for the broacast id

3. Explain in your own words: why do we subnet?

- subnetting is the process of deviding a large , unmanageable network into smaller , independent sub networks . we do this to improve network performance by limiting traffic, enhance security bt isolating sensitve devices abd conserve ip address to prevebt waste


4. Quick exercise — fill in:

| CIDR | Subnet Mask | Total IPs | Usable Hosts |
|------|-------------|-----------|--------------|
| /24  | ?           | ?         | ?            |
| /16  | ?           | ?         | ?            |
| /28  | ?           | ?         | ?            |

| CIDR | Subnet Mask    | Total IPs | Usable Hosts |
|------|-------------   |-----------|--------------|
| /24  | 255.255.255.0  | 256       |  254         |
| /16  | 255.255.255.0  | 65536     | 65534        |
| /28  | 255.255.255.0  | 16        | 14           |


we subnet to breal large networks into smaller more managele able sections . this process improve traffic flow by containing routine data within local areas , enhances security by isolating sensitive systems and helpls  optimize ip address allocation to prevent waste



##### Task 4: Ports – The Doors to Services
1. What is a port? Why do we need them?
- in computing , a port is a virtual , software - based endpoint where connections start and end , while an ip address gets data to the correct device, a port number direct that data to the specific application or service requesting it



2. Document these common ports:

| Port | Service |
|------|---------|
| 22   |  ssh    |
| 80   | http    |
| 443  | https   |
| 53   |  dns    |
| 3306 | mysql   |
| 6379 | redis   |
| 27017| mongodb |


3. Run `ss -tulpn` — match at least 2 listening ports to their services

22 - ssh - secure remote login and server administration
80 - http - serves web pages over the internet
443 - https - secure web traffice using ssl/tls



##### Task 5: Putting It Together
Answer in 2–3 lines each:
- You run `curl http://myapp.com:8080` — what networking concepts from today are involved?

- dns resolution is translated into an ip address using dns

ip addressing the client uses the destination ip to locate the server on the network 

port number identifies the destination the specifix appication service running on the server


- Your app can't reach a database at `10.0.1.50:3306` — what would you check first?

- ping 10.0.1.50:3306
- nc -zv 10.0.1.50:3306


whether the mysql service is running
whether mysql is listening on port
firawall rules and security groups
database configuration

this helps determine whether the issue is related to networking, the database service or configuration

## 21. Hands-on Project — Day 15: Route Tables & VPC Endpoints (S3/DynamoDB + Interface)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **VPC route tables & endpoints**. We’ll attach **Gateway Endpoints** (S3 & DynamoDB) to private route tables to enable **egress-free** access, and optionally add **Interface Endpoints** (SSM, EC2 Messages, SSM Messages) secured by a security group.

This module is designed to **plug into Day 14**. Bring your `vpc_id` and the route table IDs from Day 14.

#### 🎯 Learning Goals
- Understand **Gateway Endpoints** (S3 & DynamoDB) vs **Interface Endpoints** (PrivateLink).  
- Attach endpoints to **specific route tables** (gateway) or **subnets** (interface).  
- Apply **endpoint policies** for least-privilege access.  
- Reduce NAT data transfer and improve security posture.

#### 🛠️ Lab Setup & Tasks

```bash
terraform -chdir=terraform init
terraform -chdir=terraform plan   -var='vpc_id=vpc-0123456789abcdef0'   -var='private_route_table_ids=["rtb-aaa","rtb-bbb"]'   -var='public_route_table_id=rtb-ccc'   -var='private_subnet_ids=["subnet-111","subnet-222"]'   -var='vpc_cidr="10.0.0.0/16"'
terraform -chdir=terraform apply -auto-approve   -var='vpc_id=vpc-0123456789abcdef0'   -var='private_route_table_ids=["rtb-aaa","rtb-bbb"]'   -var='public_route_table_id=rtb-ccc'   -var='private_subnet_ids=["subnet-111","subnet-222"]'   -var='vpc_cidr="10.0.0.0/16"'
```

#### 💡 Challenge
- Add a **custom endpoint policy** restricting S3 access to a specific bucket/prefix.  
- Add more **interface endpoints** (e.g., ECR API/DKR, CloudWatch Logs).  
- Split endpoint SG to **subnet-specific** rules for tighter control.

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 14](../day-14/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 16 →](../day-16/README.md)
