# 📘 COMPLETE BASH / SHELL SCRIPTING MASTER ROADMAP

## (Beginner → Advanced → DevOps Automation)

# 📘 CHAPTER 1 — Introduction to Shell Scripting

## 🌿 SECTION 1: What is Shell?

- Definition
- How shell works
- User → Shell → Kernel → Hardware
- Real-world analogy
- Why shell exists

## 🌿 SECTION 2: What is Bash?

- Bourne Again Shell
- Bash history
- Why Bash became popular
- Bash vs Shell

## 🌿 SECTION 3: Why Learn Bash?

### Uses:

- Automation
- DevOps
- Cloud
- Monitoring
- CI/CD
- Linux administration
- Cybersecurity
- Data processing

## 🌿 SECTION 4: What Can Bash Automate?

### Real examples:

- Docker deployment
- AWS automation
- User creation
- Log cleanup
- Backup systems
- Cron jobs

# 📘 CHAPTER 2 — Linux Shell Environment

## 🌿 SECTION 1: Types of Shells

| **Shell** | **Description**   |
|-----------|-------------------|
| sh        | Original shell    |
| bash      | Most common       |
| zsh       | Advanced shell    |
| fish      | Beginner friendly |
| ksh       | Korn shell        |

## 🌿 SECTION 2: Check Current Shell

``` bash
echo $SHELL
```

## 🌿 SECTION 3: Available Shells

``` bash
cat /etc/shells
```

## 🌿 SECTION 4: Change Default Shell

chsh -s /bin/bash

## 🌿 SECTION 5: Interactive vs Non-Interactive Shell

## 🌿 SECTION 6: Login vs Non-Login Shell

VERY IMPORTANT topic many beginners skip.

# 📘 CHAPTER 3 — Running Bash Scripts

## 🌿 SECTION 1: Create Script

``` bash
nano hello.sh
```

## 🌿 SECTION 2: Shebang

``` bash
#!/bin/bash
```

Explain:

- interpreter
- portability
- `/usr/bin/env bash`

Example:

``` bash
#!/usr/bin/env bash
```

## 🌿 SECTION 3: Make Executable

``` bash
chmod +x hello.sh
```

## 🌿 SECTION 4: Execute Script

    ./hello.sh
    bash hello.sh

source hello.sh

VERY IMPORTANT:  
Explain difference between:

- bash script.sh
- ./script.sh
- source script.sh

# 📘 CHAPTER 4 — Bash Variables

## 🌿 SECTION 1: Variables Basics

## 🌿 SECTION 2: Naming Rules

## 🌿 SECTION 3: Variable Scope

- local
- global
- environment

## 🌿 SECTION 4: Export Variables

export DB_HOST=localhost

## 🌿 SECTION 5: Environment Variables

## 🌿 SECTION 6: Readonly Variables

readonly pi=3.14

## 🌿 SECTION 7: Unset Variables

    unset name

# 📘 CHAPTER 5 — User Input

Add:

## 🌿 SECTION 4: Default Values

    name=${1:-Guest}

## 🌿 SECTION 5: Input Validation

VERY IMPORTANT in real scripting.

# 📘 CHAPTER 6 — Quotes in Bash (VERY IMPORTANT)

Many beginners struggle here.

## 🌿 Single Quotes

``` bash
echo '$HOME'
```

## 🌿 Double Quotes

``` bash
echo "$HOME"
```

## 🌿 Backticks

