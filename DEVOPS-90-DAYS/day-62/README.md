# Day 62 — Terraform in CI/CD: Plan/Apply Pipelines, Policy-as-Code & Security Scanning

[← Day 61](../day-61/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 63 →](../day-63/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-67` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Automate fmt/validate/plan on PRs and apply on merge
- [ ] Scan IaC with checkov/tfsec/OPA
- [ ] Use OIDC and least privilege for Terraform pipelines

## 2. Prerequisites

- Days 38, 57-61.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 GitOps for infra

PR shows plan output; reviewers approve; merge triggers apply with environment protection. Tools: GitHub Actions, Atlantis, Terraform Cloud, Spacelift.

### 3.2 Policy and security

Checkov/tfsec/Trivy config, OPA/Conftest, Sentinel; infracost for cost diffs in PRs.

### 3.3 Pipeline identity

Separate read-only plan role and write apply role; OIDC; protected environments.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create workflow: fmt, validate, tflint, checkov.
2. [ ] Add plan step posting output as PR comment.
3. [ ] Add apply job on main with environment approval.
4. [ ] Use OIDC role with separate plan/apply roles.
5. [ ] Add infracost comment (free tier).

## 5. Real-World Scenario

> Someone changed a security group to 0.0.0.0/0 in a PR. Make the pipeline reject this automatically with a clear message.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform fmt -check -recursive
tflint --recursive
checkov -d . --framework terraform --quiet
conftest test tfplan.json -p policy/
terraform show -json tfplan > tfplan.json
infracost breakdown --path . --format table
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a Rego/Conftest policy blocking public SSH. | You can demonstrate, without notes: *automate fmt/validate/plan on PRs and apply on merge* — with evidence committed to `day-62/`. |
| 2 | Document the review checklist for IaC PRs. | You can demonstrate, without notes: *scan IaC with checkov/tfsec/OPA* — with evidence committed to `day-62/`. |
| 3 | Measure drift detection via scheduled plan. | You can demonstrate, without notes: *use OIDC and least privilege for Terraform pipelines* — with evidence committed to `day-62/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Plan differs from apply | Use saved plan artifact `-out` and apply that exact plan. |
| Pipeline lacks permissions | Tune plan role (read) vs apply role (write). |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Enforce policy-as-code; protect apply with approvals; never allow local applies in prod.
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

1. Why plan on PR?
2. What is policy-as-code?
3. Why separate plan/apply roles?
4. What does infracost give?
5. **Scenario:** Someone changed a security group to 0. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I automate Terraform safely? | ☐ | ☐ | ☐ | ☐ |
| Can I block risky changes? | ☐ | ☐ | ☐ | ☐ |
| Can I show cost impact? | ☐ | ☐ | ☐ | ☐ |
| Automate fmt/validate/plan on PRs and apply on merge | ☐ | ☐ | ☐ | ☐ |
| Scan IaC with checkov/tfsec/OPA | ☐ | ☐ | ☐ | ☐ |
| Use OIDC and least privilege for Terraform pipelines | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-62/` in your own repository:

```text
day-62/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-62
git add day-62/
git commit -m "day-62: terraform in ci/cd"
git push -u origin day-62
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

[← Day 61](../day-61/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 63 →](../day-63/README.md)
