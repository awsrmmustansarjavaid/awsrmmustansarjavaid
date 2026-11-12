# Day 39 — Build & Push Docker Images in CI; Reusable Workflows

[← Day 38](../day-38/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 40 →](../day-40/README.md)

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

- [ ] Automate build, scan and push of images
- [ ] Create reusable workflows and composite actions
- [ ] Tag images by commit and release

## 2. Prerequisites

- Days 34-38.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Docker in Actions

`docker/setup-buildx-action`, `docker/login-action`, `docker/build-push-action` with GHA cache, multi-arch builds, metadata-action for tags/labels.

### 3.2 Scan in pipeline

Trivy action fails on CRITICAL; upload SARIF to code scanning.

### 3.3 Reuse

`workflow_call` reusable workflows and composite actions remove duplication across repos.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a workflow to build and push to GHCR on main and tags.
2. [ ] Use `docker/metadata-action` for tags (`sha`, `semver`).
3. [ ] Add Trivy scan step that fails on CRITICAL.
4. [ ] Extract build logic into a reusable workflow `.github/workflows/docker.yml` with inputs.
5. [ ] Call it from two repos/apps.

## 5. Real-World Scenario

> Five teams copy-pasted slightly different Docker workflows. Create one organisation-wide reusable workflow with security gates.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
on: { push: { branches: [main], tags: ['v*'] } }
jobs:
  image:
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write, security-events: write }
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with: { registry: ghcr.io, username: ${{ github.actor }}, password: ${{ secrets.GITHUB_TOKEN }} }
      - id: meta
        uses: docker/metadata-action@v5
        with: { images: ghcr.io/${{ github.repository }}, tags: "type=sha\ntype=semver,pattern={{version}}" }
      - uses: docker/build-push-action@v6
        with: { push: true, tags: "${{ steps.meta.outputs.tags }}", cache-from: type=gha, cache-to: type=gha,mode=max }
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 39 – What is CI/CD? — Challenge Brief

#### Task
Before writing a single pipeline, understand **why CI/CD exists** and what it actually does.

Today is a research and diagram day — no pipelines yet. Get the concepts right first.

---

#### Expected Output
- A markdown file: `day-39-cicd-concepts.md`
- A pipeline diagram (hand-drawn or text-based)

---

#### Challenge Tasks

##### Task 1: The Problem
Think about a team of 5 developers all pushing code to the same repo manually deploying to production.

Write in your notes:
1. What can go wrong?
2. What does "it works on my machine" mean and why is it a real problem?
3. How many times a day can a team safely deploy manually?

---

##### Task 2: CI vs CD
Research and write short definitions (2-3 lines each):
1. **Continuous Integration** — what happens, how often, what it catches
2. **Continuous Delivery** — how it's different from CI, what "delivery" means
3. **Continuous Deployment** — how it differs from Delivery, when teams use it

Write one real-world example for each.

---

##### Task 3: Pipeline Anatomy
A pipeline has these parts — write what each one does:
- **Trigger** — what starts the pipeline
- **Stage** — a logical phase (build, test, deploy)
- **Job** — a unit of work inside a stage
- **Step** — a single command or action inside a job
- **Runner** — the machine that executes the job
- **Artifact** — output produced by a job

---

##### Task 4: Draw a Pipeline
Draw a CI/CD pipeline for this scenario:
> A developer pushes code to GitHub. The app is tested, built into a Docker image, and deployed to a staging server.

Include at least 3 stages. Hand-drawn and photographed is perfectly fine.

---

##### Task 5: Explore in the Wild
1. Open any popular open-source repo on GitHub (Kubernetes, React, FastAPI — pick one you know)
2. Find their `.github/workflows/` folder
3. Open one workflow YAML file
4. Write in your notes:
   - What triggers it?
   - How many jobs does it have?
   - What does it do? (best guess)

---

#### Hints
- CI/CD is a practice, not just a tool
- GitHub Actions, Jenkins, GitLab CI, CircleCI — all are tools that implement CI/CD
- A pipeline failing is not a problem — it's CI/CD doing its job

---

#### Documentation
Create `day-39-cicd-concepts.md` with:
- Your CI vs CD vs CD definitions
- Pipeline anatomy notes
- Your pipeline diagram
- What you found in the open-source repo