\`date\`

## 🌿 Modern Command Substitution

\$(date)

Explain:

- word splitting
- variable expansion
- escaping

# 📘 CHAPTER 7 — Operators

Add:

## 🌿 Logical Operators

&&

\|\|

!

## 🌿 String Operators

=

!=

-z

-n

# 📘 CHAPTER 8 — Conditional Statements

Add:

## 🌿 Nested if

## 🌿 Multiple Conditions

    if [ $a -gt 5 ] && [ $b -lt 10 ]

## 🌿 Using \[\[ \]\]

VERY IMPORTANT modern Bash style.

# 📘 CHAPTER 9 — Loops

Add:

## 🌿 break

## 🌿 continue

## 🌿 Infinite loops

Example:

    while true
    do
    echo "Running"
    done

# 📘 CHAPTER 10 — Functions

Add:

## 🌿 Return Values

    return 0

## 🌿 Local Variables

local name="Ali"

VERY IMPORTANT.

# 📘 CHAPTER 11 — Script Arguments

Add:

## 🌿 shift Command

    shift

## 🌿 getopts (ADVANCED)

Professional scripts use this.

Example:

    ./script.sh -u user -p pass

# 📘 CHAPTER 12 — Exit Codes & Error Handling

Add:

## 🌿 set -e

## 🌿 set -u

## 🌿 set -o pipefail

VERY IMPORTANT professional Bash scripting.

# 📘 CHAPTER 13 — File Handling

Expand heavily.

## 🌿 Read File Line by Line

    while read line
    do
    echo $line

done \< file.txt

## 🌿 File Descriptors

ADVANCED but important.

# 📘 CHAPTER 14 — Text Processing Tools

VERY IMPORTANT DevOps chapter.

## 🌿 grep

- regex
- recursive search
- ignore case

Examples:

``` bash
grep -i error logs.txt
grep -r nginx /etc
```

## 🌿 awk

Explain:

- fields
- FS
- NR
- NF

## 🌿 sed

Explain:

- replace
- delete
- insert
- in-place edit

## 🌿 cut

## 🌿 tr

## 🌿 sort

## 🌿 uniq

## 🌿 xargs

These are ESSENTIAL DevOps tools.

# 📘 CHAPTER 15 — Arrays

Add:

## 🌿 Array Length

## 🌿 Array Slicing

## 🌿 Delete Elements

# 📘 CHAPTER 16 — String Manipulation

This deserves separate chapter.

## 🌿 Length

## 🌿 Replace

## 🌿 Substring

## 🌿 Uppercase

## 🌿 Lowercase

## 🌿 Trim spaces

## 🌿 Regex matching

# 📘 CHAPTER 17 — Process Management

## 🌿 ps

## 🌿 top

## 🌿 htop

## 🌿 jobs

## 🌿 fg/bg

## 🌿 kill

## 🌿 pkill

## 🌿 nohup

VERY IMPORTANT for Linux admins and DevOps.

# 📘 CHAPTER 18 — Signals & Trap

VERY IMPORTANT.

## 🌿 Common Signals

| **Signal** | **Meaning** |
|------------|-------------|
| SIGINT     | Ctrl+C      |
| SIGTERM    | Termination |
| SIGKILL    | Force kill  |

## 🌿 trap Command

    trap "rm -f temp.txt" EXIT

# 📘 CHAPTER 19 — Scheduling with Cron

Add:

## 🌿 Special Cron Keywords

    @daily
    @reboot

## 🌿 Cron Logging

## 🌿 Common Cron Problems

VERY IMPORTANT in production.

# 📘 CHAPTER 20 — Networking Commands for Bash

## 🌿 curl

## 🌿 wget

## 🌿 ping

## 🌿 netstat

## 🌿 ss

## 🌿 dig

## 🌿 nslookup

Very important for DevOps.

# 📘 CHAPTER 21 — Debugging Bash Scripts

## 🌿 bash -x

## 🌿 set -x

## 🌿 Logging

## 🌿 tee command

# 📘 CHAPTER 22 — Advanced Bash Scripting

THIS IS WHERE MOST COURSES STOP.

## 🌿 Case Statement

## 🌿 Here Documents

``` bash
cat << EOF
```

hello

EOF

## 🌿 Here Strings

``` bash
grep root <<< "$text"
```

## 🌿 Command Substitution

## 🌿 Process Substitution

    diff <(ls dir1) <(ls dir2)

## 🌿 Named Pipes (FIFO)

## 🌿 Subshells

## 🌿 Parallel Execution

## 🌿 Background Jobs

# 📘 CHAPTER 23 — Bash Security Best Practices

VERY IMPORTANT and usually skipped.

## 🌿 Avoid Hardcoded Passwords

## 🌿 Quote Variables

## 🌿 Validate Inputs

## 🌿 Use Least Privilege

## 🌿 Avoid rm -rf Mistakes

Example:

``` bash
rm -rf "$dir"
```

NOT:

``` bash
rm -rf $dir
```

# 📘 CHAPTER 24 — Professional Script Structure

VERY IMPORTANT.

Example:

``` bash
#!/bin/bash
set -euo pipefail
# Variables
LOG_FILE="/var/log/app.log"
# Functions
log() {
echo "$(date) : $1"
}
main() {
```

log "Script started"

    }

main

# 📘 CHAPTER 25 — Real DevOps Bash Projects

THIS WILL BUILD REAL SKILLS.

## 🌿 System Health Monitor

- CPU
- RAM
- Disk

## 🌿 Backup Automation

## 🌿 Docker Cleanup Script

## 🌿 Kubernetes Helper Script

## 🌿 AWS EC2 Automation

## 🌿 Log Rotation Script

## 🌿 CI/CD Deployment Script

## 🌿 Nginx Monitoring Script

## 🌿 SSL Expiry Checker

## 🌿 Website Uptime Monitor

# 📘 CHAPTER 26 — Bash for DevOps Tools

## 🌿 Git Automation

## 🌿 Docker Automation

## 🌿 Kubernetes Scripting

## 🌿 Terraform Integration

## 🌿 Jenkins Pipelines

## 🌿 AWS CLI Automation

## 🌿 Ansible + Bash

# 📘 CHAPTER 27 — Bash Best Practices

## 🌿 Naming conventions

## 🌿 Comments

## 🌿 Functions

## 🌿 Logging

## 🌿 Error handling

## 🌿 Input validation

## 🌿 Idempotent scripts

VERY IMPORTANT DevOps concept.

# 📘 CHAPTER 28 — Bash Tips & Tricks

## 🌿 aliases

## 🌿 history

## 🌿 TAB completion

## 🌿 Ctrl+r search

## 🌿 brace expansion

Example:

touch file{1..5}.txt

## 🌿 Wildcards

\*

?

\[\]

# 📘 CHAPTER 29 — Common Bash Mistakes

EXTREMELY IMPORTANT.

## 🌿 Unquoted Variables

BAD:

``` bash
rm -rf $dir
```

GOOD:

``` bash
rm -rf "$dir"
```

## 🌿 Spaces Around =

WRONG:

name = Ali

CORRECT:

    name="Ali"

## 🌿 Using Backticks Instead of \$()

# 📘 CHAPTER 30 — Complete Bash Learning Path

## Beginner

- commands
- variables
- loops
- conditions

## Intermediate

- arrays
- functions
- files
- cron

## Advanced

- text processing
- debugging
- signals
- process management

## DevOps

- automation
- cloud
- Docker
- Kubernetes
- CI/CD

# 🧠 EXTRA IMPORTANT TOPICS YOU MUST ADD

These are commonly missing from beginner notes.

| **Topic**            | **Importance** |
|----------------------|----------------|
| Quotes               | VERY HIGH      |
| Pipe & Redirection   | VERY HIGH      |
| stdin stdout stderr  | VERY HIGH      |
| getopts              | HIGH           |
| set -euo pipefail    | VERY HIGH      |
| Regex                | HIGH           |
| trap                 | HIGH           |
| process substitution | ADVANCED       |
| shellcheck           | VERY HIGH      |
| subshells            | HIGH           |

# 📘 SPECIAL CHAPTER — Pipes & Redirection (VERY IMPORTANT)

You forgot one of the MOST IMPORTANT topics.

# 📘 CHAPTER — Input Output Redirection

## 🌿 stdout

\>

## 🌿 stderr

2\>

## 🌿 append

\>\>

## 🌿 pipe

\|

Example:

cat file.txt \| grep root

## 🌿 Redirect Both stdout + stderr

    command > output.log 2>&1

This is EXTREMELY important in DevOps.

# 📘 SPECIAL CHAPTER — ShellCheck

Professional Bash developers use this tool.

## Install

``` bash
sudo apt install shellcheck
```

## Usage

shellcheck script.sh

It finds:

- bugs
- syntax mistakes
- unsafe code

# 🚀 BEST WAY TO LEARN BASH SCRIPTING

## Step 1

Learn Linux commands first.

## Step 2

Practice tiny scripts daily.

## Step 3

Automate your own tasks.

## Step 4

Read GitHub scripts.

## Step 5

Build real DevOps projects.

# 🧠 BEST MINI PROJECTS FOR BEGINNERS

| **Project**     | **Skill**  |
|-----------------|------------|
| Calculator      | variables  |
| File organizer  | loops      |
| Backup script   | automation |
| User creator    | conditions |
| System monitor  | DevOps     |
| Docker cleanup  | real-world |
| Website monitor | networking |

# 📚 BEST PRACTICE FOR WRITING PROFESSIONAL BASH SCRIPTS

``` bash
#!/usr/bin/env bash
set -euo pipefail
# =========================
# Variables
# =========================
LOG_FILE="app.log"
# =========================
# Functions
# =========================
log() {
echo "$(date) : $1" >> "$LOG_FILE"
}
# =========================
# Main Program
# =========================
main() {
```

log "Application started"

    }

main

# 🏆 FINAL ADVICE

## DO:

✅ Practice daily  
✅ Write scripts manually  
✅ Break problems into steps  
✅ Learn Linux deeply  
✅ Learn text processing tools  
✅ Automate your own workflow

## DON'T:

❌ Copy-paste blindly  
❌ Memorize without understanding  
❌ Write huge scripts initially  
❌ Ignore debugging

# **📘 CHAPTER 1 — Introduction to Shell Scripting**

# **🌿 SECTION 1: What is Shell?**

# **🧠 Definition of Shell**

A **Shell** is a program that acts as an interface between the user and the Linux operating system.

It allows users to:

- Type commands
- Run programs
- Manage files
- Control the operating system
- Automate tasks

The shell receives commands from the user, interprets them, and sends them to the Linux kernel for execution.

# **🧠 Simple Meaning**

Think of shell as a **translator** between:

- Human language (commands)
- Computer language (kernel operations)

You type:

``` bash
mkdir test
```

The shell understands the command and asks Linux to:

> “Create a directory named test”

Linux kernel performs the task.

# **🧠 How Shell Works**

# **🔄 Complete Flow**

User → Shell → Kernel → Hardware

# **🧱 Step-by-Step Explanation**

| **Component** | **Role**                     |
|---------------|------------------------------|
| User          | Gives commands               |
| Shell         | Interprets commands          |
| Kernel        | Core of operating system     |
| Hardware      | Performs physical operations |

# **🧠 Example Flow**

You type:

``` bash
ls
```

### **What happens internally?**

## **Step 1 — User**

You enter command:

``` bash
ls
```

## **Step 2 — Shell**

Shell checks:

- Is command valid?
- Where is `ls` located?

Usually:

/bin/ls

## **Step 3 — Kernel**

Kernel interacts with:

- file system
- storage
- memory

## **Step 4 — Hardware**

Hard disk returns directory information.

## **Step 5 — Output**

Shell displays files on screen.

# **🧱 Real-World Analogy**

# **🍔 Restaurant Analogy**

| **Real World** | **Linux World** |
|----------------|-----------------|
| Customer       | User            |
| Waiter         | Shell           |
| Chef           | Kernel          |
| Kitchen        | Hardware        |

# **🧠 Explanation**

You do NOT go directly to kitchen.

Instead:

1.  You tell waiter what you want
2.  Waiter communicates with chef
3.  Chef prepares food
4.  Waiter brings output

Same in Linux:

1.  User types command
2.  Shell communicates with kernel
3.  Kernel performs operation
4.  Shell shows output

# **🧠 Why Shell Exists**

Without shell:

- users would need to talk directly to kernel
- operating system would be extremely difficult to use

Shell makes Linux:

- easier
- faster
- interactive
- automatable

# **🧠 Why Shell is Important**

Shell allows:

- command execution
- automation
- scripting
- system administration
- DevOps operations
- cloud management

Without shell:

- DevOps automation would be impossible
- CI/CD pipelines would not work
- server management would become difficult

# **🧠 Types of User Interfaces**

Linux has 2 main interfaces:

| **Interface** | **Example**         |
|---------------|---------------------|
| CLI           | Terminal            |
| GUI           | Desktop environment |

# **🧠 CLI vs GUI**

| **CLI**             | **GUI**                      |
|---------------------|------------------------------|
| Fast                | Slower                       |
| Lightweight         | Heavy                        |
| Powerful            | Easy for beginners           |
| Automation possible | Limited automation           |
| Used in DevOps      | Used mostly by desktop users |

# **🧠 Why DevOps Engineers Prefer Shell**

Because shell:

- automates tasks
- works remotely
- consumes less resources
- controls servers efficiently
- integrates with cloud tools

Most Linux servers:

- do NOT even have GUI installed

Everything is controlled using shell.

# **🌿 SECTION 2: What is Bash?**

# **🧠 What is Bash?**

Bash stands for:

# **📘 Bourne Again Shell**

It is:

- the most popular Linux shell
- command interpreter
- scripting language
- automation tool

# **🧠 Simple Meaning**

Bash is a shell program that:

- accepts commands
- executes commands
- allows automation using scripts

# **🧠 Why “Bourne Again Shell”?**

Bash was created as an improved version of:

# **Bourne Shell (sh)**

Created by:  
Stephen Bourne

“Bourne Again Shell” is a joke/reference:

- “born again”
- improved Bourne Shell

# **🧠 Bash History**

| **Year**    | **Event**                 |
|-------------|---------------------------|
| 1970s       | Bourne Shell (sh) created |
| 1989        | Bash released             |
| GNU Project | Bash adopted officially   |

# **🧠 Who Developed Bash?**

Bash was developed for:  
GNU Project

Main developer:  
Brian Fox

# **🧠 Why Bash Became Popular**

Bash became popular because:

- free and open-source
- powerful
- scripting support
- automation capabilities
- available on almost every Linux system
- backward compatible with sh

# **🧠 Features of Bash**

| **Feature**       | **Description**      |
|-------------------|----------------------|
| Command execution | Run Linux commands   |
| Scripting         | Automate tasks       |
| Variables         | Store data           |
| Loops             | Repeat tasks         |
| Conditions        | Decision making      |
| Functions         | Reusable code        |
| Job control       | Background processes |
| History           | Previous commands    |
| Auto-completion   | TAB completion       |

# **🧠 Bash vs Shell**

Many beginners confuse this topic.

# **📘 Important Understanding**

## **Shell**

Shell is a GENERAL concept.

## **Bash**

Bash is ONE TYPE of shell.

# **🧠 Analogy**

| **Category** | **Example** |
|--------------|-------------|
| Vehicle      | Shell       |
| Car          | Bash        |

# **🧠 Shell vs Bash Table**

| **Shell**              | **Bash**           |
|------------------------|--------------------|
| Generic term           | Specific shell     |
| Many types exist       | One implementation |
| Command interpreter    | Advanced shell     |
| Includes sh, bash, zsh | Most common shell  |

# **🧠 Other Popular Shells**

| **Shell** | **Description**          |
|-----------|--------------------------|
| sh        | Original UNIX shell      |
| bash      | Most popular Linux shell |
| zsh       | Advanced shell           |
| fish      | User-friendly shell      |
| ksh       | Korn shell               |

# **🧠 Why Bash is Important for DevOps**

Most:

- Linux servers
- cloud instances
- Docker containers
- CI/CD pipelines

use Bash scripting heavily.

# **🌿 SECTION 3: Why Learn Bash?**

# **🧠 Why Bash is Important**

Bash is one of the most important skills for:

- Linux administrators
- DevOps engineers
- cloud engineers
- cybersecurity professionals
- backend engineers

# **🧠 Main Uses of Bash**

# **🔹 1. Automation**

Automation means:

> computers perform tasks automatically without manual work

Example:  
Instead of typing:

``` bash
sudo apt update
sudo apt upgrade -y
```

daily manually,  
you can create one script:

``` bash
#!/bin/bash
sudo apt update && sudo apt upgrade -y
```

Now one command performs everything.

# **🔹 2. DevOps**

DevOps heavily uses Bash for:

- deployments
- monitoring
- server management
- automation
- CI/CD

Example:

- deploying Docker containers
- restarting services
- checking logs

# **🔹 3. Cloud Computing**

Cloud engineers use Bash with:

- AWS CLI
- Azure CLI
- Google Cloud CLI

Example:

    aws ec2 describe-instances

# **🔹 4. Monitoring**

Bash scripts monitor:

- CPU usage
- RAM usage
- Disk usage
- server uptime
- running services

Example:

``` bash
df -h
```

# **🔹 5. CI/CD Pipelines**

CI/CD tools use shell scripts heavily.

Examples:

- Jenkins
- GitHub Actions
- GitLab CI

Scripts:

- build applications
- run tests
- deploy applications

# **🔹 6. Linux Administration**

Linux admins use Bash for:

- creating users
- permissions
- backups
- package installation
- service management

Example:

``` bash
useradd devops
```

# **🔹 7. Cybersecurity**

Ethical hackers and security engineers use Bash for:

- automation
- reconnaissance
- scanning
- log analysis

# **🔹 8. Data Processing**

Bash processes:

- logs
- CSV files
- text files
- reports

Using:

- grep
- awk
- sed
- cut

# **🧠 Why Bash is Still Relevant**

Even with Python and Go,  
Bash is still extremely important because:

- built into Linux
- lightweight
- fast
- ideal for automation
- excellent for system tasks

# **🧠 Bash Skill Benefits**

Learning Bash helps you:

- understand Linux deeply
- automate repetitive tasks
- become efficient
- work in DevOps
- manage cloud servers
- save time

# **🌿 SECTION 4: What Can Bash Automate?**

# **🧠 Bash Can Automate Almost Anything in Linux**

Bash can automate:

- system tasks
- cloud tasks
- DevOps workflows
- monitoring
- deployments
- backups

# **🔹 1. Docker Deployment Automation**

Example:

``` bash
#!/bin/bash
```

docker build -t myapp .

``` bash
docker run -d -p 80:80 myapp
```

This script:

- builds Docker image
- starts container automatically

# **🔹 2. AWS Automation**

Example:

``` bash
#!/bin/bash
aws ec2 start-instances --instance-ids i-123456
```

This script:

- starts AWS EC2 instance automatically

# **🔹 3. User Creation Automation**

Instead of creating users manually:

``` bash
useradd ali
passwd ali
```

You can automate:

``` bash
#!/bin/bash
for user in ali ahmed sara
do
useradd $user
done
```

# **🔹 4. Log Cleanup Automation**

Servers generate huge logs.

Example:

``` bash
find /var/log -name "*.log" -mtime +7 -delete
```

This deletes logs older than 7 days.

# **🔹 5. Backup Automation**

Example:

``` bash
#!/bin/bash
tar -czf backup.tar.gz /home/user
```

Creates compressed backup automatically.

# **🔹 6. Cron Job Automation**

Cron runs scripts automatically at scheduled time.

Example:

0 2 \* \* \* /home/user/backup.sh

Meaning:

- run backup daily at 2 AM

# **🔹 7. Service Monitoring**

Example:

``` bash
systemctl status nginx
```

Automation script can:

- detect service failure
- restart automatically

# **🔹 8. Disk Monitoring**

Example:

``` bash
df -h
```

Script can:

- monitor disk usage
- send alert if storage full

# **🔹 9. Website Monitoring**

Example:

``` bash
curl -I https://example.com
```

Script checks:

- website online/offline
- response code

# **🔹 10. CI/CD Deployment Scripts**

Bash can automate:

- pulling code
- building application
- restarting containers
- deployment

Example:

``` bash
git pull
docker-compose up -d --build
```

# **🧠 Real DevOps Workflow Example**

Imagine:  
You manage 100 Linux servers.

Without Bash:

- repetitive manual work
- slow
- error-prone

With Bash:

- one script controls everything

This is why Bash is critical in DevOps.

# **🧠 Important Advice for Beginners**

# **✅ Do Not Memorize Everything**

Focus on:

- understanding logic
- practicing daily
- writing small scripts

# **✅ Practice Real Commands**

Best learning method:

- open terminal
- test commands
- break things safely
- fix them

# **✅ Start Small**

Begin with:

- hello world
- calculator
- backup script
- file checker

Then move to:

- automation
- monitoring
- cloud scripting

# **🏆 Final Summary**

| **Topic**  | **Meaning**                      |
|------------|----------------------------------|
| Shell      | Interface between user and Linux |
| Bash       | Most popular Linux shell         |
| Scripting  | Automating commands              |
| Automation | Reduce manual work               |
| DevOps     | Bash heavily used                |
| Cloud      | AWS/Azure automation             |
| Monitoring | Check system health              |

# **📘 CHAPTER 2 — Linux Shell Environment**

# **🌿 SECTION 1: Types of Shells**

# **🧠 What is a Shell Environment?**

A shell environment is the complete working environment where shell operates.

It includes:

- shell program
- variables
- user settings
- command history
- configuration files
- aliases
- paths

The shell environment controls:

- how commands behave
- how terminal works
- how scripts execute

# **🧠 What Are Different Types of Shells?**

Linux supports multiple shell programs.

Each shell:

- accepts commands
- executes commands
- supports scripting

But features and behavior may differ.

# **🧱 Common Linux Shells**

| **Shell** | **Full Name**              | **Description**           |
|-----------|----------------------------|---------------------------|
| sh        | Bourne Shell               | Original UNIX shell       |
| bash      | Bourne Again Shell         | Most common Linux shell   |
| zsh       | Z Shell                    | Advanced modern shell     |
| fish      | Friendly Interactive Shell | Beginner-friendly shell   |
| ksh       | Korn Shell                 | Powerful enterprise shell |

# **🔹 1. sh — Bourne Shell**

# **🧠 What is sh?**

`sh` is the original UNIX shell.

Created by:  
Stephen Bourne

It became the foundation for many modern shells.

# **🧠 Features**

- simple
- lightweight
- portable
- basic scripting support

# **🧠 Limitations**

Compared to Bash:

- fewer features
- limited scripting capabilities
- weaker interactive tools

# **🧠 Example**

Run sh shell:

``` bash
sh
```

Exit:

    exit

# **🔹 2. bash — Bourne Again Shell**

# **🧠 What is Bash?**

Bash is:

- the most popular Linux shell
- default shell on many Linux systems

# **🧠 Why Bash is Popular**

Because it supports:

- scripting
- automation
- history
- tab completion
- variables
- arrays
- functions
- DevOps automation

# **🧠 Features**

| **Feature**     | **Supported** |
|-----------------|---------------|
| Scripting       | ✅            |
| Variables       | ✅            |
| Arrays          | ✅            |
| Auto-completion | ✅            |
| History         | ✅            |
| Job control     | ✅            |

# **🧠 Why DevOps Uses Bash**

Most:

- Linux servers
- Docker containers
- cloud systems
- CI/CD tools

depend heavily on Bash.

# **🔹 3. zsh — Z Shell**

# **🧠 What is zsh?**

Zsh is an advanced shell with:

- better customization
- themes
- plugins
- smarter auto-completion

# **🧠 Why Developers Like zsh**

Features:

- powerful terminal experience
- improved suggestions
- spelling correction
- better productivity

# **🧠 Oh My Zsh**

Many developers use:  
Oh My Zsh

It adds:

- themes
- plugins
- shortcuts

# **🧠 Example Features**

``` bash
git che<TAB>
```

Auto-completes:

``` bash
git checkout
```

# **🔹 4. fish — Friendly Interactive Shell**

# **🧠 What is fish?**

Fish shell focuses on:

- beginner friendliness
- beautiful terminal experience
- easy configuration

# **🧠 Features**

| **Feature**         | **Available** |
|---------------------|---------------|
| Syntax highlighting | ✅            |
| Smart suggestions   | ✅            |
| Auto-completion     | ✅            |
| Beginner friendly   | ✅            |

# **🧠 Why Some Beginners Like Fish**

Fish:

- looks modern
- easier to use
- more visual

But:

- not fully POSIX compatible
- less common in servers

# **🔹 5. ksh — Korn Shell**

# **🧠 What is ksh?**

Korn shell was designed as:

- improved Bourne shell
- enterprise shell

# **🧠 Where Used**

Mostly:

- enterprise UNIX systems
- older corporate environments

# **🧠 Features**

- scripting
- performance
- advanced shell programming

# **🧠 Which Shell Should Beginners Learn?**

# **✅ Best Choice: Bash**

Why?

- most popular
- used in DevOps
- available everywhere
- excellent scripting support

After learning Bash:

- learning zsh or sh becomes easier

# **🌿 SECTION 2: Check Current Shell**

# **🧠 What is Current Shell?**

Current shell means:

> the shell currently running your terminal session

# **🧠 Check Current Shell Command**

``` bash
echo $SHELL
```

# **🧠 Example Output**

/bin/bash

OR

/usr/bin/zsh

# **🧠 What Does This Mean?**

| **Output** | **Meaning**  |
|------------|--------------|
| /bin/bash  | Bash shell   |
| /bin/zsh   | Zsh shell    |
| /bin/sh    | Bourne shell |

# **🧠 Understanding** `$SHELL`

`$SHELL` is an environment variable.

It stores:

- default login shell path

# **🧠 Another Way to Check Current Shell**

``` bash
ps -p $$
```

# **🧠 Explanation**

| **Part** | **Meaning**              |
|----------|--------------------------|
| ps       | process status           |
| -p       | select PID               |
| \$\$     | current shell process ID |

# **🌿 SECTION 3: Available Shells**

# **🧠 What Are Available Shells?**

Linux stores list of valid shells inside:

/etc/shells

# **🧠 View Available Shells**

``` bash
cat /etc/shells
```

# **🧠 Example Output**

/bin/sh

/bin/bash

/bin/zsh

/usr/bin/fish

# **🧠 Why This File Important?**

This file tells Linux:

- which shells are trusted
- which shells users can use

# **🧠 Why Administrators Use It**

System administrators use `/etc/shells` for:

- shell management
- user configuration
- security control

# **🌿 SECTION 4: Change Default Shell**

# **🧠 What is Default Shell?**

Default shell means:

> shell automatically loaded after login

# **🧠 Change Shell Command**

chsh -s /bin/bash

# **🧠 Explanation**

| **Part** | **Meaning**   |
|----------|---------------|
| chsh     | change shell  |
| -s       | specify shell |

# **🧠 Example: Change to zsh**

chsh -s /bin/zsh

# **🧠 Important Note**

After changing shell:

- logout
- login again

Then new shell loads.

# **🧠 Check Current User Shell**

``` bash
grep $USER /etc/passwd
```

Example output:

charlie:x:1000:1000::/home/charlie:/bin/bash

Last part:

/bin/bash

is the default shell.

# **🧠 Why Developers Change Shells**

Reasons:

- customization
- plugins
- productivity
- better auto-completion

# **🌿 SECTION 5: Interactive vs Non-Interactive Shell**

# **🧠 VERY IMPORTANT CONCEPT**

Many beginners skip this topic,  
but it is extremely important in:

- scripting
- DevOps
- Linux administration

# **🧠 What is Interactive Shell?**

Interactive shell means:

> user manually types commands

# **🧠 Examples**

You open terminal and type:

``` bash
ls
```

pwd

``` bash
cd
```

This is interactive shell.

# **🧠 Features of Interactive Shell**

| **Feature**      | **Available** |
|------------------|---------------|
| Command history  | ✅            |
| TAB completion   | ✅            |
| Aliases          | ✅            |
| Prompts          | ✅            |
| User interaction | ✅            |

# **🧠 Example Interactive Session**

charlie@server:~\$

You type commands manually.

# **🧠 What is Non-Interactive Shell?**

Non-interactive shell means:

> commands run automatically without user interaction

Usually:

- scripts
- cron jobs
- automation tools

# **🧠 Example**

Script:

``` bash
#!/bin/bash
echo "Backup started"
tar -czf backup.tar.gz /home
```

Run:

``` bash
bash backup.sh
```

This is non-interactive shell.

# **🧠 Real DevOps Examples**

| **Tool**             | **Type**        |
|----------------------|-----------------|
| Jenkins pipeline     | Non-interactive |
| Cron job             | Non-interactive |
| CI/CD script         | Non-interactive |
| Manual terminal work | Interactive     |

# **🧠 Why This Matters**

Some commands behave differently in:

- interactive shell
- non-interactive shell

Example:

- aliases may not work in scripts
- prompts unavailable in cron jobs

# **🧠 Check if Shell is Interactive**

``` bash
echo $-
```

If output contains:

i

then shell is interactive.

Example:

himBH

Contains `i` → interactive.

# **🌿 SECTION 6: Login vs Non-Login Shell**

# **🚨 VERY IMPORTANT TOPIC**

This confuses MANY beginners.

But understanding this helps in:

- Bash configuration
- environment variables
- scripting
- DevOps environments

# **🧠 What is Login Shell?**

Login shell starts when user logs into system.

Examples:

- SSH login
- TTY login
- first terminal session

# **🧠 Login Shell Loads Special Files**

Bash reads:

/etc/profile

    ~/.bash_profile
    ~/.bash_login
    ~/.profile

These files:

- configure environment
- set PATH
- load variables

# **🧠 Example**

When SSH login happens:

``` bash
ssh user@server
```

Login shell starts.

# **🧠 What is Non-Login Shell?**

Non-login shell means:

> shell started without full login process

Examples:

- opening new terminal tab
- running script
- subshell

# **🧠 Non-Login Shell Reads**

Usually:

    ~/.bashrc

# **🧠 Difference Table**

| **Login Shell**     | **Non-Login Shell**       |
|---------------------|---------------------------|
| Full login session  | Additional shell session  |
| Reads profile files | Reads bashrc              |
| SSH login           | Opening terminal          |
| Sets environment    | Uses existing environment |

# **🧠 Important Bash Configuration Files**

| **File**        | **Purpose**                |
|-----------------|----------------------------|
| ~/.bashrc       | interactive shell settings |
| ~/.profile      | login shell settings       |
| ~/.bash_profile | login shell config         |
| /etc/profile    | system-wide profile        |

# **🧠 What Usually Goes Inside** `.bashrc`

Examples:

- aliases
- prompt customization
- functions

Example:

alias update='sudo apt update && sudo apt upgrade -y'

# **🧠 What Usually Goes Inside** `.profile`

Examples:

- PATH variables
- environment setup

Example:

export PATH=\$PATH:/custom/bin

# **🧠 Why DevOps Engineers Must Understand This**

Because:

- automation may fail
- PATH issues occur
- cron behaves differently
- environment variables missing

VERY common production issue.

# **🧠 Example Real Problem**

Script works manually:

python app.py

But fails in cron.

Why?

- cron uses non-login non-interactive shell
- PATH variable missing

# **🏆 Final Summary**

| **Concept**           | **Meaning**              |
|-----------------------|--------------------------|
| Shell                 | Command interpreter      |
| Bash                  | Most popular Linux shell |
| Interactive shell     | User types commands      |
| Non-interactive shell | Script automation        |
| Login shell           | Starts after login       |
| Non-login shell       | Additional shell session |
| ~/.bashrc             | Interactive shell config |
| ~/.profile            | Login shell config       |

# **📘 CHAPTER 3 — Running Bash Scripts**

# **🌿 SECTION 1: Create Script**

# **🧠 What is a Bash Script?**

A Bash script is a file containing:

- Linux commands
- Bash code
- automation logic

Instead of typing commands one-by-one manually,  
you place them inside a file and execute them together.

# **🧠 Why Use Scripts?**

Scripts help:

- automate tasks
- save time
- reduce mistakes
- manage servers
- perform DevOps automation

# **🧠 Script File Extension**

Most Bash scripts use:

.sh

Example:

backup.sh

deploy.sh

monitor.sh

⚠ Important:  
Linux does NOT require `.sh` extension,  
but it is best practice.

# **🧠 Create Your First Script**

Using nano editor:

``` bash
nano hello.sh
```

# **🧠 What is Nano?**

Nano is a simple terminal text editor.

Used for:

- creating files
- editing scripts
- configuration editing

# **🧠 Add This Code**

Inside file:

``` bash
#!/bin/bash
echo "Hello World"
```

# **🧠 Save File in Nano**

| **Key**  | **Action** |
|----------|------------|
| CTRL + O | Save       |
| ENTER    | Confirm    |
| CTRL + X | Exit       |

# **🧠 Verify File Exists**

``` bash
ls
```

You should see:

hello.sh

# **🌿 SECTION 2: Shebang**

# **🧠 What is Shebang?**

Shebang is the first line in script:

``` bash
#!/bin/bash
```

It tells Linux:

> which interpreter should execute the script

# **🧠 Why Called “Shebang”?**

Because:

\# = sharp

! = bang

Together:

``` bash
#! = shebang
```

# **🧠 What is Interpreter?**

An interpreter is a program that:

- reads code
- understands instructions
- executes commands

# **🧠 Example**

Python script:

    print("Hello")

needs Python interpreter.

Similarly:  
Bash script needs Bash interpreter.

# **🧠 Bash Interpreter Path**

Most common:

/bin/bash

Meaning:

- Bash program exists inside `/bin/bash`

# **🧠 How Shebang Works**

Example:

``` bash
#!/bin/bash
echo "Hello"
```

Linux sees:

``` bash
#!/bin/bash
```

and understands:

> “Use Bash interpreter to run this file”

# **🧠 Without Shebang**

Script may:

- fail
- run incorrectly
- use wrong shell

# **🧠 Example Problem**

Suppose script contains:

``` bash
#!/bin/bash
arr=(1 2 3)
```

Arrays work in Bash.

But if script accidentally runs in `sh`,  
it may fail because:

- `sh` does not fully support Bash arrays

# **🧠 Portability in Scripts**

# **📘 What is Portability?**

Portability means:

> script works correctly on different Linux systems

# **🧠 Problem with Hardcoded Path**

This:

``` bash
#!/bin/bash
```

assumes Bash exists exactly here:

/bin/bash

But some systems may use:

/usr/bin/bash

# **🧠 Better Portable Method**

Use:

``` bash
#!/usr/bin/env bash
```

# **🧠 What Does** `/usr/bin/env` **Do?**

`env` searches system PATH for Bash automatically.

It finds:

- correct Bash location
- available interpreter

# **🧠 Why Professionals Prefer This**

Because:

- more portable
- works across systems
- safer in DevOps environments

# **🧠 Modern Best Practice**

Preferred:

``` bash
#!/usr/bin/env bash
```

Older style:

``` bash
#!/bin/bash
```

Both work,  
but `/usr/bin/env bash` is more portable.

# **🧠 Example Professional Script**

``` bash
#!/usr/bin/env bash
echo "Deployment started"
```

# **🧠 Important Note**

Shebang only matters when script executed directly:

    ./script.sh

NOT when using:

``` bash
bash script.sh
```

because here:

- you explicitly told Bash to run script

# **🌿 SECTION 3: Make Executable**

# **🧠 Why Script Does Not Run Directly Initially**

When file created:

``` bash
nano hello.sh
```

it usually lacks execute permission.

Linux security requires:

- executable permission to run files

# **🧠 File Permissions**

Linux permissions:

    r = read
    w = write
    x = execute

# **🧠 Check Permissions**

``` bash
ls -l hello.sh
```

Example:

-rw-r--r-- 1 user user 45 May 10 hello.sh

Notice:

x

is missing.

Meaning:

- script executable permission not granted

# **🧠 Add Execute Permission**

``` bash
chmod +x hello.sh
```

# **🧠 Explanation**

| **Part** | **Meaning**             |
|----------|-------------------------|
| chmod    | change mode/permissions |
| +x       | add execute permission  |

# **🧠 Verify Again**

``` bash
ls -l hello.sh
```

Now:

-rwxr-xr-x

contains:

x

meaning executable.

# **🌿 SECTION 4: Execute Script**

# **🧠 There Are Multiple Ways to Run Scripts**

VERY IMPORTANT topic.

Different execution methods behave differently.

# **🔹 Method 1 — Execute Directly**

    ./hello.sh

# **🧠 Meaning of** `./`

    . = current directory

So:

    ./hello.sh
    means:

> run script from current directory

# **🧠 Requirements**

For this method:

- execute permission required
- shebang important

# **🧠 Flow**

Linux:

1.  reads shebang
2.  finds interpreter
3.  executes script

# **🔹 Method 2 — Run Using Bash**

``` bash
bash hello.sh
```

# **🧠 What Happens Here?**

You manually tell:

> “Use Bash interpreter for this file”

# **🧠 Important Difference**

In this method:

- execute permission NOT required
- shebang NOT necessary

Because:

- Bash directly reads script

# **🧠 Example**

Even without:

``` bash
chmod +x
```

this still works:

``` bash
bash hello.sh
```

# **🔹 Method 3 — Source Script**

source hello.sh

OR:

    . hello.sh

Both are same.

# **🧠 What Does** `source` **Do?**

`source` runs script:

> inside CURRENT shell session

NOT in separate shell.

# **🧠 Why Important?**

Changes remain active after script ends.

# **🧠 Example**

Script:

``` bash
#!/bin/bash
name="Charlie"
```

Run:

source hello.sh

Now:

``` bash
echo $name
```

Output:

Charlie

Variable exists in current shell.

# **🧠 But If You Run Normally**

``` bash
bash hello.sh
then:
echo $name
```

shows nothing.

Because:

- script ran in separate shell process

# **🚨 VERY IMPORTANT DIFFERENCE**

# **🧠 Difference Between Execution Methods**

# **🔹 1.** `bash script.sh`

``` bash
bash script.sh
```

# **🧠 Behavior**

- Bash explicitly executes script
- execute permission NOT required
- shebang ignored mostly
- runs in child shell

# **🧠 Use Cases**

Useful for:

- testing scripts
- quick execution
- debugging

# **🔹 2.** `./script.sh`

    ./script.sh

# **🧠 Behavior**

- script executed directly
- execute permission required
- shebang required
- OS chooses interpreter

# **🧠 Professional Usage**

Most common professional method.

# **🔹 3.** `source script.sh`

source script.sh

# **🧠 Behavior**

- runs inside current shell
- no new shell created
- variables remain active
- environment changes persist

# **🧠 Common Uses**

Used for:

- loading environment variables
- aliases
- Bash configuration

# **🧠 Real Example**

Reload `.bashrc
` without restarting terminal:

``` bash
source ~/.bashrc
```

# **🧠 Comparison Table**

| **Method**       | **New Shell?** | **Needs chmod +x?** | **Uses Shebang?** | **Variables Persist?** |
|------------------|----------------|---------------------|-------------------|------------------------|
| bash script.sh   | ✅             | ❌                  | ❌                | ❌                     |
| ./script.sh      | ✅             | ✅                  | ✅                | ❌                     |
| source script.sh | ❌             | ❌                  | ❌                | ✅                     |

# **🧠 Child Shell Concept**

When using:

``` bash
bash script.sh
or:
./script.sh
```

a new shell process starts.

This is called:

# **child shell / subshell**

Variables disappear after script exits.

# **🧠 Why** `source` **Is Important in DevOps**

DevOps engineers use `source` for:

- environment variables
- AWS credentials
- virtual environments
- deployment settings

Example:

source env.sh

# **🧠 Common Beginner Mistake**

Problem:

    ./script.sh
    returns:

Permission denied

Why?

- execute permission missing

Fix:

``` bash
chmod +x script.sh
```

# **🧠 Another Common Mistake**

Problem:

script.sh

returns:

command not found

Why?

- current directory not in PATH

Fix:

    ./script.sh

# **🧠 Why Current Directory Not in PATH?**

Security reasons.

Linux avoids accidental execution of malicious files.

# **🧠 Best Practice for Scripts**

Professional scripts usually begin with:

``` bash
#!/usr/bin/env bash
```

and executed using:

    ./script.sh

# **🏆 Final Summary**

| **Concept**      | **Meaning**                   |
|------------------|-------------------------------|
| Bash script      | File containing Bash commands |
| Shebang          | Defines interpreter           |
| chmod +x         | Adds execute permission       |
| ./script.sh      | Direct execution              |
| bash script.sh   | Bash explicitly runs script   |
| source script.sh | Runs in current shell         |
| Interpreter      | Program executing code        |
| Portability      | Works across systems          |

# **📘 CHAPTER 4 — Bash Variables**

# **🌿 SECTION 1: Variables Basics**

# **🧠 What is a Variable in Bash?**

A **variable** is a container that stores data in memory.

You use variables to:

- store values
- reuse values
- make scripts dynamic
- avoid repetition

# **🧠 Simple Meaning**

Instead of writing:

``` bash
echo "Hello Ali"
echo "Welcome Ali"
```

You write:

    name="Ali"
    echo "Hello $name"
    echo "Welcome $name"

# **🧠 How Bash Stores Variables**

In Bash:

- variables store text (by default)
- no strict data types (like integers, strings)

Example:

    age=25
    name="Charlie"

# **🧠 How to Create Variables**

    variable_name=value

# **⚠ Important Rules**

❌ Wrong:

name = "Ali"

✔ Correct:

    name="Ali"

# **🧠 Access Variable Value**

Use `$`:

``` bash
echo $name
```

# **🧠 Example Script**

``` bash
#!/bin/bash
name="Ali"
city="Lahore"
echo "Name: $name"
echo "City: $city"
```

# **🧠 Why Variables Are Important**

Variables help in:

- automation
- dynamic scripts
- reusable code
- DevOps pipelines
- configuration management

# **🌿 SECTION 2: Naming Rules**

# **🧠 Variable Naming Rules in Bash**

# **✔ Allowed Rules**

## **1. No spaces allowed**

✔ Correct:

    name="Ali"

❌ Wrong:

name = Ali

## **2. Must start with letter or underscore**

✔ Correct:

    name="Ali"
    _name="Ali"

❌ Wrong:

1name="Ali"

## **3. Case sensitive**

    name="Ali"
    Name="Ahmed"

These are different variables.

## **4. No special characters**

❌ Wrong:

my-name="Ali"

✔ Correct:

    my_name="Ali"

## **5. Use meaningful names**

✔ Good:

    backup_dir="/home/user/backup"

❌ Bad:

    x="backup"

# **🧠 Best Practice Naming Style**

| **Style**   | **Example**      |
|-------------|------------------|
| snake_case  | backup_file_name |
| UPPER_CASE  | DB_HOST          |
| descriptive | log_file_path    |

# **🌿 SECTION 3: Variable Scope**

# **🧠 What is Scope?**

Scope means:

> where a variable is accessible

# **🧱 Types of Scope in Bash**

| **Scope**   | **Meaning**                  |
|-------------|------------------------------|
| Local       | Inside function only         |
| Global      | Available in script          |
| Environment | Available in child processes |

# **🔹 1. Global Variables**

# **🧠 What is Global Variable?**

A variable defined outside functions.

Example:

    name="Charlie"
    echo $name

# **🧠 Accessible Everywhere in Script**

``` bash
#!/bin/bash
name="Ali"
function show() {
echo $name
}
```

show

# **🔹 2. Local Variables**

# **🧠 What is Local Variable?**

A variable inside a function.

# **🧠 Example**

``` bash
#!/bin/bash
function test() {
```

local name="Ali"

``` bash
echo $name
}
test
```

# **🧠 Key Point**

Local variables:

- exist only inside function
- destroyed after function ends

# **🧠 Why Use Local?**

To:

- avoid conflicts
- improve script safety
- prevent variable overwriting

# **🔹 3. Environment Variables**

# **🧠 What is Environment Variable?**

A variable available to:

- current shell
- child processes
- system programs

# **🧠 Example**

export name="Charlie"

# **🧠 Difference**

| **Type**    | **Scope**     |
|-------------|---------------|
| Local       | Function only |
| Global      | Script only   |
| Environment | System-wide   |

# **🌿 SECTION 4: Export Variables**

# **🧠 What is export?**

`export` makes a variable available to child processes.

# **🧠 Example**

export DB_HOST=localhost

# **🧠 Why Export is Needed?**

Without export:

- variable exists only in current shell

With export:

- child scripts can access it

# **🧠 Example Without Export**

    name="Ali"
    bash child.sh
    child.sh:
    echo $name

Output:

(empty)

# **🧠 Example With Export**

export name="Ali"

``` bash
bash child.sh
```

Output:

Ali

# **🧠 Real DevOps Use**

Used in:

- database configs
- API keys
- deployment settings

Example:

export AWS_ACCESS_KEY=xxxx

# **🌿 SECTION 5: Environment Variables**

# **🧠 What Are Environment Variables?**

These are system-wide variables used by OS and applications.

# **🧠 Common Environment Variables**

| **Variable** | **Meaning**         |
|--------------|---------------------|
| \$HOME       | Home directory      |
| \$USER       | Current user        |
| \$PATH       | Command search path |
| \$SHELL      | Default shell       |
| \$PWD        | Current directory   |

# **🧠 Example**

``` bash
echo $HOME
```

Output:

/home/charlie

# **🧠 PATH Variable (VERY IMPORTANT)**

``` bash
echo $PATH
```

It tells Linux:

> where to search for commands

# **🧠 Example**

When you type:

``` bash
ls
```

Linux searches in:

/bin

/usr/bin

# **🌿 SECTION 6: Readonly Variables**

# **🧠 What is readonly?**

A variable that cannot be changed after assignment.

# **🧠 Example**

readonly pi=3.14

# **🧠 Try Changing It**

    pi=4

Output:

bash: pi: readonly variable

# **🧠 Why Use readonly?**

To:

- protect important values
- prevent accidental changes
- secure scripts

# **🧠 Real Use Cases**

- configuration constants
- API endpoints
- system settings

Example:

readonly DB_HOST="localhost"

# **🌿 SECTION 7: Unset Variables**

# **🧠 What is unset?**

`unset` removes a variable completely.

# **🧠 Example**

    name="Ali"
    unset name

# **🧠 Check Value**

``` bash
echo $name
```

Output:

(empty)

# **🧠 What Happens Internally?**

- variable removed from memory
- no longer exists in shell

# **🧠 When to Use unset?**

Used for:

- cleanup
- removing sensitive data
- resetting environment

Example:

    unset AWS_SECRET

# **🧠 Important Warning**

If you unset system variables like PATH:

    unset PATH

⚠ System may break command execution.

# **🧠 Best Practice**

Only unset:

- custom variables
- temporary variables
- sensitive data

# **🏆 FINAL SUMMARY**

| **Concept**  | **Meaning**                    |
|--------------|--------------------------------|
| Variable     | Stores data                    |
| Naming rules | Define correct variable format |
| Local        | Inside function                |
| Global       | Whole script                   |
| Environment  | System-wide access             |
| export       | Share with child processes     |
| readonly     | Cannot be changed              |
| unset        | Remove variable                |

# 

# **📘 CHAPTER 5 — User Input, Default Values & Quotes in Bash** 

# **🌿 SECTION 1: User Input in Bash**

# **🧠 What is User Input?**

User input means:

> taking data from the user during script execution

Instead of hardcoding values, scripts become dynamic.

# **🧠 Why User Input is Important?**

User input allows:

- flexible scripts
- reusable automation
- DevOps tools
- interactive programs

# **🧠 Method 1: Using** `read`

read name

``` bash
echo "Hello $name"
```

# **🧠 Better Version with Prompt**

    read -p "Enter your name: " name
    echo "Hello $name"

# **🧠 Hidden Input (Passwords)**

    read -s password

Used for:

- passwords
- API keys
- secure input

# **🧠 Example Script**

``` bash
#!/bin/bash
read -p "Enter username: " user
read -s -p "Enter password: " pass
echo
echo "User: $user"
```

# **🌿 SECTION 2: Command Line Arguments**

# **🧠 What are Arguments?**

Arguments are values passed while running script.

Example:

    ./script.sh Linux DevOps

# **🧠 Access Arguments**

| **Variable** | **Meaning**     |
|--------------|-----------------|
| \$0          | script name     |
| \$1          | first argument  |
| \$2          | second argument |
| \$#          | total arguments |
| \$@          | all arguments   |

# **🧠 Example**

``` bash
#!/bin/bash
echo "First: $1"
echo "Second: $2"
```

Run:

    ./script.sh Linux DevOps

# **🌿 SECTION 3: Input from Arguments (Real DevOps Use)**

# **🧠 Example**

``` bash
#!/bin/bash
echo "Deploying to environment: $1"
```

Run:

    ./deploy.sh production

# **🧠 Why DevOps Uses This?**

- CI/CD pipelines
- automation scripts
- deployment environments

# **🌿 SECTION 4: Default Values (VERY IMPORTANT)**

# **🧠 What are Default Values?**

Default value means:

> if user does NOT provide input, fallback value is used

# **🧠 Syntax**

    name=${1:-Guest}

# **🧠 Explanation**

| **Part** | **Meaning**    |
|----------|----------------|
| \$1      | first argument |
| :-       | if empty       |
| Guest    | default value  |

# **🧠 Example Without Argument**

    ./script.sh

Output:

Guest

# **🧠 Example With Argument**

    ./script.sh Charlie

Output:

Charlie

# **🧠 Real DevOps Use**

    env=${1:-dev}

Used in:

- deployment environments
- configuration scripts

# **🌿 SECTION 5: Input Validation (VERY IMPORTANT)**

# **🧠 What is Input Validation?**

Input validation means:

> checking if user input is correct before using it

# **🧠 Why Important?**

Without validation:

- scripts may crash
- security issues occur
- unexpected behavior happens

# **🧠 Example: Check Empty Input**

read name

    if [ -z "$name" ]
    then
    echo "Name cannot be empty"
    fi

# **🧠 Example: Check Number Input**

read age

    if ! [[ "$age" =~ ^[0-9]+$ ]]
    then
    echo "Invalid number"
    fi

# **🧠 DevOps Use Case**

- validating ports
- checking usernames
- verifying file paths
- validating environment names

# **🚨 SECTION 6: Quotes in Bash (VERY IMPORTANT)**

# **🧠 Why Quotes Matter?**

Quotes control:

- how Bash interprets text
- variable expansion
- word splitting
- command behavior

# **🔹 1. Single Quotes (' ')**

# **🧠 Behavior**

``` bash
echo '$HOME'
```

Output:

\$HOME

# **🧠 Explanation**

Single quotes:

- do NOT expand variables
- treat everything as literal text

# **🧠 Use Case**

When you want exact text:

``` bash
echo 'Path is $PATH'
```

# **🔹 2. Double Quotes (" ")**

# **🧠 Behavior**

``` bash
echo "$HOME"
```

Output:

/home/user

# **🧠 Explanation**

Double quotes:

- allow variable expansion
- prevent word splitting (mostly)

# **🧠 Use Case**

Most common in scripts:

``` bash
echo "Hello $name"
```

# **🔹 3. Backticks ( ) — OLD METHOD**

# **🧠 Example**

echo \`date\`

# **🧠 Problem**

Backticks are:

- old style
- harder to read
- less flexible

# **🔹 4. Modern Command Substitution \$( )**

# **🧠 Example**

``` bash
echo $(date)
```

# **🧠 Why Better?**

- readable
- nestable
- modern standard

# **🧠 Example with Nesting**

``` bash
echo $(echo $(date))
```

# **🌿 SECTION 7: Word Splitting (VERY IMPORTANT)**

# **🧠 What is Word Splitting?**

Word splitting means:

> Bash breaks text into multiple words based on spaces

# **🧠 Example (Problem)**

    file="my file.txt"
    echo $file

Output:

my file.txt

Bash splits it into:

- my
- file.txt

# **🧠 Fix Using Quotes**

``` bash
echo "$file"
```

Output:

my file.txt

# **🧠 Why Important?**

Without quotes:

- scripts break
- file paths fail
- automation errors occur

# **🌿 SECTION 8: Variable Expansion**

# **🧠 What is Variable Expansion?**

Bash replaces:

\$name

with its actual value.

# **🧠 Example**

    name="Charlie"
    echo $name

Output:

Charlie

# **🧠 Inside Double Quotes**

``` bash
echo "$name"
```

Still expands variable.

# **🌿 SECTION 9: Escaping Characters**

# **🧠 What is Escaping?**

Escaping means:

> telling Bash to treat special characters literally

# **🧠 Example**

``` bash
echo "Price is \$5"
```

Output:

Price is \$5

# **🧠 Common Escape Characters**

| **Symbol** | **Meaning** |
|------------|-------------|
| \$         | literal \$  |
| "          | quote       |
| \\         | backslash   |

# **🏆 FINAL SUMMARY**

| **Concept**    | **Meaning**              |
|----------------|--------------------------|
| User input     | Data from user           |
| read           | Input command            |
| Arguments      | Input at execution time  |
| Default values | Fallback values          |
| Validation     | Input checking           |
| Single quotes  | literal text             |
| Double quotes  | variable expansion       |
| Backticks      | old command execution    |
| \$( )          | modern command execution |
| Word splitting | space separation issue   |
| Escaping       | prevent special meaning  |

# **📘 CHAPTER 6 — Operators & Conditional Statements in Bash (VERY IMPORTANT)**

This chapter combines **Operators + Conditions**, because in real Bash scripting they always work together.

# **🌿 SECTION 1: What are Operators in Bash?**

# **🧠 Definition**

Operators are symbols used to:

- compare values
- combine conditions
- perform logical decisions
- control script flow

# **🧠 Why Operators Matter**

They are used in:

- if conditions
- loops
- automation scripts
- DevOps pipelines

# **📌 TWO MAIN TYPES**

| **Type**          | **Purpose**        |
|-------------------|--------------------|
| Logical Operators | Combine conditions |
| String Operators  | Compare text       |

# **🌿 SECTION 2: Logical Operators**

# **🧠 Logical Operators in Bash**

Logical operators are used to combine multiple conditions.

# **🔹 1.** `&&` **(AND Operator)**

# **🧠 Meaning**

> BOTH conditions must be true

# **🧠 Example**

    if [ $a -gt 5 ] && [ $b -lt 10 ]
    then
    echo "Condition matched"
    fi

# **🧠 Explanation**

| **Condition** | **Must be** |
|---------------|-------------|
| \$a -gt 5     | TRUE        |
| \$b -lt 10    | TRUE        |

Only then:

- block executes

# **🧠 Real Use Case**

Used in DevOps:

- check CPU AND memory
- validate environment AND service status

# **🔹 2.** `||` **(OR Operator)**

# **🧠 Meaning**

> ANY ONE condition must be true

# **🧠 Example**

    if [ $a -gt 10 ] || [ $b -lt 5 ]
    then
    echo "At least one condition is true"
    fi

# **🧠 Explanation**

| **Condition** | **Result** |
|---------------|------------|
| \$a -gt 10    | OR         |
| \$b -lt 5     | OR         |

If either is true → block runs

# **🧠 Real Use Case**

- backup if disk \> 80% OR logs \> 1GB
- restart service if failed OR unresponsive

# **🔹 3.** `!` **(NOT Operator)**

# **🧠 Meaning**

> Reverses condition (NEGATION)

# **🧠 Example**

    if [ ! -f file.txt ]
    then
    echo "File does NOT exist"
    fi

# **🧠 Explanation**

| **Condition** | **Meaning**         |
|---------------|---------------------|
| -f file.txt   | file exists         |
| ! -f file.txt | file does NOT exist |

# **🧠 Real Use Case**

- check missing files
- detect failures
- validate system state

# **🌿 SECTION 3: String Operators**

# **🧠 What are String Operators?**

String operators compare text values.

# **🔹 1.** `=` **(Equal)**

    if [ "$a" = "$b" ]
    then
    echo "Strings are equal"
    fi

# **🔹 2.** `!=` **(Not Equal)**

    if [ "$a" != "$b" ]
    then
    echo "Strings are different"
    fi

# **🔹 3.** `-z` **(Zero Length)**

# **🧠 Meaning**

> True if string is EMPTY

    if [ -z "$name" ]
    then
    echo "Name is empty"
    fi

# **🔹 4.** `-n` **(Not Empty)**

# **🧠 Meaning**

> True if string is NOT empty

    if [ -n "$name" ]
    then
    echo "Name exists"
    fi

# **🧠 String Operators Summary**

| **Operator** | **Meaning**  |
|--------------|--------------|
| =            | equal        |
| !=           | not equal    |
| -z           | empty string |
| -n           | not empty    |

# **🌿 SECTION 4: Conditional Statements in Bash**

# **🧠 What are Conditional Statements?**

They control script flow based on:

- conditions
- comparisons
- logic

# **🧠 Basic Structure**

if condition

    then

commands

    fi

# **🌿 SECTION 5: Nested if Statements**

# **🧠 What is Nested if?**

An if inside another if.

# **🧠 Example**

    if [ $a -gt 5 ]
    then
    if [ $b -lt 10 ]
    then
    echo "Both conditions passed"
    fi
    fi

# **🧠 When to Use Nested if?**

- multi-step validation
- security checks
- layered conditions

# **🌿 SECTION 6: Multiple Conditions**

# **🧠 Using AND (**`&&`**) in Conditions**

Instead of nested if, we use:

    if [ $a -gt 5 ] && [ $b -lt 10 ]
    then
    echo "Both conditions are true"
    fi

# **🧠 Why This is Better?**

| **Nested if**   | **&&**       |
|-----------------|--------------|
| longer code     | shorter code |
| harder to read  | clean        |
| multiple blocks | single line  |

# **🌿 SECTION 7: Using** `[[ ]]` **(VERY IMPORTANT MODERN BASH STYLE)**

# **🧠 What is** `[[ ]]`**?**

`[[ ]]` is an improved conditional syntax in Bash.

It is:

- safer
- more powerful
- modern
- recommended

# **🧠 Example**

    if [[ $a -gt 5 && $b -lt 10 ]]
    then
    echo "Modern condition passed"
    fi

# **🧠 Why** `[[ ]]` **is Better than** `[ ]`

| **Feature**       | **\[ \]** | **\[\[ \]\]** |
|-------------------|-----------|---------------|
| Safety            | low       | high          |
| String handling   | weak      | strong        |
| Logical operators | limited   | full support  |
| Regex support     | no        | yes           |
| Recommended       | no        | YES           |

# **🧠 Example with Strings**

    if [[ "$name" == "Ali" ]]
    then
    echo "Match found"
    fi

# **🧠 Regex Support (Advanced Feature)**

    if [[ $name =~ ^A.* ]]
    then
    echo "Starts with A"
    fi

# **🧠 DevOps Importance of \[\[ \]\]**

Used in:

- CI/CD pipelines
- deployment scripts
- environment checks
- validation scripts

# **🧠 BEST PRACTICE**

Always prefer:

\[\[ \]\]

instead of:

\[ \]

# **🏆 FINAL SUMMARY**

# **📌 OPERATORS**

| **Type** | **Operators** |
|----------|---------------|
| Logical  | &&, \|\|, !   |
| String   | =, !=, -z, -n |

# **📌 CONDITIONALS**

| **Concept**         | **Meaning**                |
|---------------------|----------------------------|
| if                  | decision making            |
| nested if           | condition inside condition |
| multiple conditions | combined logic             |
| \[\[ \]\]           | modern safe syntax         |

# **📘 CHAPTER 7 — Loops in Bash (VERY IMPORTANT FOR DEVOPS)**

This chapter combines **Loops + Functions**, because both are used heavily in real automation scripts.

# **🌿 SECTION 1: What are Loops in Bash?**

# **🧠 Definition**

Loops are used to:

> repeat a block of code multiple times

Instead of writing same code again and again, loops automate repetition.

# **🧠 Why Loops are Important**

Used in:

- automation scripts
- server monitoring
- file processing
- DevOps pipelines
- log analysis

# **🌿 SECTION 2: Types of Loops in Bash**

| **Loop** | **Purpose**                       |
|----------|-----------------------------------|
| for      | fixed repetition                  |
| while    | condition-based repetition        |
| until    | runs until condition becomes true |

# **🌿 SECTION 3: Infinite Loops (VERY IMPORTANT)**

# **🧠 What is Infinite Loop?**

A loop that runs forever until manually stopped.

# **🧠 Example**

    while true
    do
    echo "Running"
    done

# **🧠 Explanation**

| **Part**   | **Meaning**           |
|------------|-----------------------|
| while true | always true condition |
| do         | start block           |
| done       | end block             |

# **🧠 How to Stop It?**

Press:

CTRL + C

# **🧠 Real DevOps Use Case**

Infinite loops are used for:

- monitoring services
- checking logs continuously
- health checks
- background watchers

Example:

    while true
    do
    echo "Checking server..."
    sleep 5
    done

# **🌿 SECTION 4: break Statement**

# **🧠 What is break?**

`break` is used to:

> exit a loop immediately

# **🧠 Example**

    for i in 1 2 3 4 5
    do
    if [ $i -eq 3 ]
    then

break

    fi
    echo $i
    done

# **🧠 Output**

1

2

# **🧠 Explanation**

Loop stops when:

- condition becomes true
- break is executed

# **🧠 Real Use Case**

- stop searching after finding file
- stop process after condition met
- exit monitoring loop on failure

# **🌿 SECTION 5: continue Statement**

# **🧠 What is continue?**

`continue` is used to:

> skip current iteration and move to next loop cycle

# **🧠 Example**

    for i in 1 2 3 4 5
    do
    if [ $i -eq 3 ]
    then

continue

    fi
    echo $i
    done

# **🧠 Output**

1

2

4

5

# **🧠 Explanation**

When i = 3:

- loop skips echo
- moves to next iteration

# **🧠 Real Use Case**

- skip invalid files
- ignore errors
- filter logs
- skip failed servers

# **🌿 SECTION 6: while Loop (Core Concept)**

# **🧠 Basic Structure**

    while condition
    do

commands

    done

# **🧠 Example**

    count=1
    while [ $count -le 5 ]
    do
    echo $count

((count++))

    done

# **🧠 Real Use Case**

- monitoring systems
- retry mechanisms
- waiting for services

# **🌿 SECTION 7: until Loop**

# **🧠 What is until Loop?**

Opposite of while loop:

> runs until condition becomes TRUE

# **🧠 Example**

    count=1
    until [ $count -gt 5 ]
    do
    echo $count

((count++))

    done

# **🌿 SECTION 8: for Loop**

# **🧠 Example**

    for i in 1 2 3 4 5
    do
    echo $i
    done

# **🧠 DevOps Use Case**

- loop through servers
- process files
- deploy multiple services

# **📌 SUMMARY OF LOOPS**

| **Loop** | **Use**                  |
|----------|--------------------------|
| for      | fixed iterations         |
| while    | condition-based          |
| until    | run until condition true |

# **🏆 FINAL SUMMARY**

# **📌 LOOPS**

| **Concept** | **Meaning**            |
|-------------|------------------------|
| while true  | infinite loop          |
| break       | exit loop              |
| continue    | skip iteration         |
| for         | fixed loop             |
| while       | condition loop         |
| until       | reverse condition loop |

# **📘 CHAPTER 8 — Functions in Bash (VERY IMPORTANT)**

# **🌿 SECTION 1: What are Functions?**

# **🧠 Definition**

A function is:

> a reusable block of code

Instead of repeating code, you define it once and reuse it.

# **🧠 Why Functions Are Important**

Used for:

- code reusability
- cleaner scripts
- modular design
- DevOps automation
- CI/CD pipelines

# **🧠 Basic Syntax**

    function_name() {

commands

    }

# **🧠 Example**

    greet() {
    echo "Hello World"
    }

greet

# **🌿 SECTION 2: Functions with Arguments**

# **🧠 Example**

    greet() {
    echo "Hello $1"
    }

greet Ali

# **🧠 Explanation**

| **Variable** | **Meaning**     |
|--------------|-----------------|
| \$1          | first argument  |
| \$2          | second argument |

# **🧠 DevOps Use Case**

- deploy(environment)
- backup(directory)
- restart(service)

Example:

    deploy() {
    echo "Deploying to $1"
    }

deploy production

# **🌿 SECTION 3: Return Values in Functions**

# **🧠 What is return?**

    return is used to:

> send exit status from function

# **🧠 Syntax**

    return 0

# **🧠 Example**

    check_status() {
    return 0
    }

check_status

``` bash
echo $?
```

# **🧠 Explanation**

| **Value** | **Meaning** |
|-----------|-------------|
| 0         | success     |
| non-zero  | failure     |

# **🧠 Important Note**

Bash functions:

- do NOT return strings directly
- only return exit codes

To return values, use:

``` bash
echo
```

# **🧠 Example (Real Value Return)**

    get_name() {
    echo "Ali"
    }
    name=$(get_name)
    echo $name

# **🌿 SECTION 4: Local Variables (VERY IMPORTANT)**

# **🧠 What is local?**

`local` means:

> variable exists only inside function

# **🧠 Example**

    my_func() {

local name="Ali"

``` bash
echo $name
}
```

my_func

# **🧠 Why Local Variables Matter**

Without local:

- variables can overwrite global values
- bugs occur in large scripts

# **🧠 Example Problem**

    name="Global"
    my_func() {
    name="Local"
    }

my_func

``` bash
echo $name
```

Output:

Local

# **🧠 Fixed Version Using local**

    name="Global"
    my_func() {

local name="Local"

    }

my_func

``` bash
echo $name
```

Output:

Global

# **🧠 DevOps Importance of local**

Used in:

- safe automation scripts
- large CI/CD pipelines
- modular code design

# **🏆 FINAL SUMMARY**

# **📌 FUNCTIONS**

| **Concept** | **Meaning**            |
|-------------|------------------------|
| function    | reusable code block    |
| arguments   | input to function      |
| return      | exit status            |
| local       | function-only variable |

# **📘 CHAPTER 9 — Script Arguments, Exit Codes & Error Handling (PRO LEVEL BASH)** 

This chapter is **very important for real DevOps scripting**, because it covers how professional scripts:

- accept inputs properly
- handle options like real tools (`-u`, `-p`)
- fail safely
- avoid silent bugs

# **🌿 SECTION 1: Script Arguments (Recap + Deep Understanding)**

# **🧠 What are Script Arguments?**

Arguments are values passed when running a script:

    ./script.sh Linux DevOps

# **🧠 Accessing Arguments**

| **Variable** | **Meaning**         |
|--------------|---------------------|
| \$0          | script name         |
| \$1          | first argument      |
| \$2          | second argument     |
| \$@          | all arguments       |
| \$#          | number of arguments |

# **🧠 Example**

``` bash
#!/bin/bash
echo "Script: $0"
echo "First: $1"
echo "Second: $2"
echo "Total: $#"
```

# **🌿 SECTION 2: The** `shift` **Command (VERY IMPORTANT)**

# **🧠 What is shift?**

`shift` moves arguments to the left.

# **🧠 Before shift:**

| **Position** | **Value** |
|--------------|-----------|
| \$1          | user      |
| \$2          | pass      |
| \$3          | db        |

# **🧠 After shift:**

| **Position** | **Value** |
|--------------|-----------|
| \$1          | pass      |
| \$2          | db        |

# **🧠 Example**

``` bash
#!/bin/bash
echo "Before shift: $1 $2 $3"
shift
echo "After shift: $1 $2 $3"
```

# **🧠 Real Output Example**

    ./script.sh user pass db

Output:

Before shift: user pass db

After shift: pass db

# **🧠 Why shift is Important?**

Used in:

- parsing multiple arguments
- CLI tools (like real Linux commands)
- option processing
- DevOps automation scripts

# **🧠 Real DevOps Example**

Loop through arguments:

    while [ $# -gt 0 ]
    do
    echo "Argument: $1"
    shift
    done

# **🌿 SECTION 3: getopts (ADVANCED — PROFESSIONAL LEVEL)**

# **🧠 What is getopts?**

    getopts is a built-in tool to handle:

> command-line options like real Linux commands

# **🧠 Example Usage**

    ./script.sh -u user -p pass

# **🧠 Why getopts is Important?**

Used in professional scripts like:

- docker CLI tools
- deployment tools
- DevOps automation scripts
- system utilities

# **🧠 Basic Structure**

    while getopts "u:p:" opt
    do
    case $opt in

u\) user=\$OPTARG ;;

p\) pass=\$OPTARG ;;

    esac
    done

# **🧠 Explanation**

| **Part** | **Meaning**               |
|----------|---------------------------|
| u:p:     | expects -u and -p values  |
| OPTARG   | value passed after option |
| opt      | option name               |

# **🧠 Full Example**

``` bash
#!/bin/bash
while getopts "u:p:" opt
do
case $opt in
```

u\) user=\$OPTARG ;;

p\) pass=\$OPTARG ;;

    esac
    done
    echo "User: $user"
    echo "Pass: $pass"

# **🧠 Run Script**

    ./script.sh -u admin -p 1234

# **🧠 Output**

User: admin

Pass: 1234

# **🧠 Advanced Tip**

You can add flags like:

    while getopts "u:p:h" opt

Where:

- `h` = help option (no value)

# **🧠 getopts vs shift**

| **Feature**    | **shift** | **getopts** |
|----------------|-----------|-------------|
| simplicity     | easy      | advanced    |
| option parsing | manual    | automatic   |
| real tools     | no        | YES         |
| DevOps use     | medium    | high        |

# **🚨 SECTION 4: Exit Codes in Bash**

# **🧠 What is Exit Code?**

Every Linux command returns a status:

| **Code** | **Meaning** |
|----------|-------------|
| 0        | Success     |
| 1+       | Error       |

# **🧠 Example**

``` bash
mkdir test
echo $?
```

# **🧠 Why Exit Codes Matter?**

Used in:

- automation pipelines
- CI/CD tools
- error handling
- script chaining

# **🌿 SECTION 5: set -e (VERY IMPORTANT)**

# **🧠 What is set -e?**

    set -e

Means:

> stop script immediately if any command fails

# **🧠 Example**

``` bash
#!/bin/bash
set -e
mkdir test
```

rm file_that_does_not_exist

``` bash
echo "This will NOT run"
```

# **🧠 Why Important?**

Prevents:

- silent failures
- broken deployments
- hidden errors

# **🌿 SECTION 6: set -u (VERY IMPORTANT)**

# **🧠 What is set -u?**

    set -u

Means:

> treat unset variables as errors

# **🧠 Example**

``` bash
#!/bin/bash
set -u
echo $name
```

If `name` not defined:

error: unbound variable

# **🧠 Why set -u is Important?**

Prevents:

- typo bugs
- missing variables
- silent script failures

# **🌿 SECTION 7: set -o pipefail (VERY IMPORTANT)**

# **🧠 What is pipefail?**

Normally in pipes:

command1 \| command2

only last command matters.

# **🧠 Problem Example**

cat file.txt \| grep "hello"

``` bash
echo $?
```

If `cat` fails but `grep` succeeds → script still looks successful.

# **🧠 Solution: pipefail**

    set -o pipefail

# **🧠 Now Behavior**

If ANY command fails in pipeline:

> entire pipeline fails

# **🧠 Example**

``` bash
#!/bin/bash
set -o pipefail
```

cat missingfile.txt \| grep "hello"

``` bash
echo $?
```

# **🧠 Why pipefail is Critical?**

Used in:

- CI/CD pipelines
- production scripts
- automation workflows

It ensures:

> no hidden failure is ignored

# **🏆 FINAL SUMMARY**

# **📌 SCRIPT ARGUMENTS**

| **Concept** | **Meaning**          |
|-------------|----------------------|
| \$1, \$2    | positional arguments |
| shift       | move arguments left  |
| getopts     | advanced CLI parsing |

# **📌 EXIT & SAFETY CONTROLS**

| **Command**     | **Meaning**                  |
|-----------------|------------------------------|
| set -e          | stop on error                |
| set -u          | error on undefined variables |
| set -o pipefail | fail pipeline on any error   |

# 

# **📘 CHAPTER 10 — File Handling & Text Processing Tools (DEVOPS CORE SKILLS)**

This chapter is **one of the most important parts of Bash scripting** because real DevOps work is mostly:

- reading files
- processing logs
- filtering output
- transforming data
- chaining commands

# **🌿 SECTION 1: File Handling in Bash**

# **🧠 What is File Handling?**

File handling means:

> reading, writing, and processing files using Bash scripts

Used in:

- logs
- configs
- backups
- automation scripts

# **🌿 SECTION 2: Read File Line by Line (VERY IMPORTANT)**

# **🧠 Why Read Line by Line?**

Because DevOps tasks often involve:

- log files
- system files
- configuration files

# **🧠 Basic Syntax**

    while read line
    do
    echo "$line"

done \< file.txt

# **🧠 Explanation**

| **Part**        | **Meaning**    |
|-----------------|----------------|
| while read line | read each line |
| do              | start block    |
| done            | end block      |
| \< file.txt     | input file     |

# **🧠 Example**

file.txt:

nginx running

mysql stopped

redis running

Script:

    while read line
    do
    echo "STATUS: $line"

done \< file.txt

# **🧠 Output**

STATUS: nginx running

STATUS: mysql stopped

STATUS: redis running

# **🧠 Real DevOps Use Cases**

- reading logs
- parsing server output
- processing CSV files
- configuration automation

# **⚠ IMPORTANT TIP**

Always use quotes:

``` bash
echo "$line"
```

To avoid:

- word splitting
- broken output

# **🌿 SECTION 3: File Descriptors (ADVANCED BUT IMPORTANT)**

# **🧠 What is a File Descriptor?**

A file descriptor is:

> a number that represents input/output streams in Linux

# **🧠 Standard File Descriptors**

| **FD** | **Meaning**     |
|--------|-----------------|
| 0      | stdin (input)   |
| 1      | stdout (output) |
| 2      | stderr (errors) |

# **🧠 Example**

``` bash
ls > output.txt
```

- `>` redirects stdout (FD 1)

# **🧠 Error Redirection**

ls nofile 2\> error.txt

- `2>` redirects errors (FD 2)

# **🧠 Redirect Both Output + Error**

    command > all.txt 2>&1

# **🧠 DevOps Use Case**

- saving logs
- capturing errors
- monitoring scripts
- debugging pipelines

# **🌿 SECTION 4: Text Processing Tools (DEVOPS ESSENTIAL)**

# **🧠 Why Text Processing Tools Matter?**

Because DevOps = working with:

- logs
- system output
- APIs
- configuration files

# **🔥 TOOL 1: grep (SEARCH TOOL)**

# **🧠 What is grep?**

``` bash
grep is used to:
```

> search text inside files

# **🧠 Basic Example**

``` bash
grep "error" logs.txt
```

# **🌿 Options**

# **🔹 1. Case insensitive search (-i)**

``` bash
grep -i error logs.txt
```

Matches:

- ERROR
- error
- Error

# **🔹 2. Recursive search (-r)**

``` bash
grep -r nginx /etc
```

Searches:

- all files inside directory

# **🔹 3. Regex Support**

``` bash
grep "^error" logs.txt
```

Matches lines starting with "error"

# **🧠 Real DevOps Use**

- find failed services
- search logs
- detect errors
- debug deployments

# **🔥 TOOL 2: awk (DATA PROCESSING ENGINE)**

# **🧠 What is awk?**

``` bash
awk is used for:
```

> processing structured text (columns)

# **🧠 Concept of Fields**

name age city

Ali 25 Lahore

# **🧠 Fields Meaning**

| **Field** | **Meaning**   |
|-----------|---------------|
| \$1       | first column  |
| \$2       | second column |
| \$3       | third column  |

# **🧠 Example**

``` bash
awk '{print $1}' file.txt
```

# **🧠 Output**

name

Ali

# **🧠 NR (Number of Records)**

``` bash
awk '{print NR, $0}' file.txt
```

NR = line number

# **🧠 NF (Number of Fields)**

``` bash
awk '{print NF}' file.txt
```

# **🧠 FS (Field Separator)**

``` bash
awk -F ":" '{print $1}' /etc/passwd
```

# **🧠 Real DevOps Use**

- log parsing
- CPU reports
- user data extraction
- CSV processing

# **🔥 TOOL 3: sed (STREAM EDITOR)**

# **🧠 What is sed?**

``` bash
sed is used for:
```

> editing text streams

# **🔹 1. Replace Text**

``` bash
sed 's/linux/unix/' file.txt
```

# **🔹 2. Global Replace**

``` bash
sed 's/linux/unix/g' file.txt
```

# **🔹 3. Delete Lines**

``` bash
sed '/error/d' file.txt
```

# **🔹 4. Insert Text**

``` bash
sed '1i This is header' file.txt
```

# **🔹 5. In-place Edit**

``` bash
sed -i 's/linux/unix/g' file.txt
```

# **🧠 Real DevOps Use**

- config updates
- log cleanup
- automation scripts
- deployment fixes

# **🔥 TOOL 4: cut (COLUMN EXTRACTION)**

# **🧠 What is cut?**

Used to extract columns.

# **🧠 Example**

    cut -d ":" -f1 /etc/passwd

# **🧠 Explanation**

| **Option** | **Meaning** |
|------------|-------------|
| -d         | delimiter   |
| -f         | field       |

# **🔥 TOOL 5: tr (TRANSFORM TEXT)**

# **🧠 What is tr?**

Used to:

- replace characters
- convert case

# **🧠 Example**

``` bash
echo "hello" | tr a-z A-Z
```

Output:

HELLO

# **🔥 TOOL 6: sort**

# **🧠 What is sort?**

Used to sort lines.

# **🧠 Example**

sort file.txt

# **🔥 TOOL 7: uniq**

# **🧠 What is uniq?**

Removes duplicate lines.

# **🧠 Example**

sort file.txt \| uniq

# **🔥 TOOL 8: xargs (VERY IMPORTANT)**

# **🧠 What is xargs?**

Converts input into command arguments.

# **🧠 Example**

``` bash
echo "file1 file2 file3" | xargs rm
```

# **🧠 Real DevOps Use**

- deleting files
- batch processing
- pipeline automation

# **🏆 FINAL SUMMARY**

# **📌 FILE HANDLING**

| **Concept**      | **Meaning**                |
|------------------|----------------------------|
| while read       | read file line-by-line     |
| file descriptors | input/output/error streams |
| 0,1,2            | stdin, stdout, stderr      |

# **📌 TEXT PROCESSING TOOLS**

| **Tool** | **Purpose**       |
|----------|-------------------|
| grep     | search text       |
| awk      | column processing |
| sed      | edit text         |
| cut      | extract columns   |
| tr       | transform text    |
| sort     | sorting           |
| uniq     | remove duplicates |
| xargs    | command chaining  |

# 

# **📘 CHAPTER 11 — Advanced Bash Fundamentals for DevOps (Arrays + Strings + Processes + Signals + Cron)**

This is a **high-value DevOps chapter** because it covers everything needed for:

- automation
- system administration
- production scripting
- job scheduling
- process control
- data handling

# **🌿 SECTION 1: Arrays in Bash (DATA STRUCTURES)**

# **🧠 What is an Array?**

An array is:

> a variable that stores multiple values

Instead of:

    name1="Ali"
    name2="Ahmed"
    name3="Sara"

You use:

    names=("Ali" "Ahmed" "Sara")

# **🌿 1. Array Creation**

    names=("Ali" "Ahmed" "Sara")

# **🌿 2. Access Elements**

``` bash
echo ${names[0]}
```

Output:

Ali

# **🌿 3. All Elements**

``` bash
echo ${names[@]}
```

# **🌿 4. Array Length (VERY IMPORTANT)**

``` bash
echo ${#names[@]}
```

Meaning:

> number of elements in array

# **🌿 5. Array Slicing**

# **🧠 What is Slicing?**

Extract part of array.

``` bash
echo ${names[@]:1:2}
```

Meaning:

| **Part** | **Meaning**        |
|----------|--------------------|
| 1        | start index        |
| 2        | number of elements |

# **🌿 6. Add Elements**

names+=("Khan")

# **🌿 7. Delete Elements**

    unset names[1]

# **🧠 Important Note**

After deletion:

- index remains empty
- array is not re-indexed automatically

# **🌿 SECTION 2: String Manipulation (VERY IMPORTANT CHAPTER)**

# **🧠 Why Strings Matter?**

DevOps scripts work heavily with:

- logs
- file names
- config values
- API responses

# **🌿 1. String Length**

    name="Charlie"
    echo ${#name}

# **🌿 2. Substring**

``` bash
echo ${name:0:3}
```

Meaning:

| **Part** | **Meaning** |
|----------|-------------|
| 0        | start       |
| 3        | length      |

# **🌿 3. Replace String**

    text="linux is good"
    echo ${text/linux/unix}

# **🌿 4. Global Replace (IMPORTANT)**

``` bash
echo ${text//linux/unix}
```

# **🌿 5. Uppercase**

``` bash
echo ${name^^}
```

# **🌿 6. Lowercase**

``` bash
echo ${name,,}
```

# **🌿 7. Trim Spaces (Workaround)**

Bash has no direct trim, but common method:

    text=" hello "
    echo $text

OR safer:

``` bash
echo "$text"
```

# **🌿 8. Regex Matching (ADVANCED)**

    if [[ $name =~ ^A.* ]]
    then
    echo "Starts with A"
    fi

# **🧠 Meaning**

| **Pattern** | **Meaning**    |
|-------------|----------------|
| ^A          | starts with A  |
| .\*         | any characters |

# **🌿 SECTION 3: Process Management (DEVOPS CORE)**

# **🧠 What is a Process?**

A process is:

> a running program in Linux

# **🌿 1. ps (PROCESS STATUS)**

``` bash
ps aux
```

Shows:

- running processes
- CPU usage
- memory usage

# **🌿 2. top (REAL-TIME MONITORING)**

``` bash
top
```

Shows live system activity.

# **🌿 3. htop (ADVANCED VERSION)**

    htop

Better UI than top.

# **🌿 4. jobs (BACKGROUND JOBS)**

    jobs

Shows background processes.

# **🌿 5. fg / bg**

# **🧠 fg (foreground)**

Bring process to front:

    fg %1

# **🧠 bg (background)**

Continue process in background:

    bg %1

# **🌿 6. kill (STOP PROCESS)**

kill PID

# **🌿 7. pkill (BY NAME)**

    pkill nginx

# **🌿 8. nohup (NO HANGUP)**

# **🧠 What is nohup?**

Runs process even after logout.

    nohup script.sh &

# **🧠 Output goes to:**

nohup.out

# **🌿 SECTION 4: Signals & trap (VERY IMPORTANT)**

# **🧠 What are Signals?**

Signals are:

> messages sent to processes by OS

# **🌿 Common Signals**

| **Signal** | **Meaning**          |
|------------|----------------------|
| SIGINT     | Ctrl + C             |
| SIGTERM    | graceful termination |
| SIGKILL    | force kill           |

# **🌿 SIGINT Example**

Press:

CTRL + C

# **🌿 SIGTERM**

``` bash
kill -15 PID
```

# **🌿 SIGKILL (FORCE)**

``` bash
kill -9 PID
```

# **🚨 WARNING**

SIGKILL:

- cannot be ignored
- cannot be handled

# **🌿 trap Command (VERY IMPORTANT)**

# **🧠 What is trap?**

`trap` catches signals and executes commands.

# **🌿 Example**

    trap "rm -f temp.txt" EXIT

# **🧠 Meaning**

When script exits:

> temp.txt will be deleted automatically

# **🌿 Another Example**

    trap "echo Interrupted" SIGINT

# **🧠 Real DevOps Use**

- cleanup temporary files
- logging shutdown events
- handling interruptions safely

# **🌿 SECTION 5: Scheduling with Cron (PRODUCTION ESSENTIAL)**

# **🧠 What is Cron?**

Cron is:

> Linux job scheduler for automation

# **🌿 Edit Cron Jobs**

``` bash
crontab -e
```

# **🌿 Cron Format**

\* \* \* \* \* command

| **Field** | **Meaning** |
|-----------|-------------|
| minute    | 0-59        |
| hour      | 0-23        |
| day       | 1-31        |
| month     | 1-12        |
| weekday   | 0-7         |

# **🌿 Special Cron Keywords**

# **🔹 @daily**

@daily /script.sh

Runs once per day.

# **🔹 @reboot**

@reboot /script.sh

Runs after system restart.

# **🌿 Cron Logging**

Logs stored in:

/var/log/cron

OR:

/var/log/syslog

# **🌿 Common Cron Problems**

# **❌ 1. Wrong PATH**

Cron has limited environment.

Fix:

    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin

# **❌ 2. Script not executable**

Fix:

``` bash
chmod +x script.sh
```

# **❌ 3. Missing absolute paths**

Wrong:

script.sh

Correct:

/home/user/script.sh

# **🏆 FINAL SUMMARY**

# **📌 ARRAYS**

| **Concept** | **Meaning**        |
|-------------|--------------------|
| array       | multiple values    |
| length      | number of items    |
| slicing     | partial extraction |
| unset       | delete element     |

# **📌 STRINGS**

| **Concept**         | **Meaning**      |
|---------------------|------------------|
| length              | string size      |
| substring           | partial text     |
| replace             | modify text      |
| uppercase/lowercase | case conversion  |
| regex               | pattern matching |

# **📌 PROCESS MANAGEMENT**

| **Tool**   | **Purpose**          |
|------------|----------------------|
| ps         | list processes       |
| top/htop   | monitoring           |
| kill/pkill | stop processes       |
| jobs       | background jobs      |
| nohup      | persistent execution |

# **📌 SIGNALS**

| **Signal** | **Meaning**    |
|------------|----------------|
| SIGINT     | Ctrl+C         |
| SIGTERM    | graceful stop  |
| SIGKILL    | force kill     |
| trap       | handle signals |

# **📌 CRON**

| **Feature** | **Meaning**    |
|-------------|----------------|
| cron        | scheduler      |
| @daily      | run daily      |
| @reboot     | run on startup |
| logging     | track jobs     |

# **📘 CHAPTER 12 — Networking Commands Bash Scripts (DEVOPS ESSENTIALS)**

This chapter combines **Networking + Debugging**, because in real DevOps work:

- scripts talk to servers
- APIs are called
- services are checked
- failures must be traced and fixed

# **🌿 SECTION 1: Networking Commands in Bash (DEVOPS CORE)**

# **🧠 Why Networking Commands Matter?**

DevOps engineers use networking tools to:

- check server connectivity
- test APIs
- debug DNS issues
- monitor services
- validate deployments

# **🔥 TOOL 1: curl (VERY IMPORTANT)**

# **🧠 What is curl?**

``` bash
curl is used to:
```

> transfer data from or to a server using URLs

# **🧠 Basic Example**

``` bash
curl https://example.com
```

# **🧠 API Request Example (REAL DEVOPS)**

``` bash
curl https://api.github.com
```

# **🌿 Common curl Options**

# **🔹 1. GET Request**

``` bash
curl -X GET https://example.com
```

# **🔹 2. POST Request**

``` bash
curl -X POST https://example.com
```

# **🔹 3. Send JSON Data**

``` bash
curl -X POST https://example.com \
```

-H "Content-Type: application/json" \\

-d '{"name":"Ali"}'

# **🧠 DevOps Use Cases**

- API testing
- CI/CD pipelines
- health checks
- microservices communication

# **🔥 TOOL 2: wget**

# **🧠 What is wget?**

``` bash
wget is used to:
```

> download files from the internet

# **🧠 Example**

``` bash
wget https://example.com/file.zip
```

# **🧠 Difference: curl vs wget**

| **Tool** | **Purpose**         |
|----------|---------------------|
| curl     | API + data transfer |
| wget     | file downloading    |

# **🔥 TOOL 3: ping**

# **🧠 What is ping?**

`ping` checks:

> if a server is reachable

# **🧠 Example**

ping google.com

# **🧠 How it Works**

- sends ICMP packets
- waits for response
- measures latency

# **🧠 DevOps Use**

- check server uptime
- test network connectivity
- troubleshoot outages

# **🔥 TOOL 4: netstat (OLD BUT STILL USED)**

# **🧠 What is netstat?**

Shows:

> network connections and ports

# **🧠 Example**

``` bash
netstat -tuln
```

# **🧠 Output Shows**

- open ports
- listening services
- active connections

# **🔥 TOOL 5: ss (MODERN netstat)**

# **🧠 What is ss?**

`ss` is:

> faster and modern version of netstat

# **🧠 Example**

``` bash
ss -tuln
```

# **🧠 Why ss is Better?**

| **netstat** | **ss**      |
|-------------|-------------|
| slow        | fast        |
| outdated    | modern      |
| heavy       | lightweight |

# **🔥 TOOL 6: dig (DNS TOOL)**

# **🧠 What is dig?**

Used to:

> query DNS records

# **🧠 Example**

dig google.com

# **🧠 What It Shows**

- IP address
- DNS servers
- query details

# **🧠 DevOps Use**

- DNS debugging
- domain verification
- network troubleshooting

# **🔥 TOOL 7: nslookup**

# **🧠 What is nslookup?**

Also used for:

> DNS lookup

# **🧠 Example**

    nslookup google.com

# **🧠 Difference: dig vs nslookup**

| **Tool** | **Use**           |
|----------|-------------------|
| dig      | advanced DNS info |
| nslookup | simple DNS check  |

# **🧠 DevOps Summary of Networking Tools**

| **Tool** | **Purpose**          |
|----------|----------------------|
| curl     | API calls            |
| wget     | file download        |
| ping     | connectivity check   |
| netstat  | network stats        |
| ss       | modern network stats |
| dig      | DNS debugging        |
| nslookup | simple DNS lookup    |

# **📘 CHAPTER 13 — Debugging Bash Scripts (VERY IMPORTANT)**

# **🧠 Why Debugging is Important?**

In DevOps:

- scripts fail often
- automation breaks
- production issues occur

Debugging helps:

> find and fix errors quickly

# **🌿 SECTION 1: bash -x (DEBUG MODE)**

# **🧠 What is bash -x?**

It shows:

> step-by-step execution of script

# **🧠 Example**

``` bash
bash -x script.sh
```

# **🧠 What You See**

- each command before execution
- variable values
- flow of script

# **🧠 DevOps Use**

- debugging CI/CD pipelines
- finding hidden errors
- tracing script flow

# **🌿 SECTION 2: set -x (SCRIPT DEBUG MODE)**

# **🧠 What is set -x?**

    set -x

Means:

> enable debugging inside script

# **🧠 Example**

``` bash
#!/bin/bash
set -x
name="Ali"
echo $name
```

# **🧠 To Disable Debugging**

    set +x

# **🧠 DevOps Use**

- trace production scripts
- debug automation workflows

# **🌿 SECTION 3: Logging in Bash (VERY IMPORTANT)**

# **🧠 What is Logging?**

Logging means:

> saving script output for later analysis

# **🧠 Basic Logging Example**

``` bash
echo "Script started" >> app.log
```

# **🧠 Timestamp Logging (PRO LEVEL)**

``` bash
echo "$(date) - Script started" >> app.log
```

# **🧠 Why Logging is Important?**

Used for:

- debugging failures
- audit trails
- monitoring systems
- production tracking

# **🧠 DevOps Standard Practice**

Always log:

- start time
- errors
- success messages

# **🌿 SECTION 4: tee Command (VERY IMPORTANT)**

# **🧠 What is tee?**

`tee`:

> shows output AND saves it to file

# **🧠 Example**

``` bash
echo "Hello" | tee output.txt
```

# **🧠 Output**

- shows in terminal
- saves to file

# **🧠 Append Mode**

``` bash
echo "Log entry" | tee -a app.log
```

# **🧠 Why tee is Powerful?**

Because it:

- displays output
- logs output
- helps debugging

# **🧠 DevOps Use Cases**

- CI/CD logs
- deployment logs
- pipeline monitoring
- real-time debugging

# **🏆 FINAL SUMMARY**

# **📌 NETWORKING COMMANDS**

| **Tool** | **Purpose**          |
|----------|----------------------|
| curl     | API requests         |
| wget     | downloads            |
| ping     | connectivity         |
| netstat  | old network stats    |
| ss       | modern network stats |
| dig      | DNS lookup           |
| nslookup | simple DNS check     |

# **📌 DEBUGGING TOOLS**

| **Tool** | **Purpose**           |
|----------|-----------------------|
| bash -x  | external debugging    |
| set -x   | internal debugging    |
| logging  | save output           |
| tee      | display + save output |

# **📘 CHAPTER 14 — Advanced Bash Scripting (PRO LEVEL DEVOPS SKILLS)**

This chapter is where Bash becomes **real engineering tool**, not just scripting.

You’ll learn features used in:

- CI/CD pipelines
- production automation
- Linux internals
- DevOps tooling
- performance optimization

# **🌿 SECTION 1: Case Statement (Cleaner IF-ELSE)**

# **🧠 What is case?**

`case` is used when:

> you have multiple conditions based on one variable

It is cleaner than multiple `if-elif`.

# **🧠 Syntax**

    case $variable in

pattern1)

commands ;;

pattern2)

commands ;;

\*)

default ;;

    esac

# **🧠 Example**

``` bash
#!/bin/bash
action=$1
case $action in
```

start)

``` bash
echo "Starting service" ;;
```

stop)

``` bash
echo "Stopping service" ;;
```

restart)

``` bash
echo "Restarting service" ;;
```

\*)

``` bash
echo "Invalid option" ;;
esac
```

# **🧠 DevOps Use**

Used in:

- service scripts (`start/stop/restart`)
- CLI tools
- deployment scripts

# **🌿 SECTION 2: Here Documents (\<\< EOF)**

# **🧠 What is Here Document?**

Used to:

> send multiple lines as input to a command

# **🧠 Syntax**

``` bash
cat << EOF
```

hello

world

EOF

# **🧠 Example**

``` bash
cat << EOF > file.txt
```

This is line 1

This is line 2

EOF

# **🧠 DevOps Use Cases**

- generating config files
- writing scripts dynamically
- creating Docker/Kubernetes configs

# **🌿 SECTION 3: Here Strings (\<\<\<)**

# **🧠 What is Here String?**

Used to:

> pass a single string as input

# **🧠 Example**

    text="root user access"
    grep root <<< "$text"

# **🧠 Output**

root user access

# **🧠 Difference**

| **Type** | **Use**             |
|----------|---------------------|
| \<\< EOF | multi-line input    |
| \<\<\<   | single string input |

# **🌿 SECTION 4: Command Substitution (VERY IMPORTANT)**

# **🧠 What is Command Substitution?**

It allows:

> storing command output inside a variable

# **🧠 Old Style**

    date=`date`

# **🧠 Modern Style (Recommended)**

    date=$(date)

# **🧠 Example**

    today=$(date)
    echo "Today is $today"

# **🧠 DevOps Use**

- timestamps in logs
- dynamic filenames
- automation scripts

# **🌿 SECTION 5: Process Substitution (ADVANCED)**

# **🧠 What is Process Substitution?**

It allows:

> using output of a command like a file

# **🧠 Example**

    diff <(ls dir1) <(ls dir2)

# **🧠 Explanation**

| **Part**    | **Meaning**    |
|-------------|----------------|
| \<(command) | output as file |
| diff        | compare files  |

# **🧠 DevOps Use**

- comparing configs
- validating deployments
- system auditing

# **🌿 SECTION 6: Named Pipes (FIFO)**

# **🧠 What is FIFO?**

FIFO = First In First Out pipe

It is:

> a special file used for inter-process communication

# **🧠 Create FIFO**

mkfifo mypipe

# **🧠 Example Usage**

Terminal 1:

cat mypipe

Terminal 2:

``` bash
echo "Hello DevOps" > mypipe
```

# **🧠 DevOps Use**

- log streaming
- process communication
- real-time data pipelines

# **🌿 SECTION 7: Subshells**

# **🧠 What is Subshell?**

A subshell is:

> a separate child shell process

# **🧠 Syntax**

(command)

# **🧠 Example**

(cd /tmp && ls)

# **🧠 Important Behavior**

Inside subshell:

- changes do NOT affect parent shell

# **🧠 Example**

``` bash
cd /tmp
```

(cd /etc && ls)

pwd

# **🧠 DevOps Use**

- safe directory operations
- isolated command execution

# **🌿 SECTION 8: Parallel Execution (VERY IMPORTANT)**

# **🧠 What is Parallel Execution?**

Running multiple tasks at the same time.

# **🧠 Example**

task1 &

task2 &

task3 &

    wait

# **🧠 Explanation**

| **Symbol** | **Meaning**        |
|------------|--------------------|
| &          | run in background  |
| wait       | wait for all tasks |

# **🧠 DevOps Use**

- deploy multiple servers
- run parallel jobs
- speed up automation

# **🌿 SECTION 9: Background Jobs**

# **🧠 What are Background Jobs?**

Processes that run:

> without blocking terminal

# **🧠 Example**

    sleep 100 &

# **🧠 View Jobs**

    jobs

# **🧠 Bring to Front**

    fg %1

# **🧠 Send to Background**

    bg %1

# **🧠 DevOps Use**

- long-running scripts
- server monitoring
- background services

# **🏆 FINAL SUMMARY**

# **📌 ADVANCED BASH CONCEPTS**

| **Concept**          | **Purpose**                 |
|----------------------|-----------------------------|
| case                 | multi-condition logic       |
| here document        | multi-line input            |
| here string          | single string input         |
| command substitution | store output                |
| process substitution | treat output as file        |
| FIFO                 | inter-process communication |
| subshell             | isolated execution          |
| parallel execution   | speed up tasks              |
| background jobs      | non-blocking execution      |

# **📘 CHAPTER 15 — Bash Security Best Practices (VERY IMPORTANT — REAL DEVOPS LEVEL)**

This is one of the most **critical but most ignored chapters** in Bash scripting.

In real production environments, bad Bash scripts can:

- delete servers
- expose passwords
- break CI/CD pipelines
- destroy data

So this chapter is about **writing safe scripts like a professional DevOps engineer**.

# **🌿 SECTION 1: Why Bash Security Matters?**

# **🧠 Reality in DevOps**

Bash scripts often run as:

- root user
- CI/CD pipelines
- automation tools
- production servers

So one mistake = **system damage**

# **🧠 Example Risk**

``` bash
rm -rf /
```

This can destroy a system if misused.

# **🌿 SECTION 2: Avoid Hardcoded Passwords (CRITICAL)**

# **❌ BAD PRACTICE**

    password="123456"

or

``` bash
curl -u admin:123456 https://api.com
```

# **🧠 Why it's dangerous?**

- visible in code
- stored in GitHub
- accessible to everyone
- security breach risk

# **✅ GOOD PRACTICE**

Use environment variables:

export DB_PASS="secret123"

Then in script:

``` bash
echo $DB_PASS
```

# **🧠 DevOps Standard**

Use:

- environment variables
- secret managers (AWS Secrets Manager, Vault)
- CI/CD secrets

# **🌿 SECTION 3: Always Quote Variables (VERY IMPORTANT)**

# **❌ BAD**

``` bash
rm -rf $dir
```

If `$dir` is empty → danger!

# **❌ EVEN WORSE**

``` bash
rm -rf *
```

# **✅ SAFE VERSION**

``` bash
rm -rf "$dir"
```

# **🧠 Why Quotes Matter?**

Quotes protect:

- spaces in filenames
- empty variables
- special characters

# **🧠 Example Problem**

    dir="my folder"
    rm -rf $dir

Becomes:

``` bash
rm -rf my folder
```

❌ WRONG (interpreted as two arguments)

# **🌿 SECTION 4: Validate Inputs (VERY IMPORTANT)**

# **🧠 What is input validation?**

Before using user input:

> check if it is safe and correct

# **❌ BAD**

``` bash
rm -rf "$1"
```

# **✅ GOOD**

    if [ -z "$1" ]; then
    echo "No input provided"
    exit 1
    fi

# **🧠 Advanced Validation Example**

    if [[ ! "$1" =~ ^[a-zA-Z0-9_/-]+$ ]]; then
    echo "Invalid input"
    exit 1
    fi

# **🧠 DevOps Use**

- protect deployments
- secure automation scripts
- prevent accidental deletion
- validate API inputs

# **🌿 SECTION 5: Use Least Privilege (VERY IMPORTANT)**

# **🧠 What is Least Privilege?**

> Run scripts with minimum required permissions

# **❌ BAD**

Running everything as root:

``` bash
sudo ./script.sh
```

# **❌ DANGEROUS**

Script can:

- delete system files
- modify OS configs

# **✅ GOOD PRACTICE**

- run as normal user
- escalate only when needed

# **🧠 DevOps Rule**

Only use `sudo` when required:

``` bash
sudo systemctl restart nginx
```

NOT full script.

# **🌿 SECTION 6: Avoid rm -rf Mistakes (CRITICAL TOPIC)**

# **❌ DANGEROUS**

``` bash
rm -rf $dir
```

If `$dir` is empty:

``` bash
rm -rf
```

This may delete current directory or cause unpredictable behavior.

# **✅ SAFE VERSION**

``` bash
rm -rf "$dir"
```

# **🧠 Even Safer Version**

    if [ -n "$dir" ]; then
    rm -rf "$dir"
    else
    echo "Directory is empty - aborting"
    fi

# **🧠 PRO LEVEL SAFETY CHECK**

    set -u
    set -e
    rm -rf -- "$dir"

# **🧠 Why** `--` **is Important?**

It prevents:

> treating arguments as options

Example:

``` bash
rm -rf -- -myfolder
```

# **🌿 SECTION 7: Extra Security Best Practices (REAL WORLD)**

# **🔹 1. Use** `set -e`

Stop on errors:

    set -e

# **🔹 2. Use** `set -u`

Detect missing variables:

    set -u

# **🔹 3. Use** `set -o pipefail`

Catch pipeline failures:

    set -o pipefail

# **🔹 4. Log everything**

``` bash
echo "$(date) Script started" >> script.log
```

# **🔹 5. Avoid dangerous wildcards**

❌ Dangerous:

``` bash
rm -rf *
```

# **🏆 FINAL SUMMARY**

# **📌 SECURITY RULES**

| **Rule**               | **Why**                     |
|------------------------|-----------------------------|
| No hardcoded passwords | prevents leaks              |
| Quote variables        | prevents word splitting     |
| Validate input         | prevents attacks            |
| Least privilege        | reduces damage              |
| Safe rm -rf            | prevents deletion disasters |

# **📘 CHAPTER 16 — Professional Bash Structure & Real DevOps Projects (MASTER LEVEL)**

This chapter is where Bash scripting becomes **production-grade DevOps engineering**, not just learning syntax.

You will learn:

- how real-world scripts are structured
- how professionals write maintainable automation
- how DevOps tools are actually built using Bash

# **🌿 SECTION 1: Professional Script Structure (VERY IMPORTANT)**

# **🧠 Why Structure Matters?**

Bad scripts:

- messy
- hard to debug
- unsafe
- not reusable

Good scripts:

- readable
- scalable
- production-ready
- team-friendly

# **🏗 STANDARD PROFESSIONAL TEMPLATE**

``` bash
#!/bin/bash
set -euo pipefail
```

# **🧠 Why this line is critical?**

| **Option**      | **Meaning**                  |
|-----------------|------------------------------|
| set -e          | stop on error                |
| set -u          | error on undefined variables |
| set -o pipefail | catch pipeline failures      |

# **🌿 SECTION 2: Variables Section (CLEAN DESIGN)**

# **🧠 Best Practice**

Always keep configuration at top:

    LOG_FILE="/var/log/app.log"
    BACKUP_DIR="/backup"
    APP_NAME="MyApp"

# **🧠 Why?**

So you can:

- change settings easily
- avoid editing logic
- improve readability

# **🌿 SECTION 3: Logging Function (PRO STANDARD)**

# **🧠 Why Logging Function?**

Instead of repeating echo everywhere.

# **🧠 Example**

    log() {
    echo "$(date) : $1"
    }

# **🧠 Usage**

log "Script started"

log "Backup completed"

# **🌿 SECTION 4: Main Function Pattern (VERY IMPORTANT)**

# **🧠 Why main()?**

Professional scripts always use:

> main function = entry point

# **🧠 Example**

    main() {

log "Script started"

log "Running tasks..."

    }

# **🧠 Execution**

main

# **🧠 Benefits**

- cleaner structure
- reusable functions
- easy debugging
- scalable design

# **🌿 SECTION 5: FULL PROFESSIONAL SCRIPT EXAMPLE**

``` bash
#!/bin/bash
set -euo pipefail
# Variables
LOG_FILE="/var/log/app.log"
# Functions
log() {
echo "$(date) : $1"
}
main() {
```

log "Script started"

log "Performing system check"

    }

main

# **🏆 RESULT**

This is exactly how:

- DevOps tools
- deployment scripts
- CI/CD scripts

are written in real companies.

# **📘 CHAPTER 17 — Real DevOps Bash Projects (PRACTICAL MASTER SKILLS)**

# **🚀 WHY THIS CHAPTER MATTERS**

This is where you move from:

> learning Bash → USING Bash in real systems

# **🌿 PROJECT 1: System Health Monitor (VERY IMPORTANT)**

# **🧠 Checks:**

- CPU usage
- RAM usage
- Disk space

# **🧠 Example**

``` bash
#!/bin/bash
echo "CPU:"
top -bn1 | head -5
echo "RAM:"
free -h
echo "Disk:"
df -h
```

# **🌿 PROJECT 2: Backup Automation**

# **🧠 Purpose:**

Automate file backups

``` bash
#!/bin/bash
SRC="/home/user/data"
DEST="/backup"
tar -czf $DEST/backup.tar.gz $SRC
echo "Backup completed"
```

# **🌿 PROJECT 3: Docker Cleanup Script**

``` bash
#!/bin/bash
docker system prune -f
echo "Docker cleaned"
```

# **🌿 PROJECT 4: Kubernetes Helper Script**

``` bash
#!/bin/bash
kubectl get pods
kubectl get services
```

# **🌿 PROJECT 5: AWS EC2 Automation Script**

``` bash
#!/bin/bash
aws ec2 describe-instances
```

# **🌿 PROJECT 6: Log Rotation Script**

``` bash
#!/bin/bash
LOG="/var/log/app.log"
mv $LOG $LOG.old
touch $LOG
echo "Logs rotated"
```

# **🌿 PROJECT 7: CI/CD Deployment Script**

``` bash
#!/bin/bash
git pull origin main
```

docker build -t myapp .

``` bash
docker run -d myapp
```

# **🌿 PROJECT 8: Nginx Monitoring Script**

``` bash
#!/bin/bash
systemctl status nginx
```

# **🌿 PROJECT 9: SSL Expiry Checker**

``` bash
#!/bin/bash
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null \
```

\| openssl x509 -noout -dates

# **🌿 PROJECT 10: Website Uptime Monitor**

``` bash
#!/bin/bash
URL="https://example.com"
while true
do
curl -Is $URL | head -n 1
sleep 5
done
```

# **🏆 FINAL SUMMARY**

# **📌 PROFESSIONAL SCRIPT STRUCTURE**

✔ set -euo pipefail  
✔ variables at top  
✔ logging function  
✔ main function  
✔ modular design

# **📌 REAL DEVOPS PROJECTS**

| **Project**    | **Purpose**           |
|----------------|-----------------------|
| system monitor | health check          |
| backup script  | data safety           |
| docker cleanup | resource optimization |
| k8s helper     | cluster control       |
| AWS script     | cloud automation      |
| log rotation   | storage control       |
| CI/CD script   | deployment automation |
| nginx monitor  | service health        |
| SSL checker    | security monitoring   |
| uptime monitor | availability check    |

# **📘 CHAPTER 18 — Bash for DevOps Tools, Best Practices, Tips & Common Mistakes (MASTER LEVEL)**

This chapter connects Bash with **real DevOps ecosystem tools** and also teaches how professionals write safe, scalable, and error-free scripts.

# **🌿 SECTION 1: Bash for DevOps Tools (REAL-WORLD INTEGRATION)**

# **🧠 Why This Chapter Matters**

In real DevOps jobs, Bash is not used alone. It is used to:

- control tools
- automate infrastructure
- glue systems together

# **🌿 1. Git Automation (VERY COMMON)**

# **🧠 Use Case:**

Automate commits, pull, push, deployments.

# **🧠 Example**

``` bash
#!/bin/bash
```

git add .

``` bash
git commit -m "auto commit"
git push origin main
```

# **🧠 Real DevOps Use**

- CI/CD pipelines
- auto deployments
- backup versioning

# **🌿 2. Docker Automation**

# **🧠 Use Case:**

Build and run containers automatically.

``` bash
#!/bin/bash
```

docker build -t myapp .

``` bash
docker run -d -p 8080:80 myapp
```

# **🧠 DevOps Use**

- microservices deployment
- container automation
- CI pipelines

# **🌿 3. Kubernetes Scripting**

# **🧠 Example**

``` bash
#!/bin/bash
kubectl get pods
kubectl apply -f deployment.yaml
kubectl rollout status deployment/myapp
```

# **🧠 Use Case**

- cluster management
- deployment automation
- scaling apps

# **🌿 4. Terraform Integration**

# **🧠 Example**

``` bash
#!/bin/bash
terraform init
terraform plan
terraform apply -auto-approve
```

# **🧠 Use Case**

- Infrastructure as Code (IaC)
- cloud provisioning

# **🌿 5. Jenkins Pipelines (Bash inside CI/CD)**

# **🧠 Example Jenkins Step**

``` bash
#!/bin/bash
echo "Building project"
mvn clean install
```

# **🧠 Use Case**

- CI/CD automation
- build pipelines
- testing workflows

# **🌿 6. AWS CLI Automation**

# **🧠 Example**

``` bash
#!/bin/bash
aws ec2 describe-instances
aws s3 ls
```

# **🧠 Use Case**

- cloud automation
- server management
- storage operations

# **🌿 7. Ansible + Bash Integration**

# **🧠 Example**

``` bash
#!/bin/bash
ansible-playbook deploy.yml
```

# **🧠 Use Case**

- configuration management
- multi-server automation

# **📘 CHAPTER 19 — Bash Best Practices (PRODUCTION RULES)**

# **🌿 1. Naming Conventions (VERY IMPORTANT)**

# **🧠 Good Naming**

    backup_dir="/data/backup"
    log_file="/var/log/app.log"

# **❌ Bad Naming**

    x=1
    a=folder

# **🌿 2. Comments (DOCUMENTATION)**

    # This function logs messages
    log() {
    echo "$(date) - $1"
    }

# **🧠 Why important?**

- team collaboration
- debugging
- maintenance

# **🌿 3. Functions (MODULAR CODE)**

    backup() {
    tar -czf backup.tar.gz /data
    }

# **🌿 4. Logging (VERY IMPORTANT)**

``` bash
echo "$(date) Backup started" >> app.log
```

# **🌿 5. Error Handling**

    set -e

Stops script if error occurs.

# **🌿 6. Input Validation**

    if [ -z "$1" ]; then
    echo "Input missing"
    exit 1
    fi

# **🌿 7. Idempotent Scripts (VERY IMPORTANT DEVOPS CONCEPT)**

# **🧠 What is Idempotent?**

> Running script multiple times gives SAME result

# **🧠 Example**

``` bash
mkdir -p /data/app
```

Safe:

- no error if folder exists

# **🧠 Why important?**

Used in:

- CI/CD pipelines
- Kubernetes
- Terraform
- automation tools

# **📘 CHAPTER 20 — Bash Tips & Tricks (PRODUCTIVITY BOOST)**

# **🌿 1. Aliases**

alias update="sudo apt update && sudo apt upgrade -y"

# **🌿 2. History**

    history

Run previous command:

!!

# **🌿 3. TAB Completion**

- auto-completes commands
- reduces typing errors

# **🌿 4. Ctrl + R (SEARCH COMMANDS)**

Press:

CTRL + R

Search old commands instantly.

# **🌿 5. Brace Expansion**

touch file{1..5}.txt

Creates:

- file1.txt
- file2.txt
- file3.txt
- file4.txt
- file5.txt

# **🌿 6. Wildcards**

# **🔹 \***

Matches everything:

``` bash
rm *.log
```

# **🔹 ?**

Matches single character:

ls file?.txt

# **🔹 \[\]**

Character range:

ls file\[1-3\].txt

# **📘 CHAPTER 21 — Common Bash Mistakes (EXTREMELY IMPORTANT)**

# **🌿 1. Unquoted Variables (MOST DANGEROUS MISTAKE)**

# **❌ BAD**

``` bash
rm -rf $dir
```

If empty → disaster.

# **✅ GOOD**

``` bash
rm -rf "$dir"
```

# **🧠 Why?**

Prevents:

- word splitting
- accidental deletion
- command injection risks

# **🌿 2. Spaces Around = (VERY COMMON ERROR)**

# **❌ WRONG**

name = Ali

# **❌ Why wrong?**

Bash interprets:

- `name` as command
- `=` as argument

# **✅ CORRECT**

    name="Ali"

# **🌿 3. Forgetting set -e**

Scripts continue silently after failure.

# **🌿 4. Using rm -rf without safety checks**

Always use:

``` bash
rm -rf -- "$dir"
```

# **🌿 5. Not validating input**

Leads to:

- crashes
- security issues

# **🏆 FINAL SUMMARY**

# **📌 DEVOPS TOOL INTEGRATION**

| **Tool**   | **Use**          |
|------------|------------------|
| Git        | automation       |
| Docker     | containerization |
| Kubernetes | orchestration    |
| Terraform  | infrastructure   |
| Jenkins    | CI/CD            |
| AWS CLI    | cloud automation |
| Ansible    | configuration    |

# **📌 BEST PRACTICES**

✔ clean naming  
✔ comments  
✔ functions  
✔ logging  
✔ error handling  
✔ input validation  
✔ idempotent scripts

# **📌 PRODUCTIVITY TIPS**

✔ aliases  
✔ history  
✔ TAB completion  
✔ Ctrl+R search  
✔ brace expansion  
✔ wildcards

# **📌 COMMON MISTAKES**

❌ unquoted variables  
❌ spaces in assignments  
❌ unsafe rm -rf  
❌ missing validation

# **📘 CHAPTER 22 — Complete Bash Mastery Roadmap + Missing Core Concepts (FINAL MASTER GUIDE)**

This chapter brings everything together and also covers the **MOST IMPORTANT missing foundations** that most Bash learners skip.

# **🌿 SECTION 1: Using Backticks vs** `$()` **(VERY IMPORTANT BUT OUTDATED TOPIC)**

# **🧠 What are Backticks?**

Backticks are an old way of command substitution:

    today=`date`

# **🧠 Modern Way (RECOMMENDED)**

    today=$(date)

# **⚖️ Backticks vs \$()**

| **Feature**      | **Backticks** | **\$()**       |
|------------------|---------------|----------------|
| readability      | poor          | excellent      |
| nesting commands | hard          | easy           |
| modern standard  | ❌ outdated   | ✅ recommended |

# **🧠 Example Comparison**

### **❌ Old style**

echo \`ls\`

### **✅ Modern style**

``` bash
echo $(ls)
```

# **🚨 IMPORTANT RULE**

👉 Always use:

\$(command)

NOT backticks.

# **🌿 SECTION 2: Complete Bash Learning Path (ROADMAP)**

This is your **structured learning roadmap from beginner → DevOps engineer**

# **🌱 BEGINNER LEVEL**

You must master:

✔ Basic commands  
✔ Variables  
✔ Loops  
✔ Conditions

# **🧠 Skills**

- ls, cd, pwd, mkdir
- echo, read
- if, else
- for, while loops

# **🌿 INTERMEDIATE LEVEL**

✔ Arrays  
✔ Functions  
✔ File handling  
✔ Cron jobs

# **🧠 Skills**

- scripts with arguments
- reading files
- scheduling jobs
- reusable functions

# **🔥 ADVANCED LEVEL**

✔ Text processing  
✔ Debugging  
✔ Signals  
✔ Process management

# **🧠 Skills**

- grep, awk, sed
- bash -x debugging
- trap handling
- ps, kill, jobs

# **☁️ DEVOPS LEVEL**

✔ Automation  
✔ Cloud  
✔ Docker  
✔ Kubernetes  
✔ CI/CD

# **🧠 Skills**

- AWS CLI scripts
- Docker automation
- kubectl commands
- Jenkins pipelines

# **🚀 EXTRA IMPORTANT MISSING TOPICS (CRITICAL FOUNDATION)**

# **🌿 1. Quotes (VERY HIGH IMPORTANCE)**

# **🧠 Types of Quotes**

| **Type**  | **Meaning**        |
|-----------|--------------------|
| " "       | variable expansion |
| ' '       | literal text       |
| no quotes | dangerous          |

# **❌ BAD**

``` bash
rm -rf $dir
```

# **✅ SAFE**

``` bash
rm -rf "$dir"
```

# **🌿 2. Pipes & Redirection (VERY IMPORTANT)**

# **🧠 Pipe \|**

Used to pass output between commands:

cat file.txt \| grep root

# **🧠 stdin, stdout, stderr**

| **Stream** | **Meaning** |
|------------|-------------|
| stdin      | input       |
| stdout     | output      |
| stderr     | error       |

# **🌿 Redirection Operators**

# **🔹 stdout**

    command > output.txt

# **🔹 append**

    command >> output.txt

# **🔹 stderr**

    command 2> error.txt

# **🔹 stdout + stderr together**

    command > output.log 2>&1

# **🧠 DevOps Use**

- logging pipelines
- debugging servers
- CI/CD output capture

# **🌿 3. getopts (HIGH IMPORTANCE)**

Used for professional CLI tools:

    ./script.sh -u admin -p 1234

# **🌿 4. set -euo pipefail (VERY IMPORTANT)**

    set -euo pipefail

| **Option** | **Meaning**               |
|------------|---------------------------|
| -e         | stop on error             |
| -u         | undefined variables error |
| pipefail   | detect pipeline failure   |

# **🌿 5. Regex (HIGH IMPORTANCE)**

Used in validation and filtering:

\[\[ "hello123" =~ ^hello \]\]

# **🌿 6. trap (VERY IMPORTANT)**

Used to handle signals:

    trap "echo exiting..." EXIT

# **🌿 7. Process Substitution (ADVANCED)**

    diff <(ls dir1) <(ls dir2)

# **🌿 8. ShellCheck (VERY IMPORTANT TOOL)**

# **🧠 What is ShellCheck?**

A tool that finds:

- bugs
- unsafe code
- bad practices

# **🧠 Install**

``` bash
sudo apt install shellcheck
```

# **🧠 Run**

shellcheck script.sh

# **🌿 9. Subshells (IMPORTANT)**

(cd /tmp && ls)

Changes do NOT affect main shell.

# **🌿 10. Pipes & Redirection (CORE DEVOPS SKILL)**

Already covered above — this is **critical for logs + automation + CI/CD**

# **📘 SPECIAL SECTION — HOW TO LEARN BASH (REAL ROADMAP)**

# **🚀 Step 1: Learn Linux Commands**

- navigation
- file system
- permissions

# **🚀 Step 2: Practice Small Scripts**

- hello world
- calculators
- file operations

# **🚀 Step 3: Automate Your Tasks**

- backups
- cleanup scripts
- monitoring

# **🚀 Step 4: Study GitHub Scripts**

- read real-world code
- understand structure

# **🚀 Step 5: Build DevOps Projects**

- CI/CD
- Docker automation
- AWS scripts

# **🧠 BEST MINI PROJECTS**

| **Project**    | **Skill**  |
|----------------|------------|
| calculator     | variables  |
| file organizer | loops      |
| backup script  | automation |
| user manager   | conditions |
| system monitor | DevOps     |
| docker cleanup | real-world |
| uptime checker | networking |

# **🏆 FINAL PROFESSIONAL SCRIPT TEMPLATE**

``` bash
#!/usr/bin/env bash
set -euo pipefail
# =========================
# Variables
# =========================
LOG_FILE="app.log"
# =========================
# Functions
# =========================
log() {
echo "$(date) : $1" >> "$LOG_FILE"
}
# =========================
# Main
# =========================
main() {
```

log "Application started"

    }

main

# **🏁 FINAL ADVICE**

# **✅ DO**

✔ Practice daily  
✔ Write scripts manually  
✔ Learn Linux deeply  
✔ Understand pipelines  
✔ Build real projects

# **❌ DON'T**

✘ Copy-paste blindly  
✘ Memorize without understanding  
✘ Skip debugging concepts  
✘ Avoid practice

# **📘 Bash Scripting Handbook**

## **Complete Beginner-to-Advanced Guide for Linux & DevOps Automation**

### **Based on the Bash Scripting Tutorial by** [**TechWorld with Nana**](https://www.techworld-with-nana.com?utm_source=chatgpt.com)

### **Accompanying Resource for the TechWorld with Nana YouTube Channel**

# **📑 Table of Contents**

1.  Introduction to Bash Scripting
2.  Understanding Shell, Bash & Terminal
3.  Installing and Setting Up Bash
4.  Creating Sample Log Files
5.  Essential Linux Commands for Bash Scripting
6.  Manual Log Analysis Workflow
7.  Creating Your First Bash Script
8.  Understanding Shebang (`#!/bin/bash`)
9.  Making Scripts Executable
10. Using `echo` and Formatting Output
11. Variables in Bash
12. Arrays in Bash
13. Command Substitution
14. Loops & Iteration
15. Nested Loops
16. File Operations & Output Redirection
17. Conditionals (`if` Statements)
18. Bash Scripting Best Practices
19. Real-World Bash Automation Projects
20. Advanced Bash Learning Roadmap
21. Useful Commands Every DevOps Engineer Should Know
22. Online Learning Resources
23. Final Notes & Next Steps

# **🧱 CHAPTER 1: Introduction to Bash Scripting**

## **🌿 1.1 What You Will Learn**

By learning Bash scripting, you will be able to:

- Understand what shell scripting is
- Automate repetitive Linux tasks
- Create reusable automation scripts
- Work with variables, loops, arrays, and conditionals
- Analyze log files automatically
- Build DevOps and system administration automation

## **🌿 1.2 Why Bash Scripting is Important**

Bash scripting helps engineers automate tasks that normally take:

- 30 minutes manually
- repeated every day
- error-prone operations

With Bash scripting:

✅ Tasks become automated  
✅ Faster execution  
✅ Fewer human mistakes  
✅ Consistent results  
✅ Easy documentation

## **🌿 1.3 Real-World Impact**

Bash scripting is heavily used in:

- DevOps
- Linux Administration
- Cloud Engineering
- CI/CD Pipelines
- Monitoring Systems
- Server Automation
- Deployment Scripts
- Backup Automation

# **🧱 CHAPTER 2: Understanding Shell, Bash & Terminal**

Before writing scripts, you must understand the Linux command-line environment.

# **🌿 2.1 GUI vs CLI**

## **🖥️ Graphical User Interface (GUI)**

The visual way of using a computer.

Examples:

- Clicking icons
- Using a mouse
- Dragging files

### **Advantages**

- Easy for beginners
- Visual interaction

### **Disadvantages**

- Slow for repetitive tasks
- Difficult to automate

## **⌨️ Command Line Interface (CLI)**

A text-based way to control the computer.

Example:

``` bash
mkdir project1 project2 project3
```

Instead of clicking folders manually.

### **Advantages**

- Extremely powerful
- Fast
- Automatable
- Preferred by DevOps engineers

# **🌿 2.2 What is a Shell?**

A shell is a program that:

- accepts commands
- interprets them
- communicates with the operating system

The shell acts as a bridge between:

User → Shell → Operating System

# **🌿 2.3 What is Bash?**

## **Bash = Bourne Again Shell**

Bash is:

- the most popular Linux shell
- both a command interpreter and scripting language

Used in:

- Linux
- macOS
- Servers
- Cloud systems
- DevOps environments

# **🌿 2.4 What is a Terminal?**

A terminal is the graphical window where you type commands.

Think of it like this:

| **Component** | **Purpose**         |
|---------------|---------------------|
| Terminal      | Window              |
| Shell         | Command interpreter |
| Bash          | Specific shell      |

# **🌿 2.5 Why Learn Shell Scripting?**

## **Benefits**

### **✅ Automation**

Convert repetitive tasks into one command.

### **✅ Consistency**

Tasks execute the same way every time.

### **✅ Speed**

Complete tasks in seconds.

### **✅ Documentation**

Scripts document processes automatically.

### **✅ Error Reduction**

Avoid human mistakes.

# **🧱 CHAPTER 3: Installing and Setting Up Bash**

# **🌿 3.1 Bash Setup on macOS**

macOS already includes Bash.

## **Check Bash Version**

``` bash
bash --version
```

## **Change Default Shell to Bash**

chsh -s /bin/bash

# **🌿 3.2 Bash Setup on Windows**

## **Option 1 — WSL (Recommended)**

### **Install WSL**

Open PowerShell as Administrator:

wsl --install

This installs Ubuntu with Bash.

## **Option 2 — Git Bash**

Install from:

[Git for Windows](https://git-scm.com/download/win?utm_source=chatgpt.com)

# **🌿 3.3 Bash Setup on Linux**

Most Linux distributions already include Bash.

Verify:

which bash

``` bash
bash --version
```

# **🌿 3.4 Test Bash**

``` bash
echo "Hello, Bash scripting!"
```

# **🧱 CHAPTER 4: Creating Sample Log Files**

# **🌿 4.1 Create Logs Directory**

``` bash
mkdir logs
```

cd logs

# **🌿 4.2 Create Log Files**

touch application.log

touch system.log

Or:

touch logs/application.log

touch logs/system.log

# **🌿 4.3 Why Use Sample Logs?**

These logs help practice:

- searching
- filtering
- monitoring
- automation
- log analysis

Common log levels:

| **Level** | **Meaning**     |
|-----------|-----------------|
| INFO      | Informational   |
| WARNING   | Potential issue |
| ERROR     | Error occurred  |
| CRITICAL  | Serious problem |
| FATAL     | System failure  |

# **🧱 CHAPTER 5: Essential Linux Commands for Bash Scripting**

# **🌿 5.1 Viewing File Contents**

## `cat`

``` bash
cat /path/to/logfile.log
```

Displays full file contents.

## `less`

    less /path/to/logfile.log

View large files page by page.

## `head`

``` bash
head /path/to/logfile.log
```

Displays first 10 lines.

## `tail`

``` bash
tail /path/to/logfile.log
```

Displays last 10 lines.

# **🌿 5.2 Searching Content with** `grep`

## **Search Text**

``` bash
grep "ERROR" logfile.log
```

## **Count Matches**

``` bash
grep -c "ERROR" logfile.log
```

## **Case-Insensitive Search**

``` bash
grep -i "error" logfile.log
```

## **Show Line Numbers**

``` bash
grep -n "ERROR" logfile.log
```

# **🌿 5.3 Finding Files with** `find`

## **Find All** `.log` **Files**

``` bash
find . -name "*.log"
```

## **Find Recently Modified Files**

``` bash
find /path/to/logs -name "*.log" -mtime -1
```

## **Find Large Files**

``` bash
find /path/to/logs -name "*.log" -size +100M
```

## **Find Files Containing ERROR**

``` bash
find /path/to/logs -name "*.log" -exec grep -l "ERROR" {} \;
```

# **🧱 CHAPTER 6: Manual Log Analysis Workflow**

# **🌿 6.1 Traditional Manual Process**

    # Step 1
    find /Users/nana/logs -name "*.log" -mtime -1
    # Step 2
    grep "ERROR" /Users/nana/logs/application.log
    # Step 3
    grep -c "ERROR" /Users/nana/logs/application.log
    # Step 4
    grep "ERROR" /Users/nana/logs/application.log | tail -1
    # Step 5
    grep "FATAL" /Users/nana/logs/system.log
    # Step 6
    grep -c "FATAL" /Users/nana/logs/system.log

# **🌿 6.2 Problems with Manual Work**

❌ Repetitive  
❌ Time-consuming  
❌ Easy to forget steps  
❌ Human errors  
❌ No standard reporting

This is why automation matters.

# **🧱 CHAPTER 7: Creating Your First Bash Script**

# **🌿 7.1 Create Script File**

touch analyse_logs.sh

# **🌿 7.2 Open Script Editor**

``` bash
vim analyse_logs.sh
```

# **🌿 7.3 Basic Script Structure**

``` bash
#!/bin/bash
echo "Hello World"
```

# **🌿 7.4 Add Manual Commands into Script**

``` bash
#!/bin/bash
find /Users/nana/logs -name "*.log" -mtime -1
grep "ERROR" /Users/nana/logs/application.log
```

# **🧱 CHAPTER 8: Understanding Shebang (**`#!/bin/bash`**)**

# **🌿 8.1 What is Shebang?**

The first line:

``` bash
#!/bin/bash
```

tells Linux:

> “Use Bash interpreter to execute this script.”

# **🌿 8.2 Why Shebang is Important**

Without it:

- Linux may use wrong shell
- script may fail

# **🌿 8.3 Common Shebangs**

| **Shebang**           | **Purpose**   |
|-----------------------|---------------|
| `#!/bin/bash`         | Bash          |
| `#!/bin/sh`           | POSIX shell   |
| `#!/usr/bin/env bash` | Portable Bash |

# **🧱 CHAPTER 9: Making Scripts Executable**

# **🌿 9.1 Give Execute Permission**

``` bash
chmod +x analyse_logs.sh
```

# **🌿 9.2 Run Script**

    ./analyse_logs.sh

# **🌿 9.3 Why** `./` **?**

    ./ means:

> run script from current directory

# **🧱 CHAPTER 10: Using echo and Formatting Output**

# **🌿 10.1 Basic echo**

``` bash
echo "Hello"
```

# **🌿 10.2 Add Line Breaks**

``` bash
echo -e "\nHello"
```

# **🌿 10.3 Why** `-e` **?**

Allows escape sequences:

| **Escape** | **Meaning** |
|------------|-------------|
| `\n`       | New line    |
| `\t`       | Tab         |

# **🌿 10.4 Better Output Formatting**

``` bash
#!/bin/bash
echo "### analysing logs ###"
echo "======================"
echo -e "\n### searching ERROR logs ###"
```

# **🧱 CHAPTER 11: Variables in Bash**

# **🌿 11.1 Why Variables Matter**

Without variables:

- repeated code
- difficult maintenance

Variables improve:

- readability
- flexibility
- maintainability

# **🌿 11.2 Creating Variables**

    LOG_DIR="/Users/nana/logs"
    APP_LOG_FILE="application.log"
    SYS_LOG_FILE="system.log"

# **🌿 11.3 Using Variables**

``` bash
find "$LOG_DIR" -name "*.log"
```

# **🌿 11.4 Variable Best Practices**

✅ Use descriptive names  
✅ Use ALL_CAPS  
✅ Quote variables

Correct:

"\$VARIABLE"

# **🧱 CHAPTER 12: Arrays in Bash**

# **🌿 12.1 Create Arrays**

    ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")

# **🌿 12.2 Access Array Elements**

## **First Element**

\${ERROR_PATTERNS\[0\]}

## **All Elements**

\${ERROR_PATTERNS\[@\]}

## **Array Length**

\${#ERROR_PATTERNS\[@\]}

# **🧱 CHAPTER 13: Command Substitution**

# **🌿 13.1 Store Command Output in Variable**

    LOG_FILES=$(find "$LOG_DIR" -name "*.log")

# **🌿 13.2 Old Syntax**

    LOG_FILES=`find .`

Still works, but not recommended.

# **🧱 CHAPTER 14: Loops & Iteration**

# **🌿 14.1 Why Loops Are Important**

Loops:

- reduce repetition
- automate repeated actions
- dynamically process files

# **🌿 14.2 For Loop Example**

    for LOG_FILE in $LOG_FILES; do
    echo "$LOG_FILE"
    done

# **🌿 14.3 Full Example**

    for LOG_FILE in $LOG_FILES; do
    echo "Processing $LOG_FILE"
    grep "ERROR" "$LOG_FILE"
    done

# **🧱 CHAPTER 15: Nested Loops**

# **🌿 15.1 Loop Inside Another Loop**

    for LOG_FILE in $LOG_FILES; do
    for PATTERN in "${ERROR_PATTERNS[@]}"; do
    grep "$PATTERN" "$LOG_FILE"
    done
    done

# **🌿 15.2 Benefits of Nested Loops**

✅ Handle unlimited files  
✅ Process multiple patterns  
✅ Reduce code duplication

# **🧱 CHAPTER 16: File Operations & Output Redirection**

# **🌿 16.1 Write Output to File**

``` bash
echo "Hello" > report.txt
```

Overwrites file.

# **🌿 16.2 Append Output**

``` bash
echo "New Line" >> report.txt
```

Adds content.

# **🌿 16.3 Redirection Operators**

| **Operator** | **Meaning** |
|--------------|-------------|
| `>`          | Overwrite   |
| `>>`         | Append      |

# **🧱 CHAPTER 17: Conditionals (**`if` **Statements)**

# **🌿 17.1 Why Conditionals Matter**

Scripts become intelligent.

Example:

- alert if errors exceed threshold

# **🌿 17.2 Basic Syntax**

    if [ condition ]; then

commands

    fi

# **🌿 17.3 Comparison Operators**

| **Operator** | **Meaning**  |
|--------------|--------------|
| `-gt`        | Greater than |
| `-lt`        | Less than    |
| `-eq`        | Equal        |
| `-ne`        | Not equal    |

# **🌿 17.4 Example**

    if [ "$ERROR_COUNT" -gt 10 ]; then
    echo "Too many errors"
    fi

# **🧱 CHAPTER 18: Bash Scripting Best Practices**

# **🌿 18.1 Script Organization**

✅ Use shebang  
✅ Variables at top  
✅ Comments  
✅ Functions  
✅ Proper indentation

# **🌿 18.2 Error Handling**

✅ Check file existence  
✅ Validate input  
✅ Handle edge cases

# **🌿 18.3 Security**

✅ Quote variables  
✅ Avoid hardcoded passwords  
✅ Validate input

# **🌿 18.4 Maintainability**

✅ Use meaningful names  
✅ Break code into functions  
✅ Use version control

# **🧱 CHAPTER 19: Real-World Bash Automation Projects**

# **🌿 19.1 Local Development Environment Setup**

Automate:

- software installation
- environment variables
- repositories
- databases

# **🌿 19.2 Log Rotation Automation**

Archive old logs automatically.

Example:

Delete logs older than 30 days

# **🌿 19.3 Backup Automation**

Automate:

- compression
- cloud upload
- notifications

Example:

Backup to AWS S3

# **🌿 19.4 Server Health Monitoring**

Monitor:

- CPU
- RAM
- Disk
- Uptime

Alert if thresholds exceed limits.

# **🌿 19.5 Disk Space Monitoring**

Example:

Alert when disk usage exceeds 90%

# **🧱 CHAPTER 20: Advanced Bash Learning Roadmap**

# **🌿 20.1 Learn Advanced Features**

Study:

- functions
- regex
- case statements
- traps
- signals

# **🌿 20.2 Learn Automation Tools**

- cron jobs
- systemd timers
- CI/CD pipelines

# **🌿 20.3 Learn Configuration Management**

Popular DevOps tools:

- Ansible
- Puppet
- Chef

# **🧱 CHAPTER 21: Useful Commands Every DevOps Engineer Should Know**

# **🌿 21.1 Text Processing**

``` bash
awk
sed
cut
sort
uniq
```

# **🌿 21.2 System Monitoring**

``` bash
ps
top
htop
netstat
ss
```

# **🌿 21.3 Network Operations**

``` bash
curl
wget
ssh
scp
```

# **🌿 21.4 File Operations**

    rsync
    tar
    zip
    find

# **🧱 CHAPTER 22: Online Learning Resources**

# **🌿 22.1 Bash Documentation**

man bash

# **🌿 22.2 ShellCheck**

Shell script linting tool:

[ShellCheck](https://shellcheck.net?utm_source=chatgpt.com)

# **🌿 22.3 Bash Beginner Guide**

[Bash Beginner Guide](https://tldp.org/LDP/Bash-BeginnersGuide/html/?utm_source=chatgpt.com)

# **🌿 22.4 Practice Platform**

    CMD Challenge

# **🧱 CHAPTER 23: Final Notes & Next Steps**

# **🌿 23.1 What You Can Do Now**

You now understand:

✅ Bash fundamentals  
✅ Variables  
✅ Arrays  
✅ Loops  
✅ Conditionals  
✅ Automation basics

# **🌿 23.2 Important Advice**

Start small.

Practice regularly.

Gradually build:

- monitoring scripts
- backup systems
- deployment automation
- DevOps tools

# **🌿 23.3 Your Next Learning Path**

Since you are learning DevOps and Linux automation, your next step should be:

1.  Bash scripting mastery
2.  Linux administration
3.  Git & GitHub
4.  Docker
5.  CI/CD
6.  AWS
7.  Kubernetes
8.  Infrastructure as Code

# **🎯 Final Motivation**

Every Bash script you write:

- saves time
- reduces mistakes
- improves productivity
- builds real DevOps engineering skills

Keep practicing consistently and automate small tasks daily.

# **🧱 CHAPTER: Practical Bash Scripting Labs for DevOps**

This section explains Bash scripting practically using real DevOps-style examples.  
The focus is on understanding:

- how automation works
- how scripts reduce manual work
- how Linux commands are combined together
- how Bash scripting is used in real production environments

# **🌿 SECTION 1: Linux, WSL & Shell Scripting Basics**

## **🐧 What is Linux?**

Linux is an operating system heavily used in:

- DevOps
- Cloud Computing
- Servers
- Cybersecurity
- Networking
- Containers
- Kubernetes

Most modern servers run Linux.

## **🪟 What is WSL?**

## **WSL = Windows Subsystem for Linux**

WSL allows Windows users to run Linux directly inside Windows.

This is extremely useful because:

- most DevOps tools are Linux-based
- Bash scripting works naturally in Linux
- Docker and Kubernetes are Linux-focused

# **🌿 SECTION 2: Why Shell Scripting Matters**

Shell scripting helps automate tasks.

Instead of repeating commands manually every day, we:

1.  write logic once
2.  save it inside a script
3.  run it anytime using one command

## **🖥️ GUI vs CLI**

| **GUI**                     | **CLI**               |
|-----------------------------|-----------------------|
| Uses mouse                  | Uses commands         |
| Slower for repetitive tasks | Faster for automation |
| Manual work                 | Script automation     |
| Difficult to automate       | Easy to automate      |

## **✅ Benefits of Shell Scripting**

### **Automation**

Repeated tasks become automatic.

### **Consistency**

Same commands run the same way every time.

### **Error Handling**

Scripts can detect problems automatically.

### **Documentation**

Scripts act as process documentation.

### **Speed**

Large tasks complete in seconds.

# **🌿 SECTION 3: What is a Shell Script?**

A shell script is simply:

> a text file containing Linux commands

Example:

``` bash
#!/bin/bash
echo "Hello DevOps"
```

# **🌿 SECTION 4: File Extensions & Shebang**

## **📄 Are** `.sh` **Extensions Required?**

No.

Linux does NOT use extensions to decide whether a file can run.

This works perfectly:

myscript

and this also works:

myscript.sh

## **📌 Why Use** `.sh` **Then?**

Because it helps humans.

Benefits:

- easy to identify scripts
- better directory organization
- syntax highlighting in editors

# **🌿 SECTION 5: Understanding Shebang (**`#!`**)**

The first line of a script is called:

# **Shebang or Hashbang**

Example:

``` bash
#!/bin/bash
```

This tells Linux:

> “Use Bash interpreter to run this script.”

## **Common Shebangs**

| **Shebang**   | **Purpose** |
|---------------|-------------|
| `#!/bin/bash` | Bash shell  |
| `#!/bin/sh`   | POSIX shell |

# **🧱 SECTION 6: Bash Scripting Lab 1 — Manual Log Analysis**

This lab simulates real DevOps log monitoring.

# **🌿 Step 1: Create Logs Directory**

``` bash
mkdir logs
```

# **🌿 Step 2: Check Directory**

ls logs/

# **🌿 Step 3: Move into Logs Directory**

cd logs/

# **🌿 Step 4: Read Log File**

cat application.log

### **What this does:**

Displays complete log file contents.

# **🌿 Step 5: Search ERROR Logs**

``` bash
grep "ERROR" application.log
```

### **What this does:**

Finds lines containing the word `ERROR`.

# **🌿 Step 6: Count ERROR Logs**

``` bash
grep -c "ERROR" application.log
```

### **What this does:**

Counts total ERROR entries.

# **🌿 Step 7: Find Recently Updated Logs**

``` bash
find . -name "*.log" -mtime -1
```

## **Understanding This Command**

| **Part**        | **Meaning**                   |
|-----------------|-------------------------------|
| `find`          | search files                  |
| `.`             | current directory             |
| `-name "*.log"` | find `.log` files             |
| `-mtime -1`     | modified within last 24 hours |

# **🧱 SECTION 7: Creating Your First Bash Script**

# **🌿 Step 1: Create Script File**

touch analyse-logs.sh

# **🌿 Step 2: Open File Editor**

Using Nano:

``` bash
nano analyse-logs.sh
```

Using Vim:

``` bash
vim analyse-logs.sh
```

# **🌿 Step 3: Make Script Executable**

``` bash
chmod +x analyse-logs.sh
```

## **What Does** `chmod +x` **Mean?**

| **Part** | **Meaning**            |
|----------|------------------------|
| `chmod`  | change permissions     |
| `+x`     | add execute permission |

# **🌿 Step 4: Run Script**

    ./analyse-logs.sh

# **🧱 SECTION 8: Understanding Bash Script Syntax**

# **🌿 Basic Script Structure**

``` bash
#!/bin/bash
echo "analysing log files"
find . -name "*.log" -mtime -1
```

## **Explanation**

### `#!/bin/bash`

Tells Linux to use Bash interpreter.

### `echo`

Prints text on screen.

### `find`

Searches files.

# **🧱 SECTION 9: Practical Log Analysis Script (Lab 1)**

This script automates manual log analysis.

# **🌿 Complete Beginner Script**

``` bash
#!/bin/bash
echo "analysing log files"
echo "============="
echo -e "\nlist of log files updated in last 24 hours"
find . -name "*.log" -mtime -1
echo -e "\nsearching ERROR logs in application.log file"
grep "ERROR" application.log
echo -e "\nnumber of ERROR logs"
grep -c "ERROR" application.log
```

# **🌿 Understanding** `echo -e`

The `-e` allows special characters.

Example:

``` bash
echo -e "\nHello"
```

## `\n` **Meaning**

Move to new line

Without `-e`, Bash prints `\n` as normal text.

# **🧱 SECTION 10: Using Absolute Paths**

Absolute paths improve reliability.

# **🌿 Useful Commands**

## **Current Directory**

pwd

## **List Files**

``` bash
ls
```

## **Move File**

mv analyse-logs.sh /users/nana

# **🌿 Why Absolute Paths Matter**

Bad example:

``` bash
grep "ERROR" system.log
```

Works only if you're inside correct directory.

Better example:

``` bash
grep "ERROR" /users/nana/logs/system.log
```

Works from anywhere.

# **🧱 SECTION 11: Variables in Bash**

Variables store reusable values.

# **🌿 Why Variables Matter**

Without variables:

- repeated typing
- difficult maintenance

With variables:

- cleaner scripts
- easier updates
- reusable code

# **🌿 Creating Variables**

    LOG_DIR="/users/nana/logs"
    APP_LOG_FILE="application.log"
    SYS_LOG_FILE="system.log"

# **🌿 Using Variables**

``` bash
grep "ERROR" "$LOG_DIR/$APP_LOG_FILE"
```

## **Understanding This**

Instead of writing:

/users/nana/logs/application.log

multiple times, we store it once.

# **🧱 SECTION 12: Arrays in Bash**

Arrays store multiple values together.

# **🌿 Creating Array**

    ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")

# **🌿 Access Array Values**

## **First Value**

\${ERROR_PATTERNS\[0\]}

Result:

ERROR

## **Second Value**

\${ERROR_PATTERNS\[1\]}

Result:

FATAL

# **🌿 Example**

``` bash
grep "${ERROR_PATTERNS[0]}" "$LOG_DIR/$APP_LOG_FILE"
```

# **🧱 SECTION 13: Command Substitution**

Command substitution stores command output into variables.

# **🌿 Example**

    LOG_FILES=$(find "$LOG_DIR" -name "*.log" -mtime -1)

## **What Happens Here?**

Step-by-step:

1.  `find` command runs
2.  matching files are found
3.  output saved into `LOG_FILES`

# **🌿 Print Variable**

``` bash
echo "$LOG_FILES"
```

# **🧱 SECTION 14: Practical Script with Variables & Arrays (Lab 2)**

This version improves the previous script.

# **🌿 Why This Version is Better**

✅ reusable  
✅ cleaner  
✅ easier maintenance  
✅ scalable

# **🌿 Simplified Example**

``` bash
#!/bin/bash
LOG_DIR="/users/nana/logs"
ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")
grep "${ERROR_PATTERNS[0]}" "$LOG_DIR/application.log"
```

# **🧱 SECTION 15: Loops in Bash**

Loops repeat tasks automatically.

# **🌿 Why Loops Matter**

Imagine:

- 100 log files
- 10 error types

Without loops:

- huge repetitive code

With loops:

- automation

# **🌿 Basic Loop Example**

    for FILE in $LOG_FILES; do
    echo "$FILE"
    done

## **Understanding Loop Flow**

1\. Take first file

2\. Run commands

3\. Take second file

4\. Run commands

5\. Continue automatically

# **🧱 SECTION 16: Nested Loops (Lab 4 Concept)**

Nested loop means:

> loop inside another loop

# **🌿 Real DevOps Scenario**

Outer loop:

- goes through log files

Inner loop:

- goes through error patterns

# **🌿 Clean Nested Loop Example**

    for LOG_FILE in $LOG_FILES; do
    for PATTERN in "${ERROR_PATTERNS[@]}"; do
    grep "$PATTERN" "$LOG_FILE"
    done
    done

# **🌿 Understanding** `${ERROR_PATTERNS[@]}`

Means:

> use ALL array values

Equivalent to:

ERROR

FATAL

CRITICAL

# **🧱 SECTION 17: Clean Practical Automation Script**

This is the clean improved version of your labs.

# **🌿 Final Clean Log Analysis Script**

``` bash
#!/bin/bash
echo "analysing log files"
LOG_DIR="/users/nana/logs"
ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")
LOG_FILES=$(find "$LOG_DIR" -name "*.log" -mtime -1)
echo "$LOG_FILES" | while IFS= read -r LOG_FILE; do
echo "Processing: $LOG_FILE"
for PATTERN in "${ERROR_PATTERNS[@]}"; do
echo "Searching $PATTERN logs"
grep "$PATTERN" "$LOG_FILE"
grep -c "$PATTERN" "$LOG_FILE"
done
done
```

# **🧱 SECTION 18: Output Redirection & Report Files**

Instead of printing only on screen, save results into files.

# **🌿 Create Report File**

    REPORT_FILE="/users/nana/logs/log_analysis_report.txt"

# **🌿 Write into File**

``` bash
echo "analysing log files" > "$REPORT_FILE"
```

# **🌿 Difference Between** `>` **and** `>>`

| **Symbol** | **Meaning**    |
|------------|----------------|
| `>`        | overwrite file |
| `>>`       | append content |

# **🧱 SECTION 19: Conditionals (**`if` **Statements)**

Conditionals allow decision-making.

# **🌿 Example**

    if [ "$ERROR_COUNT" -gt 10 ]; then
    echo "Too many errors"
    fi

# **🌿 Understanding This**

| **Part** | **Meaning**      |
|----------|------------------|
| `if`     | start condition  |
| `-gt`    | greater than     |
| `then`   | execute commands |
| `fi`     | end condition    |

# **🧱 SECTION 20: Final Professional DevOps Log Monitoring Script**

This combines:

- variables
- arrays
- loops
- conditionals
- report generation

into one practical DevOps script.

# **🌿 Final Production-Style Script**

``` bash
#!/bin/bash
LOG_DIR="/users/nana/logs"
REPORT_FILE="/users/nana/logs/log_analysis_report.txt"
ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")
echo "analysing log files" > "$REPORT_FILE"
LOG_FILES=$(find "$LOG_DIR" -name "*.log" -mtime -1)
echo "$LOG_FILES" | while IFS= read -r LOG_FILE; do
echo "Processing file: $LOG_FILE" | tee -a "$REPORT_FILE"
for PATTERN in "${ERROR_PATTERNS[@]}"; do
ERROR_COUNT=$(grep -c "$PATTERN" "$LOG_FILE")
echo "$PATTERN count: $ERROR_COUNT" | tee -a "$REPORT_FILE"
if [ "$ERROR_COUNT" -gt 10 ]; then
echo "Action required: too many $PATTERN errors" | tee -a "$REPORT_FILE"
fi
done
done
```

# **🌿 Understanding** `tee -a`

    tee does two things together:

1.  show output on screen
2.  save output into file

# **🌿 Why This Script is Important**

This script demonstrates real DevOps concepts:

✅ log monitoring  
✅ automation  
✅ alert checking  
✅ reporting  
✅ scripting logic  
✅ production-style workflow

# **🎯 Final Learning Outcome**

After completing these labs, you now understand:

✅ Bash scripting basics  
✅ Linux commands  
✅ Variables  
✅ Arrays  
✅ Loops  
✅ Nested loops  
✅ Command substitution  
✅ Output redirection  
✅ Conditionals  
✅ Real DevOps automation workflow

**Numeric Comparison Operators**

| **Bash** | **Meaning**   | **Math** |
|----------|---------------|----------|
| `-eq`    | equal         | `==`     |
| `-ne`    | not equal     | `!=`     |
| `-gt`    | greater than  | `>`      |
| `-lt`    | less than     | `<`      |
| `-ge`    | greater/equal | `>=`     |
| `-le`    | less/equal    | `<=`     |

# **📘 CHAPTER: Conditional Statements in Bash Scripting (Complete Beginner Guide)**

# **🌿 What are Conditional Statements in Bash?**

Conditional statements help Bash make decisions.

They allow scripts to check conditions and decide what action should happen.

### **🧠 Simple Thinking**

IF something is true

THEN do this

ELSE do something else

# **🌿 Real Life Examples of Conditions**

Conditions are used everywhere in daily life.

Examples:

- If internet works → start download
- If battery low → show warning
- If password correct → allow login
- If file exists → open file
- If server down → restart service

This is exactly how Bash conditions work.

# **🌿 Main Types of Conditional Statements**

| **No** | **Conditional Type** | **Purpose**                               |
|--------|----------------------|-------------------------------------------|
| 1      | `if`                 | Check one condition                       |
| 2      | `if else`            | Check condition otherwise do another task |
| 3      | `if elif else`       | Check multiple conditions                 |
| 4      | `nested if`          | if inside another if                      |
| 5      | `case`               | Clean menu/options system                 |

# **🌿 Basic Structure of Conditional Statements**

    if [ condition ]
    then
    command
    fi

# **🌿 Understanding Important Keywords**

| **Keyword** | **Purpose**                    |
|-------------|--------------------------------|
| `if`        | Start condition                |
| `then`      | Run commands if condition true |
| `else`      | Run alternative commands       |
| `elif`      | Check another condition        |
| `fi`        | End if statement               |

# **🌿 1. SIMPLE IF STATEMENT**

# **🧠 What is Simple IF?**

Simple `if` checks one condition.

If condition is true, Bash runs commands.

# **🌿 SIMPLE IF SYNTAX**

    if [ condition ]
    then
    command
    fi

# **🌿 SIMPLE IF EXAMPLE**

``` bash
#!/bin/bash
age=20
if [ $age -ge 18 ]
then
echo "You are adult"
fi
```

# **🌿 Step-by-Step Breakdown**

## **🔹 Step 1 —** `if`

if

Starts condition checking.

## **🔹 Step 2 — Condition**

\[ \$age -ge 18 \]

Meaning:

> Is age greater than or equal to 18?

## **🔹 Step 3 —** `then`

    then

Meaning:

> If condition is true, execute commands.

## **🔹 Step 4 —** `echo`

``` bash
echo "You are adult"
```

Print message.

## **🔹 Step 5 —** `fi`

    fi

Ends the if statement.

# **🌿 EASY MEMORY TIP**

| **Start** | **End** |
|-----------|---------|
| `if`      | `fi`    |

Think:

    if = start
    fi = finish

# **🌿 2. IF ELSE STATEMENT**

# **🧠 What is IF ELSE?**

Used when two different results are possible.

- If condition true → do first task
- Otherwise → do second task

# **🌿 IF ELSE SYNTAX**

    if [ condition ]
    then
    command
    else

another_command

    fi

# **🌿 IF ELSE EXAMPLE**

``` bash
#!/bin/bash
age=15
if [ $age -ge 18 ]
then
echo "You can vote"
else
echo "You are too young"
fi
```

# **🌿 How Bash Thinks**

Is age \>= 18 ?

YES → You can vote

NO → You are too young

# **🌿 3. IF ELIF ELSE STATEMENT**

# **🧠 What is IF ELIF ELSE?**

Used when checking multiple conditions.

# **🌿 IF ELIF ELSE SYNTAX**

    if [ condition ]
    then
    command
    elif [ another_condition ]
    then
    command
    else
    command
    fi

# **🌿 IF ELIF ELSE EXAMPLE**

``` bash
#!/bin/bash
marks=75
if [ $marks -ge 80 ]
then
echo "Grade A"
elif [ $marks -ge 60 ]
then
echo "Grade B"
else
echo "Fail"
fi
```

# **🌿 Flow Explanation**

marks \>= 80 ?

NO

marks \>= 60 ?

YES

Result → Grade B

# **🌿 How ELIF Works**

Bash checks conditions from top to bottom.

As soon as one condition becomes true:

Remaining conditions are skipped.

# **🌿 4. NESTED IF**

# **🧠 What is Nested IF?**

A nested if means:

An if statement inside another if statement.

Used for deeper condition checking.

# **🌿 NESTED IF EXAMPLE**

``` bash
#!/bin/bash
age=20
citizen="yes"
if [ $age -ge 18 ]
then
if [ $citizen == "yes" ]
then
echo "You can vote"
fi
fi
```

# **🌿 How Nested IF Works**

## **Step 1**

Check:

age \>= 18 ?

If TRUE:

## **Step 2**

Check second condition:

citizen == yes ?

If both conditions are true:

Print message

# **🌿 5. CASE STATEMENT**

# **🧠 What is CASE Statement?**

`case` is a cleaner way to check many options.

Very useful for:

- Menus
- User choices
- Automation options
- CLI tools

# **🌿 CASE SYNTAX**

    case variable in

value1)

    command
    ;;

value2)

    command
    ;;

\*)

default_command

    ;;
    esac

# **🌿 CASE EXAMPLE**

``` bash
#!/bin/bash
echo "Choose option:"
echo "1. Start"
echo "2. Stop"
```

read choice

    case $choice in

1\)

``` bash
echo "Starting server"
;;
```

2\)

``` bash
echo "Stopping server"
;;
```

\*)

``` bash
echo "Invalid option"
;;
esac
```

# **🌿 Understanding Important Symbols**

| **Symbol** | **Meaning**        |
|------------|--------------------|
| `;;`       | End current option |
| `*`        | Default option     |
| `esac`     | End case statement |

# **🌿 Comparison Operators**

# **🔢 Number Comparison Operators**

| **Operator** | **Meaning**           |
|--------------|-----------------------|
| `-eq`        | Equal                 |
| `-ne`        | Not equal             |
| `-gt`        | Greater than          |
| `-lt`        | Less than             |
| `-ge`        | Greater than or equal |
| `-le`        | Less than or equal    |

# **🌿 Number Comparison Example**

    if [ $a -gt $b ]
    then
    echo "A is bigger"
    fi

# **🌿 String Comparison Operators**

| **Operator** | **Meaning**         |
|--------------|---------------------|
| `==`         | Equal               |
| `!=`         | Not equal           |
| `-z`         | String is empty     |
| `-n`         | String is not empty |

# **🌿 String Comparison Example**

    name="Ali"
    if [ $name == "Ali" ]
    then
    echo "Welcome Ali"
    fi

# **🌿 File Condition Operators**

| **Condition** | **Meaning**      |
|---------------|------------------|
| `-f`          | File exists      |
| `-d`          | Directory exists |
| `-r`          | File readable    |
| `-w`          | File writable    |
| `-x`          | File executable  |

# **🌿 File Check Example**

    if [ -f test.txt ]
    then
    echo "File exists"
    fi

# **🌿 Real Beginner Example**

``` bash
#!/bin/bash
echo "Enter your age:"
```

read age

    if [ $age -ge 18 ]
    then
    echo "You are adult"
    else
    echo "You are child"
    fi

# **🌿 Real DevOps Example**

``` bash
#!/bin/bash
if [ -f /etc/passwd ]
then
echo "System file exists"
else
echo "File missing"
fi
```

# **🌿 Golden Beginner Rules**

# **✅ Always Use Spaces**

Correct:

    if [ $age -gt 18 ]

Wrong:

    if [$age -gt 18]

# **✅ Always End With** `fi`

Every if statement must end with:

    fi

# **✅ Always Use** `then`

Without `then`, Bash gives syntax error.

# **🌿 Simple Visual Flow**

Condition

\|

----------------

\| \|

TRUE FALSE

\| \|

Run Command Run Else

# **🌿 Common Beginner Mistakes**

| **Mistake**               | **Problem**      |
|---------------------------|------------------|
| Forgetting `fi`           | Syntax error     |
| Missing spaces            | Condition fails  |
| Forgetting `then`         | Script error     |
| Wrong comparison operator | Incorrect result |

# **🌿 How to Think Like Script Writer**

Ask yourself:

## **🔹 One condition only?**

Use:

if

## **🔹 Two possible results?**

Use:

if else

## **🔹 Multiple conditions?**

Use:

if elif else

## **🔹 Many menu options?**

Use:

case

# **🚀 Bash Conditional Statements Practice Lab**

# **🌿 LAB GOAL**

This lab practices:

- `if`
- `if else`
- `if elif else`
- `nested if`
- `case`

All inside one practical Bash project.

# **🌿 Project Name**

Student Information System

The script will:

- Ask student name
- Ask age
- Ask marks
- Check pass/fail
- Check grade
- Check voting eligibility
- Create menu system

# **🌿 STEP 1 — Create File**

``` bash
nano student_lab.sh
```

# **🌿 STEP 2 — Add Shebang**

``` bash
#!/bin/bash
```

# **🌿 STEP 3 — Welcome Message**

``` bash
echo "=================================="
echo " Student Information System "
echo "=================================="
```

# **🌿 STEP 4 — Take User Input**

``` bash
echo "Enter your name:"
```

read name

``` bash
echo "Enter your age:"
```

read age

``` bash
echo "Enter your marks:"
```

read marks

``` bash
echo "Are you citizen? (yes/no)"
```

read citizen

# **🌿 STEP 5 — SIMPLE IF**

``` bash
echo ""
echo "===== SIMPLE IF ====="
if [ $marks -ge 50 ]
then
echo "You passed exam"
fi
```

# **🌿 STEP 6 — IF ELSE**

``` bash
echo ""
echo "===== IF ELSE ====="
if [ $age -ge 18 ]
then
echo "You are adult"
else
echo "You are child"
fi
```

# **🌿 STEP 7 — IF ELIF ELSE**

``` bash
echo ""
echo "===== IF ELIF ELSE ====="
if [ $marks -ge 80 ]
then
echo "Grade A"
elif [ $marks -ge 60 ]
then
echo "Grade B"
elif [ $marks -ge 40 ]
then
echo "Grade C"
else
echo "Fail"
fi
```

# **🌿 STEP 8 — NESTED IF**

``` bash
echo ""
echo "===== NESTED IF ====="
if [ $age -ge 18 ]
then
if [ $citizen == "yes" ]
then
echo "You can vote"
else
echo "You are not citizen"
fi
else
echo "You are under age"
fi
```

# **🌿 STEP 9 — CASE MENU**

``` bash
echo ""
echo "===== CASE MENU ====="
echo "Choose Option"
echo "1. Show Name"
echo "2. Show Age"
echo "3. Show Marks"
echo "4. Exit"
```

read option

    case $option in

1\)

``` bash
echo "Your name is $name"
;;
```

2\)

``` bash
echo "Your age is $age"
;;
```

3\)

