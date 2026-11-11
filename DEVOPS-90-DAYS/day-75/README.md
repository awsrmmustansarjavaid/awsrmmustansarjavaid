# Day 75 — Resource Management, Probes, HPA & Scheduling

[← Day 74](../day-74/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 76 →](../day-76/README.md)

| | |
|---|---|
| **Phase** | Phase 4 - Platform, Reliability & Career |
| **Week** | Week 11 — Kubernetes & Helm |
| **Difficulty** | Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Set requests/limits correctly
- [ ] Configure liveness, readiness and startup probes
- [ ] Autoscale and control scheduling

## 2. Prerequisites

- Days 72-74; metrics-server.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Resources

Requests drive scheduling; limits cap usage (CPU throttle, memory OOMKill). QoS classes: Guaranteed/Burstable/BestEffort. LimitRange and ResourceQuota enforce policy.

### 3.2 Probes

Startup (slow boot), readiness (receives traffic), liveness (restart when hung). Misconfigured liveness causes outages.

### 3.3 Scaling and placement

HPA (CPU/memory/custom metrics), VPA concepts, KEDA, PodDisruptionBudget, affinity/anti-affinity, taints/tolerations, topology spread.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Install metrics-server; use `kubectl top`.
2. [ ] Add requests/limits and probes to Deployment.
3. [ ] Create HPA (target 50% CPU) and generate load.
4. [ ] Trigger OOMKill intentionally; diagnose.
5. [ ] Add PDB and topology spread; drain a node and observe.

## 5. Real-World Scenario

> Black-Friday traffic is 10x. The pods are getting OOMKilled and nodes are overcommitted. Fix sizing and autoscaling.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }
readinessProbe: { httpGet: { path: /health, port: 8000 }, periodSeconds: 5 }
livenessProbe:  { httpGet: { path: /health, port: 8000 }, initialDelaySeconds: 15, failureThreshold: 3 }
kubectl autoscale deploy web --cpu-percent=50 --min=2 --max=10
kubectl top pods; kubectl describe hpa web
kubectl drain node1 --ignore-daemonsets
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 75 -- Log Management with Loki and Promtail — Challenge Brief

#### Task
Metrics tell you _what_ is broken. Logs tell you _why_. Yesterday you built the metrics pipeline with Prometheus, Node Exporter, cAdvisor, and Grafana. Today you add the second pillar of observability -- logs.

You will set up Grafana Loki (a log aggregation system built by the Grafana team) and Promtail (the agent that ships logs to Loki). By the end of today, your Grafana instance will show both metrics and logs side by side.

---

#### Expected Output
- Loki running as a log storage backend
- Promtail collecting Docker container logs and shipping them to Loki
- Loki added as a datasource in Grafana
- LogQL queries running in Grafana Explore
- A markdown file: `day-75-loki-promtail.md`

---

#### Challenge Tasks

##### Task 1: Understand the Logging Pipeline
Before writing any config, understand how the pieces fit together:

```
[Docker Containers]
       |
       | (write JSON logs to /var/lib/docker/containers/)
       v
  [Promtail]
       |
       | (reads log files, adds labels, pushes to Loki)
       v
    [Loki]
       |
       | (stores logs, indexes by labels)
       v
   [Grafana]
       |
       | (queries Loki with LogQL, displays logs)
       v
   [You]
```

Key differences from the ELK stack:
- Loki does **not** index the full text of logs -- it only indexes labels (like container name, job, filename)
- This makes Loki much cheaper to run and simpler to operate
- Think of it as "Prometheus, but for logs" -- same label-based approach

**Document:** Why does Loki only index labels instead of full text? What is the trade-off?

---

##### Task 2: Add Loki to the Stack
Create the Loki configuration file.

```bash
mkdir -p loki
```

Create `loki/loki-config.yml`:
```yaml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory
  replication_factor: 1
  path_prefix: /loki

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

storage_config:
  filesystem:
    directory: /loki/chunks
```

**What this config does:**
- `auth_enabled: false` -- single-tenant mode, no authentication needed
- `store: tsdb` -- uses Loki's time-series database for indexing
- `object_store: filesystem` -- stores log chunks on local disk
- `replication_factor: 1` -- single instance, no replication (fine for learning)

Add Loki to your `docker-compose.yml`:
```yaml
  loki:
    image: grafana/loki:latest
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - ./loki/loki-config.yml:/etc/loki/loki-config.yml
      - loki_data:/loki
    command: -config.file=/etc/loki/loki-config.yml
    restart: unless-stopped
```

