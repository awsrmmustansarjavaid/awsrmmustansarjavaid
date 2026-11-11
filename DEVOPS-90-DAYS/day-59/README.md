# Day 59 — Terraform: Variables, Outputs, Data Sources & Expressions

[← Day 58](../day-58/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 60 →](../day-60/README.md)

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

- [ ] Parameterise code with variables and validation
- [ ] Use locals, functions, conditionals and dynamic blocks
- [ ] Query existing infrastructure with data sources

## 2. Prerequisites

- Day 58.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Inputs/outputs

Types (string, number, list, map, object), defaults, `validation`, `sensitive`. Outputs expose values to users and other modules.

### 3.2 Expressions

`locals`, `for` expressions, `merge`, `lookup`, `cidrsubnet`, `templatefile`, ternary `cond ? a : b`, `dynamic` blocks.

### 3.3 Data sources

Read AMIs, AZs, existing VPCs, account ID without managing them.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add typed variables with validation (env must be dev/stage/prod).
2. [ ] Use `terraform.tfvars` and `-var-file=prod.tfvars`.
3. [ ] Use `data.aws_ami` and `data.aws_availability_zones`.
4. [ ] Use `cidrsubnet()` to derive subnets.
5. [ ] Add sensitive output and see how it's masked.

## 5. Real-World Scenario

> One codebase must support dev (small, 1 AZ) and prod (HA, 3 AZ) with different sizes - without copy-paste.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
variable "env" { type = string  validation { condition = contains(["dev","stage","prod"], var.env) error_message = "env must be dev, stage, or prod." } }
locals { azs = slice(data.aws_availability_zones.available.names, 0, var.env == "prod" ? 3 : 1) }
resource "aws_subnet" "this" { count = length(local.azs) cidr_block = cidrsubnet(var.vpc_cidr, 8, count.index) availability_zone = local.azs[count.index] vpc_id = aws_vpc.main.id }
terraform plan -var-file=prod.tfvars
terraform output -json
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 59 – Helm — Kubernetes Package Manager — Challenge Brief

#### Task
Over the past eight days you have written Deployments, Services, ConfigMaps, Secrets, PVCs, and more — all as individual YAML files. For a real application you might have dozens of these. Helm is the package manager for Kubernetes, like apt for Ubuntu. Today you install charts, customize them, and create your own.

---

#### Expected Output
- Helm installed and a chart deployed from Bitnami
- A release customized, upgraded, and rolled back
- A custom chart created and installed
- A markdown file: `day-59-helm.md`

---

#### Challenge Tasks

##### Task 1: Install Helm
1. Install Helm (brew, curl script, or chocolatey depending on your OS)
2. Verify with `helm version` and `helm env`

Three core concepts:
- **Chart** — a package of Kubernetes manifest templates
- **Release** — a specific installation of a chart in your cluster
- **Repository** — a collection of charts (like a package repo)

**Verify:** What version of Helm is installed?

---

##### Task 2: Add a Repository and Search
1. Add the Bitnami repository: `helm repo add bitnami https://charts.bitnami.com/bitnami`
2. Update: `helm repo update`
3. Search: `helm search repo nginx` and `helm search repo bitnami`

**Verify:** How many charts does Bitnami have?

---

##### Task 3: Install a Chart
1. Deploy nginx: `helm install my-nginx bitnami/nginx`
2. Check what was created: `kubectl get all`
3. Inspect the release: `helm list`, `helm status my-nginx`, `helm get manifest my-nginx`

One command replaced writing a Deployment, Service, and ConfigMap by hand.

**Verify:** How many Pods are running? What Service type was created?

---

##### Task 4: Customize with Values
1. View defaults: `helm show values bitnami/nginx`
2. Install a custom release with `--set replicaCount=3 --set service.type=NodePort`
3. Create a `custom-values.yaml` file with replicaCount, service type, and resource limits
4. Install another release using `-f custom-values.yaml`
5. Check overrides: `helm get values <release-name>`

**Verify:** Does the values file release have the correct replicas and service type?

---

##### Task 5: Upgrade and Rollback
1. Upgrade: `helm upgrade my-nginx bitnami/nginx --set replicaCount=5`
2. Check history: `helm history my-nginx`
3. Rollback: `helm rollback my-nginx 1`
4. Check history again — rollback creates a new revision (3), not overwriting revision 2

Same concept as Deployment rollouts from Day 52, but at the full stack level.

**Verify:** How many revisions after the rollback?

---

##### Task 6: Create Your Own Chart
1. Scaffold: `helm create my-app`
2. Explore the directory: `Chart.yaml`, `values.yaml`, `templates/deployment.yaml`
3. Look at the Go template syntax in templates: `{{ .Values.replicaCount }}`, `{{ .Chart.Name }}`
4. Edit `values.yaml` — set replicaCount to 3 and image to nginx:1.25
5. Validate: `helm lint my-app`
6. Preview: `helm template my-release ./my-app`
7. Install: `helm install my-release ./my-app`
8. Upgrade: `helm upgrade my-release ./my-app --set replicaCount=5`

