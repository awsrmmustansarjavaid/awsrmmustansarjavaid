# Glossary

| Term | Meaning |
|---|---|
| **ADR** | Architecture Decision Record - a short document recording a design decision and its context. |
| **Argo CD** | A GitOps controller that syncs Kubernetes state from git. |
| **AZ** | Availability Zone - isolated data-centre location within a cloud region. |
| **Blue-green** | Deployment with two identical environments, switching traffic between them. |
| **Canary** | Releasing to a small percentage of users first and observing before full rollout. |
| **cgroups** | Linux kernel feature limiting and accounting resource usage of process groups. |
| **CI/CD** | Continuous Integration / Continuous Delivery (or Deployment). |
| **CIDR** | Classless Inter-Domain Routing notation for IP ranges (e.g. 10.0.0.0/16). |
| **DAST** | Dynamic Application Security Testing - testing a running application. |
| **DORA metrics** | Deployment frequency, lead time for changes, change failure rate, time to restore. |
| **Drift** | Difference between declared (code) state and real infrastructure state. |
| **Error budget** | Allowed unreliability = 100% minus the SLO. |
| **FinOps** | Practice of managing cloud cost collaboratively with engineering and finance. |
| **GitOps** | Operating infrastructure/apps by declaring desired state in git and reconciling automatically. |
| **Golden path** | A supported, paved route for building and running services in a platform. |
| **HPA** | Horizontal Pod Autoscaler in Kubernetes. |
| **IaC** | Infrastructure as Code. |
| **Idempotency** | Running an operation repeatedly produces the same end state. |
| **IDP** | Internal Developer Platform. |
| **IRSA** | IAM Roles for Service Accounts (EKS) - pod-level AWS permissions without static keys. |
| **MTTR** | Mean time to restore/recover. |
| **Namespace (Linux)** | Kernel isolation feature (pid, net, mnt, uts, ipc, user). |
| **OIDC** | OpenID Connect - used for short-lived, keyless authentication (e.g. CI to cloud). |
| **OpenTelemetry** | Vendor-neutral standard and tooling for traces, metrics and logs. |
| **PromQL** | Prometheus query language. |
| **RBAC** | Role-Based Access Control. |
| **RPO / RTO** | Recovery Point Objective (data loss tolerance) / Recovery Time Objective (downtime tolerance). |
| **SAST** | Static Application Security Testing - analysing source code. |
| **SBOM** | Software Bill of Materials - inventory of components in software. |
| **SCA** | Software Composition Analysis - finding vulnerable dependencies. |
| **SemVer** | Semantic Versioning MAJOR.MINOR.PATCH. |
| **SLI / SLO / SLA** | Service Level Indicator / Objective / Agreement. |
| **SLSA** | Supply-chain Levels for Software Artifacts - framework for build integrity. |
| **SOPS** | Tool for encrypting values in structured files (YAML/JSON). |
| **State (Terraform)** | Record mapping Terraform config to real resources. |
| **Toil** | Manual, repetitive, automatable operational work. |
| **Trunk-based development** | Short-lived branches merged frequently into main. |
| **VPC** | Virtual Private Cloud - isolated virtual network. |
