# End-to-End Verification

## Purpose

This document provides the final end-to-end verification procedure for the FlavorForge Azure DevSecOps project.

The objective is to confirm that the complete DevSecOps and GitOps workflow is connected correctly and that the major components of the project can be verified from source code through deployment.

The verification flow is:

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
Docker Image
   ↓
Azure Container Registry
   ↓
AKS
   ↓
Kubernetes
   ↓
Argo CD
   ↓
FlavorForge Application
````

This document records the verification process.

Only results that were actually checked should be marked as verified.

---

# 1. Verification Scope

The final verification covers:

* GitHub repository
* Application source code
* Docker image
* Azure resources
* Azure Container Registry
* AKS cluster
* Kubernetes resources
* Kustomize configuration
* Azure DevOps pipeline
* SonarCloud
* Trivy
* Argo CD
* FlavorForge application
* GitOps synchronization
* Documentation
* Evidence and reproducibility

---

# 2. Project Information

The FlavorForge Week 4 Azure resources use the following configuration:

| Component                | Value                             |
| ------------------------ | --------------------------------- |
| Resource Group           | `flavorforge-rg`                  |
| Azure Container Registry | `flavorforgeacr2026ms`            |
| ACR Login Server         | `flavorforgeacr2026ms.azurecr.io` |
| ACR Region               | East US                           |
| ACR SKU                  | Basic                             |
| AKS Cluster              | `flavorforge-aks`                 |
| AKS Region               | East US                           |
| AKS Node Count           | 2                                 |
| AKS Node Size            | `Standard_D2as_v7`                |

> **Important:** These are FlavorForge Week 4 resources. They must not be confused with the separate Week 3 Azure VM lab.

---

# 3. Git Repository Verification

From the project directory:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check the repository status:

```bash
git status
```

Expected:

```text
On branch main
```

The working tree should be clean before final verification, unless there are intentional uncommitted changes.

Check the latest commits:

```bash
git log --oneline -10
```

Check the remote repository:

```bash
git remote -v
```

Verify that the repository points to the intended GitHub repository.

---

# 4. Project Structure Verification

Check the main project structure:

```bash
find . -maxdepth 2 -type d | sort
```

Verify that the repository contains the major project areas required for the FlavorForge implementation.

The BUILD-JOURNEY documentation should also exist:

```bash
find docs/week-4/BUILD-JOURNEY -maxdepth 2 -type f | sort
```

The final documentation structure should include:

```text
01-prerequisites
02-github
03-application
04-docker
05-azure
06-kubernetes
07-kustomize
08-azure-devops
09-sonarcloud
10-trivy
11-argocd
12-devsecops
13-documentation
14-troubleshooting
15-final-verification
```

---

# 5. Application Verification

Verify the application source files:

```bash
find . -maxdepth 3 -type f | sort
```

Check the application build configuration.

For a Maven application:

```bash
ls
```

Verify that the expected Maven project files are present.

Run the application build using the project's configured build process.

For Maven:

```bash
mvn clean package
```

The build should complete successfully before continuing with downstream verification.

---

# 6. Docker Verification

Check Docker:

```bash
docker version
```

List Docker images:

```bash
docker images
```

Verify that the FlavorForge image exists locally.

If a container is used for local verification:

```bash
docker ps -a
```

Check the container logs:

```bash
docker logs <container-name-or-id>
```

Verify that the application container starts successfully.

---

# 7. Docker Image Verification

Inspect the image:

```bash
docker image inspect <image-name>:<tag>
```

Verify:

* Image exists.
* Expected tag is present.
* Image was created from the intended Dockerfile.
* Application starts successfully.

The local image tag and the Kubernetes image reference must be checked separately.

> **Important:** Do not assume that a locally available image tag is the same as the image tag currently referenced by Kubernetes.

---

# 8. Azure Account Verification

Verify the active Azure account:

```bash
az account show --output table
```

Check the active subscription before running Azure resource commands.

List the resource group:

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

Expected resource group:

```text
flavorforge-rg
```

---

# 9. Azure Container Registry Verification

Check the ACR:

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

Check the relevant image tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository-name> \
  --output table
