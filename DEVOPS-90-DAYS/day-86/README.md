# Day 86 — Cost Optimisation (FinOps for Cloud & Kubernetes) & AI-Assisted DevOps

[← Day 85](../day-85/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 87 →](../day-87/README.md)

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

- [ ] Measure and reduce cloud and Kubernetes cost
- [ ] Use AI assistants responsibly in DevOps workflows
- [ ] Build a small AIOps helper with human approval

## 2. Prerequisites

- Days 55, 75, 81-84.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 FinOps in practice

Tag/label for showback, rightsize, use autoscaling, Spot/preemptible for tolerant workloads, schedule non-prod, storage lifecycle, delete orphaned resources, Savings Plans, cost per request/service. Kubernetes: OpenCost/Kubecost, requests vs usage, node bin-packing, Karpenter.

### 3.2 AI in DevOps (2026)

LLM assistants help with scripts, IaC review, log summarisation, runbook search and incident timelines. Risks: hallucinations, secret leakage, over-permissive agents. Controls: read-only by default, human approval for changes, redaction, audit logs, evaluate outputs, least-privilege tokens.

### 3.3 MCP/agents concept

Tools exposed to agents via protocols such as MCP; design with narrow scopes and approval gates.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install OpenCost (or use `kubectl top` + requests analysis) and identify over-provisioned workloads.
2. [ ] Right-size 3 deployments and document before/after.
3. [ ] Write a script that summarises K8s warning events/logs and asks an LLM (or local model) for a summary with secrets redacted.
4. [ ] Require explicit confirmation before any suggested command executes.
5. [ ] Write an AI-usage policy for your DevOps repo.

## 5. Real-World Scenario

> Leadership wants to cut cloud cost 25% without hurting reliability, and asks if AI can 'auto-fix' production. Provide a safe plan.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl top pods -A --sort-by=memory | head
kubectl get pods -A -o json | jq -r '.items[]|[.metadata.namespace,.metadata.name,(.spec.containers[].resources.requests.memory//"none")]|@tsv'
kubectl get events -A --field-selector type=Warning -o json | jq '[.items[]|{ns:.metadata.namespace,reason,msg:.message}]' > events.json
sed -E 's/(token|password|secret)=[^ ]+/\1=REDACTED/g' events.json > safe-events.json
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 86 -- GitOps Project: End-to-End CI/CD Pipeline with AI-BankApp

#### Task
Two days of ArgoCD -- setup, self-healing, sync strategies, App of Apps, and RBAC. Today you wire the complete GitOps pipeline end to end. A developer pushes a code change, GitHub Actions builds and pushes the Docker image, updates the Kubernetes manifest in Git, and ArgoCD automatically deploys the new version to EKS. Zero human intervention from `git push` to production.

This is the AI-BankApp's actual production workflow from `.github/workflows/gitops-ci.yml`.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Expected Output
- GitHub Actions CI pipeline understood and configured
- A code change flowing through the complete pipeline: push -> build -> deploy
- Image tag updated automatically in the Kubernetes manifest
- ArgoCD syncing the new image to EKS
- Drift detection and recovery demonstrated
- Complete teardown of all resources
- A markdown file: `day-86-gitops-project.md`

---

#### Challenge Tasks

##### Task 1: Study the AI-BankApp's GitOps CI Pipeline
Open `.github/workflows/gitops-ci.yml` from the AI-BankApp repo. This is a production-grade GitOps CI pipeline.

**The workflow triggers on:**
```yaml
on:
  push:
    branches: [feat/gitops]
    paths:
      - 'src/**'
      - 'pom.xml'
      - 'Dockerfile'
  workflow_dispatch:
```

It only runs when application code changes (`src/`, `pom.xml`, `Dockerfile`) -- not when Kubernetes manifests change. This prevents infinite loops since the pipeline itself updates manifests.

**The pipeline steps:**

