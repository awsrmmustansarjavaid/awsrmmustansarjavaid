# Day 59 — Terraform: Variables, Outputs, Data Sources & Expressions

[← Day 58](../day-58/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 60 →](../day-60/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-63` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Parameterise code with variables and validation
- [ ] Use locals, functions, conditionals and dynamic blocks
- [ ] Query existing infrastructure with data sources

## 2. Prerequisites

- Day 58.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Inputs/outputs

Types (string, number, list, map, object), defaults, `validation`, `sensitive`. Outputs expose values to users and other modules.

### 3.2 Expressions

`locals`, `for` expressions, `merge`, `lookup`, `cidrsubnet`, `templatefile`, ternary `cond ? a : b`, `dynamic` blocks.

### 3.3 Data sources

Read AMIs, AZs, existing VPCs, account ID without managing them.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add typed variables with validation (env must be dev/stage/prod).
2. [ ] Use `terraform.tfvars` and `-var-file=prod.tfvars`.
3. [ ] Use `data.aws_ami` and `data.aws_availability_zones`.
4. [ ] Use `cidrsubnet()` to derive subnets.
5. [ ] Add sensitive output and see how it's masked.

## 5. Real-World Scenario

> One codebase must support dev (small, 1 AZ) and prod (HA, 3 AZ) with different sizes - without copy-paste.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
variable "env" { type = string  validation { condition = contains(["dev","stage","prod"], var.env) error_message = "env must be dev, stage, or prod." } }
locals { azs = slice(data.aws_availability_zones.available.names, 0, var.env == "prod" ? 3 : 1) }
resource "aws_subnet" "this" { count = length(local.azs) cidr_block = cidrsubnet(var.vpc_cidr, 8, count.index) availability_zone = local.azs[count.index] vpc_id = aws_vpc.main.id }
terraform plan -var-file=prod.tfvars
terraform output -json
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write variable documentation table. | You can demonstrate, without notes: *parameterise code with variables and validation* — with evidence committed to `day-59/`. |
| 2 | Add `precondition` check. | You can demonstrate, without notes: *use locals, functions, conditionals and dynamic blocks* — with evidence committed to `day-59/`. |
| 3 | Use `terraform console` to experiment with functions. | You can demonstrate, without notes: *query existing infrastructure with data sources* — with evidence committed to `day-59/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Variable has no value | Add default, tfvars, env `TF_VAR_name`, or -var. |
| Type constraint error | Match expected object structure. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Mark secrets `sensitive` (still stored in state!) and prefer secret managers.
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

1. Variables vs locals?
2. What are data sources?
3. How do you validate inputs?
4. Why sensitive values are still risky?
5. **Scenario:** One codebase must support dev (small, 1 AZ) and prod (HA, 3 AZ) with different sizes - without copy-paste. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I parameterise env differences? | ☐ | ☐ | ☐ | ☐ |
| Can I use data sources? | ☐ | ☐ | ☐ | ☐ |
| Can I validate input? | ☐ | ☐ | ☐ | ☐ |
| Parameterise code with variables and validation | ☐ | ☐ | ☐ | ☐ |
| Use locals, functions, conditionals and dynamic blocks | ☐ | ☐ | ☐ | ☐ |
| Query existing infrastructure with data sources | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-59/` in your own repository:

```text
day-59/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-59
git add day-59/
git commit -m "day-59: terraform"
git push -u origin day-59
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

[← Day 58](../day-58/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 60 →](../day-60/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-59/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
