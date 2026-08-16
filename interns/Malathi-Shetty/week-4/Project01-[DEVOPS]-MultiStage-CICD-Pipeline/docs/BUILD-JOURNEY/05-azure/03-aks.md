# 03 — Azure Kubernetes Service (AKS)

## 1. What we wanted to do

After creating the Azure Container Registry (ACR), the next requirement was to create a managed Kubernetes environment for running the FlavorForge application.

The goal of this phase was to create an Azure Kubernetes Service (AKS) cluster that could:

- Run the FlavorForge frontend and backend containers.
- Manage application replicas.
- Support rolling deployments.
- Provide Kubernetes networking and service discovery.
- Pull private container images from Azure Container Registry.
- Provide the Kubernetes platform required for later application deployment.

The deployment flow was:

```text
Application Code
       |
       v
Docker Images
       |
       v
Azure Container Registry (ACR)
       |
       v
Azure Kubernetes Service (AKS)
       |
       v
Application Deployment
````

---

## 2. Why AKS was required

The Docker images stored in ACR are application artifacts, but a container registry does not run the application.

A Kubernetes platform was required to:

* Create and manage containers.
* Maintain the desired number of application replicas.
* Restart failed containers.
* Provide service discovery.
* Manage application networking.
* Support scaling and rolling deployments.

For FlavorForge, Azure Kubernetes Service provides the managed Kubernetes environment where the frontend and backend workloads are deployed.

---

## 3. AKS concept

AKS can be viewed as a managed environment for running Kubernetes workloads.

Instead of manually starting containers:

```text
docker run frontend
docker run backend
```

Kubernetes manages the application workloads:

```text
AKS Cluster
     |
     +-------------------+
     |                   |
     v                   v
Frontend Pods        Backend Pods
     |                   |
     +---------+---------+
               |
               v
          Kubernetes
           Services
```

Microsoft manages the Kubernetes control plane, while the project workloads run on the AKS worker nodes.

---

## 4. Project AKS configuration

The FlavorForge AKS environment used the following configuration:

| Setting            | Value             |
| ------------------ | ----------------- |
| Resource Group     | `flavorforge-rg`  |
| AKS Cluster        | `flavorforge-aks` |
| Node Count         | `2`               |
| Identity           | Managed Identity  |
| Container Registry | `flavorforgeacr2026ms`  |
| Kubernetes CLI     | `kubectl`         |

The two-node cluster provided the Kubernetes worker capacity required for the application workloads.

---

## 5. Prerequisites

Before creating AKS, the following resources and configuration were already available:

* Azure subscription.
* Azure CLI.
* Authenticated Azure CLI session.
* `flavorforge-rg` resource group.
* `flavorforgeacr2026ms` Azure Container Registry.
* Docker images stored in ACR.

Azure authentication could be verified with:

```bash
az account show
```

The ACR repositories could be checked with:

```bash
az acr repository list \
  --name flavorforgeacr2026ms
```

This confirmed that the container registry was available before creating the Kubernetes environment.

---

# 6. Install Kubernetes CLI

## What we wanted to do

The local machine needed the Kubernetes command-line tool so that it could communicate with the AKS cluster.

Install the AKS CLI components with:

```bash
az aks install-cli
```

Verify the client:

```bash
kubectl version --client
```

The `kubectl` command is used later to inspect and manage Kubernetes resources in the AKS cluster.

---

# 7. Create the AKS cluster

## What we wanted to do

The next step was to provision the FlavorForge Kubernetes cluster.

The cluster was created using:

```bash
az aks create \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --node-count 2 \
  --enable-managed-identity \
  --generate-ssh-keys
```

### Command explanation

| Option                      | Purpose                                             |
| --------------------------- | --------------------------------------------------- |
| `--resource-group`          | Specifies the Azure resource group                  |
| `--name`                    | Defines the AKS cluster name                        |
| `--node-count 2`            | Creates two Kubernetes worker nodes                 |
| `--enable-managed-identity` | Enables managed identity for Azure resource access  |
| `--generate-ssh-keys`       | Generates SSH keys if they are not already available locally |

The cluster creation process provisions the managed Kubernetes environment and its worker node infrastructure.

---

## 7.1 AKS creation evidence

The AKS creation command was executed successfully.

![AKS Creation](/screenshots/azure/10-az-aks-create.png)

*Figure 7.1 — AKS cluster creation command executed successfully.*

---

# 8. Connect AKS with ACR

## What we wanted to do

The FlavorForge application images are stored in the private Azure Container Registry.

Therefore, AKS needs permission to pull those images.

The AKS cluster was connected to ACR using:

```bash
az aks update \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --attach-acr flavorforgeacr2026ms
```

This integration allows the AKS cluster to authenticate with the Azure Container Registry and pull private container images.

The resulting flow is:

```text
                Azure
                  |
       +----------+----------+
       |                     |
       v                     v
      ACR                   AKS
       |                     |
       |  Private Images     |
       +--------->-----------+
                 |
                 v
           Kubernetes Pods
