# Day 20 — Python: Cloud SDK Basics, CLI Tools & Testing

[← Day 19](../day-19/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 21 →](../day-21/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use boto3 safely against AWS (or LocalStack)
- [ ] Package a CLI tool with entry point
- [ ] Practice test-driven automation

## 2. Prerequisites

- Days 18-19; AWS account (Day 50 covers setup in depth) or LocalStack.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 SDK basics

boto3 clients vs resources, credentials chain (env -> profile -> role), regions, paginators, waiters. Use LocalStack or free-tier read-only calls for practice.

### 3.2 CLI packaging

`pyproject.toml` with `[project.scripts]`; use `typer` or `argparse`; semantic versioning.

### 3.3 Testing

pytest fixtures, `moto` to mock AWS, coverage reports.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install LocalStack (`pipx install localstack`) or use `moto`.
2. [ ] Write `s3tool.py` to list buckets and tag untagged ones.
3. [ ] Add unit tests with `moto`.
4. [ ] Package as `devops-toolkit` with `pyproject.toml` and install via `pip install -e .`.
5. [ ] Add `--dry-run` default for any mutating command.

## 5. Real-World Scenario

> FinOps asks you to find all resources with no `owner` or `env` tag. Build a safe, dry-run-first tool and test it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
pip install boto3 moto pytest typer
aws sts get-caller-identity       # who am I?
python - <<'EOP'
import boto3
s3 = boto3.client("s3")
for b in s3.list_buckets()["Buckets"]: print(b["Name"])
EOP
pytest --cov=devops_toolkit -q
pip install -e .
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `--region` and `--profile` options. | You can demonstrate, without notes: *use boto3 safely against AWS (or LocalStack)* — with evidence committed to `day-20/`. |
| 2 | Write a README with examples and screenshots. | You can demonstrate, without notes: *package a CLI tool with entry point* — with evidence committed to `day-20/`. |
| 3 | Add GitHub Actions workflow to run tests (preview of Day 36). | You can demonstrate, without notes: *practice test-driven automation* — with evidence committed to `day-20/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `NoCredentialsError` | Set `AWS_PROFILE` or environment variables; use SSO. |
| Tests hit real AWS | Use `moto` decorators/fixtures and fake env credentials. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never hard-code AWS keys. Prefer roles/SSO and temporary credentials. Default tools to read-only/dry-run.
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

1. What is the boto3 credentials chain?
2. Why dry-run default?
3. How do you test cloud code?
4. Why avoid long-lived access keys?
5. **Scenario:** FinOps asks you to find all resources with no `owner` or `env` tag. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I list AWS resources via Python? | ☐ | ☐ | ☐ | ☐ |
| Can I mock AWS? | ☐ | ☐ | ☐ | ☐ |
| Is my tool installable? | ☐ | ☐ | ☐ | ☐ |
| Use boto3 safely against AWS (or LocalStack) | ☐ | ☐ | ☐ | ☐ |
| Package a CLI tool with entry point | ☐ | ☐ | ☐ | ☐ |
| Practice test-driven automation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-20/` in your own repository:

```text
day-20/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-20
git add day-20/
git commit -m "day-20: python"
git push -u origin day-20
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 19](../day-19/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 21 →](../day-21/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-20/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
