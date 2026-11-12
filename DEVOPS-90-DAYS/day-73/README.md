# Day 73 — Kubernetes Services, Ingress & Gateway API

[← Day 72](../day-72/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 74 →](../day-74/README.md)

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

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 73 -- Introduction to Observability and Prometheus — Challenge Brief

#### Task
You have built infrastructure with Terraform, configured servers with Ansible, and containerized applications with Docker. But once everything is running -- how do you know it is healthy? How do you find out why something broke at 3 AM?

That is where observability comes in. Today you learn the three pillars of observability -- metrics, logs, and traces -- and set up Prometheus, the most widely used metrics collection tool in the DevOps ecosystem.

---

#### Expected Output
- Clear understanding of observability vs traditional monitoring
- Prometheus running in a Docker container
- A working `prometheus.yml` with scrape targets
- Prometheus scraping its own metrics and responding to PromQL queries
- A markdown file: `day-73-observability-prometheus.md`

---

#### Challenge Tasks

##### Task 1: Understand Observability
Research and write short notes on:

1. What is observability? How is it different from traditional monitoring?
   - **Monitoring** tells you _when_ something is wrong (alerts, thresholds)
   - **Observability** tells you _why_ something is wrong (explore, query, correlate)

2. The three pillars of observability:
   - **Metrics** -- numerical measurements over time (CPU usage, request count, error rate). Tools: Prometheus, Datadog, CloudWatch
   - **Logs** -- timestamped text records of events (application output, error messages). Tools: Loki, ELK Stack, Fluentd
   - **Traces** -- the journey of a single request across multiple services. Tools: OpenTelemetry, Jaeger, Zipkin

3. Why do DevOps engineers need all three?
   - Metrics tell you _what_ is broken (high error rate on `/api/users`)
   - Logs tell you _why_ it broke (stack trace showing a database timeout)
   - Traces tell you _where_ it broke (the payment service call took 12 seconds)

4. Draw or describe this architecture -- this is what you will build over the next 5 days:
   ```
   [Your App] --> metrics --> [Prometheus] --> [Grafana Dashboards]
   [Your App] --> logs    --> [Promtail]   --> [Loki] --> [Grafana]
   [Your App] --> traces  --> [OTEL Collector] --> [Grafana/Debug]
   [Host]     --> metrics --> [Node Exporter] --> [Prometheus]
   [Docker]   --> metrics --> [cAdvisor] --> [Prometheus]
   ```

---

##### Task 2: Set Up Prometheus with Docker
Create a project directory for this entire observability block -- you will keep adding to it over the next 5 days.

```bash
mkdir observability-stack && cd observability-stack
```

Create a `prometheus.yml` configuration file:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

This tells Prometheus to scrape its own metrics every 15 seconds.

Create a `docker-compose.yml` to run Prometheus:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

volumes:
  prometheus_data:
```

Start Prometheus:
```bash
docker compose up -d
```

Open `http://localhost:9090` in your browser. You should see the Prometheus web UI.

**Verify:** Go to Status > Targets. You should see one target (`prometheus`) with state `UP`.

---

##### Task 3: Understand Prometheus Concepts
Explore the Prometheus UI and understand these concepts:

1. **Scrape targets** -- endpoints that Prometheus pulls metrics from at regular intervals (pull-based model)
2. **Metrics types:**
   - `Counter` -- only goes up (total requests served, total errors)
   - `Gauge` -- goes up and down (current CPU usage, memory in use, active connections)
   - `Histogram` -- distribution of values in buckets (request duration: how many took <100ms, <500ms, <1s)
   - `Summary` -- similar to histogram but calculates percentiles on the client side
3. **Labels** -- key-value pairs that add dimensions to metrics (e.g., `http_requests_total{method="GET", status="200"}`)
4. **Time series** -- a unique combination of metric name + labels

Go to the Prometheus UI graph page (`http://localhost:9090/graph`) and run these queries:

```
# How many metrics is Prometheus collecting about itself?
count({__name__=~".+"})

# How much memory is Prometheus using?
process_resident_memory_bytes

# Total HTTP requests to the Prometheus server
prometheus_http_requests_total

# Break it down by handler
prometheus_http_requests_total{handler="/api/v1/query"}
```

**Document:** What is the difference between a counter and a gauge? Give one real-world example of each.

---

##### Task 4: Learn PromQL Basics
PromQL (Prometheus Query Language) is how you ask questions about your metrics. Run these queries in the Prometheus UI:

1. **Instant vector** -- current value of a metric:
```promql
up
```
This returns 1 (up) or 0 (down) for each scrape target.

2. **Range vector** -- values over a time window:
```promql
prometheus_http_requests_total[5m]
```
Returns all values from the last 5 minutes.

3. **Rate** -- per-second rate of a counter over a time window:
```promql
rate(prometheus_http_requests_total[5m])
```
This is the most common function you will use. Counters always go up -- `rate()` converts them to a useful per-second speed.

4. **Aggregation** -- sum across all label combinations:
```promql
sum(rate(prometheus_http_requests_total[5m]))
```

5. **Filter by label:**
```promql
prometheus_http_requests_total{code="200"}
prometheus_http_requests_total{code!="200"}
```

6. **Arithmetic:**
```promql
process_resident_memory_bytes / 1024 / 1024
```
This converts bytes to megabytes.

7. **Top-K:**
```promql
topk(5, prometheus_http_requests_total)
```

**Try this exercise:** Write a PromQL query that shows the per-second rate of non-200 HTTP requests to Prometheus over the last 5 minutes. (Hint: use `rate()` with a label filter on `code!="200"`)

---

##### Task 5: Add a Sample Application as a Scrape Target
Prometheus needs something to monitor. Add a simple metrics-generating service.

Update your `docker-compose.yml` to include a sample app that exposes Prometheus metrics:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

  notes-app:
    image: trainwithshubham/notes-app:latest
    container_name: notes-app
    ports:
      - "8000:8000"
    restart: unless-stopped

volumes:
  prometheus_data:
```

Update `prometheus.yml` to scrape the app:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "notes-app"
    static_configs:
      - targets: ["notes-app:8000"]
```

Restart the stack:
```bash
docker compose up -d
```

Go back to Status > Targets. You should now see two targets. Generate some traffic to the app:
```bash
curl http://localhost:8000
curl http://localhost:8000
curl http://localhost:8000
```

**Note:** Not all applications expose Prometheus metrics natively. In later days you will learn how Node Exporter, cAdvisor, and OTEL Collector act as metric exporters for systems that do not have built-in Prometheus support.

---

##### Task 6: Explore Data Retention and Storage
Understand how Prometheus stores data:

1. Check how much disk space Prometheus is using:
```bash
docker exec prometheus du -sh /prometheus
```

2. Prometheus stores data in a local time-series database (TSDB). Default retention is 15 days. You can change it:
```yaml
command:
  - '--config.file=/etc/prometheus/prometheus.yml'
  - '--storage.tsdb.retention.time=30d'
  - '--storage.tsdb.retention.size=1GB'
```

3. Check the TSDB status in the UI: Status > TSDB Status

**Document:** What happens when retention is exceeded? Why is a volume mount important for Prometheus data?

---

#### Hints
- Prometheus uses a **pull model** -- it scrapes targets at regular intervals, unlike push-based systems
- The `up` metric is automatically created for every scrape target -- 1 means healthy, 0 means the target is unreachable
- `rate()` only works on counters, not gauges -- applying rate to a gauge gives meaningless results
- Always use `rate()` before `sum()` when aggregating counters: `sum(rate(...))` not `rate(sum(...))`
- If a target shows as DOWN in Status > Targets, check: is the container running? Is the port correct? Are they on the same Docker network?
- `prometheus.yml` changes require a restart or a POST to `/-/reload` (if `--web.enable-lifecycle` flag is set)
- Reference repo for the full stack: https://github.com/LondheShubham153/observability-for-devops

---

#### Documentation
Create `day-73-observability-prometheus.md` with:
- The three pillars of observability in your own words
- Your `prometheus.yml` and `docker-compose.yml`
- Screenshot of Prometheus Targets page showing all targets UP
- Five PromQL queries you ran and what they returned
- Explanation of counter vs gauge with examples
- Architecture diagram of what you will build over days 73-77

---

