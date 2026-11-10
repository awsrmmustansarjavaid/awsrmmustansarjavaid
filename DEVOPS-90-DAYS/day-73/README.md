# Day 73 — Kubernetes Services, Ingress & Gateway API

[← Day 72](../day-72/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 74 →](../day-74/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |
| **Your existing repo reference** | `90DaysOfDevOps-master/2026/day-53` |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Expose applications with ClusterIP, NodePort, LoadBalancer
- [ ] Route HTTP traffic with Ingress/Gateway API
- [ ] Understand cluster DNS and kube-proxy

## 2. Prerequisites

- Day 72.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Services

Stable virtual IP + DNS name (`svc.ns.svc.cluster.local`) load-balancing over matching pod endpoints. Types: ClusterIP, NodePort, LoadBalancer, ExternalName, headless.

### 3.2 Ingress and Gateway API

Ingress (legacy-stable) and Gateway API (modern, role-oriented: GatewayClass, Gateway, HTTPRoute) provide L7 routing, TLS, host/path rules. Install a controller (NGINX, Envoy Gateway, Traefik).

### 3.3 DNS

CoreDNS resolves service names; test with a debug pod.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create ClusterIP service for web; curl from a debug pod.
2. [ ] Install ingress controller or Envoy Gateway on kind.
3. [ ] Create HTTPRoute/Ingress routing `/api` and `/` to two services.
4. [ ] Add TLS with cert-manager self-signed issuer.
5. [ ] Inspect Endpoints/EndpointSlices.

## 5. Real-World Scenario

> Expose three microservices on one domain with path routing and HTTPS, without 3 cloud load balancers.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
kubectl expose deploy web --port 80 --target-port 80
kubectl run dbg --rm -it --image=curlimages/curl -- curl -s web.dev.svc.cluster.local
kubectl get endpointslices -n dev
# HTTPRoute
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
spec: { parentRefs: [{ name: gw }], hostnames: ["app.local"], rules: [{ matches: [{ path: { value: /api } }], backendRefs: [{ name: api, port: 80 }] }] }
```

## 7. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Explain Service vs Ingress vs Gateway. | You can demonstrate, without notes: *expose applications with ClusterIP, NodePort, LoadBalancer* — with evidence committed to `day-73/`. |
| 2 | Add rate-limit or header policy. | You can demonstrate, without notes: *route HTTP traffic with Ingress/Gateway API* — with evidence committed to `day-73/`. |
| 3 | Draw traffic flow from user to pod. | You can demonstrate, without notes: *understand cluster DNS and kube-proxy* — with evidence committed to `day-73/`. |

## 8. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Service has no endpoints | Selector labels mismatch; check `kubectl get ep`. |
| 404 from ingress | Host/path rule or wrong backend port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 9. Security, Reliability & Cost Considerations

- **Security:** Terminate TLS at ingress, restrict admin routes, use NetworkPolicies (Day 76).
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

1. ClusterIP vs NodePort vs LoadBalancer?
2. Ingress vs Gateway API?
3. How does service discovery work?
4. How do you debug no endpoints?
5. **Scenario:** Expose three microservices on one domain with path routing and HTTPS, without 3 cloud load balancers. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 13. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I expose an app with path routing? | ☐ | ☐ | ☐ | ☐ |
| Can I debug a service? | ☐ | ☐ | ☐ | ☐ |
| Can I explain DNS in cluster? | ☐ | ☐ | ☐ | ☐ |
| Expose applications with ClusterIP, NodePort, LoadBalancer | ☐ | ☐ | ☐ | ☐ |
| Route HTTP traffic with Ingress/Gateway API | ☐ | ☐ | ☐ | ☐ |
| Understand cluster DNS and kube-proxy | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 14. GitHub Submission

Commit today's work under `day-73/` in your own repository:

```text
day-73/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-73
git add day-73/
git commit -m "day-73: kubernetes services, ingress & gateway api"
git push -u origin day-73
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

[← Day 72](../day-72/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 74 →](../day-74/README.md)
