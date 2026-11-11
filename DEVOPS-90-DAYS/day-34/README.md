# Day 34 — Multi-Stage Builds, Registries & Image Tagging Strategy

[← Day 33](../day-33/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 35 →](../day-35/README.md)

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

- [ ] Build small production images with multi-stage Dockerfiles
- [ ] Push/pull images to Docker Hub, GHCR and ECR
- [ ] Design a tagging and retention strategy

## 2. Prerequisites

- Day 31.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Multi-stage

Separate build stage (compilers, dev deps) from runtime stage (only artefacts). Typical results: 800 MB -> 50 MB. Use distroless/scratch for static binaries.

### 3.2 Registries

Docker Hub, GitHub Container Registry, AWS ECR, Azure ACR, Harbor. Authenticate with tokens, not passwords.

### 3.3 Tagging

Immutable tags `app:1.4.2`, `app:git-<sha>`; avoid `latest` in deployments; keep digests in manifests; apply lifecycle rules to delete old images.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Convert a Go/Node/Java Dockerfile to multi-stage; compare sizes.
2. [ ] Tag with version and git SHA.
3. [ ] Push to GHCR using a PAT or `GITHUB_TOKEN`.
4. [ ] Pull by digest and verify.
5. [ ] Write a retention policy document.

## 5. Real-World Scenario

> Prod is running `app:latest` and nobody knows what version that is. Introduce traceable tags and a rollback plan.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
FROM golang:1.23 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /out/app .
FROM gcr.io/distroless/static:nonroot
COPY --from=build /out/app /app
ENTRYPOINT ["/app"]
# tag/push
echo $GHCR_TOKEN | docker login ghcr.io -u USER --password-stdin
docker tag app ghcr.io/USER/app:1.0.0 && docker push ghcr.io/USER/app:1.0.0
docker buildx imagetools inspect ghcr.io/USER/app:1.0.0
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 34 – Docker Compose: Real-World Multi-Container Apps — Challenge Brief

#### Task
Today's goal is to **build more complex, production-like setups with Docker Compose**.

Yesterday was basics. Today you handle real scenarios — app + database + cache, healthchecks, restart policies, and service dependencies.

---

#### Expected Output
- A markdown file: `day-34-compose-advanced.md`
- All compose files and Dockerfiles you create

---

#### Challenge Tasks

##### Task 1: Build Your Own App Stack
Create a `docker-compose.yml` for a 3-service stack:
- A **web app** (use Python Flask, Node.js, or any language you know)
- A **database** (Postgres or MySQL)
- A **cache** (Redis)

Write a simple Dockerfile for the web app. The app doesn't need to be complex — even a "Hello World" that connects to the database is enough.

---

##### Task 2: depends_on & Healthchecks
1. Add `depends_on` to your compose file so the app starts **after** the database
2. Add a **healthcheck** on the database service
3. Use `depends_on` with `condition: service_healthy` so the app waits for the database to be truly ready, not just started

**Test:** Bring everything down and up — does the app wait for the DB?

---

##### Task 3: Restart Policies
1. Add `restart: always` to your database service
2. Manually kill the database container — does it come back?
3. Try `restart: on-failure` — how is it different?
4. Write in your notes: When would you use each restart policy?

---

##### Task 4: Custom Dockerfiles in Compose
1. Instead of using a pre-built image for your app, use `build:` in your compose file to build from a Dockerfile
2. Make a code change in your app
3. Rebuild and restart with one command

---

##### Task 5: Named Networks & Volumes
1. Define **explicit networks** in your compose file instead of relying on the default
2. Define **named volumes** for database data
3. Add **labels** to your services for better organization

---

##### Task 6: Scaling (Bonus)
1. Try scaling your web app to 3 replicas using `docker compose up --scale`
2. What happens? What breaks?
3. Write in your notes: Why doesn't simple scaling work with port mapping?

---

#### Hints
- Build from Dockerfile: `build: ./app`
- Healthcheck: `healthcheck:` with `test`, `interval`, `timeout`
- Rebuild: `docker compose up --build`
- Scale: `docker compose up --scale web=3`

---

#### Submission
1. Add your compose files, Dockerfiles, and `day-34-compose-advanced.md` to `2026/day-34/`
2. Commit and push to your fork

---

#### Learn in Public
Share your 3-service app stack running via Compose on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐳 Day 34 – Docker Compose: Real-World Multi-Container Apps — Notes & Solution

