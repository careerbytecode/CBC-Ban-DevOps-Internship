# Argo CD Troubleshooting

## Purpose

This document provides troubleshooting guidance for Argo CD in the FlavorForge Azure DevSecOps project.

Argo CD is responsible for continuously comparing the Kubernetes cluster with the desired state stored in Git and synchronizing changes when required.

The troubleshooting approach should always begin with inspection before making changes.

---

# 1. FlavorForge GitOps Flow

The FlavorForge GitOps flow can be understood as:

```text
GitHub Repository
       ↓
Kubernetes / Kustomize Manifests
       ↓
Argo CD
       ↓
AKS Cluster
       ↓
Kubernetes Resources
       ↓
FlavorForge Application
```

Argo CD continuously evaluates whether the live Kubernetes state matches the desired state stored in Git.

---

# 2. Argo CD CLI Is Not Available

## Problem

The `argocd` command is not available.

Check:

```bash id="z0n3as"
argocd version --client
```

If the command is not found, verify whether the Argo CD CLI is installed.

The CLI installation method should match the operating system and environment being used for the project.

After installation, verify again:

```bash id="t5j8q1"
argocd version --client
```

## Important

The Argo CD CLI and Argo CD server are separate components.

Having the CLI installed does not mean that the CLI is already authenticated to the Argo CD server.

---

# 3. Cannot Connect to Argo CD Server

## Problem

The CLI cannot communicate with the Argo CD server.

First check the Argo CD pods:

```bash id="u1e3fd"
kubectl get pods -n argocd
```

Check the Argo CD services:

```bash id="2v5qf8"
kubectl get svc -n argocd
```

Check the Argo CD server:

```bash id="6v7s2a"
kubectl get pods -n argocd | grep argocd-server
```

## Inspect the Server

```bash id="9y3w4c"
kubectl describe pod \
  -n argocd \
  <argocd-server-pod>
```

Check recent events:

```bash id="7h4k2m"
kubectl get events \
  -n argocd \
  --sort-by=.lastTimestamp
```

---

# 4. Argo CD Server Is Running but UI Is Not Accessible

## Problem

The Argo CD server pod is running, but the web interface cannot be opened.

Check the Service:

```bash id="f3s7w8"
kubectl get svc -n argocd
```

Inspect it:

```bash id="k6v2p1"
kubectl describe svc argocd-server -n argocd
```

A simple way to test local access is port forwarding:

```bash id="n9x4q2"
kubectl port-forward svc/argocd-server \
  -n argocd 8080:443
```

Then access the local Argo CD endpoint using the forwarded port.

This helps determine whether the Argo CD server itself is functioning before investigating external networking.

---

# 5. Argo CD Application Does Not Exist

## Problem

The expected FlavorForge Argo CD application cannot be found.

List applications:

```bash id="r5m8k3"
argocd app list
```

If the CLI is not connected, inspect Kubernetes directly:

```bash id="q8v2n6"
kubectl get applications \
  -n argocd
```

The Argo CD Application resource should exist in the `argocd` namespace.

---

# 6. Argo CD CLI Authentication Fails

## Problem

The CLI is installed but commands requiring the Argo CD server fail because the CLI is not logged in.

Check the current Argo CD context:

```bash id="a6y3f9"
argocd context
```

Log in using the Argo CD server address:

```bash id="x7m2k4"
argocd login <argocd-server>
```

The exact server address depends on how Argo CD is exposed in the environment.

After login:

```bash id="w9p5c1"
argocd app list
```

## Security Reminder

Do not place Argo CD passwords directly into Git repositories, scripts, screenshots, or documentation.

---

# 7. Argo CD Application Is OutOfSync

## Problem

The Argo CD Application shows:

```text
OutOfSync
```

This means the desired state in Git differs from the live Kubernetes state.

Check:

```bash id="g4n7t2"
argocd app get <application-name>
```

Or inspect the Application resource:

```bash id="e5c9v3"
kubectl get application \
  -n argocd \
  <application-name> \
  -o yaml
```

## Possible Causes

- Git contains a newer manifest.
- A Kubernetes resource was changed manually.
- A resource was deleted from the cluster.
- Kustomize generated a different desired state.
- Argo CD is tracking a different Git revision.
- The configured path or branch is incorrect.

Do not immediately sync.

First determine **what differs**.

---

# 8. Review the OutOfSync Difference

Use:

```bash id="j8k4s2"
argocd app diff <application-name>
```

This compares the desired state with the live state.

Look for differences in:

- Image tags.
- Replica counts.
- Labels.
- Environment variables.
- Service configuration.
- Deployment configuration.
- ConfigMaps.
- Other managed resources.

Once the difference is understood, decide whether Git or the cluster contains the intended state.

---

# 9. Argo CD Application Is Synced but Not Healthy

## Problem

An application may show:

```text
Synced
```

but:

```text
Degraded
```

or another unhealthy status.

This means Argo CD successfully synchronized the desired configuration, but one or more Kubernetes resources are not healthy.

Check:

```bash id="q7p2m9"
argocd app get <application-name>
```

Then check Kubernetes:

```bash id="y4c6w8"
kubectl get pods
```

Inspect unhealthy pods:

```bash id="z3n8k5"
kubectl describe pod <pod-name>
```

Check logs:

```bash id="r2f7v4"
kubectl logs <pod-name>
```

## Important

A `Synced` status does not automatically mean the application is working.

Argo CD synchronization and application health are separate concepts.

---

# 10. Argo CD Application Is Missing Resources

## Problem

The Application exists, but expected Kubernetes resources are not visible.

Check the Application:

```bash id="c9m3t7"
argocd app resources <application-name>
```

Also inspect Kubernetes:

```bash id="s5v8q2"
kubectl get all
```

If a specific namespace is used:

```bash id="p6k4w1"
kubectl get all -n <namespace>
```

## Check the Git Path

Inspect the Application configuration:

```bash id="u7x2j9"
kubectl get application \
  -n argocd \
  <application-name> \
  -o yaml
```

Look for:

```text id="m1f8z3"
spec:
  source:
    repoURL:
    path:
    targetRevision:
```

The configured repository path must point to the intended FlavorForge Kubernetes/Kustomize manifests.

---

# 11. Argo CD Is Tracking the Wrong Branch

## Problem

Argo CD appears healthy but is not picking up expected changes.

Check:

```bash id="d5k7v2"
argocd app get <application-name>
```

Inspect:

```text id="f2h9q6"
Target Revision
```

Verify the Application configuration:

```bash id="w4j8n1"
kubectl get application \
  -n argocd \
  <application-name> \
  -o yaml
```

Check:

```text id="q3r6t9"
spec.source.targetRevision
```

Make sure it points to the intended Git branch, tag, or commit.

---

# 12. Argo CD Is Tracking the Wrong Repository Path

## Problem

Changes are pushed to Git, but Argo CD does not detect the expected Kubernetes changes.

Check:

```bash id="e8v3k5"
argocd app get <application-name>
```

Verify the configured path.

The path must point to the correct Kubernetes/Kustomize directory in the FlavorForge repository.

If the path points to the wrong directory, Argo CD may successfully synchronize the wrong manifests.

---

# 13. Argo CD Cannot Access the Git Repository

## Problem

The Application reports that the repository cannot be accessed.

Check the Application:

```bash id="n6q2x8"
argocd app get <application-name>
```

Look for repository-related errors.

Check configured repositories:

```bash id="v7m4p1"
argocd repo list
```

If using Kubernetes resources:

```bash id="j2k9s5"
kubectl get secrets -n argocd
```

## Possible Causes

- Incorrect repository URL.
- Authentication problem.
- Repository credentials changed.
- Network connectivity problem.
- Repository is unavailable.
- Incorrect branch/path configuration.

