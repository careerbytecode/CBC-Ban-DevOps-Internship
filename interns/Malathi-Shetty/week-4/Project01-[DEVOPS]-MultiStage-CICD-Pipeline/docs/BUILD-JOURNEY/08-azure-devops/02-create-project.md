# Step 2 — Create the Azure DevOps Project

## What We Wanted

After creating the Azure DevOps organization, the next step was to create a dedicated Azure DevOps project for the FlavorForge Azure DevSecOps capstone.

The project provides the Azure DevOps workspace for:

- Repositories
- Pipelines
- Boards
- Test Plans
- Artifacts
- Project-level settings
- Service connections
- Library variable groups
- CI/CD automation

The project currently exists under the Azure DevOps organization:

```text
malathiabhilash
````

The project name is:

```text
FlavorForge – Azure DevSecOps Capstone
```

---

# Step 1 — Open Azure DevOps

## Where We Went

Open Azure DevOps in a web browser and sign in.

Open the Azure DevOps organization:

```text
malathiabhilash
```

Organization URL:

```text
https://dev.azure.com/malathiabhilash/
```

## What We Clicked

1. Open a web browser.
2. Open Azure DevOps.
3. Sign in with the Azure DevOps account.
4. Open the `malathiabhilash` organization.

## What Happened

The Azure DevOps organization page displayed the available projects.

The organization showed:

```text
ACR-Pipeline-Demo

FlavorForge – Azure DevSecOps Capstone
```

---

# Step 2 — Start Creating the Project

## Where We Went

From the Azure DevOps organization page, go to the Projects area.

## What We Clicked

Click:

```text
New project
```

This opens the Azure DevOps project creation page.

---

# Step 3 — Enter the Project Name

## What We Entered

In the **Project name** field, enter:

```text
FlavorForge – Azure DevSecOps Capstone
```

## Confirmed Value

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| Project name | `FlavorForge – Azure DevSecOps Capstone` |
| Organization | `malathiabhilash`                        |

The project name is confirmed from the current Azure DevOps project configuration.

---

# Step 4 — Enter the Project Description

## What We Entered

The FlavorForge project description is:

```text
Enterprise-grade Azure DevSecOps project demonstrating a complete CI/CD pipeline using GitHub, Azure DevOps, Docker, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes, NGINX Ingress, SonarCloud, Trivy, ConfigMaps, Secrets, and Horizontal Pod Autoscaler (HPA). The pipeline automatically builds, tests, scans, containerizes, pushes images to ACR, and deploys to AKS across Development, QA, and Production environments.
```

This description explains the purpose and overall DevSecOps scope of the FlavorForge project.

---

# Step 5 — Select the Process

## What We Selected

The confirmed project process is:

```text
Basic
```

## Project Configuration

| Field   | Value   |
| ------- | ------- |
| Process | `Basic` |

The current Azure DevOps project settings confirm that the FlavorForge project uses the **Basic** process.

---

# Step 6 — Set Project Visibility

## What We Selected

The confirmed project visibility is:

```text
Private
```

The Azure DevOps project is displayed as:

```text
FlavorForge – Azure DevSecOps Capstone

Private
```

## Project Configuration

| Field      | Value     |
| ---------- | --------- |
| Visibility | `Private` |

The project is therefore not publicly accessible.

---

# Step 7 — Create the Project

After entering the project information, use the project creation button provided by Azure DevOps.

Azure DevOps creates the project using the configured project details.

> **Evidence note:** The current project settings confirm the resulting project configuration. They do not prove the exact button text or every value selected on the original project-creation screen.

---

# Step 8 — Verify the Project Administrator

## Where We Went

Open:

```text
Project Settings
    ↓
