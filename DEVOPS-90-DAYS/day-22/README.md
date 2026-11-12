# Day 22 — Git Fundamentals: Your First Repository

[← Day 21](../day-21/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 23 →](../day-23/README.md)

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

- [ ] Explain the Git object model at a high level
- [ ] Use init, add, commit, status, diff, log
- [ ] Write professional commit messages

## 2. Prerequisites

- Day 1 (git installed).
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 How Git works

Git stores snapshots as content-addressed objects (blob, tree, commit). The working tree, staging area (index) and repository are three separate states.

### 3.2 Core workflow

`git status` -> `git add -p` -> `git commit -m` -> `git log --oneline --graph`. Commit small, logical changes.

### 3.3 Commit hygiene

Imperative subject <= 50 chars, body explains why. Use `.gitignore` and never commit secrets or build artefacts.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] `git config --global user.name/email` and `init.defaultBranch main`.
2. [ ] Create a repo, add README, commit.
3. [ ] Modify files; use `git diff`, `git diff --staged`.
4. [ ] Undo a change with `git restore` and unstage with `git restore --staged`.
5. [ ] Create `.gitignore`; practice `git log -p`, `git show`, `git blame`.

## 5. Real-World Scenario

> A teammate asks 'who changed this config line and why?' Use blame/log to find the commit, author and reasoning.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git init demo && cd demo
git add -p && git commit -m "Add initial README"
git log --oneline --graph --decorate
git diff --staged; git restore --staged file; git restore file
git blame -L 1,10 README.md
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 22 – Introduction to Git: Your First Repository — Challenge Brief

#### Task

Today marks the beginning of your Git journey. Git is the backbone of modern DevOps — every tool, pipeline, and workflow revolves around version control. Before diving into advanced concepts, you need to get comfortable with the basics by doing.

You will:
- Understand what Git is and why it matters
- Set up your first Git repository from scratch
- Start building a living document of Git commands

---

#### Expected Output
- A local Git repository with a clean commit history
- A file called `git-commands.md` that you will keep updating in future days
- A file called `day-22-notes.md` with your answers

---

#### Challenge Tasks

##### Task 1: Install and Configure Git
1. Verify Git is installed on your machine
2. Set up your Git identity — name and email
3. Verify your configuration

---

##### Task 2: Create Your Git Project
1. Create a new folder called `devops-git-practice`
2. Initialize it as a Git repository
3. Check the status — read and understand what Git is telling you
4. Explore the hidden `.git/` directory — look at what's inside

---

##### Task 3: Create Your Git Commands Reference
1. Create a file called `git-commands.md` inside the repo
2. Add the Git commands you've used so far, organized by category:
   - **Setup & Config**
   - **Basic Workflow**
   - **Viewing Changes**
3. For each command, write:
   - What it does (1 line)
   - An example of how to use it

---

##### Task 4: Stage and Commit
1. Stage your file
2. Check what's staged
3. Commit with a meaningful message
4. View your commit history

---

##### Task 5: Make More Changes and Build History
1. Edit `git-commands.md` — add more commands as you discover them
2. Check what changed since your last commit
3. Stage and commit again with a different, descriptive message
4. Repeat this process at least **3 times** so you have multiple commits in your history
5. View the full history in a compact format

---

##### Task 6: Understand the Git Workflow
Answer these questions in your own words (add them to a `day-22-notes.md` file):
1. What is the difference between `git add` and `git commit`?
2. What does the **staging area** do? Why doesn't Git just commit directly?
3. What information does `git log` show you?
4. What is the `.git/` folder and what happens if you delete it?
5. What is the difference between a **working directory**, **staging area**, and **repository**?

---

#### Ongoing Task

**Keep updating `git-commands.md` every day** as you learn new Git commands in the upcoming days. This will become your personal Git reference. Maintain a clean commit history — one commit per update with a clear message.

---

#### Hints
- All you need today are about 8-10 Git commands — Google them, try them, break things
- Read what `git status` tells you — it's your best friend
- Use `man git-<command>` or `git <command> --help` to explore

---

#### Submission
1. Share a screenshot of your `git log --oneline` output showing multiple commits
2. Add your `day-22-notes.md` to `2026/day-22/`
3. Commit and push to your fork
4. Add your submission for Community Builder of the week on discord

---

#### Learn in Public

Share your first Git repo and commit history on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🚀 Day 22 – Introduction to Git: Your First Repository — Notes & Solution

> 💡 **What is Git?**
>
> Git is a **Distributed Version Control System (DVCS)** that tracks changes made to files, maintains version history, and helps developers collaborate effectively.

---

#### ⚙️ Task 1: Install and Configure Git

##### 🎯 Objectives

1. ✅ Verify Git is installed on the machine.
2. 👤 Set up Git identity — name and email.
3. 🔍 Verify the Git configuration.

##### 💻 Commands Used

```bash
git --version

git config --global user.name "Your Name"

git config --global user.email "your-email@example.com"

git config --global --list
```

##### 📸 Output

<img width="1178" height="217" alt="Git Configuration" src="https://github.com/user-attachments/assets/28fba70c-f9e8-4fad-803c-ba845a38f954" />

---

#### 📁 Task 2: Create Your Git Project

##### 🎯 Objectives

1. 📂 Create a folder called `devops-git-practice`.
2. 🚀 Initialize it as a Git repository.
3. 🔍 Check the repository status.
4. 👀 Explore the hidden `.git/` directory.

##### 💻 Commands Used

```bash
mkdir devops-git-practice

cd devops-git-practice

git init

git status

ls -la
```

##### 💡 What I Learned

* 🚀 `git init` initializes a new Git repository.
* 🔍 `git status` shows the current state of the repository.
* 📦 `.git/` contains Git's internal repository information.
* 👻 `ls -la` displays hidden files and directories.

##### 📸 Screenshots

<img width="1086" height="626" alt="Git Repository Initialization" src="https://github.com/user-attachments/assets/7aec2d1a-ec25-4072-ba0f-3b6015117ddc" />

<img width="812" height="270" alt="Git Status and .git Directory" src="https://github.com/user-attachments/assets/42c313f8-d6ce-4c55-926f-cc98d5c76efc" />

