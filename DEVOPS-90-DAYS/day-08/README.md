# Day 08 — Networking Fundamentals: OSI, TCP/IP, IP Addressing & Subnets

[← Day 07](../day-07/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 09 →](../day-09/README.md)

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

- [ ] Explain OSI/TCP-IP layers with real examples
- [ ] Calculate CIDR subnets
- [ ] Inspect interfaces, routes and connectivity

## 2. Prerequisites

- Day 7.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Layers

L2 Ethernet/MAC, L3 IP, L4 TCP/UDP, L7 HTTP/DNS/SSH. Encapsulation wraps data at each layer. TCP: 3-way handshake, reliable; UDP: connectionless.

### 3.2 IPv4 and CIDR

/24 = 256 addresses (254 usable). Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. A /16 VPC split into /24 subnets gives 256 subnets. NAT lets private addresses reach the internet.

### 3.3 Tools

`ip a`, `ip r`, `ping`, `traceroute`, `mtr`, `ss`, `nc`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `ip -br a` and `ip r`; identify your default gateway.
2. [ ] Calculate with `ipcalc 10.0.0.0/22`: network, broadcast, hosts.
3. [ ] Design a VPC plan: 10.0.0.0/16 with 3 public + 3 private /24 subnets over 3 AZs.
4. [ ] Use `traceroute` to a public host and explain each hop.
5. [ ] Use `nc -vz host 22` to test a port.

## 5. Real-World Scenario

> Two environments must be peered later but both use 10.0.0.0/16. Explain why this fails and re-plan non-overlapping CIDRs for dev/stage/prod.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ip -br a; ip r
ping -c 4 1.1.1.1
traceroute -n 8.8.8.8     # or mtr -rn 8.8.8.8
sudo apt install -y ipcalc
ipcalc 10.0.0.0/22
nc -vz example.com 443
ss -tulpn
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 08 – Cloud Server Setup: Docker, Nginx & Web Deployment — Challenge Brief

#### Task
Today's goal is to **deploy a real web server on the cloud** and learn practical server management.

You will:
- Launch a cloud instance (AWS EC2 or Utho)
- Connect via SSH
- Install Nginx
- Configure security groups for web access (port 80 by default for nginx)
- Extract and save logs to a file
- Verify your webpage is accessible from the internet

This is real DevOps work - exactly what you'll do in production.

---

#### Expected Output
By the end of today, you should have:

1. A markdown file named: `day-08-cloud-deployment.md`
2. Screenshots showing:
   - SSH connection to your server
   - Nginx welcome page accessible from browser
   - Log file contents
3. The log file: `nginx-logs.txt`

---

#### Prerequisites
- AWS account (Free Tier) OR Utho account
- Basic understanding of Linux commands (Days 1-7)
- SSH client (Terminal on Mac/Linux, PuTTY on Windows)

---

#### Guidelines

##### Part 1: Launch Cloud Instance & SSH Access (15 minutes)

**Step 1: Create a Cloud Instance**


**Step 2: Connect via SSH**


---

##### Part 2: Install Docker & Nginx (20 minutes)

**Step 1: Update System**


**Step 3: Install Nginx**

**Verify Nginx is running:**

---

##### Part 3: Security Group Configuration (10 minutes)

**Test Web Access:**
Open browser and visit: `http://<your-instance-ip>`

You should see the **Nginx welcome page**!

📸 **Screenshot this page** - you'll need it for submission

---

##### Part 4: Extract Nginx Logs (15 minutes)

**Step 1: View Nginx Logs**

**Step 2: Save Logs to File**

**Step 3: Download Log File to Your Local Machine**
```bash
# On your local machine (new terminal window)
# For AWS:
scp -i your-key.pem ubuntu@<your-instance-ip>:~/nginx-logs.txt .

# For Utho:
scp root@<your-instance-ip>:~/nginx-logs.txt .
```

---


#### Documentation Template

Create your `day-08-cloud-deployment.md` with this structure:

#### Commands Used
[List the key commands you used]

