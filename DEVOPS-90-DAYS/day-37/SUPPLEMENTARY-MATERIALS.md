# Day 37 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 37 – Docker Revision & Cheat Sheet

## Goal
Take a **one-day pause** to consolidate everything from Days 29–36 so Docker actually sticks.

## Expected Output
- A markdown file: `docker-cheatsheet.md`
- A markdown file: `day-37-revision.md` with self-check answers

---

## Self-Assessment Checklist
Mark yourself honestly — **can do**, **shaky**, or **haven't done**:

- [ ] Run a container from Docker Hub (interactive + detached)
- [ ] List, stop, remove containers and images
- [ ] Explain image layers and how caching works
- [ ] Write a Dockerfile from scratch with FROM, RUN, COPY, WORKDIR, CMD
- [ ] Explain CMD vs ENTRYPOINT
- [ ] Build and tag a custom image
- [ ] Create and use named volumes
- [ ] Use bind mounts
- [ ] Create custom networks and connect containers
- [ ] Write a docker-compose.yml for a multi-container app
- [ ] Use environment variables and .env files in Compose
- [ ] Write a multi-stage Dockerfile
- [ ] Push an image to Docker Hub
- [ ] Use healthchecks and depends_on

---

## Quick-Fire Questions
Answer from memory, then verify:
1. What is the difference between an image and a container?
2. What happens to data inside a container when you remove it?
3. How do two containers on the same custom network communicate?
4. What does `docker compose down -v` do differently from `docker compose down`?
5. Why are multi-stage builds useful?
6. What is the difference between `COPY` and `ADD`?
7. What does `-p 8080:80` mean?
8. How do you check how much disk space Docker is using?

---

## Build Your Docker Cheat Sheet
Create `docker-cheatsheet.md` organized by category:
- **Container commands** — run, ps, stop, rm, exec, logs
- **Image commands** — build, pull, push, tag, ls, rm
- **Volume commands** — create, ls, inspect, rm
- **Network commands** — create, ls, inspect, connect
- **Compose commands** — up, down, ps, logs, build
- **Cleanup commands** — prune, system df
- **Dockerfile instructions** — FROM, RUN, COPY, WORKDIR, EXPOSE, CMD, ENTRYPOINT

Keep it short — one line per command, something you'd actually reference on the job.

---

## Revisit Weak Spots
Pick **2 topics** you marked as shaky and redo the hands-on tasks from that day.

---

## Suggested Flow (45–60 minutes)
- 10 min: go through the checklist honestly
- 10 min: answer quick-fire questions
- 20 min: build your cheat sheet
- 10 min: redo one weak area

---

## Submission
1. Add `docker-cheatsheet.md` and `day-37-revision.md` to `2026/day-37/`
2. Commit and push to your fork

---

## Learn in Public
Share your Docker cheat sheet on LinkedIn — help others revise too.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

## Source file: `day-37-revision.md`

# Day 37 – Docker Revision & Self-Assessment 🐳

## Goal

The goal of Day 37 is to revise everything learned during Days 29–36 and make sure the important Docker concepts are understood practically.

---

# 1. Self-Assessment Checklist

I rated each topic honestly based on my current understanding.

| Topic                            | Status   | Notes                                           |
| -------------------------------- | -------- | ----------------------------------------------- |
| Run a container from Docker Hub  | ✅ Can do | Comfortable with `docker run`                   |
| List, stop and remove containers | ✅ Can do | Know `ps`, `stop`, `rm`                         |
| Remove images                    | ✅ Can do | Know `docker rmi`                               |
| Explain image layers             | 🟡 Shaky | Need more practice with caching                 |
| Explain Docker build cache       | 🟡 Shaky | Understand the basic concept                    |
| Write a Dockerfile               | ✅ Can do | Comfortable with basic instructions             |
| Explain CMD vs ENTRYPOINT        | 🟡 Shaky | Need more real-world examples                   |
| Build and tag an image           | ✅ Can do | Know `docker build` and `docker tag`            |
| Named volumes                    | 🟡 Shaky | Understand persistence but need more practice   |
| Bind mounts                      | 🟡 Shaky | Understand host-to-container mapping            |
| Docker networks                  | 🟡 Shaky | Need more practice with container communication |
| Docker Compose                   | ✅ Can do | Have practiced multi-container applications     |
| Environment variables            | 🟡 Shaky | Understand `.env` basics                        |
| Multi-stage Dockerfile           | 🟡 Shaky | Understand the concept                          |
| Push image to Docker Hub         | 🟡 Shaky | Know the workflow                               |
| Healthchecks                     | 🟡 Shaky | Need more hands-on practice                     |
| depends_on                       | 🟡 Shaky | Understand startup dependency                   |

