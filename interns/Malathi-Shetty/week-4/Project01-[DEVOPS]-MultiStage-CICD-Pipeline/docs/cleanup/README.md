


# 🧹 FlavorForge Cleanup and Resource Management

## Overview

Cloud-native applications create multiple resources during development and deployment.

FlavorForge uses Docker, Kubernetes, Azure Container Registry, and Azure Kubernetes Service. Proper cleanup ensures:

- Reduced cloud costs
- Cleaner development environments
- Removal of unused resources
- Better resource management practices

---

## Purpose

This document explains:

* How to remove local generated files
* How to clean Docker resources
* How to remove Kubernetes resources
* How to delete Azure resources
* How to avoid unnecessary cloud costs



---


# 🧑‍💻 Local Development Cleanup

## Remove Node Dependencies

Frontend:

```bash
rm -rf frontend/node_modules
````

Backend:

```bash
rm -rf backend/node_modules
```

---

## Remove Build Artifacts

Remove frontend build output:

```bash
rm -rf frontend/dist
```

Remove test coverage:

```bash
rm -rf backend/coverage
rm -rf frontend/coverage
```

---

# 🐳 Docker Cleanup

## View Running Containers

```bash
docker ps
```

---

## Stop Containers

```bash
docker stop <container-id>
```

---

## Remove Containers

```bash
docker rm <container-id>
```

---

## Remove Unused Images

```bash
docker image prune
```

---

## Remove Unused Resources

```bash
docker system prune
```

⚠️ This removes unused containers, networks, and images.

---

# ☸️ Kubernetes Cleanup

## View Kubernetes Resources

```bash
kubectl get all -A
```

---

## Remove Application Deployment

Example:

```bash
kubectl delete namespace flavorforge-dev
```

---

## Remove ArgoCD Application

```bash
argocd app delete flavorforge-app
```

---

# ☁️ Azure Resource Cleanup

FlavorForge resources are grouped inside an Azure Resource Group.

Example:

```bash
az group delete \
--name flavorforge-rg
```

Confirmation:

```bash
Are you sure you want to perform this operation?
```

---

# 🔐 Before Azure Cleanup Verify

Check existing resources:

```bash
az resource list \
--resource-group flavorforge-rg
```

Review:

* AKS cluster
* Container Registry
* Monitoring resources

---

# 💰 Cost Management Practices

Recommended practices:

✅ Delete unused development environments

✅ Stop temporary resources

✅ Monitor Azure spending

✅ Use appropriate VM sizing

✅ Remove unused container images

---

# 🔄 Rebuild Environment

If a clean deployment is required:

```
Clean Environment

        ↓

Infrastructure Setup

        ↓

Application Build

        ↓

Docker Images

        ↓

AKS Deployment

        ↓

ArgoCD Synchronization
```

---

# Engineering Practice

A professional DevOps engineer manages not only deployment but also the complete resource lifecycle.

The lifecycle is:

```
Create

 ↓

Deploy

 ↓

Monitor

 ↓

Maintain

 ↓

Cleanup
```
---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Implementation Guide](../implementation/README.md) | Complete implementation |
| [Pipeline Documentation](../pipeline/README.md) | CI/CD pipeline |
| [Troubleshooting](../troubleshooting/README.md) | Common issues |
| [Documentation Home](../README.md) | Documentation index |