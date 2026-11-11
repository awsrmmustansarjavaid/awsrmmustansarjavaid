# Day 25 — Branching Strategies, Conventional Commits, SemVer & Code Review

[← Day 24](../day-24/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 26 →](../day-26/README.md)

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

- [ ] Compare Git Flow, GitHub Flow and trunk-based development
- [ ] Adopt Conventional Commits and Semantic Versioning
- [ ] Perform effective code reviews

## 2. Prerequisites

- Day 24.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Strategies

Trunk-based development with short-lived branches and feature flags is common in high-performing teams. Git Flow suits scheduled releases. Choose by release cadence and risk.

### 3.2 Conventional Commits and SemVer

`feat:`, `fix:`, `docs:`, `chore:`, `BREAKING CHANGE:` -> automated changelog and version bumps (MAJOR.MINOR.PATCH).

### 3.3 Code review

Review for correctness, security, readability, tests and operational impact. Keep PRs small; be kind and specific.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `docs/branching-strategy.md` choosing a strategy for a 5-person team and justifying it.
2. [ ] Add commitlint or a simple commit-msg hook.
3. [ ] Tag releases `v0.1.0`, `v0.2.0` according to commits.
4. [ ] Create a code review checklist file.
5. [ ] Review a sample PR containing a hard-coded password and propose fixes.

## 5. Real-World Scenario

> Your team ships weekly but hotfixes are chaotic. Propose a branching and release scheme that supports fast fixes with traceability.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git switch -c feat/health-endpoint
git commit -m "feat(api): add /health endpoint"
git commit -m "fix(api): handle timeout" -m "BREAKING CHANGE: timeout now 5s"
git tag -a v1.0.0 -m "release 1.0.0"
npx --yes commitlint --from HEAD~3
git log --pretty=format:'%h %s' v0.1.0..HEAD
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 25 – Git Reset vs Revert & Branching Strategies — Challenge Brief

#### Task

You'll learn how to **undo mistakes** safely — one of the most important skills in Git. You'll also explore **branching strategies** used by real engineering teams to manage code at scale.

---

#### Expected Output
- A markdown file: `day-25-notes.md` with your observations and answers
- Continue updating `git-commands.md` in your `devops-git-practice` repo

---

#### Challenge Tasks

##### Task 1: Git Reset — Hands-On
1. Make 3 commits in your practice repo (commit A, B, C)
2. Use `git reset --soft` to go back one commit — what happens to the changes?
3. Re-commit, then use `git reset --mixed` to go back one commit — what happens now?
4. Re-commit, then use `git reset --hard` to go back one commit — what happens this time?
5. Answer in your notes:
   - What is the difference between `--soft`, `--mixed`, and `--hard`?
   - Which one is destructive and why?
   - When would you use each one?
   - Should you ever use `git reset` on commits that are already pushed?

---

##### Task 2: Git Revert — Hands-On
1. Make 3 commits (commit X, Y, Z)
2. Revert commit Y (the middle one) — what happens?
3. Check `git log` — is commit Y still in the history?
4. Answer in your notes:
   - How is `git revert` different from `git reset`?
   - Why is revert considered **safer** than reset for shared branches?
   - When would you use revert vs reset?

---

##### Task 3: Reset vs Revert — Summary
Create a comparison in your notes:

| | `git reset` | `git revert` |
|---|---|---|
| What it does | ? | ? |
| Removes commit from history? | ? | ? |
| Safe for shared/pushed branches? | ? | ? |
| When to use | ? | ? |

---

##### Task 4: Branching Strategies
Research the following branching strategies and document each in your notes with:
- How it works (short description)
- A simple diagram or flow (text-based is fine)
- When/where it's used
- Pros and cons

1. **GitFlow** — develop, feature, release, hotfix branches
2. **GitHub Flow** — simple, single main branch + feature branches
3. **Trunk-Based Development** — everyone commits to main, short-lived branches
4. Answer:
   - Which strategy would you use for a startup shipping fast?
   - Which strategy would you use for a large team with scheduled releases?
   - Which one does your favorite open-source project use? (check any repo on GitHub)

---

##### Task 5: Git Commands Reference Update
Update your `git-commands.md` to cover everything from Days 22–25:
- Setup & Config
- Basic Workflow (add, commit, status, log, diff)
- Branching (branch, checkout, switch)
- Remote (push, pull, fetch, clone, fork)
- Merging & Rebasing
- Stash & Cherry Pick
- Reset & Revert

