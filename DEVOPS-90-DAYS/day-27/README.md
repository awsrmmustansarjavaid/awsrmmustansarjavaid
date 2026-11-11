# Day 27 — YAML, JSON, Makefiles & Code Quality Tooling

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 28 →](../day-28/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 27 – GitHub Profile Makeover: Build Your Developer Identity — Challenge Brief

#### Task

Your GitHub profile is your **developer resume**. Recruiters, hiring managers, and open-source maintainers will look at your GitHub before your LinkedIn. Today, you'll clean up your profile, organize your repositories, and create a profile README that tells your story.

This is not a coding day — it's a **branding day**. Treat it seriously.

---

#### Expected Output
- A polished GitHub profile with a profile README
- Well-organized repositories with proper names, descriptions, and READMEs
- A markdown file: `day-27-notes.md` documenting what you changed and why

---

#### Challenge Tasks

##### Task 1: Audit Your Current GitHub Profile
Before making changes, assess where you stand:
1. Visit your own GitHub profile as if you were a stranger — what impression does it give?
2. Answer in your notes:
   - Is your profile picture professional?
   - Is your bio filled in? Does it say what you do?
   - Are your pinned repos relevant, or are they random forks?
   - Do your repos have descriptions, or are they blank?
   - Would a recruiter understand what you've been working on?

---

##### Task 2: Create Your Profile README
1. Create a **special repository** with the same name as your GitHub username (e.g., `github.com/yourname/yourname`)
2. Add a `README.md` — this will appear on your profile page
3. Include the following in your profile README:
   - A short introduction — who you are, what you're learning
   - What you're currently working on (e.g., 90 Days of DevOps)
   - Skills/tools you know or are learning (Linux, Git, Python, Shell, etc.)
   - Links to your important repos
   - How to reach you (LinkedIn, Twitter, email — whatever you're comfortable sharing)
4. Keep it clean and simple — don't overload it with badges and widgets

---

##### Task 3: Organize Your Repositories
Create and organize the following repos (if you don't have them already):

1. **90 Days of DevOps** — your fork or personal repo with all daily submissions
   - Clear README explaining what the challenge is
   - Organized folder structure by day

2. **Shell Scripts** — a dedicated repo for all your shell scripting work
   - Move/copy your scripts from Days 16–21 here
   - Add a README listing what each script does

3. **Python Scripts** — a dedicated repo for your Python projects
   - Move/copy your scripts from Days 7–15 here
   - Add a README listing what each script does

4. **DevOps Notes** — a repo for your learning notes, cheat sheets, and references
   - Add your shell scripting cheat sheet (Day 21)
   - Add your git-commands.md
   - Organize by topic (Linux, Git, Python, etc.)

For **every repo**, make sure you have:
- A clear, descriptive **repo name** (use hyphens, not spaces — e.g., `shell-scripts` not `Shell Scripts`)
- A one-line **description** on GitHub
- A proper **README.md** explaining what's inside
- A relevant `.gitignore`

---

##### Task 4: Pin Your Best Repos
1. Go to your GitHub profile and select **6 pinned repositories**
2. Choose repos that best represent your work and learning
3. Make sure each pinned repo has a description and README

---

##### Task 5: Clean Up
1. Delete or archive repos that are empty, abandoned, or irrelevant
2. Rename any repos with unclear names
3. Make sure you're not exposing any secrets (`.env` files, API keys, passwords) in any repo — check your commit history too

---

##### Task 6: Before & After
1. Take a screenshot of your GitHub profile **before** you started today
2. Take a screenshot **after** all your changes
3. Add both to your `day-27-notes.md`
4. Write 3 things you improved and why

---

#### Tips for a Good Profile README
- Keep it **short** — 15-20 lines max
- Use headers and bullet points — don't write paragraphs
- Show what you're **doing**, not just what you **know**
- A few well-placed badges are fine, but don't turn it into a Christmas tree
- Look at profiles you admire for inspiration — but make yours authentic

---

#### Submission
1. Add your `day-27-notes.md` (with before/after screenshots) to `2026/day-27/`
2. Share the link to your updated GitHub profile
3. Push to your fork

---

#### Learn in Public

Share your before & after GitHub profile screenshots on LinkedIn. Tag people who inspired your profile.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 27 – GitHub Profile Makeover: Build Your Developer Identity — Notes & Solution

##### Task 1: Audit Your Current GitHub Profile
Before making changes, assess where you stand:
1. Visit your own GitHub profile as if you were a stranger — what impression does it give?
2. Answer in your notes:
   - Is your profile picture professional?
       - Yes
   - Is your bio filled in? Does it say what you do?
       - No
   - Are your pinned repos relevant, or are they random forks?
       - They are mostly random forks and don’t fully showcase my own work.
   - Do your repos have descriptions, or are they blank?
       - Partially, Some repos have descriptions, But many are blank or unclear.
   - Would a recruiter understand what you've been working on?
       - No, it’s hard for them to quickly see my skills, projects
---

##### Task 2: Create Your Profile README

   - A short introduction — Currently learning Devops Tools and Technologies like Linux, AWS Cloud, Github, Terraform, Docker, Kubernetes, and CI/CD pipelines

   - What you're currently working on - 📅 90 Days of DevOps Journey – daily learning and hands-on practice
   - Skills/tools you know or are learning - Linux, AWS Cloud, Github, Terraform, Docker, Kubernetes, and CI/CD pipelines
   - Links to your important repos - Emial and Linkedin

---

##### Task 3: Organize Your Repositories

| Repo | Status |
|---|---|
| `90-days-of-devops`| Created |
| `shell-scripts` | Created |
| `devops-notes ` | Created |

All repos have:
- Descriptive repo names using hyphens
- One-line descriptions on GitHub
- README.md explaining contents

---

##### Task 4: Pin Your Best Repos

 - `90-days-of-devops`

---

##### Task 5: Clean Up

- Deleted irrelevant repos
- Confirmed all active repos have descriptions set on GitHub

---

##### Task 6: Before & After
1. GitHub profile **before**
<img width="1919" height="874" alt="Screenshot 2026-08-07 103837" src="https://github.com/user-attachments/assets/a4900250-43ee-40ec-86d9-94fb73e346b9" />


2. GitHub profile **After**
<img width="1919" height="875" alt="Screenshot 2026-08-18 162216" src="https://github.com/user-attachments/assets/8ebd26e7-30b8-4f51-b8da-566482018fa3" />


3. Things improved

    **Added a Personal Introduction**
    I Have added a heading and short summary (e.g., Hi, I’m Amit K Pandey — Cloud & DevOps Engineer) so That will be clearly visible once anyone will see my Github profile.

    **Organized Profile Layout**
    I structured the profile into sections like About Me, Skills, What I’m Working On, and Connect with Me. This makes the profile easier to read and more professional.

    **Highlighted Skills Clearly**
    I listed my all keys technical skills in an organized manner. This helps recruiters quickly see my profile strengths and expertise.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a 'YAML gotchas' note with 8 examples. | You can demonstrate, without notes: *write correct YAML and avoid common traps* — with evidence committed to `day-27/`. |
| 2 | Convert JSON<->YAML with yq. | You can demonstrate, without notes: *use jq/yq and Make for repeatable tasks* — with evidence committed to `day-27/`. |
| 3 | Add Makefile help target with `grep`/`awk`. | You can demonstrate, without notes: *lint everything (shellcheck, yamllint, hadolint, ruff)* — with evidence committed to `day-27/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `mapping values are not allowed here` | Indentation/colon issue; run yamllint. |
| jq returns null | Wrong path; inspect with `jq 'keys'`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Validate untrusted YAML with safe loaders; keep secrets out of YAML in git.
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

1. Why quote version numbers?
2. What does `jq .[]` do?
3. Why use a Makefile?
4. What are YAML anchors?
5. **Scenario:** A deployment failed because `version: 3. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 28 →](../day-28/README.md)
