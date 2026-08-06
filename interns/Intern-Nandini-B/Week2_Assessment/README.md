##CareerByteCode DevOps Internship - Week 2 Assignment submitted By Nandini

#Project Overview

This repository contains my Week 2 assignment for the CareerByteCode DevOps Internship.

The assignment focuses on Docker and Kubernetes. I practiced Docker images, containers, Dockerfile, Docker Compose, Docker volumes, Docker networking, Kubernetes Pods, Deployments, Services, ConfigMaps, scaling, and Minikube deployment.

#Tools Used

Docker Docker Compose Kubernetes kubectl Minikube Git and GitHub Nginx

#Repository Structure week2-container-orchestration

Dockerfile application app.py requirements.txt k8s service.yaml deployment.yaml HPA.yaml secret.yaml refering_secret_in_deployment.yaml screenshots/ README.md answers.md

#Docker Commands Practiced docker --version docker build -t week2-web-app:latest . docker images docker run -d --name week2-web-container -p 3000:80 week2-web-app:latest docker ps docker logs week2-web-container docker inspect week2-web-container docker cp week2-web-container:/usr/share/nginx/html/index.html ./copied-index.html docker stop week2-web-container docker rm week2-web-container

Docker Volume Commands Practiced docker volume create week2-volume docker volume ls docker run -d --name volume-nginx -p 8080:80 -v week2-volume:/usr/share/nginx/html nginx docker inspect volume-nginx docker stop volume-nginx docker rm volume-nginx

Docker Compose Commands Practiced docker compose up -d docker compose ps docker ps docker compose down

#Kubernetes Commands Practiced minikube start --driver=docker minikube status kubectl get nodes kubectl apply -f deployment.yaml Docker Image Registry Link kubectl apply -f k8s/pod.yaml kubectl describe pod nginx-pod kubectl logs nginx-pod kubectl apply -f secrets.yaml kubectl apply -f HPA.yaml kubectl get pods kubectl get deployments kubectl get hpa kubectl scale deployment nginx-deployment --cpu-percent=70 --min=2 --max=5 minikube version minikube status kubectl version --client kubectl cluster-info

#Screenshots Included The screenshots folder contains proof of:

Application running on localhost Minikube cluster running Kubernetes Pod, Deployment, Service, secret and HPA Deployment scaled from 2 replicas to 5 replicas based on CPU metric using Horizontal pod Autoscaler(HAP)

#Learning Summary During Week 2, I learned how to containerize an application using Docker and deploy it using Kubernetes. I also practiced Dockerfile creation, Docker Compose, volumes, networking, Kubernetes manifests, Minikube deployment, scaling, and basic troubleshooting commands.
