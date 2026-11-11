# Merged DevOps 90-Day Master Plan

A unified, day-by-day DevOps learning program merged from the two supplied ZIP repositories.

## What was merged

- **Primary curriculum:** the complete 90-day professional roadmap, with structured daily lessons, objectives, hands-on labs, real-world scenarios, troubleshooting, security/reliability notes, interview preparation, self-assessment, and GitHub deliverables.
- **Practical companion repository:** the original `90DaysOfDevOps-master` day folders, notes, scripts, configuration files, project artifacts, and supporting resources.
- **Daily integration:** each `day-XX/README.md` links to its matching original source folder and, where available, a `SUPPLEMENTARY-MATERIALS.md` that brings the extra Markdown notes into that day's workflow.

## Start here

1. Read [LAB-ENVIRONMENT-SETUP.md](LAB-ENVIRONMENT-SETUP.md).
2. Review the [90-Day Roadmap](90-DAY-ROADMAP.md).
3. Start with [Day 01](day-01/README.md) and complete one day at a time.
4. Track progress in [Learning Tracker](LEARNING-TRACKER.md).
5. Complete the [Projects and Capstones](PROJECTS-AND-CAPSTONES.md).
6. Finish with [Assessment and Certification](ASSESSMENT-AND-CERTIFICATION.md) and [Career and Interview Preparation](CAREER-AND-INTERVIEW-PREPARATION.md).

## Daily structure

Every day has one canonical lesson in `day-XX/README.md`. Where the first repository supplied additional Markdown notes, they are collected in `day-XX/SUPPLEMENTARY-MATERIALS.md`. Original files are preserved under `reference-materials/90DaysOfDevOps-master/`.

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

- `day-01/` … `day-90/` — merged daily plans and supplements
- `90-DAY-ROADMAP.md` — topic and phase map
- `LEARNING-TRACKER.md` — progress and confidence tracking
- `PROJECTS-AND-CAPSTONES.md` — portfolio projects
- `ASSESSMENT-AND-CERTIFICATION.md` — final assessment
- `CAREER-AND-INTERVIEW-PREPARATION.md` — interview and career preparation
- `reference-materials/` — preserved files from the first supplied repository
