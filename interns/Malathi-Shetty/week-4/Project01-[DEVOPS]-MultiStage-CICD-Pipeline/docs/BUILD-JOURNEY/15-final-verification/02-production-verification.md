# Production Verification

## Purpose

This document provides the production-level verification procedure for the FlavorForge Azure DevSecOps project.

The purpose is to verify that the deployed application, infrastructure, security controls, GitOps workflow, and supporting services are functioning correctly after deployment.

This verification focuses on the deployed environment rather than only the build process.

> **Important:** Production verification must be based on actual observed results. Do not mark a check as successful unless it has been verified.

---

# 1. Production Verification Flow

The production verification process follows this sequence:

```text
Azure Resources
      ↓
AKS Cluster
      ↓
Kubernetes Nodes
      ↓
Application Pods
      ↓
Application Service
      ↓
Application Health
      ↓
Argo CD
      ↓
GitOps Synchronization
      ↓
Security & Quality
      ↓
Final Production State
````

---

# 2. Production Environment Details

The FlavorForge Week 4 Azure environment uses:

| Component                | Value                             |
| ------------------------ | --------------------------------- |
| Resource Group           | `flavorforge-rg`                  |
| Azure Region             | East US                           |
| Azure Container Registry | `flavorforgeacr2026ms`            |
| ACR Login Server         | `flavorforgeacr2026ms.azurecr.io` |
| ACR SKU                  | Basic                             |
| AKS Cluster              | `flavorforge-aks`                 |
| AKS Region               | East US                           |
| AKS Node Count           | 2                                 |
| AKS Node Size            | `Standard_D2as_v7`                |

> These are Week 4 FlavorForge resources. The separate Week 3 VM environment must not be used as production evidence for this project.

---

# 3. Azure Resource Verification

Check the resource group:

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

List resources:

```bash
az resource list \
  --resource-group flavorforge-rg \
  --output table
```

Verify that the expected FlavorForge resources are present.

The resource group should contain the resources required by the FlavorForge deployment.

---

# 4. ACR Production Verification

Verify the registry:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

Verify the login server:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

Expected:

```text
flavorforgeacr2026ms.azurecr.io
```

List repositories:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Check the application image tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository-name> \
  --output table
```

Confirm that the image referenced by the deployed Kubernetes workload exists in ACR.

---

# 5. AKS Cluster Verification

Verify the cluster:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --output table
```

Check the provisioning state:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --query provisioningState \
  --output tsv
```

Verify that the cluster is available before checking application workloads.

---

# 6. AKS Node Verification

Refresh credentials:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

Check nodes:

```bash
kubectl get nodes
```

Detailed node information:

```bash
kubectl get nodes -o wide
```

Verify:

* Expected node count is present.
* Nodes are in `Ready` state.
* No node is unexpectedly `NotReady`.
* Kubernetes can communicate with all expected nodes.

---

# 7. Kubernetes Workload Verification

List all workloads:

```bash
kubectl get all -A
```

Check pods:

```bash
kubectl get pods -A
```

Check deployments:

```bash
kubectl get deployments -A
```

Check services:

```bash
kubectl get services -A
```

The FlavorForge application resources should be present in the expected namespace.

---

# 8. Pod Readiness Verification

Check the application pods:

```bash
kubectl get pods -A
```

Verify:

```text
STATUS = Running
READY  = expected containers ready
```

Investigate any unexpected state such as:

```text
Pending
CrashLoopBackOff
ImagePullBackOff
ErrImagePull
Error
ContainerCreating
```

For an unhealthy pod:

```bash
kubectl describe pod <pod-name> -n <namespace>
```

Check logs:

```bash
kubectl logs <pod-name> -n <namespace>
```

A production environment should not be considered healthy while the application has unexplained unhealthy pods.

---

# 9. Deployment Health Verification

Check the Deployment:

```bash
kubectl get deployment <deployment-name> -n <namespace>
```

Check rollout:

```bash
kubectl rollout status \
  deployment/<deployment-name> \
  -n <namespace>
```

Check the Deployment details:

```bash
kubectl describe deployment \
  <deployment-name> \
  -n <namespace>
```

Verify:

* Desired replicas.
* Available replicas.
* Ready replicas.
* Current image.
* Deployment conditions.

---

# 10. Application Image Verification

Check the image used by the Deployment:

```bash
kubectl get deployment <deployment-name> \
  -n <namespace> \
  -o jsonpath='{.spec.template.spec.containers[*].image}'
```

