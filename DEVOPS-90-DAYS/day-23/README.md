# Day 23 — Git Branching, Merging & GitHub Pull Requests

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 24 →](../day-24/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 4 — Git, GitHub & Engineering Workflow |
| **Difficulty** | Intermediate |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Create, switch and merge branches
- [ ] Resolve merge conflicts
- [ ] Use GitHub fork/clone/PR workflow

## 2. Prerequisites

- Day 22; GitHub SSH key (Day 11).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Branches

A branch is a movable pointer to a commit. Cheap branches enable isolated work. Fast-forward vs three-way merge.

### 3.2 Conflicts

Occur when the same lines change on both sides. Resolve markers `<<<<<<<`, test, `git add`, `git commit`.

### 3.3 GitHub flow

Branch -> commit -> push -> PR -> review -> checks -> merge -> delete branch.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create `feature/login`; make commits; merge into main.
2. [ ] Create a deliberate conflict in two branches and resolve it.
3. [ ] Push to GitHub and open a PR with description and checklist.
4. [ ] Review a PR (yours or a friend's) with inline comments.
5. [ ] Configure a PR template `.github/pull_request_template.md`.

## 5. Real-World Scenario

> Two engineers edited `config.yaml`. Resolve the conflict without losing either change and add a test/check that would have caught it.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git switch -c feature/login
git commit -am "feat: add login form"
git switch main && git merge --no-ff feature/login
git merge other  # conflict -> edit -> git add -> git commit
git remote add origin git@github.com:USER/devops-90-days.git
git push -u origin feature/login
git branch -d feature/login; git push origin --delete feature/login
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 23 – Git Branching & Working with GitHub — Challenge Brief

#### Task

Now that you know how to create repos, stage, and commit — it's time to learn the most powerful concept in Git: **branching**. Branches let you work on features, fixes, and experiments in isolation without breaking your main code. You'll also push your work to GitHub for the first time.

---

#### Expected Output
- A markdown file: `day-23-notes.md` with your answers
- Continue updating `git-commands.md` in your `devops-git-practice` repo
- Your practice repo pushed to GitHub

---

#### Challenge Tasks

##### Task 1: Understanding Branches
Answer these in your `day-23-notes.md`:
1. What is a branch in Git?
2. Why do we use branches instead of committing everything to `main`?
3. What is `HEAD` in Git?
4. What happens to your files when you switch branches?

---

##### Task 2: Branching Commands — Hands-On
In your `devops-git-practice` repo, perform the following:
1. List all branches in your repo
2. Create a new branch called `feature-1`
3. Switch to `feature-1`
4. Create a new branch and switch to it in a single command — call it `feature-2`
5. Try using `git switch` to move between branches — how is it different from `git checkout`?
6. Make a commit on `feature-1` that does **not** exist on `main`
7. Switch back to `main` — verify that the commit from `feature-1` is not there
8. Delete a branch you no longer need
9. Add all branching commands to your `git-commands.md`

---

##### Task 3: Push to GitHub
1. Create a **new repository** on GitHub (do NOT initialize it with a README)
2. Connect your local `devops-git-practice` repo to the GitHub remote
3. Push your `main` branch to GitHub
4. Push `feature-1` branch to GitHub
5. Verify both branches are visible on GitHub
6. Answer in your notes: What is the difference between `origin` and `upstream`?

---

##### Task 4: Pull from GitHub
1. Make a change to a file **directly on GitHub** (use the GitHub editor)
2. Pull that change to your local repo
3. Answer in your notes: What is the difference between `git fetch` and `git pull`?

---

##### Task 5: Clone vs Fork
1. **Clone** any public repository from GitHub to your local machine
2. **Fork** the same repository on GitHub, then clone your fork
3. Answer in your notes:
   - What is the difference between clone and fork?
   - When would you clone vs fork?
   - After forking, how do you keep your fork in sync with the original repo?

---

#### Hints
- When you create a branch, it starts from the commit you're currently on
- `git switch` is the modern alternative to `git checkout` for switching branches
- To push a new branch: `git push -u origin <branch-name>`
- A fork is a GitHub concept, not a Git concept

---

#### Submission
1. Add your `day-23-notes.md` to `2026/day-23/`
2. Update `git-commands.md` with all new commands and commit
3. Push to your fork

---

#### Learn in Public

Share your branching workflow and first GitHub push on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 23 – Git Branching & Working with GitHub — Notes & Solution

#### 🎯 Challenge Tasks

##### 🌿 Task 1: Understanding Branches

Answer these in your `day-23-notes.md`:

1. 🔹 What is a branch in Git?
2. 🔹 Why do we use branches instead of committing everything to `main`?
3. 🔹 What is `HEAD` in Git?
4. 🔹 What happens to your files when you switch branches?

#### 📝 Answer->

#### 1. 🌿 What is a branch in Git?
+ 🔹 A branch is a parallel workspace that lets you work on new features or fixes without touching the stable "main" code.
+ 🔹 Meanwhile a brach is a movaable pointer to a specific commit.
💡 Why it helps: It keeps your project organized and lets you experiment safely. If a branch breaks, you just delete it; your main code stays perfect.

#### 2. 🛡️ Why do we use branches instead of committing everything to `main`?
+ 🔹 Branches let us work on new features or fixes safely without breaking main branch, which always holds the stable, production-ready code.
+ 🔹 Main branch is highly important and stable so its best practice to not interrupt it.

#### 3. 📍 What is `HEAD` in Git?
+ 🔹 HEAD is a pointer that tells you where you are currently working.
+ 🔹 It always points to the latest commit on the branch you are working on.

#### 4. 🔄 What happens to your files when you switch branches?
+ 🔹 Git updates your project files to look like the branch you switched to.
+ 🔹 Files that exist in the current branch but not in the new branch will disappear temporarily.
+ 🔹 Files that are different in the new branch will be replaced with the new branch version.

---

##### 🌿 Task 2: Branching Commands — Hands-On

In your `devops-git-practice` repo, perform the following:

1. 📋 List all branches in your repo
- `git branch`

<img width="1915" height="506" alt="Screenshot 2026-08-14 124506" src="https://github.com/user-attachments/assets/dd34b09c-d417-4f53-9387-13f3777ee6b4" />


2. 🌱 Create a new branch called `feature-1`
- `git branch feature-1`

<img width="1053" height="262" alt="Screenshot 2026-08-14 124635" src="https://github.com/user-attachments/assets/e22b9578-b95f-4a28-aed2-7808a4d49869" />


3. 🔀 Switch to `feature-1`
- `git switch feature-1`

<img width="1629" height="179" alt="Screenshot 2026-08-14 125212" src="https://github.com/user-attachments/assets/a40ca041-c1e5-4555-9452-6758e56dcfa3" />

4. 🌱 Create a new branch and switch to it in a single command — call it `feature-2`
- `git checkout -b feature-2`

<img width="1045" height="96" alt="Screenshot 2026-08-14 124822" src="https://github.com/user-attachments/assets/eb9a3294-9f45-4380-908c-0f322c765808" />

5. 🔄 Try using `git switch` to move between branches — how is it different from `git checkout`?
- `git switch <branch>`   :only switches branches.  
- `git checkout <branch>` :switches branches and can also restore files.



6. 📝 Make a commit on `feature-1` that does **not** exist on `main`
- `git commit -m "Add git branch command section to git-commands.md"`

<img width="1598" height="162" alt="Screenshot 2026-08-14 125109" src="https://github.com/user-attachments/assets/d99b8631-249b-48dd-90fb-492818aa24d5" />

7. 🔙 Switch back to `main` — verify that the commit from `feature-1` is not there


9. 🗑️ Delete a branch you no longer need
- `git branch -d feature-2`
  
<img width="1489" height="322" alt="Screenshot 2026-08-14 125326" src="https://github.com/user-attachments/assets/aa6fe625-3488-4159-827d-2f58a29a1c38" />


9. 📚 Add all branching commands to your `git-commands.md`

---

##### 🚀 Task 3: Push to GitHub

1. 🆕 Create a **new repository** on GitHub (do NOT initialize it with a README)

<img width="1919" height="866" alt="Screenshot 2026-08-14 125453" src="https://github.com/user-attachments/assets/f2ef3e26-a30c-420c-883b-5d3eb2b96391" />


2. 🔗 Connect your local `devops-git-practice` repo to the GitHub remote
<img width="1303" height="174" alt="Screenshot 2026-08-14 141855" src="https://github.com/user-attachments/assets/db4a24a5-3fbd-424a-8feb-0be2e8d8a2c3" />


3. ⬆️ Push your `main` branch to GitHub
4. ⬆️ Push `feature-1` branch to GitHub
   
<img width="1882" height="652" alt="Screenshot 2026-08-14 142053" src="https://github.com/user-attachments/assets/25b06538-f28f-4ea4-b84b-544a871cd2ee" />


6. ✅ Verify both branches are visible on GitHub

<img width="1311" height="600" alt="Screenshot 2026-08-14 142235" src="https://github.com/user-attachments/assets/ec0349e9-dfdc-4e3c-8863-d18d358af96c" />


6. 📌 Answer in your notes: What is the difference between `origin` and `upstream`?

- 🔹 `origin`: origin is the default name for the repo you cloned,points to your own GitHub repository where you push and pull changes.
`example`: https\://github.com/amit5197/devops-git-practice.git
- 🔹 `upstream`: upstream refers to the original repository you forked from.You use it to pull updates from the original project into your fork.
`example`: https\://github.com/amit5197/90DaysOfDevOps

---

##### 🔄 Task 4: Pull from GitHub

1. ✏️ Make a change to a file **directly on GitHub** (use the GitHub editor)

2. ⬇️ Pull that change to your local repo

<img width="1336" height="574" alt="Screenshot 2026-08-14 142745" src="https://github.com/user-attachments/assets/32dca3bb-31ee-4ddf-b24d-da438bbee8a3" />

3. 📚 Answer in your notes: What is the difference between `git fetch` and `git pull`?

- 🔹 `git fetch` : Downloads changes from remote only; does not change your branch,just updates remote info.
  or `Git fetch` goes to the remote server (GitHub) and downloads all the new data.
  💡 What it does: Updates your remote-tracking branches (like `origin/main` ).
- 🔹 `git pull` : Downloads changes from remote and merges them into your current branch, updating your local branch immediately.
  💡 What it does: It downloads the new data AND tries to automatically stitch it into your current files.
  
---

##### 🔀 Task 5: Clone vs Fork

1. 📥 **Clone** any public repository from GitHub to your local machine

2. 🍴 **Fork** the same repository on GitHub, then clone your fork

- 🔹 `clone` : Download the project from GitHub to my computer.
- 🔹 `fork` : Make my own copy in of someone else’s project on GitHub.

3. 📝 Answer in your notes:

   1- 🔍 What is the difference between clone and fork?
   
         - 🔹 `clone` : Download the project from GitHub to my computer.
         - 🔹 `fork` : Make my own copy in of someone else’s project on GitHub.
     
   2- 🎯 When would you clone vs fork?
   
         - `clone when`:
             - ✅ You are working on your own project.
             - ✅ You already have write access.
             - ✅ You just want the code locally.
             - 💡 Example: Working in your company repo where you’re a team member.
   
        - `fork when`
             - ❌ You don’t have write access.
             - 🌍 You want to contribute to open source.
             - 🛡️ You want your own safe copy.
             - 💡 Example: Contributing to aws-containers repository retail-store-sample-app.


  3- 🔄 You don’t have write access.
         - 🌍 You want to contribute to open source.
         - 🛡️ You want your own safe copy.
         - 💡 Example: Contributing to aws-containers repository Uptime-kuma
   - 🔄 After forking, how do you keep your fork in sync with the original repo?

   - 🔗 After forking and cloning my fork, I add the original repository as an script.js remote. Then I fetch changes from script.js, merge the script.js default branch into my current branch,and push the updates to my fork.

      - 💻 Example:
        ```
        git remote add upstream git@github.com:Amit5197/Uptime-Kuma.git
        git checkout main
        git fetch script.js
        git merge script.js/main
        git push origin main
        ```

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a PR template and an issue template. | You can demonstrate, without notes: *create, switch and merge branches* — with evidence committed to `day-23/`. |
| 2 | Practise 3 conflicts of increasing difficulty. | You can demonstrate, without notes: *resolve merge conflicts* — with evidence committed to `day-23/`. |
| 3 | Write a short PR description guideline. | You can demonstrate, without notes: *use GitHub fork/clone/PR workflow* — with evidence committed to `day-23/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `failed to push some refs` | Remote has new commits; `git pull --rebase` then push. |
| Conflict markers committed | Search for `<<<<<<<` before commit; use pre-commit hook. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Use SSH or fine-grained tokens, enable 2FA, never force-push shared branches.
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

1. Fast-forward vs merge commit?
2. How do you resolve conflicts?
3. What belongs in a PR description?
4. Why delete merged branches?
5. **Scenario:** Two engineers edited `config. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I resolve a conflict? | ☐ | ☐ | ☐ | ☐ |
| Can I open and review a PR? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the GitHub flow? | ☐ | ☐ | ☐ | ☐ |
| Create, switch and merge branches | ☐ | ☐ | ☐ | ☐ |
| Resolve merge conflicts | ☐ | ☐ | ☐ | ☐ |
| Use GitHub fork/clone/PR workflow | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-23/` in your own repository:

```text
day-23/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-23
git add day-23/
git commit -m "day-23: git branching, merging & github pull requests"
git push -u origin day-23
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

[← Day 22](../day-22/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 24 →](../day-24/README.md)
