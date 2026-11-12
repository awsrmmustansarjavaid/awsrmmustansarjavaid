# Day 49 — Capstone 1 (Part 3/3): Deploy, Smoke-Test, Roll Back & Document

[← Day 48](../day-48/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 50 →](../day-50/README.md)

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

- [ ] Automate deployment to staging and production
- [ ] Add smoke tests, approvals and rollback
- [ ] Finish portfolio-grade documentation

## 2. Prerequisites

- Days 43, 47, 48.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Deploy target

Use a cloud VM or local VM with Docker Compose over SSH/SSM, or a small cluster. The pipeline pulls by digest and runs `docker compose pull && up -d`.

### 3.2 Controls

Staging auto-deploy on main; prod requires environment approval; smoke test gate; automatic rollback to previous digest on failure.

### 3.3 Evidence

Record DORA-style numbers: lead time, deploy frequency, MTTR from your drills.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Provision a VM (manually for now; Terraform in Capstone 2).
2. [ ] Create deploy job via SSH key stored as environment secret (or SSM).
3. [ ] Implement smoke-test script and rollback.
4. [ ] Run failure drill: deploy a broken image; confirm auto rollback.
5. [ ] Finalise README, diagrams, runbook, screenshots; tag `v1.0.0`.

## 5. Real-World Scenario

> Present the capstone to a hiring panel: 'Show me how a code change reaches production safely and how you recover from a bad release.'

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ssh deploy@staging 'cd /srv/app && docker compose pull && docker compose up -d'
./scripts/smoke.sh https://staging.example.com || ./scripts/rollback.sh
gh workflow run deploy.yml -f environment=production
git tag -a v1.0.0 -m "Capstone 1 complete" && git push --tags
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 49 – DevSecOps: Add Security to Your CI/CD Pipeline — Challenge Brief

#### Task
You can build and deploy automatically. But what if your Docker image has a known vulnerability? What if someone accidentally commits a password? Today you learn **DevSecOps** — adding simple, automated security checks to your pipeline so problems are caught **before** they reach production.

Don't worry — this isn't a security course. You're just adding a few smart steps to the pipeline you already built.

---

#### Expected Output
- Security scanning added to your `github-actions-capstone` repo (from Day 48)
- A markdown file: `day-49-devsecops.md`
- Screenshot of a security scan running in your pipeline

---

#### What is DevSecOps?

Think of it like this:

**Without DevSecOps:**
> You build the app → deploy it → a security team finds a vulnerability weeks later → you scramble to fix it

**With DevSecOps:**
> You open a PR → the pipeline automatically checks for vulnerabilities → you fix it before it ever gets merged

**That's it.** DevSecOps = adding security checks to the pipeline you already have. Not a separate process — just a few extra steps.

---

#### Key Principles (Keep These in Mind)

1. **Catch problems early** — A vulnerability found in a PR takes 5 minutes to fix. The same vulnerability found in production takes days.

2. **Automate the checks** — Don't rely on someone remembering to check. Let the pipeline do it every time.

3. **Block on critical issues** — If a scan finds a serious vulnerability, the pipeline should fail — just like a failing test.

4. **Never put secrets in code** — Use GitHub Secrets (you learned this on Day 44). No `.env` files, no hardcoded API keys.

5. **Give only the access needed** — Your workflow doesn't need write access to everything. Limit permissions.

---

#### Challenge Tasks

##### Task 1: Scan Your Docker Image for Vulnerabilities
Your Docker image might use a base image with known security issues. Let's find out.

Add this step to your main branch pipeline (after Docker build, before deploy):
```yaml
- name: Scan Docker Image for Vulnerabilities
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-username/your-app:latest'
    format: 'table'
    exit-code: '1'
    severity: 'CRITICAL,HIGH'
```

What this does:
- `trivy` scans your Docker image for known CVEs (Common Vulnerabilities and Exposures)
- `format: 'table'` prints a readable table in the logs
- `exit-code: '1'` means **fail the pipeline** if CRITICAL or HIGH vulnerabilities are found
- If it passes, your image is clean — proceed to push and deploy

