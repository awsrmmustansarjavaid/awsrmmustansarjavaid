# Day 31 — Dockerfile Best Practices: Build Your Own Images

[← Day 30](../day-30/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 32 →](../day-32/README.md)

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

- [ ] Write efficient, secure Dockerfiles
- [ ] Use build cache, .dockerignore, ARG/ENV, ENTRYPOINT/CMD
- [ ] Lint with hadolint

## 2. Prerequisites

- Day 30.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Instructions

FROM, WORKDIR, COPY, RUN, ENV, ARG, EXPOSE, USER, HEALTHCHECK, ENTRYPOINT, CMD. Each instruction creates a layer; order from least- to most-frequently changing to maximise cache hits.

### 3.2 Best practices

Small pinned base images, combine RUN steps, clean package caches, `.dockerignore`, run as non-root, one process per container, exec-form CMD for correct signal handling.

### 3.3 ENTRYPOINT vs CMD

ENTRYPOINT is the executable; CMD supplies default args and is easily overridden.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write a Dockerfile for a Flask/Node app; build and run it.
2. [ ] Add `.dockerignore` and observe build-context size change.
3. [ ] Reorder COPY to cache dependency install; rebuild and compare times.
4. [ ] Add `USER app` and `HEALTHCHECK`.
5. [ ] Run `hadolint Dockerfile` and fix warnings.

## 5. Real-World Scenario

> Image builds take 9 minutes and the image is 1.4 GB. Cut build time below 1 minute on rebuilds and size by 70%.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd -r app && chown -R app /app
USER app
HEALTHCHECK CMD python -c "import urllib.request;urllib.request.urlopen('http://localhost:5000/health')"
CMD ["python","app.py"]
# build/run
docker build -t myapp:1.0 . && docker run -d -p 5000:5000 myapp:1.0
hadolint Dockerfile
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 31 – Dockerfile: Build Your Own Images — Challenge Brief

#### Task
Today's goal is to **write Dockerfiles and build custom images**.

This is the skill that separates someone who uses Docker from someone who actually ships with Docker.

---

#### Expected Output
- A markdown file: `day-31-dockerfile.md`
- All Dockerfiles you create

---

#### Challenge Tasks

##### Task 1: Your First Dockerfile
1. Create a folder called `my-first-image`
2. Inside it, create a `Dockerfile` that:
   - Uses `ubuntu` as the base image
   - Installs `curl`
   - Sets a default command to print `"Hello from my custom image!"`
3. Build the image and tag it `my-ubuntu:v1`
4. Run a container from your image

**Verify:** The message prints on `docker run`

---

##### Task 2: Dockerfile Instructions
Create a new Dockerfile that uses **all** of these instructions:
- `FROM` — base image
- `RUN` — execute commands during build
- `COPY` — copy files from host to image
- `WORKDIR` — set working directory
- `EXPOSE` — document the port
- `CMD` — default command

Build and run it. Understand what each line does.

---

##### Task 3: CMD vs ENTRYPOINT
1. Create an image with `CMD ["echo", "hello"]` — run it, then run it with a custom command. What happens?
2. Create an image with `ENTRYPOINT ["echo"]` — run it, then run it with additional arguments. What happens?
3. Write in your notes: When would you use CMD vs ENTRYPOINT?

---

##### Task 4: Build a Simple Web App Image
1. Create a small static HTML file (`index.html`) with any content
2. Write a Dockerfile that:
   - Uses `nginx:alpine` as base
   - Copies your `index.html` to the Nginx web directory
3. Build and tag it `my-website:v1`
4. Run it with port mapping and access it in your browser

---

##### Task 5: .dockerignore
1. Create a `.dockerignore` file in one of your project folders
2. Add entries for: `node_modules`, `.git`, `*.md`, `.env`
3. Build the image — verify that ignored files are not included

---

##### Task 6: Build Optimization
1. Build an image, then change one line and rebuild — notice how Docker uses **cache**
2. Reorder your Dockerfile so that frequently changing lines come **last**
3. Write in your notes: Why does layer order matter for build speed?

---

#### Hints
- Build: `docker build -t name:tag .`
- The `.` at the end is the build context
- `COPY . .` copies everything from host to container
- Nginx serves files from `/usr/share/nginx/html/`

---

