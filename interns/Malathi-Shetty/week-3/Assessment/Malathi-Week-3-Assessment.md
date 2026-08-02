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

### Answer

# Before We Start - What is Azure?

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


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/db71eb39-e6a4-46e2-baed-614c5ae9c812" />



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

### Answer

# Step 1: Why do we even need IP addresses?

Imagine your city.

Every house has a unique address.

Example:

```
House 1 → 101
House 2 → 102
House 3 → 103
```

Without house numbers, the postman wouldn't know where to deliver your parcel.

Similarly, every device on a network needs a unique IP address.

```
Laptop  → 10.0.0.4
VM       → 10.0.0.5
Database → 10.0.0.6
```

An IP address is simply the **address of a device on a network**.

---

# Step 2: What is a CIDR Block?

CIDR (Classless Inter-Domain Routing) tells us:
It's a compact way to write an IP address + its network size together.

Example: 192.168.1.0/24

The /24 part is called the prefix length - it tells you how many bits are reserved for the network, and how many are left for hosts (devices).


> **How big is this network?**

Look at this:

```
10.0.0.0/16
```

It has two parts:

```
10.0.0.0   → Network Address
/16        → Size of the network
```

Think of `/16` as saying:

> "I'm reserving a very large neighborhood."


---

**Q: What does /24 mean in 192.168.1.0/24?**  

- An IP address has 32 bits total.
- /24 means subnet mask is 255.255.255.0 – last 8 bits for hosts.
- /24 means → first 24 bits = network, remaining 8 bits = hosts

```bash
192.168.1  .  0
←  24 bits  → ← 8 bits →
  (network)    (hosts)
```

Subnet mask equivalent: `255.255.255.0`

So `192.168.1.0/24` covers addresses from `192.168.1.0` to `192.168.1.255` - that's `256` addresses in one network.



**Usable hosts Calculation:**
```
Usable Hosts = 2^(32 - CIDR) - 2
```
- /24: 254 (total 256, minus network and broadcast)
- /16: 65534
- /28: 14

**Why subnet?**  
- To isolate groups/devices, improve security, and better utilize address space.

In every subnet, 2 addresses are always reserved:

- First address → Network address / CIDR base IP (identifies the subnet itself)
- Last address → Broadcast address / Broadcast IP (sends data to all devices in subnet)
So usable = Total − 2

**Table: CIDR, Subnet Mask, Total IPs, Usable Hosts**

| CIDR | Subnet Mask   | Total IPs | Usable Hosts |
|------|---------------|-----------|--------------|
| /24  | 255.255.255.0 | **256**       | 254          |
| /16  | 255.255.0.0   | **65,536**    | 65,534       |
| /28  | 255.255.255.240 | **16**      | 14           |

<img width="1372" height="736" alt="image" src="https://github.com/user-attachments/assets/54d04c7e-6a99-4df5-9943-bae46bc8dc2d" />
<img width="1392" height="1007" alt="image" src="https://github.com/user-attachments/assets/53e30ae6-8259-45a4-b7de-b662b1816331" />


---

# Step 3: Analogy

Imagine your school.

The principal asks:

"How many students should we prepare classrooms for?"

Option 1:

```
20 students
```

Small school.

Option 2:

```
500 students
```

Big school - students all sharing one giant classroom. Chaos. Nobody can hear anyone. One person sneezes and everyone knows.

CIDR works exactly like that. Subnetting is like dividing that school into separate classrooms - each with its own group, its own rules, its own door.

A **smaller number after `/` means a bigger network**.

```
/16 → BIG network

/24 → SMALLER network
```

This is opposite of what many beginners expect.

### Benefits:

- **Security** - a breach in one subnet doesn't automatically spread to others
- **Performance** - less broadcast traffic (devices stop shouting to the entire network)
- **Organization** - HR team on one subnet, Engineering on another, Database servers on another
- **Control** - apply different firewall rules per subnet

> On AWS, this is exactly why you have **public subnets** (for web servers) and **private subnets** (for databases) inside a VPC.

---

# Step 4: Real-Life Analogy

Imagine a housing society.

Large Society

```
1000 houses
```

Small Society

```
100 houses
```

Similarly,

```
10.0.0.0/16
```

is a large housing society.

```
10.0.1.0/24
```

is just one small block inside that society.

---

# Step 5: Visual Diagram

