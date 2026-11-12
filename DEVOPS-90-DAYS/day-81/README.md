# Day 81 — Observability I: Prometheus, Exporters & Grafana

[← Day 80](../day-80/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 82 →](../day-82/README.md)

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

- [ ] Explain metrics, logs and traces and when each helps
- [ ] Deploy Prometheus and Grafana (kube-prometheus-stack)
- [ ] Write PromQL and build a dashboard

## 2. Prerequisites

- Days 71-77.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Observability pillars

Metrics (aggregated numbers), logs (events), traces (request path across services), plus profiling and events. Monitoring tells you something is wrong; observability helps you ask why.

### 3.2 Prometheus

Pull-based TSDB; targets via ServiceMonitor/PodMonitor; metric types (counter, gauge, histogram); PromQL `rate()`, `sum by`, `histogram_quantile`.

### 3.3 Grafana

Dashboards as code (JSON/Terraform/ConfigMaps); golden signals: latency, traffic, errors, saturation (RED/USE methods).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install `kube-prometheus-stack` via Helm (or Argo CD).
2. [ ] Open Grafana; explore built-in dashboards.
3. [ ] Instrument your app with `/metrics` (prometheus_client) and add ServiceMonitor.
4. [ ] Write PromQL: request rate, error ratio, p95 latency.
5. [ ] Create dashboard with RED panels and export JSON to git.

## 5. Real-World Scenario

> Latency complaints: show how to find which service/endpoint and since when, within 5 minutes.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
helm install mon prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
kubectl -n monitoring port-forward svc/mon-grafana 3000:80
sum(rate(http_requests_total[5m])) by (path)
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
kubectl apply -f servicemonitor.yaml
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 81 -- Introduction to Amazon EKS with Terraform

#### Task
You have been running Kubernetes locally with Kind. That works for learning, but the AI-BankApp needs a production environment -- managed control plane, auto-scaling nodes, persistent EBS storage, and IAM integration.

Amazon EKS (Elastic Kubernetes Service) is AWS's managed Kubernetes offering. The AI-BankApp project (https://github.com/TrainWithShubham/AI-BankApp-DevOps, branch `feat/gitops`) already has a complete Terraform configuration in its `terraform/` directory that provisions a production-grade EKS cluster. Today you understand EKS architecture, study the Terraform configs, provision the cluster, and connect to it.

---

