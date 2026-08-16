# Step 6 — Configure Azure DevOps Service Connections

## What We Wanted

The FlavorForge Azure DevSecOps pipeline needs to communicate securely with external services and Azure resources.

Instead of placing usernames, passwords, tokens, or other credentials directly inside the pipeline YAML, Azure DevOps Service Connections were configured.

For FlavorForge, the following service connections were configured:

| Service Connection           | Type                                       | Authentication                                   |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------ |
| `shettymalathib`             | GitHub                                     | Azure Pipelines App                              |
| `flavorforge-azure-sc`       | Azure Resource Manager                     | Workload Identity Federation with OpenID Connect |
| `flavorforge-acr-connection` | Docker Registry / Azure Container Registry | Workload Identity Federation with OpenID Connect |
| `flavorforge-sonarcloud-sc`  | SonarQube Cloud                            | Token-based authentication                       |

These service connections provide the authentication layer required for the Azure DevOps pipeline to communicate with GitHub, Azure resources, Azure Container Registry, and SonarCloud.

---

# Step 6.1 — Open Service Connections

## Where We Went

Open the FlavorForge project in Azure DevOps.

The project is:

```text
FlavorForge – Azure DevSecOps Capstone
```

The Azure DevOps organization is:

```text
malathiabhilash
```

## What We Clicked

From the Azure DevOps project:

```text
Project
   ↓
Project Settings
   ↓
Service connections
```

The Service connections page displays the existing connections and provides:

```text
New service connection
```

## What We Wanted

This area was used to create and manage the external connections required by the FlavorForge CI/CD pipeline.

![Create Service Connection](/screenshots/pipeline/2-service-connection.png)

---

# Step 6.2 — GitHub Service Connection

## What We Wanted

The FlavorForge source code is maintained in GitHub.

Azure DevOps therefore requires a secure GitHub connection for pipeline integration with the GitHub repository.

The confirmed GitHub service connection is:

```text
shettymalathib
```

The connection type is:

```text
GitHub
```

The authentication method is:

```text
Azure Pipelines App
```

The connected GitHub account shown in the service connection was:

```text
shettymalathib
```

The GitHub repository used by FlavorForge is:

```text
shettymalathib/flavorforge-azure-devsecops-capstone
```

## Where We Went

From the FlavorForge Azure DevOps project:

```text
Project Settings
   ↓
Service connections
   ↓
New service connection
```

## What We Clicked

Click:

```text
New service connection
```

From the list of connection types, select:

```text
GitHub
```

## What We Selected

The GitHub connection uses:

```text
Azure Pipelines App
```

This allows Azure DevOps to authenticate with GitHub through the Azure Pipelines App.

## What We Did

The GitHub authorization flow was opened.

The GitHub account/repository connection was authorized for the FlavorForge project.

The resulting connection was associated with:

```text
shettymalathib
```

and:

```text
shettymalathib/flavorforge-azure-devsecops-capstone
```

## Service Connection Details

| Field                    | Value                                                 |
| ------------------------ | ----------------------------------------------------- |
| Service connection name  | `shettymalathib`                                      |
| Type                     | GitHub                                                |
| Authentication           | Azure Pipelines App                                   |
| Connected GitHub account | `shettymalathib`                                      |
| GitHub repository        | `shettymalathib/flavorforge-azure-devsecops-capstone` |
| Created by               | Malathi Shetty                                        |

## What Happened

After the GitHub connection was configured, Azure DevOps displayed the GitHub service connection.

The connection could then be used when configuring Azure DevOps pipeline integration with GitHub.

> **Important distinction:** This GitHub service connection is separate from the GitHub Actions synchronization documented in Step 3. Step 3 documents GitHub → Azure DevOps repository synchronization. This step documents the GitHub connection available to Azure DevOps for pipeline integration.

## Verify

Open:

```text
Project Settings
   ↓
Service connections
   ↓
shettymalathib
```

Verify:

