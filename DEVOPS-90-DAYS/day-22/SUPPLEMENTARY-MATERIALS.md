# Day 22 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 22 – Introduction to Git: Your First Repository

## Task

Today marks the beginning of your Git journey. Git is the backbone of modern DevOps — every tool, pipeline, and workflow revolves around version control. Before diving into advanced concepts, you need to get comfortable with the basics by doing.

You will:
- Understand what Git is and why it matters
- Set up your first Git repository from scratch
- Start building a living document of Git commands

---

## Expected Output
- A local Git repository with a clean commit history
- A file called `git-commands.md` that you will keep updating in future days
- A file called `day-22-notes.md` with your answers

---

## Challenge Tasks

### Task 1: Install and Configure Git
1. Verify Git is installed on your machine
2. Set up your Git identity — name and email
3. Verify your configuration

---

### Task 2: Create Your Git Project
1. Create a new folder called `devops-git-practice`
2. Initialize it as a Git repository
3. Check the status — read and understand what Git is telling you
4. Explore the hidden `.git/` directory — look at what's inside

---

### Task 3: Create Your Git Commands Reference
1. Create a file called `git-commands.md` inside the repo
2. Add the Git commands you've used so far, organized by category:
   - **Setup & Config**
   - **Basic Workflow**
   - **Viewing Changes**
3. For each command, write:
   - What it does (1 line)
   - An example of how to use it

---

### Task 4: Stage and Commit
1. Stage your file
2. Check what's staged
3. Commit with a meaningful message
4. View your commit history

---

### Task 5: Make More Changes and Build History
1. Edit `git-commands.md` — add more commands as you discover them
2. Check what changed since your last commit
3. Stage and commit again with a different, descriptive message
4. Repeat this process at least **3 times** so you have multiple commits in your history
5. View the full history in a compact format

---

### Task 6: Understand the Git Workflow
Answer these questions in your own words (add them to a `day-22-notes.md` file):
1. What is the difference between `git add` and `git commit`?
2. What does the **staging area** do? Why doesn't Git just commit directly?
3. What information does `git log` show you?
4. What is the `.git/` folder and what happens if you delete it?
5. What is the difference between a **working directory**, **staging area**, and **repository**?

---

## Ongoing Task

**Keep updating `git-commands.md` every day** as you learn new Git commands in the upcoming days. This will become your personal Git reference. Maintain a clean commit history — one commit per update with a clear message.

---

## Hints
- All you need today are about 8-10 Git commands — Google them, try them, break things
- Read what `git status` tells you — it's your best friend
- Use `man git-<command>` or `git <command> --help` to explore

---

## Submission
1. Share a screenshot of your `git log --oneline` output showing multiple commits
2. Add your `day-22-notes.md` to `2026/day-22/`
3. Commit and push to your fork
4. Add your submission for Community Builder of the week on discord

---

## Learn in Public

Share your first Git repo and commit history on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## Source file: `day-22-notes.md`

# 🚀 Day 22 – Introduction to Git: Your First Repository

> 💡 **What is Git?**
>
> Git is a **Distributed Version Control System (DVCS)** that tracks changes made to files, maintains version history, and helps developers collaborate effectively.

---

## ⚙️ Task 1: Install and Configure Git

### 🎯 Objectives

1. ✅ Verify Git is installed on the machine.
2. 👤 Set up Git identity — name and email.
3. 🔍 Verify the Git configuration.

### 💻 Commands Used

```bash
git --version

git config --global user.name "Your Name"

git config --global user.email "your-email@example.com"

git config --global --list
```

### 📸 Output

<img width="1178" height="217" alt="Git Configuration" src="https://github.com/user-attachments/assets/28fba70c-f9e8-4fad-803c-ba845a38f954" />

---

## 📁 Task 2: Create Your Git Project

### 🎯 Objectives

1. 📂 Create a folder called `devops-git-practice`.
2. 🚀 Initialize it as a Git repository.
3. 🔍 Check the repository status.
4. 👀 Explore the hidden `.git/` directory.

### 💻 Commands Used

```bash
mkdir devops-git-practice

cd devops-git-practice

git init

git status

ls -la
```

### 💡 What I Learned

