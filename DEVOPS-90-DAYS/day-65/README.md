# Day 65 — Ansible Playbooks, Modules, Handlers & Idempotency

[← Day 64](../day-64/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 66 →](../day-66/README.md)

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

- [ ] Write multi-task playbooks
- [ ] Use handlers, tags, check mode and error handling
- [ ] Lint playbooks with ansible-lint

## 2. Prerequisites

- Day 64.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Playbook anatomy

Plays map hosts to tasks; tasks call modules with arguments; `become`, `vars`, `tags`, `when`, `register`, `notify`/handlers (run once at end if changed).

### 3.2 Core modules

`apt/dnf`, `package`, `copy`, `template`, `file`, `user`, `service/systemd`, `lineinfile`, `git`, `get_url`, `uri`, `command` (last resort).

### 3.3 Safe execution

`--check --diff`, `serial` for rolling updates, `block/rescue/always`, `any_errors_fatal`, `ansible-lint`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `webserver.yml`: install nginx, deploy index, enable service, handler to reload.
2. [ ] Run twice; confirm second run shows `changed=0`.
3. [ ] Use `--check --diff` before applying.
4. [ ] Add a `block/rescue` that rolls back config on failure.
5. [ ] Run `ansible-lint` and fix warnings.

## 5. Real-World Scenario

