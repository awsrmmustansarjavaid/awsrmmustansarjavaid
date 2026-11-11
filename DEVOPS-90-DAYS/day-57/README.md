# Day 57 — Infrastructure as Code & Terraform: First Resources

[← Day 56](../day-56/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 58 →](../day-58/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 9 — Terraform & Capstone 2 (start) |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain declarative IaC and Terraform workflow
- [ ] Install Terraform and configure AWS provider
- [ ] Create, change and destroy a resource

## 2. Prerequisites

- Days 50-52 (AWS setup), CLI skills.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why IaC

Repeatable, reviewable, testable infrastructure; eliminates snowflake servers and drift. Terraform (and OpenTofu) is cloud-agnostic and declarative.

### 3.2 Workflow

`init` (providers/modules) -> `fmt` -> `validate` -> `plan` (diff) -> `apply` -> `destroy`. Plan is your safety net - read it.

### 3.3 HCL basics

Blocks: `terraform`, `provider`, `resource`, `variable`, `output`, `data`, `locals`. Resources have type, name, arguments and attributes.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Terraform (or OpenTofu) and `tflint`.
2. [ ] Create `main.tf` with AWS provider and an S3 bucket (with tags).
3. [ ] Run init/plan/apply; inspect state with `terraform show`.
4. [ ] Change a tag; read the plan diff; apply.
5. [ ] Destroy and confirm removal.

## 5. Real-World Scenario

> Manual console clicks created inconsistent environments. Show how the same code creates identical dev and test setups.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
terraform version
terraform init
terraform fmt -check && terraform validate
terraform plan -out tfplan
terraform apply tfplan
terraform show; terraform state list
terraform destroy
# main.tf
terraform { required_version = ">= 1.9" required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } } }
provider "aws" { region = "us-east-1" }
resource "aws_s3_bucket" "demo" { bucket = "devops90-${random_id.s.hex}" tags = { Env = "lab" } }
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 57 – Resource Requests, Limits, and Probes — Challenge Brief

#### Task
Your Pods are running, but Kubernetes has no idea how much CPU or memory they need — and no way to tell if they are actually healthy. Today you set resource requests and limits for smart scheduling, then add probes so Kubernetes can detect and recover from failures automatically.

---

#### Expected Output
- A Pod with CPU and memory requests and limits
- OOMKilled observed when exceeding memory limits
- Liveness, readiness, and startup probes tested
- A markdown file: `day-57-resources-probes.md`

---

#### Challenge Tasks

##### Task 1: Resource Requests and Limits
1. Write a Pod manifest with `resources.requests` (cpu: 100m, memory: 128Mi) and `resources.limits` (cpu: 250m, memory: 256Mi)
2. Apply and inspect with `kubectl describe pod` — look for the Requests, Limits, and QoS Class sections
3. Since requests and limits differ, the QoS class is `Burstable`. If equal, it would be `Guaranteed`. If missing, `BestEffort`.

CPU is in millicores: `100m` = 0.1 CPU. Memory is in mebibytes: `128Mi`.

**Requests** = guaranteed minimum (scheduler uses this for placement). **Limits** = maximum allowed (kubelet enforces at runtime).

**Verify:** What QoS class does your Pod have?

---

##### Task 2: OOMKilled — Exceeding Memory Limits
1. Write a Pod manifest using the `polinux/stress` image with a memory limit of `100Mi`
2. Set the stress command to allocate 200M of memory: `command: ["stress"] args: ["--vm", "1", "--vm-bytes", "200M", "--vm-hang", "1"]`
3. Apply and watch — the container gets killed immediately

CPU is throttled when over limit. Memory is killed — no mercy.

Check `kubectl describe pod` for `Reason: OOMKilled` and `Exit Code: 137` (128 + SIGKILL).

**Verify:** What exit code does an OOMKilled container have?

---