#### Submission
1. Add `day-73-observability-prometheus.md` to `2026/day-73/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the observability block today -- learned the three pillars (metrics, logs, traces), set up Prometheus in Docker, wrote my first PromQL queries, and started monitoring a sample app. Observability is what separates running services from actually understanding them."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 73 -- Introduction to Observability and Prometheus — Notes & Solution

#### Task
You have built infrastructure with Terraform, configured servers with Ansible, and containerized applications with Docker. But once everything is running -- how do you know it is healthy? How do you find out why something broke at 3 AM?

That is where observability comes in. Today you learn the three pillars of observability -- metrics, logs, and traces -- and set up Prometheus, the most widely used metrics collection tool in the DevOps ecosystem.

---

#### Challenge Tasks

##### Task 1: Understand Observability
Research and write short notes on:

1. What is observability? How is it different from traditional monitoring?
   - **Monitoring** tells you _when_ something is wrong (alerts, thresholds)
   - **Observability** tells you _why_ something is wrong (explore, query, correlate)

      | Monitoring                             | Observability                                      |
      | -------------------------------------- | -------------------------------------------------- |
      | Checks if system is **working or not** | Helps understand **why it is not working**         |
      | Gives **alerts when something breaks** | Helps **find the reason of the problem**           |
      | Looks at **fixed metrics**             | Uses **metrics, logs, and traces**                 |
      | **Example:** Alert-> “Website is slow” | **Example:** Find cause-> “Database query is slow” |
     
2. The three pillars of observability:
   - **Metrics** -- numerical measurements over time (CPU usage, request count, error rate). Tools: Prometheus, Datadog, CloudWatch
   - **Logs** -- timestamped text records of events (application output, error messages). Tools: Loki, ELK Stack, Fluentd
   - **Traces** -- the journey of a single request across multiple services. Tools: OpenTelemetry, Jaeger, Zipkin

3. Why do DevOps engineers need all three?
   - Metrics tell you _what_ is broken (high error rate on `/api/users`)
   - Logs tell you _why_ it broke (stack trace showing a database timeout)
   - Traces tell you _where_ it broke (the payment service call took 12 seconds)

4. Draw or describe this architecture -- this is what you will build over the next 5 days:
   ```
   [Your App] --> metrics --> [Prometheus] --> [Grafana Dashboards]
   [Your App] --> logs    --> [Promtail]   --> [Loki] --> [Grafana]
   [Your App] --> traces  --> [OTEL Collector] --> [Grafana/Debug]
   [Host]     --> metrics --> [Node Exporter] --> [Prometheus]
   [Docker]   --> metrics --> [cAdvisor] --> [Prometheus]
   ```

<img width="882" height="425" alt="image" src="https://github.com/user-attachments/assets/e5d8553e-f1fa-401c-946c-9d769f487494" />

    `[Your App] --> metrics --> [Prometheus] --> [Grafana Dashboards]`
     
      - The app generates performance metrics such as: `request count`, `response time`, `CPU usage`and `memory usage`
      - Prometheus collects (scrapes) metrics from the app
      - Prometheus stores this data over time
      - Grafana displays the data as graphs and dashboards
      - This helps you monitor how the system is performing

            
    `[Your App] --> logs --> [Promtail] --> [Loki] --> [Grafana]`
        
      - The app generates logs (event messages)
      - `Example:` “User logged in”, “Error occurred”
      - Promtail collects logs from the app (from files or stdout)
      - Promtail sends logs to Loki for storage
      - Grafana is used to search and view logs
      - This helps you understand what happened inside the system

    `[Your App] --> traces --> [OTEL Collector] --> [Grafana/Debug]`
      
      - Traces show how a request moves through the system
      - `Example:` User request → API → Database → Response
      - The app sends trace data using OpenTelemetry
      - OTEL Collector processes the trace data
      - Grafana is used to visualize the full request journey
      - This helps find where delays or failures occur

    `[Your Host] --> metrics --> [Node Exporter] --> [Prometheus]`
     
      - The host machine is also monitored
      - It collects: CPU usage, memory usage, disk usage
      - Node Exporter collects system metrics
      - Prometheus stores this data
      - This helps monitor server health

    `[Your Docker] --> metrics --> [cAdvisor] --> [Prometheus]`
     
      - Each Docker container is monitored individually
      - It tracks: CPU usage per container, memory usage per container
      - cAdvisor collects container metrics
      - Prometheus stores this data
      - This helps monitor container performance
      
---

##### Task 2: Set Up Prometheus with Docker
Create a project directory for this entire observability block -- you will keep adding to it over the next 5 days.

```bash
mkdir observability-stack && cd observability-stack
```

Create a `prometheus.yml` configuration file:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

This tells Prometheus to scrape its own metrics every 15 seconds.

Create a `docker-compose.yml` to run Prometheus:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

volumes:
  prometheus_data:
```

Start Prometheus:
```bash
docker compose up -d
```

