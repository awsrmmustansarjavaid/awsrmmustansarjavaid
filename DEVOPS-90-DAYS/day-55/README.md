# Day 55 — AWS Observability & FinOps: CloudWatch, CloudTrail, Budgets & Cost Optimisation

[← Day 54](../day-54/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 56 →](../day-56/README.md)

| | |
|---|---|
| **Phase** | Phase 3 - Cloud & Infrastructure Automation |
| **Week** | Week 8 — Cloud Engineering: AWS & Azure |
| **Difficulty** | Intermediate - Advanced |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Monitor AWS resources with CloudWatch metrics, logs and alarms
- [ ] Audit with CloudTrail
- [ ] Apply FinOps basics

## 2. Prerequisites

- Days 50-54.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 CloudWatch

Metrics, Logs, Alarms, Dashboards, Logs Insights queries, Agent for memory/disk metrics, EventBridge for automation.

### 3.2 Audit and security

CloudTrail (who did what), Config (what changed), GuardDuty (threat detection), Security Hub.

### 3.3 FinOps

Inform -> Optimise -> Operate. Tagging, Cost Explorer, Budgets, anomaly detection, rightsizing, Savings Plans, shutting down idle resources, storage lifecycle.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Create CloudWatch alarm on CPU and notify via SNS email.
2. [ ] Install CloudWatch Agent; ship app log; query with Logs Insights.
3. [ ] Use CloudTrail to find who terminated an instance.
4. [ ] Enable Cost Anomaly Detection; build Cost Explorer view by tag.
5. [ ] Write a script to find unattached EBS volumes and unused Elastic IPs.

## 5. Real-World Scenario

> The AWS bill grew 40% month over month. Identify the top 3 cost drivers and propose savings with estimated impact.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
aws cloudwatch put-metric-alarm --alarm-name cpu-high --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanThreshold --evaluation-periods 2 --alarm-actions $SNS_ARN --dimensions Name=InstanceId,Value=$ID
aws logs start-query --log-group-name /lab/app --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) --query-string 'fields @timestamp,@message | filter @message like /ERROR/ | limit 20'
aws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[].VolumeId'
aws ce get-cost-and-usage --time-period Start=2026-10-01,End=2026-11-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 55 – Persistent Volumes (PV) and Persistent Volume Claims (PVC) — Challenge Brief

#### Task
Containers are ephemeral — when a Pod dies, everything inside it disappears. That is a serious problem for databases and anything that needs to survive a restart. Today you fix this with Persistent Volumes and Persistent Volume Claims.

---

#### Expected Output
- Data loss demonstrated with an ephemeral Pod
- A PV and PVC created, bound, and data persisting across Pod deletions
- A markdown file: `day-55-persistent-volumes.md`

---

#### Challenge Tasks

##### Task 1: See the Problem — Data Lost on Pod Deletion
1. Write a Pod manifest that uses an `emptyDir` volume and writes a timestamped message to `/data/message.txt`
2. Apply it, verify the data exists with `kubectl exec`
3. Delete the Pod, recreate it, check the file again — the old message is gone

**Verify:** Is the timestamp the same or different after recreation?

---

##### Task 2: Create a PersistentVolume (Static Provisioning)
1. Write a PV manifest with `capacity: 1Gi`, `accessModes: ReadWriteOnce`, `persistentVolumeReclaimPolicy: Retain`, and `hostPath` pointing to `/tmp/k8s-pv-data`
2. Apply it and check `kubectl get pv` — status should be `Available`

Access modes to know:
- `ReadWriteOnce (RWO)` — read-write by a single node
- `ReadOnlyMany (ROX)` — read-only by many nodes
- `ReadWriteMany (RWX)` — read-write by many nodes

`hostPath` is fine for learning, not for production.

**Verify:** What is the STATUS of the PV?

---

