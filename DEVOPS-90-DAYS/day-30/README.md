# Day 30 — Docker Images, Layers & Container Lifecycle

[← Day 29](../day-29/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 31 →](../day-31/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Understand image layers and caching
- [ ] Manage the container lifecycle
- [ ] Inspect, log, debug and clean up

## 2. Prerequisites

- Day 29.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Images and layers

An image is a stack of read-only layers identified by digest; a writable layer is added at runtime. Tags are mutable pointers; digests are immutable.

### 3.2 Lifecycle

create -> start -> (pause) -> stop (SIGTERM then SIGKILL) -> remove. Restart policies: `no`, `on-failure`, `always`, `unless-stopped`.

### 3.3 Debugging

`logs`, `exec`, `inspect`, `top`, `events`, `cp`, `diff`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Pull `python:3.12-slim` and `python:3.12`; compare sizes and layers with `docker history`.
2. [ ] Run a container with `--restart on-failure`, crash it and watch restarts.
3. [ ] Use `docker inspect --format` to extract IP and mounts.
4. [ ] Copy a file in/out with `docker cp`.
5. [ ] Clean up with `docker system df` and `docker system prune`.

## 5. Real-World Scenario

> A container exits immediately in production. Diagnose using exit code, logs and inspect; explain exit code 137 vs 1 vs 0.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker pull python:3.12-slim && docker images
docker history python:3.12-slim
docker run -d --name t --restart on-failure:3 alpine sh -c 'sleep 2; exit 1'
docker inspect t --format '{{.State.ExitCode}} {{.RestartCount}}'
docker logs -f t; docker top t; docker events --since 5m
docker system df; docker image prune -a
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 30 – Docker Images & Container Lifecycle — Challenge Brief

#### Task
Today's goal is to **understand how images and containers actually work**.

You will:
- Learn the relationship between images and containers
- Understand image layers and caching
- Master the full container lifecycle

---

#### Expected Output
- A markdown file: `day-30-images.md`
- Screenshots of key commands

---

#### Challenge Tasks

##### Task 1: Docker Images
1. Pull the `nginx`, `ubuntu`, and `alpine` images from Docker Hub
2. List all images on your machine — note the sizes
3. Compare `ubuntu` vs `alpine` — why is one much smaller?
4. Inspect an image — what information can you see?
5. Remove an image you no longer need

---

##### Task 2: Image Layers
1. Run `docker image history nginx` — what do you see?
2. Each line is a **layer**. Note how some layers show sizes and some show 0B
3. Write in your notes: What are layers and why does Docker use them?

---

##### Task 3: Container Lifecycle
Practice the full lifecycle on one container:
1. **Create** a container (without starting it)
2. **Start** the container
3. **Pause** it and check status
4. **Unpause** it
5. **Stop** it
6. **Restart** it
7. **Kill** it
8. **Remove** it

Check `docker ps -a` after each step — observe the state changes.

---

##### Task 4: Working with Running Containers
1. Run an Nginx container in detached mode
2. View its **logs**
3. View **real-time logs** (follow mode)
4. **Exec** into the container and look around the filesystem
5. Run a single command inside the container without entering it
6. **Inspect** the container — find its IP address, port mappings, and mounts

---

##### Task 5: Cleanup
1. Stop all running containers in one command
2. Remove all stopped containers in one command
3. Remove unused images
4. Check how much disk space Docker is using

---

#### Hints
- Image history: `docker image history`
- Create without starting: `docker create`
- Follow logs: `docker logs -f`
- Inspect: `docker inspect`
- Cleanup: `docker system df`, `docker system prune`

---

#### Submission
1. Add your `day-30-images.md` to `2026/day-30/`
2. Commit and push to your fork

---

#### Learn in Public
Share what surprised you about image layers or container states on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐳 Day 30 – Docker Images & Container Lifecycle — Notes & Solution

#### 🎯Task
Today's goal is to **understand how images and containers actually work**.

You will:
- Learn the relationship between images and containers
- Understand image layers and caching
- Master the full container lifecycle

---

##### 🖼️Task 1: Docker Images
1. Pull the `nginx`, `ubuntu`, and `alpine` images from Docker Hub
<img width="1919" height="693" alt="Screenshot 2026-08-22 124403" src="https://github.com/user-attachments/assets/7fddf928-0125-47fb-aa51-f215b0b48c65" />

2. List all images on your machine — note the sizes
<img width="1305" height="206" alt="Screenshot 2026-08-22 124515" src="https://github.com/user-attachments/assets/fb14f873-8f7c-4634-989b-13e9ee93e924" />

| Image         | Disk Usage | Content Size |
    | ------------- | ---------- | ------------ |
    | alpine:latest | 13.1MB     | 8.4MB       |
    | nginx:latest  | 240MB      | 162MB       |
    | ubuntu:latest | 119MB      | 100MB       |

    **Local Size(Disk usage) is actual image size**

    **Transfer Size(Content Size) is amount of data used when pulling the image over a network**

3. Compare `ubuntu` vs `alpine` — why is one much smaller?

- `Ubuntu` is a full-featured Linux distribution, while `Alpine` is a minimal distribution optimized for containers. 
- `Ubuntu` is larger because it includes GNU tools and glibc, whereas `Alpine` uses BusyBox and musl, making it much smaller.

4. Inspect an image — what information can you see?
<img width="843" height="721" alt="Screenshot 2026-08-22 124706" src="https://github.com/user-attachments/assets/fc1a8894-575d-481e-b6af-959c7e646243" />
<img width="831" height="715" alt="Screenshot 2026-08-22 124720" src="https://github.com/user-attachments/assets/541ff4ee-202f-4dec-844c-c1e7a7a427d9" />

    - Image ID: sha256:f075e3f9498646....
    - Image: nginx:latest
    - Exposed Port: 80/tcp (HTTP)
    - Repository: docker.io/library/nginx
    - Environment variable
    - NGINX Version: 1.31.4
    - ENTRYPOINT
    - CMD
    - Lables, maintainer
    - Filesystem | Uses layered filesystem | 7 layers

5. Remove an image you no longer need
<img width="1629" height="404" alt="Screenshot 2026-08-22 124857" src="https://github.com/user-attachments/assets/dbcd626a-c70c-429b-9d1b-77f5e3b85bc7" />

---

##### 🧱Task 2: Image Layers
1. Run `docker image history nginx` — what do you see?
<img width="1529" height="470" alt="Screenshot 2026-08-22 125012" src="https://github.com/user-attachments/assets/686e3875-c2ff-48a4-b8cf-a9707420f91c" />

- A list of instructions used to build the nginx image (e.g., CMD, EXPOSE, ENTRYPOINT, COPY, RUN, ENV, LABEL) Each instruction corresponds to a layer.
  
2. Each line is a **layer**. Note how some layers show sizes and some show 0B
+ Layers with a size (MB or kB) were created by instructions that modify the filesystem,such as RUN, COPY, or ADD.
+ Layers showing 0B were created by instructions that only change metadata, such as ENV, CMD, EXPOSE, LABEL, or ENTRYPOINT.These do not change the filesystem.

3. Write in your notes: What are layers and why does Docker use them?
- Docker layers are read-only filesystem snapshots created by each instruction in a Dockerfile.
- Docker uses layers because:
    - They allow build caching (faster builds)
    - They allow images to share
 common layers (saves storage).
    - They make image downloads faster (only new layers are pulled)

---

##### 🔄Task 3: Container Lifecycle
Practice the full lifecycle on one container:
1. **Create** a container (without starting it)
2. **Start** the container
3. **Pause** it and check status
4. **Unpause** it
5. **Stop** it
6. **Restart** it
7. **Kill** it
8. **Remove** it
<img width="1582" height="294" alt="Screenshot 2026-08-22 125359" src="https://github.com/user-attachments/assets/eed05bc3-98de-4447-9ebb-9348ed1be14d" />
<img width="672" height="184" alt="Screenshot 2026-08-22 125405" src="https://github.com/user-attachments/assets/ca57ea3d-47f5-4877-808a-46081f5686ad" />
<img width="1919" height="822" alt="Screenshot 2026-08-22 125700" src="https://github.com/user-attachments/assets/990d0f48-be52-492f-ae33-3ab6f801913f" />
<img width="1362" height="239" alt="Screenshot 2026-08-22 125752" src="https://github.com/user-attachments/assets/e71ebbda-cd80-4dd1-bbb0-c37462d9f073" />


---

##### 🏃Task 4: Working with Running Containers
1. Run an Nginx container in detached mode
2. View its **logs**
3. View **real-time logs** (follow mode)

<img width="1212" height="496" alt="Screenshot 2026-08-22 130117" src="https://github.com/user-attachments/assets/d1ea4722-4ccc-4a4a-bcd4-d7c54cb4f53b" />

4. **Exec** into the container and look around the filesystem
<img width="1066" height="679" alt="Screenshot 2026-08-22 130246" src="https://github.com/user-attachments/assets/b04c7992-25a2-436b-876f-f03d447d81e3" />

5. Run a single command inside the container without entering it
<img width="1239" height="359" alt="Screenshot 2026-08-22 130447" src="https://github.com/user-attachments/assets/a005c8b9-578f-4796-8bde-4a555775a7a2" />

6. **Inspect** the container — find its IP address, port mappings, and mounts
<img width="961" height="713" alt="Screenshot 2026-08-22 130523" src="https://github.com/user-attachments/assets/04d47cac-7f5d-42d3-8573-b1ebaa2c1e08" />

**IP address**
<img width="1035" height="293" alt="Screenshot 2026-08-22 131641" src="https://github.com/user-attachments/assets/508bf0ff-9f20-49d2-a155-9dc6638d452d" />


**port mappings**
<img width="850" height="248" alt="Screenshot 2026-08-22 131702" src="https://github.com/user-attachments/assets/e1c06db2-6f1d-42b4-a4d6-d1c6d7022a4b" />

**mount**
<img width="373" height="183" alt="Screenshot 2026-08-22 131731" src="https://github.com/user-attachments/assets/afcaf998-1699-4113-afa1-b48313590317" />

---

##### 🧹Task 5: Cleanup
1. Stop all running containers in one command
2. Remove all stopped containers in one command
3. Remove unused images
<img width="1919" height="830" alt="Screenshot 2026-08-22 132110" src="https://github.com/user-attachments/assets/46adaf76-1b7a-4aa8-8d04-ca1bd47268b4" />
<img width="866" height="161" alt="Screenshot 2026-08-22 132136" src="https://github.com/user-attachments/assets/b039be12-e757-4861-bf01-e7629ad785d6" />

4. Check how much disk space Docker is using
- 0B of disk space because all images and containers were removed successfully.

---

#### 🧠 Day 30 Key Takeaways
##### 🖼️ Docker Image

An image is a read-only template used to create containers.

##### 📦 Container

A container is a runnable instance created from a Docker image.

##### 🧱 Image Layers

Docker images are built from multiple layers, which enable caching, sharing, and efficient storage.

##### 🔄 Container Lifecycle
🆕 Create
 ↓
▶️ Start
 ↓
⏸️ Pause
 ↓
▶️ Unpause
 ↓
🛑 Stop
 ↓
🔄 Restart
 ↓
💀 Kill
 ↓
🗑️ Remove

#### ⭐ Important Commands
``` - docker images
- docker image inspect nginx
- docker image history nginx

- docker ps
- docker ps -a

- docker create
- docker start
- docker pause
- docker unpause
- docker stop
- docker restart
- docker kill
- docker rm

- docker logs
- docker logs -f
- docker exec
- docker inspect

- docker system df
- docker image prune
```


---


##### 🚀 Day 30 Completed!

Today I learned how Docker images are built using layers, how containers move through their complete lifecycle, and how to inspect, troubleshoot, and clean up containers.

#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham

🎯 Happy Learning!

---


🙏 Thank you, TrainWithShubham, for the continuous learning journey and hands-on DevOps practice.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a Docker cheat sheet (15 commands). | You can demonstrate, without notes: *understand image layers and caching* — with evidence committed to `day-30/`. |
| 2 | Explain tag vs digest and why you pin by digest in prod. | You can demonstrate, without notes: *manage the container lifecycle* — with evidence committed to `day-30/`. |
| 3 | Reduce image sizes by selecting slim/alpine/distroless and compare. | You can demonstrate, without notes: *inspect, log, debug and clean up* — with evidence committed to `day-30/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Exit code 137 | Killed (OOM or SIGKILL); check memory limits and `dmesg`. |
| Disk full from Docker | `docker system df` then prune unused images/volumes carefully. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Pin image digests; pull from trusted sources only; avoid `latest`; verify signatures where available.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

- [ ] Read and understand the learning material.
- [ ] Complete all practical exercises.
- [ ] Execute commands independently.
- [ ] Complete the real-world scenario.
- [ ] Troubleshoot at least one issue.
- [ ] Complete the daily assignment.
- [ ] Answer the interview questions.
- [ ] Document important findings.
- [ ] Push work to GitHub.
- [ ] Complete the self-assessment.

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. Image vs container?
2. Tag vs digest?
3. What does exit code 137 mean?
4. What are restart policies?
5. **Scenario:** A container exits immediately in production. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I debug a crashing container? | ☐ | ☐ | ☐ | ☐ |
| Can I explain layers? | ☐ | ☐ | ☐ | ☐ |
| Can I clean Docker safely? | ☐ | ☐ | ☐ | ☐ |
| Understand image layers and caching | ☐ | ☐ | ☐ | ☐ |
| Manage the container lifecycle | ☐ | ☐ | ☐ | ☐ |
| Inspect, log, debug and clean up | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-30/` in your own repository:

```text
day-30/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-30
git add day-30/
git commit -m "day-30: docker images, layers & container lifecycle"
git push -u origin day-30
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Personal Learning Journal — Day 30: 30 Days of Building, 30 Days of Learning 🚀

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

The biggest change in my #90DaysOfDevOps journey isn't the number of tools I've learned — it's the way I think about engineering problems.
Today marks 30/90 days completed in my DevOps journey with TrainWithShubham.

When I started, my mindset was mostly: "How do I build and deploy this application?"
After 30 days, the question has changed to: "How do I build it securely, automate it, monitor it, scale it, and make it production-ready?"

#### 🧠 What I've Built & Learned So Far

##### 🐧 Linux & Networking
- Linux architecture and administration
- Processes, permissions, volumes & mounting
- Networking, CIDR, subnetting, DNS, CDN
- VPCs, public/private subnets, NAT & gateways
- TCP/IP, OSI model & 3-way handshake

##### ☁️ AWS & Cloud
- EC2, IAM, S3, RDS
- VPC architecture
- Load Balancers & Auto Scaling
- Cloud concepts: IaaS, PaaS & SaaS
- AWS CLI and cloud infrastructure

##### 🐳 Docker & Containers
- Docker architecture
- Images, containers & volumes
- Docker networking
- Multi-stage builds
- Docker Compose
- Microservice containerization
- Container security & vulnerability scanning

##### ⚙️ Git & GitHub
- Branching, merging & rebasing
- Cherry-pick, stash, reset & revert
- Merge conflicts
- Git hooks, tags & blame
- GitHub Actions & reusable workflows

##### 🔐 DevSecOps
- SAST, SCA / dependency scanning, Secret scanning
- CodeQL, Trivy, Hadolint
- IaC security, SBOM generation
- DAST with OWASP ZAP, SonarQube

##### 🚀 CI/CD
I progressed from simple CI workflows to building a production-oriented pipeline:
`Code → Security Scans → Tests → Build → SBOM → Container Scan → Integration Tests → DAST → Security Gate → Release → Staging → Approval → Production`

#### 💻 Hands-On Projects
One of the biggest milestones has been working on DevBoard, where I implemented:
- Dockerized multi-tier architecture
- GitHub Actions CI/CD
- Security gates, automated testing, container vulnerability scanning
- SonarQube integration, self-hosted GitHub Actions runner
- AWS EC2 deployment, Staging → Production workflow

#### 💡 Key Takeaway
DevOps isn't about knowing 50 tools. It's about understanding how those tools work together to solve real engineering problems.

📈 30/90 COMPLETE
Next goal: Kubernetes, deeper AWS, observability, advanced CI/CD, Infrastructure as Code, and more production-grade architectures. ☸️☁️

## 19. Challenge Notes — Day 30: Real-World Kubernetes Deployment Example

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 30** of our Kubernetes journey! Today, we wrap up everything we've learned by deploying a fully functional, multi-tier application using key Kubernetes concepts from Days 23–29.


[![](https://img.youtube.com/vi/pAsUEqQ1eKI/0.jpg)](https://www.youtube.com/watch?v=pAsUEqQ1eKI)

[Watch the video](https://www.youtube.com/watch?v=pAsUEqQ1eKI)
---

#### 🎯 Objective

Deploy a complete **full-stack application** with the following components:

- **Frontend:** React application
- **Backend:** Express.js server exposing a REST API
- **Database:** PostgreSQL
- **Monitoring:** Prometheus + Grafana

---

#### 🗂️ Directory Structure

```

capstone/
├── k8s/
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
│   └── configmap.yaml
├── frontend/
│   ├── Dockerfile
│   ├── .env
│   └── \[React App Code]
├── backend/
│   ├── Dockerfile
│   └── \[Express App Code]
└── README.md

````

---

#### 🧰 Tools Used

- **Minikube** (local Kubernetes cluster)
- **kubectl** (K8s CLI)
- **Docker** (image builds)
- **Prometheus & Grafana** (monitoring)
- **NodePort & Port Forwarding** for local access

---

#### 🔧 Step-by-Step Deployment

##### 1. Start Minikube

```bash
minikube start --driver=docker
````

##### 2. Create Namespace

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: capstone-app
```

```bash
kubectl apply -f k8s/namespace.yaml
```

---

##### 3. Deploy PostgreSQL

```bash
kubectl apply -f k8s/postgres-deployment.yaml -n capstone-app
kubectl apply -f k8s/postgres-service.yaml -n capstone-app
```

---

##### 4. Deploy Backend

```bash
kubectl apply -f k8s/backend-deployment.yaml -n capstone-app
kubectl apply -f k8s/backend-service.yaml -n capstone-app
```

---

##### 5. Deploy Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml -n capstone-app
kubectl apply -f k8s/frontend-service.yaml -n capstone-app
```

---

##### 6. Access Frontend via Port Forwarding

```bash
kubectl port-forward svc/frontend -n capstone-app 32362:80
```

Then visit:
👉 `http://localhost:32362`

---

#### ✅ Verifications

* Access Frontend → “Connected to Backend”
* Inspect Network Request to `/api` → should return backend message
* Backend can access PostgreSQL
* All Pods show `STATUS: Running`

---

#### 📈 Bonus: Monitoring Setup

Install Prometheus & Grafana using Helm (optional):

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

Port forward to access UIs:

```bash
kubectl port-forward svc/prometheus-kube-prometheus-prometheus -n monitoring 9090
kubectl port-forward svc/grafana -n monitoring 3000:80
```

---

#### 🧠 Key Concepts Applied

| Concept         | Example Used                   |
| --------------- | ------------------------------ |
| Namespaces      | capstone-app                   |
| Deployments     | frontend, backend, postgres    |
| Services        | ClusterIP & NodePort           |
| ConfigMaps      | React app config via `.env`    |
| Port Forwarding | frontend exposed on port 32362 |
| DNS in Cluster  | `http://backend:3000/api`      |
| Monitoring      | Prometheus scraping services   |

---

#### 🎉 Congratulations!

You’ve now built and deployed a complete application using Kubernetes primitives! This project ties together all you've learned from Pods and Deployments to Services, Networking, ConfigMaps, and Observability.

---

#### 🧪 Try These Next

* Add Ingress with TLS
* Use PersistentVolumeClaim for PostgreSQL
* Horizontal Pod Autoscaling
* CI/CD pipeline with GitHub Actions and `kubectl apply`

---

> *“The best way to learn Kubernetes is to build real things. You just did. Onward!”*

```

---
```

## 20. Cohort Practice — Day 30: Docker Images & Container Lifecycle

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **understand how images and containers actually work**.

You will:
- Learn the relationship between images and containers
- Understand image layers and caching
- Master the full container lifecycle

---

#### Expected Output
- A markdown file: `day-30-images.md`
- Screenshots of key commands

---

#### Challenge Tasks

##### Task 1: Docker Images
1. Pull the `nginx`, `ubuntu`, and `alpine` images from Docker Hub
2. List all images on your machine — note the sizes
3. Compare `ubuntu` vs `alpine` — why is one much smaller?
4. Inspect an image — what information can you see?
5. Remove an image you no longer need

---

##### Task 2: Image Layers
1. Run `docker image history nginx` — what do you see?
2. Each line is a **layer**. Note how some layers show sizes and some show 0B
3. Write in your notes: What are layers and why does Docker use them?

---

##### Task 3: Container Lifecycle
Practice the full lifecycle on one container:
1. **Create** a container (without starting it)
2. **Start** the container
3. **Pause** it and check status
4. **Unpause** it
5. **Stop** it
6. **Restart** it
7. **Kill** it
8. **Remove** it

Check `docker ps -a` after each step — observe the state changes.

---

##### Task 4: Working with Running Containers
1. Run an Nginx container in detached mode
2. View its **logs**
3. View **real-time logs** (follow mode)
4. **Exec** into the container and look around the filesystem
5. Run a single command inside the container without entering it
6. **Inspect** the container — find its IP address, port mappings, and mounts

---

##### Task 5: Cleanup
1. Stop all running containers in one command
2. Remove all stopped containers in one command
3. Remove unused images
4. Check how much disk space Docker is using

---

#### Hints
- Image history: `docker image history`
- Create without starting: `docker create`
- Follow logs: `docker logs -f`
- Inspect: `docker inspect`
- Cleanup: `docker system df`, `docker system prune`

---

#### Submission
1. Add your `day-30-images.md` to `2026/day-30/`
2. Commit and push to your fork

---

#### Learn in Public
Share what surprised you about image layers or container states on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-30-images

##### Task 1: Docker Images
1. Pull the `nginx`, `ubuntu`, and `alpine` images from Docker Hub


docker pull nginx
docker pull ubuntu
docker pull alpine


2. List all images on your machine — note the sizes
IMAGE                       ID             DISK USAGE   CONTENT SIZE   EXTRA

alpine:latest               a2d49ea686c2       13.1MB         3.95MB
ubuntu:latest               f3d28607ddd7        160MB         45.3MB
nginx:latest                608a100c7165        241MB           66MB


3. Compare `ubuntu` vs `alpine` — why is one much smaller?
Built specifically for lightweight containers
uses musl libc instead of glibc
uses busybox utilities instead of full gnu tools
contains only the essentials needed to run applications
smaller download size , faster images pulls less store usage

4. Inspect an image — what information can you see?

docker inspect nginx
====================
[
    {
        "Id": "sha256:608a100c71651bf5b773c89083b4a1ad7ef4b2bd05d7a7e552271e03123692ad",
        "RepoTags": [
            "nginx:latest"
        ],
        "RepoDigests": [
            "nginx@sha256:608a100c71651bf5b773c89083b4a1ad7ef4b2bd05d7a7e552271e03123692ad"
        ],
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2026-06-11T00:23:30.136519073Z",
        "Config": {
            "ExposedPorts": {
                "80/tcp": {}
            },
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.31.1",
                "NJS_VERSION=0.9.9",
                "NJS_RELEASE=1~trixie",
                "ACME_VERSION=0.4.1",
                "PKG_RELEASE=1~trixie",
                "DYNPKG_RELEASE=1~trixie"
            ],
            "Entrypoint": [
                "/docker-entrypoint.sh"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
            },
            "StopSignal": "SIGQUIT"
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 63125971,
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:f4f8b983b714f130e2cff99176baa26352db6a55d3622e10ada40f2b4720a4eb",
                "sha256:af29206eb654bc703f8ac42874fced4323f978134f7c19e7c0c9edb14d16f2f7",
                "sha256:493aa43406a6150afbb5c00f0b42053768bad005e9a454ca638af8a5af0f9de4",
                "sha256:e8832fb2fc126ce5d91603b931812c2bf941a0169f565c0d777b7c3460a48e6c",
                "sha256:57b80f15e54052ec53ba5a764092724e74d586b7bfef068adc8aadaab4957d2c",
                "sha256:db054fb45c4c4d588f3bb6acd38a3a701426be7588400edba081eebb2e542192",
                "sha256:121b6a4dad004ecad3e8292a919d6a2344153529354a9c9c4718eb38df5048ff"
            ]
        },
        "Metadata": {
            "LastTagTime": "2026-06-15T16:49:15.073365114Z"
        },
        "Descriptor": {
            "mediaType": "application/vnd.oci.image.index.v1+json",
            "digest": "sha256:608a100c71651bf5b773c89083b4a1ad7ef4b2bd05d7a7e552271e03123692ad",
            "size": 10229
        }
    }
]
docker inspect ubuntu
=====================
[
    {
        "Id": "sha256:f3d28607ddd78734bb7f71f117f3c6706c666b8b76cbff7c9ff6e5718d46ff64",
        "RepoTags": [
            "ubuntu:latest"
        ],
        "RepoDigests": [
            "ubuntu@sha256:f3d28607ddd78734bb7f71f117f3c6706c666b8b76cbff7c9ff6e5718d46ff64"
        ],
        "Comment": "Add rock control metadata",
        "Created": "2026-04-21T17:22:47.070440543Z",
        "Config": {
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash"
            ],
            "Labels": {
                "org.opencontainers.image.created": "2026-04-21T17:23:54.324551+00:00",
                "org.opencontainers.image.description": "The Ubuntu container image maintained by Canonical\n\nUbuntu is a Debian-based Linux operating system that runs from the desktop to the cloud, to all your internet connected things.\nIt is the world's most popular operating system across public clouds and OpenStack clouds.\nIt is the number one platform for containers; from Docker to Kubernetes to LXD, Ubuntu can run your containers at scale.\nFast, secure and simple, Ubuntu powers millions of PCs worldwide.\n",
                "org.opencontainers.image.title": "ubuntu",
                "org.opencontainers.image.version": "26.04"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 41567720,
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:0c3db79307ab91dad11fad2b136a2b56df6efeeb567c4c99e6e316b63885c9f6",
                "sha256:f421a7e99ead34566fcb11403f6f38675b53035f39937394893eaf7d87c39f83"
            ]
        },
        "Metadata": {
            "LastTagTime": "2026-06-15T16:49:48.66748289Z"
        },
        "Descriptor": {
            "mediaType": "application/vnd.oci.image.index.v1+json",
            "digest": "sha256:f3d28607ddd78734bb7f71f117f3c6706c666b8b76cbff7c9ff6e5718d46ff64",
            "size": 6694
        }
    }
]

