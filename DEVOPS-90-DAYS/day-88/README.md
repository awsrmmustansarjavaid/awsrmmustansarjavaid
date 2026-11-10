# Day 88 — Capstone 3 (Part 2/3): Application Delivery, Observability & Security

[← Day 87](../day-87/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 89 →](../day-89/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 3 (portfolio deliverable) |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-86` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Deploy a multi-service app via GitOps with progressive delivery
- [ ] Add SLOs, dashboards, logs and traces
- [ ] Enforce supply-chain and runtime security

## 2. Prerequisites

- Day 87.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Application delivery

CI builds, scans, signs and pushes images; CI opens PR to GitOps repo bumping tag; Argo CD syncs; Argo Rollouts canary with Prometheus analysis; automated rollback.

### 3.2 Observability

ServiceMonitors, Grafana dashboards-as-code, Loki logs, OTel traces, SLO burn-rate alerts with runbooks.

### 3.3 Security

Kyverno verifies cosign signatures; NetworkPolicies per service; External Secrets from cloud secret manager; Trivy Operator or scheduled scans.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Deploy 3-service sample app (frontend, API, worker + DB).
2. [ ] Implement pipeline: build -> scan -> sign -> PR to GitOps repo.
3. [ ] Configure canary rollout with analysis.
4. [ ] Create dashboards, SLOs and alerts; test an alert by inducing errors.
5. [ ] Verify unsigned image is rejected by admission policy.

## 5. Real-World Scenario

> Ship a change and a deliberately bad change: good must go to 100%, bad must abort automatically while alerts fire.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gh workflow run release.yml
kubectl argo rollouts get rollout api -n prod --watch
kubectl apply -f unsigned-pod.yaml   # expect Kyverno denial
kubectl get cpol,policyreport -A
curl -s https://api.example.com/health
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Capture screenshots of dashboards and failed policy. | You can demonstrate, without notes: *deploy a multi-service app via GitOps with progressive delivery* — with evidence committed to `day-88/`. |
| 2 | Write service runbooks. | You can demonstrate, without notes: *add SLOs, dashboards, logs and traces* — with evidence committed to `day-88/`. |
| 3 | Record delivery metrics (lead time, rollback time). | You can demonstrate, without notes: *enforce supply-chain and runtime security* — with evidence committed to `day-88/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Canary analysis always fails | Query/label mismatch or insufficient traffic; add load generator. |
| Policy blocks platform pods | Exclude system namespaces/test policies in audit mode first. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Roll out policies in audit then enforce mode; protect GitOps repo; rotate secrets via External Secrets.
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

1. How does a change reach production here?
2. How do you auto-abort bad releases?
3. How do you enforce signed images?
4. How do you test alerts?
5. **Scenario:** Ship a change and a deliberately bad change: good must go to 100%, bad must abort automatically while alerts fire. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Does bad release auto-abort? | ☐ | ☐ | ☐ | ☐ |
| Are SLOs/alerts working? | ☐ | ☐ | ☐ | ☐ |
| Are unsigned images blocked? | ☐ | ☐ | ☐ | ☐ |
| Deploy a multi-service app via GitOps with progressive delivery | ☐ | ☐ | ☐ | ☐ |
| Add SLOs, dashboards, logs and traces | ☐ | ☐ | ☐ | ☐ |
| Enforce supply-chain and runtime security | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-88/` in your own repository:

```text
day-88/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-88
git add day-88/
git commit -m "day-88: capstone 3 (part 2/3)"
git push -u origin day-88
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

[← Day 87](../day-87/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 89 →](../day-89/README.md)
