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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 78 -- Introduction to Helm and Chart Basics

#### Task
You have deployed applications with raw Kubernetes manifests -- writing Deployments, Services, ConfigMaps, and Secrets by hand. The AI-BankApp project (https://github.com/TrainWithShubham/AI-BankApp-DevOps, branch `feat/gitops`) has 12 YAML files in its `k8s/` directory. Managing those across dev, staging, and production with slightly different configurations is painful.

Helm is the package manager for Kubernetes. It lets you template, package, version, and deploy Kubernetes applications as reusable units called charts. Today you install Helm, understand chart structure, and deploy your first applications using community charts -- including MySQL, which the AI-BankApp depends on.

---

#### Expected Output
- Helm installed and connected to your Kubernetes cluster
- At least two applications deployed using Helm from public chart repositories
- Understanding of chart structure: templates, values, Chart.yaml
- Helm release management: install, upgrade, rollback, uninstall
- A markdown file: `day-78-helm-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand Helm Concepts
Research and write notes on:

1. **What is Helm?**
   - A package manager for Kubernetes (like apt for Ubuntu or yum for RHEL)
   - Packages Kubernetes manifests into reusable, versioned units called **charts**
   - Supports templating -- one chart, many environments

2. **Core concepts:**
   - **Chart** -- a collection of files that describe a set of Kubernetes resources (Deployment + Service + ConfigMap + Secret = one chart)
   - **Release** -- a running instance of a chart in a cluster. You can install the same chart multiple times with different release names
   - **Repository** -- a place where charts are stored and shared (like DockerHub for images)
   - **Values** -- configuration that customizes a chart for each deployment (replicas, image tag, resource limits)

3. **Why Helm over raw manifests?**
   - Look at the AI-BankApp's `k8s/` directory -- 12 separate YAML files. To change the image tag, you edit `bankapp-deployment.yml`. To switch environments, you manually update ConfigMaps and Secrets. Helm solves this:
   - Templating: one chart serves dev, staging, and prod with different values
   - Versioning: charts have version numbers, you can rollback to previous versions
   - Dependencies: a chart can depend on other charts (your app chart depends on a MySQL chart)
   - Community: thousands of pre-built charts for common software (MySQL, Redis, Prometheus, ArgoCD)

---

##### Task 2: Install Helm and Explore the AI-BankApp
You need a running Kubernetes cluster. Use any of these:
- **Kind** (recommended for this block): Use the AI-BankApp's Kind config
- **Minikube**: `minikube start`
- **Docker Desktop Kubernetes**: enable in settings

**Set up a Kind cluster using the AI-BankApp's config:**
```bash
git clone -b feat/gitops https://github.com/TrainWithShubham/AI-BankApp-DevOps.git
cd AI-BankApp-DevOps

kind create cluster --config setup-k8s/kind-config.yml
```

This creates a cluster with 1 control plane and 2 worker nodes.

**Install Helm:**
```bash
# macOS
brew install helm

# Linux (script)
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

Confirm Helm can talk to your cluster:
```bash
kubectl cluster-info
helm list
```

**Explore the raw manifests you will eventually replace with Helm:**
```bash
ls k8s/
```

```
bankapp-deployment.yml   configmap.yml   gateway.yml   mysql-deployment.yml
namespace.yml   ollama-deployment.yml   pv.yml   pvc.yml   secrets.yml
service.yml   hpa.yml   cert-manager.yml
```

12 files -- Deployments, Services, ConfigMaps, Secrets, PVCs, HPA, and more. All hardcoded values. On Day 79, you will convert these into a Helm chart.

---

##### Task 3: Deploy MySQL Using a Helm Chart
The AI-BankApp needs MySQL. Instead of applying raw YAML like `k8s/mysql-deployment.yml`, deploy it with Helm.

Add the Bitnami chart repository:
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

Search for MySQL:
```bash
helm search repo bitnami/mysql
```

**Deploy MySQL with the same config the AI-BankApp expects:**
```bash
helm install bankapp-mysql bitnami/mysql \
  --set auth.rootPassword=Test@123 \
  --set auth.database=bankappdb \
  --set primary.resources.requests.memory=256Mi \
  --set primary.resources.requests.cpu=250m \
  --set primary.resources.limits.memory=512Mi \
  --set primary.resources.limits.cpu=500m \
  --set primary.persistence.size=5Gi
```

Compare this single command to the raw manifest approach which needs `mysql-deployment.yml` + `secrets.yml` + `pvc.yml` + `pv.yml` + `service.yml`. Helm handles all of it.

Check what was created:
```bash
helm list
kubectl get all -l app.kubernetes.io/instance=bankapp-mysql
kubectl get pvc -l app.kubernetes.io/instance=bankapp-mysql
kubectl get secret -l app.kubernetes.io/instance=bankapp-mysql
```

Verify MySQL is running:
```bash
kubectl exec -it bankapp-mysql-0 -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"
```

You should see `bankappdb` in the output.

---

##### Task 4: Customize a Deployment with Values Files
`--set` works for quick overrides, but real projects use values files.

Create `mysql-values.yaml`:
```yaml
auth:
  rootPassword: Test@123
  database: bankappdb
primary:
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  persistence:
    size: 5Gi
    storageClass: ""
metrics:
  enabled: true
  serviceMonitor:
    enabled: false
```

Deploy with the values file:
```bash
helm install bankapp-mysql-v2 bitnami/mysql -f mysql-values.yaml
```

**To see all configurable values for a chart:**
```bash
helm show values bitnami/mysql | head -80
```

This is your reference for every knob you can turn. Notice how the chart supports metrics, replication, custom init scripts, and dozens more options -- all through values.

**Clean up the second release:**
```bash
helm uninstall bankapp-mysql-v2
```

---

##### Task 5: Manage Releases -- Upgrade, Rollback, Uninstall
Helm tracks every change as a **revision**. This lets you upgrade and rollback safely.

**Upgrade MySQL to enable metrics:**
```bash
helm upgrade bankapp-mysql bitnami/mysql \
  --set auth.rootPassword=Test@123 \
  --set auth.database=bankappdb \
  --set metrics.enabled=true
```

Check the revision history:
```bash
helm history bankapp-mysql
```

You should see revision 1 (original) and revision 2 (metrics enabled).

**Rollback to the previous version:**
```bash
helm rollback bankapp-mysql 1
```

Check history again:
```bash
helm history bankapp-mysql
```

Revision 3 appears -- a rollback to revision 1.

**Compare this to raw manifests:** With `kubectl apply`, there is no built-in rollback. You would have to `git revert` or manually re-apply old YAML. Helm gives you `helm rollback` out of the box.

---

##### Task 6: Explore a Chart's Structure
Before building your own chart for the AI-BankApp tomorrow, understand what is inside a Helm chart.

Pull the MySQL chart locally:
```bash
helm pull bitnami/mysql --untar
ls mysql/
```

You will see:
```
mysql/
  Chart.yaml              # Chart metadata (name, version, description)
  values.yaml             # Default configuration values
  charts/                 # Subchart dependencies
  templates/              # Kubernetes manifest templates
    primary/
      statefulset.yaml    # StatefulSet template with Go template syntax
      svc.yaml            # Service template
    _helpers.tpl          # Reusable template helpers
    NOTES.txt             # Post-install message shown to the user
    secrets.yaml          # Secret template
```

Open `templates/primary/statefulset.yaml` and look for Go template syntax:
```yaml
replicas: {{ .Values.primary.replicaCount }}
image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

`{{ .Values.primary.replicaCount }}` pulls from `values.yaml`. When you pass `--set primary.replicaCount=3`, it overrides this value.

Open `Chart.yaml`:
```yaml
apiVersion: v2
name: mysql
description: A Helm chart for MySQL
version: 12.2.1      # Chart version (chart structure changes)
appVersion: "8.0.40"  # Version of MySQL inside the chart
```

**Now compare the Helm chart approach to the AI-BankApp's raw manifests:**

| Aspect | AI-BankApp `k8s/mysql-deployment.yml` | Bitnami MySQL Helm Chart |
|--------|---------------------------------------|--------------------------|
| Secrets | Hardcoded base64 in `secrets.yml` | Generated and managed by Helm |
| Storage | Manual StorageClass + PVC files | Configured via `persistence.size` value |
| Replicas | Hardcoded in YAML | `primary.replicaCount` value |
| Metrics | Not included | `metrics.enabled: true` |
| Rollback | Manual | `helm rollback` |

**Document:** What is the difference between `version` and `appVersion` in Chart.yaml?

Clean up:
```bash
helm uninstall bankapp-mysql
rm -rf mysql/
```

---

#### Hints
- `helm install` creates a new release; `helm upgrade` updates an existing one. Use `helm upgrade --install` to do both in one command (install if missing, upgrade if exists)
- `--set` overrides individual values; `-f values.yaml` overrides with a file. `-f` is preferred for anything beyond one or two values
- `helm list` shows releases in the current namespace. Use `helm list -A` for all namespaces
- `helm repo update` refreshes the local cache of chart repositories -- run it before deploying to get the latest versions
- If a deployment fails, check `helm status <release>` and `kubectl describe pod` for details
- `helm template <release> <chart>` renders templates locally without deploying -- great for debugging
- Keep the AI-BankApp repo cloned -- you will build a Helm chart for it tomorrow
- Reference project: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-78-helm-intro.md` with:
- Helm concepts in your own words (chart, release, repository, values)
- Comparison of deploying MySQL with raw YAML vs Helm
- Your `mysql-values.yaml` and explanation of each field
- Screenshot of `helm list` showing your deployed releases
- Screenshot of `helm history` showing upgrade and rollback revisions
- The chart directory structure with explanation of each file
- Why the AI-BankApp's 12 raw YAML files would benefit from being a Helm chart

---

#### Submission
1. Add `day-78-helm-intro.md` to `2026/day-78/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the Helm block today -- deployed MySQL from a Bitnami Helm chart with one command instead of writing 5 separate YAML files. Upgraded, rolled back, and explored the chart structure. Tomorrow I will convert the AI-BankApp's 12 raw Kubernetes manifests into a proper Helm chart."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Record time-to-diagnose for each broken scenario. | You can demonstrate, without notes: *diagnose common failures systematically* — with evidence committed to `day-78/`. |
| 2 | Publish troubleshooting guide to repo. | You can demonstrate, without notes: *use ephemeral debug containers and events* — with evidence committed to `day-78/`. |
| 3 | Practise `kubectl get all` pitfalls note. | You can demonstrate, without notes: *manage overlays with Kustomize* — with evidence committed to `day-78/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Logs empty | Container never started; use describe/events or `--previous`. |
| Kustomize patch not applied | Target/selector mismatch; run `kustomize build`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Debug containers with least privilege; do not leave debug pods running; audit exec access.
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

1. How do you debug CrashLoopBackOff?
2. What is an ephemeral container?
3. Helm vs Kustomize?
4. How do you find recent changes?
5. **Scenario:** It's 02:00: pods CrashLoopBackOff after a config change. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 18. Challenge Notes — Day 78: GitOps with ArgoCD and FluxCD

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 78** of the DevOps 90-Day Challenge!
We touched on GitOps before, but today we compare the two giants: **ArgoCD** vs **FluxCD**. Both are amazing, but they work differently.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand the core GitOps principles (Declarative, Versioned, Automated, Reconciled).
* Install **FluxCD** (The "other" GitOps tool).
* Compare ArgoCD (UI-centric) vs Flux (CLI/Controller-centric).
* Deploy an app using Flux Kustomizations.

---

#### Tools Used

* **ArgoCD**
* **FluxCD**
* **Git**

---

#### Key Concepts

##### 1. ArgoCD
*   **Pros**: Beautiful UI, easy to visualize topology, supports Helm/Kustomize/Jsonnet, huge community.
*   **Cons**: Can be resource heavy. Manage via UI can lead to drift if not careful.

##### 2. FluxCD
*   **Pros**: Lightweight, "Kubernetes-native" feel (no UI by default), amazing Helm Controller, multi-tenancy.
*   **Cons**: No built-in visual dashboard (needs Weave GitOps), steeper learning curve for debugging.

##### 3. The Controller Pattern
Both tools use a Controller.
1.  Read Git Repo.
2.  Read Cluster State.
3.  Diff.
4.  Apply (if diff exists).

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Bootstrapping** | `flux bootstrap github ...` installs Flux *and* commits its own manifests to the repo in one command. |
| **HelmRepository** | Flux Custom Resource that tells the cluster where to find Helm charts (e.g., maintain generic helm repos). |
| **Reconciliation** | Setting `interval: 1m` to force the cluster to check Git every minute. |

---

#### Bonus (Extra Learning)

*   Install **Weave GitOps** to get a UI for Flux.
*   Use Flux's "Image Automation" to automatically update the Git repo when a new Docker image is pushed (Automated PRs).

---

#### Congratulations!

You now know the two main players in the GitOps space. Choosing between them is a matter of preference (and whether you need a UI).

---

#### Try These Next

*   Set up a multi-cluster deployment with Flux.
*   Migrate an app from ArgoCD to Flux.

## 19. Cohort Practice — Day 78: Introduction to Helm and Chart Basics

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You have deployed applications with raw Kubernetes manifests -- writing Deployments, Services, ConfigMaps, and Secrets by hand. The AI-BankApp project (https://github.com/TrainWithShubham/AI-BankApp-DevOps, branch `feat/gitops`) has 12 YAML files in its `k8s/` directory. Managing those across dev, staging, and production with slightly different configurations is painful.

Helm is the package manager for Kubernetes. It lets you template, package, version, and deploy Kubernetes applications as reusable units called charts. Today you install Helm, understand chart structure, and deploy your first applications using community charts -- including MySQL, which the AI-BankApp depends on.

---

#### Expected Output
- Helm installed and connected to your Kubernetes cluster
- At least two applications deployed using Helm from public chart repositories
- Understanding of chart structure: templates, values, Chart.yaml
- Helm release management: install, upgrade, rollback, uninstall
- A markdown file: `day-78-helm-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand Helm Concepts
Research and write notes on:

1. **What is Helm?**
   - A package manager for Kubernetes (like apt for Ubuntu or yum for RHEL)
   - Packages Kubernetes manifests into reusable, versioned units called **charts**
   - Supports templating -- one chart, many environments

2. **Core concepts:**
   - **Chart** -- a collection of files that describe a set of Kubernetes resources (Deployment + Service + ConfigMap + Secret = one chart)
   - **Release** -- a running instance of a chart in a cluster. You can install the same chart multiple times with different release names
   - **Repository** -- a place where charts are stored and shared (like DockerHub for images)
   - **Values** -- configuration that customizes a chart for each deployment (replicas, image tag, resource limits)

3. **Why Helm over raw manifests?**
   - Look at the AI-BankApp's `k8s/` directory -- 12 separate YAML files. To change the image tag, you edit `bankapp-deployment.yml`. To switch environments, you manually update ConfigMaps and Secrets. Helm solves this:
   - Templating: one chart serves dev, staging, and prod with different values
   - Versioning: charts have version numbers, you can rollback to previous versions
   - Dependencies: a chart can depend on other charts (your app chart depends on a MySQL chart)
   - Community: thousands of pre-built charts for common software (MySQL, Redis, Prometheus, ArgoCD)

---

##### Task 2: Install Helm and Explore the AI-BankApp
You need a running Kubernetes cluster. Use any of these:
- **Kind** (recommended for this block): Use the AI-BankApp's Kind config
- **Minikube**: `minikube start`
- **Docker Desktop Kubernetes**: enable in settings

**Set up a Kind cluster using the AI-BankApp's config:**
```bash
git clone -b feat/gitops https://github.com/TrainWithShubham/AI-BankApp-DevOps.git
cd AI-BankApp-DevOps

kind create cluster --config setup-k8s/kind-config.yml
```

This creates a cluster with 1 control plane and 2 worker nodes.

**Install Helm:**
```bash
# macOS
brew install helm

# Linux (script)
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

Confirm Helm can talk to your cluster:
```bash
kubectl cluster-info
helm list
```

**Explore the raw manifests you will eventually replace with Helm:**
```bash
ls k8s/
```

```
bankapp-deployment.yml   configmap.yml   gateway.yml   mysql-deployment.yml
namespace.yml   ollama-deployment.yml   pv.yml   pvc.yml   secrets.yml
service.yml   hpa.yml   cert-manager.yml
```

12 files -- Deployments, Services, ConfigMaps, Secrets, PVCs, HPA, and more. All hardcoded values. On Day 79, you will convert these into a Helm chart.

---

##### Task 3: Deploy MySQL Using a Helm Chart
The AI-BankApp needs MySQL. Instead of applying raw YAML like `k8s/mysql-deployment.yml`, deploy it with Helm.

Add the Bitnami chart repository:
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

Search for MySQL:
```bash
helm search repo bitnami/mysql
```

**Deploy MySQL with the same config the AI-BankApp expects:**
```bash
helm install bankapp-mysql bitnami/mysql \
  --set auth.rootPassword=Test@123 \
  --set auth.database=bankappdb \
  --set primary.resources.requests.memory=256Mi \
  --set primary.resources.requests.cpu=250m \
  --set primary.resources.limits.memory=512Mi \
  --set primary.resources.limits.cpu=500m \
  --set primary.persistence.size=5Gi
```

Compare this single command to the raw manifest approach which needs `mysql-deployment.yml` + `secrets.yml` + `pvc.yml` + `pv.yml` + `service.yml`. Helm handles all of it.

Check what was created:
```bash
helm list
kubectl get all -l app.kubernetes.io/instance=bankapp-mysql
kubectl get pvc -l app.kubernetes.io/instance=bankapp-mysql
kubectl get secret -l app.kubernetes.io/instance=bankapp-mysql
```

Verify MySQL is running:
```bash
kubectl exec -it bankapp-mysql-0 -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"
```

You should see `bankappdb` in the output.

---

##### Task 4: Customize a Deployment with Values Files
`--set` works for quick overrides, but real projects use values files.

Create `mysql-values.yaml`:
```yaml
auth:
  rootPassword: Test@123
  database: bankappdb
primary:
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  persistence:
    size: 5Gi
    storageClass: ""
metrics:
  enabled: true
  serviceMonitor:
    enabled: false
```

Deploy with the values file:
```bash
helm install bankapp-mysql-v2 bitnami/mysql -f mysql-values.yaml
```

**To see all configurable values for a chart:**
```bash
helm show values bitnami/mysql | head -80
```

This is your reference for every knob you can turn. Notice how the chart supports metrics, replication, custom init scripts, and dozens more options -- all through values.

**Clean up the second release:**
```bash
helm uninstall bankapp-mysql-v2
```

---

##### Task 5: Manage Releases -- Upgrade, Rollback, Uninstall
Helm tracks every change as a **revision**. This lets you upgrade and rollback safely.

**Upgrade MySQL to enable metrics:**
```bash
helm upgrade bankapp-mysql bitnami/mysql \
  --set auth.rootPassword=Test@123 \
  --set auth.database=bankappdb \
  --set metrics.enabled=true
```

Check the revision history:
```bash
helm history bankapp-mysql
```

You should see revision 1 (original) and revision 2 (metrics enabled).

**Rollback to the previous version:**
```bash
helm rollback bankapp-mysql 1
```

Check history again:
```bash
helm history bankapp-mysql
```

Revision 3 appears -- a rollback to revision 1.

**Compare this to raw manifests:** With `kubectl apply`, there is no built-in rollback. You would have to `git revert` or manually re-apply old YAML. Helm gives you `helm rollback` out of the box.

---

##### Task 6: Explore a Chart's Structure
Before building your own chart for the AI-BankApp tomorrow, understand what is inside a Helm chart.

Pull the MySQL chart locally:
```bash
helm pull bitnami/mysql --untar
ls mysql/
```

You will see:
```
mysql/
  Chart.yaml              # Chart metadata (name, version, description)
  values.yaml             # Default configuration values
  charts/                 # Subchart dependencies
  templates/              # Kubernetes manifest templates
    primary/
      statefulset.yaml    # StatefulSet template with Go template syntax
      svc.yaml            # Service template
    _helpers.tpl          # Reusable template helpers
    NOTES.txt             # Post-install message shown to the user
    secrets.yaml          # Secret template
```

Open `templates/primary/statefulset.yaml` and look for Go template syntax:
```yaml
replicas: {{ .Values.primary.replicaCount }}
image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

`{{ .Values.primary.replicaCount }}` pulls from `values.yaml`. When you pass `--set primary.replicaCount=3`, it overrides this value.

Open `Chart.yaml`:
```yaml
apiVersion: v2
name: mysql
description: A Helm chart for MySQL
version: 12.2.1      # Chart version (chart structure changes)
appVersion: "8.0.40"  # Version of MySQL inside the chart
```

**Now compare the Helm chart approach to the AI-BankApp's raw manifests:**

| Aspect | AI-BankApp `k8s/mysql-deployment.yml` | Bitnami MySQL Helm Chart |
|--------|---------------------------------------|--------------------------|
| Secrets | Hardcoded base64 in `secrets.yml` | Generated and managed by Helm |
| Storage | Manual StorageClass + PVC files | Configured via `persistence.size` value |
| Replicas | Hardcoded in YAML | `primary.replicaCount` value |
| Metrics | Not included | `metrics.enabled: true` |
| Rollback | Manual | `helm rollback` |

**Document:** What is the difference between `version` and `appVersion` in Chart.yaml?

Clean up:
```bash
helm uninstall bankapp-mysql
rm -rf mysql/
```

---

#### Hints
- `helm install` creates a new release; `helm upgrade` updates an existing one. Use `helm upgrade --install` to do both in one command (install if missing, upgrade if exists)
- `--set` overrides individual values; `-f values.yaml` overrides with a file. `-f` is preferred for anything beyond one or two values
- `helm list` shows releases in the current namespace. Use `helm list -A` for all namespaces
- `helm repo update` refreshes the local cache of chart repositories -- run it before deploying to get the latest versions
- If a deployment fails, check `helm status <release>` and `kubectl describe pod` for details
- `helm template <release> <chart>` renders templates locally without deploying -- great for debugging
- Keep the AI-BankApp repo cloned -- you will build a Helm chart for it tomorrow
- Reference project: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-78-helm-intro.md` with:
- Helm concepts in your own words (chart, release, repository, values)
- Comparison of deploying MySQL with raw YAML vs Helm
- Your `mysql-values.yaml` and explanation of each field
- Screenshot of `helm list` showing your deployed releases
- Screenshot of `helm history` showing upgrade and rollback revisions
- The chart directory structure with explanation of each file
- Why the AI-BankApp's 12 raw YAML files would benefit from being a Helm chart

---

#### Submission
1. Add `day-78-helm-intro.md` to `2026/day-78/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the Helm block today -- deployed MySQL from a Bitnami Helm chart with one command instead of writing 5 separate YAML files. Upgraded, rolled back, and explored the chart structure. Tomorrow I will convert the AI-BankApp's 12 raw Kubernetes manifests into a proper Helm chart."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 78: Glue & Athena Basics

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Glue & Athena Basics**.

#### 🎯 Learning Goals
- Understand the fundamentals of Glue & Athena Basics.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day78: Glue & Athena Basics`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 77](../day-77/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 79 →](../day-79/README.md)
