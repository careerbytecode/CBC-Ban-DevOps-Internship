# Step 7 — Configure Library Variable Groups

## What We Wanted

The FlavorForge Azure DevSecOps pipeline uses Azure DevOps Library variable groups to store environment-specific configuration separately from the pipeline YAML.

For this project, variable groups were created for:

```text
FlavorForge-QA-Variables
FlavorForge-Prod-Variables
````

Development does not use a separate Library variable group.

The Development deployment uses the Azure DevOps environment:

```text
FlavorForge-Dev
```

directly from the pipeline YAML.

---

# Step 7.1 — Understand the Variable Group Design

The FlavorForge pipeline separates environment-specific configuration from the main pipeline definition.

The relationship is:

```text
Azure DevOps Pipeline
        │
        ├── Development
        │       │
        │       └── Environment: FlavorForge-Dev
        │
        ├── QA
        │       │
        │       ├── Variable Group:
        │       │   FlavorForge-QA-Variables
        │       │
        │       └── Environment:
        │           FlavorForge-QA
        │
        └── Production
                │
                ├── Variable Group:
                │   FlavorForge-Prod-Variables
                │
                └── Environment:
                    FlavorForge-Prod
```

This allows QA and Production configuration to be managed independently from the pipeline YAML.

---

# Step 7.2 — Development Environment

## Important

A separate `FlavorForge-Dev` Library variable group was **not created**.

The Development deployment is configured directly in the pipeline YAML using:

```yaml
environment: "FlavorForge-Dev"
```

The Development stage is:

```text
DeployDev
```

and the deployment environment is:

```text
FlavorForge-Dev
```

The Development deployment is currently a simulated deployment used to demonstrate the Dev release stage.

Therefore, this documentation does not describe `FlavorForge-Dev` as a Library variable group.

---

# Step 7.3 — Create the QA Variable Group

## What We Wanted

The QA stage requires environment-specific variables.

The variable group created for QA is:

```text
FlavorForge-QA-Variables
```

---

## Where We Went

From the Azure DevOps project:

```text
Pipelines
    ↓
Library
```

---

## What We Clicked

Select:

```text
+ Variable group
```

---

## What We Entered

The variable group name is:

```text
FlavorForge-QA-Variables
```

The variables configured for the QA deployment are:

| Variable    | Purpose                                |
| ----------- | -------------------------------------- |
| `APP_ENV`   | Identifies the application environment |
| `API_URL`   | QA API endpoint                        |
| `LOG_LEVEL` | Application logging level              |

The values are consumed by the QA deployment stage.

---

# Step 7.4 — How the QA Variable Group Is Used

The Azure DevOps pipeline references the QA variable group using:

```yaml
variables:
  - group: FlavorForge-QA-Variables
```

The QA deployment also uses the Azure DevOps environment:

```yaml
environment: FlavorForge-QA
```

Therefore, the QA flow is:

```text
DeployQA
    │
    ├── Variable Group
    │      FlavorForge-QA-Variables
    │
    └── Environment
           FlavorForge-QA
```

The QA deployment then uses variables such as:

```text
APP_ENV
API_URL
LOG_LEVEL
```

inside the deployment steps.

---

# Step 7.5 — Create the Production Variable Group

## What We Wanted

Production requires its own environment-specific configuration.

The variable group created for Production is:

```text
FlavorForge-Prod-Variables
```

---

## Where We Went

From:

```text
Pipelines
    ↓
Library
```

---

## What We Clicked

Select:

```text
+ Variable group
```

---

## What We Entered

The variable group name is:

```text
FlavorForge-Prod-Variables
```

The Production deployment uses environment-specific variables including:

| Variable    | Purpose                                |
| ----------- | -------------------------------------- |
| `APP_ENV`   | Identifies the application environment |
| `API_URL`   | Production API endpoint                |
| `LOG_LEVEL` | Application logging level              |

---

# Step 7.6 — How the Production Variable Group Is Used

The Azure DevOps pipeline references the Production variable group using:

```yaml
variables:
  - group: FlavorForge-Prod-Variables
```

The Production deployment uses the Azure DevOps environment:

```yaml
environment: FlavorForge-Prod
```

Therefore, the Production flow is:

```text
DeployProd
    │
    ├── Variable Group
    │      FlavorForge-Prod-Variables
    │
    └── Environment
           FlavorForge-Prod
```

The Production deployment then reads:

```text
APP_ENV
API_URL
LOG_LEVEL
```

from the Production variable group.

---

# Step 7.7 — Configure QA Approval

## What We Wanted

QA deployments should not proceed without an approval check.

The QA deployment uses the Azure DevOps environment:

```text
FlavorForge-QA
```

A pre-check approval was configured for the QA deployment.

---

## Where We Went

From the Azure DevOps project:

```text
Pipelines
    ↓
Environments
    ↓
FlavorForge-QA
    ↓
