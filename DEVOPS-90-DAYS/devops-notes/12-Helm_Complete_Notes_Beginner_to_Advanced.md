# Helm Complete Notes – Beginner to Advanced

Kubernetes Package Management for DevOps, Cloud Engineering and CI/CD

- Covers: Helm 3 and Helm 4
- Level: Beginner to Advanced
- Format: Chapters, sections, sub-sections and bullet points only (no tables)

## How to Use These Notes

- Read Parts 1 and 2 first if you are a beginner.
- Practise every command on a local cluster such as Minikube, kind or Docker Desktop Kubernetes.
- Use Parts 4 and 5 for production work and interviews.
- Use the cheat sheet and revision chapters before interviews or exams.

## Table of Contents

### Part 1 – Helm Fundamentals

- Chapter 1 – Introduction to Helm
- Chapter 2 – Helm Architecture and Core Concepts
- Chapter 3 – Installing and Configuring Helm
- Chapter 4 – Helm Command-Line Fundamentals
- Chapter 5 – Helm Repositories, Artifact Hub and OCI Registries

### Part 2 – Helm Chart Development

- Chapter 6 – Understanding Helm Charts and Chart Structure
- Chapter 7 – Creating Your First Helm Chart
- Chapter 8 – Chart.yaml and Chart Metadata
- Chapter 9 – values.yaml and Configuration Management
- Chapter 10 – The Helm Template Engine (Go Templates)
- Chapter 11 – Helm Template Functions
- Chapter 12 – Flow Control (if, with, range)
- Chapter 13 – Named Templates and Helpers
- Chapter 14 – Dependencies, Subcharts and Library Charts

### Part 3 – Kubernetes Resources with Helm

- Chapter 15 – Workloads, Services, Ingress, Probes and Autoscaling
- Chapter 16 – ConfigMaps and Secrets
- Chapter 17 – Storage and Stateful Applications

### Part 4 – Release Management

- Chapter 18 – Installing, Upgrading and Rolling Back Releases
- Chapter 19 – Hooks and Helm Tests
- Chapter 20 – Troubleshooting and Production Incident Handling

### Part 5 – Advanced Helm

- Chapter 21 – Security and Best Practices
- Chapter 22 – OCI Registries, Packaging and Chart Distribution
- Chapter 23 – Plugins and Extensibility
- Chapter 24 – Helm in CI/CD Pipelines
- Chapter 25 – Helm with GitOps (Argo CD and Flux)
- Chapter 26 – Enterprise, Multi-Cluster, Performance and Observability
- Chapter 27 – Helm 3 vs Helm 4 and Migration

### Part 6 – Projects, Interviews and Revision

- Chapter 28 – Real-World Projects
- Chapter 29 – Interview Questions and Answers
- Chapter 30 – Command Cheat Sheet
- Chapter 31 – Final Revision and Mastery Roadmap

# Part 1 – Helm Fundamentals

## Chapter 1 – Introduction to Helm

### 1.1 What Is Helm?

- Helm is the package manager for Kubernetes.
- It packages Kubernetes manifests into a reusable unit called a chart.
- It installs, upgrades, rolls back and uninstalls applications with simple commands.
- It is a graduated project of the Cloud Native Computing Foundation (CNCF).
- Analogy: apt/yum for Linux, npm for Node.js, pip for Python, Helm for Kubernetes.

### 1.2 What Is Kubernetes? (Quick Recap)

- Kubernetes is a container orchestration platform.
- It runs containers in Pods and manages them using Deployments, StatefulSets and DaemonSets.
- It exposes applications using Services and Ingress.
- It stores configuration in ConfigMaps and Secrets.
- Everything is described declaratively in YAML manifests.

### 1.3 Why Do We Need Helm?

- A real application needs many manifests: Deployment, Service, Ingress, ConfigMap, Secret, PVC, ServiceAccount, HPA and more.
- Managing these files by hand with kubectl is slow and error-prone.
- Problems with plain YAML:
  - Heavy duplication across dev, test and production.
  - No built-in versioning of a whole application.
  - No simple rollback of a multi-resource application.
  - Hard to share and reuse applications.
  - Hard to parameterise values such as image tag, replicas and resources.
- Helm solves these with templates, values, releases and revisions.

### 1.4 Helm as a Package Manager

- Package = Chart.
- Repository = place where charts are stored (HTTP repo or OCI registry).
- Installed instance = Release.
- Configuration = Values.
- History = Revisions.

### 1.5 Key Terminology

- Chart: a package containing templates, default values and metadata.
- Release: one running installation of a chart in a cluster and namespace.
- Revision: a numbered version of a release; each install, upgrade or rollback creates a new revision.
- Repository: a server hosting packaged charts.
- Values: configuration used to customise a chart.
- Template: a Kubernetes YAML file with Go template placeholders.
- Manifest: the final rendered Kubernetes YAML.
- Subchart / dependency: a chart used inside another chart.
- Hook: a resource that runs at a specific point in the release lifecycle.

### 1.6 Helm vs Other Tools

#### Helm vs kubectl

- kubectl applies individual manifests and has no release concept.
- Helm manages a group of manifests as one versioned release with history and rollback.

#### Helm vs Kustomize

- Kustomize patches plain YAML using overlays and needs no templating.
- Helm uses templates plus values and adds packaging, versioning and releases.
- Many teams combine them, for example Helm output post-processed by Kustomize.

#### Helm vs Docker / Docker Compose

- Docker builds and runs containers; Compose runs multi-container apps on one host.
- Helm deploys applications to a Kubernetes cluster and does not build images.

#### Helm vs Terraform

- Terraform provisions infrastructure such as clusters, networks and databases.
- Helm deploys applications onto an existing cluster.
- They are often used together: Terraform creates the cluster, Helm deploys workloads.

### 1.7 Real-World Use Cases

- Deploying third-party software such as NGINX Ingress, Prometheus, Grafana, Redis, PostgreSQL and Jenkins.
- Packaging in-house microservices as reusable charts.
- Promoting the same chart across dev, staging and production with different values files.
- CI/CD deployments and GitOps with Argo CD or Flux.
- Installing cluster add-ons and platform tooling.

### 1.8 Advantages

- Reusable and shareable packages.
- One command to install or upgrade a full application.
- Built-in revision history and rollback.
- Environment-specific configuration through values.
- Large public ecosystem on Artifact Hub.
- Dependency management between charts.

### 1.9 Limitations

- Go templating can become complex and hard to read.
- Whitespace and indentation mistakes cause YAML errors.
- Rollback does not restore data in databases or persistent volumes.
- CRD handling is limited (CRDs in the crds/ folder are not upgraded automatically).
- Poorly written charts can hide insecure defaults.

### 1.10 Common Mistakes

- Confusing a chart with a release.
- Installing without checking the rendered output.
- Putting secrets in plain text in values.yaml committed to Git.
- Using the latest image tag.
- Not pinning chart versions.

### 1.11 Practical Lab

- Check versions: helm version and kubectl version.
- Add a repository: helm repo add bitnami https://charts.bitnami.com/bitnami.
- Search: helm search repo nginx.
- Install: helm install my-nginx bitnami/nginx.
- Verify: helm list and kubectl get pods.
- Remove: helm uninstall my-nginx.

### 1.12 Revision Checklist

- I can explain what Helm is and why it exists.
- I can define chart, release, revision, repository and values.
- I can compare Helm with kubectl, Kustomize, Docker and Terraform.
- I can install and remove a public chart.

## Chapter 2 – Helm Architecture and Core Concepts

### 2.1 Helm Architecture Overview

- Helm is a client-side tool. There is no server component inside the cluster in Helm 3 and Helm 4.
- Main parts:
  - Helm CLI (client).
  - Charts (packages).
  - Template engine (renders YAML).
  - Kubernetes API server (receives final manifests).
  - Release storage (records release state inside the cluster).

### 2.2 Helm CLI

- Reads charts, values and your kubeconfig.
- Renders templates locally.
- Sends the manifests to the Kubernetes API server.
- Saves release information in the cluster.

### 2.3 Template Engine

- Based on Go templates plus the Sprig function library and Helm-specific functions.
- Inputs: templates, values, built-in objects such as .Release, .Chart and .Values.
- Output: plain Kubernetes YAML.

### 2.4 Kubernetes API Server

- Receives rendered manifests from Helm.
- Applies authentication, authorization (RBAC) and admission control.
- Helm can only do what your kubeconfig user is allowed to do.

### 2.5 Release Storage

- Helm stores release data inside the cluster.
- Default driver: Kubernetes Secrets, in the same namespace as the release.
- Secret name pattern: sh.helm.release.v1.<release-name>.v<revision>.
- Other drivers: ConfigMaps and SQL (PostgreSQL) for special cases.
- Set the driver with the HELM_DRIVER environment variable.

### 2.6 Helm 2 vs Helm 3 Architecture

- Helm 2 used Tiller, a server component running with high privileges inside the cluster.
- Problems with Tiller: security risk, shared cluster-wide access, complex RBAC.
- Helm 3 removed Tiller completely.
- Helm 3 uses the user's own kubeconfig permissions, so RBAC is respected.
- Helm 3 improved release storage to be namespace scoped.

### 2.7 Helm 4 Overview

- Helm 4 keeps the same client-only model and the same core concepts.
- Existing Helm 3 charts (apiVersion v2) continue to work in most cases.
- Changes focus on modernised plugins, improved server-side apply behaviour, better wait handling and cleaner internals.
- Always read the official release notes before migrating production.

### 2.8 Chart, Release and Repository

- Chart: the package (a folder or a .tgz file).
- Release: a deployed instance of a chart with a name and namespace.
- Repository: where chart packages are published.
- One chart can create many releases, for example web-dev, web-qa, web-prod.

### 2.9 Chart Version vs Application Version

- version in Chart.yaml: the version of the chart package itself.
- appVersion in Chart.yaml: the version of the application being deployed.
- Increase version whenever the chart changes; increase appVersion when the application image changes.

