# 1. Introduction & Prerequisites

## 1.1 Objective

This guide provides a complete, step-by-step procedure for configuring Azure DevOps to implement the CI/CD pipeline for the **FlavorForge Azure DevSecOps Capstone Project**. It is intended to help developers recreate the entire Azure DevOps setup from scratch using the project's existing Azure infrastructure, GitHub repository, and Azure DevOps YAML pipeline.

Unlike the pipeline overview document (`docs/pipeline/azure-devops-pipeline.md`), this guide focuses on the **implementation process**, including Azure DevOps project configuration, service connections, variable groups, environments, approvals, pipeline creation, and verification.

Following this guide allows another developer to reproduce the same Azure DevOps configuration without requiring additional assumptions or external documentation.

---

# 1.2 Purpose

The Azure DevOps pipeline automates the complete software delivery lifecycle for the FlavorForge application by integrating source control, automated testing, security scanning, containerization, and Kubernetes deployment.

The implementation described in this guide enables:

* Continuous Integration (CI) using Azure Pipelines
* Continuous Delivery (CD) to Azure Kubernetes Service (AKS)
* Automated code quality analysis using SonarCloud
* Container vulnerability scanning using Trivy
* Docker image build and publishing to Azure Container Registry (ACR)
* Multi-environment deployments (Development, QA, and Production)
* GitOps-based continuous delivery using Argo CD

The objective is to establish a repeatable and secure deployment workflow that minimizes manual intervention while maintaining consistency across all environments.

---

# 1.3 Scope

This document covers the Azure DevOps configuration required to deploy the FlavorForge application.

The implementation includes:

* Creating an Azure DevOps project
* Connecting the GitHub repository
* Creating Azure DevOps service connections
* Configuring variable groups
* Creating Azure DevOps environments
* Configuring environment approvals and permissions
* Creating a multi-stage YAML pipeline
* Executing and validating pipeline runs
* Verifying successful deployments to Azure Kubernetes Service (AKS)

Topics such as Docker image creation, Kubernetes manifest development, AKS provisioning, Argo CD installation, and application architecture are documented separately and are referenced where appropriate.

---

# 1.4 Intended Audience

This guide is intended for:

* DevOps Engineers
* Cloud Engineers
* Platform Engineers
* Students learning Azure DevOps
* CBC Internship reviewers
* Developers who need to recreate the FlavorForge CI/CD pipeline

The reader is expected to have basic familiarity with Azure and GitHub but does not need prior experience configuring Azure DevOps.

---

# 1.5 Prerequisites

Before beginning the Azure DevOps configuration, ensure the following prerequisites have already been completed.

| Requirement                                       | Status   | Reference                                           |
| ------------------------------------------------- | -------- | --------------------------------------------------- |
| Azure Subscription                                | Required | `docs/implementation/02-prerequisites-and-setup.md` |
| Azure CLI installed and authenticated             | Required | `docs/implementation/02-prerequisites-and-setup.md` |
| Azure Resource Group created                      | Required | `docs/week-4/02-prerequisites-and-setup.md`         |
| Azure Container Registry (ACR) created            | Required | `docs/week-4/04-step-by-step-implementation.md`     |
| Azure Kubernetes Service (AKS) cluster created    | Required | `docs/week-4/04-step-by-step-implementation.md`     |
| GitHub repository available                       | Required | Root `README.md`                                    |
| Docker installed                                  | Required | `docs/implementation/07-dockerization.md`           |
| Kubernetes manifests prepared                     | Required | `kubernetes/README.md`                              |
| `azure-pipelines.yml` committed to the repository | Required | Repository root                                     |

---

# 1.6 Required Software and Services

The following tools and cloud services are used throughout this guide.

| Component                      | Purpose                                |
| ------------------------------ | -------------------------------------- |
| Azure Portal                   | Manage Azure resources                 |
| Azure DevOps                   | CI/CD pipeline platform                |
| GitHub                         | Source code repository                 |
| Azure CLI                      | Azure resource management              |
| Docker                         | Container image creation               |
| kubectl                        | Kubernetes cluster management          |
| SonarCloud                     | Static code analysis                   |
| Trivy                          | Container image vulnerability scanning |
| Azure Container Registry (ACR) | Container image storage                |
| Azure Kubernetes Service (AKS) | Kubernetes cluster                     |
| Argo CD                        | GitOps continuous delivery             |

---

# 1.7 Existing Azure Resources

This guide assumes that the Azure resources required for the project have already been provisioned.

The Azure DevOps configuration performed in the following sections will connect to these existing resources rather than creating new infrastructure.

The implementation will use:

* Azure Resource Group
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* GitHub repository containing the FlavorForge source code

---

# 1.8 Documentation Structure

This implementation guide is organized into the following sections.

| Section    | Description                                |
| ---------- | ------------------------------------------ |
| Section 1  | Introduction and prerequisites             |
| Section 2  | Create Azure DevOps Project                |
| Section 3  | Connect GitHub Repository                  |
| Section 4  | Configure Azure DevOps Service Connections |
| Section 5  | Configure Variable Groups                  |
| Section 6  | Create Azure DevOps Environments           |
| Section 7  | Configure Approvals and Permissions        |
| Section 8  | Create and Run the Multi-Stage Pipeline    |
| Section 9  | Verify Pipeline Execution                  |
| Section 10 | Pipeline Architecture Reference            |
| Section 11 | Troubleshooting                            |
| Section 12 | Summary                                    |

---

# 1.9 Evidence

The following screenshots provide evidence that the required Azure resources and Azure DevOps environment are available before pipeline configuration begins.

### Azure DevOps organization
<img width="1732" height="936" alt="image" src="https://github.com/user-attachments/assets/99024449-71d2-401f-bb2c-1a114bb00c0d" />

### Azure DevOps project 
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f5702519-2006-418c-b808-10eb293a878f" />

### Azure Resource Group 
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/c0501c6b-e80e-4d35-abfb-1a805298a066" />


### Azure Container Registry  
<img width="1562" height="1257" alt="image" src="https://github.com/user-attachments/assets/92fd3725-5900-453a-82cf-7e0f3fd730c1" />

### Azure Kubernetes Service cluster
<img width="665" height="182" alt="image" src="https://github.com/user-attachments/assets/a46d864d-d9fb-41e7-8909-b90735e4ef7c" />


---


# 2. Create Azure DevOps Project

## 2.1 Objective

