# Day 61 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 61 -- Introduction to Terraform and Your First AWS Infrastructure

## Task
You have been deploying containers, writing CI/CD pipelines, and orchestrating workloads on Kubernetes. But who creates the servers, networks, and clusters underneath? Today you start your Infrastructure as Code journey with Terraform -- the tool that lets you define, provision, and manage cloud infrastructure by writing code.

By the end of today, you will have created real AWS resources using nothing but a `.tf` file and a terminal.

---

## Expected Output
- Terraform installed and working on your machine
- AWS CLI configured with valid credentials
- An S3 bucket and EC2 instance created and destroyed via Terraform
- A markdown file: `day-61-terraform-intro.md`

---

## Challenge Tasks

### Task 1: Understand Infrastructure as Code
Before touching the terminal, research and write short notes on:

1. What is Infrastructure as Code (IaC)? Why does it matter in DevOps?
2. What problems does IaC solve compared to manually creating resources in the AWS console?
3. How is Terraform different from AWS CloudFormation, Ansible, and Pulumi?
4. What does it mean that Terraform is "declarative" and "cloud-agnostic"?

Write this in your own words -- not copy-pasted definitions.

---

### Task 2: Install Terraform and Configure AWS
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

### Task 3: Your First Terraform Config -- Create an S3 Bucket
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

### Task 4: Add an EC2 Instance
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

### Task 5: Understand the State File
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

### Task 6: Modify, Plan, and Destroy
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

## Hints
- S3 bucket names must be globally unique -- use something like `terraweek-<yourname>-2026`
- AMI IDs are region-specific -- search "Amazon Linux 2 AMI" in your region's EC2 launch wizard
- `terraform fmt` auto-formats your `.tf` files -- run it before committing
- `terraform validate` checks for syntax errors without connecting to AWS
- The `.terraform/` directory contains downloaded provider plugins
- Add `*.tfstate`, `*.tfstate.backup`, and `.terraform/` to your `.gitignore`

---

## Documentation
Create `day-61-terraform-intro.md` with:
- IaC explanation in your own words (3-4 sentences)
- Screenshot of `terraform apply` creating your S3 bucket and EC2 instance
- Screenshot of the resources in the AWS console
- What each Terraform command does (init, plan, apply, destroy, show, state list)
- What the state file contains and why it matters

---

## Submission
1. Add `day-61-terraform-intro.md` to `2026/day-61/`
2. Commit and push to your fork

---

## Learn in Public
Share on LinkedIn: "Started the TerraWeek Challenge -- installed Terraform, created my first S3 bucket and EC2 instance using code, and destroyed it all with one command. Infrastructure as Code just clicked."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## Source file: `day-61-terraform-intro.md`

# 🌱 TerraWeek Day 1 — Introduction to IaC & Terraform Basics