### 2.10 Helm Lifecycle

- Create or download a chart.
- Provide values.
- Render templates.
- Install (revision 1).
- Upgrade (revision 2, 3 and so on).
- Rollback (creates a new revision that copies an older one).
- Uninstall.

### 2.11 How Helm Communicates with Kubernetes

- Helm reads the kubeconfig file (default ~/.kube/config) or the KUBECONFIG variable.
- It uses the current context, cluster and user.
- Useful checks:
  - kubectl config current-context
  - kubectl get nodes
  - helm list -A
- Common problems: wrong context, expired credentials, missing permissions, wrong namespace.

### 2.12 Namespaces

- Every release belongs to one namespace.
- Install into a namespace: helm install web ./web -n prod --create-namespace.
- List all releases: helm list -A.
- Release names must be unique inside a namespace.

### 2.13 Common Mistakes

- Thinking Helm 3 or 4 still uses Tiller.
- Looking for release Secrets in the wrong namespace.
- Assuming rollback restores data.
- Running commands against the wrong cluster context.

### 2.14 Revision Checklist

- I can draw the Helm architecture.
- I know where release information is stored.
- I understand why Tiller was removed.
- I know the difference between chart version and appVersion.

## Chapter 3 – Installing and Configuring Helm

### 3.1 Prerequisites

- A working Kubernetes cluster (Minikube, kind, Docker Desktop, EKS, AKS, GKE or on-premises).
- kubectl installed and configured.
- Network access to download charts.
- Permission to create resources in the target namespace.

### 3.2 Install on Linux

- Using the official script:
  - curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
  - chmod 700 get_helm.sh
  - ./get_helm.sh
- Using a package manager:
  - Debian/Ubuntu: add the official Helm apt repository and run sudo apt-get install helm.
  - Snap: sudo snap install helm --classic.
- Using the binary: download the tarball, extract it and move helm to /usr/local/bin.
- Always check the official install page for the latest script and version.

### 3.3 Install on macOS

- Homebrew: brew install helm.

### 3.4 Install on Windows

- Winget: winget install Helm.Helm.
- Chocolatey: choco install kubernetes-helm.
- Scoop: scoop install helm.
- Manual: download the zip, extract it and add the folder to the PATH variable.

### 3.5 Verify the Installation

- helm version
- helm help
- helm env

### 3.6 Important Environment Variables

- KUBECONFIG: path to the kubeconfig file.
- HELM_NAMESPACE: default namespace for commands.
- HELM_DRIVER: release storage driver (secret, configmap, sql).
- HELM_CACHE_HOME, HELM_CONFIG_HOME, HELM_DATA_HOME: Helm folders.
- HELM_DEBUG: enable debug output.
- HELM_KUBECONTEXT: default Kubernetes context.

### 3.7 Shell Autocompletion

- Bash: source <(helm completion bash).
- Zsh: source <(helm completion zsh).
- PowerShell: helm completion powershell | Out-String | Invoke-Expression.

### 3.8 Connect Helm to a Cluster

- Helm uses the same kubeconfig as kubectl.
- Switch cluster: kubectl config use-context <name>.
- Or pass per command: helm list --kube-context <name>.
- Test: helm list -A.

### 3.9 Common Installation Problems

- Command not found: PATH is not configured.
- Connection refused: the cluster is not running or the context is wrong.
- Forbidden errors: RBAC permissions are missing.
- Version mismatch: check that the Helm version supports your Kubernetes version.

### 3.10 Revision Checklist

- Helm and kubectl are installed and on the PATH.
- helm version works.
- helm list -A connects to the cluster.
- Autocompletion is configured.

## Chapter 4 – Helm Command-Line Fundamentals

### 4.1 Command Structure

- General form: helm <command> [subcommand] [arguments] [flags].
- Get help for any command: helm <command> --help.

### 4.2 Information Commands

- helm version: client version.
- helm env: Helm environment settings.
- helm help: list of commands.

### 4.3 Release Commands

- helm list: releases in the current namespace.
- helm list -A: releases in all namespaces.
- helm status <release>: current state of a release.
- helm history <release>: all revisions.
- helm get values <release>: user-supplied values.
- helm get values <release> -a: all computed values.
- helm get manifest <release>: rendered manifests.
- helm get notes <release>: NOTES.txt output.
- helm get all <release>: everything about the release.

### 4.4 Chart Information Commands

- helm show chart <chart>: Chart.yaml.
- helm show values <chart>: default values.
- helm show readme <chart>: README.
- helm show all <chart>: all of the above.
- helm pull <chart>: download the chart package.
- helm pull <chart> --untar: download and extract.

### 4.5 Lifecycle Commands

- helm install <release> <chart>: create a release.
- helm upgrade <release> <chart>: update a release.
- helm upgrade --install <release> <chart>: install if missing, otherwise upgrade (idempotent, best for CI/CD).
- helm rollback <release> <revision>: go back to a revision.
- helm uninstall <release>: remove a release.

### 4.6 Important Flags

- -n, --namespace: target namespace.
- --create-namespace: create the namespace if it is missing.
- -f, --values: values file (can be repeated).
- --set key=value: override a single value.
- --dry-run: simulate the install or upgrade.
- --debug: show detailed output.
- --wait: wait until resources are ready.
- --timeout: maximum wait time, for example 5m.
- --atomic: roll back automatically if the upgrade fails.
- --version: select a chart version.
- --kube-context: choose the cluster context.

### 4.7 Revision Checklist

- I can inspect a chart before installing it.
- I can inspect a release after installing it.
- I know when to use upgrade --install.
- I know --dry-run, --wait and --atomic.

## Chapter 5 – Helm Repositories, Artifact Hub and OCI Registries

### 5.1 What Is a Helm Repository?

- An HTTP server that hosts packaged charts (.tgz files) and an index.yaml file.
- index.yaml lists every chart, version and download URL.
- Helm downloads index.yaml to know which charts exist.

### 5.2 Artifact Hub

- Artifact Hub (artifacthub.io) is the public search site for charts.
- It does not host charts; it indexes repositories and registries.
- Use it to find the repository URL and read the chart documentation.

### 5.3 Repository Commands

- Add: helm repo add bitnami https://charts.bitnami.com/bitnami.
- List: helm repo list.
- Update: helm repo update.
- Remove: helm repo remove bitnami.
- Search repositories: helm search repo nginx.
- Show all versions: helm search repo nginx --versions.
- Search Artifact Hub: helm search hub nginx.

### 5.4 Public vs Private Repositories

- Public: open access, for example Bitnami.
- Private: require credentials, for example helm repo add myrepo <url> --username <user> --password <pass>.
- Never commit credentials to Git; use CI/CD secrets.

### 5.5 Creating Your Own Repository

- Package charts with helm package.
- Generate the index with helm repo index ..
- Host the files on any static web server, GitHub Pages, S3 or ChartMuseum.

### 5.6 OCI-Based Registries

- Charts can be stored in OCI registries such as Docker Hub, GitHub Container Registry (GHCR), Azure ACR, AWS ECR and Harbor.
- Login: helm registry login <registry>.
- Push: helm push mychart-0.1.0.tgz oci://<registry>/<path>.
- Install: helm install myapp oci://<registry>/<path>/mychart --version 0.1.0.
- Pull: helm pull oci://<registry>/<path>/mychart --version 0.1.0.
- Logout: helm registry logout <registry>.
- OCI registries do not use helm repo add or index.yaml.

### 5.7 Repository Security

- Use HTTPS only.
- Trust only known repositories.
- Pin chart versions.
- Verify provenance where available (see Chapter 21).

### 5.8 Revision Checklist

- I can add, update, search and remove repositories.
- I know the difference between helm search repo and helm search hub.
- I can push and pull charts using OCI.

# Part 2 – Helm Chart Development

## Chapter 6 – Understanding Helm Charts and Chart Structure

### 6.1 What Is a Chart?

- A chart is a folder of files that describes a related set of Kubernetes resources.
- It can be packaged as a .tgz archive.

### 6.2 Directory Structure

- Chart.yaml: chart metadata (required).
- values.yaml: default configuration values.
- values.schema.json: optional JSON schema to validate values.
- templates/: Kubernetes templates.
- templates/_helpers.tpl: reusable named templates.
- templates/NOTES.txt: message shown after install.
- templates/tests/: Helm test pods.
- charts/: dependency charts.
- crds/: Custom Resource Definitions installed before templates.
- .helmignore: files to exclude when packaging.
- README.md and LICENSE: documentation.

### 6.3 Chart Types

- Application chart: deploys an application (default type).
- Library chart: provides reusable templates only and cannot be installed alone.

### 6.4 Chart Packaging

- helm package ./mychart creates mychart-<version>.tgz.
- helm lint ./mychart checks for problems before packaging.

### 6.5 Revision Checklist

- I can name each file in a chart and explain its purpose.
- I know application charts vs library charts.

## Chapter 7 – Creating Your First Helm Chart

### 7.1 Create the Chart

- helm create myapp generates a starter chart with a Deployment, Service, Ingress, HPA, ServiceAccount and tests.
- Remove templates you do not need to keep the chart simple.

### 7.2 Build a Simple Deployment Template

- File: templates/deployment.yaml.
- Use values for replicas and image:
  - replicas: {{ .Values.replicaCount }}
  - image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"

### 7.3 Add a Service

- File: templates/service.yaml.
- Use {{ .Values.service.type }} and {{ .Values.service.port }}.

### 7.4 Add a ConfigMap and a Secret

- ConfigMap holds non-sensitive settings.
- Secret holds sensitive data (see Chapter 16 for safe handling).

### 7.5 Test Before Installing

- helm lint ./myapp.
- helm template myrelease ./myapp: render locally.
- helm install myrelease ./myapp --dry-run --debug.

### 7.6 Install, Verify and Remove

