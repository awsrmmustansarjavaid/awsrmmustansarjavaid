# Day 32 — Docker Volumes, Bind Mounts & Networking

[← Day 31](../day-31/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 33 →](../day-33/README.md)

| | |
|---|---|
| **Phase** | Phase 2 - Delivery & Security |
| **Week** | Week 5 — Containers & Container Security |
| **Difficulty** | Intermediate |
| **Estimated time** | 4.0 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Persist data safely with volumes
- [ ] Understand bridge networks and DNS between containers
- [ ] Publish and isolate ports

## 2. Prerequisites

- Day 31.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Storage

Container filesystem is ephemeral. Volumes (managed by Docker) persist data; bind mounts map host paths; tmpfs is memory-only.

### 3.2 Networking

Default bridge, user-defined bridge (embedded DNS by container name), host, none. Publish with `-p host:container`.

### 3.3 Isolation

Create separate networks per app tier; don't publish DB ports to host.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Run Postgres with a named volume; write data; remove container; re-run and verify data persists.
2. [ ] Back up the volume with a temporary container and tar.
3. [ ] Create network `appnet`; run app + DB and connect by name.
4. [ ] Prove a DB is unreachable from outside by not publishing it.
5. [ ] Inspect network with `docker network inspect`.

## 5. Real-World Scenario

> Product lost customer data after a container redeploy. Explain why, implement persistence and a tested backup/restore procedure.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
docker volume create pgdata
docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=changeme -v pgdata:/var/lib/postgresql/data postgres:16
docker run --rm --network appnet postgres:16 psql -h db -U postgres -c 'select 1'
docker run --rm -v pgdata:/data -v $PWD:/backup alpine tar czf /backup/pgdata.tgz -C /data .
docker network inspect appnet | jq '.[0].Containers'
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 32 – Docker Volumes & Networking — Challenge Brief

#### Task
Today's goal is to **solve two real problems: data persistence and container communication**.

Containers are ephemeral — they lose data when removed. And by default, containers can't easily talk to each other. Today you fix both.

---

#### Expected Output
- A markdown file: `day-32-volumes-networking.md`
- Screenshots of your experiments

---

#### Challenge Tasks

##### Task 1: The Problem
1. Run a Postgres or MySQL container
2. Create some data inside it (a table, a few rows — anything)
3. Stop and remove the container
4. Run a new one — is your data still there?

Write what happened and why.

---

##### Task 2: Named Volumes
1. Create a named volume
2. Run the same database container, but this time **attach the volume** to it
3. Add some data, stop and remove the container
4. Run a brand new container with the **same volume**
5. Is the data still there?

**Verify:** `docker volume ls`, `docker volume inspect`

---

##### Task 3: Bind Mounts
1. Create a folder on your host machine with an `index.html` file
2. Run an Nginx container and **bind mount** your folder to the Nginx web directory
3. Access the page in your browser
4. Edit the `index.html` on your host — refresh the browser

Write in your notes: What is the difference between a named volume and a bind mount?

---

##### Task 4: Docker Networking Basics
1. List all Docker networks on your machine
2. Inspect the default `bridge` network
3. Run two containers on the default bridge — can they ping each other by **name**?
4. Run two containers on the default bridge — can they ping each other by **IP**?

---

##### Task 5: Custom Networks
1. Create a custom bridge network called `my-app-net`
2. Run two containers on `my-app-net`
3. Can they ping each other by **name** now?
4. Write in your notes: Why does custom networking allow name-based communication but the default bridge doesn't?

---

##### Task 6: Put It Together
1. Create a custom network
2. Run a **database container** (MySQL/Postgres) on that network with a volume for data
3. Run an **app container** (use any image) on the same network
4. Verify the app container can reach the database by container name

---

#### Hints
- Volumes: `docker volume create`, `-v volume_name:/path`
- Bind mount: `-v /host/path:/container/path`
- Networking: `docker network create`, `--network`
- Ping: `docker exec container1 ping container2`

---

#### Submission
1. Add your `day-32-volumes-networking.md` to `2026/day-32/`
2. Commit and push to your fork

---

#### Learn in Public
Share what happened when you deleted a container without a volume on LinkedIn. The "aha moment" is real.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 🐳Day 32 – Docker Volumes & Networking — Notes & Solution

#### 🎯Challenge Tasks

##### 🔹Task 1: The Problem
1. Run a  MySQL container
<img width="1918" height="464" alt="Screenshot 2026-08-24 145729" src="https://github.com/user-attachments/assets/7ffc4bff-6d00-4964-b7c0-65bf7f453bf6" />

