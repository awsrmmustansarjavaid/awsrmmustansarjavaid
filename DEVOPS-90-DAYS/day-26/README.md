# Day 26 — GitHub CLI, Branch Protection, CODEOWNERS & Pre-commit Hooks

[← Day 25](../day-25/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 27 →](../day-27/README.md)

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

- [ ] Automate GitHub with `gh`
- [ ] Protect main with rules and required checks
- [ ] Prevent bad commits locally with pre-commit

## 2. Prerequisites

- Days 22-25; `gh` installed and authenticated.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 gh CLI

`gh repo create`, `gh pr create/review/merge`, `gh issue`, `gh run watch`, `gh api` - scriptable GitHub from terminal.

### 3.2 Repository governance

Branch protection/rulesets: required reviews, status checks, signed commits, linear history, CODEOWNERS, Dependabot, secret scanning, push protection.

### 3.3 pre-commit

Framework running hooks (gitleaks, shellcheck, yamllint, ruff, end-of-file-fixer) before commit.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `gh auth login`; create repo and PR from CLI.
2. [ ] Enable branch protection/ruleset requiring 1 review and status checks.
3. [ ] Add `CODEOWNERS`.
4. [ ] Install pre-commit and add `.pre-commit-config.yaml` with gitleaks, shellcheck, yamllint, ruff.
5. [ ] Try to commit a fake AWS key and watch it get blocked.

## 5. Real-World Scenario

> A contractor pushed an API key to a public repo. Enable controls so it can't happen again and describe the response plan for the leaked key.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gh auth login
gh repo create devops-90-days --private --source=. --push
gh pr create --fill && gh pr checks && gh pr merge --squash --delete-branch
gh api repos/:owner/:repo/branches/main/protection
pip install pre-commit && pre-commit install && pre-commit run --all-files
echo 'AWS_KEY=AKIAIOSFODNN7EXAMPLE' > t.txt && git add t.txt && git commit -m test  # should be blocked
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 26 – GitHub CLI: Manage GitHub from Your Terminal — Challenge Brief

#### Task

Every time you switch to the browser to create a PR, check an issue, or manage a repo — you lose context. The **GitHub CLI (`gh`)** lets you do all of that without leaving your terminal. For DevOps engineers, this is essential — especially when you start automating workflows, scripting PR reviews, and managing repos at scale.

---

#### Expected Output
- A markdown file: `day-26-notes.md` with your observations and answers
- Add `gh` commands to your `git-commands.md`

---

#### Challenge Tasks

##### Task 1: Install and Authenticate
1. Install the GitHub CLI on your machine
2. Authenticate with your GitHub account
3. Verify you're logged in and check which account is active
4. Answer in your notes: What authentication methods does `gh` support?

---

##### Task 2: Working with Repositories
1. Create a **new GitHub repo** directly from the terminal — make it public with a README
2. Clone a repo using `gh` instead of `git clone`
3. View details of one of your repos from the terminal
4. List all your repositories
5. Open a repo in your browser directly from the terminal
6. Delete the test repo you created (be careful!)

---

##### Task 3: Issues
1. Create an issue on one of your repos from the terminal — give it a title, body, and a label
2. List all open issues on that repo
3. View a specific issue by its number
4. Close an issue from the terminal
5. Answer in your notes: How could you use `gh issue` in a script or automation?

---

##### Task 4: Pull Requests
1. Create a branch, make a change, push it, and create a **pull request** entirely from the terminal
2. List all open PRs on a repo
3. View the details of your PR — check its status, reviewers, and checks
4. Merge your PR from the terminal
5. Answer in your notes:
   - What merge methods does `gh pr merge` support?
   - How would you review someone else's PR using `gh`?

---

##### Task 5: GitHub Actions & Workflows (Preview)
1. List the workflow runs on any public repo that uses GitHub Actions
2. View the status of a specific workflow run
3. Answer in your notes: How could `gh run` and `gh workflow` be useful in a CI/CD pipeline?

