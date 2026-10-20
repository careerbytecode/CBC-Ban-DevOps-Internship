# Reproducibility Check

## Purpose

This document verifies whether the FlavorForge Azure DevSecOps project is sufficiently documented and structured for another user to reproduce the implementation.

The objective is to confirm that the project contains:

- Source code.
- Configuration.
- Infrastructure information.
- Deployment manifests.
- CI/CD configuration.
- Security configuration.
- GitOps configuration.
- Documentation.
- Troubleshooting guidance.
- Verification procedures.

The reproducibility principle is:

> **A documented project should allow another user to understand what was built, why it was built, and how to rebuild it.**

---

# 1. Reproducibility Scope

The reproducibility review covers:

```text
Prerequisites
     ↓
GitHub
     ↓
Application
     ↓
Docker
     ↓
Azure
     ↓
Kubernetes
     ↓
Kustomize
     ↓
Azure DevOps
     ↓
SonarCloud
     ↓
Trivy
     ↓
Argo CD
     ↓
Verification
````

The review does not claim that every step has been freshly rebuilt from scratch.

Instead, it verifies that the repository contains sufficient instructions and configuration to reproduce the project.

---

# 2. Repository Availability

Verify that the FlavorForge repository is available locally:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check the Git repository:

```bash
git status
```

Check the remote:

```bash
git remote -v
```

Check recent commits:

```bash
git log --oneline -10
```

The repository should contain the project source code, configuration, manifests, pipeline definitions, and documentation required for the implementation.

---

# 3. Prerequisites Documentation

Review:

```text
docs/week-4/BUILD-JOURNEY/01-prerequisites/
```

Verify that the documentation explains the tools and environment required to start the project.

At minimum, the documentation should identify the major tools used by FlavorForge, such as:

* Git
* GitHub
* Linux/WSL where applicable
* Java/Maven
* Docker
* Azure CLI
* kubectl
* Kubernetes
* Kustomize
* Azure DevOps
* SonarCloud
* Trivy
* Argo CD

The exact versions should only be documented when they are actually known or verified.

---

# 4. GitHub Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/02-github/
```

Verify that the documentation explains:

* Repository creation.
* Repository structure.
* Source code location.
* Git workflow.
* How changes are committed.
* How changes are pushed.

Check the repository:

```bash
git remote -v
```

Verify that the intended GitHub repository is configured as the remote.

---

# 5. Application Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/03-application/
```

Verify that the application documentation explains:

* Application purpose.
* Application structure.
* Build process.
* Important application files.
* How the application is packaged.

For a Maven application, verify that the repository contains the Maven project configuration.

Example:

```bash
ls
```

If the project contains a Maven `pom.xml`, verify:

```bash
test -f pom.xml && echo "pom.xml exists"
```

The application build command should be documented.

For example:

```bash
mvn clean package
```

---

# 6. Docker Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/04-docker/
```

Verify that the repository contains the Docker configuration used by the application.

Check:

```bash
find . -maxdepth 3 -type f \
  \( -name "Dockerfile" -o -name ".dockerignore" -o -name "docker-compose.yml" -o -name "compose.yml" \) \
  | sort
```

Verify that the documentation explains:

* Dockerfile purpose.
* Image build process.
* Container execution.
* Docker Compose where applicable.
* Build optimization where applicable.
* `.dockerignore`.

A reproducible Docker build should not depend on undocumented local files.

---

# 7. Azure Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/05-azure/
```

Verify that the documentation identifies the Azure resources required by FlavorForge.

The documented Week 4 resources include:

```text
Resource Group:
flavorforge-rg

ACR:
flavorforgeacr2026ms

ACR Login Server:
flavorforgeacr2026ms.azurecr.io

