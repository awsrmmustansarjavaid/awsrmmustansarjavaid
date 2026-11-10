# Day 33 — Docker Compose: Multi-Container Applications

[← Day 32](../day-32/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 34 →](../day-34/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-33`, `90DaysOfDevOps-master/2026/day-34` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a seed/migration job service. | You can demonstrate, without notes: *describe multi-service stacks in Compose YAML* — with evidence committed to `day-33/`. |
| 2 | Write a README 'Quick start'. | You can demonstrate, without notes: *manage env, dependencies, healthchecks and profiles* — with evidence committed to `day-33/`. |
| 3 | Create separate dev and prod compose files. | You can demonstrate, without notes: *use Compose for local dev* — with evidence committed to `day-33/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Web starts before DB ready | Use healthchecks + `service_healthy`. |
| `port is already allocated` | Change published port or stop the other stack. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Add `.env` and `pw.txt` to `.gitignore`; avoid privileged containers; pin images.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 10. Daily Completion Checklist

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

## 11. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 12. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. What is Compose?
2. depends_on vs healthcheck?
3. How do you manage secrets in Compose?
4. How do you scale a service?
5. **Scenario:** New developers spend a day setting up the app locally. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 32](../day-32/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 34 →](../day-34/README.md)
