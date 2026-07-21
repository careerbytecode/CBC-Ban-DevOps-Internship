# CareerByteCode DevOps Internship - Week 2 Assignment

## Submitted By

Rizwan Siddiqui

## Project Overview

This repository contains my Week 2 assignment for the CareerByteCode DevOps Internship.

The assignment focuses on Docker and Kubernetes. I practiced Docker images, containers, Dockerfile, Docker Compose, Docker volumes, Docker networking, Kubernetes Pods, Deployments, Services, ConfigMaps, scaling, and Minikube deployment.

## Tools Used

- Docker
- Docker Compose
- Kubernetes
- kubectl
- Minikube
- Git and GitHub
- Nginx

## Repository Structure

week2-devops-k8s/
- app/index.html
- Dockerfile
- docker-compose.yml
- k8s/pod.yaml
- k8s/deployment.yaml
- k8s/service.yaml
- k8s/configmap.yaml
- screenshots/
- README.md
- answers.md

## Docker Commands Practiced

docker --version  
docker build -t week2-web-app:latest .  
docker images  
docker run -d --name week2-web-container -p 3000:80 week2-web-app:latest  
docker ps  
docker logs week2-web-container  
docker inspect week2-web-container  
docker cp week2-web-container:/usr/share/nginx/html/index.html ./copied-index.html  
docker stop week2-web-container  
docker rm week2-web-container  

## Docker Volume Commands Practiced

docker volume create week2-volume  
docker volume ls  
docker run -d --name volume-nginx -p 8080:80 -v week2-volume:/usr/share/nginx/html nginx  
docker inspect volume-nginx  
docker stop volume-nginx  
docker rm volume-nginx  

## Docker Compose Commands Practiced

docker compose up -d  
docker compose ps  
docker ps  
docker compose down  

## Kubernetes Commands Practiced

minikube start --driver=docker  
minikube status  
kubectl get nodes  
kubectl apply -f k8s/configmap.yaml  Docker Image Registry Link
kubectl apply -f k8s/pod.yaml  
kubectl describe pod nginx-pod  
kubectl logs nginx-pod  
kubectl apply -f k8s/deployment.yaml  
kubectl apply -f k8s/service.yaml  
kubectl get pods  
kubectl get deployments  
kubectl get svc  
kubectl scale deployment week2-web-deployment --replicas=5  
minikube service week2-web-service  

## Docker Image Registry Link

Docker Hub Image:  
https://hub.docker.com/r/rizwan268/week2-web-app		

## Screenshots Included

The screenshots folder contains proof of:

- Project folder creation
- Dockerfile creation
- Docker image build
- Docker container running
- Application running on localhost
- Docker logs and inspect output
- Docker volume practical
- Docker Compose practical
- Minikube cluster running
- Kubernetes Pod, Deployment, Service, and ConfigMap
- Deployment scaled from 3 replicas to 5 replicas
- Application accessed using Minikube Service

## Learning Summary

During Week 2, I learned how to containerize an application using Docker and deploy it using Kubernetes. I also practiced Dockerfile creation, Docker Compose, volumes, networking, Kubernetes manifests, Minikube deployment, scaling, and basic troubleshooting commands.