#### Challenges Faced
[Describe any issues and how you solved them]

#### What I Learned
[3-5 bullet points of key learnings]

---


#### Why This Matters for DevOps

This exercise teaches you:
- **Cloud infrastructure provisioning** - launching and configuring servers
- **Remote server management** - SSH, security, access control
- **Service deployment** - installing and running applications
- **Log management** - accessing and analyzing logs
- **Security** - configuring firewalls and security groups

These are core skills for any DevOps engineer working in production.

---


#### Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to the `2026/day-08/` folder
3. Add your `day-08-cloud-deployment.md` file
4. Add your `nginx-logs.txt` file
5. Add screenshots (name them: `ssh-connection.png`, `nginx-webpage.png`, `docker-nginx.png`)
6. Commit and push your changes to your fork

---

#### Learn in Public
Share your Day 08 progress on LinkedIn:

- Post 2-3 lines on deploying your first cloud server
- Share screenshot of your Nginx webpage
- Mention one challenge you faced and solved
- Optional: Share your instance IP (if comfortable)

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

### 7.2 Day 08 – Cloud Server Setup: Docker, Nginx & Web Deployment — Notes & Solution

#### Part 1: Launch Cloud Instance & SSH Access  
Step 1: Created a Ubuntu EC2 Instance in AWS account  

Step 2: Connect via SSH  
- Setup the security group for SSH connection (Port 22)  
- Access the AWS EC2 instance from local system using Git bash terminal  
  `ssh -i "private-key.pem" username@public-ip/hostname`

-----

#### Part 2: Install Docker & Nginx  
Step 1: Update System  
`sudo apt update && sudo apt upgrade -y`

Step 2: Install Nginx
```
sudo apt install nginx
systemctl start nginx
systemctl enable nginx
```

<img width="1919" height="816" alt="Screenshot 2026-07-30 234838" src="https://github.com/user-attachments/assets/b1714345-fbff-45a9-bb50-baa28f9f72d1" />

Step 3: Install docker
```
sudo apt install docker.io
systemctl start dokcer
systemctl enable docker
```
<img width="1708" height="131" alt="Screenshot 2026-07-30 235412" src="https://github.com/user-attachments/assets/c3b9336e-4cb7-4e2f-b715-0234eff688cf" />

---------

#### Part 3: Security Group Configuration
- Setup the security group fot http traffic (Port 80)  
- Test Web Access: Open browser and visit: http://<instance-ip>

<img width="1910" height="543" alt="Screenshot 2026-07-31 000711" src="https://github.com/user-attachments/assets/8de59113-d2b9-4727-a2a6-a4f41f55822b" />

------------

#### Part 4: Extract Nginx Logs  
Step 1: View Nginx Logs
`journalctl -u nginx`

Step 2: Save Logs to File
`sudo cat /var/log/nginx/access.log > nginx-logs.txt`

Step 3: Download Log File to Your Local Machine  
`scp -i "Mylinux-server.pem" ubuntu@13.232.139.224:/home/ubuntu/nginx-logs.txt ./nginx-logs.txt`

--------------

#### Commands Used  
- ssh -i "private-key.pem" username@public-ip/hostname  
- sudo apt update && sudo apt upgrade -y  
- systemctl status <service>  
- journalctl -u <service>  
- scp -i "Mylinux-server.pem" ubuntu@13.232.139.224:/home/ubuntu/nginx-logs.txt ./nginx-logs.txt

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create an IP address plan spreadsheet/markdown for 3 environments. | You can demonstrate, without notes: *explain OSI/TCP-IP layers with real examples* — with evidence committed to `day-08/`. |
| 2 | Write a one-page 'what happens when I type a URL' explanation. | You can demonstrate, without notes: *calculate CIDR subnets* — with evidence committed to `day-08/`. |
| 3 | Explain public vs private IP and NAT. | You can demonstrate, without notes: *inspect interfaces, routes and connectivity* — with evidence committed to `day-08/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ping` fails but web works | ICMP may be blocked; test with `curl`/`nc`. |
| Cannot reach other VM | Check subnet, gateway, firewall/security group and routes. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Segment networks; never expose databases directly to the internet; plan CIDRs so private ranges never overlap.
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

