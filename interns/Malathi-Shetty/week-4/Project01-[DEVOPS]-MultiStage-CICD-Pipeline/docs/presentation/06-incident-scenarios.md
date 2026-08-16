# Incident Scenarios

## Purpose

Production systems are designed not only to deliver new features but also to recover quickly from unexpected failures.

This document demonstrates controlled incident scenarios that showcase the resilience of the FlavorForge Azure DevSecOps platform. Each scenario is safe to perform during a live presentation and highlights how modern DevOps practices, Kubernetes, and GitOps work together to maintain application availability.

The incidents in this guide are intentionally introduced into the environment and immediately recovered using built-in platform capabilities or GitOps reconciliation.

---

# Incident Demonstration Flow

```text
Healthy Environment
        │
        ▼
Introduce Failure
        │
        ▼
Observe Impact
        │
        ▼
Investigate
        │
        ▼
Recover
        │
        ▼
Verify
        │
        ▼
Lessons Learned
```

---

# Incident 1 – Kubernetes Self-Healing

## Scenario

A backend application pod unexpectedly crashes or is deleted.

This simulates common production situations such as:

- Container crash
- Node failure
- Manual deletion
- Unexpected termination

---

## Objective

Demonstrate Kubernetes self-healing capabilities using the Deployment controller.

---

## Step 1 – Verify Current Pods

```bash
kubectl get pods -n flavorforge
```

### Expected Result

The backend pods should be in the **Running** state.

### Evidence

![Pods Running](/screenshots/kubernetes/pods.png)

*Figure 5.1 – Backend pods before the incident.*

---

## Step 2 – Simulate the Failure

Delete one backend pod.

```bash
kubectl delete pod <backend-pod-name> -n flavorforge
```

---

## Expected Behaviour

Within a few seconds:

- The pod enters the **Terminating** state.
- Kubernetes detects the missing replica.
- A replacement pod is created automatically.
- The application continues serving requests.

---

## Verification

```bash
kubectl get pods -n flavorforge
```

Verify that:

- A new pod has been created.
- Desired replica count is restored.
- Application remains available.

---

## Learning Point

This demonstrates one of Kubernetes' core capabilities:

> Kubernetes continuously compares the current state with the desired state and automatically restores missing workloads.

This self-healing behavior improves application availability without requiring manual intervention.

---

## Story to Tell During the Demo

Imagine an application serving thousands of users.

If one container crashes, users should not notice.

Instead of waiting for an engineer to log in and restart the application, Kubernetes detects the failure and restores the missing pod automatically.

This is one of the reasons Kubernetes is widely adopted for running production workloads.

---

# Incident 2 – Configuration Drift Recovery with Argo CD

## Scenario

A manual change is made directly to the Kubernetes cluster instead of updating the Git repository.

Although the application continues running, the cluster configuration no longer matches the desired state stored in Git. This situation is known as **configuration drift**.

---

## Objective

Demonstrate how Argo CD detects configuration drift and automatically restores the cluster to the desired state defined in Git.

---

## Step 1 – Verify Current Deployment

```bash
kubectl get deployment backend -n flavorforge
```

### Expected Result

The backend deployment should be running with the expected number of replicas.

### Evidence

![Deployment](/screenshots/kubernetes/backend-deployment.png)

*Figure 5.2 – Backend deployment before introducing configuration drift.*

---

## Step 2 – Introduce Configuration Drift

Scale the deployment manually.

```bash
kubectl scale deployment backend \
--replicas=1 \
-n flavorforge
```

---

## Expected Behaviour

The deployment is successfully scaled.

However, this manual change is **not recorded in Git**.

The Kubernetes cluster and Git repository are now out of sync.

---

## Step 3 – Observe Argo CD

Open the Argo CD dashboard.

Observe that the application status changes to:

- OutOfSync

If automatic synchronization is enabled, Argo CD will reconcile the difference automatically.

Otherwise, click **Sync** to restore the desired state.

### Evidence

![Argo CD](/screenshots/argo-cd/4-flavorforge-application-details-tree-argo-cd.png)

*Figure 5.3 – Argo CD detecting configuration drift.*

---

## Step 4 – Verify Recovery

```bash
kubectl get deployment backend -n flavorforge
```

### Expected Result

Verify that:

- Replica count has returned to the value defined in Git.
- Application status is **Healthy**.
- Application status is **Synced**.

---

## Learning Point

GitOps treats the Git repository as the **single source of truth**.

Any manual modification made directly to the cluster is considered temporary and is automatically corrected by Argo CD.

This approach provides:

- Consistent deployments
- Improved auditability
- Easier rollback
- Reduced configuration drift
- Better operational reliability

---

## Story to Tell During the Demo

Imagine an engineer logs into the production cluster and manually changes the application configuration.

Without GitOps, nobody may know this change happened.

Over time, manual changes accumulate, environments become inconsistent, and troubleshooting becomes difficult.

With Argo CD, every deployment is compared with the desired configuration stored in Git.