Create an Azure DevOps project that will host the CI/CD pipeline for the FlavorForge Azure DevSecOps Capstone Project. The project acts as the central location for managing source code integration, pipeline execution, environments, service connections, variable groups, and deployment history.

---

# 2.2 Purpose

An Azure DevOps project provides a dedicated workspace for organizing all DevOps resources related to an application. It enables collaboration, centralized pipeline management, secure access to Azure resources, and environment-based deployments.

For the FlavorForge project, Azure DevOps is used to:

* Connect the GitHub repository
* Execute the multi-stage YAML pipeline
* Store service connections
* Manage pipeline variables
* Configure deployment environments
* Track pipeline execution history

---

# 2.3 Prerequisites

Before creating the project, verify the following:

* An Azure DevOps account has been created.
* You have permission to create projects within your Azure DevOps organization.
* The FlavorForge GitHub repository is available.
* The Azure subscription and required Azure resources have already been provisioned.

---

# 2.4 Azure DevOps Navigation

Sign in to Azure DevOps and navigate through the following menu.

```text
Azure DevOps Organization
        │
        ▼
Projects
        │
        ▼
New Project
```

---

# 2.5 Create the Project

Click **New Project** and configure the project using the appropriate settings.

| Setting           | Value       |
| ----------------- | ----------- |
| Project Name      | FlavorForge |
| Visibility        | Private     |
| Version Control   | Git         |
| Work Item Process | Agile       |

After entering the project details, click **Create**.

Azure DevOps provisions the project and redirects you to the project dashboard.

---

# 2.6 Verify Project Creation

After the project has been created, verify the following:

* The project appears in the Azure DevOps organization.
* The left navigation menu displays services such as **Boards**, **Repos**, **Pipelines**, **Environments**, and **Project Settings**.
* The project dashboard opens without errors.

A successful project creation confirms that Azure DevOps is ready for repository integration and pipeline configuration.

---

# 2.7 Expected Outcome

At the end of this step:

* A dedicated Azure DevOps project has been created.
* The project is ready to connect to the FlavorForge GitHub repository.
* Project settings are accessible for further configuration.

---

# 2.8 Common Mistakes

| Issue                         | Resolution                                                               |
| ----------------------------- | ------------------------------------------------------------------------ |
| Unable to create a project    | Verify that your account has permission to create Azure DevOps projects. |
| Incorrect visibility selected | Use **Private** unless the project is intentionally public.              |
| Wrong version control system  | Ensure **Git** is selected.                                              |
| Project name already exists   | Choose a unique project name within the organization.                    |

---

# 2.9 Troubleshooting

### Project creation option unavailable

Confirm that your Azure DevOps account has the required permissions to create projects within the organization.

### Access denied

Verify that you are signed in with the correct Microsoft account and that you have access to the Azure DevOps organization.

### Project creation fails

Refresh the browser and retry. If the issue persists, verify that the Azure DevOps organization is active and that there are no service outages.

---

# 2.10 Evidence

Use the following screenshots from the repository to validate this step.

**Figure 2.1** – Azure DevOps organization.
<img width="1732" height="936" alt="image" src="https://github.com/user-attachments/assets/ae4627d1-ce10-46be-ad75-e5467ad7238d" />

**Figure 2.2** – FlavorForge project successfully created within the Azure DevOps organization.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/02549b73-24d1-48f6-8aa3-b60f9644c208" />

---

# 2.11 Next Step

After the Azure DevOps project has been created successfully, the next step is to connect the existing **FlavorForge GitHub repository** so that Azure Pipelines can use the committed `azure-pipelines.yml` file to build, test, and deploy the application.

---


# 3. Connect GitHub Repository

## 3.1 Objective

Connect the existing FlavorForge GitHub repository to the Azure DevOps project. This integration allows Azure Pipelines to access the application source code, detect changes, and execute the multi-stage YAML pipeline defined in the repository.

---

# 3.2 Purpose

Azure DevOps supports multiple source code providers, including Azure Repos and GitHub. In this project, GitHub serves as the source code repository, while Azure DevOps is responsible for building, testing, scanning, and deploying the application.

Connecting the repository enables Azure DevOps to:

* Access the application source code
* Read the `azure-pipelines.yml` file
* Trigger pipeline executions
* Build every commit from the selected branch
* Maintain traceability between source code and deployments

---

# 3.3 Prerequisites

Before connecting the repository, ensure the following prerequisites are met:

* Azure DevOps project has been created.
* GitHub account is accessible.
* FlavorForge repository exists on GitHub.
* The repository contains the `azure-pipelines.yml` file in the repository root.
* You have permission to authorize Azure DevOps to access the repository.

---

# 3.4 Azure DevOps Navigation

Navigate to the Pipelines section.

```text
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
New Pipeline
```

---

# 3.5 Create a New Pipeline

Click **New Pipeline**.

Azure DevOps displays the available source code providers.

Select:

```text
GitHub
```

If prompted, sign in to GitHub and authorize Azure DevOps to access your repositories.

---

# 3.6 Select the Repository

After successful authentication:

1. Select the GitHub organization or account.
2. Locate the FlavorForge repository.
3. Select the repository.

Azure DevOps scans the repository and detects available pipeline configurations.

---

# 3.7 Select the Pipeline Configuration

Choose:

```text
Existing Azure Pipelines YAML file
```

Browse to the repository root and select:

```text
azure-pipelines.yml
```

Azure DevOps loads the pipeline configuration from the repository without creating a new YAML file.

---

# 3.8 Review the Pipeline

Azure DevOps opens the YAML editor displaying the contents of the selected `azure-pipelines.yml` file.

Review the configuration to verify that:

* The correct YAML file has been selected.
* Pipeline stages are visible.
* No validation errors are reported.

At this stage, no changes are required because the pipeline definition is already maintained within the GitHub repository.

---

# 3.9 Save and Run

Click **Run** to queue the pipeline.

Azure DevOps performs the following actions:

* Clones the GitHub repository
* Reads the `azure-pipelines.yml` file
* Creates the pipeline
* Starts the first pipeline execution

---

# 3.10 Verification

Verify that:

* The pipeline has been created successfully.
* The pipeline appears under **Pipelines**.
* The initial run starts without repository access errors.
* The **Checkout** stage completes successfully.

A successful checkout confirms that Azure DevOps can communicate with GitHub.

---

# 3.11 Expected Outcome

After completing this section:

* Azure DevOps is connected to the FlavorForge GitHub repository.
* The repository is accessible by Azure Pipelines.
* The multi-stage YAML pipeline is registered.
* Pipeline execution can now be configured with service connections and deployment settings.

