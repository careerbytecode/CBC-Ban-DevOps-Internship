
# Questions

# Q1.
What is the difference between a **Resource Group**, a **Virtual Network**, and a **Subnet**? Explain with a simple analogy.

## Answer

**Before We Start - What is Azure?**

Imagine my want to build a house.

Normally my'd buy:

* Land
* Electricity
* Water
* Security
* Roads

That's a lot of work.

Azure is like a **huge city** built by Microsoft.

Instead of building everything myself, Microsoft says:

> "Come build my house inside our city."

That "house" could be:

* Website
* Virtual Machine
* Database
* Kubernetes Cluster
* Storage

Everything lives inside Azure.

Suppose my mother says:

> Keep all my toys in one cupboard.

Inside that cupboard:

* One shelf has cars.
* One shelf has dolls.
* One shelf has books.

Here,

Cupboard = Resource Group

Shelf = Virtual Network

Different compartments on the shelf = Subnets

---

## Analogy

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
└── Resource Group
    │
    └── Virtual Network (VNet)
        │
        ├── Subnet 1
        │   └── Resources (VMs, NICs, Azure Bastion, Azure Firewall, etc.)
        │
        ├── Subnet 2
        │   └── Resources (VMs, NICs, VM Scale Sets, etc.)
        │
        └── Subnet 3
            └── Resources (SQL Server VM or Azure SQL Managed Instance, NICs, etc.)
```
> Note: A Resource Group contains all the resources you create. Network-connected resources (such as VMs, VM Scale Sets, Azure Bastion, Azure Firewall, and Azure SQL Managed Instance) are associated with a subnet inside a Virtual Network. Other resources (such as Storage Accounts, Azure SQL Database, Azure Container Registry, and Key Vault) belong to the Resource Group but are not placed inside a subnet.

---

## Definitions

## 1. Resource Group

Think of it as a **folder**.

It stores Azure resources.

Example:

```

Week3-RG

Contains

* VM
* Storage
* Virtual Network
* Public IP
* NSG
* Disk
* AKS

```

Everything stays together.

If I delete the Resource Group...

Everything inside disappears.

---

## 2. Virtual Network (VNet)

Now imagine my home has Wi-Fi.

Only devices connected to that Wi-Fi can communicate easily.

Azure also needs a network.

That network is called a **Virtual Network (VNet).**

It provides:

* Private communication
* IP addresses
* Security
* Isolation

Without a VNet...

my VM has nowhere to live.

---

## 3. Subnet

A subnet is a smaller part of a VNet.

Imagine my house.

```

House
│
├── Living Room
├── Kitchen
└── Bedroom

```

Still one house.

Just divided.

Exactly the same.

```

House
│
└── Hallway (VNet)
      │
      ├── Living Room (Frontend Subnet)
      ├── Kitchen (Backend Subnet)
      └── Bedroom (Database Subnet)

```

---

## Diagram


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/17beda92-0ab6-4212-8590-8b2ced6bc41c" />

---

## How They Work Together

Suppose I am creating a VM.

Azure asks:

## Step 1

Where should I save this VM?

Answer:

```

Resource Group

```

## Step 2

Which network should it use?

Answer:

```

Virtual Network

```

## Step 3

Which part of the network?

Answer:

```

Subnet

```

That's why Azure asks them in this order.

---

## Example

Suppose I'm making a shopping website.

```

Week3-RG

```

Inside:

```

Shopping-VNet

```

Inside:

```

* Frontend subnet

* Backend subnet

* Database subnet

```

Then:

```

* VM1

      * Frontend

* VM2

      * Backend

      * SQL Server

```

Each stays in its own subnet.

```
Week3-RG                  ← Resource Group
│
└── Shopping-VNet         ← Virtual Network
    │
    ├── Frontend-Subnet
    │     └── VM1 (Frontend)
    │
    ├── Backend-Subnet
    │     └── VM2 (Backend)
    │
    └── Database-Subnet
          └── Azure SQL VM / SQL Server
```          

---

## Comparison Table

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
└── VNet
    ├── Frontend Subnet
    ├── Backend Subnet
    └── Database Subnet

```

---

> A Resource Group is a logical container that organizes related Azure resources, making them easier to manage, monitor, and delete together. 
> A Virtual Network, or VNet, provides a private network where Azure resources can securely communicate with each other. 
> A Subnet is a smaller section within a VNet that helps organize resources based on their role, such as frontend, backend, or database servers. 
> An easy analogy is that a Resource Group is like a cupboard, the VNet is a shelf inside it, and Subnets are compartments on that shelf used to organize different items.

---

## Common Questions

#### Can a Resource Group have multiple VNets?

Yes.

---

#### Can a VNet have multiple subnets?

Yes.

---

#### Can a subnet exist without a VNet?

No.

---

#### Can a VM exist without a subnet?

No.

---

#### Can a Resource Group contain many different resources?

Yes.


---



# Q2.

What is the difference between `10.0.0.0/16` and `10.0.1.0/24`? Explain how many addresses each provides and when I would use them.

## Answer

## Step 1: Why do we even need IP addresses?

Imagine my city.

Every house has a unique address.

Example:

```

House 1 → 101
House 2 → 102
House 3 → 103

```

Without house numbers, the postman wouldn't know where to deliver my parcel.

Similarly, every device on a network needs a unique IP address.

```

Laptop   → 10.0.0.4
VM       → 10.0.0.5
Database → 10.0.0.6

```

An IP address is simply the **address of a device on a network**.

---

### Step 2: What is a CIDR Block?

CIDR (Classless Inter-Domain Routing) is a compact way to write an IP address together with its network size.

Example:

```
192.168.1.0/24
```


The `/24` part is called the **prefix length**. It tells me how many bits belong to the **network** and how many are available for **hosts (devices)**.

For example:
> **How big is this network?**

Look at this:

```
10.0.0.0/16
```

It has two parts:

```

10.0.0.0   → Network Address
/16        → Size of the network (Prefix Length)

```

Think of `/16` as saying:

> "I'm reserving a very large neighborhood."

---

## What does /24 mean in 192.168.1.0/24?

- An IP address has 32 bits total.
- /24 means subnet mask is 255.255.255.0 – last 8 bits for hosts.
- /24 means → first 24 bits = network, remaining 8 bits = hosts

```bash
192.168.1.0/24

192.168.1  |  0
 Network   | Host

24 bits    | 8 bits
```
> For a /24 network, everything before the last dot identifies the network, and the last octet identifies the host.

Or in binary:

```bash
192        168        1          0
11000000 . 10101000 . 00000001 . 00000000

<--------- 24 bits -----------><-- 8 bits -->
        Network ID              Host ID
```        
So:
- **Network portion (24 bits)**: 192.168.1
- **Host portion (8 bits)**: 0

Subnet mask equivalent:

```
255.255.255.0
```

So:

```
192.168.1.0/24
```

covers addresses from:

```
192.168.1.0 to 192.168.1.255
```

That's:

```
256 addresses in one network.
```

## Examples in the same /24 network
```bash
192.168.1.1
192.168.1.10
192.168.1.50
192.168.1.100
192.168.1.254
```

All of these belong to the **192.168.1.0/24** network because the **first 24 bits** (192.168.1) are the same.

The address ranges are:
```bash
Network Address : 192.168.1.0
Usable Hosts    : 192.168.1.1 – 192.168.1.254
Broadcast       : 192.168.1.255
```

---

## Usable Hosts Calculation

```
Usable Hosts = 2^(32 - CIDR) - 2
```

* /24: 254 (total 256, minus network and broadcast)
* /16: 65534
* /28: 14

**Why subnet?**

* To isolate groups/devices, improve security, and better utilize address space.

In every subnet, 2 addresses are always reserved:

* First address → Network address / CIDR base IP (identifies the subnet itself)
* Last address → Broadcast address / Broadcast IP (sends data to all devices in subnet)

So usable:

```
Total − 2
```

> **Note:** The standard networking calculation gives **254 usable hosts** in a `/24` subnet because the first address is the **network address** and the last address is the **broadcast address**.

> **Azure adds one more rule:** Azure reserves **5 IP addresses in every subnet**, so a `/24` subnet provides **251 usable IP addresses** in Azure.

---

## Table: CIDR, Subnet Mask, Total IPs, Usable Hosts

| CIDR | Subnet Mask     | Total IPs  | Usable Hosts |
| ---- | --------------- | ---------- | ------------ |
| /24  | 255.255.255.0   | **256**    | 254          |
| /16  | 255.255.0.0     | **65,536** | 65,534       |
| /28  | 255.255.255.240 | **16**     | 14           |

<img width="1372" height="736" alt="image" src="https://github.com/user-attachments/assets/54d04c7e-6a99-4df5-9943-bae46bc8dc2d" />

<img width="1392" height="1007" alt="image" src="https://github.com/user-attachments/assets/53e30ae6-8259-45a4-b7de-b662b1816331" />

---

## Step 3: Analogy

Imagine a school.

The principal asks:

> **"How many students should we prepare classrooms for?"**

### Option 1: 20 students

A small school.

One classroom is enough. If the teacher makes an announcement, only 20 students hear it.

### Option 2: 500 students

A large school.

If all 500 students are placed in **one giant classroom**, it becomes noisy and difficult to manage.

When one student asks,

> **"Who has a pencil?"**

all 500 students hear the question, even though only one student might answer.

This wastes everyone's attention.

---

### Networks work the same way

A **large network** is like one giant classroom.

When one computer sends a **broadcast message**, every device in that network receives it, even if the message is only relevant to one device.

This creates unnecessary network traffic.

---

### Subnetting solves this problem

Instead of one classroom with 500 students, the principal creates **25 classrooms with 20 students each**.

Now, when a student asks,

> **"Who has a pencil?"**

only the 20 students in that classroom hear the question.

The other 480 students continue their work without interruption.

Similarly, **subnetting divides one large network into smaller networks (subnets)**. A broadcast sent within one subnet stays in that subnet and does not disturb devices in other subnets.

---

### CIDR and network size

CIDR tells us **how large a network is**.

* **Smaller number after `/` → Larger network → More host IP addresses**
* **Larger number after `/` → Smaller network → Fewer host IP addresses**

```text
/16 → Large network (many hosts)
/24 → Smaller network (fewer hosts)
/28 → Very small network
```

> **Easy way to remember:** CIDR decides the size of the "school," while subnetting divides that school into "classrooms" to make the network more organized, efficient, and secure.


## Benefits:

* **Security** - a breach in one subnet doesn't automatically spread to others
* **Performance** - less broadcast traffic (devices stop shouting to the entire network)
* **Organization** - HR team on one subnet, Engineering on another, Database servers on another
* **Control** - apply different firewall rules per subnet

> On AWS, this is exactly why I have **public subnets** (for web servers) and **private subnets** (for databases) inside a VPC.

---

## Step 4: Real-Life Analogy

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

## Step 5: Visual Diagram

```text
10.0.0.0/16  (Large Network)

+-----------------------------------------------------------+
|                                                           |
| 10.0.0.0/24   → Subnet 1                                 |
| 10.0.1.0/24   → Subnet 2                                 |
| 10.0.2.0/24   → Subnet 3                                 |
| 10.0.3.0/24   → Subnet 4                                 |
|      ...                                                 |
| 10.0.254.0/24 → Subnet 255                               |
| 10.0.255.0/24 → Subnet 256                               |
|                                                           |
+-----------------------------------------------------------+
```


```text
10.0.0.0/24
│
├── Network Address    : 10.0.0.0
├── Usable Hosts       : 10.0.0.1 – 10.0.0.254
└── Broadcast Address  : 10.0.0.255
```

Another subnet:

```text
10.0.1.0/24
│
├── Network Address    : 10.0.1.0
├── Usable Hosts       : 10.0.1.1 – 10.0.1.254
└── Broadcast Address  : 10.0.1.255
```

### Key takeaway

Inside this large `/16` network, I can create many smaller `/24` subnets.

```text
Large Network (/16)
        │
        ├── 10.0.0.0/24
        ├── 10.0.1.0/24
        ├── 10.0.2.0/24
        ├── 10.0.3.0/24
        ├── ...
        └── 10.0.255.0/24
```
> All of these fit inside the `10.0.0.0/16` network.

So:

* **10.0.0.0/16** is the **parent network**.
* **10.0.0.0/24**, **10.0.1.0/24**, **10.0.2.0/24**, etc., are **child subnets** created from that parent network.
* A **/16** network can be divided into **256 separate /24 subnets** (from `10.0.0.0/24` through `10.0.255.0/24`). This is exactly how organizations split a large network into smaller, easier-to-manage subnetworks.


---

## Step 6: How Many IP Addresses?

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

## Step 7: Azure Special Rule

Azure reserves **5 IP addresses in every subnet**.

For a `/24` subnet:

```

Total IPs = 256

Azure reserves = 5

Usable = 251

```

For a `/16` VNet:

- Total address space = 65,536 IP addresses.

When you create subnets inside the VNet, Azure reserves **5 IP addresses in each subnet**, not in the VNet itself.

---

## Step 8: Where Would I Use Them?

## Use `/16` when:

* Creating a large Virtual Network (VNet)
* Planning to create many subnets
* Planning for future growth
* Hosting hundreds or thousands of resources

Example:

```text
Company
   │
   └── VNet (/16)
       ├── Frontend Subnet (/24)
       ├── Backend Subnet (/24)
       ├── Database Subnet (/24)
       ├── AKS Subnet
       ├── Bastion Subnet
       └── Gateway Subnet
```

A `/16` provides enough IP address space for multiple subnets and future expansion.

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

## Step 9: Relationship Between `/16` and `/24`

```

10.0.0.0/16
│
├── 10.0.0.0/24
├── 10.0.1.0/24
├── 10.0.2.0/24
├── 10.0.3.0/24
├── 10.0.4.0/24
├── ...
└── 10.0.255.0/24

```

Think of `/16` as a **big pizza**.

Each `/24` is **one slice of that pizza**.

Every slice belongs to the same pizza, just as every `/24` subnet belongs to the parent `/16` network.

---

## Step 10: Comparison Table

