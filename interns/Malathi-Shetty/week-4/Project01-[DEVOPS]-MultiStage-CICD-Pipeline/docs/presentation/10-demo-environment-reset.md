# Demo Environment Reset Guide

## FlavorForge Azure DevSecOps Capstone Project

---

# Purpose

This document provides procedures to restore the FlavorForge demonstration environment after practice sessions, testing activities, or incident simulations.

During a technical presentation, controlled failures may be introduced to demonstrate Kubernetes self-healing, GitOps recovery, or deployment rollback.

After completing demonstrations, the environment should be returned to a stable and healthy state.

---

# Reset Objectives

This guide helps to:

- Restore Kubernetes workloads.
- Restart unhealthy application components.
- Synchronize the cluster with GitOps configuration.
- Remove temporary containers.
- Validate application availability.
- Prepare the environment for future demonstrations.

---

# Environment Components

The reset process covers:

| Component | Technology |
|---|---|
| Application Containers | Docker |
| Container Registry | Azure Container Registry |
| Application Platform | Azure Kubernetes Service |
| Deployment Management | Kubernetes |
| GitOps | Argo CD |
| CI/CD | Azure DevOps |

---

# Reset Flow

```text
Check Current State

        ↓

Restore Containers

        ↓

Restart Kubernetes Workloads

        ↓

Synchronize Argo CD

        ↓

Verify Application Health

        ↓

Demo Environment Ready
```

---

# Step 1 — Check Current Kubernetes Status

Before making changes, verify the current cluster state.

## Command

```bash
kubectl get all -n flavorforge
```

## Expected Output

Example:

```text
NAME                            READY   STATUS
pod/backend-xxxx                1/1     Running
pod/frontend-xxxx               1/1     Running

deployment/backend              Available
deployment/frontend             Available
```

---

# Step 2 — Restart Kubernetes Deployments

If the application is not responding correctly, restart the deployments.

## Backend Restart

```bash
kubectl rollout restart deployment backend -n flavorforge
```

## Frontend Restart

```bash
kubectl rollout restart deployment frontend -n flavorforge
```

---

## Verify Rollout

```bash
kubectl rollout status deployment backend -n flavorforge
```

```bash
kubectl rollout status deployment frontend -n flavorforge
```

Expected result:

```text
deployment successfully rolled out
```

---

# Step 3 — Verify Pods

Check that new Pods are running.

## Command

```bash
kubectl get pods -n flavorforge
```

Expected output:

```text
NAME                         READY   STATUS
backend-xxxxx                1/1     Running
frontend-xxxxx               1/1     Running
```

---

# Step 4 — Restore GitOps State Using Argo CD

If changes were manually made inside Kubernetes, restore the desired state from Git.

## Check Application Status

```bash
kubectl get applications -n argocd
```

Expected output:

```text
NAME            SYNC STATUS     HEALTH STATUS
flavorforge     Synced          Healthy
```

---

## Synchronize Application

Using Argo CD dashboard:

1. Open FlavorForge application.
2. Click **Sync**.
3. Confirm synchronization.
4. Wait until application becomes healthy.

---

## Verify

Expected state:

```text
Sync Status: Synced

Health Status: Healthy
```

---

# Step 5 — Rollback Deployment (If Required)

If a failed deployment was introduced during testing, Kubernetes rollback can restore the previous version.

---

## View Deployment History

```bash
kubectl rollout history deployment backend -n flavorforge
```

Example:

```text
REVISION
1
2
3
```

---

## Rollback Deployment

```bash
kubectl rollout undo deployment backend -n flavorforge
```

---

## Verify Rollback

```bash
kubectl rollout status deployment backend -n flavorforge
```

Expected:

```text
deployment successfully rolled out
```

---

# Step 6 — Docker Cleanup

If local Docker containers were created during demonstrations, remove unnecessary resources.

---

## View Running Containers

```bash
docker ps
```

---

## Stop Container

```bash
docker stop <container-id>
```

---

## Remove Container

```bash
docker rm <container-id>
```

---

## View Images

```bash
docker images
```

---

# Step 7 — Verify Application Health

After resetting the environment, verify application availability.

---

## Frontend Verification

Open the application URL:

```text
http://<frontend-endpoint>
```

Expected result:

- Application loads successfully.
- Recipe interface is available.

---

## Backend Health Check

Command:

```bash
curl http://<endpoint>/api/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# Step 8 — Final Environment Checklist

Before another presentation, confirm:

| Component | Status |
|---|---|
| Azure Resources | Ready |
| AKS Cluster | Running |
| Kubernetes Pods | Healthy |
| Backend API | Available |
| Frontend Application | Available |
| ACR Images | Available |
| Azure DevOps Pipeline | Successful |
| Argo CD | Synced |
| Monitoring Checks | Passing |

---

# Emergency Recovery Procedure

If the complete environment requires restoration:

1. Verify Azure resources.
2. Confirm AKS connectivity.

```bash
kubectl get nodes
```

3. Verify namespace.

```bash
kubectl get namespace
```

4. Verify workloads.

```bash
kubectl get all -n flavorforge
```

5. Restore GitOps state through Argo CD.

6. Validate application endpoints.

---

# Demo Preparation Reminder

Before every presentation:

- Perform a complete environment check.
- Avoid making untested changes.
- Keep screenshots available as backup evidence.
- Verify network access.
- Confirm pipeline and Argo CD status.

---

# Final Message

A professional DevOps engineer does not only deploy applications.

They must also understand how to:

- Detect failures.
- Recover systems.
- Restore desired state.
- Maintain reliable environments.

The reset procedure ensures that FlavorForge remains ready for repeated demonstrations and technical evaluations.