AKS:
flavorforge-aks
```

The documentation should explain how these resources were created or configured.

---

# 8. Azure Resource Separation

The documentation must clearly distinguish the FlavorForge Week 4 Azure environment from the separate Week 3 Azure networking/VM exercise.

FlavorForge Week 4:

```text
Resource Group: flavorforge-rg
Region: East US
ACR: flavorforgeacr2026ms
AKS: flavorforge-aks
```

Week 3 was a separate Azure lab.

Week 3 resources must not be presented as FlavorForge production infrastructure.

This distinction is important for reproducibility because a new user should not accidentally deploy FlavorForge using unrelated Week 3 resources.

---

# 9. ACR Reproducibility

Verify that the documentation explains:

* ACR creation.
* ACR authentication.
* Docker image tagging.
* Docker image push.
* Repository verification.

The expected registry is:

```text
flavorforgeacr2026ms.azurecr.io
```

The exact image repository and tag should be taken from the actual project configuration rather than guessed.

Check Kubernetes manifests for image references:

```bash
grep -R "image:" . \
  --include="*.yaml" \
  --include="*.yml"
```

Compare the image reference with the ACR configuration.

---

# 10. AKS Reproducibility

Review the AKS documentation:

```text
docs/week-4/BUILD-JOURNEY/05-azure/03-aks.md
```

Verify that it explains the AKS configuration required by the project.

Known FlavorForge configuration:

```text
AKS:
flavorforge-aks

Region:
East US

Node Count:
2

Node Size:
Standard_D2as_v7
```

The documentation should explain how Kubernetes access is configured.

For example:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

---

# 11. Kubernetes Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/06-kubernetes/
```

Verify that the repository contains the Kubernetes configuration required by the application.

Check:

```bash
find . \
  -type f \
  \( -name "*.yaml" -o -name "*.yml" \) \
  | sort
```

Review the relevant Kubernetes manifests.

Verify that the manifests define the required application resources.

Typical resources may include:

```text
Deployment
Service
ConfigMap
Secret references
```

Only document resources that actually exist in the project.

---

# 12. Kustomize Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/07-kustomize/
```

Verify that Kustomize configuration exists.

Find Kustomization files:

```bash
find . -type f -name "kustomization.yaml" -o -name "kustomization.yml"
```

Validate the relevant configuration:

```bash
kubectl kustomize <overlay-directory>
```

The command should generate Kubernetes manifests without errors.

The generated output should contain the resources required by the FlavorForge deployment.

---

# 13. Azure DevOps Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/08-azure-devops/
```

Verify that the documentation explains:

* Azure DevOps organization.
* Project creation.
* GitHub connection.
* Project settings.
* Agent pools.
* Service connections.
* Variable groups.
* Approvals/checks where applicable.
* Pipeline creation.

The pipeline YAML should be stored in the repository.

Find YAML pipeline files:

```bash
find . \
  -type f \
  \( -name "*.yml" -o -name "*.yaml" \) \
  | sort
```

Identify the actual Azure DevOps pipeline definition used by the project.

---

# 14. Pipeline Reproducibility

The pipeline should describe the automated workflow clearly enough for another user to understand the sequence.

Review the pipeline file.

Verify that the expected stages/tasks are represented in the actual YAML.

The documented workflow is broadly:

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

The exact implementation must always be taken from the repository's current pipeline YAML.

Do not add undocumented pipeline stages merely to make the documentation appear complete.

---

# 15. SonarCloud Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/09-sonarcloud/
```

Verify that the documentation explains:

* SonarCloud account/project setup.
* Project identification.
* Pipeline integration.
* Quality Gate.
* Verification.

Check the repository for SonarCloud configuration:

```bash
find . -type f | grep -i sonar
```

Review the pipeline for SonarCloud-related configuration.

Sensitive credentials or tokens must never be stored in documentation.

---

# 16. Trivy Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/10-trivy/
```

Verify that the documentation explains:

* Trivy installation.
* Filesystem scanning.
* Docker image scanning.
* Report generation.
* Verification.

The basic filesystem scan can be reproduced with:

