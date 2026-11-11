# Day 68 — Terraform + Ansible Together: Provision, Configure & Dynamic Inventory

[← Day 67](../day-67/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 69 →](../day-69/README.md)

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

- [ ] Hand off from Terraform to Ansible cleanly
- [ ] Use `aws_ec2` dynamic inventory
- [ ] Prefer immutable images where appropriate

## 2. Prerequisites

- Days 57-67.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Division of labour

Terraform: network, compute, managed services. Ansible: OS config, packages, app deploy. Alternative: bake images with Packer and keep servers immutable - fewer config drifts.

### 3.2 Integration patterns

Terraform outputs -> inventory; dynamic inventory by tags; SSM-based connection (no open SSH) via `amazon.aws.aws_ssm`.

### 3.3 Pitfalls

Avoid `local-exec` provisioners for real config; avoid long-running imperative steps in Terraform.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create EC2 instances via Terraform with tags `Role=web`.
2. [ ] Configure `aws_ec2` inventory plugin grouping by tag.
3. [ ] Run `site.yml` against dynamic inventory over SSM or SSH via bastion.
4. [ ] Make Terraform output an inventory snippet.
5. [ ] Compare mutable (Ansible) vs immutable (Packer AMI) approach in a table.

## 5. Real-World Scenario

> Scale-out adds 5 servers automatically; they must be configured identically within minutes without manual inventory edits.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# aws_ec2.yml
plugin: amazon.aws.aws_ec2
regions: [us-east-1]
keyed_groups: [{ key: tags.Role, prefix: role }]
filters: { tag:Project: capstone2, instance-state-name: running }
ansible-inventory -i aws_ec2.yml --graph
ansible role_web -i aws_ec2.yml -m ping
ansible-playbook -i aws_ec2.yml site.yml --limit role_web
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 68 -- Introduction to Ansible and Inventory Setup — Challenge Brief

#### Task
Terraform provisions infrastructure. But who installs packages, configures services, manages users, and keeps servers in the desired state after they exist? That is the job of a configuration management tool, and Ansible is the industry standard.

Today you install Ansible, set up an inventory of servers, and run your first ad-hoc commands -- all without installing a single agent on the target machines. Ansible is agentless. SSH is all it needs.

---

#### Expected Output
- Ansible installed on your control node
- 2-3 EC2 instances running as managed nodes
- A working inventory file with grouped hosts
- Successful ad-hoc commands run against remote servers
- A markdown file: `day-68-ansible-intro.md`

---

#### Challenge Tasks

##### Task 1: Understand Ansible
Research and write short notes on:

1. What is configuration management? Why do we need it?
2. How is Ansible different from Chef, Puppet, and Salt?
3. What does "agentless" mean? How does Ansible connect to managed nodes?
4. Draw or describe the Ansible architecture:
   - **Control Node** -- the machine where Ansible runs (your laptop or a jump server)
   - **Managed Nodes** -- the servers Ansible configures (your EC2 instances)
   - **Inventory** -- the list of managed nodes
   - **Modules** -- units of work Ansible executes (install a package, copy a file, start a service)
   - **Playbooks** -- YAML files that define what to do on which hosts

---

##### Task 2: Set Up Your Lab Environment
You need 2-3 EC2 instances to practice on. Choose one approach:

**Option A: Use Terraform (recommended -- you just learned this)**
Use your TerraWeek skills to provision 3 EC2 instances with:
- Amazon Linux 2 or Ubuntu 22.04
- `t2.micro` instance type
- A security group allowing SSH (port 22)
- A key pair for SSH access

**Option B: Launch manually from AWS Console**
Create 3 instances with the same specs above.

Label them mentally:
- **Instance 1:** web server
- **Instance 2:** app server
- **Instance 3:** db server

Verify you can SSH into each one from your control node:
```bash
ssh -i ~/your-key.pem ec2-user@<public-ip-1>
ssh -i ~/your-key.pem ec2-user@<public-ip-2>
ssh -i ~/your-key.pem ec2-user@<public-ip-3>
```

---

##### Task 3: Install Ansible
Install Ansible on your **control node** (your laptop or one dedicated EC2 instance):

