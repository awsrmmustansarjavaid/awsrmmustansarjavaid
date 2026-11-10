# Day 27 — YAML, JSON, Makefiles & Code Quality Tooling

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 28 →](../day-28/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-27`, `90DaysOfDevOps-master/2026/day-38` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Write correct YAML and avoid common traps
- [ ] Use jq/yq and Make for repeatable tasks
- [ ] Lint everything (shellcheck, yamllint, hadolint, ruff)

## 2. Prerequisites

- Days 18-19, 26.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 YAML

Indentation-sensitive; lists with `-`, maps `key: value`, multi-line `|` and `>`, anchors `&`/`*`, multi-doc `---`. Traps: tabs, `no`/`on` booleans, unquoted version strings like `3.10`.

### 3.2 jq / yq

Query and transform JSON/YAML in pipelines - essential for API output and Kubernetes manifests.

### 3.3 Make and linters

A Makefile is the project's front door: `make lint test build`. Linters catch defects before CI does.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write a multi-document YAML and validate with `yamllint`.
2. [ ] Use `jq` to extract/transform GitHub API JSON.
3. [ ] Use `yq` to modify an image tag in a manifest.
4. [ ] Create Makefile targets: `lint`, `test`, `fmt`, `clean`.
5. [ ] Add `.editorconfig`.

## 5. Real-World Scenario

> A deployment failed because `version: 3.10` was parsed as `3.1`. Reproduce, explain, fix, and add a lint rule to catch it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
yamllint .
curl -s https://api.github.com/repos/cli/cli/releases/latest | jq '{tag: .tag_name, assets: [.assets[].name]}'
yq -i '.spec.template.spec.containers[0].image = "app:1.2.3"' deploy.yaml
.PHONY: lint test
lint: ; shellcheck scripts/*.sh && yamllint . && ruff check .
make lint
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a 'YAML gotchas' note with 8 examples. | You can demonstrate, without notes: *write correct YAML and avoid common traps* — with evidence committed to `day-27/`. |
| 2 | Convert JSON<->YAML with yq. | You can demonstrate, without notes: *use jq/yq and Make for repeatable tasks* — with evidence committed to `day-27/`. |
| 3 | Add Makefile help target with `grep`/`awk`. | You can demonstrate, without notes: *lint everything (shellcheck, yamllint, hadolint, ruff)* — with evidence committed to `day-27/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `mapping values are not allowed here` | Indentation/colon issue; run yamllint. |
| jq returns null | Wrong path; inspect with `jq 'keys'`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Validate untrusted YAML with safe loaders; keep secrets out of YAML in git.
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

1. Why quote version numbers?
2. What does `jq .[]` do?
3. Why use a Makefile?
4. What are YAML anchors?
5. **Scenario:** A deployment failed because `version: 3. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I fix YAML errors quickly? | ☐ | ☐ | ☐ | ☐ |
| Can I transform JSON with jq? | ☐ | ☐ | ☐ | ☐ |
| Can I create a Makefile workflow? | ☐ | ☐ | ☐ | ☐ |
| Write correct YAML and avoid common traps | ☐ | ☐ | ☐ | ☐ |
| Use jq/yq and Make for repeatable tasks | ☐ | ☐ | ☐ | ☐ |
| Lint everything (shellcheck, yamllint, hadolint, ruff) | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-27/` in your own repository:

```text
day-27/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-27
git add day-27/
git commit -m "day-27: yaml, json, makefiles & code quality tooling"
git push -u origin day-27
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

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 28 →](../day-28/README.md)
