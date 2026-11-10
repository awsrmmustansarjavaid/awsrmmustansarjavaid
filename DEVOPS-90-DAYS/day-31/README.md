# Day 31 — Dockerfile Best Practices: Build Your Own Images

[← Day 30](../day-30/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 32 →](../day-32/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-31` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Containerise your healthcheck tool from Day 21. | You can demonstrate, without notes: *write efficient, secure Dockerfiles* — with evidence committed to `day-31/`. |
| 2 | Document cache-friendly ordering rules. | You can demonstrate, without notes: *use build cache, .dockerignore, ARG/ENV, ENTRYPOINT/CMD* — with evidence committed to `day-31/`. |
| 3 | Compare shell-form vs exec-form CMD with `docker stop` timing. | You can demonstrate, without notes: *lint with hadolint* — with evidence committed to `day-31/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Build is slow every time | Cache busted by early `COPY . .`; copy lockfiles first. |
| App unreachable | Bind to 0.0.0.0 inside the container and publish the port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** No secrets in ARG/ENV/layers (they persist in history). Use BuildKit secrets: `RUN --mount=type=secret`. Run as non-root.
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

1. ENTRYPOINT vs CMD?
2. Why order COPY carefully?
3. Why use .dockerignore?
4. Why exec-form CMD?
5. **Scenario:** Image builds take 9 minutes and the image is 1. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 30](../day-30/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 32 →](../day-32/README.md)
