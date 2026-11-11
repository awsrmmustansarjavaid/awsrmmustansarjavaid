# Day 84 — Incident Response, Postmortems, Backup/DR & Chaos Engineering

[← Day 83](../day-83/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 85 →](../day-85/README.md)

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

- [ ] Run an incident with clear roles and communication
- [ ] Write a blameless postmortem with action items
- [ ] Test backups and failure modes (Velero, chaos experiments)

## 2. Prerequisites

- Days 75-83.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Incident management

Roles: incident commander, communications lead, operations lead, scribe. Severity levels, status updates, mitigate first then root-cause. Use runbooks and ChatOps.

### 3.2 Postmortems

Timeline, impact, contributing factors (5 Whys/fault tree), what went well/badly, action items with owners and dates. Blameless.

### 3.3 DR and chaos

Backup is only real if restore is tested. Velero backs up K8s resources/PVs. Chaos experiments (Litmus/Chaos Mesh/pod-kill) validate resilience hypotheses in controlled conditions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Velero (MinIO local) and back up/restore a namespace.
2. [ ] Run a chaos experiment: delete random pods/kill a node under load; observe SLO impact.
3. [ ] Run a tabletop incident with timer and roles; keep a timeline.
4. [ ] Write a complete postmortem using template.
5. [ ] Create action items as GitHub issues with owners.

## 5. Real-World Scenario

> The primary database volume is corrupted at 14:05. Lead the response: communicate, restore from backup, verify integrity and write the postmortem.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
velero install --provider aws --plugins velero/velero-plugin-for-aws --bucket velero --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://minio:9000
velero backup create ns-dev --include-namespaces dev
kubectl delete ns dev && velero restore create --from-backup ns-dev
kubectl delete pod -l app=web --force
gh issue create --title "Action: add restore test" --label postmortem
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 84 -- Introduction to GitOps and ArgoCD

#### Task
You have deployed the AI-BankApp on EKS using `kubectl apply`. That works, but who ran the command? From which machine? Was the YAML they applied the same as what is in Git? If someone manually edits a Deployment in the cluster, how do you know?

GitOps solves all of this. Git becomes the single source of truth. A tool watches your Git repository and continuously ensures the cluster matches what is committed. That tool is ArgoCD.

