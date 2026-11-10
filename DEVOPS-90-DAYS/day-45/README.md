# Day 45 — DevSecOps II: Secrets Management - gitleaks, SOPS & Vault

[← Day 44](../day-44/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 46 →](../day-46/README.md)

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

- [ ] Detect secrets in code and history
- [ ] Encrypt secrets in git with SOPS/age
- [ ] Run HashiCorp Vault in dev mode and read secrets from an app

## 2. Prerequisites

- Days 26, 33, 38.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Secret sprawl

Secrets leak via repos, logs, images, CI vars and chat. Controls: detection, short-lived credentials, central store, rotation, audit.

### 3.2 GitOps-friendly encryption

SOPS + age/KMS encrypts values in YAML so encrypted secrets can live in git; External Secrets Operator syncs from cloud managers into Kubernetes.

### 3.3 Vault

Dynamic secrets, leases, policies, auth methods (AppRole, K8s, OIDC). KV v2 for static secrets.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `gitleaks detect` across git history; fix findings.
2. [ ] Generate an age key; encrypt `secrets.yaml` with SOPS; commit encrypted file.
3. [ ] Run Vault dev server in Docker; write and read a KV secret.
4. [ ] Create a Vault policy and token with read-only access.
5. [ ] Write a small script that fetches a secret at runtime.

## 5. Real-World Scenario

> Pen test found a DB password in a Docker image layer. Remove it, rotate it, rebuild, and implement a process so it can't recur.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
gitleaks detect --source . --log-opts="--all" -v
age-keygen -o key.txt
sops --encrypt --age $(grep -o 'age1.*' key.txt) secrets.yaml > secrets.enc.yaml
docker run -d --cap-add IPC_LOCK -p 8200:8200 -e VAULT_DEV_ROOT_TOKEN_ID=root hashicorp/vault
export VAULT_ADDR=http://127.0.0.1:8200 VAULT_TOKEN=root
vault kv put secret/app db_password=s3cr3t && vault kv get secret/app
vault policy write app-ro - <<< 'path "secret/data/app" { capabilities=["read"] }'
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a secrets rotation runbook. | You can demonstrate, without notes: *detect secrets in code and history* — with evidence committed to `day-45/`. |
| 2 | Compare Vault, AWS Secrets Manager, SOPS. | You can demonstrate, without notes: *encrypt secrets in git with SOPS/age* — with evidence committed to `day-45/`. |
| 3 | Add gitleaks to CI. | You can demonstrate, without notes: *run HashiCorp Vault in dev mode and read secrets from an app* — with evidence committed to `day-45/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| SOPS cannot decrypt | Missing/incorrect age key in `SOPS_AGE_KEY_FILE`. |
| Vault dev data lost | Dev mode is in-memory; use proper storage in prod. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never use Vault dev mode in production; rotate any exposed secret immediately; short TTLs.
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

1. Why dynamic secrets?
2. How can secrets live in git safely?
3. What is a Vault policy?
4. How do you respond to a leaked key?
5. **Scenario:** Pen test found a DB password in a Docker image layer. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I find leaked secrets? | ☐ | ☐ | ☐ | ☐ |
| Can I encrypt secrets with SOPS? | ☐ | ☐ | ☐ | ☐ |
| Can I use Vault KV? | ☐ | ☐ | ☐ | ☐ |
| Detect secrets in code and history | ☐ | ☐ | ☐ | ☐ |
| Encrypt secrets in git with SOPS/age | ☐ | ☐ | ☐ | ☐ |
| Run HashiCorp Vault in dev mode and read secrets from an app | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-45/` in your own repository:

```text
day-45/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-45
git add day-45/
git commit -m "day-45: devsecops ii"
git push -u origin day-45
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

[← Day 44](../day-44/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 46 →](../day-46/README.md)
