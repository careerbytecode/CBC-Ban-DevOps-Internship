# 03 — Docker Image Security Scan

## 3.1 Objective

The objective of this step is to scan the Docker images built for the FlavorForge application using **Trivy** and identify known vulnerabilities in the container operating system packages and application dependencies.

Two application images were scanned:

* `flavorforge-backend:latest`
* `flavorforge-frontend:latest`

The scan was performed locally before the images are pushed to Azure Container Registry (ACR).

---

## 3.2 Why Docker Image Scanning?

A successful Docker build does not necessarily mean that the resulting image is secure.

A container image may contain:

* Vulnerable operating-system packages
* Vulnerable Node.js packages
* Outdated libraries
* Known CVEs
* Security issues inherited from the base image

Trivy allows us to inspect the final Docker image and identify these vulnerabilities before the image is deployed to AKS.

The Azure DevOps pipeline also contains a dedicated **Docker Image Security Scan** job separate from the filesystem scan. The pipeline rebuilds the backend and frontend images and then executes `trivy image` against both images.

---

## 3.3 Docker Images Scanned

| Image                         | Base OS detected    | Language-specific scan |
| ----------------------------- | ------------------- | ---------------------- |
| `flavorforge-backend:latest`  | Alpine Linux 3.24.1 | Node.js                |
| `flavorforge-frontend:latest` | Alpine Linux 3.23.4 | None detected          |

The backend image contains Node.js dependencies that Trivy was able to analyze.

The frontend image scan primarily identified vulnerabilities in Alpine operating-system packages.

---

## 3.4 Backend Image Scan

The backend image was scanned using:

```bash
trivy image \
  --format table \
  flavorforge-backend:latest \
  | tee reports/trivy/backend-image-report.txt
```

The scan completed successfully.

### Backend — Overall Result

| Severity    |  Count |
| ----------- | -----: |
| 🟢 UNKNOWN  |      0 |
| 🟢 LOW      |      0 |
| 🟡 MEDIUM   |      8 |
| 🔴 HIGH     |     12 |
| 🔴 CRITICAL |      1 |
| **Total**   | **21** |

The Alpine operating-system layer itself reported:

> **0 vulnerabilities**

However, the Node.js dependency scan reported:

> **21 vulnerabilities: 8 MEDIUM, 12 HIGH, 1 CRITICAL**

---

## 3.5 Backend High and Critical Findings

A focused HIGH/CRITICAL scan was also performed:

```bash
trivy image \
  --severity HIGH,CRITICAL \
  --format table \
  flavorforge-backend:latest \
  | tee reports/trivy/backend-high-critical.txt
```

### Backend Security Summary

| Package           | Severity    |                      Installed |                     Fixed Version | Issue                               |
| ----------------- | ----------- | -----------------------------: | --------------------------------: | ----------------------------------- |
| `brace-expansion` | 🔴 HIGH     | 1.1.16 / 2.0.2 / 2.1.3 / 5.0.8 | Multiple fixed versions available | Denial of Service                   |
| `ip-address`      | 🔴 HIGH     |                         10.1.0 |                            10.3.1 | SSRF / parsing issue                |
| `js-yaml`         | 🔴 HIGH     |                         3.15.0 |                    3.15.1 / 4.3.1 | Excessive CPU consumption           |
| `picomatch`       | 🔴 HIGH     |                          4.0.3 |                             4.0.4 | Regular-expression DoS              |
| `sigstore`        | 🔴 HIGH     |                          3.1.0 |                             4.1.1 | Unauthorized certificate acceptance |
| `tar`             | 🔴 CRITICAL |                         7.5.11 |                            7.5.19 | DoS via crafted gzip bomb           |
| `tar`             | 🔴 HIGH     |                         7.5.11 |                            7.5.18 | Malformed archive handling          |

> **Important:** The scan completed successfully, but the backend image currently contains unresolved HIGH and CRITICAL vulnerabilities in Node.js dependencies.

---

## 3.6 Backend JSON Report

A machine-readable JSON report was generated:

```bash
trivy image \
  --format json \
  --output reports/trivy/backend-image-report.json \
  flavorforge-backend:latest
```

The JSON report provides structured vulnerability information that can be used for:

* Further analysis
* CI/CD processing
* Security reporting
* Evidence collection
* Future remediation comparison

The generated file is:

```text
reports/trivy/backend-image-report.json
```

The human-readable report is:

```text
reports/trivy/backend-image-report.txt
```

The focused HIGH/CRITICAL report is:

```text
reports/trivy/backend-high-critical.txt
```

---

## 3.7 Frontend Image Scan

The frontend image was scanned using:

```bash
trivy image \
  --format json \
  --output reports/trivy/frontend-image-report.json \
  flavorforge-frontend:latest
```

A table report was also generated:

```bash
trivy image \
  --format table \
  flavorforge-frontend:latest \
  | tee reports/trivy/frontend-image-report.txt
```

The scan detected Alpine Linux 3.23.4.

### Frontend — Overall Result

| Severity            |                                  Count |
| ------------------- | -------------------------------------: |
| 🟢 UNKNOWN          |                                      0 |
| 🟢 LOW              |                                      0 |
| 🟡 MEDIUM           | Not reported in the HIGH/CRITICAL scan |
| 🔴 HIGH             |                                 **11** |
| 🔴 CRITICAL         |                                  **0** |
| **HIGH + CRITICAL** |                                 **11** |

The frontend image therefore has **11 HIGH vulnerabilities and 0 CRITICAL vulnerabilities** in the HIGH/CRITICAL scan.

---

## 3.8 Frontend High and Critical Findings

The focused scan was executed using:

```bash
trivy image \
  --severity HIGH,CRITICAL \
  --format table \
  flavorforge-frontend:latest \
  | tee reports/trivy/frontend-high-critical.txt
```

### Frontend Security Summary

| Package        | Severity | Installed Version |       Fixed Version | Issue                                |
| -------------- | -------- | ----------------: | ------------------: | ------------------------------------ |
| `c-ares`       | 🔴 HIGH  |         1.34.6-r0 |           1.34.8-r0 | Use-after-free / double-free         |
| `curl`         | 🔴 HIGH  |         8.17.0-r1 |           8.20.0-r0 | Incorrect SMB connection reuse       |
| `curl`         | 🔴 HIGH  |         8.17.0-r1 |           8.20.0-r0 | Information disclosure               |
| `libcrypto3`   | 🔴 HIGH  |          3.5.6-r0 |            3.5.7-r0 | OpenSSL use-after-free               |
| `libcurl`      | 🔴 HIGH  |         8.17.0-r1 |           8.20.0-r0 | Incorrect SMB connection reuse       |
| `libcurl`      | 🔴 HIGH  |         8.17.0-r1 |           8.20.0-r0 | Information disclosure               |
| `libexpat`     | 🔴 HIGH  |          2.7.5-r0 | 2.8.1-r0 / 2.8.2-r0 | Denial of Service / integer overflow |
| `libssl3`      | 🔴 HIGH  |          3.5.6-r0 |            3.5.7-r0 | OpenSSL use-after-free               |
| `libxml2`      | 🔴 HIGH  |         2.13.9-r0 |           2.13.9-r1 | Denial of Service                    |
| `nghttp2-libs` | 🔴 HIGH  |         1.68.0-r0 |              1.68.1 | HTTP/2 denial of service             |

---

## 3.9 Frontend JSON Report

The machine-readable frontend report was generated using:

```bash
trivy image \
  --format json \
  --output reports/trivy/frontend-image-report.json \
  flavorforge-frontend:latest
```

Generated files:

```text
reports/trivy/frontend-image-report.json
reports/trivy/frontend-image-report.txt
reports/trivy/frontend-high-critical.txt
```

---

## 3.10 Combined Docker Image Security Summary

The following table provides a high-level view of the Docker image security results.