##### Task 3: Create a PersistentVolumeClaim
1. Write a PVC manifest requesting `500Mi` of storage with `ReadWriteOnce` access
2. Apply it and check both `kubectl get pvc` and `kubectl get pv`
3. Both should show `Bound` — Kubernetes matched them by capacity and access mode

**Verify:** What does the VOLUME column in `kubectl get pvc` show?

---

##### Task 4: Use the PVC in a Pod — Data That Survives
1. Write a Pod manifest that mounts the PVC at `/data` using `persistentVolumeClaim.claimName`
2. Write data to `/data/message.txt`, then delete and recreate the Pod
3. Check the file — it should contain data from both Pods

**Verify:** Does the file contain data from both the first and second Pod?

---

##### Task 5: StorageClasses and Dynamic Provisioning
1. Run `kubectl get storageclass` and `kubectl describe storageclass`
2. Note the provisioner, reclaim policy, and volume binding mode
3. With dynamic provisioning, developers only create PVCs — the StorageClass handles PV creation automatically

**Verify:** What is the default StorageClass in your cluster?

---

##### Task 6: Dynamic Provisioning
1. Write a PVC manifest that includes `storageClassName: standard` (or your cluster's default)
2. Apply it — a PV should appear automatically in `kubectl get pv`
3. Use this PVC in a Pod, write data, verify it works

**Verify:** How many PVs exist now? Which was manual, which was dynamic?

---

##### Task 7: Clean Up
1. Delete all pods first
2. Delete PVCs — check `kubectl get pv` to see what happened
3. The dynamic PV is gone (Delete reclaim policy). The manual PV shows `Released` (Retain policy).
4. Delete the remaining PV manually

**Verify:** Which PV was auto-deleted and which was retained? Why?

---

#### Hints
- PVs are cluster-wide (not namespaced), PVCs are namespaced
- PV status: `Available` -> `Bound` -> `Released`
- If a PVC stays `Pending`, check for matching capacity and access modes
- `hostPath` data is lost if the Pod moves to a different node
- `storageClassName: ""` disables dynamic provisioning
- Reclaim policies: `Retain` (keep data) vs `Delete` (remove data)

---

#### Documentation
Create `day-55-persistent-volumes.md` with:
- Why containers need persistent storage
- What PVs and PVCs are and how they relate
- Static vs dynamic provisioning
- Access modes and reclaim policies

---

#### Submission
1. Add `day-55-persistent-volumes.md` to `2026/day-55/`
2. Commit and push to your fork

---

#### Learn in Public
Share on LinkedIn: "Learned Kubernetes Persistent Volumes and PVCs today. Proved container data is ephemeral, then fixed it with PVs. Also explored dynamic provisioning with StorageClasses."

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 55 – Persistent Volumes (PV) and Persistent Volume Claims (PVC) — Notes & Solution

#### Task
Containers are ephemeral — when a Pod dies, everything inside it disappears. That is a serious problem for databases and anything that needs to survive a restart. Today you fix this with Persistent Volumes and Persistent Volume Claims.

---

#### Challenge Tasks

##### Task 1: See the Problem — Data Lost on Pod Deletion
1. Write a Pod manifest that uses an `emptyDir` volume and writes a timestamped message to `/data/message.txt`
2. Apply it, verify the data exists with `kubectl exec`
3. Delete the Pod, recreate it, check the file again — the old message is gone

**Verify:** Is the timestamp the same or different after recreation?
- Yes,Timstamp is different after recreation

<img width="1734" height="396" alt="Screenshot 2026-10-08 180241" src="https://github.com/user-attachments/assets/9e6c02d2-baf3-41e9-8d16-8da48f0c908b" />

---

##### Task 2: Create a PersistentVolume (Static Provisioning)
1. Write a PV manifest with `capacity: 1Gi`, `accessModes: ReadWriteOnce`, `persistentVolumeReclaimPolicy: Retain`, and `hostPath` pointing to `/tmp/k8s-pv-data`
2. Apply it and check `kubectl get pv` — status should be `Available`

Access modes to know:
- `ReadWriteOnce (RWO)` — read-write by a single node
- `ReadOnlyMany (ROX)` — read-only by many nodes
- `ReadWriteMany (RWX)` — read-write by many nodes

`hostPath` is fine for learning, not for production.

**Verify:** What is the STATUS of the PV?

- Status of the PV is `Available`

<img width="1514" height="227" alt="Screenshot 2026-10-08 180435" src="https://github.com/user-attachments/assets/4e28056c-5a44-4ec7-abb7-5c249327dee4" />

---

##### Task 3: Create a PersistentVolumeClaim
1. Write a PVC manifest requesting `500Mi` of storage with `ReadWriteOnce` access
2. Apply it and check both `kubectl get pvc` and `kubectl get pv`
3. Both should show `Bound` — Kubernetes matched them by capacity and access mode

**Verify:** What does the VOLUME column in `kubectl get pvc` show?

- The VOLUME column in kubectl get pvc shows the name of the PersistentVolume (PV) that the PersistentVolumeClaim (PVC) is bound to.

<img width="1645" height="303" alt="Screenshot 2026-10-08 180639" src="https://github.com/user-attachments/assets/aeb81068-10fa-4e68-8ab8-28fe26080291" />


---

##### Task 4: Use the PVC in a Pod — Data That Survives
1. Write a Pod manifest that mounts the PVC at `/data` using `persistentVolumeClaim.claimName`
2. Write data to `/data/message.txt`, then delete and recreate the Pod
3. Check the file — it should contain data from both Pods

**Verify:** Does the file contain data from both the first and second Pod?

- Yes, the file contains data from both the first and second pods.

<img width="1919" height="735" alt="Screenshot 2026-10-08 181413" src="https://github.com/user-attachments/assets/3f847a70-277c-4646-b0e9-d4fa46096833" />


---

##### Task 5: StorageClasses and Dynamic Provisioning
1. Run `kubectl get storageclass` and `kubectl describe storageclass`
2. Note the provisioner, reclaim policy, and volume binding mode
3. With dynamic provisioning, developers only create PVCs — the StorageClass handles PV creation automatically

**Verify:** What is the default StorageClass in your cluster?

<img width="1919" height="443" alt="Screenshot 2026-10-08 181622" src="https://github.com/user-attachments/assets/b7486d89-3c12-4e31-8fd2-f1e485fa0c13" />


- `Default StorageClass:` `standard` This is the automatically used storage when no class is specified in a PVC
- `Provisioner:` `rancher.io/local-path` Uses local node storage to create volumes
- `Reclaim Policy:` `Delete` Storage is deleted automatically when the PVC is deleted
- `Volume Binding Mode:` `WaitForFirstConsumer` Volume is created only when a Pod actually uses it

---

##### Task 6: Dynamic Provisioning
1. Write a PVC manifest that includes `storageClassName: standard` (or your cluster's default)
2. Apply it — a PV should appear automatically in `kubectl get pv`
3. Use this PVC in a Pod, write data, verify it works

**Verify:** How many PVs exist now? Which was manual, which was dynamic?
- 2 Pvs exist now
- `manual` test-pv
- `dynamic` dynamic-provsioning

<img width="1919" height="629" alt="Screenshot 2026-10-08 182033" src="https://github.com/user-attachments/assets/491e72ae-5662-4ef1-aaea-ce91eec86b3c" />


---

##### Task 7: Clean Up
1. Delete all pods first
2. Delete PVCs — check `kubectl get pv` to see what happened
3. The dynamic PV is gone (Delete reclaim policy). The manual PV shows `Released` (Retain policy).
4. Delete the remaining PV manually

**Verify:** Which PV was auto-deleted and which was retained? Why?

`Auto-deleted PV`: `pvc-c8e38f7a-b74c-44a0-89a2-b82e8ed5e7ed`

`Why:` It was dynamically provisioned and had a Reclaim Policy = Delete, so Kubernetes automatically deletes the PV when the associated PVC is deleted.

`Retained PV`: `test-pv`

`Why:` It was manually created and had a Reclaim Policy = Retain, so Kubernetes keeps the PV even after the PVC is deleted to prevent accidental data loss.

<img width="1783" height="354" alt="Screenshot 2026-10-08 182459" src="https://github.com/user-attachments/assets/ed39faea-2164-4af2-be16-032b05997c0b" />


---

**Why containers need persistent storage**

- Containers are `ephemeral`,so any data inside them is lost on restart.
- `Persistent storage` keeps data outside the container lifecycle for databases, logs, or user files.

**What PVs and PVCs are and how they relate**

`PersistentVolume (PV)`
- A piece of storage in the cluster.
- The admin can allocate storage manually or automatically

`PersistentVolumeClaim (PVC)`
- A request for storage by a user
- Specifies size, access mode, storage class.
- Kubernetes binds a PVC to a PV that matches its request.

`Relation:` PVC requests storage -> bound to a PV -> pod uses PVC to access storage.

**Static vs dynamic provisioning**

`Static Provisioning`
- PV is created manually by admin before the PVC exists.
- PVC claims it later.

`Dynamic Provisioning`
- PV is created automatically when a PVC is created,using a StorageClass.
- Saves time and avoids manual PV management.

`Example` PVC with storageClassName: standard -> Kubernetes automatically provisions a PV.

**Access modes and reclaim policies**

| Mode                    | Meaning                                  | Use Case                         |
| ----------------------- | ---------------------------------------- | -------------------------------- |
| **ReadWriteOnce** | Mounted **read-write by a single node**  | Most databases                   |
| **ReadOnlyMany**  | Mounted **read-only by multiple nodes**  | Config files, shared static data |
| **ReadWriteMany** | Mounted **read-write by multiple nodes** | Shared storage for multiple pods |


| Policy      | What happens when PVC is deleted       | 
| ----------- | -------------------------------------- | 
| **Delete**  | PV is automatically deleted            |               
| **Retain**  | PV is kept (data persists)             |

---

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Create a FinOps weekly checklist. | You can demonstrate, without notes: *monitor AWS resources with CloudWatch metrics, logs and alarms* — with evidence committed to `day-55/`. |
| 2 | Build a CloudWatch dashboard. | You can demonstrate, without notes: *audit with CloudTrail* — with evidence committed to `day-55/`. |
| 3 | Document 10 cost-saving actions with risk. | You can demonstrate, without notes: *apply FinOps basics* — with evidence committed to `day-55/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Alarm stuck INSUFFICIENT_DATA | Wrong dimension/namespace or no data; verify metric exists. |
| Cannot find who deleted | CloudTrail event history only 90 days; use trail to S3. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Turn on CloudTrail org-wide, protect log bucket, GuardDuty on, alert on root login and IAM changes.
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

1. Metrics vs logs vs traces?
2. CloudWatch vs CloudTrail?
3. What is FinOps?
4. How do you find waste?
5. **Scenario:** The AWS bill grew 40% month over month. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I create alarms? | ☐ | ☐ | ☐ | ☐ |
| Can I audit actions? | ☐ | ☐ | ☐ | ☐ |
| Can I find cost waste? | ☐ | ☐ | ☐ | ☐ |
| Monitor AWS resources with CloudWatch metrics, logs and alarms | ☐ | ☐ | ☐ | ☐ |
| Audit with CloudTrail | ☐ | ☐ | ☐ | ☐ |
| Apply FinOps basics | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-55/` in your own repository:

```text
day-55/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-55
git add day-55/
git commit -m "day-55: aws observability & finops"
git push -u origin day-55
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

[← Day 54](../day-54/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 56 →](../day-56/README.md)
