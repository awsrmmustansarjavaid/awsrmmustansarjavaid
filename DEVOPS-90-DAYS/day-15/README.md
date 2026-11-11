# Day 15 — Bash Scripting: Variables, Conditionals & Exit Codes

[← Day 14](../day-14/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 16 →](../day-16/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-16` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Write safe, readable Bash scripts
- [ ] Use variables, quoting, conditionals and exit codes
- [ ] Apply ShellCheck

## 2. Prerequisites

- Day 3.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Script basics

Shebang `#!/usr/bin/env bash`, `chmod +x`, variables `NAME=value`, always quote `"$var"`. `$?` is the last exit code; 0 = success.

### 3.2 Conditionals

`[[ ]]` tests for strings/numbers/files (`-f`, `-d`, `-z`, `-eq`). Short-circuit `&&`/`||`.

### 3.3 Safety

Use `set -euo pipefail`, `trap` for cleanup, and lint with `shellcheck`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `hello.sh` printing name and date.
2. [ ] Create `check_service.sh <name>` that reports active/inactive and exits 0/1.
3. [ ] Add input validation and usage message.
4. [ ] Run `shellcheck` and fix every warning.
5. [ ] Add `set -euo pipefail` and demonstrate what it prevents.

## 5. Real-World Scenario

> A deploy script ran `rm -rf $DIR/*` with an unset variable and deleted `/*`. Rewrite it safely and explain each protection.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
#!/usr/bin/env bash
set -euo pipefail
name="${1:?Usage: $0 <service>}"
if systemctl is-active --quiet "$name"; then
  echo "$name is running"; exit 0
else
  echo "$name is NOT running" >&2; exit 1
fi
# Lint
shellcheck check_service.sh
# Safe delete pattern
[[ -n "${DIR:-}" && -d "$DIR" ]] && rm -rf -- "${DIR:?}"/*
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write 3 scripts: disk-check, port-check, backup-check. | You can demonstrate, without notes: *write safe, readable Bash scripts* — with evidence committed to `day-15/`. |
| 2 | Document `$@` vs `$*`. | You can demonstrate, without notes: *use variables, quoting, conditionals and exit codes* — with evidence committed to `day-15/`. |
| 3 | Explain `set -e` pitfalls. | You can demonstrate, without notes: *apply ShellCheck* — with evidence committed to `day-15/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `unbound variable` | Expected under `set -u`; use `${VAR:-default}` or pass it. |
| Script works in terminal not cron | PATH/env differences; use absolute paths. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Quote variables, validate input, never `eval` untrusted input, avoid secrets as arguments (visible in `ps`).
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

1. What does `set -euo pipefail` do?
2. Why quote variables?
3. What is an exit code?
4. [ ] vs [[ ]]?
5. **Scenario:** A deploy script ran `rm -rf $DIR/*` with an unset variable and deleted `/*`. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a script with usage + exit codes? | ☐ | ☐ | ☐ | ☐ |
| Can I use shellcheck? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the safe-delete pattern? | ☐ | ☐ | ☐ | ☐ |
| Write safe, readable Bash scripts | ☐ | ☐ | ☐ | ☐ |
| Use variables, quoting, conditionals and exit codes | ☐ | ☐ | ☐ | ☐ |
| Apply ShellCheck | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-15/` in your own repository:

```text
day-15/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-15
git add day-15/
git commit -m "day-15: bash scripting"
git push -u origin day-15
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

[← Day 14](../day-14/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 16 →](../day-16/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-15/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
