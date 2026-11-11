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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a tag-based release stage using `when { tag 'v*' }`. | You can demonstrate, without notes: *scale builds with agents* — with evidence committed to `day-41/`. |
| 2 | Add webhook trigger from GitHub. | You can demonstrate, without notes: *use credentials and multibranch pipelines* — with evidence committed to `day-41/`. |
| 3 | Document agent labels. | You can demonstrate, without notes: *create a shared library* — with evidence committed to `day-41/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Credentials printed | Jenkins masks but never `echo` secrets; avoid string interpolation with secrets in `sh`. |
| Library not found | Configure under Manage Jenkins -> System -> Global Pipeline Libraries. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use least-privilege credentials, folder-scoped credentials, ephemeral agents, pin library versions.
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

1. Why ephemeral agents?
2. What does multibranch do?
3. What is a shared library?
4. How do you avoid leaking secrets in `sh` steps?
5. **Scenario:** Ten repos have duplicated Jenkinsfiles. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 40](../day-40/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 42 →](../day-42/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-41/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
