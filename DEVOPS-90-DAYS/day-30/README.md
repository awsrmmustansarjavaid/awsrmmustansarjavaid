# Day 30 — Docker Images, Layers & Container Lifecycle

[← Day 29](../day-29/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 31 →](../day-31/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-30` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a Docker cheat sheet (15 commands). | You can demonstrate, without notes: *understand image layers and caching* — with evidence committed to `day-30/`. |
| 2 | Explain tag vs digest and why you pin by digest in prod. | You can demonstrate, without notes: *manage the container lifecycle* — with evidence committed to `day-30/`. |
| 3 | Reduce image sizes by selecting slim/alpine/distroless and compare. | You can demonstrate, without notes: *inspect, log, debug and clean up* — with evidence committed to `day-30/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Exit code 137 | Killed (OOM or SIGKILL); check memory limits and `dmesg`. |
| Disk full from Docker | `docker system df` then prune unused images/volumes carefully. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Pin image digests; pull from trusted sources only; avoid `latest`; verify signatures where available.
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

1. Image vs container?
2. Tag vs digest?
3. What does exit code 137 mean?
4. What are restart policies?
5. **Scenario:** A container exits immediately in production. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 29](../day-29/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 31 →](../day-31/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-30/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