docker inspect alpine
====================
[
    {
        "Id": "sha256:a2d49ea686c2adfe3c992e47dc3b5e7fa6e6b5055609400dc2acaeb241c829f4",
        "RepoTags": [
            "alpine:latest"
        ],
        "RepoDigests": [
            "alpine@sha256:a2d49ea686c2adfe3c992e47dc3b5e7fa6e6b5055609400dc2acaeb241c829f4"
        ],
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2026-06-09T20:11:31.67032355Z",
        "Config": {
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh"
            ],
            "WorkingDir": "/"
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 3877603,
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:bc5a3fe779ad9e705b6c5d7fb7a482d1bf8b633e4e3e72152ea3f8953460cda9"
            ]
        },
        "Metadata": {
            "LastTagTime": "2026-06-15T16:49:56.143876831Z"
        },
        "Descriptor": {
            "mediaType": "application/vnd.oci.image.index.v1+json",
            "digest": "sha256:a2d49ea686c2adfe3c992e47dc3b5e7fa6e6b5055609400dc2acaeb241c829f4",
            "size": 9218
        }
    }
]

5. Remove an image you no longer need



docker rmi nginx
docker rmi ubuntu
docker rmi alpine




##### Task 2: Image Layers
1. Run `docker image history nginx` — what do you see?

