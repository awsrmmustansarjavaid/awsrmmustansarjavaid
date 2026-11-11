# Day 66 — Ansible: Variables, Facts, Conditionals, Loops & Jinja2 Templates

[← Day 65](../day-65/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 67 →](../day-67/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-70` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use variable precedence and facts effectively
- [ ] Control flow with `when`, `loop`, `with_items`
- [ ] Render configs with Jinja2 templates

## 2. Prerequisites

- Day 65.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Variables

group_vars/host_vars, play vars, `-e` extra vars (highest precedence), `vars_files`, `set_fact`, `register`. Know precedence to avoid surprises.

### 3.2 Conditionals and loops

`when: ansible_os_family == 'Debian'`, `loop: "{{ list }}"`, `loop_control`, `until/retries/delay`.

### 3.3 Templates

Jinja2: `{{ var }}`, `{% for %}`, `{% if %}`, filters (`default`, `join`, `to_nice_yaml`). Produce nginx/app configs from variables.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `group_vars/web.yml` and `host_vars/web1.yml`.
2. [ ] Use `when` to support both Ubuntu and RHEL package names.
3. [ ] Loop over a list of users and packages.
4. [ ] Template `app.conf.j2` using facts (`ansible_memtotal_mb`).
5. [ ] Use `until` to wait for a service to be ready.

## 5. Real-World Scenario

> Same playbook must configure prod (tuned) and dev (small) with different worker counts and memory settings automatically.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
- name: Install packages
  ansible.builtin.package: { name: "{{ item }}", state: present }
  loop: "{{ common_packages }}"
- name: Wait for app
  ansible.builtin.uri: { url: "http://localhost:8000/health" }
  register: r
  until: r.status == 200
  retries: 10
  delay: 3
# app.conf.j2
workers = {{ [ansible_processor_vcpus * 2, 8] | min }}
{% for u in upstreams %}server {{ u }};{% endfor %}
ansible-playbook site.yml -e env=prod
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document variable precedence in your own words. | You can demonstrate, without notes: *use variable precedence and facts effectively* — with evidence committed to `day-66/`. |
| 2 | Create template with conditionals. | You can demonstrate, without notes: *control flow with `when`, `loop`, `with_items`* — with evidence committed to `day-66/`. |
| 3 | Dump facts to JSON and extract 5 useful ones. | You can demonstrate, without notes: *render configs with Jinja2 templates* — with evidence committed to `day-66/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `undefined variable` | Define it or use `| default()`. |
| Template renders blank | Check var names and `ansible -m debug -a var=x`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Don't store secrets in vars files; use Vault; avoid logging sensitive values.
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

1. Variable precedence?
2. What are facts?
3. How do you loop?
4. What is Jinja2?
5. **Scenario:** Same playbook must configure prod (tuned) and dev (small) with different worker counts and memory settings automatically. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I template a config? | ☐ | ☐ | ☐ | ☐ |
| Can I use conditionals? | ☐ | ☐ | ☐ | ☐ |
| Can I use facts? | ☐ | ☐ | ☐ | ☐ |
| Use variable precedence and facts effectively | ☐ | ☐ | ☐ | ☐ |
| Control flow with `when`, `loop`, `with_items` | ☐ | ☐ | ☐ | ☐ |
| Render configs with Jinja2 templates | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-66/` in your own repository:

```text
day-66/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-66
git add day-66/
git commit -m "day-66: ansible"
git push -u origin day-66
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

[← Day 65](../day-65/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 67 →](../day-67/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-66/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
