# Day 42 — GitLab CI/CD: Pipelines, Runners & Environments

[← Day 41](../day-41/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 43 →](../day-43/README.md)

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

- [ ] Write `.gitlab-ci.yml` pipelines
- [ ] Understand runners, stages, rules, artifacts and environments
- [ ] Compare GitLab CI with Actions and Jenkins

## 2. Prerequisites

- Days 36-41; free GitLab.com account.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 GitLab CI model

Pipeline -> stages -> jobs. `rules:` control execution, `needs:` form DAGs, `cache` and `artifacts` share data, `include:` and `extends:` reduce duplication.

### 3.2 Runners

Shared or self-hosted (docker executor, Kubernetes executor). Register runners with tokens; tag jobs.

### 3.3 Environments

`environment:` tracks deployments, supports review apps, manual jobs and protected environments.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Mirror or push repo to GitLab.
2. [ ] Create `.gitlab-ci.yml` with stages test/build/deploy.
3. [ ] Add `rules` for MRs vs default branch.
4. [ ] Add Docker build to the GitLab registry.
5. [ ] Add a manual `deploy-staging` job with an `environment`.

## 5. Real-World Scenario

> Your company uses GitLab. Port your GitHub Actions pipeline to GitLab CI and note the conceptual equivalents.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
stages: [test, build, deploy]
default: { image: python:3.12-slim }
test:
  stage: test
  script: [pip install -r requirements.txt, pytest -q]
  rules: [{ if: '$CI_PIPELINE_SOURCE == "merge_request_event"' }, { if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH' }]
build:
  stage: build
  image: docker:27
  services: [docker:27-dind]
  script: [docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA ., docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA]
deploy-staging:
  stage: deploy
  script: [echo deploy]
  environment: staging
  when: manual
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 42 – Runners: GitHub-Hosted & Self-Hosted — Challenge Brief

#### Task
Every job needs a machine to run on. Today you understand **runners** — GitHub's hosted ones and how to set up your own self-hosted runner on a real server.

---

#### Expected Output
- A self-hosted runner registered to your GitHub repo
- A workflow that runs a job on your self-hosted runner
- A markdown file: `day-42-runners.md`

---

#### Challenge Tasks

##### Task 1: GitHub-Hosted Runners
1. Create a workflow with 3 jobs, each on a different OS:
   - `ubuntu-latest`
   - `windows-latest`
   - `macos-latest`
2. In each job, print:
   - The OS name
   - The runner's hostname
   - The current user running the job
3. Watch all 3 run in parallel

Write in your notes: What is a GitHub-hosted runner? Who manages it?

---

##### Task 2: Explore What's Pre-installed
1. On the `ubuntu-latest` runner, run a step that prints:
   - Docker version
   - Python version
   - Node version
   - Git version
2. Look up the GitHub docs for the full list of pre-installed software on `ubuntu-latest`

Write in your notes: Why does it matter that runners come with tools pre-installed?

---

##### Task 3: Set Up a Self-Hosted Runner
1. Go to your GitHub repo → Settings → Actions → Runners → **New self-hosted runner**
2. Choose Linux as the OS
3. Follow the instructions to download and configure the runner on:
   - Your local machine, OR
   - A cloud VM (EC2, Utho, or any VPS)
4. Start the runner — verify it shows as **Idle** in GitHub

**Verify:** Your runner appears in the Runners list with a green dot.

---

##### Task 4: Use Your Self-Hosted Runner
1. Create `.github/workflows/self-hosted.yml`
2. Set `runs-on: self-hosted`
3. Add steps that:
   - Print the hostname of the machine (it should be YOUR machine/VM)
   - Print the working directory
   - Create a file and verify it exists on your machine after the run
4. Trigger it and watch it run on your own hardware

**Verify:** Check your machine — is the file there?

---

##### Task 5: Labels
1. Add a **label** to your self-hosted runner (e.g., `my-linux-runner`)
2. Update your workflow to use `runs-on: [self-hosted, my-linux-runner]`
3. Trigger it — does it still pick up the job?

Write in your notes: Why are labels useful when you have multiple self-hosted runners?

---

##### Task 6: GitHub-Hosted vs Self-Hosted
Fill this in your notes:

| | GitHub-Hosted | Self-Hosted |
|---|---|---|
| Who manages it? | ? | ? |
| Cost | ? | ? |
| Pre-installed tools | ? | ? |
| Good for | ? | ? |
| Security concern | ? | ? |

---

#### Hints
- Runner setup script is generated by GitHub — just copy and run it
- Self-hosted runner runs as a background service: `./run.sh`
- To run as a service (persistent): `sudo ./svc.sh install && sudo ./svc.sh start`
- `runs-on: self-hosted` targets any self-hosted runner
- `runs-on: [self-hosted, linux, my-label]` targets specific ones

---

#### Documentation
Create `day-42-runners.md` with:
- Screenshot of your self-hosted runner showing as Idle in GitHub
- Screenshot of a job running on your self-hosted runner
- The comparison table from Task 6

---

#### Submission
1. Add `day-42-runners.md` to `2026/day-42/`
2. Commit and push to your fork

---

#### Learn in Public
Share your self-hosted runner screenshot on LinkedIn — running CI on your own machine is a cool flex.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 42 – Runners: GitHub-Hosted & Self-Hosted — Notes & Solution

#### Task
Every job needs a machine to run on. Today you understand **runners** — GitHub's hosted ones and how to set up your own self-hosted runner on a real server.

---

#### Challenge Tasks

##### Task 1: GitHub-Hosted Runners
1. Create a workflow with 3 jobs, each on a different OS:
   - `ubuntu-latest`
   - `windows-latest`
   - `macos-latest`
2. In each job, print:
   - The OS name
   - The runner's hostname
   - The current user running the job
3. Watch all 3 run in parallel
[runner yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/runners.yml)

<img width="1919" height="835" alt="Screenshot 2026-09-10 143231" src="https://github.com/user-attachments/assets/7460bde7-b5cf-46c5-9512-05c9423a1557" />
<img width="1919" height="780" alt="Screenshot 2026-09-10 143247" src="https://github.com/user-attachments/assets/8558f819-4a4b-444a-8cae-2bc4244f2009" />
<img width="1919" height="708" alt="Screenshot 2026-09-10 143258" src="https://github.com/user-attachments/assets/fec03f19-c39d-4808-9154-7b01387a232c" />
<img width="1919" height="785" alt="Screenshot 2026-09-10 143309" src="https://github.com/user-attachments/assets/7b299890-7a9e-40da-a98a-97e7ec4f95a3" />



**What is a GitHub-hosted runner? Who manages it?**

    What is a GitHub-hosted runner? Who manages it?

    - `Github-hosted` runner is a temporary virtual machine provided by GitHub that runs GitHub Actions workflows.

    - `GitHub-hosted` runners are managed by GitHub on Microsoft Azure infrastructure.
    
    - Responsible for:
        - Creating the virtual machine
        - Installing software
        -  Maintaining security
        - Deleting the machine after the job completes.
        
---

##### Task 2: Explore What's Pre-installed
1. On the `ubuntu-latest` runner, run a step that prints:
   - Docker version
   - Python version
   - Node version
   - Git version
2. Look up the GitHub docs for the full list of pre-installed software on `ubuntu-latest`

[software yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/software.yml)
<img width="1919" height="840" alt="Screenshot 2026-09-10 143825" src="https://github.com/user-attachments/assets/e476975c-34c7-4e1f-a66c-9c35db780fa9" />


**Write in your notes: Why does it matter that runners come with tools pre-installed?**

- It matters because pre-installed tools make workflows faster and easier to configure. Developers can run builds and tests immediately without installing common tools like Docker, Python, Node.js, and Git, while GitHub maintains and updates the environment.

---

##### Task 3: Set Up a Self-Hosted Runner
1. Go to your GitHub repo → Settings → Actions → Runners → **New self-hosted runner**
2. Choose Linux as the OS
3. Follow the instructions to download and configure the runner on:
   - Your local machine, OR
   - A cloud VM (EC2, Utho, or any VPS)
4. Start the runner — verify it shows as **Idle** in GitHub

**Verify:** Your runner appears in the Runners list with a green dot.


<img width="1918" height="755" alt="Screenshot 2026-09-18 162009" src="https://github.com/user-attachments/assets/a58e80de-ce29-4dc3-93b7-2197cd111659" />
<img width="1919" height="159" alt="Screenshot 2026-09-18 162038" src="https://github.com/user-attachments/assets/7d889ec9-20e9-43cd-8469-43cccc2e7f43" />
<img width="1919" height="551" alt="Screenshot 2026-09-18 162247" src="https://github.com/user-attachments/assets/f563304a-56f1-4be8-9806-17ccedea756b" />


---

##### Task 4: Use Your Self-Hosted Runner
1. Create `.github/workflows/self-hosted.yml`
2. Set `runs-on: self-hosted`
3. Add steps that:
   - Print the hostname of the machine (it should be YOUR machine/VM)
   - Print the working directory
   - Create a file and verify it exists on your machine after the run
4. Trigger it and watch it run on your own hardware

**Verify:** Check your machine — is the file there?
- Yes,file is there

<img width="1919" height="518" alt="Screenshot 2026-09-18 162646" src="https://github.com/user-attachments/assets/d5b87089-e9f2-42f3-8a8f-993b3d9c01ec" />

  
---

##### Task 5: Labels
1. Add a **label** to your self-hosted runner (e.g., `my-linux-runner`)
2. Update your workflow to use `runs-on: [self-hosted, my-linux-runner]`
3. Trigger it — does it still pick up the job? - **Yes**

Write in your notes: Why are labels useful when you have multiple self-hosted runners?
- Labels are useful when you have multiple self-hosted runners because they help GitHub Actions choose the correct runner for a specific job

<img width="1919" height="491" alt="Screenshot 2026-09-18 162917" src="https://github.com/user-attachments/assets/2b993cc8-8ad4-4d1c-88b0-e1901c4170a5" />


---

##### Task 6: GitHub-Hosted vs Self-Hosted
Fill this in your notes:

| | GitHub-Hosted | Self-Hosted |
|---|---|---|
| Who manages it? | GitHub | We manage it |
| Cost | Free 2000 mins (per month, public repos unlimited) | As per our own infrastructure usage |
| Pre-installed tools | Yes (common languages, build tools, Docker, etc.) | No (we install and maintain ourselves) |
| Good for | Small independent jobs, quick CI/CD setup | Production workloads, specialized environments |
| Security concern | Controlled by GitHub —so must be handled carefully | Our responsibility — we must secure the machine, patch OS/tools, and protect secrets |

---

**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a mapping table: Actions <-> GitLab CI <-> Jenkins. | You can demonstrate, without notes: *write `.gitlab-ci.yml` pipelines* — with evidence committed to `day-42/`. |
| 2 | Add SAST via `include: template: Security/SAST.gitlab-ci.yml`. | You can demonstrate, without notes: *understand runners, stages, rules, artifacts and environments* — with evidence committed to `day-42/`. |
| 3 | Add a scheduled pipeline. | You can demonstrate, without notes: *compare GitLab CI with Actions and Jenkins* — with evidence committed to `day-42/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Job stuck pending | No runner with matching tags. |
| dind fails | Needs privileged runner or use Kaniko/Buildah rootless. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Protect variables and environments, mask secrets, restrict runner scope, prefer rootless builders.
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

1. Pipeline vs stage vs job?
2. What are runners?
3. How do `rules` work?
4. GitLab CI vs Actions?
5. **Scenario:** Your company uses GitLab. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a GitLab pipeline? | ☐ | ☐ | ☐ | ☐ |
| Can I explain runners? | ☐ | ☐ | ☐ | ☐ |
| Can I map CI concepts across tools? | ☐ | ☐ | ☐ | ☐ |
| Write `.gitlab-ci.yml` pipelines | ☐ | ☐ | ☐ | ☐ |
| Understand runners, stages, rules, artifacts and environments | ☐ | ☐ | ☐ | ☐ |
| Compare GitLab CI with Actions and Jenkins | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-42/` in your own repository:

```text
day-42/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-42
git add day-42/
git commit -m "day-42: gitlab ci/cd"
git push -u origin day-42
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

## 18. Challenge Notes — Day 42: Advanced Terraform Concepts (Modules, Remote Backends)

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 42** of the DevOps 90-Day Challenge!
Yesterday, you learned Terraform **state management and workspaces**.
Today, we’ll dive into **advanced concepts**: **modules** for reusable code and **remote backends** for collaboration.

[![](https://img.youtube.com/vi/wggQpvn1Wxk/0.jpg)](https://www.youtube.com/watch?v=wggQpvn1Wxk)

[Watch the video](https://www.youtube.com/watch?v=wggQpvn1Wxk)
---

#### Objective

By the end of this session, you will:

* Understand **Terraform modules** and create reusable infrastructure code.
* Use **remote backends** to store state centrally.
* Organize Terraform projects for **scalability and maintainability**.

---

#### Tools Used

* **Terraform CLI**
* **AWS S3 + DynamoDB** (remote state backend)
* **VS Code**

---

#### Key Concepts

##### 1. Terraform Modules

* Modules are **reusable Terraform configurations**.
* Can be **local** or **remote** (Terraform Registry, GitHub).
* Helps maintain **DRY (Don't Repeat Yourself)** principle.

**Example: Creating a Module for EC2**

```bash
terraform-demo/
 ├── modules/
 │    └── ec2/
 │         ├── main.tf
 │         ├── variables.tf
 │         └── outputs.tf
 └── main.tf
```

**`modules/ec2/main.tf`**

```hcl
resource "aws_instance" "this" {
  ami           = var.ami
  instance_type = var.instance_type
  tags = {
    Name = var.name
  }
}
```

**`modules/ec2/variables.tf`**

```hcl
variable "ami" {}
variable "instance_type" {}
variable "name" {}
```

**`modules/ec2/outputs.tf`**

```hcl
output "instance_id" {
  value = aws_instance.this.id
}
```

**Use Module in Root `main.tf`**

```hcl
module "web_server" {
  source        = "./modules/ec2"
  ami           = "ami-0abcdef1234567890"
  instance_type = "t2.micro"
  name          = "WebServer"
}
```

---

##### 2. Remote Backend

* Use S3 + DynamoDB for **centralized state management and locking**.

**Example Remote Backend**

```hcl
terraform {
  backend "s3" {
    bucket         = "terraform-state-demo"
    key            = "project/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
```

* Allows **teams to collaborate safely** without overwriting state.

---

##### 3. Apply Terraform

```bash
terraform init      # initialize backend
terraform plan
terraform apply
```

* Terraform fetches module code automatically
* Deploys infrastructure according to module definitions

---

##### 4. Verify

* EC2 instance created from **module**
* State stored in **S3 bucket**
* DynamoDB ensures **locking during concurrent changes**

---

#### Key Concepts Applied

| Concept          | Example Used                             |
| ---------------- | ---------------------------------------- |
| Modules          | `modules/ec2` reusable configuration     |
| Inputs & Outputs | Pass variables to modules, get outputs   |
| Remote Backend   | S3 + DynamoDB for shared state           |
| Scalability      | Use modules for multi-environment setups |

---

#### Bonus (Extra Learning)

* Use **Terraform Registry modules** (e.g., `terraform-aws-modules/ec2-instance/aws`)
* Combine **multiple modules** to deploy full infrastructure stack
* Automate backend initialization in CI/CD pipelines

---

#### Congratulations!

You’ve now mastered **Terraform modules** and **remote backends**!
This makes your infrastructure **reusable, maintainable, and collaborative**.

---

#### Try These Next

* Create a module for **S3 bucket**
* Combine EC2 + S3 modules in a single root module
* Test **remote state collaboration** with multiple users

## 19. Cohort Practice — Day 42: Runners: GitHub-Hosted & Self-Hosted

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Every job needs a machine to run on. Today you understand **runners** — GitHub's hosted ones and how to set up your own self-hosted runner on a real server.

---


#### Expected Output
- A self-hosted runner registered to your GitHub repo
- A workflow that runs a job on your self-hosted runner
- A markdown file: `day-42-runners.md`

---


#### Challenge Tasks

##### Task 1: GitHub-Hosted Runners
1. Create a workflow with 3 jobs, each on a different OS:
   - `ubuntu-latest`
   - `windows-latest`
   - `macos-latest`
2. In each job, print:
   - The OS name
   - The runner's hostname
   - The current user running the job
3. Watch all 3 run in parallel

Write in your notes: What is a GitHub-hosted runner? Who manages it?

---

##### Task 2: Explore What's Pre-installed
1. On the `ubuntu-latest` runner, run a step that prints:
   - Docker version
   - Python version
   - Node version
   - Git version
2. Look up the GitHub docs for the full list of pre-installed software on `ubuntu-latest`

Write in your notes: Why does it matter that runners come with tools pre-installed?

---

##### Task 3: Set Up a Self-Hosted Runner
1. Go to your GitHub repo → Settings → Actions → Runners → **New self-hosted runner**
2. Choose Linux as the OS
3. Follow the instructions to download and configure the runner on:
   - Your local machine, OR
   - A cloud VM (EC2, Utho, or any VPS)
4. Start the runner — verify it shows as **Idle** in GitHub

**Verify:** Your runner appears in the Runners list with a green dot.

---

##### Task 4: Use Your Self-Hosted Runner
1. Create `.github/workflows/self-hosted.yml`
2. Set `runs-on: self-hosted`
3. Add steps that:
   - Print the hostname of the machine (it should be YOUR machine/VM)
   - Print the working directory
   - Create a file and verify it exists on your machine after the run
4. Trigger it and watch it run on your own hardware

**Verify:** Check your machine — is the file there?

---

##### Task 5: Labels
1. Add a **label** to your self-hosted runner (e.g., `my-linux-runner`)
2. Update your workflow to use `runs-on: [self-hosted, my-linux-runner]`
3. Trigger it — does it still pick up the job?

Write in your notes: Why are labels useful when you have multiple self-hosted runners?

---

##### Task 6: GitHub-Hosted vs Self-Hosted
Fill this in your notes:

| | GitHub-Hosted | Self-Hosted |
|---|---|---|
| Who manages it? | ? | ? |
| Cost | ? | ? |
| Pre-installed tools | ? | ? |
| Good for | ? | ? |
| Security concern | ? | ? |

---

#### Hints
- Runner setup script is generated by GitHub — just copy and run it
- Self-hosted runner runs as a background service: `./run.sh`
- To run as a service (persistent): `sudo ./svc.sh install && sudo ./svc.sh start`
- `runs-on: self-hosted` targets any self-hosted runner
- `runs-on: [self-hosted, linux, my-label]` targets specific ones

---

#### Documentation
Create `day-42-runners.md` with:
- Screenshot of your self-hosted runner showing as Idle in GitHub
- Screenshot of a job running on your self-hosted runner
- The comparison table from Task 6

---

#### Submission
1. Add `day-42-runners.md` to `2026/day-42/`
2. Commit and push to your fork

---

#### Learn in Public
Share your self-hosted runner screenshot on LinkedIn — running CI on your own machine is a cool flex.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 42: Quality Gates (tfsec, checkov)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
We enforce infra security/compliance before deploy using tfsec and checkov.

#### 🎯 Learning Goals
- Run tfsec/checkov in Jenkins
- Publish JUnit results
- Fail build on high severity

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [scripts/scan_k8s.sh](files/hands-on-projects/scripts/scan_k8s.sh)
- [scripts/scan_tf.sh](files/hands-on-projects/scripts/scan_tf.sh)
- [scripts/summarize.sh](files/hands-on-projects/scripts/summarize.sh)


---

[← Day 41](../day-41/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 43 →](../day-43/README.md)
