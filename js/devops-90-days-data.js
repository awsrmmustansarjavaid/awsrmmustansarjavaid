/**
 * devops-90-days-data.js
 * ---------------------------------------------------------------------------
 * Configuration and static metadata for the 90 Days of DevOps portal.
 *
 * Edit the CONFIG block below. Everything underneath it (phases, weeks,
 * documents and the per-day index) is descriptive data used to build pages.
 *
 * Exposes: window.D90 = { SITE_ROOT, CONFIG, PHASES, WEEKS, DOCS, DAYS }
 * ---------------------------------------------------------------------------
 */
window.D90 = window.D90 || {};

(function (D) {
  'use strict';

  /*
   * Site root: this file lives in /js/, so the root is one directory above the
   * script's own URL. Resolving it from the script tag keeps every link working
   * under any GitHub Pages base path (user site or project site).
   */
  var script = document.currentScript;
  D.SITE_ROOT = script && script.src ? new URL('../', script.src).href : '/';

  /* ======================================================================
     CONFIG - the only block you normally need to edit
     ====================================================================== */
  D.CONFIG = {
    // Name shown in the header brand and footer
    siteName: "Mustansar Javaid",

    // Home page and Challenges page of the main site, relative to the site root
    homePage: "index.html",
    challengesPage: "pages/challenges.html",

    // Published Markdown source. This is a public static-file URL, not the GitHub API.
    repository: {
      owner: "awsrmmustansarjavaid",
      repo: "awsrmmustansarjavaid",
      branch: "main",
      contentDir: "DEVOPS-90-DAYS",
      cacheMinutes: 2
    },

    // Optional external author profile links.
    profiles: {
      linkedin: "https://www.linkedin.com/in/raja-muhammad-mustansar-javaid/",
      medium: ""
    }
  };

  /* ======================================================================
     PHASES - the four learning phases and the day range each one covers
     ====================================================================== */
  D.PHASES = [
    { id: 1, from: 1, to: 28, name: "Foundations", blurb: "Linux, systems, networking, scripting and professional Git workflows." },
    { id: 2, from: 29, to: 49, name: "Delivery & Security", blurb: "Docker, CI/CD, DevSecOps and the Secure CI/CD Platform capstone." },
    { id: 3, from: 50, to: 70, name: "Cloud & Infrastructure Automation", blurb: "AWS, Azure, Terraform, Ansible and the Cloud Infrastructure Automation capstone." },
    { id: 4, from: 71, to: 90, name: "Platform, Reliability & Career", blurb: "Kubernetes, Helm, GitOps, observability, SRE, platform engineering, FinOps and the final capstone." }
  ];

  /* ======================================================================
     WEEKS - thirteen study weeks (7 days each, the last week has 6)
     ====================================================================== */
  D.WEEKS = [
    { id: 1, from: 1, to: 7, name: "Linux & Systems Engineering" },
    { id: 2, from: 8, to: 14, name: "Networking, SSH, Web Serving & Hardening" },
    { id: 3, from: 15, to: 21, name: "Bash & Python Automation" },
    { id: 4, from: 22, to: 28, name: "Git, GitHub & Engineering Workflow" },
    { id: 5, from: 29, to: 35, name: "Containers & Container Security" },
    { id: 6, from: 36, to: 42, name: "CI/CD: GitHub Actions, Jenkins, GitLab CI" },
    { id: 7, from: 43, to: 49, name: "Deployment Strategies, DevSecOps & Capstone 1" },
    { id: 8, from: 50, to: 56, name: "Cloud Engineering: AWS & Azure" },
    { id: 9, from: 57, to: 63, name: "Terraform & Capstone 2 (start)" },
    { id: 10, from: 64, to: 70, name: "Ansible & Capstone 2 (finish)" },
    { id: 11, from: 71, to: 77, name: "Kubernetes & Helm" },
    { id: 12, from: 78, to: 84, name: "K8s Operations, GitOps, Observability & SRE" },
    { id: 13, from: 85, to: 90, name: "Platform Engineering, FinOps/AI, Capstone 3 & Career" }
  ];

  /* ======================================================================
     DOCS - repository documents that get their own portal page
       key   : identifier used by <body data-doc="...">
       file  : Markdown file inside CONFIG.contentDir
       page  : HTML file inside pages/devops-90-days/
       title / icon / blurb : text shown on cards and page headers
     ====================================================================== */
  D.DOCS = [
    {
      key: "overview",
      file: "README.md",
      page: "overview.html",
      title: "90-Day Overview",
      icon: "📘",
      blurb: "Start here: how the repository works, the four phases and the quality standards."
    },
    {
      key: "roadmap",
      file: "90-DAY-ROADMAP.md",
      page: "roadmap.html",
      title: "Complete Roadmap",
      icon: "🗺️",
      blurb: "Thirteen weeks, four phases, every day linked, with milestones and weekly rhythm."
    },
    {
      key: "tracker",
      file: "LEARNING-TRACKER.md",
      page: "learning-tracker.html",
      title: "Progress Tracker",
      icon: "📈",
      blurb: "Your personal dashboard plus the repository's tracker template."
    },
    {
      key: "technologies",
      file: "TOOLS-AND-TECHNOLOGIES.md",
      page: "technologies.html",
      title: "Technology Stack",
      icon: "🧰",
      blurb: "Every tool used in the 90 days and where it is introduced."
    },
    {
      key: "lab",
      file: "LAB-ENVIRONMENT-SETUP.md",
      page: "lab-setup.html",
      title: "Lab Setup Guide",
      icon: "🧪",
      blurb: "Hardware, OS options, accounts, tools and cost-safety rules."
    },
    {
      key: "assessments",
      file: "ASSESSMENT-AND-CERTIFICATION.md",
      page: "assessments.html",
      title: "Assessments & Certification",
      icon: "🎯",
      blurb: "Career-readiness rubric, practical exam and certification roadmap."
    },
    {
      key: "mapping",
      file: "SOURCE-REPO-MAPPING.md",
      page: "source-mapping.html",
      title: "Source Repo Mapping",
      icon: "🔗",
      blurb: "How this curriculum maps onto earlier notes and reusable projects."
    },
    {
      key: "glossary",
      file: "GLOSSARY.md",
      page: "glossary.html",
      title: "DevOps Glossary",
      icon: "📖",
      blurb: "Key terms: DORA, SLO, SBOM, SLSA, GitOps, IaC and more."
    }
  ];

  /* ======================================================================
     DAYS - local metadata index for all 90 lessons
       n        : day number (1-90)           phase / week : parent groups
       title    : lesson title                 summary      : one-line goal
       tech     : main technology              tags         : topic keywords
       diff     : difficulty level             mins         : study time in minutes
       capstone : true on capstone project days
     ====================================================================== */
  D.DAYS = [
    { n: 1, title: "DevOps Mindset, Lab Setup & Linux First Steps", phase: 1, week: 1, tech: "Linux", tags: ["DevOps","Culture","DORA"], diff: "Beginner", mins: 210, summary: "Explain DevOps, CALMS and the DevOps lifecycle in your own words", capstone: false },
    { n: 2, title: "Linux File System Hierarchy & Navigation", phase: 1, week: 1, tech: "Linux", tags: ["Filesystem"], diff: "Beginner", mins: 210, summary: "Navigate the Linux directory tree without a GUI", capstone: false },
    { n: 3, title: "Files, Text Processing & Pipes (grep, sed, awk, find)", phase: 1, week: 1, tech: "Linux", tags: ["grep","awk","sed"], diff: "Beginner", mins: 210, summary: "Read, search and transform text from the CLI", capstone: false },
    { n: 4, title: "Users, Groups, Permissions & sudo", phase: 1, week: 1, tech: "Linux", tags: ["Permissions","sudo"], diff: "Beginner", mins: 210, summary: "Create and manage users and groups", capstone: false },
    { n: 5, title: "Processes, systemd Services & Scheduling", phase: 1, week: 1, tech: "Linux", tags: ["systemd","cron"], diff: "Beginner", mins: 210, summary: "Inspect and control processes and signals", capstone: false },
    { n: 6, title: "Linux Troubleshooting: CPU, Memory, Disk & Logs", phase: 1, week: 1, tech: "Linux", tags: ["Troubleshooting","Performance"], diff: "Beginner", mins: 210, summary: "Follow a repeatable troubleshooting method (USE method)", capstone: false },
    { n: 7, title: "Packages, Storage (LVM) & Week 1 Mini-Project", phase: 1, week: 1, tech: "Linux", tags: ["LVM","Storage","Packages"], diff: "Beginner", mins: 210, summary: "Manage packages with apt/dnf", capstone: false },
    { n: 8, title: "Networking Fundamentals: OSI, TCP/IP, IP Addressing & Subnets", phase: 1, week: 2, tech: "Networking", tags: ["TCP/IP","CIDR"], diff: "Beginner", mins: 210, summary: "Explain OSI/TCP-IP layers with real examples", capstone: false },
    { n: 9, title: "DNS, HTTP/HTTPS & TLS with curl", phase: 1, week: 2, tech: "Networking", tags: ["DNS","TLS","HTTP"], diff: "Beginner", mins: 210, summary: "Trace DNS resolution and record types", capstone: false },
    { n: 10, title: "Ports, Firewalls & Network Debugging (ufw, nftables, tcpdump)", phase: 1, week: 2, tech: "Networking", tags: ["Firewall","tcpdump"], diff: "Beginner", mins: 210, summary: "List listening services and map them to processes", capstone: false },
    { n: 11, title: "SSH Deep Dive: Keys, Config, Tunnels & Bastion Hosts", phase: 1, week: 2, tech: "Networking", tags: ["SSH","Bastion"], diff: "Beginner", mins: 210, summary: "Use key-based SSH and ssh-agent", capstone: false },
    { n: 12, title: "Nginx Reverse Proxy, TLS & First Web Deployment", phase: 1, week: 2, tech: "Networking", tags: ["Nginx","TLS"], diff: "Beginner", mins: 210, summary: "Install and configure Nginx", capstone: false },
    { n: 13, title: "Linux Hardening & Security Baseline", phase: 1, week: 2, tech: "Linux", tags: ["Hardening","CIS"], diff: "Beginner", mins: 210, summary: "Apply a practical hardening baseline", capstone: false },
    { n: 14, title: "Week 2 Review & Incident Drill: 'The Site Is Down'", phase: 1, week: 2, tech: "Linux", tags: ["Incident","Postmortem"], diff: "Beginner", mins: 210, summary: "Combine Linux + networking skills under pressure", capstone: false },
    { n: 15, title: "Bash Scripting: Variables, Conditionals & Exit Codes", phase: 1, week: 3, tech: "Scripting", tags: ["Bash"], diff: "Beginner", mins: 210, summary: "Write safe, readable Bash scripts", capstone: false },
    { n: 16, title: "Bash: Loops, Arguments, Functions & Error Handling", phase: 1, week: 3, tech: "Scripting", tags: ["Bash"], diff: "Beginner", mins: 210, summary: "Use loops, case, getopts and functions", capstone: false },
    { n: 17, title: "Bash Project: Log Analyzer & Report Generator", phase: 1, week: 3, tech: "Scripting", tags: ["Bash","Logs"], diff: "Beginner", mins: 210, summary: "Build a real log-analysis tool", capstone: false },
    { n: 18, title: "Python for DevOps: Basics, Virtual Environments & Files", phase: 1, week: 3, tech: "Scripting", tags: ["Python"], diff: "Beginner", mins: 210, summary: "Set up Python projects properly (venv, pip, requirements)", capstone: false },
    { n: 19, title: "Python: JSON, YAML & REST API Automation", phase: 1, week: 3, tech: "Scripting", tags: ["Python","API","YAML","JSON"], diff: "Beginner", mins: 210, summary: "Parse and generate JSON/YAML", capstone: false },
    { n: 20, title: "Python: Cloud SDK Basics, CLI Tools & Testing", phase: 1, week: 3, tech: "Scripting", tags: ["Python","boto3","pytest"], diff: "Beginner", mins: 210, summary: "Use boto3 safely against AWS (or LocalStack)", capstone: false },
    { n: 21, title: "Week 3 Project: System Health-Check Tool (Bash + Python)", phase: 1, week: 3, tech: "Scripting", tags: ["Python","Bash","Project"], diff: "Beginner", mins: 210, summary: "Deliver a production-style automation tool", capstone: false },
    { n: 22, title: "Git Fundamentals: Your First Repository", phase: 1, week: 4, tech: "Git", tags: ["Git"], diff: "Intermediate", mins: 210, summary: "Explain the Git object model at a high level", capstone: false },
    { n: 23, title: "Git Branching, Merging & GitHub Pull Requests", phase: 1, week: 4, tech: "Git", tags: ["GitHub","PR"], diff: "Intermediate", mins: 210, summary: "Create, switch and merge branches", capstone: false },
    { n: 24, title: "Advanced Git: Rebase, Stash, Cherry-pick, Reset vs Revert & Reflog", phase: 1, week: 4, tech: "Git", tags: ["Rebase","Reflog"], diff: "Intermediate", mins: 210, summary: "Choose between merge and rebase", capstone: false },
    { n: 25, title: "Branching Strategies, Conventional Commits, SemVer & Code Review", phase: 1, week: 4, tech: "Git", tags: ["SemVer","Code review"], diff: "Intermediate", mins: 210, summary: "Compare Git Flow, GitHub Flow and trunk-based development", capstone: false },
    { n: 26, title: "GitHub CLI, Branch Protection, CODEOWNERS & Pre-commit Hooks", phase: 1, week: 4, tech: "Git", tags: ["gh CLI","pre-commit"], diff: "Intermediate", mins: 210, summary: "Automate GitHub with `gh`", capstone: false },
    { n: 27, title: "YAML, JSON, Makefiles & Code Quality Tooling", phase: 1, week: 4, tech: "Git", tags: ["YAML","jq","Make","Linting"], diff: "Intermediate", mins: 210, summary: "Write correct YAML and avoid common traps", capstone: false },
    { n: 28, title: "Phase 1 Review & GitHub Portfolio Setup", phase: 1, week: 4, tech: "Git", tags: ["Portfolio","Review"], diff: "Intermediate", mins: 210, summary: "Consolidate Days 1-27", capstone: false },
    { n: 29, title: "Containers Fundamentals & Docker Installation", phase: 2, week: 5, tech: "Docker", tags: ["Containers"], diff: "Intermediate", mins: 240, summary: "Explain how containers differ from VMs", capstone: false },
    { n: 30, title: "Docker Images, Layers & Container Lifecycle", phase: 2, week: 5, tech: "Docker", tags: ["Images"], diff: "Intermediate", mins: 240, summary: "Understand image layers and caching", capstone: false },
    { n: 31, title: "Dockerfile Best Practices: Build Your Own Images", phase: 2, week: 5, tech: "Docker", tags: ["Dockerfile"], diff: "Intermediate", mins: 240, summary: "Write efficient, secure Dockerfiles", capstone: false },
    { n: 32, title: "Docker Volumes, Bind Mounts & Networking", phase: 2, week: 5, tech: "Docker", tags: ["Volumes","Networking"], diff: "Intermediate", mins: 240, summary: "Persist data safely with volumes", capstone: false },
    { n: 33, title: "Docker Compose: Multi-Container Applications", phase: 2, week: 5, tech: "Docker", tags: ["Compose"], diff: "Intermediate", mins: 240, summary: "Describe multi-service stacks in Compose YAML", capstone: false },
    { n: 34, title: "Multi-Stage Builds, Registries & Image Tagging Strategy", phase: 2, week: 5, tech: "Docker", tags: ["Registry","Multi-stage"], diff: "Intermediate", mins: 240, summary: "Build small production images with multi-stage Dockerfiles", capstone: false },
    { n: 35, title: "Container Security: Scanning, Non-root, SBOM & Hardening", phase: 2, week: 5, tech: "Docker", tags: ["Trivy","SBOM","Security"], diff: "Intermediate", mins: 240, summary: "Scan images for vulnerabilities and misconfigurations", capstone: false },
    { n: 36, title: "CI/CD Concepts & Your First GitHub Actions Workflow", phase: 2, week: 6, tech: "CI/CD", tags: ["GitHub Actions"], diff: "Intermediate", mins: 240, summary: "Explain CI, Continuous Delivery and Continuous Deployment", capstone: false },
    { n: 37, title: "GitHub Actions: Triggers, Matrix, Caching & Conditionals", phase: 2, week: 6, tech: "CI/CD", tags: ["GitHub Actions","Matrix"], diff: "Intermediate", mins: 240, summary: "Use events, filters, schedules and manual dispatch", capstone: false },
    { n: 38, title: "Secrets, OIDC, Artifacts & Tests in CI", phase: 2, week: 6, tech: "CI/CD", tags: ["OIDC","Secrets"], diff: "Intermediate", mins: 240, summary: "Handle secrets safely in pipelines", capstone: false },
    { n: 39, title: "Build & Push Docker Images in CI; Reusable Workflows", phase: 2, week: 6, tech: "CI/CD", tags: ["GitHub Actions","Docker"], diff: "Intermediate", mins: 240, summary: "Automate build, scan and push of images", capstone: false },
    { n: 40, title: "Jenkins: Installation, Pipelines & Jenkinsfile", phase: 2, week: 6, tech: "CI/CD", tags: ["Jenkins"], diff: "Intermediate", mins: 240, summary: "Install and secure Jenkins", capstone: false },
    { n: 41, title: "Jenkins: Agents, Credentials, Multibranch & Shared Libraries", phase: 2, week: 6, tech: "CI/CD", tags: ["Jenkins"], diff: "Intermediate", mins: 240, summary: "Scale builds with agents", capstone: false },
    { n: 42, title: "GitLab CI/CD: Pipelines, Runners & Environments", phase: 2, week: 6, tech: "CI/CD", tags: ["GitLab CI"], diff: "Intermediate", mins: 240, summary: "Write `.gitlab-ci.yml` pipelines", capstone: false },
    { n: 43, title: "Deployment Strategies: Rolling, Blue-Green, Canary & Rollbacks", phase: 2, week: 7, tech: "CI/CD", tags: ["Blue-green","Canary"], diff: "Intermediate", mins: 240, summary: "Compare deployment strategies and trade-offs", capstone: false },
    { n: 44, title: "DevSecOps I: SAST, Dependency Scanning & Code Scanning", phase: 2, week: 7, tech: "DevSecOps", tags: ["SAST","SCA"], diff: "Intermediate", mins: 240, summary: "Integrate SAST and SCA into pipelines", capstone: false },
    { n: 45, title: "DevSecOps II: Secrets Management - gitleaks, SOPS & Vault", phase: 2, week: 7, tech: "DevSecOps", tags: ["Vault","SOPS","Secrets"], diff: "Intermediate", mins: 240, summary: "Detect secrets in code and history", capstone: false },
    { n: 46, title: "DevSecOps III: DAST, Image Signing, SLSA & Supply-Chain Security", phase: 2, week: 7, tech: "DevSecOps", tags: ["DAST","cosign","SLSA"], diff: "Intermediate", mins: 240, summary: "Run DAST against a test app", capstone: false },
    { n: 47, title: "Capstone 1 (Part 1/3): Design, App & CI Foundation", phase: 2, week: 7, tech: "Capstone", tags: ["Capstone 1","CI"], diff: "Advanced (Capstone)", mins: 330, summary: "Design an end-to-end CI/CD platform for a real app", capstone: true },
    { n: 48, title: "Capstone 1 (Part 2/3): Containerise, Scan, Sign & Publish", phase: 2, week: 7, tech: "Capstone", tags: ["Capstone 1","Security"], diff: "Advanced (Capstone)", mins: 330, summary: "Add a hardened multi-stage image build", capstone: true },
    { n: 49, title: "Capstone 1 (Part 3/3): Deploy, Smoke-Test, Roll Back & Document", phase: 2, week: 7, tech: "Capstone", tags: ["Capstone 1","Deploy"], diff: "Advanced (Capstone)", mins: 330, summary: "Automate deployment to staging and production", capstone: true },
    { n: 50, title: "Cloud Fundamentals, AWS Account Setup & Billing Guardrails", phase: 3, week: 8, tech: "AWS", tags: ["IAM","Billing"], diff: "Intermediate - Advanced", mins: 240, summary: "Explain IaaS/PaaS/SaaS, regions, AZs and the shared responsibility model", capstone: false },
    { n: 51, title: "AWS IAM Deep Dive: Policies, Roles, STS & Least Privilege", phase: 3, week: 8, tech: "AWS", tags: ["IAM"], diff: "Intermediate - Advanced", mins: 240, summary: "Write and debug IAM policies", capstone: false },
    { n: 52, title: "AWS Networking: VPC, Subnets, Routing, NAT & Security Groups", phase: 3, week: 8, tech: "AWS", tags: ["VPC"], diff: "Intermediate - Advanced", mins: 240, summary: "Design and build a VPC by hand", capstone: false },
    { n: 53, title: "AWS Compute: EC2, AMIs, EBS, Load Balancers & Auto Scaling", phase: 3, week: 8, tech: "AWS", tags: ["EC2","ASG","ALB"], diff: "Intermediate - Advanced", mins: 240, summary: "Launch and secure EC2 instances", capstone: false },
    { n: 54, title: "AWS Storage & Databases: S3, EBS/EFS, RDS & Backups", phase: 3, week: 8, tech: "AWS", tags: ["S3","RDS"], diff: "Intermediate - Advanced", mins: 240, summary: "Use S3 securely with versioning, lifecycle and encryption", capstone: false },
    { n: 55, title: "AWS Observability & FinOps: CloudWatch, CloudTrail, Budgets & Cost Optimisation", phase: 3, week: 8, tech: "AWS", tags: ["CloudWatch","FinOps"], diff: "Intermediate - Advanced", mins: 240, summary: "Monitor AWS resources with CloudWatch metrics, logs and alarms", capstone: false },
    { n: 56, title: "Azure Fundamentals for DevOps & Multi-Cloud Mapping", phase: 3, week: 8, tech: "Azure", tags: ["Azure","Multi-cloud"], diff: "Intermediate - Advanced", mins: 240, summary: "Map AWS concepts to Azure", capstone: false },
    { n: 57, title: "Infrastructure as Code & Terraform: First Resources", phase: 3, week: 9, tech: "Terraform", tags: ["IaC"], diff: "Intermediate - Advanced", mins: 240, summary: "Explain declarative IaC and Terraform workflow", capstone: false },
    { n: 58, title: "Terraform: Providers, Resources, Dependencies & Lifecycle", phase: 3, week: 9, tech: "Terraform", tags: ["HCL"], diff: "Intermediate - Advanced", mins: 240, summary: "Use multiple providers and resources", capstone: false },
    { n: 59, title: "Terraform: Variables, Outputs, Data Sources & Expressions", phase: 3, week: 9, tech: "Terraform", tags: ["Variables","Expressions"], diff: "Intermediate - Advanced", mins: 240, summary: "Parameterise code with variables and validation", capstone: false },
    { n: 60, title: "Terraform State, Remote Backends, Locking & Import", phase: 3, week: 9, tech: "Terraform", tags: ["State","Backend"], diff: "Intermediate - Advanced", mins: 240, summary: "Explain what state is and why it is sensitive", capstone: false },
    { n: 61, title: "Terraform Modules: Reusable Infrastructure", phase: 3, week: 9, tech: "Terraform", tags: ["Modules"], diff: "Intermediate - Advanced", mins: 240, summary: "Design modules with clear inputs/outputs", capstone: false },
    { n: 62, title: "Terraform in CI/CD: Plan/Apply Pipelines, Policy-as-Code & Security Scanning", phase: 3, week: 9, tech: "Terraform", tags: ["Policy-as-code","CI"], diff: "Intermediate - Advanced", mins: 240, summary: "Automate fmt/validate/plan on PRs and apply on merge", capstone: false },
    { n: 63, title: "Capstone 2 (Part 1/3): Cloud Foundation with Terraform", phase: 3, week: 9, tech: "Capstone", tags: ["Capstone 2","AWS"], diff: "Advanced (Capstone)", mins: 330, summary: "Design a multi-environment AWS landing zone for an app", capstone: true },
    { n: 64, title: "Ansible: Introduction, Inventory & Ad-hoc Commands", phase: 3, week: 10, tech: "Ansible", tags: ["Inventory"], diff: "Intermediate - Advanced", mins: 240, summary: "Explain agentless configuration management", capstone: false },
    { n: 65, title: "Ansible Playbooks, Modules, Handlers & Idempotency", phase: 3, week: 10, tech: "Ansible", tags: ["Playbooks"], diff: "Intermediate - Advanced", mins: 240, summary: "Write multi-task playbooks", capstone: false },
    { n: 66, title: "Ansible: Variables, Facts, Conditionals, Loops & Jinja2 Templates", phase: 3, week: 10, tech: "Ansible", tags: ["Jinja2"], diff: "Intermediate - Advanced", mins: 240, summary: "Use variable precedence and facts effectively", capstone: false },
    { n: 67, title: "Ansible Roles, Collections, Galaxy & Vault", phase: 3, week: 10, tech: "Ansible", tags: ["Roles","Vault"], diff: "Intermediate - Advanced", mins: 240, summary: "Structure automation as roles", capstone: false },
    { n: 68, title: "Terraform + Ansible Together: Provision, Configure & Dynamic Inventory", phase: 3, week: 10, tech: "Ansible", tags: ["Terraform","Dynamic inventory"], diff: "Intermediate - Advanced", mins: 240, summary: "Hand off from Terraform to Ansible cleanly", capstone: false },
    { n: 69, title: "Capstone 2 (Part 2/3): Configure, Deploy & Pipeline", phase: 3, week: 10, tech: "Capstone", tags: ["Capstone 2"], diff: "Advanced (Capstone)", mins: 330, summary: "Configure the capstone environment with Ansible roles", capstone: true },
    { n: 70, title: "Capstone 2 (Part 3/3): Hardening, DR, Cost Review & Documentation", phase: 3, week: 10, tech: "Capstone", tags: ["Capstone 2","DR"], diff: "Advanced (Capstone)", mins: 330, summary: "Harden and test resilience of the capstone environment", capstone: true },
    { n: 71, title: "Kubernetes Architecture, Local Cluster & kubectl", phase: 4, week: 11, tech: "Kubernetes", tags: ["kubectl","Architecture"], diff: "Advanced", mins: 240, summary: "Describe control plane and node components", capstone: false },
    { n: 72, title: "Pods, Manifests, Namespaces & Deployments", phase: 4, week: 11, tech: "Kubernetes", tags: ["Deployments"], diff: "Advanced", mins: 240, summary: "Write YAML manifests for Pods and Deployments", capstone: false },
    { n: 73, title: "Kubernetes Services, Ingress & Gateway API", phase: 4, week: 11, tech: "Kubernetes", tags: ["Services","Ingress","Gateway API"], diff: "Advanced", mins: 240, summary: "Expose applications with ClusterIP, NodePort, LoadBalancer", capstone: false },
    { n: 74, title: "ConfigMaps, Secrets, Persistent Volumes & StatefulSets", phase: 4, week: 11, tech: "Kubernetes", tags: ["Storage","Secrets"], diff: "Advanced", mins: 240, summary: "Externalise configuration safely", capstone: false },
    { n: 75, title: "Resource Management, Probes, HPA & Scheduling", phase: 4, week: 11, tech: "Kubernetes", tags: ["HPA","Probes"], diff: "Advanced", mins: 240, summary: "Set requests/limits correctly", capstone: false },
    { n: 76, title: "Kubernetes Security: RBAC, NetworkPolicy, Pod Security & Admission Policies", phase: 4, week: 11, tech: "Kubernetes", tags: ["RBAC","NetworkPolicy"], diff: "Advanced", mins: 240, summary: "Apply least-privilege RBAC", capstone: false },
    { n: 77, title: "Helm: Charts, Values, Templates & Releases", phase: 4, week: 11, tech: "Kubernetes", tags: ["Helm"], diff: "Advanced", mins: 240, summary: "Install and manage third-party charts", capstone: false },
    { n: 78, title: "Kubernetes Troubleshooting & Kustomize", phase: 4, week: 12, tech: "Kubernetes", tags: ["Troubleshooting","Kustomize"], diff: "Advanced", mins: 240, summary: "Diagnose common failures systematically", capstone: false },
    { n: 79, title: "GitOps with Argo CD: Declarative Deployments", phase: 4, week: 12, tech: "GitOps", tags: ["Argo CD"], diff: "Advanced", mins: 240, summary: "Explain GitOps principles and pull-based delivery", capstone: false },
    { n: 80, title: "Argo CD Advanced: App-of-Apps, ApplicationSets, Rollouts & Promotion", phase: 4, week: 12, tech: "GitOps", tags: ["Argo Rollouts","ApplicationSet"], diff: "Advanced", mins: 240, summary: "Manage many apps/environments declaratively", capstone: false },
    { n: 81, title: "Observability I: Prometheus, Exporters & Grafana", phase: 4, week: 12, tech: "Observability", tags: ["Prometheus","Grafana"], diff: "Advanced", mins: 240, summary: "Explain metrics, logs and traces and when each helps", capstone: false },
    { n: 82, title: "Observability II: Logs (Loki), Traces (OpenTelemetry) & Alerting", phase: 4, week: 12, tech: "Observability", tags: ["Loki","OpenTelemetry","Alerting"], diff: "Advanced", mins: 240, summary: "Centralise logs with Loki/Promtail or Alloy", capstone: false },
    { n: 83, title: "SRE Fundamentals: SLIs, SLOs, Error Budgets & Toil", phase: 4, week: 12, tech: "SRE", tags: ["SLO","Error budget"], diff: "Advanced", mins: 240, summary: "Define SLIs/SLOs for a service", capstone: false },
    { n: 84, title: "Incident Response, Postmortems, Backup/DR & Chaos Engineering", phase: 4, week: 12, tech: "SRE", tags: ["Incident","DR","Chaos"], diff: "Advanced", mins: 240, summary: "Run an incident with clear roles and communication", capstone: false },
    { n: 85, title: "Platform Engineering: Internal Developer Platforms & Golden Paths", phase: 4, week: 13, tech: "Platform", tags: ["IDP","Golden path"], diff: "Advanced", mins: 240, summary: "Explain platform engineering and IDP components", capstone: false },
    { n: 86, title: "Cost Optimisation (FinOps for Cloud & Kubernetes) & AI-Assisted DevOps", phase: 4, week: 13, tech: "FinOps", tags: ["Cost","AI"], diff: "Advanced", mins: 240, summary: "Measure and reduce cloud and Kubernetes cost", capstone: false },
    { n: 87, title: "Capstone 3 (Part 1/3): Production Kubernetes Platform Foundation", phase: 4, week: 13, tech: "Capstone", tags: ["Capstone 3","Kubernetes"], diff: "Advanced (Capstone)", mins: 330, summary: "Design and build the Kubernetes platform", capstone: true },
    { n: 88, title: "Capstone 3 (Part 2/3): Application Delivery, Observability & Security", phase: 4, week: 13, tech: "Capstone", tags: ["Capstone 3","Observability"], diff: "Advanced (Capstone)", mins: 330, summary: "Deploy a multi-service app via GitOps with progressive delivery", capstone: true },
    { n: 89, title: "Capstone 3 (Part 3/3): Resilience Drills, Cost Review & Documentation", phase: 4, week: 13, tech: "Capstone", tags: ["Capstone 3","Game day"], diff: "Advanced (Capstone)", mins: 330, summary: "Prove resilience through failure drills", capstone: true },
    { n: 90, title: "Final Assessment, Portfolio Polish & Interview Readiness", phase: 4, week: 13, tech: "Career", tags: ["Interview","Portfolio"], diff: "Advanced", mins: 270, summary: "Complete the career-readiness assessment", capstone: false }
  ];
})(window.D90);
