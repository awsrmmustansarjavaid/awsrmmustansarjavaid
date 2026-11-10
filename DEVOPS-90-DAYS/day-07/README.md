# Day 07 — Packages, Storage (LVM) & Week 1 Mini-Project

[← Day 06](../day-06/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 08 →](../day-08/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 1 — Linux & Systems Engineering |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-13` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Manage packages with apt/dnf
- [ ] Understand disks, partitions, filesystems and LVM
- [ ] Combine Week 1 skills in a server-setup project

## 2. Prerequisites

- Days 1-6.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Package management

apt (Debian/Ubuntu): `update`, `install`, `remove`, `purge`, `list --installed`, `apt-cache policy`. dnf (RHEL): `dnf install`, `dnf history`. Always pin/verify repos and GPG keys.

### 3.2 Storage

Block devices (`lsblk`) -> partitions -> filesystems (ext4/xfs) -> mount (`/etc/fstab`). LVM adds PV, VG, LV so volumes can grow online.

### 3.3 Mini-project

Provision a 'web-01' server end to end using only CLI and document it as a reproducible runbook.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Add a virtual disk or use a loop device: `dd if=/dev/zero of=disk.img bs=1M count=500; sudo losetup -fP disk.img`.
2. [ ] Create PV/VG/LV, format ext4, mount to `/data`, add fstab entry (with `nofail`).
3. [ ] Extend the LV by 100 MB and `resize2fs` online.
4. [ ] Install nginx, create user `deploy`, create /srv/site, configure service.
5. [ ] Write `runbook-web-01.md` listing every step.

## 5. Real-World Scenario

> The /data volume of the app server is full at 2 AM. Extend it without downtime and prove it with before/after `df -h` output.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
sudo apt update && sudo apt install -y lvm2 nginx
lsblk -f
sudo pvcreate /dev/loop0 && sudo vgcreate vg_data /dev/loop0
sudo lvcreate -L 300M -n lv_app vg_data
sudo mkfs.ext4 /dev/vg_data/lv_app
sudo mkdir /data && sudo mount /dev/vg_data/lv_app /data
sudo lvextend -L +100M -r /dev/vg_data/lv_app
df -h /data
apt-cache policy nginx; dpkg -L nginx | head
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Turn the runbook into a Bash script `setup-web01.sh` (idempotent where possible). | You can demonstrate, without notes: *manage packages with apt/dnf* — with evidence committed to `day-07/`. |
| 2 | Compare `ext4` and `xfs` in 5 bullets. | You can demonstrate, without notes: *understand disks, partitions, filesystems and LVM* — with evidence committed to `day-07/`. |
| 3 | Create a Week-1 cheat sheet. | You can demonstrate, without notes: *combine Week 1 skills in a server-setup project* — with evidence committed to `day-07/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `mount: wrong fs type` | Format the device first with mkfs; verify with `blkid`. |
| Boot fails after fstab edit | Use `nofail`, test with `sudo mount -a` before reboot. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Verify package signatures, only add trusted repos, enable unattended-upgrades for security patches.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 10. Daily Completion Checklist

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

## 11. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 12. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. PV vs VG vs LV?
2. How to grow a filesystem online?
3. apt update vs apt upgrade?
4. Why use `nofail` in fstab?
5. **Scenario:** The /data volume of the app server is full at 2 AM. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I extend an LV? | ☐ | ☐ | ☐ | ☐ |
| Can I explain the storage stack? | ☐ | ☐ | ☐ | ☐ |
| Can I reproduce my server from the runbook? | ☐ | ☐ | ☐ | ☐ |
| Manage packages with apt/dnf | ☐ | ☐ | ☐ | ☐ |
| Understand disks, partitions, filesystems and LVM | ☐ | ☐ | ☐ | ☐ |
| Combine Week 1 skills in a server-setup project | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-07/` in your own repository:

```text
day-07/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-07
git add day-07/
git commit -m "day-07: packages, storage (lvm) & week 1 mini-project"
git push -u origin day-07
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Week 1 mini-project: runbook + setup script + cheat sheet.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 06](../day-06/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 08 →](../day-08/README.md)