---

# 3.12 Common Mistakes

| Issue                         | Resolution                                                                  |
| ----------------------------- | --------------------------------------------------------------------------- |
| Repository not visible        | Verify GitHub authorization and repository permissions.                     |
| YAML file not detected        | Confirm `azure-pipelines.yml` exists in the repository root.                |
| Authentication failure        | Re-authorize Azure DevOps to access GitHub.                                 |
| Incorrect repository selected | Ensure the FlavorForge repository is selected before creating the pipeline. |

---

# 3.13 Troubleshooting

### GitHub authorization fails

Sign out of GitHub within Azure DevOps and authorize the application again.

### Repository not listed

Verify that the repository belongs to the authorized GitHub account or organization.

### Pipeline cannot locate the YAML file

Ensure that `azure-pipelines.yml` is committed to the default branch and located in the repository root.

---

# 3.14 Evidence

Use the following screenshots from the repository:

**Figure 3.1** – Creating a new Azure pipeline.
<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/c0eda7a3-3185-4aee-bc2d-7123e895af33" />

**Figure 3.2** – Azure DevOps executing the pipeline.
<img width="2560" height="1277" alt="image" src="https://github.com/user-attachments/assets/01e80c06-8df9-4b9d-846b-50fef13cf823" />
<img width="3085" height="1229" alt="image" src="https://github.com/user-attachments/assets/42efc992-c410-42f7-95d9-9b8b7d88205d" />

**Figure 3.3** – Successful pipeline execution.
<img width="4365" height="1229" alt="image" src="https://github.com/user-attachments/assets/b6e69d29-2169-4e13-b42f-91d5791cac8f" />

---

# 4. Configure Azure DevOps Service Connections

## 4.1 Objective

Create and configure Azure DevOps Service Connections to enable the pipeline to securely authenticate with Azure resources and external services. Service Connections eliminate the need to store credentials in the pipeline and provide controlled access to Azure subscriptions, Azure Container Registry (ACR), and SonarCloud.

---

# 4.2 Purpose

Azure DevOps uses Service Connections to establish secure communication with Azure services during pipeline execution.

For the FlavorForge project, Service Connections are required to:

* Deploy resources to Azure Kubernetes Service (AKS)
* Push Docker images to Azure Container Registry (ACR)
* Perform static code analysis using SonarCloud
* Authenticate deployment tasks without exposing credentials

The pipeline references these connections whenever it interacts with Azure resources.

---

# 4.3 Service Connections Used

The FlavorForge project uses the following Service Connections.

| Service Connection       | Purpose                                                  |
| ------------------------ | -------------------------------------------------------- |
| Azure Resource Manager   | Authenticate with Azure Subscription for AKS deployments |
| Azure Container Registry | Push Docker images to Azure Container Registry           |
| SonarCloud               | Perform code quality analysis during pipeline execution  |

Each Service Connection is configured once and reused by all pipeline stages.

---

# 4.4 Azure DevOps Navigation

Navigate to the Service Connections page.

```text
Azure DevOps Project
        │
        ▼
Project Settings
        │
        ▼
Service Connections
```

Click **New Service Connection** to create a new connection.

---

# 4.5 Create Azure Resource Manager Service Connection

## Purpose

The Azure Resource Manager (ARM) Service Connection allows Azure DevOps to authenticate with the Azure Subscription and perform deployment operations such as applying Kubernetes manifests to AKS.

### Navigation

```text
Project Settings
        │
        ▼
Service Connections
        │
        ▼
New Service Connection
        │
        ▼
Azure Resource Manager
```

### Configuration

Configure the connection using the following settings.

| Setting                                  | Value                                     |
| ---------------------------------------- | ----------------------------------------- |
| Connection Type                          | Azure Resource Manager                    |
| Authentication Method                    | Workload Identity Federation              |
| Scope Level                              | Subscription                              |
| Subscription                             | Select your Azure Subscription            |
| Resource Group                           | FlavorForge Resource Group                |
| Service Connection Name                  | Azure Resource Manager Service Connection |
| Grant access permission to all pipelines | Enabled                                   |

After completing the configuration, click **Save**.

---

# 4.6 Verification

Verify the following:

* The Service Connection status displays **Ready**.
* No authorization errors are reported.
* Azure DevOps successfully validates the Azure Subscription.

---

# 4.7 Common Mistakes

| Issue                             | Resolution                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Subscription not listed           | Verify Azure account permissions and active subscription.                         |
| Authorization failed              | Re-authenticate with Azure and retry.                                             |
| Connection status not Ready       | Review the authentication method and ensure the required permissions are granted. |
| Incorrect Resource Group selected | Select the Resource Group used by the FlavorForge project.                        |

---

# 4.8 Troubleshooting

### Azure Subscription not visible

Ensure the correct Azure account is signed in and that the subscription is active.

### Permission denied

Verify that your Azure account has sufficient permissions to create Service Connections.

### Connection validation failed

Delete the incomplete connection and recreate it using the correct authentication method.

---

# 4.9 Evidence

Use the following screenshots from the repository.

**Figure 4.1** – Selecting the Azure Resource Manager Service Connection.
<img width="2555" height="1221" alt="image" src="https://github.com/user-attachments/assets/db836bd8-b68f-41fd-a711-505db6fb409e" />

**Figure 4.2** – Configuring the Azure Resource Manager Service Connection.
<img width="2556" height="1227" alt="image" src="https://github.com/user-attachments/assets/4fd68944-a1d1-4ada-9fe9-fbfc20fdfb08" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/56600536-af20-4ee6-9f25-b46746f8dd60" />

**Figure 4.3** – Service Connection successfully created.
<img width="2155" height="452" alt="image" src="https://github.com/user-attachments/assets/ecaa2be0-e41b-4fa0-8bc1-6c6cb8ec797d" />

---

# 4.10 Next Step

After creating the Azure Resource Manager Service Connection, the next step is to configure additional Service Connections required by the pipeline, including Azure Container Registry (ACR) and SonarCloud, before proceeding with Variable Groups and pipeline creation.

---

# 4.6 Create Azure Container Registry (ACR) Service Connection

## 4.6.1 Objective

Create an Azure Container Registry (ACR) Service Connection that allows Azure DevOps to securely authenticate with the Azure Container Registry and push Docker images generated during the pipeline execution.

---

## 4.6.2 Purpose

