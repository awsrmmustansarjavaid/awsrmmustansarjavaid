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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 54 – Kubernetes ConfigMaps and Secrets — Challenge Brief

#### Task
Your application needs configuration — database URLs, feature flags, API keys. Hardcoding these into container images means rebuilding every time a value changes. Kubernetes solves this with ConfigMaps for non-sensitive config and Secrets for sensitive data.

---

#### Expected Output
- ConfigMaps created from literals and from a file
- Secrets created and consumed in a Pod
- A markdown file: `day-54-configmaps-secrets.md`

---

#### Challenge Tasks

##### Task 1: Create a ConfigMap from Literals
1. Use `kubectl create configmap` with `--from-literal` to create a ConfigMap called `app-config` with keys `APP_ENV=production`, `APP_DEBUG=false`, and `APP_PORT=8080`
2. Inspect it with `kubectl describe configmap app-config` and `kubectl get configmap app-config -o yaml`
3. Notice the data is stored as plain text — no encoding, no encryption

**Verify:** Can you see all three key-value pairs?

---

##### Task 2: Create a ConfigMap from a File
1. Write a custom Nginx config file that adds a `/health` endpoint returning "healthy"
2. Create a ConfigMap from this file using `kubectl create configmap nginx-config --from-file=default.conf=<your-file>`
3. The key name (`default.conf`) becomes the filename when mounted into a Pod

**Verify:** Does `kubectl get configmap nginx-config -o yaml` show the file contents?

---

##### Task 3: Use ConfigMaps in a Pod
1. Write a Pod manifest that uses `envFrom` with `configMapRef` to inject all keys from `app-config` as environment variables. Use a busybox container that prints the values.
2. Write a second Pod manifest that mounts `nginx-config` as a volume at `/etc/nginx/conf.d`. Use the nginx image.
3. Test that the mounted config works: `kubectl exec <pod> -- curl -s http://localhost/health`

Use environment variables for simple key-value settings. Use volume mounts for full config files.

**Verify:** Does the `/health` endpoint respond?

---

##### Task 4: Create a Secret
1. Use `kubectl create secret generic db-credentials` with `--from-literal` to store `DB_USER=admin` and `DB_PASSWORD=s3cureP@ssw0rd`
2. Inspect with `kubectl get secret db-credentials -o yaml` — the values are base64-encoded
3. Decode a value: `echo '<base64-value>' | base64 --decode`

**base64 is encoding, not encryption.** Anyone with cluster access can decode Secrets. The real advantages are RBAC separation, tmpfs storage on nodes, and optional encryption at rest.

**Verify:** Can you decode the password back to plaintext?

---

##### Task 5: Use Secrets in a Pod
1. Write a Pod manifest that injects `DB_USER` as an environment variable using `secretKeyRef`
2. In the same Pod, mount the entire `db-credentials` Secret as a volume at `/etc/db-credentials` with `readOnly: true`
3. Verify: each Secret key becomes a file, and the content is the decoded plaintext value

**Verify:** Are the mounted file values plaintext or base64?

---

##### Task 6: Update a ConfigMap and Observe Propagation
1. Create a ConfigMap `live-config` with a key `message=hello`
2. Write a Pod that mounts this ConfigMap as a volume and reads the file in a loop every 5 seconds
3. Update the ConfigMap: `kubectl patch configmap live-config --type merge -p '{"data":{"message":"world"}}'`
4. Wait 30-60 seconds — the volume-mounted value updates automatically
5. Environment variables from earlier tasks do NOT update — they are set at pod startup only

**Verify:** Did the volume-mounted value change without a pod restart?

---

##### Task 7: Clean Up
Delete all pods, ConfigMaps, and Secrets you created.

---

#### Hints
- `--from-literal=KEY=VALUE` for command-line values, `--from-file=key=filename` for file contents
- `envFrom` injects all keys; `env` with `valueFrom` injects individual keys
- `echo -n 'value' | base64` — always use `-n` to avoid encoding a trailing newline
- Volume-mounted ConfigMaps/Secrets auto-update; environment variables do not
- `kubectl get secret <name> -o jsonpath='{.data.KEY}' | base64 --decode` extracts and decodes a value

---

