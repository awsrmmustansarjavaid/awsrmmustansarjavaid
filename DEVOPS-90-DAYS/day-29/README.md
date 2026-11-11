# Day 29 — Containers Fundamentals & Docker Installation

[← Day 28](../day-28/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 30 →](../day-30/README.md)

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

- [ ] Explain how containers differ from VMs
- [ ] Describe namespaces, cgroups and union filesystems
- [ ] Install Docker and run containers

## 2. Prerequisites

- Linux basics, Days 1-13.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Containers vs VMs

VMs virtualise hardware with a full guest OS; containers share the host kernel and isolate processes using namespaces (pid, net, mnt, uts, ipc, user) and limit resources using cgroups. Lighter, faster to start, but weaker isolation.

### 3.2 OCI and architecture

OCI defines image and runtime specs. Docker CLI -> dockerd -> containerd -> runc. Alternatives: Podman, containerd/nerdctl.

### 3.3 Core objects

Image (read-only layers), container (running instance), registry, volume, network.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Docker Engine (or Docker Desktop) and add user to `docker` group (understand the risk).
2. [ ] Run `hello-world`, `nginx`, `alpine sh -c`.
3. [ ] Inspect namespaces: `docker run -d nginx; ls -l /proc/<pid>/ns`.
4. [ ] Limit memory/CPU with `--memory 128m --cpus 0.5` and verify with `docker stats`.
5. [ ] Compare start time of a container vs a VM.

## 5. Real-World Scenario

> A developer says 'works on my machine'. Explain how containers fix environment drift and what they do NOT fix (kernel, data, config).

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
curl -fsSL https://get.docker.com | sh   # lab only; read the script first
docker version; docker info
docker run --rm hello-world
docker run -d --name web -p 8080:80 --memory 128m --cpus 0.5 nginx
docker ps; docker stats --no-stream
docker exec -it web sh
docker rm -f web
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 29 – Introduction to Docker — Challenge Brief

#### Task
Today's goal is to **understand what Docker is and run your first container**.

You will:
- Learn why containers exist and how they differ from VMs
- Install Docker on your machine
- Run and explore containers from Docker Hub

---

#### Expected Output
- A markdown file: `day-29-docker-basics.md`
- Screenshots of your running containers

---

#### Challenge Tasks

##### Task 1: What is Docker?
Research and write short notes on:
- What is a container and why do we need them?
- Containers vs Virtual Machines — what's the real difference?
- What is the Docker architecture? (daemon, client, images, containers, registry)

Draw or describe the Docker architecture in your own words.

---

##### Task 2: Install Docker
1. Install Docker on your machine (or use a cloud instance)
2. Verify the installation
3. Run the `hello-world` container
4. Read the output carefully — it explains what just happened

---

##### Task 3: Run Real Containers
1. Run an **Nginx** container and access it in your browser
2. Run an **Ubuntu** container in interactive mode — explore it like a mini Linux machine
3. List all running containers
4. List all containers (including stopped ones)
5. Stop and remove a container

---

##### Task 4: Explore
1. Run a container in **detached mode** — what's different?
2. Give a container a custom **name**
3. Map a **port** from the container to your host
4. Check **logs** of a running container
5. Run a command **inside** a running container

---

#### Hints
- `docker run`, `docker ps`, `docker stop`, `docker rm`
- Interactive mode: `-it` flag
- Detached mode: `-d` flag
- Port mapping: `-p host:container`
- Naming: `--name`
- Logs: `docker logs`
- Exec into container: `docker exec`

---

#### Why This Matters for DevOps
Docker is the foundation of modern deployment. Every CI/CD pipeline, Kubernetes cluster, and microservice architecture starts with containers. Today you took the first step.

---

#### Submission
1. Add your `day-29-docker-basics.md` to `2026/day-29/`
2. Commit and push to your fork

---

#### Learn in Public
Share your first Docker container screenshot on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐳Day 29 – Introduction to Docker — Notes & Solution

##### 🐳Task 1:

##### 🐳What is Docker?

- Docker is an open-source platform that enables developers to build, ship, and run applications inside lightweight, isolated environments called containers.

##### ❓Why we need?
- You can build locally,deploy to the cloud and run anywhere on any server.
- Shares the host kernel, making them much more efficient in therms of system resources than vitual machine.
- Makes collaboration easier, same environment for everyone.
- No version mismatch issues.