---

# 2. Quick-Fire Questions

## Q1. What is the difference between an image and a container?

### Answer

A Docker **image** is a read-only template used to create containers.

A **container** is a running or stopped instance created from an image.

Example:

```text
nginx image
     ↓
nginx container 1
nginx container 2
nginx container 3
```

One image can be used to create multiple containers.

---

## Q2. What happens to data inside a container when you remove it?

### Answer

Data stored only inside the container's writable filesystem is normally lost when the container is removed.

For persistent data, use a Docker volume or bind mount.

Example:

```bash
docker run -v my-data:/data nginx
```

The data in `my-data` can survive container removal.

---

## Q3. How do two containers on the same custom network communicate?

### Answer

Containers connected to the same custom Docker network can communicate using their container or Compose service names.

Example:

```text
backend → db:3306
```

If the MySQL service is called `db`, the backend should connect to:

```text
db:3306
```

It should generally not use:

```text
localhost:3306
```

because `localhost` inside the backend container refers to the backend container itself.

---

## Q4. What does `docker compose down -v` do differently from `docker compose down`?

### Answer

```bash
docker compose down
```

Stops and removes the Compose containers and network.

```bash
docker compose down -v
```

Does the same and also removes the Compose-managed volumes.

This is important for databases because deleting the volume can delete persistent database data.

---

## Q5. Why are multi-stage builds useful?

### Answer

Multi-stage builds allow us to separate the build environment from the runtime environment.

For example:

```text
Builder image
    ↓
Compile application
    ↓
Copy only final application
    ↓
Small production image
```

Benefits:

* Smaller Docker images
* Faster deployment
* Fewer unnecessary packages
* Reduced attack surface
* Cleaner production containers

---

## Q6. What is the difference between COPY and ADD?

### Answer

Both can copy files into an image.

`COPY` is simpler and preferred for normal file copying.

```dockerfile
COPY app.py /app/
```

`ADD` has additional features such as extracting local tar archives.

```dockerfile
ADD app.tar.gz /app/
```

For normal application files, use:

```dockerfile
COPY
```

---

## Q7. What does `-p 8080:80` mean?

### Answer

It maps a host port to a container port.

```text
-p HOST_PORT:CONTAINER_PORT
```

Therefore:

```bash
-p 8080:80
```

means:

```text
Host port 8080
       ↓
Container port 80
```

A user can access the application through:

```text
localhost:8080
```

while the application listens on port `80` inside the container.

---

## Q8. How do you check how much disk space Docker is using?

### Answer

Use:

```bash
docker system df
```

It shows Docker disk usage for:

* Images
* Containers
* Volumes
* Build cache

---

# 3. Important Concepts

## Docker Image

An image is a package containing everything required to run an application:

```text
Application
Dependencies
Libraries
Configuration
Base OS files
```

---

## Docker Container

A container is an isolated environment created from an image.

```text
Image
  ↓
Container
  ↓
Application running
```

---

## Docker Volume

A volume provides persistent storage outside the container's writable filesystem.

```text
Container
    ↓
Docker Volume
    ↓
Persistent Data
```

Useful for databases such as MySQL and PostgreSQL.

---

## Docker Network

A Docker network allows containers to communicate with each other.

```text
backend ──────┐
              │
              ↓
        app-network
              ↑
              │
db ───────────┘
```

The backend can communicate with the database using:

```text
db:3306
```

---

# 4. Dockerfile Example

A simple Python application:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

### Explanation

```text
FROM
↓
Select base image

WORKDIR
↓
Set application directory

COPY
↓
Copy files into image

RUN
↓
Install dependencies

EXPOSE
↓
Document application port

CMD
↓
Start application
```

