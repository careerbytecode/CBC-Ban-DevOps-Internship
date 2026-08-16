# 02 — Security in Pipeline

## Overview

Security is integrated directly into the FlavorForge delivery pipeline instead of being treated as a separate activity after deployment.

The pipeline combines **source-code quality analysis, vulnerability scanning, container security, and deployment controls** to identify security and quality issues before the application reaches the target Kubernetes environment.

The security flow is:

```text
Source Code
    ↓
Build
    ↓
Test
    ↓
SonarCloud Analysis
    ↓
Quality Gate
    ↓
Docker Image Build
    ↓
Trivy Image Scan
    ↓
Review Security Findings
    ↓
Azure Container Registry
    ↓
AKS Deployment
```

---

## 1. Why Security Is Integrated into the Pipeline

A traditional delivery process may build and deploy an application first and perform security checks later.

FlavorForge follows a different approach:

```text
Code
 ↓
Validate
 ↓
Analyze
 ↓
Scan
 ↓
Package
 ↓
Deploy
```

This allows security and quality issues to be detected earlier in the delivery lifecycle.

The objective is not simply to make the pipeline pass.

The objective is to provide visibility into:

* Source-code quality
* Security-related code issues
* Dependency vulnerabilities
* Container-image vulnerabilities
* Deployment readiness

---

## 2. Security Controls Used

The FlavorForge pipeline uses multiple security and quality controls.

| Control                     | Purpose                                  | Stage        |
| --------------------------- | ---------------------------------------- | ------------ |
| 🧪 Automated Tests          | Validate application behavior            | Test         |
| 🔎 SonarCloud               | Analyze source-code quality and security | Code Quality |
| 🛡️ Trivy                   | Scan dependencies and container images   | Security     |
| 🐳 Docker                   | Package application into containers      | Docker Build |
| 📦 Azure Container Registry | Store container images                   | Push         |
| ☸️ AKS                      | Run application workloads                | Deployment   |
| 🔄 Argo CD                  | Manage GitOps deployment state           | GitOps       |

This creates multiple validation points across the delivery process.

---

## 3. SonarCloud Security and Quality Analysis

SonarCloud is integrated into the pipeline to analyze the FlavorForge source code.

The analysis provides visibility into code-quality and security-related issues.

The workflow is:

```text
Source Code
     ↓
SonarCloud Analysis
     ↓
Quality Gate
     ↓
PASS / FAIL
```

The Quality Gate provides a decision point in the pipeline.

A successful Quality Gate indicates that the analyzed code satisfied the configured quality conditions.

The SonarCloud stage therefore acts as a source-code validation layer before the container image is promoted further through the pipeline.

---

## 4. Trivy Filesystem and Dependency Scanning

Trivy was used to scan the project filesystem and dependencies.

The generated evidence is stored under:

```text
reports/trivy/
```

The filesystem scan produces machine-readable and human-readable reports:

```text
filesystem-report.json
filesystem-report.txt
```

These reports help identify vulnerabilities present in application dependencies and files before considering the container image itself.

The distinction is:

```text
Filesystem Scan
      ↓
Application / Dependency Vulnerabilities

Image Scan
      ↓
Container / OS / Dependency Vulnerabilities
```

Both perspectives are useful because vulnerabilities can exist in application dependencies as well as in the operating-system packages included in a container image.

---

## 5. Docker Image Security Scanning

After the Docker images are built, Trivy is used again to inspect the container images.

The FlavorForge images include:

```text
flavorforge-backend:latest
flavorforge-frontend:latest
```

The image scanning flow is:

```text
Docker Build
     ↓
Backend Image
Frontend Image
     ↓
Trivy Image Scan
     ↓
HIGH / CRITICAL Review
```

The generated reports include:

```text
backend-image-report.json
backend-image-report.txt
backend-high-critical.txt

frontend-image-report.json
frontend-high-critical.txt
```

These reports provide detailed evidence of the vulnerabilities detected in the container images.

---

## 6. Understanding Scan Success vs Security Success

An important distinction in the FlavorForge security process is:

> **A successful Trivy scan does not mean that the scanned image contains zero vulnerabilities.**

A successful scan means that:

```text
Trivy executed successfully
        ↓
Target was scanned
        ↓
Findings were generated
```

The findings must then be reviewed based on their severity.

For example:

```text
UNKNOWN
LOW
MEDIUM
HIGH
CRITICAL
```

Therefore, the pipeline distinguishes between:

```text
Scan Execution
       ≠
Zero Vulnerabilities
```

This provides a more accurate representation of the security state.

---

## 7. Backend Security Findings

The backend image scan identified vulnerabilities in Node.js dependencies.

The documented findings included:

| Severity | Count |
| -------- | ----: |
| UNKNOWN  |     0 |
| LOW      |     0 |
| MEDIUM   |     8 |
| HIGH     |    12 |
| CRITICAL |     1 |

The most significant documented finding was:

```text
Package       : tar
Vulnerability : CVE-2026-59873
Severity      : CRITICAL
Installed     : 7.5.11
Fixed         : 7.5.19
```

The backend therefore requires dependency remediation even though the Alpine operating-system layer showed no HIGH or CRITICAL findings in the documented scan.

This demonstrates why both application dependencies and operating-system packages need to be considered during container security scanning.

---

## 8. Frontend Security Findings

The frontend image scan identified HIGH-severity vulnerabilities in Alpine-based operating-system packages.

The documented result was:

```text
HIGH       : 11
CRITICAL   : 0
TOTAL      : 11
```

The affected packages included:

```text
c-ares
curl
libcrypto3
libcurl
libexpat
libssl3
libxml2
nghttp2-libs
```

These findings demonstrate that even when an application itself may not introduce a vulnerability, the base image and its operating-system packages can introduce security findings into the final container.

---

## 9. Severity-Based Security Review

The security review prioritizes findings according to severity.

A simplified priority model is:

```text
CRITICAL
   ↓
Highest remediation priority

HIGH
   ↓
Immediate review / remediation

MEDIUM
   ↓
Planned remediation

LOW
   ↓
Lower-priority review

UNKNOWN
   ↓
Further investigation if applicable
```

This allows security findings to be prioritized rather than treating every vulnerability as having the same impact.

---

## 10. Security Evidence

The security implementation is supported by generated reports.

The Trivy evidence directory contains:

```text
reports/
└── trivy/
    ├── filesystem-report.json
    ├── filesystem-report.txt
    ├── backend-image-report.json
    ├── backend-image-report.txt
    ├── backend-high-critical.txt
    ├── frontend-image-report.json
    └── frontend-high-critical.txt
```

### JSON Reports

JSON files provide structured security information that can be consumed by:

* CI/CD automation
* Security-processing scripts
* Dashboards
* Reporting tools
* Compliance evidence

### TXT Reports

TXT reports provide human-readable output for:

* Manual review
* Documentation
* Troubleshooting
* Demonstration
* Security evidence

### HIGH/CRITICAL Reports

The dedicated HIGH/CRITICAL reports make it easier to focus on the findings requiring the highest remediation priority.

---

## 11. Security Before Container Promotion

The intended security flow is:

```text
Application Source
       ↓
SonarCloud
       ↓
Quality Validation
       ↓
Docker Build
       ↓
Trivy Image Scan
       ↓
Security Findings Review
       ↓
Azure Container Registry
```

This provides a security checkpoint before the container image is used by the Azure deployment environment.

The purpose of this approach is to make security findings visible before they become part of the deployed application environment.

---

## 12. Security and Deployment

Once the container images are available in Azure Container Registry, they can be consumed by the AKS environment.

The broader delivery flow becomes:

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
Docker
   ↓
ACR
   ↓
AKS
   ↓
Argo CD
```

Argo CD provides the GitOps control layer after the application reaches the Kubernetes environment.

The security scanning stage therefore forms part of a larger DevSecOps lifecycle rather than operating independently.

---

## 13. Layered Security Model

FlavorForge demonstrates security at multiple layers:

```text
┌───────────────────────────────┐
│        Source Code            │
│         SonarCloud            │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│     Dependencies / Filesystem │
│            Trivy              │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│        Docker Image           │
│            Trivy              │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│      Container Registry       │
│             ACR               │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│       Kubernetes Runtime      │
│             AKS               │
└───────────────────────────────┘
```

Each layer addresses a different part of the software delivery lifecycle.

---

## 14. Remediation and Rescanning

Security scanning is not a one-time activity.

When vulnerabilities are identified, the expected remediation cycle is:

```text
Scan
 ↓
Identify Finding
 ↓
Review Severity
 ↓
Update Dependency / Base Package
 ↓
Rebuild Image
 ↓
Rescan
 ↓
Compare Results
```

For the documented backend findings, the CRITICAL `tar` vulnerability should receive the highest priority.

For the frontend image, the affected Alpine packages should be updated through the image build process.

The objective is to demonstrate measurable reduction in HIGH and CRITICAL findings after remediation.

---

## 15. DevSecOps Security Gate Concept

The security process can be represented as a series of checkpoints:

```text
                 ┌───────────────┐
                 │    Build      │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │     Test      │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │  SonarCloud   │
                 │ Quality Gate  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Docker Build  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │     Trivy     │
                 │  Image Scan   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Security      │
                 │ Review        │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │     ACR       │
                 └───────────────┘
```

The important DevSecOps principle demonstrated here is that **security validation is integrated into the delivery workflow**.

---

## 16. Current Security Status

The documented security state is:

| Security Area            | Status             | Result                      |
| ------------------------ | ------------------ | --------------------------- |
| SonarCloud analysis      | 🟢 Verified        | Quality analysis integrated |
| Trivy filesystem scan    | 🟢 Verified        | Reports generated           |
| Backend image scan       | 🟢 Verified        | Scan completed              |
| Backend vulnerabilities  | 🔴 Action Required | 12 HIGH / 1 CRITICAL        |
| Frontend image scan      | 🟢 Verified        | Scan completed              |
| Frontend vulnerabilities | 🟠 Action Required | 11 HIGH / 0 CRITICAL        |
| JSON security evidence   | 🟢 Generated       | Machine-readable reports    |
| TXT security evidence    | 🟢 Generated       | Human-readable reports      |

The **scan implementation is successful**, while the vulnerability findings themselves remain remediation items.

This distinction is important when presenting the project's security results.

---

## 17. Security Outcome

FlavorForge demonstrates a layered DevSecOps security approach:

```text
Source Code
    ↓
SonarCloud
    ↓
Dependencies
    ↓
Trivy
    ↓
Docker Images
    ↓
Trivy
    ↓
ACR
    ↓
AKS
    ↓
Argo CD
```

The project therefore does not treat security as a final checklist item.

Instead, security is incorporated into the software delivery lifecycle through:

* Automated code-quality analysis
* Filesystem and dependency scanning
* Container-image vulnerability scanning
* Severity-based finding review
* Security evidence generation
* Remediation and rescanning

This provides a practical foundation for integrating security into a CI/CD pipeline.

**➡️ Next:** `12-devsecops/03-sonarcloud-and-trivy.md`
