# Day 70 — Capstone 2 (Part 3/3): Hardening, DR, Cost Review & Documentation

[← Day 69](../day-69/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 71 →](../day-71/README.md)

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

- [ ] Harden and test resilience of the capstone environment
- [ ] Perform a disaster-recovery exercise and cost review
- [ ] Produce portfolio-quality documentation

## 2. Prerequisites

- Days 63-69.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Security review

Run Prowler/ScoutSuite or AWS Security Hub; fix top findings; verify least-privilege IAM and no public exposure.

### 3.2 Resilience test

Terminate an instance, fail an AZ (simulate), restore DB from snapshot, rebuild from code; record RTO/RPO achieved.

### 3.3 Documentation

README, architecture diagram, runbooks, ADRs, cost report, teardown instructions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `prowler aws` (or Security Hub) and remediate 5 findings.
2. [ ] Perform DR drill: restore RDS snapshot and rebuild compute.
3. [ ] Create cost report with infracost + Cost Explorer.
4. [ ] Write runbooks: deploy, rollback, restore, rotate secrets.
5. [ ] Tag `v1.0.0`, record demo and destroy environment.

## 5. Real-World Scenario

> The CFO wants to know the monthly cost of prod, how fast we recover from region failure, and what protects customer data.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
prowler aws --severity high critical -M csv
aws rds restore-db-instance-from-db-snapshot --db-instance-identifier restored --db-snapshot-identifier snap1
terraform -chdir=infra/envs/dev destroy
git tag -a v1.0.0 -m "Capstone 2 complete" && git push --tags
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 70 -- Variables, Facts, Conditionals and Loops — Challenge Brief

#### Task
Your playbooks work, but they are static -- same packages, same config, same behavior on every server. Real infrastructure is not like that. Web servers need Nginx, app servers need Node.js, production gets more memory than dev. Today you make your playbooks smart.

Variables, facts, conditionals, and loops turn a rigid script into flexible automation that adapts to each host, each group, and each environment.

---

#### Expected Output
- Playbooks using variables from multiple sources
- Conditional tasks that run only on specific OS or groups
- Loops that install packages and create users dynamically
- A markdown file: `day-70-variables-loops.md`

---

#### Challenge Tasks

##### Task 1: Variables in Playbooks
Create `variables-demo.yml`:

```yaml
---
- name: Variable demo
  hosts: all
  become: true

  vars:
    app_name: terraweek-app
    app_port: 8080
    app_dir: "/opt/{{ app_name }}"
    packages:
      - git
      - curl
      - wget

  tasks:
    - name: Print app details
      debug:
        msg: "Deploying {{ app_name }} on port {{ app_port }} to {{ app_dir }}"

    - name: Create application directory
      file:
        path: "{{ app_dir }}"
        state: directory
        mode: '0755'

    - name: Install required packages
      yum:
        name: "{{ packages }}"
        state: present
```

Run it and verify the variables resolve correctly.

Now, override a variable from the command line:
```bash
ansible-playbook variables-demo.yml -e "app_name=my-custom-app app_port=9090"
```

**Verify:** Does the CLI variable override the playbook variable?

---

##### Task 2: group_vars and host_vars
Variables should not live inside playbooks. Move them to dedicated files.

Create this structure:
```
ansible-practice/
  inventory.ini
  ansible.cfg
  group_vars/
    all.yml
    web.yml
    db.yml
  host_vars/
    web-server.yml
  playbooks/
    site.yml
```

**`group_vars/all.yml`** -- applies to every host:
```yaml
---
ntp_server: pool.ntp.org
app_env: development
common_packages:
  - vim
  - htop
  - tree
```

**`group_vars/web.yml`** -- applies only to the web group:
```yaml
---
http_port: 80
max_connections: 1000
web_packages:
  - nginx
```

**`group_vars/db.yml`** -- applies only to the db group:
```yaml
---
db_port: 3306
db_packages:
  - mysql-server
```

**`host_vars/web-server.yml`** -- applies only to this specific host:
```yaml
---
max_connections: 2000
custom_message: "This is the primary web server"
```

