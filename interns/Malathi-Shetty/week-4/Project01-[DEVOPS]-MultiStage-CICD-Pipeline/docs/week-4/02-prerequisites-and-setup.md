# 2. Prerequisites

Before implementing the FlavorForge Azure DevSecOps pipeline, the following tools, software, and cloud resources were required.

| Requirement | Version Used | How to Check |
|---|---|---|
| Azure CLI | 2.88.0 | `az version` |
| Azure DevOps CLI Extension | 1.0.6 | `az version` |
| kubectl | v1.35.0 | `kubectl version --client` |
| Docker Engine | 29.5.3 | `docker --version` |
| Node.js | v24.18.0 | `node --version` |
| npm | 11.16.0 | `npm --version` |
| Git | 2.43.0 | `git --version` |
| Azure Subscription | Active | `az account show` |
| Azure Kubernetes Service (AKS) | flavorforge-aks | `kubectl get nodes` |
| Azure Container Registry (ACR) | flavorforgeacr2026ms | `az acr list --resource-group flavorforge-rg` |

### Accounts / Access Required

The following accounts and permissions were required before starting the implementation:

- Azure Subscription
- Azure DevOps Organization
- GitHub Account
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Docker Desktop
- Internet connectivity

### Environment Verification

The following commands were executed to verify that the development environment was correctly configured.

```bash
az version
kubectl version --client
docker --version
node --version
npm --version
git --version
kubectl get nodes
```

The output confirmed that all required tools were installed successfully and that the AKS cluster was in the **Running** state with all Kubernetes nodes in the **Ready** state.

<img width="817" height="448" alt="image" src="https://github.com/user-attachments/assets/e2db437e-b9b4-40cb-9727-93f7c2d9ec02" />

<img width="717" height="332" alt="image" src="https://github.com/user-attachments/assets/ea6c01a6-745c-4b67-9dfd-6e0a1279648b" />




