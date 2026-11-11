# Day 24 — Advanced Git: Rebase, Stash, Cherry-pick, Reset vs Revert & Reflog

[← Day 23](../day-23/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 25 →](../day-25/README.md)

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

- [ ] Choose between merge and rebase
- [ ] Recover lost work with reflog
- [ ] Use reset, revert, stash, cherry-pick, bisect

## 2. Prerequisites

- Day 23.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Rebase vs merge

Rebase rewrites commits onto a new base for linear history - only on unshared branches. Merge preserves history. Interactive rebase (`-i`) squashes/fixup/reorders.

### 3.2 Undo toolbox

`reset --soft/--mixed/--hard` moves HEAD (local); `revert` creates a new commit that undoes a change (safe for shared branches); `reflog` finds lost commits.

### 3.3 Other tools

`stash` parks work, `cherry-pick` copies commits (hotfix backports), `bisect` finds the commit that introduced a bug.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Make 5 messy commits and squash into 2 with `git rebase -i`.
2. [ ] Hard reset by mistake, then recover with `git reflog`.
3. [ ] Revert a bad commit on main.
4. [ ] Cherry-pick a fix from `main` to `release/1.0`.
5. [ ] Use `git bisect` with a small test script to locate a bug commit.

## 5. Real-World Scenario

> A faulty change reached `main` and is already pulled by 10 people. Fix safely without rewriting history, and backport the fix to the release branch.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git rebase -i HEAD~5
git reset --hard HEAD~1; git reflog; git reset --hard HEAD@{1}
git revert <sha>
git cherry-pick <sha>
git stash push -m "wip"; git stash list; git stash pop
git bisect start; git bisect bad; git bisect good v1.0; git bisect run ./test.sh
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 24 – Advanced Git: Merge, Rebase, Stash & Cherry Pick — Challenge Brief

#### Task

You know how to branch and push to GitHub. Now it's time to learn how branches come back together — and what to do when you're in the middle of something and need to context-switch. These are the Git skills that separate beginners from confident practitioners.

---

#### Expected Output
- A markdown file: `day-24-notes.md` with your observations and answers
- Continue updating `git-commands.md` in your `devops-git-practice` repo

---

#### Challenge Tasks

##### Task 1: Git Merge — Hands-On
1. Create a new branch `feature-login` from `main`, add a couple of commits to it
2. Switch back to `main` and merge `feature-login` into `main`
3. Observe the merge — did Git do a **fast-forward** merge or a **merge commit**?
4. Now create another branch `feature-signup`, add commits to it — but also add a commit to `main` before merging
5. Merge `feature-signup` into `main` — what happens this time?
6. Answer in your notes:
   - What is a fast-forward merge?
   - When does Git create a merge commit instead?
   - What is a merge conflict? (try creating one intentionally by editing the same line in both branches)

---

##### Task 2: Git Rebase — Hands-On
1. Create a branch `feature-dashboard` from `main`, add 2-3 commits
2. While on `main`, add a new commit (so `main` moves ahead)
3. Switch to `feature-dashboard` and rebase it onto `main`
4. Observe your `git log --oneline --graph --all` — how does the history look compared to a merge?
5. Answer in your notes:
   - What does rebase actually do to your commits?
   - How is the history different from a merge?
   - Why should you **never rebase commits that have been pushed and shared** with others?
   - When would you use rebase vs merge?

---

##### Task 3: Squash Commit vs Merge Commit
1. Create a branch `feature-profile`, add 4-5 small commits (typo fix, formatting, etc.)
2. Merge it into `main` using `--squash` — what happens?
3. Check `git log` — how many commits were added to `main`?
4. Now create another branch `feature-settings`, add a few commits
5. Merge it into `main` **without** `--squash` (regular merge) — compare the history
6. Answer in your notes:
   - What does squash merging do?
   - When would you use squash merge vs regular merge?
   - What is the trade-off of squashing?

---

##### Task 4: Git Stash — Hands-On
1. Start making changes to a file but **do not commit**
2. Now imagine you need to urgently switch to another branch — try switching. What happens?
3. Use `git stash` to save your work-in-progress
4. Switch to another branch, do some work, switch back
5. Apply your stashed changes using `git stash pop`
6. Try stashing multiple times and list all stashes
7. Try applying a specific stash from the list
8. Answer in your notes:
   - What is the difference between `git stash pop` and `git stash apply`?
   - When would you use stash in a real-world workflow?

---

