# Day 82 — Observability II: Logs (Loki), Traces (OpenTelemetry) & Alerting

[← Day 81](../day-81/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 83 →](../day-83/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 12 — K8s Operations, GitOps, Observability & SRE |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 82 -- EKS Networking with Gateway API and Persistent Storage

#### Task
Your EKS cluster is running and the AI-BankApp deployed with raw manifests. But production needs proper ingress, HTTPS, session persistence, and reliable storage. The AI-BankApp project uses the Kubernetes Gateway API with Envoy Gateway instead of traditional Ingress -- the next generation of Kubernetes traffic management.

Today you set up the Gateway API, configure TLS with cert-manager, understand EBS storage in action, and explore the AI-BankApp's production networking setup.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch `feat/gitops`) -- `k8s/gateway.yml`, `k8s/cert-manager.yml`, `k8s/pv.yml`, `k8s/pvc.yml`

---

#### Expected Output
- Envoy Gateway installed on EKS
- Gateway API resources (GatewayClass, Gateway, HTTPRoute) configured
- cert-manager installed with Let's Encrypt ClusterIssuer
- EBS persistent storage working for MySQL and Ollama
- Understanding of session persistence for stateful web apps
- A markdown file: `day-82-eks-networking-storage.md`

---

#### Challenge Tasks

##### Task 1: Understand Gateway API vs Ingress
The AI-BankApp uses the Gateway API instead of the traditional Ingress resource. Research the differences:

| Feature | Ingress | Gateway API |
|---------|---------|-------------|
| API maturity | Stable but limited | GA since Kubernetes 1.26 |
| Traffic splitting | Not supported | Built-in (weighted backends) |
| Header matching | Annotation-dependent | Native HTTPRoute rules |
| Role separation | Single resource | GatewayClass (infra) -> Gateway (ops) -> HTTPRoute (dev) |
| TLS management | Annotation-based | Native TLS config in Gateway listeners |
| Session affinity | Not standardized | BackendTrafficPolicy (with Envoy) |

**The AI-BankApp's Gateway architecture:**
```
[Internet]
    |
[AWS NLB] (created by Envoy Gateway)
    |
[Gateway: bankapp-gateway]
  |-- Listener: HTTP (port 80)
  |-- Listener: HTTPS (port 443, TLS terminated)
    |
[HTTPRoute: bankapp-route]
    |
[Service: bankapp-service:8080]
    |
[Pods: bankapp x2-4] (with session affinity via cookie)
```

---

##### Task 2: Install Envoy Gateway
Envoy Gateway is the Gateway API implementation the AI-BankApp uses.

Install via Helm:
```bash
helm install envoy-gateway oci://docker.io/envoyproxy/gateway-helm \
  --version v1.4.0 \
  -n envoy-gateway-system --create-namespace \
  --wait
```

Verify:
```bash
kubectl get pods -n envoy-gateway-system
kubectl get gatewayclass
```

You should see the `envoy-gateway` GatewayClass registered.

Now install the Gateway API CRDs if not already present:
```bash
kubectl get crd gateways.gateway.networking.k8s.io 2>/dev/null || \
  kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
```

---

##### Task 3: Deploy the AI-BankApp with Gateway API
Make sure the app is deployed (from Day 81):
```bash
kubectl get pods -n bankapp
```

If not running, redeploy the core manifests:
```bash
cd AI-BankApp-DevOps
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/pv.yml
kubectl apply -f k8s/pvc.yml
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/mysql-deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ollama-deployment.yml
kubectl apply -f k8s/bankapp-deployment.yml
kubectl apply -f k8s/hpa.yml
```

**Now study and apply the Gateway configuration.**

Open `k8s/gateway.yml` and understand each resource:

**1. GatewayClass** -- defines which controller handles Gateways:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy-gateway
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
```

**2. Gateway** -- creates the actual load balancer with listeners:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: bankapp-gateway
  namespace: bankapp
spec:
  gatewayClassName: envoy-gateway
  listeners:
    - name: http
      protocol: HTTP
      port: 80
    - name: https
      protocol: HTTPS
      port: 443
      hostname: <your-ip>.nip.io
      tls:
        mode: Terminate
        certificateRefs:
          - name: bankapp-tls
```

When this is applied, Envoy Gateway creates an AWS NLB (Network Load Balancer) automatically.

**3. HTTPRoute** -- routes traffic to the BankApp service:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: bankapp-route
  namespace: bankapp
spec:
  parentRefs:
    - name: bankapp-gateway
      sectionName: https
    - name: bankapp-gateway
      sectionName: http
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: bankapp-service
          port: 8080
```

**4. BackendTrafficPolicy** -- session persistence via cookies:
```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: bankapp-session
  namespace: bankapp
spec:
  targetRefs:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      name: bankapp-route
  loadBalancer:
    type: ConsistentHash
    consistentHash:
      type: Cookie
      cookie:
        name: BANKAPP_AFFINITY
        ttl: 3600s
```

**Why cookie-based session affinity?** The AI-BankApp uses Spring Security with form-based login. Without session affinity, a user's requests could hit different pods, and they would be logged out. The `BANKAPP_AFFINITY` cookie ensures all requests from a user go to the same pod.

Apply the Gateway configuration:
```bash
kubectl apply -f k8s/gateway.yml
```

Wait for the NLB to be provisioned:
```bash
kubectl get gateway -n bankapp -w
```

Get the external IP:
```bash
export GATEWAY_IP=$(kubectl get gateway bankapp-gateway -n bankapp -o jsonpath='{.status.addresses[0].value}')
echo "App URL: http://$GATEWAY_IP"
```

Test access:
```bash
curl http://$GATEWAY_IP
```

---

##### Task 4: Set Up TLS with cert-manager
The AI-BankApp uses cert-manager with Let's Encrypt for automatic HTTPS certificates.

Install cert-manager:
```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  -n cert-manager --create-namespace \
  --set crds.enabled=true \
  --wait
```

Verify:
```bash
kubectl get pods -n cert-manager
```

Study and apply the ClusterIssuer from `k8s/cert-manager.yml`:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-account-key
    solvers:
      - http01:
          gatewayHTTPRoute:
            parentRefs:
              - group: gateway.networking.k8s.io
                kind: Gateway
                name: bankapp-gateway
                namespace: bankapp
```

**How it works:**
1. cert-manager requests a certificate from Let's Encrypt
2. Let's Encrypt sends an HTTP-01 challenge
3. cert-manager creates a temporary HTTPRoute to respond to the challenge
4. Let's Encrypt verifies and issues the certificate
5. cert-manager stores the certificate in the `bankapp-tls` Secret
6. The Gateway uses this Secret for HTTPS termination

To use this, you need a hostname that points to your NLB IP. The AI-BankApp uses `nip.io` for quick DNS:
```bash
export HOSTNAME="${GATEWAY_IP}.nip.io"
echo "HTTPS URL: https://$HOSTNAME"
```

Update the Gateway hostname and apply:
```bash
# For learning: you can skip TLS and just use HTTP
# For production: update gateway.yml with your hostname and apply cert-manager.yml
```

---

##### Task 5: Understand EBS Persistent Storage in Action
The AI-BankApp uses EBS volumes for MySQL (5Gi) and Ollama (10Gi). Study how they work on EKS.

Check the storage setup:
```bash
# StorageClass
kubectl get storageclass gp3

# PVCs
kubectl get pvc -n bankapp

# PVs (dynamically provisioned)
kubectl get pv
```

Output should look like:
```
NAME                      STATUS   VOLUME         CAPACITY   STORAGECLASS
mysql-pvc                 Bound    pvc-abc123...  5Gi        gp3
ollama-pvc                Bound    pvc-def456...  10Gi       gp3
```

**Find the actual EBS volumes in AWS:**
```bash
aws ec2 describe-volumes \
  --filters "Name=tag:kubernetes.io/created-by,Values=ebs.csi.aws.com" \
  --query "Volumes[*].{ID:VolumeId,Size:Size,AZ:AvailabilityZone,State:State}" \
  --output table \
  --region us-west-2
```

**Key EBS concepts on EKS:**
- `WaitForFirstConsumer` -- the volume is created in the same AZ as the pod that claims it
- `ReadWriteOnce` -- EBS can only attach to one node at a time (MySQL and Ollama use Recreate strategy because of this)
- `gp3` -- latest generation SSD, 3000 IOPS baseline, cheaper than gp2
- `allowVolumeExpansion: true` -- you can grow volumes without recreating them

**Test persistence** -- delete the MySQL pod and watch it come back with data intact:
```bash
# Check current MySQL data
kubectl exec -n bankapp deploy/mysql -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"

# Delete the pod
kubectl delete pod -n bankapp -l app=mysql

# Watch it recreate
kubectl get pods -n bankapp -l app=mysql -w

# Verify data survived
kubectl exec -n bankapp deploy/mysql -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"
```

The database is intact because the EBS volume persists independently of the pod.

---

##### Task 6: Explore HPA and Node Capacity
The AI-BankApp's HPA scales pods between 2 and 4 based on CPU.

```bash
kubectl get hpa -n bankapp
```

Check resource usage across nodes:
```bash
kubectl top nodes
kubectl top pods -n bankapp
```

**Resource budget for the AI-BankApp on 3x t3.medium nodes:**

| Component | CPU Request | Memory Request | Instances |
|-----------|-----------|---------------|-----------|
| BankApp | 250m | 256Mi | 2-4 pods |
| MySQL | 250m | 256Mi | 1 pod |
| Ollama | 900m | 2Gi | 1 pod |
| Init containers | 50m | 32Mi | temporary |
| System pods | ~500m | ~500Mi | per node |
| **Total available** | **6000m (3 nodes)** | **12Gi (3 nodes)** | |

Ollama is the heaviest consumer. If you scale BankApp to 4 pods, total CPU requests reach ~2.9 cores + system overhead.

**Clean up the workload (keep the cluster for Day 83):**
```bash
kubectl delete -f k8s/gateway.yml 2>/dev/null
kubectl delete -f k8s/hpa.yml
kubectl delete -f k8s/bankapp-deployment.yml
kubectl delete -f k8s/ollama-deployment.yml
kubectl delete -f k8s/mysql-deployment.yml
kubectl delete -f k8s/service.yml
kubectl delete -f k8s/secrets.yml
kubectl delete -f k8s/configmap.yml
kubectl delete -f k8s/pvc.yml
kubectl delete -f k8s/pv.yml
kubectl delete -f k8s/namespace.yml
```

---

#### Hints
- Gateway API is the future of Kubernetes ingress -- it is officially supported and will eventually replace the Ingress resource
- Envoy Gateway creates an AWS NLB automatically when a Gateway resource is applied -- check the AWS EC2 console under Load Balancers
- `BackendTrafficPolicy` is Envoy-specific -- other Gateway implementations (like Istio) have their own session affinity mechanisms
- EBS volumes are AZ-locked. If a pod moves to a node in a different AZ, the volume cannot follow. `WaitForFirstConsumer` prevents this by delaying volume creation until the pod is scheduled
- The `Recreate` deployment strategy for MySQL and Ollama is intentional -- EBS cannot attach to two nodes simultaneously, so the old pod must terminate before the new one starts
- cert-manager with Gateway API requires the `gateway-api` feature gate -- make sure you installed cert-manager with CRDs enabled
- `nip.io` is a wildcard DNS service: `1.2.3.4.nip.io` resolves to `1.2.3.4` -- useful for quick TLS testing without buying a domain
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-82-eks-networking-storage.md` with:
- Gateway API architecture diagram: NLB -> Gateway -> HTTPRoute -> Service -> Pods
- Comparison table: Gateway API vs Ingress
- Each Gateway API resource explained (GatewayClass, Gateway, HTTPRoute, BackendTrafficPolicy)
- Why cookie-based session affinity is needed for the AI-BankApp
- Screenshot of `kubectl get gateway` showing the NLB address
- How cert-manager automates TLS certificates
- EBS storage flow: StorageClass -> PVC -> PV -> EBS Volume -> Pod
- Screenshot of `kubectl get pvc` showing bound volumes
- Resource budget table for the AI-BankApp on EKS

---

#### Submission
1. Add `day-82-eks-networking-storage.md` to `2026/day-82/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Deep dive into EKS production networking today -- set up the Kubernetes Gateway API with Envoy Gateway for the AI-BankApp, configured cookie-based session persistence for Spring Security, explored cert-manager for automated HTTPS, and verified EBS persistent storage survives pod restarts. Gateway API is the future of Kubernetes traffic management."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create alert catalogue table (symptom, owner, runbook). | You can demonstrate, without notes: *centralise logs with Loki/Promtail or Alloy* — with evidence committed to `day-82/`. |
| 2 | Add trace ID to logs for correlation. | You can demonstrate, without notes: *instrument traces with OpenTelemetry* — with evidence committed to `day-82/`. |
| 3 | Draw telemetry pipeline. | You can demonstrate, without notes: *design actionable alerts with Alertmanager* — with evidence committed to `day-82/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| No traces appear | Exporter endpoint/protocol mismatch; check Collector logs. |
| Alert flapping | Add `for:` duration and hysteresis. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Scrub PII from logs/traces; restrict log access; set retention limits.
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

1. Logs vs metrics vs traces?
2. What is OpenTelemetry?
3. Why symptom-based alerts?
4. What is Loki's indexing model?
5. **Scenario:** On-call received 80 pages last night; 70 were noise. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 48 |
| Hands-on labs and commands (Sections 4–6) | 108 |
| Assignment + troubleshooting (Sections 7–8) | 48 |
| Interview practice, documentation, Git push (Sections 11–14) | 36 |
| **Total** | **240 (≈ 4.0 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Challenge Notes — Day 82: Handling Multi-Environment Deployments

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 82** of the DevOps 90-Day Challenge!
"It works on my machine" is not an excuse. "It works in Dev but fails in Prod" is a tragedy. Today we learn to manage **Dev, Staging, and Production**.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Structure your Infrastructure as Code for multiple environments.
* Manage **Configuration Drift**.
* Implement **Promotion Strategies** (Dev -> Stage -> Prod).
* Handle **Environment Variables** securely.

---

#### Tools Used

* **Terraform** (Workspaces)
* **Helm** (Values files)
* **GitHub Actions** (Environments)

---

#### Key Concepts

##### 1. Terraform Strategies
*   **Workspaces**: `terraform workspace new dev`. Same .tf files, different state files. Good for similar envs.
*   **Directory Layout**: `envs/dev`, `envs/prod`. Each folder has its own `main.tf` and state. Good for isolating permissions (Prod has stricter IAM).

##### 2. Helm Values
*   `values.yaml`: Defaults.
*   `values-dev.yaml`: Overrides (`replicaCount: 1`).
*   `values-prod.yaml`: Overrides (`replicaCount: 10`, `resources: limits: cpu: 1`).

##### 3. Promotion Pipeline
The artifact (Docker Image) should be built **ONCE**.
1.  Build Image `v1.2`.
2.  Deploy `v1.2` to Dev. Test.
3.  Deploy `v1.2` to Stage. Test.
4.  Deploy `v1.2` to Prod.
*Never rebuild the image for Prod. You might get different dependencies.*

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Parity** | Trying to keep Dev and Prod as similar as possible (using same OS, same DB engine) to avoid surprises. |
| **Gating** | Adding a "Manual Approval" button in the pipeline before deploying to Prod. |
| **ConfigMaps** | Injecting `DB_HOST` via ConfigMap, so the code remains agnostic. |

---

#### Bonus (Extra Learning)

*   Use **Terraform Cloud** to manage state locking and remote runs.
*   Implement **Ephemeral Environments** (spin up a temporary env for every Pull Request).

---

#### Congratulations!

You have mastered the release lifecycle. This ensures stability and reliability.

---

#### Try These Next

*   Create a "Hotfix" pipeline branch strategy.
*   Automate the cleanup of old environments.

## 19. Cohort Practice — Day 82: EKS Networking with Gateway API and Persistent Storage

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Your EKS cluster is running and the AI-BankApp deployed with raw manifests. But production needs proper ingress, HTTPS, session persistence, and reliable storage. The AI-BankApp project uses the Kubernetes Gateway API with Envoy Gateway instead of traditional Ingress -- the next generation of Kubernetes traffic management.

Today you set up the Gateway API, configure TLS with cert-manager, understand EBS storage in action, and explore the AI-BankApp's production networking setup.

Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch `feat/gitops`) -- `k8s/gateway.yml`, `k8s/cert-manager.yml`, `k8s/pv.yml`, `k8s/pvc.yml`

-----------

#### Expected Output

- Envoy Gateway installed on EKS
- Gateway API resources (GatewayClass, Gateway, HTTPRoute) configured
- cert-manager installed with Let's Encrypt ClusterIssuer
- EBS persistent storage working for MySQL and Ollama
- Understanding of session persistence for stateful web apps
- A markdown file: `day-82-eks-networking-storage.md`


---

#### Challenge Tasks

##### Task 1: Understand Gateway API vs Ingress
The AI-BankApp uses the Gateway API instead of the traditional Ingress resource. Research the differences:

| Feature | Ingress | Gateway API |
|---------|---------|-------------|
| API maturity | Stable but limited | GA since Kubernetes 1.26 |
| Traffic splitting | Not supported | Built-in (weighted backends) |
| Header matching | Annotation-dependent | Native HTTPRoute rules |
| Role separation | Single resource | GatewayClass (infra) -> Gateway (ops) -> HTTPRoute (dev) |
| TLS management | Annotation-based | Native TLS config in Gateway listeners |
| Session affinity | Not standardized | BackendTrafficPolicy (with Envoy) |

**The AI-BankApp's Gateway architecture:**
```
[Internet]
    |
[AWS NLB] (created by Envoy Gateway)
    |
[Gateway: bankapp-gateway]
  |-- Listener: HTTP (port 80)
  |-- Listener: HTTPS (port 443, TLS terminated)
    |
[HTTPRoute: bankapp-route]
    |
[Service: bankapp-service:8080]
    |
[Pods: bankapp x2-4] (with session affinity via cookie)
```

---

##### Task 2: Install Envoy Gateway
Envoy Gateway is the Gateway API implementation the AI-BankApp uses.

Install via Helm:
```bash
helm install envoy-gateway oci://docker.io/envoyproxy/gateway-helm \
  --version v1.4.0 \
  -n envoy-gateway-system --create-namespace \
  --wait
```

Verify:
```bash
kubectl get pods -n envoy-gateway-system
kubectl get gatewayclass
```

You should see the `envoy-gateway` GatewayClass registered.

Now install the Gateway API CRDs if not already present:
```bash
kubectl get crd gateways.gateway.networking.k8s.io 2>/dev/null || \
  kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
```

---

##### Task 3: Deploy the AI-BankApp with Gateway API
Make sure the app is deployed (from Day 81):
```bash
kubectl get pods -n bankapp
```

If not running, redeploy the core manifests:
```bash
cd AI-BankApp-DevOps
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/pv.yml
kubectl apply -f k8s/pvc.yml
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/mysql-deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ollama-deployment.yml
kubectl apply -f k8s/bankapp-deployment.yml
kubectl apply -f k8s/hpa.yml
```

**Now study and apply the Gateway configuration.**

Open `k8s/gateway.yml` and understand each resource:

**1. GatewayClass** -- defines which controller handles Gateways:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy-gateway
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
```


**2. Gateway** -- creates the actual load balancer with listeners:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: bankapp-gateway
  namespace: bankapp
spec:
  gatewayClassName: envoy-gateway
  listeners:
    - name: http
      protocol: HTTP
      port: 80
    - name: https
      protocol: HTTPS
      port: 443
      hostname: <your-ip>.nip.io
      tls:
        mode: Terminate
        certificateRefs:
          - name: bankapp-tls
```

When this is applied, Envoy Gateway creates an AWS NLB (Network Load Balancer) automatically.

**3. HTTPRoute** -- routes traffic to the BankApp service:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: bankapp-route
  namespace: bankapp
spec:
  parentRefs:
    - name: bankapp-gateway
      sectionName: https
    - name: bankapp-gateway
      sectionName: http
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: bankapp-service
          port: 8080
```

**4. BackendTrafficPolicy** -- session persistence via cookies:
```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: BackendTrafficPolicy
metadata:
  name: bankapp-session
  namespace: bankapp
spec:
  targetRefs:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      name: bankapp-route
  loadBalancer:
    type: ConsistentHash
    consistentHash:
      type: Cookie
      cookie:
        name: BANKAPP_AFFINITY
        ttl: 3600s
```

**Why cookie-based session affinity?** The AI-BankApp uses Spring Security with form-based login. Without session affinity, a user's requests could hit different pods, and they would be logged out. The `BANKAPP_AFFINITY` cookie ensures all requests from a user go to the same pod.

Apply the Gateway configuration:
```bash
kubectl apply -f k8s/gateway.yml
```

Wait for the NLB to be provisioned:
```bash
kubectl get gateway -n bankapp -w
```

Get the external IP:
```bash
export GATEWAY_IP=$(kubectl get gateway bankapp-gateway -n bankapp -o jsonpath='{.status.addresses[0].value}')
echo "App URL: http://$GATEWAY_IP"
```

Test access:
```bash
curl http://$GATEWAY_IP
```

---

##### Task 4: Set Up TLS with cert-manager
The AI-BankApp uses cert-manager with Let's Encrypt for automatic HTTPS certificates.

Install cert-manager:
```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  -n cert-manager --create-namespace \
  --set crds.enabled=true \
  --wait
```

Verify:
```bash
kubectl get pods -n cert-manager
```

Study and apply the ClusterIssuer from `k8s/cert-manager.yml`:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-account-key
    solvers:
      - http01:
          gatewayHTTPRoute:
            parentRefs:
              - group: gateway.networking.k8s.io
                kind: Gateway
                name: bankapp-gateway
                namespace: bankapp
```

**How it works:**
1. cert-manager requests a certificate from Let's Encrypt
2. Let's Encrypt sends an HTTP-01 challenge
3. cert-manager creates a temporary HTTPRoute to respond to the challenge
4. Let's Encrypt verifies and issues the certificate
5. cert-manager stores the certificate in the `bankapp-tls` Secret
6. The Gateway uses this Secret for HTTPS termination

To use this, you need a hostname that points to your NLB IP. The AI-BankApp uses `nip.io` for quick DNS:
```bash
export HOSTNAME="${GATEWAY_IP}.nip.io"
echo "HTTPS URL: https://$HOSTNAME"
```

Update the Gateway hostname and apply:
```bash
# For learning: you can skip TLS and just use HTTP
# For production: update gateway.yml with your hostname and apply cert-manager.yml
```

---

##### Task 5: Understand EBS Persistent Storage in Action
The AI-BankApp uses EBS volumes for MySQL (5Gi) and Ollama (10Gi). Study how they work on EKS.

Check the storage setup:
```bash
# StorageClass
kubectl get storageclass gp3

# PVCs
kubectl get pvc -n bankapp

# PVs (dynamically provisioned)
kubectl get pv
```

Output should look like:
```
NAME                      STATUS   VOLUME         CAPACITY   STORAGECLASS
mysql-pvc                 Bound    pvc-abc123...  5Gi        gp3
ollama-pvc                Bound    pvc-def456...  10Gi       gp3
```

**Find the actual EBS volumes in AWS:**
```bash
aws ec2 describe-volumes \
  --filters "Name=tag:kubernetes.io/created-by,Values=ebs.csi.aws.com" \
  --query "Volumes[*].{ID:VolumeId,Size:Size,AZ:AvailabilityZone,State:State}" \
  --output table \
  --region us-west-2
```

**Key EBS concepts on EKS:**
- `WaitForFirstConsumer` -- the volume is created in the same AZ as the pod that claims it
- `ReadWriteOnce` -- EBS can only attach to one node at a time (MySQL and Ollama use Recreate strategy because of this)
- `gp3` -- latest generation SSD, 3000 IOPS baseline, cheaper than gp2
- `allowVolumeExpansion: true` -- you can grow volumes without recreating them

**Test persistence** -- delete the MySQL pod and watch it come back with data intact:
```bash
# Check current MySQL data
kubectl exec -n bankapp deploy/mysql -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"

# Delete the pod
kubectl delete pod -n bankapp -l app=mysql

# Watch it recreate
kubectl get pods -n bankapp -l app=mysql -w

# Verify data survived
kubectl exec -n bankapp deploy/mysql -- mysql -uroot -pTest@123 -e "SHOW DATABASES;"
```

The database is intact because the EBS volume persists independently of the pod.

---

##### Task 6: Explore HPA and Node Capacity
The AI-BankApp's HPA scales pods between 2 and 4 based on CPU.

```bash
kubectl get hpa -n bankapp
```

Check resource usage across nodes:
```bash
kubectl top nodes
kubectl top pods -n bankapp
```

**Resource budget for the AI-BankApp on 3x t3.medium nodes:**

| Component | CPU Request | Memory Request | Instances |
|-----------|-----------|---------------|-----------|
| BankApp | 250m | 256Mi | 2-4 pods |
| MySQL | 250m | 256Mi | 1 pod |
| Ollama | 900m | 2Gi | 1 pod |
| Init containers | 50m | 32Mi | temporary |
| System pods | ~500m | ~500Mi | per node |
| **Total available** | **6000m (3 nodes)** | **12Gi (3 nodes)** | |

Ollama is the heaviest consumer. If you scale BankApp to 4 pods, total CPU requests reach ~2.9 cores + system overhead.

**Clean up the workload (keep the cluster for Day 83):**
```bash
kubectl delete -f k8s/gateway.yml 2>/dev/null
kubectl delete -f k8s/hpa.yml
kubectl delete -f k8s/bankapp-deployment.yml
kubectl delete -f k8s/ollama-deployment.yml
kubectl delete -f k8s/mysql-deployment.yml
kubectl delete -f k8s/service.yml
kubectl delete -f k8s/secrets.yml
kubectl delete -f k8s/configmap.yml
kubectl delete -f k8s/pvc.yml
kubectl delete -f k8s/pv.yml
kubectl delete -f k8s/namespace.yml
```

---

#### Hints
- Gateway API is the future of Kubernetes ingress -- it is officially supported and will eventually replace the Ingress resource
- Envoy Gateway creates an AWS NLB automatically when a Gateway resource is applied -- check the AWS EC2 console under Load Balancers
- `BackendTrafficPolicy` is Envoy-specific -- other Gateway implementations (like Istio) have their own session affinity mechanisms
- EBS volumes are AZ-locked. If a pod moves to a node in a different AZ, the volume cannot follow. `WaitForFirstConsumer` prevents this by delaying volume creation until the pod is scheduled
- The `Recreate` deployment strategy for MySQL and Ollama is intentional -- EBS cannot attach to two nodes simultaneously, so the old pod must terminate before the new one starts
- cert-manager with Gateway API requires the `gateway-api` feature gate -- make sure you installed cert-manager with CRDs enabled
- `nip.io` is a wildcard DNS service: `1.2.3.4.nip.io` resolves to `1.2.3.4` -- useful for quick TLS testing without buying a domain
- Reference: https://github.com/TrainWithShubham/AI-BankApp-DevOps (branch: `feat/gitops`)

---

#### Documentation
Create `day-82-eks-networking-storage.md` with:
- Gateway API architecture diagram: NLB -> Gateway -> HTTPRoute -> Service -> Pods
- Comparison table: Gateway API vs Ingress
- Each Gateway API resource explained (GatewayClass, Gateway, HTTPRoute, BackendTrafficPolicy)
- Why cookie-based session affinity is needed for the AI-BankApp
- Screenshot of `kubectl get gateway` showing the NLB address
- How cert-manager automates TLS certificates
- EBS storage flow: StorageClass -> PVC -> PV -> EBS Volume -> Pod
- Screenshot of `kubectl get pvc` showing bound volumes
- Resource budget table for the AI-BankApp on EKS

---

#### Submission
1. Add `day-82-eks-networking-storage.md` to `2026/day-82/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Deep dive into EKS production networking today -- set up the Kubernetes Gateway API with Envoy Gateway for the AI-BankApp, configured cookie-based session persistence for Spring Security, explored cert-manager for automated HTTPS, and verified EBS persistent storage survives pod restarts. Gateway API is the future of Kubernetes traffic management."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 82: Argo Rollouts Canary Deployment

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Argo Rollouts Canary Deployment**.

#### 🎯 Learning Goals
- Understand the fundamentals of Argo Rollouts Canary Deployment.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day82: Argo Rollouts Canary Deployment`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 81](../day-81/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 83 →](../day-83/README.md)
