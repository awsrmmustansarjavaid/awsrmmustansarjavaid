# Day 64 — Ansible: Introduction, Inventory & Ad-hoc Commands

[← Day 63](../day-63/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 65 →](../day-65/README.md)

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

- [ ] Explain agentless configuration management
- [ ] Build static and dynamic inventories
- [ ] Run ad-hoc commands and understand idempotency

## 2. Prerequisites

- Days 11, 53 (SSH, EC2).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why Ansible

Agentless (SSH/WinRM), YAML playbooks, idempotent modules, huge collection ecosystem. Terraform provisions; Ansible configures - they complement each other.

### 3.2 Inventory

INI/YAML files grouping hosts (`[web]`, `[db]`), group vars, host vars, patterns (`web:!staging`), dynamic inventory plugins (aws_ec2).

### 3.3 Ad-hoc and config

`ansible all -m ping`, `-m command`, `-m apt -b`; `ansible.cfg`, `ansible-inventory --graph`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Ansible in a venv (`pipx install ansible-core`).
2. [ ] Create 2 target hosts (containers/VMs/EC2).
3. [ ] Write `inventory.yml` with groups and vars.
4. [ ] Run `ansible all -m ping` and `-m setup` to read facts.
5. [ ] Install nginx on `web` group via ad-hoc `apt` with `-b`.

## 5. Real-World Scenario

> You must patch 40 servers tonight. Show how one Ansible command verifies reachability and OS versions across all of them.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
pipx install --include-deps ansible
ansible-inventory -i inventory.yml --graph
ansible all -i inventory.yml -m ping
ansible web -i inventory.yml -m apt -a "name=nginx state=present update_cache=yes" -b
ansible all -m setup -a 'filter=ansible_distribution*'
# inventory.yml
all: { children: { web: { hosts: { web1: { ansible_host: 10.0.1.10 } } }, db: { hosts: { db1: { ansible_host: 10.0.2.10 } } } }, vars: { ansible_user: deploy } }
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 64 -- Terraform State Management and Remote Backends — Challenge Brief

#### Task
The state file is the single most important thing in Terraform. It is the source of truth -- the map between your `.tf` files and what actually exists in the cloud. Lose it and Terraform forgets everything. Corrupt it and your next apply could destroy production.

Today you learn to manage state like a professional -- remote backends, locking, importing existing resources, and handling drift.

---

#### Expected Output
- Terraform state migrated from local to S3 remote backend with DynamoDB locking
- An existing AWS resource imported into Terraform state
- State drift simulated and reconciled
- A markdown file: `day-64-state-management.md`

---

#### Challenge Tasks

##### Task 1: Inspect Your Current State
Use your Day 63 config (or create a small config with a VPC and EC2 instance). Apply it and then explore the state:

```bash
terraform show                                    # Full state in human-readable format
terraform state list                              # All resources tracked by Terraform
terraform state show aws_instance.<name>          # Every attribute of the instance
terraform state show aws_vpc.<name>               # Every attribute of the VPC
```

Answer:
1. How many resources does Terraform track?
2. What attributes does the state store for an EC2 instance? (hint: way more than what you defined)
3. Open `terraform.tfstate` in an editor -- find the `serial` number. What does it represent?

---

##### Task 2: Set Up S3 Remote Backend
Storing state locally is dangerous -- one deleted file and you lose everything. Time to move it to S3.

1. First, create the backend infrastructure (do this manually or in a separate Terraform config):
```bash
# Create S3 bucket for state storage
aws s3api create-bucket \
  --bucket terraweek-state-<yourname> \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

# Enable versioning (so you can recover previous state)
aws s3api put-bucket-versioning \
  --bucket terraweek-state-<yourname> \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name terraweek-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-south-1
```

2. Add the backend block to your Terraform config:
```hcl
terraform {
  backend "s3" {
    bucket         = "terraweek-state-<yourname>"
    key            = "dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraweek-state-lock"
    encrypt        = true
  }
}
```

3. Run:
```bash
terraform init
```
Terraform will ask: "Do you want to copy existing state to the new backend?" -- say yes.

4. Verify:
   - Check the S3 bucket -- you should see `dev/terraform.tfstate`
   - Your local `terraform.tfstate` should now be empty or gone
   - Run `terraform plan` -- it should show no changes (state migrated correctly)