Approvals and checks
```

The approval configuration is associated with the QA deployment resource.

---

## What We Clicked

Select:

```text
Approvals and checks
```

Then:

```text
Add check
```

Select:

```text
Pre-check approvals
```

---

## QA Approval Configuration

The configured approval settings were:

```text
Check type:
Pre-check approvals
```

```text
Approver:
Malathi Shetty
```

```text
Approval requirement:
All approvers must approve
```

```text
Approval timeout:
303 days
```

The approval configuration requires the configured approver to approve the QA deployment before it can continue.

---

## Important Note About Self-Approval

The original configuration included an option:

```text
Allow approvers to approve their own runs
```

The exact state of this option could not be reliably recalled from the original configuration.

Therefore, this documentation does **not** claim whether it was enabled or disabled.

The setting should be verified directly in Azure DevOps if exact reproduction is required.

---

# Step 7.8 — Configure Production Approval

## What We Wanted

Production deployments require an approval before deployment continues.

The Production deployment uses:

```text
FlavorForge-Prod
```

as its Azure DevOps environment.

---

## Where We Went

From:

```text
Pipelines
    ↓
Environments
    ↓
FlavorForge-Prod
    ↓
Approvals and checks
```

---

## What We Clicked

Select:

```text
Approvals and checks
```

Then:

```text
Add check
```

Select:

```text
Pre-check approvals
```

---

## Production Approval Configuration

The configured approval settings were:

```text
Check type:
Pre-check approvals
```

```text
Approver:
Malathi Shetty
```

```text
Approval requirement:
All approvers must approve
```

```text
Approval timeout:
303 days
```

The approval configuration requires the configured approver to approve the Production deployment before it can continue.

---

## Important Note About Self-Approval

The original state of:

```text
Allow approvers to approve their own runs
```

could not be reliably recalled.

Therefore, the documentation intentionally does not state whether this option was enabled or disabled.

It should be verified from:

```text
FlavorForge-Prod
    ↓
Approvals and checks
    ↓
Pre-check approvals
```

before attempting to reproduce the exact configuration.

---

# Step 7.9 — Understand the Approval Flow

The overall release flow is:

```text
Build
   ↓
Test
   ↓
Security
   ↓
SonarCloud
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Push Images to ACR
   ↓
Deploy to Development
   ↓
FlavorForge-Dev
   ↓
Deploy to QA
   ↓
FlavorForge-QA
   ↓
QA Approval
   ↓
Deploy to Production
   ↓
FlavorForge-Prod
   ↓
Production Approval
   ↓
Release Summary
```

The variable groups provide environment-specific configuration, while the environments provide deployment targets and approval controls.

---

# Step 7.10 — Variable Groups Used by the Pipeline

The final Library configuration is:

| Variable Group               | Used By      | Environment        |
| ---------------------------- | ------------ | ------------------ |
| `FlavorForge-QA-Variables`   | `DeployQA`   | `FlavorForge-QA`   |
| `FlavorForge-Prod-Variables` | `DeployProd` | `FlavorForge-Prod` |

There is no:

```text
FlavorForge-Dev
```

variable group.

Instead, `FlavorForge-Dev` is an Azure DevOps environment referenced directly from the pipeline YAML.

---

# Step 7.11 — Verify Variable Groups

Open:

```text
Pipelines
    ↓
Library
```

Verify that the required variable groups exist:

```text
✓ FlavorForge-QA-Variables
✓ FlavorForge-Prod-Variables
```

Verify the variables required by the pipeline:

```text
APP_ENV
API_URL
LOG_LEVEL
```

---

# Step 7.12 — Verify QA and Production Approvals

Open:

```text
Pipelines
    ↓
Environments
```

Verify:

```text
FlavorForge-QA
FlavorForge-Prod
```

For QA:

```text
FlavorForge-QA
    ↓
Approvals and checks
    ↓
Pre-check approvals
```

Verify:

```text
Approver:
Malathi Shetty

All approvers must approve:
Configured

Approval timeout:
303 days
```

For Production:

```text
FlavorForge-Prod
    ↓
Approvals and checks
    ↓
Pre-check approvals
```

Verify:

```text
Approver:
Malathi Shetty

All approvers must approve:
Configured

Approval timeout:
303 days
```

The exact state of:

```text
Allow approvers to approve their own runs
```

should be verified from the Azure DevOps interface rather than reconstructed from memory.

---

# Screenshots

![QA Variable Group](/screenshots/build-journey/pipeline/qa/qa-variable-group.png)




![Production Variable Group](/screenshots/build-journey/pipeline/prod/prod-variable-group.png)

---

# Important Security Notes

Variable groups may contain configuration values that should not be exposed publicly.

Do not document or commit sensitive values such as:

```text
Passwords
Tokens
Client secrets
Private keys
Connection strings
Other credentials
```

Only document variable names and their purpose when the actual values are sensitive.

For example:

```text
APP_ENV
API_URL
LOG_LEVEL
```

can be documented without exposing sensitive values.

---

# Result

The FlavorForge Azure DevOps project uses Library variable groups for QA and Production configuration.

The final design is:

```text
Development
    ↓
FlavorForge-Dev
    ↓
Azure DevOps Environment
    ↓
No separate Library variable group


QA
    ↓
FlavorForge-QA-Variables
    ↓
FlavorForge-QA
    ↓
Pre-check Approval
    ↓
QA Deployment


Production
    ↓
FlavorForge-Prod-Variables
    ↓
FlavorForge-Prod
    ↓
Pre-check Approval
    ↓
Production Deployment
```

This configuration keeps environment-specific variables separate from the main pipeline YAML and adds approval controls before QA and Production deployments.
