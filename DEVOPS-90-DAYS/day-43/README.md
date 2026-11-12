# Day 43 — Deployment Strategies: Rolling, Blue-Green, Canary & Rollbacks

[← Day 42](../day-42/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 44 →](../day-44/README.md)

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

- [ ] Compare deployment strategies and trade-offs
- [ ] Implement blue-green with nginx/Compose
- [ ] Design rollback and database migration safety

## 2. Prerequisites

- Days 33, 36-42, nginx (Day 12).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Strategies

Recreate (downtime), Rolling (gradual), Blue-Green (instant switch, double capacity), Canary (small % first, observe), Feature flags (decouple deploy from release), Shadow traffic.

### 3.2 Rollbacks

Keep the previous version deployable; automated health-check gates; roll forward vs back; practice rollback regularly.

### 3.3 Databases

Use expand/contract migrations so old and new code both work during rollout.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `app-blue` and `app-green` containers behind nginx upstream.
2. [ ] Switch traffic with a config reload; measure downtime with a curl loop.
3. [ ] Simulate a bad release; roll back in < 1 min.
4. [ ] Implement a 90/10 weighted canary in nginx.
5. [ ] Add a smoke-test script that gates the switch.

## 5. Real-World Scenario

> A release at 5 PM broke checkout. Design a deployment process that detects and reverts failures automatically within 2 minutes.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
upstream app { server blue:8000 weight=9; server green:8000 weight=1; }
docker compose up -d blue green
while true; do curl -s -o /dev/null -w "%{http_code}\n" localhost; sleep 0.2; done
nginx -t && nginx -s reload
./smoke.sh http://green:8000/health || echo "abort release"
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 43 – Jobs, Steps, Env Vars & Conditionals — Challenge Brief

#### Task
Today you learn how to **control the flow** of your pipeline — multi-job workflows, passing data between jobs, environment variables, and running steps only when certain conditions are met.

---

#### Expected Output
- New workflow files in your `github-actions-practice` repo
- A markdown file: `day-43-jobs-steps.md`

---

#### Challenge Tasks

##### Task 1: Multi-Job Workflow
Create `.github/workflows/multi-job.yml` with 3 jobs:
- `build` — prints "Building the app"
- `test` — prints "Running tests"
- `deploy` — prints "Deploying"

Make `test` run only **after** `build` succeeds.
Make `deploy` run only **after** `test` succeeds.

**Verify:** Check the workflow graph in the Actions tab — does it show the dependency chain?

---

##### Task 2: Environment Variables
In a new workflow, use environment variables at 3 levels:
1. **Workflow level** — `APP_NAME: myapp`
2. **Job level** — `ENVIRONMENT: staging`
3. **Step level** — `VERSION: 1.0.0`

Print all three in a single step and verify each is accessible.

Then use a **GitHub context variable** — print the commit SHA and the actor (who triggered the run).

---

##### Task 3: Job Outputs
1. Create a job that **sets an output** — e.g., today's date as a string
2. Create a second job that **reads that output** and prints it
3. Pass the value using `outputs:` and `needs.<job>.outputs.<name>`

Write in your notes: Why would you pass outputs between jobs?

---

##### Task 4: Conditionals
In a workflow, add:
1. A step that only runs when the branch is `main`
2. A step that only runs when the previous step **failed**
3. A job that only runs on **push** events, not on pull requests
4. A step with `continue-on-error: true` — what does this do?

---

##### Task 5: Putting It Together
Create `.github/workflows/smart-pipeline.yml` that:
1. Triggers on push to any branch
2. Has a `lint` job and a `test` job running in parallel
3. Has a `summary` job that runs after both, prints whether it's a `main` branch push or a feature branch push, and prints the commit message

---

#### Hints
- Job dependency: `needs: [job-name]`
- Set output: `echo "date=$(date)" >> $GITHUB_OUTPUT`
- Read output: `${{ needs.job-name.outputs.date }}`
- Conditionals: `if: github.ref == 'refs/heads/main'`
- Commit message: `${{ github.event.commits[0].message }}`

---

#### Documentation
Create `day-43-jobs-steps.md` with:
- Key workflow snippets
- What `needs:` and `outputs:` do in your own words

---

#### Submission
1. Add `day-43-jobs-steps.md` to `2026/day-43/`
2. Commit and push to your fork

---

