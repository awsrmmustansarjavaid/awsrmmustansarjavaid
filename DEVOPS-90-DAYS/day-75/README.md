# Day 75 — Resource Management, Probes, HPA & Scheduling

[← Day 74](../day-74/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 76 →](../day-76/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-57`, `90DaysOfDevOps-master/2026/day-58` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Set requests/limits correctly
- [ ] Configure liveness, readiness and startup probes
- [ ] Autoscale and control scheduling

## 2. Prerequisites

- Days 72-74; metrics-server.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Resources

Requests drive scheduling; limits cap usage (CPU throttle, memory OOMKill). QoS classes: Guaranteed/Burstable/BestEffort. LimitRange and ResourceQuota enforce policy.

### 3.2 Probes

Startup (slow boot), readiness (receives traffic), liveness (restart when hung). Misconfigured liveness causes outages.

### 3.3 Scaling and placement

HPA (CPU/memory/custom metrics), VPA concepts, KEDA, PodDisruptionBudget, affinity/anti-affinity, taints/tolerations, topology spread.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install metrics-server; use `kubectl top`.
2. [ ] Add requests/limits and probes to Deployment.
3. [ ] Create HPA (target 50% CPU) and generate load.
4. [ ] Trigger OOMKill intentionally; diagnose.
5. [ ] Add PDB and topology spread; drain a node and observe.

## 5. Real-World Scenario

> Black-Friday traffic is 10x. The pods are getting OOMKilled and nodes are overcommitted. Fix sizing and autoscaling.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }
readinessProbe: { httpGet: { path: /health, port: 8000 }, periodSeconds: 5 }
livenessProbe:  { httpGet: { path: /health, port: 8000 }, initialDelaySeconds: 15, failureThreshold: 3 }
kubectl autoscale deploy web --cpu-percent=50 --min=2 --max=10
kubectl top pods; kubectl describe hpa web
kubectl drain node1 --ignore-daemonsets
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document sizing method (measure, set, review). | You can demonstrate, without notes: *set requests/limits correctly* — with evidence committed to `day-75/`. |
| 2 | Explain why CPU limits can hurt latency. | You can demonstrate, without notes: *configure liveness, readiness and startup probes* — with evidence committed to `day-75/`. |
| 3 | Write PDB for 3-replica app. | You can demonstrate, without notes: *autoscale and control scheduling* — with evidence committed to `day-75/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| OOMKilled (137) | Raise memory limit or fix leak; inspect `lastState`. |
| HPA shows `<unknown>` | metrics-server missing or no CPU requests set. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Quotas prevent noisy-neighbour/DoS; set sane defaults per namespace.
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

1. Requests vs limits?
2. Liveness vs readiness?
3. How does HPA decide?
4. What is a PDB?
5. **Scenario:** Black-Friday traffic is 10x. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I autoscale? | ☐ | ☐ | ☐ | ☐ |
| Can I design probes? | ☐ | ☐ | ☐ | ☐ |
| Can I explain QoS classes? | ☐ | ☐ | ☐ | ☐ |
| Set requests/limits correctly | ☐ | ☐ | ☐ | ☐ |
| Configure liveness, readiness and startup probes | ☐ | ☐ | ☐ | ☐ |
| Autoscale and control scheduling | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-75/` in your own repository:

```text
day-75/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-75
git add day-75/
git commit -m "day-75: resource management, probes, hpa & scheduling"
git push -u origin day-75
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

[← Day 74](../day-74/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 76 →](../day-76/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-75/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