#### Expected Output
- Understanding of EKS architecture and its components
- The AI-BankApp's Terraform configs reviewed and understood
- A running EKS cluster provisioned via Terraform
- kubectl connected to the EKS cluster
- A markdown file: `day-81-eks-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand EKS Architecture
Research and write notes on:

1. **What does "managed Kubernetes" mean?**
   - AWS manages the **control plane** (API server, etcd, scheduler, controller manager)
   - You manage the **data plane** (worker nodes where your pods run)
   - AWS handles control plane upgrades, patching, and high availability across multiple AZs

2. **EKS components:**
   - **EKS Control Plane** -- managed by AWS, runs in AWS-owned VPC, accessible via API endpoint
   - **Node Groups** -- EC2 instances that run your pods
     - **Managed Node Groups** -- AWS handles provisioning, scaling, and updates
     - **Self-Managed Nodes** -- you manage the EC2 instances yourself
     - **Fargate Profiles** -- serverless, no nodes to manage at all
   - **VPC and Networking** -- EKS runs inside your VPC with subnets across AZs
   - **IAM Integration** -- EKS uses IAM roles for cluster access and pod-level permissions (IRSA)

3. **EKS add-ons the AI-BankApp uses** (from `terraform/eks.tf`):
   - `coredns` -- DNS resolution inside the cluster
   - `kube-proxy` -- network routing for services
   - `vpc-cni` -- AWS VPC CNI plugin, assigns VPC IPs to pods
   - `eks-pod-identity-agent` -- enables pod-level IAM roles
   - `aws-ebs-csi-driver` -- allows pods to use EBS volumes (needed for MySQL and Ollama storage)
   - `metrics-server` -- enables `kubectl top` and HPA

---

##### Task 2: Study the AI-BankApp Terraform Configuration
Clone the repo and examine the `terraform/` directory:

```bash
git clone -b feat/gitops https://github.com/TrainWithShubham/AI-BankApp-DevOps.git
cd AI-BankApp-DevOps/terraform
ls
```

```
argocd.tf           # ArgoCD Helm release
eks.tf              # EKS cluster + node group + IRSA
outputs.tf          # Cluster info and helper commands
provider.tf         # AWS + Helm providers, locals
terraform.tfvars    # Default variable values
variables.tf        # Input variables
vpc.tf              # VPC with public/private/intra subnets
```

**Study each file and understand what it provisions:**

**`variables.tf` and `terraform.tfvars`:**
```hcl
# The defaults:
aws_region         = "us-west-2"
cluster_name       = "bankapp-eks"
cluster_version    = "1.35"
node_instance_type = "t3.medium"
node_desired_count = 3
node_max_count     = 5
```

**`vpc.tf`** -- Networking foundation:
- Uses the `terraform-aws-modules/vpc/aws` module
- 3 Availability Zones with:
  - **Public subnets** (10.0.1-3.0/24) -- for load balancers, tagged with `kubernetes.io/role/elb`
  - **Private subnets** (10.0.4-6.0/24) -- for worker nodes, tagged with `kubernetes.io/role/internal-elb`
  - **Intra subnets** (10.0.7-9.0/24) -- for EKS control plane ENIs
- NAT Gateway enabled for outbound internet from private subnets

**`eks.tf`** -- The cluster itself:
- Uses the `terraform-aws-modules/eks/aws` module (version ~> 21.0)
- AL2023 AMI for nodes (Amazon Linux 2023)
- 3x `t3.medium` instances (min 3, max 5)
- All 6 EKS add-ons installed as cluster add-ons
- IRSA configured for the EBS CSI driver
- Public + private API endpoint access

**`argocd.tf`** -- ArgoCD via Helm:
- Installs ArgoCD using the `argo-cd` Helm chart
- Exposed as a LoadBalancer service
- Depends on the EKS module (created after the cluster is ready)

**`outputs.tf`** -- Helper commands:
- Outputs the `aws eks update-kubeconfig` command
- Outputs the ArgoCD initial password retrieval command

**Document:** Draw the architecture: VPC -> Subnets -> EKS Control Plane -> Node Group -> Pods

---

##### Task 3: Provision the EKS Cluster
Make sure you have the required tools:
```bash
terraform --version    # >= 1.0
aws --version          # AWS CLI v2
kubectl version --client
helm version
```

Configure AWS credentials:
```bash
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-west-2), Output (json)

# Verify
aws sts get-caller-identity
```

Initialize and apply:
```bash
cd terraform

terraform init
terraform plan
```

Review the plan carefully. It will create:
- 1 VPC with 9 subnets, NAT gateway, internet gateway
- 1 EKS cluster with control plane
- 1 managed node group (3x t3.medium)
- 6 EKS add-ons
- IAM roles and policies for the cluster, nodes, and EBS CSI driver
- ArgoCD Helm release

```bash
terraform apply
```

This takes 15-20 minutes. While waiting, review the Terraform output for CloudFormation-like progress.

After completion, note the outputs:
```bash
terraform output
```

---

##### Task 4: Connect to Your Cluster
Update kubeconfig using the Terraform output:
```bash
aws eks update-kubeconfig --name bankapp-eks --region us-west-2
```

Verify the connection:
```bash
# Check context
kubectl config current-context

# Cluster info
kubectl cluster-info

# List nodes
kubectl get nodes -o wide
```

You should see 3 nodes with status `Ready`, instance type `t3.medium`, spread across 3 AZs.

Explore the cluster:
```bash
# System pods
kubectl get pods -n kube-system

# All the add-ons are running
kubectl get daemonsets -n kube-system

# EBS CSI driver
kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver

# Metrics server (enables kubectl top and HPA)
kubectl top nodes
```

Check ArgoCD is running:
```bash
kubectl get pods -n argocd
kubectl get svc -n argocd
```

Get the ArgoCD admin password:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

Get the ArgoCD LoadBalancer URL:
```bash
kubectl get svc -n argocd argocd-server -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