(Don't worry if you haven't learned GitHub Actions yet — this is a preview for upcoming days)

---

##### Task 6: Useful `gh` Tricks
Explore and try these — add the ones you find useful to your `git-commands.md`:
1. `gh api` — make raw GitHub API calls from the terminal
2. `gh gist` — create and manage GitHub Gists
3. `gh release` — create and manage releases
4. `gh alias` — create shortcuts for commands you use often
5. `gh search repos` — search GitHub repos from the terminal

---

#### Hints
- `gh help` and `gh <command> --help` are your best friends
- Most `gh` commands work with `--repo owner/repo` to target a specific repo
- Use `--json` flag with most commands to get machine-readable output (useful for scripting)
- `gh pr create --fill` auto-fills the PR title and body from your commits

---

#### Submission
1. Add your `day-26-notes.md` to `2026/day-26/`
2. Update `git-commands.md` with `gh` commands — this completes your Git & GitHub reference from Days 22–26
3. Push to your fork

---

#### Learn in Public

Share your favorite `gh` commands or a screenshot of creating a PR from the terminal on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 26 – GitHub CLI: Manage GitHub from Your Terminal — Notes & Solution

#### 📌 Objective

Today I learned how to use GitHub CLI (gh) to manage GitHub repositories, issues, pull requests, GitHub Actions, Gists, releases and API calls directly from the terminal.

GitHub CLI is especially useful for DevOps because GitHub operations can be integrated into scripts and CI/CD automation without constantly switching to the browser.

---
#### Challenge Tasks

##### Task 1: Install and Authenticate
1. Install the GitHub CLI on your machine
2. Authenticate with your GitHub account
3. Verify you're logged in and check which account is active

<img width="1477" height="436" alt="Screenshot 2026-08-18 133001" src="https://github.com/user-attachments/assets/a7bc34e8-76c4-49a8-8a29-879a702a09bd" />
<img width="1487" height="133" alt="Screenshot 2026-08-18 133242" src="https://github.com/user-attachments/assets/6464e41a-bf45-4333-9ec8-534c86aa34c2" />
<img width="1533" height="817" alt="Screenshot 2026-08-18 135200" src="https://github.com/user-attachments/assets/30f3f6d4-2355-4f69-8e9c-62c7e81fb4fe" />

4. Answer in your notes: What authentication methods does `gh` support?
+ Browser-based OAuth
+ Personal Access Token (PAT)
+ SSH Key-based

---

##### Task 2: Working with Repositories
1. Create a **new GitHub repo** directly from the terminal — make it public with a README
<img width="1452" height="373" alt="Screenshot 2026-08-18 135958" src="https://github.com/user-attachments/assets/504f3099-b34c-4c45-a6b8-636e4f7e7612" />

<img width="1919" height="755" alt="Screenshot 2026-08-18 135903" src="https://github.com/user-attachments/assets/f2cc7faa-4a39-42ca-ad41-38721821e8ff" />

2. Clone a repo using `gh` instead of `git clone`
   
<img width="1351" height="347" alt="Screenshot 2026-08-18 140139" src="https://github.com/user-attachments/assets/ccdda5cf-2e72-4da8-8772-091b5d4fce20" />

3. View details of one of your repos from the terminal
<img width="1361" height="349" alt="Screenshot 2026-08-18 140219" src="https://github.com/user-attachments/assets/af887767-2b5c-44e5-89d9-b0e81d1fc44c" />

4. List all your repositories
<img width="1919" height="394" alt="Screenshot 2026-08-18 140300" src="https://github.com/user-attachments/assets/95777caf-ece4-4830-a014-b76c11ab9179" />

5. Open a repo in your browser directly from the terminal
<img width="1869" height="754" alt="Screenshot 2026-08-18 140335" src="https://github.com/user-attachments/assets/ab74d7d0-29ea-420f-83d6-7a351ac77356" />

