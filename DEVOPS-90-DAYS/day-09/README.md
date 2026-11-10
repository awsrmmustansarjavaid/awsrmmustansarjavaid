# Day 09 — DNS, HTTP/HTTPS & TLS with curl

[← Day 08](../day-08/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 10 →](../day-10/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-15` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Trace DNS resolution and record types
- [ ] Debug HTTP with curl
- [ ] Explain TLS certificates and chains

## 2. Prerequisites

- Day 8.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 DNS

Resolver -> root -> TLD -> authoritative. Records: A, AAAA, CNAME, MX, TXT, NS. TTL controls caching. `/etc/hosts` overrides local resolution; `/etc/resolv.conf` or systemd-resolved sets resolvers.

### 3.2 HTTP

Methods, status codes (2xx/3xx/4xx/5xx), headers, cookies, keep-alive, HTTP/2. Idempotency matters for retries.

### 3.3 TLS

Certificate = public key + identity signed by a CA. Handshake negotiates cipher, verifies chain, then encrypts. Let's Encrypt issues free automated certs.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `dig example.com A +short`, `dig +trace example.com`.
2. [ ] Add a fake host in `/etc/hosts` and curl it.
3. [ ] `curl -v https://example.com` and read each section.
4. [ ] Use `curl -I`, `-L`, `-H`, `-X POST -d`, `--resolve`.
5. [ ] Inspect a cert: `openssl s_client -connect example.com:443 -servername example.com </dev/null | openssl x509 -noout -dates -issuer -subject`.

## 5. Real-World Scenario

> Users in one country see 'certificate expired' while others don't. Investigate chain, expiry date, SNI and CDN and document the cause.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
dig example.com A +short
dig +trace example.com | tail -20
curl -sv https://example.com -o /dev/null
curl -I -L http://example.com
curl -s -X POST https://httpbin.org/post -H 'Content-Type: application/json' -d '{"a":1}' | jq .
curl --resolve app.local:443:127.0.0.1 https://app.local -k
openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a DNS troubleshooting flow chart (text). | You can demonstrate, without notes: *trace DNS resolution and record types* — with evidence committed to `day-09/`. |
| 2 | Check 5 websites' cert expiry dates with a loop. | You can demonstrate, without notes: *debug HTTP with curl* — with evidence committed to `day-09/`. |
| 3 | Create a status code cheat sheet with causes for 502, 503, 504. | You can demonstrate, without notes: *explain TLS certificates and chains* — with evidence committed to `day-09/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `NXDOMAIN` | Record missing/typo or wrong zone; check authoritative NS. |
| `SSL certificate problem` | Missing intermediate or untrusted CA; check chain and system CA bundle. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Always use HTTPS, TLS 1.2+, HSTS; never use `curl -k` outside throwaway tests; automate certificate renewal and expiry alerts.
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

1. What happens during DNS resolution?
2. 502 vs 504?
3. What is SNI?
4. How does a TLS handshake work?
5. **Scenario:** Users in one country see 'certificate expired' while others don't. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I query specific DNS records? | ☐ | ☐ | ☐ | ☐ |
| Can I read a curl -v output? | ☐ | ☐ | ☐ | ☐ |
| Can I check cert expiry from CLI? | ☐ | ☐ | ☐ | ☐ |
| Trace DNS resolution and record types | ☐ | ☐ | ☐ | ☐ |
| Debug HTTP with curl | ☐ | ☐ | ☐ | ☐ |
| Explain TLS certificates and chains | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-09/` in your own repository:

```text
day-09/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-09
git add day-09/
git commit -m "day-09: dns, http/https & tls with curl"
git push -u origin day-09
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

[← Day 08](../day-08/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 10 →](../day-10/README.md)