```

This connection is important because the FlavorForge frontend and backend images are not pulled from Docker Hub during deployment. They are stored in the project's Azure Container Registry.

### AKS workload architecture

```text
                ACR
                 |
                 | Pull private images
                 v
             AKS Cluster
                 |
        +--------+--------+
        |                 |
        v                 v
 Frontend Deployment  Backend Deployment
        |                 |
        v                 v
 Frontend Pods        Backend Pods
        |                 |
        +--------+--------+
                 |
          Kubernetes Services
``` 

---

# 9. Download AKS credentials

## What we wanted to do

The local development machine needed Kubernetes credentials so that `kubectl` could communicate with the FlavorForge AKS cluster.

Run:

```bash
az aks get-credentials \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```

A successful command produces a message similar to:

```text
Merged "flavorforge-aks" as current context
```

The credentials are stored in the local Kubernetes configuration:

```text
~/.kube/config
```

---

## 9.1 Local AKS connection evidence

The local machine was successfully configured to communicate with the AKS cluster.

![Connect Local Machine to AKS](/screenshots/azure/11-connect-local-machine-to-aks.png)

*Figure 9.1 — Local `kubectl` connection configured with AKS.*

---

# 10. Verify the Kubernetes context

## What we wanted to do
After downloading the AKS credentials, we needed to confirm that the local Kubernetes configuration was pointing to the FlavorForge AKS cluster.

Run:

```bash
kubectl config current-context
```

Expected:

```text
flavorforge-aks
```

This confirms that local `kubectl` configuration was using the FlavorForge AKS cluster.

The configured context allowed subsequent Kubernetes commands to communicate with the AKS environment.

Available contexts can also be viewed with:

```bash
kubectl config get-contexts
```

If another context is active, the FlavorForge cluster can be selected using:

```bash
kubectl config use-context flavorforge-aks
```

---

# 11. Verify AKS worker nodes

## What we wanted to verify

The next step was to confirm that the AKS cluster was reachable and that its Kubernetes worker nodes were available.

Run:

```bash
kubectl get nodes
```

The expected result is that the AKS nodes appear with:

```text
NAME                                      STATUS   ROLES    AGE   VERSION
aks-nodepool1-xxxxxxxx-vmss000000         Ready    <none>   ...   ...
aks-nodepool1-xxxxxxxx-vmss000001         Ready    <none>   ...   ...
```

The important value was:

```text
STATUS
Ready
```

The cluster contained two worker nodes.
The two worker nodes confirmed that the AKS cluster had successfully provisioned its Kubernetes compute capacity.

Conceptually:

```text
flavorforge-aks
       |
       +----------------+
       |                |
       v                v
    Node 1           Node 2
     Ready            Ready
```

A node in the `Ready` state indicates that Kubernetes considers the worker node available for scheduling workloads.



---

## 11.1 Kubernetes node evidence

The AKS worker nodes were verified using `kubectl`.

![AKS Kubernetes Nodes](/screenshots/azure/28-kubectl-get-nodes.png)

*Figure 11.1 — AKS Kubernetes worker nodes shown in the `Ready` state.*

---

# 12. Verify AKS cluster information

## What we wanted to do

After confirming the nodes, we verified that the Kubernetes control plane was reachable.

The Kubernetes cluster information can be checked with:

Run:

```bash
kubectl cluster-info
```

Expected output is similar to:

```text
Kubernetes control plane is running at ...
CoreDNS is running at ...
```
This confirmed that the local Kubernetes client could communicate with the AKS control plane.

This verifies that the Kubernetes control plane and cluster services are reachable.

The Kubernetes client can also be checked with:

```bash
kubectl version --client
```

---

# 13. Verify AKS from Azure CLI

The AKS resource can also be inspected through Azure CLI.

Run:
```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks
```
The cluster should be present in the `flavorforge-rg` resource group.
The returned resource information can be used to confirm that the AKS resource was successfully provisioned.

The cluster status was also verified from the Azure environment.

For a detailed provisioning-state check, run:
```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --query provisioningState \
  --output tsv
