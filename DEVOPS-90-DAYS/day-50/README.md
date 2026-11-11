# Day 50 — Cloud Fundamentals, AWS Account Setup & Billing Guardrails

[← Day 49](../day-49/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 51 →](../day-51/README.md)

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

- [ ] Explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model
- [ ] Create a secure AWS account with budgets
- [ ] Use AWS CLI with SSO/profiles

## 2. Prerequisites

- Credit/debit card for AWS free tier.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Cloud basics

Regions contain multiple isolated AZs. Shared responsibility: provider secures the cloud; you secure what you put in it. Well-Architected pillars: operational excellence, security, reliability, performance efficiency, cost optimisation, sustainability.

### 3.2 Account hygiene

Protect the root user (MFA, no access keys), use IAM Identity Center/SSO or an admin IAM user for lab, enable CloudTrail, set budgets and alerts BEFORE launching anything.

### 3.3 AWS CLI

Profiles, regions, `aws sts get-caller-identity`, `--query` (JMESPath), `--output table`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create account; enable MFA on root; create non-root admin identity.
2. [ ] Create a monthly $10 budget with email alerts at 50/80/100%.
3. [ ] Install and configure AWS CLI v2 (`aws configure sso`).
4. [ ] Enable CloudTrail (management events) and cost allocation tags.
5. [ ] List regions and AZs with the CLI.

## 5. Real-World Scenario

> A student left a GPU instance running over the weekend and received a $900 bill. Put guardrails in place so it can't happen.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws configure sso
aws sts get-caller-identity
aws ec2 describe-regions --query 'Regions[].RegionName' --output table
aws ec2 describe-availability-zones --region us-east-1 --query 'AvailabilityZones[].ZoneName'
aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text)
aws cloudtrail describe-trails
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 50 – Kubernetes Architecture and Cluster Setup — Challenge Brief

#### Task
You have been building and shipping containers with Docker. But what happens when you need to run hundreds of containers across multiple servers? You need an orchestrator. Today you start your Kubernetes journey — understand the architecture, set up a local cluster, and run your first `kubectl` commands.

This is where things get real.

---

#### Expected Output
- A running local Kubernetes cluster (kind or minikube)
- A markdown file: `day-50-k8s-setup.md`
- Screenshot of `kubectl get nodes` showing your cluster is ready

---

#### Challenge Tasks

##### Task 1: Recall the Kubernetes Story
Before touching a terminal, write down from memory:

1. Why was Kubernetes created? What problem does it solve that Docker alone cannot?
2. Who created Kubernetes and what was it inspired by?
3. What does the name "Kubernetes" mean?

Do not look anything up yet. Write what you remember from the session, then verify against the official docs.

---

##### Task 2: Draw the Kubernetes Architecture
From memory, draw or describe the Kubernetes architecture. Your diagram should include:

**Control Plane (Master Node):**
- API Server — the front door to the cluster, every command goes through it
- etcd — the database that stores all cluster state
- Scheduler — decides which node a new pod should run on
- Controller Manager — watches the cluster and makes sure the desired state matches reality

**Worker Node:**
- kubelet — the agent on each node that talks to the API server and manages pods
- kube-proxy — handles networking rules so pods can communicate
- Container Runtime — the engine that actually runs containers (containerd, CRI-O)

After drawing, verify your understanding:
- What happens when you run `kubectl apply -f pod.yaml`? Trace the request through each component.
- What happens if the API server goes down?
- What happens if a worker node goes down?

---

##### Task 3: Install kubectl
`kubectl` is the CLI tool you will use to talk to your Kubernetes cluster.

Install it:
```bash
# macOS
brew install kubectl

# Linux (amd64)
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Windows (with chocolatey)
choco install kubernetes-cli
```

Verify:
```bash
kubectl version --client
```

---

##### Task 4: Set Up Your Local Cluster
Choose **one** of the following. Both give you a fully functional Kubernetes cluster on your machine.

**Option A: kind (Kubernetes in Docker)**
```bash
# Install kind
# macOS
brew install kind

# Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create a cluster
kind create cluster --name devops-cluster

# Verify
kubectl cluster-info
kubectl get nodes
```

**Option B: minikube**
```bash
# Install minikube
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start a cluster
minikube start

# Verify
kubectl cluster-info
kubectl get nodes
```

Write down: Which one did you choose and why?

---

##### Task 5: Explore Your Cluster
Now that your cluster is running, explore it:

```bash
# See cluster info
kubectl cluster-info

# List all nodes
kubectl get nodes

# Get detailed info about your node
kubectl describe node <node-name>

# List all namespaces
kubectl get namespaces

# See ALL pods running in the cluster (across all namespaces)
kubectl get pods -A
```

Look at the pods running in the `kube-system` namespace:
```bash
kubectl get pods -n kube-system
```

