# STEP 01 — Verify Development Prerequisites

## Goal

Verify that the required tools are installed and available before starting the FlavorForge implementation.

The development environment requires Git, Docker, Node.js, npm, kubectl, and Azure CLI.

## Commands Used

```bash
git --version
docker --version
node --version
npm --version
kubectl version --client
az version
```

## Supporting Files

* `docs/week-4/02-prerequisites-and-setup.md`
* `docs/week-4/BUILD-JOURNEY/01-prerequisites/`
* `scripts/setup.sh`
* `scripts/verify.sh`

Note: No application YAML or Dockerfile is required for this prerequisite verification step.

## Expected Output

The commands confirm that Git, Docker, Node.js, npm, kubectl, and Azure CLI are installed and available in the development environment.

## Real Output

The actual prerequisite verification output is captured in the project evidence.

![Prerequisites Verification](/screenshots/build-journey/01-pre-requisite/01-prerequisites-verification.png)

## Evidence

The screenshot above provides evidence that the development prerequisites were checked before proceeding with the project implementation.

## Verification Result

**Prerequisites verified successfully.**


---


# STEP 02 — Verify GitHub Repository

## Goal

Verify that the FlavorForge project is maintained in Git and connected to the GitHub remote repository.

This establishes GitHub as the source-control repository for the project.

## Commands Used

```bash
git remote -v
git status
git branch --show-current
```

## Supporting Files

* Git repository
* `README.md`
* `project-tree.txt`
* `docs/week-4/BUILD-JOURNEY/02-github/`
* `videos/BUILD-JOURNEY/02-git-PAT.mp4`
* `videos/BUILD-JOURNEY/02-git-verification.mp4`

## Expected Output

The commands should confirm:

* The project is a Git repository.
* A GitHub remote named `origin` is configured.
* The current branch is displayed.
* The repository working-tree status is displayed.



### Real Output

```text
origin  https://github.com/bymalathi/flavorforge-azure-devsecops-capstone.git
```

The local FlavorForge repository was verified with its GitHub `origin` remote, current branch, and working-tree status.






## Evidence — GitHub Repository

![GitHub Repository](/screenshots/build-journey/02-github/01-github-repository.png)

## Evidence — GitHub Repository Created

![GitHub Repository Created](/screenshots/build-journey/02-github/01-github-repository-created.png)

## Evidence — Git PAT

![Git PAT](/screenshots/build-journey/02-github/02-PAT.png)

## Evidence — Local Repository Remote

![Local Repository Remote](/screenshots/build-journey/02-github/github-local-repository-remote.png)

## What This Evidence Proves

The screenshots and Git verification confirm that:

1. The FlavorForge project was created as a Git repository.
2. The repository is hosted on GitHub.
3. The local project is connected to the GitHub remote.
4. Git authentication was configured for repository access.

### Verification Result

**GitHub repository and local Git configuration verified successfully.**

---


# STEP 03 — Set Up the FlavorForge Application

## Goal

Build the FlavorForge frontend and backend application components and establish the application structure before containerization.

## Supporting Files

### Backend

```text
backend/
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
└── tests/
```

Important backend components include:

```text
backend/src/app.js
backend/src/server.js
backend/src/routes/health.routes.js
backend/src/routes/recipe.routes.js
backend/src/controllers/health.controller.js
backend/src/controllers/recipe.controller.js
backend/src/services/health.service.js
backend/src/services/recipe.service.js
```

### Frontend

```text
frontend/
├── package.json
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── api/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── test/
│   └── utils/
└── vite.config.js
```

## Commands Used

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Expected Output

The backend and frontend dependencies are installed successfully, and the FlavorForge application source structure is available for local execution.

## Real Output

The FlavorForge backend and frontend source code were created and organized as separate application components.

The backend contains the API, routes, controllers, services, configuration, and tests.

The frontend contains the React application, reusable components, pages, API services, layouts, styling, and tests.

## Evidence — Backend Structure

![Backend Folder Structure](/screenshots/backend/01-backend-folder-structure.png)

## Evidence — Frontend Application

![React Application Running](/screenshots/frontend/03-react-application-running.png)

## Evidence — Frontend Structure

![Frontend Enterprise Structure](/screenshots/frontend/04-frontend-enterprise-structure.png)

## Evidence — Backend Architecture

![Layered Backend Architecture](/screenshots/backend/05-layered-backend-architecture.png)

## Verification Result

**FlavorForge frontend and backend application structure verified successfully.**











---


# STEP 04 — Verify FlavorForge Application Locally

## Goal

Verify that the FlavorForge application works locally before containerization and cloud deployment.

The verification covers:

* Backend server
* Backend health API
* Backend recipe API
* Frontend application
* Frontend-to-backend communication

---

## 4.1 — Backend Application Verification

### Goal

Start the backend application and verify that the backend API is responding correctly.

### Supporting Files

```text
backend/
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── config/
└── tests/
```

Important backend files:

```text
backend/src/server.js
backend/src/app.js
backend/src/routes/health.routes.js
backend/src/controllers/health.controller.js
backend/src/services/health.service.js
backend/src/routes/recipe.routes.js
```

### Command Used

The backend was started using the project's Node.js configuration.

The health endpoint was then verified.

```bash
curl http://localhost:3000/api/health
```

> **Important:** Replace `3000` with `<backend-port>` with the actual port used in your project documentation/terminal output. 

### Expected Output

The health endpoint should return a successful health response from the backend.

### Real Output

Use the actual output from your terminal verification here.

```text
curl http://localhost:3000/api/health
{"status":"UP","application":"FlavorForge Backend","version":"1.0.0","timestamp":"2026-08-15T08:38:35.833Z"}
```

### Evidence — Backend Folder Structure

![Backend Folder Structure](/screenshots/backend/01-backend-folder-structure.png)

### Evidence — Backend Health Endpoint

![Backend Health Endpoint](/screenshots/backend/02-backend-health-endpoint.png)

### Evidence — Backend Server Running

![Backend Server Running](/screenshots/backend/03-backend-server-running.png)

### Evidence — Health Endpoint in Browser

![Health Endpoint Browser](/screenshots/backend/04-health-endpoint-browser.png)

### Evidence — Recipes API

![Recipes API Structure](/screenshots/backend/11-recipes-api-structure.png)

![Recipes API Working](/screenshots/backend/12-recipes-api-working.png)

### Verification Result

**Backend application and API verified successfully.**

---

# 4.2 — Frontend Application Verification

## Goal

Verify that the FlavorForge React frontend starts successfully and provides the application user interface.

### Supporting Files

```text
frontend/
├── package.json
├── src/
│   ├── App.jsx
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── main.jsx
├── public/
└── vite.config.js
```

Important frontend files include:

```text
frontend/src/App.jsx
frontend/src/api/apiClient.js
frontend/src/services/healthService.js
frontend/src/services/recipeService.js
frontend/src/pages/HomePage.jsx
frontend/src/pages/RecipesPage.jsx
```

### Command Used

The frontend was started using the project's npm configuration.

The application was then opened in the browser.

### Expected Output

The FlavorForge frontend should load successfully and display the application interface.

### Real Output

The actual application result is captured in the screenshots below.

### Evidence — React Application Running

![React Application Running](/screenshots/frontend/03-react-application-running.png)

### Evidence — Initial FlavorForge Home Page

![FlavorForge Initial Home Page](/screenshots/frontend/06-flavorforge-initial-home-page.png)

### Evidence — Frontend and Backend Integration

![Frontend Backend Build Success](/screenshots/frontend/30-frontend-backend-build-success.png)

### Evidence — Recipe Search

![Recipe Search Working](/screenshots/frontend/23-recipe-search-working.png)

### Evidence — Category Filtering

![Category Filtering Working](/screenshots/frontend/25-category-filtering-working.png)

---

# 4.3 — Application Build Verification

## Goal

Verify that the frontend application can be built successfully.

### Supporting Files

```text
frontend/package.json
frontend/vite.config.js
frontend/src/
```

### Expected Output

The frontend build should complete successfully and generate the production build output.

### Evidence — Build Success

![Frontend Build Success](/screenshots/frontend/32-build-success.png)

### Evidence — Generated dist Folder

![Frontend dist Folder](/screenshots/frontend/31-dist-folder.png)

---

# 4.4 — Local Application Verification Summary

The local application verification established the following:

| Component          | Verification                     | Evidence                   |
| ------------------ | -------------------------------- | -------------------------- |
| Backend            | Server starts                    | Backend server screenshot  |
| Backend Health API | Health endpoint responds         | Health endpoint screenshot |
| Recipes API        | Recipe API works                 | Recipes API screenshot     |
| Frontend           | React application loads          | Frontend screenshot        |
| Frontend/Backend   | Application integration verified | Integration screenshot     |
| Frontend Build     | Production build succeeds        | Build screenshot           |

## Evidence Chain

```text
Backend Source Code
        ↓
Backend Server
        ↓
Health API
        ↓
Recipes API
        ↓
Frontend Application
        ↓
Frontend ↔ Backend Integration
        ↓
Production Build
```

## Verification Result

**Local FlavorForge application verified successfully before containerization.**

---

# STEP 05 — Build the Backend Docker Image

## Goal

Create a Docker image for the FlavorForge backend application using the backend Dockerfile.

This step packages the backend application and its dependencies into a portable container image that can later be pushed to Azure Container Registry (ACR) and deployed to Kubernetes.

---

## Command Used