The Docker build stage creates separate container images for the FlavorForge frontend and backend applications. These images must be published to Azure Container Registry (ACR) before they can be deployed to Azure Kubernetes Service (AKS).

The ACR Service Connection enables Azure DevOps to:

* Authenticate with Azure Container Registry
* Push Docker images securely
* Eliminate the need to store registry credentials in the pipeline
* Support automated image publishing during every pipeline execution

---

## 4.6.3 Azure DevOps Navigation

Navigate to the Service Connections page.

```text
Azure DevOps Project
        │
        ▼
Project Settings
        │
        ▼
Service Connections
        │
        ▼
New Service Connection
```

Select:

```text
Docker Registry
```

---

## 4.6.4 Configuration

Configure the service connection using the Azure Container Registry option.

| Setting                                  | Value                          |
| ---------------------------------------- | ------------------------------ |
| Connection Type                          | Docker Registry                |
| Registry Type                            | Azure Container Registry       |
| Azure Subscription                       | Select your Azure Subscription |
| Azure Container Registry                 | Select the FlavorForge ACR     |
| Service Connection Name                  | ACR Service Connection         |
| Grant access permission to all pipelines | Enabled                        |

After verifying the configuration, click **Save**.

---

## 4.6.5 Verification

Verify that:

* The Service Connection status is **Ready**.
* Azure DevOps successfully connects to the Azure Container Registry.
* The connection appears in the Service Connections list.

---

## 4.6.6 Common Mistakes

| Issue                  | Resolution                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------ |
| ACR not listed         | Verify that the registry exists and belongs to the selected Azure subscription.      |
| Authentication failure | Recreate the connection using the correct Azure account.                             |
| Push permission denied | Ensure the Service Connection has permission to access the Azure Container Registry. |

---

## 4.6.7 Evidence

Use the following screenshots from the repository.


**Figure 4.4** – Creating the Azure Container Registry Service Connection.
<img width="2581" height="1234" alt="image" src="https://github.com/user-attachments/assets/fd79a01e-ba13-48f3-91b0-af0804f3ce6e" />

**Figure 4.5** – Azure Container Registry Service Connection successfully configured.
<img width="2155" height="452" alt="image" src="https://github.com/user-attachments/assets/d2dfe9eb-072a-4772-94ff-40a560b8030b" />
<img width="1195" height="1041" alt="image" src="https://github.com/user-attachments/assets/0f57085c-9d5f-4cc0-8373-92911215b0e3" />

---

# 4.7 Create SonarCloud Service Connection

## 4.7.1 Objective

Configure the SonarCloud Service Connection to allow Azure DevOps to authenticate with SonarCloud and perform automated code quality analysis during pipeline execution.

---

## 4.7.2 Purpose

SonarCloud is integrated into the FlavorForge CI/CD pipeline to perform static code analysis and evaluate code quality before deployment.

The SonarCloud Service Connection enables Azure DevOps to:

* Authenticate with the SonarCloud organization
* Execute code analysis
* Publish Quality Gate results
* Generate code coverage reports

---

## 4.7.3 Azure DevOps Navigation

```text
Project Settings
        │
        ▼
Service Connections
        │
        ▼
New Service Connection
        │
        ▼
SonarCloud
```

---

## 4.7.4 Configuration

Configure the connection using the SonarCloud organization associated with the FlavorForge project.

Typical configuration includes:

| Setting                 | Value                               |
| ----------------------- | ----------------------------------- |
| Connection Type         | SonarCloud                          |
| Organization            | FlavorForge SonarCloud Organization |
| Authentication          | Personal Access Token (PAT)         |
| Service Connection Name | SonarCloud Service Connection       |

After completing the configuration, click **Verify** and **Save**.

---

## 4.7.5 Verification

Verify that:

* The SonarCloud Service Connection status is **Ready**.
* Azure DevOps successfully authenticates with SonarCloud.
* The connection is available for use in pipeline tasks.

---

## 4.7.6 Common Mistakes

| Issue                         | Resolution                                                            |
| ----------------------------- | --------------------------------------------------------------------- |
| Invalid Personal Access Token | Generate a new token in SonarCloud and update the Service Connection. |
| Organization not found        | Verify the correct SonarCloud organization has been selected.         |
| Authentication failed         | Recreate the Service Connection using a valid token.                  |

---

## 4.7.7 Evidence

Use the following screenshots from the repository.

**Figure 4.6** – SonarCloud extension configured.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/3592ff2e-7b04-4da6-8446-edd2fe938110" />

**Figure 4.7** – SonarCloud analysis completed successfully.
<img width="2155" height="452" alt="image" src="https://github.com/user-attachments/assets/16fbfa3c-5617-40c3-8279-ad773a88342f" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/1f69f6cf-5c1d-4d87-878d-8e08d134ff52" />


---

# 5. Configure Variable Groups

## 5.1 Objective

Create Azure DevOps Variable Groups to centrally manage pipeline configuration values and environment-specific settings. Variable Groups allow the pipeline to reuse common values across multiple stages without hardcoding them into the YAML file.

---

# 5.2 Purpose

Variable Groups provide a centralized location for storing configuration values that are shared across pipeline stages.

Using Variable Groups offers the following benefits:

* Eliminates hardcoded values from the pipeline
* Simplifies environment management
* Supports reusable pipeline templates
* Protects sensitive values by storing them as secrets
* Reduces maintenance effort when configuration changes

For the FlavorForge project, separate Variable Groups are maintained for Development, QA, and Production environments.

---

# 5.3 Azure DevOps Navigation

Navigate to the Variable Groups library.

```text
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
Library
        │
        ▼
+ Variable Group
```

---

# 5.4 Create the Development Variable Group

Click **+ Variable Group** and configure the Development environment.

Example configuration:

| Setting                       | Value           |
| ----------------------------- | --------------- |
| Variable Group Name           | `dev_variables` |
| Allow access to all pipelines | Enabled         |

Add all environment-specific variables required by the Development deployment.

After entering the variables, click **Save**.

---

# 5.5 Create the QA Variable Group

Repeat the same process to create the QA Variable Group.

Example configuration:

| Setting                       | Value          |
| ----------------------------- | -------------- |
| Variable Group Name           | `qa_variables` |
| Allow access to all pipelines | Enabled        |

Configure all values required for the QA environment.

Save the Variable Group after completing the configuration.

---

# 5.6 Create the Production Variable Group

Create the Production Variable Group using the same process.

Example configuration:

| Setting                       | Value            |
| ----------------------------- | ---------------- |
| Variable Group Name           | `prod_variables` |
| Allow access to all pipelines | Enabled          |

Store all Production-specific configuration values in this Variable Group.

---

# 5.7 Secret Variables

Sensitive information should always be stored as **Secret Variables**.

Typical examples include:

* Access tokens
* Passwords
* API keys
* Connection strings
* Client secrets

Enable the **Keep this value secret** option when creating confidential variables.

Azure DevOps masks secret values in pipeline logs to prevent accidental disclosure.

---

# 5.8 Using Variable Groups in the Pipeline

Variable Groups are referenced directly from the pipeline YAML.

Example:

```yaml
variables:
- group: dev_variables
```

For multi-environment deployments, the appropriate Variable Group is referenced in the corresponding deployment stage.

---

# 5.9 Verification

Verify the following:

* All Variable Groups appear in the Azure DevOps Library.
* Variables are accessible to the pipeline.
* Secret variables are masked in pipeline logs.
* Pipeline execution completes without missing variable errors.

---

# 5.10 Common Mistakes

| Issue                            | Resolution                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Variable Group not visible       | Verify it was created in the correct Azure DevOps project.                     |
| Pipeline cannot access variables | Enable **Allow access to all pipelines** or authorize the pipeline explicitly. |
| Secret values displayed          | Ensure the variable is marked as **Secret**.                                   |
| Incorrect variable name          | Confirm the YAML references the exact Variable Group name.                     |

---

# 5.11 Troubleshooting

### Pipeline reports variable not found

Verify the Variable Group name matches the name referenced in the pipeline YAML.

### Pipeline authorization error

Authorize the Variable Group for the pipeline from the Library page.

### Secret variable unavailable

Confirm the variable is defined correctly and that the pipeline has permission to access it.

---

# 5.12 Evidence

Use the following screenshots from the repository.

**Figure 5.1** – Azure DevOps Library.
<img width="2557" height="817" alt="image" src="https://github.com/user-attachments/assets/6e7281ba-848f-426b-ae97-d8472a25bf32" />

**Figure 5.2** – QA Variable Group configuration.
<img width="2557" height="845" alt="image" src="https://github.com/user-attachments/assets/48d4566f-6cd5-4eaf-9d90-ab459aec212f" />

**Figure 5.3** – Production Variable Group configuration.
<img width="2546" height="967" alt="image" src="https://github.com/user-attachments/assets/5ce4dc54-d674-48bf-b16b-ad805b7dc034" />

---

# 5.13 Expected Outcome

After completing this section:

* Variable Groups have been created for all deployment environments.
* Common configuration values are centrally managed.
* Sensitive values are securely stored as secret variables.
* The pipeline can access the required configuration during execution without hardcoding values.

---

# 6. Configure Azure DevOps Environments

## 6.1 Objective

Create Azure DevOps Environments to manage deployments for the Development, QA, and Production stages of the FlavorForge application. Environments provide deployment history, resource visibility, approval workflows, and deployment traceability.

---

# 6.2 Purpose

Azure DevOps Environments represent the deployment targets used by the CI/CD pipeline.

They provide:

* Deployment history
* Environment-specific approvals
* Deployment traceability
* Resource management
* Deployment auditing
* Integration with deployment jobs

For the FlavorForge project, separate environments are maintained for Development, QA, and Production to ensure controlled promotion of application releases.

---

# 6.3 Azure DevOps Navigation

Navigate to the Environments page.

```text
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
Environments
        │
        ▼
New Environment
```

---

# 6.4 Create the Development Environment

Click **New Environment**.

Configure the Development environment.

| Setting          | Value                                             |
| ---------------- | ------------------------------------------------- |
| Environment Name | `Development` *(or your actual environment name)* |
| Resource         | None                                              |

Click **Create**.

The Development environment will be used by the pipeline during the Dev deployment stage.

---

# 6.5 Create the QA Environment

Repeat the process to create the QA environment.

| Setting          | Value                                    |
| ---------------- | ---------------------------------------- |
| Environment Name | `QA` *(or your actual environment name)* |
| Resource         | None                                     |

After creation, the QA environment becomes available for deployment jobs.

---

# 6.6 Create the Production Environment

Create the Production environment using the same process.

| Setting          | Value                                            |
| ---------------- | ------------------------------------------------ |
| Environment Name | `Production` *(or your actual environment name)* |
| Resource         | None                                             |

The Production environment represents the final deployment stage of the pipeline.

---

# 6.7 Deployment Jobs

The multi-stage YAML pipeline references these environments during deployment.

Example:

```yaml
jobs:
- deployment: DeployDev
  environment: Development
```

Each deployment is recorded within the corresponding Azure DevOps Environment.

---

# 6.8 Verification

Verify the following:

* Development environment exists.
* QA environment exists.
* Production environment exists.
* Each environment appears in the Environments dashboard.
* No deployment errors are reported.

---

# 6.9 Common Mistakes

| Issue                      | Resolution                                                      |
| -------------------------- | --------------------------------------------------------------- |
| Environment not visible    | Refresh the Environments page after creation.                   |
| Incorrect environment name | Ensure the pipeline YAML references the exact environment name. |
| Deployment fails           | Verify the deployment job points to an existing environment.    |

---

# 6.10 Troubleshooting

### Pipeline cannot find the environment

Confirm that the environment name in the YAML file matches the Azure DevOps Environment exactly.

### Deployment history missing

Ensure the pipeline uses **deployment jobs** rather than standard jobs.

### Environment created in another project

Verify you are viewing the correct Azure DevOps project.

---

# 6.11 Evidence

Use the following screenshots from the repository.


**Figure 6.1** – Azure DevOps Environments dashboard.
<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/01f60b73-dec9-4c2f-80db-95850dc4c8a8" />

**Figure 6.2** – Development Environment.
<img width="607" height="1191" alt="image" src="https://github.com/user-attachments/assets/69aa9354-5045-47c4-a170-74d493d1f232" />

**Figure 6.3** – Development, QA, and Production Environments.
<img width="2555" height="695" alt="image" src="https://github.com/user-attachments/assets/42a10ac6-5d2f-469a-b73c-82feeed0e2b1" />

**Figure 6.4** – Deployment history across all environments.
<img width="1090" height="1085" alt="image" src="https://github.com/user-attachments/assets/65f5fe8e-b558-4f94-9f93-0c799cda9063" />

---

# 6.12 Expected Outcome

After completing this section:

* Azure DevOps Environments are created for each deployment stage.
* The pipeline can target environment-specific deployment jobs.
* Deployment history is available within Azure DevOps.
* The project is ready to configure environment approvals and permissions.

---


# 7. Configure Approvals & Permissions

## 7.1 Objective

Configure environment approvals and permissions to control deployments to the QA and Production environments. Approval gates ensure that deployments are reviewed and explicitly authorized before progressing to the next environment.

---

# 7.2 Purpose

Azure DevOps Environments support approval checks that introduce manual validation into the deployment workflow.

For the FlavorForge project, approvals are used to:

* Prevent unintended deployments
* Protect higher environments
* Introduce a controlled release process
* Maintain deployment traceability
* Support enterprise CI/CD practices

The Development environment allows automatic deployments, while QA and Production require approval before deployment continues.

---

# 7.3 Azure DevOps Navigation

Navigate to the required environment.

```text id="efkr5g"
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
Environments
        │
        ▼
Select Environment
        │
        ▼
Approvals and Checks
```

---

# 7.4 Configure QA Approval

Open the **QA** environment.

Select **Approvals and Checks** and add a new approval.

Configure the approval using the appropriate reviewer or group.

After saving the configuration, every deployment to the QA environment pauses until the approval is granted.

---

# 7.5 Configure Production Approval

Repeat the process for the **Prod** environment.

Production deployments require explicit approval before the deployment job starts.

This additional validation helps reduce the risk of deploying unverified changes to the production environment.

---

# 7.6 Configure Environment Permissions

Each environment has its own security settings.

Review the environment permissions and verify that:

* The pipeline has permission to deploy.
* Authorized users can approve deployments.
* Unauthorized users cannot modify approval settings.

Proper permissions help protect deployment environments from accidental or unauthorized changes.

---

# 7.7 Deployment Flow

After approvals are configured, the deployment process follows this sequence.

```text id="8e3aqx"
Build
   │
   ▼
Dev Deployment
   │
   ▼
QA Approval
   │
   ▼
QA Deployment
   │
   ▼
Production Approval
   │
   ▼
Production Deployment
```

This workflow ensures that deployments progress through controlled promotion stages.

---

# 7.8 Verification

Verify that:

* The QA environment displays an Approval Check.
* The Production environment displays an Approval Check.
* A pipeline pauses when awaiting approval.
* After approval is granted, deployment resumes automatically.

---

# 7.9 Common Mistakes

| Issue                      | Resolution                                                   |
| -------------------------- | ------------------------------------------------------------ |
| Approval not triggered     | Verify the deployment job targets the correct environment.   |
| Pipeline bypasses approval | Confirm the approval check is configured on the environment. |
| Reviewer cannot approve    | Verify the reviewer has the required permissions.            |
| Deployment remains pending | Ensure an authorized approver reviews the deployment.        |

---

# 7.10 Troubleshooting

### Approval notification not received

Verify that the reviewer has access to the Azure DevOps project and environment.

### Deployment blocked

Confirm that all required approvals have been completed before continuing.

### Environment permission denied

Review the environment security settings and grant deployment permission to the required users or groups.

---

# 7.11 Evidence

Use the following screenshots from the repository.

**Figure 7.1** – Approval configuration.
<img width="2552" height="1232" alt="image" src="https://github.com/user-attachments/assets/bc7fba8b-f9bf-47d1-ab83-2095366ed40d" />
<img width="2532" height="1092" alt="image" src="https://github.com/user-attachments/assets/aef7fbe7-2ddf-460e-a938-45e139230776" />

**Figure 7.2** – QA approval gate.
<img width="2547" height="1207" alt="image" src="https://github.com/user-attachments/assets/d51df190-78ea-41ec-8626-1d6f22e9dd15" />
<img width="2551" height="1207" alt="image" src="https://github.com/user-attachments/assets/74955a0d-1592-4d55-b8e4-fa90c6f14daf" />

**Figure 7.3** – Production approval gate.
<img width="2536" height="1225" alt="image" src="https://github.com/user-attachments/assets/9f63ff9a-63ee-464f-8105-e5fc10a448d4" />
<img width="2547" height="1226" alt="image" src="https://github.com/user-attachments/assets/26ece4be-af8a-4445-903a-68cfae573a22" />

**Figure 7.4** – Environment permissions.
<img width="2557" height="1180" alt="image" src="https://github.com/user-attachments/assets/1fddfdbc-b524-4498-a970-f98e0e66006a" />
<img width="2552" height="1100" alt="image" src="https://github.com/user-attachments/assets/f384b26b-0246-4969-80e3-4741c0a78101" />


---

# 7.12 Expected Outcome

After completing this section:

* The **Dev** environment allows automatic deployments.
* The **QA** environment requires manual approval before deployment.
* The **Prod** environment requires manual approval before deployment.
* Environment permissions restrict deployment access to authorized users.
* The CI/CD pipeline follows a controlled promotion process across all environments.

---

# 8. Create the Multi-Stage Azure DevOps Pipeline

## 8.1 Objective

Create an Azure DevOps Pipeline that uses the existing `azure-pipelines.yml` file stored in the FlavorForge GitHub repository. The pipeline automates the complete CI/CD workflow, including application build, testing, code quality analysis, security scanning, Docker image creation, image publishing to Azure Container Registry (ACR), and deployment to Azure Kubernetes Service (AKS).

---

# 8.2 Purpose

Azure Pipelines supports Infrastructure as Code by defining the CI/CD workflow in a YAML file.

Storing the pipeline configuration in the repository provides several benefits:

* Pipeline versioning
* Code review through pull requests
* Reproducible builds
* Consistent deployments
* Easier maintenance
* Source-controlled CI/CD configuration

For the FlavorForge project, the entire pipeline is defined in the `azure-pipelines.yml` file located in the repository root.

---

# 8.3 Prerequisites

Before creating the pipeline, verify that the following configuration has been completed:

* Azure DevOps project created
* GitHub repository connected
* Azure Resource Manager Service Connection configured
* Azure Container Registry Service Connection configured
* SonarCloud Service Connection configured
* Variable Groups created
* Azure DevOps Environments configured
* Environment approvals configured

---

# 8.4 Azure DevOps Navigation

Navigate to the Pipelines page.

```text
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
New Pipeline
```

---

# 8.5 Create the Pipeline

Click **New Pipeline**.

Select **GitHub** as the source code provider.

Choose the FlavorForge repository.

Select:

```text
Existing Azure Pipelines YAML file
```

