# Day 64 — Ansible: Introduction, Inventory & Ad-hoc Commands

[← Day 63](../day-63/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 65 →](../day-65/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-68` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create `ansible.cfg` with sane defaults. | You can demonstrate, without notes: *explain agentless configuration management* — with evidence committed to `day-64/`. |
| 2 | Write a note: idempotent vs non-idempotent modules (`command` vs `apt`). | You can demonstrate, without notes: *build static and dynamic inventories* — with evidence committed to `day-64/`. |
| 3 | Use `--check --diff`. | You can demonstrate, without notes: *run ad-hoc commands and understand idempotency* — with evidence committed to `day-64/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `UNREACHABLE` SSH error | Key/user/host key/security group; test plain `ssh` first. |
| `Permission denied` on install | Add `-b` (become) and sudo rights. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use SSH keys, avoid `host_key_checking=False` in prod, least-privilege sudo, Vault for secrets.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 10. Daily Completion Checklist

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

## 11. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 12. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. Agentless meaning?
2. What is idempotency?
3. What is an inventory?
4. Ansible vs Terraform?
5. **Scenario:** You must patch 40 servers tonight. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 63](../day-63/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 65 →](../day-65/README.md)
