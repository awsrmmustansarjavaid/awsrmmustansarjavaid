# Day 38 — Secrets, OIDC, Artifacts & Tests in CI

[← Day 37](../day-37/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 39 →](../day-39/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Handle secrets safely in pipelines
- [ ] Authenticate to AWS using OIDC (no static keys)
- [ ] Upload artifacts and test reports

## 2. Prerequisites

- Day 36-37; basic IAM knowledge (Day 51 expands).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Secrets

Use repository/environment secrets; scope by environment; mask logs; rotate. Prefer short-lived credentials to long-lived keys.

### 3.2 OIDC federation

GitHub issues a signed JWT per run; AWS IAM role trusts `token.actions.githubusercontent.com` with conditions on repo/branch. No access keys stored.

### 3.3 Artifacts and reports

`upload-artifact` for coverage/test reports/binaries; JUnit XML; retention days.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create an environment `production` with required reviewers.
2. [ ] Add a secret and use it in a step; verify it's masked.
3. [ ] Create an IAM OIDC provider and role (or review the sample trust policy).
4. [ ] Use `aws-actions/configure-aws-credentials` with `role-to-assume`.
5. [ ] Upload coverage report as artifact.

## 5. Real-World Scenario

> A former employee still has a long-lived AWS key stored in GitHub. Replace with OIDC and prove no static keys remain.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
permissions: { id-token: write, contents: read }
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with: { role-to-assume: arn:aws:iam::123456789012:role/gha-deploy, aws-region: us-east-1 }
  - run: aws sts get-caller-identity
  - uses: actions/upload-artifact@v4
    with: { name: coverage, path: coverage.xml, retention-days: 7 }
# Trust policy condition
"token.actions.githubusercontent.com:sub": "repo:USER/REPO:ref:refs/heads/main"
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 38 – YAML Basics — Challenge Brief

#### Task
Before writing a single CI/CD pipeline, you need to get comfortable with **YAML** — the language every pipeline is written in.

You will:
- Understand YAML syntax and rules
- Write YAML files by hand
- Validate them

---

#### Expected Output
- A markdown file: `day-38-yaml.md`
- YAML files you create during the tasks

---

#### Challenge Tasks

##### Task 1: Key-Value Pairs
Create `person.yaml` that describes yourself with:
- `name`
- `role`
- `experience_years`
- `learning` (a boolean)

**Verify:** Run `cat person.yaml` — does it look clean? No tabs?

---

##### Task 2: Lists
Add to `person.yaml`:
- `tools` — a list of 5 DevOps tools you know or are learning
- `hobbies` — a list using the inline format `[item1, item2]`

Write in your notes: What are the two ways to write a list in YAML?

---

##### Task 3: Nested Objects
Create `server.yaml` that describes a server:
- `server` with nested keys: `name`, `ip`, `port`
- `database` with nested keys: `host`, `name`, `credentials` (nested further: `user`, `password`)

**Verify:** Try adding a tab instead of spaces — what happens when you validate it?

---

##### Task 4: Multi-line Strings
In `server.yaml`, add a `startup_script` field using:
1. The `|` block style (preserves newlines)
2. The `>` fold style (folds into one line)

Write in your notes: When would you use `|` vs `>`?

---

##### Task 5: Validate Your YAML
1. Install `yamllint` or use an online validator
2. Validate both your YAML files
3. Intentionally break the indentation — what error do you get?
4. Fix it and validate again

---

##### Task 6: Spot the Difference
Read both blocks and write what's wrong with the second one:

```yaml
# Block 1 - correct
name: devops
tools:
  - docker
  - kubernetes
```

```yaml
# Block 2 - broken
name: devops
tools:
- docker
  - kubernetes
```

---

#### Hints
- YAML uses **spaces only** — never tabs
- Indentation is everything — 2 spaces is standard
- Strings don't need quotes unless they contain special characters (`:`, `#`, etc.)
- `true`/`false` are booleans, `"true"` is a string
- Validate online: yamllint.com

---

#### Documentation
Create `day-38-yaml.md` with:
- Your YAML files
- What you learned (3 key points)

---

#### Submission
1. Add your YAML files and `day-38-yaml.md` to `2026/day-38/`
2. Commit and push to your fork

---

#### Learn in Public
Share your YAML "aha moment" on LinkedIn — the tab vs space mistake gets everyone.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀Day 38 – YAML Basics — Notes & Solution

#### 🎯Task
Before writing a single CI/CD pipeline, you need to get comfortable with **YAML** — the language every pipeline is written in.

You will:
- Understand YAML syntax and rules
- Write YAML files by hand
- Validate them

---

#### 🔹Challenge Tasks

##### 📝Task 1: Key-Value Pairs
Create `person.yaml` that describes yourself with:
- `name`
- `role`
- `experience_years`
- `learning` (a boolean)


---

##### 📋Task 2: Lists
Add to `person.yaml`:
- `tools` — a list of 5 DevOps tools you know or are learning
- `hobbies` — a list using the inline format `[item1, item2]`

Write in your notes: What are the two ways to write a list in YAML?

- Using - dash

- Using square brackets [ ] inline format
- 
**Verify:** Run `cat person.yaml` — does it look clean? No tabs?

<img width="1264" height="380" alt="Screenshot 2026-09-04 124402" src="https://github.com/user-attachments/assets/fe2d921b-1f84-456c-bcc8-5a0fe7cf4128" />

---

##### 🏗️Task 3: Nested Objects
Create `server.yaml` that describes a server:
- `server` with nested keys: `name`, `ip`, `port`
- `database` with nested keys: `host`, `name`, `credentials` (nested further: `user`, `password`)

**Verify:** Try adding a tab instead of spaces — what happens when you validate it?
- Gives wrong indentation error

<img width="1326" height="347" alt="Screenshot 2026-09-04 124556" src="https://github.com/user-attachments/assets/03a9c058-6fec-4518-8e6e-d94e723dfaa9" />


---

##### 📜Task 4: Multi-line Strings
In `server.yaml`, add a `startup_script` field using:
1. The `|` block style (preserves newlines)
2. The `>` fold style (folds into one line)

Write in your notes: When would you use `|` vs `>`?
-  `|` - Use when formatting matters (scripts, commands, exact output) &  `>` - Use when you want cleaner, wrapped text without line breaks

<img width="1301" height="518" alt="Screenshot 2026-09-04 124602" src="https://github.com/user-attachments/assets/52784a74-c8aa-4cf7-82a2-c0f0ef44d1ce" />


---

##### ✅Task 5: Validate Your YAML
1. Install `yamllint` or use an online validator
2. Validate both your YAML files
3. Intentionally break the indentation — what error do you get?
4. Fix it and validate again

<img width="1030" height="154" alt="Screenshot 2026-09-04 123533" src="https://github.com/user-attachments/assets/9dcb46fc-d097-4bae-b847-5318e88dae88" />
<img width="1027" height="140" alt="Screenshot 2026-09-04 123521" src="https://github.com/user-attachments/assets/ae66f944-e319-48ba-8aae-ca2f5272b1c2" />

---

##### 🔍Task 6: Spot the Difference
Read both blocks and write what's wrong with the second one:

```yaml
# Block 1 - correct
database:
  host: db-server
  name: devopsdb
```

```yaml
# Block 2 - broken
database:
  host: db-server
    name: devopsdb
```
- In Block 2 Wrong indentation for the list item kubernetes


<img width="1129" height="154" alt="Screenshot 2026-09-04 124748" src="https://github.com/user-attachments/assets/ff47ea4c-ca29-4aa5-b158-2c61e79121d4" />

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a secrets-handling policy. | You can demonstrate, without notes: *handle secrets safely in pipelines* — with evidence committed to `day-38/`. |
| 2 | Compare OIDC vs access keys in a table. | You can demonstrate, without notes: *authenticate to AWS using OIDC (no static keys)* — with evidence committed to `day-38/`. |
| 3 | Add environment protection to production deploy job. | You can demonstrate, without notes: *upload artifacts and test reports* — with evidence committed to `day-38/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | Trust policy `sub`/`aud` mismatch; check branch/repo/environment claim. |
| Secret shows in logs | Never echo; use `::add-mask::`; rotate immediately. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Prefer OIDC; environment-scoped secrets; required approvals for prod; restrict `sub` to protected branches.
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

1. Why OIDC over access keys?
2. What is a trust policy?
3. How do environments help?
4. What to do if a secret leaks in logs?
5. **Scenario:** A former employee still has a long-lived AWS key stored in GitHub. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I assume a role without keys? | ☐ | ☐ | ☐ | ☐ |
| Can I protect prod deploys? | ☐ | ☐ | ☐ | ☐ |
| Can I store artifacts? | ☐ | ☐ | ☐ | ☐ |
| Handle secrets safely in pipelines | ☐ | ☐ | ☐ | ☐ |
| Authenticate to AWS using OIDC (no static keys) | ☐ | ☐ | ☐ | ☐ |
| Upload artifacts and test reports | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-38/` in your own repository:

```text
day-38/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-38
git add day-38/
git commit -m "day-38: secrets, oidc, artifacts & tests in ci"
git push -u origin day-38
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

[← Day 37](../day-37/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 39 →](../day-39/README.md)
