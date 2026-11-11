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

---

[← Day 07](../day-07/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 09 →](../day-09/README.md)