- helm install myrelease ./myapp -n dev --create-namespace.
- kubectl get all -n dev.
- helm uninstall myrelease -n dev.

### 7.7 Revision Checklist

- I can create, lint, render, install and uninstall my own chart.

## Chapter 8 – Chart.yaml and Chart Metadata

### 8.1 Required Fields

- apiVersion: use v2 for Helm 3 and Helm 4 charts.
- name: chart name (must match the folder name).
- version: chart version in SemVer format.

### 8.2 Optional Fields

- appVersion: application version.
- description: short description.
- type: application or library.
- kubeVersion: supported Kubernetes versions, for example >=1.25.0.
- keywords: search keywords.
- home and sources: project and source URLs.
- maintainers: name, email and URL.
- icon: chart icon URL.
- dependencies: list of dependency charts.
- annotations: extra metadata (used by Artifact Hub).
- deprecated: marks a chart as deprecated.

### 8.3 Semantic Versioning

- Format: MAJOR.MINOR.PATCH.
- MAJOR: breaking changes.
- MINOR: new backward-compatible features.
- PATCH: bug fixes.
- Pre-release example: 1.2.0-rc.1.

### 8.4 Versioning Best Practices

- Bump version on every chart change.
- Keep appVersion equal to the image tag you deploy.
- Quote appVersion in YAML so it stays a string.

### 8.5 Revision Checklist

- I can write a complete Chart.yaml.
- I understand SemVer rules for charts.

## Chapter 9 – values.yaml and Configuration Management

### 9.1 What Is values.yaml?

- The default configuration of a chart.
- Accessed in templates as .Values.<key>.

### 9.2 Override Methods

- Custom file: helm install app ./chart -f prod-values.yaml.
- Multiple files: -f base.yaml -f prod.yaml (later files win).
- Single value: --set replicaCount=3.
- Nested value: --set image.tag=1.2.0.
- List value: --set ports={80,443}.
- --set-string: force a string value.
- --set-file: read a value from a file.
- --set-json: set a JSON value.
- --set-literal: set a value without parsing special characters.

### 9.3 Values Precedence (Lowest to Highest)

- Parent chart values.yaml defaults.
- Subchart values.yaml defaults overridden by the parent.
- Values files passed with -f (in order).
- Values passed with --set flags.

### 9.4 Global Values

- Defined under global: and shared with every subchart.
- Access with .Values.global.<key>.

### 9.5 Environment-Specific Configuration

- Keep values-dev.yaml, values-staging.yaml and values-prod.yaml.
- Deploy with helm upgrade --install app ./chart -f values-prod.yaml.

### 9.6 Values Schema Validation

- Add values.schema.json to enforce types, required keys and allowed values.
- Helm validates values automatically on install, upgrade, lint and template.

### 9.7 Best Practices

- Use clear, nested, camelCase keys.
- Document every value with comments.
- Provide safe defaults.
- Never store real passwords in values files in Git.
- Use --reuse-values carefully; prefer explicit values files.

### 9.8 Revision Checklist

- I know all override methods and the precedence order.
- I can build environment-specific values files.

## Chapter 10 – The Helm Template Engine (Go Templates)

### 10.1 Template Syntax

- Actions are written inside {{ ... }}.
- Comments: {{/* comment */}}.
- Variables: {{ $name := .Values.name }}.

### 10.2 Built-in Objects

- .Values: values from values.yaml, files and flags.
- .Release.Name, .Release.Namespace, .Release.Revision, .Release.IsInstall, .Release.IsUpgrade, .Release.Service.
- .Chart.Name, .Chart.Version, .Chart.AppVersion.
- .Capabilities.KubeVersion, .Capabilities.APIVersions.
- .Template.Name and .Template.BasePath.
- .Files: access non-template files in the chart.

### 10.3 Pipelines

- Pass a value through functions using the pipe character.
- Example: {{ .Values.name | upper | quote }}.

### 10.4 Whitespace Control

- {{- removes whitespace before the action.
- -}} removes whitespace after the action.
- Incorrect whitespace is the most common cause of YAML errors.

### 10.5 Indentation

- Use indent or nindent to align multi-line output.
- Example: {{ toYaml .Values.resources | nindent 12 }}.

### 10.6 Debugging Templates

- helm template renders without a cluster.
- helm install --dry-run --debug shows the final output and computed values.
- helm lint finds syntax and structure problems.

### 10.7 Revision Checklist

- I can use built-in objects, pipelines and whitespace control.
- I can debug a broken template.

## Chapter 11 – Helm Template Functions

### 11.1 Common Functions

- quote: wrap in double quotes.
- default: fallback value, for example {{ .Values.tag | default "latest" }}.
- required: fail if a value is missing, for example {{ required "image.repository is required" .Values.image.repository }}.
- include: render a named template and return a string (can be piped).
- tpl: render a string as a template.
- toYaml, fromYaml, toJson, fromJson: format conversion.
- indent, nindent: indentation.
- upper, lower, title, trim, trunc, replace, contains: string handling.
- hasKey, dict, list, merge, mergeOverwrite: collections.
- b64enc, b64dec: base64.
- sha256sum: hash, often used to restart pods when a ConfigMap changes.
- fail: stop rendering with a custom error.
- lookup: read existing resources from the cluster.

### 11.2 Notes About lookup

- Returns an empty result during helm template and --dry-run without cluster access.
- Useful to reuse an existing Secret instead of regenerating it.

### 11.3 Restart Pods on Config Change

- Add an annotation in the pod template: checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}.

### 11.4 Revision Checklist

- I know the 10 most common functions and when to use include instead of template.

## Chapter 12 – Flow Control (if, with, range)

### 12.1 if / else if / else

- Syntax: {{ if .Values.ingress.enabled }} ... {{ else }} ... {{ end }}.
- Empty values are false: empty string, 0, false, nil, empty list and empty map.

### 12.2 Logical and Comparison Functions

- and, or, not.
- eq, ne, lt, gt, le, ge.

### 12.3 with

- Changes the scope: {{ with .Values.resources }} ... {{ end }}.
- Inside with, . refers to the selected value; use $ for the root scope.

### 12.4 range

- Loop over lists and maps: {{ range .Values.env }} ... {{ end }}.
- Map loop with key and value: {{ range $k, $v := .Values.labels }}.

### 12.5 Conditional Resources

- Wrap an entire template in {{ if .Values.autoscaling.enabled }} ... {{ end }} to create it only when enabled.

### 12.6 Revision Checklist

- I can create optional resources and loops.
- I understand scope inside with and range.

## Chapter 13 – Named Templates and Helpers

### 13.1 What Are Named Templates?

- Reusable template blocks defined with define.
- Stored in templates/_helpers.tpl (files starting with an underscore do not create resources).

### 13.2 Define and Use

- Define: {{- define "myapp.fullname" -}} ... {{- end }}.
- Use: {{ include "myapp.fullname" . }}.
- Prefer include over template because include output can be piped.

### 13.3 Standard Helpers in helm create

- myapp.name, myapp.fullname, myapp.chart.
- myapp.labels and myapp.selectorLabels.
- myapp.serviceAccountName.

### 13.4 Best Practices

- Prefix names with the chart name to avoid conflicts between charts.
- Pass the full context (.) to helpers.
- Keep selector labels stable because they cannot change after creation.

### 13.5 Revision Checklist

- I can write and reuse helper templates.

## Chapter 14 – Dependencies, Subcharts and Library Charts

### 14.1 Declaring Dependencies

- Add to Chart.yaml under dependencies: with name, version and repository.
- Optional fields: condition, tags, alias, import-values.

### 14.2 Dependency Commands

- helm dependency update downloads dependencies and creates Chart.lock.
- helm dependency build rebuilds from Chart.lock.
- helm dependency list shows dependency status.

### 14.3 Configuring Subcharts

- Use a top-level key that matches the subchart name (or alias) in the parent values.
- Example: values under postgresql: configure the postgresql subchart.

### 14.4 Enable or Disable Dependencies

- condition: redis.enabled turns a subchart on or off through values.

### 14.5 Library Charts

- type: library in Chart.yaml.
- Contains only named templates; shared across many charts to avoid duplication.

### 14.6 Best Practices

- Commit Chart.lock for reproducible builds.
- Pin dependency versions.
- Avoid deeply nested subcharts.

### 14.7 Revision Checklist

- I can add a dependency, configure it and enable it conditionally.

# Part 3 – Kubernetes Resources with Helm

## Chapter 15 – Workloads, Services, Ingress, Probes and Autoscaling

### 15.1 Deployment Template Essentials

- replicas from values.
- selector.matchLabels must match the pod template labels.
- Image from .Values.image.repository and .Values.image.tag | default .Chart.AppVersion.
- imagePullPolicy and imagePullSecrets from values.
- Resources: {{ toYaml .Values.resources | nindent 12 }}.
- Environment variables from values using range.

### 15.2 Services

- Types: ClusterIP (default), NodePort, LoadBalancer.
- Make service.type, service.port and service.targetPort configurable.

### 15.3 Ingress

- Wrap with {{ if .Values.ingress.enabled }}.
- Make className, hosts, paths, annotations and TLS configurable.
- Requires an ingress controller in the cluster.

### 15.4 Probes

- Liveness: restarts a stuck container.
- Readiness: removes a pod from the Service until it is ready.
- Startup: protects slow-starting applications.
- Expose probe settings through values.

### 15.5 Resource Requests and Limits

- Always set requests and limits in production.
- Provide defaults in values.yaml and let each environment override them.

### 15.6 Horizontal Pod Autoscaler

- Create the HPA only when autoscaling.enabled is true.
- When HPA is enabled, do not set replicas in the Deployment.

### 15.7 Other Resources

- ServiceAccount, Role and RoleBinding for least privilege.
- NetworkPolicy to restrict traffic.
- PodDisruptionBudget for safe node maintenance.
- Pod security context: run as non-root, read-only root filesystem.

