# Day 19 — Python: JSON, YAML & REST API Automation

[← Day 18](../day-18/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 20 →](../day-20/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Parse and generate JSON/YAML
- [ ] Call REST APIs with auth, pagination, retries and timeouts
- [ ] Build a GitHub API automation script

## 2. Prerequisites

- Day 18; a GitHub fine-grained token with read-only repo scope.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Data formats

JSON is the API lingua franca; YAML is the config language of DevOps. Use `yaml.safe_load` (never `load`) and `json.dumps(indent=2)`.

### 3.2 API consumption

Use `requests.Session`, always set `timeout`, check `raise_for_status()`, handle 429/5xx with exponential backoff, follow pagination links.

### 3.3 Authentication

Bearer tokens from environment variables; least-privilege fine-grained tokens.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Write `repos.py` listing your repos, stars, last push using GitHub REST API.
2. [ ] Add pagination and a `--json` output option.
3. [ ] Load a YAML file of 'required repo settings' and compare against actual settings.
4. [ ] Add retry/backoff and timeouts.
5. [ ] Write 3 tests using mocked responses (`responses` or `unittest.mock`).

## 5. Real-World Scenario

> Security asks for a report of all repos without branch protection or SECURITY.md. Automate the audit and output CSV.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
export GITHUB_TOKEN=...   # never commit
python - <<'EOP'
import os, requests
s = requests.Session(); s.headers.update({"Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}", "Accept": "application/vnd.github+json"})
r = s.get("https://api.github.com/user/repos?per_page=100", timeout=10); r.raise_for_status()
for repo in r.json(): print(repo["full_name"], repo["pushed_at"])
EOP
curl -s https://api.github.com/rate_limit | jq .rate
yq '.services[].name' compose.yml
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a YAML->JSON converter CLI. | You can demonstrate, without notes: *parse and generate JSON/YAML* — with evidence committed to `day-19/`. |
| 2 | Write a retry decorator. | You can demonstrate, without notes: *call REST APIs with auth, pagination, retries and timeouts* — with evidence committed to `day-19/`. |
| 3 | Document API rate limits and how you handle them. | You can demonstrate, without notes: *build a GitHub API automation script* — with evidence committed to `day-19/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| 401/403 from API | Token missing scope/expired; check header format. |
| Script hangs | Missing timeout; always set `timeout=(connect, read)`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Store tokens in env/secret manager, use read-only tokens, rotate regularly, never log Authorization headers.
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

1. json vs yaml?
2. Why `safe_load`?
3. How to handle rate limits?
4. How would you paginate?
5. **Scenario:** Security asks for a report of all repos without branch protection or SECURITY. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I call an API with auth? | ☐ | ☐ | ☐ | ☐ |
| Can I handle errors and retries? | ☐ | ☐ | ☐ | ☐ |
| Can I parse YAML safely? | ☐ | ☐ | ☐ | ☐ |
| Parse and generate JSON/YAML | ☐ | ☐ | ☐ | ☐ |
| Call REST APIs with auth, pagination, retries and timeouts | ☐ | ☐ | ☐ | ☐ |
| Build a GitHub API automation script | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-19/` in your own repository:

```text
day-19/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-19
git add day-19/
git commit -m "day-19: python"
git push -u origin day-19
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

[← Day 18](../day-18/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 20 →](../day-20/README.md)
