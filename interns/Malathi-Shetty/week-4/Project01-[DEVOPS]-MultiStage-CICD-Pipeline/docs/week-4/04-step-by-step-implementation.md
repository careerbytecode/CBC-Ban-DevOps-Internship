# 4. Step-by-Step Implementation

## Step 1 – Azure Infrastructure

Azure infrastructure provides the foundational cloud resources required to host the FlavorForge application. This section covers the creation and configuration of the Azure Resource Group, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), and related prerequisites.

---

### 1.1 Create Azure Resource Group

#### Goal

Create a dedicated Azure Resource Group to host all FlavorForge cloud resources.

#### Command

```bash
az group create \
  --name flavorforge-rg \
  --location eastus
```

#### Expected Output

```text
{
  "location": "eastus",
  "name": "flavorforge-rg",
  "properties": {
    "provisioningState": "Succeeded"
  }
}
```

<img width="960" height="402" alt="image" src="https://github.com/user-attachments/assets/8d9dd3ae-e0e9-4ccb-b235-d5f28cddb49f" />

#### Explanation

The Azure Resource Group serves as the logical container for all cloud resources used throughout the project, including Azure Kubernetes Service (AKS), Azure Container Registry (ACR), networking resources, public IP addresses, and load balancers. Creating the resource group first provides a centralized location for deploying, managing, and monitoring all project resources.

The successful creation of the resource group confirms that Azure is ready to provision all required infrastructure components for the project.

#### Evidence

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/9fbe02da-ceb9-40ee-8b13-488182be9be4" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/d05216a1-2d07-474f-aad9-9b4453353b59" />

#### Result

The Azure Resource Group **flavorforge-rg** was successfully created and is ready to host all project resources.

---

### 1.2 Register Azure Container Registry Resource Provider

#### Goal

Register the Azure Container Registry (ACR) resource provider to enable Azure Container Registry services within the Azure subscription.

#### Command

```bash
az provider register \
  --namespace Microsoft.ContainerRegistry

az provider show \
  --namespace Microsoft.ContainerRegistry \
  --query registrationState \
  --output tsv
```

#### Expected Output

```text
Registered
```

#### Explanation

Azure services require their corresponding resource providers to be registered before they can be used. Registering the **Microsoft.ContainerRegistry** provider enables the creation and management of Azure Container Registry resources within the subscription. The registration status is verified before proceeding with ACR creation.

#### Evidence

> Azure CLI showing the `Microsoft.ContainerRegistry` provider registration status as **Registered**.

<img width="792" height="226" alt="image" src="https://github.com/user-attachments/assets/6c26beb8-80aa-4d10-bed7-df49df7c48e0" />

#### Result

The Azure Container Registry resource provider was successfully registered and is available for use.

---

### 1.3 Create Azure Container Registry (ACR)

#### Goal

Create an Azure Container Registry (ACR) to securely store and manage Docker container images used by the FlavorForge application.

#### Command

```bash
az acr create \
  --resource-group flavorforge-rg \
  --name flavorforgeacr2026ms \
  --sku Basic \
  --admin-enabled true
```

#### Expected Output

```text
{
  "name": "flavorforgeacr2026ms",
  "location": "eastus",
  "sku": {
    "name": "Basic"
  },
  "adminUserEnabled": true,
  "provisioningState": "Succeeded"
}
```

#### Explanation

Azure Container Registry (ACR) serves as the private Docker image repository for the project. After the application images are built by the Azure DevOps pipeline, they are pushed to ACR before being deployed to Azure Kubernetes Service (AKS). Enabling the admin user simplifies authentication during development and testing.

#### Evidence

<img width="1562" height="1257" alt="image" src="https://github.com/user-attachments/assets/f4961ebf-4051-4880-a202-ecfa240e4c14" />

#### Result

The Azure Container Registry **flavorforgeacr2026ms** was successfully created and is ready to store and manage Docker container images.

---

### 1.4 Apply Tags to the Azure Resource Group

#### Goal

Apply resource tags to the Azure Resource Group for easier identification, organization, and resource management.

#### Command

```bash
az tag create \
  --resource-id $(az group show \
  --name flavorforge-rg \
  --query id \
  --output tsv) \
  --tags \
  Project=FlavorForge \
  Environment=Dev \
  Owner=Malathi
```

#### Expected Output

```text
{
  "properties": {
    "tags": {
      "Project": "FlavorForge",
      "Environment": "Dev",
      "Owner": "Malathi"
    }
  }
}
```

#### Explanation

Azure resource tags provide metadata that helps organize and manage cloud resources. In this project, tags were applied to identify the project name, deployment environment, and resource owner. Tagging resources is a DevOps best practice that simplifies resource management, governance, reporting, and cost tracking.

#### Evidence

> Azure CLI showing the successful creation of tags for the `flavorforge-rg` Resource Group.

<img width="1320" height="487" alt="image" src="https://github.com/user-attachments/assets/d1bafd7d-58e5-4483-868a-d3319651c187" />

#### Result

The Azure Resource Group was successfully tagged with project metadata, making it easier to organize, manage, and monitor Azure resources.

---

### 1.5 Authenticate with Azure Container Registry (ACR)

#### Goal

Authenticate the local Docker client with Azure Container Registry (ACR) to enable pushing and pulling container images.

#### Command

```bash
az acr login \
  --name flavorforgeacr2026ms
```

#### Expected Output

```text
Login Succeeded
```

#### Explanation

Before Docker images can be pushed to Azure Container Registry, authentication is required. The `az acr login` command securely authenticates the local Docker client with the registry, allowing Azure DevOps and local development environments to store and retrieve container images.

#### Evidence

> Successful authentication with the `flavorforgeacr2026ms` Azure Container Registry.

<img width="937" height="47" alt="image" src="https://github.com/user-attachments/assets/eeda51a6-24d5-452e-89de-f811b9d5d238" />

