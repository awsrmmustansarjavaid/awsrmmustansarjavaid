# Day 48 — Capstone 1 (Part 2/3): Containerise, Scan, Sign & Publish

[← Day 47](../day-47/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 49 →](../day-49/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 1 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Add a hardened multi-stage image build
- [ ] Add image scanning, SBOM and signing to the pipeline
- [ ] Publish versioned releases

## 2. Prerequisites

- Day 47.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Build stage

Multi-stage Dockerfile, non-root, healthcheck, pinned base digest, buildx cache.

### 3.2 Security stage

Trivy image scan with fail threshold, SBOM generation, cosign keyless signing, provenance attestation.

### 3.3 Release

On tag `vX.Y.Z`: build, scan, sign, push `:X.Y.Z` and `:sha`, create GitHub Release with changelog and SBOM.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write the Dockerfile and test locally with hardening flags.
2. [ ] Add build/push workflow with metadata-action.
3. [ ] Add Trivy gate and SBOM upload.
4. [ ] Add cosign signing and verify in a separate job.
5. [ ] Create release workflow (tag-triggered) and cut `v0.1.0`.

## 5. Real-World Scenario

> Introduce a known-vulnerable base image on a branch; the pipeline must block it with a clear message. Then fix it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker build -t capstone1:dev . && trivy image --exit-code 1 --severity CRITICAL capstone1:dev
git tag -a v0.1.0 -m "release" && git push --tags
gh release create v0.1.0 --generate-notes sbom.json
cosign verify ghcr.io/USER/capstone1:0.1.0 --certificate-identity-regexp 'https://github.com/USER/.*' --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document the release process. | You can demonstrate, without notes: *add a hardened multi-stage image build* — with evidence committed to `day-48/`. |
| 2 | Add Dependabot for Docker base images. | You can demonstrate, without notes: *add image scanning, SBOM and signing to the pipeline* — with evidence committed to `day-48/`. |
| 3 | Measure total pipeline time and optimise. | You can demonstrate, without notes: *publish versioned releases* — with evidence committed to `day-48/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Scan blocks on unfixable CVE | Use `.trivyignore` with justification + expiry. |
| Release job lacks permissions | Add `packages: write`, `id-token: write`, `contents: write`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Pipeline identity should have only the permissions it needs; protect tags; require approvals for release.
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

1. How do you gate releases on security?
2. How do you verify a signed image?
3. How do you handle CVE exceptions?
4. What goes in a release?
5. **Scenario:** Introduce a known-vulnerable base image on a branch; the pipeline must block it with a clear message. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Does the pipeline block a bad image? | ☐ | ☐ | ☐ | ☐ |
| Is the image signed and verifiable? | ☐ | ☐ | ☐ | ☐ |
| Is the release reproducible? | ☐ | ☐ | ☐ | ☐ |
| Add a hardened multi-stage image build | ☐ | ☐ | ☐ | ☐ |
| Add image scanning, SBOM and signing to the pipeline | ☐ | ☐ | ☐ | ☐ |
| Publish versioned releases | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-48/` in your own repository:

```text
day-48/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-48
git add day-48/
git commit -m "day-48: capstone 1 (part 2/3)"
git push -u origin day-48
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 47](../day-47/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 49 →](../day-49/README.md)
