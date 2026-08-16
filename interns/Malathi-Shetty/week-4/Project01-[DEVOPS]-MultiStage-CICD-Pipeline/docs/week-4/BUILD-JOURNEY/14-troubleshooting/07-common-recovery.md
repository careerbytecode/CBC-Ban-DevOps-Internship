# Common Recovery Procedures

## Purpose

This document provides general recovery procedures for the FlavorForge Azure DevSecOps project.

The goal is to provide safe, repeatable recovery steps when a problem crosses multiple layers such as GitHub, Docker, Azure, Kubernetes, Azure DevOps, SonarCloud, Trivy, or Argo CD.

The most important principle is:

> **Diagnose first, change second, verify third.**

Do not immediately recreate resources or delete workloads when an error occurs.

---

# 1. General Recovery Process

Use the following sequence for most FlavorForge issues:

```text
Problem Detected
      ↓
Identify Failing Layer
      ↓
Collect Evidence
      ↓
Check Recent Changes
      ↓
Identify Root Cause
      ↓
Apply One Controlled Fix
      ↓
Re-run the Failed Step
      ↓
Verify Downstream Components
      ↓
Document the Resolution
```

This prevents unrelated changes from making the original problem more difficult to identify.

---

# 2. Check Git Status First

Before changing project files, check the repository state:

```bash
git status
```

Check recent commits:

```bash
git log --oneline -5
```

Check the current branch:

```bash
git branch --show-current
```

## Why This Matters

A troubleshooting change may already exist locally but not be committed.

Git status helps distinguish between:

- Existing project state.
- Local modifications.
- Untracked files.
- Changes that have already been committed.

---

# 3. Compare Local and Remote Git State

Check the remote:

```bash
git remote -v
```

Fetch the latest remote information:

```bash
git fetch origin
```

Check whether the local branch differs from the remote branch:

```bash
git status
```

Review recent commits:

```bash
git log --oneline --decorate -10
```

## Important

Do not immediately use:

```bash
git reset --hard
```

A hard reset can permanently remove uncommitted local changes.

First inspect the changes and determine what should be preserved.

---

# 4. Recover From an Accidental Local File Change

Check which files changed:

```bash
git status --short
```

Inspect a modified file:

```bash
git diff -- <file>
```

If the change is intentional, keep it.

If the change is confirmed to be unwanted and the file is tracked, it can be restored:

```bash
git restore <file>
```

For multiple files:

```bash
git restore <file1> <file2>
```

> **Warning:** `git restore` removes the uncommitted changes in the selected files. Review the diff first.

---

# 5. Recover an Unwanted Staged Change

Check the staging area:

```bash
git status
```

If a file was staged accidentally:

```bash
git restore --staged <file>
```

This removes the file from the staging area without deleting the working-tree changes.

Then inspect:

```bash
git diff
```

---

# 6. Recover From a Failed Git Rebase

If a rebase is currently in progress:

```bash
git status
```

If the conflict has been resolved and the rebase should continue:

```bash
git add <resolved-file>
git rebase --continue
```

If the rebase should be cancelled:

```bash
git rebase --abort
```

## Important

Do not use `git rebase --abort` if you actually want to preserve the current rebase work.

First determine whether the rebase should continue or be cancelled.

---

# 7. Recover From a Failed Git Merge

Check:

```bash
git status
```

If conflicts remain, inspect:

```bash
git diff
```

Resolve the conflict markers in the affected files.

Then:

```bash
git add <resolved-file>
```

Continue the merge using the Git workflow appropriate to the operation.

If the merge should be cancelled before completion:

```bash
git merge --abort
```

---

# 8. Docker Recovery

When a Docker-related problem occurs, first inspect the local Docker environment.

Check Docker:

```bash
docker version
```

Check running containers:

```bash
docker ps
```

Check all containers:

```bash
docker ps -a
```

Check images:

```bash
docker images
```

Check Docker disk usage:

```bash
docker system df
```

---

# 9. Recover a Failed Docker Build

Re-run the build using the project's Dockerfile:

