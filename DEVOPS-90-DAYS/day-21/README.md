# Day 21 — Week 3 Project: System Health-Check Tool (Bash + Python)

[← Day 20](../day-20/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 22 →](../day-22/README.md)

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

- [ ] Deliver a production-style automation tool
- [ ] Combine scripting, testing, documentation
- [ ] Create a reusable repository template

## 2. Prerequisites

- Days 15-20.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project brief

Build `healthcheck`: checks CPU, memory, disk, key services, open ports, TLS expiry and HTTP endpoints; outputs human, JSON and Prometheus text formats; returns meaningful exit codes.

### 3.2 Quality bar

README, tests, lint, `--help`, semantic version, CHANGELOG, example systemd timer.

### 3.3 Repo template

Standard layout: `src/`, `tests/`, `docs/`, `Makefile`, `.gitignore`, `.editorconfig`, `LICENSE`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Design checks as plugins/functions with a common result structure.
2. [ ] Implement 6 checks and 3 output formats.
3. [ ] Add tests and lint to `make ci`.
4. [ ] Write the systemd timer and sample alert rule.
5. [ ] Tag `v0.1.0`.

## 5. Real-World Scenario

> The SRE team will adopt your tool if it is documented, tested and safe. Prepare a 5-minute demo and a README for onboarding.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
make setup lint test
./healthcheck --format json | jq .
./healthcheck --format prometheus
git tag -a v0.1.0 -m "first release" && git push --tags
systemctl cat healthcheck.timer
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a CHANGELOG. | You can demonstrate, without notes: *deliver a production-style automation tool* — with evidence committed to `day-21/`. |
| 2 | Record a terminal demo (asciinema). | You can demonstrate, without notes: *combine scripting, testing, documentation* — with evidence committed to `day-21/`. |
| 3 | Write a 'how to extend with a new check' section. | You can demonstrate, without notes: *create a reusable repository template* — with evidence committed to `day-21/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Checks are slow | Add timeouts and run checks concurrently. |
| False positives | Make thresholds configurable and document defaults. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Run as non-root where possible; avoid shelling out with untrusted input; never expose metrics publicly without auth.
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

1. How do you design exit codes for monitoring?
2. Why multiple output formats?
3. How do you make a script maintainable?
4. What would you add next?
5. **Scenario:** The SRE team will adopt your tool if it is documented, tested and safe. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Is it installable and documented? | ☐ | ☐ | ☐ | ☐ |
| Does it have tests? | ☐ | ☐ | ☐ | ☐ |
| Could a teammate use it without me? | ☐ | ☐ | ☐ | ☐ |
| Deliver a production-style automation tool | ☐ | ☐ | ☐ | ☐ |
| Combine scripting, testing, documentation | ☐ | ☐ | ☐ | ☐ |
| Create a reusable repository template | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-21/` in your own repository:

```text
day-21/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-21
git add day-21/
git commit -m "day-21: week 3 project"
git push -u origin day-21
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Week 3 project: healthcheck tool v0.1.0.

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

[← Day 20](../day-20/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 22 →](../day-22/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-21/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
