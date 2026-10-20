# 04 — Trivy Security Reports

## Overview

After completing the Trivy filesystem scan and Docker image scans, the generated security reports were collected under the `reports/trivy/` directory.

These reports provide security evidence for the FlavorForge application and its Docker images.

> **Important:** A successful Trivy scan means that the security scan completed successfully. It does **not** mean that the scanned image contains zero vulnerabilities.

The purpose of this stage is to:

* Generate machine-readable vulnerability reports.
* Generate human-readable security reports.
* Identify HIGH and CRITICAL vulnerabilities.
* Preserve security evidence for the project.
* Establish a baseline for future remediation and rescanning.

---

# 1. Trivy Report Structure

The generated reports are organized as follows:

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

The reports are available in two formats:

| Format   | Purpose                                                            |
| -------- | ------------------------------------------------------------------ |
| **TXT**  | Human-readable security evidence and documentation                 |
| **JSON** | Machine-readable output for automation, CI/CD and further analysis |

The detailed JSON reports are retained as the primary machine-readable evidence, while the TXT reports provide convenient human-readable summaries.

---

# 2. Docker Image Security Summary

The following HIGH and CRITICAL scans were performed against the locally built FlavorForge Docker images.

| Container Image                  |      HIGH | CRITICAL | Status             |
| -------------------------------- | --------: | -------: | ------------------ |
| 🐳 `flavorforge-backend:latest`  | 🔴 **12** | 🔴 **1** | 🔴 Action Required |
| 🎨 `flavorforge-frontend:latest` | 🟠 **11** | 🟢 **0** | 🟠 Action Required |

### Security Summary

**Backend**

```text
HIGH       : 12
CRITICAL   : 1
TOTAL      : 13
```

**Frontend**

```text
HIGH       : 11
CRITICAL   : 0
TOTAL      : 11
```

The backend contains one CRITICAL and twelve HIGH Node.js dependency findings.

The frontend contains eleven HIGH findings in Alpine-based operating-system packages.

---

# 3. Backend Image Scan

The backend image was scanned using:

```bash
trivy image flavorforge-backend:latest
```

Trivy detected:

```text
Image       : flavorforge-backend:latest
Base OS     : Alpine Linux 3.24.1
```

## 3.1 Backend Operating-System Findings

The Alpine operating-system layer reported:

| Severity | Count |
| -------- | ----: |
| UNKNOWN  |  🟢 0 |
| LOW      |  🟢 0 |
| MEDIUM   |  🟢 0 |
| HIGH     |  🟢 0 |
| CRITICAL |  🟢 0 |

### Result

The backend Alpine operating-system layer contains:

> 🟢 **0 HIGH and 0 CRITICAL vulnerabilities**

This indicates that the HIGH/CRITICAL findings identified in the backend scan are coming from the Node.js dependency layer rather than the Alpine OS packages.

---

# 4. Backend Node.js Dependency Findings

Trivy detected vulnerabilities in the Node.js dependency layer.

| Severity            |     Count |
| ------------------- | --------: |
| MEDIUM              |      🟡 8 |
| HIGH                |     🔴 12 |
| CRITICAL            |      🔴 1 |
| **HIGH + CRITICAL** | **🔴 13** |

The HIGH and CRITICAL findings identified by the scan include the following packages.

| Package           | Vulnerability       | Severity        | Installed     | Fixed Version              |
| ----------------- | ------------------- | --------------- | ------------- | -------------------------- |
| `brace-expansion` | CVE-2026-14257      | 🔴 HIGH         | 1.1.16        | 1.1.17+                    |
| `brace-expansion` | CVE-2026-69152      | 🔴 HIGH         | 1.1.16        | 1.1.18+                    |
| `brace-expansion` | CVE-2026-13149      | 🔴 HIGH         | 2.0.2         | 2.1.2+                     |
| `brace-expansion` | CVE-2026-14257      | 🔴 HIGH         | 2.1.3 / 5.0.8 | Updated versions available |
| `ip-address`      | CVE-2026-69192      | 🔴 HIGH         | 10.1.0        | 10.3.1                     |
| `js-yaml`         | GHSA-5p4m-2wfm-xmqj | 🔴 HIGH         | 3.15.0        | 3.15.1 / 4.3.1             |
| `picomatch`       | CVE-2026-33671      | 🔴 HIGH         | 4.0.3         | 4.0.4                      |
| `sigstore`        | CVE-2026-48815      | 🔴 HIGH         | 3.1.0         | 4.1.1                      |
| `tar`             | CVE-2026-59873      | 🔴 **CRITICAL** | 7.5.11        | **7.5.19**                 |
| `tar`             | CVE-2026-59874      | 🔴 HIGH         | 7.5.11        | 7.5.18                     |

