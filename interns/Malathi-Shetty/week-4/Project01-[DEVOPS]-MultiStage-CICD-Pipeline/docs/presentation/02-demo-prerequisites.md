# Demo Prerequisites

## Purpose

Before presenting the FlavorForge Azure DevSecOps Capstone Project, it is important to verify that the demonstration environment is healthy, accessible, and ready for use.

This document provides a step-by-step pre-demo checklist to validate the local environment, Azure resources, Kubernetes cluster, CI/CD pipeline, GitOps deployment, and application availability. Performing these checks before every presentation helps ensure a smooth and reliable demonstration.

---

## Objectives

This document helps you:

- Verify the local development environment.
- Confirm Azure authentication and resource availability.
- Validate Azure Container Registry (ACR) access.
- Ensure the Azure Kubernetes Service (AKS) cluster is healthy.
- Verify Kubernetes workloads, services, and ingress.
- Confirm successful Azure DevOps pipeline execution.
- Verify Argo CD synchronization and application health.
- Test frontend and backend application availability.
- Ensure the complete demonstration environment is ready.

---

## Prerequisites

Before starting the verification process, ensure that you have:

- Azure CLI installed and authenticated.
- Docker Desktop or Docker Engine installed.
- `kubectl` configured to access the AKS cluster.
- Access to the Azure DevOps project.
- Access to the Azure Container Registry (ACR).
- Access to the Argo CD dashboard (if applicable).
- A stable internet connection.

---

## Demo Readiness Checklist

Complete the following checks before starting the presentation.

| Component | Status |
|-----------|:------:|
| Azure CLI Authentication | ☐ |
| Azure Subscription | ☐ |
| Azure Resource Group | ☐ |
| Azure Container Registry (ACR) | ☐ |
| AKS Cluster | ☐ |
| Kubernetes Nodes | ☐ |
| Kubernetes Deployments | ☐ |
| Kubernetes Pods | ☐ |
| Kubernetes Services | ☐ |
| Kubernetes Ingress | ☐ |
| Azure DevOps Pipeline | ☐ |
| Argo CD Application | ☐ |
| Frontend Application | ☐ |
| Backend Health API | ☐ |

---

## Verification Flow

The demonstration environment should be verified in the following order.

```text
Local Environment
        │
        ▼
Azure Authentication
        │
        ▼
Azure Resources
        │
        ▼
Docker Images
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
Argo CD
        │
        ▼
Application Verification
        │
        ▼
Demo Ready
```

Following this sequence ensures that infrastructure, platform services, and applications are validated before beginning the live demonstration.

---

## Related Documentation

| Documentation | Description |
|---------------|-------------|
| [Build Journey](../BUILD-JOURNEY/BUILD-JOURNEY.md) | Complete project build journey from an empty repository |
| [Architecture Documentation](../architecture/) | Application, cloud, and security architecture |
| [Implementation Documentation](../implementation/) | Step-by-step implementation guide |
| [Pipeline Documentation](../pipeline/) | Azure DevOps CI/CD implementation |
| [Troubleshooting Guide](../troubleshooting/) | Common issues and resolutions |

---

## Next Step

Begin with **Local Environment Verification** to confirm that all required tools are installed and configured before connecting to Azure and validating the remaining infrastructure.

---

# Local Environment Verification

Before connecting to Azure, verify that all required tools are installed and accessible from your local machine.

## Required Tools

| Tool | Purpose |
|------|---------|
| Azure CLI | Manage Azure resources |
| Docker | Build and run container images |
| kubectl | Manage Kubernetes resources |
| Git | Source code management |

---

## Verify Azure CLI

### Command

```bash
az version
```

### Expected Output

- Azure CLI version information is displayed.
- The command completes without errors.

---

## Verify Docker

### Command

```bash
docker --version
```

### Expected Output

- Docker version is displayed.
- Docker Engine is installed and accessible.

---

## Verify kubectl

### Command

```bash
kubectl version --client
```

### Expected Output

- The installed Kubernetes client version is displayed.

---

## Verify Git

### Command

```bash
git --version
```

### Expected Output

- Git version information is displayed.

---

## Verification Summary

If all commands execute successfully, the local machine is ready to connect to Azure and manage the FlavorForge deployment environment.

---

# Azure Authentication Verification

Authenticate with Azure before accessing cloud resources.

## Login to Azure

### Command

```bash
az login
```

### Expected Output

- Browser-based authentication is completed successfully.
- Azure CLI is authenticated.
- The correct Azure subscription becomes available.

### Verify Active Subscription

```bash
az account show
```