ubuntu@ip-172-31-37-148:~$ docker image history nginx
IMAGE          CREATED      CREATED BY                                      SIZE      COMMENT
608a100c7165   4 days ago   CMD ["nginx" "-g" "daemon off;"]                0B        buildkit.dockerfile.v0
<missing>      4 days ago   STOPSIGNAL SIGQUIT                              0B        buildkit.dockerfile.v0
<missing>      4 days ago   EXPOSE map[80/tcp:{}]                           0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENTRYPOINT ["/docker-entrypoint.sh"]            0B        buildkit.dockerfile.v0
<missing>      4 days ago   COPY 30-tune-worker-processes.sh /docker-ent…   16.4kB    buildkit.dockerfile.v0
<missing>      4 days ago   COPY 20-envsubst-on-templates.sh /docker-ent…   12.3kB    buildkit.dockerfile.v0
<missing>      4 days ago   COPY 15-local-resolvers.envsh /docker-entryp…   12.3kB    buildkit.dockerfile.v0
<missing>      4 days ago   COPY 10-listen-on-ipv6-by-default.sh /docker…   12.3kB    buildkit.dockerfile.v0
<missing>      4 days ago   COPY docker-entrypoint.sh / # buildkit          8.19kB    buildkit.dockerfile.v0
<missing>      4 days ago   RUN /bin/sh -c set -x     && groupadd --syst…   87.1MB    buildkit.dockerfile.v0
<missing>      4 days ago   ENV DYNPKG_RELEASE=1~trixie                     0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENV PKG_RELEASE=1~trixie                        0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENV ACME_VERSION=0.4.1                          0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENV NJS_RELEASE=1~trixie                        0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENV NJS_VERSION=0.9.9                           0B        buildkit.dockerfile.v0
<missing>      4 days ago   ENV NGINX_VERSION=1.31.1                        0B        buildkit.dockerfile.v0
<missing>      4 days ago   LABEL maintainer=NGINX Docker Maintainers <d…   0B        buildkit.dockerfile.v0
<missing>      5 days ago   # debian.sh --arch 'amd64' out/ 'trixie' '@1…   87.4MB    debuerreotype 0.17


