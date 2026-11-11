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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 48 – GitHub Actions Project: End-to-End CI/CD Pipeline

#### Task
You've learned workflows, triggers, secrets, Docker builds, reusable workflows, and advanced events. Today you **put it all together** in one project — a complete, production-style CI/CD pipeline that builds, tests, and deploys using everything you've learned from Day 40 to Day 47.

This is your GitHub Actions capstone.

---

#### Expected Output
- A GitHub repo with a working app, Dockerfile, and complete CI/CD pipeline
- At least 3 workflow files working together
- A markdown file: `day-48-actions-project.md`
- Screenshot of your full pipeline in action

---

#### Challenge Tasks

##### Task 1: Set Up the Project Repo
1. Create a new repo called `github-actions-capstone` (or use your existing `github-actions-practice`)
2. Add a simple app — pick any one:
   - A Python Flask/FastAPI app with one endpoint
   - A Node.js Express app with one endpoint
   - Your Dockerized app from Day 36
3. Add a `Dockerfile` and a basic test (even a script that curls the health endpoint counts)
4. Add a `README.md` with a project description

---

##### Task 2: Reusable Workflow — Build & Test
Create `.github/workflows/reusable-build-test.yml`:
1. Trigger: `workflow_call`
2. Inputs: `python_version` (or `node_version`), `run_tests` (boolean, default: true)
3. Steps:
   - Check out code
   - Set up the language runtime
   - Install dependencies
   - Run tests (only if `run_tests` is true)
   - Set output: `test_result` with value `passed` or `failed`

This workflow does NOT deploy — it only builds and tests.

---

##### Task 3: Reusable Workflow — Docker Build & Push
Create `.github/workflows/reusable-docker.yml`:
1. Trigger: `workflow_call`
2. Inputs: `image_name` (string), `tag` (string)
3. Secrets: `docker_username`, `docker_token`
4. Steps:
   - Check out code
   - Log in to Docker Hub
   - Build and push the image with the given tag
   - Set output: `image_url` with the full image path

---

##### Task 4: PR Pipeline
Create `.github/workflows/pr-pipeline.yml`:
1. Trigger: `pull_request` to `main` (types: `opened`, `synchronize`)
2. Call the reusable build-test workflow:
   - Run tests: `true`
3. Add a standalone job `pr-comment` that:
   - Runs after the build-test job
   - Prints a summary: "PR checks passed for branch: `<branch>`"
4. Do **NOT** build or push Docker images on PRs

**Verify:** Open a PR — does it run tests only (no Docker push)?

---

##### Task 5: Main Branch Pipeline
Create `.github/workflows/main-pipeline.yml`:
1. Trigger: `push` to `main`
2. Job 1: Call the reusable build-test workflow
3. Job 2 (depends on Job 1): Call the reusable Docker workflow
   - Tag: `latest` and `sha-<short-commit-hash>`
4. Job 3 (depends on Job 2): `deploy` job that:
   - Prints "Deploying image: `<image_url>` to production"
   - Uses `environment: production` (set this up in repo Settings → Environments)
   - Requires manual approval if you've set up environment protection rules

**Verify:** Merge a PR to `main` — does it run tests → build Docker → deploy in sequence?

---

##### Task 6: Scheduled Health Check
Create `.github/workflows/health-check.yml`:
1. Trigger: `schedule` with cron `'0 */12 * * *'` (every 12 hours) + `workflow_dispatch` for manual testing
2. Steps:
   - Pull your latest Docker image
   - Run the container in detached mode
   - Wait 5 seconds, then curl the health endpoint
   - Print pass/fail based on the response
   - Stop and remove the container
3. Add a step that creates a summary using `$GITHUB_STEP_SUMMARY`:
   ```bash
   echo "## Health Check Report" >> $GITHUB_STEP_SUMMARY
   echo "- Image: myapp:latest" >> $GITHUB_STEP_SUMMARY
   echo "- Status: PASSED" >> $GITHUB_STEP_SUMMARY
   echo "- Time: $(date)" >> $GITHUB_STEP_SUMMARY
   ```

---

##### Task 7: Add Badges & Documentation
1. Add status badges for all your workflows to the repo `README.md`
2. Add a **pipeline architecture diagram** in your notes — draw (or describe) the flow:
   ```
   PR opened → build & test → PR checks pass
   Merge to main → build & test → Docker build & push → deploy
   Every 12 hours → health check
   ```