```text
Type:
GitHub

Authentication:
Azure Pipelines App
```

---

# Step 6.3 — Azure Resource Manager Service Connection

## What We Wanted

The Azure DevOps pipeline needs access to Azure resources used by FlavorForge.

These include:

```text
Azure Resource Group
Azure Container Registry
Azure Kubernetes Service
```

Therefore, an Azure Resource Manager service connection was created.

The confirmed service connection name is:

```text
flavorforge-azure-sc
```

## Where We Went

From:

```text
FlavorForge – Azure DevSecOps Capstone
```

go to:

```text
Project Settings
   ↓
Service connections
   ↓
New service connection
```

## What We Clicked

Click:

```text
New service connection
```

Select:

```text
Azure Resource Manager
```

## Authentication Method

The Azure Resource Manager connection uses:

```text
Workload Identity Federation
```

with:

```text
OpenID Connect
```

The confirmed configuration is:

```text
Service connection type:
Azure Resource Manager

Authentication:
Workload Identity Federation with OpenID Connect
```

![Azure Resource Manager Service Connection](/screenshots/pipeline/3-azure-resource-manager.png)

## Scope Level

The configured scope level is:

```text
Subscription
```

The selected Azure subscription is:

```text
Azure subscription 1
```

The FlavorForge Resource Group is:

```text
flavorforge-rg
```

> **Important:** The service connection scope is documented as `Subscription`. `flavorforge-rg` is the Resource Group used by the FlavorForge Azure resources.

## Confirmed Values

| Field                              | Value                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Connection type                    | Azure Resource Manager                                                              |
| Authentication                     | Workload Identity Federation with OpenID Connect                                    |
| Scope level                        | Subscription                                                                        |
| Subscription                       | `Azure subscription 1`                                                              |
| Resource Group used by FlavorForge | `flavorforge-rg`                                                                    |
| Service Connection Name            | `flavorforge-azure-sc`                                                              |
| Description                        | `Azure Resource Manager Service Connection for FlavorForge AKS and ACR deployments` |

![New Azure Resource Manager Service Connection](/screenshots/pipeline/4-new-azure-service-connection.png)

## Security

The service-connection form provides the option:

```text
Grant access permission to all pipelines
```

The actual selection is only documented where it is visible in the captured evidence.

## What Happened

Azure DevOps created the Azure Resource Manager service connection using Workload Identity Federation with OpenID Connect.

After creation, the connection details page displayed workload identity federation information, including:

```text
Issuer
```

and:

```text
Subject identifier
```

These values are part of the workload identity configuration.

The important security benefit is that the connection uses workload identity federation instead of requiring a client secret to be stored in the pipeline.

![Configure Azure Resource Manager Service Connection](/screenshots/pipeline/4-1-new-azure-service-connection.png)

## Verify

Open:

```text
Project Settings
   ↓
Service connections
   ↓
flavorforge-azure-sc
```

Verify:

```text
Service connection type:
Azure Resource Manager

Authentication:
Workload Identity Federation with OpenID Connect

Scope:
Subscription

Subscription:
Azure subscription 1
```

---

# Step 6.4 — Azure Container Registry Service Connection

## What We Wanted

FlavorForge Docker images are stored in Azure Container Registry.

The registry login server is:

```text
flavorforgeacr2026ms.azurecr.io
```

Azure DevOps therefore needs a secure connection that allows the pipeline to authenticate with the container registry.

The service connection created for this purpose is:

```text
flavorforge-acr-connection
```

## Where We Went

Go to:

```text
Project Settings
   ↓
Service connections
   ↓
New service connection
```

## What We Clicked

Click:

```text
New service connection
```

Select:

```text
Docker Registry
```

## Registry Type

Select:

```text
Azure Container Registry
```

The configuration flow is:

```text
New service connection
   ↓
Docker Registry
   ↓
Azure Container Registry
   ↓
Authentication
   ↓
Azure subscription
   ↓
Azure Container Registry
```

