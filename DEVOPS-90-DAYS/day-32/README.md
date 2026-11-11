# Day 32 — Docker Volumes, Bind Mounts & Networking

[← Day 31](../day-31/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 33 →](../day-33/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-32` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Persist data safely with volumes
- [ ] Understand bridge networks and DNS between containers
- [ ] Publish and isolate ports

## 2. Prerequisites

- Day 31.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Storage

Container filesystem is ephemeral. Volumes (managed by Docker) persist data; bind mounts map host paths; tmpfs is memory-only.

### 3.2 Networking

Default bridge, user-defined bridge (embedded DNS by container name), host, none. Publish with `-p host:container`.

### 3.3 Isolation

Create separate networks per app tier; don't publish DB ports to host.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run Postgres with a named volume; write data; remove container; re-run and verify data persists.
2. [ ] Back up the volume with a temporary container and tar.
3. [ ] Create network `appnet`; run app + DB and connect by name.
4. [ ] Prove a DB is unreachable from outside by not publishing it.
5. [ ] Inspect network with `docker network inspect`.

## 5. Real-World Scenario

> Product lost customer data after a container redeploy. Explain why, implement persistence and a tested backup/restore procedure.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker volume create pgdata
docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=changeme -v pgdata:/var/lib/postgresql/data postgres:16
docker run --rm --network appnet postgres:16 psql -h db -U postgres -c 'select 1'
docker run --rm -v pgdata:/data -v $PWD:/backup alpine tar czf /backup/pgdata.tgz -C /data .
docker network inspect appnet | jq '.[0].Containers'
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a restore procedure and test it. | You can demonstrate, without notes: *persist data safely with volumes* — with evidence committed to `day-32/`. |
| 2 | Explain volume vs bind mount trade-offs. | You can demonstrate, without notes: *understand bridge networks and DNS between containers* — with evidence committed to `day-32/`. |
| 3 | Show DNS resolution between containers using `getent hosts`. | You can demonstrate, without notes: *publish and isolate ports* — with evidence committed to `day-32/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Data gone after restart | No volume mounted at the data path. |
| Containers can't resolve names | Default bridge lacks DNS; use user-defined network. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Don't publish DB ports; use secrets, not plain env vars, for passwords; set volume permissions carefully.
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

1. Volume vs bind mount?
2. Why user-defined networks?
3. How do you back up a volume?
4. How do containers find each other?
5. **Scenario:** Product lost customer data after a container redeploy. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I persist and restore data? | ☐ | ☐ | ☐ | ☐ |
| Can I isolate DB networking? | ☐ | ☐ | ☐ | ☐ |
| Can I explain DNS between containers? | ☐ | ☐ | ☐ | ☐ |
| Persist data safely with volumes | ☐ | ☐ | ☐ | ☐ |
| Understand bridge networks and DNS between containers | ☐ | ☐ | ☐ | ☐ |
| Publish and isolate ports | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-32/` in your own repository:

```text
day-32/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-32
git add day-32/
git commit -m "day-32: docker volumes, bind mounts & networking"
git push -u origin day-32
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

[← Day 31](../day-31/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 33 →](../day-33/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-32/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