```bash
# macOS
brew install ansible

# Ubuntu/Debian
sudo apt update
sudo apt install ansible -y

# Amazon Linux / RHEL
sudo yum install ansible -y
# or
pip3 install ansible

# Verify
ansible --version
```

Confirm the output shows the Ansible version, config file path, and Python version.

**Document:** On which machine did you install Ansible? Why is it only needed on the control node?

---

##### Task 4: Create Your Inventory File
The inventory tells Ansible which servers to manage. Create a project directory and your first inventory:

```bash
mkdir ansible-practice && cd ansible-practice
```

Create a file called `inventory.ini`:
```ini
[web]
web-server ansible_host=<PUBLIC_IP_1>

[app]
app-server ansible_host=<PUBLIC_IP_2>

[db]
db-server ansible_host=<PUBLIC_IP_3>

[all:vars]
ansible_user=ec2-user
ansible_ssh_private_key_file=~/your-key.pem
```

Verify Ansible can reach all hosts:
```bash
ansible all -i inventory.ini -m ping
```

You should see green `SUCCESS` with `"ping": "pong"` for each host.

**Troubleshoot:** If ping fails:
- Check the SSH key path and permissions (`chmod 400 your-key.pem`)
- Check the security group allows SSH from your IP
- Check the `ansible_user` matches your AMI (ec2-user for Amazon Linux, ubuntu for Ubuntu)

---

##### Task 5: Run Ad-Hoc Commands
Ad-hoc commands let you run quick one-off tasks without writing a playbook.

1. **Check uptime on all servers:**
```bash
ansible all -i inventory.ini -m command -a "uptime"
```

2. **Check free memory on web servers only:**
```bash
ansible web -i inventory.ini -m command -a "free -h"
```

3. **Check disk space on all servers:**
```bash
ansible all -i inventory.ini -m command -a "df -h"
```

4. **Install a package on the web group:**
```bash
ansible web -i inventory.ini -m yum -a "name=git state=present" --become
```
(Use `apt` instead of `yum` if running Ubuntu)

5. **Copy a file to all servers:**
```bash
echo "Hello from Ansible" > hello.txt
ansible all -i inventory.ini -m copy -a "src=hello.txt dest=/tmp/hello.txt"
```

6. **Verify the file was copied:**
```bash
ansible all -i inventory.ini -m command -a "cat /tmp/hello.txt"
```

**Document:** What does `--become` do? When do you need it?

---

##### Task 6: Explore Inventory Groups and Patterns
1. **Create a group of groups** -- add this to your `inventory.ini`:
```ini
[application:children]
web
app

[all_servers:children]
application
db
```

2. Run commands against different groups:
```bash
ansible application -i inventory.ini -m ping     # web + app servers
ansible db -i inventory.ini -m ping               # only db server
ansible all_servers -i inventory.ini -m ping      # everything
```

3. **Use patterns:**
```bash
ansible 'web:app' -i inventory.ini -m ping        # OR: web or app
ansible 'all:!db' -i inventory.ini -m ping        # NOT: all except db
```

4. **Create an `ansible.cfg`** to avoid typing `-i inventory.ini` every time:
```ini
[defaults]
inventory = inventory.ini
host_key_checking = False
remote_user = ec2-user
private_key_file = ~/your-key.pem
```

Now you can simply run:
```bash
ansible all -m ping
```

**Verify:** Does `ansible all -m ping` work without specifying the inventory file?

---

#### Hints
- Ansible uses SSH by default -- no agent installation needed on managed nodes
- `ansible.cfg` is read from the current directory first, then `~/.ansible.cfg`, then `/etc/ansible/ansible.cfg`
- `-m` specifies the module, `-a` specifies the module arguments
- `--become` escalates to root (like `sudo`) -- needed for package installation and service management
- `command` module runs simple commands, `shell` module supports pipes and redirects
- Host key checking can cause issues on first connection -- `host_key_checking = False` in config helps during practice
- Ad-hoc commands are great for quick tasks, but playbooks are better for anything repeatable

---

#### Documentation
Create `day-68-ansible-intro.md` with:
- Ansible architecture in your own words
- How you set up your lab (Terraform or manual, with instance details)
- Your `inventory.ini` file (redact IPs if sharing publicly)
- Screenshot of `ansible all -m ping` with all green results
- Five ad-hoc commands you ran and their outputs
- Difference between `command` and `shell` modules