2. Each line is a **layer**. Note how some layers show sizes and some show 0B

Layer size > 0B 
================
-> These layer add , remove , or modify files

- these create new filesystem data , so docker shown their size.


Layer size with 0B
================
THese only add metadata or configuration.

these do not create files , so they consume no additional storage.

Docker Layer
============
A docker layer is made up multiple read only layers stacked on top of each other


3. Write in your notes: What are layers and why does Docker use them?


Docker images are built using multple read only layers stacked on the top of each other.

each instruction in a docker file , such as FROM, RUN, COPY, ADD creates a new layer
these layer tpgother from a complete docker images




Why Docker Uses Layers
Faster Builds – Docker reuses unchanged layers from the cache, reducing build time.
Storage Efficiency – Multiple containers can share the same image layers, saving disk space.
Faster Downloads – Docker downloads only the layers that have changed instead of the entire image.
Easy Versioning and Rollbacks – Layers are immutable, making it easy to track changes and revert to previous versions.
Improved Portability – Layered images can be efficiently shared across different environments.


##### Task 3: Container Lifecycle
Practice the full lifecycle on one container:
1. **Create** a container (without starting it)
=> docker create --name my-container nginx

=> docker ps -a

CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS                      PORTS                                         NAMES
a8f2565ed640   nginx                  "/docker-entrypoint.…"   11 seconds ago   Created                                                                   mycontainer