You should see pods like `etcd`, `kube-apiserver`, `kube-scheduler`, `kube-controller-manager`, `coredns`, and `kube-proxy`. These are the architecture components you drew in Task 2 — running as pods inside the cluster.

**Verify:** Can you match each running pod in `kube-system` to a component in your architecture diagram?

---

##### Task 6: Practice Cluster Lifecycle
Build muscle memory with cluster operations:

```bash
# Delete your cluster
kind delete cluster --name devops-cluster
# (or: minikube delete)

# Recreate it
kind create cluster --name devops-cluster
# (or: minikube start)

# Verify it is back
kubectl get nodes
```

Try these useful commands:
```bash
# Check which cluster kubectl is connected to
kubectl config current-context

# List all available contexts (clusters)
kubectl config get-contexts

# See the full kubeconfig
kubectl config view
```

Write down: What is a kubeconfig? Where is it stored on your machine?

---

#### Hints
- kind requires Docker to be running (it creates clusters using containers)
- minikube can use Docker, VirtualBox, or other drivers
- The default kubeconfig file is at `~/.kube/config`
- `kubectl get pods -A` is short for `kubectl get pods --all-namespaces`
- If `kubectl` cannot connect, check if your cluster is running: `kind get clusters` or `minikube status`
- `-o wide` flag gives extra details: `kubectl get nodes -o wide`

---

#### Documentation
Create `day-50-k8s-setup.md` with:
- Kubernetes history in your own words (3-4 sentences)
- Your architecture diagram (text-based or image)
- Which tool you chose (kind/minikube) and why
- Screenshot of `kubectl get nodes` and `kubectl get pods -n kube-system`
- What each kube-system pod does

---

#### Submission
1. Add `day-50-k8s-setup.md` to `2026/day-50/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started my Kubernetes journey today. Set up a local cluster, explored the architecture, and saw the control plane components running as actual pods. The orchestration chapter begins."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 50 – Kubernetes Architecture and Cluster Setup — Notes & Solution

#### Task
You have been building and shipping containers with Docker. But what happens when you need to run hundreds of containers across multiple servers? You need an orchestrator. Today you start your Kubernetes journey — understand the architecture, set up a local cluster, and run your first `kubectl` commands.

This is where things get real.

---

#### Challenge Tasks

##### Task 1: Recall the Kubernetes Story
Before touching a terminal, write down from memory:

1. Why was Kubernetes created? What problem does it solve that Docker alone cannot?
- Kubernetes was created by Google to automate the management, scaling, and deployment of containerized applications across clusters of servers, solving the problem of coordination and management at scale that Docker alone cannot handle.

- Docker allows to build and run containers,but it mainly focuses on running containers on a single machine.
- When applications grow and require many containers running across multiple servers, managing them manually becomes difficult. Tasks like scaling containers, restarting failed ones
- Kubernetes solves these issues by acting as a container orchestration system, which can automatically:
    - Scale containers based on demand
    - Restart containers when they fail
    - Manage and schedule containers across multiple machines
- In short, Docker runs containers, while Kubernetes manages large numbers of containers across a cluster of servers.

2. Who created Kubernetes and what was it inspired by?
- Google introduced **Kubernetes** in 2014.
- The project was inspired by Borg, an internal system used by Google to manage containers at massive scale.
- Borg could automatically handle tasks such as scaling and restarting containers.
- Google later released Kubernetes as an open-source project.
- Today it is maintained by the (CNCF) Cloud Native Computing Foundation, which is part of the Linux Foundation.

3. What does the name "Kubernetes" mean?
- The name Kubernetes comes from a Greek word meaning “helmsman” or “ship pilot.” It refers to someone who steers a ship.
- This name reflects the role of Kubernetes, which guides and manages containers, similar to how a helmsman controls a ship.
- Kubernetes is often shortened to **K8s**, where the number 8 represents the eight letters between K and S.

---

##### Task 2: Draw the Kubernetes Architecture
From memory, draw or describe the Kubernetes architecture. Your diagram should include:

**Control Plane (Master Node):**
- API Server — the front door to the cluster, every command goes through it
- etcd — the database that stores all cluster state
- Scheduler — decides which node a new pod should run on
- Controller Manager — watches the cluster and makes sure the desired state matches reality

**Worker Node:**
- kubelet — the agent on each node that talks to the API server and manages pods
- kube-proxy — handles networking rules so pods can communicate
- Container Runtime — the engine that actually runs containers (containerd, CRI-O)

<img width="1312" height="1199" alt="ChatGPT Image Sep 19, 2026, 09_00_40 PM" src="https://github.com/user-attachments/assets/13ddc930-4de1-478a-9799-551fbf4db9e6" />



After drawing, verify your understanding:
- What happens when you run `kubectl apply -f pod.yaml`? Trace the request through each component.

  1. kubectl reads the pod.yaml file.
  2. The request is sent to the Kubernetes API Server.
  3. API Server performs: Authentication, Authorization
  4. If valid, the Pod object is stored in etcd.
  5. The Kubernetes Scheduler detects the unscheduled Pod and assigns it to a node.
  6. The kubelet on that node sees the Pod and instructs the container runtime (e.g., containerd) to start the container.
  7. The container starts and the Pod status is updated to Running in the API Server.

- What happens if the API server goes down?
  - You cannot run kubectl commands or make changes to the cluster.
  - Running pods and services continue working, but no new deployments or scheduling happen.

- What happens if a worker node goes down?
  - Pods on that node stop running.
  - Kubernetes detects the failure and reschedules those pods on other healthy nodes.
    
---

##### Task 3: Install kubectl
`kubectl` is the CLI tool you will use to talk to your Kubernetes cluster.

Install it:
```bash
# macOS
brew install kubectl

