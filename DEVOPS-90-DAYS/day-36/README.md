# Day 36 — CI/CD Concepts & Your First GitHub Actions Workflow

[← Day 35](../day-35/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 37 →](../day-37/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain CI, Continuous Delivery and Continuous Deployment
- [ ] Design a basic pipeline
- [ ] Write and run your first Actions workflow

## 2. Prerequisites

- Days 22-27, 31.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 CI/CD

CI: merge small changes often, build and test automatically. CD (delivery): every change is releasable; CD (deployment): releases to production automatically. Goal: fast, reliable feedback.

### 3.2 Pipeline anatomy

Trigger -> checkout -> setup -> lint -> test -> build -> scan -> package -> publish -> deploy -> verify. Fail fast and cache.

### 3.3 GitHub Actions

Workflows in `.github/workflows/*.yml`; events, jobs, steps, runners, actions (`uses:`). Pin third-party actions to commit SHAs.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `.github/workflows/ci.yml` triggered on push and PR.
2. [ ] Add steps: checkout, setup-python, install, lint, test.
3. [ ] Break a test intentionally; watch it fail; fix.
4. [ ] View logs and re-run a job with `gh run`.
5. [ ] Add a status badge to README.

## 5. Real-World Scenario

> Developers merge broken code to main weekly. Add automatic quality gates so a broken PR cannot be merged.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
name: ci
on: { push: { branches: [main] }, pull_request: {} }
permissions: { contents: read }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12', cache: pip }
      - run: pip install -r requirements.txt
      - run: ruff check . && pytest -q
# CLI
gh run list; gh run watch; gh run view --log-failed
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 36 – Docker Project: Dockerize a Full Application

#### Task
Today's goal is to **take a real application and Dockerize it end-to-end**.

No tutorials. No hand-holding. Pick an app, write the Dockerfile, set up Compose, and ship it. This is what you'll do on the job.

---

#### Expected Output
- A markdown file: `day-36-docker-project.md`
- Complete project with Dockerfile, docker-compose.yml, and app code
- Image pushed to Docker Hub

---


#### Challenge Tasks

##### Task 1: Pick Your App
Choose **one** of these (or use your own project):
- A **Python Flask/Django** app with a database
- A **Node.js Express** app with MongoDB
- A **static website** served by Nginx with a backend API
- Any app from your GitHub that doesn't have Docker yet

If you don't have an app, clone a simple open-source one and Dockerize it.

---

##### Task 2: Write the Dockerfile
1. Create a Dockerfile for your application
2. Use a **multi-stage build** if applicable
3. Use a **non-root user**
4. Keep the image **small** — use alpine or slim base images
5. Add a `.dockerignore` file

Build and test it locally.

---

##### Task 3: Add Docker Compose
Write a `docker-compose.yml` that includes:
1. Your **app** service (built from Dockerfile)
2. A **database** service (Postgres, MySQL, MongoDB — whatever your app needs)
3. **Volumes** for database persistence
4. A **custom network**
5. **Environment variables** for configuration (use `.env` file)
6. **Healthchecks** on the database

Run `docker compose up` and verify everything works together.

---

##### Task 4: Ship It
1. Tag your app image
2. Push it to Docker Hub
3. Share the Docker Hub link
4. Write a `README.md` in your project with:
   - What the app does
   - How to run it with Docker Compose
   - Any environment variables needed

---

##### Task 5: Test the Whole Flow
1. Remove all local images and containers
2. Pull from Docker Hub and run using only your compose file
3. Does it work fresh? If not — fix it until it does

---

#### Documentation
Create `day-36-docker-project.md` with:
- What app you chose and why
- Your Dockerfile (with comments explaining each line)
- Challenges you faced and how you solved them
- Final image size
- Docker Hub link

---

#### Submission
1. Add all project files and `day-36-docker-project.md` to `2026/day-36/`
2. Commit and push to your fork

---

#### Learn in Public
Share your Dockerized project on LinkedIn — include the Docker Hub link so others can pull and run it.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add required status check in branch protection. | You can demonstrate, without notes: *explain CI, Continuous Delivery and Continuous Deployment* — with evidence committed to `day-36/`. |
| 2 | Draw your pipeline diagram. | You can demonstrate, without notes: *design a basic pipeline* — with evidence committed to `day-36/`. |
| 3 | Measure pipeline duration and list 3 speed-ups. | You can demonstrate, without notes: *write and run your first Actions workflow* — with evidence committed to `day-36/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Workflow does not trigger | Wrong path/branch filters or YAML invalid; check Actions tab. |
| `Resource not accessible by integration` | Grant needed `permissions:` explicitly. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Set minimal `permissions:` at workflow top; pin actions by SHA; never echo secrets.
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

1. CI vs CD vs CD?
2. What is a runner?
3. Why least-privilege permissions?
4. Why fail fast?
5. **Scenario:** Developers merge broken code to main weekly. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a CI workflow? | ☐ | ☐ | ☐ | ☐ |
| Can I require it on PRs? | ☐ | ☐ | ☐ | ☐ |
| Can I debug a failed run? | ☐ | ☐ | ☐ | ☐ |
| Explain CI, Continuous Delivery and Continuous Deployment | ☐ | ☐ | ☐ | ☐ |
| Design a basic pipeline | ☐ | ☐ | ☐ | ☐ |
| Write and run your first Actions workflow | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-36/` in your own repository:

```text
day-36/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-36
git add day-36/
git commit -m "day-36: ci/cd concepts & your first github actions workflow"
git push -u origin day-36
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 36: GitHub Actions Introduction

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 36** of the DevOps 90-Day Challenge!
Yesterday, you learned how to write **Jenkinsfiles** and automate pipelines with Jenkins.
Today, you’ll start with **GitHub Actions** — GitHub’s native CI/CD system.

[![](https://img.youtube.com/vi/9_S2T4Wnagk/0.jpg)](https://www.youtube.com/watch?v=9_S2T4Wnagk)

[Watch the video](https://www.youtube.com/watch?v=9_S2T4Wnagk)

---

#### Objective

By the end of this session, you will:

* Understand what **GitHub Actions** are.
* Learn the basic structure of a **workflow**.
* Automate your first workflow (build + test).

---

#### Tools Used

* **GitHub Repository**
* **GitHub Actions** (built-in CI/CD tool)
* **YAML workflow files**

---

#### Project Structure

```bash
myapp/
 ├── .github/
 │    └── workflows/
 │         └── ci.yml
 ├── app.py
 ├── requirements.txt
 └── tests/
      └── test_app.py
```

---

#### Step-by-Step Guide

##### 1. Create Workflow File

Inside your repo, create:

**`.github/workflows/ci.yml`**

```yaml
name: CI Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'

    - name: Install Dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    - name: Run Tests
      run: pytest
```

---

##### 2. Commit and Push

```bash
git add .github/workflows/ci.yml
git commit -m "Added GitHub Actions workflow"
git push origin main
```

---

##### 3. Check Workflow Execution

* Go to **GitHub → Your Repo → Actions tab**
* See pipeline running automatically on **push**

---

#### Verification

* Code is checked out.
* Dependencies installed.
* Tests executed successfully.

---

#### Bonus (Extra Learning)

* Add **matrix builds** (Python 3.8, 3.9, 3.10).
* Trigger workflows on **schedule** (cron jobs).
* Use **Marketplace Actions** (e.g., linting, Docker builds).

---

#### Key Concepts Applied

| Concept       | Example Used                    |
| ------------- | ------------------------------- |
| Workflow      | `.github/workflows/ci.yml` file |
| Event Trigger | On push & pull\_request         |
| Job + Runner  | `runs-on: ubuntu-latest`        |
| Steps         | Checkout, Setup Python, Test    |

---

#### Congratulations!

You have successfully created your **first GitHub Actions workflow**
Now, you can use GitHub Actions to **automate builds, tests, and deployments** directly in your repos.

---

#### Try These Next

* Add a **linter check** (flake8).
* Add **build artifact upload** (test reports).
* Add **Docker build & push** step.

## 19. Cohort Practice — Day 36: Docker Project: Dockerize a Full Application

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **take a real application and Dockerize it end-to-end**.

No tutorials. No hand-holding. Pick an app, write the Dockerfile, set up Compose, and ship it. This is what you'll do on the job.


-----------------

#### Expected Output


- A markdown file: `day-36-docker-project.md`
- Complete project with Dockerfile, docker-compose.yml, and app code
- Image pushed to Docker Hub



--------------------

#### Challenge Tasks

##### Task 1: Pick Your App
Choose **one** of these (or use your own project):
- A **Python Flask/Django** app with a database
- A **Node.js Express** app with MongoDB
- A **static website** served by Nginx with a backend API
- Any app from your GitHub that doesn't have Docker yet

If you don't have an app, clone a simple open-source one and Dockerize it.

---

##### Task 2: Write the Dockerfile
1. Create a Dockerfile for your application
2. Use a **multi-stage build** if applicable
3. Use a **non-root user**
4. Keep the image **small** — use alpine or slim base images
5. Add a `.dockerignore` file

Build and test it locally.

---

##### Task 3: Add Docker Compose
Write a `docker-compose.yml` that includes:
1. Your **app** service (built from Dockerfile)
2. A **database** service (Postgres, MySQL, MongoDB — whatever your app needs)
3. **Volumes** for database persistence
4. A **custom network**
5. **Environment variables** for configuration (use `.env` file)
6. **Healthchecks** on the database

Run `docker compose up` and verify everything works together.

---

##### Task 4: Ship It
1. Tag your app image
2. Push it to Docker Hub
3. Share the Docker Hub link
4. Write a `README.md` in your project with:
   - What the app does
   - How to run it with Docker Compose
   - Any environment variables needed

---

##### Task 5: Test the Whole Flow
1. Remove all local images and containers
2. Pull from Docker Hub and run using only your compose file
3. Does it work fresh? If not — fix it until it does

---

#### Documentation
Create `day-36-docker-project.md` with:
- What app you chose and why
- Your Dockerfile (with comments explaining each line)
- Challenges you faced and how you solved them
- Final image size
- Docker Hub link

---

#### Submission
1. Add all project files and `day-36-docker-project.md` to `2026/day-36/`
2. Commit and push to your fork

---

#### Learn in Public
Share your Dockerized project on LinkedIn — include the Docker Hub link so others can pull and run it.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 36: Docker Build + Push to ECR

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Focus: Dockerize a small Flask app and push to AWS ECR via Jenkins.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [docker/Dockerfile](files/hands-on-projects/docker/Dockerfile)
- [docker/app.py](files/hands-on-projects/docker/app.py)
- [docker/requirements.txt](files/hands-on-projects/docker/requirements.txt)
- [scripts/build.sh](files/hands-on-projects/scripts/build.sh)
- [scripts/login_ecr.sh](files/hands-on-projects/scripts/login_ecr.sh)
- [scripts/push.sh](files/hands-on-projects/scripts/push.sh)


---

[← Day 35](../day-35/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 37 →](../day-37/README.md)
