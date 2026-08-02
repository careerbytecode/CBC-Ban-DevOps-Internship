# 🚀 CareerByteCode DevOps Internship

# Week 3 Assignment

## Instructions

- Answer all questions in your own words.
- **Build every resource live in your own Azure account** — this is a hands-on week.
- **Screenshots are mandatory** for every practical question.
- Submit your work in PDF or Markdown format.
- Upload your YAML files, Dockerfiles, and screenshots to your GitHub repository.

> 💳 **Cloud cost warning:** VMs, Bastion, AKS and Public IPs are **billable**. Keep everything in **one resource group** and delete it after every lab: `az group delete --name <your-rg> --yes --no-wait`.

---

## Questions

### Q1.
What is the difference between a **Resource Group**, a **Virtual Network**, and a **Subnet**? Explain with a simple analogy.


# ☁️ Before We Start - What is Azure?

Imagine you want to build a house.

Normally you'd buy:

* Land
* Electricity
* Water
* Security
* Roads

That's a lot of work.

Azure is like a **huge city** built by Microsoft.

Instead of building everything yourself, Microsoft says:

> "Come build your house inside our city."

That "house" could be:

* Website
* Virtual Machine
* Database
* Kubernetes Cluster
* Storage

Everything lives inside Azure.

Suppose your mother says:

> Keep all your toys in one cupboard.

Inside that cupboard:

* One shelf has cars.
* One shelf has dolls.
* One shelf has books.

Here,

Cupboard = Resource Group

Shelf = Virtual Network

Different compartments on the shelf = Subnets

---

# Analogy

Imagine a city.

```
City
 │
 ├── Apartment Building
 │
 │   ├── Floor 1
 │   ├── Floor 2
 │   └── Floor 3
```

Now map this to Azure.

```
Azure
 │
 ├── Resource Group
 │
 │   ├── Virtual Network
 │   │
 │   ├── Subnet 1
 │   ├── Subnet 2
 │   └── Subnet 3
```

---

# Definitions

## 1. Resource Group

Think of it as a **folder**.

It stores Azure resources.

Example:

```
Week3-RG

Contains

VM
Storage
Virtual Network
Public IP
NSG
Disk
AKS
```

Everything stays together.

If you delete the Resource Group...

Everything inside disappears.

---

## 2. Virtual Network (VNet)

Now imagine your home has Wi-Fi.

Only devices connected to that Wi-Fi can communicate easily.

Azure also needs a network.

That network is called a

**Virtual Network (VNet).**

It provides:

* Private communication
* IP addresses
* Security
* Isolation

Without a VNet...

Your VM has nowhere to live.

---

## 3. Subnet

A subnet is a smaller part of a VNet.

Imagine your house.

```
House

Living Room

Kitchen

Bedroom
```

Still one house.

Just divided.

Exactly the same.

```
VNet

Frontend subnet

Backend subnet

Database subnet
```

---

# Diagram

```
Azure Subscription
        │
        │
        ▼
+-------------------------+
|    Resource Group       |
|                         |
|  +-------------------+  |
|  |      VNet         |  |
|  |                   |  |
|  | +-------------+   |  |
|  | | Frontend    |   |  |
|  | | Subnet      |   |  |
|  | +-------------+   |  |
|  |                   |  |
|  | +-------------+   |  |
|  | | Backend     |   |  |
|  | | Subnet      |   |  |
|  | +-------------+   |  |
|  +-------------------+  |
|                         |
| VM                      |
| NSG                     |
| Public IP               |
+-------------------------+
```

---

# How They Work Together

Suppose you're creating a VM.

Azure asks:

Step 1

Where should I save this VM?

Answer:

```
Resource Group
```

Step 2

Which network should it use?

Answer:

```
Virtual Network
```

Step 3

Which part of the network?

Answer:

```
Subnet
```

That's why Azure asks them in this order.

---

# Example

Suppose you're making a shopping website.

```
Week3-RG
```

Inside:

```
Shopping-VNet
```

Inside:

```
Frontend subnet

Backend subnet

Database subnet
```

Then:

```
VM1

Frontend

VM2

Backend

SQL Server
```

Each stays in its own subnet.

---

# Comparison Table

