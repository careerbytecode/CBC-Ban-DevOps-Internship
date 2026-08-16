# 03 — Git Repository Connection

## Objective

Connect Argo CD to the Git repository that contains the desired Kubernetes configuration for FlavorForge.

In the GitOps model, Git acts as the **source of truth**. Argo CD uses the repository configuration to monitor the desired application state and later synchronize that state with the AKS cluster.

The connection flow is:

```text
FlavorForge Git Repository
          ↓
        Argo CD
          ↓
   GitOps Application
          ↓
      AKS Cluster
```

---

## 1. Identify the Git Repository

The FlavorForge project is maintained in the Git repository:

```text
flavorforge-azure-devsecops-capstone
```

The repository contains the Kubernetes deployment configuration used by the FlavorForge application.

The relevant deployment configuration is maintained in Git so that Argo CD can continuously compare the desired state with the live Kubernetes state.

---

## 2. Verify the Argo CD Repository Configuration

Before creating the FlavorForge Argo CD Application, verify that Argo CD can access the Git repository.

The Argo CD repository configuration can be checked through the Argo CD interface or CLI.

The purpose of this step is to confirm:

```text
Git Repository
      ↓
Repository Access
      ↓
Argo CD
```

A successful repository connection means Argo CD can retrieve the configuration required for the next stage.

---

## 3. Create the Argo CD Application Configuration

The FlavorForge Argo CD Application configuration is maintained as Kubernetes configuration.

The project contains the Argo CD configuration under:

```text
argocd/
```

The application definition is represented by:

```text
argocd/flavorforge-app.yaml
```

This configuration connects the FlavorForge Git repository with the Kubernetes destination.

The overall relationship is:

```text
Git Repository
      │
      │  flavorforge-app.yaml
      ▼
    Argo CD
      │
      ▼
flavorforge Application
      │
      ▼
     AKS
```

---

## 4. Verify the Argo CD Application Definition

Before applying the application configuration, inspect the manifest:

```bash
cat argocd/flavorforge-app.yaml
```

This allows the configuration to be reviewed before it is submitted to the Kubernetes cluster.

The important information in the application definition includes:

| Configuration         | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| Application name      | Identifies the FlavorForge application in Argo CD     |
| Git repository        | Defines the source of the desired configuration       |
| Repository path       | Identifies which configuration Argo CD should monitor |
| Target revision       | Defines the Git revision to track                     |
| Destination server    | Defines the Kubernetes cluster                        |
| Destination namespace | Defines where FlavorForge resources are deployed      |

---

## 5. Verify Repository Connectivity

Argo CD repository connectivity can be checked using:

```bash
argocd repo list
```

The repository should appear in the configured repositories.

A successful connection confirms that Argo CD can communicate with the Git repository and retrieve its configuration.

If the repository is accessible, the next step is to create or apply the `flavorforge` Argo CD Application.

---

## GitOps Relationship

At this point in the journey, the connection between Git and Argo CD is established conceptually as:

```text
┌─────────────────────────┐
│   FlavorForge Git Repo  │
│                         │
│ Kubernetes Configuration│
└────────────┬────────────┘
             │
             │ Git
             ▼
┌─────────────────────────┐
│         Argo CD         │
│                         │
│   GitOps Controller     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      AKS Cluster        │
│                         │
│   FlavorForge Workload  │
└─────────────────────────┘
```

Git therefore becomes the desired-state source for the FlavorForge deployment.

---

## Result

The FlavorForge Git repository is prepared as the source for Argo CD.

Argo CD can use the repository configuration to create and manage the `flavorforge` Application.

The next step is to create the Argo CD Application and point it to the FlavorForge Kubernetes configuration.

➡️ **Next: `04-application-creation.md`**
