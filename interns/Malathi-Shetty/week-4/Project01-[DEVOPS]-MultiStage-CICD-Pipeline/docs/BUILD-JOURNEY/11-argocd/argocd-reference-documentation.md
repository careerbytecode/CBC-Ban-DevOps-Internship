# 📚 Argo CD — Reference Documentation & Learning Resources

This section provides additional reference material for understanding, installing, configuring, and troubleshooting **Argo CD and GitOps**.

The FlavorForge project uses Argo CD to demonstrate GitOps-based continuous delivery for Kubernetes. These resources are provided for readers who want to understand Argo CD beyond the project-specific implementation.

> **Recommended approach:** Start with the official Argo CD documentation, then use the tutorials and videos for additional practical understanding.

---

## 1. Official Argo CD Documentation

### Argo CD Official Documentation

The official documentation is the primary reference for Argo CD concepts, installation, configuration, applications, synchronization, security, and troubleshooting.

[Argo CD Official Documentation](https://argo-cd.readthedocs.io/en/stable/)

Argo CD describes itself as a declarative GitOps continuous delivery tool for Kubernetes. Git repositories act as the source of truth for the desired application state. ([Argo CD][1])

### Getting Started

The official Getting Started guide covers:

* Installing Argo CD
* Installing the Argo CD CLI
* Accessing the Argo CD server
* Logging in
* Connecting Kubernetes clusters
* Creating applications from Git repositories
* Synchronizing applications
* Deploying applications

[Argo CD Getting Started Guide](https://argo-cd.readthedocs.io/en/latest/getting_started/)

**Recommended for:** Beginners implementing Argo CD for the first time.

---

## 2. Argo CD Installation Reference

For detailed installation options, use the official installation documentation.

[Argo CD Installation Guide](https://argo-cd.readthedocs.io/en/latest/operator-manual/installation/)

The documentation explains different installation models, including:

* Multi-tenant installation
* Core installation
* High-availability considerations
* Kubernetes installation
* Kustomize installation
* Helm installation
* Supported Kubernetes versions

For production environments, the official documentation distinguishes the standard non-HA installation from production-oriented HA configurations. ([Argo CD][2])

### FlavorForge Installation

FlavorForge uses the Kubernetes installation approach documented by Argo CD.

Example:

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

The current official documentation recommends considering a pinned Argo CD version for production rather than relying indefinitely on the moving `stable` manifest. ([Argo CD][3])

---

# 3. Understanding How Argo CD Works

Before configuring applications, readers should understand the GitOps model.

[Argo CD Overview and Concepts](https://argo-cd.readthedocs.io/en/stable/)

Important concepts include:

* Git as the source of truth
* Desired state
* Live state
* Application
* Synchronization
* Sync status
* Health status
* Kubernetes manifests
* Kustomize
* Helm
* Configuration drift

Argo CD supports several ways of defining Kubernetes resources, including:

* Kustomize
* Helm
* Jsonnet
* Plain YAML/JSON manifests

([Argo CD][1])

---

# 4. Argo CD Architecture

For readers who want to understand what happens internally, the architecture documentation is useful.

[Argo CD Official Documentation — Architecture](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/)

This is particularly useful when explaining the relationship between:

```text
Git Repository
      │
      ▼
   Argo CD
      │
      ▼
 Kubernetes API
      │
      ▼
     AKS
      │
      ▼
FlavorForge Application
```

This helps explain why Argo CD is considered a **GitOps continuous-delivery tool** rather than simply another Kubernetes deployment command.

---

# 5. Creating an Argo CD Application

The Application resource is one of the most important concepts in the FlavorForge implementation.

[Argo CD Application Specification Reference](https://argo-cd.readthedocs.io/en/release-3.0/user-guide/application-specification/)

An Argo CD `Application` defines information such as:

* Git repository
* Git revision/branch
* Manifest path
* Destination Kubernetes cluster
* Destination namespace
* Project
* Sync configuration

The official specification documents the `source` and `destination` portions of the application definition. ([Argo CD][4])

### FlavorForge Example

Your project contains:

```text
argocd/
└── flavorforge-app.yaml
```

This manifest defines the FlavorForge Argo CD application.

Readers can compare the project-specific manifest with the official Application specification.

---

# 6. Declarative Argo CD Configuration

Argo CD applications, projects, and configuration can also be defined declaratively using Kubernetes manifests.

[Argo CD Declarative Setup](https://argo-cd.readthedocs.io/en/release-3.2/operator-manual/declarative-setup/)

This is especially relevant to FlavorForge because the project follows the same GitOps principle:

```text
Configuration
     ↓
     Git
     ↓
Argo CD Application
     ↓
 Kubernetes
```

The official documentation explains that `Application` and `AppProject` resources can be managed declaratively with Kubernetes manifests. ([Argo CD][5])

---

# 7. Argo CD CLI Reference

For command-line operations, readers should use the official CLI documentation.

[Argo CD CLI Documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/)

Useful commands to understand include:

```bash
argocd login
argocd app list
argocd app get
argocd app sync
argocd app history
argocd app diff
```

The CLI can be used alongside the Argo CD web UI.

---

# 8. Argo CD Sync and Deployment

Synchronization is a key part of GitOps.

[Argo CD Sync Documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/)

Conceptually:

```text
Git Desired State
        │
        ▼
     Argo CD
        │
        │ Compare
        ▼
Kubernetes Live State
        │
        ▼
   Sync / Reconcile
```

Readers should understand the difference between:

**Synced**

and

**OutOfSync**

as well as application health such as:

**Healthy**

or other health states.

---

# 9. Argo CD + Kustomize

This is particularly relevant to FlavorForge because your Kubernetes deployment uses Kustomize.

[Argo CD Kustomize Documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/kustomize/)

The FlavorForge project contains environment-specific Kubernetes configuration:

```text
kubernetes/
├── base/
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

This allows the same application configuration model to be adapted for different environments.

---

# 10. Official Argo CD GitHub Repository

The source code, releases, examples, issues, and project development can be found here.

[Argo CD GitHub Repository](https://github.com/argoproj/argo-cd)

This is useful when readers want to:

* Review source code
* Check releases
* Review issues
* Examine implementation details
* Follow project development

---

# 11. Official Argo CD Example Applications

Argo CD maintains example applications that can be used to learn the basic workflow.

The official Getting Started documentation uses the example application repository to demonstrate creating and synchronizing an application. ([Argo CD][3])

[Argo CD Example Applications](https://github.com/argoproj/argocd-example-apps)

This is excellent for beginners because they can practice Argo CD without modifying the FlavorForge project.

---

# 🎥 12. Argo CD Videos

## CNCF — Inside Argo: Automating the Future

This is an official CNCF documentary covering the history and evolution of the Argo project, including Argo CD.

[Inside Argo: Automating the Future — CNCF](https://www.youtube.com/watch?v=ox3Gx3eCTCs&utm_source=chatgpt.com)

It covers:

* The origins of Argo
* Argo CD
* Argo Workflows
* Argo Events
* Argo Rollouts
* CNCF adoption
* The evolution of the Argo ecosystem

This is more useful for **understanding the project and ecosystem** than for following a hands-on installation.

---

# 13. Additional Video Learning

For hands-on learning, you can also maintain a separate video subsection containing tutorials from established DevOps/Kubernetes educators.

I recommend **not treating third-party videos as authoritative documentation**. Use them to understand the workflow visually, while using the official Argo CD documentation as the source of truth.

For your documentation, I would structure this as:

```text
Official Documentation
        ↓
Official Examples
        ↓
Hands-on Tutorial
        ↓
Video Explanation
        ↓
FlavorForge Implementation
```

That makes your documentation much stronger than simply collecting YouTube links.

---

# 14. Azure / Kubernetes GitOps References

Since FlavorForge runs on **AKS**, readers may also want to understand GitOps in an Azure Kubernetes environment.

Microsoft's GitOps documentation is useful when connecting the general GitOps concept to Azure/Kubernetes environments.

[Azure GitOps documentation](https://learn.microsoft.com/azure/azure-arc/kubernetes/conceptual-gitops-flux2)

However, this should be treated as **additional Azure GitOps reference material**, not as the documentation for how FlavorForge's Argo CD implementation works.

---

# 15. Recommended Reference Order for FlavorForge

For a beginner following the project, I would recommend:

| Order | Resource                  | Purpose                              |
| ----: | ------------------------- | ------------------------------------ |
|     1 | Argo CD Overview          | Understand GitOps                    |
|     2 | Getting Started           | Install Argo CD                      |
|     3 | Architecture              | Understand components                |
|     4 | Application Specification | Understand `Application`             |
|     5 | Declarative Setup         | Understand Git-managed configuration |
|     6 | Kustomize                 | Understand environment configuration |
|     7 | CLI Documentation         | Learn commands                       |
|     8 | Example Applications      | Practice independently               |
|     9 | CNCF Video                | Understand Argo ecosystem            |
|    10 | FlavorForge Argo CD Guide | Apply everything to this project     |


---

- https://argo-cd.readthedocs.io/en/stable/ "Argo CD - Declarative GitOps CD for Kubernetes"
- https://argo-cd.readthedocs.io/en/latest/operator-manual/installation/ "Installation - Argo CD - Declarative GitOps CD for Kubernetes"
- https://argo-cd.readthedocs.io/en/latest/getting_started/ "Getting Started - Argo CD - Declarative GitOps CD for Kubernetes"
- https://argo-cd.readthedocs.io/en/release-3.0/user-guide/application-specification/ "Application Specification Reference - Argo CD - Declarative GitOps CD for Kubernetes"
- https://argo-cd.readthedocs.io/en/release-3.2/operator-manual/declarative-setup/ "Declarative Setup - Argo CD - Declarative GitOps CD for Kubernetes"
