# 02 — Documentation Generator

## Overview

FlavorForge uses an automated documentation-generation approach to keep project documentation consistent with the actual repository structure.

Instead of maintaining every project document manually, the documentation generator can inspect the repository and produce structured documentation from the available project files, configurations, manifests, scripts, and implementation details.

The goal is to make documentation:

* **Consistent**
* **Repeatable**
* **Easy to maintain**
* **Aligned with the actual project**
* **Suitable for project review and demonstration**

> **Important:** The documentation generator supports the documentation process. Generated documentation is still reviewed against the actual project evidence before being considered final.

---

## 1. Why Documentation Automation Was Used

FlavorForge contains multiple DevSecOps components:

```text
GitHub
   ↓
Application
   ↓
Docker
   ↓
Azure
   ↓
Kubernetes
   ↓
Kustomize
   ↓
Azure DevOps
   ↓
SonarCloud
   ↓
Trivy
   ↓
Argo CD
```

Manually documenting every component can introduce:

* Incorrect filenames
* Outdated commands
* Incorrect image tags
* Incorrect Azure resource names
* Missing configuration details
* Duplicate explanations
* Documentation that no longer matches the repository

Documentation automation helps reduce these problems by generating content from the project itself.

---

## 2. Documentation Generation Flow

The documentation workflow is:

```text
FlavorForge Repository
        ↓
Repository Files
        ↓
Configuration / Manifests / Source
        ↓
Documentation Generator
        ↓
Generated Documentation
        ↓
Manual Verification
        ↓
Final BUILD-JOURNEY Documentation
```

The generated documentation is therefore treated as a starting point that is verified against the actual implementation and evidence.

---

## 3. Repository Information Used

The documentation process can use information from areas such as:

```text
Application source
Dockerfiles
Docker Compose configuration
Kubernetes manifests
Kustomize configuration
Azure DevOps pipeline YAML
SonarCloud configuration
Trivy reports
Argo CD manifests
README files
Scripts
Project configuration
```

This allows the documentation to describe the implementation rather than relying only on manually written explanations.

---

## 4. BUILD-JOURNEY Organization

The final documentation is organized into numbered stages so that a learner can follow the project from beginning to end.

```text
BUILD-JOURNEY/
│
├── 01-prerequisites/
├── 02-github/
├── 03-application/
├── 04-docker/
├── 05-azure/
├── 06-kubernetes/
├── 07-kustomize/
├── 08-azure-devops/
├── 09-sonarcloud/
├── 10-argocd/
├── 11-devsecops/
├── 12-documentation/
├── 13-troubleshooting/
└── 14-final-verification/
```

Each section has a specific purpose.

The numbering provides a clear learning path while allowing the detailed documents to remain available as reference material.

---

## 5. Documentation Generation and Verification

Generated documentation should not automatically be treated as final documentation.

Each generated section is checked for:

| Verification Area    | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| File names           | Confirm documented paths actually exist              |
| Commands             | Confirm commands match the implementation            |
| Azure resources      | Confirm resource names and configuration             |
| Docker images        | Confirm image names and tags                         |
| Kubernetes resources | Confirm manifests and namespaces                     |
| Pipeline stages      | Confirm Azure DevOps workflow                        |
| Security tools       | Confirm SonarCloud and Trivy integration             |
| Argo CD              | Confirm GitOps configuration                         |
| Screenshots          | Confirm evidence matches the documented step         |
| Links                | Confirm navigation works                             |
| README               | Confirm the overall journey is correctly represented |

This verification step prevents generated documentation from becoming disconnected from the actual project.

---

## 6. Generated Documentation as a Reference

The detailed BUILD-JOURNEY documentation serves two purposes.

### Primary purpose

Provide a step-by-step guide for someone learning how FlavorForge was built.

### Secondary purpose

Provide technical reference material for:

* Project review
* Troubleshooting
* Demonstration
* Interview discussion
* DevSecOps evidence
* Future maintenance

The documentation therefore records both **what was done** and **how it was verified**.

---

## 7. Evidence-Based Documentation

Where possible, documentation is supported by actual project evidence.

Examples include:

```text
Git commands
Docker commands
Azure CLI output
kubectl output
Pipeline results
SonarCloud results
Trivy reports
Argo CD application status
Screenshots
Generated reports
```

For example, the final Argo CD verification demonstrated:

```text
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

This is stronger evidence than simply stating that Argo CD was configured.

Similarly, Trivy documentation references the generated reports under:

```text
reports/trivy/
```

The documentation therefore connects the written explanation to actual project artifacts.

---

## 8. Keeping Documentation Maintainable

When the project changes, the documentation should be regenerated or updated and then verified again.

The recommended workflow is:

```text
Project Change
     ↓
Update Implementation
     ↓
Regenerate / Update Documentation
     ↓
Review Generated Content
     ↓
Verify Against Evidence
     ↓
Commit Documentation
```

This reduces the possibility of maintaining documentation that describes an older version of the project.

---

## 9. Documentation Quality Rules

The FlavorForge documentation follows these principles:

### 1. Use actual project names

For example:

```text
flavorforge-rg
flavorforgeacr2026ms
flavorforge-aks
```

### 2. Do not invent verification results

Documentation should only claim a successful result when supporting evidence exists.

### 3. Keep commands reproducible

Commands should be presented in a form that another learner can understand and execute.

### 4. Separate implementation from verification

A configuration step explains **what was created**.

A verification step explains **how it was confirmed**.

### 5. Preserve troubleshooting information

Known issues and their recovery steps should remain available instead of being hidden.

### 6. Keep the learning path simple

The numbered BUILD-JOURNEY should allow a beginner to progress from prerequisites to final verification without needing to understand the entire repository structure first.

---

## 10. Result

The documentation generator provides a repeatable way to create and maintain technical documentation for the FlavorForge project.

The final process is:

```text
Build FlavorForge
      ↓
Collect Evidence
      ↓
Generate Documentation
      ↓
Review Documentation
      ↓
Verify Against Repository
      ↓
Verify Against Screenshots / Reports
      ↓
Publish Final BUILD-JOURNEY
```

This approach keeps the documentation connected to the actual implementation while still providing a clear beginner-friendly learning path.

---

## Final Takeaway

Documentation automation is not intended to replace technical verification.

It provides a **repeatable documentation foundation**, while the final review ensures that the documented commands, configurations, resource names, screenshots, security results, and deployment states accurately represent the FlavorForge implementation.

The result is a BUILD-JOURNEY that is both **easy for a beginner to follow** and **supported by actual project evidence**.