Compare the result with the image available in ACR:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository-name> \
  --output table
```

The deployed image must correspond to an image that exists in the configured registry.

---

# 11. Service Verification

List Services:

```bash
kubectl get services -A
```

Inspect the application Service:

```bash
kubectl describe service \
  <service-name> \
  -n <namespace>
```

Verify:

* Service exists.
* Correct Service type is configured.
* Selector matches application pods.
* Endpoints are available where expected.

Check endpoints:

```bash
kubectl get endpoints \
  <service-name> \
  -n <namespace>
```

---

# 12. Application Connectivity Verification

Determine how the FlavorForge application is exposed.

For a LoadBalancer Service:

```bash
kubectl get service \
  <service-name> \
  -n <namespace>
```

For a NodePort Service:

```bash
kubectl get service \
  <service-name> \
  -n <namespace>
```

Use the actual endpoint exposed by the project.

Do not assume an external IP exists if the Service configuration does not provide one.

---

# 13. Application Functional Verification

Once the application endpoint is available, verify the application itself.

Check the configured health endpoint if the application provides one.

For example:

```bash
curl http://<application-endpoint>/<health-path>
```

Verify the expected response.

If FlavorForge provides an application API, verify a representative endpoint:

```bash
curl http://<application-endpoint>/<api-path>
```

The exact endpoint must match the application implementation.

Do not document a health endpoint unless it actually exists in the project.

---

# 14. Application Logs Verification

Review application logs:

```bash
kubectl logs \
  <pod-name> \
  -n <namespace>
```

Look for:

* Startup errors.
* Database connection errors.
* Configuration errors.
* Authentication failures.
* Repeated exceptions.
* Unexpected application crashes.

A successful pod status does not automatically mean that the application is functioning correctly.

---

# 15. Kubernetes Events Verification

Check recent events:

```bash
kubectl get events \
  -A \
  --sort-by=.lastTimestamp
```

Review for:

* Failed scheduling.
* Image pull errors.
* Probe failures.
* Container failures.
* Mount errors.
* Permission errors.

Unexpected critical events should be investigated before final production sign-off.

---

# 16. Argo CD Production Verification

Check Argo CD applications:

```bash
argocd app list
```

Get the FlavorForge application:

```bash
argocd app get <application-name>
```

Verify:

```text
Sync Status
Health Status
Repository
Revision
Path
```

Expected healthy GitOps state:

```text
Synced
Healthy
```

where applicable.

---

# 17. Argo CD Resource Verification

Check resources managed by Argo CD:

```bash
argocd app resources <application-name>
```

Verify that the expected Kubernetes resources are managed by the Application.

The Argo CD resource tree should correspond to the deployed FlavorForge resources.

---

# 18. GitOps Drift Verification

Check for differences:

```bash
argocd app diff <application-name>
```

The desired state in Git and the live state in Kubernetes should be aligned.

If differences are detected:

1. Identify the changed resource.
2. Determine whether the change was intentional.
3. Check Git.
4. Check Kubernetes.
5. Correct the source of truth.
6. Reconcile using Argo CD.

Do not permanently fix GitOps drift only by making manual Kubernetes changes.

---

# 19. Self-Healing Verification

If self-healing is configured for the Argo CD Application, verify its configured state:

```bash
argocd app get <application-name>
```

Review the sync policy.

If an intentional test is performed, document the exact test and result.

Do not delete production resources simply to demonstrate self-healing unless the test is explicitly planned and safe.

---

# 20. Azure DevOps Production Verification

Review the latest successful Azure DevOps pipeline.

Verify the important stages:

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
Deploy
```

The actual pipeline execution should be used as evidence.

Do not treat the presence of YAML stages as proof that they executed successfully.

---

# 21. SonarCloud Production Verification

Verify the latest SonarCloud analysis.

Check:

* Project.
* Branch.
* Analysis timestamp.
* Quality Gate.
* Reported issues.
* Pipeline integration.

Record the actual Quality Gate result.

Do not replace an actual Quality Gate result with a generic statement such as "SonarCloud is configured."

---

# 22. Trivy Production Verification

Verify the security scan associated with the deployed build.

Check the filesystem scan where configured:

```bash
trivy fs .
```

Check the container image where configured:

```bash
trivy image <image-name>:<tag>
```

Review the project's stored Trivy reports.

Confirm that the deployed image was scanned according to the project's configured security process.

---

# 23. Production Configuration Verification

Review the Kubernetes configuration used by the deployed application.