---

#### Submission
1. Add your `day-39-cicd-concepts.md` to `2026/day-39/`
2. Commit and push to your fork

---

#### Learn in Public
Share your pipeline diagram on LinkedIn — even a rough hand-drawn one gets engagement.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀Day 39 – What is CI/CD? — Notes & Solution

#### 📋Task

CI/CD is a software development practice that helps teams integrate code frequently, test it automatically, and deliver or deploy software reliably.

CI/CD is not a single tool. Tools such as GitHub Actions, Jenkins, GitLab CI/CD, and CircleCI can be used to implement CI/CD practices.

---

#### 🧩Task 1: The Problem

Imagine a team of 5 developers working on the same application and manually deploying code to production.

#### ⚠️1. What can go wrong?

Several problems can occur:

* Developers may overwrite or conflict with each other's changes.
* Bugs can reach production because testing is done manually.
* A developer may forget an important deployment step.
* Different developers may use different environments or software versions.
* Manual deployments are slow and error-prone.
* Configuration differences can cause production failures.
* Rollbacks can be difficult.
* It becomes difficult to know which code version is running in production.
* Deployments become stressful, especially when done frequently.

#### 💡2. What does "It works on my machine" mean?

"It works on my machine" means that an application works correctly in one developer's environment but fails in another environment such as testing or production.

This can happen because of differences in:

* Operating system
* Programming language version
* Libraries and dependencies
* Environment variables
* Configuration
* Database versions
* Installed tools

CI/CD helps reduce this problem by automatically building and testing the application in a consistent environment.

#### 🚀3. How many times a day can a team safely deploy manually?

There is no fixed safe number.

However, manual deployments become increasingly risky and inefficient as deployment frequency increases.

A team may manually deploy once or a few times per day, but frequent deployments are better handled through automation.

The goal of CI/CD is to make deployments repeatable, automated, and reliable.

---

#### 🔄Task 2: CI vs CD

#### 1. Continuous Integration (CI)

Continuous Integration means developers frequently merge or push their code changes into a shared repository.

Each change can automatically trigger a build and automated tests.

CI helps detect bugs, integration problems, and broken builds early.

##### Real-world example

A developer pushes code to GitHub. GitHub Actions automatically:

1. Checks out the code.
2. Installs dependencies.
3. Builds the application.
4. Runs unit tests.

If the tests fail, the team knows that the new change has a problem.

---

#### 2. Continuous Delivery

Continuous Delivery means keeping software in a deployable state by automatically building, testing, and preparing it for release.

The important difference is that deployment to production usually requires a manual approval or decision.

##### Real-world example

A developer pushes code to GitHub.

The pipeline:

1. Builds the application.
2. Runs tests.
3. Creates a Docker image.
4. Deploys the application to staging.
5. Waits for approval before production deployment.

The software is always ready to be deployed, but production deployment is manually approved.

---

#### 3. Continuous Deployment

Continuous Deployment goes one step further than Continuous Delivery.

Every change that successfully passes the automated pipeline is automatically deployed to production without a manual approval step.

##### Real-world example

A developer pushes code to GitHub.

The pipeline:

1. Builds the application.
2. Runs automated tests.
3. Builds a Docker image.
4. Deploys to staging.
5. Runs validation tests.
6. Automatically deploys to production.

This approach is useful for teams that have strong automated testing, monitoring, and rollback mechanisms.

---

#### CI vs Continuous Delivery vs Continuous Deployment

| Practice               | Build | Test | Production Deployment |
| ---------------------- | ----- | ---- | --------------------- |
| Continuous Integration | Yes   | Yes  | No                    |
| Continuous Delivery    | Yes   | Yes  | Manual approval       |
| Continuous Deployment  | Yes   | Yes  | Automatic             |

---

#### 🧩Task 3: Pipeline Anatomy

#### Trigger

A trigger is an event that starts the pipeline.

Examples:

* Git push
* Pull request
* Scheduled time
* Manual execution
* Release/tag creation

---

#### Stage

A stage is a logical phase of a pipeline.

Examples:

* Build
* Test
* Security Scan
* Deploy

A stage can contain one or more jobs.

---

#### Job

A job is a unit of work inside a stage.

For example, a Test stage could contain:

