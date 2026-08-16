# Kubernetes Troubleshooting

## Purpose

This document provides troubleshooting guidance for the Kubernetes resources used by the FlavorForge Azure DevSecOps project.

It is intended as a reference for diagnosing common Kubernetes deployment, pod, service, configuration, and application issues on the FlavorForge AKS cluster.

The troubleshooting process should always begin with inspection and diagnosis before making changes.

---

# 1. FlavorForge Kubernetes Environment

FlavorForge is deployed to Azure Kubernetes Service (AKS).

The main Kubernetes resources include:

- Namespace
- Deployments
- Pods
- Services
- ConfigMaps
- Secrets
- Kustomize-managed manifests

The AKS cluster used by FlavorForge is:

```text
flavorforge-aks
```

The Azure resource group is:

```text
flavorforge-rg
```

---

# 2. kubectl Cannot Connect to the Cluster

## Problem

Commands such as:

```bash
kubectl get nodes
```

may fail if the local Kubernetes configuration does not contain valid credentials for the AKS cluster.

## Check the Current Context

```bash
kubectl config current-context
```

List all contexts:

```bash
kubectl config get-contexts
```

## Refresh AKS Credentials

Run:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --overwrite-existing
```

Then test:

```bash
kubectl get nodes
```

## Lesson

Before troubleshooting Kubernetes resources, first confirm that `kubectl` is connected to the intended AKS cluster.

---

# 3. Nodes Are Not Ready

## Problem

A Kubernetes node may show a status other than `Ready`.

Check the nodes:

```bash
kubectl get nodes
```

Example:

```text
NAME       STATUS     ROLES    AGE    VERSION
node-1     Ready      <none>   ...    ...
node-2     NotReady   <none>   ...    ...
```

## Inspect the Node

```bash
kubectl describe node <node-name>
```

Look at:

- Conditions
- Events
- Memory pressure
- Disk pressure
- PID pressure
- Network-related errors

## Check Cluster Events

```bash
kubectl get events --sort-by=.lastTimestamp
```

Do not delete or recreate a node before identifying the underlying problem.

---

# 4. Pods Are Not Running

## Problem

A deployment may exist while one or more pods are not running correctly.

Start with:

```bash
kubectl get pods
```

For additional information:

```bash
kubectl get pods -o wide
```

Check the deployment:

```bash
kubectl get deployments
```

## Inspect the Pod

```bash
kubectl describe pod <pod-name>
```

The most useful information is usually found in the **Events** section.

---

# 5. Pod Is in Pending State

## Problem

A pod remains in:

```text
Pending
```

Check:

```bash
kubectl get pods
```

Then:

```bash
kubectl describe pod <pod-name>
```

Look at the Events section for messages about:

- Insufficient CPU
- Insufficient memory
- Scheduling constraints
- Missing volumes
- Node availability
- Taints and tolerations

## Check Node Capacity

```bash
kubectl describe nodes
```

You can also inspect resource usage if metrics are available:

```bash
kubectl top nodes
```

If `kubectl top nodes` is unavailable, the cluster may not have the required metrics service configured.

---

# 6. Pod Is in CrashLoopBackOff

## Problem

A pod starts and repeatedly crashes.

Check:

```bash
kubectl get pods
```

Then inspect:

```bash
kubectl describe pod <pod-name>
```

View the container logs:

```bash
kubectl logs <pod-name>
```

If the pod has multiple containers:

```bash
kubectl logs <pod-name> -c <container-name>
```

## Check Previous Container Logs

If the container has already restarted:

```bash
kubectl logs <pod-name> --previous
```

This can reveal the error that caused the previous container instance to terminate.

## Typical Causes

- Application startup failure
- Incorrect environment variable
- Missing configuration
- Database connection failure
- Incorrect application port
- Invalid application configuration
- Container command failure

---

# 7. ImagePullBackOff or ErrImagePull

## Problem

The pod cannot download its container image.

Check:

```bash
kubectl get pods
```

Then:

```bash
kubectl describe pod <pod-name>
```

Look at the Events section.

Common causes include:

- Incorrect image name
- Incorrect image tag
- Image does not exist in ACR
- Registry authentication problem
- AKS does not have permission to pull the image

## Verify the Image

Check the deployment:

```bash
kubectl get deployment <deployment-name> \
  -o jsonpath='{.spec.template.spec.containers[*].image}'
