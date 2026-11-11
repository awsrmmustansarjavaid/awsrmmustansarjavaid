# Day 18 — Python for DevOps: Basics, Virtual Environments & Files

[← Day 17](../day-17/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 19 →](../day-19/README.md)

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

- [ ] Set up Python projects properly (venv, pip, requirements)
- [ ] Use core data structures, functions and error handling
- [ ] Read/write files and run system commands

## 2. Prerequisites

- Day 15-17 helpful.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Why Python

Readable automation language for APIs, cloud SDKs, tooling and glue code. Know Python 3.12+.

### 3.2 Project hygiene

Use `python -m venv .venv`, pin dependencies, add `.gitignore`, follow PEP 8 and use `ruff`/`black`.

### 3.3 Core skills

lists, dicts, comprehension, functions, exceptions, `pathlib`, `subprocess.run(..., check=True)`, `argparse`, `logging`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create venv and install `requests` and `pyyaml`.
2. [ ] Write `disk_report.py` using `shutil.disk_usage` and argparse.
3. [ ] Parse `/etc/os-release` into a dict.
4. [ ] Run `systemctl is-active` with subprocess and handle failure.
5. [ ] Add logging and unit tests with pytest.

## 5. Real-World Scenario

> Operations needs a cross-platform script that checks disk usage thresholds and returns exit code 2 for warning. Build it in Python with tests.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install requests pyyaml pytest ruff
pip freeze > requirements.txt
python - <<'EOP'
import shutil, argparse, logging
p = argparse.ArgumentParser(); p.add_argument('--path', default='/'); p.add_argument('--warn', type=int, default=80)
a = p.parse_args(); u = shutil.disk_usage(a.path); pct = u.used*100//u.total
print(f"{a.path}: {pct}%"); raise SystemExit(2 if pct>=a.warn else 0)
EOP
ruff check . && pytest -q
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 18 – Shell Scripting: Functions & intermediate Concepts — Challenge Brief

#### Task
Write cleaner, reusable scripts — learn functions, strict mode, and real-world patterns.

You will:
- Write and call **functions**
- Use **`set -euo pipefail`** for safer scripts
- Work with **return values** and **local variables**
- Build an intermediate script

---

#### Expected Output
- A markdown file: `day-18-scripting.md`
- All scripts you write during the tasks

---

#### Challenge Tasks

##### Task 1: Basic Functions
1. Create `functions.sh` with:
   - A function `greet` that takes a name as argument and prints `Hello, <name>!`
   - A function `add` that takes two numbers and prints their sum
   - Call both functions from the script

---

##### Task 2: Functions with Return Values
1. Create `disk_check.sh` with:
   - A function `check_disk` that checks disk usage of `/` using `df -h`
   - A function `check_memory` that checks free memory using `free -h`
   - A main section that calls both and prints the results

---

##### Task 3: Strict Mode — `set -euo pipefail`
1. Create `strict_demo.sh` with `set -euo pipefail` at the top
2. Try using an **undefined variable** — what happens with `set -u`?
3. Try a command that **fails** — what happens with `set -e`?
4. Try a **piped command** where one part fails — what happens with `set -o pipefail`?

**Document:** What does each flag do?
- `set -e` →
- `set -u` →
- `set -o pipefail` →

---

##### Task 4: Local Variables
1. Create `local_demo.sh` with:
   - A function that uses `local` keyword for variables
   - Show that `local` variables don't leak outside the function
   - Compare with a function that uses regular variables

---

##### Task 5: Build a Script — System Info Reporter
Create `system_info.sh` that uses functions for everything:
1. A function to print **hostname and OS info**
2. A function to print **uptime**
3. A function to print **disk usage** (top 5 by size)
4. A function to print **memory usage**
5. A function to print **top 5 CPU-consuming processes**
6. A `main` function that calls all of the above with section headers
7. Use `set -euo pipefail` at the top

Output should look clean and readable.

