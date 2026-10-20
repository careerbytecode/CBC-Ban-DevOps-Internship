# Demo Day Guide

## Purpose

This document provides a structured agenda for demonstrating the FlavorForge Azure DevSecOps Capstone Project during internship evaluations, technical reviews, and DevOps interviews.

The objective is to present the project in a logical sequence, beginning with the business problem and concluding with operational capabilities such as GitOps, monitoring, and incident recovery.

Following this guide ensures that the demonstration remains organized, focused, and within the allocated time.

---

## Target Audience

This demonstration is suitable for:

- CBC Internship Reviewers
- DevOps Interviewers
- Cloud Engineers
- Platform Engineers
- Technical Mentors
- Software Engineering Teams

---

## Demonstration Goals

By the end of the presentation, the audience should understand:

- The business problem solved by FlavorForge.
- The overall application architecture.
- The Azure cloud infrastructure.
- The CI/CD pipeline implemented using Azure DevOps.
- Security and quality validation using SonarCloud and Trivy.
- GitOps deployment using Argo CD.
- Kubernetes deployment and scalability.
- Operational readiness through self-healing and incident recovery.

---

# Recommended Demonstration Timeline

| Section | Duration |
|----------|---------:|
| Introduction | 2 minutes |
| Business Problem | 2 minutes |
| Solution Overview | 2 minutes |
| Application Demonstration | 4 minutes |
| Architecture Walkthrough | 3 minutes |
| Docker & Containerization | 2 minutes |
| Azure Infrastructure | 3 minutes |
| Kubernetes Deployment | 4 minutes |
| Azure DevOps Pipeline | 4 minutes |
| Security & Code Quality | 2 minutes |
| GitOps with Argo CD | 3 minutes |
| Incident Demonstration | 4 minutes |
| Questions & Discussion | 5 minutes |

**Total Duration:** Approximately **35–40 minutes**

---

# Presentation Flow

The recommended flow is shown below.

```text
Welcome
    │
    ▼
Business Problem
    │
    ▼
Solution Overview
    │
    ▼
Application Demo
    │
    ▼
Architecture
    │
    ▼
Docker
    │
    ▼
Azure
    │
    ▼
AKS
    │
    ▼
Azure DevOps
    │
    ▼
Security
    │
    ▼
Argo CD
    │
    ▼
Incident Demo
    │
    ▼
Conclusion
    │
    ▼
Questions
```

Following this sequence helps the audience understand not only **what** was built, but also **how** the solution was designed, deployed, secured, and operated.

---

## Demo Environment

Before beginning the demonstration, verify that:

- Azure resources are healthy.
- AKS cluster is running.
- Kubernetes workloads are healthy.
- Azure DevOps pipeline completed successfully.
- Argo CD reports a **Healthy** and **Synced** application.
- Frontend and backend applications are accessible.

---

### Evidence

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

*Figure 3.1 – AKS cluster ready for demonstration.*

![Azure DevOps Pipeline](/screenshots/pipeline/6-pipelines-run.png)

*Figure 3.2 – Latest Azure DevOps pipeline completed successfully.*

---

## Next Section

The following sections describe each stage of the live demonstration in detail, including the objective, key talking points, demonstration steps, and supporting evidence.

---

# 1. Project Introduction

**Duration:** 2 Minutes

## Objective

Introduce the project, its purpose, and the technologies used before moving into the technical implementation.

## Talking Points

- Introduce yourself.
- Introduce the FlavorForge project.
- Briefly explain the business problem.
- Mention that the project demonstrates a complete Azure DevSecOps workflow.
- Give the audience an overview of what will be covered during the presentation.

### Suggested Introduction

> Hello everyone. Today I will be presenting my Azure DevSecOps Capstone Project, **FlavorForge**.
>
> FlavorForge is a cloud-native recipe management application built to demonstrate how a modern application can be developed, containerized, secured, deployed, and managed using Azure DevOps, Docker, Kubernetes, and GitOps.
>
> During this demonstration, I will walk through the complete software delivery lifecycle—from application development to automated deployment, security validation, Kubernetes orchestration, and operational management.

---

# 2. Business Problem

**Duration:** 2 Minutes

## Objective

Explain why this project exists before discussing the technical implementation.

## Talking Points

- Traditional deployments are often manual and error-prone.
- Different environments may behave inconsistently.
- Rollbacks can be difficult.
- Teams require automation, repeatability, and reliable deployments.
- Modern DevOps practices help solve these challenges.

