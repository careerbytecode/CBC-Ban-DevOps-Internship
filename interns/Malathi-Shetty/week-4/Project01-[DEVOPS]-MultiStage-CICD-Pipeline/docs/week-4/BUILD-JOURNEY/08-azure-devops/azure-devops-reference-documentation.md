# 📚 Azure DevOps Reference Documentation & Learning Resources

This section provides additional reference material for understanding,
configuring, using, securing, and troubleshooting Azure DevOps.

The FlavorForge project uses Azure DevOps Pipelines to demonstrate
CI/CD, automated testing, security scanning, container image delivery,
and Kubernetes deployment.

> **Recommended approach:** Start with Microsoft Learn and official
> Azure DevOps documentation, then use the videos and tutorials for
> additional practical understanding.

---

## 1. Official Azure DevOps Documentation

### Azure DevOps Documentation

The official Microsoft documentation is the primary reference for Azure
DevOps services, including Boards, Repos, Pipelines, Test Plans, and Artifacts.

[Azure DevOps Documentation](https://learn.microsoft.com/azure/devops/)

Recommended for:

- Understanding Azure DevOps
- Projects and organizations
- Repositories
- Pipelines
- Boards
- Artifacts
- Test Plans
- Security and permissions

---

## 2. Azure Pipelines

Azure Pipelines is the primary CI/CD service used by FlavorForge.

[Azure Pipelines Documentation](https://learn.microsoft.com/azure/devops/pipelines/)

Important topics include:

- Continuous Integration
- Continuous Delivery
- Pipeline stages
- Jobs
- Steps
- Tasks
- Agents
- Artifacts
- Deployment
- Approvals
- Environments

### FlavorForge

FlavorForge uses Azure DevOps Pipelines to connect:

```text
GitHub
   ↓
Build
   ↓
Test
   ↓
SonarCloud
   ↓
Trivy
   ↓
Docker Build
   ↓
Push to ACR
   ↓
AKS Deployment
````

---

## 3. YAML Pipelines

FlavorForge uses a YAML-based pipeline.

[Azure Pipelines YAML Schema](https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/)

This reference explains:

* stages
* jobs
* steps
* tasks
* variables
* conditions
* dependencies
* templates
* deployment jobs

Readers can compare the official YAML schema with:

```text
azure-pipelines.yml
```

in the FlavorForge repository.

---

## 4. Pipeline Stages, Jobs and Steps

Understanding the hierarchy is important when reading a complex pipeline.

```text
Pipeline
   │
   ├── Stage
   │      ├── Job
   │      │     ├── Step
   │      │     └── Step
   │      └── Job
   │
   └── Stage
```

[Stages in Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/process/stages)

[Jobs in Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/process/phases)

[Steps in Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/process/tasks)

---

## 5. Azure DevOps Agents

Pipelines execute jobs using agents.

[Azure Pipelines Agents](https://learn.microsoft.com/azure/devops/pipelines/agents/agents)

Important concepts:

* Microsoft-hosted agents
* Self-hosted agents
* Agent pools
* Agent capabilities
* Agent jobs
* Build environments

This is useful when troubleshooting pipeline execution problems.

---

## 6. Microsoft-Hosted Agents

FlavorForge can use Microsoft-hosted build infrastructure when available.

[Microsoft-hosted agents](https://learn.microsoft.com/azure/devops/pipelines/agents/hosted)

Readers should understand:

* Available images
* Preinstalled software
* Hosted-agent limitations
* Parallel jobs
* Usage limits

---

## 7. Variables and Variable Groups

FlavorForge uses pipeline variables and Azure DevOps variable groups for environment-specific configuration.

[Define variables](https://learn.microsoft.com/azure/devops/pipelines/process/variables)

[Variable Groups](https://learn.microsoft.com/azure/devops/pipelines/library/variable-groups)

Important concepts:

* Pipeline variables
* Environment variables
* Variable groups
* Secret variables
* Runtime variables
* Variable scopes

---

## 8. Service Connections

Service connections allow Azure DevOps to authenticate with external services.

[Service Connections](https://learn.microsoft.com/azure/devops/pipelines/library/service-endpoints)

FlavorForge uses service connections for integrations such as:

* Azure
* Azure Container Registry
* SonarCloud

Readers should understand why credentials should not be hard-coded inside YAML.

---

## 9. Azure Resource Manager Service Connection

For Azure deployments, Azure DevOps can use an Azure Resource Manager service connection.

[Azure Resource Manager Service Connection](https://learn.microsoft.com/azure/devops/pipelines/library/connect-to-azure)

Conceptually:

```text
Azure DevOps
     │
     │ Service Connection
     ▼
Azure
     │
     ├── ACR
     └── AKS
```

---

## 10. Environments

Azure DevOps environments provide deployment targets and deployment history.

[Azure DevOps Environments](https://learn.microsoft.com/azure/devops/pipelines/process/environments)

FlavorForge uses environments to demonstrate environment-aware delivery.

Important concepts:

* Environments
* Deployment history
* Environment resources
* Approvals
* Checks
* Deployment jobs

---

## 11. Approvals and Checks

Approvals and checks can control deployments before they proceed.

[Approvals and Checks](https://learn.microsoft.com/azure/devops/pipelines/process/approvals)

Important concepts:

* Manual approvals
* Environment checks
* Branch control
* Business-hour checks
* Azure Function checks
* REST API checks

### FlavorForge

FlavorForge demonstrates approval-controlled QA and Production workflow.

> **Important:** An Azure DevOps environment approval/check is not the same thing as a separate YAML deployment stage.

---

## 12. Pipeline Artifacts

Pipeline artifacts allow build output to be passed between stages and jobs.

[Publish and download pipeline artifacts](https://learn.microsoft.com/azure/devops/pipelines/artifacts/pipeline-artifacts)

Useful for understanding:

```text
Build
  ↓
Artifact
  ↓
Test/Security
  ↓
Deployment
```

---

## 13. Azure DevOps Security

Security should be considered when designing CI/CD pipelines.

[Azure DevOps Security](https://learn.microsoft.com/azure/devops/organizations/security/)

Important topics:

* Permissions
* Access control
* Service connections
* Secret management
* Pipeline security
* Repository permissions
* Environment permissions

---

## 14. Azure DevOps with GitHub

FlavorForge uses GitHub as the source repository while Azure DevOps provides the CI/CD pipeline.

[Build GitHub repositories with Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/repos/github)

Conceptually:

```text
GitHub
   │
   │ Source
   ▼
Azure DevOps Pipeline
   │
   ├── Build
   ├── Test
   ├── Security
   ├── Quality
   └── Deployment
```

---

## 15. CI/CD Concepts

For readers new to DevOps:

[What is CI/CD?](https://learn.microsoft.com/azure/devops/pipelines/release/what-is-continuous-integration)

The basic model is:

```text
Developer
    ↓
Git Push
    ↓
Continuous Integration
    ↓
Build
    ↓
Test
    ↓
Security / Quality
    ↓
Package
    ↓
Deploy
    ↓
Verification
```

---

## 16. Azure DevOps + Docker

Azure Pipelines can build and push Docker images.

[Build and push Docker images](https://learn.microsoft.com/azure/devops/pipelines/ecosystems/containers/build-image)

FlavorForge follows the general pattern:

```text
Source Code
     ↓
Docker Build
     ↓
Trivy Scan
     ↓
Docker Image
     ↓
Azure Container Registry
```

---

## 17. Azure DevOps + Azure Container Registry

[Build and push Docker images to Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-docker-cli)

This helps readers understand the relationship between:

```text
Azure DevOps
      ↓
Docker Image
      ↓
ACR
      ↓
AKS
```

---

## 18. Azure DevOps + Kubernetes

Azure Pipelines can deploy applications to Kubernetes clusters.

[Deploy to Kubernetes with Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/ecosystems/kubernetes/deploy)

Important concepts:

* Kubernetes service connections
* kubectl
* Kubernetes manifests
* Deployment jobs
* AKS deployment

### FlavorForge

The FlavorForge pipeline contains a real AKS deployment stage.

The deployment process includes:

```text
Azure DevOps
      ↓
AKS Credentials
      ↓
kubectl
      ↓
Kustomize
      ↓
Kubernetes
      ↓
FlavorForge
```

---

## 19. Azure Kubernetes Service (AKS)

[Azure Kubernetes Service Documentation](https://learn.microsoft.com/azure/aks/)

Useful topics:

* AKS architecture
* Cluster management
* Nodes
* Deployments
* Services
* Ingress
* Scaling
* Monitoring
* Security

This should be used together with the FlavorForge Kubernetes documentation.

---

## 20. Azure DevOps + GitOps

Azure DevOps can participate in GitOps workflows, although GitOps responsibilities may be handled by a dedicated tool such as Argo CD.

[GitOps with Azure](https://learn.microsoft.com/azure/architecture/guide/aks/aks-cicd-gitops)

### FlavorForge Architecture

FlavorForge demonstrates both approaches:

```text
Azure DevOps
     │
     ├── CI
     ├── Testing
     ├── Security
     ├── Quality
     └── Current AKS deployment
     
Argo CD
     │
     └── GitOps continuous delivery demonstration
```

> **Important:** Argo CD is not the only deployment mechanism in FlavorForge. Azure DevOps performs the current AKS deployment, while Argo CD demonstrates GitOps-based continuous delivery.

---

## 21. Azure DevOps CLI

The Azure DevOps CLI can be used to automate and inspect DevOps resources.

[Azure DevOps CLI](https://learn.microsoft.com/azure/devops/cli/)

Useful commands include:

```bash
az devops configure
az devops project list
az pipelines list
az pipelines show
az pipelines run
```

---

## 22. Azure DevOps REST API

For automation and integrations:

[Azure DevOps REST API](https://learn.microsoft.com/rest/api/azure/devops/)

Useful for:

* Pipelines
* Builds
* Releases
* Repositories
* Work items
* Projects
* Permissions

---

# 🎥 23. Official Microsoft Azure DevOps Videos

Microsoft provides Azure DevOps learning videos through Microsoft Learn and the official Azure DevOps YouTube presence.

### Microsoft Azure DevOps YouTube

[Azure DevOps — Microsoft YouTube](https://www.youtube.com/@AzureDevOps)

Recommended topics to search for:

* Azure Pipelines
* YAML pipelines
* CI/CD
* Azure DevOps environments
* Kubernetes deployment
* GitHub integration
* DevOps security

---

# 🎥 24. Microsoft Learn Video Training

[Microsoft Learn — Azure DevOps](https://learn.microsoft.com/training/browse/?products=azure-devops)

Microsoft Learn provides structured learning modules and video-supported training.

Recommended learning areas:

* Azure Pipelines
* Azure Repos
* Azure DevOps security
* CI/CD
* YAML
* Kubernetes deployment
* GitHub integration

---

# 🎥 25. Azure DevOps Pipeline Tutorials

For practical demonstrations, readers can use Microsoft Learn tutorials covering:

* Creating a pipeline
* YAML pipelines
* Connecting GitHub
* Running builds
* Adding tests
* Publishing artifacts
* Deploying applications
* Using environments
* Adding approvals

> Third-party videos should be treated as supplementary material. Azure DevOps UI and features can change over time, so always verify commands and configuration against current Microsoft documentation.

---

# 26. Recommended Azure DevOps Learning Order

| Order | Resource               | Purpose                           |
| ----: | ---------------------- | --------------------------------- |
|     1 | Azure DevOps Overview  | Understand Azure DevOps           |
|     2 | Azure Pipelines        | Understand CI/CD                  |
|     3 | YAML Schema            | Understand pipeline structure     |
|     4 | Agents                 | Understand execution              |
|     5 | Variables              | Manage configuration              |
|     6 | Service Connections    | Understand authentication         |
|     7 | Environments           | Understand deployment targets     |
|     8 | Approvals & Checks     | Understand controlled deployments |
|     9 | GitHub Integration     | Understand source integration     |
|    10 | Docker                 | Understand container builds       |
|    11 | AKS/Kubernetes         | Understand deployment             |
|    12 | GitOps                 | Understand Argo CD relationship   |
|    13 | Microsoft Learn Videos | Reinforce concepts                |
|    14 | FlavorForge Pipeline   | Apply everything to the project   |

---

# 27. FlavorForge-Specific References

After learning the general Azure DevOps concepts, readers should return to the FlavorForge implementation.

Recommended project documents:

```text
08-azure-devops/
├── README.md
├── azure-devops-reference-documentation.md
└── ...
```

Readers should then review:

```text
azure-pipelines.yml
```

and the associated FlavorForge Azure DevOps documentation.

The goal is to understand not only how Azure DevOps works, but **why each pipeline component was added to FlavorForge**.

---

# 28. Reference Principle

Use the following hierarchy when researching Azure DevOps:

```text
Microsoft Learn
       ↓
Official Azure DevOps Documentation
       ↓
Official Microsoft Examples
       ↓
Hands-on Tutorials
       ↓
Videos
       ↓
FlavorForge Implementation
```

> **Source-of-truth principle:** When a tutorial or video conflicts with current Microsoft documentation, prefer the current official Microsoft documentation.