#### Result

The local Docker client was successfully authenticated with Azure Container Registry and is ready to push and pull container images.

---

### 1.6 Create Azure Kubernetes Service (AKS) Cluster

#### Goal

Provision an Azure Kubernetes Service (AKS) cluster to host the FlavorForge application and provide a managed Kubernetes environment for container orchestration.

#### Command

```bash
az aks create \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --node-count 2 \
  --node-vm-size Standard_D2as_v7 \
  --generate-ssh-keys
```

#### Expected Output

```text
{
  "name": "flavorforge-aks",
  "location": "eastus",
  "kubernetesVersion": "...",
  "provisioningState": "Succeeded",
  "powerState": {
    "code": "Running"
  }
}
```

#### Explanation

Azure Kubernetes Service (AKS) provides a managed Kubernetes environment without requiring manual control plane management. A two-node cluster was created to host the frontend and backend workloads, enabling scalable, highly available application deployments.

#### Evidence

> Successful creation of the `flavorforge-aks` Kubernetes cluster.

<img width="1357" height="1266" alt="image" src="https://github.com/user-attachments/assets/594db48a-78a5-4088-b907-29466915f342" />

#### Result

The Azure Kubernetes Service (AKS) cluster was successfully provisioned and is ready to host the FlavorForge application.

---

### 1.7 Connect the Local Machine to the AKS Cluster

#### Goal

Configure `kubectl` to communicate with the Azure Kubernetes Service (AKS) cluster from the local development machine.

#### Command

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing

kubectl get nodes
```

#### Expected Output

```text
Merged "flavorforge-aks" as current context in /home/<username>/.kube/config

NAME                                STATUS   ROLES    AGE   VERSION
aks-nodepool1-xxxxxxxx-vmss000000   Ready    <none>   xxm   v1.35.6
aks-nodepool1-xxxxxxxx-vmss000001   Ready    <none>   xxm   v1.35.6
```

#### Explanation

The `az aks get-credentials` command downloads the Kubernetes cluster credentials and merges them into the local kubeconfig file. This enables `kubectl` to manage the AKS cluster directly. Running `kubectl get nodes` verifies that the connection is successful and that all worker nodes are in the **Ready** state.

#### Evidence

> Successful connection to the AKS cluster showing all worker nodes in the **Ready** state.

<img width="867" height="250" alt="image" src="https://github.com/user-attachments/assets/53c6581a-4124-4e3d-bb1c-0d415a02b669" />

#### Result

The local machine was successfully connected to the AKS cluster, and `kubectl` is now configured to manage cluster resources.

---

## Step 2 – Docker Containerization

Docker containerization packages the FlavorForge backend and frontend applications into portable, lightweight containers. This ensures a consistent runtime environment across development, testing, and production while preparing the applications for deployment to Azure Kubernetes Service (AKS).

---

### 2.1 Build the Backend Docker Image

#### Goal

Build the Docker image for the FlavorForge backend application using a multi-stage Dockerfile.

#### Command

```bash
docker build \
  -t flavorforge-backend:1.0 \
  ./backend
```

#### Expected Output

```text
...
Successfully built <IMAGE_ID>
Successfully tagged flavorforge-backend:1.0
```

#### Explanation

The backend application is containerized using Docker to provide a consistent runtime environment across development, testing, and production. The generated image is later pushed to Azure Container Registry (ACR), where it becomes available for deployment to Azure Kubernetes Service (AKS).

#### Evidence

> Successful backend Docker image build.

<img width="1106" height="841" alt="image" src="https://github.com/user-attachments/assets/f14938f7-cc95-46f7-9510-c12c1878f1c7" />

#### Result

The backend Docker image was successfully built and is ready for verification before being published to Azure Container Registry.

---

### 2.2 Verify the Backend Docker Container

#### Goal

Verify that the backend Docker container starts successfully and the Node.js application is running correctly inside the container.

#### Command

```bash
docker run -d \
  --name flavorforge-backend \
  -p 3000:3000 \
  flavorforge-backend:1.0

docker ps

curl http://localhost:3000/api/health
```

#### Expected Output

```text
CONTAINER ID   IMAGE                     STATUS
xxxxxxxxxxxx   flavorforge-backend:1.0   Up

{
  "status": "UP",
  "application": "FlavorForge Backend",
  "version": "1.0"
}
```

#### Explanation

After building the Docker image, the backend container is started locally to verify that the application launches successfully. The `docker ps` command confirms that the container is running, while the health endpoint validates that the backend API is accessible before the image is published to Azure Container Registry.

#### Evidence

> Backend Docker container running successfully and responding to the health endpoint.

<img width="1642" height="295" alt="image" src="https://github.com/user-attachments/assets/1df75c9a-4873-4421-9d1f-5e5334ac9e6e" />

<img width="1127" height="312" alt="image" src="https://github.com/user-attachments/assets/1b07f673-3c66-43f8-a669-3fe13b588d60" />

#### Result

The backend container started successfully, and the health endpoint confirmed that the application is functioning correctly.

---

### 2.3 Build the Frontend Docker Image

#### Goal

Build the Docker image for the FlavorForge React frontend using a multi-stage Dockerfile optimized for production deployment.

#### Command

```bash
docker build \
  -t flavorforge-frontend:1.0 \
  ./frontend
```

#### Expected Output

```text
...
Successfully built <IMAGE_ID>
Successfully tagged flavorforge-frontend:1.0
```

#### Explanation

The frontend application is containerized using a multi-stage Docker build. During the build process, the React application is compiled into optimized static assets, which are then served using an NGINX web server. This approach produces a lightweight, production-ready image suitable for deployment to Azure Kubernetes Service (AKS).

#### Evidence

> Successful build of the FlavorForge frontend Docker image.

<img width="1740" height="1112" alt="image" src="https://github.com/user-attachments/assets/93ba8949-dfa3-4991-8775-a5dcac51c10e" />

#### Result

The frontend Docker image was successfully built and is ready to be published to Azure Container Registry.

---

### 2.4 Verify Docker Images

#### Goal

Verify that both backend and frontend Docker images have been successfully created and are available in the local Docker image repository.

#### Command

```bash
docker images
```

#### Expected Output

```text
REPOSITORY               TAG      IMAGE ID       SIZE

