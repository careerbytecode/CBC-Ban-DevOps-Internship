# Step 2 — Azure Container Registry (ACR)

## What we wanted to do

After creating the Azure Resource Group, the next step was to create an **Azure Container Registry (ACR)** for FlavorForge.

The purpose of ACR was to provide a private Azure registry where the Docker images built for the FlavorForge application could be stored and later consumed by the Kubernetes/AKS deployment.

The application has two container images:

* `flavorforge-backend`
* `flavorforge-frontend`

The workflow used in this stage was:

```text
Local Docker Images
       │
       │ docker tag
       ▼
Azure Container Registry
       │
       │ docker push
       ▼
flavorforgeacr2026ms.azurecr.io
       │
       ├── flavorforge-backend:1.0
       └── flavorforge-frontend:1.0
```

---

# 1. ACR details

The FlavorForge Azure Container Registry used in this project was:

| Property       | Value                             |
| -------------- | --------------------------------- |
| Resource Group | `flavorforge-rg`                  |
| Registry Name  | `flavorforgeacr2026ms`            |
| Region         | East US                           |
| SKU            | Basic                             |
| Login Server   | `flavorforgeacr2026ms.azurecr.io` |

The registry name and login server were verified from the Azure environment and project documentation.

---

# 2. Verify the Azure Resource Group

Before working with ACR, the Azure Resource Group was verified.

```bash
az group show \
  --name flavorforge-rg \
  --output table
```

### Expected result

The command should display the `flavorforge-rg` resource group and its Azure location.

The Resource Group used for the FlavorForge Azure resources was:

```text
flavorforge-rg
```