2. **Start** the container

=> docker start a8f2565ed640
=> docker start mycontainer


3. **Pause** it and check status
=> docker pause mycontainer

4. **Unpause** it

=> docker unpause mycontainer


5. **Stop** it

docker stop mycontainer

6. **Restart** it

docker restart mycontainer


7. **Kill** it

docker kill 
8. **Remove** it

docker remove mycontainer


Check `docker ps -a` after each step — observe the state changes.

CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS                        PORTS                                         NAMES
a8f2565ed640   nginx                  "/docker-entrypoint.…"   5 minutes ago    Exited (137) 38 seconds ago                                                 mycontainer
e220a512f880   6c112c1e6bc0           "/bin/sh -c 'javac H…"   44 minutes ago   Exited (2) 44 minutes ago                                                   modest_snyder
262769750e45   todo-list              "/__cacert_entrypoin…"   46 minutes ago   Exited (1) 46 minutes ago                                                   inspiring_roentgen
18d593e2040d   632a58b961c0           "/__cacert_entrypoin…"   50 minutes ago   Exited (1) 50 minutes ago                                                   sleepy_shamir
32536eecfb9b   826a037d50f6           "/__cacert_entrypoin…"   50 minutes ago   Exited (1) 50 minutes ago                                                   strange_thompson
87e2c908dfaf   826a037d50f6           "/__cacert_entrypoin…"   51 minutes ago   Exited (1) 51 minutes ago                                                   wizardly_vaughan
f0e11309ad53   23f4a6fe1b28           "/bin/sh -c 'javac /…"   53 minutes ago   Exited (2) 53 minutes ago                                                   vigorous_blackwell
06304573ef3f   5a6020bd1428           "/bin/sh -c 'javac s…"   54 minutes ago   Exited (2) 54 minutes ago                                                   inspiring_cori
938f736b6990   5a6020bd1428           "/bin/sh -c 'javac T…"   55 minutes ago   Exited (2) 55 minutes ago                                                   lucid_allen
889f472adc1e   devops-utilities-api   "python main.py"         2 hours ago      Exited (0) 8 minutes ago                                                    hungry_lovelace
7e1eaa2a85f2   devops-utilities-api   "python main.py"         25 hours ago     Up 25 hours                   0.0.0.0:8000->8000/tcp, [::]:8000->8000/tcp   peaceful_leakey







