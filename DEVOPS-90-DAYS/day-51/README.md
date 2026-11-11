# Day 51 — AWS IAM Deep Dive: Policies, Roles, STS & Least Privilege

[← Day 50](../day-50/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 52 →](../day-52/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 8 — Cloud Engineering: AWS & Azure |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Write and debug IAM policies
- [ ] Use roles and temporary credentials
- [ ] Apply least privilege with access analysis

## 2. Prerequisites

- Day 50.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 IAM building blocks

Users, groups, roles, policies (identity-based, resource-based, SCPs, permission boundaries). Evaluation: explicit Deny > Allow > implicit deny.

### 3.2 Roles and STS

Roles are assumed for temporary credentials (EC2 instance profile, Lambda, GitHub OIDC, cross-account). Trust policy = who can assume; permissions policy = what they can do.

### 3.3 Least privilege tooling

IAM Access Analyzer, policy simulator, last-accessed data, `aws iam generate-service-last-accessed-details`, CloudTrail.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a policy allowing read-only on one S3 bucket prefix.
2. [ ] Create a role assumable by your user with MFA condition; assume via CLI.
3. [ ] Test with the policy simulator and deliberately break it.
4. [ ] Create an EC2 instance role instead of embedding keys.
5. [ ] Run Access Analyzer and review findings.

## 5. Real-World Scenario

> A developer asked for AdministratorAccess 'temporarily'. Provide the minimal permissions that satisfy the use-case, with expiry.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws iam create-policy --policy-name s3-read-app --policy-document file://policy.json
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/dev --role-session-name test --serial-number <mfa-arn> --token-code 123456
aws iam simulate-principal-policy --policy-source-arn <arn> --action-names s3:GetObject --resource-arns arn:aws:s3:::bucket/app/*
# policy.json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["s3:GetObject"],"Resource":"arn:aws:s3:::bucket/app/*"}]}
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a one-page IAM best-practice summary. | You can demonstrate, without notes: *write and debug IAM policies* — with evidence committed to `day-51/`. |
| 2 | Explain permission boundary vs SCP. | You can demonstrate, without notes: *use roles and temporary credentials* — with evidence committed to `day-51/`. |
| 3 | Create a cross-account role design (diagram). | You can demonstrate, without notes: *apply least privilege with access analysis* — with evidence committed to `day-51/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `AccessDenied` mysteries | Check explicit denies, SCPs, boundaries, resource policies, and condition keys in CloudTrail event. |
| Cannot assume role | Trust policy principal/conditions wrong. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Prefer roles over users, enforce MFA, avoid `*:*`, scope resources and conditions, review unused permissions monthly.
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

1. Identity vs resource policy?
2. How is IAM evaluated?
3. Role vs user?
4. How do you find unused permissions?
5. **Scenario:** A developer asked for AdministratorAccess 'temporarily'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a least-privilege policy? | ☐ | ☐ | ☐ | ☐ |
| Can I assume a role with MFA? | ☐ | ☐ | ☐ | ☐ |
| Can I debug AccessDenied? | ☐ | ☐ | ☐ | ☐ |
| Write and debug IAM policies | ☐ | ☐ | ☐ | ☐ |
| Use roles and temporary credentials | ☐ | ☐ | ☐ | ☐ |
| Apply least privilege with access analysis | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-51/` in your own repository:

```text
day-51/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-51
git add day-51/
git commit -m "day-51: aws iam deep dive"
git push -u origin day-51
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

[← Day 50](../day-50/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 52 →](../day-52/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-51/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