``` bash
echo "Your marks are $marks"
;;
```

4\)

``` bash
echo "Goodbye"
;;
```

\*)

``` bash
echo "Invalid option"
;;
esac
```

# **🌿 STEP 10 — Save File**

Inside nano:

CTRL + O

ENTER

CTRL + X

# **🌿 STEP 11 — Give Execute Permission**

``` bash
chmod +x student_lab.sh
```

# **🌿 STEP 12 — Run Script**

    ./student_lab.sh

# **🌿 FULL FINAL SCRIPT**

``` bash
#!/bin/bash
echo "=================================="
echo " Student Information System "
echo "=================================="
echo "Enter your name:"
```

read name

``` bash
echo "Enter your age:"
```

read age

``` bash
echo "Enter your marks:"
```

read marks

``` bash
echo "Are you citizen? (yes/no)"
```

read citizen

``` bash
echo ""
echo "===== SIMPLE IF ====="
if [ $marks -ge 50 ]
then
echo "You passed exam"
fi
echo ""
echo "===== IF ELSE ====="
if [ $age -ge 18 ]
then
echo "You are adult"
else
echo "You are child"
fi
echo ""
echo "===== IF ELIF ELSE ====="
if [ $marks -ge 80 ]
then
echo "Grade A"
elif [ $marks -ge 60 ]
then
echo "Grade B"
elif [ $marks -ge 40 ]
then
echo "Grade C"
else
echo "Fail"
fi
echo ""
echo "===== NESTED IF ====="
if [ $age -ge 18 ]
then
if [ $citizen == "yes" ]
then
echo "You can vote"
else
echo "You are not citizen"
fi
else
echo "You are under age"
fi
echo ""
echo "===== CASE MENU ====="
echo "Choose Option"
echo "1. Show Name"
echo "2. Show Age"
echo "3. Show Marks"
echo "4. Exit"
```

