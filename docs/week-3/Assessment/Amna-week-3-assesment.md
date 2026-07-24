# 🚀 CareerByteCode DevOps Internship

# Week 3 Assignment

## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account** — this is a hands-on week.
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload your YAML files, Dockerfiles, and screenshots to your GitHub repository.
- Explore a few additional concepts beyond the training wherever required.

> 💳 **Cloud cost warning:** VMs, Bastion, AKS, Load Balancers and Public IPs are **billable**. Create everything inside **one resource group** and run `az group delete --name <your-rg> --yes --no-wait` the moment each lab is finished. **Bastion and AKS nodes bill by the hour even when idle.**

---

## Questions

### Q1.
What is a **Resource Group** in Azure? Explain why we place all lab resources inside a single resource group.

### Q2.
What is a **Virtual Network (VNet)**? Explain the meaning of the CIDR range `10.0.0.0/16` and how many IP addresses it provides.

### Q3.
What is a **Subnet**? Create a VNet named `cbc-vnet` with the range `10.0.0.0/16` and add a subnet with the range `10.0.1.0/24`. Attach screenshots.

### Q4.
Create a Virtual Machine inside your subnet **without opening any inbound ports**. Try to SSH into it. Explain what error you received and **why** it happened. Attach a screenshot of the error.

### Q5.
What is a **Network Security Group (NSG)**? Explain how the default inbound rules behave.

### Q6.
Add an inbound rule to allow port **22**, then log in to the VM successfully. Attach screenshots of the rule and the successful login.

### Q7.
Install **nginx** on the VM. Run `curl http://localhost` inside the VM (it should work), then try opening the VM's public IP in your browser (it will fail). Explain **why** it fails even though nginx is running.

### Q8.
Open ports **80** and **443**, then open the public IP in your browser again. Attach a screenshot of the nginx welcome page.

### Q9.
Explain the **Source** field options when creating an NSG rule (Any, IP Addresses, My IP address, Service Tag). Which one should be used for SSH, and why?

### Q10.
What is a **Route Table**? Create one, add a route for `0.0.0.0/0` with next hop **None**, attach it to your subnet, and show that the VM can no longer reach the internet. Attach screenshots.

### Q11.
What is **Azure Bastion**? Explain why connecting through Bastion is safer than opening port 22 to the internet.

### Q12.
Create a VM with **no public IP** in a private subnet and connect to it using Bastion. Attach a screenshot of your Bastion session.

### Q13.
What is **Microsoft Entra ID**? Explain the difference between **authentication** and **authorization** with a simple example.

### Q14.
Create a user and a security group in Entra ID, then add the user to the group. Attach screenshots of all three steps.

### Q15.
Explain why we assign permissions to a **group** instead of directly to each user. Give one practical example.

### Q16.
Assign a role to your group at the **resource group** scope, then log in as the new user and verify the access. Attach screenshots.

### Q17.
What is **Azure Kubernetes Service (AKS)**? Explain the difference between a **managed cluster** and an **on-premises cluster** with at least five points.

### Q18.
Create an AKS cluster with **1 node** using the `Standard_B2s` size. Connect `kubectl` to it and run `kubectl get nodes`. Attach screenshots. *(If you hit a quota error, explain what it means and how you resolved it.)*

### Q19.
What is **Azure Container Registry (ACR)**? Create one, build a Docker image, and push it to your ACR. Attach a screenshot showing the image in the registry.

### Q20.
Create an Azure DevOps organization and project, create a **service connection** to your ACR, push the sample Flask app to Azure Repos, and build a pipeline that pushes the image to ACR.
Upload to a GitHub repository named **azure-devops-week3**:
- Your `azure-pipelines.yml`
- Your Dockerfile and application code
- A `README.md` explaining your setup
- At least **5 Git commits**
- Screenshots of the successful pipeline run and the image in ACR

### Q21.
Research any **three Azure CLI commands** not covered during the training and explain their purpose with an example.

---

## 🎥 Q22. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
- What did you learn during Week 3 (Azure, AKS & CI/CD)?
- Which topic did you enjoy the most?
- Which topic did you find difficult?
- What additional concept did you explore beyond the training?
- What are your learning goals for the capstone week?

---

## ✅ Before you submit

- [ ] All resources deleted (`az group delete ...`) — confirm with a screenshot of the empty resource group list
- [ ] All screenshots attached
- [ ] GitHub repository link included

---

**Best of Luck! 🚀**
**CareerByteCode DevOps Internship**