---

#### 📝 Task 3: Create Your Git Commands Reference

Created:

```text
📄 git-commands.md
```

The commands are organized into:

* ⚙️ **Setup & Config**
* 🔄 **Basic Workflow**
* 🔍 **Viewing Changes**

---

#### ⚙️ Setup & Config

##### 🚀 `git init`

Initializes a new Git repository.

**Example:**

```bash
git init
```

---

##### ⚙️ `git config`

Configures Git username and email.

**Example:**

```bash
git config --global user.name "Your Name"

git config --global user.email "Your Email"
```

##### 🔍 View Configuration

```bash
git config --global --list
```

Displays the configured Git settings.

---

#### 🔄 Basic Workflow

##### 📥 `git add`

Stages files for the next commit.

**Example:**

```bash
git add git-commands.md
```

To stage all changes:

```bash
git add .
```

---

##### 💾 `git commit`

Saves staged changes with a message explaining what was changed.

**Example:**

```bash
git commit -m "Add Git commands reference"
```

---

#### 🔍 Viewing Changes

##### 📊 `git status`

Shows which files are:

* 🆕 Untracked
* ✏️ Modified
* 📥 Staged
* ✅ Ready to commit

**Example:**

```bash
git status
```

---

##### 📜 `git log`

Shows the commit history of the repository.

It can display:

* 🔑 Commit hash
* 👤 Author
* 📅 Date
* 📝 Commit message

**Example:**

```bash
git log
```

##### ⚡ Compact History

```bash
git log --oneline
```

---

#### 📦 Task 4: Stage and Commit

##### 1️⃣ Stage the file

```bash
git add git-commands.md
```

##### 2️⃣ Check what is staged

```bash
git status
```

Example:

```text
On branch master

No commits yet

Changes to be committed:

    new file: git-commands.md
```

##### 3️⃣ Create the commit

```bash
git commit -m "Initial Git command reference"
```

##### 4️⃣ View commit history

```bash
git log
```

---

#### 🔄 Task 5: Make More Changes and Build History

##### 🎯 Objectives

1. ✏️ Edit `git-commands.md`.
2. 🔍 Check what changed.
3. 📥 Stage the changes.
4. 💾 Commit with a descriptive message.
5. 🔁 Repeat at least **3 times**.
6. 📜 View the complete history using `git log --oneline`.

##### 💻 Workflow

```bash
git status

git diff

git add .

git status

git commit -m "Update Git commands"

git log --oneline
```

##### 📸 Commit History

<img width="1192" height="328" alt="Git Commit History" src="https://github.com/user-attachments/assets/302f1cb3-191e-4b29-bcfc-5fc0a7b2c08f" />

##### 💡 What I Learned

Creating multiple commits helped me understand how Git tracks changes over time.

Each commit acts as a **checkpoint** that represents the state of the project at a specific point in time.

---

#### 🧠 Task 6: Understand the Git Workflow

#### 1️⃣ What is the difference between `git add` and `git commit`?

##### 📥 `git add`

`git add` tells Git which changes should be included in the next commit.

It moves changes from the **Working Directory → Staging Area**.

```bash
git add filename
```

##### 💾 `git commit`

`git commit` saves the staged changes as a permanent snapshot in the Git repository.

```bash
git commit -m "Meaningful commit message"
```

##### 💡 In Simple Words

```text
git add     → 📥 Select changes
git commit  → 💾 Save changes
```

---

#### 2️⃣ What does the Staging Area do?

The **Staging Area** is a preparation area between the Working Directory and Repository.

Think of it as a **🪑 waiting room for changes**.

It allows us to choose exactly which changes should be included in the next commit.

##### Why is it useful?

* 🎯 Select specific changes.
* 🧹 Create clean commits.
* 📦 Group related changes.
* 🔍 Review changes before committing.

---

#### 3️⃣ What information does `git log` show?

`git log` displays the commit history of the repository.

It can show:

* 🔑 Commit ID / Hash
* 👤 Author
* 📅 Date
* 📝 Commit message

##### Example

```bash
git log
```

For compact history:

```bash
git log --oneline
```

Example:

```text
a12bc34 Update Git notes
b45cd67 Add Git commands
c78de90 Initial commit
```

---

#### 4️⃣ What is the `.git/` folder?

The `.git/` folder is created when we run:

```bash
git init
```

It contains Git's internal repository information, including:

* 📜 Commit objects
* 🌿 Branch information
* 🏷️ Tags
* ⚙️ Repository configuration
* 📌 HEAD information
* 🗃️ Git metadata

##### ⚠️ What happens if `.git/` is deleted?

If `.git/` is deleted:

* 📁 Project files remain.
* ❌ Git no longer recognizes the directory as a repository.
* 🗑️ Local Git history and metadata are lost.

> ⚠️ **Never delete `.git/` unless you intentionally want to remove the local Git repository.**

---

#### 🔄 5️⃣ Working Directory vs Staging Area vs Repository

#### 📂 Working Directory

The **Working Directory** is where we create and modify project files.

Example:

```text
devops-git-practice/
├── 📄 git-commands.md
└── 📄 day-22-notes.md
```

---

#### 📥 Staging Area

The **Staging Area**, also called the **Index**, is the preparation zone between the Working Directory and Repository.

When we run:

```bash
git add .
```

the selected changes are added to the Staging Area.

---

#### 🗃️ Repository

The **Repository** contains the committed project history.

Git stores this information inside:

```text
.git/
```

When we run:

```bash
git commit -m "Add Git notes"
```

the staged changes are recorded as a new commit.

---

#### 🔄 Git Workflow

```text
📂 Working Directory
       │
       │ ✏️ Edit files
       │
       │ git add
       ▼
📥 Staging Area
       │
       │ 🔍 Review / Prepare
       │
       │ git commit
       ▼
🗃️ Repository
       │
       │ 📜 Permanent History
       ▼
🌐 GitHub
```

##### ⭐ In One Line

```text
📂 Working Directory → 📥 git add → 🗃️ Staging Area → 💾 git commit → 📜 Repository → 🌐 GitHub
```