![Terraform](https://img.shields.io/badge/Terraform-IaC-844FBA?logo=terraform&logoColor=white)
![Day 1](https://img.shields.io/badge/TerraWeek-Day%2001-2EA44F)
![Status](https://img.shields.io/badge/Status-Completed-success)

Welcome to **Day 1 of the TerraWeek Challenge!**

Today, I explored the fundamentals of Infrastructure as Code (IaC), learned how Terraform works, installed the Terraform CLI, and provisioned my first local resources using the `local` and `random` providers — without requiring AWS credentials or creating paid cloud infrastructure.

## 🎯 Learning Objectives

- Understand Infrastructure as Code (IaC) and its benefits.
- Learn what Terraform is and why it is widely used in DevOps.
- Compare Terraform with OpenTofu, Pulumi, AWS CloudFormation, and Ansible.
- Install and verify the Terraform CLI.
- Understand six essential Terraform concepts.
- Execute the complete Terraform workflow: `init`, `fmt`, `validate`, `plan`, `apply`, and `destroy`.
- Generate a local file using Terraform.
- Understand the purpose of `.terraform.lock.hcl`.

## 📚 Task 1 — Introduction to IaC and Terraform

### What is Infrastructure as Code (IaC)?

Infrastructure as Code is the practice of defining and managing infrastructure through configuration files instead of creating resources manually through graphical interfaces.

**Benefits of IaC:**

- Automation and repeatability
- Consistent infrastructure environments
- Version control and collaboration
- Reduced manual errors
- Easier infrastructure maintenance and recovery

### What is Terraform?

Terraform is an Infrastructure as Code tool developed by HashiCorp. It uses a declarative approach, allowing us to describe the desired infrastructure state in configuration files written in HashiCorp Configuration Language (HCL).

Terraform compares the configuration with its state and the observed infrastructure to determine which changes are needed.

**Why Terraform?**

- Supports multiple cloud platforms and services through providers.
- Uses declarative configuration.
- Provides a plan-before-apply workflow.
- Supports reusable modules.
- Integrates with Git and CI/CD pipelines.

### Terraform vs Other Tools

| Tool | Key Difference |
|---|---|
| Terraform | Declarative IaC with a broad provider ecosystem. |
| OpenTofu | Open-source IaC tool originating as a fork of Terraform. |
| Pulumi | Defines infrastructure using general-purpose programming languages. |
| AWS CloudFormation | AWS-native infrastructure provisioning service. |
| Ansible | Commonly automates configuration management and server setup; it can also provision infrastructure. |

## 🧠 Task 2 — Terraform Installation

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

## 🔑 Task 3 — Six Essential Terraform Terminologies

| Terminology | Explanation | Example |
|---|---|---|
| Provider | A plugin that connects Terraform to a platform or service. | `random` provider generates random values. |
| Resource | An object Terraform manages. | `local_file` creates a file on the local system. |
| State | Records Terraform's knowledge of managed resources. | `terraform.tfstate` stores resource state. |
| Plan | Previews proposed infrastructure changes. | `terraform plan` shows resources to be created. |
| HCL | Configuration language used to write Terraform files. | `resource "local_file" "greeting" { ... }` |
| Module | A reusable collection of Terraform configuration. | A networking module can define a VPC and subnets. |

## 🛠️ Task 4 — My First Terraform Configuration

For the practical exercise, I used the starter configuration in the `example/` directory. It uses the `local` and `random` providers to demonstrate Terraform resource management without creating cloud infrastructure.

### Step 1: Initialize Terraform

```bash
terraform init
```

Initializes the working directory and downloads the required provider plugins.

### Step 2: Format the configuration

```bash
terraform fmt
```

Formats Terraform files according to standard formatting conventions.

### Step 3: Validate the configuration

```bash
terraform validate
```

Checks the configuration for syntax and consistency issues.

### Step 4: Preview the changes

```bash
terraform plan
```

Displays the changes Terraform proposes to make before applying them.

### Step 5: Apply the configuration

```bash
terraform apply
```

Reviewed the proposed changes and entered `yes` when prompted to create the resources.

### Step 6: Verify the generated file

```bash
cat greeting.txt
```

Inspected the generated greeting file created by the Terraform configuration.

### Step 7: Destroy the resources

```bash
terraform destroy
```

Reviewed the cleanup plan and entered `yes` to remove the resources managed by this example.

> **Note:** Run these commands from the `example/` directory containing the `.tf` configuration files. The exact resource counts and output depend on the supplied starter code.

<img width="1568" height="1016" alt="Screenshot 2026-10-13 132925" src="https://github.com/user-attachments/assets/0ca5783c-43a5-4369-b523-b0a52101fa9e" />
<img width="1619" height="1016" alt="Screenshot 2026-10-13 133009" src="https://github.com/user-attachments/assets/916dbfad-d4b7-44cd-b3e0-5e9b5959ce2f" />
<img width="838" height="65" alt="Screenshot 2026-10-13 133104" src="https://github.com/user-attachments/assets/4b0b1cde-6462-4d54-aba1-7ec5fdc3633a" />
<img width="1895" height="917" alt="Screenshot 2026-10-13 133124" src="https://github.com/user-attachments/assets/eda449cb-2644-4a37-a8c1-705f652983e0" />


## 🔄 Terraform Workflow

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

## 🍫 Bonus Learnings

### 1. `.terraform.lock.hcl`

The dependency lock file records the selected provider versions and checksums. It helps maintain consistent and verified provider installations across environments.

### 2. Terraform CLI Autocomplete

```bash
terraform -install-autocomplete
```

Enables command completion in supported shell environments when configured successfully.

### 3. OpenTofu

OpenTofu is an open-source alternative that shares Terraform's declarative IaC approach and HCL syntax. Compatibility and feature differences should be checked before switching between tools.

## 💡 Key Takeaways

- IaC makes infrastructure management repeatable and easier to maintain.
- Terraform describes desired infrastructure declaratively.
- Providers allow Terraform to interact with different platforms.
- `terraform plan` helps review changes before applying them.
- Terraform state is important for tracking managed resources.
- `terraform destroy` helps clean up resources created for testing.
- Local providers make it possible to practise Terraform fundamentals without provisioning cloud infrastructure.

Replace these example filenames with your actual screenshot filenames.

```

The exact files inside `example/` depend on the starter configuration. Keep the supplied Terraform filenames and commit the provider lock file.

## 📖 References

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform CLI Commands](https://developer.hashicorp.com/terraform/cli/commands)
- [Terraform Registry](https://registry.terraform.io/)
- [OpenTofu Documentation](https://opentofu.org/docs/)
- [TerraWeek Challenge Repository](https://github.com/tejswini-maingade/TerraWeek)
- [Terraform for DevOps — Companion Repository](https://github.com/LondheShubham153/terraform-for-devops)

---

## 🚀 Conclusion

Day 1 of TerraWeek helped me build a strong foundation in Infrastructure as Code and Terraform. I successfully practised the Terraform workflow using local resources and learned how to initialize, validate, plan, apply, and destroy resources.

This is the first step in my journey toward mastering Terraform and applying Infrastructure as Code principles to real-world DevOps and cloud projects.

**Next up:** Continue the TerraWeek Challenge and build on these fundamentals!

#TerraWeek #TerraWeekChallenge #TrainWithShubham #Terraform #InfrastructureAsCode #IaC #DevOps #CloudComputing #100DaysOfDevOps
