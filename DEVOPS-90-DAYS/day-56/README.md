# Day 56 — Azure Fundamentals for DevOps & Multi-Cloud Mapping

[← Day 55](../day-55/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 57 →](../day-57/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 8 — Cloud Engineering: AWS & Azure |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Map AWS concepts to Azure
- [ ] Use Azure CLI with resource groups, VNets and VMs
- [ ] Understand Entra ID, RBAC and Azure DevOps basics

## 2. Prerequisites

- Day 50-55; free Azure account.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Azure model

Tenant -> Management groups -> Subscriptions -> Resource groups -> Resources. Entra ID (identity), Azure RBAC (role assignments at scope), managed identities (no secrets).

### 3.2 Service mapping

EC2=VM, VPC=VNet, SG=NSG, S3=Blob Storage, RDS=Azure Database, ALB=Application Gateway/Load Balancer, CloudWatch=Azure Monitor, IAM roles=Managed identities, ECR=ACR, EKS=AKS.

### 3.3 Azure DevOps

Boards, Repos, Pipelines (YAML), Artifacts. Service connections with workload identity federation.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install `az` and log in; create resource group.
2. [ ] Create VNet/subnet/NSG; launch a small Linux VM with managed identity; SSH via key.
3. [ ] Assign Reader role at RG scope to a test user.
4. [ ] Create ACR and push an image.
5. [ ] Write the AWS<->Azure mapping table with 15 services.

## 5. Real-World Scenario

> Your company is multi-cloud after an acquisition. Produce a cheat sheet so AWS engineers can operate in Azure on day one.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
az login
az group create -n rg-lab -l westeurope
az network vnet create -g rg-lab -n vnet-lab --address-prefix 10.10.0.0/16 --subnet-name app --subnet-prefix 10.10.1.0/24
az vm create -g rg-lab -n vm1 --image Ubuntu2204 --size Standard_B1s --assign-identity --generate-ssh-keys
az role assignment create --assignee <user> --role Reader --scope /subscriptions/<id>/resourceGroups/rg-lab
az acr create -g rg-lab -n acrlab$RANDOM --sku Basic
az group delete -n rg-lab --yes --no-wait
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Compare IAM vs Azure RBAC in a table. | You can demonstrate, without notes: *map AWS concepts to Azure* — with evidence committed to `day-56/`. |
| 2 | Write a multi-cloud tagging/policy note. | You can demonstrate, without notes: *use Azure CLI with resource groups, VNets and VMs* — with evidence committed to `day-56/`. |
| 3 | Review Azure Cost Management basics. | You can demonstrate, without notes: *understand Entra ID, RBAC and Azure DevOps basics* — with evidence committed to `day-56/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `SubscriptionNotFound` | Run `az account set --subscription`. |
| Quota error | Choose another region/size or request quota. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Use managed identities, RBAC at least-privilege scope, NSG default deny, Defender for Cloud recommendations, delete RGs after lab.
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

1. Resource group purpose?
2. Managed identity vs service principal?
3. NSG vs AWS SG?
4. How do you structure subscriptions?
5. **Scenario:** Your company is multi-cloud after an acquisition. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I deploy a VM with az CLI? | ☐ | ☐ | ☐ | ☐ |
| Can I map AWS to Azure? | ☐ | ☐ | ☐ | ☐ |
| Can I clean up everything? | ☐ | ☐ | ☐ | ☐ |
| Map AWS concepts to Azure | ☐ | ☐ | ☐ | ☐ |
| Use Azure CLI with resource groups, VNets and VMs | ☐ | ☐ | ☐ | ☐ |
| Understand Entra ID, RBAC and Azure DevOps basics | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-56/` in your own repository:

```text
day-56/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-56
git add day-56/
git commit -m "day-56: azure fundamentals for devops & multi-cloud mapping"
git push -u origin day-56
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** AWS-Azure mapping cheat sheet, cloud notes.

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

[← Day 55](../day-55/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 57 →](../day-57/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-56/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