Add `loki_data` to your volumes section:
```yaml
volumes:
  prometheus_data:
  grafana_data:
  loki_data:
```

Start Loki:
```bash
docker compose up -d loki
```

Verify Loki is running:
```bash
curl http://localhost:3100/ready
```

You should see `ready`.

---

##### Task 3: Add Promtail to Collect Container Logs
Promtail is the log collection agent. It reads Docker container log files from the host and pushes them to Loki.

```bash
mkdir -p promtail
```

Create `promtail/promtail-config.yml`:
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    static_configs:
      - targets:
          - localhost
        labels:
          job: docker
          __path__: /var/lib/docker/containers/*/*-json.log
    pipeline_stages:
      - docker: {}
```

**What this config does:**
- `positions` -- tracks which log lines have already been shipped (like a bookmark)
- `clients` -- where to send logs (Loki endpoint)
- `__path__` -- the glob pattern to find Docker JSON log files on the host
- `pipeline_stages: docker: {}` -- parses the Docker JSON log format and extracts timestamp, stream (stdout/stderr), and the log message

Add Promtail to your `docker-compose.yml`:
```yaml
  promtail:
    image: grafana/promtail:latest
    container_name: promtail
    volumes:
      - ./promtail/promtail-config.yml:/etc/promtail/promtail-config.yml
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/promtail-config.yml
    restart: unless-stopped
```

**Why these volume mounts?**
- `/var/lib/docker/containers` -- where Docker stores container log files (read-only)
- `/var/run/docker.sock` -- lets Promtail discover container metadata (names, labels)

Restart the stack:
```bash
docker compose up -d
```

Generate some logs by hitting the notes app:
```bash
for i in $(seq 1 20); do curl -s http://localhost:8000 > /dev/null; done
```

---

##### Task 4: Add Loki as a Grafana Datasource
You can add it manually through the UI or auto-provision it with YAML.

**Option A -- Provision via YAML (recommended):**

Update `grafana/provisioning/datasources/datasources.yml`:
```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    editable: false
```

Restart Grafana to pick up the new datasource:
```bash
docker compose restart grafana
```

**Option B -- Manual UI setup:**
1. Go to Connections > Data Sources > Add data source
2. Select Loki
3. URL: `http://loki:3100`
4. Save & Test

Either way, you should now have two datasources in Grafana: Prometheus and Loki.

---

##### Task 5: Query Logs with LogQL
LogQL is Loki's query language -- similar to PromQL but for logs.

Go to Grafana > Explore (compass icon). Select Loki as the datasource.

1. **Stream selector** -- filter logs by labels:
```logql
{job="docker"}
```
This shows all Docker container logs.

2. **Filter by container name:**
```logql
{container_name="prometheus"}
```

3. **Keyword search** -- filter log lines by content:
```logql
{job="docker"} |= "error"
```
`|=` means "line contains". This finds all log lines with the word "error".

4. **Negative filter:**
```logql
{job="docker"} != "health"
```
Excludes lines containing "health" (useful to filter out health check noise).

5. **Regex filter:**
```logql
{job="docker"} |~ "status=[45]\\d{2}"
```
Finds lines with HTTP 4xx or 5xx status codes.

6. **Log metric queries** -- count log lines over time:
```logql
count_over_time({job="docker"}[5m])
```

7. **Rate of logs per second:**
```logql
rate({job="docker"}[5m])
```

8. **Top containers by log volume:**
```logql
topk(5, sum by (container_name) (rate({job="docker"}[5m])))
```

**Exercise:** Write a LogQL query that finds all error logs from the notes-app container in the last 1 hour. Then write another query that counts how many error lines per minute.

---

##### Task 6: Correlate Metrics and Logs in Grafana
The real power of observability is correlation -- seeing metrics and logs together.

1. **Add a logs panel to your dashboard:**
   - Open the dashboard you built on Day 74
   - Add a new panel
   - Select Loki as the datasource
   - Query: `{job="docker"}`
   - Visualization: Logs
   - Title: "Container Logs"

2. **Use the Explore split view:**
   - Go to Explore
   - Click the split button (two panels side by side)
   - Left panel: Prometheus -- `rate(container_cpu_usage_seconds_total{name="notes-app"}[5m])`
   - Right panel: Loki -- `{container_name="notes-app"}`
   - Now you can see CPU spikes and the corresponding log output at the same time

3. **Time sync:** Click on a spike in the metrics graph and both panels will zoom to that time range. This is how you debug in production -- you see a metric anomaly and immediately check the logs from that exact moment.

**Document:** How does having metrics and logs in the same tool (Grafana) help during incident response compared to checking separate systems?

---

#### Hints
- Loki labels are like Prometheus labels -- keep cardinality low (container name and job are good; user ID or request ID as labels would kill performance)
- `|=` is case-sensitive. Use `|~ "(?i)error"` for case-insensitive matching
- If you see no logs in Grafana, check: is Promtail running? Is it reading from the correct path? Check Promtail targets at `http://localhost:9080/targets`
- On macOS with Docker Desktop, the Docker log path (`/var/lib/docker/containers/`) is inside the Docker VM -- Promtail needs to run as a container to access it
- Loki is not a replacement for full-text search engines (Elasticsearch). It trades search power for simplicity and cost
- `positions.yaml` tracks read progress -- if you delete it, Promtail re-reads all logs
- Reference repo: https://github.com/LondheShubham153/observability-for-devops -- check `loki/` and `promtail/` directories

---

#### Documentation
Create `day-75-loki-promtail.md` with:
- Architecture diagram: Docker containers -> Promtail -> Loki -> Grafana
- Your `loki-config.yml` and `promtail-config.yml` with explanations
- Updated `docker-compose.yml` with all services so far
- Screenshot of Grafana Explore showing logs from Loki
- Five LogQL queries you ran and what they returned
- Screenshot showing metrics and logs side by side in Grafana
- Comparison: Loki vs ELK stack (when would you use each?)

---

#### Submission
1. Add `day-75-loki-promtail.md` to `2026/day-75/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Added the second pillar of observability today -- logs. Set up Loki and Promtail to collect all Docker container logs, queried them with LogQL in Grafana, and correlated metrics with logs side by side. When a CPU spike happens, I can now instantly see the exact log lines from that moment."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 75 -- Log Management with Loki and Promtail — Notes & Solution

#### Task
Metrics tell you _what_ is broken. Logs tell you _why_. Yesterday you built the metrics pipeline with Prometheus, Node Exporter, cAdvisor, and Grafana. Today you add the second pillar of observability -- logs.

You will set up Grafana Loki (a log aggregation system built by the Grafana team) and Promtail (the agent that ships logs to Loki). By the end of today, your Grafana instance will show both metrics and logs side by side.

---

#### Challenge Tasks

##### Task 1: Understand the Logging Pipeline
Before writing any config, understand how the pieces fit together:

```
[Docker Containers]
       |
       | (write JSON logs to /var/lib/docker/containers/)
       v
  [Promtail]
       |
       | (reads log files, adds labels, pushes to Loki)
       v
    [Loki]
       |
       | (stores logs, indexes by labels)
       v
   [Grafana]
       |
       | (queries Loki with LogQL, displays logs)
       v
   [You]
```

Key differences from the ELK stack:
- Loki does **not** index the full text of logs -- it only indexes labels (like container name, job, filename)
- This makes Loki much cheaper to run and simpler to operate
- Think of it as "Prometheus, but for logs" -- same label-based approach

**Document:** Why does Loki only index labels instead of full text? What is the trade-off?
- Loki indexes only labels to keep storage and costs low.

- **Benefit**
    - Much cheaper & faster ingestion
    - Uses less storage than full-text indexing

- **Trade-off**
   - Log searches are slower (needs to scan log content)
   - Less powerful than full-text search systems

---

##### Task 2: Add Loki to the Stack
Create the Loki configuration file.

```bash
mkdir -p loki
```

Create `loki/loki-config.yml`:
```yaml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory
  replication_factor: 1
  path_prefix: /loki

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

storage_config:
  filesystem:
    directory: /loki/chunks
```

**What this config does:**
- `auth_enabled: false` -- single-tenant mode, no authentication needed
- `store: tsdb` -- uses Loki's time-series database for indexing
- `object_store: filesystem` -- stores log chunks on local disk
- `replication_factor: 1` -- single instance, no replication (fine for learning)

Add Loki to your `docker-compose.yml`:
```yaml
  loki:
    image: grafana/loki:latest
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - ./loki/loki-config.yml:/etc/loki/loki-config.yml
      - loki_data:/loki
    command: -config.file=/etc/loki/loki-config.yml
    restart: unless-stopped
```

Add `loki_data` to your volumes section:
```yaml
volumes:
  prometheus_data:
  grafana_data:
  loki_data:
```

Start Loki:
```bash
docker compose up -d loki
```

Verify Loki is running:
```bash
curl http://localhost:3100/ready
```

You should see `ready`.

<img width="766" height="90" alt="image" src="https://github.com/user-attachments/assets/efe7396c-7932-475b-a83b-a257b06b7125" />

---

##### Task 3: Add Promtail to Collect Container Logs
Promtail is the log collection agent. It reads Docker container log files from the host and pushes them to Loki.

```bash
mkdir -p promtail
```

Create `promtail/promtail-config.yml`:
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    static_configs:
      - targets:
          - localhost
        labels:
          job: docker
          __path__: /var/lib/docker/containers/*/*-json.log
    pipeline_stages:
      - docker: {}