---

##### Task 3: Test State Locking
State locking prevents two people from running `terraform apply` at the same time and corrupting the state.

1. Open **two terminals** in the same project directory
2. In Terminal 1, run:
```bash
terraform apply
```
3. While Terminal 1 is waiting for confirmation, in Terminal 2 run:
```bash
terraform plan
```
4. Terminal 2 should show a **lock error** with a Lock ID

**Document:** What is the error message? Why is locking critical for team environments?

5. After the test, if you get stuck with a stale lock:
```bash
terraform force-unlock <LOCK_ID>
```

---

##### Task 4: Import an Existing Resource
Not everything starts with Terraform. Sometimes resources already exist in AWS and you need to bring them under Terraform management.

1. Manually create an S3 bucket in the AWS console -- name it `terraweek-import-test-<yourname>`
2. Write a `resource "aws_s3_bucket"` block in your config for this bucket (just the bucket name, nothing else)
3. Import it:
```bash
terraform import aws_s3_bucket.imported terraweek-import-test-<yourname>
```
4. Run `terraform plan`:
   - If you see "No changes" -- the import was perfect
   - If you see changes -- your config does not match reality. Update your config to match, then plan again until you get "No changes"

5. Run `terraform state list` -- the imported bucket should now appear alongside your other resources

**Document:** What is the difference between `terraform import` and creating a resource from scratch?

---

##### Task 5: State Surgery -- mv and rm
Sometimes you need to rename a resource or remove it from state without destroying it in AWS.

1. **Rename a resource in state:**
```bash
terraform state list                              # Note the current resource names
terraform state mv aws_s3_bucket.imported aws_s3_bucket.logs_bucket
```
Update your `.tf` file to match the new name. Run `terraform plan` -- it should show no changes.

2. **Remove a resource from state (without destroying it):**
```bash
terraform state rm aws_s3_bucket.logs_bucket
```
Run `terraform plan` -- Terraform no longer knows about the bucket, but it still exists in AWS.

3. **Re-import it** to bring it back:
```bash
terraform import aws_s3_bucket.logs_bucket terraweek-import-test-<yourname>
```

**Document:** When would you use `state mv` in a real project? When would you use `state rm`?

---

##### Task 6: Simulate and Fix State Drift
State drift happens when someone changes infrastructure outside of Terraform -- through the AWS console, CLI, or another tool.

1. Apply your full config so everything is in sync
2. Go to the **AWS console** and manually:
   - Change the Name tag of your EC2 instance to `"ManuallyChanged"`
   - Change the instance type if it's stopped (or add a new tag)
3. Run:
```bash
terraform plan
```
You should see a **diff** -- Terraform detects that reality no longer matches the desired state.

4. You have two choices:
   - **Option A:** Run `terraform apply` to force reality back to match your config (reconcile)
   - **Option B:** Update your `.tf` files to match the manual change (accept the drift)

5. Choose Option A -- apply and verify the tags are restored.

6. Run `terraform plan` again -- it should show "No changes." Drift resolved.

**Document:** How do teams prevent state drift in production? (hint: restrict console access, use CI/CD for all changes)

---

#### Hints
- S3 bucket names must be globally unique
- DynamoDB table must have a `LockID` string key -- this is what Terraform uses for locking
- `terraform init -migrate-state` explicitly triggers state migration
- `terraform refresh` (or `terraform apply -refresh-only`) updates state to match real infrastructure without making changes
- State locking only works with backends that support it (S3+DynamoDB, Consul, Terraform Cloud)
- `terraform force-unlock` should only be used when you are sure no other operation is running
- Always version your S3 bucket so you can recover a previous state file if something goes wrong

---

#### Documentation
Create `day-64-state-management.md` with:
- Diagram: local state vs remote state setup
- Screenshot of state file in S3 bucket
- Screenshot of the lock error from Task 3
- Steps you followed for `terraform import` and the result
- Explanation of state drift with your real example
- When to use: `state mv`, `state rm`, `import`, `force-unlock`, `refresh`

---