#### Learn in Public
Share the dependency chain diagram from your multi-job workflow on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 43 – Jobs, Steps, Env Vars & Conditionals — Notes & Solution

#### Task
Today you learn how to **control the flow** of your pipeline — multi-job workflows, passing data between jobs, environment variables, and running steps only when certain conditions are met.

---

#### Challenge Tasks

##### Task 1: Multi-Job Workflow
Create `.github/workflows/multi-job.yml` with 3 jobs:
- `build` — prints "Building the app"
- `test` — prints "Running tests"
- `deploy` — prints "Deploying"

Make `test` run only **after** `build` succeeds.
Make `deploy` run only **after** `test` succeeds.

**Verify:** Check the workflow graph in the Actions tab — does it show the dependency chain?

- Yes It show the dependency chain

  [multijob yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/multi-job.yml)

<img width="1919" height="875" alt="Screenshot 2026-09-18 171115" src="https://github.com/user-attachments/assets/f16e9d44-dd37-4b73-9434-061ace5e8954" />


- `needs` : tells gitHub actions which job must finish before another job can start.

[ Build ] ──► [ Test ] ──► [ Deploy ]

---

##### Task 2: Environment Variables
In a new workflow, use environment variables at 3 levels:
1. **Workflow level** — `APP_NAME: myapp`
2. **Job level** — `ENVIRONMENT: staging`
3. **Step level** — `VERSION: 1.0.0`

Print all three in a single step and verify each is accessible.

Then use a **GitHub context variable** — print the commit SHA and the actor (who triggered the run).

[env-variable yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/env-vars.yml)

<img width="1919" height="881" alt="Screenshot 2026-09-18 171034" src="https://github.com/user-attachments/assets/bddbd7ec-bc4d-4d23-8455-a6fd3bdb4927" />


---

##### Task 3: Job Outputs
1. Create a job that **sets an output** — e.g., today's date as a string
2. Create a second job that **reads that output** and prints it
3. Pass the value using `outputs:` and `needs.<job>.outputs.<name>`

 [job output yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/job-outputs.yml)  

<img width="1919" height="872" alt="Screenshot 2026-09-18 171247" src="https://github.com/user-attachments/assets/5cab4b47-a2b9-4e98-a400-7bc68bc979eb" />
<img width="1919" height="803" alt="Screenshot 2026-09-18 171311" src="https://github.com/user-attachments/assets/da63a15b-d65b-4fde-a494-39ab2966ae26" />


Write in your notes: 

**Why would you pass outputs between jobs?**

- Each job runs separately, so Job 2 cannot see what Job 1 created.
- Outputs are used to pass that result from Job 1 to Job 2.
- Example:
  
- Job 1 – Build Docker image
    - This job builds the image and creates a tag for example:myapp:1.0.0

- Job 2 – Push image to registry
    - This job must know which image tag was created so it can push the correct image.

- Job 3 – Deploy the app
    - The deployment job also needs the same tag myapp:1.0.0 to deploy that exact image.

- Why pass outputs?
    - The tag created in Job 1 is passed as an output so the other jobs know exactly which Docker image to use.

---

##### Task 4: Conditionals
In a workflow, add:
1. A step that only runs when the branch is `main`
2. A step that only runs when the previous step **failed**
3. A job that only runs on **push** events, not on pull requests
4. A step with `continue-on-error: true` — what does this do?

[conditional yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/conditionals.yml)

<img width="1919" height="880" alt="Screenshot 2026-09-18 171517" src="https://github.com/user-attachments/assets/742fd457-0214-4869-83bc-ff429402d21f" />
<img width="1919" height="842" alt="Screenshot 2026-09-18 171529" src="https://github.com/user-attachments/assets/9fb48879-ce5f-44e2-9586-0394544fb578" />


---

##### Task 5: Putting It Together
Create `.github/workflows/smart-pipeline.yml` that:
1. Triggers on push to any branch
2. Has a `lint` job and a `test` job running in parallel
3. Has a `summary` job that runs after both, prints whether it's a `main` branch push or a feature branch push, and prints the commit message

[lint yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/smart-pipeline.yml)

<img width="1919" height="878" alt="Screenshot 2026-09-18 171650" src="https://github.com/user-attachments/assets/4c9c2e52-1ff5-4344-8d18-373befd3da4f" />
<img width="1917" height="791" alt="Screenshot 2026-09-18 171706" src="https://github.com/user-attachments/assets/f8553dad-b1fd-4a28-b010-2e21d3da551c" />
<img width="1919" height="838" alt="Screenshot 2026-09-18 171720" src="https://github.com/user-attachments/assets/da435169-ebfe-4d67-9afa-16c7e34d06f0" />


