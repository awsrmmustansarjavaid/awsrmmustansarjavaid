# Day 28 — Phase 1 Review & GitHub Portfolio Setup

[← Day 27](../day-27/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 29 →](../day-29/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Consolidate Days 1-27
- [ ] Create a professional GitHub profile and repo conventions
- [ ] Prepare a Phase-1 knowledge check

## 2. Prerequisites

- Days 1-27.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Revision method

Active recall + practical rebuilds beat re-reading. Rebuild the lab from your own notes without looking at the course.

### 3.2 Portfolio basics

Profile README, pinned repos with clear READMEs, architecture diagrams, badges, consistent commits, releases.

### 3.3 README anatomy

What/why, architecture diagram, quick start, usage, testing, security, roadmap, license.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Take a 25-question self-test (write answers before checking notes).
2. [ ] Rebuild web-01 from your runbook in 30 min.
3. [ ] Create profile README `USER/USER`.
4. [ ] Pin repos: healthcheck, bash scripts, devops-90-days.
5. [ ] Review all repos for secrets and missing README/license.

## 5. Real-World Scenario

> A recruiter opens your GitHub for 90 seconds. What do they see? Redesign to maximise clarity and credibility.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git log --oneline --since="4 weeks ago" | wc -l
gh repo list --limit 20
gitleaks detect --source . -v
tree -L 2
gh repo edit --description "..." --add-topic devops
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 28 – Revision Day: Everything from Day 1 to Day 27 — Challenge Brief

#### Task

You've covered a lot of ground in 27 days — DevOps fundamentals, Linux deep dives, Shell scripting, Python basics, Git & GitHub, and even your developer branding. Today, **stop and revise**. No new concepts. Just solidify what you've learned.

The goal is to identify gaps, revisit topics you struggled with, and make sure you can confidently explain and use everything covered so far.

---

#### What You've Covered So Far

| Days | Topic | Key Concepts |
|------|-------|-------------|
| 1 | DevOps & Cloud Intro | What is DevOps, SDLC, Cloud basics |
| 2–7 | Linux Fundamentals | Architecture, commands, processes, systemd, file system hierarchy, troubleshooting, text files |
| 8 | Cloud Server Setup | Docker, Nginx, web deployment |
| 9–11 | Users, Permissions & Ownership | User/group management, file permissions, chown/chgrp |
| 12 | Revision Day 1 | Days 1–11 recap |
| 13 | Volume Management | LVM — physical volumes, volume groups, logical volumes |
| 14–15 | Networking | Fundamentals, DNS, IP, subnets, ports, hands-on checks |
| 16–18 | Shell Scripting | Basics, loops, arguments, error handling, functions |
| 19–20 | Shell Scripting Projects | Log rotation, backup, crontab, log analyzer |
| 21 | Shell Scripting Cheat Sheet | Personal reference guide |
| 22–25 | Git & GitHub | Init, branching, merge, rebase, stash, cherry pick, reset, revert, branching strategies |
| 26 | GitHub CLI | Managing GitHub from the terminal |
| 27 | GitHub Profile | Profile README, repo organization, developer branding |

---

#### Challenge Tasks

##### Task 1: Self-Assessment Checklist
Go through the checklist below. For each item, mark yourself honestly:
- **Can do confidently**
- **Need to revisit**
- **Haven't done yet**

###### Linux
- [ ] Navigate the file system, create/move/delete files and directories
- [ ] Manage processes — list, kill, background/foreground
- [ ] Work with systemd — start, stop, enable, check status of services
- [ ] Read and edit text files using vi/vim or nano
- [ ] Troubleshoot CPU, memory, and disk issues using top, free, df, du
- [ ] Explain the Linux file system hierarchy (/, /etc, /var, /home, /tmp, etc.)
- [ ] Create users and groups, manage passwords
- [ ] Set file permissions using chmod (numeric and symbolic)
- [ ] Change file ownership with chown and chgrp
- [ ] Create and manage LVM volumes
- [ ] Check network connectivity — ping, curl, netstat, ss, dig, nslookup
- [ ] Explain DNS resolution, IP addressing, subnets, and common ports

###### Shell Scripting
- [ ] Write a script with variables, arguments, and user input
- [ ] Use if/elif/else and case statements
- [ ] Write for, while, and until loops
- [ ] Define and call functions with arguments and return values
- [ ] Use grep, awk, sed, sort, uniq for text processing
- [ ] Handle errors with set -e, set -u, set -o pipefail, trap
- [ ] Schedule scripts with crontab

###### Git & GitHub
- [ ] Initialize a repo, stage, commit, and view history
- [ ] Create and switch branches
- [ ] Push to and pull from GitHub
- [ ] Explain clone vs fork
- [ ] Merge branches — understand fast-forward vs merge commit
- [ ] Rebase a branch and explain when to use it vs merge
- [ ] Use git stash and git stash pop
- [ ] Cherry-pick a commit from another branch
- [ ] Explain squash merge vs regular merge
- [ ] Use git reset (soft, mixed, hard) and git revert
- [ ] Explain GitFlow, GitHub Flow, and Trunk-Based Development
- [ ] Use GitHub CLI to create repos, PRs, and issues

---

##### Task 2: Revisit Your Weak Spots
1. Pick **3 topics** from the checklist where you marked "Need to revisit"
2. Go back to that day's challenge and redo the hands-on tasks
3. Document what you re-learned in `day-28-notes.md`

---

##### Task 3: Quick-Fire Questions
Answer these from memory (no Googling). Then verify your answers:

1. What does `chmod 755 script.sh` do?
2. What is the difference between a process and a service?
3. How do you find which process is using port 8080?
4. What does `set -euo pipefail` do in a shell script?
5. What is the difference between `git reset --hard` and `git revert`?
6. What branching strategy would you recommend for a team of 5 developers shipping weekly?
7. What does `git stash` do and when would you use it?
8. How do you schedule a script to run every day at 3 AM?
9. What is the difference between `git fetch` and `git pull`?
10. What is LVM and why would you use it instead of regular partitions?

---

##### Task 4: Organize Your Work
1. Make sure all your daily submissions (day-1 through day-27) are committed and pushed
2. Check that your `git-commands.md` is up to date
3. Check that your shell scripting cheat sheet is complete
4. Verify your GitHub profile and repos are clean (from Day 27)

---

##### Task 5: Teach It Back
Pick **one topic** you've learned and write a short explanation (5-10 lines) as if you're teaching it to someone who has never heard of it. Add it to your `day-28-notes.md`.

Examples:
- Explain Git branching to a non-developer
- Explain file permissions to a new Linux user
- Explain what a crontab is and why sysadmins use it

Teaching is the best test of understanding.

---

#### Submission
1. Add your `day-28-notes.md` to `2026/day-28/`
2. Push to your fork
3. Make sure all previous days are pushed and up to date

---

#### Learn in Public

Share your self-assessment results or your "teach it back" explanation on LinkedIn. Be honest about what you found easy and what you need to work on.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀Day 28 – Revision Day: Everything from Day 1 to Day 27 — Notes & Solution

> 📚 **Revision is not about learning something new. It is about making sure the concepts we already learned are strong enough to explain, troubleshoot, and use in real situations.**

#### 🎯 Day 28 Goal

During the first 27 days, I covered DevOps & Cloud fundamentals, Linux administration, LVM, networking, shell scripting, cron automation, Git & GitHub, GitHub CLI, and GitHub profile branding.

Today I reviewed these topics, identified areas that need more practice, answered quick-fire questions, and documented what I learned.

---

#### 1. 📊 My Learning Journey – Day 1 to Day 27

| Days | Topic | What I Learned |
|---|---|---|
| **Day 1** | DevOps & Cloud | DevOps culture, SDLC, automation, cloud fundamentals |
| **Days 2–7** | Linux Fundamentals | Architecture, commands, processes, systemd, filesystem, troubleshooting |
| **Day 8** | Cloud Server Setup | Docker, Nginx and web deployment |
| **Days 9–11** | Users & Permissions | Users, groups, passwords, `chmod`, `chown`, `chgrp` |
| **Day 12** | Revision | Reviewed Days 1–11 |
| **Day 13** | LVM | PV, VG, LV and storage management |
| **Days 14–15** | Networking | IP, DNS, ports, subnets and connectivity troubleshooting |
| **Days 16–18** | Shell Scripting | Variables, conditions, loops, arguments, functions and error handling |
| **Days 19–20** | Shell Projects | Log rotation, backups, cron and log analysis |
| **Day 21** | Shell Cheat Sheet | Created a personal scripting reference |
| **Days 22–25** | Git & GitHub | Branching, merge, rebase, stash, cherry-pick, reset, revert |
| **Day 26** | GitHub CLI | Managing GitHub repositories, issues, PRs and workflows from terminal |
| **Day 27** | GitHub Profile | README, repository organization and developer branding |

---

#### 2. ✅ Self-Assessment Checklist

##### Legend

- 🟢 **Can do confidently**
- 🟡 **Need to revisit**
- 🔴 **Haven't done yet**

#### 🐧 Linux

| Skill | Status | Notes |
|---|:---:|---|
| Navigate filesystem, create/move/delete files | 🟢 | Comfortable with common commands |
| Manage processes | 🟢 | `ps`, `top`, `kill`, background/foreground |
| Work with systemd | 🟢 | `systemctl status/start/stop/enable` |
| Read/edit files with Vim/Nano | 🟢 | Used for configuration and scripts |
| Troubleshoot CPU, memory and disk | 🟢 | `top`, `free`, `df`, `du` |
| Explain Linux filesystem hierarchy | 🟢 | Understand `/etc`, `/var`, `/home`, `/tmp`, `/` |
| Create users and groups | 🟢 | Understand user/group administration |
| Set permissions with `chmod` | 🟢 | Numeric and symbolic permissions |
| Change ownership | 🟢 | `chown` and `chgrp` |
| Create/manage LVM | 🟡 | Understand PV → VG → LV; need continued practice |
| Check network connectivity | 🟢 | `ping`, `curl`, `ss`, `dig`, `nslookup` |
| Explain DNS, IP, subnets and ports | 🟡 | Fundamentals are clear; need more troubleshooting |

#### 🐚 Shell Scripting

| Skill | Status | Notes |
|---|:---:|---|
| Variables, arguments and user input | 🟢 | Practiced through scripts |
| `if/elif/else` and `case` | 🟢 | Comfortable with conditions |
| `for`, `while`, `until` loops | 🟢 | Practiced loops |
| Functions and arguments | 🟢 | Practiced reusable functions |
| `grep`, `awk`, `sed`, `sort`, `uniq` | 🟡 | Need more complex examples |
| `set -euo pipefail` and `trap` | 🟡 | Understand purpose; need deeper practice |
| Schedule scripts with crontab | 🟢 | Practiced scheduled scripts |

#### 🔀 Git & GitHub

| Skill | Status | Notes |
|---|:---:|---|
| Initialize, stage, commit and history | 🟢 | Comfortable |
| Create and switch branches | 🟢 | Practiced repeatedly |
| Push and pull from GitHub | 🟢 | Hands-on |
| Explain clone vs fork | 🟢 | Understand the difference |
| Merge branches | 🟢 | Practiced fast-forward and merge commits |
| Rebase and explain merge vs rebase | 🟡 | Concept clear; need more practice |
| `git stash` / `stash pop` | 🟢 | Practiced with conflicts |
| Cherry-pick commits | 🟡 | Practiced including conflict resolution |
| Squash merge vs regular merge | 🟡 | Understand concept; need practice |
| `git reset` soft/mixed/hard | 🟡 | Need repeated hands-on practice |
| `git revert` | 🟢 | Understand safe undoing of shared history |
| GitFlow / GitHub Flow / Trunk-Based | 🟡 | Need more real-world examples |
| GitHub CLI | 🟢 | Practiced repository, issue and PR workflows |

---

#### 3. 🔎 My Three Main Weak Spots

#### 1️⃣ Git Reset vs Revert / Rebase

- `git reset` moves the branch pointer and can rewrite local history.
- `git revert` creates a new commit that reverses an earlier commit.
- `git rebase` replays commits on top of another base.
- Rebase can create cleaner history but rewrites history.

##### Practical rule

```text
Local/private work
      ↓
reset / rebase can be useful

Shared/public history
      ↓
prefer revert / merge
```

My goal is to become faster at deciding **when to reset, revert, merge, or rebase**.

---

#### 2️⃣ Networking Troubleshooting

A useful troubleshooting flow is:

```text
Application
    ↓
Port
    ↓
IP connectivity
    ↓
Routing
    ↓
DNS
    ↓
Network interface
```

Useful commands:

```bash
ping <ip>
curl http://<ip>:<port>
ss -tulpn
ip addr
ip route
dig example.com
nslookup example.com
```

I want more practice with closed ports, DNS failures, firewall/security-group issues, wrong routes and services that are running but unreachable.

---

#### 3️⃣ Shell Script Error Handling

A safer script can begin with:

```bash
set -euo pipefail
```

This helps with:

- failed commands
- unset variables
- failed commands inside pipelines

I want more practice with `trap`, exit codes, cleanup, error messages and safe variable handling.

> ⚠️ These options are useful safeguards, but they are not a replacement for thoughtful error handling.

---

#### 4. ⚡ Quick-Fire Questions

#### Q1. What does `chmod 755 script.sh` do?

```text
755 = rwx r-x r-x
```

- Owner → read, write, execute
- Group → read, execute
- Others → read, execute

---

#### Q2. Process vs service?

A **process** is a running instance of a program.

A **service** is typically a long-running/background program managed by something such as `systemd`.

```bash
ps aux
systemctl status nginx
```

---

#### Q3. How do you find which process is using port 8080?

```bash
sudo ss -ltnp | grep :8080
```

or:

```bash
sudo lsof -i :8080
```

---

#### Q4. What does `set -euo pipefail` do?

- `-e` → exit when a command fails
- `-u` → treat unset variables as errors
- `pipefail` → a pipeline fails when a command inside it fails

```bash
set -euo pipefail
```

---

#### Q5. `git reset --hard` vs `git revert`?

##### Reset

```bash
git reset --hard HEAD~1
```

Moves the branch pointer and discards working-tree/index changes.

##### Revert

```bash
git revert <commit>
```

Creates a new commit that reverses an earlier commit.

##### Easy memory trick

```text
reset  → move/remove history
revert → add an undo commit
```

---

#### Q6. Recommended branching strategy for a team of 5 shipping weekly?

I would generally recommend **GitHub Flow** for a small team with frequent delivery:

```text
main
  │
  ├── feature/login
  ├── feature/payment
  └── fix/api-timeout
```

Create a short-lived branch → make changes → push → Pull Request → review/CI → merge to `main`.

It is simpler than a heavy GitFlow model and works well with CI/CD.

---

#### Q7. What does `git stash` do?

It temporarily saves uncommitted changes so the working directory becomes clean.

```bash
git stash
git stash pop
```

Useful when I need to switch context without creating an unfinished commit.

---

#### Q8. How do you schedule a script every day at 3 AM?

```bash
crontab -e
```

Add:

```cron
0 3 * * * /path/to/script.sh
```

Cron format:

```text
minute hour day month weekday
  0     3    *    *      *
```

---

#### Q9. `git fetch` vs `git pull`?

##### Fetch

```bash
git fetch origin
```

Downloads remote changes without integrating them into the current branch.

##### Pull

```bash
git pull
```

Usually performs fetch followed by merge/rebase according to configuration/options.

```text
fetch → download + inspect
pull  → download + integrate
```

---

#### Q10. What is LVM?

**LVM (Logical Volume Manager)** provides a flexible layer for managing storage.

```text
Physical Disk
     ↓
Physical Volume (PV)
     ↓
Volume Group (VG)
     ↓
Logical Volume (LV)
     ↓
Filesystem
```

LVM makes storage management more flexible because logical volumes can often be resized and managed independently from the underlying physical disks.

---

#### 5. 👩‍🏫 Teach It Back – Git Branching

Imagine five developers working on the same project.

If everyone changes the same code at the same time, their work can easily conflict.

Git branches provide separate workspaces for features and fixes.

For example:

```bash
git switch -c feature-login
```

I can now develop the login feature without directly changing `main`.

When finished:

```bash
git push -u origin feature-login
```

Then I create a Pull Request for review.

After review and successful CI checks, the branch can be merged into `main`.

```text
main
 │
 ├── feature-login
 │       └── changes
 │
 └── feature-payment
         └── changes
```

**Git branching allows developers to work independently while keeping the main codebase stable.**

---

#### 6. 🛠️ Commands I Want to Keep Fresh

#### Linux

```bash
pwd
ls -la
cd
mkdir
touch
cp
mv
rm
find
grep
cat
less
ps
top
kill
df -h
du -sh
free -h
systemctl status
journalctl
```

#### Networking

```bash
ip addr
ip route
ping
curl
ss
dig
nslookup
```

#### Shell

```bash
chmod +x script.sh
./script.sh
bash -x script.sh
crontab -e
```

#### Git

```bash
git status
git log --oneline --graph
git branch
git switch
git add
git commit
git push
git pull
git fetch
git merge
git rebase
git stash
git stash pop
git cherry-pick
git reset
git revert
```

#### GitHub CLI

```bash
gh auth status
gh repo list
gh repo view
gh repo clone
gh issue list
gh issue create
gh issue view
gh issue close
gh pr list
gh pr create
gh pr view
gh pr merge
gh run list
gh run view
```

---

#### 7. 🧠 Key Lessons From Days 1–27

##### 🐧 Linux
Linux is the foundation for many DevOps environments. Understanding processes, services, storage, permissions and troubleshooting is essential.

##### 🌐 Networking
A DevOps engineer needs to understand how systems communicate through IP addresses, DNS, ports, routing and connectivity.

##### 🐚 Shell Scripting
Automation starts with small scripts. Shell scripting can remove repetitive manual work and build operational automation.

##### 🔀 Git
Git is more than `add`, `commit`, and `push`. Branching, merge, rebase, stash, cherry-pick, reset and revert are important for real workflows.

##### 🐙 GitHub
GitHub adds collaboration around Git through repositories, Pull Requests, Issues, Actions and reviews.

##### 🖥️ GitHub CLI
`gh` brings many GitHub operations directly into the terminal and makes them easier to automate.

##### 👩‍💻 Developer Branding
Technical skills matter, but presenting projects clearly matters too. A clean GitHub profile makes my work easier to understand.

---

#### 8. 📁 Submission Checklist

- [ ] `day-28-notes.md` created
- [ ] Days 1–27 are committed
- [ ] Days 1–27 are pushed to GitHub
- [ ] `git-commands.md` is updated
- [ ] Shell scripting cheat sheet is complete
- [ ] Repository descriptions are meaningful
- [ ] Important repositories are pinned
- [ ] GitHub profile README is updated
- [ ] All changes are pushed to my fork

---

#### 9. 🎯 My Next Focus

The biggest lesson from this revision is:

> **Knowing a command is different from being able to troubleshoot with it.**

My next focus areas are:

1. 🔀 Become more confident with advanced Git workflows.
2. 🌐 Practice networking troubleshooting scenarios.
3. 🐚 Write safer, production-oriented shell scripts.
4. ☁️ Continue building hands-on AWS and DevOps projects.
5. 🤖 Connect these fundamentals with CI/CD and automation.

---

#### 📝 Final Reflection

The first 27 days helped me build a strong foundation across Linux, networking, shell scripting, Git, GitHub and DevOps fundamentals.

This revision showed me that some topics need repeated hands-on practice rather than simply reading commands.

The most important takeaway is:

> **Learning DevOps is not about memorizing commands. It is about understanding why a tool is used, knowing how to troubleshoot problems, and being able to automate repetitive work.**

I'm continuing the journey one day at a time — **learning, practicing, troubleshooting, documenting, and improving.** 🚀

---

<div align="center">

##### 🚀 Day 28 Complete

**Learn → Practice → Break → Troubleshoot → Understand → Improve**

`#90DaysOfDevOps` • `#DevOpsKaJosh` • `#TrainWithShubham`

</div>

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 1-page Phase-1 summary. | You can demonstrate, without notes: *consolidate Days 1-27* — with evidence committed to `day-28/`. |
| 2 | List 5 weakest topics and a plan to revise them. | You can demonstrate, without notes: *create a professional GitHub profile and repo conventions* — with evidence committed to `day-28/`. |
| 3 | Add architecture diagram (Mermaid) to one repo. | You can demonstrate, without notes: *prepare a Phase-1 knowledge check* — with evidence committed to `day-28/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Not sure what to revise | Use the self-assessment questions; weak answers = revision list. |
| Messy repo history | Don't rewrite published history; improve going forward. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Audit your public footprint: no secrets, no personal data, no internal company info.
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

1. What would you show in a portfolio?
2. How do you structure a README?
3. How do you study effectively?
4. What are your 3 strongest skills so far?
5. **Scenario:** A recruiter opens your GitHub for 90 seconds. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I rebuild the lab from notes? | ☐ | ☐ | ☐ | ☐ |
| Is my profile professional? | ☐ | ☐ | ☐ | ☐ |
| Are my repos clean and secret-free? | ☐ | ☐ | ☐ | ☐ |
| Consolidate Days 1-27 | ☐ | ☐ | ☐ | ☐ |
| Create a professional GitHub profile and repo conventions | ☐ | ☐ | ☐ | ☐ |
| Prepare a Phase-1 knowledge check | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-28/` in your own repository:

```text
day-28/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-28
git add day-28/
git commit -m "day-28: phase 1 review & github portfolio setup"
git push -u origin day-28
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Phase 1 review, profile README, portfolio cleanup.

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

## 18. Personal Learning Journal — Day 28: DevSecOps and CI/CD Pipeline Integration

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

"DevOps is not just about shipping faster; it's about shipping code that is secure, reliable, and maintainable." 🔐🚀

Today, I focused on strengthening the DevSecOps and CI/CD pipeline of my DevBoard project by integrating multiple automated code-quality, security, dependency, and container checks. Instead of treating security as a final step before deployment, I worked on integrating these checks directly into the development and CI workflow.

#### 🔍 What I Implemented

##### 🧹 Linting
- Added automated linting to identify coding issues and maintain consistent code quality. 
- Helps catch potential problems early before they reach the build or production environment. 

##### 📊 Code Quality Scanning
- Implemented automated code-quality analysis to identify maintainability issues, bugs, code smells, and potential security weaknesses. 
- The goal is to maintain cleaner and more maintainable code as the project grows. 

##### 📦 Dependency Scanning
- Scanned third-party dependencies for known vulnerabilities. 
- Learned why keeping open-source packages updated is an important part of application security. 

##### 🐳 Hadolint
- Added Hadolint to analyze Dockerfiles. 
- Used it to identify Dockerfile best-practice violations, inefficient instructions, and potential issues in container image construction. 

##### 🛡️ Trivy
- Implemented Trivy for vulnerability scanning. 
- Used it to scan container images and identify known vulnerabilities in operating-system packages and application dependencies. 

##### 🔐 CodeQL
- Integrated CodeQL for semantic code analysis. 
- Learned how CodeQL can identify potential security vulnerabilities by analyzing the relationships and behavior within source code. 

#### 🔄 DevSecOps Pipeline

The overall workflow now follows the principle of "shift-left security":
`Code → Lint → Code Quality → Dependency Scan → CodeQL → Dockerfile Scan → Build Image → Trivy Scan → Deployment`

This approach helps identify security and quality issues before they reach production.

#### 💡 Key Takeaway
Today's biggest lesson was that security should not be treated as a separate phase after development. It should be integrated throughout the CI/CD lifecycle.
Combining linting, code-quality analysis, dependency scanning, CodeQL, Hadolint, and Trivy provides multiple layers of protection across both application code and container infrastructure.

## 19. Challenge Notes — Day 28: Kubernetes RBAC and Security Best Practices

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

---


[![](https://img.youtube.com/vi/QrMMuyJcDZg/0.jpg)](https://www.youtube.com/watch?v=QrMMuyJcDZg)

[Watch the video](https://www.youtube.com/watch?v=QrMMuyJcDZg)



#### What is RBAC?
RBAC (Role-Based Access Control) controls who can perform what actions on which resources.  
It ensures fine-grained permissions and integrates with the Kubernetes API server.  
Used for multi-tenancy, security, and compliance.

---

#### Core RBAC Components
1. **Role** – Namespace-scoped permissions.  
2. **ClusterRole** – Cluster-wide or cross-namespace permissions.  
3. **RoleBinding** – Assigns a Role to users within a namespace.  
4. **ClusterRoleBinding** – Assigns a ClusterRole to users cluster-wide.

---

#### RBAC Best Practices
- Follow Principle of Least Privilege (PoLP).  
- Use namespaces for isolation.  
- Avoid ClusterRole unless necessary.  
- Use ServiceAccounts for workloads.  
- Regularly audit permissions.  
- Avoid using wildcards.

---

#### Kubernetes Security Best Practices
- **Pod Security**: Use `securityContext` to restrict privilege.  
- **Network Policies**: Restrict traffic flow between pods.  
- **Secrets**: Use encrypted secrets, Sealed Secrets, or Vault.  
- **Audit Logging**: Track user actions.  
- **Admission Controllers**: Enforce custom security policies.

---

#### Summary: RBAC Components

| Component            | Scope         | Purpose                            |
|----------------------|---------------|------------------------------------|
| Role                 | Namespaced    | Grant namespace permissions        |
| ClusterRole          | Cluster-wide  | Grant cluster-level permissions    |
| RoleBinding          | Namespaced    | Bind Role to user/SA               |
| ClusterRoleBinding   | Cluster-wide  | Bind ClusterRole to user/SA        |

### Attachments

- [Day 28 - Kubernetes RBAC and Security Best Practices.pdf](Day%2028%20-%20Kubernetes%20RBAC%20and%20Security%20Best%20Practices.pdf)

## 20. Cohort Practice — Day 28: Revision Day: Everything from Day 1 to Day 27

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

You've covered a lot of ground in 27 days — DevOps fundamentals, Linux deep dives, Shell scripting, Python basics, Git & GitHub, and even your developer branding. Today, **stop and revise**. No new concepts. Just solidify what you've learned.

The goal is to identify gaps, revisit topics you struggled with, and make sure you can confidently explain and use everything covered so far.

---

#### What You've Covered So Far

| Days | Topic | Key Concepts |
|------|-------|-------------|
| 1 | DevOps & Cloud Intro | What is DevOps, SDLC, Cloud basics |
| 2–7 | Linux Fundamentals | Architecture, commands, processes, systemd, file system hierarchy, troubleshooting, text files |
| 8 | Cloud Server Setup | Docker, Nginx, web deployment |
| 9–11 | Users, Permissions & Ownership | User/group management, file permissions, chown/chgrp |
| 12 | Revision Day 1 | Days 1–11 recap |
| 13 | Volume Management | LVM — physical volumes, volume groups, logical volumes |
| 14–15 | Networking | Fundamentals, DNS, IP, subnets, ports, hands-on checks |
| 16–18 | Shell Scripting | Basics, loops, arguments, error handling, functions |
| 19–20 | Shell Scripting Projects | Log rotation, backup, crontab, log analyzer |
| 21 | Shell Scripting Cheat Sheet | Personal reference guide |
| 22–25 | Git & GitHub | Init, branching, merge, rebase, stash, cherry pick, reset, revert, branching strategies |
| 26 | GitHub CLI | Managing GitHub from the terminal |
| 27 | GitHub Profile | Profile README, repo organization, developer branding |

---

#### Challenge Tasks

##### Task 1: Self-Assessment Checklist
Go through the checklist below. For each item, mark yourself honestly:
- **Can do confidently**
- **Need to revisit**
- **Haven't done yet**

###### Linux
- [ ] Navigate the file system, create/move/delete files and directories
- [ ] Manage processes — list, kill, background/foreground
- [ ] Work with systemd — start, stop, enable, check status of services
- [ ] Read and edit text files using vi/vim or nano
- [ ] Troubleshoot CPU, memory, and disk issues using top, free, df, du
- [ ] Explain the Linux file system hierarchy (/, /etc, /var, /home, /tmp, etc.)
- [ ] Create users and groups, manage passwords
- [ ] Set file permissions using chmod (numeric and symbolic)
- [ ] Change file ownership with chown and chgrp
- [ ] Create and manage LVM volumes
- [ ] Check network connectivity — ping, curl, netstat, ss, dig, nslookup
- [ ] Explain DNS resolution, IP addressing, subnets, and common ports

###### Shell Scripting
- [ ] Write a script with variables, arguments, and user input
- [ ] Use if/elif/else and case statements
- [ ] Write for, while, and until loops
- [ ] Define and call functions with arguments and return values
- [ ] Use grep, awk, sed, sort, uniq for text processing
- [ ] Handle errors with set -e, set -u, set -o pipefail, trap
- [ ] Schedule scripts with crontab

###### Git & GitHub
- [ ] Initialize a repo, stage, commit, and view history
- [ ] Create and switch branches
- [ ] Push to and pull from GitHub
- [ ] Explain clone vs fork
- [ ] Merge branches — understand fast-forward vs merge commit
- [ ] Rebase a branch and explain when to use it vs merge
- [ ] Use git stash and git stash pop
- [ ] Cherry-pick a commit from another branch
- [ ] Explain squash merge vs regular merge
- [ ] Use git reset (soft, mixed, hard) and git revert
- [ ] Explain GitFlow, GitHub Flow, and Trunk-Based Development
- [ ] Use GitHub CLI to create repos, PRs, and issues

---

##### Task 2: Revisit Your Weak Spots
1. Pick **3 topics** from the checklist where you marked "Need to revisit"
2. Go back to that day's challenge and redo the hands-on tasks
3. Document what you re-learned in `day-28-notes.md`

---

##### Task 3: Quick-Fire Questions
Answer these from memory (no Googling). Then verify your answers:

1. What does `chmod 755 script.sh` do?
2. What is the difference between a process and a service?
3. How do you find which process is using port 8080?
4. What does `set -euo pipefail` do in a shell script?
5. What is the difference between `git reset --hard` and `git revert`?
6. What branching strategy would you recommend for a team of 5 developers shipping weekly?
7. What does `git stash` do and when would you use it?
8. How do you schedule a script to run every day at 3 AM?
9. What is the difference between `git fetch` and `git pull`?
10. What is LVM and why would you use it instead of regular partitions?

---

##### Task 4: Organize Your Work
1. Make sure all your daily submissions (day-1 through day-27) are committed and pushed
2. Check that your `git-commands.md` is up to date
3. Check that your shell scripting cheat sheet is complete
4. Verify your GitHub profile and repos are clean (from Day 27)

---

##### Task 5: Teach It Back
Pick **one topic** you've learned and write a short explanation (5-10 lines) as if you're teaching it to someone who has never heard of it. Add it to your `day-28-notes.md`.

Examples:
- Explain Git branching to a non-developer
- Explain file permissions to a new Linux user
- Explain what a crontab is and why sysadmins use it

Teaching is the best test of understanding.

---

#### Submission
1. Add your `day-28-notes.md` to `2026/day-28/`
2. Push to your fork
3. Make sure all previous days are pushed and up to date

---

#### Learn in Public

Share your self-assessment results or your "teach it back" explanation on LinkedIn. Be honest about what you found easy and what you need to work on.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 21. Hands-on Project — Day 28: Budgets & Cost Alerts (Terraform)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **AWS Budgets** for **monthly cost controls** and **alerts** (actual and forecasted). We’ll create:
- A **monthly cost budget** with **SNS notifications** at two thresholds (e.g., 80% forecasted, 100% actual).
- Optional **service / tag filters** (e.g., only `AmazonEC2` or `Environment=dev`).
- Reusable variables so you can clone budgets per env/account quickly.

> ℹ️ These alerts are account‑level. You can also scope by **Linked Account**, **Service**, **Tag**, or **Cost Category** using filters below.

---

#### 🎯 Learning Goals
- Define **monthly cost budgets** that track **ACTUAL** and **FORECASTED** spend.
- Notify stakeholders via **SNS → Email** (or HTTP endpoint) when a threshold is crossed.
- Filter by **services** or **tags** to target specific workloads/environments.

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (tune variables)
terraform -chdir=terraform plan   -var='budget_amount=50'   -var='emails=["billing@example.com","ops@example.com"]'   -var='services=["AmazonEC2","AmazonEKS"]'   -var='tag_key="Environment"' -var='tag_values=["dev"]'

# 3) Apply
terraform -chdir=terraform apply -auto-approve

# 4) Test
# Force a small threshold (e.g., budget_amount=1) in a sandbox to trigger a notification.
```

**Notes**
- Budgets evaluate periodically (not real‑time). Expect a delay before notifications fire.
- SNS is configured for **Email** by default. Confirm the subscription from your inbox.
- To send to Slack, integrate **SNS → Lambda → Slack** or **AWS Chatbot** (not included here).

---

#### 💡 Challenge
- Create **separate budgets per environment** (`dev`, `staging`, `prod`) with different limits.
- Add a **Usage** budget (e.g., EC2 hours) or a **Savings Plans**/ **RI coverage** budget.
- Wire **Cost Anomaly Detection** (separate service) for ML‑based spikes.

---

#### ✅ Checklist
- [ ] Budget appears in **Cost Management → Budgets**  
- [ ] Subscribers confirm their **SNS email**  
- [ ] Threshold alert arrives when forecast/actual crosses limit  
- [ ] Filters (services/tags) match intended scope

---

#### 📌 Commit
```bash
git add day28-budgets-and-cost-alerts
git commit -m "day28: AWS Budgets — monthly cost, forecast + actual alerts via SNS; filters for services/tags"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 27](../day-27/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 29 →](../day-29/README.md)
