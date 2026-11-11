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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 46 – Reusable Workflows & Composite Actions — Challenge Brief

#### Task
You've been writing workflows from scratch every time. In the real world, teams **don't repeat themselves** — they create reusable workflows that any repo can call like a function. Today you learn `workflow_call` and composite actions.

---

#### Expected Output
- A reusable workflow and a caller workflow in your `github-actions-practice` repo
- A custom composite action
- A markdown file: `day-46-reusable-workflows.md`

---

#### Challenge Tasks

##### Task 1: Understand `workflow_call`
Before writing any code, research and answer in your notes:
1. What is a **reusable workflow**?
2. What is the `workflow_call` trigger?
3. How is calling a reusable workflow different from using a regular action (`uses:`)?
4. Where must a reusable workflow file live?

---

##### Task 2: Create Your First Reusable Workflow
Create `.github/workflows/reusable-build.yml`:
1. Set the trigger to `workflow_call`
2. Add an `inputs:` section with:
   - `app_name` (string, required)
   - `environment` (string, required, default: `staging`)
3. Add a `secrets:` section with:
   - `docker_token` (required)
4. Create a job that:
   - Checks out the code
   - Prints `Building <app_name> for <environment>`
   - Prints `Docker token is set: true` (never print the actual secret)

**Verify:** This file alone won't run — it needs a caller. That's next.

---

##### Task 3: Create a Caller Workflow
Create `.github/workflows/call-build.yml`:
1. Trigger on push to `main`
2. Add a job that uses your reusable workflow:
   ```yaml
   jobs:
     build:
       uses: ./.github/workflows/reusable-build.yml
       with:
         app_name: "my-web-app"
         environment: "production"
       secrets:
         docker_token: ${{ secrets.DOCKER_TOKEN }}
   ```
3. Push to `main` and watch it run

**Verify:** In the Actions tab, do you see the caller triggering the reusable workflow? Click into the job — can you see the inputs printed?

---

##### Task 4: Add Outputs to the Reusable Workflow
Extend `reusable-build.yml`:
1. Add an `outputs:` section that exposes a `build_version` value
2. Inside the job, generate a version string (e.g., `v1.0-<short-sha>`) and set it as output
3. In your caller workflow, add a second job that:
   - Depends on the build job (`needs:`)
   - Reads and prints the `build_version` output

**Verify:** Does the second job print the version from the reusable workflow?

---

##### Task 5: Create a Composite Action
Create a **custom composite action** in your repo at `.github/actions/setup-and-greet/action.yml`:
1. Define inputs: `name` and `language` (default: `en`)
2. Add steps that:
   - Print a greeting in the specified language
   - Print the current date and runner OS
   - Set an output called `greeted` with value `true`
3. Use the composite action in a new workflow with `uses: ./.github/actions/setup-and-greet`

**Verify:** Does your custom action run and print the greeting?

---

##### Task 6: Reusable Workflow vs Composite Action
Fill this in your notes:

| | Reusable Workflow | Composite Action |
|---|---|---|
| Triggered by | `workflow_call` | `uses:` in a step |
| Can contain jobs? | ? | ? |
| Can contain multiple steps? | ? | ? |
| Lives where? | ? | ? |
| Can accept secrets directly? | ? | ? |
| Best for | ? | ? |

---

#### Hints
- Reusable workflows must be in `.github/workflows/` directory
- Caller syntax: `uses: ./.github/workflows/file.yml` (same repo) or `uses: org/repo/.github/workflows/file.yml@main` (cross-repo)
- Composite action: `action.yml` with `runs: using: "composite"`
- Reusable workflow outputs: `on: workflow_call: outputs: name: value: ${{ jobs.job-id.outputs.name }}`
- A reusable workflow can be called by at most 20 unique caller workflows in a single run

---

#### Documentation
Create `day-46-reusable-workflows.md` with:
- Your reusable workflow and caller workflow YAML
- Your composite action YAML
- The comparison table from Task 6
- Screenshot of the caller workflow triggering the reusable one

---

#### Submission
1. Add `day-46-reusable-workflows.md` to `2026/day-46/`
2. Commit and push to your fork

---

#### Learn in Public
Share how you built your first reusable workflow on LinkedIn — this is a real production skill.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 46 – Reusable Workflows & Composite Actions — Notes & Solution

#### Task
You've been writing workflows from scratch every time. In the real world, teams **don't repeat themselves** — they create reusable workflows that any repo can call like a function. Today you learn `workflow_call` and composite actions.

---

#### Challenge Tasks

##### Task 1: Understand `workflow_call`
Before writing any code, research and answer in your notes:
1. What is a **reusable workflow**?
- A `reusable workflow` is a GitHub Actions workflow that can be called from another workflow, allowing you to REUSE the same automation logic across multiple workflows.

2. What is the `workflow_call` trigger?
- `workflow_call` is a GitHub Actions trigger that allows a workflow to be executed by another workflow instead of events like push or pull_request.