2. Create some data inside it (a table, a few rows — anything)
<img width="1919" height="830" alt="Screenshot 2026-08-24 150658" src="https://github.com/user-attachments/assets/4be67789-9204-4d45-b72d-afc533b04034" />
<img width="1918" height="837" alt="Screenshot 2026-08-24 150719" src="https://github.com/user-attachments/assets/a7ffbaca-0111-4ead-8a8a-690d0a413853" />

3. Stop and remove the container
<img width="1753" height="251" alt="Screenshot 2026-08-24 150835" src="https://github.com/user-attachments/assets/ed65088e-ed49-4723-bee6-55768a7412c6" />

4. Run a new one — is your data still there?
<img width="1448" height="728" alt="Screenshot 2026-08-24 150949" src="https://github.com/user-attachments/assets/4cee2ec6-f8f8-4852-943e-7987622824a1" />

#### What happened and why----> Data is Still there- No, Data is lost when a container is removed because containers are ephemeral and do not persist data by default.

---

##### 💾Task 2: Named Volumes
1. Create a named volume
<img width="1062" height="238" alt="Screenshot 2026-08-24 151053" src="https://github.com/user-attachments/assets/728b8822-9d71-434c-a0e7-1d4c0d76042d" />


2. Run the same database container, but this time **attach the volume** to it
<img width="1543" height="120" alt="Screenshot 2026-08-24 151629" src="https://github.com/user-attachments/assets/a8f9999b-5739-48b1-8f4b-20ee2488c3e8" />

3. Add some data, stop and remove the container
<img width="1091" height="642" alt="Screenshot 2026-08-24 151937" src="https://github.com/user-attachments/assets/5eca97ad-3e88-4f93-9462-c43314a93930" />
<img width="737" height="673" alt="Screenshot 2026-08-24 151945" src="https://github.com/user-attachments/assets/89b94182-d3b7-4808-b64a-3556a9c6fe41" />

4. Run a brand new container with the **same volume**
<img width="1360" height="170" alt="Screenshot 2026-08-24 152033" src="https://github.com/user-attachments/assets/10ca5801-567a-4dd9-9f5c-a22d8b71f320" />
<img width="1916" height="756" alt="Screenshot 2026-08-24 152215" src="https://github.com/user-attachments/assets/d8f3c6d7-f728-4277-9fed-8dcd908b3e3e" />
<img width="1156" height="415" alt="Screenshot 2026-08-24 152316" src="https://github.com/user-attachments/assets/10f0055c-c4fc-4eb2-9019-988f2ee7c8ed" />

5. Is the data still there?
- Yes, all previous data ,tables and rows are still there.

Verify: `docker volume ls`, `docker volume inspect`
<img width="992" height="190" alt="Screenshot 2026-08-24 152349" src="https://github.com/user-attachments/assets/831e7fc3-b1aa-4d32-9a18-1f47fb1a6f35" />
<img width="1000" height="313" alt="Screenshot 2026-08-24 152413" src="https://github.com/user-attachments/assets/79ea2a93-98f5-49f6-aef0-ff308ff4dd7c" />


---

##### 📁Task 3: Bind Mounts
1. Create a folder on your host machine with an `index.html` file
<img width="1919" height="527" alt="Screenshot 2026-08-24 152703" src="https://github.com/user-attachments/assets/4be29fd6-6b33-4137-bd17-717b97e185db" />

2. Run an Nginx container and **bind mount** your folder to the Nginx web directory
3. Access the page in your browser
<img width="1285" height="350" alt="Screenshot 2026-08-24 152729" src="https://github.com/user-attachments/assets/b63199cc-9fa5-49f0-97f8-a5b01530c0c5" />

4. Edit the `index.html` on your host — refresh the browser
<img width="1686" height="303" alt="Screenshot 2026-08-24 153400" src="https://github.com/user-attachments/assets/e1edca44-b78f-42c6-98d4-b843353a3277" />

#### What is the difference between a named volume and a bind mount?

**Volumes vs Bind Mounts**
**Volumes:**
- Managed by Docker.
- Stored in a part of the host filesystem which is managed by Docker.
- Preferred method for data persistence.

**Bind Mounts:**
- Maps a file or directory on the host to a file or directory in the container.
- More complex but provides flexibility to interact with the host system.
---

