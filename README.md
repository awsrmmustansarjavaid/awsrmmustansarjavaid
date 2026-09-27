<!-- ========================================================= -->

<!--                    PROFILE HEADER                         -->

<!-- ========================================================= -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:1e293b,100:334155&height=220&section=header&text=Raja%20Muhammad%20Mustansar%20Javaid&fontSize=38&fontColor=ffffff&fontAlignY=38&desc=DevOps%20Engineer%20%7C%20Cloud%20Infrastructure%20%7C%20Automation%20%7C%20Kubernetes&descAlignY=58&descSize=17&animation=fadeIn"/>
</p>

<h1 align="center">Hi, I'm Raja Muhammad Mustansar Javaid 👋</h1>

<h3 align="center">
DevOps Engineer • Cloud Infrastructure • CI/CD • Infrastructure as Code
</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/rajamuhammadmustansarjavaid/">
    <img src="https://img.shields.io/badge/LinkedIn-Professional%20Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <a href="https://github.com/awsrmmustansarjavaid">
    <img src="https://img.shields.io/badge/GitHub-Projects-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

---

# 👨‍💻 About Me

I am a **DevOps Engineer focused on cloud infrastructure, automation, CI/CD, containerization, and Kubernetes**.

My approach to DevOps is centered around understanding how the complete engineering workflow connects:

**Code → Version Control → CI → Quality & Security → Container → Registry → Infrastructure → Deployment → Monitoring**

I build hands-on labs and practical projects to understand how these technologies work together rather than learning each tool in isolation.

### Current Engineering Focus

* ☁️ Cloud infrastructure and AWS
* 🏗 Infrastructure as Code with Terraform and CloudFormation
* 🔄 CI/CD automation
* 🐳 Docker and containerized applications
* ☸️ Kubernetes and container orchestration
* 🔧 Jenkins and GitHub Actions
* 🔐 DevSecOps and container security
* 📦 Container registries and artifact management
* 📊 Monitoring and observability
* 🚀 GitOps and Kubernetes deployment workflows

---

# 🧭 DevOps Engineering Journey

My current learning path is focused on building a practical DevOps toolchain from infrastructure provisioning to application deployment and monitoring.

```text
                    SOFTWARE DELIVERY LIFECYCLE

Developer
    │
    ▼
GitHub
    │
    ▼
CI/CD
GitHub Actions / Jenkins
    │
    ├──────────────► SonarQube
    │
    ├──────────────► Dependency / Security Scanning
    │
    ▼
Docker
    │
    ▼
Container Registry
    │
    ▼
Kubernetes
    │
    ├──────────────► Helm
    │
    ├──────────────► Argo CD / GitOps
    │
    ▼
Cloud Infrastructure
    │
    ▼
Monitoring & Observability
Prometheus + Grafana
```

This workflow represents the direction of my DevOps learning and project development.

---

# 🛠️ Technology Stack

## ☁️ Cloud & Infrastructure

<p align="center">
  <img src="https://skillicons.dev/icons?i=aws,azure,terraform,cloudflare" />
</p>

**Technologies**

* Amazon Web Services (AWS)
* Microsoft Azure
* Terraform
* AWS CloudFormation
* VPC
* EC2
* S3
* RDS
* IAM
* Secrets Manager
* Load Balancing
* Cloud Infrastructure Architecture

---

## 🐳 Containers & Kubernetes

<p align="center">
  <img src="https://skillicons.dev/icons?i=docker,kubernetes,helm" />
</p>

**Technologies**

* Docker
* Kubernetes
* Kubernetes Pods
* Nodes & Clusters
* Deployments
* Services
* ConfigMaps
* Secrets
* Namespaces
* Ingress
* Helm
* Container Runtime Concepts
* Amazon EKS

---

## 🔄 CI/CD & Automation

<p align="center">
  <img src="https://skillicons.dev/icons?i=githubactions,jenkins,ansible,bash" />
</p>

**Technologies**

* GitHub Actions
* Jenkins
* Ansible
* Bash / Shell scripting
* CI/CD pipeline design
* Automated infrastructure deployment
* Build automation
* Deployment automation
* Webhook-based workflows

---

## 🔐 DevSecOps

<p align="center">
  <img src="https://skillicons.dev/icons?i=github" />
</p>

**Tools & Practices**

* SonarQube
* OWASP Dependency-Check
* Trivy
* Container image scanning
* Dependency security
* Static analysis
* Secure CI/CD pipelines
* Secrets management

---

## 📊 Monitoring & Observability