Open `http://localhost:9090` in your browser. You should see the Prometheus web UI.

Or

Open `http://Public-IP:9090` in your browser. You should see the Prometheus web UI.

**Verify:** Go to Status > Targets. You should see one target (`prometheus`) with state `UP`.

<img width="1901" height="887" alt="image" src="https://github.com/user-attachments/assets/873a90c1-deb1-4bf7-a530-d6ee35a924f3" />

<img width="1535" height="591" alt="image" src="https://github.com/user-attachments/assets/9ae4e851-6c2c-454c-b4a2-0fa70d713d5b" />

<img width="1910" height="827" alt="image" src="https://github.com/user-attachments/assets/2925d1ca-2e5d-4d25-bbd9-681ac874cee7" />

---

##### Task 3: Understand Prometheus Concepts
Explore the Prometheus UI and understand these concepts:

1. **Scrape targets** -- endpoints that Prometheus pulls metrics from at regular intervals (pull-based model)
2. **Metrics types:**
   - `Counter` -- only goes up (total requests served, total errors)
   - `Gauge` -- goes up and down (current CPU usage, memory in use, active connections)
   - `Histogram` -- distribution of values in buckets (request duration: how many took <100ms, <500ms, <1s)
   - `Summary` -- similar to histogram but calculates percentiles on the client side
3. **Labels** -- key-value pairs that add dimensions to metrics (e.g., `http_requests_total{method="GET", status="200"}`)
4. **Time series** -- a unique combination of metric name + labels

Go to the Prometheus UI graph page (`http://localhost:9090/graph`) and run these queries:

#### How many metrics is Prometheus collecting about itself?

```count({__name__=~".+"})```



#### How much memory is Prometheus using?

```process_resident_memory_bytes```



#### Total HTTP requests to the Prometheus server

```prometheus_http_requests_total```

- 55

#### Break it down by handler

```prometheus_http_requests_total{handler="/api/v1/query"}```


**Document:** What is the difference between a counter and a gauge? Give one real-world example of each.

- `Counter`: A metric that only increases over time

    - `Example`: `http_requests_total` — counts how many requests your server (e.g., Nginx, API service) has handled since it started

- `Gauge`: A metric that can go up or down, showing a current value

    - `Example`: `memory_usage_bytes` — current memory usage of a container or VM

---

##### Task 4: Learn PromQL Basics
PromQL (Prometheus Query Language) is how you ask questions about your metrics. Run these queries in the Prometheus UI:

1. **Instant vector** -- current value of a metric:
```promql
up
```
This returns 1 (up) or 0 (down) for each scrape target.

<img width="1917" height="517" alt="image" src="https://github.com/user-attachments/assets/f03e78da-7903-4010-993f-54ee85157ee4" />

2. **Range vector** -- values over a time window:
```promql
prometheus_http_requests_total[5m]
```
Returns all values from the last 5 minutes.

<img width="1890" height="917" alt="image" src="https://github.com/user-attachments/assets/38ba9699-6c21-4e29-9f98-93f7c2e9276b" />

3. **Rate** -- per-second rate of a counter over a time window:
```promql
rate(prometheus_http_requests_total[5m])
```
This is the most common function you will use. Counters always go up -- `rate()` converts them to a useful per-second speed.

<img width="1906" height="905" alt="image" src="https://github.com/user-attachments/assets/8fdfa51e-cd58-4a44-83c8-08ba06e6308e" />

4. **Aggregation** -- sum across all label combinations:
```promql
sum(rate(prometheus_http_requests_total[5m]))
```

<img width="1890" height="906" alt="image" src="https://github.com/user-attachments/assets/e62b6c5b-2220-4c2e-b31b-fbf5c612f9aa" />

5. **Filter by label:**
```promql
prometheus_http_requests_total{code="200"}
prometheus_http_requests_total{code!="200"}
```

<img width="1897" height="910" alt="image" src="https://github.com/user-attachments/assets/2adf5839-6401-4511-a691-2f7afd85179c" />

<img width="1906" height="912" alt="image" src="https://github.com/user-attachments/assets/8b726a9f-d620-46ea-9ce6-9ca046e2fbc7" />

6. **Arithmetic:**
```promql
process_resident_memory_bytes / 1024 / 1024
```
This converts bytes to megabytes.

<img width="1882" height="907" alt="image" src="https://github.com/user-attachments/assets/06e62207-b3f8-4da7-9db7-7beeb2cf8d72" />