| Step | What it does |
|------|-------------|
| Checkout code | Clones the repo |
| Set up JDK 21 | Installs Java 21 with Maven cache |
| Build with Maven | `./mvnw clean package -DskipTests -B` |
| Run tests | `./mvnw test -B` (non-blocking: `continue-on-error: true`) |
| Set image tag | Uses `git rev-parse --short HEAD` as the tag (e.g., `1c7cb0e`) |
| Login to DockerHub | Authenticates with secrets |
| Build and push image | Pushes `trainwithshubham/ai-bankapp-eks:latest` and `:sha` |
| Update K8s manifest | Uses `sed` to update the image tag in `k8s/bankapp-deployment.yml` |
| Commit updated manifest | Commits the change with `[skip ci]` to avoid re-triggering |

**The critical GitOps step** is the last two:
```yaml
- name: Update Kubernetes deployment manifest
  run: |
    sed -i "s|image: ${{ env.DOCKERHUB_REPO }}:.*|image: ${{ env.DOCKERHUB_REPO }}:${{ steps.tag.outputs.sha_short }}|" k8s/bankapp-deployment.yml

- name: Commit updated manifest
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add k8s/bankapp-deployment.yml
    git diff --staged --quiet || git commit -m "ci: update bankapp image to ${{ steps.tag.outputs.sha_short }} [skip ci]"
    git push
```

**Why `[skip ci]`?** Without it, the commit that updates the manifest would trigger the pipeline again, which would update the manifest again -- an infinite loop. `[skip ci]` tells GitHub Actions to ignore this commit.

**The handoff to ArgoCD:**
```
GitHub Actions commits new image tag to k8s/bankapp-deployment.yml
         |
    ArgoCD detects the new commit (within 3 minutes)
         |
    ArgoCD compares: cluster has old image, Git has new image
         |
    ArgoCD syncs: performs a rolling update
         |
    New pods start with the new image, old pods terminate
         |
    Zero downtime deployment complete
```

---

##### Task 2: Set Up the Pipeline on Your Fork
To run the full pipeline, you need your own fork with GitHub Secrets.

**1. Fork the repo** (if not done on Day 84):
```
https://github.com/TrainWithShubham/AI-BankApp-DevOps -> Fork
```

**2. Create a DockerHub access token:**
- Go to https://hub.docker.com/settings/security
- Create a new access token with Read/Write permissions
- Note the token

**3. Add GitHub Secrets to your fork:**
- Go to your fork > Settings > Secrets and variables > Actions
- Add these secrets:
  - `DOCKERHUB_USERNAME` -- your DockerHub username
  - `DOCKERHUB_TOKEN` -- the access token from step 2

**4. Update the workflow to push to your DockerHub repo:**
Edit `.github/workflows/gitops-ci.yml` in your fork:
```yaml
env:
  DOCKERHUB_REPO: <your-dockerhub-username>/ai-bankapp-eks
```

**5. Update the ArgoCD Application to watch your fork:**
```bash
argocd app set bankapp --repo https://github.com/<your-username>/AI-BankApp-DevOps.git
```

**6. Update the Kubernetes deployment to pull from your DockerHub:**
Edit `k8s/bankapp-deployment.yml`:
```yaml
image: <your-dockerhub-username>/ai-bankapp-eks:latest
```

Commit and push all changes to your fork's `feat/gitops` branch.

---

##### Task 3: Trigger the Full Pipeline
Make a visible code change in the application. Edit a file in `src/`:

For example, edit `src/main/resources/templates/fragments/layout.html` -- change the page title or footer text to include your name:
```html
<!-- Find the title or footer and add your touch -->
<title>AI BankApp - Built by YourName</title>
```

Commit and push:
```bash
git add src/
git commit -m "feat: customize app title"
git push origin feat/gitops
```

**Watch the pipeline:**
1. Go to your fork > Actions tab
2. The "GitOps CI - Build & Push to DockerHub" workflow should be running
3. Watch each step: build -> test -> push -> update manifest -> commit