Write a playbook `site.yml` that uses these variables:
```yaml
---
- name: Apply common config
  hosts: all
  become: true
  tasks:
    - name: Install common packages
      yum:
        name: "{{ common_packages }}"
        state: present
    - name: Show environment
      debug:
        msg: "Environment: {{ app_env }}"

- name: Configure web servers
  hosts: web
  become: true
  tasks:
    - name: Show web config
      debug:
        msg: "HTTP port: {{ http_port }}, Max connections: {{ max_connections }}"
    - name: Show host-specific message
      debug:
        msg: "{{ custom_message }}"
```

Run it and observe which variables apply to which hosts.

**Document:** What is the variable precedence? (hint: host_vars > group_vars > playbook vars, and `-e` overrides everything)

---

##### Task 3: Ansible Facts -- Gathering System Information
Ansible automatically collects "facts" about each managed node -- OS, IP, memory, CPU, disks, and hundreds more.

1. **See all facts for a host:**
```bash
ansible web-server -m setup
```

2. **Filter specific facts:**
```bash
ansible web-server -m setup -a "filter=ansible_os_family"
ansible web-server -m setup -a "filter=ansible_distribution*"
ansible web-server -m setup -a "filter=ansible_memtotal_mb"
ansible web-server -m setup -a "filter=ansible_default_ipv4"
```

3. **Use facts in a playbook** -- create `facts-demo.yml`:
```yaml
---
- name: Facts demo
  hosts: all
  tasks:
    - name: Show OS info
      debug:
        msg: >
          Hostname: {{ ansible_hostname }},
          OS: {{ ansible_distribution }} {{ ansible_distribution_version }},
          RAM: {{ ansible_memtotal_mb }}MB,
          IP: {{ ansible_default_ipv4.address }}

    - name: Show all network interfaces
      debug:
        var: ansible_interfaces
```

Run it and observe the facts printed for each host.

**Document:** Name five facts you would use in real playbooks and why.

---

##### Task 4: Conditionals with when
Tasks should not always run on every host. Use `when` to control execution.

Create `conditional-demo.yml`:

```yaml
---
- name: Conditional tasks demo
  hosts: all
  become: true

  tasks:
    - name: Install Nginx (only on web servers)
      yum:
        name: nginx
        state: present
      when: "'web' in group_names"

    - name: Install MySQL (only on db servers)
      yum:
        name: mysql-server
        state: present
      when: "'db' in group_names"

    - name: Show warning on low memory hosts
      debug:
        msg: "WARNING: This host has less than 1GB RAM"
      when: ansible_memtotal_mb < 1024

    - name: Run only on Amazon Linux
      debug:
        msg: "This is an Amazon Linux machine"
      when: ansible_distribution == "Amazon"

    - name: Run only on Ubuntu
      debug:
        msg: "This is an Ubuntu machine"
      when: ansible_distribution == "Ubuntu"

    - name: Run only in production
      debug:
        msg: "Production settings applied"
      when: app_env == "production"

    - name: Multiple conditions (AND)
      debug:
        msg: "Web server with enough memory"
      when:
        - "'web' in group_names"
        - ansible_memtotal_mb >= 512

    - name: OR condition
      debug:
        msg: "Either web or app server"
      when: "'web' in group_names or 'app' in group_names"
```

Run it and observe which tasks are skipped on which hosts.

**Verify:** Are tasks correctly skipping on hosts that don't match the condition?

---

##### Task 5: Loops
Create `loops-demo.yml`:

```yaml
---
- name: Loops demo
  hosts: all
  become: true

  vars:
    users:
      - name: deploy
        groups: wheel
      - name: monitor
        groups: wheel
      - name: appuser
        groups: users

    directories:
      - /opt/app/logs
      - /opt/app/config
      - /opt/app/data
      - /opt/app/tmp

  tasks:
    - name: Create multiple users
      user:
        name: "{{ item.name }}"
        groups: "{{ item.groups }}"
        state: present
      loop: "{{ users }}"

    - name: Create multiple directories
      file:
        path: "{{ item }}"
        state: directory
        mode: '0755'
      loop: "{{ directories }}"

    - name: Install multiple packages
      yum:
        name: "{{ item }}"
        state: present
      loop:
        - git
        - curl
        - unzip
        - jq

    - name: Print each user created
      debug:
        msg: "Created user {{ item.name }} in group {{ item.groups }}"
      loop: "{{ users }}"
```

Run it and observe the loop output -- each iteration is shown separately.

**Document:** What is the difference between `loop` and the older `with_items`? (hint: `loop` is the modern recommended syntax)

---