---

#### 📚 Commands Practiced Today

```bash
git --version

git config --global user.name "Your Name"

git config --global user.email "your-email@example.com"

git config --global --list

git init

git status

git add .

git add <filename>

git commit -m "commit message"

git log

git log --oneline

ls -la
```

---

#### 🎯 Key Learnings

Today I learned the fundamentals of Git:

* 🚀 Git is a Distributed Version Control System.
* 📁 `git init` creates a new Git repository.
* 🔍 `git status` shows the current repository state.
* 📥 `git add` moves changes to the Staging Area.
* 💾 `git commit` saves staged changes as a snapshot.
* 📜 `git log` displays commit history.
* 🗃️ `.git/` contains Git's internal repository information.
* 🎯 The Staging Area gives control over what goes into a commit.
* 🔄 Multiple commits create a useful project history.

---

#### ✅ Day 22 Completed

I successfully created my first Git repository and practiced the basic Git workflow:

```text
📂 Create
   ↓
✏️ Modify
   ↓
📥 git add
   ↓
📦 Staging Area
   ↓
💾 git commit
   ↓
🗃️ Repository
   ↓
📜 git log
   ↓
🌐 GitHub
```

I will continue updating my `git-commands.md` file as I learn new Git commands throughout the upcoming #90DaysOfDevOps challenges.

---

#### 🌟 Happy Learning! 😊

**#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham #Git #DevOps #VersionControl**

---

### 7.3 🚀 Git Commands Sheet

> 📚 **Complete Git reference for DevOps practice**
>
> This cheat sheet contains commonly used Git commands from **basic Git setup to advanced Git workflows**.
>
> 🔄 Keep updating this file as you learn new Git commands.

---

#### 🧭 Git Workflow at a Glance

```text
📂 Working Directory
        │
        │ git add
        ▼
📥 Staging Area
        │
        │ git commit
        ▼
🗃️ Local Repository
        │
        │ git push
        ▼
🌐 Remote Repository (GitHub)
```

##### ⭐ Basic Workflow

```text
✏️ Modify → 📥 Add → 💾 Commit → 🚀 Push
```

---

#### ⚙️ 1. Git Installation & Setup

#### 🔍 Check Git Version

```bash
git --version
```

👉 Shows the installed Git version.

---

#### 👤 Configure Username

```bash
git config --global user.name "Your Name"
```

👉 Sets the username used for Git commits.

---

#### 📧 Configure Email

```bash
git config --global user.email "your-email@example.com"
```

👉 Sets the email associated with your Git commits.

---

#### 🔎 View Configuration

```bash
git config --list
```

or:

```bash
git config --global --list
```

👉 Displays Git configuration values.

---

#### 📖 View Help

```bash
git help
```

```bash
git help <command>
```

Example:

```bash
git help commit
```

or:

```bash
git commit --help
```

👉 Opens documentation for a Git command.

---

#### 📁 2. Create & Initialize Repository

#### 📂 Create a Directory

```bash
mkdir project-name
```

👉 Creates a new directory.

---

#### 📌 Enter Directory

```bash
cd project-name
```

👉 Moves into the project directory.

---

#### 🚀 Initialize Git Repository

```bash
git init
```

👉 Converts the current directory into a Git repository.

Creates:

```text
📁 .git/
```

---

#### 🔍 Check Repository Status

```bash
git status
```

👉 Shows:

* 🆕 Untracked files
* ✏️ Modified files
* 📥 Staged files
* 🌿 Current branch

⭐ **Remember:** `git status` is one of the most useful Git commands.

---

#### 📥 3. Staging Changes

#### ➕ Stage One File

```bash
git add filename
```

Example:

```bash
git add README.md
```

👉 Adds one file to the staging area.

---

#### ➕ Stage Multiple Files

```bash
git add file1 file2
```

👉 Stages selected files.

---

#### 📦 Stage Everything

```bash
git add .
```

👉 Stages all changes in the current directory.

---

#### ❌ Unstage a File

```bash
git restore --staged filename
```

👉 Removes a file from the staging area without deleting the file.

---

#### 💾 4. Commit Changes

#### 💾 Create Commit

```bash
git commit -m "Commit message"
```

Example:

```bash
git commit -m "Add Git commands"
```

👉 Saves staged changes as a permanent snapshot.

---

#### 📝 Commit All Tracked Changes

```bash
git commit -am "Update application"
```

👉 Stages and commits modified/deleted **tracked** files.

⚠️ It does not include new untracked files.

---

#### ✏️ Modify Last Commit

```bash
git commit --amend
```

👉 Changes the most recent commit.

---

#### 🔍 5. View Changes

#### 📊 View Repository Status

```bash
git status
```

---

#### 🔎 View Unstaged Changes

```bash
git diff
```

👉 Shows changes that haven't been staged.

---

#### 📥 View Staged Changes

```bash
git diff --staged
```

👉 Shows changes already added to staging.

---

#### 📜 View Commit History

```bash
git log
```

👉 Shows detailed commit history.

---

#### ⚡ Compact Commit History

```bash
git log --oneline
```

Example:

```text
a12bc34 Update README
b45cd67 Add Dockerfile
c78de90 Initial commit
```

---

#### 🌳 Beautiful Commit Tree

```bash
git log --oneline --graph --decorate --all
```

👉 Shows branches and commits as a visual tree.

---

#### 🔍 Show a Specific Commit

```bash
git show <commit-id>
```

Example:

```bash
git show a12bc34
```

👉 Shows details and changes introduced by a commit.

---

#### 🌿 6. Branches

#### 🌱 List Branches

```bash
git branch
```

👉 Shows local branches.

---

#### 🌱 Create Branch

```bash
git branch feature-login
```

👉 Creates a new branch.

---

#### 🔄 Switch Branch

```bash
git switch feature-login
```

---

#### 🚀 Create and Switch

```bash
git switch -c feature-login
```

👉 Creates a new branch and immediately switches to it.

---

#### 🔀 Merge Branch

First switch to the target branch:

```bash
git switch main
```

Then:

```bash
git merge feature-login
```