---

#### Hints
- Function syntax: `function_name() { ... }`
- Local vars: `local MY_VAR="value"`
- Strict mode: `set -euo pipefail` as first line after shebang
- Pass args to functions: `greet "Shubham"` → access as `$1` inside
- `$?` gives the exit code of last command

---

#### Documentation

Create `day-18-scripting.md` with:
- Each script's code and output
- Explanation of `set -euo pipefail`
- What you learned (3 key points)

---

#### Submission
1. Add your scripts and `day-18-scripting.md` to `2026/day-18/`
2. Commit and push to your fork

---

#### Learn in Public

Share what you learned about shell functions and strict mode on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 18 – Shell Scripting: Functions & Intermediate Concepts — Notes & Solution

#### 🎯 Objective

##### Today I learned how to write reusable, cleaner, and safer Bash scripts.

* Topics Covered
- Bash Functions
- Function Arguments
- Local Variables
- Return Values / Exit Codes
- set -euo pipefail
- System Information Automation

---

##### 📝Task 1: Basic Functions
1. Create `functions.sh` with:
   - A function `greet` that takes a name as argument and prints `Hello, <name>!`
   - A function `add` that takes two numbers and prints their sum
   - Call both functions from the script

<img width="846" height="182" alt="Screenshot 2026-08-10 130150" src="https://github.com/user-attachments/assets/c2b6635c-2f62-4605-942d-166df8905a80" />

---

##### 📝Task 2: Functions with Return Values
1. Create `disk_check.sh` with:
   - A function `check_disk` that checks disk usage of `/` using `df -h`
   - A function `check_memory` that checks free memory using `free -h`
   - A main section that calls both and prints the results
     
<img width="845" height="233" alt="Screenshot 2026-08-10 130406" src="https://github.com/user-attachments/assets/2969bfed-c1a3-436a-89a1-1763cee42335" />


---

##### 📝Task 3: Strict Mode — `set -euo pipefail`
1. Create `strict_demo.sh` with `set -euo pipefail` at the top
2. Try using an **undefined variable** — what happens with `set -u`?
3. Try a command that **fails** — what happens with `set -e`?
4. Try a **piped command** where one part fails — what happens with `set -o pipefail`?

<img width="892" height="185" alt="Screenshot 2026-08-10 130607" src="https://github.com/user-attachments/assets/0919deca-7a1f-45ce-afd1-3d839ae3bbf5" />

**Document:** What does each flag do?

- `set -e` → Exit the script immediately if any command fails.
- `set -u` → Exit the script if an undefined (unset) variable is used.
- `set -o pipefail` → Pipeline fails if any command fails.

---

##### 📝Task 4: Local Variables
1. Create `local_demo.sh` with:
   - A function that uses `local` keyword for variables
   - Show that `local` variables don't leak outside the function
   - Compare with a function that uses regular variables
     
<img width="797" height="326" alt="Screenshot 2026-08-10 130724" src="https://github.com/user-attachments/assets/34445dc9-1abf-49b5-87ac-b390cec1b4f6" />

---

##### 📝Task 5: Build a Script — System Info Reporter
Create `system_info.sh` that uses functions for everything:
1. A function to print **hostname and OS info**
2. A function to print **uptime**
3. A function to print **disk usage** (top 5 by size)
4. A function to print **memory usage**
5. A function to print **top 5 CPU-consuming processes**
6. A `main` function that calls all of the above with section headers
7. Use `set -euo pipefail` at the top

Output should look clean and readable.

<img width="929" height="645" alt="Screenshot 2026-08-10 130928" src="https://github.com/user-attachments/assets/abce206d-3514-403f-9988-424b706541b9" />

---

#### Hints
- Function syntax: `function_name() { ... }`
- Local vars: `local MY_VAR="value"`
- Strict mode: `set -euo pipefail` as first line after shebang
- Pass args to functions: `greet "Amit"` → access as `$1` inside
- `$?` gives the exit code of last command