#### Submission
1. Add `day-64-state-management.md` to `2026/day-64/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Mastered Terraform state today -- migrated to S3 remote backend with DynamoDB locking, imported existing AWS resources, performed state surgery, and simulated drift. State management is the foundation of reliable infrastructure as code."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 64 — Terraform State Management and Remote Backends — Notes & Solution

**Challenge:** TerraWeek | 90DaysOfDevOps  
**Cloud Provider:** AWS  
**Region:** ap-south-1

#### 1. Objective

The objective of this task was to understand Terraform state management, configure a remote backend using Amazon S3, explore state locking, import existing resources, perform state operations, and detect and resolve infrastructure drift.

#### 2. Local State vs. Remote State Architecture

##### Local State

```text
Developer Machine
       |
       v
Terraform Configuration (.tf)
       |
       v
Local terraform.tfstate
       |
       v
AWS Infrastructure
```

In local state management, Terraform stores the state file on the local machine. This can be risky because the file may be lost, damaged, or unavailable to other team members.

##### Remote State

```text
Developer / CI-CD Pipeline
          |
          v
   Terraform Commands
          |
          v
   Amazon S3 Backend
   - Remote State File
   - Encryption
   - Versioning
          |
          v
  DynamoDB Lock Table
          |
          v
    AWS Infrastructure
