# 8. Prerequisites

Before building FlavorForge, make sure the following software and accounts are available.

This project was developed and tested on Ubuntu Linux using Azure Cloud services. The same versions (or newer compatible versions) are recommended to avoid unexpected issues.

---

## Hardware Requirements

| Requirement | Recommended                      |
| ----------- | -------------------------------- |
| CPU         | Dual Core or better              |
| RAM         | 8 GB minimum (16 GB recommended) |
| Storage     | 25 GB free space                 |
| Internet    | Stable broadband connection      |

---

## Operating System

The project was developed on:

* Ubuntu 24.04 LTS

It can also be executed on:

* Windows 11 (WSL2 recommended)
* macOS
* Other modern Linux distributions

---

## Required Accounts

Create the following accounts before beginning.

| Service                 | Purpose                |
| ----------------------- | ---------------------- |
| GitHub                  | Source code repository |
| Microsoft Azure         | Cloud infrastructure   |
| Azure DevOps            | CI/CD pipelines        |
| SonarCloud              | Static code analysis   |
| Docker Hub *(optional)* | Local testing          |
| Visual Studio Code      | Development            |

---

## Required Software

| Tool                           | Purpose                    |
| ------------------------------ | -------------------------- |
| Git                            | Version control            |
| Docker Desktop / Docker Engine | Containerization           |
| Node.js (LTS)                  | Frontend & Backend runtime |
| npm                            | Package manager            |
| Azure CLI                      | Azure resource management  |
| kubectl                        | Kubernetes management      |
| Kustomize                      | Kubernetes overlays        |
| Helm                           | Kubernetes package manager |
| ArgoCD CLI *(optional)*        | GitOps management          |

---

## Verify Installation

Run the following commands to verify the required software is installed.

### Git

```bash
git --version
```

Example:

```text
git version 2.43.0
```

---

### Node.js

```bash
node -v
```

Example

```text
v22.x.x
```

---

### npm

```bash
npm -v
```

Example

```text
10.x.x
```

---

### Docker

```bash
docker --version
```

Example

```text
Docker version 28.x.x
```

---

### Azure CLI

```bash
az version
```

---

### kubectl

```bash
kubectl version --client
```

---

### Kustomize

```bash
kubectl kustomize --help
```

or

```bash
kustomize version
```

---

### Helm

```bash
helm version
```

---

## Azure Login

Login to Azure.

```bash
az login
```

Verify the active subscription.

```bash
az account show
```

---

## Azure DevOps Preparation

Before creating the pipeline, the following should already exist:

* Azure DevOps Organization
* Azure DevOps Project
* Service Connection for Azure
* Service Connection for Azure Container Registry
* SonarCloud Service Connection

These will be configured later in the implementation section.

---

## Basic Knowledge Recommended

Although every step is explained in this documentation, familiarity with the following concepts will make the project easier to understand.

* Basic Git commands
* JavaScript fundamentals
* React basics
* Node.js basics
* Docker fundamentals
* Kubernetes basics
* Azure fundamentals
* YAML syntax
* REST APIs
* Linux terminal commands

No prior production DevOps experience is required. Every major command used in this project is explained throughout the implementation guide.

---

## Estimated Build Time

| Activity               | Approximate Time |
| ---------------------- | ---------------- |
| Clone repository       | 2 minutes        |
| Install dependencies   | 10–15 minutes    |
| Build Docker images    | 10 minutes       |
| Create Azure resources | 30–45 minutes    |
| Configure AKS          | 20 minutes       |
| Configure Azure DevOps | 30 minutes       |
| Configure ArgoCD       | 20 minutes       |
| End-to-End Validation  | 20 minutes       |

**Total Estimated Time:** **2.5 to 3.5 hours** (excluding Azure provisioning delays)

---

### 📸 Screenshot Suggestions

Capture the following for this section:

* `git --version`
* `node -v`
* `docker --version`
* `az version`
* `kubectl version --client`
* `helm version`
* `az account show`

---

Excellent. This is where the documentation becomes truly valuable.

Most READMEs jump straight to Docker or Kubernetes. In a real company, a new developer **always starts by getting the application running locally** before touching containers or cloud infrastructure.

This chapter documents that process.

---

# 9. Setting Up the Development Environment

After verifying all prerequisites, the next step is to prepare the local development environment.

The objective of this phase is to ensure that both the frontend and backend applications run successfully on the local machine before introducing Docker, Kubernetes, Azure DevOps, or ArgoCD.