---

# 5. Docker Compose Example

A simple backend + database application:

```yaml
services:

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      DB_HOST: db
      DB_PORT: 3306
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql-data:
```

### Architecture

```text
                 Docker Host
                     |
          ┌──────────┴──────────┐
          │                     │
      Backend                 MySQL
      :5000                   :3306
          │                     │
          └──── app-network ────┘
                    |
              mysql-data
                 volume
```

---

# 6. Multi-Stage Build Example

```dockerfile
FROM golang:1.25 AS builder

WORKDIR /app

COPY . .

RUN go build -o app

FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/app .

CMD ["./app"]
```

The first stage contains the compiler and build tools.

The second stage contains only the application required to run.

---

# 7. Practical Docker Workflow

The normal workflow is:

```text
1. Write application
       ↓
2. Create Dockerfile
       ↓
3. Build image
       ↓
4. Run container
       ↓
5. Test application
       ↓
6. Check logs
       ↓
7. Fix issues
       ↓
8. Tag image
       ↓
9. Push to Docker Hub
       ↓
10. Deploy
```

Commands:

```bash
docker build -t my-app:v1 .

docker run -d -p 8080:80 my-app:v1

docker ps

docker logs my-app

docker tag my-app:v1 username/my-app:v1

docker push username/my-app:v1
```

---

# 8. Weak Areas to Revisit

For additional hands-on practice, focus on these two areas:

## Weak Area 1 – Docker Networking

Practice:

```bash
docker network create app-network

docker run -d \
  --name web \
  --network app-network \
  nginx
```

Run another container:

```bash
docker run -it \
  --name test \
  --network app-network \
  busybox
```

Inside the `test` container, try:

```bash
ping web
```

The important concept is:

```text
Same custom network
        ↓
Containers can communicate
        ↓
Use container/service name
```

---

## Weak Area 2 – Docker Volumes

Create a volume:

```bash
docker volume create test-volume
```

Run a container:

```bash
docker run -it \
  --name volume-test \
  -v test-volume:/data \
  ubuntu bash
```

Inside the container:

```bash
echo "Docker persistent data" > /data/test.txt
```

Exit:

```bash
exit
```

Remove the container:

```bash
docker rm volume-test
```

Create another container using the same volume:

```bash
docker run -it \
  -v test-volume:/data \
  ubuntu bash
```

Check:

```bash
cat /data/test.txt
```

The data should still exist because it was stored in the Docker volume.

---

# 9. Commands I Should Remember for Interviews

```bash
docker ps
docker ps -a
docker images
docker pull nginx
docker build -t my-app:v1 .
docker run -d -p 8080:80 nginx
docker stop container
docker rm container
docker rmi image
docker exec -it container bash
docker logs container
docker volume ls
docker volume inspect volume
docker network ls
docker network inspect network
docker compose up -d
docker compose down
docker compose ps
docker compose logs -f
docker system df
docker system prune
```

---

# 10. Final Day-37 Summary

The most important Docker concepts learned so far are:

### Container

A running instance of an image.

### Image

A read-only template used to create containers.

### Dockerfile

A file containing instructions for building an image.

### Volume

Used for persistent data.

### Network

Allows containers to communicate.

### Docker Compose

Used to define and manage multi-container applications.

### Multi-stage Build

Used to create smaller and cleaner production images.

### Docker Hub

A registry used to store and share Docker images.

### Healthcheck

Used to determine whether a container/service is healthy.

### depends_on

Defines service dependencies in Docker Compose.

---

# 11. Day-37 Learning Outcome

After completing this revision, I should be able to:

* Run and manage Docker containers.
* Build custom Docker images.
* Write a basic Dockerfile.
* Explain Docker image layers and caching.
* Use volumes for persistent storage.
* Use bind mounts during development.
* Create Docker networks.
* Understand container-to-container communication.
* Create multi-container applications using Docker Compose.
* Use environment variables in Compose.
* Create multi-stage Dockerfiles.
* Push images to Docker Hub.
* Configure healthchecks.
* Understand `depends_on`.
* Troubleshoot basic Docker issues using logs, inspect, stats and disk-usage commands.