Browse to the repository root and select:

```text
azure-pipelines.yml
```

Azure DevOps loads the YAML configuration and displays the pipeline editor.

---

# 8.6 Review the Pipeline Configuration

Review the YAML file before running the pipeline.

Verify that:

* The correct repository has been selected.
* The correct branch is selected.
* The `azure-pipelines.yml` file loads successfully.
* No syntax or validation errors are reported.

No manual modifications are required if the YAML file is already committed and validated.

---

# 8.7 Save and Run

Click **Run**.

Azure DevOps queues the pipeline and begins executing the defined stages.

During execution, Azure DevOps performs the following operations:

* Checks out the source code
* Restores project dependencies
* Builds the application
* Executes unit tests
* Runs SonarCloud analysis
* Performs Trivy security scanning
* Builds Docker images
* Pushes images to Azure Container Registry
* Deploys the application to Azure Kubernetes Service
* Records deployment history in Azure DevOps Environments

---

# 8.8 Verification

Monitor the pipeline execution from the **Pipelines** dashboard.

Verify that:

* All stages complete successfully.
* No task reports an error.
* Docker images are pushed to Azure Container Registry.
* The deployment stages complete successfully.
* The pipeline status is displayed as **Succeeded**.

---

# 8.9 Pipeline Stage Reference

The detailed explanation of each pipeline stage is documented separately.

Refer to:

```text
docs/pipeline/azure-devops-pipeline.md
```

That document explains:

* Build stage
* Test stage
* SonarCloud analysis
* Trivy security scan
* Docker build
* Azure Container Registry push
* AKS deployment
* GitOps synchronization with Argo CD

This implementation guide focuses only on configuring and executing the pipeline.

---

# 8.10 Common Mistakes

| Issue                     | Resolution                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------- |
| YAML file not found       | Ensure `azure-pipelines.yml` exists in the repository root.                           |
| Pipeline validation fails | Review the YAML syntax and referenced variables.                                      |
| Service Connection error  | Verify that all required Service Connections are configured and authorized.           |
| Variable Group error      | Confirm the Variable Group names match the YAML configuration.                        |
| Environment not found     | Ensure the environment names in the YAML match the Azure DevOps Environments exactly. |

---

# 8.11 Troubleshooting

### Pipeline cannot start

Verify that the GitHub repository is connected and accessible.

### YAML validation error

Review the `azure-pipelines.yml` file for syntax errors or missing references.

### Deployment stage skipped

Confirm that all required approvals have been granted and that the deployment conditions are satisfied.

### Pipeline fails during deployment

Check the deployment logs for Service Connection, Kubernetes, or container image issues.

---

# 8.12 Evidence

Use the following screenshots from the repository.

**Figure 8.1** – Creating the Azure DevOps Pipeline.
<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/0be28b75-b681-4012-bba2-d30833ab3a20" />

**Figure 8.2** – Initial pipeline execution.
<img width="2560" height="1277" alt="image" src="https://github.com/user-attachments/assets/df01a302-390f-4507-b048-5abac79afd6a" />

**Figure 8.3** – Successful pipeline execution.
<img width="3085" height="1229" alt="image" src="https://github.com/user-attachments/assets/0ef0e68a-9f94-4e95-a2d7-14faeb4e24a5" />

**Figure 8.4** – Multi-stage pipeline execution across Dev, QA, and Prod environments.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/04fbf862-7127-48a3-8cad-39ebfa5b3ad8" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/05ee78a0-fe3f-401c-8f12-8580a1af0f02" />
<img width="2560" height="2147" alt="image" src="https://github.com/user-attachments/assets/4be29f4b-a8ee-4280-bc62-2dd75080becc" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/6488a4c0-a530-48aa-a50c-0f2f4ad6b35d" />
<img width="2560" height="1347" alt="image" src="https://github.com/user-attachments/assets/62c7baf7-4688-4b9b-8e0f-95d4bf801a53" />
<img width="2560" height="1427" alt="image" src="https://github.com/user-attachments/assets/d6a67703-33cb-4d62-b8cf-cffb40037fbf" />



---

# 8.13 Expected Outcome

After completing this section:

* The Azure DevOps Pipeline is successfully created.
* The pipeline executes the `azure-pipelines.yml` workflow.
* Application images are built and published to Azure Container Registry.
* Deployments are completed across the configured environments.
* The pipeline is ready for continuous integration and continuous delivery using GitHub, Azure DevOps, AKS, and Argo CD.

---

# 9. Run & Verify the Pipeline

## 9.1 Objective

Execute the Azure DevOps Pipeline and verify that each stage completes successfully. This validation confirms that the Azure DevOps configuration, service connections, environments, and deployment workflow are functioning correctly.

---

# 9.2 Purpose

Pipeline verification ensures that the CI/CD implementation is operational before it is used for ongoing development and deployments.

Successful execution validates:

* GitHub repository integration
* Pipeline configuration
* Service Connections
* Variable Groups
* Azure DevOps Environments
* Azure Container Registry authentication
* Azure Kubernetes Service deployment
* SonarCloud integration
* Trivy security scanning

A successful pipeline demonstrates that the complete DevSecOps workflow is functioning as expected.

---

# 9.3 Start a Pipeline Run

Navigate to the Azure DevOps Pipeline.

```text
Azure DevOps Project
        │
        ▼
Pipelines
        │
        ▼
FlavorForge Pipeline
        │
        ▼
Run Pipeline
```

Select the appropriate branch and click **Run**.

Azure DevOps creates a new pipeline execution and displays the live progress of each stage.

---

# 9.4 Verify Pipeline Execution

Monitor the pipeline execution from the Azure DevOps dashboard.

Verify that each stage completes successfully.

Typical pipeline stages include:

* Source Checkout
* Build
* Unit Testing
* SonarCloud Analysis
* Security Scan
* Docker Build
* Push Images to Azure Container Registry
* Deploy to Dev
* Deploy to QA
* Deploy to Production

Each stage should display a **Succeeded** status.

---

# 9.5 Verify SonarCloud Analysis

After the pipeline completes:

Verify that:

* Source code analysis has completed.
* Quality Gate passes.
* Code Coverage is published.
* No blocking issues are reported.

Review the SonarCloud dashboard for detailed quality metrics.

---

# 9.6 Verify Docker Images in Azure Container Registry

Open the Azure Portal.

Navigate to:

```text
Azure Portal
        │
        ▼
Azure Container Registry
        │
        ▼
Repositories
```