<p align="center">
  <img src="https://skillicons.dev/icons?i=prometheus,grafana" />
</p>

**Technologies**

* Prometheus
* Grafana
* Metrics collection
* Dashboards
* Application monitoring
* Infrastructure monitoring
* Kubernetes observability

---

## 💻 Development & Version Control

<p align="center">
  <img src="https://skillicons.dev/icons?i=git,github,python,bash,vscode" />
</p>

**Technologies**

* Git
* GitHub
* Python
* Bash
* YAML
* JSON
* VS Code

---

# 🏗️ Current DevOps Lab

## AWS Cloud Infrastructure Lab

One of my main hands-on projects is an AWS infrastructure lab designed around **Infrastructure as Code and automated deployment**.

The infrastructure is provisioned and managed using **AWS CloudFormation**, with nested templates used to separate infrastructure components.

### Infrastructure Components

```text
                         AWS
                          │
                          ▼
                    ┌───────────┐
                    │    VPC    │
                    └─────┬─────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
       Subnets        Route Tables    Security Groups
          │
     ┌────┴─────┐
     ▼          ▼
    EC2        RDS
     │          │
     │          └── AWS Secrets Manager
     │
     ▼
    S3
```

### Automation

The lab uses a GitHub Actions workflow to automate the CloudFormation deployment process.

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ├── Validate CloudFormation
   │
   ├── Deploy Template Bucket
   │
   ├── Upload Nested Templates
   │
   ├── Validate Main Template
   │
   └── Create / Update Stack
             │
             ▼
        AWS Infrastructure
```

### Infrastructure Technologies

* AWS CloudFormation
* GitHub Actions
* Amazon VPC
* EC2
* S3
* RDS
* IAM
* AWS Secrets Manager
* Security Groups
* Nested CloudFormation stacks

---

# ☸️ Kubernetes Learning Direction

I am currently expanding my DevOps lab toward **Kubernetes**.

The goal is to understand container orchestration practically before moving toward larger managed Kubernetes environments.

### Kubernetes Learning Path

```text
Docker
  │
  ▼
Container Concepts
  │
  ▼
Kubernetes
  │
  ├── Pods
  ├── Nodes
  ├── Deployments
  ├── Services
  ├── ConfigMaps
  ├── Secrets
  ├── Ingress
  └── Helm
        │
        ▼
   Kubernetes Applications
        │
        ▼
   CI/CD Integration
        │
        ▼
      GitOps
        │
        ▼
      Amazon EKS
```

My current focus is on understanding Kubernetes fundamentals and integrating them into practical DevOps workflows.

---

# 🚀 Featured Projects

## 1. DevOps Study Lab

**Repository:**
https://github.com/awsrmmustansarjavaid/DevOps-Study-Lab

A hands-on learning repository containing DevOps concepts, experiments, notes, configurations, and practical exercises.

**Focus areas:**

* DevOps fundamentals
* Cloud
* Linux
* Git
* Docker
* Kubernetes
* CI/CD
* Infrastructure as Code

---

## 2. Charlie MJ DevOps Explorer

**Repository:**
https://github.com/awsrmmustansarjavaid/charlie-mj-devops-explorer

A practical exploration environment for experimenting with DevOps tools, workflows, automation, and infrastructure concepts.

**Focus areas:**

* DevOps tools
* Automation
* Cloud
* CI/CD
* Containers
* Infrastructure

---

## 3. Charlie MJ DevOps Insta Lab

**Repository:**
https://github.com/awsrmmustansarjavaid/charlie-mj-devops-insta-lab

A collection of focused DevOps experiments and smaller lab implementations.

**Focus areas:**

* Quick experiments
* Tool integration
* Infrastructure testing
* CI/CD concepts
* DevOps automation

---

# 🔬 What I'm Currently Learning

My current learning roadmap includes:

### Cloud

* AWS core services
* AWS networking
* IAM
* EC2
* S3
* RDS
* Load Balancers
* AWS Secrets Manager
* Amazon EKS

### Infrastructure as Code

* Terraform
* AWS CloudFormation
* Modular infrastructure
* Nested stacks
* Infrastructure automation

### Containers

* Docker
* Container images
* Docker networking
* Container registries
* Kubernetes container workloads

### Kubernetes

* Cluster architecture
* Pods
* Nodes
* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
* Volumes
* Helm
* Scaling
* Kubernetes networking

### CI/CD

* GitHub Actions
* Jenkins
* Webhooks
* Automated builds
* Automated testing
* Container image pipelines
* Deployment automation

### DevSecOps

* SonarQube
* OWASP Dependency-Check
* Trivy
* Secure container workflows
* Secrets management

### Observability

* Prometheus
* Grafana
* Metrics
* Dashboards
* Kubernetes monitoring

### GitOps

* Git-based deployment workflows
* Argo CD
* Kubernetes application synchronization
* Declarative deployment

---

# 🔗 DevOps Toolchain

One of my main goals is to understand how individual DevOps tools combine into a complete engineering workflow.

```text
                         DEVOPS TOOLCHAIN

 ┌──────────┐
 │ Developer│
 └────┬─────┘
      │
      ▼
 ┌──────────┐
 │  GitHub  │
 └────┬─────┘
      │
      ▼
 ┌────────────────┐
 │ Jenkins /      │
 │ GitHub Actions │
 └───────┬────────┘
         │
    ┌────┼───────────────┐
    ▼    ▼               ▼
 Sonar  OWASP           Tests
    │    │
    └────┼───────────────┘
         ▼
      Docker
         │
         ▼
      Trivy
         │
         ▼
 Container Registry
         │
         ▼
    Kubernetes
         │
    ┌────┴─────┐
    ▼          ▼
  Helm       Argo CD
    │          │
    └────┬─────┘
         ▼
    Cloud Platform
         │
         ▼
 Prometheus + Grafana
