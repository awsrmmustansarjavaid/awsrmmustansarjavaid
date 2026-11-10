# Day 80 — Argo CD Advanced: App-of-Apps, ApplicationSets, Rollouts & Promotion

[← Day 79](../day-79/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 81 →](../day-81/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-85` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Manage many apps/environments declaratively
- [ ] Use ApplicationSets and sync waves
- [ ] Implement progressive delivery with Argo Rollouts

## 2. Prerequisites

- Day 79.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Scaling GitOps

App-of-apps bootstraps a whole platform; ApplicationSet generators (list, git, cluster) template many Applications; AppProjects enforce boundaries; sync waves/hooks order resources.

### 3.2 Progressive delivery

Argo Rollouts: canary/blue-green with analysis (Prometheus metrics) and automatic abort/rollback.

### 3.3 Promotion

dev -> staging -> prod through PR-based image tag bumps (Renovate/Image Updater/CI commit).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `bootstrap` app-of-apps that installs ingress, monitoring and your app.
2. [ ] Create ApplicationSet generating dev/staging apps.
3. [ ] Install Argo Rollouts; convert Deployment to Rollout with canary 20/50/100.
4. [ ] Add AnalysisTemplate using a Prometheus query (or stub) to abort.
5. [ ] Automate image tag bump via CI PR to the GitOps repo.

## 5. Real-World Scenario

> Release must reach 5% of users first and auto-abort when error rate > 1%. Implement it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  strategy:
    canary:
      steps: [{ setWeight: 20 }, { pause: { duration: 60s } }, { setWeight: 50 }, { analysis: { templates: [{ templateName: success-rate }] } }]
kubectl argo rollouts get rollout web --watch
kubectl argo rollouts abort web
argocd appset list
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document environment promotion flow. | You can demonstrate, without notes: *manage many apps/environments declaratively* — with evidence committed to `day-80/`. |
| 2 | Write rollback runbook for GitOps. | You can demonstrate, without notes: *use ApplicationSets and sync waves* — with evidence committed to `day-80/`. |
| 3 | Compare Argo CD vs Flux in a table. | You can demonstrate, without notes: *implement progressive delivery with Argo Rollouts* — with evidence committed to `day-80/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Rollout stuck paused | Manual promote needed or analysis pending; `promote`. |
| ApplicationSet creates duplicates | Generator overlap; make names unique. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use AppProjects to limit repos/namespaces/clusters; protect GitOps repo with reviews; audit sync history.
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

1. App-of-apps?
2. What is an ApplicationSet?
3. Canary analysis?
4. How do you promote between envs?
5. **Scenario:** Release must reach 5% of users first and auto-abort when error rate > 1%. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I bootstrap a platform from git? | ☐ | ☐ | ☐ | ☐ |
| Can I run a canary with abort? | ☐ | ☐ | ☐ | ☐ |
| Can I promote safely? | ☐ | ☐ | ☐ | ☐ |
| Manage many apps/environments declaratively | ☐ | ☐ | ☐ | ☐ |
| Use ApplicationSets and sync waves | ☐ | ☐ | ☐ | ☐ |
| Implement progressive delivery with Argo Rollouts | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-80/` in your own repository:

```text
day-80/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-80
git add day-80/
git commit -m "day-80: argo cd advanced"
git push -u origin day-80
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

[← Day 79](../day-79/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 81 →](../day-81/README.md)
