# FlavorForge Demo Startup Runbook

This runbook provides a repeatable checklist to prepare the FlavorForge Azure DevSecOps environment before every presentation, demo, or interview.

**Estimated Setup Time:** 10–20 minutes

---

# Demo Preparation

## Step 1 – Login to Azure

```bash
az login
```

Verify the active subscription:

```bash
az account show
```

(Optional)

```bash
az account list --output table
```

---

## Step 2 – Verify AKS Cluster Status

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query "powerState.code" \
  -o tsv
```

Expected output:

```
Running
```

If the cluster is stopped, start it.

```bash
az aks start \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

Wait until the cluster status changes to **Running**.

Verify again:

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query "powerState.code" \
  -o tsv
```

---

## Step 3 – Configure kubectl

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

---

## Step 4 – Login to Azure Container Registry

```bash
az acr login --name flavorforgeacr2026ms
```

---

## Step 5 – Verify AKS Cluster

```bash
az aks list --output table
```

```bash
kubectl get nodes
```

Expected:

- Cluster Status: Running
- Nodes Status: Ready

---

## Step 6 – Verify Kubernetes Resources

```bash
kubectl get pods -A
```

```bash
kubectl get all -n flavorforge
```

```bash
kubectl get ingress -A
```

```bash
kubectl get svc -A
```

Verify:

- All application pods are Running
- Services are available
- Ingress has an External IP

---

## Step 7 – Verify Application

Open the application:

```
http://<INGRESS-IP>
```

Verify:

- Home page loads
- Search functionality works
- Recipes are displayed

---

## Step 8 – Verify Health API

Open:

```
http://<INGRESS-IP>/api/health
```

Expected:

- HTTP 200
- JSON response indicating application health

---

## Step 9 – Verify Recipes API

Open:

```
http://4.157.77.48/api/recipes
```

Expected:

- JSON list of recipes

---

## Step 10 – Verify Argo CD

Check Argo CD pods:

```bash
kubectl get pods -n argocd
```

Check Argo CD service:

```bash
kubectl get svc -n argocd
```

If using LoadBalancer:

Open:

```
https://<EXTERNAL-IP>
```

If using ClusterIP:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Open:

```
https://localhost:8080
```

Retrieve the admin password if required:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

Username

```
admin
```

Password

Use the output of the above command or your custom password.

Verify the application:

```bash
kubectl get application -n argocd
```

Expected:

```
NAME          SYNC STATUS   HEALTH STATUS
flavorforge   Synced        Healthy
```

---

## Step 11 – Verify Azure DevOps

Open the latest successful pipeline.

Confirm:

- Build Successful
- Test Successful
- SonarCloud Analysis Successful
- Docker Build Successful
- Image Push Successful
- Deployment Successful

Do not trigger a new pipeline during the presentation unless you are demonstrating CI/CD.

---

## Step 12 – Verify SonarCloud

Open the SonarCloud dashboard.

Verify:

- Code Analysis Completed
- Quality Gate Status
- Code Coverage
- Bugs
- Vulnerabilities
- Code Smells

---

## Step 13 – Verify Azure Portal

Keep the following pages open:

- Resource Group
- Azure Kubernetes Service
- Azure Container Registry

---

# Demo Flow

```
Developer
      │
      ▼
GitHub
      │
      ▼
Azure DevOps Pipeline
      │
      ▼
SonarCloud
      │
      ▼
Trivy Security Scan
      │
      ▼
Docker Images
      │
      ▼
Azure Container Registry
      │
      ▼
Azure Kubernetes Service
      │
      ▼
Argo CD
      │
      ▼
FlavorForge Application
      │
      ▼
Health API
      │
      ▼
Q&A
```

---

# Important Notes

## AKS Startup

- AKS startup typically takes 5–15 minutes.
- Wait until the cluster status is **Running** before executing Kubernetes commands.

## Ingress

- Verify that the Ingress has an External IP.
- If the External IP changes after restarting AKS, use the updated IP.

## Argo CD

Verify that the FlavorForge application is:

- ✅ Healthy
- ✅ Synced

## Pipeline Warnings

During development, some informational warnings were observed, including:

- SonarCloud shallow clone warning
- npm audit warnings
- Azure DevOps informational messages

These warnings were reviewed and determined to be **non-blocking**. They did not affect the successful build, deployment, or application functionality.

## Development Challenges

During implementation, the following issues were encountered and resolved:

- Node.js version mismatch in Azure DevOps
- Docker build configuration issues
- SonarCloud configuration
- Kubernetes deployment configuration
- Argo CD synchronization
- Azure Container Registry authentication

Resolving these issues provided practical experience with Azure DevSecOps troubleshooting.

---

# Presentation Checklist

Before starting the presentation, verify:

- ✅ Azure Login Successful
- ✅ AKS Cluster Running
- ✅ Kubernetes Nodes Ready
- ✅ All Pods Running
- ✅ Ingress External IP Available
- ✅ FlavorForge Application Accessible
- ✅ Health API Working
- ✅ Recipes API Working
- ✅ Argo CD Healthy & Synced
- ✅ Azure DevOps Latest Pipeline Successful
- ✅ SonarCloud Analysis Available
- ✅ Latest Images Available in Azure Container Registry

---

# Browser Tabs to Keep Ready

- GitHub Repository
- Azure DevOps Pipeline
- SonarCloud Dashboard
- Azure Portal – Resource Group
- Azure Portal – AKS
- Azure Portal – Azure Container Registry
- Argo CD
- FlavorForge Application
- Health API

---

# After the Presentation

Stop the AKS cluster to avoid unnecessary Azure costs.

```bash
az aks stop \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

---

## Demo Startup Verification Video

The following video demonstrates the complete startup and verification process for the FlavorForge environment before a presentation or interview.

It includes:

- Starting the AKS cluster
- Connecting to the cluster using `kubectl`
- Verifying Kubernetes nodes and pods
- Checking Ingress and Services
- Verifying the FlavorForge application
- Testing the Health API
- Accessing Argo CD
- Confirming the application is **Healthy** and **Synced**
- Opening Azure DevOps, Azure Container Registry, SonarCloud, and Azure Portal

🎥 **Demo Video:**  
https://github.com/bymalathi/flavorforge-azure-devsecops-capstone/blob/main/screenshots/demo-recreated.mp4

This video demonstrates the complete startup checklist and environment verification for the FlavorForge Azure DevSecOps project.
