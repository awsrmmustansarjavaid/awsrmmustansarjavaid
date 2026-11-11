# Day 14 — Week 2 Review & Incident Drill: 'The Site Is Down'

[← Day 13](../day-13/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 15 →](../day-15/README.md)

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

- [ ] Combine Linux + networking skills under pressure
- [ ] Write a short post-incident review
- [ ] Build your first reusable troubleshooting playbook

## 2. Prerequisites

- Days 1-13.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Incident approach

Stabilise -> triage -> diagnose -> fix -> verify -> document. Change one thing at a time and record every action with timestamps.

### 3.2 Layered diagnosis

DNS -> network -> TLS -> proxy -> app -> OS resources -> dependencies. Work from the user's request inward.

### 3.3 Blameless culture

Focus on systems and process, not individuals.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Have a friend (or script) break your lab: stop the app, change nginx upstream, fill the disk, block a port.
2. [ ] Diagnose each failure only with CLI tools.
3. [ ] Time each fix and log the commands in `incident-log.md`.
4. [ ] Write a 1-page blameless post-incident review.
5. [ ] Convert findings into a troubleshooting flow in `playbook.md`.

## 5. Real-World Scenario

> It's 03:00 and the pager fires: 'HTTP 503 on www'. You have no GUI and a 15-minute SLA to restore service.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Fast triage sequence
curl -I https://localhost -k
systemctl --failed
ss -tulpn | grep -E ':80|:443|:5000'
sudo nginx -t; sudo tail -n 50 /var/log/nginx/error.log
df -h; free -h; uptime
journalctl -u hello.service -n 50 --no-pager
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 14 – Networking Fundamentals & Hands-on Checks — Challenge Brief

#### Task
Get comfortable with core networking concepts and the commands you’ll actually run during troubleshooting.

You will:
- Map the **OSI vs TCP/IP models** in your own words
- Run essential connectivity commands
- Capture a mini network check for a target host/service

Keep it short, real, and repeatable.

---

#### Expected Output
- A markdown file: `day-14-networking.md`
- Screenshots (optional) of key command outputs

---

#### Quick Concepts (write 1–2 bullets each)
- OSI layers (L1–L7) vs TCP/IP stack (Link, Internet, Transport, Application)
- Where **IP**, **TCP/UDP**, **HTTP/HTTPS**, **DNS** sit in the stack
- One real example: “`curl https://example.com` = App layer over TCP over IP”

---

#### Hands-on Checklist (run these; add 1–2 line observations)
- **Identity:** `hostname -I` (or `ip addr show`) — note your IP.
- **Reachability:** `ping <target>` — mention latency and packet loss.
- **Path:** `traceroute <target>` (or `tracepath`) — note any long hops/timeouts.
- **Ports:** `ss -tulpn` (or `netstat -tulpn`) — list one listening service and its port.
- **Name resolution:** `dig <domain>` or `nslookup <domain>` — record the resolved IP.
- **HTTP check:** `curl -I <http/https-url>` — note the HTTP status code.
- **Connections snapshot:** `netstat -an | head` — count ESTABLISHED vs LISTEN (rough).

Pick one target service/host (e.g., `google.com`, your lab server, or a local service) and stick to it for ping/traceroute/curl where possible.

---

#### Mini Task: Port Probe & Interpret
1) Identify one listening port from `ss -tulpn` (e.g., SSH on 22 or a local web app).  
2) From the same machine, test it: `nc -zv localhost <port>` (or `curl -I http://localhost:<port>`).  
3) Write one line: is it reachable? If not, what’s the next check? (e.g., service status, firewall).

---

#### Reflection (add to your markdown)
- Which command gives you the fastest signal when something is broken?
- What layer (OSI/TCP-IP) would you inspect next if DNS fails? If HTTP 500 shows up?
- Two follow-up checks you’d run in a real incident.

---

#### Submission
1. Add `day-14-networking.md` to `2026/day-14/`
2. Commit and push to your fork

---

#### Learn in Public
Post 2–3 lines on the commands you practiced and one interesting traceroute/curl finding.

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