👉 Merges `feature-login` into `main`.

---

#### 🗑️ Delete Local Branch

```bash
git branch -d feature-login
```

👉 Deletes a merged local branch.

Force delete:

```bash
git branch -D feature-login
```

⚠️ Use `-D` carefully.

---

#### 🌐 7. Remote Repository / GitHub

#### 🔗 Add Remote

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

👉 Connects the local repository to GitHub.

---

#### 🔍 View Remote

```bash
git remote -v
```

👉 Shows remote repository URLs.

---

#### ✏️ Change Remote URL

```bash
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

👉 Changes the URL of an existing remote.

---

#### 📤 Push to GitHub

```bash
git push origin main
```

👉 Uploads local commits to the remote `main` branch.

---

#### 🚀 First Push

```bash
git push -u origin main
```

👉 Pushes the branch and establishes an upstream relationship.

After that, you can usually use:

```bash
git push
```

---

#### 📥 Download Remote Changes

```bash
git fetch
```

👉 Downloads remote changes without merging them.

---

#### 📥 Pull Changes

```bash
git pull
```

👉 Fetches remote changes and merges them into the current branch.

---

#### 📥 Clone Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

👉 Creates a local copy of a remote repository.

---

#### 🔄 8. Fetch vs Pull

##### 📥 `git fetch`

```bash
git fetch
```

Downloads changes but does **not** modify your current working branch.

##### 📥 `git pull`

```bash
git pull
```

Fetches changes and integrates them into your current branch.

##### 🧠 Easy Memory Trick

```text
fetch → 👀 Download & inspect
pull  → 📥 Download + integrate
```

---

#### ↩️ 9. Undo Changes

#### ❌ Discard Working Directory Changes

```bash
git restore filename
```

👉 Restores the file to the last committed/staged state.

⚠️ Uncommitted changes can be lost.

---

#### ↩️ Unstage File

```bash
git restore --staged filename
```

👉 Removes the file from staging.

---

#### ↩️ Undo Last Commit but Keep Changes

```bash
git reset --soft HEAD~1
```

👉 Removes the last commit but keeps changes staged.

---

#### ↩️ Undo Last Commit and Unstage Changes

```bash
git reset --mixed HEAD~1
```

👉 Removes the last commit and leaves changes in the working directory.

---

#### ⚠️ Hard Reset

```bash
git reset --hard HEAD~1
```

👉 Removes the last commit and discards associated changes.

⚠️ **Dangerous:** Changes may be permanently lost.

---

#### 🔁 10. Revert Commit

```bash
git revert <commit-id>
```

Example:

```bash
git revert a12bc34
```

👉 Creates a new commit that reverses the changes introduced by another commit.

##### 🧠 Reset vs Revert

```text
reset  → 🗑️ Move/remove history
revert → ↩️ Create a new commit that undoes changes
```

⭐ In shared branches, `git revert` is generally safer than rewriting published history.

---

#### 🍒 11. Git Cherry-Pick

```bash
git cherry-pick <commit-id>
```

Example:

```bash
git cherry-pick a12bc34
```

👉 Applies the changes from a specific commit to the current branch.

Useful when you need **one particular change** from another branch.

---

#### 📦 12. Git Stash

#### 📥 Save Temporary Changes

```bash
git stash
```

👉 Temporarily stores uncommitted changes.

---

#### 📋 List Stashes

```bash
git stash list
```

👉 Shows saved stashes.

---

#### ♻️ Apply Stash

```bash
git stash apply
```

👉 Applies the latest stash without deleting it.

---

#### 📤 Pop Stash

```bash
git stash pop
```

👉 Applies the latest stash and removes it from the stash list.

---

#### 🗑️ Delete Stash

```bash
git stash drop
```

👉 Deletes the latest stash.

---

#### 🗑️ Delete All Stashes

```bash
git stash clear
```

⚠️ Deletes all stashed changes.

---

#### 🏷️ 13. Git Tags

#### 🏷️ Create Tag

```bash
git tag v1.0.0
```

👉 Creates a lightweight tag.

---

#### 📋 List Tags

```bash
git tag
```

---

#### 📤 Push Tag

```bash
git push origin v1.0.0
```

---

#### 📤 Push All Tags

```bash
git push origin --tags
```

---

#### 🧹 14. Remove Files

#### 🗑️ Remove File from Git and Disk

```bash
git rm filename
```

👉 Removes the file and stages the deletion.

---

#### 🔗 Remove File from Git but Keep Locally

```bash
git rm --cached filename
```

👉 Removes the file from Git tracking but keeps it on your machine.

---

#### 🙈 15. `.gitignore`

Create:

```text
.gitignore
```

Example:

```text
*.log
.env
node_modules/
__pycache__/
*.tmp
```

👉 `.gitignore` tells Git which files should not be tracked.

##### Check ignored files

```bash
git status --ignored
```

---

#### 🔎 16. Search Git History

#### 🔍 Search Commit Messages

```bash
git log --grep="bug"
```

👉 Finds commits containing `bug` in their message.

---

#### 🔍 Search Changes

```bash
git log -S "function_name"
```

👉 Finds commits where the specified text was added or removed.

---

#### 👤 17. Git Identity

#### 🔍 Check Username

```bash
git config user.name
```

---

#### 🔍 Check Email

```bash
git config user.email
```

---

#### 🗑️ Remove Global Configuration

```bash
git config --global --unset user.name
```

```bash
git config --global --unset user.email
```

---

#### 📌 18. HEAD

`HEAD` points to the commit or branch you are currently working on.

Check:

```bash
git status
```

You may see:

```text
On branch main
```

##### View HEAD

```bash
git rev-parse HEAD
```

👉 Shows the commit ID currently referenced by `HEAD`.

---

#### 🔢 19. HEAD~ and HEAD^

##### Previous Commit

```bash
HEAD~1
```

means:

```text
HEAD → Previous Commit
```

##### Example

```bash
git show HEAD~1
```

👉 Shows the previous commit.

---

#### 🔀 20. Merge Conflicts

Sometimes Git cannot automatically merge changes.

You may see:

```text
<<<<<<< HEAD
Your changes
=======
Other branch changes
>>>>>>> feature
```

##### Conflict Resolution Workflow

```text
⚠️ Conflict
    ↓