read option

    case $option in

1\)

``` bash
echo "Your name is $name"
;;
```

2\)

``` bash
echo "Your age is $age"
;;
```

3\)

``` bash
echo "Your marks are $marks"
;;
```

4\)

``` bash
echo "Goodbye"
;;
```

\*)

``` bash
echo "Invalid option"
;;
esac
```

# **🌿 What You Learned**

| **Concept**      | **Practiced** |
|------------------|---------------|
| User input       | ✅            |
| `if`             | ✅            |
| `if else`        | ✅            |
| `if elif else`   | ✅            |
| `nested if`      | ✅            |
| `case`           | ✅            |
| Variables        | ✅            |
| `read` command   | ✅            |
| `chmod`          | ✅            |
| Script execution | ✅            |

# **🌿 Real DevOps Uses of Conditions**

Conditional statements are heavily used in:

- CI/CD pipelines
- Server monitoring
- Docker automation
- Kubernetes scripts
- AWS automation
- Backup scripts

# **🌿 Real DevOps Logic Example**

if service_is_down

    then

restart_service

    fi

This is how real automation scripts make decisions.

# **🌿 Practice Challenges**

## **🧪 Challenge 1**

Add password checking.

## **🧪 Challenge 2**

Check if marks are greater than 100.

## **🧪 Challenge 3**

