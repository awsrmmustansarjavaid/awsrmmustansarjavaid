# Day 71 — Kubernetes Architecture, Local Cluster & kubectl

[← Day 70](../day-70/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 72 →](../day-72/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-50` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Describe control plane and node components
- [ ] Create a local cluster (kind/minikube)
- [ ] Use kubectl fluently

## 2. Prerequisites

- Docker skills (Days 29-35).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Architecture

Control plane: API server, etcd, scheduler, controller-manager. Nodes: kubelet, container runtime, kube-proxy. Everything is a declarative resource reconciled by controllers.

### 3.2 Why Kubernetes

Self-healing, scaling, rolling updates, service discovery, declarative config; also complexity - use when you need it.

### 3.3 kubectl

`get/describe/apply/delete/logs/exec/port-forward/explain/diff`, contexts, namespaces, `-o yaml/json/jsonpath`, `kubectl auth can-i`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install kubectl and kind; create a 3-node cluster.
2. [ ] Inspect system pods in `kube-system`.
3. [ ] Run `kubectl explain pod.spec.containers`.
4. [ ] Deploy nginx and port-forward.
5. [ ] Set up kubectx/kubens and shell completion/aliases.

## 5. Real-World Scenario

> A teammate says 'the cluster is broken'. Show the first 5 kubectl commands you run to understand cluster health.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kind create cluster --name lab --config kind-3nodes.yaml
kubectl cluster-info; kubectl get nodes -o wide
kubectl get pods -A
kubectl create deployment web --image=nginx:1.27 --replicas=2
kubectl port-forward deploy/web 8080:80
kubectl describe pod <pod>; kubectl get events --sort-by=.lastTimestamp
kubectl api-resources | head
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw the K8s architecture from memory. | You can demonstrate, without notes: *describe control plane and node components* — with evidence committed to `day-71/`. |
| 2 | Write kubectl cheat sheet. | You can demonstrate, without notes: *create a local cluster (kind/minikube)* — with evidence committed to `day-71/`. |
| 3 | Explain reconciliation loop with an example. | You can demonstrate, without notes: *use kubectl fluently* — with evidence committed to `day-71/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `connection refused` to API | Wrong context/cluster down; `kubectl config get-contexts`. |
| Pods Pending | No resources/schedulable nodes; `describe pod`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Know which kubeconfig/context you're using; never run destructive commands in the wrong cluster.
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

1. Components of control plane?
2. What does kubelet do?
3. What is a reconciliation loop?
4. Why use namespaces?
5. **Scenario:** A teammate says 'the cluster is broken'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain the architecture? | ☐ | ☐ | ☐ | ☐ |
| Can I run kubectl basics? | ☐ | ☐ | ☐ | ☐ |
| Can I identify the current context? | ☐ | ☐ | ☐ | ☐ |
| Describe control plane and node components | ☐ | ☐ | ☐ | ☐ |
| Create a local cluster (kind/minikube) | ☐ | ☐ | ☐ | ☐ |
| Use kubectl fluently | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-71/` in your own repository:

```text
day-71/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-71
git add day-71/
git commit -m "day-71: kubernetes architecture, local cluster & kubectl"
git push -u origin day-71
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

[← Day 70](../day-70/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 72 →](../day-72/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-71/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
