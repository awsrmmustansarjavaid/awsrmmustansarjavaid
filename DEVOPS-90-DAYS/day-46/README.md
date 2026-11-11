# Day 46 — DevSecOps III: DAST, Image Signing, SLSA & Supply-Chain Security

[← Day 45](../day-45/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 47 →](../day-47/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 7 — Deployment Strategies, DevSecOps & Capstone 1 |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Run DAST against a test app
- [ ] Sign and verify container images
- [ ] Explain SLSA, provenance and SBOM attestations

## 2. Prerequisites

- Days 35, 39, 44-45.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 DAST

Tests a running app like an attacker (OWASP ZAP baseline/full scans). Run against staging, never production without approval.

### 3.2 Supply chain

Attacks target dependencies, build systems and registries. Defences: pinned dependencies, SBOMs, provenance, signed artefacts, admission policies verifying signatures.

### 3.3 Tooling

Cosign keyless signing (OIDC), `cosign verify`, `attest`, SLSA generator, Kyverno/Sigstore policy-controller (later on K8s).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run OWASP ZAP baseline scan against your Compose app.
2. [ ] Fix 2 findings (headers, cookie flags).
3. [ ] Sign an image with cosign keyless in GitHub Actions.
4. [ ] Verify the signature locally with identity constraints.
5. [ ] Attach an SBOM attestation.

## 5. Real-World Scenario

> A customer asks: 'Prove this image was built from this commit by your CI and not tampered with.' Provide verifiable evidence.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker run --rm --network host -v $PWD:/zap/wrk ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://localhost:8000 -r zap.html
cosign sign --yes ghcr.io/USER/app@sha256:<digest>
cosign verify ghcr.io/USER/app@sha256:<digest> --certificate-identity-regexp 'https://github.com/USER/.*' --certificate-oidc-issuer https://token.actions.githubusercontent.com
cosign attest --yes --predicate sbom.json --type spdxjson ghcr.io/USER/app@sha256:<digest>
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a supply-chain threat model (5 threats, 5 controls). | You can demonstrate, without notes: *run DAST against a test app* — with evidence committed to `day-46/`. |
| 2 | Add DAST scheduled job. | You can demonstrate, without notes: *sign and verify container images* — with evidence committed to `day-46/`. |
| 3 | Summarise SLSA levels. | You can demonstrate, without notes: *explain SLSA, provenance and SBOM attestations* — with evidence committed to `day-46/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| ZAP can't reach app | Network mode/host mapping; use container network name. |
| cosign verify fails | Identity/issuer mismatch; check exact workflow identity. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Sign by digest not tag; verify at deployment; only scan systems you are authorised to test.
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

1. What is SLSA?
2. DAST vs SAST?
3. Why sign images?
4. What does provenance prove?
5. **Scenario:** A customer asks: 'Prove this image was built from this commit by your CI and not tampered with. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I sign and verify an image? | ☐ | ☐ | ☐ | ☐ |
| Can I run a DAST scan? | ☐ | ☐ | ☐ | ☐ |
| Can I explain supply-chain threats? | ☐ | ☐ | ☐ | ☐ |
| Run DAST against a test app | ☐ | ☐ | ☐ | ☐ |
| Sign and verify container images | ☐ | ☐ | ☐ | ☐ |
| Explain SLSA, provenance and SBOM attestations | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-46/` in your own repository:

```text
day-46/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-46
git add day-46/
git commit -m "day-46: devsecops iii"
git push -u origin day-46
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** DAST report, cosign workflow, supply-chain threat model.

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

[← Day 45](../day-45/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 47 →](../day-47/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-46/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
