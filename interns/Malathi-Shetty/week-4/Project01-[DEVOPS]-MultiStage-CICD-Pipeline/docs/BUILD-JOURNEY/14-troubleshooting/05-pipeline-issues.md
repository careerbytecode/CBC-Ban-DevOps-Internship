# Pipeline Troubleshooting

## Purpose

This document provides troubleshooting guidance for the FlavorForge Azure DevSecOps CI/CD pipeline.

The pipeline connects source code, testing, security scanning, code quality analysis, Docker image creation, Azure Container Registry, AKS deployment, and GitOps components.

The goal of this document is to help identify the failing stage before making changes.

---

# 1. FlavorForge Pipeline Flow

The FlavorForge pipeline contains multiple stages that work together.

The general flow is:

```text
GitHub Repository
       ↓
Build
       ↓
Test
       ↓
Security
       ↓
SonarCloud
       ↓
Docker Build
       ↓
Trivy Scan
       ↓
Push to ACR
       ↓
Deploy to AKS
       ↓
AI Reports
       ↓
Deployment Verification
```

The exact execution order should always be verified against the current pipeline YAML in the repository.

---

# 2. Pipeline Does Not Start

## Problem

A pipeline does not start after code is pushed to GitHub.

## Check

First verify that the pipeline definition exists in the repository.

Check the pipeline YAML:

```bash id="a6gq2f"
find . -type f \( -name "*.yml" -o -name "*.yaml" \) | sort
```

Inspect the relevant pipeline file:

```bash id="i0q6gs"
sed -n '1,260p' <pipeline-file>
```

## Possible Causes

* Incorrect trigger configuration.
* Pipeline is disabled.
* GitHub repository connection is unavailable.
* Pipeline YAML contains syntax errors.
* The commit does not match the configured trigger branch or path.

## Recovery

Check the pipeline configuration in Azure DevOps before changing the YAML.

Also confirm that the latest commit exists in the expected GitHub branch.

---

# 3. Pipeline YAML Syntax Error

## Problem

Azure DevOps cannot load the pipeline because the YAML is invalid.

Common causes include:

* Incorrect indentation.
* Missing colon.
* Incorrect list syntax.
* Invalid variable structure.
* Incorrect stage or job nesting.

## First Check

Open the pipeline YAML:

```bash id="nbxw6f"
sed -n '1,300p' <pipeline-file>
```

Review the indentation carefully.

YAML uses indentation to define structure, so spaces are significant.

## Helpful Local Check

If a YAML parser is available:

```bash id="l5s8na"
python - <<'PY'
import yaml
with open("<pipeline-file>") as f:
    yaml.safe_load(f)
print("YAML syntax OK")
PY
```

If PyYAML is not installed, use the Azure DevOps pipeline editor's validation facilities instead.

---

# 4. Build Stage Fails

## Problem

The pipeline fails during the Build stage.

First identify the exact command that failed in the pipeline log.

For a Maven-based Java application, common build commands include:

```bash id="b5tq9h"
mvn clean package
```

or:

```bash id="w3lq2a"
./mvnw clean package
```

Use the command that is actually defined in the FlavorForge pipeline.

## Possible Causes

* Dependency download failure.
* Java version mismatch.
* Maven configuration problem.
* Compilation error.
* Missing source file.
* Incorrect working directory.

## Local Reproduction

Run the same build command locally from the application directory.

For example:

```bash id="c6y4wq"
mvn clean package
```

If the build fails locally as well, resolve the application/build problem before investigating Azure DevOps.

---

# 5. Test Stage Fails

## Problem

The application builds but automated tests fail.

Check the pipeline log for the failing test.

Run the tests locally using the same command defined in the pipeline.

For Maven:

```bash id="6v4ypm"
mvn test
```

## Investigate

Look for:

* Test assertion failures.
* Compilation failures.
* Missing dependencies.
* Environment-specific configuration.
* Test data problems.

Do not skip failing tests simply to make the pipeline pass.

A test failure should be understood before changing the pipeline.