##### 90 Days of DevOps – Day 34

Today I moved beyond basic Docker Compose and built a more production-like multi-container application using Docker Compose.

#### The application consists of:

- 🐍 Flask Web Application
- 🗄️ MySQL Database
-⚡ Redis Cache
- ❤️ Database Healthcheck
- 🔄 Restart Policies
- 🌐 Custom Docker Network
- 💾 Named Docker Volume
- 🏷️ Docker Labels
- 📈 Container Scaling

##### 📌 What I Built

##### I created a 3-tier application using Docker Compose.

                    🌐 User
                       │
                       ▼
              ┌─────────────────┐
              │   Flask Web App │
              │     Port 5000   │
              └────────┬────────┘
                       │
              ┌────────┴─────────┐
              │                  │
              ▼                  ▼
       ┌─────────────┐    ┌─────────────┐
       │    MySQL    │    │    Redis    │
       │    :3306    │    │    :6379    │
       └──────┬──────┘    └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ mysql-data  │
       │ NamedVolume │
       └─────────────┘

The Flask application connects to both MySQL and Redis through a custom Docker network.

#### Challenge Tasks

##### 🎯Task 1: Build Your Own App Stack
Create a `docker-compose.yml` for a 3-service stack:
- A **web app** (use Python Flask, Node.js, or any language you know)
- A **database** (Postgres or MySQL)
- A **cache** (Redis)

- Run and build all images - ```docker compose up -d```

<img width="1919" height="239" alt="Screenshot 2026-08-27 130610" src="https://github.com/user-attachments/assets/f0fe60cc-4ec2-412c-8d0c-5ba6f81c9e8a" />
<img width="1918" height="966" alt="Screenshot 2026-08-27 134010" src="https://github.com/user-attachments/assets/7086d9dd-4409-446c-952b-044d555c7569" />

---

##### 🐳Task 2: depends_on & Healthchecks
1. Add `depends_on` to your compose file so the app starts **after** the database
2. Add a **healthcheck** on the database service
3. Use `depends_on` with `condition: service_healthy` so the app waits for the database to be truly ready, not just started

**Test**: checking everything on docker compose **UP** & **DOWN** — does the app wait for the DB?
- **Yes**
<img width="1313" height="231" alt="Screenshot 2026-08-27 134146" src="https://github.com/user-attachments/assets/f45b7624-e9f0-4b16-bf74-d3e2f15fe7ad" />


- Postgres container starts first.
- Healthcheck waits until DB is ready.
- App container starts only after DB is healthy

---

##### 🔄Task 3: Restart Policies
1. Add `restart: always` to your database service
2. Manually kill the database container — does it come back?
- **Yes** - It is back.
<img width="1296" height="241" alt="Screenshot 2026-08-27 141304" src="https://github.com/user-attachments/assets/30fe5ecf-594e-4974-9dad-feea3a764a59" />


3. Try `restart: on-failure` — how is it different?
- Did't Restart But showing like healthy.
<img width="1919" height="441" alt="Screenshot 2026-08-27 130647" src="https://github.com/user-attachments/assets/ede40aba-c57a-4032-a198-f9f54d1f1817" />


4. Write in your notes: When would you use each restart policy?

    - `restart:always` `Use When:`
         Databases,
         Backend APIs,
         Production services,
         Anything that must always run,

    - `restart:on-failure` `Use When`:
         Data processing jobs
         One-time migration scripts

---

##### 🛠️Task 4: Custom Dockerfiles in Compose
1. Instead of using a pre-built image for your app, use `build:` in your compose file to build from a Dockerfile
2. Make a code change in your app
3. Rebuild and restart with one command

<img width="1919" height="239" alt="Screenshot 2026-08-27 130610" src="https://github.com/user-attachments/assets/019da5d7-e2fe-4ab9-9b46-b7f2cfb7f4e6" />
<img width="1919" height="441" alt="Screenshot 2026-08-27 130647" src="https://github.com/user-attachments/assets/478ac0c3-d8a2-4b68-b6ae-fdd0c6f9a634" />
<img width="1918" height="966" alt="Screenshot 2026-08-27 134010" src="https://github.com/user-attachments/assets/15a5bac5-b41a-45df-bb02-7cb0ca37132d" />


---