**Verify:** After installing, 3 replicas? After upgrading, 5?

---

##### Task 7: Clean Up
1. Uninstall all releases: `helm uninstall <name>` for each
2. Remove chart directory and values file
3. Use `--keep-history` if you want to retain release history for auditing

**Verify:** Does `helm list` show zero releases?

---

#### Hints
- `helm show values <chart>` — see what you can customize
- `--set key=value` for single overrides, `-f values.yaml` for files
- Nested values use dots: `--set service.type=NodePort`
- `helm get values <release>` shows overrides, `--all` for everything
- `helm template` renders without installing — great for debugging
- `helm lint` validates chart structure before installing
- Templates: `{{ .Values.key }}`, `{{ .Chart.Name }}`, `{{ .Release.Name }}`

---

#### Documentation
Create `day-59-helm.md` with:
- What Helm is and the three core concepts
- How to install, customize, upgrade, and rollback
- The structure of a Helm chart and how Go templating works
- Your `custom-values.yaml` with explanations

---

#### Submission
1. Add `day-59-helm.md` and `custom-values.yaml` to `2026/day-59/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Helm today — deployed charts, customized with values, performed rollbacks, and created my own chart from scratch. One command replaces dozens of YAML files."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 59 – Helm: Kubernetes Package Manager — Notes & Solution

#### Overview

On Day 59 of #90DaysOfDevOps, I learned about **Helm**, a package manager for Kubernetes. Helm simplifies application deployment and management by packaging Kubernetes resources into reusable charts.

Instead of maintaining multiple Kubernetes YAML files manually, Helm allows us to install, configure, upgrade, roll back, and uninstall applications using simple commands.

#### Objectives

- Understand Helm and its core components.
- Install and configure Helm.
- Learn about Helm repositories and charts.
- Deploy an NGINX application using a Helm chart.
- Customize deployments using a values file.
- Upgrade and roll back Helm releases.
- Create and test a custom Helm chart.
- Practice troubleshooting Helm and Kubernetes environment issues.

#### 1. What Is Helm?

Helm is a package manager for Kubernetes. It helps deploy and manage applications using reusable packages called **charts**.

##### Why use Helm?

- Simplifies Kubernetes application deployment.
- Reduces repetitive YAML configuration.
- Supports reusable and customizable templates.
- Makes upgrades and rollbacks easier.
- Helps manage application releases consistently.
- Supports configuration through values files.

#### 2. Important Helm Concepts

| Concept | Description |
|---|---|
| Chart | A package containing Kubernetes templates and configuration. |
| Release | An installed instance of a Helm chart. |
| Repository | A location that stores and distributes Helm charts. |
| Values | Configuration settings used to customize a chart. |
| Templates | Files that generate Kubernetes resource manifests. |
| Revision | A version of a Helm release recorded during installation or upgrades. |

#### 3. Verify the Kubernetes Cluster

Before installing an application with Helm, verify that the Kubernetes cluster is available.

```bash
kubectl get nodes
kubectl cluster-info
```

The node should show `Ready` before proceeding.

My practice environment uses a Kind cluster named `devops-cluster`.

To check the cluster's status:

```bash
kind get clusters
kubectl get pods -A
```

If the cluster is not running, troubleshoot the cluster before continuing with Helm deployment.

#### 4. Verify Helm Installation

Check whether Helm is installed:

```bash
helm version
helm help
```

To view the available commands:

```bash
helm list --help
helm install --help
helm upgrade --help
```

Helm was installed successfully in my EC2 environment. The installed version reported was Helm v3.22.0.

#### 5. Understand Helm Repositories

Helm repositories provide access to charts maintained and published by chart providers.

To list configured repositories:

```bash
helm repo list
```

If no repositories are configured, Helm reports that no repositories are found.

Add the Bitnami chart repository:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Update repository metadata:

```bash
helm repo update
```

Search for NGINX charts:

```bash
helm search repo nginx
```

Inspect the chart's default configuration:

```bash
helm show values bitnami/nginx
```

**Important:** Repository access depends on network connectivity and the chart provider's current repository availability. If the repository cannot be added, resolve the connection issue before treating chart installation as successful.

#### 6. Deploy NGINX Using Helm

After the repository is available, install an NGINX release:

```bash
helm install my-nginx bitnami/nginx
```

Here:

- `helm install` installs a chart.
- `my-nginx` is the release name.
- `bitnami/nginx` identifies the chart.

Check the release:

```bash
helm list
helm status my-nginx
```

Check Kubernetes resources:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

Inspect the generated Kubernetes manifests:

```bash
helm get manifest my-nginx
```

The release should be considered successfully deployed only after Helm and Kubernetes confirm the resources are healthy.

#### 7. Customize a Helm Deployment

Helm allows us to customize a chart using command-line options or a YAML values file.

For example, request three replicas and a NodePort service:

```bash
helm install nginx-scaled bitnami/nginx \
  --set replicaCount=3 \
  --set service.type=NodePort
