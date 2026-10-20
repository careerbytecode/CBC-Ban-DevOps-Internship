# 07 — Kustomize

## 1. Objective

After the FlavorForge Kubernetes manifests were organized into a reusable base and environment-specific overlays, **Kustomize** was used to manage Kubernetes configuration for Dev, QA, and Production environments.

The goal was to avoid maintaining completely separate copies of the same Kubernetes manifests.

The Kustomize structure used in the project is:

```text
kubernetes/
├── base/
│   ├── autoscaling/
│   ├── backend/
│   ├── config/
│   ├── frontend/
│   ├── ingress/
│   ├── kustomization.yaml
│   └── namespace.yaml
└── overlays/
    ├── dev/
    ├── qa/
    └── prod/
```

The configuration model is:

```text
                    Common Kubernetes Resources
                              │
                              ▼
                            Base
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
            Dev              QA               Prod
             │                │                │
       Dev-specific      QA-specific      Prod-specific
         changes           changes           changes
```

The **base** contains common Kubernetes resources.

The **overlays** reuse the base and apply environment-specific configuration such as namespaces, name suffixes, and replica patches.

---

# 2. Starting Point

The Kustomize configuration is located inside the existing FlavorForge Kubernetes directory:

```text
kubernetes/
```

The repository contains a common Kubernetes base and three environment overlays.

The structure was verified using:

```bash
find kubernetes -maxdepth 3 -type f -print | sort
```

The verified structure includes:

```text
kubernetes/README.md

kubernetes/base/autoscaling/hpa.yaml
kubernetes/base/autoscaling/kustomization.yaml

kubernetes/base/backend/deployment.yaml
kubernetes/base/backend/kustomization.yaml
kubernetes/base/backend/service.yaml

kubernetes/base/config/backend-configmap.yaml
kubernetes/base/config/kustomization.yaml
kubernetes/base/config/secret-template.yaml

kubernetes/base/frontend/deployment.yaml
kubernetes/base/frontend/kustomization.yaml
kubernetes/base/frontend/service.yaml

kubernetes/base/ingress/ingress.yaml
kubernetes/base/ingress/kustomization.yaml

kubernetes/base/kustomization.yaml
kubernetes/base/namespace.yaml

kubernetes/overlays/dev/backend-replica-patch.yaml
kubernetes/overlays/dev/frontend-replica-patch.yaml
kubernetes/overlays/dev/kustomization.yaml

kubernetes/overlays/qa/backend-replica-patch.yaml
kubernetes/overlays/qa/frontend-replica-patch.yaml
kubernetes/overlays/qa/kustomization.yaml

kubernetes/overlays/prod/backend-replica-patch.yaml
kubernetes/overlays/prod/frontend-replica-patch.yaml
kubernetes/overlays/prod/kustomization.yaml
```

This confirms that the project contains:

* A reusable Kubernetes base
* A Dev overlay
* A QA overlay
* A Production overlay
* Environment-specific replica patches
* Kustomization files for the base and overlays

---

# 3. Verify Kustomize Availability

Kustomize support was verified through the installed Kubernetes client.

The command used was:

```bash
kubectl version --client
```

The verified result was:

```text
Client Version: v1.35.0
Kustomize Version: v5.7.1
```

This confirms that the installed `kubectl` client includes Kustomize support.

---

# 4. Verify Kustomize Build Support

Kustomize build support was also checked using:

```bash
kubectl kustomize --help | head -30
```

The output included:

```text
Build a set of KRM resources using a 'kustomization.yaml' file.
```

This confirms that the local Kubernetes client can render Kubernetes resources from a directory containing a `kustomization.yaml` file.

---

# 5. Verify the Base Kustomization

The base Kustomization file was inspected using:

```bash
cat kubernetes/base/kustomization.yaml
```

