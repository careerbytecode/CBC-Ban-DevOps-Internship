### Q1. What is the difference between a **Resource Group**, a **Virtual Network**, and a **Subnet**? Explain with a simple analogy.

---

## Answer

## Before We Start – What is Azure?

Imagine you want to build a house.

Normally, you would need to arrange everything yourself, including:

- Land
- Electricity
- Water
- Security
- Roads

That's a lot of work.

Azure is like a **huge city built by Microsoft**.

Instead of building everything yourself, Microsoft says:

> **"Come build your house inside our city."**

That "house" could be:

- Website
- Virtual Machine
- Database
- Kubernetes Cluster
- Storage

Everything lives inside Azure.

---

Suppose your mother says:

> **"Keep all your toys in one cupboard."**

Inside that cupboard:

- One shelf has cars.
- One shelf has dolls.
- One shelf has books.

Here:

- **Cupboard = Resource Group**
- **Shelf = Virtual Network (VNet)**
- **Different compartments on the shelf = Subnets**

This analogy helps us understand how Azure organizes its resources.

---

## Analogy

Imagine a city.

```text
City
 │
 ├── Apartment Building
 │
 │   ├── Floor 1
 │   ├── Floor 2
 │   └── Floor 3
```

Now map this to Azure.

```text
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

A **Resource Group** contains Azure resources.

A **Virtual Network (VNet)** provides the private network where those resources communicate.

Inside a VNet, you create **Subnets** to divide the network into smaller sections for different workloads.

## Key Components

### 1. Resource Group

Think of a **Resource Group** as a **folder**.

It is a logical container that stores and organizes Azure resources.

### Example

```text
Week3-RG

Contains

- Virtual Machine (VM)
- Storage Account
- Virtual Network (VNet)
- Public IP
- Network Security Group (NSG)
- Disk
- AKS Cluster
```

Everything related to your project stays together inside the same Resource Group.

If you delete the **Resource Group**, everything inside it is deleted as well.

---

### 2. Virtual Network (VNet)

Now imagine your home has Wi-Fi.

Only the devices connected to that Wi-Fi can communicate with each other easily.

Azure also needs a network.

That network is called a **Virtual Network (VNet)**.

A VNet provides:

- Private communication
- IP addresses
- Security
- Isolation

Without a VNet, your Virtual Machine has nowhere to communicate privately with other Azure resources.

---

### 3. Subnet

A **Subnet** is a smaller section of a Virtual Network.

Imagine your house.

```text
House

Living Room

Kitchen

Bedroom
```

It is still one house.

It is simply divided into different rooms.

Azure works in exactly the same way.

```text
VNet

Frontend Subnet

Backend Subnet

Database Subnet
```

A subnet divides a Virtual Network into smaller logical sections.

This helps organize resources based on their role, such as frontend servers, backend servers, or databases. It also improves security and network management.

---

## Diagram

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/17beda92-0ab6-4212-8590-8b2ced6bc41c" />

---

## How They Work Together

Suppose you're creating a Virtual Machine (VM).

Azure asks you a few questions in a specific order.

### Step 1

**Where should I save this VM?**

Answer:

```text
Resource Group
```

### Step 2

**Which network should this VM use?**

Answer:

```text
Virtual Network (VNet)
```

### Step 3

**Which part of the network should this VM be placed in?**

Answer:

```text
Subnet
```

This is why Azure asks for these resources in the following order:

**Resource Group → Virtual Network → Subnet**

---

## Example

Suppose you're building a shopping website.

```text
Week3-RG
```

Inside it:

```text
Shopping-VNet
```

Inside the Virtual Network:

```text
Frontend Subnet

Backend Subnet

Database Subnet
```

Now place your resources:

```text
VM1
Frontend

VM2
Backend

SQL Server
```

Each resource stays in its appropriate subnet.

This organization improves security, simplifies management, and makes the network easier to scale as your application grows.

---

## Comparison Table

| Feature | Resource Group | Virtual Network (VNet) | Subnet |
|---------|----------------|------------------------|--------|
| What is it? | Logical container | Private network | Smaller network inside a VNet |
| Purpose | Organize Azure resources | Allow secure communication | Divide the network into smaller sections |
| Contains | VM, Storage, VNet, NSG, Public IP, etc. | Subnets | Virtual Machines and other resources |
| Can communicate? | No | Yes | Yes |
| Similar to | Folder | House | Rooms in the house |
| Deleted? | Deletes all contained resources | Deletes the network | Deletes only that subnet |

---

## Quick Memory Trick

Think of Azure resources like this:

```text
Resource Group

↓

Virtual Network (VNet)

↓

Subnet
```

Or even more simply:

```text
Folder

↓

Network

↓

Small Network
```

Remember:

- A **Resource Group** organizes resources.
- A **Virtual Network (VNet)** provides the network.
- A **Subnet** divides that network into smaller sections.

---

## Final Answer

> A **Resource Group** is a logical container that organizes related Azure resources, making them easier to manage, monitor, and delete together.
>
> A **Virtual Network (VNet)** provides a private network where Azure resources can securely communicate with each other.
>
> A **Subnet** is a smaller section within a VNet that helps organize resources based on their role, such as frontend, backend, or database servers.
>
> A simple analogy is that a **Resource Group** is like a cupboard, the **Virtual Network (VNet)** is like a shelf inside the cupboard, and **Subnets** are the individual compartments on that shelf used to organize different items.

---

## Common Questions

### Can a Resource Group have multiple VNets?

✅ Yes.

A Resource Group can contain one or many Virtual Networks, depending on your design.

---

### Can a VNet have multiple subnets?

✅ Yes.

A Virtual Network can contain multiple subnets, such as:

- Frontend
- Backend
- Database
- Bastion
- AKS

---

### Can a subnet exist without a VNet?

❌ No.

A subnet must always belong to a Virtual Network.

---

### Can a VM exist without a subnet?

❌ No.

Every Azure Virtual Machine must be connected to a subnet.

---

### Can a Resource Group contain many different resources?

✅ Yes.

A Resource Group can contain many Azure resources, including Virtual Machines, Storage Accounts, Virtual Networks, Network Security Groups, Public IP addresses, Managed Disks, AKS clusters, and more.

---

### Q2. What is the difference between `10.0.0.0/16` and `10.0.1.0/24`? Explain how many addresses each provides and when you would use them.

---

## Answer

## Step 1: Why Do We Need IP Addresses?

Imagine your city.

Every house has a unique address.

For example:

```text
House 1 → 101
House 2 → 102
House 3 → 103
```

Without house numbers, the postman would never know where to deliver your parcel.

Similarly, every device connected to a network requires a unique IP address.

For example:

```text
Laptop   → 10.0.0.4
VM       → 10.0.0.5
Database → 10.0.0.6
```

An **IP address** is simply the unique address assigned to a device on a network.

---

## Step 2: What is a CIDR Block?

**CIDR (Classless Inter-Domain Routing)** is a compact way of writing an IP address together with its network size.

Example:

```text
192.168.1.0/24
```

The **`/24`** is called the **prefix length**.

It tells us:

- How many bits are reserved for the **network**.
- How many bits remain available for **hosts (devices)**.

---

### How Big Is This Network?

Consider the following network:

```text
10.0.0.0/16
```

It consists of two parts:

```text
10.0.0.0   → Network Address
/16        → Network Prefix Length
```

Think of **`/16`** as saying:

> **"I'm reserving a very large neighborhood."**

---

### What Does `/24` Mean?

Take this example:

```text
192.168.1.0/24
```

An IPv4 address contains **32 bits**.

With **`/24`**:

- The first **24 bits** identify the **network**.
- The remaining **8 bits** identify individual **hosts**.

```text
192.168.1 . 0
← 24 bits → ← 8 bits →
 (Network)   (Hosts)
```

Equivalent subnet mask:

```text
255.255.255.0
```

This network covers the address range:

```text
192.168.1.0
       to
192.168.1.255
```

Total addresses:

```text
256
```

---

## Usable Host Calculation

Formula:

```text
Usable Hosts = 2^(32 − CIDR) − 2
```

> Note: The formula 2^(32 − CIDR) − 2 applies to general IPv4 networking. In Azure, an additional 3 IP addresses are reserved, making 251 usable IP addresses in a /24 subnet.

Examples:

- `/24` → **254 usable hosts**
- `/16` → **65,534 usable hosts**
- `/28` → **14 usable hosts**

---

### Why Do We Create Subnets?

Subnetting helps us:

- Improve security.
- Organize resources.
- Reduce unnecessary broadcast traffic.
- Use IP addresses more efficiently.

Every subnet reserves two special addresses:

- **First Address** → Network Address
- **Last Address** → Broadcast Address

Therefore:

```text
Usable Hosts = Total Addresses − 2
```

---

## CIDR Comparison Table

| CIDR | Subnet Mask | Total IPs | Usable Hosts |
|------|-------------|----------:|-------------:|
| /24 | 255.255.255.0 | 256 | 254 |
| /16 | 255.255.0.0 | 65,536 | 65,534 |
| /28 | 255.255.255.240 | 16 | 14 |

<img width="1372" height="736" alt="image" src="https://github.com/user-attachments/assets/54d04c7e-6a99-4df5-9943-bae46bc8dc2d" />

<img width="1392" height="1007" alt="image" src="https://github.com/user-attachments/assets/53e30ae6-8259-45a4-b7de-b662b1816331" />

---

## Step 3: Understanding `/16` vs `/24` with a School Analogy

Imagine a school.

The school has many classrooms.

```text
School
│
├── Class 1
├── Class 2
├── Class 3
├── Class 4
└── Class 5
```

Now compare this to Azure networking.

```text
Virtual Network (10.0.0.0/16)
│
├── Frontend Subnet (10.0.1.0/24)
├── Backend Subnet  (10.0.2.0/24)
├── Database Subnet (10.0.3.0/24)
└── AKS Subnet      (10.0.4.0/24)
```

The **Virtual Network** is like the entire school, while each **Subnet** is like an individual classroom.

---

## Understanding `10.0.0.0/16`

```text
Network: 10.0.0.0/16
```

This is a **large network**.

It provides:

- **65,536 total IP addresses**
- **65,534 usable IP addresses**

A `/16` network is typically used for the **entire Virtual Network (VNet)** because it provides enough address space for multiple subnets.

---

## Understanding `10.0.1.0/24`

```text
Subnet: 10.0.1.0/24
```

This is a **smaller network** created inside the `/16` Virtual Network.

It provides:

- **256 total IP addresses**
- **254 usable IP addresses**

A `/24` subnet is commonly used for a specific workload, such as:

- Frontend
- Backend
- Database
- AKS
- Bastion

---

## Visual Representation

```text
10.0.0.0/16
│
├── 10.0.1.0/24  → Frontend
├── 10.0.2.0/24  → Backend
├── 10.0.3.0/24  → Database
└── 10.0.4.0/24  → AKS
```

Notice that **all `/24` subnets belong to the same `/16` Virtual Network.**

---

## Why Not Make Everything `/16`?

Imagine giving every classroom in a school the entire school building.

That wouldn't make sense.

Instead, you divide the building into classrooms so that each class has its own dedicated space.

Azure networking follows the same principle.

Using smaller subnets:

- Improves organization.
- Enhances security.
- Simplifies management.
- Makes future expansion easier.

---

## Relationship Between `/16` and `/24`

Think of it like this:

```text
10.0.0.0/16
        │
        ├── 10.0.1.0/24
        ├── 10.0.2.0/24
        ├── 10.0.3.0/24
        └── 10.0.4.0/24