Open the URL in your browser and log in with `admin` and the password from above. You will use ArgoCD on Days 84-86.

---

##### Task 5: Deploy the AI-BankApp Manually (Before ArgoCD)
Before setting up GitOps, deploy the app manually to validate the cluster works.

Apply the raw manifests from the `k8s/` directory:
```bash
cd ../  # Back to the repo root

kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/pv.yml
kubectl apply -f k8s/pvc.yml
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/mysql-deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ollama-deployment.yml
kubectl apply -f k8s/bankapp-deployment.yml
kubectl apply -f k8s/hpa.yml
```

Watch the pods come up:
```bash
kubectl get pods -n bankapp -w
```

The startup order is:
1. MySQL starts and becomes healthy (15-30 seconds)
2. Ollama starts and pulls the TinyLlama model (2-5 minutes)
3. BankApp init containers wait for both, then the app starts (30-60 seconds after dependencies)

Check PVCs are bound to EBS volumes:
```bash
kubectl get pvc -n bankapp
kubectl get pv
```

You should see 5Gi and 10Gi EBS volumes in the correct AZs.

Once all pods are running, access the app:
```bash
kubectl port-forward svc/bankapp-service -n bankapp 8080:8080
```

Open `http://localhost:8080` -- you should see the AI-BankApp login page. Register an account, log in, and try the AI chatbot.

**Verify the HPA:**
```bash
kubectl get hpa -n bankapp
```

---

##### Task 6: Understand EKS Costs and Clean Up Strategy
EKS is not free. The AI-BankApp cluster costs:

| Component | Cost (approximate) |
|-----------|-------------------|
| EKS Control Plane | $0.10/hr (~$73/month) |
| t3.medium nodes (3x) | ~$0.042/hr each (~$91/month total) |
| NAT Gateway | ~$0.045/hr + data transfer (~$33/month) |
| EBS volumes (15Gi total) | ~$1.50/month |
| LoadBalancer (ArgoCD) | ~$0.025/hr (~$18/month) |
| **Total for this lab** | **~$220/month (~$7/day)** |

**Important:** Do NOT leave the cluster running when you are not using it.

Delete the BankApp workload (keep the cluster for Days 82-83):
```bash
kubectl delete -f k8s/hpa.yml
kubectl delete -f k8s/bankapp-deployment.yml
kubectl delete -f k8s/ollama-deployment.yml
kubectl delete -f k8s/mysql-deployment.yml
kubectl delete -f k8s/service.yml
kubectl delete -f k8s/secrets.yml
kubectl delete -f k8s/configmap.yml
kubectl delete -f k8s/pvc.yml
kubectl delete -f k8s/pv.yml
kubectl delete -f k8s/namespace.yml
```

To destroy everything (do this at the end of Day 83 or if taking a break):
```bash
cd terraform
terraform destroy
```

**Document:** What are the cost components of the AI-BankApp EKS setup? Why is the NAT Gateway surprisingly expensive?

---