flavorforge-backend      1.0      xxxxxxxxx      xxxMB
flavorforge-frontend     1.0      xxxxxxxxx      xxxMB
```

#### Explanation

The `docker images` command lists all locally available Docker images. Verifying both the backend and frontend images confirms that the containerization process completed successfully and that the images are ready to be tagged and pushed to Azure Container Registry.

#### Evidence

> Docker images showing the successfully built backend and frontend container images.

<img width="1685" height="327" alt="image" src="https://github.com/user-attachments/assets/5a6215ca-1a6c-4805-87e4-950c5bfdc0d5" />

#### Result

Both backend and frontend Docker images were successfully created and verified, confirming that they are ready for tagging and publishing to Azure Container Registry.

---



## Step 3 – Azure Container Registry (ACR)

Azure Container Registry (ACR) serves as the centralized private registry for storing Docker images. After the backend and frontend images are built and verified locally, they are tagged and pushed to ACR, making them available for deployment to Azure Kubernetes Service (AKS).

---

### 3.1 Tag Docker Images

#### Goal

Tag the locally built Docker images with the Azure Container Registry (ACR) repository name so they can be pushed to the registry.

#### Command

```bash
docker tag flavorforge-backend:1.0 \
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0

docker tag flavorforge-frontend:1.0 \
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

#### Explanation

Docker images must be tagged with the Azure Container Registry login server before they can be uploaded. This associates each local image with its destination repository inside ACR.

#### Evidence

> Docker images successfully tagged for Azure Container Registry.

<img width="2212" height="467" alt="image" src="https://github.com/user-attachments/assets/85ae5421-f7d4-48d2-bc0b-72e7027d0d08" />

#### Result

The backend and frontend Docker images were successfully tagged and are ready to be pushed to Azure Container Registry.

---

### 3.2 Push Docker Images to Azure Container Registry

#### Goal

Push the tagged backend and frontend Docker images to Azure Container Registry (ACR).

#### Command

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0

docker push flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

#### Explanation

After tagging the Docker images, they are uploaded to Azure Container Registry. These images become the deployment artifacts used by Azure Kubernetes Service (AKS) during application deployment.

#### Evidence

> Successfully pushed backend and frontend Docker images to Azure Container Registry.

<img width="1273" height="1085" alt="image" src="https://github.com/user-attachments/assets/5ae97dc4-cbb0-4b3b-bde9-22db52477c26" />

#### Result

Both Docker images were successfully published to Azure Container Registry and are now available for Kubernetes deployments.

---

### 3.3 Verify Images in Azure Container Registry

#### Goal

Verify that the backend and frontend Docker images have been successfully uploaded to Azure Container Registry.

#### Command

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

#### Explanation

After publishing the Docker images, Azure Container Registry is verified to ensure that both repositories are available. Successful verification confirms that the CI/CD pipeline and Kubernetes cluster can retrieve the required images during deployment.

#### Evidence

> Azure Container Registry showing the uploaded backend and frontend repositories.

<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/95bcd221-ad38-488c-b2c0-dc184a452166" />

#### Result

Azure Container Registry successfully stores the backend and frontend Docker images, making them ready for deployment to Azure Kubernetes Service (AKS).

---

## Step 4 – Azure DevOps

Azure DevOps automates the complete DevSecOps workflow for the FlavorForge application. It provides source code integration, continuous integration, continuous delivery, code quality analysis, security scanning, Docker image publishing, and Kubernetes deployment through a multi-stage YAML pipeline.

---

### 4.1 Create Azure DevOps Project

#### Goal

Create a dedicated Azure DevOps project to manage the FlavorForge source code repository, CI/CD pipelines, service connections, and deployment environments.

#### Procedure

1. Sign in to Azure DevOps.
2. Select **New Project**.
3. Enter the project details:
   - **Project Name:** FlavorForge
   - **Visibility:** Private
   - **Version Control:** Git
   - **Work Item Process:** Agile
4. Click **Create**.

#### Explanation

Azure DevOps Projects provide a centralized platform for source code management, pipeline execution, release management, repositories, and project collaboration. Creating a dedicated project ensures that all DevSecOps resources remain organized under a single workspace.

#### Evidence

Insert your Azure DevOps Project creation screenshot.

<img width="1732" height="936" alt="image" src="https://github.com/user-attachments/assets/5790a19a-9d7b-438f-a423-66ea9277037d" />

#### Result

The Azure DevOps project was successfully created and is ready for CI/CD pipeline configuration.

---

### 4.2 Configure Azure DevOps Service Connections

#### Goal

Configure secure service connections between Azure DevOps and Azure resources so that the CI/CD pipeline can authenticate and deploy applications without storing credentials inside the pipeline.

---

#### Azure Resource Manager Service Connection

This service connection allows Azure DevOps to authenticate with the Azure subscription and manage Azure resources such as Azure Kubernetes Service (AKS).

##### Configuration

- **Connection Type:** Azure Resource Manager
- **Authentication Method:** Workload Identity Federation
- **Subscription:** Azure subscription 1
- **Resource Group:** `flavorforge-rg`
- **Service Connection Name:** `flavorforge-azure-sc`

---

#### Azure Container Registry Service Connection

This service connection enables Azure DevOps to securely push Docker images to Azure Container Registry.

##### Configuration

- **Registry:** `flavorforgeacr2026ms.azurecr.io`
- **Service Connection Name:** `flavorforge-acr-connection`

---

#### Why This Step Is Required