| Docker Image                     | Base Image / OS |   HIGH | CRITICAL | Status                         |
| -------------------------------- | --------------- | -----: | -------: | ------------------------------ |
| 🐳 `flavorforge-backend:latest`  | Alpine 3.24.1   | **12** |    **1** | 🔴 Remediation required        |
| 🐳 `flavorforge-frontend:latest` | Alpine 3.23.4   | **11** |    **0** | 🟠 Remediation required        |
| **Total**                        |                 | **23** |    **1** | **Security findings detected** |

### Key Observation

The backend image has the more serious finding because it contains **1 CRITICAL vulnerability** in the `tar` Node.js package.

The frontend image contains **11 HIGH vulnerabilities**, primarily associated with Alpine operating-system packages such as `curl`, OpenSSL, `libexpat`, `libxml2`, and `nghttp2`.

---

## 3.11 Important Interpretation

A Trivy scan returning vulnerabilities does **not** mean that the scan failed.

The Trivy security scan itself completed successfully and generated the required reports.

The result means:

```text
Trivy Scan
    ↓
Docker image inspected
    ↓
Vulnerabilities detected
    ↓
Reports generated successfully
    ↓
Remediation required
```

Therefore, these results should be documented as **security findings**, rather than treating the Trivy execution itself as unsuccessful.

---

## 3.12 Report Files

The following evidence was generated during the scan:

```text
reports/trivy/
├── backend-image-report.json
├── backend-image-report.txt
├── backend-high-critical.txt
├── frontend-image-report.json
├── frontend-image-report.txt
└── frontend-high-critical.txt
```

These files provide both machine-readable and human-readable evidence.

### Report Types

| Report                | Purpose                               |
| --------------------- | ------------------------------------- |
| `.txt`                | Human-readable Trivy table            |
| `.json`               | Machine-readable vulnerability report |
| `*-high-critical.txt` | Focused HIGH/CRITICAL evidence        |

---

## 3.13 Docker Image Scan vs Filesystem Scan

The Docker image scan should remain separate from the filesystem scan.

### Filesystem Scan

```text
Repository source
       ↓
   trivy fs
       ↓
Source/dependency vulnerabilities
```

### Docker Image Scan

```text
Dockerfile
    ↓
Docker build
    ↓
Container image
    ↓
trivy image
    ↓
OS + image dependencies
```

The Azure DevOps pipeline follows this same separation: the filesystem scan is implemented as its own Trivy job, while the Docker Image Security Scan rebuilds the backend and frontend images and scans them independently.

---

## 3.14 Verification

The following commands were successfully executed:

```bash
trivy image flavorforge-backend:latest
```

```bash
trivy image flavorforge-frontend:latest
```

```bash
trivy image --severity HIGH,CRITICAL flavorforge-backend:latest
```

```bash
trivy image --severity HIGH,CRITICAL flavorforge-frontend:latest
```

JSON reports were successfully generated for both images.

The report directory was verified with:

```bash
ls -lh reports/trivy/
```

The resulting evidence included:

```text
backend-image-report.json
backend-image-report.txt
backend-high-critical.txt
frontend-image-report.json
frontend-image-report.txt
frontend-high-critical.txt
```

---

## 3.15 Result

### 🛡️ Trivy Docker Image Security Scan — Completed

| Check                      | Result      |
| -------------------------- | ----------- |
| Backend image scanned      | ✅ Completed |
| Frontend image scanned     | ✅ Completed |
| Backend JSON report        | ✅ Generated |
| Frontend JSON report       | ✅ Generated |
| HIGH/CRITICAL reports      | ✅ Generated |
| Backend HIGH findings      | 🔴 12       |
| Backend CRITICAL findings  | 🔴 1        |
| Frontend HIGH findings     | 🔴 11       |
| Frontend CRITICAL findings | 🟢 0        |
| Security remediation       | ⚠️ Required |

**Conclusion:** The Docker image security scanning stage was completed successfully. Trivy identified vulnerabilities in both FlavorForge images, with the backend containing **12 HIGH and 1 CRITICAL** finding and the frontend containing **11 HIGH and 0 CRITICAL** findings. These findings are recorded as security evidence and should be addressed through dependency and base-image updates before considering the images fully hardened.