#### Hints
- `terraform apply` for EKS takes 15-20 minutes -- the control plane provisioning is the longest step
- If Terraform fails midway, run `terraform apply` again -- it is idempotent and will resume from where it stopped
- The VPC CNI plugin gives each pod its own VPC IP -- pods are directly routable within the VPC
- `t3.medium` (2 vCPU, 4 GB RAM) can run approximately 17 pods per node (limited by ENI/IP allocation)
- The AI-BankApp's Ollama pod needs 2-2.5Gi RAM -- make sure your nodes have enough capacity
- If `kubectl` cannot connect after `terraform apply`, run the `aws eks update-kubeconfig` command from the Terraform output
- ArgoCD is installed by Terraform but the Application manifest is not applied yet -- that comes on Day 84
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`) -- `terraform/` directory

---

#### Documentation
Create `day-81-eks-intro.md` with:
- EKS architecture diagram (VPC, subnets, control plane, node group, add-ons)
- Each Terraform file explained in your own words
- Screenshot of `kubectl get nodes` showing 3 EKS nodes across AZs
- Screenshot of `kubectl get pods -n kube-system` showing all add-ons
- Screenshot of the AI-BankApp running on EKS (login page or dashboard)
- Screenshot of `kubectl get pvc -n bankapp` showing EBS-backed volumes
- EKS cost breakdown table
- ArgoCD login URL and confirmation it is accessible

---

#### Submission
1. Add `day-81-eks-intro.md` to `2026/day-81/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Provisioned a production-grade EKS cluster using the AI-BankApp's Terraform configs today -- VPC with 9 subnets across 3 AZs, managed node group, 6 EKS add-ons including EBS CSI driver and metrics server, plus ArgoCD pre-installed via Helm. Deployed the AI-BankApp with MySQL and Ollama AI chatbot on EKS. Infrastructure as Code from day one."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the 4 golden signals for your app. | You can demonstrate, without notes: *explain metrics, logs and traces and when each helps* — with evidence committed to `day-81/`. |
| 2 | Export dashboard JSON to repo. | You can demonstrate, without notes: *deploy Prometheus and Grafana (kube-prometheus-stack)* — with evidence committed to `day-81/`. |
| 3 | Explain cardinality problems. | You can demonstrate, without notes: *write PromQL and build a dashboard* — with evidence committed to `day-81/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Target DOWN | Wrong port/label/ServiceMonitor selector/NetworkPolicy. |
| High cardinality | Avoid user IDs/URLs as labels. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Secure Grafana/Prometheus with auth; don't expose metrics publicly; avoid sensitive data in labels.
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

1. Counter vs gauge vs histogram?
2. What are golden signals?
3. Pull vs push metrics?
4. What is cardinality?
5. **Scenario:** Latency complaints: show how to find which service/endpoint and since when, within 5 minutes. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I query PromQL? | ☐ | ☐ | ☐ | ☐ |
| Can I build a dashboard? | ☐ | ☐ | ☐ | ☐ |
| Can I instrument an app? | ☐ | ☐ | ☐ | ☐ |
| Explain metrics, logs and traces and when each helps | ☐ | ☐ | ☐ | ☐ |
| Deploy Prometheus and Grafana (kube-prometheus-stack) | ☐ | ☐ | ☐ | ☐ |
| Write PromQL and build a dashboard | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-81/` in your own repository:

```text
day-81/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-81
git add day-81/
git commit -m "day-81: observability i"
git push -u origin day-81
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

## 18. Challenge Notes — Day 81: X-Ray for Tracing Microservices

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 81** of the DevOps 90-Day Challenge!
Debugging microservices is hard. **AWS X-Ray** helps you visualize requests as they travel through your application specific to the AWS ecosystem.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand **Distributed Tracing** (Trace ID, Segments).
* Instrument a Python/Node.js app with the **X-Ray SDK**.
* Analyze the **Service Map** to find bottlenecks.
* Integrate X-Ray with **Lambda** and **API Gateway**.

---

#### Tools Used

* **AWS X-Ray**
* **AWS Lambda**
* **Amazon API Gateway**
* **DynamoDB**

---

#### Key Concepts

##### 1. Tracing vs Logging
Logs show *events*. Traces show *request flow*.
Trace: "User hit API -> API hit Lambda -> Lambda hit DynamoDB (Slow) -> returned".
X-Ray shows you the latency of *each* hop.

##### 2. The Service Map
X-Ray automatically draws a map of your architecture. You can see:
*   Which services are calling each other.
*   High latency connections (colored Yellow/Red).
*   Error rates.

##### 3. Sampling
You don't need to trace 100% of requests (expensive!). You trace 5% or 1 request/sec. This gives you statistical confidence without the cost.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Annotations** | Adding custom metadata (e.g., `user_id: 123`) to the trace so you can search for it later. |
| **Integrations** | Chechkbox "Enable X-Ray" in Lambda and API Gateway settings (Zero code!). |
| **Cold Starts** | Viewing the trace to confirm if latency was due to Lambda Initialization (Cold Start) or code execution. |

---

#### Bonus (Extra Learning)

*   Compare X-Ray with OpenTelemetry/Jaeger (Day 60).
*   Use X-Ray Analytics to compare "Latency of Premium Users vs Free Users".

---

#### Congratulations!

You have visibility. You no longer need to guess why the API is slow. You *know*.

---

#### Try These Next

*   Install the X-Ray Daemon on EC2 (Docker container) to trace EC2 apps.
*   Set up encryption for X-Ray data using KMS.

## 19. Cohort Practice — Day 81: Introduction to Amazon EKS with Terraform

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You have been running Kubernetes locally with Kind. That works for learning, but the AI-BankApp needs a production environment -- managed control plane, auto-scaling nodes, persistent EBS storage, and IAM integration.

Amazon EKS (Elastic Kubernetes Service) is AWS's managed Kubernetes offering. The AI-BankApp project (https://github.com/TrainWithShubham/AI-BankApp-DevOps, branch `feat/gitops`) already has a complete Terraform configuration in its `terraform/` directory that provisions a production-grade EKS cluster. Today you understand EKS architecture, study the Terraform configs, provision the cluster, and connect to it.

---

#### Expected Output


- Understanding of EKS architecture and its components
- The AI-BankApp's Terraform configs reviewed and understood
- A running EKS cluster provisioned via Terraform
- kubectl connected to the EKS cluster
- A markdown file: `day-81-eks-intro.md`
  
---

#### Challenge Tasks

##### Task 1: Understand EKS Architecture
Research and write notes on:

1. **What does "managed Kubernetes" mean?**
   - AWS manages the **control plane** (API server, etcd, scheduler, controller manager)
   - You manage the **data plane** (worker nodes where your pods run)
   - AWS handles control plane upgrades, patching, and high availability across multiple AZs

2. **EKS components:**
   - **EKS Control Plane** -- managed by AWS, runs in AWS-owned VPC, accessible via API endpoint
   - **Node Groups** -- EC2 instances that run your pods
     - **Managed Node Groups** -- AWS handles provisioning, scaling, and updates
     - **Self-Managed Nodes** -- you manage the EC2 instances yourself
     - **Fargate Profiles** -- serverless, no nodes to manage at all
   - **VPC and Networking** -- EKS runs inside your VPC with subnets across AZs
   - **IAM Integration** -- EKS uses IAM roles for cluster access and pod-level permissions (IRSA)

3. **EKS add-ons the AI-BankApp uses** (from `terraform/eks.tf`):
   - `coredns` -- DNS resolution inside the cluster
   - `kube-proxy` -- network routing for services
   - `vpc-cni` -- AWS VPC CNI plugin, assigns VPC IPs to pods
   - `eks-pod-identity-agent` -- enables pod-level IAM roles
   - `aws-ebs-csi-driver` -- allows pods to use EBS volumes (needed for MySQL and Ollama storage)
   - `metrics-server` -- enables `kubectl top` and HPA

---

##### Task 2: Study the AI-BankApp Terraform Configuration
Clone the repo and examine the `terraform/` directory:

```bash
git clone -b feat/gitops https://github.com/TrainWithShubham/AI-BankApp-DevOps.git
cd AI-BankApp-DevOps/terraform
ls
```

```
argocd.tf           # ArgoCD Helm release
eks.tf              # EKS cluster + node group + IRSA
outputs.tf          # Cluster info and helper commands
provider.tf         # AWS + Helm providers, locals
terraform.tfvars    # Default variable values
variables.tf        # Input variables
vpc.tf              # VPC with public/private/intra subnets
```

**Study each file and understand what it provisions:**

**`variables.tf` and `terraform.tfvars`:**
```hcl
# The defaults:
aws_region         = "us-west-2"
cluster_name       = "bankapp-eks"
cluster_version    = "1.35"
node_instance_type = "t3.medium"
node_desired_count = 3
node_max_count     = 5
```

**`vpc.tf`** -- Networking foundation:
- Uses the `terraform-aws-modules/vpc/aws` module
- 3 Availability Zones with:
  - **Public subnets** (10.0.1-3.0/24) -- for load balancers, tagged with `kubernetes.io/role/elb`
  - **Private subnets** (10.0.4-6.0/24) -- for worker nodes, tagged with `kubernetes.io/role/internal-elb`
  - **Intra subnets** (10.0.7-9.0/24) -- for EKS control plane ENIs
- NAT Gateway enabled for outbound internet from private subnets

**`eks.tf`** -- The cluster itself:
- Uses the `terraform-aws-modules/eks/aws` module (version ~> 21.0)
- AL2023 AMI for nodes (Amazon Linux 2023)
- 3x `t3.medium` instances (min 3, max 5)
- All 6 EKS add-ons installed as cluster add-ons
- IRSA configured for the EBS CSI driver
- Public + private API endpoint access

**`argocd.tf`** -- ArgoCD via Helm:
- Installs ArgoCD using the `argo-cd` Helm chart
- Exposed as a LoadBalancer service
- Depends on the EKS module (created after the cluster is ready)

**`outputs.tf`** -- Helper commands:
- Outputs the `aws eks update-kubeconfig` command
- Outputs the ArgoCD initial password retrieval command

**Document:** Draw the architecture: VPC -> Subnets -> EKS Control Plane -> Node Group -> Pods

---

##### Task 3: Provision the EKS Cluster
Make sure you have the required tools:
```bash
terraform --version    # >= 1.0
aws --version          # AWS CLI v2
kubectl version --client
helm version
```

Configure AWS credentials:
```bash
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-west-2), Output (json)

