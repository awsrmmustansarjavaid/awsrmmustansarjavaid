# Day 01 — DevOps Mindset, Lab Setup & Linux First Steps

— | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 02 →](../day-02/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain DevOps, CALMS and the DevOps lifecycle in your own words
- [ ] Build a working Linux lab (WSL2, VM or cloud VM)
- [ ] Run your first 20 Linux commands confidently

## 2. Prerequisites

- A laptop with 8 GB RAM, internet access, a GitHub account.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 What DevOps really is

DevOps is a culture plus a set of engineering practices that shorten the time from code commit to reliable production. CALMS = Culture, Automation, Lean, Measurement, Sharing. The loop: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Plan. In 2026 the role also covers security (DevSecOps), reliability (SRE), cost (FinOps) and developer experience (platform engineering).

### 3.2 DORA metrics

Deployment frequency, lead time for changes, change failure rate and time to restore service are the four metrics used to measure delivery performance. You will track them for your own capstones.

### 3.3 Why Linux

Almost every server, container and Kubernetes node runs Linux. Distros: Ubuntu/Debian (apt) and RHEL/Rocky/Amazon Linux (dnf). This course uses Ubuntu 24.04 LTS.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install WSL2 (Windows), Multipass/UTM (macOS) or VirtualBox, and create an Ubuntu 24.04 environment.
2. [ ] Run `lsb_release -a`, `uname -r`, `whoami`, `hostname`, `uptime`.
3. [ ] Create the folder `~/devops-90/day-01` and a `notes.md` file inside it.
4. [ ] Create a GitHub repo called `devops-90-days` and clone it locally.
5. [ ] Write a half-page summary of DevOps and the four DORA metrics in `notes.md`.

## 5. Real-World Scenario

> Your manager asks: 'We deploy once a month and each release breaks something. What does DevOps change?' Draft a 5-line answer referencing small batches, automation and feedback loops.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Who am I and where am I?
whoami; hostname; pwd
# OS and kernel information
cat /etc/os-release; uname -r
# Create a workspace and a file
mkdir -p ~/devops-90/day-01 && cd ~/devops-90/day-01 && touch notes.md
# List with details, including hidden files
ls -la
# Built-in manual - learn to read it
man ls; ls --help | head
# Show command history
history | tail -20
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 🚀 My 90 Days DevOps Learning Plan

#### 👨‍💻 Current Level
- Beginner in DevOps
- Learning Linux, Git, AWS, Docker, Kubernetes, and CI/CD
- Completed Graduation and currently building my career in DevOps

#### 💡 My Understanding of DevOps and Cloud
- DevOps is a combination of developers and operations teams. it helps them to work togeter to build, test, and deploy applications faster and more reliably.

- Cloud computing provides servers, storage, networking, and other services over the internet, allowing applications to run without managing physical hardware.

#### 🎯 Why I Am Learning DevOps & Cloud
I want to build expertise in DevOps, solve real-world challenges, and create a successful career in the IT field.

#### 🏆 My Goals for the Next 90 Days
* Improve Linux and troubleshooting skills
* Learn Docker and Kubernetes fundamentals
* Understand CI/CD pipelines and automation
* Build real DevOps projects
* Stay consistent with daily hands-on practice


#### 🛠️ Core DevOps Skills I Want to Build
- Linux Administration and Troubleshooting
- Docker and Kubernetes
- CI/CD using Jenkins and GitHub Actions
- Basics of python

#### ⏰ Weekly Time Budget
- Monday to Friday: 3-4 hours per day
- Saturday & Sunday: 5-6 hours per day

#### 📈 How I Will Stay Consistent
- Study every day without skipping.
- Complete one task each day.
- Push my work to GitHub daily.
- Share my learning journey on LinkedIn.
- Focus on consistency instead of perfection.

#### 🤝 My Commitment
I commit to learning, practicing, and improving every day for the next 90 days. My goal is not just to complete this challenge but to become a confident DevOps Engineer.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Install `tree`, `curl`, `git`, `jq` with apt and record versions. | You can demonstrate, without notes: *explain DevOps, CALMS and the DevOps lifecycle in your own words* — with evidence committed to `day-01/`. |
| 2 | Write a one-page 'My DevOps goals for 2026' document. | You can demonstrate, without notes: *build a working Linux lab (WSL2, VM or cloud VM)* — with evidence committed to `day-01/`. |
| 3 | Explain the difference between Linux distribution, kernel and shell. | You can demonstrate, without notes: *run your first 20 Linux commands confidently* — with evidence committed to `day-01/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `command not found` after install | Run `sudo apt update`, then re-install; check `echo $PATH` and `which <cmd>`. |
| WSL2 will not start | Enable 'Virtual Machine Platform' + hardware virtualization in BIOS, run `wsl --update`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never work as root by default. Use a normal user plus `sudo`. Keep a private GitHub repo until you've checked nothing sensitive is committed.
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

1. What problem does DevOps solve?
2. Name the four DORA metrics.
3. What is the difference between a kernel and a distribution?
4. What does `man` do and why is it important?
5. **Scenario:** Your manager asks: 'We deploy once a month and each release breaks something. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I draw the DevOps loop from memory? | ☐ | ☐ | ☐ | ☐ |
| Can I explain CALMS? | ☐ | ☐ | ☐ | ☐ |
| Can I find OS version and kernel version with two commands? | ☐ | ☐ | ☐ | ☐ |
| Explain DevOps, CALMS and the DevOps lifecycle in your own words | ☐ | ☐ | ☐ | ☐ |
| Build a working Linux lab (WSL2, VM or cloud VM) | ☐ | ☐ | ☐ | ☐ |
| Run your first 20 Linux commands confidently | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-01/` in your own repository:

```text
day-01/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-01
git add day-01/
git commit -m "day-01: devops mindset, lab setup & linux first steps"
git push -u origin day-01
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

## 18. Personal Learning Journal — 🚀 Day 01 - Beginning My #90DaysOfDevOps Journey

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

14 July 2026

---

### Introduction

Today marks the beginning of my **90 Days of DevOps Challenge** under the guidance of **TrainWithShubham (Londhe Shubham)**.

The purpose of this challenge is to become a production-ready DevOps Engineer by learning DevOps concepts from scratch, building projects, and documenting everything publicly.

---

### Today's Learning

Today wasn't about learning tools.

Instead, it was about understanding the roadmap and setting clear expectations.

The roadmap is divided into three major phases.

---

#### Phase 1 — Fundamentals (1 - 1.5 Months)

Focus Areas

- Linux
- Networking
- Git & GitHub
- Basic Scripting
- Operating Systems
- Computer Fundamentals

##### Goal

Build a strong foundation before touching DevOps tools.

> "Strong fundamentals make great engineers."

---

#### Phase 2 — Core DevOps Engineering (2 - 2.5 Months)

Topics include

- Docker
- Kubernetes
- CI/CD Pipelines
- AWS Cloud
- Infrastructure as Code
- Terraform
- Ansible
- Jenkins
- Monitoring

##### Goal

Learn industry-standard DevOps tools and automate deployments.

---

#### Phase 3 — SRE + Python + Projects

Topics

- Python Automation
- Monitoring
- Logging
- Live Projects
- Resume Building
- LinkedIn Optimization
- Job Preparation

##### Goal

Become job-ready with practical experience.

---

### What is DevOps?

DevOps is a culture, methodology, and set of practices that brings together Development (Dev) and Operations (Ops) teams to build, test, deploy, and maintain software faster and more reliably.

Instead of working separately, both teams collaborate throughout the software lifecycle.

---

### Why DevOps?

Traditional software development often faced challenges like:

- Slow deployments
- Manual processes
- Communication gaps
- Frequent production failures
- Difficult rollbacks

DevOps solves these problems by introducing automation, collaboration, and continuous delivery.

Benefits include:

- Faster software delivery
- Better collaboration
- Automated deployments
- Higher reliability
- Improved scalability
- Continuous feedback

---

### My Goals

By the end of this challenge, I want to:

- Master Linux
- Become comfortable with Cloud technologies
- Learn Docker & Kubernetes
- Build CI/CD Pipelines
- Automate infrastructure
- Learn Python for DevOps
- Build production-ready projects
- Become job-ready as a DevOps Engineer

---

### Key Takeaways

- Don't rush.
- Learn concepts before tools.
- Consistency beats motivation.
- Practice every day.
- Build projects alongside learning.

---

### Progress

✅ Day 01 Completed

Days Completed: **1 / 90**

---

### Connect With Me

I will be documenting my learning journey every day.

Let's grow together! 🚀

#90DaysOfDevOps #DevOps #Linux #Cloud #Docker #Kubernetes #AWS #LearningInPublic


---

— | [Roadmap](../90-DAY-ROADMAP.md) | [Day 02 →](../day-02/README.md)
