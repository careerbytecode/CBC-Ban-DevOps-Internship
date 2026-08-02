\# CareerByteCode DevOps Internship - Week 3 Theory Answers



\## Submitted By



\*\*Rizwan Siddiqui\*\*



\---



\## Q1. What is the purpose of a Resource Group in Azure?



A Resource Group in Azure is a logical container used to manage related Azure resources together.



For example, virtual machines, virtual networks, subnets, NSGs, public IPs, route tables, AKS, and ACR can be placed inside one resource group.



Resource Groups help with:



\- Organizing resources

\- Applying RBAC permissions

\- Managing access control

\- Tracking cost

\- Monitoring resources

\- Deleting all lab resources together after completion



In this assessment, I used one resource group:



```text

rg-week3-devops-lab

```



This made it easier to manage and clean up all resources after the lab.



\---



\## Q2. Explain VNet, Subnet and CIDR /16 and /24.



A Virtual Network is a private network in Azure. It allows Azure resources such as virtual machines, AKS, databases, and other services to communicate securely.



A Subnet is a smaller network range inside a VNet. Subnets help divide the network based on workload or security requirement.



For example:



```text

10.0.0.0/16

```



This is a large address range generally used for the VNet.



```text

10.0.1.0/24

```



This is a smaller address range generally used for a subnet.



In this assessment, I used:



```text

VNet CIDR: 10.0.0.0/16

Subnet CIDR: 10.0.1.0/24

```



The `/16` range gives a larger network space, while `/24` gives a smaller subnet range inside the VNet.



\---



\## Q3. Azure CLI commands used to create Resource Group, VNet and Subnet.



Commands used:



```bash

az group create \\

&#x20; --name rg-week3-devops-lab \\

&#x20; --location centralindia

```



```bash

az network vnet create \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --name vnet-week3-lab \\

&#x20; --address-prefix 10.0.0.0/16 \\

&#x20; --subnet-name subnet-public \\

&#x20; --subnet-prefix 10.0.1.0/24

```



These commands created the resource group, virtual network, and public subnet required for the VM and networking lab.



Screenshots are added in the `screenshots` folder.



\---



\## Q4. Create Ubuntu VM with no inbound ports open and attempt SSH.



I created an Ubuntu VM inside the public subnet with no inbound ports open.



Since inbound port 22 was not allowed in the Network Security Group, SSH connection failed initially.



This confirmed that Azure blocks inbound access unless an NSG rule allows the required port.



After creating an inbound rule for SSH port 22, I was able to connect to the VM successfully.



This helped me understand the importance of NSG rules in Azure VM access.



\---



\## Q5. What is NSG, priority and default DenyAllInBound?



NSG stands for Network Security Group.



It works like a firewall for Azure resources. It controls inbound and outbound traffic using allow and deny rules.



Each NSG rule has a priority number. Lower priority number is evaluated first.



Example:



```text

Priority 1000 is checked before priority 1010.

```



Azure also provides default security rules.



One important default inbound rule is:



```text

DenyAllInBound

```



This rule denies all inbound traffic unless a higher priority allow rule is created.



Because of this, SSH, HTTP, or HTTPS will not work until we allow required ports in NSG.



\---



\## Q6. Create inbound rules for 22, 80 and 443.



I created inbound NSG rules for the following ports:



```text

22  - SSH

80  - HTTP

443 - HTTPS

```



Purpose of each port:



```text

22  - Used to connect to Linux VM using SSH

80  - Used for HTTP web traffic

443 - Used for HTTPS secure web traffic

```



These rules allowed SSH access to the VM and browser access to the Nginx web server.



Screenshots are added in the `screenshots` folder.



\---



\## Q7. Install and start Nginx. Verify with systemctl, curl and browser.



After connecting to the Ubuntu VM using SSH, I installed Nginx.



Commands used:



```bash

sudo apt update

sudo apt install -y nginx

sudo systemctl enable nginx

sudo systemctl start nginx

systemctl status nginx --no-pager

curl http://localhost

```



I verified Nginx in three ways:



```text

1\. systemctl status nginx

2\. curl http://localhost

3\. Browser using VM public IP

```



The browser displayed the default Nginx page, confirming that the web server was running successfully.



\---



\## Q8. Restrict SSH to own public IP and demonstrate access.



Initially, SSH was allowed broadly.



For better security, I restricted SSH access to my own public IP address.



Command used:



```bash

MYIP=$(curl -s https://api.ipify.org)



az network nsg rule update \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --nsg-name nsg-week3-vm \\

&#x20; --name Allow-SSH-22 \\

&#x20; --source-address-prefixes "$MYIP/32"

```



After this change, only my public IP was allowed to connect to port 22.



This is a better production practice because SSH should not be open to everyone on the internet.



\---



\## Q9. Route table with 0.0.0.0/0 next hop None.



I created a route table and added a custom route:



```text

Address Prefix: 0.0.0.0/0

Next Hop Type: None

```



This route blocked internet connectivity from the subnet.



After associating this route table with the subnet, the VM could not access the internet.



Tests such as ping and apt update failed.



After removing the route table association, internet connectivity was restored.



This demonstrated how user-defined routes can control network traffic flow in Azure.



\---



\## Q10. View Effective Routes on VM NIC.



Effective routes show the actual routes applied to a VM network interface.



I checked effective routes on the VM NIC to understand:



\- Default system routes

\- VNet local routes

\- Internet route

\- Custom route table behavior



Effective routes are useful for troubleshooting connectivity issues in Azure networking.



\---



\## Q11. Deploy Azure Bastion and explain subnet requirement.



Azure Bastion allows secure SSH and RDP access to Azure VMs directly from the Azure Portal.



It removes the need to expose public IP addresses on VMs.



Azure Bastion requires a dedicated subnet with the exact name:



```text

AzureBastionSubnet

```



The subnet should be at least:



```text

/26

```



In this assessment, I created Azure Bastion and used it to connect to a private VM securely.



\---



\## Q12. Create private VM without public IP and login through Bastion.



I created a private Ubuntu VM without a public IP address.



Since there was no public IP, direct SSH from the internet was not possible.



I used Azure Bastion to connect to the private VM from the Azure Portal.



This is a secure method because the VM stays private and does not expose SSH to the public internet.



I also tested copy-paste functionality inside the Bastion session.



\---



\## Q13. What is Microsoft Entra ID? Explain authentication and authorization.



Microsoft Entra ID is Azure's identity and access management service.



It is used for:



\- User management

\- Group management

\- Authentication

\- Application access

\- RBAC integration

\- Conditional access



Authentication means verifying the identity of the user.



```text

Who are you?

```



Authorization means checking what permissions the user has.



```text

What are you allowed to access?

```



A user can login successfully but still may not access Azure resources unless proper RBAC permission is assigned.



\---



\## Q14. Create Entra user and security group DevOps-Team.



I created a Microsoft Entra user and a security group named:



```text

DevOps-Team

```



Then I added the user to the group.



Using security groups is better than assigning permissions to individual users because access can be managed centrally.



When a user is added to the group, the user receives the permissions assigned to that group.



\---



\## Q15. Assign group a role at Resource Group scope. Explain who, what and where.



I assigned the Reader role to the `DevOps-Team` group at the resource group scope.



Details:



```text

Who: DevOps-Team group

What: Reader role

Where: rg-week3-devops-lab resource group

```



This means all members of the DevOps-Team group can view resources inside the resource group.



This is an example of Azure RBAC, where access is assigned based on identity, role, and scope.



\---



\## Q16. Login as new Entra user and verify access. Explain no role access.



After assigning the Reader role, I logged in as the new Entra user and verified access to the resource group.



If no role is assigned, the user can authenticate successfully but authorization fails.



This means:



```text

The user can login to Azure Portal but cannot view or manage Azure resources.

```



This clearly shows the difference between authentication and authorization.



\---



\## Q17. Managed cluster vs on-prem Kubernetes. AKS responsibility and cost.



AKS is a managed Kubernetes service provided by Azure.



In an on-prem Kubernetes environment, the organization is responsible for managing:



\- Kubernetes control plane

\- Worker nodes

\- Upgrades

\- Patching

\- Networking

\- Security

\- Monitoring

\- Scaling

\- High availability



In AKS, Azure manages the Kubernetes control plane.



The user manages:



\- Worker nodes

\- Applications

\- Deployments

\- Services

\- Scaling

\- Container images

\- Monitoring and troubleshooting



AKS reduces operational overhead and helps teams run Kubernetes workloads faster.



For cost, AKS control plane is generally managed by Azure, but the user pays for worker nodes, storage, load balancer, networking, logs, and other connected services.



\---



\## Q18. Create AKS with one node Standard\_B2s and explain node size/quota.