6. Delete the test repo you created (be careful!)
<img width="1779" height="345" alt="Screenshot 2026-08-18 141142" src="https://github.com/user-attachments/assets/bef09bc6-2b0a-4ba4-9b18-d3526089de01" />

---

##### Task 3: Issues
1. Create an issue on one of your repos from the terminal — give it a title, body, and a label
<img width="1741" height="287" alt="Screenshot 2026-08-18 141508" src="https://github.com/user-attachments/assets/8aa05a07-3298-4389-8933-72f86e5e49ff" />
<img width="1916" height="557" alt="Screenshot 2026-08-18 141348" src="https://github.com/user-attachments/assets/93459fae-c965-4848-b0da-15423c1e2cd0" />

2. List all open issues on that repo
<img width="1459" height="203" alt="Screenshot 2026-08-18 141454" src="https://github.com/user-attachments/assets/5457a371-ca41-4720-bf65-40f0816cb5ea" />

3. View a specific issue by its number
4. Close an issue from the terminal
<img width="1288" height="168" alt="Screenshot 2026-08-18 141614" src="https://github.com/user-attachments/assets/81f1ab76-3b8d-4a43-8b25-728aec4b8cc7" />
<img width="1919" height="627" alt="Screenshot 2026-08-18 141634" src="https://github.com/user-attachments/assets/b2a9aca5-ceae-4355-ae2c-65ab432a08da" />

5. Answer in your notes: How could you use `gh issue` in a script or automation?
- By combining gh issue commands in a script,you can automatically:
        - Check open issues
        - Add comments
        - Close issues

    - Example:
        ```
        gh issue list --repo tejswini-maingade/day26-gh-cli-test
        gh issue comment 1 --repo tejswini-maingade/day26-gh-cli-test --body "Checked automatically."
        gh issue close 1 --repo tejswini-maingade/day26-gh-cli-test
        ```

  For Uninstall GITHUB from CLI

      ```winget uninstall GitHub.cli```
---

##### Task 4: Pull Requests
1. Create a branch, make a change, push it, and create a **pull request** entirely from the terminal
<img width="1919" height="831" alt="Screenshot 2026-08-18 143840" src="https://github.com/user-attachments/assets/816612a1-84c9-4d24-a567-33577bf5b386" />

2. List all open PRs on a repo
```gh pr list```

4. View the details of your PR — check its status, reviewers, and checks
<img width="1347" height="175" alt="Screenshot 2026-08-18 144632" src="https://github.com/user-attachments/assets/f3d01bba-28c1-4b24-9583-7e4891080183" />

5. Merge your PR from the terminal
<img width="1919" height="443" alt="Screenshot 2026-08-18 144608" src="https://github.com/user-attachments/assets/0477e44a-ea7e-498a-bf36-64710d5645eb" />


6. Answer in your notes:
   - What merge methods does `gh pr merge` support?
     + Merge Commit
     + Squash and Merge
     + Rebase and Merge

   - How would you review someone else's PR using `gh`?
     + ```gh pr review <PR-number>```
---

##### Task 5: GitHub Actions & Workflows (Preview)
1. List the workflow runs on any public repo that uses GitHub Actions
```gh run list --repo aws-containers/retail-store-sample-app```

2. View the status of a specific workflow run

<img width="1725" height="662" alt="Screenshot 2026-08-18 145322" src="https://github.com/user-attachments/assets/e4b73d49-164e-4c3a-aa6e-a74a7b458942" />
<img width="1788" height="423" alt="Screenshot 2026-08-18 145910" src="https://github.com/user-attachments/assets/f3e13162-e509-41a7-8317-bdf82cf4005f" />

3. Answer in your notes: How could `gh run` and `gh workflow` be useful in a CI/CD pipeline?
```gh run``` : Monitoring and Troubleshooting
+ gh run is focused on the execution of your pipelines. It is the command-line equivalent of the "Actions" tab in your browser.

