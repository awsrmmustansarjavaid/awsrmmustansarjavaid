# Day 85 — Platform Engineering: Internal Developer Platforms & Golden Paths

[← Day 84](../day-84/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 86 →](../day-86/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain platform engineering and IDP components
- [ ] Create a golden-path service template
- [ ] Provide self-service infrastructure with Crossplane/Terraform modules

## 2. Prerequisites

- Days 47-84.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why platforms

As complexity grows, product teams shouldn't each learn every tool. Platform teams build paved roads: self-service, secure by default, documented, measured by developer experience and adoption (treat the platform as a product).

### 3.2 IDP building blocks

Service catalogue/portal (Backstage), templates/scaffolding, CI/CD, GitOps, IaC modules/Crossplane compositions, secrets, observability defaults, policy guardrails, docs.

### 3.3 Metrics

Onboarding time, lead time, platform adoption, developer satisfaction, DORA, cost per service.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Design a golden path: 'new service in 15 minutes' with repo, pipeline, chart, dashboards and SLO.
2. [ ] Create a cookiecutter/Backstage-style template repo with CI, Dockerfile, Helm chart and Argo app manifest.
3. [ ] Add a simple self-service workflow: GitHub issue form -> workflow -> creates repo from template.
4. [ ] Optionally try Crossplane: `Claim` for a database composed from cloud resources.
5. [ ] Write a platform README and `service.yaml` catalogue entry.

## 5. Real-World Scenario

> New developers take 3 weeks to ship a first service. Reduce to 1 day via templates, self-service and docs.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gh repo create team/new-svc --template USER/golden-path-python --private
cookiecutter gh:USER/golden-path-python
catalog-info.yaml: apiVersion: backstage.io/v1alpha1 kind: Component spec: { type: service, lifecycle: production, owner: team-a }
gh workflow run new-service.yml -f name=orders -f team=team-a
kubectl apply -f database-claim.yaml   # Crossplane example
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw IDP architecture. | You can demonstrate, without notes: *explain platform engineering and IDP components* — with evidence committed to `day-85/`. |
| 2 | Write 'Platform as a product' roadmap with 3 quarters. | You can demonstrate, without notes: *create a golden-path service template* — with evidence committed to `day-85/`. |
| 3 | Define success metrics and measure baseline. | You can demonstrate, without notes: *provide self-service infrastructure with Crossplane/Terraform modules* — with evidence committed to `day-85/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Teams ignore the platform | Too rigid or poorly documented; talk to users, reduce friction. |
| Template drift | Version templates and automate updates (Renovate/template sync). |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Bake security defaults into templates (non-root, scanning, signed images, least-privilege IAM).
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

1. What is platform engineering?
2. What is a golden path?
3. How do you measure a platform?
4. DevOps vs platform engineering?
5. **Scenario:** New developers take 3 weeks to ship a first service. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I scaffold a service quickly? | ☐ | ☐ | ☐ | ☐ |
| Can I explain golden paths? | ☐ | ☐ | ☐ | ☐ |
| Can I define platform KPIs? | ☐ | ☐ | ☐ | ☐ |
| Explain platform engineering and IDP components | ☐ | ☐ | ☐ | ☐ |
| Create a golden-path service template | ☐ | ☐ | ☐ | ☐ |
| Provide self-service infrastructure with Crossplane/Terraform modules | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-85/` in your own repository:

```text
day-85/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-85
git add day-85/
git commit -m "day-85: platform engineering"
git push -u origin day-85
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

[← Day 84](../day-84/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 86 →](../day-86/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-85/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
