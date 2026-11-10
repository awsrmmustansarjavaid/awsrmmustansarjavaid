# Day 57 — Infrastructure as Code & Terraform: First Resources

[← Day 56](../day-56/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 58 →](../day-58/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-61` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain declarative IaC and Terraform workflow
- [ ] Install Terraform and configure AWS provider
- [ ] Create, change and destroy a resource

## 2. Prerequisites

- Days 50-52 (AWS setup), CLI skills.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why IaC

Repeatable, reviewable, testable infrastructure; eliminates snowflake servers and drift. Terraform (and OpenTofu) is cloud-agnostic and declarative.

### 3.2 Workflow

`init` (providers/modules) -> `fmt` -> `validate` -> `plan` (diff) -> `apply` -> `destroy`. Plan is your safety net - read it.

### 3.3 HCL basics

Blocks: `terraform`, `provider`, `resource`, `variable`, `output`, `data`, `locals`. Resources have type, name, arguments and attributes.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Terraform (or OpenTofu) and `tflint`.
2. [ ] Create `main.tf` with AWS provider and an S3 bucket (with tags).
3. [ ] Run init/plan/apply; inspect state with `terraform show`.
4. [ ] Change a tag; read the plan diff; apply.
5. [ ] Destroy and confirm removal.

## 5. Real-World Scenario

> Manual console clicks created inconsistent environments. Show how the same code creates identical dev and test setups.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform version
terraform init
terraform fmt -check && terraform validate
terraform plan -out tfplan
terraform apply tfplan
terraform show; terraform state list
terraform destroy
# main.tf
terraform { required_version = ">= 1.9" required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } } }
provider "aws" { region = "us-east-1" }
resource "aws_s3_bucket" "demo" { bucket = "devops90-${random_id.s.hex}" tags = { Env = "lab" } }
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `.gitignore` for `.terraform/`, `*.tfstate`, `*.tfvars` secrets. | You can demonstrate, without notes: *explain declarative IaC and Terraform workflow* — with evidence committed to `day-57/`. |
| 2 | Explain declarative vs imperative. | You can demonstrate, without notes: *install Terraform and configure AWS provider* — with evidence committed to `day-57/`. |
| 3 | Write IaC benefits and risks note. | You can demonstrate, without notes: *create, change and destroy a resource* — with evidence committed to `day-57/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Provider auth errors | Check AWS_PROFILE/region/credentials. |
| Name already exists | S3 names are global; add random suffix. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never commit state or credentials; use remote state with encryption (Day 60); review plans for destructive changes.
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

1. What is declarative IaC?
2. What does `terraform plan` do?
3. What is state?
4. Terraform vs CloudFormation?
5. **Scenario:** Manual console clicks created inconsistent environments. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run the full workflow? | ☐ | ☐ | ☐ | ☐ |
| Can I read a plan? | ☐ | ☐ | ☐ | ☐ |
| Can I destroy safely? | ☐ | ☐ | ☐ | ☐ |
| Explain declarative IaC and Terraform workflow | ☐ | ☐ | ☐ | ☐ |
| Install Terraform and configure AWS provider | ☐ | ☐ | ☐ | ☐ |
| Create, change and destroy a resource | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-57/` in your own repository:

```text
day-57/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-57
git add day-57/
git commit -m "day-57: infrastructure as code & terraform"
git push -u origin day-57
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

[← Day 56](../day-56/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 58 →](../day-58/README.md)