```

Compare the result with the image actually available in ACR.

Check ACR:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Then inspect the required repository tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

---

# 8. Important Image Tag Check

During the FlavorForge project, local Docker images were tagged:

```text
:1.0
```

while the Kubernetes manifests referenced:

```text
:1.8
```

This difference must be treated carefully.

A local image with:

```text
:1.0
```

does not mean that:

```text
:1.8
```

exists in ACR.

Before changing a Kubernetes manifest, verify the actual image and tag in the registry.

The correct troubleshooting sequence is:

```text
Kubernetes image reference
        ↓
Check repository name
        ↓
Check image tag
        ↓
Check ACR
        ↓
Check whether tag exists
        ↓
Check AKS registry access
```

Do not change the deployment simply because an image-pull error occurred.

---

# 9. Deployment Exists but Pods Are Not Available

## Problem

A deployment exists but the desired number of replicas is not available.

Check:

```bash
kubectl get deployments
```

For more information:

```bash
kubectl describe deployment <deployment-name>
```

Check ReplicaSets:

```bash
kubectl get replicasets
```

Check pods:

```bash
kubectl get pods
```

The deployment, ReplicaSet, and pods should be examined together.

---

# 10. Service Is Not Working

## Problem

The application pods may be running but the application cannot be accessed through its Kubernetes Service.

List services:

```bash
kubectl get services
```

Inspect the service:

```bash
kubectl describe service <service-name>
```

Check endpoints:

```bash
kubectl get endpoints <service-name>
```

For newer Kubernetes versions, EndpointSlices can also be checked:

```bash
kubectl get endpointslices
```

## Important Check

The Service selector must match the labels on the application pods.

Check pod labels:

```bash
kubectl get pods --show-labels
```

If the Service has no endpoints, investigate the selector and pod labels before changing the Service.

---

# 11. Service Has No Endpoints

## Problem

The Service exists but has no backend endpoints.

Check:

```bash
kubectl get endpoints <service-name>
```

If no endpoints are listed, compare:

```bash
kubectl describe service <service-name>
```

with:

```bash
kubectl get pods --show-labels
```

The Service selector should match labels assigned to the intended pods.

## Diagnostic Flow

```text
Service
   ↓
Selector
   ↓
Pod labels
   ↓
Matching pods
   ↓
Endpoints
```

If the labels do not match, Kubernetes cannot route Service traffic to the pods.

---

# 12. Application Is Running but Cannot Be Accessed

## Problem

The pod is running but the application cannot be reached.

First check:

```bash
kubectl get pods
```

Then:

```bash
kubectl get services
```

Check the Service details:

```bash
kubectl describe service <service-name>
```

Check the application logs:

```bash
kubectl logs <pod-name>
```

## Test the Application Internally

Port forwarding can help determine whether the application itself is responding:

```bash
kubectl port-forward service/<service-name> 8080:<service-port>
```

Then test the local endpoint using the appropriate application URL.

This separates application problems from external Service or networking problems.

---

# 13. Container Port and Service Port Mismatch

## Problem

The application may listen on one port while the Kubernetes Service forwards traffic to another port.

Inspect the deployment:

```bash
kubectl get deployment <deployment-name> \
  -o yaml
```

Check the container port.

Then inspect the Service:

```bash
kubectl get service <service-name> \
  -o yaml