```
Expected output:
```text
Succeeded
```
This confirmed that Azure successfully provisioned the AKS resource.


---

## 13.1 Verify AKS cluster status

The Azure environment showed the FlavorForge AKS cluster running successfully.

![AKS Cluster Running](/screenshots/azure/27-aks-cluster-running.png)

*Figure 13.1 — FlavorForge AKS cluster running successfully.*

The Azure verification confirmed that the AKS resource was available and operational.

---


# 14. AKS and ACR architecture

After completing the AKS setup, the Azure infrastructure looked conceptually like this:

```text

Azure Subscription
        |
        v
+----------------------+
|    flavorforge-rg    |
+----------------------+
        |
        +-----------------------+
        |                       |
        v                       v
+----------------+      +----------------------+
|      ACR       |      |         AKS          |
| flavorforgeacr2026ms |      |  flavorforge-aks     |
+----------------+      +----------------------+
        |                       |
        | Stores images         |
        |                       |
        +------ AKS pulls ------+
                                |
                       +--------+--------+
                       |                 |
                       v                 v
                    Node 1            Node 2
                       |                 |
                       +--------+--------+
                                |
                                v
                         Kubernetes Pods
```

> Note: The above diagram clearly communicates:
> - Resource group contains ACR and AKS.
> - ACR stores images.
> - AKS pulls images.
> - AKS has worker nodes.
> - Pods run on the worker nodes.

> Remember Kubernetes Pods don't necessarily all run on the combined "Node 1 + Node 2" line. Kubernetes schedules each Pod onto an available node.

The deployment flow is therefore:

```text
Docker Build
     |
     v
Docker Images
     |
     v
Azure Container Registry (ACR)
     |
     | AKS pulls images
     v
Azure Kubernetes Service (AKS)
     |
     v
Kubernetes Pods
```

> Note: ACR does not automatically push images to AKS. AKS pulls images from ACR when Kubernetes creates the Pods.

## workload architecture
```text
AKS
 |
 +--> Frontend Deployment
 |       |
 |       +--> Frontend Pods
 |
 +--> Backend Deployment
 |       |
 |       +--> Backend Pods
 |
 +--> Kubernetes Services
```

---

# 15. How ACR and AKS work together

The overall application deployment model involves both the local development environment and Azure cloud resources:

```text
Developer
   |
   v
Source Code
   |
   v
Docker Build
   |
   v
Docker Images
   |
   v
Azure Container Registry
   |
   | AKS has ACR access
   v
Azure Kubernetes Service
   |
   +--> Frontend Deployment
   |
   +--> Backend Deployment
   |
   +--> Services
   |
   +--> Ingress
```

ACR stores the application images.

AKS retrieves those images and uses them to create Kubernetes containers.

This separation provides a clean architecture:

```text
Build / Store
     |
     v
    ACR
     |
     v
Run / Orchestrate
     |
     v
    AKS
```

---

# 16. Resources and configuration created

The AKS phase did not require application source-code changes.

The main cloud resources created or configured were:

```text
AKS Cluster
Managed Identity
Kubernetes Worker Nodes
```

```text
Azure
 |
 +-- flavorforge-rg
 |
 +-- flavorforgeacr2026ms
 |
 +-- flavorforge-aks
       |
       +-- Managed Identity
       |
       +-- Node Pool
       |
       +-- Worker Node 1
       |
       +-- Worker Node 2
```

The local Kubernetes configuration was updated at:

```text
~/.kube/config
```

This file stores Kubernetes cluster connection information and contexts used by `kubectl`.

No application source code was modified as part of the AKS infrastructure setup.

---

# 17. Verification checklist

The AKS setup was considered ready when the following conditions were satisfied:

* [x] Azure resource group exists.
* [x] ACR exists.
* [x] Docker images are available in ACR.
* [x] AKS cluster exists.
* [x] AKS uses two worker nodes.
* [x] Managed identity is enabled.
* [x] AKS is connected to ACR.
* [x] Local `kubectl` credentials are configured.
* [x] `flavorforge-aks` is the active Kubernetes context.
* [x] Kubernetes nodes are in the `Ready` state.
* [x] AKS is running and ready for workloads.

The most important Kubernetes verification was:

```bash
kubectl get nodes
```

with the nodes showing:

```text
Ready
```

---

# 18. Common mistakes

## Mistake 1 — Creating AKS before preparing ACR

Before deploying the application to AKS, the container images
referenced by the Kubernetes manifests must be available in ACR.

Recommended flow:

```text
Docker
   |
   v
