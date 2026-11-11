# Day 63 — Capstone 2 (Part 1/3): Cloud Foundation with Terraform

[← Day 62](../day-62/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 64 →](../day-64/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 2 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design a multi-environment AWS landing zone for an app
- [ ] Build network, IAM, state and tagging as modules
- [ ] Document architecture and cost estimate

## 2. Prerequisites

- Days 50-62.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project definition

Capstone 2 - Cloud Infrastructure Automation: Terraform-provisioned dev/prod environments with VPC, ALB, ASG/EC2 (or ECS), RDS, S3, IAM roles, CloudWatch alarms, budgets - configured with Ansible, delivered by a pipeline.

### 3.2 Design principles

Least privilege, multi-AZ, private data tier, encryption, tagging, remote state per env, cost controls.

### 3.3 Deliverable layout

`infra/{bootstrap,modules,envs/dev,envs/prod}`, `ansible/`, `docs/`, `.github/workflows/`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create repo `capstone2-cloud-automation`.
2. [ ] Bootstrap remote state (bucket + lock).
3. [ ] Build modules: `network`, `iam`, `compute`, `database`, `monitoring`.
4. [ ] Deploy `dev` environment and verify.
5. [ ] Write architecture doc, ADR for compute choice and monthly cost estimate.

## 5. Real-World Scenario

> A client wants identical staging and production in different accounts, created in under 30 minutes, with audit trail and cost visibility.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
cd infra/bootstrap && terraform init && terraform apply
cd ../envs/dev && terraform init && terraform plan -out tfplan && terraform apply tfplan
terraform output
infracost breakdown --path .
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw architecture diagram. | You can demonstrate, without notes: *design a multi-environment AWS landing zone for an app* — with evidence committed to `day-63/`. |
| 2 | List top 5 risks. | You can demonstrate, without notes: *build network, IAM, state and tagging as modules* — with evidence committed to `day-63/`. |
| 3 | Estimate cost for dev vs prod. | You can demonstrate, without notes: *document architecture and cost estimate* — with evidence committed to `day-63/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Module dependency confusion | Pass IDs via outputs/variables; avoid hidden coupling. |
| Dev env expensive | Single NAT, smaller instances, schedule off. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** KMS encryption, private subnets, no public DB, scoped IAM, CloudTrail enabled.
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

1. How do you structure Terraform for multiple environments?
2. How do you control cost?
3. How do you secure the network?
4. What goes into an ADR?
5. **Scenario:** A client wants identical staging and production in different accounts, created in under 30 minutes, with audit trail and cost visibility. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Does dev deploy from scratch? | ☐ | ☐ | ☐ | ☐ |
| Is cost documented? | ☐ | ☐ | ☐ | ☐ |
| Is the code modular? | ☐ | ☐ | ☐ | ☐ |
| Design a multi-environment AWS landing zone for an app | ☐ | ☐ | ☐ | ☐ |
| Build network, IAM, state and tagging as modules | ☐ | ☐ | ☐ | ☐ |
| Document architecture and cost estimate | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-63/` in your own repository:

```text
day-63/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-63
git add day-63/
git commit -m "day-63: capstone 2 (part 1/3)"
git push -u origin day-63
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 62](../day-62/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 64 →](../day-64/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-63/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
