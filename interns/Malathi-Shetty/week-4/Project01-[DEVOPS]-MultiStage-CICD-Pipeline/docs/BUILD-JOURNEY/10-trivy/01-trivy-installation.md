# Trivy Security Scanning

## 1. Purpose

Trivy is used in the FlavorForge DevSecOps pipeline to identify security vulnerabilities in:

* Application dependencies and source files
* Docker container images

The goal is to introduce security scanning into the CI/CD workflow before container images are pushed to Azure Container Registry.

---

## 2. Trivy Security Scanning Flow

The Trivy implementation follows this flow:

```text
Source Code
    |
    v
Filesystem Scan
    |
    v
Docker Image Build
    |
    v
Container Image Scan
    |
    v
Security Reports
    |
    v
Publish Pipeline Artifacts
```

---

## 3. Trivy Installation

Trivy is installed on the Azure DevOps build agent using the official Aqua Security Debian repository.

The installation process:

1. Update the package index.
2. Install required repository tools.
3. Download and configure the Trivy repository signing key.
4. Add the Trivy Debian repository.
5. Update the package index.
6. Install Trivy.

The pipeline uses the following installation approach:

```bash
sudo apt-get update

sudo apt-get install -y wget gnupg lsb-release apt-transport-https

curl \
  --proto '=https' \
  --tlsv1.2 \
  --location \
  --fail \
  --silent \
  --show-error \
  https://aquasecurity.github.io/trivy-repo/deb/public.key \
| gpg --dearmor \
| sudo tee /usr/share/keyrings/trivy.gpg >/dev/null

echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" \
| sudo tee /etc/apt/sources.list.d/trivy.list

sudo apt-get update
sudo apt-get install -y trivy
```

---

## 4. Security Scans Implemented

FlavorForge uses two Trivy scanning approaches.

### 4.1 Filesystem Scan

The filesystem scan examines the checked-out repository for vulnerabilities and security-related issues.

The pipeline executes:

```bash
trivy fs \
  --format table \
  . | tee reports/trivy/filesystem-report.txt
```

A JSON report is also generated:

```bash
trivy fs \
  --format json \
  -o reports/trivy/filesystem-report.json \
  .
```

---

### 4.2 Docker Image Scan

The pipeline also scans the Docker images created for the FlavorForge application.

The images scanned are:

```text
flavorforge-backend:latest
flavorforge-frontend:latest
```

The pipeline first builds the images:

```bash
docker build \
  -t flavorforge-backend:latest \
  ./backend

docker build \
  -t flavorforge-frontend:latest \
  ./frontend
```

The images are then scanned using Trivy.

Backend image:

```bash
trivy image \
  --format table \
  flavorforge-backend:latest \
  | tee reports/trivy/backend-image.txt
```

Frontend image:

```bash
trivy image \
  --format table \
  flavorforge-frontend:latest \
  | tee reports/trivy/frontend-image.txt
```

JSON reports are generated for both images.

---

## 5. Report Artifacts

Trivy reports are stored under:

```text
reports/trivy/
```

The pipeline publishes the reports as an Azure DevOps pipeline artifact.

Filesystem reports:

```text
filesystem-report.txt
filesystem-report.json
```

Docker image reports:

```text
backend-image.txt
backend-image.json
frontend-image.txt
frontend-image.json
```

---

## 6. Verification Status

Trivy verification will be completed after the following checks are performed:

* [ ] Trivy installation verified
* [ ] Filesystem scan completed
* [ ] Filesystem JSON report generated
* [ ] Backend Docker image scan completed
* [ ] Frontend Docker image scan completed
* [ ] Backend JSON report generated
* [ ] Frontend JSON report generated
* [ ] Reports published as pipeline artifacts
* [ ] Azure DevOps Trivy stage completed successfully

These checks will be verified during the following Trivy documentation steps.