---

#### Hints
- `git reflog` is your safety net — it shows everything Git has done, even after a hard reset
- For branching strategies, look at how projects like Kubernetes, React, or Linux kernel manage branches

---

#### Submission
1. Add your `day-25-notes.md` to `2026/day-25/`
2. Update `git-commands.md` — commit and push
3. Push to your fork

---

#### Learn in Public

Share your Reset vs Revert comparison or your branching strategy notes on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 25 – Git Reset vs Revert & Branching Strategies — Notes & Solution

#### 🎯 Objective

The goal of Day 25 was to understand how Git handles mistakes and how different branching strategies are used by development teams.

##### Topics covered:

git reset
git revert
git reflog
GitFlow
GitHub Flow
Trunk-Based Development
Reset vs Revert
Branching strategy selection

--- 

#### 🔄 Task 1 – Git Reset

I created three commits:

Commit A → Commit B → Commit C
`git reset --soft`

Command:

`git reset --soft HEAD~1`
Observation

The HEAD moved back by one commit, but the changes introduced by the removed commit remained staged.

Commit C
   ↓
Changes remain staged
Meaning

--soft changes the commit history while keeping the changes staged.

##### OUTPUT

<img width="1919" height="445" alt="Screenshot 2026-08-17 145904" src="https://github.com/user-attachments/assets/6e71711b-aa9e-4729-b35d-654467a8bb03" />
<img width="1919" height="380" alt="Screenshot 2026-08-17 150108" src="https://github.com/user-attachments/assets/254a871e-ff27-41fc-a171-0f79c41a7ca9" />

##### `git reset --mixed`

Command:

`git reset --mixed HEAD~1`
Observation

The HEAD moved back by one commit and the changes remained in the working directory, but they were unstaged.

Commit C
   ↓
Changes remain unstaged
Meaning

--mixed resets the commit and staging area but keeps the working-tree changes.

--mixed is also the default mode of git reset.

##### OUTPUT

<img width="1288" height="363" alt="Screenshot 2026-08-17 150249" src="https://github.com/user-attachments/assets/e4387d95-0416-40a9-9575-c2bee977f1fe" />

##### `git reset --hard`
Command:
`git reset --hard HEAD~1`

Observation

The commit was removed from the current branch history and the associated staged and working-tree changes were also removed.

Commit C
   ↓
Commit removed
Changes removed
Meaning

--hard changes:

HEAD
Staging area
Working directory

⚠️ This makes it the most destructive reset mode.

<img width="850" height="293" alt="Screenshot 2026-08-17 150419" src="https://github.com/user-attachments/assets/a13788cc-2053-420e-8132-2b585ce748af" />

##### What is the difference between --soft, --mixed, and --hard?
- --soft :- it removes the commit, But keeps the changes staged
- --mixed:- it removes the commit and unstaged the changes
- --hard :- it delete the commit and make working direcotry clean

##### Which one is destructive and why?
git --hard is distructive because it deletes commits + staging changes + working directory changes so data will loss

##### When would you use each one?
- --soft : when i want to change commit message or keep changes staged
- -- mixed : when i want to re-edit files and re-stage file properly
- --hard : when i want to completely delete the changes nd clean the brnach

##### Should you ever use git reset on commits that are already pushed?
No, Once commits are pushed, others may have already pulled and worked on them,so resetting them can cause confusion and conflicts.

---

#### Task 2: Git Revert — Hands-On
1. first I make 3 commits (commit X, Y, Z)
<img width="1919" height="668" alt="Screenshot 2026-08-17 150914" src="https://github.com/user-attachments/assets/513f9770-aa7c-4341-b0b2-26577ef805bc" />

2. Revert commit Y (the middle one) — what happens? ```git revert 2136763```
<img width="1140" height="205" alt="Screenshot 2026-08-17 151126" src="https://github.com/user-attachments/assets/36e7886b-9757-4ec1-84ae-67edc0b6c793" />

+ A new commit is created that undoes the changes from commit Y. The original commit Y remains in the history, but its changes are reversed in the codebase.

3. Check `git log` — is commit Y still in the history?
+ Yes, commit Y is still in the history, but it has been reverted by a new commit that undoes its changes.

