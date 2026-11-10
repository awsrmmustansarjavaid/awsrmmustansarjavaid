# Day 90 — Final Assessment, Portfolio Polish & Interview Readiness

[← Day 89](../day-89/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | —

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced |
| **Estimated time** | 4.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-90` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Complete the career-readiness assessment
- [ ] Polish GitHub portfolio and CV with measurable outcomes
- [ ] Run technical and behavioural mock interviews

## 2. Prerequisites

- Days 1-89.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Career-readiness assessment

Score yourself 0-3 across 15 domains: Linux, networking, scripting, Git, containers, CI/CD, cloud, IaC, config management, Kubernetes, GitOps, observability, DevSecOps, SRE, platform engineering. Target: >= 36/45 with no domain at 0.

### 3.2 Portfolio

Three pinned capstones with architecture diagrams, demo GIFs, metrics (e.g. 'lead time 45 -> 8 min', 'rebuild env in 22 min'), security posture and lessons learned. CV bullets use action + tool + outcome.

### 3.3 Interviewing

Expect: Linux troubleshooting, networking, Git scenarios, pipeline design, Terraform state, K8s debugging, incident stories (STAR), system design for CI/CD or platform, security and cost questions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Complete the assessment in ASSESSMENT-AND-CERTIFICATION.md; list gaps and a 30-60-90 day follow-up plan.
2. [ ] Audit all repos: README, license, no secrets, consistent topics, pinned repos.
3. [ ] Write 8 CV bullets with measurable results from your projects.
4. [ ] Do 2 mock interviews (peer/AI/self-recorded): one technical, one scenario/system-design.
5. [ ] Choose certification path (AWS SAA/DevOps Pro, CKA, Terraform Associate, AZ-400) and book a date.

## 5. Real-World Scenario

> You have 45 minutes with a hiring manager: 'Walk me through the most complex system you built, its failures, and what you would improve.'

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gitleaks detect --source . --no-banner
gh repo list --limit 50 --json name,description,pushedAt
wc -l README.md docs/*.md
git shortlog -sn --since="90 days ago"
# Practise: explain, in order -> problem, architecture, trade-offs, security, failure, metrics, next steps
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a 12-month learning plan. | You can demonstrate, without notes: *complete the career-readiness assessment* — with evidence committed to `day-90/`. |
| 2 | Record a 3-minute project walkthrough. | You can demonstrate, without notes: *polish GitHub portfolio and CV with measurable outcomes* — with evidence committed to `day-90/`. |
| 3 | Publish a blog/post summarising 3 lessons from the 90 days. | You can demonstrate, without notes: *run technical and behavioural mock interviews* — with evidence committed to `day-90/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Nervous in interviews | Practise aloud with STAR; prepare 5 stories; rehearse troubleshooting narration. |
| Gaps discovered | Prioritise by job targets; build a mini-lab per gap. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Security hygiene in your public footprint: no secrets, no employer data, no real account IDs in diagrams.
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

1. Walk through a production incident you handled.
2. How do you design a secure CI/CD pipeline?
3. How would you debug a failing deployment in K8s?
4. How do you balance speed and reliability?
5. **Scenario:** You have 45 minutes with a hiring manager: 'Walk me through the most complex system you built, its failures, and what you would improve. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Did I score >= 36/45? | ☐ | ☐ | ☐ | ☐ |
| Are my projects interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Do I have a concrete next-step plan? | ☐ | ☐ | ☐ | ☐ |
| Complete the career-readiness assessment | ☐ | ☐ | ☐ | ☐ |
| Polish GitHub portfolio and CV with measurable outcomes | ☐ | ☐ | ☐ | ☐ |
| Run technical and behavioural mock interviews | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-90/` in your own repository:

```text
day-90/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-90
git add day-90/
git commit -m "day-90: final assessment, portfolio polish & interview readiness"
git push -u origin day-90
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Final assessment, portfolio audit, CV bullets, 12-month plan.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 54 |
| Hands-on labs and commands (Sections 4–6) | 122 |
| Assignment + troubleshooting (Sections 7–8) | 54 |
| Interview practice, documentation, Git push (Sections 11–14) | 40 |
| **Total** | **270 (≈ 4.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 89](../day-89/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | —
