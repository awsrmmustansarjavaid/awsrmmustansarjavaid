# Day 68 — Terraform + Ansible Together: Provision, Configure & Dynamic Inventory

[← Day 67](../day-67/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 69 →](../day-69/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 10 — Ansible & Capstone 2 (finish) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-72` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a decision note: Ansible vs Packer vs user-data. | You can demonstrate, without notes: *hand off from Terraform to Ansible cleanly* — with evidence committed to `day-68/`. |
| 2 | Draw the provisioning flow diagram. | You can demonstrate, without notes: *use `aws_ec2` dynamic inventory* — with evidence committed to `day-68/`. |
| 3 | Add health verification after configuration. | You can demonstrate, without notes: *prefer immutable images where appropriate* — with evidence committed to `day-68/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Inventory empty | Tags/filters/credentials/region wrong. |
| SSH unreachable in private subnet | Use bastion ProxyJump or SSM connection. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Avoid public SSH; use SSM; encrypt state/outputs with sensitive data; restrict tags used for targeting.
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

1. Terraform vs Ansible roles?
2. What is dynamic inventory?
3. Mutable vs immutable?
4. How to avoid provisioner misuse?
5. **Scenario:** Scale-out adds 5 servers automatically; they must be configured identically within minutes without manual inventory edits. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 67](../day-67/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 69 →](../day-69/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-68/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
