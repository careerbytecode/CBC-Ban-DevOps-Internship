# 🚀 Azure DevOps CI/CD Pipeline

The FlavorForge Azure DevSecOps Pipeline automates the complete application delivery lifecycle, from source code validation to deployment on Azure Kubernetes Service (AKS).

The pipeline follows modern DevSecOps practices by integrating code quality analysis, automated testing, security scanning, Docker image creation, Azure Container Registry (ACR), Kubernetes deployment, and GitOps using Argo CD.

The entire workflow is implemented using Azure DevOps Multi-Stage YAML Pipelines to ensure repeatable, reliable, and production-ready deployments.

---


# 📋 Prerequisites

This document assumes that the Azure DevSecOps environment has already been configured.

Before following this pipeline reference, ensure the following have already been completed:

- Azure DevOps project created
- GitHub repository connected to Azure DevOps
- Azure Resource Manager Service Connection configured
- Azure Container Registry (ACR) Service Connection configured
- SonarCloud Service Connection configured
- Variable Groups created
- Azure DevOps Environments configured
- Environment approvals configured
- Multi-stage `azure-pipelines.yml` committed to the repository

> **Note**
>
> This document explains **how the Azure DevOps CI/CD pipeline works** after it has been configured.
>
> If you want to recreate the Azure DevOps configuration from scratch, refer to **[azure-devops-setup-guide.md](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/pipeline/azure-devops-setup-guide.md)**

---

# 🎯 Objectives

The pipeline is designed to automate:

- Source code checkout
- Dependency installation
- Frontend and backend build
- Unit testing
- Code quality analysis using SonarCloud
- Code coverage reporting
- Docker image build
- Container image vulnerability scanning using Trivy
- Push Docker images to Azure Container Registry (ACR)
- Kubernetes manifest validation
- Deployment to Azure Kubernetes Service (AKS)
- GitOps synchronization using Argo CD

---

# 🏗️ Pipeline Architecture

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Azure DevOps Pipeline
      │
      ▼
Checkout Source Code
      │
      ▼
Install Dependencies
      │
      ▼
Run Unit Tests
      │
      ▼
Generate Coverage Reports
      │
      ▼
SonarCloud Analysis
      │
      ▼
Quality Gate Validation
      │
      ▼
Build Docker Images
      │
      ▼
Trivy Security Scan
      │
      ▼
Push Images to Azure Container Registry
      │
      ▼
Update Kubernetes Manifests
      │
      ▼
Azure Kubernetes Service
      │
      ▼
Argo CD GitOps Sync
      │
      ▼
FlavorForge Application
```

---

# 📂 Pipeline Structure

```text
azure-pipelines.yml

Stages

1. Build
2. Test
3. Code Quality
4. Security Scan
5. Docker Build
6. Push to Azure Container Registry
7. Deploy to AKS
8. GitOps Synchronization using Argo CD
```

---

# 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Azure DevOps | CI/CD Pipeline |
| GitHub | Source Code Repository |
| SonarCloud | Code Quality Analysis |
| Jest | Backend Unit Testing |
| Vitest | Frontend Unit Testing |
| Trivy | Container Vulnerability Scanning |
| Docker | Container Image Build |
| Azure Container Registry (ACR) | Container Registry |
| Azure Kubernetes Service (AKS) | Kubernetes Cluster |
| Argo CD | GitOps Continuous Delivery |
| Kubernetes | Container Orchestration |

---

# 🔄 Pipeline Stages

The Azure DevOps pipeline is implemented as a multi-stage YAML pipeline.

Each stage has a specific responsibility and creates a controlled path from source code to production deployment.

---




## Pipeline Flow Summary

The pipeline executes the following stages in sequence.

```text
Checkout Source Code
        │
        ▼
Install Dependencies
        │
        ▼
Run Unit Tests
        │
        ▼
SonarCloud Analysis
        │
        ▼