Do not expose repository credentials while troubleshooting.

---

# 14. Argo CD Repository Authentication Failure

## Problem

Argo CD can see the repository configuration but cannot authenticate to Git.

Check:

```bash id="r8x5c3"
argocd repo list
```

The repository should show a healthy connection.

If authentication has changed, update the repository configuration using the configured Argo CD management method.

Avoid putting Git credentials directly into application manifests.

---

# 15. Argo CD Sync Fails

## Problem

The Application is OutOfSync and synchronization fails.

First inspect:

```bash id="q4m7z1"
argocd app get <application-name>
```

Then inspect the sync operation and error message.

Also check Kubernetes:

```bash id="y6n2k8"
kubectl get events --sort-by=.lastTimestamp
```

## Common Causes

- Invalid Kubernetes manifest.
- Invalid Kustomize configuration.
- Resource conflict.
- Permission problem.
- Immutable field change.
- Missing dependency.
- Namespace problem.
- Invalid image configuration.

Always investigate the exact sync error before retrying repeatedly.

---

# 16. Argo CD Sync Succeeds but Application Still Fails

## Problem

Argo CD reports a successful synchronization, but the application is not working.

Check:

```bash id="c7w3p9"
argocd app get <application-name>
```

Then:

```bash id="b8m4x2"
kubectl get pods
```

Check:

```bash id="f5k9q6"
kubectl get services
```

And:

```bash id="n3v7s1"
kubectl get events --sort-by=.lastTimestamp
```

The synchronization may be correct while the application itself is failing.

Possible causes include:

- Application crash.
- Image-pull problem.
- Incorrect configuration.
- Readiness probe failure.
- Service configuration problem.

---

# 17. Manual Kubernetes Changes Are Reverted

## Problem

A change made directly using `kubectl` appears to work temporarily but later disappears.

This is expected behavior in a GitOps-managed environment if Argo CD detects that the live state differs from Git.

For example:

```bash id="a2x6k8"
kubectl edit deployment <deployment-name>
```

A manual change may later be replaced by the state stored in Git.

## Correct GitOps Approach

The preferred flow is:

```text
Change Git
   ↓
Commit
   ↓
Push
   ↓
Argo CD Detects Change
   ↓
Argo CD Syncs
   ↓
AKS Updated
```

Do not rely on manual `kubectl` changes for permanent configuration.

---

# 18. Self-Healing Does Not Behave as Expected

## Problem

A manually changed resource does not immediately return to the Git-defined state.

First check the Application configuration:

```bash id="u5r8m2"
argocd app get <application-name>
```

Inspect the sync policy:

```bash id="p7c3n9"
kubectl get application \
  -n argocd \
  <application-name> \
  -o yaml
```

Look for:

```text id="x2f6v4"
automated
```

and configured sync options.

If self-healing is enabled, Argo CD should detect drift and reconcile the live resource with the desired state.

If it does not, inspect:

- Application health.
- Sync status.
- Git revision.
- Resource tracking.
- Argo CD controller logs.

---

# 19. Check Argo CD Controller Logs

When an Application behaves unexpectedly, inspect the relevant Argo CD components.

List Argo CD pods:

```bash id="j6q4v8"
kubectl get pods -n argocd
```

Controller logs:

```bash id="z8m3t5"
kubectl logs \
  -n argocd \
  deployment/argocd-application-controller
```

Repository server logs:

```bash id="f4k7p2"
kubectl logs \
  -n argocd \
  deployment/argocd-repo-server
```

API server logs:

```bash id="c3n9w6"
kubectl logs \
  -n argocd \
  deployment/argocd-server
```

Use logs to identify the component producing the error instead of restarting all Argo CD components unnecessarily.

---

# 20. Argo CD Application Controller Is Not Healthy

## Problem

The Application controller is unavailable or repeatedly restarting.

Check:

```bash id="w2h7m4"
kubectl get pods -n argocd
```