```

A `/16` network is the **parent network**, while the `/24` networks are **child subnets** created from it.

---

---

## Azure Special Rule: Azure Reserves 5 IP Addresses

In Azure, you **cannot use all the IP addresses** in a subnet.

Azure automatically reserves **5 IP addresses** in every subnet for its own internal services.

For example, consider the following subnet:

```text
10.0.1.0/24
```

A `/24` subnet contains:

```text
Total IP Addresses = 256
```

Normally, you might think:

```text
Usable IP Addresses = 254
```

However, Azure reserves **5 IP addresses**, so the number of IP addresses available for your resources becomes:

```text
256 Total IP Addresses
− 5 Reserved by Azure
-----------------------
251 Available IP Addresses
```

### Azure Reserved IP Addresses

| IP Address | Reserved For |
|------------|--------------|
| First IP (`.0`) | Network Address |
| Second IP (`.1`) | Azure Default Gateway |
| Third IP (`.2`) | Azure DNS Mapping |
| Fourth IP (`.3`) | Reserved for Future Azure Services |
| Last IP (`.255`) | Broadcast (Reserved by Azure) |

> **Note:** Although Azure reserves the last IP address, Azure VNets do **not** support traditional Layer 2 broadcast like on-premises networks. It is simply unavailable for customer use.

---

## Real Azure Example

Suppose you create the following Virtual Network:

```text
VNet
10.0.0.0/16
```

Inside this Virtual Network, you create multiple subnets:

```text
Frontend Subnet  → 10.0.1.0/24

Backend Subnet   → 10.0.2.0/24

Database Subnet  → 10.0.3.0/24

AKS Subnet       → 10.0.4.0/24
```

Each subnet provides approximately **251 usable IP addresses** in Azure after Azure reserves its required IP addresses.

This design allows you to isolate workloads while keeping everything inside a single Virtual Network.

---

## `/16` vs `/24` Comparison

| Feature | `10.0.0.0/16` | `10.0.1.0/24` |
|---------|---------------|---------------|
| Network Type | Large Virtual Network | Smaller Subnet |
| Total IP Addresses | 65,536 | 256 |
| Usable Hosts (General Networking) | 65,534 | 254 |
| Available IPs in Azure | Azure reserves 5 IPs per subnet | 251 usable after Azure reservations |
| Best Use | Entire VNet | Individual application subnet |
| Example | Company Network | Frontend, Backend, Database, AKS |

---

## Quick Revision

Remember these points:

- **`/16`** creates a large network.
- **`/24`** creates a smaller subnet inside that network.
- A `/16` network can contain many `/24` subnets.
- Azure reserves **5 IP addresses** in every subnet.
- Smaller subnets improve organization, security, and scalability.

---

## Interview Answer

> **`10.0.0.0/16`** represents a large Virtual Network containing **65,536 IP addresses**, making it suitable for creating multiple subnets.
>
> **`10.0.1.0/24`** is a smaller subnet within that Virtual Network. It contains **256 IP addresses**, but in Azure, only **251 IP addresses are available** because Azure reserves **5 IP addresses** for internal networking services.
>
> In practice, a `/16` network is commonly used for the overall Virtual Network, while `/24` subnets are used to separate workloads such as frontend, backend, database, and AKS resources.

---

## Common Questions

### Can a `/16` network contain multiple `/24` subnets?

✅ Yes.

A `/16` Virtual Network can contain many `/24` subnets, depending on your network design.

---

### Which is larger: `/16` or `/24`?

✅ `/16` is much larger than `/24`.

A `/16` network contains **65,536 IP addresses**, whereas a `/24` subnet contains **256 IP addresses**.

---

### Why don't we create one huge `/16` subnet for everything?

Using separate `/24` subnets provides:

- Better security
- Easier management
- Clear workload separation
- Simpler network troubleshooting
- Better scalability

---

### Why does Azure reserve 5 IP addresses?

Azure reserves these IP addresses to provide essential platform services such as routing, DNS, and internal networking. These reserved addresses cannot be assigned to your resources.

---

#### Q3.

Create a VNet and subnet in the Azure portal, then attach screenshots showing both.

#### Answer

#### Before We Start

Remember what we learned?

<img width="452" height="480" alt="image" src="https://github.com/user-attachments/assets/8c365ad8-0143-4f4b-bfb7-5b4854e83f05" />

Azure requires you to create these resources in the following order.

---

#### Analogy

Imagine your mom says:

> "We're building a new house."

First, you buy the land.

```text
Land
```

Next, you build the house.

```text
House
```

Finally, you divide the house into rooms.

```text
Living Room

Kitchen

Bedroom
```

Azure works in exactly the same way.

```text
Resource Group

↓

Virtual Network

↓

Subnet
```

---

#### Step 1: Sign In to Azure

Open your browser and go to:

**https://portal.azure.com**

Sign in with your Azure account.

After signing in, you'll see the Azure portal dashboard.

<img width="1608" height="990" alt="image" src="https://github.com/user-attachments/assets/684c87fc-067e-43c0-b29b-52e286f28114" />

---

#### Step 2: Create a Resource Group

##### Why?

Azure needs a place to organize and manage all related resources together.

Think of it as creating a folder before saving files on your computer.

#### Navigation

```text
☰ Menu

↓

Resource Groups

↓

Create
```

<img width="1182" height="1176" alt="image" src="https://github.com/user-attachments/assets/c36667f2-572f-466f-a033-c8cf970eab65" />

---

#### Enter the Following Values

| Field | Value |
|-------|-------|
| Subscription | Your Azure Subscription |
| Resource Group Name | `week3-rg` |
| Region | East US (or the same region that you will use for all resources) |

> **Important:** Use the **same region** for every resource in this assignment to avoid compatibility issues.

---

Click:

```text
Review + Create

↓

Create
```

Wait approximately **20–30 seconds** for the deployment to complete.

<img width="698" height="1172" alt="image" src="https://github.com/user-attachments/assets/b7346b77-229b-442d-8468-9977766dbf26" />

<img width="2483" height="695" alt="image" src="https://github.com/user-attachments/assets/fa3f82a8-0151-4e51-baa0-c08b462fd4f8" />

---

#### Step 3: Create a Virtual Network (VNet)

Search for:

```text
Virtual Networks
```

Click:

```text
Create
```

<img width="983" height="1171" alt="image" src="https://github.com/user-attachments/assets/f4b4ce24-1de9-43c5-85bf-d471fe9e2459" />

---

#### Basics Tab

Enter the following values:

| Field | Value |
|-------|-------|
| Resource Group | `week3-rg` |
| Name | `week3-vnet` |
| Region | Same region as the Resource Group |

Click:

```text
Next
```

---

#### Step 4: Configure the IP Address Space

This is where the concepts from **Q2** become useful.

Azure may automatically populate the address space with:

```text
10.0.0.0/16
```

If it does, keep the default value.

If it doesn't, enter:

```text
10.0.0.0/16
```

---

You'll also see a default subnet.

Rename it.

Example:

```text
default

↓

frontend-subnet
```

Set the **Subnet Address Range** to:

```text
10.0.1.0/24
```

Your network configuration should now look like this:

```text
week3-vnet

10.0.0.0/16

│

└── frontend-subnet

    10.0.1.0/24
```

Click:

```text
Review + Create

↓

Create
```

Wait until Azure displays the following message:

```text
Deployment completed.
```

<img width="748" height="1158" alt="image" src="https://github.com/user-attachments/assets/45e27132-77bb-42e7-8116-48029c1a211a" />

<img width="2552" height="1177" alt="image" src="https://github.com/user-attachments/assets/a3f1c211-6ce3-4245-b49c-25b8ea0402ec" />

<img width="937" height="1177" alt="image" src="https://github.com/user-attachments/assets/26f44369-e577-4817-abed-208be90152f3" />

<img width="806" height="1167" alt="image" src="https://github.com/user-attachments/assets/ccce5d59-2bb3-4d78-96ac-775e1b83d4cf" />

<img width="2528" height="1188" alt="image" src="https://github.com/user-attachments/assets/2be7641f-b566-4bbc-9c53-a66856a83fa5" />

<img width="2558" height="972" alt="image" src="https://github.com/user-attachments/assets/ed950832-aeab-4f3f-981f-e7ffc36be811" />

<img width="2560" height="1474" alt="image" src="https://github.com/user-attachments/assets/8eeeac18-0e37-4c4f-bbb0-c1fc2afb8cf9" />

---

#### What Just Happened?

You created the following Azure networking resources:

```text
week3-rg
    │
    ▼