### 15.8 Revision Checklist

- I can build a production-style Deployment, Service, Ingress and HPA from values.

## Chapter 16 – ConfigMaps and Secrets

### 16.1 ConfigMaps

- Store non-sensitive configuration.
- Create from values with range over a map.
- Use as environment variables (envFrom) or mounted files.
- Pods do not restart automatically when a ConfigMap changes; use the checksum annotation (Chapter 11).

### 16.2 Secrets

- Store sensitive data; values are base64 encoded, not encrypted.
- Use stringData to avoid manual base64 encoding.
- Never commit real secrets to Git.

### 16.3 Safe Secret Management

- Reference existing Secrets using existingSecret in values.
- Use external tools: External Secrets Operator, Sealed Secrets, SOPS (helm-secrets plugin), HashiCorp Vault or cloud secret managers.
- Enable encryption at rest for Kubernetes Secrets.

### 16.4 Generating Random Passwords

- randAlphaNum 16 creates a new value on every upgrade.
- Use lookup to reuse the existing Secret value and avoid password changes on upgrade.

### 16.5 Revision Checklist

- I can use ConfigMaps and Secrets and trigger a rollout when they change.
- I know safe patterns for secrets.

## Chapter 17 – Storage and Stateful Applications

### 17.1 Persistent Volumes in Charts

- Provide persistence.enabled, persistence.size, persistence.storageClass and persistence.accessModes in values.
- Create a PersistentVolumeClaim only when persistence is enabled.
- Support existingClaim for pre-created volumes.

### 17.2 StatefulSets

- Use for databases and clustered applications.
- Provide stable network identity through a headless Service.
- Use volumeClaimTemplates for per-pod storage.

### 17.3 Important Warnings

- PVCs created by a StatefulSet are not deleted by helm uninstall.
- Rollback does not restore data.
- Always back up data before upgrades.

### 17.4 Revision Checklist

- I can add persistence and understand data safety during uninstall and rollback.

# Part 4 – Release Management

## Chapter 18 – Installing, Upgrading and Rolling Back Releases

### 18.1 Install Options

- helm install <name> <chart>.
- --generate-name lets Helm pick a name.
- Install from a folder, a .tgz, a repository, an OCI URL or a full URL.
- --create-namespace, --wait, --timeout, --atomic.

### 18.2 Upgrade Strategy

- helm upgrade --install <name> <chart> -f values.yaml -n <ns>.
- --reuse-values: reuse previous values (can hide new chart defaults).
- --reset-values: use chart defaults plus the new values.
- --reset-then-reuse-values: reset to chart defaults, then re-apply previous values.
- --atomic and --cleanup-on-fail for safer upgrades.
- --force: recreate resources when needed (use carefully).

### 18.3 Revisions and History

- Each install, upgrade and rollback creates a new revision.
- helm history <release> shows status: deployed, superseded, failed, pending, uninstalled.
- Limit stored history with --history-max (default 10).

### 18.4 Rollback

- helm rollback <release> <revision>.
- Creates a new revision that copies the older one.
- Does not roll back data or external systems.
- Use --wait to confirm the rollback succeeded.

### 18.5 Uninstall

- helm uninstall <release> -n <ns>.
- --keep-history keeps the release record so rollback remains possible.

### 18.6 Dry Run and Diff

- --dry-run previews the result.
- The helm-diff plugin shows exactly what will change: helm diff upgrade <release> <chart> -f values.yaml.

### 18.7 Release States and Stuck Releases

- pending-install or pending-upgrade can occur after an interrupted command.
- Check helm history, then roll back or uninstall.
- Check for another Helm process before forcing any change.

### 18.8 Revision Checklist

- I can upgrade safely, inspect history and roll back.

## Chapter 19 – Hooks and Helm Tests

### 19.1 What Are Hooks?

- Kubernetes resources (usually Jobs) that run at a specific lifecycle point.
- Defined by annotation: "helm.sh/hook": pre-install.

### 19.2 Hook Types

- pre-install, post-install.
- pre-upgrade, post-upgrade.
- pre-rollback, post-rollback.
- pre-delete, post-delete.
- test (run by helm test).

### 19.3 Hook Control Annotations

- helm.sh/hook-weight: execution order (lower runs first).
- helm.sh/hook-delete-policy: before-hook-creation, hook-succeeded, hook-failed.

### 19.4 Common Use Cases

- Database migrations before an upgrade.
- Backups before deletion.
- Smoke tests after install.
- Cleanup after uninstall.

### 19.5 Important Notes

- Hook resources are not managed as part of the release; Helm does not delete them automatically unless a delete policy is set.
- A failing pre-hook blocks the install or upgrade.

### 19.6 Helm Tests

- Place test pods in templates/tests/ with annotation "helm.sh/hook": test.
- Run with helm test <release>.
- Use --logs to print test pod logs.

### 19.7 Revision Checklist

- I can write a migration hook and a test pod.

## Chapter 20 – Troubleshooting and Production Incident Handling

### 20.1 Systematic Troubleshooting Flow

- Step 1: helm list -A and helm status <release>.
- Step 2: helm history <release>.
- Step 3: helm get values <release> -a and helm get manifest <release>.
- Step 4: kubectl get pods,events -n <ns>.
- Step 5: kubectl describe pod <pod> and kubectl logs <pod>.
- Step 6: Fix the values or chart, then upgrade again or roll back.

### 20.2 Common Errors and Fixes

- Error: INSTALLATION FAILED: cannot re-use a name that is still in use: the release name already exists; use helm upgrade --install.
- Kubernetes cluster unreachable: wrong kubeconfig or cluster is down.
- UPGRADE FAILED: another operation is in progress: a previous operation was interrupted; inspect history and roll back.
- rendered manifests contain a resource that already exists: the resource was created outside Helm; adopt it using Helm ownership labels and annotations or delete it.
- YAML parse error: run helm template and check indentation and whitespace control.
- nil pointer evaluating interface: a missing value; use default, required or check with if.
- ImagePullBackOff: wrong image, tag or registry credentials.
- CrashLoopBackOff: check logs, probes, resources and configuration.
- timed out waiting for the condition: pods never became ready; check events and probes.
- Forbidden: RBAC permissions are missing for the Helm user or CI service account.

### 20.3 Incident Response Steps

- Stabilise first: roll back to the last known good revision.
- Collect evidence: history, manifests, events, logs.
- Find the root cause in a non-production environment.
- Fix forward with a tested chart version.
- Write a post-incident review.

### 20.4 Disaster Recovery

- Keep charts and values in Git so releases can be recreated.
- Back up persistent data separately.
- Know how to rebuild the release from Git when release Secrets are lost.

### 20.5 Revision Checklist

- I can troubleshoot install, upgrade and runtime failures in a structured way.

# Part 5 – Advanced Helm

## Chapter 21 – Security and Best Practices

### 21.1 RBAC and Least Privilege

- Use a dedicated service account for CI/CD with namespace-scoped permissions.
- Never use cluster-admin for routine deployments.
- Create Roles and ServiceAccounts in charts with only required permissions.

### 21.2 Secrets Management

- No secrets in Git or in plain values files.
- Use External Secrets, Sealed Secrets, SOPS or Vault.
- Remember that release Secrets store rendered manifests and values; restrict access to them.

### 21.3 Chart Provenance and Signing

- Sign charts with GPG: helm package --sign --key <name> --keyring <file> ./chart.
- Verify: helm verify <chart.tgz> or helm install --verify.
- OCI charts can also be signed with tools like cosign.

### 21.4 Image and Supply-Chain Security

- Pin image tags or digests; avoid latest.
- Scan images and charts (for example Trivy, Checkov, kube-linter, kubescape).
- Use trusted registries and private mirrors.
- Pin and review dependency versions.

### 21.5 Pod Security

- Run as non-root.
- Drop all Linux capabilities and add back only what is needed.
- Use read-only root filesystem.
- Apply Pod Security Standards (restricted profile) at namespace level.
- Add NetworkPolicies.

### 21.6 Admission and Policy

- Use OPA Gatekeeper or Kyverno to enforce policies on rendered manifests.
- Validate manifests in CI before deployment.

### 21.7 Production Security Checklist

- Least-privilege RBAC.
- Signed and verified charts.
- Scanned images.
- Secrets outside Git.
- Resource limits and security contexts.
- Network policies.
- Audit logging enabled.

## Chapter 22 – OCI Registries, Packaging and Chart Distribution

### 22.1 Why OCI?

- Reuse existing container registry infrastructure, authentication and access control.
- Charts are stored as OCI artifacts with tags equal to the chart version.

### 22.2 Workflow

- Lint: helm lint ./chart.
- Package: helm package ./chart.
- Login: helm registry login <registry>.
- Push: helm push chart-1.0.0.tgz oci://<registry>/charts.
- Install: helm install app oci://<registry>/charts/chart --version 1.0.0.
- Inspect: helm show values oci://<registry>/charts/chart --version 1.0.0.

### 22.3 Versioning and Promotion

- Use SemVer tags only.
- Promote the same immutable chart version from dev to staging to production.
- Do not overwrite published versions.

### 22.4 Enterprise Repository Management

- Use Harbor, Artifactory, Nexus, ACR, ECR or GHCR.
- Mirror public charts into a private registry.
- Apply retention policies and vulnerability scanning.
- Publish to Artifact Hub for discoverability when the chart is public.

## Chapter 23 – Plugins and Extensibility

### 23.1 What Are Plugins?

- Extensions that add new helm subcommands.
- Install: helm plugin install <url>.
- List: helm plugin list.
- Update: helm plugin update <name>.
- Remove: helm plugin uninstall <name>.

### 23.2 Useful Plugins

- helm-diff: preview upgrade changes.
- helm-secrets: manage encrypted values (SOPS).
- helm-unittest: unit test templates.
- helm-git: install charts from Git.
- helm-push or native OCI push for publishing.

