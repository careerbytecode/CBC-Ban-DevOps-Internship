# FlavorForge Build Journey

The **FlavorForge Build Journey** documents the complete process of rebuilding the FlavorForge Azure DevSecOps Capstone project from the beginning through final verification.

The documentation is organized as a chronological learning path. Each section explains what was built, why it was built, how it was configured, how it was verified, and where to find troubleshooting and final verification guidance.

---

## FlavorForge – Use Case

- Build a modern full-stack recipe-sharing web application.
- Demonstrate an end-to-end Azure DevSecOps implementation.
- Automate CI/CD using Azure DevOps Pipelines.
- Perform code quality analysis with SonarCloud.
- Scan container images for vulnerabilities using Trivy.
- Containerize the application using Docker.
- Store Docker images in Azure Container Registry (ACR).
- Deploy and manage the application on Azure Kubernetes Service (AKS).
- Implement GitOps-based continuous deployment using Argo CD.
- Monitor and manage the application using Azure Monitor.
- Showcase enterprise-grade cloud-native architecture and deployment practices.

---

## Build Journey Structure

| Stage | Area | Purpose |
|---|---|---|
| 01 | Prerequisites | Prepare the development environment |
| 02 | GitHub | Set up the source repository |
| 03 | Application | Build and understand the application |
| 04 | Docker | Containerize and run the application |
| 05 | Azure | Create Azure infrastructure |
| 06 | Kubernetes | Deploy Kubernetes resources |
| 07 | Kustomize | Manage Kubernetes configuration |
| 08 | Azure DevOps | Configure CI/CD |
| 09 | SonarCloud | Perform code quality analysis |
| 10 | Trivy | Perform security scanning |
| 11 | Argo CD | Implement GitOps deployment |
| 12 | DevSecOps | Connect security and delivery controls |
| 13 | Documentation | Automate and verify project documentation |
| 14 | Troubleshooting | Recover from common project issues |
| 15 | Final Verification | Verify the complete project |

---

## Chronological Build Guide

The complete chronological implementation and rebuild process is documented in:

**[BUILD-JOURNEY.md](./BUILD-JOURNEY.md)**

This is the main document to follow when rebuilding FlavorForge from scratch.

---

## 📚 Docker Reference Documentation

Additional Docker learning and reference resources are available in:

**[Docker Reference Documentation & Learning Resources](./04-docker/docker-reference-documentation.md)**

The reference document provides curated resources covering:

- Docker fundamentals and container concepts
- Docker installation and CLI
- Docker images and containers
- Dockerfiles
- Multi-stage Docker builds
- Docker networking
- Docker volumes and storage
- Docker Compose
- Docker Hub and container registries
- Image tagging and publishing
- Docker security and best practices
- Official Docker documentation and guides
- Docker videos and practical learning resources

> **Recommended:** Use the official Docker documentation as the primary technical reference. Third-party tutorials and videos are provided as supplementary learning resources.

---

## 📚 Azure Reference Documentation

Additional Azure learning and reference resources are available in:

**[Azure Reference Documentation & Learning Resources](./azure-reference-documentation.md)**

The reference document provides curated resources covering:

- Azure fundamentals
- Azure Resource Manager
- Azure CLI
- Azure Resource Groups
- Azure regions
- Azure Container Registry (ACR)
- ACR authentication and image management
- Azure Kubernetes Service (AKS)
- AKS and ACR integration
- Connecting to AKS
- AKS scaling and monitoring
- Microsoft Learn training
- Azure Architecture Center
- Azure Well-Architected Framework
- Azure and Microsoft Azure videos
- Official Azure GitHub resources

> **Recommended:** Use Microsoft Azure documentation and Microsoft Learn as
> the primary technical references. Videos and third-party tutorials are
> supplementary learning resources.

---

## 📚 Kubernetes Reference Documentation

Additional Kubernetes learning and reference resources are available in:

**[Kubernetes Reference Documentation & Learning Resources](./06-kubernetes/kubernetes-reference-documentation.md)**

The reference document provides curated resources covering:

- Kubernetes official documentation
- Kubernetes architecture and concepts
- Pods and Deployments
- Services and networking
- ConfigMaps and Secrets
- Namespaces
- Horizontal Pod Autoscaling
- `kubectl` commands and quick reference
- Kubernetes troubleshooting
- Kustomize
- Azure Kubernetes Service (AKS)
- Kubernetes learning environments
- Kubernetes training and certification
- Official Kubernetes and CNCF videos
- Kubernetes GitHub repository

> **Recommended:** Use the official Kubernetes documentation and Microsoft AKS
> documentation as the primary technical references. Videos and third-party
> tutorials are supplementary learning resources.

---

## 📚 Kustomize Reference Documentation

Additional Kustomize learning and reference resources are available in:

**[Kustomize Reference Documentation & Learning Resources](./07-kustomize/kustomize-reference-documentation.md)**

The reference document provides curated resources covering:

- Kustomize fundamentals
- `kustomization.yaml`
- Bases and overlays
- Environment-specific configuration
- Patches
- Image customization
- ConfigMap and Secret generators
- Kustomize with `kubectl`
- Kustomize with AKS
- Kustomize with Azure DevOps
- Kustomize with Argo CD and GitOps
- Official Kustomize examples
- Kustomize videos
- Troubleshooting and verification commands