3. How is calling a reusable workflow different from using a regular action (`uses:`)?
- `Reusable Workflow` is used at the workflow level and written inside `jobs.<job_id>.uses.` It is used to reuse a complete workflow with jobs and steps,for example calling a build pipeline.
- `Regular Action` is used at the `step level` and written inside `steps.uses`. It is used to reuse a single task,for example checking out code or running Docker.

4. Where must a reusable workflow file live?
- It must be inside the folder: `.github/workflows/`

---

##### Task 2: Create Your First Reusable Workflow
Create `.github/workflows/reusable-build.yml`:
1. Set the trigger to `workflow_call`
2. Add an `inputs:` section with:
   - `app_name` (string, required)
   - `environment` (string, required, default: `staging`)
3. Add a `secrets:` section with:
   - `docker_token` (required)
4. Create a job that:
   - Checks out the code
   - Prints `Building <app_name> for <environment>`
   - Prints `Docker token is set: true` (never print the actual secret)

**Verify:** This file alone won't run — it needs a caller. That's next.

[reusable-yaml file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/reusable-build.yml)

<img width="1919" height="739" alt="Screenshot 2026-09-18 215613" src="https://github.com/user-attachments/assets/f62bbfd7-d99c-4c20-abc4-8691c9274e1c" />


---

##### Task 3: Create a Caller Workflow
Create `.github/workflows/call-build.yml`:
1. Trigger on push to `main`
2. Add a job that uses your reusable workflow:
   ```yaml
   jobs:
     build:
       uses: ./.github/workflows/reusable-build.yml
       with:
         app_name: "my-web-app"
         environment: "production"
       secrets:
         docker_token: ${{ secrets.DOCKER_TOKEN }}
   ```
3. Push to `main` and watch it run

**Verify:** In the Actions tab, do you see the caller triggering the reusable workflow? Click into the job — can you see the inputs printed?

[call-build-file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/call-build.yml)

<img width="1919" height="701" alt="Screenshot 2026-09-18 215806" src="https://github.com/user-attachments/assets/226de82d-01c4-4825-b5f6-fffe327f1b7f" />
<img width="1919" height="868" alt="Screenshot 2026-09-18 215850" src="https://github.com/user-attachments/assets/c90c99bc-0cb6-4b0d-8156-0419dd2cd973" />

---

##### Task 4: Add Outputs to the Reusable Workflow
Extend `reusable-build.yml`:
1. Add an `outputs:` section that exposes a `build_version` value
2. Inside the job, generate a version string (e.g., `v1.0-<short-sha>`) and set it as output
3. In your caller workflow, add a second job that:
   - Depends on the build job (`needs:`)
   - Reads and prints the `build_version` output

**Verify:** Does the second job print the version from the reusable workflow?
- yes
  

---

##### Task 5: Create a Composite Action
Create a **custom composite action** in your repo at `.github/actions/setup-and-greet/action.yml`:
1. Define inputs: `name` and `language` (default: `en`)
2. Add steps that:
   - Print a greeting in the specified language
   - Print the current date and runner OS
   - Set an output called `greeted` with value `true`
3. Use the composite action in a new workflow with `uses: ./.github/actions/setup-and-greet`

**Verify:** Does your custom action run and print the greeting?

- Yes,custom action run and print the greeting

[greet-file](https://github.com/tejswini-maingade/GitHub-Action-Practice/blob/main/.github/workflows/composite-test.yml)

<img width="1919" height="862" alt="Screenshot 2026-09-18 221659" src="https://github.com/user-attachments/assets/2ee11ffe-4b47-4d07-b685-b3610f277e2a" />

---

##### Task 6: Reusable Workflow vs Composite Action
Fill this in your notes:

| | Reusable Workflow | Composite Action |
|---|---|---|
| Triggered by | `workflow_call` | `uses:` in a step |
| Can contain jobs? | Yes | No |
| Can contain multiple steps? | Yes | Yes |
| Lives where? | .github/workflows/ | .github/actions/ |
| Can accept secrets directly? | Yes | No |
| Best for | Reusing full workflows| Reusing small step groups |

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a supply-chain threat model (5 threats, 5 controls). | You can demonstrate, without notes: *run DAST against a test app* — with evidence committed to `day-46/`. |
| 2 | Add DAST scheduled job. | You can demonstrate, without notes: *sign and verify container images* — with evidence committed to `day-46/`. |
| 3 | Summarise SLSA levels. | You can demonstrate, without notes: *explain SLSA, provenance and SBOM attestations* — with evidence committed to `day-46/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| ZAP can't reach app | Network mode/host mapping; use container network name. |
| cosign verify fails | Identity/issuer mismatch; check exact workflow identity. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Sign by digest not tag; verify at deployment; only scan systems you are authorised to test.
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

1. What is SLSA?
2. DAST vs SAST?
3. Why sign images?
4. What does provenance prove?
5. **Scenario:** A customer asks: 'Prove this image was built from this commit by your CI and not tampered with. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

[← Day 45](../day-45/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 47 →](../day-47/README.md)
