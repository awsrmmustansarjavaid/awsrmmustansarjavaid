# Day 72 — Pods, Manifests, Namespaces & Deployments

[← Day 71](../day-71/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 73 →](../day-73/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-51`, `90DaysOfDevOps-master/2026/day-52` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Write YAML manifests for Pods and Deployments
- [ ] Perform rolling updates and rollbacks
- [ ] Organise with namespaces and labels

## 2. Prerequisites

- Day 71.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Pods and Deployments

Pod = one or more containers sharing network/storage. Deployments manage ReplicaSets for declarative updates, rollbacks and scaling.

### 3.2 Labels and selectors

Labels are key/values; selectors connect Services/Deployments to Pods. Annotations hold metadata.

### 3.3 Rollouts

`strategy: RollingUpdate` with `maxSurge/maxUnavailable`; `kubectl rollout status/history/undo`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create namespace `dev`; deploy a Deployment (3 replicas) via YAML.
2. [ ] Update image; watch rollout; rollback.
3. [ ] Scale up/down; delete a pod and watch self-heal.
4. [ ] Add labels; query with `-l`.
5. [ ] Use `kubectl diff -f` and `--dry-run=server`.

## 5. Real-World Scenario

> Ship v2 without downtime; when v2 is broken, roll back in seconds and show evidence.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
apiVersion: apps/v1
kind: Deployment
metadata: { name: web, namespace: dev, labels: { app: web } }
spec:
  replicas: 3
  selector: { matchLabels: { app: web } }
  strategy: { type: RollingUpdate, rollingUpdate: { maxSurge: 1, maxUnavailable: 0 } }
  template:
    metadata: { labels: { app: web } }
    spec: { containers: [{ name: web, image: nginx:1.27, ports: [{ containerPort: 80 }] }] }
kubectl apply -f web.yaml && kubectl -n dev rollout status deploy/web
kubectl -n dev set image deploy/web web=nginx:bad && kubectl -n dev rollout undo deploy/web
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a manifest for Job and CronJob. | You can demonstrate, without notes: *write YAML manifests for Pods and Deployments* — with evidence committed to `day-72/`. |
| 2 | Document Deployment vs ReplicaSet vs Pod. | You can demonstrate, without notes: *perform rolling updates and rollbacks* — with evidence committed to `day-72/`. |
| 3 | Practice `kubectl get -o jsonpath`. | You can demonstrate, without notes: *organise with namespaces and labels* — with evidence committed to `day-72/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| ImagePullBackOff | Wrong image/tag/registry credentials. |
| Rollout stuck | Readiness failing or insufficient resources; `describe` + events. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Pin image tags/digests, avoid `latest`, define namespaces per team, don't run as root (Day 76).
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

1. Pod vs Deployment?
2. What is maxUnavailable?
3. How do you rollback?
4. What are labels used for?
5. **Scenario:** Ship v2 without downtime; when v2 is broken, roll back in seconds and show evidence. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I roll out and roll back? | ☐ | ☐ | ☐ | ☐ |
| Can I explain label selection? | ☐ | ☐ | ☐ | ☐ |
| Can I write a Deployment YAML from scratch? | ☐ | ☐ | ☐ | ☐ |
| Write YAML manifests for Pods and Deployments | ☐ | ☐ | ☐ | ☐ |
| Perform rolling updates and rollbacks | ☐ | ☐ | ☐ | ☐ |
| Organise with namespaces and labels | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-72/` in your own repository:

```text
day-72/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-72
git add day-72/
git commit -m "day-72: pods, manifests, namespaces & deployments"
git push -u origin day-72
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

[← Day 71](../day-71/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 73 →](../day-73/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-72/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
