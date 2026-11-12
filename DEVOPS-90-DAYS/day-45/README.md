# Day 45 — DevSecOps II: Secrets Management - gitleaks, SOPS & Vault

[← Day 44](../day-44/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 46 →](../day-46/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Detect secrets in code and history
- [ ] Encrypt secrets in git with SOPS/age
- [ ] Run HashiCorp Vault in dev mode and read secrets from an app

## 2. Prerequisites

- Days 26, 33, 38.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Secret sprawl

Secrets leak via repos, logs, images, CI vars and chat. Controls: detection, short-lived credentials, central store, rotation, audit.

### 3.2 GitOps-friendly encryption

SOPS + age/KMS encrypts values in YAML so encrypted secrets can live in git; External Secrets Operator syncs from cloud managers into Kubernetes.

### 3.3 Vault

Dynamic secrets, leases, policies, auth methods (AppRole, K8s, OIDC). KV v2 for static secrets.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `gitleaks detect` across git history; fix findings.
2. [ ] Generate an age key; encrypt `secrets.yaml` with SOPS; commit encrypted file.
3. [ ] Run Vault dev server in Docker; write and read a KV secret.
4. [ ] Create a Vault policy and token with read-only access.
5. [ ] Write a small script that fetches a secret at runtime.

## 5. Real-World Scenario

> Pen test found a DB password in a Docker image layer. Remove it, rotate it, rebuild, and implement a process so it can't recur.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gitleaks detect --source . --log-opts="--all" -v
age-keygen -o key.txt
sops --encrypt --age $(grep -o 'age1.*' key.txt) secrets.yaml > secrets.enc.yaml
docker run -d --cap-add IPC_LOCK -p 8200:8200 -e VAULT_DEV_ROOT_TOKEN_ID=root hashicorp/vault
export VAULT_ADDR=http://127.0.0.1:8200 VAULT_TOKEN=root
vault kv put secret/app db_password=s3cr3t && vault kv get secret/app
vault policy write app-ro - <<< 'path "secret/data/app" { capabilities=["read"] }'
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 45 – Docker Build & Push in GitHub Actions — Challenge Brief

#### Task
Today you build a **complete CI/CD pipeline** — code pushed to GitHub automatically builds a Docker image and ships it to Docker Hub. No manual steps.

This is exactly what happens in real production pipelines.

---

#### Expected Output
- A complete workflow: `.github/workflows/docker-publish.yml`
- Your Docker image live on Docker Hub
- A status badge in your repo README
- A markdown file: `day-45-docker-cicd.md`

---

#### Challenge Tasks

##### Task 1: Prepare
1. Use the app you Dockerized on Day 36 (or any simple Dockerfile)
2. Add the Dockerfile to your `github-actions-practice` repo (or create a minimal one)
3. Make sure `DOCKER_USERNAME` and `DOCKER_TOKEN` secrets are set from Day 44

---

##### Task 2: Build the Docker Image in CI
Create `.github/workflows/docker-publish.yml` that:
1. Triggers on push to `main`
2. Checks out the code
3. Builds the Docker image and tags it

**Verify:** Check the build step logs — does the image build successfully?

---

##### Task 3: Push to Docker Hub
Add steps to:
1. Log in to Docker Hub using your secrets
2. Tag the image as `username/repo:latest` and also `username/repo:sha-<short-commit-hash>`
3. Push both tags

**Verify:** Go to Docker Hub — is your image there with both tags?

---

##### Task 4: Only Push on Main
Add a condition so the push step only runs on the `main` branch — not on feature branches or PRs.

Test it: push to a feature branch and verify the image is built but NOT pushed.

---

##### Task 5: Add a Status Badge
1. Get the badge URL for your `docker-publish` workflow from the Actions tab
2. Add it to your `README.md`
3. Push — the badge should show green

---

##### Task 6: Pull and Run It
1. On your local machine (or a cloud server), pull the image you just pushed
2. Run it
3. Confirm it works

Write in your notes: What is the full journey from `git push` to a running container?

---

#### Hints
- Docker login: `uses: docker/login-action@v3`
- Build and push: `uses: docker/build-push-action@v5`
- Short SHA: `${{ github.sha }}` (use `cut` or `slice` to get first 7 chars)
- Badge URL format: `https://github.com/<user>/<repo>/actions/workflows/<file>.yml/badge.svg`

---

#### Documentation
Create `day-45-docker-cicd.md` with:
- Your complete workflow YAML
- Docker Hub link to your image
- Screenshot of the pipeline run
- The full journey described in Task 6

---

#### Submission
1. Add `day-45-docker-cicd.md` to `2026/day-45/`
2. Commit and push to your fork

---

#### Learn in Public
Share your Docker Hub image link and the green badge on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 45 – Docker Build & Push in GitHub Actions — Notes & Solution

#### Task
Today you build a **complete CI/CD pipeline** — code pushed to GitHub automatically builds a Docker image and ships it to Docker Hub. No manual steps.

This is exactly what happens in real production pipelines.

---

#### Challenge Tasks

##### Task 1: Prepare
1. Use the app you Dockerized on Day 36 (or any simple Dockerfile)
2. Add the Dockerfile to your `github-actions-practice` repo (or create a minimal one)
3. Make sure `DOCKER_USERNAME` and `DOCKER_TOKEN` secrets are set from Day 44

<img width="1919" height="741" alt="Screenshot 2026-09-18 213810" src="https://github.com/user-attachments/assets/fefcbf89-cc9a-432c-86a7-8615a4ff1aed" />


---

##### Task 2: Build the Docker Image in CI
Create `.github/workflows/docker-publish.yml` that:
1. Triggers on push to `main`
2. Checks out the code
3. Builds the Docker image and tags it

**Verify:** Check the build step logs — does the image build successfully?

- Yes,image build successfully
[docker-yaml-file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/docker-publish.yml)

<img width="1917" height="874" alt="Screenshot 2026-09-18 212239" src="https://github.com/user-attachments/assets/017946c1-840e-4e41-a96d-5a36f6ea60e7" />

---

##### Task 3: Push to Docker Hub
Add steps to:
1. Log in to Docker Hub using your secrets
2. Tag the image as `username/repo:latest` and also `username/repo:sha-<short-commit-hash>`
3. Push both tags

**Verify:** Go to Docker Hub — is your image there with both tags?

- Yes, both tags are in Dockerhub

<img width="1919" height="873" alt="Screenshot 2026-09-18 211919" src="https://github.com/user-attachments/assets/abde4d16-ca62-41e1-a93e-4ac7703aa0a6" />


---

##### Task 4: Only Push on Main
Add a condition so the push step only runs on the `main` branch — not on feature branches or PRs.

Test it: push to a feature branch and verify the image is built but NOT pushed.

<img width="1919" height="879" alt="Screenshot 2026-09-18 212223" src="https://github.com/user-attachments/assets/4ced4261-76ae-4da0-92be-bb3b3f2d9599" />


---

##### Task 5: Add a Status Badge
1. Get the badge URL for your `docker-publish` workflow from the Actions tab
2. Add it to your `README.md`
3. Push — the badge should show green
   
<img width="1727" height="304" alt="Screenshot 2026-09-18 212449" src="https://github.com/user-attachments/assets/16f8b42a-d399-46d4-b272-d685bec26ff0" />


---

##### Task 6: Pull and Run It
1. On your local machine (or a cloud server), pull the image you just pushed
2. Run it
3. Confirm it works

Write in your notes: What is the full journey from `git push` to a running container?

[Dockerhub](https://hub.docker.com/repository/docker/tejswinim/day-45-github-practice/general)

- Yes,its woking

<img width="1602" height="470" alt="Screenshot 2026-09-18 213615" src="https://github.com/user-attachments/assets/9b5970f6-a3f2-4a5c-b702-1ecb9e02deb4" />
<img width="1919" height="974" alt="Screenshot 2026-09-18 204305" src="https://github.com/user-attachments/assets/420efec4-e89b-4ee3-85a7-983e6d881a8a" />


1. git push – Code is pushed to GitHub.

2. GitHub Actions triggers – The CI/CD workflow starts and Copleted all task or jobs.

3. Checkout code: `uses: actions/checkout@v4`

4. Login to Docker Hub: `uses: docker/login-action@v3`

5. Build Docker image using the Dockerfile.
    - If code is pushed to main: Docker image is built, tagged, and pushed to Docker Hub.
    - If pushed to other branches or PRs:Docker image is only built for testing. It is not pushed to Docker Hub.

6. Run the container: `docker run -d --name web -p 80:80 tejswinim/day-45-github-practice:sha-21a287c`

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a secrets rotation runbook. | You can demonstrate, without notes: *detect secrets in code and history* — with evidence committed to `day-45/`. |
| 2 | Compare Vault, AWS Secrets Manager, SOPS. | You can demonstrate, without notes: *encrypt secrets in git with SOPS/age* — with evidence committed to `day-45/`. |
| 3 | Add gitleaks to CI. | You can demonstrate, without notes: *run HashiCorp Vault in dev mode and read secrets from an app* — with evidence committed to `day-45/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| SOPS cannot decrypt | Missing/incorrect age key in `SOPS_AGE_KEY_FILE`. |
| Vault dev data lost | Dev mode is in-memory; use proper storage in prod. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never use Vault dev mode in production; rotate any exposed secret immediately; short TTLs.
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

1. Why dynamic secrets?
2. How can secrets live in git safely?
3. What is a Vault policy?
4. How do you respond to a leaked key?
5. **Scenario:** Pen test found a DB password in a Docker image layer. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I find leaked secrets? | ☐ | ☐ | ☐ | ☐ |
| Can I encrypt secrets with SOPS? | ☐ | ☐ | ☐ | ☐ |
| Can I use Vault KV? | ☐ | ☐ | ☐ | ☐ |
| Detect secrets in code and history | ☐ | ☐ | ☐ | ☐ |
| Encrypt secrets in git with SOPS/age | ☐ | ☐ | ☐ | ☐ |
| Run HashiCorp Vault in dev mode and read secrets from an app | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-45/` in your own repository:

```text
day-45/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-45
git add day-45/
git commit -m "day-45: devsecops ii"
git push -u origin day-45
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

## 18. Challenge Notes — Day 45: Writing Reusable CloudFormation Templates

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 45** of the DevOps 90-Day Challenge!
Yesterday, you learned basic CloudFormation templates.
Today, we’ll focus on **reusable and modular templates**, which allow you to scale and manage AWS infrastructure efficiently.

[![](https://img.youtube.com/vi/3w49Ad7ftCs/0.jpg)](https://www.youtube.com/watch?v=3w49Ad7ftCs)

[Watch the video](https://www.youtube.com/watch?v=3w49Ad7ftCs)
---

#### Objective

By the end of this session, you will:

* Create **modular CloudFormation templates**.
* Use **parameters, mappings, and outputs** for reusability.
* Implement **nested stacks** for complex infrastructures.

---

#### Tools Used

* **AWS CloudFormation**
* **YAML Templates**
* **AWS CLI** (optional)

---

#### Key Concepts

##### 1. Parameters for Reusability

* Use **parameters** to make templates flexible

```yaml
Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    Description: EC2 instance type
```

* Change the input value per environment (dev/staging/prod)

---

##### 2. Mappings

* Define **static values** that vary by region, environment, or account

```yaml
Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-0abcdef1234567890
    ap-south-1:
      AMI: ami-0fedcba9876543210
```

* Access mapping with `!FindInMap`

```yaml
ImageId: !FindInMap [RegionMap, !Ref "AWS::Region", AMI]
```

---

##### 3. Outputs for Inter-Stack Communication

* Use **outputs** to share information with other stacks

```yaml
Outputs:
  InstanceId:
    Description: EC2 instance ID
    Value: !Ref MyEC2Instance
```

---

##### 4. Nested Stacks

* Split templates into **child stacks** for modularity

```yaml
Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/mybucket/network.yaml
```

* Parent stack deploys multiple **child templates**

---

##### 5. Sample Reusable Template

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Reusable EC2 Template

Parameters:
  Environment:
    Type: String
    Default: dev

Mappings:
  EnvMap:
    dev:
      InstanceType: t2.micro
    prod:
      InstanceType: t2.large

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !FindInMap [EnvMap, !Ref Environment, InstanceType]
      ImageId: ami-0abcdef1234567890

Outputs:
  InstanceId:
    Value: !Ref MyEC2Instance
```

---

##### 6. Deploy the Template

```bash
aws cloudformation create-stack \
    --stack-name reusable-demo \
    --template-body file://reusable-ec2.yaml \
    --parameters ParameterKey=Environment,ParameterValue=prod
```

---

##### 7. Verify

* Check **EC2 console** → instance type matches environment
* Stack outputs available in **Outputs tab**

---

#### Key Concepts Applied

| Concept       | Example Used                               |
| ------------- | ------------------------------------------ |
| Parameters    | Environment input (dev/prod)               |
| Mappings      | InstanceType per environment               |
| Outputs       | EC2 instance ID                            |
| Nested Stacks | Split templates for modular infrastructure |

---

#### Bonus (Extra Learning)

* Create **child templates** for VPC, Security Groups, and EC2
* Reuse the **same template** for multiple accounts/environments
* Integrate CloudFormation templates with **CI/CD pipeline**

---

#### Congratulations!

You’ve learned to write **reusable and modular CloudFormation templates**!
This enables scalable and maintainable infrastructure automation on AWS.

---

#### Try These Next

* Implement **nested stacks** for VPC, EC2, and S3
* Test parameters and mappings in different regions
* Automate **stack creation via Terraform or Jenkins pipeline**

## 19. Cohort Practice — Day 45: Docker Build & Push in GitHub Actions

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today you build a **complete CI/CD pipeline** — code pushed to GitHub automatically builds a Docker image and ships it to Docker Hub. No manual steps.

This is exactly what happens in real production pipelines.

---


#### Expected Output
- A complete workflow: `.github/workflows/docker-publish.yml`
- Your Docker image live on Docker Hub
- A status badge in your repo README
- A markdown file: `day-45-docker-cicd.md`

  
----








#### Challenge Tasks

##### Task 1: Prepare
1. Use the app you Dockerized on Day 36 (or any simple Dockerfile)
2. Add the Dockerfile to your `github-actions-practice` repo (or create a minimal one)
3. Make sure `DOCKER_USERNAME` and `DOCKER_TOKEN` secrets are set from Day 44

---

##### Task 2: Build the Docker Image in CI
Create `.github/workflows/docker-publish.yml` that:
1. Triggers on push to `main`
2. Checks out the code
3. Builds the Docker image and tags it

**Verify:** Check the build step logs — does the image build successfully?

---

##### Task 3: Push to Docker Hub
Add steps to:
1. Log in to Docker Hub using your secrets
2. Tag the image as `username/repo:latest` and also `username/repo:sha-<short-commit-hash>`
3. Push both tags

**Verify:** Go to Docker Hub — is your image there with both tags?

---

##### Task 4: Only Push on Main
Add a condition so the push step only runs on the `main` branch — not on feature branches or PRs.

Test it: push to a feature branch and verify the image is built but NOT pushed.

---

##### Task 5: Add a Status Badge
1. Get the badge URL for your `docker-publish` workflow from the Actions tab
2. Add it to your `README.md`
3. Push — the badge should show green

---

##### Task 6: Pull and Run It
1. On your local machine (or a cloud server), pull the image you just pushed
2. Run it
3. Confirm it works

Write in your notes: What is the full journey from `git push` to a running container?

---

#### Hints
- Docker login: `uses: docker/login-action@v3`
- Build and push: `uses: docker/build-push-action@v5`
- Short SHA: `${{ github.sha }}` (use `cut` or `slice` to get first 7 chars)
- Badge URL format: `https://github.com/<user>/<repo>/actions/workflows/<file>.yml/badge.svg`

---

#### Documentation
Create `day-45-docker-cicd.md` with:
- Your complete workflow YAML
- Docker Hub link to your image
- Screenshot of the pipeline run
- The full journey described in Task 6

---

#### Submission
1. Add `day-45-docker-cicd.md` to `2026/day-45/`
2. Commit and push to your fork

---

#### Learn in Public
Share your Docker Hub image link and the green badge on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 45: Backup & Restore Jenkins

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Create verified backups of $JENKINS_HOME, prune old ones, and optionally push/pull from S3.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [scripts/backup_jenkins.sh](files/hands-on-projects/scripts/backup_jenkins.sh)
- [scripts/prune_backups.sh](files/hands-on-projects/scripts/prune_backups.sh)
- [scripts/restore_jenkins.sh](files/hands-on-projects/scripts/restore_jenkins.sh)
- [scripts/verify_backup.sh](files/hands-on-projects/scripts/verify_backup.sh)


---

[← Day 44](../day-44/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 46 →](../day-46/README.md)
