# 🚀 CareerByteCode DevOps Internship

# Week 3 Assignment – Set 1

## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account.**
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload all YAML files, Dockerfiles, and scripts to your GitHub repository.

> 💳 **Cloud cost warning:** everything this week is billable. Keep all resources in **one resource group** and delete it after each lab with `az group delete --name <your-rg> --yes --no-wait`. **Bastion bills hourly even when nobody is connected.**

---

## Questions

### Q1.
Explain the relationship between a **Resource Group**, a **VNet**, and a **Subnet**. Draw a simple diagram showing how they nest.

### Q2.
Explain **CIDR notation**. Why does a `/24` subnet provide 251 usable IPs in Azure rather than 256?

### Q3.
Create the full networking stack using **Azure CLI only** (no portal): a resource group, a VNet `10.0.0.0/16`, and a subnet `10.0.1.0/24`. Paste your commands and attach screenshots.

### Q4.
Explain how **NSG rule priority** works. What happens when two rules match the same traffic, and what is the `DenyAllInBound` rule?

### Q5.
Deploy a VM with no open ports, then progressively open **22**, then **80**, then **443**, documenting the behaviour at each stage. Explain the difference between a **connection timeout** and a **connection refused** error.

### Q6.
Explain the difference between attaching an NSG to a **subnet** versus attaching it to a **NIC**. Which takes effect first for inbound traffic?

### Q7.
Explain the meaning of each **next hop type** in a route table (Internet, None, Virtual appliance, Virtual network gateway, Virtual network) with one real-world use case each.

### Q8.
Create a route table that forces `0.0.0.0/0` to next hop **None**, associate it to your subnet, and prove the VM lost internet access. Then use the **Effective routes** view on the NIC and explain what it shows. Attach screenshots.

### Q9.
Explain the exact requirements for the **AzureBastionSubnet** (name and minimum size) and why Azure enforces them.

### Q10.
Deploy Bastion, create a VM with **no public IP**, and connect through it. Then enable **copy and paste** in the Bastion configuration and demonstrate it working. Attach screenshots.

### Q11.
Explain the **RBAC scope hierarchy** (management group → subscription → resource group → resource) and how inheritance works. Why is "least privilege" important?

### Q12.
Compare the roles **Reader**, **Contributor**, **Owner**, and **User Access Administrator** in a table. Explain why a user with **Contributor** still cannot SSH into a VM using their Entra identity.

### Q13.
Create an Entra ID user and a security group, assign the group the **Virtual Machine Administrator Login** role at resource-group scope, then sign in as that user and connect to the VM using `az ssh vm`. Attach screenshots of each stage.

### Q14.
Explain what happens when a user authenticates successfully but has no role assigned. What do they see, and how would you diagnose it?

### Q15.
Explain the difference between the AKS **control plane** and **worker nodes**. Which one does Azure manage, and which one do you pay for?

### Q16.
Create an AKS cluster and explain how to **request a vCPU quota increase** when Azure rejects your chosen VM size. Include the exact portal navigation path.

### Q17.
Deploy an application to your AKS cluster with a `type: LoadBalancer` service and access it from a browser. Explain how this differs from what happened on Minikube in Week 2. Attach screenshots.

### Q18.
Explain what `az aks update --attach-acr` does behind the scenes, and which specific error it prevents.

### Q19.
Explain the difference between a **Docker Registry** service connection and an **Azure Resource Manager** service connection. Explain why **workload identity federation** is preferred over a service principal secret.

### Q20.
Explain the difference between a **Microsoft-hosted agent** and a **self-hosted agent**. Register a self-hosted agent on your own machine, point a pipeline at it, and show a successful run. Explain why a pipeline can sit at "queued" forever.

### Q21.
Build a complete CI pipeline in Azure DevOps that builds a Docker image and pushes it to ACR with **two tags** (`$(Build.BuildId)` and `latest`). Then push a code change and prove the pipeline triggered automatically.
Create a GitHub repository named **week3-azure-cicd** containing:
- `azure-pipelines.yml`
- Application code and Dockerfile
- Kubernetes manifests
- A `README.md` documenting the full flow
- At least **five Git commits**
- Screenshots of the pipeline run, the ACR image tags, and the running app

---

## Q22. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering:
- Your introduction
- What you learned during the third week
- Your favourite topic and why
- The most challenging topic
- What you explored beyond the training
- Your goals for the capstone week

---

## ✅ Before you submit

- [ ] All Azure resources deleted — attach proof
- [ ] All screenshots attached
- [ ] GitHub repository link included