### 7.2 🌐 Day 14 – Networking Fundamentals & Hands-on Checks — Notes & Solution

#### 🎯 Objective

Today, I learned the basics of computer networking and practiced commonly used Linux networking commands. These commands are essential for troubleshooting connectivity, DNS, routing, HTTP requests, and open ports.

---

#### 📚 Quick Concepts

#### OSI Model vs TCP/IP Model

##### OSI Model (7 Layers)

| Layer             | Purpose                            | Example               |
| ----------------- | ---------------------------------- | --------------------- |
| L7 - Application  | User-facing network services       | HTTP, HTTPS, DNS      |
| L6 - Presentation | Data formatting & encryption       | SSL/TLS               |
| L5 - Session      | Manages communication sessions     | NetBIOS               |
| L4 - Transport    | Reliable communication             | TCP, UDP              |
| L3 - Network      | Routing using IP addresses         | IP                    |
| L2 - Data Link    | Communication within local network | Ethernet, MAC Address |
| L1 - Physical     | Physical transmission              | Cable, Fiber, Wi-Fi   |

---

#### TCP/IP Model (4 Layers)

| Layer       | Protocol Examples     |
| ----------- | --------------------- |
| Application | HTTP, HTTPS, DNS, SSH |
| Transport   | TCP, UDP              |
| Internet    | IP, ICMP              |
| Link        | Ethernet, Wi-Fi       |

---

#### Where Common Protocols Fit

| Protocol     | Layer              |
| ------------ | ------------------ |
| HTTP / HTTPS | Application        |
| DNS          | Application        |
| TCP          | Transport          |
| UDP          | Transport          |
| IP           | Internet / Network |
| Ethernet     | Link / Data Link   |

---

#### Real Example

When we run:

```bash
curl https://example.com
```

The request travels like this:

```text
Application (HTTP)
        ↓
Transport (TCP)
        ↓
Internet (IP)
        ↓
Link (Ethernet/Wi-Fi)
```

This means **HTTP works over TCP, which works over IP**.

---

#### 🛠️ Hands-on Commands

#### 1️⃣ Check System IP Address

##### Command

```bash
hostname -I
```
or
```bash
ip addr show
```
<img width="1919" height="807" alt="Screenshot 2026-08-06 121936" src="https://github.com/user-attachments/assets/f4549c64-8882-47cd-b8aa-f3d5bdf18e5a" />


##### Observation

* Displays the IP address assigned to the machine.
* Useful to identify the host on the network.

---

#### 2️⃣ Check Network Connectivity

##### Command

```bash
ping google.com
```
<img width="1372" height="252" alt="Screenshot 2026-08-06 122009" src="https://github.com/user-attachments/assets/83bfaf1a-e58d-405f-bfe5-6a6a4e0966e4" />


##### Observation

* Packet loss: **0%**
* Average latency: **18 ms**
* Confirms internet connectivity.

---

#### 3️⃣ Check Network Path

##### Command

```bash
traceroute google.com
```
<img width="1841" height="243" alt="Screenshot 2026-08-06 122047" src="https://github.com/user-attachments/assets/b6481926-21f4-4658-b5b7-b53b3c6d01ce" />

##### Observation

* Shows the route packets take to reach the destination.
* A few timeout (`* * *`) hops are normal because some routers block ICMP.

---

#### 4️⃣ View Listening Ports

##### Command

```bash
ss -tulpn
```
<img width="1873" height="253" alt="Screenshot 2026-08-06 122109" src="https://github.com/user-attachments/assets/15de4f6a-544a-404a-b5f6-0031081a585a" />

##### Observation

* SSH service is listening on **Port 22**.
* Confirms the service is ready to accept connections.

---

#### 5️⃣ DNS Lookup

##### Command

```bash
dig google.com
```

<img width="1919" height="706" alt="Screenshot 2026-08-06 122137" src="https://github.com/user-attachments/assets/fc48aad3-ca7f-4c58-9650-3c5a0888e0a4" />

##### Observation

* DNS successfully resolved the domain name into an IP address.

---

