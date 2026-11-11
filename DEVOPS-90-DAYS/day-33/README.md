# Day 33 — Docker Compose: Multi-Container Applications

[← Day 32](../day-32/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 34 →](../day-34/README.md)

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

- [ ] Describe multi-service stacks in Compose YAML
- [ ] Manage env, dependencies, healthchecks and profiles
- [ ] Use Compose for local dev

## 2. Prerequisites

- Days 31-32.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Compose model

`compose.yaml` declares services, networks, volumes, configs, secrets. `docker compose up -d`, `ps`, `logs`, `exec`, `down -v`.

### 3.2 Reliability features

`depends_on` with `condition: service_healthy`, `healthcheck`, `restart`, resource `deploy.resources` limits.

### 3.3 Config management

`.env` files, `env_file`, profiles for optional services, override files (`compose.override.yaml`).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Compose a web + Postgres + Redis stack.
2. [ ] Add healthchecks and `service_healthy` dependency.
3. [ ] Move secrets to Compose `secrets:` / `.env` ignored by git.
4. [ ] Add `profiles: [debug]` for pgadmin.
5. [ ] Scale web with `--scale web=3` behind nginx.

## 5. Real-World Scenario

> New developers spend a day setting up the app locally. Provide `docker compose up` onboarding in under 5 minutes with seed data.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
services:
  web:
    build: .
    ports: ["8000:8000"]
    environment: [DB_HOST=db]
    depends_on: { db: { condition: service_healthy } }
  db:
    image: postgres:16
    environment: { POSTGRES_PASSWORD_FILE: /run/secrets/pw }
    secrets: [pw]
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck: { test: ["CMD-SHELL","pg_isready -U postgres"], interval: 5s, retries: 5 }
secrets: { pw: { file: ./pw.txt } }
volumes: { pgdata: {} }
# commands
docker compose up -d --build && docker compose ps && docker compose logs -f web
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Dockerfile for the Compose Exercise