```

Check the deployment:

```bash
helm status nginx-scaled
kubectl get deployments
kubectl get pods
kubectl get services
```

The `--set` option overrides the chart's default configuration.

**Note:** Chart configuration keys can change between chart versions. Verify the supported values using `helm show values` before applying custom settings.

#### 8. Create a Custom Values File

Create the Day 59 directory and a configuration file:

```bash
mkdir -p 2026/day-59
nano 2026/day-59/custom-values.yaml
```

Add the following configuration:

```yaml
replicaCount: 2

service:
  type: NodePort
  ports:
    http: 80
    https: 443

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 256Mi
```

##### Explanation

- `replicaCount`: Requests two application replicas.
- `service.type`: Configures the service as NodePort.
- `service.ports`: Specifies the intended HTTP and HTTPS ports, if supported by the selected chart.
- `resources.requests`: Defines the minimum CPU and memory resources requested by each container.
- `resources.limits`: Defines the maximum CPU and memory resources allowed for each container.

**Important:** This is a chart-specific configuration example. The `service.ports` structure may not match the current Bitnami NGINX chart schema. Always compare the file with `helm show values bitnami/nginx` and adjust it before installation.

Install a release using the values file:

```bash
helm install nginx-values bitnami/nginx \
  -f 2026/day-59/custom-values.yaml
```

Inspect the resulting configuration:

```bash
helm get values nginx-values
helm status nginx-values
kubectl get deployments
kubectl get services
```

#### 9. Upgrade a Helm Release

Helm supports modifying a release without manually editing each generated Kubernetes resource.

Increase the replica count:

```bash
helm upgrade my-nginx bitnami/nginx \
  --set replicaCount=5
```

Check the updated release:

```bash
helm status my-nginx
helm history my-nginx
kubectl get deployments
kubectl get pods
```

The upgrade should create a new release revision if it completes successfully.

#### 10. Roll Back a Helm Release

Helm maintains release history that can be used to restore an earlier revision.

View the release history:

```bash
helm history my-nginx
```

Roll back to revision 1:

```bash
helm rollback my-nginx 1
```

Verify the rollback:

```bash
helm history my-nginx
helm status my-nginx
kubectl get deployments
```

A rollback is successful only when Helm reports success and the resulting Kubernetes resources reach their expected state.

#### 11. Create a Custom Helm Chart

Helm can generate a starter chart structure.

Create a chart:

```bash
helm create my-app
```

The generated directory contains files such as:

```text
my-app/
├── Chart.yaml
├── values.yaml
├── charts/
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── serviceaccount.yaml
│   ├── NOTES.txt
│   └── _helpers.tpl
└── .helmignore
```

##### Understand the important files

- `Chart.yaml`: Chart name, version, and description.
- `values.yaml`: Default configuration values.
- `templates/deployment.yaml`: Template for the Deployment resource.
- `templates/service.yaml`: Template for the Service resource.
- `templates/_helpers.tpl`: Reusable template helpers.
- `templates/NOTES.txt`: Instructions displayed after installation.

##### Customize the chart

Open the values file:

```bash
nano my-app/values.yaml
```

Update the relevant settings to use an NGINX image, three replicas, and a ClusterIP service. For example, the core settings should resemble:

```yaml
replicaCount: 3

image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: "1.25"

service:
  type: ClusterIP
  port: 80
```

Keep the other fields generated by `helm create` unless you have a reason to change them.

##### Validate the chart

Check the chart for common errors:

```bash
helm lint my-app
```

Render the Kubernetes YAML without installing it:

```bash
helm template my-release ./my-app
```

If validation succeeds, install the chart:

```bash
helm install my-release ./my-app
```

Check the installed resources:

```bash
helm status my-release
kubectl get deployments
kubectl get pods
kubectl get services
```

##### Upgrade the custom chart

Increase the replicas:

```bash
helm upgrade my-release ./my-app \
  --set replicaCount=5
```

Verify the deployment:

```bash
helm history my-release
kubectl get deployments
kubectl get pods
```

#### 12. Troubleshooting

##### Issue 1: Bitnami repository installation times out

Command:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Observed error:

```text
Error: context deadline exceeded
```

Investigation showed that `curl` could download the repository index, but Helm's repository command continued to time out. The repository URL redirected to a Broadcom-hosted location.

Troubleshooting commands:

```bash
curl -IL https://charts.bitnami.com/bitnami/index.yaml
curl -fL https://charts.bitnami.com/bitnami/index.yaml \
  -o /tmp/bitnami-index.yaml

