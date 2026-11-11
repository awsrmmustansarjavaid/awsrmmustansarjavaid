# Day 66 — Ansible: Variables, Facts, Conditionals, Loops & Jinja2 Templates

[← Day 65](../day-65/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 67 →](../day-67/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use variable precedence and facts effectively
- [ ] Control flow with `when`, `loop`, `with_items`
- [ ] Render configs with Jinja2 templates

## 2. Prerequisites

- Day 65.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Variables

group_vars/host_vars, play vars, `-e` extra vars (highest precedence), `vars_files`, `set_fact`, `register`. Know precedence to avoid surprises.

### 3.2 Conditionals and loops

`when: ansible_os_family == 'Debian'`, `loop: "{{ list }}"`, `loop_control`, `until/retries/delay`.

### 3.3 Templates

Jinja2: `{{ var }}`, `{% for %}`, `{% if %}`, filters (`default`, `join`, `to_nice_yaml`). Produce nginx/app configs from variables.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `group_vars/web.yml` and `host_vars/web1.yml`.
2. [ ] Use `when` to support both Ubuntu and RHEL package names.
3. [ ] Loop over a list of users and packages.
4. [ ] Template `app.conf.j2` using facts (`ansible_memtotal_mb`).
5. [ ] Use `until` to wait for a service to be ready.

## 5. Real-World Scenario

> Same playbook must configure prod (tuned) and dev (small) with different worker counts and memory settings automatically.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
- name: Install packages
  ansible.builtin.package: { name: "{{ item }}", state: present }
  loop: "{{ common_packages }}"
- name: Wait for app
  ansible.builtin.uri: { url: "http://localhost:8000/health" }
  register: r
  until: r.status == 200
  retries: 10
  delay: 3
# app.conf.j2
workers = {{ [ansible_processor_vcpus * 2, 8] | min }}
{% for u in upstreams %}server {{ u }};{% endfor %}
ansible-playbook site.yml -e env=prod
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 66 -- Provision an EKS Cluster with Terraform Modules — Challenge Brief

#### Task
You built Kubernetes clusters manually in the Kubernetes week. Today you provision one the DevOps way -- fully automated, repeatable, and destroyable with a single command. You will use Terraform registry modules to create an AWS EKS cluster with a managed node group, connect kubectl, and deploy a workload.

This is what infrastructure teams do every day in production.

---

#### Expected Output
- A running EKS cluster on AWS provisioned entirely through Terraform
- kubectl connected to the cluster with nodes visible
- An Nginx deployment running on the cluster
- A markdown file: `day-66-eks-terraform.md`
- Everything destroyed cleanly after the exercise

---

#### Challenge Tasks

##### Task 1: Project Setup
Create a new project directory with proper file structure:

```
terraform-eks/
  providers.tf        # Provider and backend config
  vpc.tf              # VPC module call
  eks.tf              # EKS module call
  variables.tf        # All input variables
  outputs.tf          # Cluster outputs
  terraform.tfvars    # Variable values
```

In `providers.tf`:
1. Pin the AWS provider to `~> 5.0`
2. Pin the Kubernetes provider (you will need it later)
3. Set your region

In `variables.tf`, define:
- `region` (string)
- `cluster_name` (string, default: `"terraweek-eks"`)
- `cluster_version` (string, default: `"1.31"`)
- `node_instance_type` (string, default: `"t3.medium"`)
- `node_desired_count` (number, default: `2`)
- `vpc_cidr` (string, default: `"10.0.0.0/16"`)

---

##### Task 2: Create the VPC with Registry Module
EKS requires a VPC with both public and private subnets across multiple availability zones.

In `vpc.tf`, use the `terraform-aws-modules/vpc/aws` module:
1. CIDR: `var.vpc_cidr`
2. At least 2 availability zones
3. 2 public subnets and 2 private subnets
4. Enable NAT gateway (single NAT to save cost): `enable_nat_gateway = true`, `single_nat_gateway = true`
5. Enable DNS hostnames: `enable_dns_hostnames = true`
6. Add the required EKS tags on subnets:
```hcl
public_subnet_tags = {
  "kubernetes.io/role/elb" = 1
}

private_subnet_tags = {
  "kubernetes.io/role/internal-elb" = 1
}
```

Run `terraform init` and `terraform plan` to verify the VPC config before moving on.

**Document:** Why does EKS need both public and private subnets? What do the subnet tags do?

---

##### Task 3: Create the EKS Cluster with Registry Module
In `eks.tf`, use the `terraform-aws-modules/eks/aws` module:

```hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    terraweek_nodes = {
      ami_type       = "AL2_x86_64"
      instance_types = [var.node_instance_type]

      min_size     = 1
      max_size     = 3
      desired_size = var.node_desired_count
    }
  }

  tags = {
    Environment = "dev"
    Project     = "TerraWeek"
    ManagedBy   = "Terraform"
  }
}
```

Run:
```bash
terraform init      # Download EKS module and its dependencies
terraform plan      # Review -- this will create 30+ resources
```

Review the plan carefully before applying. You should see: EKS cluster, IAM roles, node group, security groups, and more.

---

##### Task 4: Apply and Connect kubectl
1. Apply the config:
```bash
terraform apply
```
This will take 10-15 minutes. EKS cluster creation is slow -- be patient.

2. Add outputs in `outputs.tf`:
```hcl
output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_region" {
  value = var.region
}
```

3. Update your kubeconfig:
```bash
aws eks update-kubeconfig --name terraweek-eks --region <your-region>
```

4. Verify:
```bash
kubectl get nodes
kubectl get pods -A
kubectl cluster-info
```

**Verify:** Do you see 2 nodes in `Ready` state? Can you see the kube-system pods running?

---

##### Task 5: Deploy a Workload on the Cluster
Your Terraform-provisioned cluster is live. Deploy something on it.

1. Create a file `k8s/nginx-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-terraweek
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
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
```

2. Apply:
```bash
kubectl apply -f k8s/nginx-deployment.yaml
```

3. Wait for the LoadBalancer to get an external IP:
```bash
kubectl get svc nginx-service -w
```

4. Access the Nginx page via the LoadBalancer URL

5. Verify the full picture:
```bash
kubectl get nodes
kubectl get deployments
kubectl get pods
kubectl get svc
```

**Verify:** Can you access the Nginx welcome page through the LoadBalancer URL?

---

##### Task 6: Destroy Everything
This is the most important step. EKS clusters cost money. Clean up completely.

1. First, remove the Kubernetes resources (so the AWS LoadBalancer gets deleted):
```bash
kubectl delete -f k8s/nginx-deployment.yaml
```

2. Wait for the LoadBalancer to be fully removed (check EC2 > Load Balancers in AWS console)

3. Destroy all Terraform resources:
```bash
terraform destroy
```
This will take 10-15 minutes.

4. Verify in the AWS console:
   - EKS clusters: empty
   - EC2 instances: no node group instances
   - VPC: the terraweek VPC should be gone
   - NAT Gateways: deleted
   - Elastic IPs: released

**Verify:** Is your AWS account completely clean? No leftover resources?

---

#### Hints
- EKS creation takes 10-15 minutes, destruction takes about the same -- plan your time
- Always delete Kubernetes LoadBalancer services before `terraform destroy`, otherwise the ELB will block VPC deletion
- If `terraform destroy` gets stuck, check for leftover ENIs or security groups in the VPC
- `t3.medium` is the minimum recommended instance type for EKS nodes
- The EKS module creates IAM roles automatically -- you don't need to create them manually
- If you see `Unauthorized` with kubectl, re-run the `aws eks update-kubeconfig` command
- Use `kubectl get events --sort-by=.metadata.creationTimestamp` to debug pod issues
- Cost warning: NAT Gateway charges ~$0.045/hour. Destroy when done.

---

#### Documentation
Create `day-66-eks-terraform.md` with:
- Your complete file structure and key config files
- Screenshot of `terraform apply` completing
- Screenshot of `kubectl get nodes` showing the managed node group
- Screenshot of Nginx running on the cluster
- How many resources Terraform created in total (check the apply output)
- The destroy process and verification
- Reflection: compare this to manually setting up a cluster with kind/minikube (Day 50)

---

#### Submission
1. Add `day-66-eks-terraform.md` to `2026/day-66/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Provisioned a full AWS EKS cluster with Terraform modules today -- VPC, subnets, NAT gateway, IAM roles, node groups, the works. 30+ resources created with one command, deployed Nginx on it, and destroyed everything cleanly. This is real-world infrastructure as code."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 66 -- Provision an EKS Cluster with Terraform Modules — Notes & Solution

#### Task
You built Kubernetes clusters manually in the Kubernetes week. Today you provision one the DevOps way -- fully automated, repeatable, and destroyable with a single command. You will use Terraform registry modules to create an AWS EKS cluster with a managed node group, connect kubectl, and deploy a workload.

This is what infrastructure teams do every day in production.

---

#### Challenge Tasks

##### Task 1: Project Setup
Create a new project directory with proper file structure:

```
terraform-eks/
  providers.tf        # Provider and backend config
  vpc.tf              # VPC module call
  eks.tf              # EKS module call
  variables.tf        # All input variables
  outputs.tf          # Cluster outputs
  terraform.tfvars    # Variable values
```

In `providers.tf`:
1. Pin the AWS provider to `~> 5.0`
2. Pin the Kubernetes provider (you will need it later)
3. Set your region

In `variables.tf`, define:
- `region` (string)
- `cluster_name` (string, default: `"terraweek-eks"`)
- `cluster_version` (string, default: `"1.31"`)
- `node_instance_type` (string, default: `"t3.medium"`)
- `node_desired_count` (number, default: `2`)
- `vpc_cidr` (string, default: `"10.0.0.0/16"`)

---

##### Task 2: Create the VPC with Registry Module
EKS requires a VPC with both public and private subnets across multiple availability zones.

In `vpc.tf`, use the `terraform-aws-modules/vpc/aws` module:
1. CIDR: `var.vpc_cidr`
2. At least 2 availability zones
3. 2 public subnets and 2 private subnets
4. Enable NAT gateway (single NAT to save cost): `enable_nat_gateway = true`, `single_nat_gateway = true`
5. Enable DNS hostnames: `enable_dns_hostnames = true`
6. Add the required EKS tags on subnets:
```hcl
public_subnet_tags = {
  "kubernetes.io/role/elb" = 1
}

private_subnet_tags = {
  "kubernetes.io/role/internal-elb" = 1
}
```

Run `terraform init` and `terraform plan` to verify the VPC config before moving on.

<img width="1841" height="321" alt="Screenshot 2026-10-24 143835" src="https://github.com/user-attachments/assets/52150455-c58e-496a-bea6-e102f9977d7e" />


**Document:** Why does EKS need both public and private subnets? What do the subnet tags do?

- Why both subnets?

  - **Private subnets**: run your EKS nodes/pods securely (no direct internet access)
  - **Public subnets**: host internet-facing load balancers

- What do the tags do?
  - "kubernetes.io/role/elb" tells AWS to use these **public subnets** for external load balancers
  - "kubernetes.io/role/internal-elb" tells AWS to use these **private subnets** for internal load balancers

- **Why Both Subnet Types Are Needed** ?

 - **Private Subnets**:
     - Host worker nodes (EC2 instances) and backend application pods.
     - Prevent direct inbound attacks from the public internet.
     - Use a NAT Gateway to safely pull container images or updates outward.
 
 - **Public Subnets**:
     - Host internet-facing AWS Load Balancers (ALBs or NLBs).
     - Accept incoming requests from end users on the internet.
     - Forward traffic safely down to the worker nodes hiding in the private subnets.

---

##### Task 3: Create the EKS Cluster with Registry Module
In `eks.tf`, use the `terraform-aws-modules/eks/aws` module:

```hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    terraweek_nodes = {
      ami_type       = "AL2_x86_64"
      instance_types = [var.node_instance_type]

      min_size     = 1
      max_size     = 3
      desired_size = var.node_desired_count
    }
  }

  tags = {
    Environment = "dev"
    Project     = "TerraWeek"
    ManagedBy   = "Terraform"
  }
}
```

Run:
```bash
terraform init      # Download EKS module and its dependencies
terraform plan      # Review -- this will create 30+ resources
```


Review the plan carefully before applying. You should see: EKS cluster, IAM roles, node group, security groups, and more.

---

##### Task 4: Apply and Connect kubectl
1. Apply the config:
```bash
terraform apply
```
This will take 10-15 minutes. EKS cluster creation is slow -- be patient.

2. Add outputs in `outputs.tf`:
```hcl
output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_region" {
  value = var.region
}
```


3. Update your kubeconfig:
```bash
aws eks update-kubeconfig --name terraweek-eks --region <your-region>
```

4. Verify:
```bash
kubectl get nodes
kubectl get pods -A
kubectl cluster-info
```
<img width="1917" height="781" alt="Screenshot 2026-10-24 151033" src="https://github.com/user-attachments/assets/1c9e469b-bdf4-4311-8b31-5c285bfaf113" />
<img width="1917" height="457" alt="Screenshot 2026-10-24 151100" src="https://github.com/user-attachments/assets/d2c1ac4c-9d75-4616-9a1c-4b3d2fdaa329" />


**Verify:** Do you see 2 nodes in `Ready` state? Can you see the kube-system pods running?

- Yes, both nodes are in the Ready state, and all kube-system pods are running.
  
---

##### Task 5: Deploy a Workload on the Cluster
Your Terraform-provisioned cluster is live. Deploy something on it.

1. Create a file `k8s/nginx-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-terraweek
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
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
```

2. Apply:
```bash
kubectl apply -f k8s/nginx-deployment.yaml
```

3. Wait for the LoadBalancer to get an external IP:
```bash
kubectl get svc nginx-service -w
```

4. Access the Nginx page via the LoadBalancer URL

5. Verify the full picture:
```bash
kubectl get nodes
kubectl get deployments
kubectl get pods
kubectl get svc
```



**Verify:** Can you access the Nginx welcome page through the LoadBalancer URL?

- Yes

---

##### Task 6: Destroy Everything
This is the most important step. EKS clusters cost money. Clean up completely.

1. First, remove the Kubernetes resources (so the AWS LoadBalancer gets deleted):
```bash
kubectl delete -f k8s/nginx-deployment.yaml
```
<img width="1896" height="990" alt="image" src="https://github.com/user-attachments/assets/b06a08b4-d201-4c94-b986-6b554646effd" />

2. Wait for the LoadBalancer to be fully removed (check EC2 > Load Balancers in AWS console)

3. Destroy all Terraform resources:
```bash
terraform destroy
```
This will take 10-15 minutes.

<img width="1912" height="1002" alt="Screenshot 2026-10-24 153230" src="https://github.com/user-attachments/assets/09b14b9d-9b4f-4db5-a9e6-5d114e6adccf" />


4. Verify in the AWS console:
   - EKS clusters: empty
   - EC2 instances: no node group instances
   - VPC: the terraweek VPC should be gone
   - NAT Gateways: deleted
   - Elastic IPs: released

**Verify:** Is your AWS account completely clean? No leftover resources?

- Yes, my AWS account is completely clean with no leftover resources.
  
---

#### Documentation

- Your complete file structure and key config files

```
terraform-eks/
│
├── .terraform/                # Terraform cache (auto-generated)
├── .gitignore
├── .terraform.lock.hcl       # Provider lock file
│
├── k8s/                      # Kubernetes manifests (post-EKS setup)
│   ├── nginx-deployment.yaml
│
├── eks.tf                    # EKS module call
├── vpc.tf                    # VPC module call
├── providers.tf              # Provider and backend config
├── variables.tf              # All input variables
├── terraform.tfvars          # Variable values
├── outputs.tf                # Cluster outputs
```

- How many resources Terraform created in total (check the apply output)
  - 57 resources

**Local Cluster manual setup vs Terraform + EKS**

| Local cluster             | Production-grade cluster       |
| ------------------------- | ------------------------------ |
| Manual setup              | Automated (IaC with Terraform) |
| Not reusable              | Reusable                       |
| Not scalable              | Scalable                       |
| No IAM integration        | IAM integrated (Amazon EKS)    |
| Not highly available      | Highly available               |
| Runs on local machine     | Runs on AWS cloud              |
| Free                      | Paid                           |
| Basic networking          | Advanced VPC networking        |
| Used for learning/testing | Used for production workloads  |

***Key Takeaways***
 - `Local / Manual Setup`: Ideal for understanding low-level Kubernetes architecture and components without incurring cloud expenses. However, maintaining high availability, cluster upgrades, and state persistence requires heavy operational overhead.

 - `Terraform + EKS`: Industry standard for enterprise environments. Terraform provides consistent environment provisioning (Dev/Staging/Prod), while EKS offloads the risk and overhead of control plane management.

**Challenges Faced and Fixes**

| Challenge                                                                                   | Cause                                                             | Fix                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kubectl get nodes` fails with "the server has asked for the client to provide credentials" | IAM user has AWS permissions but is not mapped to the EKS cluster | Add `access_entries` in Terraform v20 module using `data.aws_caller_identity.current.arn`, run `terraform apply`, then refresh kubeconfig with `aws eks update-kubeconfig` |


