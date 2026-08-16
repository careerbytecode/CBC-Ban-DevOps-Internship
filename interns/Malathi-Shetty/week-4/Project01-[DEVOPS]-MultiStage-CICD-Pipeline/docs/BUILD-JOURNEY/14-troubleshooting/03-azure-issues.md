# Azure Troubleshooting

## Purpose

This document provides troubleshooting guidance for the Azure resources used by the FlavorForge Azure DevSecOps project.

It is intended as a **reference document** for diagnosing and recovering from common Azure-related problems during development, deployment, and verification.

The troubleshooting steps below are based on the actual FlavorForge Week 4 Azure environment.

---

## 1. FlavorForge Azure Environment

The following Azure resources are used by FlavorForge:

| Resource                 | Value                             |
| ------------------------ | --------------------------------- |
| Resource Group           | `flavorforge-rg`                  |
| Azure Container Registry | `flavorforgeacr2026ms`            |
| ACR Login Server         | `flavorforgeacr2026ms.azurecr.io` |
| ACR Region               | East US                           |
| ACR SKU                  | Basic                             |
| AKS Cluster              | `flavorforge-aks`                 |
| AKS Region               | East US                           |
| AKS Node Count           | 2                                 |
| AKS Node Size            | `Standard_D2as_v7`                |

> **Important:** These resources belong to the Week 4 FlavorForge project. Do not confuse them with the separate Week 3 Azure VM lab.

---

# 2. Azure CLI Not Logged In

## Problem

Azure CLI commands may fail if the local Azure CLI session is not authenticated.

A typical error may indicate that no subscription is available or that authentication is required.

## Check Login Status

Run:

```bash
az account show
```

If no account information is returned, log in:

```bash
az login
```

A browser window may open for authentication.

## Verify the Subscription

After logging in:

```bash
az account list --output table
```

If multiple subscriptions are available, select the correct one:

```bash
az account set --subscription "<SUBSCRIPTION_NAME_OR_ID>"
```

Verify again:

```bash
az account show --output table
```

## Lesson

Always verify the active Azure subscription before creating or modifying resources.

---

# 3. Resource Group Not Found

## Problem

Commands may fail with an error indicating that the resource group does not exist.

For FlavorForge, the expected resource group is:

```text
flavorforge-rg
```

## Verify the Resource Group

Run:

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

If the resource group exists, Azure returns its details.

You can also list resource groups:

```bash
az group list --output table
```

## Possible Causes

* Logged into the wrong Azure account.
* Wrong subscription is selected.
* Resource group name was typed incorrectly.
* Resource group was deleted.

## Recovery

First verify the active subscription:

```bash
az account show --output table
```

Then check the resource group:

```bash
az group show --name flavorforge-rg
```

Do not recreate the resource group until you have confirmed that it is actually missing.

---

# 4. ACR Cannot Be Found

## Problem

Azure CLI or Docker commands may fail when the Azure Container Registry name is incorrect.

FlavorForge uses:

```text
flavorforgeacr2026ms
```

## Verify ACR

Run:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

Check the login server:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

Expected login server:

```text
flavorforgeacr2026ms.azurecr.io
```

---

# 5. Docker Cannot Push to ACR

## Problem

A Docker image may build successfully but fail when pushed to Azure Container Registry.

Common causes include:

* Docker is not authenticated to ACR.
* Incorrect registry name.
* Incorrect image tag.
* Incorrect subscription.
* ACR does not exist.

## Verify ACR Login

Use:

```bash
az acr login --name flavorforgeacr2026ms
```

A successful login should indicate that the login succeeded.

## Check Docker Images

Run:

```bash
docker images
```

Confirm that the intended FlavorForge image exists.

The local FlavorForge images used during the project were tagged with:

```text
:1.0
```

## Verify the Image Tag

The general format for an ACR image is:

```text
<registry-login-server>/<repository>:<tag>
```

For example:

```text
flavorforgeacr2026ms.azurecr.io/<repository>:1.0
```

Then push the image:

```bash
docker push flavorforgeacr2026ms.azurecr.io/<repository>:1.0
```

Replace `<repository>` with the actual repository/image name used by the project.

## Verify the Image in ACR

After a successful push:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

To inspect tags for a repository:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

---

# 6. ACR Authentication Problems

## Problem

`docker push` may return an authentication or authorization error.

## Check Azure Login

```bash
az account show
```

