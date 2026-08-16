# 01 — Documentation Structure

## Overview

The FlavorForge project uses a structured documentation system to make the complete build, deployment, security, and GitOps journey easy to follow.

The documentation is organized around two goals:

1. **A beginner should be able to follow the project from start to finish.**
2. **Detailed evidence should remain available for verification and reference.**

The documentation therefore separates the main learning journey from supporting technical evidence.

---

## 1. Documentation Philosophy

The primary goal is not to create a large collection of independent Markdown files that a beginner must read in an arbitrary order.

Instead, the documentation should provide a clear path:

```text
START HERE
    ↓
Build Journey
    ↓
Follow the numbered stages
    ↓
Run the commands
    ↓
Verify the result
    ↓
Review the evidence
    ↓
Complete FlavorForge
```

The documentation should answer three questions at every stage:

```text
What are we doing?
        ↓
How do we do it?
        ↓
How do we verify it?
```

---

## 2. Master Build Journey

The primary entry point is:

```text
docs/week-4/BUILD-JOURNEY/README.md
```

This file acts as the navigation layer for the complete Week 4 project.

The intended learner experience is:

```text
BUILD-JOURNEY/README.md
          ↓
       Step 01
          ↓
       Step 02
          ↓
       Step 03
          ↓
         ...
          ↓
       Step 14
          ↓
     Project Complete
```

The master README should provide links to the detailed documentation rather than requiring the reader to search through the repository manually.

---

## 3. Numbered Documentation Stages

The BUILD-JOURNEY is organized into numbered stages.

The current planned structure is:

```text
BUILD-JOURNEY/
│
├── README.md
│
├── 01-prerequisites/
├── 02-github/
├── 03-application/
├── 04-docker/
├── 05-azure/
├── 06-kubernetes/
├── 07-kustomize/
├── 08-azure-devops/
├── 09-sonarcloud/
├── 10-trivy/
├── 11-argocd/
├── 12-devsecops/
├── 13-documentation/
├── 14-troubleshooting/
└── 15-final-verification/
```

Each numbered directory represents a logical stage of the FlavorForge journey.

The exact files within each stage provide the detailed instructions and evidence for that stage.

---

## 4. Core Build Stages

The main infrastructure and application journey follows this progression:

```text
01 Prerequisites
      ↓
02 GitHub
      ↓
03 Application
      ↓
04 Docker
      ↓
05 Azure
      ↓
06 Kubernetes
      ↓
07 Kustomize
      ↓
08 Azure DevOps
      ↓
09 SonarCloud
      ↓
10 Trivy
      ↓
11 Argo CD
      ↓
12 DevSecOps
```

This order represents the progression from development environment setup to a complete cloud-native DevSecOps deployment.

---

## 5. Supporting Documentation

The project also contains supporting documentation for areas that are not part of the primary build sequence.

These include:

```text
13 Documentation
14 Troubleshooting
15 Final Verification
```

These sections provide supporting information after the main implementation stages.

### Documentation

Explains how the project documentation itself is organized and maintained.

### Troubleshooting

Records common problems, errors, recovery procedures, and lessons learned.

### Final Verification

Provides the final repository, infrastructure, deployment, and reproducibility checks.

---

## 6. Stage-Level Documentation Pattern

Each BUILD-JOURNEY stage should follow a consistent structure wherever practical.

A typical document should contain:

```text
# Stage / Topic

## Overview

What are we trying to achieve?

## Prerequisites

What is required before starting?

## Steps

What commands or actions are required?

## Verification

How do we know it worked?

## Evidence

Which screenshots or generated reports prove the result?

## Result

What was successfully completed?

## Next Step

Where should the reader go next?
```

This consistency makes the documentation easier to navigate.

---

## 7. Commands and Verification

Commands should be documented close to the step where they are used.

For example:

```bash
kubectl get pods -n flavorforge
```

should appear alongside an explanation of what the command verifies.

The expected result should then be described separately.

For example:

```text
Command
   ↓
kubectl get pods
   ↓
Pods displayed
   ↓
STATUS = Running
   ↓
Verification successful
```

This prevents the reader from having to search elsewhere to understand why a command is being executed.

---

## 8. Evidence and Screenshots

Screenshots are treated as supporting evidence rather than decoration.

Important implementation stages should have corresponding evidence.

Examples include:

```text
GitHub
Docker
Azure
Kubernetes
Azure DevOps
SonarCloud
Trivy
Argo CD
```

A screenshot should answer a specific verification question.

For example:

```text
Argo CD Application
        ↓
SYNC STATUS = Synced
        ↓
HEALTH STATUS = Healthy
```

The documentation should explain what the screenshot proves.

---

## 9. Screenshot Organization

Screenshots are maintained separately from the Markdown documentation.

The general structure follows:

```text
screenshots/
├── github/
├── application/
├── docker/
├── azure/
├── kubernetes/
├── kustomize/
├── azure-devops/
├── sonarcloud/
├── trivy/
└── argocd/
```

This separation keeps the documentation readable while maintaining a dedicated evidence repository.

Screenshot names should be descriptive enough to identify the evidence without opening the image.

For example:

```text
argocd-pods-running.png
argocd-services.png
argocd-application-synced-healthy.png
```

