# Day 47 — Capstone 1 (Part 1/3): Design, App & CI Foundation

[← Day 46](../day-46/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 48 →](../day-48/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 1 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design an end-to-end CI/CD platform for a real app
- [ ] Create the repository, app and tests
- [ ] Implement the CI stage with quality gates

## 2. Prerequisites

- Days 1-46.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project definition

Capstone 1 - Secure CI/CD Platform: a 3-tier app (API + DB + frontend or API + worker) delivered by an automated pipeline: lint -> test -> SAST/SCA -> build -> image scan -> sign -> push -> deploy to staging -> smoke tests -> manual approval -> prod.

### 3.2 Architecture decisions

Write an ADR (Architecture Decision Record) for tooling choices, branching, tagging and environments.

### 3.3 Definition of done

Clean repo, README with diagram, reproducible local dev with Compose, green pipeline, security gates, runbook.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create repo `capstone1-secure-cicd` with standard layout.
2. [ ] Implement small API (Flask/FastAPI/Express) with `/health`, `/items` and tests (>= 80% coverage).
3. [ ] Create Compose for local dev with Postgres.
4. [ ] Add CI workflow: lint, tests, coverage, SAST, dependency scan.
5. [ ] Write ADR-001 and architecture diagram (Mermaid).

## 5. Real-World Scenario

> You are the first DevOps hire at a startup. The CTO wants a safe release process in 2 weeks. Present your design.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
mkdir -p capstone1-secure-cicd/{app,tests,docs,.github/workflows} && cd capstone1-secure-cicd
docker compose up -d --build
pytest --cov=app --cov-fail-under=80
gh workflow run ci.yml && gh run watch
mmdc -i docs/arch.mmd -o docs/arch.png   # optional mermaid-cli
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write ADR-001 'CI/CD tool choice'. | You can demonstrate, without notes: *design an end-to-end CI/CD platform for a real app* — with evidence committed to `day-47/`. |
| 2 | Define environment strategy (dev/staging/prod). | You can demonstrate, without notes: *create the repository, app and tests* — with evidence committed to `day-47/`. |
| 3 | List risks and mitigations. | You can demonstrate, without notes: *implement the CI stage with quality gates* — with evidence committed to `day-47/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Coverage gate fails | Add tests for critical paths; don't lower the gate without justification. |
| Compose DB races | Add healthcheck and wait. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Threat-model the pipeline itself: who can modify workflows, where secrets live, who can deploy.
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

1. How do you design a pipeline?
2. What is an ADR?
3. What gates would you add?
4. How do you secure the pipeline?
5. **Scenario:** You are the first DevOps hire at a startup. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Is my design documented? | ☐ | ☐ | ☐ | ☐ |
| Does CI run on every PR? | ☐ | ☐ | ☐ | ☐ |
| Do I have an ADR? | ☐ | ☐ | ☐ | ☐ |
| Design an end-to-end CI/CD platform for a real app | ☐ | ☐ | ☐ | ☐ |
| Create the repository, app and tests | ☐ | ☐ | ☐ | ☐ |
| Implement the CI stage with quality gates | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-47/` in your own repository:

```text
day-47/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-47
git add day-47/
git commit -m "day-47: capstone 1 (part 1/3)"
git push -u origin day-47
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 46](../day-46/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 48 →](../day-48/README.md)
