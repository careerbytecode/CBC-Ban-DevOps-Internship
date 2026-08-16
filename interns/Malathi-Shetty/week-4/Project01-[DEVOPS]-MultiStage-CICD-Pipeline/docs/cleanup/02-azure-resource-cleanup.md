# ☁️ FlavorForge Azure Resource Cleanup Guide

## Overview

FlavorForge uses multiple Azure resources to run the cloud-native application.

Cleanup should be performed carefully to avoid accidental deletion of required resources.

---

# Azure Resources

```mermaid
flowchart TD
    RG[Azure Resource Group]

    AKS[AKS Cluster]
    ACR[Azure Container Registry]
    LB[Load Balancer]
    IP[Public IP]
    Monitor[Monitoring Resources]

    RG --> AKS
    RG --> ACR
    RG --> LB
    RG --> IP
    RG --> Monitor
````

---

# Before Cleanup

Verify:

* Correct Azure subscription
* Correct resource group
* No active workloads
* Required backups completed

Check resources:

```bash
az resource list \
--resource-group flavorforge-rg
```

---

# Delete Resources

Delete the complete resource group:

```bash
az group delete \
--name flavorforge-rg
```

Confirmation:

```text
Are you sure you want to perform this operation?
```

---

# Verification

Verify deletion:

```bash
az group exists \
--name flavorforge-rg
```

Expected:

```text
false
```

---

# Cleanup Outcome

Successful cleanup removes:

* Kubernetes cluster
* Container registry
* Networking resources
* Monitoring resources
* Associated cloud costs
