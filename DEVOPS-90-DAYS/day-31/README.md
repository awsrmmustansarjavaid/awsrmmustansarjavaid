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

---

[← Day 30](../day-30/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 32 →](../day-32/README.md)
