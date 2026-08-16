# 🚀 Argo CD GitOps Deployment

The FlavorForge project uses **Argo CD** to implement a GitOps-based continuous delivery approach for deploying applications into Azure Kubernetes Service (AKS).

Argo CD continuously monitors the Kubernetes manifests stored in Git and ensures that the running application state in AKS matches the desired state defined in the repository.

This approach provides automated deployment, version-controlled infrastructure, self-healing capabilities, and reliable application delivery.

---

# 🎯 GitOps Objectives

The GitOps implementation focuses on:

- Managing Kubernetes configuration through Git
- Automating application deployment
- Maintaining a single source of truth
- Reducing manual Kubernetes changes
- Providing deployment visibility
- Supporting rollback and recovery
- Ensuring cluster state consistency

---

# 🏗️ Argo CD Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    │
    ▼
Kubernetes Manifests
(Kustomize)
    │
    ▼
Argo CD
    │
    │
    ▼
Azure Kubernetes Service (AKS)
    │
    ▼
FlavorForge Application
```

---

# 🔄 GitOps Deployment Flow

The complete deployment process:

```text
1. Developer commits application changes
              │
              ▼
2. Azure DevOps Pipeline builds Docker images
              │
              ▼
3. Images are pushed to Azure Container Registry
              │
              ▼
4. Kubernetes manifests are updated
              │
              ▼
5. Git repository contains desired state
              │
              ▼
6. Argo CD detects changes
              │
              ▼
7. Argo CD synchronizes AKS cluster
              │
              ▼
8. Application becomes available
```

---

# 📂 GitOps Repository Structure

The Kubernetes deployment configuration follows a Kustomize structure.

```text
kubernetes/
│
├── base/
│   ├── backend/
│   ├── frontend/
│   ├── ingress/
│   ├── config/
│   ├── autoscaling/
│   └── namespace.yaml
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

---

# 🧩 Kustomize Integration

Argo CD deploys the Kubernetes manifests using Kustomize.

Benefits:

- Environment separation
- Reduced YAML duplication
- Consistent deployments
- Easier configuration management

Example:

Development deployment:

```bash
kustomize build kubernetes/overlays/dev
```

Production deployment:

```bash
kustomize build kubernetes/overlays/prod
```

Argo CD uses the selected overlay as the desired application state.

---

# ⚙️ Argo CD Installation

Argo CD is installed inside the Azure Kubernetes Service (AKS) cluster.

Namespace created:

```text
argocd
```

Installation command:

```bash
kubectl create namespace argocd
```

Argo CD components are deployed using the official Kubernetes installation manifest.

Verify installation:

```bash
kubectl get pods -n argocd
```

Expected result:

```text
NAME                                  READY   STATUS
argocd-server                         1/1     Running
argocd-repo-server                    1/1     Running
argocd-application-controller         1/1     Running
argocd-dex-server                     1/1     Running
```

---

# 🔐 Accessing Argo CD Dashboard

The Argo CD UI provides visibility into:

- Application status
- Sync state
- Deployment history
- Kubernetes resources
- Health status

Port forwarding example:

```bash
kubectl port-forward svc/argocd-server \
-n argocd 8080:443
```

Access:

```text
https://localhost:8080
```

---

# 📦 Argo CD Application Configuration

The FlavorForge application is registered in Argo CD using an Application resource.

The Application defines:

- Git repository location
- Kubernetes path
- Target cluster
- Namespace
- Sync policy

Example structure:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application

metadata:
  name: flavorforge

spec:

  source:
    repoURL: <git-repository>
    path: kubernetes/overlays/prod

  destination:
    server: https://kubernetes.default.svc
    namespace: flavorforge

```

---

# 🔄 Synchronization Strategy

Argo CD supports automated synchronization between Git and Kubernetes.

Sync options:

## Manual Sync

Changes are reviewed and deployed manually from Argo CD.

## Automated Sync

Argo CD automatically applies changes detected in Git.

Benefits:

- Faster deployments
- Reduced manual operations
- Consistent cluster state

---

# 🔁 Automated Sync Features

The FlavorForge GitOps workflow supports:

## Auto Sync

Automatically deploy changes from Git.

```text
Git Change
     │
     ▼
Argo CD Detects Difference
     │
     ▼
Sync Started
     │
     ▼
AKS Updated
```

---

## Self Healing

Argo CD continuously monitors the cluster.

If someone manually changes Kubernetes resources:

```text
Git Desired State

        VS

