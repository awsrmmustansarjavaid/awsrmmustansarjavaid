# Day 60 — Terraform State, Remote Backends, Locking & Import

[← Day 59](../day-59/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 61 →](../day-61/README.md)

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

- [ ] Explain what state is and why it is sensitive
- [ ] Configure S3 remote backend with locking and encryption
- [ ] Import and move existing resources

## 2. Prerequisites

- Days 54, 57-59.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 State

Maps configuration to real resources; contains attributes including secrets. Local state doesn't scale to teams.

### 3.2 Remote backend

S3 bucket (versioned, encrypted, private) with native lockfile (`use_lockfile = true`) or DynamoDB lock table. Separate state per environment/component to reduce blast radius.

### 3.3 State operations

`state list/show/mv/rm`, `import` blocks, `moved` blocks, drift detection with `plan -refresh-only`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a bootstrap config for the state bucket (versioning, SSE, block public).
2. [ ] Migrate local state: `terraform init -migrate-state`.
3. [ ] Create a deliberate drift in console; detect with plan.
4. [ ] Import a manually created S3 bucket using `import` block.
5. [ ] Simulate a lock; understand `force-unlock` risk.

## 5. Real-World Scenario

> Two engineers ran `apply` at the same time and corrupted state. Make this impossible and describe recovery.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform {
  backend "s3" { bucket = "tfstate-123456789012" key = "lab/network/terraform.tfstate" region = "us-east-1" encrypt = true use_lockfile = true }
}
terraform init -migrate-state
terraform plan -refresh-only
import { to = aws_s3_bucket.legacy  id = "legacy-bucket-name" }
terraform plan -generate-config-out=generated.tf
terraform state mv aws_instance.old aws_instance.new
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Kubernetes Audit — E-commerce Application

#### Project Overview

This project deploys a three-tier e-commerce application on Kubernetes using:

* React + Nginx — Frontend
* Node.js + Express — Backend
* PostgreSQL — Database
* Docker — Containerization
* Kubernetes — Container orchestration
* KIND — Multi-node Kubernetes cluster
* NGINX Ingress — External access
* GitHub Actions — CI/CD

The following table documents the Kubernetes concepts implemented in this project, the evidence used to verify them, why each concept was used, and where the implementation can be found.

---

#### Kubernetes Audit Checklist