##### Task 6: Register, Debug, and Combine Everything
Build a real-world playbook `server-report.yml` that combines variables, facts, conditionals, and register:

```yaml
---
- name: Server Health Report
  hosts: all

  tasks:
    - name: Check disk space
      command: df -h /
      register: disk_result

    - name: Check memory
      command: free -m
      register: memory_result

    - name: Check running services
      shell: systemctl list-units --type=service --state=running | head -20
      register: services_result

    - name: Generate report
      debug:
        msg:
          - "========== {{ inventory_hostname }} =========="
          - "OS: {{ ansible_distribution }} {{ ansible_distribution_version }}"
          - "IP: {{ ansible_default_ipv4.address }}"
          - "RAM: {{ ansible_memtotal_mb }}MB"
          - "Disk: {{ disk_result.stdout_lines[1] }}"
          - "Running services (first 20): {{ services_result.stdout_lines | length }}"

    - name: Flag if disk is critically low
      debug:
        msg: "ALERT: Check disk space on {{ inventory_hostname }}"
      when: "'9[0-9]%' in disk_result.stdout or '100%' in disk_result.stdout"

    - name: Save report to file
      copy:
        content: |
          Server: {{ inventory_hostname }}
          OS: {{ ansible_distribution }} {{ ansible_distribution_version }}
          IP: {{ ansible_default_ipv4.address }}
          RAM: {{ ansible_memtotal_mb }}MB
          Disk: {{ disk_result.stdout }}
          Checked at: {{ ansible_date_time.iso8601 }}
        dest: "/tmp/server-report-{{ inventory_hostname }}.txt"
      become: true
```

Run it and verify the report file is created on each server.

**Verify:** SSH into a server and read `/tmp/server-report-*.txt`. Does it contain accurate information?

---

#### Hints
- Variable precedence (simplified, low to high): role defaults -> group_vars/all -> group_vars/<group> -> host_vars/<host> -> playbook vars -> task vars -> extra vars (`-e`)
- `group_names` is a built-in variable containing the groups the current host belongs to
- `inventory_hostname` is the name of the host as defined in the inventory
- `when` conditions do not need `{{ }}` -- you reference variables directly: `when: app_env == "production"`
- `register` stores the entire result object including `stdout`, `stderr`, `rc` (return code), and `stdout_lines`
- `loop` replaces `with_items`, `with_dict`, `with_file` from older Ansible versions
- Use `ansible <host> -m setup -a "filter=<pattern>"` to quickly find fact names
- `debug` with `var` shows the raw variable, `msg` shows a formatted string

---

#### Documentation
Create `day-70-variables-loops.md` with:
- Your `group_vars/` and `host_vars/` directory structure
- How variable precedence works with examples from your test
- Five useful Ansible facts and where you would use them
- Conditional playbook with screenshot showing skipped vs executed tasks
- Loop playbook with screenshot showing multiple iterations
- The server report output from Task 6

---

#### Submission
1. Add `day-70-variables-loops.md` to `2026/day-70/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Made Ansible playbooks smart today -- variables from group_vars and host_vars, OS-based conditionals, loops for bulk operations, and facts-driven server reports. Same playbook, different behavior per host. This is how real configuration management works."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 70 -- Variables, Facts, Conditionals and Loops — Notes & Solution

#### Task
Your playbooks work, but they are static -- same packages, same config, same behavior on every server. Real infrastructure is not like that. Web servers need Nginx, app servers need Node.js, production gets more memory than dev. Today you make your playbooks smart.

Variables, facts, conditionals, and loops turn a rigid script into flexible automation that adapts to each host, each group, and each environment.

---

#### Challenge Tasks

##### Task 1: Variables in Playbooks
Create `variables-demo.yml`:

```yaml
---
- name: Variable demo
  hosts: all
  become: true

  vars:
    app_name: terraweek-app
    app_port: 8080
    app_dir: "/opt/{{ app_name }}"
    packages:
      - git
      - curl
      - wget

  tasks:
    - name: Print app details
      debug:
        msg: "Deploying {{ app_name }} on port {{ app_port }} to {{ app_dir }}"

    - name: Create application directory
      file:
        path: "{{ app_dir }}"
        state: directory
        mode: '0755'

    - name: Install required packages
      yum:
        name: "{{ packages }}"
        state: present