> Some vulnerabilities appear against multiple installed dependency versions. The table summarizes the HIGH/CRITICAL findings visible in the Trivy report.

---

# 5. Highest-Priority Backend Finding

The most important backend finding is the CRITICAL vulnerability in the `tar` package.

| Property          | Value                                   |
| ----------------- | --------------------------------------- |
| Package           | `tar`                                   |
| Vulnerability     | `CVE-2026-59873`                        |
| Severity          | 🔴 **CRITICAL**                         |
| Installed Version | `7.5.11`                                |
| Fixed Version     | `7.5.19`                                |
| Description       | Denial of Service via crafted gzip bomb |

This finding should be treated as the **highest remediation priority**.

The recommended approach is to update the affected dependency, rebuild the Docker image, and rerun the Trivy scan.

---

# 6. Frontend Image Scan

The frontend image was scanned using:

```bash
trivy image flavorforge-frontend:latest
```

Trivy detected:

```text
Image       : flavorforge-frontend:latest
Base OS     : Alpine Linux 3.23.4
```

The scan reported:

```text
HIGH       : 11
CRITICAL   : 0
TOTAL      : 11
```

Unlike the backend image, the frontend scan did not detect a CRITICAL vulnerability.

However, the eleven HIGH findings still require remediation.

---

# 7. Frontend HIGH / CRITICAL Findings

The following HIGH findings were identified in the frontend image:

| Package        | Vulnerability  | Severity | Installed | Fixed Version   |
| -------------- | -------------- | -------- | --------- | --------------- |
| `c-ares`       | CVE-2026-33630 | 🔴 HIGH  | 1.34.6-r0 | 1.34.8-r0       |
| `curl`         | CVE-2026-5773  | 🔴 HIGH  | 8.17.0-r1 | 8.20.0-r0       |
| `curl`         | CVE-2026-6276  | 🔴 HIGH  | 8.17.0-r1 | Updated version |
| `libcrypto3`   | CVE-2026-45447 | 🔴 HIGH  | 3.5.6-r0  | 3.5.7-r0        |
| `libcurl`      | CVE-2026-5773  | 🔴 HIGH  | 8.17.0-r1 | 8.20.0-r0       |
| `libcurl`      | CVE-2026-6276  | 🔴 HIGH  | 8.17.0-r1 | Updated version |
| `libexpat`     | CVE-2026-45186 | 🔴 HIGH  | 2.7.5-r0  | 2.8.1-r0        |
| `libexpat`     | CVE-2026-56408 | 🔴 HIGH  | 2.7.5-r0  | 2.8.2-r0        |
| `libssl3`      | CVE-2026-45447 | 🔴 HIGH  | 3.5.6-r0  | 3.5.7-r0        |
| `libxml2`      | CVE-2026-6732  | 🔴 HIGH  | 2.13.9-r0 | 2.13.9-r1       |
| `nghttp2-libs` | CVE-2026-27135 | 🔴 HIGH  | 1.68.0-r0 | 1.68.1          |

These findings originate from packages included in the Alpine-based frontend image.

---

# 8. Filesystem Scan Evidence

The Trivy filesystem scan was completed before the Docker image scans.

Its generated evidence is stored as:

```text
reports/trivy/filesystem-report.json
reports/trivy/filesystem-report.txt
```

The filesystem scan is referenced here rather than reproduced in detail because the Docker image scan has a different purpose and is documented separately in:

```text
03-docker-image-scan.md
```

### Scan Scope

| Scan                   | Security Scope                                      |
| ---------------------- | --------------------------------------------------- |
| 📁 Filesystem Scan     | Project source and dependency files                 |
| 🐳 Backend Image Scan  | Packages contained inside the backend Docker image  |
| 🎨 Frontend Image Scan | Packages contained inside the frontend Docker image |

Keeping these reports distinct makes the security evidence easier to understand and audit.

---

# 9. Machine-Readable JSON Reports

JSON reports were generated for detailed security evidence:

```text
reports/trivy/
├── filesystem-report.json
├── backend-image-report.json
└── frontend-image-report.json
```

These reports provide structured vulnerability information that can be used for:

* CI/CD automation
* Security dashboards
* Vulnerability tracking
* Automated reporting
* Compliance evidence
* Future comparison between scans