---

#### Submission
1. Add `day-68-ansible-intro.md` to `2026/day-68/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the Ansible journey today -- set up a control node, created an inventory with three EC2 instances, and ran ad-hoc commands to manage all servers from one terminal. No agents installed anywhere. Ansible just works over SSH."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 68 -- Introduction to Ansible and Inventory Setup — Notes & Solution

#### Task
Terraform provisions infrastructure. But who installs packages, configures services, manages users, and keeps servers in the desired state after they exist? That is the job of a configuration management tool, and Ansible is the industry standard.

Today you install Ansible, set up an inventory of servers, and run your first ad-hoc commands -- all without installing a single agent on the target machines. Ansible is agentless. SSH is all it needs.

---

#### Challenge Tasks

##### Task 1: Understand Ansible
Research and write short notes on:

1. What is configuration management? Why do we need it?

- `Configuration Management` is the practice of automating the setup and management of servers using code.
- Instead of manually configuring each system, we define the desired setup and apply it automatically using tools like `Ansible.`

  `Why do we need it?`
   - We need Configuration Management because:
      - `Saves time` No need to configure servers manually
      - `Ensures consistency` All systems are set up the same way
      - `Reduces errors` Automation avoids human mistakes
      - `Supports DevOps` Helps in fast deployments and CI/CD pipelines

2. How is Ansible different from Chef, Puppet, and Salt?

 - ***Ansible*** is different because it is **agentless and easy to use**, working over `SSH` with a simple `YAML` syntax. It uses a **push model**
   - While Chef and Puppet mainly use a **pull model** and require agents. 
   - `Salt` supports `both push and event-driven models` but is more complex. 
   - Overall, **Ansible is simpler and faster to set up**, whereas `Chef` `Puppet`and `Salt` are more complex but offer advanced features.

3. What does "agentless" mean? How does Ansible connect to managed nodes?

- **Agentless** means that no dedicated software (agent) needs to be installed or running on the managed nodes.
   - The control system communicates with nodes directly when tasks need to be executed.
   - In **Ansible**, the control node connects to managed nodes using standard remote protocols:
      * **SSH** for Linux/Unix systems
      * **WinRM** for Windows systems
   - When a task is run, Ansible:
      1. Establishes a connection (SSH/WinRM)
      2. Transfers the required module/code temporarily
      3. Executes it on the node
      4. Removes it and disconnects
   - This approach makes Ansible **simple to set up, lightweight, and easier to maintain**, since there are no agents to install or manage on each node.

4. Draw or describe the Ansible architecture:
   - **Control Node** -- the machine where Ansible runs (your laptop or a jump server)
   - **Managed Nodes** -- the servers Ansible configures (your EC2 instances)
   - **Inventory** -- the list of managed nodes
   - **Modules** -- units of work Ansible executes (install a package, copy a file, start a service)
   - **Playbooks** -- YAML files that define what to do on which hosts

   1. `Command Execution (Control Node)`
       - You run an Ansible command (ansible or ansible-playbook) from the Control Node.
       - Only this machine needs Ansible installed.
      
   2. `Read Inventory & Playbook`
      - `Ansible:`
         - Reads the Inventory -> identifies Managed Nodes
         - Parses the Playbook -> understands tasks and modules to execute
      
   3. `Establish Connections`
         - Ansible opens SSH connections to managed nodes in parallel
      
   4. `Module Preparation & Transfer`
       - `For each task:`
         - Ansible packages the required Module into a temporary script
         - Uploads it to `/tmp` on the remote server
      
   5. `Remote Execution`
      - The script runs on the Managed Node using its Python interpreter
      - No agent required (agentless)
      
   6. `Result Return`
      - `The module:`
         - Sends back a JSON result ( `ok`, `changed`, `failed`, `skipped`)
         - Deletes itself from /tmp after execution
      
   7. `Final Summary`
      - Ansible collects results from all nodes and shows a clear summary on `control node`

   `Analogy: The Delivery Driver`

   - Think of Ansible like a delivery driver.
   - The driver (Ansible) picks up packages (modules) from the warehouse (control node)
   - Drives to each house (managed node) using an address list (inventory)
   - Delivers the package (runs the module), gets a signature (receives JSON result) and drives away. 
   - The house doesn't need any special equipment installed to receive deliveries — just a doorbell (SSH).

```
               +----------------------------------+
               |           CONTROL NODE           |
               |  (Your Machine / Jump Server)    |
               |                                  |
               |   +--------------------------+   |
               |   | Playbooks (.yml files)   |   |
               |   +------------+-------------+   |
               |                |                 |
               |   +------------v-------------+   |
               |   | Modules (Units of Work)  |   |
               |   +------------+-------------+   |
               |                |                 |
               |   +------------v-------------+   |
               |   |  Inventory (Host List)   |   |
               |   +------------+-------------+   |
               +----------------|-----------------+
                                |
                   SSH / WinRM  |  (Agentless Connection)
            +-------------------+-------------------+
            |                   |                   |
            v                   v                   v
   +-----------------+ +-----------------+ +-----------------+
   |  MANAGED NODE   | |  MANAGED NODE   | |  MANAGED NODE   |
   |  (EC2 Instance) | |  (EC2 Instance) | |  (EC2 Instance) |
   +-----------------+ +-----------------+ +-----------------+

