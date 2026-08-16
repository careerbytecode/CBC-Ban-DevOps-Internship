# 03 — SonarCloud and Trivy

## Overview

FlavorForge uses **SonarCloud** and **Trivy** as complementary security and quality controls within the DevSecOps pipeline.

They address different layers of the application:

```text
Source Code
     ↓
SonarCloud
     ↓
Code Quality & Security Analysis
     ↓
Docker Image
     ↓
Trivy
     ↓
Dependency & Container Vulnerability Scanning
```

Together, these tools provide visibility before the application is promoted to the container registry and deployed to AKS.

---

## 1. SonarCloud

SonarCloud is used to analyze the FlavorForge source code for code-quality and security-related issues.

The SonarCloud stage is integrated into the Azure DevOps pipeline after the application has been built and tested.

The flow is:

```text
Build
  ↓
Test
  ↓
SonarCloud Analysis
  ↓
Quality Gate
```

The Quality Gate provides a decision point before the pipeline continues toward containerization and deployment.

---

## 2. SonarCloud Pipeline Integration

The FlavorForge pipeline includes a dedicated code-quality stage.

The overall sequence is:

```text
Build
   ↓
Test
   ↓
Security
   ↓
CodeQuality
   ↓
DockerBuild
   ↓
TrivyScan
   ↓
Push
   ↓
Deploy
```

The SonarCloud analysis therefore occurs before the Docker image is pushed to Azure Container Registry.

This helps ensure that source-code quality is evaluated before the application progresses further through the delivery pipeline.

---

## 3. SonarCloud Quality Gate

The SonarCloud Quality Gate is used as a quality checkpoint.

Conceptually:

```text
                 SonarCloud
                     ↓
              Source Analysis
                     ↓
              Quality Gate
                ↙         ↘
             PASS          FAIL
               ↓             ↓
          Continue       Investigate
```

A passing Quality Gate indicates that the configured quality conditions were satisfied for the analyzed project.

The FlavorForge project documentation records the SonarCloud Quality Gate as successfully passing.

---

## 4. Trivy

Trivy is used to identify vulnerabilities in the FlavorForge project and container images.

The security workflow includes:

```text
Filesystem / Dependencies
          ↓
        Trivy
          ↓
Docker Images
          ↓
        Trivy
```

This provides two complementary views of application security.

### Filesystem Scan

The filesystem scan examines the project files and dependencies.

### Image Scan

The image scan examines the packages and dependencies contained within the built container image.

---

## 5. Trivy Evidence

The generated Trivy reports are stored under:

```text
reports/trivy/
```

The documented evidence includes:

```text
reports/trivy/
├── filesystem-report.json
├── filesystem-report.txt
├── backend-image-report.json
├── backend-image-report.txt
├── backend-high-critical.txt
├── frontend-image-report.json
└── frontend-high-critical.txt
```

The reports are available in both machine-readable and human-readable formats.

| Format            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| JSON              | Structured security evidence and automation |
| TXT               | Human-readable scan results                 |
| HIGH/CRITICAL TXT | Focused review of high-priority findings    |

---

## 6. Backend Image Scan

The backend image was scanned with Trivy:

```bash
trivy image flavorforge-backend:latest
```

The documented image was based on:

```text
flavorforge-backend:latest
Alpine Linux 3.24.1
```

The documented vulnerability results were:

| Severity | Count |
| -------- | ----: |
| UNKNOWN  |  🟢 0 |
| LOW      |  🟢 0 |
| MEDIUM   |  🟡 8 |
| HIGH     | 🔴 12 |
| CRITICAL |  🔴 1 |

The Alpine operating-system layer itself had:

| Severity | Count |
| -------- | ----: |
| HIGH     |  🟢 0 |
| CRITICAL |  🟢 0 |

The HIGH and CRITICAL findings were associated with Node.js dependencies.

---

## 7. Backend Critical Finding

The highest-severity backend finding documented in the Trivy report was:

| Package | Vulnerability  | Severity    | Installed |  Fixed |
| ------- | -------------- | ----------- | --------: | -----: |
| `tar`   | CVE-2026-59873 | 🔴 CRITICAL |    7.5.11 | 7.5.19 |

This finding represents the highest remediation priority in the documented backend scan.

Other documented vulnerable packages included:

```text
brace-expansion
ip-address
js-yaml
picomatch
sigstore
tar
```

The appropriate remediation process is:

```text
Update dependency
       ↓
Rebuild backend image
       ↓
Run Trivy again
       ↓
Compare findings
```

---

## 8. Frontend Image Scan

The frontend image was scanned using:

```bash
trivy image flavorforge-frontend:latest
```

The documented image was based on:

```text
flavorforge-frontend:latest
Alpine Linux 3.23.4
```

The documented result was:

| Severity | Count |
| -------- | ----: |
| HIGH     | 🔴 11 |
| CRITICAL |  🟢 0 |
| TOTAL    | 🔴 11 |

The documented affected packages included:

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

These findings were associated with packages in the Alpine-based frontend image.

---

## 9. SonarCloud vs Trivy

SonarCloud and Trivy should not be treated as interchangeable tools.

They operate at different layers.