```

**What this config does:**
- `positions` -- tracks which log lines have already been shipped (like a bookmark)
- `clients` -- where to send logs (Loki endpoint)
- `__path__` -- the glob pattern to find Docker JSON log files on the host
- `pipeline_stages: docker: {}` -- parses the Docker JSON log format and extracts timestamp, stream (stdout/stderr), and the log message

Add Promtail to your `docker-compose.yml`:
```yaml
  promtail:
    image: grafana/promtail:latest
    container_name: promtail
    volumes:
      - ./promtail/promtail-config.yml:/etc/promtail/promtail-config.yml
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/promtail-config.yml
    restart: unless-stopped
```

**Why these volume mounts?**
- `/var/lib/docker/containers` -- where Docker stores container log files (read-only)
- `/var/run/docker.sock` -- lets Promtail discover container metadata (names, labels)

Restart the stack:
```bash
docker compose up -d
```

Generate some logs by hitting the notes app:
```bash
for i in $(seq 1 20); do curl -s http://localhost:8000 > /dev/null; done
```

---

##### Task 4: Add Loki as a Grafana Datasource
You can add it manually through the UI or auto-provision it with YAML.

**Option A -- Provision via YAML (recommended):**

Update `grafana/provisioning/datasources/datasources.yml`:
```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    editable: false
```

Restart Grafana to pick up the new datasource:
```bash
docker compose restart grafana
```

**Option B -- Manual UI setup:**
1. Go to Connections > Data Sources > Add data source
2. Select Loki
3. URL: `http://loki:3100`
4. Save & Test