Azure DevOps service connections provide secure authentication between Azure DevOps and Azure resources. Using Workload Identity Federation eliminates the need to store usernames, passwords, or service principal secrets while allowing automated deployments to Azure Kubernetes Service and Azure Container Registry.

#### Evidence



**Figure 4.X.1 – Select Azure Resource Manager service connection**

![Azure Resource Manager](../../screenshots/pipeline/3-azure-resource-manager.png)

**Figure 4.X.2 – Create a new Azure Service Connection**

![New Service Connection](../../screenshots/pipeline/4-new-azure-service-connection.png)

**Figure 4.X.3 – Configure the Azure Resource Manager Service Connection**

![Configure Service Connection](../../screenshots/pipeline/2-service-connection.png)

**Figure 4.X.4 – Verify the configured Service Connections**

![Service Connections](../../screenshots/pipeline/11-service-connections.png)

**Figure 4.X.5 – Verify ACR and AKS Service Connections**

![ACR and AKS Connections](../../screenshots/pipeline/12-acr%20%26%20aks.png)

#### Result

Azure DevOps was successfully configured with secure service connections for Azure Resource Manager and Azure Container Registry. These authenticated connections are used by the CI/CD pipeline to build Docker images, publish them to Azure Container Registry, and deploy the FlavorForge application to Azure Kubernetes Service.

---

### 4.3 Configure Azure DevOps Multi-Stage Pipeline

#### Goal

Create a multi-stage YAML pipeline to automate the complete DevSecOps workflow.

#### Pipeline Definition

The pipeline configuration is stored in the project root.

```text
azure-pipelines.yml
```

The pipeline is connected to the GitHub repository and is automatically triggered whenever changes are pushed to the **main** branch.

#### Pipeline Stages

1. Build
2. Test
3. Code Quality Analysis (SonarCloud)
4. Security Scan (Trivy)
5. Docker Image Build
6. Publish Images to Azure Container Registry
7. Deploy to Development
8. Deploy to QA
9. Deploy to Production
10. Release Summary

#### Why This Step Is Required

A multi-stage CI/CD pipeline automates software delivery by validating code quality, performing security checks, building container images, publishing artifacts, and deploying applications consistently across multiple environments.

#### Evidence



**Figure 4.X.1 – Create a New Azure DevOps Pipeline**

<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/b0ffb4cc-8808-4122-b42f-058a3e560d26" />


---

**Figure 4.X.2 – Azure DevOps Pipeline Running**

<img width="2560" height="1277" alt="image" src="https://github.com/user-attachments/assets/509ab4ac-271d-411b-82d2-486ee677f88c" />


---

**Figure 4.X.3 – Test Stage Execution**

<img width="827" height="1045" alt="image" src="https://github.com/user-attachments/assets/18871075-8019-410c-b314-0fd53eca6ac2" />


---

**Figure 4.X.4 – Successful Pipeline Execution**

<img width="3085" height="1229" alt="image" src="https://github.com/user-attachments/assets/673dc6a7-dcbc-41b5-bb0d-fc8708c8de19" />


---

**Figure 4.X.5 – Advanced Pipeline View**

<img width="4365" height="1229" alt="image" src="https://github.com/user-attachments/assets/38107ba7-a0f0-4adb-8a82-b23b993a1ce8" />


---

**Figure 4.X.6 – Final Multi-Stage Pipeline Execution**

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/1b8d5b46-c6df-468d-ac02-d54e8516cd56" />


#### Result

The Azure DevOps multi-stage pipeline was successfully configured and executed, automating the complete DevSecOps workflow from source code validation to production deployment.

---

### 4.4 Configure Azure DevOps Environments and Approvals

#### Goal

Configure Development, QA, and Production environments with deployment approvals to simulate an enterprise-grade release management process.

#### Environment Configuration

The following deployment environments were created in Azure DevOps:

- Development
- QA
- Production

Each environment represents a separate deployment stage in the CI/CD pipeline.

#### Manual Approval Configuration

Manual approval gates were configured for the QA and Production environments to ensure deployments are validated before progressing to the next stage.

These approval checks simulate the enterprise release approval process followed in real-world DevOps workflows.

#### Variable Groups

Environment-specific Variable Groups were created to manage deployment configuration separately for each environment.

Examples include:

- Development Variables
- QA Variables
- Production Variables

#### Why This Step Is Required

Enterprise CI/CD pipelines require controlled deployments across multiple environments. Environment approvals and variable groups improve deployment security, reduce configuration errors, and ensure production releases are reviewed before deployment.

#### Evidence

Yes. Based on the folder structure you shared, here is the exact mapping. Just insert them in this order.

---

# Step 20 — Configure Azure DevOps Environments

### Evidence

**Azure DevOps Environments**

<img width="2557" height="1222" alt="image" src="https://github.com/user-attachments/assets/2958df0f-6fe4-4dac-991e-1a95b880b11c" />


---

**Development Environment**

<img width="607" height="1191" alt="image" src="https://github.com/user-attachments/assets/55dfe4f7-e914-4084-89e1-6db15859b1ba" />


---

**Development, QA & Production Environments**

<img width="2555" height="695" alt="image" src="https://github.com/user-attachments/assets/d1c58606-f649-4f05-884e-b9611e1a671a" />


---

**Library**

<img width="2557" height="817" alt="image" src="https://github.com/user-attachments/assets/b680c126-6652-4a1c-b314-ba776dae6e85" />


---

**QA Variable Group**

<img width="2557" height="845" alt="image" src="https://github.com/user-attachments/assets/93e4e383-eb02-4ffe-8cd5-508f320c0ec9" />


---

**Production Variable Group**

<img width="2546" height="967" alt="image" src="https://github.com/user-attachments/assets/703c7fce-cc2e-45c7-83b6-3901e4fd76ae" />


---

**Deployment Approvals**