---

# 6. Security Stage Fails

## Problem

A security-related pipeline step fails.

FlavorForge uses security scanning as part of the DevSecOps workflow.

First identify which security tool produced the failure.

Possible checks include:

* Trivy filesystem scanning.
* Trivy container image scanning.
* Other security validation steps defined in the pipeline.

## Check the Pipeline Log

Look for:

```text
ERROR
FAILED
CRITICAL
HIGH
exit code
```

The exit code is particularly useful because many security tools intentionally return a non-zero exit code when a configured vulnerability threshold is reached.

---

# 7. Trivy Scan Fails

## Problem

Trivy reports vulnerabilities or the pipeline exits during a Trivy scan.

First determine whether the scan is running against:

* Source files.
* Filesystem.
* Docker image.

For a local filesystem scan:

```bash id="4d4xfl"
trivy fs .
```

For a Docker image:

```bash id="xk6s5m"
trivy image <image-name>:<tag>
```

Use the same image name and tag configured by the project.

## Understand the Result

A vulnerability report does not automatically mean that Trivy itself failed.

Check the pipeline configuration to determine which severity levels cause a non-zero exit code.

Do not disable the scan merely because it reports vulnerabilities.

---

# 8. SonarCloud Stage Fails

## Problem

The SonarCloud stage fails or the Quality Gate does not pass.

First inspect the pipeline log for the SonarCloud task.

Then check the SonarCloud project.

The pipeline should use the configured SonarCloud service connection and project configuration.

## Common Causes

* Incorrect SonarCloud project key.
* Incorrect organization.
* Service connection problem.
* Authentication/token problem.
* Quality Gate failure.
* Analysis configuration issue.

## Important

A successful SonarCloud analysis and a passing Quality Gate are related but not identical.

The analysis may complete while the Quality Gate fails.

Check the Quality Gate result separately.

---

# 9. SonarCloud Quality Gate Fails

## Problem

The pipeline reaches SonarCloud but the Quality Gate is failed.

Check:

* New bugs.
* Vulnerabilities.
* Code smells.
* Coverage requirements.
* Duplicated code.
* Quality Gate conditions.

Do not remove the Quality Gate simply to make the pipeline green.

The Quality Gate is part of the DevSecOps control process.

---

# 10. Docker Build Stage Fails

## Problem

The Docker image cannot be built.

First reproduce the build locally using the same Dockerfile:

```bash id="l5d8up"
docker build -t <image-name>:<tag> .
```

## Check

Look for:

* Incorrect Dockerfile path.
* Missing files in the build context.
* Invalid Dockerfile instruction.
* Maven build failure.
* Base image problem.
* Network access to package repositories.
* Incorrect working directory.

## Check Dockerfile

```bash id="yq1zsv"
cat Dockerfile
```

Also inspect `.dockerignore`:

```bash id="j9a0jt"
cat .dockerignore
```

A file excluded by `.dockerignore` may not be available inside the Docker build context.

---

# 11. Docker Image Was Built but Push Fails

## Problem

The Docker build succeeds but the Push stage fails.

FlavorForge uses:

```text id="rklp3y"
flavorforgeacr2026ms.azurecr.io
```

Check Azure authentication:

```bash id="zlj8is"
az account show
```

Authenticate to ACR:

```bash id="q4ys9f"
az acr login --name flavorforgeacr2026ms
```

Verify the local image:

```bash id="k5j8mi"
docker images
```

The image must be tagged for the ACR login server before pushing.

General format:

```text id="hglw3b"
flavorforgeacr2026ms.azurecr.io/<repository>:<tag>
```

Then:

```bash id="7j7d1g"
docker push flavorforgeacr2026ms.azurecr.io/<repository>:<tag>
```

Use the repository and tag actually configured by the FlavorForge pipeline.

---

# 12. ACR Image Tag Mismatch

## Problem

The Docker build succeeds but deployment later reports an image-pull problem.

This can happen when different parts of the project reference different image tags.

During FlavorForge development, local Docker images were tagged:

```text id="8g7x6r"
:1.0
```

while Kubernetes manifests referenced:

```text id="w4f5is"
:1.8
```

Therefore, the important check is not simply whether a Docker image was built.

Verify that the exact image referenced by Kubernetes exists in ACR.

```bash id="nq7h0t"
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository <repository> \
  --output table
```

## Diagnostic Flow

```text id="1w4s4f"
Pipeline image tag
        ↓
Docker image
        ↓
ACR image
        ↓
Kubernetes image reference
        ↓
AKS pod
```

All five layers must agree.

---

# 13. Azure Service Connection Fails

## Problem

An Azure DevOps task cannot authenticate to Azure.

The pipeline may report an authentication or authorization error.

## Check

Identify which service connection the failing task uses.

Then check the Azure DevOps project service connections.

Possible causes:

* Service connection is disabled.
* Credentials expired.
* Incorrect permissions.
* Wrong Azure subscription.
* Service principal permissions are insufficient.

Do not recreate the service connection immediately.

First inspect its configuration and permissions.

---

# 14. Azure Container Registry Service Connection Fails

## Problem

The pipeline cannot authenticate to ACR.

Check which authentication method is configured in the pipeline.

Verify:

* Registry name.
* Login server.
* Service connection.
* Permissions.
* Repository/tag configuration.

FlavorForge ACR:

```text id="l7v2yk"
flavorforgeacr2026ms
```

Login server:

```text id="v48d8f"
flavorforgeacr2026ms.azurecr.io
```

The pipeline should use the configured Azure DevOps service connection rather than embedding credentials directly in YAML.

---

# 15. AKS Deployment Stage Fails

## Problem

The pipeline successfully builds and scans the image but fails during AKS deployment.

First inspect the pipeline log and identify the exact failing command.

Common causes include:

* AKS service connection problem.
* Incorrect cluster name.
* Incorrect resource group.
* Kubernetes authentication failure.
* Invalid manifest.
* Image-pull problem.
* Namespace problem.

FlavorForge AKS:

```text id="oy7bfl"
flavorforge-aks
```

Resource group:

```text id="w3s0a8"
flavorforge-rg
```

---

# 16. Kubernetes Manifest Validation Fails

## Problem

The deployment stage fails because Kubernetes rejects the generated YAML.

Validate the manifests before deployment.

For raw manifests:

```bash id="x2ml6x"
kubectl apply --dry-run=client -f <manifest-file>
```

For a directory:

```bash id="f3l8gl"
kubectl apply --dry-run=client -f <manifest-directory>
```

For Kustomize:

```bash id="h5g3tz"
kubectl kustomize <overlay-directory>
```

Review the generated output before applying it to the cluster.

---

# 17. Kustomize Stage Fails

## Problem

The pipeline cannot generate the expected manifests using Kustomize.

Check:

```bash id="j1i8j7"
kubectl kustomize <overlay-directory>
```

Possible causes:

* Missing resource.
* Incorrect relative path.
* Invalid YAML.
* Incorrect patch.
* Wrong target name.
* Invalid `kustomization.yaml`.

Review the Kustomize structure in:

```text id="y2e7d9"
06-kubernetes/
07-kustomize/
```

and compare it with the paths referenced by the pipeline.

---

# 18. Deployment Succeeds but Pods Fail

## Problem

The Azure DevOps deployment task reports success, but the application does not become healthy.

This means the pipeline operation itself may have succeeded while the Kubernetes workload failed.

Check:

```bash id="j8g0fp"
kubectl get pods
```

Then:

```bash id="7w4a3c"
kubectl describe pod <pod-name>
```

Check logs:

```bash id="v6v5qg"
kubectl logs <pod-name>
```

The problem may be:

* Image pull failure.
* Application startup failure.
* Configuration issue.
* Readiness probe failure.
* Service configuration issue.

---

# 19. Pipeline Times Out During Deployment

## Problem

The pipeline remains in a deployment step and eventually times out.