##### Task 3: Pending Pod — Requesting Too Much
1. Write a Pod manifest requesting `cpu: 100` and `memory: 128Gi`
2. Apply and check — STATUS stays `Pending` forever
3. Run `kubectl describe pod` and read the Events — the scheduler says exactly why: insufficient resources

**Verify:** What event message does the scheduler produce?

---

##### Task 4: Liveness Probe
A liveness probe detects stuck containers. If it fails, Kubernetes restarts the container.

1. Write a Pod manifest with a busybox container that creates `/tmp/healthy` on startup, then deletes it after 30 seconds
2. Add a liveness probe using `exec` that runs `cat /tmp/healthy`, with `periodSeconds: 5` and `failureThreshold: 3`
3. After the file is deleted, 3 consecutive failures trigger a restart. Watch with `kubectl get pod -w`

**Verify:** How many times has the container restarted?

---

##### Task 5: Readiness Probe
A readiness probe controls traffic. Failure removes the Pod from Service endpoints but does NOT restart it.

1. Write a Pod manifest with nginx and a `readinessProbe` using `httpGet` on path `/` port `80`
2. Expose it as a Service: `kubectl expose pod <name> --port=80 --name=readiness-svc`
3. Check `kubectl get endpoints readiness-svc` — the Pod IP is listed
4. Break the probe: `kubectl exec <pod> -- rm /usr/share/nginx/html/index.html`
5. Wait 15 seconds — Pod shows `0/1` READY, endpoints are empty, but the container is NOT restarted

**Verify:** When readiness failed, was the container restarted?

---

##### Task 6: Startup Probe
A startup probe gives slow-starting containers extra time. While it runs, liveness and readiness probes are disabled.

1. Write a Pod manifest where the container takes 20 seconds to start (e.g., `sleep 20 && touch /tmp/started`)
2. Add a `startupProbe` checking for `/tmp/started` with `periodSeconds: 5` and `failureThreshold: 12` (60 second budget)
3. Add a `livenessProbe` that checks the same file — it only kicks in after startup succeeds

**Verify:** What would happen if `failureThreshold` were 2 instead of 12?

---

##### Task 7: Clean Up
Delete all pods and services you created.

---

#### Hints
- CPU is compressible (throttled); memory is incompressible (OOMKilled)
- CPU: `1` = 1 core = `1000m`. Memory: `Mi` (mebibytes), `Gi` (gibibytes)
- QoS: Guaranteed (requests == limits), Burstable (requests < limits), BestEffort (none set)
- Probe types: `httpGet`, `exec`, `tcpSocket`
- Liveness failure = restart. Readiness failure = remove from endpoints. Startup failure = kill.
- `initialDelaySeconds`, `periodSeconds`, `failureThreshold` control probe timing
- Exit code 137 = OOMKilled (128 + SIGKILL)

---

#### Documentation
Create `day-57-resources-probes.md` with:
- Requests vs limits (scheduling vs enforcement)
- What happens when CPU or memory limits are exceeded
- Liveness vs readiness vs startup probes
- Screenshots of OOMKilled, Pending, and probe events

---