```gh workflow``` : Management and Manual Control
+ gh workflow focuses on the definition and triggering of the pipelines. This is where you manage the "logic" of your CI/CD.

---

#### 🧠 Key Learnings
GitHub CLI allows me to:
🔐 Authenticate with GitHub
📦 Create and clone repositories
🔎 View and search repositories
🐛 Create and manage issues
🔀 Create, review and merge pull requests
⚙️ Monitor GitHub Actions
🔌 Access the GitHub API
📝 Manage Gists
🚀 Manage releases
⚡ Create command aliases
#### Most useful commands learned
- gh auth status
- gh repo create
- gh repo clone
- gh repo view
- gh repo list
- gh issue create
- gh issue list
- gh issue view
- gh issue close
- gh pr create
- gh pr list
- gh pr view

#### 🎯 DevOps Takeaway

The biggest takeaway from Day 26 is that GitHub does not have to be managed only through the browser.

With GitHub CLI, many GitHub operations can be performed directly from the terminal and integrated into scripts, automation and CI/CD pipelines.

This makes gh a valuable tool for DevOps engineers working with repositories, pull requests, issues and GitHub Actions at scale.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add Dependabot config (`.github/dependabot.yml`). | You can demonstrate, without notes: *automate GitHub with `gh`* — with evidence committed to `day-26/`. |
| 2 | Add SECURITY.md. | You can demonstrate, without notes: *protect main with rules and required checks* — with evidence committed to `day-26/`. |
| 3 | Document your secret-leak response runbook. | You can demonstrate, without notes: *prevent bad commits locally with pre-commit* — with evidence committed to `day-26/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cannot push to main | Branch protection working - open a PR. |
| Hook too slow | Limit to changed files; use `stages`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Enable secret scanning + push protection, require signed commits/2FA, least-privilege tokens, immediate rotation for leaked secrets.
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

1. What is branch protection?
2. What is CODEOWNERS?
3. How do pre-commit hooks help?
4. What to do when a secret leaks?
5. **Scenario:** A contractor pushed an API key to a public repo. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I automate a PR via CLI? | ☐ | ☐ | ☐ | ☐ |
| Can I block secrets locally? | ☐ | ☐ | ☐ | ☐ |
| Can I protect main? | ☐ | ☐ | ☐ | ☐ |
| Automate GitHub with `gh` | ☐ | ☐ | ☐ | ☐ |
| Protect main with rules and required checks | ☐ | ☐ | ☐ | ☐ |
| Prevent bad commits locally with pre-commit | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-26/` in your own repository:

```text
day-26/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-26
git add day-26/
git commit -m "day-26: github cli, branch protection, codeowners & pre-commit hooks"
git push -u origin day-26
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

## 18. Personal Learning Journal — 🔄 Day 26 - Weekly Revision: Containerization & CI/CD Pipelines

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

09 August 2026

---

### 🚀 Introduction

Today, I took a step back to **revise and solidify** all the advanced containerization, orchestration, and automation concepts I've learned from Day 20 to Day 25. 

Revision is key to long-term retention. Reviewing the entire workflow—from a simple Docker container to a fully automated CI/CD deployment on AWS—helped connect the dots and deepen my understanding of real-world DevOps pipelines. 

By seeing the "big picture" of how Docker, Compose, GitHub Actions, and AWS interact, I can now design scalable deployment systems from scratch.

---

### 📚 What I Revised

#### 🐳 1. Advanced Docker & Containerization (Days 20, 21, 23)
- **3-Tier Microservices:** Containerizing frontend, backend, and database logic independently. Using Docker networks to allow them to communicate via internal DNS resolution.
- **Multi-Stage Builds:** Using `builder` stages to compile code (e.g., in Golang or React) and `runner` stages to execute the compiled artifacts. This strategy shrinks images drastically (e.g., squashing an 800MB Golang image down to a 3.86MB Alpine image).
- **Container Security & DevSecOps:** Enforcing non-root user permissions inside Dockerfiles (`USER appuser`), choosing distroless or unprivileged base images (like NGINX unprivileged), and scanning images for CVEs using **Docker Scout**.

#### 🐙 2. Orchestration with Docker Compose (Day 22)
- Transitioning from long, complex `docker run` commands to declarative `docker-compose.yml` configurations.
- Using `depends_on` with `condition: service_healthy` to ensure containers start in the exact correct order (e.g., backend waits for Postgres to be fully ready to accept connections).
- Mounting named volumes (`postgres_data:/var/lib/postgresql/data`) so database records survive container restarts.
- Passing sensitive configuration via `.env` files rather than hardcoding.

#### 🚀 3. CI/CD Automation & GitHub Actions (Days 24, 25)
- **CI Pipelines:** Setting up GitHub Actions triggers (`on: push`) to automatically checkout code, configure runners (Ubuntu), install dependencies, and run tests on every commit.
- **CD Pipelines & End-to-End Deployment:** Orchestrating a complete flow: **Code → Test → Build → Push to Docker Hub → SSH into AWS EC2 → Deploy via Docker Compose**.
- Using **Reusable Workflows** (`ci.yml -> docker.yml -> cd.yml`) to keep pipeline code DRY (Don't Repeat Yourself) and modular.
- Overcoming EC2 resource limitations by building images on powerful GitHub-hosted runners and instructing the lightweight EC2 instance to merely pull and run the final image.

---

### 💡 Key Takeaway

Automation and optimization compound! What starts as a simple Dockerfile grows into a powerful, automated pipeline that validates, builds, and deploys scalable applications seamlessly. Reviewing these steps has given me the confidence to handle robust, production-ready infrastructures. The transition from manual terminal commands to fully automated GitOps pipelines is what separates a developer from a true DevOps engineer.

---

### 🔗 LinkedIn Post

"Repetition is the mother of learning, the father of action, which makes it the architect of accomplishment." 🔄🚀

Day 26 of #90DaysOfDevOps ✅

Today, I took a step back to revise and solidify all the concepts I learned over the past week. Moving fast is great, but taking the time to review ensures these skills stick for the long term! 🧠

📚 Here's what I reviewed:
🐳 Advanced Docker: Multi-stage builds, minimal image sizing, and containerizing 3-tier microservices.
🛡️ DevSecOps & Image Security: Hardening images, running as non-root, and auditing vulnerabilities with Docker Scout.
🐙 Docker Compose: Orchestrating multi-container setups, configuring explicit health checks, managing dependencies, and data persistence.
🚀 CI/CD with GitHub Actions: Writing workflows, jobs, and steps to automate testing, building, and pushing Docker images.
☁️ Automated Cloud Deployment: Building an end-to-end pipeline to deploy a full-stack application onto an AWS EC2 instance without manual intervention!

Connecting all these dots—from writing the first Dockerfile to watching an automated pipeline deploy the app in seconds—has been an incredible learning experience. 

Automation and optimization compound! I'm feeling far more confident in building scalable, production-ready deployments. 🚀

#90DaysOfDevOps #DevOps #Docker #DockerCompose #GitHubActions #CICD #AWS #CloudComputing #Containerization #Microservices #LearningInPublic #TrainWithShubham

## 19. Challenge Notes — Day 26: Kubernetes Volumes, ConfigMaps, and Secrets

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

[![](https://img.youtube.com/vi/Qc60pavEJFw/0.jpg)](https://www.youtube.com/watch?v=Qc60pavEJFw)

[Watch the video](https://www.youtube.com/watch?v=Qc60pavEJFw)


#### 🎯 Objectives
- Understand the concept of Kubernetes Volumes and their types.
- Learn how to use ConfigMaps for configuration management.
- Explore Secrets to manage sensitive data securely.

---

#### 📦 Kubernetes Volumes

Volumes in Kubernetes are used to persist data across container restarts.

##### Why Volumes?
- Containers are ephemeral.
- Data stored inside a container is lost if the container crashes or is restarted.
- Volumes allow data to be shared among containers in a pod and persist beyond container life.

##### Common Volume Types:
- `emptyDir`: For temporary scratch space shared between containers.
- `hostPath`: Maps a file or directory from the host node's filesystem into the Pod.
- `persistentVolumeClaim` (PVC): Used to request storage from a PersistentVolume.

##### Example: `emptyDir`
```yaml
volumes:
  - name: cache-volume
    emptyDir: {}