| Feature                    | `10.0.0.0/16`                                  | `10.0.1.0/24`                                            |
| -------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Network Size               | Large                                          | Small                                                    |
| Total IP Addresses         | 65,536                                         | 256                                                      |
| Usable IPs in Azure        | Depends on subnets; each subnet reserves 5 IPs | 251 usable (256 total − 5 reserved by Azure)             |
| Best For                   | Large production VNet                          | Single subnet, labs, testing                             |
| Future Expansion           | Excellent                                      | Limited                                                  |
| Contains Multiple Subnets? | Yes                                            | No (it's already a subnet-sized network in most designs) |



---

## Step 11: Remember

```

Smaller CIDR Number
        ↓
Larger Network
        ↓
More IP Addresses

```
```

/16
 ↓
Large Network
 ↓
65,536 IP Addresses

```
```

/24
 ↓
Smaller Network
 ↓
256 IP Addresses

```

```
CIDR    Network Size    Total IPs
---------------------------------
/16     Large           65,536
/24     Smaller            256
/28     Very Small          16
```

Remember:

> **The smaller the CIDR number (after the /), the larger the network and the more IP addresses it contains.**

> **The larger the CIDR number, the smaller the network and the fewer IP addresses it contains.**

---

> `10.0.0.0/16` is a larger network that provides **65,536 IP addresses** and is commonly used for a **Virtual Network (VNet)** because it provides enough address space to create multiple subnets and allows room for future growth. `10.0.1.0/24` is a smaller network that provides **256 IP addresses** (or **251 usable IP addresses in Azure**, since Azure reserves 5 addresses per subnet) and is typically used as an individual subnet for a specific workload such as frontend servers, backend servers, or development environments. I usually choose a `/16` for the VNet and `/24` for individual subnets because it keeps workloads organized, provides room for expansion, and follows common Azure networking best practices.

---

## Common Questions

### Can I create multiple `/24` subnets inside one `/16` VNet?

Yes.

---

### Is `/16` larger than `/24`?

Yes.

---

### Which provides more IP addresses?

`/16`

---

### Does Azure reserve some IP addresses?

Yes, Azure reserves **5 IP addresses in every subnet**.

---

### What is CIDR?

Classless Inter-Domain Routing (CIDR) is a compact way to write IP address ranges and their network masks.

---

### Why is CIDR notation useful?

It lets network engineers allocate address space precisely, aggregate routes and keep routing tables smaller.

---

### How is an IP address structured?

An IPv4 address consists of four 8-bit numbers (octets) ranging from 0 to 255, separated by dots.

---

### What does the number after the slash mean?

The slash value (e.g. /24) shows how many bits belong to the network prefix; the rest identify individual hosts.

---

## Reference:

- https://echoflare.ca/tools/subnet-calculator/
- https://cidr.xyz/

---


# Q3.

Create a VNet and subnet in the Azure portal, then attach screenshots showing both.

## Answer

## Before We Start

Remember what we learned?

<img width="452" height="480" alt="image" src="https://github.com/user-attachments/assets/8c365ad8-0143-4f4b-bfb7-5b4854e83f05" />

Azure will ask me to create them in this order.

---

## Analogy

Imagine my mom says:

> "We're building a new house."

First, I buy land.

```text
Land
````

Then I build the house.

```text
House
```

Then I divide the house into rooms.

```text
Living Room

Kitchen

Bedroom
```

Azure is exactly the same.

```text
Resource Group

↓

Virtual Network

↓

Subnet
```

---

## Step 1: Sign in to Azure

Open my browser and go to:

**[https://portal.azure.com](https://portal.azure.com)**

Log in with my Azure account.

I'll see the Azure Portal dashboard.

<img width="1608" height="990" alt="image" src="https://github.com/user-attachments/assets/684c87fc-067e-43c0-b29b-52e286f28114" />

---

## Step 2: Create a Resource Group

## Why?

Azure needs a place to keep all my resources together.

Think of it as creating a folder before saving files.

## Click

```text
☰ Menu

↓

Resource Groups

↓

Create
```

<img width="1182" height="1176" alt="image" src="https://github.com/user-attachments/assets/c36667f2-572f-466f-a033-c8cf970eab65" />

---

## Fill these values

| Field               | Value                                                  |
| ------------------- | ------------------------------------------------------ |
| Subscription        | my Azure Subscription                                |
| Resource Group Name | `week3-rg`                                             |
| Region              | East US (or the same region I'll use for everything) |

> Important: Use the **same region** for all resources in this assignment to avoid compatibility issues.

---

Click:

```text
Review + Create

↓

Create
```

Wait about 20–30 seconds.

<img width="698" height="1172" alt="image" src="https://github.com/user-attachments/assets/b7346b77-229b-442d-8468-9977766dbf26" />

<img width="2483" height="695" alt="image" src="https://github.com/user-attachments/assets/fa3f82a8-0151-4e51-baa0-c08b462fd4f8" />

---

## Step 3: Create a Virtual Network (VNet)

Search:

```text
Virtual Networks
```

Click:

```text
Create
```

<img width="983" height="1171" alt="image" src="https://github.com/user-attachments/assets/f4b4ce24-1de9-43c5-85bf-d471fe9e2459" />

---

## Basics Tab

| Field          | Value                             |
| -------------- | --------------------------------- |
| Resource Group | `week3-rg`                        |
| Name           | `week3-vnet`                      |
| Region         | Same region as the Resource Group |

Click:

```text
Next
```

---

## Step 4: Configure IP Addresses

This is where Q2 becomes useful.

Azure may automatically create:

```text
10.0.0.0/16
```

Keep it.

If not, enter:

```text
10.0.0.0/16
```

---

Now I'll see a subnet.

Rename it.

Example:

```text
default

↓

frontend-subnet
```

Subnet Address Range:

```text
10.0.1.0/24
```

So now my network looks like this:

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

Wait until Azure says:

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


## What Just Happened?

I created:

```text
week3-rg
        │
        ▼
week3-vnet
        │
        ▼
frontend-subnet
````

This is the foundation for almost every Azure network.

---

## Step 5: Verify the VNet

Go to:

```text
Virtual Networks

↓

week3-vnet
```

I should see:

```text
Address Space

10.0.0.0/16
```

---

Click:

```text
Subnets
```

I should see:

```text
frontend-subnet

10.0.1.0/24
```

Congratulations!

I've successfully created my first Azure network.

---

## Diagram

<img width="1122" height="1402" alt="image" src="https://github.com/user-attachments/assets/597e954d-329b-4b13-ab8e-90cb5fd67201" />

---

## Why Do We Create a `/16` VNet?

Because later we can create more subnets:

```text
10.0.0.0/16 (VNet)
│
├── 10.0.1.0/24 → Frontend Subnet
├── 10.0.2.0/24 → Backend Subnet
├── 10.0.3.0/24 → Database Subnet
└── 10.0.4.0/24 → AKS Subnet
```

All of them fit inside:

```text
10.0.0.0/16
```

This is why companies usually create a **larger VNet** and then divide it into **smaller subnets**.

---

## Common Beginner Mistakes

Creating the VNet in one region and the VM in another.

Always use the same region.

---

Creating a `/24` VNet.

Use `/16` for the VNet and `/24` for the subnet unless the assignment specifies otherwise.

---

Creating resources in different Resource Groups.

Keep everything in **`week3-rg`**.

This also makes cleanup easy:

```bash
az group delete --name week3-rg --yes --no-wait
```

Deleting the Resource Group deletes everything inside it.

---

> A Virtual Network (VNet) is the private network where Azure resources communicate securely. A subnet is a smaller section of the VNet used to organize resources based on their role, such as frontend or backend. In this lab, I created a VNet with the address space `10.0.0.0/16` and a subnet with the address range `10.0.1.0/24`. This design provides room for future expansion while keeping workloads organized.

---


# Q4.

What is the difference between a **private IP** and a **public IP**? Can a VM work without a public IP? Explain.

## Answer

## Step 1: What is an IP Address?

Think of an IP address as a **home address**.

If someone wants to send I a letter, they need my address.

Similarly, if one computer wants to communicate with another, it needs its IP address.

Example:

```text
VM
↓

10.0.1.4
````

This is the VM's address.

---

## Step 2: Two Types of IP Addresses

There are **two main types**:

1. Private IP
2. Public IP

---

## Analogy

Imagine you live in an apartment.

my apartment has:

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

The **flat number** only makes sense **inside the building**.

The **building address** is what the outside world uses.

Now compare that to Azure.

```text
Flat Number

↓

Private IP

Building Address

↓

Public IP
```

---

## Real-Life Example

Suppose you work in an office.

Inside the office:

```text
HR

Finance

IT
```

Everyone can walk to each other's desks.

But someone outside the company cannot directly enter the office.

The office has one main entrance.

Azure works the same way.

---

## What is a Private IP?

A Private IP is used **inside the Virtual Network (VNet)**.

Example:

```text
VM1

10.0.1.4
```

```text
Database

10.0.1.5
```

Both are inside the same VNet.

They can communicate directly.

The internet **cannot** reach these addresses.

---

## Diagram

```text
Internet
    │
    ✖ Cannot directly access
    │
┌──────────────────────────────┐
│ VNet: 10.0.0.0/16            │
│                              │
│ 10.0.1.0/24                  │
│ ├── VM: 10.0.1.4             │
│ └── VM: 10.0.1.5             │
└──────────────────────────────┘
```

- 10.x.x.x addresses are private IP addresses. Only devices inside the VNet can access them.
- They are not directly reachable from the Internet.
- To access them from the Internet, you typically need a Public IP, Load Balancer, Application Gateway, Azure Bastion, or VPN, depending on the scenario.

---

## What is a Public IP?

A **Public IP** is an IP address that is **reachable from the Internet**.

Example:

```text
20.120.50.10
```

Anyone who knows this IP can **attempt** to connect to it, but whether the connection succeeds depends on security rules such as **Network Security Groups (NSGs)**, Azure Firewall, or the application itself.

Example:

```text
My Laptop
    │
    ▼
Internet
    │
    ▼
20.120.50.10 (Public IP)
    │
    ▼
Azure VM
```

---

## Diagram

```text
                Internet
                    │
                    ▼
          Public IP Address
          20.120.50.10
                    │
                    ▼
        Network Interface (NIC)
        ├── Public IP : 20.120.50.10
        └── Private IP: 10.0.1.4
                    │
                    ▼
               Azure VM
```

### Explanation

- The **Public IP** is like the **front gate** of a building—it is visible and reachable from the Internet.
- The **Private IP** is like the **room number** inside the building—it is used only within the private network (VNet).
- The **Public IP** allows external users to reach the VM (subject to security rules).
- The VM uses its **Private IP** (`10.0.1.4`) to communicate with other resources inside the **Virtual Network (VNet)**.
- If a VM has **no Public IP**, it **cannot be accessed directly from the Internet**. You would typically access it through services such as **Azure Bastion**, a **VPN**, or another secure method.
- In Azure, the **Network Interface (NIC)** is the resource that owns the VM's IP configuration (private IP and, if configured, the associated public IP).
---


## Can a VM Work Without a Public IP?

A VM **does not need** a Public IP to run.

It can still:

* Boot successfully
* Communicate with other VMs in the same VNet
* Connect to Azure services (depending on networking setup)
* Be managed using services like Azure Bastion

The only thing you **cannot** do is connect to it **directly from the internet**.

---

## Example 1: VM with Public IP

```text
My Laptop
    │
    ▼
Internet
    │
    ▼
Public IP
    │
    ▼
Azure VM
```

You can SSH directly (if port 22 is allowed by NSG/firewall rules).

---

## Example 2: VM without Public IP

```text
My Laptop
    │
    ▼
Internet
    │
    ▼
Azure Bastion
    │
    ▼
Azure VM
(Private IP Only)
```

The VM is still running and accessible, but it is **not directly exposed to the Internet**.

This is generally considered **more secure** because attackers cannot directly connect to the VM's IP address from the Internet.



---

## Comparison Table

| Feature                        | Private IP                                        | Public IP                                |
| ------------------------------ | ------------------------------------------------- | ---------------------------------------- |
| Visible on Internet?           | No                                                | Yes                                      |
| Used Inside VNet?              | Yes                                               | No                                       |
| Can Internet connect directly? | No                                                | Yes (if allowed by NSG)                  |
| More Secure?                   | Yes                                               | Less secure because it's internet-facing |
| Changes?                       | Usually stays with the VM's network configuration | Can be Static or Dynamic                 |
| Example                        | `10.0.1.4`                                        | `20.x.x.x`                               |

---

## Real Company Example

Suppose Amazon has:

```text
Web Server

↓

Public IP
```

Customers must reach the website.

But:

```text
Database Server

↓

Private IP
```

Customers should **never** connect directly to the database.

Only the web server should.

Architecture:

```text
Internet
    │
    ▼
Public IP
    │
    ▼
Web Server (Public IP + Private IP)
(Public: 20.120.50.10)
(Private: 10.0.1.4)
    │
    │  Uses Private Network
    ▼
Database
(Private IP Only: 10.0.2.4)
```

- This is a common production design.
- The **Internet** reaches the **Web Server** through its **Public IP**.
- The **Web Server** communicates with the **Database** using the **Database's Private IP** over the VNet.
- The **Database has no Public IP**, so it **cannot be accessed directly from the Internet**.

This is the architecture commonly used in Azure and AWS:

**Frontend/Web Server** → Public IP
**Backend/Database** → Private IP only

---

## Why Not Give Every VM a Public IP?

Imagine every room in my house had its own front door opening directly to the street.

That would make it much easier for unwanted visitors to try every door.

Instead, you usually have:

```text
One Main Gate

↓

House

↓

Rooms
```

Azure follows the same principle.

---

## Common Beginner Mistakes

Thinking a VM needs a Public IP to run.

It only needs a Public IP if you want direct internet access.

---

Thinking a Private IP is accessible from home.

A Private IP is only reachable within its network (or through configured private connectivity).

---

Thinking a Public IP automatically allows login.

You also need an NSG rule permitting the traffic and the appropriate service (such as SSH) running.

---



> A Private IP is used for communication within an Azure Virtual Network and is not accessible from the internet. A Public IP is internet-routable and allows external users to connect to Azure resources, provided security rules permit it. A virtual machine can work without a Public IP because it can still communicate within the VNet and can be accessed securely using services like Azure Bastion. In production, many organizations keep application and database servers on Private IPs to reduce internet exposure.

---

## Revision

```text
Private IP

↓

Inside VNet

↓

More Secure

↓

Not reachable from Internet
```

```text
Public IP

↓

Internet Facing

↓

Direct Access Possible

↓

Requires Proper Security
```

---



# Q5. Create a VM with no inbound ports open and attempt to SSH. Explain the difference between a **Connection Timed Out** error and a **Connection Refused** error, and which one you received.

## Answer

This is my first practical Azure networking troubleshooting lab.

This lab helps you understand:

* How to create an Azure Virtual Machine
* How SSH works
* What inbound ports mean
* How Network Security Groups (NSGs) control access
* The difference between **Connection Timed Out** and **Connection Refused**

---

## Step 1: What is an Azure Virtual Machine (VM)?

A Virtual Machine is a computer running inside Microsoft's Azure datacenter.

A physical computer has:

```
CPU
RAM
Storage
Operating System
```

An Azure VM has the same components:

```
Azure Virtual Machine

+----------------+
| Ubuntu Linux   |
|                |
| CPU            |
| RAM            |
| Disk           |
+----------------+
```

The only difference is that the computer is hosted in the cloud instead of my home.

---

## Step 2: What is SSH?

SSH stands for:

> Secure Shell

SSH allows you to securely connect to and manage a Linux machine remotely.

Example:

my laptop:

```
Terminal
```

connects to:

```
Azure Linux VM
```

You can then run commands remotely.

---

## Simple Analogy 

Imagine my friend lives in another city.

You want to enter their house.

The house has a door.

```
my Location

      |
      |
      ▼

Friend's House

      🚪
```

The door is like a network port.

For Linux SSH:

```
Port 22 = SSH Door
```

If the door is closed, you cannot enter.

---

## Step 3: What is a Port?

A port is a communication endpoint used by applications.

Think of a computer as a building.

```
Computer Building

+----------------+
| Door 22        | → SSH
| Door 80        | → HTTP Website
| Door 443       | → HTTPS Website
+----------------+
```

Common ports:

| Port | Service | Purpose                     |
| ---- | ------- | --------------------------- |
| 22   | SSH     | Remote Linux administration |
| 80   | HTTP    | Website traffic             |
| 443  | HTTPS   | Secure website traffic      |

---

## Step 4: What Does "No Inbound Ports Open" Mean?

When creating an Azure VM, Azure asks:

```
Allow inbound ports?
```

Inbound means:

> Traffic coming from outside Azure into my VM.

Example:

```
my Laptop

      |
      |
      ▼

Azure VM
```

If you choose:

```
Public inbound ports:

None
```

Azure creates no rule allowing incoming connections.

---

## Network View

Before:

```
Internet

    |
    ▼

NSG

22 SSH ❌ Blocked

    |
    ▼

Azure VM
```

The VM is running, but nobody from the internet can connect.

---

## Step 5: Create the Azure VM

Go to:

```
Azure Portal

↓

Virtual Machines

↓

Create

↓

Azure Virtual Machine
```

---

## Basics Configuration

Use:

| Setting              | Value                                       |
| -------------------- | ------------------------------------------- |
| Resource Group       | week3-rg                                    |
| Virtual Machine Name | week3-vm                                    |
| Region               | Same region as my VNet                    |
| Image                | Ubuntu Server 24.04 LTS                     |
| Size                 | Standard B1s (or available low-cost option) |
| Authentication       | SSH Public Key                              |

---

## Networking Configuration

Select:

| Setting         | Value           |
| --------------- | --------------- |
| Virtual Network | week3-vnet      |
| Subnet          | frontend-subnet |

Now check:

```
Public Inbound Ports
```

Choose:

```
None
```

This is the important step.

It means:

```
No SSH rule
No HTTP rule
No RDP rule
```

will be created.

---

Click:

```
Review + Create

↓

Create
```

Wait for deployment completion.

---

## Step 6: Attempt SSH Connection

After deployment:

Go to:

```
Virtual Machine

↓

Overview
```

Copy the Public IP address.

Example:

```
20.xxx.xxx.xxx
```

From my terminal:

```bash
ssh azureuser@20.xxx.xxx.xxx
```

---

## Expected Result

You will most likely receive:

```
Connection timed out
```

---

## Why Does This Happen?

The traffic flow looks like this:

```
my Laptop

      |
      ▼

Internet

      |
      ▼

Azure NSG

      |
      X

SSH Port 22 Blocked

      |
      ▼

Azure VM
```

The request never reaches the VM.

The firewall silently drops the traffic.

my computer keeps waiting until the timeout period expires.

---

## What is "Connection Timed Out"?

A timeout means:

> The connection request was sent, but no response was received.

Example:

You call someone:

```
Phone Ringing...

Ring...

Ring...

No Answer
```

Eventually:

```
Call Failed
```

That is a timeout.

---

## Network Example

```
Laptop

   |
   ▼

SSH Request

   |
   ▼

NSG

❌ Dropped

   |
   ▼

No Response

   |
   ▼

Connection Timed Out
```

---

## What is "Connection Refused"?

A refused connection is different.

It means:

> The request reached the destination, but the service rejected it.

Example:

You knock on a door.

Someone opens it and says:

> "You cannot enter."

You received a response.

---

## Network Example

```
Laptop

   |
   ▼

Azure VM

   |
   ▼

SSH Service

   |
   ▼

Not Running / Not Listening

   |
   ▼

Connection Refused
```

---

## Connection Timed Out vs Connection Refused

| Feature             | Connection Timed Out            | Connection Refused  |
| ------------------- | ------------------------------- | ------------------- |
| Request reaches VM? | ❌ No                            | ✅ Yes               |
| Response received?  | ❌ No                            | ✅ Yes               |
| Common Cause        | Firewall / NSG blocking traffic | Service not running |
| Speed               | Takes time                      | Immediate           |
| Example             | Port 22 blocked                 | SSH service stopped |

---

## Which Error Did You Receive?

Because the VM was created with:

```
No inbound ports open
```

The expected error is:

```
Connection Timed Out
```

Reason:

```
SSH Port 22

↓

Blocked by NSG

↓

Request never reaches VM

↓

Timeout
```

---

## Screenshots 

Capture:

## 1. VM Overview

Show:

* VM name
* Running status
* Public IP

## 2. Networking Page

Show:

```
No inbound security rules
```

or

```
Port 22 not allowed
```

## 3. Terminal Output

Show:

```text
ssh azureuser@<public-ip>

Connection timed out
```

---

## Common Beginner Mistakes

## Mistake 1

❌ "The VM is broken."

Reality:

✅ The VM is working.

Only network access is blocked.

---

## Mistake 2

❌ "A Public IP means SSH should work."

Reality:

A Public IP only gives the VM an address.

You also need:

```
Public IP

+

NSG Rule

+

SSH Service Running
```

---

## Mistake 3

Confusing errors:

Remember:

```
Connection Timed Out

↓

Nobody answered
```

```
Connection Refused

↓

Someone answered

but rejected the request
```

---



> A connection timed out error means that the connection request never reached the target machine, usually because a firewall, Network Security Group, or network route blocked the traffic. A connection refused error means that the request successfully reached the machine, but the application or service was not accepting connections on that port. In this lab, I created an Azure VM without inbound ports open, so SSH traffic on port 22 was blocked by the NSG and I received a connection timed out error.

---

## Revision

```
No Inbound SSH Rule

        |
        ▼

NSG Blocks Port 22

        |
        ▼

Request Never Reaches VM

        |
        ▼

Connection Timed Out
```

---

```
Port 22 Allowed

        |
        ▼

Request Reaches VM

        |
        ▼

SSH Service Not Available

        |
        ▼

Connection Refused
```

---



# Q6. What is the difference between a **Network Security Group (NSG)** and a **Route Table**? Compare them in a table covering purpose, what they act on, and what they attach to.

## Answer

This is one of the most important Azure networking concepts.

Many confuse **NSG** and **Route Table** because both are related to network traffic.

However, they solve completely different problems.

The easiest way to remember:

```text
Route Table

↓

Where should traffic go?


NSG

↓

Should this traffic be allowed?
```

---

## Step 1: Understand Network Traffic

Whenever a packet moves inside Azure, two questions must be answered.

# Question 1:

> Where should this packet travel?

This is routing.

Handled by:

```text
Route Table
```

---

# Question 2:

> Is this packet allowed?

This is security.

Handled by:

```text
Network Security Group (NSG)
```

---

## Real-Life Analogy 

Imagine driving to a shopping mall.

## Step 1: Finding the Road

Google Maps tells you:

```text
Home

↓

Highway

↓

Mall
```

It decides the path.

This is:

```text
Route Table
```

---

## Step 2: Security Check

When you reach the mall entrance:

The security guard asks:

```text
Do you have permission to enter?
```

Allowed:

```text
✅ Enter
```

Not allowed:

```text
❌ Stop
```

This is:

```text
NSG
```

---

## Analogy 

Imagine my school.

You want to visit the library.

my teacher says:

```text
Classroom

↓

Left Corridor

↓

Second Floor

↓

Library
```

The directions are the:

```text
Route Table
```

---

When you reach the library:

The librarian checks:

```text
Do you have a student ID?
```

Allowed?

```text
Yes → Enter
```

Denied?

```text
No → Stop
```

That is:

```text
NSG
```

---

## What is a Route Table?

A Route Table defines:

> Where network traffic should go next.

It decides the path using routes.

Example:

A VM wants to access the internet.

Azure checks:

```text
Destination:

0.0.0.0/0
```

Route:

```text
Next Hop:

Internet
```

Traffic goes:

```text
VM

↓

Internet

↓

Website
```

---

## Route Table Example: Using Azure Firewall

Without custom routing:

```text
VM

    |
    ▼

Internet
```

---

Company requirement:

> All internet traffic must pass through a firewall.

A User Defined Route (UDR) is created:

```text
VM

    |
    ▼

Azure Firewall

    |
    ▼

Internet
```

The route changed.

---

## What is an NSG?

NSG stands for:

> Network Security Group

An NSG acts like a virtual firewall.

It controls:

* Source IP
* Destination IP
* Port
* Protocol
* Direction

Example:

Allow SSH:

```text
Source:

My IP

Destination:

VM

Port:

22

Action:

Allow
```

---

Allow website traffic:

```text
Port 80

↓

Allow
```

---

Block RDP:

```text
Port 3389

↓

Deny
```

---

## Traffic Flow Example

A user connects to a VM.

```text
Internet

     |
     ▼

Route Table

"Which path?"

     |
     ▼

NSG

"Allowed or Blocked?"

     |
     ▼

VM
```

---

## Important Difference

A Route Table does:

```text
Choose the road
```

An NSG does:

```text
Check permission
```

---

## Water Pipe Analogy 

Imagine water flowing through pipes.

## Route Table

It decides:

```text
Which pipe should water use?
```

Example:

```text
Pipe A

or

Pipe B
```

---

## NSG

It is the valve:

```text
Open?

↓

Allow water
```

or

```text
Closed?

↓

Block water
```

---

## NSG vs Route Table Comparison

| Feature               | Network Security Group (NSG)  | Route Table                       |
| --------------------- | ----------------------------- | --------------------------------- |
| Purpose               | Control and filter traffic    | Decide traffic path               |
| Works Like            | Firewall / Security Guard     | GPS / Road Map                    |
| Main Question         | "Should traffic be allowed?"  | "Where should traffic go?"        |
| Acts On               | IP, Port, Protocol, Direction | Destination IP and Next Hop       |
| Controls              | Access                        | Routing                           |
| Blocks Traffic        | ✅ Yes                         | ❌ No                              |
| Changes Path          | ❌ No                          | ✅ Yes                             |
| Created Automatically | Default NSG possible          | Azure system routes automatically |
| Custom Rules          | Security Rules                | Routes                            |
| Attached To           | Subnet or NIC                 | Subnet                            |

---

## Where Are They Attached?

## NSG Attachment

An NSG can be attached to:

```text
Subnet

OR

Network Interface (NIC)
```

Example:

```text
VNet

 |
 |
 +----------------+
 | Subnet         |
 |                |
 | NSG            |
 |                |
 | VM             |
 +----------------+
```

---

A NIC-level NSG:

```text
VM

 |

NIC

 |

NSG
```

---

## Route Table Attachment

A Route Table is attached to:

```text
Subnet
```

Example:

```text
VNet

 |
 |
 +----------------+
 | Subnet         |
 |                |
 | Route Table    |
 |                |
 | VM             |
 +----------------+
```

---

## Azure Real Example

Imagine a web application.

Architecture:

```text
Internet

      |
      ▼

Public Subnet

      |
      ▼

Frontend VM

      |
      ▼

Backend Subnet

      |
      ▼

Database
```

---

Security requirement:

Allow users to access website:

```text
Port 443

Allow
```

Handled by:

```text
NSG
```

---

Routing requirement:

Backend servers must access the internet only through Azure Firewall.

Handled by:

```text
Route Table
```

---

## Common Beginner Mistakes

## Mistake 1

❌ "Route Table blocks traffic."

Wrong.

A Route Table only chooses the path.

---

## Mistake 2

❌ "NSG decides where traffic goes."

Wrong.

NSG only allows or denies.

---

## Mistake 3

❌ "NSG and Route Table do the same thing."

Wrong.

They work together but have different responsibilities.

---

## Remember

Remember:

## NSG

Think:

```text
N

↓

No or Yes
```

It answers:

```text
Allow?

or

Deny?
```

---

## Route Table

Think:

```text
Route

↓

Road
```

It answers:

```text
Which way?
```

---



> A Network Security Group (NSG) is a virtual firewall in Azure that controls inbound and outbound traffic using rules based on source, destination, port, protocol, and direction. A Route Table controls traffic routing by defining where packets should go using routes and next hops. An NSG decides whether traffic is allowed, while a Route Table decides the path traffic follows. NSGs attach to subnets or network interfaces, whereas Route Tables are associated with subnets.

---

## Visual Summary

```text
                 Traffic

                    |
                    ▼

        +---------------------+
        |     Route Table     |
        |                     |
        | Where should it go? |
        +---------------------+

                    |
                    ▼

        +---------------------+
        |        NSG          |
        |                     |
        | Allow or Block?     |
        +---------------------+

                    |
                    ▼

                  VM
```

---

## Revision

```text
Route Table

↓

Direction

↓

Where does traffic go?
```

```text
NSG

↓

Security

↓

Should traffic enter?
```

---

# Q7. 
Open ports 22, 80, and 443 one at a time, test SSH/Web access, and document what became possible after each.

## Answer

This lab demonstrates how **Network Security Groups (NSGs)** control access to Azure Virtual Machines.

Instead of opening everything together, we will open each port separately and observe the result.

By the end of this lab, you will understand:

* Why port 22 is required for SSH
* Why port 80 is required for HTTP websites
* Why port 443 is required for HTTPS
* How opening a port changes what users can access

---

## Lab Goal

We start with:

```text
Azure VM

+

NSG

+

All inbound ports blocked
```

Then we open:

```text
## Step 1 → Port 22

↓

## Step 2 → Port 80

↓

## Step 3 → Port 443
```

and test the result after each change.

---

## Step 1: Understand Ports

A port is like a door on a computer.

Different services use different doors.

Example:

```text
Azure VM

+-------------------+
|                   |
| Port 22           | → SSH
| Port 80           | → HTTP
| Port 443          | → HTTPS
|                   |
+-------------------+
```

---

## Port Overview

| Port | Protocol | Used For               | Purpose                     |
| ---- | -------- | ---------------------- | --------------------------- |
| 22   | SSH      | Linux Remote Access    | Manage VM remotely          |
| 80   | HTTP     | Website Traffic        | Access websites             |
| 443  | HTTPS    | Secure Website Traffic | Encrypted web communication |

---

## Initial State

Before opening any ports:

```text
Internet

     |
     ▼

Azure NSG

22  ❌

80  ❌

443 ❌

     |
     ▼

Azure VM
```

Result:

```text
No SSH

No Website

No HTTPS
```

---

## PART 1: Open Port 22 (SSH)

## Why Port 22?

Port 22 allows administrators to remotely connect to Linux machines.

Example:

```bash
ssh username@public-ip
```

---

## Azure Portal Steps

Go to:

```text
Azure Portal

↓

Virtual Machines

↓

week3-vm

↓

Networking

↓

Inbound Port Rules

↓

Add inbound rule
```

---

Create the rule:

| Setting          | Value         |
| ---------------- | ------------- |
| Source           | My IP Address |
| Source Port      | Any           |
| Destination      | Any           |
| Service          | SSH           |
| Destination Port | 22            |
| Action           | Allow         |
| Priority         | 300           |
| Name             | Allow-SSH     |

---

Click:

```text
Add
```

---

## Test SSH Connection

From my terminal:

```bash
ssh azureuser@<public-ip>
```

Example:

```bash
ssh azureuser@20.xxx.xxx.xxx
```

---

Successful output:

```text
Welcome to Ubuntu

azureuser@week3-vm:~$
```

---

## What Became Possible?

Before opening Port 22:

```text
❌ Cannot connect remotely
```

After opening Port 22:

```text
✅ Can securely manage Linux VM
```

---

## Traffic Flow

```text
my Laptop

      |
      ▼

Internet

      |
      ▼

NSG

Port 22 ✅

      |
      ▼

Azure VM

SSH Login Successful
```

---

## Screenshot Required

Capture:

✅ NSG rule showing:

```text
SSH

Port 22

Allow
```

and:

✅ Terminal showing successful SSH connection

---

## PART 2: Open Port 80 (HTTP)

## Why Port 80?

Port 80 allows users to access websites using HTTP.

Example:

```text
Browser

↓

http://public-ip

↓

Web Server
```

---

## Step 1: Install Web Server

First SSH into my VM.

Install Apache:

```bash
sudo apt update
```

```bash
sudo apt install apache2 -y
```

---

Start Apache:

```bash
sudo systemctl start apache2
```

Enable it:

```bash
sudo systemctl enable apache2
```

Check status:

```bash
systemctl status apache2
```

Expected:

```text
active (running)
```

---

## Step 2: Open Port 80

Create NSG rule:

| Setting | Value      |
| ------- | ---------- |
| Source  | Any        |
| Service | HTTP       |
| Port    | 80         |
| Action  | Allow      |
| Name    | Allow-HTTP |

---

Click:

```text
Add
```

---

## Test Website Access

Open browser:

```text
http://<public-ip>
```

Example:

```text
http://20.xxx.xxx.xxx
```

You should see:

```text
Apache2 Ubuntu Default Page
```

---

## What Became Possible?

Before:

```text
Browser

↓

Port 80 blocked

↓

Website unavailable
```

After:

```text
Browser

↓

Port 80 allowed

↓

Apache Website Accessible
```

---

## Traffic Flow

```text
Internet

      |
      ▼

NSG

Port 80 ✅

      |
      ▼

Apache Web Server

      |
      ▼

Website Displayed
```

---

## Screenshot Required

Capture:

✅ NSG rule showing:

```text
HTTP

Port 80

Allow
```

and:

✅ Browser showing Apache page

---

## PART 3: Open Port 443 (HTTPS)

## Why Port 443?

Port 443 is used for HTTPS.

HTTPS provides:

* Encryption
* Secure communication
* Data protection

---

## HTTP vs HTTPS

HTTP:

```text
Browser

↓

Website

(Unencrypted)
```

---

HTTPS:

```text
Browser

↓

Encrypted Connection

↓

Website
```

---

## Analogy

HTTP:

Sending a postcard.

Anyone can read it.

---

HTTPS:

Sending a locked envelope.

Only the receiver can open it.

---

## Open Port 443

Create NSG rule:

| Setting | Value       |
| ------- | ----------- |
| Source  | Any         |
| Service | HTTPS       |
| Port    | 443         |
| Action  | Allow       |
| Name    | Allow-HTTPS |

---

## Important Note

Opening port 443 alone does NOT create HTTPS.

You also need:

* SSL/TLS certificate
* Web server HTTPS configuration

Example:

```text
Port 443

+

Certificate

+

Apache/Nginx HTTPS Setup

=

Secure Website
```

---

## What Became Possible?

After opening Port 443:

```text
VM can accept HTTPS traffic
```

However:

```text
HTTPS will work only after SSL configuration
```

---

## Final Architecture

## Initially

```text
Internet

      |
      ▼

NSG

22 ❌

80 ❌

443 ❌

      |
      ▼

VM
```

---

## After Port 22

```text
Internet

      |
      ▼

NSG

22 ✅

80 ❌

443 ❌

      |
      ▼

VM

SSH Available
```

---

##  After Port 80

```text
Internet

      |
      ▼

NSG

22 ✅

80 ✅

443 ❌

      |
      ▼

VM

SSH + Website
```

---

##  After Port 443

```text
Internet

      |
      ▼

NSG

22 ✅

80 ✅

443 ✅

      |
      ▼

VM

SSH

HTTP

HTTPS Ready
```

---

## Comparison Table

| Port | Service | What Became Possible?                      |
| ---- | ------- | ------------------------------------------ |
| 22   | SSH     | Remote VM administration                   |
| 80   | HTTP    | Website accessible through browser         |
| 443  | HTTPS   | Secure web traffic after SSL configuration |

---

## Common Beginner Mistakes

## Mistake 1

❌ Opening Port 80 but not installing a web server.

Result:

```text
Port open

but

No website
```

---

## Mistake 2

❌ Opening Port 443 and expecting HTTPS immediately.

Reality:

You still need:

```text
SSL Certificate

+

HTTPS Configuration
```

---

## Mistake 3

❌ Allowing SSH from Any.

Better:

```text
Source:

My IP Address
```

because SSH should not be exposed unnecessarily.

---



> Port 22 is used for SSH and allows secure remote administration of Linux virtual machines. Port 80 is used for HTTP and allows users to access web applications without encryption. Port 443 is used for HTTPS and enables encrypted web communication after SSL/TLS configuration. In my Azure lab, opening port 22 allowed SSH access to the VM, opening port 80 allowed the Apache web page to be accessed from a browser, and opening port 443 allowed the VM to accept secure HTTPS traffic after certificate configuration.

---

## Screenshots Checklist

Capture:

1. ✅ NSG rule for Port 22
2. ✅ Successful SSH login
3. ✅ NSG rule for Port 80
4. ✅ Browser showing Apache page
5. ✅ NSG rule for Port 443

---

## Revision

```text
Port 22

↓

SSH

↓

Manage VM
```

```text
Port 80

↓

HTTP

↓

Website Access
```

```text
Port 443

↓

HTTPS

↓

Secure Website Traffic
```

---


# Q8. What is the difference between NSG Source options: Any vs My IP Address vs Service Tag? Which is safest for SSH?

## Answer

In Q7, we learned:

> Opening a port creates a door.

Now Q8 teaches us:

> **Who is allowed to enter through that door?**

Opening SSH Port 22 is not enough.

We must decide:

**Who can access SSH?**

That decision is controlled by the **Source** option in an Azure Network Security Group (NSG) rule.

---

## Step 1: What is Source in NSG?

Imagine my house.

Someone is standing outside my door.

The first question you ask is:

> "Who is trying to enter?"

That person is the **source**.

In networking:

```text
Source
   |
   |
   ▼
Destination


my Laptop
      |
      |
      ▼
Azure VM
```

---

## Networking Meaning

| Term        | Meaning                   |
| ----------- | ------------------------- |
| Source      | Where traffic comes from  |
| Destination | Where traffic goes        |
| Port        | Which service is accessed |

Example:

```text
Laptop

Source IP:
49.xx.xx.xx


Destination:

Azure VM

Port:
22
```

Meaning:

> Allow this laptop to SSH into my VM.

---

##  Analogy

Imagine my school gate.

The security guard asks:

> "Who are you?"

There are three possible answers.

---

## Option 1: Any

Student says:

> "Anyone can enter."

Security says:

> "Okay, everyone is allowed."

This is:

```
Any
```

---

## Option 2: My IP Address

Student says:

> "Only my home address is allowed."

This is:

```
My IP Address
```

Only my computer can enter.

---

## Option 3: Service Tag

Student says:

> "Allow all teachers."

Instead of writing every teacher's name:

```
Teacher Group
```

is created.

This is:

```
Service Tag
```

---

##  Real-World Analogy

Imagine an apartment building.

You want to control who can enter.

---

## Any

Building security says:

```
Everyone is welcome
```

Visitors:

```
Person A ✅

Person B ✅

Unknown Person ✅

Attacker ✅
```

Very open.

---

## My IP Address

Security says:

```
Only Apartment 302 owner can enter
```

Only one person.

More secure.

---

## Service Tag

Security says:

```
Allow all delivery employees
```

Instead of listing:

```
Amazon driver
FedEx driver
DHL driver
...
```

One group is created:

```
Delivery Employees
```

---

## Option 1: Any

## What is Any?

When Source is:

```
Any
```

Azure allows traffic from:

```
0.0.0.0/0
```

Meaning:

```
Every IP address on Internet
```

---

## Diagram

```text
             Internet

 Laptop A  ─────┐

 Laptop B  ─────┤

 Hacker    ─────┤

 Bot       ─────┘


          ▼

        NSG

     Source: Any


          ▼

       Azure VM
```

Everyone can try.

---

## Example Rule

```
Inbound Rule

Source:
Any

Destination:
VM

Port:
22

Action:
Allow
```

Meaning:

> Anyone on the internet can attempt SSH.

---

## Security Level

❌ Lowest security

Why?

Because attackers constantly scan the internet for:

```
Port 22 Open
```

---

## Option 2: My IP Address

## What is My IP Address?

Azure detects my current public IP.

Example:

```
my Laptop

Public IP:

49.37.xx.xx
```

Azure creates:

```
Allow

Source:

49.37.xx.xx

Port:

22
```

---

## Diagram

```text
my Laptop

49.xx.xx.xx

      │

      ▼

    NSG

Allow:

49.xx.xx.xx

      │

      ▼

    VM
```

---

Other people:

```
Friend Laptop ❌

Office Laptop ❌

Attacker ❌
```

---

## Security Level

✅ Highest security for personal SSH access.

Best for:

* Learning labs
* Personal VMs
* Administrator access

---

## Option 3: Service Tag

## What is a Service Tag?

A Service Tag is a predefined group of Azure IP addresses.

Azure manages the IP list automatically.

Instead of writing:

```
20.1.1.1
20.1.1.2
20.1.1.3
...
```

Azure provides:

```
AzureLoadBalancer
```

or

```
VirtualNetwork
```

---

## Diagram

Without Service Tag:

```text
Azure IP 1

Azure IP 2

Azure IP 3

Azure IP 4

      |
      ▼

      VM
```

Too many IPs.

---

With Service Tag:

```text
AzureLoadBalancer

        |

        ▼

       NSG

        |

        ▼

       VM
```

Azure manages the addresses.

---

## Common Azure Service Tags

| Service Tag       | Purpose                           |
| ----------------- | --------------------------------- |
| VirtualNetwork    | Resources inside the VNet         |
| AzureLoadBalancer | Azure Load Balancer health probes |
| Internet          | Public internet traffic           |
| AzureCloud        | Azure datacenter IP ranges        |

---

## Comparison Table

| Feature               | Any             | My IP Address          | Service Tag                 |
| --------------------- | --------------- | ---------------------- | --------------------------- |
| Allows                | Everyone        | Only my IP           | Azure service/group         |
| Security              | ❌ Low           | ✅ High                 | ✅ Depends on usage          |
| Used For              | Public services | SSH/RDP administration | Azure service communication |
| Example               | Public website  | Admin login            | Load Balancer checks        |
| Manual IP list needed | No              | No                     | No                          |

---

## Which is Safest for SSH?

##  Answer:

```
My IP Address
```

---

## Why?

SSH gives administrative access.

Example:

```text
Port 22

↓

Linux Shell

↓

Full VM Control
```

Therefore, we should restrict who can connect.

---

## Secure SSH Flow

```text
my Laptop

       |
       |
       ▼

Source:

My IP Address


       |
       |
       ▼

NSG

Allow Port 22


       |
       |
       ▼

Azure VM
```

---

## Why Not Any for SSH?

Because:

```text
Internet

      |
      |
      ▼

Port 22 Open

      |
      |
      ▼

Attackers can try login
```

Even if password is strong, allowing everyone increases risk.

---

## Why Not Service Tag for SSH?

Because my laptop is not an Azure service.

Example:

Wrong:

```
Source:

AzureLoadBalancer

Port:

22
```

my laptop does not belong to Azure Load Balancer.

---

## Practical Azure Lab

## Open VM

Go to:

```
Azure Portal

↓

Virtual Machines

↓

week3-vm

↓

Networking
```

---

## Check NSG Rules

You will see:

```
Inbound security rules
```

---

## Add SSH Rule

Click:

```
Add inbound port rule
```

Configure:

| Setting  | Value          |
| -------- | -------------- |
| Source   | My IP Address  |
| Service  | SSH            |
| Port     | 22             |
| Action   | Allow          |
| Priority | 300            |
| Name     | Allow-SSH-MyIP |

---

## Test SSH

Terminal:

```bash
ssh azureuser@<public-ip>
```

Expected:

```text
Welcome to Ubuntu
```

---

## Screenshots Required

Take screenshots of:

## 1. NSG Rule

Showing:

```
Source:

My IP Address

Destination:

VM

Port:

22
```

---

## 2. Successful SSH

Terminal:

```text
ubuntu@week3-vm:
```

---

## Common Beginner Mistakes

## ❌ Mistake 1

Using:

```
Source: Any
```

for SSH.

Problem:

Everyone can try connecting.

---

## ❌ Mistake 2

Thinking Service Tag means users.

Wrong.

Service Tag = Azure managed IP group.

---

## ❌ Mistake 3

Thinking My IP Address is permanent.

my public IP can change.

Example:

Today:

```
49.xx.xx.xx
```

Tomorrow:

```
103.xx.xx.xx
```

You may need to update the rule.

---



> In Azure NSG rules, the Source option defines where incoming traffic is allowed from. **Any** allows traffic from all internet IP addresses and is the least secure option. **My IP Address** allows traffic only from my current public IP address, making it the safest option for SSH administration because only my machine can connect. **Service Tags** represent Microsoft-managed groups of IP addresses used for Azure services such as Azure Load Balancer or Virtual Network communication.

---

## Revision

```text
Any

↓

Everyone
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

Azure Managed Group
```

---

## Remember 

```
NSG Source

Who can enter?

        |

        +---- Any
        |
        +---- Everyone


        +---- My IP
        |
        +---- Only Me


        +---- Service Tag
        |
        +---- Azure Group
```

---



# Q9. 
What is the difference between a System Route and a User-Defined Route (UDR)? Create a UDR with Next Hop = None and demonstrate its effect. Attach screenshots.

## Answer

Q9 focuses on **Azure routing behavior**.

In previous questions:

* Q6 explained the difference between **NSG and Route Table**
* Q8 explained who can access traffic using **NSG Source rules**

Now we learn:

> How does Azure decide where network traffic should go?

This is controlled by **routes**.

---

## Step 1: What is Routing?

Routing means deciding the path that network traffic should take.

Example:

You want to travel from my home to an office.

A navigation system decides:

```text
Home

↓

Main Road

↓

Highway

↓

Office
```

The navigation system decides the path.

In Azure:

```text
VM

↓

Route Table

↓

Destination
```

The Route Table decides where packets should go.

---

## Step 2: What is a Route?

A route contains three main things:

```text
Destination

        +

Next Hop

        +

Path Decision
```

Example:

```text
Destination:

Internet (0.0.0.0/0)


Next Hop:

Internet Gateway
```

Meaning:

> Send this traffic to the internet.

---

## Step 3: What is a System Route?

A **System Route** is a route automatically created and managed by Azure.

When you create a Virtual Network (VNet), Azure automatically creates default routes.

You do not manually configure them.

---

## Example

Suppose you create:

```text
VNet

10.0.0.0/16


Subnet

10.0.1.0/24


VM

10.0.1.4
```

Azure automatically knows:

```text
VM

↓

Other VM inside VNet

↓

Reachable
```

No configuration required.

---

## System Route Diagram

```text
Azure Automatically Creates


VM A

 |

 |

System Route

 |

 |

VM B
```

---

## Types of System Routes

Azure automatically provides routes for:

| Destination     | Purpose                           |
| --------------- | --------------------------------- |
| Virtual Network | Communication between subnets     |
| Internet        | Default internet access           |
| Azure Services  | Access to Azure platform services |
| Peered Networks | VNet peering communication        |

---

## Step 4: What is a User-Defined Route (UDR)?

A User-Defined Route is a custom route created by the user.

It allows you to override Azure's default routing behavior.

---

## Real-World Example

Normally:

```text
Office Laptop

↓

Internet
```

Company security policy says:

> All internet traffic must go through a firewall.

Now the path becomes:

```text
Office Laptop

↓

Firewall

↓

Internet
```

This custom path is created using a UDR.

---

## Azure Example

Default routing:

```text
VM

↓

Internet
```

After UDR:

```text
VM

↓

Azure Firewall

↓

Internet
```

The user changed the traffic path.

---

## Step 5: System Route vs UDR

Simple difference:

```text
System Route

↓

Azure decides the path
```

```text
User-Defined Route

↓

You decide the path
```

---

## Step 6: What is Next Hop?

Next Hop means:

> Where should the traffic go next?

Think about sending a parcel.

Current location:

```text
my House
```

Next destination:

```text
Courier Center
```

The courier center is the next hop.

Networking works the same way.

---

## Example

Traffic flow:

```text
VM

↓

Next Hop

↓

Internet
```

or:

```text
VM

↓

Next Hop

↓

Firewall
```

---

## Step 7: What Does Next Hop = None Mean?

Next Hop = None means:

> There is no destination for this traffic.

Azure drops the packet.

The traffic cannot continue.

---

## Normal Flow

```text
VM

↓

Route Table

↓

Internet

↓

Success
```

---

## After UDR with Next Hop = None

```text
VM

↓

User Defined Route

↓

Next Hop: None

↓

Traffic Dropped
```

---

## Practical Lab: Create a UDR with Next Hop = None

## Step 1: Create Route Table

Open Azure Portal:

```text
Azure Portal

↓

Route Tables

↓

Create
```

---

## Configuration

| Setting        | Value             |
| -------------- | ----------------- |
| Resource Group | week3-rg          |
| Region         | Same as VM region |
| Name           | week3-route-table |

Click:

```text
Review + Create

↓

Create
```

---

## Step 2: Add a Route

Open:

```text
Route Table

↓

Routes

↓

Add
```

Configure:

| Field            | Value          |
| ---------------- | -------------- |
| Route Name       | block-internet |
| Destination Type | IP Addresses   |
| Destination CIDR | 0.0.0.0/0      |
| Next Hop Type    | None           |

---

## Why Use 0.0.0.0/0?

`0.0.0.0/0` represents:

```text
All IPv4 Addresses
```

Meaning:

```text
Any destination
```

The rule says:

> For all traffic, there is no next hop.

Therefore:

```text
Drop traffic
```

---

## Step 3: Associate Route Table with Subnet

Creating a route table alone does nothing.

It must be attached to a subnet.

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
Virtual Network:

week3-vnet


Subnet:

frontend-subnet
```

Save.

---

## Step 4: Test the Effect

Before applying the UDR:

```bash
curl https://www.microsoft.com
```

or:

```bash
ping google.com
```

Expected:

```text
Successful response
```

---

After applying the UDR:

```bash
curl https://www.microsoft.com
```

or:

```bash
ping google.com
```

Expected:

```text
Connection failure
```

because traffic has no next hop.

---

## Traffic Flow Comparison

## Before UDR

```text
VM

 |

 ▼

System Route

 |

 ▼

Internet

 |

 ▼

Success
```

---

## After UDR

```text
VM

 |

 ▼

User Defined Route

Destination:

0.0.0.0/0


Next Hop:

None


 |

 ▼

Traffic Dropped
```

---

## Comparison Table

| Feature       | System Route              | User-Defined Route (UDR)                        |
| ------------- | ------------------------- | ----------------------------------------------- |
| Created By    | Azure                     | User                                            |
| Configuration | Automatic                 | Manual                                          |
| Purpose       | Default connectivity      | Custom traffic control                          |
| Modification  | Cannot be changed         | User controls it                                |
| Priority      | Lower than UDR            | Higher priority                                 |
| Common Usage  | Normal VNet communication | Firewall routing, VPN routing, blocking traffic |

---

## NSG vs UDR Reminder

Many beginners confuse these concepts.

## NSG

Question answered:

> Should this traffic be allowed?

Example:

```text
Allow Port 22

Deny Port 3389
```

---

## UDR

Question answered:

> Where should this traffic go?

Example:

```text
VM

↓

Firewall

↓

Internet
```

---

## Common Beginner Mistakes

## Mistake 1: Creating a Route Table but seeing no change

Reason:

The route table was not associated with a subnet.

Fix:

Associate it with the required subnet.

---

## Mistake 2: Thinking UDR blocks traffic like an NSG

Incorrect.

UDR changes the path.

NSG filters traffic.

---

## Mistake 3: Using the wrong destination

Example:

```text
10.0.0.0/16
```

Only affects that network.

For blocking internet traffic:

```text
0.0.0.0/0
```

is used.

---

## Screenshots 

Capture:

1. Route Table creation page

2. Route rule showing:

```text
Destination:

0.0.0.0/0


Next Hop:

None
```

3. Subnet association page

4. Terminal showing internet connectivity failure

Example:

```bash
curl https://www.microsoft.com
```

---



> A System Route is automatically created and managed by Azure to provide default network connectivity between resources such as virtual networks, subnets, and the internet. A User-Defined Route (UDR) is manually created by users to override Azure's default routing behavior and control where traffic should flow. In my lab, I created a UDR with destination `0.0.0.0/0` and configured the next hop as `None`. After associating it with the subnet, outbound internet traffic from the VM was dropped because Azure had no next hop to forward the packets.

---

## Revision

```text
System Route

↓

Created by Azure

↓

Default path
```

---

```text
UDR

↓

Created by User

↓

Custom path
```

---

```text
Next Hop = None

↓

No destination

↓

Traffic Dropped
```

---


# Q10.

What is the difference between connecting to a VM using a **public IP with port 22 open** versus using **Azure Bastion**? Compare in a table with at least five points.

## Answer

Let's first understand the problem.

---

## Step 1: Imagine my House

Suppose you live in a house.

There are two ways my friend can visit.

## Method 1

You leave my front door open.

my friend comes directly.

```text
Friend
   │
   ▼
Front Door
   │
   ▼
my House
```

But...

Anyone walking on the street can also see my door.

---

## Method 2

Instead of opening my front door,

You tell my friend:

> "Come to the security gate first."

The security guard checks who they are.

Only then are they allowed inside.

```text
Friend
   │
   ▼
Security Gate
   │
   ▼
my House
```

This is exactly how **Azure Bastion** works.

---

## Step 2: Public IP + Port 22

Suppose my VM has:

* Public IP
* Port 22 Open

Architecture:

```text
my Laptop
      │
      ▼
Internet
      │
      ▼
Public IP
      │
      ▼
Port 22 (SSH)
      │
      ▼
Azure VM
```

You simply run:

```bash
ssh azureuser@20.xxx.xxx.xxx
```

You are directly connected to the VM.

---

## Is This Good?

Yes.

It's simple.

But...

my VM is visible on the Internet.

Anyone can try connecting to it.

Even if they don't know the password, they can still scan Port 22 and attempt login.

---

## Step 3: What is Azure Bastion?

Azure Bastion is a **managed service** provided by Microsoft.

It lets you connect to a VM **without giving the VM a Public IP**.

Think of Bastion as a **secure jump server** managed by Azure.

---

## How Does Bastion Work?

Architecture:

```text
my Laptop
      │
      ▼
Azure Portal
      │
      ▼
Azure Bastion
      │
      ▼
Private IP
      │
      ▼
Azure VM
```

Notice something important...

The VM **does not need a Public IP**.

---

## Real-World Example

Imagine a bank.

Would they expose the vault directly to the street?

No.

Instead,

```text
Street

↓

Main Entrance

↓

Security

↓

Vault
```

Similarly,

Companies avoid exposing production VMs directly to the Internet.

They use Bastion.

---

## ASCII Comparison

## Public IP + SSH

```text
Laptop

↓

Internet

↓

Public IP

↓

VM
```

---

## Azure Bastion

```text
Laptop

↓

Azure Portal

↓

Azure Bastion

↓

Private IP

↓

VM
```

---

## Why is Bastion More Secure?

With Public IP:

```text
Internet

↓

VM
```

Anyone can see the VM.

---

With Bastion:

```text
Internet

↓

Azure Bastion

↓

VM
```

The VM stays private.

---

## Features of Azure Bastion

Azure Bastion provides:

* Browser-based SSH/RDP
* No Public IP required on the VM
* Managed by Microsoft
* Secure access
* Clipboard (copy/paste) support
* No need to expose management ports to the internet

---

## Comparison Table

| Feature                            | Public IP + Port 22         | Azure Bastion           |
| ---------------------------------- | --------------------------- | ----------------------- |
| Public IP required on VM?          | Yes                         | No                      |
| SSH Port (22) exposed to Internet? | Yes                         | No                      |
| Security                           | Lower (internet-facing)     | Higher (private access) |
| Connection Method                  | SSH client (Terminal/PuTTY) | Azure Portal (browser)  |
| Attack Surface                     | Higher                      | Lower                   |
| Microsoft Managed                  | No                          | Yes                     |
| Best For                           | Labs, testing               | Production environments |

---


# Q11.

Deploy Bastion and connect to a VM that has **no public IP**. Then enable copy/paste and demonstrate it. Attach screenshots.

## Answer

## Before We Start

Let's remember the two architectures.

## Method 1 (Old Way)

```text
my Laptop
      │
      ▼
Internet
      │
      ▼
Public IP
      │
      ▼
VM
```

Everyone on the Internet can see the VM.

---

## Method 2 (Azure Bastion)

```text
my Laptop
      │
      ▼
Azure Portal
      │
      ▼
Azure Bastion
      │
      ▼
Private IP
      │
      ▼
VM
```

The VM is hidden from the Internet.

---

## Analogy

Imagine a school.

Without Bastion:

```text
Visitor

↓

Classroom
```

Anyone can try entering.

---

With Bastion:

```text
Visitor

↓

Security Office

↓

Visitor Pass

↓

Classroom
```

Only verified visitors reach the classroom.

---

## Step 1: Why Do We Remove the Public IP?

Ask myself:

> If Azure Bastion is going to connect to my VM...

Why should my VM also be visible on the Internet?

It shouldn't.

So first we remove the Public IP.

---

## Step 2: Remove the Public IP

Go to:

```text
Azure Portal

↓

Virtual Machines

↓

week3-vm

↓

Networking

↓

Network Interface
```

Click the Public IP resource.

Then choose:

```text
Dissociate
```

or

```text
Delete Public IP
```

(depending on the portal experience)

Now my VM only has:

```text
Private IP

10.0.1.x
```

No Public IP.

---

## What Just Happened?

Earlier:

```text
VM

Public IP ✅

Private IP ✅
```

Now:

```text
VM

Public IP ❌

Private IP ✅
```

The VM still runs normally.

It simply isn't reachable directly from the Internet anymore.

---

## Step 3: Create Azure Bastion

Search:

```text
Bastion
```

Click:

```text
Create
```

---

Fill these values:

| Field           | Value             |
| --------------- | ----------------- |
| Resource Group  | week3-rg          |
| Name            | week3-bastion     |
| Region          | Same region as VM |
| Virtual Network | week3-vnet        |

Azure will ask for:

```text
AzureBastionSubnet
```

---

## What is AzureBastionSubnet?

This confuses many beginners.

Think of Bastion as another machine inside my VNet.

It needs its own dedicated room.

That room is called:

```text
AzureBastionSubnet
```

It is a **special subnet reserved only for Azure Bastion**.

You cannot place my own VMs there.

---

## Analogy

Imagine a school.

Students have classrooms.

Teachers have staff rooms.

Principal has a separate office.

Similarly,

```text
Frontend Subnet

↓

VMs
```

```text
AzureBastionSubnet

↓

Only Bastion
```

---

Azure usually creates this subnet for you if needed.

---

## Step 4: Wait for Deployment

Bastion deployment may take several minutes.

This is normal.

---

## Step 5: Connect Using Bastion

Go to:

```text
Virtual Machines

↓

week3-vm
```

You'll see:

```text
Connect
```

Choose:

```text
Bastion
```

Enter:

* Username
* Password (or SSH key, depending on how you created the VM)

Click:

```text
Connect
```

---

## What Happens?

Instead of opening PuTTY or Terminal...

Azure opens the VM **inside my web browser**.

```text
Browser

↓

Azure Portal

↓

Bastion

↓

VM
```

No Public IP needed.

---

## Step 6: Enable Copy/Paste

Inside the Bastion session,

Look for:

```text
Settings

↓

Clipboard

↓

Enable
```

(The exact location can vary slightly depending on the Azure Portal version.)

Now try:

Copy this:

```text
Hello Azure Bastion
```

Paste it into the VM terminal.

It works!

---

## Why is Copy/Paste Useful?

Imagine typing:

```bash
sudo apt update
```

Easy.

Now imagine typing:

```bash
kubectl apply -f deployment-production-final-version.yaml
```

That's annoying.

Copy/paste saves time and reduces typing mistakes.

---

## Diagram

Without Bastion

```text
Laptop

↓

Internet

↓

Public IP

↓

VM
```

---

With Bastion

```text
Laptop

↓

Azure Portal

↓

Azure Bastion

↓

Private IP

↓

VM
```

---

## What Changed?

Before Bastion:

```text
Need Public IP

Need SSH Client

Port 22 Open
```

After Bastion:

```text
No Public IP

Browser Access

Private Connection
```

---

## Screenshots 

## Screenshot 1

Bastion Overview

Show:

```text
week3-bastion
```

---

## Screenshot 2

VM

```text
Public IP

None
```

This proves the VM has no Public IP.

---

## Screenshot 3

Browser showing Bastion connected to the VM.

---

## Screenshot 4

Copy text.

Paste into terminal.

Take a screenshot.

---

## Common Beginner Mistakes

## Forgetting AzureBastionSubnet

Bastion cannot be deployed without its dedicated subnet.

---

## Different Regions

Keep:

* VM
* Bastion
* VNet

all in the same region.

---

## Expecting SSH from my laptop to work

Once the Public IP is removed,

This won't work:

```bash
ssh azureuser@20.xx.xx.xx
```

Because there is no Public IP anymore.

You must use the Azure Portal and Bastion.

---

## Comparison

| Feature             | SSH                | Azure Bastion      |
| ------------------- | ------------------ | ------------------ |
| Public IP Needed    | Yes                | No                 |
| Browser Access      | No                 | Yes                |
| SSH Client Required | Yes                | No                 |
| Copy/Paste          | Terminal dependent | Built into Bastion |
| Internet Exposure   | Higher             | Lower              |

---

#

> In this lab, I deployed Azure Bastion in the same Virtual Network as my virtual machine. I removed the VM's Public IP and connected to it through the Azure Portal using Bastion. Azure Bastion used the VM's private IP address, so the VM remained inaccessible directly from the internet. I also enabled clipboard support and successfully copied and pasted text into the VM terminal. This approach is more secure because it avoids exposing SSH (port 22) to the public internet.

---

## Remember

```text
SSH

↓

Direct Door
```

```text
Azure Bastion

↓

Security Gate
```

---

## Cost Tip

Azure Bastion is **billable**.

Once you've:

* Connected successfully
* Taken my screenshots

Delete it if you don't need it anymore.

This follows my assignment's instruction to avoid unnecessary Azure costs.

---

## Revision

```text
Without Bastion

Laptop
 │
 ▼
Internet
 │
 ▼
Public IP
 │
 ▼
VM
```

```text
With Bastion

Laptop
 │
 ▼
Azure Portal
 │
 ▼
Azure Bastion
 │
 ▼
Private IP
 │
 ▼
VM
```

---



# Q12.

What is the difference between **authentication** and **authorization**? Give one example of each failing.

## Answer

This is one of the **most important concepts in cloud computing**. It doesn't just apply to Azure—it also applies to AWS, Linux, Kubernetes, GitHub, and even my phone.

Many confuse these two words:

* **Authentication**
* **Authorization**

Let's make them super simple.

## Step 1: First Understand the Problem

Imagine I'm going to watch a movie in a theatre.

There are **two checks**.

## Check 1

The security guard asks:

> "Show me my ticket."

He is checking:

**Who are you?**

This is **Authentication**.

---

## Check 2

After entering,

You try to sit in the VIP seats.

The staff asks:

> "Do you have a VIP ticket?"

They are checking:

**Are you allowed to sit here?**

This is **Authorization**.

---

## Analogy

Imagine my school.

You reach the school gate.

The teacher asks:

> "Are you a student here?"

You show my ID card.

I'm allowed inside.

This is:

## Authentication

---

Now you walk into the Principal's office.

The peon says:

> "Only teachers may enter."

Even though I'm a student,

You can't enter.

This is:

## Authorization

---

## Easy Way to Remember

Authentication answers:

```text
WHO ARE YOU?
```

Authorization answers:

```text
WHAT ARE YOU ALLOWED TO DO?
```

---

## Step 2: What is Authentication?

Authentication is the process of **proving my identity**.

Azure asks:

> "Who are you?"

Examples:

* Username + Password
* SSH Key
* Fingerprint
* Face ID
* OTP
* Microsoft Login

---

## Diagram

```text
You

↓

Username

Password

↓

Azure

↓

✅ Identity Verified
```

Now Azure knows:

> This is Malathi.

---

## Authentication Failure Example

Suppose my password is wrong.

You enter:

```text
Username

Malathi

Password

12345
```

But my real password is different.

Azure says:

```text
❌ Invalid Username or Password
```

This is an **Authentication Failure**.

Azure doesn't know who you are.

---

## Step 3: What is Authorization?

Now Azure already knows who you are.

Next it asks:

> "What are you allowed to do?"

Maybe I'm allowed to:

* Read
* Restart a VM

But not allowed to:

* Delete the VM

This is Authorization.

---

## Diagram

```text
Identity Verified

↓

Azure Checks Permissions

↓

Allow?

or

Deny?
```

---

## Authorization Failure Example

Suppose I'm logged into Azure successfully.

You click:

```text
Delete Resource Group
```

Azure replies:

```text
You do not have permission.
```

You are logged in.

Azure knows who you are.

But you don't have permission.

This is an **Authorization Failure**.

---

## Real Azure Example

Imagine I'm working in a company.

You log into Azure.

Authentication succeeds.

```text
Microsoft Login

↓

Success
```

Now you try:

```text
Delete Production VM
```

Azure checks my role.

Maybe I'm only a Reader.

Azure says:

```text
❌ Access Denied
```

Authentication succeeded.

Authorization failed.

---

## Another Real-Life Example

Think about an ATM.

## Step 1

Insert ATM Card.

Enter PIN.

```text
PIN Correct

↓

Authentication
```

---

## Step 2

Try to withdraw $5,000.

Bank checks my balance.

Only $500 available.

```text
❌ Transaction Denied
```

That's Authorization.

The bank knows who you are.

You just aren't allowed to perform that action.

---

## Comparison Table

| Feature         | Authentication         | Authorization                |
| --------------- | ---------------------- | ---------------------------- |
| Main Question   | Who are you?           | What can you do?             |
| Happens First?  | Yes                    | No (after authentication)    |
| Verifies        | Identity               | Permissions                  |
| Examples        | Password, OTP, SSH Key | Azure RBAC Roles             |
| Failure Example | Wrong password         | No permission to delete a VM |

---

## Remember

Authentication

Think:

```text
A

↓

Ask

Who?
```

---

Authorization

Think:

```text
A

↓

Allow

What?
```

---

## Flow Diagram

```text
User

↓

Authentication

"Who are you?"

↓

Identity Verified

↓

Authorization

"What can you do?"

↓

Perform Action
```

---

## Azure Example

Suppose Malathi logs into Azure.

## Step 1

```text
Username

Password

↓

Authentication

↓

Success
```

---

## Step 2

Malathi tries:

```text
Delete VM
```

Azure checks:

```text
Role

↓

Reader
```

Reader cannot delete.

Azure replies:

```text
Access Denied
```

Authentication passed.

Authorization failed.

---

## Common Beginner Mistakes

## Thinking they're the same

No.

Authentication verifies **identity**.

Authorization verifies **permissions**.

---

## Thinking Authorization happens first

No.

Azure must know **who you are** before it can check **what I'm allowed to do**.

---

## Thinking login failure is Authorization

No.

Wrong password = Authentication Failure.

---



> Authentication is the process of verifying a user's identity, such as by using a username and password, SSH key, or multi-factor authentication. It answers the question, "Who are you?" Authorization happens after successful authentication and determines what actions the user is allowed to perform. It answers the question, "What are you allowed to do?" An example of authentication failure is entering an incorrect password and being unable to log in. An example of authorization failure is successfully logging into Azure but being denied permission to delete a virtual machine because my assigned role does not allow that action.

---



> Authentication verifies the identity of a user, while authorization determines what that authenticated user is permitted to do. For example, entering an incorrect password results in an authentication failure because Azure cannot verify the user's identity. Logging into Azure successfully but receiving an "Access Denied" message when trying to delete a resource group is an authorization failure because the user lacks the required permissions.

---

## Revision

```text
Authentication

↓

Who are you?

↓

Identity
```

```text
Authorization

↓

What can you do?

↓

Permission
```

---

## Real Azure Example

```text
Malathi

↓

Login

↓

✅ Authentication Success

↓

Delete Resource Group

↓

❌ Authorization Failed

Reason:

No Contributor Role
```


# Q13.

What is the difference between assigning a role to a **user** and assigning it to a **group**? Explain with a team of 10 people needing access to 5 resource groups.

## Answer


## First, What is a Role?

A **role** is simply a **set of permissions**.

For example:

* Reader → Can only view resources.
* Contributor → Can create, modify, and delete resources (but cannot manage access).
* Owner → Full control, including assigning roles to others.

Think of a role as a **job responsibility**.

---

## Analogy

Imagine my school.

There are 10 students.

The teacher wants everyone to enter the library.

She has two choices.

## Option 1

Call every student one by one.

```text
Rahul → Allowed

Priya → Allowed

Amit → Allowed

...

10 students
```

This takes time.

---

## Option 2

Create one group.

```text
Class 5A
```

Tell the librarian:

> "Everyone in Class 5A can enter."

Done!

Much easier.

---

## Azure Works the Same Way

Suppose you have:

```text
10 Employees
```

They all need access to:

```text
RG-Dev

RG-Test

RG-UAT

RG-Stage

RG-Prod
```

---

## Method 1: Assign Role to Each User

```text
Admin

↓

Rahul → Contributor

↓

Priya → Contributor

↓

John → Contributor

↓

...

10 Times
```

Now repeat this for 5 Resource Groups.

That's:

```text
10 Users × 5 Resource Groups

=

50 Role Assignments
```

A lot of work!

---

## Method 2: Assign Role to a Group

Create one group.

```text
Dev-Team
```

Add all 10 users.

```text
Dev-Team

↓

Rahul

Priya

John

...

10 Users
```

Now assign the **Contributor** role **once**.

```text
Contributor

↓

Dev-Team

↓

RG-Dev
```

Everyone in the group automatically gets access.

---

## Real-Life Analogy

Imagine an office building.

Instead of giving every employee a separate access card for every floor...

The HR department creates a group.

```text
Developers
```

Everyone in that group automatically gets access to:

* Floor 2
* Floor 3
* Lab

If a new developer joins?

Just add them to the group.

No need to update every door individually.

---

## Diagram

## User-Based Assignment

```text
Admin

 │

 ├── Rahul → Contributor

 ├── Priya → Contributor

 ├── Amit → Contributor

 ├── Sara → Contributor

 └── ... (10 Users)
```

Lots of repeated work.

---

## Group-Based Assignment

```text
Admin

 │

 ▼

Dev-Team Group

 │

 ├── Rahul

 ├── Priya

 ├── Amit

 ├── Sara

 └── ...

 │

 ▼

Contributor Role

 │

 ▼

Resource Group
```

One assignment benefits everyone.

---

## Let's Solve the Assignment Scenario

You have:

```text
10 People
```

Need access to:

```text
5 Resource Groups
```

---

## Option 1: Individual Users

For each Resource Group:

Assign Contributor to each user.

```text
RG1

↓

10 Assignments

RG2

↓

10 Assignments

RG3

↓

10 Assignments

RG4

↓

10 Assignments

RG5

↓

10 Assignments
```

Total:

```text
50 Assignments
```

Imagine if the company had 500 employees!

---

## Option 2: Group

Create one group.

```text
Developers
```

Add all 10 users.

Assign:

```text
Contributor

↓

Developers Group

↓

RG1
```

Repeat for each Resource Group.

Only:

```text
5 Assignments
```

Much simpler.

---

## What Happens When a New Employee Joins?

Suppose **Neha** joins the company.

## User-Based

You must manually assign:

* RG1
* RG2
* RG3
* RG4
* RG5

Five separate role assignments.

---

## Group-Based

Simply:

```text
Add Neha

↓

Developers Group
```

Done.

She automatically gets access everywhere the group already has permissions.

---

## What Happens When Someone Leaves?

Suppose Rahul resigns.

## User-Based

Remove Rahul from every Resource Group individually.

---

## Group-Based

Just remove Rahul from the group.

Access is removed automatically.

---

## Comparison Table

| Feature         | Role Assigned to User       | Role Assigned to Group |
| --------------- | --------------------------- | ---------------------- |
| Assigned To     | Individual user             | Azure Entra ID group   |
| Administration  | More manual work            | Easier to manage       |
| Best for        | One or two users            | Teams and departments  |
| New Employee    | Assign roles manually       | Add user to the group  |
| Employee Leaves | Remove multiple assignments | Remove from the group  |
| Scalability     | Poor for large teams        | Excellent              |

---

## Why Do Companies Prefer Groups?

Imagine Microsoft has:

```text
20,000 Employees
```

Would they assign permissions one person at a time?

No.

They create groups like:

```text
Developers

Testers

HR

Finance

Security
```

Then assign roles to the groups.

This saves time and reduces mistakes.

---

## Common Beginner Mistakes

## "Groups and Resource Groups are the same."

No.

* **Resource Group** = Container for Azure resources.
* **Entra ID Group** = Collection of users.

Completely different things.

---

## "Groups store VMs."

No.

Groups store **users**, not Azure resources.

---

## "Assigning roles to users is always bad."

No.

It's fine for one or two users.

For teams, groups are the recommended approach.

---

## Remember

Think of WhatsApp.

Instead of sending the same message to 10 friends individually...

You create:

```text
Family Group
```

Send the message once.

Everyone receives it.

Azure groups work the same way.

---



> A role assignment to a user gives permissions directly to one individual. A role assignment to a group gives permissions to all members of that group. In a scenario where 10 people need access to 5 Resource Groups, assigning roles individually would require 50 separate assignments. Using a group, I would add all 10 users to an Entra ID group and assign the required role to the group for each Resource Group. This reduces administrative effort, simplifies onboarding and offboarding, and follows Azure RBAC best practices.

---



> Assigning a role directly to a user gives permissions only to that individual. Assigning a role to an Entra ID group gives the same permissions to every member of the group. For a team of 10 people needing access to 5 Resource Groups, assigning roles individually would require 50 role assignments. By creating one group, adding all 10 users, and assigning the role to the group, only 5 assignments are needed. This approach is easier to manage, scales better, and is the recommended practice in Azure.

---

## Revision

```text
User Assignment

↓

One User

↓

One Permission
```

```text
Group Assignment

↓

Many Users

↓

One Permission

↓

Easy Management
```

---


# Q14.

Create an Entra ID user and group, add the user to the group, and assign a role at resource-group scope. Attach screenshots of every step.

## Answer

## Step 1: What is Microsoft Entra ID?

Microsoft Entra ID (previously called **Azure Active Directory**) is Azure's **Identity and Access Management (IAM)** service.

It stores:

* Users
* Groups
* Applications
* Roles

Think of it as Azure's **employee directory**.

---

## Analogy

Imagine my school.

The principal has a register.

```text
Class 5A

Rahul

Priya

Amit

Sara
```

This register tells the school:

* Who is a student?
* Which class are they in?

Microsoft Entra ID is like that register.

---

## Step 2: What are We Going to Build?

We'll create this:

```text
Microsoft Entra ID

│

├── User

│     Malathi-Test

│

└── Group

      Dev-Team

            │

            ▼

      Contributor Role

            │

            ▼

     week3-rg
```

---

## Step 3: Create an Entra ID User

Go to:

```text
Azure Portal

↓

Microsoft Entra ID

↓

Users

↓

+ New User
```

Choose:

```text
Create New User
```

---

Fill the details:

| Field               | Example Value                                 |
| ------------------- | --------------------------------------------- |
| User Principal Name | `malathi.test@<mytenant>.onmicrosoft.com`   |
| Display Name        | `Malathi Test`                                |
| Password            | Auto-generated or set one manually if allowed |

Click:

```text
Review + Create

↓

Create
```

---

## What Just Happened?

You created a new Azure identity.

Think of it like creating a new employee account.

---

## Screenshot 1

Take a screenshot showing:

```text
Microsoft Entra ID

↓

Users

↓

Malathi Test
```

---

## Step 4: Create a Group

Go to:

```text
Microsoft Entra ID

↓

Groups

↓

New Group
```

---

Fill:

| Field           | Value    |
| --------------- | -------- |
| Group Type      | Security |
| Group Name      | Dev-Team |
| Membership Type | Assigned |

Click:

```text
Create
```

---

## Why Security Group?

Azure RBAC works with **Security Groups**.

Microsoft 365 Groups are mainly for collaboration tools like Outlook and Teams.

---

## Screenshot 2

Take a screenshot showing:

```text
Groups

↓

Dev-Team
```

---

## Step 5: Add User to Group

Open:

```text
Dev-Team

↓

Members

↓

+ Add Members
```

Select:

```text
Malathi Test
```

Click:

```text
Select
```

---

Now my group looks like:

```text
Dev-Team

↓

Malathi Test
```

---

## Diagram

```text
Dev-Team

│

└── Malathi Test
```

---

## Screenshot 3

Take a screenshot showing:

```text
Dev-Team

↓

Members

↓

Malathi Test
```

---

## Step 6: Assign a Role

Now we'll give permissions.

Go to:

```text
Resource Groups

↓

week3-rg
```

---

Click:

```text
Access Control (IAM)
```

---

## What is IAM?

IAM stands for:

```text
Identity

and

Access

Management
```

This is where Azure decides:

> Who can do what?

---

## Step 7: Add Role Assignment

Click:

```text
Add

↓

Add Role Assignment
```

---

Choose:

```text
Contributor
```

Click:

```text
Next
```

---

Choose:

```text
Assign access to

↓

User, Group, or Service Principal
```

Click:

```text
Select Members
```

Choose:

```text
Dev-Team
```

Click:

```text
Review + Assign
```

Done!

---

## What Happened?

Earlier:

```text
Dev-Team

↓

No Permissions
```

Now:

```text
Dev-Team

↓

Contributor

↓

week3-rg
```

Everyone inside **Dev-Team** now has Contributor access to **week3-rg**.

---

## Diagram

```text
Microsoft Entra ID

        │

        ▼

+-----------------+

 Dev-Team Group

+-----------------+

        │

        ▼

+-----------------+

 Contributor Role

+-----------------+

        │

        ▼

+-----------------+

 week3-rg

+-----------------+
```

---

## Screenshot 4

Take a screenshot showing:

```text
Resource Group

↓

Access Control (IAM)

↓

Contributor

↓

Dev-Team
```

---

## How Does It Work?

Suppose **Malathi Test** logs into Azure.

Azure checks:

```text
Who are you?

↓

Malathi Test
```

Azure sees:

```text
Member of Dev-Team
```

Azure checks:

```text
Dev-Team

↓

Contributor

↓

week3-rg
```

Result:

Access Granted

---

## Real-Life Analogy

Imagine a company.

HR creates:

```text
Developers
```

Inside:

```text
Rahul

Priya

Malathi

John
```

The IT Admin says:

> "Everyone in Developers can enter Building A."

He doesn't need to grant access to each person separately.

---

## Comparison

## Without Group

```text
Rahul

↓

Contributor

↓

RG
```

```text
Priya

↓

Contributor

↓

RG
```

```text
Malathi

↓

Contributor

↓

RG
```

Many assignments.

---

## With Group

```text
Developers

↓

Contributor

↓

RG
```

One assignment.

Everyone benefits.

---

## Common Beginner Mistakes

## Assigning the role to the user instead of the group

The assignment specifically asks you to:

* Create a User
* Create a Group
* Add the User to the Group
* Assign the Role to the **Group**

---

## Choosing Microsoft 365 Group

Choose:

```text
Security Group
```

---

## Forgetting to add the user to the group

If the user isn't a member,

they won't inherit the group's permissions.

---

## Screenshots Required

my assignment asks for every step.

Take these:

* User Created
* Group Created
* User Added to Group
* IAM showing Contributor assigned to Dev-Team

---

## Interview Questions

## Why assign the role to the group instead of the user?

Because it's easier to manage.

---

## What happens if a new employee joins?

Add them to the group.

No need to create new role assignments.

---

## What happens if someone leaves?

Remove them from the group.

Their inherited access is removed.

---

#

> In this lab, I created a new Microsoft Entra ID user and a Security Group. I added the user to the group and then assigned the Contributor role to the group at the Resource Group scope using Azure RBAC. This approach follows best practices because permissions are managed through groups instead of individual users, making onboarding and offboarding much easier.

---



> I created a Microsoft Entra ID user and a Security Group, added the user to the group, and assigned the Contributor role to the group at the Resource Group scope using Azure RBAC. Assigning roles to groups instead of individual users simplifies permission management because any new user added to the group automatically inherits the assigned permissions.

---

## Revision

```text
Entra ID

↓

Create User

↓

Create Security Group

↓

Add User to Group

↓

Assign Contributor Role

↓

Resource Group
```

---

# Q15.

What is the difference between the Contributor role and the Virtual Machine Administrator Login role? Why might a user be able to restart a VM but not log into it?

## Answer

---

## Step 1: Think of a Hotel

Imagine a hotel.

There are two people:

* Hotel Manager
* Hotel Guest

Both have different permissions.

The manager can:

* Hire staff
* Buy furniture
* Pay bills
* Restart the elevator

But...

The manager **cannot enter every guest room** whenever they want.

Only the guest with the room key can enter.

---

Azure works exactly the same way.

Managing a VM and logging into a VM are **different permissions**.

---

## Step 2: What is the Contributor Role?

The **Contributor** role is an Azure RBAC role.

It allows a user to **manage Azure resources**.

Think of it as:

> "You can manage the VM."

Examples:

* Create VM
* Restart VM
* Stop VM
* Resize VM
* Delete VM

But...

It **does not automatically allow you to log into the operating system**.

---

## Analogy

Imagine I'm the school principal.

You can:

* Paint classrooms
* Buy desks
* Repair windows

But...

You don't automatically know every classroom's lock password.

Managing the building is different from entering a locked room.

---

## Step 3: What is the Virtual Machine Administrator Login Role?

This is another Azure RBAC role.

It gives permission to **log into the operating system** of the VM.

For Linux:

```text
SSH Login
```

For Windows:

```text
RDP Login
```

Think of it as giving someone **the room key**.

---

## Step 4: Visualize the Difference

## Contributor

```text
User
 │
 ▼
Azure Portal
 │
 ▼
Restart VM

Delete VM

Resize VM

Create VM
```

Notice:

No OS login.

---

## Virtual Machine Administrator Login

```text
User
 │
 ▼
Azure Portal
 │
 ▼
SSH / RDP
 │
 ▼
Inside VM
```

---

## Real-Life Analogy

Imagine you own an apartment.

There are two people.

## Building Maintenance

Can:

* Repair the lift
* Turn electricity on/off
* Paint walls

Cannot:

Enter my apartment without permission.

---

## Apartment Owner

Can:

* Unlock the apartment
* Enter inside
* Use everything

This is like the **Virtual Machine Administrator Login** role.

---

## Step 5: Why Can Someone Restart a VM but Not Log In?

This is the exact assignment question.

Suppose Rahul has:

```text
Contributor
```

Rahul clicks:

```text
Restart VM
```

Azure says:

Allowed.

---

Now Rahul tries:

```bash
ssh azureuser@<vm-ip>
```

Azure checks:

Does Rahul have:

```text
Virtual Machine Administrator Login
```

No.

Azure denies access.

Result:

```text
Restart VM

SSH Login
```

---

## Diagram

```text
Rahul

 │

 ▼

Contributor

 │

 ├── Create VM

 ├── Restart VM

 ├── Delete VM

 └── Login to VM
```

---

Another user:

```text
Priya

 │

 ▼

Virtual Machine Administrator Login

 │

 ├── SSH Login

 ├── RDP Login

 └── Restart VM
```

Unless Priya also has Contributor (or another management role), she cannot manage the VM itself.

---

## Why Did Microsoft Separate These?

Security.

Imagine if everyone who could restart a VM could also log in.

That would be dangerous.

Companies separate responsibilities.

Example:

Operations Team

```text
Can restart VMs.
```

Security Team

```text
Can log into VMs.
```

Different jobs.

---

## Comparison Table

| Feature                 | Contributor               | Virtual Machine Administrator Login |
| ----------------------- | ------------------------- | ----------------------------------- |
| Purpose                 | Manage Azure resources    | Log into the VM OS                  |
| Restart VM              | Yes                       | No (unless another role allows it)  |
| Create/Delete VM        | Yes                       | No                                  |
| SSH/RDP Login           | No                        | Yes                                 |
| Azure Portal Management | Yes                       | Limited to login permission         |
| Used For                | Infrastructure management | Operating system administration     |

---

## Common Beginner Mistakes

## "Contributor means full access."

No.

Contributor has broad **resource management** permissions, but not automatic OS login rights.

---

## "If I can SSH, I can restart the VM."

Not necessarily.

SSH access and Azure resource management are different permission sets.

---

## "Logging into Azure Portal means I can log into every VM."

No.

Portal access and VM OS login are separate authorizations.

---

## Remember

Think of a car.

## Contributor

```text
Can repair the car.
```

But doesn't have the car key.

---

## VM Administrator Login

```text
Has the car key.

Can drive it.
```

---

## Interview Question

**Interviewer:**

> Why could someone restart a VM but still fail to SSH into it?

**Answer:**

> Because restarting a VM requires Azure resource management permissions, which the Contributor role provides. Logging into the VM requires a separate role, such as Virtual Machine Administrator Login, along with valid credentials. Azure separates infrastructure management from operating system access for better security.

---



> The Contributor role allows a user to manage Azure resources such as creating, deleting, starting, stopping, and restarting virtual machines. However, it does not grant permission to log into the operating system. The Virtual Machine Administrator Login role allows a user to sign in to the VM using SSH (Linux) or RDP (Windows), but it does not provide permissions to manage Azure resources. Therefore, a user may be able to restart a VM using the Contributor role but still be unable to log into it because they do not have the required VM login role.

---

## Revision

```text
Contributor

↓

Manage Azure Resources

↓

Create

Restart

Delete

Resize
```

```text
Virtual Machine Administrator Login

↓

Enter VM

↓

SSH

RDP

Use Operating System
```

---

## Visual Summary

```text
                Azure VM

        +----------------------+
        |   Azure Resource     |
        |  (Start/Stop/Resize) |
        +----------------------+
                  ▲
                  │
          Contributor Role


        +----------------------+
        |   Operating System   |
        | (SSH / RDP Access)   |
        +----------------------+
                  ▲
                  │
Virtual Machine Administrator Login
```

---



# Q16.

What is the difference between a **managed Kubernetes cluster (AKS)** and an **on-premises Kubernetes cluster**? Compare in a table with at least six points.

## Answer


## Step 1: First Understand Kubernetes

Think of Kubernetes as a **manager**.

Imagine you own a restaurant.

You have many chefs.

If one chef gets sick,

another chef immediately starts cooking.

```text
Customer Orders

       │

       ▼

Restaurant Manager

       │

 ┌─────┴─────┐

 ▼           ▼

Chef 1     Chef 2
```

Kubernetes is like the **Restaurant Manager**.

It manages containers instead of chefs.

---

## Step 2: What is On-Premises Kubernetes?

"On-Premises" means:

> **You own and manage everything myself.**

Imagine building my own house.

You must buy:

* Land
* Bricks
* Cement
* Doors
* Electricity
* Plumbing

Everything is my responsibility.

---

## Kubernetes Version

With On-Prem Kubernetes, **you install everything**.

```text
You

│

├── Buy Servers

├── Install Linux

├── Install Kubernetes

├── Configure Networking

├── Install Monitoring

├── Upgrade Kubernetes

└── Fix Problems
```

Everything is my responsibility.

---

## Step 3: What is AKS?

AKS stands for:

**Azure Kubernetes Service**

It is a **managed Kubernetes service**.

Microsoft manages many parts for you.

Think of renting an apartment.

The building owner takes care of:

* Lift
* Security
* Water
* Electricity (common areas)
* Maintenance

You simply move in and use it.

---

## Analogy

## On-Prem

Build my own playground.

```text
Buy Slide

Buy Swing

Install Everything

Repair Everything
```

---

## AKS

Go to a public playground.

Everything is already built.

You just play.

---

## Step 4: Architecture

## On-Prem Kubernetes

```text
Company

 │

 ▼

Own Servers

 │

 ▼

Linux

 │

 ▼

Kubernetes

 │

 ▼

Applications
```

Company manages everything.

---

## AKS

```text
Microsoft Azure

 │

 ▼

AKS

 │

 ▼

Worker Nodes

 │

 ▼

Applications
```

Microsoft manages much of the platform.

---

## Step 5: Who Does What?

## On-Prem

You manage:

* Servers
* Networking
* Control Plane
* Upgrades
* Backups
* Security patches

---

## AKS

Microsoft manages:

* Kubernetes Control Plane
* API Server
* etcd
* High availability of the control plane

You mainly manage:

* Worker nodes
* Applications
* Deployments
* Containers

---

## Real-Life Analogy

Imagine owning a school.

## On-Prem

You own:

* Building
* Furniture
* Electricity
* Internet
* CCTV
* Water
* Repairs

---

## AKS

You rent classrooms.

The building owner maintains the infrastructure.

You focus on teaching.

---

## Comparison Table

| Feature           | AKS (Managed Kubernetes)  | On-Premises Kubernetes                                         |
| ----------------- | ------------------------- | -------------------------------------------------------------- |
| Infrastructure    | Azure Cloud               | Company's own servers                                          |
| Control Plane     | Managed by Microsoft      | Managed by the company                                         |
| Installation      | Quick                     | Manual installation                                            |
| Upgrades          | Easier, Azure-assisted    | Manual responsibility                                          |
| High Availability | Built-in options          | Must be designed and managed                                   |
| Scaling           | Easy through Azure        | Manual planning and hardware dependent                         |
| Maintenance       | Lower operational effort  | Higher operational effort                                      |
| Best For          | Cloud-native applications | Organizations requiring full control or on-prem infrastructure |

---

## Which One is Easier?

Imagine you buy a washing machine.

## On-Prem

You repair it myself.

---

## AKS

The company sends a service engineer.

That's AKS.

---

## Why Do Companies Like AKS?

Because they don't want to spend time managing Kubernetes itself.

They want to focus on:

* Building applications
* Deploying software
* Delivering features

Instead of:

* Fixing Kubernetes
* Upgrading control planes
* Maintaining etcd

---

## Common Beginner Mistakes

## "AKS means Azure runs my application."

Not exactly.

You still deploy and manage **my applications**.

Azure mainly manages the Kubernetes platform components.

---

## "AKS is free."

The **AKS control plane** is managed by Azure, but you **pay for the worker nodes (VMs)** and other Azure resources like load balancers and storage.

---

## "On-Prem is always bad."

No.

Some companies choose on-premises Kubernetes because of:

* Compliance
* Data residency
* Existing infrastructure
* Regulatory requirements

---

## Remember

## On-Prem

```text
Build my Own House
```

Everything is my responsibility.

---

## AKS

```text
Rent an Apartment
```

The building owner maintains the building.

You live in it.

---



> AKS is a managed Kubernetes service provided by Microsoft Azure. In AKS, Microsoft manages important platform components such as the Kubernetes control plane, making deployment, upgrades, and maintenance easier. In an on-premises Kubernetes cluster, the organization is responsible for installing, configuring, upgrading, securing, and maintaining the entire Kubernetes environment, including the control plane and infrastructure. AKS reduces operational overhead and is commonly used for cloud-native workloads, while on-premises Kubernetes is suitable for organizations that require complete control over their infrastructure.

---



> AKS is a managed Kubernetes service where Microsoft manages the Kubernetes control plane and simplifies operations such as upgrades and maintenance. In contrast, an on-premises Kubernetes cluster is fully managed by the organization, including servers, networking, Kubernetes installation, upgrades, and troubleshooting. AKS reduces operational effort and allows teams to focus on deploying applications, while on-premises Kubernetes provides greater control but requires more administrative work.

---

## Revision

```text
On-Prem Kubernetes

You manage:

Servers
Linux
Kubernetes
Control Plane
Upgrades
Networking
```

```text
AKS

Microsoft manages:

Control Plane
Kubernetes platform

You manage:

Worker Nodes
Applications
Pods
```

---

# Q17. 
What is the difference between the AKS Control Plane and the Worker Nodes in terms of who manages them and who pays for them?

## Answer

## Step 1: What is a Kubernetes Cluster?

A Kubernetes cluster has **two main parts**.

```text
                Kubernetes Cluster

        +---------------------------+
        |      Control Plane        |
        +---------------------------+
                    │
        ----------------------------
        │            │            │
        ▼            ▼            ▼

    Worker 1     Worker 2     Worker 3
```

Think of it like a school.

---

## Analogy

Imagine a school.

There is:

* Principal
* Teachers

Who makes decisions?

The Principal.

Who teaches students?

The Teachers.

In Kubernetes,

```text
Principal

↓

Control Plane
```

```text
Teachers

↓

Worker Nodes
```

---

## Step 2: What is the Control Plane?

The **Control Plane** is the **brain** of Kubernetes.

It doesn't run my application.

Instead, it decides:

* Where should Pods run?
* Is a Pod unhealthy?
* Should another Pod be created?
* Which Node should receive the workload?

---

## Real-Life Analogy

Imagine an airport.

The Air Traffic Controller does not fly airplanes.

Instead, they decide:

* Which runway to use
* When to land
* When to take off

The Air Traffic Controller is like the **Control Plane**.

---

## Diagram

```text
Users

 │

 ▼

Control Plane

 │

 ├── Schedules Pods

 ├── Monitors Cluster

 ├── Stores Cluster State

 └── Makes Decisions
```

---

## Step 3: What are Worker Nodes?

Worker Nodes are the machines that **actually run my applications**.

If you deploy:

```text
nginx
```

The Pod runs on a Worker Node.

---

## Diagram

```text
Worker Node

 │

 ├── Pod

 ├── Pod

 ├── Pod

 └── Container Runtime
```

This is where my application lives.

---

## Step 4: Another Analogy

Imagine a pizza restaurant.

Manager:

```text
Take Order

Assign Chef

Check Quality
```

Chef:

```text
Cook Pizza
```

The manager never cooks.

The chef never manages the restaurant.

---

Kubernetes works exactly the same way.

```text
Manager

↓

Control Plane
```

```text
Chef

↓

Worker Node
```

---

## Step 5: Who Manages the Control Plane in AKS?

In AKS,

Microsoft manages:

* Kubernetes API Server
* Scheduler
* Controller Manager
* etcd
* High Availability of the control plane

You don't install them.

You don't patch them.

You don't repair them.

Microsoft does.

---

## Step 6: Who Manages Worker Nodes?

You manage the Worker Nodes.

That means:

* Choose VM size
* Choose number of nodes
* Scale nodes
* Upgrade node pools (with Azure assistance)
* Deploy applications
* Monitor workloads

Think of Worker Nodes as **my virtual machines**.

---

## Step 7: Who Pays?

This is exactly what the assignment asks.

## Control Plane

In AKS,

Microsoft manages it.

For the standard AKS experience used in learning labs, you are **not charged separately for the managed control plane**.

---

## Worker Nodes

Worker Nodes are Azure Virtual Machines.

VMs cost money.

So you pay for:

* Worker Node VMs
* Storage disks
* Load Balancers (if used)
* Public IPs (if used)

---

## Analogy

Imagine a shopping mall.

The mall owner provides:

* Security
* Escalators
* Cleaning

You don't pay separately for each security guard.

But...

If you rent a shop,

You pay rent.

---

Azure is similar.

```text
Mall Management

↓

Control Plane
```

```text
my Shop

↓

Worker Nodes
```

---

## Visual Diagram

```text
Azure

        │

        ▼

+-----------------------+

 Control Plane

(API Server)

Scheduler

Controllers

etcd

+-----------------------+

Managed by Microsoft

No separate charge

        │

        ▼

+-----------------------+

 Worker Node 1

 Worker Node 2

 Worker Node 3

+-----------------------+

Managed by You

You pay for the VMs
```

---

## Example

Suppose you create:

```text
AKS

↓

1 Node

↓

Standard_B2s
```

Azure creates:

```text
Control Plane

↓

Microsoft
```

and

```text
Worker VM

↓

Standard_B2s
```

You pay for the **Standard_B2s VM**, not for the managed control plane itself.

---

## Comparison Table

| Feature | Control Plane | Worker Nodes |
|----------|---------------|--------------|
| Main Purpose | Manages the cluster | Runs applications |
| Runs Pods? | No | Yes |
| Managed By (AKS) | Microsoft | Customer |
| User Access | Limited | Full (through node management and workloads) |
| Separate Charge in AKS | No separate charge | Yes (VMs and related resources) |
| Examples | API Server, Scheduler, etcd | Virtual Machines running Pods |

---

## Common Beginner Mistakes

## Forgetting that Pods run on Worker Nodes

No.

Pods run on **Worker Nodes**.

---

## Thinking Microsoft manages everything

No.

Microsoft manages the **Control Plane**.

You still manage:

* Applications
* Deployments
* Node pools
* Scaling decisions
* Worker node configuration

---

## Thinking AKS is completely free

Not true.

You pay for the Azure resources my cluster uses, especially the **Worker Node VMs**.

---

## Remember

Think of a restaurant.

```text
Control Plane

↓

Manager

↓

Makes Decisions
```

```text
Worker Node

↓

Chef

↓

Cooks Food
```

---



> An AKS cluster consists of a Control Plane and one or more Worker Nodes. The Control Plane is responsible for managing the Kubernetes cluster by scheduling Pods, maintaining cluster state, and handling API requests. In AKS, Microsoft manages the Control Plane, so users do not manage or pay separately for it. Worker Nodes are Azure Virtual Machines where containers and Pods actually run. Customers are responsible for choosing the node size, scaling the node pool, deploying applications, and paying for the Worker Node VMs and other Azure resources they consume.

---



> In AKS, the Control Plane is the management component of Kubernetes and is operated by Microsoft. It handles scheduling, cluster state, and API operations. The Worker Nodes are Azure Virtual Machines that run Pods and containers. Microsoft manages the Control Plane without a separate charge, while customers manage and pay for the Worker Nodes and the Azure resources associated with them.

---

## Revision

```text
Control Plane

Brain

↓

Managed by Microsoft

↓

Makes Decisions

↓

No separate control-plane charge
```

```text
Worker Nodes

Workers

↓

Managed by You

↓

Run Pods

↓

You pay for the VMs
```

---



# Q18. 
Create an AKS cluster with 1 node and connect `kubectl`. Explain the difference between what you saw on **Minikube** in Week 2 and what you see on **AKS** now. Attach screenshots.

## Answer



## Step 1: Remember Minikube

Last week you used:

```text
my Laptop

↓

Minikube

↓

Node

↓

Pods
```

Everything was running on **my laptop**.

my laptop was doing all the work.

---

## Step 2: What is AKS?

Now imagine instead of using my laptop...

Azure gives you a computer in Microsoft's data center.

```text
my Laptop

↓

Internet

↓

Azure

↓

AKS

↓

Worker Node

↓

Pods
```

my laptop only sends commands.

The real work happens in Azure.

---

## Analogy

## Minikube

Imagine playing with LEGO at home.

```text
You

↓

Bedroom

↓

LEGO
```

Everything is in my room.

---

## AKS

Now imagine a huge LEGO room at school.

```text
You

↓

School

↓

Large LEGO Room
```

The LEGO is no longer at home.

It is in a bigger, professionally managed place.

---

## Step 3: Create the AKS Cluster

Go to:

```text
Azure Portal

↓

Search

↓

Kubernetes Services

↓

Create
```

---

## Fill the Basics

| Field | Value |
|-------|-------|
| Resource Group | week3-rg |
| Cluster Name | week3-aks |
| Region | Same as my VM |
| Kubernetes Version | Default |
| Node Size | Default or smallest available for the lab |
| Node Count | **1** |

---

Why **1 node**?

Because the assignment specifically asks for **1 node**, and using one node helps reduce costs.

---

Click:

```text
Review + Create

↓

Create
```

---

## Step 4: Wait

AKS creation takes several minutes.

This is normal.

Azure is creating:

* Kubernetes Control Plane
* Worker Node
* Networking
* Storage configuration

---

## Step 5: Connect to AKS

You need **kubectl**.

Remember Week 2?

You typed:

```bash
kubectl get nodes
```

We'll do exactly the same.

---

## Step 6: Open Azure Cloud Shell

In Azure Portal click:

```text
Cloud Shell
```

Choose:

```text
Bash
```

Azure prepares a Linux terminal for you.

---

## Step 7: Connect kubectl

Run:

```bash
az aks get-credentials --resource-group week3-rg --name week3-aks
```

Replace the names if you used different ones.

---

## What does this command do?

Think of it like getting the address of my new school.

Without the address...

You don't know where to go.

This command tells kubectl:

> "This is the Kubernetes cluster you should talk to."

---

## Diagram

```text
kubectl

↓

Credentials

↓

AKS Cluster

↓

Connected
```

---

## Step 8: Verify Connection

Run:

```bash
kubectl get nodes
```

Expected output looks similar to:

```text
NAME                              STATUS   ROLES   AGE   VERSION

aks-nodepool1-xxxxxxxx-vmss0000   Ready    agent   10m   v1.xx.x
```

Notice something different?

---

## Minikube Output

You probably saw something like:

```text
minikube

Ready
```

---

## AKS Output

Now you see a much longer name.

Example:

```text
aks-nodepool1-xxxxxxxx-vmss000001
```

Why?

Because this is an Azure Virtual Machine Scale Set (VMSS) node created by AKS.

---

## Step 9: Check Pods

Run:

```bash
kubectl get pods -A
```

`-A` means:

```text
All Namespaces
```

---

You'll see many system Pods.

For example:

* CoreDNS
* metrics-server (if enabled)
* kube-proxy
* cloud-controller-manager (names may vary depending on the AKS version)

These help Kubernetes work properly.

---

## Analogy

Imagine opening a new school.

You only invited one student.

But inside the school you also see:

* Principal
* Teachers
* Security Guard
* Cleaner

The school needs all of them to operate.

Similarly, AKS runs several system Pods behind the scenes.

---

## What Changed Compared to Minikube?

Let's compare.

---

## Minikube

```text
Laptop

↓

Minikube

↓

One Node

↓

Pods
```

Everything was local.

---

## AKS

```text
Laptop

↓

Azure

↓

Managed Kubernetes

↓

Azure VM

↓

Pods
```

Everything runs in Azure.

---

## Comparison Table

| Feature           | Minikube                   | AKS                              |
| ----------------- | -------------------------- | -------------------------------- |
| Runs Where?       | Your laptop                | Azure Cloud                      |
| Best For          | Learning and local testing | Production and cloud deployments |
| Control Plane     | Local                      | Managed by Microsoft             |
| Worker Nodes      | Local machine              | Azure Virtual Machines           |
| Scalability       | Limited                    | Easy to scale                    |
| High Availability | Limited                    | Supported through Azure          |
| Internet Required | Not always                 | Yes                              |

---

#### Screenshots Required

Take these screenshots:

#### Screenshot 1

AKS Cluster Overview

Show:

```text
week3-aks
```

---

#### Screenshot 2

Node Pool

Show:

```text
Node Count

1
```

---

#### Screenshot 3

Cloud Shell

Command:

```bash
kubectl get nodes
```

---

#### Screenshot 4

Cloud Shell

Command:

```bash
kubectl get pods -A
```

---

#### Common Beginner Mistakes

#### ❌ Forgetting to connect kubectl

If you run:

```bash
kubectl get nodes
```

before:

```bash
az aks get-credentials
```

You'll likely get an error because kubectl doesn't yet know which cluster to use.

---

#### ❌ Thinking AKS runs on your laptop

No.

Your laptop only sends commands.

Azure runs the cluster.

---

#### ❌ Comparing node names

Minikube:

```text
minikube
```

AKS:

```text
aks-nodepool1-xxxxxxxx
```

Different names are expected.

---

#### Interview Answer

> In this lab, I created an AKS cluster with one worker node and connected to it using the `az aks get-credentials` command. I verified the connection with `kubectl get nodes` and viewed the running system Pods using `kubectl get pods -A`. Compared to Minikube, AKS runs in Azure as a managed Kubernetes service where Microsoft manages the control plane, while Minikube runs entirely on a local machine for development and learning purposes.

---

#### Assignment Answer (Short Version)

> I created an AKS cluster with one worker node and connected to it using `kubectl`. The `kubectl get nodes` command confirmed that the node was in the Ready state, and `kubectl get pods -A` displayed the Kubernetes system Pods. Unlike Minikube, which runs locally on my laptop, AKS is a managed Kubernetes service in Azure where Microsoft manages the control plane and the worker nodes run on Azure Virtual Machines.

---

#### Quick Revision

######## Minikube

```text
Laptop

↓

Minikube

↓

Node

↓

Pods
```

######## AKS

```text
Laptop

↓

Azure

↓

AKS

↓

Worker Node

↓

Pods
```

---

######## 🌟 Before Moving to Q19

Q19 shifts from Kubernetes to **Container Registries**.

You'll learn:

* What **Docker Hub** is
* What **Azure Container Registry (ACR)** is
* Why companies prefer ACR with AKS
* How to create an ACR
* How to tag and push a Docker image
* Every command explained step by step, plus the exact screenshots needed for your assignment.


---


#### Q19.
What is the difference between **Docker Hub** and **Azure Container Registry**? Create an ACR, push an image to it, and attach a screenshot.

#### Answer

Excellent! 🎉 Q19 is one of the most practical questions because you'll learn **where Docker images are stored**.

You already know how to build a Docker image. Now you'll learn where to keep it so Kubernetes (AKS) can pull it.

Let's learn it like a kid.

---

#### Q19. What is the difference between Docker Hub and Azure Container Registry (ACR)? Create an ACR, push an image to it, and attach a screenshot.

---

## Step 1: What is a Container Registry?

When you build a Docker image, it stays on your computer.

Example:

```bash
docker images
```

Output:

```text
REPOSITORY     TAG

myapp          latest
```

Only **your computer** knows about this image.

If another developer wants it, they can't access it.

You need a place to **store and share** Docker images.

That place is called a **Container Registry**.

---

#### Kid Analogy 👶

Imagine you baked a cake.

Keeping it:

```text
Kitchen
```

Only your family can eat it.

---

Keeping it in a bakery:

```text
Bakery

↓

Everyone can buy it.
```

A Container Registry is like the bakery.

It stores Docker images.

---

## Step 2: What is Docker Hub?

Docker Hub is the world's most popular public Docker image registry.

Example:

```text
docker.io/nginx

docker.io/mysql

docker.io/redis
```

Millions of developers download images from Docker Hub.

---

#### Kid Analogy

Docker Hub is like:

```text
Public Library
```

Anyone can borrow books.

Similarly,

Anyone can download public Docker images.

---

## Step 3: What is Azure Container Registry (ACR)?

Azure Container Registry is Microsoft's **private container registry**.

Instead of storing images on Docker Hub,

You store them inside **your Azure subscription**.

Example:

```text
week3acr.azurecr.io/myapp:v1
```

Only authorized users and Azure services can access it.

---

#### Real-Life Analogy

Imagine two lockers.

#### Docker Hub

```text
Public Locker
```

Many people can access public images.

---

#### ACR

```text
Office Locker
```

Only employees with permission can access it.

---

## Step 4: Why Use ACR Instead of Docker Hub?

Suppose your company has a banking application.

Would you upload it to a public registry?

Probably not.

Instead:

```text
Developer

↓

ACR

↓

AKS
```

The application stays inside Azure.

---

## Step 5: Architecture

######## Docker Hub

```text
Developer

↓

Docker Hub

↓

Anyone Can Pull Public Images
```

---

######## ACR

```text
Developer

↓

Azure Container Registry

↓

AKS

↓

Runs Pods
```

Everything stays inside Azure.

---

## Step 6: Create Azure Container Registry

Go to:

```text
Azure Portal

↓

Search

↓

Container Registries

↓

Create
```

---

Fill:

| Field          | Value                              |
| -------------- | ---------------------------------- |
| Resource Group | week3-rg                           |
| Registry Name  | week3acr (must be globally unique) |
| Region         | Same region                        |
| SKU            | Basic                              |

Choose **Basic** because it's sufficient for the assignment and keeps costs lower.

Click:

```text
Review + Create

↓

Create
```

---

## Step 7: Enable Admin User

Open:

```text
Your Registry

↓

Settings

↓

Access Keys
```

Enable:

```text
Admin User

↓

ON
```

Azure shows:

* Username
* Password

You'll use these to log in.

---

## Step 8: Login to ACR

Open Azure Cloud Shell or your terminal.

Run:

```bash
az acr login --name week3acr
```

Replace `week3acr` with your registry name.

---

######## What happened?

Azure authenticated Docker with your registry.

Think of it as:

```text
Show ID Card

↓

Registry says

↓

Welcome!
```

---

## Step 9: Tag the Image

Suppose your image is:

```text
myapp:latest
```

Tell Docker where you want to upload it.

Run:

```bash
docker tag myapp:latest week3acr.azurecr.io/myapp:v1
```

---

######## Why Tag?

Imagine sending a parcel.

Without an address,

The courier doesn't know where to deliver it.

The tag adds the destination.

---

## ## Step 10: Push the Image

Run:

```bash
docker push week3acr.azurecr.io/myapp:v1
```

Docker uploads the image.

---

#### ASCII Diagram

```text
Laptop

 │

 ▼

Docker Image

 │

 ▼

Tag Image

 │

 ▼

Push

 │

 ▼

Azure Container Registry
```

---

## ## Step 11: Verify

Go to:

```text
Azure Portal

↓

Container Registry

↓

Repositories
```

You should see:

```text
myapp
```

Click it.

You'll see:

```text
v1
```

Success!

---

#### Comparison Table

| Feature        | Docker Hub                      | Azure Container Registry (ACR)                     |
| -------------- | ------------------------------- | -------------------------------------------------- |
| Provider       | Docker                          | Microsoft Azure                                    |
| Purpose        | Public/private image registry   | Azure-native private image registry                |
| Integration    | General-purpose                 | Integrated with Azure services like AKS            |
| Authentication | Docker account                  | Azure Entra ID, managed identity, admin user, etc. |
| Best For       | Open-source and general sharing | Enterprise and Azure workloads                     |
| Security       | Public or private repositories  | Azure RBAC and Azure security features             |

---

#### Common Beginner Mistakes

#### ❌ Forgetting to tag the image

Docker doesn't know where to upload it.

Always tag before pushing.

---

#### ❌ Wrong registry name

Your registry name becomes part of the image name.

Example:

```text
week3acr.azurecr.io/myapp:v1
```

---

#### ❌ Thinking Docker Hub and ACR are different image formats

They both store **Docker images**.

The difference is **where they're stored** and **how they're managed**.

---

#### Screenshots Required

Take these screenshots:

#### 📸 Screenshot 1

Container Registry Overview

Show:

```text
week3acr
```

---

#### 📸 Screenshot 2

Repositories

Show:

```text
myapp
```

---

#### 📸 Screenshot 3

Tag:

```text
v1
```

inside the repository.

---

#### 📸 Screenshot 4

Terminal showing:

```bash
docker push
```

completed successfully.

---

#### Easy Memory Trick

Think of photos.

#### Docker Hub

```text
Instagram
```

You can share publicly.

---

#### ACR

```text
Company Internal Drive
```

Only employees can access it.

---

#### Interview Answer (2 Minutes)

> Docker Hub is a general-purpose container registry provided by Docker that hosts both public and private container images. Azure Container Registry (ACR) is Microsoft's private container registry service designed for Azure environments. ACR integrates closely with Azure services such as AKS, provides Azure-based authentication and access control, and is commonly used for enterprise applications. In this lab, I created an Azure Container Registry, tagged my Docker image with the registry name, pushed it successfully to ACR, and verified that the image appeared in the repository.

---

#### Assignment Answer (Short Version)

> Docker Hub is a public container registry widely used for sharing Docker images, while Azure Container Registry (ACR) is a private Azure-native registry designed for secure storage and management of container images. I created an ACR, logged into it, tagged my Docker image with the registry URL, pushed it successfully, and verified the uploaded image in the Azure Portal.

---

#### Quick Revision

######## Docker Hub

```text
Docker Image

↓

Docker Hub

↓

Anyone with access can pull public images
```

######## Azure Container Registry

```text
Docker Image

↓

Azure Container Registry

↓

AKS

↓

Deploy Application
```

---

######## 🎯 Next: Q20

We'll move away from infrastructure and learn **Azure DevOps**:

* **Azure Portal vs Azure DevOps**
* What each one is used for
* What a **Service Connection** is
* Why Azure DevOps cannot deploy to Azure without one
* CI/CD pipeline flow with simple ASCII diagrams and real-world analogies.


---


#### Q20.
What is the difference between the **Azure Portal** (`portal.azure.com`) and **Azure DevOps** (`dev.azure.com`)? What is a **service connection** and why is it needed to link them?

#### Answer

Awesome! 🎉 We're now at **Q20**, where many beginners get confused because both names start with **Azure**.

Remember this:

> **Azure Portal builds and manages cloud resources.**
>
> **Azure DevOps builds and deploys your application.**

Think of them as **two different tools that work together**.

---

#### Q20. What is the difference between the Azure Portal (portal.azure.com) and Azure DevOps (dev.azure.com)? What is a Service Connection and why is it needed to link them?

---

## Step 1: First Understand the Two Websites

Microsoft has two different websites.

#### Azure Portal

```text
portal.azure.com
```

Used for managing Azure resources.

Examples:

* Virtual Machines
* AKS
* Storage Accounts
* Virtual Networks
* Resource Groups

Think of it as your **cloud control panel**.

---

#### Azure DevOps

```text
dev.azure.com
```

Used for software development.

Examples:

* Git Repositories
* CI/CD Pipelines
* Boards
* Test Plans
* Artifacts

Think of it as your **software factory**.

---

#### Kid Analogy 👶

Imagine you're building a house.

You need two things.

#### Construction Site

Where the house exists.

This is:

```text
Azure Portal
```

---

#### Construction Office

Where engineers:

* Draw plans
* Track work
* Schedule workers

This is:

```text
Azure DevOps
```

One builds the infrastructure.

The other manages software delivery.

---

## Step 2: What Does Azure Portal Do?

Suppose you want to create:

* VM
* AKS
* Storage Account
* Virtual Network

You go to:

```text
portal.azure.com
```

Example:

```text
Azure Portal

↓

Create VM

↓

Running Server
```

---

## Step 3: What Does Azure DevOps Do?

Suppose you wrote code.

You want:

* Build
* Test
* Docker Build
* Push to ACR
* Deploy to AKS

You use:

```text
dev.azure.com
```

Example:

```text
Developer

↓

Git Push

↓

Pipeline

↓

Docker Build

↓

Push Image

↓

Deploy
```

---

## Step 4: Why Can't Azure DevOps Deploy Directly?

Imagine you're working at a bank.

You receive a phone call:

> "I'm Rahul. Please transfer $10,000."

Will the bank transfer the money?

No.

The bank first verifies who is calling.

Azure works the same way.

Azure DevOps must prove its identity before Azure allows it to create or modify resources.

---

## Step 5: What is a Service Connection?

A **Service Connection** is a **trusted connection between Azure DevOps and Azure**.

It tells Azure:

> "I trust this Azure DevOps project."

Without it,

Azure DevOps has **no permission** to create VMs, push images, or deploy to AKS.

---

#### Kid Analogy 👶

Imagine your school.

A delivery person arrives.

The security guard asks:

> "Do you have an ID card?"

If yes,

They can enter.

If no,

Entry denied.

The ID card is like a **Service Connection**.

---

## Step 6: Architecture

Without Service Connection

```text
Azure DevOps

      │

      ▼

Deploy

      │

      ▼

Azure

      │

      ▼

❌ Permission Denied
```

---

With Service Connection

```text
Azure DevOps

      │

      ▼

Service Connection

      │

      ▼

Azure

      │

      ▼

✅ Deployment Allowed
```

---

## Step 7: Real Pipeline Flow

Imagine your application.

```text
Developer

↓

Git Push

↓

Azure DevOps

↓

Build Docker Image

↓

Service Connection

↓

Azure Container Registry

↓

AKS
```

Without the Service Connection,

the pipeline stops before reaching Azure.

---

## Step 8: What Information Does a Service Connection Store?

It securely stores credentials so Azure DevOps can authenticate with Azure.

Depending on how it's configured, it may use:

* Service Principal
* Managed Identity (in some scenarios)
* Workload Identity Federation (recommended in many modern setups)

You don't have to type your Azure username and password every time a pipeline runs.

---

#### Comparison Table

| Feature                  | Azure Portal                           | Azure DevOps                                                  |
| ------------------------ | -------------------------------------- | ------------------------------------------------------------- |
| Website                  | portal.azure.com                       | dev.azure.com                                                 |
| Purpose                  | Manage Azure resources                 | Develop and deploy applications                               |
| Used By                  | Cloud Administrators, DevOps Engineers | Developers, QA, DevOps Engineers                              |
| Creates VMs?             | ✅ Yes                                  | ❌ No (unless deploying through a pipeline using Azure access) |
| Runs Pipelines?          | ❌ No                                   | ✅ Yes                                                         |
| Stores Git Repositories? | ❌ No                                   | ✅ Yes                                                         |
| Manages Resource Groups? | ✅ Yes                                  | ❌ Not directly                                                |

---

#### Real-Life Example

Imagine Amazon.

#### Warehouse

Stores products.

```text
Azure Portal
```

---

#### Delivery Company

Moves products to customers.

```text
Azure DevOps
```

---

#### Security Pass

Allows delivery trucks inside.

```text
Service Connection
```

---

#### Common Beginner Mistakes

#### ❌ "Azure Portal and Azure DevOps are the same."

No.

Portal manages cloud resources.

Azure DevOps manages the software development lifecycle.

---

#### ❌ "Service Connection copies files."

No.

It provides **authentication and authorization** so Azure DevOps can access Azure resources.

---

#### ❌ "Without a Service Connection, pipelines always work."

No.

If your pipeline needs to interact with Azure (for example, pushing to ACR or deploying to AKS), it needs a valid Service Connection or another supported authentication method.

---

#### Easy Memory Trick

Think of building a restaurant.

#### Azure Portal

```text
Build the Restaurant
```

---

#### Azure DevOps

```text
Cook and Deliver Food
```

---

#### Service Connection

```text
Restaurant Key
```

Without the key,

the delivery staff can't enter.

---

#### Interview Answer (2 Minutes)

> Azure Portal is the web interface used to create and manage Azure cloud resources such as Virtual Machines, Resource Groups, Storage Accounts, and AKS clusters. Azure DevOps is a platform used for source code management, CI/CD pipelines, work tracking, and software delivery. A Service Connection is a secure authentication link that allows Azure DevOps pipelines to access Azure resources. It is required so pipelines can perform actions such as pushing Docker images to Azure Container Registry or deploying applications to AKS without exposing user credentials.

---

#### Assignment Answer (Short Version)

> Azure Portal is used to create and manage Azure infrastructure, while Azure DevOps is used to manage source code, build pipelines, and application deployments. A Service Connection securely connects Azure DevOps to an Azure subscription by providing authenticated access. This allows CI/CD pipelines to deploy resources or applications to Azure services such as Azure Container Registry and AKS.

---

#### Quick Revision

######## Azure Portal

```text
Create VM

Create AKS

Create Storage

Manage Cloud
```

######## Azure DevOps

```text
Git Repo

CI/CD Pipeline

Build

Test

Deploy
```

######## Service Connection

```text
Azure DevOps

↓

Authentication

↓

Azure

↓

Deployment Allowed
```

---

# Q21. 
Build a simple Azure DevOps pipeline that builds a Docker image and pushes it to Azure Container Registry (ACR). Attach screenshots of the successful pipeline run.

## Answer


## Step 1: What is a CI/CD Pipeline?

Imagine every time you write code, you manually have to:

* Build the application
* Create a Docker image
* Login to ACR
* Push the image

Doing this every day is repetitive.

A CI/CD pipeline automates all these steps.

---

## Analogy

Imagine packing school bags every morning.

Without automation:

```text
Wake Up

↓

Pack Books

↓

Pack Lunch

↓

Pack Water Bottle

↓

Go to School
```

You repeat this every day.

Now imagine a robot does all the packing for you.

That's exactly what a CI/CD pipeline does.

---

## Step 2: What Will We Build?

Our pipeline will do this:

```text
GitHub Repository

        │

        ▼

Azure DevOps Pipeline

        │

        ▼

Build Docker Image

        │

        ▼

Push Image

        │

        ▼

Azure Container Registry
```

Everything happens automatically.

---

## Step 3: Before You Start

Make sure you already have:

✅ Azure DevOps Project

✅ GitHub Repository

✅ Dockerfile

✅ Azure Container Registry (ACR)

✅ Service Connection

---

## Step 4: Create the Pipeline

Open:

```text
Azure DevOps

↓

Pipelines

↓

Create Pipeline
```

Choose:

```text
GitHub
```

Authorize GitHub if prompted.

---

Select my repository.

For example:

```text
flavorforge
```

---

Choose:

```text
Existing Azure Pipelines YAML file
```

or

```text
Starter Pipeline
```

if I'm creating it for the first time.

---

## Step 5: Pipeline YAML

A simple pipeline can include these stages:

```text
Checkout Code

↓

Build Docker Image

↓

Login to ACR

↓

Push Docker Image
```

---

## Example YAML

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

variables:
  imageName: sampleapp

steps:

- checkout: self

- task: Docker@2
  displayName: Build and Push Image
  inputs:
    command: buildAndPush
    repository: $(imageName)
    dockerfile: Dockerfile
    containerRegistry: my-acr-service-connection
    tags: |
      latest
```

---

## What Does This Pipeline Do?

```text
checkout

↓

Downloads my source code
```

```text
Docker Build

↓

Creates Docker Image
```

```text
Docker Push

↓

Uploads image to Azure Container Registry
```

Everything is automatic.

---

## Analogy

Imagine making a birthday cake.

Instead of:

* Mixing ingredients
* Baking
* Decorating
* Delivering

myself,

you press one button.

The machine does everything.

That is what the pipeline does.

---

## Step 6: Run the Pipeline

Click:

```text
Save

↓

Run Pipeline
```

Azure DevOps starts the build.

I'll see stages running one after another.

```text
Checkout

↓

Build

↓

Push

↓

Success
```

---

## Step 7: Verify the Image

Go to:

```text
Azure Portal

↓

Container Registry

↓

Repositories
```

I should see:

```text
sampleapp
```

Open it.

I should see:

```text
latest
```

This confirms the image was pushed successfully.

---

## Diagram

```text
Developer

      │

      ▼

Git Push

      │

      ▼

Azure DevOps

      │

      ▼

Build Docker Image

      │

      ▼

Push Image

      │

      ▼

Azure Container Registry
```

---

## Real-Life Analogy

Imagine a factory.

Worker:

```text
Makes Product
```

↓

Packing Machine:

```text
Packs Product
```

↓

Delivery Truck:

```text
Sends Product
```

The factory is like Azure DevOps.

The warehouse is Azure Container Registry.

---

## Screenshots Required



## Screenshot 1

Azure DevOps Pipeline

Show:

```text
Pipeline Name
```

---

## Screenshot 2

Pipeline Run

Show:

```text
Successful Run

✓ Passed
```

---

## Screenshot 3

Pipeline Logs

Show:

```text
Docker Build

Docker Push
```

completed successfully.

---

## Screenshot 4

Azure Container Registry

↓

Repositories



---

## Screenshot 5

Repository Tag

Show:

```text
latest
```

or the tag I used.

---

## What Happens Behind the Scenes?

When the pipeline runs:

```text
Azure DevOps

↓

Downloads Code

↓

Reads Dockerfile

↓

Builds Docker Image

↓

Logs in to ACR

↓

Uploads Image

↓

Pipeline Completes
```

Everything is automated.

---

## Comparison Table

| Manual Process               | Azure DevOps Pipeline            |
| ---------------------------- | -------------------------------- |
| Build image manually         | Builds automatically             |
| Login to ACR manually        | Logs in using Service Connection |
| Push image manually          | Pushes automatically             |
| More time and effort         | Faster and consistent            |
| Higher chance of human error | Reduced manual errors            |
| Best for small experiments   | Best for production CI/CD        |

---

## Common Beginner Mistakes

## ❌ Forgetting the Service Connection

Without a valid Service Connection,

Azure DevOps cannot authenticate with Azure and the pipeline will fail while pushing the image.

---

## ❌ Wrong Dockerfile Path

If the Dockerfile path is incorrect,

the Docker image cannot be built.

---

## ❌ Wrong ACR Name

The pipeline must use the correct Azure Container Registry and Service Connection.

Otherwise, the push step will fail.

---

## Remember

Think of an online shopping order.

```text
Customer Places Order

↓

Warehouse Packs Product

↓

Courier Delivers Product
```

Similarly,

```text
Git Push

↓

Azure DevOps Builds Image

↓

ACR Stores Image
```

---



> In this lab, I created an Azure DevOps pipeline that automatically built a Docker image from my application and pushed it to Azure Container Registry (ACR). The pipeline used a Docker task along with a Service Connection to authenticate with Azure. After the pipeline completed successfully, I verified the uploaded image and its tag in the ACR repository. This automation reduces manual effort, ensures consistent deployments, and forms the foundation of a CI/CD workflow.

> I created an Azure DevOps pipeline that automatically built a Docker image and pushed it to Azure Container Registry using a Service Connection. After running the pipeline successfully, I verified the uploaded image in the ACR repository. This CI/CD pipeline automates the build and image publishing process, making deployments faster, more reliable, and less prone to manual errors.

---

## Revision

## Azure DevOps Pipeline

```text
GitHub

↓

Azure DevOps

↓

Build Docker Image

↓

Push Image

↓

Azure Container Registry
```

## CI/CD Flow

```text
Developer

↓

Git Push

↓

Pipeline

↓

Docker Build

↓

ACR

↓

Image Ready
```

---



## Cleanup


## Cleanup: Delete All Azure Resources and Attach Proof

After completing all the labs and taking the required screenshots, I should delete the Azure resources I created to avoid unnecessary charges.

---

## Why Should We Delete Resources?

Remember assignment warning:

> **VMs, Bastion, AKS, Public IPs, and other Azure resources can incur charges if they continue running.**

---

## Analogy

Imagine I book a hotel room.

```text
I Check In

↓

Use Room

↓

Finish Trip

↓

Check Out
```

If I never check out...

The hotel keeps charging me.

Azure works exactly the same way.

If my resources continue running,

Azure may continue billing my subscription.

---

## What Should We Delete?

If my created everything inside **one Resource Group** (recommended), deleting it is the easiest option.

Example:

```text
week3-rg

│

├── Virtual Machine

├── Virtual Network

├── Subnet

├── Network Security Group

├── Public IP

├── Azure Bastion

├── AKS Cluster

├── Azure Container Registry

├── Route Table

└── Other Azure Resources
```

Instead of deleting each resource one by one,

delete the **Resource Group**.

Everything inside it is deleted automatically.

---

## Step 1: Open Azure Portal

Go to:

```text
Azure Portal

↓

Resource Groups
```

---

## Step 2: Open my Resource Group

For example:

```text
week3-rg
```

I'll see all the resources inside the Resource Group.

---

## Step 3: Delete the Resource Group

Click:

```text
Delete Resource Group
```

Azure will ask me to confirm the deletion.

Type the Resource Group name exactly.

Example:

```text
week3-rg
```

Then click:

```text
Delete
```

---

## What Happens?

```text
Delete Resource Group

        │

        ▼

Delete Virtual Machine

Delete AKS

Delete Azure Bastion

Delete Virtual Network

Delete NSG

Delete Public IP

Delete Azure Container Registry

Delete Everything
```

This process may take several minutes.

---

## Alternative (Azure CLI)

If I am using Azure CLI, run:

```bash
az group delete --name week3-rg --yes --no-wait
```

## What does this command mean?

```text
az group delete
```

Deletes a Resource Group.

```text
--name week3-rg
```

Specifies which Resource Group to delete.

```text
--yes
```

Automatically confirms the deletion.

```text
--no-wait
```

Starts the deletion immediately without waiting for it to finish.

---

## How Do I Know It's Deleted?

Go back to:

```text
Resource Groups
```

If I no longer see:

```text
week3-rg
```

or its status changes to:

```text
Deleting
```

and later disappears,

my cleanup was successful.

---

## Screenshot

## Option 1 (Recommended)

```text
Resource Groups

↓

week3-rg

↓

Status: Deleting
```

This proves I initiated the cleanup.

---

## Option 2

After deletion completes:

```text
Resource Groups

↓

week3-rg

↓

Not Found
```

or the Resource Group is no longer listed.

---

## Common Beginner Mistakes

## ❌ Deleting only the Virtual Machine

The VM is deleted, but resources like:

* Public IP
* Azure Bastion
* AKS
* Azure Container Registry
* Managed Disks

may still exist and could continue to incur charges.

---

## ❌ Forgetting Managed Disks

If my delete VMs individually, always verify whether the managed disks were also removed.

Deleting the **Resource Group** removes everything together.

---

## ❌ Deleting the Wrong Resource Group

Always verify the Resource Group name before confirming the deletion.

---

## Remember

```text
One Resource Group

↓

One Delete

↓

Everything Removed
```

---


> After completing all the required Azure labs and capturing the necessary screenshots, I deleted the entire Resource Group containing all the Azure resources. This removed the Virtual Machine, AKS cluster, Azure Bastion, Azure Container Registry, Virtual Network, Network Security Group, Public IP, and other related resources, helping avoid unnecessary Azure charges.

---

## Revision

```text
Complete Assignment

↓

Take Screenshots

↓

Delete Resource Group

↓

All Resources Removed

↓

No Unnecessary Charges
```

---


```text
Azure Networking

↓

Virtual Machines

↓

Public & Private IPs

↓

Azure Bastion

↓

Microsoft Entra ID & RBAC

↓

Azure Kubernetes Service (AKS)

↓

Azure Container Registry (ACR)

↓

Azure DevOps & CI Pipeline

↓

Resource Cleanup
```
