# Step 9 — Azure DevOps Pipeline Creation

## What we wanted to do

After configuring the Azure DevOps project, agent pool, service connections, variable groups, and environment approvals, the next step was to create the **FlavorForge CI/CD pipeline**.

The pipeline is defined as code in the repository using:

```text
azure-pipelines.yml
```

The pipeline automates the application delivery workflow from source-code validation through Docker image creation, security scanning, ACR publishing, AKS deployment, and environment-based release simulation.

The pipeline is triggered from the `main` branch.

---

## 9.1 Pipeline Definition

The FlavorForge pipeline is stored at the root of the repository:

```text
flavorforge-azure-devsecops-capstone/
└── azure-pipelines.yml
```

The pipeline uses the following major stages:

```text
Build
  ↓
Test
  ↓
Security
  ↓
CodeQuality
  ↓
DockerBuild
  ↓
TrivyScan
  ↓
Push
  ↓
Deploy
  ↓
AIReports
  ↓
DeployDev
  ↓
DeployQA
  ↓
DeployProd
  ↓
ReleaseSummary
```

The pipeline combines application validation, DevSecOps checks, containerization, Azure deployment, and controlled environment progression.

---

## 9.2 Pipeline Trigger

The pipeline is configured to run automatically when changes are pushed to the `main` branch.

```yaml
trigger:
  branches:
    include:
      - main
```

This means that a commit pushed to `main` automatically starts the Azure DevOps pipeline.

---

## 9.3 Microsoft-Hosted Agent

The pipeline uses the Microsoft-hosted Ubuntu agent:

```yaml
pool:
  vmImage: ubuntu-latest
```

This provides a clean Linux build environment for every pipeline execution.

The pipeline therefore does not require a manually maintained build server.

---

## 9.4 Pipeline Variables

The pipeline defines variables for the Azure Container Registry, Docker repositories, image tag, and AKS cluster.

```yaml
variables:
  dockerRegistryServiceConnection: 'flavorforge-acr-connection'
  imageRepositoryBackend: 'flavorforge-backend'
  imageRepositoryFrontend: 'flavorforge-frontend'

  containerRegistry: 'flavorforgeacr2026ms.azurecr.io'

  imageTag: '$(Build.BuildId)'

  aksResourceGroup: 'flavorforge-rg'
  aksClusterName: 'flavorforge-aks'
```

The build ID is used as the Docker image tag.

For example:

```text
flavorforge-backend:<BuildId>
flavorforge-frontend:<BuildId>
```

Using the build ID provides a unique image version for each pipeline execution.

---

# 9.5 Build Stage

The **Build** stage validates both the backend and frontend applications.

It contains two jobs:

```text
BackendBuild
FrontendBuild
```

### Backend Build

The backend job:

1. Checks out the repository.
2. Installs Node.js 22 LTS.
3. Verifies Node.js and npm.
4. Installs backend dependencies.
5. Runs backend tests.

The main commands are:

```bash
cd backend
npm ci --ignore-scripts
npm test
```

### Frontend Build

The frontend job:

1. Checks out the repository.
2. Installs Node.js 22 LTS.
3. Installs frontend dependencies.
4. Builds the React application.

The main commands are:

```bash
cd frontend
npm ci --ignore-scripts
npm run build
```

The Build stage must complete successfully before the pipeline proceeds to testing.

---

# 9.6 Test Stage

The **Test** stage depends on the Build stage:

```yaml
dependsOn: Build
```

It validates the running backend API and frontend application.

The stage contains:

```text
BackendSmokeTest
FrontendValidation
```

### Backend Smoke Test

The backend is started locally inside the pipeline agent:

```bash
node src/server.js &
sleep 10
curl --fail http://localhost:3000/api/health
```

The health endpoint is used to verify that the backend application starts successfully and responds correctly.

### Frontend Validation

The frontend dependencies are installed and frontend tests are executed.

The pipeline also verifies the generated coverage directories:

```text
backend/coverage
frontend/coverage
```

This provides additional evidence that application testing and coverage generation completed successfully.

