# 🛠️ FlavorForge Prerequisites & Environment Setup

> This document explains every tool, account, and software required before starting the FlavorForge Azure DevSecOps Capstone Project.

---

# 📖 Why This Document Exists

One of the biggest challenges while learning DevOps is that tutorials often begin from the middle.

For example:

> "Create a Kubernetes deployment."

But...

- Where did Kubernetes come from?
- How was Docker installed?
- Which Azure services were created?
- Which accounts were required?
- Which software versions were used?

This document answers all of those questions.

If someone clones this repository six months from now, they should be able to prepare the same environment before writing a single line of code.

---

# 🏗️ Development Environment

The project was developed on the following environment.

| Component | Version |
|------------|----------|
| Operating System | Ubuntu 24.04 LTS (WSL2) |
| Windows | Windows 11 |
| Git | Latest |
| VS Code | Latest |
| Docker Desktop | Latest |
| Node.js | 22.x LTS |
| npm | Latest |
| Azure CLI | Latest |
| kubectl | Latest |
| Kustomize | Built into kubectl |
| Azure DevOps | Cloud |
| GitHub | Cloud |

---

# 💻 Hardware Used

Minimum recommended specifications

- 16 GB RAM
- 4 CPU Cores
- 50 GB Free Storage
- Stable Internet Connection

Recommended

- 32 GB RAM
- SSD Storage
- Docker Desktop using WSL2 backend

---

# ☁️ Cloud Services Used

The project uses Microsoft Azure.

Services created during the implementation:

- Azure Resource Group
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Azure DevOps
- Azure Pipelines
- Azure Service Connections
- Managed Identity
- Load Balancer
- Public IP

---

# 🔐 Accounts Required

Before starting the project create the following accounts.

| Service | Purpose |
|----------|----------|
| GitHub | Source Code Repository |
| Microsoft Azure | Cloud Infrastructure |
| Azure DevOps | CI/CD Pipeline |
| SonarCloud | Code Quality Analysis |

Optional

- Docker Hub
- Slack
- Microsoft Teams

---

# 📥 Software Installation

Install the following software before starting.

## Git

Verify installation

```bash
git --version
```

---

## Docker Desktop

Verify

```bash
docker --version
```

Also verify

```bash
docker ps
```

---

## Node.js

Verify

```bash
node -v
```

Verify npm

```bash
npm -v
```

---

## Azure CLI

Verify

```bash
az version
```

Login

```bash
az login
```

---

## kubectl

Verify

```bash
kubectl version --client
```

---

## Visual Studio Code

Install extensions

- Docker
- Kubernetes
- Azure Tools
- GitHub Pull Requests
- YAML
- Prettier
- ESLint

---

# 📂 Create Workspace

Create a workspace folder.

```bash
mkdir DevOpsProjects
```

Move inside

```bash
cd DevOpsProjects
```

Clone the repository

```bash
git clone https://github.com/<your-github>/flavorforge-azure-devsecops-capstone.git
```

Open VS Code

```bash
code .
```

---

# 🔍 Verify Everything

Run the following commands.

```bash
git --version
```

```bash
docker --version
```

```bash
node -v
```

```bash
npm -v
```

```bash
az version
```

```bash
kubectl version --client
```

Everything should execute successfully before continuing.

---

# 📚 Basic Knowledge Required

This project assumes beginner-level understanding of:

- Linux commands
- Git basics
- JavaScript
- Docker basics
- Kubernetes basics
- Azure fundamentals

Do not worry if you are not an expert.

Every concept used in this project is explained in the documentation.

---

# 🧠 Skills Learned During This Project

By completing this project you will gain hands-on experience with:

- React
- Node.js
- Express
- Docker
- Multi-stage Docker Builds
- Docker Compose
- Azure Container Registry
- Azure Kubernetes Service
- Kubernetes Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler
- Azure DevOps Pipelines
- SonarCloud
- Trivy
- GitOps
- ArgoCD

---

# 📸 Screenshots to Capture

Take screenshots of:

✅ Git installed

✅ Docker installed

✅ Azure CLI version

✅ kubectl version

✅ Node.js version

✅ VS Code

✅ Azure Portal

✅ Azure DevOps Organization

These screenshots will later be used in the implementation guide.

---

# ✅ Completion Checklist

Before moving to the next document verify:

- Git installed
- Docker working
- Azure CLI logged in
- kubectl installed
- VS Code installed
- GitHub account ready
- Azure subscription active
- Azure DevOps organization created

If all items are completed, proceed to:

**03-project-structure.md**