<img width="2552" height="1232" alt="image" src="https://github.com/user-attachments/assets/a87d1f54-4eec-46e9-9127-39d24f41ce1c" />
<img width="2532" height="1092" alt="image" src="https://github.com/user-attachments/assets/a17ddf0b-289c-4e2b-90b9-b3ad4277b40a" />
<img width="2547" height="1207" alt="image" src="https://github.com/user-attachments/assets/69bce860-99fb-4513-a6c2-d97dd4a1b1f5" />
<img width="2536" height="1225" alt="image" src="https://github.com/user-attachments/assets/11298791-6cc5-4029-af82-5b25769b18e6" />


These show the approval configuration for the environments.

---

**QA Permissions**

<img width="2552" height="1100" alt="image" src="https://github.com/user-attachments/assets/b601e5a3-025d-4e53-8427-37cb4960c2fb" />


---

**Production Permissions**

<img width="2557" height="1180" alt="image" src="https://github.com/user-attachments/assets/a2d45410-16ba-4734-acb0-005d8803eef6" />


---

**Production Approval Gate**


<img width="2536" height="1225" alt="image" src="https://github.com/user-attachments/assets/966dc234-62cb-49bd-aac7-d4b04d608bc8" />


<img width="2547" height="1226" alt="image" src="https://github.com/user-attachments/assets/348d1b72-f3ef-45c9-bcc9-2dc0515f7106" />



---



> Azure DevOps environments were configured to support a controlled promotion process across Development, QA, and Production. Variable Groups centralized environment-specific configuration, while approval gates ensured that deployments to higher environments required manual validation before execution. This implementation reflects enterprise CI/CD governance and release management best practices.


---

#### Result

Azure DevOps environments, approval gates, and variable groups were successfully configured. The CI/CD pipeline now supports controlled deployments across Development, QA, and Production environments following enterprise DevOps best practices.

---

### 4.5 Integrate SonarCloud for Code Quality Analysis

#### Goal

Integrate SonarCloud into the Azure DevOps pipeline to automatically analyze source code quality, detect bugs, identify code smells, measure test coverage, and enforce quality gates during every pipeline execution.

#### SonarCloud Configuration

SonarCloud was configured using the Azure DevOps extension and integrated into the CI/CD pipeline.

The analysis includes:

- Static Code Analysis
- Code Smells Detection
- Bug Detection
- Security Hotspots
- Test Coverage Analysis
- Quality Gate Validation

The SonarCloud analysis executes automatically during every pipeline run.

#### Why This Step Is Required

Continuous code quality analysis helps identify issues early in the development lifecycle. Integrating SonarCloud into the CI/CD pipeline improves maintainability, reliability, and overall software quality while preventing poor-quality code from progressing through the deployment pipeline.

#### Evidence

Insert the following screenshots:

# SonarCloud Extension Installed
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/ec5e90c6-7317-405c-92a9-5366a1411ac5" />

# SonarCloud Code Coverage Report
 <img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/5fe1df64-91dd-4ca1-ab6c-bdcc7952cad8" />


#### Result

SonarCloud was successfully integrated into the Azure DevOps pipeline. Every pipeline execution now performs automated static code analysis, evaluates code quality, measures test coverage, and validates quality gates before deployment.


> SonarCloud was integrated into the Azure DevOps pipeline to perform automated static code analysis and quality validation. During every pipeline execution, the application source code is analyzed, and a code coverage report is generated. This ensures that code quality standards are continuously monitored before application deployment, supporting DevSecOps best practices and improving overall software reliability.

---

### 4.6 Build and Publish Docker Images to Azure Container Registry

#### Goal

Build Docker images for the FlavorForge frontend and backend applications and publish them to Azure Container Registry (ACR) for Kubernetes deployments.

#### Docker Build Process

The Azure DevOps pipeline automatically builds container images for:

- FlavorForge Frontend
- FlavorForge Backend

Each build generates a uniquely versioned Docker image.

#### Image Publishing

After a successful build, the pipeline pushes the Docker images to Azure Container Registry.

**Container Registry**

```text
flavorforgeacr2026ms.azurecr.io
```

Published repositories include:

- flavorforge-frontend
- flavorforge-backend

#### Why This Step Is Required

Azure Kubernetes Service pulls application images directly from Azure Container Registry during deployment. Publishing versioned container images ensures consistent, traceable, and repeatable application deployments across all environments.

#### Evidence

Insert the following screenshots:

# Backend Image in Azure Container Registry
<img width="1920" height="1304" alt="image" src="https://github.com/user-attachments/assets/44b85dee-d6b0-4450-ae77-d3a1cda57bee" />

  
# Frontend Image in Azure Container Registry
<img width="1920" height="1304" alt="image" src="https://github.com/user-attachments/assets/c7fa160f-9449-4677-8cae-3e4741966d5e" />

  

#### Result

The Azure DevOps pipeline successfully built Docker images for both the frontend and backend applications and published them to Azure Container Registry. These versioned images are used by Azure Kubernetes Service during automated deployments.

> After successful build and validation, both the backend and frontend Docker images were pushed to Azure Container Registry (ACR). These images serve as the deployment artifacts for Azure Kubernetes Service (AKS), ensuring consistent and version-controlled application deployments across all environments.

---

### 4.7 Deploy the Application to Azure Kubernetes Service (AKS)

#### Goal

Deploy the FlavorForge application to Azure Kubernetes Service (AKS) using Kubernetes manifests and Kustomize overlays for Development, QA, and Production environments.

#### Deployment Process

The Azure DevOps pipeline deploys the application to AKS after successfully completing the build, testing, code quality analysis, security scanning, and image publishing stages.

The deployment includes:

- Backend Deployment
- Frontend Deployment
- Kubernetes Services
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler (HPA)
- Ingress Controller

Kustomize overlays are used to manage environment-specific configurations for Development, QA, and Production.

#### Why This Step Is Required