If someone changes the cluster manually, Argo CD detects the difference and restores the correct configuration, ensuring that Git remains the single source of truth for the entire platform.

---

# Incident 3 – Application Rollback

## Scenario

A new application version has been deployed, but users begin reporting unexpected issues.

Instead of attempting to fix the application directly in production, the safest approach is to roll back to the last known stable version.

This demonstrates how Kubernetes supports safe deployment recovery.

---

## Objective

Demonstrate how Kubernetes can quickly restore a previously working application version.

---

## Step 1 – View Deployment History

```bash
kubectl rollout history deployment backend -n flavorforge
```

### Expected Result

A list of deployment revisions is displayed.

Each revision represents a previously deployed application version.

---

## Step 2 – Roll Back the Deployment

```bash
kubectl rollout undo deployment backend -n flavorforge
```

---

## Expected Behaviour

Kubernetes replaces the current deployment with the previous stable revision.

Users continue accessing the application while the rollback is performed.

---

## Step 3 – Verify Rollout Status

```bash
kubectl rollout status deployment backend -n flavorforge
```

### Expected Result

The deployment completes successfully.

Expected output:

```text
deployment "backend" successfully rolled out
```

---

## Step 4 – Verify the Application

```bash
kubectl get pods -n flavorforge
```

Verify:

- All pods are in the **Running** state.
- Desired replica count is restored.
- Application remains accessible.

You can also verify the frontend in the browser and access the backend health endpoint.

### Evidence

![Rollout History](/screenshots/kubernetes/nginx-ingress/6-rollout-history.png)

*Figure 5.4 – Kubernetes deployment rollout history.*

---

## Learning Point

Rolling back a deployment is significantly faster and safer than manually modifying a production system.

Kubernetes stores deployment revisions, allowing teams to restore a previously working version with a single command.

This reduces downtime, minimizes operational risk, and improves release confidence.

---

## Story to Tell During the Demo

Imagine that version **1.4** of the application has just been deployed.

Within a few minutes, users begin reporting errors.

Rather than troubleshooting directly in production, the operations team performs a rollback to version **1.3**, restoring service within minutes.

Once the application is stable again, developers investigate the issue, prepare a fix, and deploy a corrected version through the CI/CD pipeline.

This approach minimizes user impact while maintaining a reliable production environment.

---

# Incident Summary

The following table summarizes the operational scenarios demonstrated during the live presentation.

| Incident | Technology | Demonstrated Capability | Recovery Method |
|----------|------------|-------------------------|-----------------|
| Pod Failure | Kubernetes | Self-healing | Deployment Controller |
| Configuration Drift | Argo CD | GitOps Reconciliation | Automatic Synchronization |
| Failed Deployment | Kubernetes | Rollback | Rollout Undo |

---

# Operational Lessons Learned

These incident demonstrations reinforce several important DevOps and Site Reliability Engineering (SRE) principles.

## 1. Design for Failure

Failures are inevitable in distributed systems. Modern cloud-native platforms are designed to detect, isolate, and recover from failures automatically rather than relying on manual intervention.

---

## 2. Automation Improves Reliability

Automated deployments, health checks, self-healing, and GitOps synchronization reduce operational effort while improving consistency across environments.

---

## 3. Git is the Source of Truth

With GitOps, the desired state of the application is maintained in version control.

Manual changes made directly to the Kubernetes cluster are considered temporary and are automatically reconciled by Argo CD.

---

## 4. Kubernetes Improves Availability

Kubernetes continuously monitors workloads and ensures that the desired number of application instances remain available.

If a pod becomes unavailable, Kubernetes automatically creates a replacement without requiring manual action.

---

## 5. Safe Deployments Reduce Risk

Deployment history and rollback capabilities enable teams to recover quickly from failed releases, reducing downtime and restoring service with minimal disruption.

---

# Best Practices Demonstrated

Throughout these incident scenarios, the following DevSecOps practices are demonstrated:

- Infrastructure managed through declarative configuration.
- Automated deployment using Azure DevOps.
- Secure container image management with Azure Container Registry (ACR).
- Kubernetes self-healing and rolling updates.
- GitOps continuous reconciliation using Argo CD.
- Version-controlled deployment configurations.
- Rapid rollback using Kubernetes deployment history.
- Repeatable operational procedures through documented runbooks.

---

# Key Takeaways for Interviewers

These demonstrations show that FlavorForge is more than a cloud deployment project.

It showcases practical implementation of modern DevSecOps concepts, including:

- Continuous Integration and Continuous Deployment (CI/CD)
- Containerization with Docker
- Kubernetes orchestration
- Azure cloud infrastructure
- GitOps with Argo CD
- Infrastructure resilience
- Automated recovery
- Operational readiness

Together, these capabilities demonstrate how the application can be deployed, monitored, maintained, and recovered using industry-standard engineering practices.

---

# Next Document

Continue with **[06-interviewer-questions.md](6-interviewer-questions.md)**.

The next document provides common DevOps interview questions based on the FlavorForge project, along with conversational answers suitable for technical discussions and project reviews.