# Day 47 — Capstone 1 (Part 1/3): Design, App & CI Foundation

[← Day 46](../day-46/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 48 →](../day-48/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 1 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design an end-to-end CI/CD platform for a real app
- [ ] Create the repository, app and tests
- [ ] Implement the CI stage with quality gates

## 2. Prerequisites

- Days 1-46.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project definition

Capstone 1 - Secure CI/CD Platform: a 3-tier app (API + DB + frontend or API + worker) delivered by an automated pipeline: lint -> test -> SAST/SCA -> build -> image scan -> sign -> push -> deploy to staging -> smoke tests -> manual approval -> prod.

### 3.2 Architecture decisions

Write an ADR (Architecture Decision Record) for tooling choices, branching, tagging and environments.

### 3.3 Definition of done

Clean repo, README with diagram, reproducible local dev with Compose, green pipeline, security gates, runbook.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create repo `capstone1-secure-cicd` with standard layout.
2. [ ] Implement small API (Flask/FastAPI/Express) with `/health`, `/items` and tests (>= 80% coverage).
3. [ ] Create Compose for local dev with Postgres.
4. [ ] Add CI workflow: lint, tests, coverage, SAST, dependency scan.
5. [ ] Write ADR-001 and architecture diagram (Mermaid).

## 5. Real-World Scenario

> You are the first DevOps hire at a startup. The CTO wants a safe release process in 2 weeks. Present your design.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
mkdir -p capstone1-secure-cicd/{app,tests,docs,.github/workflows} && cd capstone1-secure-cicd
docker compose up -d --build
pytest --cov=app --cov-fail-under=80
gh workflow run ci.yml && gh run watch
mmdc -i docs/arch.mmd -o docs/arch.png   # optional mermaid-cli
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 47 – Advanced Triggers: PR Events, Cron Schedules & Event-Driven Pipelines — Challenge Brief

#### Task
You've used `push` and basic `pull_request` triggers. But GitHub Actions supports **dozens of event types** — today you go deep into PR lifecycle events, scheduled cron jobs, and chaining workflows together.

---

#### Expected Output
- Multiple workflow files demonstrating advanced triggers
- A markdown file: `day-47-advanced-triggers.md`
- At least one scheduled workflow running on your repo

---

#### Challenge Tasks

##### Task 1: Pull Request Event Types
Create `.github/workflows/pr-lifecycle.yml` that triggers on `pull_request` with **specific activity types**:
1. Trigger on: `opened`, `synchronize`, `reopened`, `closed`
2. Add steps that:
   - Print which event type fired: `${{ github.event.action }}`
   - Print the PR title: `${{ github.event.pull_request.title }}`
   - Print the PR author: `${{ github.event.pull_request.user.login }}`
   - Print the source branch and target branch
3. Add a conditional step that only runs when the PR is **merged** (closed + merged = true)

Test it: create a PR, push an update to it, then merge it. Watch the workflow fire each time with a different event type.

---

##### Task 2: PR Validation Workflow
Create `.github/workflows/pr-checks.yml` — a real-world PR gate:
1. Trigger on `pull_request` to `main`
2. Add a job `file-size-check` that:
   - Checks out the code
   - Fails if any file in the PR is larger than 1 MB
3. Add a job `branch-name-check` that:
   - Reads the branch name from `${{ github.head_ref }}`
   - Fails if it doesn't follow the pattern `feature/*`, `fix/*`, or `docs/*`
4. Add a job `pr-body-check` that:
   - Reads the PR body: `${{ github.event.pull_request.body }}`
   - Warns (but doesn't fail) if the PR description is empty

**Verify:** Open a PR from a badly named branch — does the check fail?

---

##### Task 3: Scheduled Workflows (Cron Deep Dive)
Create `.github/workflows/scheduled-tasks.yml`:
1. Add a `schedule` trigger with cron: `'30 2 * * 1'` (every Monday at 2:30 AM UTC)
2. Add **another** cron entry: `'0 */6 * * *'` (every 6 hours)
3. In the job, print which schedule triggered using `${{ github.event.schedule }}`
4. Add a step that acts as a **health check** — curl a URL and check the response code

Write in your notes:
- The cron expression for: every weekday at 9 AM IST
- The cron expression for: first day of every month at midnight
- Why GitHub says scheduled workflows may be delayed or skipped on inactive repos

**Important:** Also add `workflow_dispatch` so you can test it manually without waiting for the schedule.

---

##### Task 4: Path & Branch Filters
Create `.github/workflows/smart-triggers.yml`:
1. Trigger on push but **only** when files in `src/` or `app/` change:
   ```yaml
   on:
     push:
       paths:
         - 'src/**'
         - 'app/**'
   ```
2. Add `paths-ignore` in a second workflow that skips runs when only docs change:
   ```yaml
   paths-ignore:
     - '*.md'
     - 'docs/**'
   ```
3. Add branch filters to only trigger on `main` and `release/*` branches
4. Test it: push a change to a `.md` file — does the workflow skip?

Write in your notes: When would you use `paths` vs `paths-ignore`?

---

##### Task 5: `workflow_run` — Chain Workflows Together
Create two workflows:
1. `.github/workflows/tests.yml` — runs tests on every push
2. `.github/workflows/deploy-after-tests.yml` — triggers **only after** `tests.yml` completes successfully:
   ```yaml
   on:
     workflow_run:
       workflows: ["Run Tests"]
       types: [completed]
   ```
3. In the deploy workflow, add a conditional:
   - Only proceed if the triggering workflow **succeeded** (`${{ github.event.workflow_run.conclusion == 'success' }}`)
   - Print a warning and exit if it failed

**Verify:** Push a commit — does the test workflow run first, then trigger the deploy workflow?

---

##### Task 6: `repository_dispatch` — External Event Triggers
1. Create `.github/workflows/external-trigger.yml` with trigger `repository_dispatch`
2. Set it to respond to event type: `deploy-request`
3. Print the client payload: `${{ github.event.client_payload.environment }}`
4. Trigger it using `curl` or `gh`:
   ```bash
   gh api repos/<owner>/<repo>/dispatches \
     -f event_type=deploy-request \
     -f client_payload='{"environment":"production"}'
   ```

Write in your notes: When would an external system (like a Slack bot or monitoring tool) trigger a pipeline?

---

#### Hints
- PR merge check: `if: github.event.pull_request.merged == true`
- Cron syntax: `minute hour day-of-month month day-of-week`
- Scheduled workflows only run on the **default branch**
- `workflow_run` gives you access to the triggering workflow's conclusion and artifacts
- `repository_dispatch` requires a personal access token with `repo` scope
- Path filters use glob patterns — `**` matches nested directories

---

#### Documentation
Create `day-47-advanced-triggers.md` with:
- Your workflow YAML files
- The cron expressions from Task 3
- Screenshot of the PR checks running on a pull request
- Explanation of `workflow_run` vs `workflow_call` in your own words

---

#### Submission
1. Add `day-47-advanced-triggers.md` to `2026/day-47/`
2. Commit and push to your fork

---

#### Learn in Public
Share your PR validation workflow on LinkedIn — automated PR gates are a real DevOps flex.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 47 – Advanced Triggers: PR Events, Cron Schedules & Event-Driven Pipelines — Notes & Solution

#### Task
You've used `push` and basic `pull_request` triggers. But GitHub Actions supports **dozens of event types** — today you go deep into PR lifecycle events, scheduled cron jobs, and chaining workflows together.

---

#### Challenge Tasks

##### Task 1: Pull Request Event Types
Create `.github/workflows/pr-lifecycle.yml` that triggers on `pull_request` with **specific activity types**:
1. Trigger on: `opened`, `synchronize`, `reopened`, `closed`
2. Add steps that:
   - Print which event type fired: `${{ github.event.action }}`
   - Print the PR title: `${{ github.event.pull_request.title }}`
   - Print the PR author: `${{ github.event.pull_request.user.login }}`
   - Print the source branch and target branch
3. Add a conditional step that only runs when the PR is **merged** (closed + merged = true)

Test it: create a PR, push an update to it, then merge it. Watch the workflow fire each time with a different event type.

[pr-lifecycle.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/pr-lifecycle.yml)

<img width="1919" height="869" alt="Screenshot 2026-09-21 151154" src="https://github.com/user-attachments/assets/0b773a20-32a9-4fde-8b30-f585efe96f19" />

---

##### Task 2: PR Validation Workflow
Create `.github/workflows/pr-checks.yml` — a real-world PR gate:
1. Trigger on `pull_request` to `main`
2. Add a job `file-size-check` that:
   - Checks out the code
   - Fails if any file in the PR is larger than 1 MB
3. Add a job `branch-name-check` that:
   - Reads the branch name from `${{ github.head_ref }}`
   - Fails if it doesn't follow the pattern `feature/*`, `fix/*`, or `docs/*`
4. Add a job `pr-body-check` that:
   - Reads the PR body: `${{ github.event.pull_request.body }}`
   - Warns (but doesn't fail) if the PR description is empty

**Verify:** Open a PR from a badly named branch — does the check fail?

[pr-lifecycle-check.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/pr-lifecycle-checks.yml)

<img width="1919" height="859" alt="Screenshot 2026-09-21 150943" src="https://github.com/user-attachments/assets/612cd8a6-b317-4484-96f1-da063f077d18" />
<img width="1919" height="863" alt="Screenshot 2026-09-21 151010" src="https://github.com/user-attachments/assets/8159317c-97f4-43b9-9b03-e6ce2d622f17" />


---

##### Task 3: Scheduled Workflows (Cron Deep Dive)
Create `.github/workflows/scheduled-tasks.yml`:
1. Add a `schedule` trigger with cron: `'30 2 * * 1'` (every Monday at 2:30 AM UTC)
2. Add **another** cron entry: `'0 */6 * * *'` (every 6 hours)
3. In the job, print which schedule triggered using `${{ github.event.schedule }}`
4. Add a step that acts as a **health check** — curl a URL and check the response code

**Important:** Also add `workflow_dispatch` so you can test it manually without waiting for the schedule.

[scheduled-task.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/scheduled-tasks.yml)

<img width="1919" height="864" alt="Screenshot 2026-09-21 151648" src="https://github.com/user-attachments/assets/4d0ce72d-54d6-4fee-bf7e-fc4bad109785" />

Write in your notes:
- The cron expression for: every weekday at 9 AM IST: `0 3 * * 1-5`
- The cron expression for: first day of every month at midnight: `0 0 1 * *`
- Why GitHub says scheduled workflows may be delayed or skipped on inactive repos
   - Scheduled workflows run on shared runners and only on the default branch.
   - GitHub may delay/skip schedules on inactive repositories to save resources.

---

##### Task 4: Path & Branch Filters
Create `.github/workflows/smart-triggers.yml`:
1. Trigger on push but **only** when files in `src/` or `app/` change:
   ```yaml
   on:
     push:
       paths:
         - 'src/**'
         - 'app/**'
   ```
2. Add `paths-ignore` in a second workflow that skips runs when only docs change:
   ```yaml
   paths-ignore:
     - '*.md'
     - 'docs/**'
   ```
3. Add branch filters to only trigger on `main` and `release/*` branches
4. Test it: push a change to a `.md` file — does the workflow skip?

Yes,Workflow skip

[smart-trigger.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/smart-triggers.yml)

<img width="1919" height="882" alt="Screenshot 2026-09-21 151939" src="https://github.com/user-attachments/assets/e318e9a0-2f2f-4515-8ee4-653b7739178a" />


Write in your notes: When would you use `paths` vs `paths-ignore`?

- Use paths when you want the workflow to run only if specific files or folders change.

- Use paths-ignore when the workflow should run for most changes but skip certain files.

---

##### Task 5: `workflow_run` — Chain Workflows Together
Create two workflows:
1. `.github/workflows/tests.yml` — runs tests on every push
2. `.github/workflows/deploy-after-tests.yml` — triggers **only after** `tests.yml` completes successfully:
   ```yaml
   on:
     workflow_run:
       workflows: ["Run Tests"]
       types: [completed]
   ```
3. In the deploy workflow, add a conditional:
   - Only proceed if the triggering workflow **succeeded** (`${{ github.event.workflow_run.conclusion == 'success' }}`)
   - Print a warning and exit if it failed

**Verify:** Push a commit — does the test workflow run first, then trigger the deploy workflow?

[test.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/tests.yml)

<img width="1915" height="878" alt="Screenshot 2026-09-21 152225" src="https://github.com/user-attachments/assets/efd8cced-9872-435f-bf4f-c580bae888a5" />

[deploy-after-test.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/deploy-after-tests.yml)

<img width="1919" height="857" alt="Screenshot 2026-09-21 152345" src="https://github.com/user-attachments/assets/240c5a18-731d-4c8e-99ce-2e1d17ed8365" />



---

##### Task 6: `repository_dispatch` — External Event Triggers
1. Create `.github/workflows/external-trigger.yml` with trigger `repository_dispatch`
2. Set it to respond to event type: `deploy-request`
3. Print the client payload: `${{ github.event.client_payload.environment }}`
4. Trigger it using `curl` or `gh`:
   ```bash
   gh api repos/<owner>/<repo>/dispatches \
     -f event_type=deploy-request \
     -f client_payload='{"environment":"production"}'
   ```
[external-trigger.yml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/external-trigger.yml)

<img width="1094" height="229" alt="Screenshot 2026-09-21 152944" src="https://github.com/user-attachments/assets/c2530118-cd04-4701-b06f-4ba1879e9eaf" />
<img width="1919" height="879" alt="Screenshot 2026-09-21 152933" src="https://github.com/user-attachments/assets/fc223b7b-430a-4b14-84bc-f14ec6b5352a" />


Write in your notes: When would an external system (like a Slack bot or monitoring tool) trigger a pipeline?

When would an external system (like a Slack bot or monitoring tool) trigger a pipeline?

**An external system (like a Slack bot or monitoring tool) would trigger a pipeline when an event outside GitHub needs a workflow to run, such as:**
   - A Slack bot sending a deploy request to start deployment.
   - A monitoring tool detecting an error and triggering a fix workflow.
   - One repository finishing work and notifying another repository to run a workflow.

---

`workflow_call`
   - Makes a workflow reusable, like a function.
   - One workflow calls another directly.
   - Can pass inputs and secrets.
   - `Example`: `deploy.yml` calls `test.yml` before deploying.

`workflow_run`
   - Triggers a workflow after another workflow finishes.
   - Runs automatically based on workflow completion and status.
   - No input passing.
   - `Example`: `deploy.yml` runs only `after tests succeed`.

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write ADR-001 'CI/CD tool choice'. | You can demonstrate, without notes: *design an end-to-end CI/CD platform for a real app* — with evidence committed to `day-47/`. |
| 2 | Define environment strategy (dev/staging/prod). | You can demonstrate, without notes: *create the repository, app and tests* — with evidence committed to `day-47/`. |
| 3 | List risks and mitigations. | You can demonstrate, without notes: *implement the CI stage with quality gates* — with evidence committed to `day-47/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Coverage gate fails | Add tests for critical paths; don't lower the gate without justification. |
| Compose DB races | Add healthcheck and wait. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Threat-model the pipeline itself: who can modify workflows, where secrets live, who can deploy.
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

1. How do you design a pipeline?
2. What is an ADR?
3. What gates would you add?
4. How do you secure the pipeline?
5. **Scenario:** You are the first DevOps hire at a startup. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Is my design documented? | ☐ | ☐ | ☐ | ☐ |
| Does CI run on every PR? | ☐ | ☐ | ☐ | ☐ |
| Do I have an ADR? | ☐ | ☐ | ☐ | ☐ |
| Design an end-to-end CI/CD platform for a real app | ☐ | ☐ | ☐ | ☐ |
| Create the repository, app and tests | ☐ | ☐ | ☐ | ☐ |
| Implement the CI stage with quality gates | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-47/` in your own repository:

```text
day-47/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-47
git add day-47/
git commit -m "day-47: capstone 1 (part 1/3)"
git push -u origin day-47
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 47: Introduction to Ansible and Configuration Management

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 47** of the DevOps 90-Day Challenge!
Today, we’ll dive into **Configuration Management** with **Ansible**, exploring how to automate server setup and management.

[![](https://img.youtube.com/vi/oIHRghjLfTM/0.jpg)](https://www.youtube.com/watch?v=oIHRghjLfTM)

[Watch the video](https://www.youtube.com/watch?v=oIHRghjLfTM)

---

#### Objective

By the end of this session, you will:

* Understand the concepts of **Configuration Management**.
* Install and configure **Ansible** on a control node.
* Setup **Passwordless SSH** between control and managed nodes.
* Run your first **Ad-Hoc** Ansible commands.

---

#### Tools Used

* **Ansible** (Control Node)
* **Linux Servers** (Managed Nodes - e.g., Ubuntu/CentOS)
* **SSH** (Secure Shell)
* **Python** (Required on managed nodes)

---

#### Key Concepts

##### 1. What is Ansible?

Ansible is an open-source automation tool used for **configuration management**, **application deployment**, and **task automation**. It is **agentless**, meaning it doesn't require any software to be installed on the managed nodes, just SSH.

##### 2. Architecture

* **Control Node**: The machine where Ansible is installed and from where commands are run.
* **Managed Nodes**: The servers being configured.
* **Inventory**: A text file that lists the IP addresses or hostnames of managed nodes.

##### 3. Inventory File Example

```ini
[webservers]
192.168.1.10
192.168.1.11

[dbservers]
192.168.1.20
```

##### 4. Ad-Hoc Commands

Run a command across all servers without writing a playbook:

```bash
# Ping all servers
ansible all -m ping -i inventory.txt

# Check uptime
ansible all -a "uptime" -i inventory.txt
```

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Agentless** | No software installed on `webservers`, only SSH access used. |
| **Inventory** | `hosts` file defining the group of servers to manage. |
| **Ad-Hoc Commands** | `ansible -m ping` to test connectivity quickly. |
| **Idempotency** | Ensuring a task (like installing a package) changes state only if needed. |

---

#### Bonus (Extra Learning)

* Explore **Ansible Configuration file (`ansible.cfg`)** settings.
* Learn about **Dynamic Inventory** for cloud environments (AWS/Azure).

---

#### Congratulations!

You’ve successfully set up your **Ansible environment** and established connectivity with your managed nodes!
This is the foundation for creating complex automation playbooks.

---

#### Try These Next

* Try installing **Apache/Nginx** using an ad-hoc command.
* Create a custom group in your inventory file for **database servers**.

## 19. Cohort Practice — Day 47: Advanced Triggers: PR Events, Cron Schedules & Event-Driven Pipelines

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You've used `push` and basic `pull_request` triggers. But GitHub Actions supports **dozens of event types** — today you go deep into PR lifecycle events, scheduled cron jobs, and chaining workflows together.

---

#### Expected Output
- Multiple workflow files demonstrating advanced triggers
- A markdown file: `day-47-advanced-triggers.md`
- At least one scheduled workflow running on your repo

---

#### Challenge Tasks

##### Task 1: Pull Request Event Types
Create `.github/workflows/pr-lifecycle.yml` that triggers on `pull_request` with **specific activity types**:
1. Trigger on: `opened`, `synchronize`, `reopened`, `closed`
2. Add steps that:
   - Print which event type fired: `${{ github.event.action }}`
   - Print the PR title: `${{ github.event.pull_request.title }}`
   - Print the PR author: `${{ github.event.pull_request.user.login }}`
   - Print the source branch and target branch
3. Add a conditional step that only runs when the PR is **merged** (closed + merged = true)

Test it: create a PR, push an update to it, then merge it. Watch the workflow fire each time with a different event type.

---

##### Task 2: PR Validation Workflow
Create `.github/workflows/pr-checks.yml` — a real-world PR gate:
1. Trigger on `pull_request` to `main`
2. Add a job `file-size-check` that:
   - Checks out the code
   - Fails if any file in the PR is larger than 1 MB
3. Add a job `branch-name-check` that:
   - Reads the branch name from `${{ github.head_ref }}`
   - Fails if it doesn't follow the pattern `feature/*`, `fix/*`, or `docs/*`
4. Add a job `pr-body-check` that:
   - Reads the PR body: `${{ github.event.pull_request.body }}`
   - Warns (but doesn't fail) if the PR description is empty

**Verify:** Open a PR from a badly named branch — does the check fail?

---

##### Task 3: Scheduled Workflows (Cron Deep Dive)
Create `.github/workflows/scheduled-tasks.yml`:
1. Add a `schedule` trigger with cron: `'30 2 * * 1'` (every Monday at 2:30 AM UTC)
2. Add **another** cron entry: `'0 */6 * * *'` (every 6 hours)
3. In the job, print which schedule triggered using `${{ github.event.schedule }}`
4. Add a step that acts as a **health check** — curl a URL and check the response code

Write in your notes:
- The cron expression for: every weekday at 9 AM IST
- The cron expression for: first day of every month at midnight
- Why GitHub says scheduled workflows may be delayed or skipped on inactive repos

**Important:** Also add `workflow_dispatch` so you can test it manually without waiting for the schedule.

---

##### Task 4: Path & Branch Filters
Create `.github/workflows/smart-triggers.yml`:
1. Trigger on push but **only** when files in `src/` or `app/` change:
   ```yaml
   on:
     push:
       paths:
         - 'src/**'
         - 'app/**'
   ```
2. Add `paths-ignore` in a second workflow that skips runs when only docs change:
   ```yaml
   paths-ignore:
     - '*.md'
     - 'docs/**'
   ```
3. Add branch filters to only trigger on `main` and `release/*` branches
4. Test it: push a change to a `.md` file — does the workflow skip?

Write in your notes: When would you use `paths` vs `paths-ignore`?

---

##### Task 5: `workflow_run` — Chain Workflows Together
Create two workflows:
1. `.github/workflows/tests.yml` — runs tests on every push
2. `.github/workflows/deploy-after-tests.yml` — triggers **only after** `tests.yml` completes successfully:
   ```yaml
   on:
     workflow_run:
       workflows: ["Run Tests"]
       types: [completed]
   ```
3. In the deploy workflow, add a conditional:
   - Only proceed if the triggering workflow **succeeded** (`${{ github.event.workflow_run.conclusion == 'success' }}`)
   - Print a warning and exit if it failed

**Verify:** Push a commit — does the test workflow run first, then trigger the deploy workflow?

---

##### Task 6: `repository_dispatch` — External Event Triggers
1. Create `.github/workflows/external-trigger.yml` with trigger `repository_dispatch`
2. Set it to respond to event type: `deploy-request`
3. Print the client payload: `${{ github.event.client_payload.environment }}`
4. Trigger it using `curl` or `gh`:
   ```bash
   gh api repos/<owner>/<repo>/dispatches \
     -f event_type=deploy-request \
     -f client_payload='{"environment":"production"}'
   ```

Write in your notes: When would an external system (like a Slack bot or monitoring tool) trigger a pipeline?

---

#### Hints
- PR merge check: `if: github.event.pull_request.merged == true`
- Cron syntax: `minute hour day-of-month month day-of-week`
- Scheduled workflows only run on the **default branch**
- `workflow_run` gives you access to the triggering workflow's conclusion and artifacts
- `repository_dispatch` requires a personal access token with `repo` scope
- Path filters use glob patterns — `**` matches nested directories

---

#### Documentation
Create `day-47-advanced-triggers.md` with:
- Your workflow YAML files
- The cron expressions from Task 3
- Screenshot of the PR checks running on a pull request
- Explanation of `workflow_run` vs `workflow_call` in your own words

---

#### Submission
1. Add `day-47-advanced-triggers.md` to `2026/day-47/`
2. Commit and push to your fork

---

#### Learn in Public
Share your PR validation workflow on LinkedIn — automated PR gates are a real DevOps flex.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 47: Docker Compose for Local Dev

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Use Compose to run API + Redis, with healthchecks, smoke tests, and Jenkins pipeline.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [Makefile](files/hands-on-projects/Makefile)
- [api/Dockerfile](files/hands-on-projects/api/Dockerfile)
- [api/app.py](files/hands-on-projects/api/app.py)
- [api/main.py](files/hands-on-projects/api/main.py)
- [api/requirements.txt](files/hands-on-projects/api/requirements.txt)
- [docker-compose.yml](files/hands-on-projects/docker-compose.yml)
- [scripts/compose_down.sh](files/hands-on-projects/scripts/compose_down.sh)
- [scripts/compose_up.sh](files/hands-on-projects/scripts/compose_up.sh)
- [scripts/smoke_test.sh](files/hands-on-projects/scripts/smoke_test.sh)
- [scripts/wait_for.sh](files/hands-on-projects/scripts/wait_for.sh)


---

[← Day 46](../day-46/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 48 →](../day-48/README.md)
