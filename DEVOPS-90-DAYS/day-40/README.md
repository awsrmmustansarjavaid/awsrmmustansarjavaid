# Day 40 — Jenkins: Installation, Pipelines & Jenkinsfile

[← Day 39](../day-39/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 41 →](../day-41/README.md)

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

- [ ] Install and secure Jenkins
- [ ] Write declarative pipelines as code
- [ ] Understand where Jenkins still fits in 2026

## 2. Prerequisites

- Docker (Day 29-33), Git.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why Jenkins

Widely deployed in enterprises; highly extensible; self-hosted. Knowing it is expected for many roles even as teams move to Actions/GitLab.

### 3.2 Architecture

Controller (UI, scheduling) + agents (execute builds). Keep builds off the controller. Run Jenkins in Docker with a persistent volume.

### 3.3 Declarative Pipeline

`pipeline { agent; environment; stages; steps; post }`; `when`, `parallel`, `input`, `credentials()` binding.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run Jenkins LTS in Docker with volume `jenkins_home`.
2. [ ] Complete setup wizard; install suggested plugins; create admin user.
3. [ ] Create a Pipeline job from SCM using a `Jenkinsfile`.
4. [ ] Add stages: Checkout, Test, Build, Docker Build.
5. [ ] Add `post { always { junit ... } failure { echo ... } }`.

## 5. Real-World Scenario

> The legacy team uses freestyle jobs configured by clicking. Convert one to Pipeline-as-Code in git, so changes are reviewable.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
// Jenkinsfile
pipeline {
  agent any
  options { timeout(time: 15, unit: 'MINUTES'); buildDiscarder(logRotator(numToKeepStr: '20')) }
  stages {
    stage('Test')  { steps { sh 'make test' } }
    stage('Build') { steps { sh 'docker build -t app:${BUILD_NUMBER} .' } }
  }
  post { always { junit 'reports/*.xml' } failure { echo 'Build failed' } }
}
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 40 – Your First GitHub Actions Workflow — Challenge Brief

#### Task
Today you write your **first GitHub Actions pipeline** and watch it run in the cloud.

This is the moment CI/CD stops being a concept and becomes real.

---

#### Expected Output
- A workflow file: `.github/workflows/hello.yml`
- A markdown file: `day-40-first-workflow.md`
- Screenshot of your first green pipeline run

---

#### Challenge Tasks

##### Task 1: Set Up
1. Create a new **public** GitHub repository called `github-actions-practice`
2. Clone it locally
3. Create the folder structure: `.github/workflows/`

---

##### Task 2: Hello Workflow
Create `.github/workflows/hello.yml` with a workflow that:
1. Triggers on every `push`
2. Has one job called `greet`
3. Runs on `ubuntu-latest`
4. Has two steps:
   - Step 1: Check out the code using `actions/checkout`
   - Step 2: Print `Hello from GitHub Actions!`

Push it. Go to the **Actions** tab on GitHub and watch it run.

**Verify:** Is it green? Click into the job and read every step.

---

##### Task 3: Understand the Anatomy
Look at your workflow file and write in your notes what each key does:
- `on:`
- `jobs:`
- `runs-on:`
- `steps:`
- `uses:`
- `run:`
- `name:` (on a step)

---

##### Task 4: Add More Steps
Update `hello.yml` to also:
1. Print the current date and time
2. Print the name of the branch that triggered the run (hint: GitHub provides this as a variable)
3. List the files in the repo
4. Print the runner's operating system

Push again — watch the new run.

---

##### Task 5: Break It On Purpose
1. Add a step that runs a command that will **fail** (e.g., `exit 1` or a misspelled command)
2. Push and observe what happens in the Actions tab
3. Fix it and push again

Write in your notes: What does a failed pipeline look like? How do you read the error?

---

#### Hints
- Workflow files live in `.github/workflows/` and must end in `.yml`
- `uses: actions/checkout@v4` checks out your code onto the runner
- `run:` executes shell commands
- GitHub provides built-in variables like `${{ github.ref_name }}` for branch name
- Every push triggers a new run — check the Actions tab

---

#### Documentation
Create `day-40-first-workflow.md` with:
- Your workflow YAML
- Screenshot of the green run
- What each `on:`, `jobs:`, `steps:` key does (your own words)

---

#### Submission
1. Add `day-40-first-workflow.md` to `2026/day-40/`
2. Commit and push to your fork

---

#### Learn in Public
Share your first green pipeline screenshot on LinkedIn. That green checkmark hits different.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀Day 40 – Your First GitHub Actions Workflow — Notes & Solution

#### 🎯Task
Today you write your **first GitHub Actions pipeline** and watch it run in the cloud.

This is the moment CI/CD stops being a concept and becomes real.

---

#### 🛠️Challenge Tasks

##### 🔹Task 1: Set Up
1. Create a new **public** GitHub repository called `github-actions-practice`
2. Clone it locally
3. Create the folder structure: `.github/workflows/`

<img width="1919" height="559" alt="Screenshot 2026-09-09 174502" src="https://github.com/user-attachments/assets/8dce6a37-87dd-489a-bc62-a031605f845c" />


---

##### 🔹Task 2: Hello Workflow
Create `.github/workflows/hello.yml` with a workflow that:
1. Triggers on every `push`
2. Has one job called `greet`
3. Runs on `ubuntu-latest`
4. Has two steps:
   - Step 1: Check out the code using `actions/checkout`
   - Step 2: Print `Hello from GitHub Actions!`