```bash
docker build -t <image-name>:<tag> .
```

If the failure is related to cached build layers, a clean rebuild can be tested:

```bash
docker build --no-cache -t <image-name>:<tag> .
```

Use `--no-cache` only when necessary because it makes the build slower.

## Check Before Rebuilding

Verify:

```text
Dockerfile
.dockerignore
Application source
Maven configuration
Required build files
```

Do not assume that a cache problem is the cause until the build output supports that conclusion.

---

# 10. Recover a Stopped Docker Container

List containers:

```bash
docker ps -a
```

Inspect the stopped container:

```bash
docker logs <container-name-or-id>
```

Inspect its configuration:

```bash
docker inspect <container-name-or-id>
```

If the container should simply be started again:

```bash
docker start <container-name-or-id>
```

If it repeatedly stops, inspect the application logs before creating another container.

---

# 11. Recover From a Docker Port Conflict

If a container cannot start because its host port is already in use, identify the running container:

```bash
docker ps
```

Inspect the port mappings:

```bash
docker port <container-name-or-id>
```

You can also identify the process using the host port with the appropriate operating-system command.

Do not stop unrelated containers without confirming that they are causing the conflict.

---

# 12. Azure Recovery

Before changing an Azure resource, verify the active account and subscription:

```bash
az account show --output table
```

List subscriptions:

```bash
az account list --output table
```

Check the FlavorForge resource group:

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

FlavorForge Week 4 uses:

```text
Resource Group: flavorforge-rg
```

---

# 13. Recover From an Azure CLI Authentication Problem

If Azure CLI authentication is invalid:

```bash
az login
```

Then verify:

```bash
az account show --output table
```

If multiple subscriptions are available:

```bash
az account list --output table
```

Select the required subscription:

```bash
az account set --subscription "<SUBSCRIPTION_NAME_OR_ID>"
```

Verify again:

```bash
az account show --output table
```

Do this before concluding that an Azure resource is missing.

---

# 14. Verify the FlavorForge ACR

FlavorForge uses:

```text
ACR: flavorforgeacr2026ms
Login Server: flavorforgeacr2026ms.azurecr.io
Region: East US
SKU: Basic
```

Check the registry:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

Check the login server:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --query loginServer \
  --output tsv
```

Expected value:

```text
flavorforgeacr2026ms.azurecr.io
```

---

# 15. Recover From an ACR Push Failure

Authenticate:

```bash
az acr login --name flavorforgeacr2026ms
```

Check local images:

```bash
docker images
```

Check the intended repository and tag in ACR:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

If the required image is missing, verify the local image and tag before pushing.

General ACR image format:

```text
flavorforgeacr2026ms.azurecr.io/<repository>:<tag>
```

Then push:

```bash
docker push \
  flavorforgeacr2026ms.azurecr.io/<repository>:<tag>
```

---

# 16. Verify the FlavorForge AKS Cluster

FlavorForge uses:

```text
AKS: flavorforge-aks
Resource Group: flavorforge-rg
Region: East US
Node Count: 2
Node Size: Standard_D2as_v7
```

Check the cluster:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --output table
```

Check provisioning state:

```bash
az aks show \
  --name flavorforge-aks \
  --resource-group flavorforge-rg \
  --query provisioningState \
  --output tsv
```

---

# 17. Recover kubectl Access to AKS

Refresh credentials:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

Check the context:

```bash
kubectl config current-context
```

Test connectivity:

```bash
kubectl get nodes
```

If the nodes are not returned, continue investigating the cluster connection rather than changing workloads.

---

# 18. Kubernetes Recovery

Start with a cluster-wide overview:

```bash
kubectl get nodes
```

Then:

```bash
kubectl get namespaces
```

Then:

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

Check recent events:

```bash
kubectl get events -A --sort-by=.lastTimestamp
```

This provides a broad picture before making a workload-specific change.

---

# 19. Recover a Failed Pod

First identify the pod:

```bash
kubectl get pods
```

Inspect it:

```bash
kubectl describe pod <pod-name>
```