```

Run it and verify the variables resolve correctly.

<img width="1072" height="618" alt="image" src="https://github.com/user-attachments/assets/a9bf92b0-6b7d-4df8-9dd6-09e82f9fbb40" />

Now, override a variable from the command line:
```bash
ansible-playbook variables-demo.yml -e "app_name=my-custom-app app_port=9090"
```

**Verify:** Does the CLI variable override the playbook variable?

- Yes

<img width="1095" height="564" alt="image" src="https://github.com/user-attachments/assets/13c2f07d-7fe1-455f-b7ca-802e41a8ba98" />

---

##### Task 2: group_vars and host_vars
Variables should not live inside playbooks. Move them to dedicated files.

Create this structure:
```
ansible-practice/
  inventory.ini
  ansible.cfg
  group_vars/
    all.yml
    web.yml
    db.yml
  host_vars/
    web-server.yml
  playbooks/
    site.yml
```

**`group_vars/all.yml`** -- applies to every host:
```yaml
---
ntp_server: pool.ntp.org
app_env: development
common_packages:
  - vim
  - htop
  - tree
```

**`group_vars/web.yml`** -- applies only to the web group:
```yaml
---
http_port: 80
max_connections: 1000
web_packages:
  - nginx
```

**`group_vars/db.yml`** -- applies only to the db group:
```yaml
---
db_port: 3306
db_packages:
  - mysql-server
```

**`host_vars/web-server.yml`** -- applies only to this specific host:
```yaml
---
max_connections: 2000
custom_message: "This is the primary web server"
```

Write a playbook `site.yml` that uses these variables:
```yaml
---
- name: Apply common config
  hosts: all
  become: true
  tasks:
    - name: Install common packages
      yum:
        name: "{{ common_packages }}"
        state: present
    - name: Show environment
      debug:
        msg: "Environment: {{ app_env }}"

- name: Configure web servers
  hosts: web
  become: true
  tasks:
    - name: Show web config
      debug:
        msg: "HTTP port: {{ http_port }}, Max connections: {{ max_connections }}"
    - name: Show host-specific message
      debug:
        msg: "{{ custom_message }}"
```

<img width="1109" height="804" alt="image" src="https://github.com/user-attachments/assets/b84ec42b-f4f7-466b-9e83-ca275a4a6343" />

Run it and observe which variables apply to which hosts.

- `Observations:`
  - `app_env` applied to all hosts
  - `http_port` only web group
  - `db_port` only db group
  - `custom_message` only web-server
  - `max_connections` came from group_vars
  
**Document:** What is the variable precedence? (hint: host_vars > group_vars > playbook vars, and `-e` overrides everything)

 - `host_vars` > `group_vars` > `playbook vars`, and `-e` overrides everything

---

##### Task 3: Ansible Facts -- Gathering System Information
Ansible automatically collects "facts" about each managed node -- OS, IP, memory, CPU, disks, and hundreds more.

1. **See all facts for a host:**
```bash
ansible web-server -m setup
```

<img width="762" height="770" alt="image" src="https://github.com/user-attachments/assets/70b41489-aa9e-4757-9010-af71e2bbb0dc" />

2. **Filter specific facts:**
```bash
ansible web-server -m setup -a "filter=ansible_os_family"
ansible web-server -m setup -a "filter=ansible_distribution*"
ansible web-server -m setup -a "filter=ansible_memtotal_mb"
ansible web-server -m setup -a "filter=ansible_default_ipv4"
```

<img width="877" height="819" alt="image" src="https://github.com/user-attachments/assets/ec3c38de-2386-4793-a9be-a2432aab90c7" />

3. **Use facts in a playbook** -- create `facts-demo.yml`:
```yaml
---
- name: Facts demo
  hosts: all
  tasks:
    - name: Show OS info
      debug:
        msg: >
          Hostname: {{ ansible_hostname }},
          OS: {{ ansible_distribution }} {{ ansible_distribution_version }},
          RAM: {{ ansible_memtotal_mb }}MB,
          IP: {{ ansible_default_ipv4.address }}

    - name: Show all network interfaces
      debug:
        var: ansible_interfaces