```
10.0.0.0/16

+------------------------------------------------------+
|                                                      |
| 10.0.0.x                                              |
| 10.0.1.x                                              |
| 10.0.2.x                                              |
| 10.0.3.x                                              |
| 10.0.4.x                                              |
| .....                                                  |
| 10.0.255.x                                             |
|                                                      |
+------------------------------------------------------+
```

Inside this large network, you can create many smaller `/24` subnets.

Example:

```
10.0.0.0/24

10.0.1.0/24

10.0.2.0/24

10.0.3.0/24
```

All of these fit inside the `/16` network.

---

# Step 6: How Many IP Addresses?

## A. `10.0.0.0/16`

Formula:

```
2^(32-16)

=

2^16

=

65,536 IP addresses
```

So,

```
10.0.0.0/16

↓

65,536 addresses
```

---

## B. `10.0.1.0/24`

Formula:

```
2^(32-24)

=

2^8

=

256 IP addresses
```

So,

```
10.0.1.0/24

↓

256 addresses
```

---

# Step 7: Azure Special Rule

Azure reserves **5 IP addresses in every subnet**.

For a `/24` subnet:

```
Total IPs = 256

Azure reserves = 5

Usable = 251
```

For a `/16` network:

```
65,536 total addresses
```

(The 5 reserved IP rule applies to each subnet you create, not to the whole VNet.)

---

# Step 8: Where Would You Use Them?

## Use `/16` when:

* Building a complete company network
* Creating many subnets
* Planning for future growth
* Hosting hundreds or thousands of VMs

Example:

```
Company

↓

One VNet

↓

Frontend

Backend

Database

AKS

Bastion

VPN
```

You'll need lots of IP addresses.

---

## Use `/24` when:

* Small project
* One subnet
* Development lab
* Testing environment

Example:

```
One VM

One Database

One Jump Server
```

No need for thousands of IP addresses.

---

# Step 9: Relationship Between `/16` and `/24`

```
10.0.0.0/16

│

├──10.0.0.0/24

├──10.0.1.0/24

├──10.0.2.0/24

├──10.0.3.0/24

├──10.0.4.0/24

└── ...
```

Think of `/16` as a **big pizza**.

Each `/24` is **one slice of that pizza**.

---

# Step 10: Comparison Table

| Feature                    | `10.0.0.0/16`                                  | `10.0.1.0/24`                                            |
| -------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Network Size               | Large                                          | Small                                                    |
| Total IP Addresses         | 65,536                                         | 256                                                      |
| Usable IPs in Azure        | Depends on subnets; each subnet reserves 5 IPs | 251 usable (256 total − 5 reserved by Azure)             |
| Best For                   | Large production VNet                          | Single subnet, labs, testing                             |
| Future Expansion           | Excellent                                      | Limited                                                  |
| Contains Multiple Subnets? | Yes                                            | No (it's already a subnet-sized network in most designs) |

---

# Step 11: Remember

```
Smaller CIDR number

↓

Bigger Network

↓

More IP addresses
```

```
/16

↓

BIG
```

```
/24

↓

SMALL
```

Remember:

> **The smaller the number after the slash, the larger the network.**

---


> `10.0.0.0/16` is a larger network that provides 65,536 IP addresses and is commonly used for a Virtual Network because it allows room to create multiple subnets in the future. `10.0.1.0/24` is a smaller network with 256 IP addresses (251 usable in Azure after Azure reserves 5 IPs) and is typically used as an individual subnet for a specific workload such as frontend servers or a development environment. I usually choose `/16` for the overall VNet and `/24` for each subnet because it provides good organization and room for growth.

---

# Common Questions

### Can you create multiple `/24` subnets inside one `/16` VNet?

✅ Yes.

### Is `/16` larger than `/24`?

✅ Yes.

### Which provides more IP addresses?

✅ `/16`

### Does Azure reserve some IP addresses?

✅ Yes, Azure reserves **5 IP addresses in every subnet**.

### What is CIDR?
✅ Classless Inter-Domain Routing (CIDR) is a compact way to write IP address ranges and their network masks.

### Why is CIDR notation useful?
✅ It lets network engineers allocate address space precisely, aggregate routes and keep routing tables smaller.

### How is an IP address structured?
✅ An IPv4 address consists of four 8-bit numbers (octets) ranging from 0 to 255, separated by dots.

### What does the number after the slash mean?
✅ The slash value (e.g. /24) shows how many bits belong to the network prefix; the rest identify individual hosts.

### Refernce:
- https://echoflare.ca/tools/subnet-calculator/
- https://cidr.xyz/


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
