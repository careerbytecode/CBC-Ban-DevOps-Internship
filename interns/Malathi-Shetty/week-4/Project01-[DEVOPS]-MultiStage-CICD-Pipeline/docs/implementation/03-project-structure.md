# 📁 FlavorForge Repository Structure

> This document explains the complete repository structure of the FlavorForge Azure DevSecOps Capstone Project.

---

# 📖 Why This Document Exists

As DevOps projects grow, the number of files and folders increases rapidly.

Instead of storing everything in a single directory, projects are organized into logical modules. This makes the code easier to understand, maintain, and extend.

This document acts as a map of the repository. Before exploring the implementation, it is important to understand where everything lives and why.

---

# Repository Overview

```text
flavorforge-azure-devsecops-capstone
│
├── frontend/
├── backend/
├── kubernetes/
├── argocd/
├── docs/
├── docker/
├── scripts/
├── azure-pipelines.yml
├── argocd-pipeline.yml
├── docker-compose.yml
├── sonar-project.properties
├── README.md
└── supporting project files
```

Each directory has a specific responsibility in the project.

---

# Root Directory

The root directory contains project-wide configuration files and documentation.

### README.md

The main landing page of the project.

It provides:

- Project overview
- Architecture
- Technologies
- Setup instructions
- Links to detailed documentation

---

### LICENSE

Defines how others can use the project.

---

### CHANGELOG.md

Tracks important changes made during development.

---

### CONTRIBUTING.md

Explains how contributors can clone, modify, and submit changes.

---

### SECURITY.md

Documents responsible disclosure and security practices.

---

# frontend/

Contains the complete React application.

Responsibilities include:

- User interface
- Routing
- API communication
- Responsive design
- Error handling
- Health status display
- Recipe management

Main folders include:

- components
- pages
- services
- assets
- styles
- layouts

---

# backend/

Contains the Node.js Express REST API.

Responsibilities include:

- Business logic
- REST APIs
- Health endpoint
- Recipe APIs
- Configuration
- Unit tests

Main folders include:

- controllers
- routes
- services
- config
- tests

---

# kubernetes/

Contains all Kubernetes manifests used to deploy the application.

Organized into:

## base/

Reusable Kubernetes resources shared across environments.

Includes:

- Namespace
- Backend Deployment
- Frontend Deployment
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

## overlays/

Environment-specific customizations.

Current environments:

- Development
- QA
- Production

Kustomize combines the base resources with overlay patches to generate the final deployment manifests.

---

# argocd/

Contains GitOps configuration.

Current file:

```
flavorforge-app.yaml
```

This file defines the ArgoCD Application resource.

It tells ArgoCD:

- Which Git repository to monitor
- Which Kubernetes manifests to synchronize
- Which AKS namespace to deploy into
- Whether automatic synchronization is enabled

---

# docs/

Contains all project documentation.

Subfolders include:

- architecture
- api
- diagrams
- presentation
- screenshots
- troubleshooting

This directory is intended to make the repository self-documenting and easier for future contributors.

---

# docker/

Stores Docker-related documentation and supporting files.

---

# scripts/

Reserved for automation scripts.

Examples include:

- Environment setup
- Resource provisioning
- Cleanup
- Utility scripts

---

# azure-pipelines.yml

Defines the primary Azure DevOps CI pipeline.

Responsibilities:

- Build
- Test
- SonarCloud analysis
- Trivy scan
- Docker image creation
- Push images to Azure Container Registry

This pipeline is responsible for Continuous Integration (CI).

---

# argocd-pipeline.yml

Defines the bootstrap pipeline for ArgoCD.

Responsibilities:

- Validate AKS connectivity
- Deploy or update the ArgoCD Application
- Verify synchronization
- Confirm Kubernetes health

After bootstrapping, ArgoCD becomes responsible for Continuous Delivery (CD).

---

# docker-compose.yml

Provides a local multi-container development environment.

Used during early development to run:

- Frontend
- Backend

without requiring Kubernetes.

---

# sonar-project.properties

Configuration for SonarCloud code quality analysis.

Defines:

- Source directories
- Test directories
- Coverage reports
- Exclusions

---

# How Everything Connects

```text
GitHub Repository
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
Docker Images
        │
        ▼
Azure Container Registry
        │
        ▼
ArgoCD
        │
        ▼
Azure Kubernetes Service
        │
        ▼
Frontend + Backend
```

Each folder contributes to a different stage of this workflow.

---

# Repository Organization Principles

The project follows a modular structure.

Benefits include:

- Separation of concerns
- Easier maintenance
- Better scalability
- Simpler onboarding
- Cleaner collaboration
- Enterprise-style organization

---

# What You'll Learn Next

Now that the repository structure is understood, the next document explains how the frontend, backend, Docker, Azure, Kubernetes, and GitOps components fit together as a complete DevSecOps platform.

Continue with:

**04-application-architecture.md**