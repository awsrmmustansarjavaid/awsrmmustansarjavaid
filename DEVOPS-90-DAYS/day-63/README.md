# Day 63 — Capstone 2 (Part 1/3): Cloud Foundation with Terraform

[← Day 62](../day-62/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 64 →](../day-64/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 2 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Design a multi-environment AWS landing zone for an app
- [ ] Build network, IAM, state and tagging as modules
- [ ] Document architecture and cost estimate

## 2. Prerequisites

- Days 50-62.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project definition

Capstone 2 - Cloud Infrastructure Automation: Terraform-provisioned dev/prod environments with VPC, ALB, ASG/EC2 (or ECS), RDS, S3, IAM roles, CloudWatch alarms, budgets - configured with Ansible, delivered by a pipeline.

### 3.2 Design principles

Least privilege, multi-AZ, private data tier, encryption, tagging, remote state per env, cost controls.

### 3.3 Deliverable layout

`infra/{bootstrap,modules,envs/dev,envs/prod}`, `ansible/`, `docs/`, `.github/workflows/`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create repo `capstone2-cloud-automation`.
2. [ ] Bootstrap remote state (bucket + lock).
3. [ ] Build modules: `network`, `iam`, `compute`, `database`, `monitoring`.
4. [ ] Deploy `dev` environment and verify.
5. [ ] Write architecture doc, ADR for compute choice and monthly cost estimate.

## 5. Real-World Scenario

> A client wants identical staging and production in different accounts, created in under 30 minutes, with audit trail and cost visibility.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
cd infra/bootstrap && terraform init && terraform apply
cd ../envs/dev && terraform init && terraform plan -out tfplan && terraform apply tfplan
terraform output
infracost breakdown --path .
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 63 -- Variables, Outputs, Data Sources and Expressions — Challenge Brief

#### Task
Your Day 62 config works, but it is full of hardcoded values -- region, CIDR blocks, AMI IDs, instance types, tags. Change the region and everything breaks. Today you make your Terraform configs dynamic, reusable, and environment-aware.

This is the difference between a config that works once and a config you can use across projects.

---

#### Expected Output
- A fully parameterized Terraform config with no hardcoded values
- Separate `.tfvars` files for different environments
- Outputs printed after every apply
- A markdown file: `day-63-variables-outputs.md`

---

#### Challenge Tasks

##### Task 1: Extract Variables
Take your Day 62 infrastructure config and refactor it:

1. Create a `variables.tf` file with input variables for:
   - `region` (string, default: your preferred region)
   - `vpc_cidr` (string, default: `"10.0.0.0/16"`)
   - `subnet_cidr` (string, default: `"10.0.1.0/24"`)
   - `instance_type` (string, default: `"t2.micro"`)
   - `project_name` (string, no default -- force the user to provide it)
   - `environment` (string, default: `"dev"`)
   - `allowed_ports` (list of numbers, default: `[22, 80, 443]`)
   - `extra_tags` (map of strings, default: `{}`)

2. Replace every hardcoded value in `main.tf` with `var.<name>` references
3. Run `terraform plan` -- it should prompt you for `project_name` since it has no default

**Document:** What are the five variable types in Terraform? (`string`, `number`, `bool`, `list`, `map`)

---

##### Task 2: Variable Files and Precedence
1. Create `terraform.tfvars`:
```hcl
project_name = "terraweek"
environment  = "dev"
instance_type = "t2.micro"
```

2. Create `prod.tfvars`:
```hcl
project_name = "terraweek"
environment  = "prod"
instance_type = "t3.small"
vpc_cidr     = "10.1.0.0/16"
subnet_cidr  = "10.1.1.0/24"
```

3. Apply with the default file:
```bash
terraform plan                              # Uses terraform.tfvars automatically
```

4. Apply with the prod file:
```bash
terraform plan -var-file="prod.tfvars"      # Uses prod.tfvars
```

5. Override with CLI:
```bash
terraform plan -var="instance_type=t2.nano"  # CLI overrides everything
```

6. Set an environment variable:
```bash
export TF_VAR_environment="staging"
terraform plan                              # env var overrides default but not tfvars
```

**Document:** Write the variable precedence order from lowest to highest priority.

---

##### Task 3: Add Outputs
Create an `outputs.tf` file with outputs for:

1. `vpc_id` -- the VPC ID
2. `subnet_id` -- the public subnet ID
3. `instance_id` -- the EC2 instance ID
4. `instance_public_ip` -- the public IP of the EC2 instance
5. `instance_public_dns` -- the public DNS name
6. `security_group_id` -- the security group ID

Apply your config and verify the outputs are printed at the end:
```bash
terraform apply

# After apply, you can also run:
terraform output                          # Show all outputs
terraform output instance_public_ip       # Show a specific output
terraform output -json                    # JSON format for scripting
```

**Verify:** Does `terraform output instance_public_ip` return the correct IP?

---

##### Task 4: Use Data Sources
Stop hardcoding the AMI ID. Use a data source to fetch it dynamically.

1. Add a `data "aws_ami"` block that:
   - Filters for Amazon Linux 2 images
   - Filters for `hvm` virtualization and `gp2` root device
   - Uses `owners = ["amazon"]`
   - Sets `most_recent = true`

2. Replace the hardcoded AMI in your `aws_instance` with `data.aws_ami.amazon_linux.id`

3. Add a `data "aws_availability_zones"` block to fetch available AZs in your region

4. Use the first AZ in your subnet: `data.aws_availability_zones.available.names[0]`

Apply and verify -- your config now works in any region without changing the AMI.

**Document:** What is the difference between a `resource` and a `data` source?

---

##### Task 5: Use Locals for Dynamic Values
1. Add a `locals` block:
```hcl
locals {
  name_prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
```

2. Replace all Name tags with `local.name_prefix`:
   - VPC: `"${local.name_prefix}-vpc"`
   - Subnet: `"${local.name_prefix}-subnet"`
   - Instance: `"${local.name_prefix}-server"`

3. Merge common tags with resource-specific tags:
```hcl
tags = merge(local.common_tags, {
  Name = "${local.name_prefix}-server"
})
```

Apply and check the tags in the AWS console -- every resource should have consistent tagging.

---

##### Task 6: Built-in Functions and Conditional Expressions
Practice these in `terraform console`:
```bash
terraform console
```

1. **String functions:**
   - `upper("terraweek")` -> `"TERRAWEEK"`
   - `join("-", ["terra", "week", "2026"])` -> `"terra-week-2026"`
   - `format("arn:aws:s3:::%s", "my-bucket")`

2. **Collection functions:**
   - `length(["a", "b", "c"])` -> `3`
   - `lookup({dev = "t2.micro", prod = "t3.small"}, "dev")` -> `"t2.micro"`
   - `toset(["a", "b", "a"])` -> removes duplicates

3. **Networking function:**
   - `cidrsubnet("10.0.0.0/16", 8, 1)` -> `"10.0.1.0/24"`

4. **Conditional expression** -- add this to your config:
```hcl
instance_type = var.environment == "prod" ? "t3.small" : "t2.micro"
```

Apply with `environment = "prod"` and verify the instance type changes.

**Document:** Pick five functions you find most useful and explain what each does.

---

#### Hints
- `terraform.tfvars` is loaded automatically. Any other `.tfvars` file needs `-var-file`
- Variable precedence (low to high): default -> `terraform.tfvars` -> `*.auto.tfvars` -> `-var-file` -> `-var` flag -> `TF_VAR_*` env vars
- `terraform console` is an interactive REPL for testing expressions and functions
- Data sources are read-only -- they fetch information, they don't create resources
- `merge()` combines two maps -- great for tags
- `terraform output -json` is useful when piping output into other scripts

---

#### Documentation
Create `day-63-variables-outputs.md` with:
- Your `variables.tf` with all variable types
- Both `.tfvars` files (dev and prod)
- Screenshot of outputs after `terraform apply`
- Explanation of variable precedence with examples
- Five built-in functions you found most useful
- The difference between `variable`, `local`, `output`, and `data`

---

#### Submission
1. Add `day-63-variables-outputs.md` to `2026/day-63/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Made my Terraform configs fully dynamic today -- variables for every environment, data sources for AMI lookups, locals for consistent tagging, and conditional expressions for environment-specific sizing. Zero hardcoded values."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 63 -- Variables, Outputs, Data Sources and Expressions — Notes & Solution

#### Task
Your Day 62 config works, but it is full of hardcoded values -- region, CIDR blocks, AMI IDs, instance types, tags. Change the region and everything breaks. Today you make your Terraform configs dynamic, reusable, and environment-aware.

This is the difference between a config that works once and a config you can use across projects.

---

#### Challenge Tasks

##### Task 1: Extract Variables
Take your Day 62 infrastructure config and refactor it:

1. Create a `variables.tf` file with input variables for:
   - `region` (string, default: your preferred region)
   - `vpc_cidr` (string, default: `"10.0.0.0/16"`)
   - `subnet_cidr` (string, default: `"10.0.1.0/24"`)
   - `instance_type` (string, default: `"t2.micro"`)
   - `project_name` (string, no default -- force the user to provide it)
   - `environment` (string, default: `"dev"`)
   - `allowed_ports` (list of numbers, default: `[22, 80, 443]`)
   - `extra_tags` (map of strings, default: `{}`)

2. Replace every hardcoded value in `main.tf` with `var.<name>` references
3. Run `terraform plan` -- it should prompt you for `project_name` since it has no default

**Document:** What are the five variable types in Terraform? (`string`, `number`, `bool`, `list`, `map`)

- `string` names or any text
   ```bash
   variable "instance_name" {
   type    = string
   default = "my-ec2"
   }

   # Usage in resource
   tags = { Name = var.instance_name }
   ```
- `number` counts
   ```bash
      variable "instance_count" {
      type    = number
      default = 2
      }

      # Usage in resource
      count = var.instance_count
   ```

- `bool` conditional true or false
   ```bash
      variable "assign_public_ip" {
      type    = bool
      default = true
      }

      # Usage in resource
      associate_public_ip_address = var.assign_public_ip
   ```

- `list` Ordered collection
   ```bash
      variable "security_groups" {
      type    = list(string)
      default = ["sg-123", "sg-456"]
      }

      # Usage in resource
      vpc_security_group_ids = var.security_groups
   ```
- `map` Key-value pairs
   ```bash
      variable "s3_buckets" {
      type = map(string)
      default = {
         bucket1 = "us-east-1"
         bucket2 = "us-west-2"
         }
      }

      # Usage in resource
      for_each = var.s3_buckets
      bucket   = each.key
      region   = each.value
   ```
   
---

##### Task 2: Variable Files and Precedence
1. Create `terraform.tfvars`:
```hcl
project_name = "terraweek"
environment  = "dev"
instance_type = "t2.small"
```

2. Create `prod.tfvars`:
```hcl
project_name = "terraweek"
environment  = "prod"
instance_type = "t3.nano"
vpc_cidr     = "10.1.0.0/16"
subnet_cidr  = "10.1.1.0/24"
```


3. Apply with the default file:
```bash
terraform plan                              # Uses terraform.tfvars automatically
```
<img width="672" height="925" alt="Screenshot 2026-10-21 224935" src="https://github.com/user-attachments/assets/2b75116c-bf98-4742-983f-4b969cefd3c0" />


- terraform.tfvars is automatically loaded by default

4. Apply with the prod file:
```bash
terraform plan -var-file="prod.tfvars"      # Uses prod.tfvars
```
<img width="705" height="828" alt="Screenshot 2026-10-21 225041" src="https://github.com/user-attachments/assets/e1e625f4-aaa5-43e8-a533-4a1b0a6fe982" />
<img width="933" height="633" alt="Screenshot 2026-10-21 225219" src="https://github.com/user-attachments/assets/e5095c99-0468-47fa-80e3-afcf98fb839e" />
<img width="695" height="620" alt="Screenshot 2026-10-21 225237" src="https://github.com/user-attachments/assets/73b85ca1-3e49-493e-899d-7b71f9a57db3" />

5. Override with CLI:
```bash
terraform plan -var="instance_type=t2.nano"  # CLI overrides everything
```

<img width="1411" height="977" alt="Screenshot 2026-10-21 225538" src="https://github.com/user-attachments/assets/c17297ea-db97-4766-b030-c9c66de74a8d" />



6. Set an environment variable:
```bash
export TF_VAR_environment="staging"
terraform plan                              # env var overrides default but not tfvars
```
<img width="1306" height="978" alt="Screenshot 2026-10-21 225959" src="https://github.com/user-attachments/assets/bf6ab294-2295-4074-852c-f2011516796d" />


- `export TF_VAR_environment="staging"` overrides only the `default` in variables.tf, but does not override `terraform.tfvars`.
- `terraform.tfvars` have `environment = dev`, Terraform uses `"dev"`

**Document:** Write the variable precedence order from lowest to highest priority.

1. **Default value** in the `variable` block (`variables.tf`)
2. **`terraform.tfvars`** or other `.tfvars` / `.auto.tfvars` files
3. **Environment variable** (`TF_VAR_<variable_name>`)
4. **CLI `-var` flag** 

- So the **highest priority** is the CLI `-var`, and the **lowest** is the default in `variables.tf`.

---

##### Task 3: Add Outputs
Create an `outputs.tf` file with outputs for:

1. `vpc_id` -- the VPC ID
2. `subnet_id` -- the public subnet ID
3. `instance_id` -- the EC2 instance ID
4. `instance_public_ip` -- the public IP of the EC2 instance
5. `instance_public_dns` -- the public DNS name
6. `security_group_id` -- the security group ID

Apply your config and verify the outputs are printed at the end:
```bash
terraform apply

# After apply, you can also run:
terraform output                          # Show all outputs
terraform output instance_public_ip       # Show a specific output
terraform output -json                    # JSON format for scripting
```

<img width="1407" height="580" alt="Screenshot 2026-10-21 230331" src="https://github.com/user-attachments/assets/29a20a9c-8e7a-4a86-9982-f7946955bed4" />
<img width="878" height="200" alt="Screenshot 2026-10-21 230344" src="https://github.com/user-attachments/assets/a56cb036-c02e-48a0-bcb7-b04d15fe8180" />
<img width="787" height="860" alt="Screenshot 2026-10-21 230407" src="https://github.com/user-attachments/assets/55bb455a-f2b0-460c-99c2-48f3d77d4c27" />



**Verify:** Does `terraform output instance_public_ip` return the correct IP?

- Yes

<img width="1917" height="863" alt="Screenshot 2026-10-21 230507" src="https://github.com/user-attachments/assets/c34b6b4c-27f9-4774-939e-9dcb753703c4" />



---

##### Task 4: Use Data Sources
Stop hardcoding the AMI ID. Use a data source to fetch it dynamically.

1. Add a `data "aws_ami"` block that:
   - Filters for Amazon Linux 2 images
   - Filters for `hvm` virtualization and `gp2` root device
   - Uses `owners = ["amazon"]`
   - Sets `most_recent = true`

2. Replace the hardcoded AMI in your `aws_instance` with `data.aws_ami.amazon_linux.id`

3. Add a `data "aws_availability_zones"` block to fetch available AZs in your region

4. Use the first AZ in your subnet: `data.aws_availability_zones.available.names[0]`

Apply and verify -- your config now works in any region without changing the AMI.

<img width="1917" height="871" alt="Screenshot 2026-10-21 230631" src="https://github.com/user-attachments/assets/f7535a75-86d2-4470-94dd-0e6c37adf8dc" />



**Document:** What is the difference between a `resource` and a `data` source?

   | Feature           | `resource`           | `data`                        |
   | ----------------- | -------------------- | ----------------------------- |
   | Creates infra     |   Yes                |    No                          |
   | Managed by TF     |   Yes                |    No                          |
   | Stored in state   |   Yes                |     Read-only reference        |
   | Lifecycle actions | create/update/delete | read-only                     |
   | Use case          | EC2, VPC, Subnet     | AMI lookup, AZs, existing VPC |

---

##### Task 5: Use Locals for Dynamic Values
1. Add a `locals` block:
```hcl
locals {
  name_prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
```

2. Replace all Name tags with `local.name_prefix`:
   - VPC: `"${local.name_prefix}-vpc"`
   - Subnet: `"${local.name_prefix}-subnet"`
   - Instance: `"${local.name_prefix}-server"`

3. Merge common tags with resource-specific tags:
```hcl
tags = merge(local.common_tags, {
  Name = "${local.name_prefix}-server"
})
```

Apply and check the tags in the AWS console -- every resource should have consistent tagging.


<img width="1917" height="260" alt="Screenshot 2026-10-21 230706" src="https://github.com/user-attachments/assets/64a7cee7-4293-4ac2-b87a-793a1067f1fa" />
<img width="1640" height="710" alt="Screenshot 2026-10-21 230726" src="https://github.com/user-attachments/assets/2c8432a2-64af-4759-a0ff-902dd2e506ba" />


---

##### Task 6: Built-in Functions and Conditional Expressions
Practice these in `terraform console`:
```bash
terraform console
```

1. **String functions:**
   - `upper("terraweek")` -> `"TERRAWEEK"`
   - `join("-", ["terra", "week", "2026"])` -> `"terra-week-2026"`
   - `format("arn:aws:s3:::%s", "my-bucket")`

2. **Collection functions:**
   - `length(["a", "b", "c"])` -> `3`
   - `lookup({dev = "t2.micro", prod = "t3.small"}, "dev")` -> `"t2.micro"`
   - `toset(["a", "b", "a"])` -> removes duplicates

3. **Networking function:**
   - `cidrsubnet("10.0.0.0/16", 8, 1)` -> `"10.0.1.0/24"`

4. **Conditional expression** -- add this to your config:
```hcl
instance_type = var.environment == "prod" ? "t3.small" : "t2.micro"
```

Apply with `environment = "prod"` and verify the instance type changes.
<img width="751" height="376" alt="Screenshot 2026-10-21 231049" src="https://github.com/user-attachments/assets/3eacd3b5-4bd4-4fcf-adb7-38a9cf2aabeb" />


**Document:** Pick five functions you find most useful and explain what each does.

   - `upper()` used for string formatting
      - upper(var.environment)   `"dev" → "DEV"`
   - `join()`  used to combine values
      - join("-", ["app", var.environment, "2026"])   `"app-dev-2026"`
   - `format()` used to build structured strings (like ARNs)
      - format("arn:aws:s3:::%s", my-bucket) `"arn:aws:s3:::my-bucket"`
   - `lookup()` used for environment-based selection
      - lookup({dev = "t2.micro", prod = "t3.small"}, "dev") `"t2.micro"`
   - `cidrsubnet()` used for network/subnet creation
      - cidrsubnet("10.0.0.0/16", 8, 1)  `creates "10.0.1.0/24"`

---

**Explanation of variable precedence with examples**

| Priority (High → Low) | Source                     | Example                                    |  Value       |
| --------------------- | -------------------------- | ------------------------------------------ | ------------ |
| 1 (Highest)           | Command-line (`-var`)      | `terraform plan -var="environment=qa"`     | `qa`         |
| 2                     | Command-line (`-var-file`) | `terraform plan -var-file="prod.tfvars"`   | `prod`       |
| 3                     | Auto-loaded tfvars         | `terraform.tfvars → environment = "stage"` | `stage`      |
| 4                     | Environment variable       | `TF_VAR_environment=uat`                   | `uat`        |
| 5 (Lowest)            | Default value              | `default = "dev"`                          | `dev`        |


**The difference between `variable`, `local`, `output`, and `data`**

   `variable:` Used to take input values from the user.

   `local:` Used to define internal reusable values or expressions.
   
   `data:` Used to fetch existing resources from the provider (read-only).
   
   `output:` Used to display or export values after execution.

---

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw architecture diagram. | You can demonstrate, without notes: *design a multi-environment AWS landing zone for an app* — with evidence committed to `day-63/`. |
| 2 | List top 5 risks. | You can demonstrate, without notes: *build network, IAM, state and tagging as modules* — with evidence committed to `day-63/`. |
| 3 | Estimate cost for dev vs prod. | You can demonstrate, without notes: *document architecture and cost estimate* — with evidence committed to `day-63/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Module dependency confusion | Pass IDs via outputs/variables; avoid hidden coupling. |
| Dev env expensive | Single NAT, smaller instances, schedule off. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** KMS encryption, private subnets, no public DB, scoped IAM, CloudTrail enabled.
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

1. How do you structure Terraform for multiple environments?
2. How do you control cost?
3. How do you secure the network?
4. What goes into an ADR?
5. **Scenario:** A client wants identical staging and production in different accounts, created in under 30 minutes, with audit trail and cost visibility. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Does dev deploy from scratch? | ☐ | ☐ | ☐ | ☐ |
| Is cost documented? | ☐ | ☐ | ☐ | ☐ |
| Is the code modular? | ☐ | ☐ | ☐ | ☐ |
| Design a multi-environment AWS landing zone for an app | ☐ | ☐ | ☐ | ☐ |
| Build network, IAM, state and tagging as modules | ☐ | ☐ | ☐ | ☐ |
| Document architecture and cost estimate | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-63/` in your own repository:

```text
day-63/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-63
git add day-63/
git commit -m "day-63: capstone 2 (part 1/3)"
git push -u origin day-63
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 63: AWS Secrets Manager and Parameter Store

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 63** of the DevOps 90-Day Challenge!
Today, we solve the eternal problem: **Where do I put my database password?** Hardcoding it in git is a security sin. We will learn to use **AWS Secrets Manager** and **Parameter Store**.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Understand the difference between **Secrets Manager** and **Parameter Store**.
* Store and retrieve a database password securely.
* Automate **Secret Rotation** (changing the password every 30 days automatically).
* Integrate secrets into your application code (without hardcoding!).

---

#### Tools Used

* **AWS Secrets Manager**
* **AWS Systems Manager Parameter Store**
* **AWS KMS** (Key Management Service)
* **AWS Lambda** (for rotation)

---

#### Key Concepts

##### 1. Parameter Store (SSM)
*   **Cost**: Free (Standard tier).
*   **Use Case**: Configuration data (API URLs, License Keys) and simple secrets (Passwords).
*   **Features**: Versioning, Hierarchy (`/prod/db/password`), and Encryption via KMS.

##### 2. Secrets Manager
*   **Cost**: Paid ($0.40 per secret/month).
*   **Use Case**: Highly sensitive credentials (DB passwords, API keys) that need **rotation**.
*   **Features**: Built-in rotation for RDS/Redshift/DocumentDB.

##### 3. KMS Encryption
Both services use **KMS** to encrypt data at rest. You control who can decrypt the secret by managing KMS Key policies.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **SecureString** | Storing a password in Parameter Store so it's encrypted in the console. |
| **Dynamic Reference** | Using `{{resolve:secretsmanager:MySecret}}` in CloudFormation to inject secrets without revealing them. |
| **Rotation** | Configuring a Lambda function to update the DB password every 30 days. |

---

#### Bonus (Extra Learning)

*   Create a **Hierarchy** in Parameter Store: `/dev/app/db_url` vs `/prod/app/db_url`.
*   Use the **AWS CLI** to retrieve a secret: `aws ssm get-parameter --name /my/secret --with-decryption`.

---

#### Congratulations!

You’ve eliminated hardcoded credentials from your code! This is a massive security win and a requirement for SOC2/ISO compliance.

---

#### Try These Next

*   Update your **Elastic Beanstalk** or **ECS** task definition to pull environment variables from Secrets Manager.
*   Audit who accessed a secret using **CloudTrail**.

## 19. Cohort Practice — Day 63: Variables, Outputs, Data Sources and Expressions

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Your Day 62 config works, but it is full of hardcoded values -- region, CIDR blocks, AMI IDs, instance types, tags. Change the region and everything breaks. Today you make your Terraform configs dynamic, reusable, and environment-aware.

This is the difference between a config that works once and a config you can use across projects.

---

#### Expected Output
- A fully parameterized Terraform config with no hardcoded values
- Separate `.tfvars` files for different environments
- Outputs printed after every apply
- A markdown file: `day-63-variables-outputs.md`

---

#### Challenge Tasks

##### Task 1: Extract Variables
Take your Day 62 infrastructure config and refactor it:

1. Create a `variables.tf` file with input variables for:
   - `region` (string, default: your preferred region)
   - `vpc_cidr` (string, default: `"10.0.0.0/16"`)
   - `subnet_cidr` (string, default: `"10.0.1.0/24"`)
   - `instance_type` (string, default: `"t2.micro"`)
   - `project_name` (string, no default -- force the user to provide it)
   - `environment` (string, default: `"dev"`)
   - `allowed_ports` (list of numbers, default: `[22, 80, 443]`)
   - `extra_tags` (map of strings, default: `{}`)

2. Replace every hardcoded value in `main.tf` with `var.<name>` references
3. Run `terraform plan` -- it should prompt you for `project_name` since it has no default

**Document:** What are the five variable types in Terraform? (`string`, `number`, `bool`, `list`, `map`)

---

##### Task 2: Variable Files and Precedence
1. Create `terraform.tfvars`:
```hcl
project_name = "terraweek"
environment  = "dev"
instance_type = "t2.micro"
```

2. Create `prod.tfvars`:
```hcl
project_name = "terraweek"
environment  = "prod"
instance_type = "t3.small"
vpc_cidr     = "10.1.0.0/16"
subnet_cidr  = "10.1.1.0/24"
```

3. Apply with the default file:
```bash
terraform plan                              # Uses terraform.tfvars automatically
```

4. Apply with the prod file:
```bash
terraform plan -var-file="prod.tfvars"      # Uses prod.tfvars
```

5. Override with CLI:
```bash
terraform plan -var="instance_type=t2.nano"  # CLI overrides everything
```

6. Set an environment variable:
```bash
export TF_VAR_environment="staging"
terraform plan                              # env var overrides default but not tfvars
```

**Document:** Write the variable precedence order from lowest to highest priority.

---

##### Task 3: Add Outputs
Create an `outputs.tf` file with outputs for:

1. `vpc_id` -- the VPC ID
2. `subnet_id` -- the public subnet ID
3. `instance_id` -- the EC2 instance ID
4. `instance_public_ip` -- the public IP of the EC2 instance
5. `instance_public_dns` -- the public DNS name
6. `security_group_id` -- the security group ID

Apply your config and verify the outputs are printed at the end:
```bash
terraform apply

# After apply, you can also run:
terraform output                          # Show all outputs
terraform output instance_public_ip       # Show a specific output
terraform output -json                    # JSON format for scripting
```

**Verify:** Does `terraform output instance_public_ip` return the correct IP?

---

##### Task 4: Use Data Sources
Stop hardcoding the AMI ID. Use a data source to fetch it dynamically.

1. Add a `data "aws_ami"` block that:
   - Filters for Amazon Linux 2 images
   - Filters for `hvm` virtualization and `gp2` root device
   - Uses `owners = ["amazon"]`
   - Sets `most_recent = true`

2. Replace the hardcoded AMI in your `aws_instance` with `data.aws_ami.amazon_linux.id`

3. Add a `data "aws_availability_zones"` block to fetch available AZs in your region

4. Use the first AZ in your subnet: `data.aws_availability_zones.available.names[0]`

Apply and verify -- your config now works in any region without changing the AMI.

**Document:** What is the difference between a `resource` and a `data` source?

---

##### Task 5: Use Locals for Dynamic Values
1. Add a `locals` block:
```hcl
locals {
  name_prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
```

2. Replace all Name tags with `local.name_prefix`:
   - VPC: `"${local.name_prefix}-vpc"`
   - Subnet: `"${local.name_prefix}-subnet"`
   - Instance: `"${local.name_prefix}-server"`

3. Merge common tags with resource-specific tags:
```hcl
tags = merge(local.common_tags, {
  Name = "${local.name_prefix}-server"
})
```

Apply and check the tags in the AWS console -- every resource should have consistent tagging.

---

##### Task 6: Built-in Functions and Conditional Expressions
Practice these in `terraform console`:
```bash
terraform console
```

1. **String functions:**
   - `upper("terraweek")` -> `"TERRAWEEK"`
   - `join("-", ["terra", "week", "2026"])` -> `"terra-week-2026"`
   - `format("arn:aws:s3:::%s", "my-bucket")`

2. **Collection functions:**
   - `length(["a", "b", "c"])` -> `3`
   - `lookup({dev = "t2.micro", prod = "t3.small"}, "dev")` -> `"t2.micro"`
   - `toset(["a", "b", "a"])` -> removes duplicates

3. **Networking function:**
   - `cidrsubnet("10.0.0.0/16", 8, 1)` -> `"10.0.1.0/24"`

4. **Conditional expression** -- add this to your config:
```hcl
instance_type = var.environment == "prod" ? "t3.small" : "t2.micro"
```

Apply with `environment = "prod"` and verify the instance type changes.

**Document:** Pick five functions you find most useful and explain what each does.

---

#### Hints
- `terraform.tfvars` is loaded automatically. Any other `.tfvars` file needs `-var-file`
- Variable precedence (low to high): default -> `terraform.tfvars` -> `*.auto.tfvars` -> `-var-file` -> `-var` flag -> `TF_VAR_*` env vars
- `terraform console` is an interactive REPL for testing expressions and functions
- Data sources are read-only -- they fetch information, they don't create resources
- `merge()` combines two maps -- great for tags
- `terraform output -json` is useful when piping output into other scripts

---

#### Documentation
Create `day-63-variables-outputs.md` with:
- Your `variables.tf` with all variable types
- Both `.tfvars` files (dev and prod)
- Screenshot of outputs after `terraform apply`
- Explanation of variable precedence with examples
- Five built-in functions you found most useful
- The difference between `variable`, `local`, `output`, and `data`

---

#### Submission
1. Add `day-63-variables-outputs.md` to `2026/day-63/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Made my Terraform configs fully dynamic today -- variables for every environment, data sources for AMI lookups, locals for consistent tagging, and conditional expressions for environment-specific sizing. Zero hardcoded values."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 63: Gitleaks & Pre-commit Hooks (Secret Scanning)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Secret scanning for your DevOps repos using Gitleaks, with pre-commit + Jenkins integration.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [examples/bad_secrets.env](files/hands-on-projects/examples/bad_secrets.env)
- [gitleaks.toml](files/hands-on-projects/gitleaks.toml)
- [scripts/scan.sh](files/hands-on-projects/scripts/scan.sh)


---

[← Day 62](../day-62/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 64 →](../day-64/README.md)