Read its logs:

```bash
kubectl logs <pod-name>
```

If it has restarted:

```bash
kubectl logs <pod-name> --previous
```

Check the events:

```bash
kubectl get events --sort-by=.lastTimestamp
```

Typical causes include:

- Image pull failure.
- Application startup failure.
- Configuration problem.
- Failed readiness or liveness probe.
- Resource constraints.

---

# 20. Recover From ImagePullBackOff

Check:

```bash
kubectl get pods
```

Then:

```bash
kubectl describe pod <pod-name>
```

Inspect the Events section.

Check the image used by the Deployment:

```bash
kubectl get deployment <deployment-name> \
  -o jsonpath='{.spec.template.spec.containers[*].image}'
```

Verify that the exact repository and tag exist in ACR:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

Do not immediately change the Kubernetes manifest.

First determine whether the image is:

1. Correctly named.
2. Correctly tagged.
3. Present in ACR.
4. Accessible by AKS.

---

# 21. Recover a Failed Deployment Rollout

Check:

```bash
kubectl get deployments
```

Check rollout status:

```bash
kubectl rollout status deployment/<deployment-name>
```

Inspect:

```bash
kubectl describe deployment <deployment-name>
```

Then inspect the associated pods:

```bash
kubectl get pods
```

If a confirmed bad Deployment revision caused the failure, inspect rollout history:

```bash
kubectl rollout history deployment/<deployment-name>
```

A rollback can be performed when appropriate:

```bash
kubectl rollout undo deployment/<deployment-name>
```

Verify:

```bash
kubectl rollout status deployment/<deployment-name>
```

> **GitOps warning:** If Argo CD manages this Deployment, a manual rollback may be overwritten during reconciliation. The permanent fix should normally be made in Git.

---

# 22. Recover a Service With No Endpoints

Check:

```bash
kubectl get services
```

Then:

```bash
kubectl get endpoints <service-name>
```

Check Service selectors:

```bash
kubectl describe service <service-name>
```

Check pod labels:

```bash
kubectl get pods --show-labels
```

The Service selector must match the labels on the intended pods.

Do not recreate the Service before checking the selector and labels.

---

# 23. Recover From a Namespace Mistake

If expected resources cannot be found:

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

Once the correct namespace is identified:

```bash
kubectl get pods -n <namespace>
```

A resource that appears to be missing may simply exist in another namespace.

---

# 24. Recover From a Kustomize Error

Before applying Kubernetes changes, generate the manifests:

```bash
kubectl kustomize <overlay-directory>
```

If generation fails, inspect:

```text
kustomization.yaml
resources
patches
image definitions
relative paths
```

Fix the source configuration first.

Then regenerate:

```bash
kubectl kustomize <overlay-directory>
```

Only after the output is valid should it be considered for deployment.

---

# 25. Azure DevOps Pipeline Recovery

When a pipeline fails, identify the first failed stage.

Do not focus only on the final pipeline failure message.

Use:

```text
Failed Stage
    ↓
Failed Task
    ↓
First Meaningful Error
    ↓
Tool
    ↓
Configuration
    ↓
Root Cause
```

Possible failure layers include:

```text
Build
Test
Security
SonarCloud
Docker
Trivy
ACR
AKS
Kubernetes
Argo CD
```

---

# 26. Recover a Failed Build

Reproduce the build locally using the same project command used by the pipeline.

For Maven:

```bash
mvn clean package
```

If the local build fails, resolve the application/build issue first.

If the local build succeeds but the pipeline fails, compare:

- Java version.
- Maven version.
- Working directory.
- Environment variables.
- Dependencies.
- Agent configuration.

---

# 27. Recover a Failed SonarCloud Quality Gate

A Quality Gate failure should not be bypassed simply to obtain a successful pipeline.

Review the SonarCloud analysis and identify the failing condition.

Possible areas include:

- Bugs.
- Vulnerabilities.
- Code smells.
- Coverage.
- Duplicated code.

Correct the underlying issue, commit the change, and allow the pipeline to run again.

