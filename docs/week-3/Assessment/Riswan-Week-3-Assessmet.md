# 🚀 CareerByteCode DevOps Internship

# Week 3 Assignment

## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account** — this is a hands-on week.
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload your YAML files, Dockerfiles, and scripts to your GitHub repository.

> 💳 **Cloud cost warning:** VMs, Bastion, AKS, Load Balancers and Public IPs are **billable by the hour**. Keep everything in **one resource group** and run `az group delete --name <your-rg> --yes --no-wait` after every lab.

---

## Questions

### Q1.
Explain the purpose of a **Resource Group** in Azure and why placing all lab resources in one group makes cleanup safer.

### Q2.
Explain **VNet** and **Subnet** with an example. What does the `/16` and `/24` in a CIDR range mean?

### Q3.
Using the **Azure CLI**, create a resource group, a VNet (`10.0.0.0/16`) and a subnet (`10.0.1.0/24`). Paste your commands and attach screenshots.

### Q4.
Deploy an Ubuntu VM (`Standard_B1s`) into your subnet with a public IP but **no inbound ports open**. Attempt SSH and document the exact error you receive.

### Q5.
Explain what a **Network Security Group** is, how rule **priority** works, and what the default `DenyAllInBound` rule does.

### Q6.
Add inbound rules for ports **22**, **80** and **443**. For each rule, record the priority, protocol and source you used. Attach screenshots of your final rule list.

### Q7.
Install and start **nginx** on the VM. Show `systemctl status nginx`, `curl http://localhost`, and the page loading in your browser via the public IP. Attach all three screenshots.

### Q8.
Explain how you would restrict SSH access to **only your own IP address**, and demonstrate it. Why is this important on a server exposed to the internet?

### Q9.
Create a **route table**, add a route for `0.0.0.0/0` with next hop **None**, and associate it with your subnet. Prove the VM lost internet access using `ping` and `apt update`. Then remove it and prove access returned.

### Q10.
Explain how to use the **Effective routes** view on a VM's NIC, and why it is more reliable than reading your route table alone.

### Q11.
Deploy **Azure Bastion** in your VNet. Explain the naming and size requirements for the Bastion subnet.

### Q12.
Create a VM in a **private subnet with no public IP** and log into it through Bastion. Enable **copy and paste** and demonstrate it working. Attach screenshots.

### Q13.
Explain what **Microsoft Entra ID** is and the difference between **authentication** and **authorization**.

### Q14.
Create an Entra ID user and a security group named `DevOps-Team`, and add the user to the group. Attach screenshots.

### Q15.
Assign the group a role at your **resource group** scope. Explain the three components of every role assignment (who, what, where). Attach a screenshot of the role assignment.

### Q16.
Log in as your new Entra ID user and verify the access. Explain what a user sees if they have no role assigned.

### Q17.
Explain the difference between a **managed cluster** and an **on-premises cluster**. Which parts does Azure manage in AKS, and which parts do you pay for?

### Q18.
Create an AKS cluster with **1 node** using `Standard_B2s`. Explain why AKS requires at least 2 vCPUs per node. If you hit a quota error, document how you resolved it. Attach screenshots including `kubectl get nodes`.

### Q19.
Create an **Azure Container Registry**, build the sample Flask app image, and push it to ACR using the CLI. Then run `az aks update --attach-acr` and explain what problem this prevents. Attach screenshots.

### Q20.
Create an Azure DevOps **organization**, **project**, and a **Docker Registry service connection** to your ACR. Then clone the Azure Repos repository, push the app and Dockerfile, and document how you would recover a forgotten Git password.

### Q21.
Build a CI pipeline that builds the Docker image and pushes it to ACR with tags `$(Build.BuildId)` and `latest`. Then explain the difference between a **Microsoft-hosted** and a **self-hosted** agent, and register a self-hosted agent on your own machine.
Create a GitHub repository named **week3-azure-devops** containing:
- `azure-pipelines.yml`
- Dockerfile and application code
- Kubernetes manifests
- A `README.md` documenting your full setup
- At least **five Git commits**
- Screenshots of the pipeline run, the image in ACR, and your registered agent

---

## 🎥 Q22. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
- What did you learn during Week 3?
- Which topic did you enjoy the most?
- Which topic did you find difficult?
- What additional concept did you explore beyond the training?
- What are your learning goals for the capstone week?

---

## ✅ Before you submit

- [ ] All Azure resources deleted — attach proof
- [ ] All screenshots attached
- [ ] GitHub repository link included

---

**Best of Luck! 🚀**
**CareerByteCode DevOps Internship**