Push it. Go to the **Actions** tab on GitHub and watch it run.

**Verify:** Is it green? Click into the job and read every step.

- Yes,it is green

<img width="1919" height="842" alt="Screenshot 2026-09-09 174622" src="https://github.com/user-attachments/assets/db4b98fd-30ab-4a8f-ae6f-0c635f59a54d" />


---

##### 🔹Task 3: Understand the Anatomy
Look at your workflow file and write in your notes what each key does:
- `on:`
   - Defines `when the worflow is triggered`
   - It listen for event `push`

- `jobs:`
   - Defines the jobs that the worflow will execute
   - A `workflow` can have one or multiple jobs

- `runs-on:`
   - Specifies the virtual machine(runner) env the job will use.
   - `ubuntu-latest`,`windows-latest`,`macos-latest`

- `steps:`
   - Defines the sequences of actions the job will execute
   - Steps run one after another inside the job.

- `uses:`
   - Tells Github to use a prebuilt action
   - Checkout action to clone the repo.

- `run:`
   - Executes commands directly on the runner

- `name:` (on a step)
   - This is the name of the workflow
   - Give the step a humand readable label in the Actions UI.
---

##### 🔹Task 4: Add More Steps
Update `hello.yml` to also:

1. Print the current date and time
```
- name: Print current date and time
  run: date
```

2. Print the name of the branch that triggered the run (hint: GitHub provides this as a variable)
```
- name: Print branch name
  run: echo "Branch name is ${{ github.ref_name }}**
```

3. List the files in the repo
```
- name: List repository files
  run: ls -la
```

4. Print the runner's operating system
```
- name: runner operating system
  run: echo "Runner OS is $RUNNER_OS"
```

Push again — watch the new run.

<img width="1910" height="878" alt="Screenshot 2026-09-09 175845" src="https://github.com/user-attachments/assets/85cdcab9-ef1a-43a5-af6c-6b5de12edbd7" />


---

##### 🔹Task 5: Break It On Purpose
1. Add a step that runs a command that will **fail** (e.g., `exit 1` or a misspelled command)
2. Push and observe what happens in the Actions tab
3. Fix it and push again

Write in your notes: What does a failed pipeline look like? How do you read the error?

- Error
<img width="1919" height="465" alt="Screenshot 2026-09-09 175555" src="https://github.com/user-attachments/assets/4124901c-efed-4f9a-9ae7-e176593b704a" />


- Fix

<img width="1910" height="878" alt="Screenshot 2026-09-09 175845" src="https://github.com/user-attachments/assets/560e3abe-7ba6-400e-858f-14193077f6f1" />


---
#### 🧠 Key Takeaways

⭐ GitHub Actions automates CI/CD workflows.

⭐ Workflow files are stored inside:

.github/workflows/

⭐ on: → Defines when the workflow runs.

⭐ jobs: → Defines what work needs to be performed.

⭐ runs-on: → Defines where the job runs.

⭐ steps: → Defines the individual tasks.

⭐ uses: → Uses a prebuilt GitHub Action.

⭐ run: → Executes shell commands.

⭐ name: → Gives workflows and steps readable names.

⭐ Every push can trigger a new workflow run when configured with on: push.

⭐ A green 🟢 checkmark means the workflow completed successfully.

⭐ A red ❌ mark means one or more steps failed.

⭐ Logs are essential for troubleshooting failed pipelines.

---

#### 🚀 What I Learned

Today I created my first GitHub Actions workflow, triggered it using a Git push, explored the GitHub-hosted runner, added multiple automation steps, intentionally broke the pipeline, analyzed the failure, fixed it, and achieved a successful green pipeline.

CI/CD is no longer just theory — I have now executed my first pipeline! 🚀

---

Happy Learning!

**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `parallel` stage for lint and unit tests. | You can demonstrate, without notes: *install and secure Jenkins* — with evidence committed to `day-40/`. |
| 2 | Back up `jenkins_home` and test restore. | You can demonstrate, without notes: *write declarative pipelines as code* — with evidence committed to `day-40/`. |
| 3 | Write a comparison: Jenkins vs Actions vs GitLab CI. | You can demonstrate, without notes: *understand where Jenkins still fits in 2026* — with evidence committed to `day-40/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Plugin install fails | Check proxy/Internet; update Jenkins; view Update Center logs. |
| `docker: not found` in pipeline | Agent lacks Docker; use a Docker agent or mount socket carefully. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Enable authentication/authorisation matrix, disable anonymous access, keep plugins updated, use credentials binding, never run builds on controller.
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

1. Controller vs agent?
2. Declarative vs scripted pipeline?
3. How do you store credentials?
4. Why Pipeline as Code?
5. **Scenario:** The legacy team uses freestyle jobs configured by clicking. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a Jenkinsfile? | ☐ | ☐ | ☐ | ☐ |
| Can I secure Jenkins basics? | ☐ | ☐ | ☐ | ☐ |
| Can I explain when to use Jenkins? | ☐ | ☐ | ☐ | ☐ |
| Install and secure Jenkins | ☐ | ☐ | ☐ | ☐ |
| Write declarative pipelines as code | ☐ | ☐ | ☐ | ☐ |
| Understand where Jenkins still fits in 2026 | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-40/` in your own repository:

```text
day-40/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-40
git add day-40/
git commit -m "day-40: jenkins"
git push -u origin day-40
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

---

[← Day 39](../day-39/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 41 →](../day-41/README.md)
