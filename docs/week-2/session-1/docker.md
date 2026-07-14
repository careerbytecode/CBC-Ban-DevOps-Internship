
# 🐳 Docker Master Guide

# 1️⃣ Introduction to Docker

## 📖 Definition

Docker is an open-source containerization platform that packages an application along with its runtime, libraries, dependencies, configuration files, and environment into a lightweight unit called a **container**.

A Docker container runs the same way on your laptop, test server, production server, or cloud.

---

## 🧠 Simple Analogy

**Recipe → Cake**

- Recipe = Docker Image
- Cake = Docker Container

or

**Blueprint → House**

- Blueprint = Docker Image
- House = Docker Container

---

## 🎯 What is Containerization?

Containerization is the process of packaging an application together with everything required to run.

```
Container
│
├── Application
├── Runtime
├── Libraries
├── Dependencies
├── Configuration
└── Environment Variables
```

---

## 2️⃣ Why Docker?

### Problems Before Docker

- Works on developer machine but fails in production
- Different OS versions
- Different language versions
- Missing libraries
- Manual setup

### Docker Solution

```
Docker Image
     │
     ▼
Developer
Testing
Production
Cloud
```

Everything runs consistently.

### Benefits

| Benefit | Description |
|----------|-------------|
| Portability | Run anywhere |
| Lightweight | Shares host kernel |
| Isolation | Applications are isolated |
| Scalability | Easy to scale |
| Fast Startup | Containers start in seconds |

---

## Virtual Machine vs Docker

| Feature | Virtual Machine | Docker |
|---------|-----------------|--------|
| Startup Time | Minutes | Seconds |
| Size | GB | MB |
| OS | Separate Guest OS | Shares Host Kernel |
| Performance | Slower | Faster |
| Resource Usage | High | Low |

Virtual Machine

```
Application
Guest OS
Hypervisor
Host OS
Hardware
```

Docker

```
Application
Libraries
Docker Engine
Host OS
Hardware
```

---

## Docker Architecture

```
Developer
    │
docker build
    │
Docker Image
    │
docker run
    │
Docker Engine
    │
 ├── Images
 ├── Containers
 ├── Networks
 └── Volumes
```

### Components

#### Docker Client

Used to execute Docker commands.

```bash
docker run nginx
```

#### Docker Daemon

Runs in the background and manages:

- Images
- Containers
- Networks
- Volumes

#### Docker Registry

Stores Docker Images.

Examples:

- Docker Hub
- Amazon ECR
- Azure ACR
- Google Artifact Registry

---

## Installing Docker (Ubuntu)

### Syntax

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Verify

```bash
docker --version
docker info
```

### First Container

```bash
docker run hello-world
```

Expected Output

```
Hello from Docker!
```

---

## Docker Images

### Definition

A Docker Image is a read-only template used to create Docker Containers.

### Image Lifecycle

```
Dockerfile
   │
docker build
   │
Docker Image
   │
docker push
   │
Registry
   │
docker pull
   │
docker run
   │
Container
```

### Commands

Pull Image

```bash
docker pull nginx
```

List Images

```bash
docker images
```

Inspect Image

```bash
docker inspect nginx
```

Remove Image

```bash
docker rmi nginx
```

### Best Practices

- Use official images.
- Pin image versions (`nginx:1.27` instead of `latest`).
- Remove unused images.

### Troubleshooting

```text
Error: pull access denied
```

```bash
docker login
docker pull nginx
```

---

## Docker Containers

### Definition

A Docker Container is a running instance of a Docker Image.

```
Image
  │
docker run
  │
Container
```

### Lifecycle

```
Created
  │
Running
  │
Stopped
  │
Removed
```

### Syntax

```bash
docker run [OPTIONS] IMAGE
```

### Examples

Run

```bash
docker run nginx
```

Detached

```bash
docker run -d nginx
```

Named Container

```bash
docker run -d --name webserver nginx
```

Port Mapping

```bash
docker run -d -p 8080:80 nginx
```

Open:

```
http://localhost:8080
```

### Useful Commands

```bash
docker ps
docker ps -a
docker stop webserver
docker start webserver
docker restart webserver
docker rm webserver
docker logs webserver
docker exec -it webserver bash
docker inspect webserver
```

### Best Practices

- One application per container.
- Use meaningful names.
- Store persistent data in volumes.

### Common Mistakes