**After the pipeline completes:**
- Check the last commit on your `feat/gitops` branch -- you should see a commit from `github-actions[bot]` with the message `ci: update bankapp image to <sha> [skip ci]`
- The `k8s/bankapp-deployment.yml` file now has the new image tag

**Watch ArgoCD sync:**
```bash
argocd app get bankapp --refresh
argocd app wait bankapp
```

Or watch in the ArgoCD UI -- you will see a new sync event with the updated revision.

Check the pods:
```bash
kubectl get pods -n bankapp -w
```

You should see a rolling update -- new pods starting with the new image while old pods terminate gracefully.

Verify the change is live:
```bash
kubectl port-forward svc/bankapp-service -n bankapp 8080:8080
```

Open `http://localhost:8080` and confirm your title change is visible.

**You just completed a full GitOps cycle:** code change -> CI builds image -> updates manifest -> ArgoCD deploys to production. Zero manual intervention.

---

##### Task 4: Test Drift Detection and Recovery
GitOps means the cluster must always match Git. Test what happens when someone makes unauthorized changes.

**Scenario 1 -- Someone scales down the app directly:**
```bash
kubectl scale deployment bankapp -n bankapp --replicas=1
```

Check ArgoCD:
```bash
argocd app get bankapp
```

Status should show `OutOfSync`. With `selfHeal: true`, ArgoCD will correct it within 3 minutes. Monitor:
```bash
kubectl get pods -n bankapp -w
```

The replica count will return to 4 (or whatever the manifest specifies).

**Scenario 2 -- Someone updates the image tag directly:**
```bash
kubectl set image deployment/bankapp bankapp=nginx:latest -n bankapp
```

ArgoCD detects the drift and reverts it to the image tag from Git. The BankApp pods restart with the correct image.

**Scenario 3 -- Someone deletes a critical resource:**
```bash
kubectl delete service bankapp-service -n bankapp
```

ArgoCD recreates it from Git.

**View all drift events:**
```bash
argocd app history bankapp
```

In the ArgoCD UI, click the application and look at the "Events" tab. Every self-heal action is logged with the before/after state.

**Document:** In each scenario, how long did ArgoCD take to detect and fix the drift? What would happen if `selfHeal` was disabled?

---

##### Task 5: Reflect on the Complete DevOps Pipeline
Step back and look at everything you have built across the entire 90-day challenge that connects to this GitOps pipeline:

```
[Developer writes code]
    |
[Git push to GitHub]  ........... Day 22-28: Git & GitHub
    |
[GitHub Actions CI]   ........... Day 40-49: GitHub Actions
    |-- Build with Maven
    |-- Run tests
    |-- Build Docker image  ..... Day 29-37: Docker
    |-- Push to DockerHub
    |-- Update K8s manifest
    |-- Commit back to Git
    |
[ArgoCD detects change] ........ Day 84-86: GitOps
    |
[ArgoCD syncs to EKS]  ........ Day 81-83: EKS
    |-- Rolling update
    |-- Health checks pass
    |-- HPA scales as needed ... Day 78-80: Helm (HPA, values)
    |
[Prometheus scrapes metrics] ... Day 73-77: Observability
    |-- Grafana dashboards
    |-- Alerts if something breaks
    |
[App is live with zero downtime]
```

Every block in this challenge connects to the next. This is what a DevOps pipeline looks like in production.

---

##### Task 6: Complete Teardown
**Delete everything. This is the end of the EKS and ArgoCD block.**

Delete ArgoCD applications:
```bash
argocd app delete bankapp --cascade -y
argocd app delete monitoring --cascade -y 2>/dev/null
argocd app delete envoy-gateway --cascade -y 2>/dev/null
argocd app delete root-app --cascade -y 2>/dev/null
```

The `--cascade` flag tells ArgoCD to delete all Kubernetes resources managed by each application.