---

# 9.7 Security Stage

The **Security** stage runs after the Test stage.

```yaml
dependsOn: Test
```

The stage performs dependency security validation.

The backend and frontend dependencies are checked using:

```bash
npm audit --audit-level=critical
```

This allows the pipeline to detect critical dependency vulnerabilities before the application proceeds further through the delivery workflow.

---

# 9.8 Code Quality Stage

The **CodeQuality** stage performs SonarCloud analysis.

```yaml
dependsOn: Security
```

The pipeline uses the configured SonarCloud service connection:

```yaml
SonarCloud: 'flavorforge-sonarcloud-sc'
```

The project is configured as:

```text
Organization: malathi-shetty
Project: FlavorForge
```

The pipeline analyzes:

```text
backend/src
frontend/src
kubernetes
```

Coverage information is also generated and published.

The pipeline executes:

```text
SonarCloudPrepare
↓
Run backend tests with coverage
↓
Run frontend tests with coverage
↓
Publish test results
↓
Publish code coverage
↓
SonarCloudAnalyze
↓
SonarCloudPublish
```

The SonarCloud quality gate therefore becomes part of the CI validation process.

---

# 9.9 Docker Build Stage

The **DockerBuild** stage creates container images for the backend and frontend.

```yaml
dependsOn: CodeQuality
```

Two jobs are used:

```text
BackendDockerBuild
FrontendDockerBuild
```

The backend image is created using:

```bash
docker build \
  -t flavorforge-backend:$(Build.BuildId) \
  -t flavorforge-backend:latest \
  ./backend
```

The frontend image is created using:

```bash
docker build \
  -f frontend/Dockerfile \
  -t flavorforge-frontend:$(Build.BuildId) \
  -t flavorforge-frontend:latest \
  frontend
```

The images are exported as artifacts so that the pipeline retains the generated Docker image files.

---

# 9.10 Trivy Security Scan

The **TrivyScan** stage performs container and filesystem security scanning.

It contains:

```text
TrivyFilesystem
TrivyImageScan
```

### Filesystem Scan

The repository is scanned using:

```bash
trivy fs .
```

Both table and JSON reports are generated.

### Docker Image Scan

The backend and frontend images are rebuilt and scanned using:

```bash
trivy image flavorforge-backend:latest
trivy image flavorforge-frontend:latest
```

The generated reports are published as pipeline artifacts.

This provides a DevSecOps security validation step before image publishing and deployment.

---

# 9.11 Push Images to Azure Container Registry

The **Push** stage publishes the backend and frontend Docker images to Azure Container Registry.

The configured service connection is:

```text
flavorforge-acr-connection
```

The registry is:

```text
flavorforgeacr2026ms.azurecr.io
```

The repositories are:

```text
flavorforge-backend
flavorforge-frontend
```

The image tag is based on:

```text
$(Build.BuildId)
```

The pipeline uses the Azure DevOps `Docker@2` task to build and push the images.

The resulting images follow this pattern:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:<BuildId>

flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:<BuildId>
```

---

# 9.12 Deploy to AKS

The **Deploy** stage runs after the images have been pushed to ACR.

The configured Azure service connection is:

```text
flavorforge-azure-sc
```

The Azure resources are:

```text
Resource Group:
flavorforge-rg

AKS Cluster:
flavorforge-aks
```

The pipeline obtains AKS credentials:

```bash
az aks get-credentials \
  --resource-group $(aksResourceGroup) \
  --name $(aksClusterName) \
  --overwrite-existing
```

The production Kustomize configuration is then applied:

```bash
kubectl apply -k kubernetes/overlays/prod
```

The backend and frontend deployments are updated with the newly created image tag.

The pipeline waits for the rollout to complete:

```bash
kubectl rollout status deployment/backend-prod -n flavorforge-prod