4. Answer in your notes:
   ### How is `git revert` different from `git reset`?
     + git reset removes commits from branch history and also delete when we use --hard
     + git revert does not commit that undoes the changes ,keep history safe

   ### Why is revert considered **safer** than reset for shared branches?
     + git revert is safer because it does not rewrite history it creates a new commit that undoes changes so everyone in the team stay in sync.
     + git reset changes hisotry and requires force push which can break other developers branches.

   ### When would you use revert vs reset?
    +  Will use git revert when i am working on a Shared Branches.
    +  Will use git reset when the commit is not Pushed yet.
---


##### Task 3: Reset vs Revert — Summary
Create a comparison in your notes:

| | `git reset` | `git revert` |
|---|---|---|
| What it does | git reset moves the branch pointer and rewrites history | git revert creates a new commit that cancels the previous one |
| Removes commit from history? | Yes | No |
| Safe for shared/pushed branches? | No | Yes |
| When to use | When working on locally and commit is not pushed yet | When working on shered or pushed branches |

---

##### 🏆Task 4: Branching Strategies
Research the following branching strategies and document each in your notes with:
- How it works (short description)
- A simple diagram or flow (text-based is fine)
- When/where it's used
- Pros and cons
<img width="3424" height="3917" alt="image" src="https://github.com/user-attachments/assets/da3bcc72-0137-4ca2-b94b-ecaf0d309014" />

  1. **GitFlow** — develop, feature, release, hotfix branches
1. **GitFlow**
    **How it works:**

    - `main`      : Contains production-ready code.Every commit here is a stable release.
        
    - `develop`   : The integration branch where new features are merged before they’re ready to go live.
    
    - `feature`   : For building out new functionality.Created from develop and merged back when complete.
        
    - `release`   : Used to prep a new version for production.Created from develop and merged into both main and develop.

    - `hotfix`   : For urgent fixes on production.Created from main,then merged back into both main and develop.

    **Text Diagram:**
    ```text
    [main] (Production-ready)
    |
    o <----------------------------------------- (Start)
    | \
    |  \ [develop] (Integration)
    |   |
    |   o <------------------------------------- (Develop Start)
    |   | \
    |   |  \ [feature/login] (New functionality)
    |   |   |
    |   |   o (Feature Commit)
    |   |   |
    |   |   o (Feature Complete)
    |   |  /
    |   o / (Merge feature to develop)
    |   |
    |   | \
    |   |  \ [release/1.0] (Prep for production)
    |   |   |
    |   |   o (Release Prep/Bug Fix)
    |   |   |
    |   |   o (Release Ready)
    |   |  / \
    |   o /   o (Merge release to develop)
    |  /
    o / (Merge release to main & tag v1.0)
    |
    | \
    |  \ [hotfix/1.0.1] (Urgent fix)
    |   |
    |   o (Apply Fix)
    |  / \
    o /   o (Merge hotfix to develop)
    |
    V
    ```

    **When/where it's used:**

    - Team follows scheduled release cycles

    - Need to maintain multiple versions

    **Pros:** 
    - Clear separation of concerns across features, releases and hotfixes.

    **Cons:** 
    - Can result in long-lived branches, increasing the risk of merge conflicts.

2. **GitHub Flow** — simple, single main branch + feature branches
   **How it works:**

    - Create a `feature branch` from `main`
    - Push commits to the `feature branch`
    - Open a pull request for code review and automated tests.
    - Once approved, merge back to `main`.
    - Deploy immediately.
    - Everything in main should always be production-ready.

    **Text Diagram:**
    ```text  
   
      [main] (Always Production-Ready)
        |
        o (Start)
        |
        |\_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
        |                               \
        |                                \ [feature/login]
        |                                 |
        |                                 o (Commit 1)
        |                                 |
        |                                 o (Commit 2)
        |                                 |
        |                                 o (Pull Request & Review)
        |<_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _/
        |                               
        o (Merge & Auto-Deploy)
        |
        v
    ```

    **When/where it's used:**
    - ship frequent, small releases

     **Pros:**
    - Fast merge & deploy
    
     **Cons:**
     - In large teams, it can result in frequent merge conflicts

