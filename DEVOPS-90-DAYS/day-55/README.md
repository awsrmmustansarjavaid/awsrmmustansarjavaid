# Day 55 — AWS Observability & FinOps: CloudWatch, CloudTrail, Budgets & Cost Optimisation

[← Day 54](../day-54/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 56 →](../day-56/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 8 — Cloud Engineering: AWS & Azure |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Monitor AWS resources with CloudWatch metrics, logs and alarms
- [ ] Audit with CloudTrail
- [ ] Apply FinOps basics

## 2. Prerequisites

- Days 50-54.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 CloudWatch

Metrics, Logs, Alarms, Dashboards, Logs Insights queries, Agent for memory/disk metrics, EventBridge for automation.

### 3.2 Audit and security

CloudTrail (who did what), Config (what changed), GuardDuty (threat detection), Security Hub.

### 3.3 FinOps

Inform -> Optimise -> Operate. Tagging, Cost Explorer, Budgets, anomaly detection, rightsizing, Savings Plans, shutting down idle resources, storage lifecycle.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create CloudWatch alarm on CPU and notify via SNS email.
2. [ ] Install CloudWatch Agent; ship app log; query with Logs Insights.
3. [ ] Use CloudTrail to find who terminated an instance.
4. [ ] Enable Cost Anomaly Detection; build Cost Explorer view by tag.
5. [ ] Write a script to find unattached EBS volumes and unused Elastic IPs.

## 5. Real-World Scenario

> The AWS bill grew 40% month over month. Identify the top 3 cost drivers and propose savings with estimated impact.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws cloudwatch put-metric-alarm --alarm-name cpu-high --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanThreshold --evaluation-periods 2 --alarm-actions $SNS_ARN --dimensions Name=InstanceId,Value=$ID
aws logs start-query --log-group-name /lab/app --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) --query-string 'fields @timestamp,@message | filter @message like /ERROR/ | limit 20'
aws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[].VolumeId'
aws ce get-cost-and-usage --time-period Start=2026-10-01,End=2026-11-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a FinOps weekly checklist. | You can demonstrate, without notes: *monitor AWS resources with CloudWatch metrics, logs and alarms* — with evidence committed to `day-55/`. |
| 2 | Build a CloudWatch dashboard. | You can demonstrate, without notes: *audit with CloudTrail* — with evidence committed to `day-55/`. |
| 3 | Document 10 cost-saving actions with risk. | You can demonstrate, without notes: *apply FinOps basics* — with evidence committed to `day-55/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Alarm stuck INSUFFICIENT_DATA | Wrong dimension/namespace or no data; verify metric exists. |
| Cannot find who deleted | CloudTrail event history only 90 days; use trail to S3. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Turn on CloudTrail org-wide, protect log bucket, GuardDuty on, alert on root login and IAM changes.
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

1. Metrics vs logs vs traces?
2. CloudWatch vs CloudTrail?
3. What is FinOps?
4. How do you find waste?
5. **Scenario:** The AWS bill grew 40% month over month. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create alarms? | ☐ | ☐ | ☐ | ☐ |
| Can I audit actions? | ☐ | ☐ | ☐ | ☐ |
| Can I find cost waste? | ☐ | ☐ | ☐ | ☐ |
| Monitor AWS resources with CloudWatch metrics, logs and alarms | ☐ | ☐ | ☐ | ☐ |
| Audit with CloudTrail | ☐ | ☐ | ☐ | ☐ |
| Apply FinOps basics | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-55/` in your own repository:

```text
day-55/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-55
git add day-55/
git commit -m "day-55: aws observability & finops"
git push -u origin day-55
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

[← Day 54](../day-54/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 56 →](../day-56/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-55/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
