# Day 89 — Capstone 3 (Part 3/3): Resilience Drills, Cost Review & Documentation

[← Day 88](../day-88/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 90 →](../day-90/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced (Capstone) |
| **Estimated time** | 5.5 hours |
| **Project** | Capstone 3 (portfolio deliverable) |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Prove resilience through failure drills
- [ ] Review cost and security posture
- [ ] Finish portfolio-grade documentation

## 2. Prerequisites

- Days 87-88.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Game day

Run drills: kill pods/node, break a deployment, expire a certificate, restore namespace from Velero, simulate secret leak rotation. Measure detection and recovery times against SLOs.

### 3.2 Reviews

Security (kube-bench/kubescape/Trivy), cost (OpenCost), reliability (SLO report), documentation completeness.

### 3.3 Documentation set

README, architecture, ADRs, runbooks, postmortem of the game day, SLO doc, cost report, demo recording, teardown guide.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run a 90-minute game day with 4 scenarios and a timeline log.
2. [ ] Run kubescape/kube-bench and remediate top findings.
3. [ ] Generate cost report and list 5 savings.
4. [ ] Write postmortem for the most interesting failure.
5. [ ] Tag `v1.0.0`; record demo; tear down expensive resources.

## 5. Real-World Scenario

> The VP of Engineering asks you to demonstrate that the platform can survive failures and give a cost estimate per environment.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl delete pod -n prod -l app=api
kubectl drain $(kubectl get nodes -o name | head -1 | cut -d/ -f2) --ignore-daemonsets --delete-emptydir-data
velero restore create --from-backup nightly
kubescape scan framework nsa --verbose
git tag -a v1.0.0 -m "Capstone 3 complete" && git push --tags
terraform -chdir=infra/envs/dev destroy
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 89 -- Production AI Agents: KubeHealer and AIOps

#### Task
You have built agents that diagnose problems. Today you build one that fixes them -- autonomously. KubeHealer is a production-grade AI agent that scans your Kubernetes cluster for broken pods, diagnoses the root cause using Claude, proposes fixes, and applies them with your approval. It uses Temporal for durable execution -- meaning if the agent crashes mid-repair, it picks up exactly where it left off.

This is AIOps -- AI-powered operations. Not a chatbot. A system that watches, reasons, and acts.

Reference: https://github.com/TrainWithShubham/agentic-ai-for-devops -- modules 4, 5
KubeHealer repo: https://github.com/TrainWithShubham/kubehealer

---

#### Expected Output
- Understanding of AIOps principles and production guardrails
- KubeHealer running with Temporal + Claude
- Multiple broken apps deployed, diagnosed, and fixed by the agent
- Crash recovery demonstrated -- agent resumes after being killed
- Understanding of when to use AI agents vs traditional automation
- A markdown file: `day-89-kubehealer-aiops.md`

---

#### Challenge Tasks

##### Task 1: Understand AIOps and Production Guardrails (Module 4)
Before building production agents, understand the rules:

1. **What is AIOps?**
   - Using AI to automate IT operations: monitoring, diagnosis, remediation
   - Not replacing humans -- augmenting them with intelligent automation
   - The agent handles routine issues (image typos, resource limits) while escalating complex ones

2. **Production guardrails every AI agent needs:**

| Guardrail | Why | Example |
|-----------|-----|---------|
| **Human approval** | Agents should not make destructive changes without permission | "I found 3 broken pods. Here are the fixes. Approve?" |
| **Scope limits** | Agents should only operate in allowed namespaces/clusters | Cannot touch `kube-system` or production databases |
| **Audit trail** | Every action must be recorded | Temporal workflow history: every tool call, every decision |
| **Rollback capability** | Every fix must be reversible | Agent creates patches, not replacements |
| **Timeout and retry limits** | Agents must not loop forever | Max 3 retries per pod, timeout after 5 minutes |
| **Escalation path** | When the agent cannot fix it, alert a human | "config-app needs a ConfigMap I cannot create. Escalating." |

3. **Why durable execution (Temporal) matters:**
   - Without durability: if the agent crashes mid-diagnosis, you lose all progress and state
   - With Temporal: every step is recorded. If the worker crashes and restarts, Temporal replays completed steps from history and resumes
   - This is critical for agents that modify infrastructure -- you cannot afford partial fixes

4. **When to use AI agents vs traditional automation:**

| Use AI Agents When | Use Traditional Automation When |
|--------------------|---------------------------------|
| Problem requires reasoning (diagnose unknown errors) | Problem has a known, fixed solution |
| Multiple possible causes and fixes | One cause, one fix (if X then Y) |
| Natural language output helps humans | No human in the loop |
| Examples: troubleshooting, root cause analysis | Examples: scaling, restarts, deploys |

---

##### Task 2: Set Up KubeHealer
KubeHealer lives in a separate repository. Clone it:

```bash
git clone https://github.com/TrainWithShubham/kubehealer.git
cd kubehealer
```

**Prerequisites:**
- Docker (for Temporal)
- Kind (for Kubernetes cluster)
- Python 3.10+
- An Anthropic API key (Claude Sonnet 4 -- sign up at https://console.anthropic.com)

**Start the infrastructure:**

1. Create a Kind cluster:
```bash
kind create cluster --name kubehealer-demo
```

2. Start Temporal (durable execution engine):
```bash
temporal server start-dev
```

This runs Temporal locally. The UI is available at `http://localhost:8233`.

3. Set up the Python environment:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

4. Set your Anthropic API key:
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

---

##### Task 3: Deploy Broken Applications
KubeHealer needs something to fix. Deploy three intentionally broken applications:

**App 1 -- Image typo (fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: web-app
  namespace: default
spec:
  containers:
  - name: web
    image: ngnix:latest
    ports:
    - containerPort: 80
EOF
```

The image is `ngnix` (typo) instead of `nginx`. This causes `ImagePullBackOff`.

**App 2 -- OOM crash (fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: memory-app
  namespace: default
spec:
  containers:
  - name: app
    image: nginx:alpine
    resources:
      limits:
        memory: "1Mi"
    command: ["sh", "-c", "echo 'starting' && sleep 3600"]
EOF
```

The memory limit is 1Mi -- far too low. This causes an OOMKilled crash.

**App 3 -- Missing ConfigMap (NOT fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: config-app
  namespace: default
spec:
  containers:
  - name: app
    image: nginx:alpine
    envFrom:
    - configMapRef:
        name: app-config
EOF
```

This references a ConfigMap that does not exist. The agent can diagnose this but should escalate it -- creating arbitrary ConfigMaps requires human decision.

Check all three are broken:
```bash
kubectl get pods
```

```
NAME         READY   STATUS              RESTARTS
web-app      0/1     ImagePullBackOff    0
memory-app   0/1     CrashLoopBackOff    3
config-app   0/1     CreateContainerConfigError   0
```

---

##### Task 4: Run KubeHealer
Start the Temporal worker (the agent):
```bash
python3 worker.py
```

In another terminal, trigger a healing run:
```bash
python3 starter.py
```

**Watch the agent work.** It will:

1. **Scan** -- list all pods, identify broken ones
2. **Diagnose** -- for each broken pod, call `kubectl describe`, read events, send to Claude
3. **Propose fixes:**
   - `web-app`: "Image typo. Fix: change `ngnix:latest` to `nginx:latest`"
   - `memory-app`: "OOMKilled. Fix: increase memory limit to 128Mi"
   - `config-app`: "Missing ConfigMap `app-config`. Cannot fix automatically -- requires manual ConfigMap creation"
4. **Ask for approval** -- presents all fixes and waits for human input

In the terminal, you will see:
```
Found 3 broken pods.

Proposed fixes:
1. web-app: Fix image typo (ngnix -> nginx)
2. memory-app: Increase memory limit (1Mi -> 128Mi)
3. config-app: CANNOT FIX - needs manual ConfigMap creation

Approve all fixes? [yes/no]:
```

Type `yes`. The agent:
- Patches `web-app` with the correct image
- Patches `memory-app` with increased memory
- Skips `config-app` and reports it needs human attention

Verify:
```bash
kubectl get pods
```

`web-app` and `memory-app` should now be Running. `config-app` still broken (as expected).

---

##### Task 5: Test Crash Recovery (Temporal Durability)
This is the production-grade feature. Temporal makes the agent crash-resistant.

**Redeploy the broken apps:**
```bash
kubectl delete pod web-app memory-app config-app
# Re-apply the broken manifests from Task 3
```

Start the worker and trigger a healing run:
```bash
python3 worker.py &
python3 starter.py
```

**While the agent is diagnosing (before it asks for approval), kill the worker:**
```bash
# Press Ctrl+C or kill the worker process
kill %1
```

The agent is dead mid-diagnosis. Without Temporal, all progress is lost. With Temporal:

**Restart the worker:**
```bash
python3 worker.py
```

Watch what happens. Temporal replays the completed activities (scan, diagnose) from its event history and resumes the workflow exactly where it was interrupted. The agent continues with the approval prompt as if nothing happened.

**View the workflow in the Temporal UI:**
Open `http://localhost:8233` and click on the running workflow. You will see:
- Every activity execution (scan, diagnose, fix)
- Input and output of each step
- The crash and recovery point
- Total execution timeline

This is the audit trail. Every Claude call, every kubectl command, every fix -- all recorded automatically.

---

##### Task 6: Reflect on the Agentic AI Journey
Map the 3-day progression:

| Day | Module | What You Built | Pattern |
|-----|--------|---------------|---------|
| 87 | 0-2 | Docker Error Explainer + Docker Agent | Basic LLM -> ReAct Agent |
| 88 | 3, 6 | Multi-tool Agent + MCP Server + CI/CD Analyzer | Multi-domain tools, MCP protocol |
| 89 | 4-5 | KubeHealer -- production self-healing agent | Temporal durability, human approval, guardrails |

**The evolution:**
```
Day 87: LLM explains errors (passive)
   |
Day 88: Agent diagnoses across Docker/K8s/CI (autonomous investigation)
   |
Day 89: Agent diagnoses AND fixes with approval (autonomous action)
```

**Key principles for production AI agents:**
1. **Tools are just CLI wrappers** -- any command you run can become a tool
2. **The ReAct pattern is universal** -- works for any domain
3. **MCP standardizes tool access** -- write once, use everywhere
4. **Guardrails are not optional** -- approval, scope limits, audit trails
5. **Durability matters** -- Temporal prevents lost state during infrastructure changes
6. **Know when NOT to use AI** -- simple if/then automation is better for known problems

**Where this connects to the rest of the challenge:**

| Day | Connection to Agentic AI |
|-----|-------------------------|
| 29-37 (Docker) | Docker tools in Module 2 wrap the same commands you learned |
| 40-49 (GitHub Actions) | CI/CD Analyzer in Module 6 diagnoses the pipelines you built |
| 50-67 (Kubernetes) | Kubernetes tools in Module 3 and KubeHealer use kubectl |
| 73-77 (Observability) | Agents could query Prometheus/Loki for metric-based diagnosis |
| 84-86 (ArgoCD) | An agent could trigger ArgoCD syncs or rollbacks |

**Clean up:**
```bash
kind delete cluster --name kubehealer-demo
# Stop Temporal (Ctrl+C the server)
deactivate
```

---

#### Hints
- KubeHealer uses Claude Sonnet 4, not Ollama/Gemma -- production agents need stronger reasoning for safe infrastructure changes
- The Anthropic API key is required for KubeHealer. Free tier gives you enough credits for this lab
- Temporal runs locally via `temporal server start-dev` -- no Docker setup needed for the dev server
- If Temporal UI does not load at `:8233`, check if the server is running and ports are free
- The agent patches pods using `kubectl patch` -- minimal, targeted changes rather than deleting and recreating
- `config-app` is intentionally unfixable to demonstrate that good agents know their limits
- The approval step is a Temporal signal -- the workflow pauses until a human responds. In production, this could be a Slack message or a PagerDuty approval
- Reference: https://github.com/TrainWithShubham/kubehealer

---

#### Documentation
Create `day-89-kubehealer-aiops.md` with:
- AIOps principles and the 6 production guardrails
- KubeHealer architecture: Temporal + Claude + kubectl
- The 3 broken apps and what the agent diagnosed for each
- Screenshot of the agent proposing fixes and asking for approval
- Screenshot of the Temporal UI showing the workflow execution
- How crash recovery works (kill worker, restart, resume)
- When to use AI agents vs traditional automation
- How agentic AI connects to every other topic in the 90-day challenge

---

#### Submission
1. Add `day-89-kubehealer-aiops.md` to `2026/day-89/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Built KubeHealer today -- a production-grade AI agent that scans Kubernetes for broken pods, diagnoses root causes using Claude, proposes fixes, and applies them with human approval. Deployed 3 intentionally broken apps: image typo, OOM crash, missing ConfigMap. The agent fixed the first two automatically and correctly escalated the third. Tested crash recovery with Temporal -- killed the agent mid-diagnosis, restarted it, and it resumed exactly where it left off. This is what AIOps looks like in 2026."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Publish game-day report. | You can demonstrate, without notes: *prove resilience through failure drills* — with evidence committed to `day-89/`. |
| 2 | Create final architecture diagram. | You can demonstrate, without notes: *review cost and security posture* — with evidence committed to `day-89/`. |
| 3 | Prepare a 10-minute walkthrough script. | You can demonstrate, without notes: *finish portfolio-grade documentation* — with evidence committed to `day-89/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Drill is chaotic | Define roles, hypothesis, abort criteria; keep a scribe. |
| Cost surprise | Check load balancers, NAT, volumes, snapshots after teardown. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Document exceptions and residual risks honestly; verify teardown removes public exposure and billable resources.
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

1. How do you prove resilience?
2. How do you present risks?
3. What did the drill reveal?
4. How do you hand over a platform?
5. **Scenario:** The VP of Engineering asks you to demonstrate that the platform can survive failures and give a cost estimate per environment. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Did I measure recovery times? | ☐ | ☐ | ☐ | ☐ |
| Is documentation complete? | ☐ | ☐ | ☐ | ☐ |
| Is everything torn down? | ☐ | ☐ | ☐ | ☐ |
| Prove resilience through failure drills | ☐ | ☐ | ☐ | ☐ |
| Review cost and security posture | ☐ | ☐ | ☐ | ☐ |
| Finish portfolio-grade documentation | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-89/` in your own repository:

```text
day-89/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-89
git add day-89/
git commit -m "day-89: capstone 3 (part 3/3)"
git push -u origin day-89
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Capstone 3 v1.0.0, game-day report, SLO/cost/security reviews.

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

## 18. Challenge Notes — Day 89: Portfolio and Resume Building

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 89** of the DevOps 90-Day Challenge!
You have the skills. Now you need to sell them. Today is about **Personal Branding**.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Structure a **DevOps Resume** that passes functionality (ATS) and human review.
* Build a **Portfolio Website** hosted on S3/Netlify.
* Write effective project descriptions (STAR Method).
* Optimize your **LinkedIn Profile**.

---

#### Tools Used

* **GitHub** (Your Codebase)
* **Canva / LaTeX** (Resume)
* **Hugo / Jekyll** (Portfolio Site)

---

#### Key Concepts

##### 1. The Resume
*   **Keywords**: Kubernetes, Terraform, AWS, CI/CD, Python. (Don't spam, but include them).
*   **Impact over Tasks**:
    *   *Bad*: "Managed EC2 instances."
    *   *Good*: "Reduced hosting costs by 30% by migrating to Spot Instances and implementing Auto Scaling."

##### 2. The Portfolio
Recruiters want to see code.
*   Pin your best 3 repositories (e.g., `90DaysDevopsChallenge`, `VPC-Terraform-Module`, `Serverless-ETL`).
*   Ensure every repo has a high-quality `README.md` with architecture diagrams.

##### 3. LinkedIn
*   Headline: "DevOps Engineer | AWS | Kubernetes | Terraform".
*   "Open to Work" status.
*   Post about your journey. "Just finished Day 89 of #90DaysOfDevOps..."

---

#### Key Concepts Applied

| Concept | Application |
| :--- | :--- |
| **Documentation** | Your GitHub repo is your documentation. If it's messy, they assume your work is messy. |
| **Show, Don't Tell** | Instead of saying "I know CI/CD", show a green build badge on your repo. |

---

#### Bonus (Extra Learning)

*   Mock Interview yourself. Record it. Watch the playback.
*   Contribute a small fix to an Open Source project (typo fix counts!).

---

#### Congratulations!

You are ready for the market. Start applying.

---

#### Try These Next

*   Apply to 5 jobs today.
*   Connect with 5 recruiters on LinkedIn.

## 19. Cohort Practice — Day 89: Production AI Agents: KubeHealer and AIOps

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
You have built agents that diagnose problems. Today you build one that fixes them -- autonomously. KubeHealer is a production-grade AI agent that scans your Kubernetes cluster for broken pods, diagnoses the root cause using Claude, proposes fixes, and applies them with your approval. It uses Temporal for durable execution -- meaning if the agent crashes mid-repair, it picks up exactly where it left off.

This is AIOps -- AI-powered operations. Not a chatbot. A system that watches, reasons, and acts.

Reference: https://github.com/TrainWithShubham/agentic-ai-for-devops -- modules 4, 5
KubeHealer repo: https://github.com/TrainWithShubham/kubehealer

---

#### Expected Output

- Understanding of AIOps principles and production guardrails
- KubeHealer running with Temporal + Claude
- Multiple broken apps deployed, diagnosed, and fixed by the agent
- Crash recovery demonstrated -- agent resumes after being killed
- Understanding of when to use AI agents vs traditional automation
- A markdown file: `day-89-kubehealer-aiops.md`

---------------

#### Challenge Tasks

##### Task 1: Understand AIOps and Production Guardrails (Module 4)
Before building production agents, understand the rules:


1. **What is AIOps?**
   - Using AI to automate IT operations: monitoring, diagnosis, remediation
   - Not replacing humans -- augmenting them with intelligent automation
   - The agent handles routine issues (image typos, resource limits) while escalating complex ones

2. **Production guardrails every AI agent needs:**

| Guardrail | Why | Example |
|-----------|-----|---------|
| **Human approval** | Agents should not make destructive changes without permission | "I found 3 broken pods. Here are the fixes. Approve?" |
| **Scope limits** | Agents should only operate in allowed namespaces/clusters | Cannot touch `kube-system` or production databases |
| **Audit trail** | Every action must be recorded | Temporal workflow history: every tool call, every decision |
| **Rollback capability** | Every fix must be reversible | Agent creates patches, not replacements |
| **Timeout and retry limits** | Agents must not loop forever | Max 3 retries per pod, timeout after 5 minutes |
| **Escalation path** | When the agent cannot fix it, alert a human | "config-app needs a ConfigMap I cannot create. Escalating." |

3. **Why durable execution (Temporal) matters:**
   - Without durability: if the agent crashes mid-diagnosis, you lose all progress and state
   - With Temporal: every step is recorded. If the worker crashes and restarts, Temporal replays completed steps from history and resumes
   - This is critical for agents that modify infrastructure -- you cannot afford partial fixes

4. **When to use AI agents vs traditional automation:**

| Use AI Agents When | Use Traditional Automation When |
|--------------------|---------------------------------|
| Problem requires reasoning (diagnose unknown errors) | Problem has a known, fixed solution |
| Multiple possible causes and fixes | One cause, one fix (if X then Y) |
| Natural language output helps humans | No human in the loop |
| Examples: troubleshooting, root cause analysis | Examples: scaling, restarts, deploys |

---

##### Task 2: Set Up KubeHealer
KubeHealer lives in a separate repository. Clone it:

```bash
git clone https://github.com/TrainWithShubham/kubehealer.git
cd kubehealer
```

**Prerequisites:**
- Docker (for Temporal)
- Kind (for Kubernetes cluster)
- Python 3.10+
- An Anthropic API key (Claude Sonnet 4 -- sign up at https://console.anthropic.com)

**Start the infrastructure:**

1. Create a Kind cluster:
```bash
kind create cluster --name kubehealer-demo
```

2. Start Temporal (durable execution engine):
```bash
temporal server start-dev
```

This runs Temporal locally. The UI is available at `http://localhost:8233`.

3. Set up the Python environment:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

4. Set your Anthropic API key:
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

---

##### Task 3: Deploy Broken Applications
KubeHealer needs something to fix. Deploy three intentionally broken applications:

**App 1 -- Image typo (fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: web-app
  namespace: default
spec:
  containers:
  - name: web
    image: ngnix:latest
    ports:
    - containerPort: 80
EOF
```

The image is `ngnix` (typo) instead of `nginx`. This causes `ImagePullBackOff`.

**App 2 -- OOM crash (fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: memory-app
  namespace: default
spec:
  containers:
  - name: app
    image: nginx:alpine
    resources:
      limits:
        memory: "1Mi"
    command: ["sh", "-c", "echo 'starting' && sleep 3600"]
EOF
```

The memory limit is 1Mi -- far too low. This causes an OOMKilled crash.

**App 3 -- Missing ConfigMap (NOT fixable by the agent):**
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: config-app
  namespace: default
spec:
  containers:
  - name: app
    image: nginx:alpine
    envFrom:
    - configMapRef:
        name: app-config
EOF
```

This references a ConfigMap that does not exist. The agent can diagnose this but should escalate it -- creating arbitrary ConfigMaps requires human decision.

Check all three are broken:
```bash
kubectl get pods
```

```
NAME         READY   STATUS              RESTARTS
web-app      0/1     ImagePullBackOff    0
memory-app   0/1     CrashLoopBackOff    3
config-app   0/1     CreateContainerConfigError   0
```

---

##### Task 4: Run KubeHealer
Start the Temporal worker (the agent):
```bash
python3 worker.py
```

In another terminal, trigger a healing run:
```bash
python3 starter.py
```

**Watch the agent work.** It will:

1. **Scan** -- list all pods, identify broken ones
2. **Diagnose** -- for each broken pod, call `kubectl describe`, read events, send to Claude
3. **Propose fixes:**
   - `web-app`: "Image typo. Fix: change `ngnix:latest` to `nginx:latest`"
   - `memory-app`: "OOMKilled. Fix: increase memory limit to 128Mi"
   - `config-app`: "Missing ConfigMap `app-config`. Cannot fix automatically -- requires manual ConfigMap creation"
4. **Ask for approval** -- presents all fixes and waits for human input

In the terminal, you will see:
```
Found 3 broken pods.

Proposed fixes:
1. web-app: Fix image typo (ngnix -> nginx)
2. memory-app: Increase memory limit (1Mi -> 128Mi)
3. config-app: CANNOT FIX - needs manual ConfigMap creation

Approve all fixes? [yes/no]:
```

Type `yes`. The agent:
- Patches `web-app` with the correct image
- Patches `memory-app` with increased memory
- Skips `config-app` and reports it needs human attention

Verify:
```bash
kubectl get pods
```

`web-app` and `memory-app` should now be Running. `config-app` still broken (as expected).

---

##### Task 5: Test Crash Recovery (Temporal Durability)
This is the production-grade feature. Temporal makes the agent crash-resistant.

**Redeploy the broken apps:**
```bash
kubectl delete pod web-app memory-app config-app
# Re-apply the broken manifests from Task 3
```

Start the worker and trigger a healing run:
```bash
python3 worker.py &
python3 starter.py
```

**While the agent is diagnosing (before it asks for approval), kill the worker:**
```bash
# Press Ctrl+C or kill the worker process
kill %1
```

The agent is dead mid-diagnosis. Without Temporal, all progress is lost. With Temporal:

**Restart the worker:**
```bash
python3 worker.py
```

Watch what happens. Temporal replays the completed activities (scan, diagnose) from its event history and resumes the workflow exactly where it was interrupted. The agent continues with the approval prompt as if nothing happened.

**View the workflow in the Temporal UI:**
Open `http://localhost:8233` and click on the running workflow. You will see:
- Every activity execution (scan, diagnose, fix)
- Input and output of each step
- The crash and recovery point
- Total execution timeline

This is the audit trail. Every Claude call, every kubectl command, every fix -- all recorded automatically.

---

##### Task 6: Reflect on the Agentic AI Journey
Map the 3-day progression:

| Day | Module | What You Built | Pattern |
|-----|--------|---------------|---------|
| 87 | 0-2 | Docker Error Explainer + Docker Agent | Basic LLM -> ReAct Agent |
| 88 | 3, 6 | Multi-tool Agent + MCP Server + CI/CD Analyzer | Multi-domain tools, MCP protocol |
| 89 | 4-5 | KubeHealer -- production self-healing agent | Temporal durability, human approval, guardrails |

**The evolution:**
```
Day 87: LLM explains errors (passive)
   |
Day 88: Agent diagnoses across Docker/K8s/CI (autonomous investigation)
   |
Day 89: Agent diagnoses AND fixes with approval (autonomous action)
```

**Key principles for production AI agents:**
1. **Tools are just CLI wrappers** -- any command you run can become a tool
2. **The ReAct pattern is universal** -- works for any domain
3. **MCP standardizes tool access** -- write once, use everywhere
4. **Guardrails are not optional** -- approval, scope limits, audit trails
5. **Durability matters** -- Temporal prevents lost state during infrastructure changes
6. **Know when NOT to use AI** -- simple if/then automation is better for known problems

**Where this connects to the rest of the challenge:**

| Day | Connection to Agentic AI |
|-----|-------------------------|
| 29-37 (Docker) | Docker tools in Module 2 wrap the same commands you learned |
| 40-49 (GitHub Actions) | CI/CD Analyzer in Module 6 diagnoses the pipelines you built |
| 50-67 (Kubernetes) | Kubernetes tools in Module 3 and KubeHealer use kubectl |
| 73-77 (Observability) | Agents could query Prometheus/Loki for metric-based diagnosis |
| 84-86 (ArgoCD) | An agent could trigger ArgoCD syncs or rollbacks |

**Clean up:**
```bash
kind delete cluster --name kubehealer-demo
# Stop Temporal (Ctrl+C the server)
deactivate
```

---

#### Hints
- KubeHealer uses Claude Sonnet 4, not Ollama/Gemma -- production agents need stronger reasoning for safe infrastructure changes
- The Anthropic API key is required for KubeHealer. Free tier gives you enough credits for this lab
- Temporal runs locally via `temporal server start-dev` -- no Docker setup needed for the dev server
- If Temporal UI does not load at `:8233`, check if the server is running and ports are free
- The agent patches pods using `kubectl patch` -- minimal, targeted changes rather than deleting and recreating
- `config-app` is intentionally unfixable to demonstrate that good agents know their limits
- The approval step is a Temporal signal -- the workflow pauses until a human responds. In production, this could be a Slack message or a PagerDuty approval
- Reference: https://github.com/TrainWithShubham/kubehealer

---

#### Documentation
Create `day-89-kubehealer-aiops.md` with:
- AIOps principles and the 6 production guardrails
- KubeHealer architecture: Temporal + Claude + kubectl
- The 3 broken apps and what the agent diagnosed for each
- Screenshot of the agent proposing fixes and asking for approval
- Screenshot of the Temporal UI showing the workflow execution
- How crash recovery works (kill worker, restart, resume)
- When to use AI agents vs traditional automation
- How agentic AI connects to every other topic in the 90-day challenge

---

#### Submission
1. Add `day-89-kubehealer-aiops.md` to `2026/day-89/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Built KubeHealer today -- a production-grade AI agent that scans Kubernetes for broken pods, diagnoses root causes using Claude, proposes fixes, and applies them with human approval. Deployed 3 intentionally broken apps: image typo, OOM crash, missing ConfigMap. The agent fixed the first two automatically and correctly escalated the third. Tested crash recovery with Temporal -- killed the agent mid-diagnosis, restarted it, and it resumed exactly where it left off. This is what AIOps looks like in 2026."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 89: On-call Runbook Templates

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **On-call Runbook Templates**.

#### 🎯 Learning Goals
- Understand the fundamentals of On-call Runbook Templates.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day89: On-call Runbook Templates`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 88](../day-88/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 90 →](../day-90/README.md)
