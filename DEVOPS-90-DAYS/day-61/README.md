# Day 61 — Terraform Modules: Reusable Infrastructure

[← Day 60](../day-60/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 62 →](../day-62/README.md)

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

- [ ] Design modules with clear inputs/outputs
- [ ] Version and consume modules
- [ ] Use public registry modules wisely

## 2. Prerequisites

- Days 57-60.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Module design

A module is a folder of `.tf` files with a clear contract: variables (inputs), outputs, README, examples. Keep them small and composable; avoid provider config inside modules.

### 3.2 Consumption

Local path, Git tag, Terraform Registry with version constraints. Pin versions!

### 3.3 Testing

`terraform test` (native), Terratest, `tflint`, `terraform validate` per example.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Extract VPC code into `modules/vpc` with variables (cidr, azs, tags).
2. [ ] Create `modules/ec2-app` consuming VPC outputs.
3. [ ] Create `envs/dev` and `envs/prod` calling the modules.
4. [ ] Add `examples/basic` and README via `terraform-docs`.
5. [ ] Write a `terraform test` file asserting outputs.

## 5. Real-World Scenario

> Three teams copy-pasted VPC code with subtle differences. Publish a single versioned module and migrate them.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
module "vpc" { source = "../../modules/vpc"  cidr = "10.20.0.0/16"  azs = ["a","b"]  tags = local.tags }
module "app"  { source = "git::https://github.com/USER/tf-modules.git//ec2-app?ref=v1.2.0"  subnet_ids = module.vpc.private_subnet_ids }
terraform-docs markdown table modules/vpc > modules/vpc/README.md
terraform test
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 61 -- Introduction to Terraform and Your First AWS Infrastructure

#### Task
You have been deploying containers, writing CI/CD pipelines, and orchestrating workloads on Kubernetes. But who creates the servers, networks, and clusters underneath? Today you start your Infrastructure as Code journey with Terraform -- the tool that lets you define, provision, and manage cloud infrastructure by writing code.

By the end of today, you will have created real AWS resources using nothing but a `.tf` file and a terminal.

---