7. **Top-K:**
```promql
topk(5, prometheus_http_requests_total)
```
<img width="1902" height="905" alt="image" src="https://github.com/user-attachments/assets/806b969a-5243-4954-8957-8ab813a71f07" />

**Try this exercise:** Write a PromQL query that shows the per-second rate of non-200 HTTP requests to Prometheus over the last 5 minutes. (Hint: use `rate()` with a label filter on `code!="200"`)

- rate(prometheus_http_requests_total{code!="200"}[5m])
  
<img width="1902" height="907" alt="image" src="https://github.com/user-attachments/assets/b167971b-b802-41e4-afab-af71eb24b66e" />

---

##### Task 5: Add a Sample Application as a Scrape Target
Prometheus needs something to monitor. Add a simple metrics-generating service.

Update your `docker-compose.yml` to include a sample app that exposes Prometheus metrics:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

  notes-app:
    image: trainwithshubham/notes-app:latest
    container_name: notes-app
    ports:
      - "8000:8000"
    restart: unless-stopped

volumes:
  prometheus_data:
```

Update `prometheus.yml` to scrape the app:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "notes-app"
    static_configs:
      - targets: ["notes-app:8000"]
```

Restart the stack:
```bash
docker compose up -d
```

Go back to Status > Targets. You should now see two targets. Generate some traffic to the app:
```bash
curl http://localhost:8000
curl http://localhost:8000
curl http://localhost:8000
```

<img width="1911" height="815" alt="image" src="https://github.com/user-attachments/assets/1b68b1a2-d88b-4211-a830-b800ae56cb2d" />

**Note:** Not all applications expose Prometheus metrics natively. In later days you will learn how Node Exporter, cAdvisor, and OTEL Collector act as metric exporters for systems that do not have built-in Prometheus support.

---

##### Task 6: Explore Data Retention and Storage
Understand how Prometheus stores data:

1. Check how much disk space Prometheus is using:
```bash
docker exec prometheus du -sh /prometheus
```

<img width="897" height="75" alt="image" src="https://github.com/user-attachments/assets/4b3d0618-5f7e-4f9a-bf54-4a746bd52a72" />

2. Prometheus stores data in a local time-series database (TSDB). Default retention is 15 days. You can change it:
```yaml
command:
  - '--config.file=/etc/prometheus/prometheus.yml'
  - '--storage.tsdb.retention.time=30d'
  - '--storage.tsdb.retention.size=1GB'
```

3. Check the TSDB status in the UI: Status > TSDB Status

<img width="1637" height="447" alt="image" src="https://github.com/user-attachments/assets/c299ac09-8604-4ed8-82ec-e376612089bf" />

**Document:** What happens when retention is exceeded? Why is a volume mount important for Prometheus data?

- Retention exceeded

    - Old metrics are automatically deleted, keeping only recent data within the retention period.

    - Prometheus stores time-series data locally on disk inside its TSDB (Time Series Database) organized into blocks (typically spanning 2-hour windows, compacted into larger blocks over time). Retention can be controlled by time (--storage.tsdb.retention.time, e.g., 30d) or size (--storage.tsdb.retention.size, e.g., 1GB).

- Why volume mount matters

    - It ensures Prometheus data is persisted. Without it, all metrics are lost when the container restarts or is removed.

`volumes:
  - ./prometheus.yml:/etc/prometheus/prometheus.yml
  - prometheus_data:/prometheus
`
---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.3 Django + Prometheus Monitoring Setup (Fix Guide)

This guide explains how to fix the **`/metrics` endpoint issue** and the **Prometheus target error (Error scraping target: server returned HTTP status 404 Not Found)**, and how to integrate **Prometheus monitoring** into a Django Notes App running in Docker.
---

##### Why this happens:

- Django app is running  
- API endpoints are working  
- `/metrics` endpoint is missing  

---

#### Root Cause

- Prometheus integration package  
- `/metrics` endpoint configuration  
- Middleware for metrics collection 

---

#### Solution

#### Install Dependency

Add the following to your `requirements.txt`:

```txt
django-prometheus
```

#### Update `notes-app/notesapp/settings.py`

Add to INSTALLED_APPS

`Important: Place django_prometheus at the top`

```bash
INSTALLED_APPS = [
    'django_prometheus',  # MUST be FIRST (important for instrumentation)

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'api.apps.ApiConfig',
    'rest_framework',
    'corsheaders',
]
```
`Update MIDDLEWARE`