3. Fill in your notes: What would you add next? (Slack notifications? Multi-environment? Rollback?)

---

#### Brownie Points: Add Security to Your Pipeline
Want to go above and beyond? Add a **DevSecOps** step to your main pipeline:
1. Add `aquasecurity/trivy-action` after the Docker build step to scan your image for vulnerabilities
2. Fail the pipeline if any **CRITICAL** severity CVE is found
3. Upload the scan report as an artifact

This is a preview of what you'll do in depth on **Day 49**. If you get this working today, you're already thinking like a DevSecOps engineer.

---

#### Hints
- Environment protection: Repo Settings → Environments → Add `production` → enable "Required reviewers"
- `$GITHUB_STEP_SUMMARY` renders markdown in the Actions run summary page
- Short SHA for tags: `$(echo ${{ github.sha }} | cut -c1-7)`
- Reusable workflow outputs: accessed via `${{ needs.<job>.outputs.<name> }}`
- Use `actions/github-script` if you want to post PR comments programmatically

---

#### Documentation
Create `day-48-actions-project.md` with:
- Your pipeline architecture (the flow diagram from Task 7)
- All workflow YAML files
- Screenshot of a PR running the test-only pipeline
- Screenshot of a main branch push running the full pipeline
- Docker Hub link to your pushed image
- What you'd improve next

---

#### Submission
1. Add `day-48-actions-project.md` to `2026/day-48/`
2. Commit and push to your fork

---

#### Learn in Public
Share your complete pipeline architecture on LinkedIn — you just built production-grade CI/CD from scratch using only GitHub Actions. That's serious DevOps skill.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 48 – GitHub Actions Capstone Project

#### 🚀 Project Overview

For Day 48 of the 90DaysOfDevOps challenge, I built a complete CI/CD automation workflow for a full-stack Ecommerce application using GitHub Actions.

The project contains:

* React frontend
* Node.js / Express backend
* PostgreSQL database
* Docker
* Docker Compose
* GitHub Actions
* Reusable workflows
* Docker Hub
* Automated build and validation
* Pull Request pipeline
* Main branch deployment pipeline
* Backend health monitoring
  
<img width="967" height="735" alt="Screenshot 2026-09-21 190225" src="https://github.com/user-attachments/assets/1aaab36f-8e42-4d32-8bb7-a4d78a14f1f2" />


---

#### 🏗️ Application Architecture

<img width="1536" height="1024" alt="ChatGPT Image Sep 21, 2026, 06_58_46 PM" src="https://github.com/user-attachments/assets/e9e0aeee-b5b3-47f5-baf5-c4d54179b1e2" />


---

#### 📁 Project Structure

```text
ecommerce-app/
│
├── client/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
│
├── docker-compose.yml
│
└── .github/
    └── workflows/
        ├── reusable-build-test.yml
        ├── reusable-docker.yml
        ├── pr-pipeline.yml
        ├── main-pipeline.yml
        └── health-check.yml
```

---

#### 🔄 GitHub Actions Workflows

#### 1. Reusable Build and Test Workflow

File:

```text
.github/workflows/reusable-build-test.yml
```

This workflow is designed as a reusable workflow.

##### Responsibilities

* Checkout source code
* Install Node.js
* Install dependencies
* Build React frontend
* Check backend JavaScript syntax
* Return the build/test result

The workflow is called by other workflows instead of duplicating the same build logic.

<img width="1919" height="860" alt="Screenshot 2026-09-21 190356" src="https://github.com/user-attachments/assets/a73689c8-4e67-440e-a96d-500945832e1e" />

---

#### 2. Reusable Docker Workflow