#### Documentation
Create `day-54-configmaps-secrets.md` with:
- What ConfigMaps and Secrets are and when to use each
- The difference between environment variables and volume mounts
- Why base64 is encoding, not encryption
- How ConfigMap updates propagate to volumes but not env vars

---

#### Submission
1. Add `day-54-configmaps-secrets.md` to `2026/day-54/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes ConfigMaps and Secrets today. Injected config as environment variables and volume mounts, and discovered that base64 encoding is not encryption."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 54 – Kubernetes ConfigMaps and Secrets — Notes & Solution

#### Task
Your application needs configuration — database URLs, feature flags, API keys. Hardcoding these into container images means rebuilding every time a value changes. Kubernetes solves this with ConfigMaps for non-sensitive config and Secrets for sensitive data.

---

#### Challenge Tasks

##### Task 1: Create a ConfigMap from Literals
1. Use `kubectl create configmap` with `--from-literal` to create a ConfigMap called `app-config` with keys `APP_ENV=production`, `APP_DEBUG=false`, and `APP_PORT=8080`
2. Inspect it with `kubectl describe configmap app-config` and `kubectl get configmap app-config -o yaml`
3. Notice the data is stored as plain text — no encoding, no encryption

**Verify:** Can you see all three key-value pairs?

- Yes, all 3 key-value pairs are visible in plain text
- No encoding, no encryption

<img width="1919" height="725" alt="Screenshot 2026-10-08 105110" src="https://github.com/user-attachments/assets/78c822c7-ae27-4e18-91a9-35653237c089" />


---

##### Task 2: Create a ConfigMap from a File
1. Write a custom Nginx config file that adds a `/health` endpoint returning "healthy"
2. Create a ConfigMap from this file using `kubectl create configmap nginx-config --from-file=default.conf=<your-file>`
3. The key name (`default.conf`) becomes the filename when mounted into a Pod

**Verify:** Does `kubectl get configmap nginx-config -o yaml` show the file contents?

- Yes file contents are fully visible in YAML

<img width="1000" height="319" alt="Screenshot 2026-10-08 105143" src="https://github.com/user-attachments/assets/51bb0037-50be-4f90-83ec-8dccf2de0c63" />


---

##### Task 3: Use ConfigMaps in a Pod
1. Write a Pod manifest that uses `envFrom` with `configMapRef` to inject all keys from `app-config` as environment variables. Use a busybox container that prints the values.
2. Write a second Pod manifest that mounts `nginx-config` as a volume at `/etc/nginx/conf.d`. Use the nginx image.
3. Test that the mounted config works: `kubectl exec <pod> -- curl -s http://localhost/health`

Use environment variables for simple key-value settings. Use volume mounts for full config files.

**Verify:** Does the `/health` endpoint respond?

```kubectl exec nginx-config -- curl -s http://localhost/health```

<img width="1573" height="679" alt="Screenshot 2026-10-08 105429" src="https://github.com/user-attachments/assets/0e92f9be-0778-4a86-888a-f7bc62fca307" />
<img width="1150" height="386" alt="Screenshot 2026-10-08 105818" src="https://github.com/user-attachments/assets/2b083301-b803-444e-ad24-6c4b52791998" />
<img width="1420" height="289" alt="Screenshot 2026-10-08 110713" src="https://github.com/user-attachments/assets/e6cd32c5-fc02-44a9-8e49-2863f323ed4b" />


---

##### Task 4: Create a Secret
1. Use `kubectl create secret generic db-credentials` with `--from-literal` to store `DB_USER=admin` and `DB_PASSWORD=s3cureP@ssw0rd`
2. Inspect with `kubectl get secret db-credentials -o yaml` — the values are base64-encoded
3. Decode a value: `echo '<base64-value>' | base64 --decode`

**base64 is encoding, not encryption.** Anyone with cluster access can decode Secrets. The real advantages are RBAC separation, tmpfs storage on nodes, and optional encryption at rest.

**Verify:** Can you decode the password back to plaintext?

- Yes, decode the password back to plaintext
  
<img width="1919" height="578" alt="Screenshot 2026-10-08 111104" src="https://github.com/user-attachments/assets/ba1ca624-0d73-45e1-af4e-6d6be2538236" />


---