#### Submission
1. Add `day-57-resources-probes.md` to `2026/day-57/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Set resource requests and limits in Kubernetes today, watched a pod get OOMKilled, and added liveness, readiness, and startup probes for self-healing."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 57 – Resource Requests, Limits, and Probes — Notes & Solution

#### Task
Your Pods are running, but Kubernetes has no idea how much CPU or memory they need — and no way to tell if they are actually healthy. Today you set resource requests and limits for smart scheduling, then add probes so Kubernetes can detect and recover from failures automatically.

---

#### Challenge Tasks

##### Task 1: Resource Requests and Limits
1. Write a Pod manifest with `resources.requests` (cpu: 100m, memory: 128Mi) and `resources.limits` (cpu: 250m, memory: 256Mi)
2. Apply and inspect with `kubectl describe pod` — look for the Requests, Limits, and QoS Class sections
3. Since requests and limits differ, the QoS class is `Burstable`. If equal, it would be `Guaranteed`. If missing, `BestEffort`.

CPU is in millicores: `100m` = 0.1 CPU. Memory is in mebibytes: `128Mi`.

**Requests** = guaranteed minimum (scheduler uses this for placement). **Limits** = maximum allowed (kubelet enforces at runtime).

**Verify:** What QoS class does your Pod have?

- Pod have Qos Class Burstable
<img width="1501" height="678" alt="Screenshot 2026-10-10 210319" src="https://github.com/user-attachments/assets/f92eb339-4bc9-4204-a7ee-4184333b47f4" />


---

##### Task 2: OOMKilled — Exceeding Memory Limits
1. Write a Pod manifest using the `polinux/stress` image with a memory limit of `100Mi`
2. Set the stress command to allocate 200M of memory: `command: ["stress"] args: ["--vm", "1", "--vm-bytes", "200M", "--vm-hang", "1"]`
3. Apply and watch — the container gets killed immediately

CPU is throttled when over limit. Memory is killed — no mercy.

Check `kubectl describe pod` for `Reason: OOMKilled` and `Exit Code: 137` (128 + SIGKILL).

**Verify:** What exit code does an OOMKilled container have?

- An OOMKilled container exits with code 137

<img width="1113" height="501" alt="Screenshot 2026-10-10 210540" src="https://github.com/user-attachments/assets/c60001c0-0b56-409f-b440-49fc0272d811" />


---

##### Task 3: Pending Pod — Requesting Too Much
1. Write a Pod manifest requesting `cpu: 100` and `memory: 128Gi`
2. Apply and check — STATUS stays `Pending` forever
3. Run `kubectl describe pod` and read the Events — the scheduler says exactly why: insufficient resources

**Verify:** What event message does the scheduler produce?

- 0/3 nodes are available: Insufficient cpu, Insufficient memory
  
<img width="1145" height="671" alt="Screenshot 2026-10-10 210712" src="https://github.com/user-attachments/assets/258a4326-528c-48a0-a23d-1c3da94c8b19" />
<img width="1891" height="766" alt="Screenshot 2026-10-10 210759" src="https://github.com/user-attachments/assets/f75909f5-6951-4cbe-8d58-2bb7db942479" />

---

##### Task 4: Liveness Probe
A liveness probe detects stuck containers. If it fails, Kubernetes restarts the container.

1. Write a Pod manifest with a busybox container that creates `/tmp/healthy` on startup, then deletes it after 30 seconds
2. Add a liveness probe using `exec` that runs `cat /tmp/healthy`, with `periodSeconds: 5` and `failureThreshold: 3`
3. After the file is deleted, 3 consecutive failures trigger a restart. Watch with `kubectl get pod -w`

**Verify:** How many times has the container restarted?

- 4 times container restarted
  

<img width="1201" height="683" alt="Screenshot 2026-10-10 211005" src="https://github.com/user-attachments/assets/a380edf1-568c-4273-9650-7152a3de47d3" />


---

##### Task 5: Readiness Probe
A readiness probe controls traffic. Failure removes the Pod from Service endpoints but does NOT restart it.

1. Write a Pod manifest with nginx and a `readinessProbe` using `httpGet` on path `/` port `80`
2. Expose it as a Service: `kubectl expose pod <name> --port=80 --name=readiness-svc`
3. Check `kubectl get endpoints readiness-svc` — the Pod IP is listed
4. Break the probe: `kubectl exec <pod> -- rm /usr/share/nginx/html/index.html`
5. Wait 15 seconds — Pod shows `0/1` READY, endpoints are empty, but the container is NOT restarted

**Verify:** When readiness failed, was the container restarted?

- No, the container was NOT restarted.

<img width="1619" height="681" alt="Screenshot 2026-10-10 211610" src="https://github.com/user-attachments/assets/e953de7a-cc24-4bb0-8614-98537769ca04" />


---

##### Task 6: Startup Probe
A startup probe gives slow-starting containers extra time. While it runs, liveness and readiness probes are disabled.

1. Write a Pod manifest where the container takes 20 seconds to start (e.g., `sleep 20 && touch /tmp/started`)
2. Add a `startupProbe` checking for `/tmp/started` with `periodSeconds: 5` and `failureThreshold: 12` (60 second budget)
3. Add a `livenessProbe` that checks the same file — it only kicks in after startup succeeds

**Verify:** What would happen if `failureThreshold` were 2 instead of 12?


- If `failureThreshold` is set to `2`,the startup probe allows only 10 seconds (2 × 5s) for the container to start.
- Since the container takes 20 seconds to start, the startupProbe will fail before the app is ready,causing Kubernetes to restart the container repeatedly.

<img width="943" height="201" alt="Screenshot 2026-10-10 211801" src="https://github.com/user-attachments/assets/bbc0a43c-f6b6-4812-942c-a77fad57a291" />


`0/1 READY`: app still starting (startupProbe running)

`1/1 READY`: startup complete, livenessProbe active
  
---

##### Task 7: Clean Up
Delete all pods and services you created.

<img width="1087" height="608" alt="Screenshot 2026-10-10 212028" src="https://github.com/user-attachments/assets/91e4a1d6-4ba7-48a6-889b-4405df57a708" />


---

**Requests vs limits (scheduling vs enforcement)**

`Requests`
 - Used by Kubernetes scheduler to decide where to place the Pod
 - Guarantees minimum resources

`Limits`
 - Enforced by container runtime
 - Prevents container from using more than defined resources

**What happens when CPU or memory limits are exceeded**

`CPU limit exceeded`
- Container is throttled (slowed down, not killed)

`Memory limit exceeded`
- Container is killed (OOMKilled) and restarted

**Liveness vs readiness vs startup probes**

| Probe Type          | Purpose                        | When it Runs           | If it Fails                       | Simple Meaning            |
| ------------------- | ------------------------------ | ---------------------- | --------------------------------- | ------------------------- |
| **Startup Probe**   | Check if app has started       | At container startup   | Container is restarted            | “Has app started?”        |
| **Liveness Probe**  | Check if app is still alive    | After startup succeeds | Container is restarted            | “Is app alive?”           |
| **Readiness Probe** | Check if app can serve traffic | Throughout lifecycle   | Removed from service (no traffic) | “Is app ready for users?” |

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `.gitignore` for `.terraform/`, `*.tfstate`, `*.tfvars` secrets. | You can demonstrate, without notes: *explain declarative IaC and Terraform workflow* — with evidence committed to `day-57/`. |
| 2 | Explain declarative vs imperative. | You can demonstrate, without notes: *install Terraform and configure AWS provider* — with evidence committed to `day-57/`. |
| 3 | Write IaC benefits and risks note. | You can demonstrate, without notes: *create, change and destroy a resource* — with evidence committed to `day-57/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Provider auth errors | Check AWS_PROFILE/region/credentials. |
| Name already exists | S3 names are global; add random suffix. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never commit state or credentials; use remote state with encryption (Day 60); review plans for destructive changes.
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

1. What is declarative IaC?
2. What does `terraform plan` do?
3. What is state?
4. Terraform vs CloudFormation?
5. **Scenario:** Manual console clicks created inconsistent environments. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I run the full workflow? | ☐ | ☐ | ☐ | ☐ |
| Can I read a plan? | ☐ | ☐ | ☐ | ☐ |
| Can I destroy safely? | ☐ | ☐ | ☐ | ☐ |
| Explain declarative IaC and Terraform workflow | ☐ | ☐ | ☐ | ☐ |
| Install Terraform and configure AWS provider | ☐ | ☐ | ☐ | ☐ |
| Create, change and destroy a resource | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-57/` in your own repository:

```text
day-57/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-57
git add day-57/
git commit -m "day-57: infrastructure as code & terraform"
git push -u origin day-57
gh pr create --fill   # review your own PR, then merge
```

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

[← Day 56](../day-56/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 58 →](../day-58/README.md)