#### 6️⃣ Check HTTP Response

##### Command

```bash
curl -I https://google.com
```
<img width="1914" height="445" alt="Screenshot 2026-08-06 122224" src="https://github.com/user-attachments/assets/e7f483a6-5a44-4038-b12f-8d31c32b9db4" />

##### Observation

* Status Code **200** means the website is reachable and working correctly.

---

#### 7️⃣ View Active Connections

##### Command

```bash
netstat -an | head
```
<img width="1300" height="344" alt="Screenshot 2026-08-06 122335" src="https://github.com/user-attachments/assets/11748495-0ee5-47ae-b051-109140838e66" />

##### Observation

This command provides a quick overview of current network connections.

---

#### 🔎 Mini Task – Port Probe

#### Step 1

Find an open port.

```bash
ss -tulpn
```
---

#### Step 2

Test the port.

```bash
nc -zv localhost 22
```

<img width="804" height="143" alt="Screenshot 2026-08-06 123232" src="https://github.com/user-attachments/assets/8cb15608-e24e-47cd-a9b3-56515a36cc24" />

##### Observation

* The port is reachable.
* SSH service is running successfully.

##### If Connection Fails

Check:

* Is the service running?

```bash
systemctl status sshd
```

* Is the firewall blocking the port?

```bash
sudo firewall-cmd --list-all
```
<img width="1092" height="448" alt="Screenshot 2026-08-06 125123" src="https://github.com/user-attachments/assets/9394ac0a-4939-4f46-a005-295300e5e622" />

---

#### 💡 Troubleshooting Summary

| Problem            | First Command  |
| ------------------ | -------------- |
| No Internet        | ping           |
| DNS Issue          | dig / nslookup |
| Website Down       | curl           |
| Port Issue         | ss             |
| Route Issue        | traceroute     |
| Active Connections | netstat        |

---

#### 📝 Reflection

##### Which command gives the fastest signal when something is broken?

**ping**

It quickly tells whether the destination is reachable and shows latency or packet loss.

---

##### If DNS fails, which layer would you inspect?

* **Application Layer (OSI)**
* **Application Layer (TCP/IP)**

Because DNS is an application-layer protocol.

---

##### If HTTP 500 appears, which layer would you inspect?

The network is working because the server responded.

I would investigate:

* Web server logs
* Application logs
* Backend service
* Database connectivity

---

##### Two follow-up checks in a real incident

1. Verify whether the required service is running.

```bash
systemctl status <service-name>
```

2. Check firewall rules and open ports.

```bash
ss -tulpn
```

or

```bash
firewall-cmd --list-all
```

---

#### 📌 Commands Practiced Today

```bash
hostname -I
ip addr show
ping google.com
traceroute google.com
tracepath google.com
ss -tulpn
dig google.com
nslookup google.com
curl -I https://google.com
netstat -an | head
nc -zv localhost 22
systemctl status sshd
firewall-cmd --list-all
```

---

#### 🎯 Key Takeaways

* Learned the difference between the **OSI** and **TCP/IP** networking models.
* Understood where common protocols like **HTTP, HTTPS, DNS, TCP, UDP, and IP** fit.
* Practiced essential Linux networking commands used for real-world troubleshooting.
* Verified connectivity, routing, DNS resolution, HTTP responses, and listening ports.
* Performed a basic port probe and learned the first troubleshooting steps when a service is unreachable.

---