---

## Day 37 Status

**Docker fundamentals revised and consolidated. 🐳**

The next step is to continue building on these concepts with more practical Docker and DevOps work.

---

## Source file: `docker-cheatsheet.md`

# Docker Cheat Sheet 🐳

A quick and practical Docker reference covering the concepts and commands learned during Days 29–36.

---

## 1. Container Commands

### Run a container

```bash
docker run nginx
```

Creates and starts an Nginx container from the Docker Hub image.

### Run interactively

```bash
docker run -it ubuntu bash
```

Starts Ubuntu and opens an interactive Bash shell.

### Run in detached mode

```bash
docker run -d nginx
```

Runs the container in the background.

### Run with a custom name

```bash
docker run -d --name my-nginx nginx
```

Creates a container named `my-nginx`.

### List running containers

```bash
docker ps
```

Shows currently running containers.

### List all containers

```bash
docker ps -a
```

Shows running and stopped containers.

### Stop a container

```bash
docker stop my-nginx
```

Stops a running container gracefully.

### Start a stopped container

```bash
docker start my-nginx
```

Starts an existing stopped container.

### Restart a container

```bash
docker restart my-nginx
```

Stops and starts the container again.

### Remove a container

```bash
docker rm my-nginx
```

Removes a stopped container.

### Force remove a running container

```bash
docker rm -f my-nginx
```

Stops and removes the container.

### Execute a command inside a running container

```bash
docker exec -it my-nginx bash
```

Opens a shell inside the running container.

### View container logs

```bash
docker logs my-nginx
```

Displays container logs.

### Follow container logs

```bash
docker logs -f my-nginx
```

Continuously follows new log output.

### Inspect a container

```bash
docker inspect my-nginx
```

Shows detailed container configuration and networking information.

---

# 2. Port Mapping

```bash
docker run -d -p 8080:80 nginx
```

Meaning:

```text
Host Port : Container Port
8080      : 80
```

So:

```text
Browser
   |
   | http://localhost:8080
   v
Host Port 8080
   |
   v
Container Port 80
   |
   v
Nginx
```

The application listens on port `80` inside the container, while users access it through port `8080` on the host.

---

# 3. Image Commands

### List images

```bash
docker images
```

or:

```bash
docker image ls
```

Lists locally available Docker images.

### Pull an image

```bash
docker pull nginx
```

Downloads an image from Docker Hub.

### Build an image

```bash
docker build -t my-app:v1 .
```

Builds an image from the Dockerfile in the current directory.

### Tag an image

```bash
docker tag my-app:v1 username/my-app:v1
```

Creates another tag for the image, usually before pushing to Docker Hub.

### Push an image

```bash
docker push username/my-app:v1
```

Pushes the image to Docker Hub.

### Remove an image

```bash
docker rmi my-app:v1
```

Removes an image from the local machine.

### Inspect an image

```bash
docker inspect nginx
```

Shows detailed image information.

### View image history

```bash
docker history nginx
```

Shows the layers created while building the image.

---

# 4. Docker Image Layers

Docker images are made up of multiple read-only layers.

For example:

```text
Application Layer
       ↓
COPY application files
       ↓
RUN pip install
       ↓
RUN apt install
       ↓
Base Image
```

Docker uses these layers for caching.

If a Dockerfile instruction has not changed, Docker can reuse the existing layer instead of rebuilding it.

Example:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

If only `app.py` changes, Docker can reuse the previous layers and rebuild from the `COPY . .` instruction.

This makes builds faster.

---

# 5. Dockerfile Instructions

## FROM

```dockerfile
FROM python:3.12-slim
```

Defines the base image.

---

## WORKDIR

```dockerfile
WORKDIR /app
```

Sets the working directory inside the container.

---

## RUN

```dockerfile
RUN pip install -r requirements.txt
```

Executes a command while building the image.

`RUN` creates a new image layer.

---

## COPY

```dockerfile
COPY app.py .
```

Copies files from the build context into the image.

---

## ADD

```dockerfile
ADD app.tar.gz /app/
```

Similar to `COPY`, but has additional features such as extracting local tar archives and supporting URLs.

For normal file copying, prefer `COPY`.

