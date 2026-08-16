# Azure DevOps Pipeline Documentation

## Overview

This directory contains the Azure DevOps CI/CD documentation for the **FlavorForge Azure DevSecOps Capstone Project**.

The documentation is intentionally divided into two guides because they serve different purposes.

- **azure-devops-setup.md** explains **how to configure Azure DevOps** from scratch.
- **azure-devops-pipeline.md** explains **how the CI/CD pipeline works** after it has been configured.

This separation makes it easier for developers to recreate the project while also providing reviewers and interviewers with a clear explanation of the pipeline architecture and workflow.

---

# Documentation Guide

| Document | Purpose | Link |
|----------|---------|------|
| `azure-devops-setup-guide.md` | Step-by-step Azure DevOps configuration guide | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/pipeline/azure-devops-setup-guide.md |
| `azure-devops-pipeline.md` | Detailed explanation of the CI/CD pipeline and each stage | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/pipeline/azure-devops-pipeline.md |

---

# Recommended Reading Order

If you are setting up the project for the first time, read the documents in the following order.

```text
1. azure-devops-setup.md
        │
        ▼
Configure Azure DevOps
        │
        ▼
Create and Run the Pipeline
        │
        ▼
2. azure-devops-pipeline.md
        │
        ▼
Understand the CI/CD Workflow
```

---

# Documentation Flow

```text
Developer
        │
        ▼
azure-devops-setup.md
(How to configure Azure DevOps)
        │
        ▼
Azure DevOps Pipeline Created
        │
        ▼
azure-devops-pipeline.md
(How the pipeline works)
```

---


# Related Documentation

Additional project documentation is available in the following locations.

| Document | Description | Link |
|----------|-------------|------|
| `../implementation/README.md` | Complete project implementation guide | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/implementation/README.md |
| `../project/` | Project documentation, verification, and validation reports | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/tree/main/docs/project |
| `../troubleshooting/README.md` | Project troubleshooting guides | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/troubleshooting/README.md |
| `../../README.md` | Project overview and quick start guide | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/README.md |

---

# Summary

The Azure DevOps documentation is separated into two complementary guides:

- **azure-devops-setup.md** focuses on recreating the Azure DevOps configuration.
- **azure-devops-pipeline.md** focuses on understanding the CI/CD pipeline architecture, stages, and deployment workflow.

Together, these documents provide both the implementation steps and the architectural understanding required to recreate, maintain, and explain the FlavorForge Azure DevSecOps CI/CD pipeline.
