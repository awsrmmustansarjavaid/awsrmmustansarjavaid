# Day 69 — Capstone 2 (Part 2/3): Configure, Deploy & Pipeline

[← Day 68](../day-68/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 70 →](../day-70/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 2 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Configure the capstone environment with Ansible roles
- [ ] Deploy the Capstone 1 app onto infrastructure
- [ ] Automate provisioning and configuration in a pipeline

## 2. Prerequisites

- Day 63, Days 64-68.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Integration

Pipeline stages: validate/scan -> plan -> approve -> apply -> inventory -> Ansible configure -> deploy app -> smoke test -> report.

### 3.2 Operational readiness

Logging, alarms, backups, patching approach, runbooks.

### 3.3 Prod parity

Dev and prod differ only in variables, never in code.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Apply `dev` Terraform; generate/consume dynamic inventory.
2. [ ] Run Ansible roles: hardening, docker, app, nginx, CloudWatch agent.
3. [ ] Deploy capstone-1 image by digest.
4. [ ] Create GitHub Actions workflow orchestrating plan/apply/configure with approvals.
5. [ ] Add CloudWatch alarms and verify via induced failure.

## 5. Real-World Scenario

> Rebuild the whole environment from scratch in a new account. Measure time and list manual steps; eliminate them.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform -chdir=infra/envs/dev apply -auto-approve
ansible-playbook -i ansible/aws_ec2.yml ansible/site.yml --diff
./scripts/smoke.sh $(terraform -chdir=infra/envs/dev output -raw alb_dns)
gh workflow run infra.yml -f env=dev
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 69 -- Ansible Playbooks and Modules — Challenge Brief

#### Task
Ad-hoc commands are useful for quick checks, but real automation lives in playbooks. A playbook is a YAML file that describes the desired state of your servers -- which packages to install, which services to run, which files to place where. You write it once, run it a hundred times, and get the same result every time.

Today you write your first playbooks and learn the modules that you will use on every project.

---

#### Expected Output
- Multiple playbooks that install packages, manage services, and configure files
- A clear understanding of plays, tasks, modules, and handlers
- A markdown file: `day-69-playbooks.md`

---

#### Challenge Tasks

##### Task 1: Your First Playbook
Create `install-nginx.yml`:

```yaml
---
- name: Install and start Nginx on web servers
  hosts: web
  become: true

  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present

    - name: Start and enable Nginx
      service:
        name: nginx
        state: started
        enabled: true

    - name: Create a custom index page
      copy:
        content: "<h1>Deployed by Ansible - TerraWeek Server</h1>"
        dest: /usr/share/nginx/html/index.html
```

(Use `apt` instead of `yum` if your instances run Ubuntu)

Run it:
```bash
ansible-playbook install-nginx.yml
```

Read the output carefully -- every task shows `changed`, `ok`, or `failed`.

Now run it **again**. Notice that tasks show `ok` instead of `changed`. This is **idempotency** -- Ansible only makes changes when needed.

**Verify:** Curl the web server's public IP. Do you see your custom page?

---

##### Task 2: Understand the Playbook Structure
Open your playbook and annotate each part in your notes:

```yaml
---                                    # YAML document start
- name: Play name                      # PLAY -- targets a group of hosts
  hosts: web                           # Which inventory group to run on
  become: true                         # Run tasks as root (sudo)

  tasks:                               # List of TASKS in this play
    - name: Task name                  # TASK -- one unit of work
      module_name:                     # MODULE -- what Ansible does
        key: value                     # Module arguments
```

Answer:
1. What is the difference between a play and a task?
2. Can you have multiple plays in one playbook?
3. What does `become: true` do at the play level vs the task level?
4. What happens if a task fails -- do remaining tasks still run?

---

##### Task 3: Learn the Essential Modules
Practice each of these modules by writing a playbook called `essential-modules.yml` with multiple tasks:

1. **`yum`/`apt`** -- Install and remove packages:
```yaml
- name: Install multiple packages
  yum:
    name:
      - git
      - curl
      - wget
      - tree
    state: present
```

2. **`service`** -- Manage services:
```yaml
- name: Ensure Nginx is running
  service:
    name: nginx
    state: started
    enabled: true
```

3. **`copy`** -- Copy files from control node to managed nodes:
```yaml
- name: Copy config file
  copy:
    src: files/app.conf
    dest: /etc/app.conf
    owner: root
    group: root
    mode: '0644'
```

4. **`file`** -- Create directories and manage permissions:
```yaml
- name: Create application directory
  file:
    path: /opt/myapp
    state: directory
    owner: ec2-user
    mode: '0755'
```

5. **`command`** -- Run a command (no shell features):
```yaml
- name: Check disk space
  command: df -h
  register: disk_output

- name: Print disk space
  debug:
    var: disk_output.stdout_lines
```

6. **`shell`** -- Run a command with shell features (pipes, redirects):
```yaml
- name: Count running processes
  shell: ps aux | wc -l
  register: process_count

- name: Show process count
  debug:
    msg: "Total processes: {{ process_count.stdout }}"
```

7. **`lineinfile`** -- Add or modify a single line in a file:
```yaml
- name: Set timezone in environment
  lineinfile:
    path: /etc/environment
    line: 'TZ=Asia/Kolkata'
    create: true
```

Create a `files/` directory with a sample `app.conf` file for the copy task. Run the playbook against all servers.

**Document:** What is the difference between `command` and `shell`? When should you use each?

---

##### Task 4: Handlers -- Restart Services Only When Needed
Handlers are tasks that run only when triggered by a `notify`. This avoids unnecessary service restarts.

Create `nginx-config.yml`:
```yaml
---
- name: Configure Nginx with a custom config
  hosts: web
  become: true

  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present

    - name: Deploy Nginx config
      copy:
        src: files/nginx.conf
        dest: /etc/nginx/nginx.conf
        owner: root
        mode: '0644'
      notify: Restart Nginx

    - name: Deploy custom index page
      copy:
        content: "<h1>Managed by Ansible</h1><p>Server: {{ inventory_hostname }}</p>"
        dest: /usr/share/nginx/html/index.html

    - name: Ensure Nginx is running
      service:
        name: nginx
        state: started
        enabled: true

  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
```

Create `files/nginx.conf` with a basic Nginx config.

Run the playbook:
- First run: handler triggers because the config file is new
- Second run: handler does NOT trigger because nothing changed

**Verify:** Run it twice and compare the output. Does the handler run both times?

---

##### Task 5: Dry Run, Diff, and Verbosity
Before running playbooks on production, always preview changes first.

1. **Dry run (check mode)** -- shows what would change without changing anything:
```bash
ansible-playbook install-nginx.yml --check
```

2. **Diff mode** -- shows the actual file differences:
```bash
ansible-playbook nginx-config.yml --check --diff
```

3. **Verbosity** -- increase output detail for debugging:
```bash
ansible-playbook install-nginx.yml -v       # verbose
ansible-playbook install-nginx.yml -vv      # more verbose
ansible-playbook install-nginx.yml -vvv     # connection debugging
```

4. **Limit to specific hosts:**
```bash
ansible-playbook install-nginx.yml --limit web-server
```

5. **List what would be affected without running:**
```bash
ansible-playbook install-nginx.yml --list-hosts
ansible-playbook install-nginx.yml --list-tasks
```

**Document:** Why is `--check --diff` the most important flag combination for production use?

---

##### Task 6: Multiple Plays in One Playbook
Write `multi-play.yml` with separate plays for each server group:

```yaml
---
- name: Configure web servers
  hosts: web
  become: true
  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present
    - name: Start Nginx
      service:
        name: nginx
        state: started
        enabled: true

- name: Configure app servers
  hosts: app
  become: true
  tasks:
    - name: Install Node.js dependencies
      yum:
        name:
          - gcc
          - make
        state: present
    - name: Create app directory
      file:
        path: /opt/app
        state: directory
        mode: '0755'

- name: Configure database servers
  hosts: db
  become: true
  tasks:
    - name: Install MySQL client
      yum:
        name: mysql
        state: present
    - name: Create data directory
      file:
        path: /var/lib/appdata
        state: directory
        mode: '0700'
```

Run it:
```bash
ansible-playbook multi-play.yml
```

Watch the output -- each play targets a different group, and tasks run only on the relevant hosts.

**Verify:** Is Nginx only installed on web servers? Is MySQL only on db servers?

---

#### Hints
- YAML indentation matters -- use 2 spaces, never tabs
- `state: present` means "install if not already installed", `state: absent` means "remove"
- `state: started` means "start if not running", `state: restarted` means "always restart"
- Handlers run once at the end of all tasks, even if notified multiple times
- `register` saves a task's output to a variable, `debug` prints it
- `{{ inventory_hostname }}` is a built-in variable that returns the current host's name
- `ansible-playbook --syntax-check playbook.yml` validates YAML syntax before running
- Always test with `--check --diff` before applying to production

---

#### Documentation
Create `day-69-playbooks.md` with:
- Your first playbook with annotations explaining each section
- All seven module examples with what each does
- Screenshot of the playbook run showing changed vs ok tasks
- Screenshot proving idempotency (second run shows all ok)
- How handlers work with a before/after comparison
- Difference between `--check`, `--diff`, and `-v`

---

#### Submission
1. Add `day-69-playbooks.md` to `2026/day-69/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Wrote my first Ansible playbooks today -- installed Nginx, managed services, copied files, and learned handlers. Ran the same playbook twice and it made zero changes the second time. Idempotency is beautiful."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 69 -- Ansible Playbooks and Modules — Notes & Solution

#### Task
Ad-hoc commands are useful for quick checks, but real automation lives in playbooks. A playbook is a YAML file that describes the desired state of your servers -- which packages to install, which services to run, which files to place where. You write it once, run it a hundred times, and get the same result every time.

Today you write your first playbooks and learn the modules that you will use on every project.

---

#### Challenge Tasks

##### Task 1: Your First Playbook
Create `install-nginx.yml`:

```yaml
---
- name: Install and start Nginx on web servers
  hosts: web
  become: true

  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present

    - name: Start and enable Nginx
      service:
        name: nginx
        state: started
        enabled: true

    - name: Create a custom index page
      copy:
        content: "<h1>Deployed by Ansible - TerraWeek Server</h1>"
        dest: /usr/share/nginx/html/index.html
```

(Use `apt` instead of `yum` if your instances run Ubuntu)

Run it:
```bash
ansible-playbook install-nginx.yml
```

Read the output carefully -- every task shows `changed`, `ok`, or `failed`.

<img width="1892" height="985" alt="image" src="https://github.com/user-attachments/assets/54fe5bca-c364-4c9b-8283-8473e4bbb79d" />

Now run it **again**. Notice that tasks show `ok` instead of `changed`. This is **idempotency** -- Ansible only makes changes when needed.

<img width="1917" height="362" alt="image" src="https://github.com/user-attachments/assets/48d4bfcd-fcdb-4caf-aae1-75c7c3e89c4c" />

**Verify:** Curl the web server's public IP. Do you see your custom page?

<img width="1518" height="461" alt="image" src="https://github.com/user-attachments/assets/5b5c254d-55b4-473a-add3-83a9465db957" />

---

##### Task 2: Understand the Playbook Structure
Open your playbook and annotate each part in your notes:

```yaml
---                                    # YAML document start
- name: Play name                      # PLAY -- targets a group of hosts
  hosts: web                           # Which inventory group to run on
  become: true                         # Run tasks as root (sudo)

  tasks:                               # List of TASKS in this play
    - name: Task name                  # TASK -- one unit of work
      module_name:                     # MODULE -- what Ansible does
        key: value                     # Module arguments
```

Answer:
1. What is the difference between a play and a task?

 - `Play`: The top-level mapping that connects a targeted group of managed hosts from your inventory to specific **roles**, **variables**, and **tasks**. It defines where and under what context actions should take place.

      - Which hosts to target
      - What roles/tasks to apply
  
 - `Task`: An individual action defined inside a play. Each task invokes a specific Ansible module (such as **apt**, **service**, or **copy**) to execute a single atomic operation on the target host.
  
      - Single unit of work
      - Calls one module (like apt, copy, service)
      - It’s a high-level mapping between hosts and work

2. Can you have multiple plays in one playbook?
 - Yes. An Ansible playbook is a YAML list of plays. You can define multiple plays within a single file to target different host groups with different roles, privileges, or variables in sequential order:

 - `Each play:` `Targets different host groups` and `Runs independently in sequence`

```
# Play 1: Target database servers
- name: Configure Database Servers
  hosts: db_servers
  become: true
  tasks:
    - name: Install PostgreSQL
      apt:
        name: postgresql
        state: present

# Play 2: Target web servers
- name: Configure Web Servers
  hosts: web_servers
  become: true
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
```

3. What does `become: true` do at the play level vs the task level?

    - `play level` Applies to ALL tasks in the play
      - Play Level: Sets privilege escalation globally for all tasks within that play.
      - Every task in the play will run with escalated privileges (e.g., sudo) by default.

   - `task level` Applies only to that task
     - Task Level: Restricts privilege escalation to that specific task only.
     - This is best practice when only one or two tasks need root privileges (e.g., package installation), while the rest should execute as the standard connecting user.

    **Play Level:** Applies elevated permissions (`sudo`) across all tasks in the play.
    **Task Level:** Granularly elevates permissions only for the specific task requiring root access.

```
- name: Play-level vs Task-level Privilege Escalation
  hosts: web
  become: false  # Runs non-root by default across the play

  tasks:
    - name: Install package as root
      apt:
        name: htop
        state: present
      become: true  # Escalates to sudo only for this task

    - name: Read user-level file
      command: whoami
```
      
4. What happens if a task fails -- do remaining tasks still run?

    - `Default behavior:`
      - Execution stops for that host
        ```
        tasks:
          - name: Task 1 (fails)
          - name: Task 2 (won’t run)
        ```
    - But other hosts --> `Continue normally`

- If a task fails on a host, Ansible halts execution for that host to prevent configuration drift.
- Unaffected hosts continue execution.
- Use `ignore_errors: true` or `block/rescue` blocks to implement fallback logic without stopping the run.

---

##### Task 3: Learn the Essential Modules
Practice each of these modules by writing a playbook called `essential-modules.yml` with multiple tasks:

1. **`yum`/`apt`** -- Install and remove packages:
```yaml
- name: Install multiple packages
  yum:
    name:
      - git
      - curl
      - wget
      - tree
    state: present
```

2. **`service`** -- Manage services:
```yaml
- name: Ensure Nginx is running
  service:
    name: nginx
    state: started
    enabled: true
```

3. **`copy`** -- Copy files from control node to managed nodes:
```yaml
- name: Copy config file
  copy:
    src: files/app.conf
    dest: /etc/app.conf
    owner: root
    group: root
    mode: '0644'
```

4. **`file`** -- Create directories and manage permissions:
```yaml
- name: Create application directory
  file:
    path: /opt/myapp
    state: directory
    owner: ec2-user
    mode: '0755'
```

5. **`command`** -- Run a command (no shell features):
```yaml
- name: Check disk space
  command: df -h
  register: disk_output

- name: Print disk space
  debug:
    var: disk_output.stdout_lines
```

6. **`shell`** -- Run a command with shell features (pipes, redirects):
```yaml
- name: Count running processes
  shell: ps aux | wc -l
  register: process_count

- name: Show process count
  debug:
    msg: "Total processes: {{ process_count.stdout }}"
```

7. **`lineinfile`** -- Add or modify a single line in a file:
```yaml
- name: Set timezone in environment
  lineinfile:
    path: /etc/environment
    line: 'TZ=Asia/Kolkata'
    create: true
```

Create a `files/` directory with a sample `app.conf` file for the copy task. Run the playbook against all servers.

<img width="1907" height="397" alt="image" src="https://github.com/user-attachments/assets/f04573ee-b830-4c90-b1c4-2dc7f7324a67" />

<img width="1892" height="598" alt="image" src="https://github.com/user-attachments/assets/41afbcf9-6395-45a8-b37c-ce63802f88c8" />

<img width="1902" height="647" alt="image" src="https://github.com/user-attachments/assets/128bb353-760c-45de-bc31-16f2c90048f0" />

**Document:** What is the difference between `command` and `shell`? When should you use each?

  - `command` module runs simple commands, `shell` module supports pipes and redirects
  
  - Use `command`
    - For simple commands
    - No pipes, redirects, or variables

  - Use `shell`
    - When you need shell features
    - Pipes (|)
    - Redirects (>)
    - Variables ($HOME)
    
---

##### Task 4: Handlers -- Restart Services Only When Needed
Handlers are tasks that run only when triggered by a `notify`. This avoids unnecessary service restarts.

Create `nginx-config.yml`:
```yaml
---
- name: Configure Nginx with a custom config
  hosts: web
  become: true

  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present

    - name: Deploy Nginx config
      copy:
        src: files/nginx.conf
        dest: /etc/nginx/nginx.conf
        owner: root
        mode: '0644'
      notify: Restart Nginx

    - name: Deploy custom index page
      copy:
        content: "<h1>Managed by Ansible</h1><p>Server: {{ inventory_hostname }}</p>"
        dest: /usr/share/nginx/html/index.html

    - name: Ensure Nginx is running
      service:
        name: nginx
        state: started
        enabled: true

  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
```

Create `files/nginx.conf` with a basic Nginx config.

Run the playbook:
- First run: handler triggers because the config file is new
- Second run: handler does NOT trigger because nothing changed

**Verify:** Run it twice and compare the output. Does the handler run both times?
 - No, Handler run first run

---

##### Task 5: Dry Run, Diff, and Verbosity
Before running playbooks on production, always preview changes first.

1. **Dry run (check mode)** -- shows what would change without changing anything:
```bash
ansible-playbook install-nginx.yml --check
```

<img width="1262" height="317" alt="image" src="https://github.com/user-attachments/assets/db90d1b2-0090-4a33-a7fd-1ee11eb26c3b" />

2. **Diff mode** -- shows the actual file differences:
```bash
ansible-playbook nginx-config.yml --check --diff
```

<img width="1261" height="331" alt="image" src="https://github.com/user-attachments/assets/5f0dc69f-01b2-494c-8db1-0ec6f9f4926d" />

3. **Verbosity** -- increase output detail for debugging:
```bash
ansible-playbook install-nginx.yml -v       # verbose
ansible-playbook install-nginx.yml -vv      # more verbose
ansible-playbook install-nginx.yml -vvv     # connection debugging
```

<img width="1262" height="662" alt="image" src="https://github.com/user-attachments/assets/7ad124ac-6d01-4502-bb1f-f16db4eb31bf" />

<img width="1263" height="631" alt="image" src="https://github.com/user-attachments/assets/84641a29-f077-4e8b-b13f-75e1da1d54ac" />

4. **Limit to specific hosts:**
```bash
ansible-playbook install-nginx.yml --limit web-server
```

<img width="1062" height="814" alt="image" src="https://github.com/user-attachments/assets/674ea889-1fc3-4bf9-8c4b-54d961ccee4d" />

5. **List what would be affected without running:**
```bash
ansible-playbook install-nginx.yml --list-hosts
ansible-playbook install-nginx.yml --list-tasks
```
<img width="1184" height="526" alt="image" src="https://github.com/user-attachments/assets/42699312-6a9c-4ed9-b1f3-73f1ff62c683" />

**Document:** Why is `--check --diff` the most important flag combination for production use?

- Because `--check --diff` let's you simulate changes without applying them and see exactly what would change, helping avoid mistakes in production.

---

##### Task 6: Multiple Plays in One Playbook
Write `multi-play.yml` with separate plays for each server group:

```yaml
---
- name: Configure web servers
  hosts: web
  become: true
  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present
    - name: Start Nginx
      service:
        name: nginx
        state: started
        enabled: true

- name: Configure app servers
  hosts: app
  become: true
  tasks:
    - name: Install Node.js dependencies
      yum:
        name:
          - gcc
          - make
        state: present
    - name: Create app directory
      file:
        path: /opt/app
        state: directory
        mode: '0755'

- name: Configure database servers
  hosts: db
  become: true
  tasks:
    - name: Install MySQL client
      yum:
        name: mysql
        state: present
    - name: Create data directory
      file:
        path: /var/lib/appdata
        state: directory
        mode: '0700'
```

Run it:
```bash
ansible-playbook multi-play.yml
```

<img width="955" height="836" alt="image" src="https://github.com/user-attachments/assets/d81f90fb-bf52-4025-a017-5ec70e694006" />

Watch the output -- each play targets a different group, and tasks run only on the relevant hosts.

**Verify:** Is Nginx only installed on web servers? Is MySQL only on db servers?

- Yes, `Nginx` is Installed on `web server` & `Mysql` is on `db server`

<img width="1069" height="570" alt="image" src="https://github.com/user-attachments/assets/c1022325-2459-435d-88c6-44afe129daea" />

---

#### Hints
- YAML indentation matters -- use 2 spaces, never tabs
- `state: present` means "install if not already installed", `state: absent` means "remove"
- `state: started` means "start if not running", `state: restarted` means "always restart"
- Handlers run once at the end of all tasks, even if notified multiple times
- `register` saves a task's output to a variable, `debug` prints it
- `{{ inventory_hostname }}` is a built-in variable that returns the current host's name
- `ansible-playbook --syntax-check playbook.yml` validates YAML syntax before running
- Always test with `--check --diff` before applying to production

---

#### Documentation
Create `day-69-playbooks.md` with:
- Your first playbook with annotations explaining each section

```bash
---                                                                # YAML document start
- name: Install and start Nginx on web servers                     # PLAY name
  hosts: web                                                       # Target Inventory Group: Executes on all hosts in the 'web' group
  become: true                                                     # Privilege Escalation: Executes tasks as root using sudo

  tasks:                                                           # list of Tasks

    - name: Install Nginx                                          # Task 1: Ensure Nginx is installed
      yum:                                                         # Module: yum 
        name: nginx                                                # Name of the package to install
        state: present                                             # Desired State: Package must be installed (idempotent)

    - name: Start and Enable Nginx                                 # Task 2: Ensure Nginx service is running and enabled on boot
      service:                                                     # Module: service (manages system services)
        name: nginx                                                # Service to manage
        state: started                                             # Desired State: Service must be running
        enabled: true                                              # Boot Behavior: Service enabled to start on system boot

    - name: Create a custom index page                             # Task 3: Create a custom HTML page
      copy:                                                        # Module: copy (copies files or content to remote hosts)
        content: "<h1>Deploy by Ansible - TerraWeek Server</h1>"   # Inline content for index.html
        dest: /usr/share/nginx/html/index.html                     # Destination path on remote host(web)
```

- All seven module examples with what each does

1. **`yum`/`apt`** -- Install and remove packages:
```yaml
- name: Remove multiple packages
  yum:
    name:
      - git
      - curl
      - wget
      - tree
    state: absent
```

2. **`service`** -- Manage services:
```yaml
- name: Ensure Nginx is running
  service:
    name: nginx
    state: started
    enabled: true
```

3. **`copy`** -- Copy files from control node to managed nodes:
```yaml
- name: Copy config file
  copy:
    src: files/app.conf
    dest: /etc/app.conf
    owner: root
    group: root
    mode: '0644'
```

4. **`file`** -- Create directories and manage permissions:
```yaml
- name: Create application directory
  file:
    path: /opt/myapp
    state: directory
    owner: ec2-user
    mode: '0755'
```

5. **`command`** -- Run a command (no shell features):
```yaml
- name: Check disk space
  command: df -h
  register: disk_output

- name: Print disk space
  debug:
    var: disk_output.stdout_lines
```

6. **`shell`** -- Run a command with shell features (pipes, redirects):
```yaml
- name: Count running processes
  shell: ps aux | wc -l
  register: process_count
```

7. **`lineinfile`** -- Add or modify a single line in a file:
```yaml
- name: Disable root SSH login
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^PermitRootLogin'
    line: 'PermitRootLogin no'
```

- How handlers work with a before/after comparison

  - First run: handler triggers because the config file is new
  - Second run: handler does NOT trigger because nothing changed

- Difference between `--check`, `--diff`, and `-v`

  `--check` Dry run (shows what would change, doesn’t apply anything)

  `--diff` Shows actual differences (before vs after changes in files)

  `-v` Verbose output

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Time full rebuild and document. | You can demonstrate, without notes: *configure the capstone environment with Ansible roles* — with evidence committed to `day-69/`. |
| 2 | Write patching runbook (SSM Patch Manager or Ansible). | You can demonstrate, without notes: *deploy the Capstone 1 app onto infrastructure* — with evidence committed to `day-69/`. |
| 3 | Add drift detection scheduled workflow. | You can demonstrate, without notes: *automate provisioning and configuration in a pipeline* — with evidence committed to `day-69/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Pipeline too long | Cache providers, parallelise lint/scan. |
| Ansible fails mid-run | Idempotent re-run; use `--start-at-task` and fix root cause. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Separate duties: plan role vs apply role; approvals for prod; secrets via Vault/SSM; encrypted volumes.
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

1. How do you combine IaC and CM in CI?
2. How do you ensure prod parity?
3. How do you rebuild after disaster?
4. How do you reduce manual steps?
5. **Scenario:** Rebuild the whole environment from scratch in a new account. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I rebuild end-to-end? | ☐ | ☐ | ☐ | ☐ |
| Is the pipeline gated? | ☐ | ☐ | ☐ | ☐ |
| Are alarms verified? | ☐ | ☐ | ☐ | ☐ |
| Configure the capstone environment with Ansible roles | ☐ | ☐ | ☐ | ☐ |
| Deploy the Capstone 1 app onto infrastructure | ☐ | ☐ | ☐ | ☐ |
| Automate provisioning and configuration in a pipeline | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-69/` in your own repository:

```text
day-69/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-69
git add day-69/
git commit -m "day-69: capstone 2 (part 2/3)"
git push -u origin day-69
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

---

[← Day 68](../day-68/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 70 →](../day-70/README.md)