- Using `latest` tag in production.
- Running multiple services in one container.
- Storing database files inside containers.

### Troubleshooting

Container exited:

```bash
docker logs <container_name>
```

Enter container:

```bash
docker exec -it <container_name> bash
```









## Dockerfile

### 📖 Definition

A **Dockerfile** is a text file that contains instructions used to automatically build a Docker image.

Instead of manually installing software every time, Docker executes the instructions in the Dockerfile to create a reusable image.

---

### 🤔 Why Do We Need Dockerfile?

Without Dockerfile:

- Manual installation
- Different environments
- Difficult to reproduce

With Dockerfile:

- Automated image creation
- Version controlled
- Repeatable builds
- Easy CI/CD integration

---

### 🏗 Build Flow

```text
Dockerfile
    │
docker build
    │
Docker Image
    │
docker run
    │
Container
```

---

### Example Dockerfile

```dockerfile
FROM nginx:latest

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

---

### Build Image

```bash
docker build -t my-nginx .
```

Run

```bash
docker run -d --name website -p 8080:80 my-nginx
```

Open

```
http://localhost:8080
```

---

## Dockerfile Instructions

```
# 1. Defines the base image
FROM ubuntu:24.04

# 2. Adds image metadata
LABEL maintainer="admin@example.com"

# 3. Defines build-time variables
ARG VERSION=1.0

# 4. Defines environment variables
ENV APP_ENV=production

# 5. Sets the working directory
WORKDIR /app

# 6. Executes commands during image build
RUN apt update && apt install -y nginx python3 python3-pip

# 7. Copies local files into the image
COPY app/ /app/

# 8. Copies files and can extract local archives
ADD https://getsamplefiles.com/download/pdf/sample-1.pdf /app

# 9. Creates the appuser group and user in the /etc/passwd file
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 10. Runs the container as a non-root user
USER appuser

# 11. Documents the listening port
EXPOSE 8080

# 12. Checks application health
HEALTHCHECK CMD curl -f http://localhost || exit 1

# 13. Defines the main executable and its default argument
ENTRYPOINT ["python"]
CMD ["app.py"]
```

### FROM

Defines the base image.

```dockerfile
FROM ubuntu:24.04
```

---

### RUN

Executes commands during image build.

```dockerfile
RUN apt update && apt install -y nginx
```

---

### COPY

Copies local files into the image.

```dockerfile
COPY app/ /app/
```

---

### ADD

Copies files and can extract local archives.

```dockerfile
ADD app.tar.gz /app
```

---

### WORKDIR

Sets the working directory.

```dockerfile
WORKDIR /app
```

---

### ENV

Defines environment variables.

```dockerfile
ENV APP_ENV=production
```

---

### ARG

Defines build-time variables.

```dockerfile
ARG VERSION=1.0
```

---

### EXPOSE

Documents the listening port.

```dockerfile
EXPOSE 8080
```

---

### CMD

Default command when a container starts.

```dockerfile
CMD ["python","app.py"]
```

---

### ENTRYPOINT

Defines the main executable.

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

---

### USER

Runs the container as a non-root user.

```dockerfile
USER appuser
```

---

### LABEL

Adds image metadata.

```dockerfile
LABEL maintainer="admin@example.com"
```

---

### HEALTHCHECK

Checks application health.

```dockerfile
HEALTHCHECK CMD curl -f http://localhost || exit 1
```

---

## Docker Image Layers

Every Dockerfile instruction creates a new layer.

```text
Layer 5  CMD
Layer 4  COPY
Layer 3  RUN
Layer 2  WORKDIR
Layer 1  FROM
```

Benefits

- Faster builds
- Cached layers
- Smaller downloads

---

## Multi-stage Builds

Used to create smaller production images.

```dockerfile
# ==========================================
# STAGE 1: Prepare and compress assets using Nginx
# ==========================================
FROM nginx:1.27-alpine AS compiler

WORKDIR /source

# Copy your local HTML/website files into the stage
COPY . .

# Run a mock build or asset cleanup step using Nginx tools
RUN echo "<!-- Built via Nginx Stage -->" >> index.html

# ==========================================
# STAGE 2: Serve the final site using Apache (httpd)
# ==========================================
FROM httpd:2.4-alpine

# Set the working directory to Apache's public HTML folder
WORKDIR /usr/local/apache2/htdocs/