##### Task 5: Cherry Picking
1. Create a branch `feature-hotfix`, make 3 commits with different changes
2. Switch to `main`
3. Cherry-pick **only the second commit** from `feature-hotfix` onto `main`
4. Verify with `git log` that only that one commit was applied
5. Answer in your notes:
   - What does cherry-pick do?
   - When would you use cherry-pick in a real project?
   - What can go wrong with cherry-picking?

---

#### Hints
- Visualize history: `git log --oneline --graph --all`
- To intentionally create a merge conflict: edit the **same line** of the **same file** on two branches
- Stash with a message: `git stash push -m "description"`
- Cherry-pick needs a commit hash — find it with `git log --oneline`

---

#### Submission
1. Add your `day-24-notes.md` to `2026/day-24/`
2. Update `git-commands.md` with all new commands and commit
3. Push to your fork

---

#### Learn in Public

Share your merge vs rebase comparison on LinkedIn — a diagram or screenshot of `git log --graph` goes a long way!

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀Day 24 – Advanced Git: Merge, Rebase, Stash & Cherry Pick — Notes & Solution

#### 🎯 Challenge Tasks

##### 🔀 Task 1A: Git Merge — Hands-On
1. Create a new branch `feature-login` from `main`, add a couple of commits to it

```
# Create and switch to the new branch
` git checkout -b feature-login `

# Create a file and commit
` echo "This is my login page" > login.txt `
` git add login.txt ` 
` git commit -m "Add login logic" `

# Add a second commit
echo "Login styles" >> login.txt
git commit -am "Add login styles"
```
<img width="1538" height="659" alt="Screenshot 2026-08-16 120011" src="https://github.com/user-attachments/assets/254598a2-85ea-401f-a21b-0ac11a7e9485" />
<img width="1329" height="534" alt="Screenshot 2026-08-16 120141" src="https://github.com/user-attachments/assets/89aff806-28f7-4c9d-8f56-8beb0664c8e7" />

2. Switch back to `main` and merge `feature-login` into `main`
#### Switch back to main
` git checkout main `

#### Merge the feature branch
` git merge feature-login `

3. Observe the merge — did Git do a **fast-forward** merge or a **merge commit**?
` fast-forward `
+ What happened? You will likely see the message Fast-forward.
Since main had no new commits of its own, Git didn't need to combine any divergent histories; it just pointed main to the same commit as feature-login.



<img width="1199" height="485" alt="Screenshot 2026-08-16 120650" src="https://github.com/user-attachments/assets/3f8f416c-7678-4b55-9018-fd6846cbb249" />

4. Now create another branch `feature-signup`, add commits to it — but also add a commit to `main` before merging

<img width="1407" height="642" alt="Screenshot 2026-08-16 121117" src="https://github.com/user-attachments/assets/94c54fac-599c-4f0a-a4fd-d6fd35c9b561" />

5. Merge `feature-signup` into `main` — what happens this time?

#### Merge feature-signup into main
` git merge feature-signup `

#### ⚔️Task 1B — Force a Merge Commit

Now we'll create the situation where branches diverge.

Step 1: Create feature-signup
` git switch -c feature-signup `

Step 2: Create a file:

`echo "This is my signup page" > signup.txt`
` git add signup.txt`
`git commit -m "Add signup page"`

<img width="1407" height="642" alt="Screenshot 2026-08-16 121117" src="https://github.com/user-attachments/assets/19cccad3-f87d-48e0-812c-c1ef5c00350c" />

Step 3: Add another commit:
`echo "Signup validation" >> signup.txt`
`git add signup.txt`
`git commit -m "Add signup validation"`

<img width="1519" height="543" alt="Screenshot 2026-08-16 121258" src="https://github.com/user-attachments/assets/73d5adc8-f50a-4007-8a1c-c289ba29f1c3" />

Step 4: Go to main
`git switch main`
Step 5: Now make a commit on main:

`echo "Main branch update" > main-update.txt`
`git add main-update.txt`
`git commit -m "Update main branch"`

<img width="1447" height="618" alt="Screenshot 2026-08-16 121514" src="https://github.com/user-attachments/assets/4e28e413-eb4b-43ea-86e3-978758aef3ae" />

Step 6: Merge signup
`git merge feature-signup`

This time Git should create a merge commit.
`git log --oneline --graph --all`
<img width="1195" height="467" alt="Screenshot 2026-08-16 121735" src="https://github.com/user-attachments/assets/c8dcd9e6-85be-4726-ae09-558157cf31fd" />

#### ⚔️Task 1C — Create a Merge Conflict
1. First create a file on main: i.e conflict.txt
<img width="1335" height="566" alt="Screenshot 2026-08-16 122615" src="https://github.com/user-attachments/assets/ae5bd2f4-674d-4a50-aff8-4b8143cd23d4" />

