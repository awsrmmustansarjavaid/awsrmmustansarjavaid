# Day 29 — Containers Fundamentals & Docker Installation

[← Day 28](../day-28/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 30 →](../day-30/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-29` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain how containers differ from VMs
- [ ] Describe namespaces, cgroups and union filesystems
- [ ] Install Docker and run containers

## 2. Prerequisites

- Linux basics, Days 1-13.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Containers vs VMs

VMs virtualise hardware with a full guest OS; containers share the host kernel and isolate processes using namespaces (pid, net, mnt, uts, ipc, user) and limit resources using cgroups. Lighter, faster to start, but weaker isolation.

### 3.2 OCI and architecture

OCI defines image and runtime specs. Docker CLI -> dockerd -> containerd -> runc. Alternatives: Podman, containerd/nerdctl.

### 3.3 Core objects

Image (read-only layers), container (running instance), registry, volume, network.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Docker Engine (or Docker Desktop) and add user to `docker` group (understand the risk).
2. [ ] Run `hello-world`, `nginx`, `alpine sh -c`.
3. [ ] Inspect namespaces: `docker run -d nginx; ls -l /proc/<pid>/ns`.
4. [ ] Limit memory/CPU with `--memory 128m --cpus 0.5` and verify with `docker stats`.
5. [ ] Compare start time of a container vs a VM.

## 5. Real-World Scenario

> A developer says 'works on my machine'. Explain how containers fix environment drift and what they do NOT fix (kernel, data, config).

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
curl -fsSL https://get.docker.com | sh   # lab only; read the script first
docker version; docker info
docker run --rm hello-world
docker run -d --name web -p 8080:80 --memory 128m --cpus 0.5 nginx
docker ps; docker stats --no-stream
docker exec -it web sh
docker rm -f web
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Draw container architecture (Docker->containerd->runc). | You can demonstrate, without notes: *explain how containers differ from VMs* — with evidence committed to `day-29/`. |
| 2 | Write a table: VM vs container vs serverless. | You can demonstrate, without notes: *describe namespaces, cgroups and union filesystems* — with evidence committed to `day-29/`. |
| 3 | Run the same app in Podman and compare. | You can demonstrate, without notes: *install Docker and run containers* — with evidence committed to `day-29/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `permission denied /var/run/docker.sock` | Add user to docker group and re-login (it is root-equivalent!) or use rootless mode. |
| Port already in use | `ss -tulpn` and change host port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Docker group = root. Prefer rootless Docker/Podman where possible; never expose the Docker socket or API without TLS.
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

1. Containers vs VMs?
2. What are namespaces and cgroups?
3. What is the OCI?
4. Why is the docker group dangerous?
5. **Scenario:** A developer says 'works on my machine'. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I explain isolation mechanisms? | ☐ | ☐ | ☐ | ☐ |
| Can I limit container resources? | ☐ | ☐ | ☐ | ☐ |
| Can I inspect a running container? | ☐ | ☐ | ☐ | ☐ |
| Explain how containers differ from VMs | ☐ | ☐ | ☐ | ☐ |
| Describe namespaces, cgroups and union filesystems | ☐ | ☐ | ☐ | ☐ |
| Install Docker and run containers | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-29/` in your own repository:

```text
day-29/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-29
git add day-29/
git commit -m "day-29: containers fundamentals & docker installation"
git push -u origin day-29
gh pr create --fill   # review your own PR, then merge
```

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 15. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 16. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

---

[← Day 28](../day-28/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 30 →](../day-30/README.md)