# Linux (amd64)
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Windows (with chocolatey)
choco install kubernetes-cli
```

Verify:
```bash
kubectl version --client
```
<img width="1059" height="95" alt="Screenshot 2026-09-22 141113" src="https://github.com/user-attachments/assets/753aee65-8737-42b0-854b-a3d607bbf3b2" />


---

##### Task 4: Set Up Your Local Cluster
Choose **one** of the following. Both give you a fully functional Kubernetes cluster on your machine.

**Option A: kind (Kubernetes in Docker)**
```bash
# Install kind
# macOS
brew install kind

# Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create a cluster
kind create cluster --name devops-cluster

# Verify
kubectl cluster-info
kubectl get nodes
```
<img width="1221" height="513" alt="Screenshot 2026-09-22 141337" src="https://github.com/user-attachments/assets/0c48a00c-4263-498e-86b9-475de94c501b" />


- The cluster initialized successfully, and the control plane node became Ready.

Cluster endpoint: (https://127.0.0.1:57030)
Node name: cluster-control-plane
Role: control-plane
Kubernetes version:  v1.35.0

Write down: Which one did you choose and why?
- I chose **KIND (Kubernetes IN Docker)** because it is lightweight and easy to set up for local testing. 
- It runs a **Kubernetes** Cluster inside Docker containers, so I can quickly create & delete clusters without needing VMs or a cloud environment.
- This makes it ideal for **development, CI testing, and experimenting with Kubernetes features**.

---

##### Task 5: Explore Your Cluster
Now that your cluster is running, explore it:

```bash
# See cluster info
kubectl cluster-info

# List all nodes
kubectl get nodes

# Get detailed info about your node
kubectl describe node <node-name>

<img width="1237" height="702" alt="image" src="https://github.com/user-attachments/assets/e4ec8c9f-d296-4ee9-8f65-2ca3421c5e54" />

- This kubectl command in Kubernetes shows detailed information about the node devops-cluster-control-plane, including its status,resources,conditions,running pods and events.

# List all namespaces
kubectl get namespaces

<img width="702" height="166" alt="image" src="https://github.com/user-attachments/assets/af70447e-d8bb-45fa-83a2-fed5d56aa49d" />

# See ALL pods running in the cluster (across all namespaces)
kubectl get pods -A
```
<img width="1449" height="274" alt="Screenshot 2026-09-22 141543" src="https://github.com/user-attachments/assets/ce781934-8bab-4232-8200-27c4f71d3d15" />

Look at the pods running in the `kube-system` namespace:
```bash
kubectl get pods -n kube-system
```
<img width="1225" height="254" alt="Screenshot 2026-09-22 141603" src="https://github.com/user-attachments/assets/7eb30f51-c9af-4b57-b226-25f197a5390e" />

kube-system Contains core Kubernetes system components such as:

- CoreDNS – cluster DNS service
   - etcd – cluster key-value database
   - kube-apiserver – API server for the cluster
   - kube-controller-manager – manages controllers
   - kube-scheduler – schedules pods to nodes
   - kube-proxy – manages networking rules
   - kindnet – networking plugin

- local-path-storage
   - local-path-provisioner – provides dynamic local storage for pods.

You should see pods like `etcd`, `kube-apiserver`, `kube-scheduler`, `kube-controller-manager`, `coredns`, and `kube-proxy`. These are the architecture components you drew in Task 2 — running as pods inside the cluster.

**Verify:** Can you match each running pod in `kube-system` to a component in your architecture diagram?

**Status**

- All pods show READY 1/1 and STATUS Running, meaning the cluster components are working correctly.
   - Look at the pods running in the kube-system namespace:

```kubectl get pods -n kube-system```

<img width="1225" height="254" alt="Screenshot 2026-09-22 141603" src="https://github.com/user-attachments/assets/dd9f5676-7a3a-4ad1-8ca9-92ae094eaeb9" />



##### Kubernetes System Pods

| Pod Name | Purpose |
|---|---|
| coredns | Provides DNS services so pods can communicate using service names. |
| etcd-devops-cluster-control-plane | Distributed key-value store that holds all cluster configuration and state. |
| kindnet | Networking plugin used by KIND to enable pod networking. |
| kube-apiserver-devops-cluster-control-plane | Main API server that handles all Kubernetes API requests. |
| kube-controller-manager-devops-cluster-control-plane | Runs controllers that manage cluster state such as nodes, replicas, and endpoints. |
| kube-proxy | Manages network rules and enables service networking for pods. |
| kube-scheduler-devops-cluster-control-plane | Assigns newly created pods to available nodes. |

##### Status

**READY 1/1**: All containers inside the pod are running.

**STATUS Running**: Pod is functioning correctly.

**RESTARTS 0**: No container crashes occurred.

**AGE 30m**: Pod has been running for 30 minutes.

---

##### Task 6: Practice Cluster Lifecycle
Build muscle memory with cluster operations:

```bash
# Delete your cluster
kind delete cluster --name devops-cluster
# (or: minikube delete)

