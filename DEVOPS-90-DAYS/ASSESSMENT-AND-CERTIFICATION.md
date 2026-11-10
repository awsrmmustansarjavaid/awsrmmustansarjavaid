# Assessment and Certification

## 1. Final career-readiness assessment (Day 90)

Score each domain 0–3 using the rubric. Target: **at least 36/45 and no domain at 0.**

| Score | Meaning |
|---|---|
| 0 | Cannot do |
| 1 | Can do with guidance/docs for each step |
| 2 | Can do alone with documentation |
| 3 | Can do alone, explain trade-offs, troubleshoot failures, and teach it |

| # | Domain | Evidence required | Score |
|---|---|---|---|
| 1 | Linux & systems | Rebuild web-01 from runbook; diagnose 3 faults | |
| 2 | Networking | Trace and fix an unreachable service; plan CIDRs | |
| 3 | Scripting (Bash/Python) | `healthcheck` tool with tests and README | |
| 4 | Git & workflow | PR workflow, conflict resolution, recovery with reflog | |
| 5 | Containers | Hardened multi-stage image, Compose stack | |
| 6 | CI/CD | Pipeline with tests, scan, deploy, rollback | |
| 7 | Cloud (AWS/Azure) | Secure VPC, IAM least-privilege, cost guardrails | |
| 8 | Infrastructure as Code | Modular Terraform with remote state and CI | |
| 9 | Configuration management | Idempotent Ansible roles with Vault | |
| 10 | Kubernetes | Deploy, expose, secure and debug an app | |
| 11 | GitOps | Argo CD with drift correction and promotion | |
| 12 | Observability | Metrics, logs, traces, dashboards, actionable alerts | |
| 13 | DevSecOps | SAST/SCA/DAST, secrets, SBOM, signing | |
| 14 | SRE & reliability | SLOs, error budget, incident and DR drill | |
| 15 | Platform engineering & FinOps | Golden path template; cost review | |
| | **Total (out of 45)** | | |

## 2. Practical exam (4 hours, from a blank lab)

Complete with only official documentation:

1. Provision a VPC and two instances with Terraform (remote state, tags, variables).
2. Configure them with an Ansible role (nginx + hardening), idempotent on second run.
3. Containerise a sample app (multi-stage, non-root) and scan it; fix the top finding.
4. Write a CI pipeline that tests, builds, scans and pushes the image.
5. Deploy to Kubernetes via Helm or Argo CD with probes, resources and a NetworkPolicy.
6. Add one dashboard panel and one actionable alert; document the SLO.
7. Debug a deliberately broken deployment (provided by a peer) in under 20 minutes.
8. Write a one-page runbook and push everything to GitHub.

**Grading:** each task 0–3. Pass at 18/24, with tasks 5 and 7 at least 2.

## 3. Self-audit

- [ ] I can explain every capstone architecture and trade-off.
- [ ] I can rebuild each capstone from documentation.
- [ ] I have measured outcomes (times, sizes, costs) for my CV.
- [ ] My repositories contain no secrets.
- [ ] I have a certification date booked.

## 4. Certification roadmap

See [CAREER-AND-INTERVIEW-PREPARATION.md](CAREER-AND-INTERVIEW-PREPARATION.md#8-certification-path-choose-by-target-role). Verify current exam objectives before booking.

## 5. Gap-closing plan template

| Weak domain | Why | Action | Mini-lab | Deadline |
|---|---|---|---|---|
| | | | | |
