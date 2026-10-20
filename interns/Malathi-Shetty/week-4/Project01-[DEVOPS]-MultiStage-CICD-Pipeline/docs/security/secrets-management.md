# Secret Management

FlavorForge does not store real secrets inside Git.

The repository contains only placeholder values for demonstration.

## Current Implementation

Kubernetes Secrets are used for sensitive configuration.

Example:

- JWT secrets
- Database passwords


## Production Recommendation

For enterprise deployments:

Application secrets should be managed using:

- Azure Key Vault
- External Secrets Operator
- Kubernetes Secrets Store CSI Driver

The CI/CD pipeline should inject secrets securely during deployment.