week3-vnet
    │
    ▼
frontend-subnet
```

These resources form the foundation of almost every Azure network deployment.

---

#### Step 5: Verify the Virtual Network

Navigate to:

```text
Virtual Networks

↓

week3-vnet
```

You should see:

```text
Address Space

10.0.0.0/16
```

Click:

```text
Subnets
```

You should see the following subnet:

```text
frontend-subnet

10.0.1.0/24
```

Congratulations!

You have successfully created your first Azure virtual network.

---

#### Architecture Diagram

<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/597e954d-329b-4b13-ab8e-90cb5fd67201" />

---

#### Why Do We Create a `/16` VNet?

A `/16` VNet provides enough address space to create multiple subnets as your infrastructure grows.

For example:

```text
10.0.1.0/24
Frontend

10.0.2.0/24
Backend

10.0.3.0/24
Database

10.0.4.0/24
AKS
```

All of these subnets fit within the following VNet address space:

```text
10.0.0.0/16
```

This is why most organizations create a **larger VNet** first and then divide it into **smaller subnets** based on workload requirements.

---

#### Common Beginner Mistakes

**Incorrect**

Creating the VNet in one region and the virtual machine in another region.

**Correct**

Always deploy related resources in the same Azure region.

---

**Incorrect**

Creating a `/24` VNet.

**Correct**

Use a `/16` address space for the VNet and `/24` address spaces for subnets unless your assignment or design requires a different configuration.

---

**Incorrect**

Creating resources in different Resource Groups.

**Correct**

Keep all resources inside **`week3-rg`**.

This also makes cleanup much easier.

```bash
az group delete --name week3-rg --yes --no-wait
```

Deleting the Resource Group removes every resource contained within it.

---

#### Interview Answer

> A Virtual Network (VNet) is a private network in Azure that enables Azure resources to communicate securely with one another. A subnet is a smaller logical division within the VNet that helps organize resources based on their function, such as frontend, backend, or database workloads. In this lab, I created a VNet with the address space `10.0.0.0/16` and a subnet with the address range `10.0.1.0/24`. This design allows room for future expansion while maintaining an organized network structure.

---

#### Q4.

What is the difference between a **Private IP** and a **Public IP**? Can a VM work without a Public IP? Explain.

#### Answer

Networking is one of the core concepts in Azure, and understanding IP addressing is essential before working with virtual machines, load balancers, Azure Bastion, or Network Security Groups (NSGs).

This is also a common interview question and forms the foundation for concepts covered in **Q5, Q7, Q10, and Q11**.

---

#### Step 1: What Is an IP Address?

An IP address is a unique network address assigned to a device so that it can communicate with other devices over a network.

Think of it as a home address.

If someone wants to send you a letter, they need your home address.

Similarly, when one computer wants to communicate with another, it needs the destination computer's IP address.

Example:

```text
VM

↓

10.0.1.4
```

The IP address shown above identifies the virtual machine within the network.

---

#### Step 2: Types of IP Addresses

There are two main types of IP addresses used in Azure networking:

1. Private IP
2. Public IP

---

#### Analogy

Imagine you live in an apartment building.

Your apartment has:

```text
Apartment Number

Flat 203
```

and

```text
Building Address

ABC Apartments,
Mumbai
```

The **apartment number** is meaningful only to people inside the building.

The **building address** is what people outside the building use to locate it.

Azure networking works in the same way.

```text
Apartment Number

↓

Private IP

Building Address

↓

Public IP
```

---

#### Real-World Example

Suppose you work in an office.

Inside the office, there are different departments:

```text
HR

Finance

IT
```

Employees can easily move between departments because they are inside the same office.

However, someone outside the company cannot directly enter the office without first accessing the main entrance.

Azure networking follows the same principle.

---

#### What Is a Private IP?

A Private IP address is used for communication **within an Azure Virtual Network (VNet)**.

Example:

```text
VM1

10.0.1.4
```

```text
Database

10.0.1.5
```

Both resources belong to the same Virtual Network.

They can communicate directly using their Private IP addresses.

However, these IP addresses are **not accessible from the internet**.

---

#### ASCII Diagram

```text
Internet

❌ Cannot see

10.0.1.4

10.0.1.5
```

Only resources inside the Virtual Network can communicate directly using these Private IP addresses.

---

#### What Is a Public IP?

A Public IP address is accessible over the internet.

Example:

```text
20.120.50.10
```

Anyone who knows this IP address can attempt to connect, provided security rules such as Network Security Groups (NSGs) allow the traffic.

Example:

```text
Your Laptop

↓

Internet

↓

20.120.50.10

↓

Azure VM
```
---

#### ASCII Diagram

```text
               Internet
                   │
                   ▼
              Public IP
           20.120.50.10
                   │
                   ▼
               Azure VM
                   │
                   ▼
              Private IP
               10.0.1.4
```

The Public IP is like the **main entrance** to a building, while the Private IP is like the **room number** inside that building.

---

#### Can a Virtual Machine Work Without a Public IP?

**Yes. Absolutely.**

This surprises many beginners, but an Azure Virtual Machine **does not require a Public IP address** to operate.

A VM without a Public IP can still:

- Boot successfully.
- Communicate with other virtual machines in the same Virtual Network.
- Connect to Azure services, depending on the network configuration.
- Be accessed securely using services such as Azure Bastion.

The only limitation is that you **cannot connect directly to the VM from the public internet**.

---

#### Example 1: Virtual Machine with a Public IP

```text
Your Laptop

↓

Internet

↓

Public IP

↓

Azure VM
```

You can connect directly using SSH, provided that **port 22** is allowed by the Network Security Group (NSG).

---

#### Example 2: Virtual Machine Without a Public IP

```text
Your Laptop

↓

Internet

↓

Azure Bastion

↓

Azure VM

Private IP Only
```

The virtual machine continues to run normally, but it is **not exposed directly to the internet**.

This is considered a more secure deployment model and is commonly used in production environments.

---

#### Comparison Table

| Feature | Private IP | Public IP |
|---------|------------|-----------|
| Visible on the Internet | No | Yes |
| Used Inside a Virtual Network | Yes | No |
| Can the Internet Connect Directly? | No | Yes (if permitted by the NSG) |
| Security | More secure because it is private | Less secure because it is internet-facing |
| Assignment | Usually remains with the VM's network configuration | Can be Static or Dynamic |
| Example | `10.0.1.4` | `20.x.x.x` |

---

#### Real-World Example

Consider an e-commerce application.

```text
Web Server

↓

Public IP
```

Customers need to access the website, so the web server requires a Public IP.

However:

```text
Database Server

↓

Private IP
```

Customers should **never** connect directly to the database server.

Only the web server should communicate with the database.

The architecture looks like this:

```text
Internet

↓

Public IP

↓

Web Server

↓

Private IP

↓

Database
```

This is a common architecture used in production environments.

---

#### Why Not Assign a Public IP to Every Virtual Machine?

Imagine every room in your house had its own front door that opened directly onto the street.

That would make it much easier for unwanted visitors to try every door.

Instead, most houses have:

```text
One Main Gate

↓

House

↓

Rooms
```

Azure follows the same design principle.

Only resources that must be accessible from the internet should have a Public IP address.

Internal resources should use only Private IP addresses whenever possible.

This approach improves security and reduces the attack surface.

---

#### Common Beginner Mistakes

**Incorrect**

Thinking that every virtual machine requires a Public IP address to function.

**Correct**

A virtual machine requires a Public IP only when it needs to be accessed directly from the internet.

---

**Incorrect**

Assuming a Private IP address can be accessed from your home or any internet connection.

**Correct**

A Private IP address is accessible only within its Virtual Network or through configured private connectivity solutions such as Azure VPN Gateway, ExpressRoute, or Azure Bastion.

---

**Incorrect**

Assuming that assigning a Public IP automatically allows users to connect to the virtual machine.

**Correct**

A Public IP address only makes the virtual machine reachable from the internet.

Access still depends on:

- Network Security Group (NSG) rules
- The required service running on the VM (for example, SSH or RDP)
- Authentication and authorization

---

#### Interview Answer

> A Private IP address is used for communication within an Azure Virtual Network and is not accessible from the public internet. A Public IP address is internet-routable and enables external users to connect to Azure resources, provided that security rules allow the traffic. A virtual machine can operate without a Public IP because it can still communicate within the Virtual Network and can be accessed securely using services such as Azure Bastion. In production environments, many organizations keep application servers and database servers on Private IP addresses to minimize internet exposure and improve security.

---

#### Quick Revision

```text
Private IP

↓

Inside Virtual Network

↓

More Secure

↓

Not Reachable from the Internet
```

```text
Public IP

↓

Internet Facing

↓

Direct Access Possible

↓

Requires Proper Security Controls
```

---

#### Q5.

Create a VM with no inbound ports open and attempt to SSH. Explain the difference between a **"Connection Timed Out"** error and a **"Connection Refused"** error, and identify which one you received.

#### Answer

This is your first hands-on Azure networking troubleshooting exercise.

It introduces several important networking concepts that are commonly discussed during technical interviews and frequently encountered in real-world environments.

In this lab, you will learn:

- How to create your first Azure Virtual Machine (VM)
- What SSH is and why it is used
- What **No inbound ports** means
- Why an SSH connection can fail
- The difference between **Connection Timed Out** and **Connection Refused**

---

#### Step 1: What Is a Virtual Machine (VM)?

A Virtual Machine (VM) is a software-based computer that runs inside Microsoft's Azure datacenters.

Just like a physical computer, a virtual machine includes:

- CPU
- Memory (RAM)
- Storage
- An operating system

The only difference is that the hardware is virtualized and managed by Azure.

Think of it like this:

```text
Your Laptop

        =