1. What is a /24?
2. TCP vs UDP?
3. What is NAT?
4. What is a default gateway?
5. **Scenario:** Two environments must be peered later but both use 10. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I split a /16 into /24s? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the TCP handshake? | ☐ | ☐ | ☐ | ☐ |
| Can I test a port without a browser? | ☐ | ☐ | ☐ | ☐ |
| Explain OSI/TCP-IP layers with real examples | ☐ | ☐ | ☐ | ☐ |
| Calculate CIDR subnets | ☐ | ☐ | ☐ | ☐ |
| Inspect interfaces, routes and connectivity | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-08/` in your own repository:

```text
day-08/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-08
git add day-08/
git commit -m "day-08: networking fundamentals"
git push -u origin day-08
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

## 18. Personal Learning Journal — 🔐 Day 08 - Network Security, System Design & Python APIs

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

22 July 2026

---

### 🚀 Introduction

Today, I focused on understanding the fundamentals of **network security**, **system design**, and **Python APIs**. I explored how cloud infrastructures are secured, how applications communicate over the internet, and the basics of designing scalable systems.

---

### 📚 Topics Covered

- Firewall
- Ingress & Egress Traffic
- SSL & TLS
- NAT (Network Address Translation)
- UFW (Uncomplicated Firewall)
- Protocols, IP Addresses & Ports
- VPC, Internet Gateway, Public & Private Subnets
- System Design & Architecture
- Python Sets
- APIs
- Request & Response

---

### 🔥 Firewall

A **Firewall** is a security system that monitors and controls incoming and outgoing network traffic based on predefined rules.

##### Why use a Firewall?

- Block unauthorized access
- Protect servers from attacks
- Allow only trusted traffic
- Secure cloud resources

---

### 🌐 Ingress vs Egress

| Ingress | Egress |
|----------|---------|
| Incoming network traffic | Outgoing network traffic |
| Example: User accessing a website | Example: Server sending data to another server |

Example:

```
Internet
    │
    ▼
Ingress → EC2 Instance → Egress
```

---

### 🔒 SSL & TLS

##### SSL (Secure Sockets Layer)

An older protocol used to encrypt communication between clients and servers.

##### TLS (Transport Layer Security)

The modern and more secure replacement for SSL.

##### Why SSL/TLS?

- Encrypts data in transit
- Prevents data theft
- Protects sensitive information
- Enables HTTPS

Example:

```
Browser
    │
 HTTPS (TLS)
    │
Web Server
```

---

### 🌍 NAT (Network Address Translation)

NAT allows private IP addresses to communicate with the internet using a public IP address.

##### Benefits

- Conserves public IP addresses
- Improves security
- Allows private subnet instances to access the internet

---

### 🛡️ UFW (Uncomplicated Firewall)

UFW is a user-friendly firewall tool for Ubuntu.

##### Common Commands

Enable UFW

```bash
sudo ufw enable
```

Allow SSH

```bash
sudo ufw allow 22
```

Allow HTTP

```bash
sudo ufw allow 80
```

Allow HTTPS

```bash
sudo ufw allow 443
```

Check Status

```bash
sudo ufw status
```

---

### 🌐 Protocols, IP & Ports

A **Protocol** defines how devices communicate over a network.

##### Common Protocols

| Protocol | Port | Purpose |
|----------|-----:|---------|
| HTTP | 80 | Web Traffic |
| HTTPS | 443 | Secure Web Traffic |
| SSH | 22 | Remote Login |
| FTP | 21 | File Transfer |
| DNS | 53 | Domain Name Resolution |

---

### ☁️ AWS Networking Recap

##### VPC

A logically isolated virtual network in AWS.

##### Internet Gateway

Allows resources in a public subnet to communicate with the internet.

##### Public Subnet

- Internet accessible
- Used for web servers, load balancers

