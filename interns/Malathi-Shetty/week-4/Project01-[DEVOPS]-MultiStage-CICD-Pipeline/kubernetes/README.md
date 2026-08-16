# ☸️ FlavorForge Kubernetes Deployment

This directory contains all Kubernetes manifests required to deploy the **FlavorForge Azure DevSecOps Capstone** to **Azure Kubernetes Service (AKS)**.

The deployment follows Kubernetes best practices by separating common resources from environment-specific configurations using **Kustomize**. This approach reduces duplication, improves maintainability, and supports consistent deployments across Development, QA, and Production environments.

---

# 🚀 Technologies Used

| Technology | Purpose |
|------------|---------|
| Kubernetes | Container orchestration |
| Azure Kubernetes Service (AKS) | Managed Kubernetes cluster |
| Kustomize | Environment-specific configuration management |
| NGINX Ingress Controller | External traffic routing |
| ConfigMaps | Non-sensitive configuration |
| Secrets | Sensitive configuration |
| Horizontal Pod Autoscaler (HPA) | Automatic pod scaling |

---

# 📂 Directory Structure

```text
kubernetes/
├── base/
│   ├── autoscaling/
│   │   ├── hpa.yaml
│   │   └── kustomization.yaml
│   │
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   │
│   ├── config/
│   │   ├── backend-configmap.yaml
│   │   ├── secret-template.yaml
│   │   └── kustomization.yaml
│   │
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   │
│   ├── ingress/
│   │   ├── ingress.yaml
│   │   └── kustomization.yaml
│   │
│   ├── namespace.yaml
│   └── kustomization.yaml
│
├── overlays/
│   ├── dev/
│   ├── qa/
│   └── prod/
│
└── README.md
```

---

# 🏗️ Architecture

The Kubernetes deployment consists of the following resources:

- Namespace
- Frontend Deployment
- Backend Deployment
- Frontend Service
- Backend Service
- ConfigMap
- Secret
- Ingress
- Horizontal Pod Autoscaler (HPA)

These resources work together to provide a scalable and production-ready application deployment.

---

# 📁 Base Configuration

The `base/` directory contains Kubernetes manifests shared across all environments.

Common resources include:

- Namespace
- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

The base configuration remains environment-independent and serves as the foundation for all deployments.

---

# 🌍 Environment Overlays

The `overlays/` directory contains environment-specific customizations.

Available environments:

- Development (`dev`)
- Quality Assurance (`qa`)
- Production (`prod`)

Each overlay references the common base manifests and applies only the changes required for that environment, such as replica counts and ingress configuration.

---

# 📦 Kubernetes Resources

## Namespace

A dedicated namespace is used to isolate FlavorForge resources from other workloads running in the Kubernetes cluster.

Resource:

- `namespace.yaml`

Example:

```bash
kubectl get namespaces
```

Verify:

```bash
kubectl get all -n flavorforge-dev
kubectl get all -n flavorforge-qa
kubectl get all -n flavorforge-prod
```

---

## Backend Deployment

The backend Deployment manages the Express.js application Pods.

Responsibilities:

- Creates backend Pods
- Maintains desired replica count
- Performs rolling updates
- Automatically recreates failed Pods

Resource:

```text
base/backend/deployment.yaml
```

Verify:

```bash
kubectl get deployment -n flavorforge-dev
kubectl get pods -n flavorforge-dev
```

---

## Frontend Deployment

The frontend Deployment manages the React application Pods served by Nginx.

Responsibilities:

- Deploys the React application
- Maintains replica count
- Supports rolling updates
- Ensures high availability

Resource:

```text
base/frontend/deployment.yaml
```

Verify:

```bash
kubectl get deployment -n flavorforge-dev
kubectl get pods -n flavorforge-dev
```

---

## Services

Kubernetes Services provide stable networking for application Pods.

Current Services:

- Frontend Service
- Backend Service

Resources:

```text
base/frontend/service.yaml

base/backend/service.yaml
```

Verify:

```bash
kubectl get svc -n flavorforge-dev
```

---

## ConfigMap

A ConfigMap stores non-sensitive application configuration separately from the container image.

Current configuration includes:

- Application name
- Environment
- Version
- Backend configuration values

Resource:

```text
base/config/backend-configmap.yaml
```

Verify:

```bash
kubectl get configmap -n flavorforge-dev

kubectl describe configmap backend-config-dev -n flavorforge-dev
```

Separating configuration from the application image makes deployments more flexible across environments.

---

## Secret

Sensitive configuration is stored using Kubernetes Secrets.

Examples include:

- JWT Secret
- Database Password

Resource:

```text
base/config/secret-template.yaml
```

Verify:

```bash
kubectl get secrets -n flavorforge-dev

kubectl describe secret backend-secret-dev -n flavorforge-dev
```

> **Note:** Secret values are Base64 encoded by Kubernetes and should not be committed with real production credentials.

---

## Ingress

Ingress exposes the application through a single external entry point.

The project uses an NGINX Ingress Controller to route traffic to the frontend and backend services.

Resource:

```text
base/ingress/ingress.yaml
```

Environment-specific ingress configuration is available under:

```text
overlays/qa/

overlays/prod/
```

Verify:

```bash
kubectl get ingress -A
```

---

## Horizontal Pod Autoscaler (HPA)

The Horizontal Pod Autoscaler automatically adjusts the number of backend Pods based on CPU utilization.

Current configuration:

- Minimum replicas: 2
- Maximum replicas: 5
- Target CPU utilization: 70%

Resource:

```text
base/autoscaling/hpa.yaml
```

Verify:

```bash
kubectl get hpa -n flavorforge-dev

kubectl describe hpa -n flavorforge-dev
```

The HPA helps improve application availability by automatically scaling the backend during increased workload.

---

# 🧩 Kustomize

FlavorForge uses **Kustomize** to manage Kubernetes manifests across multiple environments.

Kustomize allows a common **base** configuration to be reused while applying environment-specific customizations through **overlays**.

Current environments:

- Development (`dev`)
- Quality Assurance (`qa`)
- Production (`prod`)

Each overlay customizes only the resources that differ from the base, such as:

- Replica count
- Environment-specific configuration
- Ingress configuration

This approach reduces YAML duplication and simplifies maintenance.

---

# 🚀 Deployment

Deploy the application using the appropriate Kustomize overlay.

## Development

```bash
kubectl apply -k overlays/dev
```

Verify:

```bash
kubectl get all -n flavorforge-dev
```

---

## Quality Assurance

```bash
kubectl apply -k overlays/qa
```

Verify:

```bash
kubectl get all -n flavorforge-qa
```

---

## Production

```bash
kubectl apply -k overlays/prod
```

Verify:

```bash
kubectl get all -n flavorforge-prod
```

---

# 🔍 Verification

Check that all Kubernetes resources have been created successfully.

View Pods:

```bash
kubectl get pods -A
```

View Deployments:

```bash
kubectl get deployments -A
```

View Services:

```bash
kubectl get svc -A
```

View ConfigMaps:

```bash
kubectl get configmaps -A
```

View Secrets:

```bash
kubectl get secrets -A
```

View Ingress:

```bash
kubectl get ingress -A
```

View Horizontal Pod Autoscaler:

```bash
kubectl get hpa -A
```

---

# 🏗️ Deployment Workflow

The FlavorForge deployment follows a GitOps-friendly workflow.

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Azure DevOps Pipeline
      │
      ▼
Build & Test
      │
      ▼
Docker Images
      │
      ▼
Azure Container Registry (ACR)
      │
      ▼
Kustomize Overlay
      │
      ▼
Azure Kubernetes Service (AKS)
      │
      ▼
NGINX Ingress
      │
      ▼
FlavorForge Application
```

This workflow ensures consistent deployments across all environments while keeping the Kubernetes manifests reusable and maintainable.

---

# 🛠️ Troubleshooting

## Pods not starting

```bash
kubectl get pods -A

kubectl describe pod <pod-name> -n <namespace>

kubectl logs <pod-name> -n <namespace>
```

---

## Deployment issues

```bash
kubectl get deployment -A

kubectl rollout status deployment/<deployment-name> -n <namespace>
```

---

## Service issues

```bash
kubectl get svc -A

kubectl describe svc <service-name> -n <namespace>
```

---

## Ingress issues

```bash
kubectl get ingress -A

kubectl describe ingress <ingress-name> -n <namespace>
```

---

## HPA issues

```bash
kubectl get hpa -A

kubectl describe hpa <hpa-name> -n <namespace>
```

---

## Configuration issues

```bash
kubectl get configmap -A

kubectl get secret -A
```

---

# 🧹 Cleanup

Remove resources from a specific environment.

## Development

```bash
kubectl delete -k overlays/dev
```

---

## Quality Assurance

```bash
kubectl delete -k overlays/qa
```

---

## Production

```bash
kubectl delete -k overlays/prod
```

---

To verify that the resources have been removed:

```bash
kubectl get all -A
```

---

# ✅ Best Practices Followed

The Kubernetes manifests follow several cloud-native and production-oriented practices:

- Organized using Kustomize base and overlays
- Separate configurations for Development, QA, and Production
- Environment-specific replica management
- ConfigMaps for non-sensitive configuration
- Secrets for sensitive configuration
- Dedicated Namespace for resource isolation
- NGINX Ingress for external traffic routing
- Horizontal Pod Autoscaler (HPA) for automatic scaling
- Modular and reusable manifest structure
- GitOps-friendly repository organization

---

# 📚 Learning Outcomes

This Kubernetes implementation demonstrates practical experience with:

- Kubernetes resource management
- Azure Kubernetes Service (AKS)
- Deployments and Services
- ConfigMaps and Secrets
- NGINX Ingress Controller
- Horizontal Pod Autoscaler (HPA)
- Kustomize base and overlays
- Environment-specific deployments
- Application verification and troubleshooting
- Production-style Kubernetes organization

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Project README](../README.md) | Project overview |
| [Pipeline Documentation](../docs/pipeline/README.md) | Azure DevOps CI/CD pipeline |
| [Argo CD Documentation](../argocd/README.md) | GitOps deployment |
| [Implementation Guide](../docs/implementation/README.md) | Complete implementation guide |
| [Verification Reports](../docs/project/04-verification-and-validation-report/) | Project verification documents |
| [Troubleshooting Guide](../docs/troubleshooting/README.md) | Kubernetes and deployment troubleshooting |

---

# 👩‍💻 Author

**Malathi Shetty**

FlavorForge Azure DevSecOps Capstone Project

Built as part of the **CBC DevSecOps Internship** to demonstrate modern cloud-native application deployment using **Docker, Kubernetes, Azure Kubernetes Service (AKS), Azure DevOps CI/CD, and GitOps practices**.