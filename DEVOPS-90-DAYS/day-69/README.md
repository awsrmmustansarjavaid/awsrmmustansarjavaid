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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Time full rebuild and document. | You can demonstrate, without notes: *configure the capstone environment with Ansible roles* — with evidence committed to `day-69/`. |
| 2 | Write patching runbook (SSM Patch Manager or Ansible). | You can demonstrate, without notes: *deploy the Capstone 1 app onto infrastructure* — with evidence committed to `day-69/`. |
| 3 | Add drift detection scheduled workflow. | You can demonstrate, without notes: *automate provisioning and configuration in a pipeline* — with evidence committed to `day-69/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Pipeline too long | Cache providers, parallelise lint/scan. |
| Ansible fails mid-run | Idempotent re-run; use `--start-at-task` and fix root cause. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Separate duties: plan role vs apply role; approvals for prod; secrets via Vault/SSM; encrypted volumes.
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

1. How do you combine IaC and CM in CI?
2. How do you ensure prod parity?
3. How do you rebuild after disaster?
4. How do you reduce manual steps?
5. **Scenario:** Rebuild the whole environment from scratch in a new account. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 68](../day-68/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 70 →](../day-70/README.md)
