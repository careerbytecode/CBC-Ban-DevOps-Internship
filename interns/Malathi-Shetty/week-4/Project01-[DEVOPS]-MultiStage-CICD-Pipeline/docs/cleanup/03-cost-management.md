# 💰 FlavorForge Azure Cost Management Guide

## Overview

Cloud resources continue generating costs while running.

Cost management ensures resources are monitored, optimized, and removed when no longer required.

---

# Cost Flow

```mermaid
flowchart TD
    AKS[AKS Cluster]
    VMSS[Node VM Scale Set]
    LB[Load Balancer]
    IP[Public IP]
    ACR[Container Registry Storage]
    Logs[Monitoring Logs]

    AKS --> VMSS
    VMSS --> LB
    LB --> IP
    AKS --> ACR
    AKS --> Logs
````

---

# Main Cost Sources

| Resource      | Cost Impact                 |
| ------------- | --------------------------- |
| AKS           | Cluster and node resources  |
| VM Scale Set  | Kubernetes worker nodes     |
| Load Balancer | Networking resources        |
| Public IP     | Reserved networking address |
| ACR           | Image storage               |
| Monitoring    | Logs and metrics storage    |

---

# Cost Optimization Practices

| Resource      | Optimization                        |
| ------------- | ----------------------------------- |
| AKS           | Delete cluster after demonstrations |
| ACR           | Remove unused images                |
| Load Balancer | Remove unused services              |
| Logs          | Configure retention policies        |
| VM Nodes      | Right-size node pools               |

---

# Useful Commands

Check resources:

```bash
az resource list
```

Check container images:

```bash
az acr repository list
```

---

# Best Practices

* Delete unused environments
* Use smaller development clusters
* Monitor resource usage
* Enable budget alerts
* Review resources regularly