Azure Virtual Machine
```

Instead of running in your home or office, the VM runs in Microsoft's cloud infrastructure.

---

#### Step 2: What Is SSH?

SSH stands for **Secure Shell**.

It is a secure network protocol used to remotely connect to and manage Linux servers.

Rather than physically accessing the machine, you can securely run commands from your own computer.

This makes SSH one of the most commonly used administration tools for Linux virtual machines.

---

#### Analogy

Imagine your friend lives in another apartment building.

You want to visit.

There is one main entrance.

If the entrance is locked, you cannot enter the building.

SSH works in a similar way.

Port **22** acts as the entrance used for SSH connections.

If that port is blocked, you cannot establish a remote connection.

---

#### Step 3: What Is a Port?

Think of a house with multiple doors.

```text
House

🚪 Front Door

🚪 Back Door

🚪 Garage Door
```

Each door serves a different purpose.

Similarly, computers have multiple communication endpoints called **ports**.

Each port is designed for a specific type of network communication.

Some commonly used ports are:

| Port | Purpose |
|------|---------|
| 22 | SSH (Linux Remote Login) |
| 80 | HTTP |
| 443 | HTTPS |

---

#### Step 4: What Does "No Inbound Ports Open" Mean?

Imagine a house where every door is locked.

```text
All Doors Locked
```

No one can enter.

Azure works the same way.

When you select:

```text
No Inbound Ports
```

Azure does **not** create a Network Security Group (NSG) rule that allows traffic from the internet.

As a result, even though the virtual machine is running, incoming network connections are blocked.

---

#### ASCII Diagram

```text
Your Laptop
      │
      ▼
Internet
      │
      ▼
Azure VM

SSH Port 22

❌ Closed
```

Result:

The SSH connection fails because traffic cannot reach the virtual machine.

---

#### Step 5: Practical Lab

##### Create a Virtual Machine

Navigate to:

```text
Azure Portal

↓

Virtual Machines

↓

Create

↓

Azure Virtual Machine
```

---

#### Basics Tab

Enter the following values:

| Field | Value |
|------|-------|
| Resource Group | `week3-rg` |
| VM Name | `week3-vm` |
| Region | Same region as the VNet |
| Image | Ubuntu Server 24.04 LTS (or the latest available Ubuntu LTS version) |
| Size | Standard B1s (or another free or low-cost size available in your subscription) |
| Authentication | SSH Public Key (recommended) or Password if permitted for your lab |

---

#### Networking Tab

Configure the following settings:

| Field | Value |
|------|-------|
| Virtual Network | `week3-vnet` |
| Subnet | `frontend-subnet` |

Now look carefully.

You'll see the following option:

```text
Public Inbound Ports
```

Select:

```text
None
```

This is the most important configuration in this lab.

By selecting **None**, Azure does **not** create a Network Security Group (NSG) rule that allows inbound SSH traffic on port **22**.

Click:

```text
Review + Create

↓

Create
```

Wait until the deployment completes successfully.

---

#### Step 6: Attempt an SSH Connection

After the virtual machine has been deployed:

Open:

```text
VM

↓

Overview
```

If the VM has a Public IP address, note the IP address.

From your terminal, run the following command:

```bash
ssh azureuser@<public-ip>
```

Example:

```bash
ssh azureuser@20.120.xxx.xxx
```

---

#### What Happens?

In most cases, you'll receive an error similar to:

```text
Connection timed out
```

---

#### Why Does This Happen?

Let's trace the network path.

```text
Laptop

↓

Internet

↓

Azure Network

↓

Network Security Group (NSG)

↓

❌ Traffic Blocked

↓

Virtual Machine
```

The SSH request never reaches the virtual machine.

Instead, the Network Security Group silently drops the incoming packets.

Your computer waits for a response.

It continues waiting until the connection attempt eventually expires.

The result is:

```text
Connection timed out
```

---

#### What Does "Connection Timed Out" Mean?

Imagine calling someone on the phone.

The phone keeps ringing.

No one answers.

Eventually, the call ends automatically.

```text
Call Ended
```

The same behavior occurs during a network timeout.

Your computer sends the request but never receives a response from the destination.

---

#### ASCII Diagram

```text
Laptop

↓

"Hello?"

↓

No reply

↓

Still waiting

↓

Timeout
```

A timeout indicates that the request never received a response before the waiting period expired.

---

#### What Does "Connection Refused" Mean?

Now consider a different situation.

This time, the request successfully reaches the destination.

However, the server immediately rejects the connection because the required service is unavailable or not accepting requests.

Think of someone opening the door and saying:

> "Sorry, you can't come in."

Unlike a timeout, the server actually responds.

It simply refuses the connection.

---

#### Network Flow

```text
Laptop

↓

Virtual Machine

↓

"I received your request."

↓

"SSH service isn't accepting connections."

↓

Connection Refused
```

A **Connection Refused** error means the request reached the virtual machine, but the SSH service was unavailable, stopped, or not listening on port **22**.

---

---

#### ASCII Comparison

##### Connection Timed Out

```text
Laptop

↓

Internet

↓

❌ Firewall / NSG

↓

Virtual Machine Never Receives the Request
```

---

##### Connection Refused

```text
Laptop

↓

Internet

↓

Virtual Machine

↓

SSH Service Rejects the Connection
```

---

#### Comparison Table

| Feature | Connection Timed Out | Connection Refused |
|---------|----------------------|--------------------|
| Does the request reach the VM? | No | Yes |
| Common Cause | Firewall, NSG, or Route blocking the traffic | SSH service is stopped, not listening, or port 22 is closed on the VM |
| Response Time | Long (waits until timeout) | Immediate |
| Does the VM respond? | No | Yes |
| Common Azure Cause | Port 22 blocked by the NSG | SSH service stopped or misconfigured |

---

#### Which Error Will You Receive?

The assignment specifically states:

> Create a VM with **No Inbound Ports Open**.

In this scenario, the expected result is usually:

```text
Connection timed out
```

##### Why?

Because port **22** is blocked by the **Network Security Group (NSG)**, the SSH request never reaches the virtual machine.

Since the VM never receives the request, it cannot send a response.

Your computer waits until the connection attempt times out.

---

#### Screenshots for the Assignment

Capture screenshots of the following:

1. **VM Overview**
2. **Networking** page showing that there is **no inbound rule allowing port 22**
3. Your terminal displaying the SSH error (for example, **Connection timed out**)

These screenshots demonstrate that the VM was deployed successfully while inbound SSH access was intentionally blocked.

---

#### Common Beginner Mistakes

**Incorrect**

Thinking the virtual machine is not running because SSH fails.

**Correct**

The virtual machine is running correctly.

The Network Security Group is preventing the SSH request from reaching the VM.

---

**Incorrect**

Assuming a Public IP address automatically allows SSH access.

**Correct**

A Public IP address only makes the virtual machine reachable from the internet.

SSH access also requires:

- An NSG rule allowing inbound traffic on port **22**
- The SSH service running on the virtual machine
- Valid authentication credentials

---

**Incorrect**

Confusing **Connection Timed Out** with **Connection Refused**.

Remember:

```text
Connection Timed Out

↓

No response received
```

```text
Connection Refused

↓

The server responded,

but rejected the connection.
```

---

#### Interview Answer

> A **Connection Timed Out** error indicates that the SSH request never reached the virtual machine. This usually occurs because a firewall, Network Security Group (NSG), or routing rule blocked the traffic. A **Connection Refused** error indicates that the request successfully reached the virtual machine, but the SSH service was not accepting connections on port 22. In this lab, the virtual machine was created with **No Inbound Ports Open**, so the Network Security Group blocked the SSH traffic before it reached the VM. As a result, the expected error was **Connection Timed Out**.

---

#### Quick Revision

```text
No Inbound Port

↓

NSG Blocks SSH

↓

Request Never Reaches VM

↓

Connection Timed Out
```

```text
Port Open

↓

VM Receives Request

↓

SSH Service Unavailable

↓

Connection Refused
```

---

#### Q6.

What is the difference between a **Network Security Group (NSG)** and a **Route Table**?

#### Answer

This is one of the most commonly misunderstood Azure networking concepts.

Many assume that a **Network Security Group (NSG)** and a **Route Table** perform the same function because both influence network traffic.

In reality, they serve **completely different purposes**.

Understanding this difference is essential when designing, securing, and troubleshooting Azure networks.

---

#### Before We Begin

Think about traveling from one city to another.

Two things determine whether your journey is successful:

1. Which **road** you take.
2. Whether you're **allowed** to pass through the security checkpoint.

Azure networking works in exactly the same way.

- A **Route Table** decides **where traffic should go**.
- A **Network Security Group (NSG)** decides **whether the traffic is allowed or denied**.

---

#### Analogy

Imagine you're driving to a company's office.

First, your GPS determines which road to take.

```text
Home

↓

GPS

↓

Office
```

After you arrive, you reach the security gate.

The security guard checks whether you are authorized to enter.

```text
Office Gate

↓

Security Guard

↓

Allow or Deny
```

This is exactly how Azure networking works.

```text
Route Table

↓

Chooses the Path

↓

Network Security Group

↓

Allows or Denies Traffic
```

---

#### What Is a Route Table?

A **Route Table** determines **where network traffic should be sent**.

It does **not** decide whether traffic is allowed.

Instead, it selects the next destination for each packet.

Think of it as a navigation system.

For example:

```text
VM

↓

Internet
```

or

```text
VM

↓

Azure Firewall
```

or

```text
VM

↓

Virtual Appliance
```

The Route Table decides which path the packet follows.

---

#### Real-World Example

Imagine driving to an airport.

Your GPS may suggest:

```text
Highway

↓

Airport
```

or

```text
City Road

↓