```

Run it and observe the facts printed for each host.

<img width="883" height="767" alt="image" src="https://github.com/user-attachments/assets/04f2ece4-3502-4e1b-bcc6-6f7e32cc16cb" />

**Document:** Name five facts you would use in real playbooks and why.

- `ansible_hostname` to identify the host and use it in configs/logs
- `ansible_default_ipv4.address` to get the primary IP for networking tasks
- `ansible_os_family` to apply OS-specific tasks (e.g., RedHat vs Debian)
- `ansible_distribution` to handle version-specific package installs
- `ansible_mounts` determine available disk space dynamically

---

##### Task 4: Conditionals with when
Tasks should not always run on every host. Use `when` to control execution.

Create `conditional-demo.yml`:

```yaml
---
- name: Conditional tasks demo
  hosts: all
  become: true

  tasks:
    - name: Install Nginx (only on web servers)
      yum:
        name: nginx
        state: present
      when: "'web' in group_names"

    - name: Install MySQL (only on db servers)
      yum:
        name: mysql-server
        state: present
      when: "'db' in group_names"

    - name: Show warning on low memory hosts
      debug:
        msg: "WARNING: This host has less than 1GB RAM"
      when: ansible_memtotal_mb < 1024

    - name: Run only on Amazon Linux
      debug:
        msg: "This is an Amazon Linux machine"
      when: ansible_distribution == "Amazon"

    - name: Run only on Ubuntu
      debug:
        msg: "This is an Ubuntu machine"
      when: ansible_distribution == "Ubuntu"

    - name: Run only in production
      debug:
        msg: "Production settings applied"
      when: app_env == "production"

    - name: Multiple conditions (AND)
      debug:
        msg: "Web server with enough memory"
      when:
        - "'web' in group_names"
        - ansible_memtotal_mb >= 512

    - name: OR condition
      debug:
        msg: "Either web or app server"
      when: "'web' in group_names or 'app' in group_names"
```

Run it and observe which tasks are skipped on which hosts.

- Observation

  - `Nginx installation` – skipped on db-server and app-server; runs on web-server.
  - `MariaDB installation` – skipped on web-server and app-server; runs on db-server.
  - `Low memory warning` – runs on all hosts.
  - `Amazon Linux check` – runs on all hosts.
  - `Ubuntu check` – skipped on all hosts.
  - `Production check` – skipped on all hosts.
  - `Multiple conditions (AND)` – runs only on web-server.
  -  `OR condition` – runs on web-server and app-server; skipped on db-server.

  <img width="836" height="762" alt="image" src="https://github.com/user-attachments/assets/a5fc1c25-6b2d-421c-b596-ac0f40cd25bc" />

**Verify:** Are tasks correctly skipping on hosts that don't match the condition?

- Yes
   
---

##### Task 5: Loops
Create `loops-demo.yml`:

```yaml
---
- name: Loops demo
  hosts: all
  become: true

  vars:
    users:
      - name: deploy
        groups: wheel
      - name: monitor
        groups: wheel
      - name: appuser
        groups: users

    directories:
      - /opt/app/logs
      - /opt/app/config
      - /opt/app/data
      - /opt/app/tmp

  tasks:
    - name: Create multiple users
      user:
        name: "{{ item.name }}"
        groups: "{{ item.groups }}"
        state: present
      loop: "{{ users }}"

    - name: Create multiple directories
      file:
        path: "{{ item }}"
        state: directory
        mode: '0755'
      loop: "{{ directories }}"

    - name: Install multiple packages
      yum:
        name: "{{ item }}"
        state: present
      loop:
        - git
        - curl
        - unzip
        - jq

    - name: Print each user created
      debug:
        msg: "Created user {{ item.name }} in group {{ item.groups }}"
      loop: "{{ users }}"
```

Run it and observe the loop output -- each iteration is shown separately.

<img width="767" height="749" alt="image" src="https://github.com/user-attachments/assets/77452070-6958-46dc-a612-121c723aa285" />

<img width="865" height="660" alt="image" src="https://github.com/user-attachments/assets/9cd9dd57-a8eb-44a4-b6b7-d63a2cd4473e" />

**Document:** What is the difference between `loop` and the older `with_items`? (hint: `loop` is the modern recommended syntax)

- `with_items` is the old looping syntax

  ```
  - name: Install packages
  yum:
    name: "{{ item }}"
    state: present
  with_items:
    - nginx
    - git
  ```

- `loop` is the modern recommended syntax

```
- name: Install packages
  yum:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - git
