**🐧 Linux Fundamentals**

**Youtube Playlist URL: [Linux Zero To Hero](https://www.youtube.com/playlist?list=PLe-5mmZeZbmhZZD5tBIReNOOnygP9yhGF)**

My Linux Notes: Just click

# 🐧 🔰 FOUNDATION LEVEL 

# 📘 Chapter 1: Linux Fundamentals 

## 📑 📌 Chapter Index 

### 🔰 1. Introduction to Operating Systems

- What is an Operating System (OS)?
- Why OS is important
- Types of Operating Systems

### 🖥️ 2. Types of Operating Systems

- Single-user vs Multi-user
- CLI vs GUI OS
- Server vs Desktop OS
- Real-time OS (basic idea)

### ⚔️ 3. Difference Between Linux, Windows, and macOS

- Licensing
- Performance
- Security
- Usage (DevOps perspective)

### 🐧 4. What is Linux?

- History (short)
- Why Linux is popular
- Where Linux is used

### 🧱 5. Linux System Architecture (Basic View)

- Kernel
- Shell
- File System
- Bootloader
- GUI

### 🧠 6. Linux Kernel Deep Basics

- What kernel does
- Types of kernel (Monolithic vs Microkernel idea)

### 💻 7. Shell & Terminal Basics

- What is Shell
- Types of shells (Bash, Zsh, etc.)
- CLI importance in DevOps

### 📁 8. Linux File System Basics

- What is a file system
- Directory structure overview (/ , /home, /etc, /var)

### 🚀 9. Bootloader Basics

- What happens when system starts (intro only)
- GRUB (basic idea)

### 🧩 10. GUI vs CLI

- Difference
- Why DevOps prefers CLI

### 📦 11. Linux Distributions (Distros)

- What is distro
- Popular distros
- Which distro for what

### 🧪 12. Why Linux for DevOps?

- Automation
- Cloud compatibility
- Containers & servers

# 📘 Chapter 2: Linux File System

# 📑 📌 Chapter Index 

## 🔰 1. Linux File System Overview

- What is Linux File System
- Tree structure concept
- “Everything is a file” philosophy

## 🧭 2. Basic Navigation Concepts

- Absolute vs Relative Path
- pwd, cd, ls (intro)

## 📁 3. Linux Directory Structure (Standard Layout)

- Important directories overview
- FHS (File Hierarchy Standard – intro)

## 🗂 4. Detailed Directory Explanation

- /bin, /sbin
- /etc
- /home, /root
- /var
- /usr
- /tmp
- /dev, /proc, /sys
- /boot
- /lib, /opt
- /media, /mnt

## 📄 5. File Types in Linux (VERY IMPORTANT)

- Regular file
- Directory
- Symbolic link
- Devices
- Socket, etc.

## 🔗 6. Hard Link vs Soft Link

- Differences
- Use cases

## 🔐 7. File Permissions & Ownership (DEEP)

- r, w, x
- Numeric permissions
- chmod, chown, chgrp
- Special permissions (SUID, SGID, Sticky)

## 🧠 8. Inode Concept (IMPORTANT)

- What is inode
- Metadata storage

## 💽 9. Disk & Partition Basics (INTRO)

- Disks and partitions
- Mounting concept

## 📊 10. Disk Usage & Space Monitoring

- df, du

## 🛠 11. Linux CRUD Operations (Files & Directories)

- Create, Read, Update, Delete

## 🧪 12. DevOps Use Cases

- Logs
- Config files
- Permissions
- Storage

# 📘 Chapter 3: Linux User & Group Management

# 📑 📌 Chapter Index

## 🔰 1. Introduction to User Management

- Why user management is important
- Multi-user concept in Linux

## 👥 2. Types of Users in Linux

- Root user
- System users
- Regular users

## 🧠 3. User & Group Concepts (IMPORTANT)

- UID, GID
- Primary group vs Secondary group

## ➕ 4. User Management Commands

- Create, delete, modify users
- Check user information

## 👥 5. Group Management

- Create, delete groups
- Add/remove users

## 📂 6. Important System Files

- /etc/passwd
- /etc/shadow
- /etc/group
- /etc/sudoers

## 🔐 7. Sudo & Access Control (VERY IMPORTANT)

- Full sudo
- Limited sudo (DevOps best practice)
- visudo usage

## 🏠 8. Home Directory & Shell Management

- Home directory
- Shell types
- Changing shell

## 🔒 9. User Security Management

- Lock/unlock users
- Disable login

## 🔑 10. Password Management & Policies (NEW – IMPORTANT)

- passwd command
- Password aging (chage)

## 🛠 11. DevOps Use Cases

- Real-world examples

## 📊 12. Quick Cheat Sheet

# 📘 Chapter 4: Linux Text Editors

## 📑 📌 Chapter Index

### 🔰 1. Introduction to Linux Text Editors

- What are text editors?
- Why text editors are important in Linux
- Role in servers & DevOps
- CLI vs GUI editors

### 🧠 2. Types of Linux Text Editors

- CLI (Terminal-based editors)
- GUI (Graphical editors)
- When to use each type

### ✏️ 3. Nano Editor (Beginner Friendly)

- What is Nano
- Opening and saving files
- Basic editing workflow
- Important shortcuts
- Use cases (quick edits, configs)

### 🔥 4. Vim Editor (Advanced & DevOps Standard)

- What is Vim
- Vim modes (Normal, Insert, Visual, Command)
- Navigation commands
- Editing commands
- Search & replace
- File operations (:w, :q, etc.)
- Visual mode usage
- Power commands (DevOps usage)

### 🧪 5. Practical Vim Workflows (Real DevOps)

- Writing scripts
- Editing configs
- YAML / Dockerfile editing
- Common real-world scenarios

### 🖥️ 6. Gedit (GUI Editor)

- What is Gedit
- Basic usage
- When GUI editors are useful
- Limitations in DevOps

### ⚔️ 7. Comparison: Nano vs Vim vs Gedit

- Features comparison
- Performance
- DevOps relevance

### 🧠 8. Essential Commands to Memorize

- Minimum Nano commands
- Minimum Vim survival commands

### 🧪 9. Practice Exercises

- Nano practice
- Vim scripting practice
- Search & replace tasks
- GUI editing task

### 🚀 10. DevOps Use Cases

- Editing Nginx/Apache configs
- Writing Dockerfiles
- Kubernetes YAML editing
- CI/CD pipeline updates
- Working over SSH (EC2 servers)

# 📘 Chapter 5: Linux Package Management

# 📑 📌 Chapter Index

### 🔰 1. Introduction to Package Management

- What is package management
- Why it is important

### 📦 2. What is a Package?

- Package components
- Software distribution concept

### 🧭 3. Package Managers Overview

- APT, DNF/YUM, Pacman
- Snap & Flatpak (universal)

### 🌐 4. Repositories (VERY IMPORTANT)

- What are repositories
- Types (official, third-party)
- How package managers use repos

### 📘 5. APT (Debian/Ubuntu)

- Basic commands
- Install, remove, update
- Search & info
- Local packages (dpkg)

### 📕 6. YUM / DNF (RHEL-based)

- Install, remove, update
- Difference between yum and dnf

### 📦 7. Pacman (Arch Linux)

- Install, update, remove

### 🌍 8. Universal Package Systems

- Snap
- Flatpak

### 🔗 9. Dependency Management (IMPORTANT)

- What are dependencies
- Auto dependency handling

### 📂 10. Package Cache & Cleanup

- Cache location
- Cleaning unused packages

### 🔢 11. Package Versioning

- Install specific versions
- Upgrade vs downgrade

### 🔐 12. Security & Package Verification

- Trusted sources
- GPG keys (basic idea)

### 🛠 13. DevOps Use Cases

- Installing tools
- Automation scripts
- CI/CD usage

### 📊 14. Quick Cheat Sheet

# 📘 Chapter 6: Linux Process Management

# 📑 📌 Chapter Index 

## 🔰 1. Introduction to Processes

- What is a process
- Program vs process
- PID and PPID

## 🌳 2. Process Hierarchy (Parent-Child Model)

- systemd as PID 1
- Parent-child relationships
- Process tree structure

## 🔄 3. Process Lifecycle & States

- Running, Sleeping, Stopped, Zombie
- State transitions

## 🧟 4. Zombie & Orphan Processes

- What is zombie process
- What is orphan process
- How system handles them

## 📊 5. Viewing Processes

- ps commands
- process filters
- real-time monitoring (top, htop)

## 🔍 6. Finding Processes

- grep with ps
- pgrep usage

## ▶ 7. Running Processes

- foreground execution
- background execution
- nohup usage

## 🧱 8. Foreground vs Background Jobs

- job control
- &, jobs, fg, bg

## 🔪 9. Killing Processes

- kill, killall, pkill
- force vs graceful termination

## 📡 10. Linux Signals

- SIGTERM, SIGKILL, SIGSTOP, SIGCONT
- signal handling concept

## ⚖️ 11. Process Priority (Nice & Renice)

- nice value concept
- CPU scheduling priority

## 📊 12. Resource Monitoring

- CPU usage
- memory usage
- system load

## 🧠 13. Advanced Process Tools

- strace
- lsof
- watch
- systemctl

## 🖥️ 14. top & htop Deep Monitoring

- system monitoring overview
- sorting & filtering
- interactive controls

## 📁 15. /proc File System (IMPORTANT ADDITION)

- process information filesystem
- CPU, memory data

## 🚀 16. DevOps Use Cases

- troubleshooting servers
- killing high CPU processes
- monitoring production systems

## 🎯 17. Quick Cheat Sheet

# 📘 Chapter 7: Linux Services (systemd)

# 📑 📌 Chapter Index 

## 🔰 1. Introduction to Services

- What is a service
- Why services are important in Linux
- Background processes (daemons)

## ⚙️ 2. What is systemd?

- Definition of systemd
- Role in Linux boot process
- Why systemd replaced SysVinit

## 🚀 3. Linux Boot Flow with systemd

- BIOS/UEFI → Kernel → systemd
- systemd as PID 1
- Target-based boot system

## 🧩 4. systemd Units (Core Concept)

- What is a unit
- Types of units (service, socket, target, etc.)

## 📦 5. systemd Service Files

- Location of service files
- Structure of .service file
- \[Unit\], \[Service\], \[Install\] sections

## 🔧 6. systemctl Commands (Core Operations)

- Start / stop / restart services
- Enable / disable at boot
- Check service status

## 📊 7. Service Monitoring & Logs

- journalctl usage
- real-time logs
- filtering logs

## 🔁 8. Service Restart Policies

- Restart options (always, on-failure, no)
- Production best practices

## ⏱️ 9. systemd Timers (Cron Alternative)

- What is a timer
- Difference between cron and systemd timer

## 📂 10. Service Locations & File System

- /etc/systemd/system
- /lib/systemd/system

## 🧪 11. Hands-on Lab (Create Custom Service)

- Create service file
- Reload daemon
- Start service
- Check logs

## 🚀 12. DevOps Use Cases

- Web servers (Nginx, Apache)
- CI/CD tools (Jenkins)
- Containers (Docker)
- Auto-restart apps

## ⚠️ 13. Common Mistakes

- Missing daemon reload
- Wrong ExecStart path
- Missing restart policy

## 🧠 14. Quick Summary (Cheat Sheet)

# 📘 Chapter 8: Linux Networking 

# 📑 📌 Chapter Index

## 🌐 1. Introduction to Networking in Linux

- Why networking is important
- Role in DevOps & cloud

## 🧠 2. Basic Networking Concepts

- IP address, MAC address
- Ports & protocols (TCP/UDP)
- DNS basics

## 🖧 3. Network Interfaces in Linux

- What is interface (eth0, ens33)
- ip command basics
- hostname & system identity

## 📡 4. Connectivity Testing Tools

- ping
- curl
- wget

## 🔍 5. DNS & Name Resolution

- nslookup
- dig
- /etc/hosts

## 🔌 6. Ports & Socket Monitoring

- ss command
- netstat (legacy)
- open ports concept

## 🌍 7. Routing & Network Configuration

- ip route
- manual IP assignment
- gateway concept

## 🔐 8. SSH & Remote Access

- SSH basics
- SCP & RSYNC
- secure remote management

## 🔥 9. Firewall & Security

- UFW (Ubuntu)
- Firewalld (RHEL)
- port blocking & allowing

## 📁 10. Important Network Files

- /etc/hosts
- /etc/resolv.conf
- /etc/hostname

## 🧪 11. Process & Network Debugging Lab

- CPU stress test
- process tracking
- logs redirection

## 🛠 12. Advanced Networking Tools

- traceroute
- nmap
- ss deep usage

## 🚀 13. DevOps Networking Use Cases

- API testing
- port checking
- DNS debugging
- service exposure

## ⚠️ 14. Safety Rules (VERY IMPORTANT)

- dangerous commands
- production safety

## 🎯 15. Quick Cheat Sheet

# 📘 Chapter 9: Linux Storage & Disk Management (DevOps Essential)

# 📑 📌 Chapter Index

## 💽 1. Introduction to Linux Storage

- What is storage in Linux
- Types of storage devices
- Block vs file storage concept

## 🧱 2. Linux Disk Architecture

- Disks (/dev/sda)
- Partitions (/dev/sda1)
- File system layers

## 📦 3. Partitioning Concepts

- Primary, extended, logical partitions
- GPT vs MBR (basic idea)

## 🛠 4. Disk Management Tools

- lsblk
- fdisk
- parted

## 📁 5. File Systems in Linux

- ext4, xfs, btrfs
- mkfs command

## 🔗 6. Mounting & Unmounting

- mount concept
- /mnt and /media
- fstab (auto mount)

## 📊 7. Disk Usage Monitoring

- df command
- du command

## 🧠 8. Inodes & File Metadata

- What is inode
- inode usage issues

## 💾 9. Logical Volume Management (LVM)

- What is LVM
- Physical Volume (PV)
- Volume Group (VG)
- Logical Volume (LV)

## 🔄 10. Swap Memory

- What is swap
- When Linux uses swap
- swapon / swapoff

## 📉 11. Disk Performance Monitoring

- iostat
- vmstat

## 🧪 12. Real DevOps Storage Scenarios

- disk full troubleshooting
- log file cleanup
- server expansion

## ⚠️ 13. Common Storage Issues

- disk full errors
- inode exhaustion
- mount failures

## 🎯 14. Cheat Sheet (Must Memorize Commands)

# 📘 Chapter 10: Linux System Boot Process (BIOS → GRUB → Kernel → systemd)

# 📑 📌 Chapter Index

## ⚡ 1. Introduction to Linux Boot Process

- What is boot process
- Why it is important in DevOps

## 🖥️ 2. BIOS / UEFI Stage

- What is BIOS
- What is UEFI
- Hardware initialization

## 📀 3. Bootloader Stage (GRUB)

- What is GRUB
- GRUB menu
- Kernel selection

## 🧠 4. Kernel Loading Stage

- What is Linux kernel
- Kernel initialization
- Hardware detection

## ⚙️ 5. init / systemd Stage

- What is PID 1
- systemd role
- service startup process

## 🚀 6. Runlevels vs Targets (systemd)

- Old runlevels
- Modern targets
- multi-user vs graphical

## 📊 7. Boot Process Flow Diagram (Concept)

- Complete boot chain explanation

## 🔍 8. Boot Logs & Troubleshooting

- journalctl
- dmesg
- boot errors

## 🧪 9. System Recovery Mode

- rescue mode
- emergency mode
- GRUB recovery

## ⚠️ 10. Common Boot Issues

- kernel panic
- missing GRUB
- failed services

## 🛠 11. DevOps Use Cases

- server boot debugging
- cloud VM recovery
- system repair

## 🎯 12. Cheat Sheet (Must Know Commands)

# 📘 Chapter 11: Linux System Performance Monitoring (CPU, RAM, Disk, Load Average)

# 📑 📌 Chapter Index

## ⚡ 1. Introduction to Performance Monitoring

- Why monitoring is important
- Role in DevOps & production systems

## 🧠 2. System Performance Metrics Overview

- CPU usage
- Memory usage
- Disk usage
- Load average

## 🖥️ 3. CPU Monitoring

- top / htop
- mpstat
- CPU load interpretation

## 🧠 4. Memory (RAM) Monitoring

- free command
- buffers/cache concept
- swap usage

## 💽 5. Disk Usage Monitoring

- df command
- du command
- inode usage

## 📊 6. Load Average Concept (VERY IMPORTANT)

- 1min / 5min / 15min load
- CPU cores relation

## 🔥 7. Real-Time System Monitoring Tools

- top
- htop
- watch

## 📡 8. Process-Level Resource Usage

- ps
- pid monitoring
- resource-heavy processes

## ⚙️ 9. Advanced Performance Tools

- vmstat
- iostat
- sar

## 🚨 10. Performance Troubleshooting

- CPU spike issues
- memory leak detection
- disk full issues

## 🧪 11. DevOps Real Scenarios

- production monitoring
- server optimization
- incident debugging

## 🎯 12. Cheat Sheet (Must Know Commands)

# 📘 Chapter 12: Linux Logging System (journalctl, /var/log, syslog, Debugging)

# 📑 📌 Chapter Index

## 📜 1. Introduction to Logging

- What are logs
- Why logs are important in Linux & DevOps

## 📁 2. Linux Log Storage Locations

- /var/log directory
- common log files

## ⚙️ 3. syslog (Traditional Logging)

- What is syslog
- rsyslog service

## 📊 4. systemd Journal (journalctl)

- What is journald
- binary logs
- advantages over syslog

## 🔍 5. Viewing Logs (Commands)

- journalctl usage
- tail, less, cat

## 📡 6. Filtering & Searching Logs

- by service
- by time
- by severity

## ⚠️ 7. Log Levels (Severity)

- error, warning, info, debug

## 🔄 8. Log Rotation (logrotate)

- why rotation is needed
- configuration basics

## 🧪 9. Real DevOps Debugging Scenarios

- application crash
- service failure
- login issues

## 🚀 10. Centralized Logging (Concept)

- log aggregation basics (ELK, etc.)

## ⚠️ 11. Common Mistakes

- ignoring logs
- disk full due to logs

## 🎯 12. Cheat Sheet (Must Know Commands)

# 📘 Chapter 13: Linux Automation (Cron Jobs & Task Scheduling)

# 📑 📌 Chapter Index

## ⚡ 1. Introduction to Linux Automation

- What is automation
- Why automation is critical in DevOps

## 🧠 2. What is Cron?

- Definition
- Cron daemon concept

## 🚀 3. Why Cron is Important (DevOps Use Cases)

- Real production automation examples

## ⏱️ 4. Cron Job Syntax (VERY IMPORTANT)

- Time format breakdown
- Field explanation

## 🧩 5. Cron Scheduling Examples

- Daily, hourly, weekly jobs
- Advanced scheduling

## 🛠 6. Managing Cron Jobs

- crontab commands
- edit, list, delete

## 📂 7. System Cron vs User Cron (IMPORTANT)

- /etc/crontab
- cron directories

## 🧾 8. Special Symbols in Cron

- \*, /, -, ,
- advanced usage

## 📜 9. Cron Environment & Variables (IMPORTANT ADDITION)

- PATH issues
- shell limitations

## 📊 10. Logging & Debugging Cron Jobs

- log files
- output redirection

## 💾 11. Real DevOps Automation Example

- backup script
- scheduling workflow

## ⚠️ 12. Common Mistakes

- path issues
- permissions
- environment problems

## 🚀 13. DevOps Best Practices

- logging
- scripting
- testing

## 🧠 14. Cron Limitations

- environment limits
- debugging issues

## 🔄 15. Modern Alternatives (VERY IMPORTANT)

- systemd timers
- cloud schedulers
- Kubernetes CronJobs

## 🎯 16. Cheat Sheet (Must Memorize)

# 📘 Chapter 14: Linux Pipes & Redirects (Data Flow & Output Control)

# 📑 📌 Chapter Index

## 🔄 1. Introduction to Pipes & Redirects

- What they are
- Why they matter in Linux & DevOps

## 📤 2. Standard Streams (VERY IMPORTANT)

- stdin, stdout, stderr
- stream numbers

## ✍️ 3. Basic Commands (echo, cat)

- generating and viewing output

## 🔀 4. Output Redirection

- , \>\> , 1\>

## ❌ 5. Error Redirection

- 2\> , error handling

## 🔁 6. Combine Output & Error

- 2\>&1 concept

## 📥 7. Input Redirection

- \< (IMPORTANT ADDITION)

## 🔗 8. Pipes (\|)

- data flow between commands

## 🔧 9. Common Tools with Pipes

- grep, wc, sort, uniq

## ⚡ 10. Advanced Redirection Techniques

- /dev/null
- silent execution

## 🧪 11. Useful Commands (tee, xargs)

- saving + passing data

## 🚀 12. Real DevOps Use Cases

- logs, debugging, automation

## ⚠️ 13. Common Mistakes

- overwriting files
- mixing outputs

## 🎯 14. Cheat Sheet (Must Memorize)

# 📘 Chapter 15: Linux File System, Commands & Compression (DevOps Level)

# 📑 📌 Chapter Index

## 📁 1. Linux File Operations (Advanced)

- navigation + file handling
- powerful flags

## 🔍 2. File Searching & Filtering (VERY IMPORTANT)

- find, locate, grep

## 📊 3. Disk Usage & File Size Management

- du, df, ls -lh

## 🔄 4. File Transfer & Sync (DevOps Critical)

- cp, rsync, scp

## ⚙️ 5. Process & File Interaction

- ps + pipes
- lsof (important addition)

## 🔐 6. File Permissions (Quick DevOps Recap)

- chmod, chown best practices

## 🗜️ 7. Compression & Archiving (DEEP)

- gzip, tar, bzip2
- real-world usage

## 📦 8. Backup & Restore Strategies (IMPORTANT ADDITION)

- tar + rsync workflows

## 🧪 9. DevOps Real Use Cases

- logs, deployments, artifacts

## ⚠️ 10. Common Mistakes

- rm, permissions, compression issues

## 🎯 11. Cheat Sheet

# 📘 Chapter 16: Linux Troubleshooting, Access Control & File System (DevOps Playbook)

# 📑 📌 Chapter Index

## 🧠 1. Troubleshooting Mindset (DevOps Thinking)

- how to approach problems

## 🔍 2. Layer-Based Troubleshooting Model (VERY IMPORTANT)

- system → process → network → app

## ⚙️ 3. System Health Checks (CPU, RAM, Load)

- performance diagnosis

## 💾 4. Disk & File System Issues

- disk full, inode issues, corruption

## 🌐 5. Network Troubleshooting (Deep)

- connectivity, DNS, ports

## 📜 6. Logs & Debugging (MOST IMPORTANT)

- journalctl + /var/log

## ⚙️ 7. Service Troubleshooting (systemd)

- failed services, restart issues

## 🔑 8. Permissions & Access Control Issues

- common permission failures

## 🔄 9. Process & Resource Issues

- CPU, memory leaks

## 🧪 10. Application-Level Debugging

- scripts, APIs, runtime issues

## 🐘 11. Database Troubleshooting

- DB connectivity & logs

## 📦 12. Package & Dependency Issues

- broken installs

## 🔁 13. Recovery & Emergency Commands

- reboot, fsck, remount

## 🧰 14. Advanced Troubleshooting Tools

- strace, lsof, tcpdump

## 🧪 15. Real DevOps Scenarios (IMPORTANT)

- production debugging flow

## ⚠️ 16. Common Mistakes

## 🎯 17. Troubleshooting Checklist (Golden Rules)

# 📘 Chapter 17: Bash Scripting (CRITICAL 🚨 DevOps Automation)

# 📑 📌 Chapter Index 

## 🧠 1. What is Bash Scripting?

- definition
- why DevOps depends on it

## ⚙️ 2. Creating & Running Scripts

- shebang
- execution methods

## 🔤 3. Variables (Core Concept)

- local/global
- environment variables

## 📥 4. User Input & Read

- interactive scripts

## 🔀 5. Conditional Statements (if/else)

- decision making

## 🔁 6. Loops (for, while, until)

- automation repetition

## 🧩 7. Functions (Reusable Logic)

- modular scripting

## 🎯 8. Script Arguments (\$1, \$2…)

- dynamic input

## 🔢 9. Exit Codes (\$?)

- success/failure handling

## 📂 10. File & Directory Handling

- automation tasks

## 📜 11. Text Processing (grep, awk, sed)

- log parsing (VERY IMPORTANT)

## 🔐 12. Permissions in Scripts

- execution control

## 🧪 13. Debugging Bash Scripts

- troubleshooting scripts

## 🧰 14. Best Practices (DevOps Level)

## 🚀 15. Real DevOps Use Cases

## 🧠 16. Common Mistakes

## 🎯 17. Final Cheat Sheet

# 📘 Chapter 18: Security & SSH (VERY IMPORTANT 🔐 DevOps Level)

# 📑 📌 Chapter Index 

## 🧠 1. Linux Security Basics

- why security matters
- attack surface concept

## 🔐 2. What is SSH?

- secure remote access
- how it works

## 🔑 3. SSH Key Authentication (MOST IMPORTANT)

- public/private key
- passwordless login

## 🚫 4. Disable Password Login (HARDENING)

- prevent brute force attacks

## 👤 5. Secure EC2 / Server Access

- best practices
- real DevOps setup

## 🔥 6. Firewall Management

- UFW / firewalld
- allow/deny rules

## 👑 7. Sudo Security Policies

- least privilege principle

## 🔐 8. File & Permission Security

- sensitive file protection

## 🧪 9. SSH Configuration Hardening

- advanced security settings

## 🛡️ 10. Fail2Ban & Brute Force Protection

## 🔍 11. Security Monitoring & Logs

## 🚀 12. DevOps Security Best Practices

## ⚠️ 13. Common Security Mistakes

## 🎯 14. Final Security Checklist

# 📘 Chapter 19: DevOps Troubleshooting Mastery 🚨 (Production Playbook)

# 📑 📌 Chapter Index 

## 🧠 1. DevOps Troubleshooting Mindset

# how real engineers think during incidents

## 🔄 2. Standard Debugging Flow (Golden Framework)

# step-by-step universal method

## 🔥 3. CPU 100% Debugging Flow

## 🧠 4. Memory Leak Detection

## 💾 5. Disk Full Incident Handling

## ⚙️ 6. Broken Service Recovery

## 📜 7. Log-Driven Debugging (MOST IMPORTANT)

## 🌐 8. Network & API Failure Debugging

## 🔁 9. Process & Resource Correlation

## 🧪 10. Real Incident Scenarios (Step-by-Step)

## ⚠️ 11. Common Mistakes in Production

## 🎯 12. Final Incident Checklist

# 📘 Chapter 20: systemd vs Docker vs Kubernetes

# 📑 📌 Chapter Index

## 🧠 1. Big Picture Overview

- systemd vs Docker vs Kubernetes relationship
- Linux → systemd → Docker → Kubernetes stack

## 🏗️ 2. Layered Architecture Model

- OS layer (Linux)
- process layer (systemd)
- container layer (Docker)
- orchestration layer (Kubernetes)

## ⚙️ 3. systemd (Process Management Layer)

- purpose of systemd
- service management
- logs (journalctl)
- systemctl basics
- use cases & limitations

## 📦 4. Docker (Containerization Layer)

- what Docker solves
- container concept
- images vs containers
- portability & isolation
- use cases & limitations

## ☸️ 5. Kubernetes (Orchestration Layer)

- cluster management concept
- pods, services, deployments (intro)
- scaling and self-healing
- production use cases
- complexity overview

## ⚔️ 6. systemd vs Docker vs Kubernetes Comparison

- feature comparison table
- scope, scaling, complexity, usage

## 🧪 7. Real DevOps Evolution Path

- systemd stage (single server)
- Docker stage (containers)
- Kubernetes stage (clusters)

## 🛣️ 8. Learning Roadmap

- step-by-step progression
- what to learn first, next, and advanced

## 🧱 9. Real Production Architecture View

- user → LB → Kubernetes → Docker → Linux
- how all tools work together

## 🧠 10. Conceptual Analogies

- systemd = engine starter
- Docker = shipping container
- Kubernetes = logistics manager

## ⚠️ 11. Common Mistakes

- wrong tool usage
- skipping Docker/systemd basics
- jumping to Kubernetes too early

## 🚀 12. DevOps Industry Reality

- what is used in real jobs
- systemd + Docker + Kubernetes usage patterns

## 🎯 13. Final Guidance (Career Path)

- recommended learning order
- practical DevOps roadmap

# 📘 Chapter 21: Linux Command Practical Guide (Beginner → Real Practice)

# 📑 📌 Chapter Index

## 🐧 1. Introduction to Linux Command Mastery

- Importance of Linux commands in DevOps
- Real-world usage in servers & cloud

## 📁 2. File & Directory Management (Core Basics)

- Navigation commands (ls, cd, pwd)
- File operations (touch, cat, cp, mv, rm)
- Directory operations (mkdir, rmdir)
- File search (find, locate)

## 🔍 3. Text Processing & Filtering Commands

- grep (searching text)
- awk (column processing)
- sed (text replacement)
- sort, uniq, wc
- head, tail, cut, paste
- tee, diff, xargs, watch

## ⚙️ 4. System Monitoring & Process Management

- ps, top, htop
- kill, pkill, killall
- jobs, fg, bg, nohup
- cron & scheduling basics
- system performance tools

## 🌐 5. Networking Commands (DevOps Critical)

- ip, ifconfig, hostname
- ping, curl, wget
- ssh, scp, rsync
- netstat, ss, nc
- traceroute, tcpdump
- firewall tools (ufw, iptables)

## 💾 6. Disk & Storage Management

- df, du
- lsblk, blkid
- mount, umount
- fdisk, parted
- mkfs, fsck
- swap management

## 🧠 7. System Information & Performance Tools

- uname, lscpu, dmidecode
- vmstat, mpstat, sar, iostat
- uptime, free
- system load monitoring

## 🔐 8. Users & Permissions Commands

- useradd, usermod, userdel
- groupadd, groupdel
- chmod, chown, chgrp
- sudo usage
- ssh-keygen, ssh-copy-id
- ACL commands (setfacl, getfacl)

## 🧩 9. System Control & Service Management

- systemctl (start/stop/restart/enable)
- service (legacy tools)
- systemctl status & logs
- reboot, shutdown
- daemon reload
- cron & at jobs

## 📜 10. Logging & Debugging Commands

- journalctl (systemd logs)
- /var/log system logs
- auth, syslog, nginx logs
- dmesg kernel logs
- tail -f real-time logs

## 🧪 11. Background Jobs & Process Control

- sleep, jobs
- fg / bg
- nohup, disown
- process control basics

## 🗜️ 12. File Compression & Archiving

- gzip / gunzip
- tar (cvf, xvf, czvf)
- zip / unzip
- bzip2 compression
- archive extraction workflows

## ⚠️ 13. System Safety & Best Practices

- dangerous commands (rm -rf /)
- permission safety rules
- process killing safety
- production safe practices

## 🚀 14. DevOps Real-World Usage Section

- logs debugging workflow
- CPU/memory troubleshooting
- service recovery flow
- networking debugging flow
- file permission fixes
- deployment-related commands

## 🧠 15. Advanced Command Concepts

- pipes (\|) and chaining
- redirects (\> \>\> 2\> 2\>&1)
- xargs usage
- watch command
- alias & environment variables

## 🧪 16. Practical Labs Section

- file operations practice
- process killing practice
- networking debugging lab
- disk usage troubleshooting
- log analysis exercises

## 🎯 17. Quick Revision Cheat Sheet

- most used Linux commands
- DevOps daily commands
- monitoring shortcuts
- file management essentials

## 🧠 18. Final DevOps Master Summary

- Linux command importance
- automation usage
- server management foundation
- production troubleshooting mindset

## 

# **📘 Chapter 1: Linux Fundamentals**

# **🔰 1. What is an Operating System (OS)?**

**An Operating System (OS) is system software that acts as a bridge between:  
👉 User ↔ Hardware**

### **📌 Simple Definition:**

> **OS manages hardware resources and provides services to applications.**

### **🎯 Main Responsibilities:**

- **Process management (running programs)**
- **Memory management (RAM usage)**
- **File system management**
- **Device management (keyboard, disk, network)**

### **💡 Example OS:**

- **Linux**
- **Windows**
- **macOS**

# **🖥️ 2. Types of Operating Systems**

## **1. Single-user OS**

- **One user at a time  
  > 👉 Example: Old Windows**

## **2. Multi-user OS**

- **Multiple users simultaneously  
  > 👉 Example: Linux (very important for servers)**

## **3. CLI-based OS**

- **Controlled using commands  
  > 👉 Example: Linux server**

## **4. GUI-based OS**

- **Graphical interface  
  > 👉 Example: Windows, macOS**

## **5. Server OS**

- **Optimized for performance & networking  
  > 👉 Example: Linux, Windows Server**

## **6. Real-Time OS (RTOS)**

- **Used in embedded systems  
  > 👉 Example: Robotics, medical devices**

# **⚔️ 3. Difference: Linux vs Windows vs macOS**

| **Feature**       | **Linux**        | **Windows**  | **macOS**     |
|-------------------|------------------|--------------|---------------|
| **License**       | **Open-source**  | **Paid**     | **Paid**      |
| **Security**      | **High**         | **Medium**   | **High**      |
| **Performance**   | **Fast**         | **Moderate** | **Optimized** |
| **Customization** | **Full control** | **Limited**  | **Limited**   |
| **DevOps Usage**  | `⭐⭐⭐⭐⭐`     | `⭐⭐`       | `⭐⭐⭐`      |

### **🔥 DevOps Insight:**

**👉 Linux dominates servers, cloud, and containers.**

# **🐧 4. What is Linux?**

**Linux is an open-source operating system kernel created by Linus Torvalds.**

### **📌 Important:**

**👉 Linux ≠ Full OS  
👉 Linux = Kernel only**

### **💡 When combined with tools → becomes a Linux Distribution**

## **🔑 Key Features:**

- **Free & open-source**
- **Secure & stable**
- **Multi-user support**
- **Highly customizable**

## **🌍 Where Linux is Used:**

- **Web servers**
- **Cloud platforms (AWS, Azure, GCP)**
- **Docker & Kubernetes**
- **Networking devices**
- **Cybersecurity**

# **🧱 5. Linux System Architecture**

**Linux is made of multiple layers:**

**User → Shell → Kernel → Hardware**

## **🔹 1. Kernel (CORE of Linux)**

### **📌 Definition:**

**The kernel is the heart of the OS.**

### **🎯 Responsibilities:**

- **CPU management**
- **Memory management**
- **Device control**
- **Process scheduling**

### **🧠 Types (basic idea):**

- **Monolithic kernel (Linux)**
- **Microkernel (minimal design)**

## **🔹 2. Shell**

### **📌 Definition:**

**Shell is an interface between user and kernel.**

**👉 It takes commands and sends them to kernel.**

### **🧪 Types:**

- **Bash (most common)**
- **Zsh**
- **Sh**

## **🔹 3. File System**

### **📌 Definition:**

**Structure used to store and organize files.**

### **📁 Important Directories:**

- `/` **→ root**
- `/home` **→ user files**
- `/etc` **→ config files**
- `/var` **→ logs & data**
- `/bin` **→ system commands**

## **🔹 4. Bootloader**

### **📌 Definition:**

**Program that loads OS into memory during startup.**

### **💡 Example:**

- **GRUB (Grand Unified Bootloader)**

## **🔹 5. GUI (Optional)**

### **📌 Definition:**

**Graphical interface for user interaction.**

### **💡 Examples:**

- **GNOME**
- **KDE**

**👉 Servers usually DO NOT use GUI (saves resources)**

# **💻 6. Shell & CLI (DevOps Important)**

### **📌 CLI = Command Line Interface**

### **🔥 Why CLI is Important:**

- **Faster than GUI**
- **Scriptable (automation)**
- **Used in:**
  - **Servers**
  - **Cloud (AWS EC2)**
  - **Docker containers**

# **📁 7. Linux File System (Basic View)**

**Linux uses a hierarchical structure:**

**/**

**├── home**

**├── etc**

**├── var**

**├── bin**

**👉 Everything in Linux is treated as a file (even devices)**

# **🚀 8. Boot Process (Basic Intro)**

**When system starts:**

**BIOS/UEFI → Bootloader → Kernel → System starts**

**(You will study this deeply in Chapter 8)**

# **🧩 9. GUI vs CLI**

| **Feature**    | **GUI**  | **CLI**            |
|----------------|----------|--------------------|
| **Ease**       | **Easy** | **Hard initially** |
| **Speed**      | **Slow** | **Fast**           |
| **Automation** | **No**   | **Yes**            |
| **DevOps Use** | **❌**   | **✅**             |

# **📦 10. Linux Distributions (Distros)**

### **📌 Definition:**

**Linux + tools + package manager = Distribution**

## **🔹 Popular Distros:**

### **🟢 Beginner Friendly:**

- **Ubuntu**
- **Linux Mint**

### **🟡 Server / DevOps:**

- **Ubuntu Server**
- **Debian**
- **Rocky Linux**

### **🔴 Security:**

- **Kali Linux**

# **🧪 11. Why Linux for DevOps?**

### **🚀 Reasons:**

- **Most servers run Linux**
- **Works perfectly with:**
  - **Docker**
  - **Kubernetes**
  - **CI/CD pipelines**
- **Easy automation via scripts**
- **Lightweight & stable**

# **📘 Chapter 2: Linux File System**

# **🔰 1. Linux File System Overview**

Linux uses a **hierarchical (tree-like) structure**:

/

├── home

├── etc

├── var

├── usr

├── bin

└── boot

### **📌 Key Concepts:**

- Starts from **root** `/`
- No drives like Windows (C:, D:)
- Everything is treated as a file:
  - Files
  - Devices
  - Processes

👉 This design makes Linux:

- Stable
- Secure
- Scalable

# **🧭 2. Basic Navigation Concepts**

## **📍 Absolute vs Relative Path**

| **Type** | **Example**              | **Meaning**            |
|----------|--------------------------|------------------------|
| Absolute | `/home/charlie/file.txt` | Full path from root    |
| Relative | `./file.txt`             | From current directory |

## **🔹 Basic Commands (Intro)**

pwd \# show current directory

ls \# list files

cd \# change directory

👉 These connect theory → real usage

# **📁 3. Linux Directory Structure (FHS Intro)**

Linux follows a standard called:  
👉 **File Hierarchy Standard (FHS)**

This ensures:

- Same structure across distributions
- Easy management for DevOps engineers

# **🗂 4. Detailed Directory Structure**

## **⚙️ System Binaries**

### **📁 /bin**

- Essential commands for all users  
  > Examples:

ls, cp, mv, cat

### **📁 /sbin**

- System/admin commands  
  > Examples:

shutdown, mount, fsck

## **🚀 Boot & Kernel**

### **📁 /boot**

- Kernel files
- Bootloader (GRUB)

## **⚙️ Configuration**

### **📁 /etc**

- All system configuration files

Important:

- `/etc/passwd`
- `/etc/shadow`
- `/etc/hosts`
- `/etc/fstab`

👉 Think: **Editable Text Config**

## **👤 User Data**

### **📁 /home**

- User directories  
  > Example:

/home/charlie

### **📁 /root**

- Root (admin) home

## **📚 Libraries**

### **📁 /lib, /lib64**

- Shared libraries (like DLLs)

## **📦 Software**

### **📁 /usr**

- Installed applications  
  > Subdirs:

/usr/bin

/usr/lib

### **📁 /opt**

- Third-party apps

## **🔄 Variable Data**

### **📁 /var**

- Changing data  
  > Examples:

/var/log

/var/cache

## **🧊 Temporary**

### **📁 /tmp**

- Temporary files
- Auto cleaned

## **🧠 Virtual Systems**

### **📁 /proc**

- Process info  
  > Example:

/proc/cpuinfo

### **📁 /sys**

- Kernel + hardware info

## **💽 Devices**

### **📁 /dev**

Examples:

/dev/sda

/dev/null

## **📀 Mount Points**

### **📁 /media → auto mount**

### **📁 /mnt → manual mount**

# **📄 5. File Types in Linux (VERY IMPORTANT)**

| **Type**         | **Symbol** | **Meaning**   |
|------------------|------------|---------------|
| Regular file     | `-`        | Normal file   |
| Directory        | `d`        | Folder        |
| Symbolic link    | `l`        | Shortcut      |
| Block device     | `b`        | Disk          |
| Character device | `c`        | Keyboard      |
| Socket           | `s`        | Communication |

👉 Check using:

``` bash
ls -l
```

# **🔗 6. Hard Link vs Soft Link**

## **🔹 Hard Link**

- Same inode
- Cannot cross filesystem
- Acts like original file

## **🔹 Soft Link (Symbolic)**

- Pointer to file
- Can break if original deleted

### **📌 Commands:**

    ln file.txt hardlink.txt
    ln -s file.txt softlink.txt

# **🔐 7. File Permissions & Ownership (DEEP)**

## **🔤 Permissions**

| **Symbol** | **Meaning** |
|------------|-------------|
| r          | read        |
| w          | write       |
| x          | execute     |

## **📄 Example:**

-rwxr-xr--

Breakdown:

- Owner → rwx
- Group → r-x
- Others → r--

## **🔢 Numeric System**

| **Permission** | **Value** |
|----------------|-----------|
| r              | 4         |
| w              | 2         |
| x              | 1         |

Examples:

- 755 → rwxr-xr-x
- 644 → rw-r--r--

## **⚙️ Commands**

``` bash
chmod 755 file
chmod u+x file
chown user file
chown user:group file
```

## `⭐ Special Permissions`

| **Type** | **Value** |
|----------|-----------|
| SUID     | 4         |
| SGID     | 2         |
| Sticky   | 1         |

Example:

``` bash
chmod 1777 /tmp
```

# **🧠 8. Inode Concept**

### **📌 What is inode?**

Each file has an **inode number** storing:

- Size
- Permissions
- Owner
- Timestamps

👉 It does NOT store filename

Check:

``` bash
ls -i
```

# **💽 9. Disk & Partition Basics**

## **📌 Disk Example:**

/dev/sda

## **📌 Partitions:**

/dev/sda1

/dev/sda2

## **📌 Mount Concept**

Mount = attach disk to filesystem

Example:

``` bash
mount /dev/sda1 /mnt
```

# **📊 10. Disk Usage & Space**

``` bash
df -h # disk space
du -sh # folder size
```

👉 Important for:

- Server monitoring
- Storage issues

# **🛠 11. Linux CRUD Operations**

## **🟩 Create**

touch file.txt

``` bash
mkdir folder
```

## **🟦 Read**

cat file.txt

less file.txt

## **🟨 Update**

``` bash
echo "data" >> file.txt
nano file.txt
```

## **🟥 Delete**

rm file.txt

``` bash
rm -r folder
```

⚠️ Dangerous:

``` bash
rm -rf /
```

# **🧪 12. DevOps Use Cases**

| **Task**    | **Example**             |
|-------------|-------------------------|
| Logs        | `/var/log`              |
| Config      | `/etc/nginx/nginx.conf` |
| Permissions | `chmod 600 secret`      |
| Disk check  | `df -h`                 |

# **📘 Chapter 3: Linux User Management**

# **🔰 1. Introduction to User Management**

# Linux is a **multi-user operating system**, meaning: 👉 Multiple users can access the system at the same time.

### **📌 Why it matters:**

# Security 🔒

# Access control 👥

# Resource management ⚙️

# 👉 Critical for:

# Servers

# Cloud systems

# DevOps environments

# 

# **👥 2. Types of Users**

| ****Type****      | ****Description****                 |
|-------------------|-------------------------------------|
| **Root**          | **Full system control**             |
| **System Users**  | **Used by services (nginx, mysql)** |
| **Regular Users** | **Human users**                     |

# 

## **🔐 Root vs Normal User**

# **Root user** → unrestricted access

# **Normal user** → limited access

# 👉 Use `sudo` for admin tasks instead of logging in as root.

# 

# **🧠 3. User & Group Concepts (VERY IMPORTANT)**

## **📌 UID (User ID)**

# Unique number for each user

# Root UID = 0

## **📌 GID (Group ID)**

# Unique ID for groups

# 

## **👥 Group Types**

### **🔹 Primary Group**

# Default group of user

### **🔹 Secondary Group**

# Additional groups

# 👉 Example:

# usermod -aG devops john

# 

# **➕ 4. User Management Commands**

# 

## **🟩 Create User**

# sudo adduser john

# \# OR

# sudo useradd -m john

# sudo passwd john

# 

## **❌ Delete User**

# sudo userdel -r john

# 

## **🛠 Modify User**

# sudo usermod -aG devops john

# sudo usermod -l newname oldname

# sudo usermod -d /new/home john

# 

## **🔍 Check User Info**

# id john

# groups john

# whoami

# 

# **👥 5. Group Management**

# 

## **➕ Create Group**

# sudo groupadd devops

# 

## **➕ Add User to Group**

# sudo usermod -aG devops john

# 

## **❌ Remove User from Group**

# sudo gpasswd -d john devops

# 

## **❌ Delete Group**

# sudo groupdel devops

# 

# **📂 6. Important System Files**

| ****File****     | ****Purpose****         |
|------------------|-------------------------|
| **/etc/passwd**  | **User info**           |
| **/etc/shadow**  | **Encrypted passwords** |
| **/etc/group**   | **Group info**          |
| **/etc/sudoers** | **Sudo permissions**    |

# 

# **🔐 7. Sudo & Access Control (CRITICAL)**

# 

## **📌 What is Sudo?**

# Allows a normal user to run commands as root.

# 

## **✅ Full Sudo Access**

# sudo usermod -aG sudo john

# 

## **🔒 Safe Method (Recommended)**

# sudo visudo

# Add:

# john ALL=(ALL:ALL) ALL

# 

## **🔐 Limited Sudo (Best Practice)**

# john ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx

# 👉 Multiple commands:

# john ALL=(ALL) NOPASSWD: /usr/bin/apt update, /bin/systemctl restart nginx

# 

## **🔍 Check Sudo Access**

# sudo -l -U john

# 

## **🔍 Find Command Path**

# which systemctl

# 

## **🚫 Remove Sudo**

# sudo deluser john sudo

# 

# **🏠 8. Home Directory & Shell**

# 

## **📁 Home Directory**

# echo \$HOME

# 

## **🔄 Change Home Directory**

# sudo usermod -d /home/new john

# 

## **💻 Shells**

| ****Shell**** | ****Path****     |
|---------------|------------------|
| **Bash**      | **/bin/bash**    |
| **Sh**        | **/bin/sh**      |
| **Zsh**       | **/usr/bin/zsh** |

# 

## **🔄 Change Shell**

# chsh -s /bin/bash john

# 

## **🔍 Check Shell**

# echo \$SHELL

# 

# **🔒 9. User Security Management**

# 

## **🚫 Lock User**

# sudo usermod -L john

# 

## **🔓 Unlock User**

# sudo usermod -U john

# 

## **❌ Disable Login**

# sudo usermod -s /usr/sbin/nologin john

# 

# **🔑 10. Password Management & Policies (IMPORTANT)**

# 

## **🔐 Change Password**

# passwd john

# 

## **⏳ Password Aging**

# chage -l john \# view policy

# chage -M 90 john \# expire in 90 days

# 👉 Useful in:

# Enterprise systems

# Security compliance

# 

# **🛠 11. DevOps Use Cases**

| ****Task****             | ****Example****                       |
|--------------------------|---------------------------------------|
| **Create Jenkins user**  | **`adduser jenkins`**                 |
| **Docker access**        | **`usermod -aG docker user`**         |
| **Restrict deploy user** | **Limited sudo**                      |
| **Web access**           | **`chown -R user:www-data /var/www`** |
| **SSH-only login**       | **Disable password**                  |
| **SFTP-only**            | **nologin shell**                     |

# 

# **📊 12. Quick Cheat Sheet (Must Memorize)**

# 

## **👤 Users**

# useradd user

# passwd user

# userdel -r user

# id user

# 

## **👥 Groups**

# groupadd group

# usermod -aG group user

# groups user

# 

## **🔐 Permissions**

# usermod -aG sudo user

# usermod -L user

# 

# 

# **📘 Chapter 4: Linux Text Editors**

# **🐧 1. Introduction to Linux Text Editors**

## **📌 What are Text Editors?**

Text editors are tools used to:

- Create files
- Edit configuration files
- Write scripts (Bash, YAML, Docker, etc.)

👉 In Linux, editors are **essential**, especially for:

- Servers (no GUI)
- DevOps workflows
- Remote systems (SSH)

## **🧠 Types of Editors**

| **Type**             | **Example** | **Usage**       |
|----------------------|-------------|-----------------|
| CLI (Terminal-based) | Nano, Vim   | Servers, DevOps |
| GUI (Graphical)      | Gedit       | Desktop systems |

# **✏️ 2. Nano Editor (Beginner Friendly)**

## **📌 What is Nano?**

Nano is a **simple and easy terminal editor** with no modes.

👉 Best for:

- Beginners
- Quick edits
- Simple config changes

## **🚀 Open File**

``` bash
nano file.txt
```

## **🎮 Most Important Shortcuts**

| **Shortcut** | **Action** |
|--------------|------------|
| `Ctrl + O`   | Save file  |
| `Ctrl + X`   | Exit       |
| `Ctrl + K`   | Cut line   |
| `Ctrl + U`   | Paste      |
| `Ctrl + W`   | Search     |
| `Ctrl + \`   | Replace    |
| `Ctrl + _`   | Go to line |
| `Ctrl + G`   | Help       |

## **🧪 Example**

``` bash
nano hello.txt
```

Write:

Hello Linux

This is my first file

Save:

- `Ctrl + O` → Enter
- `Ctrl + X`

## **💡 Nano Pro Tips**

- No learning curve
- Perfect for AWS EC2 quick fixes
- Not ideal for heavy DevOps work

# **🔥 3. Vim Editor (Advanced & Most Important)**

## **📌 What is Vim?**

Vim (Vi Improved) is a **powerful, fast, terminal-based editor**.

👉 Used in:

- DevOps (Docker, Kubernetes YAML)
- System configs
- Remote servers (SSH)

## **⚙️ Vim Modes (VERY IMPORTANT)**

| **Mode** | **Purpose** | **Enter**       | **Exit** |
|----------|-------------|-----------------|----------|
| Normal   | Navigation  | Default / `Esc` | —        |
| Insert   | Typing      | `i`, `a`, `o`   | `Esc`    |
| Visual   | Selection   | `v`, `V`        | `Esc`    |
| Command  | Save/quit   | `:`             | Enter    |

## **🚀 Open File**

``` bash
vim file.txt
```

## **🎮 Core Vim Workflow (Must Know)**

1.  Press `i` → enter insert mode
2.  Type content
3.  Press `Esc`
4.  Type `:wq` → save & exit

## **🔵 Normal Mode (Navigation)**

| **Action**    | **Key** |
|---------------|---------|
| Left          | `h`     |
| Down          | `j`     |
| Up            | `k`     |
| Right         | `l`     |
| Next word     | `w`     |
| Previous word | `b`     |
| Line start    | `0`     |
| Line end      | `$`     |
| Top of file   | `gg`    |
| Bottom        | `G`     |

## **✏️ Editing Commands**

| **Action**   | **Command** |
|--------------|-------------|
| Delete line  | `dd`        |
| Delete word  | `dw`        |
| Copy line    | `yy`        |
| Copy 3 lines | `3yy`       |
| Paste        | `p`         |
| Undo         | `u`         |
| Redo         | `Ctrl + r`  |

## **🔍 Search & Replace**

Search:

/nginx

Next / Previous:

n / N

Replace all:

:%s/old/new/g

## **📑 Visual Mode (Selection)**

| **Mode**  | **Key**    |
|-----------|------------|
| Character | `v`        |
| Line      | `V`        |
| Block     | `Ctrl + v` |

## **🟣 Command Mode**

| **Command** | **Meaning**       |
|-------------|-------------------|
| `:w`        | Save              |
| `:q`        | Quit              |
| `:wq`       | Save & exit       |
| `:q!`       | Force quit        |
| `:set nu`   | Show line numbers |
| `:50`       | Go to line 50     |

## **⚡ Power Commands (DevOps Useful)**

ggdG \# clear entire file

:set nu \# show line numbers

## **🧪 Vim Practice (Real DevOps)**

``` bash
vim test.sh
```

Write:

``` bash
#!/bin/bash
echo "Hello, Vim World!"
```

Then:

Esc → :wq

``` bash
chmod +x test.sh
./test.sh
```

## **💡 Vim Pro Tips**

- Used by **90% of DevOps engineers**
- Works in SSH, EC2, Docker containers
- No mouse required
- Extremely fast once mastered

# **🖥️ 4. Gedit (GUI Editor)**

## **📌 What is Gedit?**

Gedit is a **graphical text editor** used in desktop Linux (GNOME).

👉 Best for:

- Beginners
- Frontend development (HTML, CSS, JS)
- GUI environments

## **🚀 Open File**

gedit file.txt

## **🎮 Common Shortcuts**

| **Shortcut** | **Action** |
|--------------|------------|
| `Ctrl + S`   | Save       |
| `Ctrl + O`   | Open       |
| `Ctrl + F`   | Find       |
| `Ctrl + H`   | Replace    |
| `Ctrl + Z`   | Undo       |

## **🧪 Example**

gedit index.html

Write:

\<h1\>Hello Charlie Cafe\</h1\>

## **💡 Gedit Tips**

- Easy to use
- Not available on servers
- Not used in DevOps environments

# **⚔️ 5. Nano vs Vim vs Gedit**

| **Feature** | **Nano** | **Vim**      | **Gedit** |
|-------------|----------|--------------|-----------|
| Difficulty  | Easy     | Hard         | Easy      |
| Speed       | Medium   | Very Fast 🔥 | Medium    |
| Server Use  | Yes      | Yes (Best)   | No        |
| GUI         | No       | No           | Yes       |
| DevOps Use  | Low      | Very High 🔥 | Low       |

# **🧠 Memory Tricks**

- **Nano** → “CTRL for everything”
- **Vim** → “ESC first, then command”
- **Vim power** → `dd + yy + p + /search`

# **🎯 Minimum Vim Commands (Must Master)**

If you only learn these, you can survive any server:

i → insert

Esc → normal mode

:wq → save & exit

:q! → force quit

dd → delete line

yy → copy line

p → paste

/word → search

# **🧪 Final Practice (Must Do)**

### **🟢 Task 1 (Nano)**

``` bash
nano project.txt
```

Write:

DevOps Practice File

Linux is powerful

### **🔥 Task 2 (Vim Script)**

``` bash
vim script.sh
```

Write:

``` bash
#!/bin/bash
echo "Deploying Charlie Cafe"
```

Run:

``` bash
chmod +x script.sh
./script.sh
```

### **🔍 Task 3 (Vim Replace)**

``` bash
vim config.txt
```

Inside Vim:

/dev

:%s/dev/prod/g

:wq

### **🖥️ Task 4 (Gedit)**

gedit index.html

Write:

\<h1\>Charlie Cafe App\</h1\>

# **🚀 DevOps Relevance**

You will use text editors in:

- Editing **Nginx configs**
- Writing **Dockerfiles**
- Managing **Kubernetes YAML**
- Updating **CI/CD pipelines**
- Working inside **AWS EC2 (SSH)**

# **🎯 Final Summary**

This chapter covers:

✅ Nano (quick editing)  
✅ Vim (powerful DevOps editor)  
✅ Gedit (GUI editing)  
✅ Real workflows & commands  
✅ Practice for real-world usage

# **📘 Chapter 5: Linux Package Management**

# **🔰 1. Introduction to Package Management**

### **📌 What is Package Management?**

# Package management is used to:

# Install software

# Update software

# Remove software

# 👉 Instead of downloading manually, Linux uses **package managers**.

# 

# **📦 2. What is a Package?**

# A **package** is a compressed file containing:

# Software binaries

# Configuration files

# Dependencies info

### **📌 Formats:**

# `.deb` → Debian/Ubuntu

# `.rpm` → RHEL/CentOS

# 

# **🧭 3. Package Managers Overview**

| ****Distro****    | ****Tool****      | ****Format**** |
|-------------------|-------------------|----------------|
| **Ubuntu/Debian** | **apt, dpkg**     | **.deb**       |
| **RHEL/CentOS**   | **yum, dnf, rpm** | **.rpm**       |
| **Arch**          | **pacman**        | **.pkg**       |
| **Universal**     | **snap, flatpak** | **—**          |

# 

# **🌐 4. Repositories (VERY IMPORTANT)**

### **📌 What is a Repository?**

# A **repository (repo)** is a server that stores packages.

# 👉 Package manager downloads software from repos.

# 

## **🔹 Types:**

# Official repos (safe)

# Third-party repos (custom software)

# 

## **📂 Example (APT):**

# /etc/apt/sources.list

# 

## **🔄 Update Repo List:**

# sudo apt update

# 👉 This does NOT install software—it refreshes package list.

# 

# **📘 5. APT (Debian/Ubuntu)**

# 

## **🔄 Update & Upgrade**

# sudo apt update \# refresh list

# sudo apt upgrade \# upgrade installed packages

# 

## **📥 Install / Remove**

# sudo apt install nginx

# sudo apt remove nginx

# sudo apt purge nginx \# remove + config

# 

## **🔍 Search & Info**

# apt search nginx

# apt show nginx

# 

## **🧹 Cleanup**

# sudo apt autoremove

# sudo apt clean

# 

## **📥 Install Local Package**

# sudo dpkg -i file.deb

# sudo apt -f install \# fix dependencies

# 

# **📕 6. YUM / DNF (RHEL-based)**

# 

## **📌 Difference:**

# `yum` → older

# `dnf` → modern (faster & better)

# 

## **📥 Commands**

# sudo dnf install nginx

# sudo dnf remove nginx

# sudo dnf upgrade

# 

## **🔍 Search**

# dnf search nginx

# 

# **📦 7. Pacman (Arch Linux)**

# sudo pacman -Syu \# update system

# sudo pacman -S package \# install

# sudo pacman -R package \# remove

# 

# **🌍 8. Universal Packages**

# 

## **📦 Snap**

# sudo snap install code --classic

# snap list

# 

## **📦 Flatpak**

# flatpak install flathub com.spotify.Client

# 

## **📌 Difference:**

# Snap → Canonical (Ubuntu)

# Flatpak → Cross-distro

# 

# **🔗 9. Dependency Management (VERY IMPORTANT)**

### **📌 What are Dependencies?**

# Dependencies are **required libraries/software** needed by a package.

# 👉 Example:

# Nginx needs system libraries to run

# 

## **🔥 Key Point:**

# APT/DNF automatically install dependencies

# dpkg/rpm alone do NOT handle dependencies well

# 

# **📂 10. Package Cache & Cleanup**

### **📌 Cache Location:**

# `/var/cache/apt/`

# 

## **🧹 Clean Cache**

# sudo apt clean

# sudo apt autoremove

# 👉 Important for:

# Saving disk space

# Server maintenance

# 

# **🔢 11. Package Versioning**

# 

## **📌 Install Specific Version**

# sudo apt install nginx=1.18.0

# 

## **📌 Check Versions**

# apt list --all-versions nginx

# 

## **📌 Upgrade vs Dist-upgrade**

# sudo apt upgrade

# sudo apt full-upgrade

# 

# **🔐 12. Security & Verification**

### **📌 Why Important?**

# Prevent malicious software

# 

## **🔑 GPG Keys (Basic Idea)**

# Used to verify packages are trusted.

# 👉 Without verification → security risk

# 

# **🛠 13. DevOps Use Cases**

| ****Task****          | ****Command****             |
|-----------------------|-----------------------------|
| **Install Docker**    | **`apt install docker.io`** |
| **Install Git**       | **`dnf install git`**       |
| **Install Terraform** | **`dpkg -i terraform.deb`** |
| **Update server**     | **`apt upgrade`**           |
| **Cleanup**           | **`apt autoremove`**        |

# 

## **🚀 Real DevOps Scenario**

# sudo apt update && sudo apt install -y nginx

# 👉 Used in:

# CI/CD pipelines

# Automation scripts

# 

# **📊 14. Quick Cheat Sheet**

# 

## **📘 APT**

# apt update

# apt upgrade

# apt install package

# apt remove package

# apt autoremove

# 

## **📕 DNF**

# dnf install package

# dnf remove package

# dnf upgrade

# 

## **📦 Pacman**

# pacman -Syu

# pacman -S package

# pacman -R package

# 

# **🎯 FINAL SUMMARY**

# To master Package Management:

# ✔ Understand repositories ✔ Use apt/dnf efficiently ✔ Know dependency handling ✔ Clean cache regularly ✔ Install correct versions ✔ Automate installations

# 

# 

# **📘 Chapter 6: Linux Process Management**

# **🔰 1. What is a Process?**

# A **process** is a running instance of a program.

### **📌 Contains:**

# PID → Process ID

# PPID → Parent Process ID

### **💡 Example:**

# ./script.sh

# 👉 This creates a process.

**Linux process:**

1.  **A process is a running instance of an executable program.**
2.  **A process are referred to as tasks**
3.  **Any command that you give to your linux machine starts a new process.**
4.  **A process consists of**
    1.  **System resources that are allocated to it (processors CPUs)**
    2.  **An address space of allocated memory**
    3.  **Operating system descriptors of resources that are allocated to the process**
    4.  **Security attributes such as the process owner and it's set of permissions.**
    5.  **Processor state (context) such as the content of registers and physical memory addressing**
5.  **The environment of a process includes**
    1.  **Local and global variables**
    2.  **A current scheduling context**
    3.  **Allocated system resources such as file descriptors and network ports**

**Linux thread:**

1.  **A thread is an executable context or flow of execution in a program**
2.  **Threads are referred to as light-weight processes**
3.  **Every process consists of at least one thread**
4.  **A process containing several execution threads is a multi-threaded process.**
5.  **Each thread has its thread id (TID), program counter, process stack, and a set of registers.**

# 

# **🌳 2. Process Hierarchy**

# Linux uses a **tree structure**:

# systemd (PID 1)

# ├── sshd

# ├── nginx

# └── bash

#  └── command

### **📌 Key Point:**

# Every process has a parent

# Root of all processes = `systemd`

# 

# **🔄 3. Process States**

| ****State**** | ****Meaning****   |
|---------------|-------------------|
| **R**         | **Running**       |
| **S**         | **Sleeping**      |
| **D**         | **Waiting (I/O)** |
| **T**         | **Stopped**       |
| **Z**         | **Zombie**        |

# 

# **🧟 4. Zombie & Orphan Processes**

## **🧟 Zombie Process**

# Process finished execution

# Still exists in table

# Parent didn’t read exit status

# 👉 State = Z

# 

## **👶 Orphan Process**

# Parent dies first

# Adopted by `systemd`

# 

# **📊 5. Viewing Processes**

# ps -ef

# ps aux

# 

## **🔄 Real-time monitoring**

# top

# htop

# 

# **🔍 6. Finding Processes**

# ps aux \| grep nginx

# pgrep nginx

# 

# **▶ 7. Running Processes**

## **Foreground**

# ./script.sh

## **Background**

# ./script.sh &

## **No Hangup (Important)**

# nohup ./script.sh &

# 👉 Keeps running after logout (SSH safe)

# 

# **🧱 8. Job Control**

| ****Command**** | ****Use****             |
|-----------------|-------------------------|
| **Ctrl + Z**    | **Pause process**       |
| **bg**          | **Run in background**   |
| **fg**          | **Bring to foreground** |
| **jobs**        | **List jobs**           |

# 

# **🔪 9. Killing Processes**

| ****Action****    | ****Command****   |
|-------------------|-------------------|
| **Kill PID**      | **kill 1234**     |
| **Force kill**    | **kill -9 1234**  |
| **By name**       | **pkill nginx**   |
| **All processes** | **killall nginx** |

# 

# **📡 10. Linux Signals**

| ****Signal****   | ****Meaning****   |
|------------------|-------------------|
| **15 (SIGTERM)** | **Graceful stop** |
| **9 (SIGKILL)**  | **Force kill**    |
| **SIGSTOP**      | **Pause**         |
| **SIGCONT**      | **Resume**        |

# kill -l

# 

# **⚖️ 11. Process Priority (Nice Value)**

## **📌 Range:**

# -20 → highest priority

# 19 → lowest priority

# 

## **Commands:**

# nice -n 10 command

# renice 5 -p PID

# 

# **📊 12. Resource Monitoring**

# ps aux --sort=-%cpu \| head

# ps aux --sort=-%mem \| head

# free -m

# 

# **🧠 13. Advanced Tools**

| ****Tool****  | ****Purpose****        |
|---------------|------------------------|
| **strace**    | **system calls trace** |
| **lsof**      | **open files**         |
| **watch**     | **repeat command**     |
| **systemctl** | **manage services**    |

# 

# **🖥️ 14. top & htop Deep Monitoring**

## **📊 top**

# top

### **Key Metrics:**

# CPU usage

# Memory usage

# Load average

# 

### **Controls:**

| ****Key**** | ****Action****   |
|-------------|------------------|
|             |                  |
| **P**       | **CPU sort**     |
| **M**       | **Memory sort**  |
| **k**       | **Kill process** |
| **r**       | **Renice**       |
| **q**       | **Quit**         |

# 

## **🎨 htop (Advanced UI)**

# htop

# Features:

# Color UI

# Tree view (F5)

# Mouse support

# Kill (F9)

# 

# **📁 15. /proc File System (IMPORTANT ADDITION)**

### **📌 What is /proc?**

# Virtual filesystem that shows **process & system info**

# 

### **Examples:**

# /proc/cpuinfo

# /proc/meminfo

# /proc/\[PID\]/

# 👉 Every process has a folder here.

# 

# **🚀 16. DevOps Use Cases**

| ****Problem****    | ****Solution****       |
|--------------------|------------------------|
| **High CPU**       | **top → kill process** |
| **Memory leak**    | **check RES**          |
| **Zombie process** | **fix parent process** |
| **Service stuck**  | **systemctl restart**  |
| **Logs issue**     | **lsof + /proc**       |

# 

# **🎯 17. Quick Cheat Sheet**

# 

## **📊 Processes**

# ps aux

# top

# htop

# 

## **🔍 Find**

# pgrep nginx

# ps aux \| grep nginx

# 

## **🔪 Kill**

# kill -9 PID

# pkill nginx

# killall nginx

# 

## **⚙️ Jobs**

# jobs

# fg

# bg

# 

# **🎯 FINAL SUMMARY**

# To master Process Management:

# ✔ Understand process lifecycle ✔ Learn PID/PPID concept ✔ Use top/htop for monitoring ✔ Kill processes safely ✔ Understand signals ✔ Use /proc for debugging ✔ Control jobs & priorities

# 

# 

# **📘 Chapter 7: Linux Services (systemd)**

# **🔰 1. What are Services?**

A **service** is a background process (daemon) that runs continuously.

### **📌 Examples:**

- Nginx (web server)
- MySQL (database)
- SSH (remote access)
- Docker

👉 Services are essential in servers and DevOps.

# **⚙️ 2. What is systemd?**

### **📌 Definition:**

systemd is the **init system + service manager** in modern Linux.

👉 It is the first process started (PID 1).

### **🧠 Why systemd is important:**

- Starts services at boot
- Restarts crashed services
- Manages dependencies
- Provides logs (journalctl)
- Controls entire system lifecycle

# **🚀 3. Linux Boot Flow (with systemd)**

BIOS/UEFI → Kernel → systemd → Services

👉 systemd = system manager brain

# **🧩 4. systemd Units**

A **unit** is anything systemd manages.

| **Type** | **Meaning**           |
|----------|-----------------------|
| service  | background apps       |
| socket   | network communication |
| target   | group of services     |
| mount    | filesystem mounts     |
| timer    | scheduled jobs        |

👉 Most important for DevOps:

- service
- timer

# **📦 5. systemd Service File**

### **📂 Location:**

/etc/systemd/system/

### **📄 Example Service:**

\[Unit\]

    Description=My App Service
    After=network.target

\[Service\]

    ExecStart=/usr/bin/node /home/user/app.js
    WorkingDirectory=/home/user
    Restart=always
    User=ubuntu

\[Install\]

    WantedBy=multi-user.target

## **🔍 Sections Explained:**

### **🔹 \[Unit\]**

- Defines dependencies
- Example:
  - After=network.target → wait for network

### **🔹 \[Service\]**

| **Field**        | **Meaning**    |
|------------------|----------------|
| ExecStart        | command to run |
| Restart          | restart policy |
| User             | run as user    |
| WorkingDirectory | app folder     |

### **🔹 \[Install\]**

- Defines boot behavior
- multi-user.target = normal system mode

# **🔧 6. systemctl Commands**

## **▶ Service Control**

``` bash
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
systemctl status nginx
```

## **🔁 Enable / Disable at Boot**

``` bash
sudo systemctl enable nginx
sudo systemctl disable nginx
systemctl is-enabled nginx
```

## **📊 List Services**

``` bash
systemctl list-units --type=service
```

# **📊 7. Logs (journalctl)**

``` bash
journalctl -u nginx
journalctl -u nginx -f
journalctl -u nginx --since "1 hour ago"
```

👉 Used for debugging production systems

# **🔁 8. Restart Policies**

Inside service file:

| **Option** | **Meaning**      |
|------------|------------------|
| no         | never restart    |
| on-failure | restart on crash |
| always     | always restart   |

👉 Best practice:

    Restart=always

# **⏱️ 9. systemd Timer (Cron Alternative)**

### **📌 Example:**

\[Timer\]

    OnBootSec=5min
    OnUnitActiveSec=1h

## **🔥 systemd vs Cron**

| **Feature** | **Cron** | **systemd**     |
|-------------|----------|-----------------|
| Logging     | limited  | full journalctl |
| Dependency  | no       | yes             |
| modern use  | medium   | high            |

# **📂 10. Service File Locations**

| **Path**            | **Meaning**     |
|---------------------|-----------------|
| /etc/systemd/system | custom services |
| /lib/systemd/system | system services |

# **🧪 11. Hands-on Lab**

## **Step 1: Create Service**

``` bash
sudo nano /etc/systemd/system/myapp.service
```

## **Step 2: Add Config**

\[Unit\]

    Description=Test App
    After=network.target

\[Service\]

    ExecStart=/bin/bash -c "while true; do echo running; sleep 5; done"
    Restart=always

\[Install\]

    WantedBy=multi-user.target

## **Step 3: Reload systemd**

``` bash
sudo systemctl daemon-reload
```

## **Step 4: Start Service**

``` bash
sudo systemctl start myapp
```

## **Step 5: Check Logs**

``` bash
journalctl -u myapp -f
```

# **🚀 12. DevOps Use Cases**

| **Scenario**       | **Solution**    |
|--------------------|-----------------|
| Run app 24/7       | systemd service |
| Auto restart crash | Restart=always  |
| Monitor logs       | journalctl      |
| Start on boot      | enable service  |
| Run Jenkins/Docker | systemd service |

# **⚠️ 13. Common Mistakes**

❌ Forgetting:

``` bash
systemctl daemon-reload
```

❌ Wrong ExecStart path  
👉 Always use full path:

which node

❌ No restart policy  
👉 App won’t recover after crash

# **🧠 14. Quick Cheat Sheet**

## **⚙️ systemd**

``` bash
systemctl start service
systemctl stop service
systemctl restart service
systemctl status service
```

## **🔁 Enable Boot**

``` bash
systemctl enable service
```

## **📊 Logs**

``` bash
journalctl -u service -f
```

# **🎯 FINAL SUMMARY**

To master systemd:

✔ Understand services & daemons  
✔ Know systemd boot flow  
✔ Use systemctl commands  
✔ Debug with journalctl  
✔ Create custom services  
✔ Apply restart policies  
✔ Understand timers vs cron

# **📘 Chapter 8: Linux Networking** 

# **🌐 1. Introduction**

# Linux networking allows:

# System-to-system communication

# Internet access

# Cloud & distributed apps

# 👉 In DevOps:

# Microservices communicate

# APIs connect

# Containers talk over networks

# 

# **🧠 2. Core Networking Concepts (DEEP)**

## **📌 IP Address**

# Unique identifier of a system

### **Types:**

# Private → 192.168.x.x, 10.x.x.x

# Public → internet-facing

# 

## **📌 MAC Address**

# Hardware-level unique ID of NIC

# 

## **📌 Protocols**

# TCP → reliable (HTTP, SSH)

# UDP → fast (DNS, streaming)

# 

## **📌 OSI Model (Basic Understanding)**

| ****Layer****   | ****Example**** |
|-----------------|-----------------|
| **Application** | **HTTP, DNS**   |
| **Transport**   | **TCP/UDP**     |
| **Network**     | **IP**          |
| **Data Link**   | **MAC**         |

# 👉 DevOps mostly deals with:

# Layer 4 (TCP/UDP)

# Layer 7 (HTTP)

# 

# **📊 3. IP Addressing & CIDR (VERY IMPORTANT)**

## **📌 Example:**

# 192.168.1.10/24

## **📌 Meaning:**

# IP → 192.168.1.10

# /24 → subnet mask (255.255.255.0)

# 

## **📌 Check IP:**

# ip a

# 

## **📌 Check routing IP:**

# hostname -I

# 

# 👉 CIDR is heavily used in:

# AWS VPC

# Kubernetes networking

# 

# **🖧 4. Network Interfaces**

## **📌 View interfaces:**

# ip a

# 

## **📌 Interface status:**

# ip link

# 

## **📌 Enable interface:**

# sudo ip link set eth0 up

# 

## **📌 Assign IP:**

# sudo ip addr add 192.168.1.10/24 dev eth0

# 

# **📡 5. Connectivity Tools**

## **🔹 Ping**

# ping google.com

# 

## **🔹 Curl (API testing)**

# curl http://example.com

# 

## **🔹 Wget (Download)**

# wget http://example.com/file

# 

# **🔍 6. DNS (Deep Dive)**

## **📌 DNS Tools**

# nslookup google.com

# dig google.com

# 

## **📌 DNS Flow (IMPORTANT)**

# Browser → /etc/hosts → DNS Resolver → Root → TLD → Authoritative → IP

# 

## **📁 Files:**

# /etc/hosts

# /etc/resolv.conf

# 

# 👉 DevOps use:

# Fix domain issues

# Debug API failures

# 

# **🔌 7. Ports & Services (DEEP)**

## **📌 Common Ports**

| ****Service**** | ****Port**** |
|-----------------|--------------|
| **SSH**         | **22**       |
| **HTTP**        | **80**       |
| **HTTPS**       | **443**      |
| **MySQL**       | **3306**     |

# 

## **📌 Check open ports:**

# ss -tuln

# 

## **📌 Check specific port:**

# ss -tuln \| grep 80

# 

## **📌 Legacy:**

# netstat -tuln

# 

## **📌 Test port:**

# telnet host port

# 

# 👉 DevOps:

# Debug service connectivity

# Check container ports

# 

# **🌍 8. Routing & Gateway**

## **📌 Routing table:**

# ip route

# 

## **📌 Example:**

# default via 192.168.1.1 dev eth0

# 👉 Meaning:

# Gateway → 192.168.1.1

# 

## **📌 Add route:**

# sudo ip route add default via 192.168.1.1

# 

# 👉 Used in:

# Cloud networking

# VPN setups

# 

# **🔐 9. SSH & Remote Access**

## **📌 Connect:**

# ssh user@server_ip

# 

## **📁 Copy:**

# scp file user@host:/path

# 

## **🔄 Sync:**

# rsync -av /src /dest

# 

# 👉 DevOps:

# Manage AWS EC2

# Deploy applications

# 

# **🔥 10. Firewall & Security (DEEP)**

# 

## **🟦 UFW (Ubuntu)**

# sudo ufw allow 22

# sudo ufw allow 80

# sudo ufw enable

# sudo ufw status

# 

## **🟥 Firewalld (RHEL)**

# sudo firewall-cmd --add-port=8080/tcp --permanent

# sudo firewall-cmd --reload

# 

## **📌 Concept:**

# Allow / deny traffic

# Protect server

# 

# 👉 DevOps:

# Secure production servers

# Control API access

# 

# **📁 11. Important Files**

| ****File****         | ****Purpose**** |
|----------------------|-----------------|
| **/etc/hosts**       | **local DNS**   |
| **/etc/resolv.conf** | **DNS servers** |
| **/etc/hostname**    | **system name** |

# 

# **🧪 12. Debugging Lab**

## **🔥 CPU load:**

# yes \> /dev/null &

# 

## **📊 Monitor:**

# top

# 

## **🔍 Find:**

# ps -ef \| grep yes

# 

## **🔪 Kill:**

# kill PID

# kill -9 PID

# 

## **📄 Logs:**

# ./script.sh \> output.log 2\> error.log

# 

# **🛠 13. Advanced Tools**

| ****Tool****   | ****Use****        |
|----------------|--------------------|
| **traceroute** | **path tracking**  |
| **nmap**       | **port scan**      |
| **ss**         | **socket info**    |
| **watch**      | **repeat command** |

# 

# **🚀 14. DevOps Use Cases**

| ****Task****      | ****Command**** |
|-------------------|-----------------|
| **Check ports**   | **ss -tuln**    |
| **Test API**      | **curl**        |
| **DNS debug**     | **dig**         |
| **Network issue** | **ping**        |
| **Routing check** | **ip route**    |

# 

# **⚠️ 15. Safety Rules**

# ❌ Never run:

# kill -9 1

# ❌ Don’t kill:

# systemd

# sshd

# ✔ Always check:

# ps -ef \| grep process

# 

# **🎯 16. Cheat Sheet**

# 

## **🌐 Networking**

# ip a

# ip route

# hostname -I

# 

## **📡 Testing**

# ping google.com

# curl url

# wget url

# 

## **🔍 Ports**

# ss -tuln

# 

## **🔐 SSH**

# ssh user@host

# scp file host:/path

# 

# **🎯 FINAL SUMMARY (UPGRADED)**

# To master Linux Networking (DevOps level):

# ✔ Understand IP + CIDR ✔ Know DNS flow deeply ✔ Master ports & services ✔ Debug with ss, dig, traceroute ✔ Understand routing & gateways ✔ Secure with firewall ✔ Use SSH daily

# 

# **⚡ REALITY CHECK (IMPORTANT)**

# If you understand this chapter deeply, you can:

# Debug **90% of network issues in servers**

# Work confidently with:

# AWS VPC

# Docker networking

# Kubernetes services

# 

# 

# **📘 Chapter 9: Linux Storage & Disk Management (DevOps Essential)**

# **💽 1. Introduction to Linux Storage**

Linux stores data using:

- Hard disks
- SSDs
- Cloud volumes (AWS EBS)

### **📌 Types:**

- Block storage → disks
- File storage → directories/files

👉 Everything is treated as a file in Linux.

# **🧱 2. Linux Disk Architecture**

## **📌 Disks:**

/dev/sda

## **📌 Partitions:**

/dev/sda1

/dev/sda2

### **📌 View disks:**

``` bash
lsblk
```

# **📦 3. Partitioning Concepts**

## **Types:**

- Primary partition
- Extended partition
- Logical partition

## **File systems:**

- MBR → old system
- GPT → modern system (cloud standard)

# **🛠 4. Disk Management Tools**

## **📌 View disk structure:**

``` bash
lsblk
```

## **📌 Partition tool (old style):**

``` bash
sudo fdisk -l
```

## **📌 Modern tool:**

``` bash
sudo parted -l
```

# **📁 5. File Systems**

## **📌 Common file systems:**

| **Type** | **Use**           |
|----------|-------------------|
| ext4     | default Linux     |
| xfs      | high performance  |
| btrfs    | advanced features |

## **📌 Create file system:**

``` bash
sudo mkfs.ext4 /dev/sda1
```

# **🔗 6. Mounting & Unmounting**

## **📌 Mount disk:**

``` bash
sudo mount /dev/sda1 /mnt
```

## **📌 Unmount:**

``` bash
sudo umount /mnt
```

## **📌 Auto mount (fstab):**

/etc/fstab

# **📊 7. Disk Usage Monitoring**

## **📌 Disk space:**

``` bash
df -h
```

## **📌 Folder size:**

``` bash
du -sh /var/log
```

## **📌 Top directories:**

``` bash
du -h --max-depth=1
```

# **🧠 8. Inodes (VERY IMPORTANT)**

## **📌 What is inode?**

Metadata of file:

- Size
- Permissions
- Location

## **📌 Check inode usage:**

``` bash
df -i
```

👉 Problem:

- Disk space OK
- Inodes full → system fails

# **💾 9. LVM (Logical Volume Management)**

## **📌 Why LVM?**

- Flexible disk resizing
- Production servers use this

## **Structure:**

Disk → PV → VG → LV → Filesystem

## **📌 Commands:**

### **Create PV:**

``` bash
pvcreate /dev/sda1
```

### **Create VG:**

``` bash
vgcreate vg_data /dev/sda1
```

### **Create LV:**

``` bash
lvcreate -L 10G -n lv_data vg_data
```

### **Format:**

mkfs.ext4 /dev/vg_data/lv_data

### **Mount:**

``` bash
mount /dev/vg_data/lv_data /data
```

# **🔄 10. Swap Memory**

## **📌 Check swap:**

    free -h

## **📌 Create swap:**

``` bash
sudo fallocate -l 1G /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## **📌 Disable swap:**

``` bash
sudo swapoff /swapfile
```

# **📉 11. Performance Monitoring**

## **📌 Disk I/O:**

iostat

## **📌 System load:**

vmstat

# **🧪 12. DevOps Real Scenarios**

| **Problem**          | **Solution**    |
|----------------------|-----------------|
| Disk full            | df -h           |
| Log explosion        | du -sh /var/log |
| No space but disk ok | df -i           |
| Slow server          | iostat          |
| Storage expansion    | LVM             |

# **⚠️ 13. Common Issues**

❌ Disk full  
❌ Inode exhausted  
❌ Wrong mount  
❌ Missing fstab entry

# **🎯 14. Cheat Sheet (Must Know)**

## **💽 Disk**

``` bash
lsblk
fdisk -l
```

## **📊 Usage**

``` bash
df -h
du -sh *
```

## **🔗 Mount**

``` bash
mount /dev/sda1 /mnt
umount /mnt
```

## **💾 LVM**

``` bash
pvcreate
vgcreate
lvcreate
```

## **🔄 Swap**

swapon

swapoff

# **🎯 FINAL SUMMARY**

To master Linux Storage:

✔ Understand disks & partitions  
✔ Learn mount/unmount system  
✔ Monitor disk usage (df, du)  
✔ Understand inodes  
✔ Use LVM in production  
✔ Manage swap memory  
✔ Debug storage issues

# **📘 Chapter 10: Linux System Boot Process (BIOS → GRUB → Kernel → systemd)**

# **⚡ 1. Introduction to Boot Process**

# The **boot process** is how Linux starts from power ON → usable system.

### **📌 Steps:**

# Hardware check

# Load bootloader

# Load kernel

# Start system services

# 

# **🖥️ 2. BIOS / UEFI Stage**

## **📌 BIOS (Basic Input Output System)**

# Old firmware system

# Starts hardware check (POST)

## **📌 UEFI (Modern BIOS)**

# Faster boot

# Secure Boot support

# Used in cloud systems

# 

### **🔄 Task:**

# Select boot device (HDD, SSD, USB)

# 

# **📀 3. GRUB Bootloader**

## **📌 What is GRUB?**

# GRUB = boot menu system

# 👉 It allows:

# OS selection

# Kernel selection

# Recovery mode

# 

## **📁 GRUB Config:**

# /boot/grub/grub.cfg

# 

## **📌 Update GRUB:**

# sudo update-grub

# 

## **📌 Reinstall GRUB:**

# sudo grub-install /dev/sda

# 

# **🧠 4. Kernel Stage**

## **📌 What is Kernel?**

# Kernel = core of Linux OS

# 👉 It manages:

# CPU

# Memory

# Devices

# Processes

# 

## **📁 Kernel file location:**

# /boot/vmlinuz

# 

## **📌 Kernel messages:**

# dmesg

# 

# **⚙️ 5. systemd Stage (PID 1)**

## **📌 What is systemd?**

# systemd is the **first process (PID 1)**.

# 👉 It starts everything:

# services

# networking

# login system

# 

## **📊 Check PID 1:**

# ps -p 1

# 

# **🚀 6. Runlevels vs Targets**

## **📌 Old System (Runlevels)**

| ****Level**** | ****Meaning**** |
|---------------|-----------------|
| **0**         | **shutdown**    |
| **1**         | **rescue**      |
| **3**         | **multi-user**  |
| **5**         | **GUI**         |
| **6**         | **reboot**      |

# 

## **📌 Modern System (Targets)**

| ****Target****        | ****Meaning**** |
|-----------------------|-----------------|
| **multi-user.target** | **CLI mode**    |
| **graphical.target**  | **GUI mode**    |
| **rescue.target**     | **recovery**    |

# 

## **📌 Check current target:**

# systemctl get-default

# 

## **📌 Set target:**

# sudo systemctl set-default multi-user.target

# 

# **📊 7. Boot Flow (Important Concept)**

# Power ON

#  ↓

# BIOS/UEFI

#  ↓

# GRUB Bootloader

#  ↓

# Linux Kernel

#  ↓

# systemd (PID 1)

#  ↓

# Services Start

#  ↓

# Login Screen

# 

# **🔍 8. Boot Logs & Troubleshooting**

## **📌 Kernel logs:**

# dmesg

# 

## **📌 system logs:**

# journalctl -b

# 

## **📌 Service logs:**

# journalctl -u nginx

# 

## **📌 Boot errors:**

# journalctl -p 3 -xb

# 

# **🧪 9. Recovery Modes**

## **📌 Rescue Mode**

# Minimal system

# Fix issues

## **📌 Emergency Mode**

# Root access only

# 

## **📌 GRUB Recovery:**

# Press `e` in GRUB menu

# Edit kernel boot parameters

# 

# **⚠️ 10. Common Boot Issues**

| ****Problem****     | ****Cause****        |
|---------------------|----------------------|
| **Kernel panic**    | **corrupted kernel** |
| **GRUB missing**    | **bootloader issue** |
| **systemd failure** | **service crash**    |
| **black screen**    | **driver issue**     |

# 

# **🛠 11. DevOps Use Cases**

# ✔ Fix broken servers ✔ Debug boot failures ✔ Recover EC2 instances ✔ Fix GRUB in cloud VM ✔ Analyze system crashes

# 

# **🎯 12. Cheat Sheet (Must Know)**

# 

## **📊 Boot Logs**

# dmesg

# journalctl -b

# 

## **⚙️ systemd**

# systemctl status

# systemctl get-default

# 

## **📀 GRUB**

# update-grub

# grub-install

# 

## **🔍 Process 1**

# ps -p 1

# 

# **🎯 FINAL SUMMARY**

# To master Linux Boot Process:

# ✔ Understand BIOS/UEFI role ✔ Know GRUB bootloader ✔ Understand kernel loading ✔ Learn systemd startup ✔ Use journalctl for debugging ✔ Recover broken systems

# 

# 

# **📘 Chapter 11: Linux System Performance Monitoring (CPU, RAM, Disk, Load Average)** 

# **⚡ 1. Introduction**

System performance monitoring is used to:

- Detect slow servers
- Prevent downtime
- Optimize resources

👉 In DevOps:

- Critical for production systems
- Used in AWS, Kubernetes, Docker, CI/CD

# **🧠 2. Key Performance Metrics**

| **Metric** | **Meaning**            |
|------------|------------------------|
| CPU        | Processing power usage |
| RAM        | Memory usage           |
| Disk       | Storage usage          |
| Load       | System workload        |

# **🖥️ 3. CPU Monitoring**

## **📌 Top command**

``` bash
top
```

## **📌 Better tool:**

    htop

## **📌 CPU stats:**

mpstat

### **🧠 CPU Interpretation:**

- 0% idle → overloaded system
- high user% → app issue
- high system% → kernel issue

# **🧠 4. Memory Monitoring**

## **📌 Check RAM:**

    free -h

## **📊 Output meaning:**

| **Field**  | **Meaning**      |
|------------|------------------|
| used       | used memory      |
| free       | available memory |
| buff/cache | temporary cache  |
| available  | usable memory    |

## **📌 Real meaning:**

👉 Linux uses free RAM as cache (normal behavior)

## **📌 Swap usage:**

swapon --show

    free -h

# **💽 5. Disk Monitoring**

## **📌 Disk usage:**

``` bash
df -h
```

## **📌 Folder usage:**

``` bash
du -sh /var/log
```

## **📌 Top directories:**

``` bash
du -h --max-depth=1
```

## **📌 Inode check:**

``` bash
df -i
```

# **📊 6. Load Average (VERY IMPORTANT)**

## **📌 Check load:**

    uptime

or

``` bash
top
```

## **📌 Example:**

load average: 1.20, 0.80, 0.50

### **🧠 Meaning:**

| **Time** | **Meaning**    |
|----------|----------------|
| 1 min    | recent load    |
| 5 min    | medium load    |
| 15 min   | long-term load |

### **📌 Rule:**

👉 Load \> CPU cores = system overloaded

# **🔥 7. Real-Time Monitoring**

## **📌 Watch command:**

    watch -n 1 df -h

## **📌 Top processes:**

``` bash
top
```

## **📌 Filter process:**

``` bash
ps aux --sort=-%cpu | head
```

# **📡 8. Process Resource Usage**

## **📌 All processes:**

``` bash
ps aux
```

## **📌 Specific process:**

``` bash
ps -ef | grep nginx
```

## **📌 PID-based monitoring:**

``` bash
top -p PID
```

# **⚙️ 9. Advanced Tools**

## **📌 Virtual memory:**

vmstat 1

## **📌 Disk I/O:**

iostat

## **📌 System activity report:**

sar -u 1 5

# **🚨 10. Troubleshooting Scenarios**

## **🔴 High CPU Usage**

✔ Find process:

``` bash
top
```

✔ Kill process:

``` bash
kill -9 PID
```

## **🔴 Memory Leak**

✔ Check RAM:

    free -h

✔ Find heavy process:

``` bash
ps aux --sort=-%mem
```

## **🔴 Disk Full**

✔ Check disk:

``` bash
df -h
```

✔ Find large files:

``` bash
du -ah / | sort -rh | head
```

## **🔴 High Load**

✔ Check load:

    uptime

✔ Identify CPU processes:

``` bash
top
```

# **🧪 11. DevOps Real Scenarios**

| **Problem**   | **Solution**    |
|---------------|-----------------|
| Slow server   | check CPU (top) |
| Out of memory | free -h         |
| Disk full     | df -h           |
| App crash     | journalctl      |
| High load     | uptime + top    |

# **🎯 12. Cheat Sheet (Must Memorize)**

## **🖥️ CPU**

``` bash
top
htop
```

mpstat

## **🧠 Memory**

    free -h

## **💽 Disk**

``` bash
df -h
du -sh
```

## **📊 Load**

    uptime

## **⚙️ Processes**

``` bash
ps aux
```

kill PID

# **🎯 FINAL SUMMARY**

To master Linux Performance Monitoring:

✔ Understand CPU, RAM, Disk  
✔ Learn load average properly  
✔ Use top/htop daily  
✔ Monitor disk + memory together  
✔ Debug production issues fast  
✔ Use tools like vmstat, iostat

**📘 Chapter 12: Linux Logging System (journalctl, /var/log, syslog, Debugging)**

# **📜 1. Introduction to Logging**

Logs are **records of system events**.

### **📌 Logs include:**

- Errors
- Warnings
- System activity
- User actions

### **🎯 Why Logs Matter (DevOps)**

✔ Debug issues  
✔ Monitor systems  
✔ Detect attacks  
✔ Analyze failures

👉 Logs = **first place to check in any problem**

# **📁 2. Log Storage Location**

## **📌 Main directory:**

/var/log

## **📂 Important Log Files**

| **File**          | **Purpose**          |
|-------------------|----------------------|
| /var/log/syslog   | general system logs  |
| /var/log/auth.log | login/authentication |
| /var/log/kern.log | kernel logs          |
| /var/log/dmesg    | boot logs            |
| /var/log/nginx/   | web server logs      |

## **📌 View logs:**

``` bash
ls /var/log
```

# **⚙️ 3. syslog (Traditional Logging)**

## **📌 What is syslog?**

syslog is a traditional logging system in Linux.

## **📌 Service:**

rsyslog

## **📌 Check service:**

``` bash
systemctl status rsyslog
```

## **📌 Config file:**

/etc/rsyslog.conf

# **📊 4. systemd Journal (journalctl)**

## **📌 What is journald?**

systemd-journald collects logs in binary format.

## **📌 Advantages:**

- Faster search
- Structured logs
- Centralized logging

## **📌 View logs:**

``` bash
journalctl
```

# **🔍 5. Viewing Logs**

## **📌 Real-time logs:**

``` bash
journalctl -f
```

## **📌 Service logs:**

``` bash
journalctl -u nginx
```

## **📌 Boot logs:**

``` bash
journalctl -b
```

## **📌 Using traditional tools:**

``` bash
tail -f /var/log/syslog
less /var/log/auth.log
```

# **📡 6. Filtering Logs**

## **📌 By time:**

``` bash
journalctl --since "1 hour ago"
```

## **📌 By severity:**

``` bash
journalctl -p 3
```

## **📌 By service + time:**

``` bash
journalctl -u nginx --since today
```

# **⚠️ 7. Log Levels (Severity)**

| **Level** | **Meaning** |
|-----------|-------------|
| 0         | Emergency   |
| 1         | Alert       |
| 2         | Critical    |
| 3         | Error       |
| 4         | Warning     |
| 5         | Notice      |
| 6         | Info        |
| 7         | Debug       |

👉 Most important:

- Error (3)
- Warning (4)

# **🔄 8. Log Rotation (logrotate)**

## **📌 Why needed?**

Logs grow continuously → can fill disk

## **📌 Tool:**

logrotate

## **📌 Config:**

/etc/logrotate.conf

## **📌 Force rotation:**

``` bash
sudo logrotate -f /etc/logrotate.conf
```

# **🧪 9. DevOps Debugging Scenarios**

## **🔴 Service not starting**

``` bash
systemctl status nginx
journalctl -u nginx
```

## **🔴 Login issues**

``` bash
tail -f /var/log/auth.log
```

## **🔴 System crash**

    dmesg
    journalctl -b -1

## **🔴 High errors**

``` bash
journalctl -p 3 -xb
```

# **🚀 10. Centralized Logging (Concept)**

In DevOps, logs are sent to centralized systems:

- ELK Stack (Elasticsearch, Logstash, Kibana)
- CloudWatch (AWS)

👉 Benefits:

- Monitor multiple servers
- Search logs easily
- Alerting system

# **⚠️ 11. Common Mistakes**

❌ Not checking logs  
❌ Logs filling disk  
❌ Ignoring warnings  
❌ Not using filters

# **🎯 12. Cheat Sheet**

## **📊 Journalctl**

``` bash
journalctl -f
journalctl -u service
journalctl -b
```

## **📁 Logs**

``` bash
ls /var/log
tail -f /var/log/syslog
```

## **⚠️ Errors**

``` bash
journalctl -p 3 -xb
```

## **🔄 Rotation**

logrotate -f

# **🎯 FINAL SUMMARY**

To master Linux Logging:

✔ Understand log locations  
✔ Use journalctl deeply  
✔ Filter logs by time & service  
✔ Monitor errors (priority 3)  
✔ Manage logs with logrotate  
✔ Debug real production issues

# **📘 Chapter 13: Linux Automation (Cron Jobs & Task Scheduling)** 

# **⚡ 1. Introduction to Automation**

Automation means:  
👉 Running tasks automatically without manual intervention

### **🎯 In DevOps:**

- Reduce manual work
- Ensure consistency
- Schedule critical operations

# **🧠 2. What is Cron?**

Cron is a **background service (daemon)** that schedules tasks.

👉 Runs commands at specific times

### **📌 Cron = Linux Task Scheduler**

# **🚀 3. Why Cron is Important (DevOps)**

### **🔥 Real Use Cases:**

- 🧹 Log cleanup
- 💾 Database backups
- 📊 Monitoring scripts
- 🔄 File sync
- 🚀 Deployments
- 🔐 Security scans

👉 Cron = **Automation backbone of Linux servers**

# **⏱️ 4. Cron Syntax (VERY IMPORTANT)**

\* \* \* \* \* command

### **📊 Fields:**

┌──────── minute (0–59)

│ ┌────── hour (0–23)

│ │ ┌──── day of month (1–31)

│ │ │ ┌── month (1–12)

│ │ │ │ ┌─ day of week (0–6)

│ │ │ │ │

\* \* \* \* \* command

# **🧩 5. Cron Examples**

### **⏱️ Every minute**

\* \* \* \* \* echo "Hello"

### **🕒 Every hour**

0 \* \* \* \* /home/user/script.sh

### **🌙 Daily at 2 AM**

0 2 \* \* \* /home/user/backup.sh

### **📅 Weekly**

0 3 \* \* 0 /home/user/cleanup.sh

### **🗓 Monthly**

0 0 1 \* \* /home/user/report.sh

# **🛠 6. Managing Cron Jobs**

## **📋 List jobs**

``` bash
crontab -l
```

## **✏️ Edit jobs**

``` bash
crontab -e
```

## **❌ Remove jobs**

``` bash
crontab -r
```

# **📂 7. System vs User Cron**

## **👤 User Cron**

``` bash
crontab -e
```

## **🖥️ System Cron**

/etc/crontab

## **📁 Cron directories:**

/etc/cron.hourly

/etc/cron.daily

/etc/cron.weekly

/etc/cron.monthly

👉 Used for system-level automation

# **🧾 8. Special Symbols**

| **Symbol** | **Meaning** |
|------------|-------------|
| \*         | every value |
| ,          | list        |
| \-         | range       |
| /          | step        |

### **Examples:**

\*/5 \* \* \* \* command

👉 Every 5 minutes

0 18 \* \* 1-5 command

👉 Weekdays at 6 PM

# **📜 9. Cron Environment (IMPORTANT)**

👉 Cron runs with limited environment

## **❗ Problems:**

- No full PATH
- No user profile (.bashrc)

## **✅ Solution:**

Use full paths:

    /usr/bin/python3 script.py

## **📌 Set PATH manually:**

    PATH=/usr/bin:/bin

# **📊 10. Logging & Debugging**

## **📌 Check logs:**

### **Ubuntu:**

``` bash
grep CRON /var/log/syslog
```

### **RHEL:**

``` bash
cat /var/log/cron
```

## **📌 Redirect output:**

0 2 \* \* \* script.sh \>\> /var/log/script.log 2\>&1

👉 VERY IMPORTANT for debugging

# **💾 11. Real DevOps Example**

## **Step 1: Create script**

``` bash
nano backup.sh
#!/bin/bash
tar czvf /backup/site_$(date +%F).tar.gz /var/www/html
```

## **Step 2: Make executable**

``` bash
chmod +x backup.sh
```

## **Step 3: Schedule**

0 1 \* \* \* /home/user/backup.sh

# **⚠️ 12. Common Mistakes**

❌ Relative paths  
❌ Script not executable  
❌ No logging  
❌ Environment issues

# **🚀 13. Best Practices**

✔ Use absolute paths  
✔ Log output  
✔ Test scripts manually  
✔ Use scripts (not inline commands)  
✔ Handle errors

# **🧠 14. Cron Limitations**

- Limited environment
- Hard debugging
- No dependency handling

# **🔄 15. Modern Alternatives**

| **Tool**            | **Use**      |
|---------------------|--------------|
| systemd timers      | modern Linux |
| Kubernetes CronJobs | containers   |
| Jenkins             | CI/CD        |
| AWS EventBridge     | cloud        |

👉 DevOps is moving beyond cron

# **🎯 16. Cheat Sheet**

## **📋 Manage Jobs**

``` bash
crontab -e
crontab -l
crontab -r
```

## **⏱ Format**

\* \* \* \* \* command

## **📊 Examples**

\*/5 \* \* \* \* command

0 2 \* \* \* backup.sh

## **📜 Logs**

``` bash
grep CRON /var/log/syslog
```

# **🎯 FINAL SUMMARY**

To master Linux Automation:

✔ Understand cron syntax deeply  
✔ Use cron for automation  
✔ Always log output  
✔ Avoid environment issues  
✔ Use scripts (not inline commands)  
✔ Know modern alternatives

# **📘 Chapter 14: Linux Pipes & Redirects (Data Flow & Output Control)** 

# **🔄 1. Introduction**

Pipes & redirects control **data flow in Linux**.

### **Default behavior:**

- Output → Terminal

### **With redirects:**

- Output → File
- Errors → File
- Input ← File

👉 In DevOps:

- Process logs
- Filter data
- Automate workflows

# **📤 2. Standard Streams (VERY IMPORTANT)**

| **Stream** | **Number** | **Meaning**   |
|------------|------------|---------------|
| stdin      | 0          | Input         |
| stdout     | 1          | Normal output |
| stderr     | 2          | Error output  |

👉 Everything in Linux uses these streams

# **✍️ 3. Basic Commands**

## **📌 echo (generate output)**

``` bash
echo "hello it's charlie here"
```

## **📌 cat (view file)**

cat file.txt

# **🔀 4. Output Redirection**

## **📌 Overwrite**

``` bash
echo "hello" > file.txt
```

## **📌 Append**

``` bash
echo "new line" >> file.txt
```

## **📌 Explicit stdout**

``` bash
echo "hello" 1> file.txt
```

⚠️ `>` overwrites file (danger)

# **❌ 5. Error Redirection**

cat missingfile 2\> error.log

👉 Saves only errors

# **🔁 6. Output + Error Together**

## **📌 Same file**

    command > output.log 2>&1

## **📌 Separate files**

    ./script.sh > output.log 2> error.log

👉 Used in:

- cron jobs
- logging systems

# **📥 7. Input Redirection (IMPORTANT)**

    command < file.txt

👉 Example:

``` bash
sort < file.txt
```

👉 Takes input from file instead of keyboard

# **🔗 8. Pipes (\|)**

Pipes send output of one command into another

## **📌 Example:**

``` bash
ls | wc -l
```

👉 Count files

## **📌 Filter example:**

``` bash
ls /var/log | grep syslog
```

👉 Pipes = **command chaining**

# **🔧 9. Common Tools with Pipes**

## **🔍 grep (filter)**

``` bash
grep "error" logfile
```

## **🔢 wc (count)**

``` bash
ls | wc -l
```

## **🔤 sort**

sort file.txt

## **🔁 uniq**

sort file.txt \| uniq

👉 Used for:

- log analysis
- data processing

# **⚡ 10. Advanced Redirection**

## **📌 Ignore output**

    command > /dev/null

## **📌 Ignore everything**

    command > /dev/null 2>&1

👉 Used in:

- cron jobs
- silent scripts

# **🧪 11. Useful Commands**

## **📌 tee (save + display)**

``` bash
ls | tee output.txt
```

👉 Output goes to:

- screen
- file

## **📌 xargs (IMPORTANT)**

``` bash
ls | xargs rm
```

👉 Pass output as input to another command

# **🚀 12. DevOps Use Cases**

## **📊 Log filtering**

``` bash
cat /var/log/syslog | grep error
```

## **🔍 Auth failures**

``` bash
grep "failed" /var/log/auth.log
```

## **🧹 Clean logs**

cat file \| grep -v "INFO" \> clean.log

## **📈 Count results**

``` bash
ps aux | wc -l
```

👉 Used in:

- monitoring
- debugging
- automation

# **⚠️ 13. Common Mistakes**

❌ Using `>` (overwrites data)  
✔ Use `>>` for safety

❌ Mixing stdout & stderr  
✔ Separate logs

❌ Not checking output before redirect

# **🎯 14. Cheat Sheet**

## **📤 Output**

\> file

\>\> file

1\> file

## **❌ Error**

2\> file

## **🔁 Both**

\> file 2\>&1

## **🔗 Pipes**

command1 \| command2

## **🧪 Tools**

``` bash
grep
wc
tee
xargs
```

## **🚫 Ignore**

/dev/null

# **🎯 FINAL SUMMARY**

👉 Pipes = connect commands  
👉 Redirects = control output  
👉 Streams = stdin, stdout, stderr

# **🚀 DEVOPS INSIGHT (IMPORTANT)**

In real environments:

### **🕒 Cron uses:**

- redirects → logging
- silent execution → /dev/null

### **🔀 Pipes are used for:**

- log filtering
- monitoring pipelines
- automation scripts

**📘 Chapter 15: Linux File System, Commands & Compression (DevOps Level)**

# **📁 1. File Operations (Advanced)**

## **📍 Navigation**

pwd

``` bash
ls -l
ls -lh
ls -a
cd /path
```

## **📁 File Operations**

``` bash
mkdir -p devops/scripts
```

touch file.txt

cp file1 file2

``` bash
cp -r dir1 dir2
```

mv old new

rm file

``` bash
rm -r folder
```

⚠️ Dangerous:

``` bash
rm -rf /
```

## **💡 Advanced ls**

``` bash
ls -ltr # sorted by time
ls -lhS # sorted by size
```

# **🔍 2. File Search & Filtering (VERY IMPORTANT)**

## **📌 find (POWERFUL)**

``` bash
find /var/log -name "*.log"
```

## **📌 Find by size**

``` bash
find / -size +100M
```

## **📌 Find + delete**

``` bash
find /tmp -type f -delete
```

## **📌 locate (fast search)**

    locate file.txt

## **📌 grep (filter)**

``` bash
grep "error" file.log
grep -i "fail" file.log
grep -r "nginx" /etc/
```

👉 Used in:

- log analysis
- troubleshooting

# **📊 3. Disk Usage**

## **📌 Check disk space**

``` bash
df -h
```

## **📌 Directory size**

``` bash
du -sh /var/log
```

## **📌 Largest files**

``` bash
du -ah | sort -rh | head
```

👉 DevOps:

- detect disk full issues
- monitor logs

# **🔄 4. File Transfer & Sync (CRITICAL)**

## **📌 cp**

cp file backup/

## **📌 scp (remote copy)**

``` bash
scp file user@server:/path
```

## **📌 rsync (BEST TOOL)**

    rsync -av /src /dest

## **📌 Sync with delete**

    rsync -av --delete /src /dest

👉 Used in:

- backups
- deployments
- migrations

# **⚙️ 5. Process & File Interaction**

## **📌 Check process**

``` bash
ps aux | grep nginx
```

## **📌 Open files (VERY IMPORTANT)**

    lsof
    lsof -i :80

👉 DevOps:

- find which process using port/file

# **🔐 6. Permissions (Quick DevOps Recap)**

## **📌 chmod**

``` bash
chmod 755 script.sh
chmod 644 config.conf
```

## **📌 ownership**

``` bash
chown user:file file
chown user:group file
```

## **📌 Best practice:**

- Scripts → 755
- Config → 644
- Secrets → 600

# **🗜️ 7. Compression & Archiving (DEEP)**

## **📌 gzip**

    gzip file.txt
    gunzip file.txt.gz

## **📌 tar (MOST IMPORTANT)**

### **Create archive**

``` bash
tar cvf archive.tar folder/
```

### **Compress archive**

``` bash
tar czvf archive.tar.gz folder/
```

### **Extract**

``` bash
tar xzvf archive.tar.gz
```

### **View contents**

``` bash
tar tzvf archive.tar.gz
```

## **📌 bzip2 (better compression)**

``` bash
tar cjvf archive.tar.bz2 folder/
```

👉 DevOps:

- backups
- deployment packages
- log archives

# **📦 8. Backup & Restore (IMPORTANT)**

## **📌 Backup example**

``` bash
tar czvf backup_$(date +%F).tar.gz /var/www
```

## **📌 Restore**

``` bash
tar xzvf backup.tar.gz
```

## **📌 Incremental backup (rsync)**

    rsync -av /data /backup

👉 Real usage:

- server backup
- disaster recovery

# **🧪 9. DevOps Use Cases**

## **📊 Log cleanup**

``` bash
find /var/log -name "*.log" -delete
```

## **📦 Deployment package**

``` bash
tar czvf app.tar.gz app/
```

## **🔄 Sync servers**

    rsync -av /app server:/app

## **🔍 Debug logs**

``` bash
grep "error" /var/log/syslog
```

## **📊 Disk issue**

``` bash
du -sh *
```

# **⚠️ 10. Common Mistakes**

❌ Using `rm -rf` blindly  
❌ Wrong permissions  
❌ Not checking disk space  
❌ Overwriting backups  
❌ Compressing wrong directory

# **🎯 11. Cheat Sheet**

## **📁 Files**

``` bash
ls -l
cp
mv
rm -r
```

## **🔍 Search**

``` bash
find
grep
locate
```

## **📊 Disk**

``` bash
df -h
du -sh
```

## **🔄 Transfer**

``` bash
scp
rsync
```

## **🗜️ Compression**

``` bash
tar czvf file.tar.gz
tar xzvf file.tar.gz
```

# **🎯 FINAL SUMMARY**

👉 Linux Commands = system control  
👉 File system = data organization  
👉 Compression = packaging & backup  
👉 rsync = real DevOps tool  
👉 find + grep = debugging power

**📘 Chapter 16: Linux Troubleshooting, Access Control & File System (DevOps Playbook)**

# **🧠 1. Troubleshooting Mindset**

Before running commands:

👉 Ask:

- What is broken?
- When did it break?
- What changed?
- Is it reproducible?

👉 DevOps rule:  
**Never guess → always verify**

# **🔍 2. Layer-Based Troubleshooting (CRITICAL)**

Always debug in this order:

Hardware → OS → Process → Network → Application

👉 Example:  
App not working?

- Is server up?
- Is service running?
- Is port open?
- Is API responding?

# **⚙️ 3. System Health Check**

## **📊 CPU / Load**

``` bash
top
htop
uptime
```

## **📊 Memory**

    free -h

vmstat 1

👉 High load = CPU bottleneck  
👉 High memory = possible leak

# **💾 4. Disk & File System Issues**

## **📌 Disk usage**

``` bash
df -h
```

## **📌 Directory size**

``` bash
du -sh *
```

## **📌 Block devices**

``` bash
lsblk
```

## **📌 Disk errors**

    dmesg | grep -i error

## **📌 Filesystem check**

fsck /dev/sda1

👉 DevOps issues:

- Disk full → app crash
- inode full → cannot create files

# **🌐 5. Network Troubleshooting**

## **📌 Check IP**

ip a

## **📌 Connectivity**

``` bash
ping 8.8.8.8
```

## **📌 DNS**

dig google.com

    nslookup google.com

## **📌 Ports**

``` bash
ss -tuln
```

## **📌 Test API**

``` bash
curl -v http://service
```

## **📌 Route path**

    traceroute google.com

👉 DevOps:

- API down = network OR service
- DNS failure = domain issue

# **📜 6. Logs (MOST IMPORTANT)**

## **📁 Key logs**

/var/log/syslog

/var/log/auth.log

/var/log/nginx/

/var/log/mysql/

## **📊 View logs**

``` bash
tail -n 50 /var/log/syslog
journalctl -xe
journalctl -u nginx
```

👉 Rule:  
**Logs = truth**

# **⚙️ 7. Service Troubleshooting**

``` bash
systemctl status nginx
journalctl -u nginx -b
systemctl restart nginx
```

👉 Check:

- running?
- failed?
- dependency issue?

# **🔑 8. Permission Issues**

## **📌 Symptoms:**

- permission denied
- script not running

## **📌 Fix:**

``` bash
ls -l file
chmod +x script.sh
chown user:group file
```

👉 Very common in:

- deployments
- scripts

# **🔄 9. Process Issues**

``` bash
ps -ef
ps aux --sort=-%cpu
ps aux --sort=-%mem
```

## **Kill process**

kill PID

    pkill nginx

👉 Detect:

- CPU hog
- memory leak

# **🧪 10. Application Debugging**

## **Bash**

``` bash
bash -x script.sh
```

## **API debug**

``` bash
curl -v http://api
```

## **Python**

``` bash
python3 -m pdb script.py
```

👉 Used in:

- CI/CD
- scripts
- microservices

# **🐘 11. Database Troubleshooting**

``` bash
systemctl status mysql
```

mysql -u root -p

mysqladmin ping

## **Logs:**

/var/log/mysql/error.log

👉 Common issues:

- DB down
- connection refused

# **📦 12. Package Issues**

## **Ubuntu**

``` bash
apt update
apt install -f
dpkg --configure -a
```

## **RHEL**

``` bash
yum clean all
yum check
```

👉 Fix broken installs

# **🔁 13. Recovery Commands**

reboot

shutdown now

``` bash
mount -o remount,rw /
```

👉 Emergency recovery

# **🧰 14. Advanced Tools**

## **📌 lsof**

    lsof -i :80

## **📌 strace**

    strace -p PID

## **📌 tcpdump**

tcpdump -i eth0

## **📌 ncdu**

ncdu /

👉 Used in deep debugging

# **🧪 15. Real DevOps Scenarios**

## **🔴 Scenario 1: App not working**

``` bash
systemctl status app
journalctl -u app
ss -tuln | grep 8080
```

## **🔴 Scenario 2: High CPU**

``` bash
top
ps aux --sort=-%cpu
```

kill PID

## **🔴 Scenario 3: Disk full**

``` bash
df -h
du -sh *
```

## **🔴 Scenario 4: API failure**

``` bash
ping
dig
curl -v
```

# **⚠️ 16. Common Mistakes**

❌ Restarting without checking logs  
❌ Ignoring disk space  
❌ Killing wrong process  
❌ Not checking permissions

# **🎯 17. Troubleshooting Checklist**

✔ Service running?  
✔ Port open?  
✔ Network reachable?  
✔ Logs show errors?  
✔ Disk/memory OK?  
✔ Permissions correct?  
✔ Recent changes?

# **🎯 FINAL SUMMARY**

👉 Troubleshooting = systematic thinking  
👉 Logs = first priority  
👉 Layers = debug step by step  
👉 Tools = only after understanding problem

**📘 Chapter 17: Bash Scripting (CRITICAL 🚨 DevOps Automation)**

# **🧠 1. What is Bash Scripting?**

Bash scripting = writing a file with commands that Linux executes automatically.

👉 Instead of typing commands manually:

``` bash
mkdir project
```

cd project

touch file.txt

👉 You write a script:

``` bash
#!/bin/bash
mkdir project
```

cd project

touch file.txt

### **📌 Why DevOps Needs Bash?**

- Automation 🔁
- Server setup ⚙️
- CI/CD pipelines 🚀
- Monitoring scripts 📊

👉 **Bash = backbone of automation**

# **⚙️ 2. Creating & Running Scripts**

## **📌 Step 1: Create script**

``` bash
nano script.sh
```

## **📌 Step 2: Add Shebang**

``` bash
#!/bin/bash
```

👉 Tells system: use Bash interpreter

## **📌 Step 3: Make executable**

``` bash
chmod +x script.sh
```

## **📌 Step 4: Run script**

    ./script.sh

OR

``` bash
bash script.sh
```

# **🔤 3. Variables**

## **📌 Define variable**

    name="Charlie"

## **📌 Use variable**

``` bash
echo "Hello $name"
```

## **⚠️ Rules:**

❌ `name = Charlie` (wrong)  
✔ `name="Charlie"` (correct)

## **🌍 Environment Variables**

``` bash
echo $HOME
echo $USER
echo $PATH
```

# **📥 4. User Input**

    read -p "Enter your name: " name
    echo "Welcome $name"

👉 Used in:

- interactive scripts
- deployment tools

# **🔀 5. if / else Conditions**

## **📌 Basic Syntax**

    if [ condition ]
    then
    command
    else
    command
    fi

## **📌 Example**

    if [ $USER == "root" ]
    then
    echo "You are root"
    else
    echo "Normal user"
    fi

## **📌 File check**

    if [ -f file.txt ]; then
    echo "File exists"
    fi

## **📌 Operators**

-e \# exists

-f \# file

-d \# directory

# **🔁 6. Loops**

## **🔹 FOR Loop**

    for i in 1 2 3
    do
    echo $i
    done

## **🔹 Loop through files**

    for file in *.log
    do
    echo $file
    done

## **🔹 WHILE Loop**

    count=1
    while [ $count -le 5 ]
    do
    echo $count

((count++))

    done

👉 DevOps use:

- process logs
- batch operations

# **🧩 7. Functions**

    myfunc() {
    echo "Hello DevOps"
    }

Call:

myfunc

## **📌 With arguments**

    greet() {
    echo "Hello $1"
    }

greet Charlie

👉 Used in:

- reusable automation
- modular scripts

# **🎯 8. Script Arguments**

``` bash
echo $1
echo $2
```

Run:

    ./script.sh hello world

👉 Output:

hello

world

## **📌 All arguments**

``` bash
echo $@
```

## **📌 Number of arguments**

``` bash
echo $#
```

# **🔢 9. Exit Codes (\$?)**

ls file.txt

``` bash
echo $?
```

## **📌 Meaning:**

- `0` → success ✅
- `1+` → error ❌

👉 DevOps use:

    if [ $? -ne 0 ]; then
    echo "Command failed"
    fi

# **📂 10. File Handling**

    if [ -d "/home/user" ]; then
    echo "Directory exists"
    fi
    mkdir backup

cp file.txt backup/

# **📜 11. Text Processing (VERY IMPORTANT)**

## **🔍 grep**

``` bash
grep "error" logfile
```

## **✂️ sed**

``` bash
sed 's/dev/prod/g' file.txt
```

## **📊 awk**

``` bash
awk '{print $1}' file.txt
```

👉 Used in:

- log analysis
- automation pipelines

# **🔐 12. Permissions**

``` bash
chmod +x script.sh
```

👉 Without execute permission:  
script will not run

# **🧪 13. Debugging Scripts**

## **📌 Debug mode**

``` bash
bash -x script.sh
```

## **📌 Exit on error**

    set -e

## **📌 Print commands**

    set -x

👉 Very important in CI/CD

# **🧰 14. Best Practices (DevOps Level)**

✔ Always use shebang  
✔ Use meaningful variable names  
✔ Handle errors (`$?`)  
✔ Use functions  
✔ Use logs

Example:

``` bash
#!/bin/bash
set -e
echo "Starting deployment..."
```

# **🚀 15. Real DevOps Use Cases**

## **🔹 Backup Script**

``` bash
#!/bin/bash
tar czvf backup_$(date +%F).tar.gz /var/www
```

## **🔹 Service Check**

``` bash
systemctl is-active nginx
```

## **🔹 Log Monitoring**

``` bash
grep "ERROR" /var/log/syslog
```

## **🔹 Deployment Script**

``` bash
git pull
```

docker build -t app .

``` bash
docker run -d app
```

# **🧠 16. Common Mistakes**

❌ Missing shebang  
❌ Wrong variable syntax  
❌ Not checking errors  
❌ Hardcoding paths  
❌ No logging

# **🎯 17. Final Cheat Sheet**

## **🔤 Variables**

    name="charlie"
    echo $name

## **🔀 Condition**

    if [ -f file ]; then
    echo "exists"
    fi

## **🔁 Loop**

    for i in {1..5}; do echo $i; done

## **🎯 Arguments**

\$1 \$2 \$@

## **🔢 Exit**

``` bash
echo $?
```

# **🎯 FINAL DEVOPS SUMMARY**

👉 Bash = automation engine  
👉 Scripts = repeatable operations  
👉 Conditions = decision making  
👉 Loops = scalability  
👉 Logs + exit codes = reliability

**📘 Chapter 18: Security & SSH (VERY IMPORTANT 🔐 DevOps Level)**

# **🧠 1. Linux Security Basics**

### **📌 Why Security Matters?**

- Servers are exposed to internet 🌐
- Attackers scan ports constantly
- Weak config = instant breach

👉 DevOps principle:  
**“Secure by default, not after attack”**

# **🔐 2. What is SSH?**

SSH (Secure Shell) = secure remote login protocol

``` bash
ssh user@server_ip
```

👉 Used for:

- AWS EC2 access
- server management
- deployments

### **🔒 Why SSH is secure?**

- encrypted communication
- authentication system

# **🔑 3. SSH Key Authentication (CRITICAL)**

## **📌 Step 1: Generate key pair**

    ssh-keygen -t rsa -b 4096

## **📌 Step 2: Copy public key to server**

    ssh-copy-id user@server_ip

OR manually:

``` bash
cat ~/.ssh/id_rsa.pub
```

→ paste into:

    ~/.ssh/authorized_keys

## **📌 Step 3: Login without password**

``` bash
ssh user@server_ip
```

👉 How it works:

- Private key → stays on your machine
- Public key → stored on server

👉 DevOps rule:  
**Never use password login in production**

# **🚫 4. Disable Password Login (IMPORTANT HARDENING)**

Edit SSH config:

``` bash
sudo nano /etc/ssh/sshd_config
```

Change:

PasswordAuthentication no

PermitRootLogin no

Restart SSH:

``` bash
sudo systemctl restart ssh
```

⚠️ WARNING:  
👉 Do NOT disable password login before SSH key works  
(Otherwise you lock yourself out)

# **👤 5. Secure EC2 / Server Access**

## **✅ Best Practices:**

✔ Use SSH keys only  
✔ Disable root login  
✔ Use non-root user  
✔ Use security groups (cloud firewall)

## **📌 Example:**

``` bash
ssh -i key.pem ubuntu@ec2-ip
```

## **🔐 Restrict access (AWS Security Group):**

- Allow port 22 only from your IP

👉 DevOps:

- No open SSH to world ❌

# **🔥 6. Firewall Management**

## **🟦 UFW (Ubuntu)**

``` bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## **🟥 Deny access**

``` bash
sudo ufw deny 23
```

## **📊 Check status**

``` bash
sudo ufw status
```

## **🟥 Firewalld (RHEL)**

``` bash
sudo firewall-cmd --add-service=http --permanent
sudo firewall-cmd --reload
```

👉 DevOps:

- Only open required ports
- Everything else = blocked

# **👑 7. Sudo Security Policies**

## **📌 Grant sudo**

``` bash
sudo usermod -aG sudo user
```

## **📌 Secure sudo (best practice)**

``` bash
sudo visudo
```

Example:

user ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx

👉 Principle:  
**Least Privilege**

- user gets only required permissions

# **🔐 8. File & Permission Security**

## **📌 Sensitive files**

``` bash
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh
```

## **📌 Ownership**

``` bash
chown user:user file
```

👉 DevOps:

- protect secrets
- protect config files

# **🧪 9. SSH Hardening (Advanced)**

Edit:

/etc/ssh/sshd_config

## **🔐 Recommended:**

PermitRootLogin no

PasswordAuthentication no

PubkeyAuthentication yes

Port 2222

👉 Change default port (optional)

- reduces automated attacks

# **🛡️ 10. Fail2Ban (Brute Force Protection)**

## **📌 Install**

``` bash
sudo apt install fail2ban
```

## **📌 Start**

``` bash
sudo systemctl enable fail2ban
```

👉 Blocks IP after multiple failed login attempts

# **🔍 11. Security Logs**

## **📁 Important logs:**

/var/log/auth.log

## **📊 Check login attempts**

``` bash
grep "Failed password" /var/log/auth.log
```

## **📊 SSH logs**

``` bash
journalctl -u ssh
```

👉 Logs = detect attacks

# **🚀 12. DevOps Security Best Practices**

✔ Use SSH keys only  
✔ Disable root login  
✔ Enable firewall  
✔ Monitor logs  
✔ Rotate keys regularly  
✔ Use least privilege

👉 Cloud:

- use IAM roles (AWS)
- avoid hardcoded credentials

# **⚠️ 13. Common Mistakes**

❌ Using password login  
❌ Opening all ports  
❌ Using root user  
❌ chmod 777 everywhere  
❌ Not checking logs

# **🎯 14. Final Security Checklist**

✔ SSH key authentication enabled  
✔ Password login disabled  
✔ Root login disabled  
✔ Firewall enabled  
✔ Only required ports open  
✔ Logs monitored  
✔ Sudo restricted

**📘 Chapter 19: DevOps Troubleshooting Mastery 🚨 (Production Playbook)**

# **🧠 1. DevOps Troubleshooting Mindset**

When something breaks in production:

❌ Don’t panic  
❌ Don’t randomly restart

👉 Think like this:

- What is the **symptom**?
- What is the **root cause**?
- What **changed recently**?

👉 Golden Rule:  
**“Observe → Analyze → Act”**

# **🔄 2. Standard Debugging Flow (CRITICAL)**

Always follow this order:

User Issue → Service → Logs → System → Network → Fix

## **📌 Example:**

User: “Website down”

👉 You check:

1.  Is service running?
2.  Is port open?
3.  Are logs showing errors?
4.  Is CPU/memory overloaded?
5.  Is network reachable?

👉 This flow = **real DevOps thinking**

# **🔥 3. CPU 100% Debugging Flow**

## **📊 Step 1: Check CPU usage**

``` bash
top
```

## **📊 Step 2: Find heavy process**

``` bash
ps aux --sort=-%cpu | head
```

## **🔍 Step 3: Investigate process**

``` bash
ps -fp PID
```

## **🔪 Step 4: Kill if necessary**

kill PID

``` bash
kill -9 PID
```

## **🧠 Step 5: Root cause**

Ask:

- Infinite loop?
- Bad deployment?
- Traffic spike?

👉 DevOps Insight:  
High CPU is usually:

- bad code
- traffic surge
- stuck process

# **🧠 4. Memory Leak Detection**

## **📊 Step 1: Check memory**

    free -h

## **📊 Step 2: Identify process**

``` bash
ps aux --sort=-%mem | head
```

## **📊 Step 3: Monitor growth**

    watch -n 1 "ps aux --sort=-%mem | head"

## **🔍 Step 4: Check swap**

swapon --show

👉 Symptoms:

- memory keeps increasing
- system becomes slow
- OOM (Out of Memory)

👉 DevOps Fix:

- restart service
- fix application code

# **💾 5. Disk Full Incident Handling**

## **📊 Step 1: Check disk**

``` bash
df -h
```

## **📂 Step 2: Find large files**

``` bash
du -sh /* 2>/dev/null
```

## **📂 Step 3: Drill down**

``` bash
du -sh /var/*
```

## **📜 Step 4: Check logs**

``` bash
du -sh /var/log/*
```

## **🔥 Step 5: Cleanup**

truncate -s 0 /var/log/syslog

OR

rm old.log

👉 Common cause:

- logs filling disk
- backups not rotated

👉 DevOps Tip:  
**Always configure log rotation**

# **⚙️ 6. Broken Service Recovery**

## **📊 Step 1: Check status**

``` bash
systemctl status nginx
```

## **📜 Step 2: Check logs**

``` bash
journalctl -u nginx -n 50
```

## **🔍 Step 3: Verify config**

nginx -t

## **🔁 Step 4: Restart service**

``` bash
systemctl restart nginx
```

👉 Common issues:

- wrong config
- port already in use
- permission issues

# **📜 7. Log-Driven Debugging (MOST IMPORTANT)**

## **📌 Always start with logs**

``` bash
tail -f /var/log/syslog
```

## **📌 Service logs**

``` bash
journalctl -u service
```

## **📌 Search errors**

``` bash
grep -i error /var/log/syslog
```

👉 DevOps truth:  
**Logs never lie**

# **🌐 8. Network & API Debugging**

## **📡 Step 1: Connectivity**

ping google.com

## **📡 Step 2: DNS**

dig google.com

## **📡 Step 3: API test**

``` bash
curl -v http://service
```

## **📡 Step 4: Ports**

``` bash
ss -tuln
```

👉 Common issues:

- DNS failure
- firewall blocking
- service not listening

# **🔁 9. Process & Resource Correlation**

👉 Always connect:

| **Problem**  | **Cause**    |
|--------------|--------------|
| High CPU     | bad process  |
| High RAM     | memory leak  |
| Disk full    | logs/backups |
| Service down | config/crash |

👉 DevOps skill:  
**connect symptoms to root cause**

# **🧪 10. Real Incident Scenarios**

## **🔴 Scenario 1: Website Down**

``` bash
systemctl status nginx
ss -tuln | grep 80
curl localhost
```

## **🔴 Scenario 2: Server Slow**

``` bash
top
free -h
df -h
```

## **🔴 Scenario 3: API Not Responding**

``` bash
curl -v api_url
journalctl -u app
```

## **🔴 Scenario 4: Disk Full**

``` bash
df -h
du -sh /var/log/*
```

# **⚠️ 11. Common Mistakes**

❌ Restarting without checking logs  
❌ Ignoring disk space  
❌ Killing wrong process  
❌ Not checking permissions  
❌ Using `kill -9` blindly

# **🎯 12. Final Incident Checklist**

Before fixing:

✔ What is broken?  
✔ Which service?  
✔ Logs checked?  
✔ System health OK?  
✔ Network OK?  
✔ Recent changes?

After fixing:

✔ Issue resolved?  
✔ Root cause identified?  
✔ Prevention added?

# **🚀 REAL DEVOPS INSIGHT**

In production:

👉 Speed matters  
👉 Accuracy matters more

👉 Senior engineers:

- don’t guess
- follow process
- trust logs

# **⚡ FINAL SUMMARY**

👉 CPU issue → find process  
👉 Memory issue → detect leak  
👉 Disk issue → clean logs  
👉 Service issue → check logs + config  
👉 Network issue → ping + curl + ports

**📘 Chapter 20: systemd vs Docker vs Kubernetes**

# **🧠 Big Picture (One-Line Each)**

- **systemd → manages processes on a single Linux machine**
- **Docker → packages apps into portable containers**
- **Kubernetes → manages containers across many machines (cluster)**

# **🏗️ 1. The Stack View (How they fit together)**

    Kubernetes (cluster orchestration)
    ↑
    Docker (containers)
    ↑
    systemd (OS process manager)
    ↑
    Linux OS

**👉 In real production:**

- **Linux runs systemd**
- **systemd can start Docker**
- **Docker runs containers**
- **Kubernetes manages those containers at scale**

# **⚙️ 2. systemd (Foundation Layer)**

## **🎯 Purpose:**

**Control services on one server**

### **What it does:**

- **Start/stop services**
- **Auto-restart on crash**
- **Manage boot process**
- **Provide logs (**`journalctl`**)**

### **Example:**

``` bash
systemctl start nginx
systemctl status myapp
```

## **✅ When to use systemd:**

- **Running apps on single VM/server**
- **Small projects**
- **Background services (API, scripts)**

## **❌ Limitations:**

- **No scaling**
- **No isolation**
- **Not portable**

# **📦 3. Docker (Packaging Layer)**

## **🎯 Purpose:**

**Package app + dependencies into a container**

### **What it does:**

- **Ensures app runs same everywhere**
- **Isolates environment**
- **Easy deployment**

## **Example:**

``` bash
docker run nginx
```

## **✅ When to use Docker:**

- **App portability**
- **Microservices**
- **Consistent environments**

## **❌ Limitations:**

- **No orchestration (alone)**
- **Manual scaling**
- **No auto-healing**

# **☸️ 4. Kubernetes (Orchestration Layer)**

## **🎯 Purpose:**

**Manage containers across multiple servers**

## **What it does:**

- **Auto-scaling**
- **Self-healing**
- **Load balancing**
- **Rolling deployments**

## **Example:**

``` bash
kubectl get pods
```

## **✅ When to use Kubernetes:**

- **Production systems**
- **High availability apps**
- **Microservices architecture**

## **❌ Limitations:**

- **Complex**
- **Learning curve**
- **Overkill for small apps**

# **⚔️ 5. Direct Comparison**

| **Feature**      | **systemd**       | **Docker**           | **Kubernetes** |
|------------------|-------------------|----------------------|----------------|
| **Level**        | **OS**            | **App packaging**    | **Cluster**    |
| **Scope**        | **Single server** | **Single container** | **Multi-node** |
| **Scaling**      | **❌**            | **❌**               | **✔**          |
| **Auto-healing** | **Limited**       | **❌**               | **✔**          |
| **Portability**  | **❌**            | **✔**                | **✔**          |
| **Complexity**   | **Low**           | **Medium**           | **High**       |

# **🧪 6. Real DevOps Scenario**

## **🔹 Stage 1: Beginner (systemd)**

**👉 Run app directly:**

**node app.js**

**Convert to service:**

``` bash
systemctl start myapp
```

## **🔹 Stage 2: Intermediate (Docker)**

**👉 Containerize:**

**docker build -t myapp .**

``` bash
docker run myapp
```

## **🔹 Stage 3: Advanced (Kubernetes)**

**👉 Deploy:**

``` bash
kubectl apply -f deployment.yaml
```

# **🛣️ 7. Learning Roadmap (Step-by-Step)**

## **🟢 Step 1: Master systemd (YOU ARE HERE)**

**✔ Create services  
✔ Auto-restart apps  
✔ Debug logs**

**👉 Goal:  
Run your app reliably on one server**

## **🟡 Step 2: Learn Docker**

**Focus on:**

- **Dockerfile**
- **Images vs containers**
- **Volumes**
- **Networking**

**👉 Goal:  
Make app portable**

## **🔵 Step 3: Docker + systemd**

**👉 Run Docker as service:**

``` bash
systemctl status docker
```

**👉 Run containers at boot**

## **🔴 Step 4: Learn Kubernetes**

**Focus on:**

- **Pods**
- **Deployments**
- **Services**
- **Ingress**

**👉 Goal:  
Run app across multiple servers**

## **⚫ Step 5: Production DevOps**

- **CI/CD (GitHub Actions)**
- **Monitoring**
- **Scaling**
- **Cloud (AWS, etc.)**

# **🔥 8. Real Production Architecture**

    User → Load Balancer → Kubernetes
    ↓
    Pods (Docker containers)
    ↓
    Node (Linux + systemd)

# **🧠 9. Simple Analogy**

| **Tool**       | **Analogy**               |
|----------------|---------------------------|
| **systemd**    | **Engine starter**        |
| **Docker**     | **Shipping container**    |
| **Kubernetes** | **Shipping port manager** |

# **⚠️ 10. Common Mistakes**

### **❌ Using Kubernetes too early**

**👉 Start with systemd + Docker**

### **❌ Ignoring systemd**

**👉 Even Docker runs as a service**

### **❌ Thinking Docker replaces systemd**

**👉 Wrong — different roles**

# **🚀 11. DevOps Reality**

**👉 In real jobs:**

- **systemd → always there**
- **Docker → almost always used**
- **Kubernetes → used in scalable systems**

# **🎯 Final Advice (Important)**

**Based on your current level:**

**👉 You should follow this path:**

1.  **✅ systemd (DONE / learning)**
2.  **🔥 Docker (NEXT step)**
3.  **🚀 Kubernetes (AFTER Docker)**

# **📘 Chapter 21: 🐧 Linux Command Practical Guide (Beginner → Real Practice)**

# **🐧 MASTER LINUX COMMANDS (1–300) CATEGORY WISE**

# **📁 1. FILE & DIRECTORY MANAGEMENT (1–25)**

### **1–10 Basic Navigation & Files**

1.  **ls – Lists files and folders.  
    > 👉 Example:** `ls`

2.  **ls -al – Shows detailed list including hidden files.  
    > 👉** `ls -al`

3.  **pwd – Shows current directory path.  
    > 👉** `pwd`

4.  **cd /path – Changes directory.  
    > 👉** `cd /home/user`

5.  **cd .. – Moves one level up.  
    > 👉** `cd ..`

6.  **mkdir folder – Creates new folder.  
    > 👉** `mkdir test`

7.  **rmdir folder – Removes empty folder.  
    > 👉** `rmdir test`

8.  **rm -rf folder – Deletes folder forcefully.  
    > 👉** `rm -rf test`

9.  **touch file – Creates empty file.  
    > 👉** `touch app.txt`

10. **cat file – Shows file content.  
    > 👉** `cat app.txt`

11. **tac file – Shows file in reverse.  
    > 👉** `tac app.txt`

12. **nano file – Opens nano editor.  
    > 👉** `nano app.txt`

13. **vim file – Opens Vim editor.  
    > 👉** `vim app.txt`

14. **vi file – Opens Vi editor.  
    > 👉** `vi app.txt`

15. **echo text – Prints text.  
    > 👉** `echo "Hello"`

16. **echo \> file – Overwrites file.  
    > 👉** `echo "Hi" > a.txt`

17. **echo \>\> file – Appends text.  
    > 👉** `echo "Hi" >> a.txt`

18. **cp file1 file2 – Copies file.  
    > 👉** `cp a.txt b.txt`

19. **cp -r dir – Copies directory.  
    > 👉** `cp -r dir1 dir2`

20. **mv file newname – Renames file.  
    > 👉** `mv a.txt b.txt`

21. **mv file dir/ – Moves file.  
    > 👉** `mv a.txt /tmp`

22. **rm file – Deletes file.  
    > 👉** `rm a.txt`

23. **find / – Searches files.  
    > 👉** `find / -name a.txt`

24. **find . -type f – Finds files only.  
    > 👉** `find . -type f`

25. **locate file – Fast file search index.  
    > 👉** `locate a.txt`

# **🔍 2. TEXT PROCESSING (26–60)**

26. **updatedb – Updates locate database**
27. **grep – Search text in file  
    > 👉** `grep error log.txt`

28. **grep -i – Case insensitive search**
29. **grep -r – Recursive search**
30. **awk '{print \$1}' – Print column**
31. **sed 's/a/b/' – Replace text**
32. **sort – Sort lines**
33. **uniq – Remove duplicates**
34. **wc -l – Count lines**
35. **head -n 10 – First 10 lines**
36. **tail -n 10 – Last 10 lines**
37. **tail -f – Live log view**
38. **cut -d':' – Split text**
39. **paste – Merge files**
40. **tee – Output + save**
41. **diff – Compare files**
42. **cmp – Byte comparison**
43. **stat – File details**
44. **file – File type**
45. **xargs – Pass input as argument**
46. **yes – Repeat text**
47. **watch – Run repeatedly**
48. **basename – Get filename**
49. **dirname – Get path**

# **⚙️ 3. SYSTEM MONITORING (61–110)**

61. **df -h – Disk usage**
62. **du -sh – Folder size**
63. **free -m – Memory usage**
64. **uptime – System running time**
65. **who – Logged users**
66. **whoami – Current user**
67. **id – User ID info**
68. **groups – User groups**
69. **ps aux – Running processes**
70. **top – Live processes**
71. **htop – Better top**
72. **kill -9 PID – Kill process**
73. **pkill – Kill by name**
74. **killall – Kill all process**
75. **jobs – Background jobs**
76. **fg – Foreground job**
77. **bg – Background job**
78. **nohup – Run background**
79. **crontab -e – Schedule jobs**
80. **history – Command history**
81. **chmod 755 – Permissions**
82. **chown – Change owner**
83. **chgrp – Change group**
84. **df -i – inode usage**
85. **du -a – file size list**
86. **tar -cvf – create archive**
87. **tar -xvf – extract**
88. **zip/unzip – compression**
89. **scp – secure copy**
90. **rsync – sync files**

# **🌐 4. NETWORKING (111–160)**

111. **ping – Test connection**
112. **traceroute – Route path**
113. **netstat – Network stats**
114. **ss – socket stats**
115. **ip a – IP address**
116. **ifconfig – old network tool**
117. **hostname – system name**
118. **curl – API request**
119. **wget – download file**
120. **scp – secure copy**
121. **ssh – remote login**
122. **nc – netcat tool**
123. **tcpdump – packet capture**
124. **iptables – firewall rules**
125. **ufw – firewall tool**
126. **firewall-cmd – firewall control**
127. **dhclient – DHCP request**
128. **nmcli – network manager**
129. **ip link – interface control**
130. **lsof -i – ports in use**

# **💾 5. DISK & STORAGE (161–200)**

161. **lsblk – disks list**
162. **blkid – UUID info**
163. **mount – attach disk**
164. **umount – detach disk**
165. **fdisk -l – partition list**
166. **mkfs.ext4 – format disk**
167. **fsck – check disk**
168. **tune2fs – tune filesystem**
169. **swapoff/swapon – swap control**
170. **df -T – filesystem type**
171. **du -ch – total size**
172. **iostat – disk stats**
173. **iotop – disk usage**
174. **lsusb – USB devices**
175. **lspci – PCI devices**

# **🧠 6. SYSTEM INFO & PERFORMANCE (201–230)**

201. **uname -a – system info**
202. **lscpu – CPU details**
203. **dmidecode – hardware info**
204. **vmstat – system stats**
205. **mpstat – CPU stats**
206. **sar – performance report**
207. **dstat – live stats**
208. **nice – process priority**
209. **renice – change priority**
210. **ulimit – limits**
211. **uptime -p – uptime simple**
212. **journalctl – logs**
213. **dmesg – kernel logs**
214. **systemctl – service control**
215. **service – old service tool**

# **🔐 7. USERS & PERMISSIONS (231–260)**

231. **useradd – create user**
232. **usermod – modify user**
233. **deluser – remove user**
234. **groupadd – add group**
235. **groupdel – delete group**
236. **passwd – password change**
237. **chage – password expiry**
238. **chmod – permissions**
239. **chown – owner change**
240. **setfacl – ACL permissions**
241. **getfacl – view ACL**
242. **ssh-keygen – generate key**
243. **ssh-copy-id – copy key**
244. **chmod 600 key – secure key**
245. **sudo – admin command**

# **🧩 8. SYSTEM CONTROL (261–300)**

261. **systemctl start – start service**
262. **stop – stop service**
263. **restart – restart service**
264. **enable – auto start**
265. **disable – disable service**
266. **reboot – restart system**
267. **poweroff – shutdown**
268. **shutdown -h – halt system**
269. **shutdown -r – reboot delay**
270. **wall – message users**
271. **exit – logout**
272. **crontab – scheduler**
273. **at – one-time job**
274. **timedatectl – time settings**
275. **hwclock – hardware clock**
276. **logrotate – log cleanup**
277. **find + delete – cleanup files**
278. **journalctl -f – live logs**
279. **systemctl status – service status**
280. **ip route – routing table**
281. **iptables-save – save firewall**
282. **iptables-restore – restore firewall**
283. **nc -zv – port check**
284. **ssh -p – custom port SSH**
285. **eval ssh-agent – SSH agent**
286. **echo \$? – last command status**
287. **time command – execution time**
288. **cal – calendar**
289. **env – environment vars**
290. **export – set env variable**
291. **unset – remove variable**
292. **alias – shortcut command**
293. **unalias – remove alias**
294. **history !n – run history**
295. **xargs rm – batch delete**
296. **lsattr – file attributes**
297. **chattr +i – lock file**
298. **watch df – live disk**
299. **systemctl daemon-reload – reload system**
300. **exit – close shell**

# **☁️ Linux DevOps Command Handbook**

## **(Service, Monitoring, Process, Storage & Filesystem Management)**

# **SECTION 1 — Service Management**

## `⭐ systemctl — Service Control & Management (CORE)`

### **Purpose**

**Manage Linux services like start, stop, restart, and monitoring using systemd.**

### **Why DevOps Uses It**

- **Controls production services (nginx, docker, mysql, ssh)**
- **Restarts services after configuration changes**
- **Helps debug service failures**
- **Used in automation & deployment pipelines**

### **Commands (Examples)**

``` bash
systemctl start nginx # Start service
systemctl stop nginx # Stop service
systemctl restart nginx # Restart service
systemctl reload nginx # Reload config without restart
systemctl status nginx # Check service status + logs
systemctl enable nginx # Start on boot
systemctl disable nginx # Disable auto-start
systemctl is-active nginx # Check if running
systemctl is-enabled nginx # Check boot status
systemctl list-units --type=service # List services
systemctl --failed # Show failed services
```

# **SECTION 2 — Log Management & Debugging**

## `⭐ journalctl & /var/log — Log Analysis (CORE)`

### **Purpose**

**Used to view system, application, and kernel logs for debugging.**

### **Why DevOps Uses It**

- **Debug service crashes**
- **Investigate system failures**
- **Analyze authentication issues**
- **Review past boot logs**

### **Commands**

``` bash
journalctl -xe # Show recent errors
journalctl -u nginx -f # Live logs for nginx
journalctl -u docker --since "1 hour ago"
journalctl --boot # Logs since last boot
journalctl -p 3 -xb # Show critical errors only
journalctl --disk-usage # Log storage usage
dmesg | tail # Kernel logs
tail -f /var/log/syslog # Live system logs
tail -200 /var/log/auth.log # SSH/Auth logs
less /var/log/nginx/error.log # Web server logs
```

# **SECTION 3 — Process, CPU & System Monitoring**

## `⭐ ps aux — Process Viewer (CORE)`

### **Purpose**

**Displays all running processes.**

### **Commands**

``` bash
ps aux # List all processes
ps aux --sort=-%cpu | head # Top CPU processes
ps aux --sort=-%mem | head # Top memory processes
ps aux | grep nginx # Search process
```

## `⭐ top — Real-time Process Monitor (CORE)`

``` bash
top
# Press:
# P → Sort by CPU
# M → Sort by Memory
```

## `⭐ htop — Interactive Monitor (INTERMEDIATE)`

    htop
    # F6 → Sort
    # F5 → Tree view
    # F9 → Kill process

## `⭐ uptime — System Load (BASIC)`

**uptime \# Load average + uptime**

    uptime -p # Human readable uptime
    uptime -s # System start time

## `⭐ free -h — Memory Usage (BASIC)`

    free -h
    free -m
    free -g
    watch -n 1 free -h

## `⭐ vmstat — CPU & Memory Stats (INTERMEDIATE)`

**vmstat 1 5**

**vmstat -s**

**vmstat -d**

**vmstat -p /dev/sda1**

## `⭐ iostat — Disk Performance (ADVANCED)`

**iostat -xz 1**

**iostat -m**

**iostat -p**

## `⭐ mpstat — CPU Core Usage (ADVANCED)`

**mpstat -P ALL 2**

**mpstat -u**

## `⭐ sar — Historical Monitoring (ADVANCED)`

**sar -u 1 5**

**sar -r**

**sar -n DEV**

**sar -b**

## `⭐ pmap — Process Memory Map (ADVANCED)`

**pmap \<PID\>**

**pmap -x \<PID\>**

# **SECTION 4 — Background Jobs & Process Control**

## `⭐ sleep — Delay Execution`

    sleep 5
    sleep 1m
    sleep 200 &

## `⭐ jobs — View Background Jobs`

    jobs
    jobs -l
    jobs -r

## `⭐ fg / bg — Foreground & Background Control`

    fg %1 # Bring job to foreground
    bg %1 # Send job to background

## `⭐ nohup — Run After Logout`

    nohup script.sh &
    nohup command > output.log 2>&1 &

## `⭐ disown — Detach Process`

**disown -h %1**

**disown -a**

## `⭐ kill / pkill / killall`

``` bash
kill <PID>
kill -9 <PID>
pkill nginx
pkill -f python
killall node
```

## `⭐ nice / renice — Priority Control`

    nice -n 10 command
    renice -n -5 -p <PID>

# **SECTION 5 — Disk Usage**

## `⭐ df — Disk Space (CORE)`

``` bash
df -h
df -i
df -T
df --total
```

## `⭐ du — Folder Size`

``` bash
du -sh *
du -ah --max-depth=1
du -c
```

# **SECTION 6 — Filesystem & Storage**

## `⭐ lsblk — Disk Info`

``` bash
lsblk
lsblk -f
lsblk -o NAME,SIZE,MOUNTPOINT
```

## `⭐ mount / umount`

``` bash
mount /dev/sdb1 /mnt
umount /mnt
umount -l /mnt
```

## `⭐ blkid — Disk UUID`

    blkid
    blkid /dev/sdb1

## `⭐ fsck — Repair Filesystem`

**fsck /dev/sdb1**

**fsck -y /dev/sdb1**

## `⭐ parted — Partition Tool`

**parted -l**

**parted /dev/sdb print**

## `⭐ mkfs — Format Disk (DANGEROUS)`

**mkfs.ext4 /dev/sdb1**

# **🐧 Linux Basic Commands for Beginners (Cyber Security Foundation)**

Learning Linux commands is the first step in mastering Cyber Security.  
These commands work on Kali Linux, Ubuntu, Debian, Fedora, and other Linux distros.  
Use this guide as a quick reference while practicing. 🚀

## 1️⃣ Navigation (Move around the system)

``` bash
pwd                # Show current directory (Print Working Directory)
ls                 # List files/folders in current directory
ls -la             # Show hidden files with details
cd Desktop         # Move into Desktop folder
cd ..              # Go one step back
```

## 2️⃣ Directory Handling (Folders)

``` bash
mkdir test         # Create a new folder named test
cd test            # Go inside the folder
```

## 3️⃣ File Handling (Create, Read, Write, Append, Multiple files)

``` bash
touch file1.txt    # Create an empty file
ls                 # Verify file creation

# 🟢 cat use cases
cat file1.txt      # Read file content

cat > file1.txt    # Create + Write content
Hello Kali Linux
CTRL + D           # Save & exit

cat file1.txt      # Read file again

cat >> file1.txt   # Append content in existing file
This is my first command practice
CTRL + D           # Save & exit

cat file1.txt      # Read updated file

cat file1.txt file2.txt  # Read multiple files at once
```

## 4️⃣ File Editing (Interactive Editor)

``` bash
nano file1.txt     # Open file in nano editor (write & edit)
```

## 5️⃣ Delete Files & Folders

``` bash
rm file1.txt       # Delete a file
rm -r test         # Delete folder + its contents
```

## 6️⃣ User & System Info

``` bash
whoami             # Show current logged in user
hostname           # Show system hostname
uname -a           # Kernel + OS details
```

## 7️⃣ Networking Basics

    ifconfig           # Show network interfaces (needs net-tools)
    ip addr            # Alternative to ifconfig (modern Linux)
    ping google.com    # Test connectivity
    curl ifconfig.me   # Show your public IP

## 8️⃣ Package Management (Install/Update Tools)

``` bash
sudo apt update            # Update repositories
sudo apt upgrade           # Upgrade all packages
sudo apt install nmap      # Install a tool (e.g., Nmap)
nmap -v google.com         # Simple port scan
```

## 9️⃣ Process Management (Monitor & Kill)

``` bash
ps aux              # Show running processes
top                 # Live process monitoring
kill -9 <PID>       # Kill a process by its ID
```

## 🔟 Permissions & Ownership

``` bash
ls -l               # Show file permissions
chmod 755 file1.txt # Change file permissions
chown user:user file1.txt  # Change file ownership
```

## 1️⃣1️⃣ Search & History

    history             # Show previously used commands
    grep "keyword" file1.txt   # Search for a word inside a file
    man ls              # Manual/help for ls command

## ✅ Why These Commands?

These are must-know Linux commands for anyone starting in Cyber Security & Ethical Hacking.  
Without Linux basics, you cannot effectively use tools like Nmap, Hydra, Metasploit, Aircrack-ng, etc.

# **📘 Linux Command Explanation Guide**

These commands are very important in Linux because they help you understand:

- Where commands are located
- How Linux finds commands
- Which shells are installed
- How environment variables work

# **1️⃣** `which -a ls`

## **📌 What is** `which`**?**

The `which` command shows the **full path** of a command that Linux will execute.

Example:

which ls

Output:

/usr/bin/ls

Meaning:

- When you type `ls`
- Linux actually runs:

/usr/bin/ls

# **📌 What does** `-a` **mean?**

`-a` means:

> Show ALL matching executable files found in PATH.

Normally `which` shows only the first match.

But:

``` bash
which -a ls
```

shows every `ls` command found in all PATH directories.

# **📌 Example**

``` bash
which -a ls
```

Possible Output:

/usr/bin/ls

/bin/ls

# **📌 Why are there multiple results?**

Because Linux searches commands using directories stored inside the `$PATH` variable.

Sometimes:

- `/bin`
- `/usr/bin`

may both contain the same command.

In modern Linux systems:

/bin

is often linked to:

/usr/bin

# **📌 How Linux Finds Commands**

When you type:

``` bash
ls
```

Linux checks directories in this order:

PATH directory 1

PATH directory 2

PATH directory 3

...

First matching executable wins.

# **📌 Real Example**

Suppose PATH contains:

/usr/local/bin:/usr/bin:/bin

Linux searches:

1.  `/usr/local/bin`
2.  `/usr/bin`
3.  `/bin`

If `ls` exists in `/usr/bin`,  
Linux stops there.

# **📌 Difference Between** `which ls` **and** `which -a ls`

| **Command**   | **Meaning**                  |
|---------------|------------------------------|
| `which ls`    | Shows first matching command |
| `which -a ls` | Shows all matching commands  |

# **📌 Another Example**

``` bash
which -a python
```

Possible Output:

/usr/bin/python

/usr/local/bin/python

Meaning:

Multiple Python installations exist.

# **📌 Common Uses**

## **✅ Find command location**

which docker

Output:

/usr/bin/docker

## **✅ Check multiple installations**

``` bash
which -a node
```

Useful when troubleshooting:

- Node.js
- Python
- Java
- Terraform
- Kubectl

# **📌 Important Note**

`which` only searches executable commands in `$PATH`.

It cannot find:

- aliases properly sometimes
- shell built-ins
- functions

For better details use:

type ls

or

    command -v ls

# **📘 Internal Flow of** `which`

    User types command
    ↓
    Shell checks PATH variable
    ↓
    Searches directories one by one
    ↓
    Finds executable file
    ↓
    Returns full path

# **2️⃣** `echo $PATH`

# **📌 What is** `$PATH`**?**

`PATH` is an **environment variable**.

It contains a list of directories where Linux searches for commands.

# **📌 Command**

``` bash
echo $PATH
```

# **📌 Example Output**

/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# **📌 Meaning of** `echo`

`echo` prints text or variable values.

Example:

echo Hello

Output:

Hello

# **📌 Meaning of** `$`

    $ means:

> Access variable value

Example:

\$PATH

means:

> Give me the value stored inside PATH variable.

# **📌 What PATH Actually Contains**

PATH contains directories separated by `:`.

Example:

/usr/local/bin

/usr/bin

/bin

# **📌 How PATH Works**

When you type:

``` bash
docker
```

Linux checks:

/usr/local/bin/docker

/usr/bin/docker

/bin/docker

    until it finds the executable.

# **📌 Why PATH is Important**

Without PATH:

You would need full command paths every time.

Instead of:

``` bash
ls
```

you would need:

/bin/ls

# **📌 PATH Search Order Matters**

Example:

    PATH=/custom/bin:/usr/bin:/bin

Linux searches:

1.  `/custom/bin`
2.  `/usr/bin`
3.  `/bin`

First match wins.

# **📌 Real-World Example**

Suppose two Python versions exist:

/usr/bin/python

/custom/python

If PATH starts with:

/custom

then Linux uses:

/custom/python

first.

# **📌 Add New Directory to PATH**

Temporary:

export PATH=\$PATH:/my/custom/path

Meaning:

- Keep existing PATH
- Add new directory

# **📌 Example**

export PATH=\$PATH:/home/user/scripts

Now scripts in that directory can run directly.

# **📌 Check Individual PATH Entries**

Convert `:` into new lines:

``` bash
echo $PATH | tr ':' '\n'
```

Example Output:

/usr/local/sbin

/usr/local/bin

/usr/sbin

/usr/bin

/sbin

/bin

# **📌 Types of PATH**

| **Type**    | **Description**      |
|-------------|----------------------|
| System PATH | Global for all users |
| User PATH   | Personal user PATH   |

# **📌 PATH Configuration Files**

## **System-wide**

/etc/profile

/etc/environment

## **User-specific**

    ~/.bashrc
    ~/.profile
    ~/.zshrc

# **📌 Security Risk of PATH**

If current directory `.` is added first:

    PATH=.:$PATH

A malicious executable could run accidentally.

Example:

Fake `ls` command in current folder.

# **📘 Internal Working of PATH**

    User types command
    ↓
    Shell reads PATH variable
    ↓
    Checks each directory
    ↓
    Finds executable
    ↓
    Runs executable

# **3️⃣** `cat /etc/shells`

# **📌 What is** `cat`**?**

`cat` means:

> Concatenate and display files.

Most commonly used to display file contents.

# **📌 Command**

``` bash
cat /etc/shells
```

# **📌 What is** `/etc/shells`**?**

It is a system file containing:

> List of valid login shells installed on the system.

# **📌 Example Output**

/bin/sh

/bin/bash

/usr/bin/bash

/bin/rbash

/bin/dash

/usr/bin/zsh

# **📌 Meaning of Shell**

A shell is a program that lets users interact with Linux.

Examples:

| **Shell** | **Description**            |
|-----------|----------------------------|
| Bash      | Most common Linux shell    |
| Zsh       | Advanced interactive shell |
| Sh        | Original Unix shell        |
| Dash      | Lightweight shell          |
| Fish      | User-friendly shell        |

# **📌 Why** `/etc/shells` **is Important**

Linux uses this file to determine:

- Allowed login shells
- Valid shells for users
- FTP/SFTP shell validation
- User account restrictions

# **📌 Check Current Shell**

``` bash
echo $SHELL
```

Example:

/bin/bash

# **📌 Difference Between** `$SHELL` **and** `/etc/shells`

| **Command**       | **Meaning**                |
|-------------------|----------------------------|
| `echo $SHELL`     | Your current/default shell |
| `cat /etc/shells` | All installed valid shells |

# **📌 Change Default Shell**

Command:

chsh -s /bin/zsh

Meaning:

- `chsh` = change shell
- `-s` = specify new shell

# **📌 Why Shell Must Exist in** `/etc/shells`

Linux often refuses invalid shells.

For security reasons:

Only shells listed in `/etc/shells` are trusted.

# **📌 Real Example**

If installing Zsh:

``` bash
sudo apt install zsh
```

Then check:

``` bash
cat /etc/shells
```

You may see:

/usr/bin/zsh

Now you can switch to it.

# **📌 Common Shell Locations**

| **Shell** | **Path**        |
|-----------|-----------------|
| Bash      | `/bin/bash`     |
| Zsh       | `/usr/bin/zsh`  |
| Fish      | `/usr/bin/fish` |
| Dash      | `/bin/dash`     |

# **📌 Internal Working**

    User login
    ↓
    System checks valid shell
    ↓
    Reads /etc/shells
    ↓
    Starts user shell

# **📘 Summary Table**

| **Command**       | **Purpose**                         |
|-------------------|-------------------------------------|
| `which -a ls`     | Shows all locations of `ls` command |
| `echo $PATH`      | Displays command search directories |
| `cat /etc/shells` | Shows installed valid login shells  |

# **📘 Real Beginner Practice Lab**

## **Step 1**

Run:

which ls

## **Step 2**

Run:

``` bash
which -a bash
```

## **Step 3**

Run:

``` bash
echo $PATH
```

## **Step 4**

Run:

``` bash
echo $PATH | tr ':' '\n'
```

## **Step 5**

Run:

``` bash
cat /etc/shells
```

## **Step 6**

Run:

``` bash
echo $SHELL
```

# **📘 Important DevOps Relevance**

These commands are heavily used in:

- Linux administration
- DevOps
- Docker containers
- CI/CD pipelines
- Shell scripting
- Kubernetes troubleshooting
- PATH debugging
- Environment configuration

# **📘 Pro Tip**

For deeper command information use:

man which

man bash

man cat

    or:
    ls --help

# **📘 COMPLETE LINUX + DEVOPS COMMAND HANDBOOK**

## **🌿 INTRODUCTION**

This handbook contains:

- Linux basic commands
- Linux file management commands
- User management commands
- Permission commands
- Process management commands
- Networking commands
- Package management commands
- Disk and storage commands
- Shell scripting related commands
- System monitoring commands
- DevOps commands
- Git commands
- Docker commands
- Kubernetes commands
- AWS CLI commands
- Terraform commands
- Jenkins commands
- Ansible commands
- CI/CD related commands

Every command includes:

✅ Purpose  
✅ Syntax  
✅ Example  
✅ Simple explanation

# **📘 CHAPTER 1: LINUX BASIC COMMANDS**

# **🌿 SECTION 1: DIRECTORY COMMANDS**

## **1. pwd**

### **🧠 What is it?**

Shows current working directory.

### **🧱 Syntax**

pwd

### **✅ Example**

pwd

### **📌 Output Example**

/home/charlie

## **2. ls**

### **🧠 What is it?**

Lists files and folders.

### **🧱 Syntax**

``` bash
ls
```

### **✅ Example**

``` bash
ls
```

### **✅ List with details**

``` bash
ls -l
```

### **✅ Show hidden files**

``` bash
ls -a
```

### **✅ Human readable size**

``` bash
ls -lh
```

## **3. cd**

### **🧠 What is it?**

Changes directory.

### **🧱 Syntax**

cd directory-name

### **✅ Example**

cd Documents

### **✅ Go back one directory**

cd ..

### **✅ Go home directory**

``` bash
cd ~
```

## **4. mkdir**

### **🧠 What is it?**

Creates new directory.

### **🧱 Syntax**

``` bash
mkdir directory-name
```

### **✅ Example**

``` bash
mkdir devops
```

### **✅ Create multiple directories**

``` bash
mkdir dir1 dir2 dir3
```

## **5. rmdir**

### **🧠 What is it?**

Removes empty directory.

### **🧱 Syntax**

    rmdir directory-name

### **✅ Example**

    rmdir test

# **🌿 SECTION 2: FILE MANAGEMENT COMMANDS**

## **6. touch**

### **🧠 What is it?**

Creates empty file.

### **🧱 Syntax**

touch filename

### **✅ Example**

touch notes.txt

## **7. cp**

### **🧠 What is it?**

Copies files or directories.

### **🧱 Syntax**

cp source destination

### **✅ Example**

cp file1.txt backup.txt

### **✅ Copy directory**

``` bash
cp -r myfolder backupfolder
```

## **8. mv**

### **🧠 What is it?**

Moves or renames files.

### **🧱 Syntax**

mv oldname newname

### **✅ Example**

mv file1.txt file2.txt

## **9. rm**

### **🧠 What is it?**

Deletes files and directories.

### **🧱 Syntax**

rm filename

### **✅ Example**

rm notes.txt

### **✅ Remove directory recursively**

``` bash
rm -r myfolder
```

### **⚠️ Force delete**

``` bash
rm -rf myfolder
```

## **10. cat**

### **🧠 What is it?**

Displays file content.

### **🧱 Syntax**

cat filename

### **✅ Example**

cat notes.txt

## **11. nano**

### **🧠 What is it?**

Simple text editor.

### **🧱 Syntax**

``` bash
nano filename
```

### **✅ Example**

``` bash
nano app.py
```

## **12. vim**

### **🧠 What is it?**

Advanced Linux editor.

### **🧱 Syntax**

``` bash
vim filename
```

### **✅ Example**

``` bash
vim nginx.conf
```

## **13. head**

### **🧠 What is it?**

Shows first lines of file.

### **🧱 Syntax**

head filename

### **✅ Example**

head logs.txt

## **14. tail**

### **🧠 What is it?**

Shows last lines of file.

### **🧱 Syntax**

tail filename

### **✅ Example**

tail logs.txt

### **✅ Live monitoring logs**

``` bash
tail -f logs.txt
```

## **15. grep**

### **🧠 What is it?**

Searches text inside files.

### **🧱 Syntax**

``` bash
grep keyword filename
```

### **✅ Example**

``` bash
grep error logs.txt
```

### **✅ Ignore case**

``` bash
grep -i error logs.txt
```

# **🌿 SECTION 3: PERMISSION COMMANDS**

## **16. chmod**

### **🧠 What is it?**

Changes file permissions.

### **🧱 Syntax**

``` bash
chmod permissions filename
```

### **✅ Example**

``` bash
chmod 777 script.sh
```

### **✅ Give execute permission**

``` bash
chmod +x script.sh
```

## **17. chown**

### **🧠 What is it?**

Changes ownership.

### **🧱 Syntax**

``` bash
chown user:group filename
```

### **✅ Example**

``` bash
chown ubuntu:ubuntu app.py
```

# **🌿 SECTION 4: USER MANAGEMENT COMMANDS**

## **18. whoami**

### **🧠 What is it?**

Shows current user.

### **🧱 Syntax**

``` bash
whoami
```

### **✅ Example**

``` bash
whoami
```

## **19. useradd**

### **🧠 What is it?**

Creates new user.

### **🧱 Syntax**

``` bash
sudo useradd username
```

### **✅ Example**

``` bash
sudo useradd devops
```

## **20. passwd**

### **🧠 What is it?**

Sets password for user.

### **🧱 Syntax**

``` bash
passwd username
```

### **✅ Example**

``` bash
passwd devops
```

## **21. userdel**

### **🧠 What is it?**

Deletes user.

### **🧱 Syntax**

``` bash
sudo userdel username
```

### **✅ Example**

``` bash
sudo userdel testuser
```

# **🌿 SECTION 5: PROCESS MANAGEMENT COMMANDS**

## **22. ps**

### **🧠 What is it?**

Shows running processes.

### **🧱 Syntax**

``` bash
ps
```

### **✅ Example**

``` bash
ps aux
```

## **23. top**

### **🧠 What is it?**

Live process monitoring.

### **🧱 Syntax**

``` bash
top
```

## **24. htop**

### **🧠 What is it?**

Advanced process viewer.

### **🧱 Syntax**

    htop

## **25. kill**

### **🧠 What is it?**

Stops process using PID.

### **🧱 Syntax**

kill PID

### **✅ Example**

``` bash
kill 1234
```

### **✅ Force kill**

``` bash
kill -9 1234
```

# **🌿 SECTION 6: NETWORK COMMANDS**

## **26. ping**

### **🧠 What is it?**

Checks network connectivity.

### **🧱 Syntax**

ping hostname

### **✅ Example**

ping google.com

## **27. ifconfig**

### **🧠 What is it?**

Shows network configuration.

### **🧱 Syntax**

    ifconfig

## **28. ip**

### **🧠 What is it?**

Modern network command.

### **🧱 Syntax**

ip address

### **✅ Example**

ip a

## **29. netstat**

### **🧠 What is it?**

Shows network connections.

### **🧱 Syntax**

``` bash
netstat
```

### **✅ Example**

``` bash
netstat -tulnp
```

## **30. curl**

### **🧠 What is it?**

Transfers data from URLs.

### **🧱 Syntax**

``` bash
curl URL
```

### **✅ Example**

``` bash
curl https://google.com
```

## **31. wget**

### **🧠 What is it?**

Downloads files.

### **🧱 Syntax**

``` bash
wget URL
```

### **✅ Example**

``` bash
wget https://example.com/file.zip
```

# **🌿 SECTION 7: PACKAGE MANAGEMENT COMMANDS**

## **32. apt**

### **🧠 What is it?**

Ubuntu package manager.

### **🧱 Syntax**

``` bash
sudo apt command
```

### **✅ Update packages**

``` bash
sudo apt update
```

### **✅ Upgrade packages**

``` bash
sudo apt upgrade
```

### **✅ Install package**

``` bash
sudo apt install nginx
```

## **33. yum**

### **🧠 What is it?**

RHEL/CentOS package manager.

### **🧱 Syntax**

``` bash
sudo yum install package
```

### **✅ Example**

``` bash
sudo yum install docker
```

# **🌿 SECTION 8: DISK COMMANDS**

## **34. df**

### **🧠 What is it?**

Shows disk usage.

### **🧱 Syntax**

``` bash
df -h
```

## **35. du**

### **🧠 What is it?**

Shows directory size.

### **🧱 Syntax**

``` bash
du -sh foldername
```

### **✅ Example**

``` bash
du -sh logs
```

# **🌿 SECTION 9: ARCHIVE COMMANDS**

## **36. tar**

### **🧠 What is it?**

Creates archives.

### **🧱 Syntax**

``` bash
tar options archive files
```

### **✅ Create tar file**

``` bash
tar -cvf backup.tar myfolder
```

### **✅ Extract tar file**

``` bash
tar -xvf backup.tar
```

## **37. zip**

### **🧠 What is it?**

Compress files.

### **🧱 Syntax**

    zip archive.zip file

### **✅ Example**

    zip backup.zip notes.txt

# **📘 CHAPTER 2: BASH SCRIPTING COMMANDS**

## **1. echo**

### **🧠 Prints output.**

### **🧱 Syntax**

echo text

### **✅ Example**

``` bash
echo "Hello DevOps"
```

## **2. read**

### **🧠 Takes user input.**

### **🧱 Syntax**

read variable

### **✅ Example**

read username

## **3. if condition**

### **🧱 Syntax**

    if [ condition ]
    then

commands

    fi

### **✅ Example**

    if [ $age -gt 18 ]
    then
    echo "Adult"
    fi

## **4. for loop**

### **🧱 Syntax**

    for variable in list
    do

commands

    done

### **✅ Example**

    for i in 1 2 3
    do
    echo $i
    done

## **5. while loop**

### **🧱 Syntax**

    while [ condition ]
    do

commands

    done

### **✅ Example**

    count=1
    while [ $count -le 5 ]
    do
    echo $count
    count=$((count+1))
    done

# **📘 CHAPTER 3: GIT COMMANDS**

## **1. git init**

### **🧠 Initializes Git repository.**

### **🧱 Syntax**

``` bash
git init
```

### **✅ Example**

``` bash
git init
```

## **2. git clone**

### **🧠 Clones repository.**

### **🧱 Syntax**

``` bash
git clone repository-url
```

### **✅ Example**

``` bash
git clone https://github.com/user/project.git
```

## **3. git status**

### **🧠 Shows repository status.**

### **🧱 Syntax**

``` bash
git status
```

## **4. git add**

### **🧠 Adds files.**

### **🧱 Syntax**

``` bash
git add filename
```

### **✅ Example**

``` bash
git add app.py
```

### **✅ Add all files**

git add .

## **5. git commit**

### **🧠 Saves changes.**

### **🧱 Syntax**

``` bash
git commit -m "message"
```

### **✅ Example**

``` bash
git commit -m "Initial commit"
```

## **6. git push**

### **🧠 Uploads code to remote repo.**

### **🧱 Syntax**

``` bash
git push origin branch
```

### **✅ Example**

``` bash
git push origin main
```

## **7. git pull**

### **🧠 Downloads latest changes.**

### **🧱 Syntax**

``` bash
git pull origin branch
```

### **✅ Example**

``` bash
git pull origin main
```

## **8. git branch**

### **🧠 Manages branches.**

### **🧱 Syntax**

``` bash
git branch
```

### **✅ Create branch**

``` bash
git branch dev
```

## **9. git checkout**

### **🧠 Switch branch.**

### **🧱 Syntax**

``` bash
git checkout branch-name
```

### **✅ Example**

``` bash
git checkout dev
```

# **📘 CHAPTER 4: DOCKER COMMANDS**

## **1. docker version**

### **🧠 Shows Docker version.**

### **🧱 Syntax**

``` bash
docker version
```

## **2. docker images**

### **🧠 Lists images.**

### **🧱 Syntax**

``` bash
docker images
```

## **3. docker ps**

### **🧠 Lists containers.**

### **🧱 Syntax**

``` bash
docker ps
```

### **✅ Show all containers**

``` bash
docker ps -a
```

## **4. docker pull**

### **🧠 Downloads image.**

### **🧱 Syntax**

``` bash
docker pull image-name
```

### **✅ Example**

``` bash
docker pull nginx
```

## **5. docker run**

### **🧠 Runs container.**

### **🧱 Syntax**

``` bash
docker run image-name
```

### **✅ Example**

``` bash
docker run nginx
```

### **✅ Run detached**

``` bash
docker run -d nginx
```

### **✅ Port mapping**

``` bash
docker run -d -p 80:80 nginx
```

## **6. docker stop**

### **🧠 Stops container.**

### **🧱 Syntax**

``` bash
docker stop container-id
```

## **7. docker rm**

### **🧠 Removes container.**

### **🧱 Syntax**

``` bash
docker rm container-id
```

## **8. docker rmi**

### **🧠 Removes image.**

### **🧱 Syntax**

``` bash
docker rmi image-id
```

## **9. docker exec**

### **🧠 Runs command inside container.**

### **🧱 Syntax**

``` bash
docker exec options container command
```

### **✅ Example**

``` bash
docker exec -it containerid bash
```

## **10. docker logs**

### **🧠 Shows container logs.**

### **🧱 Syntax**

``` bash
docker logs container-id
```

## **11. docker build**

### **🧠 Builds image from Dockerfile.**

### **🧱 Syntax**

docker build -t image-name .

### **✅ Example**

docker build -t myapp .

# **📘 CHAPTER 5: KUBERNETES COMMANDS**

## **1. kubectl get pods**

### **🧠 Lists pods.**

### **🧱 Syntax**

``` bash
kubectl get pods
```

## **2. kubectl get nodes**

### **🧠 Lists cluster nodes.**

### **🧱 Syntax**

``` bash
kubectl get nodes
```

## **3. kubectl create deployment**

### **🧠 Creates deployment.**

### **🧱 Syntax**

``` bash
kubectl create deployment name --image=image
```

### **✅ Example**

``` bash
kubectl create deployment nginx --image=nginx
```

## **4. kubectl expose deployment**

### **🧠 Exposes deployment.**

### **🧱 Syntax**

``` bash
kubectl expose deployment name --type=NodePort --port=80
```

## **5. kubectl describe**

### **🧠 Detailed information.**

### **🧱 Syntax**

``` bash
kubectl describe pod pod-name
```

## **6. kubectl logs**

### **🧠 Shows pod logs.**

### **🧱 Syntax**

``` bash
kubectl logs pod-name
```

## **7. kubectl delete**

### **🧠 Deletes resources.**

### **🧱 Syntax**

``` bash
kubectl delete pod pod-name
```

# **📘 CHAPTER 6: AWS CLI COMMANDS**

## **1. aws configure**

### **🧠 Configures AWS CLI.**

### **🧱 Syntax**

    aws configure

## **2. aws s3 ls**

### **🧠 Lists S3 buckets.**

### **🧱 Syntax**

    aws s3 ls

## **3. aws s3 cp**

### **🧠 Copies files to S3.**

### **🧱 Syntax**

    aws s3 cp file s3://bucket

### **✅ Example**

    aws s3 cp backup.zip s3://mybucket

## **4. aws ec2 describe-instances**

### **🧠 Lists EC2 instances.**

### **🧱 Syntax**

    aws ec2 describe-instances

## **5. aws iam list-users**

### **🧠 Lists IAM users.**

### **🧱 Syntax**

    aws iam list-users

# **📘 CHAPTER 7: TERRAFORM COMMANDS**

## **1. terraform init**

### **🧠 Initializes Terraform.**

### **🧱 Syntax**

``` bash
terraform init
```

## **2. terraform validate**

### **🧠 Validates configuration.**

### **🧱 Syntax**

``` bash
terraform validate
```

## **3. terraform plan**

### **🧠 Shows execution plan.**

### **🧱 Syntax**

``` bash
terraform plan
```

## **4. terraform apply**

### **🧠 Creates infrastructure.**

### **🧱 Syntax**

``` bash
terraform apply
```

## **5. terraform destroy**

### **🧠 Removes infrastructure.**

### **🧱 Syntax**

``` bash
terraform destroy
```

# **📘 CHAPTER 8: ANSIBLE COMMANDS**

## **1. ansible --version**

### **🧠 Shows version.**

### **🧱 Syntax**

``` bash
ansible --version
```

## **2. ansible all -m ping**

### **🧠 Tests connectivity.**

### **🧱 Syntax**

``` bash
ansible all -m ping
```

## **3. ansible-playbook**

### **🧠 Runs playbook.**

### **🧱 Syntax**

``` bash
ansible-playbook playbook.yml
```

# **📘 CHAPTER 9: JENKINS COMMANDS**

## **1. systemctl start jenkins**

### **🧠 Starts Jenkins service.**

### **🧱 Syntax**

``` bash
sudo systemctl start jenkins
```

## **2. systemctl status jenkins**

### **🧠 Shows Jenkins status.**

### **🧱 Syntax**

``` bash
sudo systemctl status jenkins
```

# **📘 CHAPTER 10: SYSTEMCTL & SERVICE COMMANDS**

## **1. systemctl start**

### **🧠 Starts service.**

### **🧱 Syntax**

``` bash
sudo systemctl start service-name
```

### **✅ Example**

``` bash
sudo systemctl start nginx
```

## **2. systemctl stop**

### **🧠 Stops service.**

### **🧱 Syntax**

``` bash
sudo systemctl stop nginx
```

## **3. systemctl restart**

### **🧠 Restarts service.**

### **🧱 Syntax**

``` bash
sudo systemctl restart nginx
```

## **4. systemctl enable**

### **🧠 Enables auto start.**

### **🧱 Syntax**

``` bash
sudo systemctl enable nginx
```

## **5. systemctl status**

### **🧠 Shows service status.**

### **🧱 Syntax**

``` bash
sudo systemctl status nginx
```

# **📘 CHAPTER 11: IMPORTANT DEVOPS COMMANDS**

## **🔥 Log Monitoring**

``` bash
tail -f /var/log/syslog
journalctl -u nginx
```

## **🔥 Port Checking**

``` bash
ss -tulnp
netstat -tulnp
```

## **🔥 Resource Monitoring**

    free -m
    uptime

iostat

## **🔥 SSH Commands**

### **Connect remote server**

``` bash
ssh ubuntu@server-ip
```

### **Copy file to remote server**

``` bash
scp file.txt ubuntu@server-ip:/home/ubuntu
```

# **📘 CHAPTER 12: DEVOPS TOOLS SUMMARY**

| **Tool**   | **Purpose**              |
|---------------------------------------------|-----------------------------------------------------------|
| Git        | Version control          |
| Docker     | Containerization         |
| Kubernetes | Container orchestration  |
| Jenkins    | CI/CD automation         |
| Terraform  | Infrastructure as Code   |
| Ansible    | Configuration management |
| AWS CLI    | AWS management           |
| Linux      | Server operating system  |
| Bash       | Automation scripting     |

# **📘 CHAPTER 13: MOST IMPORTANT COMMANDS FOR DEVOPS ENGINEERS**

## **Linux**

``` bash
ls
cd
```

pwd

``` bash
grep
tail -f
chmod
chown
systemctl
journalctl
```

## **Git**

``` bash
git clone
git pull
git push
git commit
```

## **Docker**

``` bash
docker ps
docker images
docker run
docker logs
```

## **Kubernetes**

``` bash
kubectl get pods
kubectl describe
kubectl logs
```

## **AWS**

    aws s3 ls
    aws ec2 describe-instances

# **📘 FINAL ADVICE**

Do not try to memorize every command in one day.

Best learning method:

1.  Learn command purpose
2.  Practice syntax daily
3.  Use commands in real labs
4.  Repeat again and again
5.  Build projects using commands

A DevOps engineer becomes strong through:

✅ Linux practice  
✅ Troubleshooting  
✅ Automation  
✅ Repetition  
✅ Real-world labs

# **🚀 END OF HANDBOOK**

# **📘 CHAPTER: Piping in Linux**

# **🌿 SECTION 1: What is Piping in Linux?**

## **🧱 Definition**

In Linux, **Piping** means:

> Taking the output of one command and sending it directly as input to another command.

Instead of saving data into a file and then reading it again, Linux allows commands to “talk” to each other directly.

This is done using the **pipe symbol**:

\|

This symbol is called the **pipe operator**.

# **🌿 SECTION 2: Simple Real-Life Analogy**

Imagine:

- One worker cuts vegetables 🍅
- Another worker cooks them 🍳

Instead of putting vegetables into a box first, the first worker directly passes them to the second worker.

That direct passing is exactly what Linux piping does.

# **🌿 SECTION 3: Why Piping is Powerful**

Without piping:

1.  Run command
2.  Save output to file
3.  Open file again
4.  Use another command

With piping:

command1 \| command2

Everything happens instantly.

# **🌿 SECTION 4: Basic Syntax of Pipe**

## **🧱 Syntax**

command1 \| command2

## **🧠 Meaning**

| **Part** | **Purpose**          |
|----------|----------------------|
| command1 | Produces output      |
| \|       | Sends output forward |
| command2 | Receives input       |

# **🌿 SECTION 5: How Linux Executes Pipes**

Linux works from:

➡️ Left to Right

Example:

``` bash
ls | sort
```

### **Step-by-Step**

### **Step 1**

``` bash
ls
```

Lists files.

Example output:

apple.txt

zebra.txt

cat.txt

### **Step 2**

Pipe sends this output to:

``` bash
sort
```

### **Final Result**

apple.txt

cat.txt

zebra.txt

Now files are sorted alphabetically.

# **🌿 SECTION 6: Understanding Standard Output and Input**

Linux commands communicate using streams.

## **🧱 Standard Output (stdout)**

Normal output of a command.

Example:

``` bash
echo "Hello"
```

Output:

Hello

This output is called:

stdout

## **🧱 Standard Input (stdin)**

Input received by a command.

Pipe sends stdout of first command into stdin of second command.

# **🌿 SECTION 7: First Basic Piping Example**

## **Example**

``` bash
echo "Linux" | wc
```

## **Step-by-Step Explanation**

### **First Command**

``` bash
echo "Linux"
```

Produces:

Linux

### **Pipe Sends Output**

\|

Sends “Linux” to next command.

### **Second Command**

``` bash
wc
```

Counts:

- lines
- words
- characters

## **Final Output**

Example:

1 1 6

Meaning:

| **Number** | **Meaning** |
|------------|-------------|
| 1          | line        |
| 1          | word        |
| 6          | characters  |

# **🌿 SECTION 8: What are Metacharacters?**

## **🧱 Definition**

Metacharacters are special symbols with special meaning in Linux shell.

# **🌿 SECTION 9: Common Linux Metacharacters**

| **Symbol** | **Meaning**               |
|------------|---------------------------|
| \|         | Pipe                      |
| \>         | Redirect output           |
| \<         | Redirect input            |
| \>\>       | Append output             |
| &          | Run process in background |
| ;          | Separate commands         |
| \*         | Wildcard                  |
| ?          | Single character wildcard |

# **🌿 SECTION 10: Example 1 — Count Files and Directories**

## **Command**

``` bash
ls -l | wc -l
```

# **🌿 SECTION 11: Breaking Down the Command**

## **Part 1**

``` bash
ls -l
```

### **Meaning**

| **Part** | **Purpose**      |
|----------|------------------|
| ls       | List files       |
| -l       | Long list format |

## **Example Output**

-rw-r--r-- 1 user user 120 Jan 1 file1.txt

drwxr-xr-x 2 user user 400 Jan 1 folder1

Each item appears on separate line.

## **Part 2**

``` bash
wc -l
```

### **Meaning**

| **Part** | **Purpose** |
|----------|-------------|
| wc       | Word count  |
| -l       | Count lines |

# **🌿 SECTION 12: Final Working**

Pipe sends output from:

``` bash
ls -l
to:
wc -l
```

Result:

5

Meaning:  
There are 5 lines/items.

# **🌿 SECTION 13: Example 2 — Sorting Files**

## **Command**

``` bash
ls | sort
```

# **🌿 SECTION 14: Step-by-Step**

## **First Command**

``` bash
ls
```

Example:

zebra.txt

apple.txt

cat.txt

## **Pipe Sends Data**

\|

## **Second Command**

``` bash
sort
```

Sorts alphabetically.

## **Final Output**

apple.txt

cat.txt

zebra.txt

# **🌿 SECTION 15: Reverse Sorting**

## **Command**

``` bash
ls | sort -r
```

## **Meaning**

| **Part** | **Purpose**   |
|----------|---------------|
| sort     | Sort text     |
| -r       | Reverse order |

## **Output**

zebra.txt

cat.txt

apple.txt

# **🌿 SECTION 16: Example 3 — Unique Words**

## **Command**

cat words.txt \| sort \| uniq

# **🌿 SECTION 17: What This Command Does**

This command:

1.  Reads file
2.  Sorts words
3.  Removes duplicates

# **🌿 SECTION 18: Step-by-Step Breakdown**

## **Part 1**

cat words.txt

Suppose file contains:

apple

banana

apple

``` bash
cat
```

banana

## **Part 2**

``` bash
sort
```

Result:

apple

apple

banana

banana

``` bash
cat
```

## **Part 3**

``` bash
uniq
```

Removes duplicate neighboring lines.

Final result:

apple

banana

``` bash
cat
```

# **🌿 SECTION 19: Reverse Sort with Unique**

## **Command**

cat words.txt \| sort -r \| uniq

## **Output**

``` bash
cat
```

banana

apple

# **🌿 SECTION 20: Important Rule About** `uniq`

## **🧠 Very Important**

`uniq` only removes:

✅ Adjacent duplicates

NOT random duplicates.

## **Wrong Example**

cat words.txt \| uniq

May fail if duplicates are not together.

## **Correct Way**

cat words.txt \| sort \| uniq

# **🌿 SECTION 21: Chaining Multiple Commands**

You can connect many commands together.

## **Example**

``` bash
ps aux | grep nginx | wc -l
```

# **🌿 SECTION 22: Real Working of Above Command**

## **Part 1**

``` bash
ps aux
```

Shows running processes.

## **Part 2**

``` bash
grep nginx
```

Searches for nginx process.

## **Part 3**

``` bash
wc -l
```

Counts matching lines.

## **Final Result**

3

Meaning:  
3 nginx processes are running.

# **🌿 SECTION 23: Filtering Text Using Pipe**

## **Command**

cat file.txt \| grep hello

## **Meaning**

Search lines containing:

hello

# **🌿 SECTION 24: Search Ignore Case**

## **Command**

cat file.txt \| grep -i hello

## **Meaning**

Matches:

- hello
- Hello
- HELLO

because:

-i

means ignore case.

# **🌿 SECTION 25: Using Pipe with** `head`

## **Command**

``` bash
ls -l | head
```

## **Meaning**

Shows first 10 lines only.

# **🌿 SECTION 26: Using Pipe with** `tail`

## **Command**

``` bash
ls -l | tail
```

## **Meaning**

Shows last 10 lines.

# **🌿 SECTION 27: Using Pipe with** `less`

## **Command**

    dmesg | less

## **Meaning**

Allows scrolling through large output page by page.

Useful for huge logs.

# **🌿 SECTION 28: Pipe with Error Messages**

Normally pipe works with:

stdout

not errors.

# **🌿 SECTION 29: Standard Error (stderr)**

Errors go into:

stderr

instead of stdout.

# **🌿 SECTION 30: Pipe Both Output and Errors**

## **Command**

    command 2>&1 | another_command

# **🌿 SECTION 31: Understanding** `2>&1`

| **Part** | **Meaning**    |
|----------|----------------|
| 2        | stderr         |
| \>       | redirect       |
| &1       | send to stdout |

Meaning:

> Send errors into normal output stream.

# **🌿 SECTION 32: Difference Between Pipe and Semicolon**

Many beginners confuse these.

# **🌿 SECTION 33: Pipe (**`|`**)**

## **Syntax**

command1 \| command2

### **Meaning**

Output of first command becomes input of second command.

Commands are related.

# **🌿 SECTION 34: Semicolon (**`;`**)**

## **Syntax**

command1 ; command2

### **Meaning**

Run commands one after another.

No data sharing.

# **🌿 SECTION 35: Example of Semicolon**

pwd ; date

## **Output**

/home/user

Sun May 17

These commands are unrelated.

# **🌿 SECTION 36: Pipe vs Semicolon Comparison**

| **Feature**          | **Pipe \|** | **Semicolon ;** |
|----------------------|-------------|-----------------|
| Shares output        | Yes         | No              |
| Commands connected   | Yes         | No              |
| Data flow            | Yes         | No              |
| Sequential execution | Yes         | Yes             |

# **🌿 SECTION 37: Why Piping is Important in DevOps**

Piping is heavily used in:

- Linux Administration
- DevOps
- AWS
- Docker
- Kubernetes
- Monitoring
- Log Analysis

# **🌿 SECTION 38: DevOps Real Examples**

## **View Running Docker Containers**

``` bash
docker ps | grep nginx
```

## **Find Failed Pods**

``` bash
kubectl get pods | grep Error
```

## **Count Log Errors**

cat app.log \| grep ERROR \| wc -l

# **🌿 SECTION 39: Best Practices**

## **✅ Use piping when:**

- Commands depend on previous output
- Filtering data
- Searching logs
- Processing text

## **❌ Avoid piping when:**

Commands are unrelated.

Wrong:

    date | pwd

`pwd` does not use date output.

# **🌿 SECTION 40: Advanced Pipe Example**

## **Command**

cat access.log \| grep 404 \| awk '{print \$1}' \| sort \| uniq

# **🌿 SECTION 41: Step-by-Step Advanced Explanation**

| **Command**       | **Purpose**        |
|-------------------|--------------------|
| cat access.log    | Read log           |
| grep 404          | Find 404 errors    |
| awk '{print \$1}' | Extract IP address |
| sort              | Sort IPs           |
| uniq              | Remove duplicates  |

# **🌿 SECTION 42: Important Commands Commonly Used with Pipes**

| **Command** | **Purpose**          |
|-------------|----------------------|
| grep        | Search text          |
| sort        | Sort text            |
| uniq        | Remove duplicates    |
| wc          | Count                |
| awk         | Process columns      |
| sed         | Replace text         |
| cut         | Extract columns      |
| tr          | Translate characters |
| head        | First lines          |
| tail        | Last lines           |
| less        | Scroll output        |

# **🌿 SECTION 43: Simple Practice Labs**

## **Lab 1**

Count files:

``` bash
ls | wc -l
```

## **Lab 2**

Sort usernames:

cat users.txt \| sort

## **Lab 3**

Count error lines:

cat log.txt \| grep ERROR \| wc -l

## **Lab 4**

Show first 5 running processes:

``` bash
ps aux | head -5
```

# **🌿 SECTION 44: Common Beginner Mistakes**

## **❌ Mistake 1**

Using spaces wrongly:

Wrong:

``` bash
ls |sort
```

Correct:

``` bash
ls | sort
```

## **❌ Mistake 2**

Using unrelated commands:

    date | pwd

## **❌ Mistake 3**

Forgetting sort before uniq:

Wrong:

cat file.txt \| uniq

Correct:

cat file.txt \| sort \| uniq

# **🌿 SECTION 45: Summary**

## **🧠 Final Understanding**

Piping is one of the most powerful Linux features.

It allows:

- Command chaining
- Data processing
- Fast automation
- Powerful DevOps workflows

# **📌 Final Golden Rule**

## **Pipe (**`|`**) is used when:**

> Output of one command is needed by another command.

# **📘 Most Important Syntaxes to Remember**

## **Basic Pipe**

command1 \| command2

## **Multiple Pipes**

command1 \| command2 \| command3

## **Count Lines**

``` bash
ls | wc -l
```

## **Search Text**

cat file.txt \| grep word

## **Sort Unique Data**

cat file.txt \| sort \| uniq

# **🚀 DevOps Interview Tip**

Very commonly asked:

> “What is the difference between piping and redirection?”

### **Short Answer**

| **Pipe**                            | **Redirection**          |
|-------------------------------------|--------------------------|
| Transfers output to another command | Transfers output to file |
| Uses \`                             | \`                       |

Example:

``` bash
ls | wc -l
```

vs

``` bash
ls > files.txt
```

# **📘 CHAPTER: Redirection in Linux**

# **🌿 SECTION 1: What is Redirection in Linux?**

## **🧱 Definition**

In Linux, **Redirection** means:

> Changing where command input comes from or where command output goes.

Normally:

- Commands take input from keyboard
- Commands show output on terminal

But with redirection, you can:

- Save output into files
- Read input from files
- Save errors into files

# **🌿 SECTION 2: Real-Life Analogy**

Imagine:

- A water pipe normally pours water into a sink.
- You place a bucket under it.

Now water goes into the bucket instead.

That “changing direction” is exactly what redirection does in Linux.

# **🌿 SECTION 3: Default Linux Input and Output**

Linux commands use 3 standard streams.

| **Stream** | **Number** | **Purpose**     |
|------------|------------|-----------------|
| stdin      | 0          | Standard Input  |
| stdout     | 1          | Standard Output |
| stderr     | 2          | Standard Error  |

# **🌿 SECTION 4: Understanding Standard Streams**

## **🧱 Standard Input (stdin)**

Default input source.

Usually:

Keyboard

Example:

``` bash
cat
```

When you type:

Hello

Terminal receives keyboard input.

## **🧱 Standard Output (stdout)**

Normal successful output.

Example:

``` bash
echo "Linux"
```

Output:

Linux

This is stdout.

## **🧱 Standard Error (stderr)**

Error messages.

Example:

ls abc

Output:

ls: cannot access 'abc': No such file or directory

This is stderr.

# **🌿 SECTION 5: Main Redirection Symbols**

| **Symbol** | **Purpose**              |
|------------|--------------------------|
| \>         | Redirect output          |
| \>\>       | Append output            |
| \<         | Redirect input           |
| 2\>        | Redirect errors          |
| 2\>\>      | Append errors            |
| &\>        | Redirect output + errors |
| &\>\>      | Append output + errors   |

# **🌿 SECTION 6: Output Redirection with** `>`

## **🧱 Definition**

The `>` symbol sends command output into a file.

# **🌿 SECTION 7: Basic Syntax**

    command > file

# **🌿 SECTION 8: How It Works**

Normally:

``` bash
ls
```

shows output on terminal.

But:

``` bash
ls > files.txt
```

saves output inside:

files.txt

instead of terminal.

# **🌿 SECTION 9: Example of** `>`

## **Command**

``` bash
ls -a > contents.txt
```

# **🌿 SECTION 10: Step-by-Step Explanation**

## **Part 1**

``` bash
ls -a
```

### **Meaning**

| **Part** | **Purpose**          |
|----------|----------------------|
| ls       | List files           |
| -a       | Include hidden files |

## **Example Output**

.

..

file1.txt

notes.txt

## **Part 2**

\>

Redirects output.

## **Part 3**

contents.txt

Destination file.

# **🌿 SECTION 11: Important Behavior of** `>`

## **⚠️ Very Important**

If file exists:

\>

WILL OVERWRITE file contents.

# **🌿 SECTION 12: Example of Overwriting**

Suppose:

contents.txt

already contains:

Hello World

Now run:

``` bash
echo "Linux" > contents.txt
```

Final file content becomes:

Linux

Old content is deleted.

# **🌿 SECTION 13: Append Redirection with** `>>`

## **🧱 Definition**

`>>` adds output at end of existing file.

Does NOT overwrite.

# **🌿 SECTION 14: Syntax of** `>>`

    command >> file

# **🌿 SECTION 15: Example of** `>>`

## **Command**

``` bash
ls -a >> contents.txt
```

# **🌿 SECTION 16: Difference Between** `>` **and** `>>`

| **Symbol** | **Behavior** |
|------------|--------------|
| \>         | Overwrite    |
| \>\>       | Append       |

# **🌿 SECTION 17: Practical Example**

Suppose file contains:

Linux

Now run:

``` bash
echo "DevOps" >> contents.txt
```

Final file:

Linux

DevOps

# **🌿 SECTION 18: Input Redirection with** `<`

## **🧱 Definition**

`<` sends file contents into command as input.

# **🌿 SECTION 19: Syntax of** `<`

    command < file

# **🌿 SECTION 20: Example of Input Redirection**

## **Command**

``` bash
wc -w < file.txt
```

# **🌿 SECTION 21: Step-by-Step Breakdown**

## **Part 1**

``` bash
wc -w
```

Counts words.

## **Part 2**

\<

Takes input from file.

## **Part 3**

file.txt

Input source.

# **🌿 SECTION 22: Example File**

Suppose:

file.txt

contains:

Linux is awesome

## **Result**

3

because there are 3 words.

# **🌿 SECTION 23: Shortcut Version**

These are similar:

``` bash
wc -w < file.txt
```

and

``` bash
wc -w file.txt
```

because many Linux commands already accept files directly.

# **🌿 SECTION 24: Error Redirection with** `2>`

## **🧱 Definition**

Redirects error messages into a file.

# **🌿 SECTION 25: Syntax of** `2>`

    command 2> error.txt

# **🌿 SECTION 26: Example of** `2>`

## **Command**

ls nonexistent 2\> error.txt

# **🌿 SECTION 27: What Happens?**

## **Part 1**

ls nonexistent

Causes error.

## **Part 2**

2\>

Redirects stderr.

## **Result**

Terminal shows nothing.

Instead:

error.txt

    contains:
    ls: cannot access 'nonexistent'

# **🌿 SECTION 28: Append Errors with** `2>>`

## **Syntax**

    command 2>> error.txt

## **Meaning**

Append errors instead of overwrite.

# **🌿 SECTION 29: Redirect Both Output and Errors with** `&>`

## **🧱 Definition**

Redirects:

- stdout
- stderr

both into same file.

# **🌿 SECTION 30: Syntax of** `&>`

    command &> output.txt

# **🌿 SECTION 31: Example**

ls sample &\> output.txt

# **🌿 SECTION 32: Possible Situations**

## **If Directory Exists**

Contents saved into:

output.txt

## **If Directory Doesn't Exist**

Error saved into:

output.txt

# **🌿 SECTION 33: Append Both Output and Errors with** `&>>`

## **Syntax**

    command &>> output.txt

## **Meaning**

Adds both stdout and stderr to file without deleting old content.

# **🌿 SECTION 34: Understanding File Descriptors**

Linux internally uses numbers.

| **Number** | **Stream** |
|------------|------------|
| 0          | stdin      |
| 1          | stdout     |
| 2          | stderr     |

# **🌿 SECTION 35: Why** `2>` **Means Error Redirection**

Because:

2

represents:

stderr

So:

2\>

means:

> Redirect error output.

# **🌿 SECTION 36: Redirect Standard Output Explicitly**

Normally:

\>

already means stdout.

But technically:

1\>

is same as:

\>

Example:

``` bash
ls 1> output.txt
```

# **🌿 SECTION 37: Separate Output and Error Files**

## **Command**

    command > output.txt 2> error.txt

# **🌿 SECTION 38: Real Example**

``` bash
find / -name test > found.txt 2> errors.txt
```

# **🌿 SECTION 39: What Happens Here?**

| **Part**          | **Purpose**             |
|-------------------|-------------------------|
| find / -name test | Search whole system     |
| \> found.txt      | Save successful results |
| 2\> errors.txt    | Save permission errors  |

# **🌿 SECTION 40: Redirect Output to** `/dev/null`

## **🧱 What is** `/dev/null`**?**

Special Linux black hole.

Anything sent there disappears.

# **🌿 SECTION 41: Ignore Output**

    command > /dev/null

# **🌿 SECTION 42: Ignore Errors**

    command 2> /dev/null

# **🌿 SECTION 43: Ignore Everything**

    command &> /dev/null

# **🌿 SECTION 44: Combine Redirection with Pipe**

## **Example**

cat file.txt \| grep hello \> result.txt

# **🌿 SECTION 45: Step-by-Step**

| **Command**   | **Purpose**  |
|---------------|--------------|
| cat file.txt  | Read file    |
| grep hello    | Search hello |
| \> result.txt | Save results |

# **🌿 SECTION 46: Difference Between Pipe and Redirection**

| **Feature**       | **Pipe**         | **Redirection**      |
|-------------------|------------------|----------------------|
| Symbol            | \|               | \> \< \>\>           |
| Transfers data to | Another command  | File                 |
| Purpose           | Command chaining | Input/output control |

# **🌿 SECTION 47: Pipe Example**

``` bash
ls | wc -l
```

Output of:

``` bash
ls
```

becomes input of:

``` bash
wc
```

# **🌿 SECTION 48: Redirection Example**

``` bash
ls > files.txt
```

Output goes into:

files.txt

# **🌿 SECTION 49: Real DevOps Examples**

## **Save Docker Logs**

``` bash
docker logs container1 > logs.txt
```

## **Save Kubernetes Errors**

``` bash
kubectl get pods 2> errors.txt
```

## **Save Both**

``` bash
terraform apply &> terraform.log
```

# **🌿 SECTION 50: Common Beginner Mistakes**

## **❌ Mistake 1**

Using `>` accidentally overwrites files.

## **❌ Mistake 2**

Confusing pipe and redirection.

Wrong thinking:

``` bash
ls > wc
```

This writes into file named:

``` bash
wc
```

NOT command execution.

## **❌ Mistake 3**

Forgetting stderr is separate from stdout.

# **🌿 SECTION 51: Best Practices**

## **✅ Use** `>`

When replacing old content.

## **✅ Use** `>>`

When preserving logs/history.

## **✅ Use** `2>`

For debugging.

## **✅ Use** `/dev/null`

To silence unwanted output.

# **🌿 SECTION 52: Quick Summary Table**

| **Symbol** | **Meaning**              |
|------------|--------------------------|
| \>         | Redirect output          |
| \>\>       | Append output            |
| \<         | Redirect input           |
| 2\>        | Redirect errors          |
| 2\>\>      | Append errors            |
| &\>        | Redirect output + errors |
| &\>\>      | Append output + errors   |

# **🌿 SECTION 53: Practice Labs**

## **Lab 1**

Save directory listing:

``` bash
ls > files.txt
```

## **Lab 2**

Append current date:

    date >> log.txt

## **Lab 3**

Count words from file:

``` bash
wc -w < notes.txt
```

## **Lab 4**

Save errors:

ls abc 2\> errors.txt

## **Lab 5**

Save everything:

``` bash
find / &> output.txt
```

# **🌿 SECTION 54: Final Understanding**

Redirection is one of the most important Linux concepts because it allows you to:

- Save outputs
- Manage logs
- Capture errors
- Automate tasks
- Control command behavior

This is heavily used in:

- Linux Administration
- DevOps
- AWS
- Docker
- Kubernetes
- Bash scripting
- Monitoring systems

# **📘 Final Golden Rule**

## **🧠 Remember**

| **Feature**            | **Purpose**                |
|------------------------|----------------------------|
| Pipe (\`               | \`)                        |
| Redirection (`>`, `<`) | Send output/input to files |

# **🚀 DevOps Interview Tip**

Very common interview question:

> “What is the difference between `>` and `>>`?”

## **Answer**

| **Symbol** | **Behavior**    |
|------------|-----------------|
| \>         | Overwrites file |
| \>\>       | Appends to file |

Example:

echo hello \> file.txt

vs

echo hello \>\> file.txt

# **🌿 SECTION: Combining Piping and Redirection in Linux**

# **🧱 What Does Combining Pipe and Redirection Mean?**

When you combine:

| **Feature**             | **Purpose**                    |
|-------------------------|--------------------------------|
| Pipe (\`                | \`)                            |
| Redirection (`>`, `>>`) | Sends final output into a file |

you unlock one of the most powerful features of Linux command line.

# **🧠 Simple Meaning**

The process usually works like this:

Command → Pipe → Another Command → Redirection → File

So:

1.  One command creates output
2.  Pipe passes it to another command
3.  Another command processes it
4.  Redirection saves final result into a file

# **🌿 Basic Syntax**

command1 \| command2 \> file

# **🌿 Understanding the Flow**

    command1
    ↓
    produces output
    ↓
    | (pipe)
    ↓
    command2 processes output
    ↓
    > (redirection)
    ↓
    save final result into file

# **🌿 Main Example**

## **Command**

``` bash
ls | grep ".txt" > text_files.txt
```

# **🌿 Step-by-Step Detailed Explanation**

## **🔹 Part 1 —** `ls`

``` bash
ls
```

### **Purpose**

Lists all files and directories in current directory.

## **Example Output**

notes.txt

photo.png

data.txt

music.mp3

# **🔹 Part 2 — Pipe (**`|`**)**

\|

### **Purpose**

Takes output from:

``` bash
ls
```

and sends it to:

``` bash
grep ".txt"
```

# **🔹 Part 3 —** `grep ".txt"`

``` bash
grep ".txt"
```

### **Purpose**

Filters only filenames containing:

.txt

## **Filtered Output**

notes.txt

data.txt

# **🔹 Part 4 — Output Redirection (**`>`**)**

\>

### **Purpose**

Sends final filtered output into file.

# **🔹 Part 5 —** `text_files.txt`

text_files.txt

### **Purpose**

Stores final result.

# **🌿 Final Result**

The file:

text_files.txt

will contain:

notes.txt

data.txt

# **🌿 What Happened Internally?**

## **Linux performed these steps:**

### **Step 1**

``` bash
ls
```

generated list.

### **Step 2**

Pipe transferred output to:

``` bash
grep
```

### **Step 3**

`grep` filtered `.txt` files.

### **Step 4**

Redirection:

\>

saved final result into file.

# **🌿 Why This Is Powerful**

Without piping and redirection:

❌ You would need:

- Multiple commands
- Temporary files
- Manual copying

With them:

✅ One small command performs everything automatically.

# **🌿 Real DevOps Example**

## **Find Errors and Save Them**

cat app.log \| grep ERROR \> errors.txt

# **🌿 Step-by-Step**

| **Command**   | **Purpose**           |
|---------------|-----------------------|
| cat app.log   | Read log file         |
| grep ERROR    | Filter only errors    |
| \> errors.txt | Save errors into file |

# **🌿 Another Example — Count Running Services**

``` bash
ps aux | grep nginx | wc -l > count.txt
```

# **🌿 Explanation**

| **Command**  | **Purpose**    |
|--------------|----------------|
| ps aux       | Show processes |
| grep nginx   | Find nginx     |
| wc -l        | Count lines    |
| \> count.txt | Save count     |

# **🌿 Another Advanced Example**

## **Find Unique IP Addresses**

cat access.log \| awk '{print \$1}' \| sort \| uniq \> unique_ips.txt

# **🌿 Step-by-Step Breakdown**

| **Command**       | **Purpose**          |
|-------------------|----------------------|
| cat access.log    | Read log             |
| awk '{print \$1}' | Extract IP addresses |
| sort              | Sort IPs             |
| uniq              | Remove duplicates    |
| \> unique_ips.txt | Save result          |

# **🌿 Important Understanding**

## **Pipe (**`|`**)**

Connects commands together.

## **Redirection (**`>`**)**

Stores final output somewhere.

# **🌿 Think Like a Data Flow**

    Command Output
    ↓
    Pipe
    ↓
    Processing Command
    ↓
    Pipe
    ↓
    Another Processing Command
    ↓
    Redirection
    ↓
    Save into File

# **🌿 Combining Multiple Pipes and Redirection**

You can chain many commands.

## **Example**

cat users.txt \| sort \| uniq \| wc -l \> total_users.txt

# **🌿 What This Does**

| **Command**        | **Purpose**       |
|--------------------|-------------------|
| cat users.txt      | Read users        |
| sort               | Sort names        |
| uniq               | Remove duplicates |
| wc -l              | Count users       |
| \> total_users.txt | Save count        |

# **🌿 Append Instead of Overwrite**

Use:

\>\>

instead of:

\>

## **Example**

    date >> log.txt

Adds current date at end of file.

# **🌿 Redirect Errors Too**

## **Example**

``` bash
find / | grep test 2> errors.txt
```

# **🌿 What Happens?**

| **Part**       | **Purpose**            |
|----------------|------------------------|
| find /         | Search entire system   |
| grep test      | Filter results         |
| 2\> errors.txt | Save permission errors |

# **🌿 Save Both Output and Errors**

## **Example**

``` bash
find / | grep test &> output.txt
```

Saves:

- normal output
- errors

both into one file.

# **🌿 Why DevOps Engineers Love This**

Combining pipes and redirection helps with:

✅ Log analysis  
✅ Monitoring  
✅ Automation  
✅ Kubernetes troubleshooting  
✅ Docker logs  
✅ AWS scripting  
✅ CI/CD pipelines  
✅ Security auditing

# **🌿 Real DevOps Examples**

## **Docker Logs**

``` bash
docker logs mycontainer | grep ERROR > docker_errors.txt
```

## **Kubernetes Pods**

``` bash
kubectl get pods | grep CrashLoopBackOff > failed_pods.txt
```

## **AWS CLI**

    aws s3 ls | grep backup > backups.txt

# **🌿 Common Beginner Mistakes**

## **❌ Mistake 1**

Wrong order:

``` bash
ls > files.txt | grep txt
```

Problem:  
Pipe won't work properly after redirection.

## **✅ Correct**

``` bash
ls | grep txt > files.txt
```

## **❌ Mistake 2**

Using unrelated commands:

    date | ls > output.txt

Commands are unrelated.

# **🌿 Final Golden Rule**

## **🧠 Remember This Forever**

| **Feature**       | **Job**              |
|-------------------|----------------------|
| Pipe (\`          | \`)                  |
| Redirection (`>`) | Save data into files |

# **🌿 Final Summary**

Combining piping and redirection allows Linux users to:

- Process data step-by-step
- Filter information
- Save results automatically
- Build powerful one-line commands
- Automate complex tasks easily

This is one of the core foundations of:

- Linux Administration
- Bash Scripting
- DevOps
- Cloud Engineering
- Automation
- System Monitoring

# **🚀 Interview Tip**

Very common question:

> “Why combine piping and redirection?”

## **Best Short Answer**

> Piping processes data between commands, while redirection stores the final result into files. Combining both allows powerful automation and efficient command-line workflows.

’

# **📘 CHAPTER: Linux File Linking (Hard Links & Soft Links)**

# **🌿 SECTION 1: Introduction to Linux File Linking**

## **🧱 1. What is File Linking in Linux?**

Linux allows one file to be connected or referenced from another location using **links**.

A link acts like a shortcut or another name for a file.

Linux supports two main types of links:

1.  **Hard Link**
2.  **Soft Link (Symbolic Link / Symlink)**

## **🧠 Simple Meaning**

Imagine a file is a house.

- A **hard link** is like giving the same house another official address.
- A **soft link** is like placing a signboard pointing toward the house.

# **🌿 SECTION 2: Understanding Linux File System Basics**

Before learning links, you must understand how Linux stores files internally.

## **🧱 1. Inode in Linux**

Every file in Linux has an internal ID called an **inode**.

The inode stores:

- File permissions
- Owner
- File size
- Disk location
- Timestamps

But NOT the filename.

The filename only points to the inode.

## **🧠 Important Concept**

In Linux:

Filename → Inode → Actual Data

Links work by interacting with these inodes.

# **🌿 SECTION 3: Hard Links**

# **🧱 1. What is a Hard Link?**

A hard link is another filename that points directly to the same inode (same actual file data).

Both files become equal references to the same file.

## **🧠 Simple Meaning**

Hard link = Same file with another name.

Both names are equally original.

There is no “main file” and “copy”.

# **🧱 2. Characteristics of Hard Links**

## **✅ Same inode number**

Both files share:

- Same inode
- Same data
- Same permissions
- Same file size

## **✅ Same file size**

Because both names point to the same actual data.

## **✅ Changes reflect everywhere**

If you edit one file:

- The other linked file also changes.

## **✅ Deleting one does NOT delete data**

The actual data remains until:

- All hard links are deleted.

## **✅ Works only on files**

Hard links are usually not allowed for directories.

## **✅ Cannot cross filesystems**

Hard links cannot link files between:

- Different disks
- Different partitions

Because inode numbers are filesystem-specific.

# **🧱 3. Hard Link Syntax**

    ln original_file hardlink_name

# **🧱 4. Example of Hard Link**

## **Step 1: Create a file**

``` bash
echo "Hello Linux" > file1.txt
```

## **Step 2: Create hard link**

    ln file1.txt file2.txt

## **Step 3: Check inode numbers**

``` bash
ls -li
```

Example output:

12345 file1.txt

12345 file2.txt

Same inode number = Hard link.

# **🧱 5. Testing Hard Link**

Edit one file:

``` bash
nano file1.txt
```

Now check:

cat file2.txt

You will see the same updated content.

# **🧱 6. Deleting Original File**

rm file1.txt

Now check:

cat file2.txt

The file still exists because:

- The inode still has another reference.

# **🌿 SECTION 4: Soft Links (Symbolic Links)**

# **🧱 1. What is a Soft Link?**

A soft link (symbolic link or symlink) is a special file that points to another file or directory path.

It is an indirect reference.

## **🧠 Simple Meaning**

Soft link = Shortcut.

Like Windows shortcut files.

# **🧱 2. Characteristics of Soft Links**

## **✅ Different inode number**

Soft link has:

- Its own inode
- Its own file entry

## **✅ Small file size**

Soft links only store:

- Path to target file

So size is usually few bytes/KB.

## **✅ Can link directories**

Unlike hard links.

## **✅ Can cross filesystems**

Soft links work across:

- Different partitions
- Different disks

## **✅ Breaks if original file removed**

If target file is deleted:

- Soft link becomes broken (dangling link).

# **🧱 3. Soft Link Syntax**

    ln -s target_file link_name

# **🧱 4. Example of Soft Link**

## **Step 1: Create file**

``` bash
echo "Linux Symlink" > original.txt
```

## **Step 2: Create symbolic link**

    ln -s original.txt shortcut.txt

## **Step 3: Check links**

``` bash
ls -l
```

Example:

shortcut.txt -\> original.txt

# **🧱 5. Testing Soft Link**

Read file:

cat shortcut.txt

Output:

Linux Symlink

# **🧱 6. Delete Original File**

rm original.txt

Now:

cat shortcut.txt

Output:

No such file or directory

Because:

- Symlink only stored the path.
- Original file disappeared.

# **🌿 SECTION 5: Hard Link vs Soft Link**

| **Feature**                | **Hard Link** | **Soft Link**   |
|----------------------------|---------------|-----------------|
| Reference Type             | Direct        | Indirect        |
| Inode                      | Same inode    | Different inode |
| File Size                  | Same size     | Small size      |
| Cross Filesystem           | No            | Yes             |
| Link Directories           | Usually No    | Yes             |
| Survives Original Deletion | Yes           | No              |
| Acts Like Original File    | Yes           | No              |
| Shortcut Style             | No            | Yes             |

# **🌿 SECTION 6: Viewing Links in Linux**

# **🧱 1. Check inode numbers**

``` bash
ls -li
```

# **🧱 2. Check symbolic links**

``` bash
ls -l
```

Example:

shortcut.txt -\> original.txt

# **🌿 SECTION 7: Real-World Uses of Links**

# **🧱 1. Software Shortcuts**

Linux applications often use symlinks:

Example:

    /usr/bin/python -> /usr/bin/python3

# **🧱 2. Shared Configuration Files**

Hard links allow multiple names for same data.

# **🧱 3. Storage Efficiency**

Hard links save disk space because:

- No duplicate data created.

# **🧱 4. Version Management**

Symlinks are heavily used in:

- Java versions
- Python versions
- Node.js environments

Example:

current -\> release_v2

# **🌿 SECTION 8: Important Commands**

| **Command**         | **Purpose**         |
|---------------------|---------------------|
| `ln file1 file2`    | Create hard link    |
| `ln -s file1 file2` | Create soft link    |
| `ls -li`            | Show inode numbers  |
| `ls -l`             | Show symbolic links |
| `rm file`           | Remove file/link    |

# **🌿 SECTION 9: Internal Working of Hard & Soft Links**

# **🧱 Hard Link Internals**

file1.txt ─┐

├──\> inode 12345 ───\> Data

file2.txt ─┘

Both names point directly to same inode.

# **🧱 Soft Link Internals**

shortcut.txt ───\> "original.txt" ───\> inode ───\> Data

Soft link only stores path.

# **🌿 SECTION 10: Broken (Dangling) Symbolic Links**

## **🧱 What is Dangling Link?**

A symlink pointing to a non-existing file.

Example:

shortcut.txt -\> missing.txt

## **🧱 Detect Broken Links**

``` bash
ls -l
```

or

``` bash
find -L . -type l
```

# **🌿 SECTION 11: Permissions and Links**

# **🧱 Hard Links**

Hard links share same permissions because:

- Same inode.

# **🧱 Soft Links**

Permissions usually depend on:

- Target file permissions.

# **🌿 SECTION 12: Advantages & Disadvantages**

# **✅ Hard Link Advantages**

- Saves disk space
- Survives filename deletion
- Fast direct reference

# **❌ Hard Link Disadvantages**

- Cannot cross filesystems
- Cannot easily link directories

# **✅ Soft Link Advantages**

- Flexible
- Works across disks
- Links directories
- Shortcut behavior

# **❌ Soft Link Disadvantages**

- Breaks if target removed
- Slightly slower (extra lookup)

# **🌿 SECTION 13: Common Interview Questions**

# **🧱 Difference between hard link and soft link?**

Hard link:

- Same inode
- Direct reference

Soft link:

- Different inode
- Path-based reference

# **🧱 Which survives original deletion?**

Hard link survives.  
Soft link breaks.

# **🧱 Which behaves like Windows shortcut?**

Soft link.

# **🧱 Which saves actual disk space?**

Hard links.

# **🌿 SECTION 14: Best Practices**

## **✅ Use Hard Links When**

- Same filesystem
- Need duplicate filename without duplicate data

## **✅ Use Soft Links When**

- Need shortcuts
- Linking directories
- Cross-filesystem linking

# **🌿 SECTION 15: Summary**

## **🧠 Final Understanding**

### **Hard Link**

- Direct inode reference
- Same actual file
- Survives deletion

### **Soft Link**

- Path-based shortcut
- Separate file
- Breaks if original removed

# **📌 Most Important Commands**

## **Create Hard Link**

    ln original.txt hardlink.txt

## **Create Soft Link**

    ln -s original.txt symlink.txt

## **View Inodes**

``` bash
ls -li
```

## **View Symbolic Links**

``` bash
ls -l
```

# **📘 Windows Subsystem for Linux (WSL)**

## **🌿 SECTION 1: What is WSL?**

## **🧱 1. What is Windows Subsystem for Linux (WSL)?**

Windows Subsystem for Linux is a feature in Windows that allows you to run a real Linux environment directly inside Windows without installing a separate virtual machine.

It lets you:

- Run Linux commands
- Use Linux terminal tools
- Install Linux distributions like Ubuntu
- Use Bash shell
- Run scripting languages
- Use Docker and DevOps tools
- Develop Linux-based applications

# **🧠 Simple Meaning**

WSL means:

> “Run Linux inside Windows without dual boot or heavy virtualization.”

Instead of:

- Installing Linux separately
- Creating a virtual machine

You can:

- Open Ubuntu inside Windows
- Use Linux commands directly
- Access Windows files from Linux
- Access Linux files from Windows

# **🏗️ Architecture of WSL**

## **WSL 1**

- First version
- Translates Linux system calls into Windows calls
- Fast file access
- Limited compatibility

## **WSL 2**

- Uses a real Linux kernel
- Better compatibility
- Supports Docker
- Better DevOps support
- Recommended version

# **⚖️ WSL 1 vs WSL 2**

| **Feature**    | **WSL 1**  | **WSL 2**    |
|----------------|------------|--------------|
| Linux Kernel   | No         | Yes          |
| Performance    | Good       | Better       |
| Docker Support | Limited    | Full         |
| Compatibility  | Partial    | Full         |
| System Calls   | Translated | Native Linux |
| Recommended    | No         | Yes          |

# **🌿 SECTION 2: Why WSL is Important?**

## **🧱 2. Why Developers Use WSL**

WSL is heavily used for:

- DevOps
- Docker
- Kubernetes
- Python development
- Node.js development
- Bash scripting
- Cloud engineering
- Linux administration practice

# **🌿 SECTION 3: Requirements**

## **🧱 3. Windows Requirements**

Supported:

- Windows 10
- Windows 11

Recommended:

- Windows 11 + WSL2

# **🌿 SECTION 4: Installing WSL**

# **🧱 4. Install WSL (Modern Method)**

Open PowerShell as Administrator:

wsl --install

This command:

- Enables WSL feature
- Installs WSL2
- Downloads Linux kernel
- Installs Ubuntu
- Sets Ubuntu as default distro

Restart your PC after installation.

# **🧱 5. Check WSL Version**

wsl --version

Example output:

WSL version: 2.3.24

Kernel version: 5.x.x

# **🧱 6. Check Installed Linux Distros**

wsl --list

OR

wsl -l

Detailed version:

wsl -l -v

Example:

NAME STATE VERSION

Ubuntu Running 2

# **🌿 SECTION 5: Installing Linux Distributions**

## **🧱 7. Install Ubuntu**

wsl --install -d Ubuntu

## **🧱 8. Install Debian**

wsl --install -d Debian

## **🧱 9. View Available Distros**

wsl --list --online

# **🌿 SECTION 6: Starting and Stopping WSL**

## **🧱 10. Start WSL**

wsl

OR open Ubuntu from Start Menu.

## **🧱 11. Shutdown WSL**

wsl --shutdown

Purpose:

- Stops all Linux distros
- Frees RAM and CPU

## **🧱 12. Terminate Specific Distro**

wsl --terminate Ubuntu

# **🌿 SECTION 7: Basic Linux Commands in WSL**

After opening Ubuntu:

## **📂 File & Directory Commands**

### **Current Directory**

pwd

### **List Files**

``` bash
ls
```

Detailed list:

``` bash
ls -l
```

Hidden files:

``` bash
ls -la
```

### **Change Directory**

cd foldername

Go back:

cd ..

Home directory:

``` bash
cd ~
```

### **Create Directory**

``` bash
mkdir myfolder
```

### **Remove Directory**

    rmdir myfolder

### **Create File**

touch file.txt

### **Copy File**

cp file.txt backup.txt

### **Move/Rename File**

mv file.txt newfile.txt

### **Delete File**

rm file.txt

# **🌿 SECTION 8: File Editing**

## **🧱 13. Nano Editor**

Create/open file:

``` bash
nano notes.txt
```

Save:

CTRL + O

Exit:

CTRL + X

# **🌿 SECTION 9: Package Management**

Ubuntu uses APT package manager.

## **🧱 14. Update Packages**

``` bash
sudo apt update
```

Purpose:

- Refresh package database

## **🧱 15. Upgrade Packages**

``` bash
sudo apt upgrade
```

Purpose:

- Install latest updates

## **🧱 16. Install Software**

Example:

``` bash
sudo apt install nginx
```

## **🧱 17. Remove Software**

``` bash
sudo apt remove nginx
```

# **🌿 SECTION 10: User Management**

## **🧱 18. Current User**

``` bash
whoami
```

## **🧱 19. Switch User**

su username

## **🧱 20. Root User**

``` bash
sudo -i
```

# **🌿 SECTION 11: Networking Commands**

## **🧱 21. Check IP Address**

ip a

## **🧱 22. Test Internet**

ping google.com

## **🧱 23. Check Open Ports**

``` bash
ss -tulnp
```

# **🌿 SECTION 12: Process Management**

## **🧱 24. View Running Processes**

``` bash
ps aux
```

## **🧱 25. Real-Time Process Monitor**

``` bash
top
```

Better version:

    htop

Install:

``` bash
sudo apt install htop
```

## **🧱 26. Kill Process**

kill PID

Force kill:

``` bash
kill -9 PID
```

# **🌿 SECTION 13: WSL + Windows Integration**

## **🧱 27. Access Windows Files from WSL**

Windows drives are mounted under:

/mnt/

Example:

``` bash
cd /mnt/c
```

Access Desktop:

``` bash
cd /mnt/c/Users/YourName/Desktop
```

## **🧱 28. Open Windows Explorer from Linux**

explorer.exe .

Purpose:

- Opens current Linux folder in Windows Explorer

## **🧱 29. Run Linux Command from PowerShell**

wsl ls

## **🧱 30. Run Windows App from WSL**

Example:

notepad.exe file.txt

# **🌿 SECTION 14: WSL File Locations**

Linux filesystem stored in:

\\wsl\$

Open in Explorer:

\\wsl\$\Ubuntu

# **🌿 SECTION 15: WSL Configuration**

## **🧱 31. Set Default WSL Version**

wsl --set-default-version 2

## **🧱 32. Convert WSL1 to WSL2**

wsl --set-version Ubuntu 2

# **🌿 SECTION 16: Install Development Tools**

## **🧱 33. Install Git**

``` bash
sudo apt install git
```

Check version:

``` bash
git --version
```

## **🧱 34. Install Python**

``` bash
sudo apt install python3
```

## **🧱 35. Install Node.js**

``` bash
sudo apt install nodejs npm
```

# **🌿 SECTION 17: WSL + VS Code**

Visual Studio Code works very well with WSL.

Install extension:

- Remote - WSL

Open folder in VS Code:

code .

# **🌿 SECTION 18: WSL + Docker**

Docker works best with WSL2.

Why important:

- Containers run faster
- Better Linux compatibility
- Used in DevOps labs

# **🌿 SECTION 19: Important WSL Commands**

| **Command**        | **Purpose**   |
|--------------------|---------------|
| `wsl`              | Start Linux   |
| `wsl --shutdown`   | Stop WSL      |
| `wsl -l -v`        | List distros  |
| `wsl --install`    | Install WSL   |
| `wsl --update`     | Update WSL    |
| `wsl --status`     | Show status   |
| `wsl --export`     | Backup distro |
| `wsl --import`     | Import distro |
| `wsl --unregister` | Remove distro |

# **🌿 SECTION 20: Backup & Restore**

## **🧱 36. Export Ubuntu**

wsl --export Ubuntu ubuntu-backup.tar

## **🧱 37. Import Ubuntu**

wsl --import Ubuntu-New D:\WSL\Ubuntu ubuntu-backup.tar

# **🌿 SECTION 21: Useful Linux Commands Cheat Sheet**

| **Command** | **Meaning**        |
|-------------|--------------------|
| `pwd`       | Current folder     |
| `ls`        | List files         |
| `cd`        | Change directory   |
| `mkdir`     | Create folder      |
| `rm`        | Delete             |
| `cp`        | Copy               |
| `mv`        | Move               |
| `nano`      | Edit file          |
| `cat`       | Show file          |
| `grep`      | Search text        |
| `find`      | Find files         |
| `chmod`     | Change permissions |
| `sudo`      | Admin privileges   |

# **🌿 SECTION 22: Common Problems**

## **🧱 38. WSL Not Starting**

Try:

wsl --shutdown

Then:

wsl

## **🧱 39. Reset Ubuntu**

wsl --unregister Ubuntu

WARNING:

- Deletes Linux data

# **🌿 SECTION 23: WSL for DevOps**

WSL is excellent for learning:

- Linux
- Bash scripting
- Docker
- Kubernetes
- Ansible
- Terraform
- Git
- CI/CD

Because most DevOps tools are Linux-native.

# **🌿 SECTION 24: Best Practices**

✅ Use WSL2  
✅ Store Linux projects inside Linux filesystem  
✅ Update packages regularly  
✅ Learn Bash scripting  
✅ Use Git inside WSL  
✅ Use VS Code Remote WSL

# **🌿 SECTION 25: Recommended Learning Path**

## **Beginner**

1.  Install WSL
2.  Learn Linux commands
3.  Learn file management
4.  Learn package management

## **Intermediate**

5.  Bash scripting
6.  Git
7.  Networking
8.  Process management

## **Advanced**

9.  Docker
10. Kubernetes
11. Terraform
12. CI/CD pipelines

# **🌿 SECTION 26: Real DevOps Practice in WSL**

You can practice:

- Linux administration
- Docker containers
- Kubernetes labs
- NGINX servers
- GitHub Actions
- Jenkins
- Bash automation
- Python scripting

All from your Windows laptop.

# **🌿 SECTION 27: Important WSL Commands Reference**

wsl --install

wsl --update

wsl --shutdown

wsl -l -v

wsl --status

wsl --set-version Ubuntu 2

# **🌿 SECTION 28: Useful Linux Commands Reference**

pwd

``` bash
ls
cd
mkdir
touch
cp
mv
rm
nano
cat
grep
find
sudo apt update
sudo apt upgrade
```

# **📘 Final Summary**

WSL allows you to:

- Learn Linux on Windows
- Practice DevOps tools
- Run Docker and Kubernetes
- Use Bash scripting
- Develop Linux applications
- Avoid dual boot and heavy VMs

For DevOps learners like you, WSL is one of the best tools to build a real Linux-based learning environment on Windows.