`Add Prometheus middleware at the top and bottom:`

```bash
MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',  # MUST be FIRST

    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    # 'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'django_prometheus.middleware.PrometheusAfterMiddleware',  # MUST be LAST
]
```

#### Update notes-app/notesapp/urls.py

`Expose the /metrics endpoint:`

```bash
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('', include('django_prometheus.urls')), 
]
```

#### Rebuild 
```bash
docker-compose up --build
```

#### Test metrics endpoint
```bash
curl http://localhost:8000/metrics
```

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Explain Service vs Ingress vs Gateway. | You can demonstrate, without notes: *expose applications with ClusterIP, NodePort, LoadBalancer* — with evidence committed to `day-73/`. |
| 2 | Add rate-limit or header policy. | You can demonstrate, without notes: *route HTTP traffic with Ingress/Gateway API* — with evidence committed to `day-73/`. |
| 3 | Draw traffic flow from user to pod. | You can demonstrate, without notes: *understand cluster DNS and kube-proxy* — with evidence committed to `day-73/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Service has no endpoints | Selector labels mismatch; check `kubectl get ep`. |
| 404 from ingress | Host/path rule or wrong backend port. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Terminate TLS at ingress, restrict admin routes, use NetworkPolicies (Day 76).
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

1. ClusterIP vs NodePort vs LoadBalancer?
2. Ingress vs Gateway API?
3. How does service discovery work?
4. How do you debug no endpoints?
5. **Scenario:** Expose three microservices on one domain with path routing and HTTPS, without 3 cloud load balancers. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

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

## 15. GitHub Submission

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

## 18. Challenge Notes — Day 73: Jenkins Pipelines for Kubernetes

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 73** of the DevOps 90-Day Challenge!
Today, we connect our two favorite tools: **Jenkins** and **Kubernetes**. We will build a pipeline that builds a Docker image and deploys it to our new EKS cluster.

[![](https://img.youtube.com/vi/placeholder/0.jpg)](https://www.youtube.com)

[Watch the video (Link Pending)]()

---

#### Objective

By the end of this session, you will:

* Install the **Kubernetes Plugin** in Jenkins.
* Configure Jenkins to talk to your EKS Cluster (`kubeconfig`).
* Write a pipeline that runs `kubectl apply`.
* Implement the **Rolling Update** strategy via CI/CD.

---

#### Tools Used

* **Jenkins**
* **Docker**
* **Kubernetes (EKS)**
* **kubectl**

---

#### Key Concepts

##### 1. The Workflow
1.  **Commit**: Developer pushes code to GitHub.
2.  **Build**: Jenkins checks out code, builds Docker image.
3.  **Push**: Jenkins pushes image to ECR/DockerHub.
4.  **Deploy**: Jenkins runs `kubectl set image` to update the deployment in EKS.

##### 2. Authentication
Jenkins needs permission to talk to EKS.
*   **Service Account**: Create a ServiceAccount in K8s and generate a token.
*   **Kubeconfig**: Store the token as a Secret in Jenkins ("Secret Text").

##### 3. Pipeline Syntax
```groovy
stage('Deploy to K8s') {
    steps {
        withKubeConfig([credentialsId: 'k8s-token', serverUrl: 'https://...']) {
            sh 'kubectl set image deployment/myapp myapp=myimage:v2'
        }
    }
}
```

---

#### Key Concepts Applied

| Concept | Example Used |
| :--- | :--- |
| **Credential Binding** | securely injecting the K8s token into the pipeline environment. |
| **Image Tagging** | Using the `BUILD_NUMBER` as the image tag (`v1.0.55`) for traceability. |
| **Validation** | Running `kubectl rollout status` to verify the deployment succeeded. |

---

#### Bonus (Extra Learning)

*   Run Jenkins **Agents as Pods** inside the Kubernetes cluster (Dynamic Agents). This saves money as agents only exist when a job is running.
*   Use a **Helm** step in Jenkins to deploy a chart instead of raw manifests.

---

#### Congratulations!

You have automated the "Last Mile" of deployment. Your code now goes from laptop to production cluster without human intervention.

---

#### Try These Next

*   Implement a **Canary Deployment** pipeline (deploy to 10% of pods first).
*   Add a **manual approval** step before deploying to Production.

## 19. Cohort Practice — Day 73: Introduction to Observability and Prometheus

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

You have built infrastructure with Terraform, configured servers with Ansible, and containerized applications with Docker. But once everything is running -- how do you know it is healthy? How do you find out why something broke at 3 AM?

That is where observability comes in. Today you learn the three pillars of observability -- metrics, logs, and traces -- and set up Prometheus, the most widely used metrics collection tool in the DevOps ecosystem.

---

#### Expected Output
- Clear understanding of observability vs traditional monitoring
- Prometheus running in a Docker container
- A working `prometheus.yml` with scrape targets
- Prometheus scraping its own metrics and responding to PromQL queries
- A markdown file: `day-73-observability-prometheus.md`

---

#### Challenge Tasks

##### Task 1: Understand Observability
Research and write short notes on:

1. What is observability? How is it different from traditional monitoring?
   - **Monitoring** tells you _when_ something is wrong (alerts, thresholds)
   - **Observability** tells you _why_ something is wrong (explore, query, correlate)

2. The three pillars of observability:
   - **Metrics** -- numerical measurements over time (CPU usage, request count, error rate). Tools: Prometheus, Datadog, CloudWatch
   - **Logs** -- timestamped text records of events (application output, error messages). Tools: Loki, ELK Stack, Fluentd
   - **Traces** -- the journey of a single request across multiple services. Tools: OpenTelemetry, Jaeger, Zipkin

3. Why do DevOps engineers need all three?
   - Metrics tell you _what_ is broken (high error rate on `/api/users`)
   - Logs tell you _why_ it broke (stack trace showing a database timeout)
   - Traces tell you _where_ it broke (the payment service call took 12 seconds)

4. Draw or describe this architecture -- this is what you will build over the next 5 days:
   ```
   [Your App] --> metrics --> [Prometheus] --> [Grafana Dashboards]
   [Your App] --> logs    --> [Promtail]   --> [Loki] --> [Grafana]
   [Your App] --> traces  --> [OTEL Collector] --> [Grafana/Debug]
   [Host]     --> metrics --> [Node Exporter] --> [Prometheus]
   [Docker]   --> metrics --> [cAdvisor] --> [Prometheus]
   ```

---

##### Task 2: Set Up Prometheus with Docker
Create a project directory for this entire observability block -- you will keep adding to it over the next 5 days.

```bash
mkdir observability-stack && cd observability-stack
```

Create a `prometheus.yml` configuration file:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

This tells Prometheus to scrape its own metrics every 15 seconds.

Create a `docker-compose.yml` to run Prometheus:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

volumes:
  prometheus_data:
```