I created an AKS cluster using Azure CLI.



Command used:



```bash

az aks create \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --name aks-week3-lab \\

&#x20; --node-count 1 \\

&#x20; --node-vm-size Standard\_B2s \\

&#x20; --enable-managed-identity \\

&#x20; --generate-ssh-keys

```



After AKS creation, I configured kubectl:



```bash

az aks get-credentials \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --name aks-week3-lab \\

&#x20; --overwrite-existing

```



Then I verified the node:



```bash

kubectl get nodes

```



AKS requires a supported VM size and available regional vCPU quota. If quota is not available or VM size is unsupported, AKS creation can fail.



\---



\## Q19. Create ACR, build sample Flask image, push to ACR and attach ACR to AKS.



I created Azure Container Registry:



```bash

az acr create \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --name acrweek3rizwan268 \\

&#x20; --sku Basic \\

&#x20; --location centralindia

```



I built and pushed the Flask application image to ACR:



```bash

az acr build \\

&#x20; --registry acrweek3rizwan268 \\

&#x20; --image week3-flask-app:latest \\

&#x20; .

```



Then I attached ACR to AKS:



```bash

az aks update \\

&#x20; --resource-group rg-week3-devops-lab \\

&#x20; --name aks-week3-lab \\

&#x20; --attach-acr acrweek3rizwan268

```



This allows AKS to pull images from ACR securely without manually storing registry credentials inside Kubernetes secrets.



\---



\## Q20. Create Azure DevOps project, service connection, push code and explain Git password recovery.



I created an Azure DevOps project named:



```text

week3-azure-devops

```



I pushed my code to Azure Repos.



The repository included:



```text

app/

Dockerfile

k8s/

azure-pipelines.yml

README.md

answers.md

screenshots/

```



I also created a Docker Registry service connection for Azure Container Registry:



```text

acr-week3-service-connection

```



This service connection allows the Azure Pipeline to authenticate with ACR and push Docker images.



If Git password is forgotten, Azure DevOps does not show the old password. The correct solution is to create a new Personal Access Token and use that token for Git authentication.



\---



\## Q21. Build CI pipeline with BuildId and latest tags. Explain Microsoft-hosted vs self-hosted agent.



I created an Azure DevOps pipeline using:



```text

azure-pipelines.yml

```



The pipeline builds and pushes Docker image to ACR using two tags:



```text

$(Build.BuildId)

latest

```



Initially, the pipeline was configured to use Microsoft-hosted agent:



```yaml

pool:

&#x20; vmImage: 'ubuntu-latest'

```



The pipeline failed because hosted parallelism was not granted.



Error:



```text

No hosted parallelism has been purchased or granted.

```



To fix this, I configured a self-hosted Windows agent on my laptop.



Final pipeline used:



```yaml

pool:

&#x20; name: Default

```



Microsoft-hosted agent means Microsoft provides the temporary build machine.



Self-hosted agent means we provide and manage the build machine, such as a laptop, VM, or server.



After starting Docker Desktop and running the self-hosted agent, the pipeline ran successfully and pushed the Docker image to ACR.



\---



\## Q22. Three-minute self-speech summary.



Hello everyone,



My name is Rizwan Siddiqui.



This is my Week 3 assessment for the CareerByteCode Cloud DevOps Internship.



In this week, I worked on Azure networking, identity, Kubernetes, container registry, and Azure DevOps pipeline implementation.



I created an Azure Resource Group, Virtual Network, Subnets, Ubuntu VM, Network Security Group rules, Route Table, Azure Bastion, Microsoft Entra ID user and group, RBAC role assignment, AKS cluster, Azure Container Registry, Azure DevOps project, Azure Repos, Azure Pipeline, and self-hosted agent.



I also deployed a sample Flask application using Docker and Kubernetes. The Docker image was built and pushed to Azure Container Registry, and the application was deployed using Kubernetes Deployment and Service.



One of the most important parts of this assessment was troubleshooting. I faced issues like SSH failure due to NSG rules, internet block due to route table, Entra user access issue due to RBAC, hosted parallelism limitation in Azure DevOps, self-hosted agent permission issue, and Docker daemon not running.



By resolving these issues, I understood how real DevOps troubleshooting works in cloud environments.



This week helped me connect Azure infrastructure with DevOps delivery workflow. I learned how networking, security, identity, containers, Kubernetes, registry, and CI/CD pipeline work together in a practical project.



Thank you.

