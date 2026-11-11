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

---

[← Day 29](../day-29/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 31 →](../day-31/README.md)
