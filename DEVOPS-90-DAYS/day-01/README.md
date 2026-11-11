# Day 01 — DevOps Mindset, Lab Setup & Linux First Steps

— | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 02 →](../day-02/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain DevOps, CALMS and the DevOps lifecycle in your own words
- [ ] Build a working Linux lab (WSL2, VM or cloud VM)
- [ ] Run your first 20 Linux commands confidently

## 2. Prerequisites

- A laptop with 8 GB RAM, internet access, a GitHub account.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 What DevOps really is

DevOps is a culture plus a set of engineering practices that shorten the time from code commit to reliable production. CALMS = Culture, Automation, Lean, Measurement, Sharing. The loop: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Plan. In 2026 the role also covers security (DevSecOps), reliability (SRE), cost (FinOps) and developer experience (platform engineering).

### 3.2 DORA metrics

Deployment frequency, lead time for changes, change failure rate and time to restore service are the four metrics used to measure delivery performance. You will track them for your own capstones.

### 3.3 Why Linux

Almost every server, container and Kubernetes node runs Linux. Distros: Ubuntu/Debian (apt) and RHEL/Rocky/Amazon Linux (dnf). This course uses Ubuntu 24.04 LTS.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install WSL2 (Windows), Multipass/UTM (macOS) or VirtualBox, and create an Ubuntu 24.04 environment.
2. [ ] Run `lsb_release -a`, `uname -r`, `whoami`, `hostname`, `uptime`.
3. [ ] Create the folder `~/devops-90/day-01` and a `notes.md` file inside it.
4. [ ] Create a GitHub repo called `devops-90-days` and clone it locally.
5. [ ] Write a half-page summary of DevOps and the four DORA metrics in `notes.md`.

## 5. Real-World Scenario

> Your manager asks: 'We deploy once a month and each release breaks something. What does DevOps change?' Draft a 5-line answer referencing small batches, automation and feedback loops.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Who am I and where am I?
whoami; hostname; pwd
# OS and kernel information
cat /etc/os-release; uname -r
# Create a workspace and a file
mkdir -p ~/devops-90/day-01 && cd ~/devops-90/day-01 && touch notes.md
# List with details, including hidden files
ls -la
# Built-in manual - learn to read it
man ls; ls --help | head
# Show command history
history | tail -20
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Install `tree`, `curl`, `git`, `jq` with apt and record versions. | You can demonstrate, without notes: *explain DevOps, CALMS and the DevOps lifecycle in your own words* — with evidence committed to `day-01/`. |
| 2 | Write a one-page 'My DevOps goals for 2026' document. | You can demonstrate, without notes: *build a working Linux lab (WSL2, VM or cloud VM)* — with evidence committed to `day-01/`. |
| 3 | Explain the difference between Linux distribution, kernel and shell. | You can demonstrate, without notes: *run your first 20 Linux commands confidently* — with evidence committed to `day-01/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `command not found` after install | Run `sudo apt update`, then re-install; check `echo $PATH` and `which <cmd>`. |
| WSL2 will not start | Enable 'Virtual Machine Platform' + hardware virtualization in BIOS, run `wsl --update`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Never work as root by default. Use a normal user plus `sudo`. Keep a private GitHub repo until you've checked nothing sensitive is committed.
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

1. What problem does DevOps solve?
2. Name the four DORA metrics.
3. What is the difference between a kernel and a distribution?
4. What does `man` do and why is it important?
5. **Scenario:** Your manager asks: 'We deploy once a month and each release breaks something. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I draw the DevOps loop from memory? | ☐ | ☐ | ☐ | ☐ |
| Can I explain CALMS? | ☐ | ☐ | ☐ | ☐ |
| Can I find OS version and kernel version with two commands? | ☐ | ☐ | ☐ | ☐ |
| Explain DevOps, CALMS and the DevOps lifecycle in your own words | ☐ | ☐ | ☐ | ☐ |
| Build a working Linux lab (WSL2, VM or cloud VM) | ☐ | ☐ | ☐ | ☐ |
| Run your first 20 Linux commands confidently | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-01/` in your own repository:

```text
day-01/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-01
git add day-01/
git commit -m "day-01: devops mindset, lab setup & linux first steps"
git push -u origin day-01
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

— | [Roadmap](../90-DAY-ROADMAP.md) | [Day 02 →](../day-02/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-01/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