Push and check the Actions tab. Read the scan output.

**Verify:** Can you see the vulnerability table in the logs? Did it pass or fail?

Write in your notes: What CVEs (if any) were found? What base image are you using?

---

##### Task 2: Enable GitHub's Built-in Secret Scanning
GitHub can automatically detect if someone pushes a secret (API key, token, password) to your repo.

1. Go to your repo → Settings → **Code security and analysis**
2. Enable **Secret scanning**
3. If available, also enable **Push protection** — this blocks the push entirely if a secret is detected

That's it — no workflow changes needed. GitHub does this automatically.

Write in your notes:
- What is the difference between secret scanning and push protection?
- What happens if GitHub detects a leaked AWS key in your repo?

---

##### Task 3: Scan Dependencies for Known Vulnerabilities
If your app uses packages (pip, npm, etc.), those packages might have known vulnerabilities.

Add this to your **PR pipeline** (not the main pipeline):
```yaml
- name: Check Dependencies for Vulnerabilities
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: critical
```

This checks any **new** dependencies added in the PR against a vulnerability database. If a dependency has a critical CVE, the PR check fails.

Test it:
1. Open a PR that adds a package to your app
2. Check the Actions tab — did the dependency review run?

**Verify:** Does the dependency review show up as a check on your PR?

---

##### Task 4: Add Permissions to Your Workflows
By default, workflows get broad permissions. Lock them down.

Add this block near the top of your workflow files (after `on:`):
```yaml
permissions:
  contents: read
```

If a workflow needs to comment on PRs, add:
```yaml
permissions:
  contents: read
  pull-requests: write
```

Update at least 2 of your existing workflow files with a `permissions` block.

Write in your notes: Why is it a good practice to limit workflow permissions? What could go wrong if a compromised action has write access to your repo?

---

##### Task 5: See the Full Secure Pipeline
Look at what your pipeline does now:

```
PR opened
  → build & test
  → dependency vulnerability check     ← NEW (Day 49)
  → PR checks pass or fail

Merge to main
  → build & test
  → Docker build
  → Trivy image scan (fail on CRITICAL) ← NEW (Day 49)
  → Docker push (only if scan passes)
  → deploy

Always active
  → GitHub secret scanning              ← NEW (Day 49)
  → push protection for secrets         ← NEW (Day 49)
```

Draw this diagram in your notes. You just built a **DevSecOps pipeline** — security is now part of your automation, not an afterthought.

---

#### Brownie Points (Optional — For the Curious)

##### Pin Actions to Commit SHAs
Tags like `@v4` can be moved by the action author. For extra security, pin to the exact commit:
```yaml
# Instead of this:
uses: actions/checkout@v4

# Use this:
uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
```
This protects against supply chain attacks where a tag is silently changed.

##### Upload Scan Results to GitHub Security Tab
Add SARIF output to Trivy and upload it — your scan results will appear in the repo's **Security** tab:
```yaml
- uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-username/your-app:latest'
    format: 'sarif'
    output: 'trivy-results.sarif'
- uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: 'trivy-results.sarif'
```

##### Learn About OIDC (Keyless Authentication)
Instead of storing cloud credentials as long-lived secrets, GitHub Actions can use OIDC to get short-lived tokens automatically. Research: "GitHub Actions OIDC" — it's how production pipelines authenticate to AWS, GCP, and Azure without storing any keys.

---

#### Hints
- Trivy action docs: look up `aquasecurity/trivy-action` on GitHub
- `exit-code: '1'` = fail the step, `exit-code: '0'` = just warn
- Dependency review only works on `pull_request` events (not on push)
- Permissions block goes at the workflow level or the job level
- GitHub secret scanning is free for public repos

---

#### Documentation
Create `day-49-devsecops.md` with:
- What DevSecOps means in your own words (2-3 sentences)
- Screenshot of Trivy scan output in your pipeline
- Your updated pipeline diagram with security steps
- What you learned about secret scanning and dependency review

---

#### Submission
1. Add `day-49-devsecops.md` to `2026/day-49/`
2. Commit and push to your fork

