# Day 81 — Observability I: Prometheus, Exporters & Grafana

[← Day 80](../day-80/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 82 →](../day-82/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-73`, `90DaysOfDevOps-master/2026/day-74` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Explain metrics, logs and traces and when each helps
- [ ] Deploy Prometheus and Grafana (kube-prometheus-stack)
- [ ] Write PromQL and build a dashboard

## 2. Prerequisites

- Days 71-77.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Observability pillars

Metrics (aggregated numbers), logs (events), traces (request path across services), plus profiling and events. Monitoring tells you something is wrong; observability helps you ask why.

### 3.2 Prometheus

Pull-based TSDB; targets via ServiceMonitor/PodMonitor; metric types (counter, gauge, histogram); PromQL `rate()`, `sum by`, `histogram_quantile`.

### 3.3 Grafana

Dashboards as code (JSON/Terraform/ConfigMaps); golden signals: latency, traffic, errors, saturation (RED/USE methods).

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install `kube-prometheus-stack` via Helm (or Argo CD).
2. [ ] Open Grafana; explore built-in dashboards.
3. [ ] Instrument your app with `/metrics` (prometheus_client) and add ServiceMonitor.
4. [ ] Write PromQL: request rate, error ratio, p95 latency.
5. [ ] Create dashboard with RED panels and export JSON to git.

## 5. Real-World Scenario

> Latency complaints: show how to find which service/endpoint and since when, within 5 minutes.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
helm install mon prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
kubectl -n monitoring port-forward svc/mon-grafana 3000:80
sum(rate(http_requests_total[5m])) by (path)
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
kubectl apply -f servicemonitor.yaml
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write the 4 golden signals for your app. | You can demonstrate, without notes: *explain metrics, logs and traces and when each helps* — with evidence committed to `day-81/`. |
| 2 | Export dashboard JSON to repo. | You can demonstrate, without notes: *deploy Prometheus and Grafana (kube-prometheus-stack)* — with evidence committed to `day-81/`. |
| 3 | Explain cardinality problems. | You can demonstrate, without notes: *write PromQL and build a dashboard* — with evidence committed to `day-81/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Target DOWN | Wrong port/label/ServiceMonitor selector/NetworkPolicy. |
| High cardinality | Avoid user IDs/URLs as labels. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Secure Grafana/Prometheus with auth; don't expose metrics publicly; avoid sensitive data in labels.
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

1. Counter vs gauge vs histogram?
2. What are golden signals?
3. Pull vs push metrics?
4. What is cardinality?
5. **Scenario:** Latency complaints: show how to find which service/endpoint and since when, within 5 minutes. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I query PromQL? | ☐ | ☐ | ☐ | ☐ |
| Can I build a dashboard? | ☐ | ☐ | ☐ | ☐ |
| Can I instrument an app? | ☐ | ☐ | ☐ | ☐ |
| Explain metrics, logs and traces and when each helps | ☐ | ☐ | ☐ | ☐ |
| Deploy Prometheus and Grafana (kube-prometheus-stack) | ☐ | ☐ | ☐ | ☐ |
| Write PromQL and build a dashboard | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-81/` in your own repository:

```text
day-81/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-81
git add day-81/
git commit -m "day-81: observability i"
git push -u origin day-81
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

[← Day 80](../day-80/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 82 →](../day-82/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-81/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
