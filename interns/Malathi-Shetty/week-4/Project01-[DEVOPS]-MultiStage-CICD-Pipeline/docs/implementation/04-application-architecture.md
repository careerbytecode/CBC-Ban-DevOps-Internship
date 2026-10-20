# 🏗️ FlavorForge Application Architecture

> This document explains the complete architecture of the FlavorForge Azure DevSecOps Capstone Project, including how every component communicates from development to production deployment.

---

# 📖 Why This Document Exists

Before diving into implementation, it is important to understand the complete system architecture.

FlavorForge is not just a React application or a Node.js API. It demonstrates a production-style DevSecOps platform where source code flows through CI, containerization, security scanning, Kubernetes deployment, and GitOps-based continuous delivery.

Understanding this architecture makes the implementation steps much easier to follow.

---

# Project Goal

The primary objective of this project is to demonstrate an end-to-end Azure DevSecOps pipeline using modern cloud-native technologies.

The project covers:

- Application Development
- Version Control
- Continuous Integration
- Security Scanning
- Containerization
- Container Registry
- Kubernetes Deployment
- GitOps Continuous Delivery
- Auto Scaling
- Monitoring

---

# High-Level Architecture

```text
                    Developer
                        │
                        ▼
                 GitHub Repository
                        │
                        ▼
          Azure DevOps CI Pipeline
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Unit Tests      SonarCloud      Trivy Scan
        │
        ▼
 Docker Multi-stage Build
        │
        ▼
 Azure Container Registry (ACR)
        │
        ▼
 ArgoCD Bootstrap Pipeline
        │
        ▼
      ArgoCD
        │
        ▼
 Azure Kubernetes Service (AKS)
        │
   ┌────┴────┐
   ▼         ▼
Frontend   Backend
   │         │
   └────┬────┘
        ▼
     Ingress
        │
        ▼
      Browser
```

---

# End-to-End Workflow

The project follows this lifecycle:

1. Developer writes code.
2. Code is committed to GitHub.
3. Azure DevOps detects the commit.
4. CI pipeline runs automatically.
5. Application is built.
6. Unit tests execute.
7. SonarCloud performs static code analysis.
8. Trivy scans for vulnerabilities.
9. Docker images are created.
10. Images are pushed to Azure Container Registry.
11. ArgoCD is bootstrapped.
12. ArgoCD monitors the Git repository.
13. Kubernetes manifests are synchronized.
14. AKS deploys the application.
15. Users access the application through the Ingress endpoint.

---

# Frontend Architecture

The frontend is built using React and Vite.

Responsibilities include:

- Displaying recipes
- Search functionality
- Category filtering
- Backend health monitoring
- Error handling
- Responsive user interface

The frontend never communicates directly with a database. All data is requested from the backend through REST APIs.

```text
Browser
    │
    ▼
React Components
    │
    ▼
Services
    │
    ▼
API Client
```

---

# Backend Architecture

The backend follows a layered architecture.

```text
HTTP Request
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Response
```

Responsibilities include:

- Processing API requests
- Returning recipe data
- Health monitoring endpoint
- Business logic
- Configuration management

---

# Docker Architecture

Both applications are containerized independently.

```text
Frontend Source
        │
        ▼
Docker Build
        │
        ▼
Frontend Image

Backend Source
        │
        ▼
Docker Build
        │
        ▼
Backend Image
```

Multi-stage Docker builds reduce image size and improve deployment efficiency.

---

# Azure Container Registry

Azure Container Registry acts as the central image repository.

Images stored include:

- flavorforge-frontend
- flavorforge-backend

The AKS cluster pulls images directly from ACR during deployment.

---

# Kubernetes Architecture

The application runs inside Azure Kubernetes Service.

Resources include:

- Namespace
- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

```text
Namespace
    │
    ├── Backend Deployment
    ├── Frontend Deployment
    ├── Services
    ├── ConfigMaps
    ├── Secrets
    ├── Ingress
    └── HPA
```

---

# Configuration Management

Application configuration is separated from application code.

ConfigMaps store:

- Environment
- Port
- Application version
- Build version

Secrets store:

- Sensitive configuration values

This allows configuration changes without rebuilding container images.

---

# CI Architecture

Azure DevOps is responsible only for Continuous Integration.

Its responsibilities include:

- Build
- Test
- Static analysis
- Security scanning
- Docker image creation
- Push images to Azure Container Registry

Once CI completes successfully, Azure DevOps hands control over to ArgoCD.

---

# GitOps Architecture

Continuous Delivery is handled by ArgoCD.

Responsibilities include:

- Watching Git repositories
- Detecting manifest changes
- Synchronizing Kubernetes resources
- Maintaining desired state
- Self-healing deployments

This separation clearly distinguishes CI from CD.

---

# Final Production Flow

```text
Developer
     │
     ▼
GitHub
     │
     ▼
Azure DevOps (CI)
     │
     ▼
Azure Container Registry
     │
     ▼
ArgoCD (CD)
     │
     ▼
Azure Kubernetes Service
     │
     ▼
Ingress Controller
     │
     ▼
End User
```

---

# Production vs Capstone

## Production Environment

A real enterprise deployment would typically include:

- Multiple AKS clusters (Dev, QA, UAT, Production)
- Private Azure Container Registry
- Azure Key Vault for secrets
- Branch protection and pull request approvals
- Automated deployment approvals
- Monitoring with Prometheus and Grafana
- Centralized logging
- Backup and disaster recovery
- Policy enforcement with Azure Policy
- Image signing and supply chain security

## Capstone Simplifications

To keep the project manageable, the following simplifications were made:

- Single AKS cluster
- Public endpoints
- Kubernetes Secrets instead of Azure Key Vault
- Simplified monitoring
- Limited environments
- Basic GitOps workflow

Even with these simplifications, the overall architecture follows production-grade DevSecOps principles.

---

# Key Learning Outcomes

By completing this architecture, the following skills were demonstrated:

- Full-stack application deployment
- Containerization
- Kubernetes orchestration
- Continuous Integration
- GitOps-based Continuous Delivery
- Cloud-native application architecture
- Infrastructure automation
- Secure application delivery

---

# Next Step

The next document explains how the React frontend was designed, developed, tested, and prepared for containerization.

Continue with:

**05-frontend-development.md**