```

Remote state allows team members to work with shared infrastructure state. S3 versioning helps recover earlier state versions, while the configured locking mechanism helps prevent concurrent state modifications.

#### 3. Task 1 — Inspect Current State

Commands used:

```bash
terraform show
terraform state list
terraform state show aws_instance.<RESOURCE_NAME>
terraform state show aws_vpc.<RESOURCE_NAME>
```

##### Observations

- `terraform show` displays the current state in a readable format.
- `terraform state list` displays the resource addresses tracked by Terraform.
- `terraform state show` displays detailed attributes of a specific resource.
- The EC2 state can include attributes such as instance ID, AMI, instance type, availability zone, IP addresses, subnet ID, security groups, and tags.

**Number of resources tracked:** [Add your actual resource count]

**State serial number:** The serial number represents the revision of the Terraform state. It increases as state changes are recorded and helps Terraform identify newer state versions.

**Screenshot:** Add a screenshot of your `terraform state list` or `terraform show` output here.

#### 4. Task 2 — Configure S3 Remote Backend

##### Backend Infrastructure

The backend infrastructure consists of an S3 bucket for storing Terraform state and a DynamoDB table for state locking.

Example backend configuration:

```hcl
terraform {
  backend "s3" {
    bucket         = "REPLACE_WITH_YOUR_BUCKET_NAME"
    key            = "dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "REPLACE_WITH_YOUR_LOCK_TABLE"
    encrypt        = true
  }
}
```

Replace the placeholder values with your actual AWS resource names. Terraform backend blocks do not accept ordinary input variables.

##### Migration Commands

```bash
terraform init -migrate-state
terraform plan
```

During initialization, Terraform asks whether to migrate the existing local state to the remote backend. After verifying the backend configuration, select `yes` to copy the state.

##### Verification

- Confirm that the state object exists in the S3 bucket.
- Verify that S3 bucket versioning is enabled.
- Run `terraform plan` to check whether the configuration and infrastructure are synchronized.

**Result:** [Add your actual migration and plan results]

**Screenshot:** Add a screenshot showing `dev/terraform.tfstate` in your S3 bucket. Do not share the contents of the state file publicly.

#### 5. Task 3 — Test State Locking

Commands:

```bash
terraform apply
```

While the first Terraform operation is holding the lock, try running the following command in another terminal:

```bash
terraform plan
```

##### Observation

Terraform should report that the state is locked if the first operation is actively holding a lock and the backend locking mechanism is configured correctly.

**Actual error message:** [Paste your observed lock error here]

##### Why Is State Locking Important?

State locking prevents multiple Terraform operations from modifying the same state simultaneously. Without locking, concurrent operations can cause state inconsistencies and infrastructure management problems.

**Important:** Use `terraform force-unlock <LOCK_ID>` only after confirming that the original operation has stopped and the lock is genuinely stale.

**Screenshot:** Add your actual lock-error screenshot here.

#### 6. Task 4 — Import an Existing AWS Resource

Terraform can manage resources that were created manually in AWS.

Example configuration:

```hcl
resource "aws_s3_bucket" "imported" {
  bucket = "REPLACE_WITH_YOUR_EXISTING_BUCKET_NAME"
}
```

Import the existing bucket:

```bash
terraform import aws_s3_bucket.imported REPLACE_WITH_YOUR_EXISTING_BUCKET_NAME
```

Verify the resource:

```bash
terraform state list
terraform plan
```

##### Difference Between Import and Creating a Resource

- **Import:** Associates an existing AWS resource with a Terraform resource address in the state.
- **Create:** Terraform provisions a new resource based on the configuration.

Importing does not automatically generate a complete configuration or guarantee that the plan will show no changes. The configuration must match the existing resource.

**Result:** [Add your actual import and plan output]

**Screenshot:** Add the successful import output here.

#### 7. Task 5 — State Surgery

##### Rename a Resource

```bash
terraform state mv aws_s3_bucket.imported aws_s3_bucket.logs_bucket
```

Update the Terraform configuration to use the new resource name and run:

```bash
terraform plan
```

##### Remove a Resource from State

```bash
terraform state rm aws_s3_bucket.logs_bucket
```

This removes the resource from Terraform state without deleting the actual AWS resource.

Re-import it when required:

```bash
terraform import aws_s3_bucket.logs_bucket REPLACE_WITH_YOUR_EXISTING_BUCKET_NAME
```

##### When Should These Commands Be Used?

- **`terraform state mv`:** Used when renaming a resource address or moving a resource to another address without recreating the real infrastructure.
- **`terraform state rm`:** Used when Terraform should stop tracking a resource without destroying it in AWS.
- **`terraform import`:** Used to bring an existing resource under Terraform state management.

Always review the plan after state operations. Removing a resource from state while leaving its resource block in the configuration can cause Terraform to propose creating another resource.

#### 8. Task 6 — Simulate and Fix State Drift

##### What Is State Drift?

State drift occurs when someone changes infrastructure outside Terraform, such as through the AWS Console or AWS CLI.

##### Steps

1. Apply the Terraform configuration so the infrastructure is synchronized.
2. Change the EC2 instance's Name tag manually in the AWS Console to `ManuallyChanged`.
3. Run:

```bash
terraform plan
```

4. Review the detected differences.
5. Restore the desired configuration by running:

```bash
terraform apply
terraform plan
```

##### Expected Result

Terraform should restore the EC2 tag to the value defined in the configuration. After reconciliation, the next plan should report `No changes` if all managed resources are synchronized.

**Actual change made:** [Describe the change you performed]

**Actual result:** [Add the final plan output]

**Screenshots:** Add the drift detection plan and final verification screenshot here.

##### How Teams Prevent Drift in Production

1. Restrict direct AWS Console changes using least-privilege IAM permissions.
2. Manage infrastructure changes through reviewed Terraform code and CI/CD pipelines.
3. Run regular Terraform plans and drift-detection checks.
4. Store state remotely with controlled access and appropriate versioning.
5. Review plans before applying changes.
6. Document emergency changes and update the Terraform configuration when necessary.

#### 9. Important Terraform Commands

| Command | Purpose |
|---|---|
| `terraform show` | Displays state or saved plan details |
| `terraform state list` | Lists tracked resources |
| `terraform state show ADDRESS` | Shows resource attributes |
| `terraform init -migrate-state` | Migrates existing state to a new backend |
| `terraform plan` | Compares configuration with infrastructure |
| `terraform import ADDRESS ID` | Imports an existing resource into state |
| `terraform state mv SOURCE DESTINATION` | Changes a resource address in state |
| `terraform state rm ADDRESS` | Removes a resource from state without destroying it |
| `terraform apply -refresh-only` | Updates state based on observed infrastructure |
| `terraform force-unlock LOCK_ID` | Removes a confirmed stale lock |

#### 10. Key Learnings

- Terraform state is essential for tracking real infrastructure.
- Remote backends improve collaboration and reduce the risk of losing local state.
- S3 versioning provides a way to recover earlier state versions.
- State locking helps prevent concurrent operations from corrupting shared state.
- Importing existing resources makes infrastructure management through Terraform possible.
- State surgery changes Terraform's resource tracking without inherently creating or deleting AWS resources.
- Drift detection helps identify and reconcile differences between configuration and actual infrastructure.

#### 11. Completion Checklist

- [ ] Inspected Terraform state and recorded the resource count.
- [ ] Configured the S3 remote backend.
- [ ] Verified S3 state storage and bucket versioning.
- [ ] Tested state locking and captured the actual error.
- [ ] Imported an existing AWS resource.
- [ ] Practiced `terraform state mv` and `terraform state rm`.
- [ ] Simulated and reconciled state drift.
- [ ] Added screenshots and actual command outputs.
- [ ] Verified that no credentials, private keys, or sensitive state files are included.

#### 12. GitHub Submission

Save the documentation as:

`2026/day-64/day-64-state-management.md`

From the repository root, run:

```bash
git add 2026/day-64/day-64-state-management.md
git commit -m "docs: add Day 64 Terraform state management"
git push
```

Before pushing, verify that `.terraform/`, local Terraform state files, credentials, and private keys are excluded from Git.

#### Learn in Public

Mastered Terraform state management concepts today as part of #90DaysOfDevOps!

Learned about remote state with Amazon S3, state locking, importing existing AWS resources, state surgery, and detecting and reconciling infrastructure drift.

Every day is an opportunity to learn, build, and improve my DevOps skills.

#90DaysOfDevOps #TerraWeek #DevOpsKaJosh #TrainWithShubham

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create `ansible.cfg` with sane defaults. | You can demonstrate, without notes: *explain agentless configuration management* — with evidence committed to `day-64/`. |
| 2 | Write a note: idempotent vs non-idempotent modules (`command` vs `apt`). | You can demonstrate, without notes: *build static and dynamic inventories* — with evidence committed to `day-64/`. |
| 3 | Use `--check --diff`. | You can demonstrate, without notes: *run ad-hoc commands and understand idempotency* — with evidence committed to `day-64/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `UNREACHABLE` SSH error | Key/user/host key/security group; test plain `ssh` first. |
| `Permission denied` on install | Add `-b` (become) and sudo rights. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use SSH keys, avoid `host_key_checking=False` in prod, least-privilege sudo, Vault for secrets.
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