Azure Kubernetes Service provides a scalable and highly available platform for running containerized applications. Kubernetes automates container scheduling, scaling, rolling updates, and self-healing to ensure reliable application deployment and operation.

#### Evidence



# Development Services
<img width="922" height="87" alt="image" src="https://github.com/user-attachments/assets/aa07afdc-719c-4194-a45a-53f22109c164" />


# Development Kubernetes Resources
<img width="1320" height="662" alt="image" src="https://github.com/user-attachments/assets/ab356cd9-a783-4d8f-8249-3d7331791325" />


# Kubernetes Services
<img width="872" height="270" alt="image" src="https://github.com/user-attachments/assets/f70f8c18-495a-48fa-ab3b-92d4b9452e78" />


# Production Ingress
<img width="902" height="62" alt="image" src="https://github.com/user-attachments/assets/dd169054-21a2-4987-8803-713cce02a1b9" />


# NGINX Ingress Controller
<img width="1095" height="97" alt="image" src="https://github.com/user-attachments/assets/ed6abd19-4d07-4ce6-ab72-9430d87052cd" />


#### Result

The FlavorForge application was successfully deployed to Azure Kubernetes Service. Kubernetes manages the application across Development, QA, and Production environments using Deployments, Services, Ingress, Autoscaling, and environment-specific Kustomize overlays.

> The FlavorForge application was successfully deployed to Azure Kubernetes Service (AKS). Kubernetes Services provided internal networking, while the NGINX Ingress Controller exposed the application externally through a centralized ingress resource. Validation of the Development namespace, Services, and Production Ingress confirms that the application was deployed correctly and is accessible following Kubernetes best practices.

---

## Step 5 – Kubernetes Deployment

Azure Kubernetes Service (AKS) orchestrates the deployment of the FlavorForge application. Kubernetes manages application availability, networking, scaling, and service discovery while ensuring reliable container execution across the cluster.

---

### 5.1 Deploy Kubernetes Manifests

#### Goal

Deploy the FlavorForge application components to Azure Kubernetes Service (AKS) using Kubernetes manifests.

#### Deployment Components

The deployment includes the following Kubernetes resources:

- Backend Deployment
- Frontend Deployment
- Services
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler (HPA)
- NGINX Ingress

#### Command

```bash
kubectl apply -f k8s/
```

> *(Replace with the actual deployment command if you used Kustomize or another deployment method.)*

#### Explanation

Kubernetes manifests define the desired state of the application infrastructure. Applying these manifests creates all required workloads and networking resources inside the AKS cluster.

#### Evidence



<img width="965" height="52" alt="image" src="https://github.com/user-attachments/assets/4c07b94e-ffac-4a06-bb59-336bef34a3b3" />

<img width="927" height="66" alt="image" src="https://github.com/user-attachments/assets/dcc47853-9227-4757-be50-64e5f02362cc" />

<img width="922" height="65" alt="image" src="https://github.com/user-attachments/assets/e553e00f-c9f4-4e6a-8775-a5dcac51c10e" />

<img width="2305" height="1132" alt="image" src="https://github.com/user-attachments/assets/3ca37155-9823-4621-be47-931302528333" />

#### Result

The Kubernetes manifests were successfully deployed to Azure Kubernetes Service.

---

### 5.2 Verify Kubernetes Resources

#### Goal

Verify that all Kubernetes resources have been created successfully and are running as expected.

#### Verification Commands

```bash
kubectl get pods

kubectl get deployments

kubectl get services

kubectl get ingress

kubectl get all
```

#### Explanation

Verification confirms that Kubernetes has successfully created all required workloads and networking resources. Pods should be in the **Running** state, services should be available, and ingress resources should be configured correctly.

#### Evidence



<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/f918778b-8370-45d0-9427-20b68f18b60d" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/830e9206-8eaf-4c36-8a66-7e1f7e76db04" />

<img width="2262" height="991" alt="image" src="https://github.com/user-attachments/assets/ed10ab3d-ce35-4650-8a16-9b46c074b8be" />

<img width="2272" height="845" alt="image" src="https://github.com/user-attachments/assets/a13a7fd4-a2da-45df-8c28-53c553102bf2" />

<img width="2262" height="1157" alt="image" src="https://github.com/user-attachments/assets/b8006d13-42f7-40c3-a8ff-670583e6a736" />

<img width="2236" height="1162" alt="image" src="https://github.com/user-attachments/assets/aaf77a20-b4a5-49ae-b054-a65022b8e956" />

#### Result

All Kubernetes resources were successfully deployed and verified. The application workloads are running correctly within the AKS cluster.

---

### 5.3 Configure NGINX Ingress

#### Goal

Configure an NGINX Ingress Controller to expose the FlavorForge application to external users.

#### Explanation

The NGINX Ingress Controller routes incoming HTTP requests to the appropriate backend and frontend Kubernetes services. It acts as the single entry point into the AKS cluster.

#### Evidence

<img width="1197" height="617" alt="image" src="https://github.com/user-attachments/assets/49f594cd-37e1-472a-910f-62d039a3ba2f" />

#### Result

The NGINX Ingress Controller was successfully configured, enabling external access to the application.

---

### 5.4 Verify the Deployed Application

#### Goal

Verify that the FlavorForge application is accessible through the configured ingress endpoint and functioning correctly.

#### Validation

Verify that:

- Frontend loads successfully.
- Backend APIs respond correctly.
- Application components communicate successfully.
- The application is accessible through the configured ingress.

#### Evidence

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/c6f5e837-7686-4c80-b48f-4b25152ca55f" />

#### Result

The FlavorForge application was successfully deployed and verified. Both frontend and backend components are functioning correctly through Azure Kubernetes Service and NGINX Ingress.

---

## Step 6 – GitOps with Argo CD

GitOps extends the CI/CD pipeline by using Git as the single source of truth for Kubernetes deployments. Argo CD continuously monitors the GitHub repository and automatically synchronizes the desired application state with the Azure Kubernetes Service (AKS) cluster.