### Key Message

FlavorForge demonstrates how modern DevSecOps practices enable reliable, secure, and repeatable application delivery.

---

# 3. Solution Overview

**Duration:** 2 Minutes

## Objective

Provide a high-level overview of the complete solution before diving into individual components.

### Explain the Overall Architecture

The project includes:

- React frontend
- Node.js backend
- Docker containers
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Azure DevOps CI/CD Pipeline
- SonarCloud
- Trivy
- Argo CD GitOps
- Kubernetes ConfigMaps, Secrets, and HPA

### Evidence

![Enterprise Cloud Architecture](/docs/diagrams/flavorforge-enterprise-cloud-architecture.png)

*Figure 3.3 – High-level architecture of the FlavorForge platform.*

---

# 4. Live Application Demonstration

**Duration:** 4 Minutes

## Objective

Show that the application is functional before explaining how it was built and deployed.

## Demonstration Steps

### Step 1 – Open the Application

Open the deployed FlavorForge application in a browser.

Demonstrate:

- Home page
- Navigation
- Recipe listing
- Search functionality
- Category filtering
- Responsive design

### Step 2 – Backend Health Check

Open the backend health endpoint.

```text
http://<INGRESS-IP>/api/health
```

Explain that this endpoint confirms the backend service is healthy and responding correctly.

### Step 3 – Recipes API

Open:

```text
http://<INGRESS-IP>/api/recipes
```

Explain how the frontend retrieves recipe data from the backend API.

### Evidence

