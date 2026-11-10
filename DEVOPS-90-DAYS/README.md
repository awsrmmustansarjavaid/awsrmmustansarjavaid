# DEVOPS 90 DAYS — Professional Engineering Roadmap (2026 Edition)

A 90-day, hands-on curriculum that builds **practical DevOps/Platform/SRE engineering capability** — not a pile of tutorials. Every day has its own folder, a full lesson, labs, a real-world scenario, a troubleshooting drill, security notes, interview questions, a self-assessment and a GitHub submission checklist.

> **Outcome:** at Day 90 you can build, secure, deploy, observe and operate a production-style system end to end, and prove it with three portfolio-grade capstone projects.

## How to use this repository

1. Complete [LAB-ENVIRONMENT-SETUP.md](LAB-ENVIRONMENT-SETUP.md) before Day 1.
2. Open `day-XX/README.md` each day. Follow it top to bottom. Tick the checkboxes as you go.
3. Do the labs **by typing, not copying**. Break things on purpose. Fix them.
4. Commit your work daily (see Section 14 of every day).
5. Update [LEARNING-TRACKER.md](LEARNING-TRACKER.md) at the end of each day; do a revision pass every Sunday.
6. Build the three capstones as described in [PROJECTS-AND-CAPSTONES.md](PROJECTS-AND-CAPSTONES.md).
7. Finish with [ASSESSMENT-AND-CERTIFICATION.md](ASSESSMENT-AND-CERTIFICATION.md) and [CAREER-AND-INTERVIEW-PREPARATION.md](CAREER-AND-INTERVIEW-PREPARATION.md).

## Repository structure

```text
DEVOPS-90-DAYS/
├── README.md
├── 90-DAY-ROADMAP.md
├── LEARNING-TRACKER.md
├── PROJECTS-AND-CAPSTONES.md
├── CAREER-AND-INTERVIEW-PREPARATION.md
├── TOOLS-AND-TECHNOLOGIES.md
├── LAB-ENVIRONMENT-SETUP.md
├── ASSESSMENT-AND-CERTIFICATION.md
├── SOURCE-REPO-MAPPING.md
├── GLOSSARY.md
├── CONTRIBUTING.md
├── LICENSE
├── day-01/README.md
├── day-02/README.md
├── ...
└── day-90/README.md
```

## The four phases

| Phase | Days | What you build |
|---|---|---|
| 1 — Foundations | 1–28 | Linux server runbook, hardened web server, `healthcheck` tool (Bash + Python), professional Git workflow |
| 2 — Delivery & Security | 29–49 | Containers, CI/CD (Actions, Jenkins, GitLab), DevSecOps, **Capstone 1: Secure CI/CD Platform** |
| 3 — Cloud & Infrastructure Automation | 50–70 | AWS + Azure, Terraform, Ansible, **Capstone 2: Cloud Infrastructure Automation** |
| 4 — Platform, Reliability & Career | 71–90 | Kubernetes, Helm, GitOps, observability, SRE, platform engineering, FinOps/AI, **Capstone 3: Production Kubernetes & GitOps Platform**, final assessment |

## What every daily file contains

Objectives · Prerequisites · Learning topics (real explanations) · Practical labs · Real-world scenario · Commands & scripts · Assignments with expected outcomes · Troubleshooting · Security/reliability/cost notes · Completion checklist · Deliverables · Interview preparation · Self-assessment · GitHub submission · Time allocation · Reflection.

## Skills covered (2026 job-market aligned)

Linux & systems · Git & code quality · Python/Bash/YAML/JSON/API automation · Docker & container security · GitHub Actions, Jenkins, GitLab CI · AWS & Azure · Terraform · Ansible · Kubernetes & Helm · Argo CD GitOps · Prometheus, Grafana, Loki, OpenTelemetry · DevSecOps (SAST, SCA, DAST, secrets, SBOM, signing, SLSA) · SRE (SLI/SLO, error budgets, incidents, DR, chaos) · Platform engineering · FinOps · responsible AI-assisted operations · career preparation.

## Quality standards

- Real content every day; progressive difficulty; hands-on every day.
- Real-world scenarios and independent assignments with expected outcomes.
- Security, automation, reliability and cost are integrated throughout, not bolted on.
- Three substantial capstones and a final career-readiness assessment.
- **Cost safety:** budgets and teardown steps are part of the cloud days. Always destroy lab resources.

## Time commitment

About 3.5 h/day (Phase 1) and 4 h/day afterwards; capstone days are 5–6 h. Total ≈ 350 hours. If you miss a day, do not skip — extend the schedule. Consistency beats speed.

## License

MIT — see [LICENSE](LICENSE).
