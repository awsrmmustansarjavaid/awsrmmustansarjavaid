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

---

[← Day 14](../day-14/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 16 →](../day-16/README.md)