---

# 28. Recover a Failed Trivy Scan

First determine whether the scan targets the filesystem or Docker image.

Filesystem:

```bash
trivy fs .
```

Image:

```bash
trivy image <image-name>:<tag>
```

Review the reported vulnerabilities and the severity threshold configured by the project.

Do not disable Trivy solely because it reports findings.

---

# 29. Recover a Failed Docker-to-ACR Pipeline Step

Check:

```text
Docker Build
     ↓
Image Tag
     ↓
ACR Login
     ↓
ACR Push
     ↓
ACR Repository
     ↓
Image Tag Verification
```

Check ACR repositories:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Check tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

The image must exist under the exact name and tag expected by Kubernetes.

---

# 30. Argo CD Recovery

Check the Application:

```bash
argocd app list
```

Get details:

```bash
argocd app get <application-name>
```

Check differences:

```bash
argocd app diff <application-name>
```

Check resources:

```bash
argocd app resources <application-name>
```

If the Application is OutOfSync, first determine why the desired and live states differ.

Do not blindly synchronize an unknown difference.

---

# 31. Recover From Argo CD Drift

The preferred GitOps recovery sequence is:

```text
Identify Drift
      ↓
Run argocd app diff
      ↓
Determine Intended State
      ↓
Correct Git if Git is Wrong
      ↓
Commit
      ↓
Push
      ↓
Argo CD Detects Change
      ↓
Sync
      ↓
Verify Application
```

Manual Kubernetes changes should not be used as the permanent solution for GitOps-managed resources.

---

# 32. Recover From a Failed Argo CD Sync

Check:

```bash
argocd app get <application-name>
```

Inspect Kubernetes events:

```bash
kubectl get events --sort-by=.lastTimestamp
```

Check the affected resource:

```bash
kubectl describe <resource-type> <resource-name>
```

If the error is caused by invalid Kustomize output, correct the manifests in Git before retrying synchronization.

---

# 33. Recover From a Failed Application

A successful pipeline or Argo CD synchronization does not guarantee application health.

Check:

```bash
kubectl get pods
```

Then:

```bash
kubectl get services
```

Then:

```bash
kubectl get events --sort-by=.lastTimestamp
```

Check application logs:

```bash
kubectl logs <pod-name>
```

The recovery path should follow the actual failure:

```text
Application
   ↓
Pod
   ↓
Logs
   ↓
Configuration
   ↓
Image
   ↓
Service
```

---

# 34. Restarting a Workload

Restarting a Deployment can be useful when a controlled restart is appropriate:

```bash
kubectl rollout restart deployment/<deployment-name>
```

Monitor:

```bash
kubectl rollout status deployment/<deployment-name>
```

Then:

```bash
kubectl get pods
```

## Important

A restart does not fix an underlying configuration, image, or application problem.

Use a restart only when there is a reason to believe that restarting the workload is appropriate.

---

# 35. Avoid Unnecessary Resource Deletion

Avoid commands such as:

```bash
kubectl delete deployment ...
```

or:

```bash
kubectl delete namespace ...
```

unless deletion is explicitly part of the intended recovery procedure.

Deletion can remove useful state and make troubleshooting more difficult.

Prefer inspection and targeted correction.

---

# 36. Avoid Unnecessary Azure Resource Recreation

Do not immediately delete and recreate:

- Resource groups.
- ACR.
- AKS clusters.
- Networking resources.

First inspect the existing resource:

```bash
az resource list \
  --resource-group flavorforge-rg \
  --output table
```

Then determine whether the problem is:

- Authentication.
- Configuration.
- Permission.
- Connectivity.
- Resource state.
- Application configuration.

Recreation should be a deliberate decision, not the first troubleshooting step.

---

# 37. Check the Complete FlavorForge Chain

When a problem crosses multiple systems, verify each layer in order:

```text
GitHub
   ↓
Source Code
   ↓
Azure DevOps
   ↓
Build
   ↓
Tests
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
Application
```

The first failed layer is usually the best place to begin investigation.