The JSON reports should be retained as the detailed source for the summarized findings presented in this document.

---

# 10. Human-Readable Security Reports

Human-readable TXT reports were also generated:

```text
reports/trivy/
├── filesystem-report.txt
├── backend-image-report.txt
├── backend-high-critical.txt
└── frontend-high-critical.txt
```

The dedicated HIGH/CRITICAL reports make it easier to focus on vulnerabilities that require immediate attention.

For example:

```bash
cat reports/trivy/backend-high-critical.txt
```

and:

```bash
cat reports/trivy/frontend-high-critical.txt
```

These files can be used as supporting evidence during project review or demonstration.

---

# 11. Security Assessment

The current Trivy security baseline is summarized below.

| Security Area                | Status             | Result                              |
| ---------------------------- | ------------------ | ----------------------------------- |
| Trivy scan execution         | 🟢 PASS            | Scans completed successfully        |
| Backend Alpine OS            | 🟢 PASS            | 0 HIGH / 0 CRITICAL                 |
| Backend Node.js dependencies | 🔴 ACTION REQUIRED | 12 HIGH / 1 CRITICAL                |
| Frontend Alpine packages     | 🔴 ACTION REQUIRED | 11 HIGH / 0 CRITICAL                |
| JSON reports                 | 🟢 GENERATED       | Machine-readable evidence available |
| TXT reports                  | 🟢 GENERATED       | Human-readable evidence available   |

## Overall Result

> 🟠 **Trivy security scanning has been successfully implemented and the vulnerabilities have been identified and documented. However, the current Docker images are not yet vulnerability-free and require remediation.**

This is an important DevSecOps outcome.

The security stage is not intended to hide vulnerabilities. Instead, it provides visibility into vulnerabilities before the images are promoted through the deployment pipeline.

---

# 12. Remediation Plan

## 12.1 Backend

The first priority is the CRITICAL `tar` vulnerability.

```text
Package        : tar
Installed      : 7.5.11
Fixed          : 7.5.19
Severity       : CRITICAL
Vulnerability : CVE-2026-59873
```

Additional vulnerable dependencies should also be reviewed:

```text
brace-expansion
ip-address
js-yaml
picomatch
sigstore
tar
```

After updating the dependencies:

1. Update the affected packages.
2. Rebuild the backend Docker image.
3. Run the Trivy scan again.
4. Compare the new findings with the current baseline.
5. Regenerate the security reports.

---

## 12.2 Frontend

The frontend image requires updates to the affected Alpine packages.

The major affected packages include:

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

After updating the image dependencies, rebuild the frontend image and rerun:

```bash
trivy image --severity HIGH,CRITICAL flavorforge-frontend:latest
```

The objective is to demonstrate a measurable reduction in HIGH and CRITICAL vulnerabilities.

---

# 13. Evidence Generated

The complete Trivy evidence set is:

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

These artifacts provide both machine-readable and human-readable evidence of the security scanning stage.

---

# 14. DevSecOps Outcome

The Trivy scanning stage provides the following security controls for FlavorForge:

```text
Source / Dependencies
        │
        ▼
Trivy Filesystem Scan
        │
        ▼
Docker Image Build
        │
        ├── Backend Image
        │       │
        │       ▼
        │   Trivy Image Scan
        │
        └── Frontend Image
                │
                ▼
            Trivy Image Scan
                │
                ▼
       Vulnerability Reports
                │
                ▼
       Remediation & Rescan
```

This establishes a repeatable security scanning process in which vulnerabilities can be detected, documented, remediated, and verified through subsequent scans.

---

# Final Takeaway

Trivy successfully scanned the FlavorForge project and its Docker images.

The backend Alpine operating-system layer currently has **0 HIGH and 0 CRITICAL vulnerabilities**, while the backend Node.js dependency layer contains **12 HIGH and 1 CRITICAL vulnerability**.

The frontend image contains **11 HIGH vulnerabilities and 0 CRITICAL vulnerabilities**, primarily involving Alpine operating-system packages.

The most urgent finding is the backend `tar` package vulnerability:

```text
CVE-2026-59873
Severity       : CRITICAL
Installed      : 7.5.11
Fixed          : 7.5.19
```

The next security iteration should focus on:

**Dependency updates → Docker image rebuild → Trivy rescan → Vulnerability comparison**

This creates measurable security improvement and demonstrates the continuous security principle of the FlavorForge DevSecOps implementation.