### 23.3 Developing a Plugin

- A plugin is a folder with plugin.yaml and an executable or script.
- plugin.yaml defines name, version, usage, description and the command to run.
- Helm 4 introduces updated plugin mechanisms; check the official docs before writing new plugins.

### 23.4 Template Testing Tools

- helm lint for structure.
- helm template combined with kubeconform or kubeval for schema validation.
- helm-unittest for assertions on rendered output.
- chart-testing (ct) for linting and installing charts in CI.

## Chapter 24 – Helm in CI/CD Pipelines

### 24.1 Typical Pipeline Stages

- Checkout code.
- helm lint and helm template validation.
- Schema validation and policy checks.
- helm package and push to registry.
- helm upgrade --install --atomic --wait --timeout 5m.
- Post-deploy smoke test with helm test.
- Notification.

### 24.2 Jenkins

- Store kubeconfig as a credential.
- Use a pipeline stage to run Helm commands with a values file chosen by environment.

### 24.3 GitHub Actions

- Use azure/setup-helm to install Helm.
- Store kubeconfig or cloud credentials in repository secrets.
- Prefer OIDC federation to cloud providers over long-lived keys.

### 24.4 GitLab CI and Azure DevOps

- Use a container image with Helm and kubectl.
- Store credentials as protected CI/CD variables or service connections.

### 24.5 Release Promotion and Rollback Automation

- Build the chart once, promote the same version across environments.
- Use --atomic for automatic rollback on failure.
- Add a manual approval before production.

### 24.6 Best Practices

- Pin Helm and chart versions in pipelines.
- Use a separate values file per environment.
- Never print secrets in logs.

## Chapter 25 – Helm with GitOps (Argo CD and Flux)

### 25.1 GitOps Fundamentals

- Git is the single source of truth.
- A controller in the cluster continuously reconciles the cluster to match Git.
- Benefits: audit trail, easy rollback through Git revert, drift detection.

### 25.2 Helm with Argo CD

- Define an Application pointing to a chart in Git or a registry.
- Provide values files or inline values.
- Argo CD renders the chart with helm template logic and applies the manifests; it does not create Helm release records by default.
- Enable auto-sync, self-heal and prune carefully.

### 25.3 Helm with Flux

- HelmRepository or OCIRepository defines the source.
- HelmRelease defines the chart, version, values and upgrade or rollback behaviour.
- Flux uses the Helm library and keeps release history.

### 25.4 Environment Promotion

- Separate folders or branches per environment.
- Promote by changing the chart version or values through pull requests.

### 25.5 GitOps Security

- Protect the Git repository with reviews and branch protection.
- Use encrypted secrets (SOPS, Sealed Secrets, External Secrets).

## Chapter 26 – Enterprise, Multi-Cluster, Performance and Observability

### 26.1 Multi-Cluster Management

- Use --kube-context per cluster.
- Keep one values file layer per cluster or region.
- Use GitOps tools (ApplicationSet in Argo CD, Flux Kustomizations) to fan out deployments.

### 26.2 Platform Engineering

- Create organisation-wide base charts or library charts.
- Enforce standards through policy and CI checks.
- Provide documentation and example values.

### 26.3 Performance and Scale

- Reduce history with --history-max.
- Avoid very large values and very large templates.
- Split large applications into smaller charts or subcharts.
- Use --wait timeouts that match real startup times.
- Avoid expensive lookup calls in large clusters.

### 26.4 Observability

- Install Prometheus and Grafana with their Helm charts.
- Add ServiceMonitor and alert rules to your own charts when applicable.
- Standardise labels such as app.kubernetes.io/name, app.kubernetes.io/instance, app.kubernetes.io/version and app.kubernetes.io/managed-by.
- Track deployments with release annotations and CI/CD events.
- Centralise logs with Loki, ELK or a cloud logging service.

### 26.5 Production Operations Checklist

- Charts versioned and signed.
- Rollback tested.
- Resource limits, probes and autoscaling configured.
- Monitoring and alerts in place.
- Backups verified.

## Chapter 27 – Helm 3 vs Helm 4 and Migration

### 27.1 What Stays the Same

- Client-only architecture with no Tiller.
- Chart structure and apiVersion: v2 charts.
- Release model, revisions, repositories and OCI support.
- Most everyday commands.

### 27.2 What Changes in Helm 4 (High Level)

- Modernised plugin system.
- Improved resource application with server-side apply support.
- Better wait and readiness handling.
- Some deprecated flags and behaviours removed or renamed.
- Cleaner Go SDK for tools built on Helm.

### 27.3 Migration Plan

- Read the official Helm 4 release notes and upgrade guide.
- Test charts with Helm 4 in a non-production cluster.
- Run helm lint and helm template with both versions and compare the output.
- Update CI/CD images and plugins.
- Roll out gradually and keep Helm 3 available as a fallback.

### 27.4 Migration Checklist

- Charts render identically.
- Plugins are compatible.
- CI/CD pipelines are updated.
- Release history is intact.
- Team is trained on the changes.

# Part 6 – Projects, Interviews and Revision

## Chapter 28 – Real-World Projects

### 28.1 Project 1 – Deploy NGINX Using an Existing Chart

- Add the repository and search for the chart.
- Review defaults with helm show values.
- Install with custom replicas and Service type.
- Upgrade the image or replicas.
- Roll back and uninstall.

### 28.2 Project 2 – Build a Custom NGINX Chart

- helm create nginx-app and clean the templates.
- Configure values for image, replicas and service.
- Add a ConfigMap for the HTML page.
- Lint, render, install, upgrade and package.

### 28.3 Project 3 – Full-Stack Application

- Components: frontend, backend, database and Redis.
- Use subcharts for PostgreSQL and Redis with condition flags.
- Use ConfigMaps for settings and Secrets (existingSecret) for credentials.
- Persistent storage for the database.
- Values files for dev, staging and production.

### 28.4 Project 4 – Production-Ready Chart

- Standard labels and helpers.
- Security contexts and non-root containers.
- Resource requests and limits.
- Liveness, readiness and startup probes.
- HPA, PodDisruptionBudget, Ingress with TLS and NetworkPolicy.
- values.schema.json, tests and README.
- Package and publish to an OCI registry.

### 28.5 Project 5 – Complete CI/CD Pipeline

- Git repository with chart and values.
- Pipeline: lint, template, validate, package, push, deploy.
- Deploy with helm upgrade --install --atomic.
- Run helm test, send notifications and support rollback.

## Chapter 29 – Interview Questions and Answers

### 29.1 Beginner

- What is Helm? A package manager for Kubernetes that deploys applications as charts.
- What is a chart? A package of templates, values and metadata.
- What is a release? A deployed instance of a chart in a namespace.
- What is a repository? A server that hosts packaged charts and an index.yaml.
- Which command installs an application? helm install.
- Which file holds default configuration? values.yaml.

### 29.2 Intermediate

- Difference between helm install and helm upgrade --install? The second installs if missing and upgrades if present.
- How do you override values? -f files and --set flags; --set has the highest priority.
- What does helm template do? Renders manifests locally without installing.
- Difference between include and template? include returns a string that can be piped.
- What is _helpers.tpl? A file for reusable named templates.
- How do you manage dependencies? Declare in Chart.yaml and run helm dependency update.
- What are hooks? Resources that run at lifecycle events, such as migrations.

### 29.3 Advanced

- Why was Tiller removed? Security and RBAC concerns.
- Where does Helm store release data? In Secrets in the release namespace by default.
- Does rollback restore data? No, only Kubernetes resources from the older revision.
- How do you restart pods when a ConfigMap changes? Add a checksum annotation.
- How do you manage secrets safely? External Secrets, Sealed Secrets, SOPS or Vault.
- How do you avoid breaking upgrades? Use --atomic, helm diff, tests and staged rollouts.
- How does Helm work with GitOps? Argo CD or Flux render and apply charts from Git.
- What are the key differences between Helm 3 and Helm 4? See Chapter 27.

### 29.4 Scenario-Based

- Upgrade failed in production: check helm history, roll back to the last good revision, then investigate.
- Pods are in CrashLoopBackOff after upgrade: check logs, config and probes; compare helm get values between revisions.
- Release stuck in pending-upgrade: inspect history and roll back or uninstall after confirming no other operation is running.
- Same chart for three environments: one chart, three values files.

## Chapter 30 – Command Cheat Sheet

### 30.1 Setup and Repositories

- helm version, helm env.
- helm repo add <name> <url>, helm repo update, helm repo list, helm repo remove <name>.
- helm search repo <keyword>, helm search hub <keyword>.

### 30.2 Charts

- helm create <name>.
- helm lint <chart>.
- helm template <release> <chart> -f values.yaml.
- helm package <chart>.
- helm show values <chart>, helm pull <chart> --untar.
- helm dependency update <chart>.

### 30.3 Releases

- helm install <release> <chart> -n <ns> --create-namespace.
- helm upgrade --install <release> <chart> -f values.yaml --atomic --wait.
- helm list -A, helm status <release>, helm history <release>.
- helm rollback <release> <revision>.
- helm uninstall <release>.
- helm test <release>.

### 30.4 Debugging

- helm install --dry-run --debug.
- helm get values <release> -a, helm get manifest <release>, helm get hooks <release>.
- kubectl get events -n <ns> --sort-by=.lastTimestamp.

### 30.5 Registry and Security

- helm registry login <registry>, helm push <chart.tgz> oci://<registry>/<path>.
- helm package --sign, helm verify <chart.tgz>.

## Chapter 31 – Final Revision and Mastery Roadmap

### 31.1 Complete Concept Revision

- Fundamentals: chart, release, revision, repository, values.
- Development: templates, functions, flow control, helpers, dependencies.
- Operations: install, upgrade, rollback, hooks, tests, troubleshooting.
- Advanced: security, OCI, plugins, CI/CD, GitOps, multi-cluster.

### 31.2 One-Line Workflow