**#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the Week 2 revision summary. | You can demonstrate, without notes: *combine Linux + networking skills under pressure* — with evidence committed to `day-14/`. |
| 2 | Create a script `triage.sh` that automates the first-minute checks. | You can demonstrate, without notes: *write a short post-incident review* — with evidence committed to `day-14/`. |
| 3 | Write the post-incident review using the template. | You can demonstrate, without notes: *build your first reusable troubleshooting playbook* — with evidence committed to `day-14/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| You don't know where to start | Use the layered checklist; check the simplest and most recent change first. |
| Fix works but problem returns | Find root cause; add monitoring and automation. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** During incidents never disable security controls permanently; record exceptions and revert them.
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

1. How do you troubleshoot 'site down'?
2. What is a blameless postmortem?
3. What do you check first?
4. How do you prevent recurrence?
5. **Scenario:** It's 03:00 and the pager fires: 'HTTP 503 on www'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I diagnose in layers? | ☐ | ☐ | ☐ | ☐ |
| Can I write a postmortem? | ☐ | ☐ | ☐ | ☐ |
| Can I automate first-minute checks? | ☐ | ☐ | ☐ | ☐ |
| Combine Linux + networking skills under pressure | ☐ | ☐ | ☐ | ☐ |
| Write a short post-incident review | ☐ | ☐ | ☐ | ☐ |
| Build your first reusable troubleshooting playbook | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-14/` in your own repository:

```text
day-14/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-14
git add day-14/
git commit -m "day-14: week 2 review & incident drill"
git push -u origin day-14
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** incident-log.md, playbook.md, triage.sh, week-2 review.

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

## 18. Personal Learning Journal — Day 14 - DevOps, Jira Project Management & Python OOP Learning

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### Overview
On Day 14, we explored important concepts related to **DevOps project management, Jira, Confluence documentation, SDLC methodologies, and Python Object-Oriented Programming (OOP)**. We learned how development teams manage projects, track tasks, document knowledge, and write structured Python programs using classes and objects.

---

### 1. Jira for DevOps Project Management

#### Introduction to Jira
Jira is a project management and issue-tracking tool developed by Atlassian. It is widely used by software development teams to plan, track, manage, and deliver projects efficiently.

Jira helps teams follow DevOps practices by providing:

- Task management
- Sprint planning
- Issue tracking
- Team collaboration
- Progress monitoring
- Agile workflow management

---

### Jira Project Structure

#### Epic
An **Epic** is a large body of work that contains multiple smaller tasks, stories, and requirements.

Example:
```
Epic: Develop E-Commerce Application

Stories:
- User Authentication
- Product Management
- Payment Integration
```

---

#### Story
A **User Story** describes a feature or requirement from the user's perspective.

Format:

```
As a [user]
I want [feature]
So that [benefit]
```

Example:

```
As a customer,
I want to login,
So that I can access my account.
```

---

#### Task
A **Task** is a specific piece of work that needs to be completed.

Example:

```
Task:
Create Login API
```

---

#### Sub-task
A **Sub-task** is a smaller activity inside a task.

Example:

```
Task:
Create Login System

Subtasks:
- Create UI
- Connect Database
- Add Authentication
```

---

#### Bug
A **Bug** represents an error or issue in the software that needs fixing.

Example:

```
Bug:
Login button crashes the application.
```

---

### Jira Components Learned

#### Boards
Boards provide a visual representation of project progress.

Types:

- Scrum Board
- Kanban Board

Example workflow:

```
To Do
 |
In Progress
 |
Testing
 |
Done
```

---

#### Backlog
The backlog contains all planned work that has not started yet.

It includes:

- User stories
- Tasks
- Bugs
- Future improvements

---

#### Lists
Lists help organize project items and track their progress.

Example:

```
To Do List
Development List
Testing List
Completed List
```

---

#### Spaces
Spaces are used to organize documentation and team knowledge.

Example:

```
Development Space
Project Documentation Space
Team Knowledge Space
```

---

### Confluence Documentation

#### Introduction
Confluence is a documentation and collaboration tool developed by Atlassian.

It is used for:

- Project documentation
- Meeting notes
- Technical guides
- Requirements documentation
- Knowledge sharing

Example documents:

```
Project Requirements
API Documentation
System Design
Meeting Notes
```

---

### Jira Development Workflow

A typical Jira workflow:

```
Requirement
     |
Epic
     |
Story
     |
Task
     |
Sub-task
     |
Development
     |
Testing
     |
Deployment
```

---

### SDLC (Software Development Life Cycle)

SDLC defines the process used to develop software applications.

Stages:

```
1. Planning
2. Requirement Analysis
3. Design
4. Development
5. Testing
6. Deployment
7. Maintenance
```

---

### SDLC Models

#### Waterfall Model

Waterfall is a sequential software development methodology.

Flow:

```
Requirement
      |
