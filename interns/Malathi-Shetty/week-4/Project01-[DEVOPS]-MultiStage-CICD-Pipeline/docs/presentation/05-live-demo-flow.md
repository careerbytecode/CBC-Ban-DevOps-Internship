# Live Demo Flow

## Purpose

This document provides a step-by-step guide for demonstrating the FlavorForge Azure DevSecOps Capstone Project during technical presentations, internship evaluations, and DevOps interviews.

The demo follows the same journey as a modern software delivery lifecycle—from verifying the environment to demonstrating the application, CI/CD pipeline, Kubernetes deployment, GitOps, and operational resilience.

---

## Demo Information

| Item | Details |
|------|---------|
| Estimated Duration | 20–30 Minutes |
| Demo Type | Live Technical Demonstration |
| Audience | CBC Reviewers, DevOps Interviewers, Senior Engineers |
| Environment | Microsoft Azure |
| Kubernetes Platform | Azure Kubernetes Service (AKS) |
| CI/CD Platform | Azure DevOps |
| GitOps Platform | Argo CD |

---

# Demo Flow Overview

```text
Environment Verification
        │
        ▼
Application Demo
        │
        ▼
Backend API Verification
        │
        ▼
Docker Overview
        │
        ▼
Azure Infrastructure
        │
        ▼
AKS Cluster
        │
        ▼
Kubernetes Resources
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
Code Quality & Security
        │
        ▼
GitOps with Argo CD
        │
        ▼
Incident Demonstration
        │
        ▼
Project Summary
```

---

# Step 1 – Verify Azure Environment

## Objective

Confirm that the demonstration environment is connected to the correct Azure subscription.

### Command

```bash
az account show
```

### Expected Result

Verify:

- Subscription Name
- Subscription ID
- Tenant ID

### Evidence

![Azure Account](/screenshots/enterprise-azure-devops-release-simulation/19-az-account-show.png)

*Figure 4.1 – Azure account verification.*

---

# Step 2 – Verify AKS Cluster

## Objective

Confirm that the Azure Kubernetes Service cluster is healthy.

### Command

```bash
kubectl get nodes
```

### Expected Result

- All nodes should be in the **Ready** state.

### Evidence

