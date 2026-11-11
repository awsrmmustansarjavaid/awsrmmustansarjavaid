# Day 82 — Observability II: Logs (Loki), Traces (OpenTelemetry) & Alerting

[← Day 81](../day-81/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 83 →](../day-83/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-75`, `90DaysOfDevOps-master/2026/day-76`, `90DaysOfDevOps-master/2026/day-77` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Centralise logs with Loki/Promtail or Alloy
- [ ] Instrument traces with OpenTelemetry
- [ ] Design actionable alerts with Alertmanager

## 2. Prerequisites

- Day 81.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Logs

Structured JSON logs with request IDs; Loki indexes labels not content (cheap); query with LogQL.

### 3.2 OpenTelemetry

Vendor-neutral APIs/SDKs/Collector for traces, metrics, logs. Collector pipeline: receivers -> processors -> exporters (Tempo/Jaeger/Prometheus/Loki). Correlate by trace ID.

### 3.3 Alerting

Alert on symptoms (user impact), not causes; multi-window burn-rate alerts; route by severity; link runbooks; avoid noisy pages.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install Loki + Grafana Alloy/Promtail; query logs in Grafana.
2. [ ] Add OTel auto-instrumentation to the app and run OTel Collector.
3. [ ] Send traces to Tempo/Jaeger; find a slow span.
4. [ ] Create Alertmanager route to Slack/email (or webhook stub).
5. [ ] Write 3 alerts each with runbook link and severity.

## 5. Real-World Scenario

> On-call received 80 pages last night; 70 were noise. Redesign alerts so only actionable ones page.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
helm install loki grafana/loki-stack -n monitoring
{app="web"} |= "ERROR" | json | line_format "{{.msg}}"
rate({app="web"} |= "ERROR" [5m])
opentelemetry-instrument --service_name web python app.py
# alert rule
- alert: HighErrorRate
  expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.02
  for: 10m
  labels: { severity: page }
  annotations: { runbook: https://github.com/USER/runbooks/high-errors.md }
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create alert catalogue table (symptom, owner, runbook). | You can demonstrate, without notes: *centralise logs with Loki/Promtail or Alloy* — with evidence committed to `day-82/`. |
| 2 | Add trace ID to logs for correlation. | You can demonstrate, without notes: *instrument traces with OpenTelemetry* — with evidence committed to `day-82/`. |
| 3 | Draw telemetry pipeline. | You can demonstrate, without notes: *design actionable alerts with Alertmanager* — with evidence committed to `day-82/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| No traces appear | Exporter endpoint/protocol mismatch; check Collector logs. |
| Alert flapping | Add `for:` duration and hysteresis. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Scrub PII from logs/traces; restrict log access; set retention limits.
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

1. Logs vs metrics vs traces?
2. What is OpenTelemetry?
3. Why symptom-based alerts?
4. What is Loki's indexing model?
5. **Scenario:** On-call received 80 pages last night; 70 were noise. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I correlate logs and traces? | ☐ | ☐ | ☐ | ☐ |
| Can I write an actionable alert? | ☐ | ☐ | ☐ | ☐ |
| Can I explain OTel pipeline? | ☐ | ☐ | ☐ | ☐ |
| Centralise logs with Loki/Promtail or Alloy | ☐ | ☐ | ☐ | ☐ |
| Instrument traces with OpenTelemetry | ☐ | ☐ | ☐ | ☐ |
| Design actionable alerts with Alertmanager | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-82/` in your own repository:

```text
day-82/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-82
git add day-82/
git commit -m "day-82: observability ii"
git push -u origin day-82
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

[← Day 81](../day-81/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 83 →](../day-83/README.md)


## Merged learning path — source integration

- **Primary daily plan:** this `README.md` is the structured lesson, labs, scenario, troubleshooting, assessment, and deliverables for the day.
- **Practical source repository:** `../reference-materials/90DaysOfDevOps-master/2026/day-82/` contains the original day's scripts, configs, screenshots references, and other artifacts.
- **Additional merged notes:** [SUPPLEMENTARY-MATERIALS.md](SUPPLEMENTARY-MATERIALS.md)
- **Daily finish:** commit your work, update `../LEARNING-TRACKER.md`, and record one issue you solved and one concept to revise.
