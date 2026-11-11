# Day 38 — Secrets, OIDC, Artifacts & Tests in CI

[← Day 37](../day-37/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 39 →](../day-39/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-44` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Handle secrets safely in pipelines
- [ ] Authenticate to AWS using OIDC (no static keys)
- [ ] Upload artifacts and test reports

## 2. Prerequisites

- Day 36-37; basic IAM knowledge (Day 51 expands).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Secrets

Use repository/environment secrets; scope by environment; mask logs; rotate. Prefer short-lived credentials to long-lived keys.

### 3.2 OIDC federation

GitHub issues a signed JWT per run; AWS IAM role trusts `token.actions.githubusercontent.com` with conditions on repo/branch. No access keys stored.

### 3.3 Artifacts and reports

`upload-artifact` for coverage/test reports/binaries; JUnit XML; retention days.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create an environment `production` with required reviewers.
2. [ ] Add a secret and use it in a step; verify it's masked.
3. [ ] Create an IAM OIDC provider and role (or review the sample trust policy).
4. [ ] Use `aws-actions/configure-aws-credentials` with `role-to-assume`.
5. [ ] Upload coverage report as artifact.

## 5. Real-World Scenario

> A former employee still has a long-lived AWS key stored in GitHub. Replace with OIDC and prove no static keys remain.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
permissions: { id-token: write, contents: read }
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with: { role-to-assume: arn:aws:iam::123456789012:role/gha-deploy, aws-region: us-east-1 }
  - run: aws sts get-caller-identity
  - uses: actions/upload-artifact@v4
    with: { name: coverage, path: coverage.xml, retention-days: 7 }
# Trust policy condition
"token.actions.githubusercontent.com:sub": "repo:USER/REPO:ref:refs/heads/main"
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a secrets-handling policy. | You can demonstrate, without notes: *handle secrets safely in pipelines* — with evidence committed to `day-38/`. |
| 2 | Compare OIDC vs access keys in a table. | You can demonstrate, without notes: *authenticate to AWS using OIDC (no static keys)* — with evidence committed to `day-38/`. |
| 3 | Add environment protection to production deploy job. | You can demonstrate, without notes: *upload artifacts and test reports* — with evidence committed to `day-38/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | Trust policy `sub`/`aud` mismatch; check branch/repo/environment claim. |
| Secret shows in logs | Never echo; use `::add-mask::`; rotate immediately. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Prefer OIDC; environment-scoped secrets; required approvals for prod; restrict `sub` to protected branches.
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

1. Why OIDC over access keys?
2. What is a trust policy?
3. How do environments help?
4. What to do if a secret leaks in logs?
5. **Scenario:** A former employee still has a long-lived AWS key stored in GitHub. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I assume a role without keys? | ☐ | ☐ | ☐ | ☐ |
| Can I protect prod deploys? | ☐ | ☐ | ☐ | ☐ |
| Can I store artifacts? | ☐ | ☐ | ☐ | ☐ |
| Handle secrets safely in pipelines | ☐ | ☐ | ☐ | ☐ |
| Authenticate to AWS using OIDC (no static keys) | ☐ | ☐ | ☐ | ☐ |
| Upload artifacts and test reports | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-38/` in your own repository:

```text
day-38/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-38
git add day-38/
git commit -m "day-38: secrets, oidc, artifacts & tests in ci"
git push -u origin day-38
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

[← Day 37](../day-37/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 39 →](../day-39/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-38/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