##### Private Subnet

- No direct internet access
- Used for databases and backend services

---

### 🏗️ System Design

System Design is the process of planning how different components of an application work together to build scalable, reliable, and efficient systems.

##### Why is System Design Important?

- Scalability
- High Availability
- Reliability
- Performance
- Maintainability

##### Basic Architecture

```
Users
   │
   ▼
Load Balancer
   │
   ▼
Application Servers
   │
   ▼
Database
```

---

### 🐍 Python Sets

A **Set** is an unordered collection of unique elements.

Example

```python
numbers = {1, 2, 3, 3, 4}

print(numbers)
```

Output

```
{1, 2, 3, 4}
```

##### Features

- No duplicate values
- Fast lookups
- Mutable collection

---

### 🌐 API (Application Programming Interface)

An API allows different applications to communicate with each other.

Example:

```
Client
   │
Request
   ▼
API
   │
Response
   ▼
Client
```

---

### 📨 Request & Response

##### Request

Data sent by the client to the server.

Example

```http
GET /users
```

##### Response

Data returned by the server.

Example

```json
{
  "name": "John",
  "age": 25
}
```

---

### 🎯 Key Takeaways

- Learned how firewalls secure networks.
- Understood the difference between ingress and egress traffic.
- Explored SSL/TLS for secure communication.
- Learned the purpose of NAT and UFW.
- Reviewed networking concepts like protocols, ports, VPCs, and subnets.
- Studied the basics of system design and architecture.
- Practiced Python Sets.
- Learned how APIs work through requests and responses.

---

### 📈 Progress

- ✅ Day 01 – DevOps Roadmap
- ✅ Day 02 – Linux Fundamentals
- ✅ Day 03 – Advanced Linux
- ✅ Day 04 – Linux Permissions
- ✅ Day 05 – Shell Scripting
- ✅ Day 06 – AWS Networking
- ✅ Day 07 – Networking & Python Basics
- ✅ Day 08 – Network Security, System Design & Python APIs

**Completed:** 8 / 90 Days 🚀

---

⭐ Every day is another step toward becoming a better DevOps Engineer!

## 19. Challenge Notes — Day 8: Managing EC2 Instances and Auto Scaling

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Managing EC2 instances and utilizing Auto Scaling are fundamental practices in AWS to ensure **high availability**, **fault tolerance**, and **cost optimization**. This guide covers EC2 management via GUI and CLI, Auto Scaling types and strategies, real-world use cases, and best practices.
![Autoscalling](Day8_autoscalling.png)