# Verify
aws sts get-caller-identity
```

Initialize and apply:
```bash
cd terraform

terraform init
terraform plan
```

Review the plan carefully. It will create:
- 1 VPC with 9 subnets, NAT gateway, internet gateway
- 1 EKS cluster with control plane
- 1 managed node group (3x t3.medium)
- 6 EKS add-ons
- IAM roles and policies for the cluster, nodes, and EBS CSI driver
- ArgoCD Helm release

```bash
terraform apply
```

This takes 15-20 minutes. While waiting, review the Terraform output for CloudFormation-like progress.

After completion, note the outputs:
```bash
terraform output
```

---

##### Task 4: Connect to Your Cluster
Update kubeconfig using the Terraform output:
```bash
aws eks update-kubeconfig --name bankapp-eks --region us-west-2
```

Verify the connection:
```bash
# Check context
kubectl config current-context

# Cluster info
kubectl cluster-info

# List nodes
kubectl get nodes -o wide
```

You should see 3 nodes with status `Ready`, instance type `t3.medium`, spread across 3 AZs.

Explore the cluster:
```bash
# System pods
kubectl get pods -n kube-system

# All the add-ons are running
kubectl get daemonsets -n kube-system

# EBS CSI driver
kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver

# Metrics server (enables kubectl top and HPA)
kubectl top nodes
```

Check ArgoCD is running:
```bash
kubectl get pods -n argocd
kubectl get svc -n argocd
```

Get the ArgoCD admin password:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

Get the ArgoCD LoadBalancer URL:
```bash
kubectl get svc -n argocd argocd-server -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

Open the URL in your browser and log in with `admin` and the password from above. You will use ArgoCD on Days 84-86.

---

##### Task 5: Deploy the AI-BankApp Manually (Before ArgoCD)
Before setting up GitOps, deploy the app manually to validate the cluster works.

Apply the raw manifests from the `k8s/` directory:
```bash
cd ../  # Back to the repo root

kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/pv.yml
kubectl apply -f k8s/pvc.yml
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/mysql-deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ollama-deployment.yml
kubectl apply -f k8s/bankapp-deployment.yml
kubectl apply -f k8s/hpa.yml
```

Watch the pods come up:
```bash
kubectl get pods -n bankapp -w
```

The startup order is:
1. MySQL starts and becomes healthy (15-30 seconds)
2. Ollama starts and pulls the TinyLlama model (2-5 minutes)
3. BankApp init containers wait for both, then the app starts (30-60 seconds after dependencies)

Check PVCs are bound to EBS volumes:
```bash
kubectl get pvc -n bankapp
kubectl get pv
```

