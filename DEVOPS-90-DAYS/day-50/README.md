# Day 50 — Cloud Fundamentals, AWS Account Setup & Billing Guardrails

[← Day 49](../day-49/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 51 →](../day-51/README.md)

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

- [ ] Explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model
- [ ] Create a secure AWS account with budgets
- [ ] Use AWS CLI with SSO/profiles

## 2. Prerequisites

- Credit/debit card for AWS free tier.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Cloud basics

Regions contain multiple isolated AZs. Shared responsibility: provider secures the cloud; you secure what you put in it. Well-Architected pillars: operational excellence, security, reliability, performance efficiency, cost optimisation, sustainability.

### 3.2 Account hygiene

Protect the root user (MFA, no access keys), use IAM Identity Center/SSO or an admin IAM user for lab, enable CloudTrail, set budgets and alerts BEFORE launching anything.

### 3.3 AWS CLI

Profiles, regions, `aws sts get-caller-identity`, `--query` (JMESPath), `--output table`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create account; enable MFA on root; create non-root admin identity.
2. [ ] Create a monthly $10 budget with email alerts at 50/80/100%.
3. [ ] Install and configure AWS CLI v2 (`aws configure sso`).
4. [ ] Enable CloudTrail (management events) and cost allocation tags.
5. [ ] List regions and AZs with the CLI.

## 5. Real-World Scenario

> A student left a GPU instance running over the weekend and received a $900 bill. Put guardrails in place so it can't happen.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws configure sso
aws sts get-caller-identity
aws ec2 describe-regions --query 'Regions[].RegionName' --output table
aws ec2 describe-availability-zones --region us-east-1 --query 'AvailabilityZones[].ZoneName'
aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text)
aws cloudtrail describe-trails
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 'cloud cost guardrails' checklist. | You can demonstrate, without notes: *explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model* — with evidence committed to `day-50/`. |
| 2 | Map the 6 Well-Architected pillars to examples. | You can demonstrate, without notes: *create a secure AWS account with budgets* — with evidence committed to `day-50/`. |
| 3 | Create a tagging standard (owner, env, project, cost-center). | You can demonstrate, without notes: *use AWS CLI with SSO/profiles* — with evidence committed to `day-50/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| CLI uses wrong account | `export AWS_PROFILE=...`; verify with sts. |
| Unexpected charges | Use Cost Explorer + Billing alerts; delete idle resources; check all regions. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Root MFA, no root keys, least privilege, budgets, CloudTrail, avoid wide-open resources. Delete lab resources after every session.
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

1. What is shared responsibility?
2. Region vs AZ?
3. Why not use the root user?
4. How do you prevent surprise bills?
5. **Scenario:** A student left a GPU instance running over the weekend and received a $900 bill. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Do I have budgets and MFA? | ☐ | ☐ | ☐ | ☐ |
| Can I use CLI profiles? | ☐ | ☐ | ☐ | ☐ |
| Can I explain Well-Architected pillars? | ☐ | ☐ | ☐ | ☐ |
| Explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model | ☐ | ☐ | ☐ | ☐ |
| Create a secure AWS account with budgets | ☐ | ☐ | ☐ | ☐ |
| Use AWS CLI with SSO/profiles | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-50/` in your own repository:

```text
day-50/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-50
git add day-50/
git commit -m "day-50: cloud fundamentals, aws account setup & billing guardrails"
git push -u origin day-50
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

[← Day 49](../day-49/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 51 →](../day-51/README.md)
