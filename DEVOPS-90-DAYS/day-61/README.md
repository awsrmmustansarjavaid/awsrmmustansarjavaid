# Day 61 — Terraform Modules: Reusable Infrastructure

[← Day 60](../day-60/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 62 →](../day-62/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-65` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design modules with clear inputs/outputs
- [ ] Version and consume modules
- [ ] Use public registry modules wisely

## 2. Prerequisites

- Days 57-60.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Module design

A module is a folder of `.tf` files with a clear contract: variables (inputs), outputs, README, examples. Keep them small and composable; avoid provider config inside modules.

### 3.2 Consumption

Local path, Git tag, Terraform Registry with version constraints. Pin versions!

### 3.3 Testing

`terraform test` (native), Terratest, `tflint`, `terraform validate` per example.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Extract VPC code into `modules/vpc` with variables (cidr, azs, tags).
2. [ ] Create `modules/ec2-app` consuming VPC outputs.
3. [ ] Create `envs/dev` and `envs/prod` calling the modules.
4. [ ] Add `examples/basic` and README via `terraform-docs`.
5. [ ] Write a `terraform test` file asserting outputs.

## 5. Real-World Scenario

> Three teams copy-pasted VPC code with subtle differences. Publish a single versioned module and migrate them.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
module "vpc" { source = "../../modules/vpc"  cidr = "10.20.0.0/16"  azs = ["a","b"]  tags = local.tags }
module "app"  { source = "git::https://github.com/USER/tf-modules.git//ec2-app?ref=v1.2.0"  subnet_ids = module.vpc.private_subnet_ids }
terraform-docs markdown table modules/vpc > modules/vpc/README.md
terraform test
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Tag module repo `v1.0.0`. | You can demonstrate, without notes: *design modules with clear inputs/outputs* — with evidence committed to `day-61/`. |
| 2 | Document module upgrade policy (SemVer). | You can demonstrate, without notes: *version and consume modules* — with evidence committed to `day-61/`. |
| 3 | Compare public registry VPC module vs your own. | You can demonstrate, without notes: *use public registry modules wisely* — with evidence committed to `day-61/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Module source not found | Check path/ref; run `terraform init -upgrade`. |
| Breaking change on upgrade | Review plan; use SemVer and changelog. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Review third-party modules before use; pin versions; scan with checkov/tfsec.
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

1. What makes a good module?
2. Why pin module versions?
3. How do you test modules?
4. Root vs child module?
5. **Scenario:** Three teams copy-pasted VPC code with subtle differences. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a reusable module? | ☐ | ☐ | ☐ | ☐ |
| Can I version it? | ☐ | ☐ | ☐ | ☐ |
| Can I use it in multiple envs? | ☐ | ☐ | ☐ | ☐ |
| Design modules with clear inputs/outputs | ☐ | ☐ | ☐ | ☐ |
| Version and consume modules | ☐ | ☐ | ☐ | ☐ |
| Use public registry modules wisely | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-61/` in your own repository:

```text
day-61/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-61
git add day-61/
git commit -m "day-61: terraform modules"
git push -u origin day-61
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

[← Day 60](../day-60/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 62 →](../day-62/README.md)
