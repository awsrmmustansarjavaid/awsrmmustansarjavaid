# Day 41 — Jenkins: Agents, Credentials, Multibranch & Shared Libraries

[← Day 40](../day-40/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 42 →](../day-42/README.md)

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

- [ ] Scale builds with agents
- [ ] Use credentials and multibranch pipelines
- [ ] Create a shared library

## 2. Prerequisites

- Day 40.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Agents

SSH or inbound agents, Docker agents, Kubernetes pod agents (ephemeral). Label agents and route stages with `agent { label 'docker' }`.

### 3.2 Credentials and branches

Secret text, username/password, SSH key. Multibranch pipelines auto-discover branches and PRs with a Jenkinsfile.

### 3.3 Shared libraries

Reusable Groovy functions under `vars/`; versioned in git; loaded with `@Library('lib@v1')`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add an agent container (inbound) and run a job on it.
2. [ ] Store a Docker registry credential and use `withCredentials`.
3. [ ] Create a multibranch pipeline for your repo.
4. [ ] Create shared library with `buildDockerImage()` function.
5. [ ] Use it in the Jenkinsfile.

## 5. Real-World Scenario

> Ten repos have duplicated Jenkinsfiles. Move common steps into a versioned shared library and roll out a change safely.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
agent { label 'docker' }
withCredentials([usernamePassword(credentialsId: 'ghcr', usernameVariable: 'U', passwordVariable: 'P')]) {
  sh 'echo "$P" | docker login ghcr.io -u "$U" --password-stdin'
}
// vars/buildDockerImage.groovy
def call(Map cfg) { sh "docker build -t ${cfg.image}:${cfg.tag} ." }
// Jenkinsfile
@Library('devops-lib@v1.0') _
buildDockerImage(image: 'app', tag: env.BUILD_NUMBER)
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 41 – Triggers & Matrix Builds — Challenge Brief

#### Task
Your pipeline runs on push. Today you learn **every way to trigger a workflow** and how to run jobs across multiple environments at once.

---

#### Expected Output
- New workflow files in your `github-actions-practice` repo
- A markdown file: `day-41-triggers.md`

---

#### Challenge Tasks

##### Task 1: Trigger on Pull Request
1. Create `.github/workflows/pr-check.yml`
2. Trigger it only when a pull request is **opened or updated** against `main`
3. Add a step that prints: `PR check running for branch: <branch name>`
4. Create a new branch, push a commit, and open a PR
5. Watch the workflow run automatically

**Verify:** Does it show up on the PR page?

---

##### Task 2: Scheduled Trigger
1. Add a `schedule:` trigger to any workflow using cron syntax
2. Set it to run every day at midnight UTC
3. Write in your notes: What is the cron expression for every Monday at 9 AM?

---

##### Task 3: Manual Trigger
1. Create `.github/workflows/manual.yml` with a `workflow_dispatch:` trigger
2. Add an **input** that asks for an `environment` name (staging/production)
3. Print the input value in a step
4. Go to the **Actions** tab → find the workflow → click **Run workflow**

**Verify:** Can you trigger it manually and see your input printed?

---

##### Task 4: Matrix Builds
Create `.github/workflows/matrix.yml` that:
1. Uses a matrix strategy to run the same job across:
   - Python versions: `3.10`, `3.11`, `3.12`
2. Each job installs Python and prints the version
3. Watch all 3 run in parallel

Then extend the matrix to also include 2 operating systems — how many total jobs run now?

---

##### Task 5: Exclude & Fail-Fast
1. In your matrix, **exclude** one specific combination (e.g., Python 3.10 on Windows)
2. Set `fail-fast: false` — trigger a failure in one job and observe what happens to the rest
3. Write in your notes: What does `fail-fast: true` (the default) do vs `false`?

---

#### Hints
- PR trigger: `on: pull_request: branches: [main]`
- Cron trigger: `on: schedule: - cron: '0 0 * * *'`
- Manual trigger: `on: workflow_dispatch: inputs:`
- Matrix: `strategy: matrix: python-version: [...]`
- Exclude: `exclude: - os: windows-latest python-version: "3.10"`

---

#### Documentation
Create `day-41-triggers.md` with:
- Each workflow YAML
- Screenshots of runs
- The cron expression answer from Task 2

---

#### Submission
1. Add `day-41-triggers.md` to `2026/day-41/`
2. Commit and push to your fork

---

#### Learn in Public
Share your matrix build screenshot — seeing multiple jobs run in parallel for the first time is a great moment.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 41 – Triggers & Matrix Builds — Notes & Solution

#### Task
Your pipeline runs on push. Today you learn **every way to trigger a workflow** and how to run jobs across multiple environments at once.

---

#### Challenge Tasks

##### Task 1: Trigger on Pull Request
1. Create `.github/workflows/pr-check.yml`
2. Trigger it only when a pull request is **opened or updated** against `main`
3. Add a step that prints: `PR check running for branch: <branch name>`
4. Create a new branch, push a commit, and open a PR
5. Watch the workflow run automatically