Running AKS State
```

Argo CD detects drift and restores the expected configuration.

---

## Prune Resources

Removed resources from Git can automatically be removed from the cluster.

This prevents unused Kubernetes objects from remaining after deployments.

---

# 🔍 Application Verification

Check Argo CD applications:

```bash
argocd app list
```

Check application status:

```bash
argocd app get flavorforge
```

Expected status:

```text
Sync Status: Synced
Health Status: Healthy
```

---

# ☸️ Kubernetes Verification

After synchronization:

Check namespaces:

```bash
kubectl get namespaces
```

Check application pods:

```bash
kubectl get pods -n flavorforge
```

Check services:

```bash
kubectl get svc -n flavorforge
```

Check ingress:

```bash
kubectl get ingress -n flavorforge
```

---

# 🚦 Deployment Lifecycle

```text
Code Commit
     │
     ▼
Azure DevOps CI Pipeline
     │
     ▼
Docker Image Build
     │
     ▼
ACR Push
     │
     ▼
Git Manifest Update
     │
     ▼
Argo CD Sync
     │
     ▼
AKS Deployment
     │
     ▼
Application Running
```

---

# 🔙 Rollback Strategy

One of the major benefits of GitOps is the ability to recover quickly by reverting changes in Git.

Since Git stores the desired application state, rollback is performed by restoring a previous working version of the Kubernetes configuration.

---

## Git-Based Rollback

Rollback process:

```text
Problem Detected
        │
        ▼
Identify Previous Stable Commit
        │
        ▼
Revert Git Change
        │
        ▼
Argo CD Detects Difference
        │
        ▼
Previous State Restored
        │
        ▼
Application Recovered
```

---

## Kubernetes Rollback

Kubernetes deployment history can also be used:

```bash
kubectl rollout history deployment/backend-prod \
-n flavorforge-prod
```

Rollback command:

```bash
kubectl rollout undo deployment/backend-prod \
-n flavorforge-prod
```

---

# 🆚 Traditional Deployment vs GitOps

| Traditional Deployment | GitOps Deployment |
|-----------------------|-------------------|
| Manual kubectl commands | Git-driven deployment |
| Cluster state managed manually | Git is the source of truth |
| Difficult auditing | Complete Git history |
| Manual rollback | Version-based rollback |
| Higher configuration drift risk | Automatic drift detection |

---

# 🌟 Benefits of Argo CD Implementation

The FlavorForge GitOps implementation provides:

## Continuous Delivery

- Automated Kubernetes deployments
- Faster release cycles
- Reduced manual effort

## Reliability

- Self-healing applications
- Desired state enforcement
- Deployment consistency

## Security

- Reduced direct cluster access
- Auditable Git changes
- Controlled deployment workflow

## Maintainability

- Version-controlled infrastructure
- Environment separation
- Easier troubleshooting

---

# 📸 Recommended Screenshots

Store Argo CD evidence inside:

```text
docs/screenshots/
```

Recommended screenshots:

```text
argocd-dashboard.png

argocd-application-synced.png

argocd-health-status.png

argocd-resources-tree.png

aks-running-pods.png
```

These screenshots demonstrate:

- Application synchronization
- Healthy deployment state
- Kubernetes resource visibility
- Successful GitOps implementation

---

# 🛠️ Troubleshooting

## Application Not Syncing

Check application status:

```bash
argocd app get flavorforge
```

Common causes:

- Incorrect repository URL
- Invalid Kubernetes YAML
- Incorrect namespace
- Image pull failure

---

## Pod Not Starting

Check pod events:

```bash
kubectl describe pod <pod-name> \
-n flavorforge
```

Common causes:

- Image unavailable
- Incorrect environment variables
- Missing Secrets
- Resource limitations

---

## Out Of Sync Status

Compare Git desired state with cluster state:

```bash
argocd app diff flavorforge
```

Possible fixes:

```bash
argocd app sync flavorforge
```

---

# 📚 Learning Outcomes

This GitOps implementation demonstrates practical experience with:

- GitOps principles
- Argo CD deployment automation
- Kubernetes continuous delivery
- Kustomize integration
- Automated synchronization
- Self-healing deployments
- Deployment monitoring
- Rollback strategies
- AKS GitOps workflows

---

# 🏁 Final DevOps Delivery Flow

The complete FlavorForge delivery lifecycle:

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Azure DevOps Pipeline
    │
    ├── Automated Testing
    ├── SonarCloud Analysis
    ├── Security Scanning
    ├── Docker Build
    │
    ▼
Azure Container Registry
    │
    ▼
Git Kubernetes Configuration
    │
    ▼
Argo CD
    │
    ▼
Azure Kubernetes Service
    │
    ▼
FlavorForge Application
```

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as a production-style cloud-native DevSecOps project demonstrating CI/CD automation, containerization, Kubernetes orchestration, Azure cloud services, and GitOps delivery practices.