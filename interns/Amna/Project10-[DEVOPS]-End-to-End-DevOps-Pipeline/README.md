# Project 10: End-to-End DevOps Pipeline for a Web Application

This capstone project demonstrates the complete DevOps lifecycle for a Python Flask web application.

The project covers source control, automated testing, Docker image creation, Azure Pipelines, container registry integration, Kubernetes deployment, ingress routing, autoscaling, monitoring, and technical documentation.

## Problem statement

Software teams need a reliable and repeatable way to test, package, deploy, expose, scale, and monitor web applications.

Manual deployment processes can lead to:

- Inconsistent application environments
- Deployment errors
- Limited scalability
- Difficult troubleshooting
- Slow release cycles

This project provides an automated DevOps workflow for deploying a containerized web application to Kubernetes.

## Project objectives

The main objectives are:

- Store application and infrastructure code in Git
- Run automated unit tests
- Build the application as a Docker image
- Push versioned images to Azure Container Registry
- Deploy the application to Kubernetes
- Configure staging and production environments
- Expose the application through an ingress controller
- Configure readiness and liveness probes
- Configure CPU and memory limits
- Automatically scale production pods
- Monitor application and container health
- Document the complete workflow

## Application

The application is a lightweight Flask web application designed for DevOps demonstrations.

### Endpoints

| Endpoint | Purpose |
|---|---|
| `/` | Main application page |
| `/health` | Health check for Docker and Kubernetes |
| `/version` | Application version and environment |
| `/api/status` | Application runtime status |

## Repository structure