Do not assume the pipeline timeout itself is the root cause.

Check the cluster:

```bash id="j5r9ae"
kubectl get pods
```

Then:

```bash id="7v0b3g"
kubectl get events --sort-by=.lastTimestamp
```

Inspect the deployment:

```bash id="7g6m5e"
kubectl get deployments
```

The application may simply be waiting for pods to become ready.

---

# 20. Pipeline Variable Is Empty

## Problem

A pipeline task receives an empty value for a variable.

Check:

* Variable name.
* Variable group.
* Pipeline variable scope.
* Stage/job scope.
* Runtime expression syntax.
* Secret variable configuration.

Compare the variable name in the YAML with the name configured in Azure DevOps.

Avoid printing secret variables into logs.

---

# 21. Secret Is Exposed in Pipeline Logs

## Problem

Sensitive information accidentally appears in pipeline output.

Immediately avoid further exposure.

Do not copy the secret into documentation or issue reports.

Check whether the value is:

* Hard-coded in YAML.
* Printed by a shell command.
* Stored as a normal variable instead of a secret.
* Returned by a diagnostic command.

Use Azure DevOps secret variables or an appropriate secret-management mechanism.

Never store credentials directly in Git.

---

# 22. Agent Pool or Agent Is Unavailable

## Problem

The pipeline cannot obtain an available agent.

Check the pipeline's configured agent pool.

Possible causes:

* No available agent.
* Agent offline.
* Incorrect pool name.
* Permission problem.
* Hosted-agent availability issue.

The pipeline should use the agent pool configured for the FlavorForge project.

Do not change the agent pool without confirming that the current pool is actually unavailable.

---

# 23. Pipeline Works Locally but Fails in Azure DevOps

## Problem

A command works from the local machine but fails in the pipeline.

This commonly indicates an environment difference.

Compare:

* Java version.
* Maven version.
* Docker version.
* kubectl version.
* Azure CLI version.
* Working directory.
* Environment variables.
* Authentication.
* Available files.
* Network access.

## Diagnostic Principle

```text id="0p6y0r"
Local Environment
       ≠
Azure DevOps Agent
```

A command that succeeds locally does not automatically guarantee that the same command will work on the pipeline agent.

---

# 24. Pipeline Stage Succeeds but Next Stage Fails

## Problem

One stage is green but the following stage fails.

Treat the stage boundary as a diagnostic checkpoint.

For example:

```text id="m2qv8v"
Docker Build
     ↓
Success
     ↓
Push
     ↓
Failure
```

The Docker build itself may be healthy.

The problem is more likely related to:

* Image tagging.
* Registry authentication.
* ACR permissions.
* Repository naming.
* Push configuration.

Similarly:

```text id="n4cx91"
Push
  ↓
Success
  ↓
Deploy
  ↓
Failure
```

Focus on:

* AKS credentials.
* Manifest configuration.
* Image reference.
* Kubernetes access.
* Namespace.

---

# 25. How to Read a Pipeline Failure

When a stage fails, use this sequence:

### Step 1 — Identify the failing stage

Example:

```text id="8e4ybl"
Build
Test
Security
CodeQuality
DockerBuild  ← failure
```

### Step 2 — Find the first real error

Do not focus only on the final `Task failed` message.

Look earlier in the log for the first meaningful error.

### Step 3 — Identify the tool

Determine whether the failure came from:

* Maven
* Trivy
* SonarCloud
* Docker
* Azure CLI
* kubectl
* Kustomize

### Step 4 — Reproduce if possible

Run the same command locally.

### Step 5 — Check external dependencies

For example:

```text id="k0j6d2"
Docker → ACR
kubectl → AKS
SonarCloud → SonarCloud service
Azure CLI → Azure subscription
```

### Step 6 — Make one controlled change

Avoid changing several pipeline stages simultaneously.

---

# 26. Pipeline Troubleshooting Decision Flow

Use this general flow:

```text id="s8ykp5"
Pipeline Trigger
      ↓
YAML Valid?
      ↓
Build
      ↓
Test
      ↓
Security
      ↓
SonarCloud
      ↓
Docker Build
      ↓
Trivy
      ↓
ACR Push
      ↓
AKS Authentication
      ↓
Kubernetes Deployment
      ↓
Pod Health
      ↓
Application
```

Stop at the first failed layer and investigate that layer before moving forward.

---

# 27. Useful Pipeline Verification Commands

## Git Status

```bash id="6rqv9e"
git status
```

## Recent Commit

```bash id="e9i6hs"
git log -1 --oneline
```

## Check Pipeline YAML

```bash id="i8t3qv"
sed -n '1,300p' <pipeline-file>
```

## Build

```bash id="cxv6sn"
mvn clean package
```

## Docker Build

```bash id="x5zv0h"
docker build -t <image-name>:<tag> .
```

## Trivy

```bash id="f7u8my"
trivy image <image-name>:<tag>
```

## ACR

```bash id="h5q6y1"
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

## AKS

```bash id="4d9g6r"
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --output table
```

## Kubernetes

```bash id="5q8v2k"
kubectl get nodes
kubectl get pods
kubectl get services
```

---

# 28. Common Pipeline Mistakes to Avoid

## Mistake 1 — Changing YAML without reading the log

Always identify the actual failing task first.

## Mistake 2 — Disabling security checks

Do not disable Trivy or SonarCloud simply because they fail.

Understand why they failed.

## Mistake 3 — Hard-coding credentials

Never put passwords, tokens, or service-principal secrets directly in the pipeline YAML.

## Mistake 4 — Assuming a successful Docker build means deployment will succeed

The image still needs to be:

1. Tagged correctly.
2. Pushed to ACR.
3. Available under the expected repository/tag.
4. Accessible to AKS.
5. Referenced correctly by Kubernetes.

## Mistake 5 — Fixing Kubernetes when the pipeline is the problem

First determine whether the deployment actually reached Kubernetes.

## Mistake 6 — Fixing the pipeline when the application is the problem

A successful deployment command does not guarantee that the application is healthy.

---

# 29. Pipeline Troubleshooting Checklist

* [ ] Confirm the pipeline was triggered from the expected branch.
* [ ] Confirm the YAML is valid.
* [ ] Identify the first failed stage.
* [ ] Identify the first meaningful error in the logs.
* [ ] Check the build environment.
* [ ] Verify tests.
* [ ] Review security scan results.
* [ ] Review SonarCloud analysis and Quality Gate.
* [ ] Verify Docker build.
* [ ] Verify Docker image tag.
* [ ] Verify Trivy scan.
* [ ] Verify ACR authentication.
* [ ] Verify image push.
* [ ] Verify the image exists in ACR.
* [ ] Verify AKS authentication.
* [ ] Validate Kubernetes manifests.
* [ ] Validate Kustomize output.
* [ ] Check deployment status.
* [ ] Check pod status.
* [ ] Check pod events.
* [ ] Check application logs.
* [ ] Verify Argo CD state when GitOps is involved.
* [ ] Document the root cause and recovery action.

---

# 30. Summary

A pipeline failure should be treated as a signal from a specific stage rather than as one large problem.

The most useful approach is:

```text id="5z0i4f"
Find Failed Stage
       ↓
Find First Real Error
       ↓
Identify Tool
       ↓
Check Configuration
       ↓
Reproduce
       ↓
Fix Root Cause
       ↓
Run Again
       ↓
Verify Downstream Stage
```

For FlavorForge, the pipeline crosses several systems:

```text id="x2g0q5"
GitHub
  ↓
Azure DevOps
  ↓
SonarCloud / Trivy
  ↓
Docker
  ↓
Azure Container Registry
  ↓
AKS
  ↓
Kubernetes
  ↓
Argo CD
```

Because these systems are connected, troubleshooting should always identify **which system is failing** before making a change.

The objective is not simply to make the pipeline green. The objective is to understand and correct the underlying problem while preserving the security and DevSecOps controls of the project.