> **Recommended:** Use the official Kubernetes and Kustomize documentation as the primary technical references. Videos and third-party tutorials are supplementary learning resources.

---

## 📚 Azure DevOps Reference Documentation

Additional Azure DevOps learning and reference resources are available in:

**[Azure DevOps Reference Documentation & Learning Resources](./08-azure-devops/azure-devops-reference-documentation.md)**

The reference document provides curated resources covering:

- Azure DevOps fundamentals
- Azure Pipelines and CI/CD
- YAML pipeline configuration
- Pipeline stages, jobs, steps, and tasks
- Microsoft-hosted and self-hosted agents
- Service connections
- Variable groups and pipeline variables
- Environments and approvals
- Azure DevOps security
- Azure Repos and Git
- Azure Artifacts
- Deployment strategies
- Kubernetes and AKS integration
- GitOps and Azure DevOps
- Pipeline troubleshooting
- Microsoft Learn tutorials
- Official Microsoft documentation and videos

> **Recommended:** Use Microsoft Learn and official Azure DevOps documentation as the primary technical references. Videos and third-party tutorials are provided as supplementary learning resources.

---

## 📚 SonarQube Cloud Reference Documentation

Additional SonarQube Cloud learning and reference resources are available in:

**[SonarQube Cloud Reference Documentation & Learning Resources](./09-sonarcloud/sonarcloud-reference-documentation.md)**

The reference document provides curated resources covering:

- SonarQube Cloud official documentation
- Code quality and static analysis
- Bugs, vulnerabilities, code smells, and security hotspots
- Quality Profiles
- Quality Gates
- Branch and Pull Request analysis
- SonarScanner
- Azure DevOps integration
- GitHub integration
- Official SonarSource repositories
- SonarQube Cloud videos and tutorials
- DevSecOps best practices

> **Recommended:** Use the official SonarQube Cloud documentation as the
> primary technical reference. Videos and third-party tutorials are
> provided as supplementary learning resources.

---

## 📚 Trivy Reference Documentation

Additional Trivy learning and reference resources are available in:

**[Trivy Reference Documentation & Learning Resources](./10-trivy/trivy-reference-documentation.md)**

The reference document provides curated resources covering:

- Trivy official documentation
- Installation and CLI usage
- Container image vulnerability scanning
- Vulnerability and severity analysis
- Filesystem and repository scanning
- Kubernetes security scanning
- SBOM generation
- CI/CD integration
- Azure DevOps integration
- Trivy Operator
- Official GitHub repositories and examples
- Trivy, Aqua Security, and CNCF videos
- DevSecOps security best practices

> **Recommended:** Use the official Trivy documentation as the primary
> technical reference. Third-party tutorials and videos are provided as
> supplementary learning resources.

---

## 📚 Argo CD Reference Documentation

Additional Argo CD learning and reference resources are available in:

**[Argo CD Reference Documentation & Learning Resources](./11-argocd/argocd-reference-documentation.md)**

The reference document provides curated resources covering:

- Argo CD official documentation
- Getting Started and installation
- Argo CD architecture and GitOps concepts
- Application specification
- Declarative configuration
- Argo CD CLI
- Synchronization and reconciliation
- Kustomize integration
- Official GitHub repositories and example applications
- Argo CD and GitOps videos
- Azure/Kubernetes GitOps references

> **Recommended:** Use the official Argo CD documentation as the primary technical reference. Third-party tutorials and videos are provided as supplementary learning resources.

---

## Troubleshooting

Troubleshooting procedures are available under:

```text
14-troubleshooting/
```

These documents cover common issues involving:

* GitHub
* Docker
* Azure
* Kubernetes
* Azure DevOps pipelines
* Argo CD
* Cross-layer recovery

The recommended recovery principle is:

> **Diagnose first, change second, verify third.**

---

## Final Verification

The final verification documentation is available under:

```text
15-final-verification/
```

It contains:

* End-to-end verification
* Production verification
* Reproducibility checks
* Project completion checklist

These documents should be used after the implementation and troubleshooting stages are complete.

---

## Project Technology Stack

FlavorForge demonstrates a cloud-native DevSecOps workflow using:

* React and Vite
* Node.js and Express
* Docker
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* Kubernetes
* Kustomize
* Azure DevOps
* SonarCloud
* Trivy
* Argo CD
* Git and GitHub

---

## Recommended Learning Order

For a complete rebuild, follow the directories in numerical order:

```text
01 → 02 → 03 → 04 → 05 → 06 → 07 → 08
                         ↓
09 → 10 → 11 → 12 → 13 → 14 → 15
```

Do not skip verification steps between major stages.

---

## Documentation Principle

The BUILD-JOURNEY is designed to make the project reproducible for a beginner while preserving troubleshooting and verification information for future maintenance and review.

The objective is not only to document **what** was done, but also:

* Why it was done.
* How it was implemented.
* How it was verified.
* What can go wrong.
* How the issue can be recovered.
* How the final project can be independently checked.

---

## Project Completion

The project should be considered complete only after the final verification checklist in:

```text
15-final-verification/04-project-completion-checklist.md
```

has been reviewed against actual project evidence.

