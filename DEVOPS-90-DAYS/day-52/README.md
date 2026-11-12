# Day 52 — AWS Networking: VPC, Subnets, Routing, NAT & Security Groups

[← Day 51](../day-51/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 53 →](../day-53/README.md)

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

- [ ] Design and build a VPC by hand
- [ ] Understand public vs private subnets, IGW and NAT
- [ ] Control traffic with SGs and NACLs

## 2. Prerequisites

- Days 8-10, 50-51.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 VPC anatomy

CIDR block, subnets per AZ, route tables, Internet Gateway (public), NAT Gateway (outbound for private), VPC endpoints (private access to AWS services).

### 3.2 Controls

Security Groups: stateful, allow-only, attach to ENIs. NACLs: stateless, subnet-level allow/deny. Flow Logs for visibility.

### 3.3 Design pattern

3 tiers: public (ALB), private app, isolated data. Multi-AZ for resilience; NAT per AZ for HA (costly - cost trade-off!).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create VPC 10.0.0.0/16 with 2 public and 2 private subnets in 2 AZs.
2. [ ] Attach IGW and public route table; private route via NAT (or NAT instance for cost).
3. [ ] Launch an instance in each tier; test reachability.
4. [ ] Create SGs: ALB->app->db chain referencing SG IDs.
5. [ ] Enable VPC Flow Logs to CloudWatch/S3 and inspect rejected traffic.

## 5. Real-World Scenario

> The DB subnet must never be reachable from the internet but the app must reach package mirrors. Design and prove it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=lab}]'
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-internet-gateway; aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC
aws ec2 create-route --route-table-id $RT --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW
aws ec2 authorize-security-group-ingress --group-id $APP_SG --protocol tcp --port 8080 --source-group $ALB_SG
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 52 – Kubernetes Namespaces and Deployments — Challenge Brief

#### Task
Yesterday you created standalone Pods. The problem? Delete a Pod and it is gone forever — no one recreates it. Today you fix that with Deployments, the real way to run applications in Kubernetes. You will also learn Namespaces, which let you organize and isolate resources inside a cluster.

---

#### Expected Output
- At least 2 namespaces created and used
- A Deployment running with multiple replicas
- A scaled Deployment and a rolling update performed
- A markdown file: `day-52-namespaces-deployments.md`
- Screenshot of `kubectl get deployments` and `kubectl get pods` across namespaces

---

#### Challenge Tasks

##### Task 1: Explore Default Namespaces
Kubernetes comes with built-in namespaces. List them:

```bash
kubectl get namespaces
```

You should see at least:
- `default` — where your resources go if you do not specify a namespace
- `kube-system` — Kubernetes internal components (API server, scheduler, etc.)
- `kube-public` — publicly readable resources
- `kube-node-lease` — node heartbeat tracking

Check what is running inside `kube-system`:
```bash
kubectl get pods -n kube-system
```

These are the control plane components keeping your cluster alive. Do not touch them.

**Verify:** How many pods are running in `kube-system`?

---

##### Task 2: Create and Use Custom Namespaces
Create two namespaces — one for a development environment and one for staging:

```bash
kubectl create namespace dev
kubectl create namespace staging
```

Verify they exist:
```bash
kubectl get namespaces
```

You can also create a namespace from a manifest:
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

```bash
kubectl apply -f namespace.yaml
```

Now run a pod in a specific namespace:
```bash
kubectl run nginx-dev --image=nginx:latest -n dev
kubectl run nginx-staging --image=nginx:latest -n staging
```

List pods across all namespaces:
```bash
kubectl get pods -A
```

Notice that `kubectl get pods` without `-n` only shows the `default` namespace. You must specify `-n <namespace>` or use `-A` to see everything.

**Verify:** Does `kubectl get pods` show these pods? What about `kubectl get pods -A`?

---

##### Task 3: Create Your First Deployment
A Deployment tells Kubernetes: "I want X replicas of this Pod running at all times." If a Pod crashes, the Deployment controller recreates it automatically.