---

#### Key Takeaways

| Concept              | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `needs:`             | Create job dependencies                                 |
| `env:`               | Define environment variables at workflow/job/step level |
| `outputs:`           | Pass data between jobs                                  |
| `if:`                | Run steps/jobs conditionally                            |
| `continue-on-error:` | Allow steps to fail without stopping the job            |
| GitHub Context       | Access workflow metadata (SHA, actor, ref, etc.)        |

---

#### Learn in Public
Share the dependency chain diagram from your multi-job workflow on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw sequence diagrams for blue-green and canary. | You can demonstrate, without notes: *compare deployment strategies and trade-offs* — with evidence committed to `day-43/`. |
| 2 | Write rollback runbook. | You can demonstrate, without notes: *implement blue-green with nginx/Compose* — with evidence committed to `day-43/`. |
| 3 | Describe expand/contract DB migration for renaming a column. | You can demonstrate, without notes: *design rollback and database migration safety* — with evidence committed to `day-43/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Sessions lost on switch | Use shared session store or sticky sessions. |
| Rollback fails after migration | Make migrations backward compatible. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Verify artefact signatures before deploy; restrict who can deploy to prod; audit deploys.
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

1. Blue-green vs canary?
2. How do you make DB changes safe?
3. What is a feature flag?
4. How do you automate rollback?
5. **Scenario:** A release at 5 PM broke checkout. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I switch traffic with no downtime? | ☐ | ☐ | ☐ | ☐ |
| Can I run a canary? | ☐ | ☐ | ☐ | ☐ |
| Do I have a tested rollback? | ☐ | ☐ | ☐ | ☐ |
| Compare deployment strategies and trade-offs | ☐ | ☐ | ☐ | ☐ |
| Implement blue-green with nginx/Compose | ☐ | ☐ | ☐ | ☐ |
| Design rollback and database migration safety | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-43/` in your own repository:

```text
day-43/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-43
git add day-43/
git commit -m "day-43: deployment strategies"
git push -u origin day-43
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

## 18. Challenge Notes — Day 43: Terraform + Jenkins CICD Integration

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 43** of the DevOps 90-Day Challenge!
Yesterday, you learned **advanced Terraform concepts**.
Today, we’ll integrate Terraform with **Jenkins** to automate infrastructure provisioning using **CI/CD pipelines**.

[![](https://img.youtube.com/vi/738afAnLrO0/0.jpg)](https://www.youtube.com/watch?v=738afAnLrO0)
[Watch the video](https://www.youtube.com/watch?v=738afAnLrO0)
---

#### Objective

By the end of this session, you will:

* Understand how to **automate Terraform** using Jenkins pipelines.
* Learn to run **plan, apply, and destroy** Terraform tasks via Jenkins.
* Implement **safe, repeatable infrastructure deployment**.

---

#### Tools Used

* **Terraform CLI**
* **Jenkins** (installed on EC2 or local)
* **AWS Account**
* **GitHub Repo** (for Terraform code)

---

#### Step-by-Step Guide

##### 1. Jenkins Pipeline Setup

* Create a **Jenkins Pipeline Job**
* Connect to your **GitHub repository** containing Terraform code

---

##### 2. Sample Declarative Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/terraform-demo.git'
            }
        }

        stage('Terraform Init') {
            steps {
                sh 'terraform init'
            }
        }

        stage('Terraform Plan') {
            steps {
                sh 'terraform plan -out=tfplan'
            }
        }

        stage('Terraform Apply') {
            steps {
                input message: 'Approve Apply?'
                sh 'terraform apply tfplan'
            }
        }
    }

    post {
        always {
            echo 'Pipeline Completed'
        }
    }
}
```

---

##### 3. Configure Jenkins Credentials

* Go to **Jenkins → Credentials → Global**
* Add AWS keys as **“aws-access-key”** and **“aws-secret-key”**

---

##### 4. Run the Pipeline

* Trigger **Build Now**
* Jenkins will:

  1. Checkout code
  2. Initialize Terraform
  3. Generate plan
  4. Wait for manual approval
  5. Apply changes

---

##### 5. Verification