Check:

```bash
kubectl get configmaps -A
```

Check Secrets without exposing their values:

```bash
kubectl get secrets -A
```

Do not print or commit secret values.

Verify that:

* Required configuration exists.
* Secret references are valid.
* No credentials are exposed in manifests.
* No sensitive values appear in logs or screenshots.

---

# 24. Resource Health Verification

Check node resource usage when metrics are available:

```bash
kubectl top nodes
```

Check pod resource usage:

```bash
kubectl top pods -A
```

If metrics are unavailable, record that fact rather than treating it as a failed application deployment.

Resource usage should be reviewed for obvious CPU or memory pressure.

---

# 25. Production Security Verification

Confirm the production deployment maintains the project's security controls:

```text
Source
  ↓
Code Quality
  ↓
Dependency / Image Security
  ↓
Container
  ↓
Registry
  ↓
Kubernetes
  ↓
GitOps
```

Verify that:

* SonarCloud is integrated.
* Trivy scanning is integrated.
* Container images are stored in ACR.
* Kubernetes deployment is managed through the intended configuration.
* Argo CD tracks the Git repository.
* Secrets are not exposed in source control.

---

# 26. Production Evidence Checklist

Collect evidence for:

* [ ] Azure Resource Group.
* [ ] ACR.
* [ ] ACR image/tag.
* [ ] AKS cluster.
* [ ] AKS nodes.
* [ ] Kubernetes pods.
* [ ] Kubernetes deployment.
* [ ] Kubernetes service.
* [ ] Application health.
* [ ] Azure DevOps pipeline.
* [ ] SonarCloud.
* [ ] Trivy.
* [ ] Argo CD Application.
* [ ] Argo CD synchronization.
* [ ] Application endpoint.
* [ ] Final Git repository state.

Only use screenshots that actually correspond to the current FlavorForge project.

---

# 27. Production Verification Matrix

| Area          | Verification             | Status |
| ------------- | ------------------------ | ------ |
| Azure         | Resource group available | ☐      |
| ACR           | Registry available       | ☐      |
| ACR           | Expected image available | ☐      |
| AKS           | Cluster available        | ☐      |
| AKS           | Nodes Ready              | ☐      |
| Kubernetes    | Pods Running             | ☐      |
| Kubernetes    | Deployment Ready         | ☐      |
| Kubernetes    | Service available        | ☐      |
| Application   | Health verified          | ☐      |
| Application   | Logs reviewed            | ☐      |
| Argo CD       | Application Synced       | ☐      |
| Argo CD       | Application Healthy      | ☐      |
| GitOps        | No unexplained drift     | ☐      |
| Azure DevOps  | Latest pipeline verified | ☐      |
| SonarCloud    | Quality Gate verified    | ☐      |
| Trivy         | Security scan verified   | ☐      |
| Security      | Secrets protected        | ☐      |
| Documentation | Evidence available       | ☐      |

---

# 28. Production Sign-Off Criteria

The FlavorForge environment should be considered production-verified only when:

1. Azure resources are available.
2. ACR contains the required image.
3. AKS is available.
4. Nodes are Ready.
5. Application pods are Ready.
6. Deployment rollout is successful.
7. Service routing is working.
8. Application functionality is verified.
9. Argo CD reports the expected synchronization state.
10. No unexplained GitOps drift remains.
11. The relevant Azure DevOps pipeline execution is verified.
12. SonarCloud results are verified.
13. Trivy results are verified.
14. No credentials or secrets are exposed.
15. Supporting evidence is available.

---

# 29. Final Production State

The expected production flow is:

```text
GitHub
   ↓
Azure DevOps
   ↓
Build
   ↓
Test
   ↓
SonarCloud
   ↓
Trivy
   ↓
Docker
   ↓
ACR
   ↓
AKS
   ↓
Kubernetes
   ↓
Argo CD
   ↓
FlavorForge Application
   ↓
Healthy Production State
```

The production environment is considered verified only after the actual deployed application and supporting infrastructure have been checked.

---

# 30. Important Verification Rule

A green pipeline alone does not prove that the production application is healthy.

Likewise:

```text
Pipeline Success ≠ Application Health
```

and:

```text
Argo CD Synced ≠ Application Functionality
```

Production verification therefore checks the complete chain:

```text
Pipeline
   +
Infrastructure
   +
Kubernetes
   +
GitOps
   +
Application
```

This provides stronger evidence that FlavorForge is operating as an integrated Azure DevSecOps solution.