Create a file `nginx-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

Key differences from a standalone Pod:
- `kind: Deployment` instead of `kind: Pod`
- `apiVersion: apps/v1` instead of `v1`
- `replicas: 3` tells Kubernetes to maintain 3 identical pods
- `selector.matchLabels` connects the Deployment to its Pods
- `template` is the Pod template — the Deployment creates Pods using this blueprint

Apply it:
```bash
kubectl apply -f nginx-deployment.yaml
```

Check the result:
```bash
kubectl get deployments -n dev
kubectl get pods -n dev
```

You should see 3 pods with names like `nginx-deployment-xxxxx-yyyyy`.

**Verify:** What do the READY, UP-TO-DATE, and AVAILABLE columns mean in the deployment output?

---

##### Task 4: Self-Healing — Delete a Pod and Watch It Come Back
This is the key difference between a Deployment and a standalone Pod.

```bash
# List pods
kubectl get pods -n dev

# Delete one of the deployment's pods (use an actual pod name from your output)
kubectl delete pod <pod-name> -n dev

# Immediately check again
kubectl get pods -n dev
```

The Deployment controller detects that only 2 of 3 desired replicas exist and immediately creates a new one. The deleted pod is replaced within seconds.

**Verify:** Is the replacement pod's name the same as the one you deleted, or different?

---

##### Task 5: Scale the Deployment
Change the number of replicas:

```bash
# Scale up to 5
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl get pods -n dev

# Scale down to 2
kubectl scale deployment nginx-deployment --replicas=2 -n dev
kubectl get pods -n dev
```

Watch how Kubernetes creates or terminates pods to match the desired count.

You can also scale by editing the manifest — change `replicas: 4` in your YAML file and run `kubectl apply -f nginx-deployment.yaml` again.

**Verify:** When you scaled down from 5 to 2, what happened to the extra pods?

---

##### Task 6: Rolling Update
Update the Nginx image version to trigger a rolling update:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev
```

Watch the rollout in real time:
```bash
kubectl rollout status deployment/nginx-deployment -n dev
```

Kubernetes replaces pods one by one — old pods are terminated only after new ones are healthy. This means zero downtime.

Check the rollout history:
```bash
kubectl rollout history deployment/nginx-deployment -n dev
```

Now roll back to the previous version:
```bash
kubectl rollout undo deployment/nginx-deployment -n dev
kubectl rollout status deployment/nginx-deployment -n dev
```

Verify the image is back to the previous version:
```bash
kubectl describe deployment nginx-deployment -n dev | grep Image
```

**Verify:** What image version is running after the rollback?

---

##### Task 7: Clean Up
```bash
kubectl delete deployment nginx-deployment -n dev
kubectl delete pod nginx-dev -n dev
kubectl delete pod nginx-staging -n staging
kubectl delete namespace dev staging production
```

Deleting a namespace removes everything inside it. Be very careful with this in production.

```bash
kubectl get namespaces
kubectl get pods -A
```

**Verify:** Are all your resources gone?

---

#### Hints
- `kubectl get <resource> -n <namespace>` — target a specific namespace
- `kubectl get <resource> -A` — list resources across all namespaces
- `selector.matchLabels` in a Deployment must match `template.metadata.labels` — if they do not match, the Deployment will not manage the Pods
- `kubectl scale deployment <name> --replicas=N` — quick way to scale
- `kubectl set image` updates a container image without editing the YAML
- `kubectl rollout undo` rolls back to the previous revision
- `kubectl rollout history` shows past revisions of a Deployment
- Deployments create ReplicaSets behind the scenes — you can see them with `kubectl get replicasets -n <namespace>`

---

#### Documentation
Create `day-52-namespaces-deployments.md` with:
- What namespaces are and why you would use them
- Your Deployment manifest and an explanation of each section
- What happens when you delete a Pod managed by a Deployment vs a standalone Pod
- How scaling works (both imperative and declarative)
- How rolling updates and rollbacks work
- Screenshot of your Deployment and Pods running