* 🚀 `git init` initializes a new Git repository.
* 🔍 `git status` shows the current state of the repository.
* 📦 `.git/` contains Git's internal repository information.
* 👻 `ls -la` displays hidden files and directories.

### 📸 Screenshots

<img width="1086" height="626" alt="Git Repository Initialization" src="https://github.com/user-attachments/assets/7aec2d1a-ec25-4072-ba0f-3b6015117ddc" />

<img width="812" height="270" alt="Git Status and .git Directory" src="https://github.com/user-attachments/assets/42c313f8-d6ce-4c55-926f-cc98d5c76efc" />

---

# 📝 Task 3: Create Your Git Commands Reference

Created:

```text
📄 git-commands.md
```

The commands are organized into:

* ⚙️ **Setup & Config**
* 🔄 **Basic Workflow**
* 🔍 **Viewing Changes**

---

## ⚙️ Setup & Config

### 🚀 `git init`

Initializes a new Git repository.

**Example:**

```bash
git init
```

---

### ⚙️ `git config`

Configures Git username and email.

**Example:**

```bash
git config --global user.name "Your Name"

git config --global user.email "Your Email"
```

### 🔍 View Configuration

```bash
git config --global --list
```

Displays the configured Git settings.

---

# 🔄 Basic Workflow

### 📥 `git add`

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

### 💾 `git commit`

Saves staged changes with a message explaining what was changed.

**Example:**

```bash
git commit -m "Add Git commands reference"
```

---

# 🔍 Viewing Changes

### 📊 `git status`

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

### 📜 `git log`

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

### ⚡ Compact History

```bash
git log --oneline
```

---

# 📦 Task 4: Stage and Commit

### 1️⃣ Stage the file

```bash
git add git-commands.md
```

### 2️⃣ Check what is staged

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

### 3️⃣ Create the commit

```bash
git commit -m "Initial Git command reference"
```

### 4️⃣ View commit history

```bash
git log
```

---

# 🔄 Task 5: Make More Changes and Build History

### 🎯 Objectives

1. ✏️ Edit `git-commands.md`.
2. 🔍 Check what changed.
3. 📥 Stage the changes.
4. 💾 Commit with a descriptive message.
5. 🔁 Repeat at least **3 times**.
6. 📜 View the complete history using `git log --oneline`.

### 💻 Workflow

```bash
git status

git diff

git add .

git status

git commit -m "Update Git commands"

git log --oneline
```

### 📸 Commit History

<img width="1192" height="328" alt="Git Commit History" src="https://github.com/user-attachments/assets/302f1cb3-191e-4b29-bcfc-5fc0a7b2c08f" />

### 💡 What I Learned

Creating multiple commits helped me understand how Git tracks changes over time.

Each commit acts as a **checkpoint** that represents the state of the project at a specific point in time.

---

# 🧠 Task 6: Understand the Git Workflow

## 1️⃣ What is the difference between `git add` and `git commit`?

### 📥 `git add`

`git add` tells Git which changes should be included in the next commit.

It moves changes from the **Working Directory → Staging Area**.

```bash
git add filename
```

### 💾 `git commit`

`git commit` saves the staged changes as a permanent snapshot in the Git repository.

```bash
git commit -m "Meaningful commit message"
```

### 💡 In Simple Words

```text
git add     → 📥 Select changes
git commit  → 💾 Save changes
```

---

## 2️⃣ What does the Staging Area do?

The **Staging Area** is a preparation area between the Working Directory and Repository.

Think of it as a **🪑 waiting room for changes**.

It allows us to choose exactly which changes should be included in the next commit.

### Why is it useful?

* 🎯 Select specific changes.
* 🧹 Create clean commits.
* 📦 Group related changes.
* 🔍 Review changes before committing.

---

## 3️⃣ What information does `git log` show?

`git log` displays the commit history of the repository.

It can show:

* 🔑 Commit ID / Hash
* 👤 Author
* 📅 Date
* 📝 Commit message

### Example

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

## 4️⃣ What is the `.git/` folder?

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

### ⚠️ What happens if `.git/` is deleted?

If `.git/` is deleted:

* 📁 Project files remain.
* ❌ Git no longer recognizes the directory as a repository.
* 🗑️ Local Git history and metadata are lost.

> ⚠️ **Never delete `.git/` unless you intentionally want to remove the local Git repository.**

