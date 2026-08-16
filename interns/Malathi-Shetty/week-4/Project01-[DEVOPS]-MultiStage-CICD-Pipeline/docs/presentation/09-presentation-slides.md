# Presentation Slides

## FlavorForge Azure DevSecOps Capstone Project

---

# Purpose

This document defines the recommended presentation structure for demonstrating the FlavorForge Azure DevSecOps Capstone Project.

The presentation follows a storytelling approach:

> Problem → Solution → Implementation → Automation → Security → Operations → Recovery

The objective is to demonstrate not only the technologies used, but how they work together to deliver a production-oriented cloud-native application.

---

# Slide 1 — Title

## Title

**FlavorForge Azure DevSecOps Capstone Project**

## Subtitle

A Full-Stack Cloud-Native Application Using Azure, Kubernetes, CI/CD, Security, and GitOps

---

## Objective

Introduce the project and presentation scope.

---

## Key Points

- Full-stack React + Node.js application.
- Containerized using Docker.
- Deployed on Azure Kubernetes Service.
- Automated using Azure DevOps.
- Secured using DevSecOps practices.
- Managed using GitOps with Argo CD.

---

## Visuals

![Enterprise Cloud Architecture](/docs/diagrams/flavorforge-enterprise-cloud-architecture.png)

---

# Slide 2 — Business Problem

## Title

**Why DevOps Automation is Required**

---

## Objective

Explain the real-world challenges addressed by the project.

---

## Key Points

Traditional deployment challenges:

- Manual deployment processes.
- Environment inconsistencies.
- Security checks performed late.
- Difficult application scaling.
- Limited operational visibility.

---

## Message

Modern applications require reliable delivery pipelines, automated infrastructure, and continuous security validation.

---

# Slide 3 — Solution Overview

## Title

**FlavorForge DevSecOps Solution**

---

## Objective

Explain the complete solution at a high level.

---

## Workflow

```text
Developer Code Change

        ↓

Azure DevOps Pipeline

        ↓

Testing & Quality Validation

        ↓

Security Scanning

        ↓

Docker Image Creation

        ↓

Azure Container Registry

        ↓

AKS Deployment

        ↓

Argo CD Synchronization

        ↓

Running Application
```

---

## Visual

![DevSecOps Lifecycle](/docs/diagrams/flavorforge-devsecops-lifecycle-infographic.png)

---

# Slide 4 — Application Architecture

## Title

**Application Architecture**

---

## Objective

Explain frontend and backend design.

---

## Components

### Frontend

Technology:

- React
- Vite
- NGINX

Responsibilities:

- User interface.
- Recipe browsing.
- User interaction.

---

### Backend

Technology:

- Node.js
- Express

Responsibilities:

- REST APIs.
- Business logic.
- Health endpoints.

---

## Visual

![Application Architecture](/docs/diagrams/flavorforge-application-architecture.png)

---

# Slide 5 — Docker Containerization

## Title

**Application Containerization**

---

## Objective

Explain how applications are packaged.

---

## Key Points

Frontend:

- Built using Node.js builder stage.
- Served using NGINX.

Backend:

- Node.js container.
- API runtime environment.

Benefits:

- Portable deployments.
- Consistent environments.
- Easy scaling.

---

## Visual

![Docker Images](/screenshots/docker/4-docker-images.png)

---

# Slide 6 — Azure Cloud Infrastructure

## Title

**Microsoft Azure Infrastructure**

---

## Objective

Explain cloud resources used.

---

## Azure Services

| Service | Purpose |
|---|---|
| Resource Group | Organizes Azure resources |
| Azure Container Registry | Stores Docker images |
| AKS | Runs Kubernetes workloads |
| Load Balancer | Provides external access |
| Azure DevOps | Automates delivery |

---

## Visual

![Azure Resource Group](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

---

# Slide 7 — Kubernetes Deployment

## Title

**Running Applications on AKS**

---

## Objective

Explain production deployment.

---

## Kubernetes Components

- Namespace
- Deployments
- Pods
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

---

## Deployment Flow

```text
Docker Images

      ↓

AKS Cluster

      ↓

Kubernetes Deployment

      ↓

Running Pods

      ↓

Application Access
```

---

## Visual

![Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

---

# Slide 8 — CI/CD Pipeline

## Title

**Azure DevOps Continuous Delivery Pipeline**

---

## Objective

Explain automated software delivery.

---

## Pipeline Stages

1. Source Checkout
2. Build Application
3. Run Tests
4. SonarCloud Analysis
5. Docker Build
6. Trivy Security Scan
7. Push Images to ACR
8. Deploy to AKS

---

## Visual

![Pipeline Execution](/screenshots/pipeline/6-pipelines-run.png)

---

# Slide 9 — Security Implementation

## Title

**DevSecOps Security Integration**

---

## Objective

Explain security automation.

---

## Security Controls

### SonarCloud

- Code quality analysis.
- Code smells.
- Maintainability checks.

### Trivy

- Container vulnerability scanning.

### Kubernetes

- Secrets management.
- Secure configuration.

---

# Slide 10 — GitOps with Argo CD

## Title

**GitOps Deployment Model**

---

## Objective

Explain automated Kubernetes management.

---

## Key Points

- Git repository acts as source of truth.
- Argo CD monitors manifests.
- Automatic synchronization.
- Drift detection.
- Self-healing.

---

## Visual

![Argo CD Application](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

---

# Slide 11 — Incident Recovery Demonstration

## Title

**Production Failure Simulation and Recovery**

---

## Objective

Demonstrate operational maturity.

---

## Example Incident

Pod failure simulation:

```bash
kubectl delete pod <pod-name> -n flavorforge
```

Expected behavior:

- Kubernetes detects failure.
- Replacement Pod is created automatically.
- Application remains available.

---

## Learning

Production systems must detect and recover from failures automatically.

---

# Slide 12 — Final Summary

## Title

**From Code Commit to Production**

---

## Objective

Close the presentation with the complete journey.

---

## Final Message

FlavorForge demonstrates:

- Full-stack development.
- Containerization.
- Cloud deployment.
- Kubernetes orchestration.
- CI/CD automation.
- Security integration.
- GitOps operations.
- Production troubleshooting.

---

## Closing Statement

"FlavorForge represents the complete DevSecOps lifecycle where application development, automation, security, deployment, and operations work together as one engineering workflow."

---

# Presentation Timing Guide

| Section | Duration |
|---|---:|
| Introduction | 2 minutes |
| Problem & Solution | 5 minutes |
| Architecture | 5 minutes |
| Application Demo | 5 minutes |
| CI/CD Pipeline | 5 minutes |
| Security & GitOps | 5 minutes |
| Incident Recovery | 3 minutes |
| Conclusion | 2 minutes |

Total Recommended Duration:

**25–30 minutes**

---

# Presenter Reminder

Do not present FlavorForge as a list of tools.

Present it as a complete engineering journey:

> "A business problem was converted into a cloud-native application, automated delivery pipeline, secure deployment process, and operationally reliable platform."