```

---

#### ⚙️ ConfigMaps

ConfigMaps are used to inject configuration data into Pods.

##### Use Cases:
- Store non-sensitive configuration values (e.g., environment variables, command-line arguments).
- Decouple configuration from application code.

##### Create ConfigMap:
```bash
kubectl create configmap app-config --from-literal=APP_MODE=production
```

##### Mount into Pod:
```yaml
envFrom:
  - configMapRef:
      name: app-config
```

---

#### 🔐 Secrets

Secrets are similar to ConfigMaps but intended for sensitive data like passwords, tokens, or keys.

##### Key Characteristics:
- Stored in base64-encoded format (not encrypted by default).
- Must be accessed securely with RBAC and proper usage patterns.

##### Create a Secret:
```bash
kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=secret123
```

##### Use in Pod:
```yaml
env:
  - name: DB_USER
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: username
```

---

#### 🔐 Security Note

While Secrets are stored base64-encoded, this is **not secure encryption**. Use Kubernetes RBAC and tools like HashiCorp Vault for enhanced security in production.

---

#### ✅ Summary

- Volumes persist data beyond container life.
- ConfigMaps allow external configuration of applications.
- Secrets manage sensitive data with base64 encoding (and should be protected properly).

---

### Attachments

- [Kubernetes Volumes, ConfigMaps, and Secrets.pdf](Kubernetes%20Volumes%2C%20ConfigMaps%2C%20and%20Secrets.pdf)

## 20. Cohort Practice — Day 26: GitHub CLI: Manage GitHub from Your Terminal

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

Every time you switch to the browser to create a PR, check an issue, or manage a repo — you lose context. The **GitHub CLI (`gh`)** lets you do all of that without leaving your terminal. For DevOps engineers, this is essential — especially when you start automating workflows, scripting PR reviews, and managing repos at scale.

---

#### Expected Output
- A markdown file: `day-26-notes.md` with your observations and answers
- Add `gh` commands to your `git-commands.md`

---

#### Challenge Tasks

##### Task 1: Install and Authenticate
1. Install the GitHub CLI on your machine
2. Authenticate with your GitHub account
3. Verify you're logged in and check which account is active
4. Answer in your notes: What authentication methods does `gh` support?

---

##### Task 2: Working with Repositories
1. Create a **new GitHub repo** directly from the terminal — make it public with a README
2. Clone a repo using `gh` instead of `git clone`
3. View details of one of your repos from the terminal
4. List all your repositories
5. Open a repo in your browser directly from the terminal
6. Delete the test repo you created (be careful!)

---

##### Task 3: Issues
1. Create an issue on one of your repos from the terminal — give it a title, body, and a label
2. List all open issues on that repo
3. View a specific issue by its number
4. Close an issue from the terminal
5. Answer in your notes: How could you use `gh issue` in a script or automation?

---

##### Task 4: Pull Requests
1. Create a branch, make a change, push it, and create a **pull request** entirely from the terminal
2. List all open PRs on a repo
3. View the details of your PR — check its status, reviewers, and checks
4. Merge your PR from the terminal
5. Answer in your notes:
   - What merge methods does `gh pr merge` support?
   - How would you review someone else's PR using `gh`?

---

##### Task 5: GitHub Actions & Workflows (Preview)
1. List the workflow runs on any public repo that uses GitHub Actions
2. View the status of a specific workflow run
3. Answer in your notes: How could `gh run` and `gh workflow` be useful in a CI/CD pipeline?

(Don't worry if you haven't learned GitHub Actions yet — this is a preview for upcoming days)

---

##### Task 6: Useful `gh` Tricks
Explore and try these — add the ones you find useful to your `git-commands.md`:
1. `gh api` — make raw GitHub API calls from the terminal
2. `gh gist` — create and manage GitHub Gists
3. `gh release` — create and manage releases
4. `gh alias` — create shortcuts for commands you use often
5. `gh search repos` — search GitHub repos from the terminal

---

#### Hints
- `gh help` and `gh <command> --help` are your best friends
- Most `gh` commands work with `--repo owner/repo` to target a specific repo
- Use `--json` flag with most commands to get machine-readable output (useful for scripting)
- `gh pr create --fill` auto-fills the PR title and body from your commits

---

#### Submission
1. Add your `day-26-notes.md` to `2026/day-26/`
2. Update `git-commands.md` with `gh` commands — this completes your Git & GitHub reference from Days 22–26
3. Push to your fork

---

#### Learn in Public

Share your favorite `gh` commands or a screenshot of creating a PR from the terminal on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 21. Hands-on Project — Day 26: Route53 DNS Records (CloudFront + optional ALB)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Amazon Route 53 DNS** — creating public hosted zones and records that point your domains to **CloudFront** (Day 25) and optionally to an **ALB** (Day 18). We’ll cover **A/AAAA Alias**, **CNAME**, and **TXT** (verification) records, with a clean, repeatable Terraform module.

---

#### 🎯 Learning Goals
- Create or reuse a **public hosted zone**.
- Publish **A/AAAA alias** records for **CloudFront** (apex and/or subdomain).
- (Optional) Publish **A/AAAA alias** records for an **ALB** (e.g., `api.example.com`).
- Manage **TXT** verification records (e.g., ACM/Email/Google Site Verification).

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (replace with your values)
terraform -chdir=terraform plan   -var='domain_name=example.com'   -var='create_zone=false'   -var='zone_id=Z123EXAMPLE'   -var='site_subdomain="www"'   -var='cloudfront_domain_name=d111111abcdef8.cloudfront.net'   -var='root_apex_alias=true'

# 3) Apply
terraform -chdir=terraform apply -auto-approve

# 4) Verify
# - Check Route53 → Hosted Zones → Records
# - Resolve DNS locally
dig +short www.example.com
```