---

# 🔄 5️⃣ Working Directory vs Staging Area vs Repository

## 📂 Working Directory

The **Working Directory** is where we create and modify project files.

Example:

```text
devops-git-practice/
├── 📄 git-commands.md
└── 📄 day-22-notes.md
```

---

## 📥 Staging Area

The **Staging Area**, also called the **Index**, is the preparation zone between the Working Directory and Repository.

When we run:

```bash
git add .
```

the selected changes are added to the Staging Area.

---

## 🗃️ Repository

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

# 🔄 Git Workflow

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

### ⭐ In One Line

```text
📂 Working Directory → 📥 git add → 🗃️ Staging Area → 💾 git commit → 📜 Repository → 🌐 GitHub
```

---

# 📚 Commands Practiced Today

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

# 🎯 Key Learnings

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

# ✅ Day 22 Completed

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

## 🌟 Happy Learning! 😊

**#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham #Git #DevOps #VersionControl**

---

## Source file: `git-commands.md`

# 🚀 Git Commands Sheet

> 📚 **Complete Git reference for DevOps practice**
>
> This cheat sheet contains commonly used Git commands from **basic Git setup to advanced Git workflows**.
>
> 🔄 Keep updating this file as you learn new Git commands.

---

# 🧭 Git Workflow at a Glance

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

### ⭐ Basic Workflow

```text
✏️ Modify → 📥 Add → 💾 Commit → 🚀 Push
```

---

# ⚙️ 1. Git Installation & Setup

## 🔍 Check Git Version

```bash
git --version
```

👉 Shows the installed Git version.

---

## 👤 Configure Username

```bash
git config --global user.name "Your Name"
```

👉 Sets the username used for Git commits.

---

## 📧 Configure Email

```bash
git config --global user.email "your-email@example.com"
```

👉 Sets the email associated with your Git commits.

---

## 🔎 View Configuration

```bash
git config --list
```

or:

```bash
git config --global --list
```

👉 Displays Git configuration values.

---

## 📖 View Help

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

# 📁 2. Create & Initialize Repository

## 📂 Create a Directory

```bash
mkdir project-name
```

👉 Creates a new directory.

---

## 📌 Enter Directory

```bash
cd project-name
```

👉 Moves into the project directory.

---

## 🚀 Initialize Git Repository

```bash
git init
```

👉 Converts the current directory into a Git repository.

Creates:

```text
📁 .git/
```

---

## 🔍 Check Repository Status

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

# 📥 3. Staging Changes

## ➕ Stage One File

```bash
git add filename
```

Example:

```bash
git add README.md
```

👉 Adds one file to the staging area.

---

## ➕ Stage Multiple Files

```bash
git add file1 file2
```

👉 Stages selected files.

---

## 📦 Stage Everything

```bash
git add .
```

👉 Stages all changes in the current directory.

---

## ❌ Unstage a File

```bash
git restore --staged filename
```

👉 Removes a file from the staging area without deleting the file.

---

# 💾 4. Commit Changes

## 💾 Create Commit

```bash
git commit -m "Commit message"
```

Example:

```bash
git commit -m "Add Git commands"
```

👉 Saves staged changes as a permanent snapshot.

---

## 📝 Commit All Tracked Changes

```bash
git commit -am "Update application"
```

👉 Stages and commits modified/deleted **tracked** files.

⚠️ It does not include new untracked files.

---

## ✏️ Modify Last Commit

```bash
git commit --amend
```

👉 Changes the most recent commit.

---

# 🔍 5. View Changes

## 📊 View Repository Status

```bash
git status
```

---

## 🔎 View Unstaged Changes

```bash
git diff
```

👉 Shows changes that haven't been staged.

---

## 📥 View Staged Changes

```bash
git diff --staged
```

👉 Shows changes already added to staging.

---

## 📜 View Commit History

```bash
git log
```

👉 Shows detailed commit history.

---

## ⚡ Compact Commit History

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

## 🌳 Beautiful Commit Tree

```bash
git log --oneline --graph --decorate --all
```

👉 Shows branches and commits as a visual tree.

---

## 🔍 Show a Specific Commit

```bash
git show <commit-id>
```

Example:

```bash
git show a12bc34
```

