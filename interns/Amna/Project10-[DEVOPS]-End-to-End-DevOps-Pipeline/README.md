# Project 10: End-to-End DevOps Pipeline for a Web Application

> **Purpose of this guide**
>
> This README is a cleaned, reproducible version of the project workflow. It keeps the successful approach and intentionally leaves out experimental steps that caused avoidable errors during the original implementation.
>
> Commands in the main path are the working versions retained after validation. Earlier failed attempts are not reproduced as normal instructions. Environment-specific limitations that can still affect another learner are documented separately in the preventive troubleshooting section.
>
> The project starts with local application and Docker validation, includes **Floci-AZ** as a local Azure learning/emulation step, and then moves to **real Azure** for the final ACR, AKS, Application Gateway for Containers, Azure DevOps, and monitoring evidence.
>
> This guide is written for beginners. Follow the sections in order and do not skip a verification checkpoint unless you already have that part working.
>
> **Validation note:** This README was re-checked against the running project after an AKS stop/start cycle. Where the current Azure Portal or resume workflow differed from the earlier draft, the instructions were updated to match the observed working process.

---

## Table of Contents

1. [What You Will Build](#1-what-you-will-build)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Important Design Decisions](#4-important-design-decisions)
5. [Prerequisites](#5-prerequisites)
6. [Where to Run Each Command](#6-where-to-run-each-command)
7. [Prepare the Git Repository](#7-prepare-the-git-repository)
8. [Create the Flask Application](#8-create-the-flask-application)
9. [Create and Run Unit Tests](#9-create-and-run-unit-tests)
10. [Run the Application Locally](#10-run-the-application-locally)
11. [Dockerize the Application](#11-dockerize-the-application)
12. [Optional Local Azure Practice with Floci-AZ](#12-optional-local-azure-practice-with-floci-az)
13. [Prepare Azure](#13-prepare-azure)
14. [Create Azure Container Registry](#14-create-azure-container-registry)
15. [Prepare Application Gateway for Containers Prerequisites](#15-prepare-application-gateway-for-containers-prerequisites)
16. [Create the AKS Cluster](#16-create-the-aks-cluster)
17. [Connect kubectl to AKS](#17-connect-kubectl-to-aks)
18. [Create Kubernetes Manifests](#18-create-kubernetes-manifests)
19. [Create the Azure DevOps Project](#19-create-the-azure-devops-project)
20. [Create Azure DevOps Service Connections](#20-create-azure-devops-service-connections)
21. [Create the Azure Pipeline](#21-create-the-azure-pipeline)
22. [Commit and Push the Project](#22-commit-and-push-the-project)
23. [Create and Run the Azure DevOps Pipeline](#23-create-and-run-the-azure-devops-pipeline)
24. [Verify ACR and AKS Deployment](#24-verify-acr-and-aks-deployment)
25. [Optional Production Approval](#25-optional-production-approval)
26. [Create Application Gateway for Containers](#26-create-application-gateway-for-containers)
27. [Create the Gateway and HTTPRoute](#27-create-the-gateway-and-httproute)
28. [Test the Public Application](#28-test-the-public-application)
29. [Enable Container Insights and Managed Prometheus](#29-enable-container-insights-and-managed-prometheus)
30. [View Logs and Metrics](#30-view-logs-and-metrics)
31. [Optional Alert for Production Pod Restarts](#31-optional-alert-for-production-pod-restarts)
32. [Final Validation Checklist](#32-final-validation-checklist)
33. [Screenshot Checklist](#33-screenshot-checklist)
34. [Common Problems Prevented by This Guide](#34-common-problems-prevented-by-this-guide)
35. [Cost Management](#35-cost-management)
36. [Cleanup](#36-cleanup)
37. [Future Enhancements](#37-future-enhancements)
38. [Key Learning Outcomes](#38-key-learning-outcomes)
39. [Official References](#39-official-references)

---

# 1. What You Will Build

The goal is to build a small web application and take it through a complete DevOps lifecycle.

The finished flow is shown below:

![What You Will Build Diagram](screenshots/architecture/what-you-will-build-diagram.png)

The finished flow is:

```text
Developer
   |
   v
GitHub repository
   |
   v
Azure DevOps Pipeline
   |
   +--> Install dependencies
   +--> Run pytest tests
   +--> Build Docker image
   +--> Push image to Azure Container Registry
   |
   v
Azure Kubernetes Service
   |
   +--> staging namespace
   |      +--> 1 application pod
   |
   +--> production namespace
          +--> 2 application pods
          +--> Horizontal Pod Autoscaler
                    min: 2
                    max: 3
   |
   v
Application Gateway for Containers
   |
   +--> Gateway API
   +--> HTTPRoute
   |
   v
Public web application

Azure Monitor
   |
   +--> Container Insights
   +--> Log Analytics
   +--> Managed Prometheus metrics
   +--> Alerts
```

Before the real Azure deployment, this guide also includes:

```text
Local WSL / Linux environment
   |
   +--> Python virtual environment
   +--> pytest
   +--> Docker
   +--> Floci-AZ local Azure emulator
```

## Problem statement

Manual application deployment can lead to inconsistent environments, missed testing, untracked versions, slow releases, and difficult troubleshooting.

This project solves that problem by demonstrating a repeatable workflow where code is tested, packaged into a container, stored in a registry, deployed to Kubernetes, exposed through an Azure Layer 7 gateway, and monitored centrally.

---

# 2. Architecture

## Local learning architecture

```text
Browser / curl
      |
      v
Flask application
      |
      v
Docker container
      |
      +--> Unit tests with pytest
      |
      +--> Optional Floci-AZ local Azure API practice
```

## Final Azure architecture

![End-to-End DevOps Pipeline Architecture](screenshots/architecture/devops-architecture.png)

```text
GitHub
   |
   v
Azure DevOps
   |
   +--> Validate
   |      +--> Python dependencies
   |      +--> pytest
   |
   +--> Docker build
   |      +--> Build ID image tag
   |      +--> latest tag
   |
   v
Azure Container Registry
   |
   v
Azure Kubernetes Service
   |
   +--> staging namespace
   |
   +--> production namespace
   |      +--> Deployment
   |      +--> ClusterIP Service
   |      +--> HPA
   |
   v
ALB Controller
   |
   v
Application Gateway for Containers
   |
   +--> ApplicationLoadBalancer
   +--> Gateway
   +--> HTTPRoute
   |
   v
Internet users

Azure Monitor
   |
   +--> Container Insights
   +--> Log Analytics workspace
   +--> ContainerLogV2
   +--> Managed Prometheus
```

---

# 3. Technology Stack

| Area | Technology |
|---|---|
| Application | Python 3.12, Flask |
| Production web server | Gunicorn |
| Testing | pytest |
| Source control | Git, GitHub |
| Local environment | WSL Ubuntu / Linux |
| Containerization | Docker |
| Local Azure learning | Floci-AZ |
| CI/CD | Azure DevOps Pipelines |
| Container registry | Azure Container Registry |
| Kubernetes | Azure Kubernetes Service |
| Kubernetes autoscaling | Horizontal Pod Autoscaler |
| Public ingress | Application Gateway for Containers |
| Kubernetes ingress API | Gateway API |
| Logs | Container Insights + Log Analytics |
| Metrics | Azure Monitor managed Prometheus |
| Alerts | Azure Monitor Alerts |

---

# 4. Important Design Decisions

These decisions are intentional and help avoid problems encountered during the original learning process.

### 4.1 Use WSL for local development

Use WSL for:

```text
Git
Python
pytest
Docker commands
editing files
```

### 4.2 Use Azure Cloud Shell for Azure and AKS administration

Use Azure Cloud Shell for:

```text
az commands
AKS creation
kubectl against real AKS
Application Gateway for Containers
Azure Monitor setup
```

This avoids confusion between a local Minikube or K3s kubeconfig and the real AKS cluster.

### 4.3 Floci-AZ and the final Azure environment

Floci-AZ was used during the local learning phase to practice Azure-compatible APIs without creating unnecessary cloud resources.

The final deployment uses real Azure services:

- Azure Container Registry
- Azure Kubernetes Service
- Application Gateway for Containers
- Azure Monitor
- Container Insights

Floci-AZ is therefore not part of the production deployment.

### 4.4 Ingress design

Earlier local Kubernetes experiments used classic `Ingress` resources. The final Azure deployment uses Application Gateway for Containers with the Kubernetes Gateway API instead.

The final routing path is:

```text
ApplicationLoadBalancer
→ Gateway
→ HTTPRoute
→ Kubernetes Service
→ Application Pods
```

For this reason, the old classic Ingress manifests are not included in the final project.

### 4.5 Keep enough pod capacity on a one-node learning cluster

Monitoring and Application Gateway add-ons create several system pods.

For a small one-node learning cluster, this guide therefore uses:

```text
Staging replicas:       1
Production replicas:    2
Production HPA minimum: 2
Production HPA maximum: 3
```

A real production design should normally use multiple nodes and more spare capacity.

During an optional rolling-update experiment, the original one-node cluster reached its 30-pod limit because system pods, staging pods, and production pods occupied every available slot. The final smaller replica counts above are therefore deliberate and help avoid repeating that capacity problem in the normal walkthrough.

---

# 5. Prerequisites

You need the following accounts:

- GitHub account
- Azure subscription
- Azure DevOps organization
- Permission to create Azure resources
- Permission to create Azure DevOps service connections

For the local Windows setup used by this project, install:

- WSL with Ubuntu
- Docker Desktop with WSL integration enabled
- Git
- Python 3
- A code editor such as Visual Studio Code

## 5.1 Install WSL if needed

Open **PowerShell as Administrator**:

```powershell
wsl --install -d Ubuntu-22.04
```

Restart Windows if requested.

Open Ubuntu and create your Linux username and password.

## 5.2 Install local Linux packages

In WSL Ubuntu:

```bash
sudo apt update
sudo apt install -y \
  python3 \
  python3-venv \
  python3-pip \
  git \
  curl \
  jq
```

Verify:

```bash
python3 --version
git --version
curl --version
```

## 5.3 Verify Docker

Start Docker Desktop.

Make sure Docker Desktop has WSL integration enabled for your Ubuntu distribution.

In WSL:

```bash
docker version
```

Then test:

```bash
docker run --rm hello-world
```

Do not continue until Docker works.

---

# 6. Where to Run Each Command

To keep the workflow clear, use these two environments.

| Task | Recommended place |
|---|---|
| Git clone, branch, commit | WSL |
| Create/edit application files | WSL |
| Python virtual environment | WSL |
| pytest | WSL |
| Docker build/run | WSL |
| Floci-AZ | WSL |
| Azure resource creation | Azure Cloud Shell |
| AKS kubectl commands | Azure Cloud Shell |
| Application Gateway setup | Azure Cloud Shell |
| Azure Monitor setup | Azure Cloud Shell |
| Azure DevOps configuration | Browser |
| GitHub pull requests | Browser |

> **Important:** If `kubectl config current-context` on WSL says `minikube`, do not use that terminal to administer AKS unless you intentionally retrieve AKS credentials there. For this guide, use Azure Cloud Shell for AKS.

## 6.1 Screenshot convention

This repository uses the case-sensitive folder name:

```text
screenshots/
```

Screenshots are placed directly after the step they prove. Longer alerting and troubleshooting sequences are collapsed inside `<details>` blocks so the instructions remain easy to follow.

---

# 7. Prepare the Git Repository

This project was created inside an internship repository.

A suitable project path is:

```text
interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline
```

The square brackets in `[DEVOPS]` are valid in the Git repository, but they need special handling later in one Azure Pipelines manifest path. This guide already includes the correct fix.

## 7.1 Fork the repository

If you are working from an internship or shared repository:

1. Open the main repository on GitHub.
2. Click **Fork**.
3. Create the fork under your own GitHub account.

## 7.2 Clone your fork

In WSL:

```bash
cd ~
mkdir -p projects
cd projects
```

Clone:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
```

Enter it:

```bash
cd YOUR_REPOSITORY
```

## 7.3 Confirm the remote

```bash
git remote -v
```

Make sure `origin` points to **your fork**.

## 7.4 Configure Git identity

```bash
git config user.name "YOUR_GITHUB_USERNAME"
git config user.email "YOUR_EMAIL"
```

Check:

```bash
git config user.name
git config user.email
```

## 7.5 Create the project branch

```bash
git checkout -b capstone-project10
```

Verify:

```bash
git branch --show-current
```

Expected:

```text
capstone-project10
```

## 7.6 Create the project folders

```bash
mkdir -p 'interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline'
cd 'interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline'
```

Create the initial structure:

```bash
mkdir -p \
  app/app/templates \
  app/app/static \
  app/tests \
  k8s/staging \
  k8s/production \
  docs \
  screenshots/application \
  screenshots/aks \
  screenshots/azure-setup \
  screenshots/gateway \
  screenshots/pipeline \
  screenshots/monitoring \
  screenshots/troubleshooting
```

The final structure will look like:

```text
Project10-[DEVOPS]-End-to-End-DevOps-Pipeline/
├── app/
│   ├── app/
│   │   ├── static/
│   │   │   └── style.css
│   │   ├── templates/
│   │   │   └── index.html
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── tests/
│   │   └── test_app.py
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── requirements.txt
│   └── run.py
├── k8s/
│   ├── staging/
│   │   ├── namespace.yaml
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── production/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   └── production-namespace.yaml
├── docs/
├── screenshots/
│   ├── aks/
│   ├── application/
│   ├── azure-setup/
│   ├── gateway/
│   ├── monitoring/
│   ├── pipeline/
│   └── troubleshooting/
├── azure-pipelines.yml
├── .gitignore
└── README.md
```

---

# 8. Create the Flask Application

If you already have the application files from this repository, you can skip to [Section 9](#9-create-and-run-unit-tests).

The code below is a small reproducible sample with the same DevOps-focused endpoints used by this project.

## 8.1 Create `requirements.txt`

From the project root:

```bash
cat > app/requirements.txt <<'EOF'
Flask==3.1.1
gunicorn==23.0.0
pytest==8.4.1
EOF
```

## 8.2 Create the Flask application factory

```bash
cat > app/app/__init__.py <<'EOF'
from flask import Flask

from .routes import main


def create_app():
    app = Flask(__name__)
    app.register_blueprint(main)
    return app
EOF
```

## 8.3 Create the routes

```bash
cat > app/app/routes.py <<'EOF'
import os
import socket
from datetime import datetime, timezone

from flask import Blueprint, jsonify, render_template

main = Blueprint("main", __name__)

STARTED_AT = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")


def application_info():
    return {
        "name": os.getenv("APP_NAME", "DevOps Capstone Web App"),
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "environment": os.getenv("APP_ENVIRONMENT", "development"),
        "hostname": socket.gethostname(),
        "deployment_time": os.getenv("DEPLOYMENT_TIME", STARTED_AT),
    }


@main.get("/")
def index():
    return render_template("index.html", app=application_info())


@main.get("/health")
def health():
    app = application_info()
    return jsonify(
        status="healthy",
        application=app["name"],
        version=app["version"],
        environment=app["environment"],
    )


@main.get("/version")
def version():
    return jsonify(**application_info())


@main.get("/api/status")
def api_status():
    app = application_info()
    return jsonify(
        status="healthy",
        service=app["name"],
        environment=app["environment"],
        hostname=app["hostname"],
    )
EOF
```

## 8.4 Create `run.py`

```bash
cat > app/run.py <<'EOF'
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
EOF
```

## 8.5 Create the HTML page

```bash
cat > app/app/templates/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ app.name }}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <main class="card">
        <div class="badge">DevOps Capstone Project</div>
        <h1>{{ app.name }}</h1>
        <p class="healthy">Healthy</p>

        <dl>
            <div>
                <dt>Version</dt>
                <dd>{{ app.version }}</dd>
            </div>
            <div>
                <dt>Environment</dt>
                <dd>{{ app.environment }}</dd>
            </div>
            <div>
                <dt>Container / Hostname</dt>
                <dd>{{ app.hostname }}</dd>
            </div>
            <div>
                <dt>Deployment Time</dt>
                <dd>{{ app.deployment_time }}</dd>
            </div>
        </dl>

        <p class="links">
            <a href="/health">/health</a>
            <a href="/version">/version</a>
            <a href="/api/status">/api/status</a>
        </p>
    </main>
</body>
</html>
EOF
```

## 8.6 Create the CSS

```bash
cat > app/app/static/style.css <<'EOF'
body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: Arial, sans-serif;
    background: #f4f7fb;
    color: #1f2937;
}

.card {
    width: min(720px, 90vw);
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.badge {
    display: inline-block;
    padding: 0.4rem 0.7rem;
    border-radius: 999px;
    background: #eef2ff;
    font-weight: 700;
}

.healthy {
    font-weight: 700;
}

dl div {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb;
}

dt {
    font-weight: 700;
}

dd {
    margin: 0.25rem 0 0;
}

.links a {
    margin-right: 1rem;
}
EOF
```

---

# 9. Create and Run Unit Tests

## 9.1 Create the tests

```bash
cat > app/tests/test_app.py <<'EOF'
import pytest

from app import create_app


@pytest.fixture()
def client():
    application = create_app()
    application.config.update(TESTING=True)

    with application.test_client() as test_client:
        yield test_client


def test_home_page(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"DevOps Capstone Web App" in response.data


def test_health(client):
    response = client.get("/health")
    data = response.get_json()

    assert response.status_code == 200
    assert data["status"] == "healthy"


def test_version(client):
    response = client.get("/version")
    data = response.get_json()

    assert response.status_code == 200
    assert "version" in data
    assert "environment" in data
    assert "hostname" in data
EOF
```

## 9.2 Enter the `app` directory

This is important.

From the project root:

```bash
cd app
```

Do **not** run the first local pytest command from the project root. Running from inside `app/` keeps Python imports simple and prevents an unnecessary test collection/import error.

## 9.3 Create a virtual environment

```bash
python3 -m venv .venv
```

If that reports that `venv` is missing:

```bash
sudo apt update
sudo apt install -y python3-venv
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Your prompt should now usually start with:

```text
(.venv)
```

Confirm the Python executable:

```bash
which python
```

It should point to:

```text
.../app/.venv/bin/python
```

## 9.4 Install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## 9.5 Run tests

```bash
python -m pytest tests/test_app.py -q
```

Expected result:

```text
3 passed
```

### Optional screenshot checkpoint

If you capture local test evidence later, save it with a descriptive name under:

```text
screenshots/application/
```

The final portfolio evidence already includes the Azure DevOps test stage, so a separate local-test screenshot is optional.

---

# 10. Run the Application Locally

Stay inside:

```text
app/
```

Start it:

```bash
python run.py
```

Expected message includes:

```text
Running on http://127.0.0.1:8000
```

Open another WSL terminal and run:

```bash
curl http://localhost:8000/health
```

You should receive JSON similar to:

```json
{
  "application": "DevOps Capstone Web App",
  "environment": "development",
  "status": "healthy",
  "version": "1.0.0"
}
```

Check version information:

```bash
curl -s http://localhost:8000/version | jq
```

Open in a browser:

```text
http://localhost:8000
```

Stop the development server with:

```text
Ctrl+C
```

---

# 11. Dockerize the Application

## 11.1 Create `.dockerignore`

From the `app/` directory:

```bash
cat > .dockerignore <<'EOF'
.venv
__pycache__
.pytest_cache
*.pyc
*.pyo
tests
test-results
EOF
```

## 11.2 Create the Dockerfile

```bash
cat > Dockerfile <<'EOF'
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --create-home --uid 10001 appuser \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2)"

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "2", "--timeout", "30", "run:app"]
EOF
```

## 11.3 Build the image

```bash
docker build -t devops-capstone-webapp:local .
```

Verify:

```bash
docker images devops-capstone-webapp
```

## 11.4 Run the container

```bash
docker run --rm \
  --name devops-capstone-webapp \
  -p 8000:8000 \
  -e APP_NAME="DevOps Capstone Web App" \
  -e APP_VERSION="local-1" \
  -e APP_ENVIRONMENT="local-docker" \
  -e DEPLOYMENT_TIME="$(date -u '+%Y-%m-%d %H:%M:%S UTC')" \
  devops-capstone-webapp:local
```

In another WSL terminal:

```bash
curl http://localhost:8000/health
```

Also open:

```text
http://localhost:8000
```

Stop the container with:

```text
Ctrl+C
```

### Screenshot checkpoint

The project evidence for the containerized application is:

```text
screenshots/application/container-from-image.png
```

![Container created from the application image](screenshots/application/container-from-image.png)

This proves the application image was used successfully to create a running container.

---

# 12. Optional Local Azure Practice with Floci-AZ

Floci-AZ was part of the learning path for this project and is retained here as an optional local Azure practice stage.

Floci-AZ is a local Azure emulator. The final capstone still uses real Azure for the cloud evidence.

## 12.1 Return to the project root

If you are still in `app/`:

```bash
cd ..
```

## 12.2 Check whether a Floci-AZ container already exists

```bash
docker ps -a --filter name=floci-az
```

If you already have a working Floci-AZ container, **reuse it**. Do not create several containers with the same purpose.

If it exists but is stopped:

```bash
docker start floci-az
```

## 12.3 If Floci-AZ does not exist, start one

```bash
docker run -d \
  --name floci-az \
  -p 4577:4577 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  floci/floci-az:latest
```

> Do not expose Kubernetes API port ranges such as `6443-6450` on the main Floci-AZ container. Only expose the main Floci-AZ API port unless the current Floci documentation explicitly requires something else.

## 12.4 Check the container

```bash
docker ps --filter name=floci-az
```

## 12.5 Check the Floci-AZ endpoint

```bash
curl -s http://localhost:4577/health
```

You can also inspect the local subscription endpoint:

```bash
curl -s \
  "http://localhost:4577/subscriptions?api-version=2020-01-01" \
  | jq
```

Floci-AZ uses a local Azure-compatible endpoint on:

```text
http://localhost:4577
```

## 12.6 What Floci-AZ is used for in this guide

Use it to understand:

```text
local cloud emulation
Azure-compatible REST APIs
how cloud resources can be represented locally
how emulators can reduce cloud cost during development
```

This cleaned guide intentionally does **not** require Floci-AZ AKS emulation or a local ACR push workflow. Those parts are not necessary to prove the final Azure project and can introduce environment-specific Docker networking and registry issues.

## 12.7 Stop Floci-AZ when finished

```bash
docker stop floci-az
```

Start it again later with:

```bash
docker start floci-az
```

---

# 13. Prepare Azure

From this point, use **Azure Cloud Shell - Bash** unless stated otherwise.

## 13.1 Open Azure Cloud Shell

1. Sign in to the Azure portal.
2. Open **Cloud Shell**.
3. Select **Bash**.

Check the active account:

```bash
az account show --output table
```

If you have more than one subscription:

```bash
az account list --output table
```

Set the required subscription:

```bash
az account set --subscription "YOUR_SUBSCRIPTION_ID_OR_NAME"
```

Verify again:

```bash
az account show --output table
```

## 13.2 Define reusable variables

Use your own globally unique ACR name.

```bash
RG="rg-devops-capstone"
LOCATION="swedencentral"
ACR_NAME="youruniqueacrname"
AKS_NAME="aks-devops-capstone"
LAW_NAME="law-devops-capstone"
VM_SIZE="Standard_D4as_v5"
```

ACR names must be globally unique and use only lowercase letters and numbers.

Example:

```text
capstoneacr123456
```

Do not copy another person's ACR name.

## 13.3 Create the resource group

```bash
az group create \
  --name "$RG" \
  --location "$LOCATION"
```

Verify:

```bash
az group show \
  --name "$RG" \
  --query "{Name:name,Location:location,State:properties.provisioningState}" \
  --output table
```

Confirm the provisioning state is `Succeeded`.

### Screenshot checkpoint

![Azure resource group created successfully](screenshots/azure-setup/01-resource-group-created.png)

---

# 14. Create Azure Container Registry

## 14.1 Check whether your ACR name is available

```bash
az acr check-name --name "$ACR_NAME" --output table
```

If the name is unavailable, choose another value.

## 14.2 Create the registry

```bash
az acr create \
  --resource-group "$RG" \
  --name "$ACR_NAME" \
  --sku Basic
```

## 14.3 Get the login server

```bash
ACR_LOGIN_SERVER=$(az acr show \
  --resource-group "$RG" \
  --name "$ACR_NAME" \
  --query loginServer \
  --output tsv)

echo "$ACR_LOGIN_SERVER"
```

Expected format:

```text
youruniqueacrname.azurecr.io
```

### Screenshot checkpoint

![Azure Container Registry created](screenshots/azure-setup/03-acr-created.png)

The versioned image-tag evidence is captured later, after the Azure DevOps pipeline pushes the image.

---

# 15. Prepare Application Gateway for Containers Prerequisites

The final public ingress uses **Application Gateway for Containers**, not classic Application Gateway + AGIC.

The AKS add-on requires specific Azure providers, CLI extensions, preview feature registrations, Azure CNI, Workload Identity, Gateway API, and a supported region.

## 15.1 Register Azure providers

Run:

```bash
az provider register --namespace Microsoft.ContainerService
az provider register --namespace Microsoft.Network
az provider register --namespace Microsoft.NetworkFunction
az provider register --namespace Microsoft.ServiceNetworking
```

Wait until they are registered:

```bash
for PROVIDER in \
  Microsoft.ContainerService \
  Microsoft.Network \
  Microsoft.NetworkFunction \
  Microsoft.ServiceNetworking
do
  printf "%-35s " "$PROVIDER"
  az provider show \
    --namespace "$PROVIDER" \
    --query registrationState \
    --output tsv
done
```

Do not continue until all show:

```text
Registered
```

## 15.2 Install required Azure CLI extensions

```bash
az extension add --name alb --upgrade
az extension add --name aks-preview --upgrade
```

Check:

```bash
az extension show --name alb --query "{Name:name,Version:version}" -o table
az extension show --name aks-preview --query "{Name:name,Version:version}" -o table
```

A message saying the extension is preview is normal.

## 15.3 Register the required AKS preview features

```bash
az feature register \
  --namespace Microsoft.ContainerService \
  --name ManagedGatewayAPIPreview

az feature register \
  --namespace Microsoft.ContainerService \
  --name ApplicationLoadBalancerPreview
```

Check them:

```bash
az feature show \
  --namespace Microsoft.ContainerService \
  --name ManagedGatewayAPIPreview \
  --query properties.state \
  -o tsv

az feature show \
  --namespace Microsoft.ContainerService \
  --name ApplicationLoadBalancerPreview \
  --query properties.state \
  -o tsv
```

Wait until both say:

```text
Registered
```

Then refresh the provider registration:

```bash
az provider register --namespace Microsoft.ContainerService
```

## 15.4 Check VM quota before creating AKS

This is important for avoiding a later vCPU quota failure.

Run:

```bash
az vm list-usage \
  --location "$LOCATION" \
  --output table
```

Also confirm that your intended VM size is available in the region:

```bash
az vm list-skus \
  --location "$LOCATION" \
  --resource-type virtualMachines \
  --size "$VM_SIZE" \
  --output table
```

If Azure shows a quota restriction for the VM family:

- choose another suitable VM size that has quota, or
- request a quota increase before creating the cluster.

Do not assume that adding a second node later will be possible if your subscription has no remaining vCPU quota.

---

# 16. Create the AKS Cluster

This guide creates the required networking and Application Gateway add-ons at cluster creation time so you do not need to retrofit them later.

Run:

```bash
az aks create \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --location "$LOCATION" \
  --tier free \
  --node-count 1 \
  --node-vm-size "$VM_SIZE" \
  --network-plugin azure \
  --enable-managed-identity \
  --attach-acr "$ACR_NAME" \
  --enable-oidc-issuer \
  --enable-workload-identity \
  --enable-gateway-api \
  --enable-application-load-balancer \
  --generate-ssh-keys
```

This can take several minutes.

## 16.1 Verify provisioning state

```bash
az aks show \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --query "{Name:name,State:provisioningState,Location:location,Power:powerState.code}" \
  --output table
```

You want:

```text
Succeeded
```

## 16.2 Verify add-on configuration

```bash
az aks show \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --query "ingressProfile" \
  --output json
```

Confirm that Gateway API and Application Load Balancer are enabled.

---

# 17. Connect kubectl to AKS

Still in Azure Cloud Shell:

```bash
az aks get-credentials \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --overwrite-existing
```

Expected:

```text
Merged "aks-devops-capstone" as current context
```

Check the context:

```bash
kubectl config current-context
```

Check the node:

```bash
kubectl get nodes -o wide
```

The node should become:

```text
Ready
```

### Screenshot checkpoint

![AKS cluster overview](screenshots/aks/07-aks-overview.png)

## 17.1 Verify the ALB Controller

```bash
kubectl get pods -n kube-system | grep alb-controller
```

You should see ALB Controller pods in `Running` state.

### Screenshot checkpoint

![ALB Controller running in AKS](screenshots/gateway/13-alb-controller-running.png)

Verify the GatewayClass:

```bash
kubectl get gatewayclass azure-alb-external
```

---

# 18. Create Kubernetes Manifests

Return to **WSL**, not Cloud Shell, because these files belong in Git.

Go to the project root.

Example:

```bash
cd ~/projects/YOUR_REPOSITORY/'interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline'
```

Before creating the manifests, set the actual ACR login server you created:

```bash
ACR_LOGIN_SERVER="youruniqueacrname.azurecr.io"
```

Replace the example value with your real one.

## 18.1 Staging namespace

```bash
cat > k8s/staging/namespace.yaml <<'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: staging
  labels:
    environment: staging
EOF
```

## 18.2 Staging Deployment

```bash
cat > k8s/staging/deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-capstone-webapp
  namespace: staging
spec:
  replicas: 1
  selector:
    matchLabels:
      app: devops-capstone-webapp
  template:
    metadata:
      labels:
        app: devops-capstone-webapp
    spec:
      containers:
        - name: devops-capstone-webapp
          image: ${ACR_LOGIN_SERVER}/devops-capstone-webapp:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8000
          env:
            - name: APP_NAME
              value: "DevOps Capstone Web App"
            - name: APP_VERSION
              value: "v1"
            - name: APP_ENVIRONMENT
              value: "staging"
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 15
            periodSeconds: 20
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "300m"
              memory: "256Mi"
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
EOF
```

## 18.3 Staging Service

```bash
cat > k8s/staging/service.yaml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: devops-capstone-webapp
  namespace: staging
spec:
  type: ClusterIP
  selector:
    app: devops-capstone-webapp
  ports:
    - name: http
      port: 80
      targetPort: 8000
EOF
```

## 18.4 Production namespace

```bash
cat > k8s/production-namespace.yaml <<'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: production
EOF
```

## 18.5 Production Deployment

```bash
cat > k8s/production/deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-capstone-webapp
  namespace: production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: devops-capstone-webapp
  template:
    metadata:
      labels:
        app: devops-capstone-webapp
    spec:
      containers:
        - name: devops-capstone-webapp
          image: ${ACR_LOGIN_SERVER}/devops-capstone-webapp:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8000
          env:
            - name: APP_NAME
              value: "DevOps Capstone Web App"
            - name: APP_VERSION
              value: "v1"
            - name: APP_ENVIRONMENT
              value: "production"
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 15
            periodSeconds: 20
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "300m"
              memory: "256Mi"
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
EOF
```

## 18.6 Production Service

```bash
cat > k8s/production/service.yaml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: devops-capstone-webapp
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: devops-capstone-webapp
  ports:
    - name: http
      port: 80
      targetPort: 8000
EOF
```

## 18.7 Production HPA

```bash
cat > k8s/production/hpa.yaml <<'EOF'
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devops-capstone-webapp
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devops-capstone-webapp
  minReplicas: 2
  maxReplicas: 3
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
EOF
```

## 18.8 Check that no placeholder remains

```bash
grep -R "youruniqueacrname\|YOUR_ACR" -n k8s || true
```

If this prints a placeholder, correct it before continuing.

## 18.9 Validate YAML syntax locally

Activate the application virtual environment if needed:

```bash
source app/.venv/bin/activate
```

Install PyYAML only for local validation:

```bash
python -m pip install pyyaml
```

Run:

```bash
python - <<'PY'
from pathlib import Path
import yaml

files = sorted(Path("k8s").rglob("*.yaml"))

for file in files:
    with file.open() as f:
        list(yaml.safe_load_all(f))
    print("YAML valid:", file)
PY
```

All files should print `YAML valid`.

---

# 19. Create the Azure DevOps Project

Use the browser.

1. Open your Azure DevOps organization.
2. Click **New project**.
3. Use a clear project name such as:

```text
DevOps-Capstone
```

4. Choose **Private** unless your internship requires otherwise.
5. Create the project.

### Screenshot checkpoint

![Azure DevOps project created](screenshots/pipeline/04-azure-devops-project.png)

---

# 20. Create Azure DevOps Service Connections

You need two service connections.

## 20.1 ACR connection

In Azure DevOps:

```text
Project settings
→ Service connections
→ New service connection
→ Docker Registry
```

Choose:

```text
Registry type: Azure Container Registry
Authentication: Workload Identity Federation
Subscription: your Azure subscription
Azure Container Registry: your ACR
Service connection name: sc-acr-capstone
```

If the UI offers:

```text
Grant access permission to all pipelines
```

leave it unchecked unless your organization specifically requires it.

Save the connection.

## 20.2 Azure Resource Manager connection

Create a second service connection:

```text
Project settings
→ Service connections
→ New service connection
→ Azure Resource Manager
```

Choose Workload Identity Federation if offered.

Scope it to the subscription or, preferably, the project resource group.

Use:

```text
Service connection name: sc-azure-capstone
Resource group: rg-devops-capstone
```

Save.

> If your organization policy prevents you from creating workload identity federation automatically, ask the Azure/DevOps administrator to create or authorize the connection. Do not switch to storing long-lived secrets merely to bypass an organizational security policy.

---

# 21. Create the Azure Pipeline

Back in **WSL**, from the project root.

## 21.1 Important path rule for `[DEVOPS]`

The repository folder contains:

```text
Project10-[DEVOPS]-End-to-End-DevOps-Pipeline
```

Azure Pipelines manifest inputs can treat square brackets as pattern syntax.

Therefore this guide uses two path variables:

```text
projectPath
```

for normal Python and Docker paths, and:

```text
manifestProjectPath
```

with the literal `[` escaped as:

```text
[[]
```

for `KubernetesManifest@1`.

This prevents the manifest task from reporting that files do not exist even though they are present.

## 21.2 Create `azure-pipelines.yml`

Replace:

```text
Your-Name
youruniqueacrname.azurecr.io
```

with your actual values.

```bash
cat > azure-pipelines.yml <<'EOF'
trigger:
  branches:
    include:
      - capstone-project10
  paths:
    include:
      - 'interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline/**'

pr:
  branches:
    include:
      - capstone-project10

variables:
  projectPath: '$(Build.SourcesDirectory)/interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline'
  manifestProjectPath: '$(Build.SourcesDirectory)/interns/Your-Name/Project10-[[]DEVOPS]-End-to-End-DevOps-Pipeline'
  imageRepository: 'devops-capstone-webapp'
  imageTag: '$(Build.BuildId)'
  acrLoginServer: 'youruniqueacrname.azurecr.io'

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Validate
  displayName: Test, build and push
  jobs:
  - job: TestAndBuild
    displayName: Test application and build container
    steps:
    - checkout: self

    - task: UsePythonVersion@0
      displayName: Use Python 3.12
      inputs:
        versionSpec: '3.12'

    - script: |
        python -m pip install --upgrade pip
        python -m pip install -r requirements.txt
      workingDirectory: '$(projectPath)/app'
      displayName: Install Python dependencies

    - script: |
        mkdir -p ../test-results
        python -m pytest \
          tests/test_app.py \
          -q \
          --junitxml=../test-results/pytest.xml
      workingDirectory: '$(projectPath)/app'
      displayName: Run unit tests

    - task: PublishTestResults@2
      displayName: Publish unit test results
      condition: succeededOrFailed()
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/test-results/pytest.xml'
        searchFolder: '$(Build.SourcesDirectory)'
        testRunTitle: 'Flask application tests'

    - task: Docker@2
      displayName: Build and push Docker image to ACR
      inputs:
        command: 'buildAndPush'
        containerRegistry: 'sc-acr-capstone'
        repository: '$(imageRepository)'
        Dockerfile: '$(projectPath)/app/Dockerfile'
        buildContext: '$(projectPath)/app'
        tags: |
          $(imageTag)
          latest

- stage: DeployStaging
  displayName: Deploy to AKS staging
  dependsOn: Validate
  condition: succeeded()
  jobs:
  - job: DeployToStaging
    displayName: Deploy application to staging namespace
    steps:
    - checkout: self

    - task: KubernetesManifest@1
      displayName: Create staging namespace
      inputs:
        action: 'deploy'
        connectionType: 'azureResourceManager'
        azureSubscriptionConnection: 'sc-azure-capstone'
        azureResourceGroup: 'rg-devops-capstone'
        kubernetesCluster: 'aks-devops-capstone'
        manifests: |
          $(manifestProjectPath)/k8s/staging/namespace.yaml

    - task: KubernetesManifest@1
      displayName: Deploy staging application
      inputs:
        action: 'deploy'
        connectionType: 'azureResourceManager'
        azureSubscriptionConnection: 'sc-azure-capstone'
        azureResourceGroup: 'rg-devops-capstone'
        kubernetesCluster: 'aks-devops-capstone'
        namespace: 'staging'
        manifests: |
          $(manifestProjectPath)/k8s/staging/deployment.yaml
          $(manifestProjectPath)/k8s/staging/service.yaml
        containers: |
          $(acrLoginServer)/$(imageRepository):$(imageTag)

- stage: DeployProduction
  displayName: Deploy to AKS production
  dependsOn: DeployStaging
  condition: succeeded()
  jobs:
  - job: DeployToProduction
    displayName: Deploy application to production namespace
    steps:
    - checkout: self

    - task: KubernetesManifest@1
      displayName: Create production namespace
      inputs:
        action: 'deploy'
        connectionType: 'azureResourceManager'
        azureSubscriptionConnection: 'sc-azure-capstone'
        azureResourceGroup: 'rg-devops-capstone'
        kubernetesCluster: 'aks-devops-capstone'
        manifests: |
          $(manifestProjectPath)/k8s/production-namespace.yaml

    - task: KubernetesManifest@1
      displayName: Deploy production application
      inputs:
        action: 'deploy'
        connectionType: 'azureResourceManager'
        azureSubscriptionConnection: 'sc-azure-capstone'
        azureResourceGroup: 'rg-devops-capstone'
        kubernetesCluster: 'aks-devops-capstone'
        namespace: 'production'
        manifests: |
          $(manifestProjectPath)/k8s/production/deployment.yaml
          $(manifestProjectPath)/k8s/production/service.yaml
          $(manifestProjectPath)/k8s/production/hpa.yaml
        containers: |
          $(acrLoginServer)/$(imageRepository):$(imageTag)
EOF
```

## 21.3 Replace placeholders

Use your real name/path:

```bash
grep -n "Your-Name\|youruniqueacrname" azure-pipelines.yml
```

Edit:

```bash
nano azure-pipelines.yml
```

Save with:

```text
Ctrl+O
Enter
Ctrl+X
```

Run the grep command again:

```bash
grep -n "Your-Name\|youruniqueacrname" azure-pipelines.yml || echo "No placeholders remain."
```

You want:

```text
No placeholders remain.
```

## 21.4 Validate pipeline YAML

```bash
source app/.venv/bin/activate
python -m pip install pyyaml
```

Run:

```bash
python - <<'PY'
import yaml

with open("azure-pipelines.yml") as file:
    data = yaml.safe_load(file)

print("YAML valid.")
print("Stages:", [stage["stage"] for stage in data["stages"]])
PY
```

Expected:

```text
YAML valid.
Stages: ['Validate', 'DeployStaging', 'DeployProduction']
```

## 21.5 Check whitespace problems

```bash
git diff --check
```

No output is good.

---

# 22. Commit and Push the Project

## 22.1 Create `.gitignore`

From the project root:

```bash
cat > .gitignore <<'EOF'
.venv/
__pycache__/
*.pyc
.pytest_cache/
test-results/
.DS_Store
floci-data/
EOF
```

## 22.2 Check repository status

```bash
git status --short
```

Review the files carefully.

## 22.3 Add files

From the main Git repository root, or while inside the project directory:

```bash
git add .
```

Check:

```bash
git status --short
```

## 22.4 Commit

```bash
git commit -m "feat: add end-to-end DevOps capstone pipeline"
```

## 22.5 Push

```bash
git push -u origin capstone-project10
```

Open GitHub and verify that the project files are visible under the correct branch.

> If you create a pull request, check the **base repository** and **base branch** before creating it. For work inside your own fork, do not accidentally target the internship upstream repository unless that is explicitly required.

---

# 23. Create and Run the Azure DevOps Pipeline

Use the browser.

In Azure DevOps:

```text
Pipelines
→ New pipeline
→ GitHub
→ choose your repository
→ Existing Azure Pipelines YAML file
```

Choose:

```text
Branch: capstone-project10
Path: /interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline/azure-pipelines.yml
```

Click:

```text
Continue
```

Review the YAML but do not replace it in the browser.

Click:

```text
Run
```

## 23.1 Authorize service connections if asked

The first run might pause and ask you to authorize:

```text
sc-acr-capstone
sc-azure-capstone
```

Authorize them for this pipeline.

## 23.2 Successful pipeline result

You want all three stages green:

```text
Test, build and push
Deploy to AKS staging
Deploy to AKS production
```

### Screenshot checkpoints

![Azure DevOps pipeline completed successfully](screenshots/pipeline/05-pipeline-success.png)

![Three-stage Azure DevOps pipeline](screenshots/pipeline/three-stage-pipeline.png)

![AKS staging deployment stage succeeded](screenshots/pipeline/08-pipeline-aks-staging-success.png)

These are among the strongest project screenshots because they show the CI/CD flow progressing from validation and image build through AKS deployment.

---

# 24. Verify ACR and AKS Deployment

Use **Azure Cloud Shell**.

If Cloud Shell was restarted, reconnect to AKS first:

```bash
az aks get-credentials \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --overwrite-existing
```

If the shell variables no longer exist, set them again:

```bash
RG="rg-devops-capstone"
AKS_NAME="aks-devops-capstone"
ACR_NAME="youruniqueacrname"
```

## 24.1 Verify ACR image tags

```bash
az acr repository show-tags \
  --name "$ACR_NAME" \
  --repository devops-capstone-webapp \
  --orderby time_desc \
  --output table
```

You should see:

```text
latest
<Azure DevOps Build ID>
```

The numeric Build ID is useful because it gives each pipeline image an immutable, traceable version.

### Screenshot checkpoint

![ACR image tags created by the pipeline](screenshots/pipeline/06-acr-image-tags.png)

## 24.2 Verify staging pods

```bash
kubectl get pods -n staging -o wide
```

You want one pod:

```text
READY 1/1
STATUS Running
```

![Staging pod running in AKS](screenshots/aks/09-aks-staging-pods-running.png)

## 24.3 Verify production pods

```bash
kubectl get pods -n production -o wide
```

You want two application pods:

```text
READY 1/1
STATUS Running
```

![Production pods running in AKS](screenshots/aks/11-aks-production-pods-running.png)

## 24.4 Verify Services

```bash
kubectl get services -n staging
kubectl get services -n production
```

![Staging Service health verification](screenshots/aks/10-staging-service-health-check.png)

![Production Service health verification](screenshots/aks/12-production-service-health-check.png)

## 24.5 Verify the HPA

```bash
kubectl get hpa -n production
```

Expected values include:

```text
MINPODS 2
MAXPODS 3
TARGET 70%
```

The current CPU value can initially show `<unknown>`. Give Kubernetes a short time to collect metrics and check again.

## 24.6 Verify deployed image

```bash
kubectl get deployment devops-capstone-webapp \
  -n production \
  -o jsonpath='{.spec.template.spec.containers[0].image}{"\n"}'
```

It should be your ACR image with a Build ID tag, for example:

```text
yourregistry.azurecr.io/devops-capstone-webapp:12
```

## 24.7 Test the staging Service inside AKS

```bash
kubectl run staging-health-check \
  --rm \
  -i \
  --restart=Never \
  --image=busybox:1.37.0 \
  -- wget -qO- \
  http://devops-capstone-webapp.staging.svc.cluster.local/health
```

A successful response should show:

```json
{
  "environment": "staging",
  "status": "healthy"
}
```

### Screenshot checkpoint

Run this compact command for the final AKS evidence:

```bash
echo "=== STAGING ==="
kubectl get pods -n staging

echo
echo "=== PRODUCTION ==="
kubectl get pods -n production

echo
echo "=== HPA ==="
kubectl get hpa -n production
```

The combined AKS evidence is stored as:

```text
screenshots/aks/staging-production-pods-running.png
```

![Staging and production AKS workloads](screenshots/aks/staging-production-pods-running.png)

---

# 25. Optional Production Approval

The core project works without this step.

If you want an additional release-control feature, add an Azure DevOps Environment approval.

In Azure DevOps:

```text
Pipelines
→ Environments
→ New environment
```

Name:

```text
capstone-production
```

Then:

```text
capstone-production
→ Approvals and checks
→ Approvals
```

Add yourself or the responsible reviewer.

To make the YAML wait on this environment, change the production job from a normal `job` to a `deployment` job that targets `capstone-production`.

Do this only after the normal pipeline works.

---

# 26. Create Application Gateway for Containers

Use **Azure Cloud Shell**.

This project uses the ALB Controller managed deployment model.

## 26.1 Make sure the cluster connection works

```bash
kubectl get nodes
```

If authentication is missing:

```bash
az aks get-credentials \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --overwrite-existing
```

## 26.2 Verify the automatically created ALB subnet

The AKS Application Gateway for Containers add-on creates an `aks-appgateway` subnet when using the AKS-managed virtual network.

Get the AKS node resource group:

```bash
MC_RESOURCE_GROUP=$(az aks show \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --query nodeResourceGroup \
  --output tsv)

echo "$MC_RESOURCE_GROUP"
```

Get the VNet:

```bash
VNET_NAME=$(az network vnet list \
  --resource-group "$MC_RESOURCE_GROUP" \
  --query '[0].name' \
  --output tsv)

echo "$VNET_NAME"
```

List subnets:

```bash
az network vnet subnet list \
  --resource-group "$MC_RESOURCE_GROUP" \
  --vnet-name "$VNET_NAME" \
  --output table
```

Look for:

```text
aks-appgateway
```

If it has not appeared yet, wait a few minutes and run the command again.

## 26.3 Get the Application Gateway subnet ID

```bash
ALB_SUBNET_ID=$(az network vnet subnet show \
  --resource-group "$MC_RESOURCE_GROUP" \
  --vnet-name "$VNET_NAME" \
  --name aks-appgateway \
  --query id \
  --output tsv)

echo "$ALB_SUBNET_ID"
```

Do not hard-code the generated VNet name or subscription ID.

## 26.4 Create the infrastructure namespace

Use an idempotent command so it also works if the namespace already exists:

```bash
kubectl create namespace alb-infra \
  --dry-run=client \
  -o yaml \
  | kubectl apply -f -
```

## 26.5 Create the ApplicationLoadBalancer

```bash
kubectl apply -f - <<EOF
apiVersion: alb.networking.azure.io/v1
kind: ApplicationLoadBalancer
metadata:
  name: capstone-alb
  namespace: alb-infra
spec:
  associations:
    - $ALB_SUBNET_ID
EOF
```

Expected:

```text
applicationloadbalancer.alb.networking.azure.io/capstone-alb created
```

## 26.6 Wait for provisioning

```bash
kubectl get applicationloadbalancer capstone-alb \
  -n alb-infra \
  -o yaml \
  -w
```

Wait until the status contains conditions similar to:

```text
type: Accepted
status: "True"
```

and:

```text
type: Deployment
reason: Ready
status: "True"
```

Provisioning can take several minutes.

Press:

```text
Ctrl+C
```

after it becomes ready.

---

# 27. Create the Gateway and HTTPRoute

## 27.1 Create the Gateway

```bash
kubectl apply -f - <<'EOF'
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: capstone-gateway
  namespace: production
  annotations:
    alb.networking.azure.io/alb-namespace: alb-infra
    alb.networking.azure.io/alb-name: capstone-alb
spec:
  gatewayClassName: azure-alb-external
  listeners:
    - name: http
      port: 80
      protocol: HTTP
      allowedRoutes:
        namespaces:
          from: Same
EOF
```

## 27.2 Check the Gateway

```bash
kubectl get gateway capstone-gateway \
  -n production \
  -o yaml
```

Wait for status conditions indicating the Gateway is accepted and programmed.

The status should eventually include:

```text
type: Accepted
status: "True"
```

and:

```text
type: Programmed
status: "True"
```

## 27.3 Create the HTTPRoute

```bash
kubectl apply -f - <<'EOF'
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: capstone-route
  namespace: production
spec:
  parentRefs:
    - name: capstone-gateway
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: devops-capstone-webapp
          port: 80
EOF
```

## 27.4 Check the route

```bash
kubectl get httproute capstone-route \
  -n production \
  -o yaml
```

Look for:

```text
ResolvedRefs = True
Accepted = True
Programmed = True
```

## 27.5 Get the public hostname

```bash
FQDN=$(kubectl get gateway capstone-gateway \
  -n production \
  -o jsonpath='{.status.addresses[0].value}')

echo "$FQDN"
```

The value will look similar to:

```text
xxxxxxxxxxxxxxxx.xxxx.alb.azure.com
```

---

# 28. Test the Public Application

The Gateway created in this guide listens on:

```text
HTTP port 80
```

Therefore use:

```text
http://
```

not:

```text
https://
```

HTTPS requires a separate TLS listener and certificate configuration.

## 28.1 Test the health endpoint

```bash
curl -i "http://$FQDN/health"
```

You want:

```text
HTTP/1.1 200
```

and JSON showing:

```text
environment: production
status: healthy
```

## 28.2 Open the application

In your browser:

```text
http://YOUR_APPLICATION_GATEWAY_FQDN
```

The application should show:

```text
DevOps Capstone Web App
Healthy
Version
production
Container / Hostname
Deployment Time
```

### Screenshot checkpoints

![Application accessed through Application Gateway for Containers](screenshots/gateway/application-01-app-via-application-gateway.png)

![Public application through the Azure gateway](screenshots/gateway/14-application-gateway-public-app.png)

These screenshots prove that the production application is reachable through Application Gateway for Containers.

---

# 29. Enable Container Insights and Managed Prometheus

Use **Azure Cloud Shell**.

## 29.1 Register monitoring providers

```bash
az provider register --namespace Microsoft.OperationalInsights
az provider register --namespace Microsoft.Insights
az provider register --namespace Microsoft.AlertsManagement
az provider register --namespace Microsoft.Monitor
```

Check:

```bash
for PROVIDER in \
  Microsoft.OperationalInsights \
  Microsoft.Insights \
  Microsoft.AlertsManagement \
  Microsoft.Monitor
do
  printf "%-35s " "$PROVIDER"
  az provider show \
    --namespace "$PROVIDER" \
    --query registrationState \
    --output tsv
done
```

Wait until all required providers show:

```text
Registered
```

## 29.2 Create a Log Analytics workspace

```bash
az monitor log-analytics workspace create \
  --resource-group "$RG" \
  --workspace-name "$LAW_NAME" \
  --location "$LOCATION"
```

Get its resource ID:

```bash
LAW_ID=$(az monitor log-analytics workspace show \
  --resource-group "$RG" \
  --workspace-name "$LAW_NAME" \
  --query id \
  --output tsv)

echo "$LAW_ID"
```

## 29.3 Enable Container Insights

```bash
az aks enable-addons \
  --addon monitoring \
  --name "$AKS_NAME" \
  --resource-group "$RG" \
  --workspace-resource-id "$LAW_ID"
```

## 29.4 Enable Azure Monitor managed Prometheus metrics

```bash
az aks update \
  --name "$AKS_NAME" \
  --resource-group "$RG" \
  --enable-azure-monitor-metrics
```

## 29.5 Verify Container Insights configuration

```bash
az aks show \
  --name "$AKS_NAME" \
  --resource-group "$RG" \
  --query addonProfiles.omsagent \
  --output json
```

You want:

```text
enabled: true
```

## 29.6 Verify monitoring pods

```bash
kubectl get pods -n kube-system | grep -E 'ama-logs|ama-metrics'
```

Give Azure several minutes to begin collecting data.

---

# 30. View Logs and Metrics

## 30.1 View Kubernetes CPU and memory

In Cloud Shell:

```bash
kubectl top pods -n production
```

Then:

```bash
kubectl top nodes
```

If metrics are still starting, wait a few minutes and retry.

## 30.2 Open AKS Insights

In Azure Portal:

```text
AKS
→ aks-devops-capstone
→ Monitoring
→ Insights
```

Verify that the page shows:

```text
node health
pod counts
CPU
memory
workloads
```

### Screenshot checkpoint

![Container Insights overview](screenshots/monitoring/01-container-insights-overview.png)

A later AKS-wide view is also captured here:

![AKS Container Insights overview](screenshots/monitoring/19-aks-container-insights-overview.png)

## 30.3 Query production container logs

The Azure Portal is the simplest path for this project.

Open:

```text
Log Analytics workspace
→ law-devops-capstone
→ Logs
```

The current Azure Portal may open **Queries hub** over the query editor.

### Screenshot checkpoint

![Turning off Queries Hub ](screenshots/monitoring/container-log-queries-hub.png)

If that happens:

1. Turn off **Always show Queries hub** if you do not want it to open automatically next time.
2. Close the **Queries hub** panel.
3. Confirm that the editor is in **KQL mode**.
4. Paste the query into the editor.
5. Click **Run**.

Start with a wider validation query so a recently resumed or previously stopped cluster does not appear to have no data simply because the time window is too short:

```kusto
ContainerLogV2
| where TimeGenerated > ago(24h)
| take 50
| order by TimeGenerated desc
```

If rows are returned, narrow the query to production:

```kusto
ContainerLogV2
| where TimeGenerated > ago(24h)
| where PodNamespace == "production"
| project TimeGenerated, PodName, ContainerName, LogMessage
| order by TimeGenerated desc
```

For an actively running cluster, you can reduce `ago(24h)` to `ago(1h)` or `ago(6h)` once you know that recent log ingestion is occurring.

If the production query returns no rows immediately after AKS has been resumed, first verify that `ContainerLogV2` contains any recent rows with the wider query above. Container log collection can take a short time to resume after the cluster starts.

If you specifically need fresh application log entries, generate application activity and then wait a few minutes before querying again. For example:

```bash
for i in $(seq 1 20); do
  curl -s "http://$FQDN/health" > /dev/null
done
```

> Whether HTTP requests themselves appear as container log lines depends on the application's web-server logging configuration. The important validation is that `ContainerLogV2` is receiving records from the AKS containers.

### Screenshot checkpoint

![Production logs in ContainerLogV2](screenshots/monitoring/container-log-v2.png)

## 30.4 Check production restart count

Run in Logs:

```kusto
KubePodInventory
| where TimeGenerated > ago(15m)
| where Namespace == "production"
| summarize RestartCount=max(PodRestartCount)
```

A healthy new deployment normally shows a small value, often:

```text
0
```

## 30.5 Capture metrics evidence

In Cloud Shell:

```bash
echo "=== PRODUCTION POD METRICS ==="
kubectl top pods -n production

echo
echo "=== NODE METRICS ==="
kubectl top nodes
```

### Screenshot checkpoint

![AKS node CPU metrics](screenshots/monitoring/20-aks-node-cpu-metrics.png)

---

# 31. Optional Alert for Production Pod Restarts

This is a useful extra monitoring feature.

In Azure Portal:

```text
Monitor
→ Alerts
→ Create
→ Alert rule
```

Choose the Log Analytics workspace or appropriate monitoring scope.

Use the query:

```kusto
KubePodInventory
| where TimeGenerated > ago(15m)
| where Namespace == "production"
| summarize RestartCount=max(PodRestartCount)
```

A reasonable learning rule is:

```text
Measure: RestartCount
Aggregation: Maximum
Threshold type: Static
Operator: Greater than
Threshold: 3
Evaluation frequency: 5 minutes
```

Create an action group such as:

```text
Name: ag-devops-capstone-alerts
Short name: CapAlert
```

Add your email notification.

Name the rule:

```text
alert-production-pod-restarts
```

Description:

```text
Alert when the production pod restart count exceeds 3.
```

Suggested tags:

```text
Project = DevOpsCapstone
Environment = Production
Component = Monitoring
```

> Some free or limited Azure subscriptions can restrict action-group test notifications. If Azure explicitly reports that the subscription does not support the test operation, document the platform limitation instead of repeatedly reconfiguring a correct alert.

### Alert evidence

The screenshots below document the successful alert configuration flow and the subscription limitation encountered during the optional test.

<details>
<summary>Show Azure Monitor alert configuration screenshots</summary>

**Restart count used for the alert**

![Production pod restart count](screenshots/monitoring/06-production-pod-restart-count.png)

**Alert condition**

![Pod restart alert condition](screenshots/monitoring/07-pod-restart-alert-condition.png)

**Action group**

![Action group basics](screenshots/monitoring/08-alert-action-group-basics.png)

![Alert email notification](screenshots/monitoring/09a-alert-email-notification.png)

![Alert email notification confirmation](screenshots/monitoring/09b-alert-email-notification.png)

![Action group review](screenshots/monitoring/10-action-group-review.png)

**Alert rule**

![Action group attached to alert](screenshots/monitoring/11-alert-action-group-attached.png)

![Pod restart alert details](screenshots/monitoring/12-pod-restart-alert-details.png)

![Pod restart alert tags](screenshots/monitoring/13-pod-restart-alert-tags.png)

![Pod restart alert review](screenshots/monitoring/14a-pod-restart-alert-review.png)

![Pod restart alert final review](screenshots/monitoring/14b-pod-restart-alert-review.png)

![Pod restart alert created](screenshots/monitoring/15-pod-restart-alert-created.png)

![Pod restart alert overview](screenshots/monitoring/16-pod-restart-alert-overview.png)

**Email verification and test**

![Action group email configured](screenshots/monitoring/17-action-group-email-configured.png)

![Action group email verified](screenshots/monitoring/18a-action-group-email-verified.png)

![Action group test configuration](screenshots/monitoring/18b-action-group-test-configuration.png)

![Action group test](screenshots/monitoring/18c-action-group-test.png)

![Free subscription action-group test limitation](screenshots/monitoring/18d-action-group-test-free-subscription-limit.png)

</details>

---

# 32. Final Validation Checklist

Run these checks before calling the project complete.

## Local

```bash
cd app
source .venv/bin/activate
python -m pytest tests/test_app.py -q
cd ..
```

Expected:

```text
3 passed
```

## ACR

```bash
az acr repository show-tags \
  --name "$ACR_NAME" \
  --repository devops-capstone-webapp \
  --orderby time_desc \
  -o table
```

Confirm a Build ID tag exists.

## Staging

```bash
kubectl get deployment,pods,service -n staging
```

Confirm:

```text
1 desired application replica
pod Running
service present
```

## Production

```bash
kubectl get deployment,pods,service,hpa -n production
```

Confirm:

```text
2 production replicas
pods Running
HPA min 2
HPA max 3
```

## Gateway

```bash
kubectl get applicationloadbalancer -n alb-infra
kubectl get gateway -n production
kubectl get httproute -n production
```

## Public health

```bash
curl "http://$FQDN/health"
```

## Monitoring

```bash
kubectl top pods -n production
kubectl top nodes
```

Open AKS Insights and Log Analytics and confirm that data is visible.

---

# 33. Screenshot Checklist

The repository keeps evidence in category folders under the case-sensitive path:

```text
screenshots/
```

The most important portfolio screenshots are:

| Evidence | Actual file |
|---|---|
| Resource group created | `screenshots/azure-setup/01-resource-group-created.png` |
| Azure cost budget | `screenshots/azure-setup/02-cost-budget.png` |
| ACR created | `screenshots/azure-setup/03-acr-created.png` |
| Azure DevOps project | `screenshots/pipeline/04-azure-devops-project.png` |
| Successful pipeline | `screenshots/pipeline/05-pipeline-success.png` |
| ACR image tags | `screenshots/pipeline/06-acr-image-tags.png` |
| AKS overview | `screenshots/aks/07-aks-overview.png` |
| AKS staging deployment success | `screenshots/pipeline/08-pipeline-aks-staging-success.png` |
| Staging pod running | `screenshots/aks/09-aks-staging-pods-running.png` |
| Staging Service health | `screenshots/aks/10-staging-service-health-check.png` |
| Production pods running | `screenshots/aks/11-aks-production-pods-running.png` |
| Production Service health | `screenshots/aks/12-production-service-health-check.png` |
| ALB Controller running | `screenshots/gateway/13-alb-controller-running.png` |
| Public application through the gateway | `screenshots/gateway/14-application-gateway-public-app.png` |
| Application Gateway application view | `screenshots/gateway/application-01-app-via-application-gateway.png` |
| Container Insights overview | `screenshots/monitoring/01-container-insights-overview.png` |
| Production logs in ContainerLogV2 | `screenshots/monitoring/container-log-v2.png` |
| AKS Container Insights overview | `screenshots/monitoring/19-aks-container-insights-overview.png` |
| AKS node CPU metrics | `screenshots/monitoring/20-aks-node-cpu-metrics.png` |

Additional evidence for alert configuration and troubleshooting is kept under:

```text
screenshots/monitoring/
screenshots/troubleshooting/
```

The optional rolling-update experiment is also preserved as learning evidence:

```text
screenshots/pipeline/deployment-01-acr-tags-before-update.png
screenshots/pipeline/deployment-02-tests-pass-before-rolling-update.png
screenshots/pipeline/deployment-03-rolling-update-pr-comparison.png
screenshots/pipeline/deployment-03-rolling-update-pull-request.png
screenshots/pipeline/deployment-04-rolling-update-pr-created.png
screenshots/pipeline/deployment-05-rolling-update-pr-merged.png
screenshots/troubleshooting/deployment-06-staging-rollout-failed.png
screenshots/troubleshooting/deployment-07-staging-new-pod-pending.png
screenshots/troubleshooting/deployment-08-staging-failed-too-many-pods.png
screenshots/troubleshooting/deployment-09-node-pod-capacity-full.png
```

These screenshots document a useful Kubernetes capacity lesson, but rolling-update and rollback demonstrations are **not required steps in the final capstone workflow**.

The README uses `<details>` blocks for the longer evidence sequences so the main guide stays readable.

Before publishing screenshots, redact:

```text
personal email addresses
subscription IDs where unnecessary
billing information
access tokens
service connection internals
private tenant information
```

---

# 34. Common Problems Prevented by This Guide

This section is intentionally preventive. These are not steps you need to reproduce.

## 34.1 Python test import errors

Prevention:

```bash
cd app
source .venv/bin/activate
python -m pytest tests/test_app.py -q
```

Do not start with the wrong working directory.

## 34.2 Azure Pipeline cannot find Kubernetes manifests

Cause:

```text
[DEVOPS]
```

contains square brackets that can be interpreted as pattern syntax.

Prevention:

```yaml
projectPath: '.../Project10-[DEVOPS]-End-to-End-DevOps-Pipeline'
manifestProjectPath: '.../Project10-[[]DEVOPS]-End-to-End-DevOps-Pipeline'
```

Use `manifestProjectPath` only for `KubernetesManifest@1` manifest paths.

## 34.3 Nested project changes do not trigger the pipeline

Use:

```yaml
paths:
  include:
    - 'interns/Your-Name/Project10-[DEVOPS]-End-to-End-DevOps-Pipeline/**'
```

not a single-level `/*` pattern.

## 34.4 Wrong Kubernetes cluster

Before running a real AKS `kubectl` command:

```bash
kubectl config current-context
```

For this guide, Azure Cloud Shell should use the AKS context.

If credentials were lost after a Cloud Shell restart, or an interactive administration session no longer has a usable AKS context, retrieve the AKS credentials again:

```bash
az aks get-credentials \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --overwrite-existing
```

A successful refresh in this project returned a message similar to:

```text
Merged "aks-devops-capstone" as current context
```

This affects the administrator's local or Cloud Shell `kubectl` access. It does not restart the AKS cluster or redeploy the application. The Azure DevOps pipeline uses its configured Azure service connection rather than depending on your interactive `kubectl` session.

## 34.5 `Too many pods` during a rolling-update experiment

This problem was discovered during an **optional rolling-update demonstration**, not during the required final capstone workflow.

At that time, the learning cluster was running:

```text
kube-system = 25 pods
production  = 3 pods
staging     = 2 pods
total       = 30 pods
```

The AKS node reported:

```text
Pod capacity:    30
Pod allocatable: 30
```

The staging Deployment was still using Kubernetes' default rolling-update strategy. For two replicas, Kubernetes attempted to create an additional surge pod while keeping the existing pods available.

The Azure DevOps pipeline successfully built and pushed the new image, but the staging rollout later failed with:

```text
deployment "devops-capstone-webapp" exceeded its progress deadline
```

The new staging pod remained:

```text
Pending
```

Running `kubectl describe pod` showed the real scheduler error:

```text
0/1 nodes are available: 1 Too many pods
```

This proved that the failure was caused by **node pod-capacity exhaustion**, not by the Flask application, Docker image, ACR, or Azure DevOps build.

### Diagnostic commands used

Check the staging pods:

```bash
kubectl get pods -n staging -o wide
```

Describe the pending pod:

```bash
kubectl describe pod <PENDING_POD_NAME> -n staging
```

Check the node pod limit:

```bash
kubectl get node <AKS_NODE_NAME>   -o jsonpath='Pod capacity: {.status.capacity.pods}{"\n"}Pod allocatable: {.status.allocatable.pods}{"\n"}'
```

Check the Deployment rollout strategy:

```bash
kubectl get deployment devops-capstone-webapp   -n staging   -o jsonpath='{.spec.replicas}{" replicas\n"}{.spec.strategy.rollingUpdate.maxSurge}{" maxSurge\n"}{.spec.strategy.rollingUpdate.maxUnavailable}{" maxUnavailable\n"}'
```

In the original experiment this returned:

```text
2 replicas
25% maxSurge
25% maxUnavailable
```

### Prevention used by the final guide

The final reproducible configuration in this README intentionally starts smaller:

```text
staging replicas:       1
production replicas:    2
production HPA minimum: 2
production HPA maximum: 3
```

This leaves more headroom for system pods and normal Kubernetes operations on a one-node learning cluster.

For a real production environment, use multiple nodes and proper capacity planning rather than designing around a completely full node.

A `maxSurge: 0` / `maxUnavailable: 1` strategy was explored locally as a possible way to avoid requiring an extra surge pod, but that experiment was **not kept as part of the final capstone configuration**. The uncommitted strategy changes were restored, so this README does not present them as a validated final fix.

<details>
<summary>Show the rolling-update experiment and failure evidence</summary>

**Release preparation**

![ACR tags before the rolling-update experiment](screenshots/pipeline/deployment-01-acr-tags-before-update.png)

![Local tests passed before the rolling-update change](screenshots/pipeline/deployment-02-tests-pass-before-rolling-update.png)

![Rolling-update pull-request comparison](screenshots/pipeline/deployment-03-rolling-update-pr-comparison.png)

![Rolling-update pull request](screenshots/pipeline/deployment-03-rolling-update-pull-request.png)

![Rolling-update pull request created](screenshots/pipeline/deployment-04-rolling-update-pr-created.png)

![Rolling-update pull request merged](screenshots/pipeline/deployment-05-rolling-update-pr-merged.png)

**Failure diagnosis**

![Staging rollout progress deadline](screenshots/troubleshooting/02-staging-rollout-progress-deadline.png)

![Staging rollout failed](screenshots/troubleshooting/deployment-06-staging-rollout-failed.png)

![New staging pod pending](screenshots/troubleshooting/deployment-07-staging-new-pod-pending.png)

![Staging failed because of too many pods](screenshots/troubleshooting/deployment-08-staging-failed-too-many-pods.png)

![Node pod capacity full](screenshots/troubleshooting/deployment-09-node-pod-capacity-full.png)

</details>

## 34.6 vCPU quota failure when adding another node

Check quota **before** relying on a scale-up:

```bash
az vm list-usage \
  --location "$LOCATION" \
  -o table
```

Do not make a design depend on a second node until the subscription has enough quota.

![AKS vCPU quota limit](screenshots/troubleshooting/01-aks-vcpu-quota-limit.png)

## 34.7 App Gateway page does not load over HTTPS

The Gateway in this guide is:

```yaml
port: 80
protocol: HTTP
```

Therefore open:

```text
http://<gateway-hostname>
```

HTTPS is a separate enhancement.

## 34.8 Old local Ingress manifests are accidentally reused in Azure

Classic `Ingress` manifests created for Traefik or another local ingress controller are not needed for this final Azure design.

Before final submission, remove old files such as:

```text
k8s/staging/ingress.yaml
k8s/production/ingress.yaml
```

if they are only remnants of local experimentation.

The final Azure route is:

```text
ApplicationLoadBalancer
Gateway
HTTPRoute
```

This keeps the repository aligned with the actual production routing method and prevents another learner from following two different ingress approaches.

## 34.9 Floci-AZ registry networking problems

This guide does not require a local ACR push through Floci-AZ.

Floci-AZ remains a useful local Azure emulator and learning step, but real image storage for the final project starts with Azure Container Registry.

## 34.10 Multiple Floci-AZ containers

Check first:

```bash
docker ps -a --filter name=floci-az
```

Reuse the existing container if possible.

---

# 35. Cost Management

Azure resources can generate charges even in a learning project.

The main cost-sensitive resources include:

```text
AKS node virtual machine
Application Gateway for Containers
Log Analytics ingestion and retention
Azure Container Registry
other networking resources depending on usage
```

During this project, an Azure Cost Management budget was also configured as a guardrail. The exact budget amount and notification thresholds should be chosen for your own subscription and spending limit.

![Azure Cost Management budget](screenshots/azure-setup/02-cost-budget.png)

## 35.1 Short pause

For a short pause, you can stop AKS:

```bash
az aks stop \
  --resource-group "$RG" \
  --name "$AKS_NAME"
```

Check:

```bash
az aks show \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --query powerState.code \
  -o tsv
```

Start later:

```bash
az aks start \
  --resource-group "$RG" \
  --name "$AKS_NAME"
```

Verify that AKS has finished starting:

```bash
az aks show \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --query "{PowerState:powerState.code,ProvisioningState:provisioningState}" \
  --output table
```

Continue only when the result shows:

```text
PowerState    ProvisioningState
------------  -----------------
Running       Succeeded
```

After resuming the cluster, refresh the Cloud Shell kubeconfig **before the first `kubectl` command**:

```bash
az aks get-credentials \
  --resource-group "$RG" \
  --name "$AKS_NAME" \
  --overwrite-existing
```

A successful refresh should return a message similar to:

```text
Merged "aks-devops-capstone" as current context in /home/<cloud-shell-user>/.kube/config
```

Then verify access:

```bash
kubectl get nodes -o wide
```

The AKS node should show `Ready`.

> **Why this is a normal resume step:** A saved Cloud Shell kubeconfig can stop authenticating successfully after a later session or cluster pause. Refreshing the AKS credentials before using `kubectl` prevents the common `You must be logged in to the server` error.

## 35.2 Longer pause and Application Gateway for Containers

The Application Gateway for Containers resource has its own lifecycle.

Because this guide uses the ALB Controller managed model, the Azure Application Gateway for Containers resources are created from:

```text
ApplicationLoadBalancer/capstone-alb
```

If you need to remove the gateway resources during a longer pause, while AKS is available:

```bash
kubectl delete applicationloadbalancer capstone-alb \
  -n alb-infra
```

Confirm the custom resource is gone:

```bash
kubectl get applicationloadbalancer -n alb-infra
```

The ALB Controller manages the related Azure resource lifecycle.

When you resume, recreate the `ApplicationLoadBalancer`, then re-check the `Gateway` and `HTTPRoute`. The generated public FQDN may change.

## 35.3 Full cleanup

If the project is finished and you no longer need the environment, the simplest cleanup is deleting the whole resource group:

```bash
az group delete \
  --name "$RG" \
  --yes \
  --no-wait
```

This is destructive.

Only run it after:

```text
screenshots are saved
pipeline evidence is saved
README is committed
demo video is recorded
you no longer need the Azure environment
```

---

# 36. Cleanup

## Local Docker

List project containers:

```bash
docker ps -a
```

Remove unused temporary containers if necessary.

Stop Floci-AZ:

```bash
docker stop floci-az
```

Remove Floci-AZ only if you no longer want it:

```bash
docker rm floci-az
```

## Python virtual environment

Deactivate:

```bash
deactivate
```

Do not commit `.venv/`.

## Azure

Use the resource-group deletion command from the previous section only when the cloud environment is no longer needed.

---


# 37. Future Enhancements

Good next improvements include:

- HTTPS with a TLS certificate
- Custom domain name
- Azure Key Vault for application secrets
- Terraform or Bicep for infrastructure as code
- Helm or Kustomize for Kubernetes packaging
- Container vulnerability scanning
- Static code analysis
- Production approval gates
- Automated staging smoke test before production
- Multi-node AKS cluster
- Cluster autoscaler
- Pod Disruption Budgets
- Network Policies
- Azure Managed Grafana
- Web Application Firewall
- Blue/green or canary deployment
- Automated rollback
- Backup and disaster-recovery planning

---

# 38. Key Learning Outcomes

This project demonstrates how the separate parts of DevOps work together rather than treating Docker, Kubernetes, CI/CD, Azure, and monitoring as isolated topics.

By completing the project, you practice:

- structuring a DevOps repository
- building a Python web application
- writing repeatable unit tests
- using Python virtual environments
- creating a production-oriented Dockerfile
- running applications inside containers
- using Floci-AZ for local Azure-oriented learning
- storing versioned container images in ACR
- creating an AKS cluster
- separating staging and production with namespaces
- configuring health probes
- configuring CPU and memory requests and limits
- configuring Kubernetes autoscaling
- creating Azure DevOps service connections
- building a multi-stage CI/CD pipeline
- using immutable Build ID image tags
- deploying Kubernetes manifests from Azure Pipelines
- using Gateway API
- exposing AKS with Application Gateway for Containers
- collecting application logs with Container Insights
- querying production logs with KQL
- viewing Kubernetes metrics with managed Prometheus
- creating an operational alert
- troubleshooting cloud authentication, capacity, quota, routing, and path issues
- managing Azure resource cost during a learning project

---

# 39. Official References

Because Azure services and preview features can change, check the current official documentation before repeating the project months or years later.

## Floci-AZ

- Floci-AZ GitHub: https://github.com/floci-io/floci-az
- Floci website: https://floci.io/az/

## Azure DevOps and AKS

- Build and deploy to AKS with Azure Pipelines:
  https://learn.microsoft.com/en-us/azure/devops/pipelines/release/deploy-kubernetes?view=azure-devops
- KubernetesManifest task:
  https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/kubernetes-manifest-v1?view=azure-pipelines

## Azure Container Registry and AKS

- ACR integration with AKS:
  https://learn.microsoft.com/en-us/azure/aks/cluster-container-registry-integration

## Application Gateway for Containers

- ALB Controller AKS add-on quickstart:
  https://learn.microsoft.com/en-us/azure/application-gateway/for-containers/quickstart-deploy-application-gateway-for-containers-alb-controller-addon
- ALB Controller managed Application Gateway for Containers:
  https://learn.microsoft.com/en-us/azure/application-gateway/for-containers/quickstart-create-application-gateway-for-containers-managed-by-alb-controller
- Application Gateway for Containers overview:
  https://learn.microsoft.com/en-us/azure/application-gateway/for-containers/overview

## Azure Monitor

- Enable AKS monitoring:
  https://learn.microsoft.com/en-us/azure/azure-monitor/containers/kubernetes-monitoring-enable
- Monitor AKS:
  https://learn.microsoft.com/en-us/azure/aks/monitor-aks

---

# Final Project Definition of Done

The project is complete when you can prove all of the following:

```text
[ ] Application code exists in GitHub
[ ] Unit tests pass
[ ] Docker image builds successfully
[ ] Azure DevOps pipeline runs automatically from the project branch
[ ] Docker image is pushed to Azure Container Registry
[ ] Image has a traceable Build ID tag
[ ] Staging pod is Running in AKS
[ ] Production pods are Running in AKS
[ ] HPA exists for production
[ ] Production Service is routed through Application Gateway for Containers
[ ] Public browser request works over HTTP
[ ] Container Insights is enabled
[ ] Production logs are visible in ContainerLogV2
[ ] CPU and memory metrics are visible
[ ] Required screenshots are saved
[ ] README is complete
[ ] Required 3–5 minute demo video is recorded and submitted separately
[ ] Azure resources are stopped or deleted when no longer needed
```

---

## Closing note

This project is deliberately a **learning-scale deployment**, not a production reference architecture. The one-node AKS configuration, small replica counts, HTTP-only public listener, and basic alerting keep the project understandable and affordable while still demonstrating the end-to-end DevOps lifecycle.

For a production system, strengthen availability, security, networking, observability, infrastructure-as-code, secrets management, TLS, backup, policy, and capacity planning.