#### Expected Output
- Terraform installed and working on your machine
- AWS CLI configured with valid credentials
- An S3 bucket and EC2 instance created and destroyed via Terraform
- A markdown file: `day-61-terraform-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand Infrastructure as Code
Before touching the terminal, research and write short notes on:

1. What is Infrastructure as Code (IaC)? Why does it matter in DevOps?
2. What problems does IaC solve compared to manually creating resources in the AWS console?
3. How is Terraform different from AWS CloudFormation, Ansible, and Pulumi?
4. What does it mean that Terraform is "declarative" and "cloud-agnostic"?

Write this in your own words -- not copy-pasted definitions.

---

##### Task 2: Install Terraform and Configure AWS
1. Install Terraform:
```bash
# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Linux (amd64)
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Windows
choco install terraform
```

2. Verify:
```bash
terraform -version
```

3. Install and configure the AWS CLI:
```bash
aws configure
# Enter your Access Key ID, Secret Access Key, default region (e.g., ap-south-1), output format (json)
```

4. Verify AWS access:
```bash
aws sts get-caller-identity
```

You should see your AWS account ID and ARN.

---

##### Task 3: Your First Terraform Config -- Create an S3 Bucket
Create a project directory and write your first Terraform config:

```bash
mkdir terraform-basics && cd terraform-basics
```

Create a file called `main.tf` with:
1. A `terraform` block with `required_providers` specifying the `aws` provider
2. A `provider "aws"` block with your region
3. A `resource "aws_s3_bucket"` that creates a bucket with a globally unique name

Run the Terraform lifecycle:
```bash
terraform init      # Download the AWS provider
terraform plan      # Preview what will be created
terraform apply     # Create the bucket (type 'yes' to confirm)
```

Go to the AWS S3 console and verify your bucket exists.

**Document:** What did `terraform init` download? What does the `.terraform/` directory contain?

---

##### Task 4: Add an EC2 Instance
In the same `main.tf`, add:
1. A `resource "aws_instance"` using AMI `ami-0f5ee92e2d63afc18` (Amazon Linux 2 in ap-south-1 -- use the correct AMI for your region)
2. Set instance type to `t2.micro`
3. Add a tag: `Name = "TerraWeek-Day1"`

Run:
```bash
terraform plan      # You should see 1 resource to add (bucket already exists)
terraform apply
```

Go to the AWS EC2 console and verify your instance is running with the correct name tag.

**Document:** How does Terraform know the S3 bucket already exists and only the EC2 instance needs to be created?

---

##### Task 5: Understand the State File
Terraform tracks everything it creates in a state file. Time to inspect it.

1. Open `terraform.tfstate` in your editor -- read the JSON structure
2. Run these commands and document what each returns:
```bash
terraform show                          # Human-readable view of current state
terraform state list                    # List all resources Terraform manages
terraform state show aws_s3_bucket.<name>   # Detailed view of a specific resource
terraform state show aws_instance.<name>
```

3. Answer these questions in your notes:
   - What information does the state file store about each resource?
   - Why should you never manually edit the state file?
   - Why should the state file not be committed to Git?

---

##### Task 6: Modify, Plan, and Destroy
1. Change the EC2 instance tag from `"TerraWeek-Day1"` to `"TerraWeek-Modified"` in your `main.tf`
2. Run `terraform plan` and read the output carefully:
   - What do the `~`, `+`, and `-` symbols mean?
   - Is this an in-place update or a destroy-and-recreate?
3. Apply the change
4. Verify the tag changed in the AWS console
5. Finally, destroy everything:
```bash
terraform destroy
```
6. Verify in the AWS console -- both the S3 bucket and EC2 instance should be gone

---

#### Hints
- S3 bucket names must be globally unique -- use something like `terraweek-<yourname>-2026`
- AMI IDs are region-specific -- search "Amazon Linux 2 AMI" in your region's EC2 launch wizard
- `terraform fmt` auto-formats your `.tf` files -- run it before committing
- `terraform validate` checks for syntax errors without connecting to AWS
- The `.terraform/` directory contains downloaded provider plugins
- Add `*.tfstate`, `*.tfstate.backup`, and `.terraform/` to your `.gitignore`

---

#### Documentation
Create `day-61-terraform-intro.md` with:
- IaC explanation in your own words (3-4 sentences)
- Screenshot of `terraform apply` creating your S3 bucket and EC2 instance
- Screenshot of the resources in the AWS console
- What each Terraform command does (init, plan, apply, destroy, show, state list)
- What the state file contains and why it matters

---

#### Submission
1. Add `day-61-terraform-intro.md` to `2026/day-61/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the TerraWeek Challenge -- installed Terraform, created my first S3 bucket and EC2 instance using code, and destroyed it all with one command. Infrastructure as Code just clicked."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🌱 TerraWeek Day 1 — Introduction to IaC & Terraform Basics