- Install tools, add repo, search, create or pull chart, set values, lint, template, install, verify, upgrade, test, roll back if needed, uninstall.

### 31.3 Practical Lab Checklist

- Install a public chart and customise it.
- Build a custom chart with Deployment, Service, ConfigMap and Ingress.
- Add a subchart dependency.
- Write a hook and a test.
- Package, push to an OCI registry and install from it.
- Deploy through a CI/CD pipeline.
- Deploy through Argo CD or Flux.

### 31.4 Common Mistakes to Avoid

- Confusing chart and release.
- Skipping lint, template and --dry-run.
- Using latest tags and unpinned chart versions.
- Committing secrets.
- Assuming rollback restores data.
- Overusing --reuse-values.

### 31.5 Learning Roadmap

- Beginner: Chapters 1 to 5 and Project 1.
- Intermediate: Chapters 6 to 17 and Projects 2 and 3.
- Advanced: Chapters 18 to 27 and Projects 4 and 5.
- Interview ready: Chapters 29 and 30.

### 31.6 Official References

- Helm documentation: https://helm.sh/docs/
- Chart template guide: https://helm.sh/docs/chart_template_guide/
- Command reference: https://helm.sh/docs/helm/
- Chart best practices: https://helm.sh/docs/chart_best_practices/
- Helm on GitHub: https://github.com/helm/helm
- Artifact Hub:

# New Chapter: Helm – Kubernetes Package Management and Complete Command Reference

## 1. Chapter Overview

**Technology:** Helm
**Category:** Kubernetes / Container Orchestration / DevOps
**Difficulty:** Beginner to Advanced
**Primary Purpose:** Kubernetes application packaging, deployment, configuration, and release management.

### Learning Objectives

After completing this chapter, you should understand how to:

Install and configure Helm.

Connect Helm to Kubernetes clusters.

Manage public and private chart repositories.

Create custom Helm charts.

Understand Helm chart directory structures.

Write reusable Helm templates.

Manage chart values and environment-specific configurations.

Install and deploy applications.

Manage releases and revisions.

Upgrade and roll back applications.

Manage chart dependencies.

Work with OCI-based Helm registries.

Validate and test Helm charts.

Troubleshoot failed deployments.

Secure Helm-based deployments.

Integrate Helm into CI/CD and GitOps workflows.

## 2. Understanding Helm

### What is Helm?

Helm is a package manager for Kubernetes.

It packages Kubernetes resource definitions into reusable units called charts.

It helps engineers deploy complex applications without manually applying every Kubernetes YAML file.

It manages application releases and their revision history.

It supports reusable templates and configurable deployment values.

It simplifies application deployment across development, staging, and production environments.

### Important Helm Terminology

**Helm:** Kubernetes package management tool.

**Chart:** A package containing Kubernetes resource templates and configuration.

**Release:** An installed instance of a Helm chart.

**Repository:** A location where Helm charts are stored and distributed.

**Values:** Configuration parameters used to customize charts.

**Templates:** Files that generate Kubernetes manifests.

**Revision:** A version of a deployed release's history.

**Dependencies:** Other charts required by a parent chart.

**Hooks:** Actions associated with Helm lifecycle events.

**OCI Registry:** A container registry that can store Helm charts.

### Helm Chart Directory Structure

A chart created using `helm create my-app` generally has this structure:

```
my-app/
├── Chart.yaml
├── Chart.lock
├── values.yaml
├── values.schema.json
├── charts/
├── templates/
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── serviceaccount.yaml
│   └── tests/
│       └── test-connection.yaml
└── .helmignore
```

`Chart.yaml` – Chart metadata and version information.

`Chart.lock` – Locked dependency information when dependencies are used.

`values.yaml` – Default chart configuration.

`values.schema.json` – Optional JSON Schema for validating values.

`charts/` – Packaged chart dependencies.

`templates/` – Kubernetes resource templates.

`_helpers.tpl` – Reusable template definitions.

`NOTES.txt` – Instructions displayed after installation.

`.helmignore` – Files excluded when packaging charts.

## 3. Complete Helm Commands Reference

The following command library is organized by operational category so that you can use it as a long-term reference in your DevOps notebooks.

**Command notation**

`<release>` – Helm release name.

`<chart>` – Chart directory or chart reference.

`<namespace>` – Kubernetes namespace.

`<repo>` – Helm repository alias.

`<revision>` – Release revision number.

`<version>` – Chart version.

`<values.yaml>` – Configuration file.

`[OPTION]` – Optional argument.

`-n` – Namespace shorthand.

`-f` – Values file shorthand.

`-A` – All namespaces.

`--dry-run` – Simulate an operation where supported.

`--debug` – Display additional diagnostic information.

# 4. Helm CLI – Complete Commands Library

## 4.1 Helm Installation and Setup

### Check Installation

```
helm version
helm version --short
helm env
helm help
helm help install
helm help upgrade
helm help list
```

### Check Helm Configuration

```
helm env
helm env | grep HELM
```

### Shell Autocomplete

```
# Bash
helm completion bash

# Zsh
helm completion zsh

# Fish
helm completion fish

# PowerShell
helm completion powershell
```

### Install Helm on Linux

```
# Download and install using official installation script
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

chmod 700 get_helm.sh

./get_helm.sh
```

### Install Using Package Managers

```
# macOS
brew install helm

# Windows using Chocolatey
choco install kubernetes-helm

# Windows using Winget
winget install Helm.Helm

# Ubuntu/Debian
sudo snap install helm --classic
```

## 4.2 Repository Management

### Add Repository

```
helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

### List Repositories

```
helm repo list
helm repo list -o yaml
helm repo list -o json
```

### Update Repositories

```
helm repo update
helm repo update bitnami
```

### Remove Repository

```
helm repo remove bitnami
helm repo remove prometheus-community
```

### Search Charts

```
helm search repo nginx

helm search repo prometheus

helm search repo redis

helm search repo bitnami
```

### Search All Available Versions

```
helm search repo nginx --versions
```

### Search Hub

```
helm search hub nginx
helm search hub prometheus
helm search hub wordpress
```

## 4.3 Chart Creation and Management

### Create Charts

```
helm create my-app

helm create nginx-chart

helm create backend-api
```

### Validate Charts

```
helm lint my-app

helm lint my-app --strict

helm lint my-app --debug
```

### Package Charts

```
helm package my-app

helm package my-app --destination ./packages

helm package my-app --version 1.2.0

helm package my-app --app-version 2.5.0
```

### Download Charts

```
helm pull bitnami/nginx

helm pull bitnami/nginx --untar

helm pull bitnami/nginx --version 18.0.0

helm pull bitnami/nginx --destination ./charts
```

### Inspect Chart Metadata

```
helm show chart bitnami/nginx

helm show values bitnami/nginx

helm show readme bitnami/nginx

helm show all bitnami/nginx
```

### Verify Chart Packages

```
helm verify nginx-1.0.0.tgz
```

Verification requires an appropriate provenance file and trusted signing configuration.

## 4.4 Helm Installation and Deployment

### Basic Installation

```
helm install my-release bitnami/nginx
```

### Install in Namespace

```
helm install my-release bitnami/nginx \
  --namespace production \
  --create-namespace
```

### Install with Values File

```
helm install my-release bitnami/nginx \
  -f values.yaml
```

### Install with Multiple Values Files

```
helm install my-release bitnami/nginx \
  -f values.yaml \
  -f production-values.yaml
```

Later values files override earlier values for conflicting keys.

### Install with CLI Values

```
helm install my-release bitnami/nginx \
  --set replicaCount=3
```

### Install with Multiple Values

```
helm install my-release bitnami/nginx \
  --set replicaCount=3 \
  --set service.type=ClusterIP
```

### Install with String Values

```
helm install my-release my-chart \
  --set-string appVersion=00123
```

### Install with JSON Values

```
helm install my-release my-chart \
  --set-json 'config={"environment":"production","debug":false}'
```

### Install with Dry Run

```
helm install my-release my-chart \
  --dry-run \
  --debug
```

### Install with Specific Chart Version

```
helm install my-release bitnami/nginx \
  --version 18.0.0
```

### Install or Upgrade

```
helm upgrade --install my-release bitnami/nginx
```

### Install with Wait

```
helm install my-release my-chart \
  --wait \
  --timeout 5m
```

### Install with Atomic Behavior

```
helm install my-release my-chart \
  --atomic \
  --timeout 5m
```

### Install with Custom Release Name

```
helm install production-nginx bitnami/nginx
```

### Install from Local Chart

```
helm install my-release ./my-chart
```

### Install from Packaged Chart

```
helm install my-release ./my-chart-1.0.0.tgz
```

## 4.5 Helm Release Management

### List Releases

```
helm list
helm list -A
helm list -n production
helm list --all
helm list --deployed
helm list --failed
helm list --pending
helm list --uninstalled
```

### List with Output Formats

```
helm list -o table
helm list -o yaml
helm list -o json
```

### Get Release Status

```
helm status my-release

helm status my-release -n production

helm status my-release --show-desc

helm status my-release --show-resources
```

### Get Complete Release Information

```
helm get all my-release

helm get all my-release -n production
```

### Get Release Values

```
helm get values my-release

helm get values my-release --all

helm get values my-release -o yaml
```

### Get Release Manifest

```
helm get manifest my-release

helm get manifest my-release -n production
```

### Get Release Notes

```
helm get notes my-release
```

### Get Release Hooks

```
helm get hooks my-release
```

### Get Release Metadata

```
helm get metadata my-release
```

## 4.6 Helm Upgrade Commands

### Basic Upgrade

```
helm upgrade my-release bitnami/nginx
```

### Upgrade with Values

```
helm upgrade my-release bitnami/nginx \
  -f values.yaml
```

### Upgrade with Multiple Values

```
helm upgrade my-release bitnami/nginx \
  -f values.yaml \
  -f production-values.yaml
