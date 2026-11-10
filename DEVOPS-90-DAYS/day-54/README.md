# Day 54 — AWS Storage & Databases: S3, EBS/EFS, RDS & Backups

[← Day 53](../day-53/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 55 →](../day-55/README.md)

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

- [ ] Use S3 securely with versioning, lifecycle and encryption
- [ ] Deploy RDS privately with backups
- [ ] Plan backup and restore

## 2. Prerequisites

- Days 50-53.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 S3

Object storage with 11 9s durability. Block Public Access, bucket policies, SSE-S3/KMS, versioning, lifecycle (to IA/Glacier), replication, presigned URLs.

### 3.2 RDS

Managed relational DB: multi-AZ (HA), read replicas (scale), automated backups, point-in-time recovery, parameter groups, subnet groups, Secrets Manager rotation.

### 3.3 Backup

3-2-1 rule; test restores; define RPO/RTO; AWS Backup for central policies.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create an S3 bucket with Block Public Access, versioning, default encryption and lifecycle rule.
2. [ ] Generate a presigned URL and test expiry.
3. [ ] Create RDS (PostgreSQL, free-tier/t4g.micro) in private subnets, SG from app SG only.
4. [ ] Take a snapshot; restore to a new instance.
5. [ ] Connect from EC2 via SSM tunnel.

## 5. Real-World Scenario

> A developer accidentally deleted production objects. Enable controls to recover them and prevent public exposure.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws s3api create-bucket --bucket my-lab-$RANDOM --region us-east-1
aws s3api put-public-access-block --bucket $B --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-versioning --bucket $B --versioning-configuration Status=Enabled
aws s3 presign s3://$B/file.txt --expires-in 300
aws rds create-db-snapshot --db-instance-identifier lab-db --db-snapshot-identifier lab-snap1
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Define RPO/RTO for 3 sample workloads. | You can demonstrate, without notes: *use S3 securely with versioning, lifecycle and encryption* — with evidence committed to `day-54/`. |
| 2 | Write restore runbook and test it. | You can demonstrate, without notes: *deploy RDS privately with backups* — with evidence committed to `day-54/`. |
| 3 | Add lifecycle policy cost estimate. | You can demonstrate, without notes: *plan backup and restore* — with evidence committed to `day-54/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cannot connect to RDS | SG/subnet group/public accessibility and route mismatch. |
| S3 AccessDenied | Bucket policy vs IAM vs Block Public Access vs KMS key policy. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Encrypt everything, block public access, versioning + MFA delete for critical data, private DBs, rotate credentials.
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

1. S3 storage classes?
2. Multi-AZ vs read replica?
3. What are RPO and RTO?
4. How do you secure S3?
5. **Scenario:** A developer accidentally deleted production objects. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I secure S3? | ☐ | ☐ | ☐ | ☐ |
| Can I restore RDS? | ☐ | ☐ | ☐ | ☐ |
| Can I define RPO/RTO? | ☐ | ☐ | ☐ | ☐ |
| Use S3 securely with versioning, lifecycle and encryption | ☐ | ☐ | ☐ | ☐ |
| Deploy RDS privately with backups | ☐ | ☐ | ☐ | ☐ |
| Plan backup and restore | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-54/` in your own repository:

```text
day-54/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-54
git add day-54/
git commit -m "day-54: aws storage & databases"
git push -u origin day-54
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

[← Day 53](../day-53/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 55 →](../day-55/README.md)
