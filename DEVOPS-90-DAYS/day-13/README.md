# Day 13 — Linux Hardening & Security Baseline

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 14 →](../day-14/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 2 — Networking, SSH, Web Serving & Hardening |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Apply a practical hardening baseline
- [ ] Use fail2ban, auditd, unattended-upgrades
- [ ] Audit with Lynis

## 2. Prerequisites

- Days 4-12.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Hardening layers

Patch, minimise software, restrict access (SSH, sudo), firewall, log/audit, file integrity and backups. Align with CIS Benchmarks.

### 3.2 Tools

`fail2ban` bans brute-force IPs, `auditd` records security events, `unattended-upgrades` automates patches, `lynis` scans and scores.

### 3.3 Secrets on hosts

Don't store secrets in shell history or world-readable files; use environment injection from a secrets manager.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run `sudo lynis audit system` and note the hardening index.
2. [ ] Install and configure fail2ban for sshd (maxretry 3, bantime 1h).
3. [ ] Enable unattended-upgrades for security updates.
4. [ ] Add an auditd rule to watch `/etc/passwd`.
5. [ ] Re-run lynis and compare scores.

## 5. Real-World Scenario

> A pen-test report says: 'Password auth enabled, no patching, no brute-force protection.' Fix all three and provide evidence.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt install -y lynis fail2ban auditd unattended-upgrades
sudo lynis audit system | tail -30
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
sudo ausearch -k passwd_changes
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 13 – Linux Volume Management (LVM) — Challenge Brief

#### Task
Learn LVM to manage storage flexibly – create, extend, and mount volumes.

**Watch First:** [Linux LVM Tutorial](https://youtu.be/Evnf2AAt7FQ?si=ncnfQYySYtK_2K3c)

---

#### Expected Output
- A markdown file: `day-13-lvm.md`
- Screenshots of command outputs

---

#### Before You Start

Switch to root user:
```bash
sudo -i
```
or
```bash
sudo su
```
No spare disk? Create a virtual one (watch the tutorial):
```bash
dd if=/dev/zero of=/tmp/disk1.img bs=1M count=1024
losetup -fP /tmp/disk1.img
losetup -a   # Note the device name (e.g., /dev/loop0)
```

---

#### Challenge Tasks

##### Task 1: Check Current Storage
Run: `lsblk`, `pvs`, `vgs`, `lvs`, `df -h`

##### Task 2: Create Physical Volume
```bash
pvcreate /dev/sdb   # or your loop device
pvs
```

##### Task 3: Create Volume Group
```bash
vgcreate devops-vg /dev/sdb
vgs
```

##### Task 4: Create Logical Volume
```bash
lvcreate -L 500M -n app-data devops-vg
lvs
```

##### Task 5: Format and Mount
```bash
mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data
```

##### Task 6: Extend the Volume
```bash
lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data
```

---

#### Documentation

Create `day-13-lvm.md` with:
- Commands used
- Screenshots of outputs
- What you learned (3 points)

---

#### Submission
1. Add your `day-13-lvm.md` to `2026/day-13/`
2. Commit and push

---

#### Learn in Public

Share your LVM progress on LinkedIn.

```
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
```

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 13 – Linux Volume Management (LVM) — Notes & Solution

#### Task
Learn LVM to manage storage flexibly – create, extend, and mount volumes.

---

📌 ### Task 1: Check Current Storage
Run: `lsblk`, `pvs`, `vgs`, `lvs`, `df -h`
<img width="1914" height="833" alt="Screenshot 2026-08-04 215521" src="https://github.com/user-attachments/assets/3443e10a-f5f9-42e6-a51e-bba2996c1441" />

📌 ### Task 2: Create Physical Volume
```bash
pvcreate /dev/sdb   # or your loop device
pvs
```
<img width="1906" height="451" alt="Screenshot 2026-08-04 222421" src="https://github.com/user-attachments/assets/7c55695d-9c89-47ee-a041-98982e3b5613" />

📌 ### Task 3: Create Volume Group
```bash
vgcreate devops-vg /dev/sdb
vgs
```
<img width="885" height="193" alt="Screenshot 2026-08-04 222530" src="https://github.com/user-attachments/assets/80e79c9f-3c7f-48d4-810f-944991a87d9c" />

📌 ### Task 4: Create Logical Volume
```bash
lvcreate -L 500M -n app-data devops-vg
lvs
```
<img width="1341" height="167" alt="Screenshot 2026-08-04 222611" src="https://github.com/user-attachments/assets/cefe70bf-aef6-4d93-8dbc-f2af5e1ed37b" />

📌 ### Task 5: Format and Mount
```bash
mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data
```
<img width="1919" height="575" alt="Screenshot 2026-08-04 222840" src="https://github.com/user-attachments/assets/a9d6c9c1-c1cc-4c7a-8c1e-128771beb898" />

📌 ### Task 6: Extend the Volume
```bash
lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data
```
<img width="1633" height="371" alt="Screenshot 2026-08-04 223102" src="https://github.com/user-attachments/assets/bb3f998a-9086-420e-a87a-ef7045a7a140" />

---

🛠️ ## Commands used
```bash
lsblk
pvcreate /dev/loop21
pvs

vgcreate devops-vg /dev/loop21
vgs

lvcreate -L 500M -n app-data devops-vg
lvs

mkfs.ext4 /dev/devops-vg/app-data
mkdir -p /mnt/app-data
mount /dev/devops-vg/app-data /mnt/app-data
df -h /mnt/app-data

lvextend -L +200M /dev/devops-vg/app-data
resize2fs /dev/devops-vg/app-data
df -h /mnt/app-data

lvdisplay
vgdisplay
pvdisplay

```
---
#### What I Learned
- Learned the LVM storage hierarchy: Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV).
- Learned how to convert raw disks into Physical Volumes using `pvcreate`.
- Learned how to combine multiple Physical Volumes into a single Volume Group using `vgcreate`.
- Learned how to create and manage Logical Volumes using `lvcreate`.
- Learned how to format and mount Logical Volumes using the ext4 filesystem.
- Learned the difference between mounting a Logical Volume and mounting a disk directly.
- Learned how to verify storage configuration using `pvs`, `vgs`, `lvs`, and `lsblk`.
- Learned how to inspect detailed LVM information using `pvdisplay`, `vgdisplay`, and `lvdisplay`.
- Learned how to safely unmount storage using `umount`.
- Learned how to extend a Logical Volume dynamically using `lvextend` and resize the filesystem using `resize2fs`.

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a 15-item hardening checklist and mark which you've applied. | You can demonstrate, without notes: *apply a practical hardening baseline* — with evidence committed to `day-13/`. |
| 2 | Disable unused services with `systemctl disable`. | You can demonstrate, without notes: *use fail2ban, auditd, unattended-upgrades* — with evidence committed to `day-13/`. |
| 3 | Compare lynis score before/after. | You can demonstrate, without notes: *audit with Lynis* — with evidence committed to `day-13/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| fail2ban bans yourself | Whitelist your IP in `ignoreip`; unban with `fail2ban-client unban`. |
| Auditd log huge | Tune rules and rotate logs. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Defence in depth: patch, least privilege, minimal attack surface, logging. Record changes in version control.
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

1. What is CIS Benchmark?
2. How does fail2ban work?
3. Why unattended-upgrades?
4. What is auditd for?
5. **Scenario:** A pen-test report says: 'Password auth enabled, no patching, no brute-force protection. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I produce before/after hardening evidence? | ☐ | ☐ | ☐ | ☐ |
| Can I explain defence in depth? | ☐ | ☐ | ☐ | ☐ |
| Can I unban an IP? | ☐ | ☐ | ☐ | ☐ |
| Apply a practical hardening baseline | ☐ | ☐ | ☐ | ☐ |
| Use fail2ban, auditd, unattended-upgrades | ☐ | ☐ | ☐ | ☐ |
| Audit with Lynis | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-13/` in your own repository:

```text
day-13/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-13
git add day-13/
git commit -m "day-13: linux hardening & security baseline"
git push -u origin day-13
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

[← Day 12](../day-12/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 14 →](../day-14/README.md)