```

### Upgrade with CLI Values

```
helm upgrade my-release bitnami/nginx \
  --set replicaCount=5
```

### Upgrade or Install

```
helm upgrade --install my-release bitnami/nginx
```

### Upgrade with Specific Version

```
helm upgrade my-release bitnami/nginx \
  --version 18.0.0
```

### Upgrade with Wait

```
helm upgrade my-release bitnami/nginx \
  --wait \
  --timeout 5m
```

### Upgrade with Atomic Behavior

```
helm upgrade my-release bitnami/nginx \
  --atomic \
  --timeout 5m
```

### Upgrade Without Reusing Previous Values

```
helm upgrade my-release bitnami/nginx \
  --reset-values \
  -f production-values.yaml
```

### Reuse Existing Values

```
helm upgrade my-release bitnami/nginx \
  --reuse-values \
  --set replicaCount=5
```

### Reset to Chart Defaults and Reuse New Values

```
helm upgrade my-release bitnami/nginx \
  --reset-then-reuse-values \
  -f production-values.yaml
```

### Dry-Run Upgrade

```
helm upgrade my-release bitnami/nginx \
  --dry-run \
  --debug
```

## 4.7 Helm Rollback and History

### View Release History

```
helm history my-release

helm history my-release -n production

helm history my-release -o yaml

helm history my-release -o json
```

### Rollback to Previous Revision

```
helm rollback my-release 1
```

### Rollback to Specific Revision

```
helm rollback my-release 2 -n production
```

### Rollback with Wait

```
helm rollback my-release 2 \
  --wait \
  --timeout 5m
```

### Rollback with Cleanup

```
helm rollback my-release 2 \
  --cleanup-on-fail
```

### Rollback with Atomic Behavior

```
helm rollback my-release 2 \
  --atomic
```

**Important:** Helm rollback restores a previous release configuration and Kubernetes resource state. It does not automatically reverse database migrations, external infrastructure changes, or persistent application data changes.

## 4.8 Helm Uninstall and Cleanup

### Uninstall Release

```
helm uninstall my-release
```

### Uninstall from Namespace

```
helm uninstall my-release -n production
```

### Uninstall with Wait

```
helm uninstall my-release \
  --wait \
  --timeout 5m
```

### Uninstall and Keep History

```
helm uninstall my-release \
  --keep-history
```

### Uninstall Multiple Releases

```
helm uninstall release-one release-two
```

### List Uninstalled Releases

```
helm list --uninstalled -A
```

**Important:** Uninstalling a Helm release does not necessarily delete persistent volumes or externally managed resources. Review storage retention policies and resource ownership before cleanup.

## 4.9 Values Management

### Display Default Values

```
helm show values bitnami/nginx
```

### Create Custom Values File

```
helm show values bitnami/nginx > values.yaml
```

### Use Values File

```
helm install my-release bitnami/nginx \
  -f values.yaml
```

### Override Individual Values

```
helm install my-release my-chart \
  --set image.tag=2.0.0
```

### Override Nested Values

```
helm install my-release my-chart \
  --set service.port=8080
```

### Override Lists

```
helm install my-release my-chart \
  --set 'extraArgs={--debug,--verbose}'
```

### Use String Values

```
helm install my-release my-chart \
  --set-string version=001
```

### Use File Values

```
helm install my-release my-chart \
  --set-file config=./application.conf
```

### Use JSON Values

```
helm install my-release my-chart \
  --set-json 'resources={"limits":{"cpu":"500m","memory":"512Mi"}}'
```

### Read Computed Release Values

```
helm get values my-release --all
```

## 4.10 Helm Templates and Manifest Rendering

### Render Templates

```
helm template my-release ./my-chart
```

### Render with Values

```
helm template my-release ./my-chart \
  -f values.yaml
```

### Render with Namespace

```
helm template my-release ./my-chart \
  --namespace production
```

### Render with Debug

```
helm template my-release ./my-chart \
  --debug
```

### Render Specific Templates

```
helm template my-release ./my-chart \
  --show-only templates/deployment.yaml
```

### Render with Specific Kubernetes Version

```
helm template my-release ./my-chart \
  --kube-version 1.32.0
```

### Render with API Versions

```
helm template my-release ./my-chart \
  --api-versions networking.k8s.io/v1
```

### Save Rendered Manifests

```
helm template my-release ./my-chart \
  > rendered.yaml
```

### Inspect Installed Manifest

```
helm get manifest my-release
```

## 4.11 Chart Dependencies

### List Dependencies

```
helm dependency list ./my-chart
```

### Update Dependencies

```
helm dependency update ./my-chart
```

### Build Dependencies

```
helm dependency build ./my-chart
```

### Rebuild Dependency Lock

```
helm dependency update ./my-chart
```

### Package Chart with Dependencies

```
helm package ./my-chart
```

## 4.12 Helm Plugin Management

### List Plugins

```
helm plugin list
```

### Install Plugin

```
helm plugin install <plugin-url>
```

### Install Specific Plugin Version

```
helm plugin install <plugin-url> --version <version>
```

### Update Plugin

```
helm plugin update <plugin-name>
```

### Update All Plugins

```
helm plugin update --all
```

### Remove Plugin

```
helm plugin uninstall <plugin-name>
```

### Plugin Help

```
helm help plugin
```

## 4.13 OCI Registry Management

Helm supports storing and distributing charts through OCI-compatible registries.

### Login to Registry

```
helm registry login registry.example.com
```

### Login with Username

```
helm registry login registry.example.com \
  --username myuser
```

### Login Using Password from Standard Input

```
echo "$REGISTRY_PASSWORD" | \
  helm registry login registry.example.com \
  --username myuser \
  --password-stdin
```

### Logout

```
helm registry logout registry.example.com
```

### Package Chart

```
helm package ./my-chart
```

### Push Chart to OCI Registry

```
helm push my-chart-1.0.0.tgz \
  oci://registry.example.com/helm-charts
```

### Pull Chart from OCI Registry

```
helm pull oci://registry.example.com/helm-charts/my-chart \
  --version 1.0.0
```

### Install from OCI Registry

```
helm install my-release \
  oci://registry.example.com/helm-charts/my-chart \
  --version 1.0.0
```

### Upgrade from OCI Registry

```
helm upgrade my-release \
  oci://registry.example.com/helm-charts/my-chart \
  --version 1.1.0
```

## 4.14 Helm Chart Testing and Validation

### Lint Chart

```
helm lint ./my-chart
```

### Strict Lint

```
helm lint ./my-chart --strict
```

### Render Templates

```
helm template my-release ./my-chart
```

### Debug Templates

```
helm template my-release ./my-chart --debug
```

### Validate Kubernetes Resources

```
helm template my-release ./my-chart \
  | kubectl apply --dry-run=server -f -
```

### Install Using Dry Run

```
helm install my-release ./my-chart \
  --dry-run \
  --debug
```

### Run Helm Chart Tests

```
helm test my-release
```

### Run Tests in Namespace

```
helm test my-release -n production
```

### Run Tests with Logs

```
helm test my-release --logs
```

## 4.15 Helm Registry and Repository Advanced Commands

### Search Repository

```
helm search repo nginx
helm search repo nginx --versions
```

### Search Artifact Hub

```
helm search hub nginx
```

### Show Chart Information

```
helm show chart bitnami/nginx
helm show values bitnami/nginx
helm show readme bitnami/nginx
helm show all bitnami/nginx
```

### Pull Specific Chart Version

```
helm pull bitnami/nginx --version 18.0.0
```

### Pull and Extract

```
helm pull bitnami/nginx \
  --version 18.0.0 \
  --untar
```

## 4.16 Helm Security and Signing

### Verify a Chart Package

```
helm verify my-chart-1.0.0.tgz
```

### Package with Provenance

```
helm package ./my-chart \
  --sign \
  --key "My Signing Key" \
  --keyring ~/.gnupg/secring.gpg
```

### Verify Signed Package

```
helm verify my-chart-1.0.0.tgz \
  --keyring ~/.gnupg/pubring.gpg
```

### Security Recommendations

Never store passwords or API keys in plaintext values files.

Use an external secret manager or an appropriate Kubernetes secret-management solution.

Restrict Kubernetes RBAC permissions.

Use trusted chart repositories.

Verify chart provenance when using signed charts.

Scan container images and chart dependencies.

Pin chart versions in production.

Review rendered manifests before deployment.

Avoid granting unnecessary cluster-admin permissions.

Protect registry credentials.

## 4.17 Helm Environment and Configuration

### Display Environment Variables

```
helm env
```

### Use Custom Configuration Directory

```
export HELM_CONFIG_HOME="$HOME/.config/helm"
```

### Use Custom Cache Directory

```
export HELM_CACHE_HOME="$HOME/.cache/helm"
```

### Use Custom Data Directory

```
export HELM_DATA_HOME="$HOME/.local/share/helm"
```

### Use Custom Repository Configuration

```
export HELM_REPOSITORY_CONFIG="$HOME/.config/helm/repositories.yaml"
```

### Use Custom Registry Configuration

```
export HELM_REGISTRY_CONFIG="$HOME/.config/helm/registry.json"
```

# 5. Important Helm Global Flags

These options are useful across multiple Helm commands.

`--namespace` / `-n` – Specify Kubernetes namespace.

`--kube-context` – Select Kubernetes context.

`--kubeconfig` – Specify Kubernetes configuration file.

`--kube-apiserver` – Specify Kubernetes API server.

`--kube-token` – Specify Kubernetes authentication token.

`--kube-ca-file` – Specify Kubernetes certificate authority file.

`--kube-as-user` – Impersonate a Kubernetes user.

`--kube-as-group` – Impersonate a Kubernetes group.

`--debug` – Enable additional debug output.

`--burst-limit` – Set client-side throttling burst limit.

`--qps` – Set Kubernetes API client query rate.

`--registry-config` – Specify registry configuration file.

`--repository-config` – Specify repository configuration file.

`--repository-cache` – Specify repository cache directory.

`--help` – Display command help.

# 6. Helm Troubleshooting Commands

## 6.1 Helm-Level Troubleshooting

```
helm version