##### ⚔️Containers vs Virtual Machines

| Feature | Virtual Machines (VMs) | Containers |
|----------|------------------------|------------|
| **Virtualization Level** | Hardware-level virtualization | OS-level virtualization |
| **Architecture** | Includes full guest OS + hypervisor | Shares host OS kernel |
| **Size** | Large (GBs) | Small (MBs) |
| **Startup Time** | Slow (minutes) | Fast (seconds) |
| **Performance** | Slower due to OS overhead | Faster, lightweight |
| **Isolation** | Strong (separate OS per VM) | Process-level isolation |
| **Resource Usage** | High CPU, RAM, Storage usage | Efficient resource usage |
| **Portability** | Less portable | Highly portable |
| **Management** | Complex (manage full OS) | Simple (manage app + dependencies) |
| **Best For** | Legacy apps, multiple OS environments | Microservices, CI/CD, cloud-native apps |

##### 🏗️Docker architecture

<img width="474" height="371" alt="image" src="https://github.com/user-attachments/assets/7b78b23a-bc77-40f8-b08b-899da991f6af" />

---

##### 💻Docker Client

##### What it is ?
The Docker client is the command-line interface (CLI) used to interact with Docker. It acts as the command center.

##### How it works ?
You type commands in the Docker client, and it sends those requests to the Docker daemon, which performs the actual work.

##### Example Commands
- `docker build`
- `docker run`
- `docker pull`
- `docker push`

---

##### ⚙️Docker Daemon

##### What it is ?
The Docker daemon (`dockerd`) is the background service that manages Docker objects such as images, containers, networks, and volumes.

##### How it works ?
The daemon:
- Listens for Docker API requests from the Docker client
- Builds images
- Runs and manages containers
- Handles networking and storage

---

##### ☁️Docker Hub

##### What it is
Docker Hub is a cloud-based public registry for Docker images.

##### How it works
It works like an app store for container images. 

You can:
- **Pull** images created by others
- **Push** your own images

##### Usage
When you need an image to create a container, you can pull it from Docker Hub.

---

##### 🗄️Docker Registry

##### What it is ?
+ A Docker registry is a system that stores and distributes Docker images. Docker Hub is the most popular public registry,
but you can also create private registries.

Like- Username & password as a registry.

##### How it works ?
Registries:
- Store Docker images
- Allow users to pull images
- Allow users to push images

Private registries are commonly used by companies to securely store internal application images.

---

##### 🛠️Task 2: Install Docker
1. Install Docker on your machine (or use a cloud instance)
<img width="1915" height="739" alt="Screenshot 2026-08-20 140955" src="https://github.com/user-attachments/assets/24e6806e-3bc6-421b-81c1-b943330cb965" />

2. Verify the installation
<img width="1410" height="642" alt="Screenshot 2026-08-20 141736" src="https://github.com/user-attachments/assets/2c095261-c207-45b5-965b-0da37e5ddd57" />

3. Run the `hello-world` container: docker run hello-world
<img width="1410" height="642" alt="Screenshot 2026-08-20 141736" src="https://github.com/user-attachments/assets/2c095261-c207-45b5-965b-0da37e5ddd57" />

4. Read the output carefully — it explains what just happened
+ Docker didn’t find the hello-world image on your machine.
+ It downloaded (pulled) it from Docker Hub.
+ Docker created a container from that image.
+ The container ran a small program that printed “Hello from Docker!”
+ The container exited.

---

##### 🐳Task 3: Run Real Containers
1. Run an **Nginx** container and access it in your browser: **docker run -d -p 80:80 nginx <host_port>:<container_port>**
<img width="1318" height="345" alt="Screenshot 2026-08-20 141940" src="https://github.com/user-attachments/assets/bb2d1802-e8ec-4734-85ca-dca1fd13fd05" />
<img width="1919" height="680" alt="Screenshot 2026-08-20 142134" src="https://github.com/user-attachments/assets/3cee8b06-ff61-476a-a464-0d7c9fc9273c" />


2. Run an **Ubuntu** container in interactive mode — explore it like a mini Linux machine: **docker run -it ubuntu**
<img width="1890" height="731" alt="Screenshot 2026-08-20 142351" src="https://github.com/user-attachments/assets/0e8061f0-4754-42b8-a3e4-e18a1470a6ff" />