Airport
```

The GPS only chooses the route.

It does not decide whether you are allowed to enter the airport.

That decision is made by airport security.

Similarly, an Azure Route Table only determines the network path.

---

#### What Is a Network Security Group (NSG)?

A **Network Security Group (NSG)** is a virtual firewall that filters inbound and outbound network traffic.

It evaluates traffic using **Allow** and **Deny** rules.

For example:

```text
SSH

Port 22

↓

Allow
```

or

```text
RDP

Port 3389

↓

Deny
```

Unlike a Route Table, an NSG does **not** choose where traffic goes.

It only decides whether the traffic is permitted to continue.

---

#### ASCII Diagram

```text
Internet
     │
     ▼
Network Security Group

Allow?

 ├── Yes → Continue
 └── No  → Drop Packet
```

If the traffic matches an **Allow** rule, Azure forwards it.

If it matches a **Deny** rule, Azure drops the packet.

---

---

#### How a Route Table and an NSG Work Together

A Route Table and a Network Security Group work together during packet processing, but each has a different responsibility.

The Route Table determines **where the packet should go**.

The Network Security Group determines **whether the packet is allowed to continue**.

Neither resource replaces the other.

Both are required to control network traffic effectively.

---

#### Traffic Flow

```text
Source

↓

Route Table

(Where should the packet go?)

↓

Next Hop Selected

↓

Network Security Group

(Is the traffic allowed?)

↓

Allow

↓

Destination
```

If the NSG blocks the traffic, the packet is discarded even though the Route Table selected a valid destination.

---

#### Example 1: Route Is Correct, but NSG Blocks Traffic

Suppose your virtual machine needs to connect to another server.

The Route Table correctly forwards the traffic.

```text
VM

↓

Route Table

↓

Destination VM
```

However, the NSG contains the following rule:

```text
Port 22

↓

Deny
```

Result:

```text
Packet

↓

NSG

↓

Blocked
```

Even though the routing is correct, communication fails because the NSG blocks the traffic.

---

#### Example 2: NSG Allows Traffic, but the Route Is Incorrect

Now consider the opposite situation.

The NSG allows SSH traffic.

```text
SSH

Port 22

↓

Allow
```

However, the Route Table sends the packet to the wrong destination.

```text
VM

↓

Wrong Next Hop

↓

Packet Lost
```

Although the NSG allows the connection, the packet never reaches the intended destination because the routing path is incorrect.

---

#### Complete Network Flow

```text
Virtual Machine
        │
        ▼
Route Table
(Select Next Hop)
        │
        ▼
Network Security Group
(Check Security Rules)
        │
        ▼
Allow
        │
        ▼
Destination
```

Both routing and security must be configured correctly for successful communication.

---

#### Comparison Table

| Feature | Network Security Group (NSG) | Route Table |
|---------|-------------------------------|-------------|
| Primary Purpose | Controls network traffic | Determines the path for network traffic |
| Main Function | Allow or Deny traffic | Select the next hop |
| Acts Like | Firewall | GPS or Navigation System |
| Makes Security Decisions | Yes | No |
| Determines Traffic Path | No | Yes |
| Uses Rules | Security Rules | Routes |
| Common Configuration | Allow SSH, HTTPS, RDP | Internet, Virtual Appliance, VPN Gateway, Azure Firewall |
| Can Block Traffic | Yes | No |
| Can Redirect Traffic | No | Yes |

---

#### Real-World Example

Consider an organization with the following architecture.

```text
Internet

↓

Azure Firewall

↓

Application Server

↓

Database Server
```

The Route Table sends internet-bound traffic through the Azure Firewall.

The Network Security Group allows only the required ports, such as HTTPS on port **443**, while blocking unnecessary traffic.

Together they provide both **correct routing** and **network security**.

---

#### Common Beginner Mistakes

**Incorrect**

Assuming that a Route Table blocks unwanted traffic.

**Correct**

A Route Table only determines the destination of network traffic.

It does not inspect or block packets.

---

**Incorrect**

Assuming that an NSG decides where traffic should be sent.

**Correct**

An NSG only evaluates security rules.

It does not determine the next hop or routing path.

---

**Incorrect**

Believing that configuring only one of these resources is sufficient.

**Correct**

A secure Azure network typically requires both:

- A Route Table for directing traffic.
- A Network Security Group for controlling access.

---

---

#### Interview Answer

> A **Network Security Group (NSG)** is a virtual firewall that controls inbound and outbound network traffic by using **Allow** and **Deny** security rules. A **Route Table** determines the path that network traffic follows by selecting the appropriate next hop. In simple terms, the Route Table decides **where traffic goes**, while the NSG decides **whether the traffic is allowed**. In most Azure environments, both services work together to provide secure and efficient network communication.

---

#### Quick Revision

```text
Route Table

↓

Where should the packet go?

↓

Next Hop
```

```text
Network Security Group

↓

Should the packet be allowed?

↓

Allow or Deny
```

---

#### One-Minute Revision

| Resource | Main Responsibility | Think Of It As |
|----------|----------------------|----------------|
| Route Table | Determines the network path | GPS or Navigation System |
| Network Security Group | Controls network access | Security Guard or Firewall |

Remember this simple rule:

> **Route Tables control the path. Network Security Groups control access.**

This single sentence is often enough to answer the interview question correctly.

---

#### Architecture Diagram

```text
                 Internet
                     │
                     ▼
              Route Table
          (Select Next Hop)
                     │
                     ▼
        Network Security Group
        (Allow or Deny Traffic)
                     │
           ┌─────────┴─────────┐
           │                   │
         Allow               Deny
           │                   │
           ▼                   ▼
     Destination VM       Packet Dropped
```

---

#### Key Takeaways

- A **Route Table** determines where network traffic should be sent.
- A **Network Security Group** determines whether traffic is allowed or denied.
- A Route Table does not inspect or block packets.
- An NSG does not determine the next hop.
- Both resources work together to provide secure and reliable network communication.
- Most Azure production environments use both Route Tables and NSGs together.

---

#### Q7.

Open ports **22**, **80**, and **443** one at a time, documenting what became possible after each. Attach screenshots.

#### Answer

This lab demonstrates how opening different ports in a Network Security Group (NSG) enables specific services on an Azure Virtual Machine.

The objective is **not** to open all three ports simultaneously.

Instead, you will:

1. Open **Port 22** and observe what changes.
2. Open **Port 80** and observe what changes.
3. Open **Port 443** and observe what changes.

By completing these steps one at a time, you'll understand the purpose of each port and the services it enables.

---

#### Before You Begin

Remember that an Azure Virtual Machine is protected by a **Network Security Group (NSG)**.

By default, if an inbound rule does not allow traffic on a particular port, Azure blocks that traffic.

As you open each port, you'll see how the VM's capabilities change.

---

#### Step 1: House Analogy

Imagine your house has three different doors.

```text
Door 1 → Friend

Door 2 → Delivery Person

Door 3 → Family
```

Each door serves a different purpose.

Similarly, a computer has many communication endpoints called **ports**.

Each port is used by a specific service.

---

#### What Is a Port?

A port is a logical communication endpoint identified by a **port number**.

Think of it like an apartment number inside a building.

```text
Building

Apartment 22

Apartment 80

Apartment 443
```

Each apartment contains different people.

Likewise, different services use different ports.

```text
Port 22

↓

SSH
```

```text
Port 80

↓

HTTP Website
```

```text
Port 443

↓

HTTPS Secure Website
```

---

#### Step 2: Current Situation

At the moment, your virtual machine is protected by an NSG, and all inbound ports are closed.

```text
Internet

↓

Azure

↓

Network Security Group (NSG)

↓

Virtual Machine

All Ports Closed
```

Because no inbound rules allow traffic, external users cannot connect to the virtual machine.

---

## Part A — Open Port 22

#### Why Open Port 22?

Port **22** is used by **SSH (Secure Shell)**.

SSH allows you to securely connect to and remotely manage a Linux virtual machine.

Without Port 22, remote administration using SSH is not possible.

---

#### Analogy

Imagine your house has only one entrance.

Your parents give you the key.

Only someone with the key can enter the house.

SSH works in a similar way.

Port **22** is the entrance used for secure remote access to your Linux VM.

---

#### Step 3: Open Port 22

Navigate to:

```text
Azure Portal

↓

Virtual Machines

↓

week3-vm

↓

Networking
```

Open the **Inbound Port Rules** section.

Click:

```text
Add Inbound Rule
```

Configure the following values:

| Field | Value |
|-------|-------|
| Source | My IP Address (recommended) |
| Source Port Ranges | * |
| Destination | Any |
| Service | SSH |
| Destination Port Ranges | 22 |
| Action | Allow |
| Priority | 300 (or Azure default if available) |
| Name | Allow-SSH |

Click:

```text
Add
```

---

#### Test SSH Connectivity

Open a terminal on your computer and run the following command:

```bash
ssh azureuser@<Public-IP>
```

Example:

```bash
ssh azureuser@20.xxx.xxx.xxx
```

If the configuration is correct, you'll see output similar to:

```text
Welcome to Ubuntu...
```

You have now successfully connected to your Linux virtual machine using SSH.

---

#### What Became Possible?

Before opening Port **22**:

- Remote SSH access to the VM was blocked.
- Linux administration from your local computer was not possible.

After opening Port **22**:

- You can securely connect to the Linux virtual machine.
- You can execute Linux commands remotely.
- You can install software, configure services, and manage the VM from your terminal.

---

#### Screenshots

Capture the following screenshots:

- Network Security Group (NSG) rule showing **Port 22** is allowed.
- Terminal displaying a successful SSH login.

---

## Part B — Open Port 80

#### Why Open Port 80?

Port **80** is used for **HTTP (Hypertext Transfer Protocol)**.

HTTP allows users to access a website through a web browser.

If Port **80** is closed, web browsers cannot reach the web server.

---

#### Real-World Analogy

Imagine opening a restaurant.

Customers know the restaurant's address.

However, the entrance door remains locked.

No customers can enter.

Opening Port **80** is similar to unlocking the restaurant entrance so customers can access your business.

---

#### Step 4: Install Apache Web Server

First, connect to the virtual machine using SSH.

Update the package repository:

```bash
sudo apt update
```

Install Apache:

```bash
sudo apt install apache2 -y
```

If necessary, enable and start the Apache service:

```bash
sudo systemctl enable apache2