#### Submission
1. Add your Dockerfiles and `day-31-dockerfile.md` to `2026/day-31/`
2. Commit and push to your fork

---

#### Learn in Public
Share your custom Docker image or Nginx screenshot on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐳Day 31 – Dockerfile: Build Your Own Images — Notes & Solution

#### 🎯Task
Today's goal is to **write Dockerfiles and build custom images**.
Today I learned how to:

- 📝 Write a Dockerfile
- 🏗️ Build a custom Docker image
- 📦 Run containers from custom images
- ⚙️ Understand Dockerfile instructions
- 🔄 Understand CMD vs ENTRYPOINT
- 🌐 Build a simple Nginx web image
- 🚫 Use .dockerignore
- ⚡ Optimize Docker builds using cache

#### Challenge Tasks

##### 🏗️Task 1: Your First Dockerfile
1. Create a folder called `my-first-image`
2. Inside it, create a `Dockerfile` that:
   - Uses `ubuntu` as the base image
   - Installs `curl`
   - Sets a default command to print `"Hello from my custom image!"`
3. Build the image and tag it `my-ubuntu:v1`
4. Run a container from your image
<img width="662" height="332" alt="Screenshot 2026-08-22 143728" src="https://github.com/user-attachments/assets/3fb6e7b9-79a0-4cf1-8b54-01f3e8d43cb2" />
<img width="1919" height="573" alt="Screenshot 2026-08-22 144031" src="https://github.com/user-attachments/assets/173c9313-8578-44d6-bafe-2dfd167b64ff" />

5. Run a container from your image

<img width="947" height="86" alt="Screenshot 2026-08-22 144200" src="https://github.com/user-attachments/assets/d106ea6c-d0da-456c-a4f1-d3de065e5b54" />


**Verify:** The message prints on `docker run`

##### 🐳 Docker Errors Faced and debugged

