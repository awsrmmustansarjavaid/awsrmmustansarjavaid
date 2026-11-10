# Day 67 — Ansible Roles, Collections, Galaxy & Vault

[← Day 66](../day-66/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 68 →](../day-68/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-71` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Structure automation as roles
- [ ] Use collections and requirements files
- [ ] Encrypt secrets with Ansible Vault

## 2. Prerequisites

- Days 64-66.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Roles

Standard structure: `tasks/ handlers/ templates/ files/ defaults/ vars/ meta/`. `ansible-galaxy init`. Keep roles single-purpose and parameterised via `defaults`.

### 3.2 Collections and Galaxy

`requirements.yml` pins collections/roles (`community.docker`, `amazon.aws`). Version-lock them.

### 3.3 Vault

`ansible-vault encrypt/edit/view`, vault IDs, `--ask-vault-pass` or password file; encrypt strings with `encrypt_string`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create roles `common`, `nginx`, `docker`, `app`.
2. [ ] Write `site.yml` composing roles for groups.
3. [ ] Install a collection via `requirements.yml`.
4. [ ] Encrypt DB password with Vault and use in role.
5. [ ] Test a role with Molecule (docker driver) or simple playbook tests.

## 5. Real-World Scenario

> Teams are copy-pasting playbooks. Create versioned roles and a collection so every team reuses the same hardened baseline.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ansible-galaxy init roles/nginx
ansible-galaxy install -r requirements.yml
ansible-vault create group_vars/all/vault.yml
ansible-vault encrypt_string 's3cr3t' --name db_password
ansible-playbook site.yml --vault-password-file ~/.vault_pass
molecule init scenario -r nginx -d docker && molecule test
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write role README with variables table. | You can demonstrate, without notes: *structure automation as roles* — with evidence committed to `day-67/`. |
| 2 | Add CI job for ansible-lint + molecule. | You can demonstrate, without notes: *use collections and requirements files* — with evidence committed to `day-67/`. |
| 3 | Create a hardening role (SSH, fail2ban, unattended-upgrades) based on Day 13. | You can demonstrate, without notes: *encrypt secrets with Ansible Vault* — with evidence committed to `day-67/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Role not found | Check `roles_path`/relative path/requirements install. |
| Vault decrypt fails | Wrong password/ID or corrupted file. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never commit vault passwords; rotate with `ansible-vault rekey`; limit who can read vault keys.
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

1. Role structure?
2. Why pin collection versions?
3. How does Vault work?
4. How do you test roles?
5. **Scenario:** Teams are copy-pasting playbooks. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a reusable role? | ☐ | ☐ | ☐ | ☐ |
| Can I encrypt secrets? | ☐ | ☐ | ☐ | ☐ |
| Can I test automation? | ☐ | ☐ | ☐ | ☐ |
| Structure automation as roles | ☐ | ☐ | ☐ | ☐ |
| Use collections and requirements files | ☐ | ☐ | ☐ | ☐ |
| Encrypt secrets with Ansible Vault | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-67/` in your own repository:

```text
day-67/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-67
git add day-67/
git commit -m "day-67: ansible roles, collections, galaxy & vault"
git push -u origin day-67
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

[← Day 66](../day-66/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 68 →](../day-68/README.md)
