# Day 90 — Final Assessment, Portfolio Polish & Interview Readiness

[← Day 89](../day-89/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | —

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced |
| **Estimated time** | 4.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Complete the career-readiness assessment
- [ ] Polish GitHub portfolio and CV with measurable outcomes
- [ ] Run technical and behavioural mock interviews

## 2. Prerequisites

- Days 1-89.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Career-readiness assessment

Score yourself 0-3 across 15 domains: Linux, networking, scripting, Git, containers, CI/CD, cloud, IaC, config management, Kubernetes, GitOps, observability, DevSecOps, SRE, platform engineering. Target: >= 36/45 with no domain at 0.

### 3.2 Portfolio

Three pinned capstones with architecture diagrams, demo GIFs, metrics (e.g. 'lead time 45 -> 8 min', 'rebuild env in 22 min'), security posture and lessons learned. CV bullets use action + tool + outcome.

### 3.3 Interviewing

Expect: Linux troubleshooting, networking, Git scenarios, pipeline design, Terraform state, K8s debugging, incident stories (STAR), system design for CI/CD or platform, security and cost questions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Complete the assessment in ASSESSMENT-AND-CERTIFICATION.md; list gaps and a 30-60-90 day follow-up plan.
2. [ ] Audit all repos: README, license, no secrets, consistent topics, pinned repos.
3. [ ] Write 8 CV bullets with measurable results from your projects.
4. [ ] Do 2 mock interviews (peer/AI/self-recorded): one technical, one scenario/system-design.
5. [ ] Choose certification path (AWS SAA/DevOps Pro, CKA, Terraform Associate, AZ-400) and book a date.

## 5. Real-World Scenario

> You have 45 minutes with a hiring manager: 'Walk me through the most complex system you built, its failures, and what you would improve.'

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gitleaks detect --source . --no-banner
gh repo list --limit 50 --json name,description,pushedAt
wc -l README.md docs/*.md
git shortlog -sn --since="90 days ago"
# Practise: explain, in order -> problem, architecture, trade-offs, security, failure, metrics, next steps
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 90 -- Grand Finale: The Complete DevOps Journey

#### Task
90 days. From `ls` to AI-powered self-healing Kubernetes agents. Today you step back, connect every block, reflect on how far you have come, and map out what comes next. No new tools. No new configs. Just clarity on what you built and where you go from here.

---

#### The Full 90-Day Map

```
LINUX FUNDAMENTALS (Days 1-13)
  Commands, processes, files, permissions, LVM
  "The foundation. Every DevOps tool runs on Linux."
         |
NETWORKING (Days 14-15)
  DNS, IP, subnets, ports
  "How machines talk to each other."
         |
SHELL SCRIPTING (Days 16-21)
  Bash basics, functions, projects
  "Automating what you'd otherwise type by hand."
         |
GIT & GITHUB (Days 22-28)
  Branching, advanced git, GitHub CLI
  "Version control. The backbone of everything that follows."
         |
DOCKER (Days 29-37)
  Images, Dockerfile, volumes, networking, Compose, multi-stage builds
  "Packaging applications so they run the same everywhere."
         |
CI/CD & GITHUB ACTIONS (Days 38-49)
  YAML, workflows, triggers, runners, secrets, DevSecOps
  "Automating build, test, and deploy on every push."
         |
KUBERNETES (Days 50-58)
  Pods, Deployments, Services, Namespaces, RBAC
  "Orchestrating containers at scale."
         |
TERRAWEEK (Days 59-67)
  Terraform, providers, state, modules, workspaces
  "Infrastructure as Code. Provision cloud resources declaratively."
         |
ANSIBLE (Days 68-72)
  Inventory, playbooks, roles, templates, Vault
  "Configuration management. Keep servers in the desired state."
         |
OBSERVABILITY (Days 73-77)
  Prometheus, Grafana, Loki, Promtail, OpenTelemetry, alerting
  "The three pillars: metrics, logs, traces. Know WHY things break."
         |
HELM (Days 78-80)
  Charts, templates, values, subcharts, multi-env deployment
  "Package manager for Kubernetes. One chart, many environments."
         |
AMAZON EKS (Days 81-83)
  Terraform for EKS, Gateway API, EBS storage, IRSA, HPA
  "Production-grade managed Kubernetes on AWS."
         |
ARGOCD & GITOPS (Days 84-86)
  GitOps principles, ArgoCD, sync strategies, App of Apps, CI/CD pipeline
  "Git is the single source of truth. The cluster always matches the repo."
         |
AGENTIC AI FOR DEVOPS (Days 87-89)
  LLM agents, ReAct pattern, MCP, KubeHealer, Temporal
  "AI that diagnoses and fixes infrastructure autonomously."
         |
        YOU ARE HERE (Day 90)
```

---

#### Challenge Tasks

##### Task 1: The End-to-End Pipeline
Trace a single code change through every tool you learned:

```
1. A developer writes code on a Linux machine (Days 1-13)
   using shell scripts (Days 16-21) and Git (Days 22-28)

2. They push to GitHub, which triggers GitHub Actions (Days 40-49)

3. The CI pipeline builds a Docker image (Days 29-37)
   and pushes it to DockerHub

4. The pipeline updates the Kubernetes manifest in Git
   with the new image tag

5. ArgoCD (Days 84-86) detects the change and syncs
   to an EKS cluster (Days 81-83)

6. The EKS cluster, provisioned by Terraform (Days 59-67)
   and configured by Ansible (Days 68-72), runs the app

7. Helm (Days 78-80) manages the deployment with
   environment-specific values

8. Prometheus, Grafana, and Loki (Days 73-77) monitor
   metrics, logs, and traces

9. If something breaks, an AI agent (Days 87-89)
   diagnoses the issue and proposes a fix

10. The fix goes through Git, ArgoCD syncs it,
    and the cycle continues
```

Every single block connects to the next. Nothing was learned in isolation.

---

##### Task 2: What You Built with the AI-BankApp
The AI-BankApp (https://github.com/TrainWithShubham/AI-BankApp-DevOps) tied together the last 13 days:

| Day | What You Did with the AI-BankApp |
|-----|--------------------------------|
| 78 | Deployed its MySQL dependency via Helm chart |
| 79 | Converted its 12 raw K8s manifests into a Helm chart |
| 80 | Created dev/staging/prod values, hooks, CI/CD integration |
| 81 | Provisioned EKS using its `terraform/` configs |
| 82 | Set up Gateway API, EBS storage, session persistence from its `k8s/` manifests |
| 83 | Full production deployment with monitoring |
| 84 | Deployed via ArgoCD using its `argocd/application.yml` |
| 85 | Added sync waves, App of Apps, RBAC |
| 86 | Wired its GitHub Actions pipeline for end-to-end GitOps |

One real-world project. Every tool applied to it.

---

##### Task 3: Skills Inventory
Rate yourself on each skill. Be honest -- this is for you, not anyone else.

| Skill | Days | Confidence (1-5) |
|-------|------|------------------|
| Linux command line | 1-13 | |
| Shell scripting | 16-21 | |
| Git & GitHub | 22-28 | |
| Docker | 29-37 | |
| CI/CD (GitHub Actions) | 38-49 | |
| Kubernetes | 50-58 | |
| Terraform | 59-67 | |
| Ansible | 68-72 | |
| Observability (Prometheus, Grafana, Loki) | 73-77 | |
| Helm | 78-80 | |
| Amazon EKS | 81-83 | |
| ArgoCD / GitOps | 84-86 | |
| Agentic AI for DevOps | 87-89 | |

For anything below 3, go back and redo that block. The day folders are still there. The tasks have not changed.

---

##### Task 4: What Comes Next
DevOps does not stop at day 90. Here is what to explore next:

**Deepen what you learned:**
- Multi-cluster Kubernetes (federation, fleet management)
- Advanced Terraform (custom providers, Terragrunt, drift detection)
- Service mesh (Istio, Linkerd)
- Secrets management (HashiCorp Vault, AWS Secrets Manager, External Secrets Operator)
- Database operations (backups, migrations, blue-green database deployments)
- Chaos engineering (Litmus, Chaos Monkey)
- FinOps (cloud cost optimization)

**Certifications to pursue:**
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator (CKA)
- Certified Kubernetes Application Developer (CKAD)
- HashiCorp Terraform Associate
- GitHub Actions Certification

**Build a portfolio project:**
Take everything from days 78-89 and build it from scratch for your own application:
1. Write an app (any language)
2. Dockerize it
3. Create a Helm chart
4. Provision EKS with Terraform
5. Deploy with ArgoCD
6. Monitor with Prometheus + Grafana
7. Set up the full GitOps CI/CD pipeline
8. Add an AI agent for troubleshooting

Put it on GitHub. Write a blog post about it. Share it on LinkedIn.

---

##### Task 5: Write Your Graduation Post
Create a final documentation file that captures your entire journey.

Create `day-90-graduation.md` with:
- The 90-day timeline showing what you learned each week
- Your top 5 "aha moments" from the challenge
- The hardest day and how you pushed through it
- Your skills inventory (from Task 3)
- Screenshot collage: terminal outputs, Grafana dashboards, ArgoCD UI, the AI-BankApp running on EKS
- What you plan to learn next
- Advice for someone starting day 1 tomorrow

---

##### Task 6: Share Your Achievement
You spent 90 days showing up. That matters.

Write a LinkedIn post (suggested template -- make it your own):

---

*I just completed the #90DaysOfDevOps challenge by @TrainWithShubham.*

*90 days ago I started with Linux commands. Today I have a production-grade pipeline:*

*- Infrastructure provisioned with Terraform*
*- Containers orchestrated on Amazon EKS*
*- Applications packaged with Helm*
*- CI/CD automated with GitHub Actions*
*- Deployments managed by ArgoCD (GitOps)*
*- Full observability with Prometheus, Grafana, and Loki*
*- AI agents that diagnose and fix Kubernetes issues*

*The biggest lesson: DevOps is not about tools. It is about connecting tools into a pipeline where code flows from a developer's laptop to production with confidence, speed, and visibility.*

*Thank you to the community for the support.*

*What's next: [your plan]*

---

Tag: `#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

---

#### Submission
1. Add `day-90-graduation.md` to `2026/day-90/`
2. Commit and push to your fork
3. Share on LinkedIn

---

#### Final Words

90 days of showing up, building, breaking, and fixing. You did not just learn DevOps -- you practiced it. Every day. That discipline is more valuable than any certification.

The tools will change. New ones will appear. The ones you learned will get updates. But the patterns -- infrastructure as code, containerization, orchestration, observability, GitOps, automation -- those stay. You now have the foundation to learn any new tool in a weekend because you understand the patterns underneath.

Keep building. Keep sharing. Keep learning in public.

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a 12-month learning plan. | You can demonstrate, without notes: *complete the career-readiness assessment* — with evidence committed to `day-90/`. |
| 2 | Record a 3-minute project walkthrough. | You can demonstrate, without notes: *polish GitHub portfolio and CV with measurable outcomes* — with evidence committed to `day-90/`. |
| 3 | Publish a blog/post summarising 3 lessons from the 90 days. | You can demonstrate, without notes: *run technical and behavioural mock interviews* — with evidence committed to `day-90/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Nervous in interviews | Practise aloud with STAR; prepare 5 stories; rehearse troubleshooting narration. |
| Gaps discovered | Prioritise by job targets; build a mini-lab per gap. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Security hygiene in your public footprint: no secrets, no employer data, no real account IDs in diagrams.
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

1. Walk through a production incident you handled.
2. How do you design a secure CI/CD pipeline?
3. How would you debug a failing deployment in K8s?
4. How do you balance speed and reliability?
5. **Scenario:** You have 45 minutes with a hiring manager: 'Walk me through the most complex system you built, its failures, and what you would improve. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Did I score >= 36/45? | ☐ | ☐ | ☐ | ☐ |
| Are my projects interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Do I have a concrete next-step plan? | ☐ | ☐ | ☐ | ☐ |
| Complete the career-readiness assessment | ☐ | ☐ | ☐ | ☐ |
| Polish GitHub portfolio and CV with measurable outcomes | ☐ | ☐ | ☐ | ☐ |
| Run technical and behavioural mock interviews | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-90/` in your own repository:

```text
day-90/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-90
git add day-90/
git commit -m "day-90: final assessment, portfolio polish & interview readiness"
git push -u origin day-90
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Final assessment, portfolio audit, CV bullets, 12-month plan.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 54 |
| Hands-on labs and commands (Sections 4–6) | 122 |
| Assignment + troubleshooting (Sections 7–8) | 54 |
| Interview practice, documentation, Git push (Sections 11–14) | 40 |
| **Total** | **270 (≈ 4.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 90: Career Roadmap, Certification Paths, and Final Review

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 90** of the DevOps 90-Day Challenge!
**WE HAVE ARRIVED.** This is the finish line of the challenge, but the starting line of your career.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Review the entire 90-Day Architecture.
* Map out your **Certification Path** (AWS, CKA, Terraform).
* Discuss **Salary Expectations** and Job Roles.
* Plan your continuous learning journey (AI in DevOps, Platform Engineering).

---

#### Tools Used

* **Celebration!**

---

#### Key Concepts

##### 1. Certification Roadmap
1.  **Fundamental**: AWS Cloud Practitioner (Optional).
2.  **Associate**: AWS Solutions Architect Associate (Must Have).
3.  **Specialist**: CKA (Certified Kubernetes Administrator) - Highly valued.
4.  **Professional**: AWS DevOps Professional (Hard, do it later).

##### 2. Job Roles
*   **DevOps Engineer**: Generalist.
*   **Site Reliability Engineer (SRE)**: Focus on code, automation, and reliability.
*   **Platform Engineer**: Building internal developer platforms (IDP).
*   **Cloud Engineer**: Focus on infrastructure provisioning.

##### 3. Continuous Learning
The field moves fast.
*   **Current Trends**: AI Ops, FinOps, GitOps.
*   **Keep Building**: Don't stop coding.

---

#### Key Concepts Applied

| Concept | Reflection |
| :--- | :--- |
| **The Journey** | You started with "What is Linux?" and ended with "Deploying Microservices on Kubernetes with GitOps". |
| **Discipline** | Consistency is the only magic pill. |

---

#### Bonus (Extra Learning)

*   Join local Meetups.
*   Start a blog. Teaching is the best way to learn.

---

#### Congratulations!

You have completed the **90 Days DevOps Challenge**.
You are awesome.
**Good luck!**

---

## 19. Cohort Practice — Day 90: Grand Finale: The Complete DevOps Journey

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
90 days. From `ls` to AI-powered self-healing Kubernetes agents. Today you step back, connect every block, reflect on how far you have come, and map out what comes next. No new tools. No new configs. Just clarity on what you built and where you go from here.

---




#### The Full 90-Day Map



```
LINUX FUNDAMENTALS (Days 1-13)
  Commands, processes, files, permissions, LVM
  "The foundation. Every DevOps tool runs on Linux."
         |
NETWORKING (Days 14-15)
  DNS, IP, subnets, ports
  "How machines talk to each other."
         |
SHELL SCRIPTING (Days 16-21)
  Bash basics, functions, projects
  "Automating what you'd otherwise type by hand."
         |
GIT & GITHUB (Days 22-28)
  Branching, advanced git, GitHub CLI
  "Version control. The backbone of everything that follows."
         |
DOCKER (Days 29-37)
  Images, Dockerfile, volumes, networking, Compose, multi-stage builds
  "Packaging applications so they run the same everywhere."
         |
CI/CD & GITHUB ACTIONS (Days 38-49)
  YAML, workflows, triggers, runners, secrets, DevSecOps
  "Automating build, test, and deploy on every push."
         |
KUBERNETES (Days 50-58)
  Pods, Deployments, Services, Namespaces, RBAC
  "Orchestrating containers at scale."
         |
TERRAWEEK (Days 59-67)
  Terraform, providers, state, modules, workspaces
  "Infrastructure as Code. Provision cloud resources declaratively."
         |
ANSIBLE (Days 68-72)
  Inventory, playbooks, roles, templates, Vault
  "Configuration management. Keep servers in the desired state."
         |
OBSERVABILITY (Days 73-77)
  Prometheus, Grafana, Loki, Promtail, OpenTelemetry, alerting
  "The three pillars: metrics, logs, traces. Know WHY things break."
         |
HELM (Days 78-80)
  Charts, templates, values, subcharts, multi-env deployment
  "Package manager for Kubernetes. One chart, many environments."
         |
AMAZON EKS (Days 81-83)
  Terraform for EKS, Gateway API, EBS storage, IRSA, HPA
  "Production-grade managed Kubernetes on AWS."
         |
ARGOCD & GITOPS (Days 84-86)
  GitOps principles, ArgoCD, sync strategies, App of Apps, CI/CD pipeline
  "Git is the single source of truth. The cluster always matches the repo."
         |
AGENTIC AI FOR DEVOPS (Days 87-89)
  LLM agents, ReAct pattern, MCP, KubeHealer, Temporal
  "AI that diagnoses and fixes infrastructure autonomously."
         |
        YOU ARE HERE (Day 90)
```

---

#### Challenge Tasks

##### Task 1: The End-to-End Pipeline
Trace a single code change through every tool you learned:

```
1. A developer writes code on a Linux machine (Days 1-13)
   using shell scripts (Days 16-21) and Git (Days 22-28)

2. They push to GitHub, which triggers GitHub Actions (Days 40-49)

3. The CI pipeline builds a Docker image (Days 29-37)
   and pushes it to DockerHub

4. The pipeline updates the Kubernetes manifest in Git
   with the new image tag

5. ArgoCD (Days 84-86) detects the change and syncs
   to an EKS cluster (Days 81-83)

6. The EKS cluster, provisioned by Terraform (Days 59-67)
   and configured by Ansible (Days 68-72), runs the app

7. Helm (Days 78-80) manages the deployment with
   environment-specific values

8. Prometheus, Grafana, and Loki (Days 73-77) monitor
   metrics, logs, and traces

9. If something breaks, an AI agent (Days 87-89)
   diagnoses the issue and proposes a fix

10. The fix goes through Git, ArgoCD syncs it,
    and the cycle continues
```

Every single block connects to the next. Nothing was learned in isolation.

---

##### Task 2: What You Built with the AI-BankApp
The AI-BankApp (https://github.com/TrainWithShubham/AI-BankApp-DevOps) tied together the last 13 days:

| Day | What You Did with the AI-BankApp |
|-----|--------------------------------|
| 78 | Deployed its MySQL dependency via Helm chart |
| 79 | Converted its 12 raw K8s manifests into a Helm chart |
| 80 | Created dev/staging/prod values, hooks, CI/CD integration |
| 81 | Provisioned EKS using its `terraform/` configs |
| 82 | Set up Gateway API, EBS storage, session persistence from its `k8s/` manifests |
| 83 | Full production deployment with monitoring |
| 84 | Deployed via ArgoCD using its `argocd/application.yml` |
| 85 | Added sync waves, App of Apps, RBAC |
| 86 | Wired its GitHub Actions pipeline for end-to-end GitOps |

One real-world project. Every tool applied to it.

---

##### Task 3: Skills Inventory
Rate yourself on each skill. Be honest -- this is for you, not anyone else.

| Skill | Days | Confidence (1-5) |
|-------|------|------------------|
| Linux command line | 1-13 | |
| Shell scripting | 16-21 | |
| Git & GitHub | 22-28 | |
| Docker | 29-37 | |
| CI/CD (GitHub Actions) | 38-49 | |
| Kubernetes | 50-58 | |
| Terraform | 59-67 | |
| Ansible | 68-72 | |
| Observability (Prometheus, Grafana, Loki) | 73-77 | |
| Helm | 78-80 | |
| Amazon EKS | 81-83 | |
| ArgoCD / GitOps | 84-86 | |
| Agentic AI for DevOps | 87-89 | |

For anything below 3, go back and redo that block. The day folders are still there. The tasks have not changed.

---

##### Task 4: What Comes Next
DevOps does not stop at day 90. Here is what to explore next:

**Deepen what you learned:**
- Multi-cluster Kubernetes (federation, fleet management)
- Advanced Terraform (custom providers, Terragrunt, drift detection)
- Service mesh (Istio, Linkerd)
- Secrets management (HashiCorp Vault, AWS Secrets Manager, External Secrets Operator)
- Database operations (backups, migrations, blue-green database deployments)
- Chaos engineering (Litmus, Chaos Monkey)
- FinOps (cloud cost optimization)

**Certifications to pursue:**
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator (CKA)
- Certified Kubernetes Application Developer (CKAD)
- HashiCorp Terraform Associate
- GitHub Actions Certification

**Build a portfolio project:**
Take everything from days 78-89 and build it from scratch for your own application:
1. Write an app (any language)
2. Dockerize it
3. Create a Helm chart
4. Provision EKS with Terraform
5. Deploy with ArgoCD
6. Monitor with Prometheus + Grafana
7. Set up the full GitOps CI/CD pipeline
8. Add an AI agent for troubleshooting

Put it on GitHub. Write a blog post about it. Share it on LinkedIn.

---

##### Task 5: Write Your Graduation Post
Create a final documentation file that captures your entire journey.

Create `day-90-graduation.md` with:
- The 90-day timeline showing what you learned each week
- Your top 5 "aha moments" from the challenge
- The hardest day and how you pushed through it
- Your skills inventory (from Task 3)
- Screenshot collage: terminal outputs, Grafana dashboards, ArgoCD UI, the AI-BankApp running on EKS
- What you plan to learn next
- Advice for someone starting day 1 tomorrow

---

##### Task 6: Share Your Achievement
You spent 90 days showing up. That matters.

Write a LinkedIn post (suggested template -- make it your own):

---

*I just completed the #90DaysOfDevOps challenge by @TrainWithShubham.*

*90 days ago I started with Linux commands. Today I have a production-grade pipeline:*

*- Infrastructure provisioned with Terraform*
*- Containers orchestrated on Amazon EKS*
*- Applications packaged with Helm*
*- CI/CD automated with GitHub Actions*
*- Deployments managed by ArgoCD (GitOps)*
*- Full observability with Prometheus, Grafana, and Loki*
*- AI agents that diagnose and fix Kubernetes issues*

*The biggest lesson: DevOps is not about tools. It is about connecting tools into a pipeline where code flows from a developer's laptop to production with confidence, speed, and visibility.*

*Thank you to the community for the support.*

*What's next: [your plan]*

---

Tag: `#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

---

#### Submission
1. Add `day-90-graduation.md` to `2026/day-90/`
2. Commit and push to your fork
3. Share on LinkedIn

---

#### Final Words

90 days of showing up, building, breaking, and fixing. You did not just learn DevOps -- you practiced it. Every day. That discipline is more valuable than any certification.

The tools will change. New ones will appear. The ones you learned will get updates. But the patterns -- infrastructure as code, containerization, orchestration, observability, GitOps, automation -- those stay. You now have the foundation to learn any new tool in a weekend because you understand the patterns underneath.

Keep building. Keep sharing. Keep learning in public.

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 90: Final Capstone Project (Infra + App + CI/CD)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Final Capstone Project (Infra + App + CI/CD)**.

#### 🎯 Learning Goals
- Understand the fundamentals of Final Capstone Project (Infra + App + CI/CD).
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day90: Final Capstone Project (Infra + App + CI/CD)`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 89](../day-89/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | —
