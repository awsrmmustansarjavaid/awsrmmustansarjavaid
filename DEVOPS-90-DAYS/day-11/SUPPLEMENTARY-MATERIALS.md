# Day 11 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 11 – File Ownership Challenge (chown & chgrp)

## Task
Master file and directory ownership in Linux.

- Understand file ownership (user and group)
- Change file owner using `chown`
- Change file group using `chgrp`
- Apply ownership changes recursively

---

## Expected Output
- A markdown file: `day-11-file-ownership.md`
- Screenshots showing ownership changes

---

## Challenge Tasks

### Task 1: Understanding Ownership (10 minutes)

1. Run `ls -l` in your home directory
2. Identify the **owner** and **group** columns
3. Check who owns your files

**Format:** `-rw-r--r-- 1 owner group size date filename`

Document: What's the difference between owner and group?

---

### Task 2: Basic chown Operations (20 minutes)

1. Create file `devops-file.txt`
2. Check current owner: `ls -l devops-file.txt`
3. Change owner to `tokyo` (create user if needed)
4. Change owner to `berlin`
5. Verify the changes

**Try:**
```bash
sudo chown tokyo devops-file.txt
```

---

### Task 3: Basic chgrp Operations (15 minutes)

1. Create file `team-notes.txt`
2. Check current group: `ls -l team-notes.txt`
3. Create group: `sudo groupadd heist-team`
4. Change file group to `heist-team`
5. Verify the change

---

### Task 4: Combined Owner & Group Change (15 minutes)

Using `chown` you can change both owner and group together:

1. Create file `project-config.yaml`
2. Change owner to `professor` AND group to `heist-team` (one command)
3. Create directory `app-logs/`
4. Change its owner to `berlin` and group to `heist-team`

**Syntax:** `sudo chown owner:group filename`

---

### Task 5: Recursive Ownership (20 minutes)

1. Create directory structure:
   ```
   mkdir -p heist-project/vault
   mkdir -p heist-project/plans
   touch heist-project/vault/gold.txt
   touch heist-project/plans/strategy.conf
   ```

2. Create group `planners`: `sudo groupadd planners`

3. Change ownership of entire `heist-project/` directory:
   - Owner: `professor`
   - Group: `planners`
   - Use recursive flag (`-R`)

4. Verify all files and subdirectories changed: `ls -lR heist-project/`

---

### Task 6: Practice Challenge (20 minutes)

1. Create users: `tokyo`, `berlin`, `nairobi` (if not already created)
2. Create groups: `vault-team`, `tech-team`
3. Create directory: `bank-heist/`
4. Create 3 files inside:
   ```
   touch bank-heist/access-codes.txt
   touch bank-heist/blueprints.pdf
   touch bank-heist/escape-plan.txt
   ```

5. Set different ownership:
   - `access-codes.txt` → owner: `tokyo`, group: `vault-team`
   - `blueprints.pdf` → owner: `berlin`, group: `tech-team`
   - `escape-plan.txt` → owner: `nairobi`, group: `vault-team`

**Verify:** `ls -l bank-heist/`

---

## Key Commands Reference

```bash
# View ownership
ls -l filename

# Change owner only
sudo chown newowner filename

# Change group only
sudo chgrp newgroup filename

# Change both owner and group
sudo chown owner:group filename

# Recursive change (directories)
sudo chown -R owner:group directory/

# Change only group with chown
sudo chown :groupname filename
```

---

## Hints

- Most `chown`/`chgrp` operations need `sudo`
- Use `-R` flag for recursive directory changes
- Always verify with `ls -l` after changes
- User must exist before using in `chown`
- Group must exist before using in `chgrp`/`chown`

---

## Documentation

Create `day-11-file-ownership.md`:

```markdown
# Day 11 Challenge

## Files & Directories Created
[list all files/directories]

## Ownership Changes
[before/after for each file]

Example:
- devops-file.txt: user:user → tokyo:heist-team

## Commands Used
[your commands here]

## What I Learned
[3 key points about file ownership]
```

---

## Troubleshooting

**Permission denied?**
- Use `sudo` for chown/chgrp operations

**Group doesn't exist?**
- Create it first: `sudo groupadd groupname`

**User doesn't exist?**
- Create it first: `sudo useradd username`

---

## Why This Matters for DevOps

In real DevOps scenarios, you need proper file ownership for:

- Application deployments
- Shared team directories
- Container file permissions
- CI/CD pipeline artifacts
- Log file management

---

## Submission
1. Navigate to `2026/day-11/` folder
2. Add `day-11-file-ownership.md` with screenshots
3. Commit and push to your fork

---

## Learn in Public

Share on LinkedIn about mastering file ownership.

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

## Source file: `day-11-file-ownership.md`

# 🚀Day-11: File Ownership (chown & chgrp)

