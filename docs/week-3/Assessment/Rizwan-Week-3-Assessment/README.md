\# CareerByteCode DevOps Internship - Week 3 Assessment



\## Submitted By



\*\*Rizwan Siddiqui\*\*



\## Project Title



\*\*Azure Networking, Identity, AKS, ACR and Azure DevOps CI/CD Pipeline\*\*



\---



\## Project Overview



This repository contains my Week 3 assessment for the CareerByteCode Cloud DevOps Internship.



The assessment focuses on Azure infrastructure and DevOps implementation using Azure networking, virtual machines, Network Security Groups, route tables, Azure Bastion, Microsoft Entra ID, RBAC, Azure Kubernetes Service, Azure Container Registry, Azure DevOps Repos, Azure Pipelines, Docker, Kubernetes, and a self-hosted Azure DevOps agent.



The main goal of this project was to understand how cloud infrastructure, identity, security, containers, Kubernetes, and CI/CD pipelines work together in a real DevOps environment.



\---



\## Key Areas Covered



\- Azure Resource Group creation

\- Virtual Network and subnet planning

\- CIDR understanding using `/16`, `/24`, and `/26`

\- Ubuntu VM deployment

\- NSG inbound rule testing

\- SSH failure and fix using NSG rules

\- Nginx installation on Azure VM

\- Browser validation using public IP

\- SSH restriction to own public IP

\- Route table testing using next hop `None`

\- Effective routes verification

\- Azure Bastion deployment

\- Private VM access without public IP

\- Microsoft Entra ID user and group creation

\- Azure RBAC role assignment

\- AKS cluster deployment

\- ACR creation and image push

\- Flask application containerization

\- Kubernetes Deployment and Service

\- Azure DevOps Repos setup

\- Docker Registry service connection

\- Azure Pipeline YAML

\- Microsoft-hosted agent limitation

\- Self-hosted agent setup

\- Docker daemon troubleshooting

\- Pipeline success and ACR image tag verification

\- Azure resource cleanup



\---



\## Tools and Services Used



| Category | Tools / Services |

|---|---|

| Cloud Platform | Microsoft Azure |

| CLI | Azure CLI |

| Version Control | Git, GitHub, Azure Repos |

| CI/CD | Azure DevOps Pipelines |

| Compute | Azure Virtual Machine, AKS |

| Networking | VNet, Subnet, NSG, Route Table, Effective Routes |

| Security | Microsoft Entra ID, RBAC, Azure Bastion |

| Containerization | Docker |

| Container Registry | Azure Container Registry |

| Orchestration | Kubernetes |

| Agent | Self-hosted Azure DevOps Agent |

| OS / Shell | Windows, PowerShell, Git Bash |



\---



\## Azure Resources Created



All Azure resources were created inside one resource group:



```text

rg-week3-devops-lab

```



Main resources used in this assessment:



```text

Location: centralindia



Resource Group: rg-week3-devops-lab

Virtual Network: vnet-week3-lab

Public Subnet: subnet-public

Private Subnet: subnet-private

Bastion Subnet: AzureBastionSubnet

Public VM: vm-week3-public

Private VM: vm-week3-private

NSG: nsg-week3-vm

Route Table: rt-block-internet

Azure Bastion: bastion-week3-lab

AKS Cluster: aks-week3-lab

Azure Container Registry: acrweek3rizwan268

Azure DevOps Project: week3-azure-devops

Service Connection: acr-week3-service-connection

Self-hosted Agent: Rizwan-Local-Agent

```



\---



\## Repository Structure



```text

week3-azure-devops/

├── app/

│   ├── app.py

│   └── requirements.txt

├── k8s/

│   ├── deployment.yaml

│   └── service.yaml

├── scripts/

│   ├── cleanup.sh

│   └── lab scripts

├── screenshots/

├── Dockerfile

├── azure-pipelines.yml

├── README.md

└── answers.md

```



\---



\## End-to-End Architecture Flow



```text

Developer Code

&#x20;    ↓

Git / Azure Repos

&#x20;    ↓

Azure DevOps Pipeline

&#x20;    ↓

Self-hosted Agent

&#x20;    ↓

Docker Build

&#x20;    ↓

Azure Container Registry

&#x20;    ↓

AKS Deployment

&#x20;    ↓

Kubernetes LoadBalancer Service

&#x20;    ↓

Application Access

```



\---



\## Application Overview



A simple Flask application was created for containerization and deployment testing.



Application folder:



```text

app/

```



Routes:



```text

/       - Main application route

/health - Health check route

```



Application response:



```text

CareerByteCode Week 3 - Flask App running on AKS

```



\---



\## Docker Implementation



A Dockerfile was created to package the Flask application into a Docker image.



Docker image flow:



```text

Python Base Image → Flask App Files → Docker Image → ACR

```



Image name:



```text

week3-flask-app

```



ACR image path:



```text

acrweek3rizwan268.azurecr.io/week3-flask-app

```



Tags used:



```text

latest

$(Build.BuildId)

```



\---



\## Kubernetes Implementation



The Flask application was deployed to AKS using Kubernetes manifests.



Files used:



```text

k8s/deployment.yaml

k8s/service.yaml

```



Kubernetes resources created:



```text

Deployment: week3-flask-deployment

Service: week3-flask-service

Service Type: LoadBalancer

Replicas: 2

Container Port: 5000

Service Port: 80

```



The LoadBalancer service exposed the application externally using a public IP.



\---



\## Azure DevOps Pipeline Implementation



Azure DevOps pipeline was created using:



```text

azure-pipelines.yml

```



Pipeline workflow:



```text

Code Push → Azure Repos → Pipeline Trigger → Self-hosted Agent → Docker Build → Docker Push to ACR

```



The pipeline builds and pushes the Docker image to Azure Container Registry using two tags:



```text

latest

$(Build.BuildId)

```



\---



\## Self-hosted Agent Implementation



Initially, the pipeline was configured with Microsoft-hosted agent:



```yaml

pool:

&#x20; vmImage: 'ubuntu-latest'

```



However, the pipeline failed because hosted parallelism was not available for the Azure DevOps organization.



Error faced:



```text

No hosted parallelism has been purchased or granted.

```



To continue the assessment, a self-hosted Windows agent was configured.



Self-hosted agent details:



```text

Agent Name: Rizwan-Local-Agent

Agent Pool: Default

Machine: Local Windows Laptop

```



Final pipeline pool:



```yaml

pool:

&#x20; name: Default

```



After starting Docker Desktop and running the self-hosted agent, the pipeline completed successfully.



\---



\## Troubleshooting Summary



During this assessment, I faced and resolved multiple practical issues.



\### 1. SSH failed before NSG rule



SSH failed because port 22 was not allowed in the NSG.



Fix:



```text

Created inbound NSG rule for port 22.

```



\### 2. Nginx was not accessible before HTTP rule



Browser access required port 80 to be allowed in the NSG.



Fix:



```text

Created inbound NSG rule for port 80.

```



\### 3. Route table blocked internet



A route table with next hop `None` blocked internet traffic.



Fix:



```text

Removed route table association from subnet.

```



\### 4. Entra ID user could not see resources



The user was able to login but could not view resources due to missing or delayed RBAC permission.



Fix:



```text

Assigned Reader role at Resource Group scope.

```



\### 5. Azure DevOps hosted pipeline failed



Microsoft-hosted agent failed due to hosted parallelism limitation.



Fix:



```text

Configured a self-hosted Windows agent.

```



\### 6. Self-hosted agent authorization issue



Agent registration initially failed due to PAT permission issue.



Fix:



```text

Created PAT with required Agent Pool permission and registered the agent again.

```



\### 7. Docker daemon not running



Pipeline failed because Docker Desktop was installed but Docker daemon was not running.



Fix:



```text

Started Docker Desktop and reran the pipeline.

```



\---



\## Important Screenshots



All screenshots are available inside the `screenshots` folder.



Important screenshots include:



```text

Resource Group creation

VNet and subnet creation

VM creation

SSH failure before NSG

NSG rules

Nginx status

Nginx browser output

SSH restriction to own IP

Route table test

Effective routes

Azure Bastion

Private VM login

Entra ID user and group

RBAC role assignment

AKS creation

kubectl get nodes

ACR creation

ACR image push

Kubernetes deployment and service

Azure DevOps project

Service connection

Hosted pipeline failure

Self-hosted agent running

Self-hosted agent online

Docker daemon error

Pipeline success

ACR image tags

GitHub repository

Azure cleanup proof

```



\---



\## Important Commands



\### Azure Repos Remote



```bash

git remote add azure https://dev.azure.com/rizwansiddiqui483/week3-azure-devops/\_git/week3-azure-devops

```



\### Push to Azure Repos



```bash

git branch -M main

git push -u azure main

```



\### Verify ACR Tags



```bash

az acr repository show-tags \\

&#x20; --name acrweek3rizwan268 \\

&#x20; --repository week3-flask-app \\

&#x20; --output table

```



\### Cleanup Azure Resources



```bash

az group delete \\

&#x20; --name rg-week3-devops-lab \\

&#x20; --yes \\

&#x20; --no-wait

```



\### Verify Cleanup



```bash

az group exists --name rg-week3-devops-lab

```



Expected output:



```text

false

```



\---



\## GitHub Repository



```text

https://github.com/RizwanSid7/week3-azure-devops

```



\---



\## Final Outcome



This assessment helped me connect Azure infrastructure with DevOps delivery workflow.



I practiced Azure networking, NSG, VM access, Bastion, Entra ID, RBAC, AKS, ACR, Docker, Kubernetes, Azure Repos, Azure Pipelines, and self-hosted agent setup.



The most valuable part of this assessment was troubleshooting real issues during implementation and understanding how infrastructure, identity, containers, and CI/CD pipelines connect in a practical cloud DevOps environment.

