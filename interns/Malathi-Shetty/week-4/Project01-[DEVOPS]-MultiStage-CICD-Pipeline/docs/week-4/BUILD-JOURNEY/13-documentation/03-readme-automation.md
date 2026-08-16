# 03 — README Automation

## Overview

FlavorForge includes a lightweight documentation automation workflow that automatically detects project components, generates a project status report, and updates the main `README.md`.

The automation is implemented using two Python scripts:

```text
scripts/
├── generate_project_report.py
└── update_readme.py
```

The two scripts work together:

```text
FlavorForge Repository
        ↓
generate_project_report.py
        ↓
PROJECT_STATUS.md
        ↓
update_readme.py
        ↓
README.md
```

This approach keeps the project status displayed in the README synchronized with the repository structure and configuration.

---

## 1. Purpose of README Automation

FlavorForge contains multiple application, container, cloud, Kubernetes, security, GitOps, monitoring, and documentation components.

Manually maintaining a project-status table in the README could result in outdated information.

The automation provides a repeatable way to:

* Detect project components
* Generate a project status report
* Store the generated report
* Insert the report into the README
* Avoid rewriting the README when no changes are detected

The automation therefore reduces repetitive documentation maintenance.

---

## 2. Automation Architecture

The README automation consists of two stages.

### Stage 1 — Generate Project Status

The first script is:

```text
scripts/generate_project_report.py
```

It scans the FlavorForge repository and checks whether expected project components are present.

The generated report is written to:

```text
docs/generated/PROJECT_STATUS.md
```

### Stage 2 — Update README

The second script is:

```text
scripts/update_readme.py
```

It reads:

```text
README.md
```

and:

```text
docs/generated/PROJECT_STATUS.md
```

It then replaces the automatically managed section of the README with the latest generated project status.

---

## 3. Project Status Generator

The `generate_project_report.py` script uses Python's `pathlib` module to inspect the repository.

It defines helper functions for checking files, directories, and repository content.

Examples include:

```python
def exists(path):
    return Path(path).exists()
```

and:

```python
def search_files(pattern):
    return any(ROOT.rglob(pattern))
```

The script also searches repository content using:

```python
def search_content(keyword):
```

This allows the generator to detect configuration and technology references even when they are not located in one specific file.

---

## 4. Components Detected

The project status generator checks several areas of the FlavorForge implementation.

### Application

```text
Frontend Application
Backend API
```

The generator checks for the expected application directories.

### Containerization

```text
Docker Containerization
Azure Container Registry (ACR)
```

Dockerfiles and ACR-related configuration are detected through repository files and content.

### CI/CD

```text
Azure DevOps Pipeline
```

The generator checks for:

```text
azure-pipelines.yml
```

### Kubernetes

The generator checks for:

```text
Kubernetes Deployment
Ingress
Secrets
Horizontal Pod Autoscaler (HPA)
```

The checks use Kubernetes directory existence and content such as:

```text
kind: Ingress
ingressClassName
kind: Secret
secretKeyRef
HorizontalPodAutoscaler
autoscaling/v2
```

### GitOps

The generator checks for:

```text
ArgoCD GitOps
```

It looks for Argo CD-related directories or content such as:

```text
argocd
Application
```

### DevSecOps

The generator checks for:

```text
SonarCloud Integration
Trivy Security Scan
```

It searches repository content for the relevant tool references.

### Monitoring

The generator checks for monitoring-related references including:

```text
Azure Monitor
Container Insights
monitoring
```

### Documentation

The generator checks for:

```text
docs
```

to determine whether project documentation is present.

---

## 5. Generated Project Status Report

The script creates a Markdown report with the title:

```text
# 📊 FlavorForge Automated Project Status
```

It also records the generation timestamp.

The report uses a simple status table:

```text
| Component | Status |
|-----------|--------|
| ...       | ...    |
```

Detected components are reported as:

```text
✅ Detected
```

Components that cannot be detected are reported as:

```text
❌ Not Found
```

The generated report is stored at:

```text
docs/generated/PROJECT_STATUS.md
```

---

## 6. Updating the README Automatically

The second script is:

```text
scripts/update_readme.py
```

It defines two markers:

```text
<!-- AUTO_STATUS_START -->
<!-- AUTO_STATUS_END -->
```

These markers identify the section of the README managed by the automation.

The script reads both files:

```python
readme = Path("README.md")
status_file = Path("docs/generated/PROJECT_STATUS.md")
```

It then loads their contents:

```python
readme_content = readme.read_text(encoding="utf-8")
status_content = status_file.read_text(encoding="utf-8")
```

The generated project-status report is inserted between the two README markers.

The resulting structure is:

```text
README.md

Project documentation
        ↓
<!-- AUTO_STATUS_START -->

Generated project status
        ↓
PROJECT_STATUS.md content

<!-- AUTO_STATUS_END -->

Remaining README content
```