![AKS Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

*Figure 4.2 – AKS worker nodes are ready.*

---

# Step 3 – Verify Kubernetes Resources

## Objective

Confirm that all application resources are running successfully.

### Command

```bash
kubectl get all -n flavorforge
```

### Expected Result

Verify that:

- Deployments are available.
- Pods are running.
- Services are created.
- ReplicaSets are healthy.

### Evidence

![Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

*Figure 4.3 – FlavorForge resources running inside the Kubernetes cluster.*

---

# Step 4 – Verify Application

## Objective

Demonstrate that the frontend application is accessible.

### Action

Open the application URL in the browser.

Walk through:

- Home page
- Recipe listing
- Search functionality
- Category filtering
- Responsive user interface

### Evidence

![FlavorForge Home Page](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

*Figure 4.4 – FlavorForge frontend running successfully.*

---

# Step 5 – Verify Backend API

## Objective

Confirm that the backend service is running and responding correctly.

### Command

```bash
curl http://<APPLICATION-IP>/api/health
```

> Replace `<APPLICATION-IP>` with the public IP or DNS name of your application.

### Expected Result

The API should return a successful health response similar to:

```json
{
  "status": "UP",
  "service": "FlavorForge Backend",
  "version": "1.3"
}
```

### Talking Points

Explain that this endpoint is used for:

- Application health verification
- Kubernetes readiness checks
- Monitoring
- Troubleshooting

### Evidence

![Backend Health](/screenshots/backend/curl.png)

*Figure 4.5 – Backend health endpoint responding successfully.*

---

# Step 6 – Explain Docker Containers

## Objective

Explain how the application is packaged before deployment.

### Talking Points

Explain that:

- Frontend and Backend are packaged separately.
- Docker ensures consistent execution across environments.
- Images are built automatically during the CI/CD pipeline.
- Containers eliminate "It works on my machine" issues.

### Evidence

![Docker Containers](/screenshots/docker/10-frontend-backend-container-running.png)

*Figure 4.6 – Frontend and Backend running as Docker containers.*

---

# Step 7 – Verify Azure Container Registry (ACR)

## Objective

Demonstrate where the container images are stored.

### Action

Open Azure Portal.

Navigate to:

```
Azure Portal
    ↓
Container Registry
    ↓
Repositories
```

Show:

- Backend Image
- Frontend Image
- Latest Tags

### Talking Points

Explain that:

- The pipeline pushes images automatically.
- AKS pulls images directly from ACR.
- ACR acts as the trusted image repository.

### Evidence

![Azure Container Registry](/screenshots/azure/25-acr-images.png)

*Figure 4.7 – Container images stored in Azure Container Registry.*

---

# Step 8 – Explain Azure Kubernetes Service (AKS)

## Objective

Explain where the application is running.

### Action

Open:

Azure Portal → Kubernetes Services

Explain:

- Managed Kubernetes
- Worker Nodes
- Deployments
- Networking
- Load Balancer

### Evidence

![AKS Cluster](/screenshots/azure/27-aks-cluster-running.png)

*Figure 4.8 – Azure Kubernetes Service cluster.*

---

# Step 9 – Demonstrate Azure DevOps Pipeline

## Objective

Show how application delivery is fully automated.

### Action

Open Azure DevOps Pipelines.

Walk through the completed pipeline.

Explain each stage:

1. Build
2. Test
3. SonarCloud Analysis
4. Docker Build
5. Trivy Scan
6. Push to ACR
7. Deploy to AKS

### Talking Points

Highlight that:

- Every deployment follows the same workflow.
- Automation reduces manual errors.
- Quality and security checks happen before deployment.

### Evidence

![Azure DevOps Pipeline](/screenshots/pipeline/6-pipelines-run.png)

*Figure 4.9 – Successful Azure DevOps pipeline execution.*

---

# Step 10 – Demonstrate Code Quality

## Objective

Show how code quality is verified before deployment.

### Talking Points

Explain that SonarCloud checks:

- Code smells
- Bugs
- Maintainability
- Reliability
- Test coverage

Quality Gates help prevent low-quality code from progressing through the pipeline.

### Evidence

![Code Coverage](/screenshots/enterprise-azure-devops-release-simulation/16-code-coverage.png)

*Figure 4.10 – SonarCloud quality analysis.*

---

# Step 11 – Demonstrate GitOps

## Objective

Show that Git is the single source of truth.

### Command

```bash
kubectl get applications -n argocd
```

### Expected Result

The application should display:

- Healthy
- Synced

### Talking Points

Explain that:

- Argo CD continuously watches the Git repository.
- Any approved change is synchronized automatically.
- Configuration drift is detected and corrected.

### Evidence

![Argo CD](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 4.11 – Argo CD application status.*

---

# Step 12 – Demonstrate Kubernetes Self-Healing

## Objective

Show how Kubernetes automatically recovers from failures.

### Command

```bash
kubectl get pods -n flavorforge

kubectl delete pod <backend-pod-name> -n flavorforge
```

### Expected Result

Observe that:

- The selected pod is terminated.
- Kubernetes automatically creates a replacement pod.
- Application availability is maintained.

### Talking Points

Explain that:

- The Deployment controller continuously monitors the desired state.
- Kubernetes automatically restores missing replicas.
- This demonstrates platform resilience.

---

# Demo Complete

## Summary

The live demonstration has shown the complete Azure DevSecOps lifecycle.

The audience has seen:

- Application functionality
- Backend API verification
- Docker containerization
- Azure Container Registry
- Azure Kubernetes Service
- Kubernetes resources
- Azure DevOps CI/CD pipeline
- SonarCloud code quality
- Trivy security scanning
- GitOps using Argo CD
- Kubernetes self-healing

Together, these components demonstrate how FlavorForge delivers a reliable, secure, and production-oriented cloud-native application.

---

## Next Document

Continue with **[05-incident-scenarios.md](5-incident-scenarios.md)** to learn how to safely demonstrate common operational incidents and recovery procedures during live presentations.