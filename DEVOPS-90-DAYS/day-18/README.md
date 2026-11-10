# Day 18 — Python for DevOps: Basics, Virtual Environments & Files

[← Day 17](../day-17/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 19 →](../day-19/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-18` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Set up Python projects properly (venv, pip, requirements)
- [ ] Use core data structures, functions and error handling
- [ ] Read/write files and run system commands

## 2. Prerequisites

- Day 15-17 helpful.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why Python

Readable automation language for APIs, cloud SDKs, tooling and glue code. Know Python 3.12+.

### 3.2 Project hygiene

Use `python -m venv .venv`, pin dependencies, add `.gitignore`, follow PEP 8 and use `ruff`/`black`.

### 3.3 Core skills

lists, dicts, comprehension, functions, exceptions, `pathlib`, `subprocess.run(..., check=True)`, `argparse`, `logging`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create venv and install `requests` and `pyyaml`.
2. [ ] Write `disk_report.py` using `shutil.disk_usage` and argparse.
3. [ ] Parse `/etc/os-release` into a dict.
4. [ ] Run `systemctl is-active` with subprocess and handle failure.
5. [ ] Add logging and unit tests with pytest.

## 5. Real-World Scenario

> Operations needs a cross-platform script that checks disk usage thresholds and returns exit code 2 for warning. Build it in Python with tests.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install requests pyyaml pytest ruff
pip freeze > requirements.txt
python - <<'EOP'
import shutil, argparse, logging
p = argparse.ArgumentParser(); p.add_argument('--path', default='/'); p.add_argument('--warn', type=int, default=80)
a = p.parse_args(); u = shutil.disk_usage(a.path); pct = u.used*100//u.total
print(f"{a.path}: {pct}%"); raise SystemExit(2 if pct>=a.warn else 0)
EOP
ruff check . && pytest -q
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Port your Day-17 report summary into Python. | You can demonstrate, without notes: *set up Python projects properly (venv, pip, requirements)* — with evidence committed to `day-18/`. |
| 2 | Create a `Makefile` with `setup`, `lint`, `test` targets. | You can demonstrate, without notes: *use core data structures, functions and error handling* — with evidence committed to `day-18/`. |
| 3 | Write README with usage. | You can demonstrate, without notes: *read/write files and run system commands* — with evidence committed to `day-18/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ModuleNotFoundError` | Venv not activated or package not installed in this env. |
| `externally-managed-environment` | Use venv or `pipx`; don't pip install globally on Debian/Ubuntu. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Pin dependency versions, scan with `pip-audit`, never print secrets, use `subprocess` with list arguments (no `shell=True` on user input).
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

1. Why use virtualenvs?
2. Why avoid shell=True?
3. What does `check=True` do?
4. How do you handle exceptions?
5. **Scenario:** Operations needs a cross-platform script that checks disk usage thresholds and returns exit code 2 for warning. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a Python project skeleton? | ☐ | ☐ | ☐ | ☐ |
| Can I run commands safely? | ☐ | ☐ | ☐ | ☐ |
| Do I have tests and lint? | ☐ | ☐ | ☐ | ☐ |
| Set up Python projects properly (venv, pip, requirements) | ☐ | ☐ | ☐ | ☐ |
| Use core data structures, functions and error handling | ☐ | ☐ | ☐ | ☐ |
| Read/write files and run system commands | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-18/` in your own repository:

```text
day-18/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-18
git add day-18/
git commit -m "day-18: python for devops"
git push -u origin day-18
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

[← Day 17](../day-17/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 19 →](../day-19/README.md)
