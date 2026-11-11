# Day 84 — Incident Response, Postmortems, Backup/DR & Chaos Engineering

[← Day 83](../day-83/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 85 →](../day-85/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Run an incident with clear roles and communication
- [ ] Write a blameless postmortem with action items
- [ ] Test backups and failure modes (Velero, chaos experiments)

## 2. Prerequisites

- Days 75-83.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Incident management

Roles: incident commander, communications lead, operations lead, scribe. Severity levels, status updates, mitigate first then root-cause. Use runbooks and ChatOps.

### 3.2 Postmortems

Timeline, impact, contributing factors (5 Whys/fault tree), what went well/badly, action items with owners and dates. Blameless.

### 3.3 DR and chaos

Backup is only real if restore is tested. Velero backs up K8s resources/PVs. Chaos experiments (Litmus/Chaos Mesh/pod-kill) validate resilience hypotheses in controlled conditions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Velero (MinIO local) and back up/restore a namespace.
2. [ ] Run a chaos experiment: delete random pods/kill a node under load; observe SLO impact.
3. [ ] Run a tabletop incident with timer and roles; keep a timeline.
4. [ ] Write a complete postmortem using template.
5. [ ] Create action items as GitHub issues with owners.

## 5. Real-World Scenario

> The primary database volume is corrupted at 14:05. Lead the response: communicate, restore from backup, verify integrity and write the postmortem.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
velero install --provider aws --plugins velero/velero-plugin-for-aws --bucket velero --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://minio:9000
velero backup create ns-dev --include-namespaces dev
kubectl delete ns dev && velero restore create --from-backup ns-dev
kubectl delete pod -l app=web --force
gh issue create --title "Action: add restore test" --label postmortem
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create incident template and severity matrix. | You can demonstrate, without notes: *run an incident with clear roles and communication* — with evidence committed to `day-84/`. |
| 2 | Write DR plan with RTO/RPO. | You can demonstrate, without notes: *write a blameless postmortem with action items* — with evidence committed to `day-84/`. |
| 3 | Document chaos hypothesis for 3 experiments. | You can demonstrate, without notes: *test backups and failure modes (Velero, chaos experiments)* — with evidence committed to `day-84/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Restore incomplete | PV snapshots/volume plugin missing; test regularly. |
| Chaos causes outage | Limit blast radius; run in staging first; define abort conditions. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Treat security incidents with evidence preservation; test access to break-glass accounts and backups.
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

1. Roles in an incident?
2. What makes a postmortem blameless?
3. Why test restores?
4. What is chaos engineering?
5. **Scenario:** The primary database volume is corrupted at 14:05. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run an incident? | ☐ | ☐ | ☐ | ☐ |
| Can I restore from backup? | ☐ | ☐ | ☐ | ☐ |
| Can I write a postmortem? | ☐ | ☐ | ☐ | ☐ |
| Run an incident with clear roles and communication | ☐ | ☐ | ☐ | ☐ |
| Write a blameless postmortem with action items | ☐ | ☐ | ☐ | ☐ |
| Test backups and failure modes (Velero, chaos experiments) | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-84/` in your own repository:

```text
day-84/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-84
git add day-84/
git commit -m "day-84: incident response, postmortems, backup/dr & chaos engineerin"
git push -u origin day-84
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Incident templates, postmortem, Velero backup/restore evidence, chaos notes.

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

[← Day 83](../day-83/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 85 →](../day-85/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-84/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