| Concept                             | Status | Evidence                                                                          | Why I used it                                                                                                                     | Where to look                                                                                 |
| ----------------------------------- | ------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **1. Deployment + ReplicaSet**      | ✅ Done | `kubectl get deployments -n ecommerce` and `kubectl get replicasets -n ecommerce` | Deployments maintain the desired number of application Pods and provide controlled application updates.                           | `k8s/backend/deployment.yaml`, `k8s/frontend/deployment.yaml`, `k8s/database/deployment.yaml` |
| **2. Service**                      | ✅ Done | `kubectl get services -n ecommerce`                                               | Services provide stable networking and service discovery for communication between application components.                        | `k8s/backend/service.yaml`, `k8s/frontend/service.yaml`, `k8s/database/service.yaml`          |
| **3. Namespace**                    | ✅ Done | `kubectl get namespace ecommerce`                                                 | A dedicated namespace isolates all e-commerce application resources from other workloads.                                         | `k8s/namespace.yaml`                                                                          |
| **4. Labels & Selectors**           | ✅ Done | `kubectl get pods -n ecommerce --show-labels`                                     | Labels identify resources and selectors allow Services and Deployments to target the correct Pods.                                | Deployment and Service manifests under `k8s/`                                                 |
| **5. Rolling Update + Rollback**    | ✅ Done | `kubectl rollout history deployment/ecommerce-backend -n ecommerce`               | Rolling updates allow new versions to be deployed gradually with minimal downtime, while rollback provides a recovery mechanism.  | `k8s/backend/deployment.yaml`                                                                 |
| **6. ConfigMap**                    | ✅ Done | `kubectl get configmap -n ecommerce`                                              | ConfigMaps keep non-sensitive application configuration separate from container images and application code.                      | `k8s/backend/configmap.yaml`                                                                  |
| **7. Secret**                       | ✅ Done | `kubectl get secrets -n ecommerce`                                             | Secrets are used to store sensitive database credentials instead of exposing them directly in application configuration.          | `k8s/database/secret.yaml`                                                                    |
| **8. Resource Requests & Limits**   | ❌ Notdone | `kubectl describe pod -n ecommerce`                                            | CPU and memory requests/limits provide predictable resource allocation and prevent a workload from consuming unlimited resources. | Deployment manifests under `k8s/backend/` and `k8s/frontend/`                                 |
| **9. Liveness & Readiness Probes**  | ✅ Done | `kubectl describe pod <pod-name> -n ecommerce`                                    | Probes allow Kubernetes to detect unhealthy containers and prevent traffic from reaching Pods that are not ready.                 | Backend and frontend Deployment manifests                                                     |
| **10. PersistentVolumeClaim (PVC)** | ✅ Done | `kubectl get pvc -n ecommerce`                                                    | A PVC provides persistent storage for PostgreSQL so database data is not tied to the lifetime of a Pod.                           | `k8s/database/pvc.yaml`                                                                       |
| **11. Ingress**                     | ✅ Done | `kubectl get ingress -n ecommerce`                                                | Ingress provides HTTP/HTTPS routing from outside the cluster to the frontend application.                                         | `k8s/ingress.yaml`                                                                            |
| **12. Multi-node Cluster**          | ❌ Notdone | `kubectl get nodes -o wide`                                                    | A multi-node cluster demonstrates Kubernetes scheduling across multiple worker nodes and improves workload distribution.          | `kind/kind-config.yaml`                                                                       |
| **13. HPA**                         | ✅ Done | `kubectl get hpa -n ecommerce`                                                    | Horizontal Pod Autoscaler automatically adjusts backend replicas based on resource utilization.                                   | `k8s/backend/hpa.yaml`                                                                        |
| **14. RBAC + ServiceAccount**       | ✅ Done | `kubectl get serviceaccount,role,rolebinding -n ecommerce`                        | RBAC follows the principle of least privilege by giving workloads only the Kubernetes permissions they need.                      | `k8s/rbac/`                                                                                   |
| **15. CronJob**                     | ✅ Done | `kubectl get cronjobs -n ecommerce`                                               | CronJob demonstrates scheduled Kubernetes workloads for periodic maintenance or health-check tasks.                               | `k8s/cronjob.yaml`                                                                            |
| **16. GitHub Actions**              | ✅ Done | GitHub Actions workflow execution                                                 | GitHub Actions automates the build and Kubernetes deployment/validation process.                                                  | `.github/workflows/`                                                                          |

---

#### Detailed Evidence

#### 1. Deployment + ReplicaSet

##### Evidence

```bash
kubectl get deployments -n ecommerce
kubectl get replicasets -n ecommerce
kubectl get pods -n ecommerce
```
<img width="1204" height="364" alt="Screenshot 2026-10-07 211124" src="https://github.com/user-attachments/assets/1b1b51bd-57b1-4cec-a6ae-bb5ba57cdff9" />

##### Expected

You should see Deployments for the frontend, backend and database workloads, along with ReplicaSets created by the Deployments.

##### Why

Deployments provide declarative application management and automatically create ReplicaSets to maintain the desired number of Pods.

##### Where to look

```text
k8s/backend/deployment.yaml
k8s/frontend/deployment.yaml
k8s/database/deployment.yaml
```

---

#### 2. Service

##### Evidence

```bash
kubectl get services -n ecommerce
```

<img width="915" height="158" alt="Screenshot 2026-10-07 220352" src="https://github.com/user-attachments/assets/e02dc2d6-025f-4958-aa36-0a372bb0b3f0" />

##### Why

Services provide stable DNS names and networking between the frontend, backend and database.

For example:

```text
frontend
backend
postgres
```

##### Where to look

```text
k8s/frontend/service.yaml
k8s/backend/service.yaml
k8s/database/service.yaml
```

---

#### 3. Namespace

##### Evidence

