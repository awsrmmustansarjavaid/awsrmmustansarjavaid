# Day 87 — Capstone 3 (Part 1/3): Production Kubernetes Platform Foundation

[← Day 86](../day-86/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 88 →](../day-88/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 3 (portfolio deliverable) |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-81`, `90DaysOfDevOps-master/2026/day-82`, `90DaysOfDevOps-master/2026/day-83` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design and build the Kubernetes platform
- [ ] Provision the cluster with IaC
- [ ] Bootstrap GitOps and baseline security

## 2. Prerequisites

- Days 50-86.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project definition

Capstone 3 - Production Kubernetes & GitOps Platform: managed cluster (EKS/AKS) or multi-node kind for budget, provisioned by Terraform; Argo CD app-of-apps; ingress/Gateway with TLS; Prometheus/Grafana/Loki/OTel; Kyverno policies; External Secrets/SOPS; Velero backup; sample multi-service app.

### 3.2 Platform baseline

Namespaces per env/team, ResourceQuota/LimitRange, default-deny NetworkPolicy, PSA restricted, RBAC, image verification.

### 3.3 Repo layout

`infra/` (Terraform), `gitops/` (apps, platform, envs), `apps/` (services), `docs/`, `.github/workflows/`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create repo `capstone3-k8s-gitops-platform`.
2. [ ] Provision cluster (EKS via Terraform or kind config) with node groups/autoscaling and OIDC.
3. [ ] Install Argo CD and bootstrap app-of-apps.
4. [ ] Deploy platform components: ingress, cert-manager, monitoring, policies.
5. [ ] Write ADRs (cluster choice, GitOps layout, secrets) and architecture diagram.

## 5. Real-World Scenario

> You are the platform lead. Stand up a production-grade foundation that product teams can deploy to safely on day one.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform -chdir=infra/envs/dev apply
aws eks update-kubeconfig --name capstone3 --region us-east-1   # or: kind create cluster --config kind.yaml
kubectl apply -n argocd -f gitops/bootstrap/root-app.yaml
argocd app list
kubectl get pods -A
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Estimate cluster cost and add schedule/teardown plan. | You can demonstrate, without notes: *design and build the Kubernetes platform* — with evidence committed to `day-87/`. |
| 2 | Document platform namespaces and conventions. | You can demonstrate, without notes: *provision the cluster with IaC* — with evidence committed to `day-87/`. |
| 3 | Create baseline policy set (Kyverno). | You can demonstrate, without notes: *bootstrap GitOps and baseline security* — with evidence committed to `day-87/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| EKS nodes not joining | IAM/node role, subnets tags, security groups, CNI. |
| Argo apps degraded | Check CRD ordering/sync waves and events. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Private endpoints where possible, IRSA/Workload Identity (no static keys), encrypt secrets (KMS), audit logging, least-privilege RBAC.
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

1. How do you bootstrap a platform?
2. How do pods access cloud APIs securely?
3. How do you structure GitOps repos?
4. What policies are baseline?
5. **Scenario:** You are the platform lead. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Is the cluster reproducible from code? | ☐ | ☐ | ☐ | ☐ |
| Is GitOps bootstrapped? | ☐ | ☐ | ☐ | ☐ |
| Are baseline controls active? | ☐ | ☐ | ☐ | ☐ |
| Design and build the Kubernetes platform | ☐ | ☐ | ☐ | ☐ |
| Provision the cluster with IaC | ☐ | ☐ | ☐ | ☐ |
| Bootstrap GitOps and baseline security | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-87/` in your own repository:

```text
day-87/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-87
git add day-87/
git commit -m "day-87: capstone 3 (part 1/3)"
git push -u origin day-87
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

[← Day 86](../day-86/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 88 →](../day-88/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-87/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
