# Day 23 — Git Branching, Merging & GitHub Pull Requests

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 24 →](../day-24/README.md)

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

- [ ] Create, switch and merge branches
- [ ] Resolve merge conflicts
- [ ] Use GitHub fork/clone/PR workflow

## 2. Prerequisites

- Day 22; GitHub SSH key (Day 11).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Branches

A branch is a movable pointer to a commit. Cheap branches enable isolated work. Fast-forward vs three-way merge.

### 3.2 Conflicts

Occur when the same lines change on both sides. Resolve markers `<<<<<<<`, test, `git add`, `git commit`.

### 3.3 GitHub flow

Branch -> commit -> push -> PR -> review -> checks -> merge -> delete branch.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `feature/login`; make commits; merge into main.
2. [ ] Create a deliberate conflict in two branches and resolve it.
3. [ ] Push to GitHub and open a PR with description and checklist.
4. [ ] Review a PR (yours or a friend's) with inline comments.
5. [ ] Configure a PR template `.github/pull_request_template.md`.

## 5. Real-World Scenario

> Two engineers edited `config.yaml`. Resolve the conflict without losing either change and add a test/check that would have caught it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git switch -c feature/login
git commit -am "feat: add login form"
git switch main && git merge --no-ff feature/login
git merge other  # conflict -> edit -> git add -> git commit
git remote add origin git@github.com:USER/devops-90-days.git
git push -u origin feature/login
git branch -d feature/login; git push origin --delete feature/login
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 23 – Git Branching & Working with GitHub — Challenge Brief

#### Task

Now that you know how to create repos, stage, and commit — it's time to learn the most powerful concept in Git: **branching**. Branches let you work on features, fixes, and experiments in isolation without breaking your main code. You'll also push your work to GitHub for the first time.

---

#### Expected Output
- A markdown file: `day-23-notes.md` with your answers
- Continue updating `git-commands.md` in your `devops-git-practice` repo
- Your practice repo pushed to GitHub

---

#### Challenge Tasks

##### Task 1: Understanding Branches
Answer these in your `day-23-notes.md`:
1. What is a branch in Git?
2. Why do we use branches instead of committing everything to `main`?
3. What is `HEAD` in Git?
4. What happens to your files when you switch branches?

---

##### Task 2: Branching Commands — Hands-On
In your `devops-git-practice` repo, perform the following:
1. List all branches in your repo
2. Create a new branch called `feature-1`
3. Switch to `feature-1`
4. Create a new branch and switch to it in a single command — call it `feature-2`
5. Try using `git switch` to move between branches — how is it different from `git checkout`?
6. Make a commit on `feature-1` that does **not** exist on `main`
7. Switch back to `main` — verify that the commit from `feature-1` is not there
8. Delete a branch you no longer need
9. Add all branching commands to your `git-commands.md`

---

##### Task 3: Push to GitHub
1. Create a **new repository** on GitHub (do NOT initialize it with a README)
2. Connect your local `devops-git-practice` repo to the GitHub remote
3. Push your `main` branch to GitHub
4. Push `feature-1` branch to GitHub
5. Verify both branches are visible on GitHub
6. Answer in your notes: What is the difference between `origin` and `upstream`?

---

##### Task 4: Pull from GitHub
1. Make a change to a file **directly on GitHub** (use the GitHub editor)
2. Pull that change to your local repo
3. Answer in your notes: What is the difference between `git fetch` and `git pull`?

---

##### Task 5: Clone vs Fork
1. **Clone** any public repository from GitHub to your local machine
2. **Fork** the same repository on GitHub, then clone your fork
3. Answer in your notes:
   - What is the difference between clone and fork?
   - When would you clone vs fork?
   - After forking, how do you keep your fork in sync with the original repo?

---

#### Hints
- When you create a branch, it starts from the commit you're currently on
- `git switch` is the modern alternative to `git checkout` for switching branches
- To push a new branch: `git push -u origin <branch-name>`
- A fork is a GitHub concept, not a Git concept

---

#### Submission
1. Add your `day-23-notes.md` to `2026/day-23/`
2. Update `git-commands.md` with all new commands and commit
3. Push to your fork

---

#### Learn in Public

Share your branching workflow and first GitHub push on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 23 – Git Branching & Working with GitHub — Notes & Solution

#### 🎯 Challenge Tasks

##### 🌿 Task 1: Understanding Branches

Answer these in your `day-23-notes.md`:

1. 🔹 What is a branch in Git?
2. 🔹 Why do we use branches instead of committing everything to `main`?
3. 🔹 What is `HEAD` in Git?
4. 🔹 What happens to your files when you switch branches?

#### 📝 Answer->

#### 1. 🌿 What is a branch in Git?
+ 🔹 A branch is a parallel workspace that lets you work on new features or fixes without touching the stable "main" code.
+ 🔹 Meanwhile a brach is a movaable pointer to a specific commit.
💡 Why it helps: It keeps your project organized and lets you experiment safely. If a branch breaks, you just delete it; your main code stays perfect.

#### 2. 🛡️ Why do we use branches instead of committing everything to `main`?
+ 🔹 Branches let us work on new features or fixes safely without breaking main branch, which always holds the stable, production-ready code.
+ 🔹 Main branch is highly important and stable so its best practice to not interrupt it.

#### 3. 📍 What is `HEAD` in Git?
+ 🔹 HEAD is a pointer that tells you where you are currently working.
+ 🔹 It always points to the latest commit on the branch you are working on.

#### 4. 🔄 What happens to your files when you switch branches?
+ 🔹 Git updates your project files to look like the branch you switched to.
+ 🔹 Files that exist in the current branch but not in the new branch will disappear temporarily.
+ 🔹 Files that are different in the new branch will be replaced with the new branch version.

---

##### 🌿 Task 2: Branching Commands — Hands-On

In your `devops-git-practice` repo, perform the following:

1. 📋 List all branches in your repo
- `git branch`

<img width="1915" height="506" alt="Screenshot 2026-08-14 124506" src="https://github.com/user-attachments/assets/dd34b09c-d417-4f53-9387-13f3777ee6b4" />


2. 🌱 Create a new branch called `feature-1`
- `git branch feature-1`

<img width="1053" height="262" alt="Screenshot 2026-08-14 124635" src="https://github.com/user-attachments/assets/e22b9578-b95f-4a28-aed2-7808a4d49869" />


3. 🔀 Switch to `feature-1`
- `git switch feature-1`

<img width="1629" height="179" alt="Screenshot 2026-08-14 125212" src="https://github.com/user-attachments/assets/a40ca041-c1e5-4555-9452-6758e56dcfa3" />

4. 🌱 Create a new branch and switch to it in a single command — call it `feature-2`
- `git checkout -b feature-2`

<img width="1045" height="96" alt="Screenshot 2026-08-14 124822" src="https://github.com/user-attachments/assets/eb9a3294-9f45-4380-908c-0f322c765808" />

5. 🔄 Try using `git switch` to move between branches — how is it different from `git checkout`?
- `git switch <branch>`   :only switches branches.  
- `git checkout <branch>` :switches branches and can also restore files.



6. 📝 Make a commit on `feature-1` that does **not** exist on `main`
- `git commit -m "Add git branch command section to git-commands.md"`

<img width="1598" height="162" alt="Screenshot 2026-08-14 125109" src="https://github.com/user-attachments/assets/d99b8631-249b-48dd-90fb-492818aa24d5" />

7. 🔙 Switch back to `main` — verify that the commit from `feature-1` is not there


9. 🗑️ Delete a branch you no longer need
- `git branch -d feature-2`
  
<img width="1489" height="322" alt="Screenshot 2026-08-14 125326" src="https://github.com/user-attachments/assets/aa6fe625-3488-4159-827d-2f58a29a1c38" />


9. 📚 Add all branching commands to your `git-commands.md`

---

##### 🚀 Task 3: Push to GitHub

1. 🆕 Create a **new repository** on GitHub (do NOT initialize it with a README)

<img width="1919" height="866" alt="Screenshot 2026-08-14 125453" src="https://github.com/user-attachments/assets/f2ef3e26-a30c-420c-883b-5d3eb2b96391" />


2. 🔗 Connect your local `devops-git-practice` repo to the GitHub remote
<img width="1303" height="174" alt="Screenshot 2026-08-14 141855" src="https://github.com/user-attachments/assets/db4a24a5-3fbd-424a-8feb-0be2e8d8a2c3" />


3. ⬆️ Push your `main` branch to GitHub
4. ⬆️ Push `feature-1` branch to GitHub
   
<img width="1882" height="652" alt="Screenshot 2026-08-14 142053" src="https://github.com/user-attachments/assets/25b06538-f28f-4ea4-b84b-544a871cd2ee" />


6. ✅ Verify both branches are visible on GitHub

<img width="1311" height="600" alt="Screenshot 2026-08-14 142235" src="https://github.com/user-attachments/assets/ec0349e9-dfdc-4e3c-8863-d18d358af96c" />


6. 📌 Answer in your notes: What is the difference between `origin` and `upstream`?

- 🔹 `origin`: origin is the default name for the repo you cloned,points to your own GitHub repository where you push and pull changes.
`example`: https\://github.com/amit5197/devops-git-practice.git
- 🔹 `upstream`: upstream refers to the original repository you forked from.You use it to pull updates from the original project into your fork.
`example`: https\://github.com/amit5197/90DaysOfDevOps

---

##### 🔄 Task 4: Pull from GitHub

1. ✏️ Make a change to a file **directly on GitHub** (use the GitHub editor)

2. ⬇️ Pull that change to your local repo

<img width="1336" height="574" alt="Screenshot 2026-08-14 142745" src="https://github.com/user-attachments/assets/32dca3bb-31ee-4ddf-b24d-da438bbee8a3" />

3. 📚 Answer in your notes: What is the difference between `git fetch` and `git pull`?

- 🔹 `git fetch` : Downloads changes from remote only; does not change your branch,just updates remote info.
  or `Git fetch` goes to the remote server (GitHub) and downloads all the new data.
  💡 What it does: Updates your remote-tracking branches (like `origin/main` ).
- 🔹 `git pull` : Downloads changes from remote and merges them into your current branch, updating your local branch immediately.
  💡 What it does: It downloads the new data AND tries to automatically stitch it into your current files.
  
---

##### 🔀 Task 5: Clone vs Fork

1. 📥 **Clone** any public repository from GitHub to your local machine

2. 🍴 **Fork** the same repository on GitHub, then clone your fork

- 🔹 `clone` : Download the project from GitHub to my computer.
- 🔹 `fork` : Make my own copy in of someone else’s project on GitHub.

3. 📝 Answer in your notes:

   1- 🔍 What is the difference between clone and fork?
   
         - 🔹 `clone` : Download the project from GitHub to my computer.
         - 🔹 `fork` : Make my own copy in of someone else’s project on GitHub.
     
   2- 🎯 When would you clone vs fork?
   
         - `clone when`:
             - ✅ You are working on your own project.
             - ✅ You already have write access.
             - ✅ You just want the code locally.
             - 💡 Example: Working in your company repo where you’re a team member.
   
        - `fork when`
             - ❌ You don’t have write access.
             - 🌍 You want to contribute to open source.
             - 🛡️ You want your own safe copy.
             - 💡 Example: Contributing to aws-containers repository retail-store-sample-app.


  3- 🔄 You don’t have write access.
         - 🌍 You want to contribute to open source.
         - 🛡️ You want your own safe copy.
         - 💡 Example: Contributing to aws-containers repository Uptime-kuma
   - 🔄 After forking, how do you keep your fork in sync with the original repo?

   - 🔗 After forking and cloning my fork, I add the original repository as an script.js remote. Then I fetch changes from script.js, merge the script.js default branch into my current branch,and push the updates to my fork.

      - 💻 Example:
        ```
        git remote add upstream git@github.com:Amit5197/Uptime-Kuma.git
        git checkout main
        git fetch script.js
        git merge script.js/main
        git push origin main
        ```

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a PR template and an issue template. | You can demonstrate, without notes: *create, switch and merge branches* — with evidence committed to `day-23/`. |
| 2 | Practise 3 conflicts of increasing difficulty. | You can demonstrate, without notes: *resolve merge conflicts* — with evidence committed to `day-23/`. |
| 3 | Write a short PR description guideline. | You can demonstrate, without notes: *use GitHub fork/clone/PR workflow* — with evidence committed to `day-23/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `failed to push some refs` | Remote has new commits; `git pull --rebase` then push. |
| Conflict markers committed | Search for `<<<<<<<` before commit; use pre-commit hook. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use SSH or fine-grained tokens, enable 2FA, never force-push shared branches.
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

1. Fast-forward vs merge commit?
2. How do you resolve conflicts?
3. What belongs in a PR description?
4. Why delete merged branches?
5. **Scenario:** Two engineers edited `config. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I resolve a conflict? | ☐ | ☐ | ☐ | ☐ |
| Can I open and review a PR? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the GitHub flow? | ☐ | ☐ | ☐ | ☐ |
| Create, switch and merge branches | ☐ | ☐ | ☐ | ☐ |
| Resolve merge conflicts | ☐ | ☐ | ☐ | ☐ |
| Use GitHub fork/clone/PR workflow | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-23/` in your own repository:

```text
day-23/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-23
git add day-23/
git commit -m "day-23: git branching, merging & github pull requests"
git push -u origin day-23
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

## 18. Personal Learning Journal — 🛡️ Day 23 - Containerizing Microservices & DevSecOps Best Practices

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

06 August 2026

---

### 🚀 Introduction

"Security and optimization are not optional in DevOps—they are fundamental to building scalable, reliable, and production-ready applications." 🚀
 
Day 23 of #90DaysOfDevOps
 
Today's session was focused on containerizing a microservices-based application while following modern Docker and **DevSecOps best practices**. The goal wasn't just to get the application running, but to build lean, secure, and maintainable container images from the ground up.

---

### 📚 What I Worked On
 
#### 🐳 1. Containerized Multiple Microservices
Unlike a monolithic application where everything runs together, a microservices architecture splits functions into small, independent services.
- Built Docker images for: `sv-auth` (Authentication), `sv-tasks` (Task Management), `sv-notes` (Note Taking), and `sv-frontend` (UI).
- Created dedicated Dockerfiles for each individual service to ensure they can be updated and scaled completely independently of one another.
 
#### ⚡ 2. Implemented Multi-Stage Docker Builds
To keep images small and secure:
- Used `Builder` and `Runner` stages to separate the build environment from the runtime environment. 
- By copying over only the compiled assets (like Python wheels or React static files) into the final stage, I successfully reduced the image size by excluding unnecessary build dependencies (like compilers, dev tools, and test libraries) from the final image. 
 
#### 🛡️ 3. Image Hardening & Optimization
- **Backend Services:** Used lightweight Alpine Linux base images (`python:3.12-alpine`). Alpine is heavily stripped down, which significantly reduces the potential attack surface.
- **Frontend Serving:** Configured an **unprivileged NGINX image** (`nginxinc/nginx-unprivileged:1.27-alpine-slim`) for serving the frontend securely. Standard Nginx runs as root on port 80, which is dangerous. The unprivileged version runs as an unprivileged user on port 8080, entirely eliminating root-level escalation risks.
 
#### 🔧 4. Dependency & Environment Management
- **OS Dependencies:** Installed required Linux packages using Alpine's `apk --no-cache` to prevent bloated cache files from expanding the image size.
- **Python Dependencies:** Configured Python virtual environments (`python -m venv`) inside the containers for strictly isolated dependency management. 
- **Layer Caching:** Ordered Dockerfile commands intelligently (copying `requirements.txt` and installing dependencies *before* copying the main source code) to optimize Docker layers for much faster rebuilds.
 
#### ✅ 5. Testing Before Deployment
A core tenet of DevSecOps is validating code continuously:
- Integrated unit tests into the image build process itself using intermediate testing stages.
- Verified backend APIs (Authentication, Tasks, etc.) before the final production-ready images were generated. If the tests fail, the image doesn't build—preventing broken code from reaching the registry.

---

### 🎯 Key Takeaways
 
This hands-on project reinforced several critical DevOps principles:
1. **Build small and secure Docker images.** 
2. **Prefer minimal base images** (Alpine/Distroless) for production. 
3. **Run applications with non-root users** whenever technically possible. 
4. **Use multi-stage builds** to radically improve efficiency and security. 
5. **Validate applications through automated testing** before deployment. 
6. **Treat security and optimization as part of the development lifecycle**, not as a post-deployment afterthought. 

Every hands-on project deepens my understanding of how modern applications are built, secured, and deployed in real-world DevOps environments. Looking forward to exploring Kubernetes and taking these containers to the next level! 🚀

---

### 🔗 Resources

- **GitHub Repository:** [Project Repo](https://lnkd.in/dJD--sCK)

---

### 🔗 LinkedIn Post

"Security and optimization are not optional in DevOps—they are fundamental to building scalable, reliable, and production-ready applications." 🚀
 
Day 23 of #90DaysOfDevOps
 
Today's session was focused on containerizing a microservices-based application while following modern Docker and DevSecOps best practices. The goal wasn't just to get the application running, but to build lean, secure, and maintainable container images.
 
📚 What I Worked On
 
🐳 Containerized Multiple Microservices
- Built Docker images for: sv-auth, sv-tasks, sv-notes, sv-frontend
- Created dedicated Dockerfiles for each service
- Followed a modular microservices architecture
 
⚡ Implemented Multi-Stage Docker Builds
- Used Builder and Runner stages to separate the build environment from the runtime environment
- Reduced image size by excluding unnecessary build dependencies from the final image
 
🛡️ Image Hardening & Optimization
- Used lightweight Alpine Linux base images (python:3.12-alpine) for backend services
- Configured an unprivileged NGINX image (nginxinc/nginx-unprivileged:1.27-alpine-slim) for serving the frontend securely
- Reduced the attack surface while improving container performance
 
🔧 Dependency & Environment Management
- Installed required packages using Alpine's apk --no-cache to keep images clean
- Configured Python virtual environments for isolated dependency management
- Optimized Docker layers for faster builds and improved caching
 
✅ Testing Before Deployment
- Integrated unit tests into the build process
- Verified backend APIs (Authentication, Tasks, etc.) before creating production-ready images
- Reinforced the importance of validating code before deployment
 
🎯 Key Takeaways
This hands-on project reinforced several important DevOps principles:
- Build small and secure Docker images
- Prefer minimal base images for production
- Run applications with non-root users whenever possible
- Use multi-stage builds to improve efficiency
- Validate applications through automated testing before deployment
- Treat security and optimization as part of the development lifecycle, not as post-deployment tasks
 
📂 GitHub Repository:
🔗 https://lnkd.in/dJD--sCK
 
Every hands-on project deepens my understanding of how modern applications are built, secured, and deployed in real-world DevOps environments. Looking forward to exploring Kubernetes and taking these containers to the next level! 🚀
 
#90DaysOfDevOps #DevOps #Docker #Microservices #Containerization #DevSecOps #DockerSecurity #AlpineLinux #NGINX #Python #CloudComputing #SoftwareEngineering #LearningInPublic #GitHub #AWS #TrainWithShubham

## 19. Challenge Notes — Day 23: Introduction to Kubernetes

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to Day 23 of the 90 Days of DevOps Challenge! Today, we begin our journey into **Kubernetes** — the most widely used container orchestration platform.

[![](https://img.youtube.com/vi/gFYI2oyX4Ew/0.jpg)](https://www.youtube.com/watch?v=gFYI2oyX4Ew)

[Watch the video](https://www.youtube.com/watch?v=gFYI2oyX4Ew)



---

#### 🌟 What is Kubernetes?

**Kubernetes** (also known as **K8s**) is an open-source container orchestration platform that automates:

- Deployment
- Scaling
- Management
- Networking
- Availability

of containerized applications.

Originally developed by Google and now maintained by the **Cloud Native Computing Foundation (CNCF)**.

---

#### 🧱 Why Kubernetes?

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **High Availability** | Keeps your applications running even if a node fails.                      |
| **Auto-Scaling**      | Automatically scales your application based on load.                       |
| **Self-Healing**      | Restarts failed containers, replaces and reschedules them when necessary. |
| **Rolling Updates**   | Updates applications with zero downtime.                                   |
| **Service Discovery** | Finds services within the cluster automatically.                          |

---

#### ⚙️ Kubernetes Architecture

Kubernetes has a **Master-Worker** architecture:

##### 🧠 Control Plane (Master Node)

Manages the cluster. Key components:

- `kube-apiserver`: Entry point for commands.
- `etcd`: Key-value store for cluster state.
- `kube-scheduler`: Assigns Pods to nodes.
- `kube-controller-manager`: Handles controllers (replica, node, endpoints, etc.).
- `cloud-controller-manager`: Manages cloud-specific logic.

##### 🧳 Worker Node (Minion)

Runs application workloads. Key components:

- `kubelet`: Communicates with the API server.
- `kube-proxy`: Manages networking.
- `Container Runtime`: Runs containers (Docker, containerd, etc.).

---

#### 🧩 Kubernetes Core Concepts

##### 1. **Pod**
- Smallest deployable unit in Kubernetes.
- Wraps one or more containers.

##### 2. **Deployment**
- Manages the lifecycle of Pods (create, update, rollback).

##### 3. **Service**
- Exposes Pods to internal/external traffic.

##### 4. **Namespace**
- Logical cluster segmentation for multi-tenancy.

##### 5. **ConfigMap & Secret**
- Manage app configuration and sensitive data.

---

#### 💡 How Kubernetes Works (Simplified Flow)

1. You define a **Deployment YAML**.
2. `kubectl apply -f deploy.yaml` sends the spec to the API Server.
3. Kubernetes Scheduler decides **where to run the Pod**.
4. **Kubelet** tells the container runtime to run the container.
5. Pod is created and exposed via **Service**.

---

#### 📦 Kubernetes vs Docker

| Feature              | Docker                                | Kubernetes                      |
|----------------------|---------------------------------------|----------------------------------|
| Focus                | Containerization                      | Orchestration                    |
| Networking           | Basic via bridge/network              | Advanced Service Discovery       |
| Scaling              | Manual                                | Automatic                        |
| Load Balancing       | Not built-in                          | Built-in                         |
| Self-Healing         | No                                    | Yes                              |

Kubernetes can **run Docker containers**, but it adds powerful orchestration capabilities on top.

---

#### 🧪 Getting Started with Kubernetes (Minikube)

```bash
# Start a Kubernetes cluster locally
minikube start

# Check cluster status
kubectl cluster-info

# List nodes
kubectl get nodes
```

### Attachments

- [Day 23 Introduction to Kubernetes.pdf](Day%2023%20Introduction%20to%20Kubernetes.pdf)

## 20. Cohort Practice — Day 23: Git Branching & Working with GitHub

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

Now that you know how to create repos, stage, and commit — it's time to learn the most powerful concept in Git: **branching**. Branches let you work on features, fixes, and experiments in isolation without breaking your main code. You'll also push your work to GitHub for the first time.

---

#### Expected Output
- A markdown file: `day-23-notes.md` with your answers
- Continue updating `git-commands.md` in your `devops-git-practice` repo
- Your practice repo pushed to GitHub

---

#### Challenge Tasks

##### Task 1: Understanding Branches
Answer these in your `day-23-notes.md`:
1. What is a branch in Git?
2. Why do we use branches instead of committing everything to `main`?
3. What is `HEAD` in Git?
4. What happens to your files when you switch branches?

---

##### Task 2: Branching Commands — Hands-On
In your `devops-git-practice` repo, perform the following:
1. List all branches in your repo
2. Create a new branch called `feature-1`
3. Switch to `feature-1`
4. Create a new branch and switch to it in a single command — call it `feature-2`
5. Try using `git switch` to move between branches — how is it different from `git checkout`?
6. Make a commit on `feature-1` that does **not** exist on `main`
7. Switch back to `main` — verify that the commit from `feature-1` is not there
8. Delete a branch you no longer need
9. Add all branching commands to your `git-commands.md`

---

##### Task 3: Push to GitHub
1. Create a **new repository** on GitHub (do NOT initialize it with a README)
2. Connect your local `devops-git-practice` repo to the GitHub remote
3. Push your `main` branch to GitHub
4. Push `feature-1` branch to GitHub
5. Verify both branches are visible on GitHub
6. Answer in your notes: What is the difference between `origin` and `upstream`?

---

##### Task 4: Pull from GitHub
1. Make a change to a file **directly on GitHub** (use the GitHub editor)
2. Pull that change to your local repo
3. Answer in your notes: What is the difference between `git fetch` and `git pull`?

---

##### Task 5: Clone vs Fork
1. **Clone** any public repository from GitHub to your local machine
2. **Fork** the same repository on GitHub, then clone your fork
3. Answer in your notes:
   - What is the difference between clone and fork?
   - When would you clone vs fork?
   - After forking, how do you keep your fork in sync with the original repo?

---

#### Hints
- When you create a branch, it starts from the commit you're currently on
- `git switch` is the modern alternative to `git checkout` for switching branches
- To push a new branch: `git push -u origin <branch-name>`
- A fork is a GitHub concept, not a Git concept

---

#### Submission
1. Add your `day-23-notes.md` to `2026/day-23/`
2. Update `git-commands.md` with all new commands and commit
3. Push to your fork

---

#### Learn in Public

Share your branching workflow and first GitHub push on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-23-notes

##### Task 1: Understanding Branches
Answer these in your `day-23-notes.md`:
1. What is a branch in Git?
2. Why do we use branches instead of committing everything to `main`?
3. What is `HEAD` in Git?
4. What happens to your files when you switch branches?


1- A branch is an independent line of development in git 

is is a separate workspace where you can make changes without affecting the main code

2- we use branches to work on new features , bug fixes or experiments without affecting the stable code in the main branch.

if every one commit directly to main

- bugs can reach production
- Team members may overwrite each others work.
- Testing becomes difficult.
- The main branch may become unstable.


Branches provide an isolated workspace where developers can make changes safely , test them and review them before merging into main.



3- HEAD is a pointer that tells git which commit and branch you are currently working on 

HEAD is the current position in git

4- when you switch branche , git updates your working directory to match the files stored in the target branch.



<<<<<<< HEAD





##### Task 2: Branching Commands — Hands-On
In your `devops-git-practice` repo, perform the following:
1. List all branches in your repo
git branch-
to get the all the branch in the git and * is the current branch

git branch -v
show all commit and branch details


2. Create a new branch called `feature-1`
git bracnh feature-1
git checkout - feature-1 to create and switch the branch


3. Switch to `feature-1`
git checkout feature-1
git switch feature-1

4. Create a new branch and switch to it in a single command — call it `feature-2`

git checkout -b feature-2

5. Try using `git switch` to move between branches — how is it different from `git checkout`?

- both commands can be used to move between branches , but git switch is newer and simpler

git checkout feature-1 - switch the branch
git checkout -b feature-1 - create and switch the branch

git checkout
============
switch branches
create branches
restore files
checkout commits

git switch
==========
switching branches
createtig and switching branches

6. Make a commit on `feature-1` that does **not** exist on `main`
git switch feature-1

- create a file and added the code and commit 

git log --online

git switch main
and notice

7. Switch back to `main` — verify that the commit from `feature-1` is not there

git checkout main
and notice nothing is theere in this file and file does not exists

8. Delete a branch you no longer need
git branch -d feature-1


git checkout -d branch_name

9. Add all branching commands to your `git-commands.md`

##### Task 3: Push to GitHub
1. Create a **new repository** on GitHub (do NOT initialize it with a README)
2. Connect your local `devops-git-practice` repo to the GitHub remote
3. Push your `main` branch to GitHub
4. Push `feature-1` branch to GitHub
5. Verify both branches are visible on GitHub
6. Answer in your notes: What is the difference between `origin` and `upstream`?



origin => Your own remote repository
upstream => the original source repository from which your repository was forked 



##### Task 4: Pull from GitHub
1. Make a change to a file **directly on GitHub** (use the GitHub editor)
2. Pull that change to your local repo
3. Answer in your notes: What is the difference between `git fetch` and `git pull`?



git fetch 
=========

git fetch downloads the latest changes from the remote repository but does not modify my local branch

it updates the remote - tracking branches such as

origin / main

git fetch origin 


git pull
========
git pull download changes from the remote repository and immediatly merges them into my current branch


git pull origin main


##### Task 5: Clone vs Fork
1. **Clone** any public repository from GitHub to your local machine
2. **Fork** the same repository on GitHub, then clone your fork
3. Answer in your notes:
   - What is the difference between clone and fork?
   - When would you clone vs fork?
   - After forking, how do you keep your fork in sync with the original repo?


-> a clone creates a copy of a git repository on your local machine.


you make changes locally , commit them and push them if you have permission.


a form create your own copy of some one else repository on github.


after forking you can clone your fork


clone
====
you own the repository
you are part of the project team
you already have write access.
you want a local copy of the repository.

fork
====

you do not have write access.
you want to contribute to an open source project.

you want your own github copy of the project
=======
##### Task 2: Branching Commands — Hands-On
In your `devops-git-practice` repo, perform the following:
1. List all branches in your repo
2. Create a new branch called `feature-1`
3. Switch to `feature-1`
4. Create a new branch and switch to it in a single command — call it `feature-2`
5. Try using `git switch` to move between branches — how is it different from `git checkout`?
6. Make a commit on `feature-1` that does **not** exist on `main`
7. Switch back to `main` — verify that the commit from `feature-1` is not there
8. Delete a branch you no longer need
9. Add all branching commands to your `git-commands.md`
>>>>>>> 168f1bbbb2cf6f5c6217034681cfb79ff053c260

##### Notes: git-commands

Branch
======
git checkout -b branch_name
git switch branch_name
git checkout branch_name


git merge branch_name
git branch -d branch_name


git log
git log --oneline


git status
git add file_name
git commit -m "messsage"
git push origin main

git branch
git branch -v
git branch branch_name
git checkout -b branch_name
git checkout branch_name


git log --oneline




==========================
git br

### Files

- [devops-git-practice](files/cohort-2026/devops-git-practice)
- [feature-notes.txt](files/cohort-2026/feature-notes.txt)

## 21. Hands-on Project — Day 23: SSM Parameters & Secrets (KMS + App Bootstrap)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **AWS Systems Manager Parameter Store** and **AWS Secrets Manager** for **configuration and secrets management**.  
You’ll create a **parameter hierarchy** per app/environment, protect sensitive values with **KMS encryption**, and learn **bootstrap patterns** for EC2/ECS/EKS apps.

This builds on:
- **Day 14–16** (network & security groups) and **Day 17–19** (compute & scaling)
- **Day 21–22** (stateful services)

---

#### 🎯 Learning Goals
- Model a **/env/app/** parameter hierarchy (e.g., `/prod/api/DB_HOST`).  
- Store **plain** and **secure** (KMS) parameters in **Parameter Store**.  
- Create a **Secrets Manager** secret for rotation-friendly credentials.  
- Fetch config at **boot time** (user data) or **runtime** (SDK/CLI) safely.

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (edit variables or pass -var)
terraform -chdir=terraform plan   -var='env=dev'   -var='app_name=sampleapp'   -var='parameters={"LOG_LEVEL":"info","FEATURE_X_ENABLED":"true"}'   -var='secure_parameters={"DB_PASSWORD":"s3cr3t!"}'

# 3) Apply
terraform -chdir=terraform apply -auto-approve   -var='env=dev'   -var='app_name=sampleapp'

# 4) Try bootstrap examples
#   a) On EC2 (Day 17/19), run:
bash app-examples/fetch_ssm_to_envfile.sh /dev/sampleapp .env
#   b) Python (anywhere with AWS creds):
python3 app-examples/read_params_python.py /dev/sampleapp
```

**Where things land**
- Parameter Store path prefix: `/${env}/${app_name}/...`  
- Secret name: `${env}/${app_name}/db-credentials` (editable via var)  
- Custom **KMS key** (optional) used for `SecureString` params and the secret.

---

#### 💡 Challenge
- Add **parameter version pinning** in CI/CD (break glass: rollbacks).  
- Use **EC2/ECS task role** scoped to a **narrow SSM/Secrets policy** (least privilege).  
- Wire **Lambda rotation** for the Secrets Manager secret.  

---

#### ✅ Checklist
- [ ] Clear **/env/app** naming for parameters  
- [ ] **SecureString** values encrypted with **KMS**  
- [ ] App can **fetch and render .env** safely at boot or runtime  
- [ ] Secrets never committed to git

---

#### 📌 Commit
```bash
git add day23-ssm-parameters-secrets
git commit -m "day23: SSM Param Store hierarchy + Secrets Manager with KMS; bootstrap examples"
git push
```

### Files

- [app-examples/fetch_ssm_to_envfile.sh](files/hands-on-projects/app-examples/fetch_ssm_to_envfile.sh)
- [app-examples/read_params_python.py](files/hands-on-projects/app-examples/read_params_python.py)
- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 24 →](../day-24/README.md)