> Rolling-update 20 web servers 2 at a time, stop automatically if health check fails.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
- hosts: web
  become: true
  serial: 2
  tasks:
    - name: Install nginx
      ansible.builtin.apt: { name: nginx, state: present, update_cache: true }
    - name: Deploy config
      ansible.builtin.template: { src: nginx.conf.j2, dest: /etc/nginx/nginx.conf, validate: 'nginx -t -c %s' }
      notify: Reload nginx
    - name: Health check
      ansible.builtin.uri: { url: http://localhost, status_code: 200 }
  handlers:
    - name: Reload nginx
      ansible.builtin.service: { name: nginx, state: reloaded }
ansible-playbook webserver.yml --check --diff && ansible-lint
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 65 -- Terraform Modules: Build Reusable Infrastructure — Challenge Brief

#### Task
You have been writing everything in one big `main.tf` file. That works for learning, but in real teams you manage dozens of environments with hundreds of resources. Copy-pasting configs across projects is a recipe for disaster.

Today you learn Terraform modules -- the way to package, reuse, and share infrastructure code. Think of modules as functions in programming. Write once, call many times.

---

#### Expected Output
- A custom EC2 module you built from scratch
- A custom security group module wired into the EC2 module
- A VPC created using the official public registry module
- A markdown file: `day-65-modules.md`

---

#### Challenge Tasks

##### Task 1: Understand Module Structure
A Terraform module is just a directory with `.tf` files. Create this structure:

```
terraform-modules/
  main.tf                    # Root module -- calls child modules
  variables.tf               # Root variables
  outputs.tf                 # Root outputs
  providers.tf               # Provider config
  modules/
    ec2-instance/
      main.tf                # EC2 resource definition
      variables.tf           # Module inputs
      outputs.tf             # Module outputs
    security-group/
      main.tf                # Security group resource definition
      variables.tf           # Module inputs
      outputs.tf             # Module outputs
```

Create all the directories and empty files. This is the standard layout every Terraform project follows.

**Document:** What is the difference between a "root module" and a "child module"?

---

##### Task 2: Build a Custom EC2 Module
Create `modules/ec2-instance/`:

1. **`variables.tf`** -- define inputs:
   - `ami_id` (string)
   - `instance_type` (string, default: `"t2.micro"`)
   - `subnet_id` (string)
   - `security_group_ids` (list of strings)
   - `instance_name` (string)
   - `tags` (map of strings, default: `{}`)

2. **`main.tf`** -- define the resource:
   - `aws_instance` using all the variables
   - Merge the Name tag with additional tags

3. **`outputs.tf`** -- expose:
   - `instance_id`
   - `public_ip`
   - `private_ip`

Do NOT apply yet -- just write the module.

---

##### Task 3: Build a Custom Security Group Module
Create `modules/security-group/`:

1. **`variables.tf`** -- define inputs:
   - `vpc_id` (string)
   - `sg_name` (string)
   - `ingress_ports` (list of numbers, default: `[22, 80]`)
   - `tags` (map of strings, default: `{}`)

2. **`main.tf`** -- define the resource:
   - `aws_security_group` in the given VPC
   - Use `dynamic "ingress"` block to create rules from the `ingress_ports` list
   - Allow all egress

3. **`outputs.tf`** -- expose:
   - `sg_id`

This is your first time using a `dynamic` block -- it loops over a list to generate repeated nested blocks.

---

##### Task 4: Call Your Modules from Root
In the root `main.tf`, wire everything together:

1. Create a VPC and subnet directly (or reuse your Day 62 config)
2. Call the security group module:
```hcl
module "web_sg" {
  source        = "./modules/security-group"
  vpc_id        = aws_vpc.main.id
  sg_name       = "terraweek-web-sg"
  ingress_ports = [22, 80, 443]
  tags          = local.common_tags
}
```

3. Call the EC2 module -- deploy **two instances** with different names using the same module:
```hcl
module "web_server" {
  source             = "./modules/ec2-instance"
  ami_id             = data.aws_ami.amazon_linux.id
  instance_type      = "t2.micro"
  subnet_id          = aws_subnet.public.id
  security_group_ids = [module.web_sg.sg_id]
  instance_name      = "terraweek-web"
  tags               = local.common_tags
}

module "api_server" {
  source             = "./modules/ec2-instance"
  ami_id             = data.aws_ami.amazon_linux.id
  instance_type      = "t2.micro"
  subnet_id          = aws_subnet.public.id
  security_group_ids = [module.web_sg.sg_id]
  instance_name      = "terraweek-api"
  tags               = local.common_tags
}
```

4. Add root outputs that reference module outputs:
```hcl
output "web_server_ip" {
  value = module.web_server.public_ip
}

output "api_server_ip" {
  value = module.api_server.public_ip
}
```

5. Apply:
```bash
terraform init    # Downloads/links the local modules
terraform plan    # Should show all resources from both module calls
terraform apply
```

**Verify:** Two EC2 instances running, same security group, different names. Check the AWS console.

---

##### Task 5: Use a Public Registry Module
Instead of building your own VPC from scratch, use the official module from the Terraform Registry.

1. Replace your hand-written VPC resources with:
```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "terraweek-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]

  enable_nat_gateway = false
  enable_dns_hostnames = true

  tags = local.common_tags
}
```

2. Update your EC2 and SG module calls to reference `module.vpc.vpc_id` and `module.vpc.public_subnets[0]`

3. Run:
```bash
terraform init     # Downloads the registry module
terraform plan
terraform apply
```

4. Compare: how many resources did the VPC module create vs your hand-written VPC from Day 62?

**Document:** Where does Terraform download registry modules to? Check `.terraform/modules/`.

---

##### Task 6: Module Versioning and Best Practices
1. Pin your registry module version explicitly:
   - `version = "5.1.0"` -- exact version
   - `version = "~> 5.0"` -- any 5.x version
   - `version = ">= 5.0, < 6.0"` -- range

2. Run `terraform init -upgrade` to check for newer versions

3. Check the state to see how modules appear:
```bash
terraform state list
```
Notice the `module.vpc.`, `module.web_server.`, `module.web_sg.` prefixes.

4. Destroy everything:
```bash
terraform destroy
```

**Document:** Write down five module best practices:
- Always pin versions for registry modules
- Keep modules focused -- one concern per module
- Use variables for everything, hardcode nothing
- Always define outputs so callers can reference resources
- Add a README.md to every custom module

---

#### Hints
- `terraform init` must be re-run after adding a new module source
- Module outputs are accessed as `module.<name>.<output>`
- `dynamic` blocks use `content {}` inside to define the repeated block
- Registry modules document all inputs and outputs on registry.terraform.io
- Local modules use `source = "./modules/<name>"`, registry modules use `source = "<org>/<name>/<provider>"`
- `terraform get` downloads modules without full init

---

#### Documentation
Create `day-65-modules.md` with:
- Your custom module structure (directory tree)
- The `variables.tf`, `main.tf`, and `outputs.tf` for your EC2 module
- Root `main.tf` showing how you call both custom and registry modules
- Screenshot of both EC2 instances running from the same module
- Comparison: hand-written VPC vs registry VPC module (resources created)
- Five module best practices in your own words

---

#### Submission
1. Add `day-65-modules.md` to `2026/day-65/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Built my first custom Terraform modules today -- EC2 and security group modules called multiple times with different configs. Then replaced 50 lines of VPC code with one registry module. Modules are the key to scalable infrastructure as code."

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 65 -- Terraform Modules: Build Reusable Infrastructure — Notes & Solution

#### Task
You have been writing everything in one big `main.tf` file. That works for learning, but in real teams you manage dozens of environments with hundreds of resources. Copy-pasting configs across projects is a recipe for disaster.

Today you learn Terraform modules -- the way to package, reuse, and share infrastructure code. Think of modules as functions in programming. Write once, call many times.

---

#### Challenge Tasks

##### Task 1: Understand Module Structure
A Terraform module is just a directory with `.tf` files. Create this structure:

```
terraform-modules/
  main.tf                    # Root module -- calls child modules
  variables.tf               # Root variables
  outputs.tf                 # Root outputs
  providers.tf               # Provider config
  modules/
    ec2-instance/
      main.tf                # EC2 resource definition
      variables.tf           # Module inputs
      outputs.tf             # Module outputs
    security-group/
      main.tf                # Security group resource definition
      variables.tf           # Module inputs
      outputs.tf             # Module outputs
```

Create all the directories and empty files. This is the standard layout every Terraform project follows.

**Document:** What is the difference between a "root module" and a "child module"?

- `Root Module`
   - The root module is the main place where everything starts.
   - It’s the folder where you run Terraform commands

- `Child Module`
  - A child module is a smaller part used by the root module.
  - It does a specific task (like create a vpc, ec2, database)

---

##### Task 2: Build a Custom EC2 Module
Create `modules/ec2-instance/`:

1. **`variables.tf`** -- define inputs:
   - `ami_id` (string)
   - `instance_type` (string, default: `"t2.micro"`)
   - `subnet_id` (string)
   - `security_group_ids` (list of strings)
   - `instance_name` (string)
   - `tags` (map of strings, default: `{}`)

2. **`main.tf`** -- define the resource:
   - `aws_instance` using all the variables
   - Merge the Name tag with additional tags

3. **`outputs.tf`** -- expose:
   - `instance_id`
   - `public_ip`
   - `private_ip`

Do NOT apply yet -- just write the module.

---

##### Task 3: Build a Custom Security Group Module
Create `modules/security-group/`:

1. **`variables.tf`** -- define inputs:
   - `vpc_id` (string)
   - `sg_name` (string)
   - `ingress_ports` (list of numbers, default: `[22, 80]`)
   - `tags` (map of strings, default: `{}`)

2. **`main.tf`** -- define the resource:
   - `aws_security_group` in the given VPC
   - Use `dynamic "ingress"` block to create rules from the `ingress_ports` list
   - Allow all egress

3. **`outputs.tf`** -- expose:
   - `sg_id`

This is your first time using a `dynamic` block -- it loops over a list to generate repeated nested blocks.

---

##### Task 4: Call Your Modules from Root
In the root `main.tf`, wire everything together:

1. Create a VPC and subnet directly (or reuse your Day 62 config)
2. Call the security group module:
```hcl
module "web_sg" {
  source        = "./modules/security-group"
  vpc_id        = aws_vpc.main.id
  sg_name       = "terraweek-web-sg"
  ingress_ports = [22, 80, 443]
  tags          = local.common_tags
}
```

3. Call the EC2 module -- deploy **two instances** with different names using the same module:
```hcl
module "web_server" {
  source             = "./modules/ec2-instance"
  ami_id             = data.aws_ami.amazon_linux.id
  instance_type      = "t2.micro"
  subnet_id          = aws_subnet.public.id
  security_group_ids = [module.web_sg.sg_id]
  instance_name      = "terraweek-web"
  tags               = local.common_tags
}

module "api_server" {
  source             = "./modules/ec2-instance"
  ami_id             = data.aws_ami.amazon_linux.id
  instance_type      = "t2.micro"
  subnet_id          = aws_subnet.public.id
  security_group_ids = [module.web_sg.sg_id]
  instance_name      = "terraweek-api"
  tags               = local.common_tags
}
```

4. Add root outputs that reference module outputs:
```hcl
output "web_server_ip" {
  value = module.web_server.public_ip
}

output "api_server_ip" {
  value = module.api_server.public_ip
}
```

5. Apply:
```bash
terraform init    # Downloads/links the local modules
terraform plan    # Should show all resources from both module calls
terraform apply
```
<img width="1360" height="812" alt="Screenshot 2026-10-22 011556" src="https://github.com/user-attachments/assets/2d4bec8b-b5d7-41bf-9189-1149391427f2" />
<img width="1917" height="941" alt="Screenshot 2026-10-22 011700" src="https://github.com/user-attachments/assets/af4bac6b-fea0-464d-8e3b-549595f6b708" />

**Verify:** Two EC2 instances running, same security group, different names. Check the AWS console.
<img width="1916" height="732" alt="Screenshot 2026-10-22 011946" src="https://github.com/user-attachments/assets/362e10b1-3719-46e8-9054-a692029b45f2" />



---

##### Task 5: Use a Public Registry Module
Instead of building your own VPC from scratch, use the official module from the Terraform Registry.

1. Replace your hand-written VPC resources with:
```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "terraweek-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]

  enable_nat_gateway = false
  enable_dns_hostnames = true

  tags = local.common_tags
}
```

2. Update your EC2 and SG module calls to reference `module.vpc.vpc_id` and `module.vpc.public_subnets[0]`

3. Run:
```bash
terraform init     # Downloads the registry module
terraform plan
terraform apply
```
<img width="1917" height="871" alt="Screenshot 2026-10-22 012242" src="https://github.com/user-attachments/assets/62e02ad8-65b6-4afd-9ba4-b66a71854430" />


4. Compare: how many resources did the VPC module create vs your hand-written VPC from Day 62?

**Hand-written VPC (Day 62)**
- VPC `1`
- Subnet `1`
- Internet Gateway `1`
- Route Table  `1`
- Route Table Association `1`
- Security Group `1`
- Total = `6 resources`

**VPC Module Terraform Registry**
- VPC
  - aws_vpc.this `1`
- Default resources (auto-managed by module)
  - aws_default_network_acl.this `1`
  - aws_default_route_table.default `1`
- aws_default_security_group.this `1`
- Internet Gateway
  - aws_internet_gateway.this `1`
- Subnets `Public` `2` , `Private`  `2` `Total subnets` = `4`
- Route Tables Public `1` `Private` `2` ,`Total` = `3`
- Routes `aws_route.public_internet_gateway` `1`
- Route Table Associations `Public` `2` `Private` `2` `Total` = 4
- Total = `17`
  
**Document:** Where does Terraform download registry modules to? Check `.terraform/modules/`.

- `location` `.terraform/modules/`

---

##### Task 6: Module Versioning and Best Practices
1. Pin your registry module version explicitly:
   - `version = "5.1.0"` -- exact version
   - `version = "~> 5.0"` -- any 5.x version
   - `version = ">= 5.0, < 6.0"` -- range

2. Run `terraform init -upgrade` to check for newer versions

3. Check the state to see how modules appear:
```bash
terraform state list
```
Notice the `module.vpc.`, `module.web_server.`, `module.web_sg.` prefixes.

<img width="863" height="911" alt="Screenshot 2026-10-22 012358" src="https://github.com/user-attachments/assets/1dabe641-0a81-4701-87ad-1c6d2c0af9e2" />


4. Destroy everything:
```bash
terraform destroy
```
<img width="1741" height="1021" alt="Screenshot 2026-10-22 012542" src="https://github.com/user-attachments/assets/1fdd3cde-a71c-404c-b283-db90d08fbdc3" />
<img width="1371" height="278" alt="Screenshot 2026-10-22 012528" src="https://github.com/user-attachments/assets/557e6373-c663-4241-b524-8c0b8930abdd" />


---

#### Documentation

**Hand-Written VPC vs Registry VPC Module**

| Aspect           | Hand-written VPC | Registry VPC Module  |
| ---------------- | ---------------- | -------------------- |
| Total Resources  | 6                | 17                   |
| Lines of Code    | ~50              | ~20                  |
| Production Ready | No               | Yes                  |
| Maintained       | By Developer     | By Community         |
| Reusable         | Limited          | High                 |

---

**Module best practices:**
- `Use clear names` easy to understand resources and variables
- `Keep files organized` use `main.tf`, `variables.tf`, `outputs.tf`
- `Use locals` avoid repeating the same values
- `Don’t assume environment` no hardcoded region, account, or names
- `Validate inputs` add rules so wrong values fail early
- `Use defaults carefully` only when it makes sense
- `Keep modules small` easier to reuse and debug
- `Test before using` run plan and validate

---

#### Submission
1. Add `day-65-modules.md` to `2026/day-65/`
2. Commit and push to your fork

---

`#90DaysOfDevOps` `#TerraWeek` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a playbook to create users and SSH keys. | You can demonstrate, without notes: *write multi-task playbooks* — with evidence committed to `day-65/`. |
| 2 | Document idempotency rules for `command/shell`. | You can demonstrate, without notes: *use handlers, tags, check mode and error handling* — with evidence committed to `day-65/`. |
| 3 | Add tags (`--tags config`). | You can demonstrate, without notes: *lint playbooks with ansible-lint* — with evidence committed to `day-65/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Handler didn't run | Task reported `ok` not `changed`, or handler name mismatch. |
| YAML syntax error | Indentation; run `ansible-playbook --syntax-check`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** `no_log: true` for secrets; validate config before reload; avoid shell with untrusted vars.
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

1. What are handlers?
2. How do you ensure idempotency?
3. What is `serial`?
4. `command` vs `shell`?
5. **Scenario:** Rolling-update 20 web servers 2 at a time, stop automatically if health check fails. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write an idempotent playbook? | ☐ | ☐ | ☐ | ☐ |
| Can I use check mode? | ☐ | ☐ | ☐ | ☐ |
| Can I roll safely? | ☐ | ☐ | ☐ | ☐ |
| Write multi-task playbooks | ☐ | ☐ | ☐ | ☐ |
| Use handlers, tags, check mode and error handling | ☐ | ☐ | ☐ | ☐ |
| Lint playbooks with ansible-lint | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-65/` in your own repository:

```text
day-65/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-65
git add day-65/
git commit -m "day-65: ansible playbooks, modules, handlers & idempotency"
git push -u origin day-65
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

[← Day 64](../day-64/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 66 →](../day-66/README.md)
