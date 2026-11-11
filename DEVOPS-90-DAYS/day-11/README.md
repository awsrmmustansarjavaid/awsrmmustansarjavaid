# Day 11 — SSH Deep Dive: Keys, Config, Tunnels & Bastion Hosts

[← Day 10](../day-10/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 12 →](../day-12/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Use key-based SSH and ssh-agent
- [ ] Write an `~/.ssh/config`
- [ ] Use port forwarding and jump hosts

## 2. Prerequisites

- Day 10; two VMs or one VM plus localhost.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Key auth

Generate Ed25519 keys; the public key goes to `~/.ssh/authorized_keys`; the private key never leaves your machine and gets a passphrase.

### 3.2 Config and agent

`~/.ssh/config` defines aliases, users, identity files, ProxyJump. `ssh-agent` caches decrypted keys.

### 3.3 Tunnels

Local forward `-L`, remote `-R`, dynamic `-D`. Bastion pattern: only the bastion is public; private hosts are reached with `-J`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `ssh-keygen -t ed25519 -C "you@devops"`.
2. [ ] Copy key with `ssh-copy-id` and test.
3. [ ] Harden `/etc/ssh/sshd_config`: `PasswordAuthentication no`, `PermitRootLogin no`; validate with `sshd -t`; reload.
4. [ ] Create `~/.ssh/config` with a Host alias.
5. [ ] Create a local tunnel to an internal service and a ProxyJump example.

## 5. Real-World Scenario

> Your DB lives in a private subnet. Give a developer secure temporary access via the bastion with a tunnel and without sharing credentials.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ssh-keygen -t ed25519 -C "me@devops"
ssh-copy-id user@host
cat >> ~/.ssh/config <<'EOC'
Host web01
  HostName 10.0.1.10
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  ProxyJump bastion
EOC
sudo sshd -t && sudo systemctl reload ssh
ssh -L 5433:db.internal:5432 bastion
ssh -J bastion deploy@10.0.1.10
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write an SSH hardening checklist. | You can demonstrate, without notes: *use key-based SSH and ssh-agent* — with evidence committed to `day-11/`. |
| 2 | Rotate a key pair and revoke the old key. | You can demonstrate, without notes: *write an `~/.ssh/config`* — with evidence committed to `day-11/`. |
| 3 | Explain agent forwarding risks. | You can demonstrate, without notes: *use port forwarding and jump hosts* — with evidence committed to `day-11/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Permission denied (publickey)` | Wrong user/key, bad file perms (`chmod 700 ~/.ssh; chmod 600 authorized_keys`), check `ssh -vvv`. |
| Host key changed warning | Verify the change is legitimate before removing via `ssh-keygen -R host`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Passwords off, root login off, use short-lived certs or SSM in cloud, restrict by security group, protect private keys, avoid agent forwarding to untrusted hosts.
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

1. Why Ed25519 keys?
2. What is ProxyJump?
3. Local vs remote forwarding?
4. How to harden sshd?
5. **Scenario:** Your DB lives in a private subnet. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I log in with a key only? | ☐ | ☐ | ☐ | ☐ |
| Can I write a config alias? | ☐ | ☐ | ☐ | ☐ |
| Can I reach a private host via bastion? | ☐ | ☐ | ☐ | ☐ |
| Use key-based SSH and ssh-agent | ☐ | ☐ | ☐ | ☐ |
| Write an `~/.ssh/config` | ☐ | ☐ | ☐ | ☐ |
| Use port forwarding and jump hosts | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-11/` in your own repository:

```text
day-11/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-11
git add day-11/
git commit -m "day-11: ssh deep dive"
git push -u origin day-11
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 10](../day-10/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 12 →](../day-12/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-11/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
