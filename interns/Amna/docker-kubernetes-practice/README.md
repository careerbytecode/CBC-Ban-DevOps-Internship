# Week 2 Assignment: Docker and Kubernetes

This repository contains my **Week 2 DevOps Internship assignment**, focused on Docker, Kubernetes, Minikube, and basic Kubernetes monitoring concepts.

## Assignment Overview

During this assignment, I studied the fundamentals of containerization and learned how Docker and Kubernetes are used in a DevOps workflow. I also completed practical tasks using Docker commands, Kubernetes YAML manifests, Minikube, and `kubectl`.

## Topics Covered

### Docker

- Docker and its benefits in DevOps
- Containerization and traditional application deployment
- Virtual Machines compared with Docker containers
- Docker architecture
- Docker images and containers
- Dockerfile instructions
- Docker volumes
- Common and additional Docker commands

### Kubernetes

- Kubernetes and its benefits
- Kubernetes control plane and worker-node architecture
- Pods and YAML manifests
- Deployments
- Kubernetes Services:
  - ClusterIP
  - NodePort
  - LoadBalancer
- ConfigMaps and Secrets
- Advanced `kubectl` commands
- Minikube cluster setup
- Grafana for Kubernetes monitoring

## Repository Structure

```text
docker-kubernetes-practice/
├── Dockerfile
├── app.py
├── create-pod.yaml
├── README.md
└── Assignment-week2.pdf
```

## Dockerfile

The Dockerfile builds an image for a simple Python application.

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app.py .

CMD ["python", "app.py"]
```

## Python Application

Example `app.py`:

```python
print("Hello from a Docker container!")
```

## Docker Commands Used

Build the Docker image:

```bash
docker build -t python-docker-app .
```

List Docker images:

```bash
docker images
```

Run the container:

```bash
docker run --name python-container python-docker-app
```

List all containers:

```bash
docker ps -a
```

Stop and remove the container:

```bash
docker rm -f python-container
```

## Kubernetes Pod Manifest

The `create-pod.yaml` file creates an Nginx Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx-container
      image: nginx
      ports:
        - containerPort: 80
```

Apply the manifest:

```bash
kubectl apply -f create-pod.yaml
```

Check the Pod:

```bash
kubectl get pods
```

View detailed Pod information:

```bash
kubectl describe pod nginx-pod
```

Delete the Pod:

```bash
kubectl delete -f create-pod.yaml
```

## Minikube Commands Used

Start the cluster:

```bash
minikube start --driver=docker
```

Check the cluster status:

```bash
minikube status
```

View all nodes:

```bash
kubectl get nodes
```

View Pods in all namespaces:

```bash
kubectl get pods --all-namespaces
```

## Additional Commands Researched

### Docker

```bash
docker pause nginx-container
docker system df
docker top nginx-container
```

### Kubernetes

```bash
kubectl debug nginx-pod -it --image=busybox
kubectl auth can-i delete pods -n production
```


## Key Learning Outcomes

Through this assignment, I learned how to:

- Build and run a simple application using Docker
- Understand the difference between images and containers
- Write a basic Dockerfile
- Use Docker volumes and container-management commands
- Start and inspect a local Kubernetes cluster using Minikube
- Create and manage a Kubernetes Pod using YAML
- Understand Deployments, Services, ConfigMaps, and Secrets
- Use basic troubleshooting and permission-checking commands in Kubernetes
- Understand how Grafana helps monitor Kubernetes clusters

## Conclusion

This assignment helped me strengthen my understanding of Docker and Kubernetes fundamentals. It also gave me practical experience with containers, YAML manifests, Minikube, `kubectl`, and GitHub project documentation.