```bash
kubectl get namespace ecommerce
```
<img width="908" height="103" alt="Screenshot 2026-10-07 220440" src="https://github.com/user-attachments/assets/9b4cd11f-3ee8-4b58-8249-196dbf77ac41" />

##### Why

The `ecommerce` namespace provides logical isolation for all application resources.

##### Where to look

```text
k8s/namespace.yaml
```

---

#### 4. Labels & Selectors

##### Evidence

```bash
kubectl get pods -n ecommerce --show-labels
```
<img width="1898" height="353" alt="Screenshot 2026-10-07 220534" src="https://github.com/user-attachments/assets/b1c5bbf0-0c39-4966-b2a3-7e129e787a1b" />

Also:

```bash
kubectl get services -n ecommerce -o yaml
```
<img width="1905" height="776" alt="Screenshot 2026-10-07 220644" src="https://github.com/user-attachments/assets/2f899f37-6dd6-4101-b279-abbdd9731c65" />

##### Why

Labels identify workloads while selectors allow Services and Deployments to find the correct Pods.

Example:

```yaml
labels:
  app: ecommerce-backend
```

and:

```yaml
selector:
  app: ecommerce-backend
```

##### Where to look

```text
k8s/backend/deployment.yaml
k8s/backend/service.yaml
k8s/frontend/deployment.yaml
k8s/frontend/service.yaml
```

---

#### 5. Rolling Update + Rollback

##### Evidence

```bash
kubectl rollout status deployment/ecommerce-backend -n ecommerce
kubectl rollout history deployment/ecommerce-backend -n ecommerce
```

Rollback command:

```bash
kubectl rollout undo deployment/ecommerce-backend -n ecommerce
```
<img width="1292" height="118" alt="Screenshot 2026-10-07 220750" src="https://github.com/user-attachments/assets/06250bf1-0ed2-4887-b394-523dca5fe8d2" />

##### Why

Rolling updates allow application versions to change without taking the entire application offline. Rollback provides a quick recovery mechanism if the new version causes problems.

##### Where to look

```text
k8s/backend/deployment.yaml
```

---

#### 6. ConfigMap

##### Evidence

```bash
kubectl get configmaps -n ecommerce
kubectl describe configmap ecommerce-backend-config -n ecommerce
```
<img width="1919" height="729" alt="Screenshot 2026-10-07 221117" src="https://github.com/user-attachments/assets/4933d75f-b842-4a09-be89-526100ebf317" />

##### Why

ConfigMap stores non-sensitive configuration separately from application code and container images.

Examples include:

```text
NODE_ENV
PORT
DATABASE_HOST
DATABASE_PORT
DATABASE_NAME
```

##### Where to look

```text
k8s/backend/configmap.yaml
```

---

#### 7. Secret

##### Evidence

```bash
kubectl get secrets -n ecommerce
```

To inspect the Secret structure without exposing values:

```bash
kubectl describe secret ecommerce-db-secret -n ecommerce
```
<img width="1332" height="427" alt="Screenshot 2026-10-07 210453" src="https://github.com/user-attachments/assets/a7f7d4e7-fd58-46dc-a548-8e8dbe061fd9" />

##### Why

Database usernames and passwords are sensitive information, so Kubernetes Secrets are used instead of putting credentials directly into the application Deployment.

##### Where to look

```text
k8s/database/secret.yaml
```

> Secret values should not be exposed in screenshots, README files, GitHub issues, or public repositories.

---

#### 8. Resource Requests & Limits

##### Evidence

```bash
kubectl describe pod <backend-pod-name> -n ecommerce
```

Or:

```bash
kubectl get deployment ecommerce-backend -n ecommerce -o yaml
```

##### Why

Resource requests help Kubernetes schedule Pods correctly, while limits prevent a container from consuming excessive CPU or memory.

Example:

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

##### Where to look

```text
k8s/backend/deployment.yaml
k8s/frontend/deployment.yaml
```

---

#### 9. Liveness & Readiness Probes

##### Evidence

```bash
kubectl describe pod <backend-pod-name> -n ecommerce
```

Look for:

```text
Liveness
Readiness
```

You can also check:

```bash
kubectl get pods -n ecommerce
```

##### Why

* **Readiness probe:** Determines whether a Pod is ready to receive traffic.
* **Liveness probe:** Determines whether a container is healthy and needs to be restarted.

##### Where to look

```text
k8s/backend/deployment.yaml
k8s/frontend/deployment.yaml
```

---

#### 10. PersistentVolumeClaim

##### Evidence

```bash
kubectl get pvc -n ecommerce
kubectl get pv
```
<img width="1910" height="215" alt="Screenshot 2026-10-07 221605" src="https://github.com/user-attachments/assets/042617d4-15f8-484e-8555-c0fdaf2e9fd3" />

##### Why

PostgreSQL requires persistent storage so database data can survive Pod recreation.

The PVC requests persistent storage from Kubernetes.

##### Where to look

```text
k8s/database/pvc.yaml
```

---

#### 11. Ingress

##### Evidence

```bash
kubectl get ingress -n ecommerce
kubectl describe ingress ecommerce-ingress -n ecommerce
```
<img width="1312" height="405" alt="Screenshot 2026-10-07 221700" src="https://github.com/user-attachments/assets/4a141ee7-cf7f-4171-a440-88b57980620f" />

##### Why

Ingress provides external HTTP routing to the application and allows users to access the e-commerce frontend through a hostname.

Example:

```text
ecommerce.localtest.me
```

##### Where to look

```text
k8s/ingress.yaml
```

---

#### 12. Multi-node Cluster

##### Evidence

```bash
kubectl get nodes -o wide
```
<img width="1905" height="344" alt="Screenshot 2026-10-07 203708" src="https://github.com/user-attachments/assets/e83b1deb-ff12-4522-bcf4-216f3284e5d2" />

##### Expected

The KIND cluster should contain multiple nodes, for example:

```text
kind-audit-control-plane

```

##### Why

A multi-node cluster demonstrates Kubernetes scheduling and workload distribution across multiple nodes.

##### Where to look

```text
kind/kind-config.yaml
```

---

#### 13. Horizontal Pod Autoscaler

##### Evidence

```bash
kubectl get hpa -n ecommerce
```

Detailed information:

```bash
kubectl describe hpa ecommerce-backend-hpa -n ecommerce
```
<img width="1267" height="124" alt="Screenshot 2026-10-07 221846" src="https://github.com/user-attachments/assets/78801d25-7c41-4318-9138-6c1b7eba79ec" />

##### Why

HPA automatically increases or decreases backend replicas based on CPU utilization, allowing the application to respond to changing workload.

##### Where to look

```text
k8s/backend/hpa.yaml
```

---

#### 14. RBAC + ServiceAccount

##### Evidence

```bash
kubectl get serviceaccounts -n ecommerce
kubectl get roles -n ecommerce
kubectl get rolebindings -n ecommerce
```
<img width="1200" height="357" alt="Screenshot 2026-10-07 221949" src="https://github.com/user-attachments/assets/ee5ce160-ae65-4530-aec6-492f968cf000" />

##### Why

RBAC limits what the application's ServiceAccount can access inside the Kubernetes API, following the principle of least privilege.

##### Where to look

```text
k8s/rbac/serviceaccount.yaml
k8s/rbac/role.yaml
k8s/rbac/rolebinding.yaml
```

---

#### 15. CronJob

##### Evidence

```bash
kubectl get cronjobs -n ecommerce
kubectl get jobs -n ecommerce
```

Detailed information:

```bash
kubectl describe cronjob ecommerce-db-healthcheck -n ecommerce
```

##### Why

The CronJob demonstrates how Kubernetes can run scheduled tasks automatically, such as periodic database health checks or maintenance operations.

##### Where to look

```text
k8s/cronjob.yaml
```

---

#### 16. GitHub Actions

##### Evidence

Check the GitHub repository:

```text
Actions → Workflows → Kubernetes CI/CD
```

The workflow should show a successful run.

##### Why

GitHub Actions automates application validation and Kubernetes deployment tasks, reducing manual deployment steps and improving consistency.

