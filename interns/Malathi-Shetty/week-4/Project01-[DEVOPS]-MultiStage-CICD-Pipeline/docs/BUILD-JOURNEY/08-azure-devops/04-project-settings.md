# Step 4 — Configure and Verify Project Settings

## What We Wanted

After creating the FlavorForge Azure DevOps project and connecting the source repository, the next step was to review the project-level settings.

Project settings provide the administrative configuration area for the Azure DevOps project.

For the FlavorForge project, we used Project Settings to verify the project configuration and prepare the project for the remaining Azure DevOps setup.

The project is:

```text
FlavorForge – Azure DevSecOps Capstone
````

The Azure DevOps organization is:

```text
malathiabhilash
```

---

# Step 4.1 — Open Project Settings

## Where We Went

Open the FlavorForge project in Azure DevOps:

```text
Azure DevOps
    ↓
malathiabhilash
    ↓
FlavorForge – Azure DevSecOps Capstone
```

From the project, open:

```text
Project settings
```

Project Settings provides access to project-level administration and configuration.

---

# Step 4.2 — Open Project Overview

From Project Settings, open:

```text
Project Settings
    ↓
Overview
```

The Overview page displays the main project configuration.

The FlavorForge project details were verified from this page.

---

# Step 4.3 — Verify Project Name

The project name is:

```text
FlavorForge – Azure DevSecOps Capstone
```

This is the dedicated Azure DevOps project created for the FlavorForge Azure DevSecOps capstone.

---

# Step 4.4 — Verify Project Description

The project description is:

```text
Enterprise-grade Azure DevSecOps project demonstrating a complete CI/CD pipeline using GitHub, Azure DevOps, Docker, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes, NGINX Ingress, SonarCloud, Trivy, ConfigMaps, Secrets, and Horizontal Pod Autoscaler (HPA). The pipeline automatically builds, tests, scans, containerizes, pushes images to ACR, and deploys to AKS across Development, QA, and Production environments.
```

The description explains the purpose of the project and the major technologies used in the FlavorForge DevSecOps implementation.

---

# Step 4.5 — Verify Project Process

The configured project process is:

```text
Basic
```

The project settings confirm:

| Setting | Value   |
| ------- | ------- |
| Process | `Basic` |

The project uses the Basic process for Azure DevOps work tracking.

---

# Step 4.6 — Verify Project Visibility

The project visibility is:

```text
Private
```

The project overview identifies the FlavorForge project as:

```text
FlavorForge – Azure DevSecOps Capstone

Private
```

Therefore, the project is configured as a private Azure DevOps project.

---

# Step 4.7 — Verify Project Administrator

The Project Settings page shows:

```text
Project administrators

Malathi Shetty
```

The associated account shown in the project settings is:

```text
malathiabhilash@outlook.com
```

The page also provides:

```text
Add administrator
```

No additional administrator is documented because no additional administrator was confirmed in the available evidence.

---

# Step 4.8 — Review Azure DevOps Services

The Project Settings page also shows the Azure DevOps services enabled for the project.

The confirmed services are:

| Service    | Status |
| ---------- | ------ |
| Boards     | On     |
| Repos      | On     |
| Pipelines  | On     |
| Test Plans | On     |
| Artifacts  | On     |

These services provide the capabilities required for the FlavorForge Azure DevSecOps implementation.

---

## Boards

The project has:

```text
Boards
On
```

Boards provide agile planning capabilities within Azure DevOps.

For this project, Boards are enabled.

---

## Repos

The project has:

```text
Repos
On
```

Repos provide Git repository functionality within Azure DevOps.

The FlavorForge Azure DevOps repository is:

```text
FlavorForge – Azure DevSecOps Capstone
```

---

## Pipelines

The project has:

```text
Pipelines
On
```

Pipelines provide the CI/CD functionality used by the FlavorForge project.

The later pipeline configuration uses Azure DevOps Pipelines to automate the DevSecOps workflow.

---

## Test Plans

The project has:

```text
Test Plans
On
```

Test Plans provide structured testing capabilities within Azure DevOps.

For this project, the service is enabled.

---

## Artifacts

The project has:

```text
Artifacts
On
```

Artifacts provides package-feed capabilities within Azure DevOps.

For this project, the service is enabled.

---

# Step 4.9 — Review Project Configuration

The confirmed project configuration is:

| Field                 | Confirmed Value                          |
| --------------------- | ---------------------------------------- |
| Organization          | `malathiabhilash`                        |
| Project Name          | `FlavorForge – Azure DevSecOps Capstone` |
| Process               | `Basic`                                  |
| Visibility            | `Private`                                |
| Project Administrator | `Malathi Shetty`                         |
| Administrator Account | `malathiabhilash@outlook.com`            |
| Boards                | `On`                                     |
| Repos                 | `On`                                     |
| Pipelines             | `On`                                     |
| Test Plans            | `On`                                     |
| Artifacts             | `On`                                     |

---

# Step 4.10 — Project Settings Areas

Project Settings provides access to additional project-level configuration areas.

The exact options available can depend on the Azure DevOps project configuration and enabled services.

For the FlavorForge project, the later BUILD-JOURNEY steps use Project Settings for areas including:

```text
Service connections
Library
Agent pools
```

These areas are documented separately so that each configuration step can be verified independently.

The following documents cover those configurations:

```text
05-agent-pools.md
06-service-connections.md
07-library-variable-groups.md
08-library-approvals-and-checks.md
```

---

# Step 4.11 — Verify Project Settings Before Continuing

Before moving to the next configuration step, verify the project-level settings.

Open:

```text
Project Settings
    ↓
Overview
```

Verify:

```text
Project:
FlavorForge – Azure DevSecOps Capstone
```

Verify:

```text
Process:
Basic
```

Verify:

```text
Visibility:
Private
```

Verify:

```text
Project administrator:
Malathi Shetty
```

Verify the enabled services:

```text
Boards       → On
Repos        → On
Pipelines    → On
Test Plans   → On
Artifacts    → On
```

---

# Screenshot

Use the actual Azure DevOps Project Settings screenshot from the repository evidence.

The screenshot should show the Project Settings → Overview page and, where visible:

```text
FlavorForge – Azure DevSecOps Capstone
```

```text
Process:
Basic
```

```text
Project administrator:
Malathi Shetty
```

and the enabled services:

```text
Boards
Repos
Pipelines
Test Plans
Artifacts
```

Do not invent a screenshot filename.

Use the actual screenshot path from the repository once it has been confirmed.

Example placeholder:

```markdown
![FlavorForge Project Settings](<actual-screenshot-path>)
```

---

# Result

The FlavorForge Azure DevOps project settings were reviewed and verified.

The confirmed configuration is:

```text
Organization
    ↓
malathiabhilash

Project
    ↓
FlavorForge – Azure DevSecOps Capstone

Process
    ↓
Basic

Visibility
    ↓
Private

Administrator
    ↓
Malathi Shetty
```

The following Azure DevOps services are enabled:

```text
Boards
Repos
Pipelines
Test Plans
Artifacts
```