```

Confirm that the image referenced by the deployment exists in ACR.

---

# 10. AKS Verification

Verify the AKS cluster:

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

The cluster should be in a usable state.

---

# 11. kubectl Connectivity Verification

Refresh AKS credentials:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

Check the current Kubernetes context:

```bash
kubectl config current-context
```

Check nodes:

```bash
kubectl get nodes
```

Verify that the expected AKS nodes are available and in `Ready` state.

---

# 12. Kubernetes Resource Verification

List namespaces:

```bash
kubectl get namespaces
```

List pods:

```bash
kubectl get pods -A
```

List deployments:

```bash
kubectl get deployments -A
```

List services:

```bash
kubectl get services -A
```

The FlavorForge workloads should be present in the namespace used by the project.

---

# 13. Pod Health Verification

Check the FlavorForge pods:

```bash
kubectl get pods -A
```

Verify:

* Pods are running.
* Containers are ready.
* Restart counts are reasonable.
* No pods are stuck in `Pending`.
* No pods are stuck in `CrashLoopBackOff`.
* No pods are stuck in `ImagePullBackOff`.

For an individual pod:

```bash
kubectl describe pod <pod-name> -n <namespace>
```

Check logs when required:

```bash
kubectl logs <pod-name> -n <namespace>
```

---

# 14. Deployment Verification

Check the FlavorForge Deployment:

```bash
kubectl get deployment <deployment-name> -n <namespace>
```

Check rollout status:

```bash
kubectl rollout status deployment/<deployment-name> -n <namespace>
```

The Deployment should report a successful rollout.

Verify the image:

```bash
kubectl get deployment <deployment-name> \
  -n <namespace> \
  -o jsonpath='{.spec.template.spec.containers[*].image}'
```

Compare this image reference with the image available in ACR.

---

# 15. Kubernetes Service Verification

Check the Service:

```bash
kubectl get service -n <namespace>
```

Describe the Service:

```bash
kubectl describe service <service-name> -n <namespace>
```

Verify that the Service has the expected selector and endpoints.

Check endpoints:

```bash
kubectl get endpoints <service-name> -n <namespace>
```

The Service should route traffic to the intended application pods.

---

# 16. Kustomize Verification

Verify the Kustomize configuration used by the deployment.

Generate the manifests:

```bash
kubectl kustomize <overlay-directory>
```

The command should complete without errors.

Review the generated output for:

* Deployment
* Service
* ConfigMap
* Image reference
* Replicas
* Namespace
* Other required resources

Kustomize generation should succeed before considering the Kubernetes configuration verified.

---

# 17. Azure DevOps Pipeline Verification

Open the Azure DevOps project and review the FlavorForge pipeline.

Verify the pipeline contains the expected stages.

The project pipeline includes the DevSecOps workflow involving areas such as:

```text
Build
Test
Security
Code Quality
Docker Build
Trivy Scan
Push
Deploy
```

Review the latest pipeline execution.

Verify:

* Pipeline was triggered successfully.
* Build completed.
* Tests completed.
* Security checks completed.
* SonarCloud analysis completed.
* Docker image was built.
* Trivy scan completed.
* Image push completed.
* Deployment stage completed where applicable.

Do not mark a stage as verified only because the YAML contains the stage. Verify the actual pipeline execution.

---

# 18. SonarCloud Verification

Open the FlavorForge SonarCloud project.

Verify:

* Project exists.
* Analysis was completed.
* Quality Gate result is available.
* The expected branch was analyzed.
* No unexpected pipeline integration failure is present.

The Quality Gate should be checked from the actual SonarCloud result.

A successful pipeline stage alone should not be used as evidence for the Quality Gate unless the pipeline explicitly verifies it.

---

# 19. Trivy Verification

Verify the Trivy configuration and results.

Filesystem scan:

```bash
trivy fs .
```

Docker image scan:

```bash
trivy image <image-name>:<tag>
```

Verify the configured security policy and review the generated results.

Check the existing project reports under the appropriate Trivy documentation/evidence directories.

The final verification should confirm that the security scanning stage was actually executed.

---

# 20. Argo CD Verification

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
Target Revision
Path
```

The desired final state should be:

```text
Synced
Healthy
```

where applicable.

---

# 21. Argo CD Resource Verification

Check the resources managed by Argo CD:

```bash
argocd app resources <application-name>
```

Verify that the expected Kubernetes resources are managed by the Application.

Review the Application tree in the Argo CD UI when visual evidence is required.

---

# 22. Argo CD GitOps Verification

Verify that Argo CD is tracking the intended Git repository and revision.

Check:

```bash
argocd app get <application-name>
```

Verify:

```text
Repository URL
Target Revision
Application Path
```

The Application should point to the intended FlavorForge Kubernetes/Kustomize configuration.

---

# 23. GitOps Drift Verification