Wait for cleanup:
```bash
kubectl get all -n bankapp 2>/dev/null
kubectl get all -n monitoring 2>/dev/null
```

**Destroy the EKS cluster with Terraform:**
```bash
cd AI-BankApp-DevOps/terraform
terraform destroy
```

Confirm deletion (type `yes`). This takes 10-15 minutes.

**Verify in the AWS Console:**
- EKS: no clusters
- EC2: no instances, no load balancers, no EBS volumes
- VPC: the `bankapp-eks` VPC is gone
- IAM: clean up roles with `eksctl` or `bankapp-eks` in the name

**Final cost check:** Review AWS Billing Dashboard. All EKS charges should stop within the hour.

**Map the 3-day ArgoCD journey:**

| Day | What You Built |
|-----|---------------|
| 84 | ArgoCD setup, first GitOps deploy, self-healing |
| 85 | Sync waves, rollbacks, App of Apps, notifications, RBAC |
| 86 | Full CI/CD pipeline, code-to-production, drift detection, teardown |

---

#### Hints
- `[skip ci]` in the commit message prevents infinite pipeline loops -- the manifest update commit must not trigger a new build
- The `sed` command in the pipeline updates the image tag in-place. In a Helm-based GitOps setup, you would update `values.yaml` instead
- ArgoCD webhook integration (Settings > Repositories > webhook) gives instant sync instead of waiting 3 minutes
- `--cascade` on `argocd app delete` is critical -- without it, ArgoCD deletes the Application resource but leaves all Kubernetes resources running (and billing)
- If Terraform destroy hangs, check for lingering load balancers or EBS volumes created by Kubernetes that Terraform does not know about
- The `workflow_dispatch` trigger lets you manually re-run the pipeline from the GitHub Actions UI -- useful for debugging
- The image tag uses `git rev-parse --short HEAD` (7 char SHA) -- this gives exact traceability from running pod to git commit
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-86-gitops-project.md` with:
- The complete GitOps pipeline diagram (code -> CI -> Git -> ArgoCD -> EKS)
- GitHub Actions workflow explained step by step
- Screenshot of GitHub Actions pipeline running successfully
- Screenshot of the `github-actions[bot]` commit updating the image tag
- Screenshot of ArgoCD syncing the new revision
- Drift detection results for all three scenarios
- The full DevOps pipeline map (connecting all blocks from the challenge)
- Key takeaways from the 3-day GitOps block
- Teardown verification screenshots

---

#### Submission
1. Add `day-86-gitops-project.md` to `2026/day-86/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Completed the GitOps block -- wired the full CI/CD pipeline for the AI-BankApp end to end. Push code to GitHub, Actions builds and pushes the Docker image, updates the Kubernetes manifest in Git, ArgoCD syncs to EKS automatically. Tested drift detection: manually scaled pods, changed images, deleted services -- ArgoCD reverted every change within minutes. This is what production GitOps looks like. Zero manual deployments, full audit trail, self-healing infrastructure."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write 10 FinOps actions ranked by savings/risk. | You can demonstrate, without notes: *measure and reduce cloud and Kubernetes cost* — with evidence committed to `day-86/`. |
| 2 | Document where AI must NOT have write access. | You can demonstrate, without notes: *use AI assistants responsibly in DevOps workflows* — with evidence committed to `day-86/`. |
| 3 | Evaluate AI output on 5 incidents and note errors. | You can demonstrate, without notes: *build a small AIOps helper with human approval* — with evidence committed to `day-86/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Savings break performance | Right-size using percentiles and load tests; use SLOs as guardrails. |
| AI suggests destructive command | Never execute unreviewed; sandbox and require approval. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Redact secrets before sending data to any model; use enterprise/privacy-approved services; keep agents read-only unless gated.
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

1. How do you reduce K8s cost?
2. What are risks of AI agents in ops?
3. What guardrails would you add?
4. How do you measure savings?
5. **Scenario:** Leadership wants to cut cloud cost 25% without hurting reliability, and asks if AI can 'auto-fix' production. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I identify waste? | ☐ | ☐ | ☐ | ☐ |
| Can I safely use AI assistance? | ☐ | ☐ | ☐ | ☐ |
| Do I have an AI policy? | ☐ | ☐ | ☐ | ☐ |
| Measure and reduce cloud and Kubernetes cost | ☐ | ☐ | ☐ | ☐ |
| Use AI assistants responsibly in DevOps workflows | ☐ | ☐ | ☐ | ☐ |
| Build a small AIOps helper with human approval | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-86/` in your own repository:

```text
day-86/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-86
git add day-86/
git commit -m "day-86: cost optimisation (finops for cloud & kubernetes) & ai-assis"
git push -u origin day-86
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

## 18. Challenge Notes — Day 86: Chaos Engineering and Resilience Testing

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 86** of the DevOps 90-Day Challenge!
Today we test the High Availability (HA) systems we built. We will adopt the Netflix "Chaos Monkey" methodology to break things on purpose, proving that our infrastructure auto-heals without human intervention.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand the philosophy and necessity of **Chaos Engineering**.
* Install the **Chaos Mesh** platform on Kubernetes.
* Design a chaos experiment and implement a **PodChaos** attack.
* Observe and validate Kubernetes Auto-healing mechanisms during a failure.

---

#### Tools Used

* **Chaos Mesh**
* **Kubernetes (ReplicaSets / Deployments)**
* **Helm**

---

#### Key Concepts

##### 1. Chaos Engineering
Chaos Engineering is the discipline of experimenting on a system to build confidence in its capability to withstand turbulent conditions in production. You don't wait for a disaster; you trigger small controlled disasters to verify auto-recovery logic.

##### 2. Hypothesis-Driven Fault Injection
Always inject faults with a hypothesis. E.g., "If I kill one database node, the ReplicaSet will instantly spin up a new one without affecting user traffic". 

##### 3. Chaos Mesh
An open-source cloud-native chaos engineering platform that orchestrates fault injection seamlessly into Kubernetes clusters. It can simulate Pod failures, Network latency, DNS errors, and even kernel-level faults.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Deployment Resilience** | Deploying an Nginx application with 3 replicas to guarantee failover capacity. |
| **PodChaos Event** | Injecting a CRD (Custom Resource Definition) that instructs Chaos Mesh to randomly kill a pod every 10 seconds. |
| **Self-Healing** | Watching the Kubernetes control plane instantly detect the dead pod and rapidly recreate a replacement to maintain the desired state. |

---

#### Bonus (Extra Learning)

* Try injecting a `NetworkChaos` experiment to simulate 500ms network latency and ping your application to observe the delay.
* Research **AWS Fault Injection Simulator (FIS)** for a managed AWS-native chaos experience.

---

#### Congratulations!

You've successfully run live Chaos experiments! You now possess an elite DevOps mentality: expecting and designing for constant failure.

## 19. Cohort Practice — Day 86: GitOps Project: End-to-End CI/CD Pipeline with AI-BankApp

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Two days of ArgoCD -- setup, self-healing, sync strategies, App of Apps, and RBAC. Today you wire the complete GitOps pipeline end to end. A developer pushes a code change, GitHub Actions builds and pushes the Docker image, updates the Kubernetes manifest in Git, and ArgoCD automatically deploys the new version to EKS. Zero human intervention from `git push` to production.

This is the AI-BankApp's actual production workflow from `.github/workflows/gitops-ci.yml`.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Expected Output
- GitHub Actions CI pipeline understood and configured
- A code change flowing through the complete pipeline: push -> build -> deploy
- Image tag updated automatically in the Kubernetes manifest
- ArgoCD syncing the new image to EKS
- Drift detection and recovery demonstrated
- Complete teardown of all resources
- A markdown file: `day-86-gitops-project.md`

---

#### Challenge Tasks

##### Task 1: Study the AI-BankApp's GitOps CI Pipeline
Open `.github/workflows/gitops-ci.yml` from the AI-BankApp repo. This is a production-grade GitOps CI pipeline.

**The workflow triggers on:**
```yaml
on:
  push:
    branches: [feat/gitops]
    paths:
      - 'src/**'
      - 'pom.xml'
      - 'Dockerfile'
  workflow_dispatch:
```

It only runs when application code changes (`src/`, `pom.xml`, `Dockerfile`) -- not when Kubernetes manifests change. This prevents infinite loops since the pipeline itself updates manifests.

**The pipeline steps:**

| Step | What it does |
|------|-------------|
| Checkout code | Clones the repo |
| Set up JDK 21 | Installs Java 21 with Maven cache |
| Build with Maven | `./mvnw clean package -DskipTests -B` |
| Run tests | `./mvnw test -B` (non-blocking: `continue-on-error: true`) |
| Set image tag | Uses `git rev-parse --short HEAD` as the tag (e.g., `1c7cb0e`) |
| Login to DockerHub | Authenticates with secrets |
| Build and push image | Pushes `trainwithshubham/ai-bankapp-eks:latest` and `:sha` |
| Update K8s manifest | Uses `sed` to update the image tag in `k8s/bankapp-deployment.yml` |
| Commit updated manifest | Commits the change with `[skip ci]` to avoid re-triggering |

**The critical GitOps step** is the last two:
```yaml
- name: Update Kubernetes deployment manifest
  run: |
    sed -i "s|image: ${{ env.DOCKERHUB_REPO }}:.*|image: ${{ env.DOCKERHUB_REPO }}:${{ steps.tag.outputs.sha_short }}|" k8s/bankapp-deployment.yml

- name: Commit updated manifest
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add k8s/bankapp-deployment.yml
    git diff --staged --quiet || git commit -m "ci: update bankapp image to ${{ steps.tag.outputs.sha_short }} [skip ci]"
    git push
```

**Why `[skip ci]`?** Without it, the commit that updates the manifest would trigger the pipeline again, which would update the manifest again -- an infinite loop. `[skip ci]` tells GitHub Actions to ignore this commit.

**The handoff to ArgoCD:**
```
GitHub Actions commits new image tag to k8s/bankapp-deployment.yml
         |
    ArgoCD detects the new commit (within 3 minutes)
         |
    ArgoCD compares: cluster has old image, Git has new image
         |
    ArgoCD syncs: performs a rolling update
         |
    New pods start with the new image, old pods terminate
         |
    Zero downtime deployment complete
```

---

##### Task 2: Set Up the Pipeline on Your Fork
To run the full pipeline, you need your own fork with GitHub Secrets.

**1. Fork the repo** (if not done on Day 84):
```
https://github.com/TrainWithShubham/AI-BankApp-DevOps -> Fork
```

**2. Create a DockerHub access token:**
- Go to https://hub.docker.com/settings/security
- Create a new access token with Read/Write permissions
- Note the token

**3. Add GitHub Secrets to your fork:**
- Go to your fork > Settings > Secrets and variables > Actions
- Add these secrets:
  - `DOCKERHUB_USERNAME` -- your DockerHub username
  - `DOCKERHUB_TOKEN` -- the access token from step 2

**4. Update the workflow to push to your DockerHub repo:**
Edit `.github/workflows/gitops-ci.yml` in your fork:
```yaml
env:
  DOCKERHUB_REPO: <your-dockerhub-username>/ai-bankapp-eks
