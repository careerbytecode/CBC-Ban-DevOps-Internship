# Docker & Kubernetes Week 2

## Project Overview

This repository contains the practical work completed for the **CareerByteCode DevOps Internship – Week 2 Assignment**.

The project demonstrates how to:

- Build a Docker image using a Dockerfile.
- Build and run containerized applications using Docker.
- Deploy applications to Kubernetes using Pods and Deployments.
- Manage source code using Git and GitHub.

---

# Project Structure

```text
docker-k8s-week2/
│
├── Dockerfile
├── index.html
├── pod.yaml
├── deployment.yaml
├── README.md
└── screenshots/
    ├── docker-build.png
    ├── docker-run.png
    ├── kubectl-get-pods.png
    ├── kubectl-get-deployment.png
    ├── git-log.png
    └── minikube-start.png
```

---

# Project Files

| File | Purpose |
|------|---------|
| **Dockerfile** | Builds a custom Nginx Docker image to serve a static website. |
| **index.html** | Static web page served by Nginx. |
| **pod.yaml** | Creates a single Redis Pod. |
| **deployment.yaml** | Creates and manages Nginx Pods with self-healing, scaling, and rolling updates. |
| **README.md** | Project documentation. |
| **screenshots/** | Screenshots of executed Docker, Kubernetes, and Git commands. |

---

# Difference Between Pod and Deployment

## Pod

A **Pod** is the smallest deployable unit in Kubernetes.

Features:

- Runs one or more containers.
- Used for a single instance of an application.
- Does not automatically recover if created directly and it fails.
- Suitable for testing and simple workloads.

Example:

```text
Pod
 └── Redis Container
```

---

## Deployment

A **Deployment** manages Pods automatically.

Features:

- Creates and manages multiple Pods.
- Automatically recreates failed Pods (self-healing).
- Supports scaling.
- Supports rolling updates.
- Supports rollback to previous versions.

Example:

```text
Deployment
      │
      ▼
 ReplicaSet
      │
 ┌────┴────┐
 ▼         ▼
Pod 1    Pod 2
```

---

# Difference Between What Was Built

| Component | Purpose | Created Using |
|-----------|---------|---------------|
| Dockerfile | Builds a custom Nginx Docker image | Docker |
| Pod YAML | Creates a single Redis Pod | Kubernetes |
| Deployment YAML | Manages multiple Nginx Pods with scaling and self-healing | Kubernetes |

---

# Technologies Used

- Docker
- Docker Hub
- Kubernetes
- Minikube
- kubectl
- Git
- GitHub

---

# Commands Used

## Docker

```bash
docker build -t my-nginx .
docker run -d -p 8080:80 my-nginx
docker images
docker ps
```

---

## Kubernetes

```bash
kubectl apply -f pod.yaml
kubectl apply -f deployment.yaml
kubectl get pods
kubectl get deployments
kubectl get nodes
```

---

## Git

```bash
git init
git add .
git commit -m "Initial commit"
git commit -m "Added Dockerfile"
git commit -m "Added Kubernetes manifests"
git commit -m "Added screenshots"
git commit -m "Updated README"
git log --oneline
git tag v1.0
git remote add origin https://github.com/shettymalathib/docker-k8s-week2.git
git push -u origin main
git push origin v1.0
```

---

# Learning Outcomes

After completing this project, I learned how to:

- Build Docker images using a Dockerfile.
- Build and run containerized applications using Docker.
- Create Kubernetes Pods.
- Create Deployments for self-healing and scaling.
- Use kubectl to manage Kubernetes resources.
- Store project files in GitHub using Git.
- Use Git tags to mark project versions.
- Understand the difference between Pods and Deployments.
- Understand how Kubernetes automates application management.

---

# Conclusion

This project demonstrates the complete workflow of building Docker images, running containerized applications, deploying them on Kubernetes using Pods and Deployments, and managing the project with Git and GitHub. 

Through this assignment, I gained practical experience with containerization, orchestration, scaling, self-healing, and version control, which are fundamental skills in modern DevOps.