```

Check:

- `port`
- `targetPort`

The Service's `targetPort` must correspond to the port on which the application container is listening.

---

# 14. ConfigMap Problems

## Problem

The application depends on configuration stored in a ConfigMap, but the expected configuration is missing or incorrect.

List ConfigMaps:

```bash
kubectl get configmaps
```

Inspect one:

```bash
kubectl describe configmap <configmap-name>
```

You can also view its YAML:

```bash
kubectl get configmap <configmap-name> -o yaml
```

Check whether the Deployment references the ConfigMap:

```bash
kubectl get deployment <deployment-name> -o yaml
```

Look for:

```text
configMapKeyRef
```

or:

```text
envFrom
```

or mounted ConfigMap volumes.

---

# 15. Secret Problems

## Problem

The application requires a Kubernetes Secret but the Secret is missing or incorrectly referenced.

List Secrets:

```bash
kubectl get secrets
```

Inspect metadata:

```bash
kubectl describe secret <secret-name>
```

Avoid exposing secret values unnecessarily.

Check whether the Deployment references the Secret:

```bash
kubectl get deployment <deployment-name> -o yaml
```

Look for:

```text
secretKeyRef
```

or:

```text
envFrom
```

## Security Reminder

Do not paste secret values into documentation, GitHub issues, screenshots, or terminal output shared publicly.

---

# 16. Deployment Changes Are Not Taking Effect

## Problem

A Kubernetes manifest was changed, but the running application still appears unchanged.

First check the Deployment:

```bash
kubectl get deployment <deployment-name> -o yaml
```

Check the running pod:

```bash
kubectl get pods
```

Check the image actually used by the pod:

```bash
kubectl get pod <pod-name> \
  -o jsonpath='{.spec.containers[*].image}'
```

If the Deployment was intentionally changed, inspect its rollout status:

```bash
kubectl rollout status deployment/<deployment-name>
```

Check rollout history:

```bash
kubectl rollout history deployment/<deployment-name>
```

---

# 17. Rollout Is Stuck

## Problem

A Deployment rollout does not complete.

Run:

```bash
kubectl rollout status deployment/<deployment-name>
```

Then inspect:

```bash
kubectl describe deployment <deployment-name>
```

Check:

```bash
kubectl get pods
```

and:

```bash
kubectl get events --sort-by=.lastTimestamp
```

Typical causes include:

- Image pull failure
- Application crash
- Readiness probe failure
- Resource constraints
- Configuration problems

Diagnose the pod before performing a rollback.

---

# 18. Rollback a Deployment

If a deployment change is confirmed to be the cause of a failure, Kubernetes provides a rollback mechanism.

Check rollout history:

```bash
kubectl rollout history deployment/<deployment-name>
```

Rollback:

```bash
kubectl rollout undo deployment/<deployment-name>
```

Check the rollout:

```bash
kubectl rollout status deployment/<deployment-name>
```

Then verify:

```bash
kubectl get pods
```

> **Important:** In a GitOps environment managed by Argo CD, manually rolling back a Kubernetes Deployment may be temporary because Argo CD can reconcile the cluster back to the Git-defined state. The Git repository should remain the source of truth.

---

# 19. Pods Are Restarting

Check restart counts:

```bash
kubectl get pods
```

Example:

```text
NAME                         READY   STATUS    RESTARTS
flavorforge-xxxx             1/1     Running   3
```

Inspect the pod:

```bash
kubectl describe pod <pod-name>
```

View current logs:

```bash
kubectl logs <pod-name>
```

View logs from the previous container:

```bash
kubectl logs <pod-name> --previous
```

Look for:

- Application exceptions
- Out-of-memory termination
- Failed health checks
- Missing configuration
- Dependency failures

---

# 20. Readiness or Liveness Probe Failure

## Problem

A pod may be running but repeatedly fail its health checks.

Inspect:

```bash
kubectl describe pod <pod-name>
```

Look at the Events section.

Inspect the Deployment:

```bash
kubectl get deployment <deployment-name> -o yaml
```

Look for:

```text
readinessProbe
```

and:

```text
livenessProbe
```

Check whether:

- The path is correct.
- The port is correct.
- The application is actually listening.
- The application needs more startup time.

Do not remove health checks simply to make a deployment appear healthy. Diagnose the underlying application or configuration issue.

---

# 21. Kustomize Build Fails

## Problem

Kustomize cannot generate the Kubernetes manifests.

From the appropriate overlay directory, run:

```bash
kubectl kustomize .
```

If the repository uses a specific overlay, run the command against that overlay directory.

For example:

```bash
kubectl kustomize <overlay-directory>
```

The command should produce the generated Kubernetes YAML.

## Common Causes

- Incorrect file path
- Missing resource
- Invalid YAML
- Incorrect patch target
- Incorrect `kustomization.yaml`
- Duplicate or conflicting configuration

---

# 22. Validate Kustomize Before Deployment

Before applying changes, generate the manifests:

```bash
kubectl kustomize <overlay-directory> > /tmp/flavorforge-rendered.yaml
```

Review the generated output:

```bash
less /tmp/flavorforge-rendered.yaml
```

This helps identify errors before they reach the cluster.

For a GitOps deployment, this validation is especially useful because Argo CD uses the repository manifests to reconcile the cluster.

---

# 23. Namespace Problems

## Problem

A command appears to show no resources even though the application exists.

The resources may be deployed in a different namespace.

List namespaces:

```bash
kubectl get namespaces
```

List pods across all namespaces:

```bash
kubectl get pods -A
```

List deployments across all namespaces:

```bash
kubectl get deployments -A
```

Specify the namespace when required:

```bash
kubectl get pods -n <namespace>
```

---

# 24. Check All FlavorForge Resources

A useful first-level diagnostic command is:

```bash
kubectl get all
```

For all namespaces:

```bash
kubectl get all -A
```

For a specific namespace:

```bash
kubectl get all -n <namespace>
```

This provides a quick overview of:

- Pods
- Services
- Deployments
- ReplicaSets

---

# 25. Check Recent Kubernetes Events

Events often provide the fastest explanation for a deployment problem.

Run:

```bash
kubectl get events --sort-by=.lastTimestamp
```

For a namespace:

```bash
kubectl get events \
  -n <namespace> \
  --sort-by=.lastTimestamp