---

#### Learn in Public
Share your pipeline diagram on LinkedIn — "My CI/CD pipeline now scans for vulnerabilities automatically." Simple, powerful, and impressive.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 49 – DevSecOps: Add Security to Your CI/CD Pipeline — Notes & Solution

#### Overview

On Day 49, I added security checks to my CI/CD pipeline by integrating **DevSecOps practices** into the GitHub Actions workflow.

The goal was to identify security vulnerabilities before Docker images are pushed or deployed.

The pipeline now includes:

* Docker image vulnerability scanning with **Trivy**
* Dependency review for Pull Requests
* GitHub Secret Scanning and Push Protection
* Workflow permissions hardening
* Security checks before Docker image push
* Failure of the pipeline when HIGH or CRITICAL vulnerabilities are detected

---

#### What is DevSecOps?

**DevSecOps = Development + Security + Operations**

DevSecOps integrates security into the development and CI/CD process instead of performing security checks only after an application is deployed.

##### Traditional approach

```text
Developer
   ↓
Build
   ↓
Test
   ↓
Deploy
   ↓
Security Check
```

Security is performed late in the process.

##### DevSecOps approach

```text
Developer
   ↓
Code
   ↓
Build
   ↓
Test
   ↓
Security Scan
   ↓
Docker Image Scan
   ↓
Push
   ↓
Deploy
```

Security becomes part of the CI/CD pipeline.

---

#### 1. Trivy Vulnerability Scanning

#### What is Trivy?

**Trivy** is an open-source security scanner used to detect vulnerabilities in:

* Container images
* Operating system packages
* Application dependencies
* Filesystems
* Git repositories
* Kubernetes configurations
* Infrastructure-as-Code

For this project, Trivy was used to scan the Docker image before pushing it to Docker Hub.

---

#### 2. Why Trivy Was Added

The Docker image may contain vulnerable:

* OS packages
* Node.js packages
* npm dependencies
* Other software components

Therefore, the pipeline should not push an image containing serious vulnerabilities.

The security flow is:

```text
Docker Build
     ↓
Trivy Scan
     ↓
HIGH / CRITICAL?
   ↙       ↘
 YES       NO
  ↓         ↓
FAIL      Continue
            ↓
       Docker Push
```

---

#### 3. Trivy GitHub Actions Configuration

The reusable Docker workflow was updated to scan the image after building it and before pushing it.

```yaml
- name: Trivy vulnerability scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ secrets.docker_username }}/${{ inputs.image_name }}:${{ inputs.tag }}
    format: table
    severity: HIGH,CRITICAL
    ignore-unfixed: false
    exit-code: '1'
```

##### Important configuration

| Setting                   | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `image-ref`               | Specifies the Docker image to scan                   |
| `format: table`           | Displays results in table format                     |
| `severity: HIGH,CRITICAL` | Checks HIGH and CRITICAL vulnerabilities             |
| `ignore-unfixed: false`   | Does not ignore vulnerabilities without fixes        |
| `exit-code: '1'`          | Fails the workflow when vulnerabilities are detected |

The pipeline therefore prevents vulnerable images from being pushed.

---

#### 4. Trivy Vulnerability Issue

During the implementation, Trivy initially reported several vulnerabilities.

The important finding was:

```text
Node.js (node-pkg)

Total: 4 (HIGH: 4, CRITICAL: 0)
```

The affected packages were:

```text
brace-expansion
ip-address
tar
```

The required fixed versions identified by Trivy were:

```text
brace-expansion → 5.0.9
ip-address      → 10.3.1
tar             → 7.5.21
```

The backend dependency tree was checked with:

```bash
cd /workspaces/ecommerce-app/server

npm ls brace-expansion ip-address tar
```

The result showed:

```text
brace-expansion@5.0.9
ip-address@10.3.1
tar@7.5.21
```

This confirmed that the application dependencies had been updated.

---

#### 5. Finding the Actual Trivy Issue

The important part of the Trivy report was that the vulnerable packages were located under npm's global installation:

```text
/usr/local/lib/node_modules/npm/node_modules/
```

The Dockerfile contained:

```dockerfile
RUN npm install --global npm@latest
```

This installed a global npm version together with npm's bundled dependencies.

Therefore, even though the application dependencies had been fixed, Trivy was still finding vulnerable packages inside the globally installed npm package.

---

#### 6. Final Backend Dockerfile

The backend Dockerfile was changed to avoid installing another global npm version.

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev \
    && npm cache clean --force

COPY . .

# npm is only needed while building the image.
# Remove it from the final runtime image so Trivy
# does not scan npm's bundled dependencies.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

EXPOSE 5000

CMD ["node", "index.js"]
```

##### Why was npm removed?

The application starts with:

```dockerfile
CMD ["node", "index.js"]
```

The production container does not need npm to run the application.

npm is required during the image build to install dependencies, but it is not required by the running Node.js application.

Therefore, removing npm from the final runtime image reduces unnecessary software and removes the vulnerable npm dependency tree identified by Trivy.

---

#### 7. Why Alpine Linux Was Used

The original backend image used:

```dockerfile
FROM node:24-bookworm-slim
```

Trivy detected many Debian OS-level vulnerabilities in that image.

The image contained vulnerabilities in packages such as:

* util-linux
* perl-base
* zlib1g
* libmount
* libuuid
* mount

The image was changed to:

```dockerfile
FROM node:24-alpine
```

Alpine provides a smaller runtime image and, in this scan, significantly reduced the OS-level vulnerability findings.

The final image was therefore based on:

```text
Node.js 24
Alpine Linux
```

---

#### 8. Dependency Review for Pull Requests

Dependency Review was added to the Pull Request workflow.

The purpose is to detect vulnerable dependencies introduced by a Pull Request.

Example configuration:

```yaml
- name: Dependency Review
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: critical
```

The workflow can therefore detect dependency changes before they are merged into the main branch.

---

#### 9. GitHub Secret Scanning

GitHub Secret Scanning was enabled for the repository.

Secret scanning helps identify accidentally committed sensitive information such as:

* API keys
* Access tokens
* Cloud credentials
* Private keys
* Authentication secrets

Push Protection can also prevent detected secrets from being pushed to the repository.

This helps protect sensitive credentials before they become part of the Git history.

---

#### 10. Workflow Permissions

Workflow permissions were restricted using:

```yaml
permissions:
  contents: read
```

This follows the principle of least privilege.

Instead of giving a GitHub Actions workflow unnecessary permissions, only the permissions required by the workflow should be granted.

Example:

```yaml
name: Build and Test

on:
  push:
    branches:
      - main

permissions:
  contents: read
```

---

#### 11. Secure CI/CD Pipeline

The final DevSecOps pipeline follows this structure:

```text
                    Developer
                        |
                        v
                   Pull Request
                        |
                        v
              +-------------------+
              | Dependency Review |
              +-------------------+
                        |
                        v
                  Build & Test
                        |
                        v
              Merge to main branch
                        |
                        v
                  Build Docker
                     Image
                        |
                        v
                +---------------+
                |     Trivy     |
                | Vulnerability |
                |     Scan      |
                +---------------+
                   /         \
                 FAIL        PASS
                  |            |
                  v            v
              Stop Pipeline   Docker Push
                                  |
                                  v
                              Deployment
```

---

#### 12. Security Gates

The pipeline now contains security gates.

##### Pull Request

```text
Pull Request
     ↓
Dependency Review
     ↓
Build & Test
     ↓
Merge
```

##### Main Branch

```text
Main
 ↓
Build & Test
 ↓
Docker Build
 ↓
Trivy Scan
 ↓
HIGH/CRITICAL?
 ↓
No
 ↓
Docker Push
 ↓
Deploy
```

If Trivy detects HIGH or CRITICAL vulnerabilities, the workflow stops.

---

#### 13. Backend Dependency Verification

The backend dependency versions were verified using:

```bash
cd /workspaces/ecommerce-app/server

