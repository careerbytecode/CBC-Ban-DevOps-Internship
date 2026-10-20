# 02 — Docker Issues

## Overview

Docker is used to build, run, and package the FlavorForge frontend and backend applications as container images.

During the build and verification process, common issues can occur with Dockerfiles, build context, image creation, container startup, port mapping, and application connectivity.

This document records the common Docker issues encountered during the FlavorForge build journey and the corresponding recovery approach.

---

## 1. Docker Command Not Found

### Symptom

Running:

```bash
docker --version
```

returns an error indicating that Docker is not installed or the command cannot be found.

### Verification

```bash
docker --version
```

### Resolution

Verify that Docker is installed and available in the current environment.

For WSL-based development, also verify that Docker Desktop integration with the required WSL distribution is enabled.

After correcting the installation or integration, verify again:

```bash
docker --version
```

Expected result:

```text
Docker version <version>
```

---

## 2. Dockerfile Not Found

### Symptom

A Docker build fails because the Dockerfile cannot be located.

Example:

```text
failed to read dockerfile
```

### Verification

From the project root:

```bash
find . -name Dockerfile -print
```

Verify that the expected Dockerfiles exist.

For example:

```text
backend/Dockerfile
frontend/Dockerfile
```

### Resolution

Run the Docker build from the correct directory or explicitly specify the Dockerfile:

```bash
docker build -f backend/Dockerfile -t flavorforge-backend:latest .
```

and:

```bash
docker build -f frontend/Dockerfile -t flavorforge-frontend:latest .
```

Use the actual Dockerfile locations in the repository when executing the commands.

---

## 3. Docker Build Context Too Large

### Symptom

The Docker build sends a large amount of unnecessary data to the Docker daemon.

This can increase build time and unnecessarily expose files to the build context.

### Verification

Review the build output:

```bash
docker build ...
```

and check the size of the build context.

### Resolution

Use a `.dockerignore` file to exclude files that are not required during the image build.

Typical exclusions include:

```text
.git
node_modules
target
coverage
.env
*.log
```

The exact exclusions should match the requirements of the application.

### Verification

Rebuild the image and confirm that the build context has been reduced.

---

## 4. Docker Build Fails During Dependency Installation

### Symptom

The image build fails while installing application dependencies.

For example:

```text
npm install
```

or:

```text
mvn package
```

may fail because of dependency, network, or configuration issues.

### Verification

Review the Docker build output:

```bash
docker build ...
```

Identify the first failing command rather than focusing only on the final Docker error.

### Resolution

Verify:

- dependency files are present;
- package versions are valid;
- required build tools are available;
- network access is available when dependencies must be downloaded;
- the Dockerfile uses the correct working directory.

After correcting the issue, rebuild the image.

---

## 5. Docker Image Was Not Created

### Symptom

The Docker build appears to complete, but the expected image cannot be found.

### Verification

```bash
docker images
```

or:

```bash
docker image ls
```

Look for the expected FlavorForge images.

Example:

```text
flavorforge-backend
flavorforge-frontend
```

### Resolution

If the image is missing, rerun the appropriate Docker build command and verify the image name and tag.

Example:

```bash
docker build -t flavorforge-backend:latest .
```

Then:

```bash
docker images
```

---

## 6. Container Fails to Start

### Symptom

The image builds successfully, but the container exits immediately or enters a restarting state.

### Verification

List containers:

```bash
docker ps -a
```

Then inspect the container:

```bash
docker logs <container-name-or-id>
```

### Resolution

Use the container logs to identify the application startup error.

Common causes include:

- incorrect startup command;
- missing environment variables;
- incorrect application configuration;
- missing dependencies;
- incorrect working directory;
- application process terminating immediately.

Correct the underlying application or Docker configuration and recreate the container.

---

## 7. Port Mapping Problem

### Symptom

The container is running, but the application cannot be accessed from the host.

### Verification

```bash
docker ps
```

Check the `PORTS` column.

For example:

```text
0.0.0.0:3000->3000/tcp
```

### Resolution

Map the host port to the container port when starting the container.

Example:

```bash
docker run -p 3000:3000 flavorforge-backend:latest
```

For the frontend, use the port exposed by the application.

Then verify the application from the appropriate endpoint.

---

## 8. Container Cannot Reach Another Container

### Symptom

One FlavorForge container cannot communicate with another container.

For example, the frontend may be unable to reach the backend.

### Resolution

Place the containers on the same Docker network.

Create a network:

```bash
docker network create flavorforge-network
```

Run the containers using that network:

```bash
docker run --network flavorforge-network ...
```

Use the appropriate container/service name for communication rather than assuming that `localhost` refers to another container.

### Important

Inside a container:

```text
localhost
```

refers to that same container.

It does not automatically refer to another container or the host machine.

---

## 9. Image Tag Mismatch

### Symptom

Kubernetes, ACR, or another deployment stage refers to an image tag that does not exist locally or in the registry.

### Verification

```bash
docker images
```

Check the repository and tag.

Example:

```text
flavorforge-backend    1.0
flavorforge-frontend   1.0
```

### Resolution

Use a consistent image repository and tag across:

```text
Docker
    ↓
ACR
    ↓
Kubernetes manifests
    ↓
Deployment
```

If an image needs to be retagged:

```bash
docker tag flavorforge-backend:1.0 <registry>/flavorforge-backend:1.0
```

Then push the correctly tagged image to the registry.

---

## 10. Docker Image Vulnerabilities

### Symptom

The Docker image builds successfully, but Trivy reports HIGH or CRITICAL vulnerabilities.

A successful Docker build does **not** mean that the resulting image is vulnerability-free.

### Verification

Run the Trivy image scan:

```bash
trivy image flavorforge-backend:latest
```

or:

```bash
trivy image flavorforge-frontend:latest
```

### Resolution

Review the reported vulnerabilities and determine whether they originate from:

- application dependencies;
- operating-system packages;
- base-image packages.

Update vulnerable dependencies or use an updated base image where appropriate.

Then rebuild and rescan the image.

The objective is to demonstrate measurable vulnerability reduction rather than simply achieving a successful Docker build.

---

## 11. Cleaning Unused Docker Resources

During development, multiple containers and images may accumulate.

### Verification

```bash
docker ps -a
```

```bash
docker images
```

### Cleanup

Remove a stopped container:

```bash
docker rm <container-id>
```

Remove an unused image:

```bash
docker rmi <image-id>
```

Use cleanup commands carefully because removing an image or container can remove resources required for later verification.

---

## 12. Recommended Docker Troubleshooting Flow

When a Docker problem occurs, follow this sequence:

```text
Docker command
      ↓
Dockerfile
      ↓
Build context
      ↓
Dependencies
      ↓
Image creation
      ↓
Container startup
      ↓
Container logs
      ↓
Port mapping
      ↓
Application connectivity
      ↓
Trivy security scan
```

Useful commands:

```bash
docker --version
docker images
docker ps
docker ps -a
docker logs <container>
docker inspect <container>
docker network ls
docker network inspect <network>
```

---

## 13. Evidence

Docker troubleshooting and verification should be supported by the corresponding project screenshots.

The Docker evidence includes build, image, container, and application verification screenshots stored under the project's screenshot structure.

Where applicable, reference the actual screenshot path used by the repository rather than creating a duplicate screenshot.

---

## Final Takeaway

Docker troubleshooting should follow a simple principle:

> **Verify the layer where the failure actually occurs before changing the configuration.**

The recommended troubleshooting order is:

```text
Docker Installation
        ↓
Dockerfile
        ↓
Build
        ↓
Image
        ↓
Container
        ↓
Logs
        ↓
Ports
        ↓
Connectivity
        ↓
Security Scan
```

This approach keeps the troubleshooting process systematic and makes the Docker stage reproducible for another developer following the FlavorForge BUILD-JOURNEY.