##### 🌐Task 4: Docker Networking Basics
1. List all Docker networks on your machine
<img width="877" height="185" alt="Screenshot 2026-08-24 153443" src="https://github.com/user-attachments/assets/69a21af0-44bc-468d-84fd-c031c04b9167" />

2. Inspect the default `bridge` network
<img width="558" height="700" alt="Screenshot 2026-08-24 153545" src="https://github.com/user-attachments/assets/8c01d5bd-38fb-4da0-b29f-eff79c4a52ce" />

- `docker network inspect` is the command used to retrieve detailed configuration and status information about a specific Docker network.
- The `bridge network` is indeed the default network in Docker.

3. Run two containers on the default bridge — can they ping each other by **name**?
- NO

<img width="1788" height="352" alt="Screenshot 2026-08-24 153712" src="https://github.com/user-attachments/assets/d617f56c-5d51-424b-a3bd-46e89d9b57f6" />

4. Run two containers on the default bridge — can they ping each other by **IP**?
- Yes
<img width="1628" height="323" alt="Screenshot 2026-08-24 153851" src="https://github.com/user-attachments/assets/cbffddcd-3b9a-4ee3-bf51-38dfa1375aeb" />

---

##### 🌐Task 5: Custom Networks
1. Create a custom bridge network called `my-app-net`
<img width="928" height="231" alt="Screenshot 2026-08-24 153945" src="https://github.com/user-attachments/assets/fe3d1eb0-1b39-4bf0-ac5c-91fcc00f5abb" />

2. Run two containers on `my-app-net`
- Conatiner Name-
- DB
- web

3. Can they ping each other by **name** now?
<img width="1225" height="281" alt="Screenshot 2026-08-24 154155" src="https://github.com/user-attachments/assets/d8c931bd-af35-4e56-af2c-974e366d6d3a" />


4. Write in your notes: Why does custom networking allow name-based communication but the default bridge doesn't?
- Default Docker `bridge network` `does not have built-in DNS`, so containers cannot resolve each other by name. They need IPs.
- `User-defined networks` have `embedded DNS`, so containers can communicate using their names.

---

##### 🚀Task 6: Put It Together
1. Create a custom network
<img width="1919" height="430" alt="Screenshot 2026-08-24 154701" src="https://github.com/user-attachments/assets/04f593a6-ab0d-4076-8cb2-035379b0f43b" />


2. Run a **database container** (MySQL/Postgres) on that network with a volume for data
3. Run an **app container** (use any image) on the same network
4. Verify the app container can reach the database by container name
<img width="1225" height="281" alt="Screenshot 2026-08-24 154155" src="https://github.com/user-attachments/assets/d8c931bd-af35-4e56-af2c-974e366d6d3a" />

---

##### 🧠 Key Learnings
- 💾 Docker Volumes → Provide persistent storage for containers.
- 📁 Bind Mounts → Allow host files/directories to be mounted into containers.
- 🌐 Docker Networks → Enable communication between containers.
- 🔍 Default Bridge → Containers can communicate using IP addresses, but name-based DNS resolution is limited.
- 🌐 Custom Networks → Provide automatic DNS-based container-name resolution.
- 🔗 Container Communication → Applications can communicate with databases using container names instead of hard-coded IP addresses.
- ♻️ Persistence → Volumes survive container removal unless the volume itself is deleted.

---

##### 🎯 Conclusion

Day 32 was a great hands-on exercise to understand Docker storage and networking.
I learned how to:
- ✅ Persist database data using Docker volumes
- ✅ Use bind mounts for host-container file sharing
- ✅ Explore Docker's default networking
- ✅ Create custom bridge networks
- ✅ Enable container-to-container communication using names
- ✅ Connect an application container to a database container

---

Happy Learning!
**TrainWithShubham**

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a restore procedure and test it. | You can demonstrate, without notes: *persist data safely with volumes* — with evidence committed to `day-32/`. |
| 2 | Explain volume vs bind mount trade-offs. | You can demonstrate, without notes: *understand bridge networks and DNS between containers* — with evidence committed to `day-32/`. |
| 3 | Show DNS resolution between containers using `getent hosts`. | You can demonstrate, without notes: *publish and isolate ports* — with evidence committed to `day-32/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Data gone after restart | No volume mounted at the data path. |
| Containers can't resolve names | Default bridge lacks DNS; use user-defined network. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Don't publish DB ports; use secrets, not plain env vars, for passwords; set volume permissions carefully.
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

1. Volume vs bind mount?
2. Why user-defined networks?
3. How do you back up a volume?
4. How do containers find each other?
5. **Scenario:** Product lost customer data after a container redeploy. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Can I persist and restore data? | ☐ | ☐ | ☐ | ☐ |
| Can I isolate DB networking? | ☐ | ☐ | ☐ | ☐ |
| Can I explain DNS between containers? | ☐ | ☐ | ☐ | ☐ |
| Persist data safely with volumes | ☐ | ☐ | ☐ | ☐ |
| Understand bridge networks and DNS between containers | ☐ | ☐ | ☐ | ☐ |
| Publish and isolate ports | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-32/` in your own repository:

```text
day-32/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-32
git add day-32/
git commit -m "day-32: docker volumes, bind mounts & networking"
git push -u origin day-32
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

## 18. Challenge Notes — Day 32: Installing Jenkins on AWS EC2

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

Welcome to **Day 32** of our DevOps 90-Day Challenge!
Yesterday, you learned Jenkins basics and created your first job.
Today, we’ll take it a step further and **install Jenkins on AWS EC2**, so you can run it in a cloud environment accessible to your team.

[![](https://img.youtube.com/vi/3zseHbWNs4w/0.jpg)](https://www.youtube.com/watch?v=3zseHbWNs4w)

[Watch the video](https://www.youtube.com/watch?v=3zseHbWNs4w)

---

#### Objective

By the end of this session, you will:

* Launch an **AWS EC2 instance** for Jenkins.
* Install and configure Jenkins on EC2.
* Open required ports with a **Security Group**.
* Access Jenkins publicly.

---

#### Tools Used

* **AWS Account**
* **EC2 Instance (Ubuntu 22.04 preferred)**
* **Jenkins** (installed on EC2)
* **SSH Client (Terminal or PuTTY)**

---

#### Step-by-Step Guide

##### 1. Launch an EC2 Instance

* Go to **AWS Console → EC2 → Launch Instance**
* Select **Ubuntu 22.04 LTS AMI**
* Instance type: `t2.micro` (Free Tier eligible)
* Create a **Key Pair** (download `.pem` file)
* Configure Security Group:

  * Allow SSH (22) from your IP
  * Allow HTTP (80) from anywhere
  * Allow Custom TCP (8080) from anywhere (for Jenkins)

##### 2. Connect to EC2

```bash
ssh -i mykey.pem ubuntu@<EC2_PUBLIC_IP>
```

##### 3. Install Java

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
java -version
```

##### 4. Install Jenkins

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
```

Enable & Start Jenkins:

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

##### 5. Open Jenkins in Browser

* Get Public IP of EC2 → `http://<EC2_PUBLIC_IP>:8080`
* Unlock Jenkins:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

* Install suggested plugins
* Create admin user

---

#### Verification

* Access Jenkins from **browser over the internet**.
* Jenkins dashboard loads successfully.
* Plugins install without issues.

---

#### Bonus (Advanced)

* Map EC2 **Elastic IP** so Jenkins IP doesn’t change.
* Configure **Nginx Reverse Proxy** for domain → `http://jenkins.mydevops.com`.
* Secure with **Let’s Encrypt SSL**.

---

#### Key Concepts Applied

| Concept              | Example Used                           |
| -------------------- | -------------------------------------- |
| Cloud Infrastructure | AWS EC2 as Jenkins host                |
| Security             | Security Groups for ports 22, 80, 8080 |
| CI/CD Setup          | Jenkins running on a public server     |

---

#### Congratulations!

You now have Jenkins running on AWS EC2! 
From this point, you can start using Jenkins as a **centralized CI/CD server**.

---

#### Try These Next

* Attach an **Elastic IP** and test persistence.
* Install Jenkins on **Docker inside EC2**.
* Secure Jenkins with **Nginx + SSL**.

## 19. Cohort Practice — Day 32: Docker Volumes & Networking

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task
Today's goal is to **solve two real problems: data persistence and container communication**.

Containers are ephemeral — they lose data when removed. And by default, containers can't easily talk to each other. Today you fix both.

---

#### Expected Output
- A markdown file: `day-32-volumes-networking.md`
- Screenshots of your experiments

---



#### Challenge Tasks

##### Task 1: The Problem
1. Run a Postgres or MySQL container
2. Create some data inside it (a table, a few rows — anything)
3. Stop and remove the container
4. Run a new one — is your data still there?

Write what happened and why.

---