2. Create a branch: feature-conflict
<img width="1153" height="91" alt="Screenshot 2026-08-16 122624" src="https://github.com/user-attachments/assets/cc0b3492-0a91-4ad0-a5ac-53041435091b" />

3. Change the same line
  <img width="1131" height="514" alt="Screenshot 2026-08-16 122806" src="https://github.com/user-attachments/assets/6ebaf2e8-148d-4b82-8f04-e2b14d3aa400" />

4. git switch main
5. Change the same line differently
6. Now merge:
<img width="1280" height="641" alt="Screenshot 2026-08-16 123341" src="https://github.com/user-attachments/assets/fdd8fee3-0128-4948-b6e1-c0656be53bd0" />
<img width="854" height="160" alt="Screenshot 2026-08-16 123407" src="https://github.com/user-attachments/assets/d9dfb746-9f37-4959-ae6b-6235e53ebac4" />

7. Choose the version you want and add and commit this file.
8. Now you see merge conflict resolved.
 <img width="1114" height="360" alt="Screenshot 2026-08-16 123848" src="https://github.com/user-attachments/assets/f9fe96d7-1355-4e58-9a71-b98e1399c876" />

---

##### 🔄Task 2: Git Rebase — Hands-On
1. Create a branch `feature-dashboard` from `main`, add 2-3 commits
+ Create a branch feature-dashboard from main, add 2-3 commits
  + ``` git checkout -b feature-dashboard ```

<img width="1212" height="449" alt="Screenshot 2026-08-16 124340" src="https://github.com/user-attachments/assets/7d9bcd72-ce71-476e-b16e-7493fae9f716" />
2.While on main, add a new commit (so main moves ahead)

<img width="1119" height="269" alt="Screenshot 2026-08-16 124548" src="https://github.com/user-attachments/assets/c83f51b2-f374-4468-bcb4-6a3724d822b7" />

3.Switch to feature-dashboard and rebase it onto main
`git checkout -b feature-dashboard`
`git rebase main`
4. Observe your git log --oneline --graph --all — how does the history look compared to a merge?
   git merge creates a branching history with a merge commit while rebase creates a linear history by rewriting commits without merge commit.
<img width="1285" height="647" alt="Screenshot 2026-08-16 124634" src="https://github.com/user-attachments/assets/df521e29-903c-41e8-b49e-5266fbd4dd78" />

5. Answer in your notes:
   - What does rebase actually do to your commits?
      - Rebase "rewrites history" by taking your feature-dashboard branch commits and replaying them one by one on top of the latest version of main.
      or- Rebase rewrites your commits by replaying them on top of another branch , creating new commit ids and changing their base.
      or - Git Rebase is the process of moving or combining a sequence of commits to a new base commit. It effectively "rewrites" the history of your branch.

    - How is the history different from a merge?
      - `merge`preserves history exactly as it happened.creates a merge commit.
      - `rebase`rewrites history. moves your commits on top of feature-dashboard branch,creates a linear,clean history.no merge commit.
      - or difference between Merge and Rebase lies in how they treat time and the "story" of your project.
   
   - Why should you **never rebase commits that have been pushed and shared** with others?
      - because rebase changes commit id's, if others pulled the old commits:their history won’t match yours anymore causes conflicts,duplicated commits.

   - When would you use rebase vs merge?

      - `rebase`: keeping history linear
      or- we can rebase when we are working on private or a local branch
      - `merge`: working on shared branches.you want full history preserved.
      or- merge for safe collabration and shared branches

---

##### 🧹Task 3: Squash Commit vs Merge Commit
1. Create a branch `feature-profile`, add 4-5 small commits (typo fix, formatting, etc.)
<img width="1406" height="577" alt="Screenshot 2026-08-16 125324" src="https://github.com/user-attachments/assets/0d4ea314-8214-4b15-9de8-50c2d65f20dc" />

2. Merge it into `main` using `--squash` — what happens?
3. Check `git log` — how many commits were added to `main`?
<img width="1161" height="642" alt="Screenshot 2026-08-16 125607" src="https://github.com/user-attachments/assets/4ef65d28-a8c3-4557-9988-d6220386cf42" />
   
4. Now create another branch `feature-settings`, add a few commits
5. Merge it into `main` **without** `--squash` (regular merge) — compare the history
<img width="1437" height="533" alt="Screenshot 2026-08-16 130038" src="https://github.com/user-attachments/assets/becb2649-88f4-46ac-8d29-ce70d26c75a1" />
<img width="928" height="460" alt="Screenshot 2026-08-16 130047" src="https://github.com/user-attachments/assets/83024e38-f3bd-492c-9c33-2aadde4cc54d" />

