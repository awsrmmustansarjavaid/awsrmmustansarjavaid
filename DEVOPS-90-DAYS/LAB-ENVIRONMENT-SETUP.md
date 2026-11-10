# Lab Environment Setup

Complete this before Day 1.

## Minimum hardware

- 8 GB RAM (16 GB recommended from Week 11 for Kubernetes), 4 CPU cores, 60 GB free disk, stable internet.

## Operating system options

| Option | Notes |
|---|---|
| Windows + WSL2 (Ubuntu 24.04) | Recommended for Windows users |
| macOS + Multipass/UTM/Docker Desktop | Works well; some Linux-specific commands differ |
| Native Ubuntu 24.04 | Best fidelity |
| Cloud VM (small, free-tier/credit) | Needed for some networking and SSH labs; always set a budget |

## Accounts to create

- [ ] GitHub (enable 2FA, create SSH key)
- [ ] Docker Hub (and use GHCR)
- [ ] AWS (Day 50; set budget first) and Azure free account (Day 56)
- [ ] GitLab.com free account (Day 42)

## Core tools checklist

```bash
sudo apt update && sudo apt install -y git curl wget jq tree unzip vim tmux htop net-tools dnsutils ipcalc build-essential python3-venv python3-pip pipx
git --version; python3 --version; curl --version | head -1
```

Install later when the day requires: Docker, kubectl, kind, Helm, Terraform/OpenTofu, Ansible, AWS CLI v2, Azure CLI, Trivy, Syft, cosign, gitleaks, shellcheck, hadolint, pre-commit, k9s, argocd CLI.

## Create your working repository

```bash
mkdir -p ~/devops-90 && cd ~/devops-90
git init -b main
gh repo create devops-90-days --private --source=. --remote=origin
cp -r /path/to/DEVOPS-90-DAYS/* .
git add . && git commit -m "chore: import 90-day curriculum" && git push -u origin main
```

## Safety rules

1. **Budgets first.** Create AWS/Azure budgets before launching anything.
2. **Destroy after every cloud session.** `terraform destroy`, delete resource groups, stop clusters.
3. **No secrets in git, screenshots or notes.** Use `.gitignore`, pre-commit and gitleaks.
4. **Use throwaway credentials** and least-privilege roles for labs.
5. **Only test systems you own** (DAST/port scans).
6. Keep a backup of your notes repository.

## Estimated cloud spend

Days 1–49 need almost no cloud spend. Days 50–70 are mostly free-tier/low-cost if you destroy resources daily. Capstone 3 can run on a local multi-node kind cluster; use a managed cluster only if you accept the cost and have a teardown plan.
