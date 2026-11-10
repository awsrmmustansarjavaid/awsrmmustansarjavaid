# Day 34 — Multi-Stage Builds, Registries & Image Tagging Strategy

[← Day 33](../day-33/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 35 →](../day-35/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-35` |

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

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Build a multi-arch image with `docker buildx build --platform linux/amd64,linux/arm64`. | You can demonstrate, without notes: *build small production images with multi-stage Dockerfiles* — with evidence committed to `day-34/`. |
| 2 | Document tag conventions. | You can demonstrate, without notes: *push/pull images to Docker Hub, GHCR and ECR* — with evidence committed to `day-34/`. |
| 3 | Set up a registry cleanup rule. | You can demonstrate, without notes: *design a tagging and retention strategy* — with evidence committed to `day-34/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `denied: requested access` | Wrong login/scope or repository visibility. |
| `exec format error` | Architecture mismatch; build multi-arch. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use scoped tokens, enable vulnerability scanning on the registry, avoid public images with secrets, prefer minimal runtime images.
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

1. Why multi-stage builds?
2. Why avoid `latest`?
3. What is an image digest?
4. How do you secure registry access?
5. **Scenario:** Prod is running `app:latest` and nobody knows what version that is. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

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

## 14. GitHub Submission

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

[← Day 33](../day-33/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 35 →](../day-35/README.md)