---

#### Submission
1. Add `day-52-namespaces-deployments.md` and your YAML files to `2026/day-52/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes Namespaces and Deployments today. Created self-healing deployments, scaled them up and down, and performed a zero-downtime rolling update with rollback."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 52 – Kubernetes Namespaces and Deployments — Notes & Solution

#### Task
Yesterday you created standalone Pods. The problem? Delete a Pod and it is gone forever — no one recreates it. Today you fix that with Deployments, the real way to run applications in Kubernetes. You will also learn Namespaces, which let you organize and isolate resources inside a cluster.

---

#### Challenge Tasks

##### Task 1: Explore Default Namespaces
Kubernetes comes with built-in namespaces. List them:

```bash
kubectl get namespaces
```

You should see at least:
- `default` — where your resources go if you do not specify a namespace
- `kube-system` — Kubernetes internal components (API server, scheduler, etc.)
- `kube-public` — publicly readable resources
- `kube-node-lease` — node heartbeat tracking

Check what is running inside `kube-system`:
```bash
kubectl get pods -n kube-system
```

These are the control plane components keeping your cluster alive. Do not touch them.

**Verify:** How many pods are running in `kube-system`? - 8 pods are running.

<img width="1534" height="451" alt="Screenshot 2026-10-03 224902" src="https://github.com/user-attachments/assets/ac8cd67f-3abd-4a12-98d1-ee53d2f52e4e" />


---

##### Task 2: Create and Use Custom Namespaces
Create two namespaces — one for a development environment and one for staging:

```bash
kubectl create namespace dev
kubectl create namespace staging
```

Verify they exist:
```bash
kubectl get namespaces
```
<img width="1079" height="314" alt="Screenshot 2026-10-03 225018" src="https://github.com/user-attachments/assets/14bf895d-aaad-46b3-80db-bde51eba3587" />


You can also create a namespace from a manifest:
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

```bash
kubectl apply -f namespace.yaml
```

<img width="872" height="425" alt="Screenshot 2026-10-03 225428" src="https://github.com/user-attachments/assets/24cc0d4f-e55c-4e2c-9cb8-5e3e560e048f" />



Now run a pod in a specific namespace:
```bash
kubectl run nginx-dev --image=nginx:latest -n dev
kubectl run nginx-staging --image=nginx:latest -n staging
```

<img width="1220" height="143" alt="Screenshot 2026-10-03 225751" src="https://github.com/user-attachments/assets/2b13e003-dcbf-4ee6-9cdc-ab6c1fc52d36" />


List pods across all namespaces:
```bash
kubectl get pods -A
```

Notice that `kubectl get pods` without `-n` only shows the `default` namespace. You must specify `-n <namespace>` or use `-A` to see everything.

**Verify:** Does `kubectl get pods` show these pods? What about `kubectl get pods -A`?

<img width="1555" height="325" alt="Screenshot 2026-10-03 230018" src="https://github.com/user-attachments/assets/76dd0f50-31cf-4f04-b8b9-5d037a3fc74c" />
<img width="943" height="221" alt="Screenshot 2026-10-03 225759" src="https://github.com/user-attachments/assets/5e541f96-607a-4ef6-834b-38b664b2611b" />
<img width="936" height="86" alt="Screenshot 2026-10-03 225927" src="https://github.com/user-attachments/assets/e9eb42f9-708b-47fb-b597-726e76911194" />


    - When I run kubectl get pods,it does not show any pods.
    - When I run kubectl get pods -A it shows the pods.

---

##### Task 3: Create Your First Deployment
A Deployment tells Kubernetes: "I want X replicas of this Pod running at all times." If a Pod crashes, the Deployment controller recreates it automatically.

Create a file `nginx-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