##### Task 4: Working with Running Containers
1. Run an Nginx container in detached mode
docker run -d nginx
docker exec -it d8afbb59dab6 bash

2. View its **logs**

docker logs d8afbb59dab6

3. View **real-time logs** (follow mode)

docker logs -f d8afbb59dab6
docker logs -f mycontainer

4. **Exec** into the container and look around the filesystem

docker exec -it d8afbb59dab6 bash
pwd - present working directory
ls
ls -la


5. Run a single command inside the container without entering it

=> docker exec d8afbb59dab6 hostname
=> ubuntu@ip-172-31-37-148:~/Docker$ docker exec d8afbb59dab6 ls -la /usr/share/nginx/html
total 16
drwxr-xr-x 2 root root 4096 Jun 11 00:23 .
drwxr-xr-x 3 root root 4096 Jun 11 00:23 ..
-rw-r--r-- 1 root root  497 May 22 12:50 50x.html
-rw-r--r-- 1 root root  896 May 22 12:50 index.html

6. **Inspect** the container — find its IP address, port mappings, and mounts


docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' d8afbb59dab6

=> 172.17.0.3



##### Task 5: Cleanup
1. Stop all running containers in one command
docker stop container_id

2. Remove all stopped containers in one command
docker rm container_id

3. Remove unused images
docker rmi image_id