👉 Shows details and changes introduced by a commit.

---

# 🌿 6. Branches

## 🌱 List Branches

```bash
git branch
```

👉 Shows local branches.

---

## 🌱 Create Branch

```bash
git branch feature-login
```

👉 Creates a new branch.

---

## 🔄 Switch Branch

```bash
git switch feature-login
```

---

## 🚀 Create and Switch

```bash
git switch -c feature-login
```

👉 Creates a new branch and immediately switches to it.

---

## 🔀 Merge Branch

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

## 🗑️ Delete Local Branch

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

# 🌐 7. Remote Repository / GitHub

## 🔗 Add Remote

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

👉 Connects the local repository to GitHub.

---

## 🔍 View Remote

```bash
git remote -v
```

👉 Shows remote repository URLs.

---

## ✏️ Change Remote URL

```bash
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

👉 Changes the URL of an existing remote.

---

## 📤 Push to GitHub

```bash
git push origin main
```

👉 Uploads local commits to the remote `main` branch.

---

## 🚀 First Push

```bash
git push -u origin main
```

👉 Pushes the branch and establishes an upstream relationship.

After that, you can usually use:

```bash
git push
```

---

## 📥 Download Remote Changes

```bash
git fetch
```

👉 Downloads remote changes without merging them.

---

## 📥 Pull Changes

```bash
git pull
```

👉 Fetches remote changes and merges them into the current branch.

---

## 📥 Clone Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

👉 Creates a local copy of a remote repository.

---

# 🔄 8. Fetch vs Pull

### 📥 `git fetch`

```bash
git fetch
```

Downloads changes but does **not** modify your current working branch.

### 📥 `git pull`

```bash
git pull
```

Fetches changes and integrates them into your current branch.

### 🧠 Easy Memory Trick

```text
fetch → 👀 Download & inspect
pull  → 📥 Download + integrate
```

---

# ↩️ 9. Undo Changes

## ❌ Discard Working Directory Changes

```bash
git restore filename
```

👉 Restores the file to the last committed/staged state.

⚠️ Uncommitted changes can be lost.

---

## ↩️ Unstage File

```bash
git restore --staged filename
```

👉 Removes the file from staging.

---

## ↩️ Undo Last Commit but Keep Changes

```bash
git reset --soft HEAD~1
```

👉 Removes the last commit but keeps changes staged.

---

## ↩️ Undo Last Commit and Unstage Changes

```bash
git reset --mixed HEAD~1
```

👉 Removes the last commit and leaves changes in the working directory.

---

## ⚠️ Hard Reset

```bash
git reset --hard HEAD~1
```

👉 Removes the last commit and discards associated changes.

⚠️ **Dangerous:** Changes may be permanently lost.

---

# 🔁 10. Revert Commit

```bash
git revert <commit-id>
```

Example:

```bash
git revert a12bc34
```

👉 Creates a new commit that reverses the changes introduced by another commit.

### 🧠 Reset vs Revert

```text
reset  → 🗑️ Move/remove history
revert → ↩️ Create a new commit that undoes changes
```

⭐ In shared branches, `git revert` is generally safer than rewriting published history.

---

# 🍒 11. Git Cherry-Pick

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

# 📦 12. Git Stash

## 📥 Save Temporary Changes

```bash
git stash
```

👉 Temporarily stores uncommitted changes.

---

## 📋 List Stashes

```bash
git stash list
```

👉 Shows saved stashes.

---

## ♻️ Apply Stash

```bash
git stash apply
```

👉 Applies the latest stash without deleting it.

---

## 📤 Pop Stash

```bash
git stash pop
```

👉 Applies the latest stash and removes it from the stash list.

---

## 🗑️ Delete Stash

```bash
git stash drop
```

👉 Deletes the latest stash.

---

## 🗑️ Delete All Stashes

```bash
git stash clear
```

⚠️ Deletes all stashed changes.

---

# 🏷️ 13. Git Tags

## 🏷️ Create Tag

```bash
git tag v1.0.0
```

👉 Creates a lightweight tag.

---

## 📋 List Tags

```bash
git tag
```

---

## 📤 Push Tag

```bash
git push origin v1.0.0
```

---

## 📤 Push All Tags

```bash
git push origin --tags
```

---

# 🧹 14. Remove Files

## 🗑️ Remove File from Git and Disk

```bash
git rm filename
```

👉 Removes the file and stages the deletion.

---

## 🔗 Remove File from Git but Keep Locally

```bash
git rm --cached filename
```

👉 Removes the file from Git tracking but keeps it on your machine.

---

# 🙈 15. `.gitignore`

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

### Check ignored files

```bash
git status --ignored
```

---

# 🔎 16. Search Git History

## 🔍 Search Commit Messages

```bash
git log --grep="bug"
```

👉 Finds commits containing `bug` in their message.

---

## 🔍 Search Changes

```bash
git log -S "function_name"
```

👉 Finds commits where the specified text was added or removed.

---

# 👤 17. Git Identity

## 🔍 Check Username

```bash
git config user.name
```

---

## 🔍 Check Email

```bash
git config user.email
```

---

## 🗑️ Remove Global Configuration

```bash
git config --global --unset user.name
```

```bash
git config --global --unset user.email
```

---

# 📌 18. HEAD

`HEAD` points to the commit or branch you are currently working on.

Check:

```bash
git status
```

You may see:

```text
On branch main
```

### View HEAD

```bash
git rev-parse HEAD
```

👉 Shows the commit ID currently referenced by `HEAD`.

---

# 🔢 19. HEAD~ and HEAD^

### Previous Commit

```bash
HEAD~1
```

means:

```text
HEAD → Previous Commit
```

### Example

```bash
git show HEAD~1
```

👉 Shows the previous commit.

---

# 🔀 20. Merge Conflicts

Sometimes Git cannot automatically merge changes.

You may see:

```text
<<<<<<< HEAD
Your changes
=======
Other branch changes
>>>>>>> feature
```

### Conflict Resolution Workflow

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

# 🧬 21. Rebase

```bash
git rebase main
```

👉 Replays your branch commits on top of another branch.

### Basic Idea

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

# 🧹 22. Clean Untracked Files

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

# 🗃️ 23. Git Object Database

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

# 🔍 24. Inspect Repository

## 📊 Repository Information

```bash
git status
```

## 🔗 Remote Information

```bash
git remote -v
```

## 🌿 Branch Information

```bash
git branch -a
```

## 📜 History

```bash
git log --oneline --graph --decorate --all
```

---

# 🧠 25. Most Important Git Commands

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

# 🚀 26. Real-World DevOps Git Workflow

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

### 🔄 Visual Workflow

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

# 🛠️ 27. Git Troubleshooting Quick Reference

### ❌ "Not a git repository"

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

### ❌ "Remote origin already exists"

Check:

```bash
git remote -v
```

Change it:

```bash
git remote set-url origin <repository-url>
```

---

### ❌ Wrong Remote URL

```bash
git remote -v
```

Then:

```bash
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