```
   
---

##### Task 2: Set Up Your Lab Environment
You need 2-3 EC2 instances to practice on. Choose one approach:

**Option A: Use Terraform (recommended -- you just learned this)**
Use your TerraWeek skills to provision 3 EC2 instances with:
- Amazon Linux 2 or Ubuntu 22.04
- `t2.micro` instance type
- A security group allowing SSH (port 22)
- A key pair for SSH access

**Option B: Launch manually from AWS Console**
Create 3 instances with the same specs above.

Label them mentally:
- **Instance 1:** web server
- **Instance 2:** app server
- **Instance 3:** db server

- Step 1: Generate the SSH Key Pair
  - ```ssh-keygen -t rsa -b 4096 -f ansible -N ""```

- This creates two files in your folder:

   - ansible.pub: The public key that Terraform reads and uploads to AWS.
   - ansible: The private key you will use to SSH into your EC2 instances.

- Step 2: Set Proper Private Key Permissions
  - chmod 400 ansible
 
- Step 3: Run Terraform
Now that ansible.pub exists in the current directory, run Terraform:
- ```terraform plan
     terraform apply -auto-approve```

<img width="1002" height="911" alt="image" src="https://github.com/user-attachments/assets/a359ebcb-ea16-4052-8050-96987b7dff4d" />

<img width="1423" height="508" alt="image" src="https://github.com/user-attachments/assets/62e445f4-2f77-450a-9976-9fa65ce2ad7f" />

Verify you can SSH into each one from your control node:
```bash
ssh -i ~/your-key.pem ec2-user@<public-ip-1>
ssh -i ~/your-key.pem ec2-user@<public-ip-2>
ssh -i ~/your-key.pem ec2-user@<public-ip-3>
```

<img width="731" height="932" alt="image" src="https://github.com/user-attachments/assets/d2fb383e-9c45-4091-b75a-d87401610ac9" />

<img width="1452" height="420" alt="image" src="https://github.com/user-attachments/assets/22a54270-b2a2-4f7d-bdb8-9845f170ab7d" />

---

##### Task 3: Install Ansible
Install Ansible on your **control node** (your laptop or one dedicated EC2 instance):

```bash
# macOS
brew install ansible

# Ubuntu/Debian
sudo apt update
sudo apt install ansible -y

# Amazon Linux / RHEL
sudo yum install ansible -y
# or
pip3 install ansible

