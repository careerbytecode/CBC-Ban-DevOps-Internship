# 05 — Argo CD Sync and Self-Healing

## Objective

In this stage, we verify how Argo CD keeps the FlavorForge Kubernetes environment aligned with the configuration stored in Git.

The two important GitOps concepts are:

* **Synchronization** — Argo CD compares the desired state in Git with the live state in Kubernetes.
* **Self-healing** — Argo CD can detect drift in the live Kubernetes environment and restore the desired state when automated self-healing is enabled.

The desired GitOps flow is:

```text
Git Repository
      ↓
 Desired State
      ↓
    Argo CD
      ↓
 Compare
      ↓
Kubernetes Live State
      ↓
   Synchronize
      ↓
FlavorForge
```

---

## 1. Check the FlavorForge Application

Verify the Argo CD Application:

```bash
kubectl get applications -n argocd
```

The final FlavorForge application state was:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

This confirms that the desired configuration and the live Kubernetes state were synchronized successfully.

---

## 2. Understand Sync Status

Argo CD uses the **Sync Status** to indicate whether the live Kubernetes resources match the desired configuration from Git.

The important states are:

| Sync Status    | Meaning                                       |
| -------------- | --------------------------------------------- |
| 🟢 `Synced`    | Live state matches the desired Git state      |
| 🟠 `OutOfSync` | Live state differs from the desired Git state |

For FlavorForge, the final status was:

```text
SYNC STATUS: Synced
```

This means the application reached the desired GitOps state.

---

## 3. Understand Health Status

Argo CD also reports the health of the managed application.

The important states include:

| Health Status    | Meaning                                 |
| ---------------- | --------------------------------------- |
| 🟢 `Healthy`     | Resources are operating as expected     |
| 🟡 `Progressing` | Resources are still becoming ready      |
| 🔴 `Degraded`    | One or more resources require attention |

FlavorForge reached:

```text
HEALTH STATUS: Healthy
```

Therefore, the Argo CD Application was both:

```text
Synced + Healthy
```

---

## 4. Check the Application Details

For additional verification:

```bash
kubectl describe application flavorforge -n argocd
```

If the Argo CD CLI is configured, the same application can be inspected with:

```bash
argocd app get flavorforge
```

These commands provide additional information about:

* Git repository
* Target revision
* Kubernetes destination
* Synchronization state
* Application health
* Managed resources

---

## 5. How Self-Healing Works

Self-healing is an important part of GitOps.

The basic concept is:

```text
              Git
               │
               ▼
        Desired Configuration
               │
               ▼
            Argo CD
               │
               ▼
       Kubernetes Cluster
               │
               ▼
       FlavorForge Resources
```

If someone manually changes a managed Kubernetes resource, the live state can become different from the desired state stored in Git.

Argo CD can detect this difference as **drift**.

With automated synchronization and self-healing enabled, Argo CD can reconcile the live environment back toward the desired configuration.

```text
Git Desired State
       │
       ▼
    Argo CD
       │
       ├───────────────┐
       │               │
       ▼               ▼
   Synced          Drift Detected
                       │
                       ▼
                  Reconciliation
                       │
                       ▼
                Desired State Restored
```

---

## 6. Why Self-Healing Matters

Without GitOps reconciliation, a manual Kubernetes change could remain in the cluster even though it is not represented in Git.

With self-healing, the Git repository remains the source of truth.

This provides:

* 🔐 Controlled configuration
* 🔄 Continuous reconciliation
* 📋 Consistent deployments
* 🛠️ Reduced manual intervention
* 🔎 Better visibility into configuration drift

---

## 7. FlavorForge GitOps State

The final FlavorForge Argo CD Application demonstrated the desired state:

```text
Application : flavorforge
Sync        : Synced
Health      : Healthy
```

Therefore:

```text
┌───────────────────────┐
│   Git Repository      │
│   Desired State       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       Argo CD         │
│   GitOps Controller   │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     AKS Cluster       │
│   Live State          │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     FlavorForge       │
│  Synced + Healthy     │
└───────────────────────┘
```

---

## 8. Evidence

The primary verification command is:

```bash
kubectl get applications -n argocd
```

Final result:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

The Argo CD evidence is maintained under:

```text
screenshots/argo-cd/
```

The most important evidence is the Argo CD Application showing:

```text
flavorforge
Synced
Healthy
```

---

## Result

The FlavorForge Argo CD Application reached the desired GitOps state:

```text
🟢 Synced
🟢 Healthy
```

This confirms that Argo CD successfully synchronized the FlavorForge application with its desired Kubernetes configuration.

The self-healing concept demonstrates how Argo CD can continuously reconcile Kubernetes resources when drift occurs and self-healing is enabled.

➡️ **Next: `06-argocd-verification.md`**
