# Day 58 — Terraform: Providers, Resources, Dependencies & Lifecycle

[← Day 57](../day-57/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 59 →](../day-59/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use multiple providers and resources
- [ ] Understand implicit/explicit dependencies
- [ ] Control change behaviour with lifecycle rules

## 2. Prerequisites

- Day 57.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Dependencies

Terraform builds a DAG from references (`aws_subnet.a.id`). Use `depends_on` only when a hidden dependency exists.

### 3.2 Meta-arguments

`count`, `for_each`, `depends_on`, `provider`, `lifecycle` (`create_before_destroy`, `prevent_destroy`, `ignore_changes`).

### 3.3 Resource planning

Understand which changes are in-place vs replacement (`-/+`) before applying.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create VPC, subnet, IGW, route table, SG, EC2 with references.
2. [ ] Use `for_each` to create 3 subnets from a map.
3. [ ] Add `prevent_destroy` to a critical resource and try destroying.
4. [ ] Use `terraform graph | dot -Tpng` to view dependencies.
5. [ ] Trigger a replacement and read the plan.

## 5. Real-World Scenario

> A rename of a resource attribute will recreate your database. Spot this in the plan and use proper techniques to avoid data loss.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
resource "aws_subnet" "private" {
  for_each          = { a = "10.0.1.0/24", b = "10.0.2.0/24" }
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value
  availability_zone = "us-east-1${each.key}"
  lifecycle { create_before_destroy = true }
}
terraform plan | grep -E "must be replaced|will be destroyed"
terraform graph | dot -Tpng > graph.png
terraform apply -replace=aws_instance.web
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 58 – Metrics Server and Horizontal Pod Autoscaler (HPA) — Challenge Brief

#### Task
Yesterday you set resource requests and limits. Today you put that to work. Install the Metrics Server so Kubernetes can see actual resource usage, then set up a Horizontal Pod Autoscaler that scales your app up under load and back down when things calm down.

---

#### Expected Output
- Metrics Server installed and `kubectl top` returning data
- An HPA that auto-scales pods under load
- A markdown file: `day-58-metrics-hpa.md`

---

#### Challenge Tasks

##### Task 1: Install the Metrics Server
1. Check if it is already running: `kubectl get pods -n kube-system | grep metrics-server`
2. If not, install it:
   - Minikube: `minikube addons enable metrics-server`
   - Kind/kubeadm: apply the official manifest from the metrics-server GitHub releases
3. On local clusters, you may need the `--kubelet-insecure-tls` flag (never in production)
4. Wait 60 seconds, then verify: `kubectl top nodes` and `kubectl top pods -A`

**Verify:** What is the current CPU and memory usage of your node?

---

##### Task 2: Explore kubectl top
1. Run `kubectl top nodes`, `kubectl top pods -A`, `kubectl top pods -A --sort-by=cpu`
2. `kubectl top` shows real-time usage, not requests or limits — these are different things
3. Data comes from the Metrics Server, which polls kubelets every 15 seconds

**Verify:** Which pod is using the most CPU right now?

---

##### Task 3: Create a Deployment with CPU Requests
1. Write a Deployment manifest using the `registry.k8s.io/hpa-example` image (a CPU-intensive PHP-Apache server)
2. Set `resources.requests.cpu: 200m` — HPA needs this to calculate utilization percentages
3. Expose it as a Service: `kubectl expose deployment php-apache --port=80`

Without CPU requests, HPA cannot work — this is the most common HPA setup mistake.

**Verify:** What is the current CPU usage of the Pod?

---

##### Task 4: Create an HPA (Imperative)
1. Run: `kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10`
2. Check: `kubectl get hpa` and `kubectl describe hpa php-apache`
3. TARGETS may show `<unknown>` initially — wait 30 seconds for metrics to arrive

This scales up when average CPU exceeds 50% of requests, and down when it drops below.

**Verify:** What does the TARGETS column show?

---

##### Task 5: Generate Load and Watch Autoscaling
1. Start a load generator: `kubectl run load-generator --image=busybox:1.36 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://php-apache; done"`
2. Watch HPA: `kubectl get hpa php-apache --watch`
3. Over 1-3 minutes, CPU climbs above 50%, replicas increase, CPU stabilizes
4. Stop the load: `kubectl delete pod load-generator`
5. Scale-down is slow (5-minute stabilization window) — you do not need to wait

**Verify:** How many replicas did HPA scale to under load?

---

##### Task 6: Create an HPA from YAML (Declarative)
1. Delete the imperative HPA: `kubectl delete hpa php-apache`
2. Write an HPA manifest using `autoscaling/v2` API with CPU target at 50% utilization
3. Add a `behavior` section to control scale-up speed (no stabilization) and scale-down speed (300 second window)
4. Apply and verify with `kubectl describe hpa`

`autoscaling/v2` supports multiple metrics and fine-grained scaling behavior that the imperative command cannot configure.

**Verify:** What does the `behavior` section control?

---

##### Task 7: Clean Up
Delete the HPA, Service, Deployment, and load-generator pod. Leave the Metrics Server installed.

---

#### Hints
- HPA requires `resources.requests` — without them TARGETS shows `<unknown>`
- `kubectl top` = actual usage. `kubectl describe pod` = configured requests/limits
- HPA checks every 15 seconds. Scale-up is fast, scale-down has a 5-minute stabilization window
- `autoscaling/v1` = CPU only. `autoscaling/v2` = CPU + memory + custom metrics
- Formula: `desiredReplicas = ceil(currentReplicas * (currentUsage / targetUsage))`
- HPA works with Deployments, StatefulSets, and ReplicaSets

---

#### Documentation
Create `day-58-metrics-hpa.md` with:
- What the Metrics Server is and why HPA needs it
- How HPA calculates desired replicas
- The difference between `autoscaling/v1` and `v2`
- Screenshots of `kubectl top`, HPA events, and pod scaling

---

#### Submission
1. Add `day-58-metrics-hpa.md` to `2026/day-58/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Set up Kubernetes HPA today. Watched my app auto-scale from 1 to multiple replicas under load, then scale back down. This is how production handles variable traffic."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 58 – Metrics Server and Horizontal Pod Autoscaler (HPA) — Notes & Solution

#### Task
Yesterday you set resource requests and limits. Today you put that to work. Install the Metrics Server so Kubernetes can see actual resource usage, then set up a Horizontal Pod Autoscaler that scales your app up under load and back down when things calm down.

---

#### Challenge Tasks

##### Task 1: Install the Metrics Server
1. Check if it is already running: `kubectl get pods -n kube-system | grep metrics-server`
2. If not, install it:
   - Minikube: `minikube addons enable metrics-server`
   - Kind/kubeadm: apply the official manifest from the metrics-server GitHub releases
3. On local clusters, you may need the `--kubelet-insecure-tls` flag (never in production)
4. Wait 60 seconds, then verify: `kubectl top nodes` and `kubectl top pods -A`

**Verify:** What is the current CPU and memory usage of your node?

- Current node utilization is low: CPU usage is 0–2% and memory usage is 2–8% across nodes.

- Here is the correct, up-to-date URL to deploy the Metrics Server:- kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

1. The Patch Command

`
kubectl patch deployment metrics-server -n kube-system \
  --type='json' \
  -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
`
<img width="1519" height="600" alt="Screenshot 2026-10-12 110715" src="https://github.com/user-attachments/assets/a1a8c38a-f016-44ac-aa5f-27fdef4fba91" />


---

##### Task 2: Explore kubectl top
1. Run `kubectl top nodes`, `kubectl top pods -A`, `kubectl top pods -A --sort-by=cpu`
2. `kubectl top` shows real-time usage, not requests or limits — these are different things
3. Data comes from the Metrics Server, which polls kubelets every 15 seconds

**Verify:** Which pod is using the most CPU right now?

- `kube-apiserver-devops-cluster-control-plane` Pod using the most CPU

<img width="1919" height="692" alt="Screenshot 2026-10-12 111106" src="https://github.com/user-attachments/assets/2146237d-243d-4d31-bdd8-267f675dca1c" />


---

##### Task 3: Create a Deployment with CPU Requests
1. Write a Deployment manifest using the `registry.k8s.io/hpa-example` image (a CPU-intensive PHP-Apache server)
2. Set `resources.requests.cpu: 200m` — HPA needs this to calculate utilization percentages
3. Expose it as a Service: `kubectl expose deployment php-apache --port=80`

Without CPU requests, HPA cannot work — this is the most common HPA setup mistake.

**Verify:** What is the current CPU usage of the Pod?

- Current CPU Usage is: 1m

<img width="1919" height="539" alt="Screenshot 2026-10-12 111319" src="https://github.com/user-attachments/assets/5fc37e4b-5cf5-4e3c-bac5-5e49559848cd" />


---

##### Task 4: Create an HPA (Imperative)
1. Run: `kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10`
2. Check: `kubectl get hpa` and `kubectl describe hpa php-apache`
3. TARGETS may show `<unknown>` initially — wait 30 seconds for metrics to arrive

This scales up when average CPU exceeds 50% of requests, and down when it drops below.

**Verify:** What does the TARGETS column show?

- `TARGETS column show:` current usage (1m) vs desired target(50m)

<img width="1800" height="296" alt="Screenshot 2026-10-12 111357" src="https://github.com/user-attachments/assets/fb31123f-e35d-45ec-867e-7ce8d8f0230a" />

---

##### Task 5: Generate Load and Watch Autoscaling
1. Start a load generator: `kubectl run load-generator --image=busybox:1.36 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://php-apache; done"`
2. Watch HPA: `kubectl get hpa php-apache --watch`
3. Over 1-3 minutes, CPU climbs above 50%, replicas increase, CPU stabilizes
4. Stop the load: `kubectl delete pod load-generator`
5. Scale-down is slow (5-minute stabilization window) — you do not need to wait

**Verify:** How many replicas did HPA scale to under load?

- It scaled to max=10 replicas under load.
<img width="1919" height="403" alt="Screenshot 2026-10-12 111621" src="https://github.com/user-attachments/assets/3ee0a51f-e5fa-4820-a7c0-6ffd6606f7e7" />



- After load removed

<img width="1196" height="261" alt="Screenshot 2026-10-12 111819" src="https://github.com/user-attachments/assets/bb82d3fb-cf29-43b2-8166-9bb9b9d8dc74" />


---

##### Task 6: Create an HPA from YAML (Declarative)
1. Delete the imperative HPA: `kubectl delete hpa php-apache`
2. Write an HPA manifest using `autoscaling/v2` API with CPU target at 50% utilization
3. Add a `behavior` section to control scale-up speed (no stabilization) and scale-down speed (300 second window)
4. Apply and verify with `kubectl describe hpa`

`autoscaling/v2` supports multiple metrics and fine-grained scaling behavior that the imperative command cannot configure.

**Verify:** What does the `behavior` section control?

- The behavior section controls how the HPA scales pods up and down.
- `Stabilization window:` how long to wait before scaling up or down
- `Policies:` limit how many pods can be added or removed
- `Percent:` scale based on percentage
- `Pods:` scale by a fixed number
- `periodSeconds:` minimum time between scaling actions

<img width="1919" height="672" alt="Screenshot 2026-10-12 112027" src="https://github.com/user-attachments/assets/5e03ee98-2186-4394-8204-0ac5fa369ca3" />


---

##### Task 7: Clean Up
Delete the HPA, Service, Deployment, and load-generator pod. Leave the Metrics Server installed.

<img width="967" height="415" alt="Screenshot 2026-10-12 112156" src="https://github.com/user-attachments/assets/6c2b73b9-5861-4bdd-9975-f92a79396706" />

---

**What the Metrics Server is and why HPA needs it**

- Metrics Server collects real-time CPU and memory usage from nodes and pods.
- HPA uses this data to decide when to scale pods up or down based on actual resource usage.

**How HPA calculates desired replicas**

- desiredReplicas = ceil(currentReplicas * (currentUsage / targetUsage))

**The difference between `autoscaling/v1` and `v2`**

`autoscaling/v1`
- Supports only CPU-based scaling
- Basic configuration

`autoscaling/v2`
- Supports multiple metrics (CPU,memory,custom)
- Advanced behavior control (scale-up/down rules)

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document `count` vs `for_each` pitfalls. | You can demonstrate, without notes: *use multiple providers and resources* — with evidence committed to `day-58/`. |
| 2 | Add tags via `default_tags` in provider. | You can demonstrate, without notes: *understand implicit/explicit dependencies* — with evidence committed to `day-58/`. |
| 3 | Practice `moved` blocks for refactoring. | You can demonstrate, without notes: *control change behaviour with lifecycle rules* — with evidence committed to `day-58/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cycle error | Circular references; break dependency. |
| count index shifts destroy resources | Prefer `for_each` with stable keys. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Review plans for IAM/SG widening; use `prevent_destroy` for stateful resources.
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

1. count vs for_each?
2. What does `depends_on` do?
3. What does `prevent_destroy` do?
4. How do you refactor safely?
5. **Scenario:** A rename of a resource attribute will recreate your database. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a network with refs? | ☐ | ☐ | ☐ | ☐ |
| Can I read replacement plans? | ☐ | ☐ | ☐ | ☐ |
| Can I use for_each? | ☐ | ☐ | ☐ | ☐ |
| Use multiple providers and resources | ☐ | ☐ | ☐ | ☐ |
| Understand implicit/explicit dependencies | ☐ | ☐ | ☐ | ☐ |
| Control change behaviour with lifecycle rules | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-58/` in your own repository:

```text
day-58/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-58
git add day-58/
git commit -m "day-58: terraform"
git push -u origin day-58
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

## 18. Challenge Notes — Day 58: Automating Backups and Notifications

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 58** of the DevOps 90-Day Challenge!
Data is the most valuable asset in any organization. Today, we learn how to **automate backups** and set up notifications to ensure you never lose data and are always informed of system health.

[![](https://img.youtube.com/vi/J3u5KsIrmx4/0.jpg)](https://www.youtube.com/watch?v=J3u5KsIrmx4)


[Watch the video](https://www.youtube.com/watch?v=J3u5KsIrmx4)  

---

#### Objective

By the end of this session, you will:

* Understand the importance of **Disaster Recovery (DR)**.
* Automate **EBS Snapshots** using Data Lifecycle Manager (DLM).
* Automate **RDS Backups** and configure retention.
* Use **AWS Backup** for centralized compliance.
* Set up **SNS Alerts** for backup failures.

---

#### Tools Used

* **Amazon EC2 (EBS)**
* **Amazon RDS**
* **AWS Backup**
* **Amazon Data Lifecycle Manager (DLM)**
* **Amazon SNS**

---

#### Key Concepts

##### 1. Snapshot vs Backup
*   **EBS Snapshot**: A point-in-time copy of your disk volume. First snapshot is full; subsequent ones are incremental (only changes are saved).
*   **AWS Backup**: A managed service that orchestrates backups across EC2, RDS, DynamoDB, EFS, and more from a single console.

##### 2. Recovery Point Objective (RPO)
"How much data can we afford to lose?"
If you backup every 24 hours, your RPO is 24 hours.

##### 3. Recovery Time Objective (RTO)
"How long does it take to restore?"
If it takes 4 hours to restore the database from a snapshot, your RTO is 4 hours.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Lifecycle Policy** | "Take a snapshot every 12 hours, keep for 7 days." |
| **Cross-Region Copy** | Automatically copying backups to `us-west-1` for disaster recovery. |
| **SNS Topic** | `Backup-Alerts` topic that emails admins if a job fails. |

---

#### Bonus (Extra Learning)

*   Restore an EC2 instance from a snapshot you just created.
*   Enable **Backup Vault Lock** to prevent anyone (even root!) from deleting backups for a set period (WORM compliance).

---

#### Congratulations!

You’ve properly protected your infrastructure. Automation isn't just about deploying code; it's about **protecting** what you've deployed.

---

#### Try These Next

*   Simulate a "database failure" and restore your RDS instance to a new endpoint.
*   Write a Lambda function that deletes snapshots older than 30 days (manual cleanup vs DLM).

## 19. Cohort Practice — Day 58: Metrics Server and Horizontal Pod Autoscaler (HPA)

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Yesterday you set resource requests and limits. Today you put that to work. Install the Metrics Server so Kubernetes can see actual resource usage, then set up a Horizontal Pod Autoscaler that scales your app up under load and back down when things calm down.

---

#### Expected Output
- Metrics Server installed and `kubectl top` returning data
- An HPA that auto-scales pods under load
- A markdown file: `day-58-metrics-hpa.md`

---

#### Challenge Tasks

##### Task 1: Install the Metrics Server
1. Check if it is already running: `kubectl get pods -n kube-system | grep metrics-server`
2. If not, install it:
   - Minikube: `minikube addons enable metrics-server`
   - Kind/kubeadm: apply the official manifest from the metrics-server GitHub releases
3. On local clusters, you may need the `--kubelet-insecure-tls` flag (never in production)
4. Wait 60 seconds, then verify: `kubectl top nodes` and `kubectl top pods -A`

**Verify:** What is the current CPU and memory usage of your node?

---

##### Task 2: Explore kubectl top
1. Run `kubectl top nodes`, `kubectl top pods -A`, `kubectl top pods -A --sort-by=cpu`
2. `kubectl top` shows real-time usage, not requests or limits — these are different things
3. Data comes from the Metrics Server, which polls kubelets every 15 seconds

**Verify:** Which pod is using the most CPU right now?

---

##### Task 3: Create a Deployment with CPU Requests
1. Write a Deployment manifest using the `registry.k8s.io/hpa-example` image (a CPU-intensive PHP-Apache server)
2. Set `resources.requests.cpu: 200m` — HPA needs this to calculate utilization percentages
3. Expose it as a Service: `kubectl expose deployment php-apache --port=80`

Without CPU requests, HPA cannot work — this is the most common HPA setup mistake.

**Verify:** What is the current CPU usage of the Pod?

---

##### Task 4: Create an HPA (Imperative)
1. Run: `kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10`
2. Check: `kubectl get hpa` and `kubectl describe hpa php-apache`
3. TARGETS may show `<unknown>` initially — wait 30 seconds for metrics to arrive

This scales up when average CPU exceeds 50% of requests, and down when it drops below.

**Verify:** What does the TARGETS column show?

---

##### Task 5: Generate Load and Watch Autoscaling
1. Start a load generator: `kubectl run load-generator --image=busybox:1.36 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://php-apache; done"`
2. Watch HPA: `kubectl get hpa php-apache --watch`
3. Over 1-3 minutes, CPU climbs above 50%, replicas increase, CPU stabilizes
4. Stop the load: `kubectl delete pod load-generator`
5. Scale-down is slow (5-minute stabilization window) — you do not need to wait

**Verify:** How many replicas did HPA scale to under load?

---

##### Task 6: Create an HPA from YAML (Declarative)
1. Delete the imperative HPA: `kubectl delete hpa php-apache`
2. Write an HPA manifest using `autoscaling/v2` API with CPU target at 50% utilization
3. Add a `behavior` section to control scale-up speed (no stabilization) and scale-down speed (300 second window)
4. Apply and verify with `kubectl describe hpa`

`autoscaling/v2` supports multiple metrics and fine-grained scaling behavior that the imperative command cannot configure.

**Verify:** What does the `behavior` section control?

---

##### Task 7: Clean Up
Delete the HPA, Service, Deployment, and load-generator pod. Leave the Metrics Server installed.

---

#### Hints
- HPA requires `resources.requests` — without them TARGETS shows `<unknown>`
- `kubectl top` = actual usage. `kubectl describe pod` = configured requests/limits
- HPA checks every 15 seconds. Scale-up is fast, scale-down has a 5-minute stabilization window
- `autoscaling/v1` = CPU only. `autoscaling/v2` = CPU + memory + custom metrics
- Formula: `desiredReplicas = ceil(currentReplicas * (currentUsage / targetUsage))`
- HPA works with Deployments, StatefulSets, and ReplicaSets

---

#### Documentation
Create `day-58-metrics-hpa.md` with:
- What the Metrics Server is and why HPA needs it
- How HPA calculates desired replicas
- The difference between `autoscaling/v1` and `v2`
- Screenshots of `kubectl top`, HPA events, and pod scaling

---

#### Submission
1. Add `day-58-metrics-hpa.md` to `2026/day-58/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Set up Kubernetes HPA today. Watched my app auto-scale from 1 to multiple replicas under load, then scale back down. This is how production handles variable traffic."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 58: Prometheus Stack on EKS (kube-prometheus-stack)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Install kube-prometheus-stack with env overrides, ServiceMonitor/PodMonitor examples, custom rules, scripts, and a Jenkinsfile.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [alerts/custom-rules.yaml](files/hands-on-projects/alerts/custom-rules.yaml)
- [helm/values-common.yaml](files/hands-on-projects/helm/values-common.yaml)
- [helm/values-prod.yaml](files/hands-on-projects/helm/values-prod.yaml)
- [helm/values-staging.yaml](files/hands-on-projects/helm/values-staging.yaml)
- [k8s/podmonitor-demo.yaml](files/hands-on-projects/k8s/podmonitor-demo.yaml)
- [k8s/servicemonitor-demo.yaml](files/hands-on-projects/k8s/servicemonitor-demo.yaml)
- [scripts/add_repo.sh](files/hands-on-projects/scripts/add_repo.sh)
- [scripts/deploy.sh](files/hands-on-projects/scripts/deploy.sh)
- [scripts/get_admin_pw.sh](files/hands-on-projects/scripts/get_admin_pw.sh)
- [scripts/port_forward.sh](files/hands-on-projects/scripts/port_forward.sh)
- [scripts/template.sh](files/hands-on-projects/scripts/template.sh)


---

[← Day 57](../day-57/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 59 →](../day-59/README.md)
