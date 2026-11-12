# Day 85 — Platform Engineering: Internal Developer Platforms & Golden Paths

[← Day 84](../day-84/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 86 →](../day-86/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain platform engineering and IDP components
- [ ] Create a golden-path service template
- [ ] Provide self-service infrastructure with Crossplane/Terraform modules

## 2. Prerequisites

- Days 47-84.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why platforms

As complexity grows, product teams shouldn't each learn every tool. Platform teams build paved roads: self-service, secure by default, documented, measured by developer experience and adoption (treat the platform as a product).

### 3.2 IDP building blocks

Service catalogue/portal (Backstage), templates/scaffolding, CI/CD, GitOps, IaC modules/Crossplane compositions, secrets, observability defaults, policy guardrails, docs.

### 3.3 Metrics

Onboarding time, lead time, platform adoption, developer satisfaction, DORA, cost per service.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Design a golden path: 'new service in 15 minutes' with repo, pipeline, chart, dashboards and SLO.
2. [ ] Create a cookiecutter/Backstage-style template repo with CI, Dockerfile, Helm chart and Argo app manifest.
3. [ ] Add a simple self-service workflow: GitHub issue form -> workflow -> creates repo from template.
4. [ ] Optionally try Crossplane: `Claim` for a database composed from cloud resources.
5. [ ] Write a platform README and `service.yaml` catalogue entry.

## 5. Real-World Scenario

> New developers take 3 weeks to ship a first service. Reduce to 1 day via templates, self-service and docs.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gh repo create team/new-svc --template USER/golden-path-python --private
cookiecutter gh:USER/golden-path-python
catalog-info.yaml: apiVersion: backstage.io/v1alpha1 kind: Component spec: { type: service, lifecycle: production, owner: team-a }
gh workflow run new-service.yml -f name=orders -f team=team-a
kubectl apply -f database-claim.yaml   # Crossplane example
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 85 -- ArgoCD Deep Dive: Sync Strategies, Rollbacks, and Multi-App Management

#### Task
Yesterday you deployed the AI-BankApp via ArgoCD and tested self-healing. Today you go deeper -- understanding sync waves, resource hooks, manual vs automated sync strategies, rollbacks, the App of Apps pattern for managing multiple applications, and ArgoCD notifications.

These are the patterns teams use when managing production clusters with dozens of applications.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Expected Output
- Understanding of sync waves and resource ordering in ArgoCD
- Manual sync with preview and selective sync demonstrated
- ArgoCD rollback to a previous revision
- App of Apps pattern implemented for multi-app management
- ArgoCD notifications configured
- A markdown file: `day-85-argocd-deep-dive.md`

---

#### Challenge Tasks

##### Task 1: Understand Sync Strategies
ArgoCD offers multiple ways to sync:

**Automated sync** (what the AI-BankApp uses):
```yaml
syncPolicy:
  automated:
    prune: true      # Delete resources removed from Git
    selfHeal: true   # Revert manual cluster changes
```
- Every Git change syncs automatically within 3 minutes
- No human approval needed
- Good for dev/staging environments

**Manual sync** (for production):
```yaml
syncPolicy: {}   # No automated section
```
- ArgoCD detects drift but does NOT auto-correct
- A human must click "Sync" or run `argocd app sync`
- Good for production where you want a review gate

**Try switching to manual sync:**
```bash
argocd app set bankapp --sync-policy none
```

Now make a change in Git (edit `k8s/configmap.yml` in your fork -- change `APP_NAME` or add a new key). Push the commit.

Wait 3 minutes and check:
```bash
argocd app get bankapp
```

The status will show `OutOfSync` but ArgoCD will NOT apply the change. You can see exactly what differs:
```bash
argocd app diff bankapp
```

**Preview before syncing:**
```bash
# Dry run -- show what would change
argocd app sync bankapp --dry-run

# Sync for real
argocd app sync bankapp
```

In the UI, clicking "Sync" shows a preview dialog listing all resources that will change.

**Switch back to automated:**
```bash
argocd app set bankapp --sync-policy automated --self-heal --auto-prune
```

---

##### Task 2: Sync Waves and Resource Ordering
The AI-BankApp has dependencies: MySQL must be running before the BankApp starts. ArgoCD handles this with **sync waves** -- annotations that control the order of resource creation.

**Add sync wave annotations to the AI-BankApp manifests in your fork:**

Edit `k8s/namespace.yml`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: bankapp
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

Edit `k8s/pv.yml` (StorageClass):
```yaml
metadata:
  name: gp3
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

Edit `k8s/pvc.yml` (both PVCs):
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

Edit `k8s/configmap.yml` and `k8s/secrets.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

Edit `k8s/mysql-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/ollama-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/service.yml` (all three services):
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/bankapp-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

Edit `k8s/hpa.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "2"
```

**The sync order becomes:**
```
Wave -2: Namespace, StorageClass          (infrastructure)
Wave -1: PVCs, ConfigMap, Secret          (configuration)
Wave  0: MySQL, Ollama, Services          (databases and networking)
Wave  1: BankApp Deployment               (application)
Wave  2: HPA                              (scaling)
```

ArgoCD processes each wave in order. Resources in the same wave sync in parallel. ArgoCD waits for each wave to be healthy before moving to the next.

Commit and push these changes. ArgoCD will re-sync and you will see the ordered deployment in the UI.

---

##### Task 3: ArgoCD Rollbacks
ArgoCD tracks every sync as a revision. You can rollback to any previous state.

**Check the sync history:**
```bash
argocd app history bankapp
```

Output:
```
ID  DATE                 REVISION
1   2026-04-10 10:00:00  abc1234
2   2026-04-10 10:15:00  def5678   (sync wave annotations)
```

**Rollback to a previous revision:**

Via CLI:
```bash
argocd app rollback bankapp 1
```

Via UI: Click the application > History > select a revision > "Rollback".

After rollback:
```bash
argocd app get bankapp
```

The status will show `OutOfSync` because the cluster now matches an older Git commit, not the latest.

**Important:** Rollback is a temporary fix. It does not change Git. The proper GitOps rollback is:
```bash
# In your fork
git revert HEAD
git push
```

This creates a new commit that undoes the last change. ArgoCD syncs the revert and the cluster is updated. The Git history shows the full audit trail: deploy, then revert.

**Document:** What is the difference between ArgoCD rollback and `git revert`? Which is the GitOps-correct approach?

---

##### Task 4: App of Apps Pattern
In production, you do not manage one application -- you manage dozens. The **App of Apps** pattern uses one parent ArgoCD Application that creates child Applications.

Create a directory for the pattern:
```bash
mkdir -p argocd-apps/
```

Create `argocd-apps/bankapp.yaml` (the BankApp application):
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bankapp
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
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
```

Create `argocd-apps/monitoring.yaml` (Prometheus + Grafana):
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: monitoring
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://prometheus-community.github.io/helm-charts
    chart: kube-prometheus-stack
    targetRevision: "65.*"
    helm:
      values: |
        grafana:
          adminPassword: admin123
        prometheus:
          prometheusSpec:
            retention: 3d
            resources:
              requests:
                memory: 256Mi
                cpu: 100m
  destination:
    server: https://kubernetes.default.svc
    namespace: monitoring
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
```

Create `argocd-apps/envoy-gateway.yaml`:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: envoy-gateway
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: docker.io/envoyproxy
    chart: gateway-helm
    targetRevision: "v1.4.*"
  destination:
    server: https://kubernetes.default.svc
    namespace: envoy-gateway-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

**Create the parent Application** that manages all child apps:
```yaml
# argocd-apps/root-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<your-username>/AI-BankApp-DevOps.git
    targetRevision: feat/gitops
    path: argocd-apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Push the `argocd-apps/` directory to your fork and apply the root app:
```bash
kubectl apply -f argocd-apps/root-app.yaml
```

ArgoCD will:
1. Read the `argocd-apps/` directory from Git
2. Find `bankapp.yaml`, `monitoring.yaml`, and `envoy-gateway.yaml`
3. Create three child Applications
4. Each child Application syncs independently

**In the ArgoCD UI,** you now see 4 applications: `root-app`, `bankapp`, `monitoring`, `envoy-gateway`. Adding a new app to the cluster is as simple as adding a new YAML file to the `argocd-apps/` directory.

```bash
argocd app list
```

---

##### Task 5: ArgoCD Notifications
Get notified when deployments succeed, fail, or drift.

Install ArgoCD Notifications (included in modern ArgoCD versions):
```bash
# Check if notifications controller is running
kubectl get pods -n argocd -l app.kubernetes.io/component=notifications-controller
```

**Configure a Slack or webhook notification** (using a generic webhook example):

Create a notification config:
```bash
kubectl apply -n argocd -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  trigger.on-sync-succeeded: |
    - when: app.status.operationState.phase in ['Succeeded']
      send: [app-sync-succeeded]
  trigger.on-sync-failed: |
    - when: app.status.operationState.phase in ['Error', 'Failed']
      send: [app-sync-failed]
  trigger.on-health-degraded: |
    - when: app.status.health.status == 'Degraded'
      send: [app-health-degraded]
  template.app-sync-succeeded: |
    message: "Application {{.app.metadata.name}} sync succeeded. Revision: {{.app.status.sync.revision}}"
  template.app-sync-failed: |
    message: "Application {{.app.metadata.name}} sync FAILED! Check ArgoCD for details."
  template.app-health-degraded: |
    message: "Application {{.app.metadata.name}} health is DEGRADED. Investigate immediately."
EOF
```

**Subscribe an application to notifications:**
```bash
kubectl annotate application bankapp -n argocd \
  notifications.argoproj.io/subscribe.on-sync-succeeded.webhook="" \
  notifications.argoproj.io/subscribe.on-sync-failed.webhook="" \
  notifications.argoproj.io/subscribe.on-health-degraded.webhook=""
```

For Slack integration, you would add a Slack service to the ConfigMap with your webhook URL. The pattern is the same -- triggers fire on events, templates format the message, services deliver it.

**View notification history:**
```bash
kubectl get applications bankapp -n argocd -o jsonpath='{.status.operationState.message}'
```

---

##### Task 6: ArgoCD Projects and RBAC
In production, you do not give every team access to every application. ArgoCD **Projects** provide multi-tenancy.

Create a project for the BankApp team:
```bash
argocd proj create bankapp-team \
  --description "AI-BankApp team project" \
  --src "https://github.com/<your-username>/AI-BankApp-DevOps.git" \
  --dest "https://kubernetes.default.svc,bankapp" \
  --dest "https://kubernetes.default.svc,monitoring"
```

This project:
- Can only source from the AI-BankApp repo
- Can only deploy to the `bankapp` and `monitoring` namespaces
- Cannot deploy to `kube-system`, `argocd`, or other namespaces

Move the bankapp Application to this project:
```bash
argocd app set bankapp --project bankapp-team
```

**Verify restrictions work:**
```bash
# This should fail -- cert-manager namespace is not allowed
argocd proj add-destination bankapp-team https://kubernetes.default.svc kube-system 2>&1 || echo "Restricted!"
```

**RBAC policies** (in `argocd-rbac-cm` ConfigMap):
```yaml
policy.csv: |
  p, role:bankapp-dev, applications, get, bankapp-team/*, allow
  p, role:bankapp-dev, applications, sync, bankapp-team/*, allow
  p, role:bankapp-dev, applications, rollback, bankapp-team/*, deny
  g, bankapp-developers, role:bankapp-dev
```

This gives the `bankapp-developers` group permission to view and sync but NOT rollback. Rollback requires a senior team member.

**Document:** How do Projects and RBAC prevent one team from accidentally affecting another team's applications?

---

#### Hints
- Sync waves use integers -- negative numbers run first, then zero, then positive. Resources in the same wave sync in parallel
- ArgoCD rollback changes the cluster but NOT Git -- always follow up with `git revert` for a proper GitOps rollback
- The App of Apps pattern is the standard for managing multiple applications. The parent app watches a directory of Application manifests
- ArgoCD can deploy from Git repos (raw manifests), Helm charts (with values), and Kustomize overlays -- all in the same cluster
- `finalizers: resources-finalizer.argocd.argoproj.io` ensures ArgoCD deletes the Kubernetes resources when you delete the Application
- The default sync interval is 3 minutes. Change it with `--app-resync` flag on the application controller, or set `timeout.reconciliation` in `argocd-cm`
- For immediate sync after a push, configure GitHub webhooks to notify ArgoCD directly
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-85-argocd-deep-dive.md` with:
- Automated vs manual sync comparison and when to use each
- Sync waves table showing the AI-BankApp deployment order
- Screenshot of ArgoCD UI during a sync wave deployment
- How ArgoCD rollback works (vs `git revert`)
- App of Apps architecture diagram
- Screenshot of ArgoCD showing multiple applications managed by the root app
- Notification trigger and template configuration
- How Projects and RBAC restrict access

---

#### Submission
1. Add `day-85-argocd-deep-dive.md` to `2026/day-85/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Deep dive into ArgoCD today -- sync waves for ordered deployments, automated vs manual sync strategies, rollbacks, the App of Apps pattern for managing multiple applications, and RBAC for multi-team access control. GitOps is not just 'deploy from Git' -- it is a complete operational framework for managing production Kubernetes."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw IDP architecture. | You can demonstrate, without notes: *explain platform engineering and IDP components* — with evidence committed to `day-85/`. |
| 2 | Write 'Platform as a product' roadmap with 3 quarters. | You can demonstrate, without notes: *create a golden-path service template* — with evidence committed to `day-85/`. |
| 3 | Define success metrics and measure baseline. | You can demonstrate, without notes: *provide self-service infrastructure with Crossplane/Terraform modules* — with evidence committed to `day-85/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Teams ignore the platform | Too rigid or poorly documented; talk to users, reduce friction. |
| Template drift | Version templates and automate updates (Renovate/template sync). |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Bake security defaults into templates (non-root, scanning, signed images, least-privilege IAM).
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

1. What is platform engineering?
2. What is a golden path?
3. How do you measure a platform?
4. DevOps vs platform engineering?
5. **Scenario:** New developers take 3 weeks to ship a first service. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I scaffold a service quickly? | ☐ | ☐ | ☐ | ☐ |
| Can I explain golden paths? | ☐ | ☐ | ☐ | ☐ |
| Can I define platform KPIs? | ☐ | ☐ | ☐ | ☐ |
| Explain platform engineering and IDP components | ☐ | ☐ | ☐ | ☐ |
| Create a golden-path service template | ☐ | ☐ | ☐ | ☐ |
| Provide self-service infrastructure with Crossplane/Terraform modules | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-85/` in your own repository:

```text
day-85/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-85
git add day-85/
git commit -m "day-85: platform engineering"
git push -u origin day-85
gh pr create --fill   # review your own PR, then merge
```

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

## 18. Challenge Notes — Day 85: High Availability Setup on AWS

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 85** of the DevOps 90-Day Challenge!
We touched on HA before, but today we implement a full **Multi-Tier HA Architecture**. This is the standard architecture for any serious application.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Architect a **3-Tier Application** (Web, App, DB).
* Deploy across **Multiple Availability Zones (Multi-AZ)**.
* Configure **Application Load Balancers (ALB)** and **Auto Scaling Groups (ASG)**.
* Set up **RDS Multi-AZ** for database failover.

---

#### Tools Used

* **AWS VPC**
* **AWS EC2 / ASG**
* **AWS ALB**
* **Amazon RDS**

---

#### Key Concepts

##### 1. The 3-Tier Architecture
*   **Public Subnet**: Load Balancer (Internet facing).
*   **Private Subnet 1**: Web/App Servers (ASG). No direct internet access.
*   **Private Subnet 2**: Database (RDS). Highly secured.

##### 2. Multi-AZ Redundancy
Deploying 2 Web Servers: One in `us-east-1a`, one in `us-east-1b`. If AZ 'a' burns down, AZ 'b' keeps running.
The Load Balancer health checks will automatically stop sending traffic to the dead AZ.

##### 3. Database HA
RDS Primary is in AZ 'a'. Standby is in AZ 'b'. Data is synchronously replicated. If Primary fails, AWS flips the DNS to Standby automatically (Failover).

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Security Groups** | Chaining SG: LB allows port 80 -> Web allows port 80 from LB -> DB allows port 3306 from Web. |
| **NAT Gateway** | Allowing private servers to download yum updates without exposing them to incoming internet traffic. |
| **Session Stickiness** | Configuring ALB to keep a user on the same server (if needed) or using Redis for session storage (Better). |

---

#### Bonus (Extra Learning)

*   Simulate an AZ failure by modifying the NACL to block all traffic to Subnet A.
*   Move static assets to **CloudFront** (CDN) to offload the web servers.

---

#### Congratulations!

You have built a robust, enterprise-grade architecture. This is exactly how companies like Netflix and Amazon architect for uptime.

---

#### Try These Next

*   Add **ElastiCache** (Redis) to the architecture.
*   Automate this entire setup with Terraform modules.

## 19. Cohort Practice — Day 85: ArgoCD Deep Dive: Sync Strategies, Rollbacks, and Multi-App Management

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Yesterday you deployed the AI-BankApp via ArgoCD and tested self-healing. Today you go deeper -- understanding sync waves, resource hooks, manual vs automated sync strategies, rollbacks, the App of Apps pattern for managing multiple applications, and ArgoCD notifications.

These are the patterns teams use when managing production clusters with dozens of applications.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Expected Output
- Understanding of sync waves and resource ordering in ArgoCD
- Manual sync with preview and selective sync demonstrated
- ArgoCD rollback to a previous revision
- App of Apps pattern implemented for multi-app management
- ArgoCD notifications configured
- A markdown file: `day-85-argocd-deep-dive.md`


---

#### Challenge Tasks

##### Task 1: Understand Sync Strategies
ArgoCD offers multiple ways to sync:


**Automated sync** (what the AI-BankApp uses):
```yaml
syncPolicy:
  automated:
    prune: true      # Delete resources removed from Git
    selfHeal: true   # Revert manual cluster changes
```
- Every Git change syncs automatically within 3 minutes
- No human approval needed
- Good for dev/staging environments

**Manual sync** (for production):
```yaml
syncPolicy: {}   # No automated section
```
- ArgoCD detects drift but does NOT auto-correct
- A human must click "Sync" or run `argocd app sync`
- Good for production where you want a review gate

**Try switching to manual sync:**
```bash
argocd app set bankapp --sync-policy none
```

Now make a change in Git (edit `k8s/configmap.yml` in your fork -- change `APP_NAME` or add a new key). Push the commit.

Wait 3 minutes and check:
```bash
argocd app get bankapp
```

The status will show `OutOfSync` but ArgoCD will NOT apply the change. You can see exactly what differs:
```bash
argocd app diff bankapp
```

**Preview before syncing:**
```bash
# Dry run -- show what would change
argocd app sync bankapp --dry-run

# Sync for real
argocd app sync bankapp
```

In the UI, clicking "Sync" shows a preview dialog listing all resources that will change.

**Switch back to automated:**
```bash
argocd app set bankapp --sync-policy automated --self-heal --auto-prune
```

---

##### Task 2: Sync Waves and Resource Ordering
The AI-BankApp has dependencies: MySQL must be running before the BankApp starts. ArgoCD handles this with **sync waves** -- annotations that control the order of resource creation.

**Add sync wave annotations to the AI-BankApp manifests in your fork:**

Edit `k8s/namespace.yml`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: bankapp
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

Edit `k8s/pv.yml` (StorageClass):
```yaml
metadata:
  name: gp3
  annotations:
    argocd.argoproj.io/sync-wave: "-2"
```

Edit `k8s/pvc.yml` (both PVCs):
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

Edit `k8s/configmap.yml` and `k8s/secrets.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
```

Edit `k8s/mysql-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/ollama-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/service.yml` (all three services):
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "0"
```

Edit `k8s/bankapp-deployment.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

Edit `k8s/hpa.yml`:
```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "2"
```

**The sync order becomes:**
```
Wave -2: Namespace, StorageClass          (infrastructure)
Wave -1: PVCs, ConfigMap, Secret          (configuration)
Wave  0: MySQL, Ollama, Services          (databases and networking)
Wave  1: BankApp Deployment               (application)
Wave  2: HPA                              (scaling)
```

ArgoCD processes each wave in order. Resources in the same wave sync in parallel. ArgoCD waits for each wave to be healthy before moving to the next.

Commit and push these changes. ArgoCD will re-sync and you will see the ordered deployment in the UI.

---

##### Task 3: ArgoCD Rollbacks
ArgoCD tracks every sync as a revision. You can rollback to any previous state.

**Check the sync history:**
```bash
argocd app history bankapp
```

Output:
```
ID  DATE                 REVISION
1   2026-04-10 10:00:00  abc1234
2   2026-04-10 10:15:00  def5678   (sync wave annotations)
```

**Rollback to a previous revision:**

Via CLI:
```bash
argocd app rollback bankapp 1
```

Via UI: Click the application > History > select a revision > "Rollback".

After rollback:
```bash
argocd app get bankapp
```

The status will show `OutOfSync` because the cluster now matches an older Git commit, not the latest.

**Important:** Rollback is a temporary fix. It does not change Git. The proper GitOps rollback is:
```bash
# In your fork
git revert HEAD
git push
```

This creates a new commit that undoes the last change. ArgoCD syncs the revert and the cluster is updated. The Git history shows the full audit trail: deploy, then revert.

**Document:** What is the difference between ArgoCD rollback and `git revert`? Which is the GitOps-correct approach?

---

##### Task 4: App of Apps Pattern
In production, you do not manage one application -- you manage dozens. The **App of Apps** pattern uses one parent ArgoCD Application that creates child Applications.

Create a directory for the pattern:
```bash
mkdir -p argocd-apps/
```

Create `argocd-apps/bankapp.yaml` (the BankApp application):
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bankapp
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
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
```

Create `argocd-apps/monitoring.yaml` (Prometheus + Grafana):
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: monitoring
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://prometheus-community.github.io/helm-charts
    chart: kube-prometheus-stack
    targetRevision: "65.*"
    helm:
      values: |
        grafana:
          adminPassword: admin123
        prometheus:
          prometheusSpec:
            retention: 3d
            resources:
              requests:
                memory: 256Mi
                cpu: 100m
  destination:
    server: https://kubernetes.default.svc
    namespace: monitoring
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
```

Create `argocd-apps/envoy-gateway.yaml`:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: envoy-gateway
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: docker.io/envoyproxy
    chart: gateway-helm
    targetRevision: "v1.4.*"
  destination:
    server: https://kubernetes.default.svc
    namespace: envoy-gateway-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

**Create the parent Application** that manages all child apps:
```yaml
# argocd-apps/root-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<your-username>/AI-BankApp-DevOps.git
    targetRevision: feat/gitops
    path: argocd-apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Push the `argocd-apps/` directory to your fork and apply the root app:
```bash
kubectl apply -f argocd-apps/root-app.yaml
```

ArgoCD will:
1. Read the `argocd-apps/` directory from Git
2. Find `bankapp.yaml`, `monitoring.yaml`, and `envoy-gateway.yaml`
3. Create three child Applications
4. Each child Application syncs independently

**In the ArgoCD UI,** you now see 4 applications: `root-app`, `bankapp`, `monitoring`, `envoy-gateway`. Adding a new app to the cluster is as simple as adding a new YAML file to the `argocd-apps/` directory.

```bash
argocd app list
```

---

##### Task 5: ArgoCD Notifications
Get notified when deployments succeed, fail, or drift.

Install ArgoCD Notifications (included in modern ArgoCD versions):
```bash
# Check if notifications controller is running
kubectl get pods -n argocd -l app.kubernetes.io/component=notifications-controller
```

**Configure a Slack or webhook notification** (using a generic webhook example):

Create a notification config:
```bash
kubectl apply -n argocd -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  trigger.on-sync-succeeded: |
    - when: app.status.operationState.phase in ['Succeeded']
      send: [app-sync-succeeded]
  trigger.on-sync-failed: |
    - when: app.status.operationState.phase in ['Error', 'Failed']
      send: [app-sync-failed]
  trigger.on-health-degraded: |
    - when: app.status.health.status == 'Degraded'
      send: [app-health-degraded]
  template.app-sync-succeeded: |
    message: "Application {{.app.metadata.name}} sync succeeded. Revision: {{.app.status.sync.revision}}"
  template.app-sync-failed: |
    message: "Application {{.app.metadata.name}} sync FAILED! Check ArgoCD for details."
  template.app-health-degraded: |
    message: "Application {{.app.metadata.name}} health is DEGRADED. Investigate immediately."
EOF
```

**Subscribe an application to notifications:**
```bash
kubectl annotate application bankapp -n argocd \
  notifications.argoproj.io/subscribe.on-sync-succeeded.webhook="" \
  notifications.argoproj.io/subscribe.on-sync-failed.webhook="" \
  notifications.argoproj.io/subscribe.on-health-degraded.webhook=""
```

For Slack integration, you would add a Slack service to the ConfigMap with your webhook URL. The pattern is the same -- triggers fire on events, templates format the message, services deliver it.

**View notification history:**
```bash
kubectl get applications bankapp -n argocd -o jsonpath='{.status.operationState.message}'
```

---

##### Task 6: ArgoCD Projects and RBAC
In production, you do not give every team access to every application. ArgoCD **Projects** provide multi-tenancy.

Create a project for the BankApp team:
```bash
argocd proj create bankapp-team \
  --description "AI-BankApp team project" \
  --src "https://github.com/<your-username>/AI-BankApp-DevOps.git" \
  --dest "https://kubernetes.default.svc,bankapp" \
  --dest "https://kubernetes.default.svc,monitoring"
```

This project:
- Can only source from the AI-BankApp repo
- Can only deploy to the `bankapp` and `monitoring` namespaces
- Cannot deploy to `kube-system`, `argocd`, or other namespaces

Move the bankapp Application to this project:
```bash
argocd app set bankapp --project bankapp-team
```

**Verify restrictions work:**
```bash
# This should fail -- cert-manager namespace is not allowed
argocd proj add-destination bankapp-team https://kubernetes.default.svc kube-system 2>&1 || echo "Restricted!"
```

**RBAC policies** (in `argocd-rbac-cm` ConfigMap):
```yaml
policy.csv: |
  p, role:bankapp-dev, applications, get, bankapp-team/*, allow
  p, role:bankapp-dev, applications, sync, bankapp-team/*, allow
  p, role:bankapp-dev, applications, rollback, bankapp-team/*, deny
  g, bankapp-developers, role:bankapp-dev
```

This gives the `bankapp-developers` group permission to view and sync but NOT rollback. Rollback requires a senior team member.

**Document:** How do Projects and RBAC prevent one team from accidentally affecting another team's applications?

---

#### Hints
- Sync waves use integers -- negative numbers run first, then zero, then positive. Resources in the same wave sync in parallel
- ArgoCD rollback changes the cluster but NOT Git -- always follow up with `git revert` for a proper GitOps rollback
- The App of Apps pattern is the standard for managing multiple applications. The parent app watches a directory of Application manifests
- ArgoCD can deploy from Git repos (raw manifests), Helm charts (with values), and Kustomize overlays -- all in the same cluster
- `finalizers: resources-finalizer.argocd.argoproj.io` ensures ArgoCD deletes the Kubernetes resources when you delete the Application
- The default sync interval is 3 minutes. Change it with `--app-resync` flag on the application controller, or set `timeout.reconciliation` in `argocd-cm`
- For immediate sync after a push, configure GitHub webhooks to notify ArgoCD directly
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-85-argocd-deep-dive.md` with:
- Automated vs manual sync comparison and when to use each
- Sync waves table showing the AI-BankApp deployment order
- Screenshot of ArgoCD UI during a sync wave deployment
- How ArgoCD rollback works (vs `git revert`)
- App of Apps architecture diagram
- Screenshot of ArgoCD showing multiple applications managed by the root app
- Notification trigger and template configuration
- How Projects and RBAC restrict access

---

#### Submission
1. Add `day-85-argocd-deep-dive.md` to `2026/day-85/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Deep dive into ArgoCD today -- sync waves for ordered deployments, automated vs manual sync strategies, rollbacks, the App of Apps pattern for managing multiple applications, and RBAC for multi-team access control. GitOps is not just 'deploy from Git' -- it is a complete operational framework for managing production Kubernetes."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 85: Chaos Engineering (Pod Delete)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Chaos Engineering (Pod Delete)**.

#### 🎯 Learning Goals
- Understand the fundamentals of Chaos Engineering (Pod Delete).
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day85: Chaos Engineering (Pod Delete)`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 84](../day-84/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 86 →](../day-86/README.md)