sudo systemctl start apache2
```

Verify that Apache is running:

```bash
systemctl status apache2
```

Expected output:

```text
active (running)
```

---

#### Step 5: Open Port 80

Navigate to:

```text
Networking

↓

Add Inbound Rule
```

Configure the following values:

| Field | Value |
|-------|-------|
| Service | HTTP |
| Destination Port | 80 |
| Action | Allow |

Click:

```text
Add
```

---

#### Test the Website

Open a web browser and navigate to:

```text
http://<Public-IP>
```

Example:

```text
http://20.xxx.xxx.xxx
```

If everything is configured correctly, you'll see:

```text
Apache2 Ubuntu Default Page
```

This confirms that your web server is now accessible over HTTP.

---

#### What Became Possible?

Before opening Port **80**:

- Web browsers could not access the website.
- HTTP requests were blocked by the Network Security Group.

After opening Port **80**:

- Users can access the website over HTTP.
- The Apache web server is reachable from the internet, subject to the configured NSG rules.

---

#### Screenshots

Capture the following screenshots:

- Browser displaying the **Apache2 Ubuntu Default Page**.
- Network Security Group (NSG) rule showing **Port 80** is allowed.

---

## Part C — Open Port 443

#### Why Open Port 443?

Port **443** is used for **HTTPS (Hypertext Transfer Protocol Secure)**.

HTTPS encrypts communication between a user's web browser and the web server, protecting sensitive information such as passwords, payment details, and personal data while it travels across the internet.

---

#### Understanding HTTPS

The **"S"** in **HTTPS** stands for **Secure**.

Unlike HTTP, HTTPS encrypts all data exchanged between the client and the server using **SSL/TLS**.

This prevents attackers from reading or modifying the data during transmission.

---

#### Analogy

Imagine sending a postcard.

```text
Postcard

↓

Anyone who handles it can read the message.
```

This is similar to **HTTP**.

Now imagine placing the same letter inside a locked envelope.

```text
Locked Envelope

↓

Only the intended recipient can open and read it.
```

This is similar to **HTTPS**.

Encryption protects the information while it is being transmitted.

---

#### Step 6: Open Port 443

Navigate to:

```text
Networking

↓

Add Inbound Rule
```

Configure the following values:

| Field | Value |
|-------|-------|
| Service | HTTPS |
| Destination Port | 443 |
| Action | Allow |

Click:

```text
Add
```

---

#### Important Note

Opening **Port 443** does **not** automatically enable HTTPS.

To serve a website securely over HTTPS, you must also configure:

- An SSL/TLS certificate
- A web server configured to use that certificate
- HTTPS support within the web server (such as Apache or Nginx)

Without these additional steps, simply opening Port **443** will not provide a functioning HTTPS website.

For this assignment, the objective is only to **open the port and document what becomes possible**.

---

#### What Became Possible?

Before opening Port **443**:

- HTTPS traffic could not reach the virtual machine.
- Secure browser connections were not possible.

After opening Port **443**:

- The virtual machine can accept HTTPS traffic.
- Once SSL/TLS is configured, users can securely access the website over HTTPS.

---

#### Network Progression

##### Initial State

```text
Internet

↓

Network Security Group

❌ Port 22

❌ Port 80

❌ Port 443

↓

Virtual Machine
```

---

##### After Opening Port 22

```text
Internet

↓

Network Security Group

✅ Port 22

❌ Port 80

❌ Port 443

↓

Virtual Machine

SSH Access Available
```

---

##### After Opening Port 80

```text
Internet

↓

Network Security Group

✅ Port 22

✅ Port 80

❌ Port 443

↓

Virtual Machine

SSH

HTTP Website
```

---

##### After Opening Port 443

```text
Internet

↓

Network Security Group

✅ Port 22

✅ Port 80

✅ Port 443

↓

Virtual Machine

SSH

HTTP

HTTPS
(After SSL/TLS Configuration)
```

---

#### Comparison Table

| Port | Service | What Became Possible? |
|------|----------|-----------------------|
| 22 | SSH | Secure remote login and administration of the Linux VM |
| 80 | HTTP | Users can access the website over HTTP |
| 443 | HTTPS | Secure web communication becomes available after SSL/TLS configuration |

---

#### Common Beginner Mistakes

**Incorrect**

Opening Port **80** but forgetting to install Apache.

**Result**

The website does not load because no web server is running.

---

**Incorrect**

Opening Port **22** but using the wrong username.

**Result**

SSH authentication fails.

Ubuntu virtual machines typically use the username specified during VM creation.

---

**Incorrect**

Assuming that opening Port **443** automatically enables HTTPS.

**Correct**

Opening the port only allows HTTPS traffic to reach the virtual machine.

You must also configure:

- An SSL/TLS certificate
- A web server configured for HTTPS

---

---

#### Interview Answer

> Port **22** is used for **SSH** and allows secure remote administration of a Linux virtual machine. Port **80** is used for **HTTP** and allows users to access a website over the internet. Port **443** is used for **HTTPS** and enables encrypted communication between a web browser and a web server after SSL/TLS has been configured. In this lab, opening Port **22** allowed me to connect to the virtual machine using SSH, opening Port **80** made the Apache web page accessible through a browser, and opening Port **443** prepared the virtual machine to accept secure HTTPS connections after SSL/TLS configuration.

---

#### Assignment Screenshots

Include the following screenshots in your submission:

1. Network Security Group (NSG) rule showing **Port 22** is allowed.
2. Terminal displaying a successful SSH session.
3. Network Security Group (NSG) rule showing **Port 80** is allowed.
4. Browser displaying the **Apache2 Ubuntu Default Page**.
5. Network Security Group (NSG) rule showing **Port 443** is allowed.

These screenshots demonstrate the effect of enabling each port individually.

---

#### Key Takeaways

| Port | Primary Purpose | What It Enables |
|------|-----------------|-----------------|
| **22** | SSH | Secure remote administration of the Linux VM |
| **80** | HTTP | Web applications accessible over HTTP |
| **443** | HTTPS | Secure web communication after SSL/TLS configuration |

Remember:

- **Port 22** is for administrators.
- **Port 80** is for websites using HTTP.
- **Port 443** is for secure websites using HTTPS.

Each port serves a different purpose and should only be opened when required.

---

#### Security Best Practice

For **Port 22 (SSH)**, avoid using **Any** as the source whenever possible.

Instead, use:

```text
My IP Address
```

Why?

Because using **Any** allows **any device on the internet** to attempt an SSH connection to your virtual machine.

Using **My IP Address** restricts SSH access to **only your current public IP address**, significantly reducing the attack surface.

This is considered a security best practice for development, learning environments, and production systems whenever administrative access originates from a known location.

---

#### Q8.

What is the difference between the NSG source options **Any**, **My IP Address**, and **Service Tag**? Which is safest for SSH, and why?

#### Answer

In **Q7**, you learned how to open a port in a Network Security Group (NSG).

In this section, you'll learn **who is allowed to use that port**.

This is one of the most important security concepts in Azure networking.

When creating an inbound NSG rule, Azure asks you to specify the **Source**.

The **Source** defines **where incoming traffic is allowed to originate**.

Choosing the correct source is just as important as choosing the correct port.

---

#### Before We Begin

Think of your home's front door.

Opening the door doesn't mean everyone should be allowed inside.

You still need to decide **who is permitted to enter**.

Azure networking follows the same principle.

- The **Port** determines **which service** can be accessed.
- The **Source** determines **who is allowed** to access that service.

---

#### Step 1: What Is a Source?

Imagine someone rings your doorbell.

The first question you ask is:

> "Who is outside?"

That person is the **source**.

In networking, the source is the device that sends the request.

```text
Source ---------------------> Destination

Your Laptop -------------> Azure VM
```

- **Source** = Where the network traffic originates.
- **Destination** = The resource receiving the traffic.

Every inbound NSG rule begins by checking the source.

---

#### Why Does Azure Ask for the Source?

Not every computer on the internet should be able to connect to your virtual machine.

Azure lets you control **who can initiate the connection**.

For example:

- Only your laptop
- Everyone on the internet
- Azure services
- Resources inside your Virtual Network

The **Source** field allows you to define these restrictions.

---

#### Understanding the Three Source Options

The most commonly used source options are:

1. **Any**
2. **My IP Address**
3. **Service Tag**

Each option serves a different purpose and should be selected based on your security requirements.

---

## Option 1 — Any

#### What Does "Any" Mean?

When you select:

```text
Source

↓

Any
```

Azure interprets this as:

> Allow traffic from **any IP address on the internet**.

Every public IP address is permitted to attempt a connection.

Example:

```text
India         ✅

United States ✅

Japan         ✅

Australia     ✅

Any Country   ✅
```

---

#### ASCII Diagram

```text
Internet

Laptop A      ✅

Laptop B      ✅

Laptop C      ✅

Laptop D      ✅

        │

        ▼

Azure Virtual Machine
```

Every device on the internet can attempt to connect.

Whether the connection succeeds depends on the remaining NSG rules and authentication.

---

#### Is "Any" Safe for SSH?

Generally, **No**.

Although authentication is still required, exposing SSH to the entire internet significantly increases the attack surface.

Attackers and automated bots continuously scan public IP addresses looking for open SSH ports.

Whenever possible, avoid using **Any** as the source for SSH access.

---

Continuing from **Q8 – Part 1** exactly where it stopped.

---

#### Option 2 — My IP Address

### What Does "My IP Address" Mean?

When you select:

```text
Source