## Re-authenticate to ACR

```bash
az acr login --name flavorforgeacr2026ms
```

Then retry:

```bash
docker push flavorforgeacr2026ms.azurecr.io/<repository>:<tag>
```

## If the Problem Continues

Check whether the current identity has permission to access the registry:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output json
```

Do not immediately change permissions. First determine whether the problem is authentication, subscription selection, image naming, or authorization.

---

# 7. AKS Cluster Not Found

## Problem

Commands involving `flavorforge-aks` fail because Azure cannot locate the cluster.

## Verify the Cluster

Run:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --output table
```

List AKS clusters:

```bash
az aks list --output table
```

## Check the Cluster Configuration

You can inspect the node count:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --query agentPoolProfiles[].count
```

Check the node size:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --query agentPoolProfiles[].vmSize
```

The project configuration uses:

```text
Node count: 2
Node size: Standard_D2as_v7
```

---

# 8. Cannot Connect to AKS with kubectl

## Problem

`kubectl` commands fail because the local kubeconfig does not contain credentials for the FlavorForge AKS cluster.

## Get AKS Credentials

Run:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

If an existing context needs to be replaced:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

## Verify the Current Context

```bash
kubectl config current-context
```

List available contexts:

```bash
kubectl config get-contexts
```

## Test the Connection

```bash
kubectl get nodes
```

If the connection is working, the AKS nodes should be listed.

---

# 9. AKS Nodes Are Not Ready

## Problem

`kubectl get nodes` may show nodes with a status other than `Ready`.

Start with:

```bash
kubectl get nodes
```

Then inspect the affected node:

```bash
kubectl describe node <node-name>
```

Check recent cluster events:

```bash
kubectl get events --sort-by=.lastTimestamp
```

## Important

Do not immediately restart, delete, or recreate resources.

First inspect:

* Node status
* Conditions
* Events
* Resource pressure
* Recent scheduling failures

This helps identify the actual cause before taking recovery action.

---

# 10. Pods Cannot Pull Images from ACR

## Problem

A Kubernetes pod may remain in:

```text
ImagePullBackOff
```

or:

```text
ErrImagePull
```

This usually means Kubernetes cannot retrieve the specified container image.

## Check the Pods

```bash
kubectl get pods
```

Then inspect the affected pod:

```bash
kubectl describe pod <pod-name>
```

Look at the **Events** section.

Typical causes include:

* Incorrect image name.
* Incorrect image tag.
* Image does not exist in ACR.
* AKS cannot authenticate to ACR.
* Registry access configuration is missing.

---

# 11. Verify the Image Exists in ACR

Before changing Kubernetes configuration, verify that the image actually exists.

List repositories:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Check repository tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

The Kubernetes manifest must reference an image that actually exists in the registry.

> **Important:** During the project, local Docker images were tagged `:1.0`, while the Kubernetes manifests referenced `:1.8`. Always verify the tag currently present in ACR before changing deployment manifests.

Do not assume that a locally available image tag automatically exists in ACR.

---

# 12. AKS Does Not Have Permission to Pull from ACR

## Problem

The image exists in ACR, but AKS cannot pull it.

Inspect the pod:

```bash
kubectl describe pod <pod-name>
```

If the events indicate an authorization or registry access problem, check the AKS-to-ACR configuration.

## Check the AKS Identity

Run:

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query identity \
  --output json
```

The exact identity configuration depends on how the cluster was created.

## Check ACR Permissions

Inspect the registry:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output json
```

If the cluster needs ACR pull access, verify that the appropriate identity has the required permission.

Do not assign additional permissions without first confirming that the existing configuration is insufficient.

---

# 13. AKS API or Cluster Access Is Slow or Unavailable

## Problem

Azure CLI or `kubectl` operations may take a long time or fail to communicate with the cluster.

## Check AKS Status

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query provisioningState \
  --output tsv
```

Also check:

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query powerState.code \
  --output tsv
```

If the cluster is still provisioning or is not running, wait for the Azure operation to complete before repeatedly retrying deployment commands.

---

# 14. Azure CLI Returns a Subscription Error

## Problem

Azure commands may fail because the wrong subscription is selected.

## Check Current Subscription

```bash
az account show --output table
```

List all available subscriptions:

```bash
az account list --output table
```

Select the required subscription:

```bash
az account set --subscription "<SUBSCRIPTION_NAME_OR_ID>"
```

