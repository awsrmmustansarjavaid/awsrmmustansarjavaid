# Day 53 — AWS Compute: EC2, AMIs, EBS, Load Balancers & Auto Scaling

[← Day 52](../day-52/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 54 →](../day-54/README.md)

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

- [ ] Launch and secure EC2 instances
- [ ] Build AMIs and use user-data
- [ ] Place instances behind an ALB with Auto Scaling

## 2. Prerequisites

- Days 50-52.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 EC2

Instance families, sizing, purchase options (On-Demand, Spot, Savings Plans), IMDSv2, instance profiles, EBS volume types (gp3), snapshots.

### 3.2 Elasticity

Launch templates + Auto Scaling Groups + target tracking policies; ALB health checks; multi-AZ placement.

### 3.3 Cost

Right-size, use Graviton/arm64, Spot for fault-tolerant, schedule non-prod off-hours.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Launch t3/t4g instance with a role, IMDSv2 required, no key pair (use SSM).
2. [ ] Use user-data to install nginx and a custom page.
3. [ ] Create a launch template + ASG (min 2) behind an ALB in two AZs.
4. [ ] Terminate an instance and watch the ASG heal.
5. [ ] Attach scaling policy at 50% CPU and generate load.

## 5. Real-World Scenario

> Traffic spikes at 9 AM every day and the single server falls over. Build elasticity and prove it with a load test.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws ec2 run-instances --image-id ami-xxxx --instance-type t4g.micro --iam-instance-profile Name=ssm-role --metadata-options HttpTokens=required --user-data file://userdata.sh
aws ssm start-session --target i-0123456789abcdef0
aws autoscaling create-auto-scaling-group --auto-scaling-group-name web --launch-template LaunchTemplateName=web-lt --min-size 2 --max-size 4 --vpc-zone-identifier "$SUBNETS" --target-group-arns $TG
hey -z 2m -c 50 http://$ALB_DNS/
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a custom AMI via Packer or manual bake. | You can demonstrate, without notes: *launch and secure EC2 instances* — with evidence committed to `day-53/`. |
| 2 | Compare cost of 3 instance types. | You can demonstrate, without notes: *build AMIs and use user-data* — with evidence committed to `day-53/`. |
| 3 | Document ALB health check design. | You can demonstrate, without notes: *place instances behind an ALB with Auto Scaling* — with evidence committed to `day-53/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Targets unhealthy | Health check path/port/SG mismatch. |
| User-data didn't run | Check `/var/log/cloud-init-output.log`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** IMDSv2 only, encrypted EBS, SSM instead of SSH, patch via SSM Patch Manager, minimal instance profile.
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

1. What is an ASG?
2. On-Demand vs Spot vs Savings Plans?
3. Why IMDSv2?
4. How do ALB health checks work?
5. **Scenario:** Traffic spikes at 9 AM every day and the single server falls over. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build an ASG behind ALB? | ☐ | ☐ | ☐ | ☐ |
| Can I prove self-healing? | ☐ | ☐ | ☐ | ☐ |
| Can I choose a cost-efficient instance? | ☐ | ☐ | ☐ | ☐ |
| Launch and secure EC2 instances | ☐ | ☐ | ☐ | ☐ |
| Build AMIs and use user-data | ☐ | ☐ | ☐ | ☐ |
| Place instances behind an ALB with Auto Scaling | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-53/` in your own repository:

```text
day-53/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-53
git add day-53/
git commit -m "day-53: aws compute"
git push -u origin day-53
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

[← Day 52](../day-52/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 54 →](../day-54/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-53/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