##### 🌐Task 5: Named Networks & Volumes
1. Define **explicit networks** in your compose file instead of relying on the default
2. Define **named volumes** for database data
3. Add **labels** to your services for better organization
<img width="1919" height="251" alt="Screenshot 2026-08-27 134408" src="https://github.com/user-attachments/assets/396ae92e-bdcb-4760-b88d-fddb00131364" />
<img width="1096" height="183" alt="Screenshot 2026-08-27 134531" src="https://github.com/user-attachments/assets/654cada3-68d0-421f-bbca-23c3fbb826cd" />


---

##### 📈Task 6: Scaling (Bonus)
1. Try scaling your web app to 3 replicas using `docker compose up --scale`

2. What happens? What breaks?

3. Write in your notes: Why doesn't simple scaling work with port mapping?
<img width="1919" height="335" alt="Screenshot 2026-08-27 141217" src="https://github.com/user-attachments/assets/11a90ee6-2d30-4a09-b921-6f716fd394b7" />


- First container started

- It binds host port 3000 = container port 3000.

- Second and third containers failed

- Status Created means Docker couldn’t start them, port-3000 - **Showing**- Like this - Bind for 0.0.0.0:3000 failed: port is already allocated.

- Docker can’t bind multiple containers to the same host port.

---

##### 🧠 What I Learned
1. Docker Compose can manage complete application stacks

Instead of manually starting every container, Docker Compose allows multiple services to be defined in one file.

2. Container startup does not mean application readiness

Healthchecks help determine whether a service is actually ready.

3. depends_on controls startup order

Using:

condition: service_healthy

allows the application to wait for a healthy dependency.

4. Restart policies improve reliability

Different restart policies are useful for different types of services.

5. Named volumes provide persistence

Database data can survive container recreation.

6. Docker networks enable service discovery

Containers can communicate using service names such as:

db
redis
7. Scaling requires proper traffic routing

Simply increasing container replicas isn't enough when every replica uses the same host port.

---

##### 🚀 Final Result

I successfully built a real-world multi-container application using Docker Compose with:

- ✅ Flask Web Application
- ✅ MySQL Database
- ✅ Redis Cache
- ✅ Custom Dockerfile
- ✅ Healthcheck
- ✅ depends_on
- ✅ Restart Policies
- ✅ Named Network
- ✅ Named Volume
- ✅ Docker Labels
- ✅ Application Health API
- ✅ Rebuild Workflow
- ✅ Scaling Experiment

This exercise helped me understand how Docker Compose moves from running individual containers to managing a complete application stack.

---

---

### 7.3 Application requirements.txt

```
Flask==3.1.3
mysql-connector-python==9.4.0
redis==6.4.0
```

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Build a multi-arch image with `docker buildx build --platform linux/amd64,linux/arm64`. | You can demonstrate, without notes: *build small production images with multi-stage Dockerfiles* — with evidence committed to `day-34/`. |
| 2 | Document tag conventions. | You can demonstrate, without notes: *push/pull images to Docker Hub, GHCR and ECR* — with evidence committed to `day-34/`. |
| 3 | Set up a registry cleanup rule. | You can demonstrate, without notes: *design a tagging and retention strategy* — with evidence committed to `day-34/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `denied: requested access` | Wrong login/scope or repository visibility. |
| `exec format error` | Architecture mismatch; build multi-arch. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use scoped tokens, enable vulnerability scanning on the registry, avoid public images with secrets, prefer minimal runtime images.
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

1. Why multi-stage builds?
2. Why avoid `latest`?
3. What is an image digest?
4. How do you secure registry access?
5. **Scenario:** Prod is running `app:latest` and nobody knows what version that is. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I reduce an image by 70%? | ☐ | ☐ | ☐ | ☐ |
| Can I push to a registry securely? | ☐ | ☐ | ☐ | ☐ |
| Can I define tag policy? | ☐ | ☐ | ☐ | ☐ |
| Build small production images with multi-stage Dockerfiles | ☐ | ☐ | ☐ | ☐ |
| Push/pull images to Docker Hub, GHCR and ECR | ☐ | ☐ | ☐ | ☐ |
| Design a tagging and retention strategy | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-34/` in your own repository:

```text
day-34/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-34
git add day-34/
git commit -m "day-34: multi-stage builds, registries & image tagging strategy"
git push -u origin day-34
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

[← Day 33](../day-33/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 35 →](../day-35/README.md)