```

---

##### Task 6: Register, Debug, and Combine Everything
Build a real-world playbook `server-report.yml` that combines variables, facts, conditionals, and register:

```yaml
---
- name: Server Health Report
  hosts: all

  tasks:
    - name: Check disk space
      command: df -h /
      register: disk_result

    - name: Check memory
      command: free -m
      register: memory_result

    - name: Check running services
      shell: systemctl list-units --type=service --state=running | head -20
      register: services_result

    - name: Generate report
      debug:
        msg:
          - "========== {{ inventory_hostname }} =========="
          - "OS: {{ ansible_distribution }} {{ ansible_distribution_version }}"
          - "IP: {{ ansible_default_ipv4.address }}"
          - "RAM: {{ ansible_memtotal_mb }}MB"
          - "Disk: {{ disk_result.stdout_lines[1] }}"
          - "Running services (first 20): {{ services_result.stdout_lines | length }}"

    - name: Flag if disk is critically low
      debug:
        msg: "ALERT: Check disk space on {{ inventory_hostname }}"
      when: "'9[0-9]%' in disk_result.stdout or '100%' in disk_result.stdout"

    - name: Save report to file
      copy:
        content: |
          Server: {{ inventory_hostname }}
          OS: {{ ansible_distribution }} {{ ansible_distribution_version }}
          IP: {{ ansible_default_ipv4.address }}
          RAM: {{ ansible_memtotal_mb }}MB
          Disk: {{ disk_result.stdout }}
          Checked at: {{ ansible_date_time.iso8601 }}
        dest: "/tmp/server-report-{{ inventory_hostname }}.txt"
      become: true
```

Run it and verify the report file is created on each server.

<img width="936" height="767" alt="image" src="https://github.com/user-attachments/assets/35f07afc-a9fd-47d4-a5f4-543c035c6838" />

**Verify:** SSH into a server and read `/tmp/server-report-*.txt`. Does it contain accurate information?

- Yes

<img width="1120" height="753" alt="image" src="https://github.com/user-attachments/assets/0d7c28ce-129b-4812-a085-6f371eb846a5" />
<img width="1097" height="450" alt="image" src="https://github.com/user-attachments/assets/691aefa5-5f69-4613-9b6e-67319b7d2bb7" />

- Variable precedence (simplified, low to high):
   
  - role defaults -> group_vars/all -> group_vars/ -> host_vars/ -> playbook vars -> task vars -> extra vars (`-e`)

- How variable precedence works with examples from your test

  - `host_vars` > `group_vars` > `group_vars/all`

- `group_vars`/ and `host_vars`/ directory structure
<img width="655" height="353" alt="image" src="https://github.com/user-attachments/assets/726acddc-18f3-4f15-a5ac-ad6347685cea" />

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the DR report with measured RTO/RPO. | You can demonstrate, without notes: *harden and test resilience of the capstone environment* — with evidence committed to `day-70/`. |
| 2 | List 10 cost optimisations applied. | You can demonstrate, without notes: *perform a disaster-recovery exercise and cost review* — with evidence committed to `day-70/`. |
| 3 | Self-review against Well-Architected pillars. | You can demonstrate, without notes: *produce portfolio-quality documentation* — with evidence committed to `day-70/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Restore takes too long | Automate and rehearse; consider replicas/PITR. |
| Findings overwhelming | Prioritise public exposure, IAM wildcards, unencrypted data. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Evidence matters: keep screenshots/logs of remediation; delete lab resources afterwards.
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

1. What are RTO/RPO?
2. How do you verify DR?
3. How do you review cloud security?
4. How do you present cost?
5. **Scenario:** The CFO wants to know the monthly cost of prod, how fast we recover from region failure, and what protects customer data. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I prove recovery? | ☐ | ☐ | ☐ | ☐ |
| Are docs interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Is the lab destroyed? | ☐ | ☐ | ☐ | ☐ |
| Harden and test resilience of the capstone environment | ☐ | ☐ | ☐ | ☐ |
| Perform a disaster-recovery exercise and cost review | ☐ | ☐ | ☐ | ☐ |
| Produce portfolio-quality documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-70/` in your own repository:

```text
day-70/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-70
git add day-70/
git commit -m "day-70: capstone 2 (part 3/3)"
git push -u origin day-70
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 2 v1.0.0 with DR report, cost report, runbooks.

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

[← Day 69](../day-69/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 71 →](../day-71/README.md)