---

### ❌ Push Rejected

First:

```bash
git pull --rebase origin main
```

Then:

```bash
git push origin main
```

---

### ❌ Accidentally Added a File

```bash
git restore --staged filename
```

---

# 🧩 28. Git Mental Model

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

### 🧠 Easy Memory

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

# 🎯 Git Commands to Learn First

### 🥇 Beginner

```bash
git init
git status
git add .
git commit -m "message"
git log --oneline
```

### 🥈 Intermediate

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

### 🥉 Advanced

```bash
git rebase
git cherry-pick
git reset
git revert
git reflog
git bisect
```

---

# 🔥 Quick Daily Git Checklist

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

# 🌟 Golden Rules of Git

> 🟢 **Check before you change:** `git status`

> 🟢 **Review before committing:** `git diff`

> 🟢 **Write meaningful commit messages.**

> 🟢 **Make small, focused commits.**

> 🟢 **Pull/fetch before starting work when collaborating.**

> 🟢 **Don't commit secrets such as passwords, API keys, or `.env` files.**

> 🟢 **Be careful with `git reset --hard`, `git clean -f`, and force pushes.**

---

# 📚 Git Learning Progress

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

# 🚀 Keep Learning Git!

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

## ❤️ #90DaysOfDevOps

**#Git #GitHub #DevOps #VersionControl #CI/CD #Linux #Cloud #90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham**

⭐ **This cheat sheet will be updated continuously as I learn new Git commands.**