helm repo list
helm repo add bitnami https://charts.bitnami.com/bitnami \
  --timeout 5m --debug
```

The direct repository URL was also tested, but the Helm command still timed out.

This remained an environment issue. A successful `curl` download does not prove that `helm repo add` has succeeded.

##### Issue 2: EC2 disk space exhausted

The EC2 root filesystem reached 100% usage:

```text
/dev/nvme0n1p1  8.0G  8.0G  16K  100% /
```

Creating a directory failed with:

```text
mkdir: cannot create directory 'helm': No space left on device
```

The inode check showed that inode capacity was available, so the problem was disk space rather than inode exhaustion.

Inspection identified substantial disk usage under `/var/lib/docker` and `/var/cache/dnf`.

To inspect filesystem capacity:

```bash
df -h
df -i
```

To inspect Docker usage:

```bash
docker system df
docker ps -a --size
docker image ls
docker volume ls
```

To inspect package cache usage:

```bash
sudo du -sh /var/cache/dnf
```

The DNF cache was cleaned manually after the normal cleanup command failed due to the full filesystem.

After cleanup, the root filesystem had approximately 330 MB available:

```text
/dev/nvme0n1p1  8.0G  7.7G  330M  96% /
```

The Kind control-plane container was still running, and the active Docker image and volume were retained.

**Lesson learned:** Small EC2 root volumes can quickly fill up during Kubernetes labs. Inspect disk usage regularly and consider increasing the EBS root volume for continued container and Kubernetes practice.

Do not delete active Docker volumes, the Kind container, or `/var/lib/docker` manually.

#### 13. Cleanup After Testing

After verifying that you no longer need the test releases, uninstall only the releases you created:

```bash
helm uninstall my-nginx
helm uninstall nginx-scaled
helm uninstall nginx-values
helm uninstall my-release
```

Run only the commands for releases that actually exist.

Check remaining releases:

```bash
helm list -A
```

Verify the cluster is still healthy:

```bash
kubectl get nodes
kubectl get pods -A
```

Do not delete unrelated workloads or the Kind cluster as part of this assignment's cleanup.

#### 14. Key Learnings

- Helm simplifies Kubernetes application management.
- Charts package reusable Kubernetes templates.
- Releases represent installed instances of charts.
- Values files make application configuration easier to maintain.
- `helm upgrade` updates an existing release.
- `helm rollback` restores a previous release revision.
- `helm lint` and `helm template` help validate charts before installation.
- Disk capacity and repository connectivity can affect deployment workflows.
- Troubleshooting should begin with inspecting the environment rather than deleting active resources.

#### Conclusion

Day 59 introduced Helm as a practical tool for packaging, deploying, and managing applications on Kubernetes. I explored Helm installation, repository configuration, release management, custom values, upgrades, rollbacks, and custom chart creation.

I also investigated repository timeouts and an exhausted EC2 root filesystem, learning the importance of environment checks and safe resource management.

**Status:** Helm installation was verified. Bitnami repository access and subsequent chart deployment still require successful verification in the EC2 environment before they can be marked complete.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write variable documentation table. | You can demonstrate, without notes: *parameterise code with variables and validation* — with evidence committed to `day-59/`. |
| 2 | Add `precondition` check. | You can demonstrate, without notes: *use locals, functions, conditionals and dynamic blocks* — with evidence committed to `day-59/`. |
| 3 | Use `terraform console` to experiment with functions. | You can demonstrate, without notes: *query existing infrastructure with data sources* — with evidence committed to `day-59/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Variable has no value | Add default, tfvars, env `TF_VAR_name`, or -var. |
| Type constraint error | Match expected object structure. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Mark secrets `sensitive` (still stored in state!) and prefer secret managers.
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

1. Variables vs locals?
2. What are data sources?
3. How do you validate inputs?
4. Why sensitive values are still risky?
5. **Scenario:** One codebase must support dev (small, 1 AZ) and prod (HA, 3 AZ) with different sizes - without copy-paste. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I parameterise env differences? | ☐ | ☐ | ☐ | ☐ |
| Can I use data sources? | ☐ | ☐ | ☐ | ☐ |
| Can I validate input? | ☐ | ☐ | ☐ | ☐ |
| Parameterise code with variables and validation | ☐ | ☐ | ☐ | ☐ |
| Use locals, functions, conditionals and dynamic blocks | ☐ | ☐ | ☐ | ☐ |
| Query existing infrastructure with data sources | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-59/` in your own repository:

```text
day-59/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-59
git add day-59/
git commit -m "day-59: terraform"
git push -u origin day-59
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

[← Day 58](../day-58/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 60 →](../day-60/README.md)
