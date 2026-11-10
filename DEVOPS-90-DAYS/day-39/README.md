# Day 39 — Build & Push Docker Images in CI; Reusable Workflows

[← Day 38](../day-38/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 40 →](../day-40/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 6 — CI/CD: GitHub Actions, Jenkins, GitLab CI |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-45`, `90DaysOfDevOps-master/2026/day-46` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Automate build, scan and push of images
- [ ] Create reusable workflows and composite actions
- [ ] Tag images by commit and release

## 2. Prerequisites

- Days 34-38.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Docker in Actions

`docker/setup-buildx-action`, `docker/login-action`, `docker/build-push-action` with GHA cache, multi-arch builds, metadata-action for tags/labels.

### 3.2 Scan in pipeline

Trivy action fails on CRITICAL; upload SARIF to code scanning.

### 3.3 Reuse

`workflow_call` reusable workflows and composite actions remove duplication across repos.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a workflow to build and push to GHCR on main and tags.
2. [ ] Use `docker/metadata-action` for tags (`sha`, `semver`).
3. [ ] Add Trivy scan step that fails on CRITICAL.
4. [ ] Extract build logic into a reusable workflow `.github/workflows/docker.yml` with inputs.
5. [ ] Call it from two repos/apps.

## 5. Real-World Scenario

> Five teams copy-pasted slightly different Docker workflows. Create one organisation-wide reusable workflow with security gates.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
on: { push: { branches: [main], tags: ['v*'] } }
jobs:
  image:
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write, security-events: write }
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with: { registry: ghcr.io, username: ${{ github.actor }}, password: ${{ secrets.GITHUB_TOKEN }} }
      - id: meta
        uses: docker/metadata-action@v5
        with: { images: ghcr.io/${{ github.repository }}, tags: "type=sha\ntype=semver,pattern={{version}}" }
      - uses: docker/build-push-action@v6
        with: { push: true, tags: "${{ steps.meta.outputs.tags }}", cache-from: type=gha, cache-to: type=gha,mode=max }
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add SARIF upload for Trivy. | You can demonstrate, without notes: *automate build, scan and push of images* — with evidence committed to `day-39/`. |
| 2 | Write a composite action `setup-and-lint`. | You can demonstrate, without notes: *create reusable workflows and composite actions* — with evidence committed to `day-39/`. |
| 3 | Document inputs/outputs of your reusable workflow. | You can demonstrate, without notes: *tag images by commit and release* — with evidence committed to `day-39/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Push denied to GHCR | Add `packages: write` permission and link repo to package. |
| Cache not used | Use `cache-from/to type=gha` and consistent builder. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Gate on scan results, sign images with cosign (keyless), restrict who can trigger release workflows.
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

1. What is a reusable workflow?
2. Why use metadata-action?
3. How do you gate on vulnerabilities?
4. Reusable workflow vs composite action?
5. **Scenario:** Five teams copy-pasted slightly different Docker workflows. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I push images from CI? | ☐ | ☐ | ☐ | ☐ |
| Can I reuse workflows? | ☐ | ☐ | ☐ | ☐ |
| Can I fail builds on CVEs? | ☐ | ☐ | ☐ | ☐ |
| Automate build, scan and push of images | ☐ | ☐ | ☐ | ☐ |
| Create reusable workflows and composite actions | ☐ | ☐ | ☐ | ☐ |
| Tag images by commit and release | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-39/` in your own repository:

```text
day-39/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-39
git add day-39/
git commit -m "day-39: build & push docker images in ci; reusable workflows"
git push -u origin day-39
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

[← Day 38](../day-38/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 40 →](../day-40/README.md)