![Frontend Application](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

*Figure 3.4 – FlavorForge application running successfully.*

![Backend Health](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

*Figure 3.5 – Backend health endpoint responding successfully.*

---

## Next Section

Next, explain how the application is packaged into Docker containers and deployed to Azure Kubernetes Service (AKS).

---

# 5. Docker and Containerization

**Duration:** 2 Minutes

## Objective

Explain how the application is packaged into portable and consistent containers before deployment.

## Talking Points

- The frontend and backend are containerized using separate Dockerfiles.
- Multi-stage Docker builds are used to optimize image size.
- Docker ensures consistency across development, testing, and production environments.
- The same container image is deployed across all environments without modification.

### Demonstration

Show:

- Backend Dockerfile
- Frontend Dockerfile
- Local Docker images

Run:

```bash
docker images
```

Explain that the generated images are pushed to Azure Container Registry (ACR) and later deployed to Azure Kubernetes Service (AKS).

### Evidence

![Docker Images](/screenshots/azure/07-docker-images.png)

*Figure 3.6 – Docker images built successfully.*

---

# 6. Azure Infrastructure

**Duration:** 3 Minutes

## Objective

Explain the cloud infrastructure used to host the application.

## Talking Points

Introduce the Azure resources created for the project:

- Resource Group
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Public IP Address
- Load Balancer

Explain that these services work together to provide a scalable and reliable hosting platform for the application.

### Evidence

![Azure Resource Group](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 3.7 – Azure Resource Group.*

![AKS Cluster](/screenshots/azure/27-aks-cluster-running.png)

*Figure 3.8 – Azure Kubernetes Service (AKS) cluster.*

---

# 7. Kubernetes Deployment

**Duration:** 4 Minutes

## Objective

Demonstrate how Kubernetes manages and orchestrates the application.

## Talking Points

Explain the purpose of:

- Namespace
- Deployments
- ReplicaSets
- Pods
- Services
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler (HPA)
- Ingress Controller

### Live Demonstration

Run:

```bash
kubectl get all -n flavorforge
```

Next, verify the ingress:

```bash
kubectl get ingress -n flavorforge
```

Explain:

- Multiple pod replicas improve availability.
- Services provide internal communication.
- Ingress exposes the application externally.
- Kubernetes automatically replaces failed pods.

### Evidence

![Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

*Figure 3.9 – Kubernetes resources running successfully.*

![Ingress](/screenshots/azure/22-Services%20%26%20Ingress.png)

*Figure 3.10 – Kubernetes Service and Ingress configuration.*

---

# 8. Azure DevOps CI/CD Pipeline

**Duration:** 4 Minutes

## Objective

Demonstrate how code changes are automatically built, tested, scanned, and deployed.

## Pipeline Stages

Explain the pipeline flow:

```text
Source Code
      │
      ▼
Build
      │
      ▼
Unit Tests
      │
      ▼
SonarCloud Analysis
      │
      ▼
Docker Build
      │
      ▼
Push Images to ACR
      │
      ▼
Deploy to AKS
      │
      ▼
GitOps Synchronization
```

### Talking Points

Highlight that the pipeline:

- Builds the application.
- Executes automated tests.
- Performs code quality analysis.
- Builds Docker images.
- Pushes images to Azure Container Registry.
- Deploys the application to Kubernetes.
- Supports repeatable and reliable releases.

### Evidence

![Pipeline Execution](/screenshots/pipeline/6-pipelines-run.png)

*Figure 3.11 – Successful Azure DevOps pipeline execution.*

---

## Transition

Now that the application has been deployed automatically, the next step is to demonstrate how code quality, security scanning, and GitOps ensure the deployment remains reliable and production-ready.

---

# 9. Code Quality and Security

**Duration:** 3 Minutes

## Objective

Demonstrate how code quality and security checks are integrated into the CI/CD pipeline.

## SonarCloud Analysis

Explain that every pipeline execution performs automated code quality analysis.

Highlight the following:

- Static code analysis
- Code quality checks
- Maintainability
- Reliability
- Test coverage
- Quality Gate validation

### Evidence

![Code Coverage](/screenshots/enterprise-azure-devops-release-simulation/16-code-coverage.png)

*Figure 3.12 – SonarCloud code quality and coverage results.*

---

## Trivy Security Scanning

Explain that Trivy scans the Docker images before deployment.

Mention that it helps identify:

- Operating system vulnerabilities
- Package vulnerabilities
- Security risks
- Misconfigurations

Explain that security validation is integrated into the CI/CD pipeline to support secure software delivery.

---

# 10. GitOps with Argo CD

**Duration:** 3 Minutes

## Objective

Demonstrate how GitOps keeps the Kubernetes cluster synchronized with the Git repository.

## Talking Points

Explain that:

- Git is the single source of truth.
- Argo CD continuously monitors the repository.
- Any approved change is automatically synchronized.
- Drift between Git and the cluster is detected.
- Applications can automatically recover to the desired state.

### Live Verification

Run:

```bash
kubectl get applications -n argocd
```

Explain the meaning of:

- **Synced** – The cluster matches the Git repository.
- **Healthy** – The application is running correctly.

### Evidence

![Argo CD](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 3.13 – Argo CD reporting a Healthy and Synced application.*

---

# 11. Incident Demonstration

**Duration:** 4 Minutes

## Objective

Show how Kubernetes and GitOps improve operational reliability by recovering from common failures.

## Demonstration Options

Choose one safe scenario during the presentation.

### Scenario 1 – Delete a Pod

```bash
kubectl delete pod <pod-name> -n flavorforge
```

Explain that Kubernetes automatically creates a replacement pod to maintain the desired state.

---

### Scenario 2 – GitOps Drift

Scale the backend deployment manually.

```bash
kubectl scale deployment backend \
--replicas=1 \
-n flavorforge
```

Explain that Argo CD detects the configuration drift and restores the deployment according to the Git repository.

---

### Learning Outcome

These demonstrations show that the platform is designed to be resilient and capable of recovering from common operational issues with minimal manual intervention.

---

# 12. Project Summary

**Duration:** 2 Minutes

## Key Achievements

Summarize the project by highlighting the technologies and practices implemented.

- Full-stack React and Node.js application
- Docker containerization
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Kubernetes Deployments, Services, Ingress, ConfigMaps, Secrets, and HPA
- Azure DevOps CI/CD Pipeline
- SonarCloud code quality analysis
- Trivy container security scanning
- GitOps deployment with Argo CD
- Production-oriented documentation and operational runbooks

---

## Final Message

Conclude by emphasizing that FlavorForge demonstrates the complete lifecycle of a modern cloud-native application—from development and containerization to automated deployment, security validation, GitOps, Kubernetes orchestration, and operational management.

The project reflects real-world DevSecOps practices and provides a practical foundation for building, deploying, and operating applications on Microsoft Azure.

---

# Questions and Discussion

Invite questions from the audience and use the project artifacts, diagrams, pipeline, and live environment to support your answers.

---

## Related Documents

- [Presentation Script](3-presentation-script.md)
- [Live Demo Flow](4-live-demo-flow.md)
- [Incident Scenarios](5-incident-scenarios.md)
- [Interviewer Questions](6-interviewer-questions.md)

---

## Next Step

Continue with **[03-presentation-script.md](3-presentation-script.md)** for a complete speaker script that can be used during live presentations, internship evaluations, and DevOps interviews.