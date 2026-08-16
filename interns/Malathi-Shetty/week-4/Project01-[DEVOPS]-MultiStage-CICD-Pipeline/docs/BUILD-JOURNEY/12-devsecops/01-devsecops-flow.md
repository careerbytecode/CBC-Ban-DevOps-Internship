# 01 — DevSecOps Flow

## Overview

FlavorForge follows a DevSecOps approach where application development, security validation, containerization, and deployment are connected through an automated delivery pipeline.

The objective is to ensure that security and quality checks are performed **during the software delivery process**, rather than only after deployment.

The overall FlavorForge flow is:

```text
GitHub
   ↓
Build
   ↓
Test
   ↓
Security Scan
   ↓
SonarCloud Quality Gate
   ↓
Docker Image Build
   ↓
Trivy Image Scan
   ↓
Push Image to Azure Container Registry
   ↓
Deploy to Azure Kubernetes Service
   ↓
Argo CD / GitOps
   ↓
FlavorForge Application
```

---

## 1. DevSecOps Objective

The FlavorForge project demonstrates how development, operations, and security practices can be integrated into a single delivery workflow.

The pipeline is designed to:

* Build the application automatically.
* Execute application tests.
* Perform security scanning.
* Analyze source code quality.
* Build optimized Docker images.
* Scan container images for vulnerabilities.
* Push validated images to Azure Container Registry.
* Deploy the application to Azure Kubernetes Service.
* Use Argo CD for GitOps-based deployment management.
* Maintain security and deployment evidence through reports and screenshots.

The important principle is:

```text
Security is part of the delivery pipeline.
```

It is not treated as a separate activity performed only at the end.

---

## 2. FlavorForge DevSecOps Architecture

The complete workflow can be represented as:

```text
                    ┌─────────────────┐
                    │     GitHub      │
                    │ Source Code     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Build      │
                    │ Maven / App     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Test       │
                    │ Application     │
                    │ Validation      │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │       Security & Quality     │
              │                              │
              │  SonarCloud                  │
              │  Trivy                       │
              └──────────────┬───────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Docker Build   │
                    │ Backend/Frontend│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Trivy Image   │
                    │      Scan       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      ACR        │
                    │ Azure Container │
                    │    Registry     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      AKS        │
                    │ Kubernetes      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Argo CD      │
                    │     GitOps      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   FlavorForge   │
                    │   Application   │
                    └─────────────────┘
```

---

## 3. Source Code

The process starts with the FlavorForge source code stored in GitHub.

The repository contains:

```text
FlavorForge
├── Frontend
├── Backend
├── Docker configuration
├── Kubernetes manifests
├── Kustomize configuration
├── Azure DevOps pipeline
└── Argo CD configuration
```

Git provides version control and acts as the source of truth for the project configuration.

A change pushed to the repository can therefore move through the automated delivery process.

---

## 4. Build Stage

The first pipeline stage validates that the application can be built successfully.

The build process compiles the application and prepares the artifacts required for subsequent stages.

Conceptually:

```text
Source Code
    ↓
Dependency Resolution
    ↓
Compilation
    ↓
Build Artifact
```

A successful build allows the pipeline to continue to testing and security validation.

---

## 5. Test Stage

After the application is built, automated tests are executed.

The purpose of this stage is to detect functional problems before the application proceeds further through the delivery pipeline.

The flow is:

```text
Build
  ↓
Automated Tests
  ↓
Test Result
  ↓
Continue if successful
```

This prevents an unsuccessful build or test result from being treated as a deployment-ready application.

---

## 6. Source Code Quality

SonarCloud is integrated into the DevSecOps workflow to analyze source-code quality.

The analysis helps identify issues such as:

* Bugs
* Code smells
* Security-related issues
* Maintainability problems
* Technical debt

The pipeline uses the SonarCloud Quality Gate as an important quality validation point.

```text
Source Code
     ↓
SonarCloud Analysis
     ↓
Quality Gate
     ↓
Pass → Continue
Fail → Review / Remediate
```

The FlavorForge project therefore combines application testing with automated source-code quality analysis.

---

## 7. Trivy Security Scanning

Trivy provides vulnerability scanning as part of the security workflow.

Two important areas are covered:

```text
Filesystem / Dependencies
        +
Docker Images
```

The generated security evidence is stored under:

```text
reports/trivy/
```

The reports include machine-readable JSON output and human-readable TXT output.

Trivy findings are categorized by severity, including:

```text
UNKNOWN
LOW
MEDIUM
HIGH
CRITICAL
```

The purpose of the scan is not simply to produce a successful command execution.

A completed Trivy scan means that the security analysis ran successfully; the actual vulnerability findings must still be reviewed and remediated.

---

## 8. Docker Image Build

After the application and quality/security stages, Docker images are built for the FlavorForge services.

The containerization flow is:

```text
Application Source
       ↓
Dockerfile
       ↓
Docker Build
       ↓
Backend Image
       +
Frontend Image
```

The project uses Docker images as the deployable application artifacts.

