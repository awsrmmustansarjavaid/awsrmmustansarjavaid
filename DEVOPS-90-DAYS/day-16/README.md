# Day 16 — Bash: Loops, Arguments, Functions & Error Handling

[← Day 15](../day-15/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 17 →](../day-17/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-17`, `90DaysOfDevOps-master/2026/day-18` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use loops, case, getopts and functions
- [ ] Add logging and trap cleanup
- [ ] Write reusable script libraries

## 2. Prerequisites

- Day 15.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Control flow

`for`, `while read`, `case`, arrays and associative arrays. Process files line by line with `while IFS= read -r`.

### 3.2 Functions and options

Functions return exit codes and print values; `getopts` parses flags; `local` limits scope.

### 3.3 Error handling

`trap 'cleanup' EXIT ERR`, retry loops with backoff, structured log function with timestamps and levels.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `backup.sh -s src -d dest -r days` with getopts.
2. [ ] Add `log()` function with INFO/WARN/ERROR levels.
3. [ ] Add retry function (3 attempts with sleep backoff).
4. [ ] Add `trap` to remove temp files on exit.
5. [ ] Run it with bad inputs and verify clear errors.

## 5. Real-World Scenario

> Nightly backup fails silently 3 days a week. Build a script that logs, retries, validates the archive, and returns non-zero for monitoring to catch.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
log(){ printf '%s [%s] %s\n' "$(date -Is)" "$1" "${*:2}"; }
retry(){ local n=0; until "$@"; do ((++n>=3)) && return 1; sleep $((2**n)); done; }
cleanup(){ rm -f "$tmp"; }
tmp=$(mktemp); trap cleanup EXIT
while getopts "s:d:r:" o; do case $o in s) src=$OPTARG;; d) dst=$OPTARG;; r) days=$OPTARG;; *) exit 2;; esac; done
retry tar -czf "$dst/backup-$(date +%F).tgz" "$src"
tar -tzf "$dst"/backup-*.tgz >/dev/null && log INFO "verified"
find "$dst" -name 'backup-*.tgz' -mtime +"${days:-7}" -delete
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `--dry-run` flag. | You can demonstrate, without notes: *use loops, case, getopts and functions* — with evidence committed to `day-16/`. |
| 2 | Create a reusable `lib.sh` and source it. | You can demonstrate, without notes: *add logging and trap cleanup* — with evidence committed to `day-16/`. |
| 3 | Document 5 common Bash gotchas. | You can demonstrate, without notes: *write reusable script libraries* — with evidence committed to `day-16/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Loop splits filenames with spaces | Quote variables and use `find -print0 | xargs -0` or `while read -r`. |
| trap not firing | Use `trap ... EXIT`; ensure not killed by SIGKILL. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Backups: encrypt (`gpg`/`age`), restrict permissions (umask 077), store off-host, test restores.
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

1. What is `trap` used for?
2. How do you parse options?
3. How do you retry safely?
4. How do you iterate files with spaces?
5. **Scenario:** Nightly backup fails silently 3 days a week. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write getopts? | ☐ | ☐ | ☐ | ☐ |
| Can I add logging and retries? | ☐ | ☐ | ☐ | ☐ |
| Can I verify a backup? | ☐ | ☐ | ☐ | ☐ |
| Use loops, case, getopts and functions | ☐ | ☐ | ☐ | ☐ |
| Add logging and trap cleanup | ☐ | ☐ | ☐ | ☐ |
| Write reusable script libraries | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-16/` in your own repository:

```text
day-16/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-16
git add day-16/
git commit -m "day-16: bash"
git push -u origin day-16
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

[← Day 15](../day-15/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 17 →](../day-17/README.md)