Either way, you should now have two datasources in Grafana: Prometheus and Loki.

<img width="902" height="469" alt="image" src="https://github.com/user-attachments/assets/16ad9f95-b3ab-4dc5-b3a4-9bd1ea5eb272" />

---

##### Task 5: Query Logs with LogQL
LogQL is Loki's query language -- similar to PromQL but for logs.

Go to Grafana > Explore (compass icon). Select Loki as the datasource.

1. **Stream selector** -- filter logs by labels:
```logql
{job="docker"}
```
This shows all Docker container logs.

<img width="1005" height="562" alt="image" src="https://github.com/user-attachments/assets/450cd966-1a52-44cc-a6ce-45cf48130f54" />

2. **Filter by container name:**
```logql
{container_name="prometheus"}
```

<img width="1006" height="602" alt="image" src="https://github.com/user-attachments/assets/a0f6a6df-7ac8-4efd-a1e7-f98c7ae8e21c" />

3. **Keyword search** -- filter log lines by content:
```logql
{job="docker"} |= "error"
```
`|=` means "line contains". This finds all log lines with the word "error".

<img width="1012" height="617" alt="image" src="https://github.com/user-attachments/assets/aeb94aae-85d0-484a-a3df-9f84f38ddb25" />

4. **Negative filter:**
```logql
{job="docker"} != "health"
```
Excludes lines containing "health" (useful to filter out health check noise).

<img width="986" height="622" alt="image" src="https://github.com/user-attachments/assets/a22dd013-b7ac-4fca-9d39-d1bd0dd4a271" />

5. **Regex filter:**
```logql
{job="docker"} |~ "status=[45]\\d{2}"
```
Finds lines with HTTP 4xx or 5xx status codes.

<img width="1013" height="614" alt="image" src="https://github.com/user-attachments/assets/1f2e92dd-134c-41fb-9023-2361a7981083" />

6. **Log metric queries** -- count log lines over time:
```logql
count_over_time({job="docker"}[5m])
```

<img width="1009" height="450" alt="image" src="https://github.com/user-attachments/assets/666b3645-8652-4f7a-8e70-6d6fd7461ea1" />

7. **Rate of logs per second:**
```logql
rate({job="docker"}[5m])
```