## Authentication

The configured ACR service connection uses:

```text
Workload Identity Federation with OpenID Connect
```

The confirmed service-connection configuration is:

```text
Service connection type:
Docker Registry

Authentication:
Workload Identity Federation with OpenID Connect
```

## Confirmed Values

| Field                   | Value                                            |
| ----------------------- | ------------------------------------------------ |
| Connection type         | Docker Registry                                  |
| Registry type           | Azure Container Registry                         |
| Registry                | `flavorforgeacr2026ms.azurecr.io`                |
| Authentication          | Workload Identity Federation with OpenID Connect |
| Service Connection Name | `flavorforge-acr-connection`                     |

The registry and connection name are confirmed from the existing project evidence.

## Description

The exact description used during the original ACR service-connection creation is not sufficiently preserved in the recovered evidence.

Therefore, no description value is invented here.

## Security

The service-connection form provides the option:

```text
Grant access permission to all pipelines
```

The actual selection is only documented where it is visible in the captured evidence.

## What Happened

Azure DevOps created the Docker Registry service connection for the FlavorForge Azure Container Registry.

The resulting connection uses Workload Identity Federation with OpenID Connect.

The connection can be used by the Azure DevOps pipeline when publishing Docker images to:

```text
flavorforgeacr2026ms.azurecr.io
```

![ACR and AKS Service Connections](/screenshots/pipeline/12-acr-aks.png)

## Verify

Open:

```text
Project Settings
   ↓
Service connections
   ↓
flavorforge-acr-connection
```

Verify:

```text
Service connection type:
Docker Registry

Authentication:
Workload Identity Federation with OpenID Connect

Registry:
flavorforgeacr2026ms.azurecr.io
```

---

# Step 6.5 — SonarQube Cloud Service Connection

## What We Wanted

FlavorForge uses SonarCloud for code-quality analysis.

The Azure DevOps pipeline therefore requires a secure connection between Azure DevOps and SonarCloud.

The service connection created for this purpose is:

```text
flavorforge-sonarcloud-sc
```

## Important — SonarCloud Extension

Before creating the SonarQube Cloud service connection, the required SonarCloud extension was installed from the Azure DevOps Marketplace.

The sequence was:

```text
Azure DevOps
   ↓
Marketplace
   ↓
Search for SonarCloud
   ↓
Install extension
   ↓
Select organization
   ↓
Install
   ↓
Return to Azure DevOps
```

This made the SonarQube Cloud service-connection option available in Azure DevOps.

---

# Step 6.6 — Generate SonarCloud Token

## Where We Went

In SonarCloud:

```text
SonarCloud
   ↓
My Account
   ↓
Security
```

## What We Clicked

Select:

```text
Generate Tokens
```

## What We Did

A SonarCloud token was generated for use by the Azure DevOps service connection.

The token value is a secret.

### IMPORTANT

The actual SonarCloud token must never be written into this documentation.

Do not put the token value in:

```text
README.md
azure-pipelines.yml
Markdown files
GitHub
screenshots
```

Only document where the token was generated and which service connection uses it.

---

# Step 6.7 — Create SonarQube Cloud Service Connection

## Where We Went

Return to Azure DevOps:

```text
FlavorForge – Azure DevSecOps Capstone
   ↓
Project Settings
   ↓
Service connections
   ↓
New service connection
```

## What We Clicked

Select:

```text
SonarQube Cloud
```

## Authentication

The service connection uses:

```text
Token
```

The token was generated from:

```text
SonarCloud
   ↓
My Account
   ↓
Security
   ↓
Generate Tokens
```

The existing service-connection evidence confirms token-based authentication.

## Confirmed Values

| Field                   | Value                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| Service connection type | SonarQube Cloud                                                                               |
| Authentication          | Token                                                                                         |
| Token source            | SonarCloud Security                                                                           |
| Service Connection Name | `flavorforge-sonarcloud-sc`                                                                   |
| Description             | `SonarCloud code quality and security scanning connection for FlavorForge DevSecOps pipeline` |