* Unit test job
* Integration test job

Jobs may run sequentially or in parallel depending on the pipeline design.

---

#### Step

A step is an individual command or action inside a job.

Examples:

```bash
npm install
```

```bash
npm test
```

```bash
docker build -t myapp .
```

---

#### Runner

A runner is the machine or execution environment that runs the jobs and steps.

Examples:

* GitHub-hosted runner
* Jenkins agent
* Self-hosted Linux server

---

#### Artifact

An artifact is an output produced by a build or job that can be stored and used by later stages.

Examples:

* JAR file
* ZIP package
* Docker image
* Test report
* Build files

---

#### 🔀Task 4: CI/CD Pipeline Diagram

Scenario:

A developer pushes code to GitHub. The application is tested, built into a Docker image, and deployed to a staging server.

```text
                  Developer
                      |
                      | git push
                      v
               +--------------+
               |    GitHub    |
               +--------------+
                      |
                      | Trigger
                      v
        +---------------------------+
        |       BUILD STAGE         |
        |---------------------------|
        | Checkout Code             |
        | Install Dependencies      |
        | Build Application         |
        +---------------------------+
                      |
                      v
        +---------------------------+
        |        TEST STAGE         |
        |---------------------------|
        | Unit Tests                |
        | Integration Tests         |
        | Security Checks           |
        +---------------------------+
                      |
                  Tests Pass
                      |
                      v
        +---------------------------+
        |     DOCKER BUILD STAGE    |
        |---------------------------|
        | Docker Build              |
        | Tag Docker Image          |
        | Push Image to Registry    |
        +---------------------------+
                      |
                      v
        +---------------------------+
        |       DEPLOY STAGE        |
        |---------------------------|
        | Pull Docker Image         |
        | Deploy to Staging Server  |
        +---------------------------+
                      |
                      v
              Staging Environment
```

##### Simplified Pipeline

```text
Git Push
   |
   v
GitHub
   |
   v
Build
   |
   v
Test
   |
   v
Docker Build
   |
   v
Docker Registry
   |
   v
Staging Server
```

---

#### 🌍Task 5: Explore CI/CD in the Wild

#### Repository Selected

I explored the Kubernetes open-source repository on GitHub.

Repository:

https://github.com/kubernetes/kubernetes

The repository contains GitHub Actions workflows under:

```text
.github/workflows/
```

One workflow can be selected and analyzed to understand how an open-source project automates its CI/CD activities.

#### What triggers the workflow?

The workflow can be triggered by GitHub events such as:

* Push
* Pull request
* Manual workflow execution

The exact trigger depends on the selected workflow YAML file.

#### How many jobs does it have?

The number of jobs depends on the selected workflow.

For the workflow I inspected, I identified the jobs defined under the `jobs:` section of the YAML file.

#### What does it do?

The workflow automates activities such as:

1. Checking out source code.
2. Setting up the required environment.
3. Running validation or tests.
4. Performing build-related tasks.
5. Reporting the result back to GitHub.

The exact purpose depends on the specific workflow selected.

---

#### 💡Key Learnings

#### CI/CD is a practice, not a tool

CI/CD describes a software development and delivery approach.

Tools such as:

* GitHub Actions
* Jenkins
* GitLab CI/CD
* CircleCI

can implement CI/CD pipelines.

#### Pipeline failure is not necessarily a problem

A failed pipeline can be useful because it prevents bad code from moving to the next stage.

For example:

```text
Developer Push
      |
      v
     Build
      |
      v
     Test
      |
   FAILED
      |
      X
Production deployment stopped
```

The pipeline has successfully detected a problem before it reached production.

---

#### 📝Final Summary

CI/CD helps development teams automate the process of building, testing, and delivering software.

The main concepts learned today are:

* Continuous Integration
* Continuous Delivery
* Continuous Deployment
* Trigger
* Stage
* Job
* Step
* Runner
* Artifact

A typical CI/CD flow is:

```text
Code
  |
  v
GitHub
  |
  v
Build
  |
  v
Test
  |
  v
Docker Image
  |
  v
Registry
  |
  v
Staging
  |
  v
Production
```

