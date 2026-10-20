# ADR-003: Use Kustomize for Environment Management

## Status
Accepted

## Context
The project requires separate configurations for development, QA, and production environments while avoiding duplicate Kubernetes manifests.

## Decision
Use Kustomize overlays to manage environment-specific configurations.

## Rationale
- Avoid duplicate YAML
- Separate dev, QA, and production environments
- Native Kubernetes support
- Easier maintenance

## Alternatives Considered
- Separate YAML files
- Helm templates

## Consequences
### Positive
- Improved maintainability
- Consistent deployments
- Cleaner configuration management

### Negative
- Requires understanding of Kustomize overlays