##### Task 5: Use Secrets in a Pod
1. Write a Pod manifest that injects `DB_USER` as an environment variable using `secretKeyRef`
2. In the same Pod, mount the entire `db-credentials` Secret as a volume at `/etc/db-credentials` with `readOnly: true`
3. Verify: each Secret key becomes a file, and the content is the decoded plaintext value

**Verify:** Are the mounted file values plaintext or base64?

- Mounted file values planintext
  
<img width="1494" height="524" alt="Screenshot 2026-10-08 111509" src="https://github.com/user-attachments/assets/d5e5cc97-002f-4981-ab38-1caa3f170b09" />

---

##### Task 6: Update a ConfigMap and Observe Propagation
1. Create a ConfigMap `live-config` with a key `message=hello`
2. Write a Pod that mounts this ConfigMap as a volume and reads the file in a loop every 5 seconds
3. Update the ConfigMap: `kubectl patch configmap live-config --type merge -p '{"data":{"message":"world"}}'`
4. Wait 30-60 seconds — the volume-mounted value updates automatically
5. Environment variables from earlier tasks do NOT update — they are set at pod startup only

**Verify:** Did the volume-mounted value change without a pod restart?

- Yes, the volume-mounted value does change without restarting the Pod.

<img width="1919" height="731" alt="Screenshot 2026-10-08 111838" src="https://github.com/user-attachments/assets/b67e71a5-c529-4306-82a7-9756b56a42c1" />


---

##### Task 7: Clean Up
Delete all pods, ConfigMaps, and Secrets you created.

<img width="1090" height="683" alt="Screenshot 2026-10-08 112456" src="https://github.com/user-attachments/assets/e5443995-9a51-4120-afa0-d18ac6487648" />


---

#### Documentation

**What ConfigMaps and Secrets are and when to use each**

- `ConfigMap` stores non-sensitive data (e.g., config, URLs)
- `Secret` stores sensitive data (e.g., passwords, tokens)
-  Secrets use base64 (not secure by itself)

**The difference between environment variables and volume mounts**

`Environment Variables:`
- Injected at Pod startup
- Do NOT update if ConfigMap/Secret changes

`Volume Mounts:`
- Data is available as files inside container
- Auto-updates (after ~30–60 seconds)

**Why base64 is encoding, not encryption**

- Base64 is just encoding, not secure
- It can be easily decoded by anyone (no key needed)
- In `Kubernetes Secrets:`
  - Data is base64 only for safe storage in YAML
  - Anyone with access can decode it

**How ConfigMap updates propagate to volumes but not env vars**

- `ConfigMap as volume` updates automatically without restart
- `ConfigMap as env var` stays same until Pod restart

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes ConfigMaps and Secrets today. Injected config as environment variables and volume mounts, and discovered that base64 encoding is not encryption."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Define RPO/RTO for 3 sample workloads. | You can demonstrate, without notes: *use S3 securely with versioning, lifecycle and encryption* — with evidence committed to `day-54/`. |
| 2 | Write restore runbook and test it. | You can demonstrate, without notes: *deploy RDS privately with backups* — with evidence committed to `day-54/`. |
| 3 | Add lifecycle policy cost estimate. | You can demonstrate, without notes: *plan backup and restore* — with evidence committed to `day-54/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Cannot connect to RDS | SG/subnet group/public accessibility and route mismatch. |
| S3 AccessDenied | Bucket policy vs IAM vs Block Public Access vs KMS key policy. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Encrypt everything, block public access, versioning + MFA delete for critical data, private DBs, rotate credentials.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

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

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. S3 storage classes?
2. Multi-AZ vs read replica?
3. What are RPO and RTO?
4. How do you secure S3?
5. **Scenario:** A developer accidentally deleted production objects. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 54: Monitoring Serverless Applications

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 54** of the DevOps 90-Day Challenge!
Today, we focus on **Operational Visibility**: Monitoring. Since you cannot SSH into a Lambda function, you need robust tools to know if your application is healthy.

[![](https://img.youtube.com/vi/-GljcEP5PgM/0.jpg)](https://www.youtube.com/watch?v=-GljcEP5PgM)

[Watch the video](https://www.youtube.com/watch?v=-GljcEP5PgM)

---

#### Objective

By the end of this session, you will:

* Monitor Lambda functions using **Amazon CloudWatch**.
* Analyze logs to debug errors.
* Use **AWS X-Ray** to trace requests through your distributed application.

---

#### Tools Used

* **Amazon CloudWatch** (Logs & Metrics)
* **AWS X-Ray** (Distributed Tracing)
* **AWS Lambda**

---

#### Key Concepts

##### 1. CloudWatch Logs

Every time your Lambda prints something (`print("hello")`), it goes to a **CloudWatch Log Group**. This is where you look when things go wrong.

##### 2. CloudWatch Metrics

* **Invocations**: How many times was it run?
* **Duration**: How long did it take? (Money!)
* **Errors**: How many times did it crash?
* **Throttles**: Did you hit the concurrency limit?

##### 3. AWS X-Ray

X-Ray provides a "Service Map". It shows you a visual graph of your application.
User -> API Gateway -> Lambda -> DynamoDB
It helps you spot **Latency** (where is it slow?) and **Errors** (where is it failing?).

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Observability** | Understanding the internal state based on outputs (logs/metrics). |
| **Tracing** | Following a single request across multiple services. |
| **Alarms** | Setting up a notification if `Errors > 0`. |

---

#### Bonus (Extra Learning)

* Create a **CloudWatch Alarm** that sends an email (SNS) if your function errors out.
* specific **Structured Logging** (JSON) for easier searching.

---

#### Congratulations!

You’ve successfully learned how to **Monitor and Debug** Serverless applications!
You have now completed the Serverless section of the challenge.

---

#### Try These Next

* Build a custom **CloudWatch Dashboard** for your Serverless App.
* Look into third-party monitoring tools like **Datadog** or **New Relic** for Serverless.

## 19. Cohort Practice — Day 54: Kubernetes ConfigMaps and Secrets

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Your application needs configuration — database URLs, feature flags, API keys. Hardcoding these into container images means rebuilding every time a value changes. Kubernetes solves this with ConfigMaps for non-sensitive config and Secrets for sensitive data.

---

#### Expected Output
- ConfigMaps created from literals and from a file
- Secrets created and consumed in a Pod
- A markdown file: `day-54-configmaps-secrets.md`

---

#### Challenge Tasks

##### Task 1: Create a ConfigMap from Literals
1. Use `kubectl create configmap` with `--from-literal` to create a ConfigMap called `app-config` with keys `APP_ENV=production`, `APP_DEBUG=false`, and `APP_PORT=8080`
2. Inspect it with `kubectl describe configmap app-config` and `kubectl get configmap app-config -o yaml`
3. Notice the data is stored as plain text — no encoding, no encryption

**Verify:** Can you see all three key-value pairs?

---

##### Task 2: Create a ConfigMap from a File
1. Write a custom Nginx config file that adds a `/health` endpoint returning "healthy"
2. Create a ConfigMap from this file using `kubectl create configmap nginx-config --from-file=default.conf=<your-file>`
3. The key name (`default.conf`) becomes the filename when mounted into a Pod

**Verify:** Does `kubectl get configmap nginx-config -o yaml` show the file contents?

---

##### Task 3: Use ConfigMaps in a Pod
1. Write a Pod manifest that uses `envFrom` with `configMapRef` to inject all keys from `app-config` as environment variables. Use a busybox container that prints the values.
2. Write a second Pod manifest that mounts `nginx-config` as a volume at `/etc/nginx/conf.d`. Use the nginx image.
3. Test that the mounted config works: `kubectl exec <pod> -- curl -s http://localhost/health`

Use environment variables for simple key-value settings. Use volume mounts for full config files.

**Verify:** Does the `/health` endpoint respond?

---

##### Task 4: Create a Secret
1. Use `kubectl create secret generic db-credentials` with `--from-literal` to store `DB_USER=admin` and `DB_PASSWORD=s3cureP@ssw0rd`
2. Inspect with `kubectl get secret db-credentials -o yaml` — the values are base64-encoded
3. Decode a value: `echo '<base64-value>' | base64 --decode`

**base64 is encoding, not encryption.** Anyone with cluster access can decode Secrets. The real advantages are RBAC separation, tmpfs storage on nodes, and optional encryption at rest.