✏️ Edit File
    ↓
📥 git add
    ↓
💾 git commit
```

Commands:

```bash
git status

# Edit conflicted file

git add <file>

git commit -m "Resolve merge conflict"
```

---

#### 🧬 21. Rebase

```bash
git rebase main
```

👉 Replays your branch commits on top of another branch.

##### Basic Idea

```text
Before:

A---B---C  main
     \
      D---E  feature


After rebase:

A---B---C---D'---E'  feature
```

⚠️ Avoid rebasing shared/public history unless you understand the consequences.

---

#### 🧹 22. Clean Untracked Files

Preview:

```bash
git clean -n
```

👉 Shows what would be removed.

Actually remove:

```bash
git clean -f
```

⚠️ This permanently deletes untracked files.

---

#### 🗃️ 23. Git Object Database

Git stores objects inside:

```text
.git/objects/
```

Main object types:

```text
📦 Blob    → File contents
🌳 Tree    → Directory structure
💾 Commit  → Snapshot + metadata
🏷️ Tag     → Named reference
```

---

#### 🔍 24. Inspect Repository

#### 📊 Repository Information

```bash
git status
```

#### 🔗 Remote Information

```bash
git remote -v
```

#### 🌿 Branch Information

```bash
git branch -a
```

#### 📜 History

```bash
git log --oneline --graph --decorate --all
```

---

#### 🧠 25. Most Important Git Commands

If you are a beginner, remember these first:

| Symbol | Command      | Purpose                           |
| ------ | ------------ | --------------------------------- |
| ⚙️     | `git config` | Configure Git                     |
| 🚀     | `git init`   | Create repository                 |
| 🔍     | `git status` | Check repository state            |
| 📥     | `git add`    | Stage changes                     |
| 💾     | `git commit` | Save changes                      |
| 📜     | `git log`    | View history                      |
| 🌿     | `git branch` | Manage branches                   |
| 🔀     | `git merge`  | Merge branches                    |
| 🌐     | `git remote` | Manage remote                     |
| 📤     | `git push`   | Upload commits                    |
| 📥     | `git pull`   | Download + integrate              |
| 📦     | `git clone`  | Copy remote repository            |
| ↩️     | `git revert` | Undo with a new commit            |
| 🔄     | `git reset`  | Move HEAD / rewrite local history |
| 🧳     | `git stash`  | Temporarily save changes          |

---

#### 🚀 26. Real-World DevOps Git Workflow

A common workflow is:

```bash
# 1️⃣ Clone repository
git clone <repository-url>

# 2️⃣ Enter project
cd project

# 3️⃣ Check status
git status

# 4️⃣ Create feature branch
git switch -c feature/my-change

# 5️⃣ Make changes
vim application.yml

# 6️⃣ Review changes
git diff

# 7️⃣ Stage changes
git add .

# 8️⃣ Commit
git commit -m "Update application configuration"

# 9️⃣ Push branch
git push -u origin feature/my-change

# 🔟 Create Pull Request on GitHub
```

##### 🔄 Visual Workflow

```text
🌐 GitHub
   │
   │ git clone
   ▼
📂 Local Repository
   │
   │ git switch -c
   ▼
🌿 Feature Branch
   │
   │ ✏️ Make Changes
   ▼
📥 git add
   │
   ▼
💾 git commit
   │
   ▼
📤 git push
   │
   ▼
🔀 Pull Request
   │
   ▼
👀 Code Review
   │
   ▼
✅ Merge
```

---

#### 🛠️ 27. Git Troubleshooting Quick Reference

##### ❌ "Not a git repository"

```text
fatal: not a git repository
```

Check:

```bash
pwd
ls -la
git status
```

If needed:

```bash
git init
```

---

##### ❌ "Remote origin already exists"

Check:

```bash
git remote -v
```

Change it:

```bash
git remote set-url origin <repository-url>
```

---

##### ❌ Wrong Remote URL

```bash
git remote -v
```

Then:

```bash
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

---

##### ❌ Push Rejected

First:

```bash
git pull --rebase origin main
```

Then:

```bash
git push origin main
```

---

##### ❌ Accidentally Added a File

```bash
git restore --staged filename
```

---

#### 🧩 28. Git Mental Model

Think about Git like this:

```text
📂 WORKING DIRECTORY
       │
       │ "I changed something"
       ▼
📥 STAGING AREA
       │
       │ "I want this in my next snapshot"
       ▼
💾 COMMIT
       │
       │ "Save this version"
       ▼
🗃️ LOCAL REPOSITORY
       │
       │ git push
       ▼
🌐 GITHUB
```

##### 🧠 Easy Memory

```text
✏️ Edit
 ↓
📥 Add
 ↓
💾 Commit
 ↓
📤 Push
```

---

#### 🎯 Git Commands to Learn First

##### 🥇 Beginner

```bash
git init
git status
git add .
git commit -m "message"
git log --oneline
```

##### 🥈 Intermediate

```bash
git branch
git switch
git merge
git remote -v
git pull
git push
git fetch
git stash
```

##### 🥉 Advanced

```bash
git rebase
git cherry-pick
git reset
git revert
git reflog
git bisect
```

---

#### 🔥 Quick Daily Git Checklist

```text
☐ 🔍 git status
☐ ✏️ Make changes
☐ 🔎 git diff
☐ 📥 git add .
☐ 🔍 git diff --staged
☐ 💾 git commit -m "message"
☐ 📜 git log --oneline
☐ 📤 git push
```

---

#### 🌟 Golden Rules of Git

> 🟢 **Check before you change:** `git status`

> 🟢 **Review before committing:** `git diff`

> 🟢 **Write meaningful commit messages.**

> 🟢 **Make small, focused commits.**

> 🟢 **Pull/fetch before starting work when collaborating.**

> 🟢 **Don't commit secrets such as passwords, API keys, or `.env` files.**

> 🟢 **Be careful with `git reset --hard`, `git clean -f`, and force pushes.**

---