npm ls brace-expansion ip-address tar
```

Expected result:

```text
brace-expansion@5.0.9
ip-address@10.3.1
tar@7.5.21
```

This confirms that the vulnerable versions reported earlier were replaced in the application dependency tree.

---

#### 14. Git Commands Used

After updating the Dockerfile and dependency configuration:

```bash
git status
```

Review the changes:

```bash
git diff
```

Stage the required file:

```bash
git add server/Dockerfile
```

Commit the change:

```bash
git commit -m "fix Trivy npm vulnerabilities in backend image"
```

Push to GitHub:

```bash
git push origin main
```

GitHub Actions then automatically starts the pipeline.

---

#### 15. Verification

After pushing the changes, the GitHub Actions pipeline should execute:

```text
Checkout
   ↓
Build & Test
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Docker Login
   ↓
Docker Push
```

The Trivy step should complete successfully when no HIGH or CRITICAL vulnerabilities are detected.

The Docker image is pushed only after the security scan passes.

---

#### 16. Important Learning

One important lesson from this task was that fixing application dependencies alone is not always enough.

For example:

```text
Application dependencies
        ↓
    npm packages
        ↓
      Fixed
```

But the Docker image can also contain:

```text
Operating system packages
Node.js
npm
npm bundled dependencies
Other system tools
```

Therefore, container security scanning needs to inspect the **complete image**, not only the application's `package.json`.

---

#### 17. DevSecOps Best Practices Learned

##### 1. Shift security left

Security checks should happen early in the development lifecycle.

##### 2. Scan before deployment

Images should be scanned before they are pushed or deployed.

##### 3. Use security gates

HIGH and CRITICAL vulnerabilities can be used as pipeline blockers.

##### 4. Keep dependencies updated

Dependencies should be regularly checked and updated.

##### 5. Minimize runtime images

Remove unnecessary build-time tools from production images.

##### 6. Use least-privilege permissions

GitHub Actions should receive only the permissions required by the workflow.

##### 7. Protect secrets

Secret scanning and push protection help prevent accidental credential exposure.

---

#### 18. Final Result

Day 49 introduced DevSecOps security controls into the CI/CD pipeline.

The final pipeline includes:

* ✅ GitHub Actions
* ✅ Build and Test
* ✅ Dependency Review
* ✅ Docker Image Build
* ✅ Trivy Vulnerability Scan
* ✅ HIGH/CRITICAL security gate
* ✅ Docker Hub Push
* ✅ GitHub Secret Scanning
* ✅ Push Protection
* ✅ Restricted workflow permissions
* ✅ Security before deployment

The key concept learned was:

> **Security should be integrated into CI/CD rather than treated as a separate activity after deployment.**

<img width="1916" height="876" alt="Screenshot 2026-09-21 233344" src="https://github.com/user-attachments/assets/66cab38a-e627-4081-8e1f-15d2647e9a0c" />
<img width="1919" height="866" alt="Screenshot 2026-09-21 232910" src="https://github.com/user-attachments/assets/43f12368-1de5-454c-b6d7-0b61549b3591" />

---

#### Day 49 Checklist

* [x] Add Trivy container scanning
* [x] Scan Docker image before push
* [x] Fail pipeline on HIGH/CRITICAL vulnerabilities
* [x] Fix vulnerable backend dependencies
* [x] Remove unnecessary global npm from runtime image
* [x] Use Node.js Alpine image
* [x] Add Dependency Review
* [x] Enable Secret Scanning
* [x] Enable Push Protection
* [x] Add `contents: read` permissions
* [x] Verify secure CI/CD flow
* [ ] Add screenshot of successful Trivy security scan
* [ ] Add screenshot of GitHub Actions pipeline
* [ ] Add screenshot of Secret Scanning settings
* [ ] Add screenshot of Dependency Review

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Record a 3-minute demo video/GIF. | You can demonstrate, without notes: *automate deployment to staging and production* — with evidence committed to `day-49/`. |
| 2 | Write the incident drill report. | You can demonstrate, without notes: *add smoke tests, approvals and rollback* — with evidence committed to `day-49/`. |
| 3 | Add a 'Lessons learned' section. | You can demonstrate, without notes: *finish portfolio-grade documentation* — with evidence committed to `day-49/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Deploy succeeds but app unhealthy | Smoke test gate + auto rollback. |
| SSH deploy key exposure risk | Use restricted key, forced command or SSM Session Manager. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use deploy keys limited to one host/command, audit logs, immutable digests, no direct prod access from laptops.
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