```

---

# 📚 Learning Philosophy

I focus on **hands-on implementation rather than only theoretical learning**.

My learning process is:

```text
Learn
  ↓
Build
  ↓
Break
  ↓
Troubleshoot
  ↓
Automate
  ↓
Document
  ↓
Improve
```

The goal is to understand not only **what a DevOps tool does**, but also:

* Why it is used
* Where it fits in the workflow
* How it connects with other tools
* How it can be automated
* How it can be secured
* How it can be monitored
* How it can be used in real infrastructure

---

# 📂 Repository Categories

You can explore my GitHub repositories through these areas:

### ☁️ Cloud & Infrastructure

AWS • CloudFormation • Terraform • Infrastructure as Code

### 🔄 CI/CD

GitHub Actions • Jenkins • Pipeline Automation

### 🐳 Containers

Docker • Container Images • Registries

### ☸️ Kubernetes

Kubernetes • Helm • Deployments • Services • EKS

### 🔐 DevSecOps

SonarQube • Trivy • Dependency Security

### 📊 Monitoring

Prometheus • Grafana • Observability

### 🧪 Labs & Experiments

Hands-on labs • Proof of Concepts • Tool Experiments

---

# 📈 GitHub Activity

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=awsrmmustansarjavaid&show_icons=true&hide_border=true&rank_icon=github" height="170"/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=awsrmmustansarjavaid&hide_border=true" height="170"/>
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=awsrmmustansarjavaid&layout=compact&hide_border=true" height="170"/>
</p>

---

# 🎯 Current Goals

```text
[x] Linux & Git fundamentals
[x] AWS infrastructure fundamentals
[x] Infrastructure as Code fundamentals
[x] AWS CloudFormation lab
[x] GitHub Actions automation
[x] Docker fundamentals

[ ] Advanced Docker workflows
[ ] Kubernetes fundamentals
[ ] Helm
[ ] Jenkins CI/CD
[ ] DevSecOps pipeline
[ ] Prometheus & Grafana
[ ] GitOps / Argo CD
[ ] Kubernetes on AWS EKS
[ ] End-to-end production-style DevOps project
```

---

# 📌 Engineering Interests

* Cloud Infrastructure
* DevOps Engineering
* Infrastructure as Code
* CI/CD Automation
* Kubernetes
* Containerization
* Cloud-Native Architecture
* DevSecOps
* GitOps
* Observability
* Infrastructure Automation
* Platform Engineering

---

# 🤝 Connect With Me

<p align="center">

<a href="https://www.linkedin.com/in/rajamuhammadmustansarjavaid/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://github.com/awsrmmustansarjavaid">
<img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</p>

<p align="center">
Open to connecting with engineers, DevOps practitioners, cloud professionals, and people interested in infrastructure automation.
</p>

---

# ⚙️ DevOps Stack at a Glance

<p align="center">
  <img src="https://skillicons.dev/icons?i=aws,azure,terraform,docker,kubernetes,helm,jenkins,githubactions,ansible,prometheus,grafana,git,github,python,bash" />
</p>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:334155,50:1e293b,100:0f172a&height=120&section=footer"/>
</p>

<p align="center">
  <sub>Building • Automating • Learning • Documenting</sub>
</p>