##### Where to look

```text
.github/workflows/
```

---

#### Final Verification Commands

Run these commands before submitting the assignment:

```bash
kubectl get all -n ecommerce
```

```bash
kubectl get configmaps,secrets,pvc,hpa,serviceaccounts,roles,rolebindings,cronjobs -n ecommerce
```

```bash
kubectl get ingress -n ecommerce
```

```bash
kubectl get nodes -o wide
```

```bash
kubectl get pods -n ecommerce -o wide
```

```bash
kubectl get deployments -n ecommerce
```

```bash
kubectl get replicasets -n ecommerce
```

---

#### Audit Summary

This Kubernetes deployment demonstrates the use of core Kubernetes resources and operational practices required for a production-oriented application.

The e-commerce application has been structured into separate frontend, backend and database workloads and deployed inside the `ecommerce` namespace.

The project demonstrates:

* Containerized application deployment
* Kubernetes Deployments and ReplicaSets
* Service discovery
* Namespace isolation
* Labels and selectors
* Rolling updates and rollback
* Configuration management
* Secret management
* Resource management
* Health checks
* Persistent storage
* Ingress-based routing
* Multi-node Kubernetes architecture
* Horizontal autoscaling
* RBAC and least privilege
* Scheduled workloads
* CI/CD automation

<img width="1919" height="739" alt="Screenshot 2026-10-07 213827" src="https://github.com/user-attachments/assets/ef99cedd-6fc7-4d95-807b-b115a548b4b8" />

---

#### Important Note

The status of each item should be marked `✅ Done` **only after the corresponding resource has actually been deployed and verified using the evidence command**.

If a feature has been configured but not successfully tested, change its status to:

```text
⚠️ Configured - Verification Pending
```

This keeps the audit accurate and demonstrates genuine understanding rather than simply listing Kubernetes resources.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a state-management policy. | You can demonstrate, without notes: *explain what state is and why it is sensitive* — with evidence committed to `day-60/`. |
| 2 | Document state-per-environment layout. | You can demonstrate, without notes: *configure S3 remote backend with locking and encryption* — with evidence committed to `day-60/`. |
| 3 | Restore a previous state version from S3 versioning. | You can demonstrate, without notes: *import and move existing resources* — with evidence committed to `day-60/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Error acquiring the state lock` | Another run active or crashed; verify then `force-unlock` carefully. |
| State drift | Decide: update code or revert resource; never ignore silently. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Encrypt and restrict state access via IAM; enable bucket versioning; audit access; treat state as secret.
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

1. Why remote state?
2. How does locking work?
3. What is drift?
4. When use `terraform import`?
5. **Scenario:** Two engineers ran `apply` at the same time and corrupted state. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I configure remote state? | ☐ | ☐ | ☐ | ☐ |
| Can I detect drift? | ☐ | ☐ | ☐ | ☐ |
| Can I import a resource? | ☐ | ☐ | ☐ | ☐ |
| Explain what state is and why it is sensitive | ☐ | ☐ | ☐ | ☐ |
| Configure S3 remote backend with locking and encryption | ☐ | ☐ | ☐ | ☐ |
| Import and move existing resources | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-60/` in your own repository:

```text
day-60/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-60
git add day-60/
git commit -m "day-60: terraform state, remote backends, locking & import"
git push -u origin day-60
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

## 18. Challenge Notes — Day 60: Observability with OpenTelemetry

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 60** of the DevOps 90-Day Challenge!
Today, we explore the modern standard for observability: **OpenTelemetry (OTel)**. Gone are the days of proprietary agents for every tool. OTel provides a unified way to collect traces, metrics, and logs.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand the "Three Pillars of Observability": **Metrics**, **Logs**, and **Traces**.
* Learn what **OpenTelemetry** is and why it's the future.
* Instrument a simple Python/Node.js app to send Traces.
* connect OTel to a backend like **Jaeger** or **Prometheus**.

---

#### Tools Used

* **OpenTelemetry SDK**
* **Jaeger** (Tracing Backend)
* **Docker** (to run Jaeger locally)
* **Python** (Sample App)

