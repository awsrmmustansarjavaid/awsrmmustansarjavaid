# Day 44 — DevSecOps I: SAST, Dependency Scanning & Code Scanning

[← Day 43](../day-43/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 45 →](../day-45/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-49` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Integrate SAST and SCA into pipelines
- [ ] Triage findings and tune noise
- [ ] Set quality/security gates

## 2. Prerequisites

- Days 36-39.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Shift-left security

Find defects where they are cheapest to fix. SAST analyses source (CodeQL, Semgrep, SonarQube); SCA finds vulnerable dependencies (Dependabot, OWASP Dependency-Check, pip-audit, npm audit, Trivy fs).

### 3.2 Triage

Prioritise by exploitability, reachability, severity (CVSS/EPSS), exposure. Document false positives with expiry.

### 3.3 Gates

Block on new HIGH/CRITICAL; warn on others; avoid blocking on legacy noise.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Enable CodeQL workflow on your repo.
2. [ ] Add Semgrep with `p/owasp-top-ten`.
3. [ ] Run `pip-audit`/`npm audit` and fix one dependency.
4. [ ] Enable Dependabot security updates.
5. [ ] Create `security-gates.md` defining thresholds.

## 5. Real-World Scenario

> Seed a vulnerable sample (SQL injection + old library). Prove your pipeline catches both and blocks the merge.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
semgrep --config p/owasp-top-ten --error .
pip-audit -r requirements.txt
trivy fs --severity HIGH,CRITICAL --exit-code 1 .
# .github/workflows/codeql.yml uses: github/codeql-action/init@v3 + analyze@v3
gh api repos/:owner/:repo/code-scanning/alerts
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Fix the SQL injection with parameterised queries. | You can demonstrate, without notes: *integrate SAST and SCA into pipelines* — with evidence committed to `day-44/`. |
| 2 | Write an exceptions process with owner/expiry. | You can demonstrate, without notes: *triage findings and tune noise* — with evidence committed to `day-44/`. |
| 3 | Compare 3 SAST tools. | You can demonstrate, without notes: *set quality/security gates* — with evidence committed to `day-44/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Too many false positives | Tune rules, scope paths, use baseline. |
| Scan too slow | Run incrementally on PRs; full scan nightly. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Security tools are only effective if findings have owners and SLAs (e.g. CRITICAL 7 days).
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

1. SAST vs SCA vs DAST?
2. How do you prioritise vulnerabilities?
3. What is CVSS/EPSS?
4. How do you avoid alert fatigue?
5. **Scenario:** Seed a vulnerable sample (SQL injection + old library). Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I add SAST to CI? | ☐ | ☐ | ☐ | ☐ |
| Can I triage findings? | ☐ | ☐ | ☐ | ☐ |
| Can I define gates? | ☐ | ☐ | ☐ | ☐ |
| Integrate SAST and SCA into pipelines | ☐ | ☐ | ☐ | ☐ |
| Triage findings and tune noise | ☐ | ☐ | ☐ | ☐ |
| Set quality/security gates | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-44/` in your own repository:

```text
day-44/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-44
git add day-44/
git commit -m "day-44: devsecops i"
git push -u origin day-44
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

[← Day 43](../day-43/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 45 →](../day-45/README.md)
