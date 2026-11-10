# Day 79 — GitOps with Argo CD: Declarative Deployments

[← Day 78](../day-78/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 80 →](../day-80/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-84` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain GitOps principles and pull-based delivery
- [ ] Install Argo CD and deploy an application from git
- [ ] Observe sync, drift and self-heal

## 2. Prerequisites

- Days 71-78.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 GitOps

Git is the single source of truth for desired state; an in-cluster agent continuously reconciles actual to desired (pull-based). Benefits: audit trail, easy rollback (git revert), no cluster credentials in CI, drift correction.

### 3.2 Argo CD

Application CRD = source (git/Helm/Kustomize) + destination (cluster/namespace) + sync policy (`automated`, `prune`, `selfHeal`). UI, CLI, health and sync status.

### 3.3 Repo layout

Separate app source repo from config (GitOps) repo; promotion via PRs between environment folders.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Argo CD in kind (`argocd` namespace); log in via port-forward.
2. [ ] Create a GitOps repo with `apps/web/{base,overlays}`.
3. [ ] Create Application with automated sync + selfHeal.
4. [ ] Manually change replicas with kubectl; watch Argo revert it.
5. [ ] Deploy a change via PR merge and observe sync.

## 5. Real-World Scenario

> Engineers `kubectl edit` in prod and nobody knows what changed. Show how GitOps prevents and reverses it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl create ns argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d
kubectl -n argocd port-forward svc/argocd-server 8081:443
argocd app create web --repo https://github.com/USER/gitops.git --path apps/web/overlays/dev --dest-server https://kubernetes.default.svc --dest-namespace dev --sync-policy automated --self-heal --auto-prune
argocd app get web; argocd app history web
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a GitOps principles note. | You can demonstrate, without notes: *explain GitOps principles and pull-based delivery* — with evidence committed to `day-79/`. |
| 2 | Rotate/disable initial admin secret after setup. | You can demonstrate, without notes: *install Argo CD and deploy an application from git* — with evidence committed to `day-79/`. |
| 3 | Draw GitOps flow vs push-based CI/CD. | You can demonstrate, without notes: *observe sync, drift and self-heal* — with evidence committed to `day-79/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| App OutOfSync forever | Mutating controllers/defaults changing fields; use `ignoreDifferences` carefully. |
| Repo access denied | Add repo credentials/deploy key in Argo CD. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Restrict Argo RBAC/projects, use SSO, do not expose UI publicly without auth, keep secrets encrypted (SOPS/External Secrets).
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

1. What is GitOps?
2. Push vs pull deployments?
3. What does selfHeal do?
4. Why separate config repo?
5. **Scenario:** Engineers `kubectl edit` in prod and nobody knows what changed. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I deploy via Argo CD? | ☐ | ☐ | ☐ | ☐ |
| Can I show drift correction? | ☐ | ☐ | ☐ | ☐ |
| Can I explain GitOps benefits? | ☐ | ☐ | ☐ | ☐ |
| Explain GitOps principles and pull-based delivery | ☐ | ☐ | ☐ | ☐ |
| Install Argo CD and deploy an application from git | ☐ | ☐ | ☐ | ☐ |
| Observe sync, drift and self-heal | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-79/` in your own repository:

```text
day-79/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-79
git add day-79/
git commit -m "day-79: gitops with argo cd"
git push -u origin day-79
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

[← Day 78](../day-78/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 80 →](../day-80/README.md)