1. Agentless meaning?
2. What is idempotency?
3. What is an inventory?
4. Ansible vs Terraform?
5. **Scenario:** You must patch 40 servers tonight. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run ad-hoc commands? | ☐ | ☐ | ☐ | ☐ |
| Can I read facts? | ☐ | ☐ | ☐ | ☐ |
| Can I group hosts? | ☐ | ☐ | ☐ | ☐ |
| Explain agentless configuration management | ☐ | ☐ | ☐ | ☐ |
| Build static and dynamic inventories | ☐ | ☐ | ☐ | ☐ |
| Run ad-hoc commands and understand idempotency | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-64/` in your own repository:

```text
day-64/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-64
git add day-64/
git commit -m "day-64: ansible"
git push -u origin day-64
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

## 18. Challenge Notes — Day 64: Network Security WAF, Shield, NACLs

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 64** of the DevOps 90-Day Challenge!
Today, we focus on **Network Security**. It's not enough to lock the door (IAM); you also need a fence around the house. We will explore **WAF** (Web Application Firewall), **Shield**, and **NACLs**.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Protect your web apps from common attacks (SQL Injection, XSS) using **AWS WAF**.
* Understand **DDoS Protection** with **AWS Shield**.
* Configure **Network ACLs** for subnet-level security.
* Compare **Security Groups** vs **NACLs**.

---

#### Tools Used

* **AWS WAF**
* **AWS Shield** (Standard vs Advanced)
* **VPC** (NACLs & Security Groups)

---

#### Key Concepts

##### 1. AWS WAF
A firewall that inspects HTTP/HTTPS traffic. You attach it to CloudFront, ALB, or API Gateway.
*   **Rules**: "Block requests from IP 1.2.3.4" or "Block requests containing `SELECT * FROM`".
*   **Managed Rules**: Pre-configured rulesets from AWS (e.g., OWASP Top 10).

##### 2. AWS Shield
*   **Standard**: Free. Protects against common L3/L4 DDoS attacks (SYN floods). Automatically enabled.
*   **Advanced**: Paid ($3k/month). Protects against sophisticated attacks and provides access to the DDoS Response Team (DRT).

