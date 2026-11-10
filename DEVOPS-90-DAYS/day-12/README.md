# Day 12 — Nginx Reverse Proxy, TLS & First Web Deployment

[← Day 11](../day-11/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 13 →](../day-13/README.md)

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

- [ ] Install and configure Nginx
- [ ] Reverse-proxy to an app and add TLS
- [ ] Read access and error logs

## 2. Prerequisites

- Days 8-11.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Web server roles

Nginx serves static files, terminates TLS, load balances and reverse proxies. Config lives in `/etc/nginx` (`nginx.conf`, `sites-available/enabled`). Always `nginx -t` before reload.

### 3.2 Reverse proxy

`proxy_pass` forwards to an upstream app; pass `Host`, `X-Forwarded-For`, `X-Forwarded-Proto` headers. Upstream blocks enable round-robin load balancing.

### 3.3 TLS

Use Let's Encrypt (certbot) on a public domain or a self-signed cert in the lab. Redirect HTTP to HTTPS.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install nginx; serve a custom `index.html`.
2. [ ] Run a simple app on 127.0.0.1:5000 (Python Flask or `python3 -m http.server`).
3. [ ] Create a server block proxying `/` to the app.
4. [ ] Generate a self-signed cert and enable HTTPS on 443, redirect 80.
5. [ ] Add 2 upstream backends and test round robin with curl in a loop.

## 5. Real-World Scenario

> Marketing launches tomorrow. Put the app behind nginx with HTTPS, security headers and rate limiting; document the config and rollback.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt install -y nginx
sudo tee /etc/nginx/sites-available/app <<'EOC'
upstream app { server 127.0.0.1:5000; server 127.0.0.1:5001; }
server {
  listen 80; server_name _;
  location / { proxy_pass http://app; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $remote_addr; }
}
EOC
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
for i in 1 2 3 4; do curl -s localhost; done
sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `limit_req` rate limiting and verify with a loop. | You can demonstrate, without notes: *install and configure Nginx* — with evidence committed to `day-12/`. |
| 2 | Add security headers (HSTS, X-Content-Type-Options, CSP). | You can demonstrate, without notes: *reverse-proxy to an app and add TLS* — with evidence committed to `day-12/`. |
| 3 | Create a screenshot or curl proof of HTTP->HTTPS redirect. | You can demonstrate, without notes: *read access and error logs* — with evidence committed to `day-12/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| 502 Bad Gateway | Upstream down/wrong port; check `ss -tulpn` and error.log. |
| `nginx -t` fails | Syntax error; read the line number; missing semicolons. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Hide version (`server_tokens off`), enforce TLS 1.2+, add rate limits, restrict admin paths, keep nginx patched.
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

1. Forward vs reverse proxy?
2. What does proxy_set_header do?
3. What does 502 mean here?
4. Why test config before reload?
5. **Scenario:** Marketing launches tomorrow. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I proxy to an app? | ☐ | ☐ | ☐ | ☐ |
| Can I enable HTTPS? | ☐ | ☐ | ☐ | ☐ |
| Can I diagnose a 502? | ☐ | ☐ | ☐ | ☐ |
| Install and configure Nginx | ☐ | ☐ | ☐ | ☐ |
| Reverse-proxy to an app and add TLS | ☐ | ☐ | ☐ | ☐ |
| Read access and error logs | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-12/` in your own repository:

```text
day-12/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-12
git add day-12/
git commit -m "day-12: nginx reverse proxy, tls & first web deployment"
git push -u origin day-12
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

[← Day 11](../day-11/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 13 →](../day-13/README.md)