#### 📚 Git Learning Progress

| Day    | Topic                  | Status      |
| ------ | ---------------------- | ----------- |
| Day 22 | 🚀 Git Introduction    | ✅ Completed |
| Day 23 | 🌿 Branching           | ⬜           |
| Day 24 | 🔀 Merge & Conflicts   | ⬜           |
| Day 25 | 🌐 Remote Repositories | ⬜           |
| Day 26 | 🔄 Rebase              | ⬜           |
| Day 27 | 🧳 Stash               | ⬜           |
| Day 28 | 🍒 Cherry-pick         | ⬜           |

---

#### 🚀 Keep Learning Git!

Git is not just about remembering commands.

The real goal is to understand:

```text
🧠 What changed?
      ↓
📥 What should I stage?
      ↓
💾 What should I commit?
      ↓
🌿 Which branch should contain it?
      ↓
📤 What should I push?
      ↓
🔀 How should it be reviewed and merged?
```

> 💡 **Practice Git commands regularly. Break things, understand the error, and fix them. That's how Git becomes easy.**

---

#### ❤️ #90DaysOfDevOps

**#Git #GitHub #DevOps #VersionControl #CI/CD #Linux #Cloud #90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham**

⭐ **This cheat sheet will be updated continuously as I learn new Git commands.**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a commit message guideline for your repo. | You can demonstrate, without notes: *explain the Git object model at a high level* — with evidence committed to `day-22/`. |
| 2 | Draw the 3 areas of Git (working/staging/repo). | You can demonstrate, without notes: *use init, add, commit, status, diff, log* — with evidence committed to `day-22/`. |
| 3 | Explain what a SHA is. | You can demonstrate, without notes: *write professional commit messages* — with evidence committed to `day-22/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Author identity unknown` | Set `user.name` and `user.email`. |
| Committed a secret | Revoke the secret first; then rewrite history only if needed - covered on Day 24/26. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Never commit `.env`, keys or tokens. Use `.gitignore` templates and pre-commit scanning (Day 26).
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

1. Working tree vs index vs repo?
2. What is a commit?
3. How to undo unstaged changes?
4. Why small commits?
5. **Scenario:** A teammate asks 'who changed this config line and why?' Use blame/log to find the commit, author and reasoning. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain staging? | ☐ | ☐ | ☐ | ☐ |
| Can I read the log graph? | ☐ | ☐ | ☐ | ☐ |
| Can I find who changed a line? | ☐ | ☐ | ☐ | ☐ |
| Explain the Git object model at a high level | ☐ | ☐ | ☐ | ☐ |
| Use init, add, commit, status, diff, log | ☐ | ☐ | ☐ | ☐ |
| Write professional commit messages | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-22/` in your own repository:

```text
day-22/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-22
git add day-22/
git commit -m "day-22: git fundamentals"
git push -u origin day-22
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

## 18. Personal Learning Journal — 🐙 Day 22 - Docker Compose Orchestration

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

05 August 2026

---

### 🚀 Introduction

Day 22 of #90DaysOfDevOps ✅

Today, I moved beyond individual Docker commands and took full orchestration to the next level by building a multi-container environment for DevBoard using **Docker Compose**! 

Instead of manually starting containers, configuring networks, and running separate terminal commands, I configured a robust, production-ready `docker-compose.yml` file to handle service orchestration, environment variables, dependencies, and health checks seamlessly.

Automating multi-container orchestration with proper health checks and startup ordering makes local development predictable and mirroring production environments effortless! 🛠️

---

### 📚 Key Highlights & Implementations

#### 🐙 1. Multi-Service Orchestration
I orchestrated a 3-tier setup featuring a PostgreSQL 16 Alpine database, a Golang backend, and a frontend application. With a single command (`docker compose up -d`), Docker Compose automatically provisions the network, builds the images, and starts all three services in the correct order.

#### 🩺 2. Robust Health Checks & Dependencies
When a database container starts, it might take several seconds before it is ready to accept connections. If the backend tries to connect instantly, it will crash. 

To solve this, I implemented explicit health checks using `pg_isready` for Postgres and `wget` endpoints for the application services.

```yaml
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    depends_on:
      db:
        condition: service_healthy
```
This ensures the backend **only** connects when the database is strictly ready!

#### 🔐 3. Environment Variables & Security
Hardcoding credentials inside `docker-compose.yml` is a major security risk. Instead, I configured dynamic environment variables (`${POSTGRES_USER}`, `${POSTGRES_PASSWORD}`, `${POSTGRES_URL}`) sourced from an external `.env` file. This keeps secrets safe and allows for easy configuration swaps between environments (Dev, Staging, Prod).

#### 🔒 4. Hardened Base Images
Integrated distro-less runtime bases (`cgr.dev/chainguard/static`) in the multi-stage Go build process. Distroless images contain only your application and its runtime dependencies. They do not contain package managers, shells, or any other programs you would expect to find in a standard Linux distribution, massively minimizing attack vectors and shrinking image footprints.

#### 💾 5. Data Persistence
Containers are ephemeral—if they are destroyed, all data inside them is lost. To preserve the database data across container teardowns and restarts, I defined **named volumes**.