The actual token value is intentionally excluded from this document.

## Security

The service-connection form provides:

```text
Grant access permission to all pipelines
```

The actual selection is only documented where it is visible in the captured evidence.

## What Happened

Azure DevOps created:

```text
flavorforge-sonarcloud-sc
```

The service connection allows the FlavorForge Azure DevOps pipeline to authenticate with SonarCloud for code-quality analysis.

## Verify

Open:

```text
Project Settings
   ↓
Service connections
   ↓
flavorforge-sonarcloud-sc
```

Verify:

```text
Service connection type:
SonarQube Cloud

Authentication:
Token
```

---

# Step 6.8 — Review All Service Connections

After creating the connections, return to:

```text
Project Settings
   ↓
Service connections
```

## Final Service Connection List

| Name                         | Type                                       | Authentication                                   | Purpose                   |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------ | ------------------------- |
| `shettymalathib`             | GitHub                                     | Azure Pipelines App                              | GitHub integration        |
| `flavorforge-azure-sc`       | Azure Resource Manager                     | Workload Identity Federation with OpenID Connect | Azure resource access     |
| `flavorforge-acr-connection` | Docker Registry / Azure Container Registry | Workload Identity Federation with OpenID Connect | Push Docker images to ACR |
| `flavorforge-sonarcloud-sc`  | SonarQube Cloud                            | Token                                            | SonarCloud analysis       |

![Configured Service Connections](/screenshots/pipeline/11-service-connections.png)

The recovered project evidence confirms these four service connections and their documented types and authentication methods.

---

# Step 6.9 — Understand How the Connections Are Used

The service connections are separate from pipeline variables.

The overall relationship is:

```text
GitHub
   │
   │ GitHub service connection
   ▼
Azure DevOps Pipeline
   │
   ├── Azure Resource Manager service connection
   │       │
   │       ├── Azure resources
   │       └── AKS
   │
   ├── ACR service connection
   │       │
   │       └── Azure Container Registry
   │
   └── SonarCloud service connection
           │
           └── SonarCloud analysis
```

These connections provide authenticated access to the required services without placing their secret credentials directly into the pipeline YAML.

---

# Step 6.10 — Verify Before Creating the Pipeline

Before moving to pipeline creation, verify that the required service connections exist.

Check:

```text
Project Settings
   ↓
Service connections
```

Confirm:

```text
✓ shettymalathib
✓ flavorforge-azure-sc
✓ flavorforge-acr-connection
✓ flavorforge-sonarcloud-sc
```

For individual service connections, Azure DevOps provides areas such as:

```text
Overview
Usage history
Approvals and checks
Details
```

These can be used for further verification and governance.

---

# Important Security Notes

## Never Document Secret Values

The following must not be written into this Markdown file:

```text
SonarCloud token value
PAT value
Client secret
Password
Private key
```

Only document:

```text
Secret/token exists
Where it was generated
Where it was configured
What service connection uses it
```

For example:

```text
Authentication:
SonarQube Cloud Token

Token source:
SonarCloud → My Account → Security → Generate Tokens
```

Do not document the actual token.

---

# Result

The FlavorForge Azure DevOps project was configured with the external service connections required by the DevSecOps workflow.

The final connections are:

```text
GitHub
   ↓
shettymalathib
   ↓
Azure Pipelines App
```

```text
Azure
   ↓
flavorforge-azure-sc
   ↓
Azure Resource Manager
   ↓
Workload Identity Federation / OpenID Connect
```

```text
Azure Container Registry
   ↓
flavorforge-acr-connection
   ↓
Docker Registry
   ↓
Workload Identity Federation / OpenID Connect
```

```text
SonarCloud
   ↓
flavorforge-sonarcloud-sc
   ↓
SonarQube Cloud
   ↓
Token authentication
```

These service connections provide the authentication layer required by the later Azure DevOps pipeline stages.