helm env

helm repo list

helm repo update

helm list -A

helm status my-release -n production

helm history my-release -n production

helm get all my-release -n production

helm get values my-release -n production --all

helm get manifest my-release -n production

helm lint ./my-chart

helm template my-release ./my-chart --debug

helm install my-release ./my-chart \
  --dry-run \
  --debug
```

## 6.2 Kubernetes-Level Troubleshooting

Helm manages releases, but Kubernetes commands are essential for diagnosing actual workload failures.

### Check Cluster

```
kubectl cluster-info

kubectl get nodes

kubectl get namespaces

kubectl config current-context
```

### Check Pods

```
kubectl get pods -A

kubectl get pods -n production

kubectl get pods -o wide -n production
```

### Describe Pod

```
kubectl describe pod <pod-name> -n production
```

### View Logs

```
kubectl logs <pod-name> -n production

kubectl logs <pod-name> --previous -n production

kubectl logs <pod-name> -f -n production

kubectl logs <pod-name> -c <container-name> -n production
```

### Check Events

```
kubectl get events -n production \
  --sort-by=.metadata.creationTimestamp
```

### Check Deployments

```
kubectl get deployments -n production

kubectl describe deployment <deployment-name> -n production

kubectl rollout status deployment/<deployment-name> -n production

kubectl rollout history deployment/<deployment-name> -n production
```

### Check Services

```
kubectl get services -n production

kubectl describe service <service-name> -n production
```

### Check ConfigMaps and Secrets

```
kubectl get configmaps -n production

kubectl get secrets -n production
```

# 7. Practical Helm Production Workflows

## 7.1 Deploy NGINX Using Helm

```
# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Update repository
helm repo update

# Search chart
helm search repo bitnami/nginx

# Create namespace
kubectl create namespace production

# Install application
helm install nginx-production bitnami/nginx \
  -n production

# Verify release
helm status nginx-production -n production

# Check pods
kubectl get pods -n production

# Check services
kubectl get services -n production
```

## 7.2 Deploy with Custom Values

```
# Create values file
cat > production-values.yaml <<'EOF'
replicaCount: 3

service:
  type: ClusterIP

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
EOF

# Validate chart
helm lint ./my-chart

# Render templates
helm template my-app ./my-chart \
  -f production-values.yaml

# Deploy
helm upgrade --install my-app ./my-chart \
  -n production \
  --create-namespace \
  -f production-values.yaml \
  --wait \
  --timeout 5m
```

## 7.3 Upgrade Production Application

```
# Check current release
helm status my-app -n production

# Check revision history
helm history my-app -n production

# Perform upgrade
helm upgrade my-app ./my-chart \
  -n production \
  -f production-values.yaml \
  --wait \
  --timeout 5m

# Verify deployment
kubectl rollout status deployment/my-app -n production

# Check Helm release
helm status my-app -n production
```

## 7.4 Roll Back Failed Deployment

```
# Check history
helm history my-app -n production

# Roll back to revision 1
helm rollback my-app 1 \
  -n production \
  --wait

# Verify rollback
helm status my-app -n production

# Verify pods
kubectl get pods -n production
```

## 7.5 Remove Application

```
# Check release
helm list -n production

# Uninstall
helm uninstall my-app -n production

# Verify removal
helm list -n production

# Check remaining resources
kubectl get all -n production
```

# 8. Helm CI/CD Integration Commands

Helm can be integrated into Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps, and other automation platforms.

### Typical CI/CD Workflow

```
# 1. Checkout source code
git clone <repository-url>

# 2. Validate chart
helm lint ./my-chart

# 3. Update dependencies
helm dependency build ./my-chart

# 4. Render manifests
helm template my-app ./my-chart \
  -f values-production.yaml

# 5. Deploy application
helm upgrade --install my-app ./my-chart \
  -n production \
  --create-namespace \
  -f values-production.yaml \
  --wait \
  --timeout 5m

# 6. Run Helm tests
helm test my-app -n production

# 7. Verify deployment
kubectl rollout status deployment/my-app -n production
```

### Recommended Pipeline Stages

Source checkout.

Helm dependency installation.

Chart linting.

Template rendering.

Security and configuration scanning.

Kubernetes manifest validation.

Deployment to development.

Integration testing.

Deployment to staging.

Production approval.

Production deployment.

Release verification.

Rollback if necessary.

# 9. Helm Best Practices Checklist

## Chart Development

Use meaningful chart names.

Maintain clear chart directory structures.

Define chart metadata properly.

Use reusable template helpers.

Maintain a values schema where useful.

Document configuration parameters.

Pin chart dependencies.

Validate charts with `helm lint`.

## Deployment

Use dedicated namespaces.

Use environment-specific values files.

Pin chart versions.

Test templates before deployment.

Use dry-run validation.

Configure resource requests and limits.

Configure health probes.

Use appropriate deployment timeouts.

## Production Management

Maintain release history.

Test rollback procedures.

Secure Helm registry credentials.

Protect sensitive values.

Monitor Kubernetes workloads.

Use Git version control.

Integrate deployment into CI/CD.

Document deployment procedures.

# 10. Important Helm Interview and Practical Questions

## Beginner-Level Questions

What is Helm in Kubernetes?

Why do DevOps engineers use Helm?

What is a Helm chart?

What is a Helm release?

What is a Helm repository?

What is the difference between Helm and kubectl?

What is the purpose of `Chart.yaml`?

What is the purpose of `values.yaml`?

How do you install Helm?

How do you create a Helm chart?

## Intermediate-Level Questions

How does Helm template rendering work?

What is the difference between `helm install` and `helm upgrade`?

What is the purpose of `helm lint`?

What is the difference between `helm template` and `helm install`?

How do you manage multiple values files?

How do you manage chart dependencies?

What is the difference between `--set` and `-f`?

How does Helm maintain release history?

How do you roll back a Helm deployment?

How do you deploy the same chart across multiple environments?

## Advanced-Level Questions

How does Helm handle failed deployments?

How do Helm hooks work?

How can you develop reusable Helm charts?

How do you manage secrets securely?

How do you package and distribute private charts?

How does Helm support OCI registries?

How do you integrate Helm with Argo CD?

How do you implement GitOps using Helm?

How do you troubleshoot stuck Helm releases?

How do you manage Helm deployments across multiple clusters?

How do you handle breaking chart changes?

How do you prevent configuration drift?

How do you implement reliable rollback strategies?

What are the limitations of Helm in production?

# 11. Helm Quick-Reference Commands

Keep this section as your everyday command lookup.

```
# VERSION AND SETUP
helm version
helm env
helm help

# REPOSITORIES
helm repo list
helm repo add <name> <url>
helm repo update
helm repo remove <name>
helm search repo <keyword>
helm search hub <keyword>

# CHART MANAGEMENT
helm create <chart>
helm lint <chart>
helm package <chart>
helm pull <repo/chart>
helm show chart <chart>
helm show values <chart>
helm show all <chart>

# INSTALLATION
helm install <release> <chart>
helm install <release> <chart> -n <namespace>
helm install <release> <chart> -f values.yaml
helm install <release> <chart> --dry-run --debug

# RELEASE MANAGEMENT
helm list
helm list -A
helm status <release>
helm get all <release>
helm get values <release>
helm get manifest <release>
helm get hooks <release>
helm get notes <release>

# UPGRADES
helm upgrade <release> <chart>
helm upgrade <release> <chart> -f values.yaml
helm upgrade --install <release> <chart>
helm upgrade <release> <chart> --reuse-values

# HISTORY AND ROLLBACK
helm history <release>
helm rollback <release> <revision>

# UNINSTALLATION
helm uninstall <release>
helm list --uninstalled

# TEMPLATES
helm template <release> <chart>
helm template <release> <chart> -f values.yaml

# DEPENDENCIES
helm dependency list <chart>
helm dependency update <chart>
helm dependency build <chart>

# PLUGINS
helm plugin list
helm plugin install <url>
helm plugin update <name>
helm plugin uninstall <name>

# REGISTRIES
helm registry login <registry>
helm registry logout <registry>
helm push <chart.tgz> oci://<registry>/<repository>
helm pull oci://<registry>/<repository>/<chart>

# TESTING
helm test <release>
helm lint <chart>
helm verify <chart.tgz>
```

# 12. Complete Helm Application Lifecycle

The following is the recommended lifecycle to remember:

Install Helm.

Configure Kubernetes access.

Add chart repositories.

Update repository indexes.

Search for charts.

Inspect chart metadata.

Download or create charts.

Configure chart values.

Manage dependencies.

Validate charts.

Render Kubernetes manifests.

Test deployments.

Install applications.

Verify release status.

Monitor Kubernetes workloads.

Upgrade applications.

Review release history.

Roll back failed releases.

Run Helm tests.

Uninstall applications when required.

**One-line workflow:**

```
Install → Configure → Repository → Search → Create/Pull → Values → Dependencies → Lint → Template → Install → Verify → Upgrade → Test → Rollback → Uninstall
```

# 13. Official Helm Learning Resources

Official Helm Documentation:

Helm Commands Reference:

Helm Installation Guide:

Helm Chart Development Guide:

Helm Template Guide:

Helm Best Practices:

Helm GitHub Repository:

Artifact Hub:

# 14. Chapter Summary

Helm is an important tool in modern Kubernetes and DevOps engineering. It provides a structured approach to packaging, configuring, deploying, upgrading, and managing Kubernetes applications.

The commands and workflows in this chapter provide a practical reference for everyday Helm operations, application lifecycle management, and production troubleshooting.

**Remember:** Learning Helm is not just about memorizing commands. The real skill is understanding how charts, templates, values, releases, revisions, and Kubernetes resources work together in production environments.
