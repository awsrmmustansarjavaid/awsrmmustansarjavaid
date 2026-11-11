# Day 56 — Azure Fundamentals for DevOps & Multi-Cloud Mapping

[← Day 55](../day-55/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 57 →](../day-57/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 8 — Cloud Engineering: AWS & Azure |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Map AWS concepts to Azure
- [ ] Use Azure CLI with resource groups, VNets and VMs
- [ ] Understand Entra ID, RBAC and Azure DevOps basics

## 2. Prerequisites

- Day 50-55; free Azure account.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Azure model

Tenant -> Management groups -> Subscriptions -> Resource groups -> Resources. Entra ID (identity), Azure RBAC (role assignments at scope), managed identities (no secrets).

### 3.2 Service mapping

EC2=VM, VPC=VNet, SG=NSG, S3=Blob Storage, RDS=Azure Database, ALB=Application Gateway/Load Balancer, CloudWatch=Azure Monitor, IAM roles=Managed identities, ECR=ACR, EKS=AKS.

### 3.3 Azure DevOps

Boards, Repos, Pipelines (YAML), Artifacts. Service connections with workload identity federation.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install `az` and log in; create resource group.
2. [ ] Create VNet/subnet/NSG; launch a small Linux VM with managed identity; SSH via key.
3. [ ] Assign Reader role at RG scope to a test user.
4. [ ] Create ACR and push an image.
5. [ ] Write the AWS<->Azure mapping table with 15 services.

## 5. Real-World Scenario

> Your company is multi-cloud after an acquisition. Produce a cheat sheet so AWS engineers can operate in Azure on day one.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
az login
az group create -n rg-lab -l westeurope
az network vnet create -g rg-lab -n vnet-lab --address-prefix 10.10.0.0/16 --subnet-name app --subnet-prefix 10.10.1.0/24
az vm create -g rg-lab -n vm1 --image Ubuntu2204 --size Standard_B1s --assign-identity --generate-ssh-keys
az role assignment create --assignee <user> --role Reader --scope /subscriptions/<id>/resourceGroups/rg-lab
az acr create -g rg-lab -n acrlab$RANDOM --sku Basic
az group delete -n rg-lab --yes --no-wait
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 56 – Kubernetes StatefulSets — Challenge Brief

#### Task
Deployments work great for stateless apps, but what about databases? You need stable pod names, ordered startup, and persistent storage per replica. Today you learn StatefulSets — the workload designed for stateful applications like MySQL, PostgreSQL, and Kafka.

---

#### Expected Output
- A StatefulSet with 3 replicas and stable pod names
- DNS resolution tested for individual pods
- Data persistence verified across pod deletion
- A markdown file: `day-56-statefulsets.md`

---

#### Challenge Tasks

##### Task 1: Understand the Problem
1. Create a Deployment with 3 replicas using nginx
2. Check the pod names — they are random (`app-xyz-abc`)
3. Delete a pod and notice the replacement gets a different random name

This is fine for web servers but not for databases where you need stable identity.

| Feature | Deployment | StatefulSet |
|---|---|---|
| Pod names | Random | Stable, ordered (`app-0`, `app-1`) |
| Startup order | All at once | Ordered: pod-0, then pod-1, then pod-2 |
| Storage | Shared PVC | Each pod gets its own PVC |
| Network identity | No stable hostname | Stable DNS per pod |

Delete the Deployment before moving on.

**Verify:** Why would random pod names be a problem for a database cluster?

---

##### Task 2: Create a Headless Service
1. Write a Service manifest with `clusterIP: None` — this is a Headless Service
2. Set the selector to match the labels you will use on your StatefulSet pods
3. Apply it and confirm CLUSTER-IP shows `None`

A Headless Service creates individual DNS entries for each pod instead of load-balancing to one IP. StatefulSets require this.

**Verify:** What does the CLUSTER-IP column show?

---

##### Task 3: Create a StatefulSet
1. Write a StatefulSet manifest with `serviceName` pointing to your Headless Service
2. Set replicas to 3, use the nginx image
3. Add a `volumeClaimTemplates` section requesting 100Mi of ReadWriteOnce storage
4. Apply and watch: `kubectl get pods -l <your-label> -w`

Observe ordered creation — `web-0` first, then `web-1` after `web-0` is Ready, then `web-2`.

Check the PVCs: `kubectl get pvc` — you should see `web-data-web-0`, `web-data-web-1`, `web-data-web-2` (names follow the pattern `<template-name>-<pod-name>`).

**Verify:** What are the exact pod names and PVC names?

---

##### Task 4: Stable Network Identity
Each StatefulSet pod gets a DNS name: `<pod-name>.<service-name>.<namespace>.svc.cluster.local`

1. Run a temporary busybox pod and use `nslookup` to resolve `web-0.<your-headless-service>.default.svc.cluster.local`
2. Do the same for `web-1` and `web-2`
3. Confirm the IPs match `kubectl get pods -o wide`

**Verify:** Does the nslookup IP match the pod IP?

---

##### Task 5: Stable Storage — Data Survives Pod Deletion
1. Write unique data to each pod: `kubectl exec web-0 -- sh -c "echo 'Data from web-0' > /usr/share/nginx/html/index.html"`
2. Delete `web-0`: `kubectl delete pod web-0`
3. Wait for it to come back, then check the data — it should still be "Data from web-0"

The new pod reconnected to the same PVC.

**Verify:** Is the data identical after pod recreation?

---

##### Task 6: Ordered Scaling
1. Scale up to 5: `kubectl scale statefulset web --replicas=5` — pods create in order (web-3, then web-4)
2. Scale down to 3 — pods terminate in reverse order (web-4, then web-3)
3. Check `kubectl get pvc` — all five PVCs still exist. Kubernetes keeps them on scale-down so data is preserved if you scale back up.

**Verify:** After scaling down, how many PVCs exist?

---

##### Task 7: Clean Up
1. Delete the StatefulSet and the Headless Service
2. Check `kubectl get pvc` — PVCs are still there (safety feature)
3. Delete PVCs manually

**Verify:** Were PVCs auto-deleted with the StatefulSet?

---

#### Hints
- `kubectl get sts` is the short name for StatefulSets
- `serviceName` must match an existing Headless Service
- Pod DNS: `<pod-name>.<service-name>.<namespace>.svc.cluster.local`
- PVC naming: `<template-name>-<statefulset-name>-<ordinal>`
- Pods create in order (0, 1, 2) and terminate in reverse (2, 1, 0)
- Scaling down does not delete PVCs — data is preserved
- Deleting a StatefulSet does not delete PVCs — clean up separately

---

#### Documentation
Create `day-56-statefulsets.md` with:
- What StatefulSets are and when to use them vs Deployments
- The comparison table
- How Headless Services, stable DNS, and volumeClaimTemplates work
- Screenshots of pods, PVCs, and DNS resolution

---

#### Submission
1. Add `day-56-statefulsets.md` to `2026/day-56/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes StatefulSets today. Stable pod names, per-pod DNS, and persistent storage that survives deletion — now I understand why databases need StatefulSets."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 56 – Kubernetes StatefulSets — Notes & Solution

#### Task
Deployments work great for stateless apps, but what about databases? You need stable pod names, ordered startup, and persistent storage per replica. Today you learn StatefulSets — the workload designed for stateful applications like MySQL, PostgreSQL, and Kafka.

---

#### Challenge Tasks 

##### Task 1: Understand the Problem
1. Create a Deployment with 3 replicas using nginx
2. Check the pod names — they are random (`app-xyz-abc`)
3. Delete a pod and notice the replacement gets a different random name

This is fine for web servers but not for databases where you need stable identity.

| Feature | Deployment | StatefulSet |
|---|---|---|
| Pod names | Random | Stable, ordered (`app-0`, `app-1`) |
| Startup order | All at once | Ordered: pod-0, then pod-1, then pod-2 |
| Storage | Shared PVC | Each pod gets its own PVC |
| Network identity | No stable hostname | Stable DNS per pod |

Delete the Deployment before moving on.

**Verify:** Why would random pod names be a problem for a database cluster?

- Random pod names break database clusters because nodes need stable names for connections, replication, and storage.

<img width="1919" height="728" alt="Screenshot 2026-10-10 193924" src="https://github.com/user-attachments/assets/0f18b11e-be95-47b2-b740-0b51091ae65b" />


---

##### Task 2: Create a Headless Service
1. Write a Service manifest with `clusterIP: None` — this is a Headless Service
2. Set the selector to match the labels you will use on your StatefulSet pods
3. Apply it and confirm CLUSTER-IP shows `None`

A Headless Service creates individual DNS entries for each pod instead of load-balancing to one IP. StatefulSets require this.

**Verify:** What does the CLUSTER-IP column show?
- CLUSTER_IP Column Show : `None`

<img width="1255" height="571" alt="Screenshot 2026-10-10 194055" src="https://github.com/user-attachments/assets/9c8010b7-7c43-4ead-8746-a0bfb345bf4a" />


---

##### Task 3: Create a StatefulSet
1. Write a StatefulSet manifest with `serviceName` pointing to your Headless Service
2. Set replicas to 3, use the nginx image
3. Add a `volumeClaimTemplates` section requesting 100Mi of ReadWriteOnce storage
4. Apply and watch: `kubectl get pods -l <your-label> -w`

Observe ordered creation — `web-0` first, then `web-1` after `web-0` is Ready, then `web-2`.

Check the PVCs: `kubectl get pvc` — you should see `web-data-web-0`, `web-data-web-1`, `web-data-web-2` (names follow the pattern `<template-name>-<pod-name>`).

**Verify:** What are the exact pod names and PVC names?

- Pod names : `web-0` `web-1` `web-2`
- PVC names : `web-data-web-0` `web-data-web-1` `web-data-web-2`

<img width="1495" height="675" alt="Screenshot 2026-10-10 194340" src="https://github.com/user-attachments/assets/c59211a1-c6fc-4826-a703-022b8ac567a5" />
<img width="1510" height="668" alt="Screenshot 2026-10-10 194407" src="https://github.com/user-attachments/assets/dd077f7f-9994-4518-9853-3948fc510d1c" />

---

##### Task 4: Stable Network Identity
Each StatefulSet pod gets a DNS name: `<pod-name>.<service-name>.<namespace>.svc.cluster.local`

1. Run a temporary busybox pod and use `nslookup` to resolve `web-0.<your-headless-service>.default.svc.cluster.local`
2. Do the same for `web-1` and `web-2`
3. Confirm the IPs match `kubectl get pods -o wide`

**Verify:** Does the nslookup IP match the pod IP?
- Yes,nslookup IP match the Pod IP 

<img width="1514" height="554" alt="Screenshot 2026-10-10 195222" src="https://github.com/user-attachments/assets/f6802a5a-9cd3-4ac9-bc8f-7f01c8d0c8c0" />


---

##### Task 5: Stable Storage — Data Survives Pod Deletion
1. Write unique data to each pod: `kubectl exec web-0 -- sh -c "echo 'Data from web-0' > /usr/share/nginx/html/index.html"`
2. Delete `web-0`: `kubectl delete pod web-0`
3. Wait for it to come back, then check the data — it should still be "Data from web-0"

The new pod reconnected to the same PVC.

**Verify:** Is the data identical after pod recreation?

- Yes,exactly the same
<img width="1745" height="539" alt="Screenshot 2026-10-10 195521" src="https://github.com/user-attachments/assets/45a07e8d-db3e-406a-ad2d-7b75d9ae7591" />


---

##### Task 6: Ordered Scaling
1. Scale up to 5: `kubectl scale statefulset web --replicas=5` — pods create in order (web-3, then web-4)
2. Scale down to 3 — pods terminate in reverse order (web-4, then web-3)
3. Check `kubectl get pvc` — all five PVCs still exist. Kubernetes keeps them on scale-down so data is preserved if you scale back up.

**Verify:** After scaling down, how many PVCs exist?

- After scaling down, 5 PVCs exits

<img width="1885" height="721" alt="Screenshot 2026-10-10 195748" src="https://github.com/user-attachments/assets/6d059d7b-08b5-4e01-a083-8b2b12276618" />
<img width="1678" height="525" alt="Screenshot 2026-10-10 195809" src="https://github.com/user-attachments/assets/ed8f0a62-fba0-4d20-886f-576aaf25388b" />


---

##### Task 7: Clean Up
1. Delete the StatefulSet and the Headless Service
2. Check `kubectl get pvc` — PVCs are still there (safety feature)
3. Delete PVCs manually

**Verify:** Were PVCs auto-deleted with the StatefulSet?

- PVCs are NOT auto-deleted when a StatefulSet is deleted

<img width="1026" height="339" alt="Screenshot 2026-10-10 200329" src="https://github.com/user-attachments/assets/70e4f83c-59c6-4ad4-a4a1-a4c6a2b994a1" />

---

#### Documentation
**What StatefulSets are and when to use them vs Deployments**

`StatefulSet`

- A StatefulSet is used to manage stateful applications where each pod needs:
    - Stable identity (fixed name like web-0)
    - Stable network (DNS)
    - Persistent storage (PVC per pod)
    - Ordered deployment & scaling

- Use StatefulSet when:
   - Running databases (MySQL, PostgreSQL, MongoDB)
   - Distributed systems (Kafka, Zookeeper)
   - Apps needing data persistence + identity

`Deployment`

- A Deployment is used for stateless applications where:
    - Pods are interchangeable
    - No fixed identity needed
    - No persistent storage required

- Use Deployment when:
    - Web apps (frontend, APIs)
    - Microservices

**Comparison Deployment vs StatefulSet**

| Feature | Deployment | StatefulSet |
|---|---|---|
| Pod names | Random | Stable, ordered (`app-0`, `app-1`) |
| Startup order | All at once | Ordered: pod-0, then pod-1, then pod-2 |
| Storage | Shared PVC | Each pod gets its own PVC |
| Network identity | No stable hostname | Stable DNS per pod |

**How Headless Services, stable DNS, and volumeClaimTemplates work**

1. `StatefulSet`
- Creates pods: web-0, web-1, web-2
- Each pod has a fixed identity

2. `Storage (volumeClaimTemplates)`
    - Each pod gets its own PVC:
    - web-0 -> web-data-0
    - web-1 -> web-data-1
    - web-2 -> web-data-2

3. `Headless Service`
- Exposes each pod individually

4. `DNS`
- Each pod gets a stable DNS:

    - web-0.web-headless -> Pod IP
    - web-1.web-headless -> Pod IP
    - web-2.web-headless -> Pod IP

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes StatefulSets today. Stable pod names, per-pod DNS, and persistent storage that survives deletion — now I understand why databases need StatefulSets."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Compare IAM vs Azure RBAC in a table. | You can demonstrate, without notes: *map AWS concepts to Azure* — with evidence committed to `day-56/`. |
| 2 | Write a multi-cloud tagging/policy note. | You can demonstrate, without notes: *use Azure CLI with resource groups, VNets and VMs* — with evidence committed to `day-56/`. |
| 3 | Review Azure Cost Management basics. | You can demonstrate, without notes: *understand Entra ID, RBAC and Azure DevOps basics* — with evidence committed to `day-56/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `SubscriptionNotFound` | Run `az account set --subscription`. |
| Quota error | Choose another region/size or request quota. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use managed identities, RBAC at least-privilege scope, NSG default deny, Defender for Cloud recommendations, delete RGs after lab.
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

1. Resource group purpose?
2. Managed identity vs service principal?
3. NSG vs AWS SG?
4. How do you structure subscriptions?
5. **Scenario:** Your company is multi-cloud after an acquisition. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I deploy a VM with az CLI? | ☐ | ☐ | ☐ | ☐ |
| Can I map AWS to Azure? | ☐ | ☐ | ☐ | ☐ |
| Can I clean up everything? | ☐ | ☐ | ☐ | ☐ |
| Map AWS concepts to Azure | ☐ | ☐ | ☐ | ☐ |
| Use Azure CLI with resource groups, VNets and VMs | ☐ | ☐ | ☐ | ☐ |
| Understand Entra ID, RBAC and Azure DevOps basics | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-56/` in your own repository:

```text
day-56/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-56
git add day-56/
git commit -m "day-56: azure fundamentals for devops & multi-cloud mapping"
git push -u origin day-56
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** AWS-Azure mapping cheat sheet, cloud notes.

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

[← Day 55](../day-55/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 57 →](../day-57/README.md)