```text
Project10-[DEVOPS]-End-to-End-DevOps-Pipeline/
├── app/
│   ├── app/
│   │   ├── static/
│   │   ├── templates/
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
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   ├── production/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── hpa.yaml
│   └── production-namespace.yaml
├── screenshots/
├── docs/
├── azure-pipelines.yml
├── .gitignore
└── README.md
Target Azure architecture
Developer
    |
    v
GitHub repository
    |
    v
Azure Pipeline
    |
    +--> Run pytest tests
    |
    +--> Build Docker image
    |
    +--> Push image to Azure Container Registry
    |
    v
Azure Kubernetes Service
    |
    +--> Staging namespace
    |
    +--> Production namespace
    |
    v
Azure Application Gateway
    |
    v
Web application users

Azure Monitor and Container Insights collect
cluster, pod, container, CPU, memory, and log data.
Current local validation architecture

The Kubernetes components were first validated locally before real Azure deployment.

Floci-AZ ARM and ACR emulator
          |
          v
Local Docker registry
          |
          v
K3s Kubernetes cluster
          |
          v
Traefik Ingress
          |
          v
Flask application

Floci-AZ was used to emulate Azure resource management and Azure Container Registry.

The Floci-AZ AKS implementation could not create its expected K3s sidecar container in the current environment. A manually managed K3s Docker container was therefore used as a documented local AKS compatibility workaround.

Traefik was used as the local ingress solution. It validates Kubernetes routing but does not replace the final Azure Application Gateway implementation.

Technologies used
Category	Technology
Application	Python, Flask, Gunicorn
Testing	pytest
Source control	Git and GitHub
Containerization	Docker
CI/CD	Azure Pipelines
Container registry	Azure Container Registry and Floci-AZ
Orchestration	Kubernetes, K3s, AKS
Ingress	Traefik locally, Azure Application Gateway for Azure
Autoscaling	Kubernetes Horizontal Pod Autoscaler
Monitoring	Kubernetes Metrics API, Azure Monitor, Container Insights
Local environment	WSL Ubuntu and Docker Desktop
Run locally

Create and activate a virtual environment:

python3 -m venv .venv
source .venv/bin/activate

Install dependencies:

pip install -r app/requirements.txt

Start the application:

cd app
python run.py

Open:

http://localhost:8000
Run unit tests

From the project root:

cd app
../.venv/bin/python -m pytest -q tests/test_app.py

Expected result:

3 passed
Build the Docker image

From the project root:

docker build \
  -t devops-capstone-webapp:local \
  ./app
Run the Docker container
docker run --rm \
  --name devops-capstone-webapp \
  -p 8000:8000 \
  -e APP_VERSION=1.0.0 \
  -e APP_ENVIRONMENT=local-docker \
  devops-capstone-webapp:local

Test the health endpoint:

curl http://localhost:8000/health
Application configuration
Variable	Example
APP_NAME	DevOps Capstone Web App
APP_VERSION	1.0.0
APP_ENVIRONMENT	staging
Kubernetes environments

The project contains two Kubernetes environments.

Staging
Namespace: staging
Replicas: 2
Health probes enabled
CPU and memory requests configured
Traefik hostname: capstone.local
Production
Namespace: production
Minimum replicas: 3
Maximum replicas: 6
CPU autoscaling target: 70%
Health probes enabled
CPU and memory requests and limits configured
Traefik hostname: capstone-prod.local
Deploy Kubernetes resources

Set the Kubeconfig:

export KUBECONFIG="$HOME/.kube/capstone-k3s.yaml"

Deploy staging:

kubectl apply -f k8s/staging

Deploy production:

kubectl apply -f k8s/production-namespace.yaml
kubectl apply -f k8s/production

Check the deployments:

kubectl get pods -n staging
kubectl get pods -n production
Health checks

The Deployment uses the /health endpoint for:

Readiness probes
Liveness probes

The readiness probe prevents traffic from reaching a pod until the application is ready.

The liveness probe restarts the container if the application becomes unhealthy.

Horizontal Pod Autoscaler test

The production HPA was tested using a temporary load-generator pod.

During the test:

CPU utilization increased above the 70% target
Kubernetes scaled the application from 3 to 6 replicas
After the load stopped, Kubernetes reduced the application to 3 replicas

Check the HPA:

kubectl get hpa -n production
Azure Pipeline

The pipeline definition is stored in:

azure-pipelines.yml

The current validation stage performs:

Repository checkout
Python 3.12 configuration
Dependency installation
Unit testing
Test-result publication
Docker image build

The remaining Azure stages will provide:

Authentication with Azure
Docker image push to Azure Container Registry
AKS deployment
Application Gateway integration
Azure Monitor and Container Insights validation
Monitoring

Local Kubernetes monitoring was validated using:

kubectl top pods -n production

The final Azure environment will use:

Azure Monitor
Container Insights
AKS workload metrics
Pod and container logs
CPU and memory monitoring
Project status
Component	Status
Flask application	Completed
Unit tests	Completed
Dockerfile	Completed
Local container validation	Completed
Floci-AZ ACR validation	Completed
Local Kubernetes deployment	Completed
Staging environment	Completed
Production environment	Completed
Ingress validation	Completed locally
Horizontal Pod Autoscaler	Completed and tested
Azure Pipeline validation stage	Completed
Azure ACR pipeline push	Pending
Real Azure AKS deployment	Pending
Azure Application Gateway	Pending
Azure Monitor and Container Insights	Pending
Screenshots	Pending
Demo video	Pending
Final presentation	Pending
Screenshots

The final submission will include screenshots of:

Successful Azure Pipeline execution
Docker image stored in Azure Container Registry
Staging and production pods
Application accessed through Application Gateway
Horizontal Pod Autoscaler test
Azure Monitor and Container Insights
Future enhancements
Add HTTPS and certificate management
Add security scanning for Docker images
Add deployment approval before production
Add Helm charts
Add infrastructure provisioning with Terraform or Bicep
Add centralized application logging
Add alert rules for failures and high resource usage
Add rollback automation
Add code-quality and vulnerability checks
Key learnings

This project demonstrates how application development and infrastructure operations can be combined into one automated workflow.

The main practical skills include:

Structuring a DevOps repository
Writing production-oriented Dockerfiles
Creating Kubernetes manifests
Managing staging and production namespaces
Configuring health probes and resource limits
Testing Kubernetes autoscaling
Creating an Azure Pipeline
Troubleshooting container, filesystem, networking, and Kubernetes issues
