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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 12 – Breather & Revision (Days 01–11) — Challenge Brief

#### Goal
Take a **one-day pause** to consolidate everything from Days 01–11 so you don’t forget the fundamentals you just built.

#### Expected Output
- A markdown file: `day-12-revision.md`  
  (bullet notes + checkpoints)  
- Optional: screenshots of any re-runs you do

#### What to Review (pick at least one per section)
- **Mindset & plan:** revisit your Day 01 learning plan—are your goals still right? any tweaks?  
- **Processes & services:** rerun 2 commands from Day 04/05 (e.g., `ps`, `systemctl status`, `journalctl -u <service>`); jot what you observed today.  
- **File skills:** practice 3 quick ops from Days 06–11 (e.g., `echo >>`, `chmod`, `chown`, `ls -l`, `cp`, `mkdir`).  
- **Cheat sheet refresh:** skim your Day 03 commands—highlight 5 you’d reach for first in an incident.  
- **User/group sanity:** recreate one small scenario from Day 09 or Day 11 (create a user or change ownership) and verify with `id`/`ls -l`.

#### Mini Self-Check (write short answers in `day-12-revision.md`)
1) Which 3 commands save you the most time right now, and why?  
2) How do you check if a service is healthy? List the exact 2–3 commands you’d run first.  
3) How do you safely change ownership and permissions without breaking access? Give one example command.  
4) What will you focus on improving in the next 3 days?

#### Suggested Flow (30–45 minutes)
- 10 min: skim notes from each day, update Day 01 plan if needed.  
- 15–20 min: rerun a tiny hands-on set (process check, service check, file permission change).  
- 5–10 min: write the self-check answers and key takeaways.

#### Tips
- Keep it light—this is about retention, not new concepts.  
- If something felt shaky this week (e.g., `chmod` numbers, `journalctl` flags), practice that specifically.  
- Small wins: one screenshot of a command rerun + 5 bullet notes is enough.

#### Submission
1. Navigate to `2026/day-12/`  
2. Add `day-12-revision.md` with your bullets and answers  
3. Commit and push to your fork

#### Learn in Public
Post 2–3 lines on what you reinforced today and one command you now remember confidently.

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

### 7.2 🚀 Day 12 – Breather & Revision (Days 01–11) — Notes & Solution

#### 🎯 Goal

Take a short break from learning new concepts and reinforce the Linux fundamentals covered in **Days 01–11**. The focus today is on revision, retention, and building confidence through quick hands-on practice.

---

#### 📚 Revision Checklist

#### 🧠 Mindset & Learning Plan

* ✅ Reviewed my Day 01 learning roadmap.
* ✅ My goal of becoming a DevOps Engineer remains the same.
* ✅ Will continue focusing on Linux, AWS, Docker, Kubernetes, CI/CD, and Infrastructure Automation.

---

#### ⚙️ Processes & Services

##### Commands Practiced

```bash
ps -ef
systemctl status sshd
journalctl -u sshd --no-pager
```

##### Observations

* Verified currently running processes.
* Checked that the SSH service is active.
* Reviewed recent SSH service logs.

---

#### 📂 File Operations Practice

##### Commands Practiced

```bash
echo "Revision Day" >> notes.txt
chmod 755 script.sh
mkdir revision-folder
cp notes.txt revision-folder/
ls -l
```

##### What I Verified

* Appended text successfully.
* Changed file permissions.
* Created a new directory.
* Copied files successfully.
* Verified permissions and ownership.

---

#### 📋 Linux Cheat Sheet Refresh

##### Top 5 Commands I Would Use During an Incident

| Command                      | Purpose                              |
| ---------------------------- | ------------------------------------ |
| `ls -l`                      | Check file permissions and ownership |
| `ps -ef`                     | View running processes               |
| `systemctl status <service>` | Check service health                 |
| `journalctl -u <service>`    | Review service logs                  |
| `chmod`                      | Modify file permissions              |

---

#### 👥 User & Group Practice

##### Scenario

Created a test user and verified the account.

```bash
sudo useradd revisionuser
id revisionuser
```

Verified ownership:

```bash
touch testfile.txt
ls -l testfile.txt
```

---

#### ✅ Mini Self-Check

##### ❓ Which 3 commands save you the most time right now, and why?

* **ls -l** → Quickly checks permissions and ownership.
* **systemctl status** → Instantly verifies service health.
* **journalctl -u** → Helps troubleshoot service-related issues.

---

##### ❓ How do you check if a service is healthy?

Commands I use first:

```bash
systemctl status sshd
ps -ef | grep sshd
journalctl -u sshd --no-pager
```

---

##### ❓ How do you safely change ownership and permissions?

Example:

```bash
sudo chown suraj:developers project.txt
chmod 640 project.txt
```

This changes the owner and group while ensuring only the owner has write access.

---

##### ❓ What will you focus on improving in the next 3 days?

* Strengthen Linux administration skills.
* Practice more troubleshooting scenarios.
* Continue learning networking and shell scripting fundamentals.

---

#### 💡 Key Takeaways

* Linux commands become easier with regular practice.
* Understanding permissions and ownership is essential for system security.
* Process and service troubleshooting are core DevOps skills.
* Consistent revision improves long-term retention.
* Hands-on practice is the fastest way to build confidence.

---

#### 🚀 Progress Summary

✅ Revised Linux fundamentals (Days 01–11)

✅ Practiced process and service management

✅ Reviewed file operations and permissions

✅ Reinforced user and group management

✅ Ready to continue the #90DaysOfDevOps journey!

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add `limit_req` rate limiting and verify with a loop. | You can demonstrate, without notes: *install and configure Nginx* — with evidence committed to `day-12/`. |
| 2 | Add security headers (HSTS, X-Content-Type-Options, CSP). | You can demonstrate, without notes: *reverse-proxy to an app and add TLS* — with evidence committed to `day-12/`. |
| 3 | Create a screenshot or curl proof of HTTP->HTTPS redirect. | You can demonstrate, without notes: *read access and error logs* — with evidence committed to `day-12/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| 502 Bad Gateway | Upstream down/wrong port; check `ss -tulpn` and error.log. |
| `nginx -t` fails | Syntax error; read the line number; missing semicolons. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Hide version (`server_tokens off`), enforce TLS 1.2+, add rate limits, restrict admin paths, keep nginx patched.
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

1. Forward vs reverse proxy?
2. What does proxy_set_header do?
3. What does 502 mean here?
4. Why test config before reload?
5. **Scenario:** Marketing launches tomorrow. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 11](../day-11/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 13 →](../day-13/README.md)