# Copy ONLY the clean HTML files from the Nginx stage
COPY --from=compiler /source/index.html .

# Expose Apache's default web port
EXPOSE 80
```

Advantages

- Smaller image
- Better security
- Faster deployment

---

## Docker Volumes

### Definition

Docker Volumes store persistent data outside containers.

Deleting a container does **not** delete data stored in a named volume.

```text
Container
     │
     ▼
 Docker Volume
     │
 Persistent Data
```

---

### Types

| Type | Description |
|------|-------------|
| Named Volume | Managed by Docker |
| Bind Mount | Uses a host directory |
| Anonymous Volume | Auto-created by Docker |

---

### Create Volume

```bash
docker volume create my_volume
```

List Volumes

```bash
docker volume ls
```

Inspect

```bash
docker volume inspect my_volume
```

---

## Example

```bash
docker run -d --name web -v my_volume:/usr/share/nginx/html nginx
```

---

### Bind Mount Example

```bash
docker run -d -v $(pwd):/app python:3.12
```

---

### Best Practices

- Databases → Named Volumes
- Source code → Bind Mounts

---

## Docker Networking

### What is Docker Networking?

Docker Networking allows containers to communicate with each other and with external systems.

Example

```text
Frontend
     │
Backend
     │
Database
```

---

### Bridge Network

Default network.

```bash
docker network create my_bridge
```

```bash
docker run -d --name app1 --network my_bridge nginx
docker run -d --name app2 --network my_bridge busybox sleep 3600
docker exec app2 ping app1
```

Use Case

- Multi-container applications on one host

---

### Host Network

Container shares the host network.

```bash
docker run --network host nginx
```

Advantages

- High performance
- No port mapping

Disadvantages

- Less isolation

---

### None Network

No networking.

```bash
docker run --network none alpine
```

Use Case

- Security
- Offline processing

---

### Overlay Network

Used with Docker Swarm.

```bash
docker swarm init
docker network create --driver overlay my_overlay
```

Use Case

- Multi-host communication

---

### Macvlan Network

Assigns a real IP from the physical network.

Use Cases

- Legacy applications
- Appliances
- Network monitoring

---

## Docker Compose

### Definition

Docker Compose is a tool for defining and running multi-container applications using a YAML file.

---

### Why Compose?

Without Compose

```bash
docker run ...
docker run ...
docker run ...
```

With Compose

```bash
docker compose up -d
```

---

### Compose Architecture

```text
docker-compose.yml
        │
docker compose up
        │
 ├── Web
 ├── API
 └── Database
```

---

### Sample docker-compose.yml

```yaml
version: "3.9"

services:
  web:
    image: nginx
    ports:
      - "8080:80"

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
```

---

### Commands

Start

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Logs

```bash
docker compose logs
```

Rebuild

```bash
docker compose up --build
```

---

## Best Practices

- Keep Dockerfiles small.
- Use multi-stage builds.
- Use specific image tags.
- Use custom bridge networks.
- Store database data in volumes.
- Never hardcode secrets in images.
- Run containers as non-root.

---

## Troubleshooting

### Build Failed

```bash
docker build .
```

Check Dockerfile syntax.

---

### Volume Not Updating

Verify mount path.

```bash
docker inspect container_name
```

---

### Containers Cannot Communicate

```bash
docker network ls
docker network inspect my_bridge
```

Ensure containers share the same network.

---

### Compose Service Failed

```bash
docker compose logs
```





---




## Docker Registry

### 📖 Definition

A Docker Registry is a service used to store, version, and distribute Docker images.

Instead of rebuilding an image on every server, build it once and push it to a registry.

```text
Developer
    │
docker build
    │
Docker Image
    │
docker push
    │
Docker Registry
    │
docker pull
    │
Production Server
```

### Why Use a Registry?

- Central image repository
- Version management
- Team collaboration
- CI/CD integration

### Common Registries

| Registry | Use Case |
|-----------|----------|
| Docker Hub | Public images |
| Amazon ECR | AWS |
| Azure ACR | Azure |
| Google Artifact Registry | GCP |
| Harbor | Private registry |

### Commands

Login

```bash
docker login
```

Tag

```bash
docker tag myapp:1.0 username/myapp:1.0
```

Push

```bash
docker push username/myapp:1.0
```

Pull

```bash
docker pull username/myapp:1.0
```



