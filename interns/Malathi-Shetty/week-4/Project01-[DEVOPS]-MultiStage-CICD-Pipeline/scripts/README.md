
# 🛠️ FlavorForge Automation Scripts

The `scripts` directory contains automation scripts used to simplify common development, deployment, and operational activities for the **FlavorForge Azure DevSecOps Capstone Project**.

These scripts reduce manual effort by automating repetitive tasks such as:

- Installing application dependencies
- Cleaning generated artifacts
- Deploying applications to Kubernetes
- Verifying deployment health

The scripts follow DevOps automation practices by providing a consistent and repeatable workflow for developers and operations teams.

---

# 📂 Directory Structure

```text
scripts/
│
├── clean.sh
├── setup.sh
├── deploy.sh
└── verify.sh
````

| Script    | Purpose                                          |
| --------- | ------------------------------------------------ |
| setup.sh  | Install frontend and backend dependencies        |
| clean.sh  | Remove generated local artifacts                 |
| deploy.sh | Deploy application to Kubernetes using Kustomize |
| verify.sh | Validate Kubernetes deployment health            |

---

# 🎯 Purpose

The automation scripts support the complete FlavorForge development lifecycle.

They help with:

* Local developer environment setup
* Dependency management
* Workspace cleanup
* Kubernetes deployment automation
* Post-deployment validation
* CI/CD workflow integration

The goal is to reduce manual commands and provide a production-style DevOps workflow.

---

# 🏗️ Script Workflow

```text
Developer
    │
    ▼
setup.sh
    │
    ▼
Install Dependencies
    │
    ▼
Application Development
    │
    ▼
Run Tests
    │
    ▼
clean.sh
    │
    ▼
Remove Generated Artifacts
    │
    ▼
Azure DevOps Pipeline
    │
    ▼
Build Docker Images
    │
    ▼
Push Images to ACR
    │
    ▼
deploy.sh
    │
    ▼
Deploy to AKS
    │
    ▼
verify.sh
    │
    ▼
Validate Application Health
```

---

# 🔧 Prerequisites

Before executing the scripts, ensure the following tools are installed.

| Tool      | Purpose                   |
| --------- | ------------------------- |
| Git       | Source control            |
| Node.js   | Application runtime       |
| npm       | Dependency management     |
| Docker    | Container image building  |
| kubectl   | Kubernetes management     |
| Azure CLI | Azure resource management |

Verify installed versions:

```bash
node --version

npm --version

docker --version

kubectl version --client