❌ Error 1: [echo: not found
 ``/bin/sh: 1: [echo: not found ``

Reason :

 - Image  ``(my-ubuntu:v1) `` was built earlier with an  ``incorrect CMD ``

 - Dockerfile was fixed later, but image was  ``not rebuilt ``

 - Docker kept using the old broken image

Fix :

docker build -t my-ubuntu:v2 .
docker run my-ubuntu:v2

Key Learning :

Docker images are  ``immutable — always rebuild after Dockerfile changes. ``

 ❌ Error 2: ``Wrong Dockerfile Name``

 Docker only auto-detects a file named exactly Dockerfile
(case-sensitive).
Fix: If the file is named incorrectly (e.g. DockerFile, dockerfile, Dockerfile-dev), Docker will fail to build unless explicitly     told which file to use.

❌ Error 3:  ``Container name already in use ``

Conflict. The container name "/first-container" is already in use
Reason :
 - A container named first-container already exists
 - Docker does not allow  ``duplicate container names ``
Fix :
docker rm first-container
or
`docker run --name first-container-v2 my-ubuntu:v1`

Key Learning :
Container names must be unique.

---

##### 🧱Task 2: Dockerfile Instructions
Create a new Dockerfile that uses **all** of these instructions:
- `FROM` `ubuntu`
Uses lightweight ubuntu image based on Alpine Linux.

- `WORKDIR` `/app`
Sets /app as working directory inside container.

- `COPY hello.txt .`
Copies everything from your my-first-image folder into /app inside container.


- `EXPOSE 8080`
Documents that container uses port 8080.

- `CMD ["cat", "hello.txt"]`
<img width="770" height="367" alt="Screenshot 2026-08-22 144651" src="https://github.com/user-attachments/assets/e12b9208-a9f1-4dfc-a1b0-0cac4439569a" />
<img width="1728" height="584" alt="Screenshot 2026-08-22 150130" src="https://github.com/user-attachments/assets/363cdd6d-156f-47e5-b11e-409e23cd99d2" />

---

##### 🔄Task 3: CMD vs ENTRYPOINT
1. Create an image with `CMD ["echo", "hello"]` — run it, then run it with a custom command. What happens?
<img width="430" height="96" alt="Screenshot 2026-08-22 150239" src="https://github.com/user-attachments/assets/07fb5ddc-3ecd-452d-a5b1-773ae7b523a0" />
<img width="1919" height="386" alt="Screenshot 2026-08-22 150400" src="https://github.com/user-attachments/assets/c897cea1-64c1-486f-8e70-117e2c3e1b2c" />
<img width="1309" height="94" alt="Screenshot 2026-08-22 150438" src="https://github.com/user-attachments/assets/6b2d198b-211c-4555-a990-0450aa49b2d8" />

- Run without arguments: The container runs the default command echo hello and outputs:

`hello`

- Run with a custom command: When you run the container with a custom command (e.g., echo "custom command"), the custom command completely overrides the CMD, so the output is:

`custom command`

2. Create an image with `ENTRYPOINT ["echo"]` — run it, then run it with additional arguments. What happens?

<img width="418" height="113" alt="Screenshot 2026-08-22 150544" src="https://github.com/user-attachments/assets/4b1a0f83-0290-4550-820a-07a6582ffd94" />
<img width="1919" height="339" alt="Screenshot 2026-08-22 150827" src="https://github.com/user-attachments/assets/6b1f4ff0-362e-4e16-8a8b-8b89604a334a" />
<img width="1140" height="90" alt="Screenshot 2026-08-22 150947" src="https://github.com/user-attachments/assets/e9955928-5617-43f9-961b-6b33c7edac31" />


- Run without arguments: The container runs echo with no arguments,resulting in a blank line (no output).

- Run with additional arguments: When you pass arguments (e.g., hello-world), they are appended to the ENTRYPOINT, so it runs echo hello-world and outputs:

`hello-world`

3. Write in your notes: When would you use CMD vs ENTRYPOINT?

- Use CMD when you want to provide a default command that can be changed easily when you run the container.
- Use ENTRYPOINT when you want to set a fixed command that always runs.

#### CMD vs ENTRYPOINT — Quick Memory Table

| Aspect | CMD | ENTRYPOINT |
|------|-----|-----------|
| Purpose | Provides a default command | Defines the main executable |
| Overridden by `docker run` | ✅ Yes | ❌ No (unless `--entrypoint`) |
| User input treated as | New command | Arguments to the executable |
| Flexibility | High | Low (fixed behavior) |
| Best use case | Dev, utility, base images | Apps, CLIs, production services |
| Common example | `CMD ["bash"]` | `ENTRYPOINT ["nginx"]` |
| If both are used | CMD is replaced | ENTRYPOINT always runs |
| Interview memory line | “CMD is a default” | “ENTRYPOINT is mandatory” |

##### One-Line Memory Trick
**CMD = suggestion | ENTRYPOINT = rule**

---

##### 🌐Task 4: Build a Simple Web App Image
1. Create a small static HTML file (`index.html`) with any content

2. Write a Dockerfile that:
   - Uses `nginx:alpine` as base
   - Copies your `index.html` to the Nginx web directory
3. Build and tag it `my-website:v1`
4. Run it with port mapping and access it in your browser
<img width="1762" height="626" alt="Screenshot 2026-08-22 151514" src="https://github.com/user-attachments/assets/55e37983-c0ac-4081-b135-5f5e6f6ad69f" />
<img width="1617" height="474" alt="Screenshot 2026-08-22 151653" src="https://github.com/user-attachments/assets/6864827f-ec43-4df8-b0ea-018d0e733c72" />

---

##### 🚫Task 5: .dockerignore
1. Create a `.dockerignore` file in one of your project folders
2. Add entries for: `node_modules`, `.git`, `*.md`, `.env`
3. Build the image — verify that ignored files are not included
<img width="1919" height="692" alt="Screenshot 2026-08-22 152205" src="https://github.com/user-attachments/assets/dfb65081-c591-475c-989f-039deb52f9c1" />

- node_modules, .git, any .md files, and .env are not present.
- index.html or required files are present.

---

##### ⚡Task 6: Build Optimization

1. Build an image, then change one line and rebuild — notice how Docker uses **cache**
<img width="635" height="229" alt="Screenshot 2026-08-22 154450" src="https://github.com/user-attachments/assets/b439af83-fb45-4701-bd9d-f037244bf53e" />

<img width="1833" height="397" alt="Screenshot 2026-08-22 152905" src="https://github.com/user-attachments/assets/e322c462-04a4-45d1-858c-0d7cdbca7c88" />

Observation: The image is built successfully and all layers are created.

Change one line and rebuild: change in app.txt



<img width="1825" height="384" alt="Screenshot 2026-08-22 153009" src="https://github.com/user-attachments/assets/5b1f890b-edbf-42ca-ab7f-80664cfad39e" />


Observation:
Docker reused cached layers for: Base image, Working directory, Dependency installation.

3. Write in your notes: Why does layer order matter for build speed?
- Docker builds images in layers and caches each layer.
- If a layer changes, Docker Rebuilds that layer and all layers after it.
- By placing:
    - Rarely changing files (dependencies) first.
    - Frequently changing files (source code) last.
- Docker can reuse cached layers,resulting in faster rebuilds.

#### Docker Layer Order and Build Speed
Why Layer Order Matters for Build Speed?
- Docker uses caching to speed up builds. When you build an image, Docker checks each instruction in your Dockerfile:
- Caching Logic: If a layer hasn't changed, Docker reuses the cached version. However, once a layer is modified, all subsequent layers must be rebuilt from scratch.
- Optimal Order: You should place infrequently changed instructions (like installing OS packages or dependencies) at the top and frequently changed instructions (like your source code) at the bottom.
- Result: This ensures that when you edit your code, Docker only has to rebuild the very last layer, keeping builds fast.

---
#### 🎯 Day 31 Docker Flow

```text
📝 Dockerfile
      ↓
🏗️ docker build
      ↓
🖼️ Custom Docker Image
      ↓
🚀 docker run
      ↓
📦 Container
      ↓
🔎 Test / Inspect
      ↓
⚡ Optimize
      ↓
🧹 Cleanup
```

 ---
 
`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Containerise your healthcheck tool from Day 21. | You can demonstrate, without notes: *write efficient, secure Dockerfiles* — with evidence committed to `day-31/`. |
| 2 | Document cache-friendly ordering rules. | You can demonstrate, without notes: *use build cache, .dockerignore, ARG/ENV, ENTRYPOINT/CMD* — with evidence committed to `day-31/`. |
| 3 | Compare shell-form vs exec-form CMD with `docker stop` timing. | You can demonstrate, without notes: *lint with hadolint* — with evidence committed to `day-31/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Build is slow every time | Cache busted by early `COPY . .`; copy lockfiles first. |
| App unreachable | Bind to 0.0.0.0 inside the container and publish the port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** No secrets in ARG/ENV/layers (they persist in history). Use BuildKit secrets: `RUN --mount=type=secret`. Run as non-root.
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

1. ENTRYPOINT vs CMD?
2. Why order COPY carefully?
3. Why use .dockerignore?
4. Why exec-form CMD?
5. **Scenario:** Image builds take 9 minutes and the image is 1. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I write a cache-efficient Dockerfile? | ☐ | ☐ | ☐ | ☐ |
| Can I run as non-root? | ☐ | ☐ | ☐ | ☐ |
| Can I pass hadolint? | ☐ | ☐ | ☐ | ☐ |
| Write efficient, secure Dockerfiles | ☐ | ☐ | ☐ | ☐ |
| Use build cache, .dockerignore, ARG/ENV, ENTRYPOINT/CMD | ☐ | ☐ | ☐ | ☐ |
| Lint with hadolint | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-31/` in your own repository:

```text
day-31/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-31
git add day-31/
git commit -m "day-31: dockerfile best practices"
git push -u origin day-31
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

## 18. Personal Learning Journal — Day 31: Automated Jenkins Pipeline & GitHub Integration

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

“Automation becomes powerful when a code change can trigger the entire delivery process without manual intervention.” 🚀

Today I moved deeper into CI/CD automation by building an automated Jenkins pipeline for a Flask application and connecting Jenkins with GitHub using Webhooks, SCM, and a Jenkinsfile.

#### 🔧 What I Implemented

##### 🔗 GitHub → Jenkins Integration
- Connected my GitHub repository with Jenkins. 
- Configured GitHub Webhooks to automatically notify Jenkins whenever changes are pushed. 
- Eliminated the need for manually triggering builds after every code change. 

##### ⚙️ Jenkins Pipeline
Created a Jenkins pipeline using a Jenkinsfile stored directly inside the GitHub repository, following a Pipeline-as-Code approach.
The pipeline includes:
`GitHub → Webhook → Jenkins → SCM Checkout → Build → Test → Docker Hub → Deploy`

##### 🧩 SCM Integration
- Configured Jenkins to pull source code directly from GitHub. 
- Used Declarative Pipeline syntax. 
- Managed pipeline configuration through version-controlled code. 

##### 🐍 Flask Application
- Used my Flask application as the deployment project. 
- Automated the process from source-code checkout through build, testing, containerization, and deployment. 

##### 🐳 Docker Integration
- Built the application into a Docker image. 
- Pushed the image to Docker Hub. 
- Used the generated image as part of the deployment workflow. 

##### 📊 Pipeline Monitoring
The Jenkins Stage View gave me visibility into each stage of the pipeline:
`Declarative Checkout → Clone/Pull → Build → Test → Push to Docker Hub → Deploy`
In my successful run, the complete pipeline finished in approximately 25 seconds, demonstrating how automation can significantly reduce repetitive manual work.

#### 💡 Key Learning
One of my biggest takeaways today was understanding the difference between simply running Jenkins and actually building an automated CI/CD workflow.
The real power comes from connecting: `GitHub + Webhooks + Jenkins + Jenkinsfile + Docker + Deployment`
Now, instead of manually checking for code changes and starting a deployment, a Git push can automatically trigger the pipeline.

## 19. Challenge Notes — Day 31: Jenkins and CICD Fundamentals

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 31** of our DevOps 90-Day Challenge!
Today we are starting our journey with **Jenkins**, one of the most popular CI/CD automation tools in the DevOps ecosystem.

[![](https://img.youtube.com/vi/0J4WQqVoxHE/0.jpg)](https://www.youtube.com/watch?v=0J4WQqVoxHE)
[Watch the video](https://www.youtube.com/watch?v=0J4WQqVoxHE)

---

#### Objective

By the end of this session, you will:

* Understand what Jenkins is and why it’s used in DevOps.
* Learn Jenkins architecture (Master & Agents).
* Install Jenkins on your system (Linux/Windows/Docker).
* Run your first Jenkins job.

---

#### Tools Used

* **Jenkins** (Open-source CI/CD tool)
* **Java (JDK 11 or higher)**
* **Docker (optional, if you want containerized Jenkins)**
* **GitHub** (for source code integration)

---

#### Step-by-Step Guide

##### 1. Install Java

Jenkins requires Java. On Ubuntu:

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
java -version
```

##### 2. Install Jenkins

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
```

Start & enable service:

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

##### 3. Access Jenkins

Open in browser:
`http://localhost:8080`

Unlock Jenkins using the initial admin password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

##### 4. Install Plugins & Setup Admin

* Install suggested plugins
* Create admin user
* Configure system

##### 5. Create Your First Job

* Go to **New Item** → Select **Freestyle project**
* Add **Build Step** → `echo "Hello from Jenkins!"`
* Run the job

---

#### Verification

* Jenkins is accessible on `http://localhost:8080`
* Plugins installed successfully
* First job executes and prints "Hello from Jenkins!"

---

#### Key Concepts Applied

| Concept           | Example Used                  |
| ----------------- | ----------------------------- |
| CI/CD Basics      | Jenkins automates code builds |
| Jenkins Master    | Installed on local server     |
| Agents            | (Optional) run jobs remotely  |
| Freestyle Project | Simple job to test Jenkins    |

---

#### Congratulations!

You’ve successfully installed Jenkins and run your very first job! From here, we’ll dive deeper into **pipelines, plugins, integrations, and automation**.

---

#### Try These Next

* Install Jenkins using **Docker** instead of bare-metal
* Connect Jenkins to **GitHub repository**
* Explore Jenkinsfile for pipeline automation

---

## 20. Cohort Practice — Day 31: Dockerfile: Build Your Own Images

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **write Dockerfiles and build custom images**.

This is the skill that separates someone who uses Docker from someone who actually ships with Docker.

---

#### Expected Output
- A markdown file: `day-31-dockerfile.md`
- All Dockerfiles you create

---

#### Challenge Tasks

##### Task 1: Your First Dockerfile
1. Create a folder called `my-first-image`
2. Inside it, create a `Dockerfile` that:
   - Uses `ubuntu` as the base image
   - Installs `curl`
   - Sets a default command to print `"Hello from my custom image!"`
3. Build the image and tag it `my-ubuntu:v1`
4. Run a container from your image

**Verify:** The message prints on `docker run`

---

##### Task 2: Dockerfile Instructions
Create a new Dockerfile that uses **all** of these instructions:
- `FROM` — base image
- `RUN` — execute commands during build
- `COPY` — copy files from host to image
- `WORKDIR` — set working directory
- `EXPOSE` — document the port
- `CMD` — default command

Build and run it. Understand what each line does.

---

##### Task 3: CMD vs ENTRYPOINT
1. Create an image with `CMD ["echo", "hello"]` — run it, then run it with a custom command. What happens?
2. Create an image with `ENTRYPOINT ["echo"]` — run it, then run it with additional arguments. What happens?
3. Write in your notes: When would you use CMD vs ENTRYPOINT?

---

##### Task 4: Build a Simple Web App Image
1. Create a small static HTML file (`index.html`) with any content
2. Write a Dockerfile that:
   - Uses `nginx:alpine` as base
   - Copies your `index.html` to the Nginx web directory
3. Build and tag it `my-website:v1`
4. Run it with port mapping and access it in your browser

---

##### Task 5: .dockerignore
1. Create a `.dockerignore` file in one of your project folders
2. Add entries for: `node_modules`, `.git`, `*.md`, `.env`
3. Build the image — verify that ignored files are not included

---

##### Task 6: Build Optimization
1. Build an image, then change one line and rebuild — notice how Docker uses **cache**
2. Reorder your Dockerfile so that frequently changing lines come **last**
3. Write in your notes: Why does layer order matter for build speed?

---

#### Hints
- Build: `docker build -t name:tag .`
- The `.` at the end is the build context
- `COPY . .` copies everything from host to container
- Nginx serves files from `/usr/share/nginx/html/`

---

#### Submission
1. Add your Dockerfiles and `day-31-dockerfile.md` to `2026/day-31/`
2. Commit and push to your fork

---

#### Learn in Public
Share your custom Docker image or Nginx screenshot on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-31-dockerfile

##### Task 1: Your First Dockerfile
1. Create a folder called `my-first-image`
2. Inside it, create a `Dockerfile` that:
   - Uses `ubuntu` as the base image
   - Installs `curl`
   - Sets a default command to print `"Hello from my custom image!"`
3. Build the image and tag it `my-ubuntu:v1`
4. Run a container from your image

**Verify:** The message prints on `docker run`


FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean

CMD ["echo", "Hello from my custom image!"]


docker build -t my-ubuntu:v1 .

docker run my-ubuntu:v1

docker images

docker inspect my-ubuntu:v1

docker logs 00ebbbe545dc


##### Task 2: Dockerfile Instructions
Create a new Dockerfile that uses **all** of these instructions:
- `FROM` — base image
- `RUN` — execute commands during build
- `COPY` — copy files from host to image
- `WORKDIR` — set working directory
- `EXPOSE` — document the port
- `CMD` — default command

Build and run it. Understand what each line does.
=============================================
FROM python:3.14

WORKDIR /app

COPY requirements.txt .

RUN pip install  -r requirements.txt

COPY . .

CMD ["python", "qrGenerator.py"]





##### Task 3: CMD vs ENTRYPOINT
1. Create an image with `CMD ["echo", "hello"]` — run it, then run it with a custom command. What happens?

FROM ubuntu:latest

CMD ["echo", "Hello"]


docker build -t cmd-demo .
docer run cmd-demo
docker ps
docker inspect cmd-demo


2. Create an image with `ENTRYPOINT ["echo"]` — run it, then run it with additional arguments. What happens?


FROM ubuntu:latest

ENTRYPOINT ["echo"]

docker build -f Dockerfile.entrypoint -t entrypoint-demo .
docker run entrypoint-demo
docker ps
docker inspect entrypoint-demo


3. Write in your notes: When would you use CMD vs ENTRYPOINT?

CMD
===
provides a default command
can be overridden at run time
flexible for different command

CMD ["python"m "app.py"]


ENTRYPOINT
==========
provides a fixed executable
arguments are appended to it
best for single -purpose containers

ENTRYPOINT ["nginx"]


##### Task 4: Build a Simple Web App Image
1. Create a small static HTML file (`index.html`) with any content
2. Write a Dockerfile that:
   - Uses `nginx:alpine` as base
   - Copies your `index.html` to the Nginx web directory
3. Build and tag it `my-website:v1`
4. Run it with port mapping and access it in your browser







create a index.html and write the html static page code

then write the Dockerfile.nginx


FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

EXPOSE 80


then
docker build -f Dockerfile.nginx -t my-website .
docker run -d -p 8001:80 --name website-container my-website

docker ps
docker images
docker logs my-website
docker inspect my-website



##### Task 5: .dockerignore
1. Create a `.dockerignore` file in one of your project folders
2. Add entries for: `node_modules`, `.git`, `*.md`, `.env`
3. Build the image — verify that ignored files are not included

---

project_chat_application/
├── client/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
│
└── docker-compose.yml


create the server Dockerfile
============================
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


docker build -t chat-server:v1 .
docker run -d --name chat-server -p 5000:5000 chat-server:v1
docker ps
docker logs chat-server
docker inspect chat-server


create client Dockerfile
========================
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

docker build -t chat-client:v1 .
docker run -d --name chat-client -p 3000:3000 chat-client:v1
docker logs chat-client
docker inspect chat-client


.dockerignore
=============.git
.github
.netlify
node_modules
client/node_modules
server/node_modules
.gitignore
README.md



##### Task 6: Build Optimization
1. Build an image, then change one line and rebuild — notice how Docker uses **cache**
2. Reorder your Dockerfile so that frequently changing lines come **last**
3. Write in your notes: Why does layer order matter for build speed?

## 21. Hands-on Project — Day 31: Jenkins Docker Agent

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Jenkins Docker Agent** — running Jenkins builds inside containerized agents.  
We’ll learn how to create a lightweight, reproducible Jenkins agent image that can build, test, and deploy applications from a Docker environment.

---

#### 🎯 Learning Goals
- Understand how Jenkins agents connect to the controller.  
- Build and run a **custom Docker agent** with all DevOps tools pre-installed.  
- Configure Jenkins to dynamically use Docker agents for CI/CD workloads.  
- Learn how to use this agent both locally and in a Kubernetes-based Jenkins setup.

---

#### 🛠️ Tasks

1. **Build your Jenkins Agent Docker Image**
   - Create a `Dockerfile` that includes:
     - Jenkins inbound agent
     - AWS CLI, Docker CLI
     - Terraform, kubectl, and Python3  
   - Example:
     ```dockerfile
     FROM jenkins/inbound-agent:latest
     USER root
     RUN apt-get update && apt-get install -y \
         docker.io awscli curl unzip python3 python3-pip && \
         curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
         echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list && \
         apt-get update && apt-get install terraform -y && \
         curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.29.0/bin/linux/amd64/kubectl" && \
         chmod +x kubectl && mv kubectl /usr/local/bin/ && \
         apt-get clean && rm -rf /var/lib/apt/lists/*
     USER jenkins
     ```

2. **Run the Agent Locally**
   ```bash
   docker build -t devops/jenkins-docker-agent:latest .
   docker run -d --name jenkins-agent \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v $HOME/.aws:/home/jenkins/.aws:ro \
     -e JENKINS_URL="https://jenkins.yourdomain.com/" \
     -e AGENT_NAME="docker-agent-1" \
     -e AGENT_SECRET="YOUR_AGENT_SECRET" \
     -e AGENT_WORKDIR="/home/jenkins/agent" \
     devops/jenkins-docker-agent:latest

3. **Integrate the Agent in Jenkins**
Go to Jenkins → Manage Nodes and Clouds → New Node

Choose “Permanent Agent” or “Docker Agent Template”

Fill in:

Remote root directory: /home/jenkins/agent

Labels: docker-agent

Launch method: “Launch agent by connecting it to the controller”
```

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [agent/Dockerfile](files/hands-on-projects/agent/Dockerfile)
- [agent/entrypoint.sh](files/hands-on-projects/agent/entrypoint.sh)
- [docker-compose.yml](files/hands-on-projects/docker-compose.yml)
- [k8s/jenkins-agent.yaml](files/hands-on-projects/k8s/jenkins-agent.yaml)


---

[← Day 30](../day-30/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 32 →](../day-32/README.md)
