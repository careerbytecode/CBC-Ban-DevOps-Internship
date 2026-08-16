# 02 — Argo CD Installation

## Objective

Install Argo CD in the FlavorForge AKS cluster and verify that the Argo CD components are running successfully.

Argo CD is deployed into a dedicated Kubernetes namespace:

```text
argocd
```

---

## 1. Create the Argo CD Namespace

Create the namespace:

```bash
kubectl create namespace argocd
```

Verify:

```bash
kubectl get namespace argocd
```

Expected result:

```text
NAME     STATUS   AGE
argocd   Active   ...
```

The dedicated namespace keeps the Argo CD components isolated from the FlavorForge application workloads.

---

## 2. Install Argo CD

Install Argo CD using the official Kubernetes installation manifest:

```bash
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

This creates the Argo CD resources required to operate the GitOps control plane.

---

## 3. Verify Argo CD Pods

Check the Argo CD Pods:

```bash
kubectl get pods -n argocd
```

The installation includes components such as:

```text
argocd-application-controller
argocd-applicationset-controller
argocd-dex-server
argocd-notifications-controller
argocd-redis
argocd-repo-server
argocd-server
```

The final verification confirmed that the Argo CD components were running successfully.

Expected state:

```text
argocd-application-controller        1/1   Running
argocd-applicationset-controller     1/1   Running
argocd-dex-server                    1/1   Running
argocd-notifications-controller      1/1   Running
argocd-redis                         1/1   Running
argocd-repo-server                   1/1   Running
argocd-server                        1/1   Running
```

### Evidence

![Argo CD Pods Running](/screenshots/argo-cd/argocd-pods-running.png)

---

## 4. Verify Argo CD CRDs

Argo CD uses Custom Resource Definitions (CRDs) to extend Kubernetes with Argo CD resources.

Verify the Argo CD CRDs:

```bash
kubectl get crd | grep argoproj.io
```

The output should include Argo CD resources such as:

```text
applications.argoproj.io
applicationsets.argoproj.io
appprojects.argoproj.io
```

These CRDs allow Kubernetes to understand Argo CD resources such as `Application` and `ApplicationSet`.

### Evidence

![Argo CD CRDs](/screenshots/argo-cd/argocd-crds.png)

---

## 5. Verify Argo CD Services

Check the services created in the Argo CD namespace:

```bash
kubectl get svc -n argocd
```

The installation creates services used by the Argo CD components, including the Argo CD server and repository services.

### Evidence

![Argo CD Services](/screenshots/argo-cd/argocd-services.png)

---

## 6. Verify the Argo CD Installation

At this stage, the following have been verified:

| Component                 | Verification |
| ------------------------- | ------------ |
| `argocd` namespace        | ✅ Created    |
| Argo CD installation      | ✅ Applied    |
| Argo CD Pods              | ✅ Running    |
| Argo CD CRDs              | ✅ Present    |
| Argo CD Services          | ✅ Created    |
| ApplicationSet Controller | ✅ Running    |

The installation stage confirms that the Argo CD control plane is operational in the FlavorForge AKS cluster.

---

## Result

Argo CD has been successfully installed in the AKS cluster and its core Kubernetes resources have been verified.

The environment is now ready for the next GitOps step:

```text
AKS Cluster
     ↓
argocd namespace
     ↓
Argo CD Components
     ↓
Running
     ↓
Ready for Git Repository Connection
```

➡️ **Next: `03-git-repository-connection.md`**