3. List all running containers: **docker ps**
4. List all containers (including stopped ones): **docker ps -a**
<img width="1913" height="245" alt="Screenshot 2026-08-20 142715" src="https://github.com/user-attachments/assets/bab3f4c2-182d-43fa-afa2-d86e37e36aca" />

5. Stop and remove a container: **docker stop && docker rm**
<img width="1247" height="186" alt="Screenshot 2026-08-20 142746" src="https://github.com/user-attachments/assets/e620c295-b688-4838-ab91-bbc64d728ec2" />

---

##### 🔍Task 4: Explore
1. Run a container in **detached mode** — **detached mode : detach mode run containers in background mode**
<img width="1140" height="54" alt="Screenshot 2026-08-20 142937" src="https://github.com/user-attachments/assets/ca5d497b-18b2-4877-9068-00ca4fc42f16" />

2. Give a container a custom **name: docker run -d --name web httpd**
<img width="1287" height="406" alt="Screenshot 2026-08-20 142925" src="https://github.com/user-attachments/assets/e6ed7c6a-c9af-4a43-afc6-8175064f11a8" />

3. Map a **port** from the container to your host: **docker run -d --name web2 -p 80:80 nginx <host_port>:<container_port>**
<img width="1899" height="185" alt="Screenshot 2026-08-20 143049" src="https://github.com/user-attachments/assets/07d0b31c-dcda-40ed-af10-1e637fdac6db" />

4. Check **logs** of a running container: **docker logs**
<img width="1893" height="568" alt="Screenshot 2026-08-20 143159" src="https://github.com/user-attachments/assets/6fb17965-37f8-46a8-ba0f-bf42d8bb8496" />

5. Run a command **inside** a running container: **docker exec -it**
<img width="1919" height="463" alt="Screenshot 2026-08-20 143315" src="https://github.com/user-attachments/assets/f653afcc-236f-4032-ab70-e731171f2889" />


#### 🚀Why This Matters for DevOps
+ Docker is the foundation of modern deployment. 
+ Every CI/CD pipeline, Kubernetes cluster, and microservice architecture starts with containers. 
+ Today you took the first step.

---
#### 🌟 My Key Takeaway

Docker helped me understand how applications can be packaged with their dependencies and run consistently across different environments.

Today was my first hands-on step into containerization, and this knowledge will become the foundation for learning Dockerfiles, Docker Compose, CI/CD, and Kubernetes. 🚀🐳

#### 🎯 Day 29 Completed!

Learn → Practice → Break → Fix → Repeat 🔄

- 🐳 One container today.
- ☸️ Kubernetes tomorrow.
- 🚀 DevOps journey continues!

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw container architecture (Docker->containerd->runc). | You can demonstrate, without notes: *explain how containers differ from VMs* — with evidence committed to `day-29/`. |
| 2 | Write a table: VM vs container vs serverless. | You can demonstrate, without notes: *describe namespaces, cgroups and union filesystems* — with evidence committed to `day-29/`. |
| 3 | Run the same app in Podman and compare. | You can demonstrate, without notes: *install Docker and run containers* — with evidence committed to `day-29/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `permission denied /var/run/docker.sock` | Add user to docker group and re-login (it is root-equivalent!) or use rootless mode. |
| Port already in use | `ss -tulpn` and change host port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Docker group = root. Prefer rootless Docker/Podman where possible; never expose the Docker socket or API without TLS.
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

1. Containers vs VMs?
2. What are namespaces and cgroups?
3. What is the OCI?
4. Why is the docker group dangerous?
5. **Scenario:** A developer says 'works on my machine'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain isolation mechanisms? | ☐ | ☐ | ☐ | ☐ |
| Can I limit container resources? | ☐ | ☐ | ☐ | ☐ |
| Can I inspect a running container? | ☐ | ☐ | ☐ | ☐ |
| Explain how containers differ from VMs | ☐ | ☐ | ☐ | ☐ |
| Describe namespaces, cgroups and union filesystems | ☐ | ☐ | ☐ | ☐ |
| Install Docker and run containers | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-29/` in your own repository:

```text
day-29/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-29
git add day-29/
git commit -m "day-29: containers fundamentals & docker installation"
git push -u origin day-29
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

---

[← Day 28](../day-28/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 30 →](../day-30/README.md)
