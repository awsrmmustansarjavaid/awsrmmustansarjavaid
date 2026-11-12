# DevOps 90-Day Master Plan

A unified, day-by-day DevOps learning program: 90 daily lessons, each in a single `README.md`.

## What is inside

- **Primary curriculum:** the complete 90-day professional roadmap, with structured daily lessons, objectives, hands-on labs, real-world scenarios, troubleshooting, security/reliability notes, interview preparation, self-assessment, and GitHub deliverables.
- **Practical material:** hands-on exercises, worked solutions, cheat sheets and runbooks are built directly into each day's lesson (Section 7).

## Start here

1. Read [LAB-ENVIRONMENT-SETUP.md](LAB-ENVIRONMENT-SETUP.md).
2. Review the [90-Day Roadmap](90-DAY-ROADMAP.md).
3. Start with [Day 01](day-01/README.md) and complete one day at a time.
4. Track progress in [Learning Tracker](LEARNING-TRACKER.md).
5. Complete the [Projects and Capstones](PROJECTS-AND-CAPSTONES.md).
6. Finish with [Assessment and Certification](ASSESSMENT-AND-CERTIFICATION.md) and [Career and Interview Preparation](CAREER-AND-INTERVIEW-PREPARATION.md).
7. [DevOps Notes](devops-notes/)

## Daily structure

Every day has exactly one file, `day-XX/README.md`, containing the full lesson: objectives, theory, labs, extended practice notes, troubleshooting, assessment and GitHub deliverables.

## Four learning phases

| Phase | Days | Focus |
|---|---:|---|
| 1 — Foundations | 1–28 | Linux, networking, Bash/Python, Git and engineering workflow |
| 2 — Delivery & Security | 29–49 | Docker, CI/CD, deployment strategies and DevSecOps |
| 3 — Cloud & Infrastructure Automation | 50–70 | AWS/Azure, Terraform, Ansible and infrastructure automation |
| 4 — Platform, Reliability & Career | 71–90 | Kubernetes, Helm, GitOps, observability, SRE, platform engineering and career readiness |

## Important lab safety

- Use a personal lab, VM, or sandbox; do not run destructive commands on production systems.
- Never commit credentials, private keys, tokens, kubeconfigs, or cloud secrets.
- Set cloud budgets and alerts before creating resources.
- Follow each lab's cleanup/teardown steps to avoid unexpected charges.
- Tool versions and cloud interfaces change; check official documentation when a command or UI differs.

## Folder layout

- `day-01/` … `day-90/` — one `README.md` per day
- `90-DAY-ROADMAP.md` — topic and phase map
- `LEARNING-TRACKER.md` — progress and confidence tracking
- `PROJECTS-AND-CAPSTONES.md` — portfolio projects
- `ASSESSMENT-AND-CERTIFICATION.md` — final assessment
- `CAREER-AND-INTERVIEW-PREPARATION.md` — interview and career preparation
- `reference-materials/` — original practice files (scripts, configs, project artifacts) for optional reuse
- [DevOps Notes](devops-notes/)


## Personal Journal (Days 1–31)

Days 01–31 contain two layers in the same `day-XX/README.md`: the structured lesson (Sections 1–17) followed by **Section 18 — Personal Learning Journal** with my own notes from the original journal repo. Days 32–90 contain the structured lesson only. See [PERSONAL-JOURNAL-README.md](PERSONAL-JOURNAL-README.md) for the original journal intro.

