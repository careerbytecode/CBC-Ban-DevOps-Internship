# 🚀 Week 4 — FlavorForge Azure DevSecOps Capstone

## Production-Inspired Azure DevSecOps Platform

Week 4 of the CareerByteCode DevOps Internship was completed as a hands-on **Azure DevSecOps Capstone Project** called **FlavorForge**.

FlavorForge is a full-stack recipe-sharing application transformed into a production-inspired cloud-native platform using:

- React + Vite
- Node.js + Express
- Docker
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Kubernetes
- Kustomize
- Azure DevOps
- SonarCloud
- Trivy
- Argo CD
- Azure Monitor
- Kubernetes HPA
- Ingress

---

## 📌 Important — Complete Project Repository

The **complete Week 4 implementation is maintained in the dedicated FlavorForge repository**.

👉 **FlavorForge — Azure DevSecOps Capstone**

https://github.com/bymalathi/flavorforge-azure-devsecops-capstone

The FlavorForge repository contains the complete application, infrastructure, Kubernetes manifests, CI/CD pipeline, GitOps configuration, security implementation, screenshots, troubleshooting documentation, and final verification evidence.

---

## 📖 Complete Week 4 Documentation

The complete implementation journey is documented here:

👉 **[Week 4 BUILD-JOURNEY](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/tree/main/docs/week-4/BUILD-JOURNEY)**

The BUILD-JOURNEY provides a chronological walkthrough of the implementation.

It covers:

1. Prerequisites and Setup
2. GitHub Repository Setup
3. Application Development
4. Docker Containerization
5. Azure Container Registry
6. Azure Kubernetes Service
7. Kubernetes
8. Kustomize
9. Azure DevOps
10. SonarCloud
11. Trivy
12. Argo CD
13. DevSecOps Implementation
14. Documentation
15. Troubleshooting
16. Final Verification

---

## 🏗️ Project Overview

FlavorForge began as a full-stack recipe-sharing application and was progressively transformed into a production-inspired Azure DevSecOps platform.

The engineering journey follows:

```text
Application
     ↓
GitHub
     ↓
Docker
     ↓
Azure Container Registry
     ↓
Kubernetes
     ↓
Azure Kubernetes Service
     ↓
Azure DevOps
     ↓
Build / Validate
     ↓
SonarCloud
     ↓
Trivy
     ↓
Real AKS Deployment
     ↓
Kustomize
     ↓
Argo CD / GitOps
     ↓
Monitoring
     ↓
Verification
````

---

## ☁️ Azure Infrastructure

The project uses Microsoft Azure for the cloud infrastructure.

| Resource                 | Value                             |
| ------------------------ | --------------------------------- |
| Resource Group           | `flavorforge-rg`                  |
| Azure Container Registry | `flavorforgeacr2026ms`            |
| ACR Login Server         | `flavorforgeacr2026ms.azurecr.io` |
| ACR Region               | East US                           |
| ACR SKU                  | Basic                             |
| AKS Cluster              | `flavorforge-aks`                 |
| AKS Region               | East US                           |
| AKS Node Size            | `Standard_D2as_v7`                |
| AKS Node Count           | 2                                 |

---

## 🔄 DevSecOps Pipeline

Azure DevOps is used to implement the CI/CD workflow.

The pipeline includes logical stages for:

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

The project contains a **real Azure DevOps → AKS deployment stage**.

The deployment process uses:

```bash
az aks get-credentials
kubectl apply -k kubernetes/overlays/prod
kubectl set image
kubectl rollout status
```

The Dev, QA, and Production release stages also demonstrate environment and approval workflow concepts; they should not be interpreted as three separate real AKS deployments.

---

## 🔐 Security

Security is integrated into the delivery lifecycle using:

* **SonarCloud** — code quality and static analysis
* **Trivy** — container vulnerability scanning
* **Azure Container Registry** — private image storage
* **Kubernetes Secrets** — sensitive configuration representation
* **Argo CD** — GitOps desired-state management
* **Azure Monitor / Kubernetes health** — operational visibility

Documented Trivy results include:

* Backend image: **12 HIGH / 1 CRITICAL**
* Frontend image: **11 HIGH / 0 CRITICAL**

The project documents these findings rather than claiming that a successful pipeline means zero vulnerabilities.

---

## ☸️ Kubernetes

FlavorForge is deployed to Azure Kubernetes Service using Kubernetes resources including:

* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
* Horizontal Pod Autoscaler

Kubernetes configuration is organized using Kustomize:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The current real AKS deployment uses:

```bash
kubectl apply -k kubernetes/overlays/prod
```

---

## 🌱 GitOps with Argo CD

Argo CD is implemented to demonstrate GitOps concepts including:

* Declarative configuration
* Git-based desired state
* Synchronization
* Drift visibility
* Application health
* Deployment traceability

### Important Implementation Detail

Azure DevOps currently performs the **real AKS deployment stage**.

Argo CD is implemented alongside it to demonstrate **GitOps synchronization and desired-state management**.

Therefore, the project does not claim that Argo CD is the only deployment mechanism.

---

## 📊 Verification

The final implementation was verified at multiple layers:

* Frontend application
* Backend API
* Docker images
* Azure Container Registry
* AKS workloads
* Kubernetes Deployments
* Kubernetes Pods
* Services
* Ingress
* HPA
* Argo CD synchronization
* Application accessibility

The goal was to verify not only that the pipeline completed successfully, but also that the deployed application and Kubernetes workloads were actually functioning.

---

## 📚 Documentation

The complete documentation is available in the FlavorForge repository:

👉 **FlavorForge Repository**

[https://github.com/bymalathi/flavorforge-azure-devsecops-capstone](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone)

👉 **Week 4 BUILD-JOURNEY**

[https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/tree/main/docs/week-4/BUILD-JOURNEY](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/tree/main/docs/week-4/BUILD-JOURNEY)

The BUILD-JOURNEY contains implementation steps, commands, expected results, actual results, screenshots, troubleshooting procedures, and final verification evidence.

---

## 🎯 Learning Outcomes

Through this Week 4 capstone, I gained hands-on experience with:

* Git and GitHub
* Docker
* Azure Container Registry
* Azure Kubernetes Service
* Kubernetes
* Kustomize
* Azure DevOps
* SonarCloud
* Trivy
* Argo CD
* GitOps concepts
* Kubernetes HPA
* Ingress
* Azure monitoring
* Deployment verification
* DevSecOps practices
* Technical documentation

---

## 👩‍💻 Author

**Malathi Shetty**

Senior Software Test Engineer transitioning into DevSecOps and Cloud Engineering.

GitHub: [https://github.com/bymalathi](https://github.com/bymalathi)

LinkedIn: [https://www.linkedin.com/in/bymalathi/](https://www.linkedin.com/in/bymalathi/)

---