The backend Docker image was built from the `backend/` directory using the project's Dockerfile.

```bash
docker build -t flavorforge-backend:1.0 ./backend
```

### Supporting Dockerfile

```text
backend/Dockerfile
```

### Supporting Application Files

```text
backend/
├── Dockerfile
├── package.json
├── package-lock.json
├── src/
└── tests/
```

The Docker build uses the backend application source and Node.js dependency configuration to create the container image.

---

## Expected Output

A successful Docker build should finish without build errors and create the requested backend image.

The final build output should indicate that the image was successfully tagged.

The Docker build completes successfully and creates the `flavorforge-backend:1.0` image.

---

## Real Output

The backend Docker image build completed successfully.

![Backend Docker Build Success](/screenshots/docker/6-backend-build-success.png)

---

## Verify Docker Image

### Command Used

```bash
docker images
```

### Goal

Confirm that the backend image created during the Docker build is available in the local Docker image repository.

### Expected Result

The FlavorForge backend image should appear in the Docker image list.

### Evidence

![Docker Images](/screenshots/docker/4-docker-images.png)

---

## Backend Container Verification

After creating the image, the backend container was run to verify that the image could be used successfully.

### Evidence — Backend Container Running

![Backend Container Running](/screenshots/docker/7-backend-container-running.png)

### Evidence — Backend Health Check

![Backend Health Success](/screenshots/docker/8-backend-health-success.png)

### Evidence — Backend Recipes API

![Backend Recipes API](/screenshots/docker/9-backend-recipes-success.png)

---

## Supporting Project Files

| File                        | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `backend/Dockerfile`        | Defines how the backend container image is built |
| `backend/package.json`      | Defines backend dependencies and scripts         |
| `backend/package-lock.json` | Locks Node.js dependency versions                |
| `backend/src/`              | Backend application source                       |
| `backend/tests/`            | Backend automated tests                          |
| `docker/README.md`          | Docker-related project documentation             |
| `docker-compose.yml`        | Local multi-container application configuration  |

---

## Evidence Chain

```text
Backend Source Code
        ↓
backend/Dockerfile
        ↓
docker build
        ↓
Backend Docker Image
        ↓
Docker Container
        ↓
Health Check
        ↓
Recipes API Verification
```

---

## What This Step Proves

This step demonstrates that the FlavorForge backend:

* Has a dedicated Dockerfile.
* Can be packaged into a Docker image.
* Produces a usable container image.
* Can run as a container.
* Responds successfully to its health endpoint.
* Provides the expected recipe API functionality.

---

## Verification Result

**Backend Docker image built and container execution verified successfully.**

---


# STEP 06 — Build the Frontend Docker Image

## Goal

Create a Docker image for the FlavorForge frontend application using the frontend Dockerfile.

The containerized frontend will later be used as part of the complete FlavorForge deployment.

---

## Command Used

The frontend image was built from the repository using the frontend Dockerfile:

```bash
docker build -t flavorforge-frontend:1.0 ./frontend
```

### Supporting Dockerfile

```text
frontend/Dockerfile
```

### Supporting Application Files

```text
frontend/
├── Dockerfile
├── package.json
├── package-lock.json
├── nginx.conf.template
├── src/
├── public/
└── vite.config.js
```

---

## Expected Output

The Docker build completes successfully and creates the `flavorforge-frontend:1.0` image.

---

## Real Output / Build Evidence

![Docker Build Success](/screenshots/docker/1-docker-build-success.png)

The screenshot provides evidence that the frontend Docker image was built successfully.

---

## Verify Docker Image

### Command Used

```bash
docker images
```

### Goal

Confirm that the newly created frontend Docker image is available locally.

### Evidence

![Docker Images](/screenshots/docker/4-docker-images.png)

The Docker image list provides evidence that the FlavorForge container images were created successfully.

---

## Run the Frontend Container

### Goal

Verify that the frontend Docker image can be started as a running container.

### Evidence

![Frontend Backend Containers Running](/screenshots/docker/10-frontend-backend-container-running.png)

This confirms that the containerized frontend can run together with the backend container.

---

## Verify the Containerized Frontend

The running application was accessed through the browser to verify that the containerized application was serving the FlavorForge frontend.

### Evidence — FlavorForge Frontend

![FlavorForge Frontend](/screenshots/docker/11-flavorforge-frontend-v2.png)

### Additional Frontend Evidence

![FlavorForge Frontend](/screenshots/docker/11-flavorforge-frontend-v4.png)

---

## Verify Docker Build and Application

Additional evidence from the Docker workflow:

![Terminal Build Success](/screenshots/docker/13-4-terminal-build-success.png)

![FlavorForge Website](/screenshots/docker/13-5-website.png)

![Docker Logs](/screenshots/docker/13-6-docker-logs.png)

---

## Supporting Project Files

| File                           | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| `frontend/Dockerfile`          | Defines the frontend container image       |
| `frontend/package.json`        | Defines frontend dependencies and scripts  |
| `frontend/package-lock.json`   | Locks frontend dependency versions         |
| `frontend/nginx.conf.template` | Provides frontend web-server configuration |
| `frontend/src/`                | React application source                   |
| `frontend/public/`             | Public frontend assets                     |
| `docker-compose.yml`           | Supports local multi-container execution   |

---

## Evidence Chain

```text
Frontend Source Code
        ↓
frontend/Dockerfile
        ↓
docker build
        ↓
Frontend Docker Image
        ↓
Frontend Container
        ↓
Browser Verification
        ↓
FlavorForge Application
```

---

## What This Step Proves

This step demonstrates that the FlavorForge frontend:

* Has a dedicated Dockerfile.
* Can be packaged into a Docker image.
* Produces a usable container image.
* Can run as a container.
* Can serve the FlavorForge frontend application.
* Can operate together with the backend container.

---

## Verification Result

**Frontend Docker image built and container execution verified successfully.**

---

# STEP 07 — Verify the Complete Dockerized Application

## Goal

Verify that the FlavorForge frontend and backend can run together as a containerized application.

This step moves from verifying individual images to verifying the complete local container environment.

## Supporting Files

```text
docker-compose.yml
frontend/Dockerfile
backend/Dockerfile
docker/README.md
```

## Commands Used

### Start the application

```bash
docker compose up
```

### Verify running containers

```bash
docker ps
```

### Verify Docker images

```bash
docker images
```

### Inspect the application network

```bash
docker network inspect flavorforge-network
```



---

## Expected Output

The expected result is:

```text
Frontend container
        +
Backend container
        +
Docker network
        ↓
Running FlavorForge application
```

Both application containers should be running and communicating through the Docker network.

The frontend and backend containers run together and communicate through the `flavorforge-network` Docker network.

The Dockerized FlavorForge application is available through the running frontend and backend containers.

---

## Evidence — Docker Compose

![Docker Compose Running](/screenshots/docker/13-docker-compose-running.png)

## Evidence — Running Containers

![Docker PS](/screenshots/docker/12-1-docker-ps.png)

## Evidence — Docker Network

![Docker Network](/screenshots/docker/12-docker-network-inspect-flavorforge-network.png)

## Evidence — Frontend and Backend Containers

![Frontend Backend Containers](/screenshots/docker/10-frontend-backend-container-running.png)

## Evidence — Application

![FlavorForge Website](/screenshots/docker/13-5-website.png)

## Evidence — Docker Logs

![Docker Logs](/screenshots/docker/13-6-docker-logs.png)

---

## Verification Result

The complete local Docker environment was verified through:

* Docker images
* Running containers
* Docker Compose
* Docker network
* Backend API
* Frontend application

### Final Status

**Dockerized FlavorForge application verified successfully.**

---

## Docker Phase Complete

```text
STEP 05
Backend Docker Image
        ↓
STEP 06
Frontend Docker Image
        ↓
STEP 07
Docker Compose
        ↓
Frontend + Backend Containers
        ↓
Docker Network
        ↓
Working FlavorForge Application
```

---

# STEP 08 — Authenticate with Azure CLI

## Goal

Authenticate the local development environment with Azure so that Azure resources can be created and managed using Azure CLI.

---

## Command Used

```bash
az login
```

To verify the active Azure account/subscription:

```bash
az account show
```

---

## Supporting Files

* `docs/week-4/BUILD-JOURNEY/05-azure/`
* `scripts/azure-manager.sh`
* `docs/week-4/02-prerequisites-and-setup.md`

---

## Expected Output

`az login` authenticates the development environment with Azure and provides access to the available Azure subscriptions.

`az account show` displays information about the active Azure subscription.

---

## Real Output / Evidence

![Azure CLI Authenticated](/screenshots/azure/01-azure-cli-authenticated.png)

### Azure CLI Version Evidence

![Azure CLI Version](/screenshots/azure/29-azure-version.png)

---

## What This Evidence Proves

The evidence confirms that:

* Azure CLI was available in the development environment.
* Azure authentication was completed.
* The environment was ready to manage Azure resources.

---

## Verification Result

**Azure CLI authentication verified successfully.**

---

# STEP 09 — Create the Azure Resource Group

## Goal

Create the Azure Resource Group that contains the FlavorForge cloud resources.

The Resource Group provides the logical management boundary for the Azure resources used by the project.

---

## Command Used

The Resource Group was created using Azure CLI.

The exact command used should be retained from the actual BUILD-JOURNEY evidence.

Typical form:

```bash
az group create \
  --name flavorforge-rg \
  --location eastus
```

> Your confirmed Week 4 resource group is **`flavorforge-rg`** and its region is **East US**.