```yaml
volumes:
  postgres_data:

services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

#### 🧪 6. End-to-End Testing
Tested and verified backend health endpoints (`/health` returning 200 OK) and frontend accessibility using `curl` requests directly from the terminal to ensure the orchestration was successful.

---

### 🔗 Resources

- **Explore the code & deployment setup:** [GitHub Repository](https://lnkd.in/dX8Cftq5)

---

### 🔗 LinkedIn Post

Day 22 of #90DaysOfDevOps ✅
Today, I moved beyond individual Docker commands and took full orchestration to the next level by building a multi-container environment for DevBoard using Docker Compose!
Instead of manually starting containers, configuring networks, and running separate terminal commands, I configured a robust, production-ready docker-compose.yml file to handle service orchestration, environment variables, dependencies, and health checks seamlessly.

📚 Key Highlights & Implementations:
🐙 Multi-Service Orchestration: Orchestrated a 3-tier setup featuring a PostgreSQL 16 Alpine database, a Golang backend, and a frontend application with a single command (docker compose up -d).
🩺 Robust Health Checks & Dependencies: Implemented explicit health checks using pg_isready for Postgres and wget endpoints for the application services. Leveraged depends_on with condition: service_healthy to ensure backend only connects when the database is strictly ready!
🔐 Environment Variables & Security: Configured dynamic environment variables (${POSTGRES_USER}, ${POSTGRES_PASSWORD}, ${POSTGRES_URL}) to keep secrets out of hardcoded configurations.
🔒 Hardened Base Images: Integrated distro-less runtime bases (cgr.dev/chainguard/static) in the multi-stage Go build process to minimize attack vectors and shrink image footprints.
💾 Data Persistence: Defined named volumes (postgres_data) to prevent data loss across container teardowns and restarts.
🧪 End-to-End Testing: Tested and verified backend health endpoints (/health returning 200 OK) and frontend accessibility using curl requests directly from the terminal.

Automating multi-container orchestration with proper health checks and startup ordering makes local development predictable and mirroring production environments effortless! 🛠️

🔗 Explore the code & deployment setup here: https://lnkd.in/dX8Cftq5

#90DaysOfDevOps #Docker #DockerCompose #Golang #PostgreSQL #DevOps #Containerization #BackendDevelopment #CloudComputing #LearningInPublic #TrainWithShubham

## 19. Challenge Notes — Day 22: Dockerizing a Sample App

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

[![](https://img.youtube.com/vi/rKm-_VdjTsU/0.jpg)](https://www.youtube.com/watch?v=rKm-_VdjTsU)

[Watch the video](https://www.youtube.com/watch?v=rKm-_VdjTsU)

#### 🎯 Objective

Learn how to Dockerize a full-stack application (Frontend + Backend) using Docker and run both services using Docker Compose. You’ll also use environment variables to configure the application.

---

#### 🧠 Concepts Covered

- Dockerizing frontend and backend apps  
- Creating multi-container apps with Docker Compose  
- Using `.env` files for configuration  
- Building custom Dockerfiles for each service  
- Container-to-container networking in Docker

---

#### 🧩 Project Structure

```

dockerized-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── .env
├── docker-compose.yml
└── README.md

````

---

#### 🧪 Lab Steps

##### Step 1: Backend Setup (Node.js + Express)

**backend/server.js**
```js
const express = require('express');
const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Backend API!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
````

**backend/package.json**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**backend/Dockerfile**

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
```

---

##### 🌐 Step 2: Frontend Setup (Express Static Server)

**frontend/index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Frontend</title>
  </head>
  <body>
    <h1>Hello from Frontend!</h1>
    <script>
      fetch('/api')
        .then(res => res.json())
        .then(data => {
          document.body.innerHTML += `<p>${data.message}</p>`;
        });
    </script>
  </body>
</html>
```

**frontend/server.js**

```js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.FRONTEND_PORT || 3000;

app.use(express.static(__dirname));