![Terraform](https://img.shields.io/badge/Terraform-IaC-844FBA?logo=terraform&logoColor=white)
![Day 1](https://img.shields.io/badge/TerraWeek-Day%2001-2EA44F)
![Status](https://img.shields.io/badge/Status-Completed-success)

Welcome to **Day 1 of the TerraWeek Challenge!**

Today, I explored the fundamentals of Infrastructure as Code (IaC), learned how Terraform works, installed the Terraform CLI, and provisioned my first local resources using the `local` and `random` providers — without requiring AWS credentials or creating paid cloud infrastructure.

#### 🎯 Learning Objectives

- Understand Infrastructure as Code (IaC) and its benefits.
- Learn what Terraform is and why it is widely used in DevOps.
- Compare Terraform with OpenTofu, Pulumi, AWS CloudFormation, and Ansible.
- Install and verify the Terraform CLI.
- Understand six essential Terraform concepts.
- Execute the complete Terraform workflow: `init`, `fmt`, `validate`, `plan`, `apply`, and `destroy`.
- Generate a local file using Terraform.
- Understand the purpose of `.terraform.lock.hcl`.

#### 📚 Task 1 — Introduction to IaC and Terraform

##### What is Infrastructure as Code (IaC)?

Infrastructure as Code is the practice of defining and managing infrastructure through configuration files instead of creating resources manually through graphical interfaces.

**Benefits of IaC:**

- Automation and repeatability
- Consistent infrastructure environments
- Version control and collaboration
- Reduced manual errors
- Easier infrastructure maintenance and recovery

##### What is Terraform?

Terraform is an Infrastructure as Code tool developed by HashiCorp. It uses a declarative approach, allowing us to describe the desired infrastructure state in configuration files written in HashiCorp Configuration Language (HCL).

Terraform compares the configuration with its state and the observed infrastructure to determine which changes are needed.

**Why Terraform?**

- Supports multiple cloud platforms and services through providers.
- Uses declarative configuration.
- Provides a plan-before-apply workflow.
- Supports reusable modules.
- Integrates with Git and CI/CD pipelines.

##### Terraform vs Other Tools

| Tool | Key Difference |
|---|---|
| Terraform | Declarative IaC with a broad provider ecosystem. |
| OpenTofu | Open-source IaC tool originating as a fork of Terraform. |
| Pulumi | Defines infrastructure using general-purpose programming languages. |
| AWS CloudFormation | AWS-native infrastructure provisioning service. |
| Ansible | Commonly automates configuration management and server setup; it can also provision infrastructure. |

#### 🧠 Task 2 — Terraform Installation

Installed Terraform in my development environment and verified the CLI.

```bash
terraform version
terraform -help
```

The version command confirms the installed Terraform version, while the help command lists available Terraform commands.

**VS Code:** Installed the HashiCorp Terraform extension for syntax highlighting and language support.

Official resources:

- [Terraform Installation Guide](https://developer.hashicorp.com/terraform/install)
- [HashiCorp Terraform VS Code Extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)

> Record your actual Terraform version and environment details in your notes.

#### 🔑 Task 3 — Six Essential Terraform Terminologies

| Terminology | Explanation | Example |
|---|---|---|
| Provider | A plugin that connects Terraform to a platform or service. | `random` provider generates random values. |
| Resource | An object Terraform manages. | `local_file` creates a file on the local system. |
| State | Records Terraform's knowledge of managed resources. | `terraform.tfstate` stores resource state. |
| Plan | Previews proposed infrastructure changes. | `terraform plan` shows resources to be created. |
| HCL | Configuration language used to write Terraform files. | `resource "local_file" "greeting" { ... }` |
| Module | A reusable collection of Terraform configuration. | A networking module can define a VPC and subnets. |

#### 🛠️ Task 4 — My First Terraform Configuration

For the practical exercise, I used the starter configuration in the `example/` directory. It uses the `local` and `random` providers to demonstrate Terraform resource management without creating cloud infrastructure.

##### Step 1: Initialize Terraform

```bash
terraform init
```

Initializes the working directory and downloads the required provider plugins.

##### Step 2: Format the configuration

```bash
terraform fmt
```

Formats Terraform files according to standard formatting conventions.

##### Step 3: Validate the configuration

```bash
terraform validate
```

Checks the configuration for syntax and consistency issues.

##### Step 4: Preview the changes

```bash
terraform plan
```

Displays the changes Terraform proposes to make before applying them.

##### Step 5: Apply the configuration

```bash
terraform apply
```

Reviewed the proposed changes and entered `yes` when prompted to create the resources.

##### Step 6: Verify the generated file

```bash
cat greeting.txt
```

Inspected the generated greeting file created by the Terraform configuration.

##### Step 7: Destroy the resources

```bash
terraform destroy
```

Reviewed the cleanup plan and entered `yes` to remove the resources managed by this example.

> **Note:** Run these commands from the `example/` directory containing the `.tf` configuration files. The exact resource counts and output depend on the supplied starter code.

<img width="1568" height="1016" alt="Screenshot 2026-10-13 132925" src="https://github.com/user-attachments/assets/0ca5783c-43a5-4369-b523-b0a52101fa9e" />
<img width="1619" height="1016" alt="Screenshot 2026-10-13 133009" src="https://github.com/user-attachments/assets/916dbfad-d4b7-44cd-b3e0-5e9b5959ce2f" />
<img width="838" height="65" alt="Screenshot 2026-10-13 133104" src="https://github.com/user-attachments/assets/4b0b1cde-6462-4d54-aba1-7ec5fdc3633a" />
<img width="1895" height="917" alt="Screenshot 2026-10-13 133124" src="https://github.com/user-attachments/assets/eda449cb-2644-4a37-a8c1-705f652983e0" />


#### 🔄 Terraform Workflow

The core Terraform workflow is:

**Write → Init → Format → Validate → Plan → Apply → Verify → Destroy**

| Command | Purpose |
|---|---|
| `terraform init` | Initializes the working directory and providers. |
| `terraform fmt` | Formats configuration files. |
| `terraform validate` | Validates configuration syntax and consistency. |
| `terraform plan` | Previews proposed changes. |
| `terraform apply` | Applies the approved changes. |
| `terraform destroy` | Removes managed resources. |

#### 🍫 Bonus Learnings

##### 1. `.terraform.lock.hcl`

The dependency lock file records the selected provider versions and checksums. It helps maintain consistent and verified provider installations across environments.

##### 2. Terraform CLI Autocomplete

```bash
terraform -install-autocomplete
```

Enables command completion in supported shell environments when configured successfully.

##### 3. OpenTofu

OpenTofu is an open-source alternative that shares Terraform's declarative IaC approach and HCL syntax. Compatibility and feature differences should be checked before switching between tools.

#### 💡 Key Takeaways

- IaC makes infrastructure management repeatable and easier to maintain.
- Terraform describes desired infrastructure declaratively.
- Providers allow Terraform to interact with different platforms.
- `terraform plan` helps review changes before applying them.
- Terraform state is important for tracking managed resources.
- `terraform destroy` helps clean up resources created for testing.
- Local providers make it possible to practise Terraform fundamentals without provisioning cloud infrastructure.

Replace these example filenames with your actual screenshot filenames.


The exact files inside `example/` depend on the starter configuration. Keep the supplied Terraform filenames and commit the provider lock file.

#### 📖 References

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform CLI Commands](https://developer.hashicorp.com/terraform/cli/commands)
- [Terraform Registry](https://registry.terraform.io/)
- [OpenTofu Documentation](https://opentofu.org/docs/)
- [TerraWeek Challenge Repository](https://github.com/tejswini-maingade/TerraWeek)
- [Terraform for DevOps — Companion Repository](https://github.com/LondheShubham153/terraform-for-devops)

---

#### 🚀 Conclusion

Day 1 of TerraWeek helped me build a strong foundation in Infrastructure as Code and Terraform. I successfully practised the Terraform workflow using local resources and learned how to initialize, validate, plan, apply, and destroy resources.

This is the first step in my journey toward mastering Terraform and applying Infrastructure as Code principles to real-world DevOps and cloud projects.

**Next up:** Continue the TerraWeek Challenge and build on these fundamentals!

#TerraWeek #TerraWeekChallenge #TrainWithShubham #Terraform #InfrastructureAsCode #IaC #DevOps #CloudComputing #100DaysOfDevOps

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Tag module repo `v1.0.0`. | You can demonstrate, without notes: *design modules with clear inputs/outputs* — with evidence committed to `day-61/`. |
| 2 | Document module upgrade policy (SemVer). | You can demonstrate, without notes: *version and consume modules* — with evidence committed to `day-61/`. |
| 3 | Compare public registry VPC module vs your own. | You can demonstrate, without notes: *use public registry modules wisely* — with evidence committed to `day-61/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Module source not found | Check path/ref; run `terraform init -upgrade`. |
| Breaking change on upgrade | Review plan; use SemVer and changelog. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Review third-party modules before use; pin versions; scan with checkov/tfsec.
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

1. What makes a good module?
2. Why pin module versions?
3. How do you test modules?
4. Root vs child module?
5. **Scenario:** Three teams copy-pasted VPC code with subtle differences. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a reusable module? | ☐ | ☐ | ☐ | ☐ |
| Can I version it? | ☐ | ☐ | ☐ | ☐ |
| Can I use it in multiple envs? | ☐ | ☐ | ☐ | ☐ |
| Design modules with clear inputs/outputs | ☐ | ☐ | ☐ | ☐ |
| Version and consume modules | ☐ | ☐ | ☐ | ☐ |
| Use public registry modules wisely | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-61/` in your own repository:

```text
day-61/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-61
git add day-61/
git commit -m "day-61: terraform modules"
git push -u origin day-61
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

## 18. Challenge Notes — Day 61: APM with Datadog and AWS Integrations

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 61** of the DevOps 90-Day Challenge!
Today, we dive into **APM (Application Performance Monitoring)**. Sometimes logs and metrics aren't enough—you need to see exactly *where* in the code your application is slow. We will use **Datadog**, a leading observability platform.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand the difference between Infrastructure Monitoring and APM.
* Install the **Datadog Agent** on AWS EC2.
* Instrument a Python/Node.js app to send Traces to Datadog.
* Integrate Datadog with **AWS CloudWatch** to pull metrics.
* Create a **Service Map** to visualize dependencies.

---

#### Tools Used

* **Datadog** (SaaS Platform)
* **Datadog Agent**
* **AWS EC2**
* **Python** (Sample App)

---

#### Key Concepts

##### 1. What is APM?
Application Performance Monitoring tells you:
*   **Latency**: How long did the request take?
*   **Throughput**: How many requests per second?
*   **Errors**: What percentage of requests failed?
*   **Saturation**: How full is the queue?
This is often called the **RED Method** (Rate, Errors, Duration).

##### 2. The Datadog Agent
A lightweight software installed on your hosts (EC2, Kubernetes Nodes). It collects metrics (CPU/RAM) and acts as a local proxy for Traces sent by your application code.

##### 3. AWS Integration
Datadog can pull metrics from AWS CloudWatch API (e.g., RDS CPU, Lambda Duration) so you can see your AWS metrics side-by-side with your application traces.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Flame Graph** | A visual breakdown of a request showing that 80% of time was spent in a MySQL query. |
| **Tagging** | Adding `env:production` and `service:payment-api` tags to filter data easily. |
| **Monitors** | Creating an alert if `p95 latency > 200ms` for 5 minutes. |

---

#### Bonus (Extra Learning)

*   Set up **Datadog Log Management** to correlate logs with traces (click a trace, see the logs for that exact request).
*   Explore **Synthetic Monitoring** to ping your API from around the world.

---

#### Congratulations!

You now have enterprise-grade visibility into your application stack. Datadog is a standard tool in many large organizations, so this is a highly employable skill.

---

#### Try These Next

*   Enable **Database Monitoring** to see which SQL queries are the slowest.
*   Create a custom Dashboard combining EC2 CPU, RDS Connections, and API Latency.

## 19. Cohort Practice — Day 61: Introduction to Terraform and Your First AWS Infrastructure

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You have been deploying containers, writing CI/CD pipelines, and orchestrating workloads on Kubernetes. But who creates the servers, networks, and clusters underneath? Today you start your Infrastructure as Code journey with Terraform -- the tool that lets you define, provision, and manage cloud infrastructure by writing code.

By the end of today, you will have created real AWS resources using nothing but a `.tf` file and a terminal.

---

#### Expected Output
- Terraform installed and working on your machine
- AWS CLI configured with valid credentials
- An S3 bucket and EC2 instance created and destroyed via Terraform
- A markdown file: `day-61-terraform-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand Infrastructure as Code
Before touching the terminal, research and write short notes on:

1. What is Infrastructure as Code (IaC)? Why does it matter in DevOps?
2. What problems does IaC solve compared to manually creating resources in the AWS console?
3. How is Terraform different from AWS CloudFormation, Ansible, and Pulumi?
4. What does it mean that Terraform is "declarative" and "cloud-agnostic"?

Write this in your own words -- not copy-pasted definitions.

---

##### Task 2: Install Terraform and Configure AWS
1. Install Terraform:
```bash
# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Linux (amd64)
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Windows
choco install terraform
```

2. Verify:
```bash
terraform -version
```

3. Install and configure the AWS CLI:
```bash
aws configure
# Enter your Access Key ID, Secret Access Key, default region (e.g., ap-south-1), output format (json)
```

4. Verify AWS access:
```bash
aws sts get-caller-identity
```

You should see your AWS account ID and ARN.

---

##### Task 3: Your First Terraform Config -- Create an S3 Bucket
Create a project directory and write your first Terraform config:

```bash
mkdir terraform-basics && cd terraform-basics
```

Create a file called `main.tf` with:
1. A `terraform` block with `required_providers` specifying the `aws` provider
2. A `provider "aws"` block with your region
3. A `resource "aws_s3_bucket"` that creates a bucket with a globally unique name

Run the Terraform lifecycle:
```bash
terraform init      # Download the AWS provider
terraform plan      # Preview what will be created
terraform apply     # Create the bucket (type 'yes' to confirm)
```

Go to the AWS S3 console and verify your bucket exists.

**Document:** What did `terraform init` download? What does the `.terraform/` directory contain?

---

##### Task 4: Add an EC2 Instance
In the same `main.tf`, add:
1. A `resource "aws_instance"` using AMI `ami-0f5ee92e2d63afc18` (Amazon Linux 2 in ap-south-1 -- use the correct AMI for your region)
2. Set instance type to `t2.micro`
3. Add a tag: `Name = "TerraWeek-Day1"`

Run:
```bash
terraform plan      # You should see 1 resource to add (bucket already exists)
terraform apply
```

Go to the AWS EC2 console and verify your instance is running with the correct name tag.

**Document:** How does Terraform know the S3 bucket already exists and only the EC2 instance needs to be created?

---

##### Task 5: Understand the State File
Terraform tracks everything it creates in a state file. Time to inspect it.

1. Open `terraform.tfstate` in your editor -- read the JSON structure
2. Run these commands and document what each returns:
```bash
terraform show                          # Human-readable view of current state
terraform state list                    # List all resources Terraform manages
terraform state show aws_s3_bucket.<name>   # Detailed view of a specific resource
terraform state show aws_instance.<name>
```

3. Answer these questions in your notes:
   - What information does the state file store about each resource?
   - Why should you never manually edit the state file?
   - Why should the state file not be committed to Git?

---

##### Task 6: Modify, Plan, and Destroy
1. Change the EC2 instance tag from `"TerraWeek-Day1"` to `"TerraWeek-Modified"` in your `main.tf`
2. Run `terraform plan` and read the output carefully:
   - What do the `~`, `+`, and `-` symbols mean?
   - Is this an in-place update or a destroy-and-recreate?
3. Apply the change
4. Verify the tag changed in the AWS console
5. Finally, destroy everything:
```bash
terraform destroy
```
6. Verify in the AWS console -- both the S3 bucket and EC2 instance should be gone

---

#### Hints
- S3 bucket names must be globally unique -- use something like `terraweek-<yourname>-2026`
- AMI IDs are region-specific -- search "Amazon Linux 2 AMI" in your region's EC2 launch wizard
- `terraform fmt` auto-formats your `.tf` files -- run it before committing
- `terraform validate` checks for syntax errors without connecting to AWS
- The `.terraform/` directory contains downloaded provider plugins
- Add `*.tfstate`, `*.tfstate.backup`, and `.terraform/` to your `.gitignore`

---

#### Documentation
Create `day-61-terraform-intro.md` with:
- IaC explanation in your own words (3-4 sentences)
- Screenshot of `terraform apply` creating your S3 bucket and EC2 instance
- Screenshot of the resources in the AWS console
- What each Terraform command does (init, plan, apply, destroy, show, state list)
- What the state file contains and why it matters

---

#### Submission
1. Add `day-61-terraform-intro.md` to `2026/day-61/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the TerraWeek Challenge -- installed Terraform, created my first S3 bucket and EC2 instance using code, and destroyed it all with one command. Infrastructure as Code just clicked."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-61-terraform-intro

Task 1: Understand Infrastructure as Code
==========================================
What is Infrastructure as Code (IaC)? Why does it matter in DevOps?
--------------------------------------------------------------------
-> infrastructure as code (iac) is a modern it practives that automatically manages and sets up technology a modern IT practice that automatically manages and sets up technology resources (like servers, networks, and databases) using machine-readable definition files, instead of manually configuring them through a graphic interface or physical hardware.


-> The Manual Way: A system administrator logs into a cloud provider's dashboard, clicks buttons, and manually types in settings to create a virtual server.
-> The IaC Way: A developer writes a text file that lists all the needed ingredients (e.g., "give me 2 servers, a firewall, and 2 gigabytes of memory"). An IaC tool reads this file and builds the exact environment automatically.

DevOps is a cultural and technical philosophy that unites software developers and IT operations teams to deliver software faster. IaC is a cornerstone of DevOps for several key reasons

- Version control
- consistency
- speed and scalability
- seamless ci/cd

What problems does IaC solve compared to manually creating resources in the AWS console?
----------------------------------------------------------------------------------------
-> Infrastructure as Code (IaC) is the practice of managing cloud resources using machine-readable configuration files rather than manual clicks. It solves major problems like human error, deployment delays, and "configuration drift" (where manual tweaks over time cause differences between development and production environments).

1. Replicating Exact EnvironmentsManual Console: You have to click through menus over and over, which is tedious and risks missing a step when setting up copies like Development, Testing, and Production.IaC: You write the setup down in a text file. You can deploy this exact same "blueprint" across different AWS accounts or regions with a single command, ensuring all environments are 100% identical.
2. Eliminating Human ErrorManual Console: It is easy to mistype an IP address, forget to encrypt a storage bucket, or select the wrong server size.IaC: The code is the single source of truth. Once tested and verified, it removes human error and ensures settings are applied perfectly every single time.

How is Terraform different from AWS CloudFormation, Ansible, and Pulumi?
-------------------------------------------------------------------------
Terraform is an open-source, declarative Infrastructure as Code (IaC) tool that manages multi-cloud environments using state files.While tools like AWS CloudFormation, Ansible, and Pulumi share similarities, they differ fundamentally in cloud compatibility, language design, state management, and primary purpose

Feature       | Terraform         | AWS CloudFormation | Ansible  | Pulumi
cloud         |Multi-Cloud
support       |
              |
language      |HCL (Declarative)
              |
primary       |Orchestration
use           |
              |
state file    |Yes (Managed)

What does it mean that Terraform is "declarative" and "cloud-agnostic"?

## 20. Hands-on Project — Day 61: tfsec + checkov Integration (Terraform IaC Security)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Static scanning for Terraform with tfsec and Checkov. Quality gate fails on HIGH/CRITICAL. Includes Jenkinsfile, pre-commit hooks, and example insecure Terraform.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [policy/checkov.yaml](files/hands-on-projects/policy/checkov.yaml)
- [policy/gate.json](files/hands-on-projects/policy/gate.json)
- [scripts/scan.sh](files/hands-on-projects/scripts/scan.sh)
- [scripts/summary.py](files/hands-on-projects/scripts/summary.py)
- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/providers.tf](files/hands-on-projects/terraform/providers.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)
- [terraform/versions.tf](files/hands-on-projects/terraform/versions.tf)


---

[← Day 60](../day-60/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 62 →](../day-62/README.md)