```

Look for events related to:

- Failed scheduling
- Failed image pulls
- Container crashes
- Failed mounts
- Failed probes
- Service account problems

---

# 26. Useful Kubernetes Diagnostic Commands

## Nodes

```bash
kubectl get nodes
```

## Pods

```bash
kubectl get pods
```

## Pods With Details

```bash
kubectl get pods -o wide
```

## Deployments

```bash
kubectl get deployments
```

## Services

```bash
kubectl get services
```

## ConfigMaps

```bash
kubectl get configmaps
```

## Secrets

```bash
kubectl get secrets
```

## Events

```bash
kubectl get events --sort-by=.lastTimestamp
```

## Pod Details

```bash
kubectl describe pod <pod-name>
```

## Logs

```bash
kubectl logs <pod-name>
```

---

# 27. Recommended Kubernetes Troubleshooting Order

When a deployment fails, use this sequence:

```text
kubectl connectivity
        ↓
Nodes
        ↓
Namespaces
        ↓
Deployments
        ↓
Pods
        ↓
Pod Events
        ↓
Container Logs
        ↓
Image
        ↓
ConfigMap / Secret
        ↓
Service
        ↓
Application
```

This prevents random changes and helps isolate the actual failure.

---

# 28. Kubernetes Troubleshooting Checklist

- [ ] Confirm `kubectl` is connected to the correct AKS cluster.
- [ ] Confirm the expected Kubernetes context.
- [ ] Check node status.
- [ ] Check the correct namespace.
- [ ] Check Deployment status.
- [ ] Check ReplicaSet status.
- [ ] Check pod status.
- [ ] Inspect pod events.
- [ ] Check container logs.
- [ ] Check previous container logs when appropriate.
- [ ] Verify the container image and tag.
- [ ] Verify the image exists in ACR.
- [ ] Check ConfigMaps.
- [ ] Check Secrets without exposing secret values.
- [ ] Check Service configuration.
- [ ] Check Service endpoints.
- [ ] Verify container and Service ports.
- [ ] Check readiness and liveness probes.
- [ ] Validate Kustomize output before applying changes.
- [ ] Consider Git/Argo CD as the source of truth for GitOps-managed resources.

---

# 29. Summary

Kubernetes troubleshooting should begin with observation rather than modification.

The most useful diagnostic sequence is:

```text
Cluster
   ↓
Nodes
   ↓
Namespace
   ↓
Deployment
   ↓
Pod
   ↓
Events
   ↓
Logs
   ↓
Image / Configuration
   ↓
Service
   ↓
Application
```

For FlavorForge, Kubernetes is part of a larger Azure DevSecOps and GitOps workflow. Therefore, a Kubernetes problem may originate outside Kubernetes itself—for example, from Docker image creation, ACR image availability, Azure permissions, Kustomize configuration, Azure DevOps, or Argo CD.

Always identify the failing layer before applying a recovery action.