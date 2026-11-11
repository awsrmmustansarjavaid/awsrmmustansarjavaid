# Day 86 — Cost Optimisation (FinOps for Cloud & Kubernetes) & AI-Assisted DevOps

[← Day 85](../day-85/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 87 →](../day-87/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 13 — Platform Engineering, FinOps/AI, Capstone 3 & Career |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-87`, `90DaysOfDevOps-master/2026/day-88`, `90DaysOfDevOps-master/2026/day-89` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Measure and reduce cloud and Kubernetes cost
- [ ] Use AI assistants responsibly in DevOps workflows
- [ ] Build a small AIOps helper with human approval

## 2. Prerequisites

- Days 55, 75, 81-84.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 FinOps in practice

Tag/label for showback, rightsize, use autoscaling, Spot/preemptible for tolerant workloads, schedule non-prod, storage lifecycle, delete orphaned resources, Savings Plans, cost per request/service. Kubernetes: OpenCost/Kubecost, requests vs usage, node bin-packing, Karpenter.

### 3.2 AI in DevOps (2026)

LLM assistants help with scripts, IaC review, log summarisation, runbook search and incident timelines. Risks: hallucinations, secret leakage, over-permissive agents. Controls: read-only by default, human approval for changes, redaction, audit logs, evaluate outputs, least-privilege tokens.

### 3.3 MCP/agents concept

Tools exposed to agents via protocols such as MCP; design with narrow scopes and approval gates.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install OpenCost (or use `kubectl top` + requests analysis) and identify over-provisioned workloads.
2. [ ] Right-size 3 deployments and document before/after.
3. [ ] Write a script that summarises K8s warning events/logs and asks an LLM (or local model) for a summary with secrets redacted.
4. [ ] Require explicit confirmation before any suggested command executes.
5. [ ] Write an AI-usage policy for your DevOps repo.

## 5. Real-World Scenario

> Leadership wants to cut cloud cost 25% without hurting reliability, and asks if AI can 'auto-fix' production. Provide a safe plan.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl top pods -A --sort-by=memory | head
kubectl get pods -A -o json | jq -r '.items[]|[.metadata.namespace,.metadata.name,(.spec.containers[].resources.requests.memory//"none")]|@tsv'
kubectl get events -A --field-selector type=Warning -o json | jq '[.items[]|{ns:.metadata.namespace,reason,msg:.message}]' > events.json
sed -E 's/(token|password|secret)=[^ ]+/\1=REDACTED/g' events.json > safe-events.json
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write 10 FinOps actions ranked by savings/risk. | You can demonstrate, without notes: *measure and reduce cloud and Kubernetes cost* — with evidence committed to `day-86/`. |
| 2 | Document where AI must NOT have write access. | You can demonstrate, without notes: *use AI assistants responsibly in DevOps workflows* — with evidence committed to `day-86/`. |
| 3 | Evaluate AI output on 5 incidents and note errors. | You can demonstrate, without notes: *build a small AIOps helper with human approval* — with evidence committed to `day-86/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Savings break performance | Right-size using percentiles and load tests; use SLOs as guardrails. |
| AI suggests destructive command | Never execute unreviewed; sandbox and require approval. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Redact secrets before sending data to any model; use enterprise/privacy-approved services; keep agents read-only unless gated.
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

1. How do you reduce K8s cost?
2. What are risks of AI agents in ops?
3. What guardrails would you add?
4. How do you measure savings?
5. **Scenario:** Leadership wants to cut cloud cost 25% without hurting reliability, and asks if AI can 'auto-fix' production. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I identify waste? | ☐ | ☐ | ☐ | ☐ |
| Can I safely use AI assistance? | ☐ | ☐ | ☐ | ☐ |
| Do I have an AI policy? | ☐ | ☐ | ☐ | ☐ |
| Measure and reduce cloud and Kubernetes cost | ☐ | ☐ | ☐ | ☐ |
| Use AI assistants responsibly in DevOps workflows | ☐ | ☐ | ☐ | ☐ |
| Build a small AIOps helper with human approval | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-86/` in your own repository:

```text
day-86/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-86
git add day-86/
git commit -m "day-86: cost optimisation (finops for cloud & kubernetes) & ai-assis"
git push -u origin day-86
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

[← Day 85](../day-85/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 87 →](../day-87/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-86/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