Key differences from a standalone Pod:
- `kind: Deployment` instead of `kind: Pod`
- `apiVersion: apps/v1` instead of `v1`
- `replicas: 3` tells Kubernetes to maintain 3 identical pods
- `selector.matchLabels` connects the Deployment to its Pods
- `template` is the Pod template — the Deployment creates Pods using this blueprint

Apply it:
```bash
kubectl apply -f nginx-deployment.yaml
```

Check the result:
```bash
kubectl get deployments -n dev
kubectl get pods -n dev
```

You should see 3 pods with names like `nginx-deployment-xxxxx-yyyyy`.

**Verify:** What do the READY, UP-TO-DATE, and AVAILABLE columns mean in the deployment output?

READY: Pods ready to serve traffic (ready/desired)

UP-TO-DATE: Pods using the latest deployment spec

AVAILABLE: Pods ready and stable

<img width="1118" height="75" alt="Screenshot 2026-10-03 230635" src="https://github.com/user-attachments/assets/f009018a-fc49-404c-a0cd-15a609115feb" />
<img width="1024" height="201" alt="Screenshot 2026-10-03 230750" src="https://github.com/user-attachments/assets/138deeb1-2414-42a2-bc55-3fc80b1c426d" />


---

##### Task 4: Self-Healing — Delete a Pod and Watch It Come Back
This is the key difference between a Deployment and a standalone Pod.

```bash
# List pods
kubectl get pods -n dev

# Delete one of the deployment's pods (use an actual pod name from your output)
kubectl delete pod <pod-name> -n dev

# Immediately check again
kubectl get pods -n dev
```

The Deployment controller detects that only 2 of 3 desired replicas exist and immediately creates a new one. The deleted pod is replaced within seconds.

**Verify:** Is the replacement pod's name the same as the one you deleted, or different?

- Yes,different name but same prefix

<img width="1356" height="307" alt="Screenshot 2026-10-03 231158" src="https://github.com/user-attachments/assets/43b95f8a-90b7-4bd4-87dc-bb7de4171220" />

---

##### Task 5: Scale the Deployment
Change the number of replicas:

```bash
# Scale up to 5
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl get pods -n dev

# Scale down to 2
kubectl scale deployment nginx-deployment --replicas=2 -n dev
kubectl get pods -n dev
```


<img width="1244" height="326" alt="Screenshot 2026-10-03 231414" src="https://github.com/user-attachments/assets/3641436f-9916-475b-964f-629c7eb6d7ce" />


Watch how Kubernetes creates or terminates pods to match the desired count.

You can also scale by editing the manifest — change `replicas: 4` in your YAML file and run `kubectl apply -f nginx-deployment.yaml` again.

**Verify:** When you scaled down from 5 to 2, what happened to the extra pods?

<img width="1370" height="116" alt="Screenshot 2026-10-03 231725" src="https://github.com/user-attachments/assets/7fd28016-44c5-42be-88e9-ed081af18eea" />
<img width="1017" height="94" alt="Screenshot 2026-10-03 231839" src="https://github.com/user-attachments/assets/cc4ed9d2-809f-4428-86f5-be8f4e3a95c9" />


- The extra pods are terminated automatically.
- Kubernetes keeps only the desired number of replicas (2) and removes the remaining 3 pods to match that state.

---