This allows the rest of the README to remain manually maintained while the project-status section is automatically updated.

---

## 7. Automatic Update Protection

The README update script contains an important check.

It compares the newly generated README content with the existing README content:

```python
if updated != readme_content:
```

If the content has changed, the README is updated:

```text
README updated successfully
```

If there are no changes, the script reports:

```text
README already up to date
```

This prevents unnecessary writes to the README when the generated project status has not changed.

---

## 8. Complete Automation Flow

The complete workflow is:

```text
                FlavorForge Repository
                         ↓
             generate_project_report.py
                         ↓
              Repository Inspection
                         ↓
        ┌────────────────────────────────┐
        │ Application                    │
        │ Docker                         │
        │ ACR                            │
        │ Azure DevOps                   │
        │ Kubernetes                     │
        │ Ingress                        │
        │ Secrets                        │
        │ HPA                            │
        │ Argo CD                        │
        │ SonarCloud                     │
        │ Trivy                          │
        │ Monitoring                     │
        │ Documentation                  │
        └────────────────────────────────┘
                         ↓
          docs/generated/PROJECT_STATUS.md
                         ↓
                update_readme.py
                         ↓
              AUTO_STATUS section
                         ↓
                     README.md
```

This creates a simple automated documentation pipeline inside the repository.

---

## 9. Example Execution

The generator can be executed from the FlavorForge repository:

```bash
python3 scripts/generate_project_report.py
```

The script reports:

```text
Documentation generated successfully
```

The generated file is:

```text
docs/generated/PROJECT_STATUS.md
```

The README update can then be performed using:

```bash
python3 scripts/update_readme.py
```

If the generated status has changed:

```text
README updated successfully
```

If no changes are required:

```text
README already up to date
```

---

## 10. Generated Documentation Location

The automation keeps generated project status under:

```text
docs/generated/
```

The expected generated report is:

```text
docs/generated/PROJECT_STATUS.md
```

This separates automatically generated documentation from the manually maintained BUILD-JOURNEY documentation.

The structure is therefore:

```text
docs/
├── generated/
│   └── PROJECT_STATUS.md
│
└── week-4/
    └── BUILD-JOURNEY/
        ├── 01-prerequisites/
        ├── 02-github/
        ├── ...
        └── 14-final-verification/
```

---

## 11. What Is and Is Not Automatically Generated

The README automation does **not** generate the entire README from scratch.

Instead:

```text
README.md
    │
    ├── Manually maintained content
    │
    ├── AUTO_STATUS section
    │       ↓
    │   Automatically updated
    │
    └── Manually maintained content
```

Only the section between:

```text
<!-- AUTO_STATUS_START -->
```

and:

```text
<!-- AUTO_STATUS_END -->
```

is controlled by `update_readme.py`.

This provides a safe separation between generated and manually maintained content.

---

## 12. Verification

After running the automation, the generated report can be inspected using:

```bash
cat docs/generated/PROJECT_STATUS.md
```

The README can then be checked for the generated section:

```bash
grep -n "AUTO_STATUS" README.md
```

The documentation structure can also be reviewed using:

```bash
find docs/week-4/BUILD-JOURNEY -type f | sort
```

This confirms that the generated project-status mechanism and the detailed BUILD-JOURNEY documentation remain separate.

---

## 13. Why This Approach Is Useful

The automation provides several benefits.

### Consistency

Project status is generated using the same detection rules each time.

### Repeatability

The report can be regenerated whenever the repository changes.

### Reduced Manual Work

The project-status section does not need to be rewritten manually after every change.

### Safe README Updates

Only the marked automatic section is replaced.

### Change Detection

The README is only written when the generated content has changed.

### Evidence

The generated report provides a quick overview of which project components are detected in the repository.

---

## 14. Documentation Workflow

The overall documentation workflow is:

```text
Make Project Changes
        ↓
Run Project Report Generator
        ↓
Generate PROJECT_STATUS.md
        ↓
Update README
        ↓
Review Generated Status
        ↓
Verify Repository
        ↓
Commit Documentation Changes
```

This keeps the project status visible while allowing the detailed BUILD-JOURNEY documentation to remain structured and manually reviewed.

---

## Final Takeaway

FlavorForge implements actual README automation through two scripts:

```text
scripts/generate_project_report.py
scripts/update_readme.py
```

The first script detects project components and generates:

```text
docs/generated/PROJECT_STATUS.md
```

The second script inserts that generated status into the marked section of:

```text
README.md
```

The automation therefore follows:

```text
Repository
    ↓
Project Detection
    ↓
PROJECT_STATUS.md
    ↓
README AUTO_STATUS section
    ↓
Updated README
```

This provides a practical and lightweight way to keep the README's project-status information synchronized with the FlavorForge repository while keeping the detailed documentation under the manually reviewed `BUILD-JOURNEY` structure.