<img width="1010" height="492" alt="image" src="https://github.com/user-attachments/assets/2a1cefa7-7051-4dc2-9c45-9058cbf62958" />

8. **Top containers by log volume:**
```logql
topk(5, sum by (container_name) (rate({job="docker"}[5m])))
```

<img width="1006" height="518" alt="image" src="https://github.com/user-attachments/assets/1b5e0cb4-2d77-4e3f-9b6b-fb2175b3ad70" />

**Exercise:** Write a LogQL query that finds all error logs from the notes-app container in the last 1 hour. Then write another query that counts how many error lines per minute.

- ```{container_name="notes-app"} |~ "(?i)error|404|exception"```
<img width="976" height="586" alt="image" src="https://github.com/user-attachments/assets/dc86c2e8-3a0c-4114-bfcc-47d5defcda7e" />

- ```count_over_time({container_name="notes-app"} |~ "(?i)error|404|exception"[1m])```
<img width="1010" height="586" alt="image" src="https://github.com/user-attachments/assets/70127190-ee82-4ca2-895d-3e31f78f101f" />

---

##### Task 6: Correlate Metrics and Logs in Grafana
The real power of observability is correlation -- seeing metrics and logs together.

1. **Add a logs panel to your dashboard:**
   - Open the dashboard you built on Day 74
   - Add a new panel
   - Select Loki as the datasource
   - Query: `{job="docker"}`
   - Visualization: Logs
   - Title: "Container Logs"

<img width="1010" height="396" alt="image" src="https://github.com/user-attachments/assets/dec1289d-70e2-434e-8204-c2c19dea4cb4" />

2. **Use the Explore split view:**
   - Go to Explore
   - Click the split button (two panels side by side)
   - Left panel: Prometheus -- `rate(container_cpu_usage_seconds_total{name="notes-app"}[5m])`
   - Right panel: Loki -- `{container_name="notes-app"}`
   - Now you can see CPU spikes and the corresponding log output at the same time

<img width="978" height="398" alt="image" src="https://github.com/user-attachments/assets/d865db68-22ca-4221-8ad4-586094a9bf87" />

3. **Time sync:** Click on a spike in the metrics graph and both panels will zoom to that time range. This is how you debug in production -- you see a metric anomaly and immediately check the logs from that exact moment.

**Document:** How does having metrics and logs in the same tool (Grafana) help during incident response compared to checking separate systems?

- Having metrics and logs in the same tool helps because you can quickly go from seeing a problem in metrics to checking the related logs without switching systems.

- This makes troubleshooting faster during incidents.

- **Comparison: Loki vs ELK stack (when would you use each?)**

**Loki vs ELK:**

* **Loki** → best for **cheap, simple, high-volume logging** tied to services (works great with Grafana/Prometheus). Limited full-text search, relies on labels.
* **ELK stack (Elasticsearch + Logstash + Kibana)** → best for **powerful full-text search, deep log analysis, and security/audit use cases**, but heavier and more expensive to run.

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Document sizing method (measure, set, review). | You can demonstrate, without notes: *set requests/limits correctly* — with evidence committed to `day-75/`. |
| 2 | Explain why CPU limits can hurt latency. | You can demonstrate, without notes: *configure liveness, readiness and startup probes* — with evidence committed to `day-75/`. |
| 3 | Write PDB for 3-replica app. | You can demonstrate, without notes: *autoscale and control scheduling* — with evidence committed to `day-75/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| OOMKilled (137) | Raise memory limit or fix leak; inspect `lastState`. |
| HPA shows `<unknown>` | metrics-server missing or no CPU requests set. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Quotas prevent noisy-neighbour/DoS; set sane defaults per namespace.
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

1. Requests vs limits?
2. Liveness vs readiness?
3. How does HPA decide?
4. What is a PDB?
5. **Scenario:** Black-Friday traffic is 10x. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I autoscale? | ☐ | ☐ | ☐ | ☐ |
| Can I design probes? | ☐ | ☐ | ☐ | ☐ |
| Can I explain QoS classes? | ☐ | ☐ | ☐ | ☐ |
| Set requests/limits correctly | ☐ | ☐ | ☐ | ☐ |
| Configure liveness, readiness and startup probes | ☐ | ☐ | ☐ | ☐ |
| Autoscale and control scheduling | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-75/` in your own repository:

```text
day-75/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-75
git add day-75/
git commit -m "day-75: resource management, probes, hpa & scheduling"
git push -u origin day-75
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

---

[← Day 74](../day-74/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 76 →](../day-76/README.md)
