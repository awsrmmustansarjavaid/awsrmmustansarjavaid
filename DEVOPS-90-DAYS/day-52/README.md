# Day 52 — AWS Networking: VPC, Subnets, Routing, NAT & Security Groups

[← Day 51](../day-51/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 53 →](../day-53/README.md)

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

- [ ] Design and build a VPC by hand
- [ ] Understand public vs private subnets, IGW and NAT
- [ ] Control traffic with SGs and NACLs

## 2. Prerequisites

- Days 8-10, 50-51.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 VPC anatomy

CIDR block, subnets per AZ, route tables, Internet Gateway (public), NAT Gateway (outbound for private), VPC endpoints (private access to AWS services).

### 3.2 Controls

Security Groups: stateful, allow-only, attach to ENIs. NACLs: stateless, subnet-level allow/deny. Flow Logs for visibility.

### 3.3 Design pattern

3 tiers: public (ALB), private app, isolated data. Multi-AZ for resilience; NAT per AZ for HA (costly - cost trade-off!).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create VPC 10.0.0.0/16 with 2 public and 2 private subnets in 2 AZs.
2. [ ] Attach IGW and public route table; private route via NAT (or NAT instance for cost).
3. [ ] Launch an instance in each tier; test reachability.
4. [ ] Create SGs: ALB->app->db chain referencing SG IDs.
5. [ ] Enable VPC Flow Logs to CloudWatch/S3 and inspect rejected traffic.

## 5. Real-World Scenario

> The DB subnet must never be reachable from the internet but the app must reach package mirrors. Design and prove it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=lab}]'
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-internet-gateway; aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC
aws ec2 create-route --route-table-id $RT --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW
aws ec2 authorize-security-group-ingress --group-id $APP_SG --protocol tcp --port 8080 --source-group $ALB_SG
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw the VPC diagram (Mermaid/draw.io). | You can demonstrate, without notes: *design and build a VPC by hand* — with evidence committed to `day-52/`. |
| 2 | Estimate monthly NAT cost and propose alternatives (endpoints). | You can demonstrate, without notes: *understand public vs private subnets, IGW and NAT* — with evidence committed to `day-52/`. |
| 3 | Delete everything and record the teardown order. | You can demonstrate, without notes: *control traffic with SGs and NACLs* — with evidence committed to `day-52/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Private instance has no internet | Missing NAT route or NAT in wrong subnet. |
| Cannot SSH | SG/NACL/route/key/public IP check in order. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** No 0.0.0.0/0 to SSH/DB ports; use SSM Session Manager; use SG references; flow logs on.
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

1. Public vs private subnet?
2. SG vs NACL?
3. Why NAT Gateway?
4. What are VPC endpoints?
5. **Scenario:** The DB subnet must never be reachable from the internet but the app must reach package mirrors. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I build a 3-tier VPC? | ☐ | ☐ | ☐ | ☐ |
| Can I explain routing? | ☐ | ☐ | ☐ | ☐ |
| Can I troubleshoot reachability? | ☐ | ☐ | ☐ | ☐ |
| Design and build a VPC by hand | ☐ | ☐ | ☐ | ☐ |
| Understand public vs private subnets, IGW and NAT | ☐ | ☐ | ☐ | ☐ |
| Control traffic with SGs and NACLs | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-52/` in your own repository:

```text
day-52/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-52
git add day-52/
git commit -m "day-52: aws networking"
git push -u origin day-52
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

[← Day 51](../day-51/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 53 →](../day-53/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-52/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