**Verify:** Does it show up on the PR page? - **Yes**

- After creating pull request
[pr-check yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/pr-check.yml)
 
<img width="1919" height="850" alt="Screenshot 2026-09-10 135152" src="https://github.com/user-attachments/assets/c705a306-114a-4a7b-a3ab-2e5577b8ee2f" />


---

##### Task 2: Scheduled Trigger
1. Add a `schedule:` trigger to any workflow using cron syntax
2. Set it to run every day at midnight UTC - (`0 0 * * *`)
3. Write in your notes: What is the cron expression for every Monday at 9 AM?
 > 0 9 * * 1


---

##### Task 3: Manual Trigger
1. Create `.github/workflows/manual.yml` with a `workflow_dispatch:` trigger
2. Add an **input** that asks for an `environment` name (staging/production)
3. Print the input value in a step
4. Go to the **Actions** tab → find the workflow → click **Run workflow**

**Verify:** Can you trigger it manually and see your input printed?
[manual yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/manual.yml)

<img width="1917" height="833" alt="Screenshot 2026-09-10 135401" src="https://github.com/user-attachments/assets/1a53d268-1e52-4878-a26b-471ae967af83" />

---

##### Task 4: Matrix Builds
Create `.github/workflows/matrix.yml` that:
1. Uses a matrix strategy to run the same job across:
   - Python versions: `3.10`, `3.11`, `3.12`
2. Each job installs Python and prints the version
3. Watch all 3 run in parallel

Then extend the matrix to also include 2 operating systems — how many total jobs run now?
[matrix yaml](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/matrix.yml)
<img width="1919" height="879" alt="Screenshot 2026-09-10 135532" src="https://github.com/user-attachments/assets/3b9a51b3-f519-4ab4-968e-7026dd01a425" />

---

##### Task 5: Exclude & Fail-Fast
1. In your matrix, **exclude** one specific combination (e.g., Python 3.10 on Windows)
- After adding exclude for python-3.10 on macos it skipped that job.

 [ matrios yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/matrixos.yml)
 
<img width="1919" height="867" alt="Screenshot 2026-09-10 141019" src="https://github.com/user-attachments/assets/f85da938-51fd-44ae-b675-ebdd606b4d00" />


2. Set `fail-fast: false` — trigger a failure in one job and observe what happens to the rest
 - `fail-fast: false`
<img width="1919" height="834" alt="Screenshot 2026-09-10 140305" src="https://github.com/user-attachments/assets/930c6914-f823-4be9-b56f-329c4216f42a" />


3. Write in your notes: What does `fail-fast: true` (the default) do vs `false`?

- `fail-fast: true`
<img width="1918" height="867" alt="Screenshot 2026-09-10 140936" src="https://github.com/user-attachments/assets/1d9bee31-01ed-4508-8aa3-3ca097d980da" />



- Observation

- `fail-fast: false`):
     - In the workflow, a failure was triggered for Python 3.11 using exit 1. 
     - As shown in the screenshot,the jobs (`windows-latest, 3.11`) and (`ubuntu-latest, 3.11`) `failed`,but the other jobs continued running and completed successfully.
     - This shows that `fail-fast: false` allows all matrix jobs to run even if some fail.

  - `fail-fast: true (default)`: If one job fails, the remaining matrix jobs are cancelled.
  - `fail-fast: false`: If one job fails, the other jobs continue running until completion.

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a tag-based release stage using `when { tag 'v*' }`. | You can demonstrate, without notes: *scale builds with agents* — with evidence committed to `day-41/`. |
| 2 | Add webhook trigger from GitHub. | You can demonstrate, without notes: *use credentials and multibranch pipelines* — with evidence committed to `day-41/`. |
| 3 | Document agent labels. | You can demonstrate, without notes: *create a shared library* — with evidence committed to `day-41/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Credentials printed | Jenkins masks but never `echo` secrets; avoid string interpolation with secrets in `sh`. |
| Library not found | Configure under Manage Jenkins -> System -> Global Pipeline Libraries. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use least-privilege credentials, folder-scoped credentials, ephemeral agents, pin library versions.
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

1. Why ephemeral agents?
2. What does multibranch do?
3. What is a shared library?
4. How do you avoid leaking secrets in `sh` steps?
5. **Scenario:** Ten repos have duplicated Jenkinsfiles. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I route stages to agents? | ☐ | ☐ | ☐ | ☐ |
| Can I use a shared library? | ☐ | ☐ | ☐ | ☐ |
| Can I handle credentials safely? | ☐ | ☐ | ☐ | ☐ |
| Scale builds with agents | ☐ | ☐ | ☐ | ☐ |
| Use credentials and multibranch pipelines | ☐ | ☐ | ☐ | ☐ |
| Create a shared library | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-41/` in your own repository:

```text
day-41/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-41
git add day-41/
git commit -m "day-41: jenkins"
git push -u origin day-41
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

[← Day 40](../day-40/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 42 →](../day-42/README.md)
