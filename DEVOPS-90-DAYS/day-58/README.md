# Day 58 — Terraform: Providers, Resources, Dependencies & Lifecycle

[← Day 57](../day-57/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 59 →](../day-59/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-62` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use multiple providers and resources
- [ ] Understand implicit/explicit dependencies
- [ ] Control change behaviour with lifecycle rules

## 2. Prerequisites

- Day 57.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Dependencies

Terraform builds a DAG from references (`aws_subnet.a.id`). Use `depends_on` only when a hidden dependency exists.

### 3.2 Meta-arguments

`count`, `for_each`, `depends_on`, `provider`, `lifecycle` (`create_before_destroy`, `prevent_destroy`, `ignore_changes`).

### 3.3 Resource planning

Understand which changes are in-place vs replacement (`-/+`) before applying.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create VPC, subnet, IGW, route table, SG, EC2 with references.
2. [ ] Use `for_each` to create 3 subnets from a map.
3. [ ] Add `prevent_destroy` to a critical resource and try destroying.
4. [ ] Use `terraform graph | dot -Tpng` to view dependencies.
5. [ ] Trigger a replacement and read the plan.

## 5. Real-World Scenario

> A rename of a resource attribute will recreate your database. Spot this in the plan and use proper techniques to avoid data loss.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
resource "aws_subnet" "private" {
  for_each          = { a = "10.0.1.0/24", b = "10.0.2.0/24" }
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value
  availability_zone = "us-east-1${each.key}"
  lifecycle { create_before_destroy = true }
}
terraform plan | grep -E "must be replaced|will be destroyed"
terraform graph | dot -Tpng > graph.png
terraform apply -replace=aws_instance.web
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document `count` vs `for_each` pitfalls. | You can demonstrate, without notes: *use multiple providers and resources* — with evidence committed to `day-58/`. |
| 2 | Add tags via `default_tags` in provider. | You can demonstrate, without notes: *understand implicit/explicit dependencies* — with evidence committed to `day-58/`. |
| 3 | Practice `moved` blocks for refactoring. | You can demonstrate, without notes: *control change behaviour with lifecycle rules* — with evidence committed to `day-58/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cycle error | Circular references; break dependency. |
| count index shifts destroy resources | Prefer `for_each` with stable keys. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Review plans for IAM/SG widening; use `prevent_destroy` for stateful resources.
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

1. count vs for_each?
2. What does `depends_on` do?
3. What does `prevent_destroy` do?
4. How do you refactor safely?
5. **Scenario:** A rename of a resource attribute will recreate your database. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a network with refs? | ☐ | ☐ | ☐ | ☐ |
| Can I read replacement plans? | ☐ | ☐ | ☐ | ☐ |
| Can I use for_each? | ☐ | ☐ | ☐ | ☐ |
| Use multiple providers and resources | ☐ | ☐ | ☐ | ☐ |
| Understand implicit/explicit dependencies | ☐ | ☐ | ☐ | ☐ |
| Control change behaviour with lifecycle rules | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-58/` in your own repository:

```text
day-58/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-58
git add day-58/
git commit -m "day-58: terraform"
git push -u origin day-58
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

[← Day 57](../day-57/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 59 →](../day-59/README.md)
