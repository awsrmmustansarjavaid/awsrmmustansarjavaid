# Day 10 — Ports, Firewalls & Network Debugging (ufw, nftables, tcpdump)

[← Day 09](../day-09/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 11 →](../day-11/README.md)

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

- [ ] List listening services and map them to processes
- [ ] Configure host firewalls
- [ ] Capture and read traffic

## 2. Prerequisites

- Day 9.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Sockets and ports

A service listens on IP:port. `0.0.0.0` listens on all interfaces; `127.0.0.1` only locally. `ss -tulpn` shows listeners with PIDs.

### 3.2 Firewalls

Default-deny inbound, allow only required ports. `ufw` is a friendly front-end for nftables/iptables. Cloud equivalents: Security Groups (stateful) and NACLs (stateless).

### 3.3 Packet capture

`tcpdump -i any port 80 -nn` shows traffic; use filters and `-w file.pcap` for Wireshark.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Start `python3 -m http.server 8080` and find it with `ss -tulpn`.
2. [ ] Enable `ufw` with default deny, allow 22 and 80 only.
3. [ ] Test from another host/VM or `nc` from localhost vs external IP.
4. [ ] Capture traffic to port 8080 while using curl; save a pcap.
5. [ ] Explain why a bind to 127.0.0.1 isn't reachable externally.

## 5. Real-World Scenario

> A new service is 'up' but unreachable. Walk through: listener -> bind address -> host firewall -> cloud SG -> route -> DNS and document your checklist.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ss -tulpn
python3 -m http.server 8080 &
sudo ufw default deny incoming && sudo ufw default allow outgoing
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp
sudo ufw enable && sudo ufw status verbose
sudo tcpdump -i any port 8080 -nn -c 20
nc -vz localhost 8080
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 'Cannot connect' troubleshooting checklist. | You can demonstrate, without notes: *list listening services and map them to processes* — with evidence committed to `day-10/`. |
| 2 | Explain stateful vs stateless firewalls. | You can demonstrate, without notes: *configure host firewalls* — with evidence committed to `day-10/`. |
| 3 | Block an IP and verify. | You can demonstrate, without notes: *capture and read traffic* — with evidence committed to `day-10/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Locked out of SSH after enabling ufw | Always allow 22 BEFORE enabling; use console/serial to recover. |
| tcpdump shows nothing | Wrong interface/filter or no traffic; use `-i any`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Default deny, allow minimum ports, restrict SSH by source IP, never expose DB ports (3306/5432/6379/27017) publicly.
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

1. Why bind to 127.0.0.1?
2. Security Group vs NACL?
3. How to see which process owns a port?
4. What does tcpdump do?
5. **Scenario:** A new service is 'up' but unreachable. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I list listeners and PIDs? | ☐ | ☐ | ☐ | ☐ |
| Can I write a default-deny policy? | ☐ | ☐ | ☐ | ☐ |
| Can I run a basic capture? | ☐ | ☐ | ☐ | ☐ |
| List listening services and map them to processes | ☐ | ☐ | ☐ | ☐ |
| Configure host firewalls | ☐ | ☐ | ☐ | ☐ |
| Capture and read traffic | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-10/` in your own repository:

```text
day-10/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-10
git add day-10/
git commit -m "day-10: ports, firewalls & network debugging (ufw, nftables, tcpdump"
git push -u origin day-10
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

[← Day 09](../day-09/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 11 →](../day-11/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-10/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