3. **Trunk-Based Development** — everyone commits to main, short-lived branches
**How it works:**

    - There’s one `main` branch, often called main or trunk. All development happens here
    - Developers commit directly to `main`, often multiple times per day
    - Changes are small, incremental

     **Text Diagram:**
     ```text
      [main] (The Trunk)
        |
        o (Start)
        |
        |\_ _ _ _ _ _ _ 
        |             \
        |              o (Dev A: Small Change)
        |<_ _ _ _ _ _ /
        |             /
        o (Merge & Test)
        |
        |\_ _ _ _ _ _ _ 
        |             \
        |              o (Dev B: Small Change)
        |<_ _ _ _ _ _ /
        |             /
        o (Merge & Test)
        |
        v
    ```

4. Answer:
   - Which strategy would you use for a startup shipping fast?
     + I would use Trunk-Based Development for a startup that needs to ship fast
   
   - Which strategy would you use for a large team with scheduled releases?
    + GitFlow

<img width="1362" height="741" alt="image" src="https://github.com/user-attachments/assets/bf226bfb-2fef-4d50-bb7b-f4ebb63abeca" />

---

🎯 Final Takeaway

The biggest lesson from Day 25 is:

Use reset carefully for local/private history, and prefer revert when undoing changes on shared branches.

Understanding branching strategies is equally important because the right workflow helps teams balance development speed, code quality, releases, and collaboration.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a CONTRIBUTING.md. | You can demonstrate, without notes: *compare Git Flow, GitHub Flow and trunk-based development* — with evidence committed to `day-25/`. |
| 2 | Define when to bump MAJOR/MINOR/PATCH. | You can demonstrate, without notes: *adopt Conventional Commits and Semantic Versioning* — with evidence committed to `day-25/`. |
| 3 | Create a code review template. | You can demonstrate, without notes: *perform effective code reviews* — with evidence committed to `day-25/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Messages don't match convention | Add commit-msg hook / CI check. |
| Release branches diverge | Backport via cherry-pick with a documented process. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Review for secrets, injection and unsafe defaults; require reviews on protected branches.
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

1. Trunk-based vs Git Flow?
2. What is SemVer?
3. What do you check in a code review?
4. What is a feature flag?
5. **Scenario:** Your team ships weekly but hotfixes are chaotic. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I justify a branching model? | ☐ | ☐ | ☐ | ☐ |
| Can I tag semantic versions? | ☐ | ☐ | ☐ | ☐ |
| Can I give constructive review feedback? | ☐ | ☐ | ☐ | ☐ |
| Compare Git Flow, GitHub Flow and trunk-based development | ☐ | ☐ | ☐ | ☐ |
| Adopt Conventional Commits and Semantic Versioning | ☐ | ☐ | ☐ | ☐ |
| Perform effective code reviews | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-25/` in your own repository:

```text
day-25/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-25
git add day-25/
git commit -m "day-25: branching strategies, conventional commits, semver & code re"
git push -u origin day-25
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

## 18. Personal Learning Journal — 🚀 Day 25 - End-to-End Multi-Tier Deployment Pipeline

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

08 August 2026

---

### 🚀 Introduction

"A containerized application is only as good as its deployment pipeline. True automation means bridging code, containers, and cloud with zero manual steps. 🚀"

Day 25 of #90DaysOfDevOps

Today, I took my CI/CD journey to the next level by building an **end-to-end multi-tier deployment pipeline**. Instead of simply validating code, this pipeline now handles the complete journey:

**Code → Test → Build → Push to Docker Hub → Deploy to AWS EC2 → Production**

---

### 📚 What I Learned
 
#### 📦 1. Containerization & Orchestration
Wired a multi-tier application (React frontend, Go backend, and Postgres database) using Docker and Docker Compose. This involved:
- Setting up the correct `docker-compose.yml` to be used in production.
- Using environment variable overrides passed securely from GitHub Actions to the EC2 server.

#### ⚙️ 2. Reusable Workflows & Security
Instead of writing one massive `main.yml` file, I designed modular GitHub Actions pipelines using **reusable workflows**.
- `ci.yml`: Runs tests and linters.
- `docker.yml`: Builds images and pushes them to Docker Hub.
- `cd.yml`: SSHs into the server and deploys the new images.

I used `secrets: inherit` to securely pass Docker Hub credentials (like `DOCKER_USERNAME` and `DOCKER_PASSWORD`) down through the nested workflow jobs.

**Example snippet calling a reusable workflow:**
```yaml
jobs:
  build-and-push:
    uses: ./.github/workflows/docker.yml
    secrets: inherit
