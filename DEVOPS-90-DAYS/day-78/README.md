# Day 78 — Kubernetes Troubleshooting & Kustomize

[← Day 77](../day-77/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 79 →](../day-79/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Diagnose common failures systematically
- [ ] Use ephemeral debug containers and events
- [ ] Manage overlays with Kustomize

## 2. Prerequisites

- Days 71-77.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Failure playbook

Pending -> scheduling/resources/PVC; ImagePullBackOff -> image/creds; CrashLoopBackOff -> logs/previous logs/probes/config; OOMKilled; Service has no endpoints; NetworkPolicy blocks; DNS issues; node NotReady.

### 3.2 Tools

`describe`, `logs --previous`, `get events`, `kubectl debug`, `exec`, `top`, `auth can-i`, `kubectl get -o yaml`, stern, k9s.

### 3.3 Kustomize

Base + overlays; patches, image tags, config generators; built into kubectl (`-k`).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Break a deployment in 6 ways (bad image, wrong port, missing secret, failing probe, quota exceeded, wrong selector) and fix each.
2. [ ] Use `kubectl debug` with a netshoot ephemeral container.
3. [ ] Create Kustomize base and `dev`/`prod` overlays with patches.
4. [ ] Install k9s or stern and use it.
5. [ ] Write a troubleshooting decision tree.

## 5. Real-World Scenario

> It's 02:00: pods CrashLoopBackOff after a config change. Restore service within 10 minutes and leave a root-cause note.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl get pods -A | grep -v Running
kubectl describe pod p; kubectl logs p --previous
kubectl get events -A --sort-by=.lastTimestamp | tail -20
kubectl debug -it p --image=nicolaka/netshoot --target=app
kubectl apply -k overlays/prod && kubectl diff -k overlays/prod
kubectl rollout undo deploy/app
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Record time-to-diagnose for each broken scenario. | You can demonstrate, without notes: *diagnose common failures systematically* — with evidence committed to `day-78/`. |
| 2 | Publish troubleshooting guide to repo. | You can demonstrate, without notes: *use ephemeral debug containers and events* — with evidence committed to `day-78/`. |
| 3 | Practise `kubectl get all` pitfalls note. | You can demonstrate, without notes: *manage overlays with Kustomize* — with evidence committed to `day-78/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Logs empty | Container never started; use describe/events or `--previous`. |
| Kustomize patch not applied | Target/selector mismatch; run `kustomize build`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Debug containers with least privilege; do not leave debug pods running; audit exec access.
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

1. How do you debug CrashLoopBackOff?
2. What is an ephemeral container?
3. Helm vs Kustomize?
4. How do you find recent changes?
5. **Scenario:** It's 02:00: pods CrashLoopBackOff after a config change. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I fix 6 failure types? | ☐ | ☐ | ☐ | ☐ |
| Can I use Kustomize overlays? | ☐ | ☐ | ☐ | ☐ |
| Can I explain my debug flow? | ☐ | ☐ | ☐ | ☐ |
| Diagnose common failures systematically | ☐ | ☐ | ☐ | ☐ |
| Use ephemeral debug containers and events | ☐ | ☐ | ☐ | ☐ |
| Manage overlays with Kustomize | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-78/` in your own repository:

```text
day-78/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-78
git add day-78/
git commit -m "day-78: kubernetes troubleshooting & kustomize"
git push -u origin day-78
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

[← Day 77](../day-77/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 79 →](../day-79/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-78/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