| Day | Journal topics | Status |
|---|---|---|
| Day 01 | DevOps Roadmap & Introduction | ✅ |
| Day 02 | Linux Architecture & Basic Commands | ✅ |
| Day 03 | Advanced Linux, SSH, Volume Management & AWS EBS | ✅ |
| Day 04 | Linux Permissions & Users | ✅ |
| Day 05 | Shell Scripting Basics | ✅ |
| Day 06 | Networking, AWS VPC & Shell Scripting Projects | ✅ |
| Day 07 | Networking Fundamentals, OSI Model & Python Basics | ✅ |
| Day 08 | Network Security, System Design & Python APIs | ✅ |
| Day 09 | Git, GitHub & AWS Python Automation | ✅ |
| Day 10 | Git Advanced, AWS Cloud Fundamentals & Python OOP | ✅ |
| Day 11 | DevSecOps Fundamentals, OWASP Threat Dragon & GitHub Secrets | ✅ |
| Day 12 | Advanced Git & AWS EC2, IAM and S3 | ✅ |
| Day 13 | DevSecOps Pipeline, Security Automation & Python Projects | ✅ |
| Day 14 | DevOps, Jira Project Management & Python OOP Learning | ✅ |
| Day 15 | AWS EC2, Auto Scaling, Load Balancer & S3 Static Website Hosting | ✅ |
| Day 16 | GitOps with Jira, AWS Auto Scaling & Amazon RDS | ✅ |
| Day 17 | Docker Fundamentals & AWS NoSQL Database (DynamoDB) | ✅ |
| Day 18 | SAST, SCA & SonarQube (Manual Code Analysis) | ✅ |
| Day 19 | Advanced Docker: Multi-Stage Builds, Volumes & Networking | ✅ |
| Day 20 | 3-Tier Microservices with Docker | ✅ |
| Day 21 | Advanced Containerization: Multi-Stage Builds & Security | ✅ |
| Day 22 | Docker Compose Orchestration | ✅ |
| Day 23 | Containerizing Microservices & DevSecOps Best Practices | ✅ |
| Day 24 | First Steps into CI/CD Automation with GitHub Actions | ✅ |
| Day 25 | End-to-End Multi-Tier Deployment Pipeline | ✅ |
| Day 26 | Weekly Revision: Containerization & CI/CD Pipelines | ✅ |
| Day 27 | Matrix Strategy in GitHub Actions and Cron Job Scheduling | ✅ |
| Day 28 | DevSecOps and CI/CD Pipeline Integration | ✅ |
| Day 29 | Production-Oriented CI/CD + DevSecOps Pipeline | ✅ |
| Day 30 | 30 Days of Building, 30 Days of Learning | ✅ |
| Day 31 | Automated Jenkins Pipeline & GitHub Integration | ✅ |

## What each day contains

Every `day-XX/README.md` is a single file that holds, in order: the core lesson (Sections 1–17), the personal journal (days 1–31 only), **Challenge Notes** (from the *90 Days DevOps Challenge* repository, with video links and PDFs), **Cohort Practice** (from the *90DaysOfDevops* cohort repository) and a **Hands-on Project** (from the *90daysofdevops* repository, with scripts, Terraform, Kubernetes and pipeline code). Code and attachments for a day are in that day's `files/` folder, and topic-based study material is in [extra-resources](extra-resources/README.md). Days 65 and 71 had two versions in the Challenge Notes source; both are included.

## Challenge Notes, Cohort Practice and Hands-on Projects (Days 1–90)