Design
      |
Development
      |
Testing
      |
Deployment
      |
Maintenance
```

Characteristics:

- Linear process
- Each phase completed before next phase
- Easy to manage
- Less flexible for changes

---

### Team Management in Jira

#### Teams
Teams allow developers, testers, managers, and stakeholders to collaborate.

Team members can:

- Assign tasks
- Track progress
- Review work
- Manage deadlines

---

#### Site Management

Site management includes:

- User permissions
- Project access control
- Organization settings
- Security management

---

#### Scheduling

Jira scheduling helps manage:

- Deadlines
- Sprint duration
- Task priority
- Release planning

---

### Task Status Management

Common Jira statuses:

```
To Do
 ↓
In Progress
 ↓
Review
 ↓
Testing
 ↓
Completed
```

---

### Fibonacci Series Domain

We studied Fibonacci series as a programming domain example.

Fibonacci sequence:

```
0, 1, 1, 2, 3, 5, 8, 13, 21...
```

Each number is the sum of the previous two numbers.

Formula:

```
F(n) = F(n-1) + F(n-2)
```

---

### Python Programming Concepts

#### Functions

A function is a reusable block of code that performs a specific task.

Example:

```python
def addition(a, b):
    return a + b

print(addition(5, 10))
```

Output:

```
15
```

---

### Python Object-Oriented Programming (OOP)

OOP is a programming approach based on objects and classes.

Main concepts:

- Class
- Object
- Data Members
- Member Functions
- Constructor
- Self Keyword

---

### Class

A class is a blueprint for creating objects.

Example:

```python
class Student:
    pass
```

---

### Object

An object is an instance of a class.

Example:

```python
student1 = Student()
```

---

### Data Members

Data members are variables inside a class that store object information.

Example:

```python
class Student:

    name = "Ali"
    age = 20
```

---

### Member Functions

Member functions are functions defined inside a class.

Example:

```python
class Student:

    def display(self):
        print("Student Information")
```

---

### Constructor (__init__)

The `__init__()` function initializes object data when an object is created.

Example:

```python
class Student:

    def __init__(self, name):
        self.name = name

student = Student("Ahmed")

print(student.name)
```

Output:

```
Ahmed
```

---

### Self Keyword

`self` represents the current object of the class.

It is used to access:

- Variables
- Functions
- Object attributes

Example:

```python
class Car:

    def __init__(self, model):
        self.model = model
```

---

### Python Log Analyzer

We also studied the concept of a log analyzer.

A log analyzer is used to:

- Read system logs
- Detect errors
- Monitor application behavior
- Generate reports

Example:

```
Application Log:

INFO: Server Started
WARNING: High Memory Usage
ERROR: Database Connection Failed
```

Python can analyze these logs using:

- File handling
- Functions
- Classes
- Regular expressions

---

### Tools & Technologies Learned

| Tool/Technology | Purpose |
|---|---|
| Jira | Project Management & Issue Tracking |
| Confluence | Documentation |
| Bitbucket | Source Code Management |
| AI Tools | Productivity Enhancement |
| Python | Programming & Automation |

---

### Day 14 Learning Outcomes

By the end of Day 14, I learned:

✅ Jira project management concepts  
✅ Difference between Epic, Story, Task, Sub-task, and Bug  
✅ Jira boards and backlog management  
✅ Confluence documentation practices  
✅ SDLC and Waterfall model  
✅ Team and site management concepts  
✅ Task scheduling and workflow management  
✅ Fibonacci series programming logic  
✅ Python functions and OOP concepts  
✅ Classes, Objects, Constructors, Self, and Data Members  
✅ Basics of Python log analysis  

---

#### Conclusion

Day 14 provided practical knowledge of **DevOps project management using Jira, documentation using Confluence, SDLC methodologies, and Python Object-Oriented Programming concepts**. These skills are essential for working in modern software development teams.


---

[← Day 13](../day-13/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 15 →](../day-15/README.md)