↓

My IP Address
```

Azure automatically detects your current public IP address and creates a rule that allows traffic only from that IP.

Example:

```text
Your Laptop

      │

      ▼

49.xx.xx.xx
```

Azure creates an NSG rule similar to:

```text
Allow

Source

49.xx.xx.xx
```

This means only the device using that public IP can attempt to connect.

---

#### ASCII Diagram

```text
              Internet


Your Laptop        ✅
49.xx.xx.xx


Friend Laptop      ❌


Random Hacker      ❌


Office PC          ❌


          │

          ▼


Azure Virtual Machine
```

Only your current public IP address is allowed.

---

#### Is "My IP Address" Safe?

✅ Yes.

For learning environments, personal projects, and administration tasks, this is the recommended option for SSH access.

Example:

You create a Linux VM in Azure.

You want to connect using:

```bash
ssh username@public-ip-address
```

Instead of allowing:

```text
Source: Any
```

you configure:

```text
Source: My IP Address
```

Now only your machine can reach Port 22.

---

### Important Note: Your IP Address Can Change

Many beginners think:

> "My IP Address means my laptop forever."

That is not always true.

Your public IP may change when:

* You restart your home router
* You switch networks
* You use mobile hotspot
* Your ISP assigns a new dynamic IP

Example:

Today:

```text
Your Public IP

49.xx.xx.xx
```

Tomorrow:

```text
Your Public IP

52.xx.xx.xx
```

Your old NSG rule will no longer work.

You need to update the NSG rule with the new IP.

---

# Option 3 — Service Tag

## What Is a Service Tag?

A **Service Tag** is a predefined group of IP addresses maintained by Microsoft.

Instead of manually entering hundreds or thousands of IP addresses, Azure provides a simple name.

Example:

```text
AzureLoadBalancer

VirtualNetwork

AzureCloud
```

These names represent Microsoft-managed IP ranges.

---

## Kid Analogy 👶

Imagine a school.

The principal does not maintain a list like:

```text
Teacher Rahul
Teacher Priya
Teacher John
Teacher David
Teacher Lisa
```

Instead, the principal creates a group:

```text
Teachers
```

Whenever a new teacher joins, the group is automatically updated.

Service Tags work the same way.

Instead of managing IP addresses manually:

```text
13.x.x.x
20.x.x.x
40.x.x.x
52.x.x.x
...
```

Azure provides:

```text
AzureLoadBalancer
```

and manages the IP list automatically.

---

# Real Azure Example

Suppose you have a Virtual Machine behind an Azure Load Balancer.

The Load Balancer needs to perform health checks.

Instead of allowing many Azure Load Balancer IP addresses manually:

```text
13.x.x.x

20.x.x.x

40.x.x.x
```

You simply configure:

```text
Source

↓

Service Tag

↓

AzureLoadBalancer
```

Azure automatically maintains the IP ranges.

---

# Common Azure Service Tags

## 1. AzureLoadBalancer

Used when traffic comes from Azure Load Balancer.

Example:

```text
Azure Load Balancer

        │

        ▼

Virtual Machine
```

---

## 2. VirtualNetwork

Represents resources inside the same Virtual Network.

Example:

```text
VM1

 │

 ▼

VM2
```

Instead of allowing:

```text
10.10.1.4
10.10.2.5
10.10.3.6
```

You allow:

```text
VirtualNetwork
```

---

## 3. AzureCloud

Represents Azure public IP ranges.

Used when communication is required with Azure services.

---

# ASCII Diagram — Service Tag

```text
              Azure

     VM1

     VM2

     VM3

     VM4

        │

        ▼

 VirtualNetwork

        │

        ▼

       NSG

        │

        ▼

       VM5
```

Azure manages the IP addresses behind the Service Tag.

---

# Comparison Table

| Source Option     | Who Can Connect?                       | Typical Use                                       | Security                        |
| ----------------- | -------------------------------------- | ------------------------------------------------- | ------------------------------- |
| **Any**           | Anyone on the internet                 | Public services like websites                     | ❌ Lowest                        |
| **My IP Address** | Only your current public IP            | SSH/RDP administration                            | ✅ Highest for individual access |
| **Service Tag**   | Azure services or Azure-managed groups | Load Balancer, Azure services, VNet communication | ✅ Secure when used correctly    |

---

# Which Source Is Safest for SSH?

The answer is:

```text
✅ My IP Address
```

## Why?

Because SSH provides administrative access to your VM.

Port:

```text
22
```

should not be open to the entire internet.

With:

```text
Source: My IP Address
```

only your machine can attempt SSH access.

Everyone else is blocked.

---

# Why Not "Any"?

Imagine your house:

```text
Door

 ↓

Everyone Can Enter
```

You would not do this.

The internet is similar.

Thousands of automated bots continuously scan public IP addresses.

If you configure:

```text
Port: 22

Source: Any
```

then every scanner can attempt SSH login.

Even if passwords are strong, unnecessary exposure should be avoided.

---

# Why Not Service Tag?

Service Tags are mainly designed for:

* Azure services
* Azure resources
* Microsoft-managed IP ranges

Your personal laptop is not represented by a Service Tag.

Example:

Your laptop:

```text
49.xx.xx.xx
```

is not:

```text
AzureLoadBalancer
```

or:

```text
VirtualNetwork
```

Therefore, Service Tags are usually not used for personal SSH access.

---

## Real Company Example

Imagine a company with 500 developers.

They need SSH access to production servers.

A bad design:

```text
Source

↓

Any
```

A better design:

```text
Developer Laptop

        │

        ▼

Company VPN

        │

        ▼

Production VM
```

The NSG allows:

```text
Company VPN Public IP
```

Only approved users can connect.

---

## Common Beginner Mistakes

### ❌ Mistake 1: Using Any for SSH

Beginners often choose:

```text
Source: Any
```

because it is easy.

Better:

```text
Source: My IP Address
```

---

### ❌ Mistake 2: Thinking Service Tag Means Microsoft Employee

Service Tag does not represent people.

It represents:

```text
Microsoft-managed IP ranges
```

---

### ❌ Mistake 3: Assuming My IP Address Never Changes

Your public IP may change.

If SSH suddenly stops working:

Check your current public IP and update the NSG rule.

---

# Interview Answer (2 Minutes)

> In Azure Network Security Groups, the Source field defines where incoming traffic is allowed from.
>
> **Any** allows traffic from all IP addresses on the internet. It is useful for public services but is not recommended for SSH because it increases the attack surface.
>
> **My IP Address** automatically uses my current public IP address and allows access only from my machine. This is the safest option for SSH administration.
>
> **Service Tag** represents Microsoft-managed groups of IP addresses, such as Azure Load Balancer or Virtual Network. It helps securely allow traffic from Azure services without manually maintaining IP addresses.

---

# Quick Revision

```text
Any

↓

Everyone on Internet
```

---

```text
My IP Address

↓

Only My Computer
```

---

```text
Service Tag

↓

Azure Managed Services
```

---

# Easy Memory Trick

Think about your phone contacts.

```text
Any

↓

Answer every unknown call
```

---

```text
My IP Address

↓

Answer only your saved personal number
```

---

```text
Service Tag

↓

Answer calls from an official company group
```

---

### Note
> **Any** allows traffic from any IP address on the internet and is suitable for public services like websites but is not recommended for SSH because it increases the attack surface.
>
> **My IP Address** restricts access to the current public IP address, making it the safest option for SSH because only the administrator's machine can connect.
>
> **Service Tag** allows traffic from predefined Azure-managed IP ranges, such as Azure Load Balancer or Virtual Network, and is mainly used for communication between Azure services rather than direct administrator access.




In an Azure Network Security Group (NSG), the **Source** field defines where incoming network traffic is allowed to originate from.

The three commonly used source options are:

### 1. Any

**Any** allows traffic from **all IP addresses on the internet**.

Example:

```text
Source

↓

Any
```

This means any device from anywhere can attempt to connect to the resource.

It is commonly used for public services such as web servers (HTTP/HTTPS), but it is **not recommended for SSH access** because it exposes the VM to unnecessary connection attempts from attackers and automated scanners.

---

### 2. My IP Address

**My IP Address** automatically uses your current public IP address and allows traffic only from that specific IP.

Example:

```text
Source

↓

Your Public IP Address
```

This is the **safest option for SSH administration** because only your computer can attempt to connect to the Azure VM.

However, if your public IP changes due to a router restart, ISP change, or network change, you may need to update the NSG rule.

---

### 3. Service Tag

A **Service Tag** represents a Microsoft-managed group of IP addresses for Azure services.

Examples:

```text
AzureLoadBalancer

VirtualNetwork

AzureCloud
```

Instead of manually maintaining multiple IP addresses, Azure automatically manages the IP ranges behind the Service Tag.

Service Tags are mainly used for communication between Azure services and resources, not for allowing SSH access from a personal laptop.

---

### Which is safest for SSH?

The safest option for SSH is:

```text
✅ My IP Address
```

because SSH provides administrative access to the virtual machine, and restricting access to only the administrator's public IP reduces the attack surface.

A recommended SSH rule would be:

```text
Port:
22

Source:
My IP Address
```

Avoid using:

```text
Port:
22

Source:
Any
```

because it allows every device on the internet to attempt an SSH connection.

**In summary:**

* **Any** → Allows everyone on the internet to connect; least secure.
* **My IP Address** → Allows only your current public IP; best choice for SSH administration.
* **Service Tag** → Allows predefined Azure service IP ranges; used mainly for Azure service communication.



---

# Q9. 
What is the difference between a system route and a user-defined route UDR Create a UDR with next hop None and demonstrate its effect. Attach screenshots.

# Answer

In Q6, I learned about **Route Tables**. Now I will understand how Azure decides:

> **"Where should this network traffic go?"**

This process is called **Routing**.

In this lesson, you will learn:

* What **System Routes** are
* What **User-Defined Routes (UDRs)** are
* What **Next Hop** means
* What happens when **Next Hop = None**
* How to create a UDR in Azure
* Why traffic stops after applying a UDR
* Which screenshots to capture for your assignment

---

# Step 1: What is a Route?

Imagine you are travelling from your home to a shopping mall.

You open Google Maps.

Google Maps gives you directions:

```text
Home

 ↓