## 👤 Understanding Ownership
- Run `ls -l` in your home directory

  <img width="701" height="187" alt="Screenshot 2026-08-01 152658" src="https://github.com/user-attachments/assets/04303cc8-c49c-4e13-9d4c-5e7762953769" />


    `-rw-r--r-- 1 owner group size date filename`

    -   Owner → Individual user with direct control.

    -   Group → Multiple users who may share access.

## 📁 Files & Directories Created
- Basic `chown` Operations

    `touch devops-file.txt`

    `ls -l devops-file.txt`

 <img width="730" height="101" alt="Screenshot 2026-08-01 152643" src="https://github.com/user-attachments/assets/9fa9171d-b69b-41bb-a370-2a0a10b4b9bd" />

    `sudo chown tokyo devops-file.txt`

    `ls -l devops-file.txt`

<img width="724" height="114" alt="Screenshot 2026-08-01 152740" src="https://github.com/user-attachments/assets/bf859510-8709-4235-a030-ad2d569fd4d6" />


    `sudo chown berlin devops-file.txt`

    `ls -l devops-file.txt`

  <img width="717" height="117" alt="Screenshot 2026-08-01 152816" src="https://github.com/user-attachments/assets/019cfabe-71f0-4044-b817-7703630274f8" />


- Basic `chgrp` Operations

    `touch team-notes.txt`

    `ls -l team-notes.txt`

  <img width="709" height="101" alt="Screenshot 2026-08-01 152846" src="https://github.com/user-attachments/assets/153d10a9-f588-4e14-8434-200525943ed7" />

    `sudo groupadd heist-team`

    `sudo chgrp heist-team team-notes.txt`

    `ls -l team-notes.txt`

  <img width="786" height="128" alt="Screenshot 2026-08-01 153349" src="https://github.com/user-attachments/assets/7f8e6c70-c399-4d74-ac50-2df962b0c805" />


##  👥Ownership Changes
- Combined Owner & Group Change

    `touch project-config.yaml`

    `sudo chown professor:heist-team project-config.yaml`

    `mkdir app-logs`

    `sudo chown berlin:heist-team app-logs`

    `ls -l`
<img width="1919" height="407" alt="Screenshot 2026-08-01 153512" src="https://github.com/user-attachments/assets/394fe6e7-743c-48dc-b461-b3c2fe8b977f" />


- 📂 Recursive Ownership
    
    `mkdir -p heist-project/vault`
    
    `mkdir -p heist-project/plans`

    `touch heist-project/vault/gold.txt`

    `touch heist-project/plans/strategy.conf`

    `sudo groupadd planners`

    `sudo chown -R professor:planners heist-project/`

    `ls -lR heist-project/`

<img width="1919" height="518" alt="Screenshot 2026-08-01 153644" src="https://github.com/user-attachments/assets/6b4207cf-86a0-4343-a3f1-0008bb0e1864" />


- 🎯 Practice Challenge

    -  👤 Create users
        
        `sudo useradd tokyo`

        `sudo useradd berlin`

        `sudo useradd nairobi`

    -   👥 Create groups
    
        `sudo groupadd vault-team`

        `sudo groupadd tech-team`

    -  📂 Create directory

        `mkdir bank-heist`
    
    - 📄 Create 3 files inside

    `touch bank-heist/access-codes.txt`

    `touch bank-heist/blueprints.pdf`

    `touch bank-heist/escape-plan.txt`

    - 🔐 Set different ownership

    `sudo chown tokyo:vault-team bank-heist/access-codes.txt`

    `sudo chown berlin:tech-team bank-heist/blueprints.pdf`

    `sudo chown nairobi:vault-team bank-heist/escape-plan.txt`

    - ✅ Verify

    `ls -l bank-heist/`
  
<img width="1919" height="435" alt="Screenshot 2026-08-01 153938" src="https://github.com/user-attachments/assets/d8898cfd-9b40-4f3a-9921-95dac86653f4" />


## 💻 Commands Used
1. View ownership

    `ls -l filename`

2. Change owner only

    `sudo chown newowner filename`

3. Change group only

    `sudo chgrp newgroup filename`

4. Change both owner and group

    `sudo chown owner:group filename`

5. Recursive change (directories)

    `sudo chown -R owner:group directory/`

6. Change only group with chown

    `sudo chown :groupname filename`


## 💡What I Learned
👤 1. Dual Ownership Model  
    Every file in Linux has two ownership attributes:
    - Owner (user): The individual account that created or owns the file.
    - Group: A collection of users who may share access to the file. This ensures collaborative work without giving full control to everyone. 

🔒 2. Ownership Controls Access & Security  
    File ownership, combined with permissions, determines who can read, write, or execute a file. This is a cornerstone of Linux’s multi-user security model, preventing unauthorized access or modification. 

⚙️ 3. Ownership Can Be Changed with Commands  
    Administrators can reassign ownership using:
    - chown → change file owner (and optionally group).
    - chgrp → change group ownership.
    - Recursive flags (-R) allow applying changes across entire directories. These commands are essential for managing shared projects and system security.