##### Task 2: Named Volumes
1. Create a named volume
2. Run the same database container, but this time **attach the volume** to it
3. Add some data, stop and remove the container
4. Run a brand new container with the **same volume**
5. Is the data still there?

**Verify:** `docker volume ls`, `docker volume inspect`

---

##### Task 3: Bind Mounts
1. Create a folder on your host machine with an `index.html` file
2. Run an Nginx container and **bind mount** your folder to the Nginx web directory
3. Access the page in your browser
4. Edit the `index.html` on your host — refresh the browser

Write in your notes: What is the difference between a named volume and a bind mount?

---

##### Task 4: Docker Networking Basics
1. List all Docker networks on your machine
2. Inspect the default `bridge` network
3. Run two containers on the default bridge — can they ping each other by **name**?
4. Run two containers on the default bridge — can they ping each other by **IP**?

---

##### Task 5: Custom Networks
1. Create a custom bridge network called `my-app-net`
2. Run two containers on `my-app-net`
3. Can they ping each other by **name** now?
4. Write in your notes: Why does custom networking allow name-based communication but the default bridge doesn't?

---

##### Task 6: Put It Together
1. Create a custom network
2. Run a **database container** (MySQL/Postgres) on that network with a volume for data
3. Run an **app container** (use any image) on the same network
4. Verify the app container can reach the database by container name

---

#### Hints
- Volumes: `docker volume create`, `-v volume_name:/path`
- Bind mount: `-v /host/path:/container/path`
- Networking: `docker network create`, `--network`
- Ping: `docker exec container1 ping container2`

---

#### Submission
1. Add your `day-32-volumes-networking.md` to `2026/day-32/`
2. Commit and push to your fork

---

#### Learn in Public
Share what happened when you deleted a container without a volume on LinkedIn. The "aha moment" is real.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: day-32-volumes-networking

##### Task 1: The Problem
1. Run a Postgres or MySQL container
2. Create some data inside it (a table, a few rows — anything)
3. Stop and remove the container
4. Run a new one — is your data still there?
=====================================================

-> docker run --name my-postgres-test -e POSTGRES_PASSWORD=bijaya -p 5432:5432 -d postgres

-> docker logs postgres

-> docker exec -it postgres bash

-> psql -U postgres
-> \dt
-> CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
);

-> Insert three rows of sample data
INSERT INTO users (name, email) VALUES 
('Alice Smith', 'alice@example.com'),
('Bob Jones', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-> SELECT * FROM users;

-> \dt users

-> docker stop postgres && docker rm posgres


docker ps

then run new one  postgres container check table and data not exists

task - 4
==========

No, They can not . containers om the default bridge network can onlhy communicate with each other using the ip address , not their container names , automatic dns resolutions is disabled on the default bridge for security and isolation reasons


to allow containers to ping and comminicate with each other by name , you must use a user defined bridge network.


docker network create my_custom_network

yes they can .containers on the default bridge network can ping each other by ip address by default .docker does not block direct ip to ip communicate between containers on the same network unless you explicitely configyre it to do so.

## 20. Hands-on Project — Day 32: Jenkins Declarative Pipelines

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

Deep‑dive into Jenkins Declarative Pipeline patterns: stages, options, env, parameters, credentials, parallel & matrix builds, post conditions, and Shared Libraries.

**Files**
- Jenkinsfile-basic.groovy
- Jenkinsfile-credentials.groovy
- Jenkinsfile-parallel.groovy
- Jenkinsfile-matrix.groovy
- Jenkinsfile-sharedlib.groovy
- shared-lib/vars/hello.groovy
- shared-lib/vars/dockerBuildPush.groovy

### Files

- [Jenkinsfile-basic.groovy](files/hands-on-projects/Jenkinsfile-basic.groovy)
- [Jenkinsfile-credentials.groovy](files/hands-on-projects/Jenkinsfile-credentials.groovy)
- [Jenkinsfile-matrix.groovy](files/hands-on-projects/Jenkinsfile-matrix.groovy)
- [Jenkinsfile-parallel.groovy](files/hands-on-projects/Jenkinsfile-parallel.groovy)
- [Jenkinsfile-sharedlib.groovy](files/hands-on-projects/Jenkinsfile-sharedlib.groovy)
- [shared-lib/vars/dockerBuildPush.groovy](files/hands-on-projects/shared-lib/vars/dockerBuildPush.groovy)
- [shared-lib/vars/hello.groovy](files/hands-on-projects/shared-lib/vars/hello.groovy)


---

[← Day 31](../day-31/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 33 →](../day-33/README.md)
