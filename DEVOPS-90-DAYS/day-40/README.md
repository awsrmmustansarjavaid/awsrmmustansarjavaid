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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `parallel` stage for lint and unit tests. | You can demonstrate, without notes: *install and secure Jenkins* — with evidence committed to `day-40/`. |
| 2 | Back up `jenkins_home` and test restore. | You can demonstrate, without notes: *write declarative pipelines as code* — with evidence committed to `day-40/`. |
| 3 | Write a comparison: Jenkins vs Actions vs GitLab CI. | You can demonstrate, without notes: *understand where Jenkins still fits in 2026* — with evidence committed to `day-40/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Plugin install fails | Check proxy/Internet; update Jenkins; view Update Center logs. |
| `docker: not found` in pipeline | Agent lacks Docker; use a Docker agent or mount socket carefully. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Enable authentication/authorisation matrix, disable anonymous access, keep plugins updated, use credentials binding, never run builds on controller.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 10. Daily Completion Checklist

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

## 11. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 12. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. Controller vs agent?
2. Declarative vs scripted pipeline?
3. How do you store credentials?
4. Why Pipeline as Code?
5. **Scenario:** The legacy team uses freestyle jobs configured by clicking. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 39](../day-39/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 41 →](../day-41/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-40/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