---

#### 🏆What I Learned

**Functions & Modularity** – Learned to create reusable, organized code blocks.This makes scripts cleaner, easier to read, and simpler to maintain.

**System Monitoring Scripts** – Explored fetching system info like memory,disk usage,and CPU processes.Useful for building quick automation for system health checks.

**Error Handling & Safety** – Using `set -euo pipefail` to catch undefined variables,failing commands,and pipeline errors early,making scripts more reliable.

**Variable Scope** – Understood the difference between local and global variables. Local variables stay inside functions, while global variables affect the wider script.

**Practical Automation** – Using a main function to orchestrate tasks helps make scripts modular,maintainable,and automation-friendly.

**Function Naming Pitfall** – Faced an issue where naming a function the same as a system command (uptime) caused an infinite loop.
Learned to avoid using system command names for functions.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Port your Day-17 report summary into Python. | You can demonstrate, without notes: *set up Python projects properly (venv, pip, requirements)* — with evidence committed to `day-18/`. |
| 2 | Create a `Makefile` with `setup`, `lint`, `test` targets. | You can demonstrate, without notes: *use core data structures, functions and error handling* — with evidence committed to `day-18/`. |
| 3 | Write README with usage. | You can demonstrate, without notes: *read/write files and run system commands* — with evidence committed to `day-18/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `ModuleNotFoundError` | Venv not activated or package not installed in this env. |
| `externally-managed-environment` | Use venv or `pipx`; don't pip install globally on Debian/Ubuntu. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Pin dependency versions, scan with `pip-audit`, never print secrets, use `subprocess` with list arguments (no `shell=True` on user input).
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

1. Why use virtualenvs?
2. Why avoid shell=True?
3. What does `check=True` do?
4. How do you handle exceptions?
5. **Scenario:** Operations needs a cross-platform script that checks disk usage thresholds and returns exit code 2 for warning. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create a Python project skeleton? | ☐ | ☐ | ☐ | ☐ |
| Can I run commands safely? | ☐ | ☐ | ☐ | ☐ |
| Do I have tests and lint? | ☐ | ☐ | ☐ | ☐ |
| Set up Python projects properly (venv, pip, requirements) | ☐ | ☐ | ☐ | ☐ |
| Use core data structures, functions and error handling | ☐ | ☐ | ☐ | ☐ |
| Read/write files and run system commands | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-18/` in your own repository:

```text
day-18/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-18
git add day-18/
git commit -m "day-18: python for devops"
git push -u origin day-18
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

## 18. Personal Learning Journal — 🛡️ Day 18 - SAST, SCA & SonarQube (Manual Code Analysis)

> Notes from my own 90-days journal for this day (merged from the *90days_DevOps_Challenge* repo).

#### 📅 Date

01 August 2026

---

### 🚀 Introduction

Today, I continued my DevSecOps journey by learning about **Static Application Security Testing (SAST)**, **Software Composition Analysis (SCA)**, and performing **manual code analysis using SonarQube**.

I learned how these security tools help developers identify vulnerabilities, code quality issues, and dependency risks early in the Software Development Life Cycle (SDLC), following the **Shift Left Security** approach.

---

### 📚 Topics Covered

- What is SAST?
- What is SCA?
- Shift Left Security
- SonarQube
- Manual Code Analysis
- Code Smells
- Bugs
- Vulnerabilities
- Security Hotspots
- Quality Gates
- Code Coverage
- Technical Debt

---

### 🔐 Shift Left Security

Shift Left Security means integrating security checks **early** in the software development lifecycle rather than waiting until deployment.

```text
Traditional Approach

Develop
     │
     ▼
Test
     │
     ▼
Deploy
     │
     ▼
Security ❌


Shift Left

Develop
     │
     ▼
Security ✅
     │
     ▼
Test
     │
     ▼
