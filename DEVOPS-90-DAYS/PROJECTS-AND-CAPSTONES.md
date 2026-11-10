# Projects and Capstones

The curriculum is built around three portfolio-quality capstones and several mini-projects. Each capstone is a public GitHub repository with a professional README, architecture diagram, runbooks, ADRs, demo and measured outcomes.

## Mini-projects

| Day | Project | Skills |
|---|---|---|
| 7 | Web-01 server runbook and setup script | Linux, LVM, packages, nginx |
| 14 | Incident drill + postmortem | Troubleshooting, communication |
| 17 | Log analyzer and report generator | Bash, awk, testing |
| 21 | `healthcheck` tool (Bash + Python) | Automation, packaging, tests |
| 28 | GitHub portfolio profile | Documentation, Git hygiene |
| 35 | Hardened container image set + SBOM | Docker, Trivy, Syft |
| 62 | Terraform plan/apply pipeline with policy checks | IaC, CI, OPA/Checkov |
| 77 | Reusable Helm chart published to OCI | Helm, Kubernetes |
| 85 | Golden-path service template | Platform engineering |

## Capstone 1 — Secure Automated CI/CD Platform (Days 47–49)

**Goal:** a three-tier or API+worker application delivered by a fully automated, secure pipeline with rollback.

Pipeline: lint -> unit tests (>=80% coverage) -> SAST/SCA -> build -> image scan -> SBOM -> sign -> publish -> deploy to staging -> smoke tests -> approval -> production -> automatic rollback on failure.

**Acceptance criteria**
- [ ] Repo with README, architecture diagram and ADRs
- [ ] CI on every PR; branch protection with required checks
- [ ] Hardened multi-stage image (non-root, healthcheck, pinned base)
- [ ] Trivy gate, SBOM, cosign signature verified before deploy
- [ ] Staging auto-deploy; production behind environment approval
- [ ] Rollback demonstrated by failure drill
- [ ] Measured: pipeline duration, lead time, rollback time
- [ ] Tagged `v1.0.0` with release notes

Reuse idea: your existing `E-commerce`, `docker-project` or `project-node-express-mongodb` folders from the Journey repo can be the application under delivery.

## Capstone 2 — Cloud Infrastructure Automation (Days 63, 69, 70)

**Goal:** reproducible dev and prod environments on AWS created by Terraform, configured by Ansible, delivered through a pipeline.

Architecture: VPC (3 tiers, multi-AZ) -> ALB -> ASG/EC2 (or ECS) -> private RDS; S3, KMS, IAM roles, CloudWatch alarms, budgets, remote state.

**Acceptance criteria**
- [ ] Terraform modules (`network`, `iam`, `compute`, `database`, `monitoring`) with remote state and locking
- [ ] Dev and prod differ only by variables
- [ ] Ansible roles (hardening, docker, app) with dynamic inventory; `ansible-lint` clean
- [ ] Pipeline: fmt/validate/tflint/checkov -> plan -> approval -> apply -> configure -> smoke test
- [ ] Security review (Prowler/Security Hub) with remediation evidence
- [ ] DR drill with measured RTO/RPO
- [ ] Cost report (infracost + Cost Explorer) and teardown guide
- [ ] Tagged `v1.0.0`

## Capstone 3 — Production Kubernetes and GitOps Platform (Days 87–89)

**Goal:** a platform that product teams can deploy to safely: GitOps delivery, observability, security and reliability practices.

Components: Terraform-provisioned cluster (EKS/AKS or multi-node kind) · Argo CD app-of-apps · ingress/Gateway + TLS · Prometheus/Grafana/Loki/OpenTelemetry · Kyverno (signature verification, PSA) · External Secrets or SOPS · Argo Rollouts canary with analysis · Velero backups · sample multi-service app with SLOs.

**Acceptance criteria**
- [ ] Cluster and platform reproducible from code
- [ ] All changes via pull request to GitOps repo; drift self-heals
- [ ] Canary with automatic abort on bad release (demonstrated)
- [ ] Unsigned or non-compliant workloads rejected by admission policy
- [ ] Dashboards, SLOs and burn-rate alerts with runbooks
- [ ] NetworkPolicies default-deny; RBAC least privilege; secrets never in plain git
- [ ] Game day (4 failure scenarios) with timeline and postmortem
- [ ] Cost report and teardown verified
- [ ] Tagged `v1.0.0`

## Presentation checklist (for every capstone)

- [ ] 60-second elevator pitch
- [ ] Architecture diagram (Mermaid or draw.io)
- [ ] Demo GIF or 3-minute video
- [ ] Metrics table (before/after)
- [ ] Security posture summary
- [ ] "What I would improve next" section
