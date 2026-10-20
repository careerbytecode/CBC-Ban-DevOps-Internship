# 📋 Phase 1 – Project Planning

## Objective

The objective of this phase was to understand the capstone requirements, define the project scope, select the technology stack, and design an implementation roadmap before writing any code.

Proper planning reduces rework, simplifies troubleshooting, and ensures that each implementation phase builds logically on the previous one.

---

# 🎯 Project Goal

Build an enterprise-style DevSecOps application called **FlavorForge** that demonstrates a complete software delivery lifecycle using modern cloud-native technologies.

The application should progress from local development to a production-like deployment on Azure Kubernetes Service (AKS), while implementing automation, security, scalability, and GitOps practices.

---

# 📚 Capstone Objective

This project was developed as part of the **CareerByteCode Cloud & DevOps Internship Program**.

The assigned capstone focus was:

**Project 3 – Multi-Stage CI/CD Pipeline (Azure DevOps)**

The required objective was to demonstrate a complete Azure DevOps YAML pipeline capable of:

* Building the application
* Running automated tests
* Building Docker images
* Publishing images to Azure Container Registry (ACR)
* Deploying the application to Azure Kubernetes Service (AKS)

During implementation, additional enterprise DevOps practices were incorporated to extend the project beyond the minimum capstone requirements.

---

# 💡 Why FlavorForge?

Instead of using a commonly available sample application, a custom recipe management platform named **FlavorForge** was designed.

The project provides a realistic web application consisting of a React frontend and an Express.js backend, making it suitable for demonstrating real-world DevOps workflows.

---

# 🏗️ High-Level Architecture

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Azure DevOps Pipeline
      │
      ├── Build
      ├── Test
      ├── Code Quality
      ├── Security Scan
      ├── Docker Build
      ├── Push to ACR
      ▼
Azure Kubernetes Service
      │
      ▼
FlavorForge Application
```

The architecture evolved further during the project with GitOps and additional Kubernetes capabilities.

---

# 🎯 Project Scope

The project includes the following major implementation areas:

* Frontend development
* Backend development
* REST API integration
* Docker containerization
* Docker Compose
* Azure resource provisioning
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes manifests
* Kustomize overlays
* ConfigMaps and Secrets
* Ingress
* Horizontal Pod Autoscaler (HPA)
* Rolling updates
* Azure DevOps multi-stage pipeline
* SonarCloud integration
* Trivy image scanning
* GitOps using ArgoCD
* Documentation
* Demo preparation

---

# 🛠️ Technology Stack

| Category           | Technology                     |
| ------------------ | ------------------------------ |
| Frontend           | React + Vite                   |
| Backend            | Node.js + Express              |
| Containerization   | Docker                         |
| Container Registry | Azure Container Registry (ACR) |
| Orchestration      | Kubernetes (AKS)               |
| Configuration      | ConfigMaps & Secrets           |
| CI                 | Azure DevOps Pipelines         |
| Code Quality       | SonarCloud                     |
| Security           | Trivy                          |
| GitOps             | ArgoCD                         |
| Version Control    | Git & GitHub                   |

---

# 📦 Initial Repository Structure

The repository was organized to separate application code, infrastructure, documentation, and automation.

```text
flavorforge-azure-devsecops-capstone/

frontend/
backend/
docker/
kubernetes/
docs/
scripts/
```

The repository structure continued evolving as new capabilities were implemented.

---

# 📖 Development Strategy

Instead of implementing cloud infrastructure immediately, the project followed an incremental approach.

The planned implementation sequence was:

1. Build the frontend application.
2. Develop the backend APIs.
3. Integrate frontend and backend locally.
4. Containerize both applications using Docker.
5. Validate using Docker Compose.
6. Push images to Azure Container Registry.
7. Deploy to Azure Kubernetes Service.
8. Configure Kubernetes resources.
9. Automate deployments using Azure DevOps.
10. Improve security, scalability, and GitOps capabilities.

Each phase was verified before proceeding to the next one.

---

# ⚠️ Assumptions

The following assumptions were made before beginning development:

* Basic knowledge of Git and GitHub
* Azure subscription available
* Docker installed locally
* Node.js installed locally
* Azure CLI configured
* kubectl installed
* Internet connectivity available for Azure services

---

# 📌 Deliverables

The final project should provide:

* Working React frontend
* Working Express backend
* Dockerized application
* Multi-stage Azure DevOps pipeline
* Images stored in Azure Container Registry
* Deployment on Azure Kubernetes Service
* Kubernetes manifests
* GitOps deployment using ArgoCD
* Complete project documentation
* Demo presentation
* Production-style repository structure

---

# ✅ Outcome of this Phase

At the end of the planning phase:

* Project scope was finalized.
* Technology stack was selected.
* Repository structure was defined.
* Development roadmap was prepared.
* Implementation sequence was established.

With planning complete, development could begin in a structured and repeatable manner.
