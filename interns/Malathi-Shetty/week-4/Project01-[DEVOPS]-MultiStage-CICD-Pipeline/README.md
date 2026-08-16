
# 🍽️ FlavorForge

## From Recipe Ideas to a Production-Inspired Azure DevSecOps Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![Azure](https://img.shields.io/badge/Cloud-Microsoft%20Azure-0078D4)
![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5)
![ArgoCD](https://img.shields.io/badge/GitOps-ArgoCD-orange)
![Security](https://img.shields.io/badge/Security-Trivy-red)
![CI/CD](https://img.shields.io/badge/Pipeline-Azure%20DevOps-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Last Commit](https://img.shields.io/github/last-commit/bymalathi/flavorforge-azure-devsecops-capstone)
![Repo Size](https://img.shields.io/github/repo-size/bymalathi/flavorforge-azure-devsecops-capstone)
![AKS](https://img.shields.io/badge/Kubernetes-AKS-326CE5)
![Quality Gate](https://img.shields.io/badge/SonarCloud-Passed-brightgreen)
![Documentation Automation](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/actions/workflows/documentation-generator.yml/badge.svg)

---

> 🍴 **Great recipes need the right ingredients.**
> 🚀 **Great software requires the right engineering practices.**

---

# 👨‍🍳 The FlavorForge Story

FlavorForge began as a simple recipe-sharing application designed to provide users with an intuitive platform for discovering and exploring recipes through a modern web interface.

While the application itself is straightforward, the primary objective of this project extends far beyond application development.

The engineering challenge was to transform a full-stack application into a **production-inspired cloud-native platform** by implementing:

* DevSecOps automation
* Containerization
* Cloud infrastructure
* Kubernetes orchestration
* Continuous integration
* Security scanning
* Code quality analysis
* GitOps
* Deployment verification
* Operational monitoring
* Engineering documentation

The project demonstrates the journey from application source code to a running application on **Microsoft Azure Kubernetes Service (AKS)**.

<img width="1690" height="153" alt="FlavorForge journey" src="https://github.com/user-attachments/assets/4124c654-005b-41c4-9d2c-f3901d514e84" />

**The application is the product.**

**The DevSecOps platform behind it is the engineering story.**

---

# 🍴 Meet FlavorForge

FlavorForge is a full-stack recipe-sharing platform developed as an **Azure DevSecOps Capstone Project**.

The application combines a React frontend with a Node.js/Express backend while demonstrating an end-to-end cloud-native software delivery workflow.

The platform includes:

* **React + Vite** frontend
* **Node.js + Express** backend
* **SQLite** application database
* **Docker** containerization
* **Azure Container Registry (ACR)** for private image storage
* **Azure Kubernetes Service (AKS)** for container orchestration
* **Azure DevOps** multi-stage CI/CD pipeline
* **SonarCloud** for code quality analysis
* **Trivy** for container vulnerability scanning
* **Kustomize** for environment-specific Kubernetes configuration
* **Argo CD** for GitOps-based synchronization
* **Azure Monitor** for operational visibility
* **Kubernetes HPA** for workload scaling
* **Ingress** for application exposure

The goal is not simply to deploy an application.

The goal is to demonstrate how application code can move through a structured engineering lifecycle involving:

**build → validate → quality → security → package → store → deploy → synchronize → verify → operate**

---

# 🚨 WEEK 4 — COMPLETE PROJECT DOCUMENTATION

## 📖 Start Here

### 👉 [Week 4 BUILD-JOURNEY](docs/week-4/BUILD-JOURNEY/README.md)

The **Week 4 BUILD-JOURNEY** is the primary implementation documentation for this project.

It provides the complete journey from application development through cloud deployment and final verification.

It covers:

* Prerequisites and setup
* GitHub repository setup
* Application development
* Docker containerization
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes deployment
* Kustomize
* Azure DevOps
* SonarCloud
* Trivy
* Argo CD
* DevSecOps implementation
* Troubleshooting
* Documentation verification
* Final project verification
* Screenshots and implementation evidence

> **If you are reviewing or evaluating this project, start with the [Week 4 BUILD-JOURNEY](docs/week-4/BUILD-JOURNEY/README.md).**

---

# 🎯 Project Objective

Developing an application is only one part of modern software engineering.

A production-oriented platform must also address questions such as:

* How are application changes validated?
* How is code quality checked automatically?
* How are container vulnerabilities identified?
* How are application artifacts packaged consistently?
* How are container images securely stored?
* How are workloads deployed to Kubernetes?
* How are Kubernetes configurations maintained across environments?
* How can deployments be verified?
* How can application workloads scale?
* How can operational health be monitored?
* How are deployment failures investigated?

FlavorForge addresses these challenges by implementing an **enterprise-inspired DevSecOps workflow** using GitHub, Azure DevOps, Docker, Azure Container Registry, AKS, Kubernetes, Kustomize, SonarCloud, Trivy, Argo CD, and Azure monitoring capabilities.

The project demonstrates:

* ✅ Automated CI/CD using Azure DevOps
* ✅ Continuous code-quality analysis using SonarCloud
* ✅ Container vulnerability scanning using Trivy
* ✅ Docker-based application containerization
* ✅ Private image storage using Azure Container Registry
* ✅ Kubernetes orchestration using AKS
* ✅ Environment configuration using Kustomize
* ✅ GitOps synchronization using Argo CD
* ✅ Kubernetes autoscaling using HPA
* ✅ Application exposure using Ingress
* ✅ Operational visibility using Azure Monitor
* ✅ Multi-layer deployment verification
* ✅ Comprehensive engineering documentation

The objective is not simply to deploy an application, but to demonstrate how software can be **built, validated, secured, packaged, deployed, verified, and operated** using modern DevSecOps practices.

---

# 🧩 The Engineering Challenge

Traditional application deployments may require developers or operators to manually build an application, create container images, push images, update Kubernetes resources, and verify the deployment.

A typical manual deployment workflow looks like this:

<img width="406" height="507" alt="Traditional deployment workflow" src="https://github.com/user-attachments/assets/e35b41ef-2a31-44a7-a94c-2b04ca6fa1f2" />

Such deployments introduce risks such as:

* Manual deployment errors
* Configuration inconsistency
* Limited traceability
* Delayed security validation
* Difficult troubleshooting
* Repetitive operational work
* Difficult rollback and recovery

FlavorForge addresses these challenges by introducing automation and validation throughout the software delivery lifecycle.

The resulting workflow is:

<img width="402" height="971" alt="FlavorForge DevSecOps workflow" src="https://github.com/user-attachments/assets/07320734-35d3-44f8-a1cc-e64cdb23cfff" />

Each stage introduces another layer of automation, quality assurance, security, operational consistency, and deployment reliability.

#### Evidence

![Azure DevOps Pipeline](screenshots/pipeline/9-advance-pipelines-run-pass.png)

*Figure 3.1 – Multi-stage Azure DevOps pipeline implementing automated build, validation, security scanning, containerization, and deployment stages.*

---

# 🔄 The FlavorForge Transformation Journey

FlavorForge evolved incrementally.

The project started as a full-stack application and progressively introduced containerization, cloud infrastructure, Kubernetes, CI/CD, security, GitOps, monitoring, and operational verification.

<img width="2227" height="906" alt="FlavorForge transformation journey" src="https://github.com/user-attachments/assets/c0b34578-e86d-45aa-ab44-246cbdd0d568" />

The transformation can be summarized as:

```text
Application
     │
     ▼
Git Repository
     │
     ▼
Docker
     │
     ▼
Azure Container Registry
     │
     ▼
Kubernetes
     │
     ▼
AKS
     │
     ▼
Azure DevOps
     │
     ├── Build
     ├── Validation
     ├── Quality
     ├── Security
     └── Deployment
     │
     ▼
Kustomize
     │
     ▼
Argo CD / GitOps
     │
     ▼
Monitoring & Verification
```

Each phase introduced another engineering capability, transforming the application from a local full-stack project into a **production-inspired cloud-native DevSecOps platform**.

---

# 🏗️ Architecture Foundation

FlavorForge separates application development, CI/CD, container management, cloud infrastructure, Kubernetes deployment, GitOps, and monitoring into logical layers.

<img width="428" height="956" alt="FlavorForge architecture" src="https://github.com/user-attachments/assets/6ddb62fd-565c-48ea-a6ca-8811cbbf330e" />

| Layer            | Implementation             | Responsibility                                |
| ---------------- | -------------------------- | --------------------------------------------- |
| Source Control   | GitHub                     | Version control and collaboration             |
| Application      | React, Node.js, Express    | User interface and API                        |
| CI/CD            | Azure DevOps               | Automated validation and delivery workflow    |
| Code Quality     | SonarCloud                 | Static analysis and quality gate              |
| Security         | Trivy                      | Container vulnerability scanning              |
| Containerization | Docker                     | Application packaging                         |
| Registry         | Azure Container Registry   | Private image storage                         |
| Orchestration    | AKS                        | Kubernetes workload management                |
| Configuration    | Kustomize                  | Environment-specific Kubernetes configuration |
| GitOps           | Argo CD                    | Desired-state synchronization                 |
| Monitoring       | Azure Monitor / Kubernetes | Operational visibility                        |

#### Evidence

![Azure Resource Group](screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 4.1 – Azure Resource Group containing the core cloud infrastructure used by the FlavorForge platform.*

---

# 🚀 From Code Commit to Running Application

The FlavorForge delivery lifecycle follows a structured workflow that transforms source code into a running cloud-native application.

<img width="281" height="927" alt="Code to application workflow" src="https://github.com/user-attachments/assets/a4fc3199-a01f-445b-b0b8-93fed1e0b65c" />

## 1. Source Control

Application source code, Kubernetes manifests, configuration, automation scripts, and documentation are maintained in GitHub.

Git provides version history and traceability for engineering changes.

---

## 2. Continuous Integration

Azure DevOps executes the multi-stage pipeline.

The pipeline performs activities including:

* Source checkout
* Dependency installation
* Application validation
* Build
* Testing / validation
* SonarCloud analysis
* Docker image creation
* Trivy vulnerability scanning
* Image publishing

---

## 3. Container Registry

Validated Docker images are pushed to:

```text
flavorforgeacr2026ms.azurecr.io
```

Azure Container Registry provides private storage and versioned container images.

---

## 4. Kubernetes Deployment

The pipeline contains a **real AKS deployment stage**.

The deployment process obtains AKS credentials and applies the production Kustomize configuration.

Conceptually:

```text
Azure DevOps
      │
      ▼
AKS Credentials
      │
      ▼
kubectl apply -k kubernetes/overlays/prod
      │
      ▼
Update Deployment Images
      │
      ▼
kubectl rollout status
```

This is the actual deployment path implemented in the project.

---

## 5. GitOps with Argo CD

Argo CD is configured to monitor Kubernetes configuration stored in Git and synchronize the cluster with the declared desired state.

This provides a practical demonstration of GitOps principles including:

* Declarative configuration
* Git-based desired state
* Synchronization
* Drift visibility
* Deployment traceability
* Application health visibility

> **Important implementation detail:** Azure DevOps currently performs the actual AKS deployment stage. Argo CD is also implemented to demonstrate GitOps-based synchronization and desired-state management. The project therefore demonstrates both the operational deployment pipeline and the GitOps model rather than claiming that Argo CD is the only deployment mechanism.

---

## 6. Operations and Verification

After deployment, Kubernetes resources and the application are verified.

Verification includes:

* Pods
* Deployments
* Services
* Ingress
* HPA
* Application accessibility
* Backend health
* Argo CD synchronization
* Kubernetes workload health

#### Evidence

![Azure DevOps Pipeline](screenshots/pipeline/9-advance-pipelines-run-pass.png)

*Figure 5.1 – Successful execution of the Azure DevOps pipeline demonstrating the automated CI and deployment workflow.*

---

# 🧱 Application Architecture

FlavorForge follows a modular full-stack architecture.

<img width="407" height="615" alt="Application architecture" src="https://github.com/user-attachments/assets/ea2eaa16-d3c6-4b3b-a29a-32ca77c3f20e" />

```text
                 User
                  │
                  ▼
            Kubernetes Ingress
                  │
                  ▼
          ┌───────────────┐
          │    Frontend   │
          │ React + Vite  │
          │    + Nginx    │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │    Backend    │
          │ Node.js +     │
          │    Express    │
          └───────┬───────┘
                  │
                  ▼
               SQLite
```

---

## 🎨 Frontend Layer

The frontend is implemented using **React** and **Vite** and served through an Nginx container.

### Responsibilities

* Recipe browsing
* Recipe searching
* User interface
* Backend API communication
* Client-side routing
* Reusable components

### Technology

* React
* Vite
* JavaScript
* CSS
* Nginx

#### Evidence

![Frontend Application](screenshots/frontend/21-frontend-recipes-integrated.png)

*Figure 6.1 – FlavorForge React frontend displaying the integrated recipe application.*

---

## ⚙️ Backend Layer

The backend is implemented using **Node.js and Express**.

It exposes REST APIs consumed by the frontend.

### Responsibilities

* REST API endpoints
* Business logic
* Health endpoint
* Application services
* API responses
* SQLite data access

### Technology

* Node.js
* Express
* JavaScript
* SQLite

#### Evidence

![Backend API](screenshots/backend/13-backend-api.png)

*Figure 6.2 – Backend REST API successfully serving application requests.*

The separation between frontend and backend enables independent development, testing, deployment, and scaling.

---

# 🔄 DevSecOps Lifecycle

FlavorForge integrates security and quality practices into the software delivery lifecycle.

<img width="190" height="907" alt="DevSecOps lifecycle" src="https://github.com/user-attachments/assets/74837dcb-6f6d-440f-ba3d-80014fbf46a0" />

| Stage               | FlavorForge Implementation                        |
| ------------------- | ------------------------------------------------- |
| **Plan**            | Project planning, architecture, and documentation |
| **Code**            | GitHub                                            |
| **Build**           | Azure DevOps                                      |
| **Test / Validate** | Application and pipeline validation               |
| **Secure**          | SonarCloud + Trivy                                |
| **Package**         | Docker                                            |
| **Store**           | Azure Container Registry                          |
| **Deploy**          | Azure DevOps → AKS                                |
| **GitOps**          | Argo CD                                           |
| **Operate**         | Kubernetes                                        |
| **Monitor**         | Azure Monitor + Kubernetes health                 |

This demonstrates the central DevSecOps principle of integrating **development, security, operations, and automation** rather than treating them as isolated activities.

#### Evidence

![Azure DevOps Pipeline](screenshots/pipeline/8-pipelines-run-pass.png)

*Figure 7.1 – Successful execution of the DevSecOps pipeline demonstrating automated build, validation, security, and deployment stages.*

---

# 🛠️ Technology Stack

| Category         | Technology               | Purpose                          |
| ---------------- | ------------------------ | -------------------------------- |
| Frontend         | React + Vite             | User interface                   |
| Backend          | Node.js + Express        | REST API                         |
| Database         | SQLite                   | Application data                 |
| Source Control   | GitHub                   | Version control                  |
| CI/CD            | Azure DevOps             | Pipeline automation              |
| Code Quality     | SonarCloud               | Static analysis                  |
| Security         | Trivy                    | Container vulnerability scanning |
| Containerization | Docker                   | Application packaging            |
| Registry         | Azure Container Registry | Private image repository         |
| Cloud            | Microsoft Azure          | Cloud infrastructure             |
| Orchestration    | AKS                      | Kubernetes platform              |
| Configuration    | Kustomize                | Environment overlays             |
| GitOps           | Argo CD                  | Desired-state synchronization    |
| Monitoring       | Azure Monitor            | Operational visibility           |
| Documentation    | Markdown + Mermaid       | Engineering documentation        |

#### Evidence

![Azure Services](screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 8.1 – Azure Resource Group containing the primary cloud services supporting the FlavorForge platform.*

---

# 📂 Repository Structure

```text
flavorforge-azure-devsecops-capstone
│
├── frontend/                 # React frontend application
├── backend/                  # Node.js + Express backend API
├── docker/                   # Docker-related resources
├── kubernetes/               # Kubernetes manifests
│   ├── base/
│   └── overlays/
│       ├── dev/
│       ├── qa/
│       └── prod/
├── argocd/                   # GitOps application definitions
├── scripts/                  # Automation and lifecycle scripts
├── docs/                     # Project documentation
├── screenshots/              # Implementation evidence
├── azure-pipelines.yml       # Azure DevOps CI/CD pipeline
├── argocd-pipeline.yml       # Argo CD-related pipeline configuration
├── sonar-project.properties  # SonarCloud configuration
└── README.md
```

The repository separates:

* Application code
* Infrastructure
* Kubernetes configuration
* Pipeline automation
* GitOps configuration
* Documentation
* Evidence

#### Evidence

![Repository Structure](screenshots/enterprise-azure-devops-release-simulation/20-tree-l-2.png)

*Figure 8.2 – Repository structure containing application, infrastructure, automation, documentation, and evidence.*

---

# 📊 Automated Project Status

FlavorForge includes a GitHub Actions documentation workflow that automatically checks for important project components and updates the README status section.

Whenever changes are pushed to the repository, the workflow scans the project structure and updates the implementation-status section.

<!-- AUTO_STATUS_START -->

# 📊 FlavorForge Automated Project Status

| Component                       | Status     |
| ------------------------------- | ---------- |
| Frontend Application            | ✅ Detected |
| Backend API                     | ✅ Detected |
| Docker Containerization         | ✅ Detected |
| Azure Container Registry (ACR)  | ✅ Detected |
| Azure DevOps Pipeline           | ✅ Detected |
| Kubernetes Deployment           | ✅ Detected |
| Ingress                         | ✅ Detected |
| Secrets                         | ✅ Detected |
| Horizontal Pod Autoscaler (HPA) | ✅ Detected |
| ArgoCD GitOps                   | ✅ Detected |
| SonarCloud Integration          | ✅ Detected |
| Trivy Security Scan             | ✅ Detected |
| Azure Monitor                   | ✅ Detected |
| Documentation                   | ✅ Detected |

<!-- AUTO_STATUS_END -->

## What the Documentation Generator Verifies

The GitHub Actions workflow automatically validates the presence of key project components, including:

* Frontend application
* Backend API
* Docker containerization
* Azure Container Registry
* Azure DevOps pipeline
* Kubernetes manifests
* Ingress
* Horizontal Pod Autoscaler
* Argo CD configuration
* SonarCloud integration
* Trivy security scanning
* Azure Monitor configuration
* Project documentation

## Documentation Automation Workflow

<img width="505" height="815" alt="Documentation automation workflow" src="https://github.com/user-attachments/assets/b543c692-e4c6-4c98-9a4f-a7f8f921d0e7" />

This automation reduces manual README maintenance and provides a quick implementation-status overview.

---

# 📌 Current Implementation Status

| Component                         | Status      |
| --------------------------------- | ----------- |
| Frontend Application              | ✅ Completed |
| Backend REST API                  | ✅ Completed |
| Docker Containerization           | ✅ Completed |
| Azure Container Registry          | ✅ Completed |
| Azure Kubernetes Service          | ✅ Completed |
| Azure DevOps Multi-Stage Pipeline | ✅ Completed |
| SonarCloud Integration            | ✅ Completed |
| Trivy Security Scanning           | ✅ Completed |
| Argo CD GitOps                    | ✅ Completed |
| Azure Monitor Integration         | ✅ Completed |
| Engineering Documentation         | ✅ Completed |

The project demonstrates an end-to-end **production-inspired** Azure DevSecOps implementation covering application development, automated validation, secure containerization, cloud deployment, GitOps synchronization, and operational monitoring.

#### Evidence

![Pipeline Success](screenshots/pipeline/13-pipelines-run.png)

*Figure 8.3 – Successful Azure DevOps pipeline execution confirming the implemented DevSecOps workflow.*

---

# 🔐 DevSecOps Implementation Deep Dive

Developing an application is only the first step in modern software engineering.

Enterprise-inspired applications must also ensure that releases are reliable, secure, repeatable, and observable.

FlavorForge achieves this by integrating:

* Automated quality validation
* Security scanning
* Containerization
* Cloud deployment
* Kubernetes orchestration
* GitOps
* Monitoring
* Deployment verification

---

# 🔄 Azure DevOps Multi-Stage Pipeline

The Azure DevOps pipeline is the central automation component of the FlavorForge delivery workflow.

The pipeline contains logical stages for:

```text
Build
  ↓
Test / Validation
  ↓
Security
  ↓
SonarCloud / Code Quality
  ↓
Docker Build
  ↓
Trivy Scan
  ↓
Push to ACR
  ↓
Deploy to AKS
  ↓
Verification / Release Workflow
```

The pipeline demonstrates continuous integration, security validation, containerization, artifact publishing, and Kubernetes deployment.

<img width="355" height="1036" alt="Azure DevOps pipeline" src="https://github.com/user-attachments/assets/c2cb8cd8-ef06-47e4-afc4-407ba42958e4" />

#### Evidence

![Azure DevOps Pipeline](screenshots/pipeline/13-pipelines-run.png)

*Figure 9.1 – Successful execution of the Azure DevOps multi-stage pipeline.*

---

# 🚦 Pipeline Stages

## Stage 1 — Source Validation

The pipeline retrieves the source repository and prepares the build environment.

### Activities

* Checkout source code
* Validate repository structure
* Prepare build environment
* Restore project dependencies

### Objective

Ensure that valid source code progresses through the pipeline.

---

## Stage 2 — Application Build and Validation

The application is built and validated before container images are produced.

### Activities

* Install frontend dependencies
* Install backend dependencies
* Build application artifacts
* Validate application structure
* Run application-level validation

### Objective

Detect application failures early.

---

## Stage 3 — Code Quality Analysis

SonarCloud performs static code analysis.

The analysis evaluates areas such as:

* Bugs
* Code smells
* Maintainability
* Technical debt
* Security hotspots

The project integrates SonarCloud quality validation into the pipeline.

---

## Stage 4 — Docker Build

Frontend and backend applications are packaged into Docker images.

The project uses multi-stage Docker builds where applicable to separate build-time dependencies from production runtime components.

---

## Stage 5 — Trivy Security Scan

Trivy scans container images for known vulnerabilities.

The documented scan results include:

* Backend image: **12 HIGH / 1 CRITICAL**
* Frontend image: **11 HIGH / 0 CRITICAL**

The critical backend finding was associated with the `tar` package. A fixed version was identified.

> Security scanning provides visibility into vulnerabilities. A successful pipeline should not be interpreted as meaning that an image contains zero vulnerabilities.

#### Evidence

![Pipeline Execution](screenshots/pipeline/9-advance-pipelines-run-pass.png)

*Figure 9.2 – Azure DevOps pipeline completing the validation and security stages.*

---

## Stage 6 — Push to Azure Container Registry

After image creation and security validation, images are tagged and published to:

```text
flavorforgeacr2026ms.azurecr.io
```

---

## Stage 7 — Real AKS Deployment

The project contains a **real AKS deployment stage**.

The deployment process:

1. Obtains AKS credentials.
2. Applies the production Kustomize overlay.
3. Updates frontend and backend deployment images.
4. Waits for Kubernetes rollouts to complete.

Conceptually:

```text
Azure DevOps
      │
      ▼
az aks get-credentials
      │
      ▼
kubectl apply -k kubernetes/overlays/prod
      │
      ▼
kubectl set image
      │
      ▼
kubectl rollout status
      │
      ▼
AKS Workloads Updated
```

This is the actual deployment mechanism currently implemented in the project.

---

# 🐳 Docker Containerization Strategy

Docker provides a consistent packaging mechanism for the frontend and backend.

The project uses Docker to provide:

* Reproducible environments
* Portable application artifacts
* Consistent runtime behavior
* Simplified deployment
* Kubernetes compatibility
* Independent frontend/backend scaling

The implementation uses multi-stage builds where applicable to reduce unnecessary build-time components in runtime images.

### Container Architecture

<img width="1386" height="191" alt="Docker container architecture" src="https://github.com/user-attachments/assets/7d562211-e3cc-44a7-8336-bce09a4a8586" />

#### Evidence

![Docker Containers Running](screenshots/docker/10-frontend-backend-container-running.png)

*Figure 10.1 – Frontend and backend containers running successfully using Docker.*

---

# 📦 Azure Container Registry Integration

The project uses Azure Container Registry as the private repository for application images.

| Property     | Value                             |
| ------------ | --------------------------------- |
| Registry     | `flavorforgeacr2026ms`            |
| Login Server | `flavorforgeacr2026ms.azurecr.io` |
| Region       | East US                           |
| SKU          | Basic                             |

### Image Publishing Workflow

<img width="467" height="676" alt="ACR image publishing workflow" src="https://github.com/user-attachments/assets/144f9e74-a0e8-4bc2-b419-b364f10493f7" />

ACR provides:

* Private image storage
* Image version management
* Integration with AKS
* Reliable image distribution
* Centralized container image management

#### Evidence

![Azure Container Registry Images](screenshots/azure/25-acr-images.png)

*Figure 10.2 – Container images successfully stored in Azure Container Registry.*

---

# 🔀 CI/CD and GitOps Responsibility Separation

FlavorForge demonstrates both **Azure DevOps CI/CD automation** and **Argo CD GitOps**.

These technologies have complementary responsibilities in the current implementation.

## Azure DevOps — CI and Current AKS Deployment

Azure DevOps is responsible for:

* Building the application
* Running validation
* SonarCloud analysis
* Building Docker images
* Trivy vulnerability scanning
* Publishing images to ACR
* Performing the current AKS deployment

The actual deployment stage uses Kubernetes tooling to apply the production configuration and update application images.

<img width="432" height="755" alt="Azure DevOps CI workflow" src="https://github.com/user-attachments/assets/205bb4eb-8f3a-4854-9445-74f974151fd5" />

---

## Argo CD — GitOps Synchronization

Argo CD is configured to monitor the Kubernetes configuration stored in Git and synchronize the cluster with the declared desired state.

<img width="397" height="352" alt="Argo CD synchronization" src="https://github.com/user-attachments/assets/0c9e69b6-ff0e-477c-9d82-89c9e497b627" />

### Important Implementation Distinction

> **Azure DevOps performs the current real deployment to AKS. Argo CD demonstrates GitOps-based continuous delivery, desired-state synchronization, and drift visibility.**

This distinction accurately represents the current project implementation.

#### Evidence

![ArgoCD Application](screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 10.3 – Argo CD managing and synchronizing the FlavorForge Kubernetes application.*

---

# 🌱 GitOps Deployment Model

GitOps treats Git as the source of truth for declarative infrastructure and application configuration.

FlavorForge uses Argo CD to demonstrate this model.

## Traditional Deployment

<img width="345" height="372" alt="Traditional deployment" src="https://github.com/user-attachments/assets/71fb101f-dc79-457c-bf19-0f0d456068af" />

---

## GitOps Deployment

<img width="393" height="487" alt="GitOps deployment" src="https://github.com/user-attachments/assets/cfb610d1-0982-4b2e-ad2c-142a58a954c3" />

The GitOps model provides:

* Declarative configuration
* Version-controlled deployment configuration
* Synchronization
* Drift visibility
* Deployment traceability
* Simplified rollback and recovery

> In this project, GitOps is demonstrated alongside the current Azure DevOps AKS deployment rather than being represented as the only deployment mechanism.

---

# 🔒 Security-First Engineering

Security is integrated throughout the FlavorForge software delivery lifecycle.

| Security Layer      | Implementation                             |
| ------------------- | ------------------------------------------ |
| Source Code Quality | SonarCloud                                 |
| Container Security  | Trivy                                      |
| Image Storage       | Private Azure Container Registry           |
| Runtime Platform    | AKS                                        |
| Secrets             | Kubernetes Secrets with placeholder values |
| GitOps              | Argo CD                                    |
| Monitoring          | Azure Monitor                              |

<img width="482" height="1021" alt="Security architecture" src="https://github.com/user-attachments/assets/055ab686-26a5-4c56-aaf5-2360b4f75287" />

The project also documents limitations of the demonstration implementation and identifies stronger production approaches such as **Azure Key Vault** for future enhancement.

#### Evidence

![Pipeline Execution](screenshots/pipeline/9-advance-pipelines-run-pass.png)

*Figure 11.1 – Azure DevOps pipeline successfully completing quality validation and security verification.*

---

# 📊 DevSecOps Maturity Journey

FlavorForge evolved through multiple implementation phases, with each phase introducing additional engineering capabilities.

<img width="410" height="763" alt="DevSecOps maturity journey" src="https://github.com/user-attachments/assets/eb2fb573-0a37-4e2b-997e-772622e51828" />

The project demonstrates the progression from a standalone application to a **production-inspired cloud-native DevSecOps platform**.

---

# ☁️ Cloud Deployment & Operations

After successful validation and containerization, FlavorForge runs on Microsoft Azure using Azure Kubernetes Service.

The platform combines:

* Azure infrastructure
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes
* Kustomize
* Azure DevOps
* Argo CD
* Azure Monitor

---

# ☁️ Azure Cloud Architecture

The primary Azure resources are:

| Resource       | Value / Purpose        |
| -------------- | ---------------------- |
| Resource Group | `flavorforge-rg`       |
| ACR            | `flavorforgeacr2026ms` |
| ACR Region     | East US                |
| ACR SKU        | Basic                  |
| AKS            | `flavorforge-aks`      |
| AKS Region     | East US                |
| AKS Node Size  | `Standard_D2as_v7`     |
| AKS Node Count | 2                      |
| Monitoring     | Azure Monitor          |

<img width="465" height="487" alt="Azure cloud architecture" src="https://github.com/user-attachments/assets/93e23153-cfe5-489a-b507-d49e611c6e15" />

#### Evidence

![Azure Resource Group](screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

*Figure 11.2 – Azure Resource Group containing the cloud infrastructure supporting the FlavorForge platform.*

---

# ☸️ Azure Kubernetes Service

AKS provides the managed Kubernetes environment where FlavorForge workloads run.

AKS provides capabilities for:

* Container scheduling
* Pod lifecycle management
* Replica management
* Service discovery
* Rolling updates
* Kubernetes orchestration
* Workload scaling

The cluster hosts the frontend and backend workloads and integrates with ACR, Kubernetes configuration, Argo CD, and Azure monitoring.

#### Evidence

![AKS Workloads](screenshots/azure/15-AKS%20Workloads%20\(Deployments%20%26%20Pods\).png)

*Figure 11.3 – AKS displaying deployed frontend and backend workloads, ReplicaSets, and running Pods.*

---

# 🧱 Kubernetes Deployment Architecture

FlavorForge uses Kubernetes resources including:

* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
* Horizontal Pod Autoscaler

The Kubernetes configuration is organized using Kustomize.

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

<img width="1923" height="347" alt="Kubernetes deployment architecture" src="https://github.com/user-attachments/assets/dbe015c2-543d-4bf0-8dfb-5f1e06f99656" />

#### Evidence

![Kubernetes Repository Structure](/screenshots/enterprise-azure-devops-release-simulation/7-overlay.png)

*Figure 12.1 – Kustomize base and overlay structure used to manage multiple deployment environments.*

---

# 🔧 Kubernetes Components

## Deployments

Deployments manage application Pods and ReplicaSets.

They provide:

* Desired replica management
* Rolling updates
* Self-healing
* Controlled application updates

<img width="258" height="376" alt="Kubernetes deployments" src="https://github.com/user-attachments/assets/a8b284e0-9a75-49a6-ba99-3b3f096ab7bc" />

#### Evidence

![Deployments](/screenshots/azure/15-aks-workloads-deployments-pods.png)

*Figure 12.2 – AKS Deployments managing frontend and backend application Pods.*

---

## Services

Kubernetes Services provide stable networking between workloads.

They abstract changing Pod IP addresses and provide service discovery.

<img width="341" height="630" alt="Kubernetes services" src="https://github.com/user-attachments/assets/893dfe1e-9b71-4f61-8fe1-f63b8cc76e73" />

#### Evidence

![Services and Ingress](/screenshots/azure/22-services-ingress.png)

*Figure 12.3 – Kubernetes Services and Ingress resources exposing the FlavorForge application.*

---

## ConfigMaps

ConfigMaps store non-sensitive configuration separately from container images.

Examples include:

* Environment configuration
* Application settings
* Runtime configuration

#### Evidence

![ConfigMap](/screenshots/kubernetes/1-configmap.png)

*Figure 12.4 – Kubernetes ConfigMap used to manage application configuration.*

---

## Secrets

Kubernetes Secrets are used for sensitive configuration.

The demonstration repository uses placeholder values where secrets need to be represented in Git.

> **Production deployments should use an external secret-management solution such as Azure Key Vault rather than committing sensitive values to source control.**

Examples include:

* API credentials
* Passwords
* Access tokens

#### Evidence

![Kubernetes Secrets](screenshots/kubernetes/secrets/1-kubectl-get-secrets-n-flavorforge.png)

*Figure 12.5 – Kubernetes Secrets managing sensitive application configuration.*

---

## Horizontal Pod Autoscaler

FlavorForge includes a Horizontal Pod Autoscaler.

The documented configuration includes:

| Setting          | Value |
| ---------------- | ----: |
| Minimum replicas |     2 |
| Maximum replicas |     5 |
| CPU target       |   70% |
| Current replicas |     2 |

<img width="482" height="227" alt="Horizontal Pod Autoscaler" src="https://github.com/user-attachments/assets/e213a194-de05-4c98-9a95-6dfe639c49b7" />

HPA allows Kubernetes to adjust the number of replicas based on resource utilization.

#### Evidence

![Horizontal Pod Autoscaler](screenshots/kubernetes/hpa/6-kubectl-get-hpa.png)

*Figure 12.6 – Horizontal Pod Autoscaler configured to scale application workloads.*

---

# 🌍 Application Exposure with Ingress

Kubernetes Ingress provides an external entry point for the application.

The request flow is:

```text
External User
      │
      ▼
    Ingress
      │
      ├──────────────► Frontend Service
      │
      └──────────────► Backend Service
```

<img width="343" height="777" alt="Ingress architecture" src="https://github.com/user-attachments/assets/acb9af6b-dca3-40c7-9a63-50cc7dd2d339" />

Ingress provides:

* Centralized traffic routing
* Simplified external access
* Reduced service exposure
* Scalable application architecture
* Better maintainability

#### Evidence

![Services and Ingress](screenshots/azure/22-Services%20%26%20Ingress.png)

*Figure 13.1 – Kubernetes Services and Ingress routing external traffic to the FlavorForge application.*

---

# 🔄 Kustomize Environment Management

Kustomize allows common Kubernetes resources to be reused while maintaining environment-specific configuration.

```text
base/
│
├── deployments
├── services
├── configmaps
└── other common resources

overlays/
├── dev/
├── qa/
└── prod/
```

Benefits include:

* Reduced YAML duplication
* Reusable configuration
* Environment-specific customization
* Easier maintenance
* Consistent Kubernetes configuration

The current real AKS deployment uses:

```bash
kubectl apply -k kubernetes/overlays/prod
```

<img width="647" height="528" alt="Kustomize overlays" src="https://github.com/user-attachments/assets/67199aad-4ad0-47eb-b64a-88bcc322c7e3" />

#### Evidence

![Kustomize Overlay Structure](screenshots/enterprise-azure-devops-release-simulation/7-overlay.png)

*Figure 13.2 – Base and overlay structure used for Development, QA, and Production environments.*

---

# 🚀 GitOps with Argo CD

Argo CD is installed in the AKS environment and configured with a FlavorForge Application definition.

The expected healthy state is:

```text
Sync Status : Synced
Health      : Healthy
```

Argo CD provides:

* Git-based desired state
* Kubernetes synchronization
* Drift visibility
* Application health information
* Deployment traceability

## Traditional Deployment

<img width="352" height="356" alt="Traditional deployment" src="https://github.com/user-attachments/assets/18b2af9e-c863-40b6-b304-e66c572e8f3d" />

---

## GitOps Deployment

<img width="457" height="497" alt="GitOps deployment" src="https://github.com/user-attachments/assets/3acaa746-9581-46da-8e5b-d45ed2ea8c3b" />

#### Evidence

![ArgoCD Application Tree](screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 13.3 – Argo CD managing and synchronizing the FlavorForge application deployed on AKS.*

---

# 🧭 GitOps Deployment Workflow

The GitOps demonstration follows this conceptual model:

```text
Git Repository
      │
      ▼
Kubernetes Manifests
      │
      ▼
    Argo CD
      │
      ▼
    AKS Cluster
      │
      ▼
Running Workloads
```

<img width="427" height="1077" alt="GitOps deployment workflow" src="https://github.com/user-attachments/assets/1c4cd177-946b-4e78-bf31-08f0a41c7dd4" />

This workflow demonstrates:

* Declarative configuration
* Git-based desired state
* Synchronization
* Drift detection
* Deployment traceability
* Operational visibility

> **Note:** This GitOps model is demonstrated alongside the current Azure DevOps AKS deployment stage.

---

# 📊 Monitoring & Operations

Operating a cloud-native application requires more than a successful deployment.

FlavorForge combines Kubernetes health information with Azure monitoring capabilities to provide operational visibility.

<img width="635" height="508" alt="Monitoring architecture" src="https://github.com/user-attachments/assets/24a4ceb2-981b-4abc-983b-20cf5bbc8814" />

Operational verification includes:

* Cluster health
* Pod availability
* Deployment health
* Service status
* Ingress status
* Workload scaling
* Application availability

#### Evidence

![Azure Kubernetes Center](screenshots/azure/16-kubernetes-center-microsoft-azure.png)

*Figure 14.1 – Azure Kubernetes Service dashboard providing operational visibility into the FlavorForge cluster.*

---

# 🩺 Deployment Verification

Deployment verification is performed at multiple layers.

The objective is to avoid relying on a single pipeline-success indicator.

| Verification              | Status |
| ------------------------- | :----: |
| Frontend Application      |    ✅   |
| Backend REST API          |    ✅   |
| Docker Images             |    ✅   |
| Azure Container Registry  |    ✅   |
| Kubernetes Deployments    |    ✅   |
| Kubernetes Pods           |    ✅   |
| Services                  |    ✅   |
| Ingress                   |    ✅   |
| HPA                       |    ✅   |
| Argo CD Synchronization   |    ✅   |
| Application Accessibility |    ✅   |

A deployment is considered verified only after checking the actual Kubernetes workloads and application behavior.

#### Evidence

![AKS Workloads](/screenshots/azure/15-aks-workloads-deployments-pods.png)

*Figure 14.2 – Running frontend and backend workloads successfully verified within Azure Kubernetes Service.*

---

# 💻 Local Development

Developers can run FlavorForge locally for development, testing, or troubleshooting.

## Prerequisites

Install:

* Git
* Node.js 20+
* npm
* Docker Desktop

Verify:

```bash
git --version
node --version
npm --version
docker --version
```

### Evidence

#### Node.js Installation

<img width="727" height="132" alt="Node.js installation" src="https://github.com/user-attachments/assets/97a3efaa-9f8c-47bd-b6c3-25d529feb5ce" />

#### npm Project Setup

<img width="1056" height="887" alt="npm project setup" src="https://github.com/user-attachments/assets/aeea4b6d-190d-4eed-a453-5beedf9b8cd1" />

---

## Clone Repository

```bash
git clone https://github.com/bymalathi/flavorforge-azure-devsecops-capstone.git

cd flavorforge-azure-devsecops-capstone
```

---

## Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

## Run Application

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm run dev
```

The application can then be accessed locally for development and testing.

### Evidence

#### Frontend Running

<img width="2217" height="1227" alt="Frontend running" src="https://github.com/user-attachments/assets/34d91fdd-719e-4755-9fb4-51e1d2ba14da" />

#### Backend Running

<img width="836" height="517" alt="Backend running" src="https://github.com/user-attachments/assets/b0d254bf-b2ba-4a7f-976c-17500865719d" />

---

# 🐳 Running with Docker

FlavorForge can also be executed locally using Docker.

## Build Images

```bash
docker build -t flavorforge-frontend ./frontend

docker build -t flavorforge-backend ./backend
```

## Run Containers

```bash
docker run -d -p 3000:3000 flavorforge-backend

docker run -d -p 5173:80 flavorforge-frontend
```

Or, if Docker Compose is configured:

```bash
docker compose up --build -d
```

### Evidence

#### Docker Build

<img width="1311" height="1220" alt="Docker build" src="https://github.com/user-attachments/assets/cafc0657-7625-409b-b48b-b925b15e52ce" />

#### Docker Images

<img width="1462" height="185" alt="Docker images" src="https://github.com/user-attachments/assets/683d3e26-5d0b-4126-b1f2-d2aa696a4b7e" />

#### Running Containers

<img width="1262" height="822" alt="Running Docker containers" src="https://github.com/user-attachments/assets/2c0afd7f-815f-487f-960c-1c2e62576500" />

#### Docker Compose

<img width="1747" height="112" alt="Docker Compose" src="https://github.com/user-attachments/assets/ec62cef1-b74d-4d28-aaad-4d2de917ceed" />

---

# 🔍 Deployment Verification & Troubleshooting

After deployment, verify the Kubernetes resources and application health.

## Verify Kubernetes Resources

```bash
kubectl get pods

kubectl get svc

kubectl get ingress

kubectl get deployments

kubectl get hpa
```

## View Pod Logs

```bash
kubectl logs <pod-name>
```

## Describe a Pod

```bash
kubectl describe pod <pod-name>
```

## Verify Argo CD

```bash
argocd app list

argocd app get flavorforge-app
```

Expected:

```text
Health : Healthy
Sync Status : Synced
```

### Evidence

#### kubectl get all

<img width="1025" height="467" alt="kubectl get all" src="https://github.com/user-attachments/assets/667dfda7-b425-4ff3-87dd-27dac3c49dd4" />

#### Ingress

<img width="1197" height="617" alt="Ingress" src="https://github.com/user-attachments/assets/3868a8b1-adb3-4231-be36-9009b77b7db3" />

#### Argo CD

<img width="2560" height="2769" alt="Argo CD" src="https://github.com/user-attachments/assets/d24dcf5f-226e-41df-a071-06e2a725ceb1" />

For detailed troubleshooting procedures, see the Week 4 troubleshooting documentation.

---

# 🧹 Cleanup & Azure Cost Management

Azure resources can incur costs while running.

After demonstrations or testing, remove resources that are no longer required.

## Recommended Practices

* Delete unused Resource Groups
* Remove unnecessary ACR images
* Review AKS resources
* Monitor Azure spending
* Use appropriately sized development resources
* Clean up resources after demonstrations

## Automation Scripts

```text
scripts/
├── setup.sh
├── deploy.sh
├── verify.sh
└── clean.sh
```

The cleanup script can be executed using:

```bash
./scripts/clean.sh
```

### Evidence

#### Resource Group

<img width="2560" height="1229" alt="Azure Resource Group" src="https://github.com/user-attachments/assets/73470ec4-05b4-4007-af46-adae6271e4e1" />

#### Azure Resources

<img width="2560" height="1229" alt="Azure resources" src="https://github.com/user-attachments/assets/5d38f2c5-355a-40b3-98c8-3c0b32a7d02b" />

---

# 📖 Documentation

The project documentation is organized as a **BUILD-JOURNEY**, allowing a reviewer to follow the implementation chronologically.

The primary documentation covers:

```text
01 Prerequisites
02 GitHub
03 Application
04 Docker
05 Azure
06 Kubernetes
07 Kustomize
08 Azure DevOps
09 SonarCloud
10 Trivy
11 Argo CD
12 DevSecOps
13 Documentation
14 Troubleshooting
15 Final Verification
```

The Week 4 BUILD-JOURNEY contains implementation steps, commands, expected results, actual evidence, screenshots, and explanations.

### Main Documentation

👉 **[Week 4 BUILD-JOURNEY](docs/week-4/BUILD-JOURNEY/README.md)**

#### Evidence

![Documentation Structure](screenshots/enterprise-azure-devops-release-simulation/24-ls-docs.png)

*Figure 14.3 – Repository documentation structure supporting the complete FlavorForge implementation.*

---

# 🧪 Verification Checklist

The following components were implemented and verified during the project lifecycle.

| Component                 | Verification |
| ------------------------- | :----------: |
| React Frontend            |       ✅      |
| Node.js Backend           |       ✅      |
| Docker Images             |       ✅      |
| Azure Container Registry  |       ✅      |
| Azure Kubernetes Service  |       ✅      |
| Kubernetes Deployments    |       ✅      |
| Kubernetes Services       |       ✅      |
| Ingress                   |       ✅      |
| HPA                       |       ✅      |
| Azure DevOps Pipeline     |       ✅      |
| SonarCloud Analysis       |       ✅      |
| Trivy Security Scan       |       ✅      |
| Argo CD GitOps            |       ✅      |
| Azure Monitor             |       ✅      |
| Engineering Documentation |       ✅      |

This verification demonstrates the complete production-inspired Azure DevSecOps workflow implemented by FlavorForge.

---

# 🚀 Future Enhancements

FlavorForge is a **production-inspired** implementation rather than a claim of a fully enterprise production platform.

Possible future improvements include:

## Progressive Delivery

* Blue-Green deployments
* Canary deployments
* Automated rollback
* Argo Rollouts

## Enhanced Security

* Azure Key Vault
* Azure Policy
* OPA / Gatekeeper
* Kubernetes Network Policies
* Pod Security Standards
* External secret management

## Advanced Observability

* Prometheus
* Grafana
* Centralized logging
* Distributed tracing
* Advanced alerting

## Infrastructure as Code

* Terraform-based Azure provisioning
* Automated infrastructure lifecycle management
* Infrastructure drift detection

## Performance Engineering

* Automated load testing
* Performance benchmarking
* Capacity planning
* Resilience testing

These enhancements would further improve the platform's security, scalability, resilience, observability, and operational maturity.

---

# 🎬 Demo Walkthrough

A recommended demonstration sequence is:

1. Introduce the FlavorForge application.
2. Explain the overall architecture.
3. Show the GitHub repository structure.
4. Show the Azure infrastructure.
5. Explain the Azure DevOps pipeline.
6. Demonstrate code-quality validation with SonarCloud.
7. Demonstrate container vulnerability scanning with Trivy.
8. Show Docker images stored in Azure Container Registry.
9. Show the AKS workloads.
10. Show Kubernetes Services and Ingress.
11. Show the Horizontal Pod Autoscaler.
12. Show Argo CD synchronization and GitOps state.
13. Access the running FlavorForge application.
14. Verify the backend health endpoint.
15. Review the final verification evidence.

The demonstration should tell **one continuous story**:

```text
Code
  ↓
GitHub
  ↓
Azure DevOps
  ↓
Build / Validate
  ↓
SonarCloud
  ↓
Docker Build
  ↓
Trivy
  ↓
Azure Container Registry
  ↓
Real AKS Deployment
  ↓
Kubernetes / Kustomize
  ↓
Application
  ↓
Argo CD GitOps Synchronization
  ↓
Monitoring
  ↓
Verification
```

> **Important:** The current implementation contains a real Azure DevOps → AKS deployment stage. Argo CD is implemented alongside it to demonstrate GitOps synchronization and desired-state management.

#### Evidence

![Azure DevOps Pipeline](screenshots/pipeline/13-pipelines-run.png)

*Figure 15.1 – Successful Azure DevOps pipeline execution used during the project demonstration.*

---

# 📚 Key Learning Outcomes

This capstone provided practical experience across the complete DevSecOps lifecycle.

Key areas include:

* Full-stack application development
* Git and GitHub
* Docker containerization
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes deployments
* Kustomize
* Azure DevOps pipelines
* SonarCloud
* Trivy
* Argo CD
* GitOps concepts
* Kubernetes autoscaling
* Ingress
* Azure monitoring
* Deployment verification
* Troubleshooting
* Engineering documentation

The project demonstrates how application development, security, automation, cloud infrastructure, Kubernetes, GitOps, and operations can be combined into a unified DevSecOps workflow.

---

# 📚 Documentation Index

The FlavorForge documentation is organized to support the complete journey from local development to cloud deployment, GitOps operations, verification, troubleshooting, and project demonstration.

## 🚀 Getting Started

| #  | Documentation                                               | Purpose                                           |
| -- | ----------------------------------------------------------- | ------------------------------------------------- |
| 01 | [Week 4 BUILD-JOURNEY](docs/week-4/BUILD-JOURNEY/README.md) | Complete Week 4 implementation journey            |
| 02 | [Week 4 Documentation](docs/week-4/)                        | Complete Week 4 documentation                     |
| 03 | [Kubernetes](kubernetes/README.md)                          | Kubernetes manifests and deployment configuration |
| 04 | [Argo CD](argocd/README.md)                                 | GitOps configuration                              |
| 05 | [Docker](docker/README.md)                                  | Containerization                                  |
| 06 | [Frontend](frontend/README.md)                              | Frontend documentation                            |
| 07 | [Backend](backend/README.md)                                | Backend documentation                             |
| 08 | [Scripts](scripts/README.md)                                | Automation scripts                                |

## ☁️ Azure & CI/CD

| #  | Documentation                                    | Purpose                                         |
| -- | ------------------------------------------------ | ----------------------------------------------- |
| 09 | [Azure DevOps Pipeline](docs/pipeline/README.md) | CI/CD pipeline stages and execution             |
| 10 | [Kubernetes](kubernetes/README.md)               | Kubernetes manifests and Kustomize environments |
| 11 | [Argo CD GitOps](argocd/README.md)               | GitOps deployment and synchronization           |
| 12 | [Azure Architecture](docs/architecture/)         | Cloud and application architecture              |

## 🔍 Verification & Operations

| #  | Documentation                                                               | Purpose                                             |
| -- | --------------------------------------------------------------------------- | --------------------------------------------------- |
| 13 | [Verification Reports](docs/project/04-verification-and-validation-report/) | Deployment and implementation verification evidence |
| 14 | [Troubleshooting Guide](docs/troubleshooting/README.md)                     | Common problems and resolution procedures           |
| 15 | [Cleanup & Cost Management](docs/cleanup/README.md)                         | Azure resource cleanup and cost-control guidance    |
| 16 | [API Documentation](docs/api/README.md)                                     | Backend API reference and health endpoints          |

## 🏛️ Engineering Governance

| #  | Documentation                  | Purpose                                        |
| -- | ------------------------------ | ---------------------------------------------- |
| 17 | [Security Policy](SECURITY.md) | Security practices and vulnerability reporting |
| 18 | [License](LICENSE)             | MIT License                                    |

> **Recommended reading order:**
>
> **BUILD-JOURNEY → Azure → Kubernetes → Kustomize → Azure DevOps → SonarCloud → Trivy → Argo CD → Troubleshooting → Final Verification**

---

# 🔐 Security

Security practices, vulnerability reporting, and secret-management guidance are documented in:

[SECURITY.md](SECURITY.md)

---

# 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for details.

---

# 🙏 Acknowledgements

This project was completed as part of the **CareerByteCode (CBC) DevSecOps Internship** and provided practical experience with:

* Cloud-native development
* DevSecOps automation
* Kubernetes orchestration
* GitOps
* Microsoft Azure
* CI/CD
* Container security
* Engineering documentation

Special thanks to the CBC mentors and the DevOps community for their guidance, learning resources, and engineering practices.

---

# 👩‍💻 Author

**Malathi Shetty**

Senior Software Test Engineer transitioning into DevSecOps and Cloud Engineering.

### Connect

* GitHub: [bymalathi](https://github.com/bymalathi)
* LinkedIn: [Malathi Shetty](https://www.linkedin.com/in/bymalathi/)

---

> **FlavorForge demonstrates how a full-stack application can be transformed into a production-inspired Azure DevSecOps platform through automation, security, containerization, Kubernetes, GitOps, and operational verification.**