# Verify
ansible --version
```

<img width="1282" height="778" alt="image" src="https://github.com/user-attachments/assets/06fb4c65-3ba4-459f-b1dd-13a48a8da2c9" />

<img width="1897" height="786" alt="image" src="https://github.com/user-attachments/assets/cc0378f4-a618-4a04-a44c-c0d9be569628" />

Confirm the output shows the Ansible version, config file path, and Python version.

<img width="1881" height="303" alt="image" src="https://github.com/user-attachments/assets/63282e1a-41db-4ede-a273-c835ca0bb8a1" />

<img width="912" height="290" alt="image" src="https://github.com/user-attachments/assets/9e1a5a62-57ab-42ef-9c8b-d64a76f2cf1b" />

**Document:** On which machine did you install Ansible? Why is it only needed on the control node?

- Ansible is installed on the control node because it runs playbooks from there and connects to other servers via SSH.
- Target machines only need SSH and Python—no Ansible installation is required.

---

##### Task 4: Create Your Inventory File
The inventory tells Ansible which servers to manage. Create a project directory and your first inventory:

```bash
mkdir ansible-practice && cd ansible-practice
```

Create a file called `inventory.ini`:
```ini
[web]
web-server ansible_host=<PUBLIC_IP_1>

[app]
app-server ansible_host=<PUBLIC_IP_2>

[db]
db-server ansible_host=<PUBLIC_IP_3>

[all:vars]
ansible_user=ec2-user
ansible_ssh_private_key_file=~/your-key.pem
```

Verify Ansible can reach all hosts:
```bash
ansible all -i inventory.ini -m ping
```

You should see green `SUCCESS` with `"ping": "pong"` for each host.

<img width="1892" height="992" alt="image" src="https://github.com/user-attachments/assets/dc138d2f-860b-4c8d-a021-03bf46dfb53b" />

**Troubleshoot:** If ping fails:
- Check the SSH key path and permissions (`chmod 400 your-key.pem`)
- Check the security group allows SSH from your IP
- Check the `ansible_user` matches your AMI (ec2-user for Amazon Linux, ubuntu for Ubuntu)

---

##### Task 5: Run Ad-Hoc Commands
Ad-hoc commands let you run quick one-off tasks without writing a playbook.

1. **Check uptime on all servers:**
```bash
ansible all -i inventory.ini -m command -a "uptime"
```
<img width="1047" height="188" alt="image" src="https://github.com/user-attachments/assets/1c392d32-9e4f-4574-b587-d2c9b17158c4" />

2. **Check free memory on web servers only:**
```bash
ansible web -i inventory.ini -m command -a "free -h"
```
<img width="933" height="113" alt="image" src="https://github.com/user-attachments/assets/381bc91b-258c-43f3-9aca-1904691994ec" />

3. **Check disk space on all servers:**
```bash
ansible all -i inventory.ini -m command -a "df -h"
```
<img width="957" height="537" alt="image" src="https://github.com/user-attachments/assets/c169911d-45cc-4db0-b61f-72b121c5c59d" />

4. **Install a package on the web group:**
```bash
ansible web -i inventory.ini -m yum -a "name=git state=present" --become
```
(Use `apt` instead of `yum` if running Ubuntu)

<img width="1225" height="341" alt="image" src="https://github.com/user-attachments/assets/d81d13c3-8ede-4091-975f-6be87076c529" />

5. **Copy a file to all servers:**
```bash
echo "Hello from Ansible" > hello.txt
ansible all -i inventory.ini -m copy -a "src=hello.txt dest=/tmp/hello.txt"
```

<img width="1091" height="808" alt="image" src="https://github.com/user-attachments/assets/a38ebd01-74e9-489e-9d12-d0246994e6a5" />

6. **Verify the file was copied:**
```bash
ansible all -i inventory.ini -m command -a "cat /tmp/hello.txt"
```

<img width="1051" height="128" alt="image" src="https://github.com/user-attachments/assets/6d3e36c7-2392-43ea-b8ea-2c3cf54738a4" />

**Document:** What does `--become` do? When do you need it?

- `--become` escalates to root (like `sudo`) -- needed for package installation and service management

---

##### Task 6: Explore Inventory Groups and Patterns
1. **Create a group of groups** -- add this to your `inventory.ini`:
```ini
[application:children]
web
app