The main goal of CI/CD is to make software delivery **faster, repeatable, automated, and reliable**.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add SARIF upload for Trivy. | You can demonstrate, without notes: *automate build, scan and push of images* — with evidence committed to `day-39/`. |
| 2 | Write a composite action `setup-and-lint`. | You can demonstrate, without notes: *create reusable workflows and composite actions* — with evidence committed to `day-39/`. |
| 3 | Document inputs/outputs of your reusable workflow. | You can demonstrate, without notes: *tag images by commit and release* — with evidence committed to `day-39/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Push denied to GHCR | Add `packages: write` permission and link repo to package. |
| Cache not used | Use `cache-from/to type=gha` and consistent builder. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Gate on scan results, sign images with cosign (keyless), restrict who can trigger release workflows.
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

1. What is a reusable workflow?
2. Why use metadata-action?
3. How do you gate on vulnerabilities?
4. Reusable workflow vs composite action?
5. **Scenario:** Five teams copy-pasted slightly different Docker workflows. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I push images from CI? | ☐ | ☐ | ☐ | ☐ |
| Can I reuse workflows? | ☐ | ☐ | ☐ | ☐ |
| Can I fail builds on CVEs? | ☐ | ☐ | ☐ | ☐ |
| Automate build, scan and push of images | ☐ | ☐ | ☐ | ☐ |
| Create reusable workflows and composite actions | ☐ | ☐ | ☐ | ☐ |
| Tag images by commit and release | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-39/` in your own repository:

```text
day-39/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-39
git add day-39/
git commit -m "day-39: build & push docker images in ci; reusable workflows"
git push -u origin day-39
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

## 18. Challenge Notes — Day 39: Introduction to Terraform and IaC

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 39** of the DevOps 90-Day Challenge!
Today, we begin the **Infrastructure as Code (IaC)** section with **Terraform**, a powerful tool to manage cloud infrastructure declaratively.

[![](https://img.youtube.com/vi/MQSO0inK_-k/0.jpg)](https://www.youtube.com/watch?v=MQSO0inK_-k)
[Watch the video](https://www.youtube.com/watch?v=MQSO0inK_-k)
---

#### Objective

By the end of this session, you will:

* Understand the concept of **IaC**.
* Learn what **Terraform** is and why it’s useful.
* Write your first **Terraform configuration**.

---

#### Tools Used

* **Terraform CLI**
* **AWS Account** (for practical examples)
* **Text Editor** (VS Code, Vim, etc.)

---

#### Key Concepts

##### 1. Infrastructure as Code (IaC)

* IaC lets you **define infrastructure using code**.
* Benefits:

  * **Version Control** (track infrastructure changes).
  * **Consistency** (same config in dev, staging, prod).
  * **Automation** (deploy infrastructure automatically).

##### 2. Terraform Overview

* **Open-source IaC tool** by HashiCorp.
* Works with multiple providers (AWS, Azure, GCP, Kubernetes).
* Core concepts:

  * **Provider**: Specifies which cloud platform (e.g., AWS).
  * **Resource**: Defines infrastructure components (EC2, S3).
  * **State**: Keeps track of deployed resources.

---

#### Directory Structure

```bash
terraform-demo/
 ├── main.tf
 ├── variables.tf
 └── outputs.tf
```

---

#### Step-by-Step Guide

##### 1. Install Terraform

```bash
# Ubuntu
sudo apt update
sudo apt install -y gnupg software-properties-common curl
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
sudo apt-add-repository "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt update && sudo apt install terraform
terraform -v
```

---

##### 2. Create a Provider

**`main.tf`**

```hcl
provider "aws" {
  region = "ap-south-1"
}
```

---

##### 3. Define a Resource (Example: EC2 Instance)

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0abcdef1234567890" # replace with valid AMI
  instance_type = "t2.micro"

  tags = {
    Name = "TerraformDemo"
  }
}
```

---

##### 4. Initialize and Apply Terraform

```bash
terraform init   # initialize Terraform
terraform plan   # preview changes
terraform apply  # create resources
```

* Type **yes** when prompted

---

##### 5. Verify

* Check AWS console → EC2 → Instance running
* Terraform tracks state in `terraform.tfstate`

---

#### Key Concepts Applied

| Concept      | Example Used                         |
| ------------ | ------------------------------------ |
| Provider     | AWS (`provider "aws"`)               |
| Resource     | EC2 instance (`aws_instance`)        |
| State        | `terraform.tfstate` file             |
| Plan & Apply | `terraform plan` & `terraform apply` |