az version
```

---

# 🔐 Script Permissions

Shell scripts require execute permission.

Grant permission:

```bash
chmod +x scripts/*.sh
```

Execute scripts:

```bash
./scripts/<script-name>.sh
```

Example:

```bash
./scripts/setup.sh
```

---


# 📦 setup.sh

## Purpose

The `setup.sh` script prepares the local development environment by installing all required application dependencies.

It automates the dependency installation process for both:

- Backend application
- Frontend application

This ensures that a new developer can quickly prepare the project after cloning the repository.

---

## Activities Performed

The script performs the following operations:

1. Navigate to backend directory
2. Install backend npm dependencies
3. Navigate to frontend directory
4. Install frontend npm dependencies

---

## Manual Equivalent Commands

Backend setup:

```bash
cd backend
npm install
````

Frontend setup:

```bash
cd frontend
npm install
```

---

## Usage

Run from project root:

```bash
./scripts/setup.sh
```

Alternative:

```bash
bash scripts/setup.sh
```

---

## Expected Result

After successful execution:

```text
backend/
└── node_modules/

frontend/
└── node_modules/
```

The development environment is ready for:

* Local application execution
* Testing
* Docker image creation

---

# 🧹 clean.sh

## Purpose

The `clean.sh` script removes generated local files created during development and testing.

It helps maintain a clean workspace and prevents unnecessary artifacts from being committed to Git.

---

## Removed Artifacts

The script removes:

### Node.js Dependencies

```text
backend/node_modules

frontend/node_modules
```

---

### Test Coverage Reports

```text
backend/coverage

frontend/coverage
```

---

### Frontend Production Build

```text
frontend/dist
```

---

## Manual Equivalent Commands

```bash
rm -rf backend/node_modules
rm -rf frontend/node_modules

rm -rf backend/coverage
rm -rf frontend/coverage

rm -rf frontend/dist
```

---

## Usage

Run:

```bash
./scripts/clean.sh
```

Alternative:

```bash
bash scripts/clean.sh
```

---

## Benefits

The cleanup script provides:

* Smaller workspace size
* Cleaner Git repository
* Reproducible builds
* Reduced Docker build context
* Removal of unnecessary generated files

---

# 🚀 deploy.sh

## Purpose

The `deploy.sh` script automates deployment of the FlavorForge application to Kubernetes.

It uses **Kustomize overlays** to deploy different environments without duplicating Kubernetes YAML files.

---

## Deployment Strategy

The project follows a Kubernetes base and overlay structure:

```text
kubernetes/
│
├── base/
│   └── Common Kubernetes resources
│
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The deployment script selects the required environment and applies the corresponding Kustomize configuration.

---

## Supported Environments

| Environment | Kustomize Path           |
| ----------- | ------------------------ |
| Development | kubernetes/overlays/dev  |
| QA          | kubernetes/overlays/qa   |
| Production  | kubernetes/overlays/prod |

---

## Manual Equivalent Commands

Development:

```bash
kubectl apply -k kubernetes/overlays/dev
```

QA:

```bash
kubectl apply -k kubernetes/overlays/qa
```

Production:

```bash
kubectl apply -k kubernetes/overlays/prod
```

---

## Usage

Example:

```bash
./scripts/deploy.sh dev
```

QA deployment:

```bash
./scripts/deploy.sh qa
```

Production deployment:

```bash
./scripts/deploy.sh prod
```

---


## Deployment Flow

The deployment process follows this workflow:

```text
deploy.sh
    │
    ▼
Select Environment
    │
    ▼
Apply Kustomize Overlay
    │
    ▼
Kubernetes API Server
    │
    ▼
Azure Kubernetes Service (AKS)
    │
    ▼
FlavorForge Application Pods
````

---

## Kubernetes Resources Managed

The deployment script applies the following Kubernetes resources:

* Namespace
* Backend Deployment
* Frontend Deployment
* Backend Service
* Frontend Service
* ConfigMaps
* Secrets
* Ingress
* Horizontal Pod Autoscaler (HPA)

---

## Environment Isolation

Each environment maintains separate configuration using Kustomize overlays.

Example:

```text
Development

kubernetes/overlays/dev
        │
        ▼
flavorforge-dev namespace


QA

kubernetes/overlays/qa
        │
        ▼
flavorforge-qa namespace


Production

kubernetes/overlays/prod
        │
        ▼
flavorforge-prod namespace
```

This provides:

* Environment separation
* Safer deployments
* Easier configuration management
* Reduced YAML duplication

---

# 🔍 verify.sh

## Purpose

The `verify.sh` script validates the health and availability of the deployed FlavorForge application after Kubernetes deployment.

It provides a quick operational check to confirm whether the deployment was successful.

---

## Verification Checks

The script validates:

* Kubernetes namespace status
* Running Pods
* Deployment availability
* Services
* Horizontal Pod Autoscaler status
* Application health endpoints

---

## Usage

Run:

```bash id="o7tx6d"
./scripts/verify.sh
```

Alternative:

```bash id="v3w8p9"
bash scripts/verify.sh
```

---

## Manual Verification Commands

### Check Pods

Development:

```bash id="2d6m7f"
kubectl get pods -n flavorforge-dev
```

QA:

```bash id="j0l5iq"
kubectl get pods -n flavorforge-qa
```

Production:

```bash id="8qv6wz"
kubectl get pods -n flavorforge-prod
```

---

### Check Deployments

```bash id="4yxz6w"
kubectl get deployments -n flavorforge-dev
```

Expected output:

```text
NAME        READY   UP-TO-DATE   AVAILABLE
frontend    1/1     1            1
backend     1/1     1            1
```

---

### Check Services

```bash id="a7k8qp"
kubectl get services -n flavorforge-dev
```

---

### Check HPA

```bash id="m4kq0p"
kubectl get hpa -n flavorforge-dev
```

Expected:

```text
NAME           REFERENCE              TARGET
backend-hpa    Deployment/backend     CPU utilization
```

---

## Expected Result

A successful verification should confirm:
```text
✅ Kubernetes resources created successfully
✅ Pods are running
✅ Deployments are available
✅ Services are reachable
✅ HPA is configured
✅ Application is ready for users
```

---

# 🔐 DevOps Best Practices

The automation scripts follow common DevOps practices:

* Automation instead of manual execution
* Repeatable deployment process
* Environment-specific deployment support
* Faster developer onboarding
* Reduced operational errors
* CI/CD pipeline integration

---

# 🔄 CI/CD Pipeline Integration

The scripts can be integrated into Azure DevOps or other CI/CD platforms.

Example workflow:

```text
Azure DevOps Pipeline
        │
        ▼
Checkout Source Code
        │
        ▼
Install Dependencies
        │
        ▼
Run Tests
        │
        ▼
Build Docker Images
        │
        ▼
Push Images to Azure Container Registry
        │
        ▼
Execute deploy.sh
        │
        ▼
Execute verify.sh
        │
        ▼
Application Running on AKS
```

---


# 🔍 Complete Operational Workflow

The automation scripts support the complete FlavorForge application lifecycle from local development to Kubernetes deployment.

The complete workflow is:

```text
Developer Machine
        │
        ▼
Run setup.sh
        │
        ▼
Install Backend & Frontend Dependencies
        │
        ▼
Develop Application Changes
        │
        ▼
Run Application Tests
        │
        ▼
Run clean.sh
        │
        ▼
Remove Generated Artifacts
        │
        ▼
Azure DevOps Pipeline
        │
        ▼
Build Docker Images
        │
        ▼
Push Images to Azure Container Registry (ACR)
        │
        ▼
Deploy Application to AKS
        │
        ▼
Run verify.sh
        │
        ▼
Validate Application Health
````

This workflow follows DevOps principles:

* Automation over manual execution
* Repeatable deployments
* Consistent environments
* Faster troubleshooting

---

# 🛠️ Troubleshooting

## Issue 1: Permission Denied While Running Script

### Error

```text
permission denied: ./scripts/setup.sh
```

### Solution

Grant execute permissions:

```bash
chmod +x scripts/*.sh
```

Run again:

```bash
./scripts/setup.sh
```

---

# Issue 2: npm Install Failure

### Symptoms

* Dependency installation errors
* Package conflicts
* Corrupted node_modules

### Solution

Remove existing dependencies:

```bash
./scripts/clean.sh
```

Install dependencies again:

```bash
./scripts/setup.sh
```

---

# Issue 3: Kubernetes Deployment Failure

Check AKS connectivity:

```bash
kubectl cluster-info
```

Check application pods:

```bash
kubectl get pods -n flavorforge
```

Describe unhealthy pods:

```bash
kubectl describe pod <pod-name> -n flavorforge
```

Check application logs:

Backend:

```bash
kubectl logs <backend-pod-name> -n flavorforge
```

Frontend:

```bash
kubectl logs <frontend-pod-name> -n flavorforge
```

---

# Issue 4: verify.sh Shows Deployment Failure

Check deployments:

```bash
kubectl get deployments -n flavorforge
```

Expected:

```text
READY   UP-TO-DATE   AVAILABLE
```

Check services:

```bash
kubectl get svc -n flavorforge
```

Check autoscaling:

```bash
kubectl get hpa -n flavorforge
```

---

# Issue 5: Docker Image Problems

Check available images:

```bash
docker images
```

Check running containers:

```bash
docker ps
```

Rebuild images:

Backend:

```bash
docker build -t flavorforge-backend ./backend
```

Frontend:

```bash
docker build -t flavorforge-frontend ./frontend
```

---

# 🚀 DevOps Usage Examples

## New Developer Setup

A new developer can prepare the project environment using:

```bash
./scripts/setup.sh
```

This automatically installs:

* Backend dependencies
* Frontend dependencies

---

## Clean Workspace Before Commit

Before committing changes:

```bash
./scripts/clean.sh
```

Benefits:

* Removes unnecessary files
* Reduces repository size
* Prevents accidental commits of generated artifacts

---

## Kubernetes Deployment

Deploy Development environment:

```bash
./scripts/deploy.sh dev
```

Deploy QA environment:

```bash
./scripts/deploy.sh qa
```

Deploy Production environment:

```bash
./scripts/deploy.sh prod
```

---

## Post Deployment Validation

After deployment:

```bash
./scripts/verify.sh
```

The verification confirms:

* Kubernetes namespace availability
* Pod status
* Deployment health
* Service availability
* HPA configuration

---

# 🏢 Enterprise DevOps Usage

These scripts represent common automation practices used in enterprise DevOps environments.

| Script    | Enterprise Usage                |
| --------- | ------------------------------- |
| setup.sh  | Developer onboarding automation |
| clean.sh  | Build environment cleanup       |
| deploy.sh | Kubernetes release automation   |
| verify.sh | Deployment validation           |

The scripts can be integrated with:

* Azure DevOps Pipelines
* GitHub Actions
* Jenkins CI/CD
* Release automation workflows

Example CI/CD integration:

```text
Azure DevOps Pipeline
          │
          ▼
Install Dependencies
          │
          ▼
Execute Tests
          │
          ▼
Build Docker Images
          │
          ▼
Push Images to ACR
          │
          ▼
Deploy to AKS
          │
          ▼
Run verify.sh
```

---

# 📚 Learning Outcomes

The automation scripts demonstrate practical experience with:

* Bash scripting
* Linux automation
* Application lifecycle management
* Kubernetes deployment automation
* Kustomize-based deployments
* Azure Kubernetes Service operations
* DevOps workflow automation
* CI/CD integration concepts
* Cloud-native application management

---

# 👩‍💻 Author

**Malathi Shetty**