```
FROM nginx:1.28-alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

---

### 7.2 🐳Day 33 – Docker Compose: Multi-Container Basics

#### 🎯Challenge Tasks

##### 🔹Task 1: Install & Verify
1. Check if Docker Compose is available on your machine
2. Verify the version
<img width="763" height="92" alt="Screenshot 2026-08-25 113608" src="https://github.com/user-attachments/assets/eacc03c4-fb70-4b11-8ba0-650f48dddcf5" />

---

##### 🚀Task 2: Your First Compose File
1. Create a folder `compose-basics`
2. Write a `docker-compose.yml` that runs a single **Nginx** container with port mapping
3. Start it with `docker compose up`
4. Access it in your browser


<img width="1773" height="674" alt="Screenshot 2026-08-25 114822" src="https://github.com/user-attachments/assets/2b9656d2-ac4b-45e7-93b4-4eabf2d85de3" />
<img width="1911" height="971" alt="Screenshot 2026-08-25 114914" src="https://github.com/user-attachments/assets/9d0b4b1f-a987-4baf-9b6d-341a87b7f4bf" />

5. Stop it with `docker compose down`
<img width="1861" height="251" alt="Screenshot 2026-08-25 115134" src="https://github.com/user-attachments/assets/cba847b6-ba9f-4f1b-a139-2972353b18cd" />
<img width="1918" height="865" alt="Screenshot 2026-08-25 115111" src="https://github.com/user-attachments/assets/135d1efe-8972-4107-b04a-9c199f846985" />

---

##### 🐳Task 3: Two-Container Setup
Write a `docker-compose.yml` that runs:
- A **WordPress** container
- A **MySQL** container

They should:
- Be on the same network (Compose does this automatically)
- MySQL should have a named volume for data persistence
- WordPress should connect to MySQL using the service name

Start it, access WordPress in your browser, and set it up.

**Verify:** Stop and restart with `docker compose down` and `docker compose up` — is your WordPress data still there?


<img width="796" height="742" alt="Screenshot 2026-08-25 115346" src="https://github.com/user-attachments/assets/249068ad-47bb-4bec-94d5-0516da9a3d6e" />
<img width="1889" height="159" alt="Screenshot 2026-08-25 115608" src="https://github.com/user-attachments/assets/76fdf23e-cf96-49f6-9502-3b1b013cffcd" />
<img width="1919" height="980" alt="Screenshot 2026-08-25 115743" src="https://github.com/user-attachments/assets/dfb8efd8-bebd-48bd-9f88-7c6853719fe4" />
<img width="1919" height="964" alt="Screenshot 2026-08-25 115851" src="https://github.com/user-attachments/assets/0ecb0fe6-01e2-42e4-80fd-1dd0f9252475" />
<img width="1768" height="776" alt="Screenshot 2026-08-25 120126" src="https://github.com/user-attachments/assets/2412f47d-8b26-4d2d-8b9e-12d8b2e8ca00" />

- Yes Wordpress data is available there.
<img width="1293" height="890" alt="Screenshot 2026-08-25 120208" src="https://github.com/user-attachments/assets/dbdee330-9325-4e90-93be-c17b5cfe6a8d" />

---

##### ⚙️Task 4: Compose Commands
Practice and document these:
1. Start services in **detached mode**

```
docker compose up -d
```
<img width="1213" height="183" alt="Screenshot 2026-08-25 120351" src="https://github.com/user-attachments/assets/768ff5bd-da30-4898-a7c2-b0d76a068dcd" />


2. View running services
```
docker compose ps
```
<img width="1919" height="139" alt="Screenshot 2026-08-25 120400" src="https://github.com/user-attachments/assets/1acb3d7f-bf75-4975-ba77-f01bd9e72f8f" />

3. View **logs** of all services
```docker compose logs db && docker compose logs wordpress```

<img width="1919" height="734" alt="Screenshot 2026-08-25 120432" src="https://github.com/user-attachments/assets/328837c6-caec-4c92-a83b-b13d71acf7f3" />
<img width="1918" height="338" alt="Screenshot 2026-08-25 120521" src="https://github.com/user-attachments/assets/63577198-54ac-4749-977b-ac1fba3e3e02" />

5. View logs of a **specific** service

```docker compose logs db```
<img width="1919" height="512" alt="Screenshot 2026-08-25 120535" src="https://github.com/user-attachments/assets/31c1b2c1-d172-4888-b67e-20efcc7c7b66" />


6. **Stop** services without removing
```docker compose stop```
<img width="1499" height="625" alt="Screenshot 2026-08-25 120617" src="https://github.com/user-attachments/assets/5f7fce05-04f5-4d90-bd87-d2ed50e11ca3" />


8. **Remove** everything (containers, networks)
```docker compose down```
<img width="1352" height="340" alt="Screenshot 2026-08-25 120635" src="https://github.com/user-attachments/assets/b734f4cf-c192-4e10-8e78-ca696e0954a8" />


10. **Rebuild** images if you make a change
```docker compose up --build```

---

##### 🔐Task 5: Environment Variables
1. Add environment variables directly in your `docker-compose.yml`
2. Create a `.env` file and reference variables from it in your compose file
3. Verify the variables are being picked up
<img width="914" height="689" alt="Screenshot 2026-08-25 121622" src="https://github.com/user-attachments/assets/d57714e5-7740-4cf2-8436-cce13834e485" />

<img width="1919" height="844" alt="Screenshot 2026-08-25 121724" src="https://github.com/user-attachments/assets/df46c082-33de-4be3-acc9-7eaccc416755" />
<img width="1857" height="160" alt="Screenshot 2026-08-25 121806" src="https://github.com/user-attachments/assets/842a9b33-8494-495a-9fc7-7c8b2accfc68" />

---
##### 📚 Key Learnings
- 🐳 Docker Compose simplifies multi-container application management.
- 🔗 Compose automatically creates a network for services.
- 🌐 Services can communicate using their service names.
- 💾 Named volumes provide persistent data storage.
- ⚙️ Environment variables make Compose configurations flexible.
- 📋 docker compose logs helps troubleshoot containers.
- 🛑 docker compose stop stops services without removing them.
- 🧹 docker compose down removes containers and networks.
- 🔨 docker compose up --build rebuilds images when changes are made.

##### 🚀 Day 33 Completed!

Another step forward in my #90DaysOfDevOps journey. 🐳💻

 ---
Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a seed/migration job service. | You can demonstrate, without notes: *describe multi-service stacks in Compose YAML* — with evidence committed to `day-33/`. |
| 2 | Write a README 'Quick start'. | You can demonstrate, without notes: *manage env, dependencies, healthchecks and profiles* — with evidence committed to `day-33/`. |
| 3 | Create separate dev and prod compose files. | You can demonstrate, without notes: *use Compose for local dev* — with evidence committed to `day-33/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Web starts before DB ready | Use healthchecks + `service_healthy`. |
| `port is already allocated` | Change published port or stop the other stack. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Add `.env` and `pw.txt` to `.gitignore`; avoid privileged containers; pin images.
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

1. What is Compose?
2. depends_on vs healthcheck?
3. How do you manage secrets in Compose?
4. How do you scale a service?
5. **Scenario:** New developers spend a day setting up the app locally. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I bring up a 3-tier stack? | ☐ | ☐ | ☐ | ☐ |
| Can I add health-based startup? | ☐ | ☐ | ☐ | ☐ |
| Can I keep secrets out of git? | ☐ | ☐ | ☐ | ☐ |
| Describe multi-service stacks in Compose YAML | ☐ | ☐ | ☐ | ☐ |
| Manage env, dependencies, healthchecks and profiles | ☐ | ☐ | ☐ | ☐ |
| Use Compose for local dev | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-33/` in your own repository:

```text
day-33/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-33
git add day-33/
git commit -m "day-33: docker compose"
git push -u origin day-33
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

[← Day 32](../day-32/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 34 →](../day-34/README.md)
