# Day 35 — Container Security: Scanning, Non-root, SBOM & Hardening

[← Day 34](../day-34/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 36 →](../day-36/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Scan images for vulnerabilities and misconfigurations
- [ ] Generate an SBOM
- [ ] Apply runtime hardening flags

## 2. Prerequisites

- Days 31-34.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Threats

Vulnerable base images/libraries, leaked secrets, running as root, excessive capabilities, exposed sockets, supply-chain tampering.

### 3.2 Tooling

Trivy (vulns, misconfig, secrets), Grype, Syft (SBOM), Hadolint, Docker Scout, Cosign (signing).

### 3.3 Runtime hardening

`--read-only`, `--cap-drop ALL`, `--security-opt no-new-privileges`, non-root user, resource limits, seccomp/AppArmor.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `trivy image` your app; note HIGH/CRITICAL findings.
2. [ ] Switch to a newer slim/distroless base and rescan.
3. [ ] Generate SBOM: `syft app -o spdx-json > sbom.json`.
4. [ ] Run container with hardened flags and confirm it still works.
5. [ ] Create a policy: fail builds on CRITICAL with fix available.

## 5. Real-World Scenario

> A new CVE (log4shell-style) hits. Within 30 minutes, determine which images in your org contain the vulnerable package using SBOMs.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
trivy image --severity HIGH,CRITICAL myapp:1.0
trivy config .
syft myapp:1.0 -o spdx-json > sbom.json
grype sbom:./sbom.json
docker run --read-only --cap-drop ALL --security-opt no-new-privileges --tmpfs /tmp -u 10001 myapp:1.0
cosign sign --yes ghcr.io/USER/app@sha256:<digest>
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 35 – Multi-Stage Builds & Docker Hub — Challenge Brief

#### Task
Today's goal is to **build optimized images and share them with the world**.

Multi-stage builds are how real teams ship small, secure images. Docker Hub is how you distribute them. Both are interview favourites.

---

#### Expected Output
- A markdown file: `day-35-multistage-hub.md`
- Dockerfiles demonstrating multi-stage builds
- An image pushed to your Docker Hub account

---

#### Challenge Tasks

##### Task 1: The Problem with Large Images
1. Write a simple Go, Java, or Node.js app (even a "Hello World" is fine)
2. Create a Dockerfile that builds and runs it in a **single stage**
3. Build the image and check its **size**

Note down the size — you'll compare it later.

---

##### Task 2: Multi-Stage Build
1. Rewrite the Dockerfile using **multi-stage build**:
   - Stage 1: Build the app (install dependencies, compile)
   - Stage 2: Copy only the built artifact into a minimal base image (`alpine`, `distroless`, or `scratch`)
2. Build the image and check its size again
3. Compare the two sizes

Write in your notes: Why is the multi-stage image so much smaller?

---

##### Task 3: Push to Docker Hub
1. Create a free account on [Docker Hub](https://hub.docker.com) (if you don't have one)
2. Log in from your terminal
3. Tag your image properly: `yourusername/image-name:tag`
4. Push it to Docker Hub
5. Pull it on a different machine (or after removing locally) to verify

---

##### Task 4: Docker Hub Repository
1. Go to Docker Hub and check your pushed image
2. Add a **description** to the repository
3. Explore the **tags** tab — understand how versioning works
4. Pull a specific tag vs `latest` — what happens?

---

##### Task 5: Image Best Practices
Apply these to one of your images and rebuild:
1. Use a **minimal base image** (alpine vs ubuntu — compare sizes)
2. **Don't run as root** — add a non-root USER in your Dockerfile
3. Combine `RUN` commands to **reduce layers**
4. Use **specific tags** for base images (not `latest`)

Check the size before and after.

---

#### Hints
- Multi-stage: use `FROM ... AS builder` then `COPY --from=builder`
- Login: `docker login`
- Tag: `docker tag local-image:tag username/repo:tag`
- Push: `docker push username/repo:tag`
- Non-root user: `RUN adduser` + `USER`

---

#### Submission
1. Add your Dockerfiles and `day-35-multistage-hub.md` to `2026/day-35/`
2. Include the link to your Docker Hub repo
3. Commit and push to your fork

---

#### Learn in Public
Share your before/after image sizes on LinkedIn — the difference is always impressive.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 35 – Multi-Stage Builds & Docker Hub — Notes & Solution

#### Challenge Tasks

##### Task 1: The Problem with Large Images
1. Write a simple Go, Java, or Node.js app (even a "Hello World" is fine)
2. Create a Dockerfile that builds and runs it in a **single stage**
3. Build the image and check its **size**

Note down the size — you'll compare it later.

```docker build -t java-single-stage .```

<img width="1900" height="563" alt="image" src="https://github.com/user-attachments/assets/6c65ec0c-4fac-4462-bcec-a04a8240c059" />

`java-app/Dockerfile`

---

##### Task 2: Multi-Stage Build
1. Rewrite the Dockerfile using **multi-stage build**:
   - Stage 1: Build the app (install dependencies, compile)
   - Stage 2: Copy only the built artifact into a minimal base image (`alpine`, `distroless`, or `scratch`)

2. Build the image and check its size again

3. Compare the two sizes

- First image size is 638 MB
- Multi-stage image size is 256 MB

`java-app/Dockerfile.multistage`

```docker build -f Dockerfile.multistage -t java-multi-stage:v1 .```

<img width="1612" height="783" alt="image" src="https://github.com/user-attachments/assets/c2802928-e76c-4021-9952-ea00799439bd" />

Write in your notes: Why is the multi-stage image so much smaller?

- Multi-stage builds smaller images because they separate “build” from “runtime”, copying only what’s necessary into the final image.

---

##### Task 3: Push to Docker Hub
1. Create a free account on  (if you don't have one)
2. Log in from your terminal
3. Tag your image properly: `yourusername/image-name:tag`
4. Push it to Docker Hub
5. Pull it on a different machine (or after removing locally) to verify




---

##### Task 4: Docker Hub Repository
1. Go to Docker Hub and check your pushed image
2. Add a **description** to the repository
3. Explore the **tags** tab — understand how versioning works
4. Pull a specific tag vs `latest` — what happens?

- Specific tag (e.g., 1.0) = pulls that exact version of the image.
- latest = pulls whatever image is currently marked latest, which can change.



---

##### Task 5: Image Best Practices
Apply these to one of your images and rebuild:
1. Use a **minimal base image** (alpine vs ubuntu — compare sizes)
2. **Don't run as root** — add a non-root USER in your Dockerfile
3. Combine `RUN` commands to **reduce layers**
4. Use **specific tags** for base images (not `latest`)






---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write an image security checklist. | You can demonstrate, without notes: *scan images for vulnerabilities and misconfigurations* — with evidence committed to `day-35/`. |
| 2 | Search the SBOM for a package using `jq`. | You can demonstrate, without notes: *generate an SBOM* — with evidence committed to `day-35/`. |
| 3 | Document your exception process for unfixable CVEs. | You can demonstrate, without notes: *apply runtime hardening flags* — with evidence committed to `day-35/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Hundreds of findings | Prioritise reachable HIGH/CRITICAL with fixes; update base image first. |
| App fails read-only | Mount `tmpfs`/volume for writable paths. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Shift-left: scan in CI, not only in prod. Sign images and verify signatures at deploy time. Keep an SBOM per release.
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

1. What is an SBOM?
2. Why non-root?
3. What does cap-drop do?
4. How do you handle CVEs without fixes?
5. **Scenario:** A new CVE (log4shell-style) hits. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I scan and fix an image? | ☐ | ☐ | ☐ | ☐ |
| Can I generate an SBOM? | ☐ | ☐ | ☐ | ☐ |
| Can I run a hardened container? | ☐ | ☐ | ☐ | ☐ |
| Scan images for vulnerabilities and misconfigurations | ☐ | ☐ | ☐ | ☐ |
| Generate an SBOM | ☐ | ☐ | ☐ | ☐ |
| Apply runtime hardening flags | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-35/` in your own repository:

```text
day-35/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-35
git add day-35/
git commit -m "day-35: container security"
git push -u origin day-35
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Docker security checklist, SBOM, Trivy report.

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

## 18. Challenge Notes — Day 35: Jenkinsfile and Declarative Pipelines

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 35** of the DevOps 90-Day Challenge!
Yesterday, you built a **CI/CD pipeline for Dockerized apps**.
Today, you’ll learn to write **Jenkinsfiles** using **Declarative Pipelines**, making your automation reusable and version-controlled.

[![](https://img.youtube.com/vi/dz6fwJuwdZQ/0.jpg)](https://www.youtube.com/watch?v=dz6fwJuwdZQ)

[Watch the video](https://www.youtube.com/watch?v=dz6fwJuwdZQ)

---

#### Objective

By the end of this session, you will:

* Understand the structure of a **Declarative Pipeline**.
* Create a **Jenkinsfile** inside your repository.
* Automate builds and deployments using **Pipeline as Code**.

---

#### Tools Used

* **Jenkins** (Pipeline plugin)
* **GitHub** (to store Jenkinsfile with source code)
* **Docker Hub** (for image push)

---

#### Project Structure

```bash
dockerized-app/
 ├── Jenkinsfile
 ├── Dockerfile
 ├── app.py
 └── requirements.txt
```

---

#### Step-by-Step Guide

##### 1. Create Jenkinsfile

Add this file in the **root** of your repo:

```groovy
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/dockerized-app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/<username>/dockerized-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                      echo "$PASS" | docker login -u "$USER" --password-stdin
                      docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker rm -f myapp || true
                  docker run -d -p 5000:5000 --name myapp $DOCKER_IMAGE:$BUILD_NUMBER
                '''
            }
        }
    }

    post {
        success {
            echo "Build and deployment successful!"
        }
        failure {
            echo "Build failed. Check logs."
        }
    }
}
```

---

##### 2. Configure Jenkins Job

* Go to **Jenkins → New Item → Pipeline**
* Select **Pipeline script from SCM**
* Choose **Git** and paste repo URL
* Jenkins will automatically read **Jenkinsfile** from repo

---

##### 3. Test the Jenkinsfile

* Commit & push Jenkinsfile to GitHub
* Run the job → Jenkins will:
  Clone repo → Build Docker image → Push to Docker Hub → Deploy container

---

#### Verification

* Jenkins console logs show pipeline execution.
* New Docker image is pushed to **Docker Hub**.
* App is accessible on `http://<EC2_PUBLIC_IP>:5000`.

---

#### Bonus (Advanced Jenkinsfile Features)

* Add **parallel stages** (e.g., test + linting at same time).
* Use **when conditions** for environment-specific deployments.
* Add **post actions** for Slack/email notifications.

---

#### Key Concepts Applied

| Concept            | Example Used                         |
| ------------------ | ------------------------------------ |
| Pipeline as Code   | Jenkinsfile in GitHub repo           |
| Declarative Syntax | Structured stages and steps          |
| Automation         | Build → Push → Deploy flow automated |

---

#### Congratulations!

You have now moved from **manual pipelines** to **Pipeline as Code** with Jenkinsfiles

This is a **huge milestone** in becoming a DevOps engineer!

---

#### Try These Next

* Add **unit tests** as a pipeline stage.
* Run multiple environments (**dev/staging/prod**) with `when` conditions.
* Store pipeline in a **shared library** for reuse.

## 19. Cohort Practice — Day 35: Multi-Stage Builds & Docker Hub

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **build optimized images and share them with the world**.

Multi-stage builds are how real teams ship small, secure images. Docker Hub is how you distribute them. Both are interview favourites.

-------------

#### Expected Output

- A markdown file: `day-35-multistage-hub.md`
- Dockerfiles demonstrating multi-stage builds
- An image pushed to your Docker Hub account

---

#### Challenge Tasks

##### Task 1: The Problem with Large Images
1. Write a simple Go, Java, or Node.js app (even a "Hello World" is fine)
2. Create a Dockerfile that builds and runs it in a **single stage**
3. Build the image and check its **size**

Note down the size — you'll compare it later.

---

##### Task 2: Multi-Stage Build
1. Rewrite the Dockerfile using **multi-stage build**:
   - Stage 1: Build the app (install dependencies, compile)
   - Stage 2: Copy only the built artifact into a minimal base image (`alpine`, `distroless`, or `scratch`)
2. Build the image and check its size again
3. Compare the two sizes

Write in your notes: Why is the multi-stage image so much smaller?

---

##### Task 3: Push to Docker Hub
1. Create a free account on [Docker Hub](https://hub.docker.com) (if you don't have one)
2. Log in from your terminal
3. Tag your image properly: `yourusername/image-name:tag`
4. Push it to Docker Hub
5. Pull it on a different machine (or after removing locally) to verify

---

##### Task 4: Docker Hub Repository
1. Go to Docker Hub and check your pushed image
2. Add a **description** to the repository
3. Explore the **tags** tab — understand how versioning works
4. Pull a specific tag vs `latest` — what happens?

---

##### Task 5: Image Best Practices
Apply these to one of your images and rebuild:
1. Use a **minimal base image** (alpine vs ubuntu — compare sizes)
2. **Don't run as root** — add a non-root USER in your Dockerfile
3. Combine `RUN` commands to **reduce layers**
4. Use **specific tags** for base images (not `latest`)

Check the size before and after.

---

#### Hints
- Multi-stage: use `FROM ... AS builder` then `COPY --from=builder`
- Login: `docker login`
- Tag: `docker tag local-image:tag username/repo:tag`
- Push: `docker push username/repo:tag`
- Non-root user: `RUN adduser` + `USER`

---

#### Submission
1. Add your Dockerfiles and `day-35-multistage-hub.md` to `2026/day-35/`
2. Include the link to your Docker Hub repo
3. Commit and push to your fork

---


#### Learn in Public
Share your before/after image sizes on LinkedIn — the difference is always impressive.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 35: Terraform Pipeline

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Focus: Jenkins pipeline to fmt/validate, scan (tfsec/checkov), plan, approve, apply/destroy.

### Files

- [Jenkinsfile](files/hands-on-projects/Jenkinsfile)
- [scripts/tf_apply.sh](files/hands-on-projects/scripts/tf_apply.sh)
- [scripts/tf_destroy.sh](files/hands-on-projects/scripts/tf_destroy.sh)
- [scripts/tf_init.sh](files/hands-on-projects/scripts/tf_init.sh)
- [scripts/tf_plan.sh](files/hands-on-projects/scripts/tf_plan.sh)
- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)
- [terraform/versions.tf](files/hands-on-projects/terraform/versions.tf)


---

[← Day 34](../day-34/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 36 →](../day-36/README.md)
