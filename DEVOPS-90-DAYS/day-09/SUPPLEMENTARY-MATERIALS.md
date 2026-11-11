# Day 09 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 09 – Linux User & Group Management Challenge

## Task
Today's goal is to **practice user and group management** by completing hands-on challenges.

Figure out how to:
- Create users and set passwords
- Create groups and assign users
- Set up shared directories with group permissions

Use what you learned from Days 1-7 to find the right commands!

---

## Expected Output
- A markdown file: `day-09-user-management.md`
- Screenshots of command outputs
- List of commands used

---

## Challenge Tasks

### Task 1: Create Users (20 minutes)

Create three users with home directories and passwords:
- `tokyo`
- `berlin`
- `professor`

**Verify:** Check `/etc/passwd` and `/home/` directory

---

### Task 2: Create Groups (10 minutes)

Create two groups:
- `developers`
- `admins`

**Verify:** Check `/etc/group`

---

### Task 3: Assign to Groups (15 minutes)

Assign users:
- `tokyo` → `developers`
- `berlin` → `developers` + `admins` (both groups)
- `professor` → `admins`

**Verify:** Use appropriate command to check group membership

---

### Task 4: Shared Directory (20 minutes)

1. Create directory: `/opt/dev-project`
2. Set group owner to `developers`
3. Set permissions to `775` (rwxrwxr-x)
4. Test by creating files as `tokyo` and `berlin`

**Verify:** Check permissions and test file creation

---

### Task 5: Team Workspace (20 minutes)

1. Create user `nairobi` with home directory
2. Create group `project-team`
3. Add `nairobi` and `tokyo` to `project-team`
4. Create `/opt/team-workspace` directory
5. Set group to `project-team`, permissions to `775`
6. Test by creating file as `nairobi`

---

## Hints

**Stuck? Try these commands:**
- User: `useradd`, `passwd`, `usermod`
- Group: `groupadd`, `groups`
- Permissions: `chgrp`, `chmod`
- Test: `sudo -u username command`

**Tip:** Use `-m` flag with useradd for home directory, `-aG` for adding to groups

---

## Documentation

Create `day-09-user-management.md`:

```markdown
# Day 09 Challenge

## Users & Groups Created
- Users: tokyo, berlin, professor, nairobi
- Groups: developers, admins, project-team

## Group Assignments
[List who is in which groups]

## Directories Created
[List directories with permissions]

## Commands Used
[Your commands here]

## What I Learned
[3 key points]
```

---


## Troubleshooting

**Permission denied?** Use `sudo`

**User can't access directory?**
- Check group: `groups username`
- Check permissions: `ls -ld /path`

---

## Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to `2026/day-09/` folder
3. Add your `day-09-user-management.md` with screenshots
4. Commit and push

---

## Learn in Public
Share your Day 09 progress on LinkedIn:

- Post about completing the user management challenge
- Share one thing you figured out
- Mention real-world DevOps use

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

## Source file: `day-09-user-management.md`

# Day 09 – Linux User & Group Management
## 📌 Objective

Learn how to create and manage Linux users and groups, assign permissions, and configure shared directories for team collaboration.

## 🛠️ Users Created

- Created the following users with home directories:

    `sudo useradd -m tokyo` 

    `sudo useradd -m berlin` 

    `sudo useradd -m professor`

### Set passwords:

    `sudo passwd tokyo`
    
    `sudo passwd berlin`
    
    `sudo passwd professor`

<img width="1919" height="463" alt="Screenshot 2026-08-01 140148" src="https://github.com/user-attachments/assets/e84f24c5-50a9-492f-8082-af47ac686c5e" />

### Verify users:

 `cat /etc/passwd | grep -E "tokyo|berlin|professor"` 

### List home directories:
 `ls /home/`

<img width="1919" height="250" alt="Screenshot 2026-08-01 140421" src="https://github.com/user-attachments/assets/d3f22328-4ff1-4317-a601-a2d1559535da" />

## 👥 Groups Created

### Created the following groups:

    `sudo groupadd developers` 

    `sudo groupadd admins`

### Verify groups:

 `cat /etc/group | grep -E "developers|admins"`

<img width="1919" height="164" alt="Screenshot 2026-08-01 140549" src="https://github.com/user-attachments/assets/9b159fa9-6d29-41e8-b88f-07be6f27dc36" />
---

## 🔐 Group Assignments

### Assign users to groups:
- tokyo → developers
   `sudo usermod -aG developers tokyo`
  
- berlin → developers + admins
   `sudo usermod -aG developers,admins berlin`
  
- professor → admins
    `sudo usermod -aG admins professor`
  
### Verify memberships:

    `groups tokyo`

    `groups berlin`

    `groups professor`

<img width="1783" height="347" alt="Screenshot 2026-08-01 141018" src="https://github.com/user-attachments/assets/c5389c90-fcee-473c-a0e3-4b0b14927fe1" />

---

## 📂 Shared Development Directory

### Create project directory:

 `sudo mkdir /opt/dev-project`

### Assign group ownership:
 `sudo chgrp developers /opt/dev-project`

### Set permissions:

 `sudo chmod 775 /opt/dev-project`

### Verify:

   `ls -ld /opt/dev-project`

### Test access:

 `sudo -u tokyo touch /opt/dev-project/tokyo.txt`

 `sudo -u berlin touch /opt/dev-project/berlin.txt`

Verify files:

  `ls -ld /opt/dev-project/`

<img width="931" height="138" alt="Screenshot 2026-08-01 141354" src="https://github.com/user-attachments/assets/4fd0a083-dad5-4bc4-99e7-007e81d6b516" />

---

## 🤝 Team Workspace

### Create user:

 `sudo useradd -m nairobi`

 `sudo passwd nairobi`

### Create group:

 `sudo groupadd project-team`

### Add users:

 `sudo usermod -aG project-team nairobi`

 `sudo usermod -aG project-team tokyo`

### Create shared directory:

`sudo mkdir /opt/team-workspace`

### Assign group ownership:

 `sudo chgrp project-team /opt/team-workspace`

### Set permissions:

 `sudo chmod 775 /opt/team-workspace`

### Verify:

 `ls -ld /opt/team-workspace`

<img width="1244" height="421" alt="Screenshot 2026-08-01 142356" src="https://github.com/user-attachments/assets/9db5c40e-0923-4562-99a3-ae8c560f321f" />

### Test file creation:

 `sudo -u nairobi touch /opt/team-workspace/nairobi.txt`

 `ls -ld /opt/team-workspace/`

<img width="1376" height="296" alt="Screenshot 2026-08-01 142647" src="https://github.com/user-attachments/assets/29a85d9a-b727-4342-b240-d4e5bf36aa10" />

---

## ✅ Key Commands Used
useradd
passwd
groupadd
usermod
groups
mkdir
chgrp
chmod
touch
ls

## 📖 What I Learned
- Created Linux users with home directories.
- Set passwords and verified user accounts.
- Created groups and assigned users to one or more groups.
- Managed user memberships using usermod.
- Configured shared directories with group ownership.
- Applied Linux permissions using chmod 775.
- Tested collaborative access by creating files as different users.
- Understood how Linux user, group, and permission management supports secure team collaboration.
  
## 🚀 Skills Practiced
- Linux User Management
- Linux Group Management
- File Permissions
- Directory Ownership
- Access Control
- System Administration
- Linux Command Line
  
## ⭐ If you found this project helpful, feel free to star the repository!