Starting locally makes debugging much easier because application issues can be identified independently from infrastructure-related problems.

---

# 9.1 Clone the Repository

Clone the project from GitHub.

```bash
git clone https://github.com/<your-github-username>/flavorforge-azure-devsecops-capstone.git
```

Move into the project directory.

```bash
cd flavorforge-azure-devsecops-capstone
```

Verify the repository contents.

```bash
tree -I "node_modules"
```

Expected output:

```
README.md
backend/
frontend/
docker/
kubernetes/
docs/
argocd/
azure-pipelines.yml
argocd-pipeline.yml
...
```

📸 **Screenshot:** Repository cloned successfully.

---

# 9.2 Understanding the Repository Structure

Before writing code or deploying applications, it is important to understand how the repository is organized.

Each directory has a specific responsibility.

| Folder              | Purpose                      |
| ------------------- | ---------------------------- |
| frontend            | React application            |
| backend             | Express REST API             |
| kubernetes          | Kubernetes manifests         |
| argocd              | GitOps application manifests |
| docs                | Project documentation        |
| docker              | Docker-related documentation |
| scripts             | Automation scripts           |
| azure-pipelines.yml | Main CI pipeline             |
| argocd-pipeline.yml | GitOps bootstrap pipeline    |

Understanding this structure makes it much easier to locate configuration files during development and troubleshooting.

---

# 9.3 Install Backend Dependencies

Navigate to the backend directory.

```bash
cd backend
```

Install all required packages.

```bash
npm install
```

Expected output

```
added xxx packages
```

Verify that the installation completed without errors.

---

# 9.4 Install Frontend Dependencies

Return to the project root.

```bash
cd ..
```

Navigate to the frontend.

```bash
cd frontend
```

Install frontend packages.

```bash
npm install
```

Expected output

```
added xxx packages
```

---

# 9.5 Configure Environment Variables

The frontend and backend communicate using environment variables.

Create the backend environment file.

```bash
cd ../backend
```

Create

```
.env
```

Example configuration

```env
PORT=3000
NODE_ENV=development
```

---

Create the frontend environment file.

```bash
cd ../frontend
```

Create

```
.env
```

Example

```env
VITE_API_BASE_URL=http://localhost:3000
```

This tells the React application where the backend API is running during local development.

---

# 9.6 Start the Backend

Navigate to the backend.

```bash
cd backend
```

Start the application.

```bash
npm start
```

or

```bash
npm run dev
```

Expected output

```
Server running on port 3000
```

Open the health endpoint.

```
http://localhost:3000/api/health
```

Expected response

```json
{
  "status": "UP"
}
```

📸 **Screenshot:** Backend health endpoint.

---

# 9.7 Start the Frontend

Open another terminal.

Navigate to the frontend.

```bash
cd frontend
```

Run

```bash
npm run dev
```

Expected output

```
Local: http://localhost:5173
```

Open

```
http://localhost:5173
```

The FlavorForge homepage should load successfully.

📸 **Screenshot:** FlavorForge homepage running locally.

---

# 9.8 Verify Frontend and Backend Communication

The frontend communicates with the backend through REST APIs.

Verify that:

* Recipe data loads successfully.
* Backend health status is displayed.
* No CORS errors appear in the browser console.
* API requests return HTTP 200 responses.

Open Developer Tools.

Navigate to the **Network** tab.

Refresh the page.

Verify that requests such as:

```
GET /api/health
GET /api/recipes
```

return successful responses.

📸 **Screenshot:** Browser Network tab showing successful API requests.

---

# 9.9 Local Testing

Run backend tests.

```bash
cd backend

npm test
```

Expected output

```
PASS
```

Run frontend tests.

```bash
cd ../frontend

npm test
```

or

```bash
npm run test
```

Expected output

```
PASS
```

Verify code quality.

```bash
npm run lint
```

Expected output

```
No lint errors
```

---

# 9.10 What We Achieved

At this stage:

* ✅ Repository cloned successfully.
* ✅ Dependencies installed.
* ✅ Environment variables configured.
* ✅ Backend running locally.
* ✅ Frontend running locally.
* ✅ REST API communication verified.
* ✅ Unit tests executed.
* ✅ Local development environment ready.

This completes the application development setup. The project is now ready to be containerized using Docker in the next phase.

---

## 💡 Real-World Note

In most software companies, every developer is expected to run the application locally before making any code changes. This helps isolate application bugs from infrastructure issues. If the application does not work locally, deploying it to Docker, Kubernetes, or the cloud will not solve the underlying problem.