4. Check how much disk space Docker is using

docker system df
===============
ubuntu@ip-172-31-37-148:~/Docker$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          9         8         2.535GB   2.102GB (82%)
Containers      12        2         3.015MB   1.565MB (51%)
Local Volumes   0         0         0B        0B
Build Cache     0         0         0B        0B

## 21. Hands-on Project — Day 30: AWS Organizations & Service Control Policies (SCPs)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **AWS Organizations** guardrails with **Service Control Policies (SCPs)**. You’ll bootstrap (or connect to) an Organization, create **Organizational Units (OUs)**, and attach **opinionated SCPs** that enforce baseline security and region restrictions across accounts.

> ⚠️ **Important**: Many Organizations operations must be run from the **management (payer) account** with elevated permissions. Some actions are **destructive** or **restrictive**. Test in a sandbox **org** first.

---

#### 🎯 Learning Goals
- Understand **root**, **OU**, and **account** hierarchy.
- Create and attach **SCPs** (deny by default-allow model) for guardrails:
  - **DenyLeavingOrg** — prevent accounts leaving the org
  - **DenyRootAccessKeys** — block creating access keys for root
  - **RequireMFARoot** — deny most actions if root user MFA not enabled
  - **DenyStopCloudTrail** — block disabling CloudTrail/GuardDuty/SecurityHub
  - **DenyPublicS3** — deny S3 Public* APIs at org scope
  - **AllowOnlyListedRegions** — limit actions to approved regions