Turn Left

 ↓

Take Highway

 ↓

Shopping Mall
```

Google Maps is deciding the path you should follow.

This path is called a **Route**.

Azure networking works the same way.

Azure decides the path that network packets should take to reach their destination.

---

## Kid Analogy 👶

Imagine your school.

You ask your teacher:

> "How do I reach the library?"

Your teacher says:

```text
Classroom

 ↓

Left Corridor

 ↓

Stairs

 ↓

Library
```

These instructions are a **route**.

A route simply tells traffic:

> "Where should you go next?"

---

# Step 2: What is a System Route?

When you create an Azure Virtual Network (VNet), Azure automatically creates default routes.

These are called:

```text
System Routes
```

You do not create them manually.

Azure manages them automatically.

Think of System Routes as:

> Azure's default GPS directions.

---

## Example

Suppose one VM needs to communicate with another VM:

```text
VM1

 ↓

VM2
```

Azure already knows how to deliver the traffic.

You did not create any route manually.

Why?

Because Azure created a System Route automatically.

---

## ASCII Diagram

```text
Azure Creates Automatically


VM1

 ↓

System Route

 ↓

VM2
```

No manual configuration is required.

---

# What Can System Routes Handle?

System Routes provide default connectivity for:

* Communication between subnets inside a VNet
* Communication with the internet
* Communication with Azure services

They allow Azure resources to communicate without additional routing configuration.

---

# Step 3: What is a User-Defined Route (UDR)?

A **User-Defined Route (UDR)** is a custom route created by the user.

It allows you to override Azure's default routing behavior.

---

## Kid Analogy 👶

Normally:

```text
House

 ↓

Main Road

 ↓

Shopping Mall
```

Your father says:

> "Do not use the main road. Take another path."

Now you use:

```text
House

 ↓

Park Road

 ↓

Bridge

 ↓

Shopping Mall
```

You changed the default path.

That is a **User-Defined Route**.

---

# Azure Example

Default routing:

```text
Virtual Machine

 ↓

Internet
```

Company security policy:

> "All internet traffic must pass through a firewall."

New route:

```text
Virtual Machine

 ↓

Azure Firewall

 ↓

Internet
```

This custom routing decision is created using a UDR.

---

# System Route vs User-Defined Route

## System Route

```text
Azure decides
```

## User-Defined Route

```text
You decide
```

---

# Step 4: What is Next Hop?

This is the most important routing concept.

Imagine you are sending a package.

Current location:

```text
Home
```

The delivery person asks:

> "Where should I go next?"

Maybe:

```text
Post Office
```

The next destination is called the:

```text
Next Hop
```

---

Networking works the same way.

A packet asks:

> "Where should I send this traffic next?"

The answer is the Next Hop.

---

## Example

Traffic going directly to internet:

```text
VM

 ↓

Next Hop

 ↓

Internet
```

Traffic going through firewall:

```text
VM

 ↓

Next Hop

 ↓

Firewall

 ↓

Internet
```

---

# Step 5: What Does Next Hop = None Mean?

This is where many beginners get confused.

**Next Hop = None** means:

> There is no destination to forward the traffic to.

Azure drops the packet.

---

## Real-Life Example

Imagine driving.

Normally:

```text
Car

 ↓

Road

 ↓

Destination
```

Now Google Maps says:

```text
STOP

Road Closed
```

You cannot continue.

This is similar to:

```text
Next Hop = None
```

---

## ASCII Diagram

### Normal Traffic

```text
VM

 ↓

Internet
```

---

### After UDR with Next Hop = None

```text
VM

 ↓

User Defined Route

 ↓

None

 ↓

❌ Traffic Dropped
```

The packet has nowhere to go.

---

# Practical Lab: Create UDR with Next Hop = None

## Step 1: Create Route Table

Go to:

```text
Azure Portal

↓

Route Tables

↓

Create
```

---

Fill the details:

| Field          | Value             |
| -------------- | ----------------- |
| Resource Group | week3-rg          |
| Name           | week3-route-table |
| Region         | Same as VM        |

Click:

```text
Review + Create

↓

Create
```

---

## Step 2: Add a Route

Open the Route Table.

Go to:

```text
Routes

↓

Add
```

Configure:

| Field            | Value          |
| ---------------- | -------------- |
| Route Name       | block-internet |
| Destination Type | IP Addresses   |
| Destination CIDR | `0.0.0.0/0`    |
| Next Hop Type    | None           |

---

# Why Use `0.0.0.0/0`?

This represents:

> All possible IP addresses.

In simple words:

```text
Everything
```

So the rule means:

> Drop traffic going anywhere.

---

Click:

```text
Add
```

---


# Step 3: Associate the Route Table with a Subnet

Creating a Route Table alone does **not** affect traffic.

You must associate it with the subnet where your resources are running.

Go to:

```text
Route Table

↓

Subnets

↓

Associate
```

Select:

```text
Virtual Network

↓

week3-vnet
```

Choose the subnet:

```text
frontend-subnet
```

Click:

```text
OK
```

---

## Important Concept

The Route Table is now attached to the subnet.

Any VM inside this subnet will follow the routes defined in this Route Table.

Example:

```text
Azure VNet

      │

      ▼

frontend-subnet

      │

      ▼

Virtual Machine

      │

      ▼

User Defined Route
```

---

# Step 4: Test the Effect

Now test whether internet access works.

Connect to your VM using SSH.

Run:

```bash
ping google.com
```

or:

```bash
curl https://www.microsoft.com
```

---

## Expected Result

The internet connection should fail.

Why?

Because the UDR contains:

```text
Destination:

0.0.0.0/0


Next Hop:

None
```

Azure does not know where to forward the traffic.

Therefore, the packet is dropped.

---

# Why Did This Happen?

## Before Applying the UDR

Traffic followed Azure's default System Route:

```text
VM

 │

 ▼

System Route

 │

 ▼

Internet ✅
```

Azure already knew the path.

---

## After Applying the UDR

The custom route overrides the default behavior:

```text
VM

 │

 ▼

Route Table

 │

 ▼

0.0.0.0/0

 │

 ▼

Next Hop = None

 │

 ▼

❌ Traffic Dropped
```

The VM itself is working correctly.

The problem is the routing decision.

---

# System Route vs User-Defined Route Comparison

| Feature       | System Route                  | User-Defined Route (UDR)                                         |
| ------------- | ----------------------------- | ---------------------------------------------------------------- |
| Created By    | Azure                         | User                                                             |
| Configuration | Automatic                     | Manual                                                           |
| Modification  | Cannot be modified            | Can be created and changed                                       |
| Purpose       | Provides default connectivity | Overrides default routing behavior                               |
| Common Usage  | Normal communication          | Firewall routing, VPN routing, traffic control, blocking traffic |

---

# Screenshots Required for Assignment

Capture the following screenshots:

## 1. Route Table Overview

Show:

```text
Route Table Name

week3-route-table
```

---

## 2. Route Configuration

Show the created route:

```text
Route Name:

block-internet


Destination:

0.0.0.0/0


Next Hop Type:

None
```

---

## 3. Subnet Association

Show:

```text
Virtual Network:

week3-vnet


Subnet:

frontend-subnet
```

---

## 4. Terminal Testing

Show the failed internet connectivity test.

Example:

```bash
curl https://www.microsoft.com
```

or:

```bash
ping google.com
```

Expected:

```text
Connection Failed
```

---

# Common Beginner Mistakes

## ❌ Mistake 1: Thinking the VM is broken

Some beginners think:

> "My VM stopped working."

The VM is healthy.

The Route Table is blocking traffic.

Remember:

```text
VM Problem ❌

Routing Decision Problem ✅
```

---

## ❌ Mistake 2: Creating the Route Table but not associating it

Creating a Route Table alone does nothing.

Example:

```text
Route Table Created

↓

No Subnet Association

↓

No Effect
```

The Route Table must be attached to a subnet.

---

## ❌ Mistake 3: Confusing NSG and UDR

Both control network traffic, but they solve different problems.

Remember:

```text
NSG

↓

"Should this traffic be allowed?"
```

Example:

Allow SSH on Port 22.

---

```text
UDR

↓

"Where should this traffic go?"
```

Example:

Send traffic through Firewall.

---

# Easy Memory Trick

Think about a road trip.

## System Route

```text
GPS chooses the road automatically
```

Azure selects the default path.

---

## User-Defined Route

```text
You change the GPS route
```

You override Azure's default path.

---

## Next Hop = None

```text
Road Closed 🚧

No path available
```

Traffic cannot continue.

---

# Interview Answer (2 Minutes)

> A System Route is automatically created and managed by Azure when a Virtual Network is created. It provides default connectivity between resources inside the VNet, to the internet, and to Azure services.
>
> A User-Defined Route (UDR) is a custom route created by the user to override Azure's default routing behavior. It is commonly used for scenarios such as forcing traffic through a firewall, VPN gateway, or controlling network traffic flow.
>
> In this lab, I created a UDR with destination `0.0.0.0/0` and configured the Next Hop as **None**. After associating the Route Table with the subnet, all outbound internet traffic from the VM was dropped because Azure had no next hop to forward the packets.

---

# Visual Summary

## Without UDR

```text
VM

 │

 ▼

System Route

 │

 ▼

Internet ✅
```

---

## With UDR (Next Hop = None)

```text
VM

 │

 ▼

User-Defined Route

 │

 ▼

None

 │

 ▼

❌ Traffic Dropped
```

---