[![](https://img.youtube.com/vi/Wj0-Vkx0AKk/0.jpg)](https://www.youtube.com/watch?v=Wj0-Vkx0AKk)

[Watch the video](https://www.youtube.com/watch?v=Wj0-Vkx0AKk)
---

#### 🔍 Why Managing EC2 Instances is Important

1. **Cost Optimization** – Start/stop instances based on demand.
2. **Performance Management** – Resize instances for workload efficiency.
3. **Security Maintenance** – Apply patches and updates.
4. **Resource Utilization** – Monitor and analyze performance.
5. **Backup and Recovery** – Use AMIs and snapshots for resilience.

---

#### 📈 Why Auto Scaling is Important

1. **High Availability** – Automatically replaces unhealthy instances.
2. **Cost Efficiency** – Scales in/out based on load.
3. **Improved Performance** – Maintains app performance under load.
4. **Fault Tolerance** – Balances traffic across instances.

---

#### 🧠 Types of Auto Scaling

##### 1. Dynamic Scaling
- **Target Tracking** – e.g., Maintain CPU at 50%.
- **Step Scaling** – Scale in steps (e.g., add 2 instances if CPU > 80%).
- **Simple Scaling** – Triggered by thresholds.

##### 2. Scheduled Scaling
- Set based on time, e.g., scale up at 9 AM and scale down at 9 PM.

##### 3. Predictive Scaling
- Uses ML to anticipate load spikes and scale proactively.

---

#### ⚖️ Auto Scaling Approaches

| Feature                | Horizontal Scaling         | Vertical Scaling             |
|------------------------|----------------------------|------------------------------|
| Definition             | Adds/removes instances     | Resize the current instance  |
| Scalability            | Near-infinite              | Limited by hardware          |
| Performance            | Handles large-scale loads  | Best for compute-heavy apps  |
| Cost                   | Cost-efficient for traffic | Expensive for high specs     |
| Complexity             | Requires Load Balancer     | Easier but limited           |
| Use Case               | Web apps, microservices    | Databases, single-threaded   |

---

#### 🎯 Scenarios for Auto Scaling

- E-commerce sites during peak sales.
- Batch processing jobs.
- Analytics pipelines with variable loads.
- Microservices scaling per service.

---

#### 🧩 Components of Auto Scaling

1. **Launch Template/Config** – Instance settings like AMI, type, key pair.
2. **Auto Scaling Group (ASG)** – Core unit managing EC2 instances.
3. **Scaling Policies** – Define how/when to scale:
   - Target Tracking
   - Step Scaling
   - Scheduled Scaling

##### Auto Scaling Group Parameters

- **Desired Capacity** – Target number of instances.
- **Min/Max Capacity** – Lower and upper bounds.
- **Policies** – Trigger-based rules for scaling.

---

#### 🛠️ Managing EC2 Instances

##### ✅ GUI Method (AWS Console)

1. **Start/Stop/Reboot**  
   - EC2 Dashboard → Instances → Actions → Start/Stop/Reboot

2. **Resize**  
   - Stop → Actions → Instance Settings → Change Instance Type → Start

3. **Monitor**  
   - Monitoring tab: View CPU, I/O, network metrics

---

##### 🧰 CLI Method

###### Filter by Instance Type
```bash
aws ec2 describe-instances \
  --filters "Name=instance-type,Values=t2.micro" \
  --query "Reservations[*].Instances[*].[InstanceId]" \
  --output text
```

###### Start / Stop / Reboot
```bash
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0
aws ec2 reboot-instances --instance-ids i-1234567890abcdef0
```

###### Resize Instance
```bash
aws ec2 stop-instances --instance-ids i-1234567890abcdef0
aws ec2 modify-instance-attribute --instance-id i-1234567890abcdef0 --instance-type t3.medium
aws ec2 start-instances --instance-ids i-1234567890abcdef0
```

###### Check Status
```bash
aws ec2 describe-instance-status --instance-id i-1234567890abcdef0
```

---

#### 🔄 Auto Scaling in AWS

##### Step 1: Create Launch Configuration/Template

###### ✅ GUI
- EC2 Dashboard → Auto Scaling Groups → Launch Configs/Templates → Create

###### 🧰 CLI
```bash
aws autoscaling create-launch-configuration \
  --launch-configuration-name my-launch-config \
  --image-id ami-12345678 \
  --instance-type t2.micro
```

---

##### Step 2: Create Auto Scaling Group

###### ✅ GUI
- Auto Scaling Groups → Create → Select Launch Config → Set Capacity + Subnets → Review & Create

###### 🧰 CLI
```bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name my-asg \
  --launch-configuration-name my-launch-config \
  --min-size 1 --max-size 5 --desired-capacity 2 \
  --vpc-zone-identifier subnet-12345abc,subnet-67890def
```

---

##### Step 3: Configure Scaling Policies

###### ✅ GUI
- Auto Scaling Group → Automatic Scaling → Add Policy

###### 🧰 CLI (Target Tracking)
```bash
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name my-asg \
  --policy-name my-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{"PredefinedMetricSpecification": {"PredefinedMetricType": "ASGAverageCPUUtilization"}, "TargetValue": 50.0}'
```

---

##### Step 4: Monitor Auto Scaling

###### ✅ GUI
- Auto Scaling Group → Monitoring tab

###### 🧰 CLI
```bash
aws cloudwatch describe-alarms --alarm-name-prefix "my-asg"
```

---

##### Step 5: Delete Auto Scaling Group

###### ✅ GUI
- Auto Scaling Group → Actions → Delete

###### 🧰 CLI
```bash
aws autoscaling delete-auto-scaling-group --auto-scaling-group-name my-asg --force-delete
```

---

#### ✅ Benefits of Auto Scaling

- ✅ Ensures high availability
- 🔄 Automatically adjusts to demand
- 💰 Cost-effective
- 💡 Reliable and responsive

---

#### 🌐 Real-World Use Cases

| Use Case               | How Auto Scaling Helps                     |
|------------------------|--------------------------------------------|
| E-commerce             | Handles traffic surges during sales        |
| Streaming Services     | Scales based on viewer count               |
| Data Pipelines         | Adds compute power dynamically             |
| Microservices          | Individual service scaling per traffic     |

---

#### 🧠 Best Practices

- 🎯 Set realistic thresholds to avoid over-scaling.
- 🌍 Use Multi-AZ for high availability.
- 📊 Monitor using CloudWatch alarms.
- 🧪 Test scaling policies frequently.
- 🔁 Integrate with CI/CD pipelines.

---

#### 🧪 Hands-On Lab: Real-Time Example

##### Scenario: Black Friday Scaling

1. **Launch EC2**
   - AMI: ubuntu
   - Type: `t2.micro`
   - Install Apache:  
     ```bash
     sudo apt install apache2 -y
     sudo systemctl start apache2
     ```

2. **Create Launch Template**
   - Add startup script to install Apache in User Data.

3. **Set Up Auto Scaling Group**
   - Min: 1, Desired: 2, Max: 5
   - Target Tracking: CPU > 50% scale out, < 20% scale in

4. **Simulate Load**
   ```bash
   sudo yum install stress -y
   stress --cpu 4 --timeout 60
   ```

5. **Observe Scaling**
   - View Auto Scaling in action via Console/CLI

6. **Clean Up**
   - Delete Auto Scaling Group and Launch Template

---

#### 📘 AWS CLI Cheat Sheet

##### Basic Syntax
```bash
aws ec2 describe-instances [OPTIONS]
```

##### Common Filters
```bash
--filters "Name=instance-state-name,Values=running"
--filters "Name=tag:Environment,Values=Dev"
--filters "Name=instance-type,Values=t2.micro"
```

##### Query Examples
```bash
aws ec2 describe-instances \
  --query "Reservations[*].Instances[*].[InstanceId,State.Name]" \
  --output table
```

##### Output Formats
```bash
--output json
--output table
--output text
```

---

#### 📎 Pro Tips

- Combine filters, queries, and output to fine-tune data.
- Use `--dry-run` for permission checks.
- Use tags for better resource tracking and filtering.
- Use pagination wisely for large outputs.

---

### Attachments

- [Auto Scaling.png](Auto%20Scaling.png)
- [Day 8 Managing EC2 Instances and Auto Scaling.pdf](Day%208%20Managing%20EC2%20Instances%20and%20Auto%20Scaling.pdf)

## 20. Cohort Practice — Day 8: Cloud Server Setup: Docker, Nginx & Web Deployment

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **deploy a real web server on the cloud** and learn practical server management.

You will:
- Launch a cloud instance (AWS EC2 or Utho)
- Connect via SSH
- Install Nginx
- Configure security groups for web access (port 80 by default for nginx)
- Extract and save logs to a file
- Verify your webpage is accessible from the internet

This is real DevOps work - exactly what you'll do in production.

---

#### Expected Output
By the end of today, you should have:

1. A markdown file named: `day-08-cloud-deployment.md`
2. Screenshots showing:
   - SSH connection to your server
   - Nginx welcome page accessible from browser
   - Log file contents
3. The log file: `nginx-logs.txt`

---

#### Prerequisites
- AWS account (Free Tier) OR Utho account
- Basic understanding of Linux commands (Days 1-7)
- SSH client (Terminal on Mac/Linux, PuTTY on Windows)

---

#### Guidelines

##### Part 1: Launch Cloud Instance & SSH Access (15 minutes)

**Step 1: Create a Cloud Instance**


**Step 2: Connect via SSH**


---

##### Part 2: Install Docker & Nginx (20 minutes)

**Step 1: Update System**


**Step 3: Install Nginx**

**Verify Nginx is running:**

---

##### Part 3: Security Group Configuration (10 minutes)

**Test Web Access:**
Open browser and visit: `http://<your-instance-ip>`

You should see the **Nginx welcome page**!

📸 **Screenshot this page** - you'll need it for submission

---

##### Part 4: Extract Nginx Logs (15 minutes)

**Step 1: View Nginx Logs**

**Step 2: Save Logs to File**

**Step 3: Download Log File to Your Local Machine**
```bash
# On your local machine (new terminal window)
# For AWS:
scp -i your-key.pem ubuntu@<your-instance-ip>:~/nginx-logs.txt .

# For Utho:
scp root@<your-instance-ip>:~/nginx-logs.txt .
```

---


#### Documentation Template

Create your `day-08-cloud-deployment.md` with this structure:

#### Commands Used
[List the key commands you used]

#### Challenges Faced
[Describe any issues and how you solved them]

#### What I Learned
[3-5 bullet points of key learnings]

---


#### Why This Matters for DevOps

This exercise teaches you:
- **Cloud infrastructure provisioning** - launching and configuring servers
- **Remote server management** - SSH, security, access control
- **Service deployment** - installing and running applications
- **Log management** - accessing and analyzing logs
- **Security** - configuring firewalls and security groups

These are core skills for any DevOps engineer working in production.

---


#### Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to the `2026/day-08/` folder
3. Add your `day-08-cloud-deployment.md` file
4. Add your `nginx-logs.txt` file
5. Add screenshots (name them: `ssh-connection.png`, `nginx-webpage.png`, `docker-nginx.png`)
6. Commit and push your changes to your fork

---

#### Learn in Public
Share your Day 08 progress on LinkedIn:

- Post 2-3 lines on deploying your first cloud server
- Share screenshot of your Nginx webpage
- Mention one challenge you faced and solved
- Optional: Share your instance IP (if comfortable)

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

##### Notes: day-08-cloud-deployment

## 21. Hands-on Project — Day 8: Python Unit Testing with Pytest

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Python Unit Testing with Pytest**.  
We’ll explore how to write and run unit tests with `pytest` to ensure code quality and catch bugs early.

---

#### 🎯 Learning Goals
- Install and configure **pytest**.  
- Write simple test functions and use assertions.  
- Group tests into test files and classes.  
- Use fixtures to set up and tear down test data.  
- Run tests with markers and get detailed reports.  

---

#### 🛠️ Lab Setup & Tasks

```text
1. Install pytest
   pip install pytest

2. Write basic tests
   python -m pytest tests/test_math_basic.py

3. Use fixtures
   python -m pytest tests/test_with_fixtures.py

4. Run with markers
   pytest -m "slow"

5. Generate detailed reports
   pytest -v
   pytest --junitxml=report.xml
```

---

#### 💡 Challenge
- Extend the math tests to include **edge cases** (division by zero, negative numbers, large inputs).  
- Add a custom marker `@pytest.mark.integration` and run only those tests.  
- Create a fixture that sets up a temporary file and cleans it up after tests.  

---



#### 📌 Commit
Once complete, commit your progress:
```bash
git add day08-pytest-unit-testing
git commit -m "day08: Python unit testing with pytest — basics, fixtures, markers"
git push
```

### Files

- [math_utils.py](files/hands-on-projects/math_utils.py)
- [tests/test_math_basic.py](files/hands-on-projects/tests/test_math_basic.py)
- [tests/test_with_fixtures.py](files/hands-on-projects/tests/test_with_fixtures.py)
- [tests/test_with_markers.py](files/hands-on-projects/tests/test_with_markers.py)


---

[← Day 07](../day-07/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 09 →](../day-09/README.md)
