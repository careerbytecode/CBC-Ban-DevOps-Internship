# Security Policy

## Overview

FlavorForge follows DevSecOps principles by integrating security practices throughout the software delivery lifecycle.

Security validation is performed during development, CI/CD execution, container packaging, deployment, and runtime operations.

---

# Supported Versions

This repository is maintained as a learning and demonstration project.

The latest main branch represents the current supported implementation.

| Version | Supported |
|---------|-----------|
| Main Branch | ✅ |
| Older commits | ❌ |

---

# Reporting a Vulnerability

If you discover a security issue within this project:

1. Do not expose sensitive details publicly.
2. Report the issue privately through repository contact channels.
3. Provide details about:
   - Vulnerability description
   - Steps to reproduce
   - Potential impact
   - Suggested remediation (if available)

---

# Security Practices Implemented

FlavorForge demonstrates the following security practices:

## Source Code Security

- SonarCloud static code analysis
- Code quality validation
- Security hotspot detection

## Container Security

- Docker multi-stage builds
- Minimal production images
- Trivy vulnerability scanning
- Container image validation before deployment

## Kubernetes Security

- Kubernetes Secrets for sensitive configuration
- ConfigMaps for non-sensitive configuration
- Namespace-based resource isolation
- Declarative infrastructure management

## Cloud Security

- Azure Managed Identity integration
- Azure Container Registry private image storage
- Azure Kubernetes Service security controls

## CI/CD Security

- Automated security scanning
- Controlled deployment workflow
- Pipeline-based validation before release

## GitOps Security

- ArgoCD declarative deployment model
- Git repository as single source of truth
- Kubernetes desired-state synchronization

---

# Secret Management

Sensitive information should never be committed directly into Git.

Example:

```yaml
JWT_SECRET: "replace-with-your-secret"
DATABASE_PASSWORD: "replace-with-your-db-password"