1. How does your pipeline deploy?
2. How do you roll back?
3. How do you secure deploy credentials?
4. What metrics show delivery health?
5. **Scenario:** Present the capstone to a hiring panel: 'Show me how a code change reaches production safely and how you recover from a bad release. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I demo end-to-end? | ☐ | ☐ | ☐ | ☐ |
| Does rollback work? | ☐ | ☐ | ☐ | ☐ |
| Is the README interview-ready? | ☐ | ☐ | ☐ | ☐ |
| Automate deployment to staging and production | ☐ | ☐ | ☐ | ☐ |
| Add smoke tests, approvals and rollback | ☐ | ☐ | ☐ | ☐ |
| Finish portfolio-grade documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-49/` in your own repository:

```text
day-49/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-49
git add day-49/
git commit -m "day-49: capstone 1 (part 3/3)"
git push -u origin day-49
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 1 v1.0.0: pipeline, deploy, rollback, docs.

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

## 18. Challenge Notes — Day 49: Ansible + Jenkins Integration

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 49** of the DevOps 90-Day Challenge!
Today, we’ll integrate our **Configuration Management** tool (Ansible) with our **CI/CD** tool (Jenkins) to build a seamless deployment pipeline.

[![](https://img.youtube.com/vi/eJIu2ehF098/0.jpg)](https://www.youtube.com/watch?v=eJIu2ehF098)

[Watch the video](https://www.youtube.com/watch?v=eJIu2ehF098)

---

#### Objective

By the end of this session, you will:

* Install and configure the **Ansible Plugin** in Jenkins.
* Trigger **Ansible Playbooks** directly from a Jenkins Pipeline.
* Automate the deployment of an application using CI/CD.

---

#### Tools Used

* **Jenkins** (CI Server)
* **Ansible** (Configuration Management)
* **Git** (Version Control)
* **Remote Hosts** (Target Servers)

---

#### Key Concepts

##### 1. Why Integrate?

* **Continuous Deployment**: Jenkins builds artifacts; Ansible deploys them.
* **Consistency**: Automated runs ensure the same configuration every time.
* **Visibility**: Jenkins logs provide clear output of Ansible runs.

##### 2. Jenkinsfile Sample

```groovy
pipeline {
    agent any

    stages {
        stage('SCM Checkout') {
            steps {
                git 'https://github.com/myuser/my-ansible-repo.git'
            }
        }
        
        stage('Deploy with Ansible') {
            steps {
                ansiblePlaybook(
                    playbook: 'site.yml',
                    inventory: 'inventory/prod.ini',
                    credentialsId: 'ssh-private-key'
                )
            }
        }
    }
}
```

##### 3. Handling Secrets

Use **Jenkins Credentials** to securely store the SSH private keys needed by Ansible to connect to managed nodes.

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Pipeline-as-Code** | Defining the deployment logic in a `Jenkinsfile`. |
| **Jenkins Plugin** | `Ansible` plugin used to execute `ansible-playbook`. |
| **Credentials Binding** | Injecting SSH keys safely into the pipeline. |

---

#### Bonus (Extra Learning)

* Try passing **Build Parameters** from Jenkins to Ansible as "Extra Variables".
* Set up a **Webhook** to trigger deployment on Git push.

---

#### Congratulations!

You’ve successfully integrated **Ansible with Jenkins**!
Your pipeline now bridges the gap between Code (Git) and Operations (Server Config).

---

#### Try These Next

* Add a **Test Stage** that verifies the application is up (`curl localhost`) after deployment.
* Implement a **Rollback** stage in case of failure.

## 19. Cohort Practice — Day 49: DevSecOps: Add Security to Your CI/CD Pipeline

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You can build and deploy automatically. But what if your Docker image has a known vulnerability? What if someone accidentally commits a password? Today you learn **DevSecOps** — adding simple, automated security checks to your pipeline so problems are caught **before** they reach production.

Don't worry — this isn't a security course. You're just adding a few smart steps to the pipeline you already built.

---

#### Expected Output
- Security scanning added to your `github-actions-capstone` repo (from Day 48)
- A markdown file: `day-49-devsecops.md`
- Screenshot of a security scan running in your pipeline

---

#### What is DevSecOps?

Think of it like this:

**Without DevSecOps:**
> You build the app → deploy it → a security team finds a vulnerability weeks later → you scramble to fix it

**With DevSecOps:**
> You open a PR → the pipeline automatically checks for vulnerabilities → you fix it before it ever gets merged

**That's it.** DevSecOps = adding security checks to the pipeline you already have. Not a separate process — just a few extra steps.

---

#### Key Principles (Keep These in Mind)

1. **Catch problems early** — A vulnerability found in a PR takes 5 minutes to fix. The same vulnerability found in production takes days.

2. **Automate the checks** — Don't rely on someone remembering to check. Let the pipeline do it every time.

3. **Block on critical issues** — If a scan finds a serious vulnerability, the pipeline should fail — just like a failing test.

4. **Never put secrets in code** — Use GitHub Secrets (you learned this on Day 44). No `.env` files, no hardcoded API keys.

5. **Give only the access needed** — Your workflow doesn't need write access to everything. Limit permissions.

---

#### Challenge Tasks

##### Task 1: Scan Your Docker Image for Vulnerabilities
Your Docker image might use a base image with known security issues. Let's find out.

Add this step to your main branch pipeline (after Docker build, before deploy):
```yaml
- name: Scan Docker Image for Vulnerabilities
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-username/your-app:latest'
    format: 'table'
    exit-code: '1'
    severity: 'CRITICAL,HIGH'
```

What this does:
- `trivy` scans your Docker image for known CVEs (Common Vulnerabilities and Exposures)
- `format: 'table'` prints a readable table in the logs
- `exit-code: '1'` means **fail the pipeline** if CRITICAL or HIGH vulnerabilities are found
- If it passes, your image is clean — proceed to push and deploy

Push and check the Actions tab. Read the scan output.

**Verify:** Can you see the vulnerability table in the logs? Did it pass or fail?

Write in your notes: What CVEs (if any) were found? What base image are you using?

---

##### Task 2: Enable GitHub's Built-in Secret Scanning
GitHub can automatically detect if someone pushes a secret (API key, token, password) to your repo.

1. Go to your repo → Settings → **Code security and analysis**
2. Enable **Secret scanning**
3. If available, also enable **Push protection** — this blocks the push entirely if a secret is detected

That's it — no workflow changes needed. GitHub does this automatically.

Write in your notes:
- What is the difference between secret scanning and push protection?
- What happens if GitHub detects a leaked AWS key in your repo?

---

##### Task 3: Scan Dependencies for Known Vulnerabilities
If your app uses packages (pip, npm, etc.), those packages might have known vulnerabilities.

Add this to your **PR pipeline** (not the main pipeline):
```yaml
- name: Check Dependencies for Vulnerabilities
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: critical
```

This checks any **new** dependencies added in the PR against a vulnerability database. If a dependency has a critical CVE, the PR check fails.

Test it:
1. Open a PR that adds a package to your app
2. Check the Actions tab — did the dependency review run?

**Verify:** Does the dependency review show up as a check on your PR?

---

##### Task 4: Add Permissions to Your Workflows
By default, workflows get broad permissions. Lock them down.

Add this block near the top of your workflow files (after `on:`):
```yaml
permissions:
  contents: read
```

If a workflow needs to comment on PRs, add:
```yaml
permissions:
  contents: read
  pull-requests: write
```

Update at least 2 of your existing workflow files with a `permissions` block.

Write in your notes: Why is it a good practice to limit workflow permissions? What could go wrong if a compromised action has write access to your repo?

---

##### Task 5: See the Full Secure Pipeline
Look at what your pipeline does now:

```
PR opened
  → build & test
  → dependency vulnerability check     ← NEW (Day 49)
  → PR checks pass or fail

Merge to main
  → build & test
  → Docker build
  → Trivy image scan (fail on CRITICAL) ← NEW (Day 49)
  → Docker push (only if scan passes)
  → deploy

Always active
  → GitHub secret scanning              ← NEW (Day 49)
  → push protection for secrets         ← NEW (Day 49)
```

Draw this diagram in your notes. You just built a **DevSecOps pipeline** — security is now part of your automation, not an afterthought.

---

#### Brownie Points (Optional — For the Curious)

##### Pin Actions to Commit SHAs
Tags like `@v4` can be moved by the action author. For extra security, pin to the exact commit:
```yaml
# Instead of this:
uses: actions/checkout@v4

# Use this:
uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
```
This protects against supply chain attacks where a tag is silently changed.

##### Upload Scan Results to GitHub Security Tab
Add SARIF output to Trivy and upload it — your scan results will appear in the repo's **Security** tab:
```yaml
- uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-username/your-app:latest'
    format: 'sarif'
    output: 'trivy-results.sarif'
- uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: 'trivy-results.sarif'
```

##### Learn About OIDC (Keyless Authentication)
Instead of storing cloud credentials as long-lived secrets, GitHub Actions can use OIDC to get short-lived tokens automatically. Research: "GitHub Actions OIDC" — it's how production pipelines authenticate to AWS, GCP, and Azure without storing any keys.

---

#### Hints
- Trivy action docs: look up `aquasecurity/trivy-action` on GitHub
- `exit-code: '1'` = fail the step, `exit-code: '0'` = just warn
- Dependency review only works on `pull_request` events (not on push)
- Permissions block goes at the workflow level or the job level
- GitHub secret scanning is free for public repos

---

#### Documentation
Create `day-49-devsecops.md` with:
- What DevSecOps means in your own words (2-3 sentences)
- Screenshot of Trivy scan output in your pipeline
- Your updated pipeline diagram with security steps
- What you learned about secret scanning and dependency review

---

#### Submission
1. Add `day-49-devsecops.md` to `2026/day-49/`
2. Commit and push to your fork

---

#### Learn in Public
Share your pipeline diagram on LinkedIn — "My CI/CD pipeline now scans for vulnerabilities automatically." Simple, powerful, and impressive.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 49: EKS Managed Nodegroups (Spot + On‑Demand, Taints/Labels, Scaling)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Extend EKS with multiple managed node groups and schedule via node selectors/tolerations. Includes Terraform + Jenkins.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [infra/main.tf](files/hands-on-projects/infra/main.tf)
- [infra/outputs.tf](files/hands-on-projects/infra/outputs.tf)
- [infra/provider.tf](files/hands-on-projects/infra/provider.tf)
- [infra/terraform.tfvars.example](files/hands-on-projects/infra/terraform.tfvars.example)
- [infra/variables.tf](files/hands-on-projects/infra/variables.tf)
- [infra/versions.tf](files/hands-on-projects/infra/versions.tf)
- [k8s-examples/deploy-ondemand-selector.yaml](files/hands-on-projects/k8s-examples/deploy-ondemand-selector.yaml)
- [k8s-examples/deploy-spot-toleration.yaml](files/hands-on-projects/k8s-examples/deploy-spot-toleration.yaml)
- [scripts/eks_use_kubeconfig.sh](files/hands-on-projects/scripts/eks_use_kubeconfig.sh)
- [scripts/tf_apply.sh](files/hands-on-projects/scripts/tf_apply.sh)
- [scripts/tf_destroy.sh](files/hands-on-projects/scripts/tf_destroy.sh)
- [scripts/tf_init.sh](files/hands-on-projects/scripts/tf_init.sh)
- [scripts/tf_plan.sh](files/hands-on-projects/scripts/tf_plan.sh)


---

[← Day 48](../day-48/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 50 →](../day-50/README.md)