Inspect the controller:

```bash id="s6p9k3"
kubectl describe pod \
  -n argocd \
  <application-controller-pod>
```

Check logs:

```bash id="k4x8v1"
kubectl logs \
  -n argocd \
  <application-controller-pod>
```

Check events:

```bash id="n5q2z7"
kubectl get events \
  -n argocd \
  --sort-by=.lastTimestamp
```

---

# 21. Argo CD Shows Unknown or Missing Health Status

## Problem

A resource does not have the expected health status.

Start with:

```bash id="t7m3c9"
argocd app get <application-name>
```

Then inspect the resource:

```bash id="v2k8p5"
argocd app resources <application-name>
```

Check the corresponding Kubernetes object:

```bash id="g6x4n1"
kubectl describe <resource-type> <resource-name>
```

The issue may be caused by:

- Resource not existing.
- Resource being replaced.
- Resource not reporting expected status.
- Controller not processing the resource.
- Application configuration issue.

---

# 22. Argo CD Application Is Stuck in Syncing

## Problem

The Application remains in a syncing state for an unusually long period.

Check:

```bash id="m8q3w5"
argocd app get <application-name>
```

Then inspect:

```bash id="c4v7n2"
kubectl get events --sort-by=.lastTimestamp
```

Check the affected Kubernetes resources.

```bash id="y5k9r1"
kubectl get all
```

A sync can remain incomplete when a resource:

- Cannot be created.
- Cannot become healthy.
- Is waiting for another dependency.
- Has invalid configuration.

---

# 23. Argo CD and Kustomize Troubleshooting

Because FlavorForge uses Kustomize, an Argo CD synchronization problem may originate from Kustomize.

Test the manifests independently:

```bash id="z3f6m8"
kubectl kustomize <overlay-directory>
```

If generation fails, fix the Kustomize configuration before troubleshooting Argo CD itself.

A useful diagnostic separation is:

```text
Kustomize Generation
        ↓
Valid Kubernetes YAML
        ↓
Argo CD Repository Access
        ↓
Argo CD Application
        ↓
Kubernetes Sync
        ↓
Application Health
```

---

# 24. Image Update Is Not Reflected in Argo CD

## Problem

A new Docker image was built, but Argo CD does not deploy the expected image.

Check the image currently referenced by the Deployment:

```bash id="r9x4k2"
kubectl get deployment <deployment-name> \
  -o jsonpath='{.spec.template.spec.containers[*].image}'
```

Check the Git manifest:

```bash id="v5m7n3"
grep -R "image:" <kubernetes-directory>
```

Compare the two values.

Then verify the image exists in ACR:

```bash id="h2c8q6"
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

## Diagnostic Flow

```text
Docker Image
     ↓
ACR
     ↓
Git Manifest
     ↓
Argo CD Desired State
     ↓
Kubernetes Deployment
     ↓
Pod
```

All layers must reference the intended image.

---

# 25. Sync Policy Problems

Check the Application configuration:

```bash id="p3w8m5"
kubectl get application \
  -n argocd \
  <application-name> \
  -o yaml
```

Inspect:

```text id="f6q2x9"
spec.syncPolicy
```

The configuration determines whether synchronization is:

- Manual.
- Automated.
- Configured for pruning.
- Configured for self-healing.

Do not change synchronization settings without understanding the effect on the cluster.

---

# 26. Argo CD Resource Pruning

## Problem

A resource disappears after synchronization.

This can happen when a resource is no longer part of the desired Git state and pruning is enabled.

Before deleting or recreating anything, inspect:

```bash id="x7m4c2"
argocd app diff <application-name>
```

Review the Application sync policy.

If pruning is enabled, removing a resource from Git may intentionally cause Argo CD to remove it from the cluster.

This is one reason Git changes should be reviewed carefully before synchronization.

---

# 27. Argo CD Troubleshooting Decision Flow

Use this sequence:

```text
Argo CD CLI / UI
       ↓