# Recreate it
kind create cluster --name devops-cluster
# (or: minikube start)

# Verify it is back
kubectl get nodes
```
<img width="1013" height="98" alt="Screenshot 2026-09-22 141651" src="https://github.com/user-attachments/assets/d3e022ca-18ff-4392-8bdf-6e44386319ea" />
<img width="1401" height="411" alt="Screenshot 2026-09-22 141751" src="https://github.com/user-attachments/assets/b193fad9-1023-4752-8408-c1511b943f7c" />


Try these useful commands:
```bash
# Check which cluster kubectl is connected to
kubectl config current-context

# List all available contexts (clusters)
kubectl config get-contexts

# See the full kubeconfig
kubectl config view
```
<img width="1919" height="621" alt="Screenshot 2026-09-22 141848" src="https://github.com/user-attachments/assets/b4b9fa63-3b71-45b7-aeb7-019272d0e7ea" />


Write down: What is a kubeconfig? Where is it stored on your machine?
- kubeconfig is a configuration file used by Kubernetes clients kubectl to connect to a Kubernetes cluster.
- It stores cluster details, user credentials, and contexts.
- Location: ~/.kube/config

- `-o wide` flag gives extra details: `kubectl get nodes -o wide`
- 
---

#### Hints
- kind requires Docker to be running (it creates clusters using containers)
- minikube can use Docker, VirtualBox, or other drivers
- The default kubeconfig file is at `~/.kube/config`
- `kubectl get pods -A` is short for `kubectl get pods --all-namespaces`
- If `kubectl` cannot connect, check if your cluster is running: `kind get clusters` or `minikube status`

#### `-o wide` flag gives extra details: `kubectl get nodes -o wide`

<img width="1919" height="140" alt="Screenshot 2026-09-22 141910" src="https://github.com/user-attachments/assets/0ed209ad-a96b-438c-b372-b7ffb3811848" />


---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 'cloud cost guardrails' checklist. | You can demonstrate, without notes: *explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model* — with evidence committed to `day-50/`. |
| 2 | Map the 6 Well-Architected pillars to examples. | You can demonstrate, without notes: *create a secure AWS account with budgets* — with evidence committed to `day-50/`. |
| 3 | Create a tagging standard (owner, env, project, cost-center). | You can demonstrate, without notes: *use AWS CLI with SSO/profiles* — with evidence committed to `day-50/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| CLI uses wrong account | `export AWS_PROFILE=...`; verify with sts. |
| Unexpected charges | Use Cost Explorer + Billing alerts; delete idle resources; check all regions. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Root MFA, no root keys, least privilege, budgets, CloudTrail, avoid wide-open resources. Delete lab resources after every session.
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

1. What is shared responsibility?
2. Region vs AZ?
3. Why not use the root user?
4. How do you prevent surprise bills?
5. **Scenario:** A student left a GPU instance running over the weekend and received a $900 bill. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Do I have budgets and MFA? | ☐ | ☐ | ☐ | ☐ |
| Can I use CLI profiles? | ☐ | ☐ | ☐ | ☐ |
| Can I explain Well-Architected pillars? | ☐ | ☐ | ☐ | ☐ |
| Explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model | ☐ | ☐ | ☐ | ☐ |
| Create a secure AWS account with budgets | ☐ | ☐ | ☐ | ☐ |
| Use AWS CLI with SSO/profiles | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-50/` in your own repository:

```text
day-50/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-50
git add day-50/
git commit -m "day-50: cloud fundamentals, aws account setup & billing guardrails"
git push -u origin day-50
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

---

[← Day 49](../day-49/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 51 →](../day-51/README.md)