| Feature          | Resource Group                  | Virtual Network (VNet) | Subnet                               |
| ---------------- | ------------------------------- | ---------------------- | ------------------------------------ |
| What is it?      | Logical container               | Private network        | Smaller network inside VNet          |
| Purpose          | Organize Azure resources        | Allow communication    | Divide network into sections         |
| Contains         | VM, Storage, VNet, NSG, etc.    | Subnets                | Virtual machines and other resources |
| Can communicate? | No                              | Yes                    | Yes                                  |
| Similar to       | Folder                          | House                  | Rooms in the house                   |
| Deleted?         | Deletes all contained resources | Deletes network        | Deletes only that subnet             |

---



Think:

```
Folder

↓

Network

↓

Small Network
```

or

```
Resource Group

↓

VNet

↓

Subnet
```

---

# Answer

> A Resource Group is a logical container that organizes related Azure resources, making them easier to manage, monitor, and delete together. A Virtual Network, or VNet, provides a private network where Azure resources can securely communicate with each other. A Subnet is a smaller section within a VNet that helps organize resources based on their role, such as frontend, backend, or database servers. An easy analogy is that a Resource Group is like a cupboard, the VNet is a shelf inside it, and Subnets are compartments on that shelf used to organize different items.

---

# Common Questions

### Can a Resource Group have multiple VNets?

✅ Yes.

---

### Can a VNet have multiple subnets?

✅ Yes.

---

### Can a subnet exist without a VNet?

❌ No.

---

### Can a VM exist without a subnet?

❌ No.

---

### Can a Resource Group contain many different resources?

✅ Yes.



### Q2.
What is the difference between `10.0.0.0/16` and `10.0.1.0/24`? Explain how many addresses each provides and when you would use them.

### Q3.
Create a VNet and subnet in the Azure portal, then attach screenshots showing both.

### Q4.
What is the difference between a **private IP** and a **public IP**? Can a VM work without a public IP? Explain.

### Q5.
Create a VM with no inbound ports open and attempt to SSH. Explain the difference between a **"connection timed out"** error and a **"connection refused"** error, and which one you received.

### Q6.
What is the difference between a **Network Security Group (NSG)** and a **Route Table**? Compare them in a table covering purpose, what they act on, and what they attach to.

### Q7.
Open ports 22, 80 and 443 one at a time, documenting what became possible after each. Attach screenshots.

### Q8.
What is the difference between the NSG source options **Any**, **My IP address**, and **Service Tag**? Which is safest for SSH and why?

### Q9.
What is the difference between a **system route** and a **user-defined route (UDR)**? Create a UDR with next hop **None** and demonstrate its effect. Attach screenshots.

### Q10.
What is the difference between connecting to a VM using a **public IP with port 22 open** versus using **Azure Bastion**? Compare in a table with at least five points.

### Q11.
Deploy Bastion and connect to a VM that has **no public IP**. Then enable copy/paste and demonstrate it. Attach screenshots.

### Q12.
What is the difference between **authentication** and **authorization**? Give one example of each failing.

### Q13.
What is the difference between assigning a role to a **user** and assigning it to a **group**? Explain with a team of 10 people needing access to 5 resource groups.

### Q14.
Create an Entra ID user and group, add the user to the group, and assign a role at resource-group scope. Attach screenshots of every step.

### Q15.
What is the difference between the **Contributor** role and the **Virtual Machine Administrator Login** role? Why might a user be able to restart a VM but not log into it?

### Q16.
What is the difference between a **managed Kubernetes cluster (AKS)** and an **on-premises Kubernetes cluster**? Compare in a table with at least six points.

### Q17.
What is the difference between the AKS **control plane** and the **worker nodes** in terms of who manages them and who pays for them?

### Q18.
Create an AKS cluster with 1 node and connect `kubectl`. Explain the difference between what you saw on **Minikube** in Week 2 and what you see on **AKS** now. Attach screenshots.

### Q19.
What is the difference between **Docker Hub** and **Azure Container Registry**? Create an ACR, push an image to it, and attach a screenshot.

### Q20.
What is the difference between the **Azure Portal** (`portal.azure.com`) and **Azure DevOps** (`dev.azure.com`)? What is a **service connection** and why is it needed to link them?

### Q21.
What is the difference between a **Microsoft-hosted agent** and a **self-hosted agent**? Build a CI pipeline that pushes an image to ACR and show a successful run.
Create a GitHub repository named **azure-week3-assignment** containing:
- `azure-pipelines.yml`
- Dockerfile and application code
- A `README.md` explaining the differences you documented
- At least **five Git commits**
- Screenshots of the pipeline run and the image in ACR

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