---

# 38. Evidence to Collect During Recovery

Before changing anything, collect relevant evidence.

Useful commands include:

```bash
git status
git log --oneline -5
docker ps -a
docker images
az account show
az group show --name flavorforge-rg
az acr show --name flavorforgeacr2026ms --resource-group flavorforge-rg
az aks show --name flavorforge-aks --resource-group flavorforge-rg
kubectl get nodes
kubectl get pods -A
kubectl get services -A
kubectl get events -A --sort-by=.lastTimestamp
```

For Argo CD:

```bash
argocd app get <application-name>
argocd app diff <application-name>
```

Save only non-sensitive information.

Do not include credentials, tokens, passwords, or secret values in evidence.

---

# 39. Recovery Documentation

After resolving a problem, document:

```text
Problem
Cause
Evidence
Action Taken
Result
Verification
```

Example structure:

```text
Problem:
Pod was not becoming Ready.

Cause:
Container image reference did not match the available registry tag.

Evidence:
kubectl describe pod showed an image-pull error.

Action:
Verified the image repository and tag in ACR and corrected the source configuration.

Verification:
Deployment and pod status were checked again.
```

Only document results that were actually verified.

Do not claim that a command succeeded if it was not executed or confirmed.

---

# 40. Safe Recovery Principles

Always follow these principles:

1. **Do not guess the root cause.**
2. **Check logs and events first.**
3. **Change one thing at a time.**
4. **Avoid destructive commands unless necessary.**
5. **Protect credentials and secrets.**
6. **Use Git as the source of truth for GitOps-managed configuration.**
7. **Verify the result after every recovery action.**
8. **Document the actual cause and evidence.**

---

# 41. Common Recovery Checklist

- [ ] Check `git status`.
- [ ] Check recent Git commits.
- [ ] Confirm the active Azure subscription.
- [ ] Confirm the FlavorForge resource group.
- [ ] Confirm ACR availability.
- [ ] Confirm the expected image exists in ACR.
- [ ] Confirm AKS availability.
- [ ] Refresh `kubectl` credentials if required.
- [ ] Check node status.
- [ ] Check namespaces.
- [ ] Check deployments.
- [ ] Check pods.
- [ ] Check pod events.
- [ ] Check container logs.
- [ ] Check Services and endpoints.
- [ ] Validate Kustomize output.
- [ ] Check Azure DevOps pipeline logs.
- [ ] Check SonarCloud results.
- [ ] Check Trivy results.
- [ ] Check Argo CD synchronization.
- [ ] Check Argo CD application health.
- [ ] Make one controlled change.
- [ ] Verify the result.
- [ ] Document the recovery.

---

# 42. Final Recovery Flow

The complete FlavorForge recovery approach is:

```text
Detect Problem
      ↓
Check Git / Recent Changes
      ↓
Identify Failing Layer
      ↓
Collect Logs / Events
      ↓
Check Configuration
      ↓
Check Dependencies
      ↓
Apply One Controlled Fix
      ↓
Re-run Failed Component
      ↓
Verify Immediate Result
      ↓
Verify Downstream Components
      ↓
Confirm End-to-End Health
      ↓
Document Resolution
```

The purpose of recovery is not simply to restore a green pipeline.

The goal is to restore the system while preserving:

- Source control.
- Build reproducibility.
- Security scanning.
- Code quality controls.
- Container integrity.
- Kubernetes configuration.
- GitOps principles.
- Deployment traceability.

---

## Summary

FlavorForge contains multiple interconnected technologies, so a failure in one layer can appear as a failure in another.

The safest recovery strategy is:

```text
Diagnose
   ↓
Identify Root Cause
   ↓
Make Minimal Change
   ↓
Verify
   ↓
Document
```

Avoid destructive recovery unless there is clear evidence that it is required.

For GitOps-managed resources, make permanent configuration changes in Git and allow Argo CD to reconcile the desired state to AKS.

This keeps the FlavorForge environment reproducible, traceable, and aligned with the DevSecOps workflow.