**🔧 CI / CD Pipeline Notes**

## 🔹 1. What is CI/CD?

**CI/CD (Continuous Integration / Continuous Delivery or Deployment)** is a DevOps practice that automates the software lifecycle:

> **Develop → Build → Test → Release → Deploy**

It reduces manual work, minimizes errors, and enables faster, reliable releases.

## 🔹 2. Software Development Lifecycle in CI/CD

### 🧩 1. Develop Stage

- Developers write code in **feature branches**
- Code is merged into the **main branch (Git workflow)**
- Trigger: `git commit / push`

### ⚙️ 2. Build Stage

- Code is compiled and packaged into artifacts

**Examples:**

- Binary files (`.exe`, `.jar`)
- Docker images
- Static web builds

**Multi-platform builds:**

- Ubuntu (Linux)
- Windows
- macOS

### 🧪 3. Test Stage

Automated testing ensures code quality:

- **Unit Tests** → test individual functions
- **Integration Tests** → test module interaction
- **Regression Tests** → ensure old features still work

### 🚀 4. Release / Deploy Stage

Application is deployed to environments:

- **Development**
- **Staging (pre-production)**
- **Production**

**Additional testing:**

- End-to-End (E2E) Testing
- Smoke Testing
- Performance Testing
- Security Testing
- Compliance Testing
- Alpha / Beta Testing

## 🔹 3. Continuous Integration (CI)

**CI = Build + Test automation**

- Code is automatically:
  - Built
  - Tested
- Happens on every commit

🎯 Goal:

- Detect bugs early
- Avoid “integration hell”

## 🔹 4. Continuous Delivery vs Deployment

### 📦 Continuous Delivery

- Code is ready for production
- **Manual approval required**

**Flow:**

> Build → Test → Staging → E2E Test → ✅ Manual Approval → Production

### 🤖 Continuous Deployment

- Fully automated pipeline
- No human intervention

**Flow:**

> Build → Test → Staging → E2E Test → 🚀 Auto Deploy to Production

## 🔹 5. CI/CD Pipeline Flow

Developer → Commit → Build → Test → Release → Deploy → Production

## 🔹 6. Problems Without CI/CD

- ❌ Integration Hell (merge conflicts, broken builds)
- ❌ Manual deployment errors
- ❌ Code freeze delays
- ❌ Slow and infrequent releases
- ❌ High risk of production failures

## 🔹 7. CI/CD Pipeline Configuration

Pipelines are defined using:

- **YAML files** (most common)
  - `.github/workflows/*.yml`
  - `gitlab-ci.yml`
  - `Jenkinsfile`

## 🔹 8. Popular CI/CD Tools

- GitHub Actions
- Jenkins
- CircleCI
- Travis CI
- Bamboo

## 🔹 9. Deployment Strategies

### 🔵 Blue-Green Deployment

- Two environments:
  - **Blue** = current (live)
  - **Green** = new version
- Switch traffic instantly

✅ Fast rollback  
❌ Requires duplicate infrastructure

### 🐤 Canary Deployment

- Release to **small % of users first**
- Gradually increase traffic

✅ Low risk  
✅ Real user testing

### 🔄 Rolling Deployment

- Deploy gradually across servers/instances
- Example: AWS ALB distributing traffic

✅ No downtime  
❌ Slower rollout

## 🔹 10. Key Concepts Summary

- CI = Build + Test
- CD = Release + Deploy
- Automation is the core
- YAML defines pipelines
- Multiple deployment strategies reduce risk

## 💡 Simple Memory Trick

> **CI → “Check Integration”  
> ** **CD → “Deliver or Deploy”**

## 🔥 Real DevOps Insight (Important)

Since you're building your **Charlie Cafe AWS project**, think like this:

- CI/CD = **brain of automation**
- GitHub Actions = **pipeline engine**
- Docker = **packaging**
- Kubernetes = **deployment platform**
- AWS (Lambda / EC2 / CloudFront) = **infrastructure**

# **🔧 Git & GitHub DevOps Master Notes**

## **(Beginner → Advanced → DevOps Engineer Roadmap)**

# **📘 COVER PAGE**

## **🚀 Title:**

**Git & GitHub Mastery for DevOps Engineering**

## **👨‍💻 Prepared By:**

**IT Charlie**

## **🎯 Purpose:**

**A complete structured roadmap covering Git, GitHub, CI/CD, automation, and DevOps integration—from beginner fundamentals to production-level workflows.**

# **🧠 INTRODUCTION**

## **🔧 What is Git?**

**Git is a Distributed Version Control System (DVCS) that tracks changes in code over time.**

**👉 Simple Meaning:  
Git = *Time machine for your code***

**It helps developers:**

- **Track code history**
- **Collaborate with teams**
- **Revert mistakes**
- **Manage branches efficiently**

## **☁️ What is GitHub?**

**GitHub is a cloud-based platform for hosting Git repositories.**

**It adds collaboration features like:**

- **Pull Requests (code review)**
- **Issues tracking**
- **CI/CD automation (GitHub Actions)**
- **Team collaboration tools**

**👉 Git = Local system  
👉 GitHub = Cloud + teamwork + automation**

## **🚀 Why Learn Git & GitHub for DevOps?**

**In DevOps, Git is the starting point of everything.**

**Every production system follows:**

**Code → Version Control → CI/CD → Build → Test → Deploy → Monitor**

**Without Git:  
❌ No tracking  
❌ No collaboration  
❌ No automation pipeline**

**With Git:  
✔ Full automation  
✔ Safe deployments  
✔ Team collaboration  
✔ Production control**

# **🗺️ COMPLETE DEVOPS ROADMAP (LINKED TO YOUR CHAPTERS)**

## **🌿 CHAPTER 1: Git & GitHub Fundamentals**

- **Version control system**
- **Git architecture**
- **Branching basics**
- **GitHub introduction**
- **Collaboration flow**

**👉 Foundation of DevOps**

## **⚙️ CHAPTER 2: Core Git Commands & Workflow**

- **Git setup**
- **add / commit / push / pull**
- **repository lifecycle**
- **remote repositories**
- **real daily workflow**

**👉 Core working system in real jobs**

## **🚀 CHAPTER 3: GitHub Actions + CI/CD**

- **CI/CD pipelines**
- **GitHub Actions workflow**
- **Docker integration**
- **AWS deployment flow**

**👉 Automation engine of DevOps**

## **🤝 CHAPTER 4: Collaboration System**

- **Pull Requests**
- **Code review process**
- **Fork vs Clone**
- **Merge strategies**
- **Branch protection rules**

**👉 Team-based development system**

## **🔥 CHAPTER 5: Advanced Git Operations**

- **Merge vs Rebase**
- **Cherry-pick**
- **Conflict resolution**
- **Reset / Revert**
- **GitHub Issues**

**👉 Production-level Git control**

## **🧪 CHAPTER 6: Advanced Workflow & Productivity**

- **Git stash**
- **Amend commits**
- **Pull vs Fetch**
- **Git Pages deployment**
- **Safe verification workflows**

**👉 Developer productivity & recovery system**

## **🔍 CHAPTER 7: Debugging & Release Management**

- **Git log & diff**
- **Tags & releases**
- **Aliases**
- **History tracking**

**👉 Debugging + version control system**

## **⚡ CHAPTER 8: Git Hooks Automation**

- **Pre-commit hooks**
- **Pre-push hooks**
- **Security checks**
- **Local automation**

**👉 First layer of DevOps automation**

## **🧠 CHAPTER 9: Git Flags Mastery**

- **Command modifiers**
- **Push/pull flags**
- **Reset/rebase flags**
- **Clone optimization**

**👉 Advanced Git control system**

## **☁️ CHAPTER 10: Git + DevOps Integration**

- **Docker integration**
- **Kubernetes deployment**
- **AWS cloud pipeline**
- **CI/CD full architecture**

**👉 Full production DevOps system**

# **🧭 COMPLETE DEVOPS FLOW (FINAL SYSTEM)**

**Developer → Git Commit → GitHub Push → CI/CD (GitHub Actions)  
→ Docker Build → Cloud Deploy (AWS/Kubernetes)  
→ Monitoring & Logging**

# **📚 WHERE TO LEARN GIT & DEVOPS**

## **🔰 Beginner Level**