```

**5. Update the ArgoCD Application to watch your fork:**
```bash
argocd app set bankapp --repo https://github.com/<your-username>/AI-BankApp-DevOps.git
```

**6. Update the Kubernetes deployment to pull from your DockerHub:**
Edit `k8s/bankapp-deployment.yml`:
```yaml
image: <your-dockerhub-username>/ai-bankapp-eks:latest
```

Commit and push all changes to your fork's `feat/gitops` branch.

---

##### Task 3: Trigger the Full Pipeline
Make a visible code change in the application. Edit a file in `src/`:

For example, edit `src/main/resources/templates/fragments/layout.html` -- change the page title or footer text to include your name:
```html
<!-- Find the title or footer and add your touch -->
<title>AI BankApp - Built by YourName</title>
```

Commit and push:
```bash
git add src/
git commit -m "feat: customize app title"
git push origin feat/gitops
```

**Watch the pipeline:**
1. Go to your fork > Actions tab
2. The "GitOps CI - Build & Push to DockerHub" workflow should be running
3. Watch each step: build -> test -> push -> update manifest -> commit

**After the pipeline completes:**
- Check the last commit on your `feat/gitops` branch -- you should see a commit from `github-actions[bot]` with the message `ci: update bankapp image to <sha> [skip ci]`
- The `k8s/bankapp-deployment.yml` file now has the new image tag

**Watch ArgoCD sync:**
```bash
argocd app get bankapp --refresh
argocd app wait bankapp
```

Or watch in the ArgoCD UI -- you will see a new sync event with the updated revision.

Check the pods:
```bash
kubectl get pods -n bankapp -w
```

You should see a rolling update -- new pods starting with the new image while old pods terminate gracefully.

Verify the change is live:
```bash
kubectl port-forward svc/bankapp-service -n bankapp 8080:8080
```

Open `http://localhost:8080` and confirm your title change is visible.

**You just completed a full GitOps cycle:** code change -> CI builds image -> updates manifest -> ArgoCD deploys to production. Zero manual intervention.

---

##### Task 4: Test Drift Detection and Recovery
GitOps means the cluster must always match Git. Test what happens when someone makes unauthorized changes.

**Scenario 1 -- Someone scales down the app directly:**
```bash
kubectl scale deployment bankapp -n bankapp --replicas=1
```

Check ArgoCD:
```bash
argocd app get bankapp
```

Status should show `OutOfSync`. With `selfHeal: true`, ArgoCD will correct it within 3 minutes. Monitor:
```bash
kubectl get pods -n bankapp -w
```

The replica count will return to 4 (or whatever the manifest specifies).

**Scenario 2 -- Someone updates the image tag directly:**
```bash
kubectl set image deployment/bankapp bankapp=nginx:latest -n bankapp
```

ArgoCD detects the drift and reverts it to the image tag from Git. The BankApp pods restart with the correct image.

**Scenario 3 -- Someone deletes a critical resource:**
```bash
kubectl delete service bankapp-service -n bankapp
```

ArgoCD recreates it from Git.

**View all drift events:**
```bash
argocd app history bankapp
```

In the ArgoCD UI, click the application and look at the "Events" tab. Every self-heal action is logged with the before/after state.

**Document:** In each scenario, how long did ArgoCD take to detect and fix the drift? What would happen if `selfHeal` was disabled?

---

##### Task 5: Reflect on the Complete DevOps Pipeline
Step back and look at everything you have built across the entire 90-day challenge that connects to this GitOps pipeline:

```
[Developer writes code]
    |
[Git push to GitHub]  ........... Day 22-28: Git & GitHub
    |
[GitHub Actions CI]   ........... Day 40-49: GitHub Actions
    |-- Build with Maven
    |-- Run tests
    |-- Build Docker image  ..... Day 29-37: Docker
    |-- Push to DockerHub
    |-- Update K8s manifest
    |-- Commit back to Git
    |
[ArgoCD detects change] ........ Day 84-86: GitOps
    |
[ArgoCD syncs to EKS]  ........ Day 81-83: EKS
    |-- Rolling update
    |-- Health checks pass
    |-- HPA scales as needed ... Day 78-80: Helm (HPA, values)
    |
[Prometheus scrapes metrics] ... Day 73-77: Observability
    |-- Grafana dashboards
    |-- Alerts if something breaks
    |
[App is live with zero downtime]
```