| Tool          | Primary Focus                      | Scan Target                                | Output                    |
| ------------- | ---------------------------------- | ------------------------------------------ | ------------------------- |
| 🔎 SonarCloud | Code quality and security analysis | Source code                                | Quality/Security findings |
| 🛡️ Trivy     | Vulnerability detection            | Filesystem, dependencies, container images | Vulnerability reports     |

The relationship can be represented as:

```text
                 FlavorForge Source
                        │
              ┌─────────┴─────────┐
              ↓                   ↓
         SonarCloud            Trivy
              ↓                   ↓
       Code Analysis       Dependency / Filesystem
              │                   │
              │                   ↓
              │              Docker Image
              │                   ↓
              │                 Trivy
              │                   ↓
              └──────────┬────────┘
                         ↓
                  Security Evidence
```

Using both tools gives the pipeline broader coverage than relying on either tool alone.

---

## 10. Security Findings vs Scan Status

A critical distinction in the FlavorForge documentation is that:

> **A completed security scan does not mean that zero vulnerabilities were found.**

For example:

```text
Trivy Scan
    ↓
Completed Successfully
    ↓
Findings Detected
```

This means the scanning mechanism itself is working correctly.

The vulnerability counts must then be reviewed separately.

Therefore:

```text
Scan Status
     ≠
Vulnerability Status
```

This distinction is important when presenting the project as a DevSecOps implementation.

---

## 11. Combined Security Flow

The complete SonarCloud + Trivy flow is:

```text
                     Git Repository
                           ↓
                         Build
                           ↓
                         Test
                           ↓
                 ┌─────────┴─────────┐
                 ↓                   ↓
             SonarCloud           Trivy
                 ↓              Filesystem
            Quality Gate             ↓
                 │              Dependencies
                 │                   │
                 └─────────┬─────────┘
                           ↓
                      Docker Build
                           ↓
                       Trivy Image
                           ↓
                    Security Findings
                           ↓
                         ACR
                           ↓
                          AKS
                           ↓
                        Argo CD
```

This demonstrates how source-code quality and container security checks fit into the overall delivery process.

---

## 12. Evidence and Documentation

The security stage is supported by generated reports rather than relying only on terminal output.

### SonarCloud Evidence

The SonarCloud project and Quality Gate provide evidence of source-code analysis and quality validation.

### Trivy Evidence

The following files provide detailed vulnerability evidence:

```text
filesystem-report.json
filesystem-report.txt

backend-image-report.json
backend-image-report.txt
backend-high-critical.txt

frontend-image-report.json
frontend-high-critical.txt
```

The detailed reports should be retained as the underlying evidence for the summarized findings presented in the BUILD-JOURNEY documentation.

---

## 13. Remediation Cycle

Security analysis is an iterative process.

The recommended cycle is:

```text
Analyze
   ↓
Identify
   ↓
Prioritize
   ↓
Remediate
   ↓
Rebuild
   ↓
Rescan
   ↓
Compare
```

For the current documented results, the backend `tar` CRITICAL vulnerability should be treated as the highest priority.

The frontend HIGH findings should also be reviewed through updates to the affected Alpine packages and subsequent image rebuilds.

---

## 14. Current Combined Status

| Area                       | Status             | Result                        |
| -------------------------- | ------------------ | ----------------------------- |
| SonarCloud integration     | 🟢 Verified        | Analysis integrated           |
| SonarCloud Quality Gate    | 🟢 Passed          | Quality validation successful |
| Trivy filesystem scan      | 🟢 Verified        | Reports generated             |
| Backend image scan         | 🟢 Verified        | Scan completed                |
| Backend HIGH findings      | 🔴 Action Required | 12                            |
| Backend CRITICAL findings  | 🔴 Action Required | 1                             |
| Frontend image scan        | 🟢 Verified        | Scan completed                |
| Frontend HIGH findings     | 🟠 Action Required | 11                            |
| Frontend CRITICAL findings | 🟢 None documented | 0                             |
| Security reports           | 🟢 Generated       | JSON + TXT evidence           |

---

## 15. DevSecOps Interpretation

The combination of SonarCloud and Trivy demonstrates that security is being considered at multiple stages of the FlavorForge delivery lifecycle.

```text
Source Code
    ↓
SonarCloud
    ↓
Quality Validation
    ↓
Dependencies
    ↓
Trivy
    ↓
Container Image
    ↓
Trivy
    ↓
Registry
    ↓
Kubernetes
```

This layered approach helps identify different classes of issues:

* Source-code quality and security issues
* Dependency vulnerabilities
* Operating-system package vulnerabilities
* Container-image vulnerabilities

The project therefore demonstrates the principle of **shifting security checks earlier into the software delivery lifecycle**.

---

## Final Takeaway

SonarCloud and Trivy serve complementary roles in the FlavorForge DevSecOps pipeline.

**SonarCloud** validates source-code quality and security characteristics through analysis and a Quality Gate.

**Trivy** provides filesystem, dependency, and container-image vulnerability scanning with detailed JSON and TXT evidence.

The current documented scans completed successfully, while the reported vulnerabilities remain remediation items.

The next step is to bring these controls together with the complete pipeline and GitOps deployment flow in the final DevSecOps verification.

**➡️ Next:** `11-devsecops/04-final-devsecops-verification.md`
