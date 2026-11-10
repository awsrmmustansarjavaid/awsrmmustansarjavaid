# Career and Interview Preparation

## 1. Target roles

DevOps Engineer · Platform Engineer · Site Reliability Engineer · Cloud Engineer · DevSecOps Engineer · Infrastructure/Automation Engineer.

## 2. Portfolio checklist

- [ ] Profile README with focus areas, skills and pinned projects
- [ ] Three capstones pinned, each with diagram, demo, metrics and `v1.0.0` release
- [ ] `healthcheck`, Terraform modules, Helm chart and golden-path template as supporting repos
- [ ] All repos: README, LICENSE, topics, no secrets, passing CI badge
- [ ] A blog post or notes site documenting what you learned
- [ ] LinkedIn updated with the same measurable outcomes

## 3. CV bullet formula

**Action + tool + scale/outcome.** Examples to adapt (only claim what you measured):

- Built secure CI/CD pipeline (GitHub Actions, Trivy, cosign) that gated releases and cut rollback time to under 2 minutes.
- Automated multi-environment AWS infrastructure with Terraform modules and Ansible; rebuilt full stack in about 25 minutes.
- Delivered GitOps platform on Kubernetes with Argo CD, canary rollouts and SLO-based alerting; reduced alert noise by removing non-actionable pages.
- Reduced container image size by ~70% using multi-stage builds and distroless bases.

## 4. Interview question bank by domain

### Linux & systems

1. Server load is high — how do you investigate?
2. Disk full but `du` shows free space — why?
3. Explain permissions 2770 and setgid directories.
4. How does systemd restart a failed service?
5. What is the OOM killer?

### Networking

1. What happens when you type a URL and press enter?
2. SG vs NACL?
3. Explain NAT, CIDR, and why overlapping CIDRs break peering.
4. 502 vs 504?
5. How does TLS work?

### Git & workflow

1. Merge vs rebase?
2. reset vs revert?
3. How do you recover a deleted commit?
4. Trunk-based vs Git Flow?
5. How do you prevent secrets in git?

### Scripting

1. What does `set -euo pipefail` do?
2. How do you handle API rate limits in Python?
3. How do you make a script idempotent?
4. How do you test automation code?

### Containers

1. Containers vs VMs? Namespaces and cgroups?
2. Why multi-stage builds?
3. Why not run as root?
4. Tag vs digest?
5. How do you reduce image CVEs?

### CI/CD

1. Design a pipeline for a microservice.
2. CI vs continuous delivery vs deployment?
3. How do you secure pipeline credentials (OIDC)?
4. Blue-green vs canary?
5. How do you roll back safely with database migrations?

### Cloud

1. Explain shared responsibility.
2. How do you design a multi-AZ 3-tier VPC?
3. Public vs private subnet? NAT Gateway cost trade-offs?
4. How do you secure S3?
5. How do you control cloud cost?

### Terraform & Ansible

1. What is Terraform state and why is it sensitive?
2. How do you handle drift?
3. count vs for_each?
4. How do you structure environments?
5. Terraform vs Ansible — when each?
6. What is idempotency?

### Kubernetes

1. Explain control plane components.
2. Pod stuck in Pending/CrashLoopBackOff — how do you debug?
3. Liveness vs readiness probes?
4. How does a Service route traffic?
5. RBAC, NetworkPolicy, PSA — how do you secure a cluster?
6. Requests vs limits?

### GitOps & platform

1. What is GitOps and why pull-based?
2. How do you promote between environments?
3. What is a golden path / IDP?
4. How do you measure platform success?

### Observability & SRE

1. Metrics vs logs vs traces?
2. What are the four golden signals?
3. SLI vs SLO vs SLA; what is an error budget?
4. How do you design alerts that are actionable?
5. How do you run a blameless postmortem?
6. RTO vs RPO?

### DevSecOps

1. SAST vs DAST vs SCA?
2. What is an SBOM and why does it matter?
3. How do you manage secrets?
4. What is SLSA / image signing?
5. How do you respond to a leaked credential?

## 5. System-design prompts

1. Design a CI/CD platform for 50 microservices across 10 teams.
2. Design a multi-region, highly available web application on AWS. State RPO/RTO.
3. Design a secure multi-tenant Kubernetes platform.
4. Design observability for a latency-sensitive API; define SLOs and alerts.
5. Design a self-service internal developer platform for a 200-engineer company.

Use this structure: requirements -> constraints -> high-level design -> data flow -> security -> failure modes -> observability -> cost -> trade-offs.

## 6. Behavioural stories (STAR)

Prepare five stories: a production incident, a disagreement, a failure you learned from, an automation that saved time, and a time you improved security or cost. For each: **S**ituation, **T**ask, **A**ction, **R**esult (with numbers).

## 7. Troubleshooting narration practice

In interviews, think aloud: clarify -> hypothesise -> check the cheapest/most likely cause first -> verify -> fix -> prevent. Practise with the Day 14, 78 and 84 drills.

## 8. Certification path (choose by target role)

| Goal | Certifications |
|---|---|
| AWS-focused | AWS Cloud Practitioner (optional) -> Solutions Architect Associate -> DevOps Engineer Professional |
| Kubernetes-focused | CKAD -> CKA -> CKS |
| IaC-focused | HashiCorp Terraform Associate |
| Azure-focused | AZ-900 -> AZ-104 -> AZ-400 |
| Linux | RHCSA or LFCS |

Confirm current exam codes and objectives on the vendor sites before booking.

## 9. 30-60-90 plan after this course

- **30 days:** fix weakest domains from the assessment; apply to roles; one open-source contribution.
- **60 days:** sit one certification; add a fourth project in your target area (e.g. service mesh, Crossplane, Backstage, serverless).
- **90 days:** run a mock on-call week on your capstones; publish two technical write-ups.

## 10. Daily job-search routine

- Apply to 3–5 roles with a tailored CV.
- Do 30 minutes of interview questions aloud.
- Maintain one project improvement per week.