##### Task 6: Rolling Update
Update the Nginx image version to trigger a rolling update:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev
```

Watch the rollout in real time:
```bash
kubectl rollout status deployment/nginx-deployment -n dev
```

Kubernetes replaces pods one by one — old pods are terminated only after new ones are healthy. This means zero downtime.

Check the rollout history:
```bash
kubectl rollout history deployment/nginx-deployment -n dev
```

<img width="1280" height="48" alt="Screenshot 2026-10-03 233057" src="https://github.com/user-attachments/assets/a97769a4-597e-4d84-94c7-9a71f63c645b" />
<img width="1262" height="69" alt="Screenshot 2026-10-03 235051" src="https://github.com/user-attachments/assets/6652c451-792e-4fad-bc72-ddae73cbb40a" />


Now roll back to the previous version:
```bash
kubectl rollout undo deployment/nginx-deployment -n dev
kubectl rollout status deployment/nginx-deployment -n dev
```

Verify the image is back to the previous version:
```bash
kubectl describe deployment nginx-deployment -n dev | grep Image
```

**Verify:** What image version is running after the rollback?

<img width="1763" height="251" alt="Screenshot 2026-10-04 000137" src="https://github.com/user-attachments/assets/696dd9fe-2364-4bb2-a354-ea78d4e87036" />


---

##### Task 7: Clean Up
```bash
kubectl delete deployment nginx-deployment -n dev
kubectl delete pod nginx-dev -n dev
kubectl delete pod nginx-staging -n staging
kubectl delete namespace dev staging production
```

Deleting a namespace removes everything inside it. Be very careful with this in production.

```bash
kubectl get namespaces
kubectl get pods -A
```

**Verify:** Are all your resources gone?

<img width="1599" height="601" alt="Screenshot 2026-10-04 000253" src="https://github.com/user-attachments/assets/2ddc5d19-57d6-430c-886c-a88f872f7578" />


---

**What namespaces are and why you would use them**
- Namespaces are like folders in Kubernetes that separate resources inside one cluster
- They are used to keep things organized and isolated (logical isolation) (e.g., stage,dev and prod don’t mix)

**Explaination of Deployment manifest**

- `apiVersion` & `kind` Defines the resource as a Deployment
- `metadata`Contains Deployment identity (name, namespace, labels)
- `spec` Main configuration of the Deployment
- `spec.replicas` Ensures 3 Pods are always running
- `spec.selector` Matches Pods with label app: nginx
- `spec.template` Blueprint used to create Pods
- `template.metadata` Labels assigned to Pods
- `template.spec` Pod-level configuration
- `containers` Defines container details (name, image)
- `ports` Exposes container port 80

**What happens when you delete a Pod managed by a Deployment vs a standalone Pod**

1. Pod managed by a Deployment:
 - Kubernetes automatically recreates a new pod to maintain the desired number of replicas.
 - The new pod gets a different name but keeps the same Deployment/ReplicaSet prefix.
 - Ensures the desired state is always met.

2. Standalone Pod (not managed by Deployment):
 - Kubernetes does NOT recreate it.
 - Once deleted, the pod is gone permanently.

**How scaling works (both imperative and declarative)**

1. `Imperative`: you directly tell Kubernetes how many replicas you want using a command.
2. `Declarative`: you update the Deployment manifest (YAML) with the desired replicas.

**How rolling updates and rollbacks work**

1. `Rolling Updates`
- Deployment updates its pod template (e.g., new container image).
- Kubernetes creates new pods with the updated spec.
- Old pods are terminated gradually as new pods become ready.

2. `Rollbacks`
- Deployment keeps a history of previous ReplicaSets.
- You trigger rollback to a previous revision.
- Kubernetes recreates pods from the old ReplicaSet while removing the current ones.

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw the VPC diagram (Mermaid/draw.io). | You can demonstrate, without notes: *design and build a VPC by hand* — with evidence committed to `day-52/`. |
| 2 | Estimate monthly NAT cost and propose alternatives (endpoints). | You can demonstrate, without notes: *understand public vs private subnets, IGW and NAT* — with evidence committed to `day-52/`. |
| 3 | Delete everything and record the teardown order. | You can demonstrate, without notes: *control traffic with SGs and NACLs* — with evidence committed to `day-52/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Private instance has no internet | Missing NAT route or NAT in wrong subnet. |
| Cannot SSH | SG/NACL/route/key/public IP check in order. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** No 0.0.0.0/0 to SSH/DB ports; use SSM Session Manager; use SG references; flow logs on.
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