Add another menu option:

5\. Show Full Profile

# **🌿 Quick Memory Cheatsheet**

| **Concept** | **Meaning**             |
|-------------|-------------------------|
| `if`        | Check one condition     |
| `if else`   | Two possible results    |
| `elif`      | Check another condition |
| `case`      | Multiple menu options   |
| `fi`        | End if statement        |
| `esac`      | End case statement      |

# **🌿 Final Notes**

Do not try to memorize everything at once.

Focus on understanding:

1.  What condition should be checked?
2.  What should happen if true?
3.  What should happen if false?

Once these ideas become clear, Bash conditional statements become much easier to write and understand.

# **📘 CHAPTER: Bash Loops (Complete Beginner Guide)**

## **🌿 What is a Loop in Bash Scripting?**

A **loop** is used to repeat the same task again and again automatically.

Instead of writing the same command many times, Bash loops help you write cleaner and shorter scripts.

### **🧠 Simple Example**

Without loop:

``` bash
echo "Hello"
echo "Hello"
echo "Hello"
echo "Hello"
echo "Hello"
```

Using loop:

    for i in 1 2 3 4 5
    do
    echo "Hello"
    done

Both do the same work, but the loop is faster and cleaner.

# **🌿 Real Life Examples of Loops**

Loops are everywhere in real life:

- Fan spinning continuously
- Clock ticking every second
- Washing machine rotating
- Daily backup automation
- Server monitoring scripts

The idea is simple:

> Repeat work automatically.

# **🌿 Types of Loops in Bash**

| **Loop Type** | **Purpose**                         |
|---------------|-------------------------------------|
| `for` loop    | Repeat fixed number of times        |
| `while` loop  | Repeat while condition is true      |
| `until` loop  | Repeat until condition becomes true |
| `select` loop | Create menu systems                 |

# **🌿 Important Loop Structure**

Almost every loop follows this pattern:

loop_start

    do

commands

    done

### **🧠 Meaning**

| **Keyword** | **Purpose**     |
|-------------|-----------------|
| `do`        | Start loop work |
| `done`      | End loop        |

# **🌿 1. FOR LOOP**

## **🧠 What is a FOR Loop?**

A `for` loop is used when you already know how many times something should repeat.

### **📌 Best For**

- Counting numbers
- Repeating fixed tasks
- Processing lists
- Running commands multiple times

# **🌿 FOR LOOP SYNTAX**

    for variable in list
    do
    command
    done

# **🌿 How to Read FOR Loop**

Example:

    for number in 1 2 3 4 5

Read it like this:

> For every number in the list, run commands.

# **🌿 FOR LOOP EXAMPLE 1**