These images are then subjected to vulnerability scanning before being promoted to the container registry.

---

## 9. Container Image Security

Trivy is also used to scan the generated Docker images.

The image security flow is:

```text
Docker Image
     ↓
Trivy Image Scan
     ↓
Vulnerability Report
     ↓
Review Findings
     ↓
Continue with Deployment Process
```

This provides an additional security layer because an application can pass source-code analysis while its container image may still contain vulnerable operating-system packages or dependencies.

The Trivy reports therefore provide evidence at the container level.

---

## 10. Azure Container Registry

Validated container images are pushed to Azure Container Registry (ACR).

The FlavorForge registry is:

```text
flavorforgeacr2026ms.azurecr.io
```

The flow is:

```text
Docker Image
     ↓
Trivy Scan
     ↓
Azure Container Registry
     ↓
Stored Container Image
```

ACR acts as the container image registry used by the Azure deployment environment.

---

## 11. Azure Kubernetes Service

Azure Kubernetes Service provides the Kubernetes runtime environment for FlavorForge.

The deployment flow is:

```text
ACR
 ↓
AKS
 ↓
Kubernetes Deployments
 ↓
Pods
 ↓
Services
 ↓
Ingress
```

The FlavorForge Kubernetes environment contains the application components required to run the frontend and backend services.

Kubernetes also provides operational capabilities such as:

* Replica management
* Service discovery
* Ingress routing
* Horizontal Pod Autoscaling
* Self-healing of workloads

---

## 12. Argo CD and GitOps

Argo CD provides the GitOps layer of the FlavorForge deployment architecture.

The GitOps relationship is:

```text
Git Repository
      ↓
    Argo CD
      ↓
Kubernetes Cluster
      ↓
FlavorForge Application
```

Argo CD continuously tracks the desired application configuration stored in Git and compares it with the state running in Kubernetes.

For the FlavorForge application, the final Argo CD verification showed:

```text
Application:  flavorforge
Sync Status:  Synced
Health:       Healthy
```

This provides evidence that the FlavorForge Argo CD Application was synchronized successfully and reported a healthy state.

---

## 13. Complete Delivery Flow

The complete DevSecOps journey can therefore be summarized as:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Build
    │
    ▼
Test
    │
    ▼
SonarCloud
    │
    ▼
Quality Gate
    │
    ▼
Docker Build
    │
    ▼
Trivy Image Scan
    │
    ▼
Azure Container Registry
    │
    ▼
Azure Kubernetes Service
    │
    ▼
Argo CD
    │
    ▼
GitOps Synchronization
    │
    ▼
FlavorForge
    │
    ▼
Healthy Application
```

---

## 14. Security in the Delivery Lifecycle

Security is distributed across multiple stages instead of being performed only after deployment.

```text
             DEVSECOPS
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
    Source     Image     Deployment
    Security   Security  Security
       │         │         │
       ▼         ▼         ▼
  SonarCloud   Trivy      AKS
               Scan       + Argo CD
```

This layered approach helps detect problems at different points in the software lifecycle.

---

## 15. Evidence Generated

The DevSecOps implementation is supported by project evidence including:

```text
GitHub repository
Azure DevOps pipeline
SonarCloud Quality Gate
Trivy reports
Docker images
Azure Container Registry
AKS resources
Kubernetes resources
Argo CD application
Argo CD synchronization status
```

The evidence is maintained through the project's documentation and screenshots.

---

## 16. Final DevSecOps Flow

The FlavorForge project demonstrates the following delivery model:

```text
┌─────────────┐
│   GitHub    │
└──────┬──────┘
       ↓
┌─────────────┐
│ Build/Test  │
└──────┬──────┘
       ↓
┌─────────────┐
│  SonarCloud │
│ Quality Gate│
└──────┬──────┘
       ↓
┌─────────────┐
│ Docker Build│
└──────┬──────┘
       ↓
┌─────────────┐
│    Trivy    │
│ Image Scan  │
└──────┬──────┘
       ↓
┌─────────────┐
│     ACR     │
└──────┬──────┘
       ↓
┌─────────────┐
│     AKS     │
└──────┬──────┘
       ↓
┌─────────────┐
│   Argo CD   │
│    GitOps   │
└──────┬──────┘
       ↓
┌─────────────┐
│ FlavorForge │
│   Healthy   │
└─────────────┘
```

---

## 17. Outcome

The FlavorForge DevSecOps workflow brings together:

* **GitHub** for source control
* **Azure DevOps** for CI/CD orchestration
* **SonarCloud** for source-code quality analysis
* **Trivy** for vulnerability scanning
* **Docker** for containerization
* **Azure Container Registry** for image storage
* **AKS** for Kubernetes-based application deployment
* **Argo CD** for GitOps deployment management

The result is a delivery workflow where **code quality, security scanning, containerization, deployment, and GitOps management are connected into a single lifecycle**.

The next document focuses on how the security controls are implemented inside the pipeline:

**➡️ `12-devsecops/02-security-in-pipeline.md`**