1. Public vs private subnet?
2. SG vs NACL?
3. Why NAT Gateway?
4. What are VPC endpoints?
5. **Scenario:** The DB subnet must never be reachable from the internet but the app must reach package mirrors. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a 3-tier VPC? | ☐ | ☐ | ☐ | ☐ |
| Can I explain routing? | ☐ | ☐ | ☐ | ☐ |
| Can I troubleshoot reachability? | ☐ | ☐ | ☐ | ☐ |
| Design and build a VPC by hand | ☐ | ☐ | ☐ | ☐ |
| Understand public vs private subnets, IGW and NAT | ☐ | ☐ | ☐ | ☐ |
| Control traffic with SGs and NACLs | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-52/` in your own repository:

```text
day-52/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-52
git add day-52/
git commit -m "day-52: aws networking"
git push -u origin day-52
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

## 18. Challenge Notes — Day 52: Writing Lambda Functions and Triggers (S3, API Gateway)

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 52** of the DevOps 90-Day Challenge!
Today, we make our Lambda functions useful by connecting them to **Triggers**. A function that runs by itself is boring; a function that runs when something happens is magic.

[![](https://img.youtube.com/vi/AFn6w0TMjKo/0.jpg)](https://www.youtube.com/watch?v=AFn6w0TMjKo)

[Watch the video](https://www.youtube.com/watch?v=AFn6w0TMjKo)

---

#### Objective

By the end of this session, you will:

* Trigger a Lambda function when a file is uploaded to **S3**.
* Trigger a Lambda function via an HTTP request using **API Gateway**.
* Inspect the **Event Object** to understand how data is passed.

---

#### Tools Used

* **AWS Lambda**
* **Amazon S3** (Simple Storage Service)
* **Amazon API Gateway**

---

#### Key Concepts

##### 1. Triggers

A trigger is a resource or configuration that invokes your Lambda function.
* **S3 Event**: "New file created in Bucket X".
* **API Gateway**: "GET request to /users".

##### 2. The S3 Trigger Flow

1. User uploads `image.jpg` to S3.
2. S3 detects the `ObjectCreated` event.
3. S3 invokes the specific Lambda Function.
4. Lambda processes the image (e.g., resizes it).

##### 3. API Gateway

API Gateway acts as the "front door" for your applications. It accepts HTTP requests and passes them to the backend (Lambda).

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Event Source** | S3 Bucket or API Gateway Endpoint. |
| **Integration** | Connecting API Gateway to a Lambda function. |
| **Permissions** | Automatically granting S3 permission to invoke Lambda. |

---

#### Bonus (Extra Learning)

* Print the `event` object in your Python code (`print(event)`) and check CloudWatch Logs to see the JSON structure.
* Secure your API Gateway using an **API Key**.

---

#### Congratulations!

You’ve successfully built an **Event-Driven Application**!
Your code now reacts to the outside world.

---

#### Try These Next

* Create a "Thumbnail Generator": Upload an image to S3, and have Lambda resize it.
* specific a **DynamoDB** trigger that runs when a new item is added to a table.

## 19. Cohort Practice — Day 52: Kubernetes Namespaces and Deployments

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Yesterday you created standalone Pods. The problem? Delete a Pod and it is gone forever — no one recreates it. Today you fix that with Deployments, the real way to run applications in Kubernetes. You will also learn Namespaces, which let you organize and isolate resources inside a cluster.

---

#### Expected Output
- At least 2 namespaces created and used
- A Deployment running with multiple replicas
- A scaled Deployment and a rolling update performed
- A markdown file: `day-52-namespaces-deployments.md`
- Screenshot of `kubectl get deployments` and `kubectl get pods` across namespaces

---

#### Challenge Tasks

##### Task 1: Explore Default Namespaces
Kubernetes comes with built-in namespaces. List them:

```bash
kubectl get namespaces
```

You should see at least:
- `default` — where your resources go if you do not specify a namespace
- `kube-system` — Kubernetes internal components (API server, scheduler, etc.)
- `kube-public` — publicly readable resources
- `kube-node-lease` — node heartbeat tracking

Check what is running inside `kube-system`:
```bash
kubectl get pods -n kube-system
```

These are the control plane components keeping your cluster alive. Do not touch them.

**Verify:** How many pods are running in `kube-system`?

---

##### Task 2: Create and Use Custom Namespaces
Create two namespaces — one for a development environment and one for staging:

```bash
kubectl create namespace dev
kubectl create namespace staging
```

Verify they exist:
```bash
kubectl get namespaces
```

You can also create a namespace from a manifest:
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

```bash
kubectl apply -f namespace.yaml
```

Now run a pod in a specific namespace:
```bash
kubectl run nginx-dev --image=nginx:latest -n dev
kubectl run nginx-staging --image=nginx:latest -n staging
```

List pods across all namespaces:
```bash
kubectl get pods -A
```

Notice that `kubectl get pods` without `-n` only shows the `default` namespace. You must specify `-n <namespace>` or use `-A` to see everything.

**Verify:** Does `kubectl get pods` show these pods? What about `kubectl get pods -A`?

---

##### Task 3: Create Your First Deployment
A Deployment tells Kubernetes: "I want X replicas of this Pod running at all times." If a Pod crashes, the Deployment controller recreates it automatically.

Create a file `nginx-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

Key differences from a standalone Pod:
- `kind: Deployment` instead of `kind: Pod`
- `apiVersion: apps/v1` instead of `v1`
- `replicas: 3` tells Kubernetes to maintain 3 identical pods
- `selector.matchLabels` connects the Deployment to its Pods
- `template` is the Pod template — the Deployment creates Pods using this blueprint

Apply it:
```bash
kubectl apply -f nginx-deployment.yaml
```

Check the result:
```bash
kubectl get deployments -n dev
kubectl get pods -n dev
```

You should see 3 pods with names like `nginx-deployment-xxxxx-yyyyy`.

**Verify:** What do the READY, UP-TO-DATE, and AVAILABLE columns mean in the deployment output?

---

##### Task 4: Self-Healing — Delete a Pod and Watch It Come Back
This is the key difference between a Deployment and a standalone Pod.

```bash
# List pods
kubectl get pods -n dev

# Delete one of the deployment's pods (use an actual pod name from your output)
kubectl delete pod <pod-name> -n dev

# Immediately check again
kubectl get pods -n dev
```

The Deployment controller detects that only 2 of 3 desired replicas exist and immediately creates a new one. The deleted pod is replaced within seconds.

**Verify:** Is the replacement pod's name the same as the one you deleted, or different?

---

##### Task 5: Scale the Deployment
Change the number of replicas:

```bash
# Scale up to 5
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl get pods -n dev

# Scale down to 2
kubectl scale deployment nginx-deployment --replicas=2 -n dev
kubectl get pods -n dev
```

Watch how Kubernetes creates or terminates pods to match the desired count.

You can also scale by editing the manifest — change `replicas: 4` in your YAML file and run `kubectl apply -f nginx-deployment.yaml` again.

**Verify:** When you scaled down from 5 to 2, what happened to the extra pods?

---

##### Task 6: Rolling Update
Update the Nginx image version to trigger a rolling update:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev
```

Watch the rollout in real time:
```bash
kubectl rollout status deployment/nginx-deployment -n dev
```

Kubernetes replaces pods one by one — old pods are terminated only after new ones are healthy. This means zero downtime.

Check the rollout history:
```bash
kubectl rollout history deployment/nginx-deployment -n dev
```

Now roll back to the previous version:
```bash
kubectl rollout undo deployment/nginx-deployment -n dev
kubectl rollout status deployment/nginx-deployment -n dev
```

Verify the image is back to the previous version:
```bash
kubectl describe deployment nginx-deployment -n dev | grep Image
```

**Verify:** What image version is running after the rollback?

---

##### Task 7: Clean Up
```bash
kubectl delete deployment nginx-deployment -n dev
kubectl delete pod nginx-dev -n dev
kubectl delete pod nginx-staging -n staging
kubectl delete namespace dev staging production
```

Deleting a namespace removes everything inside it. Be very careful with this in production.

```bash
kubectl get namespaces
kubectl get pods -A
```

**Verify:** Are all your resources gone?

---

#### Hints
- `kubectl get <resource> -n <namespace>` — target a specific namespace
- `kubectl get <resource> -A` — list resources across all namespaces
- `selector.matchLabels` in a Deployment must match `template.metadata.labels` — if they do not match, the Deployment will not manage the Pods
- `kubectl scale deployment <name> --replicas=N` — quick way to scale
- `kubectl set image` updates a container image without editing the YAML
- `kubectl rollout undo` rolls back to the previous revision
- `kubectl rollout history` shows past revisions of a Deployment
- Deployments create ReplicaSets behind the scenes — you can see them with `kubectl get replicasets -n <namespace>`

---

#### Documentation
Create `day-52-namespaces-deployments.md` with:
- What namespaces are and why you would use them
- Your Deployment manifest and an explanation of each section
- What happens when you delete a Pod managed by a Deployment vs a standalone Pod
- How scaling works (both imperative and declarative)
- How rolling updates and rollbacks work
- Screenshot of your Deployment and Pods running

---

#### Submission
1. Add `day-52-namespaces-deployments.md` and your YAML files to `2026/day-52/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes Namespaces and Deployments today. Created self-healing deployments, scaled them up and down, and performed a zero-downtime rolling update with rollback."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-52-namespaces-deployments

kubectl get namespaces -> list all namespaces
kubectl get pods -n kube-system -> check the kubernetes system pods

create the custom namespace
============================
kubectl create namaspace dev 
kubectl create namespace staging 

create a namespace  using yml
=============================

apiVersion: v1
kind: Namespace
metadata:
    name: production

kubectl apply -f namespace.yml


kubectl get ns -> to list all the namespace

deployment pods
===============
kubectl run nginx-dev --image=nginx:latest -n dev
kubectl run nginx-staging --image=nginx:latest -n staging



kubectl get pods -n dev - to verify the dev pod

kubectl get pods -n staging - to verify the staging pod


kubectl get pods -A - to list all namespaces



kubectl get pods - check all default namespace


Q1. Does kubectl get pods show the nginx pods?
----------------------------------------------
Ans: No
Because it only shows resources in the default namespace.

Q2. Does kubectl get pods -A show them?
----------------------------------------
Ans: Yes


It lists pods from all namespaces, including:

dev
staging
kube-system
default
kube-public
kube-node-lease

## 20. Hands-on Project — Day 52: Ingress + AWS Load Balancer (ALB) Controller

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Expose a ClusterIP Service via AWS ALB using Ingress + annotations.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [k8s/base/deployment.yaml](files/hands-on-projects/k8s/base/deployment.yaml)
- [k8s/base/ingress.yaml](files/hands-on-projects/k8s/base/ingress.yaml)
- [k8s/base/ingressclass.yaml](files/hands-on-projects/k8s/base/ingressclass.yaml)
- [k8s/base/kustomization.yaml](files/hands-on-projects/k8s/base/kustomization.yaml)
- [k8s/base/service.yaml](files/hands-on-projects/k8s/base/service.yaml)
- [k8s/overlays/prod/kustomization.yaml](files/hands-on-projects/k8s/overlays/prod/kustomization.yaml)
- [k8s/overlays/staging/kustomization.yaml](files/hands-on-projects/k8s/overlays/staging/kustomization.yaml)
- [scripts/deploy.sh](files/hands-on-projects/scripts/deploy.sh)
- [scripts/get_hostname.sh](files/hands-on-projects/scripts/get_hostname.sh)
- [scripts/rollout_status.sh](files/hands-on-projects/scripts/rollout_status.sh)
- [scripts/test_alb.sh](files/hands-on-projects/scripts/test_alb.sh)


---

[← Day 51](../day-51/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 53 →](../day-53/README.md)
