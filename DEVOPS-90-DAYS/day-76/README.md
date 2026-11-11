# Day 76 — Kubernetes Security: RBAC, NetworkPolicy, Pod Security & Admission Policies

[← Day 75](../day-75/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 77 →](../day-77/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Apply least-privilege RBAC
- [ ] Isolate workloads with NetworkPolicies
- [ ] Enforce Pod Security Standards and policies

## 2. Prerequisites

- Days 71-75.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 RBAC

Roles/ClusterRoles define verbs on resources; RoleBindings attach to users/groups/ServiceAccounts. Use dedicated ServiceAccounts, disable automount tokens when not needed.

### 3.2 Network isolation

Default-deny NetworkPolicy then allow only required flows (requires CNI support, e.g. Calico/Cilium).

### 3.3 Workload hardening

Pod Security Admission (`restricted`), securityContext (runAsNonRoot, readOnlyRootFilesystem, drop capabilities, seccomp), Kyverno/OPA Gatekeeper policies, image signature verification.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create ServiceAccount + Role + RoleBinding; test with `kubectl auth can-i --as`.
2. [ ] Apply default-deny NetworkPolicy and allow only frontend->api->db.
3. [ ] Label namespace with `pod-security.kubernetes.io/enforce=restricted`; fix a failing pod.
4. [ ] Install Kyverno and add policy requiring non-root and disallowing `latest`.
5. [ ] Run `kubescape` or `kube-bench` and review findings.

## 5. Real-World Scenario

> A compromised pod tries to talk to the DB and read cluster secrets. Show how your controls stop it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl create sa deployer -n dev
kubectl create role pod-reader --verb=get,list --resource=pods -n dev
kubectl create rolebinding rb --role=pod-reader --serviceaccount=dev:deployer -n dev
kubectl auth can-i delete pods --as=system:serviceaccount:dev:deployer -n dev
kubectl label ns dev pod-security.kubernetes.io/enforce=restricted
securityContext: { runAsNonRoot: true, allowPrivilegeEscalation: false, readOnlyRootFilesystem: true, capabilities: { drop: [ALL] }, seccompProfile: { type: RuntimeDefault } }
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write an RBAC review checklist. | You can demonstrate, without notes: *apply least-privilege RBAC* — with evidence committed to `day-76/`. |
| 2 | Document default-deny pattern. | You can demonstrate, without notes: *isolate workloads with NetworkPolicies* — with evidence committed to `day-76/`. |
| 3 | Create Kyverno policy verifying cosign signatures (stretch). | You can demonstrate, without notes: *enforce Pod Security Standards and policies* — with evidence committed to `day-76/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Pod blocked by PSA | Adjust securityContext to meet `restricted`. |
| NetworkPolicy has no effect | CNI doesn't enforce policies (e.g. default kind CNI); use Calico/Cilium. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never bind cluster-admin to apps; avoid privileged/hostPath; scan manifests; restrict secrets access.
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

1. Role vs ClusterRole?
2. Why default-deny?
3. What is Pod Security Standard?
4. How do you test RBAC?
5. **Scenario:** A compromised pod tries to talk to the DB and read cluster secrets. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write least-privilege RBAC? | ☐ | ☐ | ☐ | ☐ |
| Can I isolate namespaces? | ☐ | ☐ | ☐ | ☐ |
| Can I enforce a policy? | ☐ | ☐ | ☐ | ☐ |
| Apply least-privilege RBAC | ☐ | ☐ | ☐ | ☐ |
| Isolate workloads with NetworkPolicies | ☐ | ☐ | ☐ | ☐ |
| Enforce Pod Security Standards and policies | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-76/` in your own repository:

```text
day-76/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-76
git add day-76/
git commit -m "day-76: kubernetes security"
git push -u origin day-76
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

[← Day 75](../day-75/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 77 →](../day-77/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-76/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