Verify that:

* Backend image exists.
* Frontend image exists.
* New image tags have been created for the current pipeline execution.

---

# 9.7 Verify AKS Deployment

Connect to the AKS cluster and execute the following commands.

Verify the deployments.

```bash
kubectl get deployments -n flavorforge
```

Verify the running pods.

```bash
kubectl get pods -n flavorforge
```

Verify the services.

```bash
kubectl get services -n flavorforge
```

Verify the ingress configuration.

```bash
kubectl get ingress -n flavorforge
```

All resources should report a healthy status.

---

# 9.8 Verify Azure DevOps Environments

Navigate to:

```text
Azure DevOps
        │
        ▼
Pipelines
        │
        ▼
Environments
```

Verify that:

* Dev deployment is recorded.
* QA deployment is recorded.
* Production deployment is recorded.
* Deployment history is available for each environment.

---

# 9.9 Verify the Running Application

Open the application using the configured ingress endpoint.

Verify that:

* The frontend loads successfully.
* Backend API requests succeed.
* Health endpoint returns a successful response.
* Application functionality is working as expected.

---

# 9.10 Verification Checklist

| Verification Item | Expected Result     |
| ----------------- | ------------------- |
| Pipeline Status   | Succeeded           |
| Build             | Successful          |
| Unit Tests        | Passed              |
| SonarCloud        | Quality Gate Passed |
| Trivy             | Scan Completed      |
| Docker Images     | Published to ACR    |
| AKS Deployment    | Successful          |
| Dev Environment   | Deployment Recorded |
| QA Environment    | Deployment Recorded |
| Prod Environment  | Deployment Recorded |
| Application       | Accessible          |

---

# 9.11 Common Issues

| Issue                   | Resolution                                                          |
| ----------------------- | ------------------------------------------------------------------- |
| Pipeline failed         | Review the failed stage logs.                                       |
| Images not pushed       | Verify the ACR Service Connection.                                  |
| Deployment failed       | Check the AKS deployment logs and Kubernetes events.                |
| SonarCloud failed       | Verify the SonarCloud Service Connection and project configuration. |
| Application unavailable | Verify the ingress configuration and service endpoints.             |

---

# 9.12 Evidence

Use the following screenshots from the repository.

**Figure 9.1** – Successful Azure DevOps pipeline execution.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/aa31ab06-1247-4c46-b421-6e4b604371a5" />

**Figure 9.2** – SonarCloud quality analysis.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/310cb976-a47f-4b2f-ba41-17c202d47eb4" />

**Figure 9.3** – Docker images available in Azure Container Registry.
<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/fffa219f-1b97-4ebd-97be-0deabc109904" />

**Figure 9.4** – Successful AKS deployment.
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/e8cbedc5-a44c-4632-9782-60cec3cd0a15" />

**Figure 9.5** – Deployment history across all environments.
<img width="1090" height="1085" alt="image" src="https://github.com/user-attachments/assets/0e1725e2-d71c-4483-82a9-af1ea6b83d6b" />

---

# 9.13 Expected Outcome

After completing the verification process:

* The Azure DevOps pipeline executes successfully from source code checkout to deployment.
* Docker images are published to Azure Container Registry.
* The application is deployed to Azure Kubernetes Service.
* Deployments are tracked in Azure DevOps Environments.
* The FlavorForge application is accessible and functioning correctly.
* The CI/CD implementation is fully operational and ready for continuous development and future releases.

---


# 10. References & Related Documentation

## 10.1 Purpose

This implementation guide focuses on configuring Azure DevOps and reproducing the complete CI/CD setup for the FlavorForge project.

Additional project documentation is available for readers who want a deeper understanding of the pipeline architecture, deployment process, troubleshooting procedures, and operational workflows.

---

# 📖 Related Documentation

The following documents provide additional information about the FlavorForge Azure DevSecOps implementation.

| Document | Description | Link |
|----------|-------------|------|
| `README.md` (Project Root) | Project overview, architecture, and quick start guide | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/README.md |
| `azure-devops-setup-guide.md` | Step-by-step guide to configure Azure DevOps and recreate the CI/CD environment | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/pipeline/azure-devops-setup-guide.md |
| `README.md` (Implementation) | Complete project implementation documentation | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/implementation/README.md |
| `03-pipeline-issues.md` | Azure DevOps pipeline troubleshooting and common issues | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/troubleshooting/03-pipeline-issues.md |
| `README.md` (Kubernetes) | Kubernetes manifests, Kustomize overlays, and deployment structure | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/kubernetes/README.md |
| `README.md` (Argo CD) | Argo CD installation, GitOps configuration, and synchronization | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/argocd/README.md |
| `README.md` (Docker) | Docker containerization and image build process | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docker/README.md |
| `07-CI-CD-Verification.md` | CI/CD verification and validation report | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/project/04-verification-and-validation-report/07-CI-CD-Verification.md |
| `12-GitOps-Verification.md` | GitOps verification and deployment validation report | https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/docs/project/04-verification-and-validation-report/12-GitOps-Verification.md |

For readers who want to recreate the Azure DevOps environment from scratch, begin with **`azure-devops-setup-guide.md`**. After completing the Azure DevOps configuration, continue with **`azure-devops-pipeline.md`** to understand how the multi-stage CI/CD pipeline builds, tests, secures, and deploys the FlavorForge application to Azure Kubernetes Service (AKS) using GitOps with Argo CD.

---

## 10.3 Repository Structure

The Azure DevOps implementation described in this guide primarily uses the following files and directories.

```text
.
├── azure-pipelines.yml
├── argocd/
├── docker/
├── kubernetes/
├── scripts/
└── docs/
    ├── pipeline/
    │   ├── azure-devops-setup.md      ← This document
    │   └── azure-devops-pipeline.md
    ├── troubleshooting/
    ├── cleanup/
    └── implementation/
```

---

## 10.4 Conclusion

Following this guide allows a new developer to recreate the complete Azure DevOps configuration for the FlavorForge Azure DevSecOps Capstone Project, including:

* Azure DevOps Project configuration
* GitHub integration
* Service Connections
* Variable Groups
* Azure DevOps Environments
* Environment approvals
* Multi-stage YAML pipeline
* Azure Container Registry integration
* Azure Kubernetes Service deployment
* CI/CD verification

For detailed explanations of the pipeline implementation, deployment architecture, GitOps workflow, troubleshooting procedures, and operational guidance, refer to the related documentation listed above.