The configuration is:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- namespace.yaml
- backend
- frontend
- config
- autoscaling
```

The base therefore references:

```text
namespace.yaml
backend
frontend
config
autoscaling
```

The `ingress` directory also exists under the base directory.

However, it is **not directly included by the base `kustomization.yaml`**.

The Production overlay explicitly adds the ingress configuration.

---

# 6. Verify the Base Directory

The base directory was checked using:

```bash
find kubernetes/base -maxdepth 2 -type f -print | sort
```

The verified structure is:

```text
kubernetes/base/
├── autoscaling/
│   ├── hpa.yaml
│   └── kustomization.yaml
├── backend/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── config/
│   ├── backend-configmap.yaml
│   ├── kustomization.yaml
│   └── secret-template.yaml
├── frontend/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── ingress/
│   ├── ingress.yaml
│   └── kustomization.yaml
├── kustomization.yaml
└── namespace.yaml
```

The base therefore contains common configuration for:

* Namespace
* Backend
* Frontend
* Application configuration
* Secret template
* Autoscaling
* Ingress configuration

---

# 7. Build the Base Configuration

The base was rendered using:

```bash
kubectl kustomize kubernetes/base
```

The rendered resource types were summarized using:

```bash
kubectl kustomize kubernetes/base | grep '^kind:' | sort | uniq -c
```

The verified result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the base render produces:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
```

This confirms that the base Kustomization can successfully assemble the common FlavorForge Kubernetes resources.

---

# 8. Inspect the Rendered Base Resources

The rendered resource names were inspected using:

```bash
kubectl kustomize kubernetes/base
```

The rendered configuration contains resources including:

```text
Namespace: flavorforge

ConfigMap: backend-config
Secret: backend-secret

Service: backend
Service: frontend

Deployment: backend
Deployment: frontend

HorizontalPodAutoscaler: backend-hpa
```

The base therefore provides the common FlavorForge application resources before environment-specific overlay changes are applied.

---

# 9. Verify the Development Overlay

The Dev overlay was inspected using:

```bash
cat kubernetes/overlays/dev/kustomization.yaml
```

The configuration is:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
namespace: flavorforge-dev
nameSuffix: -dev
patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend
- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

The Dev overlay therefore:

1. Reuses `../../base`
2. Uses the `flavorforge-dev` namespace
3. Adds the `-dev` name suffix
4. Applies the backend replica patch
5. Applies the frontend replica patch

---

# 10. Render the Development Overlay

The Dev overlay was rendered using:

```bash
kubectl kustomize kubernetes/overlays/dev
```

The rendered configuration contains environment-specific resources such as:

```text
backend-dev
frontend-dev
backend-hpa-dev
```

The resources are rendered into:

```text
namespace: flavorforge-dev
```

This demonstrates that the Dev overlay successfully builds on top of the common base and applies its environment-specific configuration.

---

# 11. Verify Development Resource Types

The Dev resource types were summarized using:

```bash
kubectl kustomize kubernetes/overlays/dev | grep '^kind:' | sort | uniq -c
```

The verified result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the Dev overlay renders:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
```

---

# 12. Verify the QA Overlay

The QA overlay was inspected using:

```bash
cat kubernetes/overlays/qa/kustomization.yaml
```

The configuration is:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
namespace: flavorforge-qa
nameSuffix: -qa
patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend
- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

The QA overlay therefore:

* Reuses the common base
* Uses the `flavorforge-qa` namespace
* Adds the `-qa` suffix
* Applies the QA backend replica patch
* Applies the QA frontend replica patch

---

# 13. Render the QA Overlay

The QA overlay was rendered using:

```bash
kubectl kustomize kubernetes/overlays/qa
```

The rendered configuration contains resources such as:

```text
backend-qa
frontend-qa
backend-hpa-qa
```

The resources are rendered in:

```text
namespace: flavorforge-qa
```

The QA resource types are:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

This demonstrates that QA uses the same reusable base while applying QA-specific configuration.

---

# 14. Verify the Production Overlay

The Production overlay was inspected using:

```bash
cat kubernetes/overlays/prod/kustomization.yaml
```

The configuration includes:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
- ../../base/ingress
namespace: flavorforge
patches:
- path: backend-replica-patch.yaml
  target:
    kind: Deployment
    name: backend
- path: frontend-replica-patch.yaml
  target:
    kind: Deployment
    name: frontend
```

