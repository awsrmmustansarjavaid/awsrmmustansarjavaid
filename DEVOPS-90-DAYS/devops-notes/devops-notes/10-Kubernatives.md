**Kubernatives Study & Research**

| **S. No** | **Title**                                                                                             | **Category / Focus** | **Status** |
|-----------|-------------------------------------------------------------------------------------------------------|----------------------|------------|
| 1         | **[Learn Kubernetes (Official Doc)](https://kubernetes.io/docs/tutorials/kubernetes-basics/)** |                      |            |
| 2         |                                                                                                       |                      |            |
| 3         |                                                                                                       |                      |            |
| 4         |                                                                                                       |                      |            |
| 5         |                                                                                                       |                      |            |
| 6         |                                                                                                       |                      |            |
| 7         |                                                                                                       |                      |            |
| 8         |                                                                                                       |                      |            |
| 9         |                                                                                                       |                      |            |
| 10        |                                                                                                       |                      |            |
| 11        |                                                                                                       |                      |            |
| 12        |                                                                                                       |                      |            |
| 13        |                                                                                                       |                      |            |
| 14        |                                                                                                       |                      |            |
| 15        |                                                                                                       |                      |            |
| 16        |                                                                                                       |                      |            |
| 17        |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |
|           |                                                                                                       |                      |            |

# **Kubernetes — Complete Beginner Lecture Notes**

# **📘 DEVOPS KUBERNETES — NOTEBOOK INDEX**

## **SECTION 01 — Kubernetes Fundamentals**

### What is Kubernetes?

### Why Kubernetes Was Created

### Problems with Running Containers Manually

### Containers vs Kubernetes

### Docker vs Kubernetes

### Docker Swarm vs Kubernetes

### Kubernetes History

### Google Borg

### Omega

### Kubernetes

### CNCF

### Kubernetes Use Cases

### Kubernetes Advantages

### Kubernetes Limitations

### Kubernetes Ecosystem

### Kubernetes Cluster

### Node

### Pod

### Container

### Desired State

### Declarative Configuration

### Reconciliation

### Self-Healing

### Scheduling

### Scaling

### Rolling Updates

### Service Discovery

### Load Balancing

### Kubernetes Architecture — High Level

### Basic Kubernetes Commands

### 

## **SECTION 02 — Kubernetes Architecture & Core Components**

### Kubernetes Cluster Architecture

### Control Plane

### Worker Nodes

### Cluster Communication

### Kubernetes API

### kube-apiserver

### etcd

### kube-scheduler

### kube-controller-manager

### cloud-controller-manager

### kubelet

### kube-proxy

### Container Runtime

### containerd

### CRI

### CRI-O

### Docker and Kubernetes Container Runtime History

### Kubernetes Controllers

### Node Controller

### Deployment Controller

### ReplicaSet Controller

### Job Controller

### Namespace Controller

### EndpointSlice Control

### etcd

### What is etcd?

### What Data Does etcd Store?

### Why Kubernetes Uses etcd

### Cluster State

### Backup and Restore

### Kubernetes API Server

### kubectl and API Server

### API Server → etcd

### API Server → Controllers

### API Server → Scheduler

### API Server → kubelet

### Kubernetes Architecture Flow

### Architecture Commands

### 

## **SECTION 03 — Containers, Pods & Pod Lifecycle**

### Container Basics

### Container Images

### Image Registries

### Container Runtime

### Container Lifecycle

### What is a Pod?

### Why Kubernetes Uses Pods

### Pod vs Container

### Single-Container Pod

### Multi-Container Pod

### Shared Network Namespace

### Shared Storage

### Pod IP

### Pod Lifecycle

### Pending

### Running

### Succeeded

### Failed

### Unknown

### Pod Conditions

### PodScheduled

### Initialized

### ContainersReady

### Ready

### Container States

### Waiting

### Running

### Terminated

### Pod Restart Policies

### Always

### OnFailure

### Never

### Multi-Container Patterns

### Sidecar

### Ambassador

### Adapter

### Liveness Probe

### Readiness Probe

### Startup Probe

### CPU Requests

### CPU Limits

### Memory Requests

### Memory Limits

### QoS Classes

### Pod Management Commands

### 

## **SECTION 04 — Workloads, Deployments & Application Management**

### Kubernetes Workloads

### ReplicaSet

### Desired Replicas

### Maintaining Pod Count

### ReplicaSet vs Pod

### Deployment

### Deployment → ReplicaSet → Pod

### Desired State

### Rolling Updates

### Rollbacks

### Revision History

### Deployment Strategies

### RollingUpdate

### Recreate

### Canary

### Blue/Green

### StatefulSet

### Stateful vs Stateless Applications

### Stable Network Identity

### Stable Storage

### Ordered Deployment

### Ordered Termination

### DaemonSet

### One Pod per Node

### Logging Agents

### Monitoring Agents

### Networking Agents

### Jobs

### One-Time Workloads

### Job Completion

### Parallel Jobs

### CronJobs

### Scheduled Workloads

### Cron Syntax

### Job History

### Cleanup

### Namespaces

### Namespace Isolation

### Resource Organization

### Workload Management Commands

### 

## **SECTION 05 — Kubernetes Networking**

### Kubernetes Networking Overview

### Pod Networking

### Pod IP

### Node IP

### Cluster IP

### Container Networking

### Kubernetes Network Model

### Kubernetes Services

### What is a Service?

### Why Pods Need Services

### Service Discovery

### Stable IP

### Stable DNS Name

### Service Types

### ClusterIP

### NodePort

### LoadBalancer

### ExternalName

### Kubernetes DNS

### Service DNS

### Pod DNS

### CoreDNS

### Environment-Based Service Discovery

### DNS-Based Service Discovery

### Ingress

### Why Use Ingress?

### Ingress Rules

### Host-Based Routing

### Path-Based Routing

### TLS

### Ingress Controller

### Gateway API

### Gateway

### GatewayClass

### HTTPRoute

### NetworkPolicy

### Ingress Traffic

### Egress Traffic

### Allow/Deny Rules

### Namespace Selectors

### Pod Selectors

### CNI

### CNI Plugins

### Pod Networking Implementation

### External User → Load Balancer → Ingress → Service → Pod

### Networking Commands

### 

## **SECTION 06 — Kubernetes Storage & Stateful Applications**

### Kubernetes Storage Overview

### Ephemeral Storage

### Container Filesystem

### Pod Lifecycle and Data

### emptyDir

### Kubernetes Volumes

### Volume Concept

### Volume Lifecycle

### Common Volume Types

### Persistent Storage

### PersistentVolume

### PersistentVolumeClaim

### StorageClass

### Pod → PVC → PV → Storage

### Dynamic Provisioning

### Storage Provisioner

### Default StorageClass

### Access Modes

### ReadWriteOnce

### ReadOnlyMany

### ReadWriteMany

### ReadWriteOncePod

### Stateful Applications

### Databases on Kubernetes

### StatefulSet + Storage

### Stable Identity

### Persistent Storage

### Container Storage Interface — CSI

### CSI Drivers

### Cloud Storage Integration

### StatefulSet + PVC

### Database + Persistent Storage

### Kubernetes + Cloud Block Storage

### Kubernetes + Object Storage

### Storage Management Commands

### 

## **SECTION 07 — Configuration, ConfigMaps & Secrets**

### Kubernetes Configuration

### Application Configuration

### Environment Variables

### Configuration Files

### Declarative Configuration

### ConfigMap

### What is ConfigMap?

### Key/Value Configuration

### ConfigMap as Environment Variables

### ConfigMap as Configuration Files

### ConfigMap Volume Mounts

### Kubernetes Secrets

### What is Secret?

### Passwords

### API Keys

### Tokens

### Certificates

### Secret Types

### Opaque

### Docker Registry Credentials

### TLS

### Service Account Token Concepts

### Using Secrets

### Secrets as Environment Variables

### Secrets as Volume Mounts

### Base64 vs Encryption

### Encryption at Rest

### RBAC and Secret Access

### External Secret Management

### Resource Management

### CPU Requests

### CPU Limits

### Memory Requests

### Memory Limits

### ResourceQuota

### LimitRange

### ConfigMap vs Secret

### 

## **SECTION 08 — Kubernetes Security & Access Control**

### Kubernetes Security Overview

### Kubernetes Security Layers

### Authentication

### Authorization

### Admission

### Network Security

### Pod Security

### Secret Security

### Kubernetes Users

### Service Accounts

### Certificates

### Tokens

### External Identity Providers

### RBAC

### Role

### ClusterRole

### RoleBinding

### ClusterRoleBinding

### ServiceAccount

### Pod Identity

### Kubernetes API Access

### RBAC — Who → Can Do What → On Which Resource

### Admission Control

### Admission Controllers

### Validating Admission

### Mutating Admission

### Pod Security Standards

### Privileged

### Baseline

### Restricted

### NetworkPolicy Security

### Namespace Isolation

### Encryption at Rest

### Least Privilege

### Secret Access Control

### Container Security

### Privileged Containers

### Container Capabilities

### Trusted Images

### Image Scanning

### Kubernetes Updates

### Kubernetes Security Best Practices

### 

## **SECTION 09 — Helm, YAML & Kubernetes Package Management**

### YAML Basics

### Kubernetes YAML

### Kubernetes Manifests

### apiVersion

### kind

### metadata

### spec

### status

### Kubernetes Object Structure

### Kubernetes Manifest Management

### Deployment YAML

### Service YAML

### ConfigMap YAML

### Secret YAML

### Ingress YAML

### PVC YAML

### Labels

### Selectors

### Label-Based Organization

### Annotations

### Labels vs Annotations

### Helm

### What is Helm?

### Helm Charts

### Chart Structure

### Chart.yaml

### values.yaml

### Templates

### Releases

### Helm Values

### Helm Templates

### Helm Repositories

### Chart Dependencies

### Helm Install

### Helm Upgrade

### Helm Rollback

### Helm Uninstall

### Helm List

### Kustomize

### Kustomize Base

### Kustomize Overlay

### Environment-Specific Configuration

### GitOps

### Git Repository

### Kubernetes Manifests

### Helm + GitOps

### Kustomize + GitOps

### Argo CD + Kubernetes

### 

## **SECTION 10 — Kubernetes Operations, Scaling & Troubleshooting**

### Kubernetes Operations

### kubectl

### kubectl get

### kubectl describe

### kubectl create

### kubectl apply

### kubectl delete

### kubectl edit

### kubectl logs

### kubectl exec

### kubectl explain

### Manual Scaling

### Horizontal Pod Autoscaler — HPA

### Vertical Pod Autoscaler — VPA

### Cluster Autoscaler

### Node Scaling

### Metrics → HPA → Pod Replicas

### Kubernetes Scheduling

### Scheduler

### Node Selection

### nodeSelector

### nodeAffinity

### podAffinity

### podAntiAffinity

### Taints

### Tolerations

### Dedicated Nodes

### PodDisruptionBudget

### Availability During Maintenance

### Troubleshooting Methodology

### Pod Troubleshooting

### Pending

### CrashLoopBackOff

### ImagePullBackOff

### ErrImagePull

### OOMKilled

### ContainerCreating

### Application Troubleshooting

### Pod Running but Application Unavailable

### Service Problems

### DNS Problems

### Ingress Problems

### NetworkPolicy Problems

### Node Troubleshooting

### NotReady

### Disk Pressure

### Memory Pressure

### CPU Pressure

### Check

### Describe

### Logs

### Events

### Configuration

### Network

### Resources

### Troubleshooting Commands

### 

## **SECTION 11 — Observability & Advanced Kubernetes**

### Kubernetes Observability

### Three Pillars of Observability

### Metrics

### Logs

### Traces

### Kubernetes Metrics

### CPU Metrics

### Memory Metrics

### Network Metrics

### Pod Metrics

### Node Metrics

### Application Metrics

### Prometheus

### What is Prometheus?

### Metrics Collection

### Prometheus Targets

### PromQL Basics

### Alerting

### Grafana

### What is Grafana?

### Dashboards

### Kubernetes Dashboards

### Metrics Visualization

### Kubernetes Logging

### Container Logs

### Node Logs

### Centralized Logging

### Log Aggregation

### Distributed Tracing

### What is Tracing?

### Trace

### Span

### Request Flow

### OpenTelemetry

### Metrics

### Logs

### Traces

### Telemetry Collection

### Custom Resource Definitions — CRDs

### Operators

### Custom Controllers

### Admission Webhooks

### Extending Kubernetes API

### CRD → Custom Resource → Controller/Operator

### Advanced Kubernetes Concepts

### 

## **SECTION 12 — Production Kubernetes, Cloud, EKS & DevOps Integration**

### Production Kubernetes

### High Availability

### Multiple Control Plane Nodes

### Worker Nodes

### Fault Tolerance

### Disaster Recovery

### Backup

### Restore

### Cluster Upgrades

### Kubernetes Production Security

### Image Security

### Vulnerability Scanning

### RBAC

### NetworkPolicy

### Pod Security

### Secret Management

### Supply Chain Security

### Container Registries

### Docker Hub

### Amazon ECR

### Image Tagging

### Image Versioning

### Private Registries

### Cloud Kubernetes

### Managed Kubernetes

### Amazon EKS

### Google GKE

### Azure AKS

### Managed Control Plane

### Amazon EKS Architecture

### EKS Control Plane

### Managed Node Groups

### Self-Managed Nodes

### EKS Networking

### VPC Integration

### IAM

### AWS Load Balancers

### Amazon ECR

### Amazon EBS

### Amazon EFS

### EKS Add-ons

### Kubernetes + AWS Architecture

### AWS VPC → EKS → Nodes → Pods → Services/Load Balancer → Users

### CI/CD + Kubernetes

### GitHub

### Jenkins

### SonarQube

### Docker

### Trivy

### Container Registry / ECR

### GitOps Repository

### Argo CD

### Kubernetes / EKS

### Service / Ingress / Load Balancer

### GitOps

### Desired State in Git

### Argo CD

### Continuous Reconciliation

### Automated Synchronization

### Rollback

### Infrastructure as Code

### Terraform

### CloudFormation

### Kubernetes Manifests

### Helm

### Git

### Production Observability

### Prometheus

### Grafana

### Logs

### Traces

### Alerts

### Production Application Architecture

### Frontend

### API

### Microservices

### Database

### Cache

### Complete DevOps + Kubernetes Workflow

### Developer → GitHub → Jenkins → SonarQube → Docker → Trivy → ECR → GitOps → Argo CD → Kubernetes/EKS → Load Balancer → Users

## **SECTION 01 — Kubernetes Fundamentals**

## **1. What is Kubernetes?**

- Kubernetes, also called **K8s**, is an open-source container orchestration platform.
- It helps **deploy, manage, scale, and monitor containers**.
- It can automatically restart failed containers and distribute applications across machines.
- Kubernetes keeps the application in the **desired state**.

### **Simple Example**

- Docker runs a container.
- Kubernetes manages **many containers across many servers**.

## **2. Why Kubernetes Was Created**

- Running many containers manually becomes difficult.
- Applications need:
  - Automatic deployment
  - Scaling
  - Load balancing
  - Failure recovery
  - Updates
- Kubernetes automates these tasks.

## **3. Problems with Running Containers Manually**

- Manually starting containers takes time.
- Difficult to manage hundreds of containers.
- If a container crashes, someone must restart it.
- Difficult to distribute traffic.
- Scaling applications is difficult.
- Updating applications can cause downtime.

## **4. Containers vs Kubernetes**

### **Container**

- A container packages an application and its dependencies.
- Example: Docker container.
- Usually runs one application or service.

### **Kubernetes**

- Kubernetes manages containers.
- It decides:
  - Where containers should run.
  - When they should restart.
  - How many should run.
  - How users reach them.

## **5. Docker vs Kubernetes**

### **Docker**

- Used to **build and run containers**.
- Creates container images.
- Runs containers on a machine.

### **Kubernetes**

- Used to **orchestrate containers**.
- Manages containers across multiple machines.
- Provides scaling, networking, self-healing, and deployment management.

### **Simple Idea**

- **Docker = Container**
- **Kubernetes = Container Management**

## **6. Docker Swarm vs Kubernetes**

### **Docker Swarm**

- Container orchestration technology from Docker.
- Simple to learn and set up.
- Works closely with Docker.

### **Kubernetes**

- More powerful and feature-rich.
- Large ecosystem and community.
- Supports many container runtimes.
- Commonly used for production and cloud environments.

# **7. Kubernetes History**

## **Google Borg**

- Google created **Borg** to manage large numbers of containers/workloads.
- Borg influenced the design of Kubernetes.

## **Omega**

- Google developed **Omega** as another large-scale cluster management system.
- It introduced ideas that influenced Kubernetes.

## **Kubernetes**

- Kubernetes was originally developed by Google.
- It was inspired by Google's experience with Borg and Omega.
- Kubernetes was released as an open-source project in **2014**.

## **CNCF**

- Kubernetes was donated to the **Cloud Native Computing Foundation (CNCF)** in 2015.
- CNCF helps support and develop the Kubernetes ecosystem.

# **8. Kubernetes Use Cases**

- Deploying web applications.
- Running microservices.
- Managing APIs.
- Running background jobs.
- Scaling applications.
- Continuous deployment.
- Cloud-native applications.
- Running applications across multiple servers.

# **9. Kubernetes Advantages**

- Automatic scaling.
- Self-healing.
- Load balancing.
- Service discovery.
- Rolling updates.
- Efficient resource usage.
- Supports cloud and on-premises environments.
- Large ecosystem.

# **10. Kubernetes Limitations**

- Can be difficult for beginners.
- More complex than running a single container.
- Requires networking and security knowledge.
- Troubleshooting can become complicated.
- Kubernetes itself requires resources to run.
- Large clusters require proper administration.

# **11. Kubernetes Ecosystem**

- **Docker** — Container development and images.
- **containerd** — Container runtime.
- **Helm** — Kubernetes package manager.
- **Prometheus** — Monitoring and metrics.
- **Grafana** — Dashboards and visualization.
- **Argo CD** — GitOps continuous delivery.
- **Ingress** — HTTP/HTTPS traffic routing.
- **CNI** — Container networking.
- **CSI** — Container storage integration.

# **12. Kubernetes Cluster**

- A **cluster** is a group of machines managed by Kubernetes.
- A cluster contains:
  - Control Plane
  - Worker Nodes

### **Simple Structure**

- **Cluster**
  - Control Plane
  - Node
  - Node
  - Node

# **13. Node**

- A **Node** is a machine inside a Kubernetes cluster.
- It can be a:
  - Virtual machine
  - Physical server
  - Cloud instance
- Nodes run application workloads.

# **14. Pod**

- A **Pod** is the smallest deployable unit in Kubernetes.
- A Pod contains one or more containers.
- Usually, one main application container runs inside a Pod.

### **Simple Structure**

- Cluster
  - Node
    - Pod
      - Container

# **15. Container**

- A container runs an application in an isolated environment.
- It contains:
  - Application
  - Libraries
  - Dependencies
- Containers are created from **container images**.

### **Example**

- Nginx image → Nginx container.

# **16. Desired State**

- Desired state means **how you want your application to run**.
- Example:
  - "I want 3 replicas of my application."
- Kubernetes continuously works to maintain that state.

# **17. Declarative Configuration**

- You tell Kubernetes **what you want**.
- Kubernetes decides **how to achieve it**.

### **Example**

replicas: 3

- You are saying:
  - "I want 3 Pods."
- Kubernetes creates and maintains those Pods.

# **18. Reconciliation**

- Kubernetes constantly compares:
  - **Desired State**
  - **Current State**
- If they are different, Kubernetes tries to fix the difference.

### **Example**

- Desired: 3 Pods
- Running: 2 Pods
- Kubernetes creates another Pod.

# **19. Self-Healing**

- Kubernetes can automatically respond to failures.
- It can:
  - Restart failed containers.
  - Replace failed Pods.
  - Move workloads when possible.
- Goal: keep applications running.

# **20. Scheduling**

- Scheduling means deciding **which Node should run a Pod**.
- Kubernetes Scheduler considers available resources and rules.
- It then assigns the Pod to a suitable Node.

# **21. Scaling**

- Scaling means changing the number of application instances.

### **Scale Up**

- Increase Pods.
- Example: 2 → 5 Pods.

### **Scale Down**

- Decrease Pods.
- Example: 5 → 2 Pods.

### **Kubernetes Can**

- Scale applications manually.
- Automatically scale applications using mechanisms such as **Horizontal Pod Autoscaler (HPA)**.

# **22. Rolling Updates**

- Rolling update changes an application version gradually.
- Kubernetes starts new Pods while removing old Pods.
- Helps reduce application downtime.

### **Example**

- Version 1 → Version 2
- Old Pods are gradually replaced by new Pods.

# **23. Service Discovery**

- Applications need to find and communicate with other applications.
- Kubernetes provides **Services** for stable networking.
- Applications can communicate using a Service name instead of directly using Pod IP addresses.

### **Example**

Frontend → Backend Service → Backend Pods

# **24. Load Balancing**

- Load balancing distributes traffic between application Pods.
- Kubernetes Services can distribute network traffic across available Pods.

### **Example**

    Users
    ↓
    Service
    ↓
    Pod 1

Pod 2

Pod 3

# **25. Kubernetes Architecture — High Level**

## **Control Plane**

- Controls and manages the Kubernetes cluster.
- Main components include:
  - **API Server** — Kubernetes communication entry point.
  - **Scheduler** — Assigns Pods to Nodes.
  - **Controller Manager** — Maintains the desired state.
  - **etcd** — Stores Kubernetes cluster data.

## **Worker Node**

- Runs application workloads.
- Important components include:
  - **Kubelet** — Communicates with the Control Plane and manages Pods.
  - **Container Runtime** — Runs containers.
  - **Kube-proxy** — Helps with Kubernetes networking.

### **Simple Architecture**

Kubernetes Cluster

\|

+-------+-------+

\| \|

Control Plane Worker Node

\| \|

API Server Pod

Scheduler \|

Controllers Container

etcd

# **26. Basic Kubernetes Commands**

## **Check Cluster**

``` bash
kubectl cluster-info
```

- Shows basic information about the Kubernetes cluster.

## **Check Nodes**

``` bash
kubectl get nodes
```

- Lists Kubernetes Nodes.

## **Check Pods**

``` bash
kubectl get pods
```

- Lists Pods in the current namespace.

## **Check All Resources**

``` bash
kubectl get all
```

- Shows common Kubernetes resources.

## **Create a Deployment**

``` bash
kubectl create deployment nginx --image=nginx
```

- Creates a Deployment using the Nginx image.

## **Expose an Application**

``` bash
kubectl expose deployment nginx --port=80
```

- Creates a Service for the Deployment.

## **Delete a Resource**

``` bash
kubectl delete deployment nginx
```

- Deletes the Deployment.

## **Get Detailed Information**

``` bash
kubectl describe pod <pod-name>
```

- Shows detailed information about a Pod.

## **View Pod Logs**

``` bash
kubectl logs <pod-name>
```

- Shows container logs.

# **Quick Revision**

- **Kubernetes** → Container orchestration platform.
- **Cluster** → Complete Kubernetes environment.
- **Node** → Machine in the cluster.
- **Pod** → Smallest deployable Kubernetes unit.
- **Container** → Runs the application.
- **Deployment** → Manages application Pods.
- **Service** → Provides stable networking to Pods.
- **Scheduler** → Decides where Pods run.
- **Controller** → Maintains desired state.
- **etcd** → Stores cluster information.
- **Kubelet** → Manages Pods on a Node.
- **Scaling** → Changes the number of Pods.
- **Self-healing** → Kubernetes automatically responds to failures.
- **Rolling update** → Gradually replaces old application versions.
- **Declarative configuration** → Tell Kubernetes what you want; Kubernetes works out how to achieve it.

## **SECTION 02 — Kubernetes Architecture & Core Components**

## **1. Kubernetes Cluster Architecture**

- A Kubernetes cluster has two main parts:
  - **Control Plane**
  - **Worker Nodes**
- Control Plane manages the cluster.
- Worker Nodes run applications.

### **Simple Flow**

    User
    ↓
    kubectl
    ↓
    Control Plane
    ↓
    Worker Nodes
    ↓
    Pods → Containers

# **2. Control Plane**

- The **Control Plane** manages the Kubernetes cluster.
- It makes decisions about:
  - Scheduling
  - Desired state
  - Cluster management
  - Application deployment

### **Main Components**

- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager
- cloud-controller-manager

# **3. Worker Nodes**

- Worker Nodes run application workloads.
- Each Node normally contains:
  - kubelet
  - kube-proxy
  - Container Runtime
  - Pods

### **Simple Structure**

Worker Node

├── kubelet

├── kube-proxy

├── Container Runtime

└── Pods

# **4. Cluster Communication**

- Kubernetes components communicate mainly through the **Kubernetes API**.
- The API Server acts as the central communication point.
- Components use APIs to:
  - Read information
  - Create resources
  - Update resources
  - Monitor resources

# **5. Kubernetes API**

- The Kubernetes API is the interface for communicating with the cluster.
- Users and Kubernetes components interact with the cluster through the API Server.
- Kubernetes resources such as Pods, Deployments, and Services are managed through the API.

# **6. kube-apiserver**

- The **kube-apiserver** is the main entry point to Kubernetes.
- It receives API requests.
- It validates requests.
- It communicates with etcd.
- It allows Kubernetes components to communicate.

### **Simple Idea**

``` bash
kubectl → kube-apiserver → Kubernetes
```

# **7. etcd**

- **etcd** is a distributed key-value database.
- Kubernetes uses it to store cluster information.
- It stores the desired and current state of Kubernetes resources.

### **Simple Idea**

Kubernetes State → etcd

# **8. kube-scheduler**

- The **kube-scheduler** decides where new Pods should run.
- It checks available Nodes and resource requirements.
- It assigns a suitable Node to the Pod.

### **Simple Flow**

    New Pod
    ↓
    Scheduler
    ↓
    Suitable Node

# **9. kube-controller-manager**

- Runs Kubernetes controllers.
- Controllers continuously watch the cluster.
- They compare:
  - Desired State
  - Current State
- Controllers take action when something needs to be corrected.

# **10. cloud-controller-manager**

- Connects Kubernetes with cloud-provider APIs.
- Used when Kubernetes runs in cloud environments.
- Can manage cloud resources such as:
  - Load balancers
  - Cloud Nodes
  - Routes

# **11. kubelet**

- **kubelet** runs on every Worker Node.
- It communicates with the Control Plane.
- It makes sure Pods and containers are running as requested.
- It works with the Container Runtime.

### **Simple Flow**

    API Server
    ↓
    kubelet
    ↓
    Container Runtime
    ↓
    Container

# **12. kube-proxy**

- Runs on Worker Nodes.
- Helps implement Kubernetes networking.
- Helps route network traffic to Services and Pods.

### **Simple Idea**

    User Traffic
    ↓
    Service
    ↓
    kube-proxy
    ↓
    Pods

# **13. Container Runtime**

- Container Runtime is the software that **runs containers**.
- Kubernetes needs a runtime to start and manage containers.
- Examples:
  - containerd
  - CRI-O

# **14. containerd**

- **containerd** is a container runtime.
- It manages the complete container lifecycle.
- Kubernetes commonly uses containerd through the CRI.

# **15. CRI**

### **Container Runtime Interface**

- **CRI** is the interface between Kubernetes and container runtimes.
- It allows Kubernetes to communicate with compatible runtimes.
- Kubernetes does not need to directly implement every runtime.

### **Simple Flow**

    Kubernetes
    ↓
    CRI
    ↓
    Container Runtime

# **16. CRI-O**

- **CRI-O** is a lightweight container runtime designed for Kubernetes.
- It implements the Kubernetes **CRI**.
- It can run OCI-compatible container images.

# **17. Docker and Kubernetes Container Runtime History**

- Originally, Kubernetes supported Docker directly.
- Kubernetes later moved toward the **CRI-based runtime model**.
- Docker support through the built-in `dockershim` was removed in Kubernetes **1.24**.
- Today, Kubernetes commonly uses runtimes such as:
  - containerd
  - CRI-O

### **Important**

- Docker is still widely used for **building container images**.
- Kubernetes does not require Docker Engine to run containers.

# **18. Kubernetes Controllers**

- Controllers are Kubernetes processes that watch resources.
- Their main job is to maintain the **desired state**.
- If the actual state is different, they take action.

### **Simple Example**

Desired: 3 Pods

    Current: 2 Pods
    ↓
    Controller
    ↓
    Creates another Pod

## **Node Controller**

- Monitors the health of Nodes.
- Detects when Nodes become unavailable.
- Helps Kubernetes respond to Node failures.

## **Deployment Controller**

- Manages Deployments.
- Creates and manages ReplicaSets.
- Helps perform application updates and maintain the desired number of Pods.

## **ReplicaSet Controller**

- Maintains the required number of Pod replicas.
- Example:
  - Desired: 3 Pods
  - Running: 2 Pods
  - Creates 1 more Pod.

## **Job Controller**

- Manages **Jobs**.
- Makes sure a task runs successfully.
- Useful for tasks that need to run and finish.

### **Example**

Job → Run task → Complete

## **Namespace Controller**

- Manages Kubernetes Namespaces.
- Handles cleanup of resources when a Namespace is deleted.

## **EndpointSlice Controller**

- Maintains **EndpointSlices**.
- Keeps track of the network endpoints behind Services.
- Helps Kubernetes efficiently manage Service-to-Pod networking.

# **19. etcd**

## **What is etcd?**

- etcd is Kubernetes' distributed key-value data store.
- It is a critical part of the Control Plane.
- It stores Kubernetes cluster state.

## **What Data Does etcd Store?**

- Kubernetes resource information.
- Pods
- Deployments
- Services
- Configurations
- Secrets metadata/data as stored by Kubernetes
- Cluster state and configuration information

### **Simple Idea**

    Kubernetes Cluster State
    ↓
    etcd

## **Why Kubernetes Uses etcd**

- Provides reliable storage for cluster state.
- Supports distributed systems.
- Helps Kubernetes recover and maintain the desired state.
- The API Server uses etcd as the persistent store for Kubernetes objects.

## **Cluster State**

- **Cluster State** describes the current information about the Kubernetes cluster.
- Kubernetes compares the current state with the desired state.
- Controllers help bring the cluster back to the desired state.

## **Backup and Restore**

- etcd contains critical Kubernetes state.
- Regular etcd backups are important for cluster recovery.
- A backup can be used to restore cluster state after a serious failure.

# **20. Kubernetes API Server**

## **kube-apiserver**

- Central communication point of Kubernetes.
- Receives API requests.
- Validates and processes requests.
- Reads and writes Kubernetes state in etcd.

## **kubectl and API Server**

- `kubectl` is the command-line tool for Kubernetes.
- It sends requests to the API Server.

### **Example**

``` bash
kubectl get pods
```

### **Flow**

``` bash
kubectl
↓
API Server
↓
Cluster
```

## **API Server → etcd**

- API Server reads and writes persistent Kubernetes state in etcd.


    API Server
    ↓
    etcd

## **API Server → Controllers**

- Controllers watch resources through the API Server.
- Controllers then take action when changes are needed.


    API Server
    ↓
    Controllers

## **API Server → Scheduler**

- Scheduler watches for Pods that need to be assigned to Nodes.
- Scheduler communicates through the Kubernetes API.


    API Server
    ↓
    Scheduler
    ↓
    Node

## **API Server → kubelet**

- kubelet communicates with the API Server.
- It receives information about Pods that should run on its Node.
- kubelet then works with the container runtime.


    API Server
    ↓
    kubelet
    ↓
    Container Runtime
    ↓
    Pod

# **21. Kubernetes Architecture Flow**

### **Complete Basic Flow**

    User
    ↓
    kubectl
    ↓
    kube-apiserver
    ↓
    ┌────────┼────────┐

↓ ↓ ↓

    etcd Scheduler Controllers
    ↓
    API Server
    ↓
    Worker Node
    ↓
    kubelet
    ↓
    Container Runtime
    ↓
    Pod
    ↓
    Container

### **Remember**

- **API Server** → Communication center
- **etcd** → Cluster state storage
- **Scheduler** → Chooses Node for Pod
- **Controller** → Maintains desired state
- **kubelet** → Manages Pods on Node
- **kube-proxy** → Helps with networking
- **Container Runtime** → Runs containers

# **22. Architecture Commands**

## **View Nodes**

``` bash
kubectl get nodes
```

## **View Pods**

``` bash
kubectl get pods
```

## **View All Resources**

``` bash
kubectl get all
```

## **Describe a Node**

``` bash
kubectl describe node <node-name>
```

## **Describe a Pod**

``` bash
kubectl describe pod <pod-name>
```

## **View Cluster Information**

``` bash
kubectl cluster-info
```

## **View API Resources**

``` bash
kubectl api-resources
```

## **View API Server Information**

``` bash
kubectl cluster-info
```

## **View Kubernetes Component Logs**

- Logs depend on how the cluster was installed.
- For system Pods, you can inspect them with:

``` bash
kubectl get pods -n kube-system
```

# **Quick Revision**

- **Control Plane** → Manages the cluster.
- **Worker Node** → Runs applications.
- **kube-apiserver** → Central Kubernetes API.
- **etcd** → Stores cluster state.
- **Scheduler** → Assigns Pods to Nodes.
- **Controller Manager** → Runs controllers.
- **Cloud Controller Manager** → Connects Kubernetes with cloud services.
- **kubelet** → Manages Pods on Nodes.
- **kube-proxy** → Helps with Service networking.
- **Container Runtime** → Runs containers.
- **containerd / CRI-O** → Common Kubernetes container runtimes.
- **CRI** → Interface between Kubernetes and container runtimes.
- **Controllers** → Keep actual state aligned with desired state.

## **SECTION 03 — Containers, Pods & Pod Lifecycle**

### 

## **1. Container Basics**

- A **container** runs an application in an isolated environment.
- It includes the application and its required dependencies.
- Containers are lightweight compared with virtual machines.
- Kubernetes uses containers to run applications.

## **2. Container Images**

- A **container image** is a packaged version of an application.
- It contains:
  - Application code
  - Libraries
  - Dependencies
  - Configuration needed to run the application
- A container is created from an image.

### **Simple Flow**

    Container Image
    ↓
    Container
    ↓
    Application

## **3. Image Registries**

- An **image registry** stores container images.
- Kubernetes can pull images from a registry when creating Pods.

### **Examples**

- Docker Hub
- Amazon ECR
- GitHub Container Registry
- Google Artifact Registry

### **Simple Flow**

    Developer
    ↓
    Build Image
    ↓
    Container Registry
    ↓
    Kubernetes
    ↓
    Pod

## **4. Container Runtime**

- A **container runtime** runs containers.
- Kubernetes communicates with the runtime through the **CRI**.
- Common runtimes include:
  - containerd
  - CRI-O

# **5. Container Lifecycle**

A container normally goes through these stages:

    Created
    ↓
    Running
    ↓
    Terminated

- **Created** → Container is created.
- **Running** → Application is running.
- **Terminated** → Container has stopped.

Kubernetes can restart a container depending on the Pod's restart policy.

# **6. What is a Pod?**

- A **Pod** is the smallest deployable unit in Kubernetes.
- A Pod contains one or more containers.
- Containers inside the same Pod share certain resources.
- Pods are normally created and managed by higher-level resources such as Deployments.

### **Simple Structure**

Pod

├── Container

└── Container

# **7. Why Kubernetes Uses Pods**

- Kubernetes uses Pods to group containers that need to work together.
- Containers inside a Pod can share:
  - Network
  - Storage volumes
  - Lifecycle
- A Pod provides a common environment for its containers.

# **8. Pod vs Container**

### **Container**

- Runs an application.
- Managed by a container runtime.
- Example: Nginx container.

### **Pod**

- Kubernetes unit that contains one or more containers.
- Provides shared networking and storage for its containers.

### **Easy Way to Remember**

- **Container = Application process**
- **Pod = Kubernetes wrapper around one or more containers**

# **9. Single-Container Pod**

- Most Pods contain **one main container**.
- This is the simplest and most common pattern.

Pod

└── Application Container

### **Example**

- Nginx Pod → Nginx container.

# **10. Multi-Container Pod**

- A Pod can contain multiple containers.
- Containers should be closely related and need to run together.
- They share the Pod's network and can share volumes.

Pod

├── Main Container

└── Helper Container

# **11. Shared Network Namespace**

- Containers inside the same Pod share the **same network namespace**.
- They share:
  - Pod IP
  - Network interface
  - Port space
- Containers can communicate with each other using `localhost`.

### **Example**

Pod IP: 10.10.1.5

Container A → localhost → Container B

- Containers in the same Pod must avoid using the same network port.

# **12. Shared Storage**

- Containers in a Pod can share storage through **Volumes**.
- One container can write data.
- Another container can read that data.


    Container A
    ↓
    Shared Volume
    ↓
    Container B

# **13. Pod IP**

- Each Pod normally receives its own IP address.
- Containers inside the same Pod share that IP.
- Pod IPs can change when Pods are recreated.
- Applications should generally use a **Service** when they need a stable network endpoint.

# **14. Pod Lifecycle**

A Pod can have different phases during its lifecycle.

    Pending
    ↓
    Running
    ↓
    Succeeded / Failed

## **Pending**

- Pod has been accepted by Kubernetes.
- It may be waiting for:
  - Scheduling
  - Image download
  - Required resources

## **Running**

- Pod has been scheduled to a Node.
- At least one container is running or starting.

## **Succeeded**

- All containers finished successfully.
- Containers will not be restarted according to normal Pod completion behavior.

### **Example**

- A batch Job completes successfully.

## **Failed**

- All containers have terminated.
- At least one container terminated with an error or failure.

## **Unknown**

- Kubernetes cannot determine the Pod's current state.
- Usually caused by communication problems with the Node.

# **15. Pod Conditions**

Pod conditions provide more detailed information about the Pod's state.

## **PodScheduled**

- Indicates whether the Pod has been assigned to a Node.

## **Initialized**

- Indicates whether initialization has completed successfully.

## **ContainersReady**

- Indicates whether all containers in the Pod are ready.

## **Ready**

- Indicates whether the Pod is ready to receive traffic.
- This is especially important when a Pod is behind a Kubernetes Service.

### **Easy Difference**

- **ContainersReady** → Containers are ready.
- **Ready** → Pod is ready to serve traffic.

# **16. Container States**

A container can have three main states.

## **Waiting**

- Container is not running yet.
- It is waiting for something to happen.

### **Examples**

- Pulling an image.
- Waiting for a dependency.
- Restart backoff.

## **Running**

- Container is currently running.
- Its application process is active.

## **Terminated**

- Container has stopped.
- It can contain information such as:
  - Exit code
  - Reason
  - Start time
  - Finish time

# **17. Pod Restart Policies**

Restart policies control when containers in a Pod are restarted.

## **Always**

- Container is restarted whenever it terminates.
- This is the **default** Pod restart policy.

## **OnFailure**

- Container is restarted when it terminates with a failure.

## **Never**

- Container is not restarted after termination.

### **Easy Memory**

Always → Restart

OnFailure → Restart if failed

Never → Don't restart

# **18. Multi-Container Patterns**

## **Sidecar**

- A helper container runs alongside the main application container.
- It provides additional functionality.

### **Example**

Pod

├── Main Application

└── Logging Sidecar

- The sidecar might collect or process application logs.

## **Ambassador**

- An ambassador container acts as a proxy between the application and an external service.
- It can simplify communication with another service.


    Application
    ↓
    Ambassador
    ↓
    External Service

## **Adapter**

- An adapter container transforms application output into a standard format.
- Often useful for monitoring or logging.


    Application
    ↓
    Adapter
    ↓
    Standard Format

# **19. Liveness Probe**

- Checks whether an application is **alive**.
- If the liveness check fails repeatedly, Kubernetes can restart the container.

### **Simple Question**

> "Is the application still working?"

# **20. Readiness Probe**

- Checks whether an application is **ready to receive traffic**.
- If the check fails, Kubernetes can remove the Pod from Service endpoints.

### **Simple Question**

> "Can this application handle traffic now?"

# **21. Startup Probe**

- Checks whether a slow-starting application has successfully started.
- Useful for applications that take a long time to initialize.
- Prevents liveness checks from restarting the application too early.

### **Simple Difference**

Startup → Has the application started?

Liveness → Is the application alive?

Readiness → Can it receive traffic?

# **22. CPU Requests**

- CPU request tells Kubernetes how much CPU a container **needs**.
- Scheduler uses requests when deciding where to place a Pod.

### **Example**

    resources:
    requests:
    cpu: "250m"

- `250m` = 0.25 CPU core.

# **23. CPU Limits**

- CPU limit sets the maximum CPU a container can use.
- If a container tries to use more CPU, its CPU usage is throttled.

### **Example**

    resources:
    limits:
    cpu: "500m"

# **24. Memory Requests**

- Memory request tells Kubernetes how much memory a container needs.
- Scheduler uses it when selecting a Node.

### **Example**

    resources:
    requests:
    memory: "256Mi"

# **25. Memory Limits**

- Memory limit sets the maximum memory a container can use.
- If a container exceeds its memory limit, it can be terminated by the system with an **OOMKilled** result.

### **Example**

    resources:
    limits:
    memory: "512Mi"

# **26. QoS Classes**

**QoS = Quality of Service**

Kubernetes assigns Pods to QoS classes based on their resource requests and limits.

## **Guaranteed**

- Containers have CPU and memory requests and limits set appropriately.
- Provides the strongest resource guarantees among the QoS classes.

## **Burstable**

- Pod has resource requests and/or limits, but does not meet the requirements for Guaranteed.

## **BestEffort**

- Containers have no CPU or memory requests or limits.

### **Easy Memory**

Guaranteed → Strongest resource guarantee

Burstable → Some resource settings

BestEffort → No CPU/Memory requests or limits

# **27. Pod Management Commands**

## **Create a Pod**

``` bash
kubectl run nginx --image=nginx
```

## **List Pods**

``` bash
kubectl get pods
```

## **Detailed Pod Information**

``` bash
kubectl describe pod <pod-name>
```

## **View Pod YAML**

``` bash
kubectl get pod <pod-name> -o yaml
```

## **View Pod Logs**

``` bash
kubectl logs <pod-name>
```

## **Follow Pod Logs**

``` bash
kubectl logs -f <pod-name>
```

## **Execute Command Inside a Container**

``` bash
kubectl exec -it <pod-name> -- /bin/sh
```

## **Delete a Pod**

``` bash
kubectl delete pod <pod-name>
```

## **Check Pod Status**

``` bash
kubectl get pods -o wide
```

# **Quick Revision**

- **Image** → Package used to create a container.
- **Registry** → Stores container images.
- **Container Runtime** → Runs containers.
- **Pod** → Smallest Kubernetes deployable unit.
- **Single-container Pod** → Most common Pod design.
- **Multi-container Pod** → Multiple closely related containers.
- **Pod IP** → Network IP shared by containers in the Pod.
- **Volume** → Provides shared storage.
- **Pending** → Pod is waiting to run.
- **Running** → Pod is running.
- **Succeeded** → Pod completed successfully.
- **Failed** → Pod completed with failure.
- **Waiting** → Container has not started running.
- **Running** → Container is active.
- **Terminated** → Container has stopped.
- **Liveness** → Checks if application is alive.
- **Readiness** → Checks if application can receive traffic.
- **Startup** → Checks if application has started.
- **Request** → Resource amount the container needs.
- **Limit** → Maximum resource amount the container can use.
- **QoS** → Kubernetes classification based on resource settings.

## **SECTION 04 — Workloads, Deployments & Application Management**

### 

## **1. Kubernetes Workloads**

- **Workloads** are Kubernetes resources used to run applications and tasks.
- Common workload resources:
  - Deployment
  - StatefulSet
  - DaemonSet
  - Job
  - CronJob
- They help Kubernetes manage Pods automatically.

# **2. ReplicaSet**

- A **ReplicaSet** maintains a specific number of identical Pods.
- If a Pod fails, ReplicaSet creates a replacement.
- Mainly used indirectly through Deployments.

## **Desired Replicas**

- **Desired replicas** = number of Pods you want running.

### **Example**

Desired replicas = 3

Pod 1

Pod 2

Pod 3

## **Maintaining Pod Count**

- ReplicaSet continuously checks the number of Pods.
- If a Pod is deleted or fails, it creates another one.

Wanted: 3 Pods

    Running: 2 Pods
    ↓
    ReplicaSet
    ↓
    Creates 1 Pod

## **ReplicaSet vs Pod**

### **Pod**

- Runs the application container(s).
- Represents one instance of an application.

### **ReplicaSet**

- Manages multiple identical Pods.
- Maintains the desired Pod count.

### **Easy Memory**

- **Pod = Application instance**
- **ReplicaSet = Maintains Pod count**

# **3. Deployment**

- A **Deployment** manages application releases.
- It normally manages ReplicaSets.
- ReplicaSets manage Pods.
- Deployments provide:
  - Scaling
  - Rolling updates
  - Rollbacks
  - Revision history

## **Deployment → ReplicaSet → Pod**

    Deployment
    ↓
    ReplicaSet
    ↓
    Pods
    ↓
    Containers

- Deployment controls the ReplicaSet.
- ReplicaSet maintains the Pods.
- Pods run the application.

# **4. Desired State**

- You define how you want the application to run.
- Kubernetes works to maintain that state.

### **Example**

replicas: 3

- Desired state = 3 Pods.
- Kubernetes tries to keep 3 Pods running.

# **5. Rolling Updates**

- A **Rolling Update** gradually replaces old Pods with new Pods.
- Used when deploying a new application version.
- Helps avoid complete application downtime.

### **Example**

Version 1

Pod 1

Pod 2

Pod 3

↓ Update

Version 2

Pod 1 → New

Pod 2 → New

Pod 3 → New

# **6. Rollbacks**

- A **rollback** returns an application to an earlier version.
- Useful when a new deployment has problems.

### **Example**

    Version 1
    ↓
    Version 2
    ↓
    Problem
    ↓
    Rollback
    ↓
    Version 1

# **7. Revision History**

- Kubernetes Deployments maintain revision information.
- Each Deployment update can create a new revision.
- Revision history allows you to inspect or roll back to previous versions.

### **Commands**

``` bash
kubectl rollout history deployment <deployment-name>
```

# **8. Deployment Strategies**

## **RollingUpdate**

- Default Deployment strategy.
- Gradually replaces old Pods with new Pods.
- Designed to keep the application available during updates.

## **Recreate**

- Stops the old Pods first.
- Then creates new Pods.


    Old Pods
    ↓
    Stop
    ↓
    New Pods

- Can cause downtime during the update.

## **Canary**

- Releases a new version to a small portion of users or traffic first.
- If the new version works correctly, the rollout can be expanded.


    Users
    ↓
    Mostly Version 1

Small amount → Version 2

- Canary deployments usually require additional routing or deployment tooling; they are not a standard Deployment strategy field like `RollingUpdate` and `Recreate`.

## **Blue/Green**

- Two application environments are maintained:
  - **Blue** → Current version
  - **Green** → New version
- Traffic is switched from Blue to Green after the new version is ready.


    Users
    ↓
    Blue → Current

Green → New

- Blue/Green usually requires Services or other traffic-routing mechanisms.

# **9. StatefulSet**

- A **StatefulSet** manages stateful applications.
- Useful when Pods need stable:
  - Names
  - Network identities
  - Storage
  - Ordering

### **Examples**

- Databases
- Distributed storage systems

## **Stateful vs Stateless Applications**

### **Stateless**

- Does not depend on data stored inside a particular Pod.
- Pods can usually be replaced easily.
- Example:
  - Web server

### **Stateful**

- Maintains or depends on persistent data/state.
- Pods often need stable identity and storage.
- Example:
  - Database

## **Stable Network Identity**

- StatefulSet Pods have stable names.
- Example:

database-0

database-1

database-2

- The identity remains associated with the Pod ordinal.

## **Stable Storage**

- StatefulSet can use persistent storage for individual Pods.
- Storage can remain available when a Pod is recreated.

## **Ordered Deployment**

- StatefulSet can create Pods in order.


    database-0
    ↓
    database-1
    ↓
    database-2

## **Ordered Termination**

- StatefulSet can terminate Pods in reverse order.


    database-2
    ↓
    database-1
    ↓
    database-0

# **10. DaemonSet**

- A **DaemonSet** ensures a Pod runs on each eligible Node.
- When a new eligible Node joins, the DaemonSet can create a Pod there.

### **Simple Example**

Node 1 → Agent

Node 2 → Agent

Node 3 → Agent

## **One Pod per Node**

- Common DaemonSet use case.
- Usually one instance of a particular agent runs on each Node.

## **Logging Agents**

- DaemonSets are commonly used for log collection.
- Example:
  - Log collector on every Node.

Node → Logging Agent

Node → Logging Agent

Node → Logging Agent

## **Monitoring Agents**

- Monitoring agents can run on every Node.
- They collect metrics about:
  - CPU
  - Memory
  - Disk
  - Node health

## **Networking Agents**

- Networking components can be deployed using DaemonSets.
- They help provide networking functionality on Nodes.

# **11. Jobs**

- A **Job** runs a task that should eventually finish.
- Unlike a Deployment, it is designed for **completion**, not continuously running Pods.

### **Examples**

- Database migration
- Data processing
- Backup task

## **One-Time Workloads**

- A Job can run a task once and finish.


    Job
    ↓
    Pod
    ↓
    Task
    ↓
    Completed

## **Job Completion**

- Job tracks successful completion.
- It can create replacement Pods if a Pod fails, according to its configuration.
- A Job is considered complete when the required number of successful completions is reached.

## **Parallel Jobs**

- A Job can run multiple Pods in parallel.
- Useful for processing multiple independent tasks.

Job

├── Pod 1

├── Pod 2

└── Pod 3

# **12. CronJobs**

- A **CronJob** creates Jobs on a schedule.
- Useful for repeated tasks.

### **Examples**

- Daily backup
- Scheduled report
- Cleanup task


    CronJob
    ↓
    Job
    ↓
    Pod
    ↓
    Task

## **Scheduled Workloads**

- CronJob uses a schedule to determine when to create Jobs.
- It is similar to the Linux `cron` scheduler.

## **Cron Syntax**

Cron uses five main fields:

\* \* \* \* \*

│ │ │ │ │

│ │ │ │ └── Day of week

│ │ │ └──── Month

│ │ └────── Day of month

│ └──────── Hour

└────────── Minute

### **Example**

0 2 \* \* \*

- Runs every day at **2:00 AM**.

## **Job History**

- CronJobs can keep a history of completed and failed Jobs.
- The number of stored Jobs can be configured.

### **Useful Settings**

- `successfulJobsHistoryLimit`
- `failedJobsHistoryLimit`

## **Cleanup**

- Old Jobs can be automatically cleaned up.
- CronJob history limits help prevent unnecessary accumulation of completed Jobs.

# **13. Namespaces**

- A **Namespace** logically separates resources inside a Kubernetes cluster.
- Useful for organizing applications and teams.

### **Example**

Cluster

├── development

├── testing

└── production

## **Namespace Isolation**

- Namespaces provide logical separation.
- Resources can be scoped to a Namespace.
- Network and security isolation may require additional Kubernetes features such as NetworkPolicies and RBAC.

## **Resource Organization**

- Namespaces help organize:
  - Pods
  - Deployments
  - Services
  - ConfigMaps
  - Secrets
  - Jobs

### **Example**

development

├── Frontend

├── Backend

└── Database

production

├── Frontend

├── Backend

└── Database

# **14. Workload Management Commands**

## **Create a Deployment**

``` bash
kubectl create deployment nginx --image=nginx
```

## **View Deployments**

``` bash
kubectl get deployments
```

## **Scale a Deployment**

``` bash
kubectl scale deployment nginx --replicas=3
```

## **Update an Image**

``` bash
kubectl set image deployment/nginx nginx=nginx:latest
```

## **Check Rollout**

``` bash
kubectl rollout status deployment/nginx
```

## **View Rollout History**

``` bash
kubectl rollout history deployment/nginx
```

## **Rollback**

``` bash
kubectl rollout undo deployment/nginx
```

## **View ReplicaSets**

``` bash
kubectl get replicasets
```

## **View StatefulSets**

``` bash
kubectl get statefulsets
```

## **View DaemonSets**

``` bash
kubectl get daemonsets
```

## **View Jobs**

``` bash
kubectl get jobs
```

## **View CronJobs**

``` bash
kubectl get cronjobs
```

## **View Namespaces**

``` bash
kubectl get namespaces
```

## **Create a Namespace**

``` bash
kubectl create namespace development
```

## **Work Inside a Namespace**

``` bash
kubectl get pods -n development
```

# **Quick Revision**

- **Workload** → Kubernetes resource that manages application Pods/tasks.
- **ReplicaSet** → Maintains the desired number of Pods.
- **Deployment** → Manages application releases and ReplicaSets.
- **RollingUpdate** → Gradually updates Pods.
- **Rollback** → Returns to an earlier Deployment revision.
- **StatefulSet** → Manages stateful applications.
- **DaemonSet** → Runs a Pod on each eligible Node.
- **Job** → Runs a task until it completes.
- **CronJob** → Runs Jobs on a schedule.
- **Namespace** → Organizes and logically separates resources.
- **Stateless** → Application does not depend on local Pod state.
- **Stateful** → Application needs persistent state/identity.
- **Canary** → Gradual release to a small portion of traffic/users.
- **Blue/Green** → Separate old and new environments with traffic switched between them.

## **SECTION 05 — Kubernetes Networking**

### 

## **1. Kubernetes Networking Overview**

- Kubernetes networking allows:
  - Pods to communicate with Pods.
  - Pods to communicate with Services.
  - Users to access applications.
  - Applications to communicate with external systems.
- Kubernetes networking mainly involves **Pods, Services, DNS, Ingress, NetworkPolicy, and CNI**.

# **2. Pod Networking**

- Every Pod normally gets its own IP address.
- Pods can communicate with other Pods over the cluster network.
- Pod IPs are usually temporary and can change when Pods are recreated.

## **Pod IP**

- IP address assigned to a Pod.
- Used for communication between Pods.
- Should generally **not** be used as a permanent application endpoint.

### **Example**

Pod A: 10.0.1.10

Pod B: 10.0.2.20

Pod A → Pod B

## **Node IP**

- IP address of a Kubernetes Node.
- Used to communicate with the Node itself.
- A Node can have an internal and sometimes an external IP.

## **Cluster IP**

- A **ClusterIP** is a stable virtual IP assigned to a Kubernetes Service.
- It provides a stable endpoint for accessing Pods.

Service

    ClusterIP: 10.96.10.20
    ↓
    Pods

# **3. Container Networking**

- Containers inside the same Pod share the Pod's network namespace.
- They can communicate using `localhost`.
- Containers in different Pods communicate using Pod networking.

Same Pod:

Container A → localhost → Container B

Different Pods:

Pod A → Pod Network → Pod B

# **4. Kubernetes Network Model**

Kubernetes follows some basic networking principles:

- Every Pod gets its own IP.
- Pods can communicate with other Pods without requiring Network Address Translation between them in the normal cluster network model.
- Nodes can communicate with Pods.
- Containers inside the same Pod share the Pod's network namespace.

# **5. Kubernetes Services**

## **What is a Service?**

- A **Service** provides a stable network endpoint for a group of Pods.
- It uses labels/selectors to identify the Pods it should send traffic to.
- It can distribute traffic across available backend Pods.

## **Why Pods Need Services**

- Pods are temporary.
- Pod IP addresses can change.
- A Service provides a stable way to access the application.

Pod 1: 10.0.0.5

Pod 2: 10.0.0.8

    Pod 3: 10.0.0.12
    ↓
    Service
    ↓
    Stable Endpoint

## **Service Discovery**

- Kubernetes allows applications to find Services.
- Services can be discovered using:
  - DNS
  - Environment variables

## **Stable IP**

- A Service can provide a stable **ClusterIP**.
- Pods behind the Service can change without changing the Service endpoint.

## **Stable DNS Name**

- Kubernetes DNS provides a stable DNS name for Services.

### **Example**

backend.default.svc.cluster.local

- Applications can use the Service name instead of a Pod IP.

# **6. Service Types**

## **ClusterIP**

- Default Service type.
- Accessible from inside the cluster.
- Used for internal communication.

Frontend → ClusterIP Service → Backend Pods

## **NodePort**

- Exposes a Service on a port of each Node.
- Can allow external clients to reach the Service through a Node IP and NodePort.


    External User
    ↓
    Node IP:NodePort
    ↓
    Service
    ↓
    Pods

## **LoadBalancer**

- Exposes a Service through an external load balancer.
- Commonly used with cloud providers.
- The cloud provider usually provisions the external load balancer.


    Internet
    ↓
    Load Balancer
    ↓
    Service
    ↓
    Pods

## **ExternalName**

- Maps a Kubernetes Service name to an external DNS name.
- Does not create a normal proxying Service.

### **Example**

    my-database
    ↓
    database.example.com

# **7. Kubernetes DNS**

- Kubernetes provides DNS-based service discovery.
- DNS allows applications to find Services using names instead of IP addresses.
- **CoreDNS** is commonly used to provide cluster DNS.

## **Service DNS**

- Every normal Kubernetes Service can have a DNS record.
- Common format:

service.namespace.svc.cluster.local

### **Example**

backend.production.svc.cluster.local

## **Pod DNS**

- Pods can also have DNS records depending on the cluster's DNS configuration and Pod settings.
- Direct Pod DNS is less commonly used for normal application communication than Service DNS.

## **CoreDNS**

- **CoreDNS** provides DNS services inside a Kubernetes cluster.
- It resolves Kubernetes Service names.
- It runs as Pods in the cluster.


    Application
    ↓
    CoreDNS
    ↓
    Service IP

# **8. Environment-Based Service Discovery**

- Kubernetes can provide Service information through environment variables inside Pods.
- When a Pod starts, Kubernetes can add variables for Services available at that time.
- This approach is less flexible than DNS for many modern applications.

# **9. DNS-Based Service Discovery**

- Applications can use Service names instead of IP addresses.
- DNS automatically resolves the Service name.

### **Example**

    Frontend
    ↓
    backend
    ↓
    Backend Service
    ↓
    Backend Pods

- DNS is commonly preferred for Service discovery.

# **10. Ingress**

- **Ingress** manages external HTTP/HTTPS access to applications.
- It can route traffic to different Services.
- Ingress requires an **Ingress Controller** to implement the routing.


    Internet
    ↓
    Ingress
    ↓
    Services
    ↓
    Pods

## **Why Use Ingress?**

- Provides one entry point for multiple applications.
- Supports:
  - Host-based routing
  - Path-based routing
  - TLS/HTTPS
- Reduces the need for separate external endpoints for every application.

## **Ingress Rules**

- Ingress rules define how incoming traffic should be routed.
- Rules can use:
  - Host
  - Path
  - Backend Service

## **Host-Based Routing**

- Routes traffic based on the domain name.


    app.example.com
    ↓
    Frontend Service
    api.example.com
    ↓
    Backend Service

## **Path-Based Routing**

- Routes traffic based on the URL path.


    example.com/
    ↓
    Frontend
    example.com/api
    ↓
    Backend

## **TLS**

- TLS provides encrypted HTTPS communication.
- Ingress can terminate TLS and forward traffic to Services.
- TLS certificates are commonly configured through Kubernetes Secrets.

## **Ingress Controller**

- The Ingress resource defines **what routing is wanted**.
- The Ingress Controller actually **implements the routing**.
- Examples include controllers based on:
  - NGINX
  - HAProxy
  - Traefik
  - Cloud-provider load balancers

# **11. Gateway API**

- **Gateway API** is a newer Kubernetes networking API for expressing traffic routing.
- It provides more flexible and structured routing than traditional Ingress.
- It uses resources such as:
  - GatewayClass
  - Gateway
  - HTTPRoute

## **Gateway**

- Represents a network entry point.
- Defines how traffic enters the cluster.


    Internet
    ↓
    Gateway
    ↓
    HTTPRoute
    ↓
    Service

## **GatewayClass**

- Defines the controller that implements a Gateway.
- Similar to selecting which Gateway implementation should manage the Gateway.

## **HTTPRoute**

- Defines HTTP routing rules.
- Can route traffic based on:
  - Hostnames
  - Paths
  - Headers
- It connects incoming traffic to backend Services.

# **12. NetworkPolicy**

- **NetworkPolicy** controls network traffic between Pods and/or external destinations.
- It can control:
  - **Ingress** → incoming traffic
  - **Egress** → outgoing traffic
- NetworkPolicy requires a networking implementation/CNI that supports it.

## **Ingress Traffic**

- Traffic **coming into** a Pod.


    Frontend
    ↓
    Ingress Traffic
    ↓
    Backend Pod

## **Egress Traffic**

- Traffic **leaving** a Pod.


    Backend Pod
    ↓
    Egress Traffic
    ↓
    Database

## **Allow/Deny Rules**

- NetworkPolicy can define which traffic is allowed.
- Once policies select a Pod for a direction, the relevant traffic is restricted to what the policies allow.
- Policies are generally **additive**; there is no separate "deny" rule syntax.

### **Simple Idea**

Allowed → Traffic can pass

Not allowed → Traffic is blocked

## **Namespace Selectors**

- Select Pods based on their Namespace labels.
- Useful for allowing communication between applications in different Namespaces.


    Production Namespace
    ↓
    NetworkPolicy
    ↓
    Backend Namespace

## **Pod Selectors**

- Select specific Pods using labels.
- Example:


    podSelector:
    matchLabels:
    app: backend

- This can be used to define which Pods are allowed to communicate.

# **13. CNI**

### **Container Network Interface**

- **CNI** is a standard used for configuring container networking.
- Kubernetes uses CNI-compatible plugins to provide Pod networking.
- CNI plugins can provide:
  - Pod IP addresses
  - Network connectivity
  - Network policies, depending on the plugin

## **CNI Plugins**

Examples include:

- Calico
- Cilium
- Flannel
- Amazon VPC CNI

## **Pod Networking Implementation**

A simplified process:

    Pod Created
    ↓
    kubelet
    ↓
    CNI Plugin
    ↓
    Network Interface + IP
    ↓
    Pod Network

- The CNI plugin configures networking when a Pod is created.

# **14. External User → Load Balancer → Ingress → Service → Pod**

This is a common application traffic flow.

    External User
    ↓
    Load Balancer
    ↓
    Ingress Controller
    ↓
    Service
    ↓
    Pod
    ↓
    Container

### **Example**

    User
    ↓
    AWS Load Balancer
    ↓
    Ingress Controller
    ↓
    Frontend Service
    ↓
    Frontend Pod

- **Load Balancer** → Receives external traffic.
- **Ingress** → Determines where HTTP/HTTPS traffic should go.
- **Service** → Provides a stable endpoint and selects backend Pods.
- **Pod** → Runs the application.

# **15. Networking Commands**

## **View Services**

``` bash
kubectl get services
```

## **View Services with More Details**

``` bash
kubectl get svc -o wide
```

## **Describe a Service**

``` bash
kubectl describe service <service-name>
```

## **View Endpoints**

``` bash
kubectl get endpoints
```

## **View EndpointSlices**

``` bash
kubectl get endpointslices
```

## **View Ingress**

``` bash
kubectl get ingress
```

## **Describe Ingress**

``` bash
kubectl describe ingress <ingress-name>
```

## **View NetworkPolicies**

``` bash
kubectl get networkpolicies
```

## **View Pods and Their IPs**

``` bash
kubectl get pods -o wide
```

## **Test DNS from a Pod**

``` bash
kubectl exec -it <pod-name> -- nslookup <service-name>
```

## **Test Connectivity**

``` bash
kubectl exec -it <pod-name> -- curl http://<service-name>
```

# **Quick Revision**

- **Pod IP** → IP address of a Pod.
- **Node IP** → IP address of a Kubernetes Node.
- **ClusterIP** → Stable internal IP of a Service.
- **Service** → Stable endpoint for Pods.
- **ClusterIP** → Internal Service.
- **NodePort** → Exposes Service through a Node port.
- **LoadBalancer** → Provides an external load balancer.
- **ExternalName** → Maps a Service name to an external DNS name.
- **CoreDNS** → Provides Kubernetes DNS.
- **Ingress** → HTTP/HTTPS routing into the cluster.
- **Ingress Controller** → Implements Ingress rules.
- **Gateway API** → Modern Kubernetes API for traffic routing.
- **Gateway** → Entry point for network traffic.
- **HTTPRoute** → Defines HTTP routing rules.
- **NetworkPolicy** → Controls Pod network traffic.
- **CNI** → Provides Pod networking.
- **Ingress** → Incoming traffic.
- **Egress** → Outgoing traffic.
- **Service DNS** → Allows applications to find Services by name.

## **SECTION 06 — Kubernetes Storage & Stateful Applications**

### 

## **1. Kubernetes Storage Overview**

- Kubernetes provides different ways to store application data.
- Storage can be:
  - Temporary
  - Persistent
- **Ephemeral storage** is temporary.
- **Persistent storage** survives Pod/container replacement.

# **2. Ephemeral Storage**

- Ephemeral storage exists only for the lifetime of a container or Pod.
- Data can be lost when the Pod is removed.
- Useful for temporary files and cache.

### **Simple Idea**

    Pod Created
    ↓
    Temporary Data
    ↓
    Pod Deleted
    ↓
    Data Lost

## **Container Filesystem**

- Every container has its own writable filesystem layer.
- Data written there is normally temporary.
- When the container is recreated, the data can disappear.

## **Pod Lifecycle and Data**

- Pods are temporary objects.
- A Pod can be deleted and recreated.
- Data stored only inside the container filesystem should **not** be treated as permanent storage.

# **3. emptyDir**

- `emptyDir` is a temporary Kubernetes volume.
- It is created when a Pod starts.
- Containers in the same Pod can share it.
- It is deleted when the Pod is removed.

### **Example**

Pod

├── Container A

├── Container B

    └── emptyDir
    ↑
    Shared Data

### **Common Uses**

- Temporary files
- Cache
- Sharing data between containers in the same Pod

# **4. Kubernetes Volumes**

## **Volume Concept**

- A **Volume** provides storage that can be mounted inside a container.
- Multiple containers in the same Pod can use a shared Volume.
- Different Volume types have different lifecycles and capabilities.

## **Volume Lifecycle**

- The lifecycle of storage depends on the Volume type.
- Some Volumes are temporary.
- Persistent storage can survive Pod deletion.

### **Simple Difference**

emptyDir → Temporary

PVC/PV → Persistent

## **Common Volume Types**

Examples include:

- `emptyDir`
- `configMap`
- `secret`
- PersistentVolume-backed storage
- CSI-backed storage

# **5. Persistent Storage**

- **Persistent storage** keeps data beyond the life of an individual Pod.
- Important for applications such as:
  - Databases
  - File storage
  - Stateful applications


    Pod
    ↓
    Persistent Storage
    ↓
    Data remains

# **6. PersistentVolume**

### **PV**

- **PersistentVolume (PV)** is a Kubernetes resource representing persistent storage.
- It can represent storage provided by:
  - Cloud providers
  - Storage systems
  - Local infrastructure
- PVs can be statically created or dynamically provisioned.

# **7. PersistentVolumeClaim**

### **PVC**

- **PersistentVolumeClaim (PVC)** is a request for storage.
- A Pod uses the PVC to request storage.
- The PVC can be bound to a suitable PV.

### **Simple Idea**

    Pod
    ↓
    PVC
    ↓
    PV
    ↓
    Storage

### **Example**

- Application requests **10 GiB**.
- PVC requests 10 GiB.
- Kubernetes finds/provisions suitable storage.

# **8. StorageClass**

- A **StorageClass** describes a type or class of storage.
- It tells Kubernetes how storage should be dynamically created.
- Different StorageClasses can represent different performance or storage backends.

### **Example**

    StorageClass
    ↓
    Storage Provisioner
    ↓
    Storage

# **9. Pod → PVC → PV → Storage**

This is an important Kubernetes storage flow.

    Application Pod
    ↓
    PVC
    ↓
    PV
    ↓
    Physical/Cloud Storage

### **Remember**

- **Pod** → Uses storage.
- **PVC** → Requests storage.
- **PV** → Represents allocated storage.
- **Storage** → Actual storage system.

# **10. Dynamic Provisioning**

- Dynamic provisioning automatically creates storage when a PVC requests it.
- Usually uses a StorageClass.

### **Flow**

    PVC Created
    ↓
    StorageClass
    ↓
    Provisioner
    ↓
    Storage Created
    ↓
    PVC Bound

- This avoids manually creating every PV.

## **Storage Provisioner**

- A **provisioner** creates storage requested through a StorageClass.
- Modern Kubernetes commonly uses **CSI drivers** for external storage systems.

## **Default StorageClass**

- A cluster can have a default StorageClass.
- If a PVC does not specify a `storageClassName`, Kubernetes can use the default StorageClass.
- Only one default StorageClass should normally be configured for predictable behavior.

# **11. Access Modes**

Access modes describe how a volume can be mounted.

## **ReadWriteOnce**

### **RWO**

- Volume can be mounted as **read-write by one Node**.
- Multiple Pods on that same Node may be able to use it, depending on the storage implementation.

## **ReadOnlyMany**

### **ROX**

- Volume can be mounted as **read-only by multiple Nodes**.

## **ReadWriteMany**

### **RWX**

- Volume can be mounted as **read-write by multiple Nodes**.
- Requires a storage backend that supports this capability.

## **ReadWriteOncePod**

### **RWOP**

- Volume can be mounted as **read-write by only one Pod** across the cluster.
- Requires CSI support for this access mode.

### **Easy Memory**

RWO → Read/Write → One Node

ROX → Read Only → Many Nodes

RWX → Read/Write → Many Nodes

RWOP → Read/Write → One Pod

# **12. Stateful Applications**

- A **stateful application** needs persistent data or a stable identity.
- Examples:
  - Databases
  - Message queues
  - Distributed storage systems

### **Example**

    Database Pod
    ↓
    Persistent Storage
    ↓
    Database Data

## **Databases on Kubernetes**

- Databases can run on Kubernetes using persistent storage.
- Storage must be designed carefully for:
  - Data durability
  - Performance
  - Backups
  - Recovery
- Kubernetes does not automatically make a database highly available just because it runs in a cluster.

# **13. StatefulSet + Storage**

- StatefulSet is commonly used for stateful applications.
- Each Pod can have its own persistent storage.
- Pods receive stable identities.

StatefulSet

├── database-0 → PVC → Storage

├── database-1 → PVC → Storage

└── database-2 → PVC → Storage

## **Stable Identity**

- StatefulSet Pods have stable names.
- Example:

database-0

database-1

database-2

- This is useful for distributed and stateful applications.

## **Persistent Storage**

- StatefulSet can create individual PVCs for its Pods using `volumeClaimTemplates`.
- This allows each Pod to have its own persistent storage.

# **14. Container Storage Interface — CSI**

### **CSI**

- **Container Storage Interface** is a standard interface for connecting Kubernetes with storage systems.
- CSI allows storage vendors to provide Kubernetes-compatible storage drivers.

### **Simple Flow**

    Kubernetes
    ↓
    CSI
    ↓
    CSI Driver
    ↓
    Storage System

# **15. CSI Drivers**

- CSI Drivers connect Kubernetes to specific storage platforms.
- They can provide capabilities such as:
  - Creating volumes
  - Attaching volumes
  - Mounting volumes
  - Detaching volumes
  - Deleting volumes

# **16. Cloud Storage Integration**

- Kubernetes can use cloud storage through CSI drivers.
- Cloud platforms provide their own storage services and CSI drivers.

### **Example**

    Kubernetes
    ↓
    CSI Driver
    ↓
    Cloud Storage

- This allows Pods to use cloud-backed persistent storage.

# **17. StatefulSet + PVC**

A common pattern is:

    StatefulSet
    ↓
    Pod
    ↓
    PVC
    ↓
    PV
    ↓
    Cloud/Physical Storage

### **Example**

    database-0
    ↓
    database-0 PVC
    ↓
    database-0 PV
    ↓
    Persistent Disk

- When the Pod is recreated, its storage can be reattached according to the storage system and configuration.

# **18. Database + Persistent Storage**

### **Without Persistent Storage**

    Database Pod
    ↓
    Container Filesystem
    ↓
    Pod Deleted
    ↓
    Data Lost

### **With Persistent Storage**

    Database Pod
    ↓
    PVC
    ↓
    Persistent Storage
    ↓
    Pod Recreated
    ↓
    Data Can Remain

- Persistent storage protects data from normal Pod replacement.
- **Backups are still required** for disaster recovery.

# **19. Kubernetes + Cloud Block Storage**

- Cloud block storage provides disk-like storage.
- Kubernetes can attach it to Pods through CSI.
- Often used for:
  - Databases
  - Stateful applications
  - Persistent application data

### **Example**

    Pod
    ↓
    PVC
    ↓
    CSI Driver
    ↓
    Cloud Block Storage

# **20. Kubernetes + Object Storage**

- Object storage is different from block storage.
- Examples:
  - AWS S3
  - Azure Blob Storage
  - Google Cloud Storage

### **Common Uses**

- Images
- Videos
- Backups
- Logs
- Documents
- Large files

### **Important**

- Object storage is **not normally mounted as a standard Kubernetes filesystem** in the same way as a block volume.
- Applications commonly access object storage through its API/SDK.


    Application
    ↓
    Object Storage API
    ↓
    S3 / Blob / Cloud Storage

# **21. Storage Management Commands**

## **View PersistentVolumes**

``` bash
kubectl get pv
```

## **View PersistentVolumeClaims**

``` bash
kubectl get pvc
```

## **View StorageClasses**

``` bash
kubectl get storageclass
```

## **Describe a PV**

``` bash
kubectl describe pv <pv-name>
```

## **Describe a PVC**

``` bash
kubectl describe pvc <pvc-name>
```

## **View StatefulSets**

``` bash
kubectl get statefulsets
```

## **View Pod Storage Information**

``` bash
kubectl describe pod <pod-name>
```

## **View Volumes in a Pod**

``` bash
kubectl get pod <pod-name> -o yaml
```

# **Quick Revision**

- **Ephemeral Storage** → Temporary data.
- **Container Filesystem** → Temporary writable container storage.
- **emptyDir** → Temporary shared storage for containers in a Pod.
- **Volume** → Storage mounted into containers.
- **PV** → Represents persistent storage.
- **PVC** → Requests persistent storage.
- **StorageClass** → Defines/provisions a class of storage.
- **Dynamic Provisioning** → Automatically creates storage for PVCs.
- **RWO** → Read/write from one Node.
- **ROX** → Read-only from many Nodes.
- **RWX** → Read/write from many Nodes.
- **RWOP** → Read/write from one Pod.
- **StatefulSet** → Manages stateful applications.
- **CSI** → Standard interface between Kubernetes and storage systems.
- **CSI Driver** → Connects Kubernetes to a specific storage system.
- **Block Storage** → Disk-like persistent storage.
- **Object Storage** → Stores files/objects through an API.
- **PVC Flow** → `Pod → PVC → PV → Storage`.

## **SECTION 07 — Configuration, ConfigMaps & Secrets**

### 

## **1. Kubernetes Configuration**

- Configuration controls how an application behaves.
- Kubernetes lets you keep configuration **separate from application code**.
- Common tools:
  - Environment Variables
  - ConfigMaps
  - Secrets
  - Configuration Files

# **2. Application Configuration**

- Configuration contains values that can change between environments.
- Examples:
  - Application mode
  - Database hostname
  - Port number
  - Log level
  - Feature settings

### **Example**

Development → DEBUG=true

Production → DEBUG=false

# **3. Environment Variables**

- Environment variables are values passed to a container.
- Applications can read them at runtime.

### **Example**

    APP_ENV=production
    APP_PORT=8080

- Useful for simple configuration values.

# **4. Configuration Files**

- Applications can also read configuration from files.
- Kubernetes can provide these files using:
  - ConfigMaps
  - Secrets
  - Volumes

### **Example**

    Pod
    ↓
    /etc/app/config.yaml
    ↓
    Application

# **5. Declarative Configuration**

- Kubernetes configuration is usually written declaratively.
- You describe **what you want** using YAML or JSON.
- Kubernetes creates and maintains the resources.

### **Example**

replicas: 3

- Means: "I want 3 replicas."

# **6. ConfigMap**

## **What is ConfigMap?**

- A **ConfigMap** stores non-sensitive configuration data.
- It keeps configuration separate from application images.
- ConfigMaps store simple key/value data or configuration files.

### **Examples**

- Application settings
- URLs
- Port numbers
- Environment names
- Feature flags

## **Key/Value Configuration**

A ConfigMap can store values like:

    APP_ENV=production
    APP_PORT=8080
    LOG_LEVEL=info

## **ConfigMap as Environment Variables**

- ConfigMap values can be provided to containers as environment variables.


    ConfigMap
    ↓
    Environment Variables
    ↓
    Container

## **ConfigMap as Configuration Files**

- ConfigMap data can also be mounted as files.


    ConfigMap
    ↓
    Volume Mount
    ↓
    /etc/app/config.yaml

## **ConfigMap Volume Mounts**

- Kubernetes can mount ConfigMap data into a Pod as files.
- Each key can become a file.

### **Example**

ConfigMap

├── app.conf

    └── settings.conf
    ↓
    Pod

└── /etc/app/

├── app.conf

└── settings.conf

# **7. Kubernetes Secrets**

## **What is Secret?**

- A **Secret** stores sensitive data.
- Examples:
  - Passwords
  - API keys
  - Tokens
  - Certificates
- Secrets help keep sensitive configuration separate from application code.

> **Important:** Kubernetes Secrets are not automatically equivalent to encrypted passwords. Base64 encoding alone is not encryption.

## **Passwords**

- Database passwords can be stored in Secrets.
- Applications can access them through environment variables or mounted files.

## **API Keys**

- API keys can be stored in Secrets instead of putting them directly in application code.

## **Tokens**

- Authentication tokens can be stored as Secret data.
- Access should be restricted using Kubernetes permissions.

## **Certificates**

- TLS certificates and private keys can be stored in Secrets.
- Kubernetes provides a dedicated TLS Secret type.

# **8. Secret Types**

## **Opaque**

- Default/general-purpose Secret type.
- Used for arbitrary sensitive data.

type: Opaque

## **Docker Registry Credentials**

- Used to store credentials needed to authenticate to a private container registry.
- Common type:

kubernetes.io/dockerconfigjson

- Pods can use these credentials when pulling private images.

## **TLS**

- Used to store TLS certificate and private key data.

kubernetes.io/tls

- Commonly used with Ingress for HTTPS.

## **Service Account Token Concepts**

- Service Accounts provide an identity for applications running inside Pods.
- Kubernetes can provide credentials/tokens that allow applications to communicate with the Kubernetes API.
- Modern Kubernetes commonly uses **short-lived, automatically managed tokens** rather than manually created long-lived ServiceAccount token Secrets.

# **9. Using Secrets**

## **Secrets as Environment Variables**

- Secret values can be exposed to a container as environment variables.


    Secret
    ↓
    Environment Variable
    ↓
    Application

### **Example**

    DB_PASSWORD=********

## **Secrets as Volume Mounts**

- Secret data can be mounted into a Pod as files.


    Secret
    ↓
    Volume
    ↓
    /etc/secrets/
    ↓
    Application

- Useful when an application expects credentials or certificates as files.

# **10. Base64 vs Encryption**

## **Base64**

- Base64 is an **encoding**, not encryption.
- It does not protect secret information by itself.
- Base64 data can easily be decoded.

### **Example**

    Password
    ↓
    Base64 Encoding
    ↓
    Encoded Text

## **Encryption**

- Encryption transforms data so it cannot easily be read without the required key.
- Kubernetes can be configured to encrypt sensitive data **at rest** in etcd.

### **Remember**

Base64 → Encoding

Encryption → Protection

# **11. Encryption at Rest**

- Kubernetes can encrypt sensitive resources when stored in etcd.
- This helps protect Secret data if the underlying etcd data is accessed.
- Encryption at rest must be properly configured by the cluster administrator.

# **12. RBAC and Secret Access**

- **RBAC = Role-Based Access Control**.
- RBAC controls who can access Kubernetes resources.
- Secret access should be restricted to only the users, groups, or ServiceAccounts that need it.

### **Simple Idea**

    User / Pod
    ↓
    RBAC
    ↓
    Can access Secret?

# **13. External Secret Management**

- Sensitive credentials can also be stored outside Kubernetes.
- External secret-management systems can provide secrets to Kubernetes workloads.

### **Examples**

- AWS Secrets Manager
- Azure Key Vault
- Google Secret Manager
- HashiCorp Vault

### **Simple Flow**

    External Secret Store
    ↓
    Secret Integration
    ↓
    Kubernetes Pod
    ↓
    Application

- This can reduce the need to store long-lived secret values directly in Kubernetes manifests.

# **14. Resource Management**

- Kubernetes allows you to control how much CPU and memory a container requests and can use.
- Main settings:
  - Requests
  - Limits

## **CPU Requests**

- CPU request = CPU amount the container needs.
- Kubernetes Scheduler uses requests when choosing a Node.


    resources:
    requests:
    cpu: "250m"

- `250m` = 0.25 CPU.

## **CPU Limits**

- CPU limit = maximum CPU a container can use.
- CPU usage can be throttled when the limit is reached.


    resources:
    limits:
    cpu: "500m"

## **Memory Requests**

- Memory request = memory amount the container needs.
- Scheduler uses it when placing the Pod.


    resources:
    requests:
    memory: "256Mi"

## **Memory Limits**

- Memory limit = maximum memory a container can use.
- Exceeding the limit can result in the container being terminated, commonly with an `OOMKilled` status.


    resources:
    limits:
    memory: "512Mi"

# **15. ResourceQuota**

- **ResourceQuota** limits the total amount of resources that can be consumed in a Namespace.
- It can limit:
  - CPU
  - Memory
  - Number of Pods
  - Number of Services
  - Other resources

### **Simple Example**

    Namespace
    ↓
    ResourceQuota
    ↓
    Maximum Resources

# **16. LimitRange**

- **LimitRange** defines default or minimum/maximum resource settings for containers or Pods in a Namespace.
- It can:
  - Set default requests.
  - Set default limits.
  - Define minimum resources.
  - Define maximum resources.

### **Simple Difference**

ResourceQuota → Total Namespace limit

LimitRange → Individual resource rules/defaults

# **17. ConfigMap vs Secret**

## **ConfigMap**

- Used for **non-sensitive configuration**.
- Examples:
  - App settings
  - URLs
  - Log levels
  - Feature flags

## **Secret**

- Used for **sensitive configuration**.
- Examples:
  - Passwords
  - API keys
  - Tokens
  - TLS certificates

### **Easy Memory**

ConfigMap → Normal Configuration

Secret → Sensitive Configuration

# **Quick Revision**

- **Environment Variable** → Configuration passed to a container.
- **ConfigMap** → Stores non-sensitive configuration.
- **Secret** → Stores sensitive configuration.
- **Volume Mount** → Makes ConfigMap/Secret data available as files.
- **Base64** → Encoding, not encryption.
- **Encryption at Rest** → Protects stored data.
- **RBAC** → Controls access to Kubernetes resources.
- **External Secret Manager** → Stores/manages secrets outside Kubernetes.
- **CPU Request** → CPU needed by a container.
- **CPU Limit** → Maximum CPU allowed.
- **Memory Request** → Memory needed by a container.
- **Memory Limit** → Maximum memory allowed.
- **ResourceQuota** → Limits total resources in a Namespace.
- **LimitRange** → Sets resource rules/defaults for individual resources.

## **SECTION 08 — Kubernetes Security & Access Control**

### 

## **1. Kubernetes Security Overview**

- Kubernetes security protects:
  - Applications
  - Containers
  - Pods
  - Nodes
  - Cluster resources
  - APIs
  - Secrets
  - Network traffic
- Kubernetes security answers questions like:
  - Who can access the cluster?
  - What can they do?
  - Which resources can they access?
  - Which Pods can communicate with each other?
  - Can a container run with powerful privileges?
  - How are passwords and API keys protected?

### **Main Security Areas**

- Authentication
- Authorization
- Admission control
- Network security
- Pod security
- Secret security
- Container security
- Image security
- API security

## **2. Kubernetes Security Layers**

Kubernetes security can be understood as several layers:

- **Identity**
  - Who is making the request?
- **Authentication**
  - Is the identity valid?
- **Authorization**
  - Is the identity allowed to perform the requested action?
- **Admission**
  - Should the request be accepted, rejected, or modified?
- **Network Security**
  - Which Pods are allowed to communicate?
- **Pod Security**
  - What security settings can a Pod use?
- **Container Security**
  - What permissions does a container have?
- **Secret Security**
  - How are passwords, tokens, and keys protected?

### **Simple Flow**

    User
    ↓
    Authentication
    ↓
    Authorization
    ↓
    Admission
    ↓
    Kubernetes API
    ↓
    Resource

## **3. Authentication**

Authentication means:

> **"Who are you?"**

Kubernetes needs to identify the person, system, or workload making an API request.

### **Authentication Examples**

- Username/password
- Client certificates
- Bearer tokens
- ServiceAccount tokens
- External identity providers
- Cloud IAM integrations

### **Important**

Authentication does **not** decide what the user can do.

It only identifies the requester.

    Authentication
    ↓
    Who are you?

Authorization comes after authentication.

## **4. Authorization**

Authorization means:

> **"What are you allowed to do?"**

For example:

- Can the user create Pods?
- Can the user delete Deployments?
- Can the user read Secrets?
- Can the user modify Services?

Kubernetes commonly uses **RBAC** for authorization.

    Authentication
    ↓
    Who are you?
    ↓
    Authorization
    ↓
    What can you do?

## **5. Admission**

Admission happens after authentication and authorization.

Admission control can:

- Accept a request
- Reject a request
- Modify a request

It is commonly used to enforce security and policy rules.

Example:

    User creates Pod
    ↓
    Authentication
    ↓
    Authorization
    ↓
    Admission
    ↓
    Pod accepted or rejected

## **6. Network Security**

Network security controls communication between workloads.

For example:

    Frontend Pod
    ↓
    Backend Pod

You may want:

- Frontend → Backend = allowed
- Frontend → Database = denied
- Backend → Database = allowed

Kubernetes uses **NetworkPolicy** to control this type of traffic.

## **7. Pod Security**

Pod security controls what a Pod and its containers are allowed to do.

Examples:

- Can the container run as root?
- Can it access the host filesystem?
- Can it use privileged mode?
- Can it use host networking?
- Which Linux capabilities can it use?

The goal is to reduce the permissions available to workloads.

## **8. Secret Security**

Kubernetes Secrets can contain sensitive information such as:

- Passwords
- API keys
- Tokens
- TLS certificates
- Credentials

Security practices include:

- Restricting Secret access with RBAC
- Encrypting Secret data at rest
- Avoiding unnecessary Secret exposure
- Using external secret-management systems when appropriate
- Avoiding putting secrets directly into container images

### **Important**

Base64 is **not encryption**.

Base64

= Encoding

Encryption

= Protecting data using cryptographic techniques

## **9. Kubernetes Users**

A Kubernetes user represents a human or external identity accessing the cluster.

Examples:

- Developer
- Kubernetes administrator
- DevOps engineer
- CI/CD system

Kubernetes does not normally maintain a database of regular human users.

Instead, user identities are commonly provided through:

- Certificates
- Tokens
- External identity providers
- Cloud authentication systems

## **10. Service Accounts**

A **ServiceAccount** provides an identity for workloads running inside Kubernetes.

Instead of:

Human → Kubernetes API

a workload may use:

Pod → ServiceAccount → Kubernetes API

### **Example**

A monitoring application may need permission to read:

- Pods
- Nodes
- Services

The application can use a ServiceAccount with appropriate permissions.

## **11. Certificates**

Kubernetes uses TLS certificates to secure communication.

Certificates can be used for:

- API Server communication
- Client authentication
- Kubelet communication
- Internal cluster communication

### **Example**

``` bash
kubectl
```

↓ TLS

API Server

Certificates help provide:

- Encryption
- Authentication
- Trust

## **12. Tokens**

Tokens can be used to authenticate API requests.

A request may contain a bearer token:

Authorization: Bearer \<token\>

ServiceAccounts can use tokens to authenticate workloads.

### **Important**

Tokens should be:

- Protected
- Short-lived when possible
- Properly scoped
- Never unnecessarily exposed

Modern Kubernetes commonly uses automatically managed, short-lived ServiceAccount tokens rather than relying on manually created long-lived token Secrets.

## **13. External Identity Providers**

Organizations may connect Kubernetes authentication to an external identity provider.

Examples include:

- LDAP-based identity systems
- OIDC providers
- Cloud identity systems
- Enterprise identity platforms

This allows users to use existing organizational identities.

### **Basic Flow**

    User
    ↓
    Identity Provider
    ↓
    Kubernetes Authentication
    ↓
    RBAC
    ↓
    Kubernetes API

## **14. RBAC**

**RBAC = Role-Based Access Control**

RBAC controls what an identity can do in Kubernetes.

RBAC answers:

> Who → Can do what → On which resource?

### **Example**

A developer might be allowed to:

- Read Pods
- Read Services
- View Deployments

But not:

- Delete Namespaces
- Modify Secrets
- Change cluster-wide settings

## **15. Role**

A **Role** defines permissions inside a specific Namespace.

A Role contains rules such as:

Resource:

Pods

Actions:

get

list

    watch

Example concept:

    Role
    ↓
    Namespace: development
    ↓
    Can read Pods

A Role does not normally provide permissions across the entire cluster.

## **16. ClusterRole**

A **ClusterRole** defines permissions that can apply at cluster scope.

It can be used for:

- Cluster-wide resources
- Namespace resources
- Reusable permission definitions

Example:

    ClusterRole
    ↓
    Can read Nodes

Nodes are cluster-scoped resources, so a normal Namespace Role cannot grant access to Nodes.

## **17. RoleBinding**

A **RoleBinding** connects:

Subject → Role

inside a Namespace.

The subject could be:

- User
- Group
- ServiceAccount

Example:

    Developer
    ↓
    RoleBinding
    ↓
    Pod Reader Role
    ↓
    Development Namespace

## **18. ClusterRoleBinding**

A **ClusterRoleBinding** connects a subject to a ClusterRole at cluster scope.

Example:

    Administrator
    ↓
    ClusterRoleBinding
    ↓
    ClusterRole
    ↓
    Cluster-wide permissions

Use cluster-wide permissions carefully.

## **19. ServiceAccount**

A ServiceAccount is an identity for a workload.

Example:

    Pod
    ↓
    ServiceAccount
    ↓
    RoleBinding
    ↓
    Role
    ↓
    Kubernetes API permissions

### **Why Use ServiceAccounts?**

They allow applications to have their own identity and permissions.

For example:

    Monitoring Pod
    ↓
    monitoring-sa
    ↓
    Read Pods

Read Nodes

Read Services

The application does not need to use a human administrator's credentials.

## **20. Pod Identity**

A Pod can run using a specific ServiceAccount.

Example:

    spec:
    serviceAccountName: my-app

This tells Kubernetes which ServiceAccount the Pod should use.

### **Security Principle**

Give the Pod only the permissions it actually needs.

Avoid giving every Pod administrator-level access.

## **21. Kubernetes API Access**

The Kubernetes API Server is the main entry point for Kubernetes operations.

Examples:

``` bash
kubectl
↓
API Server
or:
Application
↓
ServiceAccount
↓
API Server
```

API requests generally pass through:

    Authentication
    ↓
    Authorization
    ↓
    Admission
    ↓
    API operation

## **22. RBAC — Who → Can Do What → On Which Resource**

This is one of the most important Kubernetes security concepts.

### **Who?**

The subject making the request:

- User
- Group
- ServiceAccount

### **Can Do What?**

The allowed verbs:

- get
- list
- watch
- create
- update
- patch
- delete

### **On Which Resource?**

Examples:

- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- Nodes

### **Example**

Who:

developer

Can do:

get

list

    watch

On:

Pods

Namespace:

development

This means the developer can view Pods but cannot automatically create or delete them.

## **23. Admission Control**

Admission control is a security and policy layer inside the Kubernetes API request process.

It can:

- Validate requests
- Modify requests
- Reject requests
- Apply organizational policies

### **Example**

An organization may require:

Every Pod must have resource limits

An admission mechanism can enforce this requirement.

## **24. Admission Controllers**

Admission controllers are components that process API requests after authorization and before the object is persisted.

They can perform different types of checks.

### **Two Important Types**

- Validating admission
- Mutating admission

## **25. Validating Admission**

Validating admission checks whether a request follows required rules.

It can:

- Accept the request
- Reject the request

Example:

    Pod requested
    ↓
    Check security policy
    ↓
    Policy satisfied → Allow

Policy violated → Reject

A common modern mechanism is a **ValidatingAdmissionPolicy**, while external admission webhooks can also be used.

## **26. Mutating Admission**

Mutating admission can modify a request before it is stored.

Example:

    User creates Pod
    ↓
    Admission
    ↓
    Add required setting
    ↓
    Pod stored

For example, an organization could automatically add:

- Labels
- Security settings
- Sidecars
- Default configuration

Mutating admission can be implemented using mechanisms such as mutating admission webhooks.

## **27. Pod Security Standards**

**Pod Security Standards (PSS)** provide security profiles for Pods.

There are three main levels:

- Privileged
- Baseline
- Restricted

They describe different levels of Pod security.

## **28. Privileged**

**Privileged** provides very few restrictions.

It is intended for workloads that genuinely require elevated permissions.

Example use cases may include:

- Certain infrastructure tools
- Specialized system-level workloads

### **Security Risk**

Privileged workloads can have significantly more access to the underlying Node.

They should be used carefully.

## **29. Baseline**

**Baseline** provides a reasonable level of security.

It prevents many known privilege-escalation patterns while allowing common workloads to run.

It is more restrictive than:

Privileged

but less restrictive than:

Restricted

## **30. Restricted**

**Restricted** provides strong security restrictions.

It is intended for workloads that should run with strong isolation.

Typical requirements can include:

- Running as non-root
- Restricting privilege escalation
- Restricting Linux capabilities
- Using a secure security context

### **Security Level**

    Privileged
    ↓
    Baseline
    ↓
    Restricted

Restrictions generally increase as you move downward.

## **31. NetworkPolicy Security**

NetworkPolicy controls network traffic to and from selected Pods.

It can control:

- Ingress traffic
- Egress traffic

### **Example**

    Frontend
    ↓
    Backend
    ↓
    Database

A policy could allow:

Frontend → Backend

Backend → Database

    while preventing:

Frontend → Database

### **Important**

NetworkPolicy support depends on the cluster's networking implementation/CNI.

## **32. Namespace Isolation**

Namespaces logically separate Kubernetes resources.

Example:

development

├── Pods

├── Services

└── Deployments

production

├── Pods

├── Services

└── Deployments

Namespaces help organize and control access.

### **Security Benefits**

- RBAC can be scoped to Namespaces.
- ResourceQuota can be applied to Namespaces.
- NetworkPolicies can select Namespace traffic.
- Teams can have separate resource areas.

### **Important**

Namespaces alone are not a complete security boundary.

Additional controls such as:

- RBAC
- NetworkPolicy
- Pod Security Standards
- ResourceQuota

may be needed.

## **33. Encryption at Rest**

Encryption at rest protects stored data.

Kubernetes stores cluster state in **etcd**.

Sensitive data such as Kubernetes Secrets can be encrypted at rest using appropriate encryption configuration.

### **Without Encryption at Rest**

    Secret
    ↓
    etcd
    ↓
    Stored data

### **With Encryption at Rest**

    Secret
    ↓
    Encryption
    ↓
    etcd

Encryption at rest helps protect stored data if unauthorized access to the storage layer occurs.

## **34. Least Privilege**

**Least privilege** means:

> Give users, applications, and containers only the permissions they actually need.

### **Bad Example**

    Application
    ↓
    Administrator permissions

### **Better Example**

    Application
    ↓
    Read-only access
    ↓
    Only required resources

### **Apply Least Privilege To**

- Users
- ServiceAccounts
- Pods
- Containers
- RBAC permissions
- Network access

## **35. Secret Access Control**

Secrets should only be accessible to workloads and users that need them.

Use:

- RBAC
- Namespace separation
- Encryption at rest
- External secret managers
- Limited ServiceAccount permissions

### **Avoid**

    Every application
    ↓
    Access to every Secret

### **Better**

    Application A
    ↓
    Only Secret A
    Application B
    ↓
    Only Secret B

## **36. Container Security**

Container security protects the application inside the container.

Important areas include:

- Container user
- Linux capabilities
- Privilege escalation
- Filesystem permissions
- Resource limits
- Image security
- Security context

### **Good Practice**

Run applications with the minimum permissions required.

## **37. Privileged Containers**

A privileged container receives significantly expanded access to the host.

Example:

    securityContext:
    privileged: true

This should generally be avoided unless there is a legitimate requirement.

### **Why?**

A privileged container can have much greater access to:

- Host devices
- Kernel features
- Host resources

This increases security risk.

## **38. Container Capabilities**

Linux capabilities divide traditional root privileges into smaller permissions.

Instead of giving a container broad root privileges, specific capabilities can be granted or removed.

Example:

    securityContext:
    capabilities:
    drop:

\- ALL

The exact capabilities required depend on the application.

### **Security Principle**

Give only required capabilities.

## **39. Trusted Images**

Container images should come from trusted sources.

Examples:

- Official project images
- Organization-controlled registries
- Verified image repositories

### **Good Practices**

- Use trusted base images.
- Keep images updated.
- Avoid unnecessary packages.
- Pin versions where appropriate.
- Scan images before deployment.

## **40. Image Scanning**

Image scanning checks container images for security problems.

Tools can detect:

- Known vulnerabilities
- Vulnerable packages
- Outdated dependencies
- Misconfigurations
- Sometimes secrets or other security issues

### **Example DevOps Flow**

    Developer
    ↓
    GitHub
    ↓
    Build Image
    ↓
    Trivy Scan
    ↓
    Container Registry
    ↓
    Kubernetes

Image scanning should ideally happen before an image is deployed.

## **41. Kubernetes Updates**

Kubernetes itself must be kept updated.

Updates can include:

- Kubernetes version updates
- Security patches
- Node updates
- Container runtime updates
- CNI updates
- Ingress/Gateway components
- Security tools

### **Why Updates Matter?**

Older versions may contain:

- Security vulnerabilities
- Bugs
- Unsupported components

### **Good Practice**

- Follow supported Kubernetes versions.
- Test upgrades before production.
- Keep control-plane and worker-node components compatible.
- Check release notes before upgrading.
- Have backups and recovery procedures.

## **42. Kubernetes Security Best Practices**

### **Identity**

- Use strong authentication.
- Use external identity providers when appropriate.
- Avoid sharing accounts.
- Use ServiceAccounts for workloads.

### **RBAC**

- Follow least privilege.
- Avoid unnecessary ClusterRoleBinding.
- Give users only required permissions.
- Give applications only required API access.

### **Pods**

- Avoid privileged containers.
- Run containers as non-root when possible.
- Disable privilege escalation when appropriate.
- Drop unnecessary Linux capabilities.
- Use secure Pod security settings.

### **Network**

- Use NetworkPolicies where appropriate.
- Limit unnecessary Pod-to-Pod communication.
- Separate application tiers.
- Control ingress and egress traffic.

### **Secrets**

- Never hard-code passwords into container images.
- Restrict Secret access.
- Use encryption at rest.
- Consider external secret-management systems for sensitive environments.

### **Images**

- Use trusted images.
- Keep images updated.
- Scan images for vulnerabilities.
- Avoid unnecessary software in images.

### **API Server**

- Protect Kubernetes API access.
- Use TLS.
- Apply RBAC.
- Avoid exposing the API unnecessarily.

### **Nodes**

- Keep operating systems updated.
- Keep container runtimes updated.
- Restrict unnecessary host access.
- Monitor Node activity.

### **Monitoring**

Monitor:

- Authentication failures
- Authorization failures
- Suspicious API activity
- Container behavior
- Network traffic
- Security events

# **Quick Revision**

- **Authentication** → Who are you?
- **Authorization** → What are you allowed to do?
- **Admission** → Should the request be accepted or modified?
- **RBAC** → Controls permissions.
- **Role** → Permissions inside a Namespace.
- **ClusterRole** → Permissions that can apply cluster-wide.
- **RoleBinding** → Connects a subject to a Role/ClusterRole in a Namespace.
- **ClusterRoleBinding** → Connects a subject to a ClusterRole cluster-wide.
- **ServiceAccount** → Identity for a workload.
- **Pod Identity** → A Pod can use a ServiceAccount.
- **NetworkPolicy** → Controls Pod network communication.
- **Pod Security Standards** → Security profiles for Pods.
- **Privileged** → Few restrictions.
- **Baseline** → Moderate security restrictions.
- **Restricted** → Strong security restrictions.
- **Secret** → Stores sensitive configuration data.
- **Encryption at Rest** → Protects stored data.
- **Least Privilege** → Give only necessary permissions.
- **Privileged Container** → Container with greatly expanded host access.
- **Container Capabilities** → Fine-grained Linux privileges.
- **Image Scanning** → Finds vulnerabilities and other security issues in images.
- **Trusted Images** → Use verified and maintained container images.

### **Most Important Security Flow**

    User / Application
    ↓
    Authentication
    ↓
    Authorization / RBAC
    ↓
    Admission Control
    ↓
    Kubernetes API
    ↓
    Pod / Service / Secret / Other Resource

### **Easy Memory**

Authentication = WHO?

Authorization = WHAT?

Admission = ALLOW / MODIFY / REJECT?

RBAC = WHO → CAN DO WHAT → ON WHICH RESOURCE?

NetworkPolicy = WHO CAN TALK TO WHOM?

Pod Security = WHAT CAN A POD DO?

Secret Security = WHO CAN ACCESS SENSITIVE DATA?

Least Privilege = GIVE ONLY WHAT IS NEEDED

## **SECTION 09 — Helm, YAML & Kubernetes Package Management**

### 

## **1. YAML Basics**

**YAML** is a human-readable format used to store configuration.

Kubernetes uses YAML files to describe resources.

Example:

``` yaml
name: my-app
replicas: 3
environment: production
```

### **YAML Rules**

- Use indentation to show structure.
- Usually use spaces, not tabs.
- Use `key: value`.
- Lists use `-`.
- YAML is case-sensitive.

Example:

``` yaml
app:
name: web
replicas: 3
```

## **2. Kubernetes YAML**

Kubernetes YAML describes the **desired state** of a Kubernetes resource.

Example:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: web-app
spec:
replicas: 3
```

This tells Kubernetes:

> I want a Deployment called `web-app` with 3 replicas.

## **3. Kubernetes Manifests**

A Kubernetes **manifest** is a YAML or JSON file that describes a Kubernetes object.

Examples:

- Deployment manifest
- Service manifest
- ConfigMap manifest
- Secret manifest
- Ingress manifest
- PVC manifest

Example:

deployment.yaml

service.yaml

configmap.yaml

secret.yaml

You can apply a manifest with:

``` bash
kubectl apply -f deployment.yaml
```

## **4. apiVersion**

`apiVersion` specifies which Kubernetes API version should be used for the object.

Example:

apiVersion: apps/v1

Different Kubernetes resources use different API groups and versions.

Examples:

``` yaml
apiVersion: v1
apiVersion: apps/v1
apiVersion: networking.k8s.io/v1
```

## **5. kind**

`kind` tells Kubernetes what type of object you are creating.

Examples:

``` bash
kind: Pod
kind: Deployment
kind: Service
kind: ConfigMap
kind: Secret
```

## **6. metadata**

`metadata` contains information that identifies and describes the object.

Common fields include:

- `name`
- `namespace`
- `labels`
- `annotations`

Example:

``` yaml
metadata:
name: web-app
namespace: production
```

## **7. spec**

`spec` describes the desired configuration of the object.

Example:

    spec:
    replicas: 3

For a Deployment, `spec` can contain:

- Number of replicas
- Pod template
- Container configuration
- Update strategy

## **8. status**

`status` represents the current state of the object.

For example:

Desired replicas: 3

Current replicas: 3

Ready replicas: 3

### **Important**

You normally define the desired state in `spec`.

Kubernetes controllers update `status` to represent the observed state.

You generally **do not manually write the status section** in normal manifests.

## **9. Kubernetes Object Structure**

A typical Kubernetes object looks like:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: web-app
spec:
replicas: 3
```

...

### **Easy Memory**

apiVersion → Which API?

kind → What object?

metadata → What is its name/identity?

spec → What do I want?

status → What is happening now?

## **10. Kubernetes Manifest Management**

You can manage manifests using `kubectl`.

### **Apply**

``` bash
kubectl apply -f deployment.yaml
```

### **Delete**

``` bash
kubectl delete -f deployment.yaml
```

### **Check**

``` bash
kubectl get -f deployment.yaml
```

### **View YAML**

``` bash
kubectl get deployment web-app -o yaml
```

### **Apply a Directory**

``` bash
kubectl apply -f ./manifests/
```

# **Kubernetes Resource YAML**

## **11. Deployment YAML**

A Deployment manages application Pods.

Example:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: web-app
spec:
replicas: 3
selector:
matchLabels:
app: web-app
template:
metadata:
labels:
app: web-app
spec:
containers:
- name: web
image: nginx:1.27
ports:
- containerPort: 80
```

### **Important Parts**

    Deployment
    ↓
    ReplicaSet
    ↓
    Pods
    ↓
    Containers

## **12. Service YAML**

A Service provides a stable network endpoint for Pods.

Example:

``` yaml
apiVersion: v1
kind: Service
metadata:
name: web-service
spec:
selector:
app: web-app
ports:
- port: 80
targetPort: 80
type: ClusterIP
```

The selector connects the Service to Pods with:

    labels:
    app: web-app

## **13. ConfigMap YAML**

A ConfigMap stores non-sensitive configuration.

Example:

``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
name: app-config
data:
```

APP_ENV: production

APP_PORT: "8080"

Applications can consume these values as:

- Environment variables
- Mounted configuration files

## **14. Secret YAML**

A Secret stores sensitive configuration.

Example:

``` yaml
apiVersion: v1
kind: Secret
metadata:
name: database-secret
type: Opaque
stringData:
username: admin
password: my-password
```

### **Important**

For learning, `stringData` is convenient because Kubernetes handles the encoding.

Base64 encoding in the `data` field is **not encryption**.

For production systems, protect Secret access and consider encryption at rest and external secret-management solutions.

## **15. Ingress YAML**

Ingress defines HTTP/HTTPS routing rules.

Example:

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: web-ingress
spec:
rules:
- host: example.com
http:
paths:
- path: /
pathType: Prefix
backend:
service:
name: web-service
port:
number: 80
```

### **Flow**

    User
    ↓
    Ingress
    ↓
    Service
    ↓
    Pod

An Ingress resource needs an **Ingress Controller** to actually implement the routing.

## **16. PVC YAML**

A PersistentVolumeClaim requests persistent storage.

Example:

``` yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
name: app-storage
spec:
accessModes:
```

\- ReadWriteOnce

    resources:
    requests:
    storage: 5Gi

The PVC can then be mounted into a Pod.

    Pod
    ↓
    PVC
    ↓
    PV / Storage

# **Labels and Annotations**

## **17. Labels**

Labels are key/value pairs attached to Kubernetes objects.

Example:

``` yaml
labels:
app: web
environment: production
team: frontend
```

Labels are mainly used for:

- Selecting objects
- Grouping resources
- Organizing workloads
- Filtering resources

Example:

``` bash
kubectl get pods -l app=web
```

## **18. Selectors**

Selectors find Kubernetes objects based on labels.

Example:

    selector:
    app: web

A Service might use:

    selector:
    app: web

and find Pods with:

    labels:
    app: web

### **Very Important**

The Service selector and Pod labels must match correctly.

Service

    selector:
    app: web
    ↓
    Pod
    labels:
    app: web

Deployments also use selectors to identify the Pods they manage.

## **19. Label-Based Organization**

Labels help organize large Kubernetes environments.

Example:

``` yaml
labels:
app: ecommerce
component: frontend
environment: production
version: v2
```

You can then filter:

``` bash
kubectl get pods -l environment=production
or:
kubectl get pods -l component=frontend
```

## **20. Annotations**

Annotations store additional metadata about Kubernetes objects.

Example:

    metadata:
    annotations:
    example.com/owner: team-a

Annotations can be used by:

- Kubernetes tools
- Controllers
- Ingress controllers
- Monitoring systems
- Deployment systems

### **Important Difference**

Labels are mainly for **selection and organization**.

Annotations are mainly for **additional metadata or tool configuration**.

## **21. Labels vs Annotations**

### **Labels**

Use labels when you need to:

- Select objects
- Group objects
- Filter objects

Example:

app: frontend

### **Annotations**

Use annotations for:

- Extra metadata
- Tool configuration
- Controller-specific information

Example:

description: Main production frontend

### **Easy Memory**

Label → Select / Group

Annotation → Describe / Configure

# **Helm**

## **22. Helm**

**Helm** is a package manager for Kubernetes.

It helps you package, install, upgrade, and manage Kubernetes applications.

Instead of maintaining many separate YAML files manually, Helm allows you to create a reusable **Chart**.

### **Simple Idea**

Without Helm:

deployment.yaml

service.yaml

configmap.yaml

ingress.yaml

With Helm:

    Helm Chart
    ↓
    Templates + Values
    ↓
    Kubernetes YAML

## **23. What is Helm?**

Helm is often described as:

> **The package manager for Kubernetes.**

It helps with:

- Packaging applications
- Reusing Kubernetes manifests
- Configuration management
- Application installation
- Application upgrades
- Rollbacks
- Version management

## **24. Helm Charts**

A **Helm Chart** is a package containing Kubernetes application definitions.

A chart can contain:

- Templates
- Default values
- Chart metadata
- Dependencies
- Documentation

Example:

my-app/

├── Chart.yaml

├── values.yaml

└── templates/

├── deployment.yaml

├── service.yaml

└── configmap.yaml

## **25. Chart Structure**

A typical Helm chart:

my-app/

│

├── Chart.yaml

├── values.yaml

├── charts/

└── templates/

### **Main Files**

    Chart.yaml
    ↓
    Chart information
    values.yaml
    ↓
    Configuration values
    templates/
    ↓
    Kubernetes templates
    charts/
    ↓
    Chart dependencies

## **26. Chart.yaml**

`Chart.yaml` contains chart metadata.

Example:

``` yaml
apiVersion: v2
name: my-app
description: My Kubernetes application
type: application
version: 1.0.0
appVersion: "1.0"
```

It can contain:

- Chart name
- Chart version
- Application version
- Description
- Dependencies

## **27. values.yaml**

`values.yaml` contains default configuration values.

Example:

``` yaml
replicaCount: 3
image:
repository: nginx
tag: "1.27"
service:
type: ClusterIP
port: 80
```

Templates can use these values.

## **28. Templates**

Helm templates are Kubernetes YAML files containing variables and template logic.

Example:

    spec:
    replicas: {{ .Values.replicaCount }}

If:

replicaCount: 3

Helm generates:

    spec:
    replicas: 3

### **Main Idea**

    values.yaml
    ↓
    Helm Template
    ↓
    Generated Kubernetes Manifest

## **29. Releases**

A **Helm release** is an installed instance of a Helm chart.

For example:

Chart:

my-app

Release:

production-app

You could install the same chart multiple times:

my-app

├── development release

├── staging release

└── production release

Each release has its own configuration and revision history.

## **30. Helm Values**

Helm values allow you to customize a chart without changing its templates.

Example:

replicaCount: 2

Production could use:

replicaCount: 5

### **Override Values**

You can use:

``` bash
helm install my-app ./my-chart --set replicaCount=5
```

Or provide a values file:

``` bash
helm install my-app ./my-chart -f production-values.yaml
```

## **31. Helm Templates**

Helm uses the Go template language.

Common syntax:

{{ .Values.replicaCount }}

Example:

replicas: {{ .Values.replicaCount }}

Templates allow you to reuse the same Kubernetes definitions with different configurations.

### **Example**

Development

replicas = 2

Production

replicas = 5

Same chart, different values.

## **32. Helm Repositories**

A Helm repository stores Helm charts that users can download and install.

A repository may contain:

Chart A

Chart B

Chart C

You can add a repository:

``` bash
helm repo add myrepo <repository-url>
```

Update repository information:

``` bash
helm repo update
```

Search charts:

``` bash
helm search repo myrepo
```

## **33. Chart Dependencies**

A chart can depend on other charts.

Example:

    My Application
    ↓
    ┌──────────────┐

│ PostgreSQL │

│ Redis │

└──────────────┘

The main chart can define these as dependencies.

Dependencies are commonly managed through `Chart.yaml`.

# **Helm Commands**

## **34. Helm Install**

Install a chart:

``` bash
helm install my-app ./my-chart
```

Install with custom values:

``` bash
helm install my-app ./my-chart -f values-prod.yaml
```

## **35. Helm Upgrade**

Upgrade an existing release:

``` bash
helm upgrade my-app ./my-chart
```

With new values:

``` bash
helm upgrade my-app ./my-chart -f values-prod.yaml
```

## **36. Helm Rollback**

Helm keeps release revisions.

You can see revisions:

``` bash
helm history my-app
```

Rollback:

``` bash
helm rollback my-app 1
```

This returns the release to a previous revision.

## **37. Helm Uninstall**

Remove a Helm release:

``` bash
helm uninstall my-app
```

This removes the resources managed by that release according to Helm's release state and Kubernetes resource behavior.

## **38. Helm List**

List Helm releases:

``` bash
helm list
```

List releases across Namespaces:

``` bash
helm list -A
```

# **Kustomize**

## **39. Kustomize**

**Kustomize** is a Kubernetes configuration customization tool.

It allows you to customize standard Kubernetes YAML without using a template language.

Kustomize is built into `kubectl`.

Example:

kubectl apply -k .

### **Basic Idea**

    Base YAML
    ↓
    Kustomize
    ↓
    Customized YAML

## **40. Kustomize Base**

A **Base** contains the common Kubernetes configuration.

Example:

base/

├── deployment.yaml

├── service.yaml

└── kustomization.yaml

The base might contain:

- Deployment
- Service
- ConfigMap
- Common labels

## **41. Kustomize Overlay**

An **Overlay** modifies the base for a particular environment.

Example:

overlays/

├── development/

└── production/

### **Example**

    Base
    ↓
    Development Overlay
    ↓
    Development configuration
    or:
    Base
    ↓
    Production Overlay
    ↓
    Production configuration

## **42. Environment-Specific Configuration**

Different environments often need different settings.

### **Development**

Replicas: 1

Small resources

Development image

### **Staging**

Replicas: 2

Testing configuration

Staging image

### **Production**

Replicas: 5

Production image

Higher resources

Helm and Kustomize can both help manage these differences.

# **GitOps**

## **43. Git Repository**

In GitOps, Git becomes the source of truth for the desired application configuration.

Example:

    Git Repository
    ↓
    Kubernetes manifests
    ↓
    Desired application state

The repository may contain:

deployment.yaml

service.yaml

configmap.yaml

or:

Helm Chart

or:

Kustomize configuration

## **44. Kubernetes Manifests**

GitOps repositories commonly store:

- Deployments
- Services
- ConfigMaps
- Secrets references
- Ingress/Gateway configuration
- Namespaces
- RBAC
- Helm configuration
- Kustomize configuration

### **Example**

gitops-repo/

├── applications/

├── environments/

│ ├── development/

│ ├── staging/

│ └── production/

## **45. Helm + GitOps**

Helm charts can be used with GitOps.

Example:

    Git Repository
    ↓
    Helm Chart / Values
    ↓
    GitOps Tool
    ↓
    Kubernetes

The Git repository contains the desired Helm configuration.

A GitOps controller can detect changes and apply them to Kubernetes.

## **46. Kustomize + GitOps**

Kustomize can also be used with GitOps.

Example:

    Git Repository
    ↓
    Kustomize Base
    ↓
    Production Overlay
    ↓
    GitOps Tool
    ↓
    Kubernetes

This is useful when different environments need different configurations.

## **47. Argo CD + Kubernetes**

**Argo CD** is a GitOps continuous delivery tool for Kubernetes.

It watches a Git repository and compares:

    Git Desired State
    ↓
    Argo CD
    ↓
    Kubernetes Actual State

If they differ, Argo CD can synchronize Kubernetes with the desired configuration, depending on how the application is configured.

### **Basic Flow**

    Developer
    ↓
    GitHub
    ↓
    GitOps Repository
    ↓
    Helm / Kustomize
    ↓
    Argo CD
    ↓
    Kubernetes Cluster
    ↓
    Application

### **Example**

A developer changes:

    image:
    tag: "2.0"

in the GitOps configuration.

Then:

    Git Change
    ↓
    Argo CD detects change
    ↓
    Helm/Kustomize renders configuration
    ↓
    Kubernetes updated
    ↓
    New application version runs

# **Helm vs Kustomize — Easy Understanding**

## **Helm**

- Kubernetes package manager.
- Uses charts.
- Uses templates.
- Uses `values.yaml`.
- Good for reusable applications.
- Can package and distribute applications.
- Supports releases, upgrades, and rollbacks.

## **Kustomize**

- Kubernetes configuration customization tool.
- Uses normal Kubernetes YAML.
- Uses bases and overlays.
- Does not require a template language.
- Good for environment-specific modifications.
- Built into `kubectl`.

### **Easy Memory**

Helm

=

Package + Template + Configure

Kustomize

=

Base YAML + Customize

# **Kubernetes Configuration Evolution**

You can understand the progression like this:

    Basic Kubernetes
    ↓
    Individual YAML files
    ↓
    Many environments
    ↓
    Kustomize / Helm
    ↓
    Git Repository
    ↓
    GitOps
    ↓
    Argo CD
    ↓
    Kubernetes Cluster

# **Quick Revision**

- **YAML** → Configuration format.
- **Manifest** → File describing a Kubernetes object.
- **apiVersion** → Kubernetes API version.
- **kind** → Type of Kubernetes object.
- **metadata** → Object identity and metadata.
- **spec** → Desired configuration.
- **status** → Current observed state.
- **Labels** → Select and organize objects.
- **Annotations** → Store additional metadata/configuration.
- **Helm** → Kubernetes package manager.
- **Chart** → Helm application package.
- **Chart.yaml** → Chart metadata.
- **values.yaml** → Default/customizable values.
- **Templates** → Reusable Kubernetes definitions.
- **Release** → Installed instance of a Helm chart.
- **Helm Repository** → Repository containing Helm charts.
- **Helm Dependency** → Another chart required by a chart.
- **Kustomize** → Kubernetes configuration customization tool.
- **Base** → Common Kubernetes configuration.
- **Overlay** → Environment-specific customization.
- **GitOps** → Git contains the desired application configuration.
- **Argo CD** → GitOps continuous delivery tool for Kubernetes.

### **Most Important Flow**

    Kubernetes YAML
    ↓
    Helm / Kustomize
    ↓
    Git Repository
    ↓
    Argo CD
    ↓
    Kubernetes
    ↓
    Running Application

### **Easy Memory**

YAML → Write Kubernetes configuration

Manifest → Kubernetes object definition

Labels → Find / Select

Annotations→ Extra information

Helm → Package and Template

Kustomize → Customize YAML

GitOps → Git = Desired State

Argo CD → Git → Kubernetes

## **SECTION 10 — Kubernetes Operations, Scaling & Troubleshooting**

### 

## **1. Kubernetes Operations**

Kubernetes operations means managing and maintaining applications running inside a Kubernetes cluster.

Common operational tasks include:

- Deploying applications
- Checking Pods
- Viewing logs
- Scaling applications
- Updating applications
- Troubleshooting failures
- Managing Nodes
- Monitoring resources
- Checking cluster health

The main command-line tool for these tasks is:

``` bash
kubectl
```

## **2. kubectl**

`kubectl` is the command-line tool used to communicate with the Kubernetes API Server.

Basic structure:

``` bash
kubectl <command> <resource>
```

Example:

``` bash
kubectl get pods
kubectl
↓
Kubernetes API Server
↓
Cluster resources
```

## **3. kubectl get**

`kubectl get` displays Kubernetes resources.

### **Pods**

``` bash
kubectl get pods
```

### **Deployments**

``` bash
kubectl get deployments
```

### **Services**

``` bash
kubectl get services
```

### **Nodes**

``` bash
kubectl get nodes
```

### **All Common Resources**

``` bash
kubectl get all
```

### **All Namespaces**

``` bash
kubectl get pods -A
```

## **4. kubectl describe**

`kubectl describe` shows detailed information about a resource.

Example:

``` bash
kubectl describe pod my-pod
```

It can show:

- Configuration
- Conditions
- Container information
- Volumes
- Events
- Scheduling information
- Errors

### **Very Useful For Troubleshooting**

``` bash
kubectl describe pod my-pod
```

Look especially at:

Events:

## **5. kubectl create**

`kubectl create` creates Kubernetes resources.

Example:

``` bash
kubectl create deployment nginx --image=nginx
```

Create a namespace:

``` bash
kubectl create namespace development
```

### **Difference**

`create` generally expects the resource to be created as a new object.

## **6. kubectl apply**

`kubectl apply` creates or updates resources from configuration files.

Example:

``` bash
kubectl apply -f deployment.yaml
```

Directory:

``` bash
kubectl apply -f ./manifests/
```

### **Why** `apply` **Is Important**

It works well with declarative Kubernetes configuration.

    YAML
    ↓
    kubectl apply
    ↓
    Kubernetes

## **7. kubectl delete**

Deletes Kubernetes resources.

Example:

``` bash
kubectl delete pod my-pod
```

Delete using a manifest:

``` bash
kubectl delete -f deployment.yaml
```

Delete a Deployment:

``` bash
kubectl delete deployment my-app
```

### **Warning**

Deleting a resource can cause application interruption or data loss depending on the resource.

## **8. kubectl edit**

`kubectl edit` opens an existing Kubernetes resource for editing.

Example:

``` bash
kubectl edit deployment my-app
```

Kubernetes opens the resource configuration in your configured editor.

### **Important**

For repeatable environments, it is usually better to update the source YAML/Helm/Kustomize configuration and apply it rather than making undocumented manual changes.

## **9. kubectl logs**

Displays container logs.

Example:

``` bash
kubectl logs my-pod
```

For a specific container:

``` bash
kubectl logs my-pod -c app
```

Follow logs:

``` bash
kubectl logs -f my-pod
```

Previous container instance:

``` bash
kubectl logs my-pod --previous
```

`--previous` is especially useful for containers that restart repeatedly.

## **10. kubectl exec**

Runs a command inside a running container.

Example:

``` bash
kubectl exec -it my-pod -- /bin/sh
```

You can use it to inspect:

- Files
- Environment variables
- Network connectivity
- Processes
- Application configuration

Example:

``` bash
kubectl exec my-pod -- env
```

### **Important**

The container image must contain the command or shell you are trying to execute.

## **11. kubectl explain**

Shows Kubernetes API documentation from the command line.

Example:

``` bash
kubectl explain deployment
```

Specific field:

``` bash
kubectl explain deployment.spec
```

Another example:

``` bash
kubectl explain pod.spec.containers
```

This is very useful when learning Kubernetes YAML.

# **Scaling**

## **12. Manual Scaling**

Manual scaling means changing the number of application replicas yourself.

Example:

``` bash
kubectl scale deployment web-app --replicas=5
```

Check:

``` bash
kubectl get deployment web-app
```

### **Flow**

    Manual command
    ↓
    Deployment
    ↓
    ReplicaSet
    ↓
    5 Pods

## **13. Horizontal Pod Autoscaler — HPA**

**HPA = Horizontal Pod Autoscaler**

HPA automatically changes the number of Pod replicas based on metrics.

Example:

    Low CPU
    ↓
    2 Pods
    High CPU
    ↓
    5 Pods

Typical flow:

    Metrics
    ↓
    HPA
    ↓
    Pod Replicas

Example:

``` bash
kubectl autoscale deployment web-app \
```

--min=2 \\

--max=10 \\

--cpu-percent=70

HPA commonly uses metrics provided through the Kubernetes metrics ecosystem, such as Metrics Server.

## **14. Vertical Pod Autoscaler — VPA**

**VPA = Vertical Pod Autoscaler**

VPA adjusts the CPU and memory **requests/limits** of Pods based on observed usage.

### **Horizontal Scaling**

    2 Pods
    ↓
    5 Pods

HPA changes the **number of Pods**.

### **Vertical Scaling**

CPU: 250m → 500m

Memory: 512Mi → 1Gi

VPA changes the **resources assigned to Pods**.

### **Easy Memory**

HPA → More/Fewer Pods

VPA → More/Less CPU & Memory per Pod

## **15. Cluster Autoscaler**

Cluster Autoscaler changes the number of Nodes in a cluster when supported by the cluster infrastructure.

For example:

    Not enough Node capacity
    ↓
    Cluster Autoscaler
    ↓
    Add Node

When Nodes are no longer needed:

    Low demand
    ↓
    Remove unnecessary Node

### **Important**

HPA and Cluster Autoscaler solve different problems.

HPA

    Application capacity
    ↓
    Pod count

Cluster Autoscaler

    Cluster capacity
    ↓
    Node count

## **16. Node Scaling**

Node scaling means increasing or decreasing the number or capacity of worker Nodes.

### **Scale Out**

Add more Nodes:

3 Nodes → 5 Nodes

### **Scale Up**

Use a larger Node:

    4 CPU / 8 GB
    ↓
    8 CPU / 16 GB

In cloud environments, Node scaling may be managed through:

- Managed Kubernetes node groups
- Cluster Autoscaler
- Cloud provider autoscaling systems

## **17. Metrics → HPA → Pod Replicas**

A simplified HPA flow:

    Application
    ↓
    CPU / Memory / Other Metrics
    ↓
    Metrics System
    ↓
    HPA
    ↓
    Desired Replica Count
    ↓
    Deployment
    ↓
    Pods

Example:

    CPU usage increases
    ↓
    HPA detects higher utilization
    ↓
    Replica count increases
    ↓
    More Pods start

# **Kubernetes Scheduling**

## **18. Kubernetes Scheduling**

Scheduling determines **which Node should run a Pod**.

When a Pod is created:

    Pod
    ↓
    Scheduler
    ↓
    Suitable Node
    ↓
    Pod runs

The scheduler considers factors such as:

- CPU and memory requests
- Node availability
- Node selectors
- Affinity rules
- Taints
- Tolerations
- Topology constraints
- Other scheduling requirements

## **19. Scheduler**

The Kubernetes scheduler watches for Pods that do not yet have a Node assigned.

It evaluates available Nodes and selects a suitable one.

### **Simple Flow**

    New Pod
    ↓
    Scheduler
    ↓
    Node A ❌

Node B ✅

    Node C ❌
    ↓
    Pod → Node B

The scheduler does not run the container itself.

The selected Node's kubelet is responsible for starting the Pod.

## **20. Node Selection**

You can influence where Pods run.

Common mechanisms include:

- `nodeSelector`
- Node affinity
- Pod affinity
- Pod anti-affinity
- Taints
- Tolerations
- Topology spread constraints

## **21. nodeSelector**

`nodeSelector` is a simple way to require a Pod to run on Nodes with a particular label.

Example Node label:

    disk=ssd

Pod:

    spec:
    nodeSelector:
    disk: ssd

The Pod can only be scheduled onto Nodes with:

    disk=ssd

## **22. nodeAffinity**

Node affinity provides more expressive Node-selection rules.

It can express:

- Required conditions
- Preferred conditions

Example concept:

Prefer:

    disk=ssd

Required:

    environment=production

### **Difference**

    nodeSelector
    ↓
    Simple Node selection
    nodeAffinity
    ↓
    More flexible Node selection

## **23. podAffinity**

Pod affinity allows you to prefer or require Pods to run near other Pods.

Example:

    Frontend Pod
    ↓
    Prefer same topology area
    ↓
    Backend Pod

This can be useful when workloads benefit from being physically or logically close.

## **24. podAntiAffinity**

Pod anti-affinity allows you to prefer or require Pods **not** to run close to certain other Pods.

Example:

web-1 → Node A

web-2 → Node B

web-3 → Node C

This can improve availability by spreading replicas across Nodes or topology domains.

## **25. Taints**

A **taint** tells Kubernetes:

> Do not schedule Pods here unless they tolerate this taint.

Example concept:

    Node
    ↓
    Taint: dedicated=gpu

Normal Pods may not be scheduled there.

## **26. Tolerations**

A **toleration** allows a Pod to be considered for a Node with a matching taint.

Example:

    Node
    ↓
    Taint: dedicated=gpu
    Pod
    ↓
    Matching Toleration
    ↓
    Can be scheduled

### **Important**

A toleration does **not** automatically force a Pod onto that Node.

It only allows the Pod to tolerate the taint.

You may use:

Taint + Toleration + Node Selection

when you want to dedicate Nodes to certain workloads.

## **27. Dedicated Nodes**

Dedicated Nodes are Nodes reserved for particular workloads.

Example:

    GPU Nodes
    ↓
    Machine Learning workloads
    General Nodes
    ↓
    Normal applications

A common design is:

Node Taint

\+

Pod Toleration

\+

Node Selection

This helps keep workloads separated.

## **28. PodDisruptionBudget**

**PodDisruptionBudget (PDB)** helps protect application availability during **voluntary disruptions**.

Examples of voluntary disruptions:

- Node maintenance
- Cluster administration
- Planned Node draining

Example:

Application:

5 replicas

PDB:

minimum available = 4

This helps ensure that too many replicas are not voluntarily disrupted at once.

### **Important**

A PDB does **not** prevent every type of failure.

For example, it does not guarantee protection from:

- Node crashes
- Hardware failures
- Sudden infrastructure failures

## **29. Availability During Maintenance**

Before maintenance, you may have:

5 application Pods

During a controlled Node drain, a PDB can help maintain the required number of available Pods.

Example:

    5 Pods
    ↓
    Maintenance begins
    ↓
    Only permitted disruption
    ↓
    Remaining Pods continue serving traffic

For high availability, combine:

- Multiple replicas
- Proper scheduling
- Pod anti-affinity/topology spreading
- PDB
- Multiple Nodes

# **Troubleshooting**

## **30. Troubleshooting Methodology**

When something does not work, do not randomly change configurations.

Use a systematic process.

### **Basic Troubleshooting Flow**

    1. Check
    ↓
    2. Describe
    ↓
    3. Logs
    ↓
    4. Events
    ↓
    5. Configuration
    ↓
    6. Network
    ↓
    7. Resources

### **Easy Rule**

Get → Describe → Logs → Events → Investigate

## **31. Pod Troubleshooting**

First check Pods:

``` bash
kubectl get pods
```

For more information:

``` bash
kubectl get pods -o wide
```

Then:

``` bash
kubectl describe pod <pod-name>
```

Then check logs:

``` bash
kubectl logs <pod-name>
```

## **32. Pending**

A Pod in `Pending` means it has not reached the Running phase yet.

Common causes:

- Insufficient CPU
- Insufficient memory
- Node selector mismatch
- Node affinity requirements
- Taints without matching tolerations
- Unavailable Nodes
- PVC/storage problems

### **First Commands**

``` bash
kubectl get pod <pod-name>
kubectl describe pod <pod-name>
```

Look at:

Events

## **33. CrashLoopBackOff**

`CrashLoopBackOff` means a container is repeatedly starting and then failing.

Possible causes:

- Application crashes
- Incorrect configuration
- Missing environment variables
- Incorrect command
- Missing files
- Dependency unavailable
- Incorrect Secret/ConfigMap
- Application exits immediately

### **Check**

``` bash
kubectl logs <pod-name>
```

If it has restarted:

``` bash
kubectl logs <pod-name> --previous
```

Also:

``` bash
kubectl describe pod <pod-name>
```

## **34. ImagePullBackOff**

`ImagePullBackOff` means Kubernetes is having trouble pulling the container image and is retrying with increasing delays.

Possible causes:

- Incorrect image name
- Incorrect image tag
- Private registry authentication problem
- Registry unavailable
- Network problem
- Image does not exist

### **Check**

``` bash
kubectl describe pod <pod-name>
```

Look at the Events section.

## **35. ErrImagePull**

`ErrImagePull` means Kubernetes failed to pull the specified image.

Example:

image: nginx:wrong-tag

Possible problem:

The tag does not exist.

### **Check**

``` bash
kubectl describe pod <pod-name>
```

Correct the image:

``` bash
kubectl set image deployment/web-app \
web=nginx:1.27
```

## **36. OOMKilled**

`OOMKilled` means a container was terminated because it exceeded its available memory limit or the Node experienced memory pressure leading to an OOM kill.

Example:

Memory limit:

512Mi

Application needs:

700Mi

Result:

OOMKilled

### **Check**

``` bash
kubectl describe pod <pod-name>
```

Look for:

Reason: OOMKilled

### **Possible Solutions**

- Investigate the application's memory usage.
- Increase the memory limit when appropriate.
- Fix a memory leak.
- Review memory requests and limits.

## **37. ContainerCreating**

`ContainerCreating` means the Pod has been scheduled but the container is not ready yet.

Possible causes include:

- Image pulling
- Volume mounting
- CNI/network setup
- Secret/ConfigMap mounting
- Storage problems

### **Check**

``` bash
kubectl describe pod <pod-name>
```

Again, check the Events section.

# **Application Troubleshooting**

## **38. Pod Running but Application Unavailable**

A Pod being `Running` does not necessarily mean the application is working correctly.

For example:

Pod = Running

Application = Not responding

Possible causes:

- Application process is unhealthy
- Wrong container port
- Readiness probe failure
- Service selector mismatch
- Service port/targetPort mismatch
- NetworkPolicy blocking traffic
- Ingress configuration problem

### **Troubleshooting Flow**

    Pod
    ↓
    Application
    ↓
    Service
    ↓
    Ingress
    ↓
    External User

Check each layer.

## **39. Service Problems**

If a Service does not work, check:

``` bash
kubectl get service
```

Then:

``` bash
kubectl describe service <service-name>
```

Check Endpoints/EndpointSlices:

``` bash
kubectl get endpoints
kubectl get endpointslices
```

### **Common Problems**

- Wrong selector
- Pod labels do not match
- Wrong Service port
- Wrong targetPort
- Pods are not Ready

### **Example**

Service:

    selector:
    app: backend

Pod:

    labels:
    app: frontend

The Service will not select the backend Pod.

## **40. DNS Problems**

Kubernetes normally uses CoreDNS for cluster DNS.

Test DNS from a suitable troubleshooting Pod:

``` bash
kubectl exec -it <pod-name> -- nslookup <service-name>
```

You can also test a fully qualified Service name:

service.namespace.svc.cluster.local

### **Check CoreDNS**

``` bash
kubectl get pods -n kube-system
```

Look for CoreDNS Pods.

### **Possible Causes**

- CoreDNS problem
- Incorrect Service name
- Incorrect Namespace
- Network connectivity problem
- DNS configuration problem

## **41. Ingress Problems**

If the application works through the Service but not through the external URL, investigate the Ingress layer.

Check:

``` bash
kubectl get ingress
kubectl describe ingress <ingress-name>
```

Also check the Ingress Controller.

### **Common Problems**

- Incorrect hostname
- Incorrect path
- Wrong Service name
- Wrong Service port
- Ingress Controller problem
- DNS problem
- TLS certificate problem

### **Flow**

    User
    ↓
    DNS
    ↓
    Load Balancer
    ↓
    Ingress Controller
    ↓
    Service
    ↓
    Pod

## **42. NetworkPolicy Problems**

NetworkPolicy can unintentionally block traffic.

Example:

    Frontend
    ↓
    NetworkPolicy

X

Backend

The application may be healthy but unable to communicate.

### **Check**

``` bash
kubectl get networkpolicy
kubectl describe networkpolicy <policy-name>
```

Check:

- Pod selectors
- Namespace selectors
- Ingress rules
- Egress rules
- Ports

### **Troubleshooting Idea**

Test connectivity from the source Pod to the destination Service/Pod.

# **Node Troubleshooting**

## **43. NotReady**

A Node with:

STATUS: NotReady

means the Node is not currently considered ready to run normal workloads.

Check:

``` bash
kubectl get nodes
```

Then:

``` bash
kubectl describe node <node-name>
```

Possible causes:

- kubelet problem
- Network problem
- Container runtime problem
- Disk pressure
- Memory pressure
- Node infrastructure problem

## **44. Disk Pressure**

Disk pressure means the Node is running low on available disk resources.

Check:

``` bash
kubectl describe node <node-name>
```

Look for conditions such as:

DiskPressure

Possible causes:

- Large container images
- Container logs
- Temporary files
- Full filesystem
- Too many unused images

### **Possible Actions**

- Clean unnecessary files/images where appropriate.
- Investigate large logs.
- Increase Node storage when necessary.
- Check container runtime storage.

## **45. Memory Pressure**

Memory pressure means a Node does not have enough available memory.

Check:

``` bash
kubectl describe node <node-name>
```

Look for:

MemoryPressure

Possible causes:

- Too many workloads
- Large memory usage
- Memory leaks
- Insufficient Node capacity

Useful command:

``` bash
kubectl top nodes
```

## **46. CPU Pressure**

High CPU usage can cause workloads to become slow or compete for resources.

Check:

``` bash
kubectl top nodes
and:
kubectl top pods
```

Possible causes:

- Heavy application workload
- CPU-intensive processes
- Too many Pods
- Incorrect resource configuration

Possible solutions:

- Optimize the application.
- Increase CPU resources where appropriate.
- Scale Pods.
- Add Nodes.
- Review CPU requests and limits.

# **Troubleshooting Checklist**

## **47. Check**

Start by checking the resource state.

``` bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get nodes
```

## **48. Describe**

Use `describe` when you need detailed information.

``` bash
kubectl describe pod <pod>
kubectl describe node <node>
kubectl describe service <service>
```

Look especially at:

Conditions

Events

## **49. Logs**

Application errors are often visible in container logs.

``` bash
kubectl logs <pod>
```

For a restarting container:

``` bash
kubectl logs <pod> --previous
```

For a specific container:

``` bash
kubectl logs <pod> -c <container>
```

## **50. Events**

Kubernetes Events are extremely useful for troubleshooting.

View events:

``` bash
kubectl get events
```

Sort by time when supported by your environment:

``` bash
kubectl get events --sort-by=.lastTimestamp
```

Events can reveal:

- Scheduling failures
- Image pull failures
- Mount failures
- Probe failures
- Container errors
- Node problems

## **51. Configuration**

Check the actual configuration when something behaves unexpectedly.

Examples:

``` bash
kubectl get deployment <name> -o yaml
kubectl get service <name> -o yaml
kubectl get configmap <name> -o yaml
```

Check:

- Image
- Ports
- Environment variables
- ConfigMaps
- Secrets
- Probes
- Resource requests/limits
- Selectors

## **52. Network**

When the application cannot communicate, check:

    Pod
    ↓
    Service
    ↓
    NetworkPolicy
    ↓
    Ingress
    ↓
    Load Balancer

Useful commands:

``` bash
kubectl get services
kubectl get endpointslices
kubectl get networkpolicy
```

Test connectivity from a suitable Pod:

``` bash
kubectl exec -it <pod-name> -- curl http://<service-name>
```

If `curl` is not installed in the container, use an appropriate temporary troubleshooting container/Pod.

## **53. Resources**

Check resource usage with:

``` bash
kubectl top nodes
and:
kubectl top pods
```

Check configured requests and limits:

``` bash
kubectl describe pod <pod-name>
```

Look for:

Requests

Limits

### **Common Resource Problems**

- CPU shortage
- Memory shortage
- OOMKilled
- Node pressure
- Pods stuck Pending

# **54. Troubleshooting Commands**

### **Cluster**

``` bash
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
```

### **Pods**

``` bash
kubectl get pods
kubectl get pods -o wide
kubectl describe pod <pod>
kubectl logs <pod>
kubectl logs <pod> --previous
```

### **Deployments**

``` bash
kubectl get deployments
kubectl describe deployment <deployment>
kubectl rollout status deployment/<deployment>
kubectl rollout history deployment/<deployment>
```

### **Services**

``` bash
kubectl get services
kubectl describe service <service>
kubectl get endpointslices
```

### **Configuration**

``` bash
kubectl get configmap
kubectl get secrets
kubectl get deployment <name> -o yaml
```

### **Network**

``` bash
kubectl get ingress
kubectl get networkpolicy
kubectl get endpointslices
```

### **Resources**

``` bash
kubectl top nodes
kubectl top pods
```

### **Events**

``` bash
kubectl get events
```

### **Container Access**

``` bash
kubectl exec -it <pod> -- /bin/sh
```

# **Quick Troubleshooting Flow**

    Application not working
    ↓
    kubectl get pods
    ↓
    Is Pod Running?

↓ ↓

NO YES

↓ ↓

describe Check application

↓ ↓

events logs

↓ ↓

    Fix Pod Check Service
    ↓
    Check Endpoints
    ↓
    Check NetworkPolicy
    ↓
    Check Ingress
    ↓
    Check DNS

# **Common Kubernetes Problems — Easy Memory**

Pending

→ Pod cannot be scheduled or is waiting on required resources/storage.

CrashLoopBackOff

→ Container starts, crashes, and keeps restarting.

ImagePullBackOff

→ Kubernetes cannot pull the container image and is retrying.

ErrImagePull

→ Kubernetes failed to pull the image.

OOMKilled

→ Container was killed because of memory exhaustion.

ContainerCreating

→ Pod is scheduled but container setup is not complete.

NotReady

→ Node is not currently ready for normal workload scheduling.

DiskPressure

→ Node has insufficient disk resources.

MemoryPressure

→ Node has insufficient available memory.

# **Scaling — Easy Memory**

Manual Scaling

→ Human changes replica count.

HPA

→ Changes number of Pods.

VPA

→ Adjusts CPU/Memory resources for Pods.

Cluster Autoscaler

→ Changes number of Nodes.

# **Scheduling — Easy Memory**

Scheduler

→ Chooses a Node for a Pod.

nodeSelector

→ Simple Node label requirement.

nodeAffinity

→ Flexible Node selection.

podAffinity

→ Keep related Pods together.

podAntiAffinity

→ Keep certain Pods apart.

Taint

→ Keeps unwanted Pods away.

Toleration

→ Allows a Pod to tolerate a matching taint.

PDB

→ Helps limit voluntary disruptions.

# **Final Operations Flow**

Kubernetes Operations

│

┌────────────────┼────────────────┐

↓ ↓ ↓

``` bash
kubectl Scaling Scheduling
```

│ │ │

┌────┼────┐ ┌────┼────┐ ┌────┼────┐

↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

get describe logs HPA VPA Cluster Affinity

Autoscaler Taints

    │
    ↓
    Troubleshooting

│

┌──────┼────────┬────────┐

↓ ↓ ↓ ↓

Pods Services Network Nodes

↓ ↓ ↓ ↓

Logs Endpoints DNS Resources

Events Ingress Policy Pressure

## **SECTION 11 — Observability & Advanced Kubernetes**

### 

## **1. Kubernetes Observability**

**Observability** means understanding what is happening inside your Kubernetes cluster and applications.

It helps answer questions such as:

- Is the application healthy?
- How much CPU is being used?
- How much memory is being used?
- Why did a Pod fail?
- Why is the application slow?
- Which service is causing the problem?
- Where did an application request fail?

### **Main Observability Areas**

Metrics

Logs

Traces

These are commonly called the **Three Pillars of Observability**.

# **Three Pillars of Observability**

## **2. Metrics**

**Metrics** are numerical measurements collected over time.

Examples:

CPU usage

Memory usage

Request count

Request latency

Error rate

Pod count

Node usage

Example:

CPU Usage = 72%

Memory Usage = 4 GB

Requests/sec = 500

Metrics are useful for:

- Monitoring
- Dashboards
- Alerting
- Autoscaling
- Performance analysis

## **3. Logs**

**Logs** are records of events produced by applications and system components.

Example:

2026-09-26 10:30:21

User login successful

Logs can help identify:

- Application errors
- Exceptions
- Failed requests
- Startup problems
- Authentication problems

Kubernetes provides commands such as:

``` bash
kubectl logs <pod-name>
```

## **4. Traces**

**Traces** show how a request travels through a distributed application.

For example:

    User
    ↓
    Frontend
    ↓
    API
    ↓
    Payment Service
    ↓
    Database

Tracing helps identify:

- Where requests are slow
- Which service failed
- Which service called another service
- How long each operation took

# **Kubernetes Metrics**

## **5. Kubernetes Metrics**

Metrics provide numerical information about the health and performance of the cluster.

Metrics can come from:

- Nodes
- Pods
- Containers
- Applications
- Kubernetes components

## **6. CPU Metrics**

CPU metrics show how much processing capacity is being used.

Example:

Pod CPU:

250m

Node CPU:

70%

Remember:

1000m = 1 CPU

500m = 0.5 CPU

250m = 0.25 CPU

CPU metrics can help with:

- Performance monitoring
- HPA
- Capacity planning
- Troubleshooting

## **7. Memory Metrics**

Memory metrics show RAM usage.

Example:

Pod:

Memory = 400Mi

Node:

Memory = 70%

High memory usage can cause:

- OOMKilled containers
- Node memory pressure
- Application performance problems

## **8. Network Metrics**

Network metrics provide information about network activity.

Examples:

- Bytes received
- Bytes transmitted
- Network errors
- Packets
- Request traffic

Network metrics can help identify:

- High traffic
- Network bottlenecks
- Communication problems
- Unusual traffic patterns

## **9. Pod Metrics**

Pod metrics provide information about individual Pods.

Examples:

CPU usage

Memory usage

Network traffic

Container restarts

Useful command:

``` bash
kubectl top pods
```

## **10. Node Metrics**

Node metrics show resource usage at the Node level.

Examples:

- CPU
- Memory
- Disk
- Network

Useful command:

``` bash
kubectl top nodes
```

### **Example**

Node 1

CPU: 45%

Memory: 60%

Node 2

CPU: 80%

Memory: 75%

## **11. Application Metrics**

Application metrics are measurements generated by the application itself.

Examples:

HTTP Requests

Request Duration

Error Count

Active Users

Database Queries

Orders Processed

Example:

    http_requests_total = 150000
    http_errors_total = 320

Application metrics are often more useful for understanding application health than CPU and memory alone.

# **Prometheus**

## **12. Prometheus**

**Prometheus** is a monitoring and metrics system commonly used with Kubernetes.

It collects and stores time-series metrics.

### **Basic Flow**

    Application / Kubernetes
    ↓
    Metrics
    ↓
    Prometheus
    ↓
    Store & Query
    ↓
    Grafana / Alerts

## **13. What is Prometheus?**

Prometheus is an open-source monitoring system.

It is designed to:

- Collect metrics
- Store time-series data
- Query metrics
- Create alerts
- Monitor infrastructure
- Monitor applications

Prometheus stores measurements with timestamps and labels.

## **14. Metrics Collection**

Prometheus commonly collects metrics by **scraping** HTTP endpoints.

Example:

    Prometheus
    ↓
    GET /metrics
    ↓
    Application

The application exposes metrics:

http_requests_total 500

Prometheus periodically collects them.

### **Kubernetes Monitoring**

Prometheus can collect metrics from:

- Kubernetes Nodes
- Pods
- Applications
- Kubernetes components
- Exporters

## **15. Prometheus Targets**

A **target** is something Prometheus collects metrics from.

Examples:

Application

Node exporter

Kubernetes component

Database exporter

Example:

Prometheus

├── app-1

├── app-2

├── node-1

└── node-2

Prometheus can discover Kubernetes targets using Kubernetes service discovery mechanisms.

## **16. PromQL Basics**

**PromQL = Prometheus Query Language**

PromQL is used to query Prometheus metrics.

Example:

up

This can show whether monitored targets are up.

Another example:

rate(http_requests_total\[5m\])

This calculates the per-second rate of increase of the counter over the last 5 minutes.

### **Basic Concepts**

PromQL can work with:

- Metrics
- Labels
- Time ranges
- Functions
- Aggregations

Example metric:

http_requests_total

with labels:

    method="GET"
    status="200"

## **17. Alerting**

Prometheus can evaluate alert rules.

Example concept:

    CPU > 80%
    ↓
    Alert Rule
    ↓
    Alert

Alerts can be used for conditions such as:

- High CPU
- High memory
- Application down
- High error rate
- High request latency
- Disk problems

Prometheus commonly works with **Alertmanager** for handling and routing alerts.

# **Grafana**

## **18. Grafana**

**Grafana** is a visualization and dashboard platform.

It can display data from sources such as:

- Prometheus
- Loki
- Elasticsearch
- Many other data sources

### **Basic Flow**

    Prometheus
    ↓
    Grafana
    ↓
    Dashboard

## **19. What is Grafana?**

Grafana helps turn monitoring data into visual dashboards.

Instead of reading:

CPU = 82

Memory = 75

Requests = 1200

you can view:

CPU ████████████

Memory █████████

Requests ███████████████

Grafana is useful for:

- Visualization
- Monitoring
- Dashboards
- Troubleshooting
- Alert visualization

## **20. Dashboards**

A Grafana dashboard contains panels showing monitoring data.

Examples:

- CPU usage
- Memory usage
- Pod count
- Request rate
- Error rate
- Network traffic
- Application latency

You can create dashboards for:

Cluster

Node

Namespace

Application

Service

Pod

## **21. Kubernetes Dashboards**

A Kubernetes monitoring dashboard can provide an overview of:

    Cluster
    ↓
    Nodes
    ↓
    Namespaces
    ↓
    Deployments
    ↓
    Pods
    ↓
    Applications

A dashboard can help you quickly identify:

- High CPU
- High memory
- Failed Pods
- Restarting containers
- Traffic changes
- Application errors

## **22. Metrics Visualization**

Visualization makes large amounts of monitoring data easier to understand.

Example:

CPU Usage

100% ┤ ╭──╮

80% ┤ ╭──╯ ╰─

60% ┤───────╯

40% ┤

└────────────────

Time

This makes it easier to see:

- Spikes
- Trends
- Drops
- Long-term patterns

# **Kubernetes Logging**

## **23. Container Logs**

Containers generate logs while applications are running.

You can view Pod logs using:

``` bash
kubectl logs <pod-name>
```

Example:

``` bash
kubectl logs web-app-123
```

For multiple containers:

``` bash
kubectl logs <pod-name> -c <container-name>
```

### **Limitation**

`kubectl logs` is useful for troubleshooting, but it is not a complete centralized logging solution.

## **24. Node Logs**

Nodes also produce system-level logs.

Examples:

- kubelet logs
- Container runtime logs
- Operating system logs
- Kernel logs

These can help troubleshoot:

- Node failures
- Container runtime problems
- Networking problems
- Storage problems

## **25. Centralized Logging**

In a larger cluster, collecting logs from individual Pods manually becomes difficult.

Centralized logging collects logs into a central system.

Example:

Pod 1 ─┐

Pod 2 ─┤

Pod 3 ─┼──→ Log Collector → Central Log System

Pod 4 ─┤

Pod 5 ─┘

Benefits:

- Search logs in one place
- Keep logs longer
- Analyze many applications
- Troubleshoot distributed applications

## **26. Log Aggregation**

**Log aggregation** means collecting logs from multiple sources into a centralized location.

A common architecture:

    Applications
    ↓
    Log Agent / Collector
    ↓
    Log Storage
    ↓
    Log Query
    ↓
    Dashboard

Common technologies include:

- Fluent Bit
- Fluentd
- OpenTelemetry Collector
- Loki
- Elasticsearch
- OpenSearch

# **Distributed Tracing**

## **27. What is Tracing?**

Tracing follows an individual request through a distributed application.

Example:

    User Request
    ↓
    Frontend
    ↓
    API
    ↓
    Order Service
    ↓
    Database

Tracing can show:

- Total request duration
- Time spent in each service
- Errors
- Service dependencies

## **28. Trace**

A **trace** represents the complete journey of a request.

Example:

Trace: Request \#12345

    Frontend
    ↓
    API
    ↓
    Payment
    ↓
    Database

The complete request is one trace.

## **29. Span**

A **span** represents one operation within a trace.

Example:

Trace

├── Frontend request

├── API request

├── Payment request

└── Database query

Each operation is a span.

### **Easy Memory**

Trace = Complete request journey

Span = One operation inside the journey

## **30. Request Flow**

Suppose a user places an order:

    User
    ↓
    Frontend
    ↓
    API Gateway
    ↓
    Order Service
    ↓
    Payment Service
    ↓
    Database

A trace can show:

Frontend 50ms

API 20ms

Order Service 80ms

Payment 900ms

Database 30ms

You can quickly identify that the Payment Service took most of the time.

# **OpenTelemetry**

## **31. OpenTelemetry**

**OpenTelemetry (OTel)** is an open-source observability framework for generating, collecting, and exporting telemetry.

It supports:

- Metrics
- Logs
- Traces

### **Basic Flow**

    Application
    ↓
    OpenTelemetry
    ↓
    Telemetry Collector
    ↓
    Backend

## **32. Metrics**

OpenTelemetry can collect and export application metrics.

Example:

Request Count

CPU-related application metrics

Request Duration

Error Count

## **33. Logs**

OpenTelemetry can collect and process logs.

Example:

    Application
    ↓
    Logs
    ↓
    OpenTelemetry Collector
    ↓
    Logging Backend

## **34. Traces**

OpenTelemetry can instrument applications and generate distributed traces.

Example:

    Request
    ↓
    Service A
    ↓
    Service B
    ↓
    Service C

OpenTelemetry can carry trace information across these services.

## **35. Telemetry Collection**

**Telemetry** means data generated by systems that helps you understand their behavior.

Main telemetry types:

Metrics

Logs

Traces

An OpenTelemetry Collector can receive, process, and export telemetry.

Example:

    Applications
    ↓
    OpenTelemetry Collector
    ↓
    ┌──────────┬──────────┐

↓ ↓ ↓

Metrics Logs Traces

↓ ↓ ↓

Backend Backend Backend

# **Advanced Kubernetes**

## **36. Custom Resource Definitions — CRDs**

**CRD = Custom Resource Definition**

A CRD allows you to add a new type of resource to the Kubernetes API.

Normally Kubernetes has resources such as:

Pod

Deployment

Service

ConfigMap

Secret

A CRD can add something custom:

Database

Backup

Application

Certificate

### **Example Concept**

Normal Kubernetes:

kind: Deployment

Custom Kubernetes:

kind: MyDatabase

The custom resource can then be managed through the Kubernetes API.

## **37. Operators**

An **Operator** is software that extends Kubernetes to manage a particular application or system.

Operators combine:

- Kubernetes API
- Custom Resources
- Controllers
- Application-specific operational knowledge

Example:

    Database Operator
    ↓
    Manages Database
    ↓
    Create

Backup

Restore

Scale

Upgrade

Operators are especially common for stateful or complex systems.

## **38. Custom Controllers**

A controller continuously watches Kubernetes resources and works to make the actual state match the desired state.

Example:

    Desired State
    ↓
    Controller
    ↓
    Actual State

If there is a difference:

Desired:

3 Pods

Actual:

2 Pods

    Controller
    ↓
    Creates another Pod

This is the same general reconciliation idea used throughout Kubernetes.

## **39. Admission Webhooks**

Admission webhooks allow external services to participate in the Kubernetes admission process.

They can:

- Validate requests
- Modify requests

Example:

    User
    ↓
    API Server
    ↓
    Admission Webhook
    ↓
    Validate / Modify
    ↓
    Resource

They can be used to enforce organizational policies or automatically modify resources.

## **40. Extending Kubernetes API**

Kubernetes can be extended beyond its built-in resources.

Basic idea:

Kubernetes API

\+

    CRD
    ↓
    New Resource Type
    ↓
    Custom Controller
    ↓
    Custom Behavior

This allows Kubernetes to become a platform for managing more than just Pods and Services.

## **41. CRD → Custom Resource → Controller/Operator**

This is an important concept.

### **Step 1 — CRD**

Define a new resource type.

kind: MyDatabase

### **Step 2 — Custom Resource**

Create an actual object of that type.

``` yaml
apiVersion: example.com/v1
kind: MyDatabase
metadata:
name: production-db
spec:
replicas: 3
```

### **Step 3 — Controller / Operator**

The controller watches the custom resource.

    MyDatabase
    ↓
    Controller
    ↓
    Create / Manage database resources

### **Complete Flow**

    CRD
    ↓
    Defines new resource type
    ↓
    Custom Resource
    ↓
    Controller / Operator
    ↓
    Actual Kubernetes resources
    ↓
    Running application

# **Advanced Kubernetes Concepts**

## **42. Advanced Kubernetes Concepts**

After learning the core Kubernetes concepts, you can move toward more advanced areas.

### **Observability**

- Prometheus
- Grafana
- Alertmanager
- OpenTelemetry
- Centralized logging
- Distributed tracing

### **Application Management**

- Helm
- Kustomize
- Operators
- Custom Controllers
- CRDs

### **Security**

- RBAC
- NetworkPolicy
- Pod Security Standards
- Image scanning
- Secret management
- Admission policies

### **Networking**

- CNI
- Ingress
- Gateway API
- Service Mesh
- Advanced traffic management

### **Reliability**

- High Availability
- PodDisruptionBudget
- Multi-Node deployments
- Backup and restore
- Disaster recovery

### **Automation**

- GitOps
- Argo CD
- CI/CD
- Automated deployments
- Infrastructure as Code

# **Complete Observability Flow**

Kubernetes Cluster

│

┌────────────────┼────────────────┐

↓ ↓ ↓

Metrics Logs Traces

│ │ │

↓ ↓ ↓

Prometheus Log Collector OpenTelemetry

│ │ │

↓ ↓ ↓

Grafana Log Backend Trace Backend

│ │ │

└────────────────┼────────────────┘

    ↓
    Observability

# **Kubernetes Extension Flow**

    CRD
    ↓
    Custom Resource
    ↓
    Controller / Operator
    ↓
    Kubernetes API
    ↓
    Kubernetes Resources
    ↓
    Application

# **Quick Revision**

- **Observability** → Understand what is happening inside systems.
- **Metrics** → Numerical measurements.
- **Logs** → Records of events.
- **Traces** → Request journey through services.
- **Prometheus** → Metrics collection, storage, querying, and alert-rule evaluation.
- **PromQL** → Prometheus query language.
- **Alertmanager** → Handles and routes Prometheus alerts.
- **Grafana** → Visualization and dashboards.
- **Centralized Logging** → Collect logs into one central system.
- **Log Aggregation** → Combining logs from multiple sources.
- **Trace** → Complete request journey.
- **Span** → Individual operation inside a trace.
- **OpenTelemetry** → Framework for generating, collecting, and exporting telemetry.
- **CRD** → Adds custom resource types to Kubernetes.
- **Custom Resource** → An actual object created from a CRD.
- **Controller** → Reconciles desired and actual state.
- **Operator** → Controller/software that manages a specific application or system.
- **Admission Webhook** → External service that validates or modifies API requests.

# **Easy Memory**

Metrics → What is happening?

Logs → What happened?

Traces → Where did the request go?

Prometheus → Collect / Store / Query Metrics

Grafana → Visualize Metrics

OpenTelemetry → Collect / Process / Export Telemetry

CRD → Define a new Kubernetes resource

Custom Resource → Create that resource

Controller → Manage that resource

Operator → Application-specific controller

# **Complete Kubernetes Learning Picture**

Kubernetes

│

├── Fundamentals

│ ├── Cluster

│ ├── Node

│ ├── Pod

│ └── Desired State

│

├── Workloads

│ ├── Deployment

│ ├── StatefulSet

│ ├── DaemonSet

│ ├── Job

│ └── CronJob

│

├── Networking

│ ├── Service

│ ├── Ingress

│ ├── Gateway API

│ └── NetworkPolicy

│

├── Storage

│ ├── PV

│ ├── PVC

│ ├── StorageClass

│ └── CSI

│

├── Configuration

│ ├── ConfigMap

│ └── Secret

│

├── Security

│ ├── Authentication

│ ├── RBAC

│ ├── Pod Security

│ └── Network Security

│

├── Package Management

│ ├── Helm

│ └── Kustomize

│

├── Operations

│ ├── kubectl

│ ├── Scaling

│ ├── Scheduling

│ └── Troubleshooting

│

├── Observability

│ ├── Metrics

│ ├── Logs

│ ├── Traces

│ ├── Prometheus

│ ├── Grafana

│ └── OpenTelemetry

│

└── Advanced

├── CRDs

├── Controllers

├── Operators

├── Admission Webhooks

└── GitOps

## **SECTION 12 — Production Kubernetes, Cloud, EKS & DevOps Integration**

### 

## **1. Production Kubernetes**

Production Kubernetes means running Kubernetes for **real applications and real users**, not just for learning or testing.

A production cluster needs to be:

- Highly available
- Secure
- Scalable
- Fault tolerant
- Observable
- Backed up
- Easy to update
- Easy to recover
- Automated

A simple production environment can look like:

    Users
    ↓
    Load Balancer
    ↓
    Ingress
    ↓
    Kubernetes Service
    ↓
    Pods
    ↓
    Database / Cache / External Services

# **2. High Availability**

High Availability, or **HA**, means keeping an application available even when some infrastructure fails.

For example:

Pod 1

Pod 2

Pod 3

If Pod 1 fails:

Pod 1 ❌

Pod 2 ✅

Pod 3 ✅

Users can still use the application.

HA can be achieved using:

- Multiple Pods
- Multiple Worker Nodes
- Multiple Availability Zones
- Multiple Control Plane components
- Load Balancing
- Replication
- Health checks
- Automatic recovery

The main goal is:

    Failure of one component
    ↓
    System continues working

# **3. Multiple Control Plane Nodes**

In a self-managed production Kubernetes cluster, the Control Plane can be distributed across multiple machines.

For example:

    Load Balancer
    ↓
    ┌─────────┼─────────┐

↓ ↓ ↓

Master 1 Master 2 Master 3

This helps prevent one Control Plane machine from becoming a single point of failure.

Important Control Plane components include:

- kube-apiserver
- etcd
- kube-scheduler
- kube-controller-manager

In highly available setups, these components are designed to work together.

# **4. Worker Nodes**

Worker Nodes are the machines where application workloads normally run.

A Worker Node can contain:

- kubelet
- Container Runtime
- kube-proxy or equivalent networking components
- Pods
- Application containers

Example:

Worker Node 1

├── Pod A

├── Pod B

└── Pod C

Worker Node 2

├── Pod D

├── Pod E

└── Pod F

If one Worker Node fails, Kubernetes can recreate workloads on other suitable Nodes, depending on the workload and available resources.

# **5. Fault Tolerance**

Fault tolerance means the system can continue operating when some components fail.

Possible failures include:

- Pod failure
- Container failure
- Node failure
- Availability Zone failure
- Network failure
- Storage failure
- Application failure

Kubernetes provides several mechanisms that help with fault tolerance:

- ReplicaSets
- Deployments
- StatefulSets
- Health probes
- Scheduling
- Pod anti-affinity
- PodDisruptionBudgets
- Multiple Nodes
- Multiple Availability Zones

Example:

    Application
    ↓
    3 Pods
    ↓
    Node 1 → Pod 1

Node 2 → Pod 2

Node 3 → Pod 3

If Node 2 fails:

Node 1 → Pod 1

Node 2 → ❌

Node 3 → Pod 3

Kubernetes can recreate Pod 2 on another suitable Node.

# **6. Disaster Recovery**

Disaster Recovery, or **DR**, means preparing for a serious failure and having a way to restore the system.

Examples:

- Complete cluster failure
- Data-center failure
- Availability Zone failure
- Accidental deletion
- Data corruption
- Security incident

A DR plan should answer:

- What needs to be backed up?
- Where are backups stored?
- How often are backups created?
- How long should backups be retained?
- How will the system be restored?
- How long can recovery take?

Two important concepts are:

### **RPO**

**Recovery Point Objective**

How much data loss is acceptable?

Example:

RPO = 1 hour

This means the organization is prepared for potentially losing up to about one hour of recent data.

### **RTO**

**Recovery Time Objective**

How quickly must the system be restored?

Example:

RTO = 30 minutes

This means the target is to restore service within about 30 minutes.

# **7. Backup**

Backup means creating copies of important data and configuration so they can be recovered later.

Possible backup targets include:

- Kubernetes cluster state
- etcd data
- Persistent Volume data
- Database data
- Kubernetes manifests
- Helm configuration
- Git repositories
- Secrets/configuration where appropriate

For Kubernetes, tools such as **Velero** can be used for backup and recovery workflows.

Important:

Backup ≠ Disaster Recovery

Backup is one part of a complete Disaster Recovery strategy.

# **8. Restore**

Restore means recovering the system from a backup.

A simplified process:

    Failure
    ↓
    Identify backup
    ↓
    Restore cluster/configuration
    ↓
    Restore application data
    ↓
    Deploy applications
    ↓
    Verify application

A backup is only useful if it can actually be restored.

Therefore:

- Test restores regularly.
- Verify backup integrity.
- Document recovery procedures.
- Keep backups separate from the system being protected.

# **9. Cluster Upgrades**

Kubernetes clusters need regular upgrades for:

- Security fixes
- Bug fixes
- New features
- Supported versions
- Component compatibility

A production upgrade should be planned carefully.

Basic process:

    Check current version
    ↓
    Read upgrade documentation
    ↓
    Check compatibility
    ↓
    Backup
    ↓
    Upgrade
    ↓
    Verify Nodes
    ↓
    Verify workloads
    ↓
    Verify networking
    ↓
    Verify applications

Never treat a production upgrade as simply:

install new version

Always consider:

- API changes
- Deprecated APIs
- Add-ons
- Container runtime
- CNI
- CSI drivers
- Ingress/Gateway components
- Helm charts
- Application compatibility

# **10. Kubernetes Production Security**

Production Kubernetes security should protect:

    Users
    ↓
    API
    ↓
    Cluster
    ↓
    Pods
    ↓
    Containers
    ↓
    Data

Important security areas include:

- Authentication
- Authorization
- RBAC
- NetworkPolicy
- Pod Security
- Secret management
- Image security
- Supply chain security
- Encryption
- Audit logging
- Least privilege

# **11. Image Security**

Containers normally start from container images.

Example:

    Application Code
    ↓
    Docker Build
    ↓
    Container Image
    ↓
    Registry
    ↓
    Kubernetes

An insecure image can introduce vulnerabilities into the application.

Image security includes:

- Use trusted base images
- Keep images updated
- Scan images
- Avoid unnecessary packages
- Do not store secrets inside images
- Use specific image versions
- Protect the registry

# **12. Vulnerability Scanning**

Vulnerability scanning searches container images for known security vulnerabilities.

A popular tool is **Trivy**.

Example:

    trivy image myapp:1.0

Typical CI/CD flow:

    Build Image
    ↓
    Trivy Scan
    ↓
    No critical issues
    ↓
    Push Image

If serious vulnerabilities are detected, the pipeline can be configured to stop before pushing or deploying the image.

# **13. RBAC**

RBAC means:

**Role-Based Access Control**

It controls:

    Who
    ↓
    Can do what
    ↓
    On which resource

Example:

    Developer
    ↓
    Can read Pods
    ↓
    In development Namespace

RBAC components include:

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding
- ServiceAccount

Production principle:

Give only the permissions that are required.

This is called **Least Privilege**.

# **14. NetworkPolicy**

NetworkPolicy controls which Pods can communicate with other Pods or external destinations.

Example:

    Frontend
    ↓
    API
    ↓
    Database

You may want:

Frontend → API ✅

API → Database ✅

Frontend → Database ❌

NetworkPolicy can help implement this kind of traffic restriction.

# **15. Pod Security**

Pod security controls what workloads are allowed to do.

Examples of security concerns:

- Privileged containers
- Host filesystem access
- Host networking
- Linux capabilities
- Running as root
- Unsafe volume types

Kubernetes Pod Security Standards define three levels:

### **Privileged**

Very few restrictions.

Useful for workloads that genuinely require elevated permissions.

### **Baseline**

Blocks many common privilege-escalation configurations.

### **Restricted**

Provides stronger security requirements.

Production workloads should generally avoid unnecessary privileges and use the strongest practical restrictions.

# **16. Secret Management**

Applications often require sensitive information:

- Database passwords
- API keys
- Tokens
- Certificates

Kubernetes Secrets can store sensitive configuration.

However:

Base64 ≠ Encryption

Base64 is only encoding.

Production environments may use external secret-management systems such as:

- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- Google Secret Manager

The important goal is:

    Application
    ↓
    Secure Secret Access
    ↓
    Secret Management System

Do not place passwords directly inside Dockerfiles or Git repositories.

# **17. Supply Chain Security**

Software supply chain security protects the complete path from source code to deployed application.

Example:

    Developer
    ↓
    Git
    ↓
    Build
    ↓
    Dependencies
    ↓
    Container Image
    ↓
    Registry
    ↓
    Deployment

Security can be added at each stage:

- Source-code scanning
- Dependency scanning
- Secret scanning
- Image scanning
- Trusted base images
- Signed images
- Protected registries
- Deployment policies

The goal is to know:

Where did this software come from?

What was used to build it?

Was it modified?

Is it safe to deploy?

# **18. Container Registries**

A container registry stores container images.

Example:

    Docker Build
    ↓
    Container Image
    ↓
    Container Registry
    ↓
    Kubernetes

Popular registries include:

- Docker Hub
- Amazon ECR
- GitHub Container Registry
- Azure Container Registry
- Google Artifact Registry
- Private registries

# **19. Docker Hub**

**Docker Hub** is a public container image registry.

Example:

``` bash
docker pull nginx
```

You can push your own image:

``` bash
docker login
docker tag myapp:1.0 username/myapp:1.0
docker push username/myapp:1.0
```

Docker Hub can be used for:

- Public images
- Private images
- Image distribution
- Team collaboration

# **20. Amazon ECR**

**Amazon Elastic Container Registry (ECR)** is AWS's container image registry.

Typical AWS flow:

    Developer
    ↓
    Docker Build
    ↓
    Trivy Scan
    ↓
    Amazon ECR
    ↓
    Amazon EKS

Example:

    my-app:1.0
    ↓
    AWS ECR
    ↓
    EKS Pod

ECR integrates closely with AWS services and IAM.

# **21. Image Tagging**

An image tag identifies a particular image reference.

Examples:

myapp:latest

myapp:1.0

myapp:1.1

myapp:v2.0.0

For production deployments, specific version tags are generally easier to track than relying only on:

latest

# **22. Image Versioning**

Image versioning helps identify exactly which application version is deployed.

Example:

myapp:1.0.0

myapp:1.1.0

myapp:2.0.0

A CI/CD pipeline might produce:

myapp:build-152

or:

myapp:git-a1b2c3d

This makes deployment history easier to understand.

# **23. Private Registries**

A private registry restricts access to authorized users or systems.

Examples:

- Amazon ECR
- Azure Container Registry
- Google Artifact Registry
- Private Docker Registry

Typical production flow:

    Jenkins
    ↓
    Build Image
    ↓
    Scan Image
    ↓
    Private Registry
    ↓
    Kubernetes

# **24. Cloud Kubernetes**

Cloud providers offer managed Kubernetes services.

The three major examples are:

- Amazon EKS
- Google GKE
- Azure AKS

These services reduce the amount of Kubernetes infrastructure that you need to operate yourself.

# **25. Managed Kubernetes**

Managed Kubernetes means the cloud provider operates important parts of the Kubernetes platform for you.

Instead of manually creating and maintaining everything:

    You
    ↓
    Cloud Kubernetes Service
    ↓
    Kubernetes Cluster

The exact division of responsibilities differs between providers.

You still need to manage many things such as:

- Applications
- Kubernetes resources
- Permissions
- Networking configuration
- Workloads
- Security
- Monitoring
- Data

# **26. Amazon EKS**

**Amazon Elastic Kubernetes Service (EKS)** is AWS's managed Kubernetes service.

It allows you to run Kubernetes workloads using AWS infrastructure.

Basic architecture:

AWS

│

├── EKS Control Plane

│

├── Worker Nodes

│ ├── Pod

│ ├── Pod

│ └── Pod

│

├── ECR

├── VPC

├── Load Balancer

├── EBS

└── EFS

EKS is useful when you want to combine:

Kubernetes + AWS

# **27. Google GKE**

**Google Kubernetes Engine (GKE)** is Google's managed Kubernetes service.

Basic concept:

    Google Cloud
    ↓
    GKE
    ↓
    Kubernetes
    ↓
    Workloads

GKE is closely integrated with Google Cloud services.

# **28. Azure AKS**

**Azure Kubernetes Service (AKS)** is Microsoft's managed Kubernetes service.

Basic concept:

    Azure
    ↓
    AKS
    ↓
    Kubernetes
    ↓
    Applications

AKS integrates Kubernetes with Azure services such as networking, identity, storage, and monitoring.

# **29. Managed Control Plane**

In a managed Kubernetes service such as EKS, the cloud provider manages the Kubernetes Control Plane infrastructure.

Conceptually:

    AWS manages
    ↓
    Control Plane
    You manage
    ↓
    Applications

Worker capacity/configuration

Kubernetes resources

The exact responsibility depends on the service and configuration.

This is one of the major advantages of managed Kubernetes.

# **30. Amazon EKS Architecture**

A simplified EKS architecture looks like:

AWS

│

┌─────────┴─────────┐

│ │

EKS Control Plane AWS Services

│ ├── ECR

│ ├── IAM

│ ├── EBS

│ └── Load Balancer

    │
    ↓
    Worker Nodes

│

┌────┼────┐

↓ ↓ ↓

Pod Pod Pod

# **31. EKS Control Plane**

The EKS Control Plane provides the Kubernetes control functionality.

Important components conceptually include:

- Kubernetes API
- Scheduler
- Controllers
- Cluster state management

AWS manages the underlying Control Plane infrastructure.

You interact with it using tools such as:

``` bash
kubectl
```

and AWS tooling such as:

    aws eks

# **32. Managed Node Groups**

EKS Managed Node Groups are worker Nodes managed through EKS/AWS.

AWS handles parts of the Node lifecycle and management.

Example:

    EKS
    ↓
    Managed Node Group
    ↓
    EC2 Instances
    ↓
    Pods

Advantages include:

- Easier Node management
- AWS integration
- Easier updates
- Auto Scaling integration
- Less manual infrastructure work

# **33. Self-Managed Nodes**

With self-managed Nodes, you have more direct responsibility for the worker infrastructure.

Example:

    EKS Control Plane
    ↓
    Your EC2 Nodes
    ↓
    Pods

You may need to manage more of:

- EC2 configuration
- AMIs
- Node updates
- Scaling
- Lifecycle
- Bootstrapping

This gives more control but also increases operational responsibility.

# **34. EKS Networking**

EKS networking integrates Kubernetes with AWS networking.

A simplified architecture:

AWS VPC

│

├── Public Subnet

│

└── Private Subnets

│

├── Node

│ ├── Pod

│ └── Pod

│

└── Node

├── Pod

└── Pod

Networking involves:

- VPC
- Subnets
- Security Groups
- Route Tables
- Internet/NAT connectivity
- Load Balancers
- Kubernetes Services
- CNI

# **35. VPC Integration**

An EKS cluster can run its worker Nodes inside an AWS VPC.

The VPC provides:

- Network isolation
- Subnets
- Routing
- Security Groups
- Connectivity to AWS services

Example:

VPC

│

├── Public Subnet

│

└── Private Subnet

│

└── EKS Nodes

│

└── Pods

# **36. IAM**

**AWS Identity and Access Management (IAM)** controls access to AWS resources.

For example:

    User / Workload
    ↓
    IAM
    ↓
    AWS Resources

In EKS environments, IAM can be used to control access to AWS resources from workloads and administrators.

Example:

    Pod
    ↓
    AWS IAM permissions
    ↓
    S3 / ECR / Secrets Manager

A major principle is:

Least Privilege

Only give the required permissions.

# **37. AWS Load Balancers**

AWS provides load-balancing services that can expose Kubernetes applications to users.

A simplified flow:

    Internet
    ↓
    AWS Load Balancer
    ↓
    Kubernetes Service
    ↓
    Pods

Depending on the architecture, Kubernetes Services and Ingress/Gateway resources can integrate with AWS load-balancing components.

# **38. Amazon ECR**

ECR stores the container images used by EKS workloads.

Example:

    Jenkins
    ↓
    Docker Build
    ↓
    Trivy
    ↓
    ECR
    ↓
    EKS
    ↓
    Pod

The Pod pulls its required image from the registry.

# **39. Amazon EBS**

**Amazon Elastic Block Store (EBS)** provides block storage for AWS workloads.

In Kubernetes, EBS can be used through the appropriate CSI driver.

Conceptually:

    Pod
    ↓
    PVC
    ↓
    PV
    ↓
    EBS Volume

EBS is commonly useful for workloads that need persistent block storage.

# **40. Amazon EFS**

**Amazon Elastic File System (EFS)** provides shared file storage.

It can be used with Kubernetes through the appropriate CSI driver.

Conceptually:

Pod 1 ──┐

├── EFS

Pod 2 ──┤

│

Pod 3 ──┘

This can be useful when multiple workloads need shared filesystem access.

# **41. EKS Add-ons**

EKS add-ons provide important cluster functionality through AWS-supported integrations.

Examples can include:

- Amazon VPC CNI
- CoreDNS
- kube-proxy
- Amazon EBS CSI driver

Add-ons help provide:

- Networking
- DNS
- Kubernetes networking functionality
- Storage integration

Always check compatibility between the EKS/Kubernetes version and the add-on version before upgrading.

# **42. Kubernetes + AWS Architecture**

A typical AWS Kubernetes architecture can look like:

Internet

    │
    ↓
    AWS Load Balancer
    │
    ↓
    Kubernetes

Service

│

┌──────────┴──────────┐

↓ ↓

Pod Pod

│ │

    └──────────┬──────────┘
    ↓
    Application

│

┌───────┴───────┐

↓ ↓

EBS EFS

AWS infrastructure surrounds and integrates with Kubernetes.

# **43. AWS VPC → EKS → Nodes → Pods → Services/Load Balancer → Users**

A simplified complete flow:

    Users
    ↓
    Internet
    ↓
    AWS Load Balancer
    ↓
    Kubernetes Service
    ↓
    EKS Nodes
    ↓
    Pods
    ↓
    Application

Infrastructure:

    AWS VPC
    ↓
    EKS
    ↓
    Nodes
    ↓
    Pods

Storage and other AWS services can be connected to the application:

Pods

├── ECR → Container Images

├── EBS → Block Storage

├── EFS → Shared File Storage

├── Secrets Manager → Secrets

└── IAM → AWS Permissions

# **44. CI/CD + Kubernetes**

CI/CD automates the process of taking code from Git and delivering it to Kubernetes.

A typical pipeline:

    Developer
    ↓
    GitHub
    ↓
    Jenkins
    ↓
    SonarQube
    ↓
    Docker
    ↓
    Trivy
    ↓
    ECR
    ↓
    GitOps Repository
    ↓
    Argo CD
    ↓
    Kubernetes / EKS
    ↓
    Load Balancer
    ↓
    Users

# **45. GitHub**

GitHub stores source code and application configuration.

Example:

    Developer
    ↓
    git push
    ↓
    GitHub

GitHub can contain:

Application Code

Dockerfile

Kubernetes manifests

Helm charts

CI/CD configuration

# **46. Jenkins**

Jenkins automates CI/CD tasks.

A Jenkins pipeline may:

- Checkout code
- Build application
- Run tests
- Run SonarQube
- Build Docker image
- Run Trivy
- Push image to ECR
- Update deployment configuration

Example:

    GitHub
    ↓
    Webhook
    ↓
    Jenkins

# **47. SonarQube**

SonarQube analyzes source code quality.

It can identify:

- Bugs
- Code smells
- Security issues
- Duplicated code
- Maintainability problems

Example:

    GitHub
    ↓
    Jenkins
    ↓
    SonarQube
    ↓
    Quality Check

# **48. Docker**

Docker is commonly used to build container images.

Example:

docker build -t myapp:1.0 .

The result is:

    Application
    ↓
    Dockerfile
    ↓
    Container Image

The image can then be scanned and pushed to a registry.

# **49. Trivy**

Trivy scans container images for vulnerabilities.

Example:

    trivy image myapp:1.0

Pipeline:

    Docker Build
    ↓
    Trivy Scan
    ↓
    Security Check
    ↓
    ECR

# **50. Container Registry / ECR**

After building and scanning an image, Jenkins can push it to ECR.

Example:

    Docker Image
    ↓
    Trivy
    ↓
    Amazon ECR

EKS can later pull the image from ECR.

# **51. GitOps Repository**

A GitOps repository stores the desired deployment configuration.

For example:

GitOps Repository

├── deployment.yaml

├── service.yaml

└── ingress.yaml

The deployment might specify:

image: 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:1.5

When the image version changes, the GitOps repository is updated.

# **52. Argo CD**

Argo CD is a GitOps continuous delivery tool for Kubernetes.

Its job is approximately:

    Git Repository
    ↓
    Argo CD
    ↓
    Kubernetes

Argo CD compares:

Desired State in Git

VS

Actual State in Kubernetes

If they are different, Argo CD can synchronize the cluster toward the desired configuration.

# **53. Kubernetes / EKS**

Argo CD deploys the desired Kubernetes resources into the cluster.

Example:

    GitOps Repository
    ↓
    Argo CD
    ↓
    EKS
    ↓
    Deployment
    ↓
    ReplicaSet
    ↓
    Pods

The Kubernetes controllers then maintain the desired state.

# **54. Service / Ingress / Load Balancer**

The application needs a way for users to reach it.

A common flow is:

    Users
    ↓
    Load Balancer
    ↓
    Ingress
    ↓
    Service
    ↓
    Pods

The exact architecture can vary depending on whether you use:

- Service type LoadBalancer
- Ingress
- Gateway API
- AWS Load Balancer integrations

# **55. GitOps**

GitOps means using Git as the source of truth for desired infrastructure or application state.

Simple idea:

Git = Desired State

For example:

Git says:

``` yaml
replicas: 3
image: myapp:2.0
```

Kubernetes should eventually match that state.

# **56. Desired State in Git**

Example:

    spec:
    replicas: 3

This means the desired state is:

3 Pods

If one Pod fails:

Desired = 3

Actual = 2

Kubernetes controllers work to return to:

Desired = 3

Actual = 3

GitOps adds Git as the source of that desired configuration.

# **57. Argo CD**

Argo CD continuously monitors the Git repository.

Example:

Git

│

    │ desired state
    ↓
    Argo CD

│

    │ synchronize
    ↓
    Kubernetes

If someone changes the deployment configuration in Git:

``` yaml
image: myapp:1.0
to:
image: myapp:2.0
```

Argo CD can detect the difference and synchronize the application.

# **58. Continuous Reconciliation**

Reconciliation means continuously comparing:

    Desired State
    ↓
    Actual State

Example:

Git:

replicas = 3

Kubernetes:

replicas = 2

Argo CD detects the difference.

Then Kubernetes receives the required configuration.

The Kubernetes controllers create or maintain the required Pods.

# **59. Automated Synchronization**

Argo CD can be configured to automatically synchronize changes.

Flow:

    Developer
    ↓
    Git Commit
    ↓
    GitOps Repository
    ↓
    Argo CD detects change
    ↓
    Sync
    ↓
    Kubernetes

This reduces the need for manually running:

``` bash
kubectl apply -f deployment.yaml
```

for every deployment change.

# **60. Rollback**

If a deployment causes a problem, the application can be returned to a previous known configuration.

Example:

    Version 1.0
    ↓
    Version 1.1
    ↓
    Version 1.2 ❌

Rollback:

    Version 1.2
    ↓
    Version 1.1

With GitOps, rollback can often be performed by reverting the Git change.

The important principle is:

Git history = Deployment history

# **61. Infrastructure as Code**

Infrastructure as Code, or **IaC**, means defining infrastructure using code/configuration instead of manually creating everything through a GUI.

Examples:

- Terraform
- AWS CloudFormation

Instead of manually creating:

VPC

Subnet

EC2

Security Group

Load Balancer

you define them as code.

# **62. Terraform**

Terraform is an Infrastructure as Code tool.

Example concept:

    Terraform Code
    ↓
    Terraform
    ↓
    AWS Infrastructure

Terraform can manage resources across multiple cloud providers and platforms.

# **63. CloudFormation**

AWS CloudFormation is AWS's Infrastructure as Code service.

Example:

    CloudFormation Template
    ↓
    CloudFormation
    ↓
    AWS Resources

For an AWS lab, CloudFormation can create resources such as:

- VPC
- Subnets
- Security Groups
- EC2
- RDS
- S3
- IAM resources

# **64. Kubernetes Manifests**

Kubernetes manifests define Kubernetes resources.

Examples:

Deployment

Service

ConfigMap

Secret

Ingress

PVC

Example:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: myapp
spec:
replicas: 3
```

Kubernetes reads this configuration and works toward the desired state.

# **65. Helm**

Helm packages Kubernetes applications into reusable Charts.

Example:

Helm Chart

├── Deployment

├── Service

├── ConfigMap

└── Ingress

Instead of maintaining many separate YAML files manually, Helm allows reusable templates and configurable values.

Example:

``` bash
helm install myapp ./my-chart
```

Helm can also be used with GitOps tools such as Argo CD.

# **66. Git**

Git provides version control.

It tracks changes to:

- Application code
- Kubernetes manifests
- Helm charts
- Terraform code
- CloudFormation templates
- Configuration

Example:

    Change
    ↓
    Git Commit
    ↓
    Git History

This makes it easier to:

- Review changes
- Track history
- Collaborate
- Roll back
- Audit changes

# **67. Production Observability**

Production applications need continuous monitoring.

The three major observability areas are:

- Metrics
- Logs
- Traces

And another important part is:

- Alerts

# **68. Prometheus**

Prometheus collects and stores metrics.

Example metrics:

CPU usage

Memory usage

Request rate

Error rate

Pod count

Node health

Basic flow:

    Application / Kubernetes
    ↓
    Prometheus
    ↓
    Metrics

# **69. Grafana**

Grafana visualizes metrics and other observability data.

Example:

    Prometheus
    ↓
    Grafana
    ↓
    Dashboard

A production dashboard might display:

CPU Usage

Memory Usage

Request Rate

Error Rate

Pod Count

Node Health

# **70. Logs**

Logs record application and system events.

Example:

    Application
    ↓
    Logs
    ↓
    Log Collector
    ↓
    Centralized Logging

Kubernetes provides basic log access through:

``` bash
kubectl logs <pod-name>
```

Production systems commonly use centralized logging so logs can be searched across many Pods and Nodes.

# **71. Traces**

Distributed tracing follows a request across multiple services.

Example:

    User Request
    ↓
    Frontend
    ↓
    API
    ↓
    Order Service
    ↓
    Payment Service
    ↓
    Database

Tracing helps identify where a request spends time or where an error occurs.

OpenTelemetry is commonly used to generate and collect telemetry.

# **72. Alerts**

Alerts notify engineers when important conditions occur.

Examples:

CPU too high

Memory too high

Pod unavailable

Node NotReady

High error rate

Application latency too high

Disk nearly full

Example:

    Prometheus
    ↓
    Alert Rule
    ↓
    Alertmanager
    ↓
    Notification

Alerts should focus on conditions that require action rather than generating unnecessary noise.

# **73. Production Application Architecture**

A typical production application can contain multiple components.

    Users
    ↓
    Load Balancer
    ↓
    Frontend
    ↓
    API
    ↓
    ┌───────┼───────┐

↓ ↓ ↓

Service A Service B Service C

│ │ │

    └───────┼───────┘
    ↓
    Database

│

Cache

# **74. Frontend**

The frontend is the part users interact with.

Examples:

- Web application
- Mobile backend interface
- React application
- Angular application
- Vue application

A frontend can run in Kubernetes using Pods.

Example:

    Internet
    ↓
    Load Balancer
    ↓
    Frontend Service
    ↓
    Frontend Pods

# **75. API**

The API provides communication between the frontend and backend services.

Example:

    Frontend
    ↓
    API
    ↓
    Backend Services

The API may handle:

- Authentication
- Requests
- Validation
- Business logic
- Communication with microservices

# **76. Microservices**

A microservices application divides functionality into separate services.

Example:

E-Commerce Application

│

├── User Service

├── Product Service

├── Order Service

├── Payment Service

└── Notification Service

Each service can be deployed independently.

Kubernetes is particularly useful for managing large numbers of containerized services.

# **77. Database**

The database stores persistent application data.

Examples:

- PostgreSQL
- MySQL
- MongoDB
- Redis for specific data structures/use cases

A production database needs:

- Backups
- Security
- Monitoring
- High availability where required
- Persistent storage
- Recovery planning

Important:

Kubernetes ≠ Database Backup

Running a database in Kubernetes does not automatically solve database backup and disaster recovery.

# **78. Cache**

A cache stores frequently accessed data to improve performance.

A common example is Redis.

Example:

    User Request
    ↓
    API
    ↓
    Cache
    ↓
    If data missing
    ↓
    Database

This can reduce repeated database queries and improve application response times.

# **79. Complete DevOps + Kubernetes Workflow**

Now we can connect everything learned in the previous sections.

The complete pipeline can look like:

    Developer
    ↓
    GitHub
    ↓
    Jenkins
    ↓
    SonarQube
    ↓
    Docker
    ↓
    Trivy
    ↓
    Amazon ECR
    ↓
    GitOps Repository
    ↓
    Argo CD
    ↓
    Kubernetes / EKS
    ↓
    Service / Ingress
    ↓
    AWS Load Balancer
    ↓
    Users

## **Step-by-Step**

### **Step 1 — Developer**

Developer writes application code.

    Developer
    ↓
    Code

### **Step 2 — GitHub**

Developer pushes code.

git add .

``` bash
git commit -m "new feature"
git push
```

Flow:

Developer → GitHub

### **Step 3 — Jenkins**

A GitHub webhook can trigger Jenkins.

    GitHub
    ↓
    Webhook
    ↓
    Jenkins

Jenkins starts the CI pipeline.

### **Step 4 — SonarQube**

Jenkins sends the source code for analysis.

    Jenkins
    ↓
    SonarQube
    ↓
    Code Quality Analysis

### **Step 5 — Docker**

Jenkins builds the application image.

    Source Code
    ↓
    Dockerfile
    ↓
    Docker Image

Example:

docker build -t myapp:1.0 .

### **Step 6 — Trivy**

The image is scanned.

    Docker Image
    ↓
    Trivy
    ↓
    Security Scan

### **Step 7 — ECR**

If the pipeline's required checks pass, the image can be pushed to Amazon ECR.

    Jenkins
    ↓
    Trivy
    ↓
    Amazon ECR

### **Step 8 — GitOps Repository**

The deployment configuration is updated with the new image version.

Example:

``` yaml
image: myapp:1.1
becomes:
image: myapp:1.2
```

Then Git records the change.

    New Image Version
    ↓
    Git Commit
    ↓
    GitOps Repository

### **Step 9 — Argo CD**

Argo CD watches the GitOps repository.

    GitOps Repository
    ↓
    Argo CD

It detects the desired configuration change.

### **Step 10 — Kubernetes / EKS**

Argo CD synchronizes the desired state into Kubernetes.

    Argo CD
    ↓
    EKS
    ↓
    Deployment
    ↓
    ReplicaSet
    ↓
    Pods

Kubernetes controllers then maintain the desired state.

### **Step 11 — Service / Ingress / Load Balancer**

The application becomes reachable through Kubernetes networking and AWS infrastructure.

    Pods
    ↓
    Service
    ↓
    Ingress / Gateway
    ↓
    AWS Load Balancer

### **Step 12 — Users**

Finally:

    Users
    ↓
    AWS Load Balancer
    ↓
    Ingress
    ↓
    Service
    ↓
    Pods
    ↓
    Application

# **Final Complete Architecture**

Putting the entire DevOps + AWS + Kubernetes environment together:

DEVELOPER

    │
    ↓
    GITHUB

│

    Webhook
    ↓
    JENKINS

│

┌────────┴────────┐

↓ ↓

SONARQUBE TESTS

│

    └────────┬────────┘
    ↓
    DOCKER
    ↓
    TRIVY
    ↓
    AMAZON ECR

│

    │ Image
    ↓
    GITOPS REPOSITORY
    │
    ↓
    ARGO CD
    │
    ↓
    KUBERNETES / EKS

│

┌───────────┴───────────┐

↓ ↓

SERVICE INGRESS

│ │

    └───────────┬───────────┘
    ↓
    AWS LOAD BALANCER
    │
    ↓
    USERS

AWS infrastructure around EKS:

AWS

│

┌─────┴─────┐

↓ ↓

VPC IAM

│

EKS

│

┌─────────┴─────────┐

↓ ↓

Node Group Node Group

│ │

Pods Pods

│ │

└─────────┬─────────┘

│

┌─────────┼─────────┐

↓ ↓ ↓

ECR EBS EFS

# **Complete Learning Picture**

At this point, the Kubernetes learning journey can be understood as:

SECTION 01

    Kubernetes Fundamentals
    ↓
    SECTION 02
    Architecture
    ↓
    SECTION 03
    Containers & Pods
    ↓
    SECTION 04
    Deployments & Workloads
    ↓
    SECTION 05
    Networking
    ↓
    SECTION 06
    Storage
    ↓
    SECTION 07
    ConfigMaps & Secrets
    ↓
    SECTION 08
    Security & RBAC
    ↓
    SECTION 09
    Helm & GitOps
    ↓
    SECTION 10
    Operations & Troubleshooting
    ↓
    SECTION 11
    Observability & Advanced Concepts
    ↓
    SECTION 12
    Production Kubernetes
    ↓
    Cloud Kubernetes
    ↓
    Amazon EKS
    ↓
    CI/CD
    ↓
    GitOps
    ↓
    Production DevOps

# **Quick Revision**

Remember these key ideas:

- **Production Kubernetes** = Kubernetes designed for real workloads with reliability, security, scaling, monitoring, and recovery.
- **High Availability** = continue operating when components fail.
- **Fault Tolerance** = tolerate infrastructure or application failures.
- **Disaster Recovery** = recover after major failures.
- **Backup** = create recoverable copies of important data/configuration.
- **RBAC** = control who can perform which Kubernetes actions.
- **NetworkPolicy** = control Pod network traffic.
- **Pod Security** = restrict dangerous workload behavior.
- **Trivy** = scan container images for vulnerabilities.
- **Docker Hub** = container registry.
- **Amazon ECR** = AWS container registry.
- **EKS** = AWS managed Kubernetes service.
- **GKE** = Google managed Kubernetes service.
- **AKS** = Azure managed Kubernetes service.
- **IAM** = AWS identity and permissions.
- **EBS** = AWS block storage.
- **EFS** = AWS shared file storage.
- **Terraform / CloudFormation** = Infrastructure as Code.
- **Helm** = Kubernetes package manager.
- **Prometheus** = metrics collection/monitoring.
- **Grafana** = visualization and dashboards.
- **GitOps** = Git contains the desired deployment state.
- **Argo CD** = synchronizes Git desired state with Kubernetes.
- **Jenkins** = CI/CD automation.
- **SonarQube** = code quality/security analysis.
- **Docker** = builds container images.
- **Trivy** = image vulnerability scanning.
- **ECR** = stores container images.
- **EKS** = runs Kubernetes workloads on AWS.
- **Load Balancer** = provides external access to applications.

## **The Main DevOps Flow**

    Developer
    ↓
    GitHub
    ↓
    Jenkins
    ↓
    SonarQube
    ↓
    Docker
    ↓
    Trivy
    ↓
    ECR
    ↓
    GitOps
    ↓
    Argo CD
    ↓
    Kubernetes / EKS
    ↓
    Service / Ingress
    ↓
    AWS Load Balancer
    ↓
    Users

This is the big picture: **CI builds and validates the application, the registry stores the image, GitOps defines what should be deployed, Argo CD delivers that desired state to Kubernetes, and Kubernetes keeps the application running.**

### **Kubernetes Commands — Complete Beginner-to-Advanced Cheat Sheet**

**Note:** The main Kubernetes command-line tool is `kubectl`. I assume by “kubbertest” you mean **Kubernetes / kubectl**.

# **1. What Is** `kubectl`**?**

`kubectl` is the command-line tool used to communicate with a Kubernetes cluster.

You can use it to:

- Create Kubernetes resources
- Deploy applications
- View Pods
- View Nodes
- Check Services
- Read logs
- Enter containers
- Scale applications
- Update deployments
- Delete resources
- Debug problems
- Manage namespaces
- Apply YAML files

Basic structure:

``` bash
kubectl <command> <resource> <name> <options>
```

Example:

``` bash
kubectl get pods
```

# **2. Check Kubernetes Installation**

## **Check** `kubectl` **Version**

``` bash
kubectl version
```

Shows:

- Client version
- Server version

For a shorter version:

``` bash
kubectl version --short
```

> Depending on your Kubernetes version, `--short` may no longer be supported.

Modern command:

``` bash
kubectl version --output=yaml
```

## **Check** `kubectl` **Location**

Linux:

which kubectl

Windows CMD:

where kubectl

PowerShell:

Get-Command kubectl

## **Get Help**

``` bash
kubectl help
```

Help for a particular command:

``` bash
kubectl get --help
kubectl create --help
kubectl run --help
```

# **3. Check Cluster Connection**

## **Check Cluster Information**

``` bash
kubectl cluster-info
```

This tells you whether `kubectl` can communicate with the Kubernetes cluster.

## **Check API Server**

``` bash
kubectl cluster-info
```

Example output may contain:

Kubernetes control plane is running at ...

## **Check Nodes**

``` bash
kubectl get nodes
```

Short form:

``` bash
kubectl get no
```

## **Detailed Node Information**

``` bash
kubectl get nodes -o wide
```

## **Describe a Node**

``` bash
kubectl describe node <node-name>
```

Example:

``` bash
kubectl describe node worker-node-1
```

# **4. Kubernetes Context Commands**

A **context** tells `kubectl` which cluster, user, and namespace it should use.

## **View Current Context**

``` bash
kubectl config current-context
```

## **List All Contexts**

``` bash
kubectl config get-contexts
```

## **Switch Context**

``` bash
kubectl config use-context <context-name>
```

Example:

``` bash
kubectl config use-context minikube
```

## **View Kubernetes Configuration**

``` bash
kubectl config view
```

## **Set Default Namespace**

``` bash
kubectl config set-context --current --namespace=<namespace>
```

Example:

``` bash
kubectl config set-context --current --namespace=development
```

# **5. Namespace Commands**

Namespaces are used to logically separate Kubernetes resources.

## **List Namespaces**

``` bash
kubectl get namespaces
```

Short form:

``` bash
kubectl get ns
```

## **Create Namespace**

``` bash
kubectl create namespace <namespace-name>
```

Example:

``` bash
kubectl create namespace development
```

## **Describe Namespace**

``` bash
kubectl describe namespace development
```

## **Delete Namespace**

``` bash
kubectl delete namespace development
```

⚠️ Deleting a namespace deletes the resources inside it.

## **Get Resources From a Specific Namespace**

``` bash
kubectl get pods -n development
```

## **Get Resources From All Namespaces**

``` bash
kubectl get pods --all-namespaces
```

Short form:

``` bash
kubectl get pods -A
```

# **6. Pod Commands**

A **Pod** is the smallest deployable unit in Kubernetes.

Usually:

    Cluster
    ↓
    Node
    ↓
    Pod
    ↓
    Container

## **List Pods**

``` bash
kubectl get pods
```

Short:

``` bash
kubectl get po
```

## **List Pods With More Information**

``` bash
kubectl get pods -o wide
```

You can see information such as:

- Pod IP
- Node
- Status
- Restart count

## **Watch Pods**

``` bash
kubectl get pods -w
```

Useful when deploying an application.

## **Get One Pod**

``` bash
kubectl get pod <pod-name>
```

## **Describe Pod**

``` bash
kubectl describe pod <pod-name>
```

This is extremely useful for troubleshooting.

Look for:

- Events
- Image errors
- Scheduling problems
- Container failures
- Readiness/liveness problems

## **Create a Pod With** `run`

``` bash
kubectl run nginx --image=nginx
```

Example:

``` bash
kubectl run myapp --image=nginx
```

## **Delete Pod**

``` bash
kubectl delete pod <pod-name>
```

Example:

``` bash
kubectl delete pod myapp
```

## **Get Pod YAML**

``` bash
kubectl get pod <pod-name> -o yaml
```

## **Get Pod JSON**

``` bash
kubectl get pod <pod-name> -o json
```

# **7. Pod Logs**

## **View Logs**

``` bash
kubectl logs <pod-name>
```

## **Follow Logs**

``` bash
kubectl logs -f <pod-name>
```

`-f` means follow.

It continuously displays new logs.

## **Logs From a Specific Container**

``` bash
kubectl logs <pod-name> -c <container-name>
```

## **Previous Container Logs**

Useful after a container crashes:

``` bash
kubectl logs <pod-name> --previous
```

## **Logs With Timestamps**

``` bash
kubectl logs <pod-name> --timestamps
```

# **8. Enter a Pod / Container**

## **Open Shell**

``` bash
kubectl exec -it <pod-name> -- /bin/bash
```

If Bash isn't available:

``` bash
kubectl exec -it <pod-name> -- /bin/sh
```

Example:

``` bash
kubectl exec -it nginx-pod -- /bin/bash
```

## **Execute One Command**

``` bash
kubectl exec <pod-name> -- ls
```

Example:

``` bash
kubectl exec nginx-pod -- ls /usr/share/nginx/html
```

## **Execute Command in Specific Container**

``` bash
kubectl exec -it <pod-name> -c <container-name> -- /bin/sh
```

# **9. Deployment Commands**

A **Deployment** manages Pods and allows Kubernetes to maintain the desired number of replicas.

## **Create Deployment**

``` bash
kubectl create deployment nginx --image=nginx
```

## **List Deployments**

``` bash
kubectl get deployments
```

Short:

``` bash
kubectl get deploy
```

## **Describe Deployment**

``` bash
kubectl describe deployment <deployment-name>
```

## **Get Deployment YAML**

``` bash
kubectl get deployment <deployment-name> -o yaml
```

## **Scale Deployment**

``` bash
kubectl scale deployment <deployment-name> --replicas=3
```

Example:

``` bash
kubectl scale deployment nginx --replicas=3
```

## **Check Replica Status**

``` bash
kubectl get deployment
```

You may see:

READY UP-TO-DATE AVAILABLE

3/3 3 3

# **10. Deployment Rollout Commands**

## **Check Rollout**

``` bash
kubectl rollout status deployment/<deployment-name>
```

Example:

``` bash
kubectl rollout status deployment/nginx
```

## **View Rollout History**

``` bash
kubectl rollout history deployment/<deployment-name>
```

## **Rollback Deployment**

``` bash
kubectl rollout undo deployment/<deployment-name>
```

Example:

``` bash
kubectl rollout undo deployment/nginx
```

## **Rollback to Specific Revision**

``` bash
kubectl rollout undo deployment/nginx --to-revision=2
```

## **Restart Deployment**

``` bash
kubectl rollout restart deployment/nginx
```

## **Pause Deployment**

``` bash
kubectl rollout pause deployment/nginx
```

## **Resume Deployment**

``` bash
kubectl rollout resume deployment/nginx
```

# **11. Service Commands**

A **Service** provides a stable network endpoint for Pods.

Common Service types:

- ClusterIP
- NodePort
- LoadBalancer
- ExternalName

## **List Services**

``` bash
kubectl get services
```

Short:

``` bash
kubectl get svc
```

## **Create Service**

``` bash
kubectl expose deployment nginx --port=80
```

## **Create NodePort Service**

``` bash
kubectl expose deployment nginx --type=NodePort --port=80
```

## **Create LoadBalancer Service**

``` bash
kubectl expose deployment nginx --type=LoadBalancer --port=80
```

## **Describe Service**

``` bash
kubectl describe service <service-name>
```

## **Get Service Details**

``` bash
kubectl get svc -o wide
```

# **12. Port Forwarding**

Port forwarding is extremely useful for local testing.

``` bash
kubectl port-forward pod/<pod-name> 8080:80
```

Example:

``` bash
kubectl port-forward pod/nginx-pod 8080:80
```

You can also forward a Service:

``` bash
kubectl port-forward service/nginx 8080:80
```

Then access:

http://localhost:8080

# **13. ReplicaSet Commands**

A ReplicaSet maintains a specified number of Pod replicas.

## **List ReplicaSets**

``` bash
kubectl get replicasets
```

Short:

``` bash
kubectl get rs
```

## **Describe ReplicaSet**

``` bash
kubectl describe rs <replicaset-name>
```

## **Delete ReplicaSet**

``` bash
kubectl delete rs <replicaset-name>
```

# **14. YAML / Manifest Commands**

Kubernetes is heavily based on YAML configuration files.

Example:

deployment.yaml

service.yaml

configmap.yaml

secret.yaml

## **Create Resource From YAML**

``` bash
kubectl create -f deployment.yaml
```

## **Apply YAML**

``` bash
kubectl apply -f deployment.yaml
```

`apply` is commonly preferred for managing declarative configurations.

## **Apply Entire Directory**

``` bash
kubectl apply -f ./k8s/
```

## **Apply Multiple YAML Files**

``` bash
kubectl apply -f deployment.yaml -f service.yaml
```

## **Delete Resource From YAML**

``` bash
kubectl delete -f deployment.yaml
```

## **Validate / Preview Changes**

``` bash
kubectl diff -f deployment.yaml
```

This shows differences between your manifest and the live object.

# **15. Generate YAML Without Creating the Resource**

This is very useful when learning.

For example:

``` bash
kubectl create deployment nginx --image=nginx --dry-run=client -o yaml
```

This generates YAML instead of creating the Deployment.

You can save it:

``` bash
kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > deployment.yaml
```

# **16. ConfigMap Commands**

ConfigMaps store non-sensitive configuration.

## **Create ConfigMap**

From a literal:

``` bash
kubectl create configmap app-config --from-literal=APP_ENV=production
```

## **From File**

``` bash
kubectl create configmap app-config --from-file=config.properties
```

## **List ConfigMaps**

``` bash
kubectl get configmaps
```

Short:

``` bash
kubectl get cm
```

## **Describe ConfigMap**

``` bash
kubectl describe configmap app-config
```

## **Get ConfigMap YAML**

``` bash
kubectl get configmap app-config -o yaml
```

# **17. Secret Commands**

Secrets are intended for sensitive configuration such as:

- Passwords
- API keys
- Tokens
- Credentials

## **Create Secret**

``` bash
kubectl create secret generic my-secret \
```

--from-literal=username=admin \\

--from-literal=password=12345

## **List Secrets**

``` bash
kubectl get secrets
```

## **Describe Secret**

``` bash
kubectl describe secret my-secret
```

## **Get Secret YAML**

``` bash
kubectl get secret my-secret -o yaml
```

Remember that Secret data is normally represented as **base64-encoded**, not automatically encrypted merely because it is a Kubernetes Secret.

# **18. StatefulSet Commands**

StatefulSets are commonly used for stateful workloads.

Examples:

- Databases
- Kafka
- ZooKeeper
- Some distributed systems

## **List StatefulSets**

``` bash
kubectl get statefulsets
```

Short:

``` bash
kubectl get sts
```

## **Describe StatefulSet**

``` bash
kubectl describe statefulset <name>
```

## **Scale StatefulSet**

``` bash
kubectl scale statefulset <name> --replicas=3
```

# **19. DaemonSet Commands**

A DaemonSet ensures that a Pod runs on selected/all applicable nodes.

Common examples:

- Log collectors
- Monitoring agents
- Node-level networking components

## **List DaemonSets**

``` bash
kubectl get daemonsets
```

Short:

``` bash
kubectl get ds
```

## **Describe DaemonSet**

``` bash
kubectl describe daemonset <name>
```

# **20. Job Commands**

Jobs are used for tasks that should run and complete.

## **List Jobs**

``` bash
kubectl get jobs
```

## **Create a Job**

``` bash
kubectl create job my-job --image=busybox -- echo "Hello Kubernetes"
```

## **Describe Job**

``` bash
kubectl describe job my-job
```

## **Delete Job**

``` bash
kubectl delete job my-job
```

# **21. CronJob Commands**

CronJobs run Jobs according to a schedule.

## **List CronJobs**

``` bash
kubectl get cronjobs
```

Short:

``` bash
kubectl get cj
```

## **Describe CronJob**

``` bash
kubectl describe cronjob <name>
```

## **Create CronJob**

``` bash
kubectl create cronjob my-cronjob \
```

--image=busybox \\

--schedule="\*/5 \* \* \* \*" \\

-- echo "Hello"

# **22. Ingress Commands**

Ingress manages HTTP/HTTPS access to Services.

## **List Ingress**

``` bash
kubectl get ingress
```

Short:

``` bash
kubectl get ing
```

## **Describe Ingress**

``` bash
kubectl describe ingress <name>
```

## **Get Ingress YAML**

``` bash
kubectl get ingress <name> -o yaml
```

> Ingress also requires an appropriate Ingress controller in the cluster.

# **23. Persistent Volume Commands**

Persistent storage is important for databases and other stateful applications.

## **List Persistent Volumes**

``` bash
kubectl get pv
```

## **Describe PV**

``` bash
kubectl describe pv <pv-name>
```

# **24. Persistent Volume Claim Commands**

## **List PVCs**

``` bash
kubectl get pvc
```

## **Describe PVC**

``` bash
kubectl describe pvc <pvc-name>
```

## **Get PVC YAML**

``` bash
kubectl get pvc <pvc-name> -o yaml
```

# **25. StorageClass Commands**

## **List Storage Classes**

``` bash
kubectl get storageclass
```

Short:

``` bash
kubectl get sc
```

## **Describe StorageClass**

``` bash
kubectl describe storageclass <name>
```

# **26. Resource Usage Commands**

If the Metrics Server is installed/configured, you can use:

## **Node CPU and Memory**

``` bash
kubectl top nodes
```

## **Pod CPU and Memory**

``` bash
kubectl top pods
```

## **Specific Namespace**

``` bash
kubectl top pods -n development
```

# **27. Get Kubernetes Resources**

One of the most important commands:

``` bash
kubectl get
```

Examples:

``` bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get nodes
kubectl get namespaces
kubectl get configmaps
kubectl get secrets
```

## **Get Everything in Current Namespace**

``` bash
kubectl get all
```

All namespaces:

``` bash
kubectl get all -A
```

> `get all` does **not literally mean every Kubernetes resource type**. It returns a commonly selected set of workload/service resources.

# **28. Get Resource in YAML**

General syntax:

``` bash
kubectl get <resource> <name> -o yaml
```

Examples:

``` bash
kubectl get pod nginx -o yaml
kubectl get deployment nginx -o yaml
kubectl get service nginx -o yaml
```

# **29. Get Resource in JSON**

``` bash
kubectl get pod nginx -o json
```

# **30. Get Resource Names Only**

``` bash
kubectl get pods -o name
```

Example output:

pod/nginx-xxxxx

pod/nginx-yyyyy

# **31. Watch Kubernetes Resources**

``` bash
kubectl get pods --watch
or:
kubectl get pods -w
```

Useful during:

- Deployment
- Scaling
- Restarting
- Troubleshooting

# **32. Labels**

Labels are key-value pairs attached to Kubernetes objects.

Example:

    app=frontend
    environment=production

## **Get Pods With Label**

``` bash
kubectl get pods -l app=frontend
```

## **Get Pods With Multiple Labels**

``` bash
kubectl get pods -l app=frontend,environment=production
```

## **Show Labels**

``` bash
kubectl get pods --show-labels
```

## **Add Label**

``` bash
kubectl label pod <pod-name> environment=production
```

## **Change Existing Label**

``` bash
kubectl label pod <pod-name> environment=production --overwrite
```

# **33. Annotations**

Annotations store additional metadata.

## **Add Annotation**

``` bash
kubectl annotate pod <pod-name> description="My application pod"
```

## **View Annotations**

``` bash
kubectl get pod <pod-name> -o yaml
```

# **34. Kubernetes Events**

Events are extremely useful for troubleshooting.

## **View Events**

``` bash
kubectl get events
```

## **Sort Events by Time**

``` bash
kubectl get events --sort-by=.lastTimestamp
```

## **Events From All Namespaces**

``` bash
kubectl get events -A
```

# **35. Troubleshooting Commands**

When something doesn't work, follow this sequence.

## **Step 1 — Check Pods**

``` bash
kubectl get pods
```

## **Step 2 — Get More Details**

``` bash
kubectl get pods -o wide
```

## **Step 3 — Describe the Pod**

``` bash
kubectl describe pod <pod-name>
```

## **Step 4 — Check Logs**

``` bash
kubectl logs <pod-name>
```

## **Step 5 — Check Previous Logs**

``` bash
kubectl logs <pod-name> --previous
```

## **Step 6 — Check Events**

``` bash
kubectl get events --sort-by=.lastTimestamp
```

## **Step 7 — Enter the Container**

``` bash
kubectl exec -it <pod-name> -- /bin/sh
```

# **36. Common Pod Problems**

## **CrashLoopBackOff**

Check:

``` bash
kubectl describe pod <pod-name>
```

Then:

``` bash
kubectl logs <pod-name>
```

And:

``` bash
kubectl logs <pod-name> --previous
```

## **ImagePullBackOff**

Check:

``` bash
kubectl describe pod <pod-name>
```

Look at:

Events

Common causes:

- Wrong image name
- Wrong image tag
- Private registry authentication problem
- Image doesn't exist

## **Pending Pod**

Run:

``` bash
kubectl describe pod <pod-name>
```

Check:

Events

Possible causes include:

- Insufficient CPU
- Insufficient memory
- Node selector
- Taints/tolerations
- PVC problems

# **37. Node Maintenance Commands**

## **Mark Node Unschedulable**

``` bash
kubectl cordon <node-name>
```

## **Drain Node**

``` bash
kubectl drain <node-name>
```

Depending on the workload, you may need options such as:

``` bash
kubectl drain <node-name> --ignore-daemonsets
```

## **Make Node Schedulable Again**

``` bash
kubectl uncordon <node-name>
```

# **38. Taints**

## **Add Taint**

``` bash
kubectl taint nodes <node-name> key=value:NoSchedule
```

## **Remove Taint**

``` bash
kubectl taint nodes <node-name> key:NoSchedule-
```

Taints work together with **tolerations**.

# **39. API Resources**

To see Kubernetes resource types:

``` bash
kubectl api-resources
```

This is very useful when learning Kubernetes.

## **API Versions**

``` bash
kubectl api-versions
```

# **40. Explain Kubernetes Resources**

One of the most useful learning commands:

``` bash
kubectl explain pod
```

For a specific field:

``` bash
kubectl explain pod.spec
```

Another example:

``` bash
kubectl explain deployment.spec
```

You can go deeper:

``` bash
kubectl explain deployment.spec.template.spec.containers
```

This helps you understand Kubernetes YAML without constantly searching online.

# **41. Delete Commands**

## **Delete Pod**

``` bash
kubectl delete pod <pod-name>
```

## **Delete Deployment**

``` bash
kubectl delete deployment <deployment-name>
```

## **Delete Service**

``` bash
kubectl delete service <service-name>
```

## **Delete Namespace**

``` bash
kubectl delete namespace <namespace-name>
```

## **Delete Using YAML**

``` bash
kubectl delete -f deployment.yaml
```

## **Force Deletion**

Sometimes you may encounter a stuck resource. A commonly used command is:

``` bash
kubectl delete pod <pod-name> --grace-period=0 --force
```

⚠️ Use force deletion carefully because it bypasses normal graceful termination.

# **42. Apply vs Create**

## `kubectl create`

``` bash
kubectl create -f app.yaml
```

Usually creates the resource.

If the resource already exists, it generally reports that it already exists.

## `kubectl apply`

``` bash
kubectl apply -f app.yaml
```

Used for declarative management.

If the resource doesn't exist:

created

If it exists and changed:

configured

If nothing changed:

unchanged

For learning modern Kubernetes, **understanding** `apply` **is especially important**.

# **43. Imperative vs Declarative Kubernetes**

## **Imperative**

You tell Kubernetes exactly what command to perform.

Example:

``` bash
kubectl create deployment nginx --image=nginx
```

Meaning:

> Create this Deployment now.

## **Declarative**

You describe the desired state in YAML.

Example:

``` bash
kubectl apply -f deployment.yaml
```

Meaning:

> Make the cluster match this configuration.

Typical real-world Kubernetes projects use a lot of declarative configuration.

This is also important for **GitOps and Argo CD**.

# **44. Kubernetes Autoscaling Commands**

## **Horizontal Pod Autoscaler**

Example:

``` bash
kubectl autoscale deployment nginx --min=2 --max=10 --cpu-percent=70
```

## **List HPA**

``` bash
kubectl get hpa
```

## **Describe HPA**

``` bash
kubectl describe hpa <name>
```

# **45. Rollout Image Update**

You can update the container image of a Deployment:

``` bash
kubectl set image deployment/nginx nginx=nginx:latest
```

Example:

``` bash
kubectl set image deployment/myapp myapp=myrepo/myapp:v2
```

Then:

``` bash
kubectl rollout status deployment/myapp
```

# **46. Environment Variables**

Set an environment variable in a Deployment:

``` bash
kubectl set env deployment/myapp ENV=production
```

Remove it:

``` bash
kubectl set env deployment/myapp ENV-
```

Set multiple:

``` bash
kubectl set env deployment/myapp ENV=production VERSION=2
```

# **47. Resource Management**

You can inspect resources using:

``` bash
kubectl describe pod <pod-name>
```

For workloads, resource requests and limits are normally configured in YAML.

For example conceptually:

    resources:
    requests:

cpu: ...

memory: ...

limits:

cpu: ...

memory: ...

These settings influence:

- Scheduling
- CPU/memory constraints
- Application stability
- Cluster capacity

# **48. Kubernetes Service Account Commands**

## **List Service Accounts**

``` bash
kubectl get serviceaccounts
```

Short:

``` bash
kubectl get sa
```

## **Create Service Account**

``` bash
kubectl create serviceaccount myapp
```

## **Describe Service Account**

``` bash
kubectl describe serviceaccount myapp
```

# **49. Role and RBAC Commands**

Kubernetes RBAC controls permissions.

Important resources:

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding

## **List Roles**

``` bash
kubectl get roles
```

## **List ClusterRoles**

``` bash
kubectl get clusterroles
```

## **List RoleBindings**

``` bash
kubectl get rolebindings
```

## **List ClusterRoleBindings**

``` bash
kubectl get clusterrolebindings
```

# **50. Check Permissions**

Very useful:

``` bash
kubectl auth can-i get pods
```

Example:

``` bash
kubectl auth can-i create deployments
```

Check as another user:

``` bash
kubectl auth can-i get pods --as=<username>
```

# **51. NetworkPolicy Commands**

## **List Network Policies**

``` bash
kubectl get networkpolicies
```

Short:

``` bash
kubectl get netpol
```

## **Describe Network Policy**

``` bash
kubectl describe networkpolicy <name>
```

NetworkPolicies control network traffic between Pods and/or other endpoints, depending on the cluster's networking implementation.

# **52. Certificate Signing Request Commands**

## **List CSRs**

``` bash
kubectl get csr
```

## **Describe CSR**

``` bash
kubectl describe csr <name>
```

These are mainly relevant to Kubernetes cluster administration and certificate workflows.

# **53. Debugging With Temporary Pods**

A useful technique is creating a temporary debugging container:

``` bash
kubectl run debug --rm -it --image=busybox -- /bin/sh
```

This gives you a temporary shell.

For networking tests, an image containing networking tools can be useful, for example:

``` bash
kubectl run netshoot --rm -it --image=nicolaka/netshoot -- /bin/bash
```

# **54. Copy Files Between Local Machine and Pod**

## **Pod → Local Machine**

``` bash
kubectl cp <pod-name>:/path/file.txt ./file.txt
```

Example:

``` bash
kubectl cp nginx-pod:/tmp/test.txt ./test.txt
```

## **Local Machine → Pod**

``` bash
kubectl cp ./file.txt <pod-name>:/tmp/file.txt
```

For a multi-container Pod, specify the container when appropriate:

``` bash
kubectl cp ./file.txt <pod-name>:/tmp/file.txt -c <container-name>
```

# **55. Proxy to Kubernetes API**

``` bash
kubectl proxy
```

This creates a local proxy to the Kubernetes API server.

# **56. Run Commands Against Another Namespace**

Instead of changing your default namespace:

``` bash
kubectl get pods -n production
kubectl logs <pod-name> -n production
kubectl describe deployment <name> -n production
kubectl delete pod <pod-name> -n production
```

# **57. Common Short Names**

Kubernetes supports short resource names.

Examples:

``` bash
kubectl get po
```

Instead of:

``` bash
kubectl get pods
```

Common ones:

    po = pods
    no = nodes
    ns = namespaces
    svc = services
    deploy = deployments
    rs = replicasets
    sts = statefulsets
    ds = daemonsets
    cm = configmaps
    sa = serviceaccounts
    sc = storageclasses
    pv = persistentvolumes
    pvc = persistentvolumeclaims
    ing = ingresses
    cj = cronjobs

You can check available resource short names with:

``` bash
kubectl api-resources
```

# **58. Very Important Daily Commands**

If you're learning Kubernetes, memorize these first:

## **Cluster**

``` bash
kubectl cluster-info
kubectl get nodes
```

## **Pods**

``` bash
kubectl get pods
kubectl get pods -o wide
kubectl describe pod <pod>
kubectl logs <pod>
kubectl exec -it <pod> -- /bin/sh
```

## **Deployments**

``` bash
kubectl get deployments
kubectl describe deployment <deployment>
kubectl scale deployment <deployment> --replicas=3
kubectl rollout status deployment/<deployment>
kubectl rollout restart deployment/<deployment>
kubectl rollout undo deployment/<deployment>
```

## **Services**

``` bash
kubectl get services
kubectl describe service <service>
kubectl port-forward service/<service> 8080:80
```

## **YAML**

``` bash
kubectl apply -f app.yaml
kubectl delete -f app.yaml
kubectl get deployment <name> -o yaml
kubectl diff -f app.yaml
```

## **Troubleshooting**

``` bash
kubectl get events
kubectl describe pod <pod>
kubectl logs <pod>
kubectl logs <pod> --previous
kubectl get pods -o wide
```

# **59. Recommended Kubernetes Learning Order**

Don't try to memorize every command at once.

Follow this order:

### **Level 1 — Kubernetes Basics**

Learn:

``` bash
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods
kubectl describe
kubectl logs
kubectl exec
```

### **Level 2 — Deploy Applications**

Learn:

``` bash
kubectl create deployment
kubectl get deployments
kubectl scale
kubectl rollout
kubectl set image
```

### **Level 3 — Networking**

Learn:

``` bash
kubectl get services
kubectl expose
kubectl port-forward
kubectl get ingress
```

### **Level 4 — Configuration**

Learn:

``` bash
kubectl create configmap
kubectl create secret
kubectl get configmaps
kubectl get secrets
```

### **Level 5 — YAML**

Learn:

``` bash
kubectl apply -f
kubectl delete -f
kubectl diff -f
kubectl get -o yaml
kubectl explain
```

### **Level 6 — Storage**

Learn:

``` bash
kubectl get pv
kubectl get pvc
kubectl get storageclass
```

### **Level 7 — Scaling**

Learn:

``` bash
kubectl scale
kubectl autoscale
kubectl top
```

### **Level 8 — Administration**

Learn:

``` bash
kubectl cordon
kubectl drain
kubectl uncordon
kubectl taint
```

### **Level 9 — Security**

Learn:

``` bash
kubectl get serviceaccounts
kubectl get roles
kubectl get rolebindings
kubectl auth can-i
```

# **60. Most Important** `kubectl` **Mental Model**

When working with Kubernetes, think in this sequence:

    Cluster
    ↓
    Namespace
    ↓
    Deployment
    ↓
    ReplicaSet
    ↓
    Pod
    ↓
    Container

For networking:

    User
    ↓
    Ingress / LoadBalancer
    ↓
    Service
    ↓
    Pod
    ↓
    Container

For configuration:

    ConfigMap ─────┐
    ↓
    Pod/Container
    ↑
    Secret ────────┘

For storage:

    Pod
    ↓
    PVC
    ↓
    PV
    ↓
    Storage

For your **DevOps/GitOps learning path**, the particularly important commands are:

    GitHub
    ↓
    Jenkins
    ↓
    Docker
    ↓
    Container Registry
    ↓
    kubectl / Kubernetes
    ↓
    Deployment
    ↓
    Service
    ↓
    Ingress / LoadBalancer

And later, when you move toward your GitOps setup:

    GitHub
    ↓
    Jenkins
    ↓
    Docker Image
    ↓
    GitOps Repository
    ↓
    Argo CD
    ↓
    Kubernetes

That means you don't need to memorize hundreds of commands before starting your lab. **Master** `get`**,** `describe`**,** `logs`**,** `exec`**,** `apply`**,** `delete`**,** `scale`**,** `rollout`**,** `set image`**, and** `port-forward` **first.**