| Day | Core lesson | Challenge Notes topic | Cohort Practice topic | Hands-on Project topic |
|---:|---|---|---|---|
| 01 | [DevOps Mindset, Lab Setup & Linux First Steps](day-01/README.md) | Introduction to DevOps and Cloud Computing | Introduction to DevOps and Cloud | Linux Files & Permissions |
| 02 | [Linux File System Hierarchy & Navigation](day-02/README.md) | AWS Fundamentals and Services Overview | Linux Architecture, Processes, and systemd | Shell Text Processing (grep/awk/sed) |
| 03 | [Files, Text Processing & Pipes (grep, sed, awk, find)](day-03/README.md) | Setting Up AWS Free Tier Account and CLI | Linux Commands Practice | Git Advanced Branching |
| 04 | [Users, Groups, Permissions & sudo](day-04/README.md) | Basics of IAM and Access Management | Linux Practice: Processes and Services | Python CLI with Click |
| 05 | [Processes, systemd Services & Scheduling](day-05/README.md) | Introduction to Version Control (Git and GitHub) | Linux Troubleshooting Drill: CPU, Memory, and Logs | Python + Boto3 S3 Tool |
| 06 | [Linux Troubleshooting: CPU, Memory, Disk & Logs](day-06/README.md) | Linux Basics and Commands for DevOps | Linux Fundamentals: Read and Write Text Files | Shell Script: Backup & Rotate Logs |
| 07 | [Packages, Storage (LVM) & Week 1 Mini-Project](day-07/README.md) | AWS EC2 Launch, Configure, and SSH Access | Linux File System Hierarchy & Scenario-Based Practice | Git Hooks (pre-commit, pre-push) |
| 08 | [Networking Fundamentals: OSI, TCP/IP, IP Addressing & Subnets](day-08/README.md) | Managing EC2 Instances and Auto Scaling | Cloud Server Setup: Docker, Nginx & Web Deployment | Python Unit Testing with Pytest |
| 09 | [DNS, HTTP/HTTPS & TLS with curl](day-09/README.md) | EBS and S3 Storage Concepts and Usage | Linux User & Group Management Challenge | Makefiles for DevOps Automation |
| 10 | [Ports, Firewalls & Network Debugging (ufw, nftables, tcpdump)](day-10/README.md) | Managing Snapshots and AMIs | File Permissions & File Operations Challenge | Regex for Log Parsing |
| 11 | [SSH Deep Dive: Keys, Config, Tunnels & Bastion Hosts](day-11/README.md) | VPC Deep Dive – Subnets, Route Tables, Gateways | File Ownership Challenge (chown & chgrp) | Terraform Remote State |
| 12 | [Nginx Reverse Proxy, TLS & First Web Deployment](day-12/README.md) | Security Groups, NACLs, and VPC Peering | Breather & Revision (Days 01–11) | IAM Users & Policies |
| 13 | [Linux Hardening & Security Baseline](day-13/README.md) | NAT Gateway, Internet Gateway, and Bastion Host | Linux Volume Management (LVM) | S3 Bucket + Versioning & Lifecycle |
| 14 | [Week 2 Review & Incident Drill: 'The Site Is Down'](day-14/README.md) | Deeper into Linux (Permissions, Processes, Services) | Networking Fundamentals & Hands-on Checks | VPC, Subnets, IGW, NAT |
| 15 | [Bash Scripting: Variables, Conditionals & Exit Codes](day-15/README.md) | Introduction to Shell Scripting | Networking Concepts: DNS, IP, Subnets & Ports | Route Tables & VPC Endpoints (S3/DynamoDB + Interface) |
| 16 | [Bash: Loops, Arguments, Functions & Error Handling](day-16/README.md) | Introduction to AWS CloudWatch | Shell Scripting Basics | Security Groups & NACLs |
| 17 | [Bash Project: Log Analyzer & Report Generator](day-17/README.md) | Setting Alarms, Dashboards, and Metrics | Shell Scripting: Loops, Arguments & Error Handling | EC2 + User Data + SSM (No SSH Keys) |
| 18 | [Python for DevOps: Basics, Virtual Environments & Files](day-18/README.md) | AWS CloudTrail and Centralized Logging (ELK) | Shell Scripting: Functions & intermediate Concepts | Application Load Balancer (ALB) with HTTPS (ACM) + Health Checks |
| 19 | [Python: JSON, YAML & REST API Automation](day-19/README.md) | Introduction to Docker and Containerization | Shell Scripting Project: Log Rotation, Backup & Crontab | Auto Scaling Group (ASG) behind the ALB (Rolling Updates + Target Tracking) |
| 20 | [Python: Cloud SDK Basics, CLI Tools & Testing](day-20/README.md) | Building and Running Docker Containers | Bash Scripting Challenge: Log Analyzer and Report Generator | CloudWatch Alarms (ALB + Target Group + ASG) with SNS Notifications |
| 21 | [Week 3 Project: System Health-Check Tool (Bash + Python)](day-21/README.md) | Docker Networking, Volumes, and Compose | Shell Scripting Cheat Sheet: Build Your Own Reference Guide | RDS with Terraform (PostgreSQL) |
| 22 | [Git Fundamentals: Your First Repository](day-22/README.md) | Dockerizing a Sample App | Introduction to Git: Your First Repository | ElastiCache (Redis) with Terraform |
| 23 | [Git Branching, Merging & GitHub Pull Requests](day-23/README.md) | Introduction to Kubernetes | Git Branching & Working with GitHub | SSM Parameters & Secrets (KMS + App Bootstrap) |
| 24 | [Advanced Git: Rebase, Stash, Cherry-pick, Reset vs Revert & Reflog](day-24/README.md) | Deploying Apps on Kubernetes (kubectl, YAML) | Advanced Git: Merge, Rebase, Stash & Cherry Pick | Amazon ECR: Repositories, Lifecycle, and IAM (Terraform) |
| 25 | [Branching Strategies, Conventional Commits, SemVer & Code Review](day-25/README.md) | Kubernetes Services, Ingress, and Load Balancing | Git Reset vs Revert & Branching Strategies | CloudFront Static Site with S3 (+ OAC, HTTPS) |
| 26 | [GitHub CLI, Branch Protection, CODEOWNERS & Pre-commit Hooks](day-26/README.md) | Kubernetes Volumes, ConfigMaps, and Secrets | GitHub CLI: Manage GitHub from Your Terminal | Route53 DNS Records (CloudFront + optional ALB) |
| 27 | [YAML, JSON, Makefiles & Code Quality Tooling](day-27/README.md) | Kubernetes Monitoring (Prometheus + Grafana) | GitHub Profile Makeover: Build Your Developer Identity | AWS Backup Plans (Terraform) |
| 28 | [Phase 1 Review & GitHub Portfolio Setup](day-28/README.md) | Kubernetes RBAC and Security Best Practices | Revision Day: Everything from Day 1 to Day 27 | Budgets & Cost Alerts (Terraform) |
| 29 | [Containers Fundamentals & Docker Installation](day-29/README.md) | Helm Charts and Application Packaging | Introduction to Docker | AWS Config Rules, Conformance Packs & Remediation (Terraform) |
| 30 | [Docker Images, Layers & Container Lifecycle](day-30/README.md) | Real-World Kubernetes Deployment Example | Docker Images & Container Lifecycle | AWS Organizations & Service Control Policies (SCPs) |
| 31 | [Dockerfile Best Practices: Build Your Own Images](day-31/README.md) | Jenkins and CICD Fundamentals | Dockerfile: Build Your Own Images | Jenkins Docker Agent |
| 32 | [Docker Volumes, Bind Mounts & Networking](day-32/README.md) | Installing Jenkins on AWS EC2 | Docker Volumes & Networking | Jenkins Declarative Pipelines |
| 33 | [Docker Compose: Multi-Container Applications](day-33/README.md) | Jenkins + GitHub Integration | Docker Compose: Multi-Container Basics | Jenkins Multibranch Pipelines |
| 34 | [Multi-Stage Builds, Registries & Image Tagging Strategy](day-34/README.md) | CICD for Dockerized Apps | Docker Compose: Real-World Multi-Container Apps | Jenkins Shared Libraries |
| 35 | [Container Security: Scanning, Non-root, SBOM & Hardening](day-35/README.md) | Jenkinsfile and Declarative Pipelines | Multi-Stage Builds & Docker Hub | Terraform Pipeline |
| 36 | [CI/CD Concepts & Your First GitHub Actions Workflow](day-36/README.md) | GitHub Actions Introduction | Docker Project: Dockerize a Full Application | Docker Build + Push to ECR |
| 37 | [GitHub Actions: Triggers, Matrix, Caching & Conditionals](day-37/README.md) | Building Workflows with GitHub Actions | Docker Revision & Cheat Sheet | Helm Deploy to EKS |
| 38 | [Secrets, OIDC, Artifacts & Tests in CI](day-38/README.md) | Advanced GitHub Actions with Secrets and Artifacts | YAML Basics | Approval Gates |
| 39 | [Build & Push Docker Images in CI; Reusable Workflows](day-39/README.md) | Introduction to Terraform and IaC | What is CI/CD? | Parallel Stages |
| 40 | [Jenkins: Installation, Pipelines & Jenkinsfile](day-40/README.md) | Writing Terraform for AWS (EC2, S3, IAM) | Your First GitHub Actions Workflow | Artifact Archiving |
| 41 | [Jenkins: Agents, Credentials, Multibranch & Shared Libraries](day-41/README.md) | Terraform State Management and Workspaces | Triggers & Matrix Builds | Secrets & Credentials Binding (Jenkins) |
| 42 | [GitLab CI/CD: Pipelines, Runners & Environments](day-42/README.md) | Advanced Terraform Concepts (Modules, Remote Backends) | Runners: GitHub-Hosted & Self-Hosted | Quality Gates (tfsec, checkov) |
| 43 | [Deployment Strategies: Rolling, Blue-Green, Canary & Rollbacks](day-43/README.md) | Terraform + Jenkins CICD Integration | Jobs, Steps, Env Vars & Conditionals | Nightly Synthetic Tests |
| 44 | [DevSecOps I: SAST, Dependency Scanning & Code Scanning](day-44/README.md) | AWS CloudFormation Basics and YAML Templates | Secrets, Artifacts & Running Real Tests in CI | Webhook Triggers |
| 45 | [DevSecOps II: Secrets Management - gitleaks, SOPS & Vault](day-45/README.md) | Writing Reusable CloudFormation Templates | Docker Build & Push in GitHub Actions | Backup & Restore Jenkins |
| 46 | [DevSecOps III: DAST, Image Signing, SLSA & Supply-Chain Security](day-46/README.md) | Automated Infrastructure Provisioning Pipeline | Reusable Workflows & Composite Actions | Docker Multi‑Stage Builds & Image Security |
| 47 | [Capstone 1 (Part 1/3): Design, App & CI Foundation](day-47/README.md) | Introduction to Ansible and Configuration Management | Advanced Triggers: PR Events, Cron Schedules & Event-Driven Pipelines | Docker Compose for Local Dev |
| 48 | [Capstone 1 (Part 2/3): Containerise, Scan, Sign & Publish](day-48/README.md) | Writing Playbooks and Ansible Roles | GitHub Actions Project: End-to-End CI/CD Pipeline | EKS Cluster with Terraform |
| 49 | [Capstone 1 (Part 3/3): Deploy, Smoke-Test, Roll Back & Document](day-49/README.md) | Ansible + Jenkins Integration | DevSecOps: Add Security to Your CI/CD Pipeline | EKS Managed Nodegroups (Spot + On‑Demand, Taints/Labels, Scaling) |
| 50 | [Cloud Fundamentals, AWS Account Setup & Billing Guardrails](day-50/README.md) | Ansible Best Practices and Secrets Management | Kubernetes Architecture and Cluster Setup | Kubernetes Deployment & Service |
| 51 | [AWS IAM Deep Dive: Policies, Roles, STS & Least Privilege](day-51/README.md) | Serverless Architecture and AWS Lambda Basics | Kubernetes Manifests and Your First Pods | ConfigMaps & Secrets |
| 52 | [AWS Networking: VPC, Subnets, Routing, NAT & Security Groups](day-52/README.md) | Writing Lambda Functions and Triggers (S3, API Gateway) | Kubernetes Namespaces and Deployments | Ingress + AWS Load Balancer (ALB) Controller |
| 53 | [AWS Compute: EC2, AMIs, EBS, Load Balancers & Auto Scaling](day-53/README.md) | CICD for Serverless (Serverless FrameworkSAM) | Kubernetes Services | Horizontal Pod Autoscaler (HPA) |
| 54 | [AWS Storage & Databases: S3, EBS/EFS, RDS & Backups](day-54/README.md) | Monitoring Serverless Applications | Kubernetes ConfigMaps and Secrets | Helm Chart for API Service |
| 55 | [AWS Observability & FinOps: CloudWatch, CloudTrail, Budgets & Cost Optimisation](day-55/README.md) | Logging with CloudWatch for Lambda | Persistent Volumes (PV) and Persistent Volume Claims (PVC) | Helm Chart for Worker Service (Queue/Cron) |
| 56 | [Azure Fundamentals for DevOps & Multi-Cloud Mapping](day-56/README.md) | Real-World Serverless Automation Example | Kubernetes StatefulSets | Kustomize Overlays |
| 57 | [Infrastructure as Code & Terraform: First Resources](day-57/README.md) | AWS API Gateway Deep Dive | Resource Requests, Limits, and Probes | Fluent Bit + CloudWatch Logs (EKS) |
| 58 | [Terraform: Providers, Resources, Dependencies & Lifecycle](day-58/README.md) | Automating Backups and Notifications | Metrics Server and Horizontal Pod Autoscaler (HPA) | Prometheus Stack on EKS (kube-prometheus-stack) |
| 59 | [Terraform: Variables, Outputs, Data Sources & Expressions](day-59/README.md) | Advanced Monitoring and Logging Pipelines | Helm — Kubernetes Package Manager | Grafana Dashboards (kube-prometheus-stack) |
| 60 | [Terraform State, Remote Backends, Locking & Import](day-60/README.md) | Observability with OpenTelemetry | Capstone: Deploy WordPress + MySQL on Kubernetes | OpenTelemetry Collector on EKS (OTLP → Prometheus/Grafana + AWS X-Ray/CloudWatch) |
| 61 | [Terraform Modules: Reusable Infrastructure](day-61/README.md) | APM with Datadog and AWS Integrations | Introduction to Terraform and Your First AWS Infrastructure | tfsec + checkov Integration (Terraform IaC Security) |
| 62 | [Terraform in CI/CD: Plan/Apply Pipelines, Policy-as-Code & Security Scanning](day-62/README.md) | Security IAM Best Practices | Providers, Resources and Dependencies | OPA/Conftest Policies for Terraform & Kubernetes |
| 63 | [Capstone 2 (Part 1/3): Cloud Foundation with Terraform](day-63/README.md) | AWS Secrets Manager and Parameter Store | Variables, Outputs, Data Sources and Expressions | Gitleaks & Pre-commit Hooks (Secret Scanning) |
| 64 | [Ansible: Introduction, Inventory & Ad-hoc Commands](day-64/README.md) | Network Security WAF, Shield, NACLs | Terraform State Management and Remote Backends | IAM Least Privilege |
| 65 | [Ansible Playbooks, Modules, Handlers & Idempotency](day-65/README.md) | Compliance Tools AWS Config, Security Hub, Trusted Advisor | Terraform Modules: Build Reusable Infrastructure | KMS Keys & Encryption |
| 66 | [Ansible: Variables, Facts, Conditionals, Loops & Jinja2 Templates](day-66/README.md) | Cost Optimization Strategies | Provision an EKS Cluster with Terraform Modules | GuardDuty & Security Hub |
| 67 | [Ansible Roles, Collections, Galaxy & Vault](day-67/README.md) | Monitoring Cost with AWS Budgets and Billing Tools | TerraWeek Capstone: Multi-Environment Infrastructure with Workspaces and Modules | AWS SSO/SAML Notes |
| 68 | [Terraform + Ansible Together: Provision, Configure & Dynamic Inventory](day-68/README.md) | Tagging and Resource Management Best Practices | Introduction to Ansible and Inventory Setup | Network ACL Best Practices |
| 69 | [Capstone 2 (Part 2/3): Configure, Deploy & Pipeline](day-69/README.md) | Disaster Recovery and High Availability | Ansible Playbooks and Modules | AWS WAF WebACL |
| 70 | [Capstone 2 (Part 3/3): Hardening, DR, Cost Review & Documentation](day-70/README.md) | AWS Systems Manager and Patch Management | Variables, Facts, Conditionals and Loops | AWS Shield Advanced Notes |
| 71 | [Kubernetes Architecture, Local Cluster & kubectl](day-71/README.md) | Multi-Cloud Deployments AWS + Azure | Roles, Galaxy, Templates and Vault | Lambda with Python (Terraform) |
| 72 | [Pods, Manifests, Namespaces & Deployments](day-72/README.md) | EKS Cluster Setup with Terraform | Ansible Project: Automate Docker and Nginx Deployment | API Gateway HTTP API Integration |
| 73 | [Kubernetes Services, Ingress & Gateway API](day-73/README.md) | Jenkins Pipelines for Kubernetes | Introduction to Observability and Prometheus | EventBridge Scheduled Events |
| 74 | [ConfigMaps, Secrets, Persistent Volumes & StatefulSets](day-74/README.md) | Kubernetes Service Mesh with Istio | Node Exporter, cAdvisor, and Grafana Dashboards | Step Functions Flow |
| 75 | [Resource Management, Probes, HPA & Scheduling](day-75/README.md) | Logging and Monitoring for Production Apps | Log Management with Loki and Promtail | SQS + Dead Letter Queue |
| 76 | [Kubernetes Security: RBAC, NetworkPolicy, Pod Security & Admission Policies](day-76/README.md) | Real-Time Dashboards with Grafana + Loki | OpenTelemetry and Alerting | SNS Notifications |
| 77 | [Helm: Charts, Values, Templates & Releases](day-77/README.md) | Kubernetes Autoscaling | Observability Project: Full Stack with Docker Compose | S3 Event Triggers |
| 78 | [Kubernetes Troubleshooting & Kustomize](day-78/README.md) | GitOps with ArgoCD and FluxCD | Introduction to Helm and Chart Basics | Glue & Athena Basics |
| 79 | [GitOps with Argo CD: Declarative Deployments](day-79/README.md) | CICD for Microservices | Creating a Custom Helm Chart for AI-BankApp | Kinesis Firehose to S3 |
| 80 | [Argo CD Advanced: App-of-Apps, ApplicationSets, Rollouts & Promotion](day-80/README.md) | AWS CodePipeline + CodeDeploy + CodeBuild | Helm Project: Multi-Environment Deployment and CI/CD | CloudTrail Org Trail |
| 81 | [Observability I: Prometheus, Exporters & Grafana](day-81/README.md) | X-Ray for Tracing Microservices | Introduction to Amazon EKS with Terraform | Blue/Green Deployment with Helm |
| 82 | [Observability II: Logs (Loki), Traces (OpenTelemetry) & Alerting](day-82/README.md) | Handling Multi-Environment Deployments | EKS Networking with Gateway API and Persistent Storage | Argo Rollouts Canary Deployment |
| 83 | [SRE Fundamentals: SLIs, SLOs, Error Budgets & Toil](day-83/README.md) | End-to-End Infrastructure Automation | EKS Project: Production Deployment of AI-BankApp | Cost Explorer Scripts with Boto3 |
| 84 | [Incident Response, Postmortems, Backup/DR & Chaos Engineering](day-84/README.md) | Building a DevSecOps Pipeline | Introduction to GitOps and ArgoCD | Compute Optimizer Review |
| 85 | [Platform Engineering: Internal Developer Platforms & Golden Paths](day-85/README.md) | High Availability Setup on AWS | ArgoCD Deep Dive: Sync Strategies, Rollbacks, and Multi-App Management | Chaos Engineering (Pod Delete) |
| 86 | [Cost Optimisation (FinOps for Cloud & Kubernetes) & AI-Assisted DevOps](day-86/README.md) | Chaos Engineering and Resilience Testing | GitOps Project: End-to-End CI/CD Pipeline with AI-BankApp | Locust Load Testing |
| 87 | [Capstone 3 (Part 1/3): Production Kubernetes Platform Foundation](day-87/README.md) | Debugging and Troubleshooting Production Systems | Introduction to Agentic AI for DevOps | Performance Profiling (py-spy) |
| 88 | [Capstone 3 (Part 2/3): Application Delivery, Observability & Security](day-88/README.md) | Final Real-World Deployment Project | Multi-Tool Agents, MCP, and CI/CD Analyzer | SLOs, SLIs, Error Budgets |
| 89 | [Capstone 3 (Part 3/3): Resilience Drills, Cost Review & Documentation](day-89/README.md) | Portfolio and Resume Building | Production AI Agents: KubeHealer and AIOps | On-call Runbook Templates |
| 90 | [Final Assessment, Portfolio Polish & Interview Readiness](day-90/README.md) | Career Roadmap, Certification Paths, and Final Review | Grand Finale: The Complete DevOps Journey | Final Capstone Project (Infra + App + CI/CD) |

Extra resources: [LAB.md](LAB.md) (LinkedIn showcase task) and the [interview-resources](interview-resources/) folder.
