# Day 27 — YAML, JSON, Makefiles & Code Quality Tooling

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 28 →](../day-28/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Write correct YAML and avoid common traps
- [ ] Use jq/yq and Make for repeatable tasks
- [ ] Lint everything (shellcheck, yamllint, hadolint, ruff)

## 2. Prerequisites

- Days 18-19, 26.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 YAML

Indentation-sensitive; lists with `-`, maps `key: value`, multi-line `|` and `>`, anchors `&`/`*`, multi-doc `---`. Traps: tabs, `no`/`on` booleans, unquoted version strings like `3.10`.

### 3.2 jq / yq

Query and transform JSON/YAML in pipelines - essential for API output and Kubernetes manifests.

### 3.3 Make and linters

A Makefile is the project's front door: `make lint test build`. Linters catch defects before CI does.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write a multi-document YAML and validate with `yamllint`.
2. [ ] Use `jq` to extract/transform GitHub API JSON.
3. [ ] Use `yq` to modify an image tag in a manifest.
4. [ ] Create Makefile targets: `lint`, `test`, `fmt`, `clean`.
5. [ ] Add `.editorconfig`.

## 5. Real-World Scenario

> A deployment failed because `version: 3.10` was parsed as `3.1`. Reproduce, explain, fix, and add a lint rule to catch it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
yamllint .
curl -s https://api.github.com/repos/cli/cli/releases/latest | jq '{tag: .tag_name, assets: [.assets[].name]}'
yq -i '.spec.template.spec.containers[0].image = "app:1.2.3"' deploy.yaml
.PHONY: lint test
lint: ; shellcheck scripts/*.sh && yamllint . && ruff check .
make lint
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 27 – GitHub Profile Makeover: Build Your Developer Identity — Challenge Brief

#### Task

Your GitHub profile is your **developer resume**. Recruiters, hiring managers, and open-source maintainers will look at your GitHub before your LinkedIn. Today, you'll clean up your profile, organize your repositories, and create a profile README that tells your story.

This is not a coding day — it's a **branding day**. Treat it seriously.

---

#### Expected Output
- A polished GitHub profile with a profile README
- Well-organized repositories with proper names, descriptions, and READMEs
- A markdown file: `day-27-notes.md` documenting what you changed and why

---

#### Challenge Tasks

##### Task 1: Audit Your Current GitHub Profile
Before making changes, assess where you stand:
1. Visit your own GitHub profile as if you were a stranger — what impression does it give?
2. Answer in your notes:
   - Is your profile picture professional?
   - Is your bio filled in? Does it say what you do?
   - Are your pinned repos relevant, or are they random forks?
   - Do your repos have descriptions, or are they blank?
   - Would a recruiter understand what you've been working on?

---

##### Task 2: Create Your Profile README
1. Create a **special repository** with the same name as your GitHub username (e.g., `github.com/yourname/yourname`)
2. Add a `README.md` — this will appear on your profile page
3. Include the following in your profile README:
   - A short introduction — who you are, what you're learning
   - What you're currently working on (e.g., 90 Days of DevOps)
   - Skills/tools you know or are learning (Linux, Git, Python, Shell, etc.)
   - Links to your important repos
   - How to reach you (LinkedIn, Twitter, email — whatever you're comfortable sharing)
4. Keep it clean and simple — don't overload it with badges and widgets

---

##### Task 3: Organize Your Repositories
Create and organize the following repos (if you don't have them already):

1. **90 Days of DevOps** — your fork or personal repo with all daily submissions
   - Clear README explaining what the challenge is
   - Organized folder structure by day

2. **Shell Scripts** — a dedicated repo for all your shell scripting work
   - Move/copy your scripts from Days 16–21 here
   - Add a README listing what each script does

3. **Python Scripts** — a dedicated repo for your Python projects
   - Move/copy your scripts from Days 7–15 here
   - Add a README listing what each script does

4. **DevOps Notes** — a repo for your learning notes, cheat sheets, and references
   - Add your shell scripting cheat sheet (Day 21)
   - Add your git-commands.md
   - Organize by topic (Linux, Git, Python, etc.)

For **every repo**, make sure you have:
- A clear, descriptive **repo name** (use hyphens, not spaces — e.g., `shell-scripts` not `Shell Scripts`)
- A one-line **description** on GitHub
- A proper **README.md** explaining what's inside
- A relevant `.gitignore`

---

##### Task 4: Pin Your Best Repos
1. Go to your GitHub profile and select **6 pinned repositories**
2. Choose repos that best represent your work and learning
3. Make sure each pinned repo has a description and README

---

##### Task 5: Clean Up
1. Delete or archive repos that are empty, abandoned, or irrelevant
2. Rename any repos with unclear names
3. Make sure you're not exposing any secrets (`.env` files, API keys, passwords) in any repo — check your commit history too

---

##### Task 6: Before & After
1. Take a screenshot of your GitHub profile **before** you started today
2. Take a screenshot **after** all your changes
3. Add both to your `day-27-notes.md`
4. Write 3 things you improved and why

---

#### Tips for a Good Profile README
- Keep it **short** — 15-20 lines max
- Use headers and bullet points — don't write paragraphs
- Show what you're **doing**, not just what you **know**
- A few well-placed badges are fine, but don't turn it into a Christmas tree
- Look at profiles you admire for inspiration — but make yours authentic

---

#### Submission
1. Add your `day-27-notes.md` (with before/after screenshots) to `2026/day-27/`
2. Share the link to your updated GitHub profile
3. Push to your fork

---

#### Learn in Public

Share your before & after GitHub profile screenshots on LinkedIn. Tag people who inspired your profile.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 27 – GitHub Profile Makeover: Build Your Developer Identity — Notes & Solution

##### Task 1: Audit Your Current GitHub Profile
Before making changes, assess where you stand:
1. Visit your own GitHub profile as if you were a stranger — what impression does it give?
2. Answer in your notes:
   - Is your profile picture professional?
       - Yes
   - Is your bio filled in? Does it say what you do?
       - No
   - Are your pinned repos relevant, or are they random forks?
       - They are mostly random forks and don’t fully showcase my own work.
   - Do your repos have descriptions, or are they blank?
       - Partially, Some repos have descriptions, But many are blank or unclear.
   - Would a recruiter understand what you've been working on?
       - No, it’s hard for them to quickly see my skills, projects
---

##### Task 2: Create Your Profile README

   - A short introduction — Currently learning Devops Tools and Technologies like Linux, AWS Cloud, Github, Terraform, Docker, Kubernetes, and CI/CD pipelines

   - What you're currently working on - 📅 90 Days of DevOps Journey – daily learning and hands-on practice
   - Skills/tools you know or are learning - Linux, AWS Cloud, Github, Terraform, Docker, Kubernetes, and CI/CD pipelines
   - Links to your important repos - Emial and Linkedin

---

##### Task 3: Organize Your Repositories

| Repo | Status |
|---|---|
| `90-days-of-devops`| Created |
| `shell-scripts` | Created |
| `devops-notes ` | Created |

All repos have:
- Descriptive repo names using hyphens
- One-line descriptions on GitHub
- README.md explaining contents

---

##### Task 4: Pin Your Best Repos

 - `90-days-of-devops`

---

##### Task 5: Clean Up

- Deleted irrelevant repos
- Confirmed all active repos have descriptions set on GitHub

---

##### Task 6: Before & After
1. GitHub profile **before**
<img width="1919" height="874" alt="Screenshot 2026-08-07 103837" src="https://github.com/user-attachments/assets/a4900250-43ee-40ec-86d9-94fb73e346b9" />


2. GitHub profile **After**
<img width="1919" height="875" alt="Screenshot 2026-08-18 162216" src="https://github.com/user-attachments/assets/8ebd26e7-30b8-4f51-b8da-566482018fa3" />


3. Things improved

    **Added a Personal Introduction**
    I Have added a heading and short summary (e.g., Hi, I’m Amit K Pandey — Cloud & DevOps Engineer) so That will be clearly visible once anyone will see my Github profile.

    **Organized Profile Layout**
    I structured the profile into sections like About Me, Skills, What I’m Working On, and Connect with Me. This makes the profile easier to read and more professional.

    **Highlighted Skills Clearly**
    I listed my all keys technical skills in an organized manner. This helps recruiters quickly see my profile strengths and expertise.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a 'YAML gotchas' note with 8 examples. | You can demonstrate, without notes: *write correct YAML and avoid common traps* — with evidence committed to `day-27/`. |
| 2 | Convert JSON<->YAML with yq. | You can demonstrate, without notes: *use jq/yq and Make for repeatable tasks* — with evidence committed to `day-27/`. |
| 3 | Add Makefile help target with `grep`/`awk`. | You can demonstrate, without notes: *lint everything (shellcheck, yamllint, hadolint, ruff)* — with evidence committed to `day-27/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `mapping values are not allowed here` | Indentation/colon issue; run yamllint. |
| jq returns null | Wrong path; inspect with `jq 'keys'`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Validate untrusted YAML with safe loaders; keep secrets out of YAML in git.
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

1. Why quote version numbers?
2. What does `jq .[]` do?
3. Why use a Makefile?
4. What are YAML anchors?
5. **Scenario:** A deployment failed because `version: 3. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I fix YAML errors quickly? | ☐ | ☐ | ☐ | ☐ |
| Can I transform JSON with jq? | ☐ | ☐ | ☐ | ☐ |
| Can I create a Makefile workflow? | ☐ | ☐ | ☐ | ☐ |
| Write correct YAML and avoid common traps | ☐ | ☐ | ☐ | ☐ |
| Use jq/yq and Make for repeatable tasks | ☐ | ☐ | ☐ | ☐ |
| Lint everything (shellcheck, yamllint, hadolint, ruff) | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-27/` in your own repository:

```text
day-27/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-27
git add day-27/
git commit -m "day-27: yaml, json, makefiles & code quality tooling"
git push -u origin day-27
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Personal Learning Journal — Day 27: Matrix Strategy in GitHub Actions and Cron Job Scheduling

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

"Automation becomes powerful when one workflow can handle multiple environments and run exactly when you need it." ⚙️🚀

Today, I explored two important concepts in automation and scheduling: Matrix Strategy in GitHub Actions and Cron Job Scheduling in Linux.

#### 🔄 GitHub Actions Matrix Strategy
- Learned how matrix strategies allow the same workflow to run across multiple configurations. 
- Understood how to test applications against different Node.js versions, operating systems, or environments without creating separate jobs. 
- Learned how matrix-based workflows make CI pipelines more scalable and maintainable. 

#### ⏰ Linux Cron Jobs
- Learned how cron is used to schedule repetitive tasks in Linux. 
- Understood the structure of a crontab expression: `* * * * * command`
- Learned how to schedule tasks based on minute, hour, day, month, and weekday. 
- Practiced using `crontab -e`, `crontab -l`, and scheduling automated tasks. 
- Understood real-world use cases such as backups, log cleanup, monitoring, reports, and maintenance tasks. 

#### 💡 Key Takeaway:
Matrix strategies help scale CI workflows, while cron helps automate scheduled tasks on Linux. Both demonstrate an important DevOps principle: reduce manual work through reliable automation.

## 19. Challenge Notes — Day 27: Kubernetes Monitoring (Prometheus + Grafana)

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

[![](https://img.youtube.com/vi/JHNInajXAt4/0.jpg)](https://www.youtube.com/watch?v=JHNInajXAt4)

[Watch the video](https://www.youtube.com/watch?v=JHNInajXAt4)

#### 🎯 Objectives

- Understand Kubernetes monitoring fundamentals.
- Deploy Prometheus and Grafana manually using manifests (no Helm).
- Visualize and explore metrics.
- Set up basic alerts using PrometheusRules.

---

#### 📚 Topics Covered

##### ✅ Why Monitoring Matters
- Track health and performance of cluster and workloads.
- Gain visibility into CPU, memory, disk, and network.
- Set alerts for critical issues and auto-scale based on metrics.

---

#### 🔧 Tools Overview

##### Prometheus
- Time-series database that scrapes and stores metrics.
- Works using a **pull model**.
- Uses **PromQL** for queries.

##### Grafana
- Visualization layer for Prometheus and other sources.
- Provides real-time dashboards and alerting UI.

---

#### 📦 Setup Without Helm

We will manually apply Kubernetes manifests to deploy Prometheus and Grafana.

---

#### Step 1️⃣: Create Monitoring Namespace

```bash
kubectl create namespace monitoring
````

---

#### Step 2️⃣: Deploy Prometheus

##### 1. Create Prometheus ConfigMap

```yaml
# prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
  labels:
    name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s

    scrape_configs:
      - job_name: 'kubernetes-nodes'
        static_configs:
          - targets: ['localhost:9100']
```

Apply it:

```bash
kubectl apply -f prometheus-config.yaml
```

##### 2. Create Prometheus Deployment & Service

```yaml
# prometheus-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      containers:
        - name: prometheus
          image: prom/prometheus
          args:
            - "--config.file=/etc/prometheus/prometheus.yml"
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: config-volume
              mountPath: /etc/prometheus/
      volumes:
        - name: config-volume
          configMap:
            name: prometheus-config
```

```yaml
# prometheus-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: monitoring
spec:
  selector:
    app: prometheus
  ports:
    - port: 9090
      targetPort: 9090
      protocol: TCP
```

Apply:

```bash
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f prometheus-service.yaml
```

---

#### Step 3️⃣: Deploy Grafana

##### 1. Create Grafana Deployment

```yaml
# grafana-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana
          ports:
            - containerPort: 3000
```

##### 2. Create Grafana Service

```yaml
# grafana-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: monitoring
spec:
  selector:
    app: grafana
  ports:
    - port: 3000
      targetPort: 3000
```

Apply:

```bash
kubectl apply -f grafana-deployment.yaml
kubectl apply -f grafana-service.yaml
```

---

#### 🔌 Access the Dashboards

##### Port Forward

```bash
kubectl port-forward svc/prometheus 9090:9090 -n monitoring
kubectl port-forward svc/grafana 3000:3000 -n monitoring
```

* Prometheus: [http://localhost:9090](http://localhost:9090)
* Grafana: [http://localhost:3000](http://localhost:3000)

##### Grafana Default Login

* **Username**: `admin`
* **Password**: `admin` (change after first login)

---

#### 📊 Configure Prometheus in Grafana

1. Go to Grafana → Settings → Data Sources → Add Data Source.
2. Choose **Prometheus**.
3. URL: `http://prometheus:9090` (internal) or `http://localhost:9090` (via port-forward).
4. Click **Save & Test**.

---

#### 📈 Create Dashboards

* Use built-in or community dashboards (e.g. ID: `1860` or `6417` from [grafana.com/dashboards](https://grafana.com/grafana/dashboards)).
* Add panels for:

  * Node metrics
  * Pod memory and CPU
  * Uptime and restarts

---

#### 🚨 Example Alerting Rule (Optional)

```yaml
# prometheus-alert-rule.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: example-alert
  namespace: monitoring
spec:
  groups:
  - name: example
    rules:
    - alert: HighMemoryUsage
      expr: container_memory_usage_bytes > 500000000
      for: 1m
      labels:
        severity: warning
      annotations:
        summary: "Memory usage above 500MB"
        description: "Container {{ $labels.container }} using too much memory"
```

> Alertmanager needs to be deployed separately for alerts to work end-to-end.

---

#### 🧹 Cleanup

```bash
kubectl delete namespace monitoring
```

---

#### 🧠 Summary

* Deployed Prometheus and Grafana manually.
* Exposed services using port-forwarding.
* Configured Prometheus in Grafana.
* Created dashboards and viewed live metrics.
* Discussed basic alert rules.

---

### Attachments

- [Day 27 - Kubernetes Monitoring (Prometheus + Grafana).pdf](Day%2027%20-%20Kubernetes%20Monitoring%20%28Prometheus%20%2B%20Grafana%29.pdf)

## 20. Cohort Practice — Day 27: GitHub Profile Makeover: Build Your Developer Identity

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

Your GitHub profile is your **developer resume**. Recruiters, hiring managers, and open-source maintainers will look at your GitHub before your LinkedIn. Today, you'll clean up your profile, organize your repositories, and create a profile README that tells your story.

This is not a coding day — it's a **branding day**. Treat it seriously.

---

#### Expected Output
- A polished GitHub profile with a profile README
- Well-organized repositories with proper names, descriptions, and READMEs
- A markdown file: `day-27-notes.md` documenting what you changed and why

---




#### Challenge Tasks

##### Task 1: Audit Your Current GitHub Profile
Before making changes, assess where you stand:
1. Visit your own GitHub profile as if you were a stranger — what impression does it give?
2. Answer in your notes:
   - Is your profile picture professional?
   - Is your bio filled in? Does it say what you do?
   - Are your pinned repos relevant, or are they random forks?
   - Do your repos have descriptions, or are they blank?
   - Would a recruiter understand what you've been working on?

---

##### Task 2: Create Your Profile README
1. Create a **special repository** with the same name as your GitHub username (e.g., `github.com/yourname/yourname`)
2. Add a `README.md` — this will appear on your profile page
3. Include the following in your profile README:
   - A short introduction — who you are, what you're learning
   - What you're currently working on (e.g., 90 Days of DevOps)
   - Skills/tools you know or are learning (Linux, Git, Python, Shell, etc.)
   - Links to your important repos
   - How to reach you (LinkedIn, Twitter, email — whatever you're comfortable sharing)
4. Keep it clean and simple — don't overload it with badges and widgets

---

##### Task 3: Organize Your Repositories
Create and organize the following repos (if you don't have them already):

1. **90 Days of DevOps** — your fork or personal repo with all daily submissions
   - Clear README explaining what the challenge is
   - Organized folder structure by day

2. **Shell Scripts** — a dedicated repo for all your shell scripting work
   - Move/copy your scripts from Days 16–21 here
   - Add a README listing what each script does

3. **Python Scripts** — a dedicated repo for your Python projects
   - Move/copy your scripts from Days 7–15 here
   - Add a README listing what each script does

4. **DevOps Notes** — a repo for your learning notes, cheat sheets, and references
   - Add your shell scripting cheat sheet (Day 21)
   - Add your git-commands.md
   - Organize by topic (Linux, Git, Python, etc.)

For **every repo**, make sure you have:
- A clear, descriptive **repo name** (use hyphens, not spaces — e.g., `shell-scripts` not `Shell Scripts`)
- A one-line **description** on GitHub
- A proper **README.md** explaining what's inside
- A relevant `.gitignore`

---

##### Task 4: Pin Your Best Repos
1. Go to your GitHub profile and select **6 pinned repositories**
2. Choose repos that best represent your work and learning
3. Make sure each pinned repo has a description and README

---

##### Task 5: Clean Up
1. Delete or archive repos that are empty, abandoned, or irrelevant
2. Rename any repos with unclear names
3. Make sure you're not exposing any secrets (`.env` files, API keys, passwords) in any repo — check your commit history too

---

##### Task 6: Before & After
1. Take a screenshot of your GitHub profile **before** you started today
2. Take a screenshot **after** all your changes
3. Add both to your `day-27-notes.md`
4. Write 3 things you improved and why

---

#### Tips for a Good Profile README
- Keep it **short** — 15-20 lines max
- Use headers and bullet points — don't write paragraphs
- Show what you're **doing**, not just what you **know**
- A few well-placed badges are fine, but don't turn it into a Christmas tree
- Look at profiles you admire for inspiration — but make yours authentic

---

#### Submission
1. Add your `day-27-notes.md` (with before/after screenshots) to `2026/day-27/`
2. Share the link to your updated GitHub profile
3. Push to your fork

---

#### Learn in Public

Share your before & after GitHub profile screenshots on LinkedIn. Tag people who inspired your profile.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-27-notes

Today goal was to improve my github profile amd organize my repository so they better represents my skills, project and devops learning journey. all well maintained github profile acts as a developer portfolio and helps recruiters quickly understand my experiances and interests.

## 21. Hands-on Project — Day 27: AWS Backup Plans (Terraform)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **AWS Backup** with Terraform. You’ll create a **Backup Vault**, a **Backup Plan** with one or more **rules** (daily/weekly/monthly), set **lifecycle** (cold storage + retention), optionally **copy** to a **secondary region**, and select resources by **tags** or **explicit ARNs**. We’ll also include **Vault Lock** (WORM) and **SNS notifications**.

---

#### 🎯 Learning Goals
- Model **vaults**, **plans**, and **selections** for EC2/EBS, RDS, EFS, and DynamoDB.
- Configure **lifecycle** (transition to cold storage, delete after) and **cross‑region copies**.
- Enforce tamper‑resistance via **Backup Vault Lock**.
- Use **tag-based selection** for environment-level coverage.

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (tune variables)
terraform -chdir=terraform plan   -var='name_prefix=day27'   -var='selection_tag_key=Backup'   -var='selection_tag_value=true'

# 3) Apply
terraform -chdir=terraform apply -auto-approve

# 4) Opt-in resources
# Tag resources you want protected:
#   Key=Backup, Value=true  (or pass explicit ARNs via var.resource_arns)
```

**What gets protected?**  
Everything matching your **tag filter** (default `Backup=true`) or any **explicit ARNs** you pass. The daily rule runs at `03:00 UTC` with 35‑day retention by default.

---

#### 💡 Challenge
- Add a **monthly** rule with 12‑month retention for long-term snapshots.
- Enable **cross‑region copy** to a DR region.
- Turn on **SNS notifications** for backup/restore events.
- Enable **Vault Lock** with a **min/max retention** policy.

---

#### ✅ Checklist
- [ ] Vault exists and plan shows **compliant** selections  
- [ ] Recovery points visible under AWS Backup → **Protected resources**  
- [ ] (Optional) **Vault Lock** applied (be careful: some settings are **irrevocable** after lock)  
- [ ] (Optional) **Cross‑region copy** recovery points present in target region

---

#### 📌 Commit
```bash
git add day27-aws-backup-plans
git commit -m "day27: AWS Backup — vault, plan (rules), tag-based selection, optional copy + vault lock + SNS"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 26](../day-26/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 28 →](../day-28/README.md)
