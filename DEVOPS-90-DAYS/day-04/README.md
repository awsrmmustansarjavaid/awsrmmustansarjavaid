# Day 04 — Users, Groups, Permissions & sudo

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 05 →](../day-05/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Create and manage users and groups
- [ ] Read and set permissions with chmod/chown/umask
- [ ] Configure least-privilege sudo

## 2. Prerequisites

- Days 1-3.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Identity model

Users are listed in `/etc/passwd`, hashed passwords in `/etc/shadow`, groups in `/etc/group`. UID 0 is root. Service accounts should have no login shell.

### 3.2 Permission bits

rwx for owner/group/others. Octal: r=4,w=2,x=1 so 640 = rw-r-----. Special bits: setuid, setgid, sticky (e.g. /tmp). `umask` defines default permissions.

### 3.3 sudo

Delegates specific privileges. Edit with `visudo`; prefer drop-ins in `/etc/sudoers.d/`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create users `alice`, `bob` and group `devs`; add both to `devs`.
2. [ ] Create `/srv/project` owned by `root:devs` with mode 2770 (setgid).
3. [ ] Verify alice can create a file and bob can edit it.
4. [ ] Create a system user `appsvc` with `--shell /usr/sbin/nologin`.
5. [ ] Give `alice` sudo only for `systemctl restart nginx` using a sudoers.d file.

## 5. Real-World Scenario

> A new developer joins and needs access to deploy to `/srv/project` and restart one service, but must not have full root. Implement it and document how to revoke access.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
# Users and groups
sudo useradd -m -s /bin/bash alice
sudo groupadd devs && sudo usermod -aG devs alice
# System account, no login
sudo useradd -r -s /usr/sbin/nologin appsvc
# Shared directory with setgid
sudo mkdir /srv/project && sudo chown root:devs /srv/project && sudo chmod 2770 /srv/project
# Read permissions
ls -ld /srv/project; stat /srv/project
# Least-privilege sudo
echo 'alice ALL=(root) NOPASSWD: /bin/systemctl restart nginx' | sudo tee /etc/sudoers.d/alice
sudo visudo -cf /etc/sudoers.d/alice
# Who am I / groups
id alice
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 04 – Linux Practice: Processes and Services — Challenge Brief

#### Task
Today’s goal is to **practice Linux fundamentals with real commands**.

You will create a short practice note by actually running basic commands and capturing what you see:
- Check running processes
- Inspect one systemd service
- Capture a small troubleshooting flow

This is hands-on. Keep it simple and focused on fundamentals.

---

#### Expected Output
By the end of today, you should have:

- A markdown file named:  
  `linux-practice.md`

or

- A hand written practice log (Recommended)

Your note should show what you actually ran on your system.

---

#### Guidelines
Follow these rules while creating your practice note:

- Run and record output for **at least 6 commands**
- Include **2 process commands** (`ps`, `top`, `pgrep`, etc.)
- Include **2 service commands** (`systemctl status`, `systemctl list-units`, etc.)
- Include **2 log commands** (`journalctl -u <service>`, `tail -n 50`, etc.)
- Pick **one service on your system** (example: `ssh`, `cron`, `docker`) and inspect it
- Keep it **simple and actionable**

Suggested structure for `linux-practice.md`:
- Process checks
- Service checks
- Log checks
- Mini troubleshooting steps

---

#### Resources
You may refer to:

- Your notes from Day 02 and Day 03
- Linux `man` pages
- Your class notes

---

#### Why This Matters for DevOps
Hands‑on practice builds speed and confidence.

When issues happen in production, you won’t have time to search for basic commands.  
This day helps you build muscle memory with Linux fundamentals.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-04/` folder  
3. Add your `linux-practice.md` file  
4. Commit and push your changes to your fork  

---

#### Learn in Public
Share your Day 04 progress on LinkedIn:

- Post 2–3 lines on the Linux commands you practiced
- Share one service you inspected and what you learned
- Optional: screenshot of your practice note

Use hashtags:
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham

Happy Learning
**TrainWithShubham**

---

### 7.2 Day 04 – Linux Practice: Processes and Services — Notes & Solution

#### Process Checks

Command 1:
ps -ef  
- Shows all running processes with CPU and memory usage.
  <img width="1900" height="960" alt="Screenshot 2026-07-27 215806" src="https://github.com/user-attachments/assets/852f0d77-7d7b-4315-b1bf-f0837aa2a337" />


Command 2:
top  
- Live monitoring of system performance.
  <img width="1909" height="955" alt="Screenshot 2026-07-27 220113" src="https://github.com/user-attachments/assets/3288b5f1-c08f-49bb-acae-fc837bc6cdb8" />


Command 3:
pgrep ssh  
- Shows PID of ssh process.
  <img width="1238" height="118" alt="Screenshot 2026-07-27 220221" src="https://github.com/user-attachments/assets/8698434f-a45e-450c-b7bf-950164dfb061" />

---

#### Service Checks (ssh service)

Command 4:
systemctl status sshd
- Checked whether ssh service is active or failed.
  <img width="1813" height="650" alt="Screenshot 2026-07-27 220528" src="https://github.com/user-attachments/assets/7fe4a088-415a-4dd0-9112-afa4714c9968" />

Command 5:
systemctl list-units 
- Listed all running services.
  <img width="1913" height="818" alt="Screenshot 2026-07-27 221037" src="https://github.com/user-attachments/assets/2e20bbae-17e2-443d-a84e-9758fa1e6199" />

---

#### Log Checks

Command 6:
journalctl -u sshd
- Viewed logs related to ssh service.
  <img width="1908" height="290" alt="Screenshot 2026-07-27 221224" src="https://github.com/user-attachments/assets/fe802362-9608-49be-919b-6a5502528fce" />

Command 7:
tail -n 50 filename
- Display the last 50 lines of the file.
  <img width="1914" height="520" alt="Screenshot 2026-07-27 222244" src="https://github.com/user-attachments/assets/a66dfbd6-ace9-4aa2-b877-f72cb759628f" />

---

#### Mini Troubleshooting Flow

Step 1: Check if service is running  
→ systemctl status ssh  

Step 2: If failed, check logs  
→ journalctl -u ssh  

Step 3: If needed, restart service  
→ systemctl restart ssh  

---

#### What I Learned

- How to check running processes
- How to inspect service health
- How logs help in debugging
- Linux troubleshooting is mostly about checking processes, services, and logs

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Build a table mapping octal modes (600, 640, 644, 750, 755, 2770) to typical use cases. | You can demonstrate, without notes: *create and manage users and groups* — with evidence committed to `day-04/`. |
| 2 | Write a script that creates a user, a home dir and adds SSH key. | You can demonstrate, without notes: *read and set permissions with chmod/chown/umask* — with evidence committed to `day-04/`. |
| 3 | Explain why `chmod 777` is a smell. | You can demonstrate, without notes: *configure least-privilege sudo* — with evidence committed to `day-04/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `user is not in the sudoers file` | Add via `visudo` as an admin; groups changes need re-login or `newgrp`. |
| Group change not effective | Log out/in or run `newgrp devs`; check with `id`. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Principle of least privilege: avoid `NOPASSWD: ALL`; disable direct root SSH; lock unused accounts with `usermod -L`.
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

1. What does mode 640 mean?
2. What is setgid on a directory used for?
3. Where are password hashes stored?
4. How do you give a user a single privileged command?
5. **Scenario:** A new developer joins and needs access to deploy to `/srv/project` and restart one service, but must not have full root. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I convert rwxr-x--- to octal? | ☐ | ☐ | ☐ | ☐ |
| Can I explain umask 022? | ☐ | ☐ | ☐ | ☐ |
| Can I create a service account without a login shell? | ☐ | ☐ | ☐ | ☐ |
| Create and manage users and groups | ☐ | ☐ | ☐ | ☐ |
| Read and set permissions with chmod/chown/umask | ☐ | ☐ | ☐ | ☐ |
| Configure least-privilege sudo | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-04/` in your own repository:

```text
day-04/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-04
git add day-04/
git commit -m "day-04: users, groups, permissions & sudo"
git push -u origin day-04
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

## 18. Personal Learning Journal — 🐧 Day 04 - Basic Shell Scripting & Python for DevOps

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date
17 July 2026

---

### 🚀 Introduction

Today, I started exploring automation concepts that are essential for DevOps engineers. I learned the basics of **Shell Scripting** for automating Linux tasks and started learning **Python for DevOps automation**.

Shell scripting helps automate repetitive system administration tasks, while Python provides a powerful and flexible way to build automation tools, scripts, and DevOps workflows.

---

### 📚 Topics Covered

- Introduction to Shell Scripting
- Creating Bash Scripts
- Executing Shell Scripts
- Variables in Bash
- Taking User Input
- Script Execution Permissions
- Writing Basic Automation Scripts
- Introduction to Python for DevOps
- Python Syntax and Structure
- Variables and Data Types
- Type Casting
- User Input
- Operators
- Conditional Statements

---

### 🖥️ Shell Scripting

Shell scripting is a way to automate Linux commands by writing them inside a script file.

Instead of manually executing multiple commands repeatedly, we can create scripts that perform tasks automatically.

Common uses of Shell Scripts:

- Server configuration
- Backup automation
- Application deployment
- System monitoring
- Log management

---

### 📝 Creating a Bash Script

Create a script file:

```bash
nano script.sh
```

Example:

```bash
#!/bin/bash

echo "Hello DevOps Engineer"
echo "Starting automation..."
```

The first line:

```bash
#!/bin/bash
```

is called a **shebang**. It tells Linux which interpreter should execute the script.

---

### ▶️ Executing Shell Scripts

Before running a script, we need to give execution permission.

Check permissions:

```bash
ls -l script.sh
```

Add execute permission:

```bash
chmod +x script.sh
```

Run the script:

```bash
./script.sh
```

---

### 📦 Variables in Shell Script

Variables are used to store values.

Example:

```bash
#!/bin/bash

name="DevOps"

echo "Welcome to $name"
```

Output:

```
Welcome to DevOps
```

---

### ⌨️ Reading User Input

Shell scripts can take input from users.

Example:

```bash
#!/bin/bash

echo "Enter your name:"
read username

echo "Hello $username"
```

Output:

```
Enter your name:
Ali

Hello Ali
```

---

### ⚙️ Basic Automation Script Example

Example: Creating a simple backup folder.

```bash
#!/bin/bash

mkdir backup

echo "Backup folder created successfully"
```

This script automatically creates a folder without manually typing the command.

---

### 🐍 Python for DevOps (Basics)

Python is one of the most commonly used programming languages in DevOps.

It is used for:

- Automation scripts
- Cloud management
- API integration
- Monitoring tools
- Configuration management

---

### 🏗️ Python Syntax & Structure

Python uses simple and readable syntax.

Example:

```python
print("Hello DevOps")
```

Output:

```
Hello DevOps
```

---

### 📦 Python Variables

Variables store data values.

Example:

```python
name = "DevOps Engineer"
age = 25

print(name)
print(age)
```

Output:

```
DevOps Engineer
25
```

---

### 🔢 Python Data Types

Common Python data types:

| Data Type | Example |
|-----------|---------|
| String | `"Linux"` |
| Integer | `100` |
| Float | `10.5` |
| Boolean | `True` / `False` |

Example:

```python
name = "Python"
number = 10
version = 3.12
status = True
```

---

### 🔄 Type Casting in Python

Type casting converts one data type into another.

Examples:

Convert string to integer:

```python
age = int("25")

print(age)
```

Convert integer to string:

```python
number = str(100)

print(number)
```

Convert integer to float:

```python
value = float(10)

print(value)
```

---

### ⌨️ Taking User Input

Python allows users to enter values using:

```python
input()
```

Example:

```python
name = input("Enter your name: ")

print("Hello", name)
```

Output:

```
Enter your name:
Ali

Hello Ali
```

---

### ➕ Python Operators

#### Arithmetic Operators

Used for mathematical operations.

```python
a = 10
b = 5

print(a + b)
print(a - b)
print(a * b)
print(a / b)
```

---

#### Comparison Operators

Used to compare values.

Examples:

```python
x = 10

print(x > 5)
print(x == 10)
print(x != 20)
```

Output:

```
True
True
True
```

---

#### Logical Operators

Used to combine conditions.

Operators:

- and
- or
- not

Example:

```python
age = 25

if age > 18 and age < 30:
    print("Allowed")
```

---

#### Assignment Operators

Used to assign values.

Example:

```python
x = 10

x += 5

print(x)
```

Output:

```
15
```

---

### 🔀 Conditional Statements in Python

Conditional statements allow programs to make decisions.

---

#### if Statement

Example:

```python
age = 20

if age >= 18:
    print("Adult")
```

---

#### if-else Statement

Example:

```python
age = 15

if age >= 18:
    print("Allowed")
else:
    print("Not Allowed")
```

---

#### if-elif-else Statement

Example:

```python
marks = 80

if marks >= 90:
    print("Grade A")

elif marks >= 70:
    print("Grade B")

else:
    print("Grade C")
```

---

### 💻 Practice

During today's practice, I created and tested simple automation scripts.

#### Shell Scripting Practice

Implemented:

- Creating Bash scripts
- Using variables
- Taking user input
- Running scripts using permissions
- Automating basic Linux commands

---

#### Python Practice

Practiced Python programs using:

- Variables
- Data types
- Type casting
- User input
- Print statements
- Arithmetic operations
- Comparison operators
- Logical operators
- Assignment operators
- if-else conditions

---

### 🎯 Key Takeaways

- Shell scripting is a powerful tool for automating repetitive Linux tasks.
- Bash scripts help DevOps engineers manage servers efficiently.
- Python provides a simple and readable syntax for automation.
- Variables and data types are the foundation of programming.
- Operators allow programs to perform calculations and comparisons.
- Conditional statements help create decision-based automation logic.

---

### 📈 Progress

- ✅ Day 01 - DevOps Roadmap
- ✅ Day 02 - Linux Fundamentals
- ✅ Day 03 - Advanced Linux, SSH & AWS Volume Management
- ✅ Day 04 - Basic Shell Scripting & Python for DevOps

**Completed:** 4 / 90 Days 🚀

---

### 💡 What's Next?

Next, I will continue Python for DevOps by learning:

- Loops (`for`, `while`)
- Functions
- Lists
- Tuples
- Dictionaries
- Sets
- File Handling
- Modules and Packages
- Exception Handling

---

⭐ Thank you for following my #90DaysOfDevOps journey!

## 19. Challenge Notes — Day 4: Basics of IAM and Access Management

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

#### 1. Introduction to IAM (Identity and Access Management)

##### What is IAM?
- AWS Identity and Access Management (IAM) allows you to manage access to AWS services and resources securely.
- You can use IAM to create and manage AWS users and groups and assign permissions to allow or deny their access to AWS resources.


[![](https://img.youtube.com/vi/E0hm3tkNqAg/0.jpg)](https://www.youtube.com/watch?v=E0hm3tkNqAg)

[Watch the video](https://www.youtube.com/watch?v=E0hm3tkNqAg)


##### Why is IAM Important?
1. **Security**: Control who can access your resources.
2. **Granular Permissions**: Assign specific permissions to users or groups.
3. **Multi-Factor Authentication (MFA)**: Adds an extra layer of security.
4. **Temporary Access**: Roles for delegation and service access.
5. **Centralized Management**: Manage multiple users under one AWS account.

---

#### 2. Core IAM Concepts

| Concept  | Description |
|----------|-------------|
| **User** | An individual with long-term credentials to access AWS resources. |
| **Group** | A collection of IAM users with common permissions. |
| **Role** | Temporary credentials granted to users or services to access resources. |
| **Policy** | A document that defines permissions using JSON format. |
| **MFA** | An additional authentication layer requiring a second factor (like OTP) along with a password. |

---

#### 3. Creating an IAM User

##### Step 1: Open the IAM Console
1. Sign in to the AWS Management Console.
2. Navigate to **IAM** from the services list.

##### Step 2: Create a User
1. Click on **Users** from the left panel.
2. Click **Add users**.
3. Enter the Username (e.g., `devops-user`).
4. Select AWS credential type:
   - **Access key**: For programmatic access (CLI/SDK).
   - **Password**: For AWS Management Console access.
5. Click **Next: Permissions**.

##### Step 3: Attach Policies
1. Choose how to set permissions:
   - Attach existing policies directly.
   - Add user to a group.
   - Copy permissions from an existing user.
2. Select the **AdministratorAccess** policy for full permissions (for this example).
3. Click **Next: Tags (optional)**.
4. Click **Next: Review**.
5. Review the details and click **Create user**.

##### Step 4: Save Credentials
- Download the `.csv` file containing:
  - **Access Key ID**
  - **Secret Access Key**
- **Never share your credentials publicly!**

---

#### 4. Creating an IAM Group

##### Step 1: Navigate to Groups
1. In the IAM Console, click **Groups** from the sidebar.
2. Click **Create New Group**.

##### Step 2: Configure Group Details
1. Enter a **Group Name** (e.g., `DevOpsTeam`).
2. Attach a policy:
   - Search for **AdministratorAccess**.
   - Check the box to select it.
3. Click **Create Group**.

##### Step 3: Add Users to the Group
1. Go to the **Users** section.
2. Select the user (`devops-user`).
3. Click **Add to group** and choose **DevOpsTeam**.

---

#### 5. Creating an IAM Role

##### What are IAM Roles?
Roles grant temporary access to AWS resources without needing long-term credentials. They are useful for:
- Applications running on EC2 instances.
- AWS services accessing other AWS services.
- Cross-account access.

##### Step 1: Create a Role
1. Go to the **IAM Console** and click **Roles**.
2. Click **Create role**.

##### Step 2: Choose Trusted Entity
- Choose **AWS service** (e.g., **EC2**).

##### Step 3: Attach Policies
- Attach the **AmazonS3FullAccess** policy to allow S3 access.
- Click **Next**.

##### Step 4: Review and Create
- Name the role as `ec2-s3-access-role`.
- Review and click **Create role**.

---

#### 6. Setting Up Multi-Factor Authentication (MFA)

##### Step 1: Enable MFA
1. In the **IAM Console**, go to **Users**.
2. Select your IAM user and go to the **Security credentials** tab.
3. Click **Manage MFA**.

##### Step 2: Configure MFA Device
- Choose **Virtual MFA device**.
- Use an app like **Google Authenticator** or **Authy**.

##### Step 3: Activate MFA
1. Scan the QR code from the MFA app.
2. Enter two consecutive MFA codes generated by the app.
3. Click **Activate MFA**.

---

#### 7. Attaching Policies to IAM Roles and Users

##### Step 1: Understanding Policies
- Policies are **JSON documents** that define permissions.
- **Structure**:
  - **Version**: Version of the policy language.
  - **Statement**: Contains:
    - **Effect**: Allow or Deny.
    - **Action**: Specific API actions.
    - **Resource**: Specifies the applicable resource(s).

##### Step 2: Sample Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```
This policy allows full access to all S3 resources.

##### Step 3: Attaching the Policy
1. Go to **IAM Console**.
2. Navigate to **Users** or **Roles**.
3. Click **Permissions > Add permissions**.
4. Attach the policy by searching for it.
5. Click **Add permissions**.

---

#### 8. Verifying Permissions with AWS CLI

##### Check User Identity
```sh
aws sts get-caller-identity
```

##### Check Role Permissions
Assuming the role:
```sh
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/ec2-s3-access-role --role-session-name devops-session
```

---

#### 9. IAM Best Practices

1. **Least Privilege Principle**: Grant only the necessary permissions.
2. **Use IAM Roles for Applications**: Avoid embedding credentials directly into code.
3. **Enable MFA for Root Account**: Always secure your root account with MFA.
4. **Rotate Access Keys Regularly**: Update and rotate keys to reduce security risks.
5. **Monitor IAM Activity**: Use AWS **CloudTrail** to track user activity.

---

#### 10. Hands-On Activity

##### **Task 1: Create an IAM User and Attach Policy**
1. Create a user with **programmatic access**.
2. Attach **AmazonEC2FullAccess** policy.
3. Verify using:
   ```sh
   aws ec2 describe-instances
   ```

##### **Task 2: Create a Role and Assign It to an EC2 Instance**
1. Create a role with **AmazonS3FullAccess**.
2. Attach the role to an existing **EC2 instance**.
3. Verify S3 access from the instance:
   ```sh
   aws s3 ls
   ```

## 20. Cohort Practice — Day 4: Linux Practice: Processes and Services

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today’s goal is to **practice Linux fundamentals with real commands**.

You will create a short practice note by actually running basic commands and capturing what you see:
- Check running processes
- Inspect one systemd service
- Capture a small troubleshooting flow

This is hands-on. Keep it simple and focused on fundamentals.

---

#### Expected Output
By the end of today, you should have:

- A markdown file named:  
  `linux-practice.md`

or

- A hand written practice log (Recommended)

Your note should show what you actually ran on your system.

---

#### Guidelines
Follow these rules while creating your practice note:

- Run and record output for **at least 6 commands**
- Include **2 process commands** (`ps`, `top`, `pgrep`, etc.)
- Include **2 service commands** (`systemctl status`, `systemctl list-units`, etc.)
- Include **2 log commands** (`journalctl -u <service>`, `tail -n 50`, etc.)
- Pick **one service on your system** (example: `ssh`, `cron`, `docker`) and inspect it
- Keep it **simple and actionable**

Suggested structure for `linux-practice.md`:
- Process checks
- Service checks
- Log checks
- Mini troubleshooting steps

---

#### Resources
You may refer to:

- Your notes from Day 02 and Day 03
- Linux `man` pages
- Your class notes

---

#### Why This Matters for DevOps
Hands‑on practice builds speed and confidence.

When issues happen in production, you won’t have time to search for basic commands.  
This day helps you build muscle memory with Linux fundamentals.

---

#### Submission
1. Fork this `90DaysOfDevOps` repository  
2. Navigate to the `2026/day-04/` folder  
3. Add your `linux-practice.md` file  
4. Commit and push your changes to your fork  

---

#### Learn in Public
Share your Day 04 progress on LinkedIn:

- Post 2–3 lines on the Linux commands you practiced
- Share one service you inspected and what you learned
- Optional: screenshot of your practice note

Use hashtags:
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham

Happy Learning
**TrainWithShubham**

##### Notes: linux-practice

ps aux | head - check the running process first 10 
top - check realtime memory usage
htop - check live memory monitoring
systemctl status ssh - check the ssh running or not

ps aux | grep ssh - check running process and search ssh



mkdir - create directory
mkdir dir1 dir2 dir3  - create the diffect directory 
mkdir -p dir1/subdir1/directory2 - create direct and sub directory in path
mkdir direcory{1..10} - create the multiple directory 


tocuh filename- create file
touch file1 file2 filen - create the multiple file
touch file{1..10} - create the multiple file in 1 to 9


cp source destination - to copy the file and folder 
cp -r - to copy dir and file recursively
cp -f - to copy file dir forcefully
cp -v - to copy file and show the name of file and dir (vervose) 

cp -rvf - to copy file dir in recursively forcefully and verovose

mv source destination - to move the file and dir
suod useradd -m username - to add new user
sudo passwd usernme - to create the password of the user
whoami - check the current user
sudo userdel usename - to delete the user

## 21. Hands-on Project — Day 4: Python CLI with Click

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Python CLI with Click**.  
We’ll build command-line interfaces (CLIs) using Python’s `click` library to create developer-friendly tools.

---

#### 🎯 Learning Goals
- Understand the basics of the `click` library.
- Build simple and nested CLI commands.
- Handle arguments, options, and flags.
- Add colors, prompts, and error handling.
- Package the CLI for reuse.

---

#### 🛠️ Lab Setup & Tasks

```text
1. Install Click
   pip install click

2. Hello world CLI
   python cli_hello.py --name "Alice"
   ✔ Greets the user by name.

3. Multi-command CLI
   python cli_tool.py greet --name "Bob"
   python cli_tool.py math add 3 5
   ✔ Supports subcommands with arguments.

4. Options, prompts, and defaults
   python cli_options.py greet
   python cli_options.py greet --name "Charlie" --caps
   ✔ Adds optional flags, default values, and user prompts.

5. Colors and error handling
   python cli_colors.py greet --name "Dana"
   python cli_colors.py math div 10 0
   ✔ Demonstrates colored output and error handling.

6. Package and run as script
   python -m pip install --editable .
   mycli greet --name "Eve"
   ✔ Shows how to package the CLI for global use.
```

### Files

- [cli_colors.py](files/hands-on-projects/cli_colors.py)
- [cli_hello.py](files/hands-on-projects/cli_hello.py)
- [cli_options.py](files/hands-on-projects/cli_options.py)
- [cli_tool.py](files/hands-on-projects/cli_tool.py)
- [setup.py](files/hands-on-projects/setup.py)


---

[← Day 03](../day-03/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 05 →](../day-05/README.md)
