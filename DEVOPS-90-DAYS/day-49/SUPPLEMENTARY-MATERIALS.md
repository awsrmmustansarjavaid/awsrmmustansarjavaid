# Day 49 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 49 – DevSecOps: Add Security to Your CI/CD Pipeline

## Task
You can build and deploy automatically. But what if your Docker image has a known vulnerability? What if someone accidentally commits a password? Today you learn **DevSecOps** — adding simple, automated security checks to your pipeline so problems are caught **before** they reach production.

Don't worry — this isn't a security course. You're just adding a few smart steps to the pipeline you already built.

---

## Expected Output
- Security scanning added to your `github-actions-capstone` repo (from Day 48)
- A markdown file: `day-49-devsecops.md`
- Screenshot of a security scan running in your pipeline

---

## What is DevSecOps?

Think of it like this:

**Without DevSecOps:**
> You build the app → deploy it → a security team finds a vulnerability weeks later → you scramble to fix it

**With DevSecOps:**
> You open a PR → the pipeline automatically checks for vulnerabilities → you fix it before it ever gets merged

**That's it.** DevSecOps = adding security checks to the pipeline you already have. Not a separate process — just a few extra steps.

---

## Key Principles (Keep These in Mind)

1. **Catch problems early** — A vulnerability found in a PR takes 5 minutes to fix. The same vulnerability found in production takes days.

2. **Automate the checks** — Don't rely on someone remembering to check. Let the pipeline do it every time.

3. **Block on critical issues** — If a scan finds a serious vulnerability, the pipeline should fail — just like a failing test.

4. **Never put secrets in code** — Use GitHub Secrets (you learned this on Day 44). No `.env` files, no hardcoded API keys.

5. **Give only the access needed** — Your workflow doesn't need write access to everything. Limit permissions.

---

## Challenge Tasks

### Task 1: Scan Your Docker Image for Vulnerabilities
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

### Task 2: Enable GitHub's Built-in Secret Scanning
GitHub can automatically detect if someone pushes a secret (API key, token, password) to your repo.

1. Go to your repo → Settings → **Code security and analysis**
2. Enable **Secret scanning**
3. If available, also enable **Push protection** — this blocks the push entirely if a secret is detected

That's it — no workflow changes needed. GitHub does this automatically.

Write in your notes:
- What is the difference between secret scanning and push protection?
- What happens if GitHub detects a leaked AWS key in your repo?

---

### Task 3: Scan Dependencies for Known Vulnerabilities
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

### Task 4: Add Permissions to Your Workflows
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

### Task 5: See the Full Secure Pipeline
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

## Brownie Points (Optional — For the Curious)

### Pin Actions to Commit SHAs
Tags like `@v4` can be moved by the action author. For extra security, pin to the exact commit:
```yaml
# Instead of this:
uses: actions/checkout@v4

# Use this:
uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
```
This protects against supply chain attacks where a tag is silently changed.

### Upload Scan Results to GitHub Security Tab
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

### Learn About OIDC (Keyless Authentication)
Instead of storing cloud credentials as long-lived secrets, GitHub Actions can use OIDC to get short-lived tokens automatically. Research: "GitHub Actions OIDC" — it's how production pipelines authenticate to AWS, GCP, and Azure without storing any keys.

---

## Hints
- Trivy action docs: look up `aquasecurity/trivy-action` on GitHub
- `exit-code: '1'` = fail the step, `exit-code: '0'` = just warn
- Dependency review only works on `pull_request` events (not on push)
- Permissions block goes at the workflow level or the job level
- GitHub secret scanning is free for public repos

---

## Documentation
Create `day-49-devsecops.md` with:
- What DevSecOps means in your own words (2-3 sentences)
- Screenshot of Trivy scan output in your pipeline
- Your updated pipeline diagram with security steps
- What you learned about secret scanning and dependency review

---

## Submission
1. Add `day-49-devsecops.md` to `2026/day-49/`
2. Commit and push to your fork

---

## Learn in Public
Share your pipeline diagram on LinkedIn — "My CI/CD pipeline now scans for vulnerabilities automatically." Simple, powerful, and impressive.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## Source file: `devsecops.md`

# Day 49 – DevSecOps: Add Security to Your CI/CD Pipeline

## Overview

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

## What is DevSecOps?

**DevSecOps = Development + Security + Operations**

DevSecOps integrates security into the development and CI/CD process instead of performing security checks only after an application is deployed.

### Traditional approach

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

### DevSecOps approach

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

# 1. Trivy Vulnerability Scanning

## What is Trivy?

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

# 2. Why Trivy Was Added

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

# 3. Trivy GitHub Actions Configuration

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

### Important configuration

| Setting                   | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `image-ref`               | Specifies the Docker image to scan                   |
| `format: table`           | Displays results in table format                     |
| `severity: HIGH,CRITICAL` | Checks HIGH and CRITICAL vulnerabilities             |
| `ignore-unfixed: false`   | Does not ignore vulnerabilities without fixes        |
| `exit-code: '1'`          | Fails the workflow when vulnerabilities are detected |

The pipeline therefore prevents vulnerable images from being pushed.

---

# 4. Trivy Vulnerability Issue

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

# 5. Finding the Actual Trivy Issue

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

# 6. Final Backend Dockerfile

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

### Why was npm removed?

The application starts with:

```dockerfile
CMD ["node", "index.js"]
```

The production container does not need npm to run the application.

npm is required during the image build to install dependencies, but it is not required by the running Node.js application.

Therefore, removing npm from the final runtime image reduces unnecessary software and removes the vulnerable npm dependency tree identified by Trivy.

---

# 7. Why Alpine Linux Was Used

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

# 8. Dependency Review for Pull Requests

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

# 9. GitHub Secret Scanning

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

# 10. Workflow Permissions

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

# 11. Secure CI/CD Pipeline

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

# 12. Security Gates

The pipeline now contains security gates.

### Pull Request

```text
Pull Request
     ↓
Dependency Review
     ↓
Build & Test
     ↓
Merge
```

### Main Branch

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

# 13. Backend Dependency Verification

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

# 14. Git Commands Used

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

# 15. Verification

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

# 16. Important Learning

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

# 17. DevSecOps Best Practices Learned

### 1. Shift security left

Security checks should happen early in the development lifecycle.

### 2. Scan before deployment

Images should be scanned before they are pushed or deployed.

### 3. Use security gates

HIGH and CRITICAL vulnerabilities can be used as pipeline blockers.

### 4. Keep dependencies updated

Dependencies should be regularly checked and updated.

### 5. Minimize runtime images

Remove unnecessary build-time tools from production images.

### 6. Use least-privilege permissions

GitHub Actions should receive only the permissions required by the workflow.

### 7. Protect secrets

Secret scanning and push protection help prevent accidental credential exposure.

---

# 18. Final Result

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

## Day 49 Checklist

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