##### 3. NACL vs Security Group
*   **Security Group**: Stateful. Applied to Instance. Allow rules only.
*   **NACL**: Stateless. Applied to Subnet. Allow **and Deny** rules. (Use this to block specific IPs).

---

#### Key Concepts Applied

| Concept | Application |
| :--- | :--- |
| **IP Set** | Creating a list of "Bad IPs" and blocking them in WAF. |
| **Rate Limiting** | Blocking any IP that sends more than 100 requests in 5 minutes. |
| **Subnet Isolation** | Using NACLs to prevent the Database Subnet from accessing the Internet directly. |

---

#### Bonus (Extra Learning)

*   Simulate an **SQL Injection** attack on your test app and watch WAF block it.
*   Enable **WAF Logging** to analyze blocked requests in CloudWatch Logs.

---

#### Congratulations!

You’ve built a fortress around your application! Network security is the first line of defense against external threats.

---

#### Try These Next

*   Deploy a **Honeypot** using WAF triggers (if someone hits `/admin.php`, block their IP).
*   Review your VPC Flow Logs to see accepted/rejected traffic.

## 19. Cohort Practice — Day 64: Terraform State Management and Remote Backends

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
The state file is the single most important thing in Terraform. It is the source of truth -- the map between your `.tf` files and what actually exists in the cloud. Lose it and Terraform forgets everything. Corrupt it and your next apply could destroy production.

Today you learn to manage state like a professional -- remote backends, locking, importing existing resources, and handling drift.

---

#### Expected Output
- Terraform state migrated from local to S3 remote backend with DynamoDB locking
- An existing AWS resource imported into Terraform state
- State drift simulated and reconciled
- A markdown file: `day-64-state-management.md`

---

#### Challenge Tasks

##### Task 1: Inspect Your Current State
Use your Day 63 config (or create a small config with a VPC and EC2 instance). Apply it and then explore the state:

```bash
terraform show                                    # Full state in human-readable format
terraform state list                              # All resources tracked by Terraform
terraform state show aws_instance.<name>          # Every attribute of the instance
terraform state show aws_vpc.<name>               # Every attribute of the VPC
```

Answer:
1. How many resources does Terraform track?
2. What attributes does the state store for an EC2 instance? (hint: way more than what you defined)
3. Open `terraform.tfstate` in an editor -- find the `serial` number. What does it represent?

---

##### Task 2: Set Up S3 Remote Backend
Storing state locally is dangerous -- one deleted file and you lose everything. Time to move it to S3.

1. First, create the backend infrastructure (do this manually or in a separate Terraform config):
```bash
# Create S3 bucket for state storage
aws s3api create-bucket \
  --bucket terraweek-state-<yourname> \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

# Enable versioning (so you can recover previous state)
aws s3api put-bucket-versioning \
  --bucket terraweek-state-<yourname> \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name terraweek-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-south-1
```

2. Add the backend block to your Terraform config:
```hcl
terraform {
  backend "s3" {
    bucket         = "terraweek-state-<yourname>"
    key            = "dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraweek-state-lock"
    encrypt        = true
  }
}
```

3. Run:
```bash
terraform init
```
Terraform will ask: "Do you want to copy existing state to the new backend?" -- say yes.

4. Verify:
   - Check the S3 bucket -- you should see `dev/terraform.tfstate`
   - Your local `terraform.tfstate` should now be empty or gone
   - Run `terraform plan` -- it should show no changes (state migrated correctly)

---

##### Task 3: Test State Locking
State locking prevents two people from running `terraform apply` at the same time and corrupting the state.

1. Open **two terminals** in the same project directory
2. In Terminal 1, run:
```bash
terraform apply
```
3. While Terminal 1 is waiting for confirmation, in Terminal 2 run:
```bash
terraform plan
```
4. Terminal 2 should show a **lock error** with a Lock ID

**Document:** What is the error message? Why is locking critical for team environments?

5. After the test, if you get stuck with a stale lock:
```bash
terraform force-unlock <LOCK_ID>
```

---

##### Task 4: Import an Existing Resource
Not everything starts with Terraform. Sometimes resources already exist in AWS and you need to bring them under Terraform management.