``` bash
#!/bin/bash
for number in 1 2 3 4 5
do
echo "Hello"
done
```

## **🧠 Output**

Hello

Hello

Hello

Hello

Hello

# **🌿 FOR LOOP EXAMPLE 2**

``` bash
#!/bin/bash
for number in 1 2 3 4 5
do
echo $number
done
```

## **🧠 Output**

1

2

3

4

5

# **🌿 HOW FOR LOOP WORKS INTERNALLY**

Bash performs these steps:

1.  Take first value
2.  Run command
3.  Take next value
4.  Run command again
5.  Continue until list finishes

# **🌿 EASY MEMORY TIP**

FOR LOOP = Fixed Repetition

Use `for` loop when repetition count is already known.

# **🌿 2. WHILE LOOP**

## **🧠 What is WHILE Loop?**

A `while` loop runs as long as the condition remains true.

# **🌿 WHILE LOOP SYNTAX**

    while [ condition ]
    do
    command
    done

# **🌿 WHILE LOOP EXAMPLE**

``` bash
#!/bin/bash
count=1
while [ $count -le 5 ]
do
echo $count
count=$((count + 1))
done
```

# **🌿 Step-by-Step Breakdown**

## **🔹 Step 1**

    count=1

Store value `1`.

## **🔹 Step 2**

    while [ $count -le 5 ]

Meaning:

> Continue while count is less than or equal to 5.

## **🔹 Step 3**

``` bash
echo $count
```

Print current value.

## **🔹 Step 4**

    count=$((count + 1))

Increase count by 1.

# **🌿 VERY IMPORTANT RULE**

Without increasing the variable:

    count=$((count + 1))

the loop never stops.

This creates:

Infinite Loop

# **🌿 EASY MEMORY TIP**

WHILE LOOP = Keep Going While Condition Is True

# **🌿 3. UNTIL LOOP**

## **🧠 What is UNTIL Loop?**

    until loop is opposite of while loop.

It keeps running until condition becomes true.

# **🌿 UNTIL LOOP SYNTAX**

    until [ condition ]
    do
    command
    done

# **🌿 UNTIL LOOP EXAMPLE**

``` bash
#!/bin/bash
count=1
until [ $count -gt 5 ]
do
echo $count
count=$((count + 1))
done
```

# **🌿 Understanding the Logic**

    until [ $count -gt 5 ]

Meaning:

> Keep running until count becomes greater than 5.

# **🌿 WHILE vs UNTIL**

| **Loop** | **Runs When**      |
|----------|--------------------|
| `while`  | Condition is TRUE  |
| `until`  | Condition is FALSE |

# **🌿 4. SELECT LOOP**

## **🧠 What is SELECT Loop?**

`select` loop is used to create simple menu systems.

# **🌿 SELECT LOOP SYNTAX**

select option in list

    do

commands

    done

# **🌿 SELECT LOOP EXAMPLE**

``` bash
#!/bin/bash
```

select option in Start Stop Restart Exit

    do
    echo "You selected $option"
    done

# **🌿 OUTPUT**

1\) Start

2\) Stop

3\) Restart

4\) Exit

User selects a number from menu.

# **🌿 LOOP CONTROL STATEMENTS**

Loop control statements change loop behavior.

# **🌿 BREAK STATEMENT**

## **🧠 Purpose**

Stop loop immediately.

# **🌿 BREAK EXAMPLE**

    for num in 1 2 3 4 5
    do
    if [ $num -eq 3 ]
    then

break

    fi
    echo $num
    done

# **🌿 OUTPUT**

1

2

Loop stops when number becomes 3.

# **🌿 CONTINUE STATEMENT**

## **🧠 Purpose**

Skip current loop turn.

# **🌿 CONTINUE EXAMPLE**

    for num in 1 2 3 4 5
    do
    if [ $num -eq 3 ]
    then

continue

    fi
    echo $num
    done

# **🌿 OUTPUT**

1

2

4

5

Number 3 is skipped.

# **🌿 IMPORTANT BEGINNER RULES**

## **✅ Always Use Spaces**

Correct:

    while [ $count -le 5 ]

Wrong:

while\[\$count -le 5\]

## **✅ Never Forget** `done`

Every loop must end with:

    done