Security Scanning
        │
        ▼
Build Docker Images
        │
        ▼
Push Images to Azure Container Registry
        │
        ▼
Deploy to Azure Kubernetes Service
        │
        ▼
Synchronize using Argo CD
        │
        ▼
Verify Application Deployment
```

Each stage depends on the successful completion of the previous stage, ensuring that only validated and secure application versions are deployed.

---

# Stage 1: Source Checkout

## Purpose

Retrieve the latest application source code from the GitHub repository.

## Activities

- Checkout application source code
- Prepare build environment
- Configure pipeline variables

Example:

```yaml
- checkout: self
```

The pipeline always works with the latest committed code from the main branch.

---

# Stage 2: Dependency Installation

## Purpose

Install all application dependencies required for building and testing.

The pipeline installs dependencies separately for frontend and backend applications.

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd frontend
npm install
```

This ensures both application layers are validated independently.

---

# Stage 3: Automated Testing

## Purpose

Validate application functionality before creating deployment artifacts.

The pipeline executes automated tests for:

- Backend API services
- Frontend React components
- API client functionality

---

## Backend Testing

Framework:

- Jest
- Supertest

Command:

```bash
npm test
```

Validation includes:

- API endpoint testing
- Controller validation
- Service layer verification
- Code coverage generation

Coverage reports are generated for quality analysis.

---

## Frontend Testing

Framework:

- Vitest
- React Testing Library

Validation includes:

- Component rendering
- User interface behaviour
- API client functionality

Command:

```bash
npm test
```

---

# Stage 4: Code Quality Analysis

## Purpose

Ensure maintainable and reliable code using static analysis.

Tool:

- SonarCloud

The pipeline performs:

- Source code analysis
- Code smell detection
- Duplicate code detection
- Security issue identification
- Maintainability analysis
- Coverage reporting

Pipeline flow:

```text
Source Code
      │
      ▼
SonarCloud Scanner
      │
      ▼
Quality Gate
      │
      ▼
Pipeline Decision
```

If the quality gate fails, the pipeline can prevent further deployment stages.

---

# Stage 5: Security Validation

## Purpose

Identify security vulnerabilities before container deployment.

Security checks include:

- Dependency vulnerability scanning
- Container image scanning
- Configuration validation

Tools:

| Tool | Purpose |
|------|---------|
| npm audit | Dependency security analysis |
| Trivy | Container vulnerability scanning |
| SonarCloud | Code security analysis |

---

# DevSecOps Approach

Security is integrated throughout the delivery lifecycle.

```text
Plan
 │
 ▼
Code
 │
 ▼
Build
 │
 ▼
Test
 │
 ▼
Scan
 │
 ▼
Deploy
 │
 ▼
Monitor
```

Security checks are automated instead of being performed only before release.

---

---

# 🐳 Stage 6: Docker Image Build

## Purpose

Create production-ready container images for the frontend and backend applications.

The pipeline builds separate Docker images:

- FlavorForge Backend
- FlavorForge Frontend

---

## Backend Image

The backend image packages:

- Node.js runtime
- Express application
- Application dependencies
- Production server configuration

Build command:

```bash
docker build \
  -t flavorforge-backend:${BUILD_BUILDID} \
  ./backend
```

---

## Frontend Image

The frontend image uses a multi-stage Docker build.

Build process:

```text
React Source Code
        │
        ▼
Node.js Build Stage
        │
        ▼
Production Build
        │
        ▼
Nginx Runtime Image
```

Build command:

```bash
docker build \
  -t flavorforge-frontend:${BUILD_BUILDID} \
  ./frontend
```

---

# 📦 Stage 7: Push Images to Azure Container Registry (ACR)

## Purpose

Store validated Docker images in Azure Container Registry for Kubernetes deployment.

Registry:

```text
Azure Container Registry (ACR)
```

Pipeline workflow:

```text
Docker Image
      │
      ▼
ACR Authentication
      │
      ▼
Image Tagging
      │
      ▼
Push Image
      │
      ▼
Available for AKS
```

---

## Image Tagging Strategy

Images are tagged using the pipeline build ID.

Example:

```text
flavorforge-backend:Build-123
flavorforge-frontend:Build-123
```

Benefits:

- Version tracking
- Easy rollback
- Traceability between code and deployment

---

# 🔐 Azure Service Connections

The pipeline uses Azure DevOps Service Connections for secure authentication.

Configured connections:

| Service Connection | Purpose |
|---|---|
| Azure Resource Manager Connection | Azure resource access |
| Azure Container Registry Connection | Docker image push |
| SonarCloud Connection | Code quality analysis |

Service connections avoid storing credentials inside pipeline YAML files.

---

# ☸️ Stage 8: Kubernetes Deployment

## Purpose

Deploy the application containers into Azure Kubernetes Service (AKS).

Deployment objects:

- Namespace
- Backend Deployment
- Frontend Deployment
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

---

# Kubernetes Deployment Strategy

The pipeline uses Kustomize for environment-specific deployments.

Available environments:

```
dev
qa
prod
```

Directory structure:

```text
kubernetes/
│
├── base/
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

---

## Deployment Command

Example:

```bash
kubectl apply -k kubernetes/overlays/dev
```

The selected overlay combines:

```text
Base Kubernetes Resources
            +
Environment Specific Changes
            =
Final Deployment Manifest
```

---

# Rolling Update Strategy

Kubernetes performs rolling updates during deployment.

Benefits:

- Zero downtime deployment
- Gradual pod replacement
- Automatic health checking
- Easy rollback capability

Deployment flow:

```text
Old Pods Running
        │
        ▼
New Image Deployment
        │
        ▼
New Pods Created
        │
        ▼
Health Checks Passed
        │
        ▼
Old Pods Removed
```

---

# Stage 9: Deployment Verification

After deployment, the pipeline validates application health.

Verification includes:

```bash
kubectl get pods -n flavorforge
```

```bash
kubectl get services -n flavorforge
```

```bash
kubectl get ingress -n flavorforge
```

Application availability is verified after deployment completion.


---

# 🔄 GitOps Integration with Argo CD

## Purpose

The final deployment stage follows a GitOps approach using Argo CD.

Instead of directly managing Kubernetes changes manually, the desired application state is stored in Git and synchronized automatically with the AKS cluster.

---

# GitOps Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Azure DevOps Pipeline
    │
    ▼
Build & Validate Application
    │
    ▼
Push Docker Images to ACR
    │
    ▼
Update Kubernetes Configuration
    │
    ▼
Git Repository
    │
    ▼
Argo CD
    │
    ▼
Azure Kubernetes Service
```

---

# Argo CD Responsibilities

Argo CD provides:

- Continuous deployment
- Git-based application state management
- Automatic synchronization
- Deployment health monitoring
- Self-healing capability
- Rollback support

---

# 📊 Pipeline Variables

The pipeline uses variables to avoid hardcoding values.

Example:

```yaml
variables:

  containerRegistry: flavorforge-acr

  backendImage: flavorforge-backend

  frontendImage: flavorforge-frontend

  kubernetesNamespace: flavorforge
```

Benefits:

- Easier maintenance
- Environment flexibility
- Secure configuration management
- Reusable pipeline stages

---

# 🌍 Environment Strategy

The pipeline supports multiple environments.

| Environment | Purpose |
|-------------|---------|
| Development | Developer testing |
| QA | Functional validation |
| Production | Customer-ready deployment |

Environment-specific configuration is managed using Kubernetes overlays.

Example:

```text
kubernetes/overlays/dev
kubernetes/overlays/qa
kubernetes/overlays/prod
```

---

# 🔙 Rollback Strategy

The deployment process supports rollback using Kubernetes capabilities.