Start Prometheus:
```bash
docker compose up -d
```

Open `http://localhost:9090` in your browser. You should see the Prometheus web UI.

**Verify:** Go to Status > Targets. You should see one target (`prometheus`) with state `UP`.

---

##### Task 3: Understand Prometheus Concepts
Explore the Prometheus UI and understand these concepts:

1. **Scrape targets** -- endpoints that Prometheus pulls metrics from at regular intervals (pull-based model)
2. **Metrics types:**
   - `Counter` -- only goes up (total requests served, total errors)
   - `Gauge` -- goes up and down (current CPU usage, memory in use, active connections)
   - `Histogram` -- distribution of values in buckets (request duration: how many took <100ms, <500ms, <1s)
   - `Summary` -- similar to histogram but calculates percentiles on the client side
3. **Labels** -- key-value pairs that add dimensions to metrics (e.g., `http_requests_total{method="GET", status="200"}`)
4. **Time series** -- a unique combination of metric name + labels

Go to the Prometheus UI graph page (`http://localhost:9090/graph`) and run these queries:

```
# How many metrics is Prometheus collecting about itself?
count({__name__=~".+"})

# How much memory is Prometheus using?
process_resident_memory_bytes

# Total HTTP requests to the Prometheus server
prometheus_http_requests_total

# Break it down by handler
prometheus_http_requests_total{handler="/api/v1/query"}
```

**Document:** What is the difference between a counter and a gauge? Give one real-world example of each.

---

##### Task 4: Learn PromQL Basics
PromQL (Prometheus Query Language) is how you ask questions about your metrics. Run these queries in the Prometheus UI:

1. **Instant vector** -- current value of a metric:
```promql
up
```
This returns 1 (up) or 0 (down) for each scrape target.

2. **Range vector** -- values over a time window:
```promql
prometheus_http_requests_total[5m]
```
Returns all values from the last 5 minutes.