Check whether the Application has differences:

```bash
argocd app diff <application-name>
```

A clean result indicates that the desired and live states are aligned.

If differences are reported, investigate them before marking the GitOps verification as complete.

---

# 24. Application Health Verification

Kubernetes health should be checked independently of Argo CD.

Check:

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

If the application is externally accessible, verify the application endpoint using the configured access method.

The final application verification should confirm that the application is reachable and functioning as expected.

---

# 25. End-to-End Verification Matrix

| Layer         | Verification                        | Status |
| ------------- | ----------------------------------- | ------ |
| GitHub        | Repository and source code verified | ☐      |
| Git           | Working tree and commits verified   | ☐      |
| Application   | Build verified                      | ☐      |
| Docker        | Image/build verified                | ☐      |
| Azure         | Resource group verified             | ☐      |
| ACR           | Registry and image verified         | ☐      |
| AKS           | Cluster verified                    | ☐      |
| Kubernetes    | Nodes verified                      | ☐      |
| Kubernetes    | Pods verified                       | ☐      |
| Kubernetes    | Deployment verified                 | ☐      |
| Kubernetes    | Service verified                    | ☐      |
| Kustomize     | Manifest generation verified        | ☐      |
| Azure DevOps  | Pipeline execution verified         | ☐      |
| SonarCloud    | Analysis/Quality Gate verified      | ☐      |
| Trivy         | Security scan verified              | ☐      |
| Argo CD       | Application verified                | ☐      |
| Argo CD       | Sync status verified                | ☐      |
| Argo CD       | Health status verified              | ☐      |
| GitOps        | Desired/live state verified         | ☐      |
| Application   | End-to-end access verified          | ☐      |
| Documentation | BUILD-JOURNEY verified              | ☐      |

---

# 26. Evidence Review

Review the project evidence directories before declaring the project complete.

Check:

```bash
find docs/week-4 -type f | sort
```

Check screenshots:

```bash
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | sort
```

Verify that screenshots referenced by documentation actually exist.

For example:

```bash
test -f <screenshot-path> && echo "Evidence exists"
```

Do not leave broken screenshot references in the final documentation.

---

# 27. Documentation Verification

Verify the BUILD-JOURNEY structure:

```bash
find docs/week-4/BUILD-JOURNEY -maxdepth 2 -type f | sort
```

The final structure should contain:

```text
13-documentation/
14-troubleshooting/
15-final-verification/
```

Verify the final verification documents:

```bash
find docs/week-4/BUILD-JOURNEY/15-final-verification \
  -maxdepth 1 \
  -type f \
  | sort
```

Expected files:

```text
01-end-to-end-verification.md
02-production-verification.md
03-reproducibility-check.md
04-project-completion-checklist.md
```

---

# 28. Final Git Verification

After completing documentation and verification:

```bash
git status
```

Review all changed files:

```bash
git status --short
```

Review the final diff:

```bash
git diff
```

If changes are intentional, stage them:

```bash
git add .
```

Review the staged changes:

```bash
git diff --cached
```

Commit only after reviewing the staged content.

---

# 29. Final Repository Verification

Check the latest commit:

```bash
git log --oneline -5
```

Verify the working tree:

```bash
git status
```

The final repository should have no unintended uncommitted changes.

If changes remain intentionally uncommitted, document why before considering the project complete.

---

# 30. End-to-End Success Criteria

FlavorForge can be considered end-to-end verified when the following are confirmed:

```text
GitHub
   ✓
   ↓
Azure DevOps Pipeline
   ✓
   ↓
Build + Test
   ✓
   ↓
SonarCloud
   ✓
   ↓
Trivy
   ✓
   ↓
Docker Image
   ✓
   ↓
ACR
   ✓
   ↓
AKS
   ✓
   ↓
Kubernetes
   ✓
   ↓
Argo CD
   ✓
   ↓
FlavorForge Application
   ✓
```

The exact status of each layer must be based on actual verification evidence.

---

# 31. Final Verification Principle

The purpose of this verification is not simply to show that individual commands work.

The objective is to demonstrate that the complete FlavorForge DevSecOps workflow operates as an integrated system:

```text
Code
 ↓
Build
 ↓
Test
 ↓
Security
 ↓
Quality
 ↓
Container
 ↓
Registry
 ↓
Cluster
 ↓
GitOps
 ↓
Application
```

A component should be marked **verified** only when its actual state or execution has been checked.

This provides a reliable final validation of the FlavorForge Azure DevSecOps implementation.