Rollback options:

## Kubernetes Rollback

```bash
kubectl rollout undo deployment/backend-dev \
-n flavorforge-dev
```

## Argo CD Rollback

Argo CD maintains deployment history and allows reverting to a previous Git state.

Benefits:

- Faster recovery
- Reduced deployment risk
- Version traceability

---

# 🛡️ DevSecOps Pipeline Benefits

The pipeline provides:

## Continuous Integration

- Automated builds
- Automated testing
- Code quality validation
- Security scanning

## Continuous Delivery

- Automated Docker image creation
- Registry publishing
- Kubernetes deployment
- GitOps synchronization

## Security

- Dependency scanning
- Static code analysis
- Container vulnerability scanning
- Secure credential management

---

# 📈 Future Enhancements

Planned improvements:

- Approval gates for production deployment
- Blue-green deployments
- Canary releases
- Azure Key Vault integration
- Application Insights monitoring
- Prometheus and Grafana dashboards
- Slack/Teams deployment notifications
- Automated security policy enforcement

---

# 📸 Pipeline Evidence


<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/33a7d656-2357-40a7-8a06-e9d9966cd236" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/830bf40d-3597-45f5-9c88-c7a2e29c1f82" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/81d3fadb-3815-47a6-b6f8-31e5a7298810" />

<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/f44677be-0916-46a3-912e-e9be31436db3" />
<img width="2557" height="947" alt="image" src="https://github.com/user-attachments/assets/b0f5cc07-868c-4d0d-aedf-f459c9481a8e" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/e001e8dd-b176-4f63-8772-c74747002712" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/e96e4ad0-401d-4d40-979f-00f66f248932" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/acb8bd16-bafe-4873-9964-b8af4a6e32cc" />

<img width="2560" height="2147" alt="image" src="https://github.com/user-attachments/assets/00926c43-0ff5-40f4-b157-c90916edbd70" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/7f382809-e4ef-4399-86a0-fb3e05a6e371" />
<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/71c7c29e-6f1c-42f2-a285-42f60ece71fd" />


These screenshots provide visual proof of successful CI/CD implementation.

---

# 📚 Learning Outcomes

This Azure DevOps implementation demonstrates practical experience with:

- Multi-stage YAML pipelines
- CI/CD automation
- Azure DevOps service connections
- SonarCloud integration
- Automated testing
- Security scanning
- Docker image lifecycle management
- Azure Container Registry
- Kubernetes deployment automation
- AKS integration
- GitOps practices using Argo CD
- Production deployment workflows


---

# 📖 Related Documentation

The following documents provide additional information about the FlavorForge Azure DevSecOps implementation.

## Related Documentation

| Document | Description |
|----------|-------------|
| [Azure DevOps Setup Guide](azure-devops-setup-guide.md) | Step-by-step Azure DevOps configuration |
| [Implementation Guide](../implementation/README.md) | Complete implementation documentation |
| [Project Documentation](../project/) | Project overview and verification reports |
| [Pipeline Troubleshooting](../troubleshooting/03-pipeline-issues.md) | Common Azure DevOps pipeline issues |
| [Troubleshooting Index](../troubleshooting/README.md) | Complete troubleshooting guide |
| [Cleanup Guide](../cleanup/README.md) | Azure cleanup and cost management |
| [CI/CD Verification Report](../project/04-verification-and-validation-report/07-CI-CD-Verification.md) | CI/CD verification results |
| [Project README](../../README.md) | Project overview and quick start guide |

For readers who want to recreate the Azure DevOps environment from scratch, begin with **`azure-devops-setup-guide.md`**. Once the Azure DevOps environment has been configured, return to this document to understand the complete CI/CD pipeline architecture and execution flow.

---


# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as a hands-on cloud-native DevSecOps project demonstrating modern application delivery using Azure DevOps, Docker, Kubernetes, AKS, ACR, and GitOps practices.