---

### 6.1 Configure Argo CD

#### Goal

Configure Argo CD to continuously monitor the GitHub repository and automatically synchronize Kubernetes manifests with the AKS cluster.

#### Configuration

Argo CD was configured with the following settings:

- Repository: FlavorForge GitHub Repository
- Target Cluster: Azure Kubernetes Service (AKS)
- Target Namespace: flavorforge
- Sync Policy: Automatic
- Self-Heal: Enabled
- Prune Resources: Enabled

#### Why This Step Is Required

GitOps improves deployment consistency by ensuring that Git remains the single source of truth. Any approved changes pushed to the repository are automatically detected and synchronized to the Kubernetes cluster without requiring manual intervention.

#### Evidence



# Argo CD Dashboard and Application Details
<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/49bce2e6-2c18-4768-824f-9f5a6c8a9a8f" />

# Sync Status
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/00b085bc-7a8a-46e7-9520-02f880c96518" />

# Repository Configuration
<img width="1530" height="573" alt="image" src="https://github.com/user-attachments/assets/ae1ca2d7-412f-49bc-a2a3-1148273ff93c" />


# Successful Synchronization
<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/8d9907d1-d17b-4441-9925-b2a3f29b88ad" />

#### Result

Argo CD was successfully configured to continuously monitor the GitHub repository and automatically synchronize Kubernetes resources with the AKS cluster.

> Argo CD was configured to implement GitOps-based continuous deployment by monitoring the Git repository for Kubernetes manifest changes. After detecting updates, Argo CD automatically synchronized the desired state with the Azure Kubernetes Service (AKS) cluster. The successful synchronization and healthy application status confirm that GitOps deployment was functioning correctly, ensuring consistent, automated, and declarative application delivery.

---

### 6.2 Verify GitOps Synchronization

#### Goal

Verify that Argo CD successfully synchronizes Kubernetes resources with the GitHub repository.

#### Verification

Confirm the following:

- Application Status: Healthy
- Sync Status: Synced
- Repository Status: Connected
- Kubernetes Resources: Healthy

#### Explanation

A successful synchronization confirms that the deployed Kubernetes resources exactly match the desired configuration stored in GitHub. This demonstrates the GitOps deployment model where Git serves as the authoritative source for infrastructure and application configuration.

#### Evidence


<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/37f9563a-d073-4e2a-9317-dcf5f1216b2a" />

> GitOps deployment verification confirmed that the FlavorForge application reached the desired state in Azure Kubernetes Service (AKS). Argo CD reported the application as Healthy and Synced, while the resource tree verified that all Kubernetes resources—including Deployments, ReplicaSets, Pods, Services, and Ingress—were successfully managed from the Git repository. This demonstrates a fully functional GitOps workflow with automated synchronization and deployment traceability.

#### Result

GitOps synchronization completed successfully. The AKS cluster remains automatically synchronized with the GitHub repository, ensuring consistent and reliable application deployments.

---

## Step 7 – End-to-End Validation

End-to-end validation confirms that every stage of the DevSecOps workflow has completed successfully, from infrastructure provisioning through application deployment.

---

### 7.1 Validate Azure Infrastructure

#### Goal

Verify that all Azure resources required by the FlavorForge application have been successfully provisioned.

#### Validation Checklist

- Azure Resource Group
- Azure Kubernetes Service (AKS)
- Azure Container Registry (ACR)
- Public IP Address
- Load Balancer
- Managed Identity
- Networking Components

#### Evidence

# Azure Resource Group
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/c6faff3f-cd2d-4a35-94fd-2b06bd252c3b" />

# Azure Kubernetes Service (AKS)
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/9aebfbe7-faa8-4e57-865f-54505fa9e4c6" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/e22d6e27-dff6-4828-b17f-73d15ca8d7a0" />

# Azure Container Registry (ACR)
<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/a7ab08c5-db1f-44f1-adc4-445f4c43fe90" />


# Backend Workloads
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/a50eb88b-a224-41da-a553-b0037f96ad0d" />

# Frontend Workloads
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/b4d34b3e-1f46-416e-8297-30cc43383504" />

# Kubernetes Workloads
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/55855db9-419f-4939-95d3-c9c25ab28a65" />

# Azure Load Balancer
<img width="2492" height="962" alt="image" src="https://github.com/user-attachments/assets/01cc5354-1a51-4409-ac61-c7fc830e80f7" />
<img width="957" height="1166" alt="image" src="https://github.com/user-attachments/assets/ccf37d20-9fe0-4329-8bd3-956e0f0f90c9" />


# Public IP Address
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/d6b32dae-2db7-4603-91d8-03adb28a04c3" />


#### Result

All Azure infrastructure resources were successfully provisioned and are operational.

> Azure infrastructure verification confirmed that all required cloud resources—including the Resource Group, Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Load Balancer, Public IP Address, and Kubernetes workloads—were successfully provisioned and operational. The Azure Portal provides a consolidated view of the deployed infrastructure, validating that the FlavorForge application was deployed according to the intended cloud architecture and enterprise deployment design.

---

### 7.2 Validate Azure DevOps Pipeline

#### Goal

Verify that the Azure DevOps multi-stage pipeline completed successfully.

#### Validation Checklist

- Source Code Checkout
- Application Build
- Unit Tests
- SonarCloud Analysis
- Trivy Security Scan
- Docker Image Build
- Push Images to Azure Container Registry
- Deploy to AKS
- Release Summary

#### Evidence


### Final Azure DevOps Pipeline Execution

  ## Final successful pipeline execution

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/63493a42-e1cb-404b-8a0f-c919d3e98d6c" />


 ## Test stage completed
 <img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/8964e931-e2f0-4390-8614-fdd5a8e662e0" />


 ## Development deployment succeeded
 <img width="2560" height="2147" alt="image" src="https://github.com/user-attachments/assets/7c48f46f-319b-4d3f-b188-9d1fd8d3ec31" />