![FlavorForge Resource Group](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

---

# 3. Check the Azure Container Registry

The ACR can be inspected using Azure CLI.

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --resource-group flavorforge-rg \
  --output table
```

The important values were:

```text
Registry Name : flavorforgeacr2026ms
Location      : East US
SKU           : Basic
Login Server  : flavorforgeacr2026ms.azurecr.io
```

The registry login server is important because Docker image names must include the registry hostname when pushing images to ACR.

![ACR Created](/screenshots/azure/04-acr-created.png)

---

# 4. Get the ACR login server

The login server can also be retrieved directly with Azure CLI:

```bash
az acr show \
  --name flavorforgeacr2026ms \
  --query loginServer \
  --output tsv
```

Expected output:

```text
flavorforgeacr2026ms.azurecr.io
```

This value becomes the registry portion of the Docker image name.

For example:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

---

# 5. Authenticate Docker with ACR

Before pushing Docker images, the local Docker client was authenticated with the Azure Container Registry.

The command used was:

```bash
az acr login --name flavorforgeacr2026ms
```

A successful login allows Docker to communicate with the registry using the Azure CLI authentication context.

### Expected output

A successful command produces output similar to:

```text
Login Succeeded
```

### Evidence

![ACR Login Success](/screenshots/azure/06-az-acr-login-success.png)

Additional ACR login evidence:

![ACR Login Succeeded](/screenshots/azure/13-acr-login-succeed.png)

These screenshots provide visual verification that the ACR login operation succeeded.

---

# 6. Understand the Docker image naming convention

A Docker image stored in ACR follows this general structure:

```text
<ACR-login-server>/<image-name>:<tag>
```

For this project:

```text
flavorforgeacr2026ms.azurecr.io/<image-name>:<tag>
```

For the backend:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

For the frontend:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

The registry hostname tells Docker where the image should be pushed.

The image name identifies the application component.

The tag identifies the image version.

---

# 7. Verify the local Docker images

Before tagging the images for ACR, the locally built Docker images were checked.

```bash
docker images
```

The project used the following local image names:

```text
flavorforge-backend:1.0
flavorforge-frontend:1.0
```

The Docker images were verified before continuing with the ACR publishing process.

![Docker Images](/screenshots/azure/07-docker-images.png)

Additional Docker evidence:

![Docker Images](/screenshots/docker/4-docker-images.png)

---

# 8. Tag the backend image for ACR

The local backend image was tagged with the ACR login server.

```bash
docker tag flavorforge-backend:1.0 \
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

This does not create a second Docker image from scratch.

Instead, it adds an additional registry-qualified name to the existing local image.

The resulting image reference is:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

---

# 9. Tag the frontend image for ACR

The frontend image was tagged in the same way.

```bash
docker tag flavorforge-frontend:1.0 \
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

The resulting image reference is:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

---

# 10. Verify the registry-qualified images

The newly tagged images can be verified with:

```bash
docker images
```

The expected entries include:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend    1.0
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend   1.0
```

The project contains a screenshot showing the tagging and Docker image verification:

![Tagged Images Verification](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

Another ACR tagging screenshot is available:

![ACR Tag](/screenshots/azure/12-acr-tag.png)

---

# 11. Push the backend image to ACR

The backend image was pushed to Azure Container Registry using:

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

Docker uploads the image layers to the ACR repository.

The image is stored in ACR under:

```text
flavorforge-backend
```

with tag:

```text
1.0
```

The complete image reference is:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

---

# 12. Push the frontend image to ACR

The frontend image was pushed using:

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

The image is stored in ACR under:

```text
flavorforge-frontend
```

with tag:

```text
1.0
```

The complete image reference is:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

---

# 13. Verify images in Azure Container Registry

After pushing the images, the ACR repositories can be listed with:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Expected repositories include:

```text
flavorforge-backend
flavorforge-frontend
```

Individual image tags can be checked with:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository flavorforge-backend \
  --output table
```

and:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository flavorforge-frontend \
  --output table
```

The project contains Azure Portal evidence for the ACR images:

![Images Verified in ACR](/screenshots/azure/09-verify-images-in-acr.png)

Additional ACR image evidence:

![ACR Images](/screenshots/azure/25-acr-images.png)

These provide visual verification that the Docker images were available in Azure Container Registry.

---

# 14. ACR image publishing result

At the end of this stage, the container images were available in the Azure Container Registry.

```text
Azure Container Registry
│
├── flavorforge-backend
│   └── 1.0
│
└── flavorforge-frontend
    └── 1.0
```

The resulting image references were:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

This completed the manual Docker image publishing stage.

---

# 15. Important version distinction

There is an important version difference between the ACR publishing evidence and the current Kubernetes manifests.

The Docker-to-ACR publishing commands documented in the project used:

```text
flavorforge-backend:1.0
flavorforge-frontend:1.0
```

and pushed:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

However, the current Kubernetes base deployment manifests reference:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.8
```

and:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.8
```

These should **not** be presented as if they were the same image-publishing step.

The `1.0` images represent the documented/manual ACR publishing stage.

The `1.8` references represent the later/current Kubernetes deployment configuration.

This distinction keeps the BUILD-JOURNEY aligned with the actual evidence instead of rewriting the earlier steps to match later deployment versions.

---

# 16. Troubleshooting

## Problem: ACR login fails

Run:

```bash
az login
```

Then verify the active Azure subscription:

```bash
az account show --output table
```

After authentication, retry:

```bash
az acr login --name flavorforgeacr2026ms
```

---

## Problem: Docker push fails

First verify that Docker is logged into the registry:

```bash
az acr login --name flavorforgeacr2026ms
```

Then verify the image name:

```bash
docker images
```

The image must contain the ACR login server:

```text
flavorforgeacr2026ms.azurecr.io/
```

For example:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

Then retry:

```bash
docker push flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

---

## Problem: Repository not found in ACR

List the repositories:

```bash
az acr repository list \
  --name flavorforgeacr2026ms \
  --output table
```

Then inspect the tags:

```bash
az acr repository show-tags \
  --name flavorforgeacr2026ms \
  --repository flavorforge-backend \
  --output table
```

This helps verify whether the push completed successfully.

---

# 17. Evidence collected

The ACR implementation is supported by the following project evidence:

```text
screenshots/azure/
├── 04-acr-created.png
├── 05-tag-create.png
├── 06-az-acr-login-success.png
├── 07-docker-images.png
├── 08-tag-the-images-and-verify-in-docker-images.png
├── 09-verify-images-in-acr.png
├── 12-acr-tag.png
├── 13-acr-login-succeed.png
└── 25-acr-images.png
```

Additional Docker evidence:

```text
screenshots/docker/
├── 4-docker-images.png
└── 13-1-docker-images.png
```

The screenshots above are shown inline at the steps where they provide evidence.



## 17. Evidence collected

The ACR implementation is supported by the following project evidence.

### Azure ACR evidence

```text
screenshots/azure/
├── 04-acr-created
├── 05-tag-create
├── 06-az-acr-login-success
├── 07-docker-images
├── 08-tag-the-images-and-verify-in-docker-images
├── 09-verify-images-in-acr
├── 12-acr-tag
├── 13-acr-login-succeed
└── 25-acr-images
```

Additional Docker evidence:

```text
screenshots/docker/
├── 4-docker-images
└── 13-1-docker-images
```

The screenshots above are shown inline at the relevant steps where they provide evidence.

### Resource Group evidence

![FlavorForge Resource Group](/screenshots/azure/flavorforge-rg-microsoft-azure-resource-group.png)

### ACR creation evidence

![ACR created](/screenshots/azure/04-acr-created.png)

### ACR login evidence

![ACR login success](/screenshots/azure/06-az-acr-login-success.png)

![ACR login succeeded](/screenshots/azure/13-acr-login-succeed.png)

### Local Docker image evidence

![Docker images](/screenshots/azure/07-docker-images.png)

![Docker images additional evidence](/screenshots/docker/4-docker-images.png)

![Docker images additional verification](/screenshots/docker/13-1-docker-images.png)

### ACR image tagging evidence

![ACR image tagging](/screenshots/azure/05-tag-create.png)

![ACR tag verification](/screenshots/azure/08-tag-the-images-and-verify-in-docker-images.png)

![Additional ACR tag evidence](/screenshots/azure/12-acr-tag.png)

### Images available in ACR

![Images verified in ACR](/screenshots/azure/09-verify-images-in-acr.png)

![ACR images](/screenshots/azure/25-acr-images.png)


---

## 18. Repository evidence

The project repository independently confirms the ACR configuration used in the FlavorForge deployment.

### Azure DevOps pipeline

The root `azure-pipelines.yml` file references the confirmed ACR login server:

```text
flavorforgeacr2026ms.azurecr.io
```

This confirms that the Azure DevOps pipeline is configured to use the same ACR created for the FlavorForge project.

The relevant configuration is:

```yaml
containerRegistry: 'flavorforgeacr2026ms.azurecr.io'
```

### Kubernetes deployment manifests

The current Kubernetes base deployment manifests reference the same ACR registry.

The backend deployment uses:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.8
```

The frontend deployment uses:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.8
```

These references were verified directly from:

```text
kubernetes/base/backend/deployment.yaml
kubernetes/base/frontend/deployment.yaml
```

### Version distinction

The ACR publishing stage documented in this BUILD-JOURNEY used the `1.0` image tag:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

The current Kubernetes manifests use the later `1.8` image references:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.8
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.8
```

These represent different stages of the project and should not be presented as the same image-publishing operation.

The `1.0` references document the manual Docker-to-ACR publishing stage, while the `1.8` references represent the later Kubernetes deployment configuration.

### Independent implementation documentation

The project implementation documentation also confirms the ACR workflow and registry name.

The documented ACR login command is:

```bash
az acr login --name flavorforgeacr2026ms
```

The documented Docker image references use:

```text
flavorforgeacr2026ms.azurecr.io
```

The documented image publishing stage uses the `1.0` tag.

This provides multiple sources of repository-level evidence for the ACR configuration:

```text
Azure DevOps Pipeline
        │
        │ references
        ▼
flavorforgeacr2026ms.azurecr.io
        ▲
        │
        │ references
        │
Kubernetes Deployments
        │
        ├── backend:1.8
        └── frontend:1.8
```

Together, the Azure DevOps pipeline, Kubernetes manifests, and implementation documentation confirm that `flavorforgeacr2026ms.azurecr.io` is the ACR registry used by the FlavorForge project.


---

## 19. What was achieved

By completing this stage, the FlavorForge application was connected to an Azure Container Registry for container image storage and later deployment.

The following activities were completed:

* An Azure Container Registry was created for the FlavorForge project.
* The registry was created in the `flavorforge-rg` resource group.
* The ACR registry name was confirmed as `flavorforgeacr2026ms`.
* The ACR login server was confirmed as `flavorforgeacr2026ms.azurecr.io`.
* The ACR region was confirmed as **East US**.
* The ACR SKU was confirmed as **Basic**.
* Docker was authenticated with ACR using the Azure CLI.
* The local backend image `flavorforge-backend:1.0` was tagged for ACR.
* The local frontend image `flavorforge-frontend:1.0` was tagged for ACR.
* The registry-qualified images were verified locally.
* The backend image was pushed to ACR using the `1.0` tag.
* The frontend image was pushed to ACR using the `1.0` tag.
* The images were verified in Azure Container Registry.
* Repository-level evidence was verified against the Azure DevOps pipeline and Kubernetes manifests.

The resulting manual image publishing flow was:

```text
FlavorForge Source Code
        │
        ▼
Local Docker Build
        │
        ├── flavorforge-backend:1.0
        │
        └── flavorforge-frontend:1.0
                │
                ▼
           docker tag
                │
                ▼
flavorforgeacr2026ms.azurecr.io
                │
                ▼
           docker push
                │
                ▼
     Azure Container Registry
        │
        ├── flavorforge-backend:1.0
        │
        └── flavorforge-frontend:1.0
```

### Final ACR image references

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.0
```

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.0
```

### Important version note

The `1.0` images above represent the **documented manual ACR publishing stage**.

The current Kubernetes deployment manifests reference later `1.8` image versions:

```text
flavorforgeacr2026ms.azurecr.io/flavorforge-backend:1.8
flavorforgeacr2026ms.azurecr.io/flavorforge-frontend:1.8
```

This version distinction is intentionally preserved so that the BUILD-JOURNEY reflects the actual project history and evidence rather than mixing different deployment stages.


---

## References

* Microsoft Azure Container Registry documentation:
  [Azure Container Registry documentation](https://learn.microsoft.com/azure/container-registry/)

* Microsoft Azure CLI `az acr` documentation:
  [Azure CLI — az acr](https://learn.microsoft.com/cli/azure/acr)

* Docker image tag documentation:
  [Docker image tag reference](https://docs.docker.com/reference/cli/docker/image/tag/)

* Docker push documentation:
  [Docker push reference](https://docs.docker.com/reference/cli/docker/image/push/)
