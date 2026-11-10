# Day 08 — Networking Fundamentals: OSI, TCP/IP, IP Addressing & Subnets

[← Day 07](../day-07/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 09 →](../day-09/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-14` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain OSI/TCP-IP layers with real examples
- [ ] Calculate CIDR subnets
- [ ] Inspect interfaces, routes and connectivity

## 2. Prerequisites

- Day 7.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Layers

L2 Ethernet/MAC, L3 IP, L4 TCP/UDP, L7 HTTP/DNS/SSH. Encapsulation wraps data at each layer. TCP: 3-way handshake, reliable; UDP: connectionless.

### 3.2 IPv4 and CIDR

/24 = 256 addresses (254 usable). Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. A /16 VPC split into /24 subnets gives 256 subnets. NAT lets private addresses reach the internet.

### 3.3 Tools

`ip a`, `ip r`, `ping`, `traceroute`, `mtr`, `ss`, `nc`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `ip -br a` and `ip r`; identify your default gateway.
2. [ ] Calculate with `ipcalc 10.0.0.0/22`: network, broadcast, hosts.
3. [ ] Design a VPC plan: 10.0.0.0/16 with 3 public + 3 private /24 subnets over 3 AZs.
4. [ ] Use `traceroute` to a public host and explain each hop.
5. [ ] Use `nc -vz host 22` to test a port.

## 5. Real-World Scenario

> Two environments must be peered later but both use 10.0.0.0/16. Explain why this fails and re-plan non-overlapping CIDRs for dev/stage/prod.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
ip -br a; ip r
ping -c 4 1.1.1.1
traceroute -n 8.8.8.8     # or mtr -rn 8.8.8.8
sudo apt install -y ipcalc
ipcalc 10.0.0.0/22
nc -vz example.com 443
ss -tulpn
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create an IP address plan spreadsheet/markdown for 3 environments. | You can demonstrate, without notes: *explain OSI/TCP-IP layers with real examples* — with evidence committed to `day-08/`. |
| 2 | Write a one-page 'what happens when I type a URL' explanation. | You can demonstrate, without notes: *calculate CIDR subnets* — with evidence committed to `day-08/`. |
| 3 | Explain public vs private IP and NAT. | You can demonstrate, without notes: *inspect interfaces, routes and connectivity* — with evidence committed to `day-08/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ping` fails but web works | ICMP may be blocked; test with `curl`/`nc`. |
| Cannot reach other VM | Check subnet, gateway, firewall/security group and routes. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Segment networks; never expose databases directly to the internet; plan CIDRs so private ranges never overlap.
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

1. What is a /24?
2. TCP vs UDP?
3. What is NAT?
4. What is a default gateway?
5. **Scenario:** Two environments must be peered later but both use 10. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I split a /16 into /24s? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the TCP handshake? | ☐ | ☐ | ☐ | ☐ |
| Can I test a port without a browser? | ☐ | ☐ | ☐ | ☐ |
| Explain OSI/TCP-IP layers with real examples | ☐ | ☐ | ☐ | ☐ |
| Calculate CIDR subnets | ☐ | ☐ | ☐ | ☐ |
| Inspect interfaces, routes and connectivity | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-08/` in your own repository:

```text
day-08/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-08
git add day-08/
git commit -m "day-08: networking fundamentals"
git push -u origin day-08
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

[← Day 07](../day-07/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 09 →](../day-09/README.md)
