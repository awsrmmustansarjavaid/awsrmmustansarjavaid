# Day 74 — ConfigMaps, Secrets, Persistent Volumes & StatefulSets

[← Day 73](../day-73/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 75 →](../day-75/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-54`, `90DaysOfDevOps-master/2026/day-55`, `90DaysOfDevOps-master/2026/day-56` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Externalise configuration safely
- [ ] Provide persistent storage with PV/PVC/StorageClass
- [ ] Run a stateful workload

## 2. Prerequisites

- Days 72-73.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Config

ConfigMaps hold non-sensitive config; Secrets hold sensitive data (base64 is NOT encryption). Mount as env or files. Enable etcd encryption; use External Secrets/SOPS/Sealed Secrets.

### 3.2 Storage

PersistentVolume (supply), PersistentVolumeClaim (request), StorageClass (dynamic provisioning), access modes, reclaim policy, volume snapshots.

### 3.3 StatefulSets

Stable network identity, ordered rollout and per-pod PVCs (`volumeClaimTemplates`) for databases/queues.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create ConfigMap and mount as file + env.
2. [ ] Create Secret; show base64 decoding to demonstrate weakness.
3. [ ] Create PVC and a pod writing data; delete pod and verify persistence.
4. [ ] Deploy PostgreSQL StatefulSet with 1 replica and headless service.
5. [ ] Take a volume snapshot (if supported) or backup with `pg_dump`.

## 5. Real-World Scenario

> App loses uploads whenever it redeploys. Add persistence and explain backup responsibility.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl create configmap app-config --from-literal=LOG_LEVEL=info
kubectl create secret generic db --from-literal=password=changeme
kubectl get secret db -o jsonpath='{.data.password}' | base64 -d
kubectl get sc,pv,pvc
volumeClaimTemplates: [{ metadata: { name: data }, spec: { accessModes: [ReadWriteOnce], resources: { requests: { storage: 1Gi } } } }]
kubectl exec -it pg-0 -- pg_dump -U postgres app > backup.sql
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Compare Secret handling options. | You can demonstrate, without notes: *externalise configuration safely* — with evidence committed to `day-74/`. |
| 2 | Write backup/restore note for stateful apps. | You can demonstrate, without notes: *provide persistent storage with PV/PVC/StorageClass* — with evidence committed to `day-74/`. |
| 3 | Explain ReadWriteOnce vs ReadWriteMany. | You can demonstrate, without notes: *run a stateful workload* — with evidence committed to `day-74/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| PVC Pending | No StorageClass/provisioner or capacity issue. |
| Pod can't mount volume | AZ mismatch for zonal disks; check events. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never commit Secret YAML; enable encryption at rest; restrict `get secrets` RBAC.
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

1. ConfigMap vs Secret?
2. PV vs PVC vs StorageClass?
3. Why StatefulSet?
4. Is base64 secure?
5. **Scenario:** App loses uploads whenever it redeploys. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I persist data? | ☐ | ☐ | ☐ | ☐ |
| Can I run a stateful app? | ☐ | ☐ | ☐ | ☐ |
| Can I explain secret risks? | ☐ | ☐ | ☐ | ☐ |
| Externalise configuration safely | ☐ | ☐ | ☐ | ☐ |
| Provide persistent storage with PV/PVC/StorageClass | ☐ | ☐ | ☐ | ☐ |
| Run a stateful workload | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-74/` in your own repository:

```text
day-74/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-74
git add day-74/
git commit -m "day-74: configmaps, secrets, persistent volumes & statefulsets"
git push -u origin day-74
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

[← Day 73](../day-73/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 75 →](../day-75/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-74/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
