# 08 — Library Approvals and Checks

## Overview

Azure DevOps approvals and checks were configured to control deployments to the **QA** and **Production** environments.

The approval configuration was used to introduce a manual approval gate before the corresponding deployment could continue.

The project uses the following deployment environments:

* `FlavorForge-QA`
* `FlavorForge-Prod`

The YAML pipeline connects the deployment stages to these environments:

```yaml
environment: FlavorForge-QA
```

and:

```yaml
environment: FlavorForge-Prod
```

This allows Azure DevOps environment-level approvals and checks to control the deployment flow.

---

## QA Approval Configuration

The QA deployment uses the `FlavorForge-QA` environment.

A **Pre-check approval** was configured for the QA deployment.

The configured approval included:

* **Check type:** Pre-check approvals
* **Approver:** Project owner's approval identity
* **Approval requirement:** All approvers must approve
* **Approval timeout:** 303 days

The approval is evaluated before the QA deployment is allowed to proceed.

![QA Approval Configuration](/screenshots/build-journey/pipeline/qa/qa-create-1-library-pipelines-approvals.png)

![QA Approval Setup](/screenshots/build-journey/pipeline/qa/qa-create-2-library-pipelines-approvals.png)

The configured QA approval/check can be viewed from the Azure DevOps Library approval and checks configuration.

![QA Approval and Checks](/screenshots/build-journey/pipeline/qa/qa-library-pipelines-approvals.png)

---

## Production Approval Configuration

The Production deployment uses the `FlavorForge-Prod` environment.

A **Pre-check approval** was also configured for Production.

The configured approval included:

* **Check type:** Pre-check approvals
* **Approver:** Project owner's approval identity
* **Approval requirement:** All approvers must approve
* **Approval timeout:** 303 days

This provides a manual approval gate before the Production deployment can proceed.

![Production Approval and Checks](/screenshots/build-journey/pipeline/prod/prod-library-pipelines-approvals.png)

---

## Production Pipeline Permissions

The Production approval configuration was also associated with the pipeline permissions for the protected resource.

![Production Pipeline Permissions](/screenshots/build-journey/pipeline/prod/prod-pipeline-permissions.png)

This ensures that the configured pipeline is authorized to use the protected Production resource.

---

## Approval Flow

The resulting deployment flow is:

```text
Build
  |
  v
Test
  |
  v
Security
  |
  v
Code Quality
  |
  v
Docker Build
  |
  v
Trivy Scan
  |
  v
Push Images to ACR
  |
  v
Deploy to AKS
  |
  v
Development
  |
  v
QA
  |
  |  Pre-check approval
  v
Production
  |
  |  Pre-check approval
  v
Production Deployment
```

The QA and Production deployment stages are defined in the pipeline as deployment jobs associated with their respective environments.

### QA

```yaml
- stage: DeployQA
  displayName: "Deploy to QA"

  dependsOn:
    - DeployDev

  variables:
    - group: FlavorForge-QA-Variables

  jobs:
    - deployment: DeployQA
      displayName: "QA Deployment"

      environment: FlavorForge-QA
```

### Production

```yaml
- stage: DeployProd
  displayName: "Deploy to Production"

  dependsOn:
    - DeployQA

  variables:
    - group: FlavorForge-Prod-Variables

  jobs:
    - deployment: DeployProduction
      displayName: "Production Deployment"

      environment: FlavorForge-Prod
```

Because the deployment jobs reference `FlavorForge-QA` and `FlavorForge-Prod`, the corresponding environment/resource approval configuration can control the deployment.

---

## Approval Timeout

The configured approval timeout was:

```text
303 days
```

This provides a long approval window for the deployment before the approval request expires.

The same approval timeout was configured for the QA and Production approval checks.

---

## Important Configuration Note

The project did **not** create a separate `FlavorForge-Dev` variable group.

Development is defined as an Azure DevOps deployment environment in the YAML:

```yaml
environment: "FlavorForge-Dev"
```

The QA and Production stages, however, use both deployment environments and their corresponding variable groups:

```text
FlavorForge-QA
        +
FlavorForge-QA-Variables
```

and:

```text
FlavorForge-Prod
        +
FlavorForge-Prod-Variables
```

Therefore, this document focuses specifically on the **QA and Production approval/check configuration**.

---

## Result

The approval and check configuration provides a controlled promotion path:

```text
Development
      |
      v
   QA Approval
      |
      v
      QA
      |
      v
Production Approval
      |
      v
 Production
```

This prevents the QA and Production deployment stages from progressing without the configured approval being granted.