---

#### Key Concepts

##### 1. Monitoring vs Observability
*   **Monitoring**: "Is the system healthy?" (Yes/No). Dashboard tells you consumption is high.
*   **Observability**: "Why is the system behaving this way?" (Debugging). Traces tell you *which* database query caused the consumption spike.

##### 2. Distributed Tracing
In microservices, a single user request hits 10 different services. A **Trace** tracks that request across all of them using a unique **Trace ID**.
*   **Span**: A single unit of work (e.g., "Query Database", "Call Payment API").

##### 3. The Collector
The **OTel Collector** allows you to receive data in one format and export it to multiple backends (Jaeger, Datadog, New Relic) without changing your application code.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Instrumentation** | Adding code (`tracer.start_span`) to measure function duration. |
| **Context Propagation** | Passing the Trace ID from Service A to Service B via HTTP Headers. |
| **Exporters** | Sending the collected data to the Jaeger UI for visualization. |

---

#### Bonus (Extra Learning)

*   Run Jaeger using Docker Compose: `docker run -d -p 16686:16686 jaegertracing/all-in-one`.
*   Explore **Auto-Instrumentation** agents that trace your code without you writing a single line.

---

#### Congratulations!

You’ve reached the 60-Day mark! You are now dealing with advanced reliability engineering concepts. Observability is what separates "Developers" from "DevOps Engineers".

---

#### Try These Next

*   Instrument a frontend application (React/Angular) to see user latency.
*   Connect OpenTelemetry to AWS X-Ray.

## 19. Cohort Practice — Day 60: Capstone: Deploy WordPress + MySQL on Kubernetes

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Ten days of Kubernetes — clusters, Pods, Deployments, Services, ConfigMaps, Secrets, storage, StatefulSets, resource management, autoscaling, and Helm. Today you put it all together. Deploy a real WordPress + MySQL application using every major concept you have learned.

---

#### Expected Output


- A complete WordPress + MySQL stack in a `capstone` namespace
- Self-healing and data persistence verified
- A markdown file: `day-60-capstone.md`
- Screenshot of the running WordPress site and `kubectl get all -n capstone`

---

#### Challenge Tasks

##### Task 1: Create the Namespace (Day 52)
1. Create a `capstone` namespace
2. Set it as your default: `kubectl config set-context --current --namespace=capstone`

---

##### Task 2: Deploy MySQL (Days 54-56)
1. Create a Secret with `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD` using `stringData`
2. Create a Headless Service (`clusterIP: None`) for MySQL on port 3306
3. Create a StatefulSet for MySQL with:
   - Image: `mysql:8.0`
   - `envFrom` referencing the Secret
   - Resource requests (cpu: 250m, memory: 512Mi) and limits (cpu: 500m, memory: 1Gi)
   - A `volumeClaimTemplates` section requesting 1Gi of storage, mounted at `/var/lib/mysql`
4. Verify MySQL works: `kubectl exec -it mysql-0 -- mysql -u <user> -p<password> -e "SHOW DATABASES;"`

**Verify:** Can you see the `wordpress` database?

---

##### Task 3: Deploy WordPress (Days 52, 54, 57)
1. Create a ConfigMap with `WORDPRESS_DB_HOST` set to `mysql-0.mysql.capstone.svc.cluster.local:3306` and `WORDPRESS_DB_NAME`
2. Create a Deployment with 2 replicas using `wordpress:latest` that:
   - Uses `envFrom` for the ConfigMap
   - Uses `secretKeyRef` for `WORDPRESS_DB_USER` and `WORDPRESS_DB_PASSWORD` from the MySQL Secret
   - Has resource requests and limits
   - Has a liveness probe and readiness probe on `/wp-login.php` port 80
3. Wait until both pods show `1/1 Running`

**Verify:** Are both WordPress pods running and ready?

---

##### Task 4: Expose WordPress (Day 53)
1. Create a NodePort Service on port 30080 targeting the WordPress pods
2. Access WordPress in your browser:
   - Minikube: `minikube service wordpress -n capstone`
   - Kind: `kubectl port-forward svc/wordpress 8080:80 -n capstone`