app.get('/api', async (req, res) => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(backendUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect to backend' });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
```

**frontend/package.json**

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-fetch": "^2.6.7"
  }
}
```

**frontend/Dockerfile**

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

##### ⚙️ Step 3: Docker Compose Setup

**docker-compose.yml**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "${BACKEND_PORT}:4000"
    environment:
      - BACKEND_PORT=${BACKEND_PORT}

  frontend:
    build: ./frontend
    ports:
      - "${FRONTEND_PORT}:3000"
    environment:
      - FRONTEND_PORT=${FRONTEND_PORT}
      - BACKEND_URL=http://backend:4000/api
    depends_on:
      - backend
```

---

##### 🔐 Step 4: .env File

**.env**

```
BACKEND_PORT=4000
FRONTEND_PORT=3000
```

---

##### ▶️ Step 5: Run the App

```bash
docker compose up -d --build
```

Visit the frontend:

```
http://localhost:3000
```

You should see a message from the backend displayed on the page.

---

##### Step 6: Stop and Clean Up

```bash
docker compose down
docker image prune -f
```

---

#### Extra Useful Docker Commands

```bash
docker logs <container_id>           # Show logs
docker inspect <container_id>        # View container metadata
docker exec -it <container_id> bash  # Access container shell
docker stats                         # Real-time container metrics
```

---

#### Summary

✅ Built a full-stack app with backend and frontend
✅ Wrote Dockerfiles for both services
✅ Used Docker Compose for orchestration
✅ Configured with .env file
✅ Connected services using internal Docker networking

## 20. Cohort Practice — Day 22: Introduction to Git: Your First Repository

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

Today marks the beginning of your Git journey. Git is the backbone of modern DevOps — every tool, pipeline, and workflow revolves around version control. Before diving into advanced concepts, you need to get comfortable with the basics by doing.

You will:
- Understand what Git is and why it matters
- Set up your first Git repository from scratch
- Start building a living document of Git commands

---

#### Expected Output
- A local Git repository with a clean commit history
- A file called `git-commands.md` that you will keep updating in future days
- A file called `day-22-notes.md` with your answers

---

#### Challenge Tasks

##### Task 1: Install and Configure Git
1. Verify Git is installed on your machine
2. Set up your Git identity — name and email
3. Verify your configuration

---

##### Task 2: Create Your Git Project
1. Create a new folder called `devops-git-practice`
2. Initialize it as a Git repository
3. Check the status — read and understand what Git is telling you
4. Explore the hidden `.git/` directory — look at what's inside

---

##### Task 3: Create Your Git Commands Reference
1. Create a file called `git-commands.md` inside the repo
2. Add the Git commands you've used so far, organized by category:
   - **Setup & Config**
   - **Basic Workflow**
   - **Viewing Changes**
3. For each command, write:
   - What it does (1 line)
   - An example of how to use it

---

##### Task 4: Stage and Commit
1. Stage your file
2. Check what's staged
3. Commit with a meaningful message
4. View your commit history

---

##### Task 5: Make More Changes and Build History
1. Edit `git-commands.md` — add more commands as you discover them
2. Check what changed since your last commit
3. Stage and commit again with a different, descriptive message
4. Repeat this process at least **3 times** so you have multiple commits in your history
5. View the full history in a compact format

---

##### Task 6: Understand the Git Workflow
Answer these questions in your own words (add them to a `day-22-notes.md` file):
1. What is the difference between `git add` and `git commit`?
2. What does the **staging area** do? Why doesn't Git just commit directly?
3. What information does `git log` show you?
4. What is the `.git/` folder and what happens if you delete it?
5. What is the difference between a **working directory**, **staging area**, and **repository**?

---

#### Ongoing Task

**Keep updating `git-commands.md` every day** as you learn new Git commands in the upcoming days. This will become your personal Git reference. Maintain a clean commit history — one commit per update with a clear message.

---

#### Hints
- All you need today are about 8-10 Git commands — Google them, try them, break things
- Read what `git status` tells you — it's your best friend
- Use `man git-<command>` or `git <command> --help` to explore

---

#### Submission
1. Share a screenshot of your `git log --oneline` output showing multiple commits
2. Add your `day-22-notes.md` to `2026/day-22/`
3. Commit and push to your fork
4. Add your submission for Community Builder of the week on discord

---

#### Learn in Public

Share your first Git repo and commit history on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-22-notes

##### Task 1: Install and Configure Git
1. Verify Git is installed on your machine
- git --version

2. Set up your Git identity — name and email
git config --global user.name "Bijaya-423"
git config --global user.email "bijayakumarjena1507@gmail.com"

3. Verify your configuration
git config --global user.name
git config --global user.email

##### Task 2: Create Your Git Project
1. Create a new folder called `devops-git-practice`
2. Initialize it as a Git repository
git init

3. Check the status — read and understand what Git is telling you
git status
untracked file 
git add file_name to stage the file
git commit -m "comment" to stage to tracked file

4. Explore the hidden `.git/` directory — look at what's inside
it contains
HEAD 
config
description
hooks 
info
objects
refs


##### Task 3: Create Your Git Commands Reference
1. Create a file called `git-commands.md` inside the repo
2. Add the Git commands you've used so far, organized by category:
   - **Setup & Config**
   - **Basic Workflow**
   - **Viewing Changes**
3. For each command, write:
   - What it does (1 line)
   - An example of how to use it


git --version
git config --global user.email "bijayakumarjena1507@gmail.com"
git config --global user.name "Bijaya-423"

git init
git add file_name
git commit -m "message"


git clone git_repo_url - to download the remote repo to local

git status 0 check the untracked staged and tracked

git diff --staged - shows changes that have been staged for commit 
git log - display commit history


git log --oneline - display a compact one line commit history

##### Task 4: Stage and Commit
1. Stage your file
2. Check what's staged
3. Commit with a meaningful message
4. View your commit history


git add git-command.md

git status
Changes to be committed:
  new file:   git-commands.md
  
git commit -m "Add git commands cheat sheet"
[master abc1234] Add Git commands cheat sheet
 1 file changed, 100 insertions(+)
 create mode 100644 git-commands.md

git log 
commit abc123456789
Author: Your Name bijayakumarjena1507@gmail.com

    Add Git commands cheat sheet



git add moves thr changes from the working directory to dtaging

git commit save the stage chnage to permananetly

##### Notes: git-commands

### Files

- [devops-git-practice](files/cohort-2026/devops-git-practice)

## 21. Hands-on Project — Day 22: ElastiCache (Redis) with Terraform

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Provision Amazon ElastiCache for Redis** using Terraform with production-minded defaults: **subnet group in private subnets**, **replication group** (Multi-AZ with automatic failover), **encryption in-transit/at-rest**, **AUTH token**, and **least-privilege** security group rules from your app tier.

This module plugs into:
- **Day 14** VPC & subnets (**private** subnets for Redis)
- **Day 16** Security Groups (allow Redis 6379 from app SG)
- Optional: **Day 19** ASG (app nodes connect to Redis endpoint)

---

#### 🎯 Learning Goals
- Create a **Subnet Group** for ElastiCache in private subnets.  
- Provision a **Redis Replication Group** with Multi‑AZ & automatic failover.  
- Enable **TLS (in-transit)** and **at-rest** encryption + **AUTH token**.  
- Expose a **single discovery endpoint** for applications.

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (replace with your values)
terraform -chdir=terraform plan   -var='vpc_id=vpc-0123'   -var='private_subnet_ids=["subnet-a","subnet-b"]'   -var='app_security_group_ids=["sg-app123"]'   -var='node_type=cache.t3.micro'   -var='num_cache_clusters=2'   -var='multi_az_enabled=true'   -var='automatic_failover_enabled=true'

# 3) Apply
terraform -chdir=terraform apply -auto-approve   -var='vpc_id=vpc-0123'   -var='private_subnet_ids=["subnet-a","subnet-b"]'   -var='app_security_group_ids=["sg-app123"]'

# 4) Retrieve connection details
terraform -chdir=terraform output
# Use primary_endpoint_address for writes, reader_endpoint_address for reads (if provided).
```

**Notes**
- TLS is **enabled** by default. Your app client must support `rediss://` or TLS options.  
- An **AUTH token** is generated unless you pass your own via `auth_token`.  
- For cluster-mode enabled (sharding), set `cluster_mode_enabled=true` and adjust shard/replica counts.

---

#### 💡 Challenge
- Switch to **Cluster Mode Enabled** (sharded) with `num_node_groups` and `replicas_per_node_group`.  
- Add **parameter group** overrides (e.g., `maxmemory-policy allkeys-lru`).  
- Attach **CloudWatch Alarms** for CPU, memory, and evictions.

---

#### ✅ Checklist
- [ ] Private **subnet group** and **SG** restricted to app tier  
- [ ] **Multi‑AZ** + **automatic failover** (replication group)  
- [ ] **TLS** and **AUTH token** enabled  
- [ ] App connects via the **primary endpoint**

---

#### 📌 Commit
```bash
git add day22-elasticache-redis
git commit -m "day22: ElastiCache Redis replication group (TLS, AUTH token, Multi-AZ) with Terraform"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 21](../day-21/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 23 →](../day-23/README.md)
