# Day 42 — GitLab CI/CD: Pipelines, Runners & Environments

[← Day 41](../day-41/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 43 →](../day-43/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-42` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a mapping table: Actions <-> GitLab CI <-> Jenkins. | You can demonstrate, without notes: *write `.gitlab-ci.yml` pipelines* — with evidence committed to `day-42/`. |
| 2 | Add SAST via `include: template: Security/SAST.gitlab-ci.yml`. | You can demonstrate, without notes: *understand runners, stages, rules, artifacts and environments* — with evidence committed to `day-42/`. |
| 3 | Add a scheduled pipeline. | You can demonstrate, without notes: *compare GitLab CI with Actions and Jenkins* — with evidence committed to `day-42/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Job stuck pending | No runner with matching tags. |
| dind fails | Needs privileged runner or use Kaniko/Buildah rootless. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Protect variables and environments, mask secrets, restrict runner scope, prefer rootless builders.
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

1. Pipeline vs stage vs job?
2. What are runners?
3. How do `rules` work?
4. GitLab CI vs Actions?
5. **Scenario:** Your company uses GitLab. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 41](../day-41/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 43 →](../day-43/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-42/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