---

## EXPOSE

```dockerfile
EXPOSE 5000
```

Documents the port that the application listens on.

Important:

`EXPOSE` does **not** publish the port to the host.

You still need:

```bash
docker run -p 5000:5000 my-app
```

---

## CMD

```dockerfile
CMD ["python", "app.py"]
```

Defines the default command that runs when the container starts.

---

## ENTRYPOINT

```dockerfile
ENTRYPOINT ["python"]
```

Defines the main executable for the container.

Example:

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

Docker effectively runs:

```bash
python app.py
```

---

# 6. CMD vs ENTRYPOINT

### CMD

Provides a default command or default arguments.

It can easily be overridden:

```bash
docker run my-image another-command
```

### ENTRYPOINT

Defines the main executable of the container.

Example:

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

A simple way to remember:

```text
ENTRYPOINT = What should run?
CMD        = What should it run with by default?
```

---

# 7. Named Volumes

### Create a volume

```bash
docker volume create my-volume
```

Creates a Docker-managed named volume.

### List volumes

```bash
docker volume ls
```

Lists Docker volumes.

### Inspect a volume

```bash
docker volume inspect my-volume
```

Shows volume details and mount information.

### Use a named volume

```bash
docker run -d \
  --name mysql \
  -v mysql-data:/var/lib/mysql \
  mysql
```

Stores MySQL data in the Docker volume `mysql-data`.

### Remove a volume

```bash
docker volume rm my-volume
```

Removes the volume.

---

# 8. Bind Mounts

A bind mount connects a host directory directly to a container directory.

```bash
docker run -d \
  -v /home/user/app:/app \
  nginx
```

Meaning:

```text
Host:
/home/user/app

        ↓

Container:
/app
```

Changes made on the host are visible inside the container.

### Named Volume vs Bind Mount

| Type         | Managed by | Common Use                           |
| ------------ | ---------- | ------------------------------------ |
| Named Volume | Docker     | Database/application persistent data |
| Bind Mount   | User/Host  | Development and sharing host files   |

---

# 9. Docker Networks

### List networks

```bash
docker network ls
```

Shows available Docker networks.

### Create a custom network

```bash
docker network create my-network
```

Creates a custom bridge network.

### Inspect a network

```bash
docker network inspect my-network
```

Shows containers connected to the network.

### Connect a container

```bash
docker network connect my-network my-container
```

Connects an existing container to the network.

### Disconnect a container

```bash
docker network disconnect my-network my-container
```

Disconnects a container from the network.

---

# 10. Container-to-Container Communication

Containers connected to the same custom Docker network can communicate using the **container/service name**.

Example:

```text
Network: app-network

┌─────────────┐
│   backend   │
└──────┬──────┘
       │
       │ db:3306
       ↓
┌─────────────┐
│     db      │
└─────────────┘
```

The backend can connect to MySQL using:

```text
db:3306
```

Not:

```text
localhost:3306
```

Inside a container, `localhost` means **that same container**.

---

# 11. Docker Compose

Docker Compose is used to define and run multi-container applications.

Example:

```yaml
services:

  backend:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
```

### Start services

```bash
docker compose up -d
```

Starts services in detached mode.

### Build and start

```bash
docker compose up -d --build
```

Builds images and starts the services.

### List services

```bash
docker compose ps
```

Shows Compose containers.

### View logs

```bash
docker compose logs
```

Shows logs from all services.

### Follow logs

```bash
docker compose logs -f
```

Continuously follows logs.

### Logs for one service

```bash
docker compose logs -f backend
```

Shows logs for the backend service.

### Stop and remove Compose resources

```bash
docker compose down
```

Stops and removes containers and the Compose network.

### Remove volumes also

```bash
docker compose down -v
```

Stops/removes containers, networks, and Compose-managed volumes.

**Be careful:** this can delete persistent database data stored in those volumes.

### Build images

```bash
docker compose build
```

Builds Compose images.

---

# 12. Environment Variables

Instead of hardcoding configuration:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: root
```

Use variables:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
```

Create a `.env` file:

```env
MYSQL_ROOT_PASSWORD=strongpassword
MYSQL_DATABASE=appdb
```