Unlike Dev and QA, the Production overlay explicitly includes:

```yaml
- ../../base/ingress
```

Therefore, the Production render includes the FlavorForge ingress configuration.

---

# 15. Render the Production Overlay

The Production overlay was rendered using:

```bash
kubectl kustomize kubernetes/overlays/prod
```

The resource types were summarized using:

```bash
kubectl kustomize kubernetes/overlays/prod | grep '^kind:' | sort | uniq -c
```

The verified result was:

```text
1 kind: ConfigMap
2 kind: Deployment
1 kind: HorizontalPodAutoscaler
1 kind: Ingress
1 kind: Namespace
1 kind: Secret
2 kind: Service
```

Therefore, the Production overlay renders:

```text
1 Namespace
1 ConfigMap
1 Secret
2 Services
2 Deployments
1 HorizontalPodAutoscaler
1 Ingress
```

This confirms that the Production overlay successfully combines the common application resources with the ingress configuration.

---

# 16. Verify the Production Ingress

The Production render contains:

```text
kind: Ingress
name: flavorforge-ingress
namespace: flavorforge
```

The ingress uses:

```text
ingressClassName: nginx
```

The configured routes include:

```text
/api  → backend service → port 3000
/     → frontend service → port 80
```

The resulting Production ingress was also observed in the running AKS environment.

The cluster currently reports:

```bash
kubectl get ingress -n flavorforge
```

```text
NAME                  CLASS   HOSTS   ADDRESS       PORTS
flavorforge-ingress   nginx   *       4.157.77.48   80
```

This provides runtime evidence that the Production ingress exists in the `flavorforge` namespace.

---

# 17. Verify the Kubernetes Resources in AKS

After the Kustomize configuration was rendered and deployed, the resulting FlavorForge resources were verified in the AKS cluster.

The command used was:

```bash
kubectl get all -n flavorforge
```

The verified workloads include:

```text
backend pods       2
frontend pods      2

backend deployment     2/2
frontend deployment    2/2

backend service
frontend service

backend HPA
```

The running pods were:

```text
backend-7c8fb9489c-fstht    1/1 Running
backend-7c8fb9489c-r2rzs    1/1 Running
frontend-5585ccd455-25tws   1/1 Running
frontend-5585ccd455-zgdr7   1/1 Running
```

The deployments report:

```text
backend     2/2
frontend    2/2
```

This confirms that the FlavorForge backend and frontend workloads are running successfully in the AKS `flavorforge` namespace.

---

# 18. Verify the Production Deployment Details

The backend Deployment was inspected using:

```bash
kubectl describe deployment backend -n flavorforge
```

The deployment reports:

```text
Replicas: 2 desired | 2 updated | 2 total | 2 available
```

The backend container is running:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.8
```

The backend also has:

```text
Liveness probe:  /api/health
Readiness probe: /api/health
```

The frontend Deployment reports:

```text
Replicas: 2 desired | 2 updated | 2 total | 2 available
```

The frontend image is:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.8
```

This provides runtime evidence that the rendered Kubernetes application configuration is running successfully in AKS.

---

# 19. Argo CD Tracking Evidence

The running Deployments also contain Argo CD tracking annotations.

For example:

```text
argocd.argoproj.io/tracking-id:
flavorforge:apps/Deployment:flavorforge/backend
```

and:

```text
argocd.argoproj.io/tracking-id:
flavorforge:apps/Deployment:flavorforge/frontend
```

This shows that the running Kubernetes Deployments are tracked by the FlavorForge Argo CD application.

---

# 20. Compare the Kustomize Environments

The verified Kustomize configuration can be summarized as follows:

| Environment | Namespace         | Name Suffix | Deployments | Services | HPA | Ingress |
| ----------- | ----------------- | ----------- | ----------: | -------: | --: | ------- |
| Base        | `flavorforge`     | None        |           2 |        2 |   1 | No      |
| Dev         | `flavorforge-dev` | `-dev`      |           2 |        2 |   1 | No      |
| QA          | `flavorforge-qa`  | `-qa`       |           2 |        2 |   1 | No      |
| Prod        | `flavorforge`     | None        |           2 |        2 |   1 | Yes     |

The important design point is that Dev, QA, and Production reuse the common Kubernetes base.

The overlays apply only the environment-specific configuration.

Production additionally includes the ingress configuration.

---

# 21. Kustomize Configuration Model

The final configuration model is:

```text
                    kubernetes/base
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
            Dev           QA            Prod
             │             │             │
         namespace     namespace      namespace
         suffix        suffix         ingress
         patches       patches        patches
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                Environment-specific
                    configuration
```

This approach avoids duplicating the common Kubernetes manifests.

---

# 22. Evidence Collected

Kustomize evidence is stored under:

```text
/screenshots/build-journey/kustomize/
```

The available evidence includes:

### Kustomize Structure

![Kubernetes-Kustomize structure](/screenshots/build-journey/kustomize/Kubernetes-Kustomize%20structure.png)

![Kustomize overlays](/screenshots/build-journey/kustomize/kustomize-overlays.png)


### Kustomize Version

![Kustomize version](/screenshots/build-journey/kustomize/Kustomize%20version.png)


### Base Render

![Base render](/screenshots/build-journey/kustomize/Base%20render.png)


### Development Render

![Dev render](/screenshots/build-journey/kustomize/Dev%20render.png)

![Dev render success](/screenshots/build-journey/kustomize/dev-render-success.png)


### QA Render

![QA render](/screenshots/build-journey/kustomize/QA%20render.png)

![QA render success](/screenshots/build-journey/kustomize/qa-render-success.png)


### Production Render

![Production render](/screenshots/build-journey/kustomize/Production%20render.png)

![Production render success](/screenshots/build-journey/kustomize/prod-render-success.png)


### Production Resources

![Complete production resources](/screenshots/build-journey/kustomize/Complete%20production%20resources.png)

![Production workloads](/screenshots/build-journey/kustomize/Production%20workloads.png)

![Kubernetes resources](/screenshots/build-journey/kustomize/kubernetes-resources.png)

![Kubectl get all](/screenshots/build-journey/kustomize/kubectl-get-all.png)


### Deployments

![Backend Deployment configuration](/screenshots/build-journey/kustomize/Backend%20Deployment%20configuration.png)

![Frontend Deployment configuration](/screenshots/build-journey/kustomize/Frontend%20Deployment%20configuration.png)


### Services and HPA

![Services and HPA](/screenshots/build-journey/kustomize/Services%20%2B%20HPA.png)

![HPA](/screenshots/build-journey/kustomize/hpa.png)


### Ingress

![Ingress](/screenshots/build-journey/kustomize/Ingress.png)

![Ingress verification](/screenshots/build-journey/kustomize/ingress.png)

![Services and ingress](/screenshots/build-journey/kustomize/services-ingress.png)


### Overlay Validation

![Overlay render validation](/screenshots/build-journey/kustomize/overlay-render-validation.png)

The Kustomize structure evidence is:

![Kustomize base and environment overlay structure](/screenshots/build-journey/kustomize/kustomize-overlays.png)

**Figure 1 — Kustomize base and environment overlay structure**

The production workload evidence is:

![Production workloads](/screenshots/build-journey/kustomize/Production%20workloads.png)

**Figure 2 — Production workloads**

The Kubernetes resource verification evidence is:

![Kubernetes resources](/screenshots/build-journey/kustomize/kubernetes-resources.png)

**Figure 3 — Kubernetes resources**

---

# 23. Deployment Evidence Note

The Production Kustomize overlay was applied to the AKS cluster using:

```bash
kubectl apply -k kubernetes/overlays/prod
```

The command was executed as part of the Production deployment process.

A dedicated screenshot of the `kubectl apply -k` command was not captured. Therefore, this document does not present a screenshot as direct evidence of the command execution.

The resulting Kubernetes resources were subsequently verified in the AKS cluster using:

```bash
kubectl get all -n flavorforge
```

and:

```bash
kubectl get ingress -n flavorforge
```

The runtime verification confirmed that the Production resources were successfully deployed and running in the `flavorforge` namespace.

The verified resources include:

* Backend Deployment
* Frontend Deployment
* Backend Service
* Frontend Service
* Backend HPA
* Production Ingress
* Running backend pods
* Running frontend pods

Therefore, the deployment command is documented as part of the actual deployment process, while the available screenshots and runtime commands provide evidence of the resulting deployed state.

---

# 24. Troubleshooting

## 24.1 `kustomization.yaml` not found

If:

```bash
kubectl kustomize kubernetes/base
```

reports that a Kustomization file cannot be found, verify the available files:

```bash
find kubernetes -name kustomization.yaml -print
```

---

## 24.2 Validate an overlay before applying it

Kustomize rendering can be validated without modifying the cluster:

```bash
kubectl kustomize kubernetes/overlays/dev
```

```bash
kubectl kustomize kubernetes/overlays/qa
```

```bash
kubectl kustomize kubernetes/overlays/prod
```

A successful render confirms that Kustomize can process the referenced resources and patches.

---

## 24.3 Inspect resource types

For a quick summary:

```bash
kubectl kustomize kubernetes/overlays/prod \
  | grep '^kind:' \
  | sort \
  | uniq -c
```

The same approach can be used for Dev and QA.

---

# 25. Reproducibility

A user cloning the FlavorForge repository can inspect and render the Kustomize configurations from the repository root.

For example:

```bash
git clone <repository-url>
cd flavorforge-azure-devsecops-capstone
```

Verify Kustomize support:

```bash
kubectl version --client
```

Render the configurations:

```bash
kubectl kustomize kubernetes/base
kubectl kustomize kubernetes/overlays/dev
kubectl kustomize kubernetes/overlays/qa
kubectl kustomize kubernetes/overlays/prod
```

These commands allow the Kubernetes configurations to be inspected and rendered without immediately changing a cluster.

---

# 26. Result

The Kustomize stage was verified against the actual FlavorForge repository and AKS environment.

The verification confirmed:

* Kustomize is available through `kubectl`
* Kustomize version `v5.7.1` is installed
* A reusable Kubernetes base exists
* Dev, QA and Production overlays exist
* The base renders successfully
* The Dev overlay renders successfully
* The QA overlay renders successfully
* The Production overlay renders successfully
* Dev uses the `flavorforge-dev` namespace
* QA uses the `flavorforge-qa` namespace
* Production uses the `flavorforge` namespace
* Environment-specific replica patches are defined
* Production explicitly includes the ingress configuration
* Production renders an Ingress resource
* Backend and frontend Deployments are running in AKS
* Backend and frontend pods are running with `1/1` readiness
* Backend and frontend Deployments report `2/2` available replicas
* The Production ingress is available at `4.157.77.48`
* The running Deployments contain Argo CD tracking annotations

The resulting architecture is:

```text
                 FlavorForge Kubernetes
                          │
                          ▼
                         Base
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
           Dev           QA            Prod
            │             │             │
         patches       patches       patches
            │             │             │
            └─────────────┼─────────────┘
                          ▼
              Environment-specific
                  configuration
                          │
                          ▼
                    AKS Cluster
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
        Backend                     Frontend
        2 replicas                  2 replicas
             │                         │
             └────────────┬────────────┘
                          ▼
                       Ingress
                    4.157.77.48
```

The Kustomize stage therefore establishes the reusable Kubernetes configuration model used by FlavorForge and demonstrates that the resulting Production workloads are running successfully in AKS.