ACR
   |
   v
AKS
   |
   v
Application Deployment
```

---

## Mistake 2 — Forgetting ACR integration

If AKS cannot authenticate with the private registry, application Pods may fail to pull their images.

A common symptom is:

```text
ImagePullBackOff
```

The ACR integration can be configured using:

```bash
az aks update \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --attach-acr flavorforgeacr2026ms
```

---

## Mistake 3 — Using the wrong Kubernetes context

If `kubectl` is pointing to another cluster, commands may operate on the wrong environment.

Check available contexts:

```bash
kubectl config current-context
```

Expected:

```text
flavorforge-aks
```

Switch when necessary to the FlavorForge AKS cluster:

```bash
kubectl config use-context flavorforge-aks
```
Then verify:

```bash
kubectl config current-context
```

---

## Mistake 4 — Ignoring node status

Before deploying application workloads, verify:

```bash
kubectl get nodes
```

All required worker nodes should show:

```text
Ready
```

If nodes are not ready, investigate the cluster before proceeding with application deployment.

Then inspect a node:

```bash
kubectl describe node <node-name>
```

Also check cluster status from Azure:

```bash
az aks show \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --output table
```

---

## Mistake 5 — kubectl command not found

Check:

```bash
kubectl version --client
```

If `kubectl` is not available, install it using:

```bash
az aks install-cli
```

---

## Mistake 6 — Pods cannot pull images from ACR

A common symptom is:

```text
ImagePullBackOff
```

First verify the AKS-to-ACR connection:

```bash
az aks check-acr \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --acr flavorforgeacr2026ms
```

If the integration needs to be configured again:

```bash
az aks update \
  --resource-group flavorforge-rg \
  --name flavorforge-aks \
  --attach-acr flavorforgeacr2026ms
```

---

# 19. Evidence collected

The AKS implementation is supported by the following project evidence:

```text
screenshots/azure/
├── 10-az-aks-create.png
├── 11-connect-local-machine-to-aks.png
├── 27-aks-cluster-running.png
└── 28-kubectl-get-nodes.png
```

The screenshots above are shown inline at the steps where they provide evidence.

---

# 20. What we learned

This phase demonstrated how to:

* Create a managed Kubernetes cluster using Azure Kubernetes Service.
* Configure a two-node Kubernetes environment.
* Enable managed identity for the cluster.
* Connect AKS to a private Azure Container Registry.
* Configure local `kubectl` access.
* Verify Kubernetes worker nodes.
* Confirm that AKS is ready for application workloads.

The key architectural distinction is:

```text
ACR = Stores container images

AKS = Runs and orchestrates containers
```

ACR and AKS therefore work together as part of the FlavorForge cloud deployment architecture.

The important relationship is:

```text
ACR
 |
 | stores container images
 v
AKS
 |
 | runs containers
 v
Kubernetes Pods
```

---

# 21. Final result

The FlavorForge AKS environment was successfully provisioned and verified.

The final state was:

```text
Azure
  |
  +-- flavorforge-rg
        |
        +-- flavorforgeacr2026ms
        |      |
        |      +-- Backend Image
        |      +-- Frontend Image
        |
        +-- flavorforge-aks
               |
               +-- Node 1  -> Ready
               |
               +-- Node 2  -> Ready
```

The local development environment was connected to the AKS cluster through `kubectl`, and the cluster was ready for the next phase: deploying the FlavorForge Kubernetes manifests.

The cluster was:

* Created in Azure.
* Configured with two worker nodes.
* Connected to Azure Container Registry.
* Connected to the local Kubernetes client.
* Verified through Azure CLI.
* Verified through `kubectl`.
* Confirmed with Kubernetes nodes in the `Ready` state.

The Kubernetes platform was therefore ready for the next phase: deploying the FlavorForge application using Kubernetes manifests and Kustomize.


---

# 22. Before moving to Kubernetes deployment

Confirm the following:

```text
[✓] AKS cluster exists
[✓] AKS cluster is running
[✓] ACR exists
[✓] AKS is connected to ACR
[✓] kubectl is configured
[✓] flavorforge-aks is the current context
[✓] Kubernetes nodes are Ready
```

With these prerequisites complete, the FlavorForge Kubernetes manifests can be deployed to AKS.

# References

- [Azure Kubernetes Service Documentation](https://learn.microsoft.com/azure/aks/)
- [AKS and ACR Integration](https://learn.microsoft.com/azure/aks/cluster-container-registry-integration)
- [kubectl Documentation](https://kubernetes.io/docs/reference/kubectl/)