* Check **AWS Console** → resources created (EC2, S3, IAM)
* Review **Jenkins console logs** for errors
* Terraform state saved remotely (if configured)

---

#### Key Concepts Applied

| Concept              | Example Used                          |
| -------------------- | ------------------------------------- |
| CI/CD Integration    | Jenkins Pipeline runs Terraform tasks |
| Terraform Automation | init, plan, apply stages              |
| Secrets Management   | Jenkins credentials for AWS           |
| Manual Approval      | `input` step before apply             |

---

#### Bonus (Extra Learning)

* Add **destroy stage** to clean up infrastructure
* Integrate **Slack notifications** for pipeline success/failure
* Parameterize pipeline for **different environments**

---

#### Congratulations!

You’ve successfully integrated **Terraform with Jenkins**!
Now your infrastructure can be deployed automatically, safely, and repeatably.

---

#### Try These Next

* Add **staging and production pipelines**
* Use **multi-branch pipeline** to deploy feature-specific environments
* Automate remote state setup using **S3 backend**

## 19. Cohort Practice — Day 43: Jobs, Steps, Env Vars & Conditionals

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today you learn how to **control the flow** of your pipeline — multi-job workflows, passing data between jobs, environment variables, and running steps only when certain conditions are met.

---


#### Expected Output
- New workflow files in your `github-actions-practice` repo
  
- A markdown file: `day-43-jobs-steps.md`

---

#### Challenge Tasks

##### Task 1: Multi-Job Workflow
Create `.github/workflows/multi-job.yml` with 3 jobs:
- `build` — prints "Building the app"
- `test` — prints "Running tests"
- `deploy` — prints "Deploying"

Make `test` run only **after** `build` succeeds.
Make `deploy` run only **after** `test` succeeds.

**Verify:** Check the workflow graph in the Actions tab — does it show the dependency chain?

---

##### Task 2: Environment Variables
In a new workflow, use environment variables at 3 levels:
1. **Workflow level** — `APP_NAME: myapp`
2. **Job level** — `ENVIRONMENT: staging`
3. **Step level** — `VERSION: 1.0.0`

Print all three in a single step and verify each is accessible.

Then use a **GitHub context variable** — print the commit SHA and the actor (who triggered the run).

---

##### Task 3: Job Outputs
1. Create a job that **sets an output** — e.g., today's date as a string
2. Create a second job that **reads that output** and prints it
3. Pass the value using `outputs:` and `needs.<job>.outputs.<name>`

Write in your notes: Why would you pass outputs between jobs?

---

##### Task 4: Conditionals
In a workflow, add:
1. A step that only runs when the branch is `main`
2. A step that only runs when the previous step **failed**
3. A job that only runs on **push** events, not on pull requests
4. A step with `continue-on-error: true` — what does this do?

---

##### Task 5: Putting It Together
Create `.github/workflows/smart-pipeline.yml` that:
1. Triggers on push to any branch
2. Has a `lint` job and a `test` job running in parallel
3. Has a `summary` job that runs after both, prints whether it's a `main` branch push or a feature branch push, and prints the commit message

---

#### Hints
- Job dependency: `needs: [job-name]`
- Set output: `echo "date=$(date)" >> $GITHUB_OUTPUT`
- Read output: `${{ needs.job-name.outputs.date }}`
- Conditionals: `if: github.ref == 'refs/heads/main'`
- Commit message: `${{ github.event.commits[0].message }}`

---

#### Documentation
Create `day-43-jobs-steps.md` with:
- Key workflow snippets
- What `needs:` and `outputs:` do in your own words

---

#### Submission
1. Add `day-43-jobs-steps.md` to `2026/day-43/`
2. Commit and push to your fork

---

#### Learn in Public
Share the dependency chain diagram from your multi-job workflow on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 43: Nightly Synthetic Tests

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### Overview
Nightly synthetic monitoring pipeline: hit a live URL, measure health & latency, alert on failure, store JSON report.

#### Goals
- Jenkins scheduled job (cron nightly)
- SLA-style availability check
- Optional Slack alert + S3 archival

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [scripts/notify_slack.sh](files/hands-on-projects/scripts/notify_slack.sh)
- [scripts/report_to_s3.sh](files/hands-on-projects/scripts/report_to_s3.sh)
- [scripts/synthetic_check.sh](files/hands-on-projects/scripts/synthetic_check.sh)


---

[← Day 42](../day-42/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 44 →](../day-44/README.md)