---

## Supporting Files

* `scripts/azure-manager.sh`
* `docs/week-4/BUILD-JOURNEY/05-azure/`
* Azure Resource Group configuration

---

## Expected Output

Azure CLI should return a successful Resource Group creation response containing:

* Resource Group name
* Location
* Provisioning state

The important successful state is:

```text
provisioningState: Succeeded
```

The Azure CLI operation creates the `flavorforge-rg` Resource Group with the East US location and a successful provisioning state.

---

## Real Output / Evidence

![Resource Group Created](/screenshots/azure/02-resource-group-created.png)

### Azure Resource Group

![FlavorForge Resource Group](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

---

## What This Evidence Proves

The screenshots demonstrate that:

* `flavorforge-rg` was created.
* The resource group is available in Azure.
* It is being used as the management boundary for the FlavorForge Azure resources.

---

## Verification Result

**Azure Resource Group `flavorforge-rg` created and verified successfully.**

---

# STEP 10 — Register the Azure Container Registry Resource Provider

## Goal

Ensure that the Azure subscription has the **Container Registry resource provider** registered before creating the Azure Container Registry.

---

## Command Used

The Container Registry provider was registered using Azure CLI.

Typical command:

```bash
az provider register --namespace Microsoft.ContainerRegistry
```

The registration status can be checked using:

```bash
az provider show \
  --namespace Microsoft.ContainerRegistry \
  --query registrationState
```

---

## Supporting Files

* `scripts/azure-manager.sh`
* `docs/week-4/BUILD-JOURNEY/05-azure/`

---

## Expected Output

The Microsoft.ContainerRegistry resource provider reaches the following registration state:


```text
Registered
```

---

## Real Output / Evidence

![Container Registry Provider Registered](/screenshots/azure/03-containerregistry-provider-registered.png)

---

## What This Evidence Proves

The screenshot provides evidence that the Azure Container Registry provider was registered and available for use.

This was completed before creating the ACR resource.

---

## Verification Result

**Microsoft.ContainerRegistry provider registration verified successfully.**

---

# STEP 11 — Create Azure Container Registry

## Goal

Create an Azure Container Registry (ACR) to store the Docker images produced during the FlavorForge build process.

### Confirmed Project Configuration

| Property       | Value                             |
| -------------- | --------------------------------- |
| Resource Group | `flavorforge-rg`                  |
| Registry       | `flavorforgeacr2026ms`            |
| Region         | East US                           |
| SKU            | Basic                             |
| Login Server   | `flavorforgeacr2026ms.azurecr.io` |

---

## Command Used

The ACR was created using Azure CLI.

Typical command:

```bash
az acr create \
  --resource-group flavorforge-rg \
  --name flavorforgeacr2026ms \
  --sku Basic \
  --location eastus
```

---

## Supporting Files

* `scripts/azure-manager.sh`
* `docs/week-4/BUILD-JOURNEY/05-azure/`
* Docker images produced in Steps 05 and 06

---

## Expected Output

The ACR creation should complete successfully.

The registry should be available under:

```text
flavorforgeacr2026ms.azurecr.io
```

---

## Real Output / Evidence

![ACR Created](/screenshots/azure/04-acr-created.png)

---

## Verify ACR Login Server

The registry can be inspected using Azure CLI:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer
```

Expected project value:

```text
flavorforgeacr2026ms.azurecr.io
```

---

## What This Evidence Proves

The ACR evidence confirms that FlavorForge has a dedicated Azure Container Registry for storing container images before Kubernetes deployment.

The architecture at this stage is:

```text
Local Docker Images
        ↓
Azure Container Registry
flavorforgeacr2026ms.azurecr.io
        ↓
AKS Deployment
```

---

## Verification Result

**Azure Container Registry `flavorforgeacr2026ms` created successfully.**

---

# Azure Phase — Chain

```text
STEP 08
Azure CLI Authentication
        ↓
STEP 09
flavorforge-rg
        ↓
STEP 10
Container Registry Provider
        ↓
STEP 11
flavorforgeacr2026ms
```

---

# STEP 12 — Tag Docker Images for Azure Container Registry

## Goal

Tag the locally built FlavorForge Docker images with the Azure Container Registry login server so that they can be pushed to ACR.

The two application images are:

* Backend
* Frontend

The confirmed ACR login server is:

```text
flavorforgeacr2026ms.azurecr.io
```

---

## Command Used

The local Docker images were tagged for ACR.

Typical commands:

```bash
docker tag flavorforge-backend:1.0 \
  flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

```bash
docker tag flavorforge-frontend:1.0 \
  flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

> Keep the exact tag commands from your actual terminal history if they differ.

---

## Supporting Files

* `backend/Dockerfile`
* `frontend/Dockerfile`
* `docker-compose.yml`
* `scripts/azure-manager.sh`

Azure resource:

```text
ACR: flavorforgeacr2026ms
Login Server: flavorforgeacr2026ms.azurecr.io
```

---

## Expected Output

The ACR-qualified images should appear in the local Docker image list.

Expected naming format:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

---

## Evidence — ACR Tag/Create

![ACR Tag Create](/screenshots/azure/05-tag-create.png)

## Evidence — Tagged Docker Images

![Tag Images and Verify](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

---

## What This Evidence Proves

The screenshots demonstrate that the locally created FlavorForge images were prepared for publication to the Azure Container Registry.

---

## Verification Result

**FlavorForge Docker images tagged for ACR successfully.**

---

# STEP 13 — Authenticate Docker with Azure Container Registry

## Goal

Authenticate Docker with the FlavorForge Azure Container Registry so that Docker can push the container images to ACR.

---

## Command Used

```bash
az acr login --name flavorforgeacr2026ms
```

---

## Expected Output

A successful login should return a confirmation similar to:

```text
Login Succeeded
```

---

## Real Output / Evidence

![ACR Login Success](/screenshots/azure/06-az-acr-login-success.png)

---

## What This Evidence Proves

The evidence confirms that the local Docker client successfully authenticated with:

```text
flavorforgeacr2026ms.azurecr.io
```

This establishes the authentication required for pushing the container images.

---

## Verification Result

**Docker successfully authenticated with Azure Container Registry.**

---

# STEP 14 — Verify FlavorForge Images in Azure Container Registry

## Goal

Publish the FlavorForge Docker images to ACR and verify that the images are available in the registry.

---

## Command Used

The tagged images are pushed to ACR.

Typical commands:

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

The repositories can then be verified with Azure CLI:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

---

## Supporting Files

* `backend/Dockerfile`
* `frontend/Dockerfile`
* Docker images created in Steps 05 and 06
* Azure Container Registry `flavorforgeacr2026ms`

---

## Expected Output

The ACR should contain the FlavorForge application repositories.

Expected repositories:

```text
flavorforge-backend
flavorforge-frontend
```

The images should be available with their corresponding tags.

---

## Evidence — Images in ACR

![Verify Images in ACR](/screenshots/azure/09-verify-images-in-acr.png)

---

## Additional ACR Evidence

![ACR Images](/screenshots/azure/25-acr-images.png)

---

## What This Evidence Proves

The evidence establishes the container image flow:

```text
Local Docker Build
       ↓
Docker Tag
       ↓
ACR Authentication
       ↓
Docker Push
       ↓
Azure Container Registry
       ↓
FlavorForge Backend + Frontend Images
```

The images are now available in Azure for deployment to AKS.

---

## Verification Result

**FlavorForge container images successfully published and verified in ACR.**

---

# STEP 15 — Create Azure Kubernetes Service Cluster

## Goal

Create the Azure Kubernetes Service (AKS) cluster that will host the containerized FlavorForge application.

### Confirmed Project Configuration

| Property       | Value              |
| -------------- | ------------------ |
| Resource Group | `flavorforge-rg`   |
| AKS Cluster    | `flavorforge-aks`  |
| Region         | East US            |
| Node Count     | 2                  |
| Node Size      | `Standard_D2as_v7` |

> These are the confirmed **Week 4 FlavorForge** Azure values. They are separate from the Week 3 VM lab.

---

## Command Used

The AKS cluster was created using Azure CLI.

The exact command should match the command captured in your BUILD-JOURNEY evidence.

Typical form:

```bash
az aks create \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --location eastus \
  --node-count 2 \
  --node-vm-size Standard_D2as_v7
```

---

## Expected Output

Azure should successfully provision the AKS cluster.

The cluster should become available for Kubernetes administration.

---

## Evidence — AKS Creation

![AKS Create](/screenshots/azure/10-az-aks-create.png)

---

## Evidence — AKS Cluster Running

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

---

## Evidence — Azure AKS

![AKS Start](/screenshots/azure/26-aks-start.png)

---

## What This Evidence Proves

The screenshots provide evidence that the FlavorForge AKS cluster was created and became operational.

The deployment architecture now includes:

```text
Azure Container Registry
        │
        │ Container Images
        ▼
   flavorforge-aks
        │
        ├── Backend
        └── Frontend
```

---

## Verification Result

**AKS cluster `flavorforge-aks` created and verified successfully.**

---

# STEP 16 — Connect Local kubectl to AKS

## Goal

Configure the local Kubernetes client (`kubectl`) to communicate with the FlavorForge AKS cluster.

This allows Kubernetes resources to be inspected and deployed from the local environment.

---

## Command Used

Typical command:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

The Kubernetes nodes can then be verified:

```bash
kubectl get nodes
```

---

## Expected Output

The AKS worker nodes should be returned by Kubernetes.

The project configuration uses **2 AKS nodes**.

---

## Real Output / Evidence

![Connect Local Machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)

### Node Verification

![kubectl Get Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

---

## What This Evidence Proves

The evidence demonstrates that:

1. AKS credentials were obtained.
2. The local Kubernetes client was connected to the AKS cluster.
3. Kubernetes nodes could be queried successfully.
4. The cluster was ready for application deployment.

---

# Azure + AKS Evidence Chain

```text
STEP 12
Tag Docker Images
        ↓
STEP 13
ACR Login
        ↓
STEP 14
Images Available in ACR
        ↓
STEP 15
Create AKS
        ↓
STEP 16
Connect kubectl
        ↓
AKS Ready for Kubernetes Deployment
```

## Current Architecture

```text
                    Azure
                      │
          ┌───────────┴───────────┐
          │                       │
   Azure Container          Azure Kubernetes
      Registry                  Service
          │                       │
          │                       │
 Backend Image ────────────────► Backend
 Frontend Image ───────────────► Frontend
```

---

# **Azure infrastructure into Kubernetes deployment**.

# STEP 17 — Create the Kubernetes Namespace

## Goal

Create a dedicated Kubernetes namespace for the FlavorForge application.

Using a namespace keeps the application's Kubernetes resources logically grouped and separated from other workloads in the AKS cluster.

---

## Command Used

The project defines the namespace in:

```text
kubernetes/base/namespace.yaml
```

The namespace can be created using:

```bash
kubectl apply -f kubernetes/base/namespace.yaml
```

Verify it with:

```bash
kubectl get namespaces
```

---

## Supporting Files

```text
kubernetes/
└── base/
    ├── namespace.yaml
    └── kustomization.yaml
```

---

## Expected Output

The FlavorForge namespace should be created successfully and appear in the namespace list.

---

## Evidence

![Create Namespace](/screenshots/kubernetes/deploy-flavorforge-to-aks/1-create-namespace.png)

---

## What This Evidence Proves

The evidence confirms that a dedicated Kubernetes namespace was created for the FlavorForge workloads.

---

## Verification Result

**FlavorForge Kubernetes namespace created successfully.**

---

# STEP 18 — Deploy the Backend to AKS

## Goal

Deploy the FlavorForge backend application to the AKS cluster.

The backend deployment defines the Kubernetes workload that runs the backend container image.

---

## Supporting Files

```text
kubernetes/base/backend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

Additional configuration:

```text
kubernetes/base/config/
├── backend-configmap.yaml
└── secret-template.yaml
```

---

## Command Used

The backend deployment can be applied using the Kubernetes manifest:

```bash
kubectl apply -f kubernetes/base/backend/deployment.yaml
```

The backend service is then created using:

```bash
kubectl apply -f kubernetes/base/backend/service.yaml
```

---

## Expected Output

Kubernetes should create the backend deployment and its associated pods.

Verification:

```bash
kubectl get deployments -n flavorforge
kubectl get pods -n flavorforge
```

---

## Evidence — Backend Deployment

![Backend Deployment](/screenshots/kubernetes/deploy-flavorforge-to-aks/2-deploy-backend.png)

### Backend Deployment Configuration

![Backend Deployment YAML](/screenshots/kubernetes/base-backend-deployment-yaml.png)

### Backend Service Configuration

![Backend Service YAML](/screenshots/kubernetes/base-backend-service-yaml.png)

### Backend Running

![Backend in Browser](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

---

## What This Evidence Proves

The evidence demonstrates that:

* The backend Kubernetes deployment was applied.
* Kubernetes created the backend workload.
* The backend service was configured.
* The deployed backend API could be reached successfully.

---

## Verification Result

**Backend successfully deployed to AKS.**

---

# STEP 19 — Deploy the Frontend to AKS

## Goal

Deploy the FlavorForge frontend application to AKS.

The frontend deployment runs the frontend container image and exposes it through a Kubernetes service.

---

## Supporting Files

```text
kubernetes/base/frontend/
├── deployment.yaml
├── service.yaml
└── kustomization.yaml
```

---

## Command Used

```bash
kubectl apply -f kubernetes/base/frontend/deployment.yaml
```

```bash
kubectl apply -f kubernetes/base/frontend/service.yaml
```

---

## Expected Output

Kubernetes should create:

* Frontend Deployment
* Frontend Pods
* Frontend Service

---

## Evidence — Frontend Deployment

![Frontend Deployment YAML](/screenshots/kubernetes/base-frontend-deployment-yaml.png)

### Frontend Service

![Frontend Service YAML](/screenshots/kubernetes/base-frontend-service-yaml.png)

### Frontend Application

![Frontend in Browser](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

---

## What This Evidence Proves

The evidence confirms that the frontend application was deployed to AKS and made available through Kubernetes.

---

## Verification Result

**Frontend successfully deployed to AKS.**

---

# STEP 20 — Verify Kubernetes Workloads

## Goal

Verify that the FlavorForge Kubernetes workloads are running successfully after deployment.

---

## Commands Used

```bash
kubectl get deployments -n flavorforge
```

```bash
kubectl get pods -n flavorforge
```

```bash
kubectl get services -n flavorforge
```

To inspect all major resources:

```bash
kubectl get all -n flavorforge
```

---

## Expected Output

The Kubernetes namespace should contain the FlavorForge workloads.

The deployments should report available replicas, and the application pods should reach the `Running` state.

---

## Evidence — All Kubernetes Resources

![Kubernetes All Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

### Evidence — Pods

![Kubernetes Pods](/screenshots/kubernetes/pods.png)

### Evidence — Deployments

![All Deployments](/screenshots/kubernetes/all-deployment.png)

---

## What This Evidence Proves

This verification confirms that the Kubernetes workloads were created and are running inside the AKS cluster.

---

## Verification Result

**FlavorForge Kubernetes workloads verified successfully.**

---

# STEP 21 — Configure Kubernetes Services

## Goal

Expose the frontend and backend workloads through Kubernetes Services.

Services provide stable networking endpoints for the Kubernetes workloads even when individual pods are replaced.

---

## Supporting Files

```text
kubernetes/base/backend/service.yaml
kubernetes/base/frontend/service.yaml
```

---

## Command Used

```bash
kubectl get services -n flavorforge
```

---

## Expected Output

The namespace should contain the configured FlavorForge services.

---

## Evidence

![Services](/screenshots/kubernetes/nginx-ingress/12-get-all-flavorforge.png)

### Service Configuration

![Backend Service](/screenshots/kubernetes/base-backend-service-yaml.png)

![Frontend Service](/screenshots/kubernetes/base-frontend-service-yaml.png)

---

## What This Evidence Proves

The Kubernetes Services provide stable networking for the frontend and backend workloads.

---

## Verification Result

**FlavorForge Kubernetes services verified successfully.**

---

# STEP 22 — Configure Ingress

## Goal

Configure Kubernetes Ingress to provide HTTP routing to the FlavorForge application.

The project contains an Ingress configuration under:

```text
kubernetes/base/ingress/ingress.yaml
```

---

## Supporting Files

```text
kubernetes/base/ingress/
├── ingress.yaml
└── kustomization.yaml
```

---

## Command Used

The Ingress configuration can be applied with:

```bash
kubectl apply -f kubernetes/base/ingress/ingress.yaml
```

Verify the resource:

```bash
kubectl get ingress -n flavorforge
```

---

## Expected Output

The Ingress should be created and an external address should become available once the ingress controller is configured.

---

## Evidence — Ingress Configuration

![Ingress](/screenshots/kubernetes/nginx-ingress/3-ingress-external-address.png)

### Frontend Through Ingress

![Frontend Through Ingress](/screenshots/kubernetes/nginx-ingress/4-frontend-http-4-157-77-48.png)

### Backend Through Ingress

![Backend Through Ingress](/screenshots/kubernetes/nginx-ingress/5-backend.png)

### API Health

![API Health](/screenshots/kubernetes/nginx-ingress/7-api-health.png)

---

## What This Evidence Proves

The evidence demonstrates that:

* Kubernetes Ingress was configured.
* An external address was obtained.
* Frontend traffic could reach the application.
* Backend API routing was functional.
* The health endpoint was accessible.

---

# Kubernetes Deployment Evidence Chain

```text
STEP 17
Namespace
    ↓
STEP 18
Backend Deployment
    ↓
STEP 19
Frontend Deployment
    ↓
STEP 20
Workload Verification
    ↓
STEP 21
Kubernetes Services
    ↓
STEP 22
Ingress
    ↓
External Application Access
```

## Current Architecture

```text
                         Internet
                            │
                            ▼
                       Ingress
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
             Frontend              Backend
              Service               Service
                 │                     │
                 ▼                     ▼
          Frontend Pods          Backend Pods
                 │                     │
                 └─────────┬───────────┘
                           │
                       AKS Cluster
```

---

# Kustomize phase. 
This is important because project uses **one Kubernetes base + environment-specific overlays** for Dev, QA, and Prod.

# STEP 23 — Configure Kustomize Base

## Goal

Create a reusable Kubernetes base configuration containing the common FlavorForge resources.

The base configuration avoids duplicating the same Kubernetes YAML for every environment.

---

## Supporting Files

```text
kubernetes/
└── base/
    ├── namespace.yaml
    ├── kustomization.yaml
    ├── backend/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   └── kustomization.yaml
    ├── frontend/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   └── kustomization.yaml
    ├── config/
    │   ├── backend-configmap.yaml
    │   ├── secret-template.yaml
    │   └── kustomization.yaml
    ├── ingress/
    │   ├── ingress.yaml
    │   └── kustomization.yaml
    └── autoscaling/
        ├── hpa.yaml
        └── kustomization.yaml
```

---

## Command Used

To render the complete base without applying it:

```bash
kubectl kustomize kubernetes/base
```

---

## Expected Output

Kustomize should generate the combined Kubernetes resources from the base configuration.

The rendered output should contain resources such as:

```text
Namespace
ConfigMap
Backend Deployment
Backend Service
Frontend Deployment
Frontend Service
Ingress
HPA
```

---

## Evidence — Base Render

![Base Render](/screenshots/build-journey/kustomize/Base%20render.png)

### Kubernetes/Kustomize Structure

![Kubernetes Kustomize Structure](/screenshots/build-journey/kustomize/Kubernetes-Kustomize%20structure.png)

### Kubernetes Resources

![Kubernetes Resources](/screenshots/build-journey/kustomize/kubernetes-resources.png)

---

## What This Evidence Proves

The evidence confirms that the common Kubernetes resources can be assembled through Kustomize without requiring separate complete manifests for each environment.

---

## Verification Result

**Kustomize base rendered successfully.**

---

# STEP 24 — Configure the Development Overlay

## Goal

Create a Dev-specific Kustomize overlay that reuses the common base while applying development-specific configuration.

---

## Supporting Files

```text
kubernetes/overlays/dev/
├── kustomization.yaml
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

The overlay references the common base:

```text
kubernetes/base/
```

---

## Command Used

Render the Dev environment:

```bash
kubectl kustomize kubernetes/overlays/dev
```

---

## Expected Output

The Dev overlay should render the base resources together with the Dev-specific replica configuration.

---

## Evidence

![Dev Render](/screenshots/build-journey/kustomize/Dev%20render.png)

### Dev Render Validation

![Dev Render Success](/screenshots/build-journey/kustomize/dev-render-success.png)

---

## What This Evidence Proves

The Dev overlay demonstrates the Kustomize environment-management model:

```text
Base
  +
Dev Patch
  ↓
Dev Configuration
```

---

## Verification Result

**Development Kustomize overlay rendered successfully.**

---

# STEP 25 — Configure the QA Overlay

## Goal

Create a QA-specific overlay using the same reusable Kubernetes base.

---

## Supporting Files

```text
kubernetes/overlays/qa/
├── kustomization.yaml
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

---

## Command Used

```bash
kubectl kustomize kubernetes/overlays/qa
```

---

## Expected Output

The QA overlay should render successfully and include:

* Common base resources
* QA-specific backend configuration
* QA-specific frontend configuration

---

## Evidence

![QA Render](/screenshots/build-journey/kustomize/QA%20render.png)

### QA Render Validation

![QA Render Success](/screenshots/build-journey/kustomize/qa-render-success.png)

---

## What This Evidence Proves

The QA environment is generated from the same base rather than maintaining a completely separate copy of the Kubernetes manifests.

```text
Base
  +
QA Patch
  ↓
QA Configuration
```

---

## Verification Result

**QA Kustomize overlay rendered successfully.**

---

# STEP 26 — Configure the Production Overlay

## Goal

Create a production-specific overlay using the common Kubernetes base.

---

## Supporting Files

```text
kubernetes/overlays/prod/
├── kustomization.yaml
├── backend-replica-patch.yaml
└── frontend-replica-patch.yaml
```

---

## Command Used

```bash
kubectl kustomize kubernetes/overlays/prod
```

---

## Expected Output

The production overlay should render the common resources together with the production-specific configuration.

---

## Evidence

![Production Render](/screenshots/build-journey/kustomize/Production%20render.png)

### Production Render Validation

![Production Render Success](/screenshots/build-journey/kustomize/prod-render-success.png)

---

## Production Workload Evidence

![Production Workloads](/screenshots/build-journey/kustomize/Production%20workloads.png)

---

## What This Evidence Proves

The production environment follows the same reusable Kustomize model:

```text
Base
  +
Production Patch
  ↓
Production Configuration
```

This reduces configuration duplication and makes environment differences explicit.

---

## Verification Result

**Production Kustomize overlay rendered successfully.**

---

# STEP 27 — Validate All Kustomize Overlays

## Goal

Validate that all three environment overlays can be rendered successfully before they are used for deployment.

---

## Commands Used

### Development

```bash
kubectl kustomize kubernetes/overlays/dev
```

### QA

```bash
kubectl kustomize kubernetes/overlays/qa
```

### Production

```bash
kubectl kustomize kubernetes/overlays/prod
```

---

## Expected Result

All three commands should complete without Kustomize errors.

```text
Dev   → Render Successful
QA    → Render Successful
Prod  → Render Successful
```

---

## Evidence — Overlay Structure

![Kustomize Overlays](/screenshots/build-journey/kustomize/kustomize-overlays.png)

### Overlay Render Validation

![Overlay Render Validation](/screenshots/build-journey/kustomize/overlay-render-validation.png)

### Complete Production Resources

![Complete Production Resources](/screenshots/build-journey/kustomize/Complete%20production%20resources.png)

---

# STEP 28 — Validate Kubernetes Services and HPA Configuration

## Goal

Verify that the Kustomize-managed Kubernetes configuration includes the required Services and Horizontal Pod Autoscaler resources.

---

## Supporting Files

```text
kubernetes/base/autoscaling/hpa.yaml
kubernetes/base/autoscaling/kustomization.yaml
```

---

## Evidence — Services and HPA

![Services and HPA](/screenshots/build-journey/kustomize/Services%20%2B%20HPA.png)

### HPA Configuration

![HPA](/screenshots/build-journey/kustomize/hpa.png)

### Ingress

![Ingress](/screenshots/build-journey/kustomize/Ingress.png)

---

## What This Evidence Proves

The Kubernetes configuration includes the supporting production capabilities required by the application:

* Services
* Ingress
* Horizontal Pod Autoscaling
* Environment overlays

---

# Kustomize Phase — Evidence Chain

```text
STEP 23
Kustomize Base
      ↓
STEP 24
Dev Overlay
      ↓
STEP 25
QA Overlay
      ↓
STEP 26
Prod Overlay
      ↓
STEP 27
Render Validation
      ↓
STEP 28
Services + HPA + Ingress
```

## Final Kustomize Model

```text
                    KUSTOMIZE
                        │
                        ▼
                  ┌──────────┐
                  │   BASE   │
                  └────┬─────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
        DEV           QA           PROD
       Overlay       Overlay       Overlay
          │            │            │
          ▼            ▼            ▼
       Dev Env       QA Env       Prod Env
```

---


# Azure DevOps CI/CD phase

#### Azure DevOps Organization/Pipeline Setup → Service Connections → Pipeline Creation → Pipeline Execution → Build/Test/Security/Quality stages.


# STEP 29 — Configure Azure DevOps

## Goal

Create and configure the Azure DevOps project used to build, test, scan, package, and deploy FlavorForge.

The Azure DevOps pipeline definition is stored in the repository as:

```text
azure-pipelines.yml
```

The GitOps-related pipeline is also present as:

```text
argocd-pipeline.yml
```

---

## Supporting Files

```text
azure-pipelines.yml
argocd-pipeline.yml
sonar-project.properties
```

---

## Evidence

![Azure DevOps Organization](/screenshots/pipeline/1-azure-devops-organizations.png)

### Azure DevOps Project

![Azure DevOps Project](/screenshots/enterprise-azure-devops-release-simulation/project.png)

---

## What This Evidence Proves

The screenshots establish the Azure DevOps environment used for the FlavorForge CI/CD workflow.

---

# STEP 30 — Create Azure DevOps Service Connections

## Goal

Configure the connections required for Azure DevOps to communicate with external services used by the pipeline.

The project uses connections for services such as:

* Azure
* Azure Container Registry
* SonarCloud
* Other pipeline integrations where required

---

## Supporting Configuration

The pipeline references service connections rather than storing authentication credentials directly in the repository.

---

## Evidence — Service Connection

![Service Connection](/screenshots/pipeline/2-service-connection.png)

### Azure Resource Manager Connection

![Azure Resource Manager](/screenshots/pipeline/3-azure-resource-manager.png)

### New Azure Service Connection

![Azure Service Connection](/screenshots/pipeline/4-new-azure-service-connection.png)

### Service Connections

![Service Connections](/screenshots/pipeline/11-service-connections.png)

---

## What This Evidence Proves

The evidence shows that Azure DevOps was configured to authenticate with the external resources required by the CI/CD workflow.

---

## Verification Result

**Azure DevOps service connections configured successfully.**

---

# STEP 31 — Create the Azure DevOps Pipeline

## Goal

Connect the Azure DevOps pipeline to the FlavorForge Git repository and use the version-controlled pipeline definition.

The primary pipeline definition is:

```text
azure-pipelines.yml
```

---

## Pipeline Structure

The pipeline contains stages covering the DevSecOps workflow, including areas such as:

```text
Build
  ↓
Test
  ↓
Security
  ↓
Code Quality
  ↓
Docker Build
  ↓
Trivy Scan
  ↓
Push
  ↓
Deployment
```

The exact stages and conditions must always be taken from the current `azure-pipelines.yml`.

---

## Evidence — Create Pipeline

![New Pipeline](/screenshots/pipeline/5-click-new-pipeline.png)

---

## Evidence — Pipeline

![Pipeline Run](/screenshots/pipeline/6-pipelines-run.png)

---

## What This Evidence Proves

The pipeline is configured from the repository rather than requiring the pipeline logic to be manually recreated in the Azure DevOps UI.

---

# STEP 32 — Run the Azure DevOps Pipeline

## Goal

Execute the CI/CD pipeline and observe the automated workflow.

---

## Command / Action Used

The pipeline is started from Azure DevOps.

The pipeline definition is:

```text
azure-pipelines.yml
```

---

## Expected Output

A successful run should progress through the configured stages.

The pipeline UI should show the execution status for the individual stages/jobs.

---

## Evidence — Pipeline Run

![Pipeline Run](/screenshots/pipeline/7-test.png)

### Successful Pipeline Evidence

![Pipeline Run Passed](/screenshots/pipeline/8-pipelines-run-pass.png)

### Advanced Pipeline Run

![Advanced Pipeline Run](/screenshots/pipeline/9-advance-pipelines-run-pass.png)

---

## Important Accuracy Note

For the **final README**, do **not** write that every pipeline run is currently reproducibly passing if Azure DevOps is presently reporting:

```text
Your organization has no free minutes remaining.
```

Instead, distinguish between:

**Historical execution evidence**

and

**Current execution availability**.

This keeps the README technically honest.

---

# STEP 33 — Configure Azure DevOps Environment Flow

## Goal

Represent the application promotion flow across the configured environments.

The project contains evidence for:

```text
Dev → QA → Prod
```

with environment-specific configuration and approvals.

---

## Evidence — Environments

![Dev Environment](/screenshots/enterprise-azure-devops-release-simulation/1-1-dev-azure-devops-environments.png)

### Dev / QA / Prod

![All Environments](/screenshots/enterprise-azure-devops-release-simulation/1-2-dev-qa-prod-azure-devops-environments.png)

---

## Evidence — Approvals

![Approvals](/screenshots/enterprise-azure-devops-release-simulation/3-approvals.png)

### Production Approvals

![Production Approvals](/screenshots/enterprise-azure-devops-release-simulation/4-1-approvals-prod.png)

### QA Approvals

![QA Approvals](/screenshots/enterprise-azure-devops-release-simulation/4-1-approvals-qa.png)

---

## What This Evidence Proves

The Azure DevOps configuration demonstrates controlled environment progression rather than treating every deployment as an unrestricted production deployment.

---

# STEP 34 — Configure Environment Variables

## Goal

Keep environment-specific values separate from the common pipeline logic.

The project contains evidence for environment-specific variables for QA and Production.

---

## Evidence — QA Variables

![QA Variables](/screenshots/enterprise-azure-devops-release-simulation/2-qa-variables.png)

## Evidence — Production Variables

![Production Variables](/screenshots/enterprise-azure-devops-release-simulation/2-prod-variables.png)

---

## What This Evidence Proves

The evidence demonstrates that environment-specific configuration can be managed separately from the application source code and common pipeline definition.

---

# STEP 35 — Verify ACR and AKS Integration

## Goal

Verify that Azure DevOps has the necessary integration with the Azure container registry and Kubernetes environment.

---

## Evidence

![ACR and Docker](/screenshots/enterprise-azure-devops-release-simulation/10-acr-dockerhub.png)

### ACR / AKS

![ACR AKS](/screenshots/pipeline/12-acr-aks.png)

---

## What This Evidence Proves

The pipeline environment is connected to the infrastructure required for the container deployment workflow:

```text
Azure DevOps
     │
     ├── Build
     ├── Test
     ├── Security
     ├── Code Quality
     │
     ▼
    ACR
     │
     ▼
    AKS
```

---

# STEP 36 — Verify the CI/CD Pipeline Evidence

## Goal

Bring together the Azure DevOps evidence showing the configured CI/CD workflow.

---

## Evidence

![Final Azure Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-final-azure-pipeline.png)

### Final Environment Pipeline

![Final Pipeline](/screenshots/enterprise-azure-devops-release-simulation/14-1-test-final-azure-pipeline.png)

---

# Azure DevOps Phase — Evidence Chain

```text
STEP 29
Azure DevOps Project
        ↓
STEP 30
Service Connections
        ↓
STEP 31
Pipeline Creation
        ↓
STEP 32
Pipeline Execution
        ↓
STEP 33
Dev → QA → Prod
        ↓
STEP 34
Environment Variables
        ↓
STEP 35
ACR + AKS Integration
        ↓
STEP 36
Pipeline Verification
```

# Overall CI/CD Flow

```text
                 GitHub
                   │
                   ▼
          azure-pipelines.yml
                   │
                   ▼
            Azure DevOps
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      Build       Test     Security
        │          │          │
        └──────────┼──────────┘
                   ▼
             Code Quality
                   │
                   ▼
             Docker Build
                   │
                   ▼
             Trivy Scan
                   │
                   ▼
                  ACR
                   │
                   ▼
                  AKS
                   │
              ┌────┴────┐
              ▼         ▼
          Frontend    Backend
```

--

# Security & Code Quality phase
 ### SonarCloud first, then Trivy

##### SonarCloud setup → service connection → project → quality analysis/evidence → Trivy filesystem scan → container image scans.


# STEP 37 — Configure SonarCloud

## Goal

Integrate SonarCloud with the FlavorForge Azure DevOps pipeline so that source code can be analyzed for code quality and security issues.

---

## Supporting Files

```text
sonar-project.properties
azure-pipelines.yml
```

The repository also contains the SonarCloud-related documentation under:

```text
docs/week-4/BUILD-JOURNEY/09-sonarcloud/
```

---

## Evidence — SonarCloud Login

![SonarCloud Login](/screenshots/build-journey/sonarqube/Login.png)

---

## Evidence — SonarCloud Project

![FlavorForge SonarCloud Project](/screenshots/build-journey/sonarqube/flavorforge-project-overview.png)

---

## Evidence — SonarCloud Dashboard

![SonarCloud Dashboard](/screenshots/build-journey/sonarqube/projects-sonarCloud-dashboard.png)

---

## What This Evidence Proves

The screenshots establish that the FlavorForge project was created and available in SonarCloud for source-code analysis.

---

## Verification Result

**FlavorForge SonarCloud project configured successfully.**

---

# STEP 38 — Configure SonarCloud Service Connection

## Goal

Create the Azure DevOps service connection required for the pipeline to communicate securely with SonarCloud.

---

## Supporting Configuration

The authentication information is configured through the Azure DevOps service connection rather than being hard-coded into the repository.

---

## Evidence

![SonarCloud Service Connection](/screenshots/build-journey/sonarqube/azure-devops-sonarcloud-service-connection.png)

### Verified Connection

![SonarCloud Service Connection Verified](/screenshots/build-journey/sonarqube/settings-sonarcloud-service-connection-verified.png)

---

## What This Evidence Proves

The screenshots show that Azure DevOps was configured to communicate with SonarCloud through a dedicated service connection.

---

## Verification Result

**SonarCloud Azure DevOps service connection verified.**

---

# STEP 39 — Configure SonarCloud Analysis

## Goal

Run static code analysis against the FlavorForge source code as part of the DevSecOps workflow.

The analysis covers the application source rather than relying only on runtime testing.

---

## Supporting Files

```text
azure-pipelines.yml
sonar-project.properties
```

---

## Expected Flow

```text
Source Code
     ↓
SonarCloud Analysis
     ↓
Quality / Security Findings
     ↓
Quality Gate
```

---

## Evidence

![SonarCloud Project Overview](/screenshots/build-journey/sonarqube/flavorforge-project-overview.png)

![SonarCloud Dashboard](/screenshots/build-journey/sonarqube/projects-sonarCloud-dashboard.png)

---

## What This Evidence Proves

SonarCloud was integrated into the project to provide automated source-code quality analysis.

---

## Verification Result

**SonarCloud analysis configuration verified.**

---

# STEP 40 — Configure Trivy Filesystem Scanning

## Goal

Scan the FlavorForge project filesystem for known vulnerabilities and security issues before deployment.

Trivy provides an additional security layer alongside SonarCloud.

---

## Supporting Files

The generated security reports are stored under:

```text
reports/trivy/
```

including:

```text
filesystem-report.json
filesystem-report.txt
```

---

## Command Used

The filesystem scan follows the Trivy workflow used in the project.

Typical command:

```bash id="y2qthj"
trivy fs .
```

---

## Expected Output

Trivy should scan the project filesystem and report discovered vulnerabilities according to its configured severity and scan settings.

---

## Evidence — Trivy Filesystem Scan

![Trivy Filesystem Evidence](/screenshots/build-journey/trivy/Trivy%20filesystem%20evidence.png)

### Filesystem Report

![Filesystem Report](/screenshots/build-journey/trivy/filesystem-report-txt.png)

---

## What This Evidence Proves

The evidence demonstrates that the project filesystem was scanned with Trivy and that the scan output was captured as a report.

---

## Verification Result

**Trivy filesystem scan executed and evidence captured.**

---

# STEP 41 — Generate Trivy JSON Report

## Goal

Generate a machine-readable Trivy security report that can be retained as a build artifact or used for further security processing.

---

## Supporting Files

```text
reports/trivy/filesystem-report.json
```

---

## Expected Output

A JSON report should be generated containing the Trivy scan results.

---

## Evidence

![Verify JSON Report](/screenshots/build-journey/trivy/Verify%20the%20JSON%20report.png)

---

## What This Evidence Proves

The JSON report provides structured security-scan output that can be consumed by automation or retained as project evidence.

---

## Verification Result

**Trivy JSON security report generated successfully.**

---

# STEP 42 — Scan the Backend Container Image

## Goal

Scan the FlavorForge backend Docker image for vulnerabilities before it is deployed.

---

## Supporting Report Files

```text
reports/trivy/
├── backend-image-report.json
├── backend-image-report.txt
└── backend-high-critical.txt
```

---

## Command Used

The backend image is scanned with Trivy using the image produced during the Docker phase.

Typical form:

```bash id="n4h0re"
trivy image flavorforge-backend:1.0
```

---

## Expected Output

Trivy should inspect the backend image layers and report vulnerabilities according to the configured scan criteria.

---

## Evidence

![Backend Trivy Report](/screenshots/build-journey/trivy/backend-report.png)

---

## What This Evidence Proves

The backend container image was subjected to vulnerability scanning before being treated as a deployable artifact.

---

## Verification Result

**Backend container image security scan completed.**

---

# STEP 43 — Scan the Frontend Container Image

## Goal

Scan the FlavorForge frontend container image for known vulnerabilities.

---

## Supporting Report Files

```text
reports/trivy/
├── frontend-image-report.json
└── frontend-image-report.txt
```

---

## Command Used

Typical form:

```bash id="7q4k6r"
trivy image flavorforge-frontend:1.0
```

---

## Evidence

![Frontend Trivy Report](/screenshots/build-journey/trivy/frontend-report.png)

---

## What This Evidence Proves

The frontend container image was also security-scanned before deployment.

This creates a security check for both major application components:

```text
Backend Image ──► Trivy
Frontend Image ─► Trivy
```

---

## Verification Result

**Frontend container image security scan completed.**

---

# STEP 44 — Review Trivy Security Reports

## Goal

Retain the generated Trivy results as auditable project evidence.

---

## Repository Evidence

```text
reports/trivy/
├── backend-high-critical.txt
├── backend-image-report.json
├── backend-image-report.txt
├── filesystem-report.json
├── filesystem-report.txt
├── frontend-high-critical.txt
├── frontend-image-report.json
└── frontend-image-report.txt
```

---

## Evidence

![Trivy Report](/screenshots/build-journey/trivy/report.png)

---

## What This Evidence Proves

The security results are not limited to a terminal screen. The project retains generated reports that can be reviewed after the scan.

---

# STEP 45 — Security and Quality Evidence Chain

```text id="j3v8h7"
                    Source Code
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        SonarCloud                Trivy
             │                     │
             ▼                     ▼
       Code Analysis         Filesystem Scan
             │                     │
             │              ┌──────┴──────┐
             │              ▼             ▼
             │          Backend Image  Frontend Image
             │              │             │
             └──────────────┴─────────────┘
                            │
                            ▼
                    Security Evidence
```

# Security Phase Result

The FlavorForge project now has evidence for:

* **SonarCloud project**
* **SonarCloud Azure DevOps service connection**
* **Source-code analysis**
* **Trivy filesystem scanning**
* **Trivy JSON reporting**
* **Backend image scanning**
* **Frontend image scanning**
* **Persisted security reports**

---

 # Argo CD / GitOps phase

#### Argo CD installation → Argo CD pods/services → FlavorForge Argo CD Application → GitOps synchronization → deployed application verification.

Yes. Now we move to the **Argo CD / GitOps phase**.

# STEP 46 — Install Argo CD in AKS

## Goal

Install Argo CD into the AKS cluster so that Kubernetes deployments can follow a GitOps-based deployment model.

Argo CD continuously compares the desired Kubernetes state stored in Git with the state running in the Kubernetes cluster.

---

## Supporting Files

```text
argocd/
├── README.md
└── flavorforge-app.yaml
```

The project also contains:

```text
argocd-pipeline.yml
```

---

## Command Used

Argo CD was installed into the cluster using the standard Kubernetes installation process.

The installation should be documented using the **exact command captured in your BUILD-JOURNEY evidence**.

---

## Expected Output

Argo CD resources should be created successfully in the `argocd` namespace.

---

## Evidence — Argo CD Installation

![Argo CD Installation](/screenshots/argo-cd/1-install.png)

---

## Verification Result

**Argo CD installation completed successfully.**

---

# STEP 47 — Verify Argo CD Pods and Services

## Goal

Verify that the Argo CD components are running correctly inside AKS.

---

## Commands Used

```bash
kubectl get pods -n argocd
```

```bash
kubectl get services -n argocd
```

---

## Expected Output

The Argo CD components should reach a healthy/running state.

---

## Evidence — Argo CD Pods

![Argo CD Pods](/screenshots/argo-cd/argocd-pods-running.png)

### Argo CD Services

![Argo CD Services](/screenshots/argo-cd/argocd-services.png)

### Argo CD CRDs

![Argo CD CRDs](/screenshots/argo-cd/argocd-crds.png)

---

## What This Evidence Proves

The evidence demonstrates that the Argo CD platform components and Kubernetes resources were successfully installed into the cluster.

---

## Verification Result

**Argo CD pods, services, and CRDs verified successfully.**

---

# STEP 48 — Create the FlavorForge Argo CD Application

## Goal

Create an Argo CD Application that connects the Git repository containing the desired Kubernetes configuration with the AKS cluster.

The Argo CD Application definition is stored in:

```text
argocd/flavorforge-app.yaml
```

---

## Supporting File

```text
argocd/flavorforge-app.yaml
```

---

## Command Used

The Application manifest is applied to Kubernetes.

Typical form:

```bash
kubectl apply -f argocd/flavorforge-app.yaml
```

---

## Expected Output

Argo CD should create the `FlavorForge` application and begin evaluating the desired state from Git.

---

## Evidence — Argo CD Application YAML

![Create Argo CD YAML](/screenshots/argo-cd/3-create-argocd-yaml.png)

---

## What This Evidence Proves

The Application definition establishes the connection between:

```text
Git Repository
      ↓
Argo CD
      ↓
AKS Cluster
```

Git becomes the source of truth for the desired Kubernetes configuration.

---

## Verification Result

**FlavorForge Argo CD Application created successfully.**

---

# STEP 49 — Verify FlavorForge Application in Argo CD

## Goal

Verify that Argo CD recognizes the FlavorForge application and displays its Kubernetes resources.

---

## Evidence

![Argo CD Applications](/screenshots/argo-cd/argocd-applications.png)

### Application Resource Tree

![FlavorForge Argo CD Application Tree](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

---

## What This Evidence Proves

The Argo CD application view provides visibility into the deployed Kubernetes resource hierarchy.

It demonstrates that Argo CD is managing the FlavorForge application's Kubernetes resources.

---

## Verification Result

**FlavorForge application successfully registered and visible in Argo CD.**

---

# STEP 50 — Verify GitOps Deployment

## Goal

Verify the GitOps deployment model in which Kubernetes configuration is maintained in Git and Argo CD reconciles the cluster against that desired state.

---

## GitOps Flow

```text
Developer
    │
    ▼
GitHub Repository
    │
    │ Kubernetes manifests
    ▼
  Argo CD
    │
    │ Reconciliation
    ▼
  AKS Cluster
    │
    ├── Frontend
    └── Backend
```

---

## Supporting Files

```text
argocd/flavorforge-app.yaml
argocd-pipeline.yml
kubernetes/
```

---

## Evidence

![Argo CD Application](/screenshots/argo-cd/argocd-applications.png)

![Application Resource Tree](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

---

## What This Evidence Proves

The evidence shows the GitOps control plane managing the application resources in AKS.

This is different from manually running `kubectl apply` for every application change.

---

## Verification Result

**GitOps deployment workflow verified through Argo CD.**

---

# STEP 51 — Verify the Deployed Application

## Goal

Verify that the GitOps-managed deployment results in a functioning FlavorForge application.

Verification should cover more than just Argo CD status.

---

## Verification Areas

```text
Argo CD
   ↓
Kubernetes Pods
   ↓
Services / Ingress
   ↓
Backend Health
   ↓
Frontend Application
```

---

## Evidence — Kubernetes Workloads

![Kubernetes Resources](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

---

## Evidence — Frontend

![Frontend Application](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

---

## Evidence — Backend Health

![Backend Health](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

---

## What This Evidence Proves

The final deployment verification does not depend on a single indicator.

It checks:

* Argo CD application state
* Kubernetes workloads
* Frontend availability
* Backend API availability

---

# STEP 52 — Argo CD / GitOps Final Verification

## Goal

Confirm that the complete GitOps deployment path is operational.

### Evidence Chain

```text
STEP 46
Argo CD Installation
       ↓
STEP 47
Pods + Services
       ↓
STEP 48
FlavorForge Application
       ↓
STEP 49
Application Resource Tree
       ↓
STEP 50
GitOps Reconciliation
       ↓
STEP 51
Application Verification
```

---

# GitOps Architecture

```text
                         GitHub
                           │
                           │
                    Desired State
                           │
                           ▼
                       Argo CD
                           │
                    Reconciliation
                           │
                           ▼
                    Azure AKS Cluster
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
             Frontend             Backend
                 │                   │
                 └─────────┬─────────┘
                           ▼
                    FlavorForge App
```

---

# Overall DevSecOps → GitOps Flow

At this point, your project story becomes:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Azure DevOps
    │
    ├── Build
    ├── Test
    ├── SonarCloud
    ├── Trivy
    └── Docker Build
            │
            ▼
           ACR
            │
            ▼
       Kubernetes / AKS
            │
            ▲
            │
          Argo CD
            ▲
            │
        Git Desired State
```

---

# FINAL VERIFICATION

##### Kubernetes workloads → Services → Ingress → HPA → Argo CD → application → documentation/evidence verification → final acceptance.


Yes. We are at the **FINAL VERIFICATION phase** now. This is where we prove that the whole FlavorForge journey actually works, rather than just proving that individual tools were configured.

# STEP 53 — Verify Kubernetes Workloads

## Goal

Confirm that the FlavorForge frontend and backend workloads are running successfully in AKS.

---

## Command Used

```bash
kubectl get all -n flavorforge
```

---

## Expected Output

The namespace should contain the expected Kubernetes resources, including:

```text
Pods
Services
Deployments
ReplicaSets
```

with the application workloads in a healthy/running state.

---

## Evidence

![Kubernetes Workloads](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

---

## What This Evidence Proves

This verifies that the application workloads are actually running inside the Kubernetes cluster.

---

# STEP 54 — Verify Frontend Deployment

## Goal

Confirm that the FlavorForge frontend deployment is running and serving the application.

---

## Supporting File

```text
kubernetes/base/frontend/deployment.yaml
```

---

## Command Used

```bash
kubectl get deployment -n flavorforge
```

---

## Expected Output

The frontend deployment should show the expected number of available replicas.

---

## Evidence

![Frontend Deployment](/screenshots/azure/18-frontend-microsoft-azure.png)

---

## Application Evidence

![FlavorForge Frontend](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

---

## Verification Result

**Frontend deployment and application access verified.**

---

# STEP 55 — Verify Backend Deployment

## Goal

Confirm that the backend service is running and responding to health requests.

---

## Supporting File

```text
kubernetes/base/backend/deployment.yaml
```

---

## Command Used

```bash
kubectl get deployment -n flavorforge
```

---

## Backend Health Check

The backend health endpoint is verified through the deployed application.

---

## Evidence

![Backend Health](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

---

## What This Evidence Proves

The backend is not only deployed; it is responding to an application-level health request.

---

## Verification Result

**Backend deployment and health endpoint verified.**

---

# STEP 56 — Verify Services and Ingress

## Goal

Confirm that Kubernetes networking exposes the application correctly.

---

## Commands Used

```bash
kubectl get svc -n flavorforge
```

```bash
kubectl get ingress -n flavorforge
```

---

## Expected Output

The expected Services and Ingress resources should be present.

---

## Evidence

![Services and Ingress](/screenshots/kubernetes/nginx-ingress/12-get-all-flavorforge.png)

### Ingress External Address

![Ingress External Address](/screenshots/kubernetes/nginx-ingress/3-ingress-external-address.png)

### Services and Ingress

![Services Ingress](/screenshots/build-journey/kustomize/services-ingress.png)

---

## What This Evidence Proves

The application has a Kubernetes networking path from the external entry point to the application services.

---

# STEP 57 — Verify Horizontal Pod Autoscaling

## Goal

Confirm that Kubernetes autoscaling has been configured for the application.

---

## Supporting File

```text
kubernetes/base/autoscaling/hpa.yaml
```

---

## Commands Used

```bash
kubectl get hpa -n flavorforge
```

```bash
kubectl top pods -n flavorforge
```

---

## Expected Output

The HPA should be visible with its configured target and current metrics.

---

## Evidence

![HPA](/screenshots/kubernetes/hpa/6-kubectl-get-hpa.png)

### Pod Metrics

![Pod Metrics](/screenshots/kubernetes/hpa/5-kubectl-top-pods-n-flavorforge.png)

### Autoscaling Configuration

![Autoscaling](/screenshots/kubernetes/hpa/2-autoscaling-configured-successfully.png)

---

## What This Evidence Proves

The Kubernetes deployment includes an autoscaling mechanism rather than relying exclusively on fixed replica counts.

---

## Verification Result

**HPA configuration and metrics verified.**

---

# STEP 58 — Verify Rolling Update Capability

## Goal

Verify that Kubernetes deployments support controlled application updates.

---

## Command Used

```bash
kubectl rollout history deployment/<deployment-name> -n flavorforge
```

---

## Expected Output

Kubernetes should show the deployment revision history.

---

## Evidence

![Rollout History](/screenshots/kubernetes/rolling-update/1-rollout-history.png)

### Deployment Details

![Deployment Describe](/screenshots/kubernetes/rolling-update/2-deployment-describe.png)

---

## What This Evidence Proves

The deployment history demonstrates Kubernetes' ability to track application revisions and perform controlled updates.

---

# STEP 59 — Verify Application End-to-End

## Goal

Perform the final application verification from the user-facing application through the backend.

This is the most important verification because a successful infrastructure command does not automatically mean the application works.

---

## Verification Chain

```text
Browser
   ↓
Frontend
   ↓
Backend API
   ↓
Application Response
```

---

## Evidence — Frontend

![FlavorForge Frontend](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

---

## Evidence — Backend

![Backend Health](/screenshots/kubernetes/backend-in-the-browser-http-104-45-175-93-api-health.png)

---

## Evidence — Recipe API

![Recipes API](/screenshots/backend/12-recipes-api-working.png)

---

## What This Evidence Proves

The application was verified at the application level rather than relying only on:

* Pipeline status
* Docker status
* Kubernetes status
* Argo CD status

The frontend and backend were also checked.

---

# STEP 60 — Verify Argo CD + Kubernetes + Application Together

## Goal

Perform the final multi-layer deployment verification.

---

## Verification Matrix

| Layer          | Verification                   |
| -------------- | ------------------------------ |
| CI/CD          | Azure DevOps pipeline evidence |
| Code Quality   | SonarCloud evidence            |
| Security       | Trivy reports                  |
| Container      | Docker images                  |
| Registry       | ACR images                     |
| Infrastructure | AKS                            |
| Kubernetes     | Pods / Deployments / Services  |
| Networking     | Ingress                        |
| Autoscaling    | HPA                            |
| GitOps         | Argo CD                        |
| Application    | Frontend                       |
| API            | Backend health                 |

---

## Evidence — Argo CD

![Argo CD Application](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

## Evidence — Kubernetes

![Kubernetes Workloads](/screenshots/kubernetes/kubectl-get-all-n-flavorforge.png)

## Evidence — Application

![Frontend Application](/screenshots/kubernetes/frontend-in-the-browser-http-104-45-175-93.png)

---

# STEP 61 — Verify Documentation and Evidence

## Goal

Confirm that the implementation is documented with commands, expected results, actual evidence, supporting files, and screenshots.

Your BUILD-JOURNEY is organized into:

```text
docs/week-4/BUILD-JOURNEY/
├── 01-prerequisites
├── 02-github
├── 03-application
├── 04-docker
├── 05-azure
├── 06-kubernetes
├── 07-kustomize
├── 08-azure-devops
├── 09-sonarcloud
├── 10-trivy
├── 11-argocd
├── 12-devsecops
├── 13-documentation
├── 14-troubleshooting
└── 15-final-verification
```

---

## Evidence

Your complete BUILD-JOURNEY is available here:

[FlavorForge Week 4 BUILD-JOURNEY](https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/tree/main/docs/week-4/BUILD-JOURNEY?utm_source=chatgpt.com)

---

# STEP 62 — Final Acceptance Verification

## Goal

Confirm that the FlavorForge DevSecOps implementation satisfies the intended project objectives.

### Final Acceptance Checklist

| Area                          | Status |
| ----------------------------- | ------ |
| GitHub repository             | ✅      |
| Frontend application          | ✅      |
| Backend application           | ✅      |
| Dockerization                 | ✅      |
| Azure Container Registry      | ✅      |
| Azure Kubernetes Service      | ✅      |
| Kubernetes manifests          | ✅      |
| Kustomize base                | ✅      |
| Dev overlay                   | ✅      |
| QA overlay                    | ✅      |
| Prod overlay                  | ✅      |
| Azure DevOps                  | ✅      |
| SonarCloud                    | ✅      |
| Trivy                         | ✅      |
| Argo CD                       | ✅      |
| GitOps                        | ✅      |
| Services / Ingress            | ✅      |
| HPA                           | ✅      |
| Application verification      | ✅      |
| Troubleshooting documentation | ✅      |
| BUILD-JOURNEY evidence        | ✅      |

**Important:** This table represents the **implemented/evidenced project areas**. For the final README, we should distinguish historical evidence from anything that is currently unavailable to rerun because of Azure DevOps hosted-agent/resource limits.

---

# STEP 63 — Final DevSecOps Journey

This is the sequence I recommend using as the **one-page final sequence** in your README:

```text
Developer
   │
   ▼
GitHub
   │
   ▼
Application Development
   │
   ▼
Docker
   │
   ▼
Azure Container Registry
   │
   ▼
Azure DevOps
   │
   ├── Build
   ├── Test
   ├── SonarCloud
   ├── Trivy
   └── Container Build/Push
             │
             ▼
           AKS
             │
             ▼
        Kubernetes
             │
        ┌────┴────┐
        ▼         ▼
     Frontend   Backend
        │         │
        └────┬────┘
             ▼
           Ingress
             │
             ▼
        FlavorForge
             
GitOps:
GitHub → Argo CD → AKS

Verification:
Pipeline → Security → ACR → AKS → Kubernetes → Argo CD → Application
```