- Apply **different SCP sets per OU** (e.g., `Sandbox`, `Prod`).

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (adjust org/OU names and allowed regions)
terraform -chdir=terraform plan   -var='org_feature_set=ALL'   -var='allowed_regions=["us-east-1","us-west-2"]'   -var='enable_prod_ou=true' -var='enable_sandbox_ou=true'

# 3) Apply
terraform -chdir=terraform apply -auto-approve

# 4) Attach accounts to OUs (if not already)
# Either move existing accounts into the OU in console, or use aws_organizations_account + aws_organizations_move_account.
```

**Notes**
- SCPs do **not** grant permissions; they set the **maximum permissions boundary**. IAM roles/users still need explicit permissions.
- The **Root** entity can have SCPs, which then apply to everything underneath unless explicitly excluded.
- Be careful with **region restriction** SCP — keep at least one region allowed for management.

---

#### 💡 Challenge
- Add an **exception SCP** for a specific account (attach a less restrictive SCP).
- Create a **DenyDataDestruction** SCP for destructive actions (e.g., `s3:DeleteBucket`, `kms:ScheduleKeyDeletion`, `ec2:TerminateInstances`) with break‑glass tags.
- Manage **Tag Policies** and **AI services opt‑out** (AWS policy types) for FinOps/Governance.

---

#### ✅ Checklist
- [ ] Organization active with **ALL features**
- [ ] `Sandbox` and/or `Prod` OU created
- [ ] SCPs attached at **Root and OU** levels
- [ ] Accounts in OU inherit guardrails (verify via **Organizations → Policies**)

---

#### 📌 Commit
```bash
git add day30-organizations-and-scps
git commit -m "day30: AWS Organizations + SCPs — baseline guardrails for sandbox/prod with region allow list"
git push
```

### Files

- [policies/allow_only_listed_regions.json](files/hands-on-projects/policies/allow_only_listed_regions.json)
- [policies/deny_leaving_org.json](files/hands-on-projects/policies/deny_leaving_org.json)
- [policies/deny_public_s3.json](files/hands-on-projects/policies/deny_public_s3.json)
- [policies/deny_root_access_keys.json](files/hands-on-projects/policies/deny_root_access_keys.json)
- [policies/deny_stop_cloudtrail.json](files/hands-on-projects/policies/deny_stop_cloudtrail.json)
- [policies/require_mfa_root.json](files/hands-on-projects/policies/require_mfa_root.json)
- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 29](../day-29/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 31 →](../day-31/README.md)
