# Day 51 — AWS IAM Deep Dive: Policies, Roles, STS & Least Privilege

[← Day 50](../day-50/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 52 →](../day-52/README.md)

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

- [ ] Write and debug IAM policies
- [ ] Use roles and temporary credentials
- [ ] Apply least privilege with access analysis

## 2. Prerequisites

- Day 50.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 IAM building blocks

Users, groups, roles, policies (identity-based, resource-based, SCPs, permission boundaries). Evaluation: explicit Deny > Allow > implicit deny.

### 3.2 Roles and STS

Roles are assumed for temporary credentials (EC2 instance profile, Lambda, GitHub OIDC, cross-account). Trust policy = who can assume; permissions policy = what they can do.

### 3.3 Least privilege tooling

IAM Access Analyzer, policy simulator, last-accessed data, `aws iam generate-service-last-accessed-details`, CloudTrail.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a policy allowing read-only on one S3 bucket prefix.
2. [ ] Create a role assumable by your user with MFA condition; assume via CLI.
3. [ ] Test with the policy simulator and deliberately break it.
4. [ ] Create an EC2 instance role instead of embedding keys.
5. [ ] Run Access Analyzer and review findings.

## 5. Real-World Scenario

> A developer asked for AdministratorAccess 'temporarily'. Provide the minimal permissions that satisfy the use-case, with expiry.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws iam create-policy --policy-name s3-read-app --policy-document file://policy.json
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/dev --role-session-name test --serial-number <mfa-arn> --token-code 123456
aws iam simulate-principal-policy --policy-source-arn <arn> --action-names s3:GetObject --resource-arns arn:aws:s3:::bucket/app/*
# policy.json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["s3:GetObject"],"Resource":"arn:aws:s3:::bucket/app/*"}]}
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 51 – Kubernetes Manifests and Your First Pods — Challenge Brief

#### Task
Yesterday you set up a cluster. Today you actually deploy something. You will learn the structure of a Kubernetes manifest file and use it to create Pods — the smallest deployable unit in Kubernetes. By the end of today, you should be able to write a Pod definition from scratch without looking at docs.

---

#### Expected Output
- At least 3 Pod manifests written by hand
- A markdown file: `day-51-pods.md`
- Screenshot of `kubectl get pods` showing your running pods

---

#### The Anatomy of a Kubernetes Manifest

Every Kubernetes resource is defined using a YAML manifest with four required top-level fields:

```yaml
apiVersion: v1          # Which API version to use
kind: Pod               # What type of resource
metadata:               # Name, labels, namespace
  name: my-pod
  labels:
    app: my-app
spec:                   # The actual specification (what you want)
  containers:
  - name: my-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

- `apiVersion` — tells Kubernetes which API group to use. For Pods, it is `v1`.
- `kind` — the resource type. Today it is `Pod`. Later you will use `Deployment`, `Service`, etc.
- `metadata` — the identity of your resource. `name` is required. `labels` are key-value pairs used for organization and selection.
- `spec` — the desired state. For a Pod, this means which containers to run, which images, which ports, etc.

---

#### Challenge Tasks

##### Task 1: Create Your First Pod (Nginx)
Create a file called `nginx-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

Apply it:
```bash
kubectl apply -f nginx-pod.yaml
```

Verify:
```bash
kubectl get pods
kubectl get pods -o wide
```

Wait until the STATUS shows `Running`. Then explore:
```bash
# Detailed info about the pod
kubectl describe pod nginx-pod

# Read the logs
kubectl logs nginx-pod

# Get a shell inside the container
kubectl exec -it nginx-pod -- /bin/bash

# Inside the container, run:
curl localhost:80
exit
```

**Verify:** Can you see the Nginx welcome page when you curl from inside the pod?

---

##### Task 2: Create a Custom Pod (BusyBox)
Write a new manifest `busybox-pod.yaml` from scratch (do not copy-paste the nginx one):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-pod
  labels:
    app: busybox
    environment: dev
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ["sh", "-c", "echo Hello from BusyBox && sleep 3600"]
```

Apply and verify:
```bash
kubectl apply -f busybox-pod.yaml
kubectl get pods
kubectl logs busybox-pod
```

Notice the `command` field — BusyBox does not run a long-lived server like Nginx. Without a command that keeps it running, the container would exit immediately and the pod would go into `CrashLoopBackOff`.

**Verify:** Can you see "Hello from BusyBox" in the logs?

---

##### Task 3: Imperative vs Declarative
You have been using the declarative approach (writing YAML, then `kubectl apply`). Kubernetes also supports imperative commands:

```bash
# Create a pod without a YAML file
kubectl run redis-pod --image=redis:latest

# Check it
kubectl get pods
```

Now extract the YAML that Kubernetes generated:
```bash
kubectl get pod redis-pod -o yaml
```

Compare this output with your hand-written manifests. Notice how much extra metadata Kubernetes adds automatically (status, timestamps, uid, resource version).

You can also use dry-run to generate YAML without creating anything:
```bash
kubectl run test-pod --image=nginx --dry-run=client -o yaml
```

This is a powerful trick — use it to quickly scaffold a manifest, then customize it.

**Verify:** Save the dry-run output to a file and compare its structure with your nginx-pod.yaml. What fields are the same? What is different?

---

##### Task 4: Validate Before Applying
Before applying a manifest, you can validate it:

```bash
# Check if the YAML is valid without actually creating the resource
kubectl apply -f nginx-pod.yaml --dry-run=client

# Validate against the cluster's API (server-side validation)
kubectl apply -f nginx-pod.yaml --dry-run=server
```

Now intentionally break your YAML (remove the `image` field or add an invalid field) and run dry-run again. See what error you get.

**Verify:** What error does Kubernetes give when the image field is missing?

---

##### Task 5: Pod Labels and Filtering
Labels are how Kubernetes organizes and selects resources. You added labels in your manifests — now use them:

```bash
# List all pods with their labels
kubectl get pods --show-labels

# Filter pods by label
kubectl get pods -l app=nginx
kubectl get pods -l environment=dev

# Add a label to an existing pod
kubectl label pod nginx-pod environment=production

# Verify
kubectl get pods --show-labels

# Remove a label
kubectl label pod nginx-pod environment-
```

Write a manifest for a third pod with at least 3 labels (app, environment, team). Apply it and practice filtering.

---

##### Task 6: Clean Up
Delete all the pods you created:

```bash
# Delete by name
kubectl delete pod nginx-pod
kubectl delete pod busybox-pod
kubectl delete pod redis-pod

# Or delete using the manifest file
kubectl delete -f nginx-pod.yaml

# Verify everything is gone
kubectl get pods
```

Notice that when you delete a standalone Pod, it is gone forever. There is no controller to recreate it. This is why in production you use Deployments (coming on Day 52) instead of bare Pods.

---

#### Hints
- `kubectl apply -f` creates or updates a resource from a file
- `kubectl get pods -o wide` shows the node and IP address
- `kubectl describe pod <name>` shows events — very useful for debugging
- `kubectl logs <name>` shows container stdout/stderr
- `kubectl exec -it <name> -- /bin/sh` gives you a shell (use `/bin/sh` if `/bin/bash` is not available)
- Labels are just key-value pairs — they have no meaning to Kubernetes itself, only to selectors
- `--dry-run=client -o yaml` is your best friend for generating manifest templates

---

#### Documentation
Create `day-51-pods.md` with:
- The four required fields of a Kubernetes manifest and what each does
- Your nginx, busybox, and third pod manifests
- Difference between imperative (`kubectl run`) and declarative (`kubectl apply -f`)
- Screenshot of your pods running
- What happens when you delete a standalone Pod?

---

#### Submission
1. Add `day-51-pods.md` and your YAML files to `2026/day-51/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Wrote my first Kubernetes Pod manifests from scratch today. Created pods, got a shell inside them, and learned the difference between imperative and declarative approaches."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 51 – Kubernetes Manifests and Your First Pods — Notes & Solution

#### Task
Yesterday you set up a cluster. Today you actually deploy something. You will learn the structure of a Kubernetes manifest file and use it to create Pods — the smallest deployable unit in Kubernetes. By the end of today, you should be able to write a Pod definition from scratch without looking at docs.

---

#### The Anatomy of a Kubernetes Manifest

Every Kubernetes resource is defined using a YAML manifest with four required top-level fields:

```yaml
apiVersion: v1          # Which API version to use
kind: Pod               # What type of resource
metadata:               # Name, labels, namespace
  name: my-pod
  labels:
    app: my-app
spec:                   # The actual specification (what you want)
  containers:
  - name: my-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

- `apiVersion` — tells Kubernetes which API group to use. For Pods, it is `v1`.
- `kind` — the resource type. Today it is `Pod`. Later you will use `Deployment`, `Service`, etc.
- `metadata` — the identity of your resource. `name` is required. `labels` are key-value pairs used for organization and selection.
- `spec` — the desired state. For a Pod, this means which containers to run, which images, which ports, etc.

---

#### Challenge Tasks

##### Task 1: Create Your First Pod (Nginx)
Create a file called `nginx-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

Apply it:
```bash
kubectl apply -f nginx-pod.yaml
```

Verify:
```bash
kubectl get pods
kubectl get pods -o wide
```
Wait until the STATUS shows `Running`. Then explore:

#### Detailed info about the pod
kubectl describe pod nginx-pod

<img width="1881" height="654" alt="Screenshot 2026-10-03 215016" src="https://github.com/user-attachments/assets/07914958-633e-4d35-b078-225827cd97f1" />
- It shows pod metadata, node & network info,container details,readiness/status,mounted volumes, scheduling constraints, and lifecycle events.

#### Read the logs
kubectl logs nginx-pod

- It shows the container’s initialization,configuration steps and Nginx startup logs.

<img width="1506" height="393" alt="Screenshot 2026-10-03 215107" src="https://github.com/user-attachments/assets/ab946c25-5fc3-454b-9787-6ce04196a2e4" />

#### Get a shell inside the container
kubectl exec -it nginx-pod -- /bin/bash

#### Inside the container, run:
curl localhost:80
exit

**Verify:** Can you see the Nginx welcome page when you curl from inside the pod?

- Yes i can see Nginx welcome page inside pod

<img width="1506" height="679" alt="Screenshot 2026-10-03 215122" src="https://github.com/user-attachments/assets/f1ffb755-09fc-4405-acf0-7846af4128c7" />

---

##### Task 2: Create a Custom Pod (BusyBox)
Write a new manifest `busybox-pod.yaml` from scratch (do not copy-paste the nginx one):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-pod
  labels:
    app: busybox
    environment: dev
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ["sh", "-c", "echo Hello from BusyBox && sleep 3600"]
```

Apply and verify:
```bash
kubectl apply -f busybox-pod.yaml
kubectl get pods
kubectl logs busybox-pod
```

Notice the `command` field — BusyBox does not run a long-lived server like Nginx. Without a command that keeps it running, the container would exit immediately and the pod would go into `CrashLoopBackOff`.

**Verify:** Can you see "Hello from BusyBox" in the logs?

- Yes,
<img width="1607" height="294" alt="Screenshot 2026-10-03 215311" src="https://github.com/user-attachments/assets/308659f4-76f1-4927-86b0-7f446fbd8a5c" />


---

##### Task 3: Imperative vs Declarative
You have been using the declarative approach (writing YAML, then `kubectl apply`). Kubernetes also supports imperative commands:

```bash
# Create a pod without a YAML file
kubectl run redis-pod --image=redis:latest

# Check it
kubectl get pods
```

Now extract the YAML that Kubernetes generated:
```bash
kubectl get pod redis-pod -o yaml
```

Compare this output with your hand-written manifests. Notice how much extra metadata Kubernetes adds automatically (status, timestamps, uid, resource version).

You can also use dry-run to generate YAML without creating anything:
```bash
kubectl run test-pod --image=nginx --dry-run=client -o yaml
```

This is a powerful trick — use it to quickly scaffold a manifest, then customize it.

**Verify:** Save the dry-run output to a file and compare its structure with your nginx-pod.yaml. What fields are the same? What is different?


<img width="1330" height="423" alt="Screenshot 2026-10-03 215424" src="https://github.com/user-attachments/assets/b9f4f1e3-ccc6-4c13-92d8-4b8a2614beec" />
<img width="1641" height="388" alt="Screenshot 2026-10-03 215554" src="https://github.com/user-attachments/assets/dc652e6d-638f-405f-825e-2182c0384d0e" />


**Same fields:**
- apiVersion: v1
- kind: Pod
- metadata.name: nginx-pod
- metadata.labels.app: nginx
- spec.containers[0].name: nginx
- spec.containers[0].image: nginx:latest
- spec.containers[0].ports[0].containerPort: 80

**Different fields:**
- metadata.annotations
- creationTimestamp
- uid
- resourceVersion
- namespace
- spec.containers[0].imagePullPolicy
- resources
- terminationMessagePath/Policy
- volumeMounts
- spec.dnsPolicy
- restartPolicy
- enableServiceLinks
- nodeName
- schedulerName
- serviceAccount
- terminationGracePeriodSeconds
- tolerations
- volumesstatus

**Imperative (`kubectl run`)**

1. Creates resources immediately with a command.
2. Quick and good for testing;not stored as a file.

**Declarative (`kubectl apply -f`)**

1. Uses a YAML file to define desired state.
2. Versionable,repeatable,and preferred for production.

---

##### Task 4: Validate Before Applying
Before applying a manifest, you can validate it:

```bash
# Check if the YAML is valid without actually creating the resource
kubectl apply -f nginx-pod.yaml --dry-run=client

# Validate against the cluster's API (server-side validation)
kubectl apply -f nginx-pod.yaml --dry-run=server
```

Now intentionally break your YAML (remove the `image` field or add an invalid field) and run dry-run again. See what error you get.

**Verify:** What error does Kubernetes give when the image field is missing?

- error getting - pod/nginx-pod unchanged (server dry run)

<img width="1236" height="119" alt="Screenshot 2026-10-03 215729" src="https://github.com/user-attachments/assets/a0d4620b-3400-4203-a958-3803369dd0e8" />


---

##### Task 5: Pod Labels and Filtering
Labels are how Kubernetes organizes and selects resources. You added labels in your manifests — now use them:

```bash
# List all pods with their labels
kubectl get pods --show-labels

# Filter pods by label
kubectl get pods -l app=nginx
kubectl get pods -l environment=dev

# Add a label to an existing pod
kubectl label pod nginx-pod environment=production

# Verify
kubectl get pods --show-labels

# Remove a label
kubectl label pod nginx-pod environment-
```

Write a manifest for a third pod with at least 3 labels (app, environment, team). Apply it and practice filtering.
<img width="1919" height="735" alt="Screenshot 2026-10-03 220121" src="https://github.com/user-attachments/assets/565ec774-5afa-4a0a-a640-3545aa2415b3" />
<img width="1479" height="357" alt="Screenshot 2026-10-03 220251" src="https://github.com/user-attachments/assets/2301e400-0ebf-4549-a1f5-a49d4229d527" />


---

##### Task 6: Clean Up
Delete all the pods you created:

```bash
# Delete by name
kubectl delete pod nginx-pod
kubectl delete pod busybox-pod
kubectl delete pod redis-pod

# Or delete using the manifest file
kubectl delete -f nginx-pod.yaml

# Verify everything is gone
kubectl get pods
```

<img width="960" height="293" alt="Screenshot 2026-10-03 220821" src="https://github.com/user-attachments/assets/8fd22011-71ee-4183-93c9-4528e18a292b" />



Notice that when you delete a standalone Pod, it is gone forever. There is no controller to recreate it. This is why in production you use Deployments (coming on Day 52) instead of bare Pods.

---

#### Hints
- `kubectl apply -f` creates or updates a resource from a file
- `kubectl get pods -o wide` shows the node and IP address
- `kubectl describe pod <name>` shows events — very useful for debugging
- `kubectl logs <name>` shows container stdout/stderr
- `kubectl exec -it <name> -- /bin/sh` gives you a shell (use `/bin/sh` if `/bin/bash` is not available)
- Labels are just key-value pairs — they have no meaning to Kubernetes itself, only to selectors
- `--dry-run=client -o yaml` is your best friend for generating manifest templates

---

- What happens when you delete a standalone Pod?

- when you delete a standalone Pod, it is gone forever. There is no controller to recreate it.
This is why in production you use Deployments instead of bare Pods.

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a one-page IAM best-practice summary. | You can demonstrate, without notes: *write and debug IAM policies* — with evidence committed to `day-51/`. |
| 2 | Explain permission boundary vs SCP. | You can demonstrate, without notes: *use roles and temporary credentials* — with evidence committed to `day-51/`. |
| 3 | Create a cross-account role design (diagram). | You can demonstrate, without notes: *apply least privilege with access analysis* — with evidence committed to `day-51/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `AccessDenied` mysteries | Check explicit denies, SCPs, boundaries, resource policies, and condition keys in CloudTrail event. |
| Cannot assume role | Trust policy principal/conditions wrong. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Prefer roles over users, enforce MFA, avoid `*:*`, scope resources and conditions, review unused permissions monthly.
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

1. Identity vs resource policy?
2. How is IAM evaluated?
3. Role vs user?
4. How do you find unused permissions?
5. **Scenario:** A developer asked for AdministratorAccess 'temporarily'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a least-privilege policy? | ☐ | ☐ | ☐ | ☐ |
| Can I assume a role with MFA? | ☐ | ☐ | ☐ | ☐ |
| Can I debug AccessDenied? | ☐ | ☐ | ☐ | ☐ |
| Write and debug IAM policies | ☐ | ☐ | ☐ | ☐ |
| Use roles and temporary credentials | ☐ | ☐ | ☐ | ☐ |
| Apply least privilege with access analysis | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-51/` in your own repository:

```text
day-51/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-51
git add day-51/
git commit -m "day-51: aws iam deep dive"
git push -u origin day-51
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

## 18. Challenge Notes — Day 51: Serverless Architecture and AWS Lambda Basics

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 51** of the DevOps 90-Day Challenge!
Today, we start our journey into **Serverless Computing**, exploring the architecture where you build and run applications without thinking about servers.

[![](https://img.youtube.com/vi/knoOcF525sw/0.jpg)](https://www.youtube.com/watch?v=knoOcF525sw)

[Watch the video](https://www.youtube.com/watch?v=knoOcF525sw)

---

#### Objective

By the end of this session, you will:

* Understand what **Serverless** means (and what it doesn't).
* Create your first **AWS Lambda** function.
* Execute code in the cloud without provisioning a single EC2 instance.

---

#### Tools Used

* **AWS Console**
* **AWS Lambda**
* **Python** (for the function code)

---

#### Key Concepts

##### 1. What is Serverless?

Serverless doesn't mean "no servers". It means **you don't manage the servers**. AWS handles the infrastructure, scaling, and patching. You just focus on the code.

**Benefits:**
* **Pay-per-use**: You only pay for the compute time you consume.
* **Auto-scaling**: Scales from zero to thousands of requests automatically.
* **No Ops**: Zero infrastructure management.

##### 2. AWS Lambda

Lambda is an event-driven compute service. It runs your code in response to events (like a file upload, an HTTP request, or a timer).

**Basic Lambda Structure (Python):**

```python
import json

def lambda_handler(event, context):
    print("Function started...")
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **FaaS** | Function-as-a-Service (running `lambda_handler`). |
| **Event Object** | JSON data passed to the function containing trigger details. |
| **Cold Start** | The slight delay when a function is invoked for the first time. |

---

#### Bonus (Extra Learning)

* Compare **Lambda** vs **EC2** pricing for a small API.
* Explore **AWS Fargate** for serverless containers.

---

#### Congratulations!

You’ve successfully entered the world of **Serverless**!
You just ran code in the cloud without booting up a server. That's powerful.

---

#### Try These Next

* Change the runtime to **Node.js** and write a "Hello World" function.
* Try to invoke the function using the **AWS CLI**.

## 19. Cohort Practice — Day 51: Kubernetes Manifests and Your First Pods

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Yesterday you set up a cluster. Today you actually deploy something. You will learn the structure of a Kubernetes manifest file and use it to create Pods — the smallest deployable unit in Kubernetes. By the end of today, you should be able to write a Pod definition from scratch without looking at docs.

---

#### Expected Output
- At least 3 Pod manifests written by hand
- A markdown file: `day-51-pods.md`
- Screenshot of `kubectl get pods` showing your running pods

---

#### The Anatomy of a Kubernetes Manifest

Every Kubernetes resource is defined using a YAML manifest with four required top-level fields:

```yaml
apiVersion: v1          # Which API version to use
kind: Pod               # What type of resource
metadata:               # Name, labels, namespace
  name: my-pod
  labels:
    app: my-app
spec:                   # The actual specification (what you want)
  containers:
  - name: my-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

- `apiVersion` — tells Kubernetes which API group to use. For Pods, it is `v1`.
- `kind` — the resource type. Today it is `Pod`. Later you will use `Deployment`, `Service`, etc.
- `metadata` — the identity of your resource. `name` is required. `labels` are key-value pairs used for organization and selection.
- `spec` — the desired state. For a Pod, this means which containers to run, which images, which ports, etc.

---

#### Challenge Tasks

##### Task 1: Create Your First Pod (Nginx)
Create a file called `nginx-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

Apply it:
```bash
kubectl apply -f nginx-pod.yaml
```

Verify:
```bash
kubectl get pods
kubectl get pods -o wide
```

Wait until the STATUS shows `Running`. Then explore:
```bash
# Detailed info about the pod
kubectl describe pod nginx-pod

# Read the logs
kubectl logs nginx-pod

# Get a shell inside the container
kubectl exec -it nginx-pod -- /bin/bash

# Inside the container, run:
curl localhost:80
exit
```

**Verify:** Can you see the Nginx welcome page when you curl from inside the pod?

---

##### Task 2: Create a Custom Pod (BusyBox)
Write a new manifest `busybox-pod.yaml` from scratch (do not copy-paste the nginx one):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-pod
  labels:
    app: busybox
    environment: dev
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ["sh", "-c", "echo Hello from BusyBox && sleep 3600"]
```


Apply and verify:
```bash
kubectl apply -f busybox-pod.yaml
kubectl get pods
kubectl logs busybox-pod
```

Notice the `command` field — BusyBox does not run a long-lived server like Nginx. Without a command that keeps it running, the container would exit immediately and the pod would go into `CrashLoopBackOff`.

**Verify:** Can you see "Hello from BusyBox" in the logs?

---

##### Task 3: Imperative vs Declarative
You have been using the declarative approach (writing YAML, then `kubectl apply`). Kubernetes also supports imperative commands:

```bash
# Create a pod without a YAML file
kubectl run redis-pod --image=redis:latest

# Check it
kubectl get pods
```



Now extract the YAML that Kubernetes generated:
```bash
kubectl get pod redis-pod -o yaml
```

Compare this output with your hand-written manifests. Notice how much extra metadata Kubernetes adds automatically (status, timestamps, uid, resource version).

You can also use dry-run to generate YAML without creating anything:
```bash
kubectl run test-pod --image=nginx --dry-run=client -o yaml
```

This is a powerful trick — use it to quickly scaffold a manifest, then customize it.

**Verify:** Save the dry-run output to a file and compare its structure with your nginx-pod.yaml. What fields are the same? What is different?

---

##### Task 4: Validate Before Applying
Before applying a manifest, you can validate it:

```bash
# Check if the YAML is valid without actually creating the resource
kubectl apply -f nginx-pod.yaml --dry-run=client

# Validate against the cluster's API (server-side validation)
kubectl apply -f nginx-pod.yaml --dry-run=server
```

Now intentionally break your YAML (remove the `image` field or add an invalid field) and run dry-run again. See what error you get.

**Verify:** What error does Kubernetes give when the image field is missing?

---

##### Task 5: Pod Labels and Filtering
Labels are how Kubernetes organizes and selects resources. You added labels in your manifests — now use them:

```bash
# List all pods with their labels
kubectl get pods --show-labels

# Filter pods by label
kubectl get pods -l app=nginx
kubectl get pods -l environment=dev

# Add a label to an existing pod
kubectl label pod nginx-pod environment=production

# Verify
kubectl get pods --show-labels

# Remove a label
kubectl label pod nginx-pod environment-
```

Write a manifest for a third pod with at least 3 labels (app, environment, team). Apply it and practice filtering.

---

##### Task 6: Clean Up
Delete all the pods you created:

```bash
# Delete by name
kubectl delete pod nginx-pod
kubectl delete pod busybox-pod
kubectl delete pod redis-pod

# Or delete using the manifest file
kubectl delete -f nginx-pod.yaml

# Verify everything is gone
kubectl get pods
```

Notice that when you delete a standalone Pod, it is gone forever. There is no controller to recreate it. This is why in production you use Deployments (coming on Day 52) instead of bare Pods.

---

#### Hints
- `kubectl apply -f` creates or updates a resource from a file
- `kubectl get pods -o wide` shows the node and IP address
- `kubectl describe pod <name>` shows events — very useful for debugging
- `kubectl logs <name>` shows container stdout/stderr
- `kubectl exec -it <name> -- /bin/sh` gives you a shell (use `/bin/sh` if `/bin/bash` is not available)
- Labels are just key-value pairs — they have no meaning to Kubernetes itself, only to selectors
- `--dry-run=client -o yaml` is your best friend for generating manifest templates

---

#### Documentation
Create `day-51-pods.md` with:
- The four required fields of a Kubernetes manifest and what each does
- Your nginx, busybox, and third pod manifests
- Difference between imperative (`kubectl run`) and declarative (`kubectl apply -f`)
- Screenshot of your pods running
- What happens when you delete a standalone Pod?

---

#### Submission
1. Add `day-51-pods.md` and your YAML files to `2026/day-51/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Wrote my first Kubernetes Pod manifests from scratch today. Created pods, got a shell inside them, and learned the difference between imperative and declarative approaches."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-51-pods






- `kubectl apply -f` creates or updates a resource from a file
- `kubectl get pods -o wide` shows the node and IP address
- `kubectl describe pod <name>` shows events — very useful for debugging
- `kubectl logs <name>` shows container stdout/stderr
- `kubectl exec -it <name> -- /bin/sh` gives you a shell (use `/bin/sh` if `/bin/bash` is not available)
- Labels are just key-value pairs — they have no meaning to Kubernetes itself, only to selectors
- `--dry-run=client -o yaml` is your best friend for generating manifest templates

## 20. Hands-on Project — Day 51: ConfigMaps & Secrets

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Config via envFrom + mounted files with Kustomize overlays and Jenkins pipeline.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [k8s/base/configmap.yaml](files/hands-on-projects/k8s/base/configmap.yaml)
- [k8s/base/deployment.yaml](files/hands-on-projects/k8s/base/deployment.yaml)
- [k8s/base/kustomization.yaml](files/hands-on-projects/k8s/base/kustomization.yaml)
- [k8s/base/secret.yaml](files/hands-on-projects/k8s/base/secret.yaml)
- [k8s/base/service.yaml](files/hands-on-projects/k8s/base/service.yaml)
- [k8s/overlays/prod/kustomization.yaml](files/hands-on-projects/k8s/overlays/prod/kustomization.yaml)
- [k8s/overlays/staging/kustomization.yaml](files/hands-on-projects/k8s/overlays/staging/kustomization.yaml)
- [scripts/deploy.sh](files/hands-on-projects/scripts/deploy.sh)
- [scripts/gen_secret.sh](files/hands-on-projects/scripts/gen_secret.sh)
- [scripts/rollout_status.sh](files/hands-on-projects/scripts/rollout_status.sh)


---

[← Day 50](../day-50/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 52 →](../day-52/README.md)