```bash
trivy fs .
```

An image scan can be reproduced with:

```bash
trivy image <image-name>:<tag>
```

The exact image should come from the project configuration.

---

# 17. Argo CD Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/11-argocd/
```

Verify that the documentation covers:

* Argo CD installation.
* Git repository connection.
* Application creation.
* Synchronization.
* Self-healing.
* Verification.

The Argo CD Application should point to the intended Git repository and Kubernetes/Kustomize path.

The exact repository URL and path must be taken from the actual project configuration.

---

# 18. GitOps Reproducibility

A reproducible GitOps deployment should follow:

```text
Git Repository
      ↓
Kubernetes Configuration
      ↓
Argo CD Application
      ↓
AKS
      ↓
Application
```

The desired Kubernetes state should be stored in Git.

A user reproducing the project should not need to rely on undocumented manual changes made directly inside the AKS cluster.

---

# 19. DevSecOps Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/12-devsecops/
```

Verify that the documentation explains how security and quality checks are incorporated into the delivery process.

The documented flow should connect:

```text
Code
 ↓
Build
 ↓
Test
 ↓
SonarCloud
 ↓
Trivy
 ↓
Container
 ↓
Registry
 ↓
Deployment
```

This demonstrates that security is integrated into the delivery process rather than performed only after deployment.

---

# 20. Documentation Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/13-documentation/
```

Verify that the documentation explains:

* Documentation structure.
* Documentation generation.
* README automation where applicable.
* Documentation verification.

Check the complete BUILD-JOURNEY:

```bash
find docs/week-4/BUILD-JOURNEY \
  -maxdepth 2 \
  -type f \
  | sort
```

All referenced files should exist.

---

# 21. Troubleshooting Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/14-troubleshooting/
```

Verify that troubleshooting documentation exists for:

```text
GitHub
Docker
Azure
Kubernetes
Azure DevOps Pipeline
Argo CD
Common Recovery
```

These documents should help another user diagnose common failures without relying entirely on undocumented assistance.

---

# 22. Final Verification Reproducibility

Review:

```text
docs/week-4/BUILD-JOURNEY/15-final-verification/
```

Verify that the final verification documents exist:

```bash
find docs/week-4/BUILD-JOURNEY/15-final-verification \
  -maxdepth 1 \
  -type f \
  | sort
```

Expected:

```text
01-end-to-end-verification.md
02-production-verification.md
03-reproducibility-check.md
04-project-completion-checklist.md
```

---

# 23. Secrets and Credentials Review

Reproducibility must never require committing credentials to Git.

Search carefully for obvious hard-coded secrets:

```bash
git grep -n -i \
  -E "password=|passwd=|secret=|token=|api[_-]?key="
```

This command may produce legitimate configuration references as well as false positives.

Every result must be reviewed manually.

Do not print secret values into documentation.

Credentials should be provided through appropriate:

* Azure DevOps service connections.
* Variable groups.
* Secret variables.
* Kubernetes Secrets.
* Environment variables.
* Other secure secret-management mechanisms.

---

# 24. Environment Dependency Review

Identify commands that depend on the local environment.

Examples include:

```text
Home directory
Local file paths
Personal usernames
Local IP addresses
Subscription IDs
Tokens
Credentials
```

Project documentation should avoid hard-coding personal machine-specific paths where possible.

For example, prefer:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

or clearly explain where the repository should be located.

Avoid documentation that depends on another person's username or machine-specific directory.

---

# 25. External Dependency Review

Identify external services required by FlavorForge.

Potential dependencies include:

```text
GitHub
Azure
Azure DevOps
SonarCloud
Docker
Trivy
Argo CD
```

The documentation should explain which services require accounts, authentication, or configuration.

A reproducible project should clearly identify external dependencies rather than assuming that they are already available.

---

# 26. Configuration Consistency Check

Search for important FlavorForge resource names:

```bash
grep -R "flavorforge-rg" . \
  --exclude-dir=.git
```

Search for the ACR name:

```bash
grep -R "flavorforgeacr2026ms" . \
  --exclude-dir=.git
```

Search for the AKS name:

```bash
grep -R "flavorforge-aks" . \
  --exclude-dir=.git
```

Review the results for inconsistent names.

The following values should not accidentally be replaced with unrelated Week 3 resource names.

---

# 27. Image Tag Consistency Check

Search Kubernetes configuration for image references:

```bash
grep -R "image:" . \
  --include="*.yaml" \
  --include="*.yml"
```

Compare:

```text
Docker image
        ↓
ACR image
        ↓
Kubernetes image
        ↓
Argo CD desired state
```

The image repository and tag used for deployment must be understood and documented.

> **Important:** Do not change an image tag simply to make documentation consistent. First verify which tag is actually deployed and which tag is intentionally configured.

---

# 28. Documentation Link Check

Search documentation for local Markdown references:

```bash
grep -R "\](.*\.md" \
  docs/week-4/BUILD-JOURNEY \
  --include="*.md"
```

Verify that referenced documentation files actually exist.

Check image references:

```bash
grep -R "screenshots/" \
  docs/week-4/BUILD-JOURNEY \
  --include="*.md"
```

Verify that referenced screenshots exist.

Broken documentation references reduce reproducibility.

---

# 29. Clean Checkout Concept

A strong reproducibility test is to use a clean copy of the repository.

For example:

```bash
cd /tmp
git clone <repository-url> flavorforge-reproduction-test
cd flavorforge-reproduction-test
```

Then review the project from the clean checkout.

This helps identify dependencies on files that exist only in the original developer's working directory.

> **Note:** A clean checkout test should only be marked as completed if it was actually performed.

---

# 30. Fresh Build Concept

A stronger reproducibility test is to perform the application build from a clean checkout.

For example:

```bash
mvn clean package
```

Then verify:

```text
Build succeeds
Application artifact is generated
No undocumented local dependency is required
```

Do not mark this as successfully reproduced unless the build was actually executed.

---

# 31. Fresh Docker Build Concept

From a clean checkout:

```bash
docker build \
  -t <test-image>:<test-tag> \
  .
```

Verify:

```bash
docker images
```

Then optionally run:

```bash
docker run \
  --name <test-container> \
  -p <host-port>:<container-port> \
  <test-image>:<test-tag>
```

Verify application behavior.

Again, this section describes the reproducibility test procedure.

It should only be marked **Passed** when the test has actually been executed.

---

# 32. Kubernetes Reproduction Concept

A full infrastructure reproduction would require:

```text
Azure Subscription
       ↓
Resource Group
       ↓
ACR
       ↓
AKS
       ↓
Kubernetes Configuration
       ↓
Kustomize
       ↓
Argo CD
       ↓
Application
```

This should not be recreated unnecessarily simply for documentation verification.

The project should instead be reviewed to ensure that the required configuration and instructions exist.

---

# 33. Reproducibility Evidence

Useful evidence includes:

* Repository structure.
* Git commit history.
* Application build output.
* Docker build output.
* Azure resource verification.
* ACR image/tag verification.
* AKS node verification.
* Kubernetes resource verification.
* Pipeline execution.
* SonarCloud analysis.
* Trivy reports.
* Argo CD Application.
* Final documentation structure.

Evidence should represent the actual project state.

---

# 34. Reproducibility Matrix