## QA deployment succeeded
<img width="2560" height="1427" alt="image" src="https://github.com/user-attachments/assets/f85e298e-ea62-4bef-81d8-4da6d4c58d49" />

## Production deployment succeeded
<img width="2560" height="1347" alt="image" src="https://github.com/user-attachments/assets/7c0fc7cb-03dd-415a-9d31-c35f21f1a46c" />


---

### ArgoCD verification

<img width="2560" height="2769" alt="image" src="https://github.com/user-attachments/assets/645de261-ea5f-47d3-bd51-4e8355e8a298" />


---

###  Azure Portal verification



<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/c593a6e0-f1eb-4ac6-9298-bc24e562b126" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/bf5b7580-1ba1-48b4-8e01-c084eed2ffab" />
<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/2c85d73b-028e-499f-8c61-a0427928ee7e" />
<img width="2271" height="477" alt="image" src="https://github.com/user-attachments/assets/38c7065f-ccc0-432f-bad4-1fafb61c60e7" />

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/d6282965-b82f-4163-b561-d6972d0d10a3" />
<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/2af97c0d-4db4-47c0-8dce-6dcf16a0956c" />


---

### Kubernetes verification


<img width="1170" height="1182" alt="image" src="https://github.com/user-attachments/assets/2ea86dba-3447-4027-bde4-5608f09a03d5" />
<img width="1107" height="1215" alt="image" src="https://github.com/user-attachments/assets/7f7c2974-2b5b-491d-96f4-f04db07131db" />

<img width="1025" height="467" alt="image" src="https://github.com/user-attachments/assets/887e2418-a408-4180-8b70-d0d1e4cbe089" />

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/7cd238ed-8570-4b07-a021-444fa9812950" />

<img width="622" height="427" alt="image" src="https://github.com/user-attachments/assets/83d0f23f-932f-4107-8b3d-fe13e5439423" />


#### Result

The Azure DevOps pipeline completed successfully, validating the complete CI/CD workflow.

---

### 7.3 Validate Kubernetes Deployment

#### Goal

Verify that all Kubernetes workloads are healthy and running successfully.

#### Validation Commands

```bash
kubectl get pods

kubectl get deployments

kubectl get services

kubectl get ingress
```

#### Expected Outcome

- All Pods: Running
- Deployments: Available
- Services: Active
- Ingress: Configured Successfully

#### Evidence


###  Kubernetes Verification 

1. **Pods Running Successfully**

<img width="933" height="172" alt="image" src="https://github.com/user-attachments/assets/d4d47a31-15d5-4d55-b84a-cede4b9d5424" />


2. **All Kubernetes Resources**

<img width="1025" height="467" alt="image" src="https://github.com/user-attachments/assets/ac4ea0f0-c1e0-4656-ab55-48df0aa62c74" />


<img width="1272" height="977" alt="image" src="https://github.com/user-attachments/assets/e2a2d0ad-b3ec-4254-9d38-e375acd0deff" />


3. **Frontend Running in Browser**

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/7e0ffbef-3311-4e12-957f-cf7e9851c1e6" />




4. **Backend Health Endpoint**

<img width="622" height="427" alt="image" src="https://github.com/user-attachments/assets/86c461c0-b378-4b16-92f5-fca76b835410" />

5. **Ingress Controller Working**

<img width="1197" height="617" alt="image" src="https://github.com/user-attachments/assets/0708ce15-45a4-4f01-aef2-5cecfd01a0c9" />


6. **NGINX Ingress Page**

<img width="2560" height="3392" alt="image" src="https://github.com/user-attachments/assets/7bbe0e0a-6f93-47a6-826f-436bb756c183" />


7. **Rollout History**

<img width="1807" height="376" alt="image" src="https://github.com/user-attachments/assets/71163b7e-06e7-4c50-823b-f07e85bdc2c2" />


8. **Deployment Verification**

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/0606799f-d216-4544-aef5-5fb6918a5d80" />


9. **Azure Kubernetes Center**

<img width="2560" height="1229" alt="image" src="https://github.com/user-attachments/assets/b43de842-cb95-4655-86c2-9f89543285d2" />


10. **Services & Ingress**

<img width="2557" height="1122" alt="image" src="https://github.com/user-attachments/assets/6faa3ddd-608d-4de1-bede-606b5c355b12" />



#### Result

All Kubernetes workloads were successfully deployed and verified within the AKS cluster.

---

### 7.4 Validate the FlavorForge Application

#### Goal

Verify that the deployed FlavorForge application is fully functional.

#### Validation Checklist

- Frontend loads successfully.
- Backend APIs respond correctly.
- Application is accessible through the Ingress endpoint.
- Frontend communicates successfully with the backend.
- User workflows execute successfully.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5bcf8b02-7859-4c16-8097-2a37d646eb20" />


#### Result

The FlavorForge application was successfully deployed and validated. All application components function correctly within the Azure Kubernetes Service environment.

---

# 5. Implementation Summary

This implementation demonstrates the successful deployment of the **FlavorForge** application using a complete Azure DevSecOps workflow.

The solution includes:

- Azure Resource Group provisioning
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Docker containerization
- Azure DevOps multi-stage CI/CD pipeline
- SonarCloud code quality analysis
- Trivy security scanning
- Docker image publishing
- Kubernetes deployments
- GitOps using Argo CD
- End-to-end application validation

Throughout the implementation, industry-standard DevSecOps practices were followed to automate application delivery, improve deployment consistency, enhance security, and ensure application reliability.

The final solution demonstrates an end-to-end cloud-native deployment pipeline where infrastructure provisioning, application containerization, continuous integration, continuous delivery, Kubernetes orchestration, and GitOps work together to deliver a scalable, secure, and production-ready application on Microsoft Azure.
