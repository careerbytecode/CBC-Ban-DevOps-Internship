# Week 2 Assignment — Docker & Kubernetes

Week 2 assignment for the CareerByteCode DevOps internship. This repo contains Docker files, Kubernetes manifests, and the written assignment covering containerization concepts, the Docker image lifecycle, and core Docker/K8s commands.

## Repository Structure

```
.
├── docker-files/
│   ├── Dockerfile                    # Custom nginx image serving index.html on port 8080
│   ├── multi-instruction-Dockerfile  # Node.js Dockerfile demonstrating layered instructions
│   ├── docker-compose.yaml           # Two-service stack (web app + PostgreSQL) with a named volume
│   └── index.html                    # Static page served by the nginx image
├── k8s-files/
│   ├── deployment.yaml               # Deployment: 3 replicas of a custom app image (port 8080)
│   ├── service.yaml                  # NodePort Service exposing nginx pods on port 30080
│   └── three-nginx.yaml              # Deployment: 3 replicas of nginx:1.27 (port 80)
└── week-2-assignment.pdf             # Written answers: Docker vs VMs, image lifecycle, commands
```

## Docker

### Custom nginx image

`docker-files/Dockerfile` builds an nginx (Alpine) image that copies a custom `index.html` and reconfigures nginx to listen on port **8080** instead of 80.

```bash
cd docker-files
docker build -t myapp:v1 .
docker run -d -p 8080:8080 myapp:v1
# Visit http://localhost:8080
```

### Multi-instruction Dockerfile

`multi-instruction-Dockerfile` is a commented Node.js example showing common Dockerfile instructions (`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`) and layer-caching best practice — dependency files are copied and installed before the application code.

### Docker Compose

`docker-compose.yaml` defines a two-service stack:

- **web** — built from the local Dockerfile, mapped `8080:3000`, connects to the database using the service name `db` as hostname
- **db** — `postgres:16-alpine` with credentials via environment variables and a named volume (`db_data`) so data survives container removal

```bash
docker compose up -d
docker compose down          # add -v to also remove the volume
```

## Kubernetes

### Deployments

- `three-nginx.yaml` — runs **3 replicas** of `nginx:1.27` with label `app: nginx`
- `deployment.yaml` — runs **3 replicas** of a custom application image on container port 8080 with label `app: myapp`

### Service

`service.yaml` is a **NodePort** Service that selects pods labeled `app: nginx` (i.e., the `three-nginx` Deployment) and exposes them on node port **30080**.

```bash
kubectl apply -f k8s-files/three-nginx.yaml
kubectl apply -f k8s-files/service.yaml
kubectl apply -f k8s-files/deployment.yaml

kubectl get deployments
kubectl get pods -o wide
kubectl get svc nginx-service
# Access via http://<node-ip>:30080  (with minikube: minikube service nginx-service)
```

## Assignment Document

`week-2-assignment.pdf` contains written answers to the Week 2 questions:

1. Problems developers faced before Docker and how containerization solved them
2. Virtual Machines vs Containers — architecture, boot time, resource usage, isolation, portability
3. The complete Docker image lifecycle (Dockerfile → build → tag/push → pull → run → manage)
4. Common Docker commands with outputs (build, list images, run detached, view logs)

## Tools Used

- Docker & Docker Compose
- Kubernetes (kubectl)
- nginx, Node.js, PostgreSQL images