3. Complete the setup wizard and create a blog post

**Verify:** Can you see the WordPress setup page?

---

##### Task 5: Test Self-Healing and Persistence
1. Delete a WordPress pod — watch the Deployment recreate it within seconds. Refresh the site.
2. Delete the MySQL pod: `kubectl delete pod mysql-0 -n capstone` — watch the StatefulSet recreate it
3. After MySQL recovers, refresh WordPress — your blog post should still be there

**Verify:** After deleting both pods, is your blog post still there?

---

##### Task 6: Set Up HPA (Day 58)
1. Write an HPA manifest targeting the WordPress Deployment with CPU at 50%, min 2, max 10 replicas
2. Apply and check: `kubectl get hpa -n capstone`
3. Run `kubectl get all -n capstone` for the complete picture

**Verify:** Does the HPA show correct min/max and target?

---

##### Task 7: (Bonus) Compare with Helm (Day 59)
1. Install WordPress using `helm install wp-helm bitnami/wordpress` in a separate namespace
2. Compare: how many resources did each approach create? Which gives more control?
3. Clean up the Helm deployment

---

##### Task 8: Clean Up and Reflect
1. Take a final look: `kubectl get all -n capstone`
2. Count the concepts you used: Namespace, Secret, ConfigMap, PVC, StatefulSet, Headless Service, Deployment, NodePort Service, Resource Limits, Probes, HPA, Helm — twelve concepts in one deployment
3. Delete the namespace: `kubectl delete namespace capstone`
4. Reset default: `kubectl config set-context --current --namespace=default`

**Verify:** Did deleting the namespace remove everything?

---

#### Hints
- If MySQL takes long to start, check: `kubectl logs mysql-0 -n capstone`
- `WORDPRESS_DB_HOST` must match the StatefulSet DNS pattern: `<pod>.<service>.<namespace>.svc.cluster.local`
- WordPress probes may fail initially — `initialDelaySeconds` gives it time to boot
- If PVC stays Pending, check `kubectl get storageclass`
- `nodePort` must be in range 30000-32767
- The Bitnami chart uses MariaDB instead of MySQL — compatible but not identical

---

#### Documentation
Create `day-60-capstone.md` with:
- Architecture of your deployment (which resources connect to which)
- Results of self-healing and persistence tests
- A table mapping each concept to the day you learned it
- Reflection: what was hardest, what clicked, what you would add for production

---

#### Submission
1. Add `day-60-capstone.md` to `2026/day-60/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Completed the Kubernetes capstone — deployed WordPress + MySQL using twelve K8s concepts: Namespaces, Deployments, StatefulSets, Services, ConfigMaps, Secrets, PVCs, resource limits, probes, and HPA. Ten days of learning, one real application."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 60: OpenTelemetry Collector on EKS (OTLP → Prometheus/Grafana + AWS X-Ray/CloudWatch)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Gateway Deployment + Service + ServiceMonitor, IRSA-ready SA, pipelines for traces/metrics/logs.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [k8s/configmap.yaml](files/hands-on-projects/k8s/configmap.yaml)
- [k8s/deployment.yaml](files/hands-on-projects/k8s/deployment.yaml)
- [k8s/env-configmap.yaml](files/hands-on-projects/k8s/env-configmap.yaml)
- [k8s/namespace.yaml](files/hands-on-projects/k8s/namespace.yaml)
- [k8s/rbac.yaml](files/hands-on-projects/k8s/rbac.yaml)
- [k8s/service.yaml](files/hands-on-projects/k8s/service.yaml)
- [k8s/serviceaccount.yaml](files/hands-on-projects/k8s/serviceaccount.yaml)
- [k8s/servicemonitor.yaml](files/hands-on-projects/k8s/servicemonitor.yaml)
- [scripts/deploy.sh](files/hands-on-projects/scripts/deploy.sh)
- [scripts/status.sh](files/hands-on-projects/scripts/status.sh)


---

[← Day 59](../day-59/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 61 →](../day-61/README.md)
