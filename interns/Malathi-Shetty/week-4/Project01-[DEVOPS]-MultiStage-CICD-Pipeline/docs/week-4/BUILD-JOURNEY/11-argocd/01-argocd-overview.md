# 11 — Argo CD: Overview

## Objective

In this stage, we introduce **Argo CD** into the FlavorForge deployment workflow.

The goal is to use **GitOps** so that the Kubernetes deployment configuration stored in the Git repository becomes the source of truth for the FlavorForge application running on AKS.

Instead of manually applying Kubernetes changes every time, Argo CD continuously monitors the Git repository and keeps the Kubernetes environment aligned with the desired configuration.

---

## Why Argo CD?

Earlier stages of the FlavorForge journey established:

- Application source code
- Docker images
- Azure Container Registry
- AKS cluster
- Kubernetes resources
- Kustomize configuration
- Azure DevOps CI/CD pipeline
- SonarCloud quality analysis
- Trivy security scanning

Argo CD adds the **GitOps deployment layer**.

The overall flow becomes:

```text
Developer
   ↓
GitHub Repository
   ↓
Azure DevOps Pipeline
   ↓
Build + Test
   ↓
SonarCloud
   ↓
Trivy
   ↓
Docker Image
   ↓
Azure Container Registry
   ↓
AKS
   ↑
   │
 Argo CD
   ↑
Git Repository
```

For the GitOps portion, the important relationship is:

```text
Git Repository
      ↓
    Argo CD
      ↓
flavorforge Application
      ↓
Kubernetes / AKS
```

---

## What is GitOps?

GitOps uses Git as the **source of truth** for infrastructure and application deployment configuration.

For FlavorForge, the desired Kubernetes state is maintained in Git.

Argo CD compares:

```text
Desired State
     ↓
Git Repository
```

with:

```text
Live State
     ↓
Kubernetes Cluster
```

When the states differ, Argo CD can identify the difference and, when configured for synchronization, bring the cluster back toward the desired state.

---

## FlavorForge GitOps Flow

The FlavorForge deployment flow is:

```text
                    GitHub
                      │
                      │
                      ▼
              Kubernetes Config
                      │
                      ▼
                   Argo CD
                      │
                      ▼
              flavorforge Application
                      │
                      ▼
                 AKS Cluster
                      │
                      ▼
             FlavorForge Workloads
```

This provides a clear separation between:

| Layer | Responsibility |
|---|---|
| GitHub | Stores the desired configuration |
| Argo CD | Monitors and manages GitOps synchronization |
| AKS | Runs the Kubernetes workloads |
| FlavorForge | Application being deployed |

---

## What We Will Do

In this Argo CD journey, we will:

1. Install Argo CD in the AKS cluster.
2. Verify the Argo CD components.
3. Connect Argo CD to the FlavorForge Git repository.
4. Create the `flavorforge` Argo CD Application.
5. Configure the application to track the required Kubernetes configuration.
6. Synchronize the application.
7. Verify application health.
8. Verify GitOps synchronization and self-healing behavior.

---

## Expected Final State

At the end of this stage, the FlavorForge application should be managed through Argo CD.

The expected GitOps relationship is:

```text
Git Repository
      ↓
    Argo CD
      ↓
flavorforge Application
      ↓
     Synced
      ↓
    Healthy
      ↓
AKS / Kubernetes
```

The final verification will use the actual Argo CD application status:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

This confirms that the `flavorforge` Argo CD Application is synchronized and reporting a healthy state.

---

## Evidence

The Argo CD stage will include screenshots covering:

- Argo CD installation
- Argo CD pods
- Argo CD services
- Argo CD CRDs
- Argo CD Application
- Synchronization and health status

Example evidence location:

```text
screenshots/argo-cd/
```

---

## Result

Argo CD provides the **GitOps deployment layer** for FlavorForge.

The next step is to install and verify Argo CD in the AKS cluster.

➡️ **Next: `02-argocd-installation.md`**