Then verify:

```bash
az account show --output table
```

## Lesson

A resource can appear to be "missing" simply because the CLI is pointing to a different subscription.

Always check the subscription before concluding that an Azure resource has been deleted.

---

# 15. Resource Deployment Is Still Running

## Problem

An Azure resource may not be immediately available after creation or modification.

Check the resource:

```bash
az resource list \
  --resource-group flavorforge-rg \
  --output table
```

For a specific resource, use its corresponding `az` command and inspect its provisioning state.

For example:

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query provisioningState \
  --output tsv
```

## Recovery Approach

Do not repeatedly issue create commands while an existing Azure operation is still running.

First determine:

1. Whether the resource already exists.
2. Whether the provisioning operation is still running.
3. Whether the operation failed.
4. Whether the resource requires correction rather than recreation.

---

# 16. Useful Azure Verification Commands

The following commands provide a quick overview of the FlavorForge Azure environment.

## Resource Group

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

## ACR

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

## ACR Login Server

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

## ACR Repositories

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

## AKS

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --output table
```

## AKS Nodes

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing

kubectl get nodes
```

## Running Pods

```bash
kubectl get pods
```

## Services

```bash
kubectl get services
```

---

# 17. Recommended Azure Troubleshooting Order

When an Azure deployment fails, troubleshoot from the bottom up rather than changing multiple things at once.

```text
Azure Login
    ↓
Correct Subscription
    ↓
Resource Group
    ↓
ACR
    ↓
Docker Image
    ↓
ACR Image/Tag
    ↓
AKS Cluster
    ↓
AKS Credentials
    ↓
Kubernetes Nodes
    ↓
Pods
    ↓
Container Image Pull
    ↓
Application
```

This approach prevents unrelated changes from making the original problem harder to identify.

---

# 18. Common Mistakes to Avoid

### Mistake 1 — Using the wrong resource group

FlavorForge Week 4 uses:

```text
flavorforge-rg
```

Do not substitute the resource group from another Azure lab.

### Mistake 2 — Using the wrong ACR

FlavorForge uses:

```text
flavorforgeacr2026ms
```

The login server is:

```text
flavorforgeacr2026ms.azurecr.io
```

### Mistake 3 — Assuming a local Docker tag exists in ACR

A local image and an ACR image are separate things.

Verify the repository and tag directly in ACR.

### Mistake 4 — Changing Kubernetes manifests before checking ACR

If a pod reports `ImagePullBackOff`, first inspect:

```bash
kubectl describe pod <pod-name>
```

Then verify the image in ACR.

### Mistake 5 — Recreating Azure resources too quickly

Resource recreation can cause unnecessary configuration changes and may destroy useful state.

Diagnose first, recover second.

---

# 19. Azure Troubleshooting Checklist

* [ ] Confirm Azure CLI login.
* [ ] Confirm the active subscription.
* [ ] Confirm `flavorforge-rg` exists.
* [ ] Confirm `flavorforgeacr2026ms` exists.
* [ ] Confirm the ACR login server is correct.
* [ ] Confirm the required Docker image exists locally.
* [ ] Confirm the image has been pushed to ACR.
* [ ] Confirm the expected repository and tag exist in ACR.
* [ ] Confirm `flavorforge-aks` exists.
* [ ] Confirm AKS provisioning status.
* [ ] Refresh AKS credentials if required.
* [ ] Confirm Kubernetes nodes are `Ready`.
* [ ] Check pod status.
* [ ] Inspect pod events for image-pull errors.
* [ ] Verify AKS has permission to pull from ACR when required.
* [ ] Verify the Kubernetes image reference matches an image available in ACR.
* [ ] Re-test the application only after the underlying Azure issue is resolved.

---

## Summary

Azure troubleshooting should follow a controlled diagnostic process rather than immediately recreating resources.

For FlavorForge, the most important checks are:

```text
Azure authentication
        ↓
Correct subscription
        ↓
flavorforge-rg
        ↓
flavorforgeacr2026ms
        ↓
Correct image and tag
        ↓
flavorforge-aks
        ↓
kubectl connectivity
        ↓
Node readiness
        ↓
Pod events
        ↓
Application availability
```

This troubleshooting sequence makes it easier for a beginner to identify whether a problem is related to Azure authentication, resource configuration, ACR image availability, AKS connectivity, Kubernetes scheduling, or application deployment.
