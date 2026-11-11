# Day 44 — DevSecOps I: SAST, Dependency Scanning & Code Scanning

[← Day 43](../day-43/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 45 →](../day-45/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 44 – Secrets, Artifacts & Running Real Tests in CI — Challenge Brief

#### Task
Today your pipeline starts doing **real work** — storing sensitive values securely, saving build outputs, and running actual tests from your previous days.

---

#### Expected Output
- New workflow files in your `github-actions-practice` repo
- A markdown file: `day-44-secrets-artifacts.md`
- A passing test run in CI

---

#### Challenge Tasks

##### Task 1: GitHub Secrets
1. Go to your repo → Settings → Secrets and Variables → Actions
2. Create a secret called `MY_SECRET_MESSAGE`
3. Create a workflow that reads it and prints: `The secret is set: true` (never print the actual value)
4. Try to print `${{ secrets.MY_SECRET_MESSAGE }}` directly — what does GitHub show?

Write in your notes: Why should you never print secrets in CI logs?

---

##### Task 2: Use Secrets as Environment Variables
1. Pass a secret to a step as an environment variable
2. Use it in a shell command without ever hardcoding it
3. Add `DOCKER_USERNAME` and `DOCKER_TOKEN` as secrets (you'll need these on Day 45)

---

##### Task 3: Upload Artifacts
1. Create a step that generates a file — e.g., a test report or a log file
2. Use `actions/upload-artifact` to save it
3. After the workflow runs, download the artifact from the Actions tab

**Verify:** Can you see and download it from GitHub?

---

##### Task 4: Download Artifacts Between Jobs
1. Job 1: generate a file and upload it as an artifact
2. Job 2: download the artifact from Job 1 and use it (print its contents)

Write in your notes: When would you use artifacts in a real pipeline?

---

##### Task 5: Run Real Tests in CI
Take any script from your earlier days (Python or Shell) and run it in CI:
1. Add your script to the `github-actions-practice` repo
2. Write a workflow that:
   - Checks out the code
   - Installs any dependencies needed
   - Runs the script
   - Fails the pipeline if the script exits with a non-zero code
3. Intentionally break the script — verify the pipeline goes red
4. Fix it — verify it goes green again

---

##### Task 6: Caching
1. Add `actions/cache` to a workflow that installs dependencies
2. Run it twice — observe the time difference
3. Write in your notes: What is being cached and where is it stored?

---

#### Hints
- Secrets: `${{ secrets.SECRET_NAME }}`
- Upload artifact: `uses: actions/upload-artifact@v4`
- Download artifact: `uses: actions/download-artifact@v4`
- Cache: `uses: actions/cache@v4`
- GitHub masks secret values in logs automatically

---

#### Documentation
Create `day-44-secrets-artifacts.md` with:
- Screenshots of artifact download
- Screenshot of your passing test run
- What you learned about secrets management

---

#### Submission
1. Add `day-44-secrets-artifacts.md` to `2026/day-44/`
2. Commit and push to your fork

---

#### Learn in Public
Share your first real test run passing in CI on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 44 – Secrets, Artifacts & Running Real Tests in CI — Notes & Solution

#### Task
Today your pipeline starts doing **real work** — storing sensitive values securely, saving build outputs, and running actual tests from your previous days.

---

#### Challenge Tasks

##### Task 1: GitHub Secrets
1. Go to your repo → Settings → Secrets and Variables → Actions
2. Create a secret called `MY_SECRET_MESSAGE`
3. Create a workflow that reads it and prints: `The secret is set: true` (never print the actual value)
4. Try to print `${{ secrets.MY_SECRET_MESSAGE }}` directly — what does GitHub show?

Write in your notes: Why should you never print secrets in CI logs?

[secret demo yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/secrets-demo.yml)

<img width="1290" height="271" alt="Screenshot 2026-09-18 175149" src="https://github.com/user-attachments/assets/a970959e-6d4e-4836-bcd4-3a58b00a8738" />
<img width="1919" height="694" alt="Screenshot 2026-09-18 175552" src="https://github.com/user-attachments/assets/79452ccd-64f5-4d38-ad72-62833600ec4a" />


GitHub automatically replaces secrets with ***
[secret yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/secrets.yml)

<img width="1917" height="870" alt="Screenshot 2026-09-18 175610" src="https://github.com/user-attachments/assets/56a60ee5-be56-4cd0-9c37-30ed56786048" />


---

##### Task 2: Use Secrets as Environment Variables
1. Pass a secret to a step as an environment variable
2. Use it in a shell command without ever hardcoding it
3. Add `DOCKER_USERNAME` and `DOCKER_TOKEN` as secrets (you'll need these on Day 45)
[secret env yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/secret-env.yml)

<img width="1919" height="877" alt="Screenshot 2026-09-18 181058" src="https://github.com/user-attachments/assets/4a320dbb-521f-4d73-b236-d0af80e03d7b" />
<img width="1906" height="729" alt="Screenshot 2026-09-18 180330" src="https://github.com/user-attachments/assets/88345026-0710-4d4b-8419-5b4b871c86c4" />


---

##### Task 3: Upload Artifacts
1. Create a step that generates a file — e.g., a test report or a log file
2. Use `actions/upload-artifact` to save it
3. After the workflow runs, download the artifact from the Actions tab

**Verify:** Can you see and download it from GitHub?

- Yes, downloaded it.
[artifact file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/upload-artifact.yml)

<img width="1919" height="865" alt="Screenshot 2026-09-18 181318" src="https://github.com/user-attachments/assets/e9b6857a-567c-405f-8176-7e272dd1d1b3" />

---

##### Task 4: Download Artifacts Between Jobs
1. Job 1: generate a file and upload it as an artifact
2. Job 2: download the artifact from Job 1 and use it (print its contents)

Write in your notes: When would you use artifacts in a real pipeline?
Artifacts are used to store and transfer files generated during pipelines.
Test reports,
[artifact between job yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/upload-artifact.yml)

<img width="1919" height="870" alt="Screenshot 2026-09-18 181634" src="https://github.com/user-attachments/assets/8d14b4ce-1119-4367-8d81-e260a913bd9d" />

---

##### Task 5: Run Real Tests in CI
Take any script from your earlier days (Python or Shell) and run it in CI:
1. Add your script to the `github-actions-practice` repo
2. Write a workflow that:
   - Checks out the code
   - Installs any dependencies needed
   - Runs the script
   - Fails the pipeline if the script exits with a non-zero code
3. Intentionally break the script — verify the pipeline goes red
4. Fix it — verify it goes green again

[test-yaml-file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/python-tests.yml)

<img width="1919" height="872" alt="Screenshot 2026-09-18 192411" src="https://github.com/user-attachments/assets/8f92b0e6-85be-430d-aa36-bc0cbd768d3d" />
<img width="1919" height="870" alt="Screenshot 2026-09-18 194616" src="https://github.com/user-attachments/assets/84fc15f9-997c-4d64-9320-7d2134f87dea" />

---

##### Task 6: Caching
1. Add `actions/cache` to a workflow that installs dependencies
2. Run it twice — observe the time difference
3. Write in your notes: What is being cached and where is it stored?

- What is cache: Python packages downloaded by pip from requirements.txt.
- Where it’s stored: On GitHub Actions servers, restored to the runner at ~/.cache/pip.

[cache-yaml-file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/cache-demo.yml)

<img width="1919" height="867" alt="Screenshot 2026-09-18 194004" src="https://github.com/user-attachments/assets/6210a609-abd7-4c1f-a00f-4cdbc7d3fc76" />

---

**What I lerned from Secret Management**

- **Store sensitive data (like API keys, tokens, passwords) in GitHub Actions Secrets, not in code.**
- **They are encrypted, injected at runtime, and never exposed in logs.**

**The Secret Management Lifecycle**
- Encryption at Rest: When you save a token (like DOCKER_TOKEN) in GitHub's settings, GitHub immediately encrypts it using strong asymmetric encryption before it ever hits their databases.

- Injected on Demand: The secret is only decrypted and injected into the runner environment at the exact moment a specific job or step requests it via the ${{ secrets.YOUR_SECRET }} syntax.

- Automatic Log Masking: If a script accidentally tries to print out or echo that secret to the standard output, GitHub Actions automatically intercepts it and replaces the value with in the build logs.

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Fix the SQL injection with parameterised queries. | You can demonstrate, without notes: *integrate SAST and SCA into pipelines* — with evidence committed to `day-44/`. |
| 2 | Write an exceptions process with owner/expiry. | You can demonstrate, without notes: *triage findings and tune noise* — with evidence committed to `day-44/`. |
| 3 | Compare 3 SAST tools. | You can demonstrate, without notes: *set quality/security gates* — with evidence committed to `day-44/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Too many false positives | Tune rules, scope paths, use baseline. |
| Scan too slow | Run incrementally on PRs; full scan nightly. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Security tools are only effective if findings have owners and SLAs (e.g. CRITICAL 7 days).
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

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

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. SAST vs SCA vs DAST?
2. How do you prioritise vulnerabilities?
3. What is CVSS/EPSS?
4. How do you avoid alert fatigue?
5. **Scenario:** Seed a vulnerable sample (SQL injection + old library). Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 43](../day-43/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 45 →](../day-45/README.md)