Argo CD Server
       ↓
Application
       ↓
Repository
       ↓
Git Revision
       ↓
Kustomize
       ↓
Desired Resources
       ↓
Sync
       ↓
Kubernetes Resources
       ↓
Application Health
```

Stop at the first failing layer.

---

# 28. Useful Argo CD Commands

## List Applications

```bash id="q8v5m3"
argocd app list
```

## Application Details

```bash id="k4x7n2"
argocd app get <application-name>
```

## Application Diff

```bash id="j6p3w9"
argocd app diff <application-name>
```

## Application Resources

```bash id="m2c8v4"
argocd app resources <application-name>
```

## Repository List

```bash id="z5n7q1"
argocd repo list
```

## Argo CD Context

```bash id="x3f6k8"
argocd context
```

## Kubernetes Applications

```bash id="r7v4m2"
kubectl get applications -n argocd
```

## Argo CD Pods

```bash id="n9c5w3"
kubectl get pods -n argocd
```

---

# 29. Common Argo CD Mistakes to Avoid

### Mistake 1 — Syncing without checking the difference

Use:

```bash id="s4k8p2"
argocd app diff <application-name>
```

before making a synchronization decision when the cause of drift is unclear.

### Mistake 2 — Editing Kubernetes resources manually

Manual changes can be overwritten by GitOps reconciliation.

Make permanent changes in Git.

### Mistake 3 — Assuming Synced means Healthy

Check both synchronization and health.

### Mistake 4 — Blaming Argo CD for an invalid manifest

Validate Kustomize output first.

### Mistake 5 — Changing the sync policy unnecessarily

Automated sync, pruning, and self-healing can have significant effects.

### Mistake 6 — Recreating the Application immediately

Inspect repository URL, path, revision, sync status, and events first.

---

# 30. Argo CD Troubleshooting Checklist

- [ ] Confirm the Argo CD server is running.
- [ ] Confirm the Argo CD CLI is installed if CLI access is required.
- [ ] Confirm CLI authentication.
- [ ] Confirm the FlavorForge Application exists.
- [ ] Check Application sync status.
- [ ] Check Application health.
- [ ] Review `argocd app diff`.
- [ ] Verify the Git repository URL.
- [ ] Verify the target revision.
- [ ] Verify the manifest path.
- [ ] Validate Kustomize output.
- [ ] Check repository connectivity.
- [ ] Check Argo CD controller logs when necessary.
- [ ] Check Kubernetes events.
- [ ] Check Deployment and Pod status.
- [ ] Verify container image and tag.
- [ ] Verify the image exists in ACR.
- [ ] Check Service configuration.
- [ ] Check sync policy.
- [ ] Check self-healing configuration when relevant.
- [ ] Avoid unnecessary manual Kubernetes changes.
- [ ] Keep Git as the source of truth for GitOps-managed configuration.

---

# 31. Summary

Argo CD troubleshooting should separate **Git problems, manifest problems, synchronization problems, and application problems**.

The most useful diagnostic flow is:

```text
Git
 ↓
Repository Access
 ↓
Revision / Path
 ↓
Kustomize
 ↓
Argo CD Application
 ↓
Sync
 ↓
Kubernetes
 ↓
Application Health
```

For FlavorForge, Argo CD is the GitOps layer connecting the Git repository to AKS.

A successful synchronization means that Argo CD applied the desired state. It does not necessarily mean that the application itself is healthy.

Always verify:

```text
Synced + Healthy
```

rather than checking synchronization alone.

The preferred GitOps recovery pattern is:

```text
Identify Problem
      ↓
Check Argo CD Difference
      ↓
Check Git / Kustomize
      ↓
Correct Source of Truth
      ↓
Commit and Push
      ↓
Argo CD Reconciles
      ↓
Verify Kubernetes
      ↓
Verify Application
```

This preserves the intended DevSecOps and GitOps workflow while making troubleshooting reproducible for future users.