The AI-BankApp project (https://github.com/TrainWithShubham/AI-BankApp-DevOps, branch `feat/gitops`) already has ArgoCD installed via Terraform and an Application manifest ready to go. Today you understand GitOps principles, explore ArgoCD, and deploy the AI-BankApp through ArgoCD for the first time.

---

#### Expected Output
- Understanding of GitOps principles and how they differ from traditional CI/CD
- ArgoCD running on your EKS cluster (installed by Terraform on Day 81)
- ArgoCD UI accessible and explored
- The AI-BankApp deployed and managed by ArgoCD
- A markdown file: `day-84-gitops-argocd.md`

---

#### Challenge Tasks

##### Task 1: Understand GitOps
Research and write notes on:

1. **What is GitOps?**
   - A deployment methodology where Git is the single source of truth for infrastructure and application state
   - An operator (ArgoCD) watches Git and ensures the live cluster matches the desired state in the repository
   - If someone changes something in the cluster manually, the operator reverts it (self-healing)
   - All changes go through Git -- pull requests, code review, audit trail

2. **GitOps vs traditional CI/CD:**

| Aspect | Traditional CI/CD | GitOps |
|--------|------------------|--------|
| Deployment trigger | CI pipeline runs `kubectl apply` | Git commit triggers sync |
| Source of truth | Pipeline scripts | Git repository |
| Drift detection | None | Continuous reconciliation |
| Rollback | Re-run pipeline or manual | `git revert` |
| Audit trail | Pipeline logs | Git history |
| Access control | Pipeline needs cluster credentials | Only ArgoCD has cluster access |
| Security | CI server has broad cluster access | Developers push to Git, never to the cluster |

3. **The AI-BankApp's GitOps flow:**
```
Developer pushes code to feat/gitops
         |
    [GitHub Actions CI]
    - Build Maven project
    - Run tests
    - Build Docker image
    - Push to DockerHub (tagged with git SHA)
    - Update image tag in k8s/bankapp-deployment.yml
    - Commit the change back to Git
         |
    [ArgoCD watches the repo]
    - Detects the new commit
    - Compares k8s/ manifests with live cluster
    - Syncs the change (rolling update)
    - BankApp pods restart with the new image
         |
    [Zero human intervention after git push]
```

4. **Four GitOps principles** (from OpenGitOps):
   - **Declarative** -- the desired state is expressed declaratively (Kubernetes YAML)
   - **Versioned and immutable** -- the desired state is stored in Git (versioned, auditable)
   - **Pulled automatically** -- agents (ArgoCD) pull the desired state, not pushed by CI
   - **Continuously reconciled** -- agents continuously compare desired vs actual and correct drift

---

##### Task 2: Access ArgoCD on Your EKS Cluster
ArgoCD was installed by Terraform on Day 81 (via `terraform/argocd.tf`). Verify it is running:

```bash
kubectl get pods -n argocd
```

You should see pods for: `argocd-server`, `argocd-repo-server`, `argocd-application-controller`, `argocd-applicationset-controller`, `argocd-redis`, and `argocd-dex-server`.

**Get the ArgoCD admin password:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

**Access the ArgoCD UI:**

Option A -- via LoadBalancer (if Terraform exposed it):
```bash
export ARGOCD_URL=$(kubectl get svc argocd-server -n argocd \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "ArgoCD URL: http://$ARGOCD_URL"
```

Option B -- via port-forward:
```bash
kubectl port-forward svc/argocd-server -n argocd 8443:443
```

Open `https://localhost:8443` (accept the self-signed certificate). Log in with:
- Username: `admin`
- Password: the value from the command above

**Install the ArgoCD CLI:**
```bash
# macOS
brew install argocd

# Linux
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd
sudo mv argocd /usr/local/bin/

# Verify
argocd version --client
```

Log in via CLI:
```bash
argocd login $ARGOCD_URL --username admin --password <your-password> --insecure
# or for port-forward:
argocd login localhost:8443 --username admin --password <your-password> --insecure
```

**Explore the ArgoCD UI:**
- **Applications** -- shows all managed applications (empty for now)
- **Settings > Repositories** -- Git repos ArgoCD can access
- **Settings > Clusters** -- Kubernetes clusters ArgoCD manages (your EKS cluster is the default `in-cluster`)

---

##### Task 3: Study the AI-BankApp's ArgoCD Application Manifest
Open `argocd/application.yml` from the AI-BankApp repo:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bankapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/TrainWithShubham/AI-BankApp-DevOps.git
    targetRevision: feat/gitops
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: bankapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
```

**Break down every field:**

| Field | Value | Purpose |
|-------|-------|---------|
| `source.repoURL` | The AI-BankApp GitHub repo | Where ArgoCD fetches manifests from |
| `source.targetRevision` | `feat/gitops` | Which Git branch to watch |
| `source.path` | `k8s` | The directory containing Kubernetes manifests |
| `destination.server` | `kubernetes.default.svc` | Deploy to the local cluster (in-cluster) |
| `destination.namespace` | `bankapp` | Target namespace for resources |
| `syncPolicy.automated` | enabled | ArgoCD syncs automatically on Git changes |
| `prune: true` | enabled | Delete resources removed from Git |
| `selfHeal: true` | enabled | Revert manual changes made directly to the cluster |
| `CreateNamespace=true` | enabled | Create the `bankapp` namespace if it does not exist |
| `ServerSideApply=true` | enabled | Use server-side apply for better conflict handling |

---

##### Task 4: Deploy the AI-BankApp via ArgoCD
First, make sure the BankApp is NOT already deployed (clean slate):
```bash
kubectl delete namespace bankapp 2>/dev/null
```

**Fork the AI-BankApp repo** -- you need your own copy to push changes later:
1. Go to https://github.com/TrainWithShubham/AI-BankApp-DevOps
2. Click "Fork" and create your fork
3. Note your fork URL: `https://github.com/<your-username>/AI-BankApp-DevOps.git`

**Create the ArgoCD Application** (update the repoURL to your fork):
```bash
cat <<EOF | kubectl apply -f -
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bankapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<your-username>/AI-BankApp-DevOps.git
    targetRevision: feat/gitops
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: bankapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
EOF
```

**Watch ArgoCD deploy the app:**
- In the ArgoCD UI, click on the `bankapp` application
- You will see a visual tree of all Kubernetes resources being created
- Each resource shows its sync and health status (green = healthy, yellow = progressing, red = degraded)

Or watch via CLI:
```bash
argocd app get bankapp
argocd app wait bankapp
```

Monitor pods coming up:
```bash
kubectl get pods -n bankapp -w
```

The deployment order is automatic -- ArgoCD applies all manifests from the `k8s/` directory. MySQL and Ollama start first, then the BankApp's init containers wait for dependencies.

After everything is healthy (5-10 minutes):
```bash
argocd app get bankapp
```

Status should show: `Health: Healthy`, `Sync: Synced`.

---

##### Task 5: Explore ArgoCD's Live View
Click on the `bankapp` application in the ArgoCD UI. You will see:

**The resource tree:**
```
bankapp (Application)
  |-- Namespace: bankapp
  |-- StorageClass: gp3
  |-- PVC: mysql-pvc (Bound)
  |-- PVC: ollama-pvc (Bound)
  |-- ConfigMap: bankapp-config
  |-- Secret: bankapp-secret
  |-- Deployment: mysql -> ReplicaSet -> Pod
  |-- Deployment: ollama -> ReplicaSet -> Pod
  |-- Deployment: bankapp -> ReplicaSet -> Pod (x4)
  |-- Service: mysql-service
  |-- Service: ollama-service
  |-- Service: bankapp-service
  |-- HPA: bankapp-hpa
```

**Click on any resource** to see its details:
- Pod logs (live streaming)
- Events
- YAML manifest (as applied to the cluster)
- Diff (what changed since last sync)

**App Details tab shows:**
- Source repo and path
- Last sync time and revision (git commit SHA)
- Sync status and health status
- History of all syncs

**Check the sync history:**
```bash
argocd app history bankapp
```

This shows every revision that was synced, when, and the commit SHA.

---

##### Task 6: Test Self-Healing
ArgoCD's `selfHeal: true` means it reverts any manual changes made directly to the cluster.

**Test 1 -- Manually scale the BankApp:**
```bash
kubectl scale deployment bankapp -n bankapp --replicas=1
```

Watch what happens:
```bash
kubectl get pods -n bankapp -w
```

Within 3-5 minutes, ArgoCD detects the drift and scales it back to the value defined in Git (4 replicas, or whatever the HPA decides). Check the ArgoCD UI -- you will see a sync event.

**Test 2 -- Manually delete a ConfigMap:**
```bash
kubectl delete configmap bankapp-config -n bankapp
```

ArgoCD will recreate it from Git within minutes.

**Test 3 -- Manually change an environment variable:**
```bash
kubectl edit configmap bankapp-config -n bankapp
# Change MYSQL_DATABASE to something wrong
```

ArgoCD will overwrite your change with the value from Git.

**This is the core GitOps promise:** The cluster always matches Git. Manual changes do not survive. All changes must go through Git (pull requests, review, merge).

**Document:** What happened during each self-healing test? How quickly did ArgoCD revert the changes?

---

#### Hints
- ArgoCD syncs every 3 minutes by default. You can trigger an immediate sync via the UI ("Sync" button) or CLI (`argocd app sync bankapp`)
- `selfHeal: true` requires `automated` sync policy -- without automation, ArgoCD only detects drift but does not fix it
- The ArgoCD Application resource itself lives in the `argocd` namespace, but it deploys resources to the `bankapp` namespace
- If the app shows `OutOfSync`, it means Git and the cluster differ. Click "Diff" to see exactly what changed
- ArgoCD only needs read access to your Git repo. It never pushes to Git -- that is the CI pipeline's job
- The `ServerSideApply=true` option avoids annotation conflicts when multiple tools manage the same resource
- ArgoCD tracks resources by label -- if you `kubectl apply` a resource directly (outside ArgoCD), it may conflict
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`) -- `argocd/application.yml`

---

#### Documentation
Create `day-84-gitops-argocd.md` with:
- GitOps principles in your own words
- GitOps vs traditional CI/CD comparison table
- The AI-BankApp's GitOps flow diagram
- Screenshot of the ArgoCD UI showing the bankapp Application resource tree
- The Application manifest with every field explained
- Screenshot of ArgoCD after self-healing (sync event showing drift was corrected)
- What `prune`, `selfHeal`, and `ServerSideApply` do

---

#### Submission
1. Add `day-84-gitops-argocd.md` to `2026/day-84/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the GitOps block today -- deployed the AI-BankApp through ArgoCD on EKS instead of kubectl apply. ArgoCD watches the Git repo and syncs changes automatically. Tested self-healing by manually scaling pods and deleting ConfigMaps -- ArgoCD reverted every change within minutes. The cluster now always matches Git. No more 'who ran kubectl on Friday night?'"

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create incident template and severity matrix. | You can demonstrate, without notes: *run an incident with clear roles and communication* — with evidence committed to `day-84/`. |
| 2 | Write DR plan with RTO/RPO. | You can demonstrate, without notes: *write a blameless postmortem with action items* — with evidence committed to `day-84/`. |
| 3 | Document chaos hypothesis for 3 experiments. | You can demonstrate, without notes: *test backups and failure modes (Velero, chaos experiments)* — with evidence committed to `day-84/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Restore incomplete | PV snapshots/volume plugin missing; test regularly. |
| Chaos causes outage | Limit blast radius; run in staging first; define abort conditions. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Treat security incidents with evidence preservation; test access to break-glass accounts and backups.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

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

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. Roles in an incident?
2. What makes a postmortem blameless?
3. Why test restores?
4. What is chaos engineering?
5. **Scenario:** The primary database volume is corrupted at 14:05. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run an incident? | ☐ | ☐ | ☐ | ☐ |
| Can I restore from backup? | ☐ | ☐ | ☐ | ☐ |
| Can I write a postmortem? | ☐ | ☐ | ☐ | ☐ |
| Run an incident with clear roles and communication | ☐ | ☐ | ☐ | ☐ |
| Write a blameless postmortem with action items | ☐ | ☐ | ☐ | ☐ |
| Test backups and failure modes (Velero, chaos experiments) | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-84/` in your own repository:

```text
day-84/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-84
git add day-84/
git commit -m "day-84: incident response, postmortems, backup/dr & chaos engineerin"
git push -u origin day-84
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Incident templates, postmortem, Velero backup/restore evidence, chaos notes.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 83](../day-83/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 85 →](../day-85/README.md)