kubectl rollout status deployment/frontend-prod -n flavorforge-prod
```

This ensures that the pipeline does not report successful deployment until the Kubernetes workloads complete their rollout.

---

# 9.13 DevSecOps Report

The **AIReports** stage generates a Markdown DevSecOps summary.

The report contains information such as:

```text
Build ID
Pipeline status
Backend build
Frontend build
Backend smoke test
Dependency audit
SonarCloud analysis
Docker image build
Trivy filesystem scan
Trivy image scan
```

The report is published as the pipeline artifact:

```text
ai-devsecops-report
```

This provides a build-level summary of the DevSecOps validation performed during the pipeline.

---

# 9.14 Development Deployment

The **DeployDev** stage represents the development deployment.

The YAML references the environment:

```yaml
environment: "FlavorForge-Dev"
```

The development deployment is currently a **release simulation**.

The pipeline displays:

```text
Environment
Build ID
Branch
```

and then executes a simulated deployment step.

The important point is that the environment is referenced directly by the pipeline YAML.

Therefore, **FlavorForge-Dev was not created as an Azure DevOps Library variable group**.

The environment is a separate Azure DevOps Environment resource used by the deployment job.

---

# 9.15 QA Deployment

The **DeployQA** stage runs after Development.

```yaml
dependsOn:
  - DeployDev
```

The QA variable group is referenced from YAML:

```yaml
variables:
  - group: FlavorForge-QA-Variables
```

The deployment job uses:

```yaml
environment: FlavorForge-QA
```

The pipeline displays QA configuration information such as:

```text
Environment
Build Number
Build ID
Repository
Branch
Commit
Requested By
API URL
Log Level
```

The QA deployment is currently implemented as a release simulation.

The important control is the Azure DevOps environment:

```text
FlavorForge-QA
```

The environment contains the configured approval check.

---

# 9.16 Production Deployment

The **DeployProd** stage runs after QA.

```yaml
dependsOn:
  - DeployQA
```

The production variable group is referenced from YAML:

```yaml
variables:
  - group: FlavorForge-Prod-Variables
```

The deployment job uses:

```yaml
environment: FlavorForge-Prod
```

The production deployment is also currently implemented as a release simulation.

The pipeline displays production deployment information including:

```text
Environment
Build Number
Build ID
Repository
Branch
Commit
Requested By
API URL
Log Level
```

The production environment contains the configured approval check.

---

# 9.17 QA and Production Approval Flow

The QA and Production stages are controlled through Azure DevOps Environment approvals.

The intended release flow is:

```text
DeployDev
    ↓
FlavorForge-QA
    ↓
QA Approval
    ↓
DeployQA
    ↓
FlavorForge-Prod
    ↓
Production Approval
    ↓
DeployProd
```

The approval configuration is maintained outside the YAML pipeline.

This is important because environment approvals and checks are configured as Azure DevOps resource controls rather than hard-coded into the pipeline steps.

The approval configuration is documented separately in:

```text
08-library-approvals-and-checks.md
```

---

# 9.18 Release Summary

The final stage is:

```text
ReleaseSummary
```

It runs after Production:

```yaml
dependsOn:
  - DeployProd
```

The stage generates:

```text
reports/ReleaseSummary.md
```

The summary contains:

```text
Build Number
Build ID
Repository
Branch
Commit
Requested By
Development status
QA status
Production status
Generation date
```

The report is published as:

```text
release-summary
```

This provides a final record of the pipeline execution.

---

# 9.19 Creating the Azure DevOps Pipeline

Open the Azure DevOps project.

Navigate to:

```text
Pipelines
→ Pipelines
→ New pipeline
```

Select the repository source.

Choose:

```text
GitHub
```

Select the FlavorForge repository:

```text
flavorforge-azure-devsecops-capstone
```

Azure DevOps detects the repository's YAML pipeline.

Select:

```text
Existing Azure Pipelines YAML file
```

Select:

```text
/azure-pipelines.yml
```

Review the YAML definition.

Then select:

```text
Run
```

Azure DevOps creates the pipeline and starts the first execution.

---

# 9.20 Pipeline YAML Repository Verification

Before running the pipeline, verify that the YAML file exists at the repository root.

From the local terminal:

```bash
cd ~/flavorforge-azure-devsecops-capstone

