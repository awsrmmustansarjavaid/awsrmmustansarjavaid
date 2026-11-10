# Source Repository Mapping

This curriculum builds on your two repositories (`90DaysOfDevOps-master/2026` and `90Days-DevOps-Journey-main`). The table shows where your existing notes and projects reinforce each day. Review your earlier notes first, then use the daily guide here to go deeper and add the 2026 requirements.

## What was kept

The overall flow (Linux -> Git -> Docker -> CI/CD -> Kubernetes -> Terraform -> Ansible -> Observability -> Helm/EKS -> GitOps -> AI) and the project-based style.

## What was added or modernised

- DevSecOps across the pipeline (SAST, SCA, DAST, secrets, SBOM, signing, SLSA)
- Azure fundamentals, GitLab CI and Jenkins
- SRE (SLI/SLO, error budgets, incidents, postmortems, DR, chaos)
- Platform engineering and golden paths
- FinOps and cost guardrails; responsible AI-assisted operations
- Python automation and testing; code quality and pre-commit
- Daily troubleshooting, security notes, interview prep and self-assessment
- Three capstones with acceptance criteria and a final readiness assessment

## Existing material you can reuse

| Your folder | Reuse as |
|---|---|
| `90Days-DevOps-Journey-main/E-commerce`, `docker-project`, `project-node-express-mongodb` | Application for Capstone 1 or Docker/Compose labs |
| `90DaysOfDevOps-master/2026/day-63` ... `day-67` (Terraform files) | Starting point for Days 57–63 |
| `.../day-69`, `day-72` (Ansible) | Starting point for Days 65–69 |
| `.../day-79`, `day-80` (Helm for AI-BankApp) | Day 77 and Capstone 3 sample app |
| `.../day-84` – `day-86` (ArgoCD/GitOps) | Days 79–80 and Capstone 3 |
| `.../day-87` – `day-89` (Agentic AI/AIOps) | Day 86 (with the safety guardrails added here) |

> Before reusing any file, scan for secrets and remove committed state (`terraform.tfstate`, `.tfvars`, tokens) — do this before publishing publicly.

## Day-by-day mapping