[all_servers:children]
application
db
```

2. Run commands against different groups:
```bash
ansible application -i inventory.ini -m ping     # web + app servers
ansible db -i inventory.ini -m ping               # only db server
ansible all_servers -i inventory.ini -m ping      # everything
```

<img width="906" height="568" alt="image" src="https://github.com/user-attachments/assets/24d188cf-806f-4f1d-a115-19a86c1ebe32" />

3. **Use patterns:**
```bash
ansible 'web:app' -i inventory.ini -m ping        # OR: web or app
ansible 'all:!db' -i inventory.ini -m ping        # NOT: all except db
```

<img width="962" height="340" alt="image" src="https://github.com/user-attachments/assets/ec28404c-ebb8-4663-bd01-fef5afd1f996" />

4. **Create an `ansible.cfg`** to avoid typing `-i inventory.ini` every time:
```ini
[defaults]
inventory = inventory.ini
host_key_checking = False
remote_user = ec2-user
private_key_file = ~/your-key.pem
```

Now you can simply run:
```bash
ansible all -m ping
```

**Verify:** Does `ansible all -m ping` work without specifying the inventory file?

- yes

<img width="667" height="281" alt="image" src="https://github.com/user-attachments/assets/bf30bd30-c081-4e55-9f0e-bd700da2d7b7" />

---

#### Hints
- Ansible uses SSH by default -- no agent installation needed on managed nodes
- `ansible.cfg` is read from the current directory first, then `~/.ansible.cfg`, then `/etc/ansible/ansible.cfg`
- `-m` specifies the module, `-a` specifies the module arguments
- `--become` escalates to root (like `sudo`) -- needed for package installation and service management
- `command` module runs simple commands, `shell` module supports pipes and redirects
- Host key checking can cause issues on first connection -- `host_key_checking = False` in config helps during practice
- Ad-hoc commands are great for quick tasks, but playbooks are better for anything repeatable

---

#### Documentation
- Ansible architecture in your own words

```
  [Control Node]
        │
        ├── 1. Reads Inventory & Playbook
        ├── 2. Translates Tasks into Python/PowerShell Scripts
        ├── 3. Connects via SSH / WinRM
        ▼
┌─────────────────────────────────────────────────────────┐
│                    Managed Nodes                        │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │ Web Servers  │   │ App Servers  │   │ DB Servers   │ │
│  └──────────────┘   └──────────────┘   └──────────────┘ │
└─────────────────────────────────────────────────────────┘
        │
        ├── 4. Pushes temporary module code to remote hosts
        ├── 5. Executes modules and collects JSON status output
        └── 6. Removes temporary code automatically

```

- Difference between `command` and `shell` modules
  - The core difference is that the `command module` executes binaries directly on the target host,
  - while the `shell module` routes commands through a shell environment (like /bin/sh)

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a decision note: Ansible vs Packer vs user-data. | You can demonstrate, without notes: *hand off from Terraform to Ansible cleanly* — with evidence committed to `day-68/`. |
| 2 | Draw the provisioning flow diagram. | You can demonstrate, without notes: *use `aws_ec2` dynamic inventory* — with evidence committed to `day-68/`. |
| 3 | Add health verification after configuration. | You can demonstrate, without notes: *prefer immutable images where appropriate* — with evidence committed to `day-68/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Inventory empty | Tags/filters/credentials/region wrong. |
| SSH unreachable in private subnet | Use bastion ProxyJump or SSM connection. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Avoid public SSH; use SSM; encrypt state/outputs with sensitive data; restrict tags used for targeting.
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

1. Terraform vs Ansible roles?
2. What is dynamic inventory?
3. Mutable vs immutable?
4. How to avoid provisioner misuse?
5. **Scenario:** Scale-out adds 5 servers automatically; they must be configured identically within minutes without manual inventory edits. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I configure fresh instances automatically? | ☐ | ☐ | ☐ | ☐ |
| Can I use dynamic inventory? | ☐ | ☐ | ☐ | ☐ |
| Can I justify immutable images? | ☐ | ☐ | ☐ | ☐ |
| Hand off from Terraform to Ansible cleanly | ☐ | ☐ | ☐ | ☐ |
| Use `aws_ec2` dynamic inventory | ☐ | ☐ | ☐ | ☐ |
| Prefer immutable images where appropriate | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-68/` in your own repository:

```text
day-68/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-68
git add day-68/
git commit -m "day-68: terraform + ansible together"
git push -u origin day-68
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

[← Day 67](../day-67/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 69 →](../day-69/README.md)
