# 📚 Kustomize Reference Documentation & Learning Resources

This section provides additional reference material for understanding, configuring, using, and troubleshooting **Kustomize** with Kubernetes.

The FlavorForge project uses Kustomize to manage Kubernetes configuration across different environments while maintaining a reusable common base.

> **Recommended approach:** Start with the official Kubernetes documentation, then use the official Kustomize project documentation and examples for deeper understanding. Videos and third-party tutorials are provided as supplementary learning resources.

---

## 1. Official Kubernetes Kustomize Documentation

### Declarative Management of Kubernetes Objects Using Kustomize

The official Kubernetes documentation is the primary reference for Kustomize.

[Kustomize — Kubernetes Documentation](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

It covers:

* Kustomization files
* Resources
* Bases
* Overlays
* ConfigMaps
* Secrets
* Generators
* Transformers
* Patches
* Labels
* Namespaces
* Applying Kustomize configurations

Kustomize is available both as a standalone tool and as a native feature of `kubectl`. ([Kubernetes][1])

---

## 2. Kustomize Official Project

The official Kustomize project is maintained under the Kubernetes SIGs ecosystem.

[Kustomize GitHub Repository](https://github.com/kubernetes-sigs/kustomize)

This repository is useful for:

* Source code
* Releases
* Documentation
* Examples
* Issues
* Feature development
* Advanced Kustomize functionality

---

## 3. Understanding Kustomize

Kustomize allows Kubernetes YAML configuration to be customized without maintaining completely separate copies of manifests.

Conceptually:

```text
Common Kubernetes Configuration
              │
              ▼
            Base
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
      Dev     QA     Prod
     Overlay Overlay Overlay
```

This is particularly useful when the same application must be deployed into multiple environments with different configuration.

The official Kubernetes documentation explains the **base and overlay** model. ([Kubernetes][1])

---

## 4. Kustomization File

The central configuration file is:

```text
kustomization.yaml
```

A basic example:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml
```

The `kustomization.yaml` file tells Kustomize which Kubernetes resources belong to the configuration and what customizations should be applied.

---

## 5. Bases and Overlays

One of the most important Kustomize concepts is the separation between **base** and **overlay**.

### Base

The base contains common Kubernetes configuration.

```text
kubernetes/
└── base/
    ├── deployment.yaml
    ├── service.yaml
    └── kustomization.yaml
```

### Overlay

An overlay modifies the base for a particular environment.

```text
kubernetes/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

Conceptually:

```text
                    Base
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        Dev          QA        Prod
      Overlay      Overlay    Overlay
```

A base does not need to know about the overlays that consume it. ([Kubernetes][1])

---

# 6. FlavorForge Kustomize Structure

FlavorForge follows the base/overlay approach.

```text
kubernetes/
├── base/
│   ├── ...
│   └── kustomization.yaml
│
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    │
    ├── qa/
    │   └── kustomization.yaml
    │
    └── prod/
        └── kustomization.yaml
```

The purpose is to avoid duplicating the complete Kubernetes configuration for every environment.

---

# 7. Building Kustomize Manifests

Kustomize can render the final Kubernetes YAML without applying it to a cluster.

```bash
kubectl kustomize kubernetes/overlays/prod
```

This is useful for inspecting the generated configuration before deployment.

The official Kubernetes documentation describes `kubectl kustomize` for viewing resources generated from a Kustomization. ([Kubernetes][1])

---

# 8. Applying Kustomize Configuration

Kustomize can be directly integrated with `kubectl`.

```bash
kubectl apply -k kubernetes/overlays/prod
```

The `-k` option tells `kubectl` to use the Kustomization directory.

Conceptually:

```text
kustomization.yaml
        │
        ▼
     Kustomize
        │
        ▼
Generated Kubernetes Resources
        │
        ▼
     kubectl
        │
        ▼
 Kubernetes Cluster
```

The Kubernetes documentation officially documents `kubectl apply -k`. ([Kubernetes][1])

---

# 9. Kustomize Patches

Patches allow an overlay to modify resources defined in the base.

Typical use cases include changing:

* Container images
* Replicas
* Environment variables
* Resource limits
* Labels
* Configuration
* Ports

Conceptually:

```text
Base Deployment
       +
Production Patch
       ↓
Production Deployment
```

Patches are useful when most of a Kubernetes resource should remain identical across environments.

---

# 10. Images

Kustomize can customize container image references.

For example:

```yaml
images:
  - name: flavorforge-backend
    newName: flavorforgeacr2026ms.azurecr.io/flavorforge-backend
    newTag: "1.8"
```

This allows environment-specific image versions without duplicating the entire Deployment manifest.

---

# 11. ConfigMaps and Secrets

Kustomize supports generators for ConfigMaps and Secrets.

The official Kubernetes documentation covers:

* `configMapGenerator`
* `secretGenerator`

[Kustomize ConfigMap and Secret Generation](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kustomize/)

Example:

```yaml
configMapGenerator:
  - name: application-config
    literals:
      - ENVIRONMENT=production
```

> **Security note:** Kustomize-generated Kubernetes Secrets should not be treated as a replacement for a dedicated secret-management solution.

---

# 12. Namespaces and Common Configuration

Kustomize can apply common configuration across resources.

Examples include:

```yaml
namespace: flavorforge
```

and common labels:

```yaml
commonLabels:
  app: flavorforge
```

This can reduce repeated configuration across Kubernetes manifests.

---

# 13. Kustomize Components

Kustomize also supports reusable components for certain configuration patterns.

The official Kustomize project provides an example explaining components and how they can reduce duplication when optional features need to be composed across environments.

[Official Kustomize Components Example](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/components.md)

This is an advanced topic and is not required to understand the FlavorForge base/overlay implementation.

---

# 14. Kustomize with Kubernetes

Kustomize is integrated into the Kubernetes command-line workflow.

```text
Kustomize
   │
   ▼
kubectl
   │
   ▼
Kubernetes API
   │
   ▼
AKS
```

Kustomize is available both as a standalone tool and through `kubectl`. ([Kubernetes][3])

---

# 15. Kustomize with Azure Kubernetes Service

FlavorForge runs on Azure Kubernetes Service.

The overall flow is:

```text
GitHub
   │
   ▼
Kubernetes Manifests
   │
   ▼
Kustomize Overlay
   │
   ▼
kubectl apply -k
   │
   ▼
AKS
```

Additional AKS reference:

[Azure Kubernetes Service Documentation](https://learn.microsoft.com/azure/aks/)

---

# 16. Kustomize with Azure DevOps

FlavorForge uses Kustomize as part of the Azure DevOps deployment workflow.

The pipeline performs the production deployment using:

```bash
kubectl apply -k kubernetes/overlays/prod
```

Conceptually:

```text
Azure DevOps Pipeline
        │
        ▼
Kustomize Production Overlay
        │
        ▼
kubectl apply -k
        │
        ▼
AKS
        │
        ▼
FlavorForge
```

This allows the pipeline to deploy the environment-specific Kubernetes configuration stored in Git.

---

# 17. Kustomize with Argo CD

Kustomize can also be used by Argo CD.

The relationship is:

```text
Git Repository
      │
      ▼
Kustomize Configuration
      │
      ▼
Argo CD
      │
      ▼
Kubernetes
```

FlavorForge demonstrates this relationship as part of its GitOps architecture.

> **Important:** Kustomize is responsible for customizing and generating Kubernetes configuration. Argo CD is responsible for GitOps reconciliation and continuous delivery.

---

# 18. Kustomize and GitOps

Kustomize works well with GitOps because Kubernetes configuration can be stored in Git.

```text
Developer
    │
    ▼
Git
    │
    ▼
Kustomize
    │
    ▼
Desired Kubernetes State
    │
    ▼
GitOps Tool
    │
    ▼
Kubernetes
```

This makes configuration changes reviewable, version-controlled, and reproducible.

---

# 19. Kustomize Official Examples

The official Kustomize repository contains examples covering different features.

[Kustomize Official Examples](https://github.com/kubernetes-sigs/kustomize/tree/master/examples)

Examples include:

* Bases
* Overlays
* Components
* Generators
* Patches
* Helm integration
* Advanced customization

These examples are particularly useful after completing the basic Kubernetes documentation.

---

# 🎥 20. Kustomize Videos

### Kubernetes Official YouTube

[Kubernetes Official YouTube Channel](https://www.youtube.com/@KubernetesCommunity)

Useful topics to search for:

* Kustomize
* Kubernetes configuration management
* Kubernetes manifests
* Kustomize overlays
* GitOps
* Kubernetes deployment

### CNCF YouTube

[CNCF YouTube Channel](https://www.youtube.com/@CNCF)

Useful for broader Kubernetes and cloud-native learning.

> Videos are supplementary resources. Use the official Kubernetes/Kustomize documentation as the technical source of truth.

---

# 21. Recommended Kustomize Learning Order

| Order | Resource                             | Purpose                           |
| ----: | ------------------------------------ | --------------------------------- |
|     1 | Kubernetes Kustomize documentation   | Understand Kustomize              |
|     2 | `kustomization.yaml`                 | Understand configuration          |
|     3 | Bases and overlays                   | Understand environment management |
|     4 | `kubectl kustomize`                  | Render configuration              |
|     5 | `kubectl apply -k`                   | Deploy configuration              |
|     6 | Patches                              | Customize resources               |
|     7 | Images                               | Manage container versions         |
|     8 | ConfigMap/Secret generators          | Manage configuration              |
|     9 | Official examples                    | Practice advanced features        |
|    10 | Videos                               | Reinforce concepts                |
|    11 | FlavorForge Kustomize implementation | Apply the concepts                |

---

# 22. FlavorForge-Specific References

After understanding Kustomize fundamentals, readers should review the FlavorForge implementation.

Recommended project documentation:

```text
07-kustomize/
├── README.md
├── kustomize-reference-documentation.md
└── ...
```

Then review the actual Kubernetes configuration:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The goal is to understand **why FlavorForge uses a base/overlay structure**, not simply to copy the YAML files.

---

# 23. Verification Commands

Useful commands when working with FlavorForge Kustomize configuration include:

```bash
kubectl kustomize kubernetes/overlays/prod
```

Render the production configuration without applying it.

```bash
kubectl apply -k kubernetes/overlays/prod
```

Apply the production configuration.

```bash
kubectl get all -n flavorforge
```

Verify Kubernetes resources after deployment.

```bash
kubectl diff -k kubernetes/overlays/prod
```

Review differences between the current cluster state and the Kustomize configuration before applying changes.

---

# 24. Reference Principle

Use the following hierarchy when researching Kustomize:

```text
Kubernetes Official Documentation
              ↓
Kustomize Official Project
              ↓
Official Examples
              ↓
Hands-on Tutorials
              ↓
Videos
              ↓
FlavorForge Implementation
```

> **Source-of-truth principle:** When a tutorial or video conflicts with the current Kubernetes/Kustomize documentation, prefer the current official documentation.

---

- https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/?utm_source=chatgpt.com "Declarative Management of Kubernetes Objects Using Kustomize | Kubernetes"
- https://github.com/kubernetes-sigs/kustomize/blob/master/examples/components.md?utm_source=chatgpt.com "kustomize/examples/components.md at master · kubernetes-sigs/kustomize · GitHub"
- https://kubernetes.io/docs/concepts/workloads/management/?utm_source=chatgpt.com "Managing Workloads | Kubernetes"