| This curriculum | Your earlier reference |
|---|---|
| [Day 02](day-02/README.md) — Linux File System Hierarchy & Navigation | 2026/day-07 |
| [Day 03](day-03/README.md) — Files, Text Processing & Pipes (grep, sed, awk, find) | 2026/day-06 |
| [Day 04](day-04/README.md) — Users, Groups, Permissions & sudo | 2026/day-09, 2026/day-10, 2026/day-11 |
| [Day 05](day-05/README.md) — Processes, systemd Services & Scheduling | 2026/day-04 |
| [Day 06](day-06/README.md) — Linux Troubleshooting: CPU, Memory, Disk & Logs | 2026/day-05 |
| [Day 07](day-07/README.md) — Packages, Storage (LVM) & Week 1 Mini-Project | 2026/day-13 |
| [Day 08](day-08/README.md) — Networking Fundamentals: OSI, TCP/IP, IP Addressing & Subnets | 2026/day-14 |
| [Day 09](day-09/README.md) — DNS, HTTP/HTTPS & TLS with curl | 2026/day-15 |
| [Day 15](day-15/README.md) — Bash Scripting: Variables, Conditionals & Exit Codes | 2026/day-16 |
| [Day 16](day-16/README.md) — Bash: Loops, Arguments, Functions & Error Handling | 2026/day-17, 2026/day-18 |
| [Day 17](day-17/README.md) — Bash Project: Log Analyzer & Report Generator | 2026/day-20 |
| [Day 18](day-18/README.md) — Python for DevOps: Basics, Virtual Environments & Files | 2026/day-18 |
| [Day 22](day-22/README.md) — Git Fundamentals: Your First Repository | 2026/day-22 |
| [Day 23](day-23/README.md) — Git Branching, Merging & GitHub Pull Requests | 2026/day-23 |
| [Day 24](day-24/README.md) — Advanced Git: Rebase, Stash, Cherry-pick, Reset vs Revert & Reflog | 2026/day-24 |
| [Day 25](day-25/README.md) — Branching Strategies, Conventional Commits, SemVer & Code Review | 2026/day-25 |
| [Day 26](day-26/README.md) — GitHub CLI, Branch Protection, CODEOWNERS & Pre-commit Hooks | 2026/day-26 |
| [Day 27](day-27/README.md) — YAML, JSON, Makefiles & Code Quality Tooling | 2026/day-27, 2026/day-38 |
| [Day 28](day-28/README.md) — Phase 1 Review & GitHub Portfolio Setup | 2026/day-28 |
| [Day 29](day-29/README.md) — Containers Fundamentals & Docker Installation | 2026/day-29 |
| [Day 30](day-30/README.md) — Docker Images, Layers & Container Lifecycle | 2026/day-30 |
| [Day 31](day-31/README.md) — Dockerfile Best Practices: Build Your Own Images | 2026/day-31 |
| [Day 32](day-32/README.md) — Docker Volumes, Bind Mounts & Networking | 2026/day-32 |
| [Day 33](day-33/README.md) — Docker Compose: Multi-Container Applications | 2026/day-33, 2026/day-34 |
| [Day 34](day-34/README.md) — Multi-Stage Builds, Registries & Image Tagging Strategy | 2026/day-35 |
| [Day 35](day-35/README.md) — Container Security: Scanning, Non-root, SBOM & Hardening | 2026/day-37 |
| [Day 36](day-36/README.md) — CI/CD Concepts & Your First GitHub Actions Workflow | 2026/day-39, 2026/day-40 |
| [Day 37](day-37/README.md) — GitHub Actions: Triggers, Matrix, Caching & Conditionals | 2026/day-41, 2026/day-43 |
| [Day 38](day-38/README.md) — Secrets, OIDC, Artifacts & Tests in CI | 2026/day-44 |
| [Day 39](day-39/README.md) — Build & Push Docker Images in CI; Reusable Workflows | 2026/day-45, 2026/day-46 |
| [Day 42](day-42/README.md) — GitLab CI/CD: Pipelines, Runners & Environments | 2026/day-42 |
| [Day 44](day-44/README.md) — DevSecOps I: SAST, Dependency Scanning & Code Scanning | 2026/day-49 |
| [Day 57](day-57/README.md) — Infrastructure as Code & Terraform: First Resources | 2026/day-61 |
| [Day 58](day-58/README.md) — Terraform: Providers, Resources, Dependencies & Lifecycle | 2026/day-62 |
| [Day 59](day-59/README.md) — Terraform: Variables, Outputs, Data Sources & Expressions | 2026/day-63 |
| [Day 60](day-60/README.md) — Terraform State, Remote Backends, Locking & Import | 2026/day-64 |
| [Day 61](day-61/README.md) — Terraform Modules: Reusable Infrastructure | 2026/day-65 |
| [Day 62](day-62/README.md) — Terraform in CI/CD: Plan/Apply Pipelines, Policy-as-Code & Security Scanning | 2026/day-67 |
| [Day 64](day-64/README.md) — Ansible: Introduction, Inventory & Ad-hoc Commands | 2026/day-68 |
| [Day 65](day-65/README.md) — Ansible Playbooks, Modules, Handlers & Idempotency | 2026/day-69 |
| [Day 66](day-66/README.md) — Ansible: Variables, Facts, Conditionals, Loops & Jinja2 Templates | 2026/day-70 |
| [Day 67](day-67/README.md) — Ansible Roles, Collections, Galaxy & Vault | 2026/day-71 |
| [Day 68](day-68/README.md) — Terraform + Ansible Together: Provision, Configure & Dynamic Inventory | 2026/day-72 |
| [Day 71](day-71/README.md) — Kubernetes Architecture, Local Cluster & kubectl | 2026/day-50 |
| [Day 72](day-72/README.md) — Pods, Manifests, Namespaces & Deployments | 2026/day-51, 2026/day-52 |
| [Day 73](day-73/README.md) — Kubernetes Services, Ingress & Gateway API | 2026/day-53 |
| [Day 74](day-74/README.md) — ConfigMaps, Secrets, Persistent Volumes & StatefulSets | 2026/day-54, 2026/day-55, 2026/day-56 |
| [Day 75](day-75/README.md) — Resource Management, Probes, HPA & Scheduling | 2026/day-57, 2026/day-58 |
| [Day 77](day-77/README.md) — Helm: Charts, Values, Templates & Releases | 2026/day-59, 2026/day-78, 2026/day-79, 2026/day-80 |
| [Day 79](day-79/README.md) — GitOps with Argo CD: Declarative Deployments | 2026/day-84 |
| [Day 80](day-80/README.md) — Argo CD Advanced: App-of-Apps, ApplicationSets, Rollouts & Promotion | 2026/day-85 |
| [Day 81](day-81/README.md) — Observability I: Prometheus, Exporters & Grafana | 2026/day-73, 2026/day-74 |
| [Day 82](day-82/README.md) — Observability II: Logs (Loki), Traces (OpenTelemetry) & Alerting | 2026/day-75, 2026/day-76, 2026/day-77 |
| [Day 86](day-86/README.md) — Cost Optimisation (FinOps for Cloud & Kubernetes) & AI-Assisted DevOps | 2026/day-87, 2026/day-88, 2026/day-89 |
| [Day 87](day-87/README.md) — Capstone 3 (Part 1/3): Production Kubernetes Platform Foundation | 2026/day-81, 2026/day-82, 2026/day-83 |
| [Day 88](day-88/README.md) — Capstone 3 (Part 2/3): Application Delivery, Observability & Security | 2026/day-86 |
| [Day 90](day-90/README.md) — Final Assessment, Portfolio Polish & Interview Readiness | 2026/day-90 |