Deploy
```

##### Benefits

- Detect issues early
- Lower fixing costs
- Improve code quality
- Faster releases
- More secure applications

---

### 🔍 What is SAST?

**Static Application Security Testing (SAST)** scans the application's **source code** without executing it.

It helps identify security issues during development.

##### Detects

- SQL Injection
- Cross-Site Scripting (XSS)
- Hardcoded Secrets
- Weak Authentication Logic
- Buffer Overflow
- Insecure Coding Practices

##### Advantages

- Finds vulnerabilities early
- Faster feedback
- Easy CI/CD integration
- Improves secure coding practices

---

### 📦 What is SCA?

**Software Composition Analysis (SCA)** scans third-party libraries and open-source dependencies for known vulnerabilities.

Most modern applications rely heavily on external packages, making dependency scanning essential.

##### Detects

- Outdated libraries
- Vulnerable packages
- License compliance issues
- Dependency risks

##### Example

```text
Application
      │
      ▼
Dependencies

├── Spring Boot
├── Express.js
├── Flask
├── React
└── Log4j

↓

SCA scans these packages for known CVEs.
```

---

### 🛠️ SonarQube

SonarQube is a popular platform for continuous inspection of code quality and security.

It analyzes source code and generates detailed reports covering security, maintainability, and reliability.

##### SonarQube Can Detect

- Bugs
- Vulnerabilities
- Code Smells
- Duplicate Code
- Security Hotspots
- Technical Debt

---

### 🔎 Manual Code Analysis with SonarQube

Today, I performed manual code analysis using SonarQube.

##### Typical Workflow

1. Start SonarQube Server
2. Create a Project
3. Generate a Project Token
4. Run Sonar Scanner
5. Upload Results
6. Review Dashboard
7. Fix Reported Issues

---

### 📊 SonarQube Dashboard Metrics

#### 🐞 Bugs
Issues that may cause incorrect application behavior.

---

#### 🔐 Vulnerabilities
Security weaknesses that attackers could exploit.

---

#### ⚠️ Code Smells
Poor coding practices that reduce maintainability.

Examples:

- Long Methods
- Duplicate Code
- Unused Variables
- Complex Functions

---

#### 🔥 Security Hotspots

Potentially risky code that requires manual review.

Example:

```java
String password = request.getParameter("password");
```

This isn't necessarily a vulnerability but should be reviewed.

---

#### 📈 Code Coverage

Shows how much of the code is covered by automated tests.

Higher coverage generally improves confidence in code quality.

---

#### 🧾 Technical Debt

Represents the estimated effort required to fix maintainability issues in the codebase.

---

### 🚦 Quality Gates

Quality Gates define the minimum quality standards before code can be merged or deployed.

Common checks include:

- No critical vulnerabilities
- No blocker bugs
- Minimum code coverage
- No duplicated code beyond threshold

If the project fails the Quality Gate, developers should resolve the issues before proceeding.

---

### 🎯 Why SAST + SCA + SonarQube?

Using these together provides better application security.

- **SAST** → Finds vulnerabilities in source code.
- **SCA** → Finds vulnerabilities in third-party dependencies.
- **SonarQube** → Improves code quality, maintainability, and security.

Together, they help build secure, reliable, and production-ready applications.

---

### 🎯 Key Takeaways

- Learned the purpose of SAST and how it scans source code.
- Understood SCA for dependency and open-source package analysis.
- Performed manual code analysis using SonarQube.
- Learned about Bugs, Vulnerabilities, Code Smells, Security Hotspots, and Technical Debt.
- Understood the importance of Quality Gates and Shift Left Security.

---

### 📈 Progress

- ✅ Day 18 – SAST, SCA & SonarQube (Manual Code Analysis)

**Completed:** 18 / 90 Days 🚀

---

> **"The best time to fix a security issue is before it reaches production. Shift left, secure early, and build with confidence."** 🔐🚀


---

[← Day 17](../day-17/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 19 →](../day-19/README.md)
