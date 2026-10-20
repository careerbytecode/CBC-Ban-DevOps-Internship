# Step 1 — Azure DevOps Organization

## What We Wanted

Before creating the FlavorForge Azure DevOps project, we needed an Azure DevOps organization.

An Azure DevOps organization is the top-level container that holds Azure DevOps projects and their related resources.

The overall structure is:

```text
Azure DevOps
    ↓
Organization
    ↓
Project
    ↓
Repositories
    ↓
Pipelines
````

For the FlavorForge project, the Azure DevOps organization used was:

```text
malathiabhilash
```

---

# Step 1.1 — Open Azure DevOps

## Where We Went

Open a web browser and navigate to:

```text
https://dev.azure.com/
```

## What We Clicked

1. Open the browser.
2. Navigate to Azure DevOps.
3. Sign in with the Microsoft account used for the FlavorForge project.
4. After signing in, open the Azure DevOps Organizations page.

## What Happened

Azure DevOps displayed the organizations available to the signed-in account.

The organization used for FlavorForge was displayed as:

```text
dev.azure.com/malathiabhilash
```

The account was shown as the owner of the organization.

---

# Step 1.2 — Identify the Azure DevOps Organization

## What We Wanted

We needed to confirm which Azure DevOps organization contained the FlavorForge project.

## What We Saw

The Azure DevOps Organizations page showed:

```text
Azure DevOps Organizations

Create new organization

dev.azure.com/malathiabhilash (Owner)

Projects

ACR-Pipeline-Demo

FlavorForge – Azure DevSecOps Capstone

New project
```

## Confirmed Organization Details

| Field                     | Value                                    |
| ------------------------- | ---------------------------------------- |
| Azure DevOps Organization | `malathiabhilash`                        |
| Organization URL          | `https://dev.azure.com/malathiabhilash/` |
| Owner                     | `malathiabhilash`                        |
| FlavorForge Project       | `FlavorForge – Azure DevSecOps Capstone` |

---

# Step 1.3 — Understand the Organization and Project Relationship

The Azure DevOps organization is the parent container.

Inside the organization, multiple projects can exist.

For this environment, the organization contained at least the following projects:

```text
malathiabhilash
│
├── ACR-Pipeline-Demo
│
└── FlavorForge – Azure DevSecOps Capstone
```

The FlavorForge project is therefore located at:

```text
Azure DevOps
    ↓
malathiabhilash
    ↓
FlavorForge – Azure DevSecOps Capstone
```

The other project:

```text
ACR-Pipeline-Demo
```

is a separate Azure DevOps project and is not part of the FlavorForge project documentation.

---

# Step 1.4 — Open the FlavorForge Project

## Where We Went

From the Azure DevOps Organizations page, locate the **Projects** section.

## What We Clicked

Click:

```text
FlavorForge – Azure DevSecOps Capstone
```

## What Happened

Azure DevOps opened the FlavorForge project.

The project is hosted inside the:

```text
malathiabhilash
```

organization.

This project is where the FlavorForge repository, pipelines, service connections, variable groups, and other Azure DevOps configuration are managed.

---

# Verify

After opening the project, verify the Azure DevOps URL follows the organization/project structure:

```text
https://dev.azure.com/malathiabhilash/
```

The project name should be:

```text
FlavorForge – Azure DevSecOps Capstone
```

The confirmed hierarchy is:

```text
Azure DevOps
    ↓
Organization: malathiabhilash
    ↓
Project: FlavorForge – Azure DevSecOps Capstone
```

---

# Screenshot

Use the actual screenshot showing the Azure DevOps Organizations page.

The screenshot should show:

```text
dev.azure.com/malathiabhilash (Owner)
```

and the project:

```text
FlavorForge – Azure DevSecOps Capstone
```

### Screenshot

```text
[Insert the actual Azure DevOps Organizations screenshot here]
```

> Do not invent a screenshot filename. When the repository screenshot path is confirmed, replace the placeholder with the actual image path.

---

# Result

The Azure DevOps organization used for the FlavorForge project was confirmed as:

```text
malathiabhilash
```

The organization contains the FlavorForge Azure DevOps project:

```text
FlavorForge – Azure DevSecOps Capstone
```

The final relationship is:

```text
Azure DevOps
      ↓
malathiabhilash
      ↓
FlavorForge – Azure DevSecOps Capstone
```

The Azure DevOps organization is now confirmed.

