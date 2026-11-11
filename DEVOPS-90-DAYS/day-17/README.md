# Day 17 — Bash Project: Log Analyzer & Report Generator

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 18 →](../day-18/README.md)

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

- [ ] Build a real log-analysis tool
- [ ] Combine awk, sort, uniq, date, mail/Slack webhook
- [ ] Write tests and README for a script

## 2. Prerequisites

- Days 3, 15, 16.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Requirements-driven scripting

Start from the report you need: top errors, top IPs, error rate per hour, slowest endpoints. Design inputs, outputs and failure behaviour first.

### 3.2 Reports

Generate Markdown/CSV; optionally post to Slack via webhook using `curl`.

### 3.3 Testing scripts

Use sample fixtures and `bats-core` or simple assertion functions.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create a fixture log with 1,000 lines containing 200/404/500 codes.
2. [ ] Write `analyze.sh <logfile>` producing a Markdown report with counts, top IPs, 5xx rate and hourly histogram.
3. [ ] Add `--since` and `--output` flags.
4. [ ] Add 3 bats tests (or assert functions).
5. [ ] Write README with usage and examples.

## 5. Real-World Scenario

> The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Deliver this script and schedule it with cron/systemd timer.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
awk '{print $9}' access.log | sort | uniq -c | sort -nr
awk '$9>=500{c++} END{printf "5xx rate: %.2f%%\n", c*100/NR}' access.log
awk '{split($4,t,":"); h[t[2]]++} END{for(k in h) print k, h[k]}' access.log | sort
curl -s -X POST -H 'Content-type: application/json' --data "{\"text\":\"$(cat report.md)\"}" "$SLACK_WEBHOOK_URL"
sudo apt install -y bats && bats tests/
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 17 – Shell Scripting: Loops, Arguments & Error Handling — Challenge Brief

#### Task
Level up your scripting — use loops, handle arguments, and deal with errors.

You will:
- Write **for** and **while** loops
- Use **command-line arguments** (`$1`, `$2`, `$#`, `$@`)
- Install packages via script
- Add basic **error handling**

---

#### Expected Output
- A markdown file: `day-17-scripting.md`
- All scripts you write during the tasks

---

#### Challenge Tasks

##### Task 1: For Loop
1. Create `for_loop.sh` that:
   - Loops through a list of 5 fruits and prints each one
2. Create `count.sh` that:
   - Prints numbers 1 to 10 using a for loop

---

##### Task 2: While Loop
1. Create `countdown.sh` that:
   - Takes a number from the user
   - Counts down to 0 using a while loop
   - Prints "Done!" at the end

---

##### Task 3: Command-Line Arguments
1. Create `greet.sh` that:
   - Accepts a name as `$1`
   - Prints `Hello, <name>!`
   - If no argument is passed, prints "Usage: ./greet.sh <name>"

2. Create `args_demo.sh` that:
   - Prints total number of arguments (`$#`)
   - Prints all arguments (`$@`)
   - Prints the script name (`$0`)

---

##### Task 4: Install Packages via Script
1. Create `install_packages.sh` that:
   - Defines a list of packages: `nginx`, `curl`, `wget`
   - Loops through the list
   - Checks if each package is installed (use `dpkg -s` or `rpm -q`)
   - Installs it if missing, skips if already present
   - Prints status for each package

> Run as root: `sudo -i` or `sudo su`

---

##### Task 5: Error Handling
1. Create `safe_script.sh` that:
   - Uses `set -e` at the top (exit on error)
   - Tries to create a directory `/tmp/devops-test`
   - Tries to navigate into it
   - Creates a file inside
   - Uses `||` operator to print an error if any step fails

Example:
```bash
mkdir /tmp/devops-test || echo "Directory already exists"
```

2. Modify your `install_packages.sh` to check if the script is being run as root — exit with a message if not.

---

#### Hints
- For loop: `for item in list; do ... done`
- While loop: `while [ condition ]; do ... done`
- Arguments: `$1` first arg, `$#` count, `$@` all args
- Check root: `if [ "$EUID" -ne 0 ]; then echo "Run as root"; exit 1; fi`
- Check package: `dpkg -s <pkg> &> /dev/null && echo "installed"`

---

#### Documentation

Create `day-17-scripting.md` with:
- Each script's code and output
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-17-scripting.md` to `2026/day-17/`
2. Commit and push to your fork

---

#### Learn in Public

Share your scripting progress on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 17 – Shell Scripting: Loops, Arguments & Error Handling — Notes & Solution

#### 🎯 Objective

Today I practiced Bash scripting concepts that are commonly used in DevOps automation.

##### Topics Covered

- `for` loops
- `while` loops
- Command-line arguments
- User input
- Package installation
- Root user validation
- Error handling
- Bash arrays

---

##### Task 1: For Loop
1. Create `for_loop.sh` that:
   - Loops through a list of 5 fruits and prints each one
2. Create `count.sh` that:
   - Prints numbers 1 to 10 using a for loop

#### Loops through a list of 5 fruits and prints each one

<img width="967" height="287" alt="Screenshot 2026-08-09 184214" src="https://github.com/user-attachments/assets/7d780be2-0921-4454-bb8f-3d76d961d68c" />
<img width="1919" height="349" alt="Screenshot 2026-08-09 184006" src="https://github.com/user-attachments/assets/b4c54323-ec89-425b-8b7d-57900e6d6bee" />


#### Prints numbers 1 to 10 using a for loop

<img width="945" height="428" alt="Screenshot 2026-08-09 190053" src="https://github.com/user-attachments/assets/df57063a-b9d3-4415-9077-8a66160fe0fe" />
<img width="492" height="271" alt="Screenshot 2026-08-09 185815" src="https://github.com/user-attachments/assets/ee54f2e0-7e3e-4ed9-b8e9-038bab7b61f8" />


---

##### Task 2: While Loop
1. Create `countdown.sh` that:
   - Takes a number from the user
   - Counts down to 0 using a while loop
   - Prints "Done!" at the end
     
<img width="787" height="556" alt="Screenshot 2026-08-09 190702" src="https://github.com/user-attachments/assets/09b0c6bc-f34c-4d20-9e15-753ddd4de0f3" />
<img width="649" height="359" alt="Screenshot 2026-08-09 190445" src="https://github.com/user-attachments/assets/01019700-5adc-4b22-bf31-7de208e0de22" />


---

##### Task 3: Command-Line Arguments
1. Create `greet.sh` that:
   - Accepts a name as `$1`
   - Prints `Hello, <name>!`
   - If no argument is passed, prints "Usage: ./greet.sh <name>"

<img width="763" height="167" alt="Screenshot 2026-08-09 191300" src="https://github.com/user-attachments/assets/0a426349-30dc-40fc-882d-6a15cf0ae3e3" />
<img width="667" height="245" alt="Screenshot 2026-08-09 191211" src="https://github.com/user-attachments/assets/6f1063e6-651b-4a4b-bd38-af4271b218c9" />


2. Create `args_demo.sh` that:
   - Prints total number of arguments (`$#`)
   - Prints all arguments (`$@`)
   - Prints the script name (`$0`)
     
<img width="833" height="226" alt="Screenshot 2026-08-09 191559" src="https://github.com/user-attachments/assets/a5564676-1c77-43ba-a671-c95b4eea4377" />
<img width="539" height="168" alt="Screenshot 2026-08-09 191517" src="https://github.com/user-attachments/assets/3c5d8b90-5a54-482a-861d-1f42b9242154" />


---

##### Task 4: Install Packages via Script
1. Create `install_packages.sh` that:
   - Defines a list of packages: `nginx`, `curl`, `wget`
   - Loops through the list
   - Checks if each package is installed (use `dpkg -s` or `rpm -q`)
   - Installs it if missing, skips if already present
   - Prints status for each package

> Run as root: `sudo -i` or `sudo su`

<img width="932" height="246" alt="Screenshot 2026-08-09 192424" src="https://github.com/user-attachments/assets/58e6dbeb-9609-4a8b-8e6a-c612529e84a2" />
<img width="762" height="368" alt="Screenshot 2026-08-09 192324" src="https://github.com/user-attachments/assets/47e238ad-2a7a-46d9-949c-33b8fbe129b8" />

---
##### Task 5: Error Handling
1. Create `safe_script.sh` that:
   - Uses `set -e` at the top (exit on error)
   - Tries to create a directory `/tmp/devops-test`
   - Tries to navigate into it
   - Creates a file inside
   - Uses `||` operator to print an error if any step fails

Example:
```bash
mkdir /tmp/devops-test || echo "Directory already exists"
```

2. Modify your `install_packages.sh` to check if the script is being run as root — exit with a message if not.
   
<img width="1304" height="424" alt="Screenshot 2026-08-09 201111" src="https://github.com/user-attachments/assets/48a7a7e1-ea0c-41a8-a2de-eeb84e40c75d" />
<img width="876" height="378" alt="Screenshot 2026-08-09 201121" src="https://github.com/user-attachments/assets/aefe30fa-f6a7-4e6c-8c83-87692150ae19" />


---
#### What I Learned

* Used for loops to iterate over lists and number ranges
* Used while loops for countdown logic with user input
* Handled command-line arguments using $1, $#, $@, $0
* Added usage messages for missing arguments
* Took user input using read
* Automated package installation (nginx, curl, wget)
* Checked package status using dpkg -s
* Added root user validation using $EUID
* Implemented error handling with set -e and || (Or)
* Created safe scripts to avoid failures and overwrites
* Issue Faced & Lesson Learned: Used commas in a Bash array, causing the loop to fail, Learned that Bash arrays must be space-separated, not comma-separated

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Add a `--format csv|md` option. | You can demonstrate, without notes: *build a real log-analysis tool* — with evidence committed to `day-17/`. |
| 2 | Create a systemd timer that runs the report daily at 07:00. | You can demonstrate, without notes: *combine awk, sort, uniq, date, mail/Slack webhook* — with evidence committed to `day-17/`. |
| 3 | Document limitations and next steps. | You can demonstrate, without notes: *write tests and README for a script* — with evidence committed to `day-17/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| awk field numbers wrong | Log format differs; print `$0` and count fields; use `-F` to set delimiter. |
| Webhook fails | Check env var, JSON escaping, and network egress. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never hard-code webhook URLs or tokens. Read from environment or secret files with 600 permissions.
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

1. How do you compute error rate with awk?
2. Why avoid hard-coded secrets?
3. How would you test a Bash script?
4. How would you scale this to millions of lines?
5. **Scenario:** The SRE lead wants a daily email-like summary of web errors without installing an ELK stack yet. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a report from raw logs? | ☐ | ☐ | ☐ | ☐ |
| Can I schedule the script? | ☐ | ☐ | ☐ | ☐ |
| Do I have tests and README? | ☐ | ☐ | ☐ | ☐ |
| Build a real log-analysis tool | ☐ | ☐ | ☐ | ☐ |
| Combine awk, sort, uniq, date, mail/Slack webhook | ☐ | ☐ | ☐ | ☐ |
| Write tests and README for a script | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-17/` in your own repository:

```text
day-17/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-17
git add day-17/
git commit -m "day-17: bash project"
git push -u origin day-17
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

[← Day 16](../day-16/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 18 →](../day-18/README.md)