6. Answer in your notes:

   - What does squash merging do?
   + A sqaush merge applies the changes of a branch but not its individual commit history

   - When would you use squash merge vs regular merge?
    + use squash merge for a clean, simplified history.
    + and use regular merge when you need to preserve full commit history.
   
   - What is the trade-off of squashing?
   + `trade-off` squashing is cleaner history at the cost if losing detailed commit .
   + or - The `trade-off` of squashing is that while it keeps the main branch history clean and linear,it removes the detailed commit history of the feature branch by combining everything into a single commit.

---

##### 📦 Task 4: Git Stash — Hands-On
1. Start making changes to a file but **do not commit**
2. Now imagine you need to urgently switch to another branch — try switching. What happens?
3. Use `git stash` to save your work-in-progress
4. Switch to another branch, do some work, switch back
5. Apply your stashed changes using `git stash pop`
6. Try stashing multiple times and list all stashes
7. Try applying a specific stash from the list
   
 <img width="1259" height="513" alt="Screenshot 2026-08-16 130607" src="https://github.com/user-attachments/assets/346c15a1-a224-4970-93f1-acc79e71e098" />

8. Answer in your notes:
   - What is the difference between `git stash pop` and `git stash apply`?

      `git stash pop`: brings your stashed changes back to your working directory.deletes that entry from your stash list immediately.

      `git stash apply`: brings the stashed changes back to your working directory.keeps the entry in your stash list.

   - When would you use stash in a real-world workflow?
      - If I’m working on a feature and need to urgently switch branches to fix a production bug,I would use git stash to temporarily save my unfinished changes before switching.

---

##### 🍒Task 5: Cherry Picking
1. Create a branch `feature-hotfix`, make 3 commits with different changes
 <img width="1236" height="400" alt="Screenshot 2026-08-16 132254" src="https://github.com/user-attachments/assets/9769e3c0-6f76-4892-98ec-87d17b5a2cba" />
2. Switch to `main`
3. Cherry-pick **only the second commit** from `feature-hotfix` onto `main`
4. Verify with `git log` that only that one commit was applied  
<img width="1914" height="260" alt="Screenshot 2026-08-16 132635" src="https://github.com/user-attachments/assets/f0ab4424-6a43-48bc-b78d-c52925abee38" />
<img width="965" height="476" alt="Screenshot 2026-08-16 133224" src="https://github.com/user-attachments/assets/aa5210a0-fc84-4545-ae39-7e77cc5b7ef5" />
6. Answer in your notes:
   - What does cherry-pick do?
   + git cherry-pick is like copy-pasting a specific commit from one branch to another.
   + or - copy a specific commit from one branch and apply it onto our current branch.
    
   - When would you use cherry-pick in a real project?
   + when i need specific commit but do not want the enitre branch to be commit.
     
   - What can go wrong with cherry-picking?
   + merge conflicts if same file was modified.
   + Commit history confusion because it creates new commit ids.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a decision table: reset vs revert vs restore. | You can demonstrate, without notes: *choose between merge and rebase* — with evidence committed to `day-24/`. |
| 2 | Document your team's rebase rules. | You can demonstrate, without notes: *recover lost work with reflog* — with evidence committed to `day-24/`. |
| 3 | Remove an accidentally committed secret with `git filter-repo` in a sandbox (and explain why rotation is mandatory). | You can demonstrate, without notes: *use reset, revert, stash, cherry-pick, bisect* — with evidence committed to `day-24/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Lost commits after reset | `git reflog` then `git branch rescue <sha>`. |
| Rebase conflict loop | `git rebase --abort`, resolve carefully, or use merge. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Removing a secret from history does NOT make it safe; assume compromised and rotate. Never rebase published branches.
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

1. reset vs revert?
2. When to rebase?
3. What is reflog?
4. How does bisect work?
5. **Scenario:** A faulty change reached `main` and is already pulled by 10 people. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I recover a deleted commit? | ☐ | ☐ | ☐ | ☐ |
| Can I squash commits? | ☐ | ☐ | ☐ | ☐ |
| Can I explain reset modes? | ☐ | ☐ | ☐ | ☐ |
| Choose between merge and rebase | ☐ | ☐ | ☐ | ☐ |
| Recover lost work with reflog | ☐ | ☐ | ☐ | ☐ |
| Use reset, revert, stash, cherry-pick, bisect | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-24/` in your own repository:

```text
day-24/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-24
git add day-24/
git commit -m "day-24: advanced git"
git push -u origin day-24
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

[← Day 23](../day-23/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 25 →](../day-25/README.md)