Every block in this challenge connects to the next. This is what a DevOps pipeline looks like in production.

---

##### Task 6: Complete Teardown
**Delete everything. This is the end of the EKS and ArgoCD block.**

Delete ArgoCD applications:
```bash
argocd app delete bankapp --cascade -y
argocd app delete monitoring --cascade -y 2>/dev/null
argocd app delete envoy-gateway --cascade -y 2>/dev/null
argocd app delete root-app --cascade -y 2>/dev/null
```

The `--cascade` flag tells ArgoCD to delete all Kubernetes resources managed by each application.

Wait for cleanup:
```bash
kubectl get all -n bankapp 2>/dev/null
kubectl get all -n monitoring 2>/dev/null
```

**Destroy the EKS cluster with Terraform:**
```bash
cd AI-BankApp-DevOps/terraform
terraform destroy
```

Confirm deletion (type `yes`). This takes 10-15 minutes.

**Verify in the AWS Console:**
- EKS: no clusters
- EC2: no instances, no load balancers, no EBS volumes
- VPC: the `bankapp-eks` VPC is gone
- IAM: clean up roles with `eksctl` or `bankapp-eks` in the name

**Final cost check:** Review AWS Billing Dashboard. All EKS charges should stop within the hour.

**Map the 3-day ArgoCD journey:**

| Day | What You Built |
|-----|---------------|
| 84 | ArgoCD setup, first GitOps deploy, self-healing |
| 85 | Sync waves, rollbacks, App of Apps, notifications, RBAC |
| 86 | Full CI/CD pipeline, code-to-production, drift detection, teardown |

---

#### Hints
- `[skip ci]` in the commit message prevents infinite pipeline loops -- the manifest update commit must not trigger a new build
- The `sed` command in the pipeline updates the image tag in-place. In a Helm-based GitOps setup, you would update `values.yaml` instead
- ArgoCD webhook integration (Settings > Repositories > webhook) gives instant sync instead of waiting 3 minutes
- `--cascade` on `argocd app delete` is critical -- without it, ArgoCD deletes the Application resource but leaves all Kubernetes resources running (and billing)
- If Terraform destroy hangs, check for lingering load balancers or EBS volumes created by Kubernetes that Terraform does not know about
- The `workflow_dispatch` trigger lets you manually re-run the pipeline from the GitHub Actions UI -- useful for debugging
- The image tag uses `git rev-parse --short HEAD` (7 char SHA) -- this gives exact traceability from running pod to git commit
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-86-gitops-project.md` with:
- The complete GitOps pipeline diagram (code -> CI -> Git -> ArgoCD -> EKS)
- GitHub Actions workflow explained step by step
- Screenshot of GitHub Actions pipeline running successfully
- Screenshot of the `github-actions[bot]` commit updating the image tag
- Screenshot of ArgoCD syncing the new revision
- Drift detection results for all three scenarios
- The full DevOps pipeline map (connecting all blocks from the challenge)
- Key takeaways from the 3-day GitOps block
- Teardown verification screenshots

---

#### Submission
1. Add `day-86-gitops-project.md` to `2026/day-86/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Completed the GitOps block -- wired the full CI/CD pipeline for the AI-BankApp end to end. Push code to GitHub, Actions builds and pushes the Docker image, updates the Kubernetes manifest in Git, ArgoCD syncs to EKS automatically. Tested drift detection: manually scaled pods, changed images, deleted services -- ArgoCD reverted every change within minutes. This is what production GitOps looks like. Zero manual deployments, full audit trail, self-healing infrastructure."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 86: Locust Load Testing

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Locust Load Testing**.

#### 🎯 Learning Goals
- Understand the fundamentals of Locust Load Testing.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day86: Locust Load Testing`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 85](../day-85/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 87 →](../day-87/README.md)
