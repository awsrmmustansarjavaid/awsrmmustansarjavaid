# Day 36 — CI/CD Concepts & Your First GitHub Actions Workflow

[← Day 35](../day-35/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 37 →](../day-37/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-39`, `90DaysOfDevOps-master/2026/day-40` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain CI, Continuous Delivery and Continuous Deployment
- [ ] Design a basic pipeline
- [ ] Write and run your first Actions workflow

## 2. Prerequisites

- Days 22-27, 31.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 CI/CD

CI: merge small changes often, build and test automatically. CD (delivery): every change is releasable; CD (deployment): releases to production automatically. Goal: fast, reliable feedback.

### 3.2 Pipeline anatomy

Trigger -> checkout -> setup -> lint -> test -> build -> scan -> package -> publish -> deploy -> verify. Fail fast and cache.

### 3.3 GitHub Actions

Workflows in `.github/workflows/*.yml`; events, jobs, steps, runners, actions (`uses:`). Pin third-party actions to commit SHAs.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `.github/workflows/ci.yml` triggered on push and PR.
2. [ ] Add steps: checkout, setup-python, install, lint, test.
3. [ ] Break a test intentionally; watch it fail; fix.
4. [ ] View logs and re-run a job with `gh run`.
5. [ ] Add a status badge to README.

## 5. Real-World Scenario

> Developers merge broken code to main weekly. Add automatic quality gates so a broken PR cannot be merged.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
name: ci
on: { push: { branches: [main] }, pull_request: {} }
permissions: { contents: read }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12', cache: pip }
      - run: pip install -r requirements.txt
      - run: ruff check . && pytest -q
# CLI
gh run list; gh run watch; gh run view --log-failed
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add required status check in branch protection. | You can demonstrate, without notes: *explain CI, Continuous Delivery and Continuous Deployment* — with evidence committed to `day-36/`. |
| 2 | Draw your pipeline diagram. | You can demonstrate, without notes: *design a basic pipeline* — with evidence committed to `day-36/`. |
| 3 | Measure pipeline duration and list 3 speed-ups. | You can demonstrate, without notes: *write and run your first Actions workflow* — with evidence committed to `day-36/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Workflow does not trigger | Wrong path/branch filters or YAML invalid; check Actions tab. |
| `Resource not accessible by integration` | Grant needed `permissions:` explicitly. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Set minimal `permissions:` at workflow top; pin actions by SHA; never echo secrets.
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

1. CI vs CD vs CD?
2. What is a runner?
3. Why least-privilege permissions?
4. Why fail fast?
5. **Scenario:** Developers merge broken code to main weekly. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a CI workflow? | ☐ | ☐ | ☐ | ☐ |
| Can I require it on PRs? | ☐ | ☐ | ☐ | ☐ |
| Can I debug a failed run? | ☐ | ☐ | ☐ | ☐ |
| Explain CI, Continuous Delivery and Continuous Deployment | ☐ | ☐ | ☐ | ☐ |
| Design a basic pipeline | ☐ | ☐ | ☐ | ☐ |
| Write and run your first Actions workflow | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-36/` in your own repository:

```text
day-36/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-36
git add day-36/
git commit -m "day-36: ci/cd concepts & your first github actions workflow"
git push -u origin day-36
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

[← Day 35](../day-35/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 37 →](../day-37/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-36/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