### Expected Output

The command should display details similar to:

- Subscription Name
- Subscription ID
- Tenant ID
- User Account
- Default Subscription

---

### Evidence

![Azure CLI Authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

*Figure 2.1 – Successful Azure CLI authentication.*

---

# Azure Resource Verification

After authentication, verify that the required Azure resources are available.

## Verify Resource Group

### Command

```bash
az group list --output table
```

### Expected Output

The FlavorForge resource group should be listed.

---

## Verify Azure Container Registry (ACR)

### Command

```bash
az acr list --output table
```

### Expected Output

The Azure Container Registry created for the project should be displayed.

---

## Verify AKS Cluster

### Command

```bash
az aks list --output table
```

### Expected Output

The AKS cluster should appear with a **Running** status.

---

### Evidence

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

*Figure 2.2 – Azure Kubernetes Service (AKS) cluster is running successfully.*

---

## Next Step

Continue with **Docker Verification**, where the required container images are validated before verifying the Kubernetes deployment.

---

# Local Environment Verification

Before connecting to Azure, verify that all required tools are installed and accessible from your local machine.

## Required Tools

| Tool | Purpose |
|------|---------|
| Azure CLI | Manage Azure resources |
| Docker | Build and run container images |
| kubectl | Manage Kubernetes resources |
| Git | Source code management |

---

## Verify Azure CLI

### Command

```bash
az version
```

### Expected Output

- Azure CLI version information is displayed.
- The command completes without errors.

---

## Verify Docker

### Command

```bash
docker --version
```

### Expected Output

- Docker version is displayed.
- Docker Engine is installed and accessible.

---

## Verify kubectl

### Command

```bash
kubectl version --client
```

### Expected Output

- The installed Kubernetes client version is displayed.

---

## Verify Git

### Command

```bash
git --version
```

### Expected Output

- Git version information is displayed.

---

## Verification Summary

If all commands execute successfully, the local machine is ready to connect to Azure and manage the FlavorForge deployment environment.

---

# Azure Authentication Verification

Authenticate with Azure before accessing cloud resources.

## Login to Azure

### Command

```bash
az login
```

### Expected Output

- Browser-based authentication is completed successfully.
- Azure CLI is authenticated.
- The correct Azure subscription becomes available.

### Verify Active Subscription

```bash
az account show
```

### Expected Output

The command should display details similar to:

- Subscription Name
- Subscription ID
- Tenant ID
- User Account
- Default Subscription

---

### Evidence

![Azure CLI Authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

*Figure 2.1 – Successful Azure CLI authentication.*

---

# Azure Resource Verification

After authentication, verify that the required Azure resources are available.

## Verify Resource Group

### Command

```bash
az group list --output table
```

### Expected Output

The FlavorForge resource group should be listed.

---

## Verify Azure Container Registry (ACR)

### Command

```bash
az acr list --output table
```

### Expected Output

The Azure Container Registry created for the project should be displayed.

---

## Verify AKS Cluster

### Command

```bash
az aks list --output table
```

### Expected Output

The AKS cluster should appear with a **Running** status.

---

### Evidence

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

*Figure 2.2 – Azure Kubernetes Service (AKS) cluster is running successfully.*

---

## Next Step

Continue with **Docker Verification**, where the required container images are validated before verifying the Kubernetes deployment.

---

# Docker Verification

Verify that the required Docker images are available locally before demonstrating the deployment process.

## List Available Images

### Command

```bash
docker images
```

### Expected Output

The output should include the FlavorForge frontend and backend images.

Example:

| Repository | Tag |
|------------|-----|
| flavorforge-frontend | latest |
| flavorforge-backend | latest |

---

### Verify Running Containers (Optional)

If the application is running locally, verify the active containers.

### Command

```bash
docker ps
```

### Expected Output

The running containers should include the frontend and backend services.

---

### Evidence

![Docker Images](/screenshots/azure/07-docker-images.png)

*Figure 2.3 – Local Docker images available for the FlavorForge application.*

---

# AKS Cluster Verification

Verify that the Azure Kubernetes Service (AKS) cluster is accessible and ready.

## View Cluster Nodes

### Command

```bash
kubectl get nodes
```

### Expected Output

All cluster nodes should display a **Ready** status.

Example:

```text
NAME                                STATUS   ROLES   AGE   VERSION
aks-nodepool1-xxxxxxxx-vmss000000   Ready    <none>  XXd   v1.xx.x
```

---

### Evidence

![AKS Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

*Figure 2.4 – AKS cluster nodes are in the Ready state.*

---

# Kubernetes Resource Verification

Verify that all application resources have been deployed successfully.

## View All Resources

### Command

```bash
kubectl get all -n flavorforge
```

### Expected Output

The following resources should be available:

- Backend Deployment
- Frontend Deployment
- ReplicaSets
- Running Pods
- ClusterIP Services

---

### Verify Deployments

```bash
kubectl get deployments -n flavorforge
```

### Expected Output

Both frontend and backend deployments should show all replicas as **READY**.

---

### Verify Pods

```bash
kubectl get pods -n flavorforge
```

### Expected Output

All pods should display the **Running** status.

---

### Verify Services

```bash
kubectl get svc -n flavorforge
```

### Expected Output

Frontend and backend services should be listed with the correct ports.

---

### Verify Ingress

```bash
kubectl get ingress -n flavorforge
```

### Expected Output

The ingress should display an assigned external IP address.

---

### Evidence

![Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

*Figure 2.5 – Kubernetes resources deployed successfully in the FlavorForge namespace.*

---

## Next Step

Continue with **Azure DevOps Pipeline Verification** to confirm that the latest application version has been successfully built, tested, scanned, and deployed.

---

# Azure DevOps Pipeline Verification

Verify that the latest Azure DevOps pipeline has completed successfully before starting the demonstration.

## Pipeline Checklist

Confirm the following:

- Source code was successfully checked out.
- Dependencies were installed.
- Unit tests completed successfully.
- SonarCloud quality analysis passed.
- Docker images were built successfully.
- Images were pushed to Azure Container Registry (ACR).
- Kubernetes deployment completed successfully.
- The pipeline finished without errors.

---

### Evidence

![Azure DevOps Pipeline](/screenshots/pipeline/6-pipelines-run.png)

*Figure 2.6 – Successful Azure DevOps pipeline execution.*

---

# Argo CD Verification

Verify that the GitOps deployment is synchronized with the Git repository.

## View Argo CD Applications

### Command

```bash
kubectl get applications -n argocd
```

### Expected Output

The FlavorForge application should display:

- Sync Status: **Synced**
- Health Status: **Healthy**

---

### Evidence

![Argo CD Application](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 2.7 – Argo CD application synchronized and healthy.*

---

# Application Verification

Verify that both the frontend application and backend API are accessible.

## Verify Frontend

Open the application using the configured Ingress URL.

### Expected Result

- Home page loads successfully.
- Recipes are displayed.
- Search and category filters work correctly.
- No browser errors are present.

---

## Verify Backend Health API

### Command

```bash
curl http://<INGRESS-IP>/api/health
```

Replace `<INGRESS-IP>` with the external IP address assigned to your Ingress.

### Expected Output

A successful response similar to:

```json
{
  "status": "UP"
}
```

---

## Verify Backend API

Open the following endpoint in a browser or API client:

```text
http://<INGRESS-IP>/api/recipes
```

### Expected Result

A JSON response containing the available recipes is returned.

---

# Final Demo Readiness Checklist

Before beginning the presentation, confirm that all verification steps have been completed successfully.

| Verification | Status |
|--------------|:------:|
| Local environment verified | ☐ |
| Azure authentication successful | ☐ |
| Azure resources available | ☐ |
| Docker images verified | ☐ |
| AKS cluster healthy | ☐ |
| Kubernetes resources running | ☐ |
| Azure DevOps pipeline successful | ☐ |
| Argo CD synchronized | ☐ |
| Frontend application accessible | ☐ |
| Backend API responding | ☐ |

If all items are complete, the demonstration environment is ready.

---

# Common Issues

| Issue | Resolution |
|-------|------------|
| Azure login fails | Run `az login` again and verify the correct subscription. |
| AKS cluster inaccessible | Refresh Kubernetes credentials using `az aks get-credentials`. |
| Pods are not running | Inspect the pod using `kubectl describe pod <pod-name> -n flavorforge`. |
| Ingress unavailable | Verify the Ingress Controller and external IP assignment. |
| Argo CD OutOfSync | Perform a manual synchronization from the Argo CD dashboard or CLI. |

---

# Conclusion

Completing this checklist confirms that the FlavorForge environment is healthy, synchronized, and ready for a live technical demonstration. Verifying each component before the presentation minimizes the risk of unexpected issues and allows the demonstration to focus on the project's architecture, implementation, and operational capabilities.

---

# Next Step

Continue with **[02-demo-day.md](2-demo-day.md)** to follow the recommended agenda and sequence for presenting the FlavorForge Azure DevSecOps Capstone Project.