**Verify:** Can you decode the password back to plaintext?

---

##### Task 5: Use Secrets in a Pod
1. Write a Pod manifest that injects `DB_USER` as an environment variable using `secretKeyRef`
2. In the same Pod, mount the entire `db-credentials` Secret as a volume at `/etc/db-credentials` with `readOnly: true`
3. Verify: each Secret key becomes a file, and the content is the decoded plaintext value

**Verify:** Are the mounted file values plaintext or base64?

---

##### Task 6: Update a ConfigMap and Observe Propagation
1. Create a ConfigMap `live-config` with a key `message=hello`
2. Write a Pod that mounts this ConfigMap as a volume and reads the file in a loop every 5 seconds
3. Update the ConfigMap: `kubectl patch configmap live-config --type merge -p '{"data":{"message":"world"}}'`
4. Wait 30-60 seconds — the volume-mounted value updates automatically
5. Environment variables from earlier tasks do NOT update — they are set at pod startup only

**Verify:** Did the volume-mounted value change without a pod restart?

---

##### Task 7: Clean Up
Delete all pods, ConfigMaps, and Secrets you created.

---

#### Hints
- `--from-literal=KEY=VALUE` for command-line values, `--from-file=key=filename` for file contents
- `envFrom` injects all keys; `env` with `valueFrom` injects individual keys
- `echo -n 'value' | base64` — always use `-n` to avoid encoding a trailing newline
- Volume-mounted ConfigMaps/Secrets auto-update; environment variables do not
- `kubectl get secret <name> -o jsonpath='{.data.KEY}' | base64 --decode` extracts and decodes a value

---

#### Documentation
Create `day-54-configmaps-secrets.md` with:
- What ConfigMaps and Secrets are and when to use each
- The difference between environment variables and volume mounts
- Why base64 is encoding, not encryption
- How ConfigMap updates propagate to volumes but not env vars

---

#### Submission
1. Add `day-54-configmaps-secrets.md` to `2026/day-54/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes ConfigMaps and Secrets today. Injected config as environment variables and volume mounts, and discovered that base64 encoding is not encryption."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-54-configmaps-secrets

## 20. Hands-on Project — Day 54: Helm Chart for API Service

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Helm chart with Deployment/Service/Ingress/HPA, env values files, scripts, and Jenkinsfile.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [charts/demo-api/.helmignore](files/hands-on-projects/charts/demo-api/.helmignore)
- [charts/demo-api/Chart.yaml](files/hands-on-projects/charts/demo-api/Chart.yaml)
- [charts/demo-api/templates/_helpers.tpl](files/hands-on-projects/charts/demo-api/templates/_helpers.tpl)
- [charts/demo-api/templates/configmap.yaml](files/hands-on-projects/charts/demo-api/templates/configmap.yaml)
- [charts/demo-api/templates/deployment.yaml](files/hands-on-projects/charts/demo-api/templates/deployment.yaml)
- [charts/demo-api/templates/hpa.yaml](files/hands-on-projects/charts/demo-api/templates/hpa.yaml)
- [charts/demo-api/templates/ingress.yaml](files/hands-on-projects/charts/demo-api/templates/ingress.yaml)
- [charts/demo-api/templates/service.yaml](files/hands-on-projects/charts/demo-api/templates/service.yaml)
- [charts/demo-api/templates/serviceaccount.yaml](files/hands-on-projects/charts/demo-api/templates/serviceaccount.yaml)
- [charts/demo-api/values-prod.yaml](files/hands-on-projects/charts/demo-api/values-prod.yaml)
- [charts/demo-api/values-staging.yaml](files/hands-on-projects/charts/demo-api/values-staging.yaml)
- [charts/demo-api/values.yaml](files/hands-on-projects/charts/demo-api/values.yaml)
- [scripts/helm_deploy.sh](files/hands-on-projects/scripts/helm_deploy.sh)
- [scripts/helm_lint.sh](files/hands-on-projects/scripts/helm_lint.sh)
- [scripts/helm_rollback.sh](files/hands-on-projects/scripts/helm_rollback.sh)
- [scripts/helm_template.sh](files/hands-on-projects/scripts/helm_template.sh)


---

[← Day 53](../day-53/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 55 →](../day-55/README.md)