Then Compose can read these values automatically.

Do not commit sensitive passwords or secrets to GitHub.

---

# 13. Docker Compose Healthcheck

A healthcheck tells Docker whether a service is actually healthy.

Example:

```yaml
healthcheck:
  test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
  interval: 10s
  timeout: 5s
  retries: 5
```

Docker periodically runs the healthcheck.

Possible states:

```text
starting
healthy
unhealthy
```

---

# 14. depends_on

Example:

```yaml
backend:
  depends_on:
    db:
      condition: service_healthy
```

This tells Compose to wait for the database healthcheck before starting the backend.

Important:

`depends_on` controls startup order/dependencies. It does not automatically make an application resilient to every database failure.

---

# 15. Multi-Stage Builds

Multi-stage builds use multiple `FROM` statements.

Example:

```dockerfile
# Build stage
FROM golang:1.25 AS builder

WORKDIR /app

COPY . .

RUN go build -o myapp

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/myapp .

CMD ["./myapp"]
```

The first stage contains build tools.

The final stage contains only what is required to run the application.

### Benefits

* Smaller images
* Fewer unnecessary dependencies
* Better security
* Faster deployment
* Cleaner production images

---

# 16. Docker Hub

### Login

```bash
docker login
```

Logs in to Docker Hub.

### Tag image

```bash
docker tag my-app:v1 username/my-app:v1
```

### Push image

```bash
docker push username/my-app:v1
```

### Pull image

```bash
docker pull username/my-app:v1
```

Typical workflow:

```text
Build
  ↓
Tag
  ↓
Login
  ↓
Push
  ↓
Docker Hub
  ↓
Pull on another server
```

---

# 17. Docker Cleanup

### Remove stopped containers

```bash
docker container prune
```

### Remove unused images

```bash
docker image prune
```

### Remove unused volumes

```bash
docker volume prune
```

### Remove unused networks

```bash
docker network prune
```

### Remove unused Docker resources

```bash
docker system prune
```

### More aggressive cleanup

```bash
docker system prune -a
```

Be careful because this can remove unused images and other Docker resources.

---

# 18. Check Docker Disk Usage

```bash
docker system df
```

Shows how much disk space Docker is using.

Example:

```text
Images
Containers
Local Volumes
Build Cache
```

Useful when a server is running out of disk space.

---

# 19. Useful Inspection Commands

### Docker version

```bash
docker version
```

### Docker information

```bash
docker info
```

### Container processes

```bash
docker top my-container
```

### Container resource usage

```bash
docker stats
```

Shows CPU, memory, network and block I/O usage.

---

# 20. Practical Docker Workflow

A common application workflow:

```text
Write Application
       ↓
Create Dockerfile
       ↓
docker build
       ↓
Create Image
       ↓
docker run
       ↓
Test Application
       ↓
docker logs / docker exec
       ↓
Tag Image
       ↓
docker push
       ↓
Docker Hub
       ↓
Deploy on Server
```

---

# 21. Important Commands to Remember

```bash
docker ps
docker ps -a
docker images
docker pull IMAGE
docker build -t IMAGE:TAG .
docker run -d -p HOST:CONTAINER IMAGE
docker stop CONTAINER
docker start CONTAINER
docker rm CONTAINER
docker rmi IMAGE
docker exec -it CONTAINER bash
docker logs CONTAINER
docker volume ls
docker network ls
docker compose up -d
docker compose down
docker compose ps
docker compose logs -f
docker system df
docker system prune
```

---

# 22. Quick Interview Revision

### Image vs Container

```text
Image     = Template / Blueprint
Container = Running instance of an image
```

### Persistent Data

```text
Container filesystem → removed with container
Named volume          → persists after container removal
```

### Container Communication

```text
Same custom network → communicate using service/container name
```

### Port Mapping

```text
-p 8080:80

8080 = Host
80   = Container
```

### Multi-Stage Build

```text
Build tools → Build application → Copy artifact → Small runtime image
```

### Docker Disk Usage

```bash
docker system df
```

### Compose Volume Removal

```bash
docker compose down
```

Removes containers and networks.

```bash
docker compose down -v
```

Also removes Compose-managed volumes.
