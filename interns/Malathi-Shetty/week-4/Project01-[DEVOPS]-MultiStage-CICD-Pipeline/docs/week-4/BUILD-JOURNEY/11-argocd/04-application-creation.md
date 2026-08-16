# 04 — Argo CD Application Creation

## Objective

Create the **FlavorForge Argo CD Application** and connect it to the Git repository containing the desired Kubernetes configuration.

The goal is to tell Argo CD:

> **Which Git repository should I watch, which configuration should I deploy, and where should I deploy it?**

The resulting application is named:

```text
flavorforge
```

---

## 1. Verify the Argo CD Application Manifest

The FlavorForge project contains the Argo CD application definition under:

```text
argocd/
└── flavorforge-app.yaml
```

Review the manifest:

```bash
cat argocd/flavorforge-app.yaml
```

The manifest defines the relationship between:

```text
Git Repository
      ↓
 flavorforge
      ↓
   Argo CD
      ↓
  AKS Cluster
```

The important configuration areas are:

| Configuration    | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| Application name | Identifies the application as `flavorforge`         |
| Git repository   | Defines the source repository                       |
| Target revision  | Defines the Git revision to track                   |
| Repository path  | Defines the Kubernetes configuration location       |
| Destination      | Defines the target Kubernetes cluster               |
| Namespace        | Defines where the application resources are managed |

---

## 2. Create the Argo CD Application

Apply the application manifest to the Argo CD namespace:

```bash
kubectl apply -n argocd -f argocd/flavorforge-app.yaml
```

Expected result:

```text
application.argoproj.io/flavorforge created
```

If the application already exists, Kubernetes may report:

```text
application.argoproj.io/flavorforge configured
```

Both results indicate that the manifest has been successfully processed.

---

## 3. Verify the Application

Check the Argo CD Applications:

```bash
kubectl get applications -n argocd
```

The FlavorForge application should appear:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   ...            ...
```

At this stage, the application has been registered with Argo CD.

---

## 4. Check the Application Details

The application can also be inspected directly:

```bash
kubectl get application flavorforge -n argocd
```

For more detailed information:

```bash
kubectl describe application flavorforge -n argocd
```

This helps verify the configured Git source, destination, synchronization settings, and current application state.

---

## 5. Verify Using the Argo CD CLI

If the Argo CD CLI is configured, the application can also be checked with:

```bash
argocd app get flavorforge
```

This provides information about:

* Application status
* Sync status
* Health status
* Repository
* Revision
* Kubernetes resources
* Application destination

The application name used throughout the FlavorForge GitOps workflow is:

```text
flavorforge
```

---

## 6. Application Architecture

The created application establishes the following GitOps relationship:

```text
┌──────────────────────────┐
│   FlavorForge Git Repo   │
│                          │
│ Kubernetes Configuration │
└────────────┬─────────────┘
             │
             │ Git
             ▼
┌──────────────────────────┐
│         Argo CD          │
│                          │
│ Application: flavorforge │
└────────────┬─────────────┘
             │
             │ Sync
             ▼
┌──────────────────────────┐
│       AKS Cluster        │
│                          │
│    FlavorForge App       │
└──────────────────────────┘
```

Argo CD now has a defined application that connects the Git desired state with the Kubernetes environment.

---

## 7. Application Status

The final target state for the FlavorForge Application is:

```text
SYNC STATUS    : Synced
HEALTH STATUS  : Healthy
```

The actual final verification later in this journey confirmed:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

This confirms that the `flavorforge` Application successfully reached the desired GitOps state.

The complete synchronization result is documented in:

```text
06-argocd-verification.md
```

---

## Result

The `flavorforge` Argo CD Application has been created and connected to the FlavorForge GitOps configuration.

The GitOps deployment relationship is now established:

```text
Git Repository
      ↓
flavorforge Application
      ↓
    Argo CD
      ↓
    AKS Cluster
```

The next step is to synchronize the application and understand how Argo CD keeps the Kubernetes environment aligned with Git.

➡️ **Next: `05-sync-and-self-healing.md`**