## **✅ Update Variables Properly**

Example:

    count=$((count + 1))

Otherwise loop may run forever.

# **🌿 LOOP START AND END MEMORY TABLE**

| **Start** | **End** |
|-----------|---------|
| `if`      | `fi`    |
| `case`    | `esac`  |
| `do`      | `done`  |

# **🌿 Common Beginner Mistakes**

| **Mistake**           | **Problem**        |
|-----------------------|--------------------|
| Forgetting `done`     | Syntax error       |
| Infinite loops        | Script never stops |
| Missing spaces        | Condition errors   |
| Not updating variable | Endless loop       |

# **🌿 How to Choose Correct Loop**

Ask yourself:

## **🔹 Fixed repetition?**

Use:

for loop

## **🔹 Condition-based repetition?**

Use:

    while loop

or

    until loop

# **🌿 Real DevOps Uses of Loops**

Loops are heavily used in DevOps automation.

## **🔄 Examples**

### **Server Monitoring**

    while true

Check servers continuously.

### **Backup Multiple Files**

    for file in *

Backup many files automatically.

### **Restart Services**

    for server in list

Restart services on many servers.

### **CI/CD Automation**

Run build or deployment tasks repeatedly.

# **🚀 Bash Loop Practice Lab**

# **🌿 Lab Goal**

This lab practices:

- `for` loop
- `while` loop
- `until` loop
- `select` loop
- `break`
- `continue`

# **🌿 STEP 1 — Create File**

``` bash
nano loop_lab.sh
```

# **🌿 STEP 2 — Add Shebang**

``` bash
#!/bin/bash
```

# **🌿 STEP 3 — Welcome Message**

``` bash
echo "================================="
echo " Bash Loop Training Lab"
echo "================================="
```

# **🌿 STEP 4 — FOR LOOP**

``` bash
echo ""
echo "===== FOR LOOP ====="
for number in 1 2 3 4 5
do
echo "Number is: $number"
done
```

# **🌿 STEP 5 — WHILE LOOP**

``` bash
echo ""
echo "===== WHILE LOOP ====="
count=1
while [ $count -le 5 ]
do
echo "Count is: $count"
count=$((count + 1))
done
```

# **🌿 STEP 6 — UNTIL LOOP**

``` bash
echo ""
echo "===== UNTIL LOOP ====="
num=1
until [ $num -gt 5 ]
do
echo "Number: $num"
num=$((num + 1))
done
```

# **🌿 STEP 7 — BREAK EXAMPLE**

``` bash
echo ""
echo "===== BREAK EXAMPLE ====="
for value in 1 2 3 4 5
do
if [ $value -eq 3 ]
then
```

break

    fi
    echo "Value: $value"
    done

# **🌿 STEP 8 — CONTINUE EXAMPLE**

``` bash
echo ""
echo "===== CONTINUE EXAMPLE ====="
for item in 1 2 3 4 5
do
if [ $item -eq 3 ]
then
```

continue

    fi
    echo "Item: $item"
    done

# **🌿 STEP 9 — SELECT LOOP**

``` bash
echo ""
echo "===== SELECT LOOP ====="
```

select option in Start Stop Restart Exit

    do
    echo "You selected: $option"
    if [ $option == "Exit" ]
    then

break

    fi
    done

# **🌿 STEP 10 — Save File**

Inside nano:

CTRL + O

ENTER

CTRL + X

# **🌿 STEP 11 — Give Execute Permission**

``` bash
chmod +x loop_lab.sh
```

# **🌿 STEP 12 — Run Script**

    ./loop_lab.sh

# **🌿 FULL FINAL SCRIPT**

``` bash
#!/bin/bash
echo "================================="
echo " Bash Loop Training Lab"
echo "================================="
echo ""
echo "===== FOR LOOP ====="
for number in 1 2 3 4 5
do
echo "Number is: $number"
done
echo ""
echo "===== WHILE LOOP ====="
count=1
while [ $count -le 5 ]
do
echo "Count is: $count"
count=$((count + 1))
done
echo ""
echo "===== UNTIL LOOP ====="
num=1
until [ $num -gt 5 ]
do
echo "Number: $num"
num=$((num + 1))
done
echo ""
echo "===== BREAK EXAMPLE ====="
for value in 1 2 3 4 5
do
if [ $value -eq 3 ]
then
```

break

    fi
    echo "Value: $value"
    done
    echo ""
    echo "===== CONTINUE EXAMPLE ====="
    for item in 1 2 3 4 5
    do
    if [ $item -eq 3 ]
    then

continue

    fi
    echo "Item: $item"
    done
    echo ""
    echo "===== SELECT LOOP ====="

select option in Start Stop Restart Exit

    do
    echo "You selected: $option"
    if [ $option == "Exit" ]
    then

break

    fi
    done

# **🌿 What You Learned**

| **Concept**   | **Practiced** |
|---------------|---------------|
| `for` loop    | ✅            |
| `while` loop  | ✅            |
| `until` loop  | ✅            |
| `select` loop | ✅            |
| `break`       | ✅            |
| `continue`    | ✅            |
| Variables     | ✅            |
| Conditions    | ✅            |

# **🌿 Quick Memory Cheatsheet**

| **Concept**  | **Meaning**                 |
|--------------|-----------------------------|
| `for` loop   | Fixed repetition            |
| `while` loop | Repeat while condition true |
| `until` loop | Repeat until condition true |
| `break`      | Stop loop                   |
| `continue`   | Skip current turn           |

# **🌿 Practice Challenges**

## **🧪 Challenge 1**

Print your name 20 times.

## **🧪 Challenge 2**

Print even numbers only.

## **🧪 Challenge 3**

Create calculator menu using `select`.

## **🧪 Challenge 4**

Ask user how many times to print message.

# **🌿 Final Notes**

Do not try to memorize loops line by line.

Focus on understanding:

1.  What should repeat?
2.  How many times should it repeat?
3.  When should it stop?

Once these three ideas become clear, Bash loops become much easier to write and understand.

# **📘 Comments in Bash Scripting**

Comments are used to write notes, explanations, reminders, or disable code temporarily inside a Bash script.

The shell ignores comments during execution.

# **🌿 Why Comments Are Important**

Comments help you:

- Explain what the script does
- Make code easy to understand
- Remember logic later
- Help other people read your script
- Debug scripts
- Temporarily disable commands

# **🧱 1. Single-Line Comment**

This is the most common comment in Bash.

## **✅ Syntax**

\# comment text

Anything after `#` on that line becomes a comment.

## **✅ Example**

``` bash
#!/bin/bash
# This script prints a welcome message
echo "Welcome to Bash Scripting"
```

## **🧠 Explanation**

\# This script prints a welcome message

- `#` tells Bash:  
  > “Ignore this line”

This line is only for humans.

# **🧱 2. Inline Comment**

You can also write comments after a command on the same line.

## **✅ Syntax**

command \# comment

## **✅ Example**

``` bash
echo "Starting Backup" # Display backup message
```

## **🧠 Explanation**

- `echo "Starting Backup"` → command executes
- `# Display backup message` → ignored by Bash

# **🧱 3. Multiple Single-Line Comments**

You can write many comment lines together.

## **✅ Example**

``` bash
#!/bin/bash
# Author: Charlie
# Purpose: User creation script
# Date: 16-May-2026
echo "Script Started"
```

# **🧱 4. Section Comments**

Used to divide scripts into sections.

Large scripts become cleaner and organized.

## **✅ Example**

``` bash
#!/bin/bash
```

\############################

\# USER INPUT SECTION

\############################

``` bash
echo "Enter your name"
```

read username

\############################

\# OUTPUT SECTION

\############################

``` bash
echo "Welcome $username"
```

# **🧱 5. Multi-Line Comment (Method 1)**

Bash does not have a real official multi-line comment system like some languages.

But developers use this trick.

## **✅ Syntax**

: '

multiple

line

comment

'

## **✅ Example**

``` bash
#!/bin/bash
```

: '

This script is used

for learning Bash scripting.

These lines are ignored.

'

``` bash
echo "Hello"
```

## **🧠 Explanation**

### `:`

Colon (`:`) is a built-in Bash command that does nothing.

It ignores everything inside `' '`.

# **🧱 6. Multi-Line Comment (Method 2)**

Another common trick:

## **✅ Example**

\<\<comment

This is line 1

This is line 2

This is line 3

comment

## **🧠 Explanation**

- `<<comment` starts block
- `comment` ends block
- Everything between is ignored

This is called a **Here Document Trick**.

# **🧱 7. Commenting Out Code (Temporary Disable)**

Developers often comment commands to disable them temporarily.

## **✅ Example**

``` bash
#!/bin/bash
echo "Start Script"
# rm important-file.txt
echo "Script Finished"
```

## **🧠 Explanation**

This prevents dangerous command execution.

Very useful during testing.

# **🧱 8. Shebang Line (Special Comment)**

The first line of most Bash scripts:

``` bash
#!/bin/bash
```

looks like a comment because it starts with `#`, but it is special.

## **🧠 Purpose**

It tells Linux:

> “Run this script using Bash shell”

# **🌿 Real-World Example Script**

``` bash
#!/bin/bash
```

\###################################

\# Simple User Information Script

\###################################

    # Ask username
    echo "Enter your name:"

read username

    # Ask age
    echo "Enter your age:"

read age

: '

The below lines

display user information

'

``` bash
echo "Your name is $username"
echo "Your age is $age"
# End of script
```

# **📘 Best Practices for Comments**

## **✅ Write meaningful comments**

❌ Bad

    # echo name
    echo "Charlie"

✅ Good

    # Display logged-in username
    echo "$USER"

## **✅ Use comments for difficult logic**

    # Check if file exists before deletion
    if [ -f file.txt ]
    then

rm file.txt

    fi

## **✅ Keep scripts organized**

Use section comments in large scripts.

# **🚫 Common Mistakes**

## **❌ Forgetting space after**

Bad:

\#This is hard to read

Good:

\# This is easier to read

## **❌ Using comments too much**

Do not comment obvious things.

Bad:

    # Print hello
    echo "Hello"

# **📌 Summary Table**

| **Type**       | **Syntax**          | **Purpose**       |
|----------------|---------------------|-------------------|
| Single-line    | `# comment`         | Normal comments   |
| Inline         | `command # comment` | Explain command   |
| Section        | `#####`             | Organize script   |
| Multi-line     | `: ' '`             | Large comments    |
| Here-doc trick | `<<tag`             | Block comments    |
| Disabled code  | `# command`         | Temporary disable |

# **🧪 Practice Exercise**

Create a script:

1.  Add shebang
2.  Add author comment
3.  Ask username
4.  Print username
5.  Add section comments
6.  Add one multi-line comment

Example filename:

comments-practice.sh

Run:

``` bash
chmod +x comments-practice.sh
./comments-practice.sh
```

# **📘 Command Substitution in Bash Scripting**

Command substitution means:

> “Run a command first, then store or use its output somewhere else.”

It allows one command’s output to become input/data for another command.

# **🌿 Simple Real-Life Meaning**

Imagine:

    date

Output:

Fri May 16 10:00:00

Now suppose you want to save this output inside a variable.

That is called:

# **✅ Command Substitution**

# **🧱 Why We Use Command Substitution**

We use it to:

- Store command output in variables
- Display command results inside messages
- Automate scripts
- Combine commands together
- Create dynamic scripts

# **🧱 Basic Syntax**

There are TWO ways.

# **✅ Method 1 (Modern Method)**

\$(command)

This is the recommended method.

## **✅ Example**

    current_date=$(date)
    echo $current_date

## **🧠 Step-by-Step Explanation**

### `date`

Runs the date command.

Example output:

Fri May 16 10:00:00 PKT 2026

### `$(date)`

- Runs command inside brackets
- Captures output

### `current_date=$(date)`

Stores command output into variable.

### `echo $current_date`

Displays stored value.

# **📌 Output Example**

Fri May 16 10:00:00 PKT 2026

# **🧱 Method 2 (Old Style)**

Old Bash scripts may use backticks.

## **✅ Syntax**

\`command\`

## **✅ Example**

    current_date=`date`
    echo $current_date

# **⚠️ Why Modern Method is Better**

Prefer:

\$(command)

because it is:

- Easier to read
- Easier to nest
- More modern
- Less confusing

# **❌ Avoid Old Style**

Backticks become messy:

\`command\`

# **🧱 Real Examples**

# **✅ Example 1 — Current User**

``` bash
#!/bin/bash
username=$(whoami)
echo "Logged in user is $username"
```

## **🧠 Explanation**

### `whoami`

Shows current logged-in user.

Example:

charlie

Stored in variable:

    username=$(whoami)

# **📌 Output**

Logged in user is charlie

# **✅ Example 2 — Current Directory**

``` bash
#!/bin/bash
current_dir=$(pwd)
echo "Current directory is $current_dir"
```

## **🧠 Explanation**

### `pwd`

Prints current working directory.

Example:

/home/charlie

# **📌 Output**

Current directory is /home/charlie

# **✅ Example 3 — Count Files**

``` bash
#!/bin/bash
file_count=$(ls | wc -l)
echo "Total files: $file_count"
```

## **🧠 Line-by-Line Explanation**

### `ls`

Lists files.

### `wc -l`

Counts lines.

### `ls | wc -l`

Counts total files/folders.

### `$(ls | wc -l)`

Captures result.

# **📌 Example Output**

Total files: 10

# **🧱 Using Command Substitution Directly Inside echo**

You do not always need variables.

## **✅ Example**

``` bash
echo "Today is $(date)"
```

# **📌 Output**

Today is Fri May 16 10:00:00 PKT 2026

# **🧱 Nested Command Substitution**

You can place commands inside commands.

## **✅ Example**

``` bash
echo "Current folder name: $(basename $(pwd))"
```

## **🧠 Explanation**

### `pwd`

Gets current path.

Example:

/home/charlie/projects

### `basename`

Extracts last folder name.

Result:

projects

# **📌 Output**

Current folder name: projects

# **🧱 Practical DevOps Example**

## **✅ Check Server Uptime**

``` bash
#!/bin/bash
uptime_info=$(uptime)
echo "Server Status:"
echo "$uptime_info"
```

# **📌 Example Output**

Server Status:

10:20:00 up 5 days, 2 users, load average: 0.50

# **🧱 AWS Example**

## **✅ Get EC2 Instance List**

    instances=$(aws ec2 describe-instances)
    echo "$instances"

## **🧠 Explanation**

AWS command output is captured and stored.

Very common in DevOps automation.

# **🧱 Combining with Conditions**

## **✅ Example**

``` bash
#!/bin/bash
user=$(whoami)
if [ "$user" = "root" ]
then
echo "You are root user"
else
echo "Normal user"
fi
```

# **🧱 Combining with Loops**

## **✅ Example**

``` bash
#!/bin/bash
for file in $(ls)
do
echo "$file"
done
```

## **🧠 Explanation**

`$(ls)` provides file list for loop.

# **⚠️ Important Warning**

This method may break with filenames containing spaces.

Better approach:

    for file in *
    do
    echo "$file"
    done

# **🚫 Common Mistakes**

## **❌ Missing** `$`

Wrong:

(date)

Correct:

\$(date)

## **❌ Forgetting Quotes**

Bad:

``` bash
echo $variable
```

Better:

``` bash
echo "$variable"
```

Quotes prevent spacing problems.

# **📘 Difference Between Variable and Command Substitution**

| **Feature**           | **Variable** | **Command Substitution** |
|-----------------------|--------------|--------------------------|
| Stores manual value   | ✅           | ❌                       |
| Stores command output | ❌           | ✅                       |

## **✅ Variable Example**

    name="Charlie"

## **✅ Command Substitution Example**

    current_date=$(date)

# **📌 Summary Table**

| **Syntax**      | **Purpose**                 |
|-----------------|-----------------------------|
| `$(command)`    | Modern command substitution |
| `` `command` `` | Old style                   |
| `$(date)`       | Store current date          |
| `$(whoami)`     | Get current user            |
| `$(pwd)`        | Get current directory       |

# **🧪 Practice Exercises**

## **✅ Exercise 1**

Create script to display:

- Current user
- Current date
- Current directory

using command substitution.

## **✅ Exercise 2**

Store output of:

    uptime

inside variable and display it.

## **✅ Exercise 3**

Count files in current directory using:

``` bash
ls | wc -l
```

and print result.

# **🌿 Chapter: Important Bash Scripting Concepts** 

# **(Beginner Friendly Guide)**

In this chapter, you will learn:

1.  Positional Arguments
2.  Piping
3.  Output Redirection
4.  Functions

Each topic is explained:

- Simple and easy
- Line by line
- With real examples
- Like a beginner learning from zero

# **🧱 SECTION 1 — Positional Arguments in Bash Script**

# **🌿 What Are Positional Arguments?**

Positional arguments are values passed to a Bash script when running it from the terminal.

Think like this:

You create a script called:

myscript.sh

When you run it:

    ./myscript.sh Ali 25 Pakistan

These values become:

| **Argument** | **Meaning**     |
|--------------|-----------------|
| Ali          | First argument  |
| 25           | Second argument |
| Pakistan     | Third argument  |

Bash stores them automatically in special variables.

# **🧱 Positional Argument Variables**

| **Variable** | **Meaning**               |
|--------------|---------------------------|
| `$0`         | Script name               |
| `$1`         | First argument            |
| `$2`         | Second argument           |
| `$3`         | Third argument            |
| `$#`         | Total number of arguments |
| `$@`         | All arguments             |
| `$$`         | Process ID of script      |

# **🌿 Example 1 — Simple Positional Argument Script**

## **Script**

``` bash
#!/bin/bash
echo "Script name is: $0"
echo "First argument is: $1"
echo "Second argument is: $2"
echo "Third argument is: $3"
```

# **🌿 Run Script**

    ./myscript.sh Ali 25 Pakistan

# **🌿 Output**

Script name is: ./myscript.sh

First argument is: Ali

Second argument is: 25

Third argument is: Pakistan

# **🌿 Line-by-Line Explanation**

## **Line 1**

``` bash
#!/bin/bash
```

Tells Linux:  
Run this script using Bash shell.

## **Line 2**

``` bash
echo "Script name is: $0"
```

`$0` stores script name.

Output:

    ./myscript.sh

## **Line 3**

``` bash
echo "First argument is: $1"
```

`$1` stores first value after script name.

## **Line 4**

``` bash
echo "Second argument is: $2"
```

`$2` stores second value.

## **Line 5**

``` bash
echo "Third argument is: $3"
```

`$3` stores third value.

# **🌿 Example 2 — Count Arguments**

## **Script**

``` bash
#!/bin/bash
echo "Total arguments are: $#"
```

## **Run**

    ./myscript.sh one two three four

## **Output**

Total arguments are: 4

# **🌿 Example 3 — Show All Arguments**

## **Script**

``` bash
#!/bin/bash
echo "All arguments are: $@"
```

## **Run**

    ./myscript.sh apple mango banana

## **Output**

All arguments are: apple mango banana

# **🧱 SECTION 2 — Piping in Bash Scripting**

# **🌿 What Is Pipe (**`|`**) ?**

Pipe sends output of one command into another command.

Think like water pipe:

Command 1 → Pipe → Command 2

Output of first command becomes input for second command.

# **🌿 Pipe Symbol**

\|

# **🌿 Basic Syntax**

command1 \| command2

# **🌿 Real-Life Thinking**

Imagine:

``` bash
ls
```

Shows many files.

Now you only want files containing word:

    test

So:

``` bash
ls | grep test
```

# **🌿 Example 1 — Pipe with ls and grep**

## **Command**

``` bash
ls | grep test
```

# **🌿 What Happens?**

## **Step 1**

``` bash
ls
```

Shows files.

Example:

test.txt

abc.txt

mytest.sh

## **Step 2**

Pipe `|`

Sends output to next command.

## **Step 3**

``` bash
grep test
```

Searches for word "test".

# **🌿 Final Output**

test.txt

mytest.sh

# **🌿 Example 2 — Count Files**

## **Command**

``` bash
ls | wc -l
```

# **🌿 Explanation**

| **Command** | **Work**    |
|-------------|-------------|
| `ls`        | Show files  |
| `wc -l`     | Count lines |

# **🌿 Output Example**

15

Means:  
15 files/directories exist.

# **🌿 Example 3 — View Running Processes**

## **Command**

``` bash
ps aux | grep nginx
```

# **🌿 Explanation**

| **Command**  | **Work**               |
|--------------|------------------------|
| `ps aux`     | Show running processes |
| `grep nginx` | Find nginx process     |

# **🧱 SECTION 3 — Output Redirection in Bash Scripting**

# **🌿 What Is Output Redirection?**

Output redirection sends command output into:

- File
- Another location
- Error file

Instead of showing on screen.

# **🌿 Common Redirection Symbols**

| **Symbol** | **Meaning**          |
|------------|----------------------|
| `>`        | Write output to file |
| `>>`       | Append output        |
| `<`        | Input redirection    |
| `2>`       | Error redirection    |

# **🌿 Example 1 — Write Output to File**

## **Command**

``` bash
echo "Hello World" > file.txt
```

# **🌿 What Happens?**

Normally:

``` bash
echo "Hello World"
```

Shows on terminal.

But:

\>

Redirects output into file.

# **🌿 Result**

File created:

file.txt

Inside file:

Hello World

# **🌿 Important Difference**

| **Symbol** | **Meaning**         |
|------------|---------------------|
| `>`        | Replace old content |
| `>>`       | Add new content     |

# **🌿 Example 2 — Append Output**

## **Command**

``` bash
echo "New line" >> file.txt
```

# **🌿 Result**

Old content stays.

New line added.

# **🌿 Example 3 — Save ls Output**

## **Command**

``` bash
ls > files.txt
```

# **🌿 Output**

All file names stored in:

files.txt

# **🌿 Example 4 — Error Redirection**

## **Command**

ls wrongfolder 2\> error.txt

# **🌿 Explanation**

`2>` means:

Send errors into file.

# **🌿 Output**

Terminal shows nothing.

Inside `error.txt`:

ls: cannot access 'wrongfolder': No such file or directory

# **🧱 SECTION 4 — Functions in Bash Scripting**

# **🌿 What Is a Function?**

Function is a reusable block of code.

Instead of writing same code again and again,  
you write it once and call it anytime.

# **🌿 Real-Life Thinking**

Like TV remote button:

Press button → same action runs.

Function works same way.

# **🌿 Basic Syntax**

    function_name() {

commands

    }

OR

    function function_name {

commands

    }

Both are valid.

# **🌿 Example 1 — Simple Function**

## **Script**

``` bash
#!/bin/bash
greeting() {
echo "Hello User"
}
```

greeting

# **🌿 Line-by-Line Explanation**

## **Line 1**

``` bash
#!/bin/bash
```

Run script using Bash.

## **Line 2**

    greeting() {

Creating function named:

greeting

## **Line 3**

``` bash
echo "Hello User"
```

Command inside function.

## **Line 4**

    }

Function ends.

## **Line 5**

greeting

Calling/running function.

# **🌿 Output**

Hello User

# **🌿 Example 2 — Function with Argument**

## **Script**

``` bash
#!/bin/bash
welcome() {
echo "Welcome $1"
}
```

welcome Ali

# **🌿 Output**

Welcome Ali

# **🌿 Explanation**

Inside functions:

- `$1`
- `$2`

also work as positional arguments.

# **🌿 Example 3 — Reuse Function Multiple Times**

## **Script**

``` bash
#!/bin/bash
user_info() {
echo "Name: $1"
echo "Age: $2"
}
```

user_info Ali 25

user_info Ahmed 30

# **🌿 Output**

Name: Ali

Age: 25

Name: Ahmed

Age: 30

# **🌿 Why Functions Are Important?**

Functions help:

- Reuse code
- Make scripts clean
- Reduce repetition
- Make debugging easier
- Organize large scripts

# **🧱 FINAL SUMMARY**

| **Topic**            | **Purpose**                  |
|----------------------|------------------------------|
| Positional Arguments | Receive values from terminal |
| Pipe \`              | \`                           |
| Redirection `>`      | Save output into files       |
| Functions            | Reuse code blocks            |

# **🌿 Small Real DevOps Example Combining Everything**

``` bash
#!/bin/bash
show_user() {
echo "Username: $1"
}
echo "System users:" > users.txt
cat /etc/passwd | wc -l >> users.txt
```

show_user Ali

# **🌿 What This Script Does**

| **Line** | **Purpose**         |
|----------|---------------------|
| Function | Reusable code       |
| `>`      | Create file         |
| `>>`     | Append output       |
| Pipe \`  | \`                  |
| `$1`     | Positional argument |

# **🌿 Practice Tasks for You**

## **Task 1**

Create script:

- Take name and age using positional arguments
- Print them

## **Task 2**

Use:

``` bash
ls | wc -l
```

Understand pipe.

## **Task 3**

Save process list:

``` bash
ps aux > process.txt
```

## **Task 4**

Create function:

- Print welcome message
- Call function 3 times