---

## 10. Security Evidence

Security-related evidence is stored separately from screenshots when the output is generated by security tools.

For Trivy, the reports are stored under:

```text
reports/trivy/
```

The evidence includes:

```text
filesystem-report.json
filesystem-report.txt
backend-image-report.json
backend-image-report.txt
backend-high-critical.txt
frontend-image-report.json
frontend-image-report.txt
frontend-high-critical.txt
```

This provides both:

```text
Human-readable evidence
        +
Machine-readable evidence
```

The Markdown documentation summarizes the findings without replacing the original reports.

---

## 11. Documentation vs Evidence

The project deliberately separates explanation from raw evidence.

### Documentation

Explains:

```text
What
Why
How
Result
```

### Evidence

Provides:

```text
Screenshot
Command output
JSON report
TXT report
Pipeline result
Cloud resource state
```

The relationship is:

```text
Documentation
      ↓
Explains the implementation
      ↓
Evidence
      ↓
Proves the implementation
```

This makes the project easier to audit and demonstrate.

---

## 12. Avoiding Duplicate Information

The same technical information should not be unnecessarily repeated across multiple BUILD-JOURNEY stages.

For example, Kubernetes documentation should focus on Kubernetes resources and runtime verification.

Argo CD documentation should focus on:

```text
Argo CD
   ↓
Application
   ↓
GitOps
   ↓
Sync
   ↓
Health
```

Similarly, Trivy documentation should focus on vulnerability scanning and security evidence rather than duplicating the complete Azure DevOps pipeline explanation.

When another stage is relevant, a reference or link should be used instead of copying the entire explanation.

---

## 13. Keeping Documentation Accurate

Documentation must represent the actual implementation.

Important project values should therefore be checked against the real environment before documentation is finalized.

For Week 4, important Azure values include:

```text
Resource Group:
flavorforge-rg

ACR:
flavorforgeacr2026ms

ACR Login Server:
flavorforgeacr2026ms.azurecr.io

AKS:
flavorforge-aks

AKS Region:
East US

AKS Node Count:
2

AKS Node Size:
Standard_D2as_v7
```

These values should not be replaced with values from the earlier Week 3 Azure VM exercise.

---

## 14. Documentation Verification

Documentation itself requires verification.

The final review should check:

```text
Filenames
    ↓
Numbering
    ↓
Paths
    ↓
Commands
    ↓
Screenshots
    ↓
Resource names
    ↓
Image tags
    ↓
Links
    ↓
README navigation
```

The objective is to ensure that a reader can follow the documented journey without encountering outdated or contradictory information.

---

## 15. Documentation Quality Checklist

Before considering the documentation complete, verify:

| Check                | Expected Result                       |
| -------------------- | ------------------------------------- |
| Numbering            | Sequential and understandable         |
| Filenames            | Match the documented paths            |
| Commands             | Match the actual implementation       |
| Screenshots          | Match the documented commands/results |
| Azure resource names | Consistent                            |
| ACR login server     | `flavorforgeacr2026ms.azurecr.io`     |
| AKS name             | `flavorforge-aks`                     |
| Image references     | Match the actual documented state     |
| Trivy reports        | Present and referenced                |
| Argo CD evidence     | Present and referenced                |
| Internal links       | Working                               |
| README navigation    | Clear                                 |
| Duplicate content    | Minimized                             |
| Contradictions       | Removed                               |

---

## 16. Beginner-Friendly Navigation

The documentation should remain approachable for someone who did not build the project.

A beginner should be able to start with:

```text
BUILD-JOURNEY/README.md
```

and understand:

```text
Where am I?
     ↓
What am I doing?
     ↓
What command should I run?
     ↓
What result should I expect?
     ↓
What screenshot proves it?
     ↓
What is the next step?
```

The documentation should not require the reader to understand the entire architecture before beginning.

Each stage should introduce the concepts needed for that stage.

---

## 17. Reference Documentation

The detailed Markdown files act as technical reference material.

The overall relationship is:

```text
                    BUILD-JOURNEY
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       Beginner Path          Detailed Reference
              │                     │
              ▼                     ▼
          README.md             Stage Files
              │                     │
              └──────────┬──────────┘
                         ▼
                    Evidence
```

This allows the project to serve both purposes:

* **Learning resource**
* **Technical project evidence**

---

## 18. Documentation as Part of DevSecOps

Documentation is not treated as an afterthought.

The documentation records the implementation journey and provides traceability between:

```text
Code
 ↓
Pipeline
 ↓
Security
 ↓
Infrastructure
 ↓
Deployment
 ↓
Verification
```

A well-structured documentation system makes it easier to reproduce the environment and demonstrate the project during a technical presentation or review.

---

## Final Takeaway

The FlavorForge documentation structure is designed around one simple principle:

> **Start with one clear entry point, follow the numbered journey, and use detailed files and evidence as supporting references.**

The `BUILD-JOURNEY/README.md` provides the main navigation path, while the numbered stage directories contain the detailed implementation, verification, and evidence.

This structure allows the FlavorForge project to remain comprehensive without forcing a beginner to read every document before understanding where to start.

**➡️ Next:** `13-documentation/02-documentation-generator.md`