```

#### ☁️ 3. Continuous Deployment (CD) on AWS EC2
Deploying to AWS required a robust script to handle the environment. 
- **Self-Hosted / Remote Runner Execution**: The CD pipeline securely connects to the AWS EC2 instance.
- **Automated Bootstrap Script**: The pipeline runs a script to install Docker and Docker Compose on the host VM if they aren't already present.
- **Silent Installations**: I prevented interactive prompts (like Ubuntu's `needrestart`) from hanging CI runs by setting `DEBIAN_FRONTEND=noninteractive` and environment flags under `sudo -E`.

**Deploy Script Logic (Snippet):**
```bash
# Pull the latest images from Docker Hub
docker compose pull

# Restart the services with the new images in detached mode
docker compose up -d
```
Instead of performing heavy, resource-intensive local compilation on a cheap/resource-limited EC2 VM, the EC2 instance simply pulls the pre-built `latest` tags from Docker Hub. This optimization is crucial for production speed.

#### 📊 4. Workflow Execution
Watching the workflow run was incredibly satisfying! The pipeline successfully ran lints/tests, pushed multi-stage frontend and backend images to Docker Hub, booted up/updated Docker on the EC2 runner, and updated the production stack with a single `docker compose up -d` in under a minute.

---

### 💡 Key Takeaway
 
Building a pipeline isn't just about making it work; it's about making it resilient and optimized. Shifting the build phase to GitHub's cloud runners and pulling pre-built images onto AWS EC2 turned what would have been a 30-minute compilation bottleneck into a 10-second deployment.

Looking forward to expanding this setup with SSL/TLS configurations, reverse proxy setups, and monitoring tools in the next phase!

---

### 🔗 Resources

- **GitHub Repository:** [Project Repo](https://lnkd.in/d5PdNcUc)

---

### 🔗 LinkedIn Post

"A containerized application is only as good as its deployment pipeline. True automation means bridging code, containers, and cloud with zero manual steps. 🚀"
🚀 Day 25 of #90DaysOfDevOps
Today, I took my CI/CD journey to the next level by building an end-to-end multi-tier deployment pipeline. Instead of simply validating code, this pipeline now handles the complete journey:

Code → Test → Build → Docker Images → Docker Hub → AWS EC2 → Production

📚 What I Learned
📦 Containerization & Orchestration
Wiring a multi-tier application (React frontend, Go backend, and Postgres database) using Docker and Docker Compose.
Understanding environment variable overrides and network isolation between containers.
⚙️ Reusable Workflows & Security
Designing modular GitHub Actions pipelines using reusable workflows (ci.yml calling docker.yml calling cd.yml).
Using secrets: inherit to securely pass Docker Hub credentials down through nested workflow jobs.
Upgrading build runtime parameters (Node.js 22) to avoid runner deprecation warnings.
☁️ Continuous Deployment (CD) on AWS EC2
Deploying on a self-hosted GitHub Actions runner running on an AWS EC2 instance.
Building an automated bootstrap script to install Docker and Docker Compose on the host VM if not already present.
Preventing interactive prompts (like Ubuntu's needrestart) from hanging CI runs by setting DEBIAN_FRONTEND=noninteractive and environment flags under sudo -E.
Optimizing deployment speeds by pulling pre-built tags (IMAGE_TAG=latest) from Docker Hub instead of performing heavy local compilation on a resource-limited EC2 VM.
📊 Workflow Execution
Watching the workflow run was incredibly satisfying! The pipeline successfully ran lints/tests, pushed multi-stage frontend and backend images to Docker Hub, booted up/updated Docker on the EC2 runner, and updated the production stack with a single docker compose up -d in under a minute.

💡 Key Takeaway
Building a pipeline isn't just about making it work; it's about making it resilient and optimized. Shifting the build phase to GitHub's cloud runners and pulling pre-built images onto AWS EC2 turned what would have been a 30-minute compilation bottleneck into a 10-second deployment.

📂 GitHub Repository: https://lnkd.in/d5PdNcUc
Looking forward to expanding this setup with SSL/TLS configurations, reverse proxy setups, and monitoring tools in the next phase!

#90DaysOfDevOps #GitHubActions #Docker #DockerCompose #AWS #EC2 #CI #CD #DevOps #Automation #ReactJS #Golang #SoftwareEngineering #CloudComputing #LearningInPublic #TrainWithShubham


---

[← Day 24](../day-24/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 26 →](../day-26/README.md)