---

#### Bonus (Extra Learning)

* Add **outputs.tf** to get instance public IP:

```hcl
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

* Use **variables.tf** for parameterized configurations.
* Destroy resources safely: `terraform destroy`

---

#### Congratulations!

You’ve deployed your **first cloud resource using Terraform**!
This is the foundation for **automating entire cloud environments** using code.

---

#### Try These Next

* Add **S3 bucket** using Terraform.
* Use **Terraform variables** to make code reusable.
* Track state using **remote backend** (S3 + DynamoDB).

## 19. Cohort Practice — Day 39: What is CI/CD?

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Before writing a single pipeline, understand **why CI/CD exists** and what it actually does.


Today is a research and diagram day — no pipelines yet. Get the concepts right first.

---

#### Expected Output

- A markdown file: `day-39-cicd-concepts.md`
- A pipeline diagram (hand-drawn or text-based)


---




#### Challenge Tasks

##### Task 1: The Problem
Think about a team of 5 developers all pushing code to the same repo manually deploying to production.

Write in your notes:
1. What can go wrong?
2. What does "it works on my machine" mean and why is it a real problem?
3. How many times a day can a team safely deploy manually?

---

##### Task 2: CI vs CD
Research and write short definitions (2-3 lines each):
1. **Continuous Integration** — what happens, how often, what it catches
2. **Continuous Delivery** — how it's different from CI, what "delivery" means
3. **Continuous Deployment** — how it differs from Delivery, when teams use it

Write one real-world example for each.

---


##### Task 3: Pipeline Anatomy
A pipeline has these parts — write what each one does:
- **Trigger** — what starts the pipeline
- **Stage** — a logical phase (build, test, deploy)
- **Job** — a unit of work inside a stage
- **Step** — a single command or action inside a job
- **Runner** — the machine that executes the job
- **Artifact** — output produced by a job

---

##### Task 4: Draw a Pipeline
Draw a CI/CD pipeline for this scenario:
> A developer pushes code to GitHub. The app is tested, built into a Docker image, and deployed to a staging server.

Include at least 3 stages. Hand-drawn and photographed is perfectly fine.

---

##### Task 5: Explore in the Wild
1. Open any popular open-source repo on GitHub (Kubernetes, React, FastAPI — pick one you know)
2. Find their `.github/workflows/` folder
3. Open one workflow YAML file
4. Write in your notes:
   - What triggers it?
   - How many jobs does it have?
   - What does it do? (best guess)

---

#### Hints
- CI/CD is a practice, not just a tool
- GitHub Actions, Jenkins, GitLab CI, CircleCI — all are tools that implement CI/CD
- A pipeline failing is not a problem — it's CI/CD doing its job

---

#### Documentation
Create `day-39-cicd-concepts.md` with:
- Your CI vs CD vs CD definitions
- Pipeline anatomy notes
- Your pipeline diagram
- What you found in the open-source repo

---

#### Submission
1. Add your `day-39-cicd-concepts.md` to `2026/day-39/`
2. Commit and push to your fork

---

#### Learn in Public
Share your pipeline diagram on LinkedIn — even a rough hand-drawn one gets engagement.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 39: Parallel Stages

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Run lint, unit, integration, and e2e tests in **parallel** in a Jenkins Declarative Pipeline. Publish JUnit, stash/unstash workspace, and optionally guard deploy with a **lock**.

#### 🎯 Learning Goals
- Build parallel branches with `parallel {}`
- Aggregate JUnit across branches
- Use `stash/unstash` to share files
- (Optional) Serialize shared env with `lock`

#### 📌 Commit
git add day39-parallel-stages
git commit -m "day39: Jenkins parallel stages with junit aggregation and optional lock"
git push

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [scripts/e2e.sh](files/hands-on-projects/scripts/e2e.sh)
- [scripts/integration.sh](files/hands-on-projects/scripts/integration.sh)
- [scripts/lint.sh](files/hands-on-projects/scripts/lint.sh)
- [scripts/unit.sh](files/hands-on-projects/scripts/unit.sh)


---

[← Day 38](../day-38/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 40 →](../day-40/README.md)
