# 🚀 CareerByteCode DevOps Internship

# Week 3 Assignment

## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account** — this is a hands-on week.
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload your YAML files, Dockerfiles, and screenshots to your GitHub repository.

> 💳 **Cloud cost warning:** these are real billable resources. Keep everything in **one resource group** and delete it after each lab: `az group delete --name <your-rg> --yes --no-wait`. **Bastion and AKS nodes charge hourly even when idle.**

---

## Questions

### Q1.
Why do we group Azure resources into a **Resource Group**? What advantage does this give you at the end of a lab?

### Q2.
Why does a Virtual Network need an address range like `10.0.0.0/16`? What would go wrong if two VNets you wanted to connect used the same range?

### Q3.
Create a VNet and a subnet, then create a VM inside that subnet. Attach screenshots of your configuration.

### Q4.
Your VM is **Running** and has a **public IP**, but SSH fails. Explain step by step how you would diagnose this. What is the actual cause?

### Q5.
Why does Azure deny all inbound internet traffic by default instead of allowing it? Explain the security thinking behind this.

### Q6.
You installed nginx and `curl http://localhost` works inside the VM, but the browser shows nothing. **Why does this prove the problem is the network and not the application?**

### Q7.
Open ports 22, 80 and 443, and get the nginx page loading in your browser. Attach screenshots of the NSG rules and the working page.

### Q8.
Why is setting the NSG source to **Any** acceptable for port 80 but dangerous for port 22? What should you use instead for SSH?

### Q9.
Your company requires that a database subnet must **never** reach the internet. Explain how you would achieve this with a route table, then build it and prove it works. Attach screenshots.

### Q10.
Why is exposing port 22 on a public IP considered bad practice in a real company? Explain what **Azure Bastion** solves.

### Q11.
Create a VM with **no public IP** and connect to it using Bastion. Explain what you had to enable to make copy/paste work. Attach screenshots.

### Q12.
Why do organisations use **Microsoft Entra ID** instead of just sharing a VM password among the team?

### Q13.
A new engineer joins your team and needs the same access as everyone else. Explain why assigning them to a **group** is better than assigning five individual roles.

### Q14.
Create an Entra ID user and security group, add the user to the group, and grant the group access to your resource group. Attach screenshots of all steps.

### Q15.
A user logs into the Azure Portal successfully but sees an empty dashboard with no resources. **Why does this happen and how would you fix it?**

### Q16.
Why would a company choose **AKS** instead of running Kubernetes on their own servers? Give at least five reasons.

### Q17.
You try to create an AKS cluster and Azure says you have **insufficient quota**. Explain what quota means, why it exists, and the exact steps to request an increase.

### Q18.
Create an AKS cluster, connect `kubectl`, and deploy any application to it. Attach screenshots showing your running pods.

### Q19.
Why would a company use a **private registry (ACR)** instead of pushing images to public Docker Hub? Create an ACR, push an image, and attach a screenshot.

### Q20.
Your pipeline needs to push an image to ACR, but a pipeline has no human to type a password. Explain how a **service connection** solves this, then create one.

### Q21.
Your pipeline is stuck at **"queued"** and never starts. Explain the likely cause and how agents work. Then build a working CI pipeline that pushes an image to ACR.
Create a GitHub repository named **week3-azure-pipeline** containing:
- `azure-pipelines.yml`
- Application code and Dockerfile
- A `README.md` explaining the scenario you solved
- At least **five Git commits**
- Screenshots of the successful pipeline run and the image in ACR

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