File: [resuable-docker.yml](https://github.com/tejswini-maingade/ecommerce-app/blob/main/.github/workflows/reusable-docker.yml)

```text
.github/workflows/reusable-docker.yml
```

This workflow builds and pushes Docker images.

##### Responsibilities

* Checkout source code
* Login to Docker Hub
* Build Docker image
* Tag Docker image
* Push Docker image to Docker Hub
* Return the Docker image URL

##### Docker Images

Backend:

```text
tejswinim/ecommerce-backend:latest
```

Frontend:

```text
tejswinim/ecommerce-frontend:latest
```

<img width="1919" height="866" alt="Screenshot 2026-09-21 181853" src="https://github.com/user-attachments/assets/1471d79c-1bca-4f48-932e-f7c9c9eaec2f" />

---

#### 3. Pull Request Pipeline

File:
[pr-pipeline.yml](https://github.com/tejswini-maingade/ecommerce-app/blob/main/.github/workflows/pr-pipeline.yml)

```text
.github/workflows/pr-pipeline.yml
```

The PR pipeline runs when changes are submitted through a Pull Request.

##### Purpose

The pipeline helps validate code before merging it into the main branch.

##### Flow

```text
Pull Request
     │
     ▼
Build & Test
     │
     ▼
Frontend Build
     │
     ▼
Backend Syntax Check
     │
     ▼
Validation
```

This provides an automated quality check for Pull Requests.


---

#### 4. Main Branch Pipeline

File:

[main-pipeline.yml](https://github.com/tejswini-maingade/ecommerce-app/blob/main/.github/workflows/main-pipeline.yml)

```text
.github/workflows/main-pipeline.yml
```

The main pipeline runs after changes are pushed to the `main` branch.

##### Flow

```text
Push to main
     │
     ▼
Build & Test
     │
     ├───────────────┐
     ▼               ▼
Backend Image   Frontend Image
     │               │
     └───────┬───────┘
             ▼
        Docker Hub
```

##### Backend Docker Image

```text
tejswinim/ecommerce-backend:latest
```

##### Frontend Docker Image

```text
tejswinim/ecommerce-frontend:latest
```

---

#### 5. Health Check Workflow

File:

[health-check.yml](https://github.com/tejswini-maingade/ecommerce-app/blob/main/.github/workflows/health-check.yml)

```text
.github/workflows/health-check.yml
```

The health-check workflow verifies that the backend Docker container can start and respond successfully.

It can be triggered manually and also runs on a schedule.

##### Health Check Flow

```text
Docker Hub
    │
    ▼
Pull Backend Image
    │
    ▼
Start PostgreSQL
    │
    ▼
Start Backend Container
    │
    ▼
Wait for Application
    │
    ▼
HTTP Health Check
    │
    ▼
Success / Failure
```

##### Health Endpoint

```text
http://localhost:5000/
```

The workflow also displays container status and backend logs when troubleshooting is required.
<img width="1919" height="800" alt="Screenshot 2026-09-21 184827" src="https://github.com/user-attachments/assets/d83e497f-d068-412e-ac2e-9d0c9dfdedac" />


---

#### 🔐 GitHub Secrets

The project uses GitHub repository secrets for Docker Hub authentication.

The following secrets are configured:

```text
DOCKER_USERNAME
DOCKER_TOKEN
```

These secrets are passed securely to the reusable Docker workflow.

Example:

```yaml
secrets:
  docker_username: ${{ secrets.DOCKER_USERNAME }}
  docker_token: ${{ secrets.DOCKER_TOKEN }}
```

Sensitive credentials are not stored directly inside the workflow files.

---

#### 🐳 Docker Images

The project uses two Docker images.

#### Backend

```text
tejswinim/ecommerce-backend:latest
```

#### Frontend

```text
tejswinim/ecommerce-frontend:latest
```

Docker images are automatically built and pushed through GitHub Actions.

<img width="1919" height="824" alt="Screenshot 2026-09-21 182339" src="https://github.com/user-attachments/assets/3d2205cd-bc1d-4b9f-9da6-0fc7ff536063" />

---

#### 🗄️ Database

The application uses PostgreSQL.

The Docker Compose architecture contains:

```text
Frontend
   │
   ▼
Backend
   │
   ▼
PostgreSQL
```

The backend communicates with PostgreSQL through the configured database connection.

---

#### 🔁 CI/CD Pipeline

The overall CI/CD process is:

```text
Developer
    │
    ▼
Git Push / Pull Request
    │
    ▼
GitHub Actions
    │
    ▼
Build
    │
    ▼
Validation
    │
    ▼
Docker Build
    │
    ▼
Docker Hub
    │
    ▼
Health Check
```

---

#### ♻️ Reusable Workflows

One of the main objectives of this project was learning how to avoid duplicating GitHub Actions logic.

Instead of writing the same build and Docker commands in multiple workflows, reusable workflows are created.

##### Build Workflow

[reusable-build-test.yml](https://github.com/tejswini-maingade/ecommerce-app/blob/main/.github/workflows/reusable-build-test.yml)

```text
reusable-build-test.yml
```

##### Docker Workflow

```text
reusable-docker.yml
```

These workflows can be called by:

```text
pr-pipeline.yml
main-pipeline.yml
```

This makes the CI/CD configuration easier to maintain.

---

#### 🧪 Validation Performed

The pipeline performs the following validations:

##### Frontend

```bash
npm run build
```

##### Backend

```bash
node --check server/index.js
```

##### Docker

```bash
docker build
docker push
```

##### Health Check

```bash
curl http://localhost:5000/
```
<img width="1919" height="973" alt="Screenshot 2026-09-21 182128" src="https://github.com/user-attachments/assets/26b42843-1244-4297-904a-6a62c22581df" />
<img width="1919" height="867" alt="Screenshot 2026-09-21 182142" src="https://github.com/user-attachments/assets/efa2ed7e-a61f-47c0-b075-68d03b6dfb58" />

---

#### 📊 Pipeline Stages

| Stage                   | Purpose                      |
| ----------------------- | ---------------------------- |
| Checkout                | Download source code         |
| Node Setup              | Configure Node.js            |
| Dependency Installation | Install project dependencies |
| Frontend Build          | Build React application      |
| Backend Check           | Validate backend syntax      |
| Docker Build            | Create container images      |
| Docker Push             | Upload images to Docker Hub  |
| Health Check            | Verify backend availability  |

---

#### 🎯 Key Concepts Learned

During Day 48, I practiced:

* GitHub Actions
* CI/CD
* Reusable workflows
* `workflow_call`
* Workflow inputs
* Workflow secrets
* Workflow outputs
* Docker build automation
* Docker Hub authentication
* Docker image publishing
* Pull Request automation
* Main branch automation
* Health checks
* PostgreSQL containers
* Docker networking
* GitHub Actions troubleshooting
* GitHub Actions logs
* Secure secret management

---

#### 🛠️ Troubleshooting Experience

During the project, the health-check workflow initially failed with:

```text
curl: (7) Failed to connect to localhost port 5000
```

The issue demonstrated an important Docker concept:

> A backend container may depend on another service such as PostgreSQL.

The health-check workflow was therefore configured to start PostgreSQL first and then start the backend with the required database configuration.

This helped me understand the difference between:

```text
Container is running
```

and:

```text
Application inside the container is actually ready
```

---

#### ✅ Final Outcome

The Day 48 project demonstrates a complete GitHub Actions CI/CD implementation for a full-stack Ecommerce application.

The automation covers:

```text
Code
 ↓
Build
 ↓
Validation
 ↓
Docker Build
 ↓
Docker Push
 ↓
Health Check
```

This project helped me understand how GitHub Actions can be used to automate a real-world DevOps workflow instead of running each step manually.

---

#### 🔗 Project Repository

GitHub:

https://github.com/tejswini-maingade/ecommerce-app

Docker Hub Images:

```text
tejswinim/ecommerce-backend
tejswinim/ecommerce-frontend
```

---

#### 🏁 Day 48 Completed

**90DaysOfDevOps – Day 48**

A complete GitHub Actions capstone project covering reusable workflows, CI/CD automation, Docker image publishing, secrets management, and application health checks.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document the release process. | You can demonstrate, without notes: *add a hardened multi-stage image build* — with evidence committed to `day-48/`. |
| 2 | Add Dependabot for Docker base images. | You can demonstrate, without notes: *add image scanning, SBOM and signing to the pipeline* — with evidence committed to `day-48/`. |
| 3 | Measure total pipeline time and optimise. | You can demonstrate, without notes: *publish versioned releases* — with evidence committed to `day-48/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Scan blocks on unfixable CVE | Use `.trivyignore` with justification + expiry. |
| Release job lacks permissions | Add `packages: write`, `id-token: write`, `contents: write`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Pipeline identity should have only the permissions it needs; protect tags; require approvals for release.
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

1. How do you gate releases on security?
2. How do you verify a signed image?
3. How do you handle CVE exceptions?
4. What goes in a release?
5. **Scenario:** Introduce a known-vulnerable base image on a branch; the pipeline must block it with a clear message. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 66 |
| Hands-on labs and commands (Sections 4–6) | 148 |
| Assignment + troubleshooting (Sections 7–8) | 66 |
| Interview practice, documentation, Git push (Sections 11–14) | 50 |
| **Total** | **330 (≈ 5.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 47](../day-47/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 49 →](../day-49/README.md)
