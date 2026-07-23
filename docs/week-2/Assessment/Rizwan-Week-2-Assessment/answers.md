# CareerByteCode DevOps Internship - Week 2 Assignment

## Submitted By

Rizwan Siddiqui

---

## Q1. What is Docker? Explain why it is widely used in server and cloud environments.

Docker is an open-source containerization platform used to package an application with its dependencies, libraries, runtime, and configuration into a container.

It is widely used in server and cloud environments because it makes applications portable and consistent across different systems. The same container can run on a developer laptop, testing server, production server, or cloud platform without major environment issues.

Docker is lightweight, fast, easy to deploy, and works well with CI/CD pipelines and Kubernetes.

---

## Q2. Explain what containerization is and how it improves application portability across different environments.

Containerization is the process of packaging application code, dependencies, libraries, and runtime into a single container.

It improves portability because the container does not depend heavily on the host machine configuration. If Docker is installed, the same container can run on different environments like local machine, test server, production server, or cloud.

This solves the common issue: “it works on my machine but not on the server.”

---

## Q3. Explain the Docker architecture and how the daemon, client, images, and containers work together.

Docker architecture includes Docker Client, Docker Daemon, Images, Containers, and Registry.

Docker Client is used to run commands such as docker build, docker run, docker ps, and docker logs.

Docker Daemon runs in the background and performs the actual work like building images, running containers, managing networks, and managing volumes.

Docker Image is a read-only template used to create containers.

Docker Container is a running instance of an image.

Docker Registry, such as Docker Hub, is used to store and share Docker images.

Flow:

```text
Docker Client command
↓
Docker Daemon receives request
↓
Image is pulled or built
↓
Container is created and started
Q4. Write Docker commands to build, run, inspect, copy file, stop, and remove a container.

Build image:

docker build -t app:latest .

Run container with port mapping:

docker run -d --name app-container -p 3000:3000 app:latest

If the application runs on container port 80:

docker run -d --name app-container -p 3000:80 app:latest

Inspect container:

docker inspect app-container

Copy file from container to host:

docker cp app-container:/usr/share/nginx/html/index.html ./index.html

Stop and remove container:

docker stop app-container
docker rm app-container
Q5. Explain Dockerfile instructions FROM, RUN, EXPOSE, ENV, and ENTRYPOINT.
FROM

FROM defines the base image.

Example:

FROM nginx:latest
RUN

RUN executes commands during image build.

Example:

RUN apt update && apt install -y curl
EXPOSE

EXPOSE documents the port used by the container application.

Example:

EXPOSE 80
ENV

ENV sets environment variables inside the container.

Example:

ENV APP_ENV=production
ENTRYPOINT

ENTRYPOINT defines the main command that runs when the container starts.

Example:

ENTRYPOINT ["nginx"]
Q6. What is a Docker Volume? Write commands to create and attach a named volume.

A Docker Volume is used to store persistent data outside the container lifecycle. Even if the container is deleted, the volume data can remain available.

Create a named volume:

docker volume create week2-volume

List volumes:

docker volume ls

Attach volume to container:

docker run -d --name volume-nginx -p 8080:80 -v week2-volume:/usr/share/nginx/html nginx

Inspect volume:

docker volume inspect week2-volume
Q7. Explain Docker network types and use cases.

Docker provides different network types.

Bridge Network

Bridge is the default network for containers on the same Docker host.

Use case: Web app and database running on the same server.

Host Network

Host network allows the container to use the host machine network directly.

Use case: High-performance networking where isolation is less important.

None Network

None network disables networking for the container.

Use case: Isolated workloads or security testing.

Overlay Network

Overlay network is used for communication between containers running on multiple Docker hosts.

Use case: Docker Swarm or multi-host container communication.

Custom Bridge Network

Custom bridge networks allow containers to communicate using container names.

Example:

docker network create app-network
docker run -d --name web --network app-network nginx
Q8. Write a docker-compose.yml file that runs a web application with a database and explain it.
version: "3.8"

services:
  web:
    build: .
    container_name: week2-web-app
    ports:
      - "3000:80"
    depends_on:
      - database

  database:
    image: mysql:8.0
    container_name: week2-mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: week2db
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:

Explanation:

The web service builds the Docker image from the Dockerfile in the current directory and maps host port 3000 to container port 80.

The database service uses MySQL 8.0 image. Environment variables are used to set the root password and database name.

The mysql_data volume stores database data persistently.

depends_on starts the database container before the web container.

Q9. Research three Docker troubleshooting scenarios and explain solutions.
Scenario 1: Container exits immediately

Check stopped containers:

docker ps -a

Check logs:

docker logs <container-name>

Possible causes are wrong CMD, application crash, missing files, or incorrect startup command.

Scenario 2: Port already allocated

Error:

Bind for 0.0.0.0:8080 failed: port is already allocated

Solution:

Use another port:

docker run -d -p 8081:80 nginx

Or stop the container using that port:

docker ps
docker stop <container-id>
Scenario 3: Containers cannot communicate

Check networks:

docker network ls
docker network inspect <network-name>

Create custom network:

docker network create app-network

Run containers in same network:

docker run -d --name web --network app-network nginx
docker run -d --name db --network app-network mysql:8.0
Q10. What is Kubernetes and why is it needed for managing containers at scale?

Kubernetes is an open-source container orchestration platform used to deploy, manage, scale, and monitor containerized applications.

Docker runs containers, but in production there can be many containers, nodes, replicas, failures, updates, and scaling requirements.

Kubernetes helps manage containers at scale by providing self-healing, load balancing, scaling, rolling updates, rollback, and service discovery.

Q11. Explain Kubernetes Control Plane components.
API Server

API Server is the main entry point of Kubernetes. All kubectl commands and API requests go through the API Server.

etcd

etcd is the key-value database of Kubernetes. It stores cluster state and configuration.

Scheduler

Scheduler decides on which node a Pod should run based on available resources.

Controller Manager

Controller Manager checks the desired state and actual state of the cluster. If something is missing, it takes action to bring the cluster back to the desired state.

Q12. Write a Pod manifest for nginx and commands to create, describe, and view logs.

Pod manifest:

apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: week2-web
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80

Create Pod:

kubectl apply -f k8s/pod.yaml

Describe Pod:

kubectl describe pod nginx-pod

View logs:

kubectl logs nginx-pod
Q13. Write a Deployment manifest with 3 replicas and command to scale to 5 replicas.

Deployment manifest:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: week2-web-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: week2-web
  template:
    metadata:
      labels:
        app: week2-web
    spec:
      containers:
      - name: week2-web-container
        image: nginx:latest
        ports:
        - containerPort: 80

Create Deployment:

kubectl apply -f k8s/deployment.yaml

Scale to 5 replicas:

kubectl scale deployment week2-web-deployment --replicas=5

Check:

kubectl get deployments
kubectl get pods
Q14. Explain ClusterIP, NodePort, and LoadBalancer Services.
ClusterIP

ClusterIP exposes the application only inside the Kubernetes cluster.

Use case: Internal backend service or database service.

NodePort

NodePort exposes the application on a port of each node.

Use case: Local testing using Minikube.

LoadBalancer

LoadBalancer creates an external cloud load balancer and public IP.

Use case: Production applications running on cloud platforms like Azure AKS.

Q15. Explain ConfigMaps and how they are consumed inside a Pod.

ConfigMap is used to store non-sensitive configuration data separately from application code.

Example ConfigMap:

apiVersion: v1
kind: ConfigMap
metadata:
  name: week2-config
data:
  APP_ENV: "development"
  APP_NAME: "CareerByteCode Week 2 DevOps App"

Consume ConfigMap as environment variable:

env:
- name: APP_ENV
  valueFrom:
    configMapKeyRef:
      name: week2-config
      key: APP_ENV

This helps update configuration without rebuilding the Docker image.

Q16. What is StatefulSet and why is it required for databases?

StatefulSet is a Kubernetes workload object used for stateful applications.

It provides stable network identity, stable storage, and ordered deployment or scaling.

StatefulSet is useful for databases because databases need persistent storage and stable identity.

Examples include MySQL, PostgreSQL, MongoDB, Redis, and Kafka.

Q17. Explain Horizontal Pod Autoscaler.

Horizontal Pod Autoscaler automatically scales the number of Pod replicas based on metrics like CPU or memory usage.

If CPU usage increases above the target, HPA increases replicas. If load reduces, HPA decreases replicas.

Example command:

kubectl autoscale deployment week2-web-deployment --cpu-percent=50 --min=2 --max=10

Check HPA:

kubectl get hpa
Q18. Set up Minikube, deploy Deployment, expose with Service, and access the app.

Start Minikube:

minikube start --driver=docker

Check node:

kubectl get nodes

Apply ConfigMap:

kubectl apply -f k8s/configmap.yaml

Apply Deployment:

kubectl apply -f k8s/deployment.yaml

Apply Service:

kubectl apply -f k8s/service.yaml

Check resources:

kubectl get pods
kubectl get deployments
kubectl get svc

Access application:

minikube service week2-web-service

Screenshots are attached in the screenshots folder.

Q19. Research three kubectl commands not covered during training.
kubectl rollout status

Checks rollout status of a deployment.

kubectl rollout status deployment/week2-web-deployment
kubectl rollout undo

Rolls back a deployment to the previous version.

kubectl rollout undo deployment/week2-web-deployment
kubectl top pods

Shows CPU and memory usage of Pods.

kubectl top pods

Note: Metrics Server should be enabled for kubectl top command.

Q20. Create GitHub repository week2-devops-k8s and upload required files.

Repository name:

week2-devops-k8s

Files uploaded:

Dockerfile
docker-compose.yml
README.md
answers.md
k8s/pod.yaml
k8s/deployment.yaml
k8s/service.yaml
k8s/configmap.yaml
screenshots/

Git commands used:

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/RizwanSid7/week2-devops-k8s.git
git branch -M main
git push -u origin main

Docker image registry link:

https://hub.docker.com/r/<dockerhub-username>/week2-web-app
Q21. Self-Speech Video

The Week 2 self-speech video was recorded separately.

It covers:

Introduction
Week 2 learning experience
Docker concepts
Kubernetes concepts
Topic I enjoyed
Topic I found difficult
Additional concept explored
Upcoming learning goals