- **Git Official Docs:** [**https://git-scm.com/doc**](https://git-scm.com/doc)
- **GitHub Docs:** [**https://docs.github.com**](https://docs.github.com/)

## **🎥 YouTube Channels**

- **freeCodeCamp (Git & DevOps full courses)**
- **TechWorld with Nana (DevOps concepts)**
- **Traversy Media (Git + projects)**

## **☁️ DevOps Practice Platforms**

- **GitHub Codespaces**
- **Gitpod**
- **AWS Free Tier**

## **🧪 Practice Tools**

- **Learn Git Branching (visual Git learning)**
- **Katacoda (DevOps labs)**
- **Play with Docker**

# **🧠 FINAL DEVOPS MINDSET**

**👉 Git is not just a tool  
👉 It is the foundation of modern DevOps systems**

**Golden principle:**

**🚀 “Every code change must be tracked, tested, automated, and deployed safely.”**

# **🧾 FINAL SUMMARY**

**Git & GitHub form the backbone of DevOps by enabling:**

- **Version control**
- **Team collaboration**
- **Automation (CI/CD)**
- **Cloud deployment**
- **Production reliability**

**👉 Mastering Git = First step to becoming a DevOps Engineer**

# **📘 CHAPTER 1: FUNDAMENTALS** 

# **Version Control + Git + GitHub + Git File Lifecycle + Branching + Remote Repositories**

# **🌿 SECTION 1: FUNDAMENTALS** 

## **📌 1. Version Control System (VCS)**

### **📖 Definition**

# A **Version Control System (VCS)** is a tool that tracks and manages changes to files (especially code) over time.

# 

### **🎯 Why It Matters**

# 📜 Maintains complete project history

# 👥 Enables team collaboration

# ⏪ Allows rollback to previous versions

# 🔍 Helps in debugging and auditing

# 

## **🔑 Types of VCS**

### **🗂️ 1. Local VCS**

# Tracks changes on a single machine

# No collaboration support

# 👉 Example: Early file version tools

# 

### **🌐 2. Centralized VCS (CVCS)**

# 👉 Example: Apache Subversion

# One central server stores all code

# Developers push/pull from central repository

# ⚠️ Limitation:

# Server failure = risk of data loss

# Requires constant network connection

# 

### **🔄 3. Distributed VCS (DVCS)**

# 👉 Example: Git

# Every developer has full repository copy

# ✅ Benefits:

# Works offline

# Faster operations

# No single point of failure

# Strong data safety

# 

## **🧠 2. What is Git?**

### **📖 Definition**

# **Git** is a distributed version control system used to track changes in source code.

# 

### **💡 Simple Meaning**

# 👉 **Git = “Time machine for your code”**

# 

### **🔑 Core Features**

# Distributed architecture

# Fast branching & merging

# Complete history tracking

# Offline capability

# 

## **⚙️ Internal Git Architecture (IMPORTANT 🔥)**

# Git works with **three main areas**:

### **📂 1. Working Directory**

# Your actual project files

# 

### **📥 2. Staging Area (Index)**

# Temporary area before commit

# Prepares changes

# 

### **🗃️ 3. Local Repository (**`.git`**)**

# Stores commits and full history

# 

## **🔄 Git Workflow (Core Flow)**

# git add . \# Working → Staging

# git commit -m "" \# Staging → Local Repo

# git push \# Local → Remote

# 👉 Flow: **Working Directory → Staging → Local Repo → Remote Repo**

# 

## **📦 3. What is GitHub?**

### **📖 Definition**

# GitHub is a cloud-based platform for hosting Git repositories.

# 👉 Owned by Microsoft

# 

### **💡 Simple Meaning**

# Git → local version control

# GitHub → cloud + collaboration

# 

### **🔑 Features**

# Repository hosting

# Pull Requests (PRs)

# Code reviews

# Issue tracking

# CI/CD integration

# 

## **⚙️ 4. What is GitHub Actions (CI/CD)**

### **📖 Definition**

# GitHub Actions is a built-in CI/CD automation system.

# 

## **🔄 CI/CD Concept**

### **🔁 Continuous Integration (CI)**

# Automatically build & test code on every push

### **🚀 Continuous Deployment (CD)**

# Automatically deploy application

# 

### **⚙️ Pipeline Flow**

# 👉 Developer → Push → GitHub → Actions → Build → Test → Deploy

# 

### **🔑 Key Concepts**

# Workflow (YAML file)

# Jobs

# Steps

# Runners (execution machines)

# 

## **🔁 5. Other Git Platforms**

# Besides GitHub:

# GitLab → Built-in CI/CD

# Bitbucket → Jira integration

# Azure DevOps → Enterprise pipelines

# 

## **📂 6. Repository (Repo)**

### **📖 Definition**

# A **repository** is a storage location for your project code and its history.

# 

### **🧩 Types**

# 🖥️ Local Repository → on your system

# ☁️ Remote Repository → hosted on GitHub

# 

### **🔐 Access Types**

# Public → visible to everyone

# Private → restricted access

# 

## **🌿 7. Branch (VERY IMPORTANT)**

### **📖 Definition**

# A **branch** is an independent line of development.

# 

### **💡 Why Branches?**

# Develop features safely

# Fix bugs without affecting main code

# Enable parallel work

# 

### **🌳 Common Branch Types**

# `main` → production

# `feature/*` → new features

# `hotfix/*` → urgent fixes

# `develop` → integration (Git Flow)

# 

## **🔄 8. Git File Lifecycle**

### **📖 File States**

# **Untracked → Modified → Staged → Committed**

# 

### **🧠 Explanation**

# Untracked → new file

# Modified → changed file

# Staged → ready to commit

# Committed → saved in history

# 

### **⚙️ Commands**

# git add .

# git commit -m "message"

# 

## **🔍 Visual Flow**

# **Working Directory → (add) → Staging → (commit) → Repository**

# 

### **⚠️ Critical Insight**

# 👉 Git only saves your work when you **commit ** 👉 Until then → your work is NOT safe

# 

## **🔀 9. Merge Concept**

### **📖 Definition**

# Combining changes from one branch into another.

# 

### **⚠️ Merge Conflict**

# Occurs when:

# Same file

# Same line

# Different changes

# 

## **🔁 10. Pull Request (PR)**

### **📖 Definition**

# A **Pull Request** is a request to merge code into another branch.

# 

### **🎯 Used For**

# Code review

# Collaboration

# Approval workflows

# 

## **📂 11. Fork (GitHub Feature)**

### **📖 Definition**

# A **fork** is a copy of someone else’s repository into your account.

# 👉 Used in open-source contributions

# 

## **🔐 12.** `.gitignore` **(Critical DevOps Concept)**

### **📖 Purpose**

# Ignore files from being tracked by Git

# 

### **📌 Examples**

# node_modules/

# .env

# \*.log

# 

### **⚠️ Security Rule**

# 👉 Never push:

# API keys

# Passwords

# Secrets

# 

## **🔑 13. SSH Authentication**

### **📖 Purpose**

# Secure connection without passwords

# ssh-keygen -t rsa -b 4096

# 

## **🔄 14. Fetch vs Pull**

| ****Command**** | ****Meaning****      |
|-----------------|----------------------|
| **git fetch**   | **Download only**    |
| **git pull**    | **Download + merge** |

# 

## **🔀 15. Merge vs Rebase**

| ****Merge****     | ****Rebase****      |
|-------------------|---------------------|
| **Safe**          | **Advanced**        |
| **Keeps history** | **Cleaner history** |

# 

## **🏷️ 16. Git Tags (Versioning)**

# git tag v1.0

# git push origin v1.0

# 👉 Used for releases

# 

## **🧪 17. Git Stash**

# git stash

# git stash pop

# 👉 Temporarily save work

# 

## **⚡ 18. File States (Reinforcement)**

# Untracked

# Modified

# Staged

# Committed

# 

## **⚡ 19. Daily Workflow (Real DevOps)**

# git pull

# git add .

# git commit -m "clear message"

# git push

# 

## **🧠 20. DevOps Insight (MOST IMPORTANT)**

# For DevOps Engineers:

# Git → Version control

# GitHub → Collaboration

# GitHub Actions → Automation

# 

## **🔗 Next Integrations (Your Roadmap)**

# 🐳 Docker

# ☸️ Kubernetes

# ☁️ AWS (CI/CD pipelines)

# 

# **🧾 FINAL SUMMARY**

# 👉 Git manages code history 👉 GitHub stores & shares code 👉 GitHub Actions automates CI/CD

# 

## **🚀 Final DevOps Mindset**

# **Code → Version → Collaborate → Automate → Deploy**

# 

# **🌿 SECTION 2: GitHub Repositories**

## **🌐 What is a Remote Repository?**

A **remote repository** is a version-controlled project hosted on the cloud, typically on platforms like GitHub.

👉 It acts as a **central hub** where teams store, share, and collaborate on code.

## **🔁 Local vs Remote Repository**

| **Feature** | **Local Repository**  | **Remote Repository**            |
|-------------|-----------------------|----------------------------------|
| Location    | Your system           | Cloud (e.g., GitHub)             |
| Usage       | Personal development  | Team collaboration               |
| Speed       | Fast (offline access) | Requires internet                |
| Visibility  | Private by default    | Public or private (configurable) |

👉 Both are part of Git workflow.

## **⚙️ Remote Commands (Core Git Operations)**

### **🔹 Connect Local Repo to Remote**

``` bash
git remote add origin <repo-url>
```

👉 Links your local project to a remote repository.

### **🔹 Push (Upload Code)**

``` bash
git push
```

👉 Sends your local commits to GitHub.

### **🔹 Pull (Download + Merge)**

``` bash
git pull
```

👉 Gets latest changes and merges into your branch.

### **🔹 Clone (Download Full Repository)**

``` bash
git clone <repo-url>
```

👉 Creates a full local copy of the remote repo.

## **🧠 Command Explanation (Simple & Clear)**

### **📥** `git clone`

👉 **Download repository from GitHub**

- Copies full project
- Includes history, branches, tags

### **📤** `git push`

👉 **Upload local commits to GitHub**

- Shares your work with team
- Updates remote repository

### **📥 + 🔀** `git pull`

👉 **Download and apply changes**

- Equivalent to:

``` bash
git fetch + git merge
```

### **🔗** `git remote add origin`

👉 **Connect local repo to remote**

- `origin` = default remote name
- Required before pushing

## **🔄 Real DevOps Workflow**

### **👉 Typical Developer Flow**

``` bash
git clone <repo-url> # Get project
git add . # Stage changes
git commit -m "msg" # Save locally
git push # Upload to GitHub
git pull # Sync latest changes
```

## **🚀 DevOps Insight**

In real-world DevOps using GitHub Actions:

- `git push` → triggers CI/CD pipeline
- `git pull` → keeps developers in sync
- `git clone` → used in build servers

👉 Remote repositories are the **starting point of automation pipelines**.

## **🔧 Additional Useful Commands (Pro Level)**

### **🔹 View Remote URLs**

``` bash
git remote -v
```

### **🔹 Change Remote URL**

``` bash
git remote set-url origin <new-url>
```

### **🔹 Push First Time (Set Upstream)**

``` bash
git push -u origin main
```

👉 Links branch to remote for future pushes

## **⚠️ Common Mistakes**

### **❌ Forgetting to Add Remote**

- `git push` fails

### **❌ Pull Without Checking**

- May cause conflicts

### **❌ Wrong Branch Push**

- Deploying incorrect code

## **💡 Best Practices**

### **✔️ Always Pull Before Push**

``` bash
git pull origin main
```

👉 Avoid conflicts

### **✔️ Use Meaningful Commit Messages**

- Improves collaboration

### **✔️ Protect Main Branch**

- Use PRs instead of direct push

### **✔️ Verify Remote Connection**

``` bash
git remote -v
```

## **🧾 Final Summary**

- 🌐 Remote repository = cloud-based Git repo
- 🔗 Connect using `git remote add origin`
- 📥 Clone → download repo
- 📤 Push → upload changes
- 🔄 Pull → sync changes

👉 In DevOps:

**Local Work → Push → Remote Repo → CI/CD → Deployment**

# **🌿 SECTION 3: Branching in Git (CORE DEVOPS SKILL 🚀)**

## **📖 What is Git Branching?**

In Git, a **branch** is an independent line of development.

👉 It allows developers to:

- Work on features
- Fix bugs
- Experiment safely

…without affecting the main (production) code.

## **🎯 Purpose of Branching**

- 🔄 Enable parallel development
- 🛡️ Protect production code
- 👥 Allow multiple developers to work simultaneously
- 🧪 Support safe experimentation

## **💡 Why Branching is Critical in DevOps**

Branching is the **foundation of team workflows** in platforms like GitHub.

👉 It enables:

- Clean CI/CD pipelines
- Structured releases
- Controlled deployments

## **🌳 Common Branch Types**

### **🔹** `main` **/** `master`

- Production-ready code
- Always stable

### **🔹** `feature/*`

- New features
- Created from main or develop

### **🔹** `hotfix/*`

- Critical production fixes
- Fast-track deployment

### **🔹** `develop` **(Git Flow)**

- Integration branch
- Combines all features before release

## **⚙️ Core Branch Commands**

### **🔹 List Branches**

``` bash
git branch
```

### **🔹 Create Branch**

``` bash
git branch feature-x
```

### **🔹 Switch Branch (Old Method)**

``` bash
git checkout feature-x
```

### **🔹 Switch Branch (Modern Method ✅)**

``` bash
git switch feature-x
```

### **🔹 Create + Switch**

#### **Old Method:**

``` bash
git checkout -b feature-x
```

#### **Modern Method:**

``` bash
git switch -c feature-x
```

## **🚀 Push Branch to Remote**

``` bash
git push -u origin feature-x
```

### **🔍 What** `-u` **Means**

👉 Sets **upstream tracking**

So next time you can simply run:

``` bash
git push
```

## **🔄 Branching Workflow (Real DevOps)**

### **👉 Typical Feature Development Flow**

``` bash
git checkout main
git pull
git checkout -b feature-login
# do work
```

git add .

``` bash
git commit -m "Add login feature"
git push -u origin feature-login
```

👉 Then:

- Create Pull Request
- Code review
- Merge into main

## **🧠 DevOps Insight**

Branching enables **safe CI/CD pipelines** using tools like GitHub Actions:

- Each branch can trigger its own pipeline
- Feature branches → testing environment
- Main branch → production deployment

## **⚡ Real DevOps Branch Strategy**

### **🔹 Git Flow Model**

- `main` → production
- `develop` → integration
- `feature/*` → development
- `hotfix/*` → emergency fixes

### **🔹 Simplified Workflow (Common Today)**

- `main` → production
- `feature/*` → development

👉 Faster and widely used in modern teams

## **⚠️ Common Mistakes**

### **❌ Working Directly on Main**

- Risky for production

### **❌ Not Pulling Latest Changes**

- Causes conflicts

### **❌ Long-Lived Branches**

- Hard to merge later

## **💡 Best Practices**

### **✔️ Always Branch from Latest Main**

``` bash
git pull origin main
```

### **✔️ Keep Branches Short-Lived**

- Merge quickly

### **✔️ Use Meaningful Names**

- `feature-login`, `bugfix-auth`

### **✔️ Use Pull Requests**

- Never merge directly

### **✔️ Delete Merged Branches**

``` bash
git branch -d feature-x
```

## **🧾 Final Summary**

- 🌿 **Branch = Independent development line**
- 🚀 Enables parallel development
- 🛡️ Protects production code
- 🔄 Essential for DevOps workflows

👉 In real DevOps:

**Branch → Develop → Test → PR → Merge → Deploy**

# **🌿 SECTION 4: Git Branching Strategy**

## **📖 What is a Branching Strategy?**

A **branching strategy** in Git is a **structured workflow for creating, managing, and merging branches** in a project.

👉 It defines how teams:

- Develop features
- Fix bugs
- Test code
- Release software

## **🎯 Why Branching Strategy Matters in DevOps**

In real DevOps pipelines (like those using GitHub Actions):

- 🚀 Faster delivery cycles
- 🧪 Reliable testing pipelines
- 👥 Smooth team collaboration
- ⚠️ Fewer production issues
- 🔄 Stable CI/CD automation

👉 In short:  
**Better strategy = better software delivery**

# **🌿 1. GitFlow Strategy (Traditional Model)**

GitFlow is a **structured multi-branch system** used in large teams.

## **🌳 Core Branches**

### **🟢** `main`

- Production-ready code
- Always stable
- Connected to deployment pipeline

👉 Rule: ❌ Never commit directly

### **🟡** `develop`

- Integration branch
- Contains latest working features
- Used for testing before release

## **🌿 Supporting Branches**

### **🔵 Feature Branches (**`feature/*`**)**

👉 Used for new development

``` bash
git checkout develop
git checkout -b feature/login-api
```

✔ Safe development  
✔ Parallel work  
✔ Isolated changes

### **🔴 Hotfix Branches (**`hotfix/*`**)**

👉 Used for urgent production fixes

``` bash
git checkout main
git checkout -b hotfix/payment-bug
```

Then merge back:

``` bash
git checkout main
git merge hotfix/payment-bug
git checkout develop
git merge hotfix/payment-bug
```

✔ Fix production fast  
✔ Keep branches in sync

## **🔁 GitFlow Workflow**

feature → develop → test → main (production)

↑ ↓

hotfix ────────────────┘

## **⚙️ CI/CD Behavior in GitFlow**

- feature/\* → unit tests
- develop → integration testing
- main → production deployment

## **✔️ Advantages**

- Structured workflow
- Stable production system
- Good for large teams

## **❌ Disadvantages**

- Too complex
- Slower releases
- Heavy branching overhead

# **🚀 2. Trunk-Based Development (Modern DevOps)**

This is the **modern industry standard** used in fast DevOps teams.

## **🔹 Core Idea**

👉 Work directly on `main` using small, short-lived branches

## **🌿 Workflow**

``` bash
git checkout -b feature-login
git commit -m "add login UI"
git push origin feature-login
```

Then merge quickly:

``` bash
git checkout main
git merge feature-login
```

## **✔️ Advantages**

- ⚡ Fast delivery
- 🔄 Continuous integration friendly
- 🧪 Easier CI/CD pipelines
- ❌ Fewer merge conflicts

## **❌ Disadvantages**

- Requires discipline
- Strong automated testing needed

# **⚔️ GitFlow vs Trunk-Based**

| **Feature**    | **GitFlow (Traditional)** | **Trunk-Based (Modern)** |
|----------------|---------------------------|--------------------------|
| Complexity     | High                      | Low                      |
| Speed          | Slow                      | Fast                     |
| CI/CD Friendly | Medium                    | Excellent                |
| Branches       | Many                      | Few                      |
| Best For       | Enterprise systems        | DevOps teams             |

# **🧠 DevOps Insight**

👉 Modern companies prefer:

- Trunk-Based Development
- Automated CI/CD pipelines

Because speed + automation = better delivery.

# **⚠️ Common Mistakes**

- ❌ Committing directly to `main`
- ❌ Long-lived feature branches
- ❌ Forgetting to merge hotfix back
- ❌ Not using PR reviews

# **💡 Pro DevOps Practices**

✔ Keep branches short-lived  
✔ Always use Pull Requests  
✔ Protect `main` branch  
✔ Use meaningful commit messages  
✔ Tag releases properly:

``` bash
git tag v1.0.0
git push origin v1.0.0
```

# **🔄 Real DevOps Workflow**

``` bash
git pull
git checkout -b feature-login
```

git add .

``` bash
git commit -m "add login feature"
git push origin feature-login
```

👉 Then:

- PR review
- CI/CD runs
- Merge to main
- Deploy automatically

# **🚀 Final DevOps Mindset**

- 🌿 Feature branches → safe development
- 🟡 Develop → integration testing
- 🟢 Main → production deployment
- 🔴 Hotfix → emergency response

# **🧾 Final Summary**

- A branching strategy defines **how code moves in a team**
- GitFlow = structured but heavy
- Trunk-Based = fast and modern
- CI/CD depends heavily on clean branching

👉 In real DevOps:

**Branch → Build → Test → Review → Deploy → Monitor**

# **📘 CHAPTER 2: Git Basics Setup** 

# **🌿 SECTION 1:Git Basics Setup & Core Commands**

## **⚙️ 1. Git Installation & Setup**

### **🖥️ Install Git**

**Windows:**

- Download from official Git website

**Linux:**

``` bash
sudo apt install git
```

👉 Git is part of the workflow in tools like Git used across DevOps pipelines.

## **🔧 Initial Configuration (VERY IMPORTANT)**

Git needs identity for commits.

``` bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### **📌 Example:**

``` bash
git config --global user.name "testisler"
git config --global user.email "test123@email.com"
```

## **🔍 Verify Configuration**

``` bash
git config --list
```

## **🧠 Concept: Global vs Local**

| **Type** | **Scope**                   |
|----------|-----------------------------|
| --global | Applies to all repositories |
| local    | Current repository only     |

# **📂 2. Core Git Architecture (IMPORTANT 🔥)**

Git has **3 main areas**:

### **🧩 1. Working Directory**

- Where you edit files

### **📥 2. Staging Area (Index)**

- Prepares changes before commit

### **🗃️ 3. Local Repository**

- Stores commit history

## **🔄 Flow**

Working Directory → Staging Area → Local Repository

# **🚀 3. Start a Git Project**

``` bash
git init
```

👉 Initializes a repository  
👉 Creates hidden `.git/` folder (tracks history)

# **🔍 4. Check File Status**

``` bash
git status
git status --short
```

## **🧠 File States**

- Untracked
- Modified
- Staged
- Committed

# **➕ 5. Add Files (Staging)**

``` bash
git add filename
```

git add .

``` bash
git add -A
```

## **🧠 Difference**

| **Command**  | **Meaning**                     |
|--------------|---------------------------------|
| git add .    | Current directory               |
| git add -A   | Entire repo (including deletes) |
| git add file | Specific file                   |

# **💾 6. Commit Changes**

``` bash
git commit -m "Your message"
```

## **🧠 Snapshot Concept**

👉 Git does NOT store full copies every time  
👉 It stores **snapshots of changes**

💡 Think:  
**Commit = Save point in a game 🎮**

## **✍️ Commit Best Practices**

✔ Good:

- Added login API
- Fixed navbar bug

❌ Bad:

- update
- fix

# **📜 7. View History**

``` bash
git log
git log --oneline
```

### **🔥 Advanced View**

``` bash
git log --oneline --graph --all
```

👉 Shows branch structure visually

# **🌿 8. Rename Default Branch**

``` bash
git branch -M main
```

👉 Standard modern branch name

# **🌐 9. Connect to Remote Repo**

``` bash
git remote add origin <repo-url>
```

👉 Connects local repo to GitHub

## **🧠 Concept**

- `origin` = default remote name

# **🚀 10. Push Code**

``` bash
git push -u origin main
```

### **🧠 Meaning**

- `-u` → sets upstream tracking
- Future push becomes:

``` bash
git push
```

# **📥 11. Pull Latest Code**

``` bash
git pull origin main
```

👉 Fetch + merge latest changes

# **📦 12. Clone Repository**

``` bash
git clone <repo-url>
```

👉 Downloads full project from remote repo

# **🔁 13. Full First-Time Workflow (CRITICAL 🔥)**

``` bash
git init
```

git add .

``` bash
git commit -m "Initial commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

# **⚖️ 14. Staging vs Committing**

| **Staging**    | **Committing**     |
|----------------|--------------------|
| Temporary area | Permanent snapshot |
| Select changes | Save changes       |
| git add        | git commit         |

# **🧠 15. Git Internal Insight (DevOps Level)**

- Stored in `.git/` folder
- Uses SHA-1 hashes
- Every commit contains:
  - Unique ID
  - Author
  - Timestamp
  - Message

# **⚠️ 16. Common Mistakes**

❌ Forgot commit before push  
❌ Wrong branch push  
❌ Not pulling before pushing  
❌ Bad commit messages

# **⚡ 17. Daily Workflow**

``` bash
git pull
```

git add .

``` bash
git commit -m "clear message"
git push
```

# **🧾 18. Final Summary**

- `git init` → start repo
- `git add` → stage changes
- `git commit` → save snapshot
- `git push` → upload to remote
- `git pull` → sync updates
- `git clone` → download project

## **🚀 Final DevOps Mindset**

👉 In real pipelines using GitHub Actions:

**Code → Commit → Push → Test → Deploy**

# **🌿 SECTION 2: Browser-Based Git Practice Setup**

## **🥇 Best Overall: GitHub Codespaces**

**GitHub Codespaces** is the closest thing to a real DevOps lab running entirely in your browser.

### **✅ What you get**

- Full Visual Studio Code in the browser
- Git pre-installed (no setup required)
- Built-in terminal access
- Direct integration with GitHub repositories
- Support for Docker, Node.js, and modern dev tools

### **💡 Why it’s ideal for DevOps learners**

If you're learning **DevOps, AWS, and CI/CD**, Codespaces provides:

- A real-world development environment
- Hands-on Git workflow practice
- Cloud-based development with zero installation

### **🧪 You can practice:**

``` bash
git clone
git branch
git merge
git push
```

👉 Recommended as your **primary learning environment**

## **🥈 Interactive Learning: Learn Git Branching**

### **✅ Best for:**

- Visual understanding of Git concepts
- Branching, merging, and rebasing

### **💡 Features:**

- Interactive, game-like interface
- No installation required
- Instant feedback

👉 Best for **concept clarity**, not real-world projects

## **🥉 Alternative: Gitpod**

- Similar to Codespaces
- Launches a full dev environment from a repo
- Git pre-installed

👉 Good backup if Codespaces free usage is limited

## **🧪 Quick Practice: Replit**

- Simple browser-based IDE
- Terminal access with Git
- Easy for quick experiments

👉 Not as powerful, but useful for basic practice

## **⚠️ Reality Check (Important)**

You *can* learn Git fully online, but in real DevOps environments:

- You will use both **local and cloud setups**
- You will need:
  - Git CLI on your machine
  - SSH key configuration
  - Repository management skills

### **📌 Learning Phases**

- **Phase 1 (Learning):** Browser-based tools ✔
- **Phase 2 (Professional):** Local + Cloud setup ✔

# **🚀 Practical Guide: Using GitHub Codespaces**

## **🧱 Step 1: Create Repository**

1.  Go to GitHub
2.  Click **New Repository**
3.  Name it: `git-practice-lab`
4.  Click **Create Repository**

## **💻 Step 2: Launch Codespace**

1.  Open your repository
2.  Click **Code (green button)**
3.  Select **Codespaces tab**
4.  Click **Create codespace on main**

👉 Opens full browser-based VS Code

## **🧠 Step 3: Understand Interface**

- 🗂 File Explorer (left)
- 🧾 Code Editor (center)
- 💻 Terminal (bottom)

👉 This is a **real Linux environment in the cloud**

## **⚙️ Step 4: Verify Git**

Open terminal:

Ctrl + \`

Run:

``` bash
git --version
```

✅ Git is ready to use

## **🧪 Step 5: First Git Practice**

### **1. Create a file**

``` bash
echo "Hello DevOps Charlie" > app.txt
```

### **2. Check status**

``` bash
git status
```

### **3. Add file**

git add .

### **4. Commit**

``` bash
git commit -m "First commit"
```

### **5. Push to GitHub**

``` bash
git push
```

👉 Your first commit is now live 🎉

## **🌿 Step 6: Branching Practice (DevOps Essential)**

``` bash
git checkout -b feature-login
echo "Login feature" >> app.txt
```

git add .

``` bash
git commit -m "Added login feature"
git push origin feature-login
```

### **Then on GitHub:**

- Create a **Pull Request**
- Merge the changes

👉 This simulates a **real CI/CD workflow**

## **🔥 Step 7: Stop Codespace**

After practice:

1.  Go to repository
2.  Open **Codespaces tab**
3.  Stop/Delete active Codespace

👉 Helps save free usage hours

## **⚠️ Free Usage Note**

Codespaces provides limited free usage (approx. 60 hours/month for free accounts).

## **🎯 Pro Tip (DevOps Path)**

You can also use Codespaces to practice:

- Docker containers 🐳
- Node.js applications
- GitHub Actions (CI/CD pipelines)
- Linux commands

# **🚀 Learning Roadmap (Charlie DevOps Path)**

### **✅ Step 1 (Start Now)**

Use Codespaces and practice:

``` bash
git clone
git status
```

git add .

``` bash
git commit -m "update"
git push
```

### **⏭ Step 2 (After 1–2 Weeks)**

Move to:

- Branching strategies
- Merge conflicts
- Pull requests
- CI/CD integration

# **🌿 SECTION 3: Real Git Project Simulation (End-to-End)**

## **🎯 Scenario:**

Build a **Login Feature + Fix Bug + Release Version**

# **🔹 Step 1: Start project**

``` bash
git init
git checkout -b main
```

# **🔹 Step 2: Create feature branch**

``` bash
git checkout -b feature-login
```

## **Add code:**

console.log("Login feature");

## **Commit:**

``` bash
git commit -am "add login feature"
```

# **🔹 Step 3: Create Pull Request (simulate)**

Merge into main:

``` bash
git checkout main
git merge feature-login
```

# **🔹 Step 4: Delete branch**

``` bash
git branch -d feature-login
```

# **🔹 Step 5: Bug found in production**

``` bash
git checkout -b hotfix-login-bug
```

Fix:

console.log("Login bug fixed");

## **Commit:**

``` bash
git commit -am "fix login bug"
```

## **Merge hotfix:**

``` bash
git checkout main
git merge hotfix-login-bug
```

# **🔹 Step 6: Tag release**

``` bash
git tag v1.0
git push origin v1.0
```

# **🔥 6. Best Practices (Real DevOps)**

✔ Keep branches short-lived  
✔ Use Pull Requests for merging  
✔ Always run CI/CD before merge  
✔ Use meaningful branch names  
✔ Delete branches after merge

# **🧠 7. Branch Naming Convention**

| **Type** | **Example**    |
|----------|----------------|
| Feature  | feature/login  |
| Bugfix   | bugfix/navbar  |
| Hotfix   | hotfix/payment |
| Release  | release/v1.0   |

# **⚙️ 8. Integration with CI/CD**

With tools like GitHub Actions:

- PR triggers pipeline
- Tests run automatically
- Deployment after merge

# **🚀 FINAL SUMMARY**

## **You learned:**

- What branching strategy is
- GitFlow workflow (structured model)
- Trunk-based workflow (modern DevOps)
- Real project simulation
- When to use each strategy

# **🧭 DevOps Mindset**

👉 GitFlow = Control & Stability  
👉 Trunk-Based = Speed & Automation

#  **📘 CHAPTER 3: GitHub Actions**

# **GitHub Actions CI/CD + Advanced Git Workflows (Monorepo, Submodules) & Integration**

# **Full DevOps Pipeline**

This chapter ties everything together: **real CI/CD with GitHub Actions**, a **full DevOps flow (Git + Docker + AWS)**, and **advanced Git repo structures** (monorepo & submodules).

# **🌿 SECTION 1: Github Action Fundamental**

# **🚀 1. What is CI/CD (in practice)?**

## **🔹 CI (Continuous Integration)**

Every push/PR:

Automatically:

- Build code
- Run tests
- Validate pull requests

👉 Goal: Detect bugs early

## **🔹 CD (Continuous Delivery/Deployment)**

After CI passes:

Automatically:

- Deploy application to staging or production
- Ensure release readiness

👉 Goal: Fast and safe deployment

# **⚙️ 2. GitHub Actions (CI/CD Intro)**

## **📖 What it is**

GitHub Actions is a **built-in CI/CD automation tool** provided by GitHub that allows you to:

- Automate software workflows directly from your repository
- Run tests, build applications, and deploy code
- Trigger tasks based on GitHub events (push, pull request, merge, schedule, etc.)

👉 In simple terms:

> GitHub Actions is like a **virtual DevOps assistant inside GitHub** that automates your development pipeline.

## **🧠 Core Idea**

Every time something happens (push, PR, tag), GitHub can:  
👉 Build → Test → Deploy automatically

### **🧠 Works on:**

Push / Pull / Schedule / Events

# **3. Benefits of GitHub Actions**

## **✔ Automation**

- No manual testing or deployment

## **✔ Code Quality Improvement**

- Runs linting, testing, security checks

## **✔ Fast Development**

- Immediate feedback on every push

## **✔ Scalability**

- Runs multiple jobs in parallel

## **✔ Secure**

- Uses encrypted secrets
- IAM-like permissions for workflows

## **✔ Native GitHub Integration**

- No external CI tool required (like Jenkins)

# **4. What are GitHub Actions in CI/CD?**

GitHub Actions in CI/CD are **automated workflows that perform tasks like:**

### **CI Tasks:**

- Build code
- Run unit tests
- Code linting
- Static code analysis

### **CD Tasks:**

- Deploy to AWS / Azure / GCP
- Push Docker images to registry
- Deploy Kubernetes apps
- Release production versions

# **5. GitHub Actions Workflow Overview**

A workflow is an **automated pipeline defined in YAML**.

📁 Location:

.github/workflows/

## **🔑 Key Components**

| **Component** | **Meaning**                |
|---------------|----------------------------|
| Workflow      | Full automation file       |
| Job           | Group of tasks             |
| Step          | Single command             |
| Runner        | Machine executing workflow |

### **1. Event (Trigger)**

Defines when workflow runs

Examples:

- push
- pull_request
- schedule
- manual (workflow_dispatch)

### **2. Job**

A set of steps executed on a runner

- Jobs run **in parallel by default**
- Can be made sequential using dependencies

### **3. Step**

Individual task inside a job

Examples:

- run shell command
- checkout code
- install dependencies

### **4. Runner**

A machine that executes jobs

Types:

- GitHub-hosted runner (Ubuntu, Windows, Mac)
- Self-hosted runner

## **🚀 DevOps Insight**

GitHub Actions replaces tools like:

- Jenkins (traditional CI/CD)
- GitLab CI/CD

# **⚙️ 6. Real CI/CD Pipeline**

## **🔄 CI/CD Pipeline Flow**

Developer → Push → GitHub → Actions Trigger → Build → Test → Deploy

## **📁 Project Structure**

project/

├── app.js

├── package.json

├── Dockerfile

└── .github/workflows/pipeline.yml

## **📂 Workflow File (YAML)**

Location:

.github/workflows/ci.yml

## **🔄 GitHub Actions Workflow Structure**

    name: CI Pipeline
    on: push
    jobs:
    build:
    runs-on: ubuntu-latest

# **7. GitHub Actions Execution Flow**

    Event occurs
    ↓
    Workflow triggered
    ↓
    Jobs start execution (parallel or sequential)
    ↓
    Steps executed inside jobs
    ↓
    Runner executes commands
    ↓
    Workflow completes

# **🧪 8. Basic CI Pipeline (Test + Build)**

**Basic GitHub Actions Workflow Example**

``` yaml
name: CI Pipeline
on:
pull_request:
push:
branches: [main]
jobs:
build:
runs-on: ubuntu-latest
steps:
- name: Checkout code
uses: actions/checkout@v4
- name: Install Node
uses: actions/setup-node@v4
with:
node-version: 18
- name: Install dependencies
run: npm install
- name: Run tests
run: npm test
```

## **🧠 What happens:**

- PR created → pipeline runs
- Tests must pass before merge

# **🐳 9. Add Docker Build**

## **🔹 Dockerfile**

``` dockerfile
FROM node:18
WORKDIR /app
```

COPY . .

    RUN npm install
    CMD ["node", "app.js"]

## **🔹 Add to pipeline:**

\- name: Build Docker image

run: docker build -t myapp .

# **☁️ 10. Push Image to AWS ECR**

Using Amazon Web Services

## **🔹 Add secrets in GitHub:**

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

## **🔹 Pipeline step:**

``` yaml
- name: Login to AWS ECR
run: |
aws ecr get-login-password --region us-east-1 \
```

\| docker login --username AWS --password-stdin YOUR_ECR_URL

    - name: Push image
    run: |
    docker tag myapp:latest YOUR_ECR_URL/myapp:latest
    docker push YOUR_ECR_URL/myapp:latest

# **🚀 11. Deploy Step (Example EC2)**

``` yaml
- name: Deploy to EC2
run: |
ssh user@server "docker pull myapp && docker run -d -p 80:3000 myapp"
```

# **🌿 SECTION 2: Git Workflow**

# **🔁 1. DevOps Git Workflow Models** 

Git workflows define **how teams collaborate, integrate, and deploy code**. Choosing the wrong workflow doesn’t just slow you down — it creates **merge conflicts, broken deployments, and team frustration**.

## **🌊 1. Git Flow (Structured & Controlled)**

### **📌 Branch Structure:**

- `main` → Production-ready code
- `develop` → Integration branch
- `feature/*` → New features
- `release/*` → Pre-production stabilization
- `hotfix/*` → Urgent production fixes

### **🧠 When It Makes Sense:**

- Enterprise environments
- Regulated industries (banking, telecom)
- Applications with **versioned releases** (desktop/mobile software)

### **⚠️ Reality Check:**

Git Flow is **not modern DevOps-friendly**:

- Slows down delivery
- Heavy branching = more merge conflicts
- Poor fit for CI/CD pipelines

👉 Use it only when **process control \> speed**

## **🌿 2. GitHub Flow (Simple & Fast)**

### **📌 Workflow:**

    Create branch → Commit → Pull Request → Review → Merge → Deploy

### **🧠 Core Principle:**

👉 **Anything in** `main` **must always be deployable**

### **🧠 Best Use Cases:**

- SaaS platforms
- APIs and web apps
- Continuous deployment environments

### **⚠️ Limitations:**

- No built-in support for multiple versions
- Requires strong discipline (testing, reviews)

👉 Works best when you have:

- CI/CD pipeline
- Automated testing
- Small to medium teams

## **⚡ 3. Trunk-Based Development (Advanced DevOps 🔥)**

### **📌 Concept:**

- Work directly on `main` (trunk)
- Use **short-lived branches** (hours or max 1–2 days)
- Frequent integration

### **🧠 Key Practices:**

- Feature flags (incomplete features hidden)
- Small commits
- Continuous integration

### **🧠 Best Use Cases:**

- High-performance DevOps teams
- CI/CD-heavy systems
- Large-scale SaaS (single production version)

### **⚠️ Challenges:**

- Requires strong testing culture
- Needs experienced developers
- Cultural shift (discipline + automation)

👉 Feels risky… but becomes **fastest and most stable** when done right

## **⚖️ Workflow Comparison (Reality-Based)**

| **Model**   | **Complexity** | **Speed** | **Best For**                |
|-------------|----------------|-----------|-----------------------------|
| Git Flow    | High           | Slow      | Enterprise / versioned apps |
| GitHub Flow | Medium         | Fast      | Modern web apps             |
| Trunk-Based | Low            | Very Fast | Mature DevOps teams         |

# **🔄 4. Real CI/CD Git Workflow (Production Standard)**

Developer → Push Code → Pull Request → CI Pipeline Runs

→ Code Review → Merge → CD Deploys Automatically

### **🔑 Golden Rules:**

- ❌ No direct commits to `main`
- ✅ PR must pass CI
- ✅ At least 1 approval required
- ✅ Code must be deployable at all times

# **🧩 5. Branching Rules (Professional Standard)**

### **🔹 Main Branch**

- Always stable, tested, deployable
- Protected (no direct commits)

### **🔹 Feature Branch**

- Naming:  
  >   
  > feat/123-login-page  
  > fix/456-api-error

- Short-lived (1–3 days max)
- Frequently rebased/merged

### **🔹 Hotfix Branch**

- Created from `main`
- Naming:  
  >   
  > hotfix/789-critical-bug

- Merged back into:
  - `main`
  - `develop` (if exists)

# **⚙️ 6. GitHub Actions Workflow Strategy**

### **🔹 CI Strategy**

- Run tests on every push
- Prevent broken code

### **🔹 CD Strategy**

- Deploy only after CI success
- Use environments:
  - `dev`
  - `staging`
  - `production`

### **🔹 Branch Strategy Example**

- `main` → Production
- `develop` → Testing
- `feature/*` → Development

# **🔁 7. Workflow Topologies (CI/CD Pipelines)**

### **🔹 Sequential**

Build → Test → Deploy

### **🔹 Parallel**

Lint + Test + Build (same time)

### **🔹 Matrix**

Test across versions:

- Node 16 / 18 / 20
- Ubuntu / Windows

### **🔹 Multi-Stage Pipeline**

CI → Security Scan → Build → Deploy → Monitor

# **🧪 8. Real DevOps Usage**

Git workflows power:

- Docker build & push
- AWS deployments (EC2, ECS, EKS)
- Kubernetes rollout
- Terraform automation
- API testing pipelines

# **🧠 9. Why Different Workflows Exist**

Because teams differ in:

- Team size
- Deployment frequency
- Product type
- Risk tolerance

👉 One workflow **cannot fit all**

# **🧬 10. Hybrid Workflow (Best Practical Approach 🚀)**

Reality:  
👉 Most modern companies use a **Hybrid Workflow**, not pure Git Flow or pure Trunk-Based.

## **🔹 What is Hybrid Workflow?**

A combination of:

- GitHub Flow simplicity
- Trunk-Based speed
- Git Flow control (when needed)

## **🔹 Example Hybrid Model**

- `main` → Production (protected)
- Short-lived `feature/*` branches
- PR-based merging
- CI/CD enforced
- Feature flags for incomplete work
- Optional `release/*` only when needed

## **🔹 How Hybrid Works in Practice**

Feature branch → PR → CI → Merge to main → Auto Deploy

For critical fixes:

Hotfix → PR → Fast-track merge → Deploy

For large releases (optional):

Create release branch → stabilize → merge to main

## **🔹 Why Hybrid Wins**

- Fast like Trunk-Based
- Safe like GitHub Flow
- Flexible like Git Flow

👉 This is **real-world DevOps workflow**

# **🎯 11. How to Choose the Right Workflow (Decision Guide)**

### **Ask these questions:**

### **1. What are you building?**

- SaaS / Web App → GitHub Flow / Hybrid
- Enterprise Software → Git Flow
- High-scale system → Trunk-Based

### **2. How often do you deploy?**

- Daily / Hourly → Trunk-Based / Hybrid
- Weekly / Monthly → Git Flow

### **3. Team Experience?**

- Beginner team → GitHub Flow
- Experienced DevOps → Trunk-Based

### **4. Do you need multiple versions?**

- Yes → Git Flow
- No → Trunk-Based / GitHub Flow

## **👉 Final Rule:**

> The best workflow is the one that **maximizes feedback speed and minimizes risk**

# **🧠 12. Professional DevOps Tips (Real-World)**

### **🚀 Speed & Quality**

- Keep branches short-lived
- Merge frequently
- Avoid “long-running feature branches”

### **🔐 Security**

- Never hardcode secrets
- Use GitHub Secrets / Vault

### **⚡ Performance**

- Use CI caching
- Optimize pipeline time

### **🤖 Automation**

Automate everything:

- Tests
- Linting
- Security scans
- Deployment

### **📏 Measure Performance (DORA Metrics)**

- Deployment Frequency
- Lead Time for Changes
- Mean Time to Recovery
- Change Failure Rate

### **🧩 Culture Matters More Than Tools**

Even the best workflow fails if:

- No code reviews
- No testing
- Poor discipline

# **🔥 Final Practical Advice (Very Important)**

- Don’t blindly follow Git Flow (outdated for DevOps)
- Don’t jump to Trunk-Based without strong CI/CD
- Start simple → evolve gradually

## **✅ Recommended Path (For You)**

Since you're learning DevOps:

👉 Start with:

- GitHub Flow

👉 Then move to:

- Hybrid Workflow

👉 Finally (advanced):

- Trunk-Based Development

## **💡 Golden Principle**

> “Optimize for fast feedback, not perfect process.”

# **🛠️ 13. Tools for Git Workflows (DevOps Stack)**

Git workflow alone is not enough — you need the **right tools ecosystem** to make it practical, automated, and scalable.

👉 A complete Git workflow stack includes:

- Version control platform
- CI/CD automation
- Code review & collaboration
- Issue tracking & integration

## **🔹 1. Git Hosting Platforms (Core Layer)**

These are where your workflow actually lives.

### **🥇 GitHub (🔥 Most Recommended)**

- Industry standard (especially for DevOps learners)
- Built-in CI/CD via GitHub Actions
- Huge ecosystem (marketplace, integrations)
- Best for GitHub Flow & Hybrid workflows

👉 Why it wins:

- Zero setup CI/CD
- Massive community
- Easy collaboration

📌 Reality:

> If you don’t know what to choose → choose GitHub

### **🥈 GitLab**

- All-in-one DevOps platform (repo + CI/CD + security)
- Built-in pipelines (no external tools needed)

👉 Best for:

- Enterprise DevOps
- Self-hosted environments

📌 Strength:

- Full DevOps lifecycle in one tool

### **🥉 Bitbucket**

- Strong integration with Jira & Atlassian tools
- Built-in CI/CD (Bitbucket Pipelines)

👉 Best for:

- Teams already using Jira

📌 Strength:

- Tight Jira integration improves workflow tracking

# **⚙️ 2. CI/CD Tools (Automation Layer)**

These tools turn your Git workflow into **real DevOps pipelines**.

### **🥇 GitHub Actions (🔥 Top Choice)**

- Built directly into GitHub
- YAML-based workflows
- Huge marketplace (10,000+ actions)

👉 Why it’s the best:

- No setup required
- Works on push/PR automatically
- Supports matrix builds, caching, deployments

👉 Best for:

- GitHub Flow
- Hybrid workflows
- Beginners → Advanced DevOps

### **🥈 GitLab CI/CD**

- Fully integrated with GitLab
- Auto DevOps (auto pipeline detection)

👉 Best for:

- Enterprise / self-hosted DevOps

📌 Strength:

- Complete DevOps solution in one platform

### **🥉 Jenkins**

- Old but powerful
- Huge plugin ecosystem

👉 Best for:

- Legacy systems
- Custom pipelines

⚠️ Reality:

- High maintenance
- Requires setup & server management

# **🔧 3. Supporting Tools (Workflow Enhancement)**

### **🔹 Issue Tracking & Project Management**

- Jira → Enterprise teams
- GitHub Issues → Simple workflows

### **🔹 Code Quality & Automation**

- SonarQube → Code analysis
- Prettier → Formatting
- ESLint → Code standards

### **🔹 DevOps Integration Tools**

- Docker → Build & ship apps
- Kubernetes → Deployment
- Terraform → Infra automation

# **🧠 14. Tool Selection Based on Workflow**

## **🌊 Git Flow (Enterprise)**

Use:

- GitLab + GitLab CI/CD
- Jenkins (if legacy)
- Jira

👉 Because:

- Needs control, approvals, structured releases

## **🌿 GitHub Flow (Modern Apps)**

Use:

- GitHub + GitHub Actions

👉 Because:

- Simple, fast, minimal setup

## **⚡ Trunk-Based Development**

Use:

- GitHub or GitLab
- Strong CI/CD (Actions or GitLab CI)
- Feature flag tools

👉 Because:

- Requires automation + fast feedback

## **🧬 Hybrid Workflow (🔥 Best Practical)**

Use:

- GitHub (repo + PR)
- GitHub Actions (CI/CD)
- Docker + AWS

👉 Why:

- Balanced speed + control
- Easy to scale

# **🏆 15. My Professional Recommendation (For You)**

Based on your goal (DevOps + AWS + learning):

## **✅ Best Stack (Highly Recommended)**

- Git Platform → **GitHub**
- CI/CD → **GitHub Actions**
- Containers → Docker
- Cloud → AWS

👉 This combo is:

- Beginner-friendly
- Industry-relevant
- Used in real DevOps pipelines

# **⚠️ Honest Industry Truth (Important)**

- Jenkins is still used → but mostly in old companies
- GitHub Actions is dominating modern DevOps
- GitLab is strong in enterprises

👉 Most startups + modern teams:  
➡️ Use **GitHub + Actions**

# **🎯 Final Practical Advice**

### **🚀 Don’t overcomplicate tools**

Start with:

- GitHub
- GitHub Actions

Master:

- PR workflow
- CI/CD pipeline
- Branching strategy

### **🔥 Golden Rule**

> “Tools don’t make DevOps — automation + discipline does.”

# **🌿 SECTION 3: GitHub Actions – CI/CD Execution, Scheduling & Control** 

# **1. GitHub Actions Commands & Important Keywords**

GitHub Actions does NOT use traditional CLI commands.

Instead, it uses YAML instructions:

## **🔹 Key Keywords**

| **Keyword** | **Purpose**           |
|-------------|-----------------------|
| `name`      | Workflow name         |
| `on`        | Trigger event         |
| `jobs`      | Define jobs           |
| `runs-on`   | Runner type           |
| `steps`     | Task list             |
| `run`       | Execute shell command |
| `uses`      | Use predefined action |
| `with`      | Input parameters      |

## **🔹 Example with actions** 

``` yaml
steps:
- name: Checkout code
uses: actions/checkout@v4
- name: Setup Node
uses: actions/setup-node@v4
with:
node-version: 18
```

# **2. How to Setup GitHub Actions**

## **Step 1: Create folder**

.github/workflows/

## **Step 2: Create YAML file**

Example:

.github/workflows/ci.yml

## **Step 3: Add workflow**

``` yaml
name: CI Pipeline
on: push
jobs:
build:
runs-on: ubuntu-latest
steps:
- name: Checkout code
uses: actions/checkout@v4
- name: Run script
run: echo "CI pipeline running"
```

## **Step 4: Push to GitHub**

Workflow will run automatically

## **⏰ 3. Scheduled GitHub Actions (Cron Jobs)**

Used for automation like:

- backups
- monitoring
- periodic deployments


    on:
    schedule:
    - cron: "0 0 * * *"

👉 Runs automatically daily

## **Scheduled WorkflowsExample**

    name: scheduled-workflow
    on:
    schedule:
    - cron: "0 12 * * *"
    jobs:
    run-script:
    runs-on: ubuntu-latest
    steps:
    - name: Print Message
    run: echo "message"

## **🕒 Cron Format Explanation** 

- minute hour day month weekday

Example:

- `0 12 * * *` → Every day at 12 PM

## **🚫 4. Disable Workflow**

Used when:

- Debugging pipeline
- Stopping automation temporarily

# **How to Disable GitHub Actions**

## **Method 1: Disable in repository settings**

Settings → Actions → Disable Actions

## **Method 2: Delete workflow file**

Remove `.github/workflows/*.yml`

## **Method 3: Remove triggers**

on: \[\]

# **5. Job Concurrency in GitHub Actions**

### **📖 Purpose:**

- Avoid multiple pipelines running at same time
- Concurrency controls how many workflows run at the same time.

## **Example:**

``` yaml
concurrency:
group: production
cancel-in-progress: true
```

### **Meaning:**

- Only one workflow runs at a time
- Old runs get cancelled

👉 Useful for:

- deployments
- production pipelines

## **⚛️6. Angular Build Automation**

### **Flow:**

- Push code
- Install dependencies
- Build project

## **📦 7. Artifacts & Caching (IMPORTANT)**

### **📖 Artifacts:**

Store build files temporarily

### **📖 Cache:**

Speed up dependencies install

## **🔐 8. SSH Key Authentication (GitHub Security)**

### **📖 Purpose:**

Secure GitHub access without password

    ssh-keygen -t rsa -b 4096

## **🔥 Best Practice Flow:**

1.  Create feature branch
2.  Push code
3.  Create PR
4.  CI runs automatically
5.  Merge after success
6.  CD deploys to server

# **🚀 FINAL DEVOPS FLOW**

Code → Push → GitHub Actions → Build → Test → Deploy → Monitor

# **🧾 FINAL SUMMARY**

- CI = build + test automation
- CD = deployment automation
- GitHub Actions = CI/CD engine inside GitHub
- YAML workflows define pipelines
- Everything runs on events

## **🧠 Final DevOps Mindset**

👉 In real systems:

**Push Code → Automation Handles Everythin**

# **🌿 SECTION 4: Git Security**

# **🔐 1. Git Security** 

## **📁 .gitignore (Critical)**

Used to ignore sensitive files:

node_modules/

.env

\*.log

## **🔑 Secret Management**

### **❌ NEVER store:**

- API keys
- Passwords
- AWS credentials

### **✅ Use:**

- GitHub Secrets (in Actions)
- Environment variables
- Secret managers (AWS, Vault)

## **🛡️ Branch Protection Rules**

On GitHub:

- Require pull request before merge
- Require code reviews
- Require CI checks to pass

# **🔐 SECTION 5: Security in CI/CD**

# **Secrets, Commit Signing & Secure CI/CD Workflows**

Security in Git is not optional anymore. Most real-world breaches today happen because of **leaked secrets, weak workflows, or unverified commits**.

👉 This chapter covers:

- 🔐 Secrets management (local + Git + CI/CD)
- 🔏 Commit signing (trust & verification)
- 🛡️ Secure Git workflows (DevOps best practices)

# **🧠 1. What is “Git Security”?**

## **🔹 Definition:**

Git security is the practice of **protecting sensitive data and ensuring trust in code history**.

## **🔍 Key risks:**

❌ API keys pushed to repo  
❌ Hardcoded passwords  
❌ Unauthorized commits  
❌ Compromised CI/CD pipelines

# **🔐 2. Secrets in Git (Biggest Risk Area)**

## **🔥 What is a secret?**

- API keys
- AWS credentials
- Database passwords
- Tokens (JWT, OAuth)

## **❌ BAD Practice (Never do this):**

const AWS_SECRET = "abcd1234";

👉 Once pushed → it is **public forever (even if deleted later)**

# **✅ 3. Safe Ways to Store Secrets**

## **🔹 1. Environment Variables (Local Development)**

export DB_PASSWORD=secret123

In code:

process.env.DB_PASSWORD

## **🔹 2.** `.env` **File (but NOT committed)**

    DB_PASSWORD=secret123
    API_KEY=xyz123

## **🔹 Add to** `.gitignore`**:**

.env

## **🧠 Rule:**

👉 `.env` file must NEVER go to Git

# **🔐 4. Secrets in CI/CD (Very Important)**

In platforms like GitHub:

## **🔹 Store secrets securely:**

Settings → Secrets → Actions

## **🔹 Example:**

env:

DB_PASSWORD: \${{ secrets.DB_PASSWORD }}

## **🔥 Benefits:**

✔ Encrypted  
✔ Not visible in logs  
✔ Safe for pipelines

# **🛡️ 5. Secrets Management Tools (Advanced DevOps)**

Use external secret managers:

- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault

## **🧠 Real DevOps Flow:**

App → Request secret → Vault → Return secure secret

# **🚨 6. What to Do If Secret is Leaked**

## **🔥 Immediate steps:**

1.  Rotate secret (change key)
2.  Remove from repo
3.  Rewrite history

## **🔹 Remove file:**

``` bash
git rm --cached .env
```

## **🔹 Rewrite history:**

``` bash
git filter-branch --force
```

👉 Or use modern tool:

- BFG Repo-Cleaner

# **🔍 7. Prevent Secret Leaks (Automation)**

## **🔹 Pre-commit Hook:**

``` bash
#!/bin/sh
```

if grep -r "SECRET_KEY" .; then

``` bash
echo "❌ Secret detected!"
exit 1
fi
```

## **🔹 Tools:**

- git-secrets
- truffleHog

# **🔏 8. Git Commit Signing (Trust System)**

## **🔹 Why signing?**

👉 Ensures commit is from **real trusted developer**

## **🔐 Types:**

- GPG signing
- SSH signing (modern)

# **⚙️ 9. Setup GPG Signing**

## **🔹 Step 1: Generate key**

gpg --full-generate-key

## **🔹 Step 2: List keys**

gpg --list-secret-keys --keyid-format=long

## **🔹 Step 3: Configure Git**

``` bash
git config --global user.signingkey YOUR_KEY_ID
```

## **🔹 Step 4: Enable signing**

``` bash
git config --global commit.gpgsign true
```

## **🔹 Commit:**

``` bash
git commit -S -m "signed commit"
```

## **🔍 Result:**

✔ Verified badge in GitHub

# **🔐 10. SSH Signing (Modern Alternative)**

``` bash
git config --global gpg.format ssh
```

👉 Uses SSH key instead of GPG

# **🛡️ 11. Secure Git Workflow (DevOps Level)**

## **🔹 1. Protect branches**

- No direct push to main
- Use Pull Requests

## **🔹 2. Require:**

✔ Code review  
✔ CI/CD checks  
✔ Signed commits

## **🔹 3. Enable:**

- Branch protection rules
- Required approvals

# **🔄 12. Secure CI/CD Workflow**

## **🔹 Best Practices:**

✔ Use secrets from platform  
✔ Never hardcode credentials  
✔ Limit access permissions  
✔ Rotate secrets regularly

## **🔹 Example pipeline:**

    on: push
    jobs:
    deploy:
    runs-on: ubuntu-latest
    steps:
    - run: echo "Deploying..."
    env:

TOKEN: \${{ secrets.DEPLOY_TOKEN }}

# **⚠️ 13. Common Security Mistakes**

❌ Pushing `.env` file  
❌ Sharing API keys in chat  
❌ Using same key everywhere  
❌ Not rotating secrets  
❌ Using `--force` blindly

# **🧠 14. Real DevOps Security Mindset**

👉 Assume everything in Git can become public  
👉 Always use least privilege access  
👉 Automate security checks  
👉 Trust but verify (commit signing)

# **🚀 FINAL SUMMARY**

## **You learned:**

### **🔐 Secrets:**

- Never store in Git
- Use env variables / secret managers

### **🔏 Signing:**

- Verify commit identity
- Use GPG or SSH signing

### **🛡️ Security:**

- Protect branches
- Use CI/CD secrets
- Scan for leaks

# **🧭 DevOps Golden Rules**

✔ Never commit secrets  
✔ Always use PR + review  
✔ Sign commits  
✔ Use secret managers  
✔ Automate security

## **🧠 DevOps Insight**

Security is not optional:  
👉 One leaked `.env` = production compromise

✔ Use GitHub Secrets  
✔ Never hardcode credentials  
✔ Limit IAM permissions  
✔ Rotate keys regularly

# **🌿 SECTION 6: Git Integration**

# **🔗 1. Real DevOps Integration (BIG PICTURE 🔥)**

This is where Git becomes **DevOps pipeline backbone**.

## **🐳 Docker Integration**

### **Flow:**

- Push code → Build Docker image → Push to registry

## **☸️ Kubernetes Integration**

### **Flow:**

- Update deployment YAML → Apply to cluster → Deploy app

## **☁️ AWS CI/CD Integration**

Using Amazon Web Services:

- Code → GitHub
- CI/CD → GitHub Actions
- Image → ECR
- Deploy → ECS / EKS / EC2

## **🔧 Automation Tools**

- Jenkins → Traditional CI/CD
- GitHub Actions → Modern CI/CD
- Docker → Containerization
- Kubernetes → Deployment

# **🔄2. Real CI/CD Pipeline (DevOps Level 🔥)**

## **📊 End-to-End Flow:**

1.  Developer pushes code
2.  GitHub Actions triggered
3.  Run tests
4.  Build Docker image
5.  Push to registry
6.  Deploy to Kubernetes / AWS
7.  Monitor application

## **🧠 Important Concept:**

👉 **Everything is automated**

# **⚠️ 12. Common Mistakes**

❌ Hardcoding secrets in code  
❌ Skipping CI tests  
❌ Direct push to main branch  
❌ No rollback strategy

# **🧾 13. Summary**

- GitHub Actions automates CI/CD
- Workflow = YAML-based automation
- Git workflows define team structure
- Security is critical in DevOps
- Git integrates with Docker, Kubernetes, AWS

# **🌿 SECTION 7: Git Advanced Git Workflows**

# **🧱 1 Monorepo (Single Repository for Everything)**

## **🔹 What is Monorepo?**

One repo containing:

- frontend
- backend
- infra

## **🔹 Structure:**

repo/

├── frontend/

├── backend/

├── infra/

## **🔹 Advantages:**

✔ Single source of truth  
✔ Easier dependency sharing  
✔ Unified CI/CD

## **❌ Disadvantages:**

❌ Large repo size  
❌ Complex pipelines

## **🔹 CI Optimization:**

paths:

\- 'backend/\*\*'

👉 Run pipeline only if backend changes

# **🔗 2 Git Submodules (Multiple Repos Linked)**

## **🔹 What is Submodule?**

A Git repo inside another repo

## **🔹 Add submodule:**

``` bash
git submodule add https://github.com/user/lib.git
```

## **🔹 Clone with submodules:**

``` bash
git clone --recurse-submodules repo_url
```

## **🔹 Update submodule:**

``` bash
git submodule update --remote
```

## **✔ Advantages:**

✔ Modular architecture  
✔ Reuse libraries

## **❌ Disadvantages:**

❌ Hard to manage  
❌ Confusing for beginners

# **⚔️ Monorepo vs Submodule**

| **Feature**   | **Monorepo** | **Submodule**    |
|---------------|--------------|------------------|
| Code location | Single repo  | Multiple repos   |
| Complexity    | Medium       | High             |
| CI/CD         | Easier       | Harder           |
| Use case      | Full system  | Shared libraries |

# **🌿 SECTION 8: Git DevOps Project**

# **🧪 1. Full DevOps Project Flow (End-to-End)**

## **🎯 Scenario:**

Build → Test → Dockerize → Push → Deploy

## **🔹 Step-by-step:**

1\. Developer writes code

2\. Push to GitHub

3\. PR created

4\. CI runs tests

5\. Merge PR

6\. Docker image built

7\. Push to AWS ECR

8\. Deploy to EC2

# **⚠️ 17. Common Mistakes**

❌ No tests in pipeline  
❌ Large Docker images  
❌ Hardcoded secrets  
❌ No rollback strategy

# **🧠 18. DevOps Best Practices**

✔ Small commits + PRs  
✔ Fast CI pipelines  
✔ Cache dependencies  
✔ Use multi-stage Docker builds  
✔ Monitor deployments

# **🚀 FINAL SUMMARY**

## **You mastered:**

### **CI/CD:**

- GitHub Actions pipeline
- PR-based automation
- Test → Build → Deploy

### **DevOps:**

- Docker + AWS deployment
- Real CI/CD workflow

### **Advanced Git:**

- Monorepo architecture
- Submodules usage

# **🧭 DevOps Mindset**

👉 Automate everything  
👉 Test before deploy  
👉 Keep pipelines fast  
👉 Design for scalability

# **📘 CHAPTER 4: GitHub Collaboration System**

# **🌿 SECTION 1: GitHub Collaboration Workflow** 

## **📖 Core Idea:**

GitHub enables **team-based development with controlled code integration**.

## **🔁 Standard Team Collaboration Workflow:**

### **📖 Real DevOps Flow:**

1.  Fork / Clone repository
2.  Create new branch
3.  Make changes
4.  Commit changes
5.  Push to GitHub
6.  Create Pull Request (PR)
7.  Code Review
8.  Merge to main branch

## **🔄 Visual Flow:**

Developer → Branch → Commit → Push → Pull Request → Merge → Production

## **🍴 Forking Repository**

### **📖 Definition:**

A **fork** is a copy of someone else’s repository into your account.

## **🧠 Use Case:**

- Contribute to open-source
- Work independently without affecting original repo

# **🌿 SECTION 2: Pull Request (PR)**

Pull Requests (PRs) are the **heart of team collaboration** in Git-based workflows. Whether you’re using GitHub, GitLab, or Bitbucket, the concept is the same:

👉 **Propose → Review → Approve → Merge code safely**

# **🧠 1. What is a Pull Request?**

## **🔹 Definition:**

A Pull Request is a request to **merge code from one branch into another**, usually:

feature-branch → main

## **🔍 PR Includes:**

- Code changes
- Description
- Comments
- Review discussion

**🔍 Why PR is important:**

✔ Code review  
✔ Team collaboration  
✔ Prevent bugs in production  
✔ CI/CD validation before merge

#  **How to Create & Merge Pull Requests** 

# **⚙️ 2. Complete PR Workflow (Big Picture)**

Create Branch → Make Changes → Push → Create PR → Review → Fix → Merge → Delete Branch

# **🌿 3. Step-by-Step: Create a Pull Request**

## **🔹 Step 1: Create a branch**

``` bash
git checkout -b feature-login
```

## **🔹 Step 2: Make changes + commit**

git add .

``` bash
git commit -m "Add login feature"
```

## **🔹 Step 3: Push branch**

``` bash
git push -u origin feature-login
```

## **🔹 Step 4: Create Pull Request (UI)**

Go to GitHub:

👉 Click **“Compare & pull request”**

## **🔹 Fill PR details:**

- Title: `Add login feature`
- Description:
  - What you changed
  - Why you changed
  - Screenshots (if UI)

# **📌 4. Pull Request Components**

## **🔹 Base branch:**

👉 Target branch (usually `main`)

## **🔹 Compare branch:**

👉 Your feature branch

## **🔹 Example:**

Base: main

Compare: feature-login

# **🔍 5. Code Review Process**

## **👨‍💻 Reviewer checks:**

- Code quality
- Security issues
- Logic correctness
- Best practices

## **🧠 Example comment:**

> “Please optimize this loop”

## **🔄 Developer updates:**

git add .

``` bash
git commit -m "fix review comments"
git push
```

👉 PR updates automatically

# **⚔️ 6. Merge Pull Request**

Once approved:

## **🔹 Merge options:**

### **1. Merge Commit**

Preserves full history

### **2. Squash & Merge**

Combines all commits into one

### **3. Rebase & Merge**

Keeps clean linear history

# **🧠 DevOps Insight:**

- Teams prefer **Squash or Rebase**
- Avoid messy commit history

# **🔥 7. Git Merge vs Rebase (PR Context)**

## **🔹 Merge:**

``` bash
git merge feature-login
```

✔ Keeps history  
❌ Creates extra commit

## **🔹 Rebase:**

``` bash
git rebase main
```

✔ Clean history  
❌ Can rewrite history

👉 In PR:

- “Merge commit” = merge
- “Rebase & merge” = rebase

# **⚠️ 8. Conflict Resolution in PR**

## **🔥 When conflict happens:**

This branch has conflicts that must be resolved

## **🔧 Fix locally:**

``` bash
git checkout feature-login
git pull origin main
```

Resolve conflicts manually → then:

git add .

``` bash
git commit -m "resolve conflict"
git push
```

# **🔁 9. Update PR with Latest Code**

## **🔹 Rebase method (clean):**

``` bash
git fetch origin
git rebase origin/main
```

## **🔹 Merge method:**

``` bash
git merge main
```

# **🧨 10. Close / Reject Pull Request**

If PR is not needed:

👉 Click **Close pull request**

## **🧠 Use case:**

- Wrong feature
- Duplicate PR
- Cancel task

# **🗑️ 11. Delete Branch After Merge**

## **🔹 From UI:**

👉 “Delete branch” button

## **🔹 From CLI:**

``` bash
git branch -d feature-login
git push origin --delete feature-login
```

# **🔁 12. Reopen Pull Request**

If closed accidentally:

👉 Click **Reopen PR**

# **🔄 13. Cherry-Pick in PR Context**

## **🔹 Use case:**

Take specific commit only

``` bash
git cherry-pick commit_id
```

👉 Useful when:

- Partial fix needed
- Hotfix from another branch

# **⚔️ 14. Reset vs Revert (PR Safety)**

## **🔹 Reset (Danger):**

``` bash
git reset --hard HEAD~1
```

❌ Rewrites history

## **🔹 Revert (Safe):**

``` bash
git revert commit_id
```

✔ Safe for shared repos

👉 In PR:  
Always prefer **revert**

# **🌿 15. Branching Strategy in PR**

## **Common strategies:**

### **🔹 GitFlow**

- feature/\*
- develop
- main

### **🔹 Trunk-Based**

- Small frequent PRs
- Direct to main

# **⚙️ 16. Git Hooks in PR Workflow**

Hooks automate checks before push:

### **Example:**

pre-commit → run tests

pre-push → check linting

👉 Ensures:

- Clean code before PR
- Fewer review issues

# **🚀 17. CI/CD Pipeline with Pull Request**

Using GitHub Actions:

## **🔹 Workflow:**

- PR created
- Pipeline runs automatically
- Tests executed
- Build verified

## **Example:**

    on: pull_request
    jobs:
    test:
    runs-on: ubuntu-latest

👉 PR cannot merge if pipeline fails

# **🧪 18. Real DevOps PR Workflow**

1\. Create feature branch

2\. Develop feature

3\. Push branch

4\. Create PR

5\. CI/CD runs

6\. Code review

7\. Fix issues

8\. Merge PR

9\. Delete branch

# **⚠️ 19. Common Mistakes**

❌ Large PRs (hard to review)  
❌ Not updating branch before PR  
❌ Ignoring conflicts  
❌ Force pushing incorrectly  
❌ No proper commit messages

# **🧠 20. Best Practices (Professional Level)**

✔ Small, focused PRs  
✔ Clear commit messages  
✔ Always pull/rebase before PR  
✔ Use squash for clean history  
✔ Run tests before pushing  
✔ Add meaningful PR description

# **🚀 FINAL SUMMARY**

You now understand:

- What Pull Requests are
- How to create PR
- How to review and update
- Merge strategies (merge, squash, rebase)
- Conflict resolution
- Delete & manage PRs
- CI/CD integration
- DevOps best practices

# **🌿 SECTION 3: Code Review Process**

## **👨‍💻 What is Code Review?**

**The Code Review Process is a structured practice where developers examine each other’s code before it is merged into the main codebase. It ensures that the code is clean, secure, maintainable, and aligned with project standards.**

**In modern development, this process is tightly integrated with platforms like GitHub, GitLab, and Bitbucket using Pull Requests (PRs) or Merge Requests (MRs).**

## **📌 Code Review Process – Step by Step**

### **1. Pull Request (PR) Creation**

**A developer pushes code changes to a feature branch and creates a PR.**

- **Includes:**
  - **Description of changes**
  - **Linked issues/tasks**
  - **Screenshots (if UI changes)**
  - **Testing notes**

**👉 Purpose: Start discussion and review workflow**

### **2. Reviewer Checks Code Quality**

**The reviewer (team member or senior developer) evaluates:**

- **Code readability and structure**
- **Naming conventions**
- **Logic correctness**
- **Performance optimization**
- **Security vulnerabilities**
- **Compliance with coding standards**

**👉 Tools like linters and static analyzers may assist here.**

### **3. Suggest Improvements**

**Reviewer provides feedback such as:**

- **Refactoring suggestions**
- **Better logic or cleaner implementation**
- **Security fixes**
- **Performance enhancements**

**👉 Feedback is usually added as inline comments directly on code lines.**

### **4. Approve or Request Changes**

**Reviewer has two main actions:**

- **✅ Approve → Code is ready to merge**
- **❌ Request Changes → Developer must fix issues**

**👉 Multiple review cycles may occur before approval.**

## **✅ Merge Approval (Gatekeeping Mechanism)**

**Before code is merged into the main branch, it must pass strict controls.**

### **🔒 Branch Protection Rules**

**These rules ensure that:**

- **Direct commits to main branch are blocked**
- **PR is mandatory for merging**
- **History remains clean and traceable**

### **👥 Required Reviewers**

- **One or more reviewers must approve the PR**
- **Prevents unverified code from entering production**
- **Encourages shared ownership of code**

### **⚙️ CI/CD Checks (Automated Validation)**

**Automated pipelines (e.g., using GitHub Actions, Jenkins, or GitLab CI) run tests such as:**

- **Build verification**
- **Unit tests**
- **Integration tests**
- **Security scans**

**👉 If any check fails → Merge is blocked**

## **🚀 DevOps Insight**

### **👉 PR + Review + CI/CD = Team Collaboration Pipeline**

**This combination forms the core of modern DevOps workflows:**

### **🔄 Continuous Integration Flow**

1.  **Developer pushes code**
2.  **PR is created**
3.  **Automated CI pipeline runs**
4.  **Team reviews code**
5.  **Issues are fixed**
6.  **Code is approved and merged**

### **💡 Why This Matters in DevOps**

- **🛡️ Improves code quality and security**
- **🤝 Enables team collaboration and knowledge sharing**
- **⚡ Speeds up safe deployments**
- **🔍 Ensures early bug detection**
- **📈 Maintains consistent coding standards**

## **🧠 Real-Life DevOps Strategy & Best Practices**

### **✔️ Keep PRs Small**

- **Easier to review**
- **Faster feedback cycle**

### **✔️ Write Clear PR Descriptions**

- **Explain *why*, not just *what***

### **✔️ Automate Everything**

- **Use CI/CD for testing and validation**

### **✔️ Don’t Take Reviews Personally**

- **Focus on improving code, not criticizing people**

### **✔️ Use Review Checklists**

- **Maintain consistency across team reviews**

### **✔️ Enforce “No Approval = No Merge”**

- **Avoid bypassing review process**

## **🔚 Final Summary**

**The Code Review Process is not just about finding bugs — it’s a critical DevOps practice that ensures:**

- **High-quality code**
- **Strong collaboration**
- **Secure and stable deployments**

**👉 When combined with Pull Requests + CI/CD pipelines, it becomes a powerful system that transforms individual coding into a team-driven engineering process.**

## **🧾 Professional README.md**

### **📖 Purpose:**

Project documentation

### **Should include:**

- Project title
- Setup steps
- Features
- Usage
- Tech stack

# **🧾 Summary**

- GitHub enables team collaboration
- PR is core workflow
- Advanced Git gives control over history
- GitHub features support full DevOps lifecycle

## **📘 Chapter 5: Advanced Git Operations & History Control** 

This chapter brings together the **most critical Git internals** you’ll use in real DevOps work: how history is combined, rewritten, repaired, and selectively reused.

# **🌿 SECTION 1: Merging Branches Operations**

## **📖 What is Branch Merging?**

**Branch merging** is the process of combining changes from one branch into another. It is a core feature of Git and is essential for collaborative development on platforms like GitHub and GitLab.

👉 It allows teams to safely integrate feature work into the main codebase.

## **⚙️ Basic Merge Command**

``` bash
git checkout main
git merge feature-x
```

👉 This merges changes from `feature-x` into `main`.

## **🔁 Types of Merge**

### **✅ 1. Fast-Forward Merge**

📌 Happens when:

- No new commits exist in the target branch (`main`)
- History is linear (no divergence)

📊 Concept:

Before:

``` yaml
main: A---B
feature: C---D
```

After:

main: A---B---C---D

👉 Git simply moves the pointer forward (no extra commit created)

✔ Pros:

- Clean and simple
- No unnecessary commits

❌ Cons:

- No explicit record of merge event

### **🔀 2. 3-Way Merge**

📌 Happens when:

- Both branches have new commits
- History has diverged

📊 Concept:

A---B---C (main)

\\

D---E (feature)

\\

M (merge commit)

👉 Git creates a **merge commit (M)** combining both histories.

✔ Pros:

- Preserves full history
- Safe for team collaboration

❌ Cons:

- Can clutter history with many merge commits

## **🔥 Git Rebase (Advanced)**

### **📖 What is Rebase?**

**Rebase** moves your branch to the top of another branch.

👉 Instead of merging, it **replays your commits** on top of the latest base branch.

### **⚙️ Command**

``` bash
git checkout feature
git rebase main
```

### **🔍 Example**

**Before Rebase:**

``` yaml
main: A---B---C
feature: D---E
```

**After Rebase:**

main: A---B---C---D'---E'

👉 Commits `D` and `E` are reapplied as new commits (`D'`, `E'`)

### **🧠 What Rebase Does**

- Removes unnecessary merge commits
- Creates a **clean, linear history**
- Makes logs easier to read and debug

## **⚖️ Git Merge vs Git Rebase**

### **🔹 Git Merge (History Preserving)**

``` bash
git checkout main
git merge feature-login
```

✔ Pros:

- Safe (no history rewrite)
- Ideal for teams
- Keeps full context

❌ Cons:

- History can become messy

### **🔹 Git Rebase (History Rewriting)**

``` bash
git checkout feature-login
git rebase main
```

✔ Pros:

- Clean linear history
- Easier debugging
- Better visualization

❌ Cons:

- Rewrites commit history
- Risky in shared branches

## **⚔️ Real DevOps Rules (Critical)**

| **Scenario**            | **Recommended Approach** |
|-------------------------|--------------------------|
| Team collaboration      | ✅ Merge                 |
| Clean history before PR | ✅ Rebase                |
| Shared/public branch    | ❌ NEVER Rebase          |
| Local/private branch    | ✅ Rebase OK             |

## **⚠️ Golden Rule**

👉 **Never rebase public/shared branches**

Why?

- It rewrites commit history
- Breaks collaboration
- Causes conflicts for other developers

## **🔧 Interactive Rebase (Pro Level 🔥)**

### **⚙️ Command**

``` bash
git rebase -i HEAD~3
```

👉 Opens an interactive editor to modify last 3 commits.

### **🧠 What You Can Do**

- ✏️ Edit commits
- 🔗 Squash (combine commits)
- ❌ Delete commits
- 🧹 Clean commit history

### **🔍 Example**

Before:

fix

update

final fix

After (squashed):

Add login feature

👉 Clean, meaningful commit history for production.

## **🚀 DevOps Insight**

### **👉 Merge + Rebase = Controlled Code Integration**

In DevOps workflows:

- Developers use **rebase locally** to clean history
- Teams use **merge in PRs** for safe integration
- CI/CD pipelines (e.g., GitHub Actions, Jenkins) validate merged code

### **🔄 Typical Workflow**

1.  Create feature branch
2.  Develop code
3.  Rebase with latest main (clean history)
4.  Create Pull Request
5.  Code review
6.  Merge into main
7.  Deploy via CI/CD

## **💡 Best Practices**

### **✔️ Use Rebase for Local Cleanup**

- Before pushing code

### **✔️ Use Merge for Team Integration**

- Maintain safe collaboration

### **✔️ Keep Commits Meaningful**

- Use clear messages

### **✔️ Avoid Long-Lived Branches**

- Reduces merge conflicts

## **🧾 Final Summary**

- 🔀 **Merge** = Safe, history-preserving integration
- 🔥 **Rebase** = Clean, linear history (advanced)
- ⚠️ Use each tool based on context

👉 In real DevOps:

**Clean History + Safe Collaboration + Automated Testing = Reliable Delivery**

# **🌿 SECTION 2: Merge Conflict Resolution**

## **📖 What is a Merge Conflict?**

A **merge conflict** occurs when Git cannot automatically combine changes from two branches.

👉 This typically happens when:

- The **same file** is modified
- The **same line(s)** are changed differently in each branch

## **⚠️ When Do Conflicts Occur?**

### **🔹 Common Scenarios**

- Two developers edit the same function
- One deletes code while another modifies it
- File structure changes in parallel branches

👉 Example condition:  
**Same file → Same line → Different changes**

## **🧠 Conflict Example**

When a conflict happens, Git marks it like this:

\<\<\<\<\<\<\< HEAD

This is main branch code

=======

This is feature branch code

\>\>\>\>\>\>\> feature-x

### **🔍 Meaning of Markers:**

- `<<<<<<< HEAD` → Current branch (e.g., `main`)
- `=======` → Separator
- `>>>>>>> feature-x` → Incoming branch

👉 Git is asking: **“Which version should I keep?”**

## **🛠️ How to Resolve Merge Conflicts (Step-by-Step)**

### **✅ 1. Open the Conflicted File**

- Locate conflict markers
- Understand both versions of code

### **✅ 2. Edit and Resolve**

- Remove markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Keep the correct code OR combine both

✔ Example resolved code:

This is final combined code

### **✅ 3. Stage the Changes**

git add .

### **✅ 4. Commit Resolution**

``` bash
git commit -m "Resolved merge conflict"
```

👉 Now the merge process completes successfully.

## **❌ Abort Merge or Rebase (If Needed)**

If things go wrong or you want to cancel:

### **🔹 Abort Merge**

``` bash
git merge --abort
```

### **🔹 Abort Rebase**

``` bash
git rebase --abort
```

👉 Returns repository to previous safe state.

## **🔧 Advanced Conflict Resolution Techniques**

### **🔹 Use Visual Tools**

Tools like:

- VS Code
- GitKraken

👉 Provide side-by-side comparison and one-click resolution.

### **🔹 Use** `git status`

``` bash
git status
```

👉 Shows:

- Which files are conflicted
- What needs to be resolved

### **🔹 Partial Resolution**

You can:

- Accept **current changes**
- Accept **incoming changes**
- Combine both manually

## **🚀 DevOps Insight**

### **👉 Merge Conflicts Are Normal — Not Errors**

In real-world DevOps:

- Conflicts are **a sign of active collaboration**
- They happen frequently in teams
- They are part of the development lifecycle

### **🧠 Engineering Reality**

- 👨‍💻 Junior developers → Learn to resolve conflicts
- 🧑‍💻 Mid-level developers → Handle conflicts confidently
- 🧠 Senior engineers → Resolve complex conflicts daily

👉 The difference is not **avoiding conflicts**, but **resolving them cleanly and safely**.

## **🔄 DevOps Workflow Context**

In platforms like GitHub:

1.  Developer creates PR
2.  System detects conflicts
3.  PR cannot be merged ❌
4.  Developer resolves conflicts locally
5.  Push updated code
6.  PR becomes mergeable ✅

## **💡 Best Practices**

### **✔️ Pull Latest Changes Frequently**

``` bash
git pull origin main
```

👉 Reduces chances of conflicts.

### **✔️ Work on Small Features**

- Smaller changes = fewer conflicts

### **✔️ Communicate with Team**

- Avoid editing same files simultaneously

### **✔️ Understand Code Before Resolving**

- Never blindly accept changes

### **✔️ Test After Resolution**

- Ensure functionality is not broken

## **🧾 Final Summary**

- ⚠️ **Merge conflicts occur when Git cannot auto-merge changes**
- 🛠️ Developers must manually resolve them
- ❌ They are NOT errors — they are part of teamwork
- 🚀 Strong conflict resolution skills = strong DevOps engineer

👉 In real DevOps:

**Conflicts → Resolution → Testing → Merge → Deployment**

# **🌿 SECTION 3: Undoing Changes**

## **Undoing Changes in Git** `git revert` **vs** `git restore` **vs** `git reset`

When working with Git, mistakes are normal. You might commit wrong code, modify the wrong file, or push unwanted changes. Git gives you **three main tools to undo changes**, but each works at a different level.

Let’s break them down like a professional DevOps engineer would use them in real projects.

## **🧠 Why Undo Operations Matter**

In real DevOps workflows:

- Mistakes happen in production code
- Bad commits must be fixed safely
- History must remain clean and traceable

# **🔄 1.** `git revert` **— Safe Undo for Shared History**

### **🧠 What it does:**

`git revert` creates a **new commit that reverses a previous commit**.

👉 It does NOT delete history. It preserves everything.

### **📌 Use case:**

- You already pushed code to GitHub
- Team members are using the branch
- You want to undo a bad commit safely

### **⚙️ Command:**

``` bash
git revert <commit-id>
```

### **🧾 Example:**

``` bash
git revert a1b2c3d
```

### **🔥 What happens:**

- A new commit is created
- That commit removes the changes of `a1b2c3d`
- History remains clean and traceable

### **💡 DevOps mindset:**

✔ Safe for production  
✔ Best for CI/CD pipelines  
✔ No risk of breaking shared branches

# **🧹 2.** `git restore` **— Undo Working Directory Changes (Modern Way)**

### **🧠 What it does:**

`git restore` is used to **undo changes in files before committing**.

It helps you:

- Discard local file changes
- Restore files from last commit

### **📌 Use case:**

- You edited a file but don’t want those changes
- You want to reset a file to last committed version

### **⚙️ Commands:**

### **🔹 Undo changes in a file:**

``` bash
git restore filename
```

### **🔹 Unstage a file (remove from staging area):**

``` bash
git restore --staged filename
```

### **🔥 What happens:**

- Your file goes back to last committed state
- No history is affected

### **💡 DevOps mindset:**

✔ Safe  
✔ Local-only changes  
✔ No commit history impact

# **💣 3.** `git reset` **— Powerful History Manipulation Tool (Dangerous ⚠️)**

### **🧠 What it does:**

- `git reset` moves your branch pointer backward in history.

👉 It can remove commits depending on mode.

## **⚙️ Types of reset:**

# **🟢 Soft Reset**

``` bash
git reset --soft <commit>
```

### **🔥 Effect:**

- Keeps changes in staging area
- Commits are removed
- Good for re-committing

# **🟡 Mixed Reset (default)**

``` bash
git reset --mixed <commit>
```

### **🔥 Effect:**

- Removes commits
- Keeps changes in working directory
- Unstages files

# **🔴 Hard Reset (dangerous)**

``` bash
git reset --hard <commit>
```

### **🔥 Effect:**

- Deletes commits
- Deletes staging changes
- Deletes working directory changes

⚠️ WARNING: Data loss possible

## **📌 Use case:**

- Fix local commit mistakes
- Clean up commit history before pushing
- Rewriting branch history (carefully)

## **💡 DevOps mindset:**

✔ Powerful but risky  
✔ NEVER use on shared branches  
✔ Great for local cleanup before push

# **⚔️ Comparison Table**

| **Feature**     | **git revert**     | **git restore**   | **git reset**   |
|-----------------|--------------------|-------------------|-----------------|
| Affects history | ❌ No              | ❌ No             | ✅ Yes          |
| Safe for GitHub | ✅ Yes             | N/A               | ⚠️ Risky        |
| Removes commits | ❌ No              | ❌ No             | ✅ Yes          |
| Works on files  | ❌ No              | ✅ Yes            | ⚠️ Yes          |
| Best use case   | Undo pushed commit | Undo file changes | Rewrite history |

# **🧠 Real DevOps Scenario Example**

### **Situation:**

You deployed buggy code to production branch.

### **What to do?**

- If already pushed →  
  > 👉 `git revert` (safe rollback)

- If not committed →  
  > 👉 `git restore`

- If local commit mistake →  
  > 👉 `git reset --soft`

# **🚀 Final Mental Model**

- 🔄 `revert` = **Undo safely with history**
- 🧹 `restore` = **Fix your working files**
- 💣 `reset` = **Rewrite Git history (power tool)**

# **🌿 SECTION 3: Git Issues** 

## **🐞 What are GitHub Issues?**

**GitHub Issues** are a built-in tracking system in GitHub used to manage:

- 🐞 Bugs
- 📌 Tasks
- 🚀 Feature requests
- 📋 Improvements

👉 Think of Issues as a **lightweight project management + bug tracking system** directly connected to your code.

## **🎯 Core Use Cases**

### **🐞 1. Track Bugs**

- Report problems in the application
- Include steps to reproduce the issue
- Attach logs, screenshots, or error messages

👉 Example:

> “Login fails when password contains special characters”

### **📌 2. Manage Tasks**

- Break down work into smaller tasks
- Assign tasks to team members
- Track progress in real time

👉 Example:

> “Implement user authentication API”

### **🚀 3. Feature Requests**

- Suggest new features or enhancements
- Discuss ideas before implementation

👉 Example:

> “Add dark mode to dashboard UI”

## **⚙️ Key Features of GitHub Issues**

### **🏷️ Labels**

Categorize issues using tags like:

- `bug`
- `enhancement`
- `documentation`
- `priority-high`

👉 Helps in filtering and organizing work.

### **👤 Assignees**

- Assign issues to team members
- Defines ownership and accountability

### **💬 Comments & Discussion**

- Collaborate directly on the issue
- Share ideas, fixes, and feedback

### **🔗 Issue Linking**

Connect issues with:

- Pull Requests (PRs)
- Other issues
- Commits

👉 Example:

Fixes \#45

When PR is merged → Issue automatically closes ✅

### **📊 Milestones**

- Group issues into release goals
- Track progress toward a version (e.g., `v1.0`)

## **🔄 DevOps Workflow Integration**

### **👉 Issues + PR + CI/CD = Full Workflow**

1.  Create Issue (bug/task/feature)
2.  Create branch from issue
3.  Develop code
4.  Create Pull Request
5.  Link PR to Issue
6.  Run CI/CD pipeline (tests, build)
7.  Review & merge PR
8.  Issue automatically closed

## **🚀 DevOps Insight**

GitHub Issues are not just for tracking — they are part of the **DevOps lifecycle**:

- 🧠 Planning → Issues
- 💻 Development → Code + PR
- 🔍 Review → Code Review
- ⚙️ Automation → CI/CD (via GitHub Actions)
- 🚀 Deployment → Release
- 🔁 Feedback → New Issues

👉 This creates a **continuous feedback loop**.

## **🛠️ Real-World Best Practices**

### **✔️ Write Clear Issue Titles**

Bad:

> Bug in system

Good:

> Login API fails with 500 error on invalid token

### **✔️ Use Templates**

- Bug report template
- Feature request template

👉 Ensures consistency and complete information.

### **✔️ Prioritize with Labels**

- Helps teams focus on critical work first

### **✔️ Keep Issues Small & Focused**

- One issue = one problem
- Easier to track and resolve

### **✔️ Link Everything**

- PRs, commits, and issues should be connected

## **🔚 Final Summary**

- 🐞 **GitHub Issues = Task + Bug + Feature tracking system**
- 🔗 Deeply integrated with code and PRs
- ⚙️ Works seamlessly with CI/CD pipelines
- 🚀 Enables structured DevOps workflows

👉 In modern development:

**Issues → Code → Review → Test → Deploy → Repeat**

# **🌿 SECTION 4: Git Cherry-pick (Selective Commit Copy)**

## **📖 What is Git Cherry-pick?**

**Git Cherry-pick** is a command in Git that allows you to **apply a specific commit from one branch onto another branch**.

👉 Instead of merging an entire branch, you can **select only the exact commit you need**.

## **⚙️ Command**

``` bash
git cherry-pick <commit_id>
```

👉 Applies the changes introduced by that commit to your current branch.

## **🧠 How It Works**

Cherry-pick takes a commit and **replays it on top of your current branch**, creating a **new commit with a new hash**.

## **🔍 Example**

### **📌 Before:**

``` yaml
feature: A---B---C
main: A---B
```

### **⚙️ Command:**

``` bash
git checkout main
git cherry-pick C
```

### **📌 After:**

main: A---B---C'

👉 `C'` is a new commit (same changes, different identity)

## **🔥 Real DevOps Use Cases**

### **🚑 1. Hotfix from Another Branch**

- A bug is fixed in `feature` branch
- You need it immediately in `main`

👉 Cherry-pick only that fix without merging unfinished work.

### **🚀 2. Partial Feature Deployment**

- Feature branch has multiple commits
- Only one is stable

👉 Deploy only the required commit.

### **⚡ 3. Emergency Production Fix**

- Critical issue in production
- Fix exists in another branch

👉 Quickly apply the fix without delay.

### **🔄 4. Backporting Fixes**

- Apply a fix from a newer version to an older release branch

👉 Common in production maintenance.

## **⚠️ Conflict Handling**

Cherry-pick can cause conflicts just like:

- Merge
- Rebase

👉 Resolve using the same process:

1.  Open conflicted file
2.  Remove conflict markers
3.  Keep correct code
4.  Stage changes:  
    >   
    > git add .

5.  Continue cherry-pick:  
    >   
    > git cherry-pick --continue

### **❌ Abort Cherry-pick**

``` bash
git cherry-pick --abort
```

👉 Cancels operation and restores previous state.

## **⚠️ Important Behavior (Very Critical)**

### **🔁 Duplicate History Risk**

Cherry-pick creates a **new commit**, not a reference.

👉 This means:

- Same changes
- Different commit ID

❌ If misused, it can:

- Duplicate commits
- Confuse history
- Complicate debugging

## **⚖️ Cherry-pick vs Merge vs Rebase**

| **Feature** | **Cherry-pick**   | **Merge**         | **Rebase**       |
|-------------|-------------------|-------------------|------------------|
| Scope       | Single commit     | Full branch       | Full branch      |
| History     | Duplicates commit | Preserves history | Rewrites history |
| Use case    | Selective changes | Team integration  | Clean history    |

## **🚀 DevOps Insight**

### **👉 Cherry-pick = Precision Tool**

In DevOps workflows (with GitHub + CI/CD tools like GitHub Actions):

- Use cherry-pick for **urgent fixes**
- Avoid merging incomplete features
- Maintain **controlled deployments**

### **🔄 Real Workflow Example**

1.  Bug found in production
2.  Fix exists in `develop` branch
3.  Cherry-pick commit into `main`
4.  Deploy immediately
5.  Later merge full branch properly

## **💡 Best Practices**

### **✔️ Use Cherry-pick for Small, Isolated Changes**

- Avoid large or dependent commits

### **✔️ Document Why You Cherry-picked**

- Helps team understand history

### **✔️ Avoid Overusing**

- Prefer merge/rebase for normal workflows

### **✔️ Test After Cherry-pick**

- Ensure compatibility with target branch

## **🧾 Final Summary**

- 🍒 **Cherry-pick = Select specific commit only**
- 🚀 Ideal for hotfixes and urgent changes
- ⚠️ Can create duplicate history if misused
- 🛠️ Conflicts handled like merge/rebase

👉 In real DevOps:

**Right Tool + Right Situation = Clean Workflow**

# **⚔️ 5. Deep Merge vs Rebase Lab (Hands-on)**

## **Scenario:**

``` bash
git checkout -b feature-login
```

Edit:

console.log("Login feature");

### **Step 1: Commit**

git add .

``` bash
git commit -m "add login"
```

### **Step 2: Switch to main**

``` bash
git checkout main
```

Edit same file:

console.log("Main update");

### **Step 3: Commit**

``` bash
git commit -am "main update"
```

### **Step 4: Try merge**

``` bash
git merge feature-login
```

👉 Conflict occurs

### **Step 5: Resolve manually → commit**

### **Step 6: Try rebase instead**

``` bash
git checkout feature-login
git rebase main
```

👉 Same conflict → resolve → continue

# **🧠 Key Learning:**

- Merge keeps history
- Rebase rewrites history
- Conflict resolution same in both

# **🚀 FINAL SUMMARY**

## **You mastered:**

### **Core Concepts:**

- Merge vs Rebase (deep understanding)
- Conflict resolution (real workflow)
- Reset vs Revert (recovery system)
- Cherry-pick (selective commits)

## **🔥 DevOps Golden Rules:**

✔ Never rebase shared branch  
✔ Use revert in production  
✔ Resolve conflicts carefully  
✔ Keep history clean (rebase locally)  
✔ Use cherry-pick for hotfixes

# **📘 CHAPTER 6: Advanced Git Workflow & Productivity Mastery** 

# **Why Advanced Git Matters (DevOps Insight 🔥)**

In real projects, you don’t just write code—you:

- Fix mistakes safely
- Manage clean history
- Move changes across branches
- Handle production issues

👉 That’s where advanced Git comes in.

**🌿 SECTION 1:Git Stash**

# **(Temporary Save Workflow for Real DevOps Work)**

In real development workflows, you often face situations where you are working on a feature but suddenly need to switch context:

- urgent bug fix
- production hotfix
- pull latest changes
- switch branch quickly

But your code is **not ready to commit**.

👉 This is where **Git Stash** becomes extremely powerful.

# **🧠 1. What is Git Stash?**

## **🔹 Definition:**

Git stash is a **temporary storage area (stack)** where Git saves your **uncommitted changes** so you can switch context safely.

👉 Think of it like:

> “Save my work temporarily without committing it”

## **🔹 Real-life analogy:**

You are writing a report → suddenly phone rings → you put your notebook inside drawer → come back later.

👉 That drawer = `git stash`

# **⚙️ 2. How Git Stash Works (Concept)**

Git stash stores:

✔ Modified tracked files  
✔ Staged changes  
✔ Working directory changes

❌ Does NOT include new untracked files (by default)

# **📌 3. Basic Git Stash Command**

## **🔹 Command:**

``` bash
git stash
```

### **What it does:**

- Saves current work
- Cleans working directory
- Lets you switch branch safely

## **🧠 Example:**

``` bash
git stash
```

👉 Output:

Saved working directory and index state WIP on main

# **📌 4. Git Stash List**

## **🔹 Command:**

``` bash
git stash list
```

## **🔍 What it shows:**

👉 All saved stashes (stack format)

## **🧠 Example output:**

stash@{0}: WIP on main: fix login bug

stash@{1}: WIP on feature: update UI

stash@{2}: WIP on dev: API changes

## **🧠 Meaning:**

| **Index** | **Meaning**    |
|-----------|----------------|
| stash@{0} | Latest stash   |
| stash@{1} | Previous stash |
| stash@{2} | Older stash    |

# **📌 5. Git Stash Apply**

## **🔹 Command:**

``` bash
git stash apply
```

## **🔍 What it does:**

👉 Restores the latest stash  
👉 BUT keeps it in stash list

## **🧠 Example:**

``` bash
git stash apply
```

👉 Your code returns  
👉 Stash still exists

# **📌 6. Apply Specific Stash**

## **🔹 Command:**

``` bash
git stash apply stash@{1}
```

## **🔍 What it does:**

👉 Restores a specific stash by index

## **🧠 Example:**

``` bash
git stash apply stash@{2}
```

# **📌 7. Git Stash Pop (Very Important)**

## **🔹 Command:**

``` bash
git stash pop
```

## **🔍 What it does:**

👉 Restores latest stash  
👉 AND removes it from stash list

## **🧠 Example:**

``` bash
git stash pop
```

## **🔥 Difference vs apply:**

| **Command** | **Keeps stash** | **Removes stash** |
|-------------|-----------------|-------------------|
| apply       | ✔ Yes           | ❌ No             |
| pop         | ❌ No           | ✔ Yes             |

# **📌 8. Git Stash Clear (Danger Command)**

## **🔹 Command:**

``` bash
git stash clear
```

## **🔥 What it does:**

👉 Deletes ALL stashes permanently

## **⚠️ Warning:**

❌ No recovery after this  
Use only when stash is no longer needed

# **📌 9. Git Stash Drop (Specific Delete)**

## **🔹 Command:**

``` bash
git stash drop stash@{1}
```

## **🔍 What it does:**

👉 Deletes specific stash only

# **📌 10. Git Stash Save (Old but useful)**

## **🔹 Command:**

``` bash
git stash save "message"
```

## **🧠 Example:**

``` bash
git stash save "WIP login feature"
```

👉 Saves stash with message

# **📌 11. Git Stash with Untracked Files**

## **🔹 Command:**

``` bash
git stash -u
```

## **🔍 What it does:**

👉 Includes untracked files also

## **🧠 Example:**

``` bash
git stash -u
```

# **📌 12. Git Stash All (Including ignored files)**

## **🔹 Command:**

``` bash
git stash -a
```

## **🔍 What it does:**

👉 Stashes EVERYTHING:

- tracked files
- untracked files
- ignored files

# **📌 13. Git Stash Show**

## **🔹 Command:**

``` bash
git stash show
```

## **🔍 What it does:**

👉 Shows summary of latest stash

## **Detailed view:**

``` bash
git stash show -p
```

👉 Shows full diff of stash

# **🧠 14. Real DevOps Workflow Example**

## **Scenario:**

You are working on feature branch:

feature-login

Suddenly:

🚨 Production bug reported

## **Step 1: Save work**

``` bash
git stash
```

## **Step 2: Switch branch**

``` bash
git checkout main
```

## **Step 3: Fix bug and commit**

## **Step 4: Return back**

``` bash
git checkout feature-login
```

## **Step 5: Restore work**

``` bash
git stash pop
```

# **📊 15. Git Stash Stack Concept**

Git stash works like a **stack (LIFO)**:

Latest → stash@{0}

Older → stash@{1}

Oldest → stash@{2}

# **⚠️ 16. Common Mistakes**

❌ Forgetting stash exists  
❌ Using `clear` accidentally  
❌ Applying wrong stash index  
❌ Not checking `git stash list` before pop

# **🚀 17. Professional Best Practices**

✔ Always check stash list before apply  
✔ Use meaningful stash messages  
✔ Prefer `apply` for safety  
✔ Use `pop` only when sure  
✔ Avoid overusing stash (use branches instead in big features)

# **🧭 18. DevOps Insight**

In real companies:

✔ Developers use stash for:

- hotfix switching
- WIP (work in progress)
- experimental changes

✔ But:

- CI/CD pipelines avoid stash usage
- Teams prefer branches for long work
- Stash is personal workspace tool

# **🔥 FINAL SUMMARY**

## **You learned:**

- What Git stash is (temporary storage)
- `git stash` saves work
- `git stash list` shows all saves
- `apply` restores without deleting
- `pop` restores + deletes
- `clear` removes everything
- `drop` removes specific stash
- `-u` includes untracked files
- `-a` includes everything

**🌿 SECTION 2:Git Amend (Fix Last Commit**

## **📖 What is Git Amend?**

**Git Amend** is a feature in Git that allows you to **modify the most recent commit** instead of creating a new one.

👉 It is commonly used to:

- Fix mistakes in the last commit
- Update commit messages
- Add missing changes

## **⚙️ Command**

``` bash
git commit --amend -m "new commit message"
```

👉 This replaces the previous commit with an updated one.

## **🧠 What Git Amend Does**

When you use `--amend`, Git:

- Rewrites the last commit
- Creates a **new commit ID (hash)**
- Replaces the old commit completely

👉 Think of it as:  
**“Edit last commit” instead of “create new commit”**

## **🔧 Common Use Cases**

### **✏️ 1. Fix Commit Message**

``` bash
git commit --amend -m "Fix login validation bug"
```

👉 Corrects unclear or incorrect commit messages.

### **➕ 2. Add Missing Files**

``` bash
git add missing-file.js
git commit --amend
```

👉 Adds forgotten files into the last commit.

### **🔄 3. Update Last Commit Content**

- Modify code
- Stage changes
- Amend commit

👉 Keeps history clean without extra commits.

## **🔍 Example Workflow**

### **📌 Before:**

A---B---C (last commit has mistake)

### **⚙️ After Amend:**

A---B---C' (updated commit)

👉 `C` is replaced by `C'` (new commit with fixes)

## **⚠️ Critical Rule (Very Important)**

### **❌ DO NOT use** `--amend` **after pushing to remote**

If you already pushed your commit to platforms like GitHub:

👉 Using amend will:

- Rewrite commit history
- Change commit hash
- Cause conflicts for teammates
- Break repository synchronization

## **🚨 Why It’s Dangerous After Push**

Example:

- You push commit `C`
- You amend → new commit `C'`
- Remote still has `C`
- Now history mismatch occurs ❌

👉 Teammates may face:

- Merge conflicts
- Forced resets
- Confusion in history

## **✔️ Best Practices**

### **✔️ Use Only Before Push**

- Safe for local commits
- No impact on team

### **✔️ Use for Small Fixes Only**

- Commit message
- Minor file updates

### **✔️ Avoid in Shared Branches**

- Never rewrite public history

### **✔️ Use With Care in Teams**

- Prefer new commits instead of rewriting history

## **🚀 DevOps Insight**

In DevOps workflows using GitHub Actions or Jenkins:

- Clean commit history improves:
  - Debugging
  - CI/CD traceability
  - Release tracking

👉 But rewriting history after push can:

- Break pipelines
- Trigger incorrect builds
- Cause deployment issues

## **⚖️ Amend vs New Commit**

| **Feature**     | **Amend**       | **New Commit**  |
|-----------------|-----------------|-----------------|
| History         | Rewritten       | Preserved       |
| Use case        | Fix last commit | Add new changes |
| Safe after push | ❌ No           | ✅ Yes          |
| Team usage      | Limited         | Recommended     |

## **🧾 Final Summary**

- ✏️ **Git Amend = Edit last commit**
- ⚡ Keeps history clean (no extra commits)
- ⚠️ Dangerous after push (rewrites history)
- ✔️ Best for local, small fixes

👉 In real DevOps:

**Clean history is good — but stable history is critical**

**🌿 SECTION 3:Git Clone**

## **📖 What is Git Clone?**

**Git Clone** is a command in Git used to **create a local copy of a remote repository**.

👉 It downloads:

- Source code
- Complete commit history
- Branches and tags

Repositories are commonly cloned from platforms like GitHub, GitLab, and Bitbucket.

## **⚙️ Basic Clone Command**

``` bash
git clone "repo_url"
```

👉 What happens:

- A new folder is created (same name as repo)
- Repository is downloaded into that folder
- Remote origin is automatically configured

## **📁 Clone into Current Directory**

git clone "repo_url" .

👉 `.` means:

- Clone directly into the current folder
- No new directory is created

⚠️ Important:

- Current directory must be empty

## **🌿 Clone a Specific Branch**

``` bash
git clone --branch branch_name "repo_url"
```

👉 Only the specified branch is checked out after cloning.

## **🔍 What Happens Internally?**

When you run `git clone`:

1.  Git connects to remote repository
2.  Downloads all objects (commits, files, history)
3.  Creates a local copy
4.  Sets default remote as `origin`
5.  Checks out default branch (usually `main`)

## **🧠 Why Git Clone is Used**

### **📥 1. Copy Remote Repo Locally**

- Get full project on your machine
- Start development immediately

### **👨‍💻 2. Work on Existing Projects**

- Join team projects
- Contribute to open source

### **📜 3. Download Full Git History**

- Access logs, commits, tags
- Debug and analyze past changes

## **🚀 DevOps Use Cases**

### **🔄 1. CI/CD Pipelines**

Tools like GitHub Actions or Jenkins:

- Clone repositories automatically
- Build and test code
- Deploy applications

👉 Clone is the **first step in every pipeline**

### **🛠️ 2. Environment Setup**

- Clone repo on servers (e.g., staging, production)
- Prepare deployment environment

### **👥 3. Team Collaboration**

- Developers clone repo
- Create branches
- Push changes back

## **🔧 Advanced Clone Options (Pro Level)**

### **🔹 Shallow Clone (Faster)**

``` bash
git clone --depth 1 "repo_url"
```

👉 Downloads only latest commit  
👉 Faster, useful for CI/CD pipelines

### **🔹 Clone with Specific Folder Name**

``` bash
git clone "repo_url" my-project
```

👉 Creates folder `my-project` instead of default name

### **🔹 Clone via SSH (Secure)**

``` bash
git clone git@github.com:user/repo.git
```

👉 Uses SSH keys instead of HTTPS

## **⚠️ Common Mistakes**

### **❌ Cloning into Non-Empty Directory**

- Causes errors

### **❌ Wrong Branch Assumption**

- Default branch may not be what you expect

### **❌ Large Repo Cloning**

- Can be slow without shallow clone

## **💡 Best Practices**

### **✔️ Use SSH for Frequent Work**

- More secure and faster authentication

### **✔️ Use Shallow Clone in CI/CD**

- Saves time and bandwidth

### **✔️ Always Pull Latest Changes**

After cloning:

``` bash
git pull
```

### **✔️ Verify Remote URL**

``` bash
git remote -v
```

## **🧾 Final Summary**

- 📥 **Git Clone = Copy remote repository locally**
- 📜 Includes full history, branches, and tags
- 🚀 First step in DevOps pipelines
- ⚡ Essential for collaboration and deployment

👉 In real DevOps:

**Clone → Build → Test → Deploy → Monitor**

**🌿 SECTION 4:Git Pull & Git Fetch**

## **🔄 9. Git Pull vs Git Fetch**

These two commands are often confusing but very important in real DevOps workflows.

| **Command** | **Meaning**            |
|-------------|------------------------|
| git fetch   | Only downloads updates |
| git pull    | Downloads + merges     |

## **📖 Overview**

In Git, `git fetch` and `git pull` are used to bring changes from a remote repository (like GitHub or GitLab) to your local environment.

👉 They sound similar, but behave very differently — and choosing the right one is critical in DevOps workflows.

## **🔄 Core Difference**

| **Command** | **Meaning**                      |
|-------------|----------------------------------|
| `git fetch` | Download updates only            |
| `git pull`  | Download + apply (merge) changes |

## **🔹 Git Fetch (Safe Approach)**

### **⚙️ Command**

``` bash
git fetch
```

### **🧠 What it does:**

- Downloads latest commits from remote
- Updates remote tracking branches (`origin/main`, etc.)
- ❌ Does NOT change your working code

👉 Your local branch remains unchanged.

### **💡 Think of it like:**

📥 **“Download updates, but don’t apply yet”**

### **✅ When to Use**

- Before starting work
- When collaborating in teams
- To safely inspect incoming changes
- Before manual merge or rebase

### **🔍 Example Workflow**

``` bash
git fetch
git log origin/main
git diff origin/main
```

👉 Review changes **before applying them**

## **🔹 Git Pull (Direct Update)**

### **⚙️ Command**

``` bash
git pull
```

### **🧠 What it does:**

- Runs:

``` bash
git fetch + git merge
```

- Downloads changes
- Immediately merges into your current branch

👉 Your working directory is updated instantly.

### **💡 Think of it like:**

📥 + 🔀 **“Download and apply changes immediately”**

### **⚠️ Risk**

- Can create **merge conflicts instantly**
- May break your working code if not careful

## **🔥 Key Differences**

| **Feature**       | **git fetch** | **git pull** |
|-------------------|---------------|--------------|
| Downloads changes | ✔             | ✔            |
| Applies changes   | ❌            | ✔            |
| Safe for review   | ✔             | ❌           |
| Risk of conflicts | ❌            | ✔            |

## **🧠 Real-World DevOps Usage**

### **👥 Team Collaboration**

👉 Use `git fetch`:

- Inspect changes first
- Avoid unexpected conflicts
- Maintain stability

### **⚡ Fast Updates (Careful Use)**

👉 Use `git pull`:

- When you are sure your branch is clean
- When working solo
- When quick sync is needed

## **🚀 DevOps Insight**

In CI/CD environments using tools like GitHub Actions or Jenkins:

- Systems usually perform **fetch operations internally**
- Pipelines prefer controlled updates (not blind merges)
- Stability and predictability are critical

## **🔧 Advanced Usage**

### **🔹 Pull with Rebase (Cleaner History)**

``` bash
git pull --rebase
```

👉 Fetch + rebase instead of merge  
👉 Avoids unnecessary merge commits

### **🔹 Fetch Specific Branch**

``` bash
git fetch origin feature-branch
```

### **🔹 Check Differences Before Pull**

``` bash
git diff HEAD origin/main
```

## **💡 Best Practices**

### **✔️ Prefer** `git fetch` **in Teams**

- Always review before merging

### **✔️ Avoid Blind** `git pull`

- Can introduce unexpected issues

### **✔️ Use** `pull --rebase` **for Clean History**

- Especially in feature branches

### **✔️ Resolve Conflicts Carefully**

- Test after pulling changes

## **🧾 Final Summary**

- 📥 **git fetch = Download only (safe)**
- 🔀 **git pull = Download + apply (risky)**
- 🧠 Choose based on situation

👉 In real DevOps:

**Control \> Speed**

- Use `fetch` for safety
- Use `pull` for convenience (with caution)

**🌿 SECTION 5:Git Pages Deployment**

## **🌐 What is GitHub Pages?**

**GitHub Pages** is a free hosting service provided by GitHub that allows you to **deploy static websites directly from a Git repository**.

👉 It is ideal for:

- Portfolio websites
- Documentation sites
- Landing pages
- Front-end projects (HTML, CSS, JavaScript)

## **📖 Purpose**

- 🌍 Host static websites without a server
- 🚀 Deploy directly from your repository
- 💡 Showcase projects publicly

👉 No need for traditional hosting or backend setup.

## **⚙️ How GitHub Pages Works**

- You push your project to a repository
- GitHub serves files via a public URL
- Automatically updates when you push changes

👉 Example URL:

https://username.github.io/repository-name

## **🛠️ Step-by-Step Deployment**

### **🔹 Step 1: Create Project**

- Build your website using:
  - HTML
  - CSS
  - JavaScript

👉 Ensure you have an `index.html` file (entry point)

### **🔹 Step 2: Push Code to Repository**

``` bash
git init
```

git add .

``` bash
git commit -m "Initial website"
git branch -M main
git remote add origin <repo_url>
git push -u origin main
```

### **🔹 Step 3: Enable GitHub Pages**

1.  Go to your repository on GitHub
2.  Open **Settings**
3.  Navigate to **Pages** section
4.  Under **Source**:
    - Select branch (e.g., `main`)
    - Select folder (`/root` or `/docs`)

### **🔹 Step 4: Deploy**

👉 Click **Save**

GitHub will:

- Build your site
- Generate a live URL
- Deploy automatically

### **🔹 Step 5: Access Website**

After a few seconds:

👉 Your site will be live at:

https://username.github.io/repo-name

## **🚀 DevOps Insight**

### **👉 GitHub Pages = Simple CI/CD for Frontend**

Under the hood:

- Push code → triggers build
- GitHub deploys automatically
- Changes reflect instantly

👉 Similar to CI/CD tools like GitHub Actions (but simplified)

## **🔄 Real DevOps Workflow**

1.  Developer updates website
2.  Push changes to repository
3.  GitHub Pages auto-deploys
4.  Website updates live

👉 Continuous Deployment in action 🚀

## **💡 Best Practices**

### **✔️ Keep** `index.html` **at Root**

- Required for proper deployment

### **✔️ Use Clean File Structure**

- Organize CSS, JS, images properly

### **✔️ Test Locally Before Push**

- Avoid broken deployments

### **✔️ Use Custom Domain (Optional)**

- Connect your own domain name

### **✔️ Use Branch Strategy**

- `main` → production
- `dev` → development

## **⚠️ Limitations**

- ❌ Static sites only (no backend)
- ❌ No server-side processing
- ❌ Limited build customization (unless using Actions)

## **🧾 Final Summary**

- 🌐 **GitHub Pages = Free static website hosting**
- 🚀 Deploy directly from Git repository
- ⚡ Auto-deploy on every push
- 💡 Perfect for front-end developers

👉 In real DevOps:

**Code → Push → Deploy → Live Website**

**🌿 SECTION 6: Deploy Vite / React App on GitHub Pages**

## **📖 Overview**

Deploying a **Vite/React application** to GitHub Pages allows you to host a modern frontend app as a static website.

👉 Since React apps are built into static files (HTML, CSS, JS), they can be deployed easily using GitHub Pages.

## **🧠 Deployment Flow**

### **🔄 High-Level Process:**

1.  Build React app
2.  Generate production files (`dist/` folder)
3.  Push to repository
4.  Deploy using GitHub Pages

👉 **Build → Push → Deploy → Live 🚀**

## **⚙️ Step-by-Step Deployment (Vite + React)**

## **🔹 Step 1: Create/Prepare Project**

If using Vite:

``` bash
npm create vite@latest my-app
```

cd my-app

``` bash
npm install
```

👉 Start development:

``` bash
npm run dev
```

## **🔹 Step 2: Configure Base Path (Important ⚠️)**

Open `vite.config.js`:

export default defineConfig({

base: '/your-repo-name/',

})

👉 Required because GitHub Pages serves from a subpath.

## **🔹 Step 3: Build the Project**

``` bash
npm run build
```

👉 Output folder:

dist/

This contains:

- `index.html`
- JS/CSS assets

## **🔹 Step 4: Push Code to Repository**

``` bash
git init
```

git add .

``` bash
git commit -m "Initial React app"
git branch -M main
git remote add origin <repo_url>
git push -u origin main
```

## **🔹 Step 5: Deploy Using gh-pages Package (Recommended)**

Install deployment tool:

``` bash
npm install gh-pages --save-dev
```

### **🔹 Update** `package.json`

Add:

    "homepage": "https://username.github.io/repo-name",
    "scripts": {
    "deploy": "gh-pages -d dist"
    }

### **🔹 Deploy Command**

``` bash
npm run build
npm run deploy
```

👉 This:

- Creates `gh-pages` branch
- Pushes `dist` folder
- Deploys automatically

## **🔹 Step 6: Enable GitHub Pages**

1.  Go to repo → Settings
2.  Open **Pages**
3.  Select:
    - Branch: `gh-pages`
    - Folder: `/root`

## **🌐 Final Output**

👉 Your app will be live at:

https://username.github.io/repo-name/

## **🚀 DevOps Insight**

### **👉 This is a Mini CI/CD Pipeline**

Using tools like GitHub Actions, you can automate:

- Build process
- Deployment
- Testing

### **🔄 Real DevOps Flow**

1.  Push code
2.  CI builds project
3.  Deploy to GitHub Pages
4.  App goes live automatically

👉 This is **Continuous Deployment (CD)** in action.

## **⚠️ Common Issues & Fixes**

### **❌ Blank Page After Deployment**

✔ Fix:

- Check `base` path in `vite.config.js`

### **❌ Assets Not Loading**

✔ Fix:

- Ensure correct repo name in `base`

### **❌ Routing Issue (React Router)**

✔ Fix:

- Use `HashRouter` instead of `BrowserRouter`

## **🔧 Alternative: Manual Deployment**

Without `gh-pages`:

``` bash
npm run build
```

Then:

- Copy `dist/` contents to `docs/` folder
- Push to `main` branch
- Set Pages source to `/docs`

## **💡 Best Practices**

### **✔️ Always Test Build Locally**

``` bash
npm run preview
```

### **✔️ Use** `.env` **for Config**

- Avoid hardcoding values

### **✔️ Automate Deployment**

- Use GitHub Actions for production-grade setup

### **✔️ Optimize Build**

- Minify assets
- Remove unused code

## **🧾 Final Summary**

- ⚛️ Build React app using Vite
- 📦 Generate `dist/` folder
- 🚀 Deploy via GitHub Pages
- 🌐 Host app for free

👉 In real DevOps:

**Code → Build → Deploy → Live Application**

**🌿 SECTION 7: Skipping Git Staging Area (Direct Commit Workflow)**

In Git, the normal workflow follows this flow:

Modify files → git add (staging area) → git commit → push

But in real-world development, Git also provides a shortcut to **skip the staging area for tracked files** and directly commit changes.

This is done using:

``` bash
git commit -a -m "commit message"
```

# **🧠 1. Understanding the Git Staging Area First**

Before learning “skip staging”, you must understand staging.

## **🔹 Git has 3 main areas:**

### **1. Working Directory**

👉 Where you edit files

### **2. Staging Area (Index)**

👉 Where you prepare changes before commit

### **3. Repository**

👉 Final saved history (commits)

## **🔄 Normal Flow:**

``` bash
git add file.js
git commit -m "update file"
```

# **⚡ 2. What is** `git commit -a`**?**

## **🔹 Command:**

``` bash
git commit -a -m "message"
```

## **🔍 Meaning:**

👉 Automatically stages **all modified + deleted tracked files  
** 👉 Then commits them immediately  
👉 Skips manual `git add`

# **⚠️ IMPORTANT RULE**

``` bash
git commit -a ONLY works on:
```

✔ Tracked files (already committed before)

❌ New files are NOT included automatically

# **🧠 3. Real-Life Example**

## **Scenario:**

You edit:

app.js (modified)

style.css (modified)

You run:

``` bash
git commit -a -m "update UI and logic"
```

### **Git automatically does:**

``` bash
git add app.js style.css
git commit -m "update UI and logic"
```

# **📌 4. What** `-a` **Actually Includes**

## **It automatically stages:**

✔ Modified files  
✔ Deleted files

## **It does NOT include:**

❌ New files (untracked files)

# **🧠 5. Example of Missing Case (Important Interview Point)**

## **You create new file:**

touch newfile.js

Then run:

``` bash
git commit -a -m "add new file"
```

👉 ❌ newfile.js will NOT be committed

## **Correct way:**

``` bash
git add newfile.js
git commit -m "add new file"
```

# **⚙️ 6. Why** `git commit -a` **Exists**

It is designed for:

✔ Faster workflow  
✔ Small bug fixes  
✔ Quick edits  
✔ Local development speed

# **🚀 7. Real DevOps Use Cases**

## **✔ Use case 1: Bug fix**

``` bash
git commit -a -m "fix null pointer bug"
```

## **✔ Use case 2: Config update**

``` bash
git commit -a -m "update nginx config"
```

## **✔ Use case 3: Log cleanup**

``` bash
git commit -a -m "remove debug logs"
```

# **⚠️ 8. When NOT to use** `-a`

Avoid using it when:

❌ Working on large features  
❌ You need selective staging  
❌ Working in team review PRs  
❌ You have multiple unrelated changes

# **🧠 9. Best Practice (Professional DevOps Workflow)**

## **Recommended safe flow:**

``` bash
git status
git add specific-file.js
git diff --staged
git commit -m "clear message"
```

## **Faster but controlled flow:**

``` bash
git commit -a -m "quick fix"
```

# **🔥 10. Comparison Table**

| **Feature**             | **git add + commit** | **git commit -a**      |
|-------------------------|----------------------|------------------------|
| Staging area used       | Yes                  | No (partially skipped) |
| New files included      | Yes                  | No                     |
| Modified files included | Yes                  | Yes                    |
| Deleted files included  | Yes                  | Yes                    |
| Control                 | High                 | Medium                 |
| Speed                   | Normal               | Fast                   |

# **🧭 11. DevOps Insight (Real Industry Usage)**

In production teams:

✔ Developers use `git commit -a` for quick fixes  
✔ But PR-based workflows avoid it  
✔ CI/CD pipelines expect clean staged commits  
✔ Code reviews prefer explicit `git add`

# **🚀 FINAL SUMMARY**

## **✔ What you learned:**

- Git staging area concept
- What `git commit -a` does
- It skips manual staging for tracked files
- New files are NOT included
- Useful for quick local commits
- Not ideal for complex or team workflows

# **🌿 SECTION 8: 🔍 How to Verify Files After Commit (Before Push)**

## **🧠 First, understand the Git flow**

Working Directory → Staging Area → Local Repo (commit) → Remote Repo (push)

So when you say:

> “after commit but before push”

👉 Your code is already saved locally in Git history  
👉 Now you are just verifying before sending to GitHub

# **✅ 1. Check what you committed**

### **✔ View last commit**

``` bash
git log -1
```

👉 Shows:

- Commit ID
- Author
- Message
- Timestamp

### **✔ See exactly what was changed in last commit**

``` bash
git show
```

👉 Example output:

- Files changed
- Lines added/removed

### **✔ Compare last commit with previous one**

``` bash
git diff HEAD~1 HEAD
```

👉 This shows:  
✔ What you just committed  
✔ What exactly changed

# **🔍 2. Verify file content (real check)**

### **✔ View file after commit**

cat filename.txt

👉 Confirms:

- File exists
- Content is correct

# **🔍 3. Check if everything is clean before push**

### **✔ Check repo status**

``` bash
git status
```

👉 If everything is OK, you should see:

nothing to commit, working tree clean

✔ This means:

- Commit is done
- No uncommitted changes
- Safe to push

# **🔍 4. Check what will be pushed (IMPORTANT 🔥)**

### **✔ Compare local vs remote**

``` bash
git log origin/main..HEAD
```

👉 Shows:  
✔ Commits that exist locally  
✔ But not yet pushed

### **✔ See full difference with remote**

``` bash
git diff origin/main
```

# **🔍 5. Verify commit content visually (best practice)**

### **✔ Graph view**

``` bash
git log --oneline --graph --all
```

👉 Helps you see:

- Branch structure
- Commit order
- Pending pushes

# **🚀 REAL DEVOPS SAFE WORKFLOW**

After commit, always do:

``` bash
git status
git log -1
git show
git diff origin/main..HEAD
```

👉 If everything looks correct:

``` bash
git push
```

# **⚠️ Why this step is important in DevOps**

Before pushing code to:

- Production
- CI/CD pipeline (GitHub Actions)
- Kubernetes / AWS deployment

You must verify:

✔ No wrong commit  
✔ No secrets leaked  
✔ No broken code  
✔ No accidental file changes

# **🧠 Simple Mental Model**

| **Stage**   | **What you do**         |
|-------------|-------------------------|
| Commit done | Save snapshot locally   |
| Verify      | Check history + changes |
| Before push | Compare with remote     |
| Push        | Send to GitHub          |

# **🔥 Pro Tip (Real DevOps habit)**

Always run this before push:

``` bash
git log -1 && git show && git status
```

# **🚀 Summary**

To verify after commit and before push:

### **✔ Use these commands:**

``` bash
git log -1
git show
git diff origin/main..HEAD
git status
```

### **✔ Goal:**

- Confirm commit is correct
- Ensure no unwanted changes
- Safely push to remote

**🌿 SECTION 9: Real DevOps Scenarios**

## **📖 Overview**

In real production environments using Git and platforms like GitHub, developers don’t just run commands — they solve **real problems under pressure**.

👉 These scenarios reflect **daily DevOps situations** in companies.

# **🔥 Scenario 1: Urgent Hotfix (Production Issue)**

## **🚨 Situation:**

- Bug found in production
- You are working on a feature branch
- Need immediate fix

## **⚙️ Commands:**

``` bash
git stash
git checkout main
git checkout -b hotfix
```

## **🧠 What’s Happening:**

1.  `git stash
    > ` 👉 Save your current unfinished work temporarily

2.  `git checkout main
    > ` 👉 Switch to stable production branch

3.  `git checkout -b hotfix
    > ` 👉 Create a new branch for emergency fix

## **🚀 Real Flow:**

- Fix bug
- Commit changes
- Push hotfix branch
- Create PR → review → merge → deploy

## **💡 DevOps Insight:**

👉 **Never mix unfinished work with production fixes  
** 👉 Always isolate hotfixes for safety

# **🔥 Scenario 2: Clean Feature History**

## **🧠 Situation:**

- Your feature branch is outdated
- Main branch has new commits
- Want clean commit history

## **⚙️ Command:**

``` bash
git rebase main
```

## **🧠 What’s Happening:**

- Your commits are moved on top of latest `main`
- History becomes linear

## **🚀 Benefit:**

- Cleaner logs
- Easier debugging
- Professional commit history

## **⚠️ Rule:**

👉 Never rebase shared/public branches

# **🔥 Scenario 3: Undo Production Bug**

## **🚨 Situation:**

- Bug deployed to production
- Need to undo last commit safely

## **⚙️ Command:**

``` bash
git revert HEAD
```

## **🧠 What’s Happening:**

- Creates a new commit that **reverses previous commit**
- Does NOT delete history

## **🚀 Why This is Important:**

- Safe for production
- Keeps history intact
- Works perfectly in team environments

## **❗ Why NOT use reset?**

``` bash
git reset --hard
```

❌ Dangerous in shared branches  
❌ Rewrites history

## **💡 DevOps Insight:**

👉 **Revert = Safe undo in production  
** 👉 Always prefer revert over reset in teams

# **🔥 Scenario 4: Copy Fix Across Branches**

## **🧠 Situation:**

- Bug fixed in one branch
- Same fix needed in another branch

## **⚙️ Command:**

``` bash
git cherry-pick <commit-id>
```

## **🧠 What’s Happening:**

- Copies specific commit
- Applies it to current branch

## **🚀 Use Case:**

- Hotfix reuse
- Partial deployment
- Emergency fixes

## **⚠️ Caution:**

- Can create duplicate commits
- May cause conflicts

# **🔄 DevOps Big Picture**

These commands are not isolated — they are part of a **real workflow**:

### **🔁 Production Lifecycle:**

1.  Code development
2.  Feature branches
3.  Testing via CI/CD (e.g., GitHub Actions)
4.  Merge to main
5.  Deploy
6.  Monitor
7.  Fix issues (hotfix/revert/cherry-pick)

# **🧠 Key DevOps Mindset**

### **✔️ Speed + Safety Balance**

| **Situation**  | **Tool**      |
|----------------|---------------|
| Emergency fix  | hotfix branch |
| Clean history  | rebase        |
| Undo safely    | revert        |
| Selective copy | cherry-pick   |

# **⚡ Pro Tips (Real Engineer Advice)**

- 🔹 Always keep `main` stable
- 🔹 Never panic — Git always has a recovery path
- 🔹 Communicate before rewriting history
- 🔹 Test after every fix
- 🔹 Use PR + CI/CD before production

# **🧾 Final Summary**

- 🚨 **Hotfix** → Fix production fast
- 🧹 **Rebase** → Clean history
- 🔁 **Revert** → Safe undo
- 🍒 **Cherry-pick** → Selective changes

👉 In real DevOps:

**Right Command + Right Time = Production Stability**

# **🚀 DevOps Mindset (VERY IMPORTANT)**

👉 Git is not just commands  
👉 It is a **production control system**

✔ Safe undo = Revert  
✔ Dangerous history change = Reset  
✔ Clean teamwork = PR workflow  
✔ Automation = GitHub Actions

# **🧠 Golden Rules (DevOps Mindset)**

👉 Don’t rewrite shared history  
👉 Prefer revert over reset in teams  
👉 Use rebase for clean local history  
👉 Always understand before using advanced commands

# **📘 CHAPTER 7: Git Debugging, Comparison & Release Management** 

**📖 Chapter Description:**

This chapter focuses on mastering Git for real-world debugging, code comparison, and release workflows. You will learn how to analyze commit history using logs, track and compare changes with powerful diff commands, manage versions with tagging, and improve productivity using Git aliases. These skills are essential for DevOps engineers to troubleshoot issues, review code efficiently, and manage production-ready releases with confidence.

# **🌿 SECTION 1: Git Logs & Debugging**

## **📜 What are Git Logs?**

**Git logs** are a record of all changes (commits) made in a repository. They provide a detailed history of:

- Code changes
- Authors
- Timestamps
- Commit messages

Git logs are a core feature of distributed version control systems like Git and are heavily used in platforms such as GitHub and GitLab.

👉 Think of Git logs as the **“audit trail” of your codebase**.

## **📜 Viewing Logs (History Visualization)**

### **🔹 Basic Log Command**

``` bash
git log
```

👉 Shows full commit history with:

- Commit hash
- Author
- Date
- Message

### **🔹 Compact Log View**

``` bash
git log --oneline
```

📌 Example Output:

a1b2c3d Fix login bug

d4e5f6g Add user authentication

h7i8j9k Initial commit

### **✅ Why it’s useful:**

- Quick overview of history
- Easy to reference commits using short hashes
- Helpful in debugging and rollback

### **🔹 Visual Graph Log (Advanced)**

``` bash
git log --oneline --graph --all
```

👉 Displays:

- Branch structure
- Merges
- Parallel development

📊 This is especially useful in **team environments** where multiple branches are active.

## **🔎 Comparing Changes**

### **🔹 View Uncommitted Changes**

``` bash
git diff
```

👉 Shows differences between:

- Working directory vs last commit

### **🔹 Compare Between Commits**

``` bash
git diff <commit1> <commit2>
```

👉 Helps identify:

- What changed between versions
- Exact lines added/removed

## **🧠 Real-World Use Cases**

### **🐞 1. Track Bugs**

- Identify when a bug was introduced
- Trace back to the responsible commit

### **🔄 2. Compare Versions**

- Analyze differences between releases
- Verify what changed before deployment

### **🚀 3. Pre-Deployment Checks**

- Review changes before merging to main branch
- Ensure no unwanted code is deployed

## **🔥 Debugging Insight (DevOps Perspective)**

### **👉 Git is Your Debugging Tool**

In modern DevOps workflows, Git is not just for version control — it is a **powerful debugging system**.

### **You can trace:**

#### **👤 Who changed the code**

- Commit author information

#### **🕒 When changes happened**

- Commit timestamps

#### **🧾 What exactly changed**

- Line-by-line differences using `git diff`

## **🛠️ Advanced Debugging Techniques**

### **🔹 1. Find Bug Using Commit History**

Use:

``` bash
git log --oneline
```

👉 Identify suspicious commits and investigate further.

### **🔹 2. Inspect a Specific Commit**

``` bash
git show <commit-id>
```

👉 Displays:

- Changes in that commit
- File modifications

### **🔹 3. Step-by-Step Debugging (Powerful)**

``` bash
git bisect
```

👉 Helps find the exact commit where a bug was introduced using binary search.

## **🚀 DevOps Insight**

### **🔄 Git + CI/CD = Reliable Deployment**

When integrated with CI/CD tools like GitHub Actions or Jenkins:

- Logs help verify changes before pipeline runs
- Debugging becomes faster when builds fail
- Teams can trace issues across deployments

## **💡 Best Practices**

### **✔️ Write Meaningful Commit Messages**

Bad:

fix bug

Good:

Fix login issue caused by null pointer exception

### **✔️ Use Small, Atomic Commits**

- Easier to track and debug
- Better history clarity

### **✔️ Use** `--oneline` **for Daily Work**

- Fast and clean view

### **✔️ Combine with Aliases (Pro Tip)**

Example:

``` bash
git config --global alias.lg "log --oneline --graph --all"
```

👉 Then just run:

``` bash
git lg
```

## **🔚 Final Summary**

Git logs are a **critical debugging and tracking tool** in DevOps:

- 📜 Provide complete history
- 🔎 Show exact code changes
- 🐞 Help track and fix bugs
- 🚀 Ensure safe deployments

👉 Mastering Git logs means:  
**You don’t just write code — you understand its entire history.**

# **🌿 SECTION 2: Git Diff**

# **(Real-World Change Comparison Master Guide)**

Git `diff` is one of the most powerful debugging and review tools in Git. It is used to **compare changes between files, commits, branches, and staging area**.

In real DevOps work, `git diff` is used daily for:

- Code review before commit
- Debugging bugs
- Understanding what changed
- Verifying deployments
- Checking staged vs unstaged work

# **🧠 1. What is Git Diff?**

## **🔹 Core Idea:**

``` bash
git diff shows what has changed, not the final result
```

It compares:

- Working directory (your files)
- Staging area (git add)
- Commit history

# **📌 2. Basic Git Diff**

## **🔹 Command:**

``` bash
git diff
```

## **🔍 What it shows:**

👉 Changes in files that are **NOT staged yet**

### **Example:**

You edit `app.js` but did NOT run `git add`

\- console.log("Hello")

\+ console.log("Hello DevOps")

## **🧠 Real-life example:**

You are fixing a bug but forgot what you changed:

``` bash
git diff
```

👉 Git shows all unsaved staged changes

# **📌 3. Git Diff Staged (Very Important)**

## **🔹 Command:**

``` bash
git diff --staged
```

(or older version)

``` bash
git diff --cached
```

## **🔍 What it shows:**

👉 Changes that are **already staged (git add)** but NOT committed

## **🧠 Real DevOps scenario:**

git add .

``` bash
git diff --staged
```

👉 You check:

- What is going into commit
- Before pushing to GitHub

# **📌 4. Git Diff Between Two Commits**

## **🔹 Command:**

``` bash
git diff commit_id_1 commit_id_2
```

## **🔍 What it shows:**

👉 Difference between two versions of code

## **🧠 Example:**

``` bash
git diff a1b2c3 d4e5f6
```

## **🧠 Real use case:**

- Compare old bug vs fixed version
- Review feature progress
- Debug production issue

# **📌 5. Git Diff Between Branches**

## **🔹 Command:**

``` bash
git diff branch1 branch2
```

## **🧠 Example:**

``` bash
git diff main feature-login
```

👉 Shows:

- What feature branch changed vs main

## **🔥 DevOps usage:**

- Before merging PR
- Code review in CI/CD pipelines

# **📌 6. Git Diff Name Only**

## **🔹 Command:**

``` bash
git diff --name-only
```

## **🔍 What it shows:**

👉 ONLY file names, not code changes

## **🧠 Example output:**

index.html

app.js

style.css

## **🔥 Real use case:**

- Quickly see which files changed
- Useful in automation scripts (CI/CD)

# **📌 7. Git Diff Name Status**

## **🔹 Command:**

``` bash
git diff --name-status
```

## **🔍 Output example:**

M app.js

A newfile.js

D oldfile.js

### **Meaning:**

- M → Modified
- A → Added
- D → Deleted

# **📌 8. Git Diff Color Output**

## **🔹 Command:**

``` bash
git diff --color
```

## **🔍 What it does:**

👉 Shows changes in **colored format**

- Red = removed lines
- Green = added lines

## **🧠 Why useful:**

- Easier code review
- Better readability in terminal

# **📌 9. Word-Level Diff (Very Advanced + Useful)**

## **🔹 Command:**

``` bash
git diff --word-diff
```

## **🔍 What it shows:**

Instead of line changes, it shows **word-level changes**

## **🧠 Example:**

Hello {World → DevOps}

## **🔥 Real use case:**

- Small text changes
- Commit message edits
- Configuration changes

# **📌 10. Git Diff with Patch Style (Default behavior)**

``` bash
git diff
```

👉 Shows full line-by-line changes

# **📌 11. Git Diff with Specific File**

## **🔹 Command:**

``` bash
git diff file_name
```

## **🧠 Example:**

``` bash
git diff app.js
```

👉 Only shows changes in one file

# **📌 12. Git Diff Staged vs Working Directory (Combined View)**

## **🔹 Workflow example:**

``` bash
git add app.js
git diff
git diff --staged
```

## **🧠 Meaning:**

| **Command**       | **Shows**        |
|-------------------|------------------|
| git diff          | unstaged changes |
| git diff --staged | staged changes   |

# **📌 13. Git Diff HEAD (Very Important)**

## **🔹 Command:**

``` bash
git diff HEAD
```

## **🔍 What it shows:**

👉 All changes (staged + unstaged) compared to last commit

## **🧠 Real DevOps usage:**

- Final review before push
- CI/CD validation check

# **📌 14. Git Diff Between Commit and File**

## **🔹 Command:**

``` bash
git diff commit_id file_name
```

## **🧠 Example:**

``` bash
git diff a1b2c3 app.js
```

# **📌 15. Git Diff Ignore Space Changes**

## **🔹 Command:**

``` bash
git diff -w
```

## **🔍 What it does:**

👉 Ignores whitespace differences

## **🧠 Real use:**

- Formatting changes
- Clean code review

# **🚀 FINAL DEVOPS SUMMARY (IMPORTANT)**

## **🔥 Most Used Git Diff Commands:**

### **Daily workflow:**

``` bash
git diff
git diff --staged
git diff HEAD
git diff --name-only
```

## **🧠 Production Workflow:**

✔ Check changes before commit  
✔ Review staged files  
✔ Compare branches before merge  
✔ Debug production issues  
✔ Validate CI/CD pipelines

# **🧭 DevOps Insight**

In real companies:

- Developers ALWAYS use `git diff` before PR
- CI pipelines use diff checks for validation
- Code reviewers rely on diff output
- Debugging starts with diff analysis

# **🌿 SECTION 3: 🏷️ Git Tagging & Releases**

## **📖 What is a Git Tag?**

A **Git Tag** is a **fixed reference to a specific commit** in the repository history. Unlike branches, tags do not move — they permanently point to a particular snapshot of your code.

👉 Tags are commonly used to mark **release versions** like `v1.0`, `v2.1`, etc.

They are widely used in platforms like GitHub, GitLab, and Bitbucket to manage production releases.

## **⚙️ Common Git Tag Commands**

### **🔹 Create a Lightweight Tag**

``` bash
git tag v1.0
```

👉 Creates a simple reference to the current commit.

### **🔹 Create an Annotated Tag (Recommended)**

``` bash
git tag -a v1.0 -m "release version 1.0"
```

👉 Adds metadata such as:

- Tag name
- Message
- Author
- Date

### **🔹 Push Tag to Remote Repository**

``` bash
git push origin v1.0
```

👉 Sends the tag to remote (important for team visibility and deployments).

### **🔹 Push All Tags**

``` bash
git push --tags
```

### **🔹 List All Tags**

``` bash
git tag
```

## **🧠 Types of Git Tags**

### **🔹 Lightweight Tag**

- Simple pointer to a commit
- No additional metadata
- Quick and easy

👉 Use when:

- Temporary marking
- Internal/local reference

### **🔹 Annotated Tag (Recommended)**

- Stored as full Git objects
- Includes metadata and message
- Signed and verifiable

👉 Use when:

- Creating official releases
- Sharing with teams
- Production deployments

## **🚀 DevOps Use Cases**

### **📦 1. Versioning Releases**

Tags are used to define versions like:

- `v1.0` → Initial release
- `v1.1` → Bug fixes
- `v2.0` → Major update

👉 Helps maintain structured release cycles.

### **🚀 2. Deployment Tracking**

In CI/CD pipelines (e.g., GitHub Actions or Jenkins):

- Deploy specific tagged versions
- Avoid deploying unstable code
- Track which version is in production

### **🔄 3. Rollback Reference**

If something breaks in production:

``` bash
git checkout v1.0
```

👉 Instantly revert to a stable version.

### **🔍 4. Release Auditing**

- Know exactly what code went live
- Trace changes between releases
- Maintain compliance and documentation

## **🛠️ Real DevOps Workflow with Tags**

### **🔄 Typical Release Flow:**

1.  Developer completes feature
2.  Code is merged via PR
3.  CI/CD pipeline runs tests
4.  Create release tag:  
    >   
    > git tag -a v1.0 -m "stable release"

5.  Push tag:  
    >   
    > git push origin v1.0

6.  Deployment pipeline triggers automatically based on tag

👉 Many pipelines are configured to deploy **only when a tag is created**.

## **💡 Best Practices**

### **✔️ Use Semantic Versioning**

Format:

vMAJOR.MINOR.PATCH

Example:

- `v1.0.0` → Initial release
- `v1.1.0` → New feature
- `v1.1.1` → Bug fix

### **✔️ Always Use Annotated Tags for Releases**

- More secure and informative
- Better for teams and automation

### **✔️ Tag Only Stable Code**

- Never tag incomplete or untested code

### **✔️ Automate Tag-Based Deployments**

- Use CI/CD pipelines to trigger releases

### **✔️ Keep Tag Names Consistent**

- Avoid confusion in production environments

## **🧾 Final Summary**

- 🏷️ **Tags = Fixed checkpoints in Git history**
- 📜 Logs help you **debug and trace changes**
- 🚀 Tags help you **manage releases and deployments**
- 🔁 Together, they give **full control over your code lifecycle**

👉 With tools like GitHub and CI/CD systems, Git becomes a complete **DevOps lifecycle engine**:

**Code → Review → Test → Tag → Deploy → Monitor**

# **🌿 SECTION 4: Git Aliases**

## **⚙️ What are Git Aliases?**

**Git Aliases** are custom shortcuts that allow you to replace long or complex Git commands with short, easy-to-remember commands.

They are configured using the Git configuration system and are widely used in platforms like GitHub, GitLab, and Bitbucket workflows to improve developer efficiency.

👉 Think of aliases as your **command-line productivity hacks**.

## **🔍 Understanding Git Configuration**

Git stores configuration in a hidden file:

    ~/.gitconfig

To view hidden files:

``` bash
ls -a
```

### **📂 Types of Git Configurations**

| **Type** | **Scope**          | **File Location** |
|----------|--------------------|-------------------|
| Global   | All repositories   | `~/.gitconfig`    |
| Local    | Current repository | `.git/config`     |
| System   | Entire machine     | `/etc/gitconfig`  |

## **🌍 Global Git Aliases (Recommended)**

Global aliases apply to **all repositories** on your system.

### **🔹 Create a Global Alias**

``` bash
git config --global alias.b branch
```

### **✅ Usage:**

``` bash
git b
```

👉 Same as:

``` bash
git branch
```

### **🔥 Common Global Aliases (Real DevOps Usage)**

``` bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.cm commit
git config --global alias.br branch
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --decorate --all"
```

👉 These are widely used by engineers working with CI/CD pipelines and automation.

## **📁 Local Git Aliases (Repo-Specific)**

Local aliases apply **only to a specific repository**.

### **🔹 Create Local Alias**

``` bash
git config alias.st status
```

👉 This command should be run inside your project directory (not inside `.git` manually — Git handles it internally).

### **✅ Usage:**

``` bash
git st
```

## **⚠️ Important Note (Common Mistake)**

❌ Wrong approach:

``` bash
cd .git
```

👉 You **should NOT manually go into** `.git` **folder** to configure aliases.

✔️ Correct approach:

cd your-project-folder

``` bash
git config alias.st status
```

## **🧠 Why Git Aliases Matter in DevOps**

### **⏱️ 1. Saves Time**

Short commands reduce typing effort in daily workflows.

### **❌ 2. Reduces Errors**

Less typing = fewer mistakes, especially in critical operations.

### **⚡ 3. Improves Productivity**

Speeds up tasks like:

- Checking status
- Switching branches
- Viewing logs
- Managing commits

### **🔁 4. Enhances CI/CD Workflow Efficiency**

In DevOps environments using tools like GitHub Actions or Jenkins:

- Faster local workflows = faster commits
- Faster commits = quicker pipeline triggers
- Quicker pipelines = faster delivery 🚀

## **🚀 Advanced Git Aliases (Power User Level)**

### **🔹 Pretty Git Log**

``` bash
git config --global alias.lg "log --graph --pretty=format:'%C(yellow)%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'"
```

👉 Visual commit history (very useful in debugging pipelines)

### **🔹 Undo Last Commit (Keep Changes)**

``` bash
git config --global alias.undo "reset --soft HEAD~1"
```

### **🔹 Show All Branches with Last Commit**

``` bash
git config --global alias.brlog "branch -av"
```

## **💡 DevOps Best Practices for Git Aliases**

### **✔️ Standardize Aliases Across Team**

- Share common alias list
- Maintain consistency in workflows

### **✔️ Document Your Aliases**

- Add them to team onboarding docs
- Helps new developers adapt quickly

### **✔️ Avoid Over-Complex Aliases**

- Keep them simple and meaningful
- Don’t create aliases nobody understands

### **✔️ Combine with Shell Aliases**

- Use Bash/Zsh aliases for even more power

## **🔚 Final Summary**

Git aliases are a **small feature with massive impact**:

- Simplify complex Git commands
- Boost speed and efficiency
- Reduce human error
- Enhance DevOps workflows

👉 In real-world DevOps:  
**Speed + Accuracy + Automation = Success**

And Git aliases directly contribute to all three.

# **📘 Chapter 8: Git Hooks**

# **Automation Inside Your Repository (Real DevOps Setup)**

Git Hooks are one of the most underrated but powerful features in Git. They let you **automate actions at specific points in the Git workflow**—before commits, before pushes, after merges, and more.

👉 In DevOps terms:

> Git Hooks = “Local automation layer before CI/CD”

# **🧠 1. What are Git Hooks?**

## **🔹 Definition:**

Git Hooks are **scripts that run automatically** when certain Git events happen.

## **🔍 Examples of events:**

- Before commit
- After commit
- Before push
- After merge

## **🧠 Real-life analogy:**

You press “Save” → system runs validation automatically  
👉 That validation = Git Hook

# **📂 2. Where Git Hooks Exist?**

Inside your repository:

``` bash
cd .git/hooks
```

You’ll see:

pre-commit.sample

pre-push.sample

commit-msg.sample

👉 These are sample hook scripts

# **⚙️ 3. How Git Hooks Work**

- Hooks are simple **scripts (bash, shell, Python, etc.)**
- They run automatically when triggered
- Must be **executable**

## **🔧 Enable a hook:**

mv pre-commit.sample pre-commit

``` bash
chmod +x pre-commit
```

# **🔥 4. Types of Git Hooks (Important Ones)**

## **🟢 1. pre-commit**

Runs before commit is created

### **Use cases:**

✔ Code linting  
✔ Format check  
✔ Prevent bad commits

## **🟡 2. commit-msg**

Runs to validate commit message

### **Use cases:**

✔ Enforce commit format  
✔ Jira ticket validation

## **🔵 3. pre-push**

Runs before pushing to remote

### **Use cases:**

✔ Run tests  
✔ Prevent broken code push

## **🟣 4. post-merge**

Runs after merging branch

### **Use cases:**

✔ Install dependencies  
✔ Rebuild project

# **🧪 5. Real Git Hook Setup (Hands-on)**

## **🔹 Example 1: Prevent Empty Commit Message**

### **File:**

.git/hooks/commit-msg

### **Script:**

``` bash
#!/bin/sh
if [ -z "$1" ]; then
echo "❌ Commit message is empty"
exit 1
fi
```

## **🔹 Example 2: Pre-commit Lint Check**

``` bash
#!/bin/sh
echo "Running lint check..."
npm run lint
if [ $? -ne 0 ]; then
echo "❌ Lint failed. Fix errors before commit."
exit 1
fi
```

👉 If lint fails → commit is blocked

## **🔹 Example 3: Pre-push Test Check**

``` bash
#!/bin/sh
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
echo "❌ Tests failed. Push rejected."
exit 1
fi
```

👉 Prevents broken code from reaching remote

# **⚙️ 6. Git Hook Exit Codes (Important)**

| **Exit Code** | **Meaning**            |
|---------------|------------------------|
| 0             | Success (allow action) |
| Non-zero      | Fail (block action)    |

# **🧠 7. Real DevOps Workflow with Hooks**

Developer → git commit → pre-commit runs → commit-msg runs

→ git push → pre-push runs → CI/CD pipeline starts

# **🔥 8. Git Hooks vs CI/CD**

| **Feature**    | **Git Hooks**     | **CI/CD** |
|----------------|-------------------|-----------|
| Runs locally   | ✔                 | ❌        |
| Runs on server | ❌                | ✔         |
| Speed          | Fast              | Slower    |
| Enforcement    | Weak (can bypass) | Strong    |

## **🧠 DevOps Insight:**

Hooks = first line of defense  
CI/CD = final gate

# **🚀 9. Advanced Hook Use Cases**

✔ Auto format code  
✔ Block large files  
✔ Secret detection (API keys)  
✔ Auto version bump  
✔ Run Docker builds locally

# **🔐 10. Security Use Case (Important)**

Prevent committing secrets:

``` bash
#!/bin/sh
```

if grep -r "AWS_SECRET" .; then

``` bash
echo "❌ Secret detected!"
exit 1
fi
```

# **⚠️ 11. Limitations of Git Hooks**

❌ Not shared by default  
❌ Can be bypassed (`--no-verify`)  
❌ Local only

# **🧪 12. Sharing Hooks in Team (Best Practice)**

Use tools like:

- Husky
- lint-staged

## **Example (Husky setup):**

``` bash
npm install husky --save-dev
npx husky install
```

# **🔄 13. Skip Git Hooks (Important)**

``` bash
git commit --no-verify
```

👉 Skips hooks

## **⚠️ Use carefully:**

- Only in emergency
- Not in production workflow

# **🧠 14. Real DevOps Best Practices**

✔ Use pre-commit for lint  
✔ Use pre-push for tests  
✔ Combine with CI/CD  
✔ Keep hooks lightweight  
✔ Never rely only on hooks

# **🧪 15. Real Setup Example (Full Flow)**

    # Create repo
    git init
    # Add hook
    cd .git/hooks
    nano pre-commit
    chmod +x pre-commit
    # Add code

git add .

``` bash
git commit -m "test commit"
```

👉 Hook runs automatically

# **🚀 FINAL SUMMARY**

## **You learned:**

- What Git Hooks are
- Types of hooks (pre-commit, pre-push, etc.)
- How to create and enable hooks
- Real DevOps automation examples
- Security checks with hooks
- Difference between hooks and CI/CD

# **🧭 DevOps Mindset**

👉 Hooks = Local quality control  
👉 CI/CD = Production gatekeeper

Together they create a **strong DevOps pipeline**

# **📘 Chapter 9: Git Flags** 

# **(A to Z Practical Master Guide)**

Git flags are options added to commands using `-` or `--` to modify behavior.

Example:

``` bash
git commit -m "message"
```

Here `-m` is a flag.

# **🧠 1. Git Global Flags (Work Across Commands)**

## **🔹** `--help`

Shows help for any command

``` bash
git commit --help
```

👉 Opens full documentation

## **🔹** `-v / --verbose`

Shows detailed output

``` bash
git push -v
```

👉 Useful for debugging push/pull issues

## **🔹** `--version`

Check Git version

``` bash
git --version
```

# **🌿 2. Git Branch Flags**

## **🔹** `-a` **(all branches)**

``` bash
git branch -a
```

👉 Shows:

- Local branches
- Remote branches

## **🔹** `-d` **(delete branch safely)**

``` bash
git branch -d feature-login
```

👉 Deletes only if merged

## **🔹** `-D` **(force delete)**

``` bash
git branch -D feature-login
```

👉 Deletes even if NOT merged ⚠️

## **🔹** `-m` **(rename branch)**

``` bash
git branch -m old-name new-name
```

# **📜 3. Git Log Flags (Very Important for DevOps)**

## **🔹** `--oneline`

``` bash
git log --oneline
```

👉 Compact history view

## **🔹** `--graph`

``` bash
git log --graph
```

👉 Shows branch structure visually

## **🔹** `--all`

``` bash
git log --all
```

👉 Shows all branches history

## **🔹 Combined power:**

``` bash
git log --oneline --graph --all
```

👉 Used in real DevOps debugging

## **🔹** `-p` **(patch view)**

``` bash
git log -p
```

👉 Shows actual code changes

# **✏️ 4. Git Commit Flags**

## **🔹** `-m` **(message)**

``` bash
git commit -m "fix login bug"
```

## **🔹** `-a` **(auto stage tracked files)**

``` bash
git commit -a -m "update files"
```

👉 Skips `git add` for modified files

## **🔹** `--amend`

``` bash
git commit --amend -m "new message"
```

👉 Modify last commit

## **🔹** `--no-edit`

``` bash
git commit --amend --no-edit
```

👉 Keep old message, just update files

# **🚀 5. Git Push Flags**

## **🔹** `-u` **(upstream tracking)**

``` bash
git push -u origin main
```

👉 Connect local branch to remote

## **🔹** `--force`

``` bash
git push --force
```

⚠️ Dangerous  
👉 Overwrites remote history

## **🔹** `--force-with-lease` **(safe force)**

``` bash
git push --force-with-lease
```

👉 Safer version of force push (DevOps standard)

## **🔹** `--all`

``` bash
git push origin --all
```

👉 Push all branches

## **🔹** `--tags`

``` bash
git push origin --tags
```

👉 Push version tags

# **📥 6. Git Pull Flags**

## **🔹** `--rebase`

``` bash
git pull --rebase
```

👉 Keeps clean linear history (VERY important in DevOps)

## **🔹** `--no-commit`

``` bash
git pull --no-commit
```

👉 Merge but don’t auto commit

# **🔄 7. Git Fetch Flags**

## **🔹** `--all`

``` bash
git fetch --all
```

👉 Fetch all remotes

## **🔹** `--prune`

``` bash
git fetch --prune
```

👉 Removes deleted remote branches locally

# **📦 8. Git Clone Flags**

## **🔹** `--branch`

``` bash
git clone --branch dev repo_url
```

👉 Clone specific branch

## **🔹** `--depth`

``` bash
git clone --depth 1 repo_url
```

👉 Shallow clone (only latest commit)

🔥 Used in CI/CD pipelines (fast cloning)

## **🔹** `--single-branch`

``` bash
git clone --single-branch --branch main repo_url
```

👉 Clone only one branch (saves space)

# **🔍 9. Git Checkout / Switch Flags**

## **🔹** `-b` **(create branch)**

``` bash
git checkout -b feature
```

## **🔹** `--orphan`

``` bash
git checkout --orphan new-branch
```

👉 Creates branch with NO history

# **📊 10. Git Status Flags**

## **🔹** `-s` **(short status)**

``` bash
git status -s
```

👉 Compact output

## **🔹** `-b` **(branch info)**

``` bash
git status -b
```

👉 Shows branch tracking info

# **🧠 11. Git Reset Flags (VERY IMPORTANT)**

## **🔹** `--soft`

``` bash
git reset --soft HEAD~1
```

👉 Keeps files staged

## **🔹** `--mixed` **(default)**

``` bash
git reset --mixed HEAD~1
```

👉 Unstages files but keeps changes

## **🔹** `--hard` **(danger)**

``` bash
git reset --hard HEAD~1
```

⚠️ Deletes everything

# **🔥 12. Git Rebase Flags**

## **🔹 Interactive rebase:**

``` bash
git rebase -i HEAD~3
```

👉 Modify last 3 commits

Used for:

- Squashing commits
- Cleaning history

# **🚀 Final DevOps Mind Map**

## **Daily Git Flags You MUST Know:**

### **Must Master:**

- `-m`
- `-a`
- `--amend`
- `--oneline`
- `--graph`
- `--force-with-lease`
- `--rebase`
- `--depth`
- `-D`
- `-d`

# **🧭 Real DevOps Insight**

In production environments:

- ❌ Avoid `--force` blindly
- ✔ Prefer `--force-with-lease`
- ✔ Prefer `git pull --rebase`
- ✔ Use `git fetch` before pull in teams
- ✔ Use `--depth` in CI/CD pipelines

# **📘 CHAPTER 10: Git + DevOps Integration (Docker, Kubernetes, AWS)**

# **🧠 1. Big Picture (IMPORTANT 🔥)**

## **📖 Core Idea:**

Git is not just for version control anymore.

👉 It is the **trigger point of the entire DevOps pipeline**

## **🔄 End-to-End Flow:**

Developer → Git Push → CI/CD Pipeline → Build → Test → Package → Deploy → Monitor

## **💡 In Real DevOps:**

- Git = Source of truth
- CI/CD = Automation engine
- Cloud = Execution environment

# **🔗 2. Git + Docker Integration 🐳**

## **📖 What is Docker?**

Docker is used to package applications into containers.

## **🔄 Workflow:**

1.  Developer pushes code to GitHub
2.  CI/CD pipeline builds Docker image
3.  Image is stored in registry

## **📂 Example Dockerfile:**

``` dockerfile
FROM node:18
WORKDIR /app
```

COPY . .

    RUN npm install
    CMD ["npm", "start"]

## **⚙️ CI Step (GitHub Actions):**

\- name: Build Docker Image

run: docker build -t my-app .

## **🧠 DevOps Insight:**

👉 Docker ensures:

- Same app runs everywhere
- No “works on my machine” problem

# **☸️ 3. Git + Kubernetes Integration**

## **📖 What is Kubernetes?**

Kubernetes manages and deploys containers at scale.

## **🔄 Workflow:**

1.  Code pushed to GitHub
2.  CI builds Docker image
3.  CD updates Kubernetes deployment
4.  App is deployed to cluster

## **📂 Example Deployment YAML:**

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: my-app
spec:
replicas: 2
template:
spec:
containers:
- name: my-app
image: my-app:latest
```

## **⚙️ Deploy Command:**

``` bash
kubectl apply -f deployment.yaml
```

## **🧠 DevOps Insight:**

👉 Kubernetes handles:

- Scaling
- Load balancing
- Self-healing (auto restart)

# **☁️ 4. Git + AWS Integration**

## **📖 What is AWS?**

Amazon Web Services provides cloud infrastructure.

## **🔄 DevOps Pipeline on AWS:**

1.  Push code → GitHub
2.  CI/CD runs (GitHub Actions)
3.  Build Docker image
4.  Push to ECR
5.  Deploy to ECS / EKS / EC2

## **🔧 Common AWS Services:**

- ECR → Docker image registry
- ECS → Container service
- EKS → Kubernetes service
- EC2 → Virtual servers
- S3 → Storage

## **🧠 Real Flow:**

GitHub → CI/CD → Docker → ECR → ECS/EKS → Live App

# **⚙️ 5. Complete CI/CD Pipeline (REAL DEVOPS 🔥)**

## **📂 Full Example (Simplified GitHub Actions)**

    name: DevOps Pipeline
    on:
    push:
    branches: [main]
    jobs:
    build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker Image

run: docker build -t my-app .

``` yaml
- name: Run Tests
run: echo "Run tests here"
- name: Deploy
run: echo "Deploy to server"
```

# **🔁 6. Deployment Strategies (ADVANCED 🔥)**

## **🔵 Blue-Green Deployment**

- Two environments (blue & green)
- Switch traffic instantly

## **🟡 Canary Deployment**

- Release to small users first
- Monitor → then full release

## **🔁 Rolling Deployment**

- Gradual update (no downtime)

# **🔐 7. DevOps Security Integration**

## **🔑 Best Practices:**

- Store secrets in GitHub Secrets
- Use IAM roles (AWS)
- Avoid hardcoding credentials

## **⚠️ Example (GitHub Secret):**

env:

AWS_KEY: \${{ secrets.AWS_ACCESS_KEY }}

# **📊 8. Monitoring & Logging**

## **Tools:**

- AWS CloudWatch
- Prometheus
- Grafana

## **🧠 Why Important:**

👉 After deployment, you must:

- Monitor performance
- Detect errors
- Analyze logs

# **🔄 9. Real DevOps Workflow (END-TO-END 🔥)**

## **Step-by-Step:**

1.  Developer writes code
2.  Push to GitHub
3.  GitHub Actions triggered
4.  Run tests
5.  Build Docker image
6.  Push to registry
7.  Deploy via Kubernetes/AWS
8.  Monitor application

# **⚠️ 10. Common Real-World Mistakes**

❌ No CI/CD automation  
❌ Manual deployments  
❌ No rollback strategy  
❌ Poor branch strategy  
❌ Ignoring monitoring

# **🧾 11. Final Summary (VERY IMPORTANT)**

## **🔗 Full DevOps Stack:**

- Git → Version control
- GitHub → Code hosting
- GitHub Actions → CI/CD
- Docker → Packaging
- Kubernetes → Deployment
- Amazon Web Services → Infrastructure

## **🧠 Golden DevOps Principle:**

👉 **“Automate everything from commit to production”**

# **Daily Life Git & GitHub Cheat Sheet**

## **⚙️ 1. Setup (First time only)**

``` bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
```

👉 Example:

``` bash
git config --global user.name "Charlie DevOps"
git config --global user.email "charlie@gmail.com"
```

## **📦 2. Create / Clone Project**

``` bash
git init
```

👉 Create new repo locally

``` bash
git clone <repo-url>
```

👉 Download project from GitHub

## **📊 3. Check Status (MOST USED)**

``` bash
git status
```

👉 Example output:

- modified files
- untracked files
- staged files

## **➕ 4. Add Files (Staging)**

``` bash
git add file.txt
```

git add .

👉 Example:

``` bash
git add app.txt
```

## **💾 5. Commit Changes**

``` bash
git commit -m "message"
```

👉 Example:

``` bash
git commit -m "Add login feature"
```

## **📜 6. View History**

``` bash
git log --oneline
```

## **🌿 7. Branching (VERY IMPORTANT)**

``` bash
git branch
git branch feature-login
git checkout feature-login
```

Shortcut:

``` bash
git checkout -b feature-login
```

## **🔀 8. Merge Branch**

``` bash
git checkout main
git merge feature-login
```

## **🌐 9. GitHub Remote**

``` bash
git remote add origin <url>
git remote -v
```

## **🚀 10. Push to GitHub**

``` bash
git push -u origin main
git push
```

👉 Example:

``` bash
git push origin feature-login
```

## **📥 11. Pull Latest Code**

``` bash
git pull origin main
```

## **🔄 12. Fetch (Check updates only)**

``` bash
git fetch
```

## **🔥 13. Undo Mistakes**

``` bash
git restore file.txt
git reset file.txt
git revert HEAD
```

## **🧳 14. Stash Work (Temporary save)**

``` bash
git stash
git stash pop
```

## **🏷️ 15. Tags (Versioning)**

``` bash
git tag v1.0
git push origin v1.0
```

## **🧹 16. Cleanup**

``` bash
git clean -fd
```

# **🧪 PART 2: FULL PRACTICE LAB (REAL DEVOPS FLOW)**

## **🎯 Goal:**

We will simulate a real project:  
👉 Create project → branch → modify → commit → push → merge

# **🧱 STEP 1: Create Project**

``` bash
mkdir devops-lab
```

cd devops-lab

``` bash
git init
```

# **📄 STEP 2: Create File**

``` bash
echo "Hello DevOps" > app.txt
```

# **📊 STEP 3: Check Status**

``` bash
git status
```

# **➕ STEP 4: Stage File**

``` bash
git add app.txt
```

# **💾 STEP 5: Commit**

``` bash
git commit -m "Initial commit"
```

# **🌐 STEP 6: Connect GitHub**

``` bash
git remote add origin https://github.com/your-repo.git
```

# **🚀 STEP 7: Push to GitHub**

``` bash
git push -u origin main
```

# **🌿 STEP 8: Create Feature Branch**

``` bash
git checkout -b feature-login
```

# **✏️ STEP 9: Modify File**

``` bash
echo "Login feature added" >> app.txt
```

# **➕ STEP 10: Stage Changes**

git add .

# **💾 STEP 11: Commit Feature**

``` bash
git commit -m "Add login feature"
```

# **🚀 STEP 12: Push Branch**

``` bash
git push origin feature-login
```

# **🔀 STEP 13: Merge to Main**

``` bash
git checkout main
git merge feature-login
```

# **🚀 STEP 14: Push Final Code**

``` bash
git push origin main
```

# **🔍 STEP 15: Verify Everything**

``` bash
git log --oneline
git status
git show
```

# **🧠 PART 3: DAILY DEVOPS WORKFLOW (REAL LIFE)**

👉 Every day you will use:

``` bash
git pull
git checkout -b feature-x
```

git add .

``` bash
git commit -m "work done"
git push origin feature-x
```

# **⚡ PART 4: MOST IMPORTANT COMMANDS (MEMORIZE THIS)**

``` bash
git status
```

git add .

``` bash
git commit -m ""
git push
git pull
git checkout -b
git merge
git log --oneline
```

# **Git & GitHub Command Cheat Sheet** 

## **🔹 Verify Git** 

``` bash
git --version
```

## **🔹 Setup & Config**

**Set username & email**

``` bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

**Check config**

``` bash
git config --list
```

## **🔹 staging/ready state check** 

## **🔍 1. Check commit is created (local history)**

``` bash
git log --oneline
```

👉 Shows your latest commit  
👉 Confirms your changes are saved locally

## **📂 2. Verify what is inside the last commit**

``` bash
git show
```

OR specific commit:

``` bash
git show <commit-id>
```

👉 Shows:

- files changed
- lines added/removed
- full patch (diff)

## **🚪 To come out of** `git show`

Just press:

q

👉 That means **quit**

## **⚡ Extra useful pager controls (DevOps handy)**

Inside `git show`:

| **Action**  | **Key**        |
|-------------|----------------|
| Exit        | `q`            |
| Scroll down | `↓` or `Enter` |
| Scroll up   | `↑`            |
| Page down   | `Space`        |
| Page up     | `b`            |

## **🧠 Simple understanding**

- `git show` opens output in a **viewer (pager)**
- It does NOT crash or hang
- You just need to **quit the viewer**

## **🔎 3. Compare last commit with working directory**

``` bash
git diff HEAD
```

👉 Shows any **new changes after commit (if any)  
** 👉 Should usually return empty if everything is committed

## **📊 4. Check what files are in last commit only**

``` bash
git show --name-only
```

👉 Lists only file names changed in commit

## **🧠 5. Verify staged vs committed (safety check)**

``` bash
git status
```

👉 Should show:

nothing to commit, working tree clean

✔ This confirms:

- commit is done
- nothing pending before push

## **🚀 6. Final check before push (most important combo)**

``` bash
git log --oneline -n 1
git show --stat
git status
```

👉 This gives full confirmation:

- latest commit exists
- files included are correct
- no leftover changes

## **⚡ DevOps mindset (simple rule)**

✔ `git status` → nothing pending  
✔ `git log` → commit exists  
✔ `git show` → verify content

## **🔹 Repository Commands**

**Initialize repo**

``` bash
git init
```

**Clone repo**

``` bash
git clone <repo-url>
git clone <repo-url> myfolder
```

## **🔹 Status & Tracking**

**Check status**

``` bash
git status
git status -s
```

## **🔹 Add & Commit**

**Stage files**

``` bash
git add file.txt
```

git add .

``` bash
git add -A
```

**Commit changes**

``` bash
git commit -m "message"
git commit -a -m "message"
```

**Amend last commit**

``` bash
git commit --amend -m "new message"
```

## **🔹 Logs & History**

``` bash
git log
git log --oneline
git log --graph
```

## **🔹 Branching (VERY IMPORTANT)**

**Create branch**

``` bash
git branch feature
```

**List branches**

``` bash
git branch
git branch -a
```

**Switch branch**

``` bash
git checkout feature
```

**Create + switch**

``` bash
git checkout -b feature
```

**Delete branch**

``` bash
git branch -d feature
```

## **🔹 Merge & Rebase**

**Merge branch**

``` bash
git checkout main
git merge feature
```

**Rebase**

``` bash
git rebase main
```

## **🔹 Remote (GitHub)**

**Add remote**

``` bash
git remote add origin <url>
```

**View remote**

``` bash
git remote -v
```

**Remove remote**

``` bash
git remote remove origin
```

## **🔹 Push & Pull**

**First push**

``` bash
git push -u origin main
```

**Push changes**

``` bash
git push
git push origin main
```

**Pull changes**

``` bash
git pull
git pull origin main
```

**Fetch only**

``` bash
git fetch
```

## **🔹 Working with Branches (GitHub)**

**Push new branch**

``` bash
git push origin feature
```

**Pull specific branch**

``` bash
git pull origin feature
```

## **🔹 Undo & Recovery**

**Revert (safe)**

``` bash
git revert HEAD
```

**Reset (dangerous)**

``` bash
git reset --hard HEAD~1
```

**Unstage file**

``` bash
git reset file.txt
```

## **🔹 Stash (Temporary Save)**

``` bash
git stash
git stash list
git stash pop
```

## **🔹 Tags (Versioning)**

``` bash
git tag v1.0
git push origin v1.0
```

## **🔹 .gitignore**

👉 Ignore files  
Example:

node_modules

.env

\*.log

## **🔹 SSH Setup (Important for DevOps)**

    ssh-keygen -t rsa -b 4096

## **🔹 Cleanup**

``` bash
git clean -fd
```

# **⚡ Real DevOps Workflow**

``` bash
git checkout -b feature-login
```

git add .

``` bash
git commit -m "Add login feature"
git push origin feature-login
```

👉 Then create Pull Request on GitHub

# **🎯 Most Important Commands**

If asked:

👉 “Top Git commands?”

Answer:

- git init
- git clone
- git add
- git commit
- git push
- git pull
- git branch
- git checkout

### **⚡ Git & Github Commands**

### **1. Basic Git Commands (For managing repositories)**

- git init : Initializes a new Git repository in the current directory.
- git clone \<repo_url\> : Clones a repository from a remote URL to your local machine.
- git status : Shows the working directory status (which files are modified, staged, etc.).
- git add : Stages a file or files to be committed.
- git commit -m "message" : Commits staged changes to the local repository with a message.
- git push : Pushes committed changes to the remote repository.
- git pull : Fetches and merges changes from the remote repository to your local working directory.
- git fetch : Downloads objects and refs from another repository (without merging).
- git merge : Merges changes from the specified branch into the current branch.
- git log : Shows the commit history of the repository.
- git diff : Shows the differences between your working directory and the index (staged changes).

### **2. Branching Commands (Managing branches)**

- git branch : Lists all branches in your repository.
- git branch \<branch_name\> : Creates a new branch.
- git checkout \<branch_name\> : Switches to an existing branch.
- git checkout -b \<branch_name\> : Creates and switches to a new branch in one step.
- git merge \<branch_name\> : Merges changes from the specified branch into the current branch.
- git rebase \<branch_name\> : Applies changes from one branch onto another branch (instead of merging).
- git branch -d \<branch_name\> : Deletes the specified branch (locally).
- git branch -D \<branch_name\> : Forcefully deletes a branch (locally).
- git remote set-head origin \<branch_name\> : Sets the default branch for the remote repository.

### **3. Remote Commands (Managing remotes and syncing with the cloud)**

- git remote -v : Shows the remote repository URLs.
- git remote add : Adds a new remote repository.
- git remote remove : Removes a remote repository.
- git push origin \<branch_name\> : Pushes a branch to a remote repository.
- git push -u origin \<branch_name\> : Pushes a branch to a remote repository and sets the upstream for the branch.
- git pull origin \<branch_name\> : Fetches and merges a branch from the remote repository.
- git fetch origin : Downloads objects and refs from the remote repository.
- git remote show origin : Displays detailed information about a remote repository.

### **4. Staging and Committing (Managing changes)**

- git add . : Stages all modified files in the working directory.
- git add -A : Stages all modified files (including file deletions).
- git reset : Unstages a file (reverts it to the working directory).
- git commit --amend : Modifies the last commit (can change the commit message or add changes).
- git commit --all : Automatically stages tracked files and commits them.
- git commit -a : Stages and commits all modified files.
- git commit --no-verify : Skips pre-commit hooks while committing.
- git reset --soft HEAD~1 : Moves the HEAD pointer back one commit but leaves your changes staged.
- git reset --hard HEAD~1 : Moves the HEAD pointer back one commit and discards changes in the working directory.

### **5. Viewing and Comparing Changes (Inspecting changes)**

- git diff : Shows changes between your working directory and the index (unstaged changes).
- git diff --staged : Shows changes between the index (staged files) and the last commit.
- git diff \<commit_id\> : Shows the differences between your working directory and a specific commit.
- git log : Displays the commit history.
- git log --oneline : Displays the commit history in a simplified one-line format.
- git log --graph : Displays the commit history as a graph.
- git log --author="name" : Filters commits by a specific author.
- git log --since="2 weeks ago" : Filters commits made after a specific date.
- git blame : Shows line-by-line annotations for a file, telling who last modified each line.
- git show \<commit_id\> : Shows details of a specific commit (including diff and metadata).
- git show \<commit_id\>:\<file_path\> : Shows a specific file at a particular commit.

### **6. Reverting and Resetting (Undoing changes)**

- git reset \<commit_id\> : Moves HEAD to a specific commit, leaving your working directory intact (can be used with --soft, --mixed, or --hard).
- git reset --hard \<commit_id\> : Resets your working directory, index, and HEAD to a specific commit (all changes will be lost).
- git reset --soft \<commit_id\> : Resets only the HEAD to a specific commit, leaving staged changes.
- git reset --mixed \<commit_id\> : Resets the HEAD and index to a specific commit but keeps the working directory unchanged.
- git revert \<commit_id\> : Creates a new commit that undoes the changes of the specified commit.
- git restore : Restores the file(s) in the working directory from the index or a commit.
- git restore --staged : Removes a file from the staging area.
- git clean -f : Removes untracked files in the working directory.
- git clean -fd : Removes untracked files and directories.

### **7. Stashing (Temporarily saving changes)**

- git stash : Stashes the changes in your working directory (both staged and unstaged).
- git stash list : Lists all the stashes.
- git stash pop : Applies the latest stash and removes it from the stash list.
- git stash apply : Applies a stash without removing it from the list.
- git stash drop : Removes a specific stash from the stash list.
- git stash clear : Clears all stashes.
- git stash save "message" : Stashes changes with an optional message for identification.
- git stash branch \<branch_name\> : Creates a new branch from the stash and applies it.

### **8. Tags (Managing versions)**

- git tag : Lists all tags in the repository.
- git tag \<tag_name\> : Creates a new tag at the current commit.
- git tag -a \<tag_name\> -m "message" : Creates an annotated tag with a message.
- git tag -d \<tag_name\> : Deletes a tag locally.
- git push origin \<tag_name\> : Pushes a specific tag to the remote repository.
- git push origin --tags : Pushes all tags to the remote repository.
- git fetch --tags : Fetches all tags from the remote repository.

### **9. Git Config and Info (Configuration and repository information)**

- git config --global user.name "Your Name" : Sets your global username for commits.
- git config --global user.email "youremail@example.com" : Sets your global email for commits.
- git config --list : Lists all configuration settings.
- git config : Sets a specific configuration option.
- git config --global core.editor : Sets the default text editor for Git.
- git config --global color.ui true : Enables colored output in Git.
- git config --global alias.st status : Creates a custom Git alias (e.g., git st for git status).

### **10. Git Aliases (Custom commands)**

- git config --global alias.\<alias_name\> \<actual_command\> : Creates a new Git alias for an existing command. **Example:** git config --global alias.co checkout

### **11. Git Hooks (Automated scripts triggered by Git actions)**

- git init : Creates a .git/hooks directory, where hook scripts are stored.
- git commit-msg : A hook that runs before a commit message is saved.
- git pre-commit : A hook that runs before a commit is made (can be used for checks like linting).
- git post-commit : A hook that runs after a commit is made.

### **12. Git Submodules (Managing external repositories within a project)**

- git submodule add \<repo_url\> : Adds a new submodule to the repository.
- git submodule init : Initializes the submodules configured in the repository.
- git submodule update : Updates the submodules to the commit specified in the superproject.
- git submodule status : Displays the current commit of the submodule.
- git submodule deinit : Removes a submodule from the working directory.
- git submodule update --remote : Updates the submodule to the latest commit from the remote repository.
- git submodule foreach : Runs a command in each submodule.

### **13. Git Workflow Commands (Working with others and managing collaboration)**

- git pull --rebase : Fetches and applies remote changes, rebasing your local commits on top of them.
- git rebase -i \<commit_id\> : Starts an interactive rebase to modify commit history (e.g., squash, reword commits).
- git rebase --continue : Continues the rebase after resolving conflicts.
- git rebase --abort : Aborts the rebase process and restores the original state.
- git merge --no-ff : Merges a branch with a "no fast-forward" option.
- git pull --no-commit : Pulls changes but doesn't automatically commit them.
- git push --force-with-lease : Forces push but checks if the remote branch has been updated (safer than --force).
- git push --force : Forces a push to the remote branch.
- git cherry-pick \<commit_id\> : Applies the changes from a specific commit onto the current branch.

### **14. Git Merge Strategies (Handling merge conflicts and strategies)**

- git merge --strategy=ours \<branch_name\> : Resolves merge conflicts by favoring the current branch’s changes.
- git merge --strategy=theirs \<branch_name\> : Resolves merge conflicts by favoring the other branch’s changes.
- git merge --abort : Aborts the merge process if there are conflicts and restores the working directory.

### **15. Git bisect (Finding the commit that introduced a bug)**

- git bisect start : Starts a binary search for the commit that introduced a bug.
- git bisect bad : Marks the current commit as "bad".
- git bisect good \<commit_id\> : Marks a commit as "good".
- git bisect reset : Ends the bisect process and restores the repository.
- git bisect log : Displays the log of the bisect process.

### **16. Git Hooks for Automation (Pre-commit and post-commit hooks)**

- git commit-msg : Hook that runs before the commit message is finalized.
- git pre-commit : Hook that runs checks on files before commit (linters, tests, etc.).
- git post-commit : Hook triggered after a commit is completed.
- git pre-push : Hook that runs before a push to the remote repository.
- git post-merge : Hook that runs after a merge.

### **17. Git Clean and Prune (Cleaning up untracked files and garbage collection)**

- git clean -n : Shows which untracked files would be removed (dry run).
- git clean -f : Removes untracked files from the working directory.
- git clean -fd : Removes untracked files and directories.
- git gc : Runs garbage collection.
- git prune : Removes objects that are no longer needed.

### **18. Git Archive (Creating a snapshot of the repository)**

- git archive --format=tar --output=\<output_file\>.tar \<branch_name\> : Creates a tarball archive.
- git archive --format=zip --output=\<output_file\>.zip \<branch_name\> : Creates a zip archive.

### **19. Git Blame and Annotate (Tracing the history of file content)**

- git blame \<file_path\> : Shows who last modified each line of a file and when.
- git annotate \<file_path\> : Alias for git blame.

### **20. Git Reflog (Tracking changes in the HEAD reference)**

- git reflog : Displays a log of all movements of the HEAD pointer.
- git reflog show : Displays a detailed view of HEAD and the state of the repository.
- git reflog expire --expire=now --all : Removes all reflog entries that have expired.
- git reflog delete \<ref_id\> : Deletes a specific reflog entry.

### **Git for DevOps**

#### **1. Git for Continuous Integration/Continuous Deployment (CI/CD)**

- git fetch --all : Fetches all branches from all remotes, often used before triggering a build or deployment in a CI/CD pipeline.
- git merge origin/ : Merges the latest changes from a remote branch into the local branch to ensure that the CI/CD pipeline tests the most up-to-date version.
- git push --force-with-lease : When integrated with CI/CD, this command can be used to push changes forcefully while ensuring that the remote branch hasn’t changed unexpectedly (prevents accidental overwrites in collaborative environments).
- git rebase origin/ : Rebasing is often part of CI/CD to ensure your branch is up to date with the base branch before merging or deploying.
- git tag \<version_number\> : Tagging is essential in DevOps for versioning releases, allowing the CI/CD system to deploy specific versions of the code (e.g., for staging or production).

#### **2. Git for Managing Infrastructure as Code (IaC)**

DevOps teams often use Git to store Infrastructure as Code (e.g., Terraform, Ansible, etc.). Here’s how Git commands come into play:

- git clone \<IaC_repo_url\> : Clone repositories that contain configuration files or infrastructure code.
- git checkout : Switch to a branch that contains a specific environment’s infrastructure code (e.g., production, staging).
- git pull origin \<branch_name\> : Pull the latest changes to infrastructure code before applying configurations or deploying.
- git submodule : Git submodules are commonly used to manage shared code or dependencies across multiple infrastructure repositories.

#### **3. Git Hooks for DevOps Automation**

Git hooks can be a key part of automating tasks within the DevOps pipeline, such as checking code quality or triggering build/deployment processes.

- git pre-commit : Automatically run tests or linters on code before it’s committed. This can ensure that the code meets quality standards before being pushed to the repository.
- git post-merge : Automatically trigger deployment processes or run tests after a merge happens, ensuring that the newly merged code is stable.
- git pre-push : Can be used to run a script to test whether the pushed code will break something in production, such as triggering a CI pipeline that runs integration tests before pushing to a remote.
- git commit-msg : Enforce commit message conventions, often integrated into CI/CD pipelines to ensure semantic versioning or the correct Jira ticket references in commit messages.

#### **4. Git for Feature Flag Management**

DevOps teams use feature flags to control feature deployment. Git plays an important role in this workflow by helping track which features are being developed and merged.

- git branch \<feature_flag_name\> : Create a branch dedicated to developing a specific feature, often linked to a feature flag.
- git checkout -b \<feature_flag_branch\> : Create a new branch to work on a feature behind a feature flag. The flag can be turned on/off in the code depending on the deployment environment.
- git merge \<feature_flag_branch\> : Merge a completed feature flag branch into the main codebase, which can be toggled on or off during deployment via configuration.

#### **5. Git for Multi-Environment Deployments**

Git repositories often contain multiple branches corresponding to different environments (e.g., development, staging, production). Here’s how Git fits in with deploying to multiple environments:

- git checkout \<environment_branch\> : Switch to the branch corresponding to the environment you are deploying to.
- git pull origin \<environment_branch\> : Make sure your local branch is up to date with the latest code before deploying to a specific environment.
- git merge --no-ff \<feature_branch\> : Merge feature branches into specific environment branches with a merge commit to preserve the history.
- git tag \<release_version\> : Tag releases when promoting code to staging or production environments. Versioning tags allow for consistent, repeatable deployments across environments.

#### **6. Git and Deployment Automation**

In DevOps, deployment automation is often triggered directly from Git repositories. Some examples:

- git push origin : This triggers CI/CD pipelines that automatically deploy code to specific environments.
- git tag : Trigger specific deployment pipelines (e.g., deploy-prod, deploy-staging) to automatically deploy code to staging or production when a tag is created.
- git reset --hard : In deployment automation scenarios, this command is used to reset the working directory to a known state (e.g., the latest production commit) before deploying.

#### **7. GitOps Workflow**

GitOps is an approach to Continuous Deployment where Git repositories are the source of truth for infrastructure and application configuration.

- git push : In GitOps, pushing changes to a Git repository automatically triggers deployment pipelines. For instance, when code or configuration files are pushed to Git, the repository can trigger an automation system (like ArgoCD or Flux) to apply those changes to a Kubernetes cluster or other environments.
- git clone \<repo_url\> : Developers clone GitOps repositories to inspect or modify deployment configurations stored as code.

#### **8. Advanced Git for Managing CI/CD Pipelines**

Many CI/CD systems, such as Jenkins, GitLab CI, and CircleCI, integrate directly with Git to trigger build and deployment pipelines. Some useful Git-related practices:

- git push --tags : Trigger a CI/CD pipeline that specifically looks for tags to start a deployment (e.g., deploying to production when a v1.0.0 tag is created).
- git fetch --tags : Use this command in CI/CD pipelines to fetch the latest tags and ensure the correct version of the code is deployed.
- git log --oneline --graph : Useful in CI/CD pipeline scripts to visualize or check commit histories during pipeline execution, helping to verify which changes are deployed to which environments.
- git diff \<commit_id\> \<commit_id\> : In CI/CD, you might want to see the changes between commits to decide whether a particular build should be triggered (e.g., when testing, you might only want to run tests for certain changed files).

#### **9. Git and Docker Integration**

In DevOps, Git is frequently used alongside Docker for containerized applications. Here’s how Git plays a role in the Docker workflow:

- git clone \<repo_url\> : Clone a repository that contains a Dockerfile and application code, which you can then use to build Docker images.
- git checkout : Switch to a branch where different Docker images or container configurations might be defined.
- git pull origin \<branch_name\> : Pull the latest code from the branch and rebuild Docker images to include the latest changes.
- git tag : Use Git tags to tag a version of the Docker image (e.g., v1.0.0), which can then be used for tagging Docker images when pushed to a container registry.

#### **10. Git and Secrets Management**

DevOps teams often use Git to manage code along with secret management tools for deployment, often using .gitignore to keep sensitive files like secrets out of version control.

- git rm --cached : Remove a file from version control, useful if secrets were accidentally committed.
- git commit --amend : If secrets were committed accidentally, this can be used to amend the last commit and remove them from history.
- git rebase -i : Used to rewrite history if secrets were committed in previous commits, ensuring that sensitive information is completely removed from Git history.

#### **11. Git Rebase and Interactive Rebase (Managing commit history)**

Rebase is essential in DevOps to clean up commit history before merging feature branches into the main branch, especially when maintaining a clean and linear Git history for CI/CD pipelines.

- git rebase -i \<commit_id\> : Starts an interactive rebase, allowing you to reorder, squash, or amend commits in a branch.
- git rebase --onto : Used to rebase a branch onto a new base commit. Useful when moving a feature branch or integrating changes that originated from a different base.
- git rebase --skip : Skips the current commit while rebasing, useful if there’s a conflict or you don’t want to include a specific commit in the rebase.
- git rebase --continue : Continues the rebase process after resolving any conflicts.

#### **12. Git Merge Conflict Resolution (Handling merge issues)**

Merge conflicts are common when multiple developers work on the same files or parts of the code. Git provides tools for resolving conflicts efficiently.

- git mergetool : Opens an external merge tool to help resolve conflicts. Can be configured to use tools like vimdiff, meld, kdiff3, etc.
- git merge --abort : Aborts the merge process if conflicts occur and restores the state before the merge.
- git diff \<branch_1\> \<branch_2\> : Shows the differences between two branches to help you identify and resolve conflicts before merging.
- git status : Shows which files are in conflict and need to be resolved manually.

#### **13. Git Commit Signing (Ensuring commit authenticity)**

In DevOps, ensuring the authenticity of code changes and that commits are made by authorized developers is important. Git supports signing commits and tags using GPG keys.

- git config --global user.signingkey \<key_id\> : Configures the GPG key to sign commits and tags.
- git commit --gpg-sign : Signs a commit with your GPG key.
- git tag -s \<tag_name\> : Creates a signed tag (useful for marking important release points).
- git log --show-signature : Displays the GPG signature of commits in the log to verify their authenticity.

#### **14. Git for Continuous Delivery (Automated release management)**

In DevOps, Git repositories are frequently tied to automated release pipelines. Here are a few practices related to release management.

- git push --tags : Pushes tags to the remote repository, triggering deployment processes in CI/CD pipelines. For example, pushing a release tag like v1.0.0 might trigger deployment to production.
- git push origin \<branch_name\>:\<remote_branch\> : Pushes a local branch to a remote branch, ensuring that your changes are reflected in the remote environment. Often used in CI/CD to sync code with the cloud.
- git branch -m \<old_name\> \<new_name\> : Renames a branch, which can be useful in DevOps workflows when a feature is moved to a new stage (e.g., from feature-xyz to staging).
- git merge --no-ff \<branch_name\> : Forces Git to always create a merge commit, even if it could be a fast-forward merge. This is useful for preserving the context of feature branches in release management.

#### **15. Git for Rollbacks (Reverting to previous versions)**

In DevOps, the ability to quickly roll back code changes to a stable state is critical, especially in production environments.

- git revert \<commit_id\> : Reverts the changes from a specific commit by creating a new commit that undoes the changes. This is often used when a production deployment causes issues.
- git reset --hard \<commit_id\> : Resets the repository to a previous commit and discards changes in the working directory. This can be used to roll back to a stable state.
- git log --oneline : Use this command to find the commit hash for the state you want to roll back to.
- git checkout \<commit_id\> : Checks out an older commit, allowing you to inspect the repository at that point in time or even deploy an older version of the app.

#### **16. Git Submodules and Subtrees (Managing dependencies and libraries)**

Git submodules and subtrees are used in DevOps to manage dependencies or external libraries in your repository.

- git submodule update --recursive : Updates all submodules, ensuring that all dependencies are in sync.
- git submodule init : Initializes submodules after cloning a repository that contains them.
- git submodule add \<repo_url\> : Adds a submodule to your repository. Submodules allow you to manage external dependencies as part of your Git repository.
- git subtree add --prefix=\<repo_url\> \<branch_name\> : Allows you to integrate an external repository into a subdirectory within your repository, useful when managing code that needs to be bundled with your application.

#### **17. Git for Team Collaboration and Code Review (Facilitating teamwork)**

Git plays a crucial role in facilitating collaboration between DevOps teams, particularly for code reviews, pull requests, and continuous integration.

- git push origin \<feature_branch\> : Pushes a feature branch to a remote, which can be used in collaboration tools (e.g., GitHub, GitLab, Bitbucket) for code review and pull requests.
- git fetch origin \<feature_branch\> : Fetches a feature branch from a remote repository so that team members can review it or test it locally.
- git pull origin \<feature_branch\> : Pulls the latest changes from a feature branch into your local repository, often used when testing code changes before merging.
- git diff \<branch_name\> : Compare different branches (e.g., comparing feature-xyz with main branch) before merging them.

#### **18. Git and Containerized Environments (Kubernetes, Docker) (Managing deployments in containers)**

In DevOps environments, Git is frequently used to manage the source code for applications that run in containers. Git commands can facilitate container image builds and deployment pipelines.

- git clone \<repo_url\> : Clones a repository containing code and configurations for building Docker containers or Kubernetes manifests.
- git checkout : Switches between branches to test different versions of a Dockerized application or configuration files.
- git pull origin \<branch_name\> : Pull the latest code from a Git repository before rebuilding Docker images or Kubernetes configurations.
- git tag : Tags releases to facilitate versioning of Docker images or Kubernetes deployments. For example, pushing a tag v1.0.0 may automatically trigger a CI/CD pipeline that builds and deploys a Docker image.
- git submodule add \<repo_url\> : Can be used to add a Git repository as a submodule, allowing you to include external configuration files, such as Dockerfiles or Helm charts, in your repository.

#### **19. Git for Managing Build and Deployment Pipelines**

Git is tightly integrated with CI/CD systems, where it triggers build and deployment processes based on repository changes. Here are key Git commands related to build automation:

- git push origin : Pushes your branch to the remote repository, triggering the build process in your CI/CD tool.
- git tag \<build_version\> : Tags a commit with a version number, which might trigger deployment pipelines for testing or production.
- git log --oneline : View a condensed log of the commit history to identify the changes associated with a specific build or deployment.
- git push --force-with-lease : Pushes changes to a branch with a safer force push, useful when you need to overwrite history in collaborative CI/CD workflows but without overwriting someone else’s work.

#### **20. Git for Documentation and Versioning (Managing configuration files and documentation)**

For DevOps, Git repositories are often used to version configuration files, scripts, and documentation.

- git add : Add configuration or documentation files to the repository for versioning.
- git commit -m "add/update documentation" : Commit changes related to documentation, often used in documentation-driven development.
- git diff : Compare different versions of documentation files or configuration files, useful when tracking changes in infrastructure or environment files.

# **GitHub Actions - Advanced Concepts**

# **1. What is GitHub Actions?**

GitHub Actions is GitHub's CI/CD (Continuous Integration and Continuous Deployment/Delivery) platform that automates software development workflows directly inside a GitHub repository.

It allows developers to:

- Build applications
- Run automated tests
- Perform code quality checks
- Deploy applications
- Automate infrastructure
- Schedule repetitive tasks
- Create custom DevOps pipelines

# **2. GitHub as a Version Control System (VCS)**

GitHub is a cloud-based Version Control System (VCS) built on Git.

It helps teams:

- Track source code changes
- Collaborate with multiple developers
- Maintain project history
- Manage branches
- Review Pull Requests
- Automate software delivery using GitHub Actions

# **3. Artifact Repository**

An artifact is a file generated during the build process that can be stored and reused.

Common artifacts include:

- JAR files
- WAR files
- ZIP packages
- TAR files
- Docker Images
- Helm Charts
- Terraform Plans
- Binary Executables
- Test Reports
- Code Coverage Reports

Artifacts are typically uploaded after the build stage and downloaded during deployment.

Example:

Java Project

    Source Code
    ↓
    Build
    ↓
    app.jar
    ↓
    Upload Artifact
    ↓
    Deploy

# **4. GitHub Actions Workflow Components**

Every GitHub Actions workflow is made up of several core components.

## **Workflow**

A workflow is an automated process that executes one or more jobs.

Workflows are written in YAML format.

Location:

.github/workflows/

Example:

.github/workflows/build.yml

## **Events**

An event is an activity that triggers a workflow.

Common events include:

- push
- pull_request
- workflow_dispatch
- schedule
- release
- create
- delete
- issues
- issue_comment
- fork
- watch
- repository_dispatch

Example:

    on:
    push:
    branches:

\- main

## **Jobs**

A job is a collection of steps executed on the same runner.

Characteristics

- Runs sequentially
- Executes on one runner
- Can run in parallel with other jobs
- Can depend on another job using `needs`

Example

Build Job

    Checkout
    ↓
    Install Dependencies
    ↓
    Compile
    ↓
    Run Tests
    ↓
    Upload Artifact

## **Steps**

A job consists of multiple steps.

Each step can:

- Execute shell commands
- Run scripts
- Execute GitHub Actions
- Install software

Example

steps:

\- Checkout code

\- Setup Java

\- Run Maven

\- Upload Artifact

## **Actions**

An Action is a reusable application that performs a specific task.

Instead of writing repetitive code, you can use pre-built actions.

Examples

- actions/checkout
- actions/setup-node
- actions/setup-python
- actions/cache
- actions/upload-artifact
- docker/build-push-action
- aws-actions/configure-aws-credentials

Benefits

- Less YAML code
- Reusable
- Community maintained
- Faster workflow development

## **Runners**

A Runner is the machine that executes workflow jobs.

Each runner executes one job at a time.

Types

- GitHub-hosted Runner
- Self-hosted Runner

# **5. Workflow File Structure**

A workflow is written in YAML.

Main sections include:

name

on

permissions

    env

defaults

    jobs

steps

uses

run

if

needs

strategy

matrix

timeout-minutes

concurrency

outputs

# **6. Workflow Events**

Frequently used triggers

push

pull_request

workflow_dispatch

schedule

release

workflow_call

repository_dispatch

workflow_run

create

delete

issues

issue_comment

pull_request_target

# **7. Variables in GitHub Actions**

Variables allow workflows to become reusable and configurable.

## **Workflow Variables**

Defined using:

env:

Scope

### **Entire Workflow**

env:

APP_NAME: myapp

### **Job Level**

    jobs:
    build:
    env:

JAVA_VERSION: 21

### **Step Level**

    steps:
    - name: Test
    env:

ENVIRONMENT: DEV

# **8. Configuration Variables**

Configuration variables can be shared across multiple workflows.

They can be created at:

- Organization Level
- Repository Level
- Environment Level

Advantages

- Centralized configuration
- Easier maintenance
- Reusable across workflows

# **9. GitHub Context Variables**

Contexts provide information about workflow execution.

Common contexts

github

    env

vars

runner

job

steps

matrix

strategy

inputs

secrets

needs

Example

\${{ github.repository }}

\${{ github.actor }}

\${{ github.ref }}

\${{ github.sha }}

# **10. Secrets**

Secrets securely store sensitive information.

Examples

- AWS Keys
- Azure Credentials
- Docker Password
- Database Password
- API Keys
- Tokens

Access

\${{ secrets.AWS_ACCESS_KEY_ID }}

Never hardcode secrets inside workflows.

# **11. Workflow Inputs**

Manual workflows use:

workflow_dispatch

Example inputs

Environment

Version

Region

Application Name

Useful for manual deployments.

# **12. GitHub-hosted Runners**

GitHub provides managed virtual machines.

Operating Systems

- Ubuntu
- Windows
- macOS

Advantages

- Zero maintenance
- Fresh VM for every job
- Automatic updates
- Pre-installed tools
- Easy setup
- Managed by GitHub

Limitations

- Limited customization
- Usage minutes depend on your GitHub plan

# **13. Self-hosted Runners**

A self-hosted runner is your own machine registered with GitHub.

Possible hosts

- Physical Server
- Virtual Machine
- EC2 Instance
- Kubernetes Pod
- Docker Container
- Raspberry Pi

Advantages

- Full control
- Custom software
- Faster builds
- Internal network access
- Unlimited customization

Disadvantages

- You manage updates
- Security responsibility
- Hardware cost
- Monitoring responsibility

# **14. GitHub-hosted Runner Limits**

Current commonly documented limits include:

- Job execution time: **6 hours per job**
- Workflow run time: **35 days**
- API requests: **1,000 requests/hour** (repository-wide for Actions)
- Concurrent jobs depend on your GitHub plan
- Matrix jobs: **Maximum 256 jobs per workflow**

# **15. Self-hosted Runner Limits**

Important limits include:

- Job execution time: **5 days**
- Workflow run time: **35 days**
- Queue timeout: **24 hours**
- API requests: **1,000 requests/hour**
- Matrix jobs: **256**
- Workflow queue burst limits
- Maximum runner registration limits (subject to GitHub plan and documented limits)

# **16. GitHub Plan Concurrency (Example)**

| **Plan**   | **Concurrent Jobs** | **macOS Jobs** |
|------------|---------------------|----------------|
| Free       | 20                  | 5              |
| Pro        | 40                  | 5              |
| Team       | 60                  | 5              |
| Enterprise | 500                 | 50             |

# **17. Matrix Strategy**

A matrix strategy runs the same job with different configurations.

Example

Node.js

18

20

    22
    ↓
    Three parallel jobs

Useful for:

- Multi-version testing
- Multi-platform builds
- Cross-browser testing

# **18. Reusable Workflows**

Reusable workflows reduce duplication.

Created using

workflow_call

Can be reused when:

- Same repository
- Public repository
- Approved private repository

Benefits

- DRY (Don't Repeat Yourself)
- Easier maintenance
- Standardized pipelines

# **19. Composite Actions**

Composite Actions package multiple workflow steps into a single reusable action.

Benefits

- Share common logic
- Reduce duplication
- Easier maintenance

Unlike reusable workflows, composite actions run as part of a single job.

# **20. Starter Workflows**

Starter Workflows are GitHub-provided workflow templates.

GitHub automatically recommends templates based on your project language.

Examples

- Node.js
- Java
- Python
- Go
- .NET
- Docker
- Terraform
- Azure
- AWS
- Kubernetes

# **21. Dependency Caching**

Caching speeds up workflows.

Common cache targets

- npm
- Maven
- Gradle
- pip
- Composer
- Terraform Plugins

Uses

actions/cache

Benefits

- Faster builds
- Lower download time
- Reduced network usage

# **22. Artifacts**

Artifacts allow sharing files between jobs.

Common uploads

- Build Packages
- Logs
- Reports
- Test Results
- Coverage Reports

Uses

upload-artifact

download-artifact

# **23. Environment Protection Rules**

GitHub Environments support:

- Required approvals
- Deployment branches
- Environment secrets
- Deployment history
- Wait timers

Useful for Production deployments.

# **24. OpenID Connect (OIDC)**

OIDC enables secure authentication from GitHub Actions to cloud providers without storing long-lived credentials.

Supported providers include:

- AWS
- Azure
- Google Cloud

Benefits

- No long-lived access keys
- Temporary credentials
- Improved security
- Recommended best practice for cloud deployments

# **25. Concurrency Control**

Prevent multiple workflow runs from executing simultaneously.

Example use cases:

- Only one production deployment at a time
- Cancel outdated builds
- Prevent deployment conflicts

Uses the `concurrency` keyword.

# **26. Conditional Execution**

Run jobs or steps only when conditions are met.

Examples

- Branch name
- Tag
- Event type
- Success/Failure
- Pull Request

Uses

if:

# **27. Expressions**

GitHub expressions evaluate conditions and variables.

Example

\${{ github.ref }}

\${{ success() }}

\${{ failure() }}

\${{ always() }}

# **28. Service Containers**

Run databases or supporting services during workflow execution.

Examples

- MySQL
- PostgreSQL
- Redis
- MongoDB
- RabbitMQ

Useful for integration testing.

# **29. GitHub Actions Security Best Practices**

- Use OIDC instead of long-lived cloud credentials.
- Store sensitive values in **GitHub Secrets**.
- Grant the **least privilege** required using the `permissions` key.
- Pin third-party actions to a specific version or commit SHA.
- Protect production environments with required reviewers.
- Scan dependencies using **GitHub Dependabot** and **CodeQL**.
- Avoid printing secrets in workflow logs.
- Regularly update actions and runner software.

# **30. GitHub Actions Best Practices**

- Keep workflows modular.
- Use reusable workflows and composite actions.
- Cache dependencies to improve performance.
- Use artifacts instead of rebuilding outputs.
- Use matrices for multi-version testing.
- Separate build, test, and deploy jobs.
- Store configuration in variables and secrets.
- Use descriptive workflow and job names.
- Protect production deployments with environments and approvals.
- Monitor workflow runs and optimize execution time.

## **Additional Advanced Topics to Learn**

To become proficient in GitHub Actions, also study these topics:

1.  Workflow syntax (YAML)
2.  Expressions and functions
3.  `needs` and job dependencies
4.  Job outputs and workflow outputs
5.  Composite Actions
6.  JavaScript and Docker Actions
7.  Reusable Workflows (`workflow_call`)
8.  Matrix Strategy
9.  Dependency Caching
10. Concurrency
11. Environments and deployment protection
12. Secrets, Variables, and Contexts
13. OIDC authentication with AWS/Azure/GCP
14. Artifact management
15. Service containers
16. Self-hosted runners with Docker and Kubernetes
17. GitHub API and `gh` CLI integration
18. Release automation and semantic versioning
19. Security scanning (CodeQL, Dependabot, secret scanning)
20. Performance optimization and workflow debugging

This structure covers the core and advanced GitHub Actions concepts expected in professional DevOps and Cloud Engineer roles, while correcting terminology, organizing the content logically, and including several important topics that were missing from your original notes.