| Area               | Documentation Present | Configuration Present | Independently Reproduced | Status |
| ------------------ | --------------------- | --------------------- | ------------------------ | ------ |
| Prerequisites      | ☐                     | ☐                     | ☐                        | ☐      |
| GitHub             | ☐                     | ☐                     | ☐                        | ☐      |
| Application        | ☐                     | ☐                     | ☐                        | ☐      |
| Docker             | ☐                     | ☐                     | ☐                        | ☐      |
| Azure              | ☐                     | ☐                     | ☐                        | ☐      |
| ACR                | ☐                     | ☐                     | ☐                        | ☐      |
| AKS                | ☐                     | ☐                     | ☐                        | ☐      |
| Kubernetes         | ☐                     | ☐                     | ☐                        | ☐      |
| Kustomize          | ☐                     | ☐                     | ☐                        | ☐      |
| Azure DevOps       | ☐                     | ☐                     | ☐                        | ☐      |
| SonarCloud         | ☐                     | ☐                     | ☐                        | ☐      |
| Trivy              | ☐                     | ☐                     | ☐                        | ☐      |
| Argo CD            | ☐                     | ☐                     | ☐                        | ☐      |
| DevSecOps          | ☐                     | ☐                     | ☐                        | ☐      |
| Troubleshooting    | ☐                     | ☐                     | ☐                        | ☐      |
| Final Verification | ☐                     | ☐                     | ☐                        | ☐      |

---

# 35. Reproducibility Classification

Use the following classification when completing the final review.

### Documented

The required instructions or explanation exist.

```text
Documented
```

### Configured

The required project configuration exists in the repository.

```text
Configured
```

### Verified

The current implementation was actually checked.

```text
Verified
```

### Reproduced

The setup was independently executed from the documented instructions or a clean checkout.

```text
Reproduced
```

These terms should not be treated as interchangeable.

For example:

```text
Documented ≠ Reproduced
Configured ≠ Verified
Verified ≠ Fresh Deployment
```

---

# 36. Reproducibility Acceptance Criteria

The project can be considered reproducibility-ready when:

1. Required prerequisites are documented.
2. Application build instructions exist.
3. Docker build instructions exist.
4. Azure resources are identified.
5. Kubernetes configuration exists.
6. Kustomize configuration exists.
7. Azure DevOps pipeline configuration exists.
8. SonarCloud integration is documented.
9. Trivy scanning is documented.
10. Argo CD configuration is documented.
11. Troubleshooting guidance exists.
12. Final verification procedures exist.
13. Documentation references point to existing files.
14. No required credentials are stored in Git.
15. Project-specific resource names are consistent.
16. Important image references are understood.
17. Evidence exists for the implemented environment.
18. Any steps that have not been freshly reproduced are clearly identified as such.

---

# 37. Final Reproducibility Review

The final review should answer four questions:

### 1. Can another user understand what was built?

```text
Yes / No
```

### 2. Can another user find the configuration required to build it?

```text
Yes / No
```

### 3. Can another user follow the documented steps to reproduce the implementation?

```text
Yes / No / Requires Additional Verification
```

### 4. Was the entire project actually reproduced from a clean environment?

```text
Yes / No / Not Tested
```

The fourth question must never be marked `Yes` unless the complete reproduction was actually performed.

---

# 38. Final Reproducibility Principle

The FlavorForge project should aim for:

```text
Clear Documentation
       +
Version-Controlled Configuration
       +
Repeatable Commands
       +
Traceable Evidence
       +
Secure Credentials
       ↓
Reproducible DevSecOps Project
```

The purpose of reproducibility is not to claim that the project can be rebuilt without effort.

The purpose is to ensure that the required knowledge, configuration, commands, and evidence are available so that another user can follow the same engineering process.

---

# 39. Reproducibility Conclusion

The FlavorForge BUILD-JOURNEY provides a structured path from prerequisites through application development, containerization, Azure infrastructure, Kubernetes, security, CI/CD, GitOps, troubleshooting, and final verification.

The final reproducibility assessment should be completed using actual repository contents and verification evidence.

Any item that has not been independently reproduced should remain clearly identified as:

```text
Not Reproduced
```

rather than being incorrectly reported as successful.

This distinction keeps the final project documentation accurate and trustworthy.