Overview
```

## What We Found

The project administrator shown in the project settings is:

```text
Malathi Shetty
```

The associated account shown in the project settings is:

```text
malathiabhilash@outlook.com
```

The project settings also provide:

```text
Add administrator
```

No additional administrator is documented because no additional administrator was provided in the recovered evidence.

---

# Step 9 — Verify Azure DevOps Services

The current project configuration shows the following Azure DevOps services:

| Service    | Status |
| ---------- | ------ |
| Boards     | On     |
| Repos      | On     |
| Pipelines  | On     |
| Test Plans | On     |
| Artifacts  | On     |

These services provide the Azure DevOps capabilities used by the FlavorForge project.

---

## Boards

The project shows:

```text
Boards
Flexible agile planning with boards and cross-product issues
On
```

Boards provide project planning and work-tracking capabilities.

---

## Repos

The project shows:

```text
Repos
Repos, pull requests, advanced file management and more
On
```

Repos provide Git repository functionality for the project.

The FlavorForge repository is:

```text
FlavorForge – Azure DevSecOps Capstone
```

---

## Pipelines

The project shows:

```text
Pipelines
Build, manage, and scale your deployments to the cloud
On
```

Pipelines provide the CI/CD functionality used by the FlavorForge implementation.

---

## Test Plans

The project shows:

```text
Test Plans
Structured manual testing at any scale for teams of all sizes
On
```

Test Plans provide structured testing capabilities.

---

## Artifacts

The project shows:

```text
Artifacts
Continuous delivery with artifact feeds containing NuGet, npm, Maven, Universal, and Python packages
On
```

Artifacts provide package-feed capabilities within Azure DevOps.

---

# What We Entered

The confirmed project configuration is:

| Field                 | Value                                    |
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

# What Happened

The FlavorForge Azure DevOps project is available under the `malathiabhilash` organization.

The organization contains:

```text
malathiabhilash
│
├── ACR-Pipeline-Demo
│
└── FlavorForge – Azure DevSecOps Capstone
```

The FlavorForge project is configured as:

```text
Process:
Basic

Visibility:
Private

Administrator:
Malathi Shetty
```

The following Azure DevOps services are enabled:

```text
Boards       → On
Repos        → On
Pipelines    → On
Test Plans   → On
Artifacts    → On
```

---

# Verify

## Verify the Project

Open the Azure DevOps organization:

```text
malathiabhilash
```

Confirm that the following project is present:

```text
FlavorForge – Azure DevSecOps Capstone
```

Open the project.

Confirm that the project is shown as:

```text
Private
```

---

## Verify the Process

Open:

```text
Project Settings
    ↓
Overview
```

Verify:

```text
Process:
Basic
```

---

## Verify the Administrator

In the project settings, verify:

```text
Project administrator:
Malathi Shetty
```

---

## Verify the Services

In the project settings, verify:

```text
Boards       → On
Repos        → On
Pipelines    → On
Test Plans   → On
Artifacts    → On
```

---

## Verify the Repository

Open:

```text
Repos
    ↓
Files
```

Verify that the FlavorForge repository is available:

```text
FlavorForge – Azure DevSecOps Capstone
```

The repository contains the project source code and documentation.

---

# Project Description Verification

The current project configuration contains the following description:

```text
Enterprise-grade Azure DevSecOps project demonstrating a complete CI/CD pipeline using GitHub, Azure DevOps, Docker, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Kubernetes, NGINX Ingress, SonarCloud, Trivy, ConfigMaps, Secrets, and Horizontal Pod Autoscaler (HPA). The pipeline automatically builds, tests, scans, containerizes, pushes images to ACR, and deploys to AKS across Development, QA, and Production environments.
```

This describes the intended scope of the FlavorForge Azure DevSecOps capstone.

---

# Screenshot Evidence

Use the actual screenshots captured during the Azure DevOps setup.

Recommended evidence includes:

```text
Azure DevOps organization/project page
```

and:

```text
Project Settings → Overview
```

The Project Settings screenshot should show, where available:

* Project name
* Project description
* Process
* Project administrator
* Azure DevOps services

## Important

Do not invent a screenshot filename.

Once the actual screenshot filename is confirmed, use its real repository path:

```text
![FlavorForge Azure DevOps Project](<actual-screenshot-path>)
```

---

# Result

The Azure DevOps project for the FlavorForge capstone is configured under:

```text
Organization:
malathiabhilash
```

with:

```text
Project:
FlavorForge – Azure DevSecOps Capstone
```

The confirmed project configuration is:

```text
Process:
Basic

Visibility:
Private

Administrator:
Malathi Shetty
```

The enabled Azure DevOps services are:

```text
Boards
Repos
Pipelines
Test Plans
Artifacts
```

