# Day 65 — Ansible Playbooks, Modules, Handlers & Idempotency

[← Day 64](../day-64/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 66 →](../day-66/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-69` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a playbook to create users and SSH keys. | You can demonstrate, without notes: *write multi-task playbooks* — with evidence committed to `day-65/`. |
| 2 | Document idempotency rules for `command/shell`. | You can demonstrate, without notes: *use handlers, tags, check mode and error handling* — with evidence committed to `day-65/`. |
| 3 | Add tags (`--tags config`). | You can demonstrate, without notes: *lint playbooks with ansible-lint* — with evidence committed to `day-65/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Handler didn't run | Task reported `ok` not `changed`, or handler name mismatch. |
| YAML syntax error | Indentation; run `ansible-playbook --syntax-check`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** `no_log: true` for secrets; validate config before reload; avoid shell with untrusted vars.
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

1. What are handlers?
2. How do you ensure idempotency?
3. What is `serial`?
4. `command` vs `shell`?
5. **Scenario:** Rolling-update 20 web servers 2 at a time, stop automatically if health check fails. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 64](../day-64/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 66 →](../day-66/README.md)
