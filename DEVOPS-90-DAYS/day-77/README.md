# Day 77 — Helm: Charts, Values, Templates & Releases

[← Day 76](../day-76/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 78 →](../day-78/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-59`, `90DaysOfDevOps-master/2026/day-78`, `90DaysOfDevOps-master/2026/day-79`, `90DaysOfDevOps-master/2026/day-80` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Install and manage third-party charts
- [ ] Create your own chart
- [ ] Manage releases, upgrades and rollbacks

## 2. Prerequisites

- Days 71-76.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Helm basics

Package manager for K8s. Chart = templates + `values.yaml` + `Chart.yaml`. Release = installed chart instance with revision history.

### 3.2 Templating

Go templates: `{{ .Values.x }}`, `include`, `_helpers.tpl`, `if/range`, `toYaml | nindent`, `required`. Validate with `helm lint` and `helm template`.

### 3.3 Operations

`helm install/upgrade --install/rollback/uninstall`, `--atomic`, `--wait`, values per environment, chart repositories/OCI registries, `helm diff` plugin.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install `bitnami/postgresql` (or similar) with custom values.
2. [ ] Create chart `helm create app` and adapt for your Capstone 1 app.
3. [ ] Add values for image tag, replicas, resources, ingress, env.
4. [ ] Create `values-dev.yaml` and `values-prod.yaml`.
5. [ ] Upgrade with `--atomic`, break it, observe auto-rollback; package and push chart to OCI (GHCR).

## 5. Real-World Scenario

> Ten near-identical YAML manifests are hard to maintain per environment. Replace them with one chart and per-env values.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo update
helm install db bitnami/postgresql -f db-values.yaml -n dev --create-namespace
helm create app && helm lint app && helm template app ./app -f values-dev.yaml | kubectl apply --dry-run=server -f -
helm upgrade --install app ./app -f values-prod.yaml --atomic --wait --timeout 3m
helm history app; helm rollback app 1
helm package app && helm push app-0.1.0.tgz oci://ghcr.io/USER/charts
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write chart README and values schema (`values.schema.json`). | You can demonstrate, without notes: *install and manage third-party charts* — with evidence committed to `day-77/`. |
| 2 | Add chart tests (`helm test`). | You can demonstrate, without notes: *create your own chart* — with evidence committed to `day-77/`. |
| 3 | Compare Helm vs Kustomize. | You can demonstrate, without notes: *manage releases, upgrades and rollbacks* — with evidence committed to `day-77/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Template renders wrong YAML | Use `helm template --debug`; check `nindent`. |
| Upgrade failed state | `helm rollback` or `helm uninstall`; fix values; use `--atomic`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Review third-party charts for privileged settings; pin versions; sign charts/OCI artifacts; keep secrets out of values files.
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

1. What is a release?
2. How to manage env differences?
3. Helm vs Kustomize?
4. What does `--atomic` do?
5. **Scenario:** Ten near-identical YAML manifests are hard to maintain per environment. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build and publish a chart? | ☐ | ☐ | ☐ | ☐ |
| Can I roll back? | ☐ | ☐ | ☐ | ☐ |
| Can I template env differences? | ☐ | ☐ | ☐ | ☐ |
| Install and manage third-party charts | ☐ | ☐ | ☐ | ☐ |
| Create your own chart | ☐ | ☐ | ☐ | ☐ |
| Manage releases, upgrades and rollbacks | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-77/` in your own repository:

```text
day-77/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-77
git add day-77/
git commit -m "day-77: helm"
git push -u origin day-77
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

[← Day 76](../day-76/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 78 →](../day-78/README.md)