ls -l azure-pipelines.yml
```

Expected result:

```text
azure-pipelines.yml
```

The pipeline file can also be inspected using:

```bash
head -50 azure-pipelines.yml
```

---

# 9.21 Verify the Pipeline in Azure DevOps

After creating the pipeline, navigate to:

```text
Pipelines
→ Pipelines
```

The FlavorForge pipeline should appear in the pipeline list.

Open the pipeline to view its execution.

The pipeline should display the configured stages:

```text
Build
Test
Security
CodeQuality
DockerBuild
TrivyScan
Push
Deploy
AIReports
DeployDev
DeployQA
DeployProd
ReleaseSummary
```

A successful execution should show the completed stages as successful.

---

# 9.22 Pipeline Execution Evidence

The repository contains pipeline execution screenshots under:

```text
screenshots/pipeline/
```

The available evidence includes:

![Pipeline Run](../../../screenshots/pipeline/6-pipelines-run.png)

![Pipeline Test Stage](../../../screenshots/pipeline/7-test.png)

![Successful Pipeline Run](../../../screenshots/pipeline/8-pipelines-run-pass.png)

![Advanced Pipeline Successful Run](../../../screenshots/pipeline/9-advance-pipelines-run-pass.png)

![Pipeline Execution](../../../screenshots/pipeline/13-pipelines-run.png)

These screenshots provide visual evidence of Azure DevOps pipeline execution and successful validation.

---

# 9.23 Pipeline Architecture

The complete CI/CD flow can be summarized as:

```text
GitHub
   │
   │ Push to main
   ▼
Azure DevOps Pipeline
   │
   ├── Build
   │
   ├── Test
   │
   ├── Security
   │
   ├── SonarCloud
   │
   ├── Docker Build
   │
   ├── Trivy Scan
   │
   ├── Push Images
   │       │
   │       ▼
   │   Azure Container Registry
   │
   ├── Deploy to AKS
   │
   ├── Dev Deployment
   │
   ├── QA Approval
   │
   ├── QA Deployment
   │
   ├── Production Approval
   │
   ├── Production Deployment
   │
   └── Release Summary
```

This creates a single automated path from source-code change to controlled environment deployment.

---

# 9.24 Verification Checklist

The pipeline creation is complete when the following have been verified:

* [x] `azure-pipelines.yml` exists in the repository root.
* [x] Pipeline trigger is configured for `main`.
* [x] Microsoft-hosted Ubuntu agent is configured.
* [x] Backend build is configured.
* [x] Frontend build is configured.
* [x] Backend tests are configured.
* [x] Frontend tests are configured.
* [x] Dependency security scanning is configured.
* [x] SonarCloud analysis is configured.
* [x] Docker image builds are configured.
* [x] Trivy filesystem scanning is configured.
* [x] Trivy Docker image scanning is configured.
* [x] ACR image publishing is configured.
* [x] AKS deployment is configured.
* [x] Development environment is referenced.
* [x] QA variable group is referenced.
* [x] QA environment is referenced.
* [x] Production variable group is referenced.
* [x] Production environment is referenced.
* [x] QA approval is configured through Azure DevOps.
* [x] Production approval is configured through Azure DevOps.
* [x] DevSecOps report is generated.
* [x] Release summary is generated.
* [x] Pipeline execution has been verified.

---

# 9.25 Final Result

The FlavorForge Azure DevOps pipeline is implemented as a YAML-based CI/CD workflow.

The pipeline integrates:

```text
GitHub
   ↓
Azure DevOps
   ↓
Build & Test
   ↓
Security Validation
   ↓
SonarCloud
   ↓
Docker
   ↓
Trivy
   ↓
Azure Container Registry
   ↓
Azure Kubernetes Service
   ↓
Development
   ↓
QA Approval
   ↓
   QA
   ↓
Production Approval
   ↓
Production
```

The pipeline provides automated application validation, security checks, container image management, Kubernetes deployment, environment controls, and release reporting.