You should see 5Gi and 10Gi EBS volumes in the correct AZs.

Once all pods are running, access the app:
```bash
kubectl port-forward svc/bankapp-service -n bankapp 8080:8080
```

Open `http://localhost:8080` -- you should see the AI-BankApp login page. Register an account, log in, and try the AI chatbot.

**Verify the HPA:**
```bash
kubectl get hpa -n bankapp
```

---

##### Task 6: Understand EKS Costs and Clean Up Strategy
EKS is not free. The AI-BankApp cluster costs:

| Component | Cost (approximate) |
|-----------|-------------------|
| EKS Control Plane | $0.10/hr (~$73/month) |
| t3.medium nodes (3x) | ~$0.042/hr each (~$91/month total) |
| NAT Gateway | ~$0.045/hr + data transfer (~$33/month) |
| EBS volumes (15Gi total) | ~$1.50/month |
| LoadBalancer (ArgoCD) | ~$0.025/hr (~$18/month) |
| **Total for this lab** | **~$220/month (~$7/day)** |

**Important:** Do NOT leave the cluster running when you are not using it.

Delete the BankApp workload (keep the cluster for Days 82-83):
```bash
kubectl delete -f k8s/hpa.yml
kubectl delete -f k8s/bankapp-deployment.yml
kubectl delete -f k8s/ollama-deployment.yml
kubectl delete -f k8s/mysql-deployment.yml
kubectl delete -f k8s/service.yml
kubectl delete -f k8s/secrets.yml
kubectl delete -f k8s/configmap.yml
kubectl delete -f k8s/pvc.yml
kubectl delete -f k8s/pv.yml
kubectl delete -f k8s/namespace.yml
```

To destroy everything (do this at the end of Day 83 or if taking a break):
```bash
cd terraform
terraform destroy
```

**Document:** What are the cost components of the AI-BankApp EKS setup? Why is the NAT Gateway surprisingly expensive?

---

#### Hints
- `terraform apply` for EKS takes 15-20 minutes -- the control plane provisioning is the longest step
- If Terraform fails midway, run `terraform apply` again -- it is idempotent and will resume from where it stopped
- The VPC CNI plugin gives each pod its own VPC IP -- pods are directly routable within the VPC
- `t3.medium` (2 vCPU, 4 GB RAM) can run approximately 17 pods per node (limited by ENI/IP allocation)
- The AI-BankApp's Ollama pod needs 2-2.5Gi RAM -- make sure your nodes have enough capacity
- If `kubectl` cannot connect after `terraform apply`, run the `aws eks update-kubeconfig` command from the Terraform output
- ArgoCD is installed by Terraform but the Application manifest is not applied yet -- that comes on Day 84
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`) -- `terraform/` directory

---

#### Documentation
Create `day-81-eks-intro.md` with:
- EKS architecture diagram (VPC, subnets, control plane, node group, add-ons)
- Each Terraform file explained in your own words
- Screenshot of `kubectl get nodes` showing 3 EKS nodes across AZs
- Screenshot of `kubectl get pods -n kube-system` showing all add-ons
- Screenshot of the AI-BankApp running on EKS (login page or dashboard)
- Screenshot of `kubectl get pvc -n bankapp` showing EBS-backed volumes
- EKS cost breakdown table
- ArgoCD login URL and confirmation it is accessible

---

#### Submission
1. Add `day-81-eks-intro.md` to `2026/day-81/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Provisioned a production-grade EKS cluster using the AI-BankApp's Terraform configs today -- VPC with 9 subnets across 3 AZs, managed node group, 6 EKS add-ons including EBS CSI driver and metrics server, plus ArgoCD pre-installed via Helm. Deployed the AI-BankApp with MySQL and Ollama AI chatbot on EKS. Infrastructure as Code from day one."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 81: Blue/Green Deployment with Helm

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Blue/Green Deployment with Helm**.

#### 🎯 Learning Goals
- Understand the fundamentals of Blue/Green Deployment with Helm.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day81: Blue/Green Deployment with Helm`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 80](../day-80/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 82 →](../day-82/README.md)