> **Tip**: CloudFront’s hosted zone ID is generally `Z2FDTNDATAQYW2` (provided as default here), but you can override with `cloudfront_zone_id` to be explicit.

**Optional ALB example**
```bash
terraform -chdir=terraform plan   -var='create_alb_record=true'   -var='alb_subdomain="api"'   -var='alb_dns_name=day18-alb-123456.us-east-1.elb.amazonaws.com'   -var='alb_zone_id=Z35SXDOTRQ7X7K'  # from your ALB attributes
```

**TXT verification records**
```bash
terraform -chdir=terraform plan   -var='txt_records={"_amazonses.example.com"="random-token","@"]="v=spf1 include:amazonses.com ~all"}'
```

---

#### 💡 Challenge
- Add **weighted** or **latency-based** records for active/active across regions.  
- Use **failover** alias to a static maintenance page on S3/CloudFront.  
- Wire **ACM DNS validation** records via Terraform (if issuing a new cert).

---

#### ✅ Checklist
- [ ] Hosted zone exists and is **authoritative** for your domain (NS updated at registrar)  
- [ ] **A/AAAA alias** records resolve to CloudFront within minutes (TTL)  
- [ ] Optional **ALB** `api.` subdomain resolves correctly  
- [ ] TXT verification records present (SPF/ACM/etc.)

---

#### 📌 Commit
```bash
git add day26-route53-dns-records
git commit -m "day26: Route53 DNS — hosted zone + CloudFront/ALB aliases + TXT records"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 25](../day-25/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 27 →](../day-27/README.md)