1. Manually create an S3 bucket in the AWS console -- name it `terraweek-import-test-<yourname>`
2. Write a `resource "aws_s3_bucket"` block in your config for this bucket (just the bucket name, nothing else)
3. Import it:
```bash
terraform import aws_s3_bucket.imported terraweek-import-test-<yourname>
```
4. Run `terraform plan`:
   - If you see "No changes" -- the import was perfect
   - If you see changes -- your config does not match reality. Update your config to match, then plan again until you get "No changes"

5. Run `terraform state list` -- the imported bucket should now appear alongside your other resources

**Document:** What is the difference between `terraform import` and creating a resource from scratch?

---

##### Task 5: State Surgery -- mv and rm
Sometimes you need to rename a resource or remove it from state without destroying it in AWS.

1. **Rename a resource in state:**
```bash
terraform state list                              # Note the current resource names
terraform state mv aws_s3_bucket.imported aws_s3_bucket.logs_bucket
```
Update your `.tf` file to match the new name. Run `terraform plan` -- it should show no changes.

2. **Remove a resource from state (without destroying it):**
```bash
terraform state rm aws_s3_bucket.logs_bucket
```
Run `terraform plan` -- Terraform no longer knows about the bucket, but it still exists in AWS.

3. **Re-import it** to bring it back:
```bash
terraform import aws_s3_bucket.logs_bucket terraweek-import-test-<yourname>
```

**Document:** When would you use `state mv` in a real project? When would you use `state rm`?

---

##### Task 6: Simulate and Fix State Drift
State drift happens when someone changes infrastructure outside of Terraform -- through the AWS console, CLI, or another tool.

1. Apply your full config so everything is in sync
2. Go to the **AWS console** and manually:
   - Change the Name tag of your EC2 instance to `"ManuallyChanged"`
   - Change the instance type if it's stopped (or add a new tag)
3. Run:
```bash
terraform plan
```
You should see a **diff** -- Terraform detects that reality no longer matches the desired state.

4. You have two choices:
   - **Option A:** Run `terraform apply` to force reality back to match your config (reconcile)
   - **Option B:** Update your `.tf` files to match the manual change (accept the drift)

5. Choose Option A -- apply and verify the tags are restored.

6. Run `terraform plan` again -- it should show "No changes." Drift resolved.

**Document:** How do teams prevent state drift in production? (hint: restrict console access, use CI/CD for all changes)

---

#### Hints
- S3 bucket names must be globally unique
- DynamoDB table must have a `LockID` string key -- this is what Terraform uses for locking
- `terraform init -migrate-state` explicitly triggers state migration
- `terraform refresh` (or `terraform apply -refresh-only`) updates state to match real infrastructure without making changes
- State locking only works with backends that support it (S3+DynamoDB, Consul, Terraform Cloud)
- `terraform force-unlock` should only be used when you are sure no other operation is running
- Always version your S3 bucket so you can recover a previous state file if something goes wrong

---

#### Documentation
Create `day-64-state-management.md` with:
- Diagram: local state vs remote state setup
- Screenshot of state file in S3 bucket
- Screenshot of the lock error from Task 3
- Steps you followed for `terraform import` and the result
- Explanation of state drift with your real example
- When to use: `state mv`, `state rm`, `import`, `force-unlock`, `refresh`

---

#### Submission
1. Add `day-64-state-management.md` to `2026/day-64/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Mastered Terraform state today -- migrated to S3 remote backend with DynamoDB locking, imported existing AWS resources, performed state surgery, and simulated drift. State management is the foundation of reliable infrastructure as code."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 64: IAM Least Privilege

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

This module teaches AWS IAM least privilege by comparing **bad** (over-permissive) and **good** IAM policies.

Includes:
- Example IAM policies
- A policy validator that flags wildcards
- Jenkins pipeline to enforce least privilege

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [examples/bad_policy.json](files/hands-on-projects/examples/bad_policy.json)
- [examples/good_policy.json](files/hands-on-projects/examples/good_policy.json)
- [scripts/validate.py](files/hands-on-projects/scripts/validate.py)


---

[← Day 63](../day-63/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 65 →](../day-65/README.md)