3. **Rate** -- per-second rate of a counter over a time window:
```promql
rate(prometheus_http_requests_total[5m])
```
This is the most common function you will use. Counters always go up -- `rate()` converts them to a useful per-second speed.

4. **Aggregation** -- sum across all label combinations:
```promql
sum(rate(prometheus_http_requests_total[5m]))
```

5. **Filter by label:**
```promql
prometheus_http_requests_total{code="200"}
prometheus_http_requests_total{code!="200"}
```

6. **Arithmetic:**
```promql
process_resident_memory_bytes / 1024 / 1024
```
This converts bytes to megabytes.

7. **Top-K:**
```promql
topk(5, prometheus_http_requests_total)
```

**Try this exercise:** Write a PromQL query that shows the per-second rate of non-200 HTTP requests to Prometheus over the last 5 minutes. (Hint: use `rate()` with a label filter on `code!="200"`)

---

##### Task 5: Add a Sample Application as a Scrape Target
Prometheus needs something to monitor. Add a simple metrics-generating service.

Update your `docker-compose.yml` to include a sample app that exposes Prometheus metrics:
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

  notes-app:
    image: trainwithshubham/notes-app:latest
    container_name: notes-app
    ports:
      - "8000:8000"
    restart: unless-stopped

volumes:
  prometheus_data:
```

Update `prometheus.yml` to scrape the app:
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "notes-app"
    static_configs:
      - targets: ["notes-app:8000"]
```

Restart the stack:
```bash
docker compose up -d
```

Go back to Status > Targets. You should now see two targets. Generate some traffic to the app:
```bash
curl http://localhost:8000
curl http://localhost:8000
curl http://localhost:8000
```

**Note:** Not all applications expose Prometheus metrics natively. In later days you will learn how Node Exporter, cAdvisor, and OTEL Collector act as metric exporters for systems that do not have built-in Prometheus support.

---

##### Task 6: Explore Data Retention and Storage
Understand how Prometheus stores data:

1. Check how much disk space Prometheus is using:
```bash
docker exec prometheus du -sh /prometheus
```

2. Prometheus stores data in a local time-series database (TSDB). Default retention is 15 days. You can change it:
```yaml
command:
  - '--config.file=/etc/prometheus/prometheus.yml'
  - '--storage.tsdb.retention.time=30d'
  - '--storage.tsdb.retention.size=1GB'
```

3. Check the TSDB status in the UI: Status > TSDB Status

**Document:** What happens when retention is exceeded? Why is a volume mount important for Prometheus data?

---

#### Hints
- Prometheus uses a **pull model** -- it scrapes targets at regular intervals, unlike push-based systems
- The `up` metric is automatically created for every scrape target -- 1 means healthy, 0 means the target is unreachable
- `rate()` only works on counters, not gauges -- applying rate to a gauge gives meaningless results
- Always use `rate()` before `sum()` when aggregating counters: `sum(rate(...))` not `rate(sum(...))`
- If a target shows as DOWN in Status > Targets, check: is the container running? Is the port correct? Are they on the same Docker network?
- `prometheus.yml` changes require a restart or a POST to `/-/reload` (if `--web.enable-lifecycle` flag is set)
- Reference repo for the full stack: https://github.com/LondheShubham153/observability-for-devops

---

#### Documentation
Create `day-73-observability-prometheus.md` with:
- The three pillars of observability in your own words
- Your `prometheus.yml` and `docker-compose.yml`
- Screenshot of Prometheus Targets page showing all targets UP
- Five PromQL queries you ran and what they returned
- Explanation of counter vs gauge with examples
- Architecture diagram of what you will build over days 73-77

---

#### Submission
1. Add `day-73-observability-prometheus.md` to `2026/day-73/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Started the observability block today -- learned the three pillars (metrics, logs, traces), set up Prometheus in Docker, wrote my first PromQL queries, and started monitoring a sample app. Observability is what separates running services from actually understanding them."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

## 20. Hands-on Project — Day 73: EventBridge Scheduled Events

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **EventBridge Scheduled Events**.

#### 🎯 Learning Goals
- Understand the fundamentals of EventBridge Scheduled Events.
- Work through hands-on examples.

#### 🛠️ Tasks
1. Read the lesson notes here.
2. Run provided examples or write your own scripts/config.
3. Commit progress with message: `day73: EventBridge Scheduled Events`.

#### 💡 Challenge
- Extend today’s exercise with an extra feature or edge case.


---

[← Day 72](../day-72/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 74 →](../day-74/README.md)