| Configuration                          | Description                                         |
| -------------------------------------- | --------------------------------------------------- |
| `data "aws_caller_identity" "current"` | Fetches current IAM user/role details from AWS      |
| `principal_arn`                        | Uses current IAM identity ARN for cluster access    |
| `access_entries`                       | Maps IAM identity to EKS cluster access             |
| `policy_arn`                           | Grants admin access using Amazon EKS cluster policy |
| `access scope`                         | Defines access level (cluster-wide)                 |

---

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document variable precedence in your own words. | You can demonstrate, without notes: *use variable precedence and facts effectively* — with evidence committed to `day-66/`. |
| 2 | Create template with conditionals. | You can demonstrate, without notes: *control flow with `when`, `loop`, `with_items`* — with evidence committed to `day-66/`. |
| 3 | Dump facts to JSON and extract 5 useful ones. | You can demonstrate, without notes: *render configs with Jinja2 templates* — with evidence committed to `day-66/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `undefined variable` | Define it or use `| default()`. |
| Template renders blank | Check var names and `ansible -m debug -a var=x`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Don't store secrets in vars files; use Vault; avoid logging sensitive values.
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

1. Variable precedence?
2. What are facts?
3. How do you loop?
4. What is Jinja2?
5. **Scenario:** Same playbook must configure prod (tuned) and dev (small) with different worker counts and memory settings automatically. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I template a config? | ☐ | ☐ | ☐ | ☐ |
| Can I use conditionals? | ☐ | ☐ | ☐ | ☐ |
| Can I use facts? | ☐ | ☐ | ☐ | ☐ |
| Use variable precedence and facts effectively | ☐ | ☐ | ☐ | ☐ |
| Control flow with `when`, `loop`, `with_items` | ☐ | ☐ | ☐ | ☐ |
| Render configs with Jinja2 templates | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-66/` in your own repository:

```text
day-66/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-66
git add day-66/
git commit -m "day-66: ansible"
git push -u origin day-66
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

[← Day 65](../day